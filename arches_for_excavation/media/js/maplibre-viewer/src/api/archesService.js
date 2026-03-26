import basemapService from '../../../services/basemap-service';
import resourceService from '../../../services/resource-service';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const _extractProjectExtentCoordinates = (payload) => {
    const firstEntry = Object.values(payload)[0];
    const coordinates =
        firstEntry.resource['Map Settings']['Project Extent'].DEFAULT_BOUNDS.geojson.features[0].geometry.coordinates;
    return coordinates.flat();
};

export const getMapExtent = async () => {
    const url = '/api/bulk_disambiguated_resource_instance?v=beta&resource_ids=a106c400-260c-11e7-a604-14109fd34195';

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        return _extractProjectExtentCoordinates(payload);
    } catch (error) {
        console.warn('Map extent API failed: ', error);
    }
};

export const getBasemapsAndOverlays = () => {
    return basemapService.getBasemapsAndOverlaysInfo();
};

export const getAllResources = (graphId=null) => {
    // return resourceService.getAll(graphId);
    return Promise.resolve({
    "groups": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
    ],
    "paging-filter": {
        "paginator": {
            "current_page": 1,
            "end_index": 5,
            "has_next": true,
            "has_other_pages": true,
            "has_previous": false,
            "next_page_number": 2,
            "pages": [
                1,
                2,
                3
            ],
            "previous_page_number": null,
            "start_index": 1
        }
    },
    "results": {
        "_shards": {
            "failed": 0,
            "skipped": 0,
            "successful": 1,
            "total": 1
        },
        "aggregations": {
            "geo_aggs": {
                "doc_count": 3,
                "inner": {
                    "buckets": [
                        {
                            "bounds": {
                                "bounds": {
                                    "bottom_right": {
                                        "lat": 37.72472304292023,
                                        "lon": 21.879882914945483
                                    },
                                    "top_left": {
                                        "lat": 37.72472304292023,
                                        "lon": 21.879882914945483
                                    }
                                }
                            },
                            "doc_count": 3,
                            "grid": {
                                "buckets": [
                                    {
                                        "doc_count": 3,
                                        "key": "sqxw"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        },
        "hits": {
            "hits": [
                {
                    "_id": "c73229bb-6548-456b-a4c9-1e6edcdebf48",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "2026-01-29 10:58:53+0000",
                        "displayname": "export_cesium_11_T_IV_174",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "c73229bb-6548-456b-a4c9-1e6edcdebf48",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "1de78819-cf6c-4eb1-9fc5-4f668c3639a2",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "2026-02-11 09:55:40+0000",
                        "displayname": "export_cesium_10_T_IV_174",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "1de78819-cf6c-4eb1-9fc5-4f668c3639a2",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "749e1f0a-b30e-4a7d-908f-6cac5f8e9875",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "2026-02-11 09:55:26+0000",
                        "displayname": "export_cesium_11_T_IV_174",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "749e1f0a-b30e-4a7d-908f-6cac5f8e9875",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "5a1c10cb-502f-491d-b1a4-69b0f7d8edf5",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "2026-02-11 10:07:24+0000",
                        "displayname": "export_cesium_11_T_IV_174",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "5a1c10cb-502f-491d-b1a4-69b0f7d8edf5",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "b49dc69f-2d39-4fc5-b84b-984e01de8e48",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "2026-02-09 10:05:10+0000",
                        "displayname": "export_cesium_11_T_IV_174",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "5465389c-bba7-4af1-bc9a-9fbb201e8408",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "b49dc69f-2d39-4fc5-b84b-984e01de8e48",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "53ebd7ad-ab4b-4221-b5f9-c5acd67f6209",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": " <Description>",
                        "displayname": "<Name>",
                        "displayname_language": "en",
                        "geometries": [
                            {
                                "geom": {
                                    "features": [
                                        {
                                            "geometry": {
                                                "coordinates": [
                                                    [
                                                        [
                                                            21.87989907132093,
                                                            37.7247274543238,
                                                            274.4332
                                                        ],
                                                        [
                                                            21.879898209420904,
                                                            37.724720183702885,
                                                            274.5244
                                                        ],
                                                        [
                                                            21.879886894244635,
                                                            37.724716525884546,
                                                            274.41999999999996
                                                        ],
                                                        [
                                                            21.879866871247568,
                                                            37.72471663937427,
                                                            274.4392
                                                        ],
                                                        [
                                                            21.87986735343186,
                                                            37.724729624337506,
                                                            274.4337
                                                        ],
                                                        [
                                                            21.879885277389764,
                                                            37.72472359604041,
                                                            275.1381
                                                        ],
                                                        [
                                                            21.87989907132093,
                                                            37.7247274543238,
                                                            274.4332
                                                        ]
                                                    ]
                                                ],
                                                "type": "Polygon"
                                            },
                                            "id": "c0901510d34b49318cfc8f2e48d3b0fc",
                                            "properties": {},
                                            "type": "Feature"
                                        }
                                    ],
                                    "properties": {},
                                    "type": "FeatureCollection"
                                },
                                "nodegroup_id": "3a9f46c0-f538-11ea-ac6d-9fb7e90de197",
                                "provisional": false,
                                "tileid": "f5b479d1-c18b-49b4-a00e-f3e8ffcf1003"
                            }
                        ],
                        "graph_id": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
                        "map_popup": [
                            {
                                "language": "en",
                                "value": " <Name>,  <Description>"
                            },
                            {
                                "language": "ar",
                                "value": " <Name>,  <Description>"
                            },
                            {
                                "language": "he",
                                "value": " <Name>,  <Description>"
                            }
                        ],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [
                            {
                                "nodegroup_id": "3a9f46c0-f538-11ea-ac6d-9fb7e90de197",
                                "point": {
                                    "lat": 37.72472307511103,
                                    "lon": 21.87988297128425
                                },
                                "provisional": false
                            }
                        ],
                        "provisional_resource": "false",
                        "resourceinstanceid": "53ebd7ad-ab4b-4221-b5f9-c5acd67f6209",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "b876c587-496b-48c7-852b-21995c848fdd",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "Undefined",
                        "displayname": "test_trench",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "9d82972a-f537-11ea-ac6d-9fb7e90de197",
                        "map_popup": [
                            {
                                "language": "en",
                                "value": " test_trench,  "
                            },
                            {
                                "language": "ar",
                                "value": " ,  "
                            },
                            {
                                "language": "he",
                                "value": " ,  "
                            }
                        ],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "b876c587-496b-48c7-852b-21995c848fdd",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "555de789-8aee-4b81-be34-b7e31ef16dc7",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "Undefined",
                        "displayname": "Undefined",
                        "geometries": [],
                        "graph_id": "5115ff02-b628-401b-889c-a10328ee21a2",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "555de789-8aee-4b81-be34-b7e31ef16dc7",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "3b421124-c136-442e-a100-46c018ac8124",
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "<Description>",
                        "displayname": "<Trench Number>, <Context Number>",
                        "displayname_language": "en",
                        "geometries": [
                            {
                                "geom": {
                                    "features": [
                                        {
                                            "geometry": {
                                                "coordinates": [
                                                    [
                                                        [
                                                            21.87989907132093,
                                                            37.7247274543238,
                                                            274.4332
                                                        ],
                                                        [
                                                            21.879898209420904,
                                                            37.724720183702885,
                                                            274.5244
                                                        ],
                                                        [
                                                            21.879886894244635,
                                                            37.724716525884546,
                                                            274.41999999999996
                                                        ],
                                                        [
                                                            21.879866871247568,
                                                            37.72471663937427,
                                                            274.4392
                                                        ],
                                                        [
                                                            21.87986735343186,
                                                            37.724729624337506,
                                                            274.4337
                                                        ],
                                                        [
                                                            21.87989907132093,
                                                            37.7247274543238,
                                                            274.4332
                                                        ]
                                                    ]
                                                ],
                                                "type": "Polygon"
                                            },
                                            "id": "8c43026940dc4c3eb0e420a3d9b2ec60",
                                            "properties": {},
                                            "type": "Feature"
                                        }
                                    ],
                                    "properties": {},
                                    "type": "FeatureCollection"
                                },
                                "nodegroup_id": "d6559931-9f52-11eb-96c4-020063fe0012",
                                "provisional": false,
                                "tileid": "1cefeb23-c3f1-4682-9192-fe828b93a863"
                            }
                        ],
                        "graph_id": "d6559924-9f52-11eb-96c4-020063fe0012",
                        "map_popup": [
                            {
                                "language": "en",
                                "value": "<Context Number>"
                            },
                            {
                                "language": "ar",
                                "value": "<Context Number>"
                            },
                            {
                                "language": "he",
                                "value": "<Context Number>"
                            }
                        ],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [
                            {
                                "nodegroup_id": "d6559931-9f52-11eb-96c4-020063fe0012",
                                "point": {
                                    "lat": 37.72472307511103,
                                    "lon": 21.87988297128425
                                },
                                "provisional": false
                            }
                        ],
                        "provisional_resource": "false",
                        "resourceinstanceid": "3b421124-c136-442e-a100-46c018ac8124",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "d71dd0e2-e6a3-43a3-8f3b-73c8a9162529",
                    "_ignored": [
                        "tiles.data.bd290f65-b2fe-4de2-a9b6-fa056036facb.keyword",
                        "strings.string.raw"
                    ],
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "<Description>",
                        "displayname": "<Trench Number>, <Context Number>",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "d6559924-9f52-11eb-96c4-020063fe0012",
                        "map_popup": [
                            {
                                "language": "en",
                                "value": "<Context Number>"
                            },
                            {
                                "language": "ar",
                                "value": "<Context Number>"
                            },
                            {
                                "language": "he",
                                "value": "<Context Number>"
                            }
                        ],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "d71dd0e2-e6a3-43a3-8f3b-73c8a9162529",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "592fe65b-3577-4f06-bf60-37bdd279a989",
                    "_ignored": [
                        "tiles.data.bd290f65-b2fe-4de2-a9b6-fa056036facb.keyword",
                        "strings.string.raw"
                    ],
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "test",
                        "displayname": "<Trench Number>, <Context Number>",
                        "displayname_language": "en",
                        "geometries": [
                            {
                                "geom": {
                                    "features": [
                                        {
                                            "geometry": {
                                                "coordinates": [
                                                    [
                                                        [
                                                            21.87989907132093,
                                                            37.7247274543238,
                                                            274.4332
                                                        ],
                                                        [
                                                            21.879898209420904,
                                                            37.724720183702885,
                                                            274.5244
                                                        ],
                                                        [
                                                            21.879886894244635,
                                                            37.724716525884546,
                                                            274.41999999999996
                                                        ],
                                                        [
                                                            21.879866871247568,
                                                            37.72471663937427,
                                                            274.4392
                                                        ],
                                                        [
                                                            21.87986735343186,
                                                            37.724729624337506,
                                                            274.4337
                                                        ],
                                                        [
                                                            21.87989907132093,
                                                            37.7247274543238,
                                                            274.4332
                                                        ]
                                                    ]
                                                ],
                                                "type": "Polygon"
                                            },
                                            "id": "47ba0e45b8a34ff2b931d24caa7cd577",
                                            "properties": {},
                                            "type": "Feature"
                                        }
                                    ],
                                    "properties": {},
                                    "type": "FeatureCollection"
                                },
                                "nodegroup_id": "d6559931-9f52-11eb-96c4-020063fe0012",
                                "provisional": false,
                                "tileid": "77d8603b-8c43-4a97-ba6b-a42544564dc5"
                            }
                        ],
                        "graph_id": "d6559924-9f52-11eb-96c4-020063fe0012",
                        "map_popup": [
                            {
                                "language": "en",
                                "value": "<Context Number>"
                            },
                            {
                                "language": "ar",
                                "value": "<Context Number>"
                            },
                            {
                                "language": "he",
                                "value": "<Context Number>"
                            }
                        ],
                        "permissions": {
                            "principal_user": [
                                1
                            ],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [
                            {
                                "nodegroup_id": "d6559931-9f52-11eb-96c4-020063fe0012",
                                "point": {
                                    "lat": 37.72472307511103,
                                    "lon": 21.87988297128425
                                },
                                "provisional": false
                            }
                        ],
                        "provisional_resource": "false",
                        "resourceinstanceid": "592fe65b-3577-4f06-bf60-37bdd279a989",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": true
                },
                {
                    "_id": "f8a7bc30-b953-4246-ac0c-09cc47970ad2",
                    "_ignored": [
                        "tiles.data.fd7658d3-9e61-4ff3-b644-7edd9d458a9c.keyword",
                        "tiles.data.fc23448e-7ab8-4e02-9848-73e3103a4423.keyword",
                        "strings.string.raw"
                    ],
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "Test grid for TAP trench",
                        "displayname": "TAP Local CRS",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "a5219c24-2907-4055-9d68-18216d214458",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "f8a7bc30-b953-4246-ac0c-09cc47970ad2",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": false
                },
                {
                    "_id": "af96cebd-e182-4742-84f5-2532f2df75b6",
                    "_ignored": [
                        "tiles.data.fd7658d3-9e61-4ff3-b644-7edd9d458a9c.keyword",
                        "tiles.data.fc23448e-7ab8-4e02-9848-73e3103a4423.keyword",
                        "strings.string.raw"
                    ],
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "description",
                        "displayname": "Plugin Access",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "a5219c24-2907-4055-9d68-18216d214458",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "af96cebd-e182-4742-84f5-2532f2df75b6",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": false
                },
                {
                    "_id": "805f3ffc-8082-4e46-9180-4307b4c78830",
                    "_ignored": [
                        "tiles.data.fd7658d3-9e61-4ff3-b644-7edd9d458a9c.keyword",
                        "tiles.data.fc23448e-7ab8-4e02-9848-73e3103a4423.keyword",
                        "strings.string.raw"
                    ],
                    "_index": "arches_slocal_resources",
                    "_score": 0,
                    "_source": {
                        "displaydescription": "zisbfasnfkas",
                        "displayname": "Plugin Access",
                        "displayname_language": "en",
                        "geometries": [],
                        "graph_id": "a5219c24-2907-4055-9d68-18216d214458",
                        "map_popup": [],
                        "permissions": {
                            "principal_user": [],
                            "users_with_no_access": [],
                            "users_without_delete_perm": [],
                            "users_without_edit_perm": [],
                            "users_without_read_perm": []
                        },
                        "points": [],
                        "provisional_resource": "false",
                        "resourceinstanceid": "805f3ffc-8082-4e46-9180-4307b4c78830",
                        "root_ontology_class": null
                    },
                    "can_edit": true,
                    "can_read": true,
                    "is_principal": false
                }
            ],
            "max_score": 0,
            "total": {
                "relation": "eq",
                "value": 14
            }
        },
        "timed_out": false,
        "took": 299
    },
    "reviewer": true,
    "timestamp": "2026-03-18T04:45:32.719",
    "total_results": 14,
    "userid": 1
})
};
