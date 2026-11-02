import ko from 'knockout';
import { jsPDF } from 'jspdf';
import template from 'templates/views/components/plugins/resource-table.htm';
import { exportCsv as requestCsv, getColumns, getModels, getTable } from 'services/resource-table-api';

ko.bindingHandlers.resourceTableViewportHeight = {
    init(element, valueAccessor) {
        let frame = null;
        const updateHeight = () => {
            if (frame !== null) window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(() => {
                frame = null;
                if (!element.getClientRects().length) return;

                const viewportBottom = window.visualViewport
                    ? window.visualViewport.offsetTop + window.visualViewport.height
                    : window.innerHeight;
                const height = Math.max(160, viewportBottom - element.getBoundingClientRect().top - 16);
                element.style.height = `${height}px`;
            });
        };

        const tableBuiltSubscription = valueAccessor().subscribe(updateHeight);
        window.addEventListener('resize', updateHeight);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateHeight);
        }
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            if (frame !== null) window.cancelAnimationFrame(frame);
            tableBuiltSubscription.dispose();
            window.removeEventListener('resize', updateHeight);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateHeight);
            }
        });
        updateHeight();
    },
};

export default ko.components.register('resource-table', {
    viewModel: function() {
        const self = this;
        self.models = ko.observableArray([]);
        self.selectedModelId = ko.observable('');
        self.availableColumns = ko.observableArray([]);
        self.selectedColumnIds = ko.observableArray([]);
        self.rows = ko.observableArray([]);
        self.tableColumns = ko.observableArray([]);
        self.columnWidths = ko.observable({});
        self.tableBuilt = ko.observable(false);
        self.collapsedNodeIds = ko.observableArray([]);
        self.loading = ko.observable(false);
        self.pageLoading = ko.observable(false);
        self.exporting = ko.observable(false);
        self.error = ko.observable('');
        self.nextCursor = ko.observable(null);
        self.hasMore = ko.observable(false);
        self.appliedFilters = {};
        self.queryVersion = 0;
        self.pageController = null;
        self.columnFilters = {};
        self.columnFilterModes = {};
        self.sortBy = ko.observable('');
        self.sortDirection = ko.observable('asc');
        self.selectedColumns = ko.pureComputed(() => {
            if (self.tableBuilt()) return self.tableColumns();
            const selected = new Set(self.selectedColumnIds());
            return self.availableColumns().filter((column) => selected.has(column.node_id));
        });
        self.columnTree = ko.pureComputed(() => self.availableColumns().map((column) => ({
            ...column,
        })));
        self.columnWidthValue = function(nodeId) {
            return self.columnWidths()[nodeId] || 220;
        };
        self.columnWidth = function(nodeId) {
            return `${self.columnWidthValue(nodeId)}px`;
        };
        self.tableWidth = ko.pureComputed(() => self.selectedColumns()
            .reduce((width, column) => width + self.columnWidthValue(column.node_id), 0));
        self.setColumnWidth = function(nodeId, width) {
            self.columnWidths({
                ...self.columnWidths(),
                [nodeId]: Math.max(100, Math.min(800, Math.round(width))),
            });
        };
        self.startColumnResize = function(column, event) {
            event.preventDefault();
            event.stopPropagation();
            const startX = event.clientX;
            const startWidth = self.columnWidthValue(column.node_id);
            const onMove = (moveEvent) => {
                self.setColumnWidth(column.node_id, startWidth + moveEvent.clientX - startX);
            };
            const onEnd = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onEnd);
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
        };
        self.resizeColumnWithKeyboard = function(column, event) {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return true;
            event.preventDefault();
            event.stopPropagation();
            const change = event.key === 'ArrowLeft' ? -20 : 20;
            self.setColumnWidth(column.node_id, self.columnWidthValue(column.node_id) + change);
            return false;
        };
        self.syncTopScroll = function(data, event) {
            const grid = event.currentTarget.nextElementSibling;
            if (grid && grid.scrollLeft !== event.currentTarget.scrollLeft) {
                grid.scrollLeft = event.currentTarget.scrollLeft;
            }
        };
        self.syncGridScroll = function(data, event) {
            const topScroll = event.currentTarget.previousElementSibling;
            if (topScroll && topScroll.scrollLeft !== event.currentTarget.scrollLeft) {
                topScroll.scrollLeft = event.currentTarget.scrollLeft;
            }
            self.loadNextPage(event.currentTarget);
        };
        self.isColumnSelected = function(nodeId) {
            return self.selectedColumnIds().includes(nodeId);
        };
        self.isSortActive = function(nodeId) {
            return self.sortBy() === nodeId;
        };
        self.sortIndicator = function(nodeId) {
            if (!self.isSortActive(nodeId)) return '↕';
            return self.sortDirection() === 'asc' ? '↑' : '↓';
        };
        self.sortAriaLabel = function(column) {
            const direction = self.isSortActive(column.node_id) && self.sortDirection() === 'asc'
                ? 'descending'
                : 'ascending';
            return `Sort ${column.label} ${direction}`;
        };
        self.columnFilter = function(nodeId) {
            if (!self.columnFilters[nodeId]) self.columnFilters[nodeId] = ko.observable('');
            return self.columnFilters[nodeId];
        };
        self.columnFilterMode = function(nodeId) {
            if (!self.columnFilterModes[nodeId]) self.columnFilterModes[nodeId] = ko.observable('contains');
            return self.columnFilterModes[nodeId];
        };
        self.activeFilters = function() {
            const filters = {};
            const nodeIds = new Set([
                ...Object.keys(self.columnFilters),
                ...Object.keys(self.columnFilterModes),
            ]);
            nodeIds.forEach((nodeId) => {
                const mode = self.columnFilterMode(nodeId)();
                const value = String(self.columnFilter(nodeId)() || '').trim();
                if (value || mode === 'empty' || mode === 'not-empty') {
                    filters[nodeId] = { mode, value };
                }
            });
            return filters;
        };
        self.isNodeCollapsed = function(nodeId) {
            return self.collapsedNodeIds().includes(nodeId);
        };
        self.isColumnRequired = function(column) {
            if (!column || !column.selectable || !self.isColumnSelected(column.node_id)) return false;

            const selectedIds = new Set(self.selectedColumnIds());
            const byId = new Map(self.availableColumns().map((item) => [item.node_id, item]));
            return self.availableColumns().some((candidate) => {
                if (!candidate.selectable || !selectedIds.has(candidate.node_id)) return false;
                let parent = byId.get(candidate.parent_node_id);
                while (parent) {
                    if (parent.node_id === column.node_id) return true;
                    parent = byId.get(parent.parent_node_id);
                }
                return false;
            });
        };
        self.groupSelectableDescendantIds = function(group) {
            if (!group || group.selectable) return [];

            const byId = new Map(self.availableColumns().map((item) => [item.node_id, item]));
            return self.availableColumns()
                .filter((candidate) => {
                    if (!candidate.selectable) return false;
                    let parent = byId.get(candidate.parent_node_id);
                    while (parent) {
                        if (parent.node_id === group.node_id) return true;
                        parent = byId.get(parent.parent_node_id);
                    }
                    return false;
                })
                .map((candidate) => candidate.node_id);
        };
        self.groupSelectionState = function(group) {
            const descendantIds = self.groupSelectableDescendantIds(group);
            if (!descendantIds.length) return 'none';

            const selectedIds = new Set(self.selectedColumnIds());
            const selectedCount = descendantIds.filter((nodeId) => selectedIds.has(nodeId)).length;
            if (selectedCount === descendantIds.length) return 'all';
            return selectedCount ? 'partial' : 'none';
        };
        self.toggleGroupSelection = function(group) {
            const descendantIds = self.groupSelectableDescendantIds(group);
            if (!descendantIds.length) return;

            const byId = new Map(self.availableColumns().map((item) => [item.node_id, item]));
            const nextIds = new Set(self.selectedColumnIds());
            if (self.groupSelectionState(group) === 'all') {
                descendantIds.forEach((nodeId) => nextIds.delete(nodeId));
            } else {
                descendantIds.forEach((nodeId) => {
                    let current = byId.get(nodeId);
                    while (current) {
                        if (current.selectable) nextIds.add(current.node_id);
                        current = byId.get(current.parent_node_id);
                    }
                });
            }
            self.selectedColumnIds(self.availableColumns()
                .filter((item) => item.selectable && nextIds.has(item.node_id))
                .map((item) => item.node_id));
        };
        self.groupSelectionLabel = function(group) {
            const state = self.groupSelectionState(group);
            return state === 'all' ? 'Deselect all fields in group' : 'Select all fields in group';
        };
        self.visibleColumnTree = ko.pureComputed(() => {
            const columns = self.columnTree();
            const byId = new Map(columns.map((column) => [column.node_id, column]));
            const collapsed = new Set(self.collapsedNodeIds());
            return columns.filter((column) => {
                let parent = byId.get(column.parent_node_id);
                while (parent) {
                    if (collapsed.has(parent.node_id)) return false;
                    parent = byId.get(parent.parent_node_id);
                }
                return true;
            });
        });

        self.loadModels = function() {
            self.loading(true);
            self.error('');
            getModels()
                .then((data) => self.models(data.models || []))
                .catch((error) => self.error(`Could not load resource models: ${error.message}`))
                .finally(() => self.loading(false));
        };

        self.selectedModelId.subscribe((graphId) => {
            self.queryVersion += 1;
            if (self.pageController) self.pageController.abort();
            self.pageController = null;
            self.pageLoading(false);
            self.loading(false);
            self.availableColumns([]);
            self.selectedColumnIds([]);
            self.rows([]);
            self.nextCursor(null);
            self.hasMore(false);
            self.tableColumns([]);
            self.columnWidths({});
            self.columnFilters = {};
            self.columnFilterModes = {};
            self.tableBuilt(false);
            self.collapsedNodeIds([]);
            self.sortBy('');
            if (!graphId) return;
            self.loading(true);
            getColumns(graphId)
                .then((data) => self.availableColumns(data.columns || []))
                .catch((error) => self.error(`Could not load model columns: ${error.message}`))
                .finally(() => self.loading(false));
        });

        self.toggleColumn = function(column) {
            if (!column.selectable) return;
            const ids = self.selectedColumnIds();
            if (ids.includes(column.node_id)) {
                if (self.isColumnRequired(column)) return;
                self.selectedColumnIds(ids.filter((id) => id !== column.node_id));
                return;
            }

            const byId = new Map(self.availableColumns().map((item) => [item.node_id, item]));
            const nextIds = new Set(ids);
            let current = column;
            while (current) {
                if (current.selectable) nextIds.add(current.node_id);
                current = byId.get(current.parent_node_id);
            }
            self.selectedColumnIds(self.availableColumns()
                .filter((item) => nextIds.has(item.node_id) && item.selectable)
                .map((item) => item.node_id));
        };

        self.toggleGroup = function(column, event) {
            if (!column || column.selectable) return;
            const scrollContainer = event && event.currentTarget
                ? event.currentTarget.closest('.resource-table-plugin__columns')
                : null;
            const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
            const ids = self.collapsedNodeIds();
            self.collapsedNodeIds(ids.includes(column.node_id)
                ? ids.filter((id) => id !== column.node_id)
                : ids.concat(column.node_id));

            if (scrollContainer) {
                requestAnimationFrame(() => {
                    scrollContainer.scrollTop = scrollTop;
                });
            }
        };

        self.queryState = function(cursor = null) {
            return {
                graphId: self.selectedModelId(),
                columns: self.selectedColumnIds(),
                filters: self.appliedFilters,
                sortBy: self.sortBy(),
                sortDirection: self.sortDirection(),
                cursor,
                pageSize: 200,
            };
        };

        self.loadNextPage = function(grid) {
            if (!grid || !self.tableBuilt() || !self.hasMore() || self.pageLoading()) return;
            if (grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 300) {
                self.loadPage();
            }
        };

        self.loadPage = function() {
            if (self.pageLoading()) return;
            const version = self.queryVersion;
            const firstPage = !self.rows().length && !self.nextCursor();
            const controller = new AbortController();
            self.pageController = controller;
            self.pageLoading(true);
            if (firstPage) self.loading(true);
            getTable({ ...self.queryState(self.nextCursor()), signal: controller.signal })
                .then((data) => {
                    if (version !== self.queryVersion) return;
                    if (firstPage) {
                        self.tableColumns(data.columns || []);
                        self.rows(data.rows || []);
                    } else {
                        self.rows.push(...(data.rows || []));
                    }
                    self.nextCursor(data.next_cursor || null);
                    self.hasMore(Boolean(data.next_cursor));
                    self.tableBuilt(true);
                })
                .catch((error) => {
                    if (version === self.queryVersion && error.name !== 'AbortError') {
                        self.error(`Could not load table: ${error.message}`);
                        self.hasMore(false);
                    }
                })
                .finally(() => {
                    if (version !== self.queryVersion) return;
                    self.pageController = null;
                    self.pageLoading(false);
                    self.loading(false);
                    requestAnimationFrame(() => {
                        self.loadNextPage(document.querySelector('.resource-table-plugin__grid'));
                    });
                });
        };

        self.startQuery = function() {
            self.queryVersion += 1;
            if (self.pageController) self.pageController.abort();
            self.pageController = null;
            self.pageLoading(false);
            self.rows([]);
            self.nextCursor(null);
            self.hasMore(false);
            self.error('');
            const grid = document.querySelector('.resource-table-plugin__grid');
            if (grid) grid.scrollTop = 0;
            self.loadPage();
        };

        self.buildTable = function() {
            if (!self.selectedModelId() || !self.selectedColumnIds().length) return;
            self.appliedFilters = self.activeFilters();
            self.startQuery();
        };

        self.loadTable = function() {
            self.appliedFilters = self.activeFilters();
            self.startQuery();
        };

        self.editColumns = function() {
            self.columnFilters = {};
            self.columnFilterModes = {};
            self.tableBuilt(false);
        };

        self.toggleSort = function(column) {
            if (self.sortBy() !== column.node_id) {
                self.sortBy(column.node_id);
                self.sortDirection('asc');
            } else if (self.sortDirection() === 'asc') {
                self.sortDirection('desc');
            } else {
                self.sortBy('');
                self.sortDirection('asc');
            }
            self.loadTable();
        };

        self.exportCsv = async function() {
            if (self.exporting()) return;
            self.exporting(true);
            self.error('');
            try {
                const blob = await requestCsv(self.queryState());
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'resource-table.csv';
                link.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } catch (error) {
                self.error(`Could not export CSV: ${error.message}`);
            } finally {
                self.exporting(false);
            }
        };

        self.exportPdf = async function() {
            if (self.exporting()) return;
            self.exporting(true);
            self.error('');
            const columns = self.selectedColumns();
            const query = self.queryState();
            const rows = [];
            try {
                let cursor = null;
                do {
                    const page = await getTable({ ...query, cursor });
                    rows.push(...(page.rows || []));
                    cursor = page.next_cursor;
                } while (cursor);
                if (!columns.length || !rows.length) return;

                const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
                const margin = 28;
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const columnWidth = (pageWidth - (margin * 2)) / columns.length;
                let y = margin;

                pdf.setFontSize(14);
                pdf.text('Resource table', margin, y);
                y += 22;
                pdf.setFontSize(8);

                const drawRow = function(values, bold) {
                    const lineHeight = 11;
                    const lines = values.map((value) => pdf.splitTextToSize(String(value || ''), columnWidth - 8));
                    const height = Math.max(...lines.map((value) => value.length), 1) * lineHeight + 8;
                    if (y + height > pageHeight - margin) {
                        pdf.addPage();
                        y = margin;
                    }
                    if (bold) pdf.setFont(undefined, 'bold');
                    values.forEach((_, index) => {
                        lines[index].forEach((line, lineIndex) => {
                            pdf.text(line, margin + index * columnWidth + 4, y + 14 + lineIndex * lineHeight);
                        });
                    });
                    if (bold) pdf.setFont(undefined, 'normal');
                    pdf.line(margin, y + height, pageWidth - margin, y + height);
                    y += height;
                };

                drawRow(columns.map((column) => column.label), true);
                rows.forEach((row) => drawRow(columns.map((column) => row[column.node_id]), false));
                pdf.save('resource-table.pdf');
            } catch (error) {
                self.error(`Could not export PDF: ${error.message}`);
            } finally {
                self.exporting(false);
            }
        };

        self.loadModels();
    },
    template,
});
