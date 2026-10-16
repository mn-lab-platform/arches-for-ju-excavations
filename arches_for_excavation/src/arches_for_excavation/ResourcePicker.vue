<script setup lang="ts">
import { ref, watch } from "vue";
import arches from "arches";

import AdvancedSearch from "./search_overrides/AdvancedSearch.vue";

import type { ResourceData } from "@/arches_search/AdvancedSearch/types.ts";

const props = withDefaults(defineProps<{
    modelValue?: string[];
    allowedGraphIds?: string[];
    preferredGraphId?: string | null;
    multiple?: boolean;
    mode?: "select" | "browse";
    onSelectionChange?: (ids: string[], resource: ResourceData, name: string) => void;
}>(), {
    modelValue: () => [],
    multiple: false,
    mode: "select",
});

const emit = defineEmits<{
    (event: "update:modelValue", ids: string[]): void;
    (event: "select-resource", resource: ResourceData): void;
}>();

const selectedIds = ref<string[]>([...props.modelValue]);

watch(() => props.modelValue, (ids) => {
    selectedIds.value = [...(ids ?? [])];
});

function selectResource(resource: ResourceData, name: string, graphId: string) {
    if (props.allowedGraphIds && !props.allowedGraphIds.includes(graphId)) return;

    const id = resource.resourceinstanceid;
    const alreadySelected = selectedIds.value.includes(id);
    const nextIds = alreadySelected
        ? selectedIds.value.filter((selectedId) => selectedId !== id)
        : props.multiple ? [...selectedIds.value, id] : [id];

    selectedIds.value = nextIds;
    emit("update:modelValue", nextIds);
    emit("select-resource", resource);
    props.onSelectionChange?.(nextIds, resource, name);
}
</script>

<template>
    <div class="resource-picker">
        <AdvancedSearch
            :allowed-root-graph-ids="allowedGraphIds"
            :preferred-graph-id="preferredGraphId"
        >
            <template
                v-if="mode === 'select'"
                #result-action="{ resource, descriptorData, graphId }"
            >
                <button
                    type="button"
                    class="resource-picker-action"
                    :aria-pressed="selectedIds.includes(resource.resourceinstanceid)"
                    :disabled="allowedGraphIds && !allowedGraphIds.includes(graphId)"
                    @click="selectResource(
                        resource,
                        descriptorData?.descriptors?.[arches.activeLanguage]?.name ?? resource.resourceinstanceid,
                        graphId,
                    )"
                >
                    {{ selectedIds.includes(resource.resourceinstanceid) ? 'Remove' : 'Select' }}
                </button>
            </template>
        </AdvancedSearch>
    </div>
</template>

<style scoped>
.resource-picker {
    width: 100%;
    height: var(--resource-picker-height, 42rem);
    min-height: var(--resource-picker-min-height, 28rem);
    overflow: hidden;
    border: 1px solid var(--p-content-border-color, #ddd);
}

.resource-picker-action {
    border: 1px solid var(--p-primary-color, #37a6a0);
    border-radius: 0.4rem;
    padding: 0.6rem 1rem;
    color: var(--p-primary-color, #257c78);
    background: var(--p-content-background, #fff);
    cursor: pointer;
}

.resource-picker-action[aria-pressed="true"] {
    color: var(--p-primary-contrast-color, #fff);
    background: var(--p-primary-color, #37a6a0);
}
</style>
