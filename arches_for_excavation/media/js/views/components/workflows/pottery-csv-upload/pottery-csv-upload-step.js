define([
    'knockout',
    'templates/views/components/workflows/pottery-csv-upload/pottery-csv-upload-step.htm',
    '../../../../services/tile-service',
    '../../../../services/service-utils'
], function(ko, template, tileServiceModule, serviceUtils) {
    return ko.components.register('pottery-csv-upload-step', {
        viewModel: function(params) {
            const self = this;
            const tileService = tileServiceModule.default || tileServiceModule;
            const CONTEXT_NUMBER_NODE_IDS = ['1b5b4e9a-a38d-11eb-96c4-020063fe0012', 'cf7f2532-74f3-487f-9261-bf27825fe04c'];

            self.selectedContextNumber = ko.observable('');            
            self.selectedContextResourceId = ko.observable(ko.unwrap(params.selectedContextResourceId) || '');

            self.fileName = ko.observable('');
            self.fileSize = ko.observable('');
            self.fileType = ko.observable('');
            self.sourceDetailLabel = ko.observable('');
            self.sourceDetailValue = ko.observable('');
            self.headers = ko.observableArray([]);
            self.previewRows = ko.observableArray([]);
            self.rowCount = ko.observable(0);
            self.columnCount = ko.observable(0);
            self.errorMessage = ko.observable(null);
            self.successMessage = ko.observable(null);
            self.importMessage = ko.observable(null);
            self.importResult = ko.observable(null);
            self.potteryImportData = ko.observableArray([]);
            self.selectedPotteryRows = ko.observableArray([]);

            self.hasPreview = ko.pureComputed(function() {
                return self.headers().length > 0;
            });
            self.canImport = ko.pureComputed(function() {
                return !!self.selectedContextResourceId() && self.potteryImportData().length > 0;
            });
            self.loadSelectedContextNumber = function() {
                const resourceId = self.selectedContextResourceId();

                if (!resourceId) {
                    self.selectedContextNumber('');
                    return Promise.resolve();
                }

                return tileService.getAllForResource(resourceId)
                    .then(function(data) {
                        const tiles = data.tiles || data || [];
                        let contextNumber = '';

                        tiles.forEach(function(tile) {
                            const tileData = tile.data || {};
                            CONTEXT_NUMBER_NODE_IDS.forEach(function(nodeId) {
                                const tileNodeValue = tileData[nodeId];
                                console.log('Tile ID:', tile.id, 'Node ID:', nodeId, 'Value:', tileNodeValue);
                                if (tileData[nodeId]) {
                                    contextNumber = tileData[nodeId];
                                }
                            });
                        });

                        self.selectedContextNumber(contextNumber);
                        console.log('Selected Context number:', contextNumber);
                    })
                    .catch(function(error) {
                        self.errorMessage('Could not load selected Context number: ' + error.message);
                    });
            };

            self.loadSelectedContextNumber();            
            function normalizeHeader(header) {
                return (header || '')
                    .replace(/\u0000/g, '')
                    .trim()
                    .toLowerCase()
                    .replace(/[\s\-\/]+/g, '_')
                    .replace(/[^a-z0-9_]+/g, '')
                    .replace(/_+/g, '_')
                    .replace(/^_|_$/g, '');
            }
            function buildPotteryImportData(rows) {
                return rows.map(function(row) {
                    return {
                        contextNo: row.context_no,
                        fieldRemains: buildFieldRemains(row),
                        pottery: [
                            buildPotterySummary(row, 'TW', 'Table Ware'),
                            buildPotterySummary(row, 'A', 'Amphorae'),
                            buildPotterySummary(row, 'KW', 'Kitchen Ware'),
                            buildPotterySummary(row, 'PW', 'Plain Ware'),
                            buildPotterySummary(row, 'SV', 'Storage Vessel'),
                            buildPotterySummary(row, 'L', 'Lamp')
                        ].filter(summaryHasData)
                    };
                });
            }
            function buildFieldRemains(row) {
                return {
                    b_presence: toBoolean(row.b_presence),
                    g_presence: toBoolean(row.g_presence),
                    m_presence: toBoolean(row.m_presence),
                    sh_presence: toBoolean(row.sh_presence),
                    s_presence: toBoolean(row.s_presence),
                    c_presence: toBoolean(row.c_presence)
                };
            }
            function buildPotterySummary(row, prefix, label) {
                const key = prefix.toLowerCase();

                return {
                    type: label,
                    diagnostic: toNumber(row[key + '_diagn_no']),
                    undiagnostic: toNumber(
                        row[key + '_undiagn_no'] ||
                        row[key + '_udiagn_no'] ||
                        row[key + '_undian_fr'] ||
                        row[key + '_undiagn_fr']
                    ),
                    noMaterial: toBoolean(row['no_' + key]),
                    specialFind: toBoolean(row['special_' + key + '_finds']),
                    chronology: row['general_' + key + '_chronology'] || '',
                    remarks: row[key + '_remarks'] || ''
                };
            }

            function toNumber(value) {
                if (value === undefined || value === null || value === '') return null;
                const parsed = Number(String(value).replace(',', '.'));
                return Number.isNaN(parsed) ? null : parsed;
            }

            function toBoolean(value) {
                const normalized = String(value || '').trim().toLowerCase();
                return ['1', 'yes', 'y', 'true', 'x'].includes(normalized);
            }
            function summaryHasData(summary) {
                return summary.diagnostic !== null ||
                    summary.undiagnostic !== null ||
                    summary.noMaterial ||
                    summary.specialFind ||
                    summary.chronology ||
                    summary.remarks;
            }

            self.onFileSelected = function(_, event) {
                const file = event.target.files && event.target.files[0];
                self.clear();

                if (!file) {
                    return;
                }

                if (!isCsvFile(file) && !isWorkbookFile(file)) {
                    self.errorMessage('Choose a CSV or XLSX file.');
                    return;
                }

                self.fileName(file.name);
                self.fileSize(formatBytes(file.size));

                if (isWorkbookFile(file)) {
                    loadWorkbookPreview(file);
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(loadEvent) {
                    try {
                        const result = parseCsvBuffer(loadEvent.target.result);
                        applyParsedFile(file, result, 'CSV loaded. No data has been imported yet.');
                    } catch (error) {
                        self.errorMessage(error.message || 'Could not read CSV.');
                    }
                };
                reader.onerror = function() {
                    self.errorMessage('Could not read CSV.');
                };
                reader.readAsArrayBuffer(file);
            };

            function loadWorkbookPreview(file) {
                const formData = new FormData();
                formData.append('file', file);

                self.importMessage('Reading XLSX preview...');

                fetch('/api/pottery/import-preview/workbook', {
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
                                throw new Error(data.message || ('HTTP ' + response.status));
                            }
                            return data;
                        });
                    })
                    .then(function(result) {
                        applyParsedFile(file, result, 'XLSX loaded. No data has been imported yet.');
                    })
                    .catch(function(error) {
                        self.errorMessage('Could not read XLSX: ' + error.message);
                    })
                    .finally(function() {
                        self.importMessage(null);
                    });
            }

            function applyParsedFile(file, result, successMessage) {
                const potteryImportData = buildPotteryImportData(result.rows);
                const fileType = result.format === 'xlsx' ? 'XLSX' : 'CSV';
                const sourceDetailLabel = result.format === 'xlsx' ? 'Sheet' : 'Delimiter';
                const sourceDetailValue = result.format === 'xlsx'
                    ? (result.sheet || '')
                    : (result.delimiter === '\t' ? 'tab' : result.delimiter);

                console.log('Selected Context resource:', self.selectedContextResourceId());
                console.log(fileType + ' rows:', result.rows);
                console.log('Pottery import data:', potteryImportData);

                self.fileType(fileType);
                self.sourceDetailLabel(sourceDetailLabel);
                self.sourceDetailValue(sourceDetailValue);
                self.headers(result.headers);
                self.previewRows(result.previewRows);
                self.rowCount(result.rowCount);
                self.columnCount(result.headers.length);
                self.potteryImportData(potteryImportData);
                self.successMessage(successMessage);

                if (typeof params.value === 'function') {
                    params.value({
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: fileType,
                        sheet: result.sheet || '',
                        delimiter: result.delimiter || '',
                        headers: result.headers,
                        rowCount: result.rowCount
                    });
                }

                if (params.form && params.form.complete) {
                    params.form.complete(true);
                }
            }
            
            self.importCsv = function() {
                const selectedContextResourceId = self.selectedContextResourceId();
                const selectedContextNumber = String(self.selectedContextNumber() || '').trim();

                const dataForSelectedContext = self.potteryImportData().filter(function(row) {
                    return row.pottery.length > 0;
                });

                if (!selectedContextNumber) {
                    self.errorMessage('Selected Context number is empty. Choose a Context with a Context number before importing.');
                    return;
                }

                if (dataForSelectedContext.length === 0) {
                    self.selectedPotteryRows([]);
                    self.importResult({
                        created: 0,
                        updated: 0,
                        skipped: self.potteryImportData().length,
                        missing_concepts: [],
                        errors: []
                    });
                    self.errorMessage('No pottery rows with importable pottery data were found in the selected file.');
                    return;
                }

                const payload = {
                    contextResourceId: selectedContextResourceId,
                    contextNumber: selectedContextNumber,
                    rows: dataForSelectedContext
                };

                self.importMessage('Sending pottery data to backend...');                
                self.selectedPotteryRows(dataForSelectedContext);
                self.importResult({
                    created: 0,
                    updated: 0,
                    skipped: dataForSelectedContext.length === 0 ? self.potteryImportData().length : 0,
                    missing_concepts: [],
                    errors: []
                });
                fetch('/api/pottery/import-preview', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': serviceUtils.getCookie('csrftoken')
                    },
                    body: JSON.stringify(payload)
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
                        console.log('Backend pottery response:', data);

                        self.importResult({
                            created: data.created ? 1 : 0,
                            updated: data.updated ? 1 : 0,
                            skipped: 0,
                            missing_concepts: [],
                            errors: []
                        });

                        self.successMessage(
                            data.message + ' Saved ' + data.summaryCount + ' pottery summaries.'
                        );
                    })
                    .catch(function(error) {
                        self.errorMessage('Backend import preview failed: ' + error.message);
                    })
                    .finally(function() {
                        self.importMessage(null);
                    });
            };

            self.clear = function() {
                self.fileName('');
                self.fileSize('');
                self.fileType('');
                self.sourceDetailLabel('');
                self.sourceDetailValue('');
                self.headers([]);
                self.previewRows([]);
                self.rowCount(0);
                self.columnCount(0);
                self.potteryImportData([]);
                self.errorMessage(null);
                self.successMessage(null);
                self.importMessage(null);
                self.importResult(null);
            };

            function parseCsvBuffer(buffer) {
                const decoded = decodeBuffer(buffer);
                const text = decoded.text.replace(/\u0000/g, '').replace(/^\uFEFF/, '');
                const lines = text.split(/\r\n|\n|\r/).filter(function(line) {
                    return line.trim().length > 0;
                });

                if (!lines.length) {
                    throw new Error('CSV is empty.');
                }

                const delimiter = detectDelimiter(lines[0]);
                const headers = splitCsvLine(lines[0], delimiter).map(function(header) {
                    return header.trim();
                });
                const dataLines = lines.slice(1);
                const previewRows = dataLines.slice(0, 5).map(function(line) {
                    return splitCsvLine(line, delimiter);
                });

                const rows = dataLines.map(function(line) {
                const values = splitCsvLine(line, delimiter);
                const row = {};

                headers.forEach(function(header, index) {
                    row[normalizeHeader(header)] = (values[index] || '').trim();
                });

                return row;
                });

                return {
                    encoding: decoded.encoding,
                    delimiter: delimiter,
                    headers: headers,
                    rows: rows,
                    previewRows: previewRows,
                    rowCount: rows.length
                };
            }

            function isCsvFile(file) {
                return /\.csv$/i.test(file.name);
            }

            function isWorkbookFile(file) {
                return /\.xlsx$/i.test(file.name);
            }

            function decodeBuffer(buffer) {
                const bytes = new Uint8Array(buffer);
                if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) {
                    return { encoding: 'utf-16le', text: new TextDecoder('utf-16le').decode(bytes) };
                }
                if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
                    return { encoding: 'utf-16be', text: new TextDecoder('utf-16be').decode(bytes) };
                }

                const sample = bytes.slice(0, Math.min(bytes.length, 200));
                const zeroCount = sample.filter(function(byte) { return byte === 0; }).length;
                if (zeroCount > sample.length / 4) {
                    return { encoding: 'utf-16le', text: new TextDecoder('utf-16le').decode(bytes) };
                }

                return { encoding: 'utf-8', text: new TextDecoder('utf-8').decode(bytes) };
            }

            function detectDelimiter(headerLine) {
                const candidates = [';', ',', '\t'];
                let best = ';';
                let bestCount = -1;
                candidates.forEach(function(candidate) {
                    const count = headerLine.split(candidate).length;
                    if (count > bestCount) {
                        best = candidate;
                        bestCount = count;
                    }
                });
                return best;
            }

            function splitCsvLine(line, delimiter) {
                const values = [];
                let current = '';
                let inQuotes = false;

                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    const next = line[i + 1];

                    if (char === '"' && next === '"') {
                        current += '"';
                        i += 1;
                    } else if (char === '"') {
                        inQuotes = !inQuotes;
                    } else if (char === delimiter && !inQuotes) {
                        values.push(current);
                        current = '';
                    } else {
                        current += char;
                    }
                }
                values.push(current);
                return values;
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
