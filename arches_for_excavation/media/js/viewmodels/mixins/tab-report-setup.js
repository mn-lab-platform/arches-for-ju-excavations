import $ from 'jquery';
import _ from 'underscore';
import ko from 'knockout';
import arches from 'arches';
import ReportViewModel from 'viewmodels/report';
import 'bindings/chosen';

export function setupTabbedReport(viewModel, params, tabsConfig) {
    params.configKeys = ['tabs', 'activeTabIndex'];
    ReportViewModel.apply(viewModel, [params]);

    if (!ko.isObservable(viewModel.activeTabIndex)) {
        viewModel.activeTabIndex = ko.observable(Number(viewModel.activeTabIndex) || 0);
    }
    viewModel.tabs = ko.observableArray(tabsConfig || []);

    if (viewModel.activeTabIndex() > viewModel.tabs().length - 1) {
        viewModel.activeTabIndex(0);
    }
    
    viewModel.icons = ko.observableArray([]);

    if (!self.summary) {
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

    viewModel.activeTab = ko.observable(viewModel.tabs()[ko.unwrap(viewModel.activeTabIndex)]);
    viewModel.report.configJSON.subscribe(function(){
        if (viewModel.tabs.indexOf(viewModel.activeTab()) === -1) {
            viewModel.activeTab(viewModel.tabs()[ko.unwrap(viewModel.activeTabIndex)]);
        }
    });
    viewModel.topcards = ko.unwrap(viewModel.report.cards).map(function(card){
        return {name: card.model.name(), nodegroupid: card.nodegroupid};
    });

    viewModel.setActiveTab = function(tabIndex){
        viewModel.activeTabIndex(tabIndex);
        viewModel.activeTab(viewModel.tabs()[ko.unwrap(viewModel.activeTabIndex)]);
    };

    viewModel.activeCards = ko.computed(function() {
        var cardList = [];
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

    viewModel.moveTab = function(v) {
        if (v.sourceIndex === viewModel.activeTabIndex()) {
            viewModel.setActiveTab(v.targetIndex);
        }
    };

    viewModel.addTab = function(){
        var newTab = koMapping.fromJS({
            icon: '',
            name: '',
            "nodegroup_ids": []
        });
        viewModel.tabs.unshift(newTab);
        viewModel.setActiveTab(0);
    };

    viewModel.removeTab = function(tab){
        var index;
        if (viewModel.tabs().length > 0) {
            index = viewModel.tabs.indexOf(tab) > 0 ? viewModel.tabs.indexOf(tab) - 1 : 0;
            viewModel.setActiveTab(index);
            viewModel.tabs.remove(tab);
        }
    };
}