import { Ion, CesiumWidget, Cesium3DTileset, Color, HeadingPitchRange, Matrix4 } from 'cesium';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2IzZGU5Yy02MzRkLTRmYjUtYTVlZS04MThmZTQwZTRlMGEiLCJpZCI6MjIwMzM3LCJpYXQiOjE3NjMwMjY2ODh9.X0j4gnk-2MMBEiu11B9S-sjWv6XMDYD5y12hlpGjib4';

export class Scene {
    constructor(containerId) {
        this.widget = new CesiumWidget(containerId, {
          globe: false,
        });
        this._configureScene();
    }

    _configureScene() {
        this.widget.scene.skyBox = undefined;
        this.widget.scene.skyAtmosphere = undefined;
        this.widget.scene.backgroundColor = new Color(0.85, 0.85, 0.95, 1.0);
        this.widget.scene.moon.show = false;
        this.widget.scene.sun.show = false;
        this.widget.scene.fog.enabled = false;
    }

    async loadTileset(url) {
        const tileset = await Cesium3DTileset.fromUrl(url, {
            maximumMemoryUsage: 1024
        });

        const scale = 100;

        const scaleMatrix = Matrix4.fromUniformScale(scale);
        tileset.modelMatrix = scaleMatrix;

        this.widget.scene.primitives.add(tileset);
        const boundingSphere = tileset.boundingSphere;
        const scaledRadius = boundingSphere.radius;

        this.widget.scene.screenSpaceCameraController.minimumZoomDistance = scaledRadius * 0.3;
        this.widget.camera.viewBoundingSphere(boundingSphere, new HeadingPitchRange(0.5, -0.5, scaledRadius * 3));
    }
}
