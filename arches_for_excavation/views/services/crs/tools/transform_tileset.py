import json
from copy import deepcopy
from dataclasses import dataclass

import numpy as np
import pyproj
from numpy.typing import NDArray
from pyproj.enums import TransformDirection

from ..local_mercator.oblique_mercator import ObliqueMercator

UNIT_X = np.asarray([1., 0., 0.])
UNIT_Y = np.asarray([0., 1., 0.])
WGS_TO_ECEF = pyproj.Transformer.from_crs(4326, 4978, always_xy=True)


@dataclass
class TransformTilesetArguments:
    wkt2_path: str
    input_tileset_path: str
    output_tileset_path: str

    @classmethod
    def parse_commandline_arguments(cls) -> "TransformTilesetArguments":
        import argparse
        parser = argparse.ArgumentParser()
        parser.add_argument("wkt2_path", help="Path to WKT-2 definition file")
        parser.add_argument("input_tileset_path", help="Path to input tileset.json")
        parser.add_argument("output_tileset_path", help="Path to output tileset.json")
        args = parser.parse_args()

        return cls(
            args.wkt2_path,
            args.input_tileset_path,
            args.output_tileset_path
        )


def load_json_file(path: str) -> dict:
    with open(path, 'r') as file:
        return json.load(file)


def write_json_file(dictionary: dict, path: str):
    with open(path, 'w') as file:
        return json.dump(dictionary, file)


def mulp(matrix: NDArray, point: NDArray) -> NDArray:
    t = matrix @ np.hstack([point, 1])
    return t[:-1] / t[-1]


def mercator_to_ecef(mercator: ObliqueMercator, point: NDArray) -> NDArray:
    wgs = mercator.transform(TransformDirection.INVERSE, point)
    return np.asarray(WGS_TO_ECEF.transform(*wgs))


def estimate_transformation_matrix(mercator: ObliqueMercator, origin: NDArray) -> NDArray:
    origin_in_ecef = mercator_to_ecef(mercator, origin)
    unit_x_in_ecef = origin_in_ecef - mercator_to_ecef(mercator, origin + UNIT_X)
    unit_y_in_ecef = origin_in_ecef - mercator_to_ecef(mercator, origin + UNIT_Y)
    unit_z_in_ecef = np.cross(unit_x_in_ecef, unit_y_in_ecef)

    t1 = np.identity(4)
    t1[:3, 3] = -origin

    t2 = np.identity(4)
    t2[:3, :3] = np.column_stack([unit_x_in_ecef, unit_y_in_ecef, unit_z_in_ecef])
    t2[:3, 3] = origin_in_ecef
    return t2 @ t1

def extract_matrix_from_tileset(tileset: dict) -> dict:
    matrix = tileset["root"]["transform"]
    matrix = np.asarray(matrix).reshape((4, 4)).T
    return matrix

def extract_center_from_tileset(tileset: dict) -> dict:
    center = tileset["root"]["content"]["boundingVolume"]["box"][:3]
    center = np.asarray(center)
    return center

def transform_matrix(matrix: NDArray, transformation: NDArray) -> NDArray:
    new_matrix = transformation @ matrix
    return new_matrix.T.flatten()

def main():
    arguments = TransformTilesetArguments.parse_commandline_arguments()
    mercator = ObliqueMercator.from_wkt2_file(arguments.wkt2_path)

    tileset = load_json_file(arguments.input_tileset_path)

    matrix = extract_matrix_from_tileset(tileset)

    center = extract_center_from_tileset(tileset)
    center = mulp(matrix, center)

    transformation = estimate_transformation_matrix(mercator, center)

    new_matrix = transform_matrix(matrix, transformation)

    new_tileset = deepcopy(tileset)
    new_tileset["root"]["transform"] = new_matrix.tolist()

    write_json_file(new_tileset, arguments.output_tileset_path)

if __name__ == '__main__':
    main()
