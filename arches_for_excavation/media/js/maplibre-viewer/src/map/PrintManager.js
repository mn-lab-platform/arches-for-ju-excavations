import { jsPDF } from "jspdf";
import maplibregl from "maplibre-gl";
import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class PrintManager {
    constructor(maplibreMapInstance) {
        this.map = maplibreMapInstance;
    }

    exportPdf(paperSizeMm, isHorizontal, dpi, previewRect, northArrowUrl, legendData) {
        console.log("Received legendData for printing:", legendData);
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

        printMap.once('idle', () => {
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

            const scale = this._getScaleInfo(printMap);
            const halfLabel = (scale.labelDistance / 2).toString();
            const fullLabel = `${scale.labelDistance} ${scale.unit}`;

            const legendItems = Array.isArray(legendData)
                ? legendData.filter(item => item && item.name)
                : [];

            if (legendItems.length > 0) {
                const legendMargin = 6;
                const legendPadding = 3;
                const titleText = "Legend";
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
                const titleWidth = pdf.getTextDimensions(titleText).w;

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(labelSize);
                const rawMaxLabelWidth = Math.max(
                    ...legendItems.map(item => pdf.getTextDimensions(String(item.name)).w),
                    0
                );

                const itemsWidth = swatchSize + swatchGap + rawMaxLabelWidth;
                const rawRowsWidth = Math.max(titleWidth, itemsWidth);
                const absMaxContentWidth = pageWmm * 0.45;

                const idealContentWidth = Math.max(rawRowsWidth, scale.widthMm);
                const contentWidth = Math.min(idealContentWidth, absMaxContentWidth);

                const allowedLabelWidth = contentWidth - (swatchSize + swatchGap);

                let rowsTotalHeight = 0;
                const wrappedItems = legendItems.map(item => {
                    const text = String(item.name);
                    const lines = pdf.splitTextToSize(text, allowedLabelWidth);
                    const itemHeight = Math.max(swatchSize, lines.length * textLineHeight);
                    rowsTotalHeight += itemHeight + itemGap;
                    return { ...item, lines, itemHeight };
                });

                if (wrappedItems.length > 0) rowsTotalHeight -= itemGap;

                const titleHeight = 5;
                const legendWidth = legendPadding + contentWidth + legendPadding;
                const dividerGap = 2;
                const legendHeight =
                    legendPadding + titleHeight + rowsTotalHeight + dividerGap + scaleAreaHeight + legendPadding;

                const legendX = pageWmm - legendMargin - legendWidth;
                const legendY = pageHmm - legendMargin - legendHeight;

                pdf.setFillColor(255, 255, 255);
                pdf.setDrawColor(0, 0, 0);
                pdf.setLineWidth(0.2);
                pdf.rect(legendX, legendY, legendWidth, legendHeight, "FD");

                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(titleSize);
                pdf.setTextColor(0, 0, 0);
                pdf.text(titleText, legendX + legendPadding, legendY + legendPadding + 3.5);

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(labelSize);

                let currentY = legendY + legendPadding + titleHeight;

                wrappedItems.forEach(item => {
                    const { r, g, b } = this._hexToRgb(item.accent);
                    pdf.setFillColor(r, g, b);
                    pdf.setDrawColor(0, 0, 0);
                    pdf.rect(legendX + legendPadding, currentY, swatchSize, swatchSize, "FD");

                    pdf.setTextColor(0, 0, 0);
                    item.lines.forEach((line, lineIndex) => {
                        pdf.text(
                            line,
                            legendX + legendPadding + swatchSize + swatchGap,
                            currentY + 3.2 + (lineIndex * textLineHeight)
                        );
                    });

                    currentY += item.itemHeight + itemGap;
                });

                const dividerY = currentY + 0.8;
                pdf.setDrawColor(180, 180, 180);
                pdf.line(
                    legendX + legendPadding,
                    dividerY,
                    legendX + legendWidth - legendPadding,
                    dividerY
                );

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
                pdf.setTextColor(0, 0, 0);
                pdf.text("0", barX, labelY, { align: "left" });
                pdf.text(halfLabel, barX + (barW / 2), labelY, { align: "center" });
                pdf.text(fullLabel, barX + barW, labelY, { align: "right" });
            }

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

                        const centerX = slotX + (slotSizeMm / 2);
                        const centerY = slotY + (slotSizeMm / 2);

                        pdf.addImage(
                            dataUrl,
                            "PNG",
                            centerX - (drawW / 2),
                            centerY - (drawH / 2),
                            drawW,
                            drawH
                        );
                    })
                    .catch(e => console.error("North arrow render failed:", e))
                    .finally(finalizeExport);
            } else {
                finalizeExport();
            }
        });
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
                        resolve({
                            dataUrl: cropped.toDataURL("image/png"),
                            ratio: cropped.height / cropped.width
                        });
                    };
                    img.onerror = (e) => {
                        URL.revokeObjectURL(blobUrl);
                        reject(e);
                    };
                    img.src = blobUrl;
                });
            });
    }

    _getScaleInfo(map) {
        const optWidthPx = 100;
        const y = map._container.clientHeight / 2;
        const x = map._container.clientWidth / 2;
        
        const left = map.unproject([x - optWidthPx / 2, y]);
        const right = map.unproject([x + optWidthPx / 2, y]);
        const maxMeters = left.distanceTo(right);

        const getDecimalRoundNum = (d) => {
            const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
            return Math.round(d * multiplier) / multiplier;
        };

        const getRoundNum = (num) => {
            const pow10 = Math.pow(10, (`${Math.floor(num)}`).length - 1);
            let d = num / pow10;
            d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : d >= 1 ? 1 : getDecimalRoundNum(d);
            return pow10 * d;
        };

        const distance = getRoundNum(maxMeters);
        const ratio = distance / maxMeters;
        const widthPx = optWidthPx * ratio;
        
        const widthMm = widthPx * (25.4 / 96);
        
        let unit = 'm';
        let labelDistance = distance;
        if (distance >= 1000) {
            labelDistance = distance / 1000;
            unit = 'km';
        }

        return { 
            widthMm, 
            unit,
            labelDistance
        };
    }

    _hexToRgb(hex) {
        const fallback = { r: 160, g: 160, b: 160 };
        if (typeof hex !== "string") return fallback;

        const clean = hex.trim().replace("#", "");
        const normalized = clean.length === 3
            ? clean.split("").map(ch => ch + ch).join("")
            : clean;

        if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return fallback;

        const value = parseInt(normalized, 16);
        return {
            r: (value >> 16) & 255,
            g: (value >> 8) & 255,
            b: value & 255
        };
    }

    _cropCanvasToOpaque(sourceCanvas) {
        const ctx = sourceCanvas.getContext("2d");
        const { width, height } = sourceCanvas;
        const pixels = ctx.getImageData(0, 0, width, height).data;

        let minX = width, minY = height, maxX = -1, maxY = -1;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const a = pixels[(y * width + x) * 4 + 3];
                if (a > 0) {
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                }
            }
        }

        if (maxX < minX || maxY < minY) return sourceCanvas;

        const cropW = (maxX - minX) + 1;
        const cropH = (maxY - minY) + 1;
        const out = document.createElement("canvas");
        out.width = cropW;
        out.height = cropH;
        out.getContext("2d").drawImage(sourceCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
        return out;
    }
}