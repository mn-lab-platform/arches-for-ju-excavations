from celery import shared_task
from rasterio.shutil import copy
import logging

logger = logging.getLogger(__name__)

class ConversionError(Exception):
    pass

@shared_task
def convert_geotiff_to_cog(src_path, dst_path):
    logger.info(f"[COG TASK] Converting {src_path} -> {dst_path}...")
    print(f"Converting {src_path} -> {dst_path}...")
    try:
        logger.info(f"[COG TASK] Starting COG conversion with driver='COG', compress='DEFLATE'")
        copy(
            src_path,
            dst_path,
            driver='COG',      
            compress='DEFLATE',
            overview_resampling='NEAREST',
            blocksize=512
        )
        logger.info("[COG TASK] Conversion Complete.")
        print("Conversion Complete.")
        return {"status": "success", "dst_path": dst_path}
    except Exception as e:
        logger.error(f"[COG TASK] Error during conversion: {e}", exc_info=True)
        print(f"Error during conversion: {e}")
        raise ConversionError(f"Failed to convert GeoTIFF to COG: {str(e)}")
