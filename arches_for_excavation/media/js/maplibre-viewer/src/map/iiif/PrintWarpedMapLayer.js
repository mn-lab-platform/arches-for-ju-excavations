import { WarpedMapLayer } from "@allmaps/maplibre";
import { Viewport } from "@allmaps/render";
import { rectangleToSize, sizesToScale } from "@allmaps/stdlib";
import { lonLatToWebMercator } from "@allmaps/project";

const getCanvasPixelRatio = (canvas) => {
    const rect = canvas.getBoundingClientRect();
    const ratio = rect.width > 0 ? canvas.width / rect.width : window.devicePixelRatio;

    return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
};

export class PrintWarpedMapLayer extends WarpedMapLayer {
    render() {
        if (!this.map || !this.renderer) return;

        const canvas = this.map.getCanvas();
        const canvasPixelRatio = getCanvasPixelRatio(canvas);

        const viewportSize = [
            canvas.width / canvasPixelRatio,
            canvas.height / canvasPixelRatio
        ];

        const geoCenterAsLngLat = this.map.getCenter();
        const projectedGeoCenter = lonLatToWebMercator([
            geoCenterAsLngLat.lng,
            geoCenterAsLngLat.lat
        ]);

        const geoLowerLeftAsLngLat = this.map.unproject([0, viewportSize[1]]);
        const geoLowerRightAsLngLat = this.map.unproject([viewportSize[0], viewportSize[1]]);
        const geoUpperRightAsLngLat = this.map.unproject([viewportSize[0], 0]);
        const geoUpperLeftAsLngLat = this.map.unproject([0, 0]);

        const projectedGeoRectangle = [
            lonLatToWebMercator([geoLowerLeftAsLngLat.lng, geoLowerLeftAsLngLat.lat]),
            lonLatToWebMercator([geoLowerRightAsLngLat.lng, geoLowerRightAsLngLat.lat]),
            lonLatToWebMercator([geoUpperRightAsLngLat.lng, geoUpperRightAsLngLat.lat]),
            lonLatToWebMercator([geoUpperLeftAsLngLat.lng, geoUpperLeftAsLngLat.lat])
        ];

        const projectedGeoSize = rectangleToSize(projectedGeoRectangle);
        const projectedGeoPerViewportScale = sizesToScale(projectedGeoSize, viewportSize);
        const rotation = -(this.map.getBearing() / 180) * Math.PI;

        const viewport = new Viewport(
            viewportSize,
            projectedGeoCenter,
            projectedGeoPerViewportScale,
            { rotation, devicePixelRatio: canvasPixelRatio }
        );

        this.renderer.render(viewport);
    }
}