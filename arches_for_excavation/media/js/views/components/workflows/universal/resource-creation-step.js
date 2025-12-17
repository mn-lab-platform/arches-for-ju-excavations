define([
    'knockout',
    'arches',
    'templates/views/components/workflows/universal/resource-creation-step.htm',
], function(ko, arches, template) {
    return ko.components.register('resource-creation-step', {
        viewModel: function(params) {
            const self = this;
            self.graphid = params.graphid || null;
            self.graphName = params.graphName || '';
            self.newResourceInstance = ko.observable({});
            self.createdResourceId = ko.observable(null);

            self.creatorParams = ko.observable({
                graphName: self.graphName,
                graphid: self.graphid,
                cardid: '',
                resourceid: ko.observable(null),
                tileid: ko.observable(null),
                parenttileid: ko.observable(null),
                provisionalTileViewModel: ko.observable(null),
                tile: null,
                form: params.form || null
            });

            //TODO: handle delete resource button
            self.creatorParams().resourceid.subscribe(function(newResourceId) {
                if (newResourceId) {
                    console.log("created new resource: ", newResourceId);
                    
                    self.createdResourceId(newResourceId);
                    
                    if (typeof params.value === 'function') {
                        params.value(newResourceId);
                    }
                    
                    if (params.form && params.form.complete) {
                        params.form.complete(true);
                    }
                }
            });
        },
        template: template
    });
});