from celery import shared_task
from rasterio.shutil import copy
import os


class ConversionError(Exception):
    pass

@shared_task
def convert_geotiff_to_cog(src_path, dst_path):
    print(f"Converting {src_path} -> {dst_path}...")
    try:
        copy(
            src_path,
            dst_path,
            driver='COG',      
            compress='DEFLATE',
            overview_resampling='NEAREST',
            blocksize=512
        )
        print("Conversion Complete.")
    except Exception as e:
        print(f"Error during conversion: {e}")
        raise ConversionError(f"Failed to convert GeoTIFF to COG: {str(e)}")
    finally:
        if os.path.exists(src_path):
            os.remove(src_path)
