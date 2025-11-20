import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import iiifReportTemplate from 'templates/views/report-templates/iiif-report.htm';
import L from 'leaflet';
import 'leaflet-iiif';

// udostępniamy Leaflet globalnie, żeby pluginy z okna (np. z <script>) mogły go rozszerzyć
if (typeof window !== 'undefined') {
    window.L = window.L || L;
}

// NODE_ID pola z URL-em IIIF
const DIGITAL_RES_URL_NODE_ID = 'aa8a8e71-4a98-4071-89c3-12fbe5ca9337';

export default ko.components.register('iiif-report', {
    viewModel: function (params) {
        const self = this;

        console.log('[IIIF REPORT] ========== INIT ==========');
        console.log('[IIIF REPORT] params:', params);

        // wymagane przez ReportViewModel
        params.configKeys = params.configKeys || [];
        ReportViewModel.apply(self, [params]);

        console.log('[IIIF REPORT] ReportViewModel applied');
        console.log('[IIIF REPORT] self.report:', self.report);

        // ID zasobu (do unikalnego id kontenera)
        const resourceId = self.report && self.report.get && self.report.get('resourceid');
        self.viewerId = 'iiif-viewer-' + (resourceId || 'unknown');

        // wszystkie tile’e wprost z raportu – JEDEN raz
        const tiles = (self.report && self.report.get && self.report.get('tiles')) || [];

        // tu trzymamy instancję mapy
        self.leafletMap = null;

        /**
         * Zwraca surową wartość node’a z tile’i (bez bawienia się w cards).
         * Szukamy pierwszego tile’a, który ma klucz DIGITAL_RES_URL_NODE_ID w data.
         */
        function getNodeRaw(nodeId) {
            for (let i = 0; i < tiles.length; i++) {
                const tile = tiles[i];
                console.log("tiles",tiles)
                console.log("tiles",tile)
                if (!tile || !tile.data) continue;
                if (tile.data[nodeId] !== undefined) {
                    return tile.data[nodeId];
                }
            }
            return null;
        }

        // computed zwracający czysty URL serwisu IIIF
        self.iiifUrl = ko.pureComputed(function () {
            const raw = getNodeRaw(DIGITAL_RES_URL_NODE_ID);
            if (!raw) {
                return null;
            }

            // przypadek lang-string:
            // { en: { direction: "ltr", value: "http://..." } }
            if (typeof raw === 'object' && !Array.isArray(raw)) {
                const langs = Object.keys(raw);
                if (!langs.length) {
                    return null;
                }
                const langObj = raw[langs[0]];
                if (langObj && langObj.value) {
                    // w raportach value jest zwykle stringiem, ale owijamy na wszelki wypadek
                    const url = ko.unwrap(langObj.value);
                    console.log('[IIIF REPORT] iiifUrl from lang-string:', url);
                    return url || null;
                }
            }

            // fallback – zwykły string
            if (typeof raw === 'string') {
                console.log('[IIIF REPORT] iiifUrl from plain string:', raw);
                return raw;
            }

            console.warn('[IIIF REPORT] Unsupported node value format for IIIF URL:', raw);
            return null;
        });
        function attachMeasureControl(map) {
            const Leaflet = window.L || L;

            function tryAttach(attempt = 0) {
                if (Leaflet.control && typeof Leaflet.control.measure === 'function') {
                    Leaflet.control.measure({
                        primaryLengthUnit: 'pixels',
                        secondaryLengthUnit: 'meters'
                    }).addTo(map);
                    console.log('[IIIF REPORT] Measurement control attached');
                } else if (attempt < 10) {
                    console.log('[IIIF REPORT] Waiting for leaflet-measure, attempt', attempt);
                    setTimeout(() => tryAttach(attempt + 1), 200);
                } else {
                    console.warn('[IIIF REPORT] Measurement plugin still not loaded after retries');
                }
            }

            tryAttach();
        }

        // ====== inicjalizacja Leaflet viewer ======
        function initViewer(iiifServiceUrl) {
            if (!iiifServiceUrl) return;

            const containerId = self.viewerId;
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn('[IIIF REPORT] Viewer container not found:', containerId);
                return;
            }

            // wyczyść starą mapę
            if (self.leafletMap) {
                self.leafletMap.remove();
                self.leafletMap = null;
            }

            if (typeof L === 'undefined') {
                console.error('[IIIF REPORT] Leaflet (L) is not defined. Load Leaflet first.');
                return;
            }

            const infoUrl = iiifServiceUrl.replace(/\/$/, '') + '/info.json';

            const map = L.map(containerId, {
                center: [0, 0],
                zoom: 0,
                crs: L.CRS.Simple,
                zoomControl: true
            });
            self.leafletMap = map;

            if (L.tileLayer && typeof L.tileLayer.iiif === 'function') {
                L.tileLayer.iiif(infoUrl, {}).addTo(map);
            } else {
                console.error('[IIIF REPORT] leaflet-iiif not loaded. L.tileLayer.iiif is missing.');
            }

            attachMeasureControl(map);
        }

        // odpal viewer jak tylko iiifUrl się pojawi
        self.iiifUrl.subscribe(function (url) {
            console.log('[IIIF REPORT] iiifUrl changed -> initViewer', url);
            if (url) {
                setTimeout(function () {
                    initViewer(url);
                }, 0);
            }
        });

        // jeśli URL już jest – zainicjalizuj od razu
        if (self.iiifUrl()) {
            setTimeout(() => initViewer(self.iiifUrl()), 0);
        }

        console.log('[IIIF REPORT] ========== INIT COMPLETE ==========');
    },
    template: iiifReportTemplate
});
