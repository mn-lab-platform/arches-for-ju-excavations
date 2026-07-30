from dataclasses import dataclass
from typing import Optional

import numpy as np

from .geoids import WGS84
from .oblique_mercator import ObliqueMercator


@dataclass
class From2PointsArguments:
    origin_point_local: np.ndarray
    origin_point_global: np.ndarray
    direction_point_global: np.ndarray
    crs_name: str = None

    output_path_wkt2: str = None
    output_path_esri_wkt: str = None
    output_path_proj4: str = None

    def has_any_output(self) -> bool:
        return any([self.output_path_wkt2, self.output_path_esri_wkt, self.output_path_proj4])

    @staticmethod
    def convert_string_to_numpy(text: str) -> np.ndarray:
        return np.float64(text.split(","))
    
    @classmethod
    def parse_commandline_arguments(cls) -> "From2PointsArguments":
        import argparse
        parser = argparse.ArgumentParser()
        parser.add_argument("origin_point_local", help="Coordinates of point used as origin of projection as <easting>,<northing>")
        parser.add_argument("origin_point_global", help="Coordinates of point used as origin of projection as <longitude>,<latitude>")
        parser.add_argument("direction_point_global", help="Coordinates of point used to calculate Y axis direction as <longitude>,<latitude>")
        parser.add_argument("--crs_name", help="Custom name for output coordinate system")
        parser.add_argument("--output_path_wkt2", help="Path to save projection in WKT-2 standard")
        parser.add_argument("--output_path_esri_wkt", help="Path to save projection in ESRI WKT standard")
        parser.add_argument("--output_path_proj4", help="Path to save projection in PROJ4 standard")
        args = parser.parse_args()

        return cls(
            cls.convert_string_to_numpy(args.origin_point_local),
            cls.convert_string_to_numpy(args.origin_point_global),
            cls.convert_string_to_numpy(args.direction_point_global),
            args.crs_name,
            args.output_path_wkt2, 
            args.output_path_esri_wkt,
            args.output_path_proj4
        )

def compute_azimuth_from_two_points(origin: np.ndarray, direction: np.ndarray) -> float:
    azimuth = WGS84.inv(origin[0], origin[1], direction[0], direction[1])[0]
    return azimuth

def estimate_local_mercator_2_points(origin_point_local: np.ndarray, origin_point_global: np.ndarray, 
                                     direction_point_global: np.ndarray, name: Optional[str]) -> ObliqueMercator:
    azimuth = compute_azimuth_from_two_points(origin_point_global, direction_point_global)
    oblique_mercator = ObliqueMercator.from_parameters(origin_point_global, origin_point_local, azimuth, name)
    return oblique_mercator

def main():
    arguments = From2PointsArguments.parse_commandline_arguments()
    mercator = estimate_local_mercator_2_points(
        arguments.origin_point_local,
        arguments.origin_point_global,
        arguments.direction_point_global,
        arguments.crs_name
    )

    if not arguments.has_any_output():
        print(mercator)
        exit(0)

    if arguments.output_path_wkt2 is not None:
        mercator.to_wkt2_file(arguments.output_path_wkt2)
        
    if arguments.output_path_esri_wkt is not None:
        mercator.to_esri_wkt_file(arguments.output_path_esri_wkt)
    
    if arguments.output_path_proj4 is not None:
        mercator.to_proj4_file(arguments.output_path_proj4)

if __name__ == "__main__":
    main()

    origin_point_local = np.float64([2000.0, 1000.0])
    origin_point_global = np.float64([21.87923776, 37.72474246])
    direction_point_global = np.float64([21.87977371, 37.72483791])

    estimate_local_mercator_2_points(origin_point_local, origin_point_global, direction_point_global,
                                     "TAP Local Oblique Mercator")

