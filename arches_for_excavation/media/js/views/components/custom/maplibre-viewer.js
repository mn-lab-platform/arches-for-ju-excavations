import ko from 'knockout';
import viewerTemplate from 'templates/views/components/custom/maplibre-viewer.htm';
import { initializePlugin } from '../../../maplibre-viewer/src/index';

export default ko.components.register('maplibre-viewer', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

        setTimeout(() => {
            initializePlugin();
        }, 0);
    },
    template: viewerTemplate
});