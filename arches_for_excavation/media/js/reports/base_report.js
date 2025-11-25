import ko from 'knockout';
import ReportViewModel from 'viewmodels/report';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import 'views/components/custom/cesium-viewer';

export default ko.components.register('base_report', {
    viewModel: function(params) {
        const self = this;
        params.configKeys = ['tabs', 'activeTabIndex'];

        ReportViewModel.apply(this, [params]);

        self.tabs = ko.observableArray([
              ko.mapping.fromJS({
                  name: 'Info',
                  icon: 'fa-info-circle',         // information icon
                  main_component: undefined,
                  nodegroup_ids: []
               }),
               ko.mapping.fromJS({
                  name: 'Cesium Viewer',
                  icon: 'fa-cube',                // 3D-model icon
                  main_component: 'cesium-viewer',
                  nodegroup_ids: []
               })
           ]);
           self.activeTabIndex = ko.observable(0);
            self.activeTab = ko.observable(self.tabs()[0]);
            this.icons = ko.observableArray([]);
        // Make the tabbed template bindings happy
        self.setActiveTab = function(tabIndex) {
            self.activeTabIndex(tabIndex);
            self.activeTab(self.tabs()[ko.unwrap(self.activeTabIndex)]);
        };

        // compute activeCards first (used by activeTabEmpty)
        this.activeCards = ko.computed(function() {
            var cardList = [];
            ko.unwrap(self.report.cards).forEach(function(card) {
                if (self.activeTabIndex() !== undefined && self.tabs().length > 0 && self.tabs().length -1 >= self.activeTabIndex()) {
                    self.tabs()[self.activeTabIndex()]["nodegroup_ids"]().forEach( function(tabNodegroupId) {
                        if (card.nodegroupid === tabNodegroupId) {
                            cardList.push(card);
                        }
                    });
                }
            });
            return cardList;
        });

        this.activeTabEmpty = ko.computed(function() {
            return self.activeCards().reduce(function(count, card) {
                return count += ko.unwrap(card.tiles).length || 0;
            }, 0) <= 0;
        });

        self.addTab = function(){
            const newTab = ko.mapping.fromJS({ name: '', icon: '', main_component: undefined, nodegroup_ids: [] });
            self.tabs.unshift(newTab);
            self.setActiveTab(0);
        };

        self.removeTab = function(tab){
            let index;
            if (self.tabs().length > 0) {
                index = self.tabs.indexOf(tab) > 0 ? self.tabs.indexOf(tab) - 1 : 0;
                self.setActiveTab(index);
                self.tabs.remove(tab);
            }
        };

        // Optional: used by some drag/drop tab reordering bindings
        self.moveTab = function(v) {
            if (v.sourceIndex === ko.unwrap(self.activeTabIndex)) {
                self.setActiveTab(v.targetIndex);
            }
        };
        console.log("Base ReportViewModel initialized with params:", params);
    },
    template: tabbedReportTemplate 
});