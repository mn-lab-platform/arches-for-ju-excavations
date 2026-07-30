from typing import Optional

import numpy as np
import pyproj
from pyproj.enums import WktVersion, TransformDirection

from .wkt_template import TEMPLATE_WKT2_WGS84


def write_text_to_file(text: str, path: str):
    with open(path, 'w') as file:
        file.write(text) 

class ObliqueMercator:
    def __init__(self, crs: pyproj.CRS):
        self.crs: pyproj.CRS = crs
        self.transformer: pyproj.Transformer = pyproj.Transformer.from_crs(4326, crs, always_xy=True)

    @classmethod
    def from_parameters(cls, origin: np.ndarray, false_offset: np.ndarray, azimuth: float, name: Optional[str] = None) -> "ObliqueMercator":
        if name is None:
            name = f"Oblique Mercator at {origin[0] :.3f}, {origin[1] :.3f}"
        
        wkt2 = TEMPLATE_WKT2_WGS84.format(
            name=name, azimuth=str(azimuth),
            origin_latitude=str(origin[1]), origin_longitude=str(origin[0]),
            false_easting=str(false_offset[0]), false_northing=str(false_offset[1])
        )
        
        crs = pyproj.CRS.from_wkt(wkt2)
        new = cls(crs)
        return new
    
    @classmethod
    def from_wkt2_file(cls, path: str) -> "ObliqueMercator":
        with open(path, 'r') as file:
            crs = pyproj.CRS.from_wkt(file.read())
            return cls(crs)

    @classmethod
    def from_wkt2_string(cls, wkt: str) -> "ObliqueMercator":
        crs = pyproj.CRS.from_wkt(wkt)
        return cls(crs)

    def __str__(self):
        return self.crs.to_wkt(WktVersion.WKT2_2019, pretty=True)
    
    def to_wkt2_file(self, path: str):
        text = self.crs.to_wkt(WktVersion.WKT2_2019, pretty=True)
        write_text_to_file(text, path)
    
    def to_esri_wkt_file(self, path: str):
        text = self.crs.to_wkt(WktVersion.WKT1_ESRI, pretty=True)
        write_text_to_file(text, path)

    def to_proj4_file(self, path: str):
        text = self.crs.to_proj4()
        write_text_to_file(text, path)
    
    def to_proj4_string(self) -> str:
        return self.crs.to_proj4()
    
    def to_wkt2_string(self) -> str:
        return self.crs.to_wkt(WktVersion.WKT2_2019, pretty=True)

    def to_esri_wkt_string(self) -> str:
        return self.crs.to_wkt(WktVersion.WKT1_ESRI, pretty=True)

    def transform(self, direction: TransformDirection, points: np.ndarray) -> np.ndarray:
        if points.ndim == 1:
            xyz = self.transformer.transform(*points, direction=direction)
            return np.float64(xyz)
    
        if points.ndim == 2:
            xyz = points.T
            xyz = self.transformer.transform(*xyz, direction=direction)
            return np.float64(xyz).T
