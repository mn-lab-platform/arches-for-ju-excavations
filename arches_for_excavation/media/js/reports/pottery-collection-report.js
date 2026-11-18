import ko from 'knockout';
import tabbedReportTemplate from 'templates/views/report-templates/tabbed.htm';
import { setupTabbedReport } from '../viewmodels/mixins/tab-report-setup';
import 'views/components/custom/pottery-record-table';

export default ko.components.register('pottery-collection-report', {
    viewModel: function(params) {
        const self = this;

        const collectionResourceId =
            ko.unwrap(params.resourceId) ||
            ko.unwrap(params.resourceid) ||
            ko.unwrap(params.resourceinstanceid) ||
            ko.unwrap(params.report && params.report.resourceid) ||
            (params.report && params.report.attributes && params.report.attributes.resourceid);

        const summaryNodegroupIds = ko.unwrap(params.report.cards).map(function(card) {
            return card.nodegroupid;
        });
        const myTabs = [
            ko.mapping.fromJS({
                name: 'Summary',
                icon: 'fa-info-circle',
                main_component: undefined,
                nodegroup_ids: summaryNodegroupIds,
                component_params: {}
            }),
            ko.mapping.fromJS({
                name: 'Amphorae',
                icon: 'pottery-icon-a',
                main_component: 'pottery-record-table',
                nodegroup_ids: [],
                component_params: {
                    potteryType: 'Amphorae',
                    recordType: 'amphorae',
                    collectionResourceId: collectionResourceId
                }
            }),
            ko.mapping.fromJS({
                name: 'Kitchen Ware',
                icon: 'pottery-icon-kw',
                main_component: 'pottery-record-table',
                nodegroup_ids: [],
                component_params: {
                    potteryType: 'Kitchen Ware',
                    recordType: 'kitchen-ware',
                    collectionResourceId: collectionResourceId
                }
            }),
            ko.mapping.fromJS({
                name: 'Table Ware',
                icon: 'pottery-icon-tw',
                main_component: 'pottery-record-table',
                nodegroup_ids: [],
                component_params: {
                    potteryType: 'Table Ware',
                    recordType: 'table-ware',
                    collectionResourceId: collectionResourceId
                }
            }),
            ko.mapping.fromJS({
                name: 'Plain Ware',
                icon: 'pottery-icon-pw',
                main_component: 'pottery-record-table',
                nodegroup_ids: [],
                component_params: {
                    potteryType: 'Plain Ware',
                    recordType: 'plain-ware',
                    collectionResourceId: collectionResourceId
                }
            }),
            ko.mapping.fromJS({
                name: 'Storage Vessel',
                icon: 'pottery-icon-sv',
                main_component: 'pottery-record-table',
                nodegroup_ids: [],
                component_params: {
                    potteryType: 'Storage Vessel',
                    recordType: 'storage-vessel',
                    collectionResourceId: collectionResourceId
                }
            }),
            ko.mapping.fromJS({
                name: 'Lamp',
                icon: 'pottery-icon-l',
                main_component: 'pottery-record-table',
                nodegroup_ids: [],
                component_params: {
                    potteryType: 'Lamp',
                    recordType: 'lamp',
                    collectionResourceId: collectionResourceId
                }
            })
        ];

        setupTabbedReport(self, params, myTabs);
        self.hideEmptyNodes(true);
    },
    template: tabbedReportTemplate
});
