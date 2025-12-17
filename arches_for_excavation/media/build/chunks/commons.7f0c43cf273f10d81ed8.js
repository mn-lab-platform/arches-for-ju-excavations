"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[99148],{

/***/ 99148:
/*!*******************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/create-vue-application.js + 2 modules ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ createVueApplication)
});

// EXTERNAL MODULE: ./node_modules/primevue/config/index.mjs + 2 modules
var config = __webpack_require__(82516);
// EXTERNAL MODULE: ./node_modules/primevue/animateonscroll/index.mjs + 1 modules
var animateonscroll = __webpack_require__(55423);
// EXTERNAL MODULE: ./node_modules/primevue/confirmationservice/index.mjs + 2 modules
var confirmationservice = __webpack_require__(52330);
// EXTERNAL MODULE: ./node_modules/primevue/dialogservice/index.mjs + 2 modules
var dialogservice = __webpack_require__(12065);
// EXTERNAL MODULE: ./node_modules/primevue/focustrap/index.mjs + 1 modules
var focustrap = __webpack_require__(4499);
// EXTERNAL MODULE: ./node_modules/primevue/styleclass/index.mjs + 1 modules
var styleclass = __webpack_require__(2501);
// EXTERNAL MODULE: ./node_modules/primevue/toastservice/index.mjs + 2 modules
var toastservice = __webpack_require__(978);
// EXTERNAL MODULE: ./node_modules/primevue/tooltip/index.mjs + 3 modules
var tooltip = __webpack_require__(54587);
// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 4 modules
var vue_runtime_esm_bundler = __webpack_require__(45031);
// EXTERNAL MODULE: ./node_modules/vue3-gettext/dist/index.mjs
var dist = __webpack_require__(21302);
// EXTERNAL MODULE: ./node_modules/@primeuix/themes/index.mjs
var themes = __webpack_require__(6030);
// EXTERNAL MODULE: ./node_modules/@primeuix/themes/aura/index.mjs + 89 modules
var aura = __webpack_require__(10255);
;// ../../opt/venv/lib/python3.13/site-packages/arches/app/src/arches/themes/default.ts


const archesColors = Object.freeze({
    blue: "#579ddb",
    green: "#3acaa1",
    red: "#f75d3f",
});
const ArchesPreset = (0,themes.definePreset)(aura["default"], {
    primitive: {
        arches: {
            ...archesColors,
            legacy: {
                sidebar: "#2d3c4b",
            },
        },
        blue: (0,themes.palette)(archesColors.blue),
        green: (0,themes.palette)(archesColors.green),
        red: (0,themes.palette)(archesColors.red),
    },
    semantic: {
        // PrimeVue token override
        primary: (0,themes.palette)(archesColors.blue),
        // PrimeVue token override
        navigation: {
            list: {
                padding: "0",
            },
            item: {
                padding: "1rem",
            },
            // custom tokens
            header: {
                color: "{arches.legacy.sidebar}",
            },
        },
    },
    components: {
        splitter: {
            handle: {
                background: "{surface.500}",
            },
        },
    },
});
const DEFAULT_THEME = {
    theme: {
        preset: ArchesPreset,
        options: {
            prefix: "p",
            darkModeSelector: ".arches-dark",
            cssLayer: false,
        },
    },
};

;// ../../opt/venv/lib/python3.13/site-packages/arches/app/src/arches/utils/generate-arches-url.ts
function generateArchesURL(urlName, urlParameters = {}, languageCode) {
    // @ts-expect-error ARCHES_URLS is defined globally
    const routes = {
    "_comment": "This file is auto-generated. Do not edit manually.",
    "add_resource": [
        {
            "url": "/add-resource/{graphid}",
            "params": [
                "graphid"
            ]
        }
    ],
    "admin": [
        {
            "url": "/admin/auth/group/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/auth/user/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/mapsource/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/geocoder/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/mapmarker/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/ddatatype/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/widget/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/userprofile/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/graphmodel/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/resourceinstancelifecycle/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/resourceinstancelifecyclestate/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/searchcomponent/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/iiifmanifest/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/groupmapsettings/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/language/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/nodegroup/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/spatialview/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/userpreference/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/plugin/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/maplayer/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/models/etlmodule/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/oauth2_provider/application/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/oauth2_provider/accesstoken/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/oauth2_provider/grant/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/oauth2_provider/idtoken/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/oauth2_provider/refreshtoken/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/django_celery_results/taskresult/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/django_celery_results/groupresult/{object_id}/",
            "params": [
                "object_id"
            ]
        },
        {
            "url": "/admin/{url}",
            "params": [
                "url"
            ]
        }
    ],
    "admin:app_list": [
        {
            "url": "/admin/{app_label}/",
            "params": [
                "app_label"
            ]
        }
    ],
    "admin:auth_group_add": [
        {
            "url": "/admin/auth/group/add/",
            "params": []
        }
    ],
    "admin:auth_group_change": [
        {
            "url": "/admin/auth/group/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:auth_group_changelist": [
        {
            "url": "/admin/auth/group",
            "params": []
        }
    ],
    "admin:auth_group_delete": [
        {
            "url": "/admin/auth/group/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:auth_group_history": [
        {
            "url": "/admin/auth/group/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:auth_user_add": [
        {
            "url": "/admin/auth/user/add/",
            "params": []
        }
    ],
    "admin:auth_user_change": [
        {
            "url": "/admin/auth/user/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:auth_user_changelist": [
        {
            "url": "/admin/auth/user",
            "params": []
        }
    ],
    "admin:auth_user_delete": [
        {
            "url": "/admin/auth/user/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:auth_user_history": [
        {
            "url": "/admin/auth/user/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:auth_user_password_change": [
        {
            "url": "/admin/auth/user/{id}/password/",
            "params": [
                "id"
            ]
        }
    ],
    "admin:autocomplete": [
        {
            "url": "/admin/autocomplete/",
            "params": []
        }
    ],
    "admin:django_celery_results_groupresult_add": [
        {
            "url": "/admin/django_celery_results/groupresult/add/",
            "params": []
        }
    ],
    "admin:django_celery_results_groupresult_change": [
        {
            "url": "/admin/django_celery_results/groupresult/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:django_celery_results_groupresult_changelist": [
        {
            "url": "/admin/django_celery_results/groupresult",
            "params": []
        }
    ],
    "admin:django_celery_results_groupresult_delete": [
        {
            "url": "/admin/django_celery_results/groupresult/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:django_celery_results_groupresult_history": [
        {
            "url": "/admin/django_celery_results/groupresult/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:django_celery_results_taskresult_add": [
        {
            "url": "/admin/django_celery_results/taskresult/add/",
            "params": []
        }
    ],
    "admin:django_celery_results_taskresult_change": [
        {
            "url": "/admin/django_celery_results/taskresult/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:django_celery_results_taskresult_changelist": [
        {
            "url": "/admin/django_celery_results/taskresult",
            "params": []
        }
    ],
    "admin:django_celery_results_taskresult_delete": [
        {
            "url": "/admin/django_celery_results/taskresult/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:django_celery_results_taskresult_history": [
        {
            "url": "/admin/django_celery_results/taskresult/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:index": [
        {
            "url": "/admin",
            "params": []
        }
    ],
    "admin:jsi18n": [
        {
            "url": "/admin/jsi18n/",
            "params": []
        }
    ],
    "admin:login": [
        {
            "url": "/admin/login/",
            "params": []
        }
    ],
    "admin:logout": [
        {
            "url": "/admin/logout/",
            "params": []
        }
    ],
    "admin:models_ddatatype_add": [
        {
            "url": "/admin/models/ddatatype/add/",
            "params": []
        }
    ],
    "admin:models_ddatatype_change": [
        {
            "url": "/admin/models/ddatatype/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_ddatatype_changelist": [
        {
            "url": "/admin/models/ddatatype",
            "params": []
        }
    ],
    "admin:models_ddatatype_delete": [
        {
            "url": "/admin/models/ddatatype/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_ddatatype_history": [
        {
            "url": "/admin/models/ddatatype/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_etlmodule_add": [
        {
            "url": "/admin/models/etlmodule/add/",
            "params": []
        }
    ],
    "admin:models_etlmodule_change": [
        {
            "url": "/admin/models/etlmodule/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_etlmodule_changelist": [
        {
            "url": "/admin/models/etlmodule",
            "params": []
        }
    ],
    "admin:models_etlmodule_delete": [
        {
            "url": "/admin/models/etlmodule/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_etlmodule_history": [
        {
            "url": "/admin/models/etlmodule/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_etlmodule_permissions": [
        {
            "url": "/admin/models/etlmodule/{object_pk}/permissions/",
            "params": [
                "object_pk"
            ]
        }
    ],
    "admin:models_etlmodule_permissions_manage_group": [
        {
            "url": "/admin/models/etlmodule/{object_pk}/permissions/group-manage/{group_id}/",
            "params": [
                "object_pk",
                "group_id"
            ]
        }
    ],
    "admin:models_etlmodule_permissions_manage_user": [
        {
            "url": "/admin/models/etlmodule/{object_pk}/permissions/user-manage/{user_id}/",
            "params": [
                "object_pk",
                "user_id"
            ]
        }
    ],
    "admin:models_geocoder_add": [
        {
            "url": "/admin/models/geocoder/add/",
            "params": []
        }
    ],
    "admin:models_geocoder_change": [
        {
            "url": "/admin/models/geocoder/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_geocoder_changelist": [
        {
            "url": "/admin/models/geocoder",
            "params": []
        }
    ],
    "admin:models_geocoder_delete": [
        {
            "url": "/admin/models/geocoder/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_geocoder_history": [
        {
            "url": "/admin/models/geocoder/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_graphmodel_add": [
        {
            "url": "/admin/models/graphmodel/add/",
            "params": []
        }
    ],
    "admin:models_graphmodel_change": [
        {
            "url": "/admin/models/graphmodel/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_graphmodel_changelist": [
        {
            "url": "/admin/models/graphmodel",
            "params": []
        }
    ],
    "admin:models_graphmodel_delete": [
        {
            "url": "/admin/models/graphmodel/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_graphmodel_history": [
        {
            "url": "/admin/models/graphmodel/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_groupmapsettings_add": [
        {
            "url": "/admin/models/groupmapsettings/add/",
            "params": []
        }
    ],
    "admin:models_groupmapsettings_change": [
        {
            "url": "/admin/models/groupmapsettings/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_groupmapsettings_changelist": [
        {
            "url": "/admin/models/groupmapsettings",
            "params": []
        }
    ],
    "admin:models_groupmapsettings_delete": [
        {
            "url": "/admin/models/groupmapsettings/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_groupmapsettings_history": [
        {
            "url": "/admin/models/groupmapsettings/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_iiifmanifest_add": [
        {
            "url": "/admin/models/iiifmanifest/add/",
            "params": []
        }
    ],
    "admin:models_iiifmanifest_change": [
        {
            "url": "/admin/models/iiifmanifest/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_iiifmanifest_changelist": [
        {
            "url": "/admin/models/iiifmanifest",
            "params": []
        }
    ],
    "admin:models_iiifmanifest_delete": [
        {
            "url": "/admin/models/iiifmanifest/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_iiifmanifest_history": [
        {
            "url": "/admin/models/iiifmanifest/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_language_add": [
        {
            "url": "/admin/models/language/add/",
            "params": []
        }
    ],
    "admin:models_language_change": [
        {
            "url": "/admin/models/language/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_language_changelist": [
        {
            "url": "/admin/models/language",
            "params": []
        }
    ],
    "admin:models_language_delete": [
        {
            "url": "/admin/models/language/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_language_history": [
        {
            "url": "/admin/models/language/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_maplayer_add": [
        {
            "url": "/admin/models/maplayer/add/",
            "params": []
        }
    ],
    "admin:models_maplayer_change": [
        {
            "url": "/admin/models/maplayer/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_maplayer_changelist": [
        {
            "url": "/admin/models/maplayer",
            "params": []
        }
    ],
    "admin:models_maplayer_delete": [
        {
            "url": "/admin/models/maplayer/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_maplayer_history": [
        {
            "url": "/admin/models/maplayer/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_maplayer_permissions": [
        {
            "url": "/admin/models/maplayer/{object_pk}/permissions/",
            "params": [
                "object_pk"
            ]
        }
    ],
    "admin:models_maplayer_permissions_manage_group": [
        {
            "url": "/admin/models/maplayer/{object_pk}/permissions/group-manage/{group_id}/",
            "params": [
                "object_pk",
                "group_id"
            ]
        }
    ],
    "admin:models_maplayer_permissions_manage_user": [
        {
            "url": "/admin/models/maplayer/{object_pk}/permissions/user-manage/{user_id}/",
            "params": [
                "object_pk",
                "user_id"
            ]
        }
    ],
    "admin:models_mapmarker_add": [
        {
            "url": "/admin/models/mapmarker/add/",
            "params": []
        }
    ],
    "admin:models_mapmarker_change": [
        {
            "url": "/admin/models/mapmarker/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_mapmarker_changelist": [
        {
            "url": "/admin/models/mapmarker",
            "params": []
        }
    ],
    "admin:models_mapmarker_delete": [
        {
            "url": "/admin/models/mapmarker/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_mapmarker_history": [
        {
            "url": "/admin/models/mapmarker/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_mapsource_add": [
        {
            "url": "/admin/models/mapsource/add/",
            "params": []
        }
    ],
    "admin:models_mapsource_change": [
        {
            "url": "/admin/models/mapsource/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_mapsource_changelist": [
        {
            "url": "/admin/models/mapsource",
            "params": []
        }
    ],
    "admin:models_mapsource_delete": [
        {
            "url": "/admin/models/mapsource/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_mapsource_history": [
        {
            "url": "/admin/models/mapsource/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_nodegroup_add": [
        {
            "url": "/admin/models/nodegroup/add/",
            "params": []
        }
    ],
    "admin:models_nodegroup_change": [
        {
            "url": "/admin/models/nodegroup/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_nodegroup_changelist": [
        {
            "url": "/admin/models/nodegroup",
            "params": []
        }
    ],
    "admin:models_nodegroup_delete": [
        {
            "url": "/admin/models/nodegroup/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_nodegroup_history": [
        {
            "url": "/admin/models/nodegroup/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_plugin_add": [
        {
            "url": "/admin/models/plugin/add/",
            "params": []
        }
    ],
    "admin:models_plugin_change": [
        {
            "url": "/admin/models/plugin/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_plugin_changelist": [
        {
            "url": "/admin/models/plugin",
            "params": []
        }
    ],
    "admin:models_plugin_delete": [
        {
            "url": "/admin/models/plugin/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_plugin_history": [
        {
            "url": "/admin/models/plugin/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_plugin_permissions": [
        {
            "url": "/admin/models/plugin/{object_pk}/permissions/",
            "params": [
                "object_pk"
            ]
        }
    ],
    "admin:models_plugin_permissions_manage_group": [
        {
            "url": "/admin/models/plugin/{object_pk}/permissions/group-manage/{group_id}/",
            "params": [
                "object_pk",
                "group_id"
            ]
        }
    ],
    "admin:models_plugin_permissions_manage_user": [
        {
            "url": "/admin/models/plugin/{object_pk}/permissions/user-manage/{user_id}/",
            "params": [
                "object_pk",
                "user_id"
            ]
        }
    ],
    "admin:models_resourceinstancelifecycle_add": [
        {
            "url": "/admin/models/resourceinstancelifecycle/add/",
            "params": []
        }
    ],
    "admin:models_resourceinstancelifecycle_change": [
        {
            "url": "/admin/models/resourceinstancelifecycle/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_resourceinstancelifecycle_changelist": [
        {
            "url": "/admin/models/resourceinstancelifecycle",
            "params": []
        }
    ],
    "admin:models_resourceinstancelifecycle_delete": [
        {
            "url": "/admin/models/resourceinstancelifecycle/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_resourceinstancelifecycle_history": [
        {
            "url": "/admin/models/resourceinstancelifecycle/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_resourceinstancelifecyclestate_add": [
        {
            "url": "/admin/models/resourceinstancelifecyclestate/add/",
            "params": []
        }
    ],
    "admin:models_resourceinstancelifecyclestate_change": [
        {
            "url": "/admin/models/resourceinstancelifecyclestate/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_resourceinstancelifecyclestate_changelist": [
        {
            "url": "/admin/models/resourceinstancelifecyclestate",
            "params": []
        }
    ],
    "admin:models_resourceinstancelifecyclestate_delete": [
        {
            "url": "/admin/models/resourceinstancelifecyclestate/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_resourceinstancelifecyclestate_history": [
        {
            "url": "/admin/models/resourceinstancelifecyclestate/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_searchcomponent_add": [
        {
            "url": "/admin/models/searchcomponent/add/",
            "params": []
        }
    ],
    "admin:models_searchcomponent_change": [
        {
            "url": "/admin/models/searchcomponent/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_searchcomponent_changelist": [
        {
            "url": "/admin/models/searchcomponent",
            "params": []
        }
    ],
    "admin:models_searchcomponent_delete": [
        {
            "url": "/admin/models/searchcomponent/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_searchcomponent_history": [
        {
            "url": "/admin/models/searchcomponent/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_spatialview_add": [
        {
            "url": "/admin/models/spatialview/add/",
            "params": []
        }
    ],
    "admin:models_spatialview_change": [
        {
            "url": "/admin/models/spatialview/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_spatialview_changelist": [
        {
            "url": "/admin/models/spatialview",
            "params": []
        }
    ],
    "admin:models_spatialview_delete": [
        {
            "url": "/admin/models/spatialview/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_spatialview_history": [
        {
            "url": "/admin/models/spatialview/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_userpreference_add": [
        {
            "url": "/admin/models/userpreference/add/",
            "params": []
        }
    ],
    "admin:models_userpreference_change": [
        {
            "url": "/admin/models/userpreference/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_userpreference_changelist": [
        {
            "url": "/admin/models/userpreference",
            "params": []
        }
    ],
    "admin:models_userpreference_delete": [
        {
            "url": "/admin/models/userpreference/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_userpreference_history": [
        {
            "url": "/admin/models/userpreference/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_userprofile_add": [
        {
            "url": "/admin/models/userprofile/add/",
            "params": []
        }
    ],
    "admin:models_userprofile_change": [
        {
            "url": "/admin/models/userprofile/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_userprofile_changelist": [
        {
            "url": "/admin/models/userprofile",
            "params": []
        }
    ],
    "admin:models_userprofile_delete": [
        {
            "url": "/admin/models/userprofile/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_userprofile_history": [
        {
            "url": "/admin/models/userprofile/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_widget_add": [
        {
            "url": "/admin/models/widget/add/",
            "params": []
        }
    ],
    "admin:models_widget_change": [
        {
            "url": "/admin/models/widget/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_widget_changelist": [
        {
            "url": "/admin/models/widget",
            "params": []
        }
    ],
    "admin:models_widget_delete": [
        {
            "url": "/admin/models/widget/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:models_widget_history": [
        {
            "url": "/admin/models/widget/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_accesstoken_add": [
        {
            "url": "/admin/oauth2_provider/accesstoken/add/",
            "params": []
        }
    ],
    "admin:oauth2_provider_accesstoken_change": [
        {
            "url": "/admin/oauth2_provider/accesstoken/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_accesstoken_changelist": [
        {
            "url": "/admin/oauth2_provider/accesstoken",
            "params": []
        }
    ],
    "admin:oauth2_provider_accesstoken_delete": [
        {
            "url": "/admin/oauth2_provider/accesstoken/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_accesstoken_history": [
        {
            "url": "/admin/oauth2_provider/accesstoken/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_application_add": [
        {
            "url": "/admin/oauth2_provider/application/add/",
            "params": []
        }
    ],
    "admin:oauth2_provider_application_change": [
        {
            "url": "/admin/oauth2_provider/application/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_application_changelist": [
        {
            "url": "/admin/oauth2_provider/application",
            "params": []
        }
    ],
    "admin:oauth2_provider_application_delete": [
        {
            "url": "/admin/oauth2_provider/application/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_application_history": [
        {
            "url": "/admin/oauth2_provider/application/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_grant_add": [
        {
            "url": "/admin/oauth2_provider/grant/add/",
            "params": []
        }
    ],
    "admin:oauth2_provider_grant_change": [
        {
            "url": "/admin/oauth2_provider/grant/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_grant_changelist": [
        {
            "url": "/admin/oauth2_provider/grant",
            "params": []
        }
    ],
    "admin:oauth2_provider_grant_delete": [
        {
            "url": "/admin/oauth2_provider/grant/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_grant_history": [
        {
            "url": "/admin/oauth2_provider/grant/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_idtoken_add": [
        {
            "url": "/admin/oauth2_provider/idtoken/add/",
            "params": []
        }
    ],
    "admin:oauth2_provider_idtoken_change": [
        {
            "url": "/admin/oauth2_provider/idtoken/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_idtoken_changelist": [
        {
            "url": "/admin/oauth2_provider/idtoken",
            "params": []
        }
    ],
    "admin:oauth2_provider_idtoken_delete": [
        {
            "url": "/admin/oauth2_provider/idtoken/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_idtoken_history": [
        {
            "url": "/admin/oauth2_provider/idtoken/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_refreshtoken_add": [
        {
            "url": "/admin/oauth2_provider/refreshtoken/add/",
            "params": []
        }
    ],
    "admin:oauth2_provider_refreshtoken_change": [
        {
            "url": "/admin/oauth2_provider/refreshtoken/{object_id}/change/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_refreshtoken_changelist": [
        {
            "url": "/admin/oauth2_provider/refreshtoken",
            "params": []
        }
    ],
    "admin:oauth2_provider_refreshtoken_delete": [
        {
            "url": "/admin/oauth2_provider/refreshtoken/{object_id}/delete/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:oauth2_provider_refreshtoken_history": [
        {
            "url": "/admin/oauth2_provider/refreshtoken/{object_id}/history/",
            "params": [
                "object_id"
            ]
        }
    ],
    "admin:password_change": [
        {
            "url": "/admin/password_change/",
            "params": []
        }
    ],
    "admin:password_change_done": [
        {
            "url": "/admin/password_change/done/",
            "params": []
        }
    ],
    "admin:view_on_site": [
        {
            "url": "/admin/r/{content_type_id}/{object_id}/",
            "params": [
                "content_type_id",
                "object_id"
            ]
        }
    ],
    "api_bulk_disambiguated_resource_instance": [
        {
            "url": "/api/bulk_disambiguated_resource_instance",
            "params": []
        }
    ],
    "api_bulk_resource_report": [
        {
            "url": "/api/bulk_resource_report",
            "params": []
        }
    ],
    "api_card": [
        {
            "url": "/cards/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "api_export_results": [
        {
            "url": "/api/search/export_results",
            "params": []
        }
    ],
    "api_get_nodegroup_tree": [
        {
            "url": "/api/get_nodegroup_tree",
            "params": []
        }
    ],
    "api_instance_permissions": [
        {
            "url": "/api/instance_permissions/",
            "params": []
        }
    ],
    "api_login": [
        {
            "url": "/api/login",
            "params": []
        }
    ],
    "api_logout": [
        {
            "url": "/api/logout",
            "params": []
        }
    ],
    "api_node_value": [
        {
            "url": "/api/node_value/",
            "params": []
        }
    ],
    "api_nodegroup": [
        {
            "url": "/api/nodegroup/{nodegroupid}",
            "params": [
                "nodegroupid"
            ]
        }
    ],
    "api_nodes": [
        {
            "url": "/api/nodes/{nodeid}",
            "params": [
                "nodeid"
            ]
        }
    ],
    "api_plugins": [
        {
            "url": "/api/plugins/{pluginid}",
            "params": [
                "pluginid"
            ]
        }
    ],
    "api_resource_instance_lifecycle_state": [
        {
            "url": "/api/resource_instance_lifecycle_state/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "api_resource_instance_lifecycle_states": [
        {
            "url": "/api/resource_instance_lifecycle/",
            "params": []
        }
    ],
    "api_resource_report": [
        {
            "url": "/api/resource_report/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "api_search_component_data": [
        {
            "url": "/search_component_data/{componentname}",
            "params": [
                "componentname"
            ]
        }
    ],
    "api_tiles": [
        {
            "url": "/api/tiles/{tileid}",
            "params": [
                "tileid"
            ]
        }
    ],
    "api_user": [
        {
            "url": "/api/user",
            "params": []
        }
    ],
    "api_user_incomplete_workflows": [
        {
            "url": "/api/user_incomplete_workflows",
            "params": []
        }
    ],
    "api_user_preference_detail_view": [
        {
            "url": "/api/user_preference/{identifier}/",
            "params": [
                "identifier"
            ]
        }
    ],
    "api_user_preference_list_view": [
        {
            "url": "/api/user_preference/",
            "params": []
        }
    ],
    "append_branch": [
        {
            "url": "/graph/{graphid}/append_branch",
            "params": [
                "graphid"
            ]
        }
    ],
    "append_node": [
        {
            "url": "/graph/{graphid}/append_node",
            "params": [
                "graphid"
            ]
        }
    ],
    "apply_functions": [
        {
            "url": "/graph/{graphid}/apply_functions",
            "params": [
                "graphid"
            ]
        }
    ],
    "as_stream_collection": [
        {
            "url": "/history/",
            "params": []
        }
    ],
    "as_stream_page": [
        {
            "url": "/history/{page}",
            "params": [
                "page"
            ]
        }
    ],
    "auth": [
        {
            "url": "/auth/",
            "params": []
        }
    ],
    "buffer": [
        {
            "url": "/buffer/",
            "params": []
        }
    ],
    "card": [
        {
            "url": "/card/{cardid}",
            "params": [
                "cardid"
            ]
        }
    ],
    "change_password": [
        {
            "url": "/auth/password",
            "params": []
        }
    ],
    "clear_user_permission_cache": [
        {
            "url": "/clear-user-permission-cache",
            "params": []
        }
    ],
    "clone_graph": [
        {
            "url": "/graph/{graphid}/clone",
            "params": [
                "graphid"
            ]
        }
    ],
    "concept": [
        {
            "url": "/concepts/{conceptid}",
            "params": [
                "conceptid"
            ]
        }
    ],
    "concept_manage_parents": [
        {
            "url": "/concepts/{conceptid}/manage_parents/",
            "params": [
                "conceptid"
            ]
        }
    ],
    "concept_search": [
        {
            "url": "/concepts/search",
            "params": []
        }
    ],
    "concept_tree": [
        {
            "url": "/concepts/tree/{mode}",
            "params": [
                "mode"
            ]
        }
    ],
    "concept_value": [
        {
            "url": "/conceptvalue/",
            "params": []
        }
    ],
    "concepts": [
        {
            "url": "/rdm/concepts/{conceptid}",
            "params": [
                "conceptid"
            ]
        }
    ],
    "config": [
        {
            "url": "/settings/",
            "params": []
        }
    ],
    "confirm_delete": [
        {
            "url": "/concepts/{conceptid}/confirm_delete/",
            "params": [
                "conceptid"
            ]
        }
    ],
    "confirm_signup": [
        {
            "url": "/auth/confirm_signup",
            "params": []
        }
    ],
    "datatype_template": [
        {
            "url": "/components/datatypes/{template}",
            "params": [
                "template"
            ]
        }
    ],
    "delete_graph": [
        {
            "url": "/graph/{graphid}/delete",
            "params": [
                "graphid"
            ]
        }
    ],
    "delete_instances": [
        {
            "url": "/graph/{graphid}/delete_instances",
            "params": [
                "graphid"
            ]
        }
    ],
    "delete_node": [
        {
            "url": "/graph/{graphid}/delete_node",
            "params": [
                "graphid"
            ]
        }
    ],
    "delete_provisional_tile": [
        {
            "url": "/tiles/delete_provisional_tile",
            "params": []
        }
    ],
    "delete_published_graph": [
        {
            "url": "/graph/{graphid}/delete_published_graph",
            "params": [
                "graphid"
            ]
        }
    ],
    "dismiss_notifications": [
        {
            "url": "/notifications/dismiss",
            "params": []
        }
    ],
    "download_files": [
        {
            "url": "/tiles/download_files",
            "params": []
        }
    ],
    "draft_graph_api": [
        {
            "url": "/draft_graph/{graph_id}",
            "params": [
                "graph_id"
            ]
        }
    ],
    "dropdown": [
        {
            "url": "/concepts/dropdown",
            "params": []
        }
    ],
    "edit_history": [
        {
            "url": "/resource/history",
            "params": []
        }
    ],
    "etl_manager": [
        {
            "url": "/etl-manager",
            "params": []
        }
    ],
    "export_branch": [
        {
            "url": "/graph/{graphid}/export_branch",
            "params": [
                "graphid"
            ]
        }
    ],
    "export_concept": [
        {
            "url": "/concepts/export/{conceptid}",
            "params": [
                "conceptid"
            ]
        }
    ],
    "export_concept_collections": [
        {
            "url": "/concepts/export/collections",
            "params": []
        }
    ],
    "export_graph": [
        {
            "url": "/graph/{graphid}/export",
            "params": [
                "graphid"
            ]
        }
    ],
    "export_mapping_file": [
        {
            "url": "/graph/{graphid}/export_mapping_file",
            "params": [
                "graphid"
            ]
        }
    ],
    "export_results": [
        {
            "url": "/search/export_results",
            "params": []
        }
    ],
    "external_oauth_callback": [
        {
            "url": "/auth/eoauth_cb",
            "params": []
        }
    ],
    "external_oauth_start": [
        {
            "url": "/auth/eoauth_start",
            "params": []
        }
    ],
    "feature_popup_content": [
        {
            "url": "/feature_popup_content",
            "params": []
        }
    ],
    "file_access": [
        {
            "url": "/files/{fileid}",
            "params": [
                "fileid"
            ]
        }
    ],
    "files": [
        {
            "url": "/files/{path}",
            "params": [
                "path"
            ]
        }
    ],
    "from_sparql_endpoint": [
        {
            "url": "/concepts/{conceptid}/from_sparql_endpoint",
            "params": [
                "conceptid"
            ]
        }
    ],
    "function-templates": [
        {
            "url": "/function-templates/{template}",
            "params": [
                "template"
            ]
        }
    ],
    "function_manager": [
        {
            "url": "/graph/{graphid}/function_manager",
            "params": [
                "graphid"
            ]
        }
    ],
    "geojson": [
        {
            "url": "/geojson",
            "params": []
        }
    ],
    "get_client_id": [
        {
            "url": "/auth/get_client_id",
            "params": []
        }
    ],
    "get_concept_collections": [
        {
            "url": "/concepts/collections",
            "params": []
        }
    ],
    "get_dev_token": [
        {
            "url": "/auth/get_dev_token",
            "params": []
        }
    ],
    "get_domain_connections": [
        {
            "url": "/graph/{graphid}/get_domain_connections",
            "params": [
                "graphid"
            ]
        }
    ],
    "get_dsl": [
        {
            "url": "/search/get_dsl",
            "params": []
        }
    ],
    "get_export_file": [
        {
            "url": "/search/get_export_file",
            "params": []
        }
    ],
    "get_frontend_i18n_data": [
        {
            "url": "/api/get_frontend_i18n_data",
            "params": []
        }
    ],
    "get_graph_models_api": [
        {
            "url": "/graphs",
            "params": []
        }
    ],
    "get_notification_types": [
        {
            "url": "/notifications/get_types",
            "params": []
        }
    ],
    "get_notifications": [
        {
            "url": "/notifications",
            "params": []
        }
    ],
    "get_pref_label": [
        {
            "url": "/concepts/get_pref_label",
            "params": []
        }
    ],
    "get_related_nodes": [
        {
            "url": "/graph/{graphid}/get_related_nodes/{nodeid}",
            "params": [
                "graphid",
                "nodeid"
            ]
        }
    ],
    "get_user_names": [
        {
            "url": "/user/get_user_names",
            "params": []
        }
    ],
    "get_valid_domain_nodes": [
        {
            "url": "/graph/{graphid}/get_valid_domain_nodes/{nodeid}",
            "params": [
                "graphid",
                "nodeid"
            ]
        }
    ],
    "graph": [
        {
            "url": "/graph/{graphid}",
            "params": [
                "graphid"
            ]
        }
    ],
    "graph_designer": [
        {
            "url": "/graph_designer/{graphid}",
            "params": [
                "graphid"
            ]
        }
    ],
    "graph_is_active_api": [
        {
            "url": "/graph_is_active/{graph_id}",
            "params": [
                "graph_id"
            ]
        }
    ],
    "graph_nodes": [
        {
            "url": "/graph/{graphid}/nodes",
            "params": [
                "graphid"
            ]
        }
    ],
    "graph_settings": [
        {
            "url": "/graph_settings/{graphid}",
            "params": [
                "graphid"
            ]
        }
    ],
    "graphs_api": [
        {
            "url": "/graphs/{graph_id}",
            "params": [
                "graph_id"
            ]
        }
    ],
    "help_templates": [
        {
            "url": "/help-templates",
            "params": []
        }
    ],
    "home": [
        {
            "url": "/index.htm",
            "params": []
        }
    ],
    "icons": [
        {
            "url": "/icons",
            "params": []
        }
    ],
    "iiifannotationnodes": [
        {
            "url": "/iiifannotationnodes",
            "params": []
        }
    ],
    "iiifannotations": [
        {
            "url": "/iiifannotations",
            "params": []
        }
    ],
    "iiifmanifest": [
        {
            "url": "/iiifmanifest",
            "params": []
        }
    ],
    "iiifserver": [
        {
            "url": "/iiifserver/{path}",
            "params": [
                "path"
            ]
        }
    ],
    "images": [
        {
            "url": "/images",
            "params": []
        }
    ],
    "import_graph": [
        {
            "url": "/graph/import/",
            "params": []
        }
    ],
    "kibana": [
        {
            "url": "/kibana/{path}",
            "params": [
                "path"
            ]
        }
    ],
    "language": [
        {
            "url": "/language/",
            "params": []
        }
    ],
    "make_collection": [
        {
            "url": "/concepts/{conceptid}/make_collection/",
            "params": [
                "conceptid"
            ]
        }
    ],
    "manifest": [
        {
            "url": "/manifest/{id}",
            "params": [
                "id"
            ]
        }
    ],
    "manifest_manager": [
        {
            "url": "/image-service-manager",
            "params": []
        }
    ],
    "map_layer_manager": [
        {
            "url": "/map_layer_manager/",
            "params": []
        }
    ],
    "map_layer_update": [
        {
            "url": "/map_layer_manager/{maplayerid}",
            "params": [
                "maplayerid"
            ]
        }
    ],
    "media_url": [
        {
            "url": "/files/",
            "params": []
        }
    ],
    "model_history": [
        {
            "url": "/graph/{graphid}/model_history",
            "params": [
                "graphid"
            ]
        }
    ],
    "move_node": [
        {
            "url": "/graph/{graphid}/move_node",
            "params": [
                "graphid"
            ]
        }
    ],
    "mvt": [
        {
            "url": "/mvt/{nodeid}/{zoom}/{x}/{y}.pbf",
            "params": [
                "nodeid",
                "zoom",
                "x",
                "y"
            ]
        }
    ],
    "new_graph": [
        {
            "url": "/graph/new",
            "params": []
        }
    ],
    "node": [
        {
            "url": "/node/{graphid}",
            "params": [
                "graphid"
            ]
        }
    ],
    "node_layer": [
        {
            "url": "/node_layer/{graphid}",
            "params": [
                "graphid"
            ]
        }
    ],
    "nodegroup": [
        {
            "url": "/nodegroup/",
            "params": []
        }
    ],
    "oauth2:authorize": [
        {
            "url": "/o/authorize/",
            "params": []
        }
    ],
    "oauth2:authorized-token-delete": [
        {
            "url": "/o/authorized_tokens/{pk}/delete/",
            "params": [
                "pk"
            ]
        }
    ],
    "oauth2:authorized-token-list": [
        {
            "url": "/o/authorized_tokens/",
            "params": []
        }
    ],
    "oauth2:delete": [
        {
            "url": "/o/applications/{pk}/delete/",
            "params": [
                "pk"
            ]
        }
    ],
    "oauth2:detail": [
        {
            "url": "/o/applications/{pk}/",
            "params": [
                "pk"
            ]
        }
    ],
    "oauth2:introspect": [
        {
            "url": "/o/introspect/",
            "params": []
        }
    ],
    "oauth2:jwks-info": [
        {
            "url": "/o/.well-known/jwks.json",
            "params": []
        }
    ],
    "oauth2:list": [
        {
            "url": "/o/applications/",
            "params": []
        }
    ],
    "oauth2:oidc-connect-discovery-info": [
        {
            "url": "/o/.well-known/openid-configuration/",
            "params": []
        }
    ],
    "oauth2:register": [
        {
            "url": "/o/applications/register/",
            "params": []
        }
    ],
    "oauth2:revoke-token": [
        {
            "url": "/o/revoke_token/",
            "params": []
        }
    ],
    "oauth2:rp-initiated-logout": [
        {
            "url": "/o/logout/",
            "params": []
        }
    ],
    "oauth2:token": [
        {
            "url": "/o/token/",
            "params": []
        }
    ],
    "oauth2:update": [
        {
            "url": "/o/applications/{pk}/update/",
            "params": [
                "pk"
            ]
        }
    ],
    "oauth2:user-info": [
        {
            "url": "/o/userinfo/",
            "params": []
        }
    ],
    "ontology_properties": [
        {
            "url": "/ontology_properties",
            "params": []
        }
    ],
    "paged_dropdown": [
        {
            "url": "/concepts/paged_dropdown",
            "params": []
        }
    ],
    "password_reset": [
        {
            "url": "/password_reset/",
            "params": []
        }
    ],
    "password_reset_complete": [
        {
            "url": "/reset/done/",
            "params": []
        }
    ],
    "password_reset_confirm": [
        {
            "url": "/reset/{uidb64}/{token}/",
            "params": [
                "uidb64",
                "token"
            ]
        }
    ],
    "password_reset_done": [
        {
            "url": "/password_reset/done/",
            "params": []
        }
    ],
    "permission_data": [
        {
            "url": "/graph/permissions",
            "params": []
        }
    ],
    "permission_manager_data": [
        {
            "url": "/graph/permissions/permission_manager_data",
            "params": []
        }
    ],
    "plugins": [
        {
            "url": "/plugins/{pluginid}",
            "params": [
                "pluginid"
            ]
        },
        {
            "url": "/plugins/{pluginid}/{path}",
            "params": [
                "pluginid",
                "path"
            ]
        },
        {
            "url": "/plugins/{slug}",
            "params": [
                "slug"
            ]
        },
        {
            "url": "/plugins/{slug}/{path}",
            "params": [
                "slug",
                "path"
            ]
        }
    ],
    "publish_graph": [
        {
            "url": "/graph/{graphid}/publish",
            "params": [
                "graphid"
            ]
        }
    ],
    "rdm": [
        {
            "url": "/rdm/{conceptid}",
            "params": [
                "conceptid"
            ]
        }
    ],
    "reindex": [
        {
            "url": "/admin/reindex/resources",
            "params": []
        }
    ],
    "relatable_resources": [
        {
            "url": "/resource/related/relatable",
            "params": []
        }
    ],
    "related_resource_candidates": [
        {
            "url": "/resource/related/candidates",
            "params": []
        }
    ],
    "related_resources": [
        {
            "url": "/resource/related/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "remove_functions": [
        {
            "url": "/graph/{graphid}/remove_functions",
            "params": [
                "graphid"
            ]
        }
    ],
    "reorder_cards": [
        {
            "url": "/reorder_cards/",
            "params": []
        }
    ],
    "reorder_nodes": [
        {
            "url": "/graph/reorder_nodes",
            "params": []
        }
    ],
    "reorder_tiles": [
        {
            "url": "/tiles/reorder_tiles",
            "params": []
        }
    ],
    "report-templates": [
        {
            "url": "/report-templates/{template}",
            "params": [
                "template"
            ]
        }
    ],
    "resource": [
        {
            "url": "/resource",
            "params": []
        }
    ],
    "resource_cards": [
        {
            "url": "/resource/{resourceid}/cards",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resource_copy": [
        {
            "url": "/resource/{resourceid}/copy",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resource_data": [
        {
            "url": "/resource/{resourceid}/data/{formid}",
            "params": [
                "resourceid",
                "formid"
            ]
        }
    ],
    "resource_descriptors": [
        {
            "url": "/resource/descriptors/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resource_edit_log": [
        {
            "url": "/resource/{resourceid}/history",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resource_editor": [
        {
            "url": "/resource/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resource_permission_data": [
        {
            "url": "/resource/permissions",
            "params": []
        }
    ],
    "resource_report": [
        {
            "url": "/report/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resource_tiles": [
        {
            "url": "/resource/{resourceid}/tiles",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resources": [
        {
            "url": "/resources/{resourceid}",
            "params": [
                "resourceid"
            ]
        }
    ],
    "resources_graphid": [
        {
            "url": "/resources/{graphid}/{resourceid}",
            "params": [
                "graphid",
                "resourceid"
            ]
        }
    ],
    "resources_slug": [
        {
            "url": "/resources/{slug}/{resourceid}",
            "params": [
                "slug",
                "resourceid"
            ]
        }
    ],
    "restore_state_from_serialized_graph": [
        {
            "url": "/graph/{graphid}/restore_state_from_serialized_graph",
            "params": [
                "graphid"
            ]
        }
    ],
    "revert_graph": [
        {
            "url": "/graph/{graphid}/revert",
            "params": [
                "graphid"
            ]
        }
    ],
    "root": [
        {
            "url": "/",
            "params": []
        }
    ],
    "search_home": [
        {
            "url": "/search",
            "params": []
        }
    ],
    "search_results": [
        {
            "url": "/search/resources",
            "params": []
        }
    ],
    "search_sparql_endpoint": [
        {
            "url": "/concepts/search_sparql_endpoint",
            "params": []
        }
    ],
    "search_terms": [
        {
            "url": "/search/terms",
            "params": []
        }
    ],
    "server_settings": [
        {
            "url": "/auth/server_settings",
            "params": []
        }
    ],
    "set_language": [
        {
            "url": "/i18n/setlang/",
            "params": []
        }
    ],
    "signup": [
        {
            "url": "/auth/signup",
            "params": []
        }
    ],
    "spatialview_api": [
        {
            "url": "/api/spatialview/{identifier}/",
            "params": [
                "identifier"
            ]
        }
    ],
    "static_url": [
        {
            "url": "/static/",
            "params": []
        }
    ],
    "temp_file": [
        {
            "url": "/temp_file/{file_id}",
            "params": [
                "file_id"
            ]
        },
        {
            "url": "/temp_file",
            "params": []
        }
    ],
    "templates": [
        {
            "url": "/templates/{template}",
            "params": [
                "template"
            ]
        }
    ],
    "thumbnail": [
        {
            "url": "/thumbnail/{resource_id}",
            "params": [
                "resource_id"
            ]
        }
    ],
    "tile": [
        {
            "url": "/tile",
            "params": []
        }
    ],
    "tile_history": [
        {
            "url": "/tiles/tile_history",
            "params": []
        }
    ],
    "tileserver": [
        {
            "url": "/tileserver/{path}",
            "params": [
                "path"
            ]
        }
    ],
    "time_wheel_config": [
        {
            "url": "/search/time_wheel_config",
            "params": []
        }
    ],
    "transaction_reverse": [
        {
            "url": "/transaction/{transactionid}/reverse",
            "params": [
                "transactionid"
            ]
        }
    ],
    "transform_edtf_for_tile": [
        {
            "url": "/transform-edtf-for-tile",
            "params": []
        }
    ],
    "two-factor-authentication-login": [
        {
            "url": "/two-factor-authentication-login",
            "params": []
        }
    ],
    "two-factor-authentication-reset": [
        {
            "url": "/two-factor-authentication-reset",
            "params": []
        }
    ],
    "two-factor-authentication-settings": [
        {
            "url": "/two-factor-authentication-settings",
            "params": []
        }
    ],
    "update_node": [
        {
            "url": "/graph/{graphid}/update_node",
            "params": [
                "graphid"
            ]
        }
    ],
    "update_notification_types": [
        {
            "url": "/notifications/update_types",
            "params": []
        }
    ],
    "update_published_graph": [
        {
            "url": "/graph/{graphid}/update_published_graph",
            "params": [
                "graphid"
            ]
        }
    ],
    "update_published_graphs": [
        {
            "url": "/graph/{graphid}/update_published_graphs",
            "params": [
                "graphid"
            ]
        }
    ],
    "user_profile": [
        {
            "url": "/auth/user_profile",
            "params": []
        }
    ],
    "user_profile_manager": [
        {
            "url": "/user",
            "params": []
        }
    ],
    "validate": [
        {
            "url": "/validate/{itemtype}/{itemid}",
            "params": [
                "itemtype",
                "itemid"
            ]
        }
    ],
    "validatejson": [
        {
            "url": "/validate/{itemtype}",
            "params": [
                "itemtype"
            ]
        }
    ],
    "widgets": [
        {
            "url": "/widgets/{template}",
            "params": [
                "template"
            ]
        }
    ],
    "workflow_history": [
        {
            "url": "/workflow_history/{workflowid}",
            "params": [
                "workflowid"
            ]
        }
    ]
}[urlName];
    if (!routes || !Array.isArray(routes)) {
        throw new Error(`Key '${urlName}' not found in JSON object`);
    }
    if (!languageCode) {
        languageCode = document.documentElement.lang;
    }
    const primaryLanguageCode = languageCode.split("-")[0];
    urlParameters = {
        ...urlParameters,
        language_code: primaryLanguageCode,
    };
    const urlParameterNames = Object.keys(urlParameters);
    const matchingRoute = routes.find((route) => {
        return route.params.every((parameter) => {
            return urlParameterNames.includes(parameter);
        });
    });
    if (!matchingRoute) {
        throw new Error(`No matching URL pattern for '${urlName}' with provided parameters ${JSON.stringify(urlParameters)}`);
    }
    let url = matchingRoute.url;
    Object.entries(urlParameters).forEach(([key, value]) => {
        url = url.replace(new RegExp(`{${key}}`, "g"), String(value));
    });
    return url;
}

;// ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/utils/create-vue-application.js
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }












function createVueApplication(_x) {
  return _createVueApplication.apply(this, arguments);
}
function _createVueApplication() {
  _createVueApplication = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(vueComponent) {
    var themeConfiguration,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          themeConfiguration = _args.length > 1 && _args[1] !== undefined ? _args[1] : DEFAULT_THEME;
          return _context.a(2, fetch(generateArchesURL("get_frontend_i18n_data")).then(function (resp) {
            if (!resp.ok) {
              throw new Error(resp.statusText);
            }
            return resp.json();
          }).then(function (respJSON) {
            var gettext = (0,dist.createGettext)({
              availableLanguages: respJSON['enabled_languages'],
              defaultLanguage: respJSON['language'],
              translations: respJSON['translations']
            });
            var app = (0,vue_runtime_esm_bundler.createApp)(vueComponent);
            var darkModeClass = themeConfiguration.theme.options.darkModeSelector.substring(1);
            var darkModeStorageKey = "arches.".concat(darkModeClass);
            var darkModeToggleState = localStorage.getItem(darkModeStorageKey);
            if (darkModeToggleState === "true" || darkModeToggleState === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
              document.documentElement.classList.add(darkModeClass);
            }
            app.use(config["default"], themeConfiguration);
            app.use(gettext);
            app.use(confirmationservice["default"]);
            app.use(dialogservice["default"]);
            app.use(toastservice["default"]);
            app.directive('animateonscroll', animateonscroll["default"]);
            app.directive('focustrap', focustrap["default"]);
            app.directive('styleclass', styleclass["default"]);
            app.directive('tooltip', tooltip["default"]);
            return app;
          }));
      }
    }, _callee);
  }));
  return _createVueApplication.apply(this, arguments);
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuN2YwYzQzY2YyNzNmMTBkODFlZDguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlEO0FBQ2hCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNLHFCQUFxQix1QkFBWSxDQUFDLGVBQUk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsY0FBYyxrQkFBTztBQUNyQixlQUFlLGtCQUFPO0FBQ3RCLGFBQWEsa0JBQU87QUFDcEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EseUJBQXlCLHNCQUFzQjtBQUMvQyxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsWUFBWTtBQUMxQyxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7QUNyRE8sc0RBQXNEO0FBQzdEO0FBQ0EsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBVztBQUM5QjtBQUNBLGdDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLHdEQUF3RCxRQUFRLDZCQUE2Qiw4QkFBOEI7QUFDM0g7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEVBQUUsS0FBSztBQUM5QyxLQUFLO0FBQ0w7QUFD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RyxDQUFDbUIsU0FBUyxDQUFDLFdBQVcsRUFBRS9DLG9CQUFTLENBQUM7WUFDckM0QixHQUFHLENBQUNtQixTQUFTLENBQUMsWUFBWSxFQUFFOUMscUJBQVUsQ0FBQztZQUN2QzJCLEdBQUcsQ0FBQ21CLFNBQVMsQ0FBQyxTQUFTLEVBQUU1QyxrQkFBTyxDQUFDO1lBRWpDLE9BQU95QixHQUFHO1VBQ2QsQ0FBQyxDQUFDO01BQUE7SUFBQSxHQUFBakIsT0FBQTtFQUFBLENBQ0w7RUFBQSxPQUFBRCxxQkFBQSxDQUFBakIsS0FBQSxPQUFBRCxTQUFBO0FBQUEsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL3NyYy9hcmNoZXMvdGhlbWVzL2RlZmF1bHQudHMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvc3JjL2FyY2hlcy91dGlscy9nZW5lcmF0ZS1hcmNoZXMtdXJsLnRzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi4vLi4vb3B0L3ZlbnYvbGliL3B5dGhvbjMuMTMvc2l0ZS1wYWNrYWdlcy9hcmNoZXMvYXBwL21lZGlhL2pzL3V0aWxzL2NyZWF0ZS12dWUtYXBwbGljYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmaW5lUHJlc2V0LCBwYWxldHRlIH0gZnJvbSBcIkBwcmltZXVpeC90aGVtZXNcIjtcbmltcG9ydCBBdXJhIGZyb20gXCJAcHJpbWV1aXgvdGhlbWVzL2F1cmFcIjtcbmNvbnN0IGFyY2hlc0NvbG9ycyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGJsdWU6IFwiIzU3OWRkYlwiLFxuICAgIGdyZWVuOiBcIiMzYWNhYTFcIixcbiAgICByZWQ6IFwiI2Y3NWQzZlwiLFxufSk7XG5leHBvcnQgY29uc3QgQXJjaGVzUHJlc2V0ID0gZGVmaW5lUHJlc2V0KEF1cmEsIHtcbiAgICBwcmltaXRpdmU6IHtcbiAgICAgICAgYXJjaGVzOiB7XG4gICAgICAgICAgICAuLi5hcmNoZXNDb2xvcnMsXG4gICAgICAgICAgICBsZWdhY3k6IHtcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiBcIiMyZDNjNGJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGJsdWU6IHBhbGV0dGUoYXJjaGVzQ29sb3JzLmJsdWUpLFxuICAgICAgICBncmVlbjogcGFsZXR0ZShhcmNoZXNDb2xvcnMuZ3JlZW4pLFxuICAgICAgICByZWQ6IHBhbGV0dGUoYXJjaGVzQ29sb3JzLnJlZCksXG4gICAgfSxcbiAgICBzZW1hbnRpYzoge1xuICAgICAgICAvLyBQcmltZVZ1ZSB0b2tlbiBvdmVycmlkZVxuICAgICAgICBwcmltYXJ5OiBwYWxldHRlKGFyY2hlc0NvbG9ycy5ibHVlKSxcbiAgICAgICAgLy8gUHJpbWVWdWUgdG9rZW4gb3ZlcnJpZGVcbiAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0ZW06IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjFyZW1cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBjdXN0b20gdG9rZW5zXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJ7YXJjaGVzLmxlZ2FjeS5zaWRlYmFyfVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgc3BsaXR0ZXI6IHtcbiAgICAgICAgICAgIGhhbmRsZToge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwie3N1cmZhY2UuNTAwfVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG5leHBvcnQgY29uc3QgREVGQVVMVF9USEVNRSA9IHtcbiAgICB0aGVtZToge1xuICAgICAgICBwcmVzZXQ6IEFyY2hlc1ByZXNldCxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgcHJlZml4OiBcInBcIixcbiAgICAgICAgICAgIGRhcmtNb2RlU2VsZWN0b3I6IFwiLmFyY2hlcy1kYXJrXCIsXG4gICAgICAgICAgICBjc3NMYXllcjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVBcmNoZXNVUkwodXJsTmFtZSwgdXJsUGFyYW1ldGVycyA9IHt9LCBsYW5ndWFnZUNvZGUpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIEFSQ0hFU19VUkxTIGlzIGRlZmluZWQgZ2xvYmFsbHlcbiAgICBjb25zdCByb3V0ZXMgPSBBUkNIRVNfVVJMU1t1cmxOYW1lXTtcbiAgICBpZiAoIXJvdXRlcyB8fCAhQXJyYXkuaXNBcnJheShyb3V0ZXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgS2V5ICcke3VybE5hbWV9JyBub3QgZm91bmQgaW4gSlNPTiBvYmplY3RgKTtcbiAgICB9XG4gICAgaWYgKCFsYW5ndWFnZUNvZGUpIHtcbiAgICAgICAgbGFuZ3VhZ2VDb2RlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lmxhbmc7XG4gICAgfVxuICAgIGNvbnN0IHByaW1hcnlMYW5ndWFnZUNvZGUgPSBsYW5ndWFnZUNvZGUuc3BsaXQoXCItXCIpWzBdO1xuICAgIHVybFBhcmFtZXRlcnMgPSB7XG4gICAgICAgIC4uLnVybFBhcmFtZXRlcnMsXG4gICAgICAgIGxhbmd1YWdlX2NvZGU6IHByaW1hcnlMYW5ndWFnZUNvZGUsXG4gICAgfTtcbiAgICBjb25zdCB1cmxQYXJhbWV0ZXJOYW1lcyA9IE9iamVjdC5rZXlzKHVybFBhcmFtZXRlcnMpO1xuICAgIGNvbnN0IG1hdGNoaW5nUm91dGUgPSByb3V0ZXMuZmluZCgocm91dGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJvdXRlLnBhcmFtcy5ldmVyeSgocGFyYW1ldGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdXJsUGFyYW1ldGVyTmFtZXMuaW5jbHVkZXMocGFyYW1ldGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKCFtYXRjaGluZ1JvdXRlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWF0Y2hpbmcgVVJMIHBhdHRlcm4gZm9yICcke3VybE5hbWV9JyB3aXRoIHByb3ZpZGVkIHBhcmFtZXRlcnMgJHtKU09OLnN0cmluZ2lmeSh1cmxQYXJhbWV0ZXJzKX1gKTtcbiAgICB9XG4gICAgbGV0IHVybCA9IG1hdGNoaW5nUm91dGUudXJsO1xuICAgIE9iamVjdC5lbnRyaWVzKHVybFBhcmFtZXRlcnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShuZXcgUmVnRXhwKGB7JHtrZXl9fWAsIFwiZ1wiKSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVybDtcbn1cbiIsImltcG9ydCBQcmltZVZ1ZSBmcm9tICdwcmltZXZ1ZS9jb25maWcnO1xuaW1wb3J0IEFuaW1hdGVPblNjcm9sbCBmcm9tICdwcmltZXZ1ZS9hbmltYXRlb25zY3JvbGwnO1xuaW1wb3J0IENvbmZpcm1hdGlvblNlcnZpY2UgZnJvbSAncHJpbWV2dWUvY29uZmlybWF0aW9uc2VydmljZSc7XG5pbXBvcnQgRGlhbG9nU2VydmljZSBmcm9tICdwcmltZXZ1ZS9kaWFsb2dzZXJ2aWNlJztcbmltcG9ydCBGb2N1c1RyYXAgZnJvbSAncHJpbWV2dWUvZm9jdXN0cmFwJztcbmltcG9ydCBTdHlsZUNsYXNzIGZyb20gJ3ByaW1ldnVlL3N0eWxlY2xhc3MnO1xuaW1wb3J0IFRvYXN0U2VydmljZSBmcm9tICdwcmltZXZ1ZS90b2FzdHNlcnZpY2UnO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAncHJpbWV2dWUvdG9vbHRpcCc7XG5cbmltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBjcmVhdGVHZXR0ZXh0IH0gZnJvbSBcInZ1ZTMtZ2V0dGV4dFwiO1xuXG5pbXBvcnQgeyBERUZBVUxUX1RIRU1FIH0gZnJvbSBcIkAvYXJjaGVzL3RoZW1lcy9kZWZhdWx0LnRzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUFyY2hlc1VSTCB9IGZyb20gJ0AvYXJjaGVzL3V0aWxzL2dlbmVyYXRlLWFyY2hlcy11cmwudHMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVZ1ZUFwcGxpY2F0aW9uKHZ1ZUNvbXBvbmVudCwgdGhlbWVDb25maWd1cmF0aW9uID0gREVGQVVMVF9USEVNRSkge1xuICAgIC8qKlxuICAgICAqIFRoaXMgd3JhcHBlciBhbGxvd3MgdXMgdG8gbWFpbnRhaW4gYSBsZXZlbCBvZiBjb250cm9sIGluc2lkZSBhcmNoZXMtY29yZVxuICAgICAqIG92ZXIgVnVlIGFwcHMuIEZvciBpbnN0YW5jZSB0aGlzIGFsbG93cyB1cyB0byBhYnN0cmFjdCBpMThuIHNldHVwL2NvbmZpZ1xuICAgICAqIGF3YXkgZnJvbSBhcHAgaW5pdGlhbGl6YXRpb24sIGFuZCBhbHNvIGFsbG93cyB1cyB0byBlbnN1cmUgYW55IHBsdWdpbnMgXG4gICAgICogd2UnZCBsaWtlIHRvIHVzZSBhY3Jvc3MgdGhlIEFyY2hlcyBlY29zeXN0ZW0gd2lsbCBiZSBhdmFpbGFibGUuIFRoaXMgYWxzb1xuICAgICAqIFZ1ZSBhcHBzIG1vcmUgZWFzaWx5IGV4dGVuc2libGUgaWYgd2UgY2hvb3NlIHRvIGFkZCBwbHVnaW5zIG9yIGxvZ2ljIGluXG4gICAgICogdGhlIGZ1dHVyZS5cbiAgICAqKi9cblxuICAgIC8qKlxuICAgICAqIFRPRE86IGNieXJkICMxMDUwMSAtIHdlIHNob3VsZCBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCB3aWxsIHJlLWZldGNoIGkxOG4gZGF0YVxuICAgICAqIGFuZCByZWJ1aWxkIHRoZSBhcHAgd2hlbiBhIHNwZWNpZmljIGV2ZW50IGlzIGZpcmVkIGZyb20gdGhlIExhbmd1YWdlU3dpdGNoZXIgY29tcG9uZW50LlxuICAgICoqL1xuXG4gICAgcmV0dXJuIGZldGNoKGdlbmVyYXRlQXJjaGVzVVJMKFwiZ2V0X2Zyb250ZW5kX2kxOG5fZGF0YVwiKSkudGhlbihmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIGlmICghcmVzcC5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3Auc3RhdHVzVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcEpTT04pIHtcbiAgICAgICAgY29uc3QgZ2V0dGV4dCA9IGNyZWF0ZUdldHRleHQoe1xuICAgICAgICAgICAgYXZhaWxhYmxlTGFuZ3VhZ2VzOiByZXNwSlNPTlsnZW5hYmxlZF9sYW5ndWFnZXMnXSxcbiAgICAgICAgICAgIGRlZmF1bHRMYW5ndWFnZTogcmVzcEpTT05bJ2xhbmd1YWdlJ10sXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM6IHJlc3BKU09OWyd0cmFuc2xhdGlvbnMnXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYXBwID0gY3JlYXRlQXBwKHZ1ZUNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGRhcmtNb2RlQ2xhc3MgPSB0aGVtZUNvbmZpZ3VyYXRpb24udGhlbWUub3B0aW9ucy5kYXJrTW9kZVNlbGVjdG9yLnN1YnN0cmluZygxKTtcbiAgICAgICAgY29uc3QgZGFya01vZGVTdG9yYWdlS2V5ID0gYGFyY2hlcy4ke2RhcmtNb2RlQ2xhc3N9YDtcblxuICAgICAgICBjb25zdCBkYXJrTW9kZVRvZ2dsZVN0YXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZGFya01vZGVTdG9yYWdlS2V5KTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZGFya01vZGVUb2dnbGVTdGF0ZSA9PT0gXCJ0cnVlXCIgfHxcbiAgICAgICAgICAgIChkYXJrTW9kZVRvZ2dsZVN0YXRlID09PSBudWxsICYmXG4gICAgICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLm1hdGNoZXMpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoZGFya01vZGVDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBhcHAudXNlKFByaW1lVnVlLCB0aGVtZUNvbmZpZ3VyYXRpb24pO1xuICAgICAgICBhcHAudXNlKGdldHRleHQpO1xuICAgICAgICBhcHAudXNlKENvbmZpcm1hdGlvblNlcnZpY2UpO1xuICAgICAgICBhcHAudXNlKERpYWxvZ1NlcnZpY2UpO1xuICAgICAgICBhcHAudXNlKFRvYXN0U2VydmljZSk7XG4gICAgICAgIGFwcC5kaXJlY3RpdmUoJ2FuaW1hdGVvbnNjcm9sbCcsIEFuaW1hdGVPblNjcm9sbCk7XG4gICAgICAgIGFwcC5kaXJlY3RpdmUoJ2ZvY3VzdHJhcCcsIEZvY3VzVHJhcCk7XG4gICAgICAgIGFwcC5kaXJlY3RpdmUoJ3N0eWxlY2xhc3MnLCBTdHlsZUNsYXNzKTtcbiAgICAgICAgYXBwLmRpcmVjdGl2ZSgndG9vbHRpcCcsIFRvb2x0aXApO1xuXG4gICAgICAgIHJldHVybiBhcHA7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJyZXR1cm4iLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJQcmltZVZ1ZSIsIkFuaW1hdGVPblNjcm9sbCIsIkNvbmZpcm1hdGlvblNlcnZpY2UiLCJEaWFsb2dTZXJ2aWNlIiwiRm9jdXNUcmFwIiwiU3R5bGVDbGFzcyIsIlRvYXN0U2VydmljZSIsIlRvb2x0aXAiLCJjcmVhdGVBcHAiLCJjcmVhdGVHZXR0ZXh0IiwiREVGQVVMVF9USEVNRSIsImdlbmVyYXRlQXJjaGVzVVJMIiwiY3JlYXRlVnVlQXBwbGljYXRpb24iLCJfeCIsIl9jcmVhdGVWdWVBcHBsaWNhdGlvbiIsIl9jYWxsZWUiLCJ2dWVDb21wb25lbnQiLCJ0aGVtZUNvbmZpZ3VyYXRpb24iLCJfYXJncyIsIl9jb250ZXh0IiwidW5kZWZpbmVkIiwiZmV0Y2giLCJyZXNwIiwib2siLCJFcnJvciIsInN0YXR1c1RleHQiLCJqc29uIiwicmVzcEpTT04iLCJnZXR0ZXh0IiwiYXZhaWxhYmxlTGFuZ3VhZ2VzIiwiZGVmYXVsdExhbmd1YWdlIiwidHJhbnNsYXRpb25zIiwiYXBwIiwiZGFya01vZGVDbGFzcyIsInRoZW1lIiwib3B0aW9ucyIsImRhcmtNb2RlU2VsZWN0b3IiLCJzdWJzdHJpbmciLCJkYXJrTW9kZVN0b3JhZ2VLZXkiLCJjb25jYXQiLCJkYXJrTW9kZVRvZ2dsZVN0YXRlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1c2UiLCJkaXJlY3RpdmUiXSwic291cmNlUm9vdCI6IiJ9