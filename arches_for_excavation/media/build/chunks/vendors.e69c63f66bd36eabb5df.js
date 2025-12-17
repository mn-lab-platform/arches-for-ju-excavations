(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[15287],{

/***/ 15287:
/*!***************************************************!*\
  !*** ./node_modules/leaflet-iiif/leaflet-iiif.js ***!
  \***************************************************/
/***/ (() => {

/*
 * Leaflet-IIIF 3.0.0
 * IIIF Viewer for Leaflet
 * by Jack Reed, @mejackreed
 */

L.TileLayer.Iiif = L.TileLayer.extend({
  options: {
    continuousWorld: true,
    tileSize: 256,
    updateWhenIdle: true,
    tileFormat: 'jpg',
    fitBounds: true,
    setMaxBounds: false
  },

  initialize: function(url, options) {
    options = typeof options !== 'undefined' ? options : {};

    if (options.maxZoom) {
      this._customMaxZoom = true;
    }

    // Check for explicit tileSize set
    if (options.tileSize) {
      this._explicitTileSize = true;
    }

    // Check for an explicit quality
    if (options.quality) {
      this._explicitQuality = true;
    }

    options = L.setOptions(this, options);
    this._infoPromise = null;
    this._infoUrl = url;
    this._baseUrl = this._templateUrl();
    this._getInfo();
  },
  getTileUrl: function(coords) {
    var _this = this,
      x = coords.x,
      y = (coords.y),
      zoom = _this._getZoomForUrl(),
      scale = Math.pow(2, _this.maxNativeZoom - zoom),
      tileBaseSize = _this.options.tileSize * scale,
      minx = (x * tileBaseSize),
      miny = (y * tileBaseSize),
      maxx = Math.min(minx + tileBaseSize, _this.x),
      maxy = Math.min(miny + tileBaseSize, _this.y);
    
    var xDiff = (maxx - minx);
    var yDiff = (maxy - miny);

    // Canonical URI Syntax for v2
    var size = Math.ceil(xDiff / scale) + ',';
    if (_this.type === 'ImageService3') {
      // Cannonical URI Syntax for v3
      size = size + Math.ceil(yDiff / scale);
    }

    return L.Util.template(this._baseUrl, L.extend({
      format: _this.options.tileFormat,
      quality: _this.quality,
      region: [minx, miny, xDiff, yDiff].join(','),
      rotation: 0,
      size: size
    }, this.options));
  },
  onAdd: function(map) {
    var _this = this;

    // Wait for info.json fetch and parse to complete
    Promise.all([_this._infoPromise]).then(function() {
      // Store unmutated imageSizes
      _this._imageSizesOriginal = _this._imageSizes.slice(0); 

      // Set maxZoom for map
      map._layersMaxZoom = _this.maxZoom;

      // Call add TileLayer
      L.TileLayer.prototype.onAdd.call(_this, map);

      // Set minZoom and minNativeZoom based on how the imageSizes match up
      var smallestImage = _this._imageSizes[0];
      var mapSize = _this._map.getSize();
      var newMinZoom = 0;
      // Loop back through 5 times to see if a better fit can be found.
      for (var i = 1; i <= 5; i++) {
        if (smallestImage.x > mapSize.x || smallestImage.y > mapSize.y) {
          smallestImage = smallestImage.divideBy(2);
          _this._imageSizes.unshift(smallestImage);
          newMinZoom = -i;
        } else {
          break;
        }
      }
      _this.options.minZoom = newMinZoom;
      _this.options.minNativeZoom = newMinZoom;
      _this._prev_map_layersMinZoom = _this._map._layersMinZoom;
      _this._map._layersMinZoom = newMinZoom;

      if (_this.options.fitBounds) {
        _this._fitBounds();
      }

      if(_this.options.setMaxBounds) {
        _this._setMaxBounds();
      }

      // Reset tile sizes to handle non 256x256 IIIF tiles
      _this.on('tileload', function(tile, url) {

        var height = tile.tile.naturalHeight,
          width = tile.tile.naturalWidth;

        // No need to resize if tile is 256 x 256
        if (height === 256 && width === 256) return;

        tile.tile.style.width = width + 'px';
        tile.tile.style.height = height + 'px';

      });
    })
    .catch(function(err){
        console.error(err);
    });
  },
  onRemove: function(map) {
    var _this = this;
    
    map._layersMinZoom = _this._prev_map_layersMinZoom;
    _this._imageSizes = _this._imageSizesOriginal;

    // Remove maxBounds set for this image
    if(_this.options.setMaxBounds) {
      map.setMaxBounds(null);
    }

    // Call remove TileLayer
    L.TileLayer.prototype.onRemove.call(_this, map);

  },
  _fitBounds: function() {
    var _this = this;

    // Find best zoom level and center map
    var initialZoom = _this._getInitialZoom(_this._map.getSize());
    var offset = _this._imageSizes.length - 1 - _this.options.maxNativeZoom;
    var imageSize = _this._imageSizes[initialZoom + offset];
    var sw = _this._map.options.crs.pointToLatLng(L.point(0, imageSize.y), initialZoom);
    var ne = _this._map.options.crs.pointToLatLng(L.point(imageSize.x, 0), initialZoom);
    var bounds = L.latLngBounds(sw, ne);

    _this._map.fitBounds(bounds, true);
  },
  _setMaxBounds: function() {
    var _this = this;

    // Find best zoom level, center map, and constrain viewer
    var initialZoom = _this._getInitialZoom(_this._map.getSize());
    var imageSize = _this._imageSizes[initialZoom];
    var sw = _this._map.options.crs.pointToLatLng(L.point(0, imageSize.y), initialZoom);
    var ne = _this._map.options.crs.pointToLatLng(L.point(imageSize.x, 0), initialZoom);
    var bounds = L.latLngBounds(sw, ne);

    _this._map.setMaxBounds(bounds, true);
  },
  _getInfo: function() {
    var _this = this;

    _this._infoPromise = fetch(_this._infoUrl)
      .then(function(response) {
        return response.json();
      })
      .catch(function(err){
          console.error(err);
      })
      .then(function(data) {
        _this.y = data.height;
        _this.x = data.width;

        var tierSizes = [],
          imageSizes = [],
          scale,
          width_,
          height_,
          tilesX_,
          tilesY_;

        // Set quality based off of IIIF version
        if (data.profile instanceof Array) {
          _this.profile = data.profile[0];
        }else {
          _this.profile = data.profile;
        }
        _this.type = data.type;

        _this._setQuality();

        // Unless an explicit tileSize is set, use a preferred tileSize
        if (!_this._explicitTileSize) {
          // Set the default first
          _this.options.tileSize = 256;
          if (data.tiles) {
            // Image API 2.0 Case
            _this.options.tileSize = data.tiles[0].width;
          } else if (data.tile_width){
            // Image API 1.1 Case
            _this.options.tileSize = data.tile_width;
          }
        }

        function ceilLog2(x) {
          return Math.ceil(Math.log(x) / Math.LN2);
        };

        // Calculates maximum native zoom for the layer
        _this.maxNativeZoom = Math.max(
          ceilLog2(_this.x / _this.options.tileSize),
          ceilLog2(_this.y / _this.options.tileSize),
          0
        );
        _this.options.maxNativeZoom = _this.maxNativeZoom;
        
        // Enable zooming further than native if maxZoom option supplied
        if (_this._customMaxZoom && _this.options.maxZoom > _this.maxNativeZoom) {
          _this.maxZoom = _this.options.maxZoom;
        }
        else {
          _this.maxZoom = _this.maxNativeZoom;
        }
        
        for (var i = 0; i <= _this.maxZoom; i++) {
          scale = Math.pow(2, _this.maxNativeZoom - i);
          width_ = Math.ceil(_this.x / scale);
          height_ = Math.ceil(_this.y / scale);
          tilesX_ = Math.ceil(width_ / _this.options.tileSize);
          tilesY_ = Math.ceil(height_ / _this.options.tileSize);
          tierSizes.push([tilesX_, tilesY_]);
          imageSizes.push(L.point(width_,height_));
        }

        _this._tierSizes = tierSizes;
        _this._imageSizes = imageSizes;
      })
      .catch(function(err){
          console.error(err);
      });
      
  },

  _setQuality: function() {
    var _this = this;
    var profileToCheck = _this.profile;

    if (_this._explicitQuality) {
      return;
    }

    // If profile is an object
    if (typeof(profileToCheck) === 'object') {
      profileToCheck = profileToCheck['@id'];
    }

    // Set the quality based on the IIIF compliance level
    switch (true) {
      case /^http:\/\/library.stanford.edu\/iiif\/image-api\/1.1\/compliance.html.*$/.test(profileToCheck):
        _this.options.quality = 'native';
        break;
      // Assume later profiles and set to default
      default:
        _this.options.quality = 'default';
        break;
    }
  },

  _infoToBaseUrl: function() {
    return this._infoUrl.replace('info.json', '');
  },
  _templateUrl: function() {
    return this._infoToBaseUrl() + '{region}/{size}/{rotation}/{quality}.{format}';
  },
  _isValidTile: function(coords) {
    var _this = this;
    var zoom = _this._getZoomForUrl();
    var sizes = _this._tierSizes[zoom];
    var x = coords.x;
    var y = coords.y;
    if (zoom < 0 && x >= 0 && y >= 0) {
      return true;
    }

    if (!sizes) return false;
    if (x < 0 || sizes[0] <= x || y < 0 || sizes[1] <= y) {
      return false;
    }else {
      return true;
    }
  },
  _tileShouldBeLoaded: function(coords) {
    return this._isValidTile(coords);
  },
  _getInitialZoom: function (mapSize) {
    var _this = this;
    var tolerance = 0.8;
    var imageSize;
    // Calculate an offset between the zoom levels and the array accessors
    var offset = _this._imageSizes.length - 1 - _this.options.maxNativeZoom;
    for (var i = _this._imageSizes.length - 1; i >= 0; i--) {
      imageSize = _this._imageSizes[i];
      if (imageSize.x * tolerance < mapSize.x && imageSize.y * tolerance < mapSize.y) {
        return i - offset;
      }
    }
    // return a default zoom
    return 2;
  }
});

L.tileLayer.iiif = function(url, options) {
  return new L.TileLayer.Iiif(url, options);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuZTY5YzYzZjY2YmQzNmVhYmI1ZGYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHFDQUFxQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTztBQUNqRixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWlpaWYvbGVhZmxldC1paWlmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBMZWFmbGV0LUlJSUYgMy4wLjBcbiAqIElJSUYgVmlld2VyIGZvciBMZWFmbGV0XG4gKiBieSBKYWNrIFJlZWQsIEBtZWphY2tyZWVkXG4gKi9cblxuTC5UaWxlTGF5ZXIuSWlpZiA9IEwuVGlsZUxheWVyLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBjb250aW51b3VzV29ybGQ6IHRydWUsXG4gICAgdGlsZVNpemU6IDI1NixcbiAgICB1cGRhdGVXaGVuSWRsZTogdHJ1ZSxcbiAgICB0aWxlRm9ybWF0OiAnanBnJyxcbiAgICBmaXRCb3VuZHM6IHRydWUsXG4gICAgc2V0TWF4Qm91bmRzOiBmYWxzZVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKHVybCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5tYXhab29tKSB7XG4gICAgICB0aGlzLl9jdXN0b21NYXhab29tID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZXhwbGljaXQgdGlsZVNpemUgc2V0XG4gICAgaWYgKG9wdGlvbnMudGlsZVNpemUpIHtcbiAgICAgIHRoaXMuX2V4cGxpY2l0VGlsZVNpemUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBhbiBleHBsaWNpdCBxdWFsaXR5XG4gICAgaWYgKG9wdGlvbnMucXVhbGl0eSkge1xuICAgICAgdGhpcy5fZXhwbGljaXRRdWFsaXR5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2luZm9Qcm9taXNlID0gbnVsbDtcbiAgICB0aGlzLl9pbmZvVXJsID0gdXJsO1xuICAgIHRoaXMuX2Jhc2VVcmwgPSB0aGlzLl90ZW1wbGF0ZVVybCgpO1xuICAgIHRoaXMuX2dldEluZm8oKTtcbiAgfSxcbiAgZ2V0VGlsZVVybDogZnVuY3Rpb24oY29vcmRzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgIHggPSBjb29yZHMueCxcbiAgICAgIHkgPSAoY29vcmRzLnkpLFxuICAgICAgem9vbSA9IF90aGlzLl9nZXRab29tRm9yVXJsKCksXG4gICAgICBzY2FsZSA9IE1hdGgucG93KDIsIF90aGlzLm1heE5hdGl2ZVpvb20gLSB6b29tKSxcbiAgICAgIHRpbGVCYXNlU2l6ZSA9IF90aGlzLm9wdGlvbnMudGlsZVNpemUgKiBzY2FsZSxcbiAgICAgIG1pbnggPSAoeCAqIHRpbGVCYXNlU2l6ZSksXG4gICAgICBtaW55ID0gKHkgKiB0aWxlQmFzZVNpemUpLFxuICAgICAgbWF4eCA9IE1hdGgubWluKG1pbnggKyB0aWxlQmFzZVNpemUsIF90aGlzLngpLFxuICAgICAgbWF4eSA9IE1hdGgubWluKG1pbnkgKyB0aWxlQmFzZVNpemUsIF90aGlzLnkpO1xuICAgIFxuICAgIHZhciB4RGlmZiA9IChtYXh4IC0gbWlueCk7XG4gICAgdmFyIHlEaWZmID0gKG1heHkgLSBtaW55KTtcblxuICAgIC8vIENhbm9uaWNhbCBVUkkgU3ludGF4IGZvciB2MlxuICAgIHZhciBzaXplID0gTWF0aC5jZWlsKHhEaWZmIC8gc2NhbGUpICsgJywnO1xuICAgIGlmIChfdGhpcy50eXBlID09PSAnSW1hZ2VTZXJ2aWNlMycpIHtcbiAgICAgIC8vIENhbm5vbmljYWwgVVJJIFN5bnRheCBmb3IgdjNcbiAgICAgIHNpemUgPSBzaXplICsgTWF0aC5jZWlsKHlEaWZmIC8gc2NhbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBMLlV0aWwudGVtcGxhdGUodGhpcy5fYmFzZVVybCwgTC5leHRlbmQoe1xuICAgICAgZm9ybWF0OiBfdGhpcy5vcHRpb25zLnRpbGVGb3JtYXQsXG4gICAgICBxdWFsaXR5OiBfdGhpcy5xdWFsaXR5LFxuICAgICAgcmVnaW9uOiBbbWlueCwgbWlueSwgeERpZmYsIHlEaWZmXS5qb2luKCcsJyksXG4gICAgICByb3RhdGlvbjogMCxcbiAgICAgIHNpemU6IHNpemVcbiAgICB9LCB0aGlzLm9wdGlvbnMpKTtcbiAgfSxcbiAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBXYWl0IGZvciBpbmZvLmpzb24gZmV0Y2ggYW5kIHBhcnNlIHRvIGNvbXBsZXRlXG4gICAgUHJvbWlzZS5hbGwoW190aGlzLl9pbmZvUHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAvLyBTdG9yZSB1bm11dGF0ZWQgaW1hZ2VTaXplc1xuICAgICAgX3RoaXMuX2ltYWdlU2l6ZXNPcmlnaW5hbCA9IF90aGlzLl9pbWFnZVNpemVzLnNsaWNlKDApOyBcblxuICAgICAgLy8gU2V0IG1heFpvb20gZm9yIG1hcFxuICAgICAgbWFwLl9sYXllcnNNYXhab29tID0gX3RoaXMubWF4Wm9vbTtcblxuICAgICAgLy8gQ2FsbCBhZGQgVGlsZUxheWVyXG4gICAgICBMLlRpbGVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbChfdGhpcywgbWFwKTtcblxuICAgICAgLy8gU2V0IG1pblpvb20gYW5kIG1pbk5hdGl2ZVpvb20gYmFzZWQgb24gaG93IHRoZSBpbWFnZVNpemVzIG1hdGNoIHVwXG4gICAgICB2YXIgc21hbGxlc3RJbWFnZSA9IF90aGlzLl9pbWFnZVNpemVzWzBdO1xuICAgICAgdmFyIG1hcFNpemUgPSBfdGhpcy5fbWFwLmdldFNpemUoKTtcbiAgICAgIHZhciBuZXdNaW5ab29tID0gMDtcbiAgICAgIC8vIExvb3AgYmFjayB0aHJvdWdoIDUgdGltZXMgdG8gc2VlIGlmIGEgYmV0dGVyIGZpdCBjYW4gYmUgZm91bmQuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgaWYgKHNtYWxsZXN0SW1hZ2UueCA+IG1hcFNpemUueCB8fCBzbWFsbGVzdEltYWdlLnkgPiBtYXBTaXplLnkpIHtcbiAgICAgICAgICBzbWFsbGVzdEltYWdlID0gc21hbGxlc3RJbWFnZS5kaXZpZGVCeSgyKTtcbiAgICAgICAgICBfdGhpcy5faW1hZ2VTaXplcy51bnNoaWZ0KHNtYWxsZXN0SW1hZ2UpO1xuICAgICAgICAgIG5ld01pblpvb20gPSAtaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX3RoaXMub3B0aW9ucy5taW5ab29tID0gbmV3TWluWm9vbTtcbiAgICAgIF90aGlzLm9wdGlvbnMubWluTmF0aXZlWm9vbSA9IG5ld01pblpvb207XG4gICAgICBfdGhpcy5fcHJldl9tYXBfbGF5ZXJzTWluWm9vbSA9IF90aGlzLl9tYXAuX2xheWVyc01pblpvb207XG4gICAgICBfdGhpcy5fbWFwLl9sYXllcnNNaW5ab29tID0gbmV3TWluWm9vbTtcblxuICAgICAgaWYgKF90aGlzLm9wdGlvbnMuZml0Qm91bmRzKSB7XG4gICAgICAgIF90aGlzLl9maXRCb3VuZHMoKTtcbiAgICAgIH1cblxuICAgICAgaWYoX3RoaXMub3B0aW9ucy5zZXRNYXhCb3VuZHMpIHtcbiAgICAgICAgX3RoaXMuX3NldE1heEJvdW5kcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNldCB0aWxlIHNpemVzIHRvIGhhbmRsZSBub24gMjU2eDI1NiBJSUlGIHRpbGVzXG4gICAgICBfdGhpcy5vbigndGlsZWxvYWQnLCBmdW5jdGlvbih0aWxlLCB1cmwpIHtcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGlsZS50aWxlLm5hdHVyYWxIZWlnaHQsXG4gICAgICAgICAgd2lkdGggPSB0aWxlLnRpbGUubmF0dXJhbFdpZHRoO1xuXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gcmVzaXplIGlmIHRpbGUgaXMgMjU2IHggMjU2XG4gICAgICAgIGlmIChoZWlnaHQgPT09IDI1NiAmJiB3aWR0aCA9PT0gMjU2KSByZXR1cm47XG5cbiAgICAgICAgdGlsZS50aWxlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICB0aWxlLnRpbGUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9LFxuICBvblJlbW92ZTogZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBcbiAgICBtYXAuX2xheWVyc01pblpvb20gPSBfdGhpcy5fcHJldl9tYXBfbGF5ZXJzTWluWm9vbTtcbiAgICBfdGhpcy5faW1hZ2VTaXplcyA9IF90aGlzLl9pbWFnZVNpemVzT3JpZ2luYWw7XG5cbiAgICAvLyBSZW1vdmUgbWF4Qm91bmRzIHNldCBmb3IgdGhpcyBpbWFnZVxuICAgIGlmKF90aGlzLm9wdGlvbnMuc2V0TWF4Qm91bmRzKSB7XG4gICAgICBtYXAuc2V0TWF4Qm91bmRzKG51bGwpO1xuICAgIH1cblxuICAgIC8vIENhbGwgcmVtb3ZlIFRpbGVMYXllclxuICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5vblJlbW92ZS5jYWxsKF90aGlzLCBtYXApO1xuXG4gIH0sXG4gIF9maXRCb3VuZHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBGaW5kIGJlc3Qgem9vbSBsZXZlbCBhbmQgY2VudGVyIG1hcFxuICAgIHZhciBpbml0aWFsWm9vbSA9IF90aGlzLl9nZXRJbml0aWFsWm9vbShfdGhpcy5fbWFwLmdldFNpemUoKSk7XG4gICAgdmFyIG9mZnNldCA9IF90aGlzLl9pbWFnZVNpemVzLmxlbmd0aCAtIDEgLSBfdGhpcy5vcHRpb25zLm1heE5hdGl2ZVpvb207XG4gICAgdmFyIGltYWdlU2l6ZSA9IF90aGlzLl9pbWFnZVNpemVzW2luaXRpYWxab29tICsgb2Zmc2V0XTtcbiAgICB2YXIgc3cgPSBfdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnBvaW50VG9MYXRMbmcoTC5wb2ludCgwLCBpbWFnZVNpemUueSksIGluaXRpYWxab29tKTtcbiAgICB2YXIgbmUgPSBfdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnBvaW50VG9MYXRMbmcoTC5wb2ludChpbWFnZVNpemUueCwgMCksIGluaXRpYWxab29tKTtcbiAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoc3csIG5lKTtcblxuICAgIF90aGlzLl9tYXAuZml0Qm91bmRzKGJvdW5kcywgdHJ1ZSk7XG4gIH0sXG4gIF9zZXRNYXhCb3VuZHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBGaW5kIGJlc3Qgem9vbSBsZXZlbCwgY2VudGVyIG1hcCwgYW5kIGNvbnN0cmFpbiB2aWV3ZXJcbiAgICB2YXIgaW5pdGlhbFpvb20gPSBfdGhpcy5fZ2V0SW5pdGlhbFpvb20oX3RoaXMuX21hcC5nZXRTaXplKCkpO1xuICAgIHZhciBpbWFnZVNpemUgPSBfdGhpcy5faW1hZ2VTaXplc1tpbml0aWFsWm9vbV07XG4gICAgdmFyIHN3ID0gX3RoaXMuX21hcC5vcHRpb25zLmNycy5wb2ludFRvTGF0TG5nKEwucG9pbnQoMCwgaW1hZ2VTaXplLnkpLCBpbml0aWFsWm9vbSk7XG4gICAgdmFyIG5lID0gX3RoaXMuX21hcC5vcHRpb25zLmNycy5wb2ludFRvTGF0TG5nKEwucG9pbnQoaW1hZ2VTaXplLngsIDApLCBpbml0aWFsWm9vbSk7XG4gICAgdmFyIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKHN3LCBuZSk7XG5cbiAgICBfdGhpcy5fbWFwLnNldE1heEJvdW5kcyhib3VuZHMsIHRydWUpO1xuICB9LFxuICBfZ2V0SW5mbzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF90aGlzLl9pbmZvUHJvbWlzZSA9IGZldGNoKF90aGlzLl9pbmZvVXJsKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBfdGhpcy55ID0gZGF0YS5oZWlnaHQ7XG4gICAgICAgIF90aGlzLnggPSBkYXRhLndpZHRoO1xuXG4gICAgICAgIHZhciB0aWVyU2l6ZXMgPSBbXSxcbiAgICAgICAgICBpbWFnZVNpemVzID0gW10sXG4gICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgd2lkdGhfLFxuICAgICAgICAgIGhlaWdodF8sXG4gICAgICAgICAgdGlsZXNYXyxcbiAgICAgICAgICB0aWxlc1lfO1xuXG4gICAgICAgIC8vIFNldCBxdWFsaXR5IGJhc2VkIG9mZiBvZiBJSUlGIHZlcnNpb25cbiAgICAgICAgaWYgKGRhdGEucHJvZmlsZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgX3RoaXMucHJvZmlsZSA9IGRhdGEucHJvZmlsZVswXTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgIF90aGlzLnByb2ZpbGUgPSBkYXRhLnByb2ZpbGU7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMudHlwZSA9IGRhdGEudHlwZTtcblxuICAgICAgICBfdGhpcy5fc2V0UXVhbGl0eSgpO1xuXG4gICAgICAgIC8vIFVubGVzcyBhbiBleHBsaWNpdCB0aWxlU2l6ZSBpcyBzZXQsIHVzZSBhIHByZWZlcnJlZCB0aWxlU2l6ZVxuICAgICAgICBpZiAoIV90aGlzLl9leHBsaWNpdFRpbGVTaXplKSB7XG4gICAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IGZpcnN0XG4gICAgICAgICAgX3RoaXMub3B0aW9ucy50aWxlU2l6ZSA9IDI1NjtcbiAgICAgICAgICBpZiAoZGF0YS50aWxlcykge1xuICAgICAgICAgICAgLy8gSW1hZ2UgQVBJIDIuMCBDYXNlXG4gICAgICAgICAgICBfdGhpcy5vcHRpb25zLnRpbGVTaXplID0gZGF0YS50aWxlc1swXS53aWR0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEudGlsZV93aWR0aCl7XG4gICAgICAgICAgICAvLyBJbWFnZSBBUEkgMS4xIENhc2VcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMudGlsZVNpemUgPSBkYXRhLnRpbGVfd2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2VpbExvZzIoeCkge1xuICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoTWF0aC5sb2coeCkgLyBNYXRoLkxOMik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlcyBtYXhpbXVtIG5hdGl2ZSB6b29tIGZvciB0aGUgbGF5ZXJcbiAgICAgICAgX3RoaXMubWF4TmF0aXZlWm9vbSA9IE1hdGgubWF4KFxuICAgICAgICAgIGNlaWxMb2cyKF90aGlzLnggLyBfdGhpcy5vcHRpb25zLnRpbGVTaXplKSxcbiAgICAgICAgICBjZWlsTG9nMihfdGhpcy55IC8gX3RoaXMub3B0aW9ucy50aWxlU2l6ZSksXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgICBfdGhpcy5vcHRpb25zLm1heE5hdGl2ZVpvb20gPSBfdGhpcy5tYXhOYXRpdmVab29tO1xuICAgICAgICBcbiAgICAgICAgLy8gRW5hYmxlIHpvb21pbmcgZnVydGhlciB0aGFuIG5hdGl2ZSBpZiBtYXhab29tIG9wdGlvbiBzdXBwbGllZFxuICAgICAgICBpZiAoX3RoaXMuX2N1c3RvbU1heFpvb20gJiYgX3RoaXMub3B0aW9ucy5tYXhab29tID4gX3RoaXMubWF4TmF0aXZlWm9vbSkge1xuICAgICAgICAgIF90aGlzLm1heFpvb20gPSBfdGhpcy5vcHRpb25zLm1heFpvb207XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgX3RoaXMubWF4Wm9vbSA9IF90aGlzLm1heE5hdGl2ZVpvb207XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IF90aGlzLm1heFpvb207IGkrKykge1xuICAgICAgICAgIHNjYWxlID0gTWF0aC5wb3coMiwgX3RoaXMubWF4TmF0aXZlWm9vbSAtIGkpO1xuICAgICAgICAgIHdpZHRoXyA9IE1hdGguY2VpbChfdGhpcy54IC8gc2NhbGUpO1xuICAgICAgICAgIGhlaWdodF8gPSBNYXRoLmNlaWwoX3RoaXMueSAvIHNjYWxlKTtcbiAgICAgICAgICB0aWxlc1hfID0gTWF0aC5jZWlsKHdpZHRoXyAvIF90aGlzLm9wdGlvbnMudGlsZVNpemUpO1xuICAgICAgICAgIHRpbGVzWV8gPSBNYXRoLmNlaWwoaGVpZ2h0XyAvIF90aGlzLm9wdGlvbnMudGlsZVNpemUpO1xuICAgICAgICAgIHRpZXJTaXplcy5wdXNoKFt0aWxlc1hfLCB0aWxlc1lfXSk7XG4gICAgICAgICAgaW1hZ2VTaXplcy5wdXNoKEwucG9pbnQod2lkdGhfLGhlaWdodF8pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLl90aWVyU2l6ZXMgPSB0aWVyU2l6ZXM7XG4gICAgICAgIF90aGlzLl9pbWFnZVNpemVzID0gaW1hZ2VTaXplcztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KTtcbiAgICAgIFxuICB9LFxuXG4gIF9zZXRRdWFsaXR5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBwcm9maWxlVG9DaGVjayA9IF90aGlzLnByb2ZpbGU7XG5cbiAgICBpZiAoX3RoaXMuX2V4cGxpY2l0UXVhbGl0eSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHByb2ZpbGUgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZihwcm9maWxlVG9DaGVjaykgPT09ICdvYmplY3QnKSB7XG4gICAgICBwcm9maWxlVG9DaGVjayA9IHByb2ZpbGVUb0NoZWNrWydAaWQnXTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIHF1YWxpdHkgYmFzZWQgb24gdGhlIElJSUYgY29tcGxpYW5jZSBsZXZlbFxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSAvXmh0dHA6XFwvXFwvbGlicmFyeS5zdGFuZm9yZC5lZHVcXC9paWlmXFwvaW1hZ2UtYXBpXFwvMS4xXFwvY29tcGxpYW5jZS5odG1sLiokLy50ZXN0KHByb2ZpbGVUb0NoZWNrKTpcbiAgICAgICAgX3RoaXMub3B0aW9ucy5xdWFsaXR5ID0gJ25hdGl2ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gQXNzdW1lIGxhdGVyIHByb2ZpbGVzIGFuZCBzZXQgdG8gZGVmYXVsdFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgX3RoaXMub3B0aW9ucy5xdWFsaXR5ID0gJ2RlZmF1bHQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgX2luZm9Ub0Jhc2VVcmw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmZvVXJsLnJlcGxhY2UoJ2luZm8uanNvbicsICcnKTtcbiAgfSxcbiAgX3RlbXBsYXRlVXJsOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5mb1RvQmFzZVVybCgpICsgJ3tyZWdpb259L3tzaXplfS97cm90YXRpb259L3txdWFsaXR5fS57Zm9ybWF0fSc7XG4gIH0sXG4gIF9pc1ZhbGlkVGlsZTogZnVuY3Rpb24oY29vcmRzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgem9vbSA9IF90aGlzLl9nZXRab29tRm9yVXJsKCk7XG4gICAgdmFyIHNpemVzID0gX3RoaXMuX3RpZXJTaXplc1t6b29tXTtcbiAgICB2YXIgeCA9IGNvb3Jkcy54O1xuICAgIHZhciB5ID0gY29vcmRzLnk7XG4gICAgaWYgKHpvb20gPCAwICYmIHggPj0gMCAmJiB5ID49IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghc2l6ZXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoeCA8IDAgfHwgc2l6ZXNbMF0gPD0geCB8fCB5IDwgMCB8fCBzaXplc1sxXSA8PSB5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfWVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LFxuICBfdGlsZVNob3VsZEJlTG9hZGVkOiBmdW5jdGlvbihjb29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy5faXNWYWxpZFRpbGUoY29vcmRzKTtcbiAgfSxcbiAgX2dldEluaXRpYWxab29tOiBmdW5jdGlvbiAobWFwU2l6ZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIHRvbGVyYW5jZSA9IDAuODtcbiAgICB2YXIgaW1hZ2VTaXplO1xuICAgIC8vIENhbGN1bGF0ZSBhbiBvZmZzZXQgYmV0d2VlbiB0aGUgem9vbSBsZXZlbHMgYW5kIHRoZSBhcnJheSBhY2Nlc3NvcnNcbiAgICB2YXIgb2Zmc2V0ID0gX3RoaXMuX2ltYWdlU2l6ZXMubGVuZ3RoIC0gMSAtIF90aGlzLm9wdGlvbnMubWF4TmF0aXZlWm9vbTtcbiAgICBmb3IgKHZhciBpID0gX3RoaXMuX2ltYWdlU2l6ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGltYWdlU2l6ZSA9IF90aGlzLl9pbWFnZVNpemVzW2ldO1xuICAgICAgaWYgKGltYWdlU2l6ZS54ICogdG9sZXJhbmNlIDwgbWFwU2l6ZS54ICYmIGltYWdlU2l6ZS55ICogdG9sZXJhbmNlIDwgbWFwU2l6ZS55KSB7XG4gICAgICAgIHJldHVybiBpIC0gb2Zmc2V0O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gYSBkZWZhdWx0IHpvb21cbiAgICByZXR1cm4gMjtcbiAgfVxufSk7XG5cbkwudGlsZUxheWVyLmlpaWYgPSBmdW5jdGlvbih1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBMLlRpbGVMYXllci5JaWlmKHVybCwgb3B0aW9ucyk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9