"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[81545],{

/***/ 81545:
/*!*******************************************************!*\
  !*** ./node_modules/latlon-geohash/latlon-geohash.js ***!
  \*******************************************************/
/***/ ((module) => {

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Geohash encoding/decoding and associated functions   (c) Chris Veness 2014-2016 / MIT Licence  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */




/**
 * Geohash encode, decode, bounds, neighbours.
 *
 * @namespace
 */
var Geohash = {};

/* (Geohash-specific) Base32 map */
Geohash.base32 = '0123456789bcdefghjkmnpqrstuvwxyz';

/**
 * Encodes latitude/longitude to geohash, either to specified precision or to automatically
 * evaluated precision.
 *
 * @param   {number} lat - Latitude in degrees.
 * @param   {number} lon - Longitude in degrees.
 * @param   {number} [precision] - Number of characters in resulting geohash.
 * @returns {string} Geohash of supplied latitude/longitude.
 * @throws  Invalid geohash.
 *
 * @example
 *     var geohash = Geohash.encode(52.205, 0.119, 7); // geohash: 'u120fxw'
 */
Geohash.encode = function(lat, lon, precision) {
    // infer precision?
    if (typeof precision == 'undefined') {
        // refine geohash until it matches precision of supplied lat/lon
        for (var p=1; p<=12; p++) {
            var hash = Geohash.encode(lat, lon, p);
            var posn = Geohash.decode(hash);
            if (posn.lat==lat && posn.lon==lon) return hash;
        }
        precision = 12; // set to maximum
    }

    lat = Number(lat);
    lon = Number(lon);
    precision = Number(precision);

    if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

    var idx = 0; // index into base32 map
    var bit = 0; // each char holds 5 bits
    var evenBit = true;
    var geohash = '';

    var latMin =  -90, latMax =  90;
    var lonMin = -180, lonMax = 180;

    while (geohash.length < precision) {
        if (evenBit) {
            // bisect E-W longitude
            var lonMid = (lonMin + lonMax) / 2;
            if (lon >= lonMid) {
                idx = idx*2 + 1;
                lonMin = lonMid;
            } else {
                idx = idx*2;
                lonMax = lonMid;
            }
        } else {
            // bisect N-S latitude
            var latMid = (latMin + latMax) / 2;
            if (lat >= latMid) {
                idx = idx*2 + 1;
                latMin = latMid;
            } else {
                idx = idx*2;
                latMax = latMid;
            }
        }
        evenBit = !evenBit;

        if (++bit == 5) {
            // 5 bits gives us a character: append it and start over
            geohash += Geohash.base32.charAt(idx);
            bit = 0;
            idx = 0;
        }
    }

    return geohash;
};


/**
 * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
 *     to reasonable precision).
 *
 * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
 * @returns {{lat:number, lon:number}} (Center of) geohashed location.
 * @throws  Invalid geohash.
 *
 * @example
 *     var latlon = Geohash.decode('u120fxw'); // latlon: { lat: 52.205, lon: 0.1188 }
 */
Geohash.decode = function(geohash) {

    var bounds = Geohash.bounds(geohash); // <-- the hard work
    // now just determine the centre of the cell...

    var latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
    var latMax = bounds.ne.lat, lonMax = bounds.ne.lon;

    // cell centre
    var lat = (latMin + latMax)/2;
    var lon = (lonMin + lonMax)/2;

    // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
    lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10));
    lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10));

    return { lat: Number(lat), lon: Number(lon) };
};


/**
 * Returns SW/NE latitude/longitude bounds of specified geohash.
 *
 * @param   {string} geohash - Cell that bounds are required of.
 * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
 * @throws  Invalid geohash.
 */
Geohash.bounds = function(geohash) {
    if (geohash.length === 0) throw new Error('Invalid geohash');

    geohash = geohash.toLowerCase();

    var evenBit = true;
    var latMin =  -90, latMax =  90;
    var lonMin = -180, lonMax = 180;

    for (var i=0; i<geohash.length; i++) {
        var chr = geohash.charAt(i);
        var idx = Geohash.base32.indexOf(chr);
        if (idx == -1) throw new Error('Invalid geohash');

        for (var n=4; n>=0; n--) {
            var bitN = idx >> n & 1;
            if (evenBit) {
                // longitude
                var lonMid = (lonMin+lonMax) / 2;
                if (bitN == 1) {
                    lonMin = lonMid;
                } else {
                    lonMax = lonMid;
                }
            } else {
                // latitude
                var latMid = (latMin+latMax) / 2;
                if (bitN == 1) {
                    latMin = latMid;
                } else {
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;
        }
    }

    var bounds = {
        sw: { lat: latMin, lon: lonMin },
        ne: { lat: latMax, lon: lonMax },
    };

    return bounds;
};


/**
 * Determines adjacent cell in given direction.
 *
 * @param   geohash - Cell to which adjacent cell is required.
 * @param   direction - Direction from geohash (N/S/E/W).
 * @returns {string} Geocode of adjacent cell.
 * @throws  Invalid geohash.
 */
Geohash.adjacent = function(geohash, direction) {
    // based on github.com/davetroy/geohash-js

    geohash = geohash.toLowerCase();
    direction = direction.toLowerCase();

    if (geohash.length === 0) throw new Error('Invalid geohash');
    if ('nsew'.indexOf(direction) == -1) throw new Error('Invalid direction');

    var neighbour = {
        n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
        s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
        e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
        w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ],
    };
    var border = {
        n: [ 'prxz',     'bcfguvyz' ],
        s: [ '028b',     '0145hjnp' ],
        e: [ 'bcfguvyz', 'prxz'     ],
        w: [ '0145hjnp', '028b'     ],
    };

    var lastCh = geohash.slice(-1);    // last character of hash
    var parent = geohash.slice(0, -1); // hash without last character

    var type = geohash.length % 2;

    // check for edge-cases which don't share common prefix
    if (border[direction][type].indexOf(lastCh) != -1 && parent !== '') {
        parent = Geohash.adjacent(parent, direction);
    }

    // append letter for direction to parent
    return parent + Geohash.base32.charAt(neighbour[direction][type].indexOf(lastCh));
};


/**
 * Returns all 8 adjacent cells to specified geohash.
 *
 * @param   {string} geohash - Geohash neighbours are required of.
 * @returns {{n,ne,e,se,s,sw,w,nw: string}}
 * @throws  Invalid geohash.
 */
Geohash.neighbours = function(geohash) {
    return {
        'n':  Geohash.adjacent(geohash, 'n'),
        'ne': Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'e'),
        'e':  Geohash.adjacent(geohash, 'e'),
        'se': Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'e'),
        's':  Geohash.adjacent(geohash, 's'),
        'sw': Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'w'),
        'w':  Geohash.adjacent(geohash, 'w'),
        'nw': Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'w'),
    };
};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
if ( true && module.exports) module.exports = Geohash; // CommonJS, node.js


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuMzdlNTBjNjYxZGFkZWU1NDBkMjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVhOzs7QUFHYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMseUJBQXlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxhQUFhO0FBQzVEO0FBQ0E7O0FBRUEsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjLEtBQUsseUJBQXlCLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixNQUFNO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsMEJBQTBCO0FBQ3hDOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkMsdUNBQXVDOztBQUV2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxJQUFJLEtBQTRCLDhDQUE4QyIsInNvdXJjZXMiOlsid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvbGF0bG9uLWdlb2hhc2gvbGF0bG9uLWdlb2hhc2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtICAqL1xuLyogR2VvaGFzaCBlbmNvZGluZy9kZWNvZGluZyBhbmQgYXNzb2NpYXRlZCBmdW5jdGlvbnMgICAoYykgQ2hyaXMgVmVuZXNzIDIwMTQtMjAxNiAvIE1JVCBMaWNlbmNlICAqL1xuLyogLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtICAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuLyoqXG4gKiBHZW9oYXNoIGVuY29kZSwgZGVjb2RlLCBib3VuZHMsIG5laWdoYm91cnMuXG4gKlxuICogQG5hbWVzcGFjZVxuICovXG52YXIgR2VvaGFzaCA9IHt9O1xuXG4vKiAoR2VvaGFzaC1zcGVjaWZpYykgQmFzZTMyIG1hcCAqL1xuR2VvaGFzaC5iYXNlMzIgPSAnMDEyMzQ1Njc4OWJjZGVmZ2hqa21ucHFyc3R1dnd4eXonO1xuXG4vKipcbiAqIEVuY29kZXMgbGF0aXR1ZGUvbG9uZ2l0dWRlIHRvIGdlb2hhc2gsIGVpdGhlciB0byBzcGVjaWZpZWQgcHJlY2lzaW9uIG9yIHRvIGF1dG9tYXRpY2FsbHlcbiAqIGV2YWx1YXRlZCBwcmVjaXNpb24uXG4gKlxuICogQHBhcmFtICAge251bWJlcn0gbGF0IC0gTGF0aXR1ZGUgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSAgIHtudW1iZXJ9IGxvbiAtIExvbmdpdHVkZSBpbiBkZWdyZWVzLlxuICogQHBhcmFtICAge251bWJlcn0gW3ByZWNpc2lvbl0gLSBOdW1iZXIgb2YgY2hhcmFjdGVycyBpbiByZXN1bHRpbmcgZ2VvaGFzaC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEdlb2hhc2ggb2Ygc3VwcGxpZWQgbGF0aXR1ZGUvbG9uZ2l0dWRlLlxuICogQHRocm93cyAgSW52YWxpZCBnZW9oYXNoLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgICAgdmFyIGdlb2hhc2ggPSBHZW9oYXNoLmVuY29kZSg1Mi4yMDUsIDAuMTE5LCA3KTsgLy8gZ2VvaGFzaDogJ3UxMjBmeHcnXG4gKi9cbkdlb2hhc2guZW5jb2RlID0gZnVuY3Rpb24obGF0LCBsb24sIHByZWNpc2lvbikge1xuICAgIC8vIGluZmVyIHByZWNpc2lvbj9cbiAgICBpZiAodHlwZW9mIHByZWNpc2lvbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyByZWZpbmUgZ2VvaGFzaCB1bnRpbCBpdCBtYXRjaGVzIHByZWNpc2lvbiBvZiBzdXBwbGllZCBsYXQvbG9uXG4gICAgICAgIGZvciAodmFyIHA9MTsgcDw9MTI7IHArKykge1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBHZW9oYXNoLmVuY29kZShsYXQsIGxvbiwgcCk7XG4gICAgICAgICAgICB2YXIgcG9zbiA9IEdlb2hhc2guZGVjb2RlKGhhc2gpO1xuICAgICAgICAgICAgaWYgKHBvc24ubGF0PT1sYXQgJiYgcG9zbi5sb249PWxvbikgcmV0dXJuIGhhc2g7XG4gICAgICAgIH1cbiAgICAgICAgcHJlY2lzaW9uID0gMTI7IC8vIHNldCB0byBtYXhpbXVtXG4gICAgfVxuXG4gICAgbGF0ID0gTnVtYmVyKGxhdCk7XG4gICAgbG9uID0gTnVtYmVyKGxvbik7XG4gICAgcHJlY2lzaW9uID0gTnVtYmVyKHByZWNpc2lvbik7XG5cbiAgICBpZiAoaXNOYU4obGF0KSB8fCBpc05hTihsb24pIHx8IGlzTmFOKHByZWNpc2lvbikpIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBnZW9oYXNoJyk7XG5cbiAgICB2YXIgaWR4ID0gMDsgLy8gaW5kZXggaW50byBiYXNlMzIgbWFwXG4gICAgdmFyIGJpdCA9IDA7IC8vIGVhY2ggY2hhciBob2xkcyA1IGJpdHNcbiAgICB2YXIgZXZlbkJpdCA9IHRydWU7XG4gICAgdmFyIGdlb2hhc2ggPSAnJztcblxuICAgIHZhciBsYXRNaW4gPSAgLTkwLCBsYXRNYXggPSAgOTA7XG4gICAgdmFyIGxvbk1pbiA9IC0xODAsIGxvbk1heCA9IDE4MDtcblxuICAgIHdoaWxlIChnZW9oYXNoLmxlbmd0aCA8IHByZWNpc2lvbikge1xuICAgICAgICBpZiAoZXZlbkJpdCkge1xuICAgICAgICAgICAgLy8gYmlzZWN0IEUtVyBsb25naXR1ZGVcbiAgICAgICAgICAgIHZhciBsb25NaWQgPSAobG9uTWluICsgbG9uTWF4KSAvIDI7XG4gICAgICAgICAgICBpZiAobG9uID49IGxvbk1pZCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IGlkeCoyICsgMTtcbiAgICAgICAgICAgICAgICBsb25NaW4gPSBsb25NaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlkeCA9IGlkeCoyO1xuICAgICAgICAgICAgICAgIGxvbk1heCA9IGxvbk1pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGJpc2VjdCBOLVMgbGF0aXR1ZGVcbiAgICAgICAgICAgIHZhciBsYXRNaWQgPSAobGF0TWluICsgbGF0TWF4KSAvIDI7XG4gICAgICAgICAgICBpZiAobGF0ID49IGxhdE1pZCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IGlkeCoyICsgMTtcbiAgICAgICAgICAgICAgICBsYXRNaW4gPSBsYXRNaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlkeCA9IGlkeCoyO1xuICAgICAgICAgICAgICAgIGxhdE1heCA9IGxhdE1pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBldmVuQml0ID0gIWV2ZW5CaXQ7XG5cbiAgICAgICAgaWYgKCsrYml0ID09IDUpIHtcbiAgICAgICAgICAgIC8vIDUgYml0cyBnaXZlcyB1cyBhIGNoYXJhY3RlcjogYXBwZW5kIGl0IGFuZCBzdGFydCBvdmVyXG4gICAgICAgICAgICBnZW9oYXNoICs9IEdlb2hhc2guYmFzZTMyLmNoYXJBdChpZHgpO1xuICAgICAgICAgICAgYml0ID0gMDtcbiAgICAgICAgICAgIGlkeCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZ2VvaGFzaDtcbn07XG5cblxuLyoqXG4gKiBEZWNvZGUgZ2VvaGFzaCB0byBsYXRpdHVkZS9sb25naXR1ZGUgKGxvY2F0aW9uIGlzIGFwcHJveGltYXRlIGNlbnRyZSBvZiBnZW9oYXNoIGNlbGwsXG4gKiAgICAgdG8gcmVhc29uYWJsZSBwcmVjaXNpb24pLlxuICpcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IGdlb2hhc2ggLSBHZW9oYXNoIHN0cmluZyB0byBiZSBjb252ZXJ0ZWQgdG8gbGF0aXR1ZGUvbG9uZ2l0dWRlLlxuICogQHJldHVybnMge3tsYXQ6bnVtYmVyLCBsb246bnVtYmVyfX0gKENlbnRlciBvZikgZ2VvaGFzaGVkIGxvY2F0aW9uLlxuICogQHRocm93cyAgSW52YWxpZCBnZW9oYXNoLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgICAgdmFyIGxhdGxvbiA9IEdlb2hhc2guZGVjb2RlKCd1MTIwZnh3Jyk7IC8vIGxhdGxvbjogeyBsYXQ6IDUyLjIwNSwgbG9uOiAwLjExODggfVxuICovXG5HZW9oYXNoLmRlY29kZSA9IGZ1bmN0aW9uKGdlb2hhc2gpIHtcblxuICAgIHZhciBib3VuZHMgPSBHZW9oYXNoLmJvdW5kcyhnZW9oYXNoKTsgLy8gPC0tIHRoZSBoYXJkIHdvcmtcbiAgICAvLyBub3cganVzdCBkZXRlcm1pbmUgdGhlIGNlbnRyZSBvZiB0aGUgY2VsbC4uLlxuXG4gICAgdmFyIGxhdE1pbiA9IGJvdW5kcy5zdy5sYXQsIGxvbk1pbiA9IGJvdW5kcy5zdy5sb247XG4gICAgdmFyIGxhdE1heCA9IGJvdW5kcy5uZS5sYXQsIGxvbk1heCA9IGJvdW5kcy5uZS5sb247XG5cbiAgICAvLyBjZWxsIGNlbnRyZVxuICAgIHZhciBsYXQgPSAobGF0TWluICsgbGF0TWF4KS8yO1xuICAgIHZhciBsb24gPSAobG9uTWluICsgbG9uTWF4KS8yO1xuXG4gICAgLy8gcm91bmQgdG8gY2xvc2UgdG8gY2VudHJlIHdpdGhvdXQgZXhjZXNzaXZlIHByZWNpc2lvbjog4oyKMi1sb2cxMCjOlMKwKeKMiyBkZWNpbWFsIHBsYWNlc1xuICAgIGxhdCA9IGxhdC50b0ZpeGVkKE1hdGguZmxvb3IoMi1NYXRoLmxvZyhsYXRNYXgtbGF0TWluKS9NYXRoLkxOMTApKTtcbiAgICBsb24gPSBsb24udG9GaXhlZChNYXRoLmZsb29yKDItTWF0aC5sb2cobG9uTWF4LWxvbk1pbikvTWF0aC5MTjEwKSk7XG5cbiAgICByZXR1cm4geyBsYXQ6IE51bWJlcihsYXQpLCBsb246IE51bWJlcihsb24pIH07XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyBTVy9ORSBsYXRpdHVkZS9sb25naXR1ZGUgYm91bmRzIG9mIHNwZWNpZmllZCBnZW9oYXNoLlxuICpcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IGdlb2hhc2ggLSBDZWxsIHRoYXQgYm91bmRzIGFyZSByZXF1aXJlZCBvZi5cbiAqIEByZXR1cm5zIHt7c3c6IHtsYXQ6IG51bWJlciwgbG9uOiBudW1iZXJ9LCBuZToge2xhdDogbnVtYmVyLCBsb246IG51bWJlcn19fVxuICogQHRocm93cyAgSW52YWxpZCBnZW9oYXNoLlxuICovXG5HZW9oYXNoLmJvdW5kcyA9IGZ1bmN0aW9uKGdlb2hhc2gpIHtcbiAgICBpZiAoZ2VvaGFzaC5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBnZW9oYXNoJyk7XG5cbiAgICBnZW9oYXNoID0gZ2VvaGFzaC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgdmFyIGV2ZW5CaXQgPSB0cnVlO1xuICAgIHZhciBsYXRNaW4gPSAgLTkwLCBsYXRNYXggPSAgOTA7XG4gICAgdmFyIGxvbk1pbiA9IC0xODAsIGxvbk1heCA9IDE4MDtcblxuICAgIGZvciAodmFyIGk9MDsgaTxnZW9oYXNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaHIgPSBnZW9oYXNoLmNoYXJBdChpKTtcbiAgICAgICAgdmFyIGlkeCA9IEdlb2hhc2guYmFzZTMyLmluZGV4T2YoY2hyKTtcbiAgICAgICAgaWYgKGlkeCA9PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGdlb2hhc2gnKTtcblxuICAgICAgICBmb3IgKHZhciBuPTQ7IG4+PTA7IG4tLSkge1xuICAgICAgICAgICAgdmFyIGJpdE4gPSBpZHggPj4gbiAmIDE7XG4gICAgICAgICAgICBpZiAoZXZlbkJpdCkge1xuICAgICAgICAgICAgICAgIC8vIGxvbmdpdHVkZVxuICAgICAgICAgICAgICAgIHZhciBsb25NaWQgPSAobG9uTWluK2xvbk1heCkgLyAyO1xuICAgICAgICAgICAgICAgIGlmIChiaXROID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9uTWluID0gbG9uTWlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvbk1heCA9IGxvbk1pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGxhdGl0dWRlXG4gICAgICAgICAgICAgICAgdmFyIGxhdE1pZCA9IChsYXRNaW4rbGF0TWF4KSAvIDI7XG4gICAgICAgICAgICAgICAgaWYgKGJpdE4gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBsYXRNaW4gPSBsYXRNaWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGF0TWF4ID0gbGF0TWlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW5CaXQgPSAhZXZlbkJpdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBib3VuZHMgPSB7XG4gICAgICAgIHN3OiB7IGxhdDogbGF0TWluLCBsb246IGxvbk1pbiB9LFxuICAgICAgICBuZTogeyBsYXQ6IGxhdE1heCwgbG9uOiBsb25NYXggfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGFkamFjZW50IGNlbGwgaW4gZ2l2ZW4gZGlyZWN0aW9uLlxuICpcbiAqIEBwYXJhbSAgIGdlb2hhc2ggLSBDZWxsIHRvIHdoaWNoIGFkamFjZW50IGNlbGwgaXMgcmVxdWlyZWQuXG4gKiBAcGFyYW0gICBkaXJlY3Rpb24gLSBEaXJlY3Rpb24gZnJvbSBnZW9oYXNoIChOL1MvRS9XKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEdlb2NvZGUgb2YgYWRqYWNlbnQgY2VsbC5cbiAqIEB0aHJvd3MgIEludmFsaWQgZ2VvaGFzaC5cbiAqL1xuR2VvaGFzaC5hZGphY2VudCA9IGZ1bmN0aW9uKGdlb2hhc2gsIGRpcmVjdGlvbikge1xuICAgIC8vIGJhc2VkIG9uIGdpdGh1Yi5jb20vZGF2ZXRyb3kvZ2VvaGFzaC1qc1xuXG4gICAgZ2VvaGFzaCA9IGdlb2hhc2gudG9Mb3dlckNhc2UoKTtcbiAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24udG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChnZW9oYXNoLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGdlb2hhc2gnKTtcbiAgICBpZiAoJ25zZXcnLmluZGV4T2YoZGlyZWN0aW9uKSA9PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRpcmVjdGlvbicpO1xuXG4gICAgdmFyIG5laWdoYm91ciA9IHtcbiAgICAgICAgbjogWyAncDByMjE0MzZ4OHpiOWRjZjVoN2tqbm1xZXNndXR3dnknLCAnYmMwMWZnNDUyMzg5NjdkZXV2aGp5em5wa21zdHFyd3gnIF0sXG4gICAgICAgIHM6IFsgJzE0MzY1aDdrOWRjZmVzZ3Vqbm1xcDByMnR3dnl4OHpiJywgJzIzODk2N2RlYmMwMWZnNDVrbXN0cXJ3eHV2aGp5em5wJyBdLFxuICAgICAgICBlOiBbICdiYzAxZmc0NTIzODk2N2RldXZoanl6bnBrbXN0cXJ3eCcsICdwMHIyMTQzNng4emI5ZGNmNWg3a2pubXFlc2d1dHd2eScgXSxcbiAgICAgICAgdzogWyAnMjM4OTY3ZGViYzAxZmc0NWttc3Rxcnd4dXZoanl6bnAnLCAnMTQzNjVoN2s5ZGNmZXNndWpubXFwMHIydHd2eXg4emInIF0sXG4gICAgfTtcbiAgICB2YXIgYm9yZGVyID0ge1xuICAgICAgICBuOiBbICdwcnh6JywgICAgICdiY2ZndXZ5eicgXSxcbiAgICAgICAgczogWyAnMDI4YicsICAgICAnMDE0NWhqbnAnIF0sXG4gICAgICAgIGU6IFsgJ2JjZmd1dnl6JywgJ3ByeHonICAgICBdLFxuICAgICAgICB3OiBbICcwMTQ1aGpucCcsICcwMjhiJyAgICAgXSxcbiAgICB9O1xuXG4gICAgdmFyIGxhc3RDaCA9IGdlb2hhc2guc2xpY2UoLTEpOyAgICAvLyBsYXN0IGNoYXJhY3RlciBvZiBoYXNoXG4gICAgdmFyIHBhcmVudCA9IGdlb2hhc2guc2xpY2UoMCwgLTEpOyAvLyBoYXNoIHdpdGhvdXQgbGFzdCBjaGFyYWN0ZXJcblxuICAgIHZhciB0eXBlID0gZ2VvaGFzaC5sZW5ndGggJSAyO1xuXG4gICAgLy8gY2hlY2sgZm9yIGVkZ2UtY2FzZXMgd2hpY2ggZG9uJ3Qgc2hhcmUgY29tbW9uIHByZWZpeFxuICAgIGlmIChib3JkZXJbZGlyZWN0aW9uXVt0eXBlXS5pbmRleE9mKGxhc3RDaCkgIT0gLTEgJiYgcGFyZW50ICE9PSAnJykge1xuICAgICAgICBwYXJlbnQgPSBHZW9oYXNoLmFkamFjZW50KHBhcmVudCwgZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgbGV0dGVyIGZvciBkaXJlY3Rpb24gdG8gcGFyZW50XG4gICAgcmV0dXJuIHBhcmVudCArIEdlb2hhc2guYmFzZTMyLmNoYXJBdChuZWlnaGJvdXJbZGlyZWN0aW9uXVt0eXBlXS5pbmRleE9mKGxhc3RDaCkpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgYWxsIDggYWRqYWNlbnQgY2VsbHMgdG8gc3BlY2lmaWVkIGdlb2hhc2guXG4gKlxuICogQHBhcmFtICAge3N0cmluZ30gZ2VvaGFzaCAtIEdlb2hhc2ggbmVpZ2hib3VycyBhcmUgcmVxdWlyZWQgb2YuXG4gKiBAcmV0dXJucyB7e24sbmUsZSxzZSxzLHN3LHcsbnc6IHN0cmluZ319XG4gKiBAdGhyb3dzICBJbnZhbGlkIGdlb2hhc2guXG4gKi9cbkdlb2hhc2gubmVpZ2hib3VycyA9IGZ1bmN0aW9uKGdlb2hhc2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAnbic6ICBHZW9oYXNoLmFkamFjZW50KGdlb2hhc2gsICduJyksXG4gICAgICAgICduZSc6IEdlb2hhc2guYWRqYWNlbnQoR2VvaGFzaC5hZGphY2VudChnZW9oYXNoLCAnbicpLCAnZScpLFxuICAgICAgICAnZSc6ICBHZW9oYXNoLmFkamFjZW50KGdlb2hhc2gsICdlJyksXG4gICAgICAgICdzZSc6IEdlb2hhc2guYWRqYWNlbnQoR2VvaGFzaC5hZGphY2VudChnZW9oYXNoLCAncycpLCAnZScpLFxuICAgICAgICAncyc6ICBHZW9oYXNoLmFkamFjZW50KGdlb2hhc2gsICdzJyksXG4gICAgICAgICdzdyc6IEdlb2hhc2guYWRqYWNlbnQoR2VvaGFzaC5hZGphY2VudChnZW9oYXNoLCAncycpLCAndycpLFxuICAgICAgICAndyc6ICBHZW9oYXNoLmFkamFjZW50KGdlb2hhc2gsICd3JyksXG4gICAgICAgICdudyc6IEdlb2hhc2guYWRqYWNlbnQoR2VvaGFzaC5hZGphY2VudChnZW9oYXNoLCAnbicpLCAndycpLFxuICAgIH07XG59O1xuXG5cbi8qIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAgKi9cbmlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IEdlb2hhc2g7IC8vIENvbW1vbkpTLCBub2RlLmpzXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9