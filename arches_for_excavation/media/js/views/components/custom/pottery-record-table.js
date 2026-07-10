import ko from 'knockout';
import template from 'templates/views/components/custom/pottery-record-table.htm';
import { getCookie } from 'services/service-utils';

function unwrap(value) {
    return ko.unwrap(value);
}

function getActiveTabParam(params, key) {
    const activeTab = params.activeTab ? unwrap(params.activeTab) : null;
    const componentParams = activeTab && activeTab.component_params ? unwrap(activeTab.component_params) : {};
    const value = componentParams && componentParams[key];

    return unwrap(value);
}

export default ko.components.register('pottery-record-table', {
    viewModel: function(params) {
        const self = this;

        self.potteryType = ko.pureComputed(function() {
            return getActiveTabParam(params, 'potteryType') || 'Pottery Records';
        });

        self.recordType = ko.pureComputed(function() {
            return getActiveTabParam(params, 'recordType') || '';
        });

        self.collectionResourceId = ko.pureComputed(function() {
            return getActiveTabParam(params, 'collectionResourceId') || '';
        });

        self.records = ko.observableArray([]);
        self.columns = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.error = ko.observable('');

        self.hasRecords = ko.pureComputed(function() {
            return self.records().length > 0;
        });

        self.loadRecords = function() {
            const collectionResourceId = self.collectionResourceId();
            const recordType = self.recordType();

            if (!collectionResourceId || !recordType) {
                self.records([]);
                return;
            }

            self.loading(true);
            self.error('');

            fetch('/api/pottery/collections/' + collectionResourceId + '/records/' + recordType, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
                .then(function(response) {
                    return response.json().then(function(data) {
                        if (!response.ok || data.status === 'error') {
                            throw new Error(data.message || ('HTTP ' + response.status));
                        }
                        return data;
                    });
                })
                .then(function(data) {
                    self.columns(data.columns || []);
                    self.records(data.records || []);
                })
                .catch(function(error) {
                    self.error('Could not load pottery records: ' + error.message);
                    self.records([]);
                    self.columns([]);
                })
                .finally(function() {
                    self.loading(false);
                });
        };

        self.loadRecords();
    },
    template: template
});
