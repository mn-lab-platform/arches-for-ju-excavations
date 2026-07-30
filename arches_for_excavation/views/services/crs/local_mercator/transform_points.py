from dataclasses import dataclass

import numpy as np
from pyproj.enums import TransformDirection
from typing import List

from .oblique_mercator import ObliqueMercator


@dataclass
class TransformPointsArguments:
    wkt2_path: str
    direction: TransformDirection
    points: np.ndarray

    @staticmethod
    def convert_string_to_numpy(lines: List[str]) -> np.ndarray:
        array = [x.split(",") for x in lines]
        return np.float64(array).reshape((-1, 2))
    
    @classmethod
    def parse_commandline_arguments(cls) -> "TransformPointsArguments":
        import argparse
        parser = argparse.ArgumentParser()
        parser.add_argument("wkt2_path", help="Path to WKT-2 definition file")
        parser.add_argument("direction", choices=["FORWARD", "INVERSE"], help="Wheter to perform transformation from local to global or the other way around")
        parser.add_argument("points", nargs="+", help="Multiple entries with coordinates of points in input frame as X,Y")
        args = parser.parse_args()

        return cls(
            args.wkt2_path,
            TransformDirection(args.direction),
            cls.convert_string_to_numpy(args.points)
        )
    
def main():
    arguments = TransformPointsArguments.parse_commandline_arguments()
    mercator = ObliqueMercator.from_wkt2_file(arguments.wkt2_path)
    transformed_points = mercator.transform(arguments.direction, arguments.points)

    for point in transformed_points:
        print(f"{point[0]:.3f},{point[1]:.3f}")

if __name__ == "__main__":
    main()