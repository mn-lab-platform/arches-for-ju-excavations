import pyproj

GRS80 = pyproj.Geod(ellps="GRS80")
WGS84 = pyproj.Geod(ellps="WGS84")