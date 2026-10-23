import { createVueApplication } from '@/arches_vue_components/application';
import AdvancedSearch from '@/arches_for_excavation/search_overrides/AdvancedSearch.vue';
import searchTheme from '@/arches_search/default_theme.ts';

const root = document.getElementById('verify-search-root');
const graphId = root.dataset.graphId;
const applyButton = document.getElementById('verify-search-apply');
const status = document.getElementById('verify-search-status');
let pendingQuery = null;
let pendingTotal = 0;

function csrfToken() {
    return document.cookie.split('; ').find((part) => part.startsWith('csrftoken='))?.slice(10) || '';
}

function showError(error) {
    status.textContent = error.message || String(error);
    status.style.color = '#ad3b30';
}

applyButton.addEventListener('click', async () => {
    if (!pendingQuery) return;
    const submittedQuery = pendingQuery;
    applyButton.disabled = true;
    status.style.color = '';
    status.textContent = 'Pobieranie wszystkich wyników…';
    try {
        const response = await fetch('/api/verify/search-ids', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken(),
            },
            body: JSON.stringify({ graph_id: graphId, search_query: submittedQuery }),
        });
        const result = await response.json();
        if (pendingQuery !== submittedQuery) return;
        if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
        if (!Array.isArray(result.resource_ids) || result.total !== result.resource_ids.length) {
            throw new Error('Niepełna odpowiedź wyszukiwania.');
        }
        window.parent.postMessage({
            type: 'verify-search:applied',
            graphId,
            resourceIds: result.resource_ids,
            total: result.total,
        }, window.location.origin);
    } catch (error) {
        showError(error);
        applyButton.disabled = false;
    }
});

createVueApplication({
    component: AdvancedSearch,
    themeConfiguration: {
        ...searchTheme,
        zIndex: { modal: 22000, overlay: 21000, menu: 21000, tooltip: 22000 },
    },
    initialProps: {
        allowedRootGraphIds: [graphId],
        preferredGraphId: graphId,
        onSearchApplied: (query, total) => {
            pendingQuery = query;
            pendingTotal = total;
            status.style.color = '';
            status.textContent = `${pendingTotal} pasujących rekordów`;
            applyButton.disabled = false;
        },
        onQueryChanged: () => {
            pendingQuery = null;
            pendingTotal = 0;
            status.textContent = 'Uruchom wyszukiwanie, aby zastosować zapytanie.';
            applyButton.disabled = true;
        },
    },
}).then((app) => app.mount('#verify-search-app')).catch(showError);
