(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[48441],{

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


/***/ }),

/***/ 16301:
/*!*************************************************************!*\
  !*** ./node_modules/select-woo/src/js/select2/data/base.js ***!
  \*************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
  __webpack_require__(/*! ../utils */ 43060)
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = '';

    if (container != null) {
      id += container.id;
    } else {
      id += Utils.generateChars(4);
    }

    id += '-result-';
    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 28027:
/*!**************************************************************!*\
  !*** ./node_modules/select-woo/src/js/select2/data/array.js ***!
  \**************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
  __webpack_require__(/*! ./select */ 87532),
  __webpack_require__(/*! ../utils */ 43060),
  __webpack_require__(/*! jquery */ 33270)
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 29401:
/*!***************************************************************!*\
  !*** ./node_modules/leaflet.fullscreen/Control.FullScreen.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! ./node_modules/jquery/dist/jquery.min */ 33270);
(function () {

L.Control.FullScreen = L.Control.extend({
	options: {
		position: 'topleft',
		title: 'Full Screen',
		titleCancel: 'Exit Full Screen',
		forceSeparateButton: false,
		forcePseudoFullscreen: false,
		fullscreenElement: false
	},
	
	onAdd: function (map) {
		var className = 'leaflet-control-zoom-fullscreen', container, content = '';
		
		if (map.zoomControl && !this.options.forceSeparateButton) {
			container = map.zoomControl._container;
		} else {
			container = L.DomUtil.create('div', 'leaflet-bar');
		}
		
		if (this.options.content) {
			content = this.options.content;
		} else {
			className += ' fullscreen-icon';
		}

		this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this);
		this._map.fullscreenControl = this;

		this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);

		return container;
	},
	
	onRemove: function (map) {
		L.DomEvent
			.off(this.link, 'click', L.DomEvent.stopPropagation)
			.off(this.link, 'click', L.DomEvent.preventDefault)
			.off(this.link, 'click', this.toggleFullScreen, this);
		
		L.DomEvent
			.off(this._container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.off(this._container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.off(this._container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this);
		
		L.DomEvent
			.off(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.off(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.off(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this);
	},
	
	_createButton: function (title, className, content, container, fn, context) {
		this.link = L.DomUtil.create('a', className, container);
		this.link.href = '#';
		this.link.title = title;
		this.link.innerHTML = content;

		this.link.setAttribute('role', 'button');
		this.link.setAttribute('aria-label', title);

		L.DomEvent
			.on(this.link, 'click', L.DomEvent.stopPropagation)
			.on(this.link, 'click', L.DomEvent.preventDefault)
			.on(this.link, 'click', fn, context);
		
		L.DomEvent
			.on(container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.on(container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.on(container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);
		
		L.DomEvent
			.on(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
			.on(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
			.on(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);

		return this.link;
	},
	
	toggleFullScreen: function () {
		var map = this._map;
		map._exitFired = false;
		if (map._isFullscreen) {
			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
				fullScreenApi.cancelFullScreen();
			} else {
				L.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
			}
			map.fire('exitFullscreen');
			map._exitFired = true;
			map._isFullscreen = false;
		}
		else {
			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
				fullScreenApi.requestFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
			} else {
				L.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
			}
			map.fire('enterFullscreen');
			map._isFullscreen = true;
		}
	},
	
	_toggleTitle: function () {
		this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
	},
	
	_handleFullscreenChange: function () {
		var map = this._map;
		map.invalidateSize();
		if (!fullScreenApi.isFullScreen() && !map._exitFired) {
			map.fire('exitFullscreen');
			map._exitFired = true;
			map._isFullscreen = false;
		}
	}
});

L.Map.include({
	toggleFullscreen: function () {
		this.fullscreenControl.toggleFullScreen();
	}
});

L.Map.addInitHook(function () {
	if (this.options.fullscreenControl) {
		this.addControl(L.control.fullscreen(this.options.fullscreenControlOptions));
	}
});

L.control.fullscreen = function (options) {
	return new L.Control.FullScreen(options);
};

/* 
Native FullScreen JavaScript API
-------------
Assumes Mozilla naming conventions instead of W3C for now

source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/

*/

	var 
		fullScreenApi = { 
			supportsFullScreen: false,
			isFullScreen: function () { return false; }, 
			requestFullScreen: function () {}, 
			cancelFullScreen: function () {},
			fullScreenEventName: '',
			prefix: ''
		},
		browserPrefixes = 'webkit moz o ms khtml'.split(' ');
	
	// check for native support
	if (typeof document.exitFullscreen !== 'undefined') {
		fullScreenApi.supportsFullScreen = true;
	} else {
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = browserPrefixes.length; i < il; i++) {
			fullScreenApi.prefix = browserPrefixes[i];
			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
		if (typeof document['msExitFullscreen'] !== 'undefined') {
			fullScreenApi.prefix = 'ms';
			fullScreenApi.supportsFullScreen = true;
		}
	}
	
	// update methods to do something useful
	if (fullScreenApi.supportsFullScreen) {
		if (fullScreenApi.prefix === 'ms') {
			fullScreenApi.fullScreenEventName = 'MSFullscreenChange';
		} else {
			fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
		}
		fullScreenApi.isFullScreen = function () {
			switch (this.prefix) {
				case '':
					return document.fullscreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				case 'ms':
					return document.msFullscreenElement;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		};
		fullScreenApi.requestFullScreen = function (el) {
			switch (this.prefix) {
				case '':
					return el.requestFullscreen();
				case 'ms':
					return el.msRequestFullscreen();
				default:
					return el[this.prefix + 'RequestFullScreen']();
			}
		};
		fullScreenApi.cancelFullScreen = function () {
			switch (this.prefix) {
				case '':
					return document.exitFullscreen();
				case 'ms':
					return document.msExitFullscreen();
				default:
					return document[this.prefix + 'CancelFullScreen']();
			}
		};
	}

	// jQuery plugin
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.requestFullScreen = function () {
			return this.each(function () {
				var el = jQuery(this);
				if (fullScreenApi.supportsFullScreen) {
					fullScreenApi.requestFullScreen(el);
				}
			});
		};
	}

	// export api
	window.fullScreenApi = fullScreenApi;
})();


/***/ }),

/***/ 43060:
/*!*********************************************************!*\
  !*** ./node_modules/select-woo/src/js/select2/utils.js ***!
  \*********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
  __webpack_require__(/*! jquery */ 33270)
], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
        var superMethod = superMethods[m];

        DecoratedClass.prototype[superMethod] =
          SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  // Determine whether the browser is on a touchscreen device.
  Utils.isTouchscreen = function() {
    if ('undefined' === typeof Utils._isTouchscreenCache) {
      Utils._isTouchscreenCache = 'ontouchstart' in document.documentElement;
    }
    return Utils._isTouchscreenCache;
  };

  return Utils;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 87532:
/*!***************************************************************!*\
  !*** ./node_modules/select-woo/src/js/select2/data/select.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
  __webpack_require__(/*! ./base */ 16301),
  __webpack_require__(/*! ../utils */ 43060),
  __webpack_require__(/*! jquery */ 33270)
], __WEBPACK_AMD_DEFINE_RESULT__ = (function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      $.removeData(this, 'data');
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id !== undefined) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    $.data(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = $.data($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    $.data($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (!$.isPlainObject(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuY2M4Y2ZlYjhiNjc2OTNiMDhmODMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7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Q0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0Isd0JBQXdCO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0Isc0JBQXNCO0FBQzVDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUFBLGtHQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LWlpaWYvbGVhZmxldC1paWlmLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvc2VsZWN0LXdvby9zcmMvanMvc2VsZWN0Mi9kYXRhL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9zZWxlY3Qtd29vL3NyYy9qcy9zZWxlY3QyL2RhdGEvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9sZWFmbGV0LmZ1bGxzY3JlZW4vQ29udHJvbC5GdWxsU2NyZWVuLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvc2VsZWN0LXdvby9zcmMvanMvc2VsZWN0Mi91dGlscy5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL3NlbGVjdC13b28vc3JjL2pzL3NlbGVjdDIvZGF0YS9zZWxlY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIExlYWZsZXQtSUlJRiAzLjAuMFxuICogSUlJRiBWaWV3ZXIgZm9yIExlYWZsZXRcbiAqIGJ5IEphY2sgUmVlZCwgQG1lamFja3JlZWRcbiAqL1xuXG5MLlRpbGVMYXllci5JaWlmID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIGNvbnRpbnVvdXNXb3JsZDogdHJ1ZSxcbiAgICB0aWxlU2l6ZTogMjU2LFxuICAgIHVwZGF0ZVdoZW5JZGxlOiB0cnVlLFxuICAgIHRpbGVGb3JtYXQ6ICdqcGcnLFxuICAgIGZpdEJvdW5kczogdHJ1ZSxcbiAgICBzZXRNYXhCb3VuZHM6IGZhbHNlXG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24odXJsLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnMgOiB7fTtcblxuICAgIGlmIChvcHRpb25zLm1heFpvb20pIHtcbiAgICAgIHRoaXMuX2N1c3RvbU1heFpvb20gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBleHBsaWNpdCB0aWxlU2l6ZSBzZXRcbiAgICBpZiAob3B0aW9ucy50aWxlU2l6ZSkge1xuICAgICAgdGhpcy5fZXhwbGljaXRUaWxlU2l6ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGFuIGV4cGxpY2l0IHF1YWxpdHlcbiAgICBpZiAob3B0aW9ucy5xdWFsaXR5KSB7XG4gICAgICB0aGlzLl9leHBsaWNpdFF1YWxpdHkgPSB0cnVlO1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5mb1Byb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX2luZm9VcmwgPSB1cmw7XG4gICAgdGhpcy5fYmFzZVVybCA9IHRoaXMuX3RlbXBsYXRlVXJsKCk7XG4gICAgdGhpcy5fZ2V0SW5mbygpO1xuICB9LFxuICBnZXRUaWxlVXJsOiBmdW5jdGlvbihjb29yZHMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgeCA9IGNvb3Jkcy54LFxuICAgICAgeSA9IChjb29yZHMueSksXG4gICAgICB6b29tID0gX3RoaXMuX2dldFpvb21Gb3JVcmwoKSxcbiAgICAgIHNjYWxlID0gTWF0aC5wb3coMiwgX3RoaXMubWF4TmF0aXZlWm9vbSAtIHpvb20pLFxuICAgICAgdGlsZUJhc2VTaXplID0gX3RoaXMub3B0aW9ucy50aWxlU2l6ZSAqIHNjYWxlLFxuICAgICAgbWlueCA9ICh4ICogdGlsZUJhc2VTaXplKSxcbiAgICAgIG1pbnkgPSAoeSAqIHRpbGVCYXNlU2l6ZSksXG4gICAgICBtYXh4ID0gTWF0aC5taW4obWlueCArIHRpbGVCYXNlU2l6ZSwgX3RoaXMueCksXG4gICAgICBtYXh5ID0gTWF0aC5taW4obWlueSArIHRpbGVCYXNlU2l6ZSwgX3RoaXMueSk7XG4gICAgXG4gICAgdmFyIHhEaWZmID0gKG1heHggLSBtaW54KTtcbiAgICB2YXIgeURpZmYgPSAobWF4eSAtIG1pbnkpO1xuXG4gICAgLy8gQ2Fub25pY2FsIFVSSSBTeW50YXggZm9yIHYyXG4gICAgdmFyIHNpemUgPSBNYXRoLmNlaWwoeERpZmYgLyBzY2FsZSkgKyAnLCc7XG4gICAgaWYgKF90aGlzLnR5cGUgPT09ICdJbWFnZVNlcnZpY2UzJykge1xuICAgICAgLy8gQ2Fubm9uaWNhbCBVUkkgU3ludGF4IGZvciB2M1xuICAgICAgc2l6ZSA9IHNpemUgKyBNYXRoLmNlaWwoeURpZmYgLyBzY2FsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEwuVXRpbC50ZW1wbGF0ZSh0aGlzLl9iYXNlVXJsLCBMLmV4dGVuZCh7XG4gICAgICBmb3JtYXQ6IF90aGlzLm9wdGlvbnMudGlsZUZvcm1hdCxcbiAgICAgIHF1YWxpdHk6IF90aGlzLnF1YWxpdHksXG4gICAgICByZWdpb246IFttaW54LCBtaW55LCB4RGlmZiwgeURpZmZdLmpvaW4oJywnKSxcbiAgICAgIHJvdGF0aW9uOiAwLFxuICAgICAgc2l6ZTogc2l6ZVxuICAgIH0sIHRoaXMub3B0aW9ucykpO1xuICB9LFxuICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIFdhaXQgZm9yIGluZm8uanNvbiBmZXRjaCBhbmQgcGFyc2UgdG8gY29tcGxldGVcbiAgICBQcm9taXNlLmFsbChbX3RoaXMuX2luZm9Qcm9taXNlXSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIC8vIFN0b3JlIHVubXV0YXRlZCBpbWFnZVNpemVzXG4gICAgICBfdGhpcy5faW1hZ2VTaXplc09yaWdpbmFsID0gX3RoaXMuX2ltYWdlU2l6ZXMuc2xpY2UoMCk7IFxuXG4gICAgICAvLyBTZXQgbWF4Wm9vbSBmb3IgbWFwXG4gICAgICBtYXAuX2xheWVyc01heFpvb20gPSBfdGhpcy5tYXhab29tO1xuXG4gICAgICAvLyBDYWxsIGFkZCBUaWxlTGF5ZXJcbiAgICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKF90aGlzLCBtYXApO1xuXG4gICAgICAvLyBTZXQgbWluWm9vbSBhbmQgbWluTmF0aXZlWm9vbSBiYXNlZCBvbiBob3cgdGhlIGltYWdlU2l6ZXMgbWF0Y2ggdXBcbiAgICAgIHZhciBzbWFsbGVzdEltYWdlID0gX3RoaXMuX2ltYWdlU2l6ZXNbMF07XG4gICAgICB2YXIgbWFwU2l6ZSA9IF90aGlzLl9tYXAuZ2V0U2l6ZSgpO1xuICAgICAgdmFyIG5ld01pblpvb20gPSAwO1xuICAgICAgLy8gTG9vcCBiYWNrIHRocm91Z2ggNSB0aW1lcyB0byBzZWUgaWYgYSBiZXR0ZXIgZml0IGNhbiBiZSBmb3VuZC5cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDU7IGkrKykge1xuICAgICAgICBpZiAoc21hbGxlc3RJbWFnZS54ID4gbWFwU2l6ZS54IHx8IHNtYWxsZXN0SW1hZ2UueSA+IG1hcFNpemUueSkge1xuICAgICAgICAgIHNtYWxsZXN0SW1hZ2UgPSBzbWFsbGVzdEltYWdlLmRpdmlkZUJ5KDIpO1xuICAgICAgICAgIF90aGlzLl9pbWFnZVNpemVzLnVuc2hpZnQoc21hbGxlc3RJbWFnZSk7XG4gICAgICAgICAgbmV3TWluWm9vbSA9IC1pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfdGhpcy5vcHRpb25zLm1pblpvb20gPSBuZXdNaW5ab29tO1xuICAgICAgX3RoaXMub3B0aW9ucy5taW5OYXRpdmVab29tID0gbmV3TWluWm9vbTtcbiAgICAgIF90aGlzLl9wcmV2X21hcF9sYXllcnNNaW5ab29tID0gX3RoaXMuX21hcC5fbGF5ZXJzTWluWm9vbTtcbiAgICAgIF90aGlzLl9tYXAuX2xheWVyc01pblpvb20gPSBuZXdNaW5ab29tO1xuXG4gICAgICBpZiAoX3RoaXMub3B0aW9ucy5maXRCb3VuZHMpIHtcbiAgICAgICAgX3RoaXMuX2ZpdEJvdW5kcygpO1xuICAgICAgfVxuXG4gICAgICBpZihfdGhpcy5vcHRpb25zLnNldE1heEJvdW5kcykge1xuICAgICAgICBfdGhpcy5fc2V0TWF4Qm91bmRzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IHRpbGUgc2l6ZXMgdG8gaGFuZGxlIG5vbiAyNTZ4MjU2IElJSUYgdGlsZXNcbiAgICAgIF90aGlzLm9uKCd0aWxlbG9hZCcsIGZ1bmN0aW9uKHRpbGUsIHVybCkge1xuXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aWxlLnRpbGUubmF0dXJhbEhlaWdodCxcbiAgICAgICAgICB3aWR0aCA9IHRpbGUudGlsZS5uYXR1cmFsV2lkdGg7XG5cbiAgICAgICAgLy8gTm8gbmVlZCB0byByZXNpemUgaWYgdGlsZSBpcyAyNTYgeCAyNTZcbiAgICAgICAgaWYgKGhlaWdodCA9PT0gMjU2ICYmIHdpZHRoID09PSAyNTYpIHJldHVybjtcblxuICAgICAgICB0aWxlLnRpbGUuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHRpbGUudGlsZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH0sXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIFxuICAgIG1hcC5fbGF5ZXJzTWluWm9vbSA9IF90aGlzLl9wcmV2X21hcF9sYXllcnNNaW5ab29tO1xuICAgIF90aGlzLl9pbWFnZVNpemVzID0gX3RoaXMuX2ltYWdlU2l6ZXNPcmlnaW5hbDtcblxuICAgIC8vIFJlbW92ZSBtYXhCb3VuZHMgc2V0IGZvciB0aGlzIGltYWdlXG4gICAgaWYoX3RoaXMub3B0aW9ucy5zZXRNYXhCb3VuZHMpIHtcbiAgICAgIG1hcC5zZXRNYXhCb3VuZHMobnVsbCk7XG4gICAgfVxuXG4gICAgLy8gQ2FsbCByZW1vdmUgVGlsZUxheWVyXG4gICAgTC5UaWxlTGF5ZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwoX3RoaXMsIG1hcCk7XG5cbiAgfSxcbiAgX2ZpdEJvdW5kczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEZpbmQgYmVzdCB6b29tIGxldmVsIGFuZCBjZW50ZXIgbWFwXG4gICAgdmFyIGluaXRpYWxab29tID0gX3RoaXMuX2dldEluaXRpYWxab29tKF90aGlzLl9tYXAuZ2V0U2l6ZSgpKTtcbiAgICB2YXIgb2Zmc2V0ID0gX3RoaXMuX2ltYWdlU2l6ZXMubGVuZ3RoIC0gMSAtIF90aGlzLm9wdGlvbnMubWF4TmF0aXZlWm9vbTtcbiAgICB2YXIgaW1hZ2VTaXplID0gX3RoaXMuX2ltYWdlU2l6ZXNbaW5pdGlhbFpvb20gKyBvZmZzZXRdO1xuICAgIHZhciBzdyA9IF90aGlzLl9tYXAub3B0aW9ucy5jcnMucG9pbnRUb0xhdExuZyhMLnBvaW50KDAsIGltYWdlU2l6ZS55KSwgaW5pdGlhbFpvb20pO1xuICAgIHZhciBuZSA9IF90aGlzLl9tYXAub3B0aW9ucy5jcnMucG9pbnRUb0xhdExuZyhMLnBvaW50KGltYWdlU2l6ZS54LCAwKSwgaW5pdGlhbFpvb20pO1xuICAgIHZhciBib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhzdywgbmUpO1xuXG4gICAgX3RoaXMuX21hcC5maXRCb3VuZHMoYm91bmRzLCB0cnVlKTtcbiAgfSxcbiAgX3NldE1heEJvdW5kczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEZpbmQgYmVzdCB6b29tIGxldmVsLCBjZW50ZXIgbWFwLCBhbmQgY29uc3RyYWluIHZpZXdlclxuICAgIHZhciBpbml0aWFsWm9vbSA9IF90aGlzLl9nZXRJbml0aWFsWm9vbShfdGhpcy5fbWFwLmdldFNpemUoKSk7XG4gICAgdmFyIGltYWdlU2l6ZSA9IF90aGlzLl9pbWFnZVNpemVzW2luaXRpYWxab29tXTtcbiAgICB2YXIgc3cgPSBfdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnBvaW50VG9MYXRMbmcoTC5wb2ludCgwLCBpbWFnZVNpemUueSksIGluaXRpYWxab29tKTtcbiAgICB2YXIgbmUgPSBfdGhpcy5fbWFwLm9wdGlvbnMuY3JzLnBvaW50VG9MYXRMbmcoTC5wb2ludChpbWFnZVNpemUueCwgMCksIGluaXRpYWxab29tKTtcbiAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoc3csIG5lKTtcblxuICAgIF90aGlzLl9tYXAuc2V0TWF4Qm91bmRzKGJvdW5kcywgdHJ1ZSk7XG4gIH0sXG4gIF9nZXRJbmZvOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgX3RoaXMuX2luZm9Qcm9taXNlID0gZmV0Y2goX3RoaXMuX2luZm9VcmwpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIF90aGlzLnkgPSBkYXRhLmhlaWdodDtcbiAgICAgICAgX3RoaXMueCA9IGRhdGEud2lkdGg7XG5cbiAgICAgICAgdmFyIHRpZXJTaXplcyA9IFtdLFxuICAgICAgICAgIGltYWdlU2l6ZXMgPSBbXSxcbiAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICB3aWR0aF8sXG4gICAgICAgICAgaGVpZ2h0XyxcbiAgICAgICAgICB0aWxlc1hfLFxuICAgICAgICAgIHRpbGVzWV87XG5cbiAgICAgICAgLy8gU2V0IHF1YWxpdHkgYmFzZWQgb2ZmIG9mIElJSUYgdmVyc2lvblxuICAgICAgICBpZiAoZGF0YS5wcm9maWxlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBfdGhpcy5wcm9maWxlID0gZGF0YS5wcm9maWxlWzBdO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgX3RoaXMucHJvZmlsZSA9IGRhdGEucHJvZmlsZTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy50eXBlID0gZGF0YS50eXBlO1xuXG4gICAgICAgIF90aGlzLl9zZXRRdWFsaXR5KCk7XG5cbiAgICAgICAgLy8gVW5sZXNzIGFuIGV4cGxpY2l0IHRpbGVTaXplIGlzIHNldCwgdXNlIGEgcHJlZmVycmVkIHRpbGVTaXplXG4gICAgICAgIGlmICghX3RoaXMuX2V4cGxpY2l0VGlsZVNpemUpIHtcbiAgICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgZmlyc3RcbiAgICAgICAgICBfdGhpcy5vcHRpb25zLnRpbGVTaXplID0gMjU2O1xuICAgICAgICAgIGlmIChkYXRhLnRpbGVzKSB7XG4gICAgICAgICAgICAvLyBJbWFnZSBBUEkgMi4wIENhc2VcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMudGlsZVNpemUgPSBkYXRhLnRpbGVzWzBdLndpZHRoO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50aWxlX3dpZHRoKXtcbiAgICAgICAgICAgIC8vIEltYWdlIEFQSSAxLjEgQ2FzZVxuICAgICAgICAgICAgX3RoaXMub3B0aW9ucy50aWxlU2l6ZSA9IGRhdGEudGlsZV93aWR0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjZWlsTG9nMih4KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChNYXRoLmxvZyh4KSAvIE1hdGguTE4yKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBDYWxjdWxhdGVzIG1heGltdW0gbmF0aXZlIHpvb20gZm9yIHRoZSBsYXllclxuICAgICAgICBfdGhpcy5tYXhOYXRpdmVab29tID0gTWF0aC5tYXgoXG4gICAgICAgICAgY2VpbExvZzIoX3RoaXMueCAvIF90aGlzLm9wdGlvbnMudGlsZVNpemUpLFxuICAgICAgICAgIGNlaWxMb2cyKF90aGlzLnkgLyBfdGhpcy5vcHRpb25zLnRpbGVTaXplKSxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICAgIF90aGlzLm9wdGlvbnMubWF4TmF0aXZlWm9vbSA9IF90aGlzLm1heE5hdGl2ZVpvb207XG4gICAgICAgIFxuICAgICAgICAvLyBFbmFibGUgem9vbWluZyBmdXJ0aGVyIHRoYW4gbmF0aXZlIGlmIG1heFpvb20gb3B0aW9uIHN1cHBsaWVkXG4gICAgICAgIGlmIChfdGhpcy5fY3VzdG9tTWF4Wm9vbSAmJiBfdGhpcy5vcHRpb25zLm1heFpvb20gPiBfdGhpcy5tYXhOYXRpdmVab29tKSB7XG4gICAgICAgICAgX3RoaXMubWF4Wm9vbSA9IF90aGlzLm9wdGlvbnMubWF4Wm9vbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5tYXhab29tID0gX3RoaXMubWF4TmF0aXZlWm9vbTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gX3RoaXMubWF4Wm9vbTsgaSsrKSB7XG4gICAgICAgICAgc2NhbGUgPSBNYXRoLnBvdygyLCBfdGhpcy5tYXhOYXRpdmVab29tIC0gaSk7XG4gICAgICAgICAgd2lkdGhfID0gTWF0aC5jZWlsKF90aGlzLnggLyBzY2FsZSk7XG4gICAgICAgICAgaGVpZ2h0XyA9IE1hdGguY2VpbChfdGhpcy55IC8gc2NhbGUpO1xuICAgICAgICAgIHRpbGVzWF8gPSBNYXRoLmNlaWwod2lkdGhfIC8gX3RoaXMub3B0aW9ucy50aWxlU2l6ZSk7XG4gICAgICAgICAgdGlsZXNZXyA9IE1hdGguY2VpbChoZWlnaHRfIC8gX3RoaXMub3B0aW9ucy50aWxlU2l6ZSk7XG4gICAgICAgICAgdGllclNpemVzLnB1c2goW3RpbGVzWF8sIHRpbGVzWV9dKTtcbiAgICAgICAgICBpbWFnZVNpemVzLnB1c2goTC5wb2ludCh3aWR0aF8saGVpZ2h0XykpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuX3RpZXJTaXplcyA9IHRpZXJTaXplcztcbiAgICAgICAgX3RoaXMuX2ltYWdlU2l6ZXMgPSBpbWFnZVNpemVzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICAgICAgXG4gIH0sXG5cbiAgX3NldFF1YWxpdHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIHByb2ZpbGVUb0NoZWNrID0gX3RoaXMucHJvZmlsZTtcblxuICAgIGlmIChfdGhpcy5fZXhwbGljaXRRdWFsaXR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgcHJvZmlsZSBpcyBhbiBvYmplY3RcbiAgICBpZiAodHlwZW9mKHByb2ZpbGVUb0NoZWNrKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHByb2ZpbGVUb0NoZWNrID0gcHJvZmlsZVRvQ2hlY2tbJ0BpZCddO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgcXVhbGl0eSBiYXNlZCBvbiB0aGUgSUlJRiBjb21wbGlhbmNlIGxldmVsXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIC9eaHR0cDpcXC9cXC9saWJyYXJ5LnN0YW5mb3JkLmVkdVxcL2lpaWZcXC9pbWFnZS1hcGlcXC8xLjFcXC9jb21wbGlhbmNlLmh0bWwuKiQvLnRlc3QocHJvZmlsZVRvQ2hlY2spOlxuICAgICAgICBfdGhpcy5vcHRpb25zLnF1YWxpdHkgPSAnbmF0aXZlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBBc3N1bWUgbGF0ZXIgcHJvZmlsZXMgYW5kIHNldCB0byBkZWZhdWx0XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBfdGhpcy5vcHRpb25zLnF1YWxpdHkgPSAnZGVmYXVsdCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcblxuICBfaW5mb1RvQmFzZVVybDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9VcmwucmVwbGFjZSgnaW5mby5qc29uJywgJycpO1xuICB9LFxuICBfdGVtcGxhdGVVcmw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9pbmZvVG9CYXNlVXJsKCkgKyAne3JlZ2lvbn0ve3NpemV9L3tyb3RhdGlvbn0ve3F1YWxpdHl9Lntmb3JtYXR9JztcbiAgfSxcbiAgX2lzVmFsaWRUaWxlOiBmdW5jdGlvbihjb29yZHMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciB6b29tID0gX3RoaXMuX2dldFpvb21Gb3JVcmwoKTtcbiAgICB2YXIgc2l6ZXMgPSBfdGhpcy5fdGllclNpemVzW3pvb21dO1xuICAgIHZhciB4ID0gY29vcmRzLng7XG4gICAgdmFyIHkgPSBjb29yZHMueTtcbiAgICBpZiAoem9vbSA8IDAgJiYgeCA+PSAwICYmIHkgPj0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFzaXplcykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh4IDwgMCB8fCBzaXplc1swXSA8PSB4IHx8IHkgPCAwIHx8IHNpemVzWzFdIDw9IHkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9ZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIF90aWxlU2hvdWxkQmVMb2FkZWQ6IGZ1bmN0aW9uKGNvb3Jkcykge1xuICAgIHJldHVybiB0aGlzLl9pc1ZhbGlkVGlsZShjb29yZHMpO1xuICB9LFxuICBfZ2V0SW5pdGlhbFpvb206IGZ1bmN0aW9uIChtYXBTaXplKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgdG9sZXJhbmNlID0gMC44O1xuICAgIHZhciBpbWFnZVNpemU7XG4gICAgLy8gQ2FsY3VsYXRlIGFuIG9mZnNldCBiZXR3ZWVuIHRoZSB6b29tIGxldmVscyBhbmQgdGhlIGFycmF5IGFjY2Vzc29yc1xuICAgIHZhciBvZmZzZXQgPSBfdGhpcy5faW1hZ2VTaXplcy5sZW5ndGggLSAxIC0gX3RoaXMub3B0aW9ucy5tYXhOYXRpdmVab29tO1xuICAgIGZvciAodmFyIGkgPSBfdGhpcy5faW1hZ2VTaXplcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaW1hZ2VTaXplID0gX3RoaXMuX2ltYWdlU2l6ZXNbaV07XG4gICAgICBpZiAoaW1hZ2VTaXplLnggKiB0b2xlcmFuY2UgPCBtYXBTaXplLnggJiYgaW1hZ2VTaXplLnkgKiB0b2xlcmFuY2UgPCBtYXBTaXplLnkpIHtcbiAgICAgICAgcmV0dXJuIGkgLSBvZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBhIGRlZmF1bHQgem9vbVxuICAgIHJldHVybiAyO1xuICB9XG59KTtcblxuTC50aWxlTGF5ZXIuaWlpZiA9IGZ1bmN0aW9uKHVybCwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEwuVGlsZUxheWVyLklpaWYodXJsLCBvcHRpb25zKTtcbn07XG4iLCJkZWZpbmUoW1xuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoVXRpbHMpIHtcbiAgZnVuY3Rpb24gQmFzZUFkYXB0ZXIgKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgQmFzZUFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoQmFzZUFkYXB0ZXIsIFV0aWxzLk9ic2VydmFibGUpO1xuXG4gIEJhc2VBZGFwdGVyLnByb3RvdHlwZS5jdXJyZW50ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYGN1cnJlbnRgIG1ldGhvZCBtdXN0IGJlIGRlZmluZWQgaW4gY2hpbGQgY2xhc3Nlcy4nKTtcbiAgfTtcblxuICBCYXNlQWRhcHRlci5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIGBxdWVyeWAgbWV0aG9kIG11c3QgYmUgZGVmaW5lZCBpbiBjaGlsZCBjbGFzc2VzLicpO1xuICB9O1xuXG4gIEJhc2VBZGFwdGVyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIC8vIENhbiBiZSBpbXBsZW1lbnRlZCBpbiBzdWJjbGFzc2VzXG4gIH07XG5cbiAgQmFzZUFkYXB0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ2FuIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBCYXNlQWRhcHRlci5wcm90b3R5cGUuZ2VuZXJhdGVSZXN1bHRJZCA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRhdGEpIHtcbiAgICB2YXIgaWQgPSAnJztcblxuICAgIGlmIChjb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgaWQgKz0gY29udGFpbmVyLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCArPSBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuICAgIH1cblxuICAgIGlkICs9ICctcmVzdWx0LSc7XG4gICAgaWQgKz0gVXRpbHMuZ2VuZXJhdGVDaGFycyg0KTtcblxuICAgIGlmIChkYXRhLmlkICE9IG51bGwpIHtcbiAgICAgIGlkICs9ICctJyArIGRhdGEuaWQudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgKz0gJy0nICsgVXRpbHMuZ2VuZXJhdGVDaGFycyg0KTtcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIHJldHVybiBCYXNlQWRhcHRlcjtcbn0pO1xuIiwiZGVmaW5lKFtcbiAgJy4vc2VsZWN0JyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChTZWxlY3RBZGFwdGVyLCBVdGlscywgJCkge1xuICBmdW5jdGlvbiBBcnJheUFkYXB0ZXIgKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmdldCgnZGF0YScpIHx8IFtdO1xuXG4gICAgQXJyYXlBZGFwdGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcblxuICAgIHRoaXMuYWRkT3B0aW9ucyh0aGlzLmNvbnZlcnRUb09wdGlvbnMoZGF0YSkpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKEFycmF5QWRhcHRlciwgU2VsZWN0QWRhcHRlcik7XG5cbiAgQXJyYXlBZGFwdGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciAkb3B0aW9uID0gdGhpcy4kZWxlbWVudC5maW5kKCdvcHRpb24nKS5maWx0ZXIoZnVuY3Rpb24gKGksIGVsbSkge1xuICAgICAgcmV0dXJuIGVsbS52YWx1ZSA9PSBkYXRhLmlkLnRvU3RyaW5nKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJG9wdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICRvcHRpb24gPSB0aGlzLm9wdGlvbihkYXRhKTtcblxuICAgICAgdGhpcy5hZGRPcHRpb25zKCRvcHRpb24pO1xuICAgIH1cblxuICAgIEFycmF5QWRhcHRlci5fX3N1cGVyX18uc2VsZWN0LmNhbGwodGhpcywgZGF0YSk7XG4gIH07XG5cbiAgQXJyYXlBZGFwdGVyLnByb3RvdHlwZS5jb252ZXJ0VG9PcHRpb25zID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgJGV4aXN0aW5nID0gdGhpcy4kZWxlbWVudC5maW5kKCdvcHRpb24nKTtcbiAgICB2YXIgZXhpc3RpbmdJZHMgPSAkZXhpc3RpbmcubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzZWxmLml0ZW0oJCh0aGlzKSkuaWQ7XG4gICAgfSkuZ2V0KCk7XG5cbiAgICB2YXIgJG9wdGlvbnMgPSBbXTtcblxuICAgIC8vIEZpbHRlciBvdXQgYWxsIGl0ZW1zIGV4Y2VwdCBmb3IgdGhlIG9uZSBwYXNzZWQgaW4gdGhlIGFyZ3VtZW50XG4gICAgZnVuY3Rpb24gb25seUl0ZW0gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKHRoaXMpLnZhbCgpID09IGl0ZW0uaWQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5sZW5ndGg7IGQrKykge1xuICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9ub3JtYWxpemVJdGVtKGRhdGFbZF0pO1xuXG4gICAgICAvLyBTa2lwIGl0ZW1zIHdoaWNoIHdlcmUgcHJlLWxvYWRlZCwgb25seSBtZXJnZSB0aGUgZGF0YVxuICAgICAgaWYgKCQuaW5BcnJheShpdGVtLmlkLCBleGlzdGluZ0lkcykgPj0gMCkge1xuICAgICAgICB2YXIgJGV4aXN0aW5nT3B0aW9uID0gJGV4aXN0aW5nLmZpbHRlcihvbmx5SXRlbShpdGVtKSk7XG5cbiAgICAgICAgdmFyIGV4aXN0aW5nRGF0YSA9IHRoaXMuaXRlbSgkZXhpc3RpbmdPcHRpb24pO1xuICAgICAgICB2YXIgbmV3RGF0YSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBpdGVtLCBleGlzdGluZ0RhdGEpO1xuXG4gICAgICAgIHZhciAkbmV3T3B0aW9uID0gdGhpcy5vcHRpb24obmV3RGF0YSk7XG5cbiAgICAgICAgJGV4aXN0aW5nT3B0aW9uLnJlcGxhY2VXaXRoKCRuZXdPcHRpb24pO1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgJG9wdGlvbiA9IHRoaXMub3B0aW9uKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICB2YXIgJGNoaWxkcmVuID0gdGhpcy5jb252ZXJ0VG9PcHRpb25zKGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICAgIFV0aWxzLmFwcGVuZE1hbnkoJG9wdGlvbiwgJGNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgJG9wdGlvbnMucHVzaCgkb3B0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG9wdGlvbnM7XG4gIH07XG5cbiAgcmV0dXJuIEFycmF5QWRhcHRlcjtcbn0pO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuTC5Db250cm9sLkZ1bGxTY3JlZW4gPSBMLkNvbnRyb2wuZXh0ZW5kKHtcblx0b3B0aW9uczoge1xuXHRcdHBvc2l0aW9uOiAndG9wbGVmdCcsXG5cdFx0dGl0bGU6ICdGdWxsIFNjcmVlbicsXG5cdFx0dGl0bGVDYW5jZWw6ICdFeGl0IEZ1bGwgU2NyZWVuJyxcblx0XHRmb3JjZVNlcGFyYXRlQnV0dG9uOiBmYWxzZSxcblx0XHRmb3JjZVBzZXVkb0Z1bGxzY3JlZW46IGZhbHNlLFxuXHRcdGZ1bGxzY3JlZW5FbGVtZW50OiBmYWxzZVxuXHR9LFxuXHRcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcblx0XHR2YXIgY2xhc3NOYW1lID0gJ2xlYWZsZXQtY29udHJvbC16b29tLWZ1bGxzY3JlZW4nLCBjb250YWluZXIsIGNvbnRlbnQgPSAnJztcblx0XHRcblx0XHRpZiAobWFwLnpvb21Db250cm9sICYmICF0aGlzLm9wdGlvbnMuZm9yY2VTZXBhcmF0ZUJ1dHRvbikge1xuXHRcdFx0Y29udGFpbmVyID0gbWFwLnpvb21Db250cm9sLl9jb250YWluZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWJhcicpO1xuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5vcHRpb25zLmNvbnRlbnQpIHtcblx0XHRcdGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xhc3NOYW1lICs9ICcgZnVsbHNjcmVlbi1pY29uJztcblx0XHR9XG5cblx0XHR0aGlzLl9jcmVhdGVCdXR0b24odGhpcy5vcHRpb25zLnRpdGxlLCBjbGFzc05hbWUsIGNvbnRlbnQsIGNvbnRhaW5lciwgdGhpcy50b2dnbGVGdWxsU2NyZWVuLCB0aGlzKTtcblx0XHR0aGlzLl9tYXAuZnVsbHNjcmVlbkNvbnRyb2wgPSB0aGlzO1xuXG5cdFx0dGhpcy5fbWFwLm9uKCdlbnRlckZ1bGxzY3JlZW4gZXhpdEZ1bGxzY3JlZW4nLCB0aGlzLl90b2dnbGVUaXRsZSwgdGhpcyk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXHR9LFxuXHRcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcblx0XHRMLkRvbUV2ZW50XG5cdFx0XHQub2ZmKHRoaXMubGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub2ZmKHRoaXMubGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdClcblx0XHRcdC5vZmYodGhpcy5saW5rLCAnY2xpY2snLCB0aGlzLnRvZ2dsZUZ1bGxTY3JlZW4sIHRoaXMpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vZmYodGhpcy5fY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuXHRcdFx0Lm9mZih0aGlzLl9jb250YWluZXIsIGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSwgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdClcblx0XHRcdC5vZmYodGhpcy5fY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIHRoaXMpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vZmYoZG9jdW1lbnQsIGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSwgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub2ZmKGRvY3VtZW50LCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpXG5cdFx0XHQub2ZmKGRvY3VtZW50LCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIHRoaXMpO1xuXHR9LFxuXHRcblx0X2NyZWF0ZUJ1dHRvbjogZnVuY3Rpb24gKHRpdGxlLCBjbGFzc05hbWUsIGNvbnRlbnQsIGNvbnRhaW5lciwgZm4sIGNvbnRleHQpIHtcblx0XHR0aGlzLmxpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xuXHRcdHRoaXMubGluay5ocmVmID0gJyMnO1xuXHRcdHRoaXMubGluay50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMubGluay5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdFx0dGhpcy5saW5rLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcblx0XHR0aGlzLmxpbmsuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGl0bGUpO1xuXG5cdFx0TC5Eb21FdmVudFxuXHRcdFx0Lm9uKHRoaXMubGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub24odGhpcy5saW5rLCAnY2xpY2snLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuXHRcdFx0Lm9uKHRoaXMubGluaywgJ2NsaWNrJywgZm4sIGNvbnRleHQpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vbihjb250YWluZXIsIGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSwgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pXG5cdFx0XHQub24oY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpXG5cdFx0XHQub24oY29udGFpbmVyLCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIGNvbnRleHQpO1xuXHRcdFxuXHRcdEwuRG9tRXZlbnRcblx0XHRcdC5vbihkb2N1bWVudCwgZnVsbFNjcmVlbkFwaS5mdWxsU2NyZWVuRXZlbnROYW1lLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbilcblx0XHRcdC5vbihkb2N1bWVudCwgZnVsbFNjcmVlbkFwaS5mdWxsU2NyZWVuRXZlbnROYW1lLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuXHRcdFx0Lm9uKGRvY3VtZW50LCBmdWxsU2NyZWVuQXBpLmZ1bGxTY3JlZW5FdmVudE5hbWUsIHRoaXMuX2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UsIGNvbnRleHQpO1xuXG5cdFx0cmV0dXJuIHRoaXMubGluaztcblx0fSxcblx0XG5cdHRvZ2dsZUZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHRcdG1hcC5fZXhpdEZpcmVkID0gZmFsc2U7XG5cdFx0aWYgKG1hcC5faXNGdWxsc2NyZWVuKSB7XG5cdFx0XHRpZiAoZnVsbFNjcmVlbkFwaS5zdXBwb3J0c0Z1bGxTY3JlZW4gJiYgIXRoaXMub3B0aW9ucy5mb3JjZVBzZXVkb0Z1bGxzY3JlZW4pIHtcblx0XHRcdFx0ZnVsbFNjcmVlbkFwaS5jYW5jZWxGdWxsU2NyZWVuKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50ID8gdGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50IDogbWFwLl9jb250YWluZXIsICdsZWFmbGV0LXBzZXVkby1mdWxsc2NyZWVuJyk7XG5cdFx0XHR9XG5cdFx0XHRtYXAuZmlyZSgnZXhpdEZ1bGxzY3JlZW4nKTtcblx0XHRcdG1hcC5fZXhpdEZpcmVkID0gdHJ1ZTtcblx0XHRcdG1hcC5faXNGdWxsc2NyZWVuID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKGZ1bGxTY3JlZW5BcGkuc3VwcG9ydHNGdWxsU2NyZWVuICYmICF0aGlzLm9wdGlvbnMuZm9yY2VQc2V1ZG9GdWxsc2NyZWVuKSB7XG5cdFx0XHRcdGZ1bGxTY3JlZW5BcGkucmVxdWVzdEZ1bGxTY3JlZW4odGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50ID8gdGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5FbGVtZW50IDogbWFwLl9jb250YWluZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMub3B0aW9ucy5mdWxsc2NyZWVuRWxlbWVudCA/IHRoaXMub3B0aW9ucy5mdWxsc2NyZWVuRWxlbWVudCA6IG1hcC5fY29udGFpbmVyLCAnbGVhZmxldC1wc2V1ZG8tZnVsbHNjcmVlbicpO1xuXHRcdFx0fVxuXHRcdFx0bWFwLmZpcmUoJ2VudGVyRnVsbHNjcmVlbicpO1xuXHRcdFx0bWFwLl9pc0Z1bGxzY3JlZW4gPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0XG5cdF90b2dnbGVUaXRsZTogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMubGluay50aXRsZSA9IHRoaXMuX21hcC5faXNGdWxsc2NyZWVuID8gdGhpcy5vcHRpb25zLnRpdGxlIDogdGhpcy5vcHRpb25zLnRpdGxlQ2FuY2VsO1xuXHR9LFxuXHRcblx0X2hhbmRsZUZ1bGxzY3JlZW5DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xuXHRcdG1hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuXHRcdGlmICghZnVsbFNjcmVlbkFwaS5pc0Z1bGxTY3JlZW4oKSAmJiAhbWFwLl9leGl0RmlyZWQpIHtcblx0XHRcdG1hcC5maXJlKCdleGl0RnVsbHNjcmVlbicpO1xuXHRcdFx0bWFwLl9leGl0RmlyZWQgPSB0cnVlO1xuXHRcdFx0bWFwLl9pc0Z1bGxzY3JlZW4gPSBmYWxzZTtcblx0XHR9XG5cdH1cbn0pO1xuXG5MLk1hcC5pbmNsdWRlKHtcblx0dG9nZ2xlRnVsbHNjcmVlbjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuZnVsbHNjcmVlbkNvbnRyb2wudG9nZ2xlRnVsbFNjcmVlbigpO1xuXHR9XG59KTtcblxuTC5NYXAuYWRkSW5pdEhvb2soZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5vcHRpb25zLmZ1bGxzY3JlZW5Db250cm9sKSB7XG5cdFx0dGhpcy5hZGRDb250cm9sKEwuY29udHJvbC5mdWxsc2NyZWVuKHRoaXMub3B0aW9ucy5mdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMpKTtcblx0fVxufSk7XG5cbkwuY29udHJvbC5mdWxsc2NyZWVuID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0cmV0dXJuIG5ldyBMLkNvbnRyb2wuRnVsbFNjcmVlbihvcHRpb25zKTtcbn07XG5cbi8qIFxuTmF0aXZlIEZ1bGxTY3JlZW4gSmF2YVNjcmlwdCBBUElcbi0tLS0tLS0tLS0tLS1cbkFzc3VtZXMgTW96aWxsYSBuYW1pbmcgY29udmVudGlvbnMgaW5zdGVhZCBvZiBXM0MgZm9yIG5vd1xuXG5zb3VyY2UgOiBodHRwOi8vam9obmR5ZXIubmFtZS9uYXRpdmUtZnVsbHNjcmVlbi1qYXZhc2NyaXB0LWFwaS1wbHVzLWpxdWVyeS1wbHVnaW4vXG5cbiovXG5cblx0dmFyIFxuXHRcdGZ1bGxTY3JlZW5BcGkgPSB7IFxuXHRcdFx0c3VwcG9ydHNGdWxsU2NyZWVuOiBmYWxzZSxcblx0XHRcdGlzRnVsbFNjcmVlbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sIFxuXHRcdFx0cmVxdWVzdEZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHt9LCBcblx0XHRcdGNhbmNlbEZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHt9LFxuXHRcdFx0ZnVsbFNjcmVlbkV2ZW50TmFtZTogJycsXG5cdFx0XHRwcmVmaXg6ICcnXG5cdFx0fSxcblx0XHRicm93c2VyUHJlZml4ZXMgPSAnd2Via2l0IG1veiBvIG1zIGtodG1sJy5zcGxpdCgnICcpO1xuXHRcblx0Ly8gY2hlY2sgZm9yIG5hdGl2ZSBzdXBwb3J0XG5cdGlmICh0eXBlb2YgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0ZnVsbFNjcmVlbkFwaS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGNoZWNrIGZvciBmdWxsc2NyZWVuIHN1cHBvcnQgYnkgdmVuZG9yIHByZWZpeFxuXHRcdGZvciAodmFyIGkgPSAwLCBpbCA9IGJyb3dzZXJQcmVmaXhlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG5cdFx0XHRmdWxsU2NyZWVuQXBpLnByZWZpeCA9IGJyb3dzZXJQcmVmaXhlc1tpXTtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnRbZnVsbFNjcmVlbkFwaS5wcmVmaXggKyAnQ2FuY2VsRnVsbFNjcmVlbiddICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbiA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIGRvY3VtZW50Wydtc0V4aXRGdWxsc2NyZWVuJ10gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRmdWxsU2NyZWVuQXBpLnByZWZpeCA9ICdtcyc7XG5cdFx0XHRmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbiA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdFxuXHQvLyB1cGRhdGUgbWV0aG9kcyB0byBkbyBzb21ldGhpbmcgdXNlZnVsXG5cdGlmIChmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbikge1xuXHRcdGlmIChmdWxsU2NyZWVuQXBpLnByZWZpeCA9PT0gJ21zJykge1xuXHRcdFx0ZnVsbFNjcmVlbkFwaS5mdWxsU2NyZWVuRXZlbnROYW1lID0gJ01TRnVsbHNjcmVlbkNoYW5nZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bGxTY3JlZW5BcGkuZnVsbFNjcmVlbkV2ZW50TmFtZSA9IGZ1bGxTY3JlZW5BcGkucHJlZml4ICsgJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xuXHRcdH1cblx0XHRmdWxsU2NyZWVuQXBpLmlzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcmVmaXgpIHtcblx0XHRcdFx0Y2FzZSAnJzpcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuZnVsbHNjcmVlbjtcblx0XHRcdFx0Y2FzZSAnd2Via2l0Jzpcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuO1xuXHRcdFx0XHRjYXNlICdtcyc6XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50W3RoaXMucHJlZml4ICsgJ0Z1bGxTY3JlZW4nXTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGZ1bGxTY3JlZW5BcGkucmVxdWVzdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcmVmaXgpIHtcblx0XHRcdFx0Y2FzZSAnJzpcblx0XHRcdFx0XHRyZXR1cm4gZWwucmVxdWVzdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0Y2FzZSAnbXMnOlxuXHRcdFx0XHRcdHJldHVybiBlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGVsW3RoaXMucHJlZml4ICsgJ1JlcXVlc3RGdWxsU2NyZWVuJ10oKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGZ1bGxTY3JlZW5BcGkuY2FuY2VsRnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcmVmaXgpIHtcblx0XHRcdFx0Y2FzZSAnJzpcblx0XHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcblx0XHRcdFx0Y2FzZSAnbXMnOlxuXHRcdFx0XHRcdHJldHVybiBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGRvY3VtZW50W3RoaXMucHJlZml4ICsgJ0NhbmNlbEZ1bGxTY3JlZW4nXSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvLyBqUXVlcnkgcGx1Z2luXG5cdGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGpRdWVyeS5mbi5yZXF1ZXN0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgZWwgPSBqUXVlcnkodGhpcyk7XG5cdFx0XHRcdGlmIChmdWxsU2NyZWVuQXBpLnN1cHBvcnRzRnVsbFNjcmVlbikge1xuXHRcdFx0XHRcdGZ1bGxTY3JlZW5BcGkucmVxdWVzdEZ1bGxTY3JlZW4oZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9XG5cblx0Ly8gZXhwb3J0IGFwaVxuXHR3aW5kb3cuZnVsbFNjcmVlbkFwaSA9IGZ1bGxTY3JlZW5BcGk7XG59KSgpO1xuIiwiZGVmaW5lKFtcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uICgkKSB7XG4gIHZhciBVdGlscyA9IHt9O1xuXG4gIFV0aWxzLkV4dGVuZCA9IGZ1bmN0aW9uIChDaGlsZENsYXNzLCBTdXBlckNsYXNzKSB7XG4gICAgdmFyIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gICAgZnVuY3Rpb24gQmFzZUNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHRoaXMuY29uc3RydWN0b3IgPSBDaGlsZENsYXNzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBpbiBTdXBlckNsYXNzKSB7XG4gICAgICBpZiAoX19oYXNQcm9wLmNhbGwoU3VwZXJDbGFzcywga2V5KSkge1xuICAgICAgICBDaGlsZENsYXNzW2tleV0gPSBTdXBlckNsYXNzW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgQmFzZUNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IFN1cGVyQ2xhc3MucHJvdG90eXBlO1xuICAgIENoaWxkQ2xhc3MucHJvdG90eXBlID0gbmV3IEJhc2VDb25zdHJ1Y3RvcigpO1xuICAgIENoaWxkQ2xhc3MuX19zdXBlcl9fID0gU3VwZXJDbGFzcy5wcm90b3R5cGU7XG5cbiAgICByZXR1cm4gQ2hpbGRDbGFzcztcbiAgfTtcblxuICBmdW5jdGlvbiBnZXRNZXRob2RzICh0aGVDbGFzcykge1xuICAgIHZhciBwcm90byA9IHRoZUNsYXNzLnByb3RvdHlwZTtcblxuICAgIHZhciBtZXRob2RzID0gW107XG5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIHByb3RvKSB7XG4gICAgICB2YXIgbSA9IHByb3RvW21ldGhvZE5hbWVdO1xuXG4gICAgICBpZiAodHlwZW9mIG0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZXRob2ROYW1lID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBtZXRob2RzLnB1c2gobWV0aG9kTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZHM7XG4gIH1cblxuICBVdGlscy5EZWNvcmF0ZSA9IGZ1bmN0aW9uIChTdXBlckNsYXNzLCBEZWNvcmF0b3JDbGFzcykge1xuICAgIHZhciBkZWNvcmF0ZWRNZXRob2RzID0gZ2V0TWV0aG9kcyhEZWNvcmF0b3JDbGFzcyk7XG4gICAgdmFyIHN1cGVyTWV0aG9kcyA9IGdldE1ldGhvZHMoU3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBEZWNvcmF0ZWRDbGFzcyAoKSB7XG4gICAgICB2YXIgdW5zaGlmdCA9IEFycmF5LnByb3RvdHlwZS51bnNoaWZ0O1xuXG4gICAgICB2YXIgYXJnQ291bnQgPSBEZWNvcmF0b3JDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IubGVuZ3RoO1xuXG4gICAgICB2YXIgY2FsbGVkQ29uc3RydWN0b3IgPSBTdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuICAgICAgaWYgKGFyZ0NvdW50ID4gMCkge1xuICAgICAgICB1bnNoaWZ0LmNhbGwoYXJndW1lbnRzLCBTdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cbiAgICAgICAgY2FsbGVkQ29uc3RydWN0b3IgPSBEZWNvcmF0b3JDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgICB9XG5cbiAgICAgIGNhbGxlZENvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgRGVjb3JhdG9yQ2xhc3MuZGlzcGxheU5hbWUgPSBTdXBlckNsYXNzLmRpc3BsYXlOYW1lO1xuXG4gICAgZnVuY3Rpb24gY3RyICgpIHtcbiAgICAgIHRoaXMuY29uc3RydWN0b3IgPSBEZWNvcmF0ZWRDbGFzcztcbiAgICB9XG5cbiAgICBEZWNvcmF0ZWRDbGFzcy5wcm90b3R5cGUgPSBuZXcgY3RyKCk7XG5cbiAgICBmb3IgKHZhciBtID0gMDsgbSA8IHN1cGVyTWV0aG9kcy5sZW5ndGg7IG0rKykge1xuICAgICAgICB2YXIgc3VwZXJNZXRob2QgPSBzdXBlck1ldGhvZHNbbV07XG5cbiAgICAgICAgRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlW3N1cGVyTWV0aG9kXSA9XG4gICAgICAgICAgU3VwZXJDbGFzcy5wcm90b3R5cGVbc3VwZXJNZXRob2RdO1xuICAgIH1cblxuICAgIHZhciBjYWxsZWRNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgLy8gU3R1YiBvdXQgdGhlIG9yaWdpbmFsIG1ldGhvZCBpZiBpdCdzIG5vdCBkZWNvcmF0aW5nIGFuIGFjdHVhbCBtZXRob2RcbiAgICAgIHZhciBvcmlnaW5hbE1ldGhvZCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgICBpZiAobWV0aG9kTmFtZSBpbiBEZWNvcmF0ZWRDbGFzcy5wcm90b3R5cGUpIHtcbiAgICAgICAgb3JpZ2luYWxNZXRob2QgPSBEZWNvcmF0ZWRDbGFzcy5wcm90b3R5cGVbbWV0aG9kTmFtZV07XG4gICAgICB9XG5cbiAgICAgIHZhciBkZWNvcmF0ZWRNZXRob2QgPSBEZWNvcmF0b3JDbGFzcy5wcm90b3R5cGVbbWV0aG9kTmFtZV07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB1bnNoaWZ0ID0gQXJyYXkucHJvdG90eXBlLnVuc2hpZnQ7XG5cbiAgICAgICAgdW5zaGlmdC5jYWxsKGFyZ3VtZW50cywgb3JpZ2luYWxNZXRob2QpO1xuXG4gICAgICAgIHJldHVybiBkZWNvcmF0ZWRNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGVjb3JhdGVkTWV0aG9kcy5sZW5ndGg7IGQrKykge1xuICAgICAgdmFyIGRlY29yYXRlZE1ldGhvZCA9IGRlY29yYXRlZE1ldGhvZHNbZF07XG5cbiAgICAgIERlY29yYXRlZENsYXNzLnByb3RvdHlwZVtkZWNvcmF0ZWRNZXRob2RdID0gY2FsbGVkTWV0aG9kKGRlY29yYXRlZE1ldGhvZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIERlY29yYXRlZENsYXNzO1xuICB9O1xuXG4gIHZhciBPYnNlcnZhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gIH07XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyB8fCB7fTtcblxuICAgIGlmIChldmVudCBpbiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbY2FsbGJhY2tdO1xuICAgIH1cbiAgfTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBwYXJhbXMgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzIHx8IHt9O1xuXG4gICAgLy8gUGFyYW1zIHNob3VsZCBhbHdheXMgY29tZSBpbiBhcyBhbiBhcnJheVxuICAgIGlmIChwYXJhbXMgPT0gbnVsbCkge1xuICAgICAgcGFyYW1zID0gW107XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIGFyZ3VtZW50cyB0byB0aGUgZXZlbnQsIHVzZSBhIHRlbXBvcmFyeSBvYmplY3RcbiAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcGFyYW1zLnB1c2goe30pO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgYF90eXBlYCBvZiB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBldmVudFxuICAgIHBhcmFtc1swXS5fdHlwZSA9IGV2ZW50O1xuXG4gICAgaWYgKGV2ZW50IGluIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLmludm9rZSh0aGlzLmxpc3RlbmVyc1tldmVudF0sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfVxuXG4gICAgaWYgKCcqJyBpbiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgdGhpcy5pbnZva2UodGhpcy5saXN0ZW5lcnNbJyonXSwgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuaW52b2tlID0gZnVuY3Rpb24gKGxpc3RlbmVycywgcGFyYW1zKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIHBhcmFtcyk7XG4gICAgfVxuICB9O1xuXG4gIFV0aWxzLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuXG4gIFV0aWxzLmdlbmVyYXRlQ2hhcnMgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgdmFyIGNoYXJzID0gJyc7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmFuZG9tQ2hhciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDM2KTtcbiAgICAgIGNoYXJzICs9IHJhbmRvbUNoYXIudG9TdHJpbmcoMzYpO1xuICAgIH1cblxuICAgIHJldHVybiBjaGFycztcbiAgfTtcblxuICBVdGlscy5iaW5kID0gZnVuY3Rpb24gKGZ1bmMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgVXRpbHMuX2NvbnZlcnREYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBmb3IgKHZhciBvcmlnaW5hbEtleSBpbiBkYXRhKSB7XG4gICAgICB2YXIga2V5cyA9IG9yaWdpbmFsS2V5LnNwbGl0KCctJyk7XG5cbiAgICAgIHZhciBkYXRhTGV2ZWwgPSBkYXRhO1xuXG4gICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1trXTtcblxuICAgICAgICAvLyBMb3dlcmNhc2UgdGhlIGZpcnN0IGxldHRlclxuICAgICAgICAvLyBCeSBkZWZhdWx0LCBkYXNoLXNlcGFyYXRlZCBiZWNvbWVzIGNhbWVsQ2FzZVxuICAgICAgICBrZXkgPSBrZXkuc3Vic3RyaW5nKDAsIDEpLnRvTG93ZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gICAgICAgIGlmICghKGtleSBpbiBkYXRhTGV2ZWwpKSB7XG4gICAgICAgICAgZGF0YUxldmVsW2tleV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrID09IGtleXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGRhdGFMZXZlbFtrZXldID0gZGF0YVtvcmlnaW5hbEtleV07XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhTGV2ZWwgPSBkYXRhTGV2ZWxba2V5XTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIGRhdGFbb3JpZ2luYWxLZXldO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIFV0aWxzLmhhc1Njcm9sbCA9IGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAvLyBBZGFwdGVkIGZyb20gdGhlIGZ1bmN0aW9uIGNyZWF0ZWQgYnkgQFNoYWRvd1NjcmlwdGVyXG4gICAgLy8gYW5kIGFkYXB0ZWQgYnkgQEJpbGxCYXJyeSBvbiB0aGUgU3RhY2sgRXhjaGFuZ2UgQ29kZSBSZXZpZXcgd2Vic2l0ZS5cbiAgICAvLyBUaGUgb3JpZ2luYWwgY29kZSBjYW4gYmUgZm91bmQgYXRcbiAgICAvLyBodHRwOi8vY29kZXJldmlldy5zdGFja2V4Y2hhbmdlLmNvbS9xLzEzMzM4XG4gICAgLy8gYW5kIHdhcyBkZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggdGhlIFNpenpsZSBzZWxlY3RvciBlbmdpbmUuXG5cbiAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgdmFyIG92ZXJmbG93WCA9IGVsLnN0eWxlLm92ZXJmbG93WDtcbiAgICB2YXIgb3ZlcmZsb3dZID0gZWwuc3R5bGUub3ZlcmZsb3dZO1xuXG4gICAgLy9DaGVjayBib3RoIHggYW5kIHkgZGVjbGFyYXRpb25zXG4gICAgaWYgKG92ZXJmbG93WCA9PT0gb3ZlcmZsb3dZICYmXG4gICAgICAgIChvdmVyZmxvd1kgPT09ICdoaWRkZW4nIHx8IG92ZXJmbG93WSA9PT0gJ3Zpc2libGUnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvdmVyZmxvd1ggPT09ICdzY3JvbGwnIHx8IG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiAoJGVsLmlubmVySGVpZ2h0KCkgPCBlbC5zY3JvbGxIZWlnaHQgfHxcbiAgICAgICRlbC5pbm5lcldpZHRoKCkgPCBlbC5zY3JvbGxXaWR0aCk7XG4gIH07XG5cbiAgVXRpbHMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24gKG1hcmt1cCkge1xuICAgIHZhciByZXBsYWNlTWFwID0ge1xuICAgICAgJ1xcXFwnOiAnJiM5MjsnLFxuICAgICAgJyYnOiAnJmFtcDsnLFxuICAgICAgJzwnOiAnJmx0OycsXG4gICAgICAnPic6ICcmZ3Q7JyxcbiAgICAgICdcIic6ICcmcXVvdDsnLFxuICAgICAgJ1xcJyc6ICcmIzM5OycsXG4gICAgICAnLyc6ICcmIzQ3OydcbiAgICB9O1xuXG4gICAgLy8gRG8gbm90IHRyeSB0byBlc2NhcGUgdGhlIG1hcmt1cCBpZiBpdCdzIG5vdCBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgbWFya3VwICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG1hcmt1cDtcbiAgICB9XG5cbiAgICByZXR1cm4gU3RyaW5nKG1hcmt1cCkucmVwbGFjZSgvWyY8PlwiJ1xcL1xcXFxdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgcmV0dXJuIHJlcGxhY2VNYXBbbWF0Y2hdO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFwcGVuZCBhbiBhcnJheSBvZiBqUXVlcnkgbm9kZXMgdG8gYSBnaXZlbiBlbGVtZW50LlxuICBVdGlscy5hcHBlbmRNYW55ID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkbm9kZXMpIHtcbiAgICAvLyBqUXVlcnkgMS43LnggZG9lcyBub3Qgc3VwcG9ydCAkLmZuLmFwcGVuZCgpIHdpdGggYW4gYXJyYXlcbiAgICAvLyBGYWxsIGJhY2sgdG8gYSBqUXVlcnkgb2JqZWN0IGNvbGxlY3Rpb24gdXNpbmcgJC5mbi5hZGQoKVxuICAgIGlmICgkLmZuLmpxdWVyeS5zdWJzdHIoMCwgMykgPT09ICcxLjcnKSB7XG4gICAgICB2YXIgJGpxTm9kZXMgPSAkKCk7XG5cbiAgICAgICQubWFwKCRub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgJGpxTm9kZXMgPSAkanFOb2Rlcy5hZGQobm9kZSk7XG4gICAgICB9KTtcblxuICAgICAgJG5vZGVzID0gJGpxTm9kZXM7XG4gICAgfVxuXG4gICAgJGVsZW1lbnQuYXBwZW5kKCRub2Rlcyk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGJyb3dzZXIgaXMgb24gYSB0b3VjaHNjcmVlbiBkZXZpY2UuXG4gIFV0aWxzLmlzVG91Y2hzY3JlZW4gPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBVdGlscy5faXNUb3VjaHNjcmVlbkNhY2hlKSB7XG4gICAgICBVdGlscy5faXNUb3VjaHNjcmVlbkNhY2hlID0gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gVXRpbHMuX2lzVG91Y2hzY3JlZW5DYWNoZTtcbiAgfTtcblxuICByZXR1cm4gVXRpbHM7XG59KTtcbiIsImRlZmluZShbXG4gICcuL2Jhc2UnLFxuICAnLi4vdXRpbHMnLFxuICAnanF1ZXJ5J1xuXSwgZnVuY3Rpb24gKEJhc2VBZGFwdGVyLCBVdGlscywgJCkge1xuICBmdW5jdGlvbiBTZWxlY3RBZGFwdGVyICgkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgU2VsZWN0QWRhcHRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIFV0aWxzLkV4dGVuZChTZWxlY3RBZGFwdGVyLCBCYXNlQWRhcHRlcik7XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuY3VycmVudCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciBkYXRhID0gW107XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCc6c2VsZWN0ZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkb3B0aW9uID0gJCh0aGlzKTtcblxuICAgICAgdmFyIG9wdGlvbiA9IHNlbGYuaXRlbSgkb3B0aW9uKTtcblxuICAgICAgZGF0YS5wdXNoKG9wdGlvbik7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGRhdGEuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgLy8gSWYgZGF0YS5lbGVtZW50IGlzIGEgRE9NIG5vZGUsIHVzZSBpdCBpbnN0ZWFkXG4gICAgaWYgKCQoZGF0YS5lbGVtZW50KS5pcygnb3B0aW9uJykpIHtcbiAgICAgIGRhdGEuZWxlbWVudC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5wcm9wKCdtdWx0aXBsZScpKSB7XG4gICAgICB0aGlzLmN1cnJlbnQoZnVuY3Rpb24gKGN1cnJlbnREYXRhKSB7XG4gICAgICAgIHZhciB2YWwgPSBbXTtcblxuICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICBkYXRhLnB1c2guYXBwbHkoZGF0YSwgY3VycmVudERhdGEpO1xuXG4gICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5sZW5ndGg7IGQrKykge1xuICAgICAgICAgIHZhciBpZCA9IGRhdGFbZF0uaWQ7XG5cbiAgICAgICAgICBpZiAoJC5pbkFycmF5KGlkLCB2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgdmFsLnB1c2goaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuJGVsZW1lbnQudmFsKHZhbCk7XG4gICAgICAgIHNlbGYuJGVsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZhbCA9IGRhdGEuaWQ7XG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudmFsKHZhbCk7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS51bnNlbGVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LnByb3AoJ211bHRpcGxlJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhLnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoJChkYXRhLmVsZW1lbnQpLmlzKCdvcHRpb24nKSkge1xuICAgICAgZGF0YS5lbGVtZW50LnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnQoZnVuY3Rpb24gKGN1cnJlbnREYXRhKSB7XG4gICAgICB2YXIgdmFsID0gW107XG5cbiAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgY3VycmVudERhdGEubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgdmFyIGlkID0gY3VycmVudERhdGFbZF0uaWQ7XG5cbiAgICAgICAgaWYgKGlkICE9PSBkYXRhLmlkICYmICQuaW5BcnJheShpZCwgdmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICB2YWwucHVzaChpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi4kZWxlbWVudC52YWwodmFsKTtcblxuICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLnNlbGVjdChwYXJhbXMuZGF0YSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Vuc2VsZWN0JywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi51bnNlbGVjdChwYXJhbXMuZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZW1vdmUgYW55dGhpbmcgYWRkZWQgdG8gY2hpbGQgZWxlbWVudHNcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJyonKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFJlbW92ZSBhbnkgY3VzdG9tIGRhdGEgc2V0IGJ5IFNlbGVjdDJcbiAgICAgICQucmVtb3ZlRGF0YSh0aGlzLCAnZGF0YScpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICB2YXIgZGF0YSA9IFtdO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciAkb3B0aW9ucyA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oKTtcblxuICAgICRvcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRvcHRpb24gPSAkKHRoaXMpO1xuXG4gICAgICBpZiAoISRvcHRpb24uaXMoJ29wdGlvbicpICYmICEkb3B0aW9uLmlzKCdvcHRncm91cCcpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdGlvbiA9IHNlbGYuaXRlbSgkb3B0aW9uKTtcblxuICAgICAgdmFyIG1hdGNoZXMgPSBzZWxmLm1hdGNoZXMocGFyYW1zLCBvcHRpb24pO1xuXG4gICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICBkYXRhLnB1c2gobWF0Y2hlcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjayh7XG4gICAgICByZXN1bHRzOiBkYXRhXG4gICAgfSk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuYWRkT3B0aW9ucyA9IGZ1bmN0aW9uICgkb3B0aW9ucykge1xuICAgIFV0aWxzLmFwcGVuZE1hbnkodGhpcy4kZWxlbWVudCwgJG9wdGlvbnMpO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLm9wdGlvbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG9wdGlvbjtcblxuICAgIGlmIChkYXRhLmNoaWxkcmVuKSB7XG4gICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpO1xuICAgICAgb3B0aW9uLmxhYmVsID0gZGF0YS50ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblxuICAgICAgaWYgKG9wdGlvbi50ZXh0Q29udGVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGRhdGEudGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBkYXRhLnRleHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9uLnZhbHVlID0gZGF0YS5pZDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5kaXNhYmxlZCkge1xuICAgICAgb3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zZWxlY3RlZCkge1xuICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS50aXRsZSkge1xuICAgICAgb3B0aW9uLnRpdGxlID0gZGF0YS50aXRsZTtcbiAgICB9XG5cbiAgICB2YXIgJG9wdGlvbiA9ICQob3B0aW9uKTtcblxuICAgIHZhciBub3JtYWxpemVkRGF0YSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG4gICAgbm9ybWFsaXplZERhdGEuZWxlbWVudCA9IG9wdGlvbjtcblxuICAgIC8vIE92ZXJyaWRlIHRoZSBvcHRpb24ncyBkYXRhIHdpdGggdGhlIGNvbWJpbmVkIGRhdGFcbiAgICAkLmRhdGEob3B0aW9uLCAnZGF0YScsIG5vcm1hbGl6ZWREYXRhKTtcblxuICAgIHJldHVybiAkb3B0aW9uO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLml0ZW0gPSBmdW5jdGlvbiAoJG9wdGlvbikge1xuICAgIHZhciBkYXRhID0ge307XG5cbiAgICBkYXRhID0gJC5kYXRhKCRvcHRpb25bMF0sICdkYXRhJyk7XG5cbiAgICBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoJG9wdGlvbi5pcygnb3B0aW9uJykpIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIGlkOiAkb3B0aW9uLnZhbCgpLFxuICAgICAgICB0ZXh0OiAkb3B0aW9uLnRleHQoKSxcbiAgICAgICAgZGlzYWJsZWQ6ICRvcHRpb24ucHJvcCgnZGlzYWJsZWQnKSxcbiAgICAgICAgc2VsZWN0ZWQ6ICRvcHRpb24ucHJvcCgnc2VsZWN0ZWQnKSxcbiAgICAgICAgdGl0bGU6ICRvcHRpb24ucHJvcCgndGl0bGUnKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCRvcHRpb24uaXMoJ29wdGdyb3VwJykpIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIHRleHQ6ICRvcHRpb24ucHJvcCgnbGFiZWwnKSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICB0aXRsZTogJG9wdGlvbi5wcm9wKCd0aXRsZScpXG4gICAgICB9O1xuXG4gICAgICB2YXIgJGNoaWxkcmVuID0gJG9wdGlvbi5jaGlsZHJlbignb3B0aW9uJyk7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcblxuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCAkY2hpbGRyZW4ubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgdmFyICRjaGlsZCA9ICQoJGNoaWxkcmVuW2NdKTtcblxuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLml0ZW0oJGNoaWxkKTtcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIH1cblxuICAgIGRhdGEgPSB0aGlzLl9ub3JtYWxpemVJdGVtKGRhdGEpO1xuICAgIGRhdGEuZWxlbWVudCA9ICRvcHRpb25bMF07XG5cbiAgICAkLmRhdGEoJG9wdGlvblswXSwgJ2RhdGEnLCBkYXRhKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLl9ub3JtYWxpemVJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoISQuaXNQbGFpbk9iamVjdChpdGVtKSkge1xuICAgICAgaXRlbSA9IHtcbiAgICAgICAgaWQ6IGl0ZW0sXG4gICAgICAgIHRleHQ6IGl0ZW1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaXRlbSA9ICQuZXh0ZW5kKHt9LCB7XG4gICAgICB0ZXh0OiAnJ1xuICAgIH0sIGl0ZW0pO1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmIChpdGVtLmlkICE9IG51bGwpIHtcbiAgICAgIGl0ZW0uaWQgPSBpdGVtLmlkLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0udGV4dCAhPSBudWxsKSB7XG4gICAgICBpdGVtLnRleHQgPSBpdGVtLnRleHQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5fcmVzdWx0SWQgPT0gbnVsbCAmJiBpdGVtLmlkKSB7XG4gICAgICBpdGVtLl9yZXN1bHRJZCA9IHRoaXMuZ2VuZXJhdGVSZXN1bHRJZCh0aGlzLmNvbnRhaW5lciwgaXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgaXRlbSk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUubWF0Y2hlcyA9IGZ1bmN0aW9uIChwYXJhbXMsIGRhdGEpIHtcbiAgICB2YXIgbWF0Y2hlciA9IHRoaXMub3B0aW9ucy5nZXQoJ21hdGNoZXInKTtcblxuICAgIHJldHVybiBtYXRjaGVyKHBhcmFtcywgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIFNlbGVjdEFkYXB0ZXI7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==