import ko from 'knockout';
import viewerTemplate from 'templates/views/components/custom/cesium-map-plugin.htm';
import { initializePlugin } from '../../../cesium-plugin/src/index';

export default ko.components.register('cesium-map-plugin-component', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = [];

        setTimeout(() => {
            initializePlugin();
        }, 0);
    },
    template: viewerTemplate
});