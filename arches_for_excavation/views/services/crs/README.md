# Definiowanie układów lokalnych

## Przykłady z poziomu linii komend
### Wyznaczanie odwzorowania z dwóch punktów
Help:
``` shell
python -m local_mercator.from_2_points
```

Wyznaczenie układu i wypisanie WKT-2 na ekran:
```shell
 python -m local_mercator.from_2_points --crs_name TAP 2000,1000 21.87923776,37.72474246 21.87977371,37.72483791
 ```

Wyznaczanie układu i zapis do wszystkich obsługiwanych formatów. Można podać tylko jeden.
```shell
 python -m local_mercator.from_2_points --crs_name TAP --output_path_wkt2 wkt2.prj --output_path_esri_wkt esri.prj --output_path_proj4 proj4.prj 2000,1000 21.87923776,37.72474246 21.87977371,37.72483791
 ```

### Transformacja punktów
Help:
``` shell
python -m local_mercator.transform_points
```

Transfromacja punktów z WGS do lokalnego:
``` shell
python -m local_mercator.transform_points wkt2.prj FORWARD 21.87923776,37.72474246 21.87992089,37.72467488
```

Transfromacja punktów z lokalnego do WGS:
``` shell
python -m local_mercator.transform_points wkt2.prj INVERSE 2000.0,1000.0
```

## Dodatkowe narzędzia
### Georeferencja tileset.json
``` shell
python tools/transform_tileset.py wkt2.prj export/model/tileset.json export/model/new_tileset.json
```

# Dokumentacja
Żeby rozumieć co się dzieje w środku odsyłam do [PDF](docs/pdf/docs.pdf)
