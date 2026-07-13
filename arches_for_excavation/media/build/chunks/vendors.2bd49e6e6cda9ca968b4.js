"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[8511],{

/***/ 9823:
/*!********************************************!*\
  !*** ./node_modules/shpjs/dist/shp.esm.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   combine: () => (/* binding */ combine),
/* harmony export */   "default": () => (/* binding */ getShapefile),
/* harmony export */   getShapefile: () => (/* binding */ getShapefile),
/* harmony export */   parseDbf: () => (/* binding */ _parseDbf),
/* harmony export */   parseShp: () => (/* binding */ _parseShp),
/* harmony export */   parseZip: () => (/* binding */ parseZip)
/* harmony export */ });
function globals(defs) {
  defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

  defs.WGS84 = defs['EPSG:4326'];
  defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
  defs.GOOGLE = defs['EPSG:3857'];
  defs['EPSG:900913'] = defs['EPSG:3857'];
  defs['EPSG:102113'] = defs['EPSG:3857'];
}

var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_WGS84 = 4; // WGS84 or equivalent
var PJD_NODATUM = 5; // WGS84 or equivalent
var SRS_WGS84_SEMIMAJOR = 6378137.0;  // only used in grid shift transforms
var SRS_WGS84_SEMIMINOR = 6356752.314;  // only used in grid shift transforms
var SRS_WGS84_ESQUARED = 0.0066943799901413165; // only used in grid shift transforms
var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
var HALF_PI = Math.PI/2;
// ellipoid pj_set_ell.c
var SIXTH = 0.1666666666666666667;
/* 1/6 */
var RA4 = 0.04722222222222222222;
/* 17/360 */
var RA6 = 0.02215608465608465608;
var EPSLN = 1.0e-10;
// you'd think you could use Number.EPSILON above but that makes
// Mollweide get into an infinate loop.

var D2R$1 = 0.01745329251994329577;
var R2D = 57.29577951308232088;
var FORTPI = Math.PI/4;
var TWO_PI = Math.PI * 2;
// SPI is slightly greater than Math.PI, so values that exceed the -180..180
// degree range by a tiny amount don't get wrapped. This prevents points that
// have drifted from their original location along the 180th meridian (due to
// floating point error) from changing their sign.
var SPI = 3.14159265359;

var exports$2 = {};

exports$2.greenwich = 0.0; //"0dE",
exports$2.lisbon = -9.131906111111; //"9d07'54.862\"W",
exports$2.paris = 2.337229166667; //"2d20'14.025\"E",
exports$2.bogota = -74.080916666667; //"74d04'51.3\"W",
exports$2.madrid = -3.687938888889; //"3d41'16.58\"W",
exports$2.rome = 12.452333333333; //"12d27'8.4\"E",
exports$2.bern = 7.439583333333; //"7d26'22.5\"E",
exports$2.jakarta = 106.807719444444; //"106d48'27.79\"E",
exports$2.ferro = -17.666666666667; //"17d40'W",
exports$2.brussels = 4.367975; //"4d22'4.71\"E",
exports$2.stockholm = 18.058277777778; //"18d3'29.8\"E",
exports$2.athens = 23.7163375; //"23d42'58.815\"E",
exports$2.oslo = 10.722916666667; //"10d43'22.5\"E"

var units = {
  ft: {to_meter: 0.3048},
  'us-ft': {to_meter: 1200 / 3937}
};

var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key) {
  if (obj[key]) {
    return obj[key];
  }
  var keys = Object.keys(obj);
  var lkey = key.toLowerCase().replace(ignoredChar, '');
  var i = -1;
  var testkey, processedKey;
  while (++i < keys.length) {
    testkey = keys[i];
    processedKey = testkey.toLowerCase().replace(ignoredChar, '');
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}

function projStr(defData) {
  var self = {};
  var paramObj = defData.split('+').map(function(v) {
    return v.trim();
  }).filter(function(a) {
    return a;
  }).reduce(function(p, a) {
    var split = a.split('=');
    split.push(true);
    p[split[0].toLowerCase()] = split[1];
    return p;
  }, {});
  var paramName, paramVal, paramOutname;
  var params = {
    proj: 'projName',
    datum: 'datumCode',
    rf: function(v) {
      self.rf = parseFloat(v);
    },
    lat_0: function(v) {
      self.lat0 = v * D2R$1;
    },
    lat_1: function(v) {
      self.lat1 = v * D2R$1;
    },
    lat_2: function(v) {
      self.lat2 = v * D2R$1;
    },
    lat_ts: function(v) {
      self.lat_ts = v * D2R$1;
    },
    lon_0: function(v) {
      self.long0 = v * D2R$1;
    },
    lon_1: function(v) {
      self.long1 = v * D2R$1;
    },
    lon_2: function(v) {
      self.long2 = v * D2R$1;
    },
    alpha: function(v) {
      self.alpha = parseFloat(v) * D2R$1;
    },
    gamma: function(v) {
      self.rectified_grid_angle = parseFloat(v);
    },
    lonc: function(v) {
      self.longc = v * D2R$1;
    },
    x_0: function(v) {
      self.x0 = parseFloat(v);
    },
    y_0: function(v) {
      self.y0 = parseFloat(v);
    },
    k_0: function(v) {
      self.k0 = parseFloat(v);
    },
    k: function(v) {
      self.k0 = parseFloat(v);
    },
    a: function(v) {
      self.a = parseFloat(v);
    },
    b: function(v) {
      self.b = parseFloat(v);
    },
    r_a: function() {
      self.R_A = true;
    },
    zone: function(v) {
      self.zone = parseInt(v, 10);
    },
    south: function() {
      self.utmSouth = true;
    },
    towgs84: function(v) {
      self.datum_params = v.split(",").map(function(a) {
        return parseFloat(a);
      });
    },
    to_meter: function(v) {
      self.to_meter = parseFloat(v);
    },
    units: function(v) {
      self.units = v;
      var unit = match(units, v);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    },
    from_greenwich: function(v) {
      self.from_greenwich = v * D2R$1;
    },
    pm: function(v) {
      var pm = match(exports$2, v);
      self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R$1;
    },
    nadgrids: function(v) {
      if (v === '@null') {
        self.datumCode = 'none';
      }
      else {
        self.nadgrids = v;
      }
    },
    axis: function(v) {
      var legalAxis = "ewnsud";
      if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
        self.axis = v;
      }
    },
    approx: function() {
      self.approx = true;
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params) {
      paramOutname = params[paramName];
      if (typeof paramOutname === 'function') {
        paramOutname(paramVal);
      }
      else {
        self[paramOutname] = paramVal;
      }
    }
    else {
      self[paramName] = paramVal;
    }
  }
  if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
    self.datumCode = self.datumCode.toLowerCase();
  }
  return self;
}

var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84_]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
// const ignoredChar = /[\s_\-\/\(\)]/g;
function Parser(text) {
  if (typeof text !== 'string') {
    throw new Error('not a string');
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
Parser.prototype.readCharicter = function() {
  var char = this.text[this.place++];
  if (this.state !== QUOTED) {
    while (whitespace.test(char)) {
      if (this.place >= this.text.length) {
        return;
      }
      char = this.text[this.place++];
    }
  }
  switch (this.state) {
    case NEUTRAL:
      return this.neutral(char);
    case KEYWORD:
      return this.keyword(char)
    case QUOTED:
      return this.quoted(char);
    case AFTERQUOTE:
      return this.afterquote(char);
    case NUMBER:
      return this.number(char);
    case ENDED:
      return;
  }
};
Parser.prototype.afterquote = function(char) {
  if (char === '"') {
    this.word += '"';
    this.state = QUOTED;
    return;
  }
  if (endThings.test(char)) {
    this.word = this.word.trim();
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in afterquote yet, index ' + this.place);
};
Parser.prototype.afterItem = function(char) {
  if (char === ',') {
    if (this.word !== null) {
      this.currentObject.push(this.word);
    }
    this.word = null;
    this.state = NEUTRAL;
    return;
  }
  if (char === ']') {
    this.level--;
    if (this.word !== null) {
      this.currentObject.push(this.word);
      this.word = null;
    }
    this.state = NEUTRAL;
    this.currentObject = this.stack.pop();
    if (!this.currentObject) {
      this.state = ENDED;
    }

    return;
  }
};
Parser.prototype.number = function(char) {
  if (digets.test(char)) {
    this.word += char;
    return;
  }
  if (endThings.test(char)) {
    this.word = parseFloat(this.word);
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in number yet, index ' + this.place);
};
Parser.prototype.quoted = function(char) {
  if (char === '"') {
    this.state = AFTERQUOTE;
    return;
  }
  this.word += char;
  return;
};
Parser.prototype.keyword = function(char) {
  if (keyword.test(char)) {
    this.word += char;
    return;
  }
  if (char === '[') {
    var newObjects = [];
    newObjects.push(this.word);
    this.level++;
    if (this.root === null) {
      this.root = newObjects;
    } else {
      this.currentObject.push(newObjects);
    }
    this.stack.push(this.currentObject);
    this.currentObject = newObjects;
    this.state = NEUTRAL;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in keyword yet, index ' + this.place);
};
Parser.prototype.neutral = function(char) {
  if (latin.test(char)) {
    this.word = char;
    this.state = KEYWORD;
    return;
  }
  if (char === '"') {
    this.word = '';
    this.state = QUOTED;
    return;
  }
  if (digets.test(char)) {
    this.word = char;
    this.state = NUMBER;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error('havn\'t handled "' +char + '" in neutral yet, index ' + this.place);
};
Parser.prototype.output = function() {
  while (this.place < this.text.length) {
    this.readCharicter();
  }
  if (this.state === ENDED) {
    return this.root;
  }
  throw new Error('unable to parse string "' +this.text + '". State is ' + this.state);
};

function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}

function mapit(obj, key, value) {
  if (Array.isArray(key)) {
    value.unshift(key);
    key = null;
  }
  var thing = key ? {} : obj;

  var out = value.reduce(function(newObj, item) {
    sExpr(item, newObj);
    return newObj
  }, thing);
  if (key) {
    obj[key] = out;
  }
}

function sExpr(v, obj) {
  if (!Array.isArray(v)) {
    obj[v] = true;
    return;
  }
  var key = v.shift();
  if (key === 'PARAMETER') {
    key = v.shift();
  }
  if (v.length === 1) {
    if (Array.isArray(v[0])) {
      obj[key] = {};
      sExpr(v[0], obj[key]);
      return;
    }
    obj[key] = v[0];
    return;
  }
  if (!v.length) {
    obj[key] = true;
    return;
  }
  if (key === 'TOWGS84') {
    obj[key] = v;
    return;
  }
  if (key === 'AXIS') {
    if (!(key in obj)) {
      obj[key] = [];
    }
    obj[key].push(v);
    return;
  }
  if (!Array.isArray(key)) {
    obj[key] = {};
  }

  var i;
  switch (key) {
    case 'UNIT':
    case 'PRIMEM':
    case 'VERT_DATUM':
      obj[key] = {
        name: v[0].toLowerCase(),
        convert: v[1]
      };
      if (v.length === 3) {
        sExpr(v[2], obj[key]);
      }
      return;
    case 'SPHEROID':
    case 'ELLIPSOID':
      obj[key] = {
        name: v[0],
        a: v[1],
        rf: v[2]
      };
      if (v.length === 4) {
        sExpr(v[3], obj[key]);
      }
      return;
    case 'PROJECTEDCRS':
    case 'PROJCRS':
    case 'GEOGCS':
    case 'GEOCCS':
    case 'PROJCS':
    case 'LOCAL_CS':
    case 'GEODCRS':
    case 'GEODETICCRS':
    case 'GEODETICDATUM':
    case 'EDATUM':
    case 'ENGINEERINGDATUM':
    case 'VERT_CS':
    case 'VERTCRS':
    case 'VERTICALCRS':
    case 'COMPD_CS':
    case 'COMPOUNDCRS':
    case 'ENGINEERINGCRS':
    case 'ENGCRS':
    case 'FITTED_CS':
    case 'LOCAL_DATUM':
    case 'DATUM':
      v[0] = ['name', v[0]];
      mapit(obj, key, v);
      return;
    default:
      i = -1;
      while (++i < v.length) {
        if (!Array.isArray(v[i])) {
          return sExpr(v, obj[key]);
        }
      }
      return mapit(obj, key, v);
  }
}

var D2R = 0.01745329251994329577;



function rename(obj, params) {
  var outName = params[0];
  var inName = params[1];
  if (!(outName in obj) && (inName in obj)) {
    obj[outName] = obj[inName];
    if (params.length === 3) {
      obj[outName] = params[2](obj[outName]);
    }
  }
}

function d2r(input) {
  return input * D2R;
}

function cleanWKT(wkt) {
  if (wkt.type === 'GEOGCS') {
    wkt.projName = 'longlat';
  } else if (wkt.type === 'LOCAL_CS') {
    wkt.projName = 'identity';
    wkt.local = true;
  } else {
    if (typeof wkt.PROJECTION === 'object') {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.AXIS) {
    var axisOrder = '';
    for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
      var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
      if (axis[0].indexOf('north') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'north')) {
        axisOrder += 'n';
      } else if (axis[0].indexOf('south') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'south')) {
        axisOrder += 's';
      } else if (axis[0].indexOf('east') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'east')) {
        axisOrder += 'e';
      } else if (axis[0].indexOf('west') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'west')) {
        axisOrder += 'w';
      }
    }
    if (axisOrder.length === 2) {
      axisOrder += 'u';
    }
    if (axisOrder.length === 3) {
      wkt.axis = axisOrder;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === 'metre') {
      wkt.units = 'meter';
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === 'GEOGCS') {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === 'GEOGCS') {
    geogcs = wkt;
  }
  if (geogcs) {
    //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
    //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
    //}
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === 'd_') {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
      wkt.datumCode = 'nzgd49';
    }
    if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {
      if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
        wkt.sphere = true;
      }
      wkt.datumCode = 'wgs84';
    }
    if (wkt.datumCode.slice(-6) === '_ferro') {
      wkt.datumCode = wkt.datumCode.slice(0, - 6);
    }
    if (wkt.datumCode.slice(-8) === '_jakarta') {
      wkt.datumCode = wkt.datumCode.slice(0, - 8);
    }
    if (~wkt.datumCode.indexOf('belge')) {
      wkt.datumCode = 'rnb72';
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
      if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
        wkt.ellps = 'intl';
      }

      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
    }

    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf('osgb_1936')) {
      wkt.datumCode = 'osgb36';
    }
    if (~wkt.datumCode.indexOf('osni_1952')) {
      wkt.datumCode = 'osni52';
    }
    if (~wkt.datumCode.indexOf('tm65')
      || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
      wkt.datumCode = 'ire65';
    }
    if (wkt.datumCode === 'ch1903+') {
      wkt.datumCode = 'ch1903';
    }
    if (~wkt.datumCode.indexOf('israel')) {
      wkt.datumCode = 'isr93';
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }

  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  var renamer = function(a) {
    return rename(wkt, a);
  };
  var list = [
    ['standard_parallel_1', 'Standard_Parallel_1'],
    ['standard_parallel_1', 'Latitude of 1st standard parallel'],
    ['standard_parallel_2', 'Standard_Parallel_2'],
    ['standard_parallel_2', 'Latitude of 2nd standard parallel'],
    ['false_easting', 'False_Easting'],
    ['false_easting', 'False easting'],
    ['false-easting', 'Easting at false origin'],
    ['false_northing', 'False_Northing'],
    ['false_northing', 'False northing'],
    ['false_northing', 'Northing at false origin'],
    ['central_meridian', 'Central_Meridian'],
    ['central_meridian', 'Longitude of natural origin'],
    ['central_meridian', 'Longitude of false origin'],
    ['latitude_of_origin', 'Latitude_Of_Origin'],
    ['latitude_of_origin', 'Central_Parallel'],
    ['latitude_of_origin', 'Latitude of natural origin'],
    ['latitude_of_origin', 'Latitude of false origin'],
    ['scale_factor', 'Scale_Factor'],
    ['k0', 'scale_factor'],
    ['latitude_of_center', 'Latitude_Of_Center'],
    ['latitude_of_center', 'Latitude_of_center'],
    ['lat0', 'latitude_of_center', d2r],
    ['longitude_of_center', 'Longitude_Of_Center'],
    ['longitude_of_center', 'Longitude_of_center'],
    ['longc', 'longitude_of_center', d2r],
    ['x0', 'false_easting', toMeter],
    ['y0', 'false_northing', toMeter],
    ['long0', 'central_meridian', d2r],
    ['lat0', 'latitude_of_origin', d2r],
    ['lat0', 'standard_parallel_1', d2r],
    ['lat1', 'standard_parallel_1', d2r],
    ['lat2', 'standard_parallel_2', d2r],
    ['azimuth', 'Azimuth'],
    ['alpha', 'azimuth', d2r],
    ['srsCode', 'name']
  ];
  list.forEach(renamer);
  if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
  } else if (!wkt.lat_ts && wkt.lat0 && wkt.projName === 'Polar_Stereographic') {
    wkt.lat_ts = wkt.lat0;
    wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
  }
}
function wkt(wkt) {
  var lisp = parseString(wkt);
  var type = lisp.shift();
  var name = lisp.shift();
  lisp.unshift(['name', name]);
  lisp.unshift(['type', type]);
  var obj = {};
  sExpr(lisp, obj);
  cleanWKT(obj);
  return obj;
}

function defs(name) {
  /*global console*/
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === 'string') {
      if (def.charAt(0) === '+') {
        defs[name] = projStr(arguments[1]);
      }
      else {
        defs[name] = wkt(arguments[1]);
      }
    } else {
      defs[name] = def;
    }
  }
  else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v) {
        if (Array.isArray(v)) {
          defs.apply(that, v);
        }
        else {
          defs(v);
        }
      });
    }
    else if (typeof name === 'string') {
      if (name in defs) {
        return defs[name];
      }
    }
    else if ('EPSG' in name) {
      defs['EPSG:' + name.EPSG] = name;
    }
    else if ('ESRI' in name) {
      defs['ESRI:' + name.ESRI] = name;
    }
    else if ('IAU2000' in name) {
      defs['IAU2000:' + name.IAU2000] = name;
    }
    else {
      console.log(name);
    }
    return;
  }


}
globals(defs);

function testObj(code){
  return typeof code === 'string';
}
function testDef(code){
  return code in defs;
}
var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS','GEOCCS','PROJCS','LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
function testWKT(code){
  return codeWords.some(function (word) {
    return code.indexOf(word) > -1;
  });
}
var codes = ['3857', '900913', '3785', '102113'];
function checkMercator(item) {
  var auth = match(item, 'authority');
  if (!auth) {
    return;
  }
  var code = match(auth, 'epsg');
  return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
  var ext = match(item, 'extension');
  if (!ext) {
    return;
  }
  return match(ext, 'proj4');
}
function testProj(code){
  return code[0] === '+';
}
function parse(code){
  if (testObj(code)) {
    //check to see if this is a WKT string
    if (testDef(code)) {
      return defs[code];
    }
    if (testWKT(code)) {
      var out = wkt(code);
      // test of spetial case, due to this being a very common and often malformed
      if (checkMercator(out)) {
        return defs['EPSG:3857'];
      }
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        return projStr(maybeProjStr);
      }
      return out;
    }
    if (testProj(code)) {
      return projStr(code);
    }
  }else {
    return code;
  }
}

function extend(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== undefined) {
      destination[property] = value;
    }
  }
  return destination;
}

function msfnz(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / (Math.sqrt(1 - con * con));
}

function sign(x) {
  return x<0 ? -1 : 1;
}

function adjust_lon(x) {
  return (Math.abs(x) <= SPI) ? x : (x - (sign(x) * TWO_PI));
}

function tsfnz(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow(((1 - con) / (1 + con)), com);
  return (Math.tan(0.5 * (HALF_PI - phi)) / con);
}

function phi2z(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = HALF_PI - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }
  //console.log("phi2z has NoConvergence");
  return -9999;
}

function init$v() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if(!('x0' in this)){
    this.x0 = 0;
  }
  if(!('y0' in this)){
    this.y0 = 0;
  }
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    }
    else {
      this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  }
  else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      }
      else {
        this.k0 = 1;
      }
    }
  }
}

/* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

function forward$u(p) {
  var lon = p.x;
  var lat = p.y;
  // convert to radians
  if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
    return null;
  }

  var x, y;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    return null;
  }
  else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
    }
    else {
      var sinphi = Math.sin(lat);
      var ts = tsfnz(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p.x = x;
    p.y = y;
    return p;
  }
}

/* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
function inverse$u(p) {

  var x = p.x - this.x0;
  var y = p.y - this.y0;
  var lon, lat;

  if (this.sphere) {
    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  }
  else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = phi2z(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = adjust_lon(this.long0 + x / (this.a * this.k0));

  p.x = lon;
  p.y = lat;
  return p;
}

var names$w = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
var merc = {
  init: init$v,
  forward: forward$u,
  inverse: inverse$u,
  names: names$w
};

function init$u() {
  //no-op for longlat
}

function identity(pt) {
  return pt;
}
var names$v = ["longlat", "identity"];
var longlat = {
  init: init$u,
  forward: identity,
  inverse: identity,
  names: names$v
};

var projs = [merc, longlat];
var names$u = {};
var projStore = [];

function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names$u[n.toLowerCase()] = len;
  });
  return this;
}

function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names$u[n] !== 'undefined' && projStore[names$u[n]]) {
    return projStore[names$u[n]];
  }
}

function start() {
  projs.forEach(add);
}
var projections = {
  start: start,
  add: add,
  get: get
};

var exports$1 = {};
exports$1.MERIT = {
  a: 6378137.0,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};

exports$1.SGS85 = {
  a: 6378136.0,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};

exports$1.GRS80 = {
  a: 6378137.0,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};

exports$1.IAU76 = {
  a: 6378140.0,
  rf: 298.257,
  ellipseName: "IAU 1976"
};

exports$1.airy = {
  a: 6377563.396,
  b: 6356256.910,
  ellipseName: "Airy 1830"
};

exports$1.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};

exports$1.NWL9D = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};

exports$1.mod_airy = {
  a: 6377340.189,
  b: 6356034.446,
  ellipseName: "Modified Airy"
};

exports$1.andrae = {
  a: 6377104.43,
  rf: 300.0,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};

exports$1.aust_SA = {
  a: 6378160.0,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};

exports$1.GRS67 = {
  a: 6378160.0,
  rf: 298.2471674270,
  ellipseName: "GRS 67(IUGG 1967)"
};

exports$1.bessel = {
  a: 6377397.155,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};

exports$1.bess_nam = {
  a: 6377483.865,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};

exports$1.clrk66 = {
  a: 6378206.4,
  b: 6356583.8,
  ellipseName: "Clarke 1866"
};

exports$1.clrk80 = {
  a: 6378249.145,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};

exports$1.clrk80ign = {
  a: 6378249.2,
  b: 6356515,
  rf: 293.4660213,
  ellipseName: "Clarke 1880 (IGN)"
};

exports$1.clrk58 = {
  a: 6378293.645208759,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};

exports$1.CPM = {
  a: 6375738.7,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};

exports$1.delmbr = {
  a: 6376428.0,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};

exports$1.engelis = {
  a: 6378136.05,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};

exports$1.evrst30 = {
  a: 6377276.345,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};

exports$1.evrst48 = {
  a: 6377304.063,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};

exports$1.evrst56 = {
  a: 6377301.243,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};

exports$1.evrst69 = {
  a: 6377295.664,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};

exports$1.evrstSS = {
  a: 6377298.556,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};

exports$1.fschr60 = {
  a: 6378166.0,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};

exports$1.fschr60m = {
  a: 6378155.0,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};

exports$1.fschr68 = {
  a: 6378150.0,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};

exports$1.helmert = {
  a: 6378200.0,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};

exports$1.hough = {
  a: 6378270.0,
  rf: 297.0,
  ellipseName: "Hough"
};

exports$1.intl = {
  a: 6378388.0,
  rf: 297.0,
  ellipseName: "International 1909 (Hayford)"
};

exports$1.kaula = {
  a: 6378163.0,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};

exports$1.lerch = {
  a: 6378139.0,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};

exports$1.mprts = {
  a: 6397300.0,
  rf: 191.0,
  ellipseName: "Maupertius 1738"
};

exports$1.new_intl = {
  a: 6378157.5,
  b: 6356772.2,
  ellipseName: "New International 1967"
};

exports$1.plessis = {
  a: 6376523.0,
  rf: 6355863.0,
  ellipseName: "Plessis 1817 (France)"
};

exports$1.krass = {
  a: 6378245.0,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};

exports$1.SEasia = {
  a: 6378155.0,
  b: 6356773.3205,
  ellipseName: "Southeast Asia"
};

exports$1.walbeck = {
  a: 6376896.0,
  b: 6355834.8467,
  ellipseName: "Walbeck"
};

exports$1.WGS60 = {
  a: 6378165.0,
  rf: 298.3,
  ellipseName: "WGS 60"
};

exports$1.WGS66 = {
  a: 6378145.0,
  rf: 298.25,
  ellipseName: "WGS 66"
};

exports$1.WGS7 = {
  a: 6378135.0,
  rf: 298.26,
  ellipseName: "WGS 72"
};

var WGS84 = exports$1.WGS84 = {
  a: 6378137.0,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};

exports$1.sphere = {
  a: 6370997.0,
  b: 6370997.0,
  ellipseName: "Normal Sphere (r=6370997)"
};

function eccentricity(a, b, rf, R_A) {
  var a2 = a * a; // used in geocentric
  var b2 = b * b; // used in geocentric
  var es = (a2 - b2) / a2; // e ^ 2
  var e = 0;
  if (R_A) {
    a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
    a2 = a * a;
    es = 0;
  } else {
    e = Math.sqrt(es); // eccentricity
  }
  var ep2 = (a2 - b2) / b2; // used in geocentric
  return {
    es: es,
    e: e,
    ep2: ep2
  };
}
function sphere(a, b, rf, ellps, sphere) {
  if (!a) { // do we have an ellipsoid?
    var ellipse = match(exports$1, ellps);
    if (!ellipse) {
      ellipse = WGS84;
    }
    a = ellipse.a;
    b = ellipse.b;
    rf = ellipse.rf;
  }

  if (rf && !b) {
    b = (1.0 - 1.0 / rf) * a;
  }
  if (rf === 0 || Math.abs(a - b) < EPSLN) {
    sphere = true;
    b = a;
  }
  return {
    a: a,
    b: b,
    rf: rf,
    sphere: sphere
  };
}

var exports = {};
exports.wgs84 = {
  towgs84: "0,0,0",
  ellipse: "WGS84",
  datumName: "WGS84"
};

exports.ch1903 = {
  towgs84: "674.374,15.056,405.346",
  ellipse: "bessel",
  datumName: "swiss"
};

exports.ggrs87 = {
  towgs84: "-199.87,74.79,246.62",
  ellipse: "GRS80",
  datumName: "Greek_Geodetic_Reference_System_1987"
};

exports.nad83 = {
  towgs84: "0,0,0",
  ellipse: "GRS80",
  datumName: "North_American_Datum_1983"
};

exports.nad27 = {
  nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
  ellipse: "clrk66",
  datumName: "North_American_Datum_1927"
};

exports.potsdam = {
  towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
  ellipse: "bessel",
  datumName: "Potsdam Rauenberg 1950 DHDN"
};

exports.carthage = {
  towgs84: "-263.0,6.0,431.0",
  ellipse: "clark80",
  datumName: "Carthage 1934 Tunisia"
};

exports.hermannskogel = {
  towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
  ellipse: "bessel",
  datumName: "Hermannskogel"
};

exports.militargeographische_institut = {
  towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
  ellipse: "bessel",
  datumName: "Militar-Geographische Institut"
};

exports.osni52 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "airy",
  datumName: "Irish National"
};

exports.ire65 = {
  towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
  ellipse: "mod_airy",
  datumName: "Ireland 1965"
};

exports.rassadiran = {
  towgs84: "-133.63,-157.5,-158.62",
  ellipse: "intl",
  datumName: "Rassadiran"
};

exports.nzgd49 = {
  towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
  ellipse: "intl",
  datumName: "New Zealand Geodetic Datum 1949"
};

exports.osgb36 = {
  towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
  ellipse: "airy",
  datumName: "Airy 1830"
};

exports.s_jtsk = {
  towgs84: "589,76,480",
  ellipse: 'bessel',
  datumName: 'S-JTSK (Ferro)'
};

exports.beduaram = {
  towgs84: '-106,-87,188',
  ellipse: 'clrk80',
  datumName: 'Beduaram'
};

exports.gunung_segara = {
  towgs84: '-403,684,41',
  ellipse: 'bessel',
  datumName: 'Gunung Segara Jakarta'
};

exports.rnb72 = {
  towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
  ellipse: "intl",
  datumName: "Reseau National Belge 1972"
};

function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
  var out = {};

  if (datumCode === undefined || datumCode === 'none') {
    out.datum_type = PJD_NODATUM;
  } else {
    out.datum_type = PJD_WGS84;
  }

  if (datum_params) {
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = PJD_3PARAM;
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = PJD_7PARAM;
        out.datum_params[3] *= SEC_TO_RAD;
        out.datum_params[4] *= SEC_TO_RAD;
        out.datum_params[5] *= SEC_TO_RAD;
        out.datum_params[6] = (out.datum_params[6] / 1000000.0) + 1.0;
      }
    }
  }

  if (nadgrids) {
    out.datum_type = PJD_GRIDSHIFT;
    out.grids = nadgrids;
  }
  out.a = a; //datum object also uses these values
  out.b = b;
  out.es = es;
  out.ep2 = ep2;
  return out;
}

/**
 * Resources for details of NTv2 file formats:
 * - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
 * - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
 */

var loadedNadgrids = {};

/**
 * Load a binary NTv2 file (.gsb) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
 * as an ArrayBuffer.
 */
function nadgrid(key, data) {
  var view = new DataView(data);
  var isLittleEndian = detectLittleEndian(view);
  var header = readHeader(view, isLittleEndian);
  var subgrids = readSubgrids(view, header, isLittleEndian);
  var nadgrid = {header: header, subgrids: subgrids};
  loadedNadgrids[key] = nadgrid;
  return nadgrid;
}

/**
 * Given a proj4 value for nadgrids, return an array of loaded grids
 */
function getNadgrids(nadgrids) {
  // Format details: http://proj.maptools.org/gen_parms.html
  if (nadgrids === undefined) { return null; }
  var grids = nadgrids.split(',');
  return grids.map(parseNadgridString);
}

function parseNadgridString(value) {
  if (value.length === 0) {
    return null;
  }
  var optional = value[0] === '@';
  if (optional) {
    value = value.slice(1);
  }
  if (value === 'null') {
    return {name: 'null', mandatory: !optional, grid: null, isNull: true};
  }
  return {
    name: value,
    mandatory: !optional,
    grid: loadedNadgrids[value] || null,
    isNull: false
  };
}

function secondsToRadians(seconds) {
  return (seconds / 3600) * Math.PI / 180;
}

function detectLittleEndian(view) {
  var nFields = view.getInt32(8, false);
  if (nFields === 11) {
    return false;
  }
  nFields = view.getInt32(8, true);
  if (nFields !== 11) {
    console.warn('Failed to detect nadgrid endian-ness, defaulting to little-endian');
  }
  return true;
}

function readHeader(view, isLittleEndian) {
  return {
    nFields: view.getInt32(8, isLittleEndian),
    nSubgridFields: view.getInt32(24, isLittleEndian),
    nSubgrids: view.getInt32(40, isLittleEndian),
    shiftType: decodeString(view, 56, 56 + 8).trim(),
    fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
    fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
    toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
    toSemiMinorAxis: view.getFloat64(168, isLittleEndian),
  };
}

function decodeString(view, start, end) {
  return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)));
}

function readSubgrids(view, header, isLittleEndian) {
  var gridOffset = 176;
  var grids = [];
  for (var i = 0; i < header.nSubgrids; i++) {
    var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
    var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
    var lngColumnCount = Math.round(
      1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
    var latColumnCount = Math.round(
      1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
    // Proj4 operates on radians whereas the coordinates are in seconds in the grid
    grids.push({
      ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
      del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
      lim: [lngColumnCount, latColumnCount],
      count: subHeader.gridNodeCount,
      cvs: mapNodes(nodes)
    });
    gridOffset += 176 + subHeader.gridNodeCount * 16;
  }
  return grids;
}

function mapNodes(nodes) {
  return nodes.map(function (r) {return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];});
}

function readGridHeader(view, offset, isLittleEndian) {
  return {
    name: decodeString(view, offset + 8, offset + 16).trim(),
    parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
    lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
    upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
    lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
    upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
    latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
    longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
    gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
  };
}

function readGridNodes(view, offset, gridHeader, isLittleEndian) {
  var nodesOffset = offset + 176;
  var gridRecordLength = 16;
  var gridShiftRecords = [];
  for (var i = 0; i < gridHeader.gridNodeCount; i++) {
    var record = {
      latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
      longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
      latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
      longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian),
    };
    gridShiftRecords.push(record);
  }
  return gridShiftRecords;
}

function Projection(srsCode,callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  callback = callback || function(error){
    if(error){
      throw error;
    }
  };
  var json = parse(srsCode);
  if(typeof json !== 'object'){
    callback(srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if(!ourProj){
    callback(srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== 'none') {
    var datumDef = match(exports, json.datumCode);
    if (datumDef) {
      json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(',') : null);
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.k0 = json.k0 || 1.0;
  json.axis = json.axis || 'enu';
  json.ellps = json.ellps || 'wgs84';
  json.lat1 = json.lat1 || json.lat0; // Lambert_Conformal_Conic_1SP, for example, needs this

  var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var nadgrids = getNadgrids(json.nadgrids);
  var datumObj = json.datum || datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2,
    nadgrids);

  extend(this, json); // transfer everything over from the projection because we don't know what we'll need
  extend(this, ourProj); // transfer all the methods from the projection

  // copy the 4 things over we calculated in deriveConstants.sphere
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;

  // copy the 3 things we calculated in deriveConstants.eccentricity
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;

  // add in the datum object
  this.datum = datumObj;

  // init the projection
  this.init();

  // legecy callback from back in the day when it went to spatialreference.org
  callback(null, this);

}
Projection.projections = projections;
Projection.projections.start();

function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false; // false, datums are not equal
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
    // the tolerance for es is to ensure that GRS80 and WGS84
    // are considered identical
    return false;
  } else if (source.datum_type === PJD_3PARAM) {
    return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
  } else if (source.datum_type === PJD_7PARAM) {
    return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
  } else {
    return true; // datums are equal
  }
} // cs_compare_datums()

/*
 * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
 * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
 * according to the current ellipsoid parameters.
 *
 *    Latitude  : Geodetic latitude in radians                     (input)
 *    Longitude : Geodetic longitude in radians                    (input)
 *    Height    : Geodetic height, in meters                       (input)
 *    X         : Calculated Geocentric X coordinate, in meters    (output)
 *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
 *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
 *
 */
function geodeticToGeocentric(p, es, a) {
  var Longitude = p.x;
  var Latitude = p.y;
  var Height = p.z ? p.z : 0; //Z value not always supplied

  var Rn; /*  Earth radius at location  */
  var Sin_Lat; /*  Math.sin(Latitude)  */
  var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
  var Cos_Lat; /*  Math.cos(Latitude)  */

  /*
   ** Don't blow up if Latitude is just a little out of the value
   ** range as it may just be a rounding issue.  Also removed longitude
   ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
   */
  if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
    Latitude = -HALF_PI;
  } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
    Latitude = HALF_PI;
  } else if (Latitude < -HALF_PI) {
    /* Latitude out of range */
    //..reportError('geocent:lat out of range:' + Latitude);
    return { x: -Infinity, y: -Infinity, z: p.z };
  } else if (Latitude > HALF_PI) {
    /* Latitude out of range */
    return { x: Infinity, y: Infinity, z: p.z };
  }

  if (Longitude > Math.PI) {
    Longitude -= (2 * Math.PI);
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: ((Rn * (1 - es)) + Height) * Sin_Lat
  };
} // cs_geodetic_to_geocentric()

function geocentricToGeodetic(p, es, a, b) {
  /* local defintions and variables */
  /* end-criterium of loop, accuracy of sin(Latitude) */
  var genau = 1e-12;
  var genau2 = (genau * genau);
  var maxiter = 30;

  var P; /* distance between semi-minor axis and location */
  var RR; /* distance between center and location */
  var CT; /* sin of geocentric latitude */
  var ST; /* cos of geocentric latitude */
  var RX;
  var RK;
  var RN; /* Earth radius at location */
  var CPHI0; /* cos of start or old geodetic latitude in iterations */
  var SPHI0; /* sin of start or old geodetic latitude in iterations */
  var CPHI; /* cos of searched geodetic latitude */
  var SPHI; /* sin of searched geodetic latitude */
  var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
  var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

  var X = p.x;
  var Y = p.y;
  var Z = p.z ? p.z : 0.0; //Z value not always supplied
  var Longitude;
  var Latitude;
  var Height;

  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z * Z);

  /*      special cases for latitude and longitude */
  if (P / a < genau) {

    /*  special case, if P=0. (X=0., Y=0.) */
    Longitude = 0.0;

    /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
     *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
    if (RR / a < genau) {
      Latitude = HALF_PI;
      Height = -b;
      return {
        x: p.x,
        y: p.y,
        z: p.z
      };
    }
  } else {
    /*  ellipsoidal (geodetic) longitude
     *  interval: -PI < Longitude <= +PI */
    Longitude = Math.atan2(Y, X);
  }

  /* --------------------------------------------------------------
   * Following iterative algorithm was developped by
   * "Institut for Erdmessung", University of Hannover, July 1988.
   * Internet: www.ife.uni-hannover.de
   * Iterative computation of CPHI,SPHI and Height.
   * Iteration of CPHI and SPHI to 10**-12 radian resp.
   * 2*10**-7 arcsec.
   * --------------------------------------------------------------
   */
  CT = Z / RR;
  ST = P / RR;
  RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
  CPHI0 = ST * (1.0 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;

  /* loop to find sin(Latitude) resp. Latitude
   * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
  do {
    iter++;
    RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

    /*  ellipsoidal (geodetic) height */
    Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);

    RK = es * RN / (RN + Height);
    RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
    CPHI = ST * (1.0 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  }
  while (SDPHI * SDPHI > genau2 && iter < maxiter);

  /*      ellipsoidal (geodetic) latitude */
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
} // cs_geocentric_to_geodetic()

/****************************************************************/
// pj_geocentic_to_wgs84( p )
//  p = point to transform in geocentric coordinates (x,y,z)


/** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
function geocentricToWgs84(p, datum_type, datum_params) {

  if (datum_type === PJD_3PARAM) {
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x + datum_params[0],
      y: p.y + datum_params[1],
      z: p.z + datum_params[2],
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    // if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
      y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
    };
  }
} // cs_geocentric_to_wgs84

/****************************************************************/
// pj_geocentic_from_wgs84()
//  coordinate system definition,
//  point to transform in geocentric coordinates (x,y,z)
function geocentricFromWgs84(p, datum_type, datum_params) {

  if (datum_type === PJD_3PARAM) {
    //if( x[io] === HUGE_VAL )
    //    continue;
    return {
      x: p.x - datum_params[0],
      y: p.y - datum_params[1],
      z: p.z - datum_params[2],
    };

  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p.x - Dx_BF) / M_BF;
    var y_tmp = (p.y - Dy_BF) / M_BF;
    var z_tmp = (p.z - Dz_BF) / M_BF;
    //if( x[io] === HUGE_VAL )
    //    continue;

    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  } //cs_geocentric_from_wgs84()
}

function checkParams(type) {
  return (type === PJD_3PARAM || type === PJD_7PARAM);
}

function datum_transform(source, dest, point) {
  // Short cut if the datums are identical.
  if (compareDatums(source, dest)) {
    return point; // in this case, zero is sucess,
    // whereas cs_compare_datums returns 1 to indicate TRUE
    // confusing, should fix this
  }

  // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
  if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
    return point;
  }

  // If this datum requires grid shifts, then apply it to geodetic coordinates.
  var source_a = source.a;
  var source_es = source.es;
  if (source.datum_type === PJD_GRIDSHIFT) {
    var gridShiftCode = applyGridShift(source, false, point);
    if (gridShiftCode !== 0) {
      return undefined;
    }
    source_a = SRS_WGS84_SEMIMAJOR;
    source_es = SRS_WGS84_ESQUARED;
  }

  var dest_a = dest.a;
  var dest_b = dest.b;
  var dest_es = dest.es;
  if (dest.datum_type === PJD_GRIDSHIFT) {
    dest_a = SRS_WGS84_SEMIMAJOR;
    dest_b = SRS_WGS84_SEMIMINOR;
    dest_es = SRS_WGS84_ESQUARED;
  }

  // Do we need to go through geocentric coordinates?
  if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) &&  !checkParams(dest.datum_type)) {
    return point;
  }

  // Convert to geocentric coordinates.
  point = geodeticToGeocentric(point, source_es, source_a);
  // Convert between datums
  if (checkParams(source.datum_type)) {
    point = geocentricToWgs84(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
  }
  point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);

  if (dest.datum_type === PJD_GRIDSHIFT) {
    var destGridShiftResult = applyGridShift(dest, true, point);
    if (destGridShiftResult !== 0) {
      return undefined;
    }
  }

  return point;
}

function applyGridShift(source, inverse, point) {
  if (source.grids === null || source.grids.length === 0) {
    console.log('Grid shift grids not found');
    return -1;
  }
  var input = {x: -point.x, y: point.y};
  var output = {x: Number.NaN, y: Number.NaN};
  var attemptedGrids = [];
  outer:
  for (var i = 0; i < source.grids.length; i++) {
    var grid = source.grids[i];
    attemptedGrids.push(grid.name);
    if (grid.isNull) {
      output = input;
      break;
    }
    grid.mandatory;
    if (grid.grid === null) {
      if (grid.mandatory) {
        console.log("Unable to find mandatory grid '" + grid.name + "'");
        return -1;
      }
      continue;
    }
    var subgrids = grid.grid.subgrids;
    for (var j = 0, jj = subgrids.length; j < jj; j++) {
      var subgrid = subgrids[j];
      // skip tables that don't match our point at all
      var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0;
      var minX = subgrid.ll[0] - epsilon;
      var minY = subgrid.ll[1] - epsilon;
      var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
      var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
      if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x ) {
        continue;
      }
      output = applySubgridShift(input, inverse, subgrid);
      if (!isNaN(output.x)) {
        break outer;
      }
    }
  }
  if (isNaN(output.x)) {
    console.log("Failed to find a grid shift table for location '"+
      -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
    return -1;
  }
  point.x = -output.x;
  point.y = output.y;
  return 0;
}

function applySubgridShift(pin, inverse, ct) {
  var val = {x: Number.NaN, y: Number.NaN};
  if (isNaN(pin.x)) { return val; }
  var tb = {x: pin.x, y: pin.y};
  tb.x -= ct.ll[0];
  tb.y -= ct.ll[1];
  tb.x = adjust_lon(tb.x - Math.PI) + Math.PI;
  var t = nadInterpolate(tb, ct);
  if (inverse) {
    if (isNaN(t.x)) {
      return val;
    }
    t.x = tb.x - t.x;
    t.y = tb.y - t.y;
    var i = 9, tol = 1e-12;
    var dif, del;
    do {
      del = nadInterpolate(t, ct);
      if (isNaN(del.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      dif = {x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y)};
      t.x += dif.x;
      t.y += dif.y;
    } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
    if (i < 0) {
      console.log("Inverse grid shift iterator failed to converge.");
      return val;
    }
    val.x = adjust_lon(t.x + ct.ll[0]);
    val.y = t.y + ct.ll[1];
  } else {
    if (!isNaN(t.x)) {
      val.x = pin.x + t.x;
      val.y = pin.y + t.y;
    }
  }
  return val;
}

function nadInterpolate(pin, ct) {
  var t = {x: pin.x / ct.del[0], y: pin.y / ct.del[1]};
  var indx = {x: Math.floor(t.x), y: Math.floor(t.y)};
  var frct = {x: t.x - 1.0 * indx.x, y: t.y - 1.0 * indx.y};
  var val= {x: Number.NaN, y: Number.NaN};
  var inx;
  if (indx.x < 0 || indx.x >= ct.lim[0]) {
    return val;
  }
  if (indx.y < 0 || indx.y >= ct.lim[1]) {
    return val;
  }
  inx = (indx.y * ct.lim[0]) + indx.x;
  var f00 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  inx++;
  var f10= {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  inx += ct.lim[0];
  var f11 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  inx--;
  var f01 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
  var m11 = frct.x * frct.y, m10 = frct.x * (1.0 - frct.y),
    m00 = (1.0 - frct.x) * (1.0 - frct.y), m01 = (1.0 - frct.x) * frct.y;
  val.x = (m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x);
  val.y = (m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y);
  return val;
}

function adjust_axis(crs, denorm, point) {
  var xin = point.x,
    yin = point.y,
    zin = point.z || 0.0;
  var v, t, i;
  var out = {};
  for (i = 0; i < 3; i++) {
    if (denorm && i === 2 && point.z === undefined) {
      continue;
    }
    if (i === 0) {
      v = xin;
      if ("ew".indexOf(crs.axis[i]) !== -1) {
        t = 'x';
      } else {
        t = 'y';
      }

    }
    else if (i === 1) {
      v = yin;
      if ("ns".indexOf(crs.axis[i]) !== -1) {
        t = 'y';
      } else {
        t = 'x';
      }
    }
    else {
      v = zin;
      t = 'z';
    }
    switch (crs.axis[i]) {
    case 'e':
      out[t] = v;
      break;
    case 'w':
      out[t] = -v;
      break;
    case 'n':
      out[t] = v;
      break;
    case 's':
      out[t] = -v;
      break;
    case 'u':
      if (point[t] !== undefined) {
        out.z = v;
      }
      break;
    case 'd':
      if (point[t] !== undefined) {
        out.z = -v;
      }
      break;
    default:
      //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
      return null;
    }
  }
  return out;
}

function common (array){
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length>2) {
    out.z = array[2];
  }
  if (array.length>3) {
    out.m = array[3];
  }
  return out;
}

function checkSanity (point) {
  checkCoord(point.x);
  checkCoord(point.y);
}
function checkCoord(num) {
  if (typeof Number.isFinite === 'function') {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError('coordinates must be finite numbers');
  }
  if (typeof num !== 'number' || num !== num || !isFinite(num)) {
    throw new TypeError('coordinates must be finite numbers');
  }
}

function checkNotWGS(source, dest) {
  return (
    (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== 'WGS84') ||
    ((dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== 'WGS84');
}

function transform(source, dest, point, enforceAxis) {
  var wgs84;
  if (Array.isArray(point)) {
    point = common(point);
  } else {
    // Clone the point object so inputs don't get modified
    point = {
      x: point.x,
      y: point.y,
      z: point.z,
      m: point.m
    };
  }
  var hasZ = point.z !== undefined;
  checkSanity(point);
  // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    wgs84 = new Projection('WGS84');
    point = transform(source, wgs84, point, enforceAxis);
    source = wgs84;
  }
  // DGR, 2010/11/12
  if (enforceAxis && source.axis !== 'enu') {
    point = adjust_axis(source, false, point);
  }
  // Transform source points to long/lat, if they aren't already.
  if (source.projName === 'longlat') {
    point = {
      x: point.x * D2R$1,
      y: point.y * D2R$1,
      z: point.z || 0
    };
  } else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter,
        z: point.z || 0
      };
    }
    point = source.inverse(point); // Convert Cartesian to longlat
    if (!point) {
      return;
    }
  }
  // Adjust for the prime meridian if necessary
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }

  // Convert datums if needed, and if possible.
  point = datum_transform(source.datum, dest.datum, point);
  if (!point) {
    return;
  }

  // Adjust for the prime meridian if necessary
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y,
      z: point.z || 0
    };
  }

  if (dest.projName === 'longlat') {
    // convert radians to decimal degrees
    point = {
      x: point.x * R2D,
      y: point.y * R2D,
      z: point.z || 0
    };
  } else { // else project
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter,
        z: point.z || 0
      };
    }
  }

  // DGR, 2010/11/12
  if (enforceAxis && dest.axis !== 'enu') {
    return adjust_axis(dest, true, point);
  }

  if (point && !hasZ) {
    delete point.z;
  }
  return point;
}

var wgs84 = Projection('WGS84');

function transformer(from, to, coords, enforceAxis) {
  var transformedArray, out, keys;
  if (Array.isArray(coords)) {
    transformedArray = transform(from, to, coords, enforceAxis) || {x: NaN, y: NaN};
    if (coords.length > 2) {
      if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
        if (typeof transformedArray.z === 'number') {
          return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
        } else {
          return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
        }
      } else {
        return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
      }
    } else {
      return [transformedArray.x, transformedArray.y];
    }
  } else {
    out = transform(from, to, coords, enforceAxis);
    keys = Object.keys(coords);
    if (keys.length === 2) {
      return out;
    }
    keys.forEach(function (key) {
      if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
        if (key === 'x' || key === 'y' || key === 'z') {
          return;
        }
      } else {
        if (key === 'x' || key === 'y') {
          return;
        }
      }
      out[key] = coords[key];
    });
    return out;
  }
}

function checkProj(item) {
  if (item instanceof Projection) {
    return item;
  }
  if (item.oProj) {
    return item.oProj;
  }
  return Projection(item);
}

function proj4(fromProj, toProj, coord) {
  fromProj = checkProj(fromProj);
  var single = false;
  var obj;
  if (typeof toProj === 'undefined') {
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  } else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
    coord = toProj;
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  toProj = checkProj(toProj);
  if (coord) {
    return transformer(fromProj, toProj, coord);
  } else {
    obj = {
      forward: function (coords, enforceAxis) {
        return transformer(fromProj, toProj, coords, enforceAxis);
      },
      inverse: function (coords, enforceAxis) {
        return transformer(toProj, fromProj, coords, enforceAxis);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}

/**
 * UTM zones are grouped, and assigned to one of a group of 6
 * sets.
 *
 * {int} @private
 */
var NUM_100K_SETS = 6;

/**
 * The column letters (for easting) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

/**
 * The row letters (for northing) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

var A$1 = 65; // A
var I = 73; // I
var O = 79; // O
var V = 86; // V
var Z = 90; // Z
var mgrs = {
  forward: forward$t,
  inverse: inverse$t,
  toPoint: toPoint
};
/**
 * Conversion of lat/lon to MGRS.
 *
 * @param {object} ll Object literal with lat and lon properties on a
 *     WGS84 ellipsoid.
 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
 *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
 * @return {string} the MGRS string for the given location and accuracy.
 */
function forward$t(ll, accuracy) {
  accuracy = accuracy || 5; // default accuracy 1m
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
}
/**
 * Conversion of MGRS to lat/lon.
 *
 * @param {string} mgrs MGRS string.
 * @return {array} An array with left (longitude), bottom (latitude), right
 *     (longitude) and top (latitude) values in WGS84, representing the
 *     bounding box for the provided MGRS reference.
 */
function inverse$t(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
}
function toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}/**
 * Conversion from degrees to radians.
 *
 * @private
 * @param {number} deg the angle in degrees.
 * @return {number} the angle in radians.
 */
function degToRad(deg) {
  return (deg * (Math.PI / 180.0));
}

/**
 * Conversion from radians to degrees.
 *
 * @private
 * @param {number} rad the angle in radians.
 * @return {number} the angle in degrees.
 */
function radToDeg(rad) {
  return (180.0 * (rad / Math.PI));
}

/**
 * Converts a set of Longitude and Latitude co-ordinates to UTM
 * using the WGS84 ellipsoid.
 *
 * @private
 * @param {object} ll Object literal with lat and lon properties
 *     representing the WGS84 coordinate to be converted.
 * @return {object} Object literal containing the UTM value with easting,
 *     northing, zoneNumber and zoneLetter properties, and an optional
 *     accuracy property in digits. Returns null if the conversion failed.
 */
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A, M;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  //Make sure the longitude 180.00 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72.0 && Lat < 84.0) {
    if (Long >= 0.0 && Long < 9.0) {
      ZoneNumber = 31;
    }
    else if (Long >= 9.0 && Long < 21.0) {
      ZoneNumber = 33;
    }
    else if (Long >= 21.0 && Long < 33.0) {
      ZoneNumber = 35;
    }
    else if (Long >= 33.0 && Long < 42.0) {
      ZoneNumber = 37;
    }
  }

  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
  // in middle of
  // zone
  LongOriginRad = degToRad(LongOrigin);

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A = Math.cos(LatRad) * (LongRad - LongOriginRad);

  M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

  var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

  var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
  if (Lat < 0.0) {
    UTMNorthing += 10000000.0; //10000000 meter offset for
    // southern hemisphere
  }

  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}

/**
 * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
 * class where the Zone can be specified as a single string eg."60N" which
 * is then broken down into the ZoneNumber and ZoneLetter.
 *
 * @private
 * @param {object} utm An object literal with northing, easting, zoneNumber
 *     and zoneLetter properties. If an optional accuracy property is
 *     provided (in meters), a bounding box will be returned instead of
 *     latitude and longitude.
 * @return {object} An object literal containing either lat and lon values
 *     (if no accuracy was provided), or top, right, bottom and left values
 *     for the bounding box calculated according to the provided accuracy.
 *     Returns null if the conversion failed.
 */
function UTMtoLL(utm) {

  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  // check the ZoneNummber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }

  var k0 = 0.9996;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C1, R1, D, M;
  var LongOrigin;
  var mu, phi1Rad;

  // remove 500,000 meter offset for longitude
  var x = UTMEasting - 500000.0;
  var y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000.0; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  M = y / k0;
  mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);

  var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);

  var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);

  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  }
  else {
    result = {
      lat: lat,
      lon: lon
    };
  }
  return result;
}

/**
 * Calculates the MGRS letter designator for the given latitude.
 *
 * @private
 * @param {number} lat The latitude in WGS84 to get the letter designator
 *     for.
 * @return {char} The letter designator.
 */
function getLetterDesignator(lat) {
  //This is here as an error flag to show that the Latitude is
  //outside MGRS limits
  var LetterDesignator = 'Z';

  if ((84 >= lat) && (lat >= 72)) {
    LetterDesignator = 'X';
  }
  else if ((72 > lat) && (lat >= 64)) {
    LetterDesignator = 'W';
  }
  else if ((64 > lat) && (lat >= 56)) {
    LetterDesignator = 'V';
  }
  else if ((56 > lat) && (lat >= 48)) {
    LetterDesignator = 'U';
  }
  else if ((48 > lat) && (lat >= 40)) {
    LetterDesignator = 'T';
  }
  else if ((40 > lat) && (lat >= 32)) {
    LetterDesignator = 'S';
  }
  else if ((32 > lat) && (lat >= 24)) {
    LetterDesignator = 'R';
  }
  else if ((24 > lat) && (lat >= 16)) {
    LetterDesignator = 'Q';
  }
  else if ((16 > lat) && (lat >= 8)) {
    LetterDesignator = 'P';
  }
  else if ((8 > lat) && (lat >= 0)) {
    LetterDesignator = 'N';
  }
  else if ((0 > lat) && (lat >= -8)) {
    LetterDesignator = 'M';
  }
  else if ((-8 > lat) && (lat >= -16)) {
    LetterDesignator = 'L';
  }
  else if ((-16 > lat) && (lat >= -24)) {
    LetterDesignator = 'K';
  }
  else if ((-24 > lat) && (lat >= -32)) {
    LetterDesignator = 'J';
  }
  else if ((-32 > lat) && (lat >= -40)) {
    LetterDesignator = 'H';
  }
  else if ((-40 > lat) && (lat >= -48)) {
    LetterDesignator = 'G';
  }
  else if ((-48 > lat) && (lat >= -56)) {
    LetterDesignator = 'F';
  }
  else if ((-56 > lat) && (lat >= -64)) {
    LetterDesignator = 'E';
  }
  else if ((-64 > lat) && (lat >= -72)) {
    LetterDesignator = 'D';
  }
  else if ((-72 > lat) && (lat >= -80)) {
    LetterDesignator = 'C';
  }
  return LetterDesignator;
}

/**
 * Encodes a UTM location as MGRS string.
 *
 * @private
 * @param {object} utm An object literal with easting, northing,
 *     zoneLetter, zoneNumber
 * @param {number} accuracy Accuracy in digits (1-5).
 * @return {string} MGRS string for the given UTM location.
 */
function encode(utm, accuracy) {
  // prepend with leading zeroes
  var seasting = "00000" + utm.easting,
    snorthing = "00000" + utm.northing;

  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}

/**
 * Get the two letter 100k designator for a given UTM easting,
 * northing and zone number value.
 *
 * @private
 * @param {number} easting
 * @param {number} northing
 * @param {number} zoneNumber
 * @return the two letter 100k designator for the given UTM location.
 */
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 100000);
  var setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}

/**
 * Given a UTM zone number, figure out the MGRS 100K set it is in.
 *
 * @private
 * @param {number} i An UTM zone number.
 * @return {number} the 100k set the UTM zone is in.
 */
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }

  return setParm;
}

/**
 * Get the two-letter MGRS 100k designator given information
 * translated from the UTM northing, easting and zone number.
 *
 * @private
 * @param {number} column the column index as it relates to the MGRS
 *        100k set spreadsheet, created from the UTM easting.
 *        Values are 1-8.
 * @param {number} row the row index as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM northing value. Values
 *        are from 0-19.
 * @param {number} parm the set block, as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM zone. Values are from
 *        1-60.
 * @return two letter MGRS 100k code.
 */
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;

  if (colInt > Z) {
    colInt = colInt - Z + A$1 - 1;
    rollover = true;
  }

  if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
    colInt++;
  }

  if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
    colInt++;

    if (colInt === I) {
      colInt++;
    }
  }

  if (colInt > Z) {
    colInt = colInt - Z + A$1 - 1;
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A$1 - 1;
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
    rowInt++;
  }

  if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
    rowInt++;

    if (rowInt === I) {
      rowInt++;
    }
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A$1 - 1;
  }

  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

/**
 * Decode the UTM parameters from a MGRS string.
 *
 * @private
 * @param {string} mgrsString an UPPERCASE coordinate string is expected.
 * @return {object} An object literal with easting, northing, zoneLetter,
 *     zoneNumber and accuracy (in meters) properties.
 */
function decode(mgrsString) {

  if (mgrsString && mgrsString.length === 0) {
    throw ("MGRSPoint coverting from nothing");
  }

  var length = mgrsString.length;

  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;

  // get Zone number
  while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw ("MGRSPoint bad conversion from: " + mgrsString);
    }
    sb += testChar;
    i++;
  }

  var zoneNumber = parseInt(sb, 10);

  if (i === 0 || i + 3 > length) {
    // A good MGRS string has to be 4-5 digits long,
    // ##AAA/#AAA at least.
    throw ("MGRSPoint bad conversion from: " + mgrsString);
  }

  var zoneLetter = mgrsString.charAt(i++);

  // Should we check the zone letter here? Why not.
  if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
    throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
  }

  hunK = mgrsString.substring(i, i += 2);

  var set = get100kSetForZone(zoneNumber);

  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);

  // We have a bug where the northing may be 2000000 too low.
  // How
  // do we know when to roll over?

  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2000000;
  }

  // calculate the char index for easting/northing separator
  var remainder = length - i;

  if (remainder % 2 !== 0) {
    throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
  }

  var sep = remainder / 2;

  var sepEasting = 0.0;
  var sepNorthing = 0.0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 100000.0 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }

  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;

  return {
    easting: easting,
    northing: northing,
    zoneLetter: zoneLetter,
    zoneNumber: zoneNumber,
    accuracy: accuracyBonus
  };
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
  // colOrigin is the letter at the origin of the set for the
  // column
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 100000.0;
  var rewindMarker = false;

  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw ("Bad character: " + e);
      }
      curCol = A$1;
      rewindMarker = true;
    }
    eastingValue += 100000.0;
  }

  return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {

  if (n > 'V') {
    throw ("MGRSPoint given invalid Northing " + n);
  }

  // rowOrigin is the letter at the origin of the set for the
  // column
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0.0;
  var rewindMarker = false;

  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    // fixing a bug making whole application hang in this loop
    // when 'n' is a wrong character
    if (curRow > V) {
      if (rewindMarker) { // making sure that this loop ends
        throw ("Bad character: " + n);
      }
      curRow = A$1;
      rewindMarker = true;
    }
    northingValue += 100000.0;
  }

  return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
  case 'C':
    northing = 1100000.0;
    break;
  case 'D':
    northing = 2000000.0;
    break;
  case 'E':
    northing = 2800000.0;
    break;
  case 'F':
    northing = 3700000.0;
    break;
  case 'G':
    northing = 4600000.0;
    break;
  case 'H':
    northing = 5500000.0;
    break;
  case 'J':
    northing = 6400000.0;
    break;
  case 'K':
    northing = 7300000.0;
    break;
  case 'L':
    northing = 8200000.0;
    break;
  case 'M':
    northing = 9100000.0;
    break;
  case 'N':
    northing = 0.0;
    break;
  case 'P':
    northing = 800000.0;
    break;
  case 'Q':
    northing = 1700000.0;
    break;
  case 'R':
    northing = 2600000.0;
    break;
  case 'S':
    northing = 3500000.0;
    break;
  case 'T':
    northing = 4400000.0;
    break;
  case 'U':
    northing = 5300000.0;
    break;
  case 'V':
    northing = 6200000.0;
    break;
  case 'W':
    northing = 7000000.0;
    break;
  case 'X':
    northing = 7900000.0;
    break;
  default:
    northing = -1.0;
  }
  if (northing >= 0.0) {
    return northing;
  }
  else {
    throw ("Invalid zone letter: " + zoneLetter);
  }

}

function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0.0;
  } else if(typeof x === 'object') {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0.0;
  } else if (typeof x === 'string' && typeof y === 'undefined') {
    var coords = x.split(',');
    this.x = parseFloat(coords[0], 10);
    this.y = parseFloat(coords[1], 10);
    this.z = parseFloat(coords[2], 10) || 0.0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0.0;
  }
  console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
}

Point.fromMGRS = function(mgrsStr) {
  return new Point(toPoint(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
  return forward$t([this.x, this.y], accuracy);
};

var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.01302083333333333333;
var C48 = 0.00712076822916666666;
var C66 = 0.36458333333333333333;
var C68 = 0.00569661458333333333;
var C88 = 0.3076171875;

function pj_enfn(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
}

function pj_mlfn(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
}

var MAX_ITER$3 = 20;

function pj_inv_mlfn(arg, es, en) {
  var k = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER$3; i; --i) { /* rarely goes over 2 iterations */
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
    //phi -= t * (t * Math.sqrt(t)) * k;
    t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
    phi -= t;
    if (Math.abs(t) < EPSLN) {
      return phi;
    }
  }
  //..reportError("cass:pj_inv_mlfn: Convergence error");
  return phi;
}

// Heavily based on this tmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js


function init$t() {
  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

  if (this.es) {
    this.en = pj_enfn(this.es);
    this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}

/**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
function forward$s(p) {
  var lon = p.x;
  var lat = p.y;

  var delta_lon = adjust_lon(lon - this.long0);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);

  if (!this.es) {
    var b = cos_phi * Math.sin(delta_lon);

    if ((Math.abs(Math.abs(b) - 1)) < EPSLN) {
      return (93);
    }
    else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
      b = Math.abs(y);

      if (b >= 1) {
        if ((b - 1) > EPSLN) {
          return (93);
        }
        else {
          y = 0;
        }
      }
      else {
        y = Math.acos(y);
      }

      if (lat < 0) {
        y = -y;
      }

      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  }
  else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c, 2);
    var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);

    x = this.a * (this.k0 * al * (1 +
      als / 6 * (1 - t + c +
      als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c +
      als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) +
      this.x0;

    y = this.a * (this.k0 * (ml - this.ml0 +
      sin_phi * delta_lon * al / 2 * (1 +
      als / 12 * (5 - t + 9 * c + 4 * cs +
      als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c +
      als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
      this.y0;
  }

  p.x = x;
  p.y = y;

  return p;
}

/**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
function inverse$s(p) {
  var con, phi;
  var lat, lon;
  var x = (p.x - this.x0) * (1 / this.a);
  var y = (p.y - this.y0) * (1 / this.a);

  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
    lat = Math.asin(con);

    if (y < 0) {
      lat = -lat;
    }

    if ((g === 0) && (h === 0)) {
      lon = 0;
    }
    else {
      lon = adjust_lon(Math.atan2(g, h) + this.long0);
    }
  }
  else { // ellipsoidal form
    con = this.ml0 + y / this.k0;
    phi = pj_inv_mlfn(con, this.es, this.en);

    if (Math.abs(phi) < HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d, 2);
      con = con * tan_phi;

      lat = phi - (con * ds / (1 - this.es)) * 0.5 * (1 -
        ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs -
        ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c -
        ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));

      lon = adjust_lon(this.long0 + (d * (1 -
        ds / 6 * (1 + 2 * t + c -
        ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c -
        ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi));
    }
    else {
      lat = HALF_PI * sign(y);
      lon = 0;
    }
  }

  p.x = lon;
  p.y = lat;

  return p;
}

var names$t = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
var tmerc = {
  init: init$t,
  forward: forward$s,
  inverse: inverse$s,
  names: names$t
};

function sinh(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
}

function hypot(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a = Math.max(x, y);
  var b = Math.min(x, y) / (a ? a : 1);

  return a * Math.sqrt(1 + Math.pow(b, 2));
}

function log1py(x) {
  var y = 1 + x;
  var z = y - 1;

  return z === 0 ? x : x * Math.log(y) / z;
}

function asinhy(x) {
  var y = Math.abs(x);
  y = log1py(y * (1 + y / (hypot(1, y) + 1)));

  return x < 0 ? -y : y;
}

function gatg(pp, B) {
  var cos_2B = 2 * Math.cos(2 * B);
  var i = pp.length - 1;
  var h1 = pp[i];
  var h2 = 0;
  var h;

  while (--i >= 0) {
    h = -h2 + cos_2B * h1 + pp[i];
    h2 = h1;
    h1 = h;
  }

  return (B + h * Math.sin(2 * B));
}

function clens(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i = pp.length - 1;
  var hr1 = pp[i];
  var hr2 = 0;
  var hr;

  while (--i >= 0) {
    hr = -hr2 + r * hr1 + pp[i];
    hr2 = hr1;
    hr1 = hr;
  }

  return Math.sin(arg_r) * hr;
}

function cosh(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
}

function clens_cmplx(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = sinh(arg_i);
  var cosh_arg_i = cosh(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;

  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i * hi1 + pp[j];
    hi = -hi2 + i * hr1 + r * hi1;
  }

  r = sin_arg_r * cosh_arg_i;
  i = cos_arg_r * sinh_arg_i;

  return [r * hr - i * hi, r * hi + i * hr];
}

// Heavily based on this etmerc projection implementation
// https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js


function init$s() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  }
  if (this.approx) {
    // When '+approx' is set, use tmerc instead
    tmerc.init.apply(this);
    this.forward = tmerc.forward;
    this.inverse = tmerc.inverse;
  }

  this.x0 = this.x0 !== undefined ? this.x0 : 0;
  this.y0 = this.y0 !== undefined ? this.y0 : 0;
  this.long0 = this.long0 !== undefined ? this.long0 : 0;
  this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];

  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;

  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675 ))))));
  this.cbg[0] = n * (-2 + n * ( 2 / 3 + n * ( 4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));

  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * ( -13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));

  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));

  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * ( -24832 / 14175)));

  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));

  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);

  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));

  this.utg[0] = n * (-0.5 + n * ( 2 / 3 + n * (-37 / 96 + n * ( 1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));

  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));

  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720 ))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));

  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));

  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));

  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);

  var Z = gatg(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z + clens(this.gtu, 2 * Z));
}

function forward$r(p) {
  var Ce = adjust_lon(p.x - this.long0);
  var Cn = p.y;

  Cn = gatg(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);

  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
  Ce = asinhy(Math.tan(Ce));

  var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);

  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];

  var x;
  var y;

  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  }
  else {
    x = Infinity;
    y = Infinity;
  }

  p.x = x;
  p.y = y;

  return p;
}

function inverse$r(p) {
  var Ce = (p.x - this.x0) * (1 / this.a);
  var Cn = (p.y - this.y0) * (1 / this.a);

  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;

  var lon;
  var lat;

  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);

    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    Ce = Math.atan(sinh(Ce));

    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);

    Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
    Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);

    lon = adjust_lon(Ce + this.long0);
    lat = gatg(this.cgb, Cn);
  }
  else {
    lon = Infinity;
    lat = Infinity;
  }

  p.x = lon;
  p.y = lat;

  return p;
}

var names$s = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
var etmerc = {
  init: init$s,
  forward: forward$r,
  inverse: inverse$r,
  names: names$s
};

function adjust_zone(zone, lon) {
  if (zone === undefined) {
    zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;

    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
}

var dependsOn = 'etmerc';


function init$r() {
  var zone = adjust_zone(this.zone, this.long0);
  if (zone === undefined) {
    throw new Error('unknown utm zone');
  }
  this.lat0 = 0;
  this.long0 =  ((6 * Math.abs(zone)) - 183) * D2R$1;
  this.x0 = 500000;
  this.y0 = this.utmSouth ? 10000000 : 0;
  this.k0 = 0.9996;

  etmerc.init.apply(this);
  this.forward = etmerc.forward;
  this.inverse = etmerc.inverse;
}

var names$r = ["Universal Transverse Mercator System", "utm"];
var utm = {
  init: init$r,
  names: names$r,
  dependsOn: dependsOn
};

function srat(esinp, exp) {
  return (Math.pow((1 - esinp) / (1 + esinp), exp));
}

var MAX_ITER$2 = 20;

function init$q() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
}

function forward$q(p) {
  var lon = p.x;
  var lat = p.y;

  p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
  p.x = this.C * lon;
  return p;
}

function inverse$q(p) {
  var DEL_TOL = 1e-14;
  var lon = p.x / this.C;
  var lat = p.y;
  var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
  for (var i = MAX_ITER$2; i > 0; --i) {
    lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), - 0.5 * this.e)) - HALF_PI;
    if (Math.abs(lat - p.y) < DEL_TOL) {
      break;
    }
    p.y = lat;
  }
  /* convergence failed */
  if (!i) {
    return null;
  }
  p.x = lon;
  p.y = lat;
  return p;
}

var names$q = ["gauss"];
var gauss = {
  init: init$q,
  forward: forward$q,
  inverse: inverse$q,
  names: names$q
};

function init$p() {
  gauss.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}

function forward$p(p) {
  var sinc, cosc, cosl, k;
  p.x = adjust_lon(p.x - this.long0);
  gauss.forward.apply(this, [p]);
  sinc = Math.sin(p.y);
  cosc = Math.cos(p.y);
  cosl = Math.cos(p.x);
  k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p.x = k * cosc * Math.sin(p.x);
  p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p.x = this.a * p.x + this.x0;
  p.y = this.a * p.y + this.y0;
  return p;
}

function inverse$p(p) {
  var sinc, cosc, lon, lat, rho;
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;
  if ((rho = hypot(p.x, p.y))) {
    var c = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c);
    cosc = Math.cos(c);
    lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  gauss.inverse.apply(this, [p]);
  p.x = adjust_lon(p.x + this.long0);
  return p;
}

var names$p = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea","Oblique Stereographic Alternative","Double_Stereographic"];
var sterea = {
  init: init$p,
  forward: forward$p,
  inverse: inverse$p,
  names: names$p
};

function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return (Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
}

function init$o() {

  // setting default parameters
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;

  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
    }
  }
  else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (this.lat0 > 0) {
        //North pole
        //trace('stere:north pole');
        this.con = 1;
      }
      else {
        //South pole
        //trace('stere:south pole');
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
      // When k0 is 1 (default value) and lat_ts is a vaild number and lat0 is at a pole and lat_ts is not at a pole
      // Recalculate k0 using formula 21-35 from p161 of Snyder, 1987
      this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}

// Stereographic forward equations--mapping lat,long to x,y
function forward$o(p) {
  var lon = p.x;
  var lat = p.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A, X, sinX, cosX, ts, rh;
  var dlon = adjust_lon(lon - this.long0);

  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
    //case of the origine point
    //trace('stere:this is the origin point');
    p.x = NaN;
    p.y = NaN;
    return p;
  }
  if (this.sphere) {
    //trace('stere:sphere case');
    A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
    p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p;
  }
  else {
    X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= EPSLN) {
      ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p.x = this.x0 + rh * Math.sin(lon - this.long0);
      p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      //trace(p.toString());
      return p;
    }
    else if (Math.abs(this.sinlat0) < EPSLN) {
      //Eq
      //trace('stere:equateur');
      A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p.y = A * sinX;
    }
    else {
      //other case
      //trace('stere:normal case');
      A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p.x = A * cosX * Math.sin(dlon) + this.x0;
  }
  //trace(p.toString());
  return p;
}

//* Stereographic inverse equations--mapping x,y to lat/long
function inverse$o(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p.x * p.x + p.y * p.y);
  if (this.sphere) {
    var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= EPSLN) {
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < EPSLN) {
      if (this.lat0 > 0) {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
      }
      else {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
      }
    }
    else {
      lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p.x = lon;
        p.y = lat;
        //trace(p.toString());
        return p;
      }
      p.x *= this.con;
      p.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * phi2z(this.e, ts);
      lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
    }
    else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= EPSLN) {
        Chi = this.X0;
      }
      else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
        lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
      }
      lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
    }
  }
  p.x = lon;
  p.y = lat;

  //trace(p.toString());
  return p;

}

var names$o = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)", "Polar_Stereographic"];
var stere = {
  init: init$o,
  forward: forward$o,
  inverse: inverse$o,
  names: names$o,
  ssfn_: ssfn_
};

/*
  references:
    Formules et constantes pour le Calcul pour la
    projection cylindrique conforme à axe oblique et pour la transformation entre
    des systèmes de référence.
    http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
  */

function init$n() {
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}

function forward$n(p) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
  var S = -this.alpha * (Sa1 + Sa2) + this.K;

  // spheric latitude
  var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

  // spheric longitude
  var I = this.alpha * (p.x - this.lambda0);

  // psoeudo equatorial rotation
  var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

  p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p.x = this.R * rotI + this.x0;
  return p;
}

function inverse$n(p) {
  var Y = p.x - this.x0;
  var X = p.y - this.y0;

  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

  var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

  var lambda = this.lambda0 + I / this.alpha;

  var S = 0;
  var phy = b;
  var prevPhy = -1000;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 0.0000001) {
    if (++iteration > 20) {
      //...reportError("omercFwdInfinity");
      return;
    }
    //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
    S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
  }

  p.x = lambda;
  p.y = phy;
  return p;
}

var names$n = ["somerc"];
var somerc = {
  init: init$n,
  forward: forward$n,
  inverse: inverse$n,
  names: names$n
};

var TOL = 1e-7;

function isTypeA(P) {
  var typeAProjections = ['Hotine_Oblique_Mercator','Hotine_Oblique_Mercator_Azimuth_Natural_Origin'];
  var projectionName = typeof P.PROJECTION === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION;
  
  return 'no_uoff' in P || 'no_off' in P || typeAProjections.indexOf(projectionName) !== -1;
}


/* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
function init$m() {  
  var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0,
    gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
  
  // only Type A uses the no_off or no_uoff property
  // https://github.com/OSGeo/proj.4/issues/104
  this.no_off = isTypeA(this);
  this.no_rot = 'no_rot' in this;
  
  var alp = false;
  if ("alpha" in this) {
    alp = true;
  }

  var gam = false;
  if ("rectified_grid_angle" in this) {
    gam = true;
  }

  if (alp) {
    alpha_c = this.alpha;
  }
  
  if (gam) {
    gamma = (this.rectified_grid_angle * D2R$1);
  }
  
  if (alp || gam) {
    lamc = this.longc;
  } else {
    lam1 = this.long1;
    phi1 = this.lat1;
    lam2 = this.long2;
    phi2 = this.lat2;
    
    if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL ||
        Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL ||
        Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
      throw new Error();
    }
  }
  
  var one_es = 1.0 - this.es;
  com = Math.sqrt(one_es);
  
  if (Math.abs(this.lat0) > EPSLN) {
    sinph0 = Math.sin(this.lat0);
    cosph0 = Math.cos(this.lat0);
    con = 1 - this.es * sinph0 * sinph0;
    this.B = cosph0 * cosph0;
    this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
    this.A = this.B * this.k0 * com / con;
    D = this.B * com / (cosph0 * Math.sqrt(con));
    F = D * D -1;
    
    if (F <= 0) {
      F = 0;
    } else {
      F = Math.sqrt(F);
      if (this.lat0 < 0) {
        F = -F;
      }
    }
    
    this.E = F += D;
    this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B);
  } else {
    this.B = 1 / com;
    this.A = this.k0;
    this.E = D = F = 1;
  }
  
  if (alp || gam) {
    if (alp) {
      gamma0 = Math.asin(Math.sin(alpha_c) / D);
      if (!gam) {
        gamma = alpha_c;
      }
    } else {
      gamma0 = gamma;
      alpha_c = Math.asin(D * Math.sin(gamma0));
    }
    this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
  } else {
    H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B);
    L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B);
    F = this.E / H;
    p = (L - H) / (L + H);
    J = this.E * this.E;
    J = (J - L * H) / (J + L * H);
    con = lam1 - lam2;
    
    if (con < -Math.pi) {
      lam2 -=TWO_PI;
    } else if (con > Math.pi) {
      lam2 += TWO_PI;
    }
    
    this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B);
    gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0)) / (F - 1 / F));
    gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
  }
  
  this.singam = Math.sin(gamma0);
  this.cosgam = Math.cos(gamma0);
  this.sinrot = Math.sin(gamma);
  this.cosrot = Math.cos(gamma);
  
  this.rB = 1 / this.B;
  this.ArB = this.A * this.rB;
  this.BrA = 1 / this.ArB;
  this.A * this.B;
  
  if (this.no_off) {
    this.u_0 = 0;
  } else {
    this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
    
    if (this.lat0 < 0) {
      this.u_0 = - this.u_0;
    }  
  }
    
  F = 0.5 * gamma0;
  this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
  this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
}


/* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
function forward$m(p) {
  var coords = {};
  var S, T, U, V, W, temp, u, v;
  p.x = p.x - this.lam0;
  
  if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
    W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B);
    
    temp = 1 / W;
    S = 0.5 * (W - temp);
    T = 0.5 * (W + temp);
    V = Math.sin(this.B * p.x);
    U = (S * this.singam - V * this.cosgam) / T;
        
    if (Math.abs(Math.abs(U) - 1.0) < EPSLN) {
      throw new Error();
    }
    
    v = 0.5 * this.ArB * Math.log((1 - U)/(1 + U));
    temp = Math.cos(this.B * p.x);
    
    if (Math.abs(temp) < TOL) {
      u = this.A * p.x;
    } else {
      u = this.ArB * Math.atan2((S * this.cosgam + V * this.singam), temp);
    }    
  } else {
    v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
    u = this.ArB * p.y;
  }
     
  if (this.no_rot) {
    coords.x = u;
    coords.y = v;
  } else {
    u -= this.u_0;
    coords.x = v * this.cosrot + u * this.sinrot;
    coords.y = u * this.cosrot - v * this.sinrot;
  }
  
  coords.x = (this.a * coords.x + this.x0);
  coords.y = (this.a * coords.y + this.y0);
  
  return coords;
}

function inverse$m(p) {
  var u, v, Qp, Sp, Tp, Vp, Up;
  var coords = {};
  
  p.x = (p.x - this.x0) * (1.0 / this.a);
  p.y = (p.y - this.y0) * (1.0 / this.a);

  if (this.no_rot) {
    v = p.y;
    u = p.x;
  } else {
    v = p.x * this.cosrot - p.y * this.sinrot;
    u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
  }
  
  Qp = Math.exp(-this.BrA * v);
  Sp = 0.5 * (Qp - 1 / Qp);
  Tp = 0.5 * (Qp + 1 / Qp);
  Vp = Math.sin(this.BrA * u);
  Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
  
  if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
    coords.x = 0;
    coords.y = Up < 0 ? -HALF_PI : HALF_PI;
  } else {
    coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
    coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B));
    
    if (coords.y === Infinity) {
      throw new Error();
    }
        
    coords.x = -this.rB * Math.atan2((Sp * this.cosgam - Vp * this.singam), Math.cos(this.BrA * u));
  }
  
  coords.x += this.lam0;
  
  return coords;
}

var names$m = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
var omerc = {
  init: init$m,
  forward: forward$m,
  inverse: inverse$m,
  names: names$m
};

function init$l() {
  
  //double lat0;                    /* the reference latitude               */
  //double long0;                   /* the reference longitude              */
  //double lat1;                    /* first standard parallel              */
  //double lat2;                    /* second standard parallel             */
  //double r_maj;                   /* major axis                           */
  //double r_min;                   /* minor axis                           */
  //double false_east;              /* x offset in meters                   */
  //double false_north;             /* y offset in meters                   */
  
  //the above value can be set with proj4.defs
  //example: proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

  if (!this.lat2) {
    this.lat2 = this.lat1;
  } //if lat2 is not defined
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }

  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);

  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = msfnz(this.e, sin1, cos1);
  var ts1 = tsfnz(this.e, this.lat1, sin1);

  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = msfnz(this.e, sin2, cos2);
  var ts2 = tsfnz(this.e, this.lat2, sin2);

  var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));

  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  }
  else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}

// Lambert Conformal conic forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward$l(p) {

  var lon = p.x;
  var lat = p.y;

  // singular cases :
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
    lat = sign(lat) * (HALF_PI - 2 * EPSLN);
  }

  var con = Math.abs(Math.abs(lat) - HALF_PI);
  var ts, rh1;
  if (con > EPSLN) {
    ts = tsfnz(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  }
  else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * adjust_lon(lon - this.long0);
  p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

  return p;
}

// Lambert Conformal Conic inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse$l(p) {

  var rh1, con, ts;
  var lat, lon;
  var x = (p.x - this.x0) / this.k0;
  var y = (this.rh - (p.y - this.y0) / this.k0);
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2((con * x), (con * y));
  }
  if ((rh1 !== 0) || (this.ns > 0)) {
    con = 1 / this.ns;
    ts = Math.pow((rh1 / (this.a * this.f0)), con);
    lat = phi2z(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  else {
    lat = -HALF_PI;
  }
  lon = adjust_lon(theta / this.ns + this.long0);

  p.x = lon;
  p.y = lat;
  return p;
}

var names$l = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc",
  "Lambert Conic Conformal (1SP)",
  "Lambert Conic Conformal (2SP)"
];

var lcc = {
  init: init$l,
  forward: forward$l,
  inverse: inverse$l,
  names: names$l
};

function init$k() {
  this.a = 6377397.155;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  /* if scale not set default to 0.9999 */
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448; /* 45 */
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}

/* ellipsoid */
/* calculate xy from lat/lon */
/* Constants, identical to inverse transform function */
function forward$k(p) {
  var gfi, u, deltav, s, d, eps, ro;
  var lon = p.x;
  var lat = p.y;
  var delta_lon = adjust_lon(lon - this.long0);
  /* Transformation */
  gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
  u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
  d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p.y = ro * Math.cos(eps) / 1;
  p.x = ro * Math.sin(eps) / 1;

  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  return (p);
}

/* calculate lat/lon from xy */
function inverse$k(p) {
  var u, deltav, s, d, eps, ro, fi1;
  var ok;

  /* Transformation */
  /* revert y, x*/
  var tmp = p.x;
  p.x = p.y;
  p.y = tmp;
  if (!this.czech) {
    p.y *= -1;
    p.x *= -1;
  }
  ro = Math.sqrt(p.x * p.x + p.y * p.y);
  eps = Math.atan2(p.y, p.x);
  d = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
  deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
  p.x = this.long0 - deltav / this.alfa;
  fi1 = u;
  ok = 0;
  var iter = 0;
  do {
    p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p.y) < 0.0000000001) {
      ok = 1;
    }
    fi1 = p.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }

  return (p);
}

var names$k = ["Krovak", "krovak"];
var krovak = {
  init: init$k,
  forward: forward$k,
  inverse: inverse$k,
  names: names$k
};

function mlfn(e0, e1, e2, e3, phi) {
  return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
}

function e0fn(x) {
  return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
}

function e1fn(x) {
  return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
}

function e2fn(x) {
  return (0.05859375 * x * x * (1 + 0.75 * x));
}

function e3fn(x) {
  return (x * x * x * (35 / 3072));
}

function gN(a, e, sinphi) {
  var temp = e * sinphi;
  return a / Math.sqrt(1 - temp * temp);
}

function adjust_lat(x) {
  return (Math.abs(x) < HALF_PI) ? x : (x - (sign(x) * Math.PI));
}

function imlfn(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;

  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
  return NaN;
}

function init$j() {
  if (!this.sphere) {
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);
    this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
}

/* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function forward$j(p) {

  /* Forward equations
      -----------------*/
  var x, y;
  var lam = p.x;
  var phi = p.y;
  lam = adjust_lon(lam - this.long0);

  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  }
  else {
    //ellipsoid
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = gN(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);

    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


  }

  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse$j(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var phi, lam;

  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  }
  else {
    /* ellipsoid */
    var ml1 = this.ml0 / this.a + y;
    var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
      p.x = this.long0;
      p.y = HALF_PI;
      if (y < 0) {
        p.y *= -1;
      }
      return p;
    }
    var nl1 = gN(this.a, this.e, Math.sin(phi1));

    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

  }

  p.x = adjust_lon(lam + this.long0);
  p.y = adjust_lat(phi);
  return p;

}

var names$j = ["Cassini", "Cassini_Soldner", "cass"];
var cass = {
  init: init$j,
  forward: forward$j,
  inverse: inverse$j,
  names: names$j
};

function qsfnz(eccent, sinphi) {
  var con;
  if (eccent > 1.0e-7) {
    con = eccent * sinphi;
    return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
  }
  else {
    return (2 * sinphi);
  }
}

/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

var S_POLE = 1;

var N_POLE = 2;
var EQUIT = 3;
var OBLIQ = 4;

/* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
function init$i() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
  }
  else if (Math.abs(t) < EPSLN) {
    this.mode = this.EQUIT;
  }
  else {
    this.mode = this.OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;

    this.qp = qsfnz(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
    case this.N_POLE:
      this.dd = 1;
      break;
    case this.S_POLE:
      this.dd = 1;
      break;
    case this.EQUIT:
      this.rq = Math.sqrt(0.5 * this.qp);
      this.dd = 1 / this.rq;
      this.xmf = 1;
      this.ymf = 0.5 * this.qp;
      break;
    case this.OBLIQ:
      this.rq = Math.sqrt(0.5 * this.qp);
      sinphi = Math.sin(this.lat0);
      this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
      this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
      this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
      this.ymf = (this.xmf = this.rq) / this.dd;
      this.xmf *= this.dd;
      break;
    }
  }
  else {
    if (this.mode === this.OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}

/* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
function forward$i(p) {

  /* Forward equations
      -----------------*/
  var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
  var lam = p.x;
  var phi = p.y;

  lam = adjust_lon(lam - this.long0);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.lat0) < EPSLN) {
        return null;
      }
      y = FORTPI - phi * 0.5;
      y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  }
  else {
    sinb = 0;
    cosb = 0;
    b = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q = qsfnz(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
    case this.OBLIQ:
      b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
      break;
    case this.EQUIT:
      b = 1 + cosb * coslam;
      break;
    case this.N_POLE:
      b = HALF_PI + phi;
      q = this.qp - q;
      break;
    case this.S_POLE:
      b = phi - HALF_PI;
      q = this.qp + q;
      break;
    }
    if (Math.abs(b) < EPSLN) {
      return null;
    }
    switch (this.mode) {
    case this.OBLIQ:
    case this.EQUIT:
      b = Math.sqrt(2 / b);
      if (this.mode === this.OBLIQ) {
        y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
      }
      else {
        y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
      }
      x = this.xmf * b * cosb * sinlam;
      break;
    case this.N_POLE:
    case this.S_POLE:
      if (q >= 0) {
        x = (b = Math.sqrt(q)) * sinlam;
        y = coslam * ((this.mode === this.S_POLE) ? b : -b);
      }
      else {
        x = y = 0;
      }
      break;
    }
  }

  p.x = this.a * x + this.x0;
  p.y = this.a * y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse$i(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var x = p.x / this.a;
  var y = p.y / this.a;
  var lam, phi, cCe, sCe, q, rho, ab;
  if (this.sphere) {
    var cosz = 0,
      rh, sinz = 0;

    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
    case this.EQUIT:
      phi = (Math.abs(rh) <= EPSLN) ? 0 : Math.asin(y * sinz / rh);
      x *= sinz;
      y = cosz * rh;
      break;
    case this.OBLIQ:
      phi = (Math.abs(rh) <= EPSLN) ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
      x *= sinz * this.cosph0;
      y = (cosz - Math.sin(phi) * this.sinph0) * rh;
      break;
    case this.N_POLE:
      y = -y;
      phi = HALF_PI - phi;
      break;
    case this.S_POLE:
      phi -= HALF_PI;
      break;
    }
    lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
  }
  else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < EPSLN) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= (sCe = Math.sin(sCe));
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      }
      else {
        ab = y * sCe / rho;
        q = this.qp * ab;
        y = rho * cCe;
      }
    }
    else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q = (x * x + y * y);
      if (!q) {
        p.x = this.long0;
        p.y = this.lat0;
        return p;
      }
      ab = 1 - q / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }

  p.x = adjust_lon(this.long0 + lam);
  p.y = phi;
  return p;
}

/* determine latitude from authalic latitude */
var P00 = 0.33333333333333333333;

var P01 = 0.17222222222222222222;
var P02 = 0.10257936507936507936;
var P10 = 0.06388888888888888888;
var P11 = 0.06640211640211640211;
var P20 = 0.01641501294219154443;

function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}

function authlat(beta, APA) {
  var t = beta + beta;
  return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
}

var names$i = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
var laea = {
  init: init$i,
  forward: forward$i,
  inverse: inverse$i,
  names: names$i,
  S_POLE: S_POLE,
  N_POLE: N_POLE,
  EQUIT: EQUIT,
  OBLIQ: OBLIQ
};

function asinz(x) {
  if (Math.abs(x) > 1) {
    x = (x > 1) ? 1 : -1;
  }
  return Math.asin(x);
}

function init$h() {

  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);

  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
  this.qs1 = qsfnz(this.e3, this.sin_po);

  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
  this.qs2 = qsfnz(this.e3, this.sin_po);

  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = qsfnz(this.e3, this.sin_po);

  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  }
  else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}

/* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
function forward$h(p) {

  var lon = p.x;
  var lat = p.y;

  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);

  var qs = qsfnz(this.e3, this.sin_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * adjust_lon(lon - this.long0);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
}

function inverse$h(p) {
  var rh1, qs, con, theta, lon, lat;

  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  }
  else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }

  lon = adjust_lon(theta / this.ns0 + this.long0);
  p.x = lon;
  p.y = lat;
  return p;
}

/* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = asinz(0.5 * qs);
  if (eccent < EPSLN) {
    return phi;
  }

  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}

var names$h = ["Albers_Conic_Equal_Area", "Albers", "aea"];
var aea = {
  init: init$h,
  forward: forward$h,
  inverse: inverse$h,
  names: names$h,
  phi1z: phi1z
};

/*
  reference:
    Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
  */
function init$g() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  // Approximation for projecting points to the horizon (infinity)
  this.infinity_dist = 1000 * this.a;
  this.rc = 1;
}

/* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward$g(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g;
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = adjust_lon(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= EPSLN)) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
  }
  else {

    // Point is in the opposing hemisphere and is unprojectable
    // We still need to return a reasonable point, so we project
    // to infinity, on a bearing
    // equivalent to the northern hemisphere equivalent
    // This is a reasonable approximation for short shapes and lines that
    // straddle the horizon.

    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

  }
  p.x = x;
  p.y = y;
  return p;
}

function inverse$g(p) {
  var rh; /* Rho */
  var sinc, cosc;
  var c;
  var lon, lat;

  /* Inverse equations
      -----------------*/
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  p.x /= this.k0;
  p.y /= this.k0;

  if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
    c = Math.atan2(rh, this.rc);
    sinc = Math.sin(c);
    cosc = Math.cos(c);

    lat = asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
    lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
    lon = adjust_lon(this.long0 + lon);
  }
  else {
    lat = this.phic0;
    lon = 0;
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names$g = ["gnom"];
var gnom = {
  init: init$g,
  forward: forward$g,
  inverse: inverse$g,
  names: names$g
};

function iqsfnz(eccent, q) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
    if (q < 0) {
      return (-1 * HALF_PI);
    }
    else {
      return HALF_PI;
    }
  }
  //var phi = 0.5* q/(1-eccent*eccent);
  var phi = Math.asin(0.5 * q);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 0.0000000001) {
      return phi;
    }
  }

  //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
  return NaN;
}

/*
  reference:
    "Cartographic Projection Procedures for the UNIX Environment-
    A User's Manual" by Gerald I. Evenden,
    USGS Open File Report 90-284and Release 4 Interim Reports (2003)
*/
function init$f() {
  //no-op
  if (!this.sphere) {
    this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}

/* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function forward$f(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y;
  /* Forward equations
      -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  }
  else {
    var qs = qsfnz(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }

  p.x = x;
  p.y = y;
  return p;
}

/* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function inverse$f(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var lon, lat;

  if (this.sphere) {
    lon = adjust_lon(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
    lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
  }
  else {
    lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
    lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names$f = ["cea"];
var cea = {
  init: init$f,
  forward: forward$f,
  inverse: inverse$f,
  names: names$f
};

function init$e() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

  this.rc = Math.cos(this.lat_ts);
}

// forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward$e(p) {

  var lon = p.x;
  var lat = p.y;

  var dlon = adjust_lon(lon - this.long0);
  var dlat = adjust_lat(lat - this.lat0);
  p.x = this.x0 + (this.a * dlon * this.rc);
  p.y = this.y0 + (this.a * dlat);
  return p;
}

// inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse$e(p) {

  var x = p.x;
  var y = p.y;

  p.x = adjust_lon(this.long0 + ((x - this.x0) / (this.a * this.rc)));
  p.y = adjust_lat(this.lat0 + ((y - this.y0) / (this.a)));
  return p;
}

var names$e = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
var eqc = {
  init: init$e,
  forward: forward$e,
  inverse: inverse$e,
  names: names$e
};

var MAX_ITER$1 = 20;

function init$d() {
  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);
  this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
}

/* Polyconic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward$d(p) {
  var lon = p.x;
  var lat = p.y;
  var x, y, el;
  var dlon = adjust_lon(lon - this.long0);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    }
    else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  }
  else {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    }
    else {
      var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }

  }
  p.x = x + this.x0;
  p.y = y + this.y0;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse$d(p) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p.x - this.x0;
  y = p.y - this.y0;

  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
      lon = adjust_lon(x / this.a + this.long0);
      lat = 0;
    }
    else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = MAX_ITER$1; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = adjust_lon(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
    }
  }
  else {
    if (Math.abs(y + this.ml0) <= EPSLN) {
      lat = 0;
      lon = adjust_lon(this.long0 + x / this.a);
    }
    else {

      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = MAX_ITER$1; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }

      //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
    }
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names$d = ["Polyconic", "poly"];
var poly = {
  init: init$d,
  forward: forward$d,
  inverse: inverse$d,
  names: names$d
};

function init$c() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -0.0055161;
  this.A[7] = 0.0026906;
  this.A[8] = -0.001333;
  this.A[9] = 0.00067;
  this.A[10] = -0.00034;

  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 0.003371507;
  this.B_re[3] = -0.001541739;
  this.B_im[3] = 0.041058560;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;

  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -0.007809598;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;

  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 0.007317;
  this.D[7] = 0.01220;
  this.D[8] = 0.00394;
  this.D[9] = -0.0013;
}

/**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
function forward$c(p) {
  var n;
  var lon = p.x;
  var lat = p.y;

  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;

  // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
  // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
  var d_phi = delta_lat / SEC_TO_RAD * 1E-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1; // d_phi^0

  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }

  // 2. Calculate theta
  var th_re = d_psi;
  var th_im = d_lambda;

  // 3. Calculate z
  var th_n_re = 1;
  var th_n_im = 0; // theta^0
  var th_n_re1;
  var th_n_im1;

  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }

  // 4. Calculate easting and northing
  p.x = (z_im * this.a) + this.x0;
  p.y = (z_re * this.a) + this.y0;

  return p;
}

/**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
function inverse$c(p) {
  var n;
  var x = p.x;
  var y = p.y;

  var delta_x = x - this.x0;
  var delta_y = y - this.y0;

  // 1. Calculate z
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;

  // 2a. Calculate theta - first approximation gives km accuracy
  var z_n_re = 1;
  var z_n_im = 0; // z^0
  var z_n_re1;
  var z_n_im1;

  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }

  // 2b. Iterate to refine the accuracy of the calculation
  //        0 iterations gives km accuracy
  //        1 iteration gives m accuracy -- good enough for most mapping applications
  //        2 iterations bives mm accuracy
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;

    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }

    // Complex division
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }

  // 3. Calculate d_phi              ...                                    // and d_lambda
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1; // d_psi^0

  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }

  // 4. Calculate latitude and longitude
  // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
  var lat = this.lat0 + (d_phi * SEC_TO_RAD * 1E5);
  var lon = this.long0 + d_lambda;

  p.x = lon;
  p.y = lat;

  return p;
}

var names$c = ["New_Zealand_Map_Grid", "nzmg"];
var nzmg = {
  init: init$c,
  forward: forward$c,
  inverse: inverse$c,
  names: names$c
};

/*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */


/* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
function init$b() {
  //no-op
}

/* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
function forward$b(p) {
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

  p.x = x;
  p.y = y;
  return p;
}

/* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
function inverse$b(p) {
  p.x -= this.x0;
  p.y -= this.y0;

  var lon = adjust_lon(this.long0 + p.x / this.a);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

  p.x = lon;
  p.y = lat;
  return p;
}

var names$b = ["Miller_Cylindrical", "mill"];
var mill = {
  init: init$b,
  forward: forward$b,
  inverse: inverse$b,
  names: names$b
};

var MAX_ITER = 20;


function init$a() {
  /* Place parameters in static storage for common use
    -------------------------------------------------*/


  if (!this.sphere) {
    this.en = pj_enfn(this.es);
  }
  else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }

}

/* Sinusoidal forward equations--mapping lat,long to x,y
  -----------------------------------------------------*/
function forward$a(p) {
  var x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
    -----------------*/
  lon = adjust_lon(lon - this.long0);

  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    }
    else {
      var k = this.n * Math.sin(lat);
      for (var i = MAX_ITER; i; --i) {
        var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
        lat -= V;
        if (Math.abs(V) < EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;

  }
  else {

    var s = Math.sin(lat);
    var c = Math.cos(lat);
    y = this.a * pj_mlfn(lat, s, c, this.en);
    x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
  }

  p.x = x;
  p.y = y;
  return p;
}

function inverse$a(p) {
  var lat, temp, lon, s;

  p.x -= this.x0;
  lon = p.x / this.a;
  p.y -= this.y0;
  lat = p.y / this.a;

  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
    }
    else if (this.n !== 1) {
      lat = asinz(Math.sin(lat) / this.n);
    }
    lon = adjust_lon(lon + this.long0);
    lat = adjust_lat(lat);
  }
  else {
    lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < HALF_PI) {
      s = Math.sin(lat);
      temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      //temp = this.long0 + p.x / (this.a * Math.cos(lat));
      lon = adjust_lon(temp);
    }
    else if ((s - EPSLN) < HALF_PI) {
      lon = this.long0;
    }
  }
  p.x = lon;
  p.y = lat;
  return p;
}

var names$a = ["Sinusoidal", "sinu"];
var sinu = {
  init: init$a,
  forward: forward$a,
  inverse: inverse$a,
  names: names$a
};

function init$9() {}
/* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
function forward$9(p) {

  /* Forward equations
      -----------------*/
  var lon = p.x;
  var lat = p.y;

  var delta_lon = adjust_lon(lon - this.long0);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);

  /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < EPSLN) {
      break;
    }
  }
  theta /= 2;

  /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
  if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

  p.x = x;
  p.y = y;
  return p;
}

function inverse$9(p) {
  var theta;
  var arg;

  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  arg = p.y / (1.4142135623731 * this.a);

  /* Because of division by zero problems, 'arg' can not be 1.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
  if (lon < (-Math.PI)) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);

  p.x = lon;
  p.y = lat;
  return p;
}

var names$9 = ["Mollweide", "moll"];
var moll = {
  init: init$9,
  forward: forward$9,
  inverse: inverse$9,
  names: names$9
};

function init$8() {

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  // Standard Parallels cannot be equal and on opposite sides of the equator
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn(this.es);
  this.e1 = e1fn(this.es);
  this.e2 = e2fn(this.es);
  this.e3 = e3fn(this.es);

  this.sinphi = Math.sin(this.lat1);
  this.cosphi = Math.cos(this.lat1);

  this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
  this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);

  if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
    this.ns = this.sinphi;
  }
  else {
    this.sinphi = Math.sin(this.lat2);
    this.cosphi = Math.cos(this.lat2);
    this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
    this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}

/* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
function forward$8(p) {
  var lon = p.x;
  var lat = p.y;
  var rh1;

  /* Forward equations
      -----------------*/
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  }
  else {
    var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * adjust_lon(lon - this.long0);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p.x = x;
  p.y = y;
  return p;
}

/* Inverse equations
  -----------------*/
function inverse$8(p) {
  p.x -= this.x0;
  p.y = this.rh - p.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
    con = 1;
  }
  else {
    rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p.x, con * p.y);
  }

  if (this.sphere) {
    lon = adjust_lon(this.long0 + theta / this.ns);
    lat = adjust_lat(this.g - rh1 / this.a);
    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    var ml = this.g - rh1 / this.a;
    lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
    lon = adjust_lon(this.long0 + theta / this.ns);
    p.x = lon;
    p.y = lat;
    return p;
  }

}

var names$8 = ["Equidistant_Conic", "eqdc"];
var eqdc = {
  init: init$8,
  forward: forward$8,
  inverse: inverse$8,
  names: names$8
};

/* Initialize the Van Der Grinten projection
  ----------------------------------------*/
function init$7() {
  //this.R = 6370997; //Radius of earth
  this.R = this.a;
}

function forward$7(p) {

  var lon = p.x;
  var lat = p.y;

  /* Forward equations
    -----------------*/
  var dlon = adjust_lon(lon - this.long0);
  var x, y;

  if (Math.abs(lat) <= EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
  }
  var theta = asinz(2 * Math.abs(lat / Math.PI));
  if ((Math.abs(dlon) <= EPSLN) || (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    }
    else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
    //  return(OK);
  }
  var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);

  var g = costh / (sinth + costh - 1);
  var gsq = g * g;
  var m = g * (2 / sinth - 1);
  var msq = m * m;
  var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  //con = Math.abs(con / (Math.PI * this.R));
  var q = asq + g;
  con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
  if (lat >= 0) {
    //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 + con;
  }
  else {
    //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
    y = this.y0 - con;
  }
  p.x = x;
  p.y = y;
  return p;
}

/* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
function inverse$7(p) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d;

  /* inverse equations
    -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  con = Math.PI * this.R;
  xx = p.x / con;
  yy = p.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = ((3 * d) / a1) / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    }
    else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }

  if (Math.abs(xx) < EPSLN) {
    lon = this.long0;
  }
  else {
    lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
  }

  p.x = lon;
  p.y = lat;
  return p;
}

var names$7 = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
var vandg = {
  init: init$7,
  forward: forward$7,
  inverse: inverse$7,
  names: names$7
};

function init$6() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
}

function forward$6(p) {
  var lon = p.x;
  var lat = p.y;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var dlon = adjust_lon(lon - this.long0);
  var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North Pole case
      p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
      p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South Pole case
      p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
      p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
      return p;
    }
    else {
      //default case
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c = Math.acos(cos_c);
      kp = c ? c / Math.sin(c) : 1;
      p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p;
    }
  }
  else {
    e0 = e0fn(this.es);
    e1 = e1fn(this.es);
    e2 = e2fn(this.es);
    e3 = e3fn(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North Pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South Pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn(e0, e1, e2, e3, lat);
      p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p;
    }
    else {
      //Default case
      tanphi = sinphi / cosphi;
      Nl1 = gN(this.a, this.e, this.sin_p12);
      Nl = gN(this.a, this.e, sinphi);
      psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
      Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
      if (Az === 0) {
        s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
        s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      }
      else {
        s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
      }
      G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
      H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
      GH = G * H;
      Hs = H * H;
      s2 = s * s;
      s3 = s2 * s;
      s4 = s3 * s;
      s5 = s4 * s;
      c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
      p.x = this.x0 + c * Math.sin(Az);
      p.y = this.y0 + c * Math.cos(Az);
      return p;
    }
  }


}

function inverse$6(p) {
  p.x -= this.x0;
  p.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi;
  if (this.sphere) {
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (rh > (2 * HALF_PI * this.a)) {
      return;
    }
    z = rh / this.a;

    sinz = Math.sin(z);
    cosz = Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
    }
    else {
      lat = asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
        }
        else {
          lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
        }
      }
      else {
        /*con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
          //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }*/
        lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  }
  else {
    e0 = e0fn(this.es);
    e1 = e1fn(this.es);
    e2 = e2fn(this.es);
    e3 = e3fn(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      //North pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = Mlp - rh;
      lat = imlfn(M / this.a, e0, e1, e2, e3);
      lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      //South pole case
      Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      M = rh - Mlp;

      lat = imlfn(M / this.a, e0, e1, e2, e3);
      lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      //default case
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      Az = Math.atan2(p.x, p.y);
      N1 = gN(this.a, this.e, this.sin_p12);
      cosAz = Math.cos(Az);
      tmp = this.e * this.cos_p12 * cosAz;
      A = -tmp * tmp / (1 - this.es);
      B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
      D = rh / N1;
      Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
      F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
      psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
      lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
      sinpsi = Math.sin(psi);
      lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
      p.x = lon;
      p.y = lat;
      return p;
    }
  }

}

var names$6 = ["Azimuthal_Equidistant", "aeqd"];
var aeqd = {
  init: init$6,
  forward: forward$6,
  inverse: inverse$6,
  names: names$6
};

function init$5() {
  //double temp;      /* temporary variable    */

  /* Place parameters in static storage for common use
      -------------------------------------------------*/
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
}

/* Orthographic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
function forward$5(p) {
  var sinphi, cosphi; /* sin and cos value        */
  var dlon; /* delta longitude value      */
  var coslon; /* cos of longitude        */
  var ksp; /* scale factor          */
  var g, x, y;
  var lon = p.x;
  var lat = p.y;
  /* Forward equations
      -----------------*/
  dlon = adjust_lon(lon - this.long0);

  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);

  coslon = Math.cos(dlon);
  g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if ((g > 0) || (Math.abs(g) <= EPSLN)) {
    x = this.a * ksp * cosphi * Math.sin(dlon);
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p.x = x;
  p.y = y;
  return p;
}

function inverse$5(p) {
  var rh; /* height above ellipsoid      */
  var z; /* angle          */
  var sinz, cosz; /* sin of z and cos of z      */
  var con;
  var lon, lat;
  /* Inverse equations
      -----------------*/
  p.x -= this.x0;
  p.y -= this.y0;
  rh = Math.sqrt(p.x * p.x + p.y * p.y);
  z = asinz(rh / this.a);

  sinz = Math.sin(z);
  cosz = Math.cos(z);

  lon = this.long0;
  if (Math.abs(rh) <= EPSLN) {
    lat = this.lat0;
    p.x = lon;
    p.y = lat;
    return p;
  }
  lat = asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh);
  con = Math.abs(this.lat0) - HALF_PI;
  if (Math.abs(con) <= EPSLN) {
    if (this.lat0 >= 0) {
      lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
    }
    else {
      lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
    }
    p.x = lon;
    p.y = lat;
    return p;
  }
  lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz), rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
  p.x = lon;
  p.y = lat;
  return p;
}

var names$5 = ["ortho"];
var ortho = {
  init: init$5,
  forward: forward$5,
  inverse: inverse$5,
  names: names$5
};

// QSC projection rewritten from the original PROJ4
// https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c


/* constants */
var FACE_ENUM = {
    FRONT: 1,
    RIGHT: 2,
    BACK: 3,
    LEFT: 4,
    TOP: 5,
    BOTTOM: 6
};

var AREA_ENUM = {
    AREA_0: 1,
    AREA_1: 2,
    AREA_2: 3,
    AREA_3: 4
};

function init$4() {

  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";

  /* Determine the cube face from the center of projection. */
  if (this.lat0 >= HALF_PI - FORTPI / 2.0) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(HALF_PI - FORTPI / 2.0)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= FORTPI) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
    this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }

  /* Fill in useful values for the ellipsoid <-> sphere shift
   * described in [LK12]. */
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}

// QSC forward equations--mapping lat,long to x,y
// -----------------------------------------------------------------
function forward$4(p) {
  var xy = {x: 0, y: 0};
  var lat, lon;
  var theta, phi;
  var t, mu;
  /* nu; */
  var area = {value: 0};

  // move lon according to projection's lon
  p.x -= this.long0;

  /* Convert the geodetic latitude to a geocentric latitude.
   * This corresponds to the shift from the ellipsoid to the sphere
   * described in [LK12]. */
  if (this.es !== 0) {//if (P->es != 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
  } else {
    lat = p.y;
  }

  /* Convert the input lat, lon into theta, phi as used by QSC.
   * This depends on the cube face and the area on it.
   * For the top and bottom face, we can compute theta and phi
   * directly from phi, lam. For the other faces, we must use
   * unit sphere cartesian coordinates as an intermediate step. */
  lon = p.x; //lon = lp.lam;
  if (this.face === FACE_ENUM.TOP) {
    phi = HALF_PI - lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - HALF_PI;
    } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_1;
      theta = (lon > 0.0 ? lon - SPI : lon + SPI);
    } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = HALF_PI + lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + HALF_PI;
    } else if (lon < FORTPI && lon >= -FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = (lon > 0.0 ? -lon + SPI : -lon - SPI);
    }
  } else {
    var q, r, s;
    var sinlat, coslat;
    var sinlon, coslon;

    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -HALF_PI);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;

    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q, area);
    } else {
      /* Impossible */
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }

  /* Compute mu and nu for the area of definition.
   * For mu, see Eq. (3-21) in [OL76], but note the typos:
   * compare with Eq. (3-14). For nu, see Eq. (3-38). */
  mu = Math.atan((12 / SPI) * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

  /* Apply the result to the real area. */
  if (area.value === AREA_ENUM.AREA_1) {
    mu += HALF_PI;
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += SPI;
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * SPI;
  }

  /* Now compute x, y from mu and nu */
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;

  p.x = xy.x;
  p.y = xy.y;
  return p;
}

// QSC inverse equations--mapping x,y to lat/long
// -----------------------------------------------------------------
function inverse$4(p) {
  var lp = {lam: 0, phi: 0};
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = {value: 0};

  /* de-offset */
  p.x = (p.x - this.x0) / this.a;
  p.y = (p.y - this.y0) / this.a;

  /* Convert the input x, y to the mu and nu angles as used by QSC.
   * This depends on the area of the cube face. */
  nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
  mu = Math.atan2(p.y, p.x);
  if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= HALF_PI;
  } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = (mu < 0.0 ? mu + SPI : mu - SPI);
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += HALF_PI;
  }

  /* Compute phi and theta for the area of definition.
   * The inverse projection is not described in the original paper, but some
   * good hints can be found here (as of 2011-12-14):
   * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
   * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
  t = (SPI / 12) * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - (1 / Math.sqrt(2)));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > +1) {
    cosphi = +1;
  }

  /* Apply the result to the real area on the cube face.
   * For the top and bottom face, we can compute phi and lam directly.
   * For the other faces, we must use unit sphere cartesian coordinates
   * as an intermediate step. */
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = HALF_PI - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = (theta < 0.0 ? theta + SPI : theta - SPI);
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - HALF_PI;
    } else /* area.value == AREA_ENUM.AREA_3 */ {
      lp.lam = theta;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - HALF_PI;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - HALF_PI;
    } else /* area.value == AREA_ENUM.AREA_3 */ {
      lp.lam = (theta < 0.0 ? -theta - SPI : -theta + SPI);
    }
  } else {
    /* Compute phi and lam via cartesian unit sphere coordinates. */
    var q, r, s;
    q = cosphi;
    t = q * q;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    /* Rotate q,r,s into the correct area. */
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    /* Rotate q,r,s into the correct cube face. */
    if (this.face === FACE_ENUM.RIGHT) {
      t = q;
      q = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q = -q;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q;
      q = r;
      r = -t;
    }
    /* Now compute phi and lam from the unit sphere coordinates. */
    lp.phi = Math.acos(-s) - HALF_PI;
    lp.lam = Math.atan2(r, q);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
    }
  }

  /* Apply the shift from the sphere to the ellipsoid as described
   * in [LK12]. */
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = (lp.phi < 0 ? 1 : 0);
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }

  lp.lam += this.long0;
  p.x = lp.lam;
  p.y = lp.phi;
  return p;
}

/* Helper function for forward projection: compute the theta angle
 * and determine the area number. */
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < EPSLN) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0.0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= FORTPI) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta -= HALF_PI;
    } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = (theta >= 0.0 ? theta - SPI : theta + SPI);
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += HALF_PI;
    }
  }
  return theta;
}

/* Helper function: shift the longitude. */
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -SPI) {
    slon += TWO_PI;
  } else if (slon > +SPI) {
    slon -= TWO_PI;
  }
  return slon;
}

var names$4 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
var qsc = {
  init: init$4,
  forward: forward$4,
  inverse: inverse$4,
  names: names$4
};

// Robinson projection
// Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
// Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039


var COEFS_X = [
    [1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06],
    [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06],
    [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07],
    [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06],
    [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06],
    [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08],
    [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06],
    [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06],
    [0.9216, -0.00467746, -0.00010457, 4.81243e-06],
    [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06],
    [0.8679, -0.00609363, -0.000113898, 3.32484e-06],
    [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07],
    [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07],
    [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06],
    [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06],
    [0.6732, -0.00986209, -0.000199569, 1.91974e-05],
    [0.6213, -0.010418, 8.83923e-05, 6.24051e-06],
    [0.5722, -0.00906601, 0.000182, 6.24051e-06],
    [0.5322, -0.00677797, 0.000275608, 6.24051e-06]
];

var COEFS_Y = [
    [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
    [0.0620, 0.0124, -1.26793e-09, 4.22642e-10],
    [0.1240, 0.0124, 5.07171e-09, -1.60604e-09],
    [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09],
    [0.2480, 0.0124002, 7.10039e-08, -2.24e-08],
    [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08],
    [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07],
    [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07],
    [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07],
    [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07],
    [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07],
    [0.6769, 0.011713, -3.20223e-05, -5.16405e-07],
    [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07],
    [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06],
    [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09],
    [0.8936, 0.00969686, -6.4636e-05, -8.547e-06],
    [0.9394, 0.00840947, -0.000192841, -4.2106e-06],
    [0.9761, 0.00616527, -0.000256, -4.2106e-06],
    [1.0000, 0.00328947, -0.000319159, -4.2106e-06]
];

var FXC = 0.8487;
var FYC = 1.3523;
var C1 = R2D/5; // rad to 5-degree interval
var RC1 = 1/C1;
var NODES = 18;

var poly3_val = function(coefs, x) {
    return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
};

var poly3_der = function(coefs, x) {
    return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
};

function newton_rapshon(f_df, start, max_err, iters) {
    var x = start;
    for (; iters; --iters) {
        var upd = f_df(x);
        x -= upd;
        if (Math.abs(upd) < max_err) {
            break;
        }
    }
    return x;
}

function init$3() {
    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.long0 = this.long0 || 0;
    this.es = 0;
    this.title = this.title || "Robinson";
}

function forward$3(ll) {
    var lon = adjust_lon(ll.x - this.long0);

    var dphi = Math.abs(ll.y);
    var i = Math.floor(dphi * C1);
    if (i < 0) {
        i = 0;
    } else if (i >= NODES) {
        i = NODES - 1;
    }
    dphi = R2D * (dphi - RC1 * i);
    var xy = {
        x: poly3_val(COEFS_X[i], dphi) * lon,
        y: poly3_val(COEFS_Y[i], dphi)
    };
    if (ll.y < 0) {
        xy.y = -xy.y;
    }

    xy.x = xy.x * this.a * FXC + this.x0;
    xy.y = xy.y * this.a * FYC + this.y0;
    return xy;
}

function inverse$3(xy) {
    var ll = {
        x: (xy.x - this.x0) / (this.a * FXC),
        y: Math.abs(xy.y - this.y0) / (this.a * FYC)
    };

    if (ll.y >= 1) { // pathologic case
        ll.x /= COEFS_X[NODES][0];
        ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
    } else {
        // find table interval
        var i = Math.floor(ll.y * NODES);
        if (i < 0) {
            i = 0;
        } else if (i >= NODES) {
            i = NODES - 1;
        }
        for (;;) {
            if (COEFS_Y[i][0] > ll.y) {
                --i;
            } else if (COEFS_Y[i+1][0] <= ll.y) {
                ++i;
            } else {
                break;
            }
        }
        // linear interpolation in 5 degree interval
        var coefs = COEFS_Y[i];
        var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i+1][0] - coefs[0]);
        // find t so that poly3_val(coefs, t) = ll.y
        t = newton_rapshon(function(x) {
            return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
        }, t, EPSLN, 100);

        ll.x /= poly3_val(COEFS_X[i], t);
        ll.y = (5 * i + t) * D2R$1;
        if (xy.y < 0) {
            ll.y = -ll.y;
        }
    }

    ll.x = adjust_lon(ll.x + this.long0);
    return ll;
}

var names$3 = ["Robinson", "robin"];
var robin = {
  init: init$3,
  forward: forward$3,
  inverse: inverse$3,
  names: names$3
};

function init$2() {
    this.name = 'geocent';

}

function forward$2(p) {
    var point = geodeticToGeocentric(p, this.es, this.a);
    return point;
}

function inverse$2(p) {
    var point = geocentricToGeodetic(p, this.es, this.a, this.b);
    return point;
}

var names$2 = ["Geocentric", 'geocentric', "geocent", "Geocent"];
var geocent = {
    init: init$2,
    forward: forward$2,
    inverse: inverse$2,
    names: names$2
};

var mode = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
};

var params = {
  h:     { def: 100000, num: true },           // default is Karman line, no default in PROJ.7
  azi:   { def: 0, num: true, degrees: true }, // default is North
  tilt:  { def: 0, num: true, degrees: true }, // default is Nadir
  long0: { def: 0, num: true },                // default is Greenwich, conversion to rad is automatic
  lat0:  { def: 0, num: true }                 // default is Equator, conversion to rad is automatic
};

function init$1() {
  Object.keys(params).forEach(function (p) {
    if (typeof this[p] === "undefined") {
      this[p] = params[p].def;
    } else if (params[p].num && isNaN(this[p])) {
      throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
    } else if (params[p].num) {
      this[p] = parseFloat(this[p]);
    }
    if (params[p].degrees) {
      this[p] = this[p] * D2R$1;
    }
  }.bind(this));

  if (Math.abs((Math.abs(this.lat0) - HALF_PI)) < EPSLN) {
    this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
  } else if (Math.abs(this.lat0) < EPSLN) {
    this.mode = mode.EQUIT;
  } else {
    this.mode = mode.OBLIQ;
    this.sinph0 = Math.sin(this.lat0);
    this.cosph0 = Math.cos(this.lat0);
  }

  this.pn1 = this.h / this.a;  // Normalize relative to the Earth's radius

  if (this.pn1 <= 0 || this.pn1 > 1e10) {
    throw new Error("Invalid height");
  }
  
  this.p = 1 + this.pn1;
  this.rp = 1 / this.p;
  this.h1 = 1 / this.pn1;
  this.pfact = (this.p + 1) * this.h1;
  this.es = 0;

  var omega = this.tilt;
  var gamma = this.azi;
  this.cg = Math.cos(gamma);
  this.sg = Math.sin(gamma);
  this.cw = Math.cos(omega);
  this.sw = Math.sin(omega);
}

function forward$1(p) {
  p.x -= this.long0;
  var sinphi = Math.sin(p.y);
  var cosphi = Math.cos(p.y);
  var coslam = Math.cos(p.x);
  var x, y;
  switch (this.mode) {
    case mode.OBLIQ:
      y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y = cosphi * coslam;
      break;
    case mode.S_POLE:
      y = -sinphi;
      break;
    case mode.N_POLE:
      y = sinphi;
      break;
  }
  y = this.pn1 / (this.p - y);
  x = y * cosphi * Math.sin(p.x);

  switch (this.mode) {
    case mode.OBLIQ:
      y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y *= sinphi;
      break;
    case mode.N_POLE:
      y *= -(cosphi * coslam);
      break;
    case mode.S_POLE:
      y *= cosphi * coslam;
      break;
  }

  // Tilt 
  var yt, ba;
  yt = y * this.cg + x * this.sg;
  ba = 1 / (yt * this.sw * this.h1 + this.cw);
  x = (x * this.cg - y * this.sg) * this.cw * ba;
  y = yt * ba;

  p.x = x * this.a;
  p.y = y * this.a;
  return p;
}

function inverse$1(p) {
  p.x /= this.a;
  p.y /= this.a;
  var r = { x: p.x, y: p.y };

  // Un-Tilt
  var bm, bq, yt;
  yt = 1 / (this.pn1 - p.y * this.sw);
  bm = this.pn1 * p.x * yt;
  bq = this.pn1 * p.y * this.cw * yt;
  p.x = bm * this.cg + bq * this.sg;
  p.y = bq * this.cg - bm * this.sg;

  var rh = hypot(p.x, p.y);
  if (Math.abs(rh) < EPSLN) {
    r.x = 0;
    r.y = p.y;
  } else {
    var cosz, sinz;
    sinz = 1 - rh * rh * this.pfact;
    sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
    cosz = Math.sqrt(1 - sinz * sinz);
    switch (this.mode) {
      case mode.OBLIQ:
        r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
        p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
        p.x *= sinz * this.cosph0;
        break;
      case mode.EQUIT:
        r.y = Math.asin(p.y * sinz / rh);
        p.y = cosz * rh;
        p.x *= sinz;
        break;
      case mode.N_POLE:
        r.y = Math.asin(cosz);
        p.y = -p.y;
        break;
      case mode.S_POLE:
        r.y = -Math.asin(cosz);
        break;
    }
    r.x = Math.atan2(p.x, p.y);
  }

  p.x = r.x + this.long0;
  p.y = r.y;
  return p;
}

var names$1 = ["Tilted_Perspective", "tpers"];
var tpers = {
  init: init$1,
  forward: forward$1,
  inverse: inverse$1,
  names: names$1
};

function init() {
    this.flip_axis = (this.sweep === 'x' ? 1 : 0);
    this.h = Number(this.h);
    this.radius_g_1 = this.h / this.a;

    if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
        throw new Error();
    }

    this.radius_g = 1.0 + this.radius_g_1;
    this.C = this.radius_g * this.radius_g - 1.0;

    if (this.es !== 0.0) {
        var one_es = 1.0 - this.es;
        var rone_es = 1 / one_es;

        this.radius_p = Math.sqrt(one_es);
        this.radius_p2 = one_es;
        this.radius_p_inv2 = rone_es;

        this.shape = 'ellipse'; // Use as a condition in the forward and inverse functions.
    } else {
        this.radius_p = 1.0;
        this.radius_p2 = 1.0;
        this.radius_p_inv2 = 1.0;

        this.shape = 'sphere';  // Use as a condition in the forward and inverse functions.
    }

    if (!this.title) {
        this.title = "Geostationary Satellite View";
    }
}

function forward(p) {
    var lon = p.x;
    var lat = p.y;
    var tmp, v_x, v_y, v_z;
    lon = lon - this.long0;

    if (this.shape === 'ellipse') {
        lat = Math.atan(this.radius_p2 * Math.tan(lat));
        var r = this.radius_p / hypot(this.radius_p * Math.cos(lat), Math.sin(lat));

        v_x = r * Math.cos(lon) * Math.cos(lat);
        v_y = r * Math.sin(lon) * Math.cos(lat);
        v_z = r * Math.sin(lat);

        if (((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2) < 0.0) {
            p.x = Number.NaN;
            p.y = Number.NaN;
            return p;
        }

        tmp = this.radius_g - v_x;
        if (this.flip_axis) {
            p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
            p.y = this.radius_g_1 * Math.atan(v_z / tmp);
        } else {
            p.x = this.radius_g_1 * Math.atan(v_y / tmp);
            p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
        }
    } else if (this.shape === 'sphere') {
        tmp = Math.cos(lat);
        v_x = Math.cos(lon) * tmp;
        v_y = Math.sin(lon) * tmp;
        v_z = Math.sin(lat);
        tmp = this.radius_g - v_x;

        if (this.flip_axis) {
            p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
            p.y = this.radius_g_1 * Math.atan(v_z / tmp);
        } else {
            p.x = this.radius_g_1 * Math.atan(v_y / tmp);
            p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
        }
    }
    p.x = p.x * this.a;
    p.y = p.y * this.a;
    return p;
}

function inverse(p) {
    var v_x = -1.0;
    var v_y = 0.0;
    var v_z = 0.0;
    var a, b, det, k;

    p.x = p.x / this.a;
    p.y = p.y / this.a;

    if (this.shape === 'ellipse') {
        if (this.flip_axis) {
            v_z = Math.tan(p.y / this.radius_g_1);
            v_y = Math.tan(p.x / this.radius_g_1) * hypot(1.0, v_z);
        } else {
            v_y = Math.tan(p.x / this.radius_g_1);
            v_z = Math.tan(p.y / this.radius_g_1) * hypot(1.0, v_y);
        }

        var v_zp = v_z / this.radius_p;
        a = v_y * v_y + v_zp * v_zp + v_x * v_x;
        b = 2 * this.radius_g * v_x;
        det = (b * b) - 4 * a * this.C;

        if (det < 0.0) {
            p.x = Number.NaN;
            p.y = Number.NaN;
            return p;
        }

        k = (-b - Math.sqrt(det)) / (2.0 * a);
        v_x = this.radius_g + k * v_x;
        v_y *= k;
        v_z *= k;

        p.x = Math.atan2(v_y, v_x);
        p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
        p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
    } else if (this.shape === 'sphere') {
        if (this.flip_axis) {
            v_z = Math.tan(p.y / this.radius_g_1);
            v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1.0 + v_z * v_z);
        } else {
            v_y = Math.tan(p.x / this.radius_g_1);
            v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1.0 + v_y * v_y);
        }

        a = v_y * v_y + v_z * v_z + v_x * v_x;
        b = 2 * this.radius_g * v_x;
        det = (b * b) - 4 * a * this.C;
        if (det < 0.0) {
            p.x = Number.NaN;
            p.y = Number.NaN;
            return p;
        }

        k = (-b - Math.sqrt(det)) / (2.0 * a);
        v_x = this.radius_g + k * v_x;
        v_y *= k;
        v_z *= k;

        p.x = Math.atan2(v_y, v_x);
        p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
    }
    p.x = p.x + this.long0;
    return p;
}

var names = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
var geos = {
    init: init,
    forward: forward,
    inverse: inverse,
    names: names,
};

function includedProjections(proj4){
  proj4.Proj.projections.add(tmerc);
  proj4.Proj.projections.add(etmerc);
  proj4.Proj.projections.add(utm);
  proj4.Proj.projections.add(sterea);
  proj4.Proj.projections.add(stere);
  proj4.Proj.projections.add(somerc);
  proj4.Proj.projections.add(omerc);
  proj4.Proj.projections.add(lcc);
  proj4.Proj.projections.add(krovak);
  proj4.Proj.projections.add(cass);
  proj4.Proj.projections.add(laea);
  proj4.Proj.projections.add(aea);
  proj4.Proj.projections.add(gnom);
  proj4.Proj.projections.add(cea);
  proj4.Proj.projections.add(eqc);
  proj4.Proj.projections.add(poly);
  proj4.Proj.projections.add(nzmg);
  proj4.Proj.projections.add(mill);
  proj4.Proj.projections.add(sinu);
  proj4.Proj.projections.add(moll);
  proj4.Proj.projections.add(eqdc);
  proj4.Proj.projections.add(vandg);
  proj4.Proj.projections.add(aeqd);
  proj4.Proj.projections.add(ortho);
  proj4.Proj.projections.add(qsc);
  proj4.Proj.projections.add(robin);
  proj4.Proj.projections.add(geocent);
  proj4.Proj.projections.add(tpers);
  proj4.Proj.projections.add(geos);
}

proj4.defaultDatum = 'WGS84'; //default datum
proj4.Proj = Projection;
proj4.WGS84 = new proj4.Proj('WGS84');
proj4.Point = Point;
proj4.toPoint = common;
proj4.defs = defs;
proj4.nadgrid = nadgrid;
proj4.transform = transform;
proj4.mgrs = mgrs;
proj4.version = '__VERSION__';
includedProjections(proj4);

var f,m="deflate-raw",x=self.DecompressionStream;try{new x(m),f=async t=>{let n=new x(m),e=n.writable.getWriter(),i=n.readable.getReader();e.write(t),e.close();let c,o=[],s=0,a=0,l;for(;!(l=await i.read()).done;)c=l.value,o.push(c),s+=c.length;return o.length-1?(c=new Uint8Array(s),o.map(r=>{c.set(r,a),a+=r.length;}),c):o[0]};}catch{}var _=new TextDecoder,h=t=>{throw new Error("but-unzip~"+t)},E=t=>_.decode(t),A=t=>{let n=t.length-20,e=Math.max(n-65516,2);for(;(n=t.lastIndexOf(80,n-1))!==-1&&!(t[n+1]===75&&t[n+2]===5&&t[n+3]===6)&&n>e;);return n};function*C(t,n=f){let e=A(t);e===-1&&h(2);let i=(r,d)=>t.subarray(e+=r,e+=d),c=new DataView(t.buffer,t.byteOffset),o=r=>c.getUint16(r+e,!0),s=r=>c.getUint32(r+e,!0),a=o(10);for(a!==o(8)&&h(3),e=s(16);a--;){let r=o(10),d=o(28),g=o(30),y=o(32),b=s(20),w=s(42),p=E(i(46,d)),D=E(i(g,y)),L=e,u;e=w,u=i(30+o(26)+o(28),b),yield {filename:p,comment:D,read:()=>r&8?n(u):r?h(1):u},e=L;}}

const regex$1 = /.+\.(shp|dbf|json|prj|cpg)$/i;
var unzip = async (buffer) => {
  const files = {};
  const proms = [];
  for (const entry of C(buffer)) {
    if (!regex$1.test(entry.filename)) {
      continue;
    }
    proms.push(Promise.resolve(entry.read()).then(bytes => files[entry.filename] = bytes));
  }
  await Promise.all(proms);
  const out = {};
  const decoder = new TextDecoder();
  for (const [key, value] of Object.entries(files)) {
    if (key.slice(-3).toLowerCase() === 'shp' || key.slice(-3).toLowerCase() === 'dbf') {
      out[key] = new DataView(value.buffer, value.byteOffset, value.byteLength);
    } else {
      out[key] = decoder.decode(value);
    }
  }
  return out;
};

const URL$1 = globalThis.URL;

var combine$1 = (base, type) => {
  if (!type) {
    return base;
  }
  const url = new URL$1(base);
  url.pathname = `${url.pathname}.${type}`;
  return url.href;
};

async function binaryAjax(_url, type) {

  const url = combine$1(_url, type);
  const isOptionalTxt = type === 'prj' || type === 'cpg';
  try {
    const resp = await fetch(url);
    if (resp.status > 399) {
      throw new Error(resp.statusText);
    }
    if (isOptionalTxt) {
      return resp.text();
    }
    const parsed = await resp.arrayBuffer();
    return new DataView(parsed)
  } catch (e) {
    if (isOptionalTxt || type === 'dbf') {
      return false;
    }
    throw e;
  }
}

function isClockWise(array) {
  let sum = 0;
  let i = 1;
  const len = array.length;
  let prev, cur;
  const bbox = [array[0][0], array[0][1], array[0][0], array[0][1]];
  while (i < len) {
    prev = cur || array[0];
    cur = array[i];
    sum += ((cur[0] - prev[0]) * (cur[1] + prev[1]));
    i++;
    if (cur[0] < bbox[0]) {
      bbox[0] = cur[0];
    }
    if (cur[1] < bbox[1]) {
      bbox[1] = cur[1];
    }
    if (cur[0] > bbox[2]) {
      bbox[2] = cur[0];
    }
    if (cur[1] > bbox[3]) {
      bbox[3] = cur[1];
    }
  }
  return {
    ring: array,
    clockWise: sum > 0,
    bbox,
    children: []
  }

}

function contains(outer, inner) {
  if (outer.bbox[0] > inner.bbox[0]) {
    return false;
  }
  if (outer.bbox[1] > inner.bbox[1]) {
    return false;
  }
  if (outer.bbox[2] < inner.bbox[2]) {
    return false;
  }
  if (outer.bbox[3] < inner.bbox[3]) {
    return false;
  }
  return true;
}

function handleRings(rings) {
  const outers = [];
  const inners = [];
  for (const ring of rings) {
    const proccessed = isClockWise(ring);
    if (proccessed.clockWise) {
      outers.push(proccessed);
    } else {
      inners.push(proccessed);
    }
  }
  // this is an optimization, 
  // but it would also put in weird bad rings that would otherwise get left out
  // if (outers.length === 1) {
  //   const out = [outers[0].ring]
  //   for (const inner of inners) {
  //     out.push(inner.ring);

  //   }
  //   return [out];
  // }
  for (const inner of inners) {
    for (const outer of outers) {
      if (contains(outer, inner)) {
        outer.children.push(inner.ring);
        break;
      }
    }
  }
  const out = [];
  for (const outer of outers) {
    out.push([outer.ring].concat(outer.children));
  }
  return out;
}
ParseShp.prototype.parsePoint = function (data) {
  return {
    type: 'Point',
    coordinates: this.parseCoord(data, 0)
  };
};
ParseShp.prototype.parseZPoint = function (data) {
  const pointXY = this.parsePoint(data);
  pointXY.coordinates.push(data.getFloat64(16, true));
  return pointXY;
};
ParseShp.prototype.parsePointArray = function (data, offset, num) {
  const out = [];
  let done = 0;
  while (done < num) {
    out.push(this.parseCoord(data, offset));
    offset += 16;
    done++;
  }
  return out;
};
ParseShp.prototype.parseZPointArray = function (data, zOffset, num, coordinates) {
  let i = 0;
  while (i < num) {
    coordinates[i].push(data.getFloat64(zOffset, true));
    i++;
    zOffset += 8;
  }
  return coordinates;
};
ParseShp.prototype.parseArrayGroup = function (data, offset, partOffset, num, tot) {
  const out = [];
  let done = 0;
  let curNum; let nextNum = 0;
  let pointNumber;
  while (done < num) {
    done++;
    partOffset += 4;
    curNum = nextNum;
    if (done === num) {
      nextNum = tot;
    } else {
      nextNum = data.getInt32(partOffset, true);
    }
    pointNumber = nextNum - curNum;
    if (!pointNumber) {
      continue;
    }
    out.push(this.parsePointArray(data, offset, pointNumber));
    offset += (pointNumber << 4);
  }
  return out;
};
ParseShp.prototype.parseZArrayGroup = function (data, zOffset, num, coordinates) {
  let i = 0;
  while (i < num) {
    coordinates[i] = this.parseZPointArray(data, zOffset, coordinates[i].length, coordinates[i]);
    zOffset += (coordinates[i].length << 3);
    i++;
  }
  return coordinates;
};
ParseShp.prototype.parseMultiPoint = function (data) {
  const out = {};
  const num = data.getInt32(32, true);
  if (!num) {
    return null;
  }
  const mins = this.parseCoord(data, 0);
  const maxs = this.parseCoord(data, 16);
  out.bbox = [
    mins[0],
    mins[1],
    maxs[0],
    maxs[1]
  ];
  const offset = 36;
  if (num === 1) {
    out.type = 'Point';
    out.coordinates = this.parseCoord(data, offset);
  } else {
    out.type = 'MultiPoint';
    out.coordinates = this.parsePointArray(data, offset, num);
  }
  return out;
};
ParseShp.prototype.parseZMultiPoint = function (data) {
  const geoJson = this.parseMultiPoint(data);
  if (!geoJson) {
    return null;
  }
  let num;
  if (geoJson.type === 'Point') {
    geoJson.coordinates.push(data.getFloat64(72, true));
    return geoJson;
  } else {
    num = geoJson.coordinates.length;
  }
  const zOffset = 52 + (num << 4);
  geoJson.coordinates = this.parseZPointArray(data, zOffset, num, geoJson.coordinates);
  return geoJson;
};
ParseShp.prototype.parsePolyline = function (data) {
  const out = {};
  const numParts = data.getInt32(32, true);
  if (!numParts) {
    return null;
  }
  const mins = this.parseCoord(data, 0);
  const maxs = this.parseCoord(data, 16);
  out.bbox = [
    mins[0],
    mins[1],
    maxs[0],
    maxs[1]
  ];
  const num = data.getInt32(36, true);
  let offset, partOffset;
  if (numParts === 1) {
    out.type = 'LineString';
    offset = 44;
    out.coordinates = this.parsePointArray(data, offset, num);
  } else {
    out.type = 'MultiLineString';
    offset = 40 + (numParts << 2);
    partOffset = 40;
    out.coordinates = this.parseArrayGroup(data, offset, partOffset, numParts, num);
  }
  return out;
};
ParseShp.prototype.parseZPolyline = function (data) {
  const geoJson = this.parsePolyline(data);
  if (!geoJson) {
    return null;
  }
  const num = geoJson.coordinates.length;
  let zOffset;
  if (geoJson.type === 'LineString') {
    zOffset = 60 + (num << 4);
    geoJson.coordinates = this.parseZPointArray(data, zOffset, num, geoJson.coordinates);
    return geoJson;
  } else {
    const totalPoints = geoJson.coordinates.reduce(function (a, v) {
      return a + v.length;
    }, 0);
    zOffset = 56 + (totalPoints << 4) + (num << 2);
    geoJson.coordinates = this.parseZArrayGroup(data, zOffset, num, geoJson.coordinates);
    return geoJson;
  }
};
ParseShp.prototype.polyFuncs = function (out) {
  if (!out) {
    return out;
  }
  if (out.type === 'LineString') {
    out.type = 'Polygon';
    out.coordinates = [out.coordinates];
    return out;
  } else {
    out.coordinates = handleRings(out.coordinates);
    if (out.coordinates.length === 1) {
      out.type = 'Polygon';
      out.coordinates = out.coordinates[0];
      return out;
    } else {
      out.type = 'MultiPolygon';
      return out;
    }
  }
};
ParseShp.prototype.parsePolygon = function (data) {
  return this.polyFuncs(this.parsePolyline(data));
};
ParseShp.prototype.parseZPolygon = function (data) {
  return this.polyFuncs(this.parseZPolyline(data));
};
const shpFuncObj = {
  1: 'parsePoint',
  3: 'parsePolyline',
  5: 'parsePolygon',
  8: 'parseMultiPoint',
  11: 'parseZPoint',
  13: 'parseZPolyline',
  15: 'parseZPolygon',
  18: 'parseZMultiPoint'
};

function makeParseCoord(trans) {
  if (trans) {
    return function (data, offset) {
      const args = [data.getFloat64(offset, true), data.getFloat64(offset + 8, true)];
      return trans.inverse(args);
    };
  } else {
    return function (data, offset) {
      return [data.getFloat64(offset, true), data.getFloat64(offset + 8, true)];
    };
  }
}

function ParseShp(buffer, trans) {
  if (!(this instanceof ParseShp)) {
    return new ParseShp(buffer, trans);
  }
  this.buffer = buffer;
  this.headers = this.parseHeader();
  this.shpFuncs(trans);
  this.rows = this.getRows();
}
ParseShp.prototype.shpFuncs = function (tran) {
  let num = this.headers.shpCode;
  if (num > 20) {
    num -= 20;
  }
  if (!(num in shpFuncObj)) {
    throw new Error(`I don't know shp type "${num}"`);
  }
  this.parseFunc = this[shpFuncObj[num]];
  this.parseCoord = makeParseCoord(tran);
};
ParseShp.prototype.getShpCode = function () {
  return this.parseHeader().shpCode;
};
ParseShp.prototype.parseHeader = function () {
  const view = this.buffer;
  return {
    length: view.getInt32(6 << 2) << 1,
    version: view.getInt32(7 << 2, true),
    shpCode: view.getInt32(8 << 2, true),
    bbox: [
      view.getFloat64(9 << 2, true),
      view.getFloat64(11 << 2, true),
      view.getFloat64(13 << 2, true),
      view.getFloat64(15 << 2, true)
    ]
  };
};
ParseShp.prototype.getRows = function () {
  let offset = 100;
  const len = this.buffer.byteLength - 8;
  const out = [];
  let current;
  while (offset <= len) {
    current = this.getRow(offset);
    if (!current) {
      break;
    }
    offset += 8;
    offset += current.len;
    if (current.type) {
      out.push(this.parseFunc(current.data));
    } else {
      out.push(null);
    }
  }
  return out;
};
ParseShp.prototype.getRow = function (offset) {
  const id = this.buffer.getInt32(offset);
  const len = this.buffer.getInt32(offset + 4) << 1;
  if (len === 0) {
    return {
      id: id,
      len: len,
      type: 0
    };
  }

  if (offset + len + 8 > this.buffer.byteLength) {
    return;
  }
  return {
    id: id,
    len: len,
    data: new DataView(this.buffer.buffer, this.buffer.byteOffset + offset + 12, len - 4),
    type: this.buffer.getInt32(offset + 8, true)
  };
};
function parseShp (buffer, trans) {
  return new ParseShp(buffer, trans).rows;
}

var regex = /^(?:ANSI\s)?(\d+)$/m;
function createDecoder(encoding, second) {
  if (!encoding) {
    return browserDecoder;
  }
  try {
    new TextDecoder(encoding.trim());
  } catch (e) {
    var match = regex.exec(encoding);
    if (match && !second) {
      return createDecoder('windows-' + match[1], true);
    } else {
      encoding = undefined;
      return browserDecoder;
    }
  }
  return browserDecoder;
  function browserDecoder(buffer) {
    var decoder = new TextDecoder(encoding ? encoding : undefined);
    var out = decoder.decode(buffer, {
      stream: true
    }) + decoder.decode();
    return out.replace(/\0/g, '').trim();
  }
}

function dbfHeader(data) {
  var out = {};
  out.lastUpdated = new Date(data.getUint8(1) + 1900, data.getUint8(2), data.getUint8(3));
  out.records = data.getUint32(4, true);
  out.headerLen = data.getUint16(8, true);
  out.recLen = data.getUint16(10, true);
  return out;
}

function dbfRowHeader(data, headerLen, decoder) {
  var out = [];
  var offset = 32;
  while (offset < headerLen) {
    out.push({
      name: decoder(new Uint8Array(data.buffer.slice(data.byteOffset + offset, data.byteOffset + offset + 11))),
      dataType: String.fromCharCode(data.getUint8(offset + 11)),
      len: data.getUint8(offset + 16),
      decimal: data.getUint8(offset + 17)
    });
    if (data.getUint8(offset + 32) === 13) {
      break;
    } else {
      offset += 32;
    }
  }
  return out;
}

function rowFuncs(buffer, offset, len, type, decoder) {
  const data = new Uint8Array(buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + len));

  var textData = decoder(data);
  switch (type) {
    case 'N':
    case 'F':
    case 'O':
      return parseFloat(textData, 10);
    case 'D':
      return new Date(textData.slice(0, 4), parseInt(textData.slice(4, 6), 10) - 1, textData.slice(6, 8));
    case 'L':
      return textData.toLowerCase() === 'y' || textData.toLowerCase() === 't';
    default:
      return textData;
  }
}

function parseRow(buffer, offset, rowHeaders, decoder) {
  var out = {};
  var i = 0;
  var len = rowHeaders.length;
  var field;
  var header;
  while (i < len) {
    header = rowHeaders[i];
    field = rowFuncs(buffer, offset, header.len, header.dataType, decoder);
    offset += header.len;
    if (typeof field !== 'undefined') {
      out[header.name] = field;
    }
    i++;
  }
  return out;
}

function parseDbf (buffer, encoding) {
  var decoder = createDecoder(encoding);
  var header = dbfHeader(buffer);
  var rowHeaders = dbfRowHeader(buffer, header.headerLen - 1, decoder);

  var offset = ((rowHeaders.length + 1) << 5) + 2;
  var recLen = header.recLen;
  var records = header.records;
  var out = [];
  while (records) {
    out.push(parseRow(buffer, offset, rowHeaders, decoder));
    offset += recLen;
    records--;
  }
  return out;
}

const URL = globalThis.URL;
const toUitn8Arr = b => {
  if (!b) {
    throw new Error('forgot to pass buffer');
  }
  if (isArrayBuffer(b)) {
    return new Uint8Array(b);
  }
  if (isArrayBuffer(b.buffer)) {
    if (b.BYTES_PER_ELEMENT === 1) {
      return b;
    }
    return new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
  }
  throw new Error('invalid buffer like object')
};
const txtDecoder = new TextDecoder();
const toString = (possibleString) => {
  if (!possibleString) {
    return;
  }
  if (typeof possibleString === 'string') {
    return possibleString;
  }
  if (isArrayBuffer(possibleString) || ArrayBuffer.isView(possibleString) || isDataView(possibleString)) {
    return txtDecoder.decode(possibleString);
  }
};
const toDataView = b => {
  if (!b) {
    throw new Error('forgot to pass buffer');
  }
  if (isDataView(b)) {
    return b;
  }
  if (isArrayBuffer(b)) {
    return new DataView(b);
  }
  if (isArrayBuffer(b.buffer)) {
    return new DataView(b.buffer, b.byteOffset, b.byteLength);
  }
  throw new Error('invalid buffer like object')
};

function isArrayBuffer(subject) {
  return subject instanceof globalThis.ArrayBuffer || Object.prototype.toString.call(subject) === '[object ArrayBuffer]';
}
function isDataView(subject) {
  return subject instanceof globalThis.DataView || Object.prototype.toString.call(subject) === '[object DataView]'
}

const combine = function ([shp, dbf]) {
  const out = {};
  out.type = 'FeatureCollection';
  out.features = [];
  let i = 0;
  const len = shp.length;
  if (!dbf) {
    dbf = [];
  }
  while (i < len) {
    out.features.push({
      type: 'Feature',
      geometry: shp[i],
      properties: dbf[i] || {}
    });
    i++;
  }
  return out;
};
const parseZip = async function (buffer, whiteList) {
  let key;
  buffer = toUitn8Arr(buffer);
  const zip = await unzip(buffer);
  const names = [];
  whiteList = whiteList || [];
  for (key in zip) {
    if (key.indexOf('__MACOSX') !== -1) {
      continue;
    }
    if (key.slice(-4).toLowerCase() === '.shp') {
      names.push(key.slice(0, -4));
      zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = zip[key];
    } else if (key.slice(-4).toLowerCase() === '.prj') {
      zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = proj4(zip[key]);
    } else if (key.slice(-5).toLowerCase() === '.json' || whiteList.indexOf(key.split('.').pop()) > -1) {
      names.push(key.slice(0, -3) + key.slice(-3).toLowerCase());
    } else if (key.slice(-4).toLowerCase() === '.dbf' || key.slice(-4).toLowerCase() === '.cpg') {
      zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = zip[key];
    }
  }
  if (!names.length) {
    throw new Error('no layers founds');
  }
  const geojson = names.map(function (name) {
    let parsed, dbf;
    const lastDotIdx = name.lastIndexOf('.');
    if (lastDotIdx > -1 && name.slice(lastDotIdx).indexOf('json') > -1) {
      parsed = JSON.parse(zip[name]);
      parsed.fileName = name.slice(0, lastDotIdx);
    } else if (whiteList.indexOf(name.slice(lastDotIdx + 1)) > -1) {
      parsed = zip[name];
      parsed.fileName = name;
    } else {
      if (zip[name + '.dbf']) {
        dbf = parseDbf(zip[name + '.dbf'], zip[name + '.cpg']);
      }
      parsed = combine([parseShp(zip[name + '.shp'], zip[name + '.prj']), dbf]);
      parsed.fileName = name;
    }
    return parsed;
  });
  if (geojson.length === 1) {
    return geojson[0];
  } else {
    return geojson;
  }
};
async function getZip(base, whiteList) {
  const a = await binaryAjax(base);
  return parseZip(a, whiteList);
}
const handleShp = async (base) => {
  const args = await Promise.all([
    binaryAjax(base, 'shp'),
    binaryAjax(base, 'prj')
  ]);
  let prj = false;
  try {
    if (args[1]) {
      prj = proj4(args[1]);
    }
  } catch (e) {
    prj = false;
  }
  return parseShp(args[0], prj);
};
const handleDbf = async (base) => {
  const [dbf, cpg] = await Promise.all([
    binaryAjax(base, 'dbf'),
    binaryAjax(base, 'cpg')
  ]);
  if (!dbf) {
    return;
  }
  return parseDbf(dbf, cpg);
};
const checkSuffix = (base, suffix) => {
  const url = new URL(base, globalThis?.document?.location);
  return url.pathname.slice(-4).toLowerCase() === suffix;
};
const fromObject = ({ shp, dbf, cpg, prj }) => {
  const things = [
    _parseShp(shp, prj)
  ];
  if (dbf) {
    things.push(_parseDbf(dbf, cpg));
  }
  return combine(things);
};
const getShapefile = async function (base, whiteList) {
  if (typeof base !== 'string') {
    if (isArrayBuffer(base) || ArrayBuffer.isView(base) || isDataView(base)) {
      return parseZip(base);
    }
    if (base.shp) {
      return fromObject(base);
    }
    throw new TypeError('must be a string, some sort of Buffer, or an object with at least a .shp property')
  }
  if (checkSuffix(base, '.zip')) {
    return getZip(base, whiteList);
  }
  if (checkSuffix(base, '.shp')) {
    base = base.slice(0, -4);
  }
  const results = await Promise.all([
    handleShp(base),
    handleDbf(base)
  ]);
  return combine(results);
};
const _parseShp = function (shp, prj) {
  shp = toDataView(shp);
  prj = toString(prj);
  if (typeof prj === 'string') {
    try {
      prj = proj4(prj);
    } catch (e) {
      prj = false;
    }
  }
  return parseShp(shp, prj);
};
const _parseDbf = function (dbf, cpg) {
  dbf = toDataView(dbf);
  cpg = toString(cpg);
  return parseDbf(dbf, cpg);
};




/***/ }),

/***/ 69153:
/*!***********************************************************!*\
  !*** ./node_modules/@tmcw/togeojson/dist/togeojson.es.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gpx: () => (/* binding */ gpx),
/* harmony export */   gpxGen: () => (/* binding */ gpxGen),
/* harmony export */   kml: () => (/* binding */ kml),
/* harmony export */   kmlGen: () => (/* binding */ kmlGen),
/* harmony export */   tcx: () => (/* binding */ tcx),
/* harmony export */   tcxGen: () => (/* binding */ tcxGen)
/* harmony export */ });
// cast array x into numbers
// get the content of a text node, if any
function nodeVal(x) {
  if (x && x.normalize) {
    x.normalize();
  }
  return (x && x.textContent) || "";
}

// one Y child of X, if any, otherwise null
function get1(x, y) {
  const n = x.getElementsByTagName(y);
  return n.length ? n[0] : null;
}

function getLineStyle(extensions) {
  const style = {};
  if (extensions) {
    const lineStyle = get1(extensions, "line");
    if (lineStyle) {
      const color = nodeVal(get1(lineStyle, "color")),
        opacity = parseFloat(nodeVal(get1(lineStyle, "opacity"))),
        width = parseFloat(nodeVal(get1(lineStyle, "width")));
      if (color) style.stroke = color;
      if (!isNaN(opacity)) style["stroke-opacity"] = opacity;
      // GPX width is in mm, convert to px with 96 px per inch
      if (!isNaN(width)) style["stroke-width"] = (width * 96) / 25.4;
    }
  }
  return style;
}

function getExtensions(node) {
  let values = [];
  if (node !== null) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType !== 1) continue;
      const name = ["heart", "gpxtpx:hr", "hr"].includes(child.nodeName)
        ? "heart"
        : child.nodeName;
      if (name === "gpxtpx:TrackPointExtension") {
        // loop again for nested garmin extensions (eg. "gpxtpx:hr")
        values = values.concat(getExtensions(child));
      } else {
        // push custom extension (eg. "power")
        const val = nodeVal(child);
        values.push([name, isNaN(val) ? val : parseFloat(val)]);
      }
    }
  }
  return values;
}

function getMulti(x, ys) {
  const o = {};
  let n;
  let k;
  for (k = 0; k < ys.length; k++) {
    n = get1(x, ys[k]);
    if (n) o[ys[k]] = nodeVal(n);
  }
  return o;
}
function getProperties$1(node) {
  const prop = getMulti(node, [
    "name",
    "cmt",
    "desc",
    "type",
    "time",
    "keywords",
  ]);
  // Parse additional data from our Garmin extension(s)
  const extensions = node.getElementsByTagNameNS(
    "http://www.garmin.com/xmlschemas/GpxExtensions/v3",
    "*"
  );
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];
    // Ignore nested extensions, like those on routepoints or trackpoints
    if (extension.parentNode.parentNode === node) {
      prop[extension.tagName.replace(":", "_")] = nodeVal(extension);
    }
  }
  const links = node.getElementsByTagName("link");
  if (links.length) prop.links = [];
  for (let i = 0; i < links.length; i++) {
    prop.links.push(
      Object.assign(
        { href: links[i].getAttribute("href") },
        getMulti(links[i], ["text", "type"])
      )
    );
  }
  return prop;
}

function coordPair$1(x) {
  const ll = [
    parseFloat(x.getAttribute("lon")),
    parseFloat(x.getAttribute("lat")),
  ];
  const ele = get1(x, "ele");
  const time = get1(x, "time");
  if (ele) {
    const e = parseFloat(nodeVal(ele));
    if (!isNaN(e)) {
      ll.push(e);
    }
  }

  return {
    coordinates: ll,
    time: time ? nodeVal(time) : null,
    extendedValues: getExtensions(get1(x, "extensions")),
  };
}
function getRoute(node) {
  const line = getPoints$1(node, "rtept");
  if (!line) return;
  return {
    type: "Feature",
    properties: Object.assign(
      getProperties$1(node),
      getLineStyle(get1(node, "extensions")),
      { _gpxType: "rte" }
    ),
    geometry: {
      type: "LineString",
      coordinates: line.line,
    },
  };
}

function getPoints$1(node, pointname) {
  const pts = node.getElementsByTagName(pointname);
  if (pts.length < 2) return; // Invalid line in GeoJSON

  const line = [];
  const times = [];
  const extendedValues = {};
  for (let i = 0; i < pts.length; i++) {
    const c = coordPair$1(pts[i]);
    line.push(c.coordinates);
    if (c.time) times.push(c.time);
    for (let j = 0; j < c.extendedValues.length; j++) {
      const [name, val] = c.extendedValues[j];
      const plural =
        name === "heart" ? name : name.replace("gpxtpx:", "") + "s";
      if (!extendedValues[plural]) {
        extendedValues[plural] = Array(pts.length).fill(null);
      }
      extendedValues[plural][i] = val;
    }
  }
  return {
    line: line,
    times: times,
    extendedValues: extendedValues,
  };
}

function getTrack(node) {
  const segments = node.getElementsByTagName("trkseg");
  const track = [];
  const times = [];
  const extractedLines = [];

  for (let i = 0; i < segments.length; i++) {
    const line = getPoints$1(segments[i], "trkpt");
    if (line) {
      extractedLines.push(line);
      if (line.times && line.times.length) times.push(line.times);
    }
  }

  if (extractedLines.length === 0) return;

  const multi = extractedLines.length > 1;

  const properties = Object.assign(
    getProperties$1(node),
    getLineStyle(get1(node, "extensions")),
    { _gpxType: "trk" },
    times.length
      ? {
          coordinateProperties: {
            times: multi ? times : times[0],
          },
        }
      : {}
  );

  for (let i = 0; i < extractedLines.length; i++) {
    const line = extractedLines[i];
    track.push(line.line);
    for (const [name, val] of Object.entries(line.extendedValues)) {
      if (!properties.coordinateProperties) {
        properties.coordinateProperties = {};
      }
      const props = properties.coordinateProperties;
      if (multi) {
        if (!props[name])
          props[name] = extractedLines.map((line) =>
            new Array(line.line.length).fill(null)
          );
        props[name][i] = val;
      } else {
        props[name] = val;
      }
    }
  }

  return {
    type: "Feature",
    properties: properties,
    geometry: multi
      ? {
          type: "MultiLineString",
          coordinates: track,
        }
      : {
          type: "LineString",
          coordinates: track[0],
        },
  };
}

function getPoint(node) {
  return {
    type: "Feature",
    properties: Object.assign(getProperties$1(node), getMulti(node, ["sym"])),
    geometry: {
      type: "Point",
      coordinates: coordPair$1(node).coordinates,
    },
  };
}

function* gpxGen(doc) {
  const tracks = doc.getElementsByTagName("trk");
  const routes = doc.getElementsByTagName("rte");
  const waypoints = doc.getElementsByTagName("wpt");

  for (let i = 0; i < tracks.length; i++) {
    const feature = getTrack(tracks[i]);
    if (feature) yield feature;
  }
  for (let i = 0; i < routes.length; i++) {
    const feature = getRoute(routes[i]);
    if (feature) yield feature;
  }
  for (let i = 0; i < waypoints.length; i++) {
    yield getPoint(waypoints[i]);
  }
}

function gpx(doc) {
  return {
    type: "FeatureCollection",
    features: Array.from(gpxGen(doc)),
  };
}

const EXTENSIONS_NS = "http://www.garmin.com/xmlschemas/ActivityExtension/v2";

const TRACKPOINT_ATTRIBUTES = [
  ["heartRate", "heartRates"],
  ["Cadence", "cadences"],
  // Extended Trackpoint attributes
  ["Speed", "speeds"],
  ["Watts", "watts"],
];

const LAP_ATTRIBUTES = [
  ["TotalTimeSeconds", "totalTimeSeconds"],
  ["DistanceMeters", "distanceMeters"],
  ["MaximumSpeed", "maxSpeed"],
  ["AverageHeartRateBpm", "avgHeartRate"],
  ["MaximumHeartRateBpm", "maxHeartRate"],

  // Extended Lap attributes
  ["AvgSpeed", "avgSpeed"],
  ["AvgWatts", "avgWatts"],
  ["MaxWatts", "maxWatts"],
];

function fromEntries(arr) {
  const obj = {};
  for (const [key, value] of arr) {
    obj[key] = value;
  }
  return obj;
}

function getProperties(node, attributeNames) {
  const properties = [];

  for (const [tag, alias] of attributeNames) {
    let elem = get1(node, tag);
    if (!elem) {
      const elements = node.getElementsByTagNameNS(EXTENSIONS_NS, tag);
      if (elements.length) {
        elem = elements[0];
      }
    }
    const val = parseFloat(nodeVal(elem));
    if (!isNaN(val)) {
      properties.push([alias, val]);
    }
  }

  return properties;
}

function coordPair(x) {
  const lon = nodeVal(get1(x, "LongitudeDegrees"));
  const lat = nodeVal(get1(x, "LatitudeDegrees"));
  if (!lon.length || !lat.length) {
    return null;
  }
  const ll = [parseFloat(lon), parseFloat(lat)];
  const alt = get1(x, "AltitudeMeters");
  const heartRate = get1(x, "HeartRateBpm");
  const time = get1(x, "Time");
  let a;
  if (alt) {
    a = parseFloat(nodeVal(alt));
    if (!isNaN(a)) {
      ll.push(a);
    }
  }
  return {
    coordinates: ll,
    time: time ? nodeVal(time) : null,
    heartRate: heartRate ? parseFloat(nodeVal(heartRate)) : null,
    extensions: getProperties(x, TRACKPOINT_ATTRIBUTES),
  };
}

function getPoints(node, pointname) {
  const pts = node.getElementsByTagName(pointname);
  const line = [];
  const times = [];
  const heartRates = [];
  if (pts.length < 2) return null; // Invalid line in GeoJSON
  const result = { extendedProperties: {} };
  for (let i = 0; i < pts.length; i++) {
    const c = coordPair(pts[i]);
    if (c === null) continue;
    line.push(c.coordinates);
    if (c.time) times.push(c.time);
    if (c.heartRate) heartRates.push(c.heartRate);
    for (const [alias, value] of c.extensions) {
      if (!result.extendedProperties[alias]) {
        result.extendedProperties[alias] = Array(pts.length).fill(null);
      }
      result.extendedProperties[alias][i] = value;
    }
  }
  return Object.assign(result, {
    line: line,
    times: times,
    heartRates: heartRates,
  });
}

function getLap(node) {
  const segments = node.getElementsByTagName("Track");
  const track = [];
  const times = [];
  const heartRates = [];
  const allExtendedProperties = [];
  let line;
  const properties = fromEntries(getProperties(node, LAP_ATTRIBUTES));

  const nameElement = get1(node, "Name");
  if (nameElement) {
    properties.name = nodeVal(nameElement);
  }

  for (let i = 0; i < segments.length; i++) {
    line = getPoints(segments[i], "Trackpoint");
    if (line) {
      track.push(line.line);
      if (line.times.length) times.push(line.times);
      if (line.heartRates.length) heartRates.push(line.heartRates);
      allExtendedProperties.push(line.extendedProperties);
    }
  }
  for (let i = 0; i < allExtendedProperties.length; i++) {
    const extendedProperties = allExtendedProperties[i];
    for (const property in extendedProperties) {
      if (segments.length === 1) {
        properties[property] = line.extendedProperties[property];
      } else {
        if (!properties[property]) {
          properties[property] = track.map((track) =>
            Array(track.length).fill(null)
          );
        }
        properties[property][i] = extendedProperties[property];
      }
    }
  }
  if (track.length === 0) return;

  if (times.length || heartRates.length) {
    properties.coordinateProperties = Object.assign(
      times.length
        ? {
            times: track.length === 1 ? times[0] : times,
          }
        : {},
      heartRates.length
        ? {
            heart: track.length === 1 ? heartRates[0] : heartRates,
          }
        : {}
    );
  }

  return {
    type: "Feature",
    properties: properties,
    geometry: {
      type: track.length === 1 ? "LineString" : "MultiLineString",
      coordinates: track.length === 1 ? track[0] : track,
    },
  };
}

function* tcxGen(doc) {
  const laps = doc.getElementsByTagName("Lap");

  for (let i = 0; i < laps.length; i++) {
    const feature = getLap(laps[i]);
    if (feature) yield feature;
  }

  const courses = doc.getElementsByTagName("Courses");

  for (let i = 0; i < courses.length; i++) {
    const feature = getLap(courses[i]);
    if (feature) yield feature;
  }
}

function tcx(doc) {
  return {
    type: "FeatureCollection",
    features: Array.from(tcxGen(doc)),
  };
}

const removeSpace = /\s*/g;
const trimSpace = /^\s*|\s*$/g;
const splitSpace = /\s+/;

// generate a short, numeric hash of a string
function okhash(x) {
  if (!x || !x.length) return 0;
  let h = 0;
  for (let i = 0; i < x.length; i++) {
    h = ((h << 5) - h + x.charCodeAt(i)) | 0;
  }
  return h;
}

// get one coordinate from a coordinate array, if any
function coord1(v) {
  return v.replace(removeSpace, "").split(",").map(parseFloat);
}

// get all coordinates from a coordinate array as [[],[]]
function coord(v) {
  return v.replace(trimSpace, "").split(splitSpace).map(coord1);
}

function xml2str(node) {
  if (node.xml !== undefined) return node.xml;
  if (node.tagName) {
    let output = node.tagName;
    for (let i = 0; i < node.attributes.length; i++) {
      output += node.attributes[i].name + node.attributes[i].value;
    }
    for (let i = 0; i < node.childNodes.length; i++) {
      output += xml2str(node.childNodes[i]);
    }
    return output;
  }
  if (node.nodeName === "#text") {
    return (node.nodeValue || node.value || "").trim();
  }
  if (node.nodeName === "#cdata-section") {
    return node.nodeValue;
  }
  return "";
}

const geotypes = ["Polygon", "LineString", "Point", "Track", "gx:Track"];

function kmlColor(properties, elem, prefix) {
  let v = nodeVal(get1(elem, "color")) || "";
  const colorProp =
    prefix == "stroke" || prefix === "fill" ? prefix : prefix + "-color";
  if (v.substr(0, 1) === "#") {
    v = v.substr(1);
  }
  if (v.length === 6 || v.length === 3) {
    properties[colorProp] = v;
  } else if (v.length === 8) {
    properties[prefix + "-opacity"] = parseInt(v.substr(0, 2), 16) / 255;
    properties[colorProp] =
      "#" + v.substr(6, 2) + v.substr(4, 2) + v.substr(2, 2);
  }
}

function numericProperty(properties, elem, source, target) {
  const val = parseFloat(nodeVal(get1(elem, source)));
  if (!isNaN(val)) properties[target] = val;
}

function gxCoords(root) {
  let elems = root.getElementsByTagName("coord");
  const coords = [];
  const times = [];
  if (elems.length === 0) elems = root.getElementsByTagName("gx:coord");
  for (let i = 0; i < elems.length; i++) {
    coords.push(nodeVal(elems[i]).split(" ").map(parseFloat));
  }
  const timeElems = root.getElementsByTagName("when");
  for (let j = 0; j < timeElems.length; j++) times.push(nodeVal(timeElems[j]));
  return {
    coords: coords,
    times: times,
  };
}

function getGeometry(root) {
  let geomNode;
  let geomNodes;
  let i;
  let j;
  let k;
  const geoms = [];
  const coordTimes = [];
  if (get1(root, "MultiGeometry")) {
    return getGeometry(get1(root, "MultiGeometry"));
  }
  if (get1(root, "MultiTrack")) {
    return getGeometry(get1(root, "MultiTrack"));
  }
  if (get1(root, "gx:MultiTrack")) {
    return getGeometry(get1(root, "gx:MultiTrack"));
  }
  for (i = 0; i < geotypes.length; i++) {
    geomNodes = root.getElementsByTagName(geotypes[i]);
    if (geomNodes) {
      for (j = 0; j < geomNodes.length; j++) {
        geomNode = geomNodes[j];
        if (geotypes[i] === "Point") {
          geoms.push({
            type: "Point",
            coordinates: coord1(nodeVal(get1(geomNode, "coordinates"))),
          });
        } else if (geotypes[i] === "LineString") {
          geoms.push({
            type: "LineString",
            coordinates: coord(nodeVal(get1(geomNode, "coordinates"))),
          });
        } else if (geotypes[i] === "Polygon") {
          const rings = geomNode.getElementsByTagName("LinearRing"),
            coords = [];
          for (k = 0; k < rings.length; k++) {
            coords.push(coord(nodeVal(get1(rings[k], "coordinates"))));
          }
          geoms.push({
            type: "Polygon",
            coordinates: coords,
          });
        } else if (geotypes[i] === "Track" || geotypes[i] === "gx:Track") {
          const track = gxCoords(geomNode);
          geoms.push({
            type: "LineString",
            coordinates: track.coords,
          });
          if (track.times.length) coordTimes.push(track.times);
        }
      }
    }
  }
  return {
    geoms: geoms,
    coordTimes: coordTimes,
  };
}

function getPlacemark(root, styleIndex, styleMapIndex, styleByHash) {
  const geomsAndTimes = getGeometry(root);
  let i;
  const properties = {};
  const name = nodeVal(get1(root, "name"));
  const address = nodeVal(get1(root, "address"));
  let styleUrl = nodeVal(get1(root, "styleUrl"));
  const description = nodeVal(get1(root, "description"));
  const timeSpan = get1(root, "TimeSpan");
  const timeStamp = get1(root, "TimeStamp");
  const extendedData = get1(root, "ExtendedData");
  let iconStyle = get1(root, "IconStyle");
  let labelStyle = get1(root, "LabelStyle");
  let lineStyle = get1(root, "LineStyle");
  let polyStyle = get1(root, "PolyStyle");
  const visibility = get1(root, "visibility");

  if (name) properties.name = name;
  if (address) properties.address = address;
  if (styleUrl) {
    if (styleUrl[0] !== "#") {
      styleUrl = "#" + styleUrl;
    }

    properties.styleUrl = styleUrl;
    if (styleIndex[styleUrl]) {
      properties.styleHash = styleIndex[styleUrl];
    }
    if (styleMapIndex[styleUrl]) {
      properties.styleMapHash = styleMapIndex[styleUrl];
      properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
    }
    // Try to populate the lineStyle or polyStyle since we got the style hash
    const style = styleByHash[properties.styleHash];
    if (style) {
      if (!iconStyle) iconStyle = get1(style, "IconStyle");
      if (!labelStyle) labelStyle = get1(style, "LabelStyle");
      if (!lineStyle) lineStyle = get1(style, "LineStyle");
      if (!polyStyle) polyStyle = get1(style, "PolyStyle");
    }
  }
  if (description) properties.description = description;
  if (timeSpan) {
    const begin = nodeVal(get1(timeSpan, "begin"));
    const end = nodeVal(get1(timeSpan, "end"));
    properties.timespan = { begin: begin, end: end };
  }
  if (timeStamp) {
    properties.timestamp = nodeVal(get1(timeStamp, "when"));
  }
  if (iconStyle) {
    kmlColor(properties, iconStyle, "icon");
    numericProperty(properties, iconStyle, "scale", "icon-scale");
    numericProperty(properties, iconStyle, "heading", "icon-heading");

    const hotspot = get1(iconStyle, "hotSpot");
    if (hotspot) {
      const left = parseFloat(hotspot.getAttribute("x"));
      const top = parseFloat(hotspot.getAttribute("y"));
      if (!isNaN(left) && !isNaN(top)) properties["icon-offset"] = [left, top];
    }
    const icon = get1(iconStyle, "Icon");
    if (icon) {
      const href = nodeVal(get1(icon, "href"));
      if (href) properties.icon = href;
    }
  }
  if (labelStyle) {
    kmlColor(properties, labelStyle, "label");
    numericProperty(properties, labelStyle, "scale", "label-scale");
  }
  if (lineStyle) {
    kmlColor(properties, lineStyle, "stroke");
    numericProperty(properties, lineStyle, "width", "stroke-width");
  }
  if (polyStyle) {
    kmlColor(properties, polyStyle, "fill");
    const fill = nodeVal(get1(polyStyle, "fill"));
    const outline = nodeVal(get1(polyStyle, "outline"));
    if (fill)
      properties["fill-opacity"] =
        fill === "1" ? properties["fill-opacity"] || 1 : 0;
    if (outline)
      properties["stroke-opacity"] =
        outline === "1" ? properties["stroke-opacity"] || 1 : 0;
  }
  if (extendedData) {
    const datas = extendedData.getElementsByTagName("Data"),
      simpleDatas = extendedData.getElementsByTagName("SimpleData");

    for (i = 0; i < datas.length; i++) {
      properties[datas[i].getAttribute("name")] = nodeVal(
        get1(datas[i], "value")
      );
    }
    for (i = 0; i < simpleDatas.length; i++) {
      properties[simpleDatas[i].getAttribute("name")] = nodeVal(simpleDatas[i]);
    }
  }
  if (visibility) {
    properties.visibility = nodeVal(visibility);
  }
  if (geomsAndTimes.coordTimes.length) {
    properties.coordinateProperties = {
      times:
        geomsAndTimes.coordTimes.length === 1
          ? geomsAndTimes.coordTimes[0]
          : geomsAndTimes.coordTimes,
    };
  }
  const feature = {
    type: "Feature",
    geometry:
      geomsAndTimes.geoms.length === 0
        ? null
        : geomsAndTimes.geoms.length === 1
        ? geomsAndTimes.geoms[0]
        : {
            type: "GeometryCollection",
            geometries: geomsAndTimes.geoms,
          },
    properties: properties,
  };
  if (root.getAttribute("id")) feature.id = root.getAttribute("id");
  return feature;
}

function* kmlGen(doc) {
  // styleindex keeps track of hashed styles in order to match feature
  const styleIndex = {};
  const styleByHash = {};
  // stylemapindex keeps track of style maps to expose in properties
  const styleMapIndex = {};
  // atomic geospatial types supported by KML - MultiGeometry is
  // handled separately
  // all root placemarks in the file
  const placemarks = doc.getElementsByTagName("Placemark");
  const styles = doc.getElementsByTagName("Style");
  const styleMaps = doc.getElementsByTagName("StyleMap");

  for (let k = 0; k < styles.length; k++) {
    const style = styles[k];
    const hash = okhash(xml2str(style)).toString(16);
    let id = style.getAttribute("id");
    if (
      !id &&
      style.parentNode.tagName.replace("gx:", "") === "CascadingStyle"
    ) {
      id =
        style.parentNode.getAttribute("kml:id") ||
        style.parentNode.getAttribute("id");
    }
    styleIndex["#" + id] = hash;
    styleByHash[hash] = style;
  }
  for (let l = 0; l < styleMaps.length; l++) {
    styleIndex["#" + styleMaps[l].getAttribute("id")] = okhash(
      xml2str(styleMaps[l])
    ).toString(16);
    const pairs = styleMaps[l].getElementsByTagName("Pair");
    const pairsMap = {};
    for (let m = 0; m < pairs.length; m++) {
      pairsMap[nodeVal(get1(pairs[m], "key"))] = nodeVal(
        get1(pairs[m], "styleUrl")
      );
    }
    styleMapIndex["#" + styleMaps[l].getAttribute("id")] = pairsMap;
  }
  for (let j = 0; j < placemarks.length; j++) {
    const feature = getPlacemark(
      placemarks[j],
      styleIndex,
      styleMapIndex,
      styleByHash
    );
    if (feature) yield feature;
  }
}

function kml(doc) {
  return {
    type: "FeatureCollection",
    features: Array.from(kmlGen(doc)),
  };
}


//# sourceMappingURL=togeojson.es.js.map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuMmJkNDllNmU2Y2RhOWNhOTY4YjQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQixzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBQ3hDLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyQkFBMkI7QUFDM0Isb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQywrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQixrQ0FBa0M7O0FBRWxDO0FBQ0EsT0FBTyxpQkFBaUI7QUFDeEIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSix1QkFBdUI7QUFDdkI7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxnRkFBZ0Y7QUFDakg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEIseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0osaUJBQWlCO0FBQ2pCO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qjs7QUFFOUIsVUFBVTtBQUNWLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsYUFBYTtBQUNiLElBQUk7QUFDSjtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1QsVUFBVTtBQUNWLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVixhQUFhO0FBQ2IsYUFBYTtBQUNiLFlBQVk7QUFDWixZQUFZO0FBQ1osYUFBYTtBQUNiLFlBQVk7O0FBRVo7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxrQkFBa0IseUJBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiLHNCQUFzQjtBQUN0QixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYLGNBQWM7QUFDZCxjQUFjO0FBQ2QsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxZQUFZO0FBQ1o7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxLQUFLO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFFBQVE7QUFDWjtBQUNBOztBQUVBLGNBQWM7QUFDZCxZQUFZO0FBQ1osWUFBWTtBQUNaLFlBQVk7QUFDWixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQiwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixHQUFHLE9BQU87QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsWUFBWTtBQUNaLGNBQWM7QUFDZCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLEdBQUc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLFlBQVk7QUFDWixjQUFjO0FBQ2QsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsU0FBUztBQUNULGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxjQUFjOztBQUVkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyx3QkFBd0I7QUFDbkMsV0FBVyxrQ0FBa0M7QUFDN0MsV0FBVyxrQ0FBa0M7QUFDN0MsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxvQ0FBb0M7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlELElBQUkscUJBQXFCLGlFQUFpRSxxQkFBcUIscUJBQXFCLEtBQUsseUJBQXlCLGlDQUFpQyxpREFBaUQsd0JBQXdCLFlBQVksT0FBTyw0QkFBNEIsZ0NBQWdDLHdCQUF3Qix3Q0FBd0MsS0FBSyw0RUFBNEUsRUFBRSxVQUFVLGtCQUFrQixXQUFXLGFBQWEsbUlBQW1JLDJCQUEyQixJQUFJLEVBQUUsbUZBQW1GLGlDQUFpQyxnREFBZ0Q7O0FBRTM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYSxHQUFHLEtBQUs7QUFDekM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9CQUFvQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzc1UGxIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBLFVBQVUscUNBQXFDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saUJBQWlCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1CQUFtQjtBQUNuQixrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtDQUFrQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0Esc0JBQXNCLGtCQUFrQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpRDtBQUNqRCIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvc2hwanMvZGlzdC9zaHAuZXNtLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvQHRtY3cvdG9nZW9qc29uL2Rpc3QvdG9nZW9qc29uLmVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdsb2JhbHMoZGVmcykge1xuICBkZWZzKCdFUFNHOjQzMjYnLCBcIit0aXRsZT1XR1MgODQgKGxvbmcvbGF0KSArcHJvaj1sb25nbGF0ICtlbGxwcz1XR1M4NCArZGF0dW09V0dTODQgK3VuaXRzPWRlZ3JlZXNcIik7XG4gIGRlZnMoJ0VQU0c6NDI2OScsIFwiK3RpdGxlPU5BRDgzIChsb25nL2xhdCkgK3Byb2o9bG9uZ2xhdCArYT02Mzc4MTM3LjAgK2I9NjM1Njc1Mi4zMTQxNDAzNiArZWxscHM9R1JTODAgK2RhdHVtPU5BRDgzICt1bml0cz1kZWdyZWVzXCIpO1xuICBkZWZzKCdFUFNHOjM4NTcnLCBcIit0aXRsZT1XR1MgODQgLyBQc2V1ZG8tTWVyY2F0b3IgK3Byb2o9bWVyYyArYT02Mzc4MTM3ICtiPTYzNzgxMzcgK2xhdF90cz0wLjAgK2xvbl8wPTAuMCAreF8wPTAuMCAreV8wPTAgK2s9MS4wICt1bml0cz1tICtuYWRncmlkcz1AbnVsbCArbm9fZGVmc1wiKTtcblxuICBkZWZzLldHUzg0ID0gZGVmc1snRVBTRzo0MzI2J107XG4gIGRlZnNbJ0VQU0c6Mzc4NSddID0gZGVmc1snRVBTRzozODU3J107IC8vIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdCwgb2ZmaWNpYWwgY29kZSBpcyAzODU3XG4gIGRlZnMuR09PR0xFID0gZGVmc1snRVBTRzozODU3J107XG4gIGRlZnNbJ0VQU0c6OTAwOTEzJ10gPSBkZWZzWydFUFNHOjM4NTcnXTtcbiAgZGVmc1snRVBTRzoxMDIxMTMnXSA9IGRlZnNbJ0VQU0c6Mzg1NyddO1xufVxuXG52YXIgUEpEXzNQQVJBTSA9IDE7XG52YXIgUEpEXzdQQVJBTSA9IDI7XG52YXIgUEpEX0dSSURTSElGVCA9IDM7XG52YXIgUEpEX1dHUzg0ID0gNDsgLy8gV0dTODQgb3IgZXF1aXZhbGVudFxudmFyIFBKRF9OT0RBVFVNID0gNTsgLy8gV0dTODQgb3IgZXF1aXZhbGVudFxudmFyIFNSU19XR1M4NF9TRU1JTUFKT1IgPSA2Mzc4MTM3LjA7ICAvLyBvbmx5IHVzZWQgaW4gZ3JpZCBzaGlmdCB0cmFuc2Zvcm1zXG52YXIgU1JTX1dHUzg0X1NFTUlNSU5PUiA9IDYzNTY3NTIuMzE0OyAgLy8gb25seSB1c2VkIGluIGdyaWQgc2hpZnQgdHJhbnNmb3Jtc1xudmFyIFNSU19XR1M4NF9FU1FVQVJFRCA9IDAuMDA2Njk0Mzc5OTkwMTQxMzE2NTsgLy8gb25seSB1c2VkIGluIGdyaWQgc2hpZnQgdHJhbnNmb3Jtc1xudmFyIFNFQ19UT19SQUQgPSA0Ljg0ODEzNjgxMTA5NTM1OTkzNTg5OTE0MTAyMzU3ZS02O1xudmFyIEhBTEZfUEkgPSBNYXRoLlBJLzI7XG4vLyBlbGxpcG9pZCBwal9zZXRfZWxsLmNcbnZhciBTSVhUSCA9IDAuMTY2NjY2NjY2NjY2NjY2NjY2Nztcbi8qIDEvNiAqL1xudmFyIFJBNCA9IDAuMDQ3MjIyMjIyMjIyMjIyMjIyMjI7XG4vKiAxNy8zNjAgKi9cbnZhciBSQTYgPSAwLjAyMjE1NjA4NDY1NjA4NDY1NjA4O1xudmFyIEVQU0xOID0gMS4wZS0xMDtcbi8vIHlvdSdkIHRoaW5rIHlvdSBjb3VsZCB1c2UgTnVtYmVyLkVQU0lMT04gYWJvdmUgYnV0IHRoYXQgbWFrZXNcbi8vIE1vbGx3ZWlkZSBnZXQgaW50byBhbiBpbmZpbmF0ZSBsb29wLlxuXG52YXIgRDJSJDEgPSAwLjAxNzQ1MzI5MjUxOTk0MzI5NTc3O1xudmFyIFIyRCA9IDU3LjI5NTc3OTUxMzA4MjMyMDg4O1xudmFyIEZPUlRQSSA9IE1hdGguUEkvNDtcbnZhciBUV09fUEkgPSBNYXRoLlBJICogMjtcbi8vIFNQSSBpcyBzbGlnaHRseSBncmVhdGVyIHRoYW4gTWF0aC5QSSwgc28gdmFsdWVzIHRoYXQgZXhjZWVkIHRoZSAtMTgwLi4xODBcbi8vIGRlZ3JlZSByYW5nZSBieSBhIHRpbnkgYW1vdW50IGRvbid0IGdldCB3cmFwcGVkLiBUaGlzIHByZXZlbnRzIHBvaW50cyB0aGF0XG4vLyBoYXZlIGRyaWZ0ZWQgZnJvbSB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbiBhbG9uZyB0aGUgMTgwdGggbWVyaWRpYW4gKGR1ZSB0b1xuLy8gZmxvYXRpbmcgcG9pbnQgZXJyb3IpIGZyb20gY2hhbmdpbmcgdGhlaXIgc2lnbi5cbnZhciBTUEkgPSAzLjE0MTU5MjY1MzU5O1xuXG52YXIgZXhwb3J0cyQyID0ge307XG5cbmV4cG9ydHMkMi5ncmVlbndpY2ggPSAwLjA7IC8vXCIwZEVcIixcbmV4cG9ydHMkMi5saXNib24gPSAtOS4xMzE5MDYxMTExMTE7IC8vXCI5ZDA3JzU0Ljg2MlxcXCJXXCIsXG5leHBvcnRzJDIucGFyaXMgPSAyLjMzNzIyOTE2NjY2NzsgLy9cIjJkMjAnMTQuMDI1XFxcIkVcIixcbmV4cG9ydHMkMi5ib2dvdGEgPSAtNzQuMDgwOTE2NjY2NjY3OyAvL1wiNzRkMDQnNTEuM1xcXCJXXCIsXG5leHBvcnRzJDIubWFkcmlkID0gLTMuNjg3OTM4ODg4ODg5OyAvL1wiM2Q0MScxNi41OFxcXCJXXCIsXG5leHBvcnRzJDIucm9tZSA9IDEyLjQ1MjMzMzMzMzMzMzsgLy9cIjEyZDI3JzguNFxcXCJFXCIsXG5leHBvcnRzJDIuYmVybiA9IDcuNDM5NTgzMzMzMzMzOyAvL1wiN2QyNicyMi41XFxcIkVcIixcbmV4cG9ydHMkMi5qYWthcnRhID0gMTA2LjgwNzcxOTQ0NDQ0NDsgLy9cIjEwNmQ0OCcyNy43OVxcXCJFXCIsXG5leHBvcnRzJDIuZmVycm8gPSAtMTcuNjY2NjY2NjY2NjY3OyAvL1wiMTdkNDAnV1wiLFxuZXhwb3J0cyQyLmJydXNzZWxzID0gNC4zNjc5NzU7IC8vXCI0ZDIyJzQuNzFcXFwiRVwiLFxuZXhwb3J0cyQyLnN0b2NraG9sbSA9IDE4LjA1ODI3Nzc3Nzc3ODsgLy9cIjE4ZDMnMjkuOFxcXCJFXCIsXG5leHBvcnRzJDIuYXRoZW5zID0gMjMuNzE2MzM3NTsgLy9cIjIzZDQyJzU4LjgxNVxcXCJFXCIsXG5leHBvcnRzJDIub3NsbyA9IDEwLjcyMjkxNjY2NjY2NzsgLy9cIjEwZDQzJzIyLjVcXFwiRVwiXG5cbnZhciB1bml0cyA9IHtcbiAgZnQ6IHt0b19tZXRlcjogMC4zMDQ4fSxcbiAgJ3VzLWZ0Jzoge3RvX21ldGVyOiAxMjAwIC8gMzkzN31cbn07XG5cbnZhciBpZ25vcmVkQ2hhciA9IC9bXFxzX1xcLVxcL1xcKFxcKV0vZztcbmZ1bmN0aW9uIG1hdGNoKG9iaiwga2V5KSB7XG4gIGlmIChvYmpba2V5XSkge1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciBsa2V5ID0ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZShpZ25vcmVkQ2hhciwgJycpO1xuICB2YXIgaSA9IC0xO1xuICB2YXIgdGVzdGtleSwgcHJvY2Vzc2VkS2V5O1xuICB3aGlsZSAoKytpIDwga2V5cy5sZW5ndGgpIHtcbiAgICB0ZXN0a2V5ID0ga2V5c1tpXTtcbiAgICBwcm9jZXNzZWRLZXkgPSB0ZXN0a2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZShpZ25vcmVkQ2hhciwgJycpO1xuICAgIGlmIChwcm9jZXNzZWRLZXkgPT09IGxrZXkpIHtcbiAgICAgIHJldHVybiBvYmpbdGVzdGtleV07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb2pTdHIoZGVmRGF0YSkge1xuICB2YXIgc2VsZiA9IHt9O1xuICB2YXIgcGFyYW1PYmogPSBkZWZEYXRhLnNwbGl0KCcrJykubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICByZXR1cm4gdi50cmltKCk7XG4gIH0pLmZpbHRlcihmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGE7XG4gIH0pLnJlZHVjZShmdW5jdGlvbihwLCBhKSB7XG4gICAgdmFyIHNwbGl0ID0gYS5zcGxpdCgnPScpO1xuICAgIHNwbGl0LnB1c2godHJ1ZSk7XG4gICAgcFtzcGxpdFswXS50b0xvd2VyQ2FzZSgpXSA9IHNwbGl0WzFdO1xuICAgIHJldHVybiBwO1xuICB9LCB7fSk7XG4gIHZhciBwYXJhbU5hbWUsIHBhcmFtVmFsLCBwYXJhbU91dG5hbWU7XG4gIHZhciBwYXJhbXMgPSB7XG4gICAgcHJvajogJ3Byb2pOYW1lJyxcbiAgICBkYXR1bTogJ2RhdHVtQ29kZScsXG4gICAgcmY6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYucmYgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgbGF0XzA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYubGF0MCA9IHYgKiBEMlIkMTtcbiAgICB9LFxuICAgIGxhdF8xOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxhdDEgPSB2ICogRDJSJDE7XG4gICAgfSxcbiAgICBsYXRfMjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sYXQyID0gdiAqIEQyUiQxO1xuICAgIH0sXG4gICAgbGF0X3RzOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxhdF90cyA9IHYgKiBEMlIkMTtcbiAgICB9LFxuICAgIGxvbl8wOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmxvbmcwID0gdiAqIEQyUiQxO1xuICAgIH0sXG4gICAgbG9uXzE6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYubG9uZzEgPSB2ICogRDJSJDE7XG4gICAgfSxcbiAgICBsb25fMjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sb25nMiA9IHYgKiBEMlIkMTtcbiAgICB9LFxuICAgIGFscGhhOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmFscGhhID0gcGFyc2VGbG9hdCh2KSAqIEQyUiQxO1xuICAgIH0sXG4gICAgZ2FtbWE6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYucmVjdGlmaWVkX2dyaWRfYW5nbGUgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgbG9uYzogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5sb25nYyA9IHYgKiBEMlIkMTtcbiAgICB9LFxuICAgIHhfMDogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi54MCA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICB5XzA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYueTAgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAga18wOiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmswID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIGs6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuazAgPSBwYXJzZUZsb2F0KHYpO1xuICAgIH0sXG4gICAgYTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi5hID0gcGFyc2VGbG9hdCh2KTtcbiAgICB9LFxuICAgIGI6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuYiA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICByX2E6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5SX0EgPSB0cnVlO1xuICAgIH0sXG4gICAgem9uZTogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi56b25lID0gcGFyc2VJbnQodiwgMTApO1xuICAgIH0sXG4gICAgc291dGg6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi51dG1Tb3V0aCA9IHRydWU7XG4gICAgfSxcbiAgICB0b3dnczg0OiBmdW5jdGlvbih2KSB7XG4gICAgICBzZWxmLmRhdHVtX3BhcmFtcyA9IHYuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbihhKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0b19tZXRlcjogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi50b19tZXRlciA9IHBhcnNlRmxvYXQodik7XG4gICAgfSxcbiAgICB1bml0czogZnVuY3Rpb24odikge1xuICAgICAgc2VsZi51bml0cyA9IHY7XG4gICAgICB2YXIgdW5pdCA9IG1hdGNoKHVuaXRzLCB2KTtcbiAgICAgIGlmICh1bml0KSB7XG4gICAgICAgIHNlbGYudG9fbWV0ZXIgPSB1bml0LnRvX21ldGVyO1xuICAgICAgfVxuICAgIH0sXG4gICAgZnJvbV9ncmVlbndpY2g6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHNlbGYuZnJvbV9ncmVlbndpY2ggPSB2ICogRDJSJDE7XG4gICAgfSxcbiAgICBwbTogZnVuY3Rpb24odikge1xuICAgICAgdmFyIHBtID0gbWF0Y2goZXhwb3J0cyQyLCB2KTtcbiAgICAgIHNlbGYuZnJvbV9ncmVlbndpY2ggPSAocG0gPyBwbSA6IHBhcnNlRmxvYXQodikpICogRDJSJDE7XG4gICAgfSxcbiAgICBuYWRncmlkczogZnVuY3Rpb24odikge1xuICAgICAgaWYgKHYgPT09ICdAbnVsbCcpIHtcbiAgICAgICAgc2VsZi5kYXR1bUNvZGUgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZi5uYWRncmlkcyA9IHY7XG4gICAgICB9XG4gICAgfSxcbiAgICBheGlzOiBmdW5jdGlvbih2KSB7XG4gICAgICB2YXIgbGVnYWxBeGlzID0gXCJld25zdWRcIjtcbiAgICAgIGlmICh2Lmxlbmd0aCA9PT0gMyAmJiBsZWdhbEF4aXMuaW5kZXhPZih2LnN1YnN0cigwLCAxKSkgIT09IC0xICYmIGxlZ2FsQXhpcy5pbmRleE9mKHYuc3Vic3RyKDEsIDEpKSAhPT0gLTEgJiYgbGVnYWxBeGlzLmluZGV4T2Yodi5zdWJzdHIoMiwgMSkpICE9PSAtMSkge1xuICAgICAgICBzZWxmLmF4aXMgPSB2O1xuICAgICAgfVxuICAgIH0sXG4gICAgYXBwcm94OiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuYXBwcm94ID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIGZvciAocGFyYW1OYW1lIGluIHBhcmFtT2JqKSB7XG4gICAgcGFyYW1WYWwgPSBwYXJhbU9ialtwYXJhbU5hbWVdO1xuICAgIGlmIChwYXJhbU5hbWUgaW4gcGFyYW1zKSB7XG4gICAgICBwYXJhbU91dG5hbWUgPSBwYXJhbXNbcGFyYW1OYW1lXTtcbiAgICAgIGlmICh0eXBlb2YgcGFyYW1PdXRuYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBhcmFtT3V0bmFtZShwYXJhbVZhbCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZltwYXJhbU91dG5hbWVdID0gcGFyYW1WYWw7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2VsZltwYXJhbU5hbWVdID0gcGFyYW1WYWw7XG4gICAgfVxuICB9XG4gIGlmKHR5cGVvZiBzZWxmLmRhdHVtQ29kZSA9PT0gJ3N0cmluZycgJiYgc2VsZi5kYXR1bUNvZGUgIT09IFwiV0dTODRcIil7XG4gICAgc2VsZi5kYXR1bUNvZGUgPSBzZWxmLmRhdHVtQ29kZS50b0xvd2VyQ2FzZSgpO1xuICB9XG4gIHJldHVybiBzZWxmO1xufVxuXG52YXIgTkVVVFJBTCA9IDE7XG52YXIgS0VZV09SRCA9IDI7XG52YXIgTlVNQkVSID0gMztcbnZhciBRVU9URUQgPSA0O1xudmFyIEFGVEVSUVVPVEUgPSA1O1xudmFyIEVOREVEID0gLTE7XG52YXIgd2hpdGVzcGFjZSA9IC9cXHMvO1xudmFyIGxhdGluID0gL1tBLVphLXpdLztcbnZhciBrZXl3b3JkID0gL1tBLVphLXo4NF9dLztcbnZhciBlbmRUaGluZ3MgPSAvWyxcXF1dLztcbnZhciBkaWdldHMgPSAvW1xcZFxcLkVcXC1cXCtdLztcbi8vIGNvbnN0IGlnbm9yZWRDaGFyID0gL1tcXHNfXFwtXFwvXFwoXFwpXS9nO1xuZnVuY3Rpb24gUGFyc2VyKHRleHQpIHtcbiAgaWYgKHR5cGVvZiB0ZXh0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignbm90IGEgc3RyaW5nJyk7XG4gIH1cbiAgdGhpcy50ZXh0ID0gdGV4dC50cmltKCk7XG4gIHRoaXMubGV2ZWwgPSAwO1xuICB0aGlzLnBsYWNlID0gMDtcbiAgdGhpcy5yb290ID0gbnVsbDtcbiAgdGhpcy5zdGFjayA9IFtdO1xuICB0aGlzLmN1cnJlbnRPYmplY3QgPSBudWxsO1xuICB0aGlzLnN0YXRlID0gTkVVVFJBTDtcbn1cblBhcnNlci5wcm90b3R5cGUucmVhZENoYXJpY3RlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2hhciA9IHRoaXMudGV4dFt0aGlzLnBsYWNlKytdO1xuICBpZiAodGhpcy5zdGF0ZSAhPT0gUVVPVEVEKSB7XG4gICAgd2hpbGUgKHdoaXRlc3BhY2UudGVzdChjaGFyKSkge1xuICAgICAgaWYgKHRoaXMucGxhY2UgPj0gdGhpcy50ZXh0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjaGFyID0gdGhpcy50ZXh0W3RoaXMucGxhY2UrK107XG4gICAgfVxuICB9XG4gIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgIGNhc2UgTkVVVFJBTDpcbiAgICAgIHJldHVybiB0aGlzLm5ldXRyYWwoY2hhcik7XG4gICAgY2FzZSBLRVlXT1JEOlxuICAgICAgcmV0dXJuIHRoaXMua2V5d29yZChjaGFyKVxuICAgIGNhc2UgUVVPVEVEOlxuICAgICAgcmV0dXJuIHRoaXMucXVvdGVkKGNoYXIpO1xuICAgIGNhc2UgQUZURVJRVU9URTpcbiAgICAgIHJldHVybiB0aGlzLmFmdGVycXVvdGUoY2hhcik7XG4gICAgY2FzZSBOVU1CRVI6XG4gICAgICByZXR1cm4gdGhpcy5udW1iZXIoY2hhcik7XG4gICAgY2FzZSBFTkRFRDpcbiAgICAgIHJldHVybjtcbiAgfVxufTtcblBhcnNlci5wcm90b3R5cGUuYWZ0ZXJxdW90ZSA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGNoYXIgPT09ICdcIicpIHtcbiAgICB0aGlzLndvcmQgKz0gJ1wiJztcbiAgICB0aGlzLnN0YXRlID0gUVVPVEVEO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgPSB0aGlzLndvcmQudHJpbSgpO1xuICAgIHRoaXMuYWZ0ZXJJdGVtKGNoYXIpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2hhdm5cXCd0IGhhbmRsZWQgXCInICtjaGFyICsgJ1wiIGluIGFmdGVycXVvdGUgeWV0LCBpbmRleCAnICsgdGhpcy5wbGFjZSk7XG59O1xuUGFyc2VyLnByb3RvdHlwZS5hZnRlckl0ZW0gPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChjaGFyID09PSAnLCcpIHtcbiAgICBpZiAodGhpcy53b3JkICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRPYmplY3QucHVzaCh0aGlzLndvcmQpO1xuICAgIH1cbiAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIHRoaXMuc3RhdGUgPSBORVVUUkFMO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhciA9PT0gJ10nKSB7XG4gICAgdGhpcy5sZXZlbC0tO1xuICAgIGlmICh0aGlzLndvcmQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY3VycmVudE9iamVjdC5wdXNoKHRoaXMud29yZCk7XG4gICAgICB0aGlzLndvcmQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gTkVVVFJBTDtcbiAgICB0aGlzLmN1cnJlbnRPYmplY3QgPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgIGlmICghdGhpcy5jdXJyZW50T2JqZWN0KSB7XG4gICAgICB0aGlzLnN0YXRlID0gRU5ERUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG59O1xuUGFyc2VyLnByb3RvdHlwZS5udW1iZXIgPSBmdW5jdGlvbihjaGFyKSB7XG4gIGlmIChkaWdldHMudGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCArPSBjaGFyO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLndvcmQgPSBwYXJzZUZsb2F0KHRoaXMud29yZCk7XG4gICAgdGhpcy5hZnRlckl0ZW0oY2hhcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignaGF2blxcJ3QgaGFuZGxlZCBcIicgK2NoYXIgKyAnXCIgaW4gbnVtYmVyIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUucXVvdGVkID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgIHRoaXMuc3RhdGUgPSBBRlRFUlFVT1RFO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLndvcmQgKz0gY2hhcjtcbiAgcmV0dXJuO1xufTtcblBhcnNlci5wcm90b3R5cGUua2V5d29yZCA9IGZ1bmN0aW9uKGNoYXIpIHtcbiAgaWYgKGtleXdvcmQudGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCArPSBjaGFyO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhciA9PT0gJ1snKSB7XG4gICAgdmFyIG5ld09iamVjdHMgPSBbXTtcbiAgICBuZXdPYmplY3RzLnB1c2godGhpcy53b3JkKTtcbiAgICB0aGlzLmxldmVsKys7XG4gICAgaWYgKHRoaXMucm9vdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5yb290ID0gbmV3T2JqZWN0cztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50T2JqZWN0LnB1c2gobmV3T2JqZWN0cyk7XG4gICAgfVxuICAgIHRoaXMuc3RhY2sucHVzaCh0aGlzLmN1cnJlbnRPYmplY3QpO1xuICAgIHRoaXMuY3VycmVudE9iamVjdCA9IG5ld09iamVjdHM7XG4gICAgdGhpcy5zdGF0ZSA9IE5FVVRSQUw7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbmRUaGluZ3MudGVzdChjaGFyKSkge1xuICAgIHRoaXMuYWZ0ZXJJdGVtKGNoYXIpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2hhdm5cXCd0IGhhbmRsZWQgXCInICtjaGFyICsgJ1wiIGluIGtleXdvcmQgeWV0LCBpbmRleCAnICsgdGhpcy5wbGFjZSk7XG59O1xuUGFyc2VyLnByb3RvdHlwZS5uZXV0cmFsID0gZnVuY3Rpb24oY2hhcikge1xuICBpZiAobGF0aW4udGVzdChjaGFyKSkge1xuICAgIHRoaXMud29yZCA9IGNoYXI7XG4gICAgdGhpcy5zdGF0ZSA9IEtFWVdPUkQ7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgdGhpcy53b3JkID0gJyc7XG4gICAgdGhpcy5zdGF0ZSA9IFFVT1RFRDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGRpZ2V0cy50ZXN0KGNoYXIpKSB7XG4gICAgdGhpcy53b3JkID0gY2hhcjtcbiAgICB0aGlzLnN0YXRlID0gTlVNQkVSO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZW5kVGhpbmdzLnRlc3QoY2hhcikpIHtcbiAgICB0aGlzLmFmdGVySXRlbShjaGFyKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdoYXZuXFwndCBoYW5kbGVkIFwiJyArY2hhciArICdcIiBpbiBuZXV0cmFsIHlldCwgaW5kZXggJyArIHRoaXMucGxhY2UpO1xufTtcblBhcnNlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oKSB7XG4gIHdoaWxlICh0aGlzLnBsYWNlIDwgdGhpcy50ZXh0Lmxlbmd0aCkge1xuICAgIHRoaXMucmVhZENoYXJpY3RlcigpO1xuICB9XG4gIGlmICh0aGlzLnN0YXRlID09PSBFTkRFRCkge1xuICAgIHJldHVybiB0aGlzLnJvb3Q7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gcGFyc2Ugc3RyaW5nIFwiJyArdGhpcy50ZXh0ICsgJ1wiLiBTdGF0ZSBpcyAnICsgdGhpcy5zdGF0ZSk7XG59O1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyh0eHQpIHtcbiAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIodHh0KTtcbiAgcmV0dXJuIHBhcnNlci5vdXRwdXQoKTtcbn1cblxuZnVuY3Rpb24gbWFwaXQob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICB2YWx1ZS51bnNoaWZ0KGtleSk7XG4gICAga2V5ID0gbnVsbDtcbiAgfVxuICB2YXIgdGhpbmcgPSBrZXkgPyB7fSA6IG9iajtcblxuICB2YXIgb3V0ID0gdmFsdWUucmVkdWNlKGZ1bmN0aW9uKG5ld09iaiwgaXRlbSkge1xuICAgIHNFeHByKGl0ZW0sIG5ld09iaik7XG4gICAgcmV0dXJuIG5ld09ialxuICB9LCB0aGluZyk7XG4gIGlmIChrZXkpIHtcbiAgICBvYmpba2V5XSA9IG91dDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzRXhwcih2LCBvYmopIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgb2JqW3ZdID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGtleSA9IHYuc2hpZnQoKTtcbiAgaWYgKGtleSA9PT0gJ1BBUkFNRVRFUicpIHtcbiAgICBrZXkgPSB2LnNoaWZ0KCk7XG4gIH1cbiAgaWYgKHYubGVuZ3RoID09PSAxKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodlswXSkpIHtcbiAgICAgIG9ialtrZXldID0ge307XG4gICAgICBzRXhwcih2WzBdLCBvYmpba2V5XSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9ialtrZXldID0gdlswXTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF2Lmxlbmd0aCkge1xuICAgIG9ialtrZXldID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGtleSA9PT0gJ1RPV0dTODQnKSB7XG4gICAgb2JqW2tleV0gPSB2O1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoa2V5ID09PSAnQVhJUycpIHtcbiAgICBpZiAoIShrZXkgaW4gb2JqKSkge1xuICAgICAgb2JqW2tleV0gPSBbXTtcbiAgICB9XG4gICAgb2JqW2tleV0ucHVzaCh2KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICBvYmpba2V5XSA9IHt9O1xuICB9XG5cbiAgdmFyIGk7XG4gIHN3aXRjaCAoa2V5KSB7XG4gICAgY2FzZSAnVU5JVCc6XG4gICAgY2FzZSAnUFJJTUVNJzpcbiAgICBjYXNlICdWRVJUX0RBVFVNJzpcbiAgICAgIG9ialtrZXldID0ge1xuICAgICAgICBuYW1lOiB2WzBdLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGNvbnZlcnQ6IHZbMV1cbiAgICAgIH07XG4gICAgICBpZiAodi5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgc0V4cHIodlsyXSwgb2JqW2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIGNhc2UgJ1NQSEVST0lEJzpcbiAgICBjYXNlICdFTExJUFNPSUQnOlxuICAgICAgb2JqW2tleV0gPSB7XG4gICAgICAgIG5hbWU6IHZbMF0sXG4gICAgICAgIGE6IHZbMV0sXG4gICAgICAgIHJmOiB2WzJdXG4gICAgICB9O1xuICAgICAgaWYgKHYubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHNFeHByKHZbM10sIG9ialtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdQUk9KRUNURURDUlMnOlxuICAgIGNhc2UgJ1BST0pDUlMnOlxuICAgIGNhc2UgJ0dFT0dDUyc6XG4gICAgY2FzZSAnR0VPQ0NTJzpcbiAgICBjYXNlICdQUk9KQ1MnOlxuICAgIGNhc2UgJ0xPQ0FMX0NTJzpcbiAgICBjYXNlICdHRU9EQ1JTJzpcbiAgICBjYXNlICdHRU9ERVRJQ0NSUyc6XG4gICAgY2FzZSAnR0VPREVUSUNEQVRVTSc6XG4gICAgY2FzZSAnRURBVFVNJzpcbiAgICBjYXNlICdFTkdJTkVFUklOR0RBVFVNJzpcbiAgICBjYXNlICdWRVJUX0NTJzpcbiAgICBjYXNlICdWRVJUQ1JTJzpcbiAgICBjYXNlICdWRVJUSUNBTENSUyc6XG4gICAgY2FzZSAnQ09NUERfQ1MnOlxuICAgIGNhc2UgJ0NPTVBPVU5EQ1JTJzpcbiAgICBjYXNlICdFTkdJTkVFUklOR0NSUyc6XG4gICAgY2FzZSAnRU5HQ1JTJzpcbiAgICBjYXNlICdGSVRURURfQ1MnOlxuICAgIGNhc2UgJ0xPQ0FMX0RBVFVNJzpcbiAgICBjYXNlICdEQVRVTSc6XG4gICAgICB2WzBdID0gWyduYW1lJywgdlswXV07XG4gICAgICBtYXBpdChvYmosIGtleSwgdik7XG4gICAgICByZXR1cm47XG4gICAgZGVmYXVsdDpcbiAgICAgIGkgPSAtMTtcbiAgICAgIHdoaWxlICgrK2kgPCB2Lmxlbmd0aCkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodltpXSkpIHtcbiAgICAgICAgICByZXR1cm4gc0V4cHIodiwgb2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFwaXQob2JqLCBrZXksIHYpO1xuICB9XG59XG5cbnZhciBEMlIgPSAwLjAxNzQ1MzI5MjUxOTk0MzI5NTc3O1xuXG5cblxuZnVuY3Rpb24gcmVuYW1lKG9iaiwgcGFyYW1zKSB7XG4gIHZhciBvdXROYW1lID0gcGFyYW1zWzBdO1xuICB2YXIgaW5OYW1lID0gcGFyYW1zWzFdO1xuICBpZiAoIShvdXROYW1lIGluIG9iaikgJiYgKGluTmFtZSBpbiBvYmopKSB7XG4gICAgb2JqW291dE5hbWVdID0gb2JqW2luTmFtZV07XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDMpIHtcbiAgICAgIG9ialtvdXROYW1lXSA9IHBhcmFtc1syXShvYmpbb3V0TmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkMnIoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0ICogRDJSO1xufVxuXG5mdW5jdGlvbiBjbGVhbldLVCh3a3QpIHtcbiAgaWYgKHdrdC50eXBlID09PSAnR0VPR0NTJykge1xuICAgIHdrdC5wcm9qTmFtZSA9ICdsb25nbGF0JztcbiAgfSBlbHNlIGlmICh3a3QudHlwZSA9PT0gJ0xPQ0FMX0NTJykge1xuICAgIHdrdC5wcm9qTmFtZSA9ICdpZGVudGl0eSc7XG4gICAgd2t0LmxvY2FsID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHdrdC5QUk9KRUNUSU9OID09PSAnb2JqZWN0Jykge1xuICAgICAgd2t0LnByb2pOYW1lID0gT2JqZWN0LmtleXMod2t0LlBST0pFQ1RJT04pWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB3a3QucHJvak5hbWUgPSB3a3QuUFJPSkVDVElPTjtcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5BWElTKSB7XG4gICAgdmFyIGF4aXNPcmRlciA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IHdrdC5BWElTLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcbiAgICAgIHZhciBheGlzID0gW3drdC5BWElTW2ldWzBdLnRvTG93ZXJDYXNlKCksIHdrdC5BWElTW2ldWzFdLnRvTG93ZXJDYXNlKCldO1xuICAgICAgaWYgKGF4aXNbMF0uaW5kZXhPZignbm9ydGgnKSAhPT0gLTEgfHwgKChheGlzWzBdID09PSAneScgfHwgYXhpc1swXSA9PT0gJ2xhdCcpICYmIGF4aXNbMV0gPT09ICdub3J0aCcpKSB7XG4gICAgICAgIGF4aXNPcmRlciArPSAnbic7XG4gICAgICB9IGVsc2UgaWYgKGF4aXNbMF0uaW5kZXhPZignc291dGgnKSAhPT0gLTEgfHwgKChheGlzWzBdID09PSAneScgfHwgYXhpc1swXSA9PT0gJ2xhdCcpICYmIGF4aXNbMV0gPT09ICdzb3V0aCcpKSB7XG4gICAgICAgIGF4aXNPcmRlciArPSAncyc7XG4gICAgICB9IGVsc2UgaWYgKGF4aXNbMF0uaW5kZXhPZignZWFzdCcpICE9PSAtMSB8fCAoKGF4aXNbMF0gPT09ICd4JyB8fCBheGlzWzBdID09PSAnbG9uJykgJiYgYXhpc1sxXSA9PT0gJ2Vhc3QnKSkge1xuICAgICAgICBheGlzT3JkZXIgKz0gJ2UnO1xuICAgICAgfSBlbHNlIGlmIChheGlzWzBdLmluZGV4T2YoJ3dlc3QnKSAhPT0gLTEgfHwgKChheGlzWzBdID09PSAneCcgfHwgYXhpc1swXSA9PT0gJ2xvbicpICYmIGF4aXNbMV0gPT09ICd3ZXN0JykpIHtcbiAgICAgICAgYXhpc09yZGVyICs9ICd3JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF4aXNPcmRlci5sZW5ndGggPT09IDIpIHtcbiAgICAgIGF4aXNPcmRlciArPSAndSc7XG4gICAgfVxuICAgIGlmIChheGlzT3JkZXIubGVuZ3RoID09PSAzKSB7XG4gICAgICB3a3QuYXhpcyA9IGF4aXNPcmRlcjtcbiAgICB9XG4gIH1cbiAgaWYgKHdrdC5VTklUKSB7XG4gICAgd2t0LnVuaXRzID0gd2t0LlVOSVQubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh3a3QudW5pdHMgPT09ICdtZXRyZScpIHtcbiAgICAgIHdrdC51bml0cyA9ICdtZXRlcic7XG4gICAgfVxuICAgIGlmICh3a3QuVU5JVC5jb252ZXJ0KSB7XG4gICAgICBpZiAod2t0LnR5cGUgPT09ICdHRU9HQ1MnKSB7XG4gICAgICAgIGlmICh3a3QuREFUVU0gJiYgd2t0LkRBVFVNLlNQSEVST0lEKSB7XG4gICAgICAgICAgd2t0LnRvX21ldGVyID0gd2t0LlVOSVQuY29udmVydCp3a3QuREFUVU0uU1BIRVJPSUQuYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2t0LnRvX21ldGVyID0gd2t0LlVOSVQuY29udmVydDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIGdlb2djcyA9IHdrdC5HRU9HQ1M7XG4gIGlmICh3a3QudHlwZSA9PT0gJ0dFT0dDUycpIHtcbiAgICBnZW9nY3MgPSB3a3Q7XG4gIH1cbiAgaWYgKGdlb2djcykge1xuICAgIC8vaWYod2t0LkdFT0dDUy5QUklNRU0mJndrdC5HRU9HQ1MuUFJJTUVNLmNvbnZlcnQpe1xuICAgIC8vICB3a3QuZnJvbV9ncmVlbndpY2g9d2t0LkdFT0dDUy5QUklNRU0uY29udmVydCpEMlI7XG4gICAgLy99XG4gICAgaWYgKGdlb2djcy5EQVRVTSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IGdlb2djcy5EQVRVTS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSBnZW9nY3MubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZS5zbGljZSgwLCAyKSA9PT0gJ2RfJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IHdrdC5kYXR1bUNvZGUuc2xpY2UoMik7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnbmV3X3plYWxhbmRfZ2VvZGV0aWNfZGF0dW1fMTk0OScgfHwgd2t0LmRhdHVtQ29kZSA9PT0gJ25ld196ZWFsYW5kXzE5NDknKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ256Z2Q0OSc7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlID09PSAnd2dzXzE5ODQnIHx8IHdrdC5kYXR1bUNvZGUgPT09ICd3b3JsZF9nZW9kZXRpY19zeXN0ZW1fMTk4NCcpIHtcbiAgICAgIGlmICh3a3QuUFJPSkVDVElPTiA9PT0gJ01lcmNhdG9yX0F1eGlsaWFyeV9TcGhlcmUnKSB7XG4gICAgICAgIHdrdC5zcGhlcmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgd2t0LmRhdHVtQ29kZSA9ICd3Z3M4NCc7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlLnNsaWNlKC02KSA9PT0gJ19mZXJybycpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSB3a3QuZGF0dW1Db2RlLnNsaWNlKDAsIC0gNik7XG4gICAgfVxuICAgIGlmICh3a3QuZGF0dW1Db2RlLnNsaWNlKC04KSA9PT0gJ19qYWthcnRhJykge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9IHdrdC5kYXR1bUNvZGUuc2xpY2UoMCwgLSA4KTtcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ2JlbGdlJykpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAncm5iNzInO1xuICAgIH1cbiAgICBpZiAoZ2VvZ2NzLkRBVFVNICYmIGdlb2djcy5EQVRVTS5TUEhFUk9JRCkge1xuICAgICAgd2t0LmVsbHBzID0gZ2VvZ2NzLkRBVFVNLlNQSEVST0lELm5hbWUucmVwbGFjZSgnXzE5JywgJycpLnJlcGxhY2UoL1tDY11sYXJrZVxcXzE4LywgJ2NscmsnKTtcbiAgICAgIGlmICh3a3QuZWxscHMudG9Mb3dlckNhc2UoKS5zbGljZSgwLCAxMykgPT09ICdpbnRlcm5hdGlvbmFsJykge1xuICAgICAgICB3a3QuZWxscHMgPSAnaW50bCc7XG4gICAgICB9XG5cbiAgICAgIHdrdC5hID0gZ2VvZ2NzLkRBVFVNLlNQSEVST0lELmE7XG4gICAgICB3a3QucmYgPSBwYXJzZUZsb2F0KGdlb2djcy5EQVRVTS5TUEhFUk9JRC5yZiwgMTApO1xuICAgIH1cblxuICAgIGlmIChnZW9nY3MuREFUVU0gJiYgZ2VvZ2NzLkRBVFVNLlRPV0dTODQpIHtcbiAgICAgIHdrdC5kYXR1bV9wYXJhbXMgPSBnZW9nY3MuREFUVU0uVE9XR1M4NDtcbiAgICB9XG4gICAgaWYgKH53a3QuZGF0dW1Db2RlLmluZGV4T2YoJ29zZ2JfMTkzNicpKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ29zZ2IzNic7XG4gICAgfVxuICAgIGlmICh+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCdvc25pXzE5NTInKSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdvc25pNTInO1xuICAgIH1cbiAgICBpZiAofndrdC5kYXR1bUNvZGUuaW5kZXhPZigndG02NScpXG4gICAgICB8fCB+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCdnZW9kZXRpY19kYXR1bV9vZl8xOTY1JykpIHtcbiAgICAgIHdrdC5kYXR1bUNvZGUgPSAnaXJlNjUnO1xuICAgIH1cbiAgICBpZiAod2t0LmRhdHVtQ29kZSA9PT0gJ2NoMTkwMysnKSB7XG4gICAgICB3a3QuZGF0dW1Db2RlID0gJ2NoMTkwMyc7XG4gICAgfVxuICAgIGlmICh+d2t0LmRhdHVtQ29kZS5pbmRleE9mKCdpc3JhZWwnKSkge1xuICAgICAgd2t0LmRhdHVtQ29kZSA9ICdpc3I5Myc7XG4gICAgfVxuICB9XG4gIGlmICh3a3QuYiAmJiAhaXNGaW5pdGUod2t0LmIpKSB7XG4gICAgd2t0LmIgPSB3a3QuYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvTWV0ZXIoaW5wdXQpIHtcbiAgICB2YXIgcmF0aW8gPSB3a3QudG9fbWV0ZXIgfHwgMTtcbiAgICByZXR1cm4gaW5wdXQgKiByYXRpbztcbiAgfVxuICB2YXIgcmVuYW1lciA9IGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gcmVuYW1lKHdrdCwgYSk7XG4gIH07XG4gIHZhciBsaXN0ID0gW1xuICAgIFsnc3RhbmRhcmRfcGFyYWxsZWxfMScsICdTdGFuZGFyZF9QYXJhbGxlbF8xJ10sXG4gICAgWydzdGFuZGFyZF9wYXJhbGxlbF8xJywgJ0xhdGl0dWRlIG9mIDFzdCBzdGFuZGFyZCBwYXJhbGxlbCddLFxuICAgIFsnc3RhbmRhcmRfcGFyYWxsZWxfMicsICdTdGFuZGFyZF9QYXJhbGxlbF8yJ10sXG4gICAgWydzdGFuZGFyZF9wYXJhbGxlbF8yJywgJ0xhdGl0dWRlIG9mIDJuZCBzdGFuZGFyZCBwYXJhbGxlbCddLFxuICAgIFsnZmFsc2VfZWFzdGluZycsICdGYWxzZV9FYXN0aW5nJ10sXG4gICAgWydmYWxzZV9lYXN0aW5nJywgJ0ZhbHNlIGVhc3RpbmcnXSxcbiAgICBbJ2ZhbHNlLWVhc3RpbmcnLCAnRWFzdGluZyBhdCBmYWxzZSBvcmlnaW4nXSxcbiAgICBbJ2ZhbHNlX25vcnRoaW5nJywgJ0ZhbHNlX05vcnRoaW5nJ10sXG4gICAgWydmYWxzZV9ub3J0aGluZycsICdGYWxzZSBub3J0aGluZyddLFxuICAgIFsnZmFsc2Vfbm9ydGhpbmcnLCAnTm9ydGhpbmcgYXQgZmFsc2Ugb3JpZ2luJ10sXG4gICAgWydjZW50cmFsX21lcmlkaWFuJywgJ0NlbnRyYWxfTWVyaWRpYW4nXSxcbiAgICBbJ2NlbnRyYWxfbWVyaWRpYW4nLCAnTG9uZ2l0dWRlIG9mIG5hdHVyYWwgb3JpZ2luJ10sXG4gICAgWydjZW50cmFsX21lcmlkaWFuJywgJ0xvbmdpdHVkZSBvZiBmYWxzZSBvcmlnaW4nXSxcbiAgICBbJ2xhdGl0dWRlX29mX29yaWdpbicsICdMYXRpdHVkZV9PZl9PcmlnaW4nXSxcbiAgICBbJ2xhdGl0dWRlX29mX29yaWdpbicsICdDZW50cmFsX1BhcmFsbGVsJ10sXG4gICAgWydsYXRpdHVkZV9vZl9vcmlnaW4nLCAnTGF0aXR1ZGUgb2YgbmF0dXJhbCBvcmlnaW4nXSxcbiAgICBbJ2xhdGl0dWRlX29mX29yaWdpbicsICdMYXRpdHVkZSBvZiBmYWxzZSBvcmlnaW4nXSxcbiAgICBbJ3NjYWxlX2ZhY3RvcicsICdTY2FsZV9GYWN0b3InXSxcbiAgICBbJ2swJywgJ3NjYWxlX2ZhY3RvciddLFxuICAgIFsnbGF0aXR1ZGVfb2ZfY2VudGVyJywgJ0xhdGl0dWRlX09mX0NlbnRlciddLFxuICAgIFsnbGF0aXR1ZGVfb2ZfY2VudGVyJywgJ0xhdGl0dWRlX29mX2NlbnRlciddLFxuICAgIFsnbGF0MCcsICdsYXRpdHVkZV9vZl9jZW50ZXInLCBkMnJdLFxuICAgIFsnbG9uZ2l0dWRlX29mX2NlbnRlcicsICdMb25naXR1ZGVfT2ZfQ2VudGVyJ10sXG4gICAgWydsb25naXR1ZGVfb2ZfY2VudGVyJywgJ0xvbmdpdHVkZV9vZl9jZW50ZXInXSxcbiAgICBbJ2xvbmdjJywgJ2xvbmdpdHVkZV9vZl9jZW50ZXInLCBkMnJdLFxuICAgIFsneDAnLCAnZmFsc2VfZWFzdGluZycsIHRvTWV0ZXJdLFxuICAgIFsneTAnLCAnZmFsc2Vfbm9ydGhpbmcnLCB0b01ldGVyXSxcbiAgICBbJ2xvbmcwJywgJ2NlbnRyYWxfbWVyaWRpYW4nLCBkMnJdLFxuICAgIFsnbGF0MCcsICdsYXRpdHVkZV9vZl9vcmlnaW4nLCBkMnJdLFxuICAgIFsnbGF0MCcsICdzdGFuZGFyZF9wYXJhbGxlbF8xJywgZDJyXSxcbiAgICBbJ2xhdDEnLCAnc3RhbmRhcmRfcGFyYWxsZWxfMScsIGQycl0sXG4gICAgWydsYXQyJywgJ3N0YW5kYXJkX3BhcmFsbGVsXzInLCBkMnJdLFxuICAgIFsnYXppbXV0aCcsICdBemltdXRoJ10sXG4gICAgWydhbHBoYScsICdhemltdXRoJywgZDJyXSxcbiAgICBbJ3Nyc0NvZGUnLCAnbmFtZSddXG4gIF07XG4gIGxpc3QuZm9yRWFjaChyZW5hbWVyKTtcbiAgaWYgKCF3a3QubG9uZzAgJiYgd2t0LmxvbmdjICYmICh3a3QucHJvak5hbWUgPT09ICdBbGJlcnNfQ29uaWNfRXF1YWxfQXJlYScgfHwgd2t0LnByb2pOYW1lID09PSAnTGFtYmVydF9BemltdXRoYWxfRXF1YWxfQXJlYScpKSB7XG4gICAgd2t0LmxvbmcwID0gd2t0LmxvbmdjO1xuICB9XG4gIGlmICghd2t0LmxhdF90cyAmJiB3a3QubGF0MSAmJiAod2t0LnByb2pOYW1lID09PSAnU3RlcmVvZ3JhcGhpY19Tb3V0aF9Qb2xlJyB8fCB3a3QucHJvak5hbWUgPT09ICdQb2xhciBTdGVyZW9ncmFwaGljICh2YXJpYW50IEIpJykpIHtcbiAgICB3a3QubGF0MCA9IGQycih3a3QubGF0MSA+IDAgPyA5MCA6IC05MCk7XG4gICAgd2t0LmxhdF90cyA9IHdrdC5sYXQxO1xuICB9IGVsc2UgaWYgKCF3a3QubGF0X3RzICYmIHdrdC5sYXQwICYmIHdrdC5wcm9qTmFtZSA9PT0gJ1BvbGFyX1N0ZXJlb2dyYXBoaWMnKSB7XG4gICAgd2t0LmxhdF90cyA9IHdrdC5sYXQwO1xuICAgIHdrdC5sYXQwID0gZDJyKHdrdC5sYXQwID4gMCA/IDkwIDogLTkwKTtcbiAgfVxufVxuZnVuY3Rpb24gd2t0KHdrdCkge1xuICB2YXIgbGlzcCA9IHBhcnNlU3RyaW5nKHdrdCk7XG4gIHZhciB0eXBlID0gbGlzcC5zaGlmdCgpO1xuICB2YXIgbmFtZSA9IGxpc3Auc2hpZnQoKTtcbiAgbGlzcC51bnNoaWZ0KFsnbmFtZScsIG5hbWVdKTtcbiAgbGlzcC51bnNoaWZ0KFsndHlwZScsIHR5cGVdKTtcbiAgdmFyIG9iaiA9IHt9O1xuICBzRXhwcihsaXNwLCBvYmopO1xuICBjbGVhbldLVChvYmopO1xuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBkZWZzKG5hbWUpIHtcbiAgLypnbG9iYWwgY29uc29sZSovXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICB2YXIgZGVmID0gYXJndW1lbnRzWzFdO1xuICAgIGlmICh0eXBlb2YgZGVmID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGRlZi5jaGFyQXQoMCkgPT09ICcrJykge1xuICAgICAgICBkZWZzW25hbWVdID0gcHJvalN0cihhcmd1bWVudHNbMV0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlZnNbbmFtZV0gPSB3a3QoYXJndW1lbnRzWzFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVmc1tuYW1lXSA9IGRlZjtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgICByZXR1cm4gbmFtZS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgIGRlZnMuYXBwbHkodGhhdCwgdik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVmcyh2KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKG5hbWUgaW4gZGVmcykge1xuICAgICAgICByZXR1cm4gZGVmc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoJ0VQU0cnIGluIG5hbWUpIHtcbiAgICAgIGRlZnNbJ0VQU0c6JyArIG5hbWUuRVBTR10gPSBuYW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICgnRVNSSScgaW4gbmFtZSkge1xuICAgICAgZGVmc1snRVNSSTonICsgbmFtZS5FU1JJXSA9IG5hbWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCdJQVUyMDAwJyBpbiBuYW1lKSB7XG4gICAgICBkZWZzWydJQVUyMDAwOicgKyBuYW1lLklBVTIwMDBdID0gbmFtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cblxufVxuZ2xvYmFscyhkZWZzKTtcblxuZnVuY3Rpb24gdGVzdE9iaihjb2RlKXtcbiAgcmV0dXJuIHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIHRlc3REZWYoY29kZSl7XG4gIHJldHVybiBjb2RlIGluIGRlZnM7XG59XG52YXIgY29kZVdvcmRzID0gWydQUk9KRUNURURDUlMnLCAnUFJPSkNSUycsICdHRU9HQ1MnLCdHRU9DQ1MnLCdQUk9KQ1MnLCdMT0NBTF9DUycsICdHRU9EQ1JTJywgJ0dFT0RFVElDQ1JTJywgJ0dFT0RFVElDREFUVU0nLCAnRU5HQ1JTJywgJ0VOR0lORUVSSU5HQ1JTJ107XG5mdW5jdGlvbiB0ZXN0V0tUKGNvZGUpe1xuICByZXR1cm4gY29kZVdvcmRzLnNvbWUoZnVuY3Rpb24gKHdvcmQpIHtcbiAgICByZXR1cm4gY29kZS5pbmRleE9mKHdvcmQpID4gLTE7XG4gIH0pO1xufVxudmFyIGNvZGVzID0gWyczODU3JywgJzkwMDkxMycsICczNzg1JywgJzEwMjExMyddO1xuZnVuY3Rpb24gY2hlY2tNZXJjYXRvcihpdGVtKSB7XG4gIHZhciBhdXRoID0gbWF0Y2goaXRlbSwgJ2F1dGhvcml0eScpO1xuICBpZiAoIWF1dGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNvZGUgPSBtYXRjaChhdXRoLCAnZXBzZycpO1xuICByZXR1cm4gY29kZSAmJiBjb2Rlcy5pbmRleE9mKGNvZGUpID4gLTE7XG59XG5mdW5jdGlvbiBjaGVja1Byb2pTdHIoaXRlbSkge1xuICB2YXIgZXh0ID0gbWF0Y2goaXRlbSwgJ2V4dGVuc2lvbicpO1xuICBpZiAoIWV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gbWF0Y2goZXh0LCAncHJvajQnKTtcbn1cbmZ1bmN0aW9uIHRlc3RQcm9qKGNvZGUpe1xuICByZXR1cm4gY29kZVswXSA9PT0gJysnO1xufVxuZnVuY3Rpb24gcGFyc2UoY29kZSl7XG4gIGlmICh0ZXN0T2JqKGNvZGUpKSB7XG4gICAgLy9jaGVjayB0byBzZWUgaWYgdGhpcyBpcyBhIFdLVCBzdHJpbmdcbiAgICBpZiAodGVzdERlZihjb2RlKSkge1xuICAgICAgcmV0dXJuIGRlZnNbY29kZV07XG4gICAgfVxuICAgIGlmICh0ZXN0V0tUKGNvZGUpKSB7XG4gICAgICB2YXIgb3V0ID0gd2t0KGNvZGUpO1xuICAgICAgLy8gdGVzdCBvZiBzcGV0aWFsIGNhc2UsIGR1ZSB0byB0aGlzIGJlaW5nIGEgdmVyeSBjb21tb24gYW5kIG9mdGVuIG1hbGZvcm1lZFxuICAgICAgaWYgKGNoZWNrTWVyY2F0b3Iob3V0KSkge1xuICAgICAgICByZXR1cm4gZGVmc1snRVBTRzozODU3J107XG4gICAgICB9XG4gICAgICB2YXIgbWF5YmVQcm9qU3RyID0gY2hlY2tQcm9qU3RyKG91dCk7XG4gICAgICBpZiAobWF5YmVQcm9qU3RyKSB7XG4gICAgICAgIHJldHVybiBwcm9qU3RyKG1heWJlUHJvalN0cik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBpZiAodGVzdFByb2ooY29kZSkpIHtcbiAgICAgIHJldHVybiBwcm9qU3RyKGNvZGUpO1xuICAgIH1cbiAgfWVsc2Uge1xuICAgIHJldHVybiBjb2RlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb24gfHwge307XG4gIHZhciB2YWx1ZSwgcHJvcGVydHk7XG4gIGlmICghc291cmNlKSB7XG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICB9XG4gIGZvciAocHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgdmFsdWUgPSBzb3VyY2VbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5mdW5jdGlvbiBtc2ZueihlY2NlbnQsIHNpbnBoaSwgY29zcGhpKSB7XG4gIHZhciBjb24gPSBlY2NlbnQgKiBzaW5waGk7XG4gIHJldHVybiBjb3NwaGkgLyAoTWF0aC5zcXJ0KDEgLSBjb24gKiBjb24pKTtcbn1cblxuZnVuY3Rpb24gc2lnbih4KSB7XG4gIHJldHVybiB4PDAgPyAtMSA6IDE7XG59XG5cbmZ1bmN0aW9uIGFkanVzdF9sb24oeCkge1xuICByZXR1cm4gKE1hdGguYWJzKHgpIDw9IFNQSSkgPyB4IDogKHggLSAoc2lnbih4KSAqIFRXT19QSSkpO1xufVxuXG5mdW5jdGlvbiB0c2ZueihlY2NlbnQsIHBoaSwgc2lucGhpKSB7XG4gIHZhciBjb24gPSBlY2NlbnQgKiBzaW5waGk7XG4gIHZhciBjb20gPSAwLjUgKiBlY2NlbnQ7XG4gIGNvbiA9IE1hdGgucG93KCgoMSAtIGNvbikgLyAoMSArIGNvbikpLCBjb20pO1xuICByZXR1cm4gKE1hdGgudGFuKDAuNSAqIChIQUxGX1BJIC0gcGhpKSkgLyBjb24pO1xufVxuXG5mdW5jdGlvbiBwaGkyeihlY2NlbnQsIHRzKSB7XG4gIHZhciBlY2NudGggPSAwLjUgKiBlY2NlbnQ7XG4gIHZhciBjb24sIGRwaGk7XG4gIHZhciBwaGkgPSBIQUxGX1BJIC0gMiAqIE1hdGguYXRhbih0cyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICBjb24gPSBlY2NlbnQgKiBNYXRoLnNpbihwaGkpO1xuICAgIGRwaGkgPSBIQUxGX1BJIC0gMiAqIE1hdGguYXRhbih0cyAqIChNYXRoLnBvdygoKDEgLSBjb24pIC8gKDEgKyBjb24pKSwgZWNjbnRoKSkpIC0gcGhpO1xuICAgIHBoaSArPSBkcGhpO1xuICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSAwLjAwMDAwMDAwMDEpIHtcbiAgICAgIHJldHVybiBwaGk7XG4gICAgfVxuICB9XG4gIC8vY29uc29sZS5sb2coXCJwaGkyeiBoYXMgTm9Db252ZXJnZW5jZVwiKTtcbiAgcmV0dXJuIC05OTk5O1xufVxuXG5mdW5jdGlvbiBpbml0JHYoKSB7XG4gIHZhciBjb24gPSB0aGlzLmIgLyB0aGlzLmE7XG4gIHRoaXMuZXMgPSAxIC0gY29uICogY29uO1xuICBpZighKCd4MCcgaW4gdGhpcykpe1xuICAgIHRoaXMueDAgPSAwO1xuICB9XG4gIGlmKCEoJ3kwJyBpbiB0aGlzKSl7XG4gICAgdGhpcy55MCA9IDA7XG4gIH1cbiAgdGhpcy5lID0gTWF0aC5zcXJ0KHRoaXMuZXMpO1xuICBpZiAodGhpcy5sYXRfdHMpIHtcbiAgICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICAgIHRoaXMuazAgPSBNYXRoLmNvcyh0aGlzLmxhdF90cyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5rMCA9IG1zZm56KHRoaXMuZSwgTWF0aC5zaW4odGhpcy5sYXRfdHMpLCBNYXRoLmNvcyh0aGlzLmxhdF90cykpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuazApIHtcbiAgICAgIGlmICh0aGlzLmspIHtcbiAgICAgICAgdGhpcy5rMCA9IHRoaXMuaztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmswID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogTWVyY2F0b3IgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gZm9yd2FyZCR1KHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgLy8gY29udmVydCB0byByYWRpYW5zXG4gIGlmIChsYXQgKiBSMkQgPiA5MCAmJiBsYXQgKiBSMkQgPCAtOTAgJiYgbG9uICogUjJEID4gMTgwICYmIGxvbiAqIFIyRCA8IC0xODApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciB4LCB5O1xuICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMobGF0KSAtIEhBTEZfUEkpIDw9IEVQU0xOKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgICB4ID0gdGhpcy54MCArIHRoaXMuYSAqIHRoaXMuazAgKiBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICAgICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiB0aGlzLmswICogTWF0aC5sb2coTWF0aC50YW4oRk9SVFBJICsgMC41ICogbGF0KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHNpbnBoaSA9IE1hdGguc2luKGxhdCk7XG4gICAgICB2YXIgdHMgPSB0c2Zueih0aGlzLmUsIGxhdCwgc2lucGhpKTtcbiAgICAgIHggPSB0aGlzLngwICsgdGhpcy5hICogdGhpcy5rMCAqIGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gICAgICB5ID0gdGhpcy55MCAtIHRoaXMuYSAqIHRoaXMuazAgKiBNYXRoLmxvZyh0cyk7XG4gICAgfVxuICAgIHAueCA9IHg7XG4gICAgcC55ID0geTtcbiAgICByZXR1cm4gcDtcbiAgfVxufVxuXG4vKiBNZXJjYXRvciBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW52ZXJzZSR1KHApIHtcblxuICB2YXIgeCA9IHAueCAtIHRoaXMueDA7XG4gIHZhciB5ID0gcC55IC0gdGhpcy55MDtcbiAgdmFyIGxvbiwgbGF0O1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGxhdCA9IEhBTEZfUEkgLSAyICogTWF0aC5hdGFuKE1hdGguZXhwKC15IC8gKHRoaXMuYSAqIHRoaXMuazApKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIHRzID0gTWF0aC5leHAoLXkgLyAodGhpcy5hICogdGhpcy5rMCkpO1xuICAgIGxhdCA9IHBoaTJ6KHRoaXMuZSwgdHMpO1xuICAgIGlmIChsYXQgPT09IC05OTk5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgeCAvICh0aGlzLmEgKiB0aGlzLmswKSk7XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG52YXIgbmFtZXMkdyA9IFtcIk1lcmNhdG9yXCIsIFwiUG9wdWxhciBWaXN1YWxpc2F0aW9uIFBzZXVkbyBNZXJjYXRvclwiLCBcIk1lcmNhdG9yXzFTUFwiLCBcIk1lcmNhdG9yX0F1eGlsaWFyeV9TcGhlcmVcIiwgXCJtZXJjXCJdO1xudmFyIG1lcmMgPSB7XG4gIGluaXQ6IGluaXQkdixcbiAgZm9yd2FyZDogZm9yd2FyZCR1LFxuICBpbnZlcnNlOiBpbnZlcnNlJHUsXG4gIG5hbWVzOiBuYW1lcyR3XG59O1xuXG5mdW5jdGlvbiBpbml0JHUoKSB7XG4gIC8vbm8tb3AgZm9yIGxvbmdsYXRcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkocHQpIHtcbiAgcmV0dXJuIHB0O1xufVxudmFyIG5hbWVzJHYgPSBbXCJsb25nbGF0XCIsIFwiaWRlbnRpdHlcIl07XG52YXIgbG9uZ2xhdCA9IHtcbiAgaW5pdDogaW5pdCR1LFxuICBmb3J3YXJkOiBpZGVudGl0eSxcbiAgaW52ZXJzZTogaWRlbnRpdHksXG4gIG5hbWVzOiBuYW1lcyR2XG59O1xuXG52YXIgcHJvanMgPSBbbWVyYywgbG9uZ2xhdF07XG52YXIgbmFtZXMkdSA9IHt9O1xudmFyIHByb2pTdG9yZSA9IFtdO1xuXG5mdW5jdGlvbiBhZGQocHJvaiwgaSkge1xuICB2YXIgbGVuID0gcHJvalN0b3JlLmxlbmd0aDtcbiAgaWYgKCFwcm9qLm5hbWVzKSB7XG4gICAgY29uc29sZS5sb2coaSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcHJvalN0b3JlW2xlbl0gPSBwcm9qO1xuICBwcm9qLm5hbWVzLmZvckVhY2goZnVuY3Rpb24obikge1xuICAgIG5hbWVzJHVbbi50b0xvd2VyQ2FzZSgpXSA9IGxlbjtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBnZXQobmFtZSkge1xuICBpZiAoIW5hbWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIG4gPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGlmICh0eXBlb2YgbmFtZXMkdVtuXSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvalN0b3JlW25hbWVzJHVbbl1dKSB7XG4gICAgcmV0dXJuIHByb2pTdG9yZVtuYW1lcyR1W25dXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgcHJvanMuZm9yRWFjaChhZGQpO1xufVxudmFyIHByb2plY3Rpb25zID0ge1xuICBzdGFydDogc3RhcnQsXG4gIGFkZDogYWRkLFxuICBnZXQ6IGdldFxufTtcblxudmFyIGV4cG9ydHMkMSA9IHt9O1xuZXhwb3J0cyQxLk1FUklUID0ge1xuICBhOiA2Mzc4MTM3LjAsXG4gIHJmOiAyOTguMjU3LFxuICBlbGxpcHNlTmFtZTogXCJNRVJJVCAxOTgzXCJcbn07XG5cbmV4cG9ydHMkMS5TR1M4NSA9IHtcbiAgYTogNjM3ODEzNi4wLFxuICByZjogMjk4LjI1NyxcbiAgZWxsaXBzZU5hbWU6IFwiU292aWV0IEdlb2RldGljIFN5c3RlbSA4NVwiXG59O1xuXG5leHBvcnRzJDEuR1JTODAgPSB7XG4gIGE6IDYzNzgxMzcuMCxcbiAgcmY6IDI5OC4yNTcyMjIxMDEsXG4gIGVsbGlwc2VOYW1lOiBcIkdSUyAxOTgwKElVR0csIDE5ODApXCJcbn07XG5cbmV4cG9ydHMkMS5JQVU3NiA9IHtcbiAgYTogNjM3ODE0MC4wLFxuICByZjogMjk4LjI1NyxcbiAgZWxsaXBzZU5hbWU6IFwiSUFVIDE5NzZcIlxufTtcblxuZXhwb3J0cyQxLmFpcnkgPSB7XG4gIGE6IDYzNzc1NjMuMzk2LFxuICBiOiA2MzU2MjU2LjkxMCxcbiAgZWxsaXBzZU5hbWU6IFwiQWlyeSAxODMwXCJcbn07XG5cbmV4cG9ydHMkMS5BUEw0ID0ge1xuICBhOiA2Mzc4MTM3LFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJBcHBsLiBQaHlzaWNzLiAxOTY1XCJcbn07XG5cbmV4cG9ydHMkMS5OV0w5RCA9IHtcbiAgYTogNjM3ODE0NS4wLFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJOYXZhbCBXZWFwb25zIExhYi4sIDE5NjVcIlxufTtcblxuZXhwb3J0cyQxLm1vZF9haXJ5ID0ge1xuICBhOiA2Mzc3MzQwLjE4OSxcbiAgYjogNjM1NjAzNC40NDYsXG4gIGVsbGlwc2VOYW1lOiBcIk1vZGlmaWVkIEFpcnlcIlxufTtcblxuZXhwb3J0cyQxLmFuZHJhZSA9IHtcbiAgYTogNjM3NzEwNC40MyxcbiAgcmY6IDMwMC4wLFxuICBlbGxpcHNlTmFtZTogXCJBbmRyYWUgMTg3NiAoRGVuLiwgSWNsbmQuKVwiXG59O1xuXG5leHBvcnRzJDEuYXVzdF9TQSA9IHtcbiAgYTogNjM3ODE2MC4wLFxuICByZjogMjk4LjI1LFxuICBlbGxpcHNlTmFtZTogXCJBdXN0cmFsaWFuIE5hdGwgJiBTLiBBbWVyLiAxOTY5XCJcbn07XG5cbmV4cG9ydHMkMS5HUlM2NyA9IHtcbiAgYTogNjM3ODE2MC4wLFxuICByZjogMjk4LjI0NzE2NzQyNzAsXG4gIGVsbGlwc2VOYW1lOiBcIkdSUyA2NyhJVUdHIDE5NjcpXCJcbn07XG5cbmV4cG9ydHMkMS5iZXNzZWwgPSB7XG4gIGE6IDYzNzczOTcuMTU1LFxuICByZjogMjk5LjE1MjgxMjgsXG4gIGVsbGlwc2VOYW1lOiBcIkJlc3NlbCAxODQxXCJcbn07XG5cbmV4cG9ydHMkMS5iZXNzX25hbSA9IHtcbiAgYTogNjM3NzQ4My44NjUsXG4gIHJmOiAyOTkuMTUyODEyOCxcbiAgZWxsaXBzZU5hbWU6IFwiQmVzc2VsIDE4NDEgKE5hbWliaWEpXCJcbn07XG5cbmV4cG9ydHMkMS5jbHJrNjYgPSB7XG4gIGE6IDYzNzgyMDYuNCxcbiAgYjogNjM1NjU4My44LFxuICBlbGxpcHNlTmFtZTogXCJDbGFya2UgMTg2NlwiXG59O1xuXG5leHBvcnRzJDEuY2xyazgwID0ge1xuICBhOiA2Mzc4MjQ5LjE0NSxcbiAgcmY6IDI5My40NjYzLFxuICBlbGxpcHNlTmFtZTogXCJDbGFya2UgMTg4MCBtb2QuXCJcbn07XG5cbmV4cG9ydHMkMS5jbHJrODBpZ24gPSB7XG4gIGE6IDYzNzgyNDkuMixcbiAgYjogNjM1NjUxNSxcbiAgcmY6IDI5My40NjYwMjEzLFxuICBlbGxpcHNlTmFtZTogXCJDbGFya2UgMTg4MCAoSUdOKVwiXG59O1xuXG5leHBvcnRzJDEuY2xyazU4ID0ge1xuICBhOiA2Mzc4MjkzLjY0NTIwODc1OSxcbiAgcmY6IDI5NC4yNjA2NzYzNjkyNjU0LFxuICBlbGxpcHNlTmFtZTogXCJDbGFya2UgMTg1OFwiXG59O1xuXG5leHBvcnRzJDEuQ1BNID0ge1xuICBhOiA2Mzc1NzM4LjcsXG4gIHJmOiAzMzQuMjksXG4gIGVsbGlwc2VOYW1lOiBcIkNvbW0uIGRlcyBQb2lkcyBldCBNZXN1cmVzIDE3OTlcIlxufTtcblxuZXhwb3J0cyQxLmRlbG1iciA9IHtcbiAgYTogNjM3NjQyOC4wLFxuICByZjogMzExLjUsXG4gIGVsbGlwc2VOYW1lOiBcIkRlbGFtYnJlIDE4MTAgKEJlbGdpdW0pXCJcbn07XG5cbmV4cG9ydHMkMS5lbmdlbGlzID0ge1xuICBhOiA2Mzc4MTM2LjA1LFxuICByZjogMjk4LjI1NjYsXG4gIGVsbGlwc2VOYW1lOiBcIkVuZ2VsaXMgMTk4NVwiXG59O1xuXG5leHBvcnRzJDEuZXZyc3QzMCA9IHtcbiAgYTogNjM3NzI3Ni4zNDUsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAxODMwXCJcbn07XG5cbmV4cG9ydHMkMS5ldnJzdDQ4ID0ge1xuICBhOiA2Mzc3MzA0LjA2MyxcbiAgcmY6IDMwMC44MDE3LFxuICBlbGxpcHNlTmFtZTogXCJFdmVyZXN0IDE5NDhcIlxufTtcblxuZXhwb3J0cyQxLmV2cnN0NTYgPSB7XG4gIGE6IDYzNzczMDEuMjQzLFxuICByZjogMzAwLjgwMTcsXG4gIGVsbGlwc2VOYW1lOiBcIkV2ZXJlc3QgMTk1NlwiXG59O1xuXG5leHBvcnRzJDEuZXZyc3Q2OSA9IHtcbiAgYTogNjM3NzI5NS42NjQsXG4gIHJmOiAzMDAuODAxNyxcbiAgZWxsaXBzZU5hbWU6IFwiRXZlcmVzdCAxOTY5XCJcbn07XG5cbmV4cG9ydHMkMS5ldnJzdFNTID0ge1xuICBhOiA2Mzc3Mjk4LjU1NixcbiAgcmY6IDMwMC44MDE3LFxuICBlbGxpcHNlTmFtZTogXCJFdmVyZXN0IChTYWJhaCAmIFNhcmF3YWspXCJcbn07XG5cbmV4cG9ydHMkMS5mc2NocjYwID0ge1xuICBhOiA2Mzc4MTY2LjAsXG4gIHJmOiAyOTguMyxcbiAgZWxsaXBzZU5hbWU6IFwiRmlzY2hlciAoTWVyY3VyeSBEYXR1bSkgMTk2MFwiXG59O1xuXG5leHBvcnRzJDEuZnNjaHI2MG0gPSB7XG4gIGE6IDYzNzgxNTUuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJGaXNjaGVyIDE5NjBcIlxufTtcblxuZXhwb3J0cyQxLmZzY2hyNjggPSB7XG4gIGE6IDYzNzgxNTAuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJGaXNjaGVyIDE5NjhcIlxufTtcblxuZXhwb3J0cyQxLmhlbG1lcnQgPSB7XG4gIGE6IDYzNzgyMDAuMCxcbiAgcmY6IDI5OC4zLFxuICBlbGxpcHNlTmFtZTogXCJIZWxtZXJ0IDE5MDZcIlxufTtcblxuZXhwb3J0cyQxLmhvdWdoID0ge1xuICBhOiA2Mzc4MjcwLjAsXG4gIHJmOiAyOTcuMCxcbiAgZWxsaXBzZU5hbWU6IFwiSG91Z2hcIlxufTtcblxuZXhwb3J0cyQxLmludGwgPSB7XG4gIGE6IDYzNzgzODguMCxcbiAgcmY6IDI5Ny4wLFxuICBlbGxpcHNlTmFtZTogXCJJbnRlcm5hdGlvbmFsIDE5MDkgKEhheWZvcmQpXCJcbn07XG5cbmV4cG9ydHMkMS5rYXVsYSA9IHtcbiAgYTogNjM3ODE2My4wLFxuICByZjogMjk4LjI0LFxuICBlbGxpcHNlTmFtZTogXCJLYXVsYSAxOTYxXCJcbn07XG5cbmV4cG9ydHMkMS5sZXJjaCA9IHtcbiAgYTogNjM3ODEzOS4wLFxuICByZjogMjk4LjI1NyxcbiAgZWxsaXBzZU5hbWU6IFwiTGVyY2ggMTk3OVwiXG59O1xuXG5leHBvcnRzJDEubXBydHMgPSB7XG4gIGE6IDYzOTczMDAuMCxcbiAgcmY6IDE5MS4wLFxuICBlbGxpcHNlTmFtZTogXCJNYXVwZXJ0aXVzIDE3MzhcIlxufTtcblxuZXhwb3J0cyQxLm5ld19pbnRsID0ge1xuICBhOiA2Mzc4MTU3LjUsXG4gIGI6IDYzNTY3NzIuMixcbiAgZWxsaXBzZU5hbWU6IFwiTmV3IEludGVybmF0aW9uYWwgMTk2N1wiXG59O1xuXG5leHBvcnRzJDEucGxlc3NpcyA9IHtcbiAgYTogNjM3NjUyMy4wLFxuICByZjogNjM1NTg2My4wLFxuICBlbGxpcHNlTmFtZTogXCJQbGVzc2lzIDE4MTcgKEZyYW5jZSlcIlxufTtcblxuZXhwb3J0cyQxLmtyYXNzID0ge1xuICBhOiA2Mzc4MjQ1LjAsXG4gIHJmOiAyOTguMyxcbiAgZWxsaXBzZU5hbWU6IFwiS3Jhc3NvdnNreSwgMTk0MlwiXG59O1xuXG5leHBvcnRzJDEuU0Vhc2lhID0ge1xuICBhOiA2Mzc4MTU1LjAsXG4gIGI6IDYzNTY3NzMuMzIwNSxcbiAgZWxsaXBzZU5hbWU6IFwiU291dGhlYXN0IEFzaWFcIlxufTtcblxuZXhwb3J0cyQxLndhbGJlY2sgPSB7XG4gIGE6IDYzNzY4OTYuMCxcbiAgYjogNjM1NTgzNC44NDY3LFxuICBlbGxpcHNlTmFtZTogXCJXYWxiZWNrXCJcbn07XG5cbmV4cG9ydHMkMS5XR1M2MCA9IHtcbiAgYTogNjM3ODE2NS4wLFxuICByZjogMjk4LjMsXG4gIGVsbGlwc2VOYW1lOiBcIldHUyA2MFwiXG59O1xuXG5leHBvcnRzJDEuV0dTNjYgPSB7XG4gIGE6IDYzNzgxNDUuMCxcbiAgcmY6IDI5OC4yNSxcbiAgZWxsaXBzZU5hbWU6IFwiV0dTIDY2XCJcbn07XG5cbmV4cG9ydHMkMS5XR1M3ID0ge1xuICBhOiA2Mzc4MTM1LjAsXG4gIHJmOiAyOTguMjYsXG4gIGVsbGlwc2VOYW1lOiBcIldHUyA3MlwiXG59O1xuXG52YXIgV0dTODQgPSBleHBvcnRzJDEuV0dTODQgPSB7XG4gIGE6IDYzNzgxMzcuMCxcbiAgcmY6IDI5OC4yNTcyMjM1NjMsXG4gIGVsbGlwc2VOYW1lOiBcIldHUyA4NFwiXG59O1xuXG5leHBvcnRzJDEuc3BoZXJlID0ge1xuICBhOiA2MzcwOTk3LjAsXG4gIGI6IDYzNzA5OTcuMCxcbiAgZWxsaXBzZU5hbWU6IFwiTm9ybWFsIFNwaGVyZSAocj02MzcwOTk3KVwiXG59O1xuXG5mdW5jdGlvbiBlY2NlbnRyaWNpdHkoYSwgYiwgcmYsIFJfQSkge1xuICB2YXIgYTIgPSBhICogYTsgLy8gdXNlZCBpbiBnZW9jZW50cmljXG4gIHZhciBiMiA9IGIgKiBiOyAvLyB1c2VkIGluIGdlb2NlbnRyaWNcbiAgdmFyIGVzID0gKGEyIC0gYjIpIC8gYTI7IC8vIGUgXiAyXG4gIHZhciBlID0gMDtcbiAgaWYgKFJfQSkge1xuICAgIGEgKj0gMSAtIGVzICogKFNJWFRIICsgZXMgKiAoUkE0ICsgZXMgKiBSQTYpKTtcbiAgICBhMiA9IGEgKiBhO1xuICAgIGVzID0gMDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5zcXJ0KGVzKTsgLy8gZWNjZW50cmljaXR5XG4gIH1cbiAgdmFyIGVwMiA9IChhMiAtIGIyKSAvIGIyOyAvLyB1c2VkIGluIGdlb2NlbnRyaWNcbiAgcmV0dXJuIHtcbiAgICBlczogZXMsXG4gICAgZTogZSxcbiAgICBlcDI6IGVwMlxuICB9O1xufVxuZnVuY3Rpb24gc3BoZXJlKGEsIGIsIHJmLCBlbGxwcywgc3BoZXJlKSB7XG4gIGlmICghYSkgeyAvLyBkbyB3ZSBoYXZlIGFuIGVsbGlwc29pZD9cbiAgICB2YXIgZWxsaXBzZSA9IG1hdGNoKGV4cG9ydHMkMSwgZWxscHMpO1xuICAgIGlmICghZWxsaXBzZSkge1xuICAgICAgZWxsaXBzZSA9IFdHUzg0O1xuICAgIH1cbiAgICBhID0gZWxsaXBzZS5hO1xuICAgIGIgPSBlbGxpcHNlLmI7XG4gICAgcmYgPSBlbGxpcHNlLnJmO1xuICB9XG5cbiAgaWYgKHJmICYmICFiKSB7XG4gICAgYiA9ICgxLjAgLSAxLjAgLyByZikgKiBhO1xuICB9XG4gIGlmIChyZiA9PT0gMCB8fCBNYXRoLmFicyhhIC0gYikgPCBFUFNMTikge1xuICAgIHNwaGVyZSA9IHRydWU7XG4gICAgYiA9IGE7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBhOiBhLFxuICAgIGI6IGIsXG4gICAgcmY6IHJmLFxuICAgIHNwaGVyZTogc3BoZXJlXG4gIH07XG59XG5cbnZhciBleHBvcnRzID0ge307XG5leHBvcnRzLndnczg0ID0ge1xuICB0b3dnczg0OiBcIjAsMCwwXCIsXG4gIGVsbGlwc2U6IFwiV0dTODRcIixcbiAgZGF0dW1OYW1lOiBcIldHUzg0XCJcbn07XG5cbmV4cG9ydHMuY2gxOTAzID0ge1xuICB0b3dnczg0OiBcIjY3NC4zNzQsMTUuMDU2LDQwNS4zNDZcIixcbiAgZWxsaXBzZTogXCJiZXNzZWxcIixcbiAgZGF0dW1OYW1lOiBcInN3aXNzXCJcbn07XG5cbmV4cG9ydHMuZ2dyczg3ID0ge1xuICB0b3dnczg0OiBcIi0xOTkuODcsNzQuNzksMjQ2LjYyXCIsXG4gIGVsbGlwc2U6IFwiR1JTODBcIixcbiAgZGF0dW1OYW1lOiBcIkdyZWVrX0dlb2RldGljX1JlZmVyZW5jZV9TeXN0ZW1fMTk4N1wiXG59O1xuXG5leHBvcnRzLm5hZDgzID0ge1xuICB0b3dnczg0OiBcIjAsMCwwXCIsXG4gIGVsbGlwc2U6IFwiR1JTODBcIixcbiAgZGF0dW1OYW1lOiBcIk5vcnRoX0FtZXJpY2FuX0RhdHVtXzE5ODNcIlxufTtcblxuZXhwb3J0cy5uYWQyNyA9IHtcbiAgbmFkZ3JpZHM6IFwiQGNvbnVzLEBhbGFza2EsQG50djJfMC5nc2IsQG50djFfY2FuLmRhdFwiLFxuICBlbGxpcHNlOiBcImNscms2NlwiLFxuICBkYXR1bU5hbWU6IFwiTm9ydGhfQW1lcmljYW5fRGF0dW1fMTkyN1wiXG59O1xuXG5leHBvcnRzLnBvdHNkYW0gPSB7XG4gIHRvd2dzODQ6IFwiNTk4LjEsNzMuNyw0MTguMiwwLjIwMiwwLjA0NSwtMi40NTUsNi43XCIsXG4gIGVsbGlwc2U6IFwiYmVzc2VsXCIsXG4gIGRhdHVtTmFtZTogXCJQb3RzZGFtIFJhdWVuYmVyZyAxOTUwIERIRE5cIlxufTtcblxuZXhwb3J0cy5jYXJ0aGFnZSA9IHtcbiAgdG93Z3M4NDogXCItMjYzLjAsNi4wLDQzMS4wXCIsXG4gIGVsbGlwc2U6IFwiY2xhcms4MFwiLFxuICBkYXR1bU5hbWU6IFwiQ2FydGhhZ2UgMTkzNCBUdW5pc2lhXCJcbn07XG5cbmV4cG9ydHMuaGVybWFubnNrb2dlbCA9IHtcbiAgdG93Z3M4NDogXCI1NzcuMzI2LDkwLjEyOSw0NjMuOTE5LDUuMTM3LDEuNDc0LDUuMjk3LDIuNDIzMlwiLFxuICBlbGxpcHNlOiBcImJlc3NlbFwiLFxuICBkYXR1bU5hbWU6IFwiSGVybWFubnNrb2dlbFwiXG59O1xuXG5leHBvcnRzLm1pbGl0YXJnZW9ncmFwaGlzY2hlX2luc3RpdHV0ID0ge1xuICB0b3dnczg0OiBcIjU3Ny4zMjYsOTAuMTI5LDQ2My45MTksNS4xMzcsMS40NzQsNS4yOTcsMi40MjMyXCIsXG4gIGVsbGlwc2U6IFwiYmVzc2VsXCIsXG4gIGRhdHVtTmFtZTogXCJNaWxpdGFyLUdlb2dyYXBoaXNjaGUgSW5zdGl0dXRcIlxufTtcblxuZXhwb3J0cy5vc25pNTIgPSB7XG4gIHRvd2dzODQ6IFwiNDgyLjUzMCwtMTMwLjU5Niw1NjQuNTU3LC0xLjA0MiwtMC4yMTQsLTAuNjMxLDguMTVcIixcbiAgZWxsaXBzZTogXCJhaXJ5XCIsXG4gIGRhdHVtTmFtZTogXCJJcmlzaCBOYXRpb25hbFwiXG59O1xuXG5leHBvcnRzLmlyZTY1ID0ge1xuICB0b3dnczg0OiBcIjQ4Mi41MzAsLTEzMC41OTYsNTY0LjU1NywtMS4wNDIsLTAuMjE0LC0wLjYzMSw4LjE1XCIsXG4gIGVsbGlwc2U6IFwibW9kX2FpcnlcIixcbiAgZGF0dW1OYW1lOiBcIklyZWxhbmQgMTk2NVwiXG59O1xuXG5leHBvcnRzLnJhc3NhZGlyYW4gPSB7XG4gIHRvd2dzODQ6IFwiLTEzMy42MywtMTU3LjUsLTE1OC42MlwiLFxuICBlbGxpcHNlOiBcImludGxcIixcbiAgZGF0dW1OYW1lOiBcIlJhc3NhZGlyYW5cIlxufTtcblxuZXhwb3J0cy5uemdkNDkgPSB7XG4gIHRvd2dzODQ6IFwiNTkuNDcsLTUuMDQsMTg3LjQ0LDAuNDcsLTAuMSwxLjAyNCwtNC41OTkzXCIsXG4gIGVsbGlwc2U6IFwiaW50bFwiLFxuICBkYXR1bU5hbWU6IFwiTmV3IFplYWxhbmQgR2VvZGV0aWMgRGF0dW0gMTk0OVwiXG59O1xuXG5leHBvcnRzLm9zZ2IzNiA9IHtcbiAgdG93Z3M4NDogXCI0NDYuNDQ4LC0xMjUuMTU3LDU0Mi4wNjAsMC4xNTAyLDAuMjQ3MCwwLjg0MjEsLTIwLjQ4OTRcIixcbiAgZWxsaXBzZTogXCJhaXJ5XCIsXG4gIGRhdHVtTmFtZTogXCJBaXJ5IDE4MzBcIlxufTtcblxuZXhwb3J0cy5zX2p0c2sgPSB7XG4gIHRvd2dzODQ6IFwiNTg5LDc2LDQ4MFwiLFxuICBlbGxpcHNlOiAnYmVzc2VsJyxcbiAgZGF0dW1OYW1lOiAnUy1KVFNLIChGZXJybyknXG59O1xuXG5leHBvcnRzLmJlZHVhcmFtID0ge1xuICB0b3dnczg0OiAnLTEwNiwtODcsMTg4JyxcbiAgZWxsaXBzZTogJ2Nscms4MCcsXG4gIGRhdHVtTmFtZTogJ0JlZHVhcmFtJ1xufTtcblxuZXhwb3J0cy5ndW51bmdfc2VnYXJhID0ge1xuICB0b3dnczg0OiAnLTQwMyw2ODQsNDEnLFxuICBlbGxpcHNlOiAnYmVzc2VsJyxcbiAgZGF0dW1OYW1lOiAnR3VudW5nIFNlZ2FyYSBKYWthcnRhJ1xufTtcblxuZXhwb3J0cy5ybmI3MiA9IHtcbiAgdG93Z3M4NDogXCIxMDYuODY5LC01Mi4yOTc4LDEwMy43MjQsLTAuMzM2NTcsMC40NTY5NTUsLTEuODQyMTgsMVwiLFxuICBlbGxpcHNlOiBcImludGxcIixcbiAgZGF0dW1OYW1lOiBcIlJlc2VhdSBOYXRpb25hbCBCZWxnZSAxOTcyXCJcbn07XG5cbmZ1bmN0aW9uIGRhdHVtKGRhdHVtQ29kZSwgZGF0dW1fcGFyYW1zLCBhLCBiLCBlcywgZXAyLCBuYWRncmlkcykge1xuICB2YXIgb3V0ID0ge307XG5cbiAgaWYgKGRhdHVtQ29kZSA9PT0gdW5kZWZpbmVkIHx8IGRhdHVtQ29kZSA9PT0gJ25vbmUnKSB7XG4gICAgb3V0LmRhdHVtX3R5cGUgPSBQSkRfTk9EQVRVTTtcbiAgfSBlbHNlIHtcbiAgICBvdXQuZGF0dW1fdHlwZSA9IFBKRF9XR1M4NDtcbiAgfVxuXG4gIGlmIChkYXR1bV9wYXJhbXMpIHtcbiAgICBvdXQuZGF0dW1fcGFyYW1zID0gZGF0dW1fcGFyYW1zLm1hcChwYXJzZUZsb2F0KTtcbiAgICBpZiAob3V0LmRhdHVtX3BhcmFtc1swXSAhPT0gMCB8fCBvdXQuZGF0dW1fcGFyYW1zWzFdICE9PSAwIHx8IG91dC5kYXR1bV9wYXJhbXNbMl0gIT09IDApIHtcbiAgICAgIG91dC5kYXR1bV90eXBlID0gUEpEXzNQQVJBTTtcbiAgICB9XG4gICAgaWYgKG91dC5kYXR1bV9wYXJhbXMubGVuZ3RoID4gMykge1xuICAgICAgaWYgKG91dC5kYXR1bV9wYXJhbXNbM10gIT09IDAgfHwgb3V0LmRhdHVtX3BhcmFtc1s0XSAhPT0gMCB8fCBvdXQuZGF0dW1fcGFyYW1zWzVdICE9PSAwIHx8IG91dC5kYXR1bV9wYXJhbXNbNl0gIT09IDApIHtcbiAgICAgICAgb3V0LmRhdHVtX3R5cGUgPSBQSkRfN1BBUkFNO1xuICAgICAgICBvdXQuZGF0dW1fcGFyYW1zWzNdICo9IFNFQ19UT19SQUQ7XG4gICAgICAgIG91dC5kYXR1bV9wYXJhbXNbNF0gKj0gU0VDX1RPX1JBRDtcbiAgICAgICAgb3V0LmRhdHVtX3BhcmFtc1s1XSAqPSBTRUNfVE9fUkFEO1xuICAgICAgICBvdXQuZGF0dW1fcGFyYW1zWzZdID0gKG91dC5kYXR1bV9wYXJhbXNbNl0gLyAxMDAwMDAwLjApICsgMS4wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChuYWRncmlkcykge1xuICAgIG91dC5kYXR1bV90eXBlID0gUEpEX0dSSURTSElGVDtcbiAgICBvdXQuZ3JpZHMgPSBuYWRncmlkcztcbiAgfVxuICBvdXQuYSA9IGE7IC8vZGF0dW0gb2JqZWN0IGFsc28gdXNlcyB0aGVzZSB2YWx1ZXNcbiAgb3V0LmIgPSBiO1xuICBvdXQuZXMgPSBlcztcbiAgb3V0LmVwMiA9IGVwMjtcbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBSZXNvdXJjZXMgZm9yIGRldGFpbHMgb2YgTlR2MiBmaWxlIGZvcm1hdHM6XG4gKiAtIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDE0MDEyNzIwNDgyMmlmXy9odHRwOi8vd3d3Lm1ncy5nb3Yub24uY2E6ODAvc3RkcHJvZGNvbnN1bWUvZ3JvdXBzL2NvbnRlbnQvQG1ncy9AaWFuZGl0L2RvY3VtZW50cy9yZXNvdXJjZWxpc3Qvc3RlbDAyXzA0NzQ0Ny5wZGZcbiAqIC0gaHR0cDovL21pbWFrYS5jb20vaGVscC9ncy9odG1sLzAwNF9OVFYyJTIwRGF0YSUyMEZvcm1hdC5odG1cbiAqL1xuXG52YXIgbG9hZGVkTmFkZ3JpZHMgPSB7fTtcblxuLyoqXG4gKiBMb2FkIGEgYmluYXJ5IE5UdjIgZmlsZSAoLmdzYikgdG8gYSBrZXkgdGhhdCBjYW4gYmUgdXNlZCBpbiBhIHByb2ogc3RyaW5nIGxpa2UgK25hZGdyaWRzPTxrZXk+LiBQYXNzIHRoZSBOVHYyIGZpbGVcbiAqIGFzIGFuIEFycmF5QnVmZmVyLlxuICovXG5mdW5jdGlvbiBuYWRncmlkKGtleSwgZGF0YSkge1xuICB2YXIgdmlldyA9IG5ldyBEYXRhVmlldyhkYXRhKTtcbiAgdmFyIGlzTGl0dGxlRW5kaWFuID0gZGV0ZWN0TGl0dGxlRW5kaWFuKHZpZXcpO1xuICB2YXIgaGVhZGVyID0gcmVhZEhlYWRlcih2aWV3LCBpc0xpdHRsZUVuZGlhbik7XG4gIHZhciBzdWJncmlkcyA9IHJlYWRTdWJncmlkcyh2aWV3LCBoZWFkZXIsIGlzTGl0dGxlRW5kaWFuKTtcbiAgdmFyIG5hZGdyaWQgPSB7aGVhZGVyOiBoZWFkZXIsIHN1YmdyaWRzOiBzdWJncmlkc307XG4gIGxvYWRlZE5hZGdyaWRzW2tleV0gPSBuYWRncmlkO1xuICByZXR1cm4gbmFkZ3JpZDtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIHByb2o0IHZhbHVlIGZvciBuYWRncmlkcywgcmV0dXJuIGFuIGFycmF5IG9mIGxvYWRlZCBncmlkc1xuICovXG5mdW5jdGlvbiBnZXROYWRncmlkcyhuYWRncmlkcykge1xuICAvLyBGb3JtYXQgZGV0YWlsczogaHR0cDovL3Byb2oubWFwdG9vbHMub3JnL2dlbl9wYXJtcy5odG1sXG4gIGlmIChuYWRncmlkcyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBudWxsOyB9XG4gIHZhciBncmlkcyA9IG5hZGdyaWRzLnNwbGl0KCcsJyk7XG4gIHJldHVybiBncmlkcy5tYXAocGFyc2VOYWRncmlkU3RyaW5nKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VOYWRncmlkU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgb3B0aW9uYWwgPSB2YWx1ZVswXSA9PT0gJ0AnO1xuICBpZiAob3B0aW9uYWwpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJ251bGwnKSB7XG4gICAgcmV0dXJuIHtuYW1lOiAnbnVsbCcsIG1hbmRhdG9yeTogIW9wdGlvbmFsLCBncmlkOiBudWxsLCBpc051bGw6IHRydWV9O1xuICB9XG4gIHJldHVybiB7XG4gICAgbmFtZTogdmFsdWUsXG4gICAgbWFuZGF0b3J5OiAhb3B0aW9uYWwsXG4gICAgZ3JpZDogbG9hZGVkTmFkZ3JpZHNbdmFsdWVdIHx8IG51bGwsXG4gICAgaXNOdWxsOiBmYWxzZVxuICB9O1xufVxuXG5mdW5jdGlvbiBzZWNvbmRzVG9SYWRpYW5zKHNlY29uZHMpIHtcbiAgcmV0dXJuIChzZWNvbmRzIC8gMzYwMCkgKiBNYXRoLlBJIC8gMTgwO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RMaXR0bGVFbmRpYW4odmlldykge1xuICB2YXIgbkZpZWxkcyA9IHZpZXcuZ2V0SW50MzIoOCwgZmFsc2UpO1xuICBpZiAobkZpZWxkcyA9PT0gMTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbkZpZWxkcyA9IHZpZXcuZ2V0SW50MzIoOCwgdHJ1ZSk7XG4gIGlmIChuRmllbGRzICE9PSAxMSkge1xuICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIGRldGVjdCBuYWRncmlkIGVuZGlhbi1uZXNzLCBkZWZhdWx0aW5nIHRvIGxpdHRsZS1lbmRpYW4nKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEhlYWRlcih2aWV3LCBpc0xpdHRsZUVuZGlhbikge1xuICByZXR1cm4ge1xuICAgIG5GaWVsZHM6IHZpZXcuZ2V0SW50MzIoOCwgaXNMaXR0bGVFbmRpYW4pLFxuICAgIG5TdWJncmlkRmllbGRzOiB2aWV3LmdldEludDMyKDI0LCBpc0xpdHRsZUVuZGlhbiksXG4gICAgblN1YmdyaWRzOiB2aWV3LmdldEludDMyKDQwLCBpc0xpdHRsZUVuZGlhbiksXG4gICAgc2hpZnRUeXBlOiBkZWNvZGVTdHJpbmcodmlldywgNTYsIDU2ICsgOCkudHJpbSgpLFxuICAgIGZyb21TZW1pTWFqb3JBeGlzOiB2aWV3LmdldEZsb2F0NjQoMTIwLCBpc0xpdHRsZUVuZGlhbiksXG4gICAgZnJvbVNlbWlNaW5vckF4aXM6IHZpZXcuZ2V0RmxvYXQ2NCgxMzYsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICB0b1NlbWlNYWpvckF4aXM6IHZpZXcuZ2V0RmxvYXQ2NCgxNTIsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICB0b1NlbWlNaW5vckF4aXM6IHZpZXcuZ2V0RmxvYXQ2NCgxNjgsIGlzTGl0dGxlRW5kaWFuKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlU3RyaW5nKHZpZXcsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkodmlldy5idWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCkpKTtcbn1cblxuZnVuY3Rpb24gcmVhZFN1YmdyaWRzKHZpZXcsIGhlYWRlciwgaXNMaXR0bGVFbmRpYW4pIHtcbiAgdmFyIGdyaWRPZmZzZXQgPSAxNzY7XG4gIHZhciBncmlkcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRlci5uU3ViZ3JpZHM7IGkrKykge1xuICAgIHZhciBzdWJIZWFkZXIgPSByZWFkR3JpZEhlYWRlcih2aWV3LCBncmlkT2Zmc2V0LCBpc0xpdHRsZUVuZGlhbik7XG4gICAgdmFyIG5vZGVzID0gcmVhZEdyaWROb2Rlcyh2aWV3LCBncmlkT2Zmc2V0LCBzdWJIZWFkZXIsIGlzTGl0dGxlRW5kaWFuKTtcbiAgICB2YXIgbG5nQ29sdW1uQ291bnQgPSBNYXRoLnJvdW5kKFxuICAgICAgMSArIChzdWJIZWFkZXIudXBwZXJMb25naXR1ZGUgLSBzdWJIZWFkZXIubG93ZXJMb25naXR1ZGUpIC8gc3ViSGVhZGVyLmxvbmdpdHVkZUludGVydmFsKTtcbiAgICB2YXIgbGF0Q29sdW1uQ291bnQgPSBNYXRoLnJvdW5kKFxuICAgICAgMSArIChzdWJIZWFkZXIudXBwZXJMYXRpdHVkZSAtIHN1YkhlYWRlci5sb3dlckxhdGl0dWRlKSAvIHN1YkhlYWRlci5sYXRpdHVkZUludGVydmFsKTtcbiAgICAvLyBQcm9qNCBvcGVyYXRlcyBvbiByYWRpYW5zIHdoZXJlYXMgdGhlIGNvb3JkaW5hdGVzIGFyZSBpbiBzZWNvbmRzIGluIHRoZSBncmlkXG4gICAgZ3JpZHMucHVzaCh7XG4gICAgICBsbDogW3NlY29uZHNUb1JhZGlhbnMoc3ViSGVhZGVyLmxvd2VyTG9uZ2l0dWRlKSwgc2Vjb25kc1RvUmFkaWFucyhzdWJIZWFkZXIubG93ZXJMYXRpdHVkZSldLFxuICAgICAgZGVsOiBbc2Vjb25kc1RvUmFkaWFucyhzdWJIZWFkZXIubG9uZ2l0dWRlSW50ZXJ2YWwpLCBzZWNvbmRzVG9SYWRpYW5zKHN1YkhlYWRlci5sYXRpdHVkZUludGVydmFsKV0sXG4gICAgICBsaW06IFtsbmdDb2x1bW5Db3VudCwgbGF0Q29sdW1uQ291bnRdLFxuICAgICAgY291bnQ6IHN1YkhlYWRlci5ncmlkTm9kZUNvdW50LFxuICAgICAgY3ZzOiBtYXBOb2Rlcyhub2RlcylcbiAgICB9KTtcbiAgICBncmlkT2Zmc2V0ICs9IDE3NiArIHN1YkhlYWRlci5ncmlkTm9kZUNvdW50ICogMTY7XG4gIH1cbiAgcmV0dXJuIGdyaWRzO1xufVxuXG5mdW5jdGlvbiBtYXBOb2Rlcyhub2Rlcykge1xuICByZXR1cm4gbm9kZXMubWFwKGZ1bmN0aW9uIChyKSB7cmV0dXJuIFtzZWNvbmRzVG9SYWRpYW5zKHIubG9uZ2l0dWRlU2hpZnQpLCBzZWNvbmRzVG9SYWRpYW5zKHIubGF0aXR1ZGVTaGlmdCldO30pO1xufVxuXG5mdW5jdGlvbiByZWFkR3JpZEhlYWRlcih2aWV3LCBvZmZzZXQsIGlzTGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogZGVjb2RlU3RyaW5nKHZpZXcsIG9mZnNldCArIDgsIG9mZnNldCArIDE2KS50cmltKCksXG4gICAgcGFyZW50OiBkZWNvZGVTdHJpbmcodmlldywgb2Zmc2V0ICsgMjQsIG9mZnNldCArIDI0ICsgOCkudHJpbSgpLFxuICAgIGxvd2VyTGF0aXR1ZGU6IHZpZXcuZ2V0RmxvYXQ2NChvZmZzZXQgKyA3MiwgaXNMaXR0bGVFbmRpYW4pLFxuICAgIHVwcGVyTGF0aXR1ZGU6IHZpZXcuZ2V0RmxvYXQ2NChvZmZzZXQgKyA4OCwgaXNMaXR0bGVFbmRpYW4pLFxuICAgIGxvd2VyTG9uZ2l0dWRlOiB2aWV3LmdldEZsb2F0NjQob2Zmc2V0ICsgMTA0LCBpc0xpdHRsZUVuZGlhbiksXG4gICAgdXBwZXJMb25naXR1ZGU6IHZpZXcuZ2V0RmxvYXQ2NChvZmZzZXQgKyAxMjAsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICBsYXRpdHVkZUludGVydmFsOiB2aWV3LmdldEZsb2F0NjQob2Zmc2V0ICsgMTM2LCBpc0xpdHRsZUVuZGlhbiksXG4gICAgbG9uZ2l0dWRlSW50ZXJ2YWw6IHZpZXcuZ2V0RmxvYXQ2NChvZmZzZXQgKyAxNTIsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICBncmlkTm9kZUNvdW50OiB2aWV3LmdldEludDMyKG9mZnNldCArIDE2OCwgaXNMaXR0bGVFbmRpYW4pXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlYWRHcmlkTm9kZXModmlldywgb2Zmc2V0LCBncmlkSGVhZGVyLCBpc0xpdHRsZUVuZGlhbikge1xuICB2YXIgbm9kZXNPZmZzZXQgPSBvZmZzZXQgKyAxNzY7XG4gIHZhciBncmlkUmVjb3JkTGVuZ3RoID0gMTY7XG4gIHZhciBncmlkU2hpZnRSZWNvcmRzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZEhlYWRlci5ncmlkTm9kZUNvdW50OyBpKyspIHtcbiAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgbGF0aXR1ZGVTaGlmdDogdmlldy5nZXRGbG9hdDMyKG5vZGVzT2Zmc2V0ICsgaSAqIGdyaWRSZWNvcmRMZW5ndGgsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICAgIGxvbmdpdHVkZVNoaWZ0OiB2aWV3LmdldEZsb2F0MzIobm9kZXNPZmZzZXQgKyBpICogZ3JpZFJlY29yZExlbmd0aCArIDQsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICAgIGxhdGl0dWRlQWNjdXJhY3k6IHZpZXcuZ2V0RmxvYXQzMihub2Rlc09mZnNldCArIGkgKiBncmlkUmVjb3JkTGVuZ3RoICsgOCwgaXNMaXR0bGVFbmRpYW4pLFxuICAgICAgbG9uZ2l0dWRlQWNjdXJhY3k6IHZpZXcuZ2V0RmxvYXQzMihub2Rlc09mZnNldCArIGkgKiBncmlkUmVjb3JkTGVuZ3RoICsgMTIsIGlzTGl0dGxlRW5kaWFuKSxcbiAgICB9O1xuICAgIGdyaWRTaGlmdFJlY29yZHMucHVzaChyZWNvcmQpO1xuICB9XG4gIHJldHVybiBncmlkU2hpZnRSZWNvcmRzO1xufVxuXG5mdW5jdGlvbiBQcm9qZWN0aW9uKHNyc0NvZGUsY2FsbGJhY2spIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb2plY3Rpb24pKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9qZWN0aW9uKHNyc0NvZGUpO1xuICB9XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmKGVycm9yKXtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbiAgdmFyIGpzb24gPSBwYXJzZShzcnNDb2RlKTtcbiAgaWYodHlwZW9mIGpzb24gIT09ICdvYmplY3QnKXtcbiAgICBjYWxsYmFjayhzcnNDb2RlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG91clByb2ogPSBQcm9qZWN0aW9uLnByb2plY3Rpb25zLmdldChqc29uLnByb2pOYW1lKTtcbiAgaWYoIW91clByb2ope1xuICAgIGNhbGxiYWNrKHNyc0NvZGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoanNvbi5kYXR1bUNvZGUgJiYganNvbi5kYXR1bUNvZGUgIT09ICdub25lJykge1xuICAgIHZhciBkYXR1bURlZiA9IG1hdGNoKGV4cG9ydHMsIGpzb24uZGF0dW1Db2RlKTtcbiAgICBpZiAoZGF0dW1EZWYpIHtcbiAgICAgIGpzb24uZGF0dW1fcGFyYW1zID0ganNvbi5kYXR1bV9wYXJhbXMgfHwgKGRhdHVtRGVmLnRvd2dzODQgPyBkYXR1bURlZi50b3dnczg0LnNwbGl0KCcsJykgOiBudWxsKTtcbiAgICAgIGpzb24uZWxscHMgPSBkYXR1bURlZi5lbGxpcHNlO1xuICAgICAganNvbi5kYXR1bU5hbWUgPSBkYXR1bURlZi5kYXR1bU5hbWUgPyBkYXR1bURlZi5kYXR1bU5hbWUgOiBqc29uLmRhdHVtQ29kZTtcbiAgICB9XG4gIH1cbiAganNvbi5rMCA9IGpzb24uazAgfHwgMS4wO1xuICBqc29uLmF4aXMgPSBqc29uLmF4aXMgfHwgJ2VudSc7XG4gIGpzb24uZWxscHMgPSBqc29uLmVsbHBzIHx8ICd3Z3M4NCc7XG4gIGpzb24ubGF0MSA9IGpzb24ubGF0MSB8fCBqc29uLmxhdDA7IC8vIExhbWJlcnRfQ29uZm9ybWFsX0NvbmljXzFTUCwgZm9yIGV4YW1wbGUsIG5lZWRzIHRoaXNcblxuICB2YXIgc3BoZXJlXyA9IHNwaGVyZShqc29uLmEsIGpzb24uYiwganNvbi5yZiwganNvbi5lbGxwcywganNvbi5zcGhlcmUpO1xuICB2YXIgZWNjID0gZWNjZW50cmljaXR5KHNwaGVyZV8uYSwgc3BoZXJlXy5iLCBzcGhlcmVfLnJmLCBqc29uLlJfQSk7XG4gIHZhciBuYWRncmlkcyA9IGdldE5hZGdyaWRzKGpzb24ubmFkZ3JpZHMpO1xuICB2YXIgZGF0dW1PYmogPSBqc29uLmRhdHVtIHx8IGRhdHVtKGpzb24uZGF0dW1Db2RlLCBqc29uLmRhdHVtX3BhcmFtcywgc3BoZXJlXy5hLCBzcGhlcmVfLmIsIGVjYy5lcywgZWNjLmVwMixcbiAgICBuYWRncmlkcyk7XG5cbiAgZXh0ZW5kKHRoaXMsIGpzb24pOyAvLyB0cmFuc2ZlciBldmVyeXRoaW5nIG92ZXIgZnJvbSB0aGUgcHJvamVjdGlvbiBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hhdCB3ZSdsbCBuZWVkXG4gIGV4dGVuZCh0aGlzLCBvdXJQcm9qKTsgLy8gdHJhbnNmZXIgYWxsIHRoZSBtZXRob2RzIGZyb20gdGhlIHByb2plY3Rpb25cblxuICAvLyBjb3B5IHRoZSA0IHRoaW5ncyBvdmVyIHdlIGNhbGN1bGF0ZWQgaW4gZGVyaXZlQ29uc3RhbnRzLnNwaGVyZVxuICB0aGlzLmEgPSBzcGhlcmVfLmE7XG4gIHRoaXMuYiA9IHNwaGVyZV8uYjtcbiAgdGhpcy5yZiA9IHNwaGVyZV8ucmY7XG4gIHRoaXMuc3BoZXJlID0gc3BoZXJlXy5zcGhlcmU7XG5cbiAgLy8gY29weSB0aGUgMyB0aGluZ3Mgd2UgY2FsY3VsYXRlZCBpbiBkZXJpdmVDb25zdGFudHMuZWNjZW50cmljaXR5XG4gIHRoaXMuZXMgPSBlY2MuZXM7XG4gIHRoaXMuZSA9IGVjYy5lO1xuICB0aGlzLmVwMiA9IGVjYy5lcDI7XG5cbiAgLy8gYWRkIGluIHRoZSBkYXR1bSBvYmplY3RcbiAgdGhpcy5kYXR1bSA9IGRhdHVtT2JqO1xuXG4gIC8vIGluaXQgdGhlIHByb2plY3Rpb25cbiAgdGhpcy5pbml0KCk7XG5cbiAgLy8gbGVnZWN5IGNhbGxiYWNrIGZyb20gYmFjayBpbiB0aGUgZGF5IHdoZW4gaXQgd2VudCB0byBzcGF0aWFscmVmZXJlbmNlLm9yZ1xuICBjYWxsYmFjayhudWxsLCB0aGlzKTtcblxufVxuUHJvamVjdGlvbi5wcm9qZWN0aW9ucyA9IHByb2plY3Rpb25zO1xuUHJvamVjdGlvbi5wcm9qZWN0aW9ucy5zdGFydCgpO1xuXG5mdW5jdGlvbiBjb21wYXJlRGF0dW1zKHNvdXJjZSwgZGVzdCkge1xuICBpZiAoc291cmNlLmRhdHVtX3R5cGUgIT09IGRlc3QuZGF0dW1fdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTsgLy8gZmFsc2UsIGRhdHVtcyBhcmUgbm90IGVxdWFsXG4gIH0gZWxzZSBpZiAoc291cmNlLmEgIT09IGRlc3QuYSB8fCBNYXRoLmFicyhzb3VyY2UuZXMgLSBkZXN0LmVzKSA+IDAuMDAwMDAwMDAwMDUwKSB7XG4gICAgLy8gdGhlIHRvbGVyYW5jZSBmb3IgZXMgaXMgdG8gZW5zdXJlIHRoYXQgR1JTODAgYW5kIFdHUzg0XG4gICAgLy8gYXJlIGNvbnNpZGVyZWQgaWRlbnRpY2FsXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKHNvdXJjZS5kYXR1bV90eXBlID09PSBQSkRfM1BBUkFNKSB7XG4gICAgcmV0dXJuIChzb3VyY2UuZGF0dW1fcGFyYW1zWzBdID09PSBkZXN0LmRhdHVtX3BhcmFtc1swXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzFdID09PSBkZXN0LmRhdHVtX3BhcmFtc1sxXSAmJiBzb3VyY2UuZGF0dW1fcGFyYW1zWzJdID09PSBkZXN0LmRhdHVtX3BhcmFtc1syXSk7XG4gIH0gZWxzZSBpZiAoc291cmNlLmRhdHVtX3R5cGUgPT09IFBKRF83UEFSQU0pIHtcbiAgICByZXR1cm4gKHNvdXJjZS5kYXR1bV9wYXJhbXNbMF0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzBdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbMV0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzFdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbMl0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzJdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbM10gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzNdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbNF0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzRdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbNV0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzVdICYmIHNvdXJjZS5kYXR1bV9wYXJhbXNbNl0gPT09IGRlc3QuZGF0dW1fcGFyYW1zWzZdKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gZGF0dW1zIGFyZSBlcXVhbFxuICB9XG59IC8vIGNzX2NvbXBhcmVfZGF0dW1zKClcblxuLypcbiAqIFRoZSBmdW5jdGlvbiBDb252ZXJ0X0dlb2RldGljX1RvX0dlb2NlbnRyaWMgY29udmVydHMgZ2VvZGV0aWMgY29vcmRpbmF0ZXNcbiAqIChsYXRpdHVkZSwgbG9uZ2l0dWRlLCBhbmQgaGVpZ2h0KSB0byBnZW9jZW50cmljIGNvb3JkaW5hdGVzIChYLCBZLCBaKSxcbiAqIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBlbGxpcHNvaWQgcGFyYW1ldGVycy5cbiAqXG4gKiAgICBMYXRpdHVkZSAgOiBHZW9kZXRpYyBsYXRpdHVkZSBpbiByYWRpYW5zICAgICAgICAgICAgICAgICAgICAgKGlucHV0KVxuICogICAgTG9uZ2l0dWRlIDogR2VvZGV0aWMgbG9uZ2l0dWRlIGluIHJhZGlhbnMgICAgICAgICAgICAgICAgICAgIChpbnB1dClcbiAqICAgIEhlaWdodCAgICA6IEdlb2RldGljIGhlaWdodCwgaW4gbWV0ZXJzICAgICAgICAgICAgICAgICAgICAgICAoaW5wdXQpXG4gKiAgICBYICAgICAgICAgOiBDYWxjdWxhdGVkIEdlb2NlbnRyaWMgWCBjb29yZGluYXRlLCBpbiBtZXRlcnMgICAgKG91dHB1dClcbiAqICAgIFkgICAgICAgICA6IENhbGN1bGF0ZWQgR2VvY2VudHJpYyBZIGNvb3JkaW5hdGUsIGluIG1ldGVycyAgICAob3V0cHV0KVxuICogICAgWiAgICAgICAgIDogQ2FsY3VsYXRlZCBHZW9jZW50cmljIFogY29vcmRpbmF0ZSwgaW4gbWV0ZXJzICAgIChvdXRwdXQpXG4gKlxuICovXG5mdW5jdGlvbiBnZW9kZXRpY1RvR2VvY2VudHJpYyhwLCBlcywgYSkge1xuICB2YXIgTG9uZ2l0dWRlID0gcC54O1xuICB2YXIgTGF0aXR1ZGUgPSBwLnk7XG4gIHZhciBIZWlnaHQgPSBwLnogPyBwLnogOiAwOyAvL1ogdmFsdWUgbm90IGFsd2F5cyBzdXBwbGllZFxuXG4gIHZhciBSbjsgLyogIEVhcnRoIHJhZGl1cyBhdCBsb2NhdGlvbiAgKi9cbiAgdmFyIFNpbl9MYXQ7IC8qICBNYXRoLnNpbihMYXRpdHVkZSkgICovXG4gIHZhciBTaW4yX0xhdDsgLyogIFNxdWFyZSBvZiBNYXRoLnNpbihMYXRpdHVkZSkgICovXG4gIHZhciBDb3NfTGF0OyAvKiAgTWF0aC5jb3MoTGF0aXR1ZGUpICAqL1xuXG4gIC8qXG4gICAqKiBEb24ndCBibG93IHVwIGlmIExhdGl0dWRlIGlzIGp1c3QgYSBsaXR0bGUgb3V0IG9mIHRoZSB2YWx1ZVxuICAgKiogcmFuZ2UgYXMgaXQgbWF5IGp1c3QgYmUgYSByb3VuZGluZyBpc3N1ZS4gIEFsc28gcmVtb3ZlZCBsb25naXR1ZGVcbiAgICoqIHRlc3QsIGl0IHNob3VsZCBiZSB3cmFwcGVkIGJ5IE1hdGguY29zKCkgYW5kIE1hdGguc2luKCkuICBORlcgZm9yIFBST0ouNCwgU2VwLzIwMDEuXG4gICAqL1xuICBpZiAoTGF0aXR1ZGUgPCAtSEFMRl9QSSAmJiBMYXRpdHVkZSA+IC0xLjAwMSAqIEhBTEZfUEkpIHtcbiAgICBMYXRpdHVkZSA9IC1IQUxGX1BJO1xuICB9IGVsc2UgaWYgKExhdGl0dWRlID4gSEFMRl9QSSAmJiBMYXRpdHVkZSA8IDEuMDAxICogSEFMRl9QSSkge1xuICAgIExhdGl0dWRlID0gSEFMRl9QSTtcbiAgfSBlbHNlIGlmIChMYXRpdHVkZSA8IC1IQUxGX1BJKSB7XG4gICAgLyogTGF0aXR1ZGUgb3V0IG9mIHJhbmdlICovXG4gICAgLy8uLnJlcG9ydEVycm9yKCdnZW9jZW50OmxhdCBvdXQgb2YgcmFuZ2U6JyArIExhdGl0dWRlKTtcbiAgICByZXR1cm4geyB4OiAtSW5maW5pdHksIHk6IC1JbmZpbml0eSwgejogcC56IH07XG4gIH0gZWxzZSBpZiAoTGF0aXR1ZGUgPiBIQUxGX1BJKSB7XG4gICAgLyogTGF0aXR1ZGUgb3V0IG9mIHJhbmdlICovXG4gICAgcmV0dXJuIHsgeDogSW5maW5pdHksIHk6IEluZmluaXR5LCB6OiBwLnogfTtcbiAgfVxuXG4gIGlmIChMb25naXR1ZGUgPiBNYXRoLlBJKSB7XG4gICAgTG9uZ2l0dWRlIC09ICgyICogTWF0aC5QSSk7XG4gIH1cbiAgU2luX0xhdCA9IE1hdGguc2luKExhdGl0dWRlKTtcbiAgQ29zX0xhdCA9IE1hdGguY29zKExhdGl0dWRlKTtcbiAgU2luMl9MYXQgPSBTaW5fTGF0ICogU2luX0xhdDtcbiAgUm4gPSBhIC8gKE1hdGguc3FydCgxLjBlMCAtIGVzICogU2luMl9MYXQpKTtcbiAgcmV0dXJuIHtcbiAgICB4OiAoUm4gKyBIZWlnaHQpICogQ29zX0xhdCAqIE1hdGguY29zKExvbmdpdHVkZSksXG4gICAgeTogKFJuICsgSGVpZ2h0KSAqIENvc19MYXQgKiBNYXRoLnNpbihMb25naXR1ZGUpLFxuICAgIHo6ICgoUm4gKiAoMSAtIGVzKSkgKyBIZWlnaHQpICogU2luX0xhdFxuICB9O1xufSAvLyBjc19nZW9kZXRpY190b19nZW9jZW50cmljKClcblxuZnVuY3Rpb24gZ2VvY2VudHJpY1RvR2VvZGV0aWMocCwgZXMsIGEsIGIpIHtcbiAgLyogbG9jYWwgZGVmaW50aW9ucyBhbmQgdmFyaWFibGVzICovXG4gIC8qIGVuZC1jcml0ZXJpdW0gb2YgbG9vcCwgYWNjdXJhY3kgb2Ygc2luKExhdGl0dWRlKSAqL1xuICB2YXIgZ2VuYXUgPSAxZS0xMjtcbiAgdmFyIGdlbmF1MiA9IChnZW5hdSAqIGdlbmF1KTtcbiAgdmFyIG1heGl0ZXIgPSAzMDtcblxuICB2YXIgUDsgLyogZGlzdGFuY2UgYmV0d2VlbiBzZW1pLW1pbm9yIGF4aXMgYW5kIGxvY2F0aW9uICovXG4gIHZhciBSUjsgLyogZGlzdGFuY2UgYmV0d2VlbiBjZW50ZXIgYW5kIGxvY2F0aW9uICovXG4gIHZhciBDVDsgLyogc2luIG9mIGdlb2NlbnRyaWMgbGF0aXR1ZGUgKi9cbiAgdmFyIFNUOyAvKiBjb3Mgb2YgZ2VvY2VudHJpYyBsYXRpdHVkZSAqL1xuICB2YXIgUlg7XG4gIHZhciBSSztcbiAgdmFyIFJOOyAvKiBFYXJ0aCByYWRpdXMgYXQgbG9jYXRpb24gKi9cbiAgdmFyIENQSEkwOyAvKiBjb3Mgb2Ygc3RhcnQgb3Igb2xkIGdlb2RldGljIGxhdGl0dWRlIGluIGl0ZXJhdGlvbnMgKi9cbiAgdmFyIFNQSEkwOyAvKiBzaW4gb2Ygc3RhcnQgb3Igb2xkIGdlb2RldGljIGxhdGl0dWRlIGluIGl0ZXJhdGlvbnMgKi9cbiAgdmFyIENQSEk7IC8qIGNvcyBvZiBzZWFyY2hlZCBnZW9kZXRpYyBsYXRpdHVkZSAqL1xuICB2YXIgU1BISTsgLyogc2luIG9mIHNlYXJjaGVkIGdlb2RldGljIGxhdGl0dWRlICovXG4gIHZhciBTRFBISTsgLyogZW5kLWNyaXRlcml1bTogYWRkaXRpb24tdGhlb3JlbSBvZiBzaW4oTGF0aXR1ZGUoaXRlciktTGF0aXR1ZGUoaXRlci0xKSkgKi9cbiAgdmFyIGl0ZXI7IC8qICMgb2YgY29udGlub3VzIGl0ZXJhdGlvbiwgbWF4LiAzMCBpcyBhbHdheXMgZW5vdWdoIChzLmEuKSAqL1xuXG4gIHZhciBYID0gcC54O1xuICB2YXIgWSA9IHAueTtcbiAgdmFyIFogPSBwLnogPyBwLnogOiAwLjA7IC8vWiB2YWx1ZSBub3QgYWx3YXlzIHN1cHBsaWVkXG4gIHZhciBMb25naXR1ZGU7XG4gIHZhciBMYXRpdHVkZTtcbiAgdmFyIEhlaWdodDtcblxuICBQID0gTWF0aC5zcXJ0KFggKiBYICsgWSAqIFkpO1xuICBSUiA9IE1hdGguc3FydChYICogWCArIFkgKiBZICsgWiAqIFopO1xuXG4gIC8qICAgICAgc3BlY2lhbCBjYXNlcyBmb3IgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSAqL1xuICBpZiAoUCAvIGEgPCBnZW5hdSkge1xuXG4gICAgLyogIHNwZWNpYWwgY2FzZSwgaWYgUD0wLiAoWD0wLiwgWT0wLikgKi9cbiAgICBMb25naXR1ZGUgPSAwLjA7XG5cbiAgICAvKiAgaWYgKFgsWSxaKT0oMC4sMC4sMC4pIHRoZW4gSGVpZ2h0IGJlY29tZXMgc2VtaS1taW5vciBheGlzXG4gICAgICogIG9mIGVsbGlwc29pZCAoPWNlbnRlciBvZiBtYXNzKSwgTGF0aXR1ZGUgYmVjb21lcyBQSS8yICovXG4gICAgaWYgKFJSIC8gYSA8IGdlbmF1KSB7XG4gICAgICBMYXRpdHVkZSA9IEhBTEZfUEk7XG4gICAgICBIZWlnaHQgPSAtYjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHAueCxcbiAgICAgICAgeTogcC55LFxuICAgICAgICB6OiBwLnpcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8qICBlbGxpcHNvaWRhbCAoZ2VvZGV0aWMpIGxvbmdpdHVkZVxuICAgICAqICBpbnRlcnZhbDogLVBJIDwgTG9uZ2l0dWRlIDw9ICtQSSAqL1xuICAgIExvbmdpdHVkZSA9IE1hdGguYXRhbjIoWSwgWCk7XG4gIH1cblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBGb2xsb3dpbmcgaXRlcmF0aXZlIGFsZ29yaXRobSB3YXMgZGV2ZWxvcHBlZCBieVxuICAgKiBcIkluc3RpdHV0IGZvciBFcmRtZXNzdW5nXCIsIFVuaXZlcnNpdHkgb2YgSGFubm92ZXIsIEp1bHkgMTk4OC5cbiAgICogSW50ZXJuZXQ6IHd3dy5pZmUudW5pLWhhbm5vdmVyLmRlXG4gICAqIEl0ZXJhdGl2ZSBjb21wdXRhdGlvbiBvZiBDUEhJLFNQSEkgYW5kIEhlaWdodC5cbiAgICogSXRlcmF0aW9uIG9mIENQSEkgYW5kIFNQSEkgdG8gMTAqKi0xMiByYWRpYW4gcmVzcC5cbiAgICogMioxMCoqLTcgYXJjc2VjLlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgQ1QgPSBaIC8gUlI7XG4gIFNUID0gUCAvIFJSO1xuICBSWCA9IDEuMCAvIE1hdGguc3FydCgxLjAgLSBlcyAqICgyLjAgLSBlcykgKiBTVCAqIFNUKTtcbiAgQ1BISTAgPSBTVCAqICgxLjAgLSBlcykgKiBSWDtcbiAgU1BISTAgPSBDVCAqIFJYO1xuICBpdGVyID0gMDtcblxuICAvKiBsb29wIHRvIGZpbmQgc2luKExhdGl0dWRlKSByZXNwLiBMYXRpdHVkZVxuICAgKiB1bnRpbCB8c2luKExhdGl0dWRlKGl0ZXIpLUxhdGl0dWRlKGl0ZXItMSkpfCA8IGdlbmF1ICovXG4gIGRvIHtcbiAgICBpdGVyKys7XG4gICAgUk4gPSBhIC8gTWF0aC5zcXJ0KDEuMCAtIGVzICogU1BISTAgKiBTUEhJMCk7XG5cbiAgICAvKiAgZWxsaXBzb2lkYWwgKGdlb2RldGljKSBoZWlnaHQgKi9cbiAgICBIZWlnaHQgPSBQICogQ1BISTAgKyBaICogU1BISTAgLSBSTiAqICgxLjAgLSBlcyAqIFNQSEkwICogU1BISTApO1xuXG4gICAgUksgPSBlcyAqIFJOIC8gKFJOICsgSGVpZ2h0KTtcbiAgICBSWCA9IDEuMCAvIE1hdGguc3FydCgxLjAgLSBSSyAqICgyLjAgLSBSSykgKiBTVCAqIFNUKTtcbiAgICBDUEhJID0gU1QgKiAoMS4wIC0gUkspICogUlg7XG4gICAgU1BISSA9IENUICogUlg7XG4gICAgU0RQSEkgPSBTUEhJICogQ1BISTAgLSBDUEhJICogU1BISTA7XG4gICAgQ1BISTAgPSBDUEhJO1xuICAgIFNQSEkwID0gU1BISTtcbiAgfVxuICB3aGlsZSAoU0RQSEkgKiBTRFBISSA+IGdlbmF1MiAmJiBpdGVyIDwgbWF4aXRlcik7XG5cbiAgLyogICAgICBlbGxpcHNvaWRhbCAoZ2VvZGV0aWMpIGxhdGl0dWRlICovXG4gIExhdGl0dWRlID0gTWF0aC5hdGFuKFNQSEkgLyBNYXRoLmFicyhDUEhJKSk7XG4gIHJldHVybiB7XG4gICAgeDogTG9uZ2l0dWRlLFxuICAgIHk6IExhdGl0dWRlLFxuICAgIHo6IEhlaWdodFxuICB9O1xufSAvLyBjc19nZW9jZW50cmljX3RvX2dlb2RldGljKClcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLyBwal9nZW9jZW50aWNfdG9fd2dzODQoIHAgKVxuLy8gIHAgPSBwb2ludCB0byB0cmFuc2Zvcm0gaW4gZ2VvY2VudHJpYyBjb29yZGluYXRlcyAoeCx5LHopXG5cblxuLyoqIHBvaW50IG9iamVjdCwgbm90aGluZyBmYW5jeSwganVzdCBhbGxvd3MgdmFsdWVzIHRvIGJlXG4gICAgcGFzc2VkIGJhY2sgYW5kIGZvcnRoIGJ5IHJlZmVyZW5jZSByYXRoZXIgdGhhbiBieSB2YWx1ZS5cbiAgICBPdGhlciBwb2ludCBjbGFzc2VzIG1heSBiZSB1c2VkIGFzIGxvbmcgYXMgdGhleSBoYXZlXG4gICAgeCBhbmQgeSBwcm9wZXJ0aWVzLCB3aGljaCB3aWxsIGdldCBtb2RpZmllZCBpbiB0aGUgdHJhbnNmb3JtIG1ldGhvZC5cbiovXG5mdW5jdGlvbiBnZW9jZW50cmljVG9XZ3M4NChwLCBkYXR1bV90eXBlLCBkYXR1bV9wYXJhbXMpIHtcblxuICBpZiAoZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSkge1xuICAgIC8vIGlmKCB4W2lvXSA9PT0gSFVHRV9WQUwgKVxuICAgIC8vICAgIGNvbnRpbnVlO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBwLnggKyBkYXR1bV9wYXJhbXNbMF0sXG4gICAgICB5OiBwLnkgKyBkYXR1bV9wYXJhbXNbMV0sXG4gICAgICB6OiBwLnogKyBkYXR1bV9wYXJhbXNbMl0sXG4gICAgfTtcbiAgfSBlbHNlIGlmIChkYXR1bV90eXBlID09PSBQSkRfN1BBUkFNKSB7XG4gICAgdmFyIER4X0JGID0gZGF0dW1fcGFyYW1zWzBdO1xuICAgIHZhciBEeV9CRiA9IGRhdHVtX3BhcmFtc1sxXTtcbiAgICB2YXIgRHpfQkYgPSBkYXR1bV9wYXJhbXNbMl07XG4gICAgdmFyIFJ4X0JGID0gZGF0dW1fcGFyYW1zWzNdO1xuICAgIHZhciBSeV9CRiA9IGRhdHVtX3BhcmFtc1s0XTtcbiAgICB2YXIgUnpfQkYgPSBkYXR1bV9wYXJhbXNbNV07XG4gICAgdmFyIE1fQkYgPSBkYXR1bV9wYXJhbXNbNl07XG4gICAgLy8gaWYoIHhbaW9dID09PSBIVUdFX1ZBTCApXG4gICAgLy8gICAgY29udGludWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1fQkYgKiAocC54IC0gUnpfQkYgKiBwLnkgKyBSeV9CRiAqIHAueikgKyBEeF9CRixcbiAgICAgIHk6IE1fQkYgKiAoUnpfQkYgKiBwLnggKyBwLnkgLSBSeF9CRiAqIHAueikgKyBEeV9CRixcbiAgICAgIHo6IE1fQkYgKiAoLVJ5X0JGICogcC54ICsgUnhfQkYgKiBwLnkgKyBwLnopICsgRHpfQkZcbiAgICB9O1xuICB9XG59IC8vIGNzX2dlb2NlbnRyaWNfdG9fd2dzODRcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vLyBwal9nZW9jZW50aWNfZnJvbV93Z3M4NCgpXG4vLyAgY29vcmRpbmF0ZSBzeXN0ZW0gZGVmaW5pdGlvbixcbi8vICBwb2ludCB0byB0cmFuc2Zvcm0gaW4gZ2VvY2VudHJpYyBjb29yZGluYXRlcyAoeCx5LHopXG5mdW5jdGlvbiBnZW9jZW50cmljRnJvbVdnczg0KHAsIGRhdHVtX3R5cGUsIGRhdHVtX3BhcmFtcykge1xuXG4gIGlmIChkYXR1bV90eXBlID09PSBQSkRfM1BBUkFNKSB7XG4gICAgLy9pZiggeFtpb10gPT09IEhVR0VfVkFMIClcbiAgICAvLyAgICBjb250aW51ZTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcC54IC0gZGF0dW1fcGFyYW1zWzBdLFxuICAgICAgeTogcC55IC0gZGF0dW1fcGFyYW1zWzFdLFxuICAgICAgejogcC56IC0gZGF0dW1fcGFyYW1zWzJdLFxuICAgIH07XG5cbiAgfSBlbHNlIGlmIChkYXR1bV90eXBlID09PSBQSkRfN1BBUkFNKSB7XG4gICAgdmFyIER4X0JGID0gZGF0dW1fcGFyYW1zWzBdO1xuICAgIHZhciBEeV9CRiA9IGRhdHVtX3BhcmFtc1sxXTtcbiAgICB2YXIgRHpfQkYgPSBkYXR1bV9wYXJhbXNbMl07XG4gICAgdmFyIFJ4X0JGID0gZGF0dW1fcGFyYW1zWzNdO1xuICAgIHZhciBSeV9CRiA9IGRhdHVtX3BhcmFtc1s0XTtcbiAgICB2YXIgUnpfQkYgPSBkYXR1bV9wYXJhbXNbNV07XG4gICAgdmFyIE1fQkYgPSBkYXR1bV9wYXJhbXNbNl07XG4gICAgdmFyIHhfdG1wID0gKHAueCAtIER4X0JGKSAvIE1fQkY7XG4gICAgdmFyIHlfdG1wID0gKHAueSAtIER5X0JGKSAvIE1fQkY7XG4gICAgdmFyIHpfdG1wID0gKHAueiAtIER6X0JGKSAvIE1fQkY7XG4gICAgLy9pZiggeFtpb10gPT09IEhVR0VfVkFMIClcbiAgICAvLyAgICBjb250aW51ZTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiB4X3RtcCArIFJ6X0JGICogeV90bXAgLSBSeV9CRiAqIHpfdG1wLFxuICAgICAgeTogLVJ6X0JGICogeF90bXAgKyB5X3RtcCArIFJ4X0JGICogel90bXAsXG4gICAgICB6OiBSeV9CRiAqIHhfdG1wIC0gUnhfQkYgKiB5X3RtcCArIHpfdG1wXG4gICAgfTtcbiAgfSAvL2NzX2dlb2NlbnRyaWNfZnJvbV93Z3M4NCgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrUGFyYW1zKHR5cGUpIHtcbiAgcmV0dXJuICh0eXBlID09PSBQSkRfM1BBUkFNIHx8IHR5cGUgPT09IFBKRF83UEFSQU0pO1xufVxuXG5mdW5jdGlvbiBkYXR1bV90cmFuc2Zvcm0oc291cmNlLCBkZXN0LCBwb2ludCkge1xuICAvLyBTaG9ydCBjdXQgaWYgdGhlIGRhdHVtcyBhcmUgaWRlbnRpY2FsLlxuICBpZiAoY29tcGFyZURhdHVtcyhzb3VyY2UsIGRlc3QpKSB7XG4gICAgcmV0dXJuIHBvaW50OyAvLyBpbiB0aGlzIGNhc2UsIHplcm8gaXMgc3VjZXNzLFxuICAgIC8vIHdoZXJlYXMgY3NfY29tcGFyZV9kYXR1bXMgcmV0dXJucyAxIHRvIGluZGljYXRlIFRSVUVcbiAgICAvLyBjb25mdXNpbmcsIHNob3VsZCBmaXggdGhpc1xuICB9XG5cbiAgLy8gRXhwbGljaXRseSBza2lwIGRhdHVtIHRyYW5zZm9ybSBieSBzZXR0aW5nICdkYXR1bT1ub25lJyBhcyBwYXJhbWV0ZXIgZm9yIGVpdGhlciBzb3VyY2Ugb3IgZGVzdFxuICBpZiAoc291cmNlLmRhdHVtX3R5cGUgPT09IFBKRF9OT0RBVFVNIHx8IGRlc3QuZGF0dW1fdHlwZSA9PT0gUEpEX05PREFUVU0pIHtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH1cblxuICAvLyBJZiB0aGlzIGRhdHVtIHJlcXVpcmVzIGdyaWQgc2hpZnRzLCB0aGVuIGFwcGx5IGl0IHRvIGdlb2RldGljIGNvb3JkaW5hdGVzLlxuICB2YXIgc291cmNlX2EgPSBzb3VyY2UuYTtcbiAgdmFyIHNvdXJjZV9lcyA9IHNvdXJjZS5lcztcbiAgaWYgKHNvdXJjZS5kYXR1bV90eXBlID09PSBQSkRfR1JJRFNISUZUKSB7XG4gICAgdmFyIGdyaWRTaGlmdENvZGUgPSBhcHBseUdyaWRTaGlmdChzb3VyY2UsIGZhbHNlLCBwb2ludCk7XG4gICAgaWYgKGdyaWRTaGlmdENvZGUgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHNvdXJjZV9hID0gU1JTX1dHUzg0X1NFTUlNQUpPUjtcbiAgICBzb3VyY2VfZXMgPSBTUlNfV0dTODRfRVNRVUFSRUQ7XG4gIH1cblxuICB2YXIgZGVzdF9hID0gZGVzdC5hO1xuICB2YXIgZGVzdF9iID0gZGVzdC5iO1xuICB2YXIgZGVzdF9lcyA9IGRlc3QuZXM7XG4gIGlmIChkZXN0LmRhdHVtX3R5cGUgPT09IFBKRF9HUklEU0hJRlQpIHtcbiAgICBkZXN0X2EgPSBTUlNfV0dTODRfU0VNSU1BSk9SO1xuICAgIGRlc3RfYiA9IFNSU19XR1M4NF9TRU1JTUlOT1I7XG4gICAgZGVzdF9lcyA9IFNSU19XR1M4NF9FU1FVQVJFRDtcbiAgfVxuXG4gIC8vIERvIHdlIG5lZWQgdG8gZ28gdGhyb3VnaCBnZW9jZW50cmljIGNvb3JkaW5hdGVzP1xuICBpZiAoc291cmNlX2VzID09PSBkZXN0X2VzICYmIHNvdXJjZV9hID09PSBkZXN0X2EgJiYgIWNoZWNrUGFyYW1zKHNvdXJjZS5kYXR1bV90eXBlKSAmJiAgIWNoZWNrUGFyYW1zKGRlc3QuZGF0dW1fdHlwZSkpIHtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIGdlb2NlbnRyaWMgY29vcmRpbmF0ZXMuXG4gIHBvaW50ID0gZ2VvZGV0aWNUb0dlb2NlbnRyaWMocG9pbnQsIHNvdXJjZV9lcywgc291cmNlX2EpO1xuICAvLyBDb252ZXJ0IGJldHdlZW4gZGF0dW1zXG4gIGlmIChjaGVja1BhcmFtcyhzb3VyY2UuZGF0dW1fdHlwZSkpIHtcbiAgICBwb2ludCA9IGdlb2NlbnRyaWNUb1dnczg0KHBvaW50LCBzb3VyY2UuZGF0dW1fdHlwZSwgc291cmNlLmRhdHVtX3BhcmFtcyk7XG4gIH1cbiAgaWYgKGNoZWNrUGFyYW1zKGRlc3QuZGF0dW1fdHlwZSkpIHtcbiAgICBwb2ludCA9IGdlb2NlbnRyaWNGcm9tV2dzODQocG9pbnQsIGRlc3QuZGF0dW1fdHlwZSwgZGVzdC5kYXR1bV9wYXJhbXMpO1xuICB9XG4gIHBvaW50ID0gZ2VvY2VudHJpY1RvR2VvZGV0aWMocG9pbnQsIGRlc3RfZXMsIGRlc3RfYSwgZGVzdF9iKTtcblxuICBpZiAoZGVzdC5kYXR1bV90eXBlID09PSBQSkRfR1JJRFNISUZUKSB7XG4gICAgdmFyIGRlc3RHcmlkU2hpZnRSZXN1bHQgPSBhcHBseUdyaWRTaGlmdChkZXN0LCB0cnVlLCBwb2ludCk7XG4gICAgaWYgKGRlc3RHcmlkU2hpZnRSZXN1bHQgIT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBvaW50O1xufVxuXG5mdW5jdGlvbiBhcHBseUdyaWRTaGlmdChzb3VyY2UsIGludmVyc2UsIHBvaW50KSB7XG4gIGlmIChzb3VyY2UuZ3JpZHMgPT09IG51bGwgfHwgc291cmNlLmdyaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUubG9nKCdHcmlkIHNoaWZ0IGdyaWRzIG5vdCBmb3VuZCcpO1xuICAgIHJldHVybiAtMTtcbiAgfVxuICB2YXIgaW5wdXQgPSB7eDogLXBvaW50LngsIHk6IHBvaW50Lnl9O1xuICB2YXIgb3V0cHV0ID0ge3g6IE51bWJlci5OYU4sIHk6IE51bWJlci5OYU59O1xuICB2YXIgYXR0ZW1wdGVkR3JpZHMgPSBbXTtcbiAgb3V0ZXI6XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGdyaWQgPSBzb3VyY2UuZ3JpZHNbaV07XG4gICAgYXR0ZW1wdGVkR3JpZHMucHVzaChncmlkLm5hbWUpO1xuICAgIGlmIChncmlkLmlzTnVsbCkge1xuICAgICAgb3V0cHV0ID0gaW5wdXQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZ3JpZC5tYW5kYXRvcnk7XG4gICAgaWYgKGdyaWQuZ3JpZCA9PT0gbnVsbCkge1xuICAgICAgaWYgKGdyaWQubWFuZGF0b3J5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIGZpbmQgbWFuZGF0b3J5IGdyaWQgJ1wiICsgZ3JpZC5uYW1lICsgXCInXCIpO1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFyIHN1YmdyaWRzID0gZ3JpZC5ncmlkLnN1YmdyaWRzO1xuICAgIGZvciAodmFyIGogPSAwLCBqaiA9IHN1YmdyaWRzLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgIHZhciBzdWJncmlkID0gc3ViZ3JpZHNbal07XG4gICAgICAvLyBza2lwIHRhYmxlcyB0aGF0IGRvbid0IG1hdGNoIG91ciBwb2ludCBhdCBhbGxcbiAgICAgIHZhciBlcHNpbG9uID0gKE1hdGguYWJzKHN1YmdyaWQuZGVsWzFdKSArIE1hdGguYWJzKHN1YmdyaWQuZGVsWzBdKSkgLyAxMDAwMC4wO1xuICAgICAgdmFyIG1pblggPSBzdWJncmlkLmxsWzBdIC0gZXBzaWxvbjtcbiAgICAgIHZhciBtaW5ZID0gc3ViZ3JpZC5sbFsxXSAtIGVwc2lsb247XG4gICAgICB2YXIgbWF4WCA9IHN1YmdyaWQubGxbMF0gKyAoc3ViZ3JpZC5saW1bMF0gLSAxKSAqIHN1YmdyaWQuZGVsWzBdICsgZXBzaWxvbjtcbiAgICAgIHZhciBtYXhZID0gc3ViZ3JpZC5sbFsxXSArIChzdWJncmlkLmxpbVsxXSAtIDEpICogc3ViZ3JpZC5kZWxbMV0gKyBlcHNpbG9uO1xuICAgICAgaWYgKG1pblkgPiBpbnB1dC55IHx8IG1pblggPiBpbnB1dC54IHx8IG1heFkgPCBpbnB1dC55IHx8IG1heFggPCBpbnB1dC54ICkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG91dHB1dCA9IGFwcGx5U3ViZ3JpZFNoaWZ0KGlucHV0LCBpbnZlcnNlLCBzdWJncmlkKTtcbiAgICAgIGlmICghaXNOYU4ob3V0cHV0LngpKSB7XG4gICAgICAgIGJyZWFrIG91dGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoaXNOYU4ob3V0cHV0LngpKSB7XG4gICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZmluZCBhIGdyaWQgc2hpZnQgdGFibGUgZm9yIGxvY2F0aW9uICdcIitcbiAgICAgIC1pbnB1dC54ICogUjJEICsgXCIgXCIgKyBpbnB1dC55ICogUjJEICsgXCIgdHJpZWQ6ICdcIiArIGF0dGVtcHRlZEdyaWRzICsgXCInXCIpO1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBwb2ludC54ID0gLW91dHB1dC54O1xuICBwb2ludC55ID0gb3V0cHV0Lnk7XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBhcHBseVN1YmdyaWRTaGlmdChwaW4sIGludmVyc2UsIGN0KSB7XG4gIHZhciB2YWwgPSB7eDogTnVtYmVyLk5hTiwgeTogTnVtYmVyLk5hTn07XG4gIGlmIChpc05hTihwaW4ueCkpIHsgcmV0dXJuIHZhbDsgfVxuICB2YXIgdGIgPSB7eDogcGluLngsIHk6IHBpbi55fTtcbiAgdGIueCAtPSBjdC5sbFswXTtcbiAgdGIueSAtPSBjdC5sbFsxXTtcbiAgdGIueCA9IGFkanVzdF9sb24odGIueCAtIE1hdGguUEkpICsgTWF0aC5QSTtcbiAgdmFyIHQgPSBuYWRJbnRlcnBvbGF0ZSh0YiwgY3QpO1xuICBpZiAoaW52ZXJzZSkge1xuICAgIGlmIChpc05hTih0LngpKSB7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICB0LnggPSB0Yi54IC0gdC54O1xuICAgIHQueSA9IHRiLnkgLSB0Lnk7XG4gICAgdmFyIGkgPSA5LCB0b2wgPSAxZS0xMjtcbiAgICB2YXIgZGlmLCBkZWw7XG4gICAgZG8ge1xuICAgICAgZGVsID0gbmFkSW50ZXJwb2xhdGUodCwgY3QpO1xuICAgICAgaWYgKGlzTmFOKGRlbC54KSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkludmVyc2UgZ3JpZCBzaGlmdCBpdGVyYXRpb24gZmFpbGVkLCBwcmVzdW1hYmx5IGF0IGdyaWQgZWRnZS4gIFVzaW5nIGZpcnN0IGFwcHJveGltYXRpb24uXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRpZiA9IHt4OiB0Yi54IC0gKGRlbC54ICsgdC54KSwgeTogdGIueSAtIChkZWwueSArIHQueSl9O1xuICAgICAgdC54ICs9IGRpZi54O1xuICAgICAgdC55ICs9IGRpZi55O1xuICAgIH0gd2hpbGUgKGktLSAmJiBNYXRoLmFicyhkaWYueCkgPiB0b2wgJiYgTWF0aC5hYnMoZGlmLnkpID4gdG9sKTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSW52ZXJzZSBncmlkIHNoaWZ0IGl0ZXJhdG9yIGZhaWxlZCB0byBjb252ZXJnZS5cIik7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICB2YWwueCA9IGFkanVzdF9sb24odC54ICsgY3QubGxbMF0pO1xuICAgIHZhbC55ID0gdC55ICsgY3QubGxbMV07XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpc05hTih0LngpKSB7XG4gICAgICB2YWwueCA9IHBpbi54ICsgdC54O1xuICAgICAgdmFsLnkgPSBwaW4ueSArIHQueTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gbmFkSW50ZXJwb2xhdGUocGluLCBjdCkge1xuICB2YXIgdCA9IHt4OiBwaW4ueCAvIGN0LmRlbFswXSwgeTogcGluLnkgLyBjdC5kZWxbMV19O1xuICB2YXIgaW5keCA9IHt4OiBNYXRoLmZsb29yKHQueCksIHk6IE1hdGguZmxvb3IodC55KX07XG4gIHZhciBmcmN0ID0ge3g6IHQueCAtIDEuMCAqIGluZHgueCwgeTogdC55IC0gMS4wICogaW5keC55fTtcbiAgdmFyIHZhbD0ge3g6IE51bWJlci5OYU4sIHk6IE51bWJlci5OYU59O1xuICB2YXIgaW54O1xuICBpZiAoaW5keC54IDwgMCB8fCBpbmR4LnggPj0gY3QubGltWzBdKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuICBpZiAoaW5keC55IDwgMCB8fCBpbmR4LnkgPj0gY3QubGltWzFdKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuICBpbnggPSAoaW5keC55ICogY3QubGltWzBdKSArIGluZHgueDtcbiAgdmFyIGYwMCA9IHt4OiBjdC5jdnNbaW54XVswXSwgeTogY3QuY3ZzW2lueF1bMV19O1xuICBpbngrKztcbiAgdmFyIGYxMD0ge3g6IGN0LmN2c1tpbnhdWzBdLCB5OiBjdC5jdnNbaW54XVsxXX07XG4gIGlueCArPSBjdC5saW1bMF07XG4gIHZhciBmMTEgPSB7eDogY3QuY3ZzW2lueF1bMF0sIHk6IGN0LmN2c1tpbnhdWzFdfTtcbiAgaW54LS07XG4gIHZhciBmMDEgPSB7eDogY3QuY3ZzW2lueF1bMF0sIHk6IGN0LmN2c1tpbnhdWzFdfTtcbiAgdmFyIG0xMSA9IGZyY3QueCAqIGZyY3QueSwgbTEwID0gZnJjdC54ICogKDEuMCAtIGZyY3QueSksXG4gICAgbTAwID0gKDEuMCAtIGZyY3QueCkgKiAoMS4wIC0gZnJjdC55KSwgbTAxID0gKDEuMCAtIGZyY3QueCkgKiBmcmN0Lnk7XG4gIHZhbC54ID0gKG0wMCAqIGYwMC54ICsgbTEwICogZjEwLnggKyBtMDEgKiBmMDEueCArIG0xMSAqIGYxMS54KTtcbiAgdmFsLnkgPSAobTAwICogZjAwLnkgKyBtMTAgKiBmMTAueSArIG0wMSAqIGYwMS55ICsgbTExICogZjExLnkpO1xuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBhZGp1c3RfYXhpcyhjcnMsIGRlbm9ybSwgcG9pbnQpIHtcbiAgdmFyIHhpbiA9IHBvaW50LngsXG4gICAgeWluID0gcG9pbnQueSxcbiAgICB6aW4gPSBwb2ludC56IHx8IDAuMDtcbiAgdmFyIHYsIHQsIGk7XG4gIHZhciBvdXQgPSB7fTtcbiAgZm9yIChpID0gMDsgaSA8IDM7IGkrKykge1xuICAgIGlmIChkZW5vcm0gJiYgaSA9PT0gMiAmJiBwb2ludC56ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgdiA9IHhpbjtcbiAgICAgIGlmIChcImV3XCIuaW5kZXhPZihjcnMuYXhpc1tpXSkgIT09IC0xKSB7XG4gICAgICAgIHQgPSAneCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ID0gJ3knO1xuICAgICAgfVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGkgPT09IDEpIHtcbiAgICAgIHYgPSB5aW47XG4gICAgICBpZiAoXCJuc1wiLmluZGV4T2YoY3JzLmF4aXNbaV0pICE9PSAtMSkge1xuICAgICAgICB0ID0gJ3knO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdCA9ICd4JztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2ID0gemluO1xuICAgICAgdCA9ICd6JztcbiAgICB9XG4gICAgc3dpdGNoIChjcnMuYXhpc1tpXSkge1xuICAgIGNhc2UgJ2UnOlxuICAgICAgb3V0W3RdID0gdjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3cnOlxuICAgICAgb3V0W3RdID0gLXY7XG4gICAgICBicmVhaztcbiAgICBjYXNlICduJzpcbiAgICAgIG91dFt0XSA9IHY7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzJzpcbiAgICAgIG91dFt0XSA9IC12O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndSc6XG4gICAgICBpZiAocG9pbnRbdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXQueiA9IHY7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkJzpcbiAgICAgIGlmIChwb2ludFt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG91dC56ID0gLXY7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy9jb25zb2xlLmxvZyhcIkVSUk9SOiB1bmtub3cgYXhpcyAoXCIrY3JzLmF4aXNbaV0rXCIpIC0gY2hlY2sgZGVmaW5pdGlvbiBvZiBcIitjcnMucHJvak5hbWUpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGNvbW1vbiAoYXJyYXkpe1xuICB2YXIgb3V0ID0ge1xuICAgIHg6IGFycmF5WzBdLFxuICAgIHk6IGFycmF5WzFdXG4gIH07XG4gIGlmIChhcnJheS5sZW5ndGg+Mikge1xuICAgIG91dC56ID0gYXJyYXlbMl07XG4gIH1cbiAgaWYgKGFycmF5Lmxlbmd0aD4zKSB7XG4gICAgb3V0Lm0gPSBhcnJheVszXTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBjaGVja1Nhbml0eSAocG9pbnQpIHtcbiAgY2hlY2tDb29yZChwb2ludC54KTtcbiAgY2hlY2tDb29yZChwb2ludC55KTtcbn1cbmZ1bmN0aW9uIGNoZWNrQ29vcmQobnVtKSB7XG4gIGlmICh0eXBlb2YgTnVtYmVyLmlzRmluaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZShudW0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Nvb3JkaW5hdGVzIG11c3QgYmUgZmluaXRlIG51bWJlcnMnKTtcbiAgfVxuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicgfHwgbnVtICE9PSBudW0gfHwgIWlzRmluaXRlKG51bSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb29yZGluYXRlcyBtdXN0IGJlIGZpbml0ZSBudW1iZXJzJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tOb3RXR1Moc291cmNlLCBkZXN0KSB7XG4gIHJldHVybiAoXG4gICAgKHNvdXJjZS5kYXR1bS5kYXR1bV90eXBlID09PSBQSkRfM1BBUkFNIHx8IHNvdXJjZS5kYXR1bS5kYXR1bV90eXBlID09PSBQSkRfN1BBUkFNIHx8IHNvdXJjZS5kYXR1bS5kYXR1bV90eXBlID09PSBQSkRfR1JJRFNISUZUKSAmJiBkZXN0LmRhdHVtQ29kZSAhPT0gJ1dHUzg0JykgfHxcbiAgICAoKGRlc3QuZGF0dW0uZGF0dW1fdHlwZSA9PT0gUEpEXzNQQVJBTSB8fCBkZXN0LmRhdHVtLmRhdHVtX3R5cGUgPT09IFBKRF83UEFSQU0gfHwgZGVzdC5kYXR1bS5kYXR1bV90eXBlID09PSBQSkRfR1JJRFNISUZUKSAmJiBzb3VyY2UuZGF0dW1Db2RlICE9PSAnV0dTODQnKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtKHNvdXJjZSwgZGVzdCwgcG9pbnQsIGVuZm9yY2VBeGlzKSB7XG4gIHZhciB3Z3M4NDtcbiAgaWYgKEFycmF5LmlzQXJyYXkocG9pbnQpKSB7XG4gICAgcG9pbnQgPSBjb21tb24ocG9pbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIENsb25lIHRoZSBwb2ludCBvYmplY3Qgc28gaW5wdXRzIGRvbid0IGdldCBtb2RpZmllZFxuICAgIHBvaW50ID0ge1xuICAgICAgeDogcG9pbnQueCxcbiAgICAgIHk6IHBvaW50LnksXG4gICAgICB6OiBwb2ludC56LFxuICAgICAgbTogcG9pbnQubVxuICAgIH07XG4gIH1cbiAgdmFyIGhhc1ogPSBwb2ludC56ICE9PSB1bmRlZmluZWQ7XG4gIGNoZWNrU2FuaXR5KHBvaW50KTtcbiAgLy8gV29ya2Fyb3VuZCBmb3IgZGF0dW0gc2hpZnRzIHRvd2dzODQsIGlmIGVpdGhlciBzb3VyY2Ugb3IgZGVzdGluYXRpb24gcHJvamVjdGlvbiBpcyBub3Qgd2dzODRcbiAgaWYgKHNvdXJjZS5kYXR1bSAmJiBkZXN0LmRhdHVtICYmIGNoZWNrTm90V0dTKHNvdXJjZSwgZGVzdCkpIHtcbiAgICB3Z3M4NCA9IG5ldyBQcm9qZWN0aW9uKCdXR1M4NCcpO1xuICAgIHBvaW50ID0gdHJhbnNmb3JtKHNvdXJjZSwgd2dzODQsIHBvaW50LCBlbmZvcmNlQXhpcyk7XG4gICAgc291cmNlID0gd2dzODQ7XG4gIH1cbiAgLy8gREdSLCAyMDEwLzExLzEyXG4gIGlmIChlbmZvcmNlQXhpcyAmJiBzb3VyY2UuYXhpcyAhPT0gJ2VudScpIHtcbiAgICBwb2ludCA9IGFkanVzdF9heGlzKHNvdXJjZSwgZmFsc2UsIHBvaW50KTtcbiAgfVxuICAvLyBUcmFuc2Zvcm0gc291cmNlIHBvaW50cyB0byBsb25nL2xhdCwgaWYgdGhleSBhcmVuJ3QgYWxyZWFkeS5cbiAgaWYgKHNvdXJjZS5wcm9qTmFtZSA9PT0gJ2xvbmdsYXQnKSB7XG4gICAgcG9pbnQgPSB7XG4gICAgICB4OiBwb2ludC54ICogRDJSJDEsXG4gICAgICB5OiBwb2ludC55ICogRDJSJDEsXG4gICAgICB6OiBwb2ludC56IHx8IDBcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGlmIChzb3VyY2UudG9fbWV0ZXIpIHtcbiAgICAgIHBvaW50ID0ge1xuICAgICAgICB4OiBwb2ludC54ICogc291cmNlLnRvX21ldGVyLFxuICAgICAgICB5OiBwb2ludC55ICogc291cmNlLnRvX21ldGVyLFxuICAgICAgICB6OiBwb2ludC56IHx8IDBcbiAgICAgIH07XG4gICAgfVxuICAgIHBvaW50ID0gc291cmNlLmludmVyc2UocG9pbnQpOyAvLyBDb252ZXJ0IENhcnRlc2lhbiB0byBsb25nbGF0XG4gICAgaWYgKCFwb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICAvLyBBZGp1c3QgZm9yIHRoZSBwcmltZSBtZXJpZGlhbiBpZiBuZWNlc3NhcnlcbiAgaWYgKHNvdXJjZS5mcm9tX2dyZWVud2ljaCkge1xuICAgIHBvaW50LnggKz0gc291cmNlLmZyb21fZ3JlZW53aWNoO1xuICB9XG5cbiAgLy8gQ29udmVydCBkYXR1bXMgaWYgbmVlZGVkLCBhbmQgaWYgcG9zc2libGUuXG4gIHBvaW50ID0gZGF0dW1fdHJhbnNmb3JtKHNvdXJjZS5kYXR1bSwgZGVzdC5kYXR1bSwgcG9pbnQpO1xuICBpZiAoIXBvaW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQWRqdXN0IGZvciB0aGUgcHJpbWUgbWVyaWRpYW4gaWYgbmVjZXNzYXJ5XG4gIGlmIChkZXN0LmZyb21fZ3JlZW53aWNoKSB7XG4gICAgcG9pbnQgPSB7XG4gICAgICB4OiBwb2ludC54IC0gZGVzdC5mcm9tX2dyZWVud2ljaCxcbiAgICAgIHk6IHBvaW50LnksXG4gICAgICB6OiBwb2ludC56IHx8IDBcbiAgICB9O1xuICB9XG5cbiAgaWYgKGRlc3QucHJvak5hbWUgPT09ICdsb25nbGF0Jykge1xuICAgIC8vIGNvbnZlcnQgcmFkaWFucyB0byBkZWNpbWFsIGRlZ3JlZXNcbiAgICBwb2ludCA9IHtcbiAgICAgIHg6IHBvaW50LnggKiBSMkQsXG4gICAgICB5OiBwb2ludC55ICogUjJELFxuICAgICAgejogcG9pbnQueiB8fCAwXG4gICAgfTtcbiAgfSBlbHNlIHsgLy8gZWxzZSBwcm9qZWN0XG4gICAgcG9pbnQgPSBkZXN0LmZvcndhcmQocG9pbnQpO1xuICAgIGlmIChkZXN0LnRvX21ldGVyKSB7XG4gICAgICBwb2ludCA9IHtcbiAgICAgICAgeDogcG9pbnQueCAvIGRlc3QudG9fbWV0ZXIsXG4gICAgICAgIHk6IHBvaW50LnkgLyBkZXN0LnRvX21ldGVyLFxuICAgICAgICB6OiBwb2ludC56IHx8IDBcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gREdSLCAyMDEwLzExLzEyXG4gIGlmIChlbmZvcmNlQXhpcyAmJiBkZXN0LmF4aXMgIT09ICdlbnUnKSB7XG4gICAgcmV0dXJuIGFkanVzdF9heGlzKGRlc3QsIHRydWUsIHBvaW50KTtcbiAgfVxuXG4gIGlmIChwb2ludCAmJiAhaGFzWikge1xuICAgIGRlbGV0ZSBwb2ludC56O1xuICB9XG4gIHJldHVybiBwb2ludDtcbn1cblxudmFyIHdnczg0ID0gUHJvamVjdGlvbignV0dTODQnKTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtZXIoZnJvbSwgdG8sIGNvb3JkcywgZW5mb3JjZUF4aXMpIHtcbiAgdmFyIHRyYW5zZm9ybWVkQXJyYXksIG91dCwga2V5cztcbiAgaWYgKEFycmF5LmlzQXJyYXkoY29vcmRzKSkge1xuICAgIHRyYW5zZm9ybWVkQXJyYXkgPSB0cmFuc2Zvcm0oZnJvbSwgdG8sIGNvb3JkcywgZW5mb3JjZUF4aXMpIHx8IHt4OiBOYU4sIHk6IE5hTn07XG4gICAgaWYgKGNvb3Jkcy5sZW5ndGggPiAyKSB7XG4gICAgICBpZiAoKHR5cGVvZiBmcm9tLm5hbWUgIT09ICd1bmRlZmluZWQnICYmIGZyb20ubmFtZSA9PT0gJ2dlb2NlbnQnKSB8fCAodHlwZW9mIHRvLm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHRvLm5hbWUgPT09ICdnZW9jZW50JykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0cmFuc2Zvcm1lZEFycmF5LnogPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgcmV0dXJuIFt0cmFuc2Zvcm1lZEFycmF5LngsIHRyYW5zZm9ybWVkQXJyYXkueSwgdHJhbnNmb3JtZWRBcnJheS56XS5jb25jYXQoY29vcmRzLnNwbGljZSgzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFt0cmFuc2Zvcm1lZEFycmF5LngsIHRyYW5zZm9ybWVkQXJyYXkueSwgY29vcmRzWzJdXS5jb25jYXQoY29vcmRzLnNwbGljZSgzKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbdHJhbnNmb3JtZWRBcnJheS54LCB0cmFuc2Zvcm1lZEFycmF5LnldLmNvbmNhdChjb29yZHMuc3BsaWNlKDIpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0cmFuc2Zvcm1lZEFycmF5LngsIHRyYW5zZm9ybWVkQXJyYXkueV07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG91dCA9IHRyYW5zZm9ybShmcm9tLCB0bywgY29vcmRzLCBlbmZvcmNlQXhpcyk7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKGNvb3Jkcyk7XG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCh0eXBlb2YgZnJvbS5uYW1lICE9PSAndW5kZWZpbmVkJyAmJiBmcm9tLm5hbWUgPT09ICdnZW9jZW50JykgfHwgKHR5cGVvZiB0by5uYW1lICE9PSAndW5kZWZpbmVkJyAmJiB0by5uYW1lID09PSAnZ2VvY2VudCcpKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICd4JyB8fCBrZXkgPT09ICd5JyB8fCBrZXkgPT09ICd6Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3gnIHx8IGtleSA9PT0gJ3knKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvdXRba2V5XSA9IGNvb3Jkc1trZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm9qKGl0ZW0pIHtcbiAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9qZWN0aW9uKSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgaWYgKGl0ZW0ub1Byb2opIHtcbiAgICByZXR1cm4gaXRlbS5vUHJvajtcbiAgfVxuICByZXR1cm4gUHJvamVjdGlvbihpdGVtKTtcbn1cblxuZnVuY3Rpb24gcHJvajQoZnJvbVByb2osIHRvUHJvaiwgY29vcmQpIHtcbiAgZnJvbVByb2ogPSBjaGVja1Byb2ooZnJvbVByb2opO1xuICB2YXIgc2luZ2xlID0gZmFsc2U7XG4gIHZhciBvYmo7XG4gIGlmICh0eXBlb2YgdG9Qcm9qID09PSAndW5kZWZpbmVkJykge1xuICAgIHRvUHJvaiA9IGZyb21Qcm9qO1xuICAgIGZyb21Qcm9qID0gd2dzODQ7XG4gICAgc2luZ2xlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdG9Qcm9qLnggIT09ICd1bmRlZmluZWQnIHx8IEFycmF5LmlzQXJyYXkodG9Qcm9qKSkge1xuICAgIGNvb3JkID0gdG9Qcm9qO1xuICAgIHRvUHJvaiA9IGZyb21Qcm9qO1xuICAgIGZyb21Qcm9qID0gd2dzODQ7XG4gICAgc2luZ2xlID0gdHJ1ZTtcbiAgfVxuICB0b1Byb2ogPSBjaGVja1Byb2oodG9Qcm9qKTtcbiAgaWYgKGNvb3JkKSB7XG4gICAgcmV0dXJuIHRyYW5zZm9ybWVyKGZyb21Qcm9qLCB0b1Byb2osIGNvb3JkKTtcbiAgfSBlbHNlIHtcbiAgICBvYmogPSB7XG4gICAgICBmb3J3YXJkOiBmdW5jdGlvbiAoY29vcmRzLCBlbmZvcmNlQXhpcykge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIoZnJvbVByb2osIHRvUHJvaiwgY29vcmRzLCBlbmZvcmNlQXhpcyk7XG4gICAgICB9LFxuICAgICAgaW52ZXJzZTogZnVuY3Rpb24gKGNvb3JkcywgZW5mb3JjZUF4aXMpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyKHRvUHJvaiwgZnJvbVByb2osIGNvb3JkcywgZW5mb3JjZUF4aXMpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHNpbmdsZSkge1xuICAgICAgb2JqLm9Qcm9qID0gdG9Qcm9qO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbi8qKlxuICogVVRNIHpvbmVzIGFyZSBncm91cGVkLCBhbmQgYXNzaWduZWQgdG8gb25lIG9mIGEgZ3JvdXAgb2YgNlxuICogc2V0cy5cbiAqXG4gKiB7aW50fSBAcHJpdmF0ZVxuICovXG52YXIgTlVNXzEwMEtfU0VUUyA9IDY7XG5cbi8qKlxuICogVGhlIGNvbHVtbiBsZXR0ZXJzIChmb3IgZWFzdGluZykgb2YgdGhlIGxvd2VyIGxlZnQgdmFsdWUsIHBlclxuICogc2V0LlxuICpcbiAqIHtzdHJpbmd9IEBwcml2YXRlXG4gKi9cbnZhciBTRVRfT1JJR0lOX0NPTFVNTl9MRVRURVJTID0gJ0FKU0FKUyc7XG5cbi8qKlxuICogVGhlIHJvdyBsZXR0ZXJzIChmb3Igbm9ydGhpbmcpIG9mIHRoZSBsb3dlciBsZWZ0IHZhbHVlLCBwZXJcbiAqIHNldC5cbiAqXG4gKiB7c3RyaW5nfSBAcHJpdmF0ZVxuICovXG52YXIgU0VUX09SSUdJTl9ST1dfTEVUVEVSUyA9ICdBRkFGQUYnO1xuXG52YXIgQSQxID0gNjU7IC8vIEFcbnZhciBJID0gNzM7IC8vIElcbnZhciBPID0gNzk7IC8vIE9cbnZhciBWID0gODY7IC8vIFZcbnZhciBaID0gOTA7IC8vIFpcbnZhciBtZ3JzID0ge1xuICBmb3J3YXJkOiBmb3J3YXJkJHQsXG4gIGludmVyc2U6IGludmVyc2UkdCxcbiAgdG9Qb2ludDogdG9Qb2ludFxufTtcbi8qKlxuICogQ29udmVyc2lvbiBvZiBsYXQvbG9uIHRvIE1HUlMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGxsIE9iamVjdCBsaXRlcmFsIHdpdGggbGF0IGFuZCBsb24gcHJvcGVydGllcyBvbiBhXG4gKiAgICAgV0dTODQgZWxsaXBzb2lkLlxuICogQHBhcmFtIHtpbnR9IGFjY3VyYWN5IEFjY3VyYWN5IGluIGRpZ2l0cyAoNSBmb3IgMSBtLCA0IGZvciAxMCBtLCAzIGZvclxuICogICAgICAxMDAgbSwgMiBmb3IgMTAwMCBtIG9yIDEgZm9yIDEwMDAwIG0pLiBPcHRpb25hbCwgZGVmYXVsdCBpcyA1LlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgTUdSUyBzdHJpbmcgZm9yIHRoZSBnaXZlbiBsb2NhdGlvbiBhbmQgYWNjdXJhY3kuXG4gKi9cbmZ1bmN0aW9uIGZvcndhcmQkdChsbCwgYWNjdXJhY3kpIHtcbiAgYWNjdXJhY3kgPSBhY2N1cmFjeSB8fCA1OyAvLyBkZWZhdWx0IGFjY3VyYWN5IDFtXG4gIHJldHVybiBlbmNvZGUoTEx0b1VUTSh7XG4gICAgbGF0OiBsbFsxXSxcbiAgICBsb246IGxsWzBdXG4gIH0pLCBhY2N1cmFjeSk7XG59XG4vKipcbiAqIENvbnZlcnNpb24gb2YgTUdSUyB0byBsYXQvbG9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZ3JzIE1HUlMgc3RyaW5nLlxuICogQHJldHVybiB7YXJyYXl9IEFuIGFycmF5IHdpdGggbGVmdCAobG9uZ2l0dWRlKSwgYm90dG9tIChsYXRpdHVkZSksIHJpZ2h0XG4gKiAgICAgKGxvbmdpdHVkZSkgYW5kIHRvcCAobGF0aXR1ZGUpIHZhbHVlcyBpbiBXR1M4NCwgcmVwcmVzZW50aW5nIHRoZVxuICogICAgIGJvdW5kaW5nIGJveCBmb3IgdGhlIHByb3ZpZGVkIE1HUlMgcmVmZXJlbmNlLlxuICovXG5mdW5jdGlvbiBpbnZlcnNlJHQobWdycykge1xuICB2YXIgYmJveCA9IFVUTXRvTEwoZGVjb2RlKG1ncnMudG9VcHBlckNhc2UoKSkpO1xuICBpZiAoYmJveC5sYXQgJiYgYmJveC5sb24pIHtcbiAgICByZXR1cm4gW2Jib3gubG9uLCBiYm94LmxhdCwgYmJveC5sb24sIGJib3gubGF0XTtcbiAgfVxuICByZXR1cm4gW2Jib3gubGVmdCwgYmJveC5ib3R0b20sIGJib3gucmlnaHQsIGJib3gudG9wXTtcbn1cbmZ1bmN0aW9uIHRvUG9pbnQobWdycykge1xuICB2YXIgYmJveCA9IFVUTXRvTEwoZGVjb2RlKG1ncnMudG9VcHBlckNhc2UoKSkpO1xuICBpZiAoYmJveC5sYXQgJiYgYmJveC5sb24pIHtcbiAgICByZXR1cm4gW2Jib3gubG9uLCBiYm94LmxhdF07XG4gIH1cbiAgcmV0dXJuIFsoYmJveC5sZWZ0ICsgYmJveC5yaWdodCkgLyAyLCAoYmJveC50b3AgKyBiYm94LmJvdHRvbSkgLyAyXTtcbn0vKipcbiAqIENvbnZlcnNpb24gZnJvbSBkZWdyZWVzIHRvIHJhZGlhbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgdGhlIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBhbmdsZSBpbiByYWRpYW5zLlxuICovXG5mdW5jdGlvbiBkZWdUb1JhZChkZWcpIHtcbiAgcmV0dXJuIChkZWcgKiAoTWF0aC5QSSAvIDE4MC4wKSk7XG59XG5cbi8qKlxuICogQ29udmVyc2lvbiBmcm9tIHJhZGlhbnMgdG8gZGVncmVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHJhZCB0aGUgYW5nbGUgaW4gcmFkaWFucy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIGFuZ2xlIGluIGRlZ3JlZXMuXG4gKi9cbmZ1bmN0aW9uIHJhZFRvRGVnKHJhZCkge1xuICByZXR1cm4gKDE4MC4wICogKHJhZCAvIE1hdGguUEkpKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHNldCBvZiBMb25naXR1ZGUgYW5kIExhdGl0dWRlIGNvLW9yZGluYXRlcyB0byBVVE1cbiAqIHVzaW5nIHRoZSBXR1M4NCBlbGxpcHNvaWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBsbCBPYmplY3QgbGl0ZXJhbCB3aXRoIGxhdCBhbmQgbG9uIHByb3BlcnRpZXNcbiAqICAgICByZXByZXNlbnRpbmcgdGhlIFdHUzg0IGNvb3JkaW5hdGUgdG8gYmUgY29udmVydGVkLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgbGl0ZXJhbCBjb250YWluaW5nIHRoZSBVVE0gdmFsdWUgd2l0aCBlYXN0aW5nLFxuICogICAgIG5vcnRoaW5nLCB6b25lTnVtYmVyIGFuZCB6b25lTGV0dGVyIHByb3BlcnRpZXMsIGFuZCBhbiBvcHRpb25hbFxuICogICAgIGFjY3VyYWN5IHByb3BlcnR5IGluIGRpZ2l0cy4gUmV0dXJucyBudWxsIGlmIHRoZSBjb252ZXJzaW9uIGZhaWxlZC5cbiAqL1xuZnVuY3Rpb24gTEx0b1VUTShsbCkge1xuICB2YXIgTGF0ID0gbGwubGF0O1xuICB2YXIgTG9uZyA9IGxsLmxvbjtcbiAgdmFyIGEgPSA2Mzc4MTM3LjA7IC8vZWxsaXAucmFkaXVzO1xuICB2YXIgZWNjU3F1YXJlZCA9IDAuMDA2Njk0Mzg7IC8vZWxsaXAuZWNjc3E7XG4gIHZhciBrMCA9IDAuOTk5NjtcbiAgdmFyIExvbmdPcmlnaW47XG4gIHZhciBlY2NQcmltZVNxdWFyZWQ7XG4gIHZhciBOLCBULCBDLCBBLCBNO1xuICB2YXIgTGF0UmFkID0gZGVnVG9SYWQoTGF0KTtcbiAgdmFyIExvbmdSYWQgPSBkZWdUb1JhZChMb25nKTtcbiAgdmFyIExvbmdPcmlnaW5SYWQ7XG4gIHZhciBab25lTnVtYmVyO1xuICAvLyAoaW50KVxuICBab25lTnVtYmVyID0gTWF0aC5mbG9vcigoTG9uZyArIDE4MCkgLyA2KSArIDE7XG5cbiAgLy9NYWtlIHN1cmUgdGhlIGxvbmdpdHVkZSAxODAuMDAgaXMgaW4gWm9uZSA2MFxuICBpZiAoTG9uZyA9PT0gMTgwKSB7XG4gICAgWm9uZU51bWJlciA9IDYwO1xuICB9XG5cbiAgLy8gU3BlY2lhbCB6b25lIGZvciBOb3J3YXlcbiAgaWYgKExhdCA+PSA1Ni4wICYmIExhdCA8IDY0LjAgJiYgTG9uZyA+PSAzLjAgJiYgTG9uZyA8IDEyLjApIHtcbiAgICBab25lTnVtYmVyID0gMzI7XG4gIH1cblxuICAvLyBTcGVjaWFsIHpvbmVzIGZvciBTdmFsYmFyZFxuICBpZiAoTGF0ID49IDcyLjAgJiYgTGF0IDwgODQuMCkge1xuICAgIGlmIChMb25nID49IDAuMCAmJiBMb25nIDwgOS4wKSB7XG4gICAgICBab25lTnVtYmVyID0gMzE7XG4gICAgfVxuICAgIGVsc2UgaWYgKExvbmcgPj0gOS4wICYmIExvbmcgPCAyMS4wKSB7XG4gICAgICBab25lTnVtYmVyID0gMzM7XG4gICAgfVxuICAgIGVsc2UgaWYgKExvbmcgPj0gMjEuMCAmJiBMb25nIDwgMzMuMCkge1xuICAgICAgWm9uZU51bWJlciA9IDM1O1xuICAgIH1cbiAgICBlbHNlIGlmIChMb25nID49IDMzLjAgJiYgTG9uZyA8IDQyLjApIHtcbiAgICAgIFpvbmVOdW1iZXIgPSAzNztcbiAgICB9XG4gIH1cblxuICBMb25nT3JpZ2luID0gKFpvbmVOdW1iZXIgLSAxKSAqIDYgLSAxODAgKyAzOyAvLyszIHB1dHMgb3JpZ2luXG4gIC8vIGluIG1pZGRsZSBvZlxuICAvLyB6b25lXG4gIExvbmdPcmlnaW5SYWQgPSBkZWdUb1JhZChMb25nT3JpZ2luKTtcblxuICBlY2NQcmltZVNxdWFyZWQgPSAoZWNjU3F1YXJlZCkgLyAoMSAtIGVjY1NxdWFyZWQpO1xuXG4gIE4gPSBhIC8gTWF0aC5zcXJ0KDEgLSBlY2NTcXVhcmVkICogTWF0aC5zaW4oTGF0UmFkKSAqIE1hdGguc2luKExhdFJhZCkpO1xuICBUID0gTWF0aC50YW4oTGF0UmFkKSAqIE1hdGgudGFuKExhdFJhZCk7XG4gIEMgPSBlY2NQcmltZVNxdWFyZWQgKiBNYXRoLmNvcyhMYXRSYWQpICogTWF0aC5jb3MoTGF0UmFkKTtcbiAgQSA9IE1hdGguY29zKExhdFJhZCkgKiAoTG9uZ1JhZCAtIExvbmdPcmlnaW5SYWQpO1xuXG4gIE0gPSBhICogKCgxIC0gZWNjU3F1YXJlZCAvIDQgLSAzICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyA2NCAtIDUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAyNTYpICogTGF0UmFkIC0gKDMgKiBlY2NTcXVhcmVkIC8gOCArIDMgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDMyICsgNDUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAxMDI0KSAqIE1hdGguc2luKDIgKiBMYXRSYWQpICsgKDE1ICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAyNTYgKyA0NSAqIGVjY1NxdWFyZWQgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAvIDEwMjQpICogTWF0aC5zaW4oNCAqIExhdFJhZCkgLSAoMzUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAzMDcyKSAqIE1hdGguc2luKDYgKiBMYXRSYWQpKTtcblxuICB2YXIgVVRNRWFzdGluZyA9IChrMCAqIE4gKiAoQSArICgxIC0gVCArIEMpICogQSAqIEEgKiBBIC8gNi4wICsgKDUgLSAxOCAqIFQgKyBUICogVCArIDcyICogQyAtIDU4ICogZWNjUHJpbWVTcXVhcmVkKSAqIEEgKiBBICogQSAqIEEgKiBBIC8gMTIwLjApICsgNTAwMDAwLjApO1xuXG4gIHZhciBVVE1Ob3J0aGluZyA9IChrMCAqIChNICsgTiAqIE1hdGgudGFuKExhdFJhZCkgKiAoQSAqIEEgLyAyICsgKDUgLSBUICsgOSAqIEMgKyA0ICogQyAqIEMpICogQSAqIEEgKiBBICogQSAvIDI0LjAgKyAoNjEgLSA1OCAqIFQgKyBUICogVCArIDYwMCAqIEMgLSAzMzAgKiBlY2NQcmltZVNxdWFyZWQpICogQSAqIEEgKiBBICogQSAqIEEgKiBBIC8gNzIwLjApKSk7XG4gIGlmIChMYXQgPCAwLjApIHtcbiAgICBVVE1Ob3J0aGluZyArPSAxMDAwMDAwMC4wOyAvLzEwMDAwMDAwIG1ldGVyIG9mZnNldCBmb3JcbiAgICAvLyBzb3V0aGVybiBoZW1pc3BoZXJlXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5vcnRoaW5nOiBNYXRoLnJvdW5kKFVUTU5vcnRoaW5nKSxcbiAgICBlYXN0aW5nOiBNYXRoLnJvdW5kKFVUTUVhc3RpbmcpLFxuICAgIHpvbmVOdW1iZXI6IFpvbmVOdW1iZXIsXG4gICAgem9uZUxldHRlcjogZ2V0TGV0dGVyRGVzaWduYXRvcihMYXQpXG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgVVRNIGNvb3JkcyB0byBsYXQvbG9uZywgdXNpbmcgdGhlIFdHUzg0IGVsbGlwc29pZC4gVGhpcyBpcyBhIGNvbnZlbmllbmNlXG4gKiBjbGFzcyB3aGVyZSB0aGUgWm9uZSBjYW4gYmUgc3BlY2lmaWVkIGFzIGEgc2luZ2xlIHN0cmluZyBlZy5cIjYwTlwiIHdoaWNoXG4gKiBpcyB0aGVuIGJyb2tlbiBkb3duIGludG8gdGhlIFpvbmVOdW1iZXIgYW5kIFpvbmVMZXR0ZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB1dG0gQW4gb2JqZWN0IGxpdGVyYWwgd2l0aCBub3J0aGluZywgZWFzdGluZywgem9uZU51bWJlclxuICogICAgIGFuZCB6b25lTGV0dGVyIHByb3BlcnRpZXMuIElmIGFuIG9wdGlvbmFsIGFjY3VyYWN5IHByb3BlcnR5IGlzXG4gKiAgICAgcHJvdmlkZWQgKGluIG1ldGVycyksIGEgYm91bmRpbmcgYm94IHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZlxuICogICAgIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUuXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFuIG9iamVjdCBsaXRlcmFsIGNvbnRhaW5pbmcgZWl0aGVyIGxhdCBhbmQgbG9uIHZhbHVlc1xuICogICAgIChpZiBubyBhY2N1cmFjeSB3YXMgcHJvdmlkZWQpLCBvciB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQgdmFsdWVzXG4gKiAgICAgZm9yIHRoZSBib3VuZGluZyBib3ggY2FsY3VsYXRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIGFjY3VyYWN5LlxuICogICAgIFJldHVybnMgbnVsbCBpZiB0aGUgY29udmVyc2lvbiBmYWlsZWQuXG4gKi9cbmZ1bmN0aW9uIFVUTXRvTEwodXRtKSB7XG5cbiAgdmFyIFVUTU5vcnRoaW5nID0gdXRtLm5vcnRoaW5nO1xuICB2YXIgVVRNRWFzdGluZyA9IHV0bS5lYXN0aW5nO1xuICB2YXIgem9uZUxldHRlciA9IHV0bS56b25lTGV0dGVyO1xuICB2YXIgem9uZU51bWJlciA9IHV0bS56b25lTnVtYmVyO1xuICAvLyBjaGVjayB0aGUgWm9uZU51bW1iZXIgaXMgdmFsaWRcbiAgaWYgKHpvbmVOdW1iZXIgPCAwIHx8IHpvbmVOdW1iZXIgPiA2MCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIGswID0gMC45OTk2O1xuICB2YXIgYSA9IDYzNzgxMzcuMDsgLy9lbGxpcC5yYWRpdXM7XG4gIHZhciBlY2NTcXVhcmVkID0gMC4wMDY2OTQzODsgLy9lbGxpcC5lY2NzcTtcbiAgdmFyIGVjY1ByaW1lU3F1YXJlZDtcbiAgdmFyIGUxID0gKDEgLSBNYXRoLnNxcnQoMSAtIGVjY1NxdWFyZWQpKSAvICgxICsgTWF0aC5zcXJ0KDEgLSBlY2NTcXVhcmVkKSk7XG4gIHZhciBOMSwgVDEsIEMxLCBSMSwgRCwgTTtcbiAgdmFyIExvbmdPcmlnaW47XG4gIHZhciBtdSwgcGhpMVJhZDtcblxuICAvLyByZW1vdmUgNTAwLDAwMCBtZXRlciBvZmZzZXQgZm9yIGxvbmdpdHVkZVxuICB2YXIgeCA9IFVUTUVhc3RpbmcgLSA1MDAwMDAuMDtcbiAgdmFyIHkgPSBVVE1Ob3J0aGluZztcblxuICAvLyBXZSBtdXN0IGtub3cgc29tZWhvdyBpZiB3ZSBhcmUgaW4gdGhlIE5vcnRoZXJuIG9yIFNvdXRoZXJuXG4gIC8vIGhlbWlzcGhlcmUsIHRoaXMgaXMgdGhlIG9ubHkgdGltZSB3ZSB1c2UgdGhlIGxldHRlciBTbyBldmVuXG4gIC8vIGlmIHRoZSBab25lIGxldHRlciBpc24ndCBleGFjdGx5IGNvcnJlY3QgaXQgc2hvdWxkIGluZGljYXRlXG4gIC8vIHRoZSBoZW1pc3BoZXJlIGNvcnJlY3RseVxuICBpZiAoem9uZUxldHRlciA8ICdOJykge1xuICAgIHkgLT0gMTAwMDAwMDAuMDsgLy8gcmVtb3ZlIDEwLDAwMCwwMDAgbWV0ZXIgb2Zmc2V0IHVzZWRcbiAgICAvLyBmb3Igc291dGhlcm4gaGVtaXNwaGVyZVxuICB9XG5cbiAgLy8gVGhlcmUgYXJlIDYwIHpvbmVzIHdpdGggem9uZSAxIGJlaW5nIGF0IFdlc3QgLTE4MCB0byAtMTc0XG4gIExvbmdPcmlnaW4gPSAoem9uZU51bWJlciAtIDEpICogNiAtIDE4MCArIDM7IC8vICszIHB1dHMgb3JpZ2luXG4gIC8vIGluIG1pZGRsZSBvZlxuICAvLyB6b25lXG5cbiAgZWNjUHJpbWVTcXVhcmVkID0gKGVjY1NxdWFyZWQpIC8gKDEgLSBlY2NTcXVhcmVkKTtcblxuICBNID0geSAvIGswO1xuICBtdSA9IE0gLyAoYSAqICgxIC0gZWNjU3F1YXJlZCAvIDQgLSAzICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyA2NCAtIDUgKiBlY2NTcXVhcmVkICogZWNjU3F1YXJlZCAqIGVjY1NxdWFyZWQgLyAyNTYpKTtcblxuICBwaGkxUmFkID0gbXUgKyAoMyAqIGUxIC8gMiAtIDI3ICogZTEgKiBlMSAqIGUxIC8gMzIpICogTWF0aC5zaW4oMiAqIG11KSArICgyMSAqIGUxICogZTEgLyAxNiAtIDU1ICogZTEgKiBlMSAqIGUxICogZTEgLyAzMikgKiBNYXRoLnNpbig0ICogbXUpICsgKDE1MSAqIGUxICogZTEgKiBlMSAvIDk2KSAqIE1hdGguc2luKDYgKiBtdSk7XG4gIC8vIGRvdWJsZSBwaGkxID0gUHJvak1hdGgucmFkVG9EZWcocGhpMVJhZCk7XG5cbiAgTjEgPSBhIC8gTWF0aC5zcXJ0KDEgLSBlY2NTcXVhcmVkICogTWF0aC5zaW4ocGhpMVJhZCkgKiBNYXRoLnNpbihwaGkxUmFkKSk7XG4gIFQxID0gTWF0aC50YW4ocGhpMVJhZCkgKiBNYXRoLnRhbihwaGkxUmFkKTtcbiAgQzEgPSBlY2NQcmltZVNxdWFyZWQgKiBNYXRoLmNvcyhwaGkxUmFkKSAqIE1hdGguY29zKHBoaTFSYWQpO1xuICBSMSA9IGEgKiAoMSAtIGVjY1NxdWFyZWQpIC8gTWF0aC5wb3coMSAtIGVjY1NxdWFyZWQgKiBNYXRoLnNpbihwaGkxUmFkKSAqIE1hdGguc2luKHBoaTFSYWQpLCAxLjUpO1xuICBEID0geCAvIChOMSAqIGswKTtcblxuICB2YXIgbGF0ID0gcGhpMVJhZCAtIChOMSAqIE1hdGgudGFuKHBoaTFSYWQpIC8gUjEpICogKEQgKiBEIC8gMiAtICg1ICsgMyAqIFQxICsgMTAgKiBDMSAtIDQgKiBDMSAqIEMxIC0gOSAqIGVjY1ByaW1lU3F1YXJlZCkgKiBEICogRCAqIEQgKiBEIC8gMjQgKyAoNjEgKyA5MCAqIFQxICsgMjk4ICogQzEgKyA0NSAqIFQxICogVDEgLSAyNTIgKiBlY2NQcmltZVNxdWFyZWQgLSAzICogQzEgKiBDMSkgKiBEICogRCAqIEQgKiBEICogRCAqIEQgLyA3MjApO1xuICBsYXQgPSByYWRUb0RlZyhsYXQpO1xuXG4gIHZhciBsb24gPSAoRCAtICgxICsgMiAqIFQxICsgQzEpICogRCAqIEQgKiBEIC8gNiArICg1IC0gMiAqIEMxICsgMjggKiBUMSAtIDMgKiBDMSAqIEMxICsgOCAqIGVjY1ByaW1lU3F1YXJlZCArIDI0ICogVDEgKiBUMSkgKiBEICogRCAqIEQgKiBEICogRCAvIDEyMCkgLyBNYXRoLmNvcyhwaGkxUmFkKTtcbiAgbG9uID0gTG9uZ09yaWdpbiArIHJhZFRvRGVnKGxvbik7XG5cbiAgdmFyIHJlc3VsdDtcbiAgaWYgKHV0bS5hY2N1cmFjeSkge1xuICAgIHZhciB0b3BSaWdodCA9IFVUTXRvTEwoe1xuICAgICAgbm9ydGhpbmc6IHV0bS5ub3J0aGluZyArIHV0bS5hY2N1cmFjeSxcbiAgICAgIGVhc3Rpbmc6IHV0bS5lYXN0aW5nICsgdXRtLmFjY3VyYWN5LFxuICAgICAgem9uZUxldHRlcjogdXRtLnpvbmVMZXR0ZXIsXG4gICAgICB6b25lTnVtYmVyOiB1dG0uem9uZU51bWJlclxuICAgIH0pO1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIHRvcDogdG9wUmlnaHQubGF0LFxuICAgICAgcmlnaHQ6IHRvcFJpZ2h0LmxvbixcbiAgICAgIGJvdHRvbTogbGF0LFxuICAgICAgbGVmdDogbG9uXG4gICAgfTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSB7XG4gICAgICBsYXQ6IGxhdCxcbiAgICAgIGxvbjogbG9uXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIE1HUlMgbGV0dGVyIGRlc2lnbmF0b3IgZm9yIHRoZSBnaXZlbiBsYXRpdHVkZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGxhdCBUaGUgbGF0aXR1ZGUgaW4gV0dTODQgdG8gZ2V0IHRoZSBsZXR0ZXIgZGVzaWduYXRvclxuICogICAgIGZvci5cbiAqIEByZXR1cm4ge2NoYXJ9IFRoZSBsZXR0ZXIgZGVzaWduYXRvci5cbiAqL1xuZnVuY3Rpb24gZ2V0TGV0dGVyRGVzaWduYXRvcihsYXQpIHtcbiAgLy9UaGlzIGlzIGhlcmUgYXMgYW4gZXJyb3IgZmxhZyB0byBzaG93IHRoYXQgdGhlIExhdGl0dWRlIGlzXG4gIC8vb3V0c2lkZSBNR1JTIGxpbWl0c1xuICB2YXIgTGV0dGVyRGVzaWduYXRvciA9ICdaJztcblxuICBpZiAoKDg0ID49IGxhdCkgJiYgKGxhdCA+PSA3MikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1gnO1xuICB9XG4gIGVsc2UgaWYgKCg3MiA+IGxhdCkgJiYgKGxhdCA+PSA2NCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1cnO1xuICB9XG4gIGVsc2UgaWYgKCg2NCA+IGxhdCkgJiYgKGxhdCA+PSA1NikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1YnO1xuICB9XG4gIGVsc2UgaWYgKCg1NiA+IGxhdCkgJiYgKGxhdCA+PSA0OCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1UnO1xuICB9XG4gIGVsc2UgaWYgKCg0OCA+IGxhdCkgJiYgKGxhdCA+PSA0MCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1QnO1xuICB9XG4gIGVsc2UgaWYgKCg0MCA+IGxhdCkgJiYgKGxhdCA+PSAzMikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1MnO1xuICB9XG4gIGVsc2UgaWYgKCgzMiA+IGxhdCkgJiYgKGxhdCA+PSAyNCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1InO1xuICB9XG4gIGVsc2UgaWYgKCgyNCA+IGxhdCkgJiYgKGxhdCA+PSAxNikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ1EnO1xuICB9XG4gIGVsc2UgaWYgKCgxNiA+IGxhdCkgJiYgKGxhdCA+PSA4KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnUCc7XG4gIH1cbiAgZWxzZSBpZiAoKDggPiBsYXQpICYmIChsYXQgPj0gMCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ04nO1xuICB9XG4gIGVsc2UgaWYgKCgwID4gbGF0KSAmJiAobGF0ID49IC04KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnTSc7XG4gIH1cbiAgZWxzZSBpZiAoKC04ID4gbGF0KSAmJiAobGF0ID49IC0xNikpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0wnO1xuICB9XG4gIGVsc2UgaWYgKCgtMTYgPiBsYXQpICYmIChsYXQgPj0gLTI0KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnSyc7XG4gIH1cbiAgZWxzZSBpZiAoKC0yNCA+IGxhdCkgJiYgKGxhdCA+PSAtMzIpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdKJztcbiAgfVxuICBlbHNlIGlmICgoLTMyID4gbGF0KSAmJiAobGF0ID49IC00MCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0gnO1xuICB9XG4gIGVsc2UgaWYgKCgtNDAgPiBsYXQpICYmIChsYXQgPj0gLTQ4KSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnRyc7XG4gIH1cbiAgZWxzZSBpZiAoKC00OCA+IGxhdCkgJiYgKGxhdCA+PSAtNTYpKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdGJztcbiAgfVxuICBlbHNlIGlmICgoLTU2ID4gbGF0KSAmJiAobGF0ID49IC02NCkpIHtcbiAgICBMZXR0ZXJEZXNpZ25hdG9yID0gJ0UnO1xuICB9XG4gIGVsc2UgaWYgKCgtNjQgPiBsYXQpICYmIChsYXQgPj0gLTcyKSkge1xuICAgIExldHRlckRlc2lnbmF0b3IgPSAnRCc7XG4gIH1cbiAgZWxzZSBpZiAoKC03MiA+IGxhdCkgJiYgKGxhdCA+PSAtODApKSB7XG4gICAgTGV0dGVyRGVzaWduYXRvciA9ICdDJztcbiAgfVxuICByZXR1cm4gTGV0dGVyRGVzaWduYXRvcjtcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgVVRNIGxvY2F0aW9uIGFzIE1HUlMgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gdXRtIEFuIG9iamVjdCBsaXRlcmFsIHdpdGggZWFzdGluZywgbm9ydGhpbmcsXG4gKiAgICAgem9uZUxldHRlciwgem9uZU51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGFjY3VyYWN5IEFjY3VyYWN5IGluIGRpZ2l0cyAoMS01KS5cbiAqIEByZXR1cm4ge3N0cmluZ30gTUdSUyBzdHJpbmcgZm9yIHRoZSBnaXZlbiBVVE0gbG9jYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh1dG0sIGFjY3VyYWN5KSB7XG4gIC8vIHByZXBlbmQgd2l0aCBsZWFkaW5nIHplcm9lc1xuICB2YXIgc2Vhc3RpbmcgPSBcIjAwMDAwXCIgKyB1dG0uZWFzdGluZyxcbiAgICBzbm9ydGhpbmcgPSBcIjAwMDAwXCIgKyB1dG0ubm9ydGhpbmc7XG5cbiAgcmV0dXJuIHV0bS56b25lTnVtYmVyICsgdXRtLnpvbmVMZXR0ZXIgKyBnZXQxMDBrSUQodXRtLmVhc3RpbmcsIHV0bS5ub3J0aGluZywgdXRtLnpvbmVOdW1iZXIpICsgc2Vhc3Rpbmcuc3Vic3RyKHNlYXN0aW5nLmxlbmd0aCAtIDUsIGFjY3VyYWN5KSArIHNub3J0aGluZy5zdWJzdHIoc25vcnRoaW5nLmxlbmd0aCAtIDUsIGFjY3VyYWN5KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHR3byBsZXR0ZXIgMTAwayBkZXNpZ25hdG9yIGZvciBhIGdpdmVuIFVUTSBlYXN0aW5nLFxuICogbm9ydGhpbmcgYW5kIHpvbmUgbnVtYmVyIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gZWFzdGluZ1xuICogQHBhcmFtIHtudW1iZXJ9IG5vcnRoaW5nXG4gKiBAcGFyYW0ge251bWJlcn0gem9uZU51bWJlclxuICogQHJldHVybiB0aGUgdHdvIGxldHRlciAxMDBrIGRlc2lnbmF0b3IgZm9yIHRoZSBnaXZlbiBVVE0gbG9jYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldDEwMGtJRChlYXN0aW5nLCBub3J0aGluZywgem9uZU51bWJlcikge1xuICB2YXIgc2V0UGFybSA9IGdldDEwMGtTZXRGb3Jab25lKHpvbmVOdW1iZXIpO1xuICB2YXIgc2V0Q29sdW1uID0gTWF0aC5mbG9vcihlYXN0aW5nIC8gMTAwMDAwKTtcbiAgdmFyIHNldFJvdyA9IE1hdGguZmxvb3Iobm9ydGhpbmcgLyAxMDAwMDApICUgMjA7XG4gIHJldHVybiBnZXRMZXR0ZXIxMDBrSUQoc2V0Q29sdW1uLCBzZXRSb3csIHNldFBhcm0pO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgVVRNIHpvbmUgbnVtYmVyLCBmaWd1cmUgb3V0IHRoZSBNR1JTIDEwMEsgc2V0IGl0IGlzIGluLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gaSBBbiBVVE0gem9uZSBudW1iZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSAxMDBrIHNldCB0aGUgVVRNIHpvbmUgaXMgaW4uXG4gKi9cbmZ1bmN0aW9uIGdldDEwMGtTZXRGb3Jab25lKGkpIHtcbiAgdmFyIHNldFBhcm0gPSBpICUgTlVNXzEwMEtfU0VUUztcbiAgaWYgKHNldFBhcm0gPT09IDApIHtcbiAgICBzZXRQYXJtID0gTlVNXzEwMEtfU0VUUztcbiAgfVxuXG4gIHJldHVybiBzZXRQYXJtO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdHdvLWxldHRlciBNR1JTIDEwMGsgZGVzaWduYXRvciBnaXZlbiBpbmZvcm1hdGlvblxuICogdHJhbnNsYXRlZCBmcm9tIHRoZSBVVE0gbm9ydGhpbmcsIGVhc3RpbmcgYW5kIHpvbmUgbnVtYmVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gY29sdW1uIHRoZSBjb2x1bW4gaW5kZXggYXMgaXQgcmVsYXRlcyB0byB0aGUgTUdSU1xuICogICAgICAgIDEwMGsgc2V0IHNwcmVhZHNoZWV0LCBjcmVhdGVkIGZyb20gdGhlIFVUTSBlYXN0aW5nLlxuICogICAgICAgIFZhbHVlcyBhcmUgMS04LlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdyB0aGUgcm93IGluZGV4IGFzIGl0IHJlbGF0ZXMgdG8gdGhlIE1HUlMgMTAwayBzZXRcbiAqICAgICAgICBzcHJlYWRzaGVldCwgY3JlYXRlZCBmcm9tIHRoZSBVVE0gbm9ydGhpbmcgdmFsdWUuIFZhbHVlc1xuICogICAgICAgIGFyZSBmcm9tIDAtMTkuXG4gKiBAcGFyYW0ge251bWJlcn0gcGFybSB0aGUgc2V0IGJsb2NrLCBhcyBpdCByZWxhdGVzIHRvIHRoZSBNR1JTIDEwMGsgc2V0XG4gKiAgICAgICAgc3ByZWFkc2hlZXQsIGNyZWF0ZWQgZnJvbSB0aGUgVVRNIHpvbmUuIFZhbHVlcyBhcmUgZnJvbVxuICogICAgICAgIDEtNjAuXG4gKiBAcmV0dXJuIHR3byBsZXR0ZXIgTUdSUyAxMDBrIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIGdldExldHRlcjEwMGtJRChjb2x1bW4sIHJvdywgcGFybSkge1xuICAvLyBjb2xPcmlnaW4gYW5kIHJvd09yaWdpbiBhcmUgdGhlIGxldHRlcnMgYXQgdGhlIG9yaWdpbiBvZiB0aGUgc2V0XG4gIHZhciBpbmRleCA9IHBhcm0gLSAxO1xuICB2YXIgY29sT3JpZ2luID0gU0VUX09SSUdJTl9DT0xVTU5fTEVUVEVSUy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgdmFyIHJvd09yaWdpbiA9IFNFVF9PUklHSU5fUk9XX0xFVFRFUlMuY2hhckNvZGVBdChpbmRleCk7XG5cbiAgLy8gY29sSW50IGFuZCByb3dJbnQgYXJlIHRoZSBsZXR0ZXJzIHRvIGJ1aWxkIHRvIHJldHVyblxuICB2YXIgY29sSW50ID0gY29sT3JpZ2luICsgY29sdW1uIC0gMTtcbiAgdmFyIHJvd0ludCA9IHJvd09yaWdpbiArIHJvdztcbiAgdmFyIHJvbGxvdmVyID0gZmFsc2U7XG5cbiAgaWYgKGNvbEludCA+IFopIHtcbiAgICBjb2xJbnQgPSBjb2xJbnQgLSBaICsgQSQxIC0gMTtcbiAgICByb2xsb3ZlciA9IHRydWU7XG4gIH1cblxuICBpZiAoY29sSW50ID09PSBJIHx8IChjb2xPcmlnaW4gPCBJICYmIGNvbEludCA+IEkpIHx8ICgoY29sSW50ID4gSSB8fCBjb2xPcmlnaW4gPCBJKSAmJiByb2xsb3ZlcikpIHtcbiAgICBjb2xJbnQrKztcbiAgfVxuXG4gIGlmIChjb2xJbnQgPT09IE8gfHwgKGNvbE9yaWdpbiA8IE8gJiYgY29sSW50ID4gTykgfHwgKChjb2xJbnQgPiBPIHx8IGNvbE9yaWdpbiA8IE8pICYmIHJvbGxvdmVyKSkge1xuICAgIGNvbEludCsrO1xuXG4gICAgaWYgKGNvbEludCA9PT0gSSkge1xuICAgICAgY29sSW50Kys7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbEludCA+IFopIHtcbiAgICBjb2xJbnQgPSBjb2xJbnQgLSBaICsgQSQxIC0gMTtcbiAgfVxuXG4gIGlmIChyb3dJbnQgPiBWKSB7XG4gICAgcm93SW50ID0gcm93SW50IC0gViArIEEkMSAtIDE7XG4gICAgcm9sbG92ZXIgPSB0cnVlO1xuICB9XG4gIGVsc2Uge1xuICAgIHJvbGxvdmVyID0gZmFsc2U7XG4gIH1cblxuICBpZiAoKChyb3dJbnQgPT09IEkpIHx8ICgocm93T3JpZ2luIDwgSSkgJiYgKHJvd0ludCA+IEkpKSkgfHwgKCgocm93SW50ID4gSSkgfHwgKHJvd09yaWdpbiA8IEkpKSAmJiByb2xsb3ZlcikpIHtcbiAgICByb3dJbnQrKztcbiAgfVxuXG4gIGlmICgoKHJvd0ludCA9PT0gTykgfHwgKChyb3dPcmlnaW4gPCBPKSAmJiAocm93SW50ID4gTykpKSB8fCAoKChyb3dJbnQgPiBPKSB8fCAocm93T3JpZ2luIDwgTykpICYmIHJvbGxvdmVyKSkge1xuICAgIHJvd0ludCsrO1xuXG4gICAgaWYgKHJvd0ludCA9PT0gSSkge1xuICAgICAgcm93SW50Kys7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJvd0ludCA+IFYpIHtcbiAgICByb3dJbnQgPSByb3dJbnQgLSBWICsgQSQxIC0gMTtcbiAgfVxuXG4gIHZhciB0d29MZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvbEludCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHJvd0ludCk7XG4gIHJldHVybiB0d29MZXR0ZXI7XG59XG5cbi8qKlxuICogRGVjb2RlIHRoZSBVVE0gcGFyYW1ldGVycyBmcm9tIGEgTUdSUyBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZ3JzU3RyaW5nIGFuIFVQUEVSQ0FTRSBjb29yZGluYXRlIHN0cmluZyBpcyBleHBlY3RlZC5cbiAqIEByZXR1cm4ge29iamVjdH0gQW4gb2JqZWN0IGxpdGVyYWwgd2l0aCBlYXN0aW5nLCBub3J0aGluZywgem9uZUxldHRlcixcbiAqICAgICB6b25lTnVtYmVyIGFuZCBhY2N1cmFjeSAoaW4gbWV0ZXJzKSBwcm9wZXJ0aWVzLlxuICovXG5mdW5jdGlvbiBkZWNvZGUobWdyc1N0cmluZykge1xuXG4gIGlmIChtZ3JzU3RyaW5nICYmIG1ncnNTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgKFwiTUdSU1BvaW50IGNvdmVydGluZyBmcm9tIG5vdGhpbmdcIik7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gbWdyc1N0cmluZy5sZW5ndGg7XG5cbiAgdmFyIGh1bksgPSBudWxsO1xuICB2YXIgc2IgPSBcIlwiO1xuICB2YXIgdGVzdENoYXI7XG4gIHZhciBpID0gMDtcblxuICAvLyBnZXQgWm9uZSBudW1iZXJcbiAgd2hpbGUgKCEoL1tBLVpdLykudGVzdCh0ZXN0Q2hhciA9IG1ncnNTdHJpbmcuY2hhckF0KGkpKSkge1xuICAgIGlmIChpID49IDIpIHtcbiAgICAgIHRocm93IChcIk1HUlNQb2ludCBiYWQgY29udmVyc2lvbiBmcm9tOiBcIiArIG1ncnNTdHJpbmcpO1xuICAgIH1cbiAgICBzYiArPSB0ZXN0Q2hhcjtcbiAgICBpKys7XG4gIH1cblxuICB2YXIgem9uZU51bWJlciA9IHBhcnNlSW50KHNiLCAxMCk7XG5cbiAgaWYgKGkgPT09IDAgfHwgaSArIDMgPiBsZW5ndGgpIHtcbiAgICAvLyBBIGdvb2QgTUdSUyBzdHJpbmcgaGFzIHRvIGJlIDQtNSBkaWdpdHMgbG9uZyxcbiAgICAvLyAjI0FBQS8jQUFBIGF0IGxlYXN0LlxuICAgIHRocm93IChcIk1HUlNQb2ludCBiYWQgY29udmVyc2lvbiBmcm9tOiBcIiArIG1ncnNTdHJpbmcpO1xuICB9XG5cbiAgdmFyIHpvbmVMZXR0ZXIgPSBtZ3JzU3RyaW5nLmNoYXJBdChpKyspO1xuXG4gIC8vIFNob3VsZCB3ZSBjaGVjayB0aGUgem9uZSBsZXR0ZXIgaGVyZT8gV2h5IG5vdC5cbiAgaWYgKHpvbmVMZXR0ZXIgPD0gJ0EnIHx8IHpvbmVMZXR0ZXIgPT09ICdCJyB8fCB6b25lTGV0dGVyID09PSAnWScgfHwgem9uZUxldHRlciA+PSAnWicgfHwgem9uZUxldHRlciA9PT0gJ0knIHx8IHpvbmVMZXR0ZXIgPT09ICdPJykge1xuICAgIHRocm93IChcIk1HUlNQb2ludCB6b25lIGxldHRlciBcIiArIHpvbmVMZXR0ZXIgKyBcIiBub3QgaGFuZGxlZDogXCIgKyBtZ3JzU3RyaW5nKTtcbiAgfVxuXG4gIGh1bksgPSBtZ3JzU3RyaW5nLnN1YnN0cmluZyhpLCBpICs9IDIpO1xuXG4gIHZhciBzZXQgPSBnZXQxMDBrU2V0Rm9yWm9uZSh6b25lTnVtYmVyKTtcblxuICB2YXIgZWFzdDEwMGsgPSBnZXRFYXN0aW5nRnJvbUNoYXIoaHVuSy5jaGFyQXQoMCksIHNldCk7XG4gIHZhciBub3J0aDEwMGsgPSBnZXROb3J0aGluZ0Zyb21DaGFyKGh1bksuY2hhckF0KDEpLCBzZXQpO1xuXG4gIC8vIFdlIGhhdmUgYSBidWcgd2hlcmUgdGhlIG5vcnRoaW5nIG1heSBiZSAyMDAwMDAwIHRvbyBsb3cuXG4gIC8vIEhvd1xuICAvLyBkbyB3ZSBrbm93IHdoZW4gdG8gcm9sbCBvdmVyP1xuXG4gIHdoaWxlIChub3J0aDEwMGsgPCBnZXRNaW5Ob3J0aGluZyh6b25lTGV0dGVyKSkge1xuICAgIG5vcnRoMTAwayArPSAyMDAwMDAwO1xuICB9XG5cbiAgLy8gY2FsY3VsYXRlIHRoZSBjaGFyIGluZGV4IGZvciBlYXN0aW5nL25vcnRoaW5nIHNlcGFyYXRvclxuICB2YXIgcmVtYWluZGVyID0gbGVuZ3RoIC0gaTtcblxuICBpZiAocmVtYWluZGVyICUgMiAhPT0gMCkge1xuICAgIHRocm93IChcIk1HUlNQb2ludCBoYXMgdG8gaGF2ZSBhbiBldmVuIG51bWJlciBcXG5vZiBkaWdpdHMgYWZ0ZXIgdGhlIHpvbmUgbGV0dGVyIGFuZCB0d28gMTAwa20gbGV0dGVycyAtIGZyb250IFxcbmhhbGYgZm9yIGVhc3RpbmcgbWV0ZXJzLCBzZWNvbmQgaGFsZiBmb3IgXFxubm9ydGhpbmcgbWV0ZXJzXCIgKyBtZ3JzU3RyaW5nKTtcbiAgfVxuXG4gIHZhciBzZXAgPSByZW1haW5kZXIgLyAyO1xuXG4gIHZhciBzZXBFYXN0aW5nID0gMC4wO1xuICB2YXIgc2VwTm9ydGhpbmcgPSAwLjA7XG4gIHZhciBhY2N1cmFjeUJvbnVzLCBzZXBFYXN0aW5nU3RyaW5nLCBzZXBOb3J0aGluZ1N0cmluZywgZWFzdGluZywgbm9ydGhpbmc7XG4gIGlmIChzZXAgPiAwKSB7XG4gICAgYWNjdXJhY3lCb251cyA9IDEwMDAwMC4wIC8gTWF0aC5wb3coMTAsIHNlcCk7XG4gICAgc2VwRWFzdGluZ1N0cmluZyA9IG1ncnNTdHJpbmcuc3Vic3RyaW5nKGksIGkgKyBzZXApO1xuICAgIHNlcEVhc3RpbmcgPSBwYXJzZUZsb2F0KHNlcEVhc3RpbmdTdHJpbmcpICogYWNjdXJhY3lCb251cztcbiAgICBzZXBOb3J0aGluZ1N0cmluZyA9IG1ncnNTdHJpbmcuc3Vic3RyaW5nKGkgKyBzZXApO1xuICAgIHNlcE5vcnRoaW5nID0gcGFyc2VGbG9hdChzZXBOb3J0aGluZ1N0cmluZykgKiBhY2N1cmFjeUJvbnVzO1xuICB9XG5cbiAgZWFzdGluZyA9IHNlcEVhc3RpbmcgKyBlYXN0MTAwaztcbiAgbm9ydGhpbmcgPSBzZXBOb3J0aGluZyArIG5vcnRoMTAwaztcblxuICByZXR1cm4ge1xuICAgIGVhc3Rpbmc6IGVhc3RpbmcsXG4gICAgbm9ydGhpbmc6IG5vcnRoaW5nLFxuICAgIHpvbmVMZXR0ZXI6IHpvbmVMZXR0ZXIsXG4gICAgem9uZU51bWJlcjogem9uZU51bWJlcixcbiAgICBhY2N1cmFjeTogYWNjdXJhY3lCb251c1xuICB9O1xufVxuXG4vKipcbiAqIEdpdmVuIHRoZSBmaXJzdCBsZXR0ZXIgZnJvbSBhIHR3by1sZXR0ZXIgTUdSUyAxMDBrIHpvbmUsIGFuZCBnaXZlbiB0aGVcbiAqIE1HUlMgdGFibGUgc2V0IGZvciB0aGUgem9uZSBudW1iZXIsIGZpZ3VyZSBvdXQgdGhlIGVhc3RpbmcgdmFsdWUgdGhhdFxuICogc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBvdGhlciwgc2Vjb25kYXJ5IGVhc3RpbmcgdmFsdWUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Y2hhcn0gZSBUaGUgZmlyc3QgbGV0dGVyIGZyb20gYSB0d28tbGV0dGVyIE1HUlMgMTAwwrRrIHpvbmUuXG4gKiBAcGFyYW0ge251bWJlcn0gc2V0IFRoZSBNR1JTIHRhYmxlIHNldCBmb3IgdGhlIHpvbmUgbnVtYmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZWFzdGluZyB2YWx1ZSBmb3IgdGhlIGdpdmVuIGxldHRlciBhbmQgc2V0LlxuICovXG5mdW5jdGlvbiBnZXRFYXN0aW5nRnJvbUNoYXIoZSwgc2V0KSB7XG4gIC8vIGNvbE9yaWdpbiBpcyB0aGUgbGV0dGVyIGF0IHRoZSBvcmlnaW4gb2YgdGhlIHNldCBmb3IgdGhlXG4gIC8vIGNvbHVtblxuICB2YXIgY3VyQ29sID0gU0VUX09SSUdJTl9DT0xVTU5fTEVUVEVSUy5jaGFyQ29kZUF0KHNldCAtIDEpO1xuICB2YXIgZWFzdGluZ1ZhbHVlID0gMTAwMDAwLjA7XG4gIHZhciByZXdpbmRNYXJrZXIgPSBmYWxzZTtcblxuICB3aGlsZSAoY3VyQ29sICE9PSBlLmNoYXJDb2RlQXQoMCkpIHtcbiAgICBjdXJDb2wrKztcbiAgICBpZiAoY3VyQ29sID09PSBJKSB7XG4gICAgICBjdXJDb2wrKztcbiAgICB9XG4gICAgaWYgKGN1ckNvbCA9PT0gTykge1xuICAgICAgY3VyQ29sKys7XG4gICAgfVxuICAgIGlmIChjdXJDb2wgPiBaKSB7XG4gICAgICBpZiAocmV3aW5kTWFya2VyKSB7XG4gICAgICAgIHRocm93IChcIkJhZCBjaGFyYWN0ZXI6IFwiICsgZSk7XG4gICAgICB9XG4gICAgICBjdXJDb2wgPSBBJDE7XG4gICAgICByZXdpbmRNYXJrZXIgPSB0cnVlO1xuICAgIH1cbiAgICBlYXN0aW5nVmFsdWUgKz0gMTAwMDAwLjA7XG4gIH1cblxuICByZXR1cm4gZWFzdGluZ1ZhbHVlO1xufVxuXG4vKipcbiAqIEdpdmVuIHRoZSBzZWNvbmQgbGV0dGVyIGZyb20gYSB0d28tbGV0dGVyIE1HUlMgMTAwayB6b25lLCBhbmQgZ2l2ZW4gdGhlXG4gKiBNR1JTIHRhYmxlIHNldCBmb3IgdGhlIHpvbmUgbnVtYmVyLCBmaWd1cmUgb3V0IHRoZSBub3J0aGluZyB2YWx1ZSB0aGF0XG4gKiBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIG90aGVyLCBzZWNvbmRhcnkgbm9ydGhpbmcgdmFsdWUuIFlvdSBoYXZlIHRvXG4gKiByZW1lbWJlciB0aGF0IE5vcnRoaW5ncyBhcmUgZGV0ZXJtaW5lZCBmcm9tIHRoZSBlcXVhdG9yLCBhbmQgdGhlIHZlcnRpY2FsXG4gKiBjeWNsZSBvZiBsZXR0ZXJzIG1lYW4gYSAyMDAwMDAwIGFkZGl0aW9uYWwgbm9ydGhpbmcgbWV0ZXJzLiBUaGlzIGhhcHBlbnNcbiAqIGFwcHJveC4gZXZlcnkgMTggZGVncmVlcyBvZiBsYXRpdHVkZS4gVGhpcyBtZXRob2QgZG9lcyAqTk9UKiBjb3VudCBhbnlcbiAqIGFkZGl0aW9uYWwgbm9ydGhpbmdzLiBZb3UgaGF2ZSB0byBmaWd1cmUgb3V0IGhvdyBtYW55IDIwMDAwMDAgbWV0ZXJzIG5lZWRcbiAqIHRvIGJlIGFkZGVkIGZvciB0aGUgem9uZSBsZXR0ZXIgb2YgdGhlIE1HUlMgY29vcmRpbmF0ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtjaGFyfSBuIFNlY29uZCBsZXR0ZXIgb2YgdGhlIE1HUlMgMTAwayB6b25lXG4gKiBAcGFyYW0ge251bWJlcn0gc2V0IFRoZSBNR1JTIHRhYmxlIHNldCBudW1iZXIsIHdoaWNoIGlzIGRlcGVuZGVudCBvbiB0aGVcbiAqICAgICBVVE0gem9uZSBudW1iZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBub3J0aGluZyB2YWx1ZSBmb3IgdGhlIGdpdmVuIGxldHRlciBhbmQgc2V0LlxuICovXG5mdW5jdGlvbiBnZXROb3J0aGluZ0Zyb21DaGFyKG4sIHNldCkge1xuXG4gIGlmIChuID4gJ1YnKSB7XG4gICAgdGhyb3cgKFwiTUdSU1BvaW50IGdpdmVuIGludmFsaWQgTm9ydGhpbmcgXCIgKyBuKTtcbiAgfVxuXG4gIC8vIHJvd09yaWdpbiBpcyB0aGUgbGV0dGVyIGF0IHRoZSBvcmlnaW4gb2YgdGhlIHNldCBmb3IgdGhlXG4gIC8vIGNvbHVtblxuICB2YXIgY3VyUm93ID0gU0VUX09SSUdJTl9ST1dfTEVUVEVSUy5jaGFyQ29kZUF0KHNldCAtIDEpO1xuICB2YXIgbm9ydGhpbmdWYWx1ZSA9IDAuMDtcbiAgdmFyIHJld2luZE1hcmtlciA9IGZhbHNlO1xuXG4gIHdoaWxlIChjdXJSb3cgIT09IG4uY2hhckNvZGVBdCgwKSkge1xuICAgIGN1clJvdysrO1xuICAgIGlmIChjdXJSb3cgPT09IEkpIHtcbiAgICAgIGN1clJvdysrO1xuICAgIH1cbiAgICBpZiAoY3VyUm93ID09PSBPKSB7XG4gICAgICBjdXJSb3crKztcbiAgICB9XG4gICAgLy8gZml4aW5nIGEgYnVnIG1ha2luZyB3aG9sZSBhcHBsaWNhdGlvbiBoYW5nIGluIHRoaXMgbG9vcFxuICAgIC8vIHdoZW4gJ24nIGlzIGEgd3JvbmcgY2hhcmFjdGVyXG4gICAgaWYgKGN1clJvdyA+IFYpIHtcbiAgICAgIGlmIChyZXdpbmRNYXJrZXIpIHsgLy8gbWFraW5nIHN1cmUgdGhhdCB0aGlzIGxvb3AgZW5kc1xuICAgICAgICB0aHJvdyAoXCJCYWQgY2hhcmFjdGVyOiBcIiArIG4pO1xuICAgICAgfVxuICAgICAgY3VyUm93ID0gQSQxO1xuICAgICAgcmV3aW5kTWFya2VyID0gdHJ1ZTtcbiAgICB9XG4gICAgbm9ydGhpbmdWYWx1ZSArPSAxMDAwMDAuMDtcbiAgfVxuXG4gIHJldHVybiBub3J0aGluZ1ZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBmdW5jdGlvbiBnZXRNaW5Ob3J0aGluZyByZXR1cm5zIHRoZSBtaW5pbXVtIG5vcnRoaW5nIHZhbHVlIG9mIGEgTUdSU1xuICogem9uZS5cbiAqXG4gKiBQb3J0ZWQgZnJvbSBHZW90cmFucycgYyBMYXR0aXR1ZGVfQmFuZF9WYWx1ZSBzdHJ1Y3R1cmUgdGFibGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Y2hhcn0gem9uZUxldHRlciBUaGUgTUdSUyB6b25lIHRvIGdldCB0aGUgbWluIG5vcnRoaW5nIGZvci5cbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWluTm9ydGhpbmcoem9uZUxldHRlcikge1xuICB2YXIgbm9ydGhpbmc7XG4gIHN3aXRjaCAoem9uZUxldHRlcikge1xuICBjYXNlICdDJzpcbiAgICBub3J0aGluZyA9IDExMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnRCc6XG4gICAgbm9ydGhpbmcgPSAyMDAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0UnOlxuICAgIG5vcnRoaW5nID0gMjgwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdGJzpcbiAgICBub3J0aGluZyA9IDM3MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnRyc6XG4gICAgbm9ydGhpbmcgPSA0NjAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0gnOlxuICAgIG5vcnRoaW5nID0gNTUwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdKJzpcbiAgICBub3J0aGluZyA9IDY0MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnSyc6XG4gICAgbm9ydGhpbmcgPSA3MzAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ0wnOlxuICAgIG5vcnRoaW5nID0gODIwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdNJzpcbiAgICBub3J0aGluZyA9IDkxMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnTic6XG4gICAgbm9ydGhpbmcgPSAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1AnOlxuICAgIG5vcnRoaW5nID0gODAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1EnOlxuICAgIG5vcnRoaW5nID0gMTcwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdSJzpcbiAgICBub3J0aGluZyA9IDI2MDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnUyc6XG4gICAgbm9ydGhpbmcgPSAzNTAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1QnOlxuICAgIG5vcnRoaW5nID0gNDQwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdVJzpcbiAgICBub3J0aGluZyA9IDUzMDAwMDAuMDtcbiAgICBicmVhaztcbiAgY2FzZSAnVic6XG4gICAgbm9ydGhpbmcgPSA2MjAwMDAwLjA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ1cnOlxuICAgIG5vcnRoaW5nID0gNzAwMDAwMC4wO1xuICAgIGJyZWFrO1xuICBjYXNlICdYJzpcbiAgICBub3J0aGluZyA9IDc5MDAwMDAuMDtcbiAgICBicmVhaztcbiAgZGVmYXVsdDpcbiAgICBub3J0aGluZyA9IC0xLjA7XG4gIH1cbiAgaWYgKG5vcnRoaW5nID49IDAuMCkge1xuICAgIHJldHVybiBub3J0aGluZztcbiAgfVxuICBlbHNlIHtcbiAgICB0aHJvdyAoXCJJbnZhbGlkIHpvbmUgbGV0dGVyOiBcIiArIHpvbmVMZXR0ZXIpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gUG9pbnQoeCwgeSwgeikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUG9pbnQpKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5LCB6KTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHRoaXMueCA9IHhbMF07XG4gICAgdGhpcy55ID0geFsxXTtcbiAgICB0aGlzLnogPSB4WzJdIHx8IDAuMDtcbiAgfSBlbHNlIGlmKHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHRoaXMueCA9IHgueDtcbiAgICB0aGlzLnkgPSB4Lnk7XG4gICAgdGhpcy56ID0geC56IHx8IDAuMDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIGNvb3JkcyA9IHguc3BsaXQoJywnKTtcbiAgICB0aGlzLnggPSBwYXJzZUZsb2F0KGNvb3Jkc1swXSwgMTApO1xuICAgIHRoaXMueSA9IHBhcnNlRmxvYXQoY29vcmRzWzFdLCAxMCk7XG4gICAgdGhpcy56ID0gcGFyc2VGbG9hdChjb29yZHNbMl0sIDEwKSB8fCAwLjA7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHogfHwgMC4wO1xuICB9XG4gIGNvbnNvbGUud2FybigncHJvajQuUG9pbnQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMywgdXNlIHByb2o0LnRvUG9pbnQnKTtcbn1cblxuUG9pbnQuZnJvbU1HUlMgPSBmdW5jdGlvbihtZ3JzU3RyKSB7XG4gIHJldHVybiBuZXcgUG9pbnQodG9Qb2ludChtZ3JzU3RyKSk7XG59O1xuUG9pbnQucHJvdG90eXBlLnRvTUdSUyA9IGZ1bmN0aW9uKGFjY3VyYWN5KSB7XG4gIHJldHVybiBmb3J3YXJkJHQoW3RoaXMueCwgdGhpcy55XSwgYWNjdXJhY3kpO1xufTtcblxudmFyIEMwMCA9IDE7XG52YXIgQzAyID0gMC4yNTtcbnZhciBDMDQgPSAwLjA0Njg3NTtcbnZhciBDMDYgPSAwLjAxOTUzMTI1O1xudmFyIEMwOCA9IDAuMDEwNjgxMTUyMzQzNzU7XG52YXIgQzIyID0gMC43NTtcbnZhciBDNDQgPSAwLjQ2ODc1O1xudmFyIEM0NiA9IDAuMDEzMDIwODMzMzMzMzMzMzMzMzM7XG52YXIgQzQ4ID0gMC4wMDcxMjA3NjgyMjkxNjY2NjY2NjtcbnZhciBDNjYgPSAwLjM2NDU4MzMzMzMzMzMzMzMzMzMzO1xudmFyIEM2OCA9IDAuMDA1Njk2NjE0NTgzMzMzMzMzMzM7XG52YXIgQzg4ID0gMC4zMDc2MTcxODc1O1xuXG5mdW5jdGlvbiBwal9lbmZuKGVzKSB7XG4gIHZhciBlbiA9IFtdO1xuICBlblswXSA9IEMwMCAtIGVzICogKEMwMiArIGVzICogKEMwNCArIGVzICogKEMwNiArIGVzICogQzA4KSkpO1xuICBlblsxXSA9IGVzICogKEMyMiAtIGVzICogKEMwNCArIGVzICogKEMwNiArIGVzICogQzA4KSkpO1xuICB2YXIgdCA9IGVzICogZXM7XG4gIGVuWzJdID0gdCAqIChDNDQgLSBlcyAqIChDNDYgKyBlcyAqIEM0OCkpO1xuICB0ICo9IGVzO1xuICBlblszXSA9IHQgKiAoQzY2IC0gZXMgKiBDNjgpO1xuICBlbls0XSA9IHQgKiBlcyAqIEM4ODtcbiAgcmV0dXJuIGVuO1xufVxuXG5mdW5jdGlvbiBwal9tbGZuKHBoaSwgc3BoaSwgY3BoaSwgZW4pIHtcbiAgY3BoaSAqPSBzcGhpO1xuICBzcGhpICo9IHNwaGk7XG4gIHJldHVybiAoZW5bMF0gKiBwaGkgLSBjcGhpICogKGVuWzFdICsgc3BoaSAqIChlblsyXSArIHNwaGkgKiAoZW5bM10gKyBzcGhpICogZW5bNF0pKSkpO1xufVxuXG52YXIgTUFYX0lURVIkMyA9IDIwO1xuXG5mdW5jdGlvbiBwal9pbnZfbWxmbihhcmcsIGVzLCBlbikge1xuICB2YXIgayA9IDEgLyAoMSAtIGVzKTtcbiAgdmFyIHBoaSA9IGFyZztcbiAgZm9yICh2YXIgaSA9IE1BWF9JVEVSJDM7IGk7IC0taSkgeyAvKiByYXJlbHkgZ29lcyBvdmVyIDIgaXRlcmF0aW9ucyAqL1xuICAgIHZhciBzID0gTWF0aC5zaW4ocGhpKTtcbiAgICB2YXIgdCA9IDEgLSBlcyAqIHMgKiBzO1xuICAgIC8vdCA9IHRoaXMucGpfbWxmbihwaGksIHMsIE1hdGguY29zKHBoaSksIGVuKSAtIGFyZztcbiAgICAvL3BoaSAtPSB0ICogKHQgKiBNYXRoLnNxcnQodCkpICogaztcbiAgICB0ID0gKHBqX21sZm4ocGhpLCBzLCBNYXRoLmNvcyhwaGkpLCBlbikgLSBhcmcpICogKHQgKiBNYXRoLnNxcnQodCkpICogaztcbiAgICBwaGkgLT0gdDtcbiAgICBpZiAoTWF0aC5hYnModCkgPCBFUFNMTikge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cbiAgLy8uLnJlcG9ydEVycm9yKFwiY2Fzczpwal9pbnZfbWxmbjogQ29udmVyZ2VuY2UgZXJyb3JcIik7XG4gIHJldHVybiBwaGk7XG59XG5cbi8vIEhlYXZpbHkgYmFzZWQgb24gdGhpcyB0bWVyYyBwcm9qZWN0aW9uIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWJsb2NoL21hcHNoYXBlci1wcm9qL2Jsb2IvbWFzdGVyL3NyYy9wcm9qZWN0aW9ucy90bWVyYy5qc1xuXG5cbmZ1bmN0aW9uIGluaXQkdCgpIHtcbiAgdGhpcy54MCA9IHRoaXMueDAgIT09IHVuZGVmaW5lZCA/IHRoaXMueDAgOiAwO1xuICB0aGlzLnkwID0gdGhpcy55MCAhPT0gdW5kZWZpbmVkID8gdGhpcy55MCA6IDA7XG4gIHRoaXMubG9uZzAgPSB0aGlzLmxvbmcwICE9PSB1bmRlZmluZWQgPyB0aGlzLmxvbmcwIDogMDtcbiAgdGhpcy5sYXQwID0gdGhpcy5sYXQwICE9PSB1bmRlZmluZWQgPyB0aGlzLmxhdDAgOiAwO1xuXG4gIGlmICh0aGlzLmVzKSB7XG4gICAgdGhpcy5lbiA9IHBqX2VuZm4odGhpcy5lcyk7XG4gICAgdGhpcy5tbDAgPSBwal9tbGZuKHRoaXMubGF0MCwgTWF0aC5zaW4odGhpcy5sYXQwKSwgTWF0aC5jb3ModGhpcy5sYXQwKSwgdGhpcy5lbik7XG4gIH1cbn1cblxuLyoqXG4gICAgVHJhbnN2ZXJzZSBNZXJjYXRvciBGb3J3YXJkICAtIGxvbmcvbGF0IHRvIHgveVxuICAgIGxvbmcvbGF0IGluIHJhZGlhbnNcbiAgKi9cbmZ1bmN0aW9uIGZvcndhcmQkcyhwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdmFyIGRlbHRhX2xvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciBjb247XG4gIHZhciB4LCB5O1xuICB2YXIgc2luX3BoaSA9IE1hdGguc2luKGxhdCk7XG4gIHZhciBjb3NfcGhpID0gTWF0aC5jb3MobGF0KTtcblxuICBpZiAoIXRoaXMuZXMpIHtcbiAgICB2YXIgYiA9IGNvc19waGkgKiBNYXRoLnNpbihkZWx0YV9sb24pO1xuXG4gICAgaWYgKChNYXRoLmFicyhNYXRoLmFicyhiKSAtIDEpKSA8IEVQU0xOKSB7XG4gICAgICByZXR1cm4gKDkzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB4ID0gMC41ICogdGhpcy5hICogdGhpcy5rMCAqIE1hdGgubG9nKCgxICsgYikgLyAoMSAtIGIpKSArIHRoaXMueDA7XG4gICAgICB5ID0gY29zX3BoaSAqIE1hdGguY29zKGRlbHRhX2xvbikgLyBNYXRoLnNxcnQoMSAtIE1hdGgucG93KGIsIDIpKTtcbiAgICAgIGIgPSBNYXRoLmFicyh5KTtcblxuICAgICAgaWYgKGIgPj0gMSkge1xuICAgICAgICBpZiAoKGIgLSAxKSA+IEVQU0xOKSB7XG4gICAgICAgICAgcmV0dXJuICg5Myk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgeSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB5ID0gTWF0aC5hY29zKHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGF0IDwgMCkge1xuICAgICAgICB5ID0gLXk7XG4gICAgICB9XG5cbiAgICAgIHkgPSB0aGlzLmEgKiB0aGlzLmswICogKHkgLSB0aGlzLmxhdDApICsgdGhpcy55MDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIGFsID0gY29zX3BoaSAqIGRlbHRhX2xvbjtcbiAgICB2YXIgYWxzID0gTWF0aC5wb3coYWwsIDIpO1xuICAgIHZhciBjID0gdGhpcy5lcDIgKiBNYXRoLnBvdyhjb3NfcGhpLCAyKTtcbiAgICB2YXIgY3MgPSBNYXRoLnBvdyhjLCAyKTtcbiAgICB2YXIgdHEgPSBNYXRoLmFicyhjb3NfcGhpKSA+IEVQU0xOID8gTWF0aC50YW4obGF0KSA6IDA7XG4gICAgdmFyIHQgPSBNYXRoLnBvdyh0cSwgMik7XG4gICAgdmFyIHRzID0gTWF0aC5wb3codCwgMik7XG4gICAgY29uID0gMSAtIHRoaXMuZXMgKiBNYXRoLnBvdyhzaW5fcGhpLCAyKTtcbiAgICBhbCA9IGFsIC8gTWF0aC5zcXJ0KGNvbik7XG4gICAgdmFyIG1sID0gcGpfbWxmbihsYXQsIHNpbl9waGksIGNvc19waGksIHRoaXMuZW4pO1xuXG4gICAgeCA9IHRoaXMuYSAqICh0aGlzLmswICogYWwgKiAoMSArXG4gICAgICBhbHMgLyA2ICogKDEgLSB0ICsgYyArXG4gICAgICBhbHMgLyAyMCAqICg1IC0gMTggKiB0ICsgdHMgKyAxNCAqIGMgLSA1OCAqIHQgKiBjICtcbiAgICAgIGFscyAvIDQyICogKDYxICsgMTc5ICogdHMgLSB0cyAqIHQgLSA0NzkgKiB0KSkpKSkgK1xuICAgICAgdGhpcy54MDtcblxuICAgIHkgPSB0aGlzLmEgKiAodGhpcy5rMCAqIChtbCAtIHRoaXMubWwwICtcbiAgICAgIHNpbl9waGkgKiBkZWx0YV9sb24gKiBhbCAvIDIgKiAoMSArXG4gICAgICBhbHMgLyAxMiAqICg1IC0gdCArIDkgKiBjICsgNCAqIGNzICtcbiAgICAgIGFscyAvIDMwICogKDYxICsgdHMgLSA1OCAqIHQgKyAyNzAgKiBjIC0gMzMwICogdCAqIGMgK1xuICAgICAgYWxzIC8gNTYgKiAoMTM4NSArIDU0MyAqIHRzIC0gdHMgKiB0IC0gMzExMSAqIHQpKSkpKSkgK1xuICAgICAgdGhpcy55MDtcbiAgfVxuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG5cbiAgcmV0dXJuIHA7XG59XG5cbi8qKlxuICAgIFRyYW5zdmVyc2UgTWVyY2F0b3IgSW52ZXJzZSAgLSAgeC95IHRvIGxvbmcvbGF0XG4gICovXG5mdW5jdGlvbiBpbnZlcnNlJHMocCkge1xuICB2YXIgY29uLCBwaGk7XG4gIHZhciBsYXQsIGxvbjtcbiAgdmFyIHggPSAocC54IC0gdGhpcy54MCkgKiAoMSAvIHRoaXMuYSk7XG4gIHZhciB5ID0gKHAueSAtIHRoaXMueTApICogKDEgLyB0aGlzLmEpO1xuXG4gIGlmICghdGhpcy5lcykge1xuICAgIHZhciBmID0gTWF0aC5leHAoeCAvIHRoaXMuazApO1xuICAgIHZhciBnID0gMC41ICogKGYgLSAxIC8gZik7XG4gICAgdmFyIHRlbXAgPSB0aGlzLmxhdDAgKyB5IC8gdGhpcy5rMDtcbiAgICB2YXIgaCA9IE1hdGguY29zKHRlbXApO1xuICAgIGNvbiA9IE1hdGguc3FydCgoMSAtIE1hdGgucG93KGgsIDIpKSAvICgxICsgTWF0aC5wb3coZywgMikpKTtcbiAgICBsYXQgPSBNYXRoLmFzaW4oY29uKTtcblxuICAgIGlmICh5IDwgMCkge1xuICAgICAgbGF0ID0gLWxhdDtcbiAgICB9XG5cbiAgICBpZiAoKGcgPT09IDApICYmIChoID09PSAwKSkge1xuICAgICAgbG9uID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKE1hdGguYXRhbjIoZywgaCkgKyB0aGlzLmxvbmcwKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7IC8vIGVsbGlwc29pZGFsIGZvcm1cbiAgICBjb24gPSB0aGlzLm1sMCArIHkgLyB0aGlzLmswO1xuICAgIHBoaSA9IHBqX2ludl9tbGZuKGNvbiwgdGhpcy5lcywgdGhpcy5lbik7XG5cbiAgICBpZiAoTWF0aC5hYnMocGhpKSA8IEhBTEZfUEkpIHtcbiAgICAgIHZhciBzaW5fcGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICAgIHZhciBjb3NfcGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICAgIHZhciB0YW5fcGhpID0gTWF0aC5hYnMoY29zX3BoaSkgPiBFUFNMTiA/IE1hdGgudGFuKHBoaSkgOiAwO1xuICAgICAgdmFyIGMgPSB0aGlzLmVwMiAqIE1hdGgucG93KGNvc19waGksIDIpO1xuICAgICAgdmFyIGNzID0gTWF0aC5wb3coYywgMik7XG4gICAgICB2YXIgdCA9IE1hdGgucG93KHRhbl9waGksIDIpO1xuICAgICAgdmFyIHRzID0gTWF0aC5wb3codCwgMik7XG4gICAgICBjb24gPSAxIC0gdGhpcy5lcyAqIE1hdGgucG93KHNpbl9waGksIDIpO1xuICAgICAgdmFyIGQgPSB4ICogTWF0aC5zcXJ0KGNvbikgLyB0aGlzLmswO1xuICAgICAgdmFyIGRzID0gTWF0aC5wb3coZCwgMik7XG4gICAgICBjb24gPSBjb24gKiB0YW5fcGhpO1xuXG4gICAgICBsYXQgPSBwaGkgLSAoY29uICogZHMgLyAoMSAtIHRoaXMuZXMpKSAqIDAuNSAqICgxIC1cbiAgICAgICAgZHMgLyAxMiAqICg1ICsgMyAqIHQgLSA5ICogYyAqIHQgKyBjIC0gNCAqIGNzIC1cbiAgICAgICAgZHMgLyAzMCAqICg2MSArIDkwICogdCAtIDI1MiAqIGMgKiB0ICsgNDUgKiB0cyArIDQ2ICogYyAtXG4gICAgICAgIGRzIC8gNTYgKiAoMTM4NSArIDM2MzMgKiB0ICsgNDA5NSAqIHRzICsgMTU3NCAqIHRzICogdCkpKSk7XG5cbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIChkICogKDEgLVxuICAgICAgICBkcyAvIDYgKiAoMSArIDIgKiB0ICsgYyAtXG4gICAgICAgIGRzIC8gMjAgKiAoNSArIDI4ICogdCArIDI0ICogdHMgKyA4ICogYyAqIHQgKyA2ICogYyAtXG4gICAgICAgIGRzIC8gNDIgKiAoNjEgKyA2NjIgKiB0ICsgMTMyMCAqIHRzICsgNzIwICogdHMgKiB0KSkpKSAvIGNvc19waGkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsYXQgPSBIQUxGX1BJICogc2lnbih5KTtcbiAgICAgIGxvbiA9IDA7XG4gICAgfVxuICB9XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG5cbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyR0ID0gW1wiRmFzdF9UcmFuc3ZlcnNlX01lcmNhdG9yXCIsIFwiRmFzdCBUcmFuc3ZlcnNlIE1lcmNhdG9yXCJdO1xudmFyIHRtZXJjID0ge1xuICBpbml0OiBpbml0JHQsXG4gIGZvcndhcmQ6IGZvcndhcmQkcyxcbiAgaW52ZXJzZTogaW52ZXJzZSRzLFxuICBuYW1lczogbmFtZXMkdFxufTtcblxuZnVuY3Rpb24gc2luaCh4KSB7XG4gIHZhciByID0gTWF0aC5leHAoeCk7XG4gIHIgPSAociAtIDEgLyByKSAvIDI7XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBoeXBvdCh4LCB5KSB7XG4gIHggPSBNYXRoLmFicyh4KTtcbiAgeSA9IE1hdGguYWJzKHkpO1xuICB2YXIgYSA9IE1hdGgubWF4KHgsIHkpO1xuICB2YXIgYiA9IE1hdGgubWluKHgsIHkpIC8gKGEgPyBhIDogMSk7XG5cbiAgcmV0dXJuIGEgKiBNYXRoLnNxcnQoMSArIE1hdGgucG93KGIsIDIpKTtcbn1cblxuZnVuY3Rpb24gbG9nMXB5KHgpIHtcbiAgdmFyIHkgPSAxICsgeDtcbiAgdmFyIHogPSB5IC0gMTtcblxuICByZXR1cm4geiA9PT0gMCA/IHggOiB4ICogTWF0aC5sb2coeSkgLyB6O1xufVxuXG5mdW5jdGlvbiBhc2luaHkoeCkge1xuICB2YXIgeSA9IE1hdGguYWJzKHgpO1xuICB5ID0gbG9nMXB5KHkgKiAoMSArIHkgLyAoaHlwb3QoMSwgeSkgKyAxKSkpO1xuXG4gIHJldHVybiB4IDwgMCA/IC15IDogeTtcbn1cblxuZnVuY3Rpb24gZ2F0ZyhwcCwgQikge1xuICB2YXIgY29zXzJCID0gMiAqIE1hdGguY29zKDIgKiBCKTtcbiAgdmFyIGkgPSBwcC5sZW5ndGggLSAxO1xuICB2YXIgaDEgPSBwcFtpXTtcbiAgdmFyIGgyID0gMDtcbiAgdmFyIGg7XG5cbiAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgaCA9IC1oMiArIGNvc18yQiAqIGgxICsgcHBbaV07XG4gICAgaDIgPSBoMTtcbiAgICBoMSA9IGg7XG4gIH1cblxuICByZXR1cm4gKEIgKyBoICogTWF0aC5zaW4oMiAqIEIpKTtcbn1cblxuZnVuY3Rpb24gY2xlbnMocHAsIGFyZ19yKSB7XG4gIHZhciByID0gMiAqIE1hdGguY29zKGFyZ19yKTtcbiAgdmFyIGkgPSBwcC5sZW5ndGggLSAxO1xuICB2YXIgaHIxID0gcHBbaV07XG4gIHZhciBocjIgPSAwO1xuICB2YXIgaHI7XG5cbiAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgaHIgPSAtaHIyICsgciAqIGhyMSArIHBwW2ldO1xuICAgIGhyMiA9IGhyMTtcbiAgICBocjEgPSBocjtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNpbihhcmdfcikgKiBocjtcbn1cblxuZnVuY3Rpb24gY29zaCh4KSB7XG4gIHZhciByID0gTWF0aC5leHAoeCk7XG4gIHIgPSAociArIDEgLyByKSAvIDI7XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBjbGVuc19jbXBseChwcCwgYXJnX3IsIGFyZ19pKSB7XG4gIHZhciBzaW5fYXJnX3IgPSBNYXRoLnNpbihhcmdfcik7XG4gIHZhciBjb3NfYXJnX3IgPSBNYXRoLmNvcyhhcmdfcik7XG4gIHZhciBzaW5oX2FyZ19pID0gc2luaChhcmdfaSk7XG4gIHZhciBjb3NoX2FyZ19pID0gY29zaChhcmdfaSk7XG4gIHZhciByID0gMiAqIGNvc19hcmdfciAqIGNvc2hfYXJnX2k7XG4gIHZhciBpID0gLTIgKiBzaW5fYXJnX3IgKiBzaW5oX2FyZ19pO1xuICB2YXIgaiA9IHBwLmxlbmd0aCAtIDE7XG4gIHZhciBociA9IHBwW2pdO1xuICB2YXIgaGkxID0gMDtcbiAgdmFyIGhyMSA9IDA7XG4gIHZhciBoaSA9IDA7XG4gIHZhciBocjI7XG4gIHZhciBoaTI7XG5cbiAgd2hpbGUgKC0taiA+PSAwKSB7XG4gICAgaHIyID0gaHIxO1xuICAgIGhpMiA9IGhpMTtcbiAgICBocjEgPSBocjtcbiAgICBoaTEgPSBoaTtcbiAgICBociA9IC1ocjIgKyByICogaHIxIC0gaSAqIGhpMSArIHBwW2pdO1xuICAgIGhpID0gLWhpMiArIGkgKiBocjEgKyByICogaGkxO1xuICB9XG5cbiAgciA9IHNpbl9hcmdfciAqIGNvc2hfYXJnX2k7XG4gIGkgPSBjb3NfYXJnX3IgKiBzaW5oX2FyZ19pO1xuXG4gIHJldHVybiBbciAqIGhyIC0gaSAqIGhpLCByICogaGkgKyBpICogaHJdO1xufVxuXG4vLyBIZWF2aWx5IGJhc2VkIG9uIHRoaXMgZXRtZXJjIHByb2plY3Rpb24gaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYmxvY2gvbWFwc2hhcGVyLXByb2ovYmxvYi9tYXN0ZXIvc3JjL3Byb2plY3Rpb25zL2V0bWVyYy5qc1xuXG5cbmZ1bmN0aW9uIGluaXQkcygpIHtcbiAgaWYgKCF0aGlzLmFwcHJveCAmJiAoaXNOYU4odGhpcy5lcykgfHwgdGhpcy5lcyA8PSAwKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGVsbGlwdGljYWwgdXNhZ2UuIFRyeSB1c2luZyB0aGUgK2FwcHJveCBvcHRpb24gaW4gdGhlIHByb2ogc3RyaW5nLCBvciBQUk9KRUNUSU9OW1wiRmFzdF9UcmFuc3ZlcnNlX01lcmNhdG9yXCJdIGluIHRoZSBXS1QuJyk7XG4gIH1cbiAgaWYgKHRoaXMuYXBwcm94KSB7XG4gICAgLy8gV2hlbiAnK2FwcHJveCcgaXMgc2V0LCB1c2UgdG1lcmMgaW5zdGVhZFxuICAgIHRtZXJjLmluaXQuYXBwbHkodGhpcyk7XG4gICAgdGhpcy5mb3J3YXJkID0gdG1lcmMuZm9yd2FyZDtcbiAgICB0aGlzLmludmVyc2UgPSB0bWVyYy5pbnZlcnNlO1xuICB9XG5cbiAgdGhpcy54MCA9IHRoaXMueDAgIT09IHVuZGVmaW5lZCA/IHRoaXMueDAgOiAwO1xuICB0aGlzLnkwID0gdGhpcy55MCAhPT0gdW5kZWZpbmVkID8gdGhpcy55MCA6IDA7XG4gIHRoaXMubG9uZzAgPSB0aGlzLmxvbmcwICE9PSB1bmRlZmluZWQgPyB0aGlzLmxvbmcwIDogMDtcbiAgdGhpcy5sYXQwID0gdGhpcy5sYXQwICE9PSB1bmRlZmluZWQgPyB0aGlzLmxhdDAgOiAwO1xuXG4gIHRoaXMuY2diID0gW107XG4gIHRoaXMuY2JnID0gW107XG4gIHRoaXMudXRnID0gW107XG4gIHRoaXMuZ3R1ID0gW107XG5cbiAgdmFyIGYgPSB0aGlzLmVzIC8gKDEgKyBNYXRoLnNxcnQoMSAtIHRoaXMuZXMpKTtcbiAgdmFyIG4gPSBmIC8gKDIgLSBmKTtcbiAgdmFyIG5wID0gbjtcblxuICB0aGlzLmNnYlswXSA9IG4gKiAoMiArIG4gKiAoLTIgLyAzICsgbiAqICgtMiArIG4gKiAoMTE2IC8gNDUgKyBuICogKDI2IC8gNDUgKyBuICogKC0yODU0IC8gNjc1ICkpKSkpKTtcbiAgdGhpcy5jYmdbMF0gPSBuICogKC0yICsgbiAqICggMiAvIDMgKyBuICogKCA0IC8gMyArIG4gKiAoLTgyIC8gNDUgKyBuICogKDMyIC8gNDUgKyBuICogKDQ2NDIgLyA0NzI1KSkpKSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLmNnYlsxXSA9IG5wICogKDcgLyAzICsgbiAqICgtOCAvIDUgKyBuICogKC0yMjcgLyA0NSArIG4gKiAoMjcwNCAvIDMxNSArIG4gKiAoMjMyMyAvIDk0NSkpKSkpO1xuICB0aGlzLmNiZ1sxXSA9IG5wICogKDUgLyAzICsgbiAqICgtMTYgLyAxNSArIG4gKiAoIC0xMyAvIDkgKyBuICogKDkwNCAvIDMxNSArIG4gKiAoLTE1MjIgLyA5NDUpKSkpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy5jZ2JbMl0gPSBucCAqICg1NiAvIDE1ICsgbiAqICgtMTM2IC8gMzUgKyBuICogKC0xMjYyIC8gMTA1ICsgbiAqICg3MzgxNCAvIDI4MzUpKSkpO1xuICB0aGlzLmNiZ1syXSA9IG5wICogKC0yNiAvIDE1ICsgbiAqICgzNCAvIDIxICsgbiAqICg4IC8gNSArIG4gKiAoLTEyNjg2IC8gMjgzNSkpKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMuY2diWzNdID0gbnAgKiAoNDI3OSAvIDYzMCArIG4gKiAoLTMzMiAvIDM1ICsgbiAqICgtMzk5NTcyIC8gMTQxNzUpKSk7XG4gIHRoaXMuY2JnWzNdID0gbnAgKiAoMTIzNyAvIDYzMCArIG4gKiAoLTEyIC8gNSArIG4gKiAoIC0yNDgzMiAvIDE0MTc1KSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLmNnYls0XSA9IG5wICogKDQxNzQgLyAzMTUgKyBuICogKC0xNDQ4MzggLyA2MjM3KSk7XG4gIHRoaXMuY2JnWzRdID0gbnAgKiAoLTczNCAvIDMxNSArIG4gKiAoMTA5NTk4IC8gMzExODUpKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy5jZ2JbNV0gPSBucCAqICg2MDE2NzYgLyAyMjI3NSk7XG4gIHRoaXMuY2JnWzVdID0gbnAgKiAoNDQ0MzM3IC8gMTU1OTI1KTtcblxuICBucCA9IE1hdGgucG93KG4sIDIpO1xuICB0aGlzLlFuID0gdGhpcy5rMCAvICgxICsgbikgKiAoMSArIG5wICogKDEgLyA0ICsgbnAgKiAoMSAvIDY0ICsgbnAgLyAyNTYpKSk7XG5cbiAgdGhpcy51dGdbMF0gPSBuICogKC0wLjUgKyBuICogKCAyIC8gMyArIG4gKiAoLTM3IC8gOTYgKyBuICogKCAxIC8gMzYwICsgbiAqICg4MSAvIDUxMiArIG4gKiAoLTk2MTk5IC8gNjA0ODAwKSkpKSkpO1xuICB0aGlzLmd0dVswXSA9IG4gKiAoMC41ICsgbiAqICgtMiAvIDMgKyBuICogKDUgLyAxNiArIG4gKiAoNDEgLyAxODAgKyBuICogKC0xMjcgLyAyODggKyBuICogKDc4OTEgLyAzNzgwMCkpKSkpKTtcblxuICB0aGlzLnV0Z1sxXSA9IG5wICogKC0xIC8gNDggKyBuICogKC0xIC8gMTUgKyBuICogKDQzNyAvIDE0NDAgKyBuICogKC00NiAvIDEwNSArIG4gKiAoMTExODcxMSAvIDM4NzA3MjApKSkpKTtcbiAgdGhpcy5ndHVbMV0gPSBucCAqICgxMyAvIDQ4ICsgbiAqICgtMyAvIDUgKyBuICogKDU1NyAvIDE0NDAgKyBuICogKDI4MSAvIDYzMCArIG4gKiAoLTE5ODM0MzMgLyAxOTM1MzYwKSkpKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMudXRnWzJdID0gbnAgKiAoLTE3IC8gNDgwICsgbiAqICgzNyAvIDg0MCArIG4gKiAoMjA5IC8gNDQ4MCArIG4gKiAoLTU1NjkgLyA5MDcyMCApKSkpO1xuICB0aGlzLmd0dVsyXSA9IG5wICogKDYxIC8gMjQwICsgbiAqICgtMTAzIC8gMTQwICsgbiAqICgxNTA2MSAvIDI2ODgwICsgbiAqICgxNjc2MDMgLyAxODE0NDApKSkpO1xuXG4gIG5wID0gbnAgKiBuO1xuICB0aGlzLnV0Z1szXSA9IG5wICogKC00Mzk3IC8gMTYxMjgwICsgbiAqICgxMSAvIDUwNCArIG4gKiAoODMwMjUxIC8gNzI1NzYwMCkpKTtcbiAgdGhpcy5ndHVbM10gPSBucCAqICg0OTU2MSAvIDE2MTI4MCArIG4gKiAoLTE3OSAvIDE2OCArIG4gKiAoNjYwMTY2MSAvIDcyNTc2MDApKSk7XG5cbiAgbnAgPSBucCAqIG47XG4gIHRoaXMudXRnWzRdID0gbnAgKiAoLTQ1ODMgLyAxNjEyODAgKyBuICogKDEwODg0NyAvIDM5OTE2ODApKTtcbiAgdGhpcy5ndHVbNF0gPSBucCAqICgzNDcyOSAvIDgwNjQwICsgbiAqICgtMzQxODg4OSAvIDE5OTU4NDApKTtcblxuICBucCA9IG5wICogbjtcbiAgdGhpcy51dGdbNV0gPSBucCAqICgtMjA2NDg2OTMgLyA2Mzg2Njg4MDApO1xuICB0aGlzLmd0dVs1XSA9IG5wICogKDIxMjM3ODk0MSAvIDMxOTMzNDQwMCk7XG5cbiAgdmFyIFogPSBnYXRnKHRoaXMuY2JnLCB0aGlzLmxhdDApO1xuICB0aGlzLlpiID0gLXRoaXMuUW4gKiAoWiArIGNsZW5zKHRoaXMuZ3R1LCAyICogWikpO1xufVxuXG5mdW5jdGlvbiBmb3J3YXJkJHIocCkge1xuICB2YXIgQ2UgPSBhZGp1c3RfbG9uKHAueCAtIHRoaXMubG9uZzApO1xuICB2YXIgQ24gPSBwLnk7XG5cbiAgQ24gPSBnYXRnKHRoaXMuY2JnLCBDbik7XG4gIHZhciBzaW5fQ24gPSBNYXRoLnNpbihDbik7XG4gIHZhciBjb3NfQ24gPSBNYXRoLmNvcyhDbik7XG4gIHZhciBzaW5fQ2UgPSBNYXRoLnNpbihDZSk7XG4gIHZhciBjb3NfQ2UgPSBNYXRoLmNvcyhDZSk7XG5cbiAgQ24gPSBNYXRoLmF0YW4yKHNpbl9DbiwgY29zX0NlICogY29zX0NuKTtcbiAgQ2UgPSBNYXRoLmF0YW4yKHNpbl9DZSAqIGNvc19DbiwgaHlwb3Qoc2luX0NuLCBjb3NfQ24gKiBjb3NfQ2UpKTtcbiAgQ2UgPSBhc2luaHkoTWF0aC50YW4oQ2UpKTtcblxuICB2YXIgdG1wID0gY2xlbnNfY21wbHgodGhpcy5ndHUsIDIgKiBDbiwgMiAqIENlKTtcblxuICBDbiA9IENuICsgdG1wWzBdO1xuICBDZSA9IENlICsgdG1wWzFdO1xuXG4gIHZhciB4O1xuICB2YXIgeTtcblxuICBpZiAoTWF0aC5hYnMoQ2UpIDw9IDIuNjIzMzk1MTYyNzc4KSB7XG4gICAgeCA9IHRoaXMuYSAqICh0aGlzLlFuICogQ2UpICsgdGhpcy54MDtcbiAgICB5ID0gdGhpcy5hICogKHRoaXMuUW4gKiBDbiArIHRoaXMuWmIpICsgdGhpcy55MDtcbiAgfVxuICBlbHNlIHtcbiAgICB4ID0gSW5maW5pdHk7XG4gICAgeSA9IEluZmluaXR5O1xuICB9XG5cbiAgcC54ID0geDtcbiAgcC55ID0geTtcblxuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gaW52ZXJzZSRyKHApIHtcbiAgdmFyIENlID0gKHAueCAtIHRoaXMueDApICogKDEgLyB0aGlzLmEpO1xuICB2YXIgQ24gPSAocC55IC0gdGhpcy55MCkgKiAoMSAvIHRoaXMuYSk7XG5cbiAgQ24gPSAoQ24gLSB0aGlzLlpiKSAvIHRoaXMuUW47XG4gIENlID0gQ2UgLyB0aGlzLlFuO1xuXG4gIHZhciBsb247XG4gIHZhciBsYXQ7XG5cbiAgaWYgKE1hdGguYWJzKENlKSA8PSAyLjYyMzM5NTE2Mjc3OCkge1xuICAgIHZhciB0bXAgPSBjbGVuc19jbXBseCh0aGlzLnV0ZywgMiAqIENuLCAyICogQ2UpO1xuXG4gICAgQ24gPSBDbiArIHRtcFswXTtcbiAgICBDZSA9IENlICsgdG1wWzFdO1xuICAgIENlID0gTWF0aC5hdGFuKHNpbmgoQ2UpKTtcblxuICAgIHZhciBzaW5fQ24gPSBNYXRoLnNpbihDbik7XG4gICAgdmFyIGNvc19DbiA9IE1hdGguY29zKENuKTtcbiAgICB2YXIgc2luX0NlID0gTWF0aC5zaW4oQ2UpO1xuICAgIHZhciBjb3NfQ2UgPSBNYXRoLmNvcyhDZSk7XG5cbiAgICBDbiA9IE1hdGguYXRhbjIoc2luX0NuICogY29zX0NlLCBoeXBvdChzaW5fQ2UsIGNvc19DZSAqIGNvc19DbikpO1xuICAgIENlID0gTWF0aC5hdGFuMihzaW5fQ2UsIGNvc19DZSAqIGNvc19Dbik7XG5cbiAgICBsb24gPSBhZGp1c3RfbG9uKENlICsgdGhpcy5sb25nMCk7XG4gICAgbGF0ID0gZ2F0Zyh0aGlzLmNnYiwgQ24pO1xuICB9XG4gIGVsc2Uge1xuICAgIGxvbiA9IEluZmluaXR5O1xuICAgIGxhdCA9IEluZmluaXR5O1xuICB9XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG5cbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRzID0gW1wiRXh0ZW5kZWRfVHJhbnN2ZXJzZV9NZXJjYXRvclwiLCBcIkV4dGVuZGVkIFRyYW5zdmVyc2UgTWVyY2F0b3JcIiwgXCJldG1lcmNcIiwgXCJUcmFuc3ZlcnNlX01lcmNhdG9yXCIsIFwiVHJhbnN2ZXJzZSBNZXJjYXRvclwiLCBcIkdhdXNzIEtydWdlclwiLCBcIkdhdXNzX0tydWdlclwiLCBcInRtZXJjXCJdO1xudmFyIGV0bWVyYyA9IHtcbiAgaW5pdDogaW5pdCRzLFxuICBmb3J3YXJkOiBmb3J3YXJkJHIsXG4gIGludmVyc2U6IGludmVyc2UkcixcbiAgbmFtZXM6IG5hbWVzJHNcbn07XG5cbmZ1bmN0aW9uIGFkanVzdF96b25lKHpvbmUsIGxvbikge1xuICBpZiAoem9uZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgem9uZSA9IE1hdGguZmxvb3IoKGFkanVzdF9sb24obG9uKSArIE1hdGguUEkpICogMzAgLyBNYXRoLlBJKSArIDE7XG5cbiAgICBpZiAoem9uZSA8IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAoem9uZSA+IDYwKSB7XG4gICAgICByZXR1cm4gNjA7XG4gICAgfVxuICB9XG4gIHJldHVybiB6b25lO1xufVxuXG52YXIgZGVwZW5kc09uID0gJ2V0bWVyYyc7XG5cblxuZnVuY3Rpb24gaW5pdCRyKCkge1xuICB2YXIgem9uZSA9IGFkanVzdF96b25lKHRoaXMuem9uZSwgdGhpcy5sb25nMCk7XG4gIGlmICh6b25lID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gdXRtIHpvbmUnKTtcbiAgfVxuICB0aGlzLmxhdDAgPSAwO1xuICB0aGlzLmxvbmcwID0gICgoNiAqIE1hdGguYWJzKHpvbmUpKSAtIDE4MykgKiBEMlIkMTtcbiAgdGhpcy54MCA9IDUwMDAwMDtcbiAgdGhpcy55MCA9IHRoaXMudXRtU291dGggPyAxMDAwMDAwMCA6IDA7XG4gIHRoaXMuazAgPSAwLjk5OTY7XG5cbiAgZXRtZXJjLmluaXQuYXBwbHkodGhpcyk7XG4gIHRoaXMuZm9yd2FyZCA9IGV0bWVyYy5mb3J3YXJkO1xuICB0aGlzLmludmVyc2UgPSBldG1lcmMuaW52ZXJzZTtcbn1cblxudmFyIG5hbWVzJHIgPSBbXCJVbml2ZXJzYWwgVHJhbnN2ZXJzZSBNZXJjYXRvciBTeXN0ZW1cIiwgXCJ1dG1cIl07XG52YXIgdXRtID0ge1xuICBpbml0OiBpbml0JHIsXG4gIG5hbWVzOiBuYW1lcyRyLFxuICBkZXBlbmRzT246IGRlcGVuZHNPblxufTtcblxuZnVuY3Rpb24gc3JhdChlc2lucCwgZXhwKSB7XG4gIHJldHVybiAoTWF0aC5wb3coKDEgLSBlc2lucCkgLyAoMSArIGVzaW5wKSwgZXhwKSk7XG59XG5cbnZhciBNQVhfSVRFUiQyID0gMjA7XG5cbmZ1bmN0aW9uIGluaXQkcSgpIHtcbiAgdmFyIHNwaGkgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICB2YXIgY3BoaSA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gIGNwaGkgKj0gY3BoaTtcbiAgdGhpcy5yYyA9IE1hdGguc3FydCgxIC0gdGhpcy5lcykgLyAoMSAtIHRoaXMuZXMgKiBzcGhpICogc3BoaSk7XG4gIHRoaXMuQyA9IE1hdGguc3FydCgxICsgdGhpcy5lcyAqIGNwaGkgKiBjcGhpIC8gKDEgLSB0aGlzLmVzKSk7XG4gIHRoaXMucGhpYzAgPSBNYXRoLmFzaW4oc3BoaSAvIHRoaXMuQyk7XG4gIHRoaXMucmF0ZXhwID0gMC41ICogdGhpcy5DICogdGhpcy5lO1xuICB0aGlzLksgPSBNYXRoLnRhbigwLjUgKiB0aGlzLnBoaWMwICsgRk9SVFBJKSAvIChNYXRoLnBvdyhNYXRoLnRhbigwLjUgKiB0aGlzLmxhdDAgKyBGT1JUUEkpLCB0aGlzLkMpICogc3JhdCh0aGlzLmUgKiBzcGhpLCB0aGlzLnJhdGV4cCkpO1xufVxuXG5mdW5jdGlvbiBmb3J3YXJkJHEocCkge1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIHAueSA9IDIgKiBNYXRoLmF0YW4odGhpcy5LICogTWF0aC5wb3coTWF0aC50YW4oMC41ICogbGF0ICsgRk9SVFBJKSwgdGhpcy5DKSAqIHNyYXQodGhpcy5lICogTWF0aC5zaW4obGF0KSwgdGhpcy5yYXRleHApKSAtIEhBTEZfUEk7XG4gIHAueCA9IHRoaXMuQyAqIGxvbjtcbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGludmVyc2UkcShwKSB7XG4gIHZhciBERUxfVE9MID0gMWUtMTQ7XG4gIHZhciBsb24gPSBwLnggLyB0aGlzLkM7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBudW0gPSBNYXRoLnBvdyhNYXRoLnRhbigwLjUgKiBsYXQgKyBGT1JUUEkpIC8gdGhpcy5LLCAxIC8gdGhpcy5DKTtcbiAgZm9yICh2YXIgaSA9IE1BWF9JVEVSJDI7IGkgPiAwOyAtLWkpIHtcbiAgICBsYXQgPSAyICogTWF0aC5hdGFuKG51bSAqIHNyYXQodGhpcy5lICogTWF0aC5zaW4ocC55KSwgLSAwLjUgKiB0aGlzLmUpKSAtIEhBTEZfUEk7XG4gICAgaWYgKE1hdGguYWJzKGxhdCAtIHAueSkgPCBERUxfVE9MKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcC55ID0gbGF0O1xuICB9XG4gIC8qIGNvbnZlcmdlbmNlIGZhaWxlZCAqL1xuICBpZiAoIWkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRxID0gW1wiZ2F1c3NcIl07XG52YXIgZ2F1c3MgPSB7XG4gIGluaXQ6IGluaXQkcSxcbiAgZm9yd2FyZDogZm9yd2FyZCRxLFxuICBpbnZlcnNlOiBpbnZlcnNlJHEsXG4gIG5hbWVzOiBuYW1lcyRxXG59O1xuXG5mdW5jdGlvbiBpbml0JHAoKSB7XG4gIGdhdXNzLmluaXQuYXBwbHkodGhpcyk7XG4gIGlmICghdGhpcy5yYykge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNpbmMwID0gTWF0aC5zaW4odGhpcy5waGljMCk7XG4gIHRoaXMuY29zYzAgPSBNYXRoLmNvcyh0aGlzLnBoaWMwKTtcbiAgdGhpcy5SMiA9IDIgKiB0aGlzLnJjO1xuICBpZiAoIXRoaXMudGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gXCJPYmxpcXVlIFN0ZXJlb2dyYXBoaWMgQWx0ZXJuYXRpdmVcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3J3YXJkJHAocCkge1xuICB2YXIgc2luYywgY29zYywgY29zbCwgaztcbiAgcC54ID0gYWRqdXN0X2xvbihwLnggLSB0aGlzLmxvbmcwKTtcbiAgZ2F1c3MuZm9yd2FyZC5hcHBseSh0aGlzLCBbcF0pO1xuICBzaW5jID0gTWF0aC5zaW4ocC55KTtcbiAgY29zYyA9IE1hdGguY29zKHAueSk7XG4gIGNvc2wgPSBNYXRoLmNvcyhwLngpO1xuICBrID0gdGhpcy5rMCAqIHRoaXMuUjIgLyAoMSArIHRoaXMuc2luYzAgKiBzaW5jICsgdGhpcy5jb3NjMCAqIGNvc2MgKiBjb3NsKTtcbiAgcC54ID0gayAqIGNvc2MgKiBNYXRoLnNpbihwLngpO1xuICBwLnkgPSBrICogKHRoaXMuY29zYzAgKiBzaW5jIC0gdGhpcy5zaW5jMCAqIGNvc2MgKiBjb3NsKTtcbiAgcC54ID0gdGhpcy5hICogcC54ICsgdGhpcy54MDtcbiAgcC55ID0gdGhpcy5hICogcC55ICsgdGhpcy55MDtcbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGludmVyc2UkcChwKSB7XG4gIHZhciBzaW5jLCBjb3NjLCBsb24sIGxhdCwgcmhvO1xuICBwLnggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmE7XG4gIHAueSA9IChwLnkgLSB0aGlzLnkwKSAvIHRoaXMuYTtcblxuICBwLnggLz0gdGhpcy5rMDtcbiAgcC55IC89IHRoaXMuazA7XG4gIGlmICgocmhvID0gaHlwb3QocC54LCBwLnkpKSkge1xuICAgIHZhciBjID0gMiAqIE1hdGguYXRhbjIocmhvLCB0aGlzLlIyKTtcbiAgICBzaW5jID0gTWF0aC5zaW4oYyk7XG4gICAgY29zYyA9IE1hdGguY29zKGMpO1xuICAgIGxhdCA9IE1hdGguYXNpbihjb3NjICogdGhpcy5zaW5jMCArIHAueSAqIHNpbmMgKiB0aGlzLmNvc2MwIC8gcmhvKTtcbiAgICBsb24gPSBNYXRoLmF0YW4yKHAueCAqIHNpbmMsIHJobyAqIHRoaXMuY29zYzAgKiBjb3NjIC0gcC55ICogdGhpcy5zaW5jMCAqIHNpbmMpO1xuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IHRoaXMucGhpYzA7XG4gICAgbG9uID0gMDtcbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICBnYXVzcy5pbnZlcnNlLmFwcGx5KHRoaXMsIFtwXSk7XG4gIHAueCA9IGFkanVzdF9sb24ocC54ICsgdGhpcy5sb25nMCk7XG4gIHJldHVybiBwO1xufVxuXG52YXIgbmFtZXMkcCA9IFtcIlN0ZXJlb2dyYXBoaWNfTm9ydGhfUG9sZVwiLCBcIk9ibGlxdWVfU3RlcmVvZ3JhcGhpY1wiLCBcInN0ZXJlYVwiLFwiT2JsaXF1ZSBTdGVyZW9ncmFwaGljIEFsdGVybmF0aXZlXCIsXCJEb3VibGVfU3RlcmVvZ3JhcGhpY1wiXTtcbnZhciBzdGVyZWEgPSB7XG4gIGluaXQ6IGluaXQkcCxcbiAgZm9yd2FyZDogZm9yd2FyZCRwLFxuICBpbnZlcnNlOiBpbnZlcnNlJHAsXG4gIG5hbWVzOiBuYW1lcyRwXG59O1xuXG5mdW5jdGlvbiBzc2ZuXyhwaGl0LCBzaW5waGksIGVjY2VuKSB7XG4gIHNpbnBoaSAqPSBlY2NlbjtcbiAgcmV0dXJuIChNYXRoLnRhbigwLjUgKiAoSEFMRl9QSSArIHBoaXQpKSAqIE1hdGgucG93KCgxIC0gc2lucGhpKSAvICgxICsgc2lucGhpKSwgMC41ICogZWNjZW4pKTtcbn1cblxuZnVuY3Rpb24gaW5pdCRvKCkge1xuXG4gIC8vIHNldHRpbmcgZGVmYXVsdCBwYXJhbWV0ZXJzXG4gIHRoaXMueDAgPSB0aGlzLngwIHx8IDA7XG4gIHRoaXMueTAgPSB0aGlzLnkwIHx8IDA7XG4gIHRoaXMubGF0MCA9IHRoaXMubGF0MCB8fCAwO1xuICB0aGlzLmxvbmcwID0gdGhpcy5sb25nMCB8fCAwO1xuXG4gIHRoaXMuY29zbGF0MCA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gIHRoaXMuc2lubGF0MCA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGlmICh0aGlzLmswID09PSAxICYmICFpc05hTih0aGlzLmxhdF90cykgJiYgTWF0aC5hYnModGhpcy5jb3NsYXQwKSA8PSBFUFNMTikge1xuICAgICAgdGhpcy5rMCA9IDAuNSAqICgxICsgc2lnbih0aGlzLmxhdDApICogTWF0aC5zaW4odGhpcy5sYXRfdHMpKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPD0gRVBTTE4pIHtcbiAgICAgIGlmICh0aGlzLmxhdDAgPiAwKSB7XG4gICAgICAgIC8vTm9ydGggcG9sZVxuICAgICAgICAvL3RyYWNlKCdzdGVyZTpub3J0aCBwb2xlJyk7XG4gICAgICAgIHRoaXMuY29uID0gMTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvL1NvdXRoIHBvbGVcbiAgICAgICAgLy90cmFjZSgnc3RlcmU6c291dGggcG9sZScpO1xuICAgICAgICB0aGlzLmNvbiA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnMgPSBNYXRoLnNxcnQoTWF0aC5wb3coMSArIHRoaXMuZSwgMSArIHRoaXMuZSkgKiBNYXRoLnBvdygxIC0gdGhpcy5lLCAxIC0gdGhpcy5lKSk7XG4gICAgaWYgKHRoaXMuazAgPT09IDEgJiYgIWlzTmFOKHRoaXMubGF0X3RzKSAmJiBNYXRoLmFicyh0aGlzLmNvc2xhdDApIDw9IEVQU0xOICYmIE1hdGguYWJzKE1hdGguY29zKHRoaXMubGF0X3RzKSkgPiBFUFNMTikge1xuICAgICAgLy8gV2hlbiBrMCBpcyAxIChkZWZhdWx0IHZhbHVlKSBhbmQgbGF0X3RzIGlzIGEgdmFpbGQgbnVtYmVyIGFuZCBsYXQwIGlzIGF0IGEgcG9sZSBhbmQgbGF0X3RzIGlzIG5vdCBhdCBhIHBvbGVcbiAgICAgIC8vIFJlY2FsY3VsYXRlIGswIHVzaW5nIGZvcm11bGEgMjEtMzUgZnJvbSBwMTYxIG9mIFNueWRlciwgMTk4N1xuICAgICAgdGhpcy5rMCA9IDAuNSAqIHRoaXMuY29ucyAqIG1zZm56KHRoaXMuZSwgTWF0aC5zaW4odGhpcy5sYXRfdHMpLCBNYXRoLmNvcyh0aGlzLmxhdF90cykpIC8gdHNmbnoodGhpcy5lLCB0aGlzLmNvbiAqIHRoaXMubGF0X3RzLCB0aGlzLmNvbiAqIE1hdGguc2luKHRoaXMubGF0X3RzKSk7XG4gICAgfVxuICAgIHRoaXMubXMxID0gbXNmbnoodGhpcy5lLCB0aGlzLnNpbmxhdDAsIHRoaXMuY29zbGF0MCk7XG4gICAgdGhpcy5YMCA9IDIgKiBNYXRoLmF0YW4odGhpcy5zc2ZuXyh0aGlzLmxhdDAsIHRoaXMuc2lubGF0MCwgdGhpcy5lKSkgLSBIQUxGX1BJO1xuICAgIHRoaXMuY29zWDAgPSBNYXRoLmNvcyh0aGlzLlgwKTtcbiAgICB0aGlzLnNpblgwID0gTWF0aC5zaW4odGhpcy5YMCk7XG4gIH1cbn1cblxuLy8gU3RlcmVvZ3JhcGhpYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbmZ1bmN0aW9uIGZvcndhcmQkbyhwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBzaW5sYXQgPSBNYXRoLnNpbihsYXQpO1xuICB2YXIgY29zbGF0ID0gTWF0aC5jb3MobGF0KTtcbiAgdmFyIEEsIFgsIHNpblgsIGNvc1gsIHRzLCByaDtcbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuXG4gIGlmIChNYXRoLmFicyhNYXRoLmFicyhsb24gLSB0aGlzLmxvbmcwKSAtIE1hdGguUEkpIDw9IEVQU0xOICYmIE1hdGguYWJzKGxhdCArIHRoaXMubGF0MCkgPD0gRVBTTE4pIHtcbiAgICAvL2Nhc2Ugb2YgdGhlIG9yaWdpbmUgcG9pbnRcbiAgICAvL3RyYWNlKCdzdGVyZTp0aGlzIGlzIHRoZSBvcmlnaW4gcG9pbnQnKTtcbiAgICBwLnggPSBOYU47XG4gICAgcC55ID0gTmFOO1xuICAgIHJldHVybiBwO1xuICB9XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIC8vdHJhY2UoJ3N0ZXJlOnNwaGVyZSBjYXNlJyk7XG4gICAgQSA9IDIgKiB0aGlzLmswIC8gKDEgKyB0aGlzLnNpbmxhdDAgKiBzaW5sYXQgKyB0aGlzLmNvc2xhdDAgKiBjb3NsYXQgKiBNYXRoLmNvcyhkbG9uKSk7XG4gICAgcC54ID0gdGhpcy5hICogQSAqIGNvc2xhdCAqIE1hdGguc2luKGRsb24pICsgdGhpcy54MDtcbiAgICBwLnkgPSB0aGlzLmEgKiBBICogKHRoaXMuY29zbGF0MCAqIHNpbmxhdCAtIHRoaXMuc2lubGF0MCAqIGNvc2xhdCAqIE1hdGguY29zKGRsb24pKSArIHRoaXMueTA7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgWCA9IDIgKiBNYXRoLmF0YW4odGhpcy5zc2ZuXyhsYXQsIHNpbmxhdCwgdGhpcy5lKSkgLSBIQUxGX1BJO1xuICAgIGNvc1ggPSBNYXRoLmNvcyhYKTtcbiAgICBzaW5YID0gTWF0aC5zaW4oWCk7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuY29zbGF0MCkgPD0gRVBTTE4pIHtcbiAgICAgIHRzID0gdHNmbnoodGhpcy5lLCBsYXQgKiB0aGlzLmNvbiwgdGhpcy5jb24gKiBzaW5sYXQpO1xuICAgICAgcmggPSAyICogdGhpcy5hICogdGhpcy5rMCAqIHRzIC8gdGhpcy5jb25zO1xuICAgICAgcC54ID0gdGhpcy54MCArIHJoICogTWF0aC5zaW4obG9uIC0gdGhpcy5sb25nMCk7XG4gICAgICBwLnkgPSB0aGlzLnkwIC0gdGhpcy5jb24gKiByaCAqIE1hdGguY29zKGxvbiAtIHRoaXMubG9uZzApO1xuICAgICAgLy90cmFjZShwLnRvU3RyaW5nKCkpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuc2lubGF0MCkgPCBFUFNMTikge1xuICAgICAgLy9FcVxuICAgICAgLy90cmFjZSgnc3RlcmU6ZXF1YXRldXInKTtcbiAgICAgIEEgPSAyICogdGhpcy5hICogdGhpcy5rMCAvICgxICsgY29zWCAqIE1hdGguY29zKGRsb24pKTtcbiAgICAgIHAueSA9IEEgKiBzaW5YO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vb3RoZXIgY2FzZVxuICAgICAgLy90cmFjZSgnc3RlcmU6bm9ybWFsIGNhc2UnKTtcbiAgICAgIEEgPSAyICogdGhpcy5hICogdGhpcy5rMCAqIHRoaXMubXMxIC8gKHRoaXMuY29zWDAgKiAoMSArIHRoaXMuc2luWDAgKiBzaW5YICsgdGhpcy5jb3NYMCAqIGNvc1ggKiBNYXRoLmNvcyhkbG9uKSkpO1xuICAgICAgcC55ID0gQSAqICh0aGlzLmNvc1gwICogc2luWCAtIHRoaXMuc2luWDAgKiBjb3NYICogTWF0aC5jb3MoZGxvbikpICsgdGhpcy55MDtcbiAgICB9XG4gICAgcC54ID0gQSAqIGNvc1ggKiBNYXRoLnNpbihkbG9uKSArIHRoaXMueDA7XG4gIH1cbiAgLy90cmFjZShwLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gcDtcbn1cblxuLy8qIFN0ZXJlb2dyYXBoaWMgaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG5mdW5jdGlvbiBpbnZlcnNlJG8ocCkge1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHZhciBsb24sIGxhdCwgdHMsIGNlLCBDaGk7XG4gIHZhciByaCA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4ocmggLyAoMiAqIHRoaXMuYSAqIHRoaXMuazApKTtcbiAgICBsb24gPSB0aGlzLmxvbmcwO1xuICAgIGxhdCA9IHRoaXMubGF0MDtcbiAgICBpZiAocmggPD0gRVBTTE4pIHtcbiAgICAgIHAueCA9IGxvbjtcbiAgICAgIHAueSA9IGxhdDtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBsYXQgPSBNYXRoLmFzaW4oTWF0aC5jb3MoYykgKiB0aGlzLnNpbmxhdDAgKyBwLnkgKiBNYXRoLnNpbihjKSAqIHRoaXMuY29zbGF0MCAvIHJoKTtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5jb3NsYXQwKSA8IEVQU0xOKSB7XG4gICAgICBpZiAodGhpcy5sYXQwID4gMCkge1xuICAgICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCwgLSAxICogcC55KSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIHAueSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54ICogTWF0aC5zaW4oYyksIHJoICogdGhpcy5jb3NsYXQwICogTWF0aC5jb3MoYykgLSBwLnkgKiB0aGlzLnNpbmxhdDAgKiBNYXRoLnNpbihjKSkpO1xuICAgIH1cbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmIChNYXRoLmFicyh0aGlzLmNvc2xhdDApIDw9IEVQU0xOKSB7XG4gICAgICBpZiAocmggPD0gRVBTTE4pIHtcbiAgICAgICAgbGF0ID0gdGhpcy5sYXQwO1xuICAgICAgICBsb24gPSB0aGlzLmxvbmcwO1xuICAgICAgICBwLnggPSBsb247XG4gICAgICAgIHAueSA9IGxhdDtcbiAgICAgICAgLy90cmFjZShwLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH1cbiAgICAgIHAueCAqPSB0aGlzLmNvbjtcbiAgICAgIHAueSAqPSB0aGlzLmNvbjtcbiAgICAgIHRzID0gcmggKiB0aGlzLmNvbnMgLyAoMiAqIHRoaXMuYSAqIHRoaXMuazApO1xuICAgICAgbGF0ID0gdGhpcy5jb24gKiBwaGkyeih0aGlzLmUsIHRzKTtcbiAgICAgIGxvbiA9IHRoaXMuY29uICogYWRqdXN0X2xvbih0aGlzLmNvbiAqIHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCwgLSAxICogcC55KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY2UgPSAyICogTWF0aC5hdGFuKHJoICogdGhpcy5jb3NYMCAvICgyICogdGhpcy5hICogdGhpcy5rMCAqIHRoaXMubXMxKSk7XG4gICAgICBsb24gPSB0aGlzLmxvbmcwO1xuICAgICAgaWYgKHJoIDw9IEVQU0xOKSB7XG4gICAgICAgIENoaSA9IHRoaXMuWDA7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgQ2hpID0gTWF0aC5hc2luKE1hdGguY29zKGNlKSAqIHRoaXMuc2luWDAgKyBwLnkgKiBNYXRoLnNpbihjZSkgKiB0aGlzLmNvc1gwIC8gcmgpO1xuICAgICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKHAueCAqIE1hdGguc2luKGNlKSwgcmggKiB0aGlzLmNvc1gwICogTWF0aC5jb3MoY2UpIC0gcC55ICogdGhpcy5zaW5YMCAqIE1hdGguc2luKGNlKSkpO1xuICAgICAgfVxuICAgICAgbGF0ID0gLTEgKiBwaGkyeih0aGlzLmUsIE1hdGgudGFuKDAuNSAqIChIQUxGX1BJICsgQ2hpKSkpO1xuICAgIH1cbiAgfVxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcblxuICAvL3RyYWNlKHAudG9TdHJpbmcoKSk7XG4gIHJldHVybiBwO1xuXG59XG5cbnZhciBuYW1lcyRvID0gW1wic3RlcmVcIiwgXCJTdGVyZW9ncmFwaGljX1NvdXRoX1BvbGVcIiwgXCJQb2xhciBTdGVyZW9ncmFwaGljICh2YXJpYW50IEIpXCIsIFwiUG9sYXJfU3RlcmVvZ3JhcGhpY1wiXTtcbnZhciBzdGVyZSA9IHtcbiAgaW5pdDogaW5pdCRvLFxuICBmb3J3YXJkOiBmb3J3YXJkJG8sXG4gIGludmVyc2U6IGludmVyc2UkbyxcbiAgbmFtZXM6IG5hbWVzJG8sXG4gIHNzZm5fOiBzc2ZuX1xufTtcblxuLypcbiAgcmVmZXJlbmNlczpcbiAgICBGb3JtdWxlcyBldCBjb25zdGFudGVzIHBvdXIgbGUgQ2FsY3VsIHBvdXIgbGFcbiAgICBwcm9qZWN0aW9uIGN5bGluZHJpcXVlIGNvbmZvcm1lIMOgIGF4ZSBvYmxpcXVlIGV0IHBvdXIgbGEgdHJhbnNmb3JtYXRpb24gZW50cmVcbiAgICBkZXMgc3lzdMOobWVzIGRlIHLDqWbDqXJlbmNlLlxuICAgIGh0dHA6Ly93d3cuc3dpc3N0b3BvLmFkbWluLmNoL2ludGVybmV0L3N3aXNzdG9wby9mci9ob21lL3RvcGljcy9zdXJ2ZXkvc3lzL3JlZnN5cy9zd2l0emVybGFuZC5wYXJzeXNyZWxhdGVkMS4zMTIxNi5kb3dubG9hZExpc3QuNzcwMDQuRG93bmxvYWRGaWxlLnRtcC9zd2lzc3Byb2plY3Rpb25mci5wZGZcbiAgKi9cblxuZnVuY3Rpb24gaW5pdCRuKCkge1xuICB2YXIgcGh5MCA9IHRoaXMubGF0MDtcbiAgdGhpcy5sYW1iZGEwID0gdGhpcy5sb25nMDtcbiAgdmFyIHNpblBoeTAgPSBNYXRoLnNpbihwaHkwKTtcbiAgdmFyIHNlbWlNYWpvckF4aXMgPSB0aGlzLmE7XG4gIHZhciBpbnZGID0gdGhpcy5yZjtcbiAgdmFyIGZsYXR0ZW5pbmcgPSAxIC8gaW52RjtcbiAgdmFyIGUyID0gMiAqIGZsYXR0ZW5pbmcgLSBNYXRoLnBvdyhmbGF0dGVuaW5nLCAyKTtcbiAgdmFyIGUgPSB0aGlzLmUgPSBNYXRoLnNxcnQoZTIpO1xuICB0aGlzLlIgPSB0aGlzLmswICogc2VtaU1ham9yQXhpcyAqIE1hdGguc3FydCgxIC0gZTIpIC8gKDEgLSBlMiAqIE1hdGgucG93KHNpblBoeTAsIDIpKTtcbiAgdGhpcy5hbHBoYSA9IE1hdGguc3FydCgxICsgZTIgLyAoMSAtIGUyKSAqIE1hdGgucG93KE1hdGguY29zKHBoeTApLCA0KSk7XG4gIHRoaXMuYjAgPSBNYXRoLmFzaW4oc2luUGh5MCAvIHRoaXMuYWxwaGEpO1xuICB2YXIgazEgPSBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCArIHRoaXMuYjAgLyAyKSk7XG4gIHZhciBrMiA9IE1hdGgubG9nKE1hdGgudGFuKE1hdGguUEkgLyA0ICsgcGh5MCAvIDIpKTtcbiAgdmFyIGszID0gTWF0aC5sb2coKDEgKyBlICogc2luUGh5MCkgLyAoMSAtIGUgKiBzaW5QaHkwKSk7XG4gIHRoaXMuSyA9IGsxIC0gdGhpcy5hbHBoYSAqIGsyICsgdGhpcy5hbHBoYSAqIGUgLyAyICogazM7XG59XG5cbmZ1bmN0aW9uIGZvcndhcmQkbihwKSB7XG4gIHZhciBTYTEgPSBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCAtIHAueSAvIDIpKTtcbiAgdmFyIFNhMiA9IHRoaXMuZSAvIDIgKiBNYXRoLmxvZygoMSArIHRoaXMuZSAqIE1hdGguc2luKHAueSkpIC8gKDEgLSB0aGlzLmUgKiBNYXRoLnNpbihwLnkpKSk7XG4gIHZhciBTID0gLXRoaXMuYWxwaGEgKiAoU2ExICsgU2EyKSArIHRoaXMuSztcblxuICAvLyBzcGhlcmljIGxhdGl0dWRlXG4gIHZhciBiID0gMiAqIChNYXRoLmF0YW4oTWF0aC5leHAoUykpIC0gTWF0aC5QSSAvIDQpO1xuXG4gIC8vIHNwaGVyaWMgbG9uZ2l0dWRlXG4gIHZhciBJID0gdGhpcy5hbHBoYSAqIChwLnggLSB0aGlzLmxhbWJkYTApO1xuXG4gIC8vIHBzb2V1ZG8gZXF1YXRvcmlhbCByb3RhdGlvblxuICB2YXIgcm90SSA9IE1hdGguYXRhbihNYXRoLnNpbihJKSAvIChNYXRoLnNpbih0aGlzLmIwKSAqIE1hdGgudGFuKGIpICsgTWF0aC5jb3ModGhpcy5iMCkgKiBNYXRoLmNvcyhJKSkpO1xuXG4gIHZhciByb3RCID0gTWF0aC5hc2luKE1hdGguY29zKHRoaXMuYjApICogTWF0aC5zaW4oYikgLSBNYXRoLnNpbih0aGlzLmIwKSAqIE1hdGguY29zKGIpICogTWF0aC5jb3MoSSkpO1xuXG4gIHAueSA9IHRoaXMuUiAvIDIgKiBNYXRoLmxvZygoMSArIE1hdGguc2luKHJvdEIpKSAvICgxIC0gTWF0aC5zaW4ocm90QikpKSArIHRoaXMueTA7XG4gIHAueCA9IHRoaXMuUiAqIHJvdEkgKyB0aGlzLngwO1xuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gaW52ZXJzZSRuKHApIHtcbiAgdmFyIFkgPSBwLnggLSB0aGlzLngwO1xuICB2YXIgWCA9IHAueSAtIHRoaXMueTA7XG5cbiAgdmFyIHJvdEkgPSBZIC8gdGhpcy5SO1xuICB2YXIgcm90QiA9IDIgKiAoTWF0aC5hdGFuKE1hdGguZXhwKFggLyB0aGlzLlIpKSAtIE1hdGguUEkgLyA0KTtcblxuICB2YXIgYiA9IE1hdGguYXNpbihNYXRoLmNvcyh0aGlzLmIwKSAqIE1hdGguc2luKHJvdEIpICsgTWF0aC5zaW4odGhpcy5iMCkgKiBNYXRoLmNvcyhyb3RCKSAqIE1hdGguY29zKHJvdEkpKTtcbiAgdmFyIEkgPSBNYXRoLmF0YW4oTWF0aC5zaW4ocm90SSkgLyAoTWF0aC5jb3ModGhpcy5iMCkgKiBNYXRoLmNvcyhyb3RJKSAtIE1hdGguc2luKHRoaXMuYjApICogTWF0aC50YW4ocm90QikpKTtcblxuICB2YXIgbGFtYmRhID0gdGhpcy5sYW1iZGEwICsgSSAvIHRoaXMuYWxwaGE7XG5cbiAgdmFyIFMgPSAwO1xuICB2YXIgcGh5ID0gYjtcbiAgdmFyIHByZXZQaHkgPSAtMTAwMDtcbiAgdmFyIGl0ZXJhdGlvbiA9IDA7XG4gIHdoaWxlIChNYXRoLmFicyhwaHkgLSBwcmV2UGh5KSA+IDAuMDAwMDAwMSkge1xuICAgIGlmICgrK2l0ZXJhdGlvbiA+IDIwKSB7XG4gICAgICAvLy4uLnJlcG9ydEVycm9yKFwib21lcmNGd2RJbmZpbml0eVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9TID0gTWF0aC5sb2coTWF0aC50YW4oTWF0aC5QSSAvIDQgKyBwaHkgLyAyKSk7XG4gICAgUyA9IDEgLyB0aGlzLmFscGhhICogKE1hdGgubG9nKE1hdGgudGFuKE1hdGguUEkgLyA0ICsgYiAvIDIpKSAtIHRoaXMuSykgKyB0aGlzLmUgKiBNYXRoLmxvZyhNYXRoLnRhbihNYXRoLlBJIC8gNCArIE1hdGguYXNpbih0aGlzLmUgKiBNYXRoLnNpbihwaHkpKSAvIDIpKTtcbiAgICBwcmV2UGh5ID0gcGh5O1xuICAgIHBoeSA9IDIgKiBNYXRoLmF0YW4oTWF0aC5leHAoUykpIC0gTWF0aC5QSSAvIDI7XG4gIH1cblxuICBwLnggPSBsYW1iZGE7XG4gIHAueSA9IHBoeTtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRuID0gW1wic29tZXJjXCJdO1xudmFyIHNvbWVyYyA9IHtcbiAgaW5pdDogaW5pdCRuLFxuICBmb3J3YXJkOiBmb3J3YXJkJG4sXG4gIGludmVyc2U6IGludmVyc2UkbixcbiAgbmFtZXM6IG5hbWVzJG5cbn07XG5cbnZhciBUT0wgPSAxZS03O1xuXG5mdW5jdGlvbiBpc1R5cGVBKFApIHtcbiAgdmFyIHR5cGVBUHJvamVjdGlvbnMgPSBbJ0hvdGluZV9PYmxpcXVlX01lcmNhdG9yJywnSG90aW5lX09ibGlxdWVfTWVyY2F0b3JfQXppbXV0aF9OYXR1cmFsX09yaWdpbiddO1xuICB2YXIgcHJvamVjdGlvbk5hbWUgPSB0eXBlb2YgUC5QUk9KRUNUSU9OID09PSBcIm9iamVjdFwiID8gT2JqZWN0LmtleXMoUC5QUk9KRUNUSU9OKVswXSA6IFAuUFJPSkVDVElPTjtcbiAgXG4gIHJldHVybiAnbm9fdW9mZicgaW4gUCB8fCAnbm9fb2ZmJyBpbiBQIHx8IHR5cGVBUHJvamVjdGlvbnMuaW5kZXhPZihwcm9qZWN0aW9uTmFtZSkgIT09IC0xO1xufVxuXG5cbi8qIEluaXRpYWxpemUgdGhlIE9ibGlxdWUgTWVyY2F0b3IgIHByb2plY3Rpb25cbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW5pdCRtKCkgeyAgXG4gIHZhciBjb24sIGNvbSwgY29zcGgwLCBELCBGLCBILCBMLCBzaW5waDAsIHAsIEosIGdhbW1hID0gMCxcbiAgICBnYW1tYTAsIGxhbWMgPSAwLCBsYW0xID0gMCwgbGFtMiA9IDAsIHBoaTEgPSAwLCBwaGkyID0gMCwgYWxwaGFfYyA9IDA7XG4gIFxuICAvLyBvbmx5IFR5cGUgQSB1c2VzIHRoZSBub19vZmYgb3Igbm9fdW9mZiBwcm9wZXJ0eVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vT1NHZW8vcHJvai40L2lzc3Vlcy8xMDRcbiAgdGhpcy5ub19vZmYgPSBpc1R5cGVBKHRoaXMpO1xuICB0aGlzLm5vX3JvdCA9ICdub19yb3QnIGluIHRoaXM7XG4gIFxuICB2YXIgYWxwID0gZmFsc2U7XG4gIGlmIChcImFscGhhXCIgaW4gdGhpcykge1xuICAgIGFscCA9IHRydWU7XG4gIH1cblxuICB2YXIgZ2FtID0gZmFsc2U7XG4gIGlmIChcInJlY3RpZmllZF9ncmlkX2FuZ2xlXCIgaW4gdGhpcykge1xuICAgIGdhbSA9IHRydWU7XG4gIH1cblxuICBpZiAoYWxwKSB7XG4gICAgYWxwaGFfYyA9IHRoaXMuYWxwaGE7XG4gIH1cbiAgXG4gIGlmIChnYW0pIHtcbiAgICBnYW1tYSA9ICh0aGlzLnJlY3RpZmllZF9ncmlkX2FuZ2xlICogRDJSJDEpO1xuICB9XG4gIFxuICBpZiAoYWxwIHx8IGdhbSkge1xuICAgIGxhbWMgPSB0aGlzLmxvbmdjO1xuICB9IGVsc2Uge1xuICAgIGxhbTEgPSB0aGlzLmxvbmcxO1xuICAgIHBoaTEgPSB0aGlzLmxhdDE7XG4gICAgbGFtMiA9IHRoaXMubG9uZzI7XG4gICAgcGhpMiA9IHRoaXMubGF0MjtcbiAgICBcbiAgICBpZiAoTWF0aC5hYnMocGhpMSAtIHBoaTIpIDw9IFRPTCB8fCAoY29uID0gTWF0aC5hYnMocGhpMSkpIDw9IFRPTCB8fFxuICAgICAgICBNYXRoLmFicyhjb24gLSBIQUxGX1BJKSA8PSBUT0wgfHwgTWF0aC5hYnMoTWF0aC5hYnModGhpcy5sYXQwKSAtIEhBTEZfUEkpIDw9IFRPTCB8fFxuICAgICAgICBNYXRoLmFicyhNYXRoLmFicyhwaGkyKSAtIEhBTEZfUEkpIDw9IFRPTCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfVxuICB9XG4gIFxuICB2YXIgb25lX2VzID0gMS4wIC0gdGhpcy5lcztcbiAgY29tID0gTWF0aC5zcXJ0KG9uZV9lcyk7XG4gIFxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQwKSA+IEVQU0xOKSB7XG4gICAgc2lucGgwID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgICBjb3NwaDAgPSBNYXRoLmNvcyh0aGlzLmxhdDApO1xuICAgIGNvbiA9IDEgLSB0aGlzLmVzICogc2lucGgwICogc2lucGgwO1xuICAgIHRoaXMuQiA9IGNvc3BoMCAqIGNvc3BoMDtcbiAgICB0aGlzLkIgPSBNYXRoLnNxcnQoMSArIHRoaXMuZXMgKiB0aGlzLkIgKiB0aGlzLkIgLyBvbmVfZXMpO1xuICAgIHRoaXMuQSA9IHRoaXMuQiAqIHRoaXMuazAgKiBjb20gLyBjb247XG4gICAgRCA9IHRoaXMuQiAqIGNvbSAvIChjb3NwaDAgKiBNYXRoLnNxcnQoY29uKSk7XG4gICAgRiA9IEQgKiBEIC0xO1xuICAgIFxuICAgIGlmIChGIDw9IDApIHtcbiAgICAgIEYgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBGID0gTWF0aC5zcXJ0KEYpO1xuICAgICAgaWYgKHRoaXMubGF0MCA8IDApIHtcbiAgICAgICAgRiA9IC1GO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB0aGlzLkUgPSBGICs9IEQ7XG4gICAgdGhpcy5FICo9IE1hdGgucG93KHRzZm56KHRoaXMuZSwgdGhpcy5sYXQwLCBzaW5waDApLCB0aGlzLkIpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuQiA9IDEgLyBjb207XG4gICAgdGhpcy5BID0gdGhpcy5rMDtcbiAgICB0aGlzLkUgPSBEID0gRiA9IDE7XG4gIH1cbiAgXG4gIGlmIChhbHAgfHwgZ2FtKSB7XG4gICAgaWYgKGFscCkge1xuICAgICAgZ2FtbWEwID0gTWF0aC5hc2luKE1hdGguc2luKGFscGhhX2MpIC8gRCk7XG4gICAgICBpZiAoIWdhbSkge1xuICAgICAgICBnYW1tYSA9IGFscGhhX2M7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbW1hMCA9IGdhbW1hO1xuICAgICAgYWxwaGFfYyA9IE1hdGguYXNpbihEICogTWF0aC5zaW4oZ2FtbWEwKSk7XG4gICAgfVxuICAgIHRoaXMubGFtMCA9IGxhbWMgLSBNYXRoLmFzaW4oMC41ICogKEYgLSAxIC8gRikgKiBNYXRoLnRhbihnYW1tYTApKSAvIHRoaXMuQjtcbiAgfSBlbHNlIHtcbiAgICBIID0gTWF0aC5wb3codHNmbnoodGhpcy5lLCBwaGkxLCBNYXRoLnNpbihwaGkxKSksIHRoaXMuQik7XG4gICAgTCA9IE1hdGgucG93KHRzZm56KHRoaXMuZSwgcGhpMiwgTWF0aC5zaW4ocGhpMikpLCB0aGlzLkIpO1xuICAgIEYgPSB0aGlzLkUgLyBIO1xuICAgIHAgPSAoTCAtIEgpIC8gKEwgKyBIKTtcbiAgICBKID0gdGhpcy5FICogdGhpcy5FO1xuICAgIEogPSAoSiAtIEwgKiBIKSAvIChKICsgTCAqIEgpO1xuICAgIGNvbiA9IGxhbTEgLSBsYW0yO1xuICAgIFxuICAgIGlmIChjb24gPCAtTWF0aC5waSkge1xuICAgICAgbGFtMiAtPVRXT19QSTtcbiAgICB9IGVsc2UgaWYgKGNvbiA+IE1hdGgucGkpIHtcbiAgICAgIGxhbTIgKz0gVFdPX1BJO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmxhbTAgPSBhZGp1c3RfbG9uKDAuNSAqIChsYW0xICsgbGFtMikgLSBNYXRoLmF0YW4oSiAqIE1hdGgudGFuKDAuNSAqIHRoaXMuQiAqIChsYW0xIC0gbGFtMikpIC8gcCkgLyB0aGlzLkIpO1xuICAgIGdhbW1hMCA9IE1hdGguYXRhbigyICogTWF0aC5zaW4odGhpcy5CICogYWRqdXN0X2xvbihsYW0xIC0gdGhpcy5sYW0wKSkgLyAoRiAtIDEgLyBGKSk7XG4gICAgZ2FtbWEgPSBhbHBoYV9jID0gTWF0aC5hc2luKEQgKiBNYXRoLnNpbihnYW1tYTApKTtcbiAgfVxuICBcbiAgdGhpcy5zaW5nYW0gPSBNYXRoLnNpbihnYW1tYTApO1xuICB0aGlzLmNvc2dhbSA9IE1hdGguY29zKGdhbW1hMCk7XG4gIHRoaXMuc2lucm90ID0gTWF0aC5zaW4oZ2FtbWEpO1xuICB0aGlzLmNvc3JvdCA9IE1hdGguY29zKGdhbW1hKTtcbiAgXG4gIHRoaXMuckIgPSAxIC8gdGhpcy5CO1xuICB0aGlzLkFyQiA9IHRoaXMuQSAqIHRoaXMuckI7XG4gIHRoaXMuQnJBID0gMSAvIHRoaXMuQXJCO1xuICB0aGlzLkEgKiB0aGlzLkI7XG4gIFxuICBpZiAodGhpcy5ub19vZmYpIHtcbiAgICB0aGlzLnVfMCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy51XzAgPSBNYXRoLmFicyh0aGlzLkFyQiAqIE1hdGguYXRhbihNYXRoLnNxcnQoRCAqIEQgLSAxKSAvIE1hdGguY29zKGFscGhhX2MpKSk7XG4gICAgXG4gICAgaWYgKHRoaXMubGF0MCA8IDApIHtcbiAgICAgIHRoaXMudV8wID0gLSB0aGlzLnVfMDtcbiAgICB9ICBcbiAgfVxuICAgIFxuICBGID0gMC41ICogZ2FtbWEwO1xuICB0aGlzLnZfcG9sZV9uID0gdGhpcy5BckIgKiBNYXRoLmxvZyhNYXRoLnRhbihGT1JUUEkgLSBGKSk7XG4gIHRoaXMudl9wb2xlX3MgPSB0aGlzLkFyQiAqIE1hdGgubG9nKE1hdGgudGFuKEZPUlRQSSArIEYpKTtcbn1cblxuXG4vKiBPYmxpcXVlIE1lcmNhdG9yIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gZm9yd2FyZCRtKHApIHtcbiAgdmFyIGNvb3JkcyA9IHt9O1xuICB2YXIgUywgVCwgVSwgViwgVywgdGVtcCwgdSwgdjtcbiAgcC54ID0gcC54IC0gdGhpcy5sYW0wO1xuICBcbiAgaWYgKE1hdGguYWJzKE1hdGguYWJzKHAueSkgLSBIQUxGX1BJKSA+IEVQU0xOKSB7XG4gICAgVyA9IHRoaXMuRSAvIE1hdGgucG93KHRzZm56KHRoaXMuZSwgcC55LCBNYXRoLnNpbihwLnkpKSwgdGhpcy5CKTtcbiAgICBcbiAgICB0ZW1wID0gMSAvIFc7XG4gICAgUyA9IDAuNSAqIChXIC0gdGVtcCk7XG4gICAgVCA9IDAuNSAqIChXICsgdGVtcCk7XG4gICAgViA9IE1hdGguc2luKHRoaXMuQiAqIHAueCk7XG4gICAgVSA9IChTICogdGhpcy5zaW5nYW0gLSBWICogdGhpcy5jb3NnYW0pIC8gVDtcbiAgICAgICAgXG4gICAgaWYgKE1hdGguYWJzKE1hdGguYWJzKFUpIC0gMS4wKSA8IEVQU0xOKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG4gICAgXG4gICAgdiA9IDAuNSAqIHRoaXMuQXJCICogTWF0aC5sb2coKDEgLSBVKS8oMSArIFUpKTtcbiAgICB0ZW1wID0gTWF0aC5jb3ModGhpcy5CICogcC54KTtcbiAgICBcbiAgICBpZiAoTWF0aC5hYnModGVtcCkgPCBUT0wpIHtcbiAgICAgIHUgPSB0aGlzLkEgKiBwLng7XG4gICAgfSBlbHNlIHtcbiAgICAgIHUgPSB0aGlzLkFyQiAqIE1hdGguYXRhbjIoKFMgKiB0aGlzLmNvc2dhbSArIFYgKiB0aGlzLnNpbmdhbSksIHRlbXApO1xuICAgIH0gICAgXG4gIH0gZWxzZSB7XG4gICAgdiA9IHAueSA+IDAgPyB0aGlzLnZfcG9sZV9uIDogdGhpcy52X3BvbGVfcztcbiAgICB1ID0gdGhpcy5BckIgKiBwLnk7XG4gIH1cbiAgICAgXG4gIGlmICh0aGlzLm5vX3JvdCkge1xuICAgIGNvb3Jkcy54ID0gdTtcbiAgICBjb29yZHMueSA9IHY7XG4gIH0gZWxzZSB7XG4gICAgdSAtPSB0aGlzLnVfMDtcbiAgICBjb29yZHMueCA9IHYgKiB0aGlzLmNvc3JvdCArIHUgKiB0aGlzLnNpbnJvdDtcbiAgICBjb29yZHMueSA9IHUgKiB0aGlzLmNvc3JvdCAtIHYgKiB0aGlzLnNpbnJvdDtcbiAgfVxuICBcbiAgY29vcmRzLnggPSAodGhpcy5hICogY29vcmRzLnggKyB0aGlzLngwKTtcbiAgY29vcmRzLnkgPSAodGhpcy5hICogY29vcmRzLnkgKyB0aGlzLnkwKTtcbiAgXG4gIHJldHVybiBjb29yZHM7XG59XG5cbmZ1bmN0aW9uIGludmVyc2UkbShwKSB7XG4gIHZhciB1LCB2LCBRcCwgU3AsIFRwLCBWcCwgVXA7XG4gIHZhciBjb29yZHMgPSB7fTtcbiAgXG4gIHAueCA9IChwLnggLSB0aGlzLngwKSAqICgxLjAgLyB0aGlzLmEpO1xuICBwLnkgPSAocC55IC0gdGhpcy55MCkgKiAoMS4wIC8gdGhpcy5hKTtcblxuICBpZiAodGhpcy5ub19yb3QpIHtcbiAgICB2ID0gcC55O1xuICAgIHUgPSBwLng7XG4gIH0gZWxzZSB7XG4gICAgdiA9IHAueCAqIHRoaXMuY29zcm90IC0gcC55ICogdGhpcy5zaW5yb3Q7XG4gICAgdSA9IHAueSAqIHRoaXMuY29zcm90ICsgcC54ICogdGhpcy5zaW5yb3QgKyB0aGlzLnVfMDtcbiAgfVxuICBcbiAgUXAgPSBNYXRoLmV4cCgtdGhpcy5CckEgKiB2KTtcbiAgU3AgPSAwLjUgKiAoUXAgLSAxIC8gUXApO1xuICBUcCA9IDAuNSAqIChRcCArIDEgLyBRcCk7XG4gIFZwID0gTWF0aC5zaW4odGhpcy5CckEgKiB1KTtcbiAgVXAgPSAoVnAgKiB0aGlzLmNvc2dhbSArIFNwICogdGhpcy5zaW5nYW0pIC8gVHA7XG4gIFxuICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMoVXApIC0gMSkgPCBFUFNMTikge1xuICAgIGNvb3Jkcy54ID0gMDtcbiAgICBjb29yZHMueSA9IFVwIDwgMCA/IC1IQUxGX1BJIDogSEFMRl9QSTtcbiAgfSBlbHNlIHtcbiAgICBjb29yZHMueSA9IHRoaXMuRSAvIE1hdGguc3FydCgoMSArIFVwKSAvICgxIC0gVXApKTtcbiAgICBjb29yZHMueSA9IHBoaTJ6KHRoaXMuZSwgTWF0aC5wb3coY29vcmRzLnksIDEgLyB0aGlzLkIpKTtcbiAgICBcbiAgICBpZiAoY29vcmRzLnkgPT09IEluZmluaXR5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG4gICAgICAgIFxuICAgIGNvb3Jkcy54ID0gLXRoaXMuckIgKiBNYXRoLmF0YW4yKChTcCAqIHRoaXMuY29zZ2FtIC0gVnAgKiB0aGlzLnNpbmdhbSksIE1hdGguY29zKHRoaXMuQnJBICogdSkpO1xuICB9XG4gIFxuICBjb29yZHMueCArPSB0aGlzLmxhbTA7XG4gIFxuICByZXR1cm4gY29vcmRzO1xufVxuXG52YXIgbmFtZXMkbSA9IFtcIkhvdGluZV9PYmxpcXVlX01lcmNhdG9yXCIsIFwiSG90aW5lIE9ibGlxdWUgTWVyY2F0b3JcIiwgXCJIb3RpbmVfT2JsaXF1ZV9NZXJjYXRvcl9BemltdXRoX05hdHVyYWxfT3JpZ2luXCIsIFwiSG90aW5lX09ibGlxdWVfTWVyY2F0b3JfVHdvX1BvaW50X05hdHVyYWxfT3JpZ2luXCIsIFwiSG90aW5lX09ibGlxdWVfTWVyY2F0b3JfQXppbXV0aF9DZW50ZXJcIiwgXCJPYmxpcXVlX01lcmNhdG9yXCIsIFwib21lcmNcIl07XG52YXIgb21lcmMgPSB7XG4gIGluaXQ6IGluaXQkbSxcbiAgZm9yd2FyZDogZm9yd2FyZCRtLFxuICBpbnZlcnNlOiBpbnZlcnNlJG0sXG4gIG5hbWVzOiBuYW1lcyRtXG59O1xuXG5mdW5jdGlvbiBpbml0JGwoKSB7XG4gIFxuICAvL2RvdWJsZSBsYXQwOyAgICAgICAgICAgICAgICAgICAgLyogdGhlIHJlZmVyZW5jZSBsYXRpdHVkZSAgICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIGxvbmcwOyAgICAgICAgICAgICAgICAgICAvKiB0aGUgcmVmZXJlbmNlIGxvbmdpdHVkZSAgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgbGF0MTsgICAgICAgICAgICAgICAgICAgIC8qIGZpcnN0IHN0YW5kYXJkIHBhcmFsbGVsICAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSBsYXQyOyAgICAgICAgICAgICAgICAgICAgLyogc2Vjb25kIHN0YW5kYXJkIHBhcmFsbGVsICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIHJfbWFqOyAgICAgICAgICAgICAgICAgICAvKiBtYWpvciBheGlzICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLy9kb3VibGUgcl9taW47ICAgICAgICAgICAgICAgICAgIC8qIG1pbm9yIGF4aXMgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvL2RvdWJsZSBmYWxzZV9lYXN0OyAgICAgICAgICAgICAgLyogeCBvZmZzZXQgaW4gbWV0ZXJzICAgICAgICAgICAgICAgICAgICovXG4gIC8vZG91YmxlIGZhbHNlX25vcnRoOyAgICAgICAgICAgICAvKiB5IG9mZnNldCBpbiBtZXRlcnMgICAgICAgICAgICAgICAgICAgKi9cbiAgXG4gIC8vdGhlIGFib3ZlIHZhbHVlIGNhbiBiZSBzZXQgd2l0aCBwcm9qNC5kZWZzXG4gIC8vZXhhbXBsZTogcHJvajQuZGVmcyhcIkVQU0c6MjE1NFwiLFwiK3Byb2o9bGNjICtsYXRfMT00OSArbGF0XzI9NDQgK2xhdF8wPTQ2LjUgK2xvbl8wPTMgK3hfMD03MDAwMDAgK3lfMD02NjAwMDAwICtlbGxwcz1HUlM4MCArdG93Z3M4ND0wLDAsMCwwLDAsMCwwICt1bml0cz1tICtub19kZWZzXCIpO1xuXG4gIGlmICghdGhpcy5sYXQyKSB7XG4gICAgdGhpcy5sYXQyID0gdGhpcy5sYXQxO1xuICB9IC8vaWYgbGF0MiBpcyBub3QgZGVmaW5lZFxuICBpZiAoIXRoaXMuazApIHtcbiAgICB0aGlzLmswID0gMTtcbiAgfVxuICB0aGlzLngwID0gdGhpcy54MCB8fCAwO1xuICB0aGlzLnkwID0gdGhpcy55MCB8fCAwO1xuICAvLyBTdGFuZGFyZCBQYXJhbGxlbHMgY2Fubm90IGJlIGVxdWFsIGFuZCBvbiBvcHBvc2l0ZSBzaWRlcyBvZiB0aGUgZXF1YXRvclxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxICsgdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRlbXAgPSB0aGlzLmIgLyB0aGlzLmE7XG4gIHRoaXMuZSA9IE1hdGguc3FydCgxIC0gdGVtcCAqIHRlbXApO1xuXG4gIHZhciBzaW4xID0gTWF0aC5zaW4odGhpcy5sYXQxKTtcbiAgdmFyIGNvczEgPSBNYXRoLmNvcyh0aGlzLmxhdDEpO1xuICB2YXIgbXMxID0gbXNmbnoodGhpcy5lLCBzaW4xLCBjb3MxKTtcbiAgdmFyIHRzMSA9IHRzZm56KHRoaXMuZSwgdGhpcy5sYXQxLCBzaW4xKTtcblxuICB2YXIgc2luMiA9IE1hdGguc2luKHRoaXMubGF0Mik7XG4gIHZhciBjb3MyID0gTWF0aC5jb3ModGhpcy5sYXQyKTtcbiAgdmFyIG1zMiA9IG1zZm56KHRoaXMuZSwgc2luMiwgY29zMik7XG4gIHZhciB0czIgPSB0c2Zueih0aGlzLmUsIHRoaXMubGF0Miwgc2luMik7XG5cbiAgdmFyIHRzMCA9IHRzZm56KHRoaXMuZSwgdGhpcy5sYXQwLCBNYXRoLnNpbih0aGlzLmxhdDApKTtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxIC0gdGhpcy5sYXQyKSA+IEVQU0xOKSB7XG4gICAgdGhpcy5ucyA9IE1hdGgubG9nKG1zMSAvIG1zMikgLyBNYXRoLmxvZyh0czEgLyB0czIpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMubnMgPSBzaW4xO1xuICB9XG4gIGlmIChpc05hTih0aGlzLm5zKSkge1xuICAgIHRoaXMubnMgPSBzaW4xO1xuICB9XG4gIHRoaXMuZjAgPSBtczEgLyAodGhpcy5ucyAqIE1hdGgucG93KHRzMSwgdGhpcy5ucykpO1xuICB0aGlzLnJoID0gdGhpcy5hICogdGhpcy5mMCAqIE1hdGgucG93KHRzMCwgdGhpcy5ucyk7XG4gIGlmICghdGhpcy50aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSBcIkxhbWJlcnQgQ29uZm9ybWFsIENvbmljXCI7XG4gIH1cbn1cblxuLy8gTGFtYmVydCBDb25mb3JtYWwgY29uaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZnVuY3Rpb24gZm9yd2FyZCRsKHApIHtcblxuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIC8vIHNpbmd1bGFyIGNhc2VzIDpcbiAgaWYgKE1hdGguYWJzKDIgKiBNYXRoLmFicyhsYXQpIC0gTWF0aC5QSSkgPD0gRVBTTE4pIHtcbiAgICBsYXQgPSBzaWduKGxhdCkgKiAoSEFMRl9QSSAtIDIgKiBFUFNMTik7XG4gIH1cblxuICB2YXIgY29uID0gTWF0aC5hYnMoTWF0aC5hYnMobGF0KSAtIEhBTEZfUEkpO1xuICB2YXIgdHMsIHJoMTtcbiAgaWYgKGNvbiA+IEVQU0xOKSB7XG4gICAgdHMgPSB0c2Zueih0aGlzLmUsIGxhdCwgTWF0aC5zaW4obGF0KSk7XG4gICAgcmgxID0gdGhpcy5hICogdGhpcy5mMCAqIE1hdGgucG93KHRzLCB0aGlzLm5zKTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb24gPSBsYXQgKiB0aGlzLm5zO1xuICAgIGlmIChjb24gPD0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJoMSA9IDA7XG4gIH1cbiAgdmFyIHRoZXRhID0gdGhpcy5ucyAqIGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHAueCA9IHRoaXMuazAgKiAocmgxICogTWF0aC5zaW4odGhldGEpKSArIHRoaXMueDA7XG4gIHAueSA9IHRoaXMuazAgKiAodGhpcy5yaCAtIHJoMSAqIE1hdGguY29zKHRoZXRhKSkgKyB0aGlzLnkwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vLyBMYW1iZXJ0IENvbmZvcm1hbCBDb25pYyBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBpbnZlcnNlJGwocCkge1xuXG4gIHZhciByaDEsIGNvbiwgdHM7XG4gIHZhciBsYXQsIGxvbjtcbiAgdmFyIHggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmswO1xuICB2YXIgeSA9ICh0aGlzLnJoIC0gKHAueSAtIHRoaXMueTApIC8gdGhpcy5rMCk7XG4gIGlmICh0aGlzLm5zID4gMCkge1xuICAgIHJoMSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICBjb24gPSAxO1xuICB9XG4gIGVsc2Uge1xuICAgIHJoMSA9IC1NYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgY29uID0gLTE7XG4gIH1cbiAgdmFyIHRoZXRhID0gMDtcbiAgaWYgKHJoMSAhPT0gMCkge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMigoY29uICogeCksIChjb24gKiB5KSk7XG4gIH1cbiAgaWYgKChyaDEgIT09IDApIHx8ICh0aGlzLm5zID4gMCkpIHtcbiAgICBjb24gPSAxIC8gdGhpcy5ucztcbiAgICB0cyA9IE1hdGgucG93KChyaDEgLyAodGhpcy5hICogdGhpcy5mMCkpLCBjb24pO1xuICAgIGxhdCA9IHBoaTJ6KHRoaXMuZSwgdHMpO1xuICAgIGlmIChsYXQgPT09IC05OTk5KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgbGF0ID0gLUhBTEZfUEk7XG4gIH1cbiAgbG9uID0gYWRqdXN0X2xvbih0aGV0YSAvIHRoaXMubnMgKyB0aGlzLmxvbmcwKTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRsID0gW1xuICBcIkxhbWJlcnQgVGFuZ2VudGlhbCBDb25mb3JtYWwgQ29uaWMgUHJvamVjdGlvblwiLFxuICBcIkxhbWJlcnRfQ29uZm9ybWFsX0NvbmljXCIsXG4gIFwiTGFtYmVydF9Db25mb3JtYWxfQ29uaWNfMVNQXCIsXG4gIFwiTGFtYmVydF9Db25mb3JtYWxfQ29uaWNfMlNQXCIsXG4gIFwibGNjXCIsXG4gIFwiTGFtYmVydCBDb25pYyBDb25mb3JtYWwgKDFTUClcIixcbiAgXCJMYW1iZXJ0IENvbmljIENvbmZvcm1hbCAoMlNQKVwiXG5dO1xuXG52YXIgbGNjID0ge1xuICBpbml0OiBpbml0JGwsXG4gIGZvcndhcmQ6IGZvcndhcmQkbCxcbiAgaW52ZXJzZTogaW52ZXJzZSRsLFxuICBuYW1lczogbmFtZXMkbFxufTtcblxuZnVuY3Rpb24gaW5pdCRrKCkge1xuICB0aGlzLmEgPSA2Mzc3Mzk3LjE1NTtcbiAgdGhpcy5lcyA9IDAuMDA2Njc0MzcyMjMwNjE0O1xuICB0aGlzLmUgPSBNYXRoLnNxcnQodGhpcy5lcyk7XG4gIGlmICghdGhpcy5sYXQwKSB7XG4gICAgdGhpcy5sYXQwID0gMC44NjM5Mzc5Nzk3MzcxOTM7XG4gIH1cbiAgaWYgKCF0aGlzLmxvbmcwKSB7XG4gICAgdGhpcy5sb25nMCA9IDAuNzQxNzY0OTMyMDk3NTkwMSAtIDAuMzA4MzQxNTAxMTg1NjY1O1xuICB9XG4gIC8qIGlmIHNjYWxlIG5vdCBzZXQgZGVmYXVsdCB0byAwLjk5OTkgKi9cbiAgaWYgKCF0aGlzLmswKSB7XG4gICAgdGhpcy5rMCA9IDAuOTk5OTtcbiAgfVxuICB0aGlzLnM0NSA9IDAuNzg1Mzk4MTYzMzk3NDQ4OyAvKiA0NSAqL1xuICB0aGlzLnM5MCA9IDIgKiB0aGlzLnM0NTtcbiAgdGhpcy5maTAgPSB0aGlzLmxhdDA7XG4gIHRoaXMuZTIgPSB0aGlzLmVzO1xuICB0aGlzLmUgPSBNYXRoLnNxcnQodGhpcy5lMik7XG4gIHRoaXMuYWxmYSA9IE1hdGguc3FydCgxICsgKHRoaXMuZTIgKiBNYXRoLnBvdyhNYXRoLmNvcyh0aGlzLmZpMCksIDQpKSAvICgxIC0gdGhpcy5lMikpO1xuICB0aGlzLnVxID0gMS4wNDIxNjg1NjM4MDQ3NDtcbiAgdGhpcy51MCA9IE1hdGguYXNpbihNYXRoLnNpbih0aGlzLmZpMCkgLyB0aGlzLmFsZmEpO1xuICB0aGlzLmcgPSBNYXRoLnBvdygoMSArIHRoaXMuZSAqIE1hdGguc2luKHRoaXMuZmkwKSkgLyAoMSAtIHRoaXMuZSAqIE1hdGguc2luKHRoaXMuZmkwKSksIHRoaXMuYWxmYSAqIHRoaXMuZSAvIDIpO1xuICB0aGlzLmsgPSBNYXRoLnRhbih0aGlzLnUwIC8gMiArIHRoaXMuczQ1KSAvIE1hdGgucG93KE1hdGgudGFuKHRoaXMuZmkwIC8gMiArIHRoaXMuczQ1KSwgdGhpcy5hbGZhKSAqIHRoaXMuZztcbiAgdGhpcy5rMSA9IHRoaXMuazA7XG4gIHRoaXMubjAgPSB0aGlzLmEgKiBNYXRoLnNxcnQoMSAtIHRoaXMuZTIpIC8gKDEgLSB0aGlzLmUyICogTWF0aC5wb3coTWF0aC5zaW4odGhpcy5maTApLCAyKSk7XG4gIHRoaXMuczAgPSAxLjM3MDA4MzQ2MjgxNTU1O1xuICB0aGlzLm4gPSBNYXRoLnNpbih0aGlzLnMwKTtcbiAgdGhpcy5ybzAgPSB0aGlzLmsxICogdGhpcy5uMCAvIE1hdGgudGFuKHRoaXMuczApO1xuICB0aGlzLmFkID0gdGhpcy5zOTAgLSB0aGlzLnVxO1xufVxuXG4vKiBlbGxpcHNvaWQgKi9cbi8qIGNhbGN1bGF0ZSB4eSBmcm9tIGxhdC9sb24gKi9cbi8qIENvbnN0YW50cywgaWRlbnRpY2FsIHRvIGludmVyc2UgdHJhbnNmb3JtIGZ1bmN0aW9uICovXG5mdW5jdGlvbiBmb3J3YXJkJGsocCkge1xuICB2YXIgZ2ZpLCB1LCBkZWx0YXYsIHMsIGQsIGVwcywgcm87XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciBkZWx0YV9sb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICAvKiBUcmFuc2Zvcm1hdGlvbiAqL1xuICBnZmkgPSBNYXRoLnBvdygoKDEgKyB0aGlzLmUgKiBNYXRoLnNpbihsYXQpKSAvICgxIC0gdGhpcy5lICogTWF0aC5zaW4obGF0KSkpLCAodGhpcy5hbGZhICogdGhpcy5lIC8gMikpO1xuICB1ID0gMiAqIChNYXRoLmF0YW4odGhpcy5rICogTWF0aC5wb3coTWF0aC50YW4obGF0IC8gMiArIHRoaXMuczQ1KSwgdGhpcy5hbGZhKSAvIGdmaSkgLSB0aGlzLnM0NSk7XG4gIGRlbHRhdiA9IC1kZWx0YV9sb24gKiB0aGlzLmFsZmE7XG4gIHMgPSBNYXRoLmFzaW4oTWF0aC5jb3ModGhpcy5hZCkgKiBNYXRoLnNpbih1KSArIE1hdGguc2luKHRoaXMuYWQpICogTWF0aC5jb3ModSkgKiBNYXRoLmNvcyhkZWx0YXYpKTtcbiAgZCA9IE1hdGguYXNpbihNYXRoLmNvcyh1KSAqIE1hdGguc2luKGRlbHRhdikgLyBNYXRoLmNvcyhzKSk7XG4gIGVwcyA9IHRoaXMubiAqIGQ7XG4gIHJvID0gdGhpcy5ybzAgKiBNYXRoLnBvdyhNYXRoLnRhbih0aGlzLnMwIC8gMiArIHRoaXMuczQ1KSwgdGhpcy5uKSAvIE1hdGgucG93KE1hdGgudGFuKHMgLyAyICsgdGhpcy5zNDUpLCB0aGlzLm4pO1xuICBwLnkgPSBybyAqIE1hdGguY29zKGVwcykgLyAxO1xuICBwLnggPSBybyAqIE1hdGguc2luKGVwcykgLyAxO1xuXG4gIGlmICghdGhpcy5jemVjaCkge1xuICAgIHAueSAqPSAtMTtcbiAgICBwLnggKj0gLTE7XG4gIH1cbiAgcmV0dXJuIChwKTtcbn1cblxuLyogY2FsY3VsYXRlIGxhdC9sb24gZnJvbSB4eSAqL1xuZnVuY3Rpb24gaW52ZXJzZSRrKHApIHtcbiAgdmFyIHUsIGRlbHRhdiwgcywgZCwgZXBzLCBybywgZmkxO1xuICB2YXIgb2s7XG5cbiAgLyogVHJhbnNmb3JtYXRpb24gKi9cbiAgLyogcmV2ZXJ0IHksIHgqL1xuICB2YXIgdG1wID0gcC54O1xuICBwLnggPSBwLnk7XG4gIHAueSA9IHRtcDtcbiAgaWYgKCF0aGlzLmN6ZWNoKSB7XG4gICAgcC55ICo9IC0xO1xuICAgIHAueCAqPSAtMTtcbiAgfVxuICBybyA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICBlcHMgPSBNYXRoLmF0YW4yKHAueSwgcC54KTtcbiAgZCA9IGVwcyAvIE1hdGguc2luKHRoaXMuczApO1xuICBzID0gMiAqIChNYXRoLmF0YW4oTWF0aC5wb3codGhpcy5ybzAgLyBybywgMSAvIHRoaXMubikgKiBNYXRoLnRhbih0aGlzLnMwIC8gMiArIHRoaXMuczQ1KSkgLSB0aGlzLnM0NSk7XG4gIHUgPSBNYXRoLmFzaW4oTWF0aC5jb3ModGhpcy5hZCkgKiBNYXRoLnNpbihzKSAtIE1hdGguc2luKHRoaXMuYWQpICogTWF0aC5jb3MocykgKiBNYXRoLmNvcyhkKSk7XG4gIGRlbHRhdiA9IE1hdGguYXNpbihNYXRoLmNvcyhzKSAqIE1hdGguc2luKGQpIC8gTWF0aC5jb3ModSkpO1xuICBwLnggPSB0aGlzLmxvbmcwIC0gZGVsdGF2IC8gdGhpcy5hbGZhO1xuICBmaTEgPSB1O1xuICBvayA9IDA7XG4gIHZhciBpdGVyID0gMDtcbiAgZG8ge1xuICAgIHAueSA9IDIgKiAoTWF0aC5hdGFuKE1hdGgucG93KHRoaXMuaywgLSAxIC8gdGhpcy5hbGZhKSAqIE1hdGgucG93KE1hdGgudGFuKHUgLyAyICsgdGhpcy5zNDUpLCAxIC8gdGhpcy5hbGZhKSAqIE1hdGgucG93KCgxICsgdGhpcy5lICogTWF0aC5zaW4oZmkxKSkgLyAoMSAtIHRoaXMuZSAqIE1hdGguc2luKGZpMSkpLCB0aGlzLmUgLyAyKSkgLSB0aGlzLnM0NSk7XG4gICAgaWYgKE1hdGguYWJzKGZpMSAtIHAueSkgPCAwLjAwMDAwMDAwMDEpIHtcbiAgICAgIG9rID0gMTtcbiAgICB9XG4gICAgZmkxID0gcC55O1xuICAgIGl0ZXIgKz0gMTtcbiAgfSB3aGlsZSAob2sgPT09IDAgJiYgaXRlciA8IDE1KTtcbiAgaWYgKGl0ZXIgPj0gMTUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAocCk7XG59XG5cbnZhciBuYW1lcyRrID0gW1wiS3JvdmFrXCIsIFwia3JvdmFrXCJdO1xudmFyIGtyb3ZhayA9IHtcbiAgaW5pdDogaW5pdCRrLFxuICBmb3J3YXJkOiBmb3J3YXJkJGssXG4gIGludmVyc2U6IGludmVyc2UkayxcbiAgbmFtZXM6IG5hbWVzJGtcbn07XG5cbmZ1bmN0aW9uIG1sZm4oZTAsIGUxLCBlMiwgZTMsIHBoaSkge1xuICByZXR1cm4gKGUwICogcGhpIC0gZTEgKiBNYXRoLnNpbigyICogcGhpKSArIGUyICogTWF0aC5zaW4oNCAqIHBoaSkgLSBlMyAqIE1hdGguc2luKDYgKiBwaGkpKTtcbn1cblxuZnVuY3Rpb24gZTBmbih4KSB7XG4gIHJldHVybiAoMSAtIDAuMjUgKiB4ICogKDEgKyB4IC8gMTYgKiAoMyArIDEuMjUgKiB4KSkpO1xufVxuXG5mdW5jdGlvbiBlMWZuKHgpIHtcbiAgcmV0dXJuICgwLjM3NSAqIHggKiAoMSArIDAuMjUgKiB4ICogKDEgKyAwLjQ2ODc1ICogeCkpKTtcbn1cblxuZnVuY3Rpb24gZTJmbih4KSB7XG4gIHJldHVybiAoMC4wNTg1OTM3NSAqIHggKiB4ICogKDEgKyAwLjc1ICogeCkpO1xufVxuXG5mdW5jdGlvbiBlM2ZuKHgpIHtcbiAgcmV0dXJuICh4ICogeCAqIHggKiAoMzUgLyAzMDcyKSk7XG59XG5cbmZ1bmN0aW9uIGdOKGEsIGUsIHNpbnBoaSkge1xuICB2YXIgdGVtcCA9IGUgKiBzaW5waGk7XG4gIHJldHVybiBhIC8gTWF0aC5zcXJ0KDEgLSB0ZW1wICogdGVtcCk7XG59XG5cbmZ1bmN0aW9uIGFkanVzdF9sYXQoeCkge1xuICByZXR1cm4gKE1hdGguYWJzKHgpIDwgSEFMRl9QSSkgPyB4IDogKHggLSAoc2lnbih4KSAqIE1hdGguUEkpKTtcbn1cblxuZnVuY3Rpb24gaW1sZm4obWwsIGUwLCBlMSwgZTIsIGUzKSB7XG4gIHZhciBwaGk7XG4gIHZhciBkcGhpO1xuXG4gIHBoaSA9IG1sIC8gZTA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgIGRwaGkgPSAobWwgLSAoZTAgKiBwaGkgLSBlMSAqIE1hdGguc2luKDIgKiBwaGkpICsgZTIgKiBNYXRoLnNpbig0ICogcGhpKSAtIGUzICogTWF0aC5zaW4oNiAqIHBoaSkpKSAvIChlMCAtIDIgKiBlMSAqIE1hdGguY29zKDIgKiBwaGkpICsgNCAqIGUyICogTWF0aC5jb3MoNCAqIHBoaSkgLSA2ICogZTMgKiBNYXRoLmNvcyg2ICogcGhpKSk7XG4gICAgcGhpICs9IGRwaGk7XG4gICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IDAuMDAwMDAwMDAwMSkge1xuICAgICAgcmV0dXJuIHBoaTtcbiAgICB9XG4gIH1cblxuICAvLy4ucmVwb3J0RXJyb3IoXCJJTUxGTi1DT05WOkxhdGl0dWRlIGZhaWxlZCB0byBjb252ZXJnZSBhZnRlciAxNSBpdGVyYXRpb25zXCIpO1xuICByZXR1cm4gTmFOO1xufVxuXG5mdW5jdGlvbiBpbml0JGooKSB7XG4gIGlmICghdGhpcy5zcGhlcmUpIHtcbiAgICB0aGlzLmUwID0gZTBmbih0aGlzLmVzKTtcbiAgICB0aGlzLmUxID0gZTFmbih0aGlzLmVzKTtcbiAgICB0aGlzLmUyID0gZTJmbih0aGlzLmVzKTtcbiAgICB0aGlzLmUzID0gZTNmbih0aGlzLmVzKTtcbiAgICB0aGlzLm1sMCA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQwKTtcbiAgfVxufVxuXG4vKiBDYXNzaW5pIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5mdW5jdGlvbiBmb3J3YXJkJGoocCkge1xuXG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciB4LCB5O1xuICB2YXIgbGFtID0gcC54O1xuICB2YXIgcGhpID0gcC55O1xuICBsYW0gPSBhZGp1c3RfbG9uKGxhbSAtIHRoaXMubG9uZzApO1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHggPSB0aGlzLmEgKiBNYXRoLmFzaW4oTWF0aC5jb3MocGhpKSAqIE1hdGguc2luKGxhbSkpO1xuICAgIHkgPSB0aGlzLmEgKiAoTWF0aC5hdGFuMihNYXRoLnRhbihwaGkpLCBNYXRoLmNvcyhsYW0pKSAtIHRoaXMubGF0MCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9lbGxpcHNvaWRcbiAgICB2YXIgc2lucGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICB2YXIgY29zcGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICB2YXIgbmwgPSBnTih0aGlzLmEsIHRoaXMuZSwgc2lucGhpKTtcbiAgICB2YXIgdGwgPSBNYXRoLnRhbihwaGkpICogTWF0aC50YW4ocGhpKTtcbiAgICB2YXIgYWwgPSBsYW0gKiBNYXRoLmNvcyhwaGkpO1xuICAgIHZhciBhc3EgPSBhbCAqIGFsO1xuICAgIHZhciBjbCA9IHRoaXMuZXMgKiBjb3NwaGkgKiBjb3NwaGkgLyAoMSAtIHRoaXMuZXMpO1xuICAgIHZhciBtbCA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgcGhpKTtcblxuICAgIHggPSBubCAqIGFsICogKDEgLSBhc3EgKiB0bCAqICgxIC8gNiAtICg4IC0gdGwgKyA4ICogY2wpICogYXNxIC8gMTIwKSk7XG4gICAgeSA9IG1sIC0gdGhpcy5tbDAgKyBubCAqIHNpbnBoaSAvIGNvc3BoaSAqIGFzcSAqICgwLjUgKyAoNSAtIHRsICsgNiAqIGNsKSAqIGFzcSAvIDI0KTtcblxuXG4gIH1cblxuICBwLnggPSB4ICsgdGhpcy54MDtcbiAgcC55ID0geSArIHRoaXMueTA7XG4gIHJldHVybiBwO1xufVxuXG4vKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAtLS0tLS0tLS0tLS0tLS0tLSovXG5mdW5jdGlvbiBpbnZlcnNlJGoocCkge1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHZhciB4ID0gcC54IC8gdGhpcy5hO1xuICB2YXIgeSA9IHAueSAvIHRoaXMuYTtcbiAgdmFyIHBoaSwgbGFtO1xuXG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHZhciBkZCA9IHkgKyB0aGlzLmxhdDA7XG4gICAgcGhpID0gTWF0aC5hc2luKE1hdGguc2luKGRkKSAqIE1hdGguY29zKHgpKTtcbiAgICBsYW0gPSBNYXRoLmF0YW4yKE1hdGgudGFuKHgpLCBNYXRoLmNvcyhkZCkpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8qIGVsbGlwc29pZCAqL1xuICAgIHZhciBtbDEgPSB0aGlzLm1sMCAvIHRoaXMuYSArIHk7XG4gICAgdmFyIHBoaTEgPSBpbWxmbihtbDEsIHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMpO1xuICAgIGlmIChNYXRoLmFicyhNYXRoLmFicyhwaGkxKSAtIEhBTEZfUEkpIDw9IEVQU0xOKSB7XG4gICAgICBwLnggPSB0aGlzLmxvbmcwO1xuICAgICAgcC55ID0gSEFMRl9QSTtcbiAgICAgIGlmICh5IDwgMCkge1xuICAgICAgICBwLnkgKj0gLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgdmFyIG5sMSA9IGdOKHRoaXMuYSwgdGhpcy5lLCBNYXRoLnNpbihwaGkxKSk7XG5cbiAgICB2YXIgcmwxID0gbmwxICogbmwxICogbmwxIC8gdGhpcy5hIC8gdGhpcy5hICogKDEgLSB0aGlzLmVzKTtcbiAgICB2YXIgdGwxID0gTWF0aC5wb3coTWF0aC50YW4ocGhpMSksIDIpO1xuICAgIHZhciBkbCA9IHggKiB0aGlzLmEgLyBubDE7XG4gICAgdmFyIGRzcSA9IGRsICogZGw7XG4gICAgcGhpID0gcGhpMSAtIG5sMSAqIE1hdGgudGFuKHBoaTEpIC8gcmwxICogZGwgKiBkbCAqICgwLjUgLSAoMSArIDMgKiB0bDEpICogZGwgKiBkbCAvIDI0KTtcbiAgICBsYW0gPSBkbCAqICgxIC0gZHNxICogKHRsMSAvIDMgKyAoMSArIDMgKiB0bDEpICogdGwxICogZHNxIC8gMTUpKSAvIE1hdGguY29zKHBoaTEpO1xuXG4gIH1cblxuICBwLnggPSBhZGp1c3RfbG9uKGxhbSArIHRoaXMubG9uZzApO1xuICBwLnkgPSBhZGp1c3RfbGF0KHBoaSk7XG4gIHJldHVybiBwO1xuXG59XG5cbnZhciBuYW1lcyRqID0gW1wiQ2Fzc2luaVwiLCBcIkNhc3NpbmlfU29sZG5lclwiLCBcImNhc3NcIl07XG52YXIgY2FzcyA9IHtcbiAgaW5pdDogaW5pdCRqLFxuICBmb3J3YXJkOiBmb3J3YXJkJGosXG4gIGludmVyc2U6IGludmVyc2UkaixcbiAgbmFtZXM6IG5hbWVzJGpcbn07XG5cbmZ1bmN0aW9uIHFzZm56KGVjY2VudCwgc2lucGhpKSB7XG4gIHZhciBjb247XG4gIGlmIChlY2NlbnQgPiAxLjBlLTcpIHtcbiAgICBjb24gPSBlY2NlbnQgKiBzaW5waGk7XG4gICAgcmV0dXJuICgoMSAtIGVjY2VudCAqIGVjY2VudCkgKiAoc2lucGhpIC8gKDEgLSBjb24gKiBjb24pIC0gKDAuNSAvIGVjY2VudCkgKiBNYXRoLmxvZygoMSAtIGNvbikgLyAoMSArIGNvbikpKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuICgyICogc2lucGhpKTtcbiAgfVxufVxuXG4vKlxuICByZWZlcmVuY2VcbiAgICBcIk5ldyBFcXVhbC1BcmVhIE1hcCBQcm9qZWN0aW9ucyBmb3IgTm9uY2lyY3VsYXIgUmVnaW9uc1wiLCBKb2huIFAuIFNueWRlcixcbiAgICBUaGUgQW1lcmljYW4gQ2FydG9ncmFwaGVyLCBWb2wgMTUsIE5vLiA0LCBPY3RvYmVyIDE5ODgsIHBwLiAzNDEtMzU1LlxuICAqL1xuXG52YXIgU19QT0xFID0gMTtcblxudmFyIE5fUE9MRSA9IDI7XG52YXIgRVFVSVQgPSAzO1xudmFyIE9CTElRID0gNDtcblxuLyogSW5pdGlhbGl6ZSB0aGUgTGFtYmVydCBBemltdXRoYWwgRXF1YWwgQXJlYSBwcm9qZWN0aW9uXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5mdW5jdGlvbiBpbml0JGkoKSB7XG4gIHZhciB0ID0gTWF0aC5hYnModGhpcy5sYXQwKTtcbiAgaWYgKE1hdGguYWJzKHQgLSBIQUxGX1BJKSA8IEVQU0xOKSB7XG4gICAgdGhpcy5tb2RlID0gdGhpcy5sYXQwIDwgMCA/IHRoaXMuU19QT0xFIDogdGhpcy5OX1BPTEU7XG4gIH1cbiAgZWxzZSBpZiAoTWF0aC5hYnModCkgPCBFUFNMTikge1xuICAgIHRoaXMubW9kZSA9IHRoaXMuRVFVSVQ7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5tb2RlID0gdGhpcy5PQkxJUTtcbiAgfVxuICBpZiAodGhpcy5lcyA+IDApIHtcbiAgICB2YXIgc2lucGhpO1xuXG4gICAgdGhpcy5xcCA9IHFzZm56KHRoaXMuZSwgMSk7XG4gICAgdGhpcy5tbWYgPSAwLjUgLyAoMSAtIHRoaXMuZXMpO1xuICAgIHRoaXMuYXBhID0gYXV0aHNldCh0aGlzLmVzKTtcbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgdGhpcy5OX1BPTEU6XG4gICAgICB0aGlzLmRkID0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5TX1BPTEU6XG4gICAgICB0aGlzLmRkID0gMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5FUVVJVDpcbiAgICAgIHRoaXMucnEgPSBNYXRoLnNxcnQoMC41ICogdGhpcy5xcCk7XG4gICAgICB0aGlzLmRkID0gMSAvIHRoaXMucnE7XG4gICAgICB0aGlzLnhtZiA9IDE7XG4gICAgICB0aGlzLnltZiA9IDAuNSAqIHRoaXMucXA7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuT0JMSVE6XG4gICAgICB0aGlzLnJxID0gTWF0aC5zcXJ0KDAuNSAqIHRoaXMucXApO1xuICAgICAgc2lucGhpID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgICAgIHRoaXMuc2luYjEgPSBxc2Zueih0aGlzLmUsIHNpbnBoaSkgLyB0aGlzLnFwO1xuICAgICAgdGhpcy5jb3NiMSA9IE1hdGguc3FydCgxIC0gdGhpcy5zaW5iMSAqIHRoaXMuc2luYjEpO1xuICAgICAgdGhpcy5kZCA9IE1hdGguY29zKHRoaXMubGF0MCkgLyAoTWF0aC5zcXJ0KDEgLSB0aGlzLmVzICogc2lucGhpICogc2lucGhpKSAqIHRoaXMucnEgKiB0aGlzLmNvc2IxKTtcbiAgICAgIHRoaXMueW1mID0gKHRoaXMueG1mID0gdGhpcy5ycSkgLyB0aGlzLmRkO1xuICAgICAgdGhpcy54bWYgKj0gdGhpcy5kZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRKSB7XG4gICAgICB0aGlzLnNpbnBoMCA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gICAgICB0aGlzLmNvc3BoMCA9IE1hdGguY29zKHRoaXMubGF0MCk7XG4gICAgfVxuICB9XG59XG5cbi8qIExhbWJlcnQgQXppbXV0aGFsIEVxdWFsIEFyZWEgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGZvcndhcmQkaShwKSB7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIHgsIHksIGNvc2xhbSwgc2lubGFtLCBzaW5waGksIHEsIHNpbmIsIGNvc2IsIGIsIGNvc3BoaTtcbiAgdmFyIGxhbSA9IHAueDtcbiAgdmFyIHBoaSA9IHAueTtcblxuICBsYW0gPSBhZGp1c3RfbG9uKGxhbSAtIHRoaXMubG9uZzApO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBzaW5waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIGNvc3BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgY29zbGFtID0gTWF0aC5jb3MobGFtKTtcbiAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkge1xuICAgICAgeSA9ICh0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQpID8gMSArIGNvc3BoaSAqIGNvc2xhbSA6IDEgKyB0aGlzLnNpbnBoMCAqIHNpbnBoaSArIHRoaXMuY29zcGgwICogY29zcGhpICogY29zbGFtO1xuICAgICAgaWYgKHkgPD0gRVBTTE4pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB5ID0gTWF0aC5zcXJ0KDIgLyB5KTtcbiAgICAgIHggPSB5ICogY29zcGhpICogTWF0aC5zaW4obGFtKTtcbiAgICAgIHkgKj0gKHRoaXMubW9kZSA9PT0gdGhpcy5FUVVJVCkgPyBzaW5waGkgOiB0aGlzLmNvc3BoMCAqIHNpbnBoaSAtIHRoaXMuc2lucGgwICogY29zcGhpICogY29zbGFtO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuTl9QT0xFIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5TX1BPTEUpIHtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuTl9QT0xFKSB7XG4gICAgICAgIGNvc2xhbSA9IC1jb3NsYW07XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMocGhpICsgdGhpcy5sYXQwKSA8IEVQU0xOKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgeSA9IEZPUlRQSSAtIHBoaSAqIDAuNTtcbiAgICAgIHkgPSAyICogKCh0aGlzLm1vZGUgPT09IHRoaXMuU19QT0xFKSA/IE1hdGguY29zKHkpIDogTWF0aC5zaW4oeSkpO1xuICAgICAgeCA9IHkgKiBNYXRoLnNpbihsYW0pO1xuICAgICAgeSAqPSBjb3NsYW07XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHNpbmIgPSAwO1xuICAgIGNvc2IgPSAwO1xuICAgIGIgPSAwO1xuICAgIGNvc2xhbSA9IE1hdGguY29zKGxhbSk7XG4gICAgc2lubGFtID0gTWF0aC5zaW4obGFtKTtcbiAgICBzaW5waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIHEgPSBxc2Zueih0aGlzLmUsIHNpbnBoaSk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSB8fCB0aGlzLm1vZGUgPT09IHRoaXMuRVFVSVQpIHtcbiAgICAgIHNpbmIgPSBxIC8gdGhpcy5xcDtcbiAgICAgIGNvc2IgPSBNYXRoLnNxcnQoMSAtIHNpbmIgKiBzaW5iKTtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICBjYXNlIHRoaXMuT0JMSVE6XG4gICAgICBiID0gMSArIHRoaXMuc2luYjEgKiBzaW5iICsgdGhpcy5jb3NiMSAqIGNvc2IgKiBjb3NsYW07XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuRVFVSVQ6XG4gICAgICBiID0gMSArIGNvc2IgKiBjb3NsYW07XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuTl9QT0xFOlxuICAgICAgYiA9IEhBTEZfUEkgKyBwaGk7XG4gICAgICBxID0gdGhpcy5xcCAtIHE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuU19QT0xFOlxuICAgICAgYiA9IHBoaSAtIEhBTEZfUEk7XG4gICAgICBxID0gdGhpcy5xcCArIHE7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKGIpIDwgRVBTTE4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgdGhpcy5PQkxJUTpcbiAgICBjYXNlIHRoaXMuRVFVSVQ6XG4gICAgICBiID0gTWF0aC5zcXJ0KDIgLyBiKTtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEpIHtcbiAgICAgICAgeSA9IHRoaXMueW1mICogYiAqICh0aGlzLmNvc2IxICogc2luYiAtIHRoaXMuc2luYjEgKiBjb3NiICogY29zbGFtKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB5ID0gKGIgPSBNYXRoLnNxcnQoMiAvICgxICsgY29zYiAqIGNvc2xhbSkpKSAqIHNpbmIgKiB0aGlzLnltZjtcbiAgICAgIH1cbiAgICAgIHggPSB0aGlzLnhtZiAqIGIgKiBjb3NiICogc2lubGFtO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0aGlzLk5fUE9MRTpcbiAgICBjYXNlIHRoaXMuU19QT0xFOlxuICAgICAgaWYgKHEgPj0gMCkge1xuICAgICAgICB4ID0gKGIgPSBNYXRoLnNxcnQocSkpICogc2lubGFtO1xuICAgICAgICB5ID0gY29zbGFtICogKCh0aGlzLm1vZGUgPT09IHRoaXMuU19QT0xFKSA/IGIgOiAtYik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgeCA9IHkgPSAwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcC54ID0gdGhpcy5hICogeCArIHRoaXMueDA7XG4gIHAueSA9IHRoaXMuYSAqIHkgKyB0aGlzLnkwO1xuICByZXR1cm4gcDtcbn1cblxuLyogSW52ZXJzZSBlcXVhdGlvbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW52ZXJzZSRpKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICB2YXIgeCA9IHAueCAvIHRoaXMuYTtcbiAgdmFyIHkgPSBwLnkgLyB0aGlzLmE7XG4gIHZhciBsYW0sIHBoaSwgY0NlLCBzQ2UsIHEsIHJobywgYWI7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHZhciBjb3N6ID0gMCxcbiAgICAgIHJoLCBzaW56ID0gMDtcblxuICAgIHJoID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIHBoaSA9IHJoICogMC41O1xuICAgIGlmIChwaGkgPiAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcGhpID0gMiAqIE1hdGguYXNpbihwaGkpO1xuICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEgfHwgdGhpcy5tb2RlID09PSB0aGlzLkVRVUlUKSB7XG4gICAgICBzaW56ID0gTWF0aC5zaW4ocGhpKTtcbiAgICAgIGNvc3ogPSBNYXRoLmNvcyhwaGkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgdGhpcy5FUVVJVDpcbiAgICAgIHBoaSA9IChNYXRoLmFicyhyaCkgPD0gRVBTTE4pID8gMCA6IE1hdGguYXNpbih5ICogc2lueiAvIHJoKTtcbiAgICAgIHggKj0gc2luejtcbiAgICAgIHkgPSBjb3N6ICogcmg7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuT0JMSVE6XG4gICAgICBwaGkgPSAoTWF0aC5hYnMocmgpIDw9IEVQU0xOKSA/IHRoaXMubGF0MCA6IE1hdGguYXNpbihjb3N6ICogdGhpcy5zaW5waDAgKyB5ICogc2lueiAqIHRoaXMuY29zcGgwIC8gcmgpO1xuICAgICAgeCAqPSBzaW56ICogdGhpcy5jb3NwaDA7XG4gICAgICB5ID0gKGNvc3ogLSBNYXRoLnNpbihwaGkpICogdGhpcy5zaW5waDApICogcmg7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRoaXMuTl9QT0xFOlxuICAgICAgeSA9IC15O1xuICAgICAgcGhpID0gSEFMRl9QSSAtIHBoaTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdGhpcy5TX1BPTEU6XG4gICAgICBwaGkgLT0gSEFMRl9QSTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYW0gPSAoeSA9PT0gMCAmJiAodGhpcy5tb2RlID09PSB0aGlzLkVRVUlUIHx8IHRoaXMubW9kZSA9PT0gdGhpcy5PQkxJUSkpID8gMCA6IE1hdGguYXRhbjIoeCwgeSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgYWIgPSAwO1xuICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuT0JMSVEgfHwgdGhpcy5tb2RlID09PSB0aGlzLkVRVUlUKSB7XG4gICAgICB4IC89IHRoaXMuZGQ7XG4gICAgICB5ICo9IHRoaXMuZGQ7XG4gICAgICByaG8gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgICBpZiAocmhvIDwgRVBTTE4pIHtcbiAgICAgICAgcC54ID0gdGhpcy5sb25nMDtcbiAgICAgICAgcC55ID0gdGhpcy5sYXQwO1xuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH1cbiAgICAgIHNDZSA9IDIgKiBNYXRoLmFzaW4oMC41ICogcmhvIC8gdGhpcy5ycSk7XG4gICAgICBjQ2UgPSBNYXRoLmNvcyhzQ2UpO1xuICAgICAgeCAqPSAoc0NlID0gTWF0aC5zaW4oc0NlKSk7XG4gICAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk9CTElRKSB7XG4gICAgICAgIGFiID0gY0NlICogdGhpcy5zaW5iMSArIHkgKiBzQ2UgKiB0aGlzLmNvc2IxIC8gcmhvO1xuICAgICAgICBxID0gdGhpcy5xcCAqIGFiO1xuICAgICAgICB5ID0gcmhvICogdGhpcy5jb3NiMSAqIGNDZSAtIHkgKiB0aGlzLnNpbmIxICogc0NlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFiID0geSAqIHNDZSAvIHJobztcbiAgICAgICAgcSA9IHRoaXMucXAgKiBhYjtcbiAgICAgICAgeSA9IHJobyAqIGNDZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5tb2RlID09PSB0aGlzLk5fUE9MRSB8fCB0aGlzLm1vZGUgPT09IHRoaXMuU19QT0xFKSB7XG4gICAgICBpZiAodGhpcy5tb2RlID09PSB0aGlzLk5fUE9MRSkge1xuICAgICAgICB5ID0gLXk7XG4gICAgICB9XG4gICAgICBxID0gKHggKiB4ICsgeSAqIHkpO1xuICAgICAgaWYgKCFxKSB7XG4gICAgICAgIHAueCA9IHRoaXMubG9uZzA7XG4gICAgICAgIHAueSA9IHRoaXMubGF0MDtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9XG4gICAgICBhYiA9IDEgLSBxIC8gdGhpcy5xcDtcbiAgICAgIGlmICh0aGlzLm1vZGUgPT09IHRoaXMuU19QT0xFKSB7XG4gICAgICAgIGFiID0gLWFiO1xuICAgICAgfVxuICAgIH1cbiAgICBsYW0gPSBNYXRoLmF0YW4yKHgsIHkpO1xuICAgIHBoaSA9IGF1dGhsYXQoTWF0aC5hc2luKGFiKSwgdGhpcy5hcGEpO1xuICB9XG5cbiAgcC54ID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgbGFtKTtcbiAgcC55ID0gcGhpO1xuICByZXR1cm4gcDtcbn1cblxuLyogZGV0ZXJtaW5lIGxhdGl0dWRlIGZyb20gYXV0aGFsaWMgbGF0aXR1ZGUgKi9cbnZhciBQMDAgPSAwLjMzMzMzMzMzMzMzMzMzMzMzMzMzO1xuXG52YXIgUDAxID0gMC4xNzIyMjIyMjIyMjIyMjIyMjIyMjtcbnZhciBQMDIgPSAwLjEwMjU3OTM2NTA3OTM2NTA3OTM2O1xudmFyIFAxMCA9IDAuMDYzODg4ODg4ODg4ODg4ODg4ODg7XG52YXIgUDExID0gMC4wNjY0MDIxMTY0MDIxMTY0MDIxMTtcbnZhciBQMjAgPSAwLjAxNjQxNTAxMjk0MjE5MTU0NDQzO1xuXG5mdW5jdGlvbiBhdXRoc2V0KGVzKSB7XG4gIHZhciB0O1xuICB2YXIgQVBBID0gW107XG4gIEFQQVswXSA9IGVzICogUDAwO1xuICB0ID0gZXMgKiBlcztcbiAgQVBBWzBdICs9IHQgKiBQMDE7XG4gIEFQQVsxXSA9IHQgKiBQMTA7XG4gIHQgKj0gZXM7XG4gIEFQQVswXSArPSB0ICogUDAyO1xuICBBUEFbMV0gKz0gdCAqIFAxMTtcbiAgQVBBWzJdID0gdCAqIFAyMDtcbiAgcmV0dXJuIEFQQTtcbn1cblxuZnVuY3Rpb24gYXV0aGxhdChiZXRhLCBBUEEpIHtcbiAgdmFyIHQgPSBiZXRhICsgYmV0YTtcbiAgcmV0dXJuIChiZXRhICsgQVBBWzBdICogTWF0aC5zaW4odCkgKyBBUEFbMV0gKiBNYXRoLnNpbih0ICsgdCkgKyBBUEFbMl0gKiBNYXRoLnNpbih0ICsgdCArIHQpKTtcbn1cblxudmFyIG5hbWVzJGkgPSBbXCJMYW1iZXJ0IEF6aW11dGhhbCBFcXVhbCBBcmVhXCIsIFwiTGFtYmVydF9BemltdXRoYWxfRXF1YWxfQXJlYVwiLCBcImxhZWFcIl07XG52YXIgbGFlYSA9IHtcbiAgaW5pdDogaW5pdCRpLFxuICBmb3J3YXJkOiBmb3J3YXJkJGksXG4gIGludmVyc2U6IGludmVyc2UkaSxcbiAgbmFtZXM6IG5hbWVzJGksXG4gIFNfUE9MRTogU19QT0xFLFxuICBOX1BPTEU6IE5fUE9MRSxcbiAgRVFVSVQ6IEVRVUlULFxuICBPQkxJUTogT0JMSVFcbn07XG5cbmZ1bmN0aW9uIGFzaW56KHgpIHtcbiAgaWYgKE1hdGguYWJzKHgpID4gMSkge1xuICAgIHggPSAoeCA+IDEpID8gMSA6IC0xO1xuICB9XG4gIHJldHVybiBNYXRoLmFzaW4oeCk7XG59XG5cbmZ1bmN0aW9uIGluaXQkaCgpIHtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxICsgdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMudGVtcCA9IHRoaXMuYiAvIHRoaXMuYTtcbiAgdGhpcy5lcyA9IDEgLSBNYXRoLnBvdyh0aGlzLnRlbXAsIDIpO1xuICB0aGlzLmUzID0gTWF0aC5zcXJ0KHRoaXMuZXMpO1xuXG4gIHRoaXMuc2luX3BvID0gTWF0aC5zaW4odGhpcy5sYXQxKTtcbiAgdGhpcy5jb3NfcG8gPSBNYXRoLmNvcyh0aGlzLmxhdDEpO1xuICB0aGlzLnQxID0gdGhpcy5zaW5fcG87XG4gIHRoaXMuY29uID0gdGhpcy5zaW5fcG87XG4gIHRoaXMubXMxID0gbXNmbnoodGhpcy5lMywgdGhpcy5zaW5fcG8sIHRoaXMuY29zX3BvKTtcbiAgdGhpcy5xczEgPSBxc2Zueih0aGlzLmUzLCB0aGlzLnNpbl9wbyk7XG5cbiAgdGhpcy5zaW5fcG8gPSBNYXRoLnNpbih0aGlzLmxhdDIpO1xuICB0aGlzLmNvc19wbyA9IE1hdGguY29zKHRoaXMubGF0Mik7XG4gIHRoaXMudDIgPSB0aGlzLnNpbl9wbztcbiAgdGhpcy5tczIgPSBtc2Zueih0aGlzLmUzLCB0aGlzLnNpbl9wbywgdGhpcy5jb3NfcG8pO1xuICB0aGlzLnFzMiA9IHFzZm56KHRoaXMuZTMsIHRoaXMuc2luX3BvKTtcblxuICB0aGlzLnNpbl9wbyA9IE1hdGguc2luKHRoaXMubGF0MCk7XG4gIHRoaXMuY29zX3BvID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbiAgdGhpcy50MyA9IHRoaXMuc2luX3BvO1xuICB0aGlzLnFzMCA9IHFzZm56KHRoaXMuZTMsIHRoaXMuc2luX3BvKTtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxIC0gdGhpcy5sYXQyKSA+IEVQU0xOKSB7XG4gICAgdGhpcy5uczAgPSAodGhpcy5tczEgKiB0aGlzLm1zMSAtIHRoaXMubXMyICogdGhpcy5tczIpIC8gKHRoaXMucXMyIC0gdGhpcy5xczEpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMubnMwID0gdGhpcy5jb247XG4gIH1cbiAgdGhpcy5jID0gdGhpcy5tczEgKiB0aGlzLm1zMSArIHRoaXMubnMwICogdGhpcy5xczE7XG4gIHRoaXMucmggPSB0aGlzLmEgKiBNYXRoLnNxcnQodGhpcy5jIC0gdGhpcy5uczAgKiB0aGlzLnFzMCkgLyB0aGlzLm5zMDtcbn1cblxuLyogQWxiZXJzIENvbmljYWwgRXF1YWwgQXJlYSBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5mdW5jdGlvbiBmb3J3YXJkJGgocCkge1xuXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdGhpcy5zaW5fcGhpID0gTWF0aC5zaW4obGF0KTtcbiAgdGhpcy5jb3NfcGhpID0gTWF0aC5jb3MobGF0KTtcblxuICB2YXIgcXMgPSBxc2Zueih0aGlzLmUzLCB0aGlzLnNpbl9waGkpO1xuICB2YXIgcmgxID0gdGhpcy5hICogTWF0aC5zcXJ0KHRoaXMuYyAtIHRoaXMubnMwICogcXMpIC8gdGhpcy5uczA7XG4gIHZhciB0aGV0YSA9IHRoaXMubnMwICogYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHggPSByaDEgKiBNYXRoLnNpbih0aGV0YSkgKyB0aGlzLngwO1xuICB2YXIgeSA9IHRoaXMucmggLSByaDEgKiBNYXRoLmNvcyh0aGV0YSkgKyB0aGlzLnkwO1xuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlJGgocCkge1xuICB2YXIgcmgxLCBxcywgY29uLCB0aGV0YSwgbG9uLCBsYXQ7XG5cbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSA9IHRoaXMucmggLSBwLnkgKyB0aGlzLnkwO1xuICBpZiAodGhpcy5uczAgPj0gMCkge1xuICAgIHJoMSA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIGNvbiA9IDE7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmgxID0gLU1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIGNvbiA9IC0xO1xuICB9XG4gIHRoZXRhID0gMDtcbiAgaWYgKHJoMSAhPT0gMCkge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMihjb24gKiBwLngsIGNvbiAqIHAueSk7XG4gIH1cbiAgY29uID0gcmgxICogdGhpcy5uczAgLyB0aGlzLmE7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGxhdCA9IE1hdGguYXNpbigodGhpcy5jIC0gY29uICogY29uKSAvICgyICogdGhpcy5uczApKTtcbiAgfVxuICBlbHNlIHtcbiAgICBxcyA9ICh0aGlzLmMgLSBjb24gKiBjb24pIC8gdGhpcy5uczA7XG4gICAgbGF0ID0gdGhpcy5waGkxeih0aGlzLmUzLCBxcyk7XG4gIH1cblxuICBsb24gPSBhZGp1c3RfbG9uKHRoZXRhIC8gdGhpcy5uczAgKyB0aGlzLmxvbmcwKTtcbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG4vKiBGdW5jdGlvbiB0byBjb21wdXRlIHBoaTEsIHRoZSBsYXRpdHVkZSBmb3IgdGhlIGludmVyc2Ugb2YgdGhlXG4gICBBbGJlcnMgQ29uaWNhbCBFcXVhbC1BcmVhIHByb2plY3Rpb24uXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIHBoaTF6KGVjY2VudCwgcXMpIHtcbiAgdmFyIHNpbnBoaSwgY29zcGhpLCBjb24sIGNvbSwgZHBoaTtcbiAgdmFyIHBoaSA9IGFzaW56KDAuNSAqIHFzKTtcbiAgaWYgKGVjY2VudCA8IEVQU0xOKSB7XG4gICAgcmV0dXJuIHBoaTtcbiAgfVxuXG4gIHZhciBlY2NudHMgPSBlY2NlbnQgKiBlY2NlbnQ7XG4gIGZvciAodmFyIGkgPSAxOyBpIDw9IDI1OyBpKyspIHtcbiAgICBzaW5waGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIGNvc3BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgY29uID0gZWNjZW50ICogc2lucGhpO1xuICAgIGNvbSA9IDEgLSBjb24gKiBjb247XG4gICAgZHBoaSA9IDAuNSAqIGNvbSAqIGNvbSAvIGNvc3BoaSAqIChxcyAvICgxIC0gZWNjbnRzKSAtIHNpbnBoaSAvIGNvbSArIDAuNSAvIGVjY2VudCAqIE1hdGgubG9nKCgxIC0gY29uKSAvICgxICsgY29uKSkpO1xuICAgIHBoaSA9IHBoaSArIGRwaGk7XG4gICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IDFlLTcpIHtcbiAgICAgIHJldHVybiBwaGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgbmFtZXMkaCA9IFtcIkFsYmVyc19Db25pY19FcXVhbF9BcmVhXCIsIFwiQWxiZXJzXCIsIFwiYWVhXCJdO1xudmFyIGFlYSA9IHtcbiAgaW5pdDogaW5pdCRoLFxuICBmb3J3YXJkOiBmb3J3YXJkJGgsXG4gIGludmVyc2U6IGludmVyc2UkaCxcbiAgbmFtZXM6IG5hbWVzJGgsXG4gIHBoaTF6OiBwaGkxelxufTtcblxuLypcbiAgcmVmZXJlbmNlOlxuICAgIFdvbGZyYW0gTWF0aHdvcmxkIFwiR25vbW9uaWMgUHJvamVjdGlvblwiXG4gICAgaHR0cDovL21hdGh3b3JsZC53b2xmcmFtLmNvbS9Hbm9tb25pY1Byb2plY3Rpb24uaHRtbFxuICAgIEFjY2Vzc2VkOiAxMnRoIE5vdmVtYmVyIDIwMDlcbiAgKi9cbmZ1bmN0aW9uIGluaXQkZygpIHtcblxuICAvKiBQbGFjZSBwYXJhbWV0ZXJzIGluIHN0YXRpYyBzdG9yYWdlIGZvciBjb21tb24gdXNlXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdGhpcy5zaW5fcDE0ID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdGhpcy5jb3NfcDE0ID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbiAgLy8gQXBwcm94aW1hdGlvbiBmb3IgcHJvamVjdGluZyBwb2ludHMgdG8gdGhlIGhvcml6b24gKGluZmluaXR5KVxuICB0aGlzLmluZmluaXR5X2Rpc3QgPSAxMDAwICogdGhpcy5hO1xuICB0aGlzLnJjID0gMTtcbn1cblxuLyogR25vbW9uaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGZvcndhcmQkZyhwKSB7XG4gIHZhciBzaW5waGksIGNvc3BoaTsgLyogc2luIGFuZCBjb3MgdmFsdWUgICAgICAgICovXG4gIHZhciBkbG9uOyAvKiBkZWx0YSBsb25naXR1ZGUgdmFsdWUgICAgICAqL1xuICB2YXIgY29zbG9uOyAvKiBjb3Mgb2YgbG9uZ2l0dWRlICAgICAgICAqL1xuICB2YXIga3NwOyAvKiBzY2FsZSBmYWN0b3IgICAgICAgICAgKi9cbiAgdmFyIGc7XG4gIHZhciB4LCB5O1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcblxuICBzaW5waGkgPSBNYXRoLnNpbihsYXQpO1xuICBjb3NwaGkgPSBNYXRoLmNvcyhsYXQpO1xuXG4gIGNvc2xvbiA9IE1hdGguY29zKGRsb24pO1xuICBnID0gdGhpcy5zaW5fcDE0ICogc2lucGhpICsgdGhpcy5jb3NfcDE0ICogY29zcGhpICogY29zbG9uO1xuICBrc3AgPSAxO1xuICBpZiAoKGcgPiAwKSB8fCAoTWF0aC5hYnMoZykgPD0gRVBTTE4pKSB7XG4gICAgeCA9IHRoaXMueDAgKyB0aGlzLmEgKiBrc3AgKiBjb3NwaGkgKiBNYXRoLnNpbihkbG9uKSAvIGc7XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiBrc3AgKiAodGhpcy5jb3NfcDE0ICogc2lucGhpIC0gdGhpcy5zaW5fcDE0ICogY29zcGhpICogY29zbG9uKSAvIGc7XG4gIH1cbiAgZWxzZSB7XG5cbiAgICAvLyBQb2ludCBpcyBpbiB0aGUgb3Bwb3NpbmcgaGVtaXNwaGVyZSBhbmQgaXMgdW5wcm9qZWN0YWJsZVxuICAgIC8vIFdlIHN0aWxsIG5lZWQgdG8gcmV0dXJuIGEgcmVhc29uYWJsZSBwb2ludCwgc28gd2UgcHJvamVjdFxuICAgIC8vIHRvIGluZmluaXR5LCBvbiBhIGJlYXJpbmdcbiAgICAvLyBlcXVpdmFsZW50IHRvIHRoZSBub3J0aGVybiBoZW1pc3BoZXJlIGVxdWl2YWxlbnRcbiAgICAvLyBUaGlzIGlzIGEgcmVhc29uYWJsZSBhcHByb3hpbWF0aW9uIGZvciBzaG9ydCBzaGFwZXMgYW5kIGxpbmVzIHRoYXRcbiAgICAvLyBzdHJhZGRsZSB0aGUgaG9yaXpvbi5cblxuICAgIHggPSB0aGlzLngwICsgdGhpcy5pbmZpbml0eV9kaXN0ICogY29zcGhpICogTWF0aC5zaW4oZGxvbik7XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmluZmluaXR5X2Rpc3QgKiAodGhpcy5jb3NfcDE0ICogc2lucGhpIC0gdGhpcy5zaW5fcDE0ICogY29zcGhpICogY29zbG9uKTtcblxuICB9XG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlJGcocCkge1xuICB2YXIgcmg7IC8qIFJobyAqL1xuICB2YXIgc2luYywgY29zYztcbiAgdmFyIGM7XG4gIHZhciBsb24sIGxhdDtcblxuICAvKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBwLnggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmE7XG4gIHAueSA9IChwLnkgLSB0aGlzLnkwKSAvIHRoaXMuYTtcblxuICBwLnggLz0gdGhpcy5rMDtcbiAgcC55IC89IHRoaXMuazA7XG5cbiAgaWYgKChyaCA9IE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpKSkge1xuICAgIGMgPSBNYXRoLmF0YW4yKHJoLCB0aGlzLnJjKTtcbiAgICBzaW5jID0gTWF0aC5zaW4oYyk7XG4gICAgY29zYyA9IE1hdGguY29zKGMpO1xuXG4gICAgbGF0ID0gYXNpbnooY29zYyAqIHRoaXMuc2luX3AxNCArIChwLnkgKiBzaW5jICogdGhpcy5jb3NfcDE0KSAvIHJoKTtcbiAgICBsb24gPSBNYXRoLmF0YW4yKHAueCAqIHNpbmMsIHJoICogdGhpcy5jb3NfcDE0ICogY29zYyAtIHAueSAqIHRoaXMuc2luX3AxNCAqIHNpbmMpO1xuICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIGxvbik7XG4gIH1cbiAgZWxzZSB7XG4gICAgbGF0ID0gdGhpcy5waGljMDtcbiAgICBsb24gPSAwO1xuICB9XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG52YXIgbmFtZXMkZyA9IFtcImdub21cIl07XG52YXIgZ25vbSA9IHtcbiAgaW5pdDogaW5pdCRnLFxuICBmb3J3YXJkOiBmb3J3YXJkJGcsXG4gIGludmVyc2U6IGludmVyc2UkZyxcbiAgbmFtZXM6IG5hbWVzJGdcbn07XG5cbmZ1bmN0aW9uIGlxc2ZueihlY2NlbnQsIHEpIHtcbiAgdmFyIHRlbXAgPSAxIC0gKDEgLSBlY2NlbnQgKiBlY2NlbnQpIC8gKDIgKiBlY2NlbnQpICogTWF0aC5sb2coKDEgLSBlY2NlbnQpIC8gKDEgKyBlY2NlbnQpKTtcbiAgaWYgKE1hdGguYWJzKE1hdGguYWJzKHEpIC0gdGVtcCkgPCAxLjBFLTYpIHtcbiAgICBpZiAocSA8IDApIHtcbiAgICAgIHJldHVybiAoLTEgKiBIQUxGX1BJKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gSEFMRl9QSTtcbiAgICB9XG4gIH1cbiAgLy92YXIgcGhpID0gMC41KiBxLygxLWVjY2VudCplY2NlbnQpO1xuICB2YXIgcGhpID0gTWF0aC5hc2luKDAuNSAqIHEpO1xuICB2YXIgZHBoaTtcbiAgdmFyIHNpbl9waGk7XG4gIHZhciBjb3NfcGhpO1xuICB2YXIgY29uO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICBzaW5fcGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICBjb3NfcGhpID0gTWF0aC5jb3MocGhpKTtcbiAgICBjb24gPSBlY2NlbnQgKiBzaW5fcGhpO1xuICAgIGRwaGkgPSBNYXRoLnBvdygxIC0gY29uICogY29uLCAyKSAvICgyICogY29zX3BoaSkgKiAocSAvICgxIC0gZWNjZW50ICogZWNjZW50KSAtIHNpbl9waGkgLyAoMSAtIGNvbiAqIGNvbikgKyAwLjUgLyBlY2NlbnQgKiBNYXRoLmxvZygoMSAtIGNvbikgLyAoMSArIGNvbikpKTtcbiAgICBwaGkgKz0gZHBoaTtcbiAgICBpZiAoTWF0aC5hYnMoZHBoaSkgPD0gMC4wMDAwMDAwMDAxKSB7XG4gICAgICByZXR1cm4gcGhpO1xuICAgIH1cbiAgfVxuXG4gIC8vY29uc29sZS5sb2coXCJJUVNGTi1DT05WOkxhdGl0dWRlIGZhaWxlZCB0byBjb252ZXJnZSBhZnRlciAzMCBpdGVyYXRpb25zXCIpO1xuICByZXR1cm4gTmFOO1xufVxuXG4vKlxuICByZWZlcmVuY2U6XG4gICAgXCJDYXJ0b2dyYXBoaWMgUHJvamVjdGlvbiBQcm9jZWR1cmVzIGZvciB0aGUgVU5JWCBFbnZpcm9ubWVudC1cbiAgICBBIFVzZXIncyBNYW51YWxcIiBieSBHZXJhbGQgSS4gRXZlbmRlbixcbiAgICBVU0dTIE9wZW4gRmlsZSBSZXBvcnQgOTAtMjg0YW5kIFJlbGVhc2UgNCBJbnRlcmltIFJlcG9ydHMgKDIwMDMpXG4qL1xuZnVuY3Rpb24gaW5pdCRmKCkge1xuICAvL25vLW9wXG4gIGlmICghdGhpcy5zcGhlcmUpIHtcbiAgICB0aGlzLmswID0gbXNmbnoodGhpcy5lLCBNYXRoLnNpbih0aGlzLmxhdF90cyksIE1hdGguY29zKHRoaXMubGF0X3RzKSk7XG4gIH1cbn1cblxuLyogQ3lsaW5kcmljYWwgRXF1YWwgQXJlYSBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gZm9yd2FyZCRmKHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIHgsIHk7XG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgeCA9IHRoaXMueDAgKyB0aGlzLmEgKiBkbG9uICogTWF0aC5jb3ModGhpcy5sYXRfdHMpO1xuICAgIHkgPSB0aGlzLnkwICsgdGhpcy5hICogTWF0aC5zaW4obGF0KSAvIE1hdGguY29zKHRoaXMubGF0X3RzKTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgcXMgPSBxc2Zueih0aGlzLmUsIE1hdGguc2luKGxhdCkpO1xuICAgIHggPSB0aGlzLngwICsgdGhpcy5hICogdGhpcy5rMCAqIGRsb247XG4gICAgeSA9IHRoaXMueTAgKyB0aGlzLmEgKiBxcyAqIDAuNSAvIHRoaXMuazA7XG4gIH1cblxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuLyogQ3lsaW5kcmljYWwgRXF1YWwgQXJlYSBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW52ZXJzZSRmKHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICB2YXIgbG9uLCBsYXQ7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgKHAueCAvIHRoaXMuYSkgLyBNYXRoLmNvcyh0aGlzLmxhdF90cykpO1xuICAgIGxhdCA9IE1hdGguYXNpbigocC55IC8gdGhpcy5hKSAqIE1hdGguY29zKHRoaXMubGF0X3RzKSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgbGF0ID0gaXFzZm56KHRoaXMuZSwgMiAqIHAueSAqIHRoaXMuazAgLyB0aGlzLmEpO1xuICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIHAueCAvICh0aGlzLmEgKiB0aGlzLmswKSk7XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRmID0gW1wiY2VhXCJdO1xudmFyIGNlYSA9IHtcbiAgaW5pdDogaW5pdCRmLFxuICBmb3J3YXJkOiBmb3J3YXJkJGYsXG4gIGludmVyc2U6IGludmVyc2UkZixcbiAgbmFtZXM6IG5hbWVzJGZcbn07XG5cbmZ1bmN0aW9uIGluaXQkZSgpIHtcblxuICB0aGlzLngwID0gdGhpcy54MCB8fCAwO1xuICB0aGlzLnkwID0gdGhpcy55MCB8fCAwO1xuICB0aGlzLmxhdDAgPSB0aGlzLmxhdDAgfHwgMDtcbiAgdGhpcy5sb25nMCA9IHRoaXMubG9uZzAgfHwgMDtcbiAgdGhpcy5sYXRfdHMgPSB0aGlzLmxhdF90cyB8fCAwO1xuICB0aGlzLnRpdGxlID0gdGhpcy50aXRsZSB8fCBcIkVxdWlkaXN0YW50IEN5bGluZHJpY2FsIChQbGF0ZSBDYXJyZSlcIjtcblxuICB0aGlzLnJjID0gTWF0aC5jb3ModGhpcy5sYXRfdHMpO1xufVxuXG4vLyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBmb3J3YXJkJGUocCkge1xuXG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG5cbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICB2YXIgZGxhdCA9IGFkanVzdF9sYXQobGF0IC0gdGhpcy5sYXQwKTtcbiAgcC54ID0gdGhpcy54MCArICh0aGlzLmEgKiBkbG9uICogdGhpcy5yYyk7XG4gIHAueSA9IHRoaXMueTAgKyAodGhpcy5hICogZGxhdCk7XG4gIHJldHVybiBwO1xufVxuXG4vLyBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBpbnZlcnNlJGUocCkge1xuXG4gIHZhciB4ID0gcC54O1xuICB2YXIgeSA9IHAueTtcblxuICBwLnggPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAoKHggLSB0aGlzLngwKSAvICh0aGlzLmEgKiB0aGlzLnJjKSkpO1xuICBwLnkgPSBhZGp1c3RfbGF0KHRoaXMubGF0MCArICgoeSAtIHRoaXMueTApIC8gKHRoaXMuYSkpKTtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRlID0gW1wiRXF1aXJlY3Rhbmd1bGFyXCIsIFwiRXF1aWRpc3RhbnRfQ3lsaW5kcmljYWxcIiwgXCJlcWNcIl07XG52YXIgZXFjID0ge1xuICBpbml0OiBpbml0JGUsXG4gIGZvcndhcmQ6IGZvcndhcmQkZSxcbiAgaW52ZXJzZTogaW52ZXJzZSRlLFxuICBuYW1lczogbmFtZXMkZVxufTtcblxudmFyIE1BWF9JVEVSJDEgPSAyMDtcblxuZnVuY3Rpb24gaW5pdCRkKCkge1xuICAvKiBQbGFjZSBwYXJhbWV0ZXJzIGluIHN0YXRpYyBzdG9yYWdlIGZvciBjb21tb24gdXNlXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdGhpcy50ZW1wID0gdGhpcy5iIC8gdGhpcy5hO1xuICB0aGlzLmVzID0gMSAtIE1hdGgucG93KHRoaXMudGVtcCwgMik7IC8vIGRldmFpdCBldHJlIGRhbnMgdG1lcmMuanMgbWFpcyBuIHkgZXN0IHBhcyBkb25jIGplIGNvbW1lbnRlIHNpbm9uIHJldG91ciBkZSB2YWxldXJzIG51bGxlc1xuICB0aGlzLmUgPSBNYXRoLnNxcnQodGhpcy5lcyk7XG4gIHRoaXMuZTAgPSBlMGZuKHRoaXMuZXMpO1xuICB0aGlzLmUxID0gZTFmbih0aGlzLmVzKTtcbiAgdGhpcy5lMiA9IGUyZm4odGhpcy5lcyk7XG4gIHRoaXMuZTMgPSBlM2ZuKHRoaXMuZXMpO1xuICB0aGlzLm1sMCA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQwKTsgLy9zaSBxdWUgZGVzIHplcm9zIGxlIGNhbGN1bCBuZSBzZSBmYWl0IHBhc1xufVxuXG4vKiBQb2x5Y29uaWMgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGZvcndhcmQkZChwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIHZhciB4LCB5LCBlbDtcbiAgdmFyIGRsb24gPSBhZGp1c3RfbG9uKGxvbiAtIHRoaXMubG9uZzApO1xuICBlbCA9IGRsb24gKiBNYXRoLnNpbihsYXQpO1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBpZiAoTWF0aC5hYnMobGF0KSA8PSBFUFNMTikge1xuICAgICAgeCA9IHRoaXMuYSAqIGRsb247XG4gICAgICB5ID0gLTEgKiB0aGlzLmEgKiB0aGlzLmxhdDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgeCA9IHRoaXMuYSAqIE1hdGguc2luKGVsKSAvIE1hdGgudGFuKGxhdCk7XG4gICAgICB5ID0gdGhpcy5hICogKGFkanVzdF9sYXQobGF0IC0gdGhpcy5sYXQwKSArICgxIC0gTWF0aC5jb3MoZWwpKSAvIE1hdGgudGFuKGxhdCkpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoTWF0aC5hYnMobGF0KSA8PSBFUFNMTikge1xuICAgICAgeCA9IHRoaXMuYSAqIGRsb247XG4gICAgICB5ID0gLTEgKiB0aGlzLm1sMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmwgPSBnTih0aGlzLmEsIHRoaXMuZSwgTWF0aC5zaW4obGF0KSkgLyBNYXRoLnRhbihsYXQpO1xuICAgICAgeCA9IG5sICogTWF0aC5zaW4oZWwpO1xuICAgICAgeSA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgbGF0KSAtIHRoaXMubWwwICsgbmwgKiAoMSAtIE1hdGguY29zKGVsKSk7XG4gICAgfVxuXG4gIH1cbiAgcC54ID0geCArIHRoaXMueDA7XG4gIHAueSA9IHkgKyB0aGlzLnkwO1xuICByZXR1cm4gcDtcbn1cblxuLyogSW52ZXJzZSBlcXVhdGlvbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW52ZXJzZSRkKHApIHtcbiAgdmFyIGxvbiwgbGF0LCB4LCB5LCBpO1xuICB2YXIgYWwsIGJsO1xuICB2YXIgcGhpLCBkcGhpO1xuICB4ID0gcC54IC0gdGhpcy54MDtcbiAgeSA9IHAueSAtIHRoaXMueTA7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKE1hdGguYWJzKHkgKyB0aGlzLmEgKiB0aGlzLmxhdDApIDw9IEVQU0xOKSB7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHggLyB0aGlzLmEgKyB0aGlzLmxvbmcwKTtcbiAgICAgIGxhdCA9IDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYWwgPSB0aGlzLmxhdDAgKyB5IC8gdGhpcy5hO1xuICAgICAgYmwgPSB4ICogeCAvIHRoaXMuYSAvIHRoaXMuYSArIGFsICogYWw7XG4gICAgICBwaGkgPSBhbDtcbiAgICAgIHZhciB0YW5waGk7XG4gICAgICBmb3IgKGkgPSBNQVhfSVRFUiQxOyBpOyAtLWkpIHtcbiAgICAgICAgdGFucGhpID0gTWF0aC50YW4ocGhpKTtcbiAgICAgICAgZHBoaSA9IC0xICogKGFsICogKHBoaSAqIHRhbnBoaSArIDEpIC0gcGhpIC0gMC41ICogKHBoaSAqIHBoaSArIGJsKSAqIHRhbnBoaSkgLyAoKHBoaSAtIGFsKSAvIHRhbnBoaSAtIDEpO1xuICAgICAgICBwaGkgKz0gZHBoaTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRwaGkpIDw9IEVQU0xOKSB7XG4gICAgICAgICAgbGF0ID0gcGhpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAoTWF0aC5hc2luKHggKiBNYXRoLnRhbihwaGkpIC8gdGhpcy5hKSkgLyBNYXRoLnNpbihsYXQpKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE1hdGguYWJzKHkgKyB0aGlzLm1sMCkgPD0gRVBTTE4pIHtcbiAgICAgIGxhdCA9IDA7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyB4IC8gdGhpcy5hKTtcbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICAgIGFsID0gKHRoaXMubWwwICsgeSkgLyB0aGlzLmE7XG4gICAgICBibCA9IHggKiB4IC8gdGhpcy5hIC8gdGhpcy5hICsgYWwgKiBhbDtcbiAgICAgIHBoaSA9IGFsO1xuICAgICAgdmFyIGNsLCBtbG4sIG1sbnAsIG1hO1xuICAgICAgdmFyIGNvbjtcbiAgICAgIGZvciAoaSA9IE1BWF9JVEVSJDE7IGk7IC0taSkge1xuICAgICAgICBjb24gPSB0aGlzLmUgKiBNYXRoLnNpbihwaGkpO1xuICAgICAgICBjbCA9IE1hdGguc3FydCgxIC0gY29uICogY29uKSAqIE1hdGgudGFuKHBoaSk7XG4gICAgICAgIG1sbiA9IHRoaXMuYSAqIG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgcGhpKTtcbiAgICAgICAgbWxucCA9IHRoaXMuZTAgLSAyICogdGhpcy5lMSAqIE1hdGguY29zKDIgKiBwaGkpICsgNCAqIHRoaXMuZTIgKiBNYXRoLmNvcyg0ICogcGhpKSAtIDYgKiB0aGlzLmUzICogTWF0aC5jb3MoNiAqIHBoaSk7XG4gICAgICAgIG1hID0gbWxuIC8gdGhpcy5hO1xuICAgICAgICBkcGhpID0gKGFsICogKGNsICogbWEgKyAxKSAtIG1hIC0gMC41ICogY2wgKiAobWEgKiBtYSArIGJsKSkgLyAodGhpcy5lcyAqIE1hdGguc2luKDIgKiBwaGkpICogKG1hICogbWEgKyBibCAtIDIgKiBhbCAqIG1hKSAvICg0ICogY2wpICsgKGFsIC0gbWEpICogKGNsICogbWxucCAtIDIgLyBNYXRoLnNpbigyICogcGhpKSkgLSBtbG5wKTtcbiAgICAgICAgcGhpIC09IGRwaGk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkcGhpKSA8PSBFUFNMTikge1xuICAgICAgICAgIGxhdCA9IHBoaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2xhdD1waGk0eih0aGlzLmUsdGhpcy5lMCx0aGlzLmUxLHRoaXMuZTIsdGhpcy5lMyxhbCxibCwwLDApO1xuICAgICAgY2wgPSBNYXRoLnNxcnQoMSAtIHRoaXMuZXMgKiBNYXRoLnBvdyhNYXRoLnNpbihsYXQpLCAyKSkgKiBNYXRoLnRhbihsYXQpO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hc2luKHggKiBjbCAvIHRoaXMuYSkgLyBNYXRoLnNpbihsYXQpKTtcbiAgICB9XG4gIH1cblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyRkID0gW1wiUG9seWNvbmljXCIsIFwicG9seVwiXTtcbnZhciBwb2x5ID0ge1xuICBpbml0OiBpbml0JGQsXG4gIGZvcndhcmQ6IGZvcndhcmQkZCxcbiAgaW52ZXJzZTogaW52ZXJzZSRkLFxuICBuYW1lczogbmFtZXMkZFxufTtcblxuZnVuY3Rpb24gaW5pdCRjKCkge1xuICB0aGlzLkEgPSBbXTtcbiAgdGhpcy5BWzFdID0gMC42Mzk5MTc1MDczO1xuICB0aGlzLkFbMl0gPSAtMC4xMzU4Nzk3NjEzO1xuICB0aGlzLkFbM10gPSAwLjA2MzI5NDQwOTtcbiAgdGhpcy5BWzRdID0gLTAuMDI1MjY4NTM7XG4gIHRoaXMuQVs1XSA9IDAuMDExNzg3OTtcbiAgdGhpcy5BWzZdID0gLTAuMDA1NTE2MTtcbiAgdGhpcy5BWzddID0gMC4wMDI2OTA2O1xuICB0aGlzLkFbOF0gPSAtMC4wMDEzMzM7XG4gIHRoaXMuQVs5XSA9IDAuMDAwNjc7XG4gIHRoaXMuQVsxMF0gPSAtMC4wMDAzNDtcblxuICB0aGlzLkJfcmUgPSBbXTtcbiAgdGhpcy5CX2ltID0gW107XG4gIHRoaXMuQl9yZVsxXSA9IDAuNzU1Nzg1MzIyODtcbiAgdGhpcy5CX2ltWzFdID0gMDtcbiAgdGhpcy5CX3JlWzJdID0gMC4yNDkyMDQ2NDY7XG4gIHRoaXMuQl9pbVsyXSA9IDAuMDAzMzcxNTA3O1xuICB0aGlzLkJfcmVbM10gPSAtMC4wMDE1NDE3Mzk7XG4gIHRoaXMuQl9pbVszXSA9IDAuMDQxMDU4NTYwO1xuICB0aGlzLkJfcmVbNF0gPSAtMC4xMDE2MjkwNztcbiAgdGhpcy5CX2ltWzRdID0gMC4wMTcyNzYwOTtcbiAgdGhpcy5CX3JlWzVdID0gLTAuMjY2MjM0ODk7XG4gIHRoaXMuQl9pbVs1XSA9IC0wLjM2MjQ5MjE4O1xuICB0aGlzLkJfcmVbNl0gPSAtMC42ODcwOTgzO1xuICB0aGlzLkJfaW1bNl0gPSAtMS4xNjUxOTY3O1xuXG4gIHRoaXMuQ19yZSA9IFtdO1xuICB0aGlzLkNfaW0gPSBbXTtcbiAgdGhpcy5DX3JlWzFdID0gMS4zMjMxMjcwNDM5O1xuICB0aGlzLkNfaW1bMV0gPSAwO1xuICB0aGlzLkNfcmVbMl0gPSAtMC41NzcyNDU3ODk7XG4gIHRoaXMuQ19pbVsyXSA9IC0wLjAwNzgwOTU5ODtcbiAgdGhpcy5DX3JlWzNdID0gMC41MDgzMDc1MTM7XG4gIHRoaXMuQ19pbVszXSA9IC0wLjExMjIwODk1MjtcbiAgdGhpcy5DX3JlWzRdID0gLTAuMTUwOTQ3NjI7XG4gIHRoaXMuQ19pbVs0XSA9IDAuMTgyMDA2MDI7XG4gIHRoaXMuQ19yZVs1XSA9IDEuMDE0MTgxNzk7XG4gIHRoaXMuQ19pbVs1XSA9IDEuNjQ0OTc2OTY7XG4gIHRoaXMuQ19yZVs2XSA9IDEuOTY2MDU0OTtcbiAgdGhpcy5DX2ltWzZdID0gMi41MTI3NjQ1O1xuXG4gIHRoaXMuRCA9IFtdO1xuICB0aGlzLkRbMV0gPSAxLjU2MjcwMTQyNDM7XG4gIHRoaXMuRFsyXSA9IDAuNTE4NTQwNjM5ODtcbiAgdGhpcy5EWzNdID0gLTAuMDMzMzMwOTg7XG4gIHRoaXMuRFs0XSA9IC0wLjEwNTI5MDY7XG4gIHRoaXMuRFs1XSA9IC0wLjAzNjg1OTQ7XG4gIHRoaXMuRFs2XSA9IDAuMDA3MzE3O1xuICB0aGlzLkRbN10gPSAwLjAxMjIwO1xuICB0aGlzLkRbOF0gPSAwLjAwMzk0O1xuICB0aGlzLkRbOV0gPSAtMC4wMDEzO1xufVxuXG4vKipcbiAgICBOZXcgWmVhbGFuZCBNYXAgR3JpZCBGb3J3YXJkICAtIGxvbmcvbGF0IHRvIHgveVxuICAgIGxvbmcvbGF0IGluIHJhZGlhbnNcbiAgKi9cbmZ1bmN0aW9uIGZvcndhcmQkYyhwKSB7XG4gIHZhciBuO1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIHZhciBkZWx0YV9sYXQgPSBsYXQgLSB0aGlzLmxhdDA7XG4gIHZhciBkZWx0YV9sb24gPSBsb24gLSB0aGlzLmxvbmcwO1xuXG4gIC8vIDEuIENhbGN1bGF0ZSBkX3BoaSBhbmQgZF9wc2kgICAgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgZF9sYW1iZGFcbiAgLy8gRm9yIHRoaXMgYWxnb3JpdGhtLCBkZWx0YV9sYXRpdHVkZSBpcyBpbiBzZWNvbmRzIG9mIGFyYyB4IDEwLTUsIHNvIHdlIG5lZWQgdG8gc2NhbGUgdG8gdGhvc2UgdW5pdHMuIExvbmdpdHVkZSBpcyByYWRpYW5zLlxuICB2YXIgZF9waGkgPSBkZWx0YV9sYXQgLyBTRUNfVE9fUkFEICogMUUtNTtcbiAgdmFyIGRfbGFtYmRhID0gZGVsdGFfbG9uO1xuICB2YXIgZF9waGlfbiA9IDE7IC8vIGRfcGhpXjBcblxuICB2YXIgZF9wc2kgPSAwO1xuICBmb3IgKG4gPSAxOyBuIDw9IDEwOyBuKyspIHtcbiAgICBkX3BoaV9uID0gZF9waGlfbiAqIGRfcGhpO1xuICAgIGRfcHNpID0gZF9wc2kgKyB0aGlzLkFbbl0gKiBkX3BoaV9uO1xuICB9XG5cbiAgLy8gMi4gQ2FsY3VsYXRlIHRoZXRhXG4gIHZhciB0aF9yZSA9IGRfcHNpO1xuICB2YXIgdGhfaW0gPSBkX2xhbWJkYTtcblxuICAvLyAzLiBDYWxjdWxhdGUgelxuICB2YXIgdGhfbl9yZSA9IDE7XG4gIHZhciB0aF9uX2ltID0gMDsgLy8gdGhldGFeMFxuICB2YXIgdGhfbl9yZTE7XG4gIHZhciB0aF9uX2ltMTtcblxuICB2YXIgel9yZSA9IDA7XG4gIHZhciB6X2ltID0gMDtcbiAgZm9yIChuID0gMTsgbiA8PSA2OyBuKyspIHtcbiAgICB0aF9uX3JlMSA9IHRoX25fcmUgKiB0aF9yZSAtIHRoX25faW0gKiB0aF9pbTtcbiAgICB0aF9uX2ltMSA9IHRoX25faW0gKiB0aF9yZSArIHRoX25fcmUgKiB0aF9pbTtcbiAgICB0aF9uX3JlID0gdGhfbl9yZTE7XG4gICAgdGhfbl9pbSA9IHRoX25faW0xO1xuICAgIHpfcmUgPSB6X3JlICsgdGhpcy5CX3JlW25dICogdGhfbl9yZSAtIHRoaXMuQl9pbVtuXSAqIHRoX25faW07XG4gICAgel9pbSA9IHpfaW0gKyB0aGlzLkJfaW1bbl0gKiB0aF9uX3JlICsgdGhpcy5CX3JlW25dICogdGhfbl9pbTtcbiAgfVxuXG4gIC8vIDQuIENhbGN1bGF0ZSBlYXN0aW5nIGFuZCBub3J0aGluZ1xuICBwLnggPSAoel9pbSAqIHRoaXMuYSkgKyB0aGlzLngwO1xuICBwLnkgPSAoel9yZSAqIHRoaXMuYSkgKyB0aGlzLnkwO1xuXG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAgICBOZXcgWmVhbGFuZCBNYXAgR3JpZCBJbnZlcnNlICAtICB4L3kgdG8gbG9uZy9sYXRcbiAgKi9cbmZ1bmN0aW9uIGludmVyc2UkYyhwKSB7XG4gIHZhciBuO1xuICB2YXIgeCA9IHAueDtcbiAgdmFyIHkgPSBwLnk7XG5cbiAgdmFyIGRlbHRhX3ggPSB4IC0gdGhpcy54MDtcbiAgdmFyIGRlbHRhX3kgPSB5IC0gdGhpcy55MDtcblxuICAvLyAxLiBDYWxjdWxhdGUgelxuICB2YXIgel9yZSA9IGRlbHRhX3kgLyB0aGlzLmE7XG4gIHZhciB6X2ltID0gZGVsdGFfeCAvIHRoaXMuYTtcblxuICAvLyAyYS4gQ2FsY3VsYXRlIHRoZXRhIC0gZmlyc3QgYXBwcm94aW1hdGlvbiBnaXZlcyBrbSBhY2N1cmFjeVxuICB2YXIgel9uX3JlID0gMTtcbiAgdmFyIHpfbl9pbSA9IDA7IC8vIHpeMFxuICB2YXIgel9uX3JlMTtcbiAgdmFyIHpfbl9pbTE7XG5cbiAgdmFyIHRoX3JlID0gMDtcbiAgdmFyIHRoX2ltID0gMDtcbiAgZm9yIChuID0gMTsgbiA8PSA2OyBuKyspIHtcbiAgICB6X25fcmUxID0gel9uX3JlICogel9yZSAtIHpfbl9pbSAqIHpfaW07XG4gICAgel9uX2ltMSA9IHpfbl9pbSAqIHpfcmUgKyB6X25fcmUgKiB6X2ltO1xuICAgIHpfbl9yZSA9IHpfbl9yZTE7XG4gICAgel9uX2ltID0gel9uX2ltMTtcbiAgICB0aF9yZSA9IHRoX3JlICsgdGhpcy5DX3JlW25dICogel9uX3JlIC0gdGhpcy5DX2ltW25dICogel9uX2ltO1xuICAgIHRoX2ltID0gdGhfaW0gKyB0aGlzLkNfaW1bbl0gKiB6X25fcmUgKyB0aGlzLkNfcmVbbl0gKiB6X25faW07XG4gIH1cblxuICAvLyAyYi4gSXRlcmF0ZSB0byByZWZpbmUgdGhlIGFjY3VyYWN5IG9mIHRoZSBjYWxjdWxhdGlvblxuICAvLyAgICAgICAgMCBpdGVyYXRpb25zIGdpdmVzIGttIGFjY3VyYWN5XG4gIC8vICAgICAgICAxIGl0ZXJhdGlvbiBnaXZlcyBtIGFjY3VyYWN5IC0tIGdvb2QgZW5vdWdoIGZvciBtb3N0IG1hcHBpbmcgYXBwbGljYXRpb25zXG4gIC8vICAgICAgICAyIGl0ZXJhdGlvbnMgYml2ZXMgbW0gYWNjdXJhY3lcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZXJhdGlvbnM7IGkrKykge1xuICAgIHZhciB0aF9uX3JlID0gdGhfcmU7XG4gICAgdmFyIHRoX25faW0gPSB0aF9pbTtcbiAgICB2YXIgdGhfbl9yZTE7XG4gICAgdmFyIHRoX25faW0xO1xuXG4gICAgdmFyIG51bV9yZSA9IHpfcmU7XG4gICAgdmFyIG51bV9pbSA9IHpfaW07XG4gICAgZm9yIChuID0gMjsgbiA8PSA2OyBuKyspIHtcbiAgICAgIHRoX25fcmUxID0gdGhfbl9yZSAqIHRoX3JlIC0gdGhfbl9pbSAqIHRoX2ltO1xuICAgICAgdGhfbl9pbTEgPSB0aF9uX2ltICogdGhfcmUgKyB0aF9uX3JlICogdGhfaW07XG4gICAgICB0aF9uX3JlID0gdGhfbl9yZTE7XG4gICAgICB0aF9uX2ltID0gdGhfbl9pbTE7XG4gICAgICBudW1fcmUgPSBudW1fcmUgKyAobiAtIDEpICogKHRoaXMuQl9yZVtuXSAqIHRoX25fcmUgLSB0aGlzLkJfaW1bbl0gKiB0aF9uX2ltKTtcbiAgICAgIG51bV9pbSA9IG51bV9pbSArIChuIC0gMSkgKiAodGhpcy5CX2ltW25dICogdGhfbl9yZSArIHRoaXMuQl9yZVtuXSAqIHRoX25faW0pO1xuICAgIH1cblxuICAgIHRoX25fcmUgPSAxO1xuICAgIHRoX25faW0gPSAwO1xuICAgIHZhciBkZW5fcmUgPSB0aGlzLkJfcmVbMV07XG4gICAgdmFyIGRlbl9pbSA9IHRoaXMuQl9pbVsxXTtcbiAgICBmb3IgKG4gPSAyOyBuIDw9IDY7IG4rKykge1xuICAgICAgdGhfbl9yZTEgPSB0aF9uX3JlICogdGhfcmUgLSB0aF9uX2ltICogdGhfaW07XG4gICAgICB0aF9uX2ltMSA9IHRoX25faW0gKiB0aF9yZSArIHRoX25fcmUgKiB0aF9pbTtcbiAgICAgIHRoX25fcmUgPSB0aF9uX3JlMTtcbiAgICAgIHRoX25faW0gPSB0aF9uX2ltMTtcbiAgICAgIGRlbl9yZSA9IGRlbl9yZSArIG4gKiAodGhpcy5CX3JlW25dICogdGhfbl9yZSAtIHRoaXMuQl9pbVtuXSAqIHRoX25faW0pO1xuICAgICAgZGVuX2ltID0gZGVuX2ltICsgbiAqICh0aGlzLkJfaW1bbl0gKiB0aF9uX3JlICsgdGhpcy5CX3JlW25dICogdGhfbl9pbSk7XG4gICAgfVxuXG4gICAgLy8gQ29tcGxleCBkaXZpc2lvblxuICAgIHZhciBkZW4yID0gZGVuX3JlICogZGVuX3JlICsgZGVuX2ltICogZGVuX2ltO1xuICAgIHRoX3JlID0gKG51bV9yZSAqIGRlbl9yZSArIG51bV9pbSAqIGRlbl9pbSkgLyBkZW4yO1xuICAgIHRoX2ltID0gKG51bV9pbSAqIGRlbl9yZSAtIG51bV9yZSAqIGRlbl9pbSkgLyBkZW4yO1xuICB9XG5cbiAgLy8gMy4gQ2FsY3VsYXRlIGRfcGhpICAgICAgICAgICAgICAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgZF9sYW1iZGFcbiAgdmFyIGRfcHNpID0gdGhfcmU7XG4gIHZhciBkX2xhbWJkYSA9IHRoX2ltO1xuICB2YXIgZF9wc2lfbiA9IDE7IC8vIGRfcHNpXjBcblxuICB2YXIgZF9waGkgPSAwO1xuICBmb3IgKG4gPSAxOyBuIDw9IDk7IG4rKykge1xuICAgIGRfcHNpX24gPSBkX3BzaV9uICogZF9wc2k7XG4gICAgZF9waGkgPSBkX3BoaSArIHRoaXMuRFtuXSAqIGRfcHNpX247XG4gIH1cblxuICAvLyA0LiBDYWxjdWxhdGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZVxuICAvLyBkX3BoaSBpcyBjYWxjdWF0ZWQgaW4gc2Vjb25kIG9mIGFyYyAqIDEwXi01LCBzbyB3ZSBuZWVkIHRvIHNjYWxlIGJhY2sgdG8gcmFkaWFucy4gZF9sYW1iZGEgaXMgaW4gcmFkaWFucy5cbiAgdmFyIGxhdCA9IHRoaXMubGF0MCArIChkX3BoaSAqIFNFQ19UT19SQUQgKiAxRTUpO1xuICB2YXIgbG9uID0gdGhpcy5sb25nMCArIGRfbGFtYmRhO1xuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuXG4gIHJldHVybiBwO1xufVxuXG52YXIgbmFtZXMkYyA9IFtcIk5ld19aZWFsYW5kX01hcF9HcmlkXCIsIFwibnptZ1wiXTtcbnZhciBuem1nID0ge1xuICBpbml0OiBpbml0JGMsXG4gIGZvcndhcmQ6IGZvcndhcmQkYyxcbiAgaW52ZXJzZTogaW52ZXJzZSRjLFxuICBuYW1lczogbmFtZXMkY1xufTtcblxuLypcbiAgcmVmZXJlbmNlXG4gICAgXCJOZXcgRXF1YWwtQXJlYSBNYXAgUHJvamVjdGlvbnMgZm9yIE5vbmNpcmN1bGFyIFJlZ2lvbnNcIiwgSm9obiBQLiBTbnlkZXIsXG4gICAgVGhlIEFtZXJpY2FuIENhcnRvZ3JhcGhlciwgVm9sIDE1LCBOby4gNCwgT2N0b2JlciAxOTg4LCBwcC4gMzQxLTM1NS5cbiAgKi9cblxuXG4vKiBJbml0aWFsaXplIHRoZSBNaWxsZXIgQ3lsaW5kcmljYWwgcHJvamVjdGlvblxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGluaXQkYigpIHtcbiAgLy9uby1vcFxufVxuXG4vKiBNaWxsZXIgQ3lsaW5kcmljYWwgZm9yd2FyZCBlcXVhdGlvbnMtLW1hcHBpbmcgbGF0LGxvbmcgdG8geCx5XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGZvcndhcmQkYihwKSB7XG4gIHZhciBsb24gPSBwLng7XG4gIHZhciBsYXQgPSBwLnk7XG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIHZhciBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHggPSB0aGlzLngwICsgdGhpcy5hICogZGxvbjtcbiAgdmFyIHkgPSB0aGlzLnkwICsgdGhpcy5hICogTWF0aC5sb2coTWF0aC50YW4oKE1hdGguUEkgLyA0KSArIChsYXQgLyAyLjUpKSkgKiAxLjI1O1xuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG4vKiBNaWxsZXIgQ3lsaW5kcmljYWwgaW52ZXJzZSBlcXVhdGlvbnMtLW1hcHBpbmcgeCx5IHRvIGxhdC9sb25nXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGludmVyc2UkYihwKSB7XG4gIHAueCAtPSB0aGlzLngwO1xuICBwLnkgLT0gdGhpcy55MDtcblxuICB2YXIgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgcC54IC8gdGhpcy5hKTtcbiAgdmFyIGxhdCA9IDIuNSAqIChNYXRoLmF0YW4oTWF0aC5leHAoMC44ICogcC55IC8gdGhpcy5hKSkgLSBNYXRoLlBJIC8gNCk7XG5cbiAgcC54ID0gbG9uO1xuICBwLnkgPSBsYXQ7XG4gIHJldHVybiBwO1xufVxuXG52YXIgbmFtZXMkYiA9IFtcIk1pbGxlcl9DeWxpbmRyaWNhbFwiLCBcIm1pbGxcIl07XG52YXIgbWlsbCA9IHtcbiAgaW5pdDogaW5pdCRiLFxuICBmb3J3YXJkOiBmb3J3YXJkJGIsXG4gIGludmVyc2U6IGludmVyc2UkYixcbiAgbmFtZXM6IG5hbWVzJGJcbn07XG5cbnZhciBNQVhfSVRFUiA9IDIwO1xuXG5cbmZ1bmN0aW9uIGluaXQkYSgpIHtcbiAgLyogUGxhY2UgcGFyYW1ldGVycyBpbiBzdGF0aWMgc3RvcmFnZSBmb3IgY29tbW9uIHVzZVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbiAgaWYgKCF0aGlzLnNwaGVyZSkge1xuICAgIHRoaXMuZW4gPSBwal9lbmZuKHRoaXMuZXMpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMubiA9IDE7XG4gICAgdGhpcy5tID0gMDtcbiAgICB0aGlzLmVzID0gMDtcbiAgICB0aGlzLkNfeSA9IE1hdGguc3FydCgodGhpcy5tICsgMSkgLyB0aGlzLm4pO1xuICAgIHRoaXMuQ194ID0gdGhpcy5DX3kgLyAodGhpcy5tICsgMSk7XG4gIH1cblxufVxuXG4vKiBTaW51c29pZGFsIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5mdW5jdGlvbiBmb3J3YXJkJGEocCkge1xuICB2YXIgeCwgeTtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLSovXG4gIGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG5cbiAgaWYgKHRoaXMuc3BoZXJlKSB7XG4gICAgaWYgKCF0aGlzLm0pIHtcbiAgICAgIGxhdCA9IHRoaXMubiAhPT0gMSA/IE1hdGguYXNpbih0aGlzLm4gKiBNYXRoLnNpbihsYXQpKSA6IGxhdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgayA9IHRoaXMubiAqIE1hdGguc2luKGxhdCk7XG4gICAgICBmb3IgKHZhciBpID0gTUFYX0lURVI7IGk7IC0taSkge1xuICAgICAgICB2YXIgViA9ICh0aGlzLm0gKiBsYXQgKyBNYXRoLnNpbihsYXQpIC0gaykgLyAodGhpcy5tICsgTWF0aC5jb3MobGF0KSk7XG4gICAgICAgIGxhdCAtPSBWO1xuICAgICAgICBpZiAoTWF0aC5hYnMoVikgPCBFUFNMTikge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHggPSB0aGlzLmEgKiB0aGlzLkNfeCAqIGxvbiAqICh0aGlzLm0gKyBNYXRoLmNvcyhsYXQpKTtcbiAgICB5ID0gdGhpcy5hICogdGhpcy5DX3kgKiBsYXQ7XG5cbiAgfVxuICBlbHNlIHtcblxuICAgIHZhciBzID0gTWF0aC5zaW4obGF0KTtcbiAgICB2YXIgYyA9IE1hdGguY29zKGxhdCk7XG4gICAgeSA9IHRoaXMuYSAqIHBqX21sZm4obGF0LCBzLCBjLCB0aGlzLmVuKTtcbiAgICB4ID0gdGhpcy5hICogbG9uICogYyAvIE1hdGguc3FydCgxIC0gdGhpcy5lcyAqIHMgKiBzKTtcbiAgfVxuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlJGEocCkge1xuICB2YXIgbGF0LCB0ZW1wLCBsb24sIHM7XG5cbiAgcC54IC09IHRoaXMueDA7XG4gIGxvbiA9IHAueCAvIHRoaXMuYTtcbiAgcC55IC09IHRoaXMueTA7XG4gIGxhdCA9IHAueSAvIHRoaXMuYTtcblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsYXQgLz0gdGhpcy5DX3k7XG4gICAgbG9uID0gbG9uIC8gKHRoaXMuQ194ICogKHRoaXMubSArIE1hdGguY29zKGxhdCkpKTtcbiAgICBpZiAodGhpcy5tKSB7XG4gICAgICBsYXQgPSBhc2lueigodGhpcy5tICogbGF0ICsgTWF0aC5zaW4obGF0KSkgLyB0aGlzLm4pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLm4gIT09IDEpIHtcbiAgICAgIGxhdCA9IGFzaW56KE1hdGguc2luKGxhdCkgLyB0aGlzLm4pO1xuICAgIH1cbiAgICBsb24gPSBhZGp1c3RfbG9uKGxvbiArIHRoaXMubG9uZzApO1xuICAgIGxhdCA9IGFkanVzdF9sYXQobGF0KTtcbiAgfVxuICBlbHNlIHtcbiAgICBsYXQgPSBwal9pbnZfbWxmbihwLnkgLyB0aGlzLmEsIHRoaXMuZXMsIHRoaXMuZW4pO1xuICAgIHMgPSBNYXRoLmFicyhsYXQpO1xuICAgIGlmIChzIDwgSEFMRl9QSSkge1xuICAgICAgcyA9IE1hdGguc2luKGxhdCk7XG4gICAgICB0ZW1wID0gdGhpcy5sb25nMCArIHAueCAqIE1hdGguc3FydCgxIC0gdGhpcy5lcyAqIHMgKiBzKSAvICh0aGlzLmEgKiBNYXRoLmNvcyhsYXQpKTtcbiAgICAgIC8vdGVtcCA9IHRoaXMubG9uZzAgKyBwLnggLyAodGhpcy5hICogTWF0aC5jb3MobGF0KSk7XG4gICAgICBsb24gPSBhZGp1c3RfbG9uKHRlbXApO1xuICAgIH1cbiAgICBlbHNlIGlmICgocyAtIEVQU0xOKSA8IEhBTEZfUEkpIHtcbiAgICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gICAgfVxuICB9XG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxudmFyIG5hbWVzJGEgPSBbXCJTaW51c29pZGFsXCIsIFwic2ludVwiXTtcbnZhciBzaW51ID0ge1xuICBpbml0OiBpbml0JGEsXG4gIGZvcndhcmQ6IGZvcndhcmQkYSxcbiAgaW52ZXJzZTogaW52ZXJzZSRhLFxuICBuYW1lczogbmFtZXMkYVxufTtcblxuZnVuY3Rpb24gaW5pdCQ5KCkge31cbi8qIE1vbGx3ZWlkZSBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmZ1bmN0aW9uIGZvcndhcmQkOShwKSB7XG5cbiAgLyogRm9yd2FyZCBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcblxuICB2YXIgZGVsdGFfbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHRoZXRhID0gbGF0O1xuICB2YXIgY29uID0gTWF0aC5QSSAqIE1hdGguc2luKGxhdCk7XG5cbiAgLyogSXRlcmF0ZSB1c2luZyB0aGUgTmV3dG9uLVJhcGhzb24gbWV0aG9kIHRvIGZpbmQgdGhldGFcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgZGVsdGFfdGhldGEgPSAtKHRoZXRhICsgTWF0aC5zaW4odGhldGEpIC0gY29uKSAvICgxICsgTWF0aC5jb3ModGhldGEpKTtcbiAgICB0aGV0YSArPSBkZWx0YV90aGV0YTtcbiAgICBpZiAoTWF0aC5hYnMoZGVsdGFfdGhldGEpIDwgRVBTTE4pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICB0aGV0YSAvPSAyO1xuXG4gIC8qIElmIHRoZSBsYXRpdHVkZSBpcyA5MCBkZWcsIGZvcmNlIHRoZSB4IGNvb3JkaW5hdGUgdG8gYmUgXCIwICsgZmFsc2UgZWFzdGluZ1wiXG4gICAgICAgdGhpcyBpcyBkb25lIGhlcmUgYmVjYXVzZSBvZiBwcmVjaXNpb24gcHJvYmxlbXMgd2l0aCBcImNvcyh0aGV0YSlcIlxuICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKE1hdGguUEkgLyAyIC0gTWF0aC5hYnMobGF0KSA8IEVQU0xOKSB7XG4gICAgZGVsdGFfbG9uID0gMDtcbiAgfVxuICB2YXIgeCA9IDAuOTAwMzE2MzE2MTU4ICogdGhpcy5hICogZGVsdGFfbG9uICogTWF0aC5jb3ModGhldGEpICsgdGhpcy54MDtcbiAgdmFyIHkgPSAxLjQxNDIxMzU2MjM3MzEgKiB0aGlzLmEgKiBNYXRoLnNpbih0aGV0YSkgKyB0aGlzLnkwO1xuXG4gIHAueCA9IHg7XG4gIHAueSA9IHk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlJDkocCkge1xuICB2YXIgdGhldGE7XG4gIHZhciBhcmc7XG5cbiAgLyogSW52ZXJzZSBlcXVhdGlvbnNcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICBhcmcgPSBwLnkgLyAoMS40MTQyMTM1NjIzNzMxICogdGhpcy5hKTtcblxuICAvKiBCZWNhdXNlIG9mIGRpdmlzaW9uIGJ5IHplcm8gcHJvYmxlbXMsICdhcmcnIGNhbiBub3QgYmUgMS4gIFRoZXJlZm9yZVxuICAgICAgIGEgbnVtYmVyIHZlcnkgY2xvc2UgdG8gb25lIGlzIHVzZWQgaW5zdGVhZC5cbiAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgaWYgKE1hdGguYWJzKGFyZykgPiAwLjk5OTk5OTk5OTk5OSkge1xuICAgIGFyZyA9IDAuOTk5OTk5OTk5OTk5O1xuICB9XG4gIHRoZXRhID0gTWF0aC5hc2luKGFyZyk7XG4gIHZhciBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyAocC54IC8gKDAuOTAwMzE2MzE2MTU4ICogdGhpcy5hICogTWF0aC5jb3ModGhldGEpKSkpO1xuICBpZiAobG9uIDwgKC1NYXRoLlBJKSkge1xuICAgIGxvbiA9IC1NYXRoLlBJO1xuICB9XG4gIGlmIChsb24gPiBNYXRoLlBJKSB7XG4gICAgbG9uID0gTWF0aC5QSTtcbiAgfVxuICBhcmcgPSAoMiAqIHRoZXRhICsgTWF0aC5zaW4oMiAqIHRoZXRhKSkgLyBNYXRoLlBJO1xuICBpZiAoTWF0aC5hYnMoYXJnKSA+IDEpIHtcbiAgICBhcmcgPSAxO1xuICB9XG4gIHZhciBsYXQgPSBNYXRoLmFzaW4oYXJnKTtcblxuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyQ5ID0gW1wiTW9sbHdlaWRlXCIsIFwibW9sbFwiXTtcbnZhciBtb2xsID0ge1xuICBpbml0OiBpbml0JDksXG4gIGZvcndhcmQ6IGZvcndhcmQkOSxcbiAgaW52ZXJzZTogaW52ZXJzZSQ5LFxuICBuYW1lczogbmFtZXMkOVxufTtcblxuZnVuY3Rpb24gaW5pdCQ4KCkge1xuXG4gIC8qIFBsYWNlIHBhcmFtZXRlcnMgaW4gc3RhdGljIHN0b3JhZ2UgZm9yIGNvbW1vbiB1c2VcbiAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAvLyBTdGFuZGFyZCBQYXJhbGxlbHMgY2Fubm90IGJlIGVxdWFsIGFuZCBvbiBvcHBvc2l0ZSBzaWRlcyBvZiB0aGUgZXF1YXRvclxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxICsgdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMubGF0MiA9IHRoaXMubGF0MiB8fCB0aGlzLmxhdDE7XG4gIHRoaXMudGVtcCA9IHRoaXMuYiAvIHRoaXMuYTtcbiAgdGhpcy5lcyA9IDEgLSBNYXRoLnBvdyh0aGlzLnRlbXAsIDIpO1xuICB0aGlzLmUgPSBNYXRoLnNxcnQodGhpcy5lcyk7XG4gIHRoaXMuZTAgPSBlMGZuKHRoaXMuZXMpO1xuICB0aGlzLmUxID0gZTFmbih0aGlzLmVzKTtcbiAgdGhpcy5lMiA9IGUyZm4odGhpcy5lcyk7XG4gIHRoaXMuZTMgPSBlM2ZuKHRoaXMuZXMpO1xuXG4gIHRoaXMuc2lucGhpID0gTWF0aC5zaW4odGhpcy5sYXQxKTtcbiAgdGhpcy5jb3NwaGkgPSBNYXRoLmNvcyh0aGlzLmxhdDEpO1xuXG4gIHRoaXMubXMxID0gbXNmbnoodGhpcy5lLCB0aGlzLnNpbnBoaSwgdGhpcy5jb3NwaGkpO1xuICB0aGlzLm1sMSA9IG1sZm4odGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMywgdGhpcy5sYXQxKTtcblxuICBpZiAoTWF0aC5hYnModGhpcy5sYXQxIC0gdGhpcy5sYXQyKSA8IEVQU0xOKSB7XG4gICAgdGhpcy5ucyA9IHRoaXMuc2lucGhpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuc2lucGhpID0gTWF0aC5zaW4odGhpcy5sYXQyKTtcbiAgICB0aGlzLmNvc3BoaSA9IE1hdGguY29zKHRoaXMubGF0Mik7XG4gICAgdGhpcy5tczIgPSBtc2Zueih0aGlzLmUsIHRoaXMuc2lucGhpLCB0aGlzLmNvc3BoaSk7XG4gICAgdGhpcy5tbDIgPSBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIHRoaXMubGF0Mik7XG4gICAgdGhpcy5ucyA9ICh0aGlzLm1zMSAtIHRoaXMubXMyKSAvICh0aGlzLm1sMiAtIHRoaXMubWwxKTtcbiAgfVxuICB0aGlzLmcgPSB0aGlzLm1sMSArIHRoaXMubXMxIC8gdGhpcy5ucztcbiAgdGhpcy5tbDAgPSBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIHRoaXMubGF0MCk7XG4gIHRoaXMucmggPSB0aGlzLmEgKiAodGhpcy5nIC0gdGhpcy5tbDApO1xufVxuXG4vKiBFcXVpZGlzdGFudCBDb25pYyBmb3J3YXJkIGVxdWF0aW9ucy0tbWFwcGluZyBsYXQsbG9uZyB0byB4LHlcbiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gZm9yd2FyZCQ4KHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIHJoMTtcblxuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICByaDEgPSB0aGlzLmEgKiAodGhpcy5nIC0gbGF0KTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgbWwgPSBtbGZuKHRoaXMuZTAsIHRoaXMuZTEsIHRoaXMuZTIsIHRoaXMuZTMsIGxhdCk7XG4gICAgcmgxID0gdGhpcy5hICogKHRoaXMuZyAtIG1sKTtcbiAgfVxuICB2YXIgdGhldGEgPSB0aGlzLm5zICogYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcbiAgdmFyIHggPSB0aGlzLngwICsgcmgxICogTWF0aC5zaW4odGhldGEpO1xuICB2YXIgeSA9IHRoaXMueTAgKyB0aGlzLnJoIC0gcmgxICogTWF0aC5jb3ModGhldGEpO1xuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuLyogSW52ZXJzZSBlcXVhdGlvbnNcbiAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW52ZXJzZSQ4KHApIHtcbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSA9IHRoaXMucmggLSBwLnkgKyB0aGlzLnkwO1xuICB2YXIgY29uLCByaDEsIGxhdCwgbG9uO1xuICBpZiAodGhpcy5ucyA+PSAwKSB7XG4gICAgcmgxID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgY29uID0gMTtcbiAgfVxuICBlbHNlIHtcbiAgICByaDEgPSAtTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgY29uID0gLTE7XG4gIH1cbiAgdmFyIHRoZXRhID0gMDtcbiAgaWYgKHJoMSAhPT0gMCkge1xuICAgIHRoZXRhID0gTWF0aC5hdGFuMihjb24gKiBwLngsIGNvbiAqIHAueSk7XG4gIH1cblxuICBpZiAodGhpcy5zcGhlcmUpIHtcbiAgICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyB0aGV0YSAvIHRoaXMubnMpO1xuICAgIGxhdCA9IGFkanVzdF9sYXQodGhpcy5nIC0gcmgxIC8gdGhpcy5hKTtcbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBtbCA9IHRoaXMuZyAtIHJoMSAvIHRoaXMuYTtcbiAgICBsYXQgPSBpbWxmbihtbCwgdGhpcy5lMCwgdGhpcy5lMSwgdGhpcy5lMiwgdGhpcy5lMyk7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgdGhldGEgLyB0aGlzLm5zKTtcbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG5cbn1cblxudmFyIG5hbWVzJDggPSBbXCJFcXVpZGlzdGFudF9Db25pY1wiLCBcImVxZGNcIl07XG52YXIgZXFkYyA9IHtcbiAgaW5pdDogaW5pdCQ4LFxuICBmb3J3YXJkOiBmb3J3YXJkJDgsXG4gIGludmVyc2U6IGludmVyc2UkOCxcbiAgbmFtZXM6IG5hbWVzJDhcbn07XG5cbi8qIEluaXRpYWxpemUgdGhlIFZhbiBEZXIgR3JpbnRlbiBwcm9qZWN0aW9uXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW5pdCQ3KCkge1xuICAvL3RoaXMuUiA9IDYzNzA5OTc7IC8vUmFkaXVzIG9mIGVhcnRoXG4gIHRoaXMuUiA9IHRoaXMuYTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZCQ3KHApIHtcblxuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuXG4gIC8qIEZvcndhcmQgZXF1YXRpb25zXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICB2YXIgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciB4LCB5O1xuXG4gIGlmIChNYXRoLmFicyhsYXQpIDw9IEVQU0xOKSB7XG4gICAgeCA9IHRoaXMueDAgKyB0aGlzLlIgKiBkbG9uO1xuICAgIHkgPSB0aGlzLnkwO1xuICB9XG4gIHZhciB0aGV0YSA9IGFzaW56KDIgKiBNYXRoLmFicyhsYXQgLyBNYXRoLlBJKSk7XG4gIGlmICgoTWF0aC5hYnMoZGxvbikgPD0gRVBTTE4pIHx8IChNYXRoLmFicyhNYXRoLmFicyhsYXQpIC0gSEFMRl9QSSkgPD0gRVBTTE4pKSB7XG4gICAgeCA9IHRoaXMueDA7XG4gICAgaWYgKGxhdCA+PSAwKSB7XG4gICAgICB5ID0gdGhpcy55MCArIE1hdGguUEkgKiB0aGlzLlIgKiBNYXRoLnRhbigwLjUgKiB0aGV0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgeSA9IHRoaXMueTAgKyBNYXRoLlBJICogdGhpcy5SICogLU1hdGgudGFuKDAuNSAqIHRoZXRhKTtcbiAgICB9XG4gICAgLy8gIHJldHVybihPSyk7XG4gIH1cbiAgdmFyIGFsID0gMC41ICogTWF0aC5hYnMoKE1hdGguUEkgLyBkbG9uKSAtIChkbG9uIC8gTWF0aC5QSSkpO1xuICB2YXIgYXNxID0gYWwgKiBhbDtcbiAgdmFyIHNpbnRoID0gTWF0aC5zaW4odGhldGEpO1xuICB2YXIgY29zdGggPSBNYXRoLmNvcyh0aGV0YSk7XG5cbiAgdmFyIGcgPSBjb3N0aCAvIChzaW50aCArIGNvc3RoIC0gMSk7XG4gIHZhciBnc3EgPSBnICogZztcbiAgdmFyIG0gPSBnICogKDIgLyBzaW50aCAtIDEpO1xuICB2YXIgbXNxID0gbSAqIG07XG4gIHZhciBjb24gPSBNYXRoLlBJICogdGhpcy5SICogKGFsICogKGcgLSBtc3EpICsgTWF0aC5zcXJ0KGFzcSAqIChnIC0gbXNxKSAqIChnIC0gbXNxKSAtIChtc3EgKyBhc3EpICogKGdzcSAtIG1zcSkpKSAvIChtc3EgKyBhc3EpO1xuICBpZiAoZGxvbiA8IDApIHtcbiAgICBjb24gPSAtY29uO1xuICB9XG4gIHggPSB0aGlzLngwICsgY29uO1xuICAvL2NvbiA9IE1hdGguYWJzKGNvbiAvIChNYXRoLlBJICogdGhpcy5SKSk7XG4gIHZhciBxID0gYXNxICsgZztcbiAgY29uID0gTWF0aC5QSSAqIHRoaXMuUiAqIChtICogcSAtIGFsICogTWF0aC5zcXJ0KChtc3EgKyBhc3EpICogKGFzcSArIDEpIC0gcSAqIHEpKSAvIChtc3EgKyBhc3EpO1xuICBpZiAobGF0ID49IDApIHtcbiAgICAvL3kgPSB0aGlzLnkwICsgTWF0aC5QSSAqIHRoaXMuUiAqIE1hdGguc3FydCgxIC0gY29uICogY29uIC0gMiAqIGFsICogY29uKTtcbiAgICB5ID0gdGhpcy55MCArIGNvbjtcbiAgfVxuICBlbHNlIHtcbiAgICAvL3kgPSB0aGlzLnkwIC0gTWF0aC5QSSAqIHRoaXMuUiAqIE1hdGguc3FydCgxIC0gY29uICogY29uIC0gMiAqIGFsICogY29uKTtcbiAgICB5ID0gdGhpcy55MCAtIGNvbjtcbiAgfVxuICBwLnggPSB4O1xuICBwLnkgPSB5O1xuICByZXR1cm4gcDtcbn1cblxuLyogVmFuIERlciBHcmludGVuIGludmVyc2UgZXF1YXRpb25zLS1tYXBwaW5nIHgseSB0byBsYXQvbG9uZ1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gaW52ZXJzZSQ3KHApIHtcbiAgdmFyIGxvbiwgbGF0O1xuICB2YXIgeHgsIHl5LCB4eXMsIGMxLCBjMiwgYzM7XG4gIHZhciBhMTtcbiAgdmFyIG0xO1xuICB2YXIgY29uO1xuICB2YXIgdGgxO1xuICB2YXIgZDtcblxuICAvKiBpbnZlcnNlIGVxdWF0aW9uc1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgcC54IC09IHRoaXMueDA7XG4gIHAueSAtPSB0aGlzLnkwO1xuICBjb24gPSBNYXRoLlBJICogdGhpcy5SO1xuICB4eCA9IHAueCAvIGNvbjtcbiAgeXkgPSBwLnkgLyBjb247XG4gIHh5cyA9IHh4ICogeHggKyB5eSAqIHl5O1xuICBjMSA9IC1NYXRoLmFicyh5eSkgKiAoMSArIHh5cyk7XG4gIGMyID0gYzEgLSAyICogeXkgKiB5eSArIHh4ICogeHg7XG4gIGMzID0gLTIgKiBjMSArIDEgKyAyICogeXkgKiB5eSArIHh5cyAqIHh5cztcbiAgZCA9IHl5ICogeXkgLyBjMyArICgyICogYzIgKiBjMiAqIGMyIC8gYzMgLyBjMyAvIGMzIC0gOSAqIGMxICogYzIgLyBjMyAvIGMzKSAvIDI3O1xuICBhMSA9IChjMSAtIGMyICogYzIgLyAzIC8gYzMpIC8gYzM7XG4gIG0xID0gMiAqIE1hdGguc3FydCgtYTEgLyAzKTtcbiAgY29uID0gKCgzICogZCkgLyBhMSkgLyBtMTtcbiAgaWYgKE1hdGguYWJzKGNvbikgPiAxKSB7XG4gICAgaWYgKGNvbiA+PSAwKSB7XG4gICAgICBjb24gPSAxO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbiA9IC0xO1xuICAgIH1cbiAgfVxuICB0aDEgPSBNYXRoLmFjb3MoY29uKSAvIDM7XG4gIGlmIChwLnkgPj0gMCkge1xuICAgIGxhdCA9ICgtbTEgKiBNYXRoLmNvcyh0aDEgKyBNYXRoLlBJIC8gMykgLSBjMiAvIDMgLyBjMykgKiBNYXRoLlBJO1xuICB9XG4gIGVsc2Uge1xuICAgIGxhdCA9IC0oLW0xICogTWF0aC5jb3ModGgxICsgTWF0aC5QSSAvIDMpIC0gYzIgLyAzIC8gYzMpICogTWF0aC5QSTtcbiAgfVxuXG4gIGlmIChNYXRoLmFicyh4eCkgPCBFUFNMTikge1xuICAgIGxvbiA9IHRoaXMubG9uZzA7XG4gIH1cbiAgZWxzZSB7XG4gICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5QSSAqICh4eXMgLSAxICsgTWF0aC5zcXJ0KDEgKyAyICogKHh4ICogeHggLSB5eSAqIHl5KSArIHh5cyAqIHh5cykpIC8gMiAvIHh4KTtcbiAgfVxuXG4gIHAueCA9IGxvbjtcbiAgcC55ID0gbGF0O1xuICByZXR1cm4gcDtcbn1cblxudmFyIG5hbWVzJDcgPSBbXCJWYW5fZGVyX0dyaW50ZW5fSVwiLCBcIlZhbkRlckdyaW50ZW5cIiwgXCJ2YW5kZ1wiXTtcbnZhciB2YW5kZyA9IHtcbiAgaW5pdDogaW5pdCQ3LFxuICBmb3J3YXJkOiBmb3J3YXJkJDcsXG4gIGludmVyc2U6IGludmVyc2UkNyxcbiAgbmFtZXM6IG5hbWVzJDdcbn07XG5cbmZ1bmN0aW9uIGluaXQkNigpIHtcbiAgdGhpcy5zaW5fcDEyID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdGhpcy5jb3NfcDEyID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZCQ2KHApIHtcbiAgdmFyIGxvbiA9IHAueDtcbiAgdmFyIGxhdCA9IHAueTtcbiAgdmFyIHNpbnBoaSA9IE1hdGguc2luKHAueSk7XG4gIHZhciBjb3NwaGkgPSBNYXRoLmNvcyhwLnkpO1xuICB2YXIgZGxvbiA9IGFkanVzdF9sb24obG9uIC0gdGhpcy5sb25nMCk7XG4gIHZhciBlMCwgZTEsIGUyLCBlMywgTWxwLCBNbCwgdGFucGhpLCBObDEsIE5sLCBwc2ksIEF6LCBHLCBILCBHSCwgSHMsIGMsIGtwLCBjb3NfYywgcywgczIsIHMzLCBzNCwgczU7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgLSAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Ob3J0aCBQb2xlIGNhc2VcbiAgICAgIHAueCA9IHRoaXMueDAgKyB0aGlzLmEgKiAoSEFMRl9QSSAtIGxhdCkgKiBNYXRoLnNpbihkbG9uKTtcbiAgICAgIHAueSA9IHRoaXMueTAgLSB0aGlzLmEgKiAoSEFMRl9QSSAtIGxhdCkgKiBNYXRoLmNvcyhkbG9uKTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgKyAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Tb3V0aCBQb2xlIGNhc2VcbiAgICAgIHAueCA9IHRoaXMueDAgKyB0aGlzLmEgKiAoSEFMRl9QSSArIGxhdCkgKiBNYXRoLnNpbihkbG9uKTtcbiAgICAgIHAueSA9IHRoaXMueTAgKyB0aGlzLmEgKiAoSEFMRl9QSSArIGxhdCkgKiBNYXRoLmNvcyhkbG9uKTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vZGVmYXVsdCBjYXNlXG4gICAgICBjb3NfYyA9IHRoaXMuc2luX3AxMiAqIHNpbnBoaSArIHRoaXMuY29zX3AxMiAqIGNvc3BoaSAqIE1hdGguY29zKGRsb24pO1xuICAgICAgYyA9IE1hdGguYWNvcyhjb3NfYyk7XG4gICAgICBrcCA9IGMgPyBjIC8gTWF0aC5zaW4oYykgOiAxO1xuICAgICAgcC54ID0gdGhpcy54MCArIHRoaXMuYSAqIGtwICogY29zcGhpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwICsgdGhpcy5hICoga3AgKiAodGhpcy5jb3NfcDEyICogc2lucGhpIC0gdGhpcy5zaW5fcDEyICogY29zcGhpICogTWF0aC5jb3MoZGxvbikpO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGUwID0gZTBmbih0aGlzLmVzKTtcbiAgICBlMSA9IGUxZm4odGhpcy5lcyk7XG4gICAgZTIgPSBlMmZuKHRoaXMuZXMpO1xuICAgIGUzID0gZTNmbih0aGlzLmVzKTtcbiAgICBpZiAoTWF0aC5hYnModGhpcy5zaW5fcDEyIC0gMSkgPD0gRVBTTE4pIHtcbiAgICAgIC8vTm9ydGggUG9sZSBjYXNlXG4gICAgICBNbHAgPSB0aGlzLmEgKiBtbGZuKGUwLCBlMSwgZTIsIGUzLCBIQUxGX1BJKTtcbiAgICAgIE1sID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgbGF0KTtcbiAgICAgIHAueCA9IHRoaXMueDAgKyAoTWxwIC0gTWwpICogTWF0aC5zaW4oZGxvbik7XG4gICAgICBwLnkgPSB0aGlzLnkwIC0gKE1scCAtIE1sKSAqIE1hdGguY29zKGRsb24pO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2UgaWYgKE1hdGguYWJzKHRoaXMuc2luX3AxMiArIDEpIDw9IEVQU0xOKSB7XG4gICAgICAvL1NvdXRoIFBvbGUgY2FzZVxuICAgICAgTWxwID0gdGhpcy5hICogbWxmbihlMCwgZTEsIGUyLCBlMywgSEFMRl9QSSk7XG4gICAgICBNbCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIGxhdCk7XG4gICAgICBwLnggPSB0aGlzLngwICsgKE1scCArIE1sKSAqIE1hdGguc2luKGRsb24pO1xuICAgICAgcC55ID0gdGhpcy55MCArIChNbHAgKyBNbCkgKiBNYXRoLmNvcyhkbG9uKTtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vRGVmYXVsdCBjYXNlXG4gICAgICB0YW5waGkgPSBzaW5waGkgLyBjb3NwaGk7XG4gICAgICBObDEgPSBnTih0aGlzLmEsIHRoaXMuZSwgdGhpcy5zaW5fcDEyKTtcbiAgICAgIE5sID0gZ04odGhpcy5hLCB0aGlzLmUsIHNpbnBoaSk7XG4gICAgICBwc2kgPSBNYXRoLmF0YW4oKDEgLSB0aGlzLmVzKSAqIHRhbnBoaSArIHRoaXMuZXMgKiBObDEgKiB0aGlzLnNpbl9wMTIgLyAoTmwgKiBjb3NwaGkpKTtcbiAgICAgIEF6ID0gTWF0aC5hdGFuMihNYXRoLnNpbihkbG9uKSwgdGhpcy5jb3NfcDEyICogTWF0aC50YW4ocHNpKSAtIHRoaXMuc2luX3AxMiAqIE1hdGguY29zKGRsb24pKTtcbiAgICAgIGlmIChBeiA9PT0gMCkge1xuICAgICAgICBzID0gTWF0aC5hc2luKHRoaXMuY29zX3AxMiAqIE1hdGguc2luKHBzaSkgLSB0aGlzLnNpbl9wMTIgKiBNYXRoLmNvcyhwc2kpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKE1hdGguYWJzKE1hdGguYWJzKEF6KSAtIE1hdGguUEkpIDw9IEVQU0xOKSB7XG4gICAgICAgIHMgPSAtTWF0aC5hc2luKHRoaXMuY29zX3AxMiAqIE1hdGguc2luKHBzaSkgLSB0aGlzLnNpbl9wMTIgKiBNYXRoLmNvcyhwc2kpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzID0gTWF0aC5hc2luKE1hdGguc2luKGRsb24pICogTWF0aC5jb3MocHNpKSAvIE1hdGguc2luKEF6KSk7XG4gICAgICB9XG4gICAgICBHID0gdGhpcy5lICogdGhpcy5zaW5fcDEyIC8gTWF0aC5zcXJ0KDEgLSB0aGlzLmVzKTtcbiAgICAgIEggPSB0aGlzLmUgKiB0aGlzLmNvc19wMTIgKiBNYXRoLmNvcyhBeikgLyBNYXRoLnNxcnQoMSAtIHRoaXMuZXMpO1xuICAgICAgR0ggPSBHICogSDtcbiAgICAgIEhzID0gSCAqIEg7XG4gICAgICBzMiA9IHMgKiBzO1xuICAgICAgczMgPSBzMiAqIHM7XG4gICAgICBzNCA9IHMzICogcztcbiAgICAgIHM1ID0gczQgKiBzO1xuICAgICAgYyA9IE5sMSAqIHMgKiAoMSAtIHMyICogSHMgKiAoMSAtIEhzKSAvIDYgKyBzMyAvIDggKiBHSCAqICgxIC0gMiAqIEhzKSArIHM0IC8gMTIwICogKEhzICogKDQgLSA3ICogSHMpIC0gMyAqIEcgKiBHICogKDEgLSA3ICogSHMpKSAtIHM1IC8gNDggKiBHSCk7XG4gICAgICBwLnggPSB0aGlzLngwICsgYyAqIE1hdGguc2luKEF6KTtcbiAgICAgIHAueSA9IHRoaXMueTAgKyBjICogTWF0aC5jb3MoQXopO1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9XG5cblxufVxuXG5mdW5jdGlvbiBpbnZlcnNlJDYocCkge1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHZhciByaCwgeiwgc2lueiwgY29zeiwgbG9uLCBsYXQsIGNvbiwgZTAsIGUxLCBlMiwgZTMsIE1scCwgTSwgTjEsIHBzaSwgQXosIGNvc0F6LCB0bXAsIEEsIEIsIEQsIEVlLCBGLCBzaW5wc2k7XG4gIGlmICh0aGlzLnNwaGVyZSkge1xuICAgIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgaWYgKHJoID4gKDIgKiBIQUxGX1BJICogdGhpcy5hKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB6ID0gcmggLyB0aGlzLmE7XG5cbiAgICBzaW56ID0gTWF0aC5zaW4oeik7XG4gICAgY29zeiA9IE1hdGguY29zKHopO1xuXG4gICAgbG9uID0gdGhpcy5sb25nMDtcbiAgICBpZiAoTWF0aC5hYnMocmgpIDw9IEVQU0xOKSB7XG4gICAgICBsYXQgPSB0aGlzLmxhdDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGF0ID0gYXNpbnooY29zeiAqIHRoaXMuc2luX3AxMiArIChwLnkgKiBzaW56ICogdGhpcy5jb3NfcDEyKSAvIHJoKTtcbiAgICAgIGNvbiA9IE1hdGguYWJzKHRoaXMubGF0MCkgLSBIQUxGX1BJO1xuICAgICAgaWYgKE1hdGguYWJzKGNvbikgPD0gRVBTTE4pIHtcbiAgICAgICAgaWYgKHRoaXMubGF0MCA+PSAwKSB7XG4gICAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gcC55KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwIC0gTWF0aC5hdGFuMigtcC54LCBwLnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8qY29uID0gY29zeiAtIHRoaXMuc2luX3AxMiAqIE1hdGguc2luKGxhdCk7XG4gICAgICAgIGlmICgoTWF0aC5hYnMoY29uKSA8IEVQU0xOKSAmJiAoTWF0aC5hYnMocC54KSA8IEVQU0xOKSkge1xuICAgICAgICAgIC8vbm8tb3AsIGp1c3Qga2VlcCB0aGUgbG9uIHZhbHVlIGFzIGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRlbXAgPSBNYXRoLmF0YW4yKChwLnggKiBzaW56ICogdGhpcy5jb3NfcDEyKSwgKGNvbiAqIHJoKSk7XG4gICAgICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMigocC54ICogc2lueiAqIHRoaXMuY29zX3AxMiksIChjb24gKiByaCkpKTtcbiAgICAgICAgfSovXG4gICAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54ICogc2lueiwgcmggKiB0aGlzLmNvc19wMTIgKiBjb3N6IC0gcC55ICogdGhpcy5zaW5fcDEyICogc2lueikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHAueCA9IGxvbjtcbiAgICBwLnkgPSBsYXQ7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgZTAgPSBlMGZuKHRoaXMuZXMpO1xuICAgIGUxID0gZTFmbih0aGlzLmVzKTtcbiAgICBlMiA9IGUyZm4odGhpcy5lcyk7XG4gICAgZTMgPSBlM2ZuKHRoaXMuZXMpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgLSAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Ob3J0aCBwb2xlIGNhc2VcbiAgICAgIE1scCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIEhBTEZfUEkpO1xuICAgICAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICAgIE0gPSBNbHAgLSByaDtcbiAgICAgIGxhdCA9IGltbGZuKE0gLyB0aGlzLmEsIGUwLCBlMSwgZTIsIGUzKTtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXRhbjIocC54LCAtIDEgKiBwLnkpKTtcbiAgICAgIHAueCA9IGxvbjtcbiAgICAgIHAueSA9IGxhdDtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLnNpbl9wMTIgKyAxKSA8PSBFUFNMTikge1xuICAgICAgLy9Tb3V0aCBwb2xlIGNhc2VcbiAgICAgIE1scCA9IHRoaXMuYSAqIG1sZm4oZTAsIGUxLCBlMiwgZTMsIEhBTEZfUEkpO1xuICAgICAgcmggPSBNYXRoLnNxcnQocC54ICogcC54ICsgcC55ICogcC55KTtcbiAgICAgIE0gPSByaCAtIE1scDtcblxuICAgICAgbGF0ID0gaW1sZm4oTSAvIHRoaXMuYSwgZTAsIGUxLCBlMiwgZTMpO1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIHAueSkpO1xuICAgICAgcC54ID0gbG9uO1xuICAgICAgcC55ID0gbGF0O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy9kZWZhdWx0IGNhc2VcbiAgICAgIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gICAgICBBeiA9IE1hdGguYXRhbjIocC54LCBwLnkpO1xuICAgICAgTjEgPSBnTih0aGlzLmEsIHRoaXMuZSwgdGhpcy5zaW5fcDEyKTtcbiAgICAgIGNvc0F6ID0gTWF0aC5jb3MoQXopO1xuICAgICAgdG1wID0gdGhpcy5lICogdGhpcy5jb3NfcDEyICogY29zQXo7XG4gICAgICBBID0gLXRtcCAqIHRtcCAvICgxIC0gdGhpcy5lcyk7XG4gICAgICBCID0gMyAqIHRoaXMuZXMgKiAoMSAtIEEpICogdGhpcy5zaW5fcDEyICogdGhpcy5jb3NfcDEyICogY29zQXogLyAoMSAtIHRoaXMuZXMpO1xuICAgICAgRCA9IHJoIC8gTjE7XG4gICAgICBFZSA9IEQgLSBBICogKDEgKyBBKSAqIE1hdGgucG93KEQsIDMpIC8gNiAtIEIgKiAoMSArIDMgKiBBKSAqIE1hdGgucG93KEQsIDQpIC8gMjQ7XG4gICAgICBGID0gMSAtIEEgKiBFZSAqIEVlIC8gMiAtIEQgKiBFZSAqIEVlICogRWUgLyA2O1xuICAgICAgcHNpID0gTWF0aC5hc2luKHRoaXMuc2luX3AxMiAqIE1hdGguY29zKEVlKSArIHRoaXMuY29zX3AxMiAqIE1hdGguc2luKEVlKSAqIGNvc0F6KTtcbiAgICAgIGxvbiA9IGFkanVzdF9sb24odGhpcy5sb25nMCArIE1hdGguYXNpbihNYXRoLnNpbihBeikgKiBNYXRoLnNpbihFZSkgLyBNYXRoLmNvcyhwc2kpKSk7XG4gICAgICBzaW5wc2kgPSBNYXRoLnNpbihwc2kpO1xuICAgICAgbGF0ID0gTWF0aC5hdGFuMigoc2lucHNpIC0gdGhpcy5lcyAqIEYgKiB0aGlzLnNpbl9wMTIpICogTWF0aC50YW4ocHNpKSwgc2lucHNpICogKDEgLSB0aGlzLmVzKSk7XG4gICAgICBwLnggPSBsb247XG4gICAgICBwLnkgPSBsYXQ7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH1cblxufVxuXG52YXIgbmFtZXMkNiA9IFtcIkF6aW11dGhhbF9FcXVpZGlzdGFudFwiLCBcImFlcWRcIl07XG52YXIgYWVxZCA9IHtcbiAgaW5pdDogaW5pdCQ2LFxuICBmb3J3YXJkOiBmb3J3YXJkJDYsXG4gIGludmVyc2U6IGludmVyc2UkNixcbiAgbmFtZXM6IG5hbWVzJDZcbn07XG5cbmZ1bmN0aW9uIGluaXQkNSgpIHtcbiAgLy9kb3VibGUgdGVtcDsgICAgICAvKiB0ZW1wb3JhcnkgdmFyaWFibGUgICAgKi9cblxuICAvKiBQbGFjZSBwYXJhbWV0ZXJzIGluIHN0YXRpYyBzdG9yYWdlIGZvciBjb21tb24gdXNlXG4gICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgdGhpcy5zaW5fcDE0ID0gTWF0aC5zaW4odGhpcy5sYXQwKTtcbiAgdGhpcy5jb3NfcDE0ID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbn1cblxuLyogT3J0aG9ncmFwaGljIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5mdW5jdGlvbiBmb3J3YXJkJDUocCkge1xuICB2YXIgc2lucGhpLCBjb3NwaGk7IC8qIHNpbiBhbmQgY29zIHZhbHVlICAgICAgICAqL1xuICB2YXIgZGxvbjsgLyogZGVsdGEgbG9uZ2l0dWRlIHZhbHVlICAgICAgKi9cbiAgdmFyIGNvc2xvbjsgLyogY29zIG9mIGxvbmdpdHVkZSAgICAgICAgKi9cbiAgdmFyIGtzcDsgLyogc2NhbGUgZmFjdG9yICAgICAgICAgICovXG4gIHZhciBnLCB4LCB5O1xuICB2YXIgbG9uID0gcC54O1xuICB2YXIgbGF0ID0gcC55O1xuICAvKiBGb3J3YXJkIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBkbG9uID0gYWRqdXN0X2xvbihsb24gLSB0aGlzLmxvbmcwKTtcblxuICBzaW5waGkgPSBNYXRoLnNpbihsYXQpO1xuICBjb3NwaGkgPSBNYXRoLmNvcyhsYXQpO1xuXG4gIGNvc2xvbiA9IE1hdGguY29zKGRsb24pO1xuICBnID0gdGhpcy5zaW5fcDE0ICogc2lucGhpICsgdGhpcy5jb3NfcDE0ICogY29zcGhpICogY29zbG9uO1xuICBrc3AgPSAxO1xuICBpZiAoKGcgPiAwKSB8fCAoTWF0aC5hYnMoZykgPD0gRVBTTE4pKSB7XG4gICAgeCA9IHRoaXMuYSAqIGtzcCAqIGNvc3BoaSAqIE1hdGguc2luKGRsb24pO1xuICAgIHkgPSB0aGlzLnkwICsgdGhpcy5hICoga3NwICogKHRoaXMuY29zX3AxNCAqIHNpbnBoaSAtIHRoaXMuc2luX3AxNCAqIGNvc3BoaSAqIGNvc2xvbik7XG4gIH1cbiAgcC54ID0geDtcbiAgcC55ID0geTtcbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGludmVyc2UkNShwKSB7XG4gIHZhciByaDsgLyogaGVpZ2h0IGFib3ZlIGVsbGlwc29pZCAgICAgICovXG4gIHZhciB6OyAvKiBhbmdsZSAgICAgICAgICAqL1xuICB2YXIgc2lueiwgY29zejsgLyogc2luIG9mIHogYW5kIGNvcyBvZiB6ICAgICAgKi9cbiAgdmFyIGNvbjtcbiAgdmFyIGxvbiwgbGF0O1xuICAvKiBJbnZlcnNlIGVxdWF0aW9uc1xuICAgICAgLS0tLS0tLS0tLS0tLS0tLS0qL1xuICBwLnggLT0gdGhpcy54MDtcbiAgcC55IC09IHRoaXMueTA7XG4gIHJoID0gTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSk7XG4gIHogPSBhc2lueihyaCAvIHRoaXMuYSk7XG5cbiAgc2lueiA9IE1hdGguc2luKHopO1xuICBjb3N6ID0gTWF0aC5jb3Moeik7XG5cbiAgbG9uID0gdGhpcy5sb25nMDtcbiAgaWYgKE1hdGguYWJzKHJoKSA8PSBFUFNMTikge1xuICAgIGxhdCA9IHRoaXMubGF0MDtcbiAgICBwLnggPSBsb247XG4gICAgcC55ID0gbGF0O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGxhdCA9IGFzaW56KGNvc3ogKiB0aGlzLnNpbl9wMTQgKyAocC55ICogc2lueiAqIHRoaXMuY29zX3AxNCkgLyByaCk7XG4gIGNvbiA9IE1hdGguYWJzKHRoaXMubGF0MCkgLSBIQUxGX1BJO1xuICBpZiAoTWF0aC5hYnMoY29uKSA8PSBFUFNMTikge1xuICAgIGlmICh0aGlzLmxhdDAgPj0gMCkge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwICsgTWF0aC5hdGFuMihwLngsIC0gcC55KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9uID0gYWRqdXN0X2xvbih0aGlzLmxvbmcwIC0gTWF0aC5hdGFuMigtcC54LCBwLnkpKTtcbiAgICB9XG4gICAgcC54ID0gbG9uO1xuICAgIHAueSA9IGxhdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBsb24gPSBhZGp1c3RfbG9uKHRoaXMubG9uZzAgKyBNYXRoLmF0YW4yKChwLnggKiBzaW56KSwgcmggKiB0aGlzLmNvc19wMTQgKiBjb3N6IC0gcC55ICogdGhpcy5zaW5fcDE0ICogc2lueikpO1xuICBwLnggPSBsb247XG4gIHAueSA9IGxhdDtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyQ1ID0gW1wib3J0aG9cIl07XG52YXIgb3J0aG8gPSB7XG4gIGluaXQ6IGluaXQkNSxcbiAgZm9yd2FyZDogZm9yd2FyZCQ1LFxuICBpbnZlcnNlOiBpbnZlcnNlJDUsXG4gIG5hbWVzOiBuYW1lcyQ1XG59O1xuXG4vLyBRU0MgcHJvamVjdGlvbiByZXdyaXR0ZW4gZnJvbSB0aGUgb3JpZ2luYWwgUFJPSjRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9PU0dlby9wcm9qLjQvYmxvYi9tYXN0ZXIvc3JjL1BKX3FzYy5jXG5cblxuLyogY29uc3RhbnRzICovXG52YXIgRkFDRV9FTlVNID0ge1xuICAgIEZST05UOiAxLFxuICAgIFJJR0hUOiAyLFxuICAgIEJBQ0s6IDMsXG4gICAgTEVGVDogNCxcbiAgICBUT1A6IDUsXG4gICAgQk9UVE9NOiA2XG59O1xuXG52YXIgQVJFQV9FTlVNID0ge1xuICAgIEFSRUFfMDogMSxcbiAgICBBUkVBXzE6IDIsXG4gICAgQVJFQV8yOiAzLFxuICAgIEFSRUFfMzogNFxufTtcblxuZnVuY3Rpb24gaW5pdCQ0KCkge1xuXG4gIHRoaXMueDAgPSB0aGlzLngwIHx8IDA7XG4gIHRoaXMueTAgPSB0aGlzLnkwIHx8IDA7XG4gIHRoaXMubGF0MCA9IHRoaXMubGF0MCB8fCAwO1xuICB0aGlzLmxvbmcwID0gdGhpcy5sb25nMCB8fCAwO1xuICB0aGlzLmxhdF90cyA9IHRoaXMubGF0X3RzIHx8IDA7XG4gIHRoaXMudGl0bGUgPSB0aGlzLnRpdGxlIHx8IFwiUXVhZHJpbGF0ZXJhbGl6ZWQgU3BoZXJpY2FsIEN1YmVcIjtcblxuICAvKiBEZXRlcm1pbmUgdGhlIGN1YmUgZmFjZSBmcm9tIHRoZSBjZW50ZXIgb2YgcHJvamVjdGlvbi4gKi9cbiAgaWYgKHRoaXMubGF0MCA+PSBIQUxGX1BJIC0gRk9SVFBJIC8gMi4wKSB7XG4gICAgdGhpcy5mYWNlID0gRkFDRV9FTlVNLlRPUDtcbiAgfSBlbHNlIGlmICh0aGlzLmxhdDAgPD0gLShIQUxGX1BJIC0gRk9SVFBJIC8gMi4wKSkge1xuICAgIHRoaXMuZmFjZSA9IEZBQ0VfRU5VTS5CT1RUT007XG4gIH0gZWxzZSBpZiAoTWF0aC5hYnModGhpcy5sb25nMCkgPD0gRk9SVFBJKSB7XG4gICAgdGhpcy5mYWNlID0gRkFDRV9FTlVNLkZST05UO1xuICB9IGVsc2UgaWYgKE1hdGguYWJzKHRoaXMubG9uZzApIDw9IEhBTEZfUEkgKyBGT1JUUEkpIHtcbiAgICB0aGlzLmZhY2UgPSB0aGlzLmxvbmcwID4gMC4wID8gRkFDRV9FTlVNLlJJR0hUIDogRkFDRV9FTlVNLkxFRlQ7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5mYWNlID0gRkFDRV9FTlVNLkJBQ0s7XG4gIH1cblxuICAvKiBGaWxsIGluIHVzZWZ1bCB2YWx1ZXMgZm9yIHRoZSBlbGxpcHNvaWQgPC0+IHNwaGVyZSBzaGlmdFxuICAgKiBkZXNjcmliZWQgaW4gW0xLMTJdLiAqL1xuICBpZiAodGhpcy5lcyAhPT0gMCkge1xuICAgIHRoaXMub25lX21pbnVzX2YgPSAxIC0gKHRoaXMuYSAtIHRoaXMuYikgLyB0aGlzLmE7XG4gICAgdGhpcy5vbmVfbWludXNfZl9zcXVhcmVkID0gdGhpcy5vbmVfbWludXNfZiAqIHRoaXMub25lX21pbnVzX2Y7XG4gIH1cbn1cblxuLy8gUVNDIGZvcndhcmQgZXF1YXRpb25zLS1tYXBwaW5nIGxhdCxsb25nIHRvIHgseVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIGZvcndhcmQkNChwKSB7XG4gIHZhciB4eSA9IHt4OiAwLCB5OiAwfTtcbiAgdmFyIGxhdCwgbG9uO1xuICB2YXIgdGhldGEsIHBoaTtcbiAgdmFyIHQsIG11O1xuICAvKiBudTsgKi9cbiAgdmFyIGFyZWEgPSB7dmFsdWU6IDB9O1xuXG4gIC8vIG1vdmUgbG9uIGFjY29yZGluZyB0byBwcm9qZWN0aW9uJ3MgbG9uXG4gIHAueCAtPSB0aGlzLmxvbmcwO1xuXG4gIC8qIENvbnZlcnQgdGhlIGdlb2RldGljIGxhdGl0dWRlIHRvIGEgZ2VvY2VudHJpYyBsYXRpdHVkZS5cbiAgICogVGhpcyBjb3JyZXNwb25kcyB0byB0aGUgc2hpZnQgZnJvbSB0aGUgZWxsaXBzb2lkIHRvIHRoZSBzcGhlcmVcbiAgICogZGVzY3JpYmVkIGluIFtMSzEyXS4gKi9cbiAgaWYgKHRoaXMuZXMgIT09IDApIHsvL2lmIChQLT5lcyAhPSAwKSB7XG4gICAgbGF0ID0gTWF0aC5hdGFuKHRoaXMub25lX21pbnVzX2Zfc3F1YXJlZCAqIE1hdGgudGFuKHAueSkpO1xuICB9IGVsc2Uge1xuICAgIGxhdCA9IHAueTtcbiAgfVxuXG4gIC8qIENvbnZlcnQgdGhlIGlucHV0IGxhdCwgbG9uIGludG8gdGhldGEsIHBoaSBhcyB1c2VkIGJ5IFFTQy5cbiAgICogVGhpcyBkZXBlbmRzIG9uIHRoZSBjdWJlIGZhY2UgYW5kIHRoZSBhcmVhIG9uIGl0LlxuICAgKiBGb3IgdGhlIHRvcCBhbmQgYm90dG9tIGZhY2UsIHdlIGNhbiBjb21wdXRlIHRoZXRhIGFuZCBwaGlcbiAgICogZGlyZWN0bHkgZnJvbSBwaGksIGxhbS4gRm9yIHRoZSBvdGhlciBmYWNlcywgd2UgbXVzdCB1c2VcbiAgICogdW5pdCBzcGhlcmUgY2FydGVzaWFuIGNvb3JkaW5hdGVzIGFzIGFuIGludGVybWVkaWF0ZSBzdGVwLiAqL1xuICBsb24gPSBwLng7IC8vbG9uID0gbHAubGFtO1xuICBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uVE9QKSB7XG4gICAgcGhpID0gSEFMRl9QSSAtIGxhdDtcbiAgICBpZiAobG9uID49IEZPUlRQSSAmJiBsb24gPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzA7XG4gICAgICB0aGV0YSA9IGxvbiAtIEhBTEZfUEk7XG4gICAgfSBlbHNlIGlmIChsb24gPiBIQUxGX1BJICsgRk9SVFBJIHx8IGxvbiA8PSAtKEhBTEZfUEkgKyBGT1JUUEkpKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICAgIHRoZXRhID0gKGxvbiA+IDAuMCA/IGxvbiAtIFNQSSA6IGxvbiArIFNQSSk7XG4gICAgfSBlbHNlIGlmIChsb24gPiAtKEhBTEZfUEkgKyBGT1JUUEkpICYmIGxvbiA8PSAtRk9SVFBJKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMjtcbiAgICAgIHRoZXRhID0gbG9uICsgSEFMRl9QSTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzM7XG4gICAgICB0aGV0YSA9IGxvbjtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQk9UVE9NKSB7XG4gICAgcGhpID0gSEFMRl9QSSArIGxhdDtcbiAgICBpZiAobG9uID49IEZPUlRQSSAmJiBsb24gPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzA7XG4gICAgICB0aGV0YSA9IC1sb24gKyBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAobG9uIDwgRk9SVFBJICYmIGxvbiA+PSAtRk9SVFBJKSB7XG4gICAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICAgIHRoZXRhID0gLWxvbjtcbiAgICB9IGVsc2UgaWYgKGxvbiA8IC1GT1JUUEkgJiYgbG9uID49IC0oSEFMRl9QSSArIEZPUlRQSSkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8yO1xuICAgICAgdGhldGEgPSAtbG9uIC0gSEFMRl9QSTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzM7XG4gICAgICB0aGV0YSA9IChsb24gPiAwLjAgPyAtbG9uICsgU1BJIDogLWxvbiAtIFNQSSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBxLCByLCBzO1xuICAgIHZhciBzaW5sYXQsIGNvc2xhdDtcbiAgICB2YXIgc2lubG9uLCBjb3Nsb247XG5cbiAgICBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uUklHSFQpIHtcbiAgICAgIGxvbiA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxvbiwgK0hBTEZfUEkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQkFDSykge1xuICAgICAgbG9uID0gcXNjX3NoaWZ0X2xvbl9vcmlnaW4obG9uLCArU1BJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkxFRlQpIHtcbiAgICAgIGxvbiA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxvbiwgLUhBTEZfUEkpO1xuICAgIH1cbiAgICBzaW5sYXQgPSBNYXRoLnNpbihsYXQpO1xuICAgIGNvc2xhdCA9IE1hdGguY29zKGxhdCk7XG4gICAgc2lubG9uID0gTWF0aC5zaW4obG9uKTtcbiAgICBjb3Nsb24gPSBNYXRoLmNvcyhsb24pO1xuICAgIHEgPSBjb3NsYXQgKiBjb3Nsb247XG4gICAgciA9IGNvc2xhdCAqIHNpbmxvbjtcbiAgICBzID0gc2lubGF0O1xuXG4gICAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkZST05UKSB7XG4gICAgICBwaGkgPSBNYXRoLmFjb3MocSk7XG4gICAgICB0aGV0YSA9IHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHMsIHIsIGFyZWEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uUklHSFQpIHtcbiAgICAgIHBoaSA9IE1hdGguYWNvcyhyKTtcbiAgICAgIHRoZXRhID0gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgcywgLXEsIGFyZWEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uQkFDSykge1xuICAgICAgcGhpID0gTWF0aC5hY29zKC1xKTtcbiAgICAgIHRoZXRhID0gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgcywgLXIsIGFyZWEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlID09PSBGQUNFX0VOVU0uTEVGVCkge1xuICAgICAgcGhpID0gTWF0aC5hY29zKC1yKTtcbiAgICAgIHRoZXRhID0gcXNjX2Z3ZF9lcXVhdF9mYWNlX3RoZXRhKHBoaSwgcywgcSwgYXJlYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIEltcG9zc2libGUgKi9cbiAgICAgIHBoaSA9IHRoZXRhID0gMDtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgIH1cbiAgfVxuXG4gIC8qIENvbXB1dGUgbXUgYW5kIG51IGZvciB0aGUgYXJlYSBvZiBkZWZpbml0aW9uLlxuICAgKiBGb3IgbXUsIHNlZSBFcS4gKDMtMjEpIGluIFtPTDc2XSwgYnV0IG5vdGUgdGhlIHR5cG9zOlxuICAgKiBjb21wYXJlIHdpdGggRXEuICgzLTE0KS4gRm9yIG51LCBzZWUgRXEuICgzLTM4KS4gKi9cbiAgbXUgPSBNYXRoLmF0YW4oKDEyIC8gU1BJKSAqICh0aGV0YSArIE1hdGguYWNvcyhNYXRoLnNpbih0aGV0YSkgKiBNYXRoLmNvcyhGT1JUUEkpKSAtIEhBTEZfUEkpKTtcbiAgdCA9IE1hdGguc3FydCgoMSAtIE1hdGguY29zKHBoaSkpIC8gKE1hdGguY29zKG11KSAqIE1hdGguY29zKG11KSkgLyAoMSAtIE1hdGguY29zKE1hdGguYXRhbigxIC8gTWF0aC5jb3ModGhldGEpKSkpKTtcblxuICAvKiBBcHBseSB0aGUgcmVzdWx0IHRvIHRoZSByZWFsIGFyZWEuICovXG4gIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgbXUgKz0gSEFMRl9QSTtcbiAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8yKSB7XG4gICAgbXUgKz0gU1BJO1xuICB9IGVsc2UgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzMpIHtcbiAgICBtdSArPSAxLjUgKiBTUEk7XG4gIH1cblxuICAvKiBOb3cgY29tcHV0ZSB4LCB5IGZyb20gbXUgYW5kIG51ICovXG4gIHh5LnggPSB0ICogTWF0aC5jb3MobXUpO1xuICB4eS55ID0gdCAqIE1hdGguc2luKG11KTtcbiAgeHkueCA9IHh5LnggKiB0aGlzLmEgKyB0aGlzLngwO1xuICB4eS55ID0geHkueSAqIHRoaXMuYSArIHRoaXMueTA7XG5cbiAgcC54ID0geHkueDtcbiAgcC55ID0geHkueTtcbiAgcmV0dXJuIHA7XG59XG5cbi8vIFFTQyBpbnZlcnNlIGVxdWF0aW9ucy0tbWFwcGluZyB4LHkgdG8gbGF0L2xvbmdcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBpbnZlcnNlJDQocCkge1xuICB2YXIgbHAgPSB7bGFtOiAwLCBwaGk6IDB9O1xuICB2YXIgbXUsIG51LCBjb3NtdSwgdGFubnU7XG4gIHZhciB0YW50aGV0YSwgdGhldGEsIGNvc3BoaSwgcGhpO1xuICB2YXIgdDtcbiAgdmFyIGFyZWEgPSB7dmFsdWU6IDB9O1xuXG4gIC8qIGRlLW9mZnNldCAqL1xuICBwLnggPSAocC54IC0gdGhpcy54MCkgLyB0aGlzLmE7XG4gIHAueSA9IChwLnkgLSB0aGlzLnkwKSAvIHRoaXMuYTtcblxuICAvKiBDb252ZXJ0IHRoZSBpbnB1dCB4LCB5IHRvIHRoZSBtdSBhbmQgbnUgYW5nbGVzIGFzIHVzZWQgYnkgUVNDLlxuICAgKiBUaGlzIGRlcGVuZHMgb24gdGhlIGFyZWEgb2YgdGhlIGN1YmUgZmFjZS4gKi9cbiAgbnUgPSBNYXRoLmF0YW4oTWF0aC5zcXJ0KHAueCAqIHAueCArIHAueSAqIHAueSkpO1xuICBtdSA9IE1hdGguYXRhbjIocC55LCBwLngpO1xuICBpZiAocC54ID49IDAuMCAmJiBwLnggPj0gTWF0aC5hYnMocC55KSkge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICB9IGVsc2UgaWYgKHAueSA+PSAwLjAgJiYgcC55ID49IE1hdGguYWJzKHAueCkpIHtcbiAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMTtcbiAgICBtdSAtPSBIQUxGX1BJO1xuICB9IGVsc2UgaWYgKHAueCA8IDAuMCAmJiAtcC54ID49IE1hdGguYWJzKHAueSkpIHtcbiAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMjtcbiAgICBtdSA9IChtdSA8IDAuMCA/IG11ICsgU1BJIDogbXUgLSBTUEkpO1xuICB9IGVsc2Uge1xuICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8zO1xuICAgIG11ICs9IEhBTEZfUEk7XG4gIH1cblxuICAvKiBDb21wdXRlIHBoaSBhbmQgdGhldGEgZm9yIHRoZSBhcmVhIG9mIGRlZmluaXRpb24uXG4gICAqIFRoZSBpbnZlcnNlIHByb2plY3Rpb24gaXMgbm90IGRlc2NyaWJlZCBpbiB0aGUgb3JpZ2luYWwgcGFwZXIsIGJ1dCBzb21lXG4gICAqIGdvb2QgaGludHMgY2FuIGJlIGZvdW5kIGhlcmUgKGFzIG9mIDIwMTEtMTItMTQpOlxuICAgKiBodHRwOi8vZml0cy5nc2ZjLm5hc2EuZ292L2ZpdHNiaXRzL3NhZi45My9zYWYuOTMwMlxuICAgKiAoc2VhcmNoIGZvciBcIk1lc3NhZ2UtSWQ6IDw5MzAyMTgxNzU5LkFBMjU0NzcgYXQgZml0cy5jdi5ucmFvLmVkdT5cIikgKi9cbiAgdCA9IChTUEkgLyAxMikgKiBNYXRoLnRhbihtdSk7XG4gIHRhbnRoZXRhID0gTWF0aC5zaW4odCkgLyAoTWF0aC5jb3ModCkgLSAoMSAvIE1hdGguc3FydCgyKSkpO1xuICB0aGV0YSA9IE1hdGguYXRhbih0YW50aGV0YSk7XG4gIGNvc211ID0gTWF0aC5jb3MobXUpO1xuICB0YW5udSA9IE1hdGgudGFuKG51KTtcbiAgY29zcGhpID0gMSAtIGNvc211ICogY29zbXUgKiB0YW5udSAqIHRhbm51ICogKDEgLSBNYXRoLmNvcyhNYXRoLmF0YW4oMSAvIE1hdGguY29zKHRoZXRhKSkpKTtcbiAgaWYgKGNvc3BoaSA8IC0xKSB7XG4gICAgY29zcGhpID0gLTE7XG4gIH0gZWxzZSBpZiAoY29zcGhpID4gKzEpIHtcbiAgICBjb3NwaGkgPSArMTtcbiAgfVxuXG4gIC8qIEFwcGx5IHRoZSByZXN1bHQgdG8gdGhlIHJlYWwgYXJlYSBvbiB0aGUgY3ViZSBmYWNlLlxuICAgKiBGb3IgdGhlIHRvcCBhbmQgYm90dG9tIGZhY2UsIHdlIGNhbiBjb21wdXRlIHBoaSBhbmQgbGFtIGRpcmVjdGx5LlxuICAgKiBGb3IgdGhlIG90aGVyIGZhY2VzLCB3ZSBtdXN0IHVzZSB1bml0IHNwaGVyZSBjYXJ0ZXNpYW4gY29vcmRpbmF0ZXNcbiAgICogYXMgYW4gaW50ZXJtZWRpYXRlIHN0ZXAuICovXG4gIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5UT1ApIHtcbiAgICBwaGkgPSBNYXRoLmFjb3MoY29zcGhpKTtcbiAgICBscC5waGkgPSBIQUxGX1BJIC0gcGhpO1xuICAgIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8wKSB7XG4gICAgICBscC5sYW0gPSB0aGV0YSArIEhBTEZfUEk7XG4gICAgfSBlbHNlIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgICBscC5sYW0gPSAodGhldGEgPCAwLjAgPyB0aGV0YSArIFNQSSA6IHRoZXRhIC0gU1BJKTtcbiAgICB9IGVsc2UgaWYgKGFyZWEudmFsdWUgPT09IEFSRUFfRU5VTS5BUkVBXzIpIHtcbiAgICAgIGxwLmxhbSA9IHRoZXRhIC0gSEFMRl9QSTtcbiAgICB9IGVsc2UgLyogYXJlYS52YWx1ZSA9PSBBUkVBX0VOVU0uQVJFQV8zICovIHtcbiAgICAgIGxwLmxhbSA9IHRoZXRhO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5CT1RUT00pIHtcbiAgICBwaGkgPSBNYXRoLmFjb3MoY29zcGhpKTtcbiAgICBscC5waGkgPSBwaGkgLSBIQUxGX1BJO1xuICAgIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8wKSB7XG4gICAgICBscC5sYW0gPSAtdGhldGEgKyBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMSkge1xuICAgICAgbHAubGFtID0gLXRoZXRhO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMikge1xuICAgICAgbHAubGFtID0gLXRoZXRhIC0gSEFMRl9QSTtcbiAgICB9IGVsc2UgLyogYXJlYS52YWx1ZSA9PSBBUkVBX0VOVU0uQVJFQV8zICovIHtcbiAgICAgIGxwLmxhbSA9ICh0aGV0YSA8IDAuMCA/IC10aGV0YSAtIFNQSSA6IC10aGV0YSArIFNQSSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8qIENvbXB1dGUgcGhpIGFuZCBsYW0gdmlhIGNhcnRlc2lhbiB1bml0IHNwaGVyZSBjb29yZGluYXRlcy4gKi9cbiAgICB2YXIgcSwgciwgcztcbiAgICBxID0gY29zcGhpO1xuICAgIHQgPSBxICogcTtcbiAgICBpZiAodCA+PSAxKSB7XG4gICAgICBzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcyA9IE1hdGguc3FydCgxIC0gdCkgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgfVxuICAgIHQgKz0gcyAqIHM7XG4gICAgaWYgKHQgPj0gMSkge1xuICAgICAgciA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgPSBNYXRoLnNxcnQoMSAtIHQpO1xuICAgIH1cbiAgICAvKiBSb3RhdGUgcSxyLHMgaW50byB0aGUgY29ycmVjdCBhcmVhLiAqL1xuICAgIGlmIChhcmVhLnZhbHVlID09PSBBUkVBX0VOVU0uQVJFQV8xKSB7XG4gICAgICB0ID0gcjtcbiAgICAgIHIgPSAtcztcbiAgICAgIHMgPSB0O1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMikge1xuICAgICAgciA9IC1yO1xuICAgICAgcyA9IC1zO1xuICAgIH0gZWxzZSBpZiAoYXJlYS52YWx1ZSA9PT0gQVJFQV9FTlVNLkFSRUFfMykge1xuICAgICAgdCA9IHI7XG4gICAgICByID0gcztcbiAgICAgIHMgPSAtdDtcbiAgICB9XG4gICAgLyogUm90YXRlIHEscixzIGludG8gdGhlIGNvcnJlY3QgY3ViZSBmYWNlLiAqL1xuICAgIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5SSUdIVCkge1xuICAgICAgdCA9IHE7XG4gICAgICBxID0gLXI7XG4gICAgICByID0gdDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJBQ0spIHtcbiAgICAgIHEgPSAtcTtcbiAgICAgIHIgPSAtcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkxFRlQpIHtcbiAgICAgIHQgPSBxO1xuICAgICAgcSA9IHI7XG4gICAgICByID0gLXQ7XG4gICAgfVxuICAgIC8qIE5vdyBjb21wdXRlIHBoaSBhbmQgbGFtIGZyb20gdGhlIHVuaXQgc3BoZXJlIGNvb3JkaW5hdGVzLiAqL1xuICAgIGxwLnBoaSA9IE1hdGguYWNvcygtcykgLSBIQUxGX1BJO1xuICAgIGxwLmxhbSA9IE1hdGguYXRhbjIociwgcSk7XG4gICAgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLlJJR0hUKSB7XG4gICAgICBscC5sYW0gPSBxc2Nfc2hpZnRfbG9uX29yaWdpbihscC5sYW0sIC1IQUxGX1BJKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSA9PT0gRkFDRV9FTlVNLkJBQ0spIHtcbiAgICAgIGxwLmxhbSA9IHFzY19zaGlmdF9sb25fb3JpZ2luKGxwLmxhbSwgLVNQSSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZhY2UgPT09IEZBQ0VfRU5VTS5MRUZUKSB7XG4gICAgICBscC5sYW0gPSBxc2Nfc2hpZnRfbG9uX29yaWdpbihscC5sYW0sICtIQUxGX1BJKTtcbiAgICB9XG4gIH1cblxuICAvKiBBcHBseSB0aGUgc2hpZnQgZnJvbSB0aGUgc3BoZXJlIHRvIHRoZSBlbGxpcHNvaWQgYXMgZGVzY3JpYmVkXG4gICAqIGluIFtMSzEyXS4gKi9cbiAgaWYgKHRoaXMuZXMgIT09IDApIHtcbiAgICB2YXIgaW52ZXJ0X3NpZ247XG4gICAgdmFyIHRhbnBoaSwgeGE7XG4gICAgaW52ZXJ0X3NpZ24gPSAobHAucGhpIDwgMCA/IDEgOiAwKTtcbiAgICB0YW5waGkgPSBNYXRoLnRhbihscC5waGkpO1xuICAgIHhhID0gdGhpcy5iIC8gTWF0aC5zcXJ0KHRhbnBoaSAqIHRhbnBoaSArIHRoaXMub25lX21pbnVzX2Zfc3F1YXJlZCk7XG4gICAgbHAucGhpID0gTWF0aC5hdGFuKE1hdGguc3FydCh0aGlzLmEgKiB0aGlzLmEgLSB4YSAqIHhhKSAvICh0aGlzLm9uZV9taW51c19mICogeGEpKTtcbiAgICBpZiAoaW52ZXJ0X3NpZ24pIHtcbiAgICAgIGxwLnBoaSA9IC1scC5waGk7XG4gICAgfVxuICB9XG5cbiAgbHAubGFtICs9IHRoaXMubG9uZzA7XG4gIHAueCA9IGxwLmxhbTtcbiAgcC55ID0gbHAucGhpO1xuICByZXR1cm4gcDtcbn1cblxuLyogSGVscGVyIGZ1bmN0aW9uIGZvciBmb3J3YXJkIHByb2plY3Rpb246IGNvbXB1dGUgdGhlIHRoZXRhIGFuZ2xlXG4gKiBhbmQgZGV0ZXJtaW5lIHRoZSBhcmVhIG51bWJlci4gKi9cbmZ1bmN0aW9uIHFzY19md2RfZXF1YXRfZmFjZV90aGV0YShwaGksIHksIHgsIGFyZWEpIHtcbiAgdmFyIHRoZXRhO1xuICBpZiAocGhpIDwgRVBTTE4pIHtcbiAgICBhcmVhLnZhbHVlID0gQVJFQV9FTlVNLkFSRUFfMDtcbiAgICB0aGV0YSA9IDAuMDtcbiAgfSBlbHNlIHtcbiAgICB0aGV0YSA9IE1hdGguYXRhbjIoeSwgeCk7XG4gICAgaWYgKE1hdGguYWJzKHRoZXRhKSA8PSBGT1JUUEkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8wO1xuICAgIH0gZWxzZSBpZiAodGhldGEgPiBGT1JUUEkgJiYgdGhldGEgPD0gSEFMRl9QSSArIEZPUlRQSSkge1xuICAgICAgYXJlYS52YWx1ZSA9IEFSRUFfRU5VTS5BUkVBXzE7XG4gICAgICB0aGV0YSAtPSBIQUxGX1BJO1xuICAgIH0gZWxzZSBpZiAodGhldGEgPiBIQUxGX1BJICsgRk9SVFBJIHx8IHRoZXRhIDw9IC0oSEFMRl9QSSArIEZPUlRQSSkpIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8yO1xuICAgICAgdGhldGEgPSAodGhldGEgPj0gMC4wID8gdGhldGEgLSBTUEkgOiB0aGV0YSArIFNQSSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZWEudmFsdWUgPSBBUkVBX0VOVU0uQVJFQV8zO1xuICAgICAgdGhldGEgKz0gSEFMRl9QSTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoZXRhO1xufVxuXG4vKiBIZWxwZXIgZnVuY3Rpb246IHNoaWZ0IHRoZSBsb25naXR1ZGUuICovXG5mdW5jdGlvbiBxc2Nfc2hpZnRfbG9uX29yaWdpbihsb24sIG9mZnNldCkge1xuICB2YXIgc2xvbiA9IGxvbiArIG9mZnNldDtcbiAgaWYgKHNsb24gPCAtU1BJKSB7XG4gICAgc2xvbiArPSBUV09fUEk7XG4gIH0gZWxzZSBpZiAoc2xvbiA+ICtTUEkpIHtcbiAgICBzbG9uIC09IFRXT19QSTtcbiAgfVxuICByZXR1cm4gc2xvbjtcbn1cblxudmFyIG5hbWVzJDQgPSBbXCJRdWFkcmlsYXRlcmFsaXplZCBTcGhlcmljYWwgQ3ViZVwiLCBcIlF1YWRyaWxhdGVyYWxpemVkX1NwaGVyaWNhbF9DdWJlXCIsIFwicXNjXCJdO1xudmFyIHFzYyA9IHtcbiAgaW5pdDogaW5pdCQ0LFxuICBmb3J3YXJkOiBmb3J3YXJkJDQsXG4gIGludmVyc2U6IGludmVyc2UkNCxcbiAgbmFtZXM6IG5hbWVzJDRcbn07XG5cbi8vIFJvYmluc29uIHByb2plY3Rpb25cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9PU0dlby9wcm9qLjQvYmxvYi9tYXN0ZXIvc3JjL1BKX3JvYmluLmNcbi8vIFBvbHlub21pYWwgY29lZmljaWVudHMgZnJvbSBodHRwOi8vYXJ0aWNsZS5nbWFuZS5vcmcvZ21hbmUuY29tcC5naXMucHJvai00LmRldmVsLzYwMzlcblxuXG52YXIgQ09FRlNfWCA9IFtcbiAgICBbMS4wMDAwLCAyLjIxOTllLTE3LCAtNy4xNTUxNWUtMDUsIDMuMTEwM2UtMDZdLFxuICAgIFswLjk5ODYsIC0wLjAwMDQ4MjI0MywgLTIuNDg5N2UtMDUsIC0xLjMzMDllLTA2XSxcbiAgICBbMC45OTU0LCAtMC4wMDA4MzEwMywgLTQuNDg2MDVlLTA1LCAtOS44NjcwMWUtMDddLFxuICAgIFswLjk5MDAsIC0wLjAwMTM1MzY0LCAtNS45NjYxZS0wNSwgMy42Nzc3ZS0wNl0sXG4gICAgWzAuOTgyMiwgLTAuMDAxNjc0NDIsIC00LjQ5NTQ3ZS0wNiwgLTUuNzI0MTFlLTA2XSxcbiAgICBbMC45NzMwLCAtMC4wMDIxNDg2OCwgLTkuMDM1NzFlLTA1LCAxLjg3MzZlLTA4XSxcbiAgICBbMC45NjAwLCAtMC4wMDMwNTA4NSwgLTkuMDA3NjFlLTA1LCAxLjY0OTE3ZS0wNl0sXG4gICAgWzAuOTQyNywgLTAuMDAzODI3OTIsIC02LjUzMzg2ZS0wNSwgLTIuNjE1NGUtMDZdLFxuICAgIFswLjkyMTYsIC0wLjAwNDY3NzQ2LCAtMC4wMDAxMDQ1NywgNC44MTI0M2UtMDZdLFxuICAgIFswLjg5NjIsIC0wLjAwNTM2MjIzLCAtMy4yMzgzMWUtMDUsIC01LjQzNDMyZS0wNl0sXG4gICAgWzAuODY3OSwgLTAuMDA2MDkzNjMsIC0wLjAwMDExMzg5OCwgMy4zMjQ4NGUtMDZdLFxuICAgIFswLjgzNTAsIC0wLjAwNjk4MzI1LCAtNi40MDI1M2UtMDUsIDkuMzQ5NTllLTA3XSxcbiAgICBbMC43OTg2LCAtMC4wMDc1NTMzOCwgLTUuMDAwMDllLTA1LCA5LjM1MzI0ZS0wN10sXG4gICAgWzAuNzU5NywgLTAuMDA3OTgzMjQsIC0zLjU5NzFlLTA1LCAtMi4yNzYyNmUtMDZdLFxuICAgIFswLjcxODYsIC0wLjAwODUxMzY3LCAtNy4wMTE0OWUtMDUsIC04LjYzMDNlLTA2XSxcbiAgICBbMC42NzMyLCAtMC4wMDk4NjIwOSwgLTAuMDAwMTk5NTY5LCAxLjkxOTc0ZS0wNV0sXG4gICAgWzAuNjIxMywgLTAuMDEwNDE4LCA4LjgzOTIzZS0wNSwgNi4yNDA1MWUtMDZdLFxuICAgIFswLjU3MjIsIC0wLjAwOTA2NjAxLCAwLjAwMDE4MiwgNi4yNDA1MWUtMDZdLFxuICAgIFswLjUzMjIsIC0wLjAwNjc3Nzk3LCAwLjAwMDI3NTYwOCwgNi4yNDA1MWUtMDZdXG5dO1xuXG52YXIgQ09FRlNfWSA9IFtcbiAgICBbLTUuMjA0MTdlLTE4LCAwLjAxMjQsIDEuMjE0MzFlLTE4LCAtOC40NTI4NGUtMTFdLFxuICAgIFswLjA2MjAsIDAuMDEyNCwgLTEuMjY3OTNlLTA5LCA0LjIyNjQyZS0xMF0sXG4gICAgWzAuMTI0MCwgMC4wMTI0LCA1LjA3MTcxZS0wOSwgLTEuNjA2MDRlLTA5XSxcbiAgICBbMC4xODYwLCAwLjAxMjM5OTksIC0xLjkwMTg5ZS0wOCwgNi4wMDE1MmUtMDldLFxuICAgIFswLjI0ODAsIDAuMDEyNDAwMiwgNy4xMDAzOWUtMDgsIC0yLjI0ZS0wOF0sXG4gICAgWzAuMzEwMCwgMC4wMTIzOTkyLCAtMi42NDk5N2UtMDcsIDguMzU5ODZlLTA4XSxcbiAgICBbMC4zNzIwLCAwLjAxMjQwMjksIDkuODg5ODNlLTA3LCAtMy4xMTk5NGUtMDddLFxuICAgIFswLjQzNDAsIDAuMDEyMzg5MywgLTMuNjkwOTNlLTA2LCAtNC4zNTYyMWUtMDddLFxuICAgIFswLjQ5NTgsIDAuMDEyMzE5OCwgLTEuMDIyNTJlLTA1LCAtMy40NTUyM2UtMDddLFxuICAgIFswLjU1NzEsIDAuMDEyMTkxNiwgLTEuNTQwODFlLTA1LCAtNS44MjI4OGUtMDddLFxuICAgIFswLjYxNzYsIDAuMDExOTkzOCwgLTIuNDE0MjRlLTA1LCAtNS4yNTMyN2UtMDddLFxuICAgIFswLjY3NjksIDAuMDExNzEzLCAtMy4yMDIyM2UtMDUsIC01LjE2NDA1ZS0wN10sXG4gICAgWzAuNzM0NiwgMC4wMTEzNTQxLCAtMy45NzY4NGUtMDUsIC02LjA5MDUyZS0wN10sXG4gICAgWzAuNzkwMywgMC4wMTA5MTA3LCAtNC44OTA0MmUtMDUsIC0xLjA0NzM5ZS0wNl0sXG4gICAgWzAuODQzNSwgMC4wMTAzNDMxLCAtNi40NjE1ZS0wNSwgLTEuNDAzNzRlLTA5XSxcbiAgICBbMC44OTM2LCAwLjAwOTY5Njg2LCAtNi40NjM2ZS0wNSwgLTguNTQ3ZS0wNl0sXG4gICAgWzAuOTM5NCwgMC4wMDg0MDk0NywgLTAuMDAwMTkyODQxLCAtNC4yMTA2ZS0wNl0sXG4gICAgWzAuOTc2MSwgMC4wMDYxNjUyNywgLTAuMDAwMjU2LCAtNC4yMTA2ZS0wNl0sXG4gICAgWzEuMDAwMCwgMC4wMDMyODk0NywgLTAuMDAwMzE5MTU5LCAtNC4yMTA2ZS0wNl1cbl07XG5cbnZhciBGWEMgPSAwLjg0ODc7XG52YXIgRllDID0gMS4zNTIzO1xudmFyIEMxID0gUjJELzU7IC8vIHJhZCB0byA1LWRlZ3JlZSBpbnRlcnZhbFxudmFyIFJDMSA9IDEvQzE7XG52YXIgTk9ERVMgPSAxODtcblxudmFyIHBvbHkzX3ZhbCA9IGZ1bmN0aW9uKGNvZWZzLCB4KSB7XG4gICAgcmV0dXJuIGNvZWZzWzBdICsgeCAqIChjb2Vmc1sxXSArIHggKiAoY29lZnNbMl0gKyB4ICogY29lZnNbM10pKTtcbn07XG5cbnZhciBwb2x5M19kZXIgPSBmdW5jdGlvbihjb2VmcywgeCkge1xuICAgIHJldHVybiBjb2Vmc1sxXSArIHggKiAoMiAqIGNvZWZzWzJdICsgeCAqIDMgKiBjb2Vmc1szXSk7XG59O1xuXG5mdW5jdGlvbiBuZXd0b25fcmFwc2hvbihmX2RmLCBzdGFydCwgbWF4X2VyciwgaXRlcnMpIHtcbiAgICB2YXIgeCA9IHN0YXJ0O1xuICAgIGZvciAoOyBpdGVyczsgLS1pdGVycykge1xuICAgICAgICB2YXIgdXBkID0gZl9kZih4KTtcbiAgICAgICAgeCAtPSB1cGQ7XG4gICAgICAgIGlmIChNYXRoLmFicyh1cGQpIDwgbWF4X2Vycikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5cbmZ1bmN0aW9uIGluaXQkMygpIHtcbiAgICB0aGlzLngwID0gdGhpcy54MCB8fCAwO1xuICAgIHRoaXMueTAgPSB0aGlzLnkwIHx8IDA7XG4gICAgdGhpcy5sb25nMCA9IHRoaXMubG9uZzAgfHwgMDtcbiAgICB0aGlzLmVzID0gMDtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy50aXRsZSB8fCBcIlJvYmluc29uXCI7XG59XG5cbmZ1bmN0aW9uIGZvcndhcmQkMyhsbCkge1xuICAgIHZhciBsb24gPSBhZGp1c3RfbG9uKGxsLnggLSB0aGlzLmxvbmcwKTtcblxuICAgIHZhciBkcGhpID0gTWF0aC5hYnMobGwueSk7XG4gICAgdmFyIGkgPSBNYXRoLmZsb29yKGRwaGkgKiBDMSk7XG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICAgIGkgPSAwO1xuICAgIH0gZWxzZSBpZiAoaSA+PSBOT0RFUykge1xuICAgICAgICBpID0gTk9ERVMgLSAxO1xuICAgIH1cbiAgICBkcGhpID0gUjJEICogKGRwaGkgLSBSQzEgKiBpKTtcbiAgICB2YXIgeHkgPSB7XG4gICAgICAgIHg6IHBvbHkzX3ZhbChDT0VGU19YW2ldLCBkcGhpKSAqIGxvbixcbiAgICAgICAgeTogcG9seTNfdmFsKENPRUZTX1lbaV0sIGRwaGkpXG4gICAgfTtcbiAgICBpZiAobGwueSA8IDApIHtcbiAgICAgICAgeHkueSA9IC14eS55O1xuICAgIH1cblxuICAgIHh5LnggPSB4eS54ICogdGhpcy5hICogRlhDICsgdGhpcy54MDtcbiAgICB4eS55ID0geHkueSAqIHRoaXMuYSAqIEZZQyArIHRoaXMueTA7XG4gICAgcmV0dXJuIHh5O1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlJDMoeHkpIHtcbiAgICB2YXIgbGwgPSB7XG4gICAgICAgIHg6ICh4eS54IC0gdGhpcy54MCkgLyAodGhpcy5hICogRlhDKSxcbiAgICAgICAgeTogTWF0aC5hYnMoeHkueSAtIHRoaXMueTApIC8gKHRoaXMuYSAqIEZZQylcbiAgICB9O1xuXG4gICAgaWYgKGxsLnkgPj0gMSkgeyAvLyBwYXRob2xvZ2ljIGNhc2VcbiAgICAgICAgbGwueCAvPSBDT0VGU19YW05PREVTXVswXTtcbiAgICAgICAgbGwueSA9IHh5LnkgPCAwID8gLUhBTEZfUEkgOiBIQUxGX1BJO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGZpbmQgdGFibGUgaW50ZXJ2YWxcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGxsLnkgKiBOT0RFUyk7XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA+PSBOT0RFUykge1xuICAgICAgICAgICAgaSA9IE5PREVTIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICBpZiAoQ09FRlNfWVtpXVswXSA+IGxsLnkpIHtcbiAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKENPRUZTX1lbaSsxXVswXSA8PSBsbC55KSB7XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvbiBpbiA1IGRlZ3JlZSBpbnRlcnZhbFxuICAgICAgICB2YXIgY29lZnMgPSBDT0VGU19ZW2ldO1xuICAgICAgICB2YXIgdCA9IDUgKiAobGwueSAtIGNvZWZzWzBdKSAvIChDT0VGU19ZW2krMV1bMF0gLSBjb2Vmc1swXSk7XG4gICAgICAgIC8vIGZpbmQgdCBzbyB0aGF0IHBvbHkzX3ZhbChjb2VmcywgdCkgPSBsbC55XG4gICAgICAgIHQgPSBuZXd0b25fcmFwc2hvbihmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICByZXR1cm4gKHBvbHkzX3ZhbChjb2VmcywgeCkgLSBsbC55KSAvIHBvbHkzX2Rlcihjb2VmcywgeCk7XG4gICAgICAgIH0sIHQsIEVQU0xOLCAxMDApO1xuXG4gICAgICAgIGxsLnggLz0gcG9seTNfdmFsKENPRUZTX1hbaV0sIHQpO1xuICAgICAgICBsbC55ID0gKDUgKiBpICsgdCkgKiBEMlIkMTtcbiAgICAgICAgaWYgKHh5LnkgPCAwKSB7XG4gICAgICAgICAgICBsbC55ID0gLWxsLnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsbC54ID0gYWRqdXN0X2xvbihsbC54ICsgdGhpcy5sb25nMCk7XG4gICAgcmV0dXJuIGxsO1xufVxuXG52YXIgbmFtZXMkMyA9IFtcIlJvYmluc29uXCIsIFwicm9iaW5cIl07XG52YXIgcm9iaW4gPSB7XG4gIGluaXQ6IGluaXQkMyxcbiAgZm9yd2FyZDogZm9yd2FyZCQzLFxuICBpbnZlcnNlOiBpbnZlcnNlJDMsXG4gIG5hbWVzOiBuYW1lcyQzXG59O1xuXG5mdW5jdGlvbiBpbml0JDIoKSB7XG4gICAgdGhpcy5uYW1lID0gJ2dlb2NlbnQnO1xuXG59XG5cbmZ1bmN0aW9uIGZvcndhcmQkMihwKSB7XG4gICAgdmFyIHBvaW50ID0gZ2VvZGV0aWNUb0dlb2NlbnRyaWMocCwgdGhpcy5lcywgdGhpcy5hKTtcbiAgICByZXR1cm4gcG9pbnQ7XG59XG5cbmZ1bmN0aW9uIGludmVyc2UkMihwKSB7XG4gICAgdmFyIHBvaW50ID0gZ2VvY2VudHJpY1RvR2VvZGV0aWMocCwgdGhpcy5lcywgdGhpcy5hLCB0aGlzLmIpO1xuICAgIHJldHVybiBwb2ludDtcbn1cblxudmFyIG5hbWVzJDIgPSBbXCJHZW9jZW50cmljXCIsICdnZW9jZW50cmljJywgXCJnZW9jZW50XCIsIFwiR2VvY2VudFwiXTtcbnZhciBnZW9jZW50ID0ge1xuICAgIGluaXQ6IGluaXQkMixcbiAgICBmb3J3YXJkOiBmb3J3YXJkJDIsXG4gICAgaW52ZXJzZTogaW52ZXJzZSQyLFxuICAgIG5hbWVzOiBuYW1lcyQyXG59O1xuXG52YXIgbW9kZSA9IHtcbiAgTl9QT0xFOiAwLFxuICBTX1BPTEU6IDEsXG4gIEVRVUlUOiAyLFxuICBPQkxJUTogM1xufTtcblxudmFyIHBhcmFtcyA9IHtcbiAgaDogICAgIHsgZGVmOiAxMDAwMDAsIG51bTogdHJ1ZSB9LCAgICAgICAgICAgLy8gZGVmYXVsdCBpcyBLYXJtYW4gbGluZSwgbm8gZGVmYXVsdCBpbiBQUk9KLjdcbiAgYXppOiAgIHsgZGVmOiAwLCBudW06IHRydWUsIGRlZ3JlZXM6IHRydWUgfSwgLy8gZGVmYXVsdCBpcyBOb3J0aFxuICB0aWx0OiAgeyBkZWY6IDAsIG51bTogdHJ1ZSwgZGVncmVlczogdHJ1ZSB9LCAvLyBkZWZhdWx0IGlzIE5hZGlyXG4gIGxvbmcwOiB7IGRlZjogMCwgbnVtOiB0cnVlIH0sICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgaXMgR3JlZW53aWNoLCBjb252ZXJzaW9uIHRvIHJhZCBpcyBhdXRvbWF0aWNcbiAgbGF0MDogIHsgZGVmOiAwLCBudW06IHRydWUgfSAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBpcyBFcXVhdG9yLCBjb252ZXJzaW9uIHRvIHJhZCBpcyBhdXRvbWF0aWNcbn07XG5cbmZ1bmN0aW9uIGluaXQkMSgpIHtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzW3BdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzW3BdID0gcGFyYW1zW3BdLmRlZjtcbiAgICB9IGVsc2UgaWYgKHBhcmFtc1twXS5udW0gJiYgaXNOYU4odGhpc1twXSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGFyYW1ldGVyIHZhbHVlLCBtdXN0IGJlIG51bWVyaWMgXCIgKyBwICsgXCIgPSBcIiArIHRoaXNbcF0pO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zW3BdLm51bSkge1xuICAgICAgdGhpc1twXSA9IHBhcnNlRmxvYXQodGhpc1twXSk7XG4gICAgfVxuICAgIGlmIChwYXJhbXNbcF0uZGVncmVlcykge1xuICAgICAgdGhpc1twXSA9IHRoaXNbcF0gKiBEMlIkMTtcbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgaWYgKE1hdGguYWJzKChNYXRoLmFicyh0aGlzLmxhdDApIC0gSEFMRl9QSSkpIDwgRVBTTE4pIHtcbiAgICB0aGlzLm1vZGUgPSB0aGlzLmxhdDAgPCAwID8gbW9kZS5TX1BPTEUgOiBtb2RlLk5fUE9MRTtcbiAgfSBlbHNlIGlmIChNYXRoLmFicyh0aGlzLmxhdDApIDwgRVBTTE4pIHtcbiAgICB0aGlzLm1vZGUgPSBtb2RlLkVRVUlUO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubW9kZSA9IG1vZGUuT0JMSVE7XG4gICAgdGhpcy5zaW5waDAgPSBNYXRoLnNpbih0aGlzLmxhdDApO1xuICAgIHRoaXMuY29zcGgwID0gTWF0aC5jb3ModGhpcy5sYXQwKTtcbiAgfVxuXG4gIHRoaXMucG4xID0gdGhpcy5oIC8gdGhpcy5hOyAgLy8gTm9ybWFsaXplIHJlbGF0aXZlIHRvIHRoZSBFYXJ0aCdzIHJhZGl1c1xuXG4gIGlmICh0aGlzLnBuMSA8PSAwIHx8IHRoaXMucG4xID4gMWUxMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGVpZ2h0XCIpO1xuICB9XG4gIFxuICB0aGlzLnAgPSAxICsgdGhpcy5wbjE7XG4gIHRoaXMucnAgPSAxIC8gdGhpcy5wO1xuICB0aGlzLmgxID0gMSAvIHRoaXMucG4xO1xuICB0aGlzLnBmYWN0ID0gKHRoaXMucCArIDEpICogdGhpcy5oMTtcbiAgdGhpcy5lcyA9IDA7XG5cbiAgdmFyIG9tZWdhID0gdGhpcy50aWx0O1xuICB2YXIgZ2FtbWEgPSB0aGlzLmF6aTtcbiAgdGhpcy5jZyA9IE1hdGguY29zKGdhbW1hKTtcbiAgdGhpcy5zZyA9IE1hdGguc2luKGdhbW1hKTtcbiAgdGhpcy5jdyA9IE1hdGguY29zKG9tZWdhKTtcbiAgdGhpcy5zdyA9IE1hdGguc2luKG9tZWdhKTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZCQxKHApIHtcbiAgcC54IC09IHRoaXMubG9uZzA7XG4gIHZhciBzaW5waGkgPSBNYXRoLnNpbihwLnkpO1xuICB2YXIgY29zcGhpID0gTWF0aC5jb3MocC55KTtcbiAgdmFyIGNvc2xhbSA9IE1hdGguY29zKHAueCk7XG4gIHZhciB4LCB5O1xuICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgIGNhc2UgbW9kZS5PQkxJUTpcbiAgICAgIHkgPSB0aGlzLnNpbnBoMCAqIHNpbnBoaSArIHRoaXMuY29zcGgwICogY29zcGhpICogY29zbGFtO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBtb2RlLkVRVUlUOlxuICAgICAgeSA9IGNvc3BoaSAqIGNvc2xhbTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgbW9kZS5TX1BPTEU6XG4gICAgICB5ID0gLXNpbnBoaTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgbW9kZS5OX1BPTEU6XG4gICAgICB5ID0gc2lucGhpO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgeSA9IHRoaXMucG4xIC8gKHRoaXMucCAtIHkpO1xuICB4ID0geSAqIGNvc3BoaSAqIE1hdGguc2luKHAueCk7XG5cbiAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICBjYXNlIG1vZGUuT0JMSVE6XG4gICAgICB5ICo9IHRoaXMuY29zcGgwICogc2lucGhpIC0gdGhpcy5zaW5waDAgKiBjb3NwaGkgKiBjb3NsYW07XG4gICAgICBicmVhaztcbiAgICBjYXNlIG1vZGUuRVFVSVQ6XG4gICAgICB5ICo9IHNpbnBoaTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgbW9kZS5OX1BPTEU6XG4gICAgICB5ICo9IC0oY29zcGhpICogY29zbGFtKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgbW9kZS5TX1BPTEU6XG4gICAgICB5ICo9IGNvc3BoaSAqIGNvc2xhbTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gVGlsdCBcbiAgdmFyIHl0LCBiYTtcbiAgeXQgPSB5ICogdGhpcy5jZyArIHggKiB0aGlzLnNnO1xuICBiYSA9IDEgLyAoeXQgKiB0aGlzLnN3ICogdGhpcy5oMSArIHRoaXMuY3cpO1xuICB4ID0gKHggKiB0aGlzLmNnIC0geSAqIHRoaXMuc2cpICogdGhpcy5jdyAqIGJhO1xuICB5ID0geXQgKiBiYTtcblxuICBwLnggPSB4ICogdGhpcy5hO1xuICBwLnkgPSB5ICogdGhpcy5hO1xuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gaW52ZXJzZSQxKHApIHtcbiAgcC54IC89IHRoaXMuYTtcbiAgcC55IC89IHRoaXMuYTtcbiAgdmFyIHIgPSB7IHg6IHAueCwgeTogcC55IH07XG5cbiAgLy8gVW4tVGlsdFxuICB2YXIgYm0sIGJxLCB5dDtcbiAgeXQgPSAxIC8gKHRoaXMucG4xIC0gcC55ICogdGhpcy5zdyk7XG4gIGJtID0gdGhpcy5wbjEgKiBwLnggKiB5dDtcbiAgYnEgPSB0aGlzLnBuMSAqIHAueSAqIHRoaXMuY3cgKiB5dDtcbiAgcC54ID0gYm0gKiB0aGlzLmNnICsgYnEgKiB0aGlzLnNnO1xuICBwLnkgPSBicSAqIHRoaXMuY2cgLSBibSAqIHRoaXMuc2c7XG5cbiAgdmFyIHJoID0gaHlwb3QocC54LCBwLnkpO1xuICBpZiAoTWF0aC5hYnMocmgpIDwgRVBTTE4pIHtcbiAgICByLnggPSAwO1xuICAgIHIueSA9IHAueTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29zeiwgc2luejtcbiAgICBzaW56ID0gMSAtIHJoICogcmggKiB0aGlzLnBmYWN0O1xuICAgIHNpbnogPSAodGhpcy5wIC0gTWF0aC5zcXJ0KHNpbnopKSAvICh0aGlzLnBuMSAvIHJoICsgcmggLyB0aGlzLnBuMSk7XG4gICAgY29zeiA9IE1hdGguc3FydCgxIC0gc2lueiAqIHNpbnopO1xuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICBjYXNlIG1vZGUuT0JMSVE6XG4gICAgICAgIHIueSA9IE1hdGguYXNpbihjb3N6ICogdGhpcy5zaW5waDAgKyBwLnkgKiBzaW56ICogdGhpcy5jb3NwaDAgLyByaCk7XG4gICAgICAgIHAueSA9IChjb3N6IC0gdGhpcy5zaW5waDAgKiBNYXRoLnNpbihyLnkpKSAqIHJoO1xuICAgICAgICBwLnggKj0gc2lueiAqIHRoaXMuY29zcGgwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbW9kZS5FUVVJVDpcbiAgICAgICAgci55ID0gTWF0aC5hc2luKHAueSAqIHNpbnogLyByaCk7XG4gICAgICAgIHAueSA9IGNvc3ogKiByaDtcbiAgICAgICAgcC54ICo9IHNpbno7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBtb2RlLk5fUE9MRTpcbiAgICAgICAgci55ID0gTWF0aC5hc2luKGNvc3opO1xuICAgICAgICBwLnkgPSAtcC55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbW9kZS5TX1BPTEU6XG4gICAgICAgIHIueSA9IC1NYXRoLmFzaW4oY29zeik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByLnggPSBNYXRoLmF0YW4yKHAueCwgcC55KTtcbiAgfVxuXG4gIHAueCA9IHIueCArIHRoaXMubG9uZzA7XG4gIHAueSA9IHIueTtcbiAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyQxID0gW1wiVGlsdGVkX1BlcnNwZWN0aXZlXCIsIFwidHBlcnNcIl07XG52YXIgdHBlcnMgPSB7XG4gIGluaXQ6IGluaXQkMSxcbiAgZm9yd2FyZDogZm9yd2FyZCQxLFxuICBpbnZlcnNlOiBpbnZlcnNlJDEsXG4gIG5hbWVzOiBuYW1lcyQxXG59O1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMuZmxpcF9heGlzID0gKHRoaXMuc3dlZXAgPT09ICd4JyA/IDEgOiAwKTtcbiAgICB0aGlzLmggPSBOdW1iZXIodGhpcy5oKTtcbiAgICB0aGlzLnJhZGl1c19nXzEgPSB0aGlzLmggLyB0aGlzLmE7XG5cbiAgICBpZiAodGhpcy5yYWRpdXNfZ18xIDw9IDAgfHwgdGhpcy5yYWRpdXNfZ18xID4gMWUxMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJhZGl1c19nID0gMS4wICsgdGhpcy5yYWRpdXNfZ18xO1xuICAgIHRoaXMuQyA9IHRoaXMucmFkaXVzX2cgKiB0aGlzLnJhZGl1c19nIC0gMS4wO1xuXG4gICAgaWYgKHRoaXMuZXMgIT09IDAuMCkge1xuICAgICAgICB2YXIgb25lX2VzID0gMS4wIC0gdGhpcy5lcztcbiAgICAgICAgdmFyIHJvbmVfZXMgPSAxIC8gb25lX2VzO1xuXG4gICAgICAgIHRoaXMucmFkaXVzX3AgPSBNYXRoLnNxcnQob25lX2VzKTtcbiAgICAgICAgdGhpcy5yYWRpdXNfcDIgPSBvbmVfZXM7XG4gICAgICAgIHRoaXMucmFkaXVzX3BfaW52MiA9IHJvbmVfZXM7XG5cbiAgICAgICAgdGhpcy5zaGFwZSA9ICdlbGxpcHNlJzsgLy8gVXNlIGFzIGEgY29uZGl0aW9uIGluIHRoZSBmb3J3YXJkIGFuZCBpbnZlcnNlIGZ1bmN0aW9ucy5cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJhZGl1c19wID0gMS4wO1xuICAgICAgICB0aGlzLnJhZGl1c19wMiA9IDEuMDtcbiAgICAgICAgdGhpcy5yYWRpdXNfcF9pbnYyID0gMS4wO1xuXG4gICAgICAgIHRoaXMuc2hhcGUgPSAnc3BoZXJlJzsgIC8vIFVzZSBhcyBhIGNvbmRpdGlvbiBpbiB0aGUgZm9yd2FyZCBhbmQgaW52ZXJzZSBmdW5jdGlvbnMuXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBcIkdlb3N0YXRpb25hcnkgU2F0ZWxsaXRlIFZpZXdcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvcndhcmQocCkge1xuICAgIHZhciBsb24gPSBwLng7XG4gICAgdmFyIGxhdCA9IHAueTtcbiAgICB2YXIgdG1wLCB2X3gsIHZfeSwgdl96O1xuICAgIGxvbiA9IGxvbiAtIHRoaXMubG9uZzA7XG5cbiAgICBpZiAodGhpcy5zaGFwZSA9PT0gJ2VsbGlwc2UnKSB7XG4gICAgICAgIGxhdCA9IE1hdGguYXRhbih0aGlzLnJhZGl1c19wMiAqIE1hdGgudGFuKGxhdCkpO1xuICAgICAgICB2YXIgciA9IHRoaXMucmFkaXVzX3AgLyBoeXBvdCh0aGlzLnJhZGl1c19wICogTWF0aC5jb3MobGF0KSwgTWF0aC5zaW4obGF0KSk7XG5cbiAgICAgICAgdl94ID0gciAqIE1hdGguY29zKGxvbikgKiBNYXRoLmNvcyhsYXQpO1xuICAgICAgICB2X3kgPSByICogTWF0aC5zaW4obG9uKSAqIE1hdGguY29zKGxhdCk7XG4gICAgICAgIHZfeiA9IHIgKiBNYXRoLnNpbihsYXQpO1xuXG4gICAgICAgIGlmICgoKHRoaXMucmFkaXVzX2cgLSB2X3gpICogdl94IC0gdl95ICogdl95IC0gdl96ICogdl96ICogdGhpcy5yYWRpdXNfcF9pbnYyKSA8IDAuMCkge1xuICAgICAgICAgICAgcC54ID0gTnVtYmVyLk5hTjtcbiAgICAgICAgICAgIHAueSA9IE51bWJlci5OYU47XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRtcCA9IHRoaXMucmFkaXVzX2cgLSB2X3g7XG4gICAgICAgIGlmICh0aGlzLmZsaXBfYXhpcykge1xuICAgICAgICAgICAgcC54ID0gdGhpcy5yYWRpdXNfZ18xICogTWF0aC5hdGFuKHZfeSAvIGh5cG90KHZfeiwgdG1wKSk7XG4gICAgICAgICAgICBwLnkgPSB0aGlzLnJhZGl1c19nXzEgKiBNYXRoLmF0YW4odl96IC8gdG1wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAueCA9IHRoaXMucmFkaXVzX2dfMSAqIE1hdGguYXRhbih2X3kgLyB0bXApO1xuICAgICAgICAgICAgcC55ID0gdGhpcy5yYWRpdXNfZ18xICogTWF0aC5hdGFuKHZfeiAvIGh5cG90KHZfeSwgdG1wKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcGUgPT09ICdzcGhlcmUnKSB7XG4gICAgICAgIHRtcCA9IE1hdGguY29zKGxhdCk7XG4gICAgICAgIHZfeCA9IE1hdGguY29zKGxvbikgKiB0bXA7XG4gICAgICAgIHZfeSA9IE1hdGguc2luKGxvbikgKiB0bXA7XG4gICAgICAgIHZfeiA9IE1hdGguc2luKGxhdCk7XG4gICAgICAgIHRtcCA9IHRoaXMucmFkaXVzX2cgLSB2X3g7XG5cbiAgICAgICAgaWYgKHRoaXMuZmxpcF9heGlzKSB7XG4gICAgICAgICAgICBwLnggPSB0aGlzLnJhZGl1c19nXzEgKiBNYXRoLmF0YW4odl95IC8gaHlwb3Qodl96LCB0bXApKTtcbiAgICAgICAgICAgIHAueSA9IHRoaXMucmFkaXVzX2dfMSAqIE1hdGguYXRhbih2X3ogLyB0bXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcC54ID0gdGhpcy5yYWRpdXNfZ18xICogTWF0aC5hdGFuKHZfeSAvIHRtcCk7XG4gICAgICAgICAgICBwLnkgPSB0aGlzLnJhZGl1c19nXzEgKiBNYXRoLmF0YW4odl96IC8gaHlwb3Qodl95LCB0bXApKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwLnggPSBwLnggKiB0aGlzLmE7XG4gICAgcC55ID0gcC55ICogdGhpcy5hO1xuICAgIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpbnZlcnNlKHApIHtcbiAgICB2YXIgdl94ID0gLTEuMDtcbiAgICB2YXIgdl95ID0gMC4wO1xuICAgIHZhciB2X3ogPSAwLjA7XG4gICAgdmFyIGEsIGIsIGRldCwgaztcblxuICAgIHAueCA9IHAueCAvIHRoaXMuYTtcbiAgICBwLnkgPSBwLnkgLyB0aGlzLmE7XG5cbiAgICBpZiAodGhpcy5zaGFwZSA9PT0gJ2VsbGlwc2UnKSB7XG4gICAgICAgIGlmICh0aGlzLmZsaXBfYXhpcykge1xuICAgICAgICAgICAgdl96ID0gTWF0aC50YW4ocC55IC8gdGhpcy5yYWRpdXNfZ18xKTtcbiAgICAgICAgICAgIHZfeSA9IE1hdGgudGFuKHAueCAvIHRoaXMucmFkaXVzX2dfMSkgKiBoeXBvdCgxLjAsIHZfeik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2X3kgPSBNYXRoLnRhbihwLnggLyB0aGlzLnJhZGl1c19nXzEpO1xuICAgICAgICAgICAgdl96ID0gTWF0aC50YW4ocC55IC8gdGhpcy5yYWRpdXNfZ18xKSAqIGh5cG90KDEuMCwgdl95KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2X3pwID0gdl96IC8gdGhpcy5yYWRpdXNfcDtcbiAgICAgICAgYSA9IHZfeSAqIHZfeSArIHZfenAgKiB2X3pwICsgdl94ICogdl94O1xuICAgICAgICBiID0gMiAqIHRoaXMucmFkaXVzX2cgKiB2X3g7XG4gICAgICAgIGRldCA9IChiICogYikgLSA0ICogYSAqIHRoaXMuQztcblxuICAgICAgICBpZiAoZGV0IDwgMC4wKSB7XG4gICAgICAgICAgICBwLnggPSBOdW1iZXIuTmFOO1xuICAgICAgICAgICAgcC55ID0gTnVtYmVyLk5hTjtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG5cbiAgICAgICAgayA9ICgtYiAtIE1hdGguc3FydChkZXQpKSAvICgyLjAgKiBhKTtcbiAgICAgICAgdl94ID0gdGhpcy5yYWRpdXNfZyArIGsgKiB2X3g7XG4gICAgICAgIHZfeSAqPSBrO1xuICAgICAgICB2X3ogKj0gaztcblxuICAgICAgICBwLnggPSBNYXRoLmF0YW4yKHZfeSwgdl94KTtcbiAgICAgICAgcC55ID0gTWF0aC5hdGFuKHZfeiAqIE1hdGguY29zKHAueCkgLyB2X3gpO1xuICAgICAgICBwLnkgPSBNYXRoLmF0YW4odGhpcy5yYWRpdXNfcF9pbnYyICogTWF0aC50YW4ocC55KSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNoYXBlID09PSAnc3BoZXJlJykge1xuICAgICAgICBpZiAodGhpcy5mbGlwX2F4aXMpIHtcbiAgICAgICAgICAgIHZfeiA9IE1hdGgudGFuKHAueSAvIHRoaXMucmFkaXVzX2dfMSk7XG4gICAgICAgICAgICB2X3kgPSBNYXRoLnRhbihwLnggLyB0aGlzLnJhZGl1c19nXzEpICogTWF0aC5zcXJ0KDEuMCArIHZfeiAqIHZfeik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2X3kgPSBNYXRoLnRhbihwLnggLyB0aGlzLnJhZGl1c19nXzEpO1xuICAgICAgICAgICAgdl96ID0gTWF0aC50YW4ocC55IC8gdGhpcy5yYWRpdXNfZ18xKSAqIE1hdGguc3FydCgxLjAgKyB2X3kgKiB2X3kpO1xuICAgICAgICB9XG5cbiAgICAgICAgYSA9IHZfeSAqIHZfeSArIHZfeiAqIHZfeiArIHZfeCAqIHZfeDtcbiAgICAgICAgYiA9IDIgKiB0aGlzLnJhZGl1c19nICogdl94O1xuICAgICAgICBkZXQgPSAoYiAqIGIpIC0gNCAqIGEgKiB0aGlzLkM7XG4gICAgICAgIGlmIChkZXQgPCAwLjApIHtcbiAgICAgICAgICAgIHAueCA9IE51bWJlci5OYU47XG4gICAgICAgICAgICBwLnkgPSBOdW1iZXIuTmFOO1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cblxuICAgICAgICBrID0gKC1iIC0gTWF0aC5zcXJ0KGRldCkpIC8gKDIuMCAqIGEpO1xuICAgICAgICB2X3ggPSB0aGlzLnJhZGl1c19nICsgayAqIHZfeDtcbiAgICAgICAgdl95ICo9IGs7XG4gICAgICAgIHZfeiAqPSBrO1xuXG4gICAgICAgIHAueCA9IE1hdGguYXRhbjIodl95LCB2X3gpO1xuICAgICAgICBwLnkgPSBNYXRoLmF0YW4odl96ICogTWF0aC5jb3MocC54KSAvIHZfeCk7XG4gICAgfVxuICAgIHAueCA9IHAueCArIHRoaXMubG9uZzA7XG4gICAgcmV0dXJuIHA7XG59XG5cbnZhciBuYW1lcyA9IFtcIkdlb3N0YXRpb25hcnkgU2F0ZWxsaXRlIFZpZXdcIiwgXCJHZW9zdGF0aW9uYXJ5X1NhdGVsbGl0ZVwiLCBcImdlb3NcIl07XG52YXIgZ2VvcyA9IHtcbiAgICBpbml0OiBpbml0LFxuICAgIGZvcndhcmQ6IGZvcndhcmQsXG4gICAgaW52ZXJzZTogaW52ZXJzZSxcbiAgICBuYW1lczogbmFtZXMsXG59O1xuXG5mdW5jdGlvbiBpbmNsdWRlZFByb2plY3Rpb25zKHByb2o0KXtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQodG1lcmMpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChldG1lcmMpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZCh1dG0pO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChzdGVyZWEpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChzdGVyZSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKHNvbWVyYyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG9tZXJjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQobGNjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoa3JvdmFrKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoY2Fzcyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGxhZWEpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChhZWEpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChnbm9tKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoY2VhKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoZXFjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQocG9seSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG56bWcpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChtaWxsKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQoc2ludSk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKG1vbGwpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChlcWRjKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQodmFuZGcpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChhZXFkKTtcbiAgcHJvajQuUHJvai5wcm9qZWN0aW9ucy5hZGQob3J0aG8pO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChxc2MpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZChyb2Jpbik7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGdlb2NlbnQpO1xuICBwcm9qNC5Qcm9qLnByb2plY3Rpb25zLmFkZCh0cGVycyk7XG4gIHByb2o0LlByb2oucHJvamVjdGlvbnMuYWRkKGdlb3MpO1xufVxuXG5wcm9qNC5kZWZhdWx0RGF0dW0gPSAnV0dTODQnOyAvL2RlZmF1bHQgZGF0dW1cbnByb2o0LlByb2ogPSBQcm9qZWN0aW9uO1xucHJvajQuV0dTODQgPSBuZXcgcHJvajQuUHJvaignV0dTODQnKTtcbnByb2o0LlBvaW50ID0gUG9pbnQ7XG5wcm9qNC50b1BvaW50ID0gY29tbW9uO1xucHJvajQuZGVmcyA9IGRlZnM7XG5wcm9qNC5uYWRncmlkID0gbmFkZ3JpZDtcbnByb2o0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbnByb2o0Lm1ncnMgPSBtZ3JzO1xucHJvajQudmVyc2lvbiA9ICdfX1ZFUlNJT05fXyc7XG5pbmNsdWRlZFByb2plY3Rpb25zKHByb2o0KTtcblxudmFyIGYsbT1cImRlZmxhdGUtcmF3XCIseD1zZWxmLkRlY29tcHJlc3Npb25TdHJlYW07dHJ5e25ldyB4KG0pLGY9YXN5bmMgdD0+e2xldCBuPW5ldyB4KG0pLGU9bi53cml0YWJsZS5nZXRXcml0ZXIoKSxpPW4ucmVhZGFibGUuZ2V0UmVhZGVyKCk7ZS53cml0ZSh0KSxlLmNsb3NlKCk7bGV0IGMsbz1bXSxzPTAsYT0wLGw7Zm9yKDshKGw9YXdhaXQgaS5yZWFkKCkpLmRvbmU7KWM9bC52YWx1ZSxvLnB1c2goYykscys9Yy5sZW5ndGg7cmV0dXJuIG8ubGVuZ3RoLTE/KGM9bmV3IFVpbnQ4QXJyYXkocyksby5tYXAocj0+e2Muc2V0KHIsYSksYSs9ci5sZW5ndGg7fSksYyk6b1swXX07fWNhdGNoe312YXIgXz1uZXcgVGV4dERlY29kZXIsaD10PT57dGhyb3cgbmV3IEVycm9yKFwiYnV0LXVuemlwflwiK3QpfSxFPXQ9Pl8uZGVjb2RlKHQpLEE9dD0+e2xldCBuPXQubGVuZ3RoLTIwLGU9TWF0aC5tYXgobi02NTUxNiwyKTtmb3IoOyhuPXQubGFzdEluZGV4T2YoODAsbi0xKSkhPT0tMSYmISh0W24rMV09PT03NSYmdFtuKzJdPT09NSYmdFtuKzNdPT09NikmJm4+ZTspO3JldHVybiBufTtmdW5jdGlvbipDKHQsbj1mKXtsZXQgZT1BKHQpO2U9PT0tMSYmaCgyKTtsZXQgaT0ocixkKT0+dC5zdWJhcnJheShlKz1yLGUrPWQpLGM9bmV3IERhdGFWaWV3KHQuYnVmZmVyLHQuYnl0ZU9mZnNldCksbz1yPT5jLmdldFVpbnQxNihyK2UsITApLHM9cj0+Yy5nZXRVaW50MzIocitlLCEwKSxhPW8oMTApO2ZvcihhIT09byg4KSYmaCgzKSxlPXMoMTYpO2EtLTspe2xldCByPW8oMTApLGQ9bygyOCksZz1vKDMwKSx5PW8oMzIpLGI9cygyMCksdz1zKDQyKSxwPUUoaSg0NixkKSksRD1FKGkoZyx5KSksTD1lLHU7ZT13LHU9aSgzMCtvKDI2KStvKDI4KSxiKSx5aWVsZCB7ZmlsZW5hbWU6cCxjb21tZW50OkQscmVhZDooKT0+ciY4P24odSk6cj9oKDEpOnV9LGU9TDt9fVxuXG5jb25zdCByZWdleCQxID0gLy4rXFwuKHNocHxkYmZ8anNvbnxwcmp8Y3BnKSQvaTtcbnZhciB1bnppcCA9IGFzeW5jIChidWZmZXIpID0+IHtcbiAgY29uc3QgZmlsZXMgPSB7fTtcbiAgY29uc3QgcHJvbXMgPSBbXTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiBDKGJ1ZmZlcikpIHtcbiAgICBpZiAoIXJlZ2V4JDEudGVzdChlbnRyeS5maWxlbmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBwcm9tcy5wdXNoKFByb21pc2UucmVzb2x2ZShlbnRyeS5yZWFkKCkpLnRoZW4oYnl0ZXMgPT4gZmlsZXNbZW50cnkuZmlsZW5hbWVdID0gYnl0ZXMpKTtcbiAgfVxuICBhd2FpdCBQcm9taXNlLmFsbChwcm9tcyk7XG4gIGNvbnN0IG91dCA9IHt9O1xuICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xuICAgIGlmIChrZXkuc2xpY2UoLTMpLnRvTG93ZXJDYXNlKCkgPT09ICdzaHAnIHx8IGtleS5zbGljZSgtMykudG9Mb3dlckNhc2UoKSA9PT0gJ2RiZicpIHtcbiAgICAgIG91dFtrZXldID0gbmV3IERhdGFWaWV3KHZhbHVlLmJ1ZmZlciwgdmFsdWUuYnl0ZU9mZnNldCwgdmFsdWUuYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dFtrZXldID0gZGVjb2Rlci5kZWNvZGUodmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuY29uc3QgVVJMJDEgPSBnbG9iYWxUaGlzLlVSTDtcblxudmFyIGNvbWJpbmUkMSA9IChiYXNlLCB0eXBlKSA9PiB7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybiBiYXNlO1xuICB9XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwkMShiYXNlKTtcbiAgdXJsLnBhdGhuYW1lID0gYCR7dXJsLnBhdGhuYW1lfS4ke3R5cGV9YDtcbiAgcmV0dXJuIHVybC5ocmVmO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYmluYXJ5QWpheChfdXJsLCB0eXBlKSB7XG5cbiAgY29uc3QgdXJsID0gY29tYmluZSQxKF91cmwsIHR5cGUpO1xuICBjb25zdCBpc09wdGlvbmFsVHh0ID0gdHlwZSA9PT0gJ3ByaicgfHwgdHlwZSA9PT0gJ2NwZyc7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgaWYgKHJlc3Auc3RhdHVzID4gMzk5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcC5zdGF0dXNUZXh0KTtcbiAgICB9XG4gICAgaWYgKGlzT3B0aW9uYWxUeHQpIHtcbiAgICAgIHJldHVybiByZXNwLnRleHQoKTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkID0gYXdhaXQgcmVzcC5hcnJheUJ1ZmZlcigpO1xuICAgIHJldHVybiBuZXcgRGF0YVZpZXcocGFyc2VkKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGlzT3B0aW9uYWxUeHQgfHwgdHlwZSA9PT0gJ2RiZicpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0Nsb2NrV2lzZShhcnJheSkge1xuICBsZXQgc3VtID0gMDtcbiAgbGV0IGkgPSAxO1xuICBjb25zdCBsZW4gPSBhcnJheS5sZW5ndGg7XG4gIGxldCBwcmV2LCBjdXI7XG4gIGNvbnN0IGJib3ggPSBbYXJyYXlbMF1bMF0sIGFycmF5WzBdWzFdLCBhcnJheVswXVswXSwgYXJyYXlbMF1bMV1dO1xuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHByZXYgPSBjdXIgfHwgYXJyYXlbMF07XG4gICAgY3VyID0gYXJyYXlbaV07XG4gICAgc3VtICs9ICgoY3VyWzBdIC0gcHJldlswXSkgKiAoY3VyWzFdICsgcHJldlsxXSkpO1xuICAgIGkrKztcbiAgICBpZiAoY3VyWzBdIDwgYmJveFswXSkge1xuICAgICAgYmJveFswXSA9IGN1clswXTtcbiAgICB9XG4gICAgaWYgKGN1clsxXSA8IGJib3hbMV0pIHtcbiAgICAgIGJib3hbMV0gPSBjdXJbMV07XG4gICAgfVxuICAgIGlmIChjdXJbMF0gPiBiYm94WzJdKSB7XG4gICAgICBiYm94WzJdID0gY3VyWzBdO1xuICAgIH1cbiAgICBpZiAoY3VyWzFdID4gYmJveFszXSkge1xuICAgICAgYmJveFszXSA9IGN1clsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICByaW5nOiBhcnJheSxcbiAgICBjbG9ja1dpc2U6IHN1bSA+IDAsXG4gICAgYmJveCxcbiAgICBjaGlsZHJlbjogW11cbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zKG91dGVyLCBpbm5lcikge1xuICBpZiAob3V0ZXIuYmJveFswXSA+IGlubmVyLmJib3hbMF0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG91dGVyLmJib3hbMV0gPiBpbm5lci5iYm94WzFdKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvdXRlci5iYm94WzJdIDwgaW5uZXIuYmJveFsyXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob3V0ZXIuYmJveFszXSA8IGlubmVyLmJib3hbM10pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJpbmdzKHJpbmdzKSB7XG4gIGNvbnN0IG91dGVycyA9IFtdO1xuICBjb25zdCBpbm5lcnMgPSBbXTtcbiAgZm9yIChjb25zdCByaW5nIG9mIHJpbmdzKSB7XG4gICAgY29uc3QgcHJvY2Nlc3NlZCA9IGlzQ2xvY2tXaXNlKHJpbmcpO1xuICAgIGlmIChwcm9jY2Vzc2VkLmNsb2NrV2lzZSkge1xuICAgICAgb3V0ZXJzLnB1c2gocHJvY2Nlc3NlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlubmVycy5wdXNoKHByb2NjZXNzZWQpO1xuICAgIH1cbiAgfVxuICAvLyB0aGlzIGlzIGFuIG9wdGltaXphdGlvbiwgXG4gIC8vIGJ1dCBpdCB3b3VsZCBhbHNvIHB1dCBpbiB3ZWlyZCBiYWQgcmluZ3MgdGhhdCB3b3VsZCBvdGhlcndpc2UgZ2V0IGxlZnQgb3V0XG4gIC8vIGlmIChvdXRlcnMubGVuZ3RoID09PSAxKSB7XG4gIC8vICAgY29uc3Qgb3V0ID0gW291dGVyc1swXS5yaW5nXVxuICAvLyAgIGZvciAoY29uc3QgaW5uZXIgb2YgaW5uZXJzKSB7XG4gIC8vICAgICBvdXQucHVzaChpbm5lci5yaW5nKTtcblxuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gW291dF07XG4gIC8vIH1cbiAgZm9yIChjb25zdCBpbm5lciBvZiBpbm5lcnMpIHtcbiAgICBmb3IgKGNvbnN0IG91dGVyIG9mIG91dGVycykge1xuICAgICAgaWYgKGNvbnRhaW5zKG91dGVyLCBpbm5lcikpIHtcbiAgICAgICAgb3V0ZXIuY2hpbGRyZW4ucHVzaChpbm5lci5yaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IG91dCA9IFtdO1xuICBmb3IgKGNvbnN0IG91dGVyIG9mIG91dGVycykge1xuICAgIG91dC5wdXNoKFtvdXRlci5yaW5nXS5jb25jYXQob3V0ZXIuY2hpbGRyZW4pKTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuUGFyc2VTaHAucHJvdG90eXBlLnBhcnNlUG9pbnQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdQb2ludCcsXG4gICAgY29vcmRpbmF0ZXM6IHRoaXMucGFyc2VDb29yZChkYXRhLCAwKVxuICB9O1xufTtcblBhcnNlU2hwLnByb3RvdHlwZS5wYXJzZVpQb2ludCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbnN0IHBvaW50WFkgPSB0aGlzLnBhcnNlUG9pbnQoZGF0YSk7XG4gIHBvaW50WFkuY29vcmRpbmF0ZXMucHVzaChkYXRhLmdldEZsb2F0NjQoMTYsIHRydWUpKTtcbiAgcmV0dXJuIHBvaW50WFk7XG59O1xuUGFyc2VTaHAucHJvdG90eXBlLnBhcnNlUG9pbnRBcnJheSA9IGZ1bmN0aW9uIChkYXRhLCBvZmZzZXQsIG51bSkge1xuICBjb25zdCBvdXQgPSBbXTtcbiAgbGV0IGRvbmUgPSAwO1xuICB3aGlsZSAoZG9uZSA8IG51bSkge1xuICAgIG91dC5wdXNoKHRoaXMucGFyc2VDb29yZChkYXRhLCBvZmZzZXQpKTtcbiAgICBvZmZzZXQgKz0gMTY7XG4gICAgZG9uZSsrO1xuICB9XG4gIHJldHVybiBvdXQ7XG59O1xuUGFyc2VTaHAucHJvdG90eXBlLnBhcnNlWlBvaW50QXJyYXkgPSBmdW5jdGlvbiAoZGF0YSwgek9mZnNldCwgbnVtLCBjb29yZGluYXRlcykge1xuICBsZXQgaSA9IDA7XG4gIHdoaWxlIChpIDwgbnVtKSB7XG4gICAgY29vcmRpbmF0ZXNbaV0ucHVzaChkYXRhLmdldEZsb2F0NjQoek9mZnNldCwgdHJ1ZSkpO1xuICAgIGkrKztcbiAgICB6T2Zmc2V0ICs9IDg7XG4gIH1cbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xufTtcblBhcnNlU2hwLnByb3RvdHlwZS5wYXJzZUFycmF5R3JvdXAgPSBmdW5jdGlvbiAoZGF0YSwgb2Zmc2V0LCBwYXJ0T2Zmc2V0LCBudW0sIHRvdCkge1xuICBjb25zdCBvdXQgPSBbXTtcbiAgbGV0IGRvbmUgPSAwO1xuICBsZXQgY3VyTnVtOyBsZXQgbmV4dE51bSA9IDA7XG4gIGxldCBwb2ludE51bWJlcjtcbiAgd2hpbGUgKGRvbmUgPCBudW0pIHtcbiAgICBkb25lKys7XG4gICAgcGFydE9mZnNldCArPSA0O1xuICAgIGN1ck51bSA9IG5leHROdW07XG4gICAgaWYgKGRvbmUgPT09IG51bSkge1xuICAgICAgbmV4dE51bSA9IHRvdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dE51bSA9IGRhdGEuZ2V0SW50MzIocGFydE9mZnNldCwgdHJ1ZSk7XG4gICAgfVxuICAgIHBvaW50TnVtYmVyID0gbmV4dE51bSAtIGN1ck51bTtcbiAgICBpZiAoIXBvaW50TnVtYmVyKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgb3V0LnB1c2godGhpcy5wYXJzZVBvaW50QXJyYXkoZGF0YSwgb2Zmc2V0LCBwb2ludE51bWJlcikpO1xuICAgIG9mZnNldCArPSAocG9pbnROdW1iZXIgPDwgNCk7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn07XG5QYXJzZVNocC5wcm90b3R5cGUucGFyc2VaQXJyYXlHcm91cCA9IGZ1bmN0aW9uIChkYXRhLCB6T2Zmc2V0LCBudW0sIGNvb3JkaW5hdGVzKSB7XG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBudW0pIHtcbiAgICBjb29yZGluYXRlc1tpXSA9IHRoaXMucGFyc2VaUG9pbnRBcnJheShkYXRhLCB6T2Zmc2V0LCBjb29yZGluYXRlc1tpXS5sZW5ndGgsIGNvb3JkaW5hdGVzW2ldKTtcbiAgICB6T2Zmc2V0ICs9IChjb29yZGluYXRlc1tpXS5sZW5ndGggPDwgMyk7XG4gICAgaSsrO1xuICB9XG4gIHJldHVybiBjb29yZGluYXRlcztcbn07XG5QYXJzZVNocC5wcm90b3R5cGUucGFyc2VNdWx0aVBvaW50ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3Qgb3V0ID0ge307XG4gIGNvbnN0IG51bSA9IGRhdGEuZ2V0SW50MzIoMzIsIHRydWUpO1xuICBpZiAoIW51bSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IG1pbnMgPSB0aGlzLnBhcnNlQ29vcmQoZGF0YSwgMCk7XG4gIGNvbnN0IG1heHMgPSB0aGlzLnBhcnNlQ29vcmQoZGF0YSwgMTYpO1xuICBvdXQuYmJveCA9IFtcbiAgICBtaW5zWzBdLFxuICAgIG1pbnNbMV0sXG4gICAgbWF4c1swXSxcbiAgICBtYXhzWzFdXG4gIF07XG4gIGNvbnN0IG9mZnNldCA9IDM2O1xuICBpZiAobnVtID09PSAxKSB7XG4gICAgb3V0LnR5cGUgPSAnUG9pbnQnO1xuICAgIG91dC5jb29yZGluYXRlcyA9IHRoaXMucGFyc2VDb29yZChkYXRhLCBvZmZzZXQpO1xuICB9IGVsc2Uge1xuICAgIG91dC50eXBlID0gJ011bHRpUG9pbnQnO1xuICAgIG91dC5jb29yZGluYXRlcyA9IHRoaXMucGFyc2VQb2ludEFycmF5KGRhdGEsIG9mZnNldCwgbnVtKTtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblBhcnNlU2hwLnByb3RvdHlwZS5wYXJzZVpNdWx0aVBvaW50ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc3QgZ2VvSnNvbiA9IHRoaXMucGFyc2VNdWx0aVBvaW50KGRhdGEpO1xuICBpZiAoIWdlb0pzb24pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBsZXQgbnVtO1xuICBpZiAoZ2VvSnNvbi50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgZ2VvSnNvbi5jb29yZGluYXRlcy5wdXNoKGRhdGEuZ2V0RmxvYXQ2NCg3MiwgdHJ1ZSkpO1xuICAgIHJldHVybiBnZW9Kc29uO1xuICB9IGVsc2Uge1xuICAgIG51bSA9IGdlb0pzb24uY29vcmRpbmF0ZXMubGVuZ3RoO1xuICB9XG4gIGNvbnN0IHpPZmZzZXQgPSA1MiArIChudW0gPDwgNCk7XG4gIGdlb0pzb24uY29vcmRpbmF0ZXMgPSB0aGlzLnBhcnNlWlBvaW50QXJyYXkoZGF0YSwgek9mZnNldCwgbnVtLCBnZW9Kc29uLmNvb3JkaW5hdGVzKTtcbiAgcmV0dXJuIGdlb0pzb247XG59O1xuUGFyc2VTaHAucHJvdG90eXBlLnBhcnNlUG9seWxpbmUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zdCBvdXQgPSB7fTtcbiAgY29uc3QgbnVtUGFydHMgPSBkYXRhLmdldEludDMyKDMyLCB0cnVlKTtcbiAgaWYgKCFudW1QYXJ0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IG1pbnMgPSB0aGlzLnBhcnNlQ29vcmQoZGF0YSwgMCk7XG4gIGNvbnN0IG1heHMgPSB0aGlzLnBhcnNlQ29vcmQoZGF0YSwgMTYpO1xuICBvdXQuYmJveCA9IFtcbiAgICBtaW5zWzBdLFxuICAgIG1pbnNbMV0sXG4gICAgbWF4c1swXSxcbiAgICBtYXhzWzFdXG4gIF07XG4gIGNvbnN0IG51bSA9IGRhdGEuZ2V0SW50MzIoMzYsIHRydWUpO1xuICBsZXQgb2Zmc2V0LCBwYXJ0T2Zmc2V0O1xuICBpZiAobnVtUGFydHMgPT09IDEpIHtcbiAgICBvdXQudHlwZSA9ICdMaW5lU3RyaW5nJztcbiAgICBvZmZzZXQgPSA0NDtcbiAgICBvdXQuY29vcmRpbmF0ZXMgPSB0aGlzLnBhcnNlUG9pbnRBcnJheShkYXRhLCBvZmZzZXQsIG51bSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0LnR5cGUgPSAnTXVsdGlMaW5lU3RyaW5nJztcbiAgICBvZmZzZXQgPSA0MCArIChudW1QYXJ0cyA8PCAyKTtcbiAgICBwYXJ0T2Zmc2V0ID0gNDA7XG4gICAgb3V0LmNvb3JkaW5hdGVzID0gdGhpcy5wYXJzZUFycmF5R3JvdXAoZGF0YSwgb2Zmc2V0LCBwYXJ0T2Zmc2V0LCBudW1QYXJ0cywgbnVtKTtcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblBhcnNlU2hwLnByb3RvdHlwZS5wYXJzZVpQb2x5bGluZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbnN0IGdlb0pzb24gPSB0aGlzLnBhcnNlUG9seWxpbmUoZGF0YSk7XG4gIGlmICghZ2VvSnNvbikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IG51bSA9IGdlb0pzb24uY29vcmRpbmF0ZXMubGVuZ3RoO1xuICBsZXQgek9mZnNldDtcbiAgaWYgKGdlb0pzb24udHlwZSA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgek9mZnNldCA9IDYwICsgKG51bSA8PCA0KTtcbiAgICBnZW9Kc29uLmNvb3JkaW5hdGVzID0gdGhpcy5wYXJzZVpQb2ludEFycmF5KGRhdGEsIHpPZmZzZXQsIG51bSwgZ2VvSnNvbi5jb29yZGluYXRlcyk7XG4gICAgcmV0dXJuIGdlb0pzb247XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdG90YWxQb2ludHMgPSBnZW9Kc29uLmNvb3JkaW5hdGVzLnJlZHVjZShmdW5jdGlvbiAoYSwgdikge1xuICAgICAgcmV0dXJuIGEgKyB2Lmxlbmd0aDtcbiAgICB9LCAwKTtcbiAgICB6T2Zmc2V0ID0gNTYgKyAodG90YWxQb2ludHMgPDwgNCkgKyAobnVtIDw8IDIpO1xuICAgIGdlb0pzb24uY29vcmRpbmF0ZXMgPSB0aGlzLnBhcnNlWkFycmF5R3JvdXAoZGF0YSwgek9mZnNldCwgbnVtLCBnZW9Kc29uLmNvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gZ2VvSnNvbjtcbiAgfVxufTtcblBhcnNlU2hwLnByb3RvdHlwZS5wb2x5RnVuY3MgPSBmdW5jdGlvbiAob3V0KSB7XG4gIGlmICghb3V0KSB7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICBpZiAob3V0LnR5cGUgPT09ICdMaW5lU3RyaW5nJykge1xuICAgIG91dC50eXBlID0gJ1BvbHlnb24nO1xuICAgIG91dC5jb29yZGluYXRlcyA9IFtvdXQuY29vcmRpbmF0ZXNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH0gZWxzZSB7XG4gICAgb3V0LmNvb3JkaW5hdGVzID0gaGFuZGxlUmluZ3Mob3V0LmNvb3JkaW5hdGVzKTtcbiAgICBpZiAob3V0LmNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgb3V0LnR5cGUgPSAnUG9seWdvbic7XG4gICAgICBvdXQuY29vcmRpbmF0ZXMgPSBvdXQuY29vcmRpbmF0ZXNbMF07XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQudHlwZSA9ICdNdWx0aVBvbHlnb24nO1xuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gIH1cbn07XG5QYXJzZVNocC5wcm90b3R5cGUucGFyc2VQb2x5Z29uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgcmV0dXJuIHRoaXMucG9seUZ1bmNzKHRoaXMucGFyc2VQb2x5bGluZShkYXRhKSk7XG59O1xuUGFyc2VTaHAucHJvdG90eXBlLnBhcnNlWlBvbHlnb24gPSBmdW5jdGlvbiAoZGF0YSkge1xuICByZXR1cm4gdGhpcy5wb2x5RnVuY3ModGhpcy5wYXJzZVpQb2x5bGluZShkYXRhKSk7XG59O1xuY29uc3Qgc2hwRnVuY09iaiA9IHtcbiAgMTogJ3BhcnNlUG9pbnQnLFxuICAzOiAncGFyc2VQb2x5bGluZScsXG4gIDU6ICdwYXJzZVBvbHlnb24nLFxuICA4OiAncGFyc2VNdWx0aVBvaW50JyxcbiAgMTE6ICdwYXJzZVpQb2ludCcsXG4gIDEzOiAncGFyc2VaUG9seWxpbmUnLFxuICAxNTogJ3BhcnNlWlBvbHlnb24nLFxuICAxODogJ3BhcnNlWk11bHRpUG9pbnQnXG59O1xuXG5mdW5jdGlvbiBtYWtlUGFyc2VDb29yZCh0cmFucykge1xuICBpZiAodHJhbnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIG9mZnNldCkge1xuICAgICAgY29uc3QgYXJncyA9IFtkYXRhLmdldEZsb2F0NjQob2Zmc2V0LCB0cnVlKSwgZGF0YS5nZXRGbG9hdDY0KG9mZnNldCArIDgsIHRydWUpXTtcbiAgICAgIHJldHVybiB0cmFucy5pbnZlcnNlKGFyZ3MpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBvZmZzZXQpIHtcbiAgICAgIHJldHVybiBbZGF0YS5nZXRGbG9hdDY0KG9mZnNldCwgdHJ1ZSksIGRhdGEuZ2V0RmxvYXQ2NChvZmZzZXQgKyA4LCB0cnVlKV07XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBQYXJzZVNocChidWZmZXIsIHRyYW5zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJzZVNocCkpIHtcbiAgICByZXR1cm4gbmV3IFBhcnNlU2hwKGJ1ZmZlciwgdHJhbnMpO1xuICB9XG4gIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICB0aGlzLmhlYWRlcnMgPSB0aGlzLnBhcnNlSGVhZGVyKCk7XG4gIHRoaXMuc2hwRnVuY3ModHJhbnMpO1xuICB0aGlzLnJvd3MgPSB0aGlzLmdldFJvd3MoKTtcbn1cblBhcnNlU2hwLnByb3RvdHlwZS5zaHBGdW5jcyA9IGZ1bmN0aW9uICh0cmFuKSB7XG4gIGxldCBudW0gPSB0aGlzLmhlYWRlcnMuc2hwQ29kZTtcbiAgaWYgKG51bSA+IDIwKSB7XG4gICAgbnVtIC09IDIwO1xuICB9XG4gIGlmICghKG51bSBpbiBzaHBGdW5jT2JqKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSSBkb24ndCBrbm93IHNocCB0eXBlIFwiJHtudW19XCJgKTtcbiAgfVxuICB0aGlzLnBhcnNlRnVuYyA9IHRoaXNbc2hwRnVuY09ialtudW1dXTtcbiAgdGhpcy5wYXJzZUNvb3JkID0gbWFrZVBhcnNlQ29vcmQodHJhbik7XG59O1xuUGFyc2VTaHAucHJvdG90eXBlLmdldFNocENvZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnBhcnNlSGVhZGVyKCkuc2hwQ29kZTtcbn07XG5QYXJzZVNocC5wcm90b3R5cGUucGFyc2VIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZpZXcgPSB0aGlzLmJ1ZmZlcjtcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGg6IHZpZXcuZ2V0SW50MzIoNiA8PCAyKSA8PCAxLFxuICAgIHZlcnNpb246IHZpZXcuZ2V0SW50MzIoNyA8PCAyLCB0cnVlKSxcbiAgICBzaHBDb2RlOiB2aWV3LmdldEludDMyKDggPDwgMiwgdHJ1ZSksXG4gICAgYmJveDogW1xuICAgICAgdmlldy5nZXRGbG9hdDY0KDkgPDwgMiwgdHJ1ZSksXG4gICAgICB2aWV3LmdldEZsb2F0NjQoMTEgPDwgMiwgdHJ1ZSksXG4gICAgICB2aWV3LmdldEZsb2F0NjQoMTMgPDwgMiwgdHJ1ZSksXG4gICAgICB2aWV3LmdldEZsb2F0NjQoMTUgPDwgMiwgdHJ1ZSlcbiAgICBdXG4gIH07XG59O1xuUGFyc2VTaHAucHJvdG90eXBlLmdldFJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBvZmZzZXQgPSAxMDA7XG4gIGNvbnN0IGxlbiA9IHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGggLSA4O1xuICBjb25zdCBvdXQgPSBbXTtcbiAgbGV0IGN1cnJlbnQ7XG4gIHdoaWxlIChvZmZzZXQgPD0gbGVuKSB7XG4gICAgY3VycmVudCA9IHRoaXMuZ2V0Um93KG9mZnNldCk7XG4gICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2Zmc2V0ICs9IDg7XG4gICAgb2Zmc2V0ICs9IGN1cnJlbnQubGVuO1xuICAgIGlmIChjdXJyZW50LnR5cGUpIHtcbiAgICAgIG91dC5wdXNoKHRoaXMucGFyc2VGdW5jKGN1cnJlbnQuZGF0YSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaChudWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dDtcbn07XG5QYXJzZVNocC5wcm90b3R5cGUuZ2V0Um93ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zdCBpZCA9IHRoaXMuYnVmZmVyLmdldEludDMyKG9mZnNldCk7XG4gIGNvbnN0IGxlbiA9IHRoaXMuYnVmZmVyLmdldEludDMyKG9mZnNldCArIDQpIDw8IDE7XG4gIGlmIChsZW4gPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgbGVuOiBsZW4sXG4gICAgICB0eXBlOiAwXG4gICAgfTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgKyBsZW4gKyA4ID4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4ge1xuICAgIGlkOiBpZCxcbiAgICBsZW46IGxlbixcbiAgICBkYXRhOiBuZXcgRGF0YVZpZXcodGhpcy5idWZmZXIuYnVmZmVyLCB0aGlzLmJ1ZmZlci5ieXRlT2Zmc2V0ICsgb2Zmc2V0ICsgMTIsIGxlbiAtIDQpLFxuICAgIHR5cGU6IHRoaXMuYnVmZmVyLmdldEludDMyKG9mZnNldCArIDgsIHRydWUpXG4gIH07XG59O1xuZnVuY3Rpb24gcGFyc2VTaHAgKGJ1ZmZlciwgdHJhbnMpIHtcbiAgcmV0dXJuIG5ldyBQYXJzZVNocChidWZmZXIsIHRyYW5zKS5yb3dzO1xufVxuXG52YXIgcmVnZXggPSAvXig/OkFOU0lcXHMpPyhcXGQrKSQvbTtcbmZ1bmN0aW9uIGNyZWF0ZURlY29kZXIoZW5jb2RpbmcsIHNlY29uZCkge1xuICBpZiAoIWVuY29kaW5nKSB7XG4gICAgcmV0dXJuIGJyb3dzZXJEZWNvZGVyO1xuICB9XG4gIHRyeSB7XG4gICAgbmV3IFRleHREZWNvZGVyKGVuY29kaW5nLnRyaW0oKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKGVuY29kaW5nKTtcbiAgICBpZiAobWF0Y2ggJiYgIXNlY29uZCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZURlY29kZXIoJ3dpbmRvd3MtJyArIG1hdGNoWzFdLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gYnJvd3NlckRlY29kZXI7XG4gICAgfVxuICB9XG4gIHJldHVybiBicm93c2VyRGVjb2RlcjtcbiAgZnVuY3Rpb24gYnJvd3NlckRlY29kZXIoYnVmZmVyKSB7XG4gICAgdmFyIGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoZW5jb2RpbmcgPyBlbmNvZGluZyA6IHVuZGVmaW5lZCk7XG4gICAgdmFyIG91dCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlciwge1xuICAgICAgc3RyZWFtOiB0cnVlXG4gICAgfSkgKyBkZWNvZGVyLmRlY29kZSgpO1xuICAgIHJldHVybiBvdXQucmVwbGFjZSgvXFwwL2csICcnKS50cmltKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGJmSGVhZGVyKGRhdGEpIHtcbiAgdmFyIG91dCA9IHt9O1xuICBvdXQubGFzdFVwZGF0ZWQgPSBuZXcgRGF0ZShkYXRhLmdldFVpbnQ4KDEpICsgMTkwMCwgZGF0YS5nZXRVaW50OCgyKSwgZGF0YS5nZXRVaW50OCgzKSk7XG4gIG91dC5yZWNvcmRzID0gZGF0YS5nZXRVaW50MzIoNCwgdHJ1ZSk7XG4gIG91dC5oZWFkZXJMZW4gPSBkYXRhLmdldFVpbnQxNig4LCB0cnVlKTtcbiAgb3V0LnJlY0xlbiA9IGRhdGEuZ2V0VWludDE2KDEwLCB0cnVlKTtcbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gZGJmUm93SGVhZGVyKGRhdGEsIGhlYWRlckxlbiwgZGVjb2Rlcikge1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBvZmZzZXQgPSAzMjtcbiAgd2hpbGUgKG9mZnNldCA8IGhlYWRlckxlbikge1xuICAgIG91dC5wdXNoKHtcbiAgICAgIG5hbWU6IGRlY29kZXIobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIuc2xpY2UoZGF0YS5ieXRlT2Zmc2V0ICsgb2Zmc2V0LCBkYXRhLmJ5dGVPZmZzZXQgKyBvZmZzZXQgKyAxMSkpKSxcbiAgICAgIGRhdGFUeXBlOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGRhdGEuZ2V0VWludDgob2Zmc2V0ICsgMTEpKSxcbiAgICAgIGxlbjogZGF0YS5nZXRVaW50OChvZmZzZXQgKyAxNiksXG4gICAgICBkZWNpbWFsOiBkYXRhLmdldFVpbnQ4KG9mZnNldCArIDE3KVxuICAgIH0pO1xuICAgIGlmIChkYXRhLmdldFVpbnQ4KG9mZnNldCArIDMyKSA9PT0gMTMpIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgKz0gMzI7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHJvd0Z1bmNzKGJ1ZmZlciwgb2Zmc2V0LCBsZW4sIHR5cGUsIGRlY29kZXIpIHtcbiAgY29uc3QgZGF0YSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIuc2xpY2UoYnVmZmVyLmJ5dGVPZmZzZXQgKyBvZmZzZXQsIGJ1ZmZlci5ieXRlT2Zmc2V0ICsgb2Zmc2V0ICsgbGVuKSk7XG5cbiAgdmFyIHRleHREYXRhID0gZGVjb2RlcihkYXRhKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnTic6XG4gICAgY2FzZSAnRic6XG4gICAgY2FzZSAnTyc6XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh0ZXh0RGF0YSwgMTApO1xuICAgIGNhc2UgJ0QnOlxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHRleHREYXRhLnNsaWNlKDAsIDQpLCBwYXJzZUludCh0ZXh0RGF0YS5zbGljZSg0LCA2KSwgMTApIC0gMSwgdGV4dERhdGEuc2xpY2UoNiwgOCkpO1xuICAgIGNhc2UgJ0wnOlxuICAgICAgcmV0dXJuIHRleHREYXRhLnRvTG93ZXJDYXNlKCkgPT09ICd5JyB8fCB0ZXh0RGF0YS50b0xvd2VyQ2FzZSgpID09PSAndCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0ZXh0RGF0YTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVJvdyhidWZmZXIsIG9mZnNldCwgcm93SGVhZGVycywgZGVjb2Rlcikge1xuICB2YXIgb3V0ID0ge307XG4gIHZhciBpID0gMDtcbiAgdmFyIGxlbiA9IHJvd0hlYWRlcnMubGVuZ3RoO1xuICB2YXIgZmllbGQ7XG4gIHZhciBoZWFkZXI7XG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaGVhZGVyID0gcm93SGVhZGVyc1tpXTtcbiAgICBmaWVsZCA9IHJvd0Z1bmNzKGJ1ZmZlciwgb2Zmc2V0LCBoZWFkZXIubGVuLCBoZWFkZXIuZGF0YVR5cGUsIGRlY29kZXIpO1xuICAgIG9mZnNldCArPSBoZWFkZXIubGVuO1xuICAgIGlmICh0eXBlb2YgZmllbGQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBvdXRbaGVhZGVyLm5hbWVdID0gZmllbGQ7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwYXJzZURiZiAoYnVmZmVyLCBlbmNvZGluZykge1xuICB2YXIgZGVjb2RlciA9IGNyZWF0ZURlY29kZXIoZW5jb2RpbmcpO1xuICB2YXIgaGVhZGVyID0gZGJmSGVhZGVyKGJ1ZmZlcik7XG4gIHZhciByb3dIZWFkZXJzID0gZGJmUm93SGVhZGVyKGJ1ZmZlciwgaGVhZGVyLmhlYWRlckxlbiAtIDEsIGRlY29kZXIpO1xuXG4gIHZhciBvZmZzZXQgPSAoKHJvd0hlYWRlcnMubGVuZ3RoICsgMSkgPDwgNSkgKyAyO1xuICB2YXIgcmVjTGVuID0gaGVhZGVyLnJlY0xlbjtcbiAgdmFyIHJlY29yZHMgPSBoZWFkZXIucmVjb3JkcztcbiAgdmFyIG91dCA9IFtdO1xuICB3aGlsZSAocmVjb3Jkcykge1xuICAgIG91dC5wdXNoKHBhcnNlUm93KGJ1ZmZlciwgb2Zmc2V0LCByb3dIZWFkZXJzLCBkZWNvZGVyKSk7XG4gICAgb2Zmc2V0ICs9IHJlY0xlbjtcbiAgICByZWNvcmRzLS07XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuY29uc3QgVVJMID0gZ2xvYmFsVGhpcy5VUkw7XG5jb25zdCB0b1VpdG44QXJyID0gYiA9PiB7XG4gIGlmICghYikge1xuICAgIHRocm93IG5ldyBFcnJvcignZm9yZ290IHRvIHBhc3MgYnVmZmVyJyk7XG4gIH1cbiAgaWYgKGlzQXJyYXlCdWZmZXIoYikpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYik7XG4gIH1cbiAgaWYgKGlzQXJyYXlCdWZmZXIoYi5idWZmZXIpKSB7XG4gICAgaWYgKGIuQllURVNfUEVSX0VMRU1FTlQgPT09IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYi5idWZmZXIsIGIuYnl0ZU9mZnNldCwgYi5ieXRlTGVuZ3RoKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYnVmZmVyIGxpa2Ugb2JqZWN0Jylcbn07XG5jb25zdCB0eHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5jb25zdCB0b1N0cmluZyA9IChwb3NzaWJsZVN0cmluZykgPT4ge1xuICBpZiAoIXBvc3NpYmxlU3RyaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgcG9zc2libGVTdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBvc3NpYmxlU3RyaW5nO1xuICB9XG4gIGlmIChpc0FycmF5QnVmZmVyKHBvc3NpYmxlU3RyaW5nKSB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcocG9zc2libGVTdHJpbmcpIHx8IGlzRGF0YVZpZXcocG9zc2libGVTdHJpbmcpKSB7XG4gICAgcmV0dXJuIHR4dERlY29kZXIuZGVjb2RlKHBvc3NpYmxlU3RyaW5nKTtcbiAgfVxufTtcbmNvbnN0IHRvRGF0YVZpZXcgPSBiID0+IHtcbiAgaWYgKCFiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmb3Jnb3QgdG8gcGFzcyBidWZmZXInKTtcbiAgfVxuICBpZiAoaXNEYXRhVmlldyhiKSkge1xuICAgIHJldHVybiBiO1xuICB9XG4gIGlmIChpc0FycmF5QnVmZmVyKGIpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRhVmlldyhiKTtcbiAgfVxuICBpZiAoaXNBcnJheUJ1ZmZlcihiLmJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IERhdGFWaWV3KGIuYnVmZmVyLCBiLmJ5dGVPZmZzZXQsIGIuYnl0ZUxlbmd0aCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJ1ZmZlciBsaWtlIG9iamVjdCcpXG59O1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QgaW5zdGFuY2VvZiBnbG9iYWxUaGlzLkFycmF5QnVmZmVyIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cbmZ1bmN0aW9uIGlzRGF0YVZpZXcoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdCBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuRGF0YVZpZXcgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBEYXRhVmlld10nXG59XG5cbmNvbnN0IGNvbWJpbmUgPSBmdW5jdGlvbiAoW3NocCwgZGJmXSkge1xuICBjb25zdCBvdXQgPSB7fTtcbiAgb3V0LnR5cGUgPSAnRmVhdHVyZUNvbGxlY3Rpb24nO1xuICBvdXQuZmVhdHVyZXMgPSBbXTtcbiAgbGV0IGkgPSAwO1xuICBjb25zdCBsZW4gPSBzaHAubGVuZ3RoO1xuICBpZiAoIWRiZikge1xuICAgIGRiZiA9IFtdO1xuICB9XG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgb3V0LmZlYXR1cmVzLnB1c2goe1xuICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgZ2VvbWV0cnk6IHNocFtpXSxcbiAgICAgIHByb3BlcnRpZXM6IGRiZltpXSB8fCB7fVxuICAgIH0pO1xuICAgIGkrKztcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcbmNvbnN0IHBhcnNlWmlwID0gYXN5bmMgZnVuY3Rpb24gKGJ1ZmZlciwgd2hpdGVMaXN0KSB7XG4gIGxldCBrZXk7XG4gIGJ1ZmZlciA9IHRvVWl0bjhBcnIoYnVmZmVyKTtcbiAgY29uc3QgemlwID0gYXdhaXQgdW56aXAoYnVmZmVyKTtcbiAgY29uc3QgbmFtZXMgPSBbXTtcbiAgd2hpdGVMaXN0ID0gd2hpdGVMaXN0IHx8IFtdO1xuICBmb3IgKGtleSBpbiB6aXApIHtcbiAgICBpZiAoa2V5LmluZGV4T2YoJ19fTUFDT1NYJykgIT09IC0xKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGtleS5zbGljZSgtNCkudG9Mb3dlckNhc2UoKSA9PT0gJy5zaHAnKSB7XG4gICAgICBuYW1lcy5wdXNoKGtleS5zbGljZSgwLCAtNCkpO1xuICAgICAgemlwW2tleS5zbGljZSgwLCAtMykgKyBrZXkuc2xpY2UoLTMpLnRvTG93ZXJDYXNlKCldID0gemlwW2tleV07XG4gICAgfSBlbHNlIGlmIChrZXkuc2xpY2UoLTQpLnRvTG93ZXJDYXNlKCkgPT09ICcucHJqJykge1xuICAgICAgemlwW2tleS5zbGljZSgwLCAtMykgKyBrZXkuc2xpY2UoLTMpLnRvTG93ZXJDYXNlKCldID0gcHJvajQoemlwW2tleV0pO1xuICAgIH0gZWxzZSBpZiAoa2V5LnNsaWNlKC01KS50b0xvd2VyQ2FzZSgpID09PSAnLmpzb24nIHx8IHdoaXRlTGlzdC5pbmRleE9mKGtleS5zcGxpdCgnLicpLnBvcCgpKSA+IC0xKSB7XG4gICAgICBuYW1lcy5wdXNoKGtleS5zbGljZSgwLCAtMykgKyBrZXkuc2xpY2UoLTMpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH0gZWxzZSBpZiAoa2V5LnNsaWNlKC00KS50b0xvd2VyQ2FzZSgpID09PSAnLmRiZicgfHwga2V5LnNsaWNlKC00KS50b0xvd2VyQ2FzZSgpID09PSAnLmNwZycpIHtcbiAgICAgIHppcFtrZXkuc2xpY2UoMCwgLTMpICsga2V5LnNsaWNlKC0zKS50b0xvd2VyQ2FzZSgpXSA9IHppcFtrZXldO1xuICAgIH1cbiAgfVxuICBpZiAoIW5hbWVzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gbGF5ZXJzIGZvdW5kcycpO1xuICB9XG4gIGNvbnN0IGdlb2pzb24gPSBuYW1lcy5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBsZXQgcGFyc2VkLCBkYmY7XG4gICAgY29uc3QgbGFzdERvdElkeCA9IG5hbWUubGFzdEluZGV4T2YoJy4nKTtcbiAgICBpZiAobGFzdERvdElkeCA+IC0xICYmIG5hbWUuc2xpY2UobGFzdERvdElkeCkuaW5kZXhPZignanNvbicpID4gLTEpIHtcbiAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UoemlwW25hbWVdKTtcbiAgICAgIHBhcnNlZC5maWxlTmFtZSA9IG5hbWUuc2xpY2UoMCwgbGFzdERvdElkeCk7XG4gICAgfSBlbHNlIGlmICh3aGl0ZUxpc3QuaW5kZXhPZihuYW1lLnNsaWNlKGxhc3REb3RJZHggKyAxKSkgPiAtMSkge1xuICAgICAgcGFyc2VkID0gemlwW25hbWVdO1xuICAgICAgcGFyc2VkLmZpbGVOYW1lID0gbmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHppcFtuYW1lICsgJy5kYmYnXSkge1xuICAgICAgICBkYmYgPSBwYXJzZURiZih6aXBbbmFtZSArICcuZGJmJ10sIHppcFtuYW1lICsgJy5jcGcnXSk7XG4gICAgICB9XG4gICAgICBwYXJzZWQgPSBjb21iaW5lKFtwYXJzZVNocCh6aXBbbmFtZSArICcuc2hwJ10sIHppcFtuYW1lICsgJy5wcmonXSksIGRiZl0pO1xuICAgICAgcGFyc2VkLmZpbGVOYW1lID0gbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfSk7XG4gIGlmIChnZW9qc29uLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBnZW9qc29uWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZW9qc29uO1xuICB9XG59O1xuYXN5bmMgZnVuY3Rpb24gZ2V0WmlwKGJhc2UsIHdoaXRlTGlzdCkge1xuICBjb25zdCBhID0gYXdhaXQgYmluYXJ5QWpheChiYXNlKTtcbiAgcmV0dXJuIHBhcnNlWmlwKGEsIHdoaXRlTGlzdCk7XG59XG5jb25zdCBoYW5kbGVTaHAgPSBhc3luYyAoYmFzZSkgPT4ge1xuICBjb25zdCBhcmdzID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGJpbmFyeUFqYXgoYmFzZSwgJ3NocCcpLFxuICAgIGJpbmFyeUFqYXgoYmFzZSwgJ3ByaicpXG4gIF0pO1xuICBsZXQgcHJqID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgIHByaiA9IHByb2o0KGFyZ3NbMV0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHByaiA9IGZhbHNlO1xuICB9XG4gIHJldHVybiBwYXJzZVNocChhcmdzWzBdLCBwcmopO1xufTtcbmNvbnN0IGhhbmRsZURiZiA9IGFzeW5jIChiYXNlKSA9PiB7XG4gIGNvbnN0IFtkYmYsIGNwZ10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgYmluYXJ5QWpheChiYXNlLCAnZGJmJyksXG4gICAgYmluYXJ5QWpheChiYXNlLCAnY3BnJylcbiAgXSk7XG4gIGlmICghZGJmKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBwYXJzZURiZihkYmYsIGNwZyk7XG59O1xuY29uc3QgY2hlY2tTdWZmaXggPSAoYmFzZSwgc3VmZml4KSA9PiB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoYmFzZSwgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmxvY2F0aW9uKTtcbiAgcmV0dXJuIHVybC5wYXRobmFtZS5zbGljZSgtNCkudG9Mb3dlckNhc2UoKSA9PT0gc3VmZml4O1xufTtcbmNvbnN0IGZyb21PYmplY3QgPSAoeyBzaHAsIGRiZiwgY3BnLCBwcmogfSkgPT4ge1xuICBjb25zdCB0aGluZ3MgPSBbXG4gICAgX3BhcnNlU2hwKHNocCwgcHJqKVxuICBdO1xuICBpZiAoZGJmKSB7XG4gICAgdGhpbmdzLnB1c2goX3BhcnNlRGJmKGRiZiwgY3BnKSk7XG4gIH1cbiAgcmV0dXJuIGNvbWJpbmUodGhpbmdzKTtcbn07XG5jb25zdCBnZXRTaGFwZWZpbGUgPSBhc3luYyBmdW5jdGlvbiAoYmFzZSwgd2hpdGVMaXN0KSB7XG4gIGlmICh0eXBlb2YgYmFzZSAhPT0gJ3N0cmluZycpIHtcbiAgICBpZiAoaXNBcnJheUJ1ZmZlcihiYXNlKSB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcoYmFzZSkgfHwgaXNEYXRhVmlldyhiYXNlKSkge1xuICAgICAgcmV0dXJuIHBhcnNlWmlwKGJhc2UpO1xuICAgIH1cbiAgICBpZiAoYmFzZS5zaHApIHtcbiAgICAgIHJldHVybiBmcm9tT2JqZWN0KGJhc2UpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtdXN0IGJlIGEgc3RyaW5nLCBzb21lIHNvcnQgb2YgQnVmZmVyLCBvciBhbiBvYmplY3Qgd2l0aCBhdCBsZWFzdCBhIC5zaHAgcHJvcGVydHknKVxuICB9XG4gIGlmIChjaGVja1N1ZmZpeChiYXNlLCAnLnppcCcpKSB7XG4gICAgcmV0dXJuIGdldFppcChiYXNlLCB3aGl0ZUxpc3QpO1xuICB9XG4gIGlmIChjaGVja1N1ZmZpeChiYXNlLCAnLnNocCcpKSB7XG4gICAgYmFzZSA9IGJhc2Uuc2xpY2UoMCwgLTQpO1xuICB9XG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgaGFuZGxlU2hwKGJhc2UpLFxuICAgIGhhbmRsZURiZihiYXNlKVxuICBdKTtcbiAgcmV0dXJuIGNvbWJpbmUocmVzdWx0cyk7XG59O1xuY29uc3QgX3BhcnNlU2hwID0gZnVuY3Rpb24gKHNocCwgcHJqKSB7XG4gIHNocCA9IHRvRGF0YVZpZXcoc2hwKTtcbiAgcHJqID0gdG9TdHJpbmcocHJqKTtcbiAgaWYgKHR5cGVvZiBwcmogPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHByaiA9IHByb2o0KHByaik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcHJqID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJzZVNocChzaHAsIHByaik7XG59O1xuY29uc3QgX3BhcnNlRGJmID0gZnVuY3Rpb24gKGRiZiwgY3BnKSB7XG4gIGRiZiA9IHRvRGF0YVZpZXcoZGJmKTtcbiAgY3BnID0gdG9TdHJpbmcoY3BnKTtcbiAgcmV0dXJuIHBhcnNlRGJmKGRiZiwgY3BnKTtcbn07XG5cbmV4cG9ydCB7IGNvbWJpbmUsIGdldFNoYXBlZmlsZSBhcyBkZWZhdWx0LCBnZXRTaGFwZWZpbGUsIF9wYXJzZURiZiBhcyBwYXJzZURiZiwgX3BhcnNlU2hwIGFzIHBhcnNlU2hwLCBwYXJzZVppcCB9O1xuIiwiLy8gY2FzdCBhcnJheSB4IGludG8gbnVtYmVyc1xuLy8gZ2V0IHRoZSBjb250ZW50IG9mIGEgdGV4dCBub2RlLCBpZiBhbnlcbmZ1bmN0aW9uIG5vZGVWYWwoeCkge1xuICBpZiAoeCAmJiB4Lm5vcm1hbGl6ZSkge1xuICAgIHgubm9ybWFsaXplKCk7XG4gIH1cbiAgcmV0dXJuICh4ICYmIHgudGV4dENvbnRlbnQpIHx8IFwiXCI7XG59XG5cbi8vIG9uZSBZIGNoaWxkIG9mIFgsIGlmIGFueSwgb3RoZXJ3aXNlIG51bGxcbmZ1bmN0aW9uIGdldDEoeCwgeSkge1xuICBjb25zdCBuID0geC5nZXRFbGVtZW50c0J5VGFnTmFtZSh5KTtcbiAgcmV0dXJuIG4ubGVuZ3RoID8gblswXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldExpbmVTdHlsZShleHRlbnNpb25zKSB7XG4gIGNvbnN0IHN0eWxlID0ge307XG4gIGlmIChleHRlbnNpb25zKSB7XG4gICAgY29uc3QgbGluZVN0eWxlID0gZ2V0MShleHRlbnNpb25zLCBcImxpbmVcIik7XG4gICAgaWYgKGxpbmVTdHlsZSkge1xuICAgICAgY29uc3QgY29sb3IgPSBub2RlVmFsKGdldDEobGluZVN0eWxlLCBcImNvbG9yXCIpKSxcbiAgICAgICAgb3BhY2l0eSA9IHBhcnNlRmxvYXQobm9kZVZhbChnZXQxKGxpbmVTdHlsZSwgXCJvcGFjaXR5XCIpKSksXG4gICAgICAgIHdpZHRoID0gcGFyc2VGbG9hdChub2RlVmFsKGdldDEobGluZVN0eWxlLCBcIndpZHRoXCIpKSk7XG4gICAgICBpZiAoY29sb3IpIHN0eWxlLnN0cm9rZSA9IGNvbG9yO1xuICAgICAgaWYgKCFpc05hTihvcGFjaXR5KSkgc3R5bGVbXCJzdHJva2Utb3BhY2l0eVwiXSA9IG9wYWNpdHk7XG4gICAgICAvLyBHUFggd2lkdGggaXMgaW4gbW0sIGNvbnZlcnQgdG8gcHggd2l0aCA5NiBweCBwZXIgaW5jaFxuICAgICAgaWYgKCFpc05hTih3aWR0aCkpIHN0eWxlW1wic3Ryb2tlLXdpZHRoXCJdID0gKHdpZHRoICogOTYpIC8gMjUuNDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBnZXRFeHRlbnNpb25zKG5vZGUpIHtcbiAgbGV0IHZhbHVlcyA9IFtdO1xuICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IG5vZGUuY2hpbGROb2Rlc1tpXTtcbiAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSAhPT0gMSkgY29udGludWU7XG4gICAgICBjb25zdCBuYW1lID0gW1wiaGVhcnRcIiwgXCJncHh0cHg6aHJcIiwgXCJoclwiXS5pbmNsdWRlcyhjaGlsZC5ub2RlTmFtZSlcbiAgICAgICAgPyBcImhlYXJ0XCJcbiAgICAgICAgOiBjaGlsZC5ub2RlTmFtZTtcbiAgICAgIGlmIChuYW1lID09PSBcImdweHRweDpUcmFja1BvaW50RXh0ZW5zaW9uXCIpIHtcbiAgICAgICAgLy8gbG9vcCBhZ2FpbiBmb3IgbmVzdGVkIGdhcm1pbiBleHRlbnNpb25zIChlZy4gXCJncHh0cHg6aHJcIilcbiAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChnZXRFeHRlbnNpb25zKGNoaWxkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwdXNoIGN1c3RvbSBleHRlbnNpb24gKGVnLiBcInBvd2VyXCIpXG4gICAgICAgIGNvbnN0IHZhbCA9IG5vZGVWYWwoY2hpbGQpO1xuICAgICAgICB2YWx1ZXMucHVzaChbbmFtZSwgaXNOYU4odmFsKSA/IHZhbCA6IHBhcnNlRmxvYXQodmFsKV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBnZXRNdWx0aSh4LCB5cykge1xuICBjb25zdCBvID0ge307XG4gIGxldCBuO1xuICBsZXQgaztcbiAgZm9yIChrID0gMDsgayA8IHlzLmxlbmd0aDsgaysrKSB7XG4gICAgbiA9IGdldDEoeCwgeXNba10pO1xuICAgIGlmIChuKSBvW3lzW2tdXSA9IG5vZGVWYWwobik7XG4gIH1cbiAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzJDEobm9kZSkge1xuICBjb25zdCBwcm9wID0gZ2V0TXVsdGkobm9kZSwgW1xuICAgIFwibmFtZVwiLFxuICAgIFwiY210XCIsXG4gICAgXCJkZXNjXCIsXG4gICAgXCJ0eXBlXCIsXG4gICAgXCJ0aW1lXCIsXG4gICAgXCJrZXl3b3Jkc1wiLFxuICBdKTtcbiAgLy8gUGFyc2UgYWRkaXRpb25hbCBkYXRhIGZyb20gb3VyIEdhcm1pbiBleHRlbnNpb24ocylcbiAgY29uc3QgZXh0ZW5zaW9ucyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyhcbiAgICBcImh0dHA6Ly93d3cuZ2FybWluLmNvbS94bWxzY2hlbWFzL0dweEV4dGVuc2lvbnMvdjNcIixcbiAgICBcIipcIlxuICApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSBleHRlbnNpb25zW2ldO1xuICAgIC8vIElnbm9yZSBuZXN0ZWQgZXh0ZW5zaW9ucywgbGlrZSB0aG9zZSBvbiByb3V0ZXBvaW50cyBvciB0cmFja3BvaW50c1xuICAgIGlmIChleHRlbnNpb24ucGFyZW50Tm9kZS5wYXJlbnROb2RlID09PSBub2RlKSB7XG4gICAgICBwcm9wW2V4dGVuc2lvbi50YWdOYW1lLnJlcGxhY2UoXCI6XCIsIFwiX1wiKV0gPSBub2RlVmFsKGV4dGVuc2lvbik7XG4gICAgfVxuICB9XG4gIGNvbnN0IGxpbmtzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG4gIGlmIChsaW5rcy5sZW5ndGgpIHByb3AubGlua3MgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKykge1xuICAgIHByb3AubGlua3MucHVzaChcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHsgaHJlZjogbGlua3NbaV0uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSB9LFxuICAgICAgICBnZXRNdWx0aShsaW5rc1tpXSwgW1widGV4dFwiLCBcInR5cGVcIl0pXG4gICAgICApXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcHJvcDtcbn1cblxuZnVuY3Rpb24gY29vcmRQYWlyJDEoeCkge1xuICBjb25zdCBsbCA9IFtcbiAgICBwYXJzZUZsb2F0KHguZ2V0QXR0cmlidXRlKFwibG9uXCIpKSxcbiAgICBwYXJzZUZsb2F0KHguZ2V0QXR0cmlidXRlKFwibGF0XCIpKSxcbiAgXTtcbiAgY29uc3QgZWxlID0gZ2V0MSh4LCBcImVsZVwiKTtcbiAgY29uc3QgdGltZSA9IGdldDEoeCwgXCJ0aW1lXCIpO1xuICBpZiAoZWxlKSB7XG4gICAgY29uc3QgZSA9IHBhcnNlRmxvYXQobm9kZVZhbChlbGUpKTtcbiAgICBpZiAoIWlzTmFOKGUpKSB7XG4gICAgICBsbC5wdXNoKGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29vcmRpbmF0ZXM6IGxsLFxuICAgIHRpbWU6IHRpbWUgPyBub2RlVmFsKHRpbWUpIDogbnVsbCxcbiAgICBleHRlbmRlZFZhbHVlczogZ2V0RXh0ZW5zaW9ucyhnZXQxKHgsIFwiZXh0ZW5zaW9uc1wiKSksXG4gIH07XG59XG5mdW5jdGlvbiBnZXRSb3V0ZShub2RlKSB7XG4gIGNvbnN0IGxpbmUgPSBnZXRQb2ludHMkMShub2RlLCBcInJ0ZXB0XCIpO1xuICBpZiAoIWxpbmUpIHJldHVybjtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcIkZlYXR1cmVcIixcbiAgICBwcm9wZXJ0aWVzOiBPYmplY3QuYXNzaWduKFxuICAgICAgZ2V0UHJvcGVydGllcyQxKG5vZGUpLFxuICAgICAgZ2V0TGluZVN0eWxlKGdldDEobm9kZSwgXCJleHRlbnNpb25zXCIpKSxcbiAgICAgIHsgX2dweFR5cGU6IFwicnRlXCIgfVxuICAgICksXG4gICAgZ2VvbWV0cnk6IHtcbiAgICAgIHR5cGU6IFwiTGluZVN0cmluZ1wiLFxuICAgICAgY29vcmRpbmF0ZXM6IGxpbmUubGluZSxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQb2ludHMkMShub2RlLCBwb2ludG5hbWUpIHtcbiAgY29uc3QgcHRzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShwb2ludG5hbWUpO1xuICBpZiAocHRzLmxlbmd0aCA8IDIpIHJldHVybjsgLy8gSW52YWxpZCBsaW5lIGluIEdlb0pTT05cblxuICBjb25zdCBsaW5lID0gW107XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGNvbnN0IGV4dGVuZGVkVmFsdWVzID0ge307XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYyA9IGNvb3JkUGFpciQxKHB0c1tpXSk7XG4gICAgbGluZS5wdXNoKGMuY29vcmRpbmF0ZXMpO1xuICAgIGlmIChjLnRpbWUpIHRpbWVzLnB1c2goYy50aW1lKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGMuZXh0ZW5kZWRWYWx1ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IFtuYW1lLCB2YWxdID0gYy5leHRlbmRlZFZhbHVlc1tqXTtcbiAgICAgIGNvbnN0IHBsdXJhbCA9XG4gICAgICAgIG5hbWUgPT09IFwiaGVhcnRcIiA/IG5hbWUgOiBuYW1lLnJlcGxhY2UoXCJncHh0cHg6XCIsIFwiXCIpICsgXCJzXCI7XG4gICAgICBpZiAoIWV4dGVuZGVkVmFsdWVzW3BsdXJhbF0pIHtcbiAgICAgICAgZXh0ZW5kZWRWYWx1ZXNbcGx1cmFsXSA9IEFycmF5KHB0cy5sZW5ndGgpLmZpbGwobnVsbCk7XG4gICAgICB9XG4gICAgICBleHRlbmRlZFZhbHVlc1twbHVyYWxdW2ldID0gdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGxpbmU6IGxpbmUsXG4gICAgdGltZXM6IHRpbWVzLFxuICAgIGV4dGVuZGVkVmFsdWVzOiBleHRlbmRlZFZhbHVlcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2sobm9kZSkge1xuICBjb25zdCBzZWdtZW50cyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0cmtzZWdcIik7XG4gIGNvbnN0IHRyYWNrID0gW107XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGNvbnN0IGV4dHJhY3RlZExpbmVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxpbmUgPSBnZXRQb2ludHMkMShzZWdtZW50c1tpXSwgXCJ0cmtwdFwiKTtcbiAgICBpZiAobGluZSkge1xuICAgICAgZXh0cmFjdGVkTGluZXMucHVzaChsaW5lKTtcbiAgICAgIGlmIChsaW5lLnRpbWVzICYmIGxpbmUudGltZXMubGVuZ3RoKSB0aW1lcy5wdXNoKGxpbmUudGltZXMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChleHRyYWN0ZWRMaW5lcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBjb25zdCBtdWx0aSA9IGV4dHJhY3RlZExpbmVzLmxlbmd0aCA+IDE7XG5cbiAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgZ2V0UHJvcGVydGllcyQxKG5vZGUpLFxuICAgIGdldExpbmVTdHlsZShnZXQxKG5vZGUsIFwiZXh0ZW5zaW9uc1wiKSksXG4gICAgeyBfZ3B4VHlwZTogXCJ0cmtcIiB9LFxuICAgIHRpbWVzLmxlbmd0aFxuICAgICAgPyB7XG4gICAgICAgICAgY29vcmRpbmF0ZVByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHRpbWVzOiBtdWx0aSA/IHRpbWVzIDogdGltZXNbMF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgOiB7fVxuICApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0cmFjdGVkTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaW5lID0gZXh0cmFjdGVkTGluZXNbaV07XG4gICAgdHJhY2sucHVzaChsaW5lLmxpbmUpO1xuICAgIGZvciAoY29uc3QgW25hbWUsIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMobGluZS5leHRlbmRlZFZhbHVlcykpIHtcbiAgICAgIGlmICghcHJvcGVydGllcy5jb29yZGluYXRlUHJvcGVydGllcykge1xuICAgICAgICBwcm9wZXJ0aWVzLmNvb3JkaW5hdGVQcm9wZXJ0aWVzID0ge307XG4gICAgICB9XG4gICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuY29vcmRpbmF0ZVByb3BlcnRpZXM7XG4gICAgICBpZiAobXVsdGkpIHtcbiAgICAgICAgaWYgKCFwcm9wc1tuYW1lXSlcbiAgICAgICAgICBwcm9wc1tuYW1lXSA9IGV4dHJhY3RlZExpbmVzLm1hcCgobGluZSkgPT5cbiAgICAgICAgICAgIG5ldyBBcnJheShsaW5lLmxpbmUubGVuZ3RoKS5maWxsKG51bGwpXG4gICAgICAgICAgKTtcbiAgICAgICAgcHJvcHNbbmFtZV1baV0gPSB2YWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wc1tuYW1lXSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFwiRmVhdHVyZVwiLFxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG4gICAgZ2VvbWV0cnk6IG11bHRpXG4gICAgICA/IHtcbiAgICAgICAgICB0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiB0cmFjayxcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHRyYWNrWzBdLFxuICAgICAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQb2ludChub2RlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJGZWF0dXJlXCIsXG4gICAgcHJvcGVydGllczogT2JqZWN0LmFzc2lnbihnZXRQcm9wZXJ0aWVzJDEobm9kZSksIGdldE11bHRpKG5vZGUsIFtcInN5bVwiXSkpLFxuICAgIGdlb21ldHJ5OiB7XG4gICAgICB0eXBlOiBcIlBvaW50XCIsXG4gICAgICBjb29yZGluYXRlczogY29vcmRQYWlyJDEobm9kZSkuY29vcmRpbmF0ZXMsXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24qIGdweEdlbihkb2MpIHtcbiAgY29uc3QgdHJhY2tzID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidHJrXCIpO1xuICBjb25zdCByb3V0ZXMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJydGVcIik7XG4gIGNvbnN0IHdheXBvaW50cyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIndwdFwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZlYXR1cmUgPSBnZXRUcmFjayh0cmFja3NbaV0pO1xuICAgIGlmIChmZWF0dXJlKSB5aWVsZCBmZWF0dXJlO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZmVhdHVyZSA9IGdldFJvdXRlKHJvdXRlc1tpXSk7XG4gICAgaWYgKGZlYXR1cmUpIHlpZWxkIGZlYXR1cmU7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB3YXlwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICB5aWVsZCBnZXRQb2ludCh3YXlwb2ludHNbaV0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdweChkb2MpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgZmVhdHVyZXM6IEFycmF5LmZyb20oZ3B4R2VuKGRvYykpLFxuICB9O1xufVxuXG5jb25zdCBFWFRFTlNJT05TX05TID0gXCJodHRwOi8vd3d3Lmdhcm1pbi5jb20veG1sc2NoZW1hcy9BY3Rpdml0eUV4dGVuc2lvbi92MlwiO1xuXG5jb25zdCBUUkFDS1BPSU5UX0FUVFJJQlVURVMgPSBbXG4gIFtcImhlYXJ0UmF0ZVwiLCBcImhlYXJ0UmF0ZXNcIl0sXG4gIFtcIkNhZGVuY2VcIiwgXCJjYWRlbmNlc1wiXSxcbiAgLy8gRXh0ZW5kZWQgVHJhY2twb2ludCBhdHRyaWJ1dGVzXG4gIFtcIlNwZWVkXCIsIFwic3BlZWRzXCJdLFxuICBbXCJXYXR0c1wiLCBcIndhdHRzXCJdLFxuXTtcblxuY29uc3QgTEFQX0FUVFJJQlVURVMgPSBbXG4gIFtcIlRvdGFsVGltZVNlY29uZHNcIiwgXCJ0b3RhbFRpbWVTZWNvbmRzXCJdLFxuICBbXCJEaXN0YW5jZU1ldGVyc1wiLCBcImRpc3RhbmNlTWV0ZXJzXCJdLFxuICBbXCJNYXhpbXVtU3BlZWRcIiwgXCJtYXhTcGVlZFwiXSxcbiAgW1wiQXZlcmFnZUhlYXJ0UmF0ZUJwbVwiLCBcImF2Z0hlYXJ0UmF0ZVwiXSxcbiAgW1wiTWF4aW11bUhlYXJ0UmF0ZUJwbVwiLCBcIm1heEhlYXJ0UmF0ZVwiXSxcblxuICAvLyBFeHRlbmRlZCBMYXAgYXR0cmlidXRlc1xuICBbXCJBdmdTcGVlZFwiLCBcImF2Z1NwZWVkXCJdLFxuICBbXCJBdmdXYXR0c1wiLCBcImF2Z1dhdHRzXCJdLFxuICBbXCJNYXhXYXR0c1wiLCBcIm1heFdhdHRzXCJdLFxuXTtcblxuZnVuY3Rpb24gZnJvbUVudHJpZXMoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBhcnIpIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnRpZXMobm9kZSwgYXR0cmlidXRlTmFtZXMpIHtcbiAgY29uc3QgcHJvcGVydGllcyA9IFtdO1xuXG4gIGZvciAoY29uc3QgW3RhZywgYWxpYXNdIG9mIGF0dHJpYnV0ZU5hbWVzKSB7XG4gICAgbGV0IGVsZW0gPSBnZXQxKG5vZGUsIHRhZyk7XG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICBjb25zdCBlbGVtZW50cyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyhFWFRFTlNJT05TX05TLCB0YWcpO1xuICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBlbGVtID0gZWxlbWVudHNbMF07XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZhbCA9IHBhcnNlRmxvYXQobm9kZVZhbChlbGVtKSk7XG4gICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICBwcm9wZXJ0aWVzLnB1c2goW2FsaWFzLCB2YWxdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuZnVuY3Rpb24gY29vcmRQYWlyKHgpIHtcbiAgY29uc3QgbG9uID0gbm9kZVZhbChnZXQxKHgsIFwiTG9uZ2l0dWRlRGVncmVlc1wiKSk7XG4gIGNvbnN0IGxhdCA9IG5vZGVWYWwoZ2V0MSh4LCBcIkxhdGl0dWRlRGVncmVlc1wiKSk7XG4gIGlmICghbG9uLmxlbmd0aCB8fCAhbGF0Lmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGxsID0gW3BhcnNlRmxvYXQobG9uKSwgcGFyc2VGbG9hdChsYXQpXTtcbiAgY29uc3QgYWx0ID0gZ2V0MSh4LCBcIkFsdGl0dWRlTWV0ZXJzXCIpO1xuICBjb25zdCBoZWFydFJhdGUgPSBnZXQxKHgsIFwiSGVhcnRSYXRlQnBtXCIpO1xuICBjb25zdCB0aW1lID0gZ2V0MSh4LCBcIlRpbWVcIik7XG4gIGxldCBhO1xuICBpZiAoYWx0KSB7XG4gICAgYSA9IHBhcnNlRmxvYXQobm9kZVZhbChhbHQpKTtcbiAgICBpZiAoIWlzTmFOKGEpKSB7XG4gICAgICBsbC5wdXNoKGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGNvb3JkaW5hdGVzOiBsbCxcbiAgICB0aW1lOiB0aW1lID8gbm9kZVZhbCh0aW1lKSA6IG51bGwsXG4gICAgaGVhcnRSYXRlOiBoZWFydFJhdGUgPyBwYXJzZUZsb2F0KG5vZGVWYWwoaGVhcnRSYXRlKSkgOiBudWxsLFxuICAgIGV4dGVuc2lvbnM6IGdldFByb3BlcnRpZXMoeCwgVFJBQ0tQT0lOVF9BVFRSSUJVVEVTKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9pbnRzKG5vZGUsIHBvaW50bmFtZSkge1xuICBjb25zdCBwdHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHBvaW50bmFtZSk7XG4gIGNvbnN0IGxpbmUgPSBbXTtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgY29uc3QgaGVhcnRSYXRlcyA9IFtdO1xuICBpZiAocHRzLmxlbmd0aCA8IDIpIHJldHVybiBudWxsOyAvLyBJbnZhbGlkIGxpbmUgaW4gR2VvSlNPTlxuICBjb25zdCByZXN1bHQgPSB7IGV4dGVuZGVkUHJvcGVydGllczoge30gfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwdHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjID0gY29vcmRQYWlyKHB0c1tpXSk7XG4gICAgaWYgKGMgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgIGxpbmUucHVzaChjLmNvb3JkaW5hdGVzKTtcbiAgICBpZiAoYy50aW1lKSB0aW1lcy5wdXNoKGMudGltZSk7XG4gICAgaWYgKGMuaGVhcnRSYXRlKSBoZWFydFJhdGVzLnB1c2goYy5oZWFydFJhdGUpO1xuICAgIGZvciAoY29uc3QgW2FsaWFzLCB2YWx1ZV0gb2YgYy5leHRlbnNpb25zKSB7XG4gICAgICBpZiAoIXJlc3VsdC5leHRlbmRlZFByb3BlcnRpZXNbYWxpYXNdKSB7XG4gICAgICAgIHJlc3VsdC5leHRlbmRlZFByb3BlcnRpZXNbYWxpYXNdID0gQXJyYXkocHRzLmxlbmd0aCkuZmlsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5leHRlbmRlZFByb3BlcnRpZXNbYWxpYXNdW2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHJlc3VsdCwge1xuICAgIGxpbmU6IGxpbmUsXG4gICAgdGltZXM6IHRpbWVzLFxuICAgIGhlYXJ0UmF0ZXM6IGhlYXJ0UmF0ZXMsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRMYXAobm9kZSkge1xuICBjb25zdCBzZWdtZW50cyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJUcmFja1wiKTtcbiAgY29uc3QgdHJhY2sgPSBbXTtcbiAgY29uc3QgdGltZXMgPSBbXTtcbiAgY29uc3QgaGVhcnRSYXRlcyA9IFtdO1xuICBjb25zdCBhbGxFeHRlbmRlZFByb3BlcnRpZXMgPSBbXTtcbiAgbGV0IGxpbmU7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSBmcm9tRW50cmllcyhnZXRQcm9wZXJ0aWVzKG5vZGUsIExBUF9BVFRSSUJVVEVTKSk7XG5cbiAgY29uc3QgbmFtZUVsZW1lbnQgPSBnZXQxKG5vZGUsIFwiTmFtZVwiKTtcbiAgaWYgKG5hbWVFbGVtZW50KSB7XG4gICAgcHJvcGVydGllcy5uYW1lID0gbm9kZVZhbChuYW1lRWxlbWVudCk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGluZSA9IGdldFBvaW50cyhzZWdtZW50c1tpXSwgXCJUcmFja3BvaW50XCIpO1xuICAgIGlmIChsaW5lKSB7XG4gICAgICB0cmFjay5wdXNoKGxpbmUubGluZSk7XG4gICAgICBpZiAobGluZS50aW1lcy5sZW5ndGgpIHRpbWVzLnB1c2gobGluZS50aW1lcyk7XG4gICAgICBpZiAobGluZS5oZWFydFJhdGVzLmxlbmd0aCkgaGVhcnRSYXRlcy5wdXNoKGxpbmUuaGVhcnRSYXRlcyk7XG4gICAgICBhbGxFeHRlbmRlZFByb3BlcnRpZXMucHVzaChsaW5lLmV4dGVuZGVkUHJvcGVydGllcyk7XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsRXh0ZW5kZWRQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZXh0ZW5kZWRQcm9wZXJ0aWVzID0gYWxsRXh0ZW5kZWRQcm9wZXJ0aWVzW2ldO1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZXh0ZW5kZWRQcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHByb3BlcnRpZXNbcHJvcGVydHldID0gbGluZS5leHRlbmRlZFByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFwcm9wZXJ0aWVzW3Byb3BlcnR5XSkge1xuICAgICAgICAgIHByb3BlcnRpZXNbcHJvcGVydHldID0gdHJhY2subWFwKCh0cmFjaykgPT5cbiAgICAgICAgICAgIEFycmF5KHRyYWNrLmxlbmd0aCkuZmlsbChudWxsKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0eV1baV0gPSBleHRlbmRlZFByb3BlcnRpZXNbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodHJhY2subGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgaWYgKHRpbWVzLmxlbmd0aCB8fCBoZWFydFJhdGVzLmxlbmd0aCkge1xuICAgIHByb3BlcnRpZXMuY29vcmRpbmF0ZVByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKFxuICAgICAgdGltZXMubGVuZ3RoXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdGltZXM6IHRyYWNrLmxlbmd0aCA9PT0gMSA/IHRpbWVzWzBdIDogdGltZXMsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9LFxuICAgICAgaGVhcnRSYXRlcy5sZW5ndGhcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBoZWFydDogdHJhY2subGVuZ3RoID09PSAxID8gaGVhcnRSYXRlc1swXSA6IGhlYXJ0UmF0ZXMsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJGZWF0dXJlXCIsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllcyxcbiAgICBnZW9tZXRyeToge1xuICAgICAgdHlwZTogdHJhY2subGVuZ3RoID09PSAxID8gXCJMaW5lU3RyaW5nXCIgOiBcIk11bHRpTGluZVN0cmluZ1wiLFxuICAgICAgY29vcmRpbmF0ZXM6IHRyYWNrLmxlbmd0aCA9PT0gMSA/IHRyYWNrWzBdIDogdHJhY2ssXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24qIHRjeEdlbihkb2MpIHtcbiAgY29uc3QgbGFwcyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkxhcFwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxhcHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmZWF0dXJlID0gZ2V0TGFwKGxhcHNbaV0pO1xuICAgIGlmIChmZWF0dXJlKSB5aWVsZCBmZWF0dXJlO1xuICB9XG5cbiAgY29uc3QgY291cnNlcyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIkNvdXJzZXNcIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3Vyc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZmVhdHVyZSA9IGdldExhcChjb3Vyc2VzW2ldKTtcbiAgICBpZiAoZmVhdHVyZSkgeWllbGQgZmVhdHVyZTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0Y3goZG9jKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLFxuICAgIGZlYXR1cmVzOiBBcnJheS5mcm9tKHRjeEdlbihkb2MpKSxcbiAgfTtcbn1cblxuY29uc3QgcmVtb3ZlU3BhY2UgPSAvXFxzKi9nO1xuY29uc3QgdHJpbVNwYWNlID0gL15cXHMqfFxccyokL2c7XG5jb25zdCBzcGxpdFNwYWNlID0gL1xccysvO1xuXG4vLyBnZW5lcmF0ZSBhIHNob3J0LCBudW1lcmljIGhhc2ggb2YgYSBzdHJpbmdcbmZ1bmN0aW9uIG9raGFzaCh4KSB7XG4gIGlmICgheCB8fCAheC5sZW5ndGgpIHJldHVybiAwO1xuICBsZXQgaCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuICAgIGggPSAoKGggPDwgNSkgLSBoICsgeC5jaGFyQ29kZUF0KGkpKSB8IDA7XG4gIH1cbiAgcmV0dXJuIGg7XG59XG5cbi8vIGdldCBvbmUgY29vcmRpbmF0ZSBmcm9tIGEgY29vcmRpbmF0ZSBhcnJheSwgaWYgYW55XG5mdW5jdGlvbiBjb29yZDEodikge1xuICByZXR1cm4gdi5yZXBsYWNlKHJlbW92ZVNwYWNlLCBcIlwiKS5zcGxpdChcIixcIikubWFwKHBhcnNlRmxvYXQpO1xufVxuXG4vLyBnZXQgYWxsIGNvb3JkaW5hdGVzIGZyb20gYSBjb29yZGluYXRlIGFycmF5IGFzIFtbXSxbXV1cbmZ1bmN0aW9uIGNvb3JkKHYpIHtcbiAgcmV0dXJuIHYucmVwbGFjZSh0cmltU3BhY2UsIFwiXCIpLnNwbGl0KHNwbGl0U3BhY2UpLm1hcChjb29yZDEpO1xufVxuXG5mdW5jdGlvbiB4bWwyc3RyKG5vZGUpIHtcbiAgaWYgKG5vZGUueG1sICE9PSB1bmRlZmluZWQpIHJldHVybiBub2RlLnhtbDtcbiAgaWYgKG5vZGUudGFnTmFtZSkge1xuICAgIGxldCBvdXRwdXQgPSBub2RlLnRhZ05hbWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG91dHB1dCArPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZSArIG5vZGUuYXR0cmlidXRlc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG91dHB1dCArPSB4bWwyc3RyKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgaWYgKG5vZGUubm9kZU5hbWUgPT09IFwiI3RleHRcIikge1xuICAgIHJldHVybiAobm9kZS5ub2RlVmFsdWUgfHwgbm9kZS52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gIH1cbiAgaWYgKG5vZGUubm9kZU5hbWUgPT09IFwiI2NkYXRhLXNlY3Rpb25cIikge1xuICAgIHJldHVybiBub2RlLm5vZGVWYWx1ZTtcbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuY29uc3QgZ2VvdHlwZXMgPSBbXCJQb2x5Z29uXCIsIFwiTGluZVN0cmluZ1wiLCBcIlBvaW50XCIsIFwiVHJhY2tcIiwgXCJneDpUcmFja1wiXTtcblxuZnVuY3Rpb24ga21sQ29sb3IocHJvcGVydGllcywgZWxlbSwgcHJlZml4KSB7XG4gIGxldCB2ID0gbm9kZVZhbChnZXQxKGVsZW0sIFwiY29sb3JcIikpIHx8IFwiXCI7XG4gIGNvbnN0IGNvbG9yUHJvcCA9XG4gICAgcHJlZml4ID09IFwic3Ryb2tlXCIgfHwgcHJlZml4ID09PSBcImZpbGxcIiA/IHByZWZpeCA6IHByZWZpeCArIFwiLWNvbG9yXCI7XG4gIGlmICh2LnN1YnN0cigwLCAxKSA9PT0gXCIjXCIpIHtcbiAgICB2ID0gdi5zdWJzdHIoMSk7XG4gIH1cbiAgaWYgKHYubGVuZ3RoID09PSA2IHx8IHYubGVuZ3RoID09PSAzKSB7XG4gICAgcHJvcGVydGllc1tjb2xvclByb3BdID0gdjtcbiAgfSBlbHNlIGlmICh2Lmxlbmd0aCA9PT0gOCkge1xuICAgIHByb3BlcnRpZXNbcHJlZml4ICsgXCItb3BhY2l0eVwiXSA9IHBhcnNlSW50KHYuc3Vic3RyKDAsIDIpLCAxNikgLyAyNTU7XG4gICAgcHJvcGVydGllc1tjb2xvclByb3BdID1cbiAgICAgIFwiI1wiICsgdi5zdWJzdHIoNiwgMikgKyB2LnN1YnN0cig0LCAyKSArIHYuc3Vic3RyKDIsIDIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG51bWVyaWNQcm9wZXJ0eShwcm9wZXJ0aWVzLCBlbGVtLCBzb3VyY2UsIHRhcmdldCkge1xuICBjb25zdCB2YWwgPSBwYXJzZUZsb2F0KG5vZGVWYWwoZ2V0MShlbGVtLCBzb3VyY2UpKSk7XG4gIGlmICghaXNOYU4odmFsKSkgcHJvcGVydGllc1t0YXJnZXRdID0gdmFsO1xufVxuXG5mdW5jdGlvbiBneENvb3Jkcyhyb290KSB7XG4gIGxldCBlbGVtcyA9IHJvb3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjb29yZFwiKTtcbiAgY29uc3QgY29vcmRzID0gW107XG4gIGNvbnN0IHRpbWVzID0gW107XG4gIGlmIChlbGVtcy5sZW5ndGggPT09IDApIGVsZW1zID0gcm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImd4OmNvb3JkXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29vcmRzLnB1c2gobm9kZVZhbChlbGVtc1tpXSkuc3BsaXQoXCIgXCIpLm1hcChwYXJzZUZsb2F0KSk7XG4gIH1cbiAgY29uc3QgdGltZUVsZW1zID0gcm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIndoZW5cIik7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgdGltZUVsZW1zLmxlbmd0aDsgaisrKSB0aW1lcy5wdXNoKG5vZGVWYWwodGltZUVsZW1zW2pdKSk7XG4gIHJldHVybiB7XG4gICAgY29vcmRzOiBjb29yZHMsXG4gICAgdGltZXM6IHRpbWVzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRHZW9tZXRyeShyb290KSB7XG4gIGxldCBnZW9tTm9kZTtcbiAgbGV0IGdlb21Ob2RlcztcbiAgbGV0IGk7XG4gIGxldCBqO1xuICBsZXQgaztcbiAgY29uc3QgZ2VvbXMgPSBbXTtcbiAgY29uc3QgY29vcmRUaW1lcyA9IFtdO1xuICBpZiAoZ2V0MShyb290LCBcIk11bHRpR2VvbWV0cnlcIikpIHtcbiAgICByZXR1cm4gZ2V0R2VvbWV0cnkoZ2V0MShyb290LCBcIk11bHRpR2VvbWV0cnlcIikpO1xuICB9XG4gIGlmIChnZXQxKHJvb3QsIFwiTXVsdGlUcmFja1wiKSkge1xuICAgIHJldHVybiBnZXRHZW9tZXRyeShnZXQxKHJvb3QsIFwiTXVsdGlUcmFja1wiKSk7XG4gIH1cbiAgaWYgKGdldDEocm9vdCwgXCJneDpNdWx0aVRyYWNrXCIpKSB7XG4gICAgcmV0dXJuIGdldEdlb21ldHJ5KGdldDEocm9vdCwgXCJneDpNdWx0aVRyYWNrXCIpKTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgZ2VvdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICBnZW9tTm9kZXMgPSByb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKGdlb3R5cGVzW2ldKTtcbiAgICBpZiAoZ2VvbU5vZGVzKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgZ2VvbU5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGdlb21Ob2RlID0gZ2VvbU5vZGVzW2pdO1xuICAgICAgICBpZiAoZ2VvdHlwZXNbaV0gPT09IFwiUG9pbnRcIikge1xuICAgICAgICAgIGdlb21zLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJQb2ludFwiLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkMShub2RlVmFsKGdldDEoZ2VvbU5vZGUsIFwiY29vcmRpbmF0ZXNcIikpKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChnZW90eXBlc1tpXSA9PT0gXCJMaW5lU3RyaW5nXCIpIHtcbiAgICAgICAgICBnZW9tcy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwiTGluZVN0cmluZ1wiLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkKG5vZGVWYWwoZ2V0MShnZW9tTm9kZSwgXCJjb29yZGluYXRlc1wiKSkpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGdlb3R5cGVzW2ldID09PSBcIlBvbHlnb25cIikge1xuICAgICAgICAgIGNvbnN0IHJpbmdzID0gZ2VvbU5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJMaW5lYXJSaW5nXCIpLFxuICAgICAgICAgICAgY29vcmRzID0gW107XG4gICAgICAgICAgZm9yIChrID0gMDsgayA8IHJpbmdzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjb29yZHMucHVzaChjb29yZChub2RlVmFsKGdldDEocmluZ3Nba10sIFwiY29vcmRpbmF0ZXNcIikpKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGdlb21zLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGdlb3R5cGVzW2ldID09PSBcIlRyYWNrXCIgfHwgZ2VvdHlwZXNbaV0gPT09IFwiZ3g6VHJhY2tcIikge1xuICAgICAgICAgIGNvbnN0IHRyYWNrID0gZ3hDb29yZHMoZ2VvbU5vZGUpO1xuICAgICAgICAgIGdlb21zLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgICAgICBjb29yZGluYXRlczogdHJhY2suY29vcmRzLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh0cmFjay50aW1lcy5sZW5ndGgpIGNvb3JkVGltZXMucHVzaCh0cmFjay50aW1lcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBnZW9tczogZ2VvbXMsXG4gICAgY29vcmRUaW1lczogY29vcmRUaW1lcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGxhY2VtYXJrKHJvb3QsIHN0eWxlSW5kZXgsIHN0eWxlTWFwSW5kZXgsIHN0eWxlQnlIYXNoKSB7XG4gIGNvbnN0IGdlb21zQW5kVGltZXMgPSBnZXRHZW9tZXRyeShyb290KTtcbiAgbGV0IGk7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcbiAgY29uc3QgbmFtZSA9IG5vZGVWYWwoZ2V0MShyb290LCBcIm5hbWVcIikpO1xuICBjb25zdCBhZGRyZXNzID0gbm9kZVZhbChnZXQxKHJvb3QsIFwiYWRkcmVzc1wiKSk7XG4gIGxldCBzdHlsZVVybCA9IG5vZGVWYWwoZ2V0MShyb290LCBcInN0eWxlVXJsXCIpKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBub2RlVmFsKGdldDEocm9vdCwgXCJkZXNjcmlwdGlvblwiKSk7XG4gIGNvbnN0IHRpbWVTcGFuID0gZ2V0MShyb290LCBcIlRpbWVTcGFuXCIpO1xuICBjb25zdCB0aW1lU3RhbXAgPSBnZXQxKHJvb3QsIFwiVGltZVN0YW1wXCIpO1xuICBjb25zdCBleHRlbmRlZERhdGEgPSBnZXQxKHJvb3QsIFwiRXh0ZW5kZWREYXRhXCIpO1xuICBsZXQgaWNvblN0eWxlID0gZ2V0MShyb290LCBcIkljb25TdHlsZVwiKTtcbiAgbGV0IGxhYmVsU3R5bGUgPSBnZXQxKHJvb3QsIFwiTGFiZWxTdHlsZVwiKTtcbiAgbGV0IGxpbmVTdHlsZSA9IGdldDEocm9vdCwgXCJMaW5lU3R5bGVcIik7XG4gIGxldCBwb2x5U3R5bGUgPSBnZXQxKHJvb3QsIFwiUG9seVN0eWxlXCIpO1xuICBjb25zdCB2aXNpYmlsaXR5ID0gZ2V0MShyb290LCBcInZpc2liaWxpdHlcIik7XG5cbiAgaWYgKG5hbWUpIHByb3BlcnRpZXMubmFtZSA9IG5hbWU7XG4gIGlmIChhZGRyZXNzKSBwcm9wZXJ0aWVzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICBpZiAoc3R5bGVVcmwpIHtcbiAgICBpZiAoc3R5bGVVcmxbMF0gIT09IFwiI1wiKSB7XG4gICAgICBzdHlsZVVybCA9IFwiI1wiICsgc3R5bGVVcmw7XG4gICAgfVxuXG4gICAgcHJvcGVydGllcy5zdHlsZVVybCA9IHN0eWxlVXJsO1xuICAgIGlmIChzdHlsZUluZGV4W3N0eWxlVXJsXSkge1xuICAgICAgcHJvcGVydGllcy5zdHlsZUhhc2ggPSBzdHlsZUluZGV4W3N0eWxlVXJsXTtcbiAgICB9XG4gICAgaWYgKHN0eWxlTWFwSW5kZXhbc3R5bGVVcmxdKSB7XG4gICAgICBwcm9wZXJ0aWVzLnN0eWxlTWFwSGFzaCA9IHN0eWxlTWFwSW5kZXhbc3R5bGVVcmxdO1xuICAgICAgcHJvcGVydGllcy5zdHlsZUhhc2ggPSBzdHlsZUluZGV4W3N0eWxlTWFwSW5kZXhbc3R5bGVVcmxdLm5vcm1hbF07XG4gICAgfVxuICAgIC8vIFRyeSB0byBwb3B1bGF0ZSB0aGUgbGluZVN0eWxlIG9yIHBvbHlTdHlsZSBzaW5jZSB3ZSBnb3QgdGhlIHN0eWxlIGhhc2hcbiAgICBjb25zdCBzdHlsZSA9IHN0eWxlQnlIYXNoW3Byb3BlcnRpZXMuc3R5bGVIYXNoXTtcbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIGlmICghaWNvblN0eWxlKSBpY29uU3R5bGUgPSBnZXQxKHN0eWxlLCBcIkljb25TdHlsZVwiKTtcbiAgICAgIGlmICghbGFiZWxTdHlsZSkgbGFiZWxTdHlsZSA9IGdldDEoc3R5bGUsIFwiTGFiZWxTdHlsZVwiKTtcbiAgICAgIGlmICghbGluZVN0eWxlKSBsaW5lU3R5bGUgPSBnZXQxKHN0eWxlLCBcIkxpbmVTdHlsZVwiKTtcbiAgICAgIGlmICghcG9seVN0eWxlKSBwb2x5U3R5bGUgPSBnZXQxKHN0eWxlLCBcIlBvbHlTdHlsZVwiKTtcbiAgICB9XG4gIH1cbiAgaWYgKGRlc2NyaXB0aW9uKSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIGlmICh0aW1lU3Bhbikge1xuICAgIGNvbnN0IGJlZ2luID0gbm9kZVZhbChnZXQxKHRpbWVTcGFuLCBcImJlZ2luXCIpKTtcbiAgICBjb25zdCBlbmQgPSBub2RlVmFsKGdldDEodGltZVNwYW4sIFwiZW5kXCIpKTtcbiAgICBwcm9wZXJ0aWVzLnRpbWVzcGFuID0geyBiZWdpbjogYmVnaW4sIGVuZDogZW5kIH07XG4gIH1cbiAgaWYgKHRpbWVTdGFtcCkge1xuICAgIHByb3BlcnRpZXMudGltZXN0YW1wID0gbm9kZVZhbChnZXQxKHRpbWVTdGFtcCwgXCJ3aGVuXCIpKTtcbiAgfVxuICBpZiAoaWNvblN0eWxlKSB7XG4gICAga21sQ29sb3IocHJvcGVydGllcywgaWNvblN0eWxlLCBcImljb25cIik7XG4gICAgbnVtZXJpY1Byb3BlcnR5KHByb3BlcnRpZXMsIGljb25TdHlsZSwgXCJzY2FsZVwiLCBcImljb24tc2NhbGVcIik7XG4gICAgbnVtZXJpY1Byb3BlcnR5KHByb3BlcnRpZXMsIGljb25TdHlsZSwgXCJoZWFkaW5nXCIsIFwiaWNvbi1oZWFkaW5nXCIpO1xuXG4gICAgY29uc3QgaG90c3BvdCA9IGdldDEoaWNvblN0eWxlLCBcImhvdFNwb3RcIik7XG4gICAgaWYgKGhvdHNwb3QpIHtcbiAgICAgIGNvbnN0IGxlZnQgPSBwYXJzZUZsb2F0KGhvdHNwb3QuZ2V0QXR0cmlidXRlKFwieFwiKSk7XG4gICAgICBjb25zdCB0b3AgPSBwYXJzZUZsb2F0KGhvdHNwb3QuZ2V0QXR0cmlidXRlKFwieVwiKSk7XG4gICAgICBpZiAoIWlzTmFOKGxlZnQpICYmICFpc05hTih0b3ApKSBwcm9wZXJ0aWVzW1wiaWNvbi1vZmZzZXRcIl0gPSBbbGVmdCwgdG9wXTtcbiAgICB9XG4gICAgY29uc3QgaWNvbiA9IGdldDEoaWNvblN0eWxlLCBcIkljb25cIik7XG4gICAgaWYgKGljb24pIHtcbiAgICAgIGNvbnN0IGhyZWYgPSBub2RlVmFsKGdldDEoaWNvbiwgXCJocmVmXCIpKTtcbiAgICAgIGlmIChocmVmKSBwcm9wZXJ0aWVzLmljb24gPSBocmVmO1xuICAgIH1cbiAgfVxuICBpZiAobGFiZWxTdHlsZSkge1xuICAgIGttbENvbG9yKHByb3BlcnRpZXMsIGxhYmVsU3R5bGUsIFwibGFiZWxcIik7XG4gICAgbnVtZXJpY1Byb3BlcnR5KHByb3BlcnRpZXMsIGxhYmVsU3R5bGUsIFwic2NhbGVcIiwgXCJsYWJlbC1zY2FsZVwiKTtcbiAgfVxuICBpZiAobGluZVN0eWxlKSB7XG4gICAga21sQ29sb3IocHJvcGVydGllcywgbGluZVN0eWxlLCBcInN0cm9rZVwiKTtcbiAgICBudW1lcmljUHJvcGVydHkocHJvcGVydGllcywgbGluZVN0eWxlLCBcIndpZHRoXCIsIFwic3Ryb2tlLXdpZHRoXCIpO1xuICB9XG4gIGlmIChwb2x5U3R5bGUpIHtcbiAgICBrbWxDb2xvcihwcm9wZXJ0aWVzLCBwb2x5U3R5bGUsIFwiZmlsbFwiKTtcbiAgICBjb25zdCBmaWxsID0gbm9kZVZhbChnZXQxKHBvbHlTdHlsZSwgXCJmaWxsXCIpKTtcbiAgICBjb25zdCBvdXRsaW5lID0gbm9kZVZhbChnZXQxKHBvbHlTdHlsZSwgXCJvdXRsaW5lXCIpKTtcbiAgICBpZiAoZmlsbClcbiAgICAgIHByb3BlcnRpZXNbXCJmaWxsLW9wYWNpdHlcIl0gPVxuICAgICAgICBmaWxsID09PSBcIjFcIiA/IHByb3BlcnRpZXNbXCJmaWxsLW9wYWNpdHlcIl0gfHwgMSA6IDA7XG4gICAgaWYgKG91dGxpbmUpXG4gICAgICBwcm9wZXJ0aWVzW1wic3Ryb2tlLW9wYWNpdHlcIl0gPVxuICAgICAgICBvdXRsaW5lID09PSBcIjFcIiA/IHByb3BlcnRpZXNbXCJzdHJva2Utb3BhY2l0eVwiXSB8fCAxIDogMDtcbiAgfVxuICBpZiAoZXh0ZW5kZWREYXRhKSB7XG4gICAgY29uc3QgZGF0YXMgPSBleHRlbmRlZERhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJEYXRhXCIpLFxuICAgICAgc2ltcGxlRGF0YXMgPSBleHRlbmRlZERhdGEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTaW1wbGVEYXRhXCIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcm9wZXJ0aWVzW2RhdGFzW2ldLmdldEF0dHJpYnV0ZShcIm5hbWVcIildID0gbm9kZVZhbChcbiAgICAgICAgZ2V0MShkYXRhc1tpXSwgXCJ2YWx1ZVwiKVxuICAgICAgKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHNpbXBsZURhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcm9wZXJ0aWVzW3NpbXBsZURhdGFzW2ldLmdldEF0dHJpYnV0ZShcIm5hbWVcIildID0gbm9kZVZhbChzaW1wbGVEYXRhc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgcHJvcGVydGllcy52aXNpYmlsaXR5ID0gbm9kZVZhbCh2aXNpYmlsaXR5KTtcbiAgfVxuICBpZiAoZ2VvbXNBbmRUaW1lcy5jb29yZFRpbWVzLmxlbmd0aCkge1xuICAgIHByb3BlcnRpZXMuY29vcmRpbmF0ZVByb3BlcnRpZXMgPSB7XG4gICAgICB0aW1lczpcbiAgICAgICAgZ2VvbXNBbmRUaW1lcy5jb29yZFRpbWVzLmxlbmd0aCA9PT0gMVxuICAgICAgICAgID8gZ2VvbXNBbmRUaW1lcy5jb29yZFRpbWVzWzBdXG4gICAgICAgICAgOiBnZW9tc0FuZFRpbWVzLmNvb3JkVGltZXMsXG4gICAgfTtcbiAgfVxuICBjb25zdCBmZWF0dXJlID0ge1xuICAgIHR5cGU6IFwiRmVhdHVyZVwiLFxuICAgIGdlb21ldHJ5OlxuICAgICAgZ2VvbXNBbmRUaW1lcy5nZW9tcy5sZW5ndGggPT09IDBcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogZ2VvbXNBbmRUaW1lcy5nZW9tcy5sZW5ndGggPT09IDFcbiAgICAgICAgPyBnZW9tc0FuZFRpbWVzLmdlb21zWzBdXG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogXCJHZW9tZXRyeUNvbGxlY3Rpb25cIixcbiAgICAgICAgICAgIGdlb21ldHJpZXM6IGdlb21zQW5kVGltZXMuZ2VvbXMsXG4gICAgICAgICAgfSxcbiAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuICB9O1xuICBpZiAocm9vdC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSkgZmVhdHVyZS5pZCA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIHJldHVybiBmZWF0dXJlO1xufVxuXG5mdW5jdGlvbioga21sR2VuKGRvYykge1xuICAvLyBzdHlsZWluZGV4IGtlZXBzIHRyYWNrIG9mIGhhc2hlZCBzdHlsZXMgaW4gb3JkZXIgdG8gbWF0Y2ggZmVhdHVyZVxuICBjb25zdCBzdHlsZUluZGV4ID0ge307XG4gIGNvbnN0IHN0eWxlQnlIYXNoID0ge307XG4gIC8vIHN0eWxlbWFwaW5kZXgga2VlcHMgdHJhY2sgb2Ygc3R5bGUgbWFwcyB0byBleHBvc2UgaW4gcHJvcGVydGllc1xuICBjb25zdCBzdHlsZU1hcEluZGV4ID0ge307XG4gIC8vIGF0b21pYyBnZW9zcGF0aWFsIHR5cGVzIHN1cHBvcnRlZCBieSBLTUwgLSBNdWx0aUdlb21ldHJ5IGlzXG4gIC8vIGhhbmRsZWQgc2VwYXJhdGVseVxuICAvLyBhbGwgcm9vdCBwbGFjZW1hcmtzIGluIHRoZSBmaWxlXG4gIGNvbnN0IHBsYWNlbWFya3MgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJQbGFjZW1hcmtcIik7XG4gIGNvbnN0IHN0eWxlcyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIlN0eWxlXCIpO1xuICBjb25zdCBzdHlsZU1hcHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJTdHlsZU1hcFwiKTtcblxuICBmb3IgKGxldCBrID0gMDsgayA8IHN0eWxlcy5sZW5ndGg7IGsrKykge1xuICAgIGNvbnN0IHN0eWxlID0gc3R5bGVzW2tdO1xuICAgIGNvbnN0IGhhc2ggPSBva2hhc2goeG1sMnN0cihzdHlsZSkpLnRvU3RyaW5nKDE2KTtcbiAgICBsZXQgaWQgPSBzdHlsZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICBpZiAoXG4gICAgICAhaWQgJiZcbiAgICAgIHN0eWxlLnBhcmVudE5vZGUudGFnTmFtZS5yZXBsYWNlKFwiZ3g6XCIsIFwiXCIpID09PSBcIkNhc2NhZGluZ1N0eWxlXCJcbiAgICApIHtcbiAgICAgIGlkID1cbiAgICAgICAgc3R5bGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJrbWw6aWRcIikgfHxcbiAgICAgICAgc3R5bGUucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICB9XG4gICAgc3R5bGVJbmRleFtcIiNcIiArIGlkXSA9IGhhc2g7XG4gICAgc3R5bGVCeUhhc2hbaGFzaF0gPSBzdHlsZTtcbiAgfVxuICBmb3IgKGxldCBsID0gMDsgbCA8IHN0eWxlTWFwcy5sZW5ndGg7IGwrKykge1xuICAgIHN0eWxlSW5kZXhbXCIjXCIgKyBzdHlsZU1hcHNbbF0uZ2V0QXR0cmlidXRlKFwiaWRcIildID0gb2toYXNoKFxuICAgICAgeG1sMnN0cihzdHlsZU1hcHNbbF0pXG4gICAgKS50b1N0cmluZygxNik7XG4gICAgY29uc3QgcGFpcnMgPSBzdHlsZU1hcHNbbF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJQYWlyXCIpO1xuICAgIGNvbnN0IHBhaXJzTWFwID0ge307XG4gICAgZm9yIChsZXQgbSA9IDA7IG0gPCBwYWlycy5sZW5ndGg7IG0rKykge1xuICAgICAgcGFpcnNNYXBbbm9kZVZhbChnZXQxKHBhaXJzW21dLCBcImtleVwiKSldID0gbm9kZVZhbChcbiAgICAgICAgZ2V0MShwYWlyc1ttXSwgXCJzdHlsZVVybFwiKVxuICAgICAgKTtcbiAgICB9XG4gICAgc3R5bGVNYXBJbmRleFtcIiNcIiArIHN0eWxlTWFwc1tsXS5nZXRBdHRyaWJ1dGUoXCJpZFwiKV0gPSBwYWlyc01hcDtcbiAgfVxuICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYWNlbWFya3MubGVuZ3RoOyBqKyspIHtcbiAgICBjb25zdCBmZWF0dXJlID0gZ2V0UGxhY2VtYXJrKFxuICAgICAgcGxhY2VtYXJrc1tqXSxcbiAgICAgIHN0eWxlSW5kZXgsXG4gICAgICBzdHlsZU1hcEluZGV4LFxuICAgICAgc3R5bGVCeUhhc2hcbiAgICApO1xuICAgIGlmIChmZWF0dXJlKSB5aWVsZCBmZWF0dXJlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGttbChkb2MpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgZmVhdHVyZXM6IEFycmF5LmZyb20oa21sR2VuKGRvYykpLFxuICB9O1xufVxuXG5leHBvcnQgeyBncHgsIGdweEdlbiwga21sLCBrbWxHZW4sIHRjeCwgdGN4R2VuIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2dlb2pzb24uZXMuanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9