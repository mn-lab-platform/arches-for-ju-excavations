import { jsPDF } from "jspdf";
import maplibregl from "maplibre-gl";

export class PrintManager {
    constructor(maplibreMapInstance) {
        this.map = maplibreMapInstance;
    }

    exportPdf(paperSizeMm, isHorizontal, dpi, previewRect) {
        if (!this.map) throw new Error("PrintManager: map instance is missing.");

        const baseDpi = 96; 
        const [baseWmm, baseHmm] = paperSizeMm;
        const pageWmm = isHorizontal ? baseHmm : baseWmm;
        const pageHmm = isHorizontal ? baseWmm : baseHmm;
        
        const cssWpx = Math.round((pageWmm / 25.4) * baseDpi);
        const cssHpx = Math.round((pageHmm / 25.4) * baseDpi);

        const pixelRatio = dpi / baseDpi; 

        const canvasRect = this.map.getCanvas().getBoundingClientRect();
        const topLeft = this.map.unproject([
            previewRect.left - canvasRect.left, 
            previewRect.top - canvasRect.top
        ]);
        const bottomRight = this.map.unproject([
            previewRect.right - canvasRect.left, 
            previewRect.bottom - canvasRect.top
        ]);

        const hiddenContainer = document.createElement("div");
        hiddenContainer.style.width = `${cssWpx}px`;
        hiddenContainer.style.height = `${cssHpx}px`;
        hiddenContainer.style.position = "absolute";
        hiddenContainer.style.left = "-9999px"; 
        document.body.appendChild(hiddenContainer);

        const printMap = new maplibregl.Map({
            container: hiddenContainer,
            style: this.map.getStyle(), 
            bounds: [topLeft, bottomRight], 
            bearing: this.map.getBearing(),
            pitch: this.map.getPitch(),
            interactive: false,
            preserveDrawingBuffer: true,
            fadeDuration: 0,
            pixelRatio: pixelRatio
        });

        printMap.once('idle', () => {
            const printCanvas = printMap.getCanvas();

            const actualWpx = printCanvas.width; 
            const actualHpx = printCanvas.height;

            const exportCanvas = document.createElement("canvas");
            exportCanvas.width = actualWpx;
            exportCanvas.height = actualHpx;
            const ctx = exportCanvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, actualWpx, actualHpx);
            ctx.drawImage(printCanvas, 0, 0);

            const imageData = exportCanvas.toDataURL("image/jpeg", 0.95);

            const pdf = new jsPDF({
                orientation: pageWmm > pageHmm ? "landscape" : "portrait",
                unit: "mm",
                format: [pageWmm, pageHmm],
                compress: true,
            });
            
            pdf.addImage(imageData, "JPEG", 0, 0, pageWmm, pageHmm, undefined, "FAST");

            const filename = `map_export.pdf`; 
            pdf.save(filename);

            printMap.remove();
            document.body.removeChild(hiddenContainer);
        });
    }
}