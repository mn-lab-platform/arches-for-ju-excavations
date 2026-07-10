define([
    'knockout',
    'templates/views/components/workflows/pottery-record-import/pottery-record-import-step.htm',
    '../../../../services/service-utils'
], function(ko, template, serviceUtils) {
    return ko.components.register('pottery-record-import-step', {
        viewModel: function(params) {
            const self = this;

            self.selectedPotteryCollectionResourceId = ko.observable(
                ko.unwrap(params.selectedPotteryCollectionResourceId) || ''
            );

            const defaultRecordTypes = [
                { value: 'amphorae', label: 'Amphorae' },
                { value: 'storage-vessel', label: 'Storage Vessel' },
                { value: 'table-ware', label: 'Table Ware' }
            ];

            self.recordTypes = ko.observableArray(ko.unwrap(params.recordTypes) || defaultRecordTypes);
            self.recordType = ko.observable(ko.unwrap(params.recordType) || self.recordTypes()[0].value);
            self.recordLabel = ko.pureComputed(function() {
                const selectedRecordType = self.recordType();
                const matchingRecordType = self.recordTypes().find(function(recordType) {
                    return recordType.value === selectedRecordType;
                });

                return matchingRecordType ? matchingRecordType.label : 'Pottery';
            });

            self.file = ko.observable(null);
            self.fileName = ko.observable('');
            self.fileSize = ko.observable('');
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.importMessage = ko.observable(null);
            self.preview = ko.observable(null);
            self.previewRecords = ko.observableArray([]);
            self.previewColumns = ko.observableArray([]);
            self.dictionaryFields = ko.observable({});
            self.dictionaryOptionsByField = ko.observable({});
            self.missingDictionaryValues = ko.observableArray([]);
            self.invalidDictionaryNodes = ko.observableArray([]);
            self.importComplete = ko.observable(false);
            self.canPreview = ko.pureComputed(function() {
                return !!self.selectedPotteryCollectionResourceId() && !!self.file();
            });
            self.importButtonLabel = ko.pureComputed(function() {
                return 'Preview ' + self.recordLabel() + ' Records';
            });
            self.canCommit = ko.pureComputed(function() {
                return self.previewRecords().length > 0 && self.currentMissingDictionaryValues().length === 0 && !self.importComplete();
            });
            self.commitButtonLabel = ko.pureComputed(function() {
                return 'Create ' + self.recordLabel() + ' Records';
            });
            self.currentMissingDictionaryValues = ko.pureComputed(function() {
                const counts = {};

                self.previewRecords().forEach(function(record) {
                    const missingFields = ko.unwrap(record._missingDictionaryFields) || [];

                    missingFields.forEach(function(field) {
                        const dictionaryValue = self.getDictionaryObservable(record, field)();

                        if (dictionaryValue) {
                            return;
                        }

                        const dictionary = self.dictionaryFields()[field] || '';
                        const value = self.cellValue(record, field);
                        const key = field + '|' + dictionary + '|' + value;

                        if (!counts[key]) {
                            counts[key] = {
                                field: field,
                                dictionary: dictionary,
                                value: value,
                                count: 0
                            };
                        }

                        counts[key].count += 1;
                    });
                });

                if (self.previewRecords().length) {
                    return Object.keys(counts).map(function(key) {
                        return counts[key];
                    });
                }

                return self.missingDictionaryValues();
            });

            self.recordType.subscribe(function() {
                self.errorMessage(null);
                self.successMessage(null);
                self.preview(null);
                self.previewRecords([]);
                self.previewColumns([]);
                self.dictionaryFields({});
                self.dictionaryOptionsByField({});
                self.missingDictionaryValues([]);
                self.invalidDictionaryNodes([]);
                self.importComplete(false);
            });

            self.onFileSelected = function(_, event) {
                const file = event.target.files && event.target.files[0];

                self.errorMessage(null);
                self.successMessage(null);
                self.preview(null);
                self.previewRecords([]);
                self.previewColumns([]);
                self.dictionaryFields({});
                self.dictionaryOptionsByField({});
                self.missingDictionaryValues([]);
                self.invalidDictionaryNodes([]);
                self.importComplete(false);
                if (!file) {
                    self.file(null);
                    self.fileName('');
                    self.fileSize('');
                    return;
                }

                if (!/\.xlsx$/i.test(file.name)) {
                    self.file(null);
                    self.fileName('');
                    self.fileSize('');
                    self.errorMessage('Choose an XLSX file.');
                    return;
                }

                self.file(file);
                self.fileName(file.name);
                self.fileSize(formatBytes(file.size));
                self.successMessage('XLSX selected. Import has not been loaded yet.');
            };

            self.runImport = function() {
                if (!self.canPreview()) {
                    self.errorMessage('Select Pottery Collection and XLSX file first.');
                    return;
                }

                const formData = new FormData();
                formData.append('potteryCollectionResourceId', self.selectedPotteryCollectionResourceId());
                formData.append('file', self.file());

                self.importMessage('Reading ' + self.recordLabel() + ' records...');
                self.errorMessage(null);
                self.successMessage(null);
                self.preview(null);
                self.previewColumns([]);
                self.previewRecords([]);
                self.dictionaryFields({});
                self.dictionaryOptionsByField({});
                self.missingDictionaryValues([]);
                self.invalidDictionaryNodes([]);
                self.importComplete(false);

                fetch('/api/pottery/records/' + self.recordType() + '/preview', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'X-CSRFToken': serviceUtils.getCookie('csrftoken')
                    },
                    body: formData
                })
                    .then(function(response) {
                        return response.json().then(function(data) {
                            if (!response.ok || data.status === 'error') {
                                const error = new Error(data.message || ('HTTP ' + response.status));
                                error.data = data;
                                throw error;
                            }
                            return data;
                        });
                    })
                    .then(function(data) {
                        console.log(self.recordLabel() + ' preview response:', data);

                        self.preview(data);
                        self.dictionaryFields(data.dictionaryFields || {});
                        self.dictionaryOptionsByField(data.dictionaryOptionsByField || {});
                        self.previewColumns(data.columns || []);
                        self.previewRecords((data.records || []).map(makeEditableRecord));
                        self.missingDictionaryValues(data.missingDictionaryValues || []);
                        self.successMessage(
                            'Loaded ' + data.parsed + ' ' + self.recordLabel() + ' records from sheet "' + data.sheet + '".'
                        );
                    })
                    .catch(function(error) {
                        const errorData = error.data || {};
                        self.missingDictionaryValues(errorData.missingDictionaryValues || []);
                        self.invalidDictionaryNodes(errorData.invalidDictionaryNodes || []);
                        self.errorMessage('Import failed: ' + error.message);
                    })
                    .finally(function() {
                        self.importMessage(null);
                    });
            };

            self.commitImport = function() {
                if (!self.canCommit()) {
                    self.errorMessage('Choose dictionary values for every highlighted field before creating records.');
                    return;
                }

                self.importMessage('Creating ' + self.recordLabel() + ' records...');
                self.errorMessage(null);
                self.successMessage(null);
                self.missingDictionaryValues([]);
                self.invalidDictionaryNodes([]);

                fetch('/api/pottery/records/' + self.recordType() + '/commit', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': serviceUtils.getCookie('csrftoken')
                    },
                    body: JSON.stringify({
                        potteryCollectionResourceId: self.selectedPotteryCollectionResourceId(),
                        records: self.previewRecords().map(serializeEditableRecord)
                    })
                })
                    .then(function(response) {
                        return response.json().then(function(data) {
                            if (!response.ok || data.status === 'error') {
                                const error = new Error(data.message || ('HTTP ' + response.status));
                                error.data = data;
                                throw error;
                            }
                            return data;
                        });
                    })
                    .then(function(data) {
                        console.log(self.recordLabel() + ' commit response:', data);

                        self.preview(data);
                        self.previewColumns(data.columns || []);
                        self.previewRecords((data.records || []).map(makeEditableRecord));
                        self.importComplete(true);
                        self.successMessage('Created ' + data.created + ' ' + self.recordLabel() + ' records.');

                        if (params.form && params.form.complete) {
                            params.form.complete(true);
                        }
                    })
                    .catch(function(error) {
                        const errorData = error.data || {};
                        self.missingDictionaryValues(errorData.missingDictionaryValues || []);
                        self.invalidDictionaryNodes(errorData.invalidDictionaryNodes || []);
                        self.errorMessage('Import failed: ' + error.message);
                    })
                    .finally(function() {
                        self.importMessage(null);
                    });
            };

            self.isDictionaryColumn = function(key) {
                return !!self.dictionaryFields()[key];
            };

            self.isBooleanColumn = function(key) {
                return key === 'drawn';
            };

            self.getOptions = function(key) {
                return self.dictionaryOptionsByField()[key] || [];
            };

            self.getCellObservable = function(record, key) {
                if (!ko.isObservable(record[key])) {
                    record[key] = ko.observable(record[key] || '');
                }

                return record[key];
            };

            self.getDictionaryObservable = function(record, key) {
                record._dictionaryValues = record._dictionaryValues || {};

                if (!ko.isObservable(record._dictionaryValues[key])) {
                    record._dictionaryValues[key] = ko.observable(record._dictionaryValues[key] || '');
                }

                return record._dictionaryValues[key];
            };

            self.cellValue = function(record, key) {
                const value = ko.unwrap(record[key]);

                if (self.isBooleanColumn(key)) {
                    return value ? 'Yes' : '';
                }

                return value || '';
            };

            self.isMissingDictionaryField = function(record, key) {
                const missingFields = ko.unwrap(record._missingDictionaryFields) || [];

                return missingFields.indexOf(key) !== -1 && !self.getDictionaryObservable(record, key)();
            };
            self.getCellError = function(record, key) {
                const errors = record._cellErrors || {};
                return errors[key] || '';
            };
            function makeEditableRecord(record) {
                const editableRecord = {};

                Object.keys(record || {}).forEach(function(key) {
                    if (key === '_dictionaryValues') {
                        editableRecord._dictionaryValues = {};

                        Object.keys(record._dictionaryValues || {}).forEach(function(field) {
                            editableRecord._dictionaryValues[field] = ko.observable(record._dictionaryValues[field] || '');
                        });
                    } else if (key === '_missingDictionaryFields') {
                        editableRecord._missingDictionaryFields = ko.observableArray(record._missingDictionaryFields || []);
                    } else if (key === 'drawn') {
                        editableRecord[key] = ko.observable(toBoolean(record[key]));
                    } else if (key === '_cellErrors') {
                        editableRecord._cellErrors = record._cellErrors || {};      
                    } else {
                        editableRecord[key] = ko.observable(record[key] || '');
                    }
                });
                editableRecord._cellErrors = editableRecord._cellErrors || {};
                editableRecord._dictionaryValues = editableRecord._dictionaryValues || {};
                editableRecord._missingDictionaryFields = editableRecord._missingDictionaryFields || ko.observableArray([]);

                return editableRecord;
            }

            function serializeEditableRecord(record) {
                const serializedRecord = {};

                Object.keys(record || {}).forEach(function(key) {
                    if (key === '_dictionaryValues') {
                        serializedRecord._dictionaryValues = {};

                        Object.keys(record._dictionaryValues || {}).forEach(function(field) {
                            serializedRecord._dictionaryValues[field] = ko.unwrap(record._dictionaryValues[field]) || '';
                        });
                    } else if (key === '_missingDictionaryFields') {
                        serializedRecord._missingDictionaryFields = ko.unwrap(record._missingDictionaryFields) || [];
                    } else if (ko.isObservable(record[key])) {
                        serializedRecord[key] = ko.unwrap(record[key]);
                    } else if (key === '_cellErrors') {
                        serializedRecord._cellErrors = record._cellErrors || {};
                    } else {
                        serializedRecord[key] = record[key];
                    }
                });

                return serializedRecord;
            }

            function toBoolean(value) {
                if (value === true) {
                    return true;
                }

                const normalized = String(value || '').trim().toLowerCase();

                return ['1', 'yes', 'y', 'true', 'x'].indexOf(normalized) !== -1;
            }

            function formatBytes(bytes) {
                if (!bytes) return '0 B';
                const units = ['B', 'KB', 'MB', 'GB'];
                let size = bytes;
                let unit = 0;

                while (size >= 1024 && unit < units.length - 1) {
                    size = size / 1024;
                    unit += 1;
                }

                return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
            }
        },
        template: template
    });
});
