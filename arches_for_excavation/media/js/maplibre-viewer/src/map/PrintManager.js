import { jsPDF } from "jspdf";
import maplibregl from "maplibre-gl";
import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";
import { WarpedMapEventType } from "@allmaps/maplibre";
import { PrintWarpedMapLayer } from "./iiif/PrintWarpedMapLayer";
import { getOrthoAnnotationPage } from "../api/iiifMapService";
import store from "../core/store";

export class PrintManager {
    constructor(maplibreMapInstance, orthoLayer) {
        this.map = maplibreMapInstance;
        this.orthoLayer = orthoLayer;
    }

    exportPdf(paperSizeMm, isHorizontal, dpi, previewRect, northArrowUrl, legendData, legendTitle) {
        console.log("Received legend title for PDF export: ", legendTitle);
        EventBusInstance.publish(events.APP_BUSY_ON);
        if (!this.map) throw new Error("PrintManager: map instance is missing.");

        const [baseWmm, baseHmm] = paperSizeMm;
        const pageWmm = isHorizontal ? baseHmm : baseWmm;
        const pageHmm = isHorizontal ? baseWmm : baseHmm;
        
        const canvasRect = this.map.getCanvas().getBoundingClientRect();
        const centerLngLat = this.map.unproject([
            previewRect.left + (previewRect.width / 2) - canvasRect.left, 
            previewRect.top + (previewRect.height / 2) - canvasRect.top
        ]);

        const hiddenContainer = document.createElement("div");
        hiddenContainer.style.cssText = `
            width: ${Math.round((pageWmm / 25.4) * 96)}px;
            height: ${Math.round((pageHmm / 25.4) * 96)}px;
            position: absolute; left: -9999px;
        `;
        document.body.appendChild(hiddenContainer);

        const printMap = new maplibregl.Map({
            container: hiddenContainer,
            style: this.map.getStyle(), 
            center: centerLngLat,
            zoom: this.map.getZoom(),
            bearing: this.map.getBearing(),
            pitch: this.map.getPitch(),
            interactive: false,
            preserveDrawingBuffer: true,
            fadeDuration: 0,
            pixelRatio: dpi / 96
        });

        printMap.once('idle', async () => {
            await this._addIiifLayersToPrintMap(printMap);
            
            await this._waitForPrintMapToSettle(printMap);
            const printCanvas = printMap.getCanvas();

            const exportCanvas = document.createElement("canvas");
            exportCanvas.width = printCanvas.width;
            exportCanvas.height = printCanvas.height;
            const ctx = exportCanvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);
            ctx.drawImage(printCanvas, 0, 0);

            const pdf = new jsPDF({
                orientation: pageWmm > pageHmm ? "landscape" : "portrait",
                unit: "mm",
                format: [pageWmm, pageHmm],
                compress: true,
            });
            
            pdf.addImage(exportCanvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageWmm, pageHmm, undefined, "MEDIUM");

            const CONSTANT_CONTENT_WIDTH = 50; 
            const scale = this._getScaleInfo(printMap, CONSTANT_CONTENT_WIDTH - 6);
            const halfLabel = (scale.labelDistance / 2).toString();

            const legendItems = Array.isArray(legendData)
                ? legendData.filter(item => item && item.name)
                : [];

            const legendMargin = 6;
            const legendPadding = 3;
            const titleText = `${legendTitle || "Legend"}`; 
            const titleSize = 13;
            const labelSize = 8;
            const swatchSize = 4;
            const swatchGap = 2;
            const itemGap = 2.5;
            const textLineHeight = 3.5;

            const scaleTopGap = 2.5;
            const scaleBarHeight = 2;
            const scaleLabelGap = 3.5;
            const scaleAreaHeight = scaleTopGap + scaleBarHeight + scaleLabelGap + 2.5;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(titleSize);
            const wrappedTitle = pdf.splitTextToSize(titleText, CONSTANT_CONTENT_WIDTH);
            const titleLineHeight = 5; 
            const titleHeight = wrappedTitle.length * titleLineHeight; 

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(labelSize);
            const allowedLabelWidth = CONSTANT_CONTENT_WIDTH - (swatchSize + swatchGap);

            let rowsTotalHeight = 0;
            const wrappedItems = legendItems.map(item => {
                const text = String(item.name);
                const lines = pdf.splitTextToSize(text, allowedLabelWidth);
                const itemHeight = Math.max(swatchSize, lines.length * textLineHeight);
                rowsTotalHeight += itemHeight + itemGap;
                return { ...item, lines, itemHeight };
            });

            if (wrappedItems.length > 0) rowsTotalHeight -= itemGap;

            const contentWidth = Math.max(CONSTANT_CONTENT_WIDTH, scale.widthMm);
            const legendWidth = legendPadding + contentWidth + legendPadding;
            const titleGap = wrappedItems.length > 0 ? 2 : 0;
            const dividerGap = wrappedItems.length > 0 ? 2 : 0; 
            
            const legendHeight = legendPadding + titleHeight + titleGap + rowsTotalHeight + dividerGap + scaleAreaHeight + legendPadding;

            const legendX = pageWmm - legendMargin - legendWidth;
            const legendY = pageHmm - legendMargin - legendHeight;

            pdf.setFillColor(255, 255, 255);
            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(0.2);
            pdf.rect(legendX, legendY, legendWidth, legendHeight, "FD");

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(titleSize);
            pdf.setTextColor(0, 0, 0);
            wrappedTitle.forEach((line, index) => {
                pdf.text(line, legendX + legendPadding, legendY + legendPadding + 4 + (index * titleLineHeight));
            });

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(labelSize);

            let currentY = legendY + legendPadding + titleHeight + titleGap;

            wrappedItems.forEach(item => {
                const { r, g, b } = this._hexToRgb(item.color);
                pdf.setFillColor(r, g, b);
                pdf.setDrawColor(0, 0, 0);
                pdf.rect(legendX + legendPadding, currentY, swatchSize, swatchSize, "FD");

                pdf.setTextColor(0, 0, 0);
                item.lines.forEach((line, lineIndex) => {
                    pdf.text(line, legendX + legendPadding + swatchSize + swatchGap, currentY + 3.2 + (lineIndex * textLineHeight));
                });
                currentY += item.itemHeight + itemGap;
            });

            const dividerY = currentY + 0.8;
            pdf.setDrawColor(180, 180, 180);
            pdf.line(legendX + legendPadding, dividerY, legendX + legendWidth - legendPadding, dividerY);

            const barW = Math.min(scale.widthMm, contentWidth);
            const barX = legendX + legendPadding;
            const barY = dividerY + scaleTopGap;
            const segments = 4;
            const segWidth = barW / segments;

            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(0.2);
            for (let i = 0; i < segments; i++) {
                pdf.setFillColor(i % 2 === 0 ? 0 : 255, i % 2 === 0 ? 0 : 255, i % 2 === 0 ? 0 : 255);
                pdf.rect(barX + (i * segWidth), barY, segWidth, scaleBarHeight, "FD");
            }

            const labelY = barY + scaleBarHeight + scaleLabelGap;
            pdf.setFontSize(8);
            pdf.text("0", barX - (pdf.getTextWidth("0") / 2), labelY);
            pdf.text(halfLabel, barX + (barW / 2) - (pdf.getTextWidth(halfLabel) / 2), labelY); 
            pdf.text(scale.labelDistance.toString(), barX + barW - (pdf.getTextWidth(scale.labelDistance.toString()) / 2), labelY);
            pdf.text(` ${scale.unit}`, barX + barW + (pdf.getTextWidth(scale.labelDistance.toString()) / 2), labelY);

            const finalizeExport = () => {
                pdf.save(`map_export.pdf`);
                printMap.remove();
                if (hiddenContainer.parentNode) hiddenContainer.parentNode.removeChild(hiddenContainer);
                EventBusInstance.publish(events.APP_BUSY_OFF);
            };

            if (northArrowUrl) {
                const slotSizeMm = 21;
                const slotX = pageWmm - 6 - slotSizeMm;
                const slotY = 6;

                this._svgToPngDataUrl(northArrowUrl, -this.map.getBearing())
                    .then(({ dataUrl, ratio }) => {
                        pdf.setFillColor(255, 255, 255);
                        pdf.setDrawColor(0, 0, 0);
                        pdf.setLineWidth(0.2);
                        pdf.rect(slotX, slotY, slotSizeMm, slotSizeMm, "FD");

                        const maxInner = slotSizeMm * 0.82;
                        let drawW = maxInner;
                        let drawH = drawW * ratio;
                        if (drawH > maxInner) {
                            drawH = maxInner;
                            drawW = drawH / ratio;
                        }
                        pdf.addImage(dataUrl, "PNG", slotX + (slotSizeMm - drawW) / 2, slotY + (slotSizeMm - drawH) / 2, drawW, drawH);
                    })
                    .catch(e => console.error("North arrow render failed:", e))
                    .finally(finalizeExport);
            } else {
                finalizeExport();
            }
        });
    }

    async _waitForPrintMapToSettle(printMap) {
        for (let i = 0; i < 4; i++) await this._waitForRenderFrame(printMap);
        await new Promise(resolve => setTimeout(resolve, 700));
        await this._waitForRenderFrame(printMap);
    }

    _waitForRenderFrame(printMap) {
        return new Promise(resolve => {
            let resolved = false;
            const finish = () => { if (resolved) return; resolved = true; clearTimeout(timeoutId); requestAnimationFrame(resolve); };
            const timeoutId = setTimeout(finish, 1200);
            printMap.once("render", finish);
            printMap.triggerRepaint();
        });
    }

    async _addIiifLayersToPrintMap(printMap) {
        const visibleLayerIds = new Set(store.mapLayerIds);
        for (const iiifLayer of this.orthoLayer.values()) {
            if (!visibleLayerIds.has(iiifLayer.logicalLayerId)) continue;
            const printLayerId = `print-${iiifLayer.id}`;
            const warpedLayer = new PrintWarpedMapLayer({ layerId: printLayerId, opacity: iiifLayer.opacity ?? 0.5 });
            const tilesLoaded = new Promise(resolve => printMap.once(WarpedMapEventType.ALLREQUESTEDTILESLOADED, resolve));
            printMap.addLayer(warpedLayer);
            await warpedLayer.addGeoreferenceAnnotation(await getOrthoAnnotationPage(iiifLayer.resourceId));
            await tilesLoaded;
        }
    }

    _svgToPngDataUrl(svgUrl, rotationDeg = 0, targetWidthPx = 512) {
        return fetch(svgUrl)
            .then(res => res.text())
            .then(svgText => {
                const blobUrl = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml;charset=utf-8" }));
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        const innerH = targetWidthPx * (img.naturalHeight / img.naturalWidth);
                        const diag = Math.ceil(Math.sqrt((targetWidthPx * targetWidthPx) + (innerH * innerH))) + 4;
                        const canvas = document.createElement("canvas");
                        canvas.width = canvas.height = diag;
                        const ctx = canvas.getContext("2d");
                        ctx.translate(diag / 2, diag / 2);
                        ctx.rotate((rotationDeg * Math.PI) / 180);
                        ctx.drawImage(img, -targetWidthPx / 2, -innerH / 2, targetWidthPx, innerH);
                        const cropped = this._cropCanvasToOpaque(canvas);
                        URL.revokeObjectURL(blobUrl);
                        resolve({ dataUrl: cropped.toDataURL("image/png"), ratio: cropped.height / cropped.width });
                    };
                    img.onerror = (e) => { URL.revokeObjectURL(blobUrl); reject(e); };
                    img.src = blobUrl;
                });
            });
    }

    _getScaleInfo(map, maxWidthMm = 40) {
        const maxWidthPx = maxWidthMm * (96 / 25.4);
        const y = map._container.clientHeight / 2;
        const x = map._container.clientWidth / 2;
        const left = map.unproject([x - maxWidthPx / 2, y]);
        const right = map.unproject([x + maxWidthPx / 2, y]);
        const maxMeters = left.distanceTo(right);
        const getRoundNum = (num) => {
            const multiplier = Math.pow(10, Math.floor(Math.log10(num)));
            const normalized = num / multiplier;
            return (normalized >= 5 ? 5 : normalized >= 2 ? 2 : 1) * multiplier;
        };
        const distance = getRoundNum(maxMeters);
        const ratio = distance / maxMeters;
        const widthMm = (maxWidthPx * ratio) * (25.4 / 96);
        return { widthMm, unit: distance >= 1000 ? 'km' : 'm', labelDistance: distance >= 1000 ? distance / 1000 : distance };
    }

    _hexToRgb(hex) {
        const clean = hex?.replace("#", "");
        if (!/^[0-9a-fA-F]{6}$/.test(clean)) return { r: 160, g: 160, b: 160 };
        const value = parseInt(clean, 16);
        return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
    }

    _cropCanvasToOpaque(sourceCanvas) {
        const ctx = sourceCanvas.getContext("2d");
        const { width, height } = sourceCanvas;
        const pixels = ctx.getImageData(0, 0, width, height).data;
        let minX = width, minY = height, maxX = -1, maxY = -1;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (pixels[(y * width + x) * 4 + 3] > 0) {
                    minX = Math.min(minX, x); minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
                }
            }
        }
        if (maxX < minX) return sourceCanvas;
        const out = document.createElement("canvas");
        out.width = (maxX - minX) + 1; out.height = (maxY - minY) + 1;
        out.getContext("2d").drawImage(sourceCanvas, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
        return out;
    }
}