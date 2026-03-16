import ko from 'knockout';
import viewerTemplate from 'templates/views/components/plugins/map-plugin.htm';
import 'views/components/custom/maplibre-viewer';

export default ko.components.register('map-plugin', {
    viewModel: function(params) {
        const self = this;
    },
    template: viewerTemplate
});
