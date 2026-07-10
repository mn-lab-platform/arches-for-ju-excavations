import store from "../core/store";

export class PrintPreview {
    constructor(mapRootContainer) {
        this.mapRootContainer = mapRootContainer;
        this._previewOverlay = null;
        this._previewPaper = null;
    }

    mountPrintPreview() {
        if (!this.mapRootContainer || this._previewOverlay) return;

        const overlay = document.createElement("div");
        overlay.className = "print-preview-overlay";

        const paper = document.createElement("div");
        paper.className = "print-preview-paper";

        overlay.appendChild(paper);
        this.mapRootContainer.appendChild(overlay);

        this._previewOverlay = overlay;
        this._previewPaper = paper;
    }

    unmountPrintPreview() {
        if (this._previewOverlay?.parentNode) {
            this._previewOverlay.parentNode.removeChild(this._previewOverlay);
        }
        this._previewOverlay = null;
        this._previewPaper = null;
    }

    renderPrintPreview(paperSize, isHorizontal) {
        if (!this._previewPaper || !this.mapRootContainer) return;

        const [paperWmm, paperHmm] = paperSize;

        const paperW = isHorizontal ? paperHmm : paperWmm;
        const paperH = isHorizontal ? paperWmm : paperHmm;
        const ratio = paperW / paperH;

        const rootRect = this.mapRootContainer.getBoundingClientRect();
        const leftOffset = Math.max(0, store.menuPanelWidth || 0);

        const availW = Math.max(0, rootRect.width - leftOffset);
        const availH = rootRect.height;

        const maxW = availW * 0.98;
        const maxH = availH * 0.98;

        let rectW = maxW;
        let rectH = rectW / ratio;

        if (rectH > maxH) {
            rectH = maxH;
            rectW = rectH * ratio;
        }

        const left = leftOffset + (availW - rectW) / 2;
        const top = (availH - rectH) / 2;

        Object.assign(this._previewPaper.style, {
            width: `${rectW}px`,
            height: `${rectH}px`,
            left: `${left}px`,
            top: `${top}px`,
        });
    }
}