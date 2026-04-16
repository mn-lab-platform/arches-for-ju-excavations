import { jsPDF } from "jspdf";
import maplibregl from "maplibre-gl";
import { EventBusInstance } from "../core/EventBus";
import { events } from "../constants/events";

export class PrintManager {
    constructor(maplibreMapInstance) {
        this.map = maplibreMapInstance;
    }

    exportPdf(paperSizeMm, isHorizontal, dpi, previewRect, northArrowUrl) {
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

            const finalizeExport = () => {
                pdf.save(`map_export.pdf`);
                printMap.remove();
                if (hiddenContainer.parentNode) hiddenContainer.parentNode.removeChild(hiddenContainer);
                EventBusInstance.publish(events.APP_BUSY_OFF);
            };

            if (northArrowUrl) {
                const canvasSizeMm = 21;
                this._svgToPngDataUrl(northArrowUrl, -this.map.getBearing())
                    .then(({ dataUrl, ratio }) => {
                        const paddingOffset = canvasSizeMm * 0.1;
                        pdf.addImage(
                            dataUrl, "PNG", 
                            pageWmm - 6 - canvasSizeMm + paddingOffset,
                            6 - paddingOffset,                         
                            canvasSizeMm, 
                            canvasSizeMm * ratio
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
                        const canvasSize = Math.max(targetWidthPx, innerH) + (targetWidthPx * 0.5);
                        
                        const canvas = document.createElement("canvas");
                        canvas.width = canvas.height = canvasSize;
                        
                        const ctx = canvas.getContext("2d");
                        ctx.translate(canvasSize / 2, canvasSize / 2);
                        ctx.rotate((rotationDeg * Math.PI) / 180);
                        ctx.drawImage(img, -targetWidthPx / 2, -innerH / 2, targetWidthPx, innerH);

                        URL.revokeObjectURL(blobUrl);
                        resolve({ dataUrl: canvas.toDataURL("image/png"), ratio: 1 });
                    };
                    img.onerror = (e) => { URL.revokeObjectURL(blobUrl); reject(e); };
                    img.src = blobUrl;
                });
            });
    }
}