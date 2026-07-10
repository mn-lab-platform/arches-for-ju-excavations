import ko from 'knockout';
import arches from 'arches';
import viewerTemplate from 'templates/views/components/plugins/cesium-map-plugin.htm';
import 'views/components/custom/cesium-map-plugin';

export default ko.components.register('cesium-map-plugin', {
    viewModel: function(params) {
        const self = this;
    },
    template: viewerTemplate
});
