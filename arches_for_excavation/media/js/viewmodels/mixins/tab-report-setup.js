import $ from 'jquery';
import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import ReportViewModel from 'viewmodels/report';
import 'bindings/chosen';

export function setupTabbedReport(viewModel, params, tabsConfig) {
    params.configKeys = ['tabs', 'activeTabIndex'];
    ReportViewModel.apply(viewModel, [params]);

    viewModel.tabs = ko.observableArray(tabsConfig || []);

    viewModel.activeTabIndex = ko.observable(0);
    viewModel.activeTab = ko.observable(viewModel.tabs()[0]);
    viewModel.icons = ko.observableArray([]);

    viewModel.icons = ko.observableArray([]);
    if (!viewModel.summary) {
        $.ajax({
            type: "GET",
            url: arches.urls.icons})
            .done(function(response) {
                var parsed = response.icons.map(function(r){
                    return {
                        text: r.name,
                        id: r.cssclass,
                        name: r.name,
                        cssclass: r.cssclass
                    };});
                viewModel.icons(parsed);
            });
    }

    viewModel.setActiveTab = function(tabIndex) {
        viewModel.activeTabIndex(tabIndex);
        viewModel.activeTab(viewModel.tabs()[ko.unwrap(viewModel.activeTabIndex)]);
    };

    viewModel.moveTab = function(v) {
        if (v.sourceIndex === viewModel.activeTabIndex()) {
            viewModel.setActiveTab(v.targetIndex);
        }
    };
    
    viewModel.addTab = function(){
        const newTab = ko.mapping.fromJS({ name: '', icon: '', main_component: undefined, nodegroup_ids: [] });
        viewModel.tabs.unshift(newTab);
        viewModel.setActiveTab(0);
    };

    viewModel.removeTab = function(tab){
        let index;
        if (viewModel.tabs().length > 0) {
            index = viewModel.tabs.indexOf(tab) > 0 ? viewModel.tabs.indexOf(tab) - 1 : 0;
            viewModel.setActiveTab(index);
            viewModel.tabs.remove(tab);
        }
    };

    viewModel.activeCards = ko.computed(function() {
        var cardList = [];
        if (!viewModel.report || !viewModel.report.cards) return cardList;

        ko.unwrap(viewModel.report.cards).forEach(function(card) {
            if (viewModel.activeTabIndex() !== undefined && viewModel.tabs().length > 0 && viewModel.tabs().length -1 >= viewModel.activeTabIndex()) {
                viewModel.tabs()[viewModel.activeTabIndex()]["nodegroup_ids"]().forEach( function(tabNodegroupId) {
                    if (card.nodegroupid === tabNodegroupId) {
                        cardList.push(card);
                    }
                });
            }
        });
        return cardList;
    });

    viewModel.activeTabEmpty = ko.computed(function() {
        return viewModel.activeCards().reduce(function(count, card) {
            return count += ko.unwrap(card.tiles).length || 0;
        }, 0) <= 0;
    });
};