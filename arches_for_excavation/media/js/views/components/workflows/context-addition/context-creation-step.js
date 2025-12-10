define([
    'knockout',
    'arches',
    'templates/views/components/workflows/context-addition/context-creation-step.htm'
], function(ko, arches, template) {
    'use strict';

    function viewModel(params) {
        const self = this;
        
        self.graphid = params.graphid;
        self.graphName = params.graphName || 'Resource';
        self.loading = ko.observable(true);
        self.error = ko.observable('');
        
        // This will hold the card configuration
        self.creatorCardId = ko.observable(null);
        
        // New resource instance data (before save)
        self.newResourceInstance = ko.observable(null);
        
        // Created resource ID (after save)
        self.createdResourceId = params.createdResourceId || ko.observable(null);

        // Fetch first card for this graph
        function fetchCreatorCardId(graphid) {
            if (!graphid) {
                self.loading(false);
                return Promise.resolve(null);
            }

            const baseUrl = (arches && arches.urls && arches.urls.root) ? arches.urls.root : '/';
            const graphsUrl = baseUrl + 'graphs/' + encodeURIComponent(graphid) + '?cards=true';

            return window.fetch(graphsUrl, { credentials: 'include' })
                .then(r => {
                    if (!r.ok) throw new Error(`Graph fetch failed: ${r.status}`);
                    return r.json();
                })
                .then(json => {
                    let cards = json?.graph?.cards || json?.cards || [];
                    const active = cards.find(c => c && c.active !== false) || cards[0];
                    const cardid = active?.cardid || active?.cardId || null;

                    self.creatorCardId(cardid);
                    
                    // Initialize new resource instance structure
                    self.newResourceInstance(ko.observable({
                        graphid: graphid,
                        resourceid: ko.observable(null),
                        tileid: ko.observable(null),
                        cardid: cardid,
                        parenttileid: ko.observable(null),
                        provisionalTileViewModel: ko.observable(null),
                        tile: null
                    }));
                    
                    self.loading(false);
                    return cardid;
                })
                .catch(err => {
                    console.error('[context-creation] Error fetching card:', err);
                    self.error('Failed to load creator: ' + (err.message || err));
                    self.loading(false);
                    return null;
                });
        }

        // Build params for related-instance-creator
        self.creatorParams = ko.pureComputed(function() {
            const nri = self.newResourceInstance();
            const nriValue = nri ? ko.unwrap(nri) : null;
            
            if (!nriValue) return null;

            return {
                graphid: self.graphid,
                cardid: self.creatorCardId(),
                resourceid: nriValue.resourceid,
                tileid: nriValue.tileid,
                parenttileid: nriValue.parenttileid,
                provisionalTileViewModel: nriValue.provisionalTileViewModel,
                tile: nriValue.tile,
                form: params.form || null,
                pageVm: params.pageVm
            };
        });

        // Mark as NOT complete initially - user must fill cards first
        if (params.form) {
            params.form.complete = ko.observable(false);
            
            // Override save to actually create the resource
            const originalSave = params.form.save;
            params.form.save = function() {
                console.log('[context-creation] Saving resource...');
                
                const nri = self.newResourceInstance();
                const nriValue = nri ? ko.unwrap(nri) : null;
                
                if (!nriValue || !nriValue.resourceid) {
                    console.error('[context-creation] No resource ID found');
                    return Promise.reject('No resource was created');
                }
                
                const resourceId = ko.unwrap(nriValue.resourceid);
                console.log('[context-creation] Resource created with ID:', resourceId);
                
                self.createdResourceId(resourceId);
                
                if (originalSave) {
                    return originalSave.apply(this, arguments);
                }
                
                return Promise.resolve(resourceId);
            };
        }

        // Initialize
        fetchCreatorCardId(self.graphid);
    }

    return ko.components.register('context-creation-step', {
        viewModel: viewModel,
        template: template
    });
});