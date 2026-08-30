# Arches for JU Excavations

**Arches for JU Excavations** is an [Arches 8](https://www.archesproject.org/) application tailored for managing archaeological field data, including excavation trenches, stratigraphic contexts, special finds, and linked 2D/3D/IIIF digital resources. It features robust support for site-local coordinate systems and GeoTIFF basemaps.

This core application was developed under the [**Mare Nostrum LAB Platform**](https://mn.cenagis.edu.pl/), a part of the wider [**Mare Nostrum LAB**](https://mare.id.uj.edu.pl/) project under [**Jagiellonian University in Kraków**](https://www.uj.edu.pl/), aimed at bridging technology and heritage preservation.

---

## Data Model
To guarantee semantic richness and global standardization, the data models in this package strictly adhere to the **CIDOC CRM (v7.1.3)** ontology, including the **CRMarchaeo**, **CRMgeo**, and **CRMdig** extensions. 

The package ships with 7 core resource models:
*   **(O) Trench:** Excavation trenches containing name, description, spatial extent, GeoJSON footprints, and linked local CRS.
*   **(O) Context:** Stratigraphic units containing context numbers, trench links, Harris-matrix relations, soil characterization, field documentation, and footprints.
*   **(O) Special find:** Individual finds tracking inventory numbers, 3D position (GeoJSON), photographs, and responsible personnel.
*   **(O) Digital Resource IIIF:** IIIF image resources including manifests and geospatial linkages.
*   **(O) Digital Resource 3D:** 3D models with file/URL data and geospatial linkages.
*   **(O) Coordinate System:** Site-local coordinate systems defining origin, direction, and WKT derivation parameters.
*   **(O) Annotation:** Spatial and semantic annotations applied to other resources.

---

## Features & Extensions

### Guided Workflows
The system replaces standard data entry with guided, step-by-step workflows accessible via the Workflow Launcher.
*   **GNSS/Total Station Data Import:** Import raw survey data to add footprints to Trenches, Contexts and Special finds (supports WGS84 and Local CRS).
*   **Coordinate Reference Systems:** Define site-local coordinate systems and assign them directly to resources.
*   **Digital Resources:** Upload, link, and append 3D models, IIIF image resources, and RTI (Reflectance Transformation Imaging) resources.
*   **Annotations:** Create and manage annotations directly on 3D and IIIF digital resources.
*   **Basemap Management:** Upload high-resolution GeoTIFF basemaps and overlay layers for the integrated map viewer.

### Custom Plugins
*   **Map Plugin:** Dive into a fully interactive, MapLibre-based continuous workspace. We highly encourage you to test it out: dynamically search your database, plot resources as distinct layers, adjust opacities and colors, overlay them onto your own high-resolution drone basemaps, and export your custom workspace to PDF!
*   **3D Plugin (Work in Progress):** A Cesium-based 3D viewer for spatial excavation analysis that can display multiple resources at once. *Please note that this feature is currently still in development.*

### Specialized Reports
*   **Context Tabbed Report:** A unified Context view featuring a map tab alongside embedded 3D (Cesium) and IIIF viewers for attached digital resources.
*   **Asset Reports:** Dedicated reports for IIIF Resources and 3D Digital Resources.

### External Integrations & Security
*   **MN Lab Platform Thesaurus:** Integrated SPARQL concept provider for controlled vocabularies (loaded automatically on startup).
*   **Access Control:** Custom authentication groups (e.g., *Restricted Basemap Access*) gate specific functionalities like GeoTIFF basemap tile serving (generated automatically on startup).

---

## User Guide & Documentation
For detailed, step-by-step instructions on utilizing the custom workflows (such as the GNSS/Total Station Data Import), please visit our official documentation: **[Mare Nostrum LAB Platform User Guide](https://mn-lab-platform.github.io/arches-for-ju-excavations/about/)**

---

## Installation & Deployment

### Recommended: Docker Wrapper
This repository contains the **core application package only** and is not intended to be deployed standalone. 

For a complete, deployment-ready environment (including PostgreSQL/PostGIS, Elasticsearch, Redis, Celery, Nginx, and TiTiler), you must deploy this application using our official Docker wrapper:
**[arches-for-ju-excavations-project](https://github.com/mn-lab-platform/arches-for-ju-excavations-project)**

---

### Advanced: Manual Installation (Developers)
The manual path is feasible for developers but is not documented or tested as an alternative to the Docker stack. It requires standing up supporting services manually (e.g., TiTiler). 

If you are integrating this package into a custom Arches environment, please ensure you execute the following commands to register the custom extensions and load the required ontologies and resource models:

```bash
./register_extensions.sh
```

```bash
python manage.py packages -o load_package -a arches_for_excavation -y
```
