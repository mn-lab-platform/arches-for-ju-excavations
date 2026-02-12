import rasterio
from rasterio.errors import RasterioIOError

def _read_geotiff_metadata(src_path: str) -> dict:
    try:
        with rasterio.open(src_path) as ds:
            crs = ds.crs
            # EPSG jeśli możliwe (nie zawsze)
            epsg = None
            if crs is not None:
                try:
                    epsg = crs.to_epsg()
                except Exception:
                    epsg = None

            transform = ds.transform
            bounds = ds.bounds

            nodata = ds.nodata
            dtype = ds.dtypes[0] if ds.count >= 1 else None

            # prosta heurystyka DEM
            is_dem_hint = (ds.count == 1 and (dtype or "").startswith("float"))

            has_georef = (crs is not None and transform is not None and not transform.is_identity)

            return {
                "driver": ds.driver,
                "width": ds.width,
                "height": ds.height,
                "count": ds.count,
                "dtype": dtype,
                "nodata": nodata,
                "crs": crs.to_string() if crs is not None else None,
                "epsg": epsg,
                "transform": [transform.a, transform.b, transform.c, transform.d, transform.e, transform.f],
                "bounds": [bounds.left, bounds.bottom, bounds.right, bounds.top],
                "has_georef": bool(has_georef),
                "is_dem_hint": bool(is_dem_hint),
            }
    except RasterioIOError as e:
        raise ValueError(f"Cannot read raster: {e}")