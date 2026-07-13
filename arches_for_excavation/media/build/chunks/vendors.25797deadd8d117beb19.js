(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[13729],{

/***/ 13729:
/*!**********************************************************!*\
  !*** ./node_modules/nouislider/distribute/nouislider.js ***!
  \**********************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! nouislider - 11.0.3 - 2018-01-21 14:04:07 */

(function (factory) {

    if ( true ) {

        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    } else // removed by dead control flow
{}

}(function( ){

	'use strict';

	var VERSION = '11.0.3';


	function isValidFormatter ( entry ) {
		return typeof entry === 'object' && typeof entry.to === 'function' && typeof entry.from === 'function';
	}

	function removeElement ( el ) {
		el.parentElement.removeChild(el);
	}

	// Bindable version
	function preventDefault ( e ) {
		e.preventDefault();
	}

	// Removes duplicates from an array.
	function unique ( array ) {
		return array.filter(function(a){
			return !this[a] ? this[a] = true : false;
		}, {});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Current position of an element relative to the document.
	function offset ( elem, orientation ) {

		var rect = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var docElem = doc.documentElement;
		var pageOffset = getPageOffset(doc);

		// getBoundingClientRect contains left scroll in Chrome on Android.
		// I haven't found a feature detection that proves this. Worst case
		// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
		if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
			pageOffset.x = 0;
		}

		return orientation ? (rect.top + pageOffset.y - docElem.clientTop) : (rect.left + pageOffset.x - docElem.clientLeft);
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		if (duration > 0) {
		addClass(element, className);
			setTimeout(function(){
				removeClass(element, className);
			}, duration);
		}
	}

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Wraps a variable as an array, if it isn't one yet.
	// Note that an input array is returned by reference!
	function asArray ( a ) {
		return Array.isArray(a) ? a : [a];
	}

	// Counts decimals
	function countDecimals ( numStr ) {
		numStr = String(numStr);
		var pieces = numStr.split(".");
		return pieces.length > 1 ? pieces[1].length : 0;
	}

	// http://youmightnotneedjquery.com/#add_class
	function addClass ( el, className ) {
		if ( el.classList ) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	// http://youmightnotneedjquery.com/#remove_class
	function removeClass ( el, className ) {
		if ( el.classList ) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
	function hasClass ( el, className ) {
		return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
	function getPageOffset ( doc ) {

		var supportPageOffset = window.pageXOffset !== undefined;
		var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
		var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
		var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;

		return {
			x: x,
			y: y
		};
	}

	// we provide a function to compute constants instead
	// of accessing window.* as soon as the module needs it
	// so that we do not compute anything if not needed
	function getActions ( ) {

		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		return window.navigator.pointerEnabled ? {
			start: 'pointerdown',
			move: 'pointermove',
			end: 'pointerup'
		} : window.navigator.msPointerEnabled ? {
			start: 'MSPointerDown',
			move: 'MSPointerMove',
			end: 'MSPointerUp'
		} : {
			start: 'mousedown touchstart',
			move: 'mousemove touchmove',
			end: 'mouseup touchend'
		};
	}

	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// Issue #785
	function getSupportsPassive ( ) {

		var supportsPassive = false;

		try {

			var opts = Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassive = true;
				}
			});

			window.addEventListener('test', null, opts);

		} catch (e) {}

		return supportsPassive;
	}

	function getSupportsTouchActionNone ( ) {
		return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
	}


// Value calculation

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	function getJ ( value, arr ) {

		var j = 1;

		while ( value >= arr[j] ){
			j += 1;
		}

		return j;
	}

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) {

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = getJ( value, xVal );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = getJ( value, xPct );
		var va = xVal[j-1];
		var vb = xVal[j];
		var pa = xPct[j-1];
		var pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, value ) {

		if ( value === 100 ) {
			return value;
		}

		var j = getJ( value, xPct );
		var a = xPct[j-1];
		var b = xPct[j];

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( !Array.isArray(value) ){
			throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
		}

		// Covert min/max syntax to 0 and 100.
		if ( index === 'min' ) {
			percentage = 0;
		} else if ( index === 'max' ) {
			percentage = 100;
		} else {
			percentage = parseFloat( index );
		}

		// Check for correct input.
		if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
		}

		// Store values.
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}

		that.xHighestCompleteStep.push(0);
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i+1]], n) / subRangeRatio(that.xPct[i], that.xPct[i+1]);

		var totalSteps = (that.xVal[i+1] - that.xVal[i]) / that.xNumSteps[i];
		var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
		var step = that.xVal[i] + (that.xNumSteps[i] * highestStep);

		that.xHighestCompleteStep[i] = step;
	}


// Interface

	function Spectrum ( entry, snap, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];
		this.xHighestCompleteStep = [];

		this.snap = snap;

		var index;
		var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

		// Map the object keys to an array.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				ordered.push([entry[index], index]);
			}
		}

		// Sort all entries by value (numeric sort).
		if ( ordered.length && typeof ordered[0][0] === "object" ) {
			ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
		} else {
			ordered.sort(function(a, b) { return a[0] - b[0]; });
		}


		// Convert all entries to subranges.
		for ( index = 0; index < ordered.length; index++ ) {
			handleEntryPoint(ordered[index][1], ordered[index][0], this);
		}

		// Store the actual step values.
		// xSteps is sorted in the same order as xPct and xVal.
		this.xNumSteps = this.xSteps.slice(0);

		// Convert all numeric steps to the percentage of the subrange they represent.
		for ( index = 0; index < this.xNumSteps.length; index++ ) {
			handleStepPoint(index, this.xNumSteps[index], this);
		}
	}

	Spectrum.prototype.getMargin = function ( value ) {

		var step = this.xNumSteps[0];

		if ( step && ((value / step) % 1) !== 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
		}

		return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
	};

	Spectrum.prototype.toStepping = function ( value ) {

		value = toStepping( this.xVal, this.xPct, value );

		return value;
	};

	Spectrum.prototype.fromStepping = function ( value ) {

		return fromStepping( this.xVal, this.xPct, value );
	};

	Spectrum.prototype.getStep = function ( value ) {

		value = getStep(this.xPct, this.xSteps, this.snap, value );

		return value;
	};

	Spectrum.prototype.getNearbySteps = function ( value ) {

		var j = getJ(value, this.xPct);

		return {
			stepBefore: { startValue: this.xVal[j-2], step: this.xNumSteps[j-2], highestStep: this.xHighestCompleteStep[j-2] },
			thisStep: { startValue: this.xVal[j-1], step: this.xNumSteps[j-1], highestStep: this.xHighestCompleteStep[j-1] },
			stepAfter: { startValue: this.xVal[j-0], step: this.xNumSteps[j-0], highestStep: this.xHighestCompleteStep[j-0] }
		};
	};

	Spectrum.prototype.countStepDecimals = function () {
		var stepDecimals = this.xNumSteps.map(countDecimals);
		return Math.max.apply(null, stepDecimals);
	};

	// Outside testing
	Spectrum.prototype.convert = function ( value ) {
		return this.getStep(this.toStepping(value));
	};

/*	Every input option is tested and parsed. This'll prevent
	endless validation in internal methods. These tests are
	structured with an item for every option available. An
	option can be marked as required by setting the 'r' flag.
	The testing function is provided with three arguments:
		- The provided value for the option;
		- A reference to the options object;
		- The name for the option;

	The testing function returns false when an error is detected,
	or true when everything is OK. It can also modify the option
	object, to make sure all values can be correctly looped elsewhere. */

	var defaultFormatter = { 'to': function( value ){
		return value !== undefined && value.toFixed(2);
	}, 'from': Number };

	function validateFormat ( entry ) {

		// Any object with a to and from method is supported.
		if ( isValidFormatter(entry) ) {
			return true;
		}

		throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
	}

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.singleStep = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || Array.isArray(entry) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry.min === undefined || entry.max === undefined ) {
			throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
		}

		// Catch equal start or end.
		if ( entry.min === entry.max ) {
			throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
		}

		parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !Array.isArray( entry ) || !entry.length ) {
			throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
		}
	}

	function testAnimate ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.animate = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
		}
	}

	function testAnimationDuration ( parsed, entry ) {

		parsed.animationDuration = entry;

		if ( typeof entry !== 'number' ){
			throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
		}
	}

	function testConnect ( parsed, entry ) {

		var connect = [false];
		var i;

		// Map legacy options
		if ( entry === 'lower' ) {
			entry = [true, false];
		}

		else if ( entry === 'upper' ) {
			entry = [false, true];
		}

		// Handle boolean options
		if ( entry === true || entry === false ) {

			for ( i = 1; i < parsed.handles; i++ ) {
				connect.push(entry);
			}

			connect.push(false);
		}

		// Reject invalid input
		else if ( !Array.isArray( entry ) || !entry.length || entry.length !== parsed.handles + 1 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
		}

		else {
			connect = entry;
		}

		parsed.connect = connect;
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
			case 'horizontal':
				parsed.ort = 0;
				break;
			case 'vertical':
				parsed.ort = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
		}

		// Issue #582
		if ( entry === 0 ) {
			return;
		}

		parsed.margin = parsed.spectrum.getMargin(entry);

		if ( !parsed.margin ) {
			throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
		}
	}

	function testLimit ( parsed, entry ) {

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
		}

		parsed.limit = parsed.spectrum.getMargin(entry);

		if ( !parsed.limit || parsed.handles < 2 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
		}
	}

	function testPadding ( parsed, entry ) {

		if ( !isNumeric(entry) && !Array.isArray(entry) ){
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1])) ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers.");
		}

		if ( entry === 0 ) {
			return;
		}

		if ( !Array.isArray(entry) ) {
			entry = [entry, entry];
		}

		// 'getMargin' returns false for invalid values.
		parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

		if ( parsed.padding[0] === false || parsed.padding[1] === false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
		}

		if ( parsed.padding[0] < 0 || parsed.padding[1] < 0 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
		}

		if ( parsed.padding[0] >= 50 || parsed.padding[1] >= 50 ) {
			throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be less than half the range.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
			case 'ltr':
				parsed.dir = 0;
				break;
			case 'rtl':
				parsed.dir = 1;
				break;
			default:
				throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0;
		var drag = entry.indexOf('drag') >= 0;
		var fixed = entry.indexOf('fixed') >= 0;
		var snap = entry.indexOf('snap') >= 0;
		var hover = entry.indexOf('hover') >= 0;

		if ( fixed ) {

			if ( parsed.handles !== 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
			}

			// Use margin to enforce fixed state
			testMargin(parsed, parsed.start[1] - parsed.start[0]);
		}

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap,
			hover: hover
		};
	}

	function testTooltips ( parsed, entry ) {

		if ( entry === false ) {
			return;
		}

		else if ( entry === true ) {

			parsed.tooltips = [];

			for ( var i = 0; i < parsed.handles; i++ ) {
				parsed.tooltips.push(true);
			}
		}

		else {

			parsed.tooltips = asArray(entry);

			if ( parsed.tooltips.length !== parsed.handles ) {
				throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
			}

			parsed.tooltips.forEach(function(formatter){
				if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
					throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
				}
			});
		}
	}

	function testAriaFormat ( parsed, entry ) {
		parsed.ariaFormat = entry;
		validateFormat(entry);
	}

	function testFormat ( parsed, entry ) {
		parsed.format = entry;
		validateFormat(entry);
	}

	function testCssPrefix ( parsed, entry ) {

		if ( entry !== undefined && typeof entry !== 'string' && entry !== false ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
		}

		parsed.cssPrefix = entry;
	}

	function testCssClasses ( parsed, entry ) {

		if ( entry !== undefined && typeof entry !== 'object' ) {
			throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
		}

		if ( typeof parsed.cssPrefix === 'string' ) {
			parsed.cssClasses = {};

			for ( var key in entry ) {
				if ( !entry.hasOwnProperty(key) ) { continue; }

				parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
			}
		} else {
			parsed.cssClasses = entry;
		}
	}

	// Test all developer settings and parse to assumption-safe values.
	function testOptions ( options ) {

		// To prove a fix for #537, freeze options here.
		// If the object is modified, an error will be thrown.
		// Object.freeze(options);

		var parsed = {
			margin: 0,
			limit: 0,
			padding: 0,
			animate: true,
			animationDuration: 300,
			ariaFormat: defaultFormatter,
			format: defaultFormatter
		};

		// Tests are executed in the order they are presented here.
		var tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'snap': { r: false, t: testSnap },
			'animate': { r: false, t: testAnimate },
			'animationDuration': { r: false, t: testAnimationDuration },
			'range': { r: true, t: testRange },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'limit': { r: false, t: testLimit },
			'padding': { r: false, t: testPadding },
			'behaviour': { r: true, t: testBehaviour },
			'ariaFormat': { r: false, t: testAriaFormat },
			'format': { r: false, t: testFormat },
			'tooltips': { r: false, t: testTooltips },
			'cssPrefix': { r: false, t: testCssPrefix },
			'cssClasses': { r: false, t: testCssClasses }
		};

		var defaults = {
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal',
			'cssPrefix' : 'noUi-',
			'cssClasses': {
				target: 'target',
				base: 'base',
				origin: 'origin',
				handle: 'handle',
				handleLower: 'handle-lower',
				handleUpper: 'handle-upper',
				horizontal: 'horizontal',
				vertical: 'vertical',
				background: 'background',
				connect: 'connect',
				connects: 'connects',
				ltr: 'ltr',
				rtl: 'rtl',
				draggable: 'draggable',
				drag: 'state-drag',
				tap: 'state-tap',
				active: 'active',
				tooltip: 'tooltip',
				pips: 'pips',
				pipsHorizontal: 'pips-horizontal',
				pipsVertical: 'pips-vertical',
				marker: 'marker',
				markerHorizontal: 'marker-horizontal',
				markerVertical: 'marker-vertical',
				markerNormal: 'marker-normal',
				markerLarge: 'marker-large',
				markerSub: 'marker-sub',
				value: 'value',
				valueHorizontal: 'value-horizontal',
				valueVertical: 'value-vertical',
				valueNormal: 'value-normal',
				valueLarge: 'value-large',
				valueSub: 'value-sub'
			}
		};

		// AriaFormat defaults to regular format, if any.
		if ( options.format && !options.ariaFormat ) {
			options.ariaFormat = options.format;
		}

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		Object.keys(tests).forEach(function( name ){

			// If the option isn't set, but it is required, throw an error.
			if ( options[name] === undefined && defaults[name] === undefined ) {

				if ( tests[name].r ) {
					throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
				}

				return true;
			}

			tests[name].t( parsed, options[name] === undefined ? defaults[name] : options[name] );
		});

		// Forward pips options
		parsed.pips = options.pips;

		// All recent browsers accept unprefixed transform.
		// We need -ms- for IE9 and -webkit- for older Android;
		// Assume use of -webkit- if unprefixed and -ms- are not supported.
		// https://caniuse.com/#feat=transforms2d
		var d = document.createElement("div");
		var msPrefix = d.style.msTransform !== undefined;
		var noPrefix = d.style.transform !== undefined;

		parsed.transformRule = noPrefix ? 'transform' : (msPrefix ? 'msTransform' : 'webkitTransform');

		// Pips don't move, so we can place them using left/top.
		var styles = [['left', 'top'], ['right', 'bottom']];

		parsed.style = styles[parsed.dir][parsed.ort];

		return parsed;
	}


function scope ( target, options, originalOptions ){

	var actions = getActions();
	var supportsTouchActionNone = getSupportsTouchActionNone();
	var supportsPassive = supportsTouchActionNone && getSupportsPassive();

	// All variables local to 'scope' are prefixed with 'scope_'
	var scope_Target = target;
	var scope_Locations = [];
	var scope_Base;
	var scope_Handles;
	var scope_HandleNumbers = [];
	var scope_ActiveHandlesCount = 0;
	var scope_Connects;
	var scope_Spectrum = options.spectrum;
	var scope_Values = [];
	var scope_Events = {};
	var scope_Self;
	var scope_Pips;
	var scope_Document = target.ownerDocument;
	var scope_DocumentElement = scope_Document.documentElement;
	var scope_Body = scope_Document.body;


	// For horizontal sliders in standard ltr documents,
	// make .noUi-origin overflow to the left so the document doesn't scroll.
	var scope_DirOffset = (scope_Document.dir === 'rtl') || (options.ort === 1) ? 0 : 100;

/*! In this file: Construction of DOM elements; */

	// Creates a node, adds it to target, returns the new node.
	function addNodeTo ( addTarget, className ) {

		var div = scope_Document.createElement('div');

		if ( className ) {
			addClass(div, className);
		}

		addTarget.appendChild(div);

		return div;
	}

	// Append a origin to the base
	function addOrigin ( base, handleNumber ) {

		var origin = addNodeTo(base, options.cssClasses.origin);
		var handle = addNodeTo(origin, options.cssClasses.handle);

		handle.setAttribute('data-handle', handleNumber);

		// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
		// 0 = focusable and reachable
		handle.setAttribute('tabindex', '0');
		handle.setAttribute('role', 'slider');
		handle.setAttribute('aria-orientation', options.ort ? 'vertical' : 'horizontal');

		if ( handleNumber === 0 ) {
			addClass(handle, options.cssClasses.handleLower);
		}

		else if ( handleNumber === options.handles - 1 ) {
			addClass(handle, options.cssClasses.handleUpper);
		}

		return origin;
	}

	// Insert nodes for connect elements
	function addConnect ( base, add ) {

		if ( !add ) {
			return false;
		}

		return addNodeTo(base, options.cssClasses.connect);
	}

	// Add handles to the slider base.
	function addElements ( connectOptions, base ) {

		var connectBase = addNodeTo(base, options.cssClasses.connects);

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(connectBase, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( var i = 0; i < options.handles; i++ ) {
			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base, i));
			scope_HandleNumbers[i] = i;
			scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
		}
	}

	// Initialize a single slider.
	function addSlider ( addTarget ) {

		// Apply classes and data to the target.
		addClass(addTarget, options.cssClasses.target);

		if ( options.dir === 0 ) {
			addClass(addTarget, options.cssClasses.ltr);
		} else {
			addClass(addTarget, options.cssClasses.rtl);
		}

		if ( options.ort === 0 ) {
			addClass(addTarget, options.cssClasses.horizontal);
		} else {
			addClass(addTarget, options.cssClasses.vertical);
		}

		scope_Base = addNodeTo(addTarget, options.cssClasses.base);
	}


	function addTooltip ( handle, handleNumber ) {

		if ( !options.tooltips[handleNumber] ) {
			return false;
		}

		return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		// Tooltips are added with options.tooltips in original order.
		var tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(values, handleNumber, unencoded) {

			if ( !tips[handleNumber] ) {
				return;
			}

			var formattedValue = values[handleNumber];

			if ( options.tooltips[handleNumber] !== true ) {
				formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
			}

			tips[handleNumber].innerHTML = formattedValue;
		});
	}


	function aria ( ) {

		bindEvent('update', function ( values, handleNumber, unencoded, tap, positions ) {

			// Update Aria Values for all handles, as a change in one changes min and max values for the next.
			scope_HandleNumbers.forEach(function( index ){

				var handle = scope_Handles[index];

				var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
				var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

				var now = positions[index];
				var text = options.ariaFormat.to(unencoded[index]);

				handle.children[0].setAttribute('aria-valuemin', min.toFixed(1));
				handle.children[0].setAttribute('aria-valuemax', max.toFixed(1));
				handle.children[0].setAttribute('aria-valuenow', now.toFixed(1));
				handle.children[0].setAttribute('aria-valuetext', text);
			});
		});
	}


	function getGroup ( mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return scope_Spectrum.xVal;
		}

		if ( mode === 'count' ) {

			if ( values < 2 ) {
				throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
			}

			// Divide 0 - 100 in 'count' parts.
			var interval = values - 1;
			var spread = ( 100 / interval );

			values = [];

			// List these parts and have them handled as 'positions'.
			while ( interval-- ) {
				values[ interval ] = ( interval * spread );
			}

			values.push(100);

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return values.map(function( value ){
				return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return values.map(function( value ){

					// Convert to percentage, apply step, return to value.
					return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( density, mode, group ) {

		function safeIncrement(value, increment) {
			// Avoid floating point variance by dropping the smallest decimal places.
			return (value + increment).toFixed(7) / 1;
		}

		var indexes = {};
		var firstInRange = scope_Spectrum.xVal[0];
		var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];
		var ignoreFirst = false;
		var ignoreLast = false;
		var prevPct = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		group.forEach(function ( current, index ) {

			// Get the current step and the lower + upper positions.
			var step;
			var i;
			var q;
			var low = current;
			var high = group[index+1];
			var newPct;
			var pctDifference;
			var pctPos;
			var type;
			var steps;
			var realSteps;
			var stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = scope_Spectrum.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Make sure step isn't 0, which would cause an infinite loop (#654)
			step = Math.max(step, 0.0000001);

			// Find all steps in the subrange.
			for ( i = low; i <= high; i = safeIncrement(i, step) ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = scope_Spectrum.toStepping( i );
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the amount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0];
				}

				// Determine the point type.
				type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		return indexes;
	}

	function addMarking ( spread, filterFunc, formatter ) {

		var element = scope_Document.createElement('div');

		var valueSizeClasses = [
			options.cssClasses.valueNormal,
			options.cssClasses.valueLarge,
			options.cssClasses.valueSub
		];
		var markerSizeClasses = [
			options.cssClasses.markerNormal,
			options.cssClasses.markerLarge,
			options.cssClasses.markerSub
		];
		var valueOrientationClasses = [
			options.cssClasses.valueHorizontal,
			options.cssClasses.valueVertical
		];
		var markerOrientationClasses = [
			options.cssClasses.markerHorizontal,
			options.cssClasses.markerVertical
		];

		addClass(element, options.cssClasses.pips);
		addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

		function getClasses( type, source ){
			var a = source === options.cssClasses.value;
			var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
			var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

			return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
		}

		function addSpread ( offset, values ){

			// Apply the filter function, if it is set.
			values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

			// Add a marker for every point
			var node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.marker);
				node.style[options.style] = offset + '%';

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				node = addNodeTo(element, false);
				node.className = getClasses(values[1], options.cssClasses.value);
				node.setAttribute('data-value', values[0]);
				node.style[options.style] = offset + '%';
				node.innerText = formatter.to(values[0]);
			}
		}

		// Append all points.
		Object.keys(spread).forEach(function(a){
			addSpread(a, spread[a]);
		});

		return element;
	}

	function removePips ( ) {
		if ( scope_Pips ) {
			removeElement(scope_Pips);
			scope_Pips = null;
		}
	}

	function pips ( grid ) {

		// Fix #669
		removePips();

		var mode = grid.mode;
		var density = grid.density || 1;
		var filter = grid.filter || false;
		var values = grid.values || false;
		var stepped = grid.stepped || false;
		var group = getGroup( mode, values, stepped );
		var spread = generateSpread( density, mode, group );
		var format = grid.format || {
			to: Math.round
		};

		scope_Pips = scope_Target.appendChild(addMarking(
			spread,
			filter,
			format
		));

		return scope_Pips;
	}

/*! In this file: Browser events (not slider events like slide, change); */

	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect();
		var alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// Handler for attaching events trough a proxy.
	function attachEvent ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.
		// element is a node, not a nodeList

		var method = function ( e ){

			e = fixEvent(e, data.pageOffset, data.target || element);

			// fixEvent returns false if this event has a different target
			// when handling (multi-) touch events;
			if ( !e ) {
				return false;
			}

			// doNotReject is passed by all end events to make sure released touches
			// are not rejected, leaving the slider "stuck" to the cursor;
			if ( scope_Target.hasAttribute('disabled') && !data.doNotReject ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
				return false;
			}

			// Ignore right or middle clicks on start #454
			if ( data.hover && e.buttons ) {
				return false;
			}

			// 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
			// iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
			// touch-action: manipulation, but that allows panning, which breaks
			// sliders after zooming/on non-responsive pages.
			// See: https://bugs.webkit.org/show_bug.cgi?id=133112
			if ( !supportsPassive ) {
				e.preventDefault();
			}

			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		};

		var methods = [];

		// Bind a closure on the target for every event type.
		events.split(' ').forEach(function( eventName ){
			element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
			methods.push([eventName, method]);
		});

		return methods;
	}

	// Provide a clean event with standardized offset values.
	function fixEvent ( e, pageOffset, eventTarget ) {

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var touch = e.type.indexOf('touch') === 0;
		var mouse = e.type.indexOf('mouse') === 0;
		var pointer = e.type.indexOf('pointer') === 0;

		var x;
		var y;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// In the event that multitouch is activated, the only thing one handle should be concerned
		// about is the touches that originated on top of it.
		if ( touch ) {

			// Returns true if a touch originated on the target.
			var isTouchOnTarget = function (checkTouch) {
				return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
			};

			// In the case of touchstart events, we need to make sure there is still no more than one
			// touch on the target so we look amongst all touches.
			if (e.type === 'touchstart') {

				var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

				// Do not support more than one touch per handle.
				if ( targetTouches.length > 1 ) {
					return false;
				}

				x = targetTouches[0].pageX;
				y = targetTouches[0].pageY;

			} else {

				// In the other cases, find on changedTouches is enough.
				var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

				// Cancel if the target touch has not moved.
				if ( !targetTouch ) {
					return false;
				}

				x = targetTouch.pageX;
				y = targetTouch.pageY;
			}
		}

		pageOffset = pageOffset || getPageOffset(scope_Document);

		if ( mouse || pointer ) {
			x = e.clientX + pageOffset.x;
			y = e.clientY + pageOffset.y;
		}

		e.pageOffset = pageOffset;
		e.points = [x, y];
		e.cursor = mouse || pointer; // Fix #435

		return e;
	}

	// Translate a coordinate in the document to a percentage on the slider
	function calcPointToPercentage ( calcPoint ) {
		var location = calcPoint - offset(scope_Base, options.ort);
		var proposal = ( location * 100 ) / baseSize();

		// Clamp proposal between 0% and 100%
		// Out-of-bound coordinates may occur when .noUi-base pseudo-elements
		// are used (e.g. contained handles feature)
		proposal = limit(proposal);

		return options.dir ? 100 - proposal : proposal;
	}

	// Find handle closest to a certain percentage on the slider
	function getClosestHandle ( proposal ) {

		var closest = 100;
		var handleNumber = false;

		scope_Handles.forEach(function(handle, index){

			// Disabled handles are ignored
			if ( handle.hasAttribute('disabled') ) {
				return;
			}

			var pos = Math.abs(scope_Locations[index] - proposal);

			if ( pos < closest || (pos === 100 && closest === 100) ) {
				handleNumber = index;
				closest = pos;
			}
		});

		return handleNumber;
	}

	// Fire 'end' when a mouse or pen leaves the document.
	function documentLeave ( event, data ) {
		if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
			eventEnd (event, data);
		}
	}

	// Handle movement on document for handle and range drag.
	function eventMove ( event, data ) {

		// Fix #498
		// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
		// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
		// IE9 has .buttons and .which zero on mousemove.
		// Firefox breaks the spec MDN defines.
		if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
			return eventEnd(event, data);
		}

		// Check if we are moving up or down
		var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

		// Convert the movement into a percentage of the slider width/height
		var proposal = (movement * 100) / data.baseSize;

		moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
	}

	// Unbind move events on document, call callbacks.
	function eventEnd ( event, data ) {

		// The handle is no longer active, so remove the class.
		if ( data.handle ) {
			removeClass(data.handle, options.cssClasses.active);
			scope_ActiveHandlesCount -= 1;
		}

		// Unbind the move and end events, which are added on 'start'.
		data.listeners.forEach(function( c ) {
			scope_DocumentElement.removeEventListener(c[0], c[1]);
		});

		if ( scope_ActiveHandlesCount === 0 ) {
			// Remove dragging class.
			removeClass(scope_Target, options.cssClasses.drag);
			setZindex();

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				scope_Body.style.cursor = '';
				scope_Body.removeEventListener('selectstart', preventDefault);
			}
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('change', handleNumber);
			fireEvent('set', handleNumber);
			fireEvent('end', handleNumber);
		});
	}

	// Bind move events on document.
	function eventStart ( event, data ) {

		var handle;
		if ( data.handleNumbers.length === 1 ) {

			var handleOrigin = scope_Handles[data.handleNumbers[0]];

			// Ignore 'disabled' handles
			if ( handleOrigin.hasAttribute('disabled') ) {
				return false;
			}

			handle = handleOrigin.children[0];
			scope_ActiveHandlesCount += 1;

			// Mark the handle as 'active' so it can be styled.
			addClass(handle, options.cssClasses.active);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Record the event listeners.
		var listeners = [];

		// Attach the move and end events.
		var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
			// The event target has changed so we need to propagate the original one so that we keep
			// relying on it to extract target touches.
			target: event.target,
			handle: handle,
			listeners: listeners,
			startCalcPoint: event.calcPoint,
			baseSize: baseSize(),
			pageOffset: event.pageOffset,
			handleNumbers: data.handleNumbers,
			buttonsProperty: event.buttons,
			locations: scope_Locations.slice()
		});

		var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
			target: event.target,
			handle: handle,
			listeners: listeners,
			doNotReject: true,
			handleNumbers: data.handleNumbers
		});

		// We want to make sure we pushed the listeners in the listener list rather than creating
		// a new one as it has already been passed to the event handlers.
		listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			scope_Body.style.cursor = getComputedStyle(event.target).cursor;

			// Mark the target with a dragging state.
			if ( scope_Handles.length > 1 ) {
				addClass(scope_Target, options.cssClasses.drag);
			}

			// Prevent text selection when dragging the handles.
			// In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
			// which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
			// meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
			// The 'cursor' flag is false.
			// See: http://caniuse.com/#search=selectstart
			scope_Body.addEventListener('selectstart', preventDefault, false);
		}

		data.handleNumbers.forEach(function(handleNumber){
			fireEvent('start', handleNumber);
		});
	}

	// Move closest handle to tapped location.
	function eventTap ( event ) {

		// The tap event shouldn't propagate up
		event.stopPropagation();

		var proposal = calcPointToPercentage(event.calcPoint);
		var handleNumber = getClosestHandle(proposal);

		// Tackle the case that all handles are 'disabled'.
		if ( handleNumber === false ) {
			return false;
		}

		// Flag the slider as it is now in a transitional state.
		// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
		if ( !options.events.snap ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		setHandle(handleNumber, proposal, true, true);

		setZindex();

		fireEvent('slide', handleNumber, true);
		fireEvent('update', handleNumber, true);
		fireEvent('change', handleNumber, true);
		fireEvent('set', handleNumber, true);

		if ( options.events.snap ) {
			eventStart(event, { handleNumbers: [handleNumber] });
		}
	}

	// Fires a 'hover' event for a hovered mouse/pen position.
	function eventHover ( event ) {

		var proposal = calcPointToPercentage(event.calcPoint);

		var to = scope_Spectrum.getStep(proposal);
		var value = scope_Spectrum.fromStepping(to);

		Object.keys(scope_Events).forEach(function( targetEvent ) {
			if ( 'hover' === targetEvent.split('.')[0] ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback.call( scope_Self, value );
				});
			}
		});
	}

	// Attach events to several slider parts.
	function bindSliderEvents ( behaviour ) {

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			scope_Handles.forEach(function( handle, index ){

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attachEvent ( actions.start, handle.children[0], eventStart, {
					handleNumbers: [index]
				});
			});
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attachEvent (actions.start, scope_Base, eventTap, {});
		}

		// Fire hover events
		if ( behaviour.hover ) {
			attachEvent (actions.move, scope_Base, eventHover, { hover: true });
		}

		// Make the range draggable.
		if ( behaviour.drag ){

			scope_Connects.forEach(function( connect, index ){

				if ( connect === false || index === 0 || index === scope_Connects.length - 1 ) {
					return;
				}

				var handleBefore = scope_Handles[index - 1];
				var handleAfter = scope_Handles[index];
				var eventHolders = [connect];

				addClass(connect, options.cssClasses.draggable);

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					eventHolders.push(handleBefore.children[0]);
					eventHolders.push(handleAfter.children[0]);
				}

				eventHolders.forEach(function( eventHolder ) {
					attachEvent ( actions.start, eventHolder, eventStart, {
						handles: [handleBefore, handleAfter],
						handleNumbers: [index - 1, index]
					});
				});
			});
		}
	}

/*! In this file: Slider events (not browser events); */

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent && namespacedEvent.split('.')[0];
		var namespace = event && namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0];
			var tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// External event handling
	function fireEvent ( eventName, handleNumber, tap ) {

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( eventName === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						scope_Values.map(options.format.to),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						scope_Values.slice(),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations.slice()
					);
				});
			}
		});
	}

/*! In this file: Mechanics for slider operation */

	function toPct ( pct ) {
		return pct + '%';
	}

	// Split out the handle positioning logic so the Move event can use it, too
	function checkHandlePosition ( reference, handleNumber, to, lookBackward, lookForward, getValue ) {

		// For sliders with multiple handles, limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		if ( scope_Handles.length > 1 ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.max(to, reference[handleNumber - 1] + options.margin);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.min(to, reference[handleNumber + 1] - options.margin);
			}
		}

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable.
		if ( scope_Handles.length > 1 && options.limit ) {

			if ( lookBackward && handleNumber > 0 ) {
				to = Math.min(to, reference[handleNumber - 1] + options.limit);
			}

			if ( lookForward && handleNumber < scope_Handles.length - 1 ) {
				to = Math.max(to, reference[handleNumber + 1] - options.limit);
			}
		}

		// The padding option keeps the handles a certain distance from the
		// edges of the slider. Padding must be > 0.
		if ( options.padding ) {

			if ( handleNumber === 0 ) {
				to = Math.max(to, options.padding[0]);
			}

			if ( handleNumber === scope_Handles.length - 1 ) {
				to = Math.min(to, 100 - options.padding[1]);
			}
		}

		to = scope_Spectrum.getStep(to);

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === reference[handleNumber] && !getValue ) {
			return false;
		}

		return to;
	}

	// Uses slider orientation to create CSS rules. a = base value;
	function inRuleOrder ( v, a ) {
		var o = options.ort;
		return (o?a:v) + ', ' + (o?v:a);
	}

	// Moves handle(s) by a percentage
	// (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
	function moveHandles ( upward, proposal, locations, handleNumbers ) {

		var proposals = locations.slice();

		var b = [!upward, upward];
		var f = [upward, !upward];

		// Copy handleNumbers so we don't change the dataset
		handleNumbers = handleNumbers.slice();

		// Check to see which handle is 'leading'.
		// If that one can't move the second can't either.
		if ( upward ) {
			handleNumbers.reverse();
		}

		// Step 1: get the maximum percentage that any of the handles can move
		if ( handleNumbers.length > 1 ) {

			handleNumbers.forEach(function(handleNumber, o) {

				var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);

				// Stop if one of the handles can't move.
				if ( to === false ) {
					proposal = 0;
				} else {
					proposal = to - proposals[handleNumber];
					proposals[handleNumber] = to;
				}
			});
		}

		// If using one handle, check backward AND forward
		else {
			b = f = [true];
		}

		var state = false;

		// Step 2: Try to set the handles with the found percentage
		handleNumbers.forEach(function(handleNumber, o) {
			state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
		});

		// Step 3: If a handle moved, fire events
		if ( state ) {
			handleNumbers.forEach(function(handleNumber){
				fireEvent('update', handleNumber);
				fireEvent('slide', handleNumber);
			});
		}
	}

	// Takes a base value and an offset. This offset is used for the connect bar size.
	// In the initial design for this feature, the origin element was 1% wide.
	// Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
	// in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
	function transformDirection ( a, b ) {
		return options.dir ? 100 - a - b : a;
	}

	// Updates scope_Locations and scope_Values, updates visual state
	function updateHandlePosition ( handleNumber, to ) {

		// Update locations.
		scope_Locations[handleNumber] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

		var rule = 'translate(' + inRuleOrder(toPct(transformDirection(to, 0) - scope_DirOffset), '0') + ')';
		scope_Handles[handleNumber].style[options.transformRule] = rule;

		updateConnect(handleNumber);
		updateConnect(handleNumber + 1);
	}

	// Handles before the slider middle are stacked later = higher,
	// Handles after the middle later is lower
	// [[7] [8] .......... | .......... [5] [4]
	function setZindex ( ) {

		scope_HandleNumbers.forEach(function(handleNumber){
			var dir = (scope_Locations[handleNumber] > 50 ? -1 : 1);
			var zIndex = 3 + (scope_Handles.length + (dir * handleNumber));
			scope_Handles[handleNumber].style.zIndex = zIndex;
		});
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handleNumber, to, lookBackward, lookForward ) {

		to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

		if ( to === false ) {
			return false;
		}

		updateHandlePosition(handleNumber, to);

		return true;
	}

	// Updates style attribute for connect nodes
	function updateConnect ( index ) {

		// Skip connects set to false
		if ( !scope_Connects[index] ) {
			return;
		}

		var l = 0;
		var h = 100;

		if ( index !== 0 ) {
			l = scope_Locations[index - 1];
		}

		if ( index !== scope_Connects.length - 1 ) {
			h = scope_Locations[index];
		}

		// We use two rules:
		// 'translate' to change the left/top offset;
		// 'scale' to change the width of the element;
		// As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
		var connectWidth = h - l;
		var translateRule = 'translate(' + inRuleOrder(toPct(transformDirection(l, connectWidth)), '0') + ')';
		var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')';

		scope_Connects[index].style[options.transformRule] = translateRule + ' ' + scaleRule;
	}

/*! In this file: All methods eventually exposed in slider.noUiSlider... */

	// Parses value passed to .set method. Returns current value if not parse-able.
	function resolveToValue ( to, handleNumber ) {

		// Setting with null indicates an 'ignore'.
		// Inputting 'false' is invalid.
		if ( to === null || to === false || to === undefined ) {
			return scope_Locations[handleNumber];
		}

		// If a formatted number was passed, attempt to decode it.
		if ( typeof to === 'number' ) {
			to = String(to);
		}

		to = options.format.from(to);
		to = scope_Spectrum.toStepping(to);

		// If parsing the number failed, use the current value.
		if ( to === false || isNaN(to) ) {
			return scope_Locations[handleNumber];
		}

		return to;
	}

	// Set the slider value.
	function valueSet ( input, fireSetEvent ) {

		var values = asArray(input);
		var isInit = scope_Locations[0] === undefined;

		// Event fires by default
		fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

		// Animation is optional.
		// Make sure the initial values were set before using animated placement.
		if ( options.animate && !isInit ) {
			addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
		}

		// First pass, without lookAhead but with lookBackward. Values are set from left to right.
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
		});

		// Second pass. Now that all base values are set, apply constraints
		scope_HandleNumbers.forEach(function(handleNumber){
			setHandle(handleNumber, scope_Locations[handleNumber], true, true);
		});

		setZindex();

		scope_HandleNumbers.forEach(function(handleNumber){

			fireEvent('update', handleNumber);

			// Fire the event only for handles that received a new value, as per #579
			if ( values[handleNumber] !== null && fireSetEvent ) {
				fireEvent('set', handleNumber);
			}
		});
	}

	// Reset slider to initial values
	function valueReset ( fireSetEvent ) {
		valueSet(options.start, fireSetEvent);
	}

	// Get the slider value.
	function valueGet ( ) {

		var values = scope_Values.map(options.format.to);

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		return values;
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		for ( var key in options.cssClasses ) {
			if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
			removeClass(scope_Target, options.cssClasses[key]);
		}

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		return scope_Locations.map(function( location, index ){

			var nearbySteps = scope_Spectrum.getNearbySteps( location );
			var value = scope_Values[index];
			var increment = nearbySteps.thisStep.step;
			var decrement = null;

			// If the next value in this step moves into the next step,
			// the increment is the start of the next step - the current value
			if ( increment !== false ) {
				if ( value + increment > nearbySteps.stepAfter.startValue ) {
					increment = nearbySteps.stepAfter.startValue - value;
				}
			}


			// If the value is beyond the starting point
			if ( value > nearbySteps.thisStep.startValue ) {
				decrement = nearbySteps.thisStep.step;
			}

			else if ( nearbySteps.stepBefore.step === false ) {
				decrement = false;
			}

			// If a handle is at the start of a step, it always steps back into the previous step first
			else {
				decrement = value - nearbySteps.stepBefore.highestStep;
			}


			// Now, if at the slider edges, there is not in/decrement
			if ( location === 100 ) {
				increment = null;
			}

			else if ( location === 0 ) {
				decrement = null;
			}

			// As per #391, the comparison for the decrement step can have some rounding issues.
			var stepDecimals = scope_Spectrum.countStepDecimals();

			// Round per #391
			if ( increment !== null && increment !== false ) {
				increment = Number(increment.toFixed(stepDecimals));
			}

			if ( decrement !== null && decrement !== false ) {
				decrement = Number(decrement.toFixed(stepDecimals));
			}

			return [decrement, increment];
		});
	}

	// Updateable: margin, limit, padding, step, range, animate, snap
	function updateOptions ( optionsToUpdate, fireSetEvent ) {

		// Spectrum is created using the range, snap, direction and step options.
		// 'snap' and 'step' can be updated.
		// If 'snap' and 'step' are not passed, they should remain unchanged.
		var v = valueGet();

		var updateAble = ['margin', 'limit', 'padding', 'range', 'animate', 'snap', 'step', 'format'];

		// Only change options that we're actually passed to update.
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				originalOptions[name] = optionsToUpdate[name];
			}
		});

		var newOptions = testOptions(originalOptions);

		// Load new options into the slider state
		updateAble.forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = newOptions[name];
			}
		});

		scope_Spectrum = newOptions.spectrum;

		// Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
		options.margin = newOptions.margin;
		options.limit = newOptions.limit;
		options.padding = newOptions.padding;

		// Update pips, removes existing.
		if ( options.pips ) {
			pips(options.pips);
		}

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(optionsToUpdate.start || v, fireSetEvent);
	}

/*! In this file: Calls to functions. All other scope_ files define functions only; */

	// Create the base element, initialize HTML and set classes.
	// Add handles and connect elements.
	addSlider(scope_Target);
	addElements(options.connect, scope_Base);

	// Attach user events.
	bindSliderEvents(options.events);

	// Use the public value method to set the start values.
	valueSet(options.start);

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		reset: valueReset,
		// Exposed for unit testing, don't use this in your application.
		__moveHandles: function(a, b, c) { moveHandles(a, b, scope_Locations, c); },
		options: originalOptions, // Issue #600, #678
		updateOptions: updateOptions,
		target: scope_Target, // Issue #597
		removePips: removePips,
		pips: pips // Issue #594
	};

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	aria();

	return scope_Self;

}


	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !target || !target.nodeName ) {
			throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
		}

		// Throw an error if the slider was already initialized.
		if ( target.noUiSlider ) {
			throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
		}

		// Test the options and create the slider environment;
		var options = testOptions( originalOptions, target );
		var api = scope( target, options, originalOptions );

		target.noUiSlider = api;

		return api;
	}

	// Use an object instead of a function for future expandability;
	return {
		version: VERSION,
		create: initialize
	};

}));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuMjU3OTdkZWFkZDhkMTE3YmViMTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBMEM7QUFDbkQ7QUFDQTtBQUNBLFFBQVEsaUNBQU8sRUFBRSxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQzNCO0FBQ0EsTUFBTSxLQUFLO0FBQUEsRUFTTjtBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywyQkFBMkI7QUFDNUQsSUFBSTtBQUNKLGlDQUFpQyxxQkFBcUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixvR0FBb0c7QUFDckgsZUFBZSxvR0FBb0c7QUFDbkgsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx1QkFBdUI7QUFDcEMsY0FBYyx1QkFBdUI7QUFDckMsZ0JBQWdCLHlCQUF5QjtBQUN6QyxrQkFBa0IsMkJBQTJCO0FBQzdDLGFBQWEsdUJBQXVCO0FBQ3BDLGdCQUFnQiwwQkFBMEI7QUFDMUMsMEJBQTBCLG9DQUFvQztBQUM5RCxjQUFjLHVCQUF1QjtBQUNyQyxvQkFBb0IsOEJBQThCO0FBQ2xELGVBQWUseUJBQXlCO0FBQ3hDLGNBQWMsd0JBQXdCO0FBQ3RDLGdCQUFnQiwwQkFBMEI7QUFDMUMsa0JBQWtCLDJCQUEyQjtBQUM3QyxtQkFBbUIsNkJBQTZCO0FBQ2hELGVBQWUseUJBQXlCO0FBQ3hDLGlCQUFpQiwyQkFBMkI7QUFDNUMsa0JBQWtCLDRCQUE0QjtBQUM5QyxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsZ0JBQWdCO0FBQ25GO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLCtCQUErQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0Y7O0FBRXBGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsd0NBQXdDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL25vdWlzbGlkZXIvZGlzdHJpYnV0ZS9ub3Vpc2xpZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBub3Vpc2xpZGVyIC0gMTEuMC4zIC0gMjAxOC0wMS0yMSAxNDowNDowNyAqL1xyXG5cclxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XHJcblxyXG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XHJcblxyXG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cclxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcclxuXHJcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xyXG4gICAgICAgIHdpbmRvdy5ub1VpU2xpZGVyID0gZmFjdG9yeSgpO1xyXG4gICAgfVxyXG5cclxufShmdW5jdGlvbiggKXtcclxuXHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHR2YXIgVkVSU0lPTiA9ICcxMS4wLjMnO1xyXG5cclxuXHJcblx0ZnVuY3Rpb24gaXNWYWxpZEZvcm1hdHRlciAoIGVudHJ5ICkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGVudHJ5LnRvID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRyeS5mcm9tID09PSAnZnVuY3Rpb24nO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCAoIGVsICkge1xyXG5cdFx0ZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XHJcblx0fVxyXG5cclxuXHQvLyBCaW5kYWJsZSB2ZXJzaW9uXHJcblx0ZnVuY3Rpb24gcHJldmVudERlZmF1bHQgKCBlICkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0Ly8gUmVtb3ZlcyBkdXBsaWNhdGVzIGZyb20gYW4gYXJyYXkuXHJcblx0ZnVuY3Rpb24gdW5pcXVlICggYXJyYXkgKSB7XHJcblx0XHRyZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uKGEpe1xyXG5cdFx0XHRyZXR1cm4gIXRoaXNbYV0gPyB0aGlzW2FdID0gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0fSwge30pO1xyXG5cdH1cclxuXHJcblx0Ly8gUm91bmQgYSB2YWx1ZSB0byB0aGUgY2xvc2VzdCAndG8nLlxyXG5cdGZ1bmN0aW9uIGNsb3Nlc3QgKCB2YWx1ZSwgdG8gKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHRvKSAqIHRvO1xyXG5cdH1cclxuXHJcblx0Ly8gQ3VycmVudCBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudC5cclxuXHRmdW5jdGlvbiBvZmZzZXQgKCBlbGVtLCBvcmllbnRhdGlvbiApIHtcclxuXHJcblx0XHR2YXIgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR2YXIgZG9jID0gZWxlbS5vd25lckRvY3VtZW50O1xyXG5cdFx0dmFyIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xyXG5cdFx0dmFyIHBhZ2VPZmZzZXQgPSBnZXRQYWdlT2Zmc2V0KGRvYyk7XHJcblxyXG5cdFx0Ly8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGNvbnRhaW5zIGxlZnQgc2Nyb2xsIGluIENocm9tZSBvbiBBbmRyb2lkLlxyXG5cdFx0Ly8gSSBoYXZlbid0IGZvdW5kIGEgZmVhdHVyZSBkZXRlY3Rpb24gdGhhdCBwcm92ZXMgdGhpcy4gV29yc3QgY2FzZVxyXG5cdFx0Ly8gc2NlbmFyaW8gb24gbWlzLW1hdGNoOiB0aGUgJ3RhcCcgZmVhdHVyZSBvbiBob3Jpem9udGFsIHNsaWRlcnMgYnJlYWtzLlxyXG5cdFx0aWYgKCAvd2Via2l0LipDaHJvbWUuKk1vYmlsZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgKSB7XHJcblx0XHRcdHBhZ2VPZmZzZXQueCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9yaWVudGF0aW9uID8gKHJlY3QudG9wICsgcGFnZU9mZnNldC55IC0gZG9jRWxlbS5jbGllbnRUb3ApIDogKHJlY3QubGVmdCArIHBhZ2VPZmZzZXQueCAtIGRvY0VsZW0uY2xpZW50TGVmdCk7XHJcblx0fVxyXG5cclxuXHQvLyBDaGVja3Mgd2hldGhlciBhIHZhbHVlIGlzIG51bWVyaWNhbC5cclxuXHRmdW5jdGlvbiBpc051bWVyaWMgKCBhICkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBhID09PSAnbnVtYmVyJyAmJiAhaXNOYU4oIGEgKSAmJiBpc0Zpbml0ZSggYSApO1xyXG5cdH1cclxuXHJcblx0Ly8gU2V0cyBhIGNsYXNzIGFuZCByZW1vdmVzIGl0IGFmdGVyIFtkdXJhdGlvbl0gbXMuXHJcblx0ZnVuY3Rpb24gYWRkQ2xhc3NGb3IgKCBlbGVtZW50LCBjbGFzc05hbWUsIGR1cmF0aW9uICkge1xyXG5cdFx0aWYgKGR1cmF0aW9uID4gMCkge1xyXG5cdFx0YWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHRcdH0sIGR1cmF0aW9uKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIExpbWl0cyBhIHZhbHVlIHRvIDAgLSAxMDBcclxuXHRmdW5jdGlvbiBsaW1pdCAoIGEgKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oYSwgMTAwKSwgMCk7XHJcblx0fVxyXG5cclxuXHQvLyBXcmFwcyBhIHZhcmlhYmxlIGFzIGFuIGFycmF5LCBpZiBpdCBpc24ndCBvbmUgeWV0LlxyXG5cdC8vIE5vdGUgdGhhdCBhbiBpbnB1dCBhcnJheSBpcyByZXR1cm5lZCBieSByZWZlcmVuY2UhXHJcblx0ZnVuY3Rpb24gYXNBcnJheSAoIGEgKSB7XHJcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhKSA/IGEgOiBbYV07XHJcblx0fVxyXG5cclxuXHQvLyBDb3VudHMgZGVjaW1hbHNcclxuXHRmdW5jdGlvbiBjb3VudERlY2ltYWxzICggbnVtU3RyICkge1xyXG5cdFx0bnVtU3RyID0gU3RyaW5nKG51bVN0cik7XHJcblx0XHR2YXIgcGllY2VzID0gbnVtU3RyLnNwbGl0KFwiLlwiKTtcclxuXHRcdHJldHVybiBwaWVjZXMubGVuZ3RoID4gMSA/IHBpZWNlc1sxXS5sZW5ndGggOiAwO1xyXG5cdH1cclxuXHJcblx0Ly8gaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vI2FkZF9jbGFzc1xyXG5cdGZ1bmN0aW9uIGFkZENsYXNzICggZWwsIGNsYXNzTmFtZSApIHtcclxuXHRcdGlmICggZWwuY2xhc3NMaXN0ICkge1xyXG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vI3JlbW92ZV9jbGFzc1xyXG5cdGZ1bmN0aW9uIHJlbW92ZUNsYXNzICggZWwsIGNsYXNzTmFtZSApIHtcclxuXHRcdGlmICggZWwuY2xhc3NMaXN0ICkge1xyXG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gaHR0cHM6Ly9wbGFpbmpzLmNvbS9qYXZhc2NyaXB0L2F0dHJpYnV0ZXMvYWRkaW5nLXJlbW92aW5nLWFuZC10ZXN0aW5nLWZvci1jbGFzc2VzLTkvXHJcblx0ZnVuY3Rpb24gaGFzQ2xhc3MgKCBlbCwgY2xhc3NOYW1lICkge1xyXG5cdFx0cmV0dXJuIGVsLmNsYXNzTGlzdCA/IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDogbmV3IFJlZ0V4cCgnXFxcXGInICsgY2xhc3NOYW1lICsgJ1xcXFxiJykudGVzdChlbC5jbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9zY3JvbGxZI05vdGVzXHJcblx0ZnVuY3Rpb24gZ2V0UGFnZU9mZnNldCAoIGRvYyApIHtcclxuXHJcblx0XHR2YXIgc3VwcG9ydFBhZ2VPZmZzZXQgPSB3aW5kb3cucGFnZVhPZmZzZXQgIT09IHVuZGVmaW5lZDtcclxuXHRcdHZhciBpc0NTUzFDb21wYXQgPSAoKGRvYy5jb21wYXRNb2RlIHx8IFwiXCIpID09PSBcIkNTUzFDb21wYXRcIik7XHJcblx0XHR2YXIgeCA9IHN1cHBvcnRQYWdlT2Zmc2V0ID8gd2luZG93LnBhZ2VYT2Zmc2V0IDogaXNDU1MxQ29tcGF0ID8gZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IDogZG9jLmJvZHkuc2Nyb2xsTGVmdDtcclxuXHRcdHZhciB5ID0gc3VwcG9ydFBhZ2VPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBpc0NTUzFDb21wYXQgPyBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IGRvYy5ib2R5LnNjcm9sbFRvcDtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4LFxyXG5cdFx0XHR5OiB5XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Ly8gd2UgcHJvdmlkZSBhIGZ1bmN0aW9uIHRvIGNvbXB1dGUgY29uc3RhbnRzIGluc3RlYWRcclxuXHQvLyBvZiBhY2Nlc3Npbmcgd2luZG93LiogYXMgc29vbiBhcyB0aGUgbW9kdWxlIG5lZWRzIGl0XHJcblx0Ly8gc28gdGhhdCB3ZSBkbyBub3QgY29tcHV0ZSBhbnl0aGluZyBpZiBub3QgbmVlZGVkXHJcblx0ZnVuY3Rpb24gZ2V0QWN0aW9ucyAoICkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgZXZlbnRzIHRvIGJpbmQuIElFMTEgaW1wbGVtZW50cyBwb2ludGVyRXZlbnRzIHdpdGhvdXRcclxuXHRcdC8vIGEgcHJlZml4LCB3aGljaCBicmVha3MgY29tcGF0aWJpbGl0eSB3aXRoIHRoZSBJRTEwIGltcGxlbWVudGF0aW9uLlxyXG5cdFx0cmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgPyB7XHJcblx0XHRcdHN0YXJ0OiAncG9pbnRlcmRvd24nLFxyXG5cdFx0XHRtb3ZlOiAncG9pbnRlcm1vdmUnLFxyXG5cdFx0XHRlbmQ6ICdwb2ludGVydXAnXHJcblx0XHR9IDogd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkID8ge1xyXG5cdFx0XHRzdGFydDogJ01TUG9pbnRlckRvd24nLFxyXG5cdFx0XHRtb3ZlOiAnTVNQb2ludGVyTW92ZScsXHJcblx0XHRcdGVuZDogJ01TUG9pbnRlclVwJ1xyXG5cdFx0fSA6IHtcclxuXHRcdFx0c3RhcnQ6ICdtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblx0XHRcdG1vdmU6ICdtb3VzZW1vdmUgdG91Y2htb3ZlJyxcclxuXHRcdFx0ZW5kOiAnbW91c2V1cCB0b3VjaGVuZCdcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9FdmVudExpc3RlbmVyT3B0aW9ucy9ibG9iL2doLXBhZ2VzL2V4cGxhaW5lci5tZFxyXG5cdC8vIElzc3VlICM3ODVcclxuXHRmdW5jdGlvbiBnZXRTdXBwb3J0c1Bhc3NpdmUgKCApIHtcclxuXHJcblx0XHR2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHJcblx0XHRcdHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcclxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcclxuXHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBzdXBwb3J0c1Bhc3NpdmU7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRTdXBwb3J0c1RvdWNoQWN0aW9uTm9uZSAoICkge1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5DU1MgJiYgQ1NTLnN1cHBvcnRzICYmIENTUy5zdXBwb3J0cygndG91Y2gtYWN0aW9uJywgJ25vbmUnKTtcclxuXHR9XHJcblxyXG5cclxuLy8gVmFsdWUgY2FsY3VsYXRpb25cclxuXHJcblx0Ly8gRGV0ZXJtaW5lIHRoZSBzaXplIG9mIGEgc3ViLXJhbmdlIGluIHJlbGF0aW9uIHRvIGEgZnVsbCByYW5nZS5cclxuXHRmdW5jdGlvbiBzdWJSYW5nZVJhdGlvICggcGEsIHBiICkge1xyXG5cdFx0cmV0dXJuICgxMDAgLyAocGIgLSBwYSkpO1xyXG5cdH1cclxuXHJcblx0Ly8gKHBlcmNlbnRhZ2UpIEhvdyBtYW55IHBlcmNlbnQgaXMgdGhpcyB2YWx1ZSBvZiB0aGlzIHJhbmdlP1xyXG5cdGZ1bmN0aW9uIGZyb21QZXJjZW50YWdlICggcmFuZ2UsIHZhbHVlICkge1xyXG5cdFx0cmV0dXJuICh2YWx1ZSAqIDEwMCkgLyAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKTtcclxuXHR9XHJcblxyXG5cdC8vIChwZXJjZW50YWdlKSBXaGVyZSBpcyB0aGlzIHZhbHVlIG9uIHRoaXMgcmFuZ2U/XHJcblx0ZnVuY3Rpb24gdG9QZXJjZW50YWdlICggcmFuZ2UsIHZhbHVlICkge1xyXG5cdFx0cmV0dXJuIGZyb21QZXJjZW50YWdlKCByYW5nZSwgcmFuZ2VbMF0gPCAwID9cclxuXHRcdFx0dmFsdWUgKyBNYXRoLmFicyhyYW5nZVswXSkgOlxyXG5cdFx0XHRcdHZhbHVlIC0gcmFuZ2VbMF0gKTtcclxuXHR9XHJcblxyXG5cdC8vICh2YWx1ZSkgSG93IG11Y2ggaXMgdGhpcyBwZXJjZW50YWdlIG9uIHRoaXMgcmFuZ2U/XHJcblx0ZnVuY3Rpb24gaXNQZXJjZW50YWdlICggcmFuZ2UsIHZhbHVlICkge1xyXG5cdFx0cmV0dXJuICgodmFsdWUgKiAoIHJhbmdlWzFdIC0gcmFuZ2VbMF0gKSkgLyAxMDApICsgcmFuZ2VbMF07XHJcblx0fVxyXG5cclxuXHJcbi8vIFJhbmdlIGNvbnZlcnNpb25cclxuXHJcblx0ZnVuY3Rpb24gZ2V0SiAoIHZhbHVlLCBhcnIgKSB7XHJcblxyXG5cdFx0dmFyIGogPSAxO1xyXG5cclxuXHRcdHdoaWxlICggdmFsdWUgPj0gYXJyW2pdICl7XHJcblx0XHRcdGogKz0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gajtcclxuXHR9XHJcblxyXG5cdC8vIChwZXJjZW50YWdlKSBJbnB1dCBhIHZhbHVlLCBmaW5kIHdoZXJlLCBvbiBhIHNjYWxlIG9mIDAtMTAwLCBpdCBhcHBsaWVzLlxyXG5cdGZ1bmN0aW9uIHRvU3RlcHBpbmcgKCB4VmFsLCB4UGN0LCB2YWx1ZSApIHtcclxuXHJcblx0XHRpZiAoIHZhbHVlID49IHhWYWwuc2xpY2UoLTEpWzBdICl7XHJcblx0XHRcdHJldHVybiAxMDA7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGogPSBnZXRKKCB2YWx1ZSwgeFZhbCApO1xyXG5cdFx0dmFyIHZhID0geFZhbFtqLTFdO1xyXG5cdFx0dmFyIHZiID0geFZhbFtqXTtcclxuXHRcdHZhciBwYSA9IHhQY3Rbai0xXTtcclxuXHRcdHZhciBwYiA9IHhQY3Rbal07XHJcblxyXG5cdFx0cmV0dXJuIHBhICsgKHRvUGVyY2VudGFnZShbdmEsIHZiXSwgdmFsdWUpIC8gc3ViUmFuZ2VSYXRpbyAocGEsIHBiKSk7XHJcblx0fVxyXG5cclxuXHQvLyAodmFsdWUpIElucHV0IGEgcGVyY2VudGFnZSwgZmluZCB3aGVyZSBpdCBpcyBvbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxyXG5cdGZ1bmN0aW9uIGZyb21TdGVwcGluZyAoIHhWYWwsIHhQY3QsIHZhbHVlICkge1xyXG5cclxuXHRcdC8vIFRoZXJlIGlzIG5vIHJhbmdlIGdyb3VwIHRoYXQgZml0cyAxMDBcclxuXHRcdGlmICggdmFsdWUgPj0gMTAwICl7XHJcblx0XHRcdHJldHVybiB4VmFsLnNsaWNlKC0xKVswXTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaiA9IGdldEooIHZhbHVlLCB4UGN0ICk7XHJcblx0XHR2YXIgdmEgPSB4VmFsW2otMV07XHJcblx0XHR2YXIgdmIgPSB4VmFsW2pdO1xyXG5cdFx0dmFyIHBhID0geFBjdFtqLTFdO1xyXG5cdFx0dmFyIHBiID0geFBjdFtqXTtcclxuXHJcblx0XHRyZXR1cm4gaXNQZXJjZW50YWdlKFt2YSwgdmJdLCAodmFsdWUgLSBwYSkgKiBzdWJSYW5nZVJhdGlvIChwYSwgcGIpKTtcclxuXHR9XHJcblxyXG5cdC8vIChwZXJjZW50YWdlKSBHZXQgdGhlIHN0ZXAgdGhhdCBhcHBsaWVzIGF0IGEgY2VydGFpbiB2YWx1ZS5cclxuXHRmdW5jdGlvbiBnZXRTdGVwICggeFBjdCwgeFN0ZXBzLCBzbmFwLCB2YWx1ZSApIHtcclxuXHJcblx0XHRpZiAoIHZhbHVlID09PSAxMDAgKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaiA9IGdldEooIHZhbHVlLCB4UGN0ICk7XHJcblx0XHR2YXIgYSA9IHhQY3Rbai0xXTtcclxuXHRcdHZhciBiID0geFBjdFtqXTtcclxuXHJcblx0XHQvLyBJZiAnc25hcCcgaXMgc2V0LCBzdGVwcyBhcmUgdXNlZCBhcyBmaXhlZCBwb2ludHMgb24gdGhlIHNsaWRlci5cclxuXHRcdGlmICggc25hcCApIHtcclxuXHJcblx0XHRcdC8vIEZpbmQgdGhlIGNsb3Nlc3QgcG9zaXRpb24sIGEgb3IgYi5cclxuXHRcdFx0aWYgKCh2YWx1ZSAtIGEpID4gKChiLWEpLzIpKXtcclxuXHRcdFx0XHRyZXR1cm4gYjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCAheFN0ZXBzW2otMV0gKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB4UGN0W2otMV0gKyBjbG9zZXN0KFxyXG5cdFx0XHR2YWx1ZSAtIHhQY3Rbai0xXSxcclxuXHRcdFx0eFN0ZXBzW2otMV1cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHJcbi8vIEVudHJ5IHBhcnNpbmdcclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlRW50cnlQb2ludCAoIGluZGV4LCB2YWx1ZSwgdGhhdCApIHtcclxuXHJcblx0XHR2YXIgcGVyY2VudGFnZTtcclxuXHJcblx0XHQvLyBXcmFwIG51bWVyaWNhbCBpbnB1dCBpbiBhbiBhcnJheS5cclxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICkge1xyXG5cdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVqZWN0IGFueSBpbnZhbGlkIGlucHV0LCBieSB0ZXN0aW5nIHdoZXRoZXIgdmFsdWUgaXMgYW4gYXJyYXkuXHJcblx0XHRpZiAoICFBcnJheS5pc0FycmF5KHZhbHVlKSApe1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdyYW5nZScgY29udGFpbnMgaW52YWxpZCB2YWx1ZS5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ292ZXJ0IG1pbi9tYXggc3ludGF4IHRvIDAgYW5kIDEwMC5cclxuXHRcdGlmICggaW5kZXggPT09ICdtaW4nICkge1xyXG5cdFx0XHRwZXJjZW50YWdlID0gMDtcclxuXHRcdH0gZWxzZSBpZiAoIGluZGV4ID09PSAnbWF4JyApIHtcclxuXHRcdFx0cGVyY2VudGFnZSA9IDEwMDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KCBpbmRleCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBjb3JyZWN0IGlucHV0LlxyXG5cdFx0aWYgKCAhaXNOdW1lcmljKCBwZXJjZW50YWdlICkgfHwgIWlzTnVtZXJpYyggdmFsdWVbMF0gKSApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAncmFuZ2UnIHZhbHVlIGlzbid0IG51bWVyaWMuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0b3JlIHZhbHVlcy5cclxuXHRcdHRoYXQueFBjdC5wdXNoKCBwZXJjZW50YWdlICk7XHJcblx0XHR0aGF0LnhWYWwucHVzaCggdmFsdWVbMF0gKTtcclxuXHJcblx0XHQvLyBOYU4gd2lsbCBldmFsdWF0ZSB0byBmYWxzZSB0b28sIGJ1dCB0byBrZWVwXHJcblx0XHQvLyBsb2dnaW5nIGNsZWFyLCBzZXQgc3RlcCBleHBsaWNpdGx5LiBNYWtlIHN1cmVcclxuXHRcdC8vIG5vdCB0byBvdmVycmlkZSB0aGUgJ3N0ZXAnIHNldHRpbmcgd2l0aCBmYWxzZS5cclxuXHRcdGlmICggIXBlcmNlbnRhZ2UgKSB7XHJcblx0XHRcdGlmICggIWlzTmFOKCB2YWx1ZVsxXSApICkge1xyXG5cdFx0XHRcdHRoYXQueFN0ZXBzWzBdID0gdmFsdWVbMV07XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoYXQueFN0ZXBzLnB1c2goIGlzTmFOKHZhbHVlWzFdKSA/IGZhbHNlIDogdmFsdWVbMV0gKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGF0LnhIaWdoZXN0Q29tcGxldGVTdGVwLnB1c2goMCk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVTdGVwUG9pbnQgKCBpLCBuLCB0aGF0ICkge1xyXG5cclxuXHRcdC8vIElnbm9yZSAnZmFsc2UnIHN0ZXBwaW5nLlxyXG5cdFx0aWYgKCAhbiApIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRmFjdG9yIHRvIHJhbmdlIHJhdGlvXHJcblx0XHR0aGF0LnhTdGVwc1tpXSA9IGZyb21QZXJjZW50YWdlKFt0aGF0LnhWYWxbaV0sIHRoYXQueFZhbFtpKzFdXSwgbikgLyBzdWJSYW5nZVJhdGlvKHRoYXQueFBjdFtpXSwgdGhhdC54UGN0W2krMV0pO1xyXG5cclxuXHRcdHZhciB0b3RhbFN0ZXBzID0gKHRoYXQueFZhbFtpKzFdIC0gdGhhdC54VmFsW2ldKSAvIHRoYXQueE51bVN0ZXBzW2ldO1xyXG5cdFx0dmFyIGhpZ2hlc3RTdGVwID0gTWF0aC5jZWlsKE51bWJlcih0b3RhbFN0ZXBzLnRvRml4ZWQoMykpIC0gMSk7XHJcblx0XHR2YXIgc3RlcCA9IHRoYXQueFZhbFtpXSArICh0aGF0LnhOdW1TdGVwc1tpXSAqIGhpZ2hlc3RTdGVwKTtcclxuXHJcblx0XHR0aGF0LnhIaWdoZXN0Q29tcGxldGVTdGVwW2ldID0gc3RlcDtcclxuXHR9XHJcblxyXG5cclxuLy8gSW50ZXJmYWNlXHJcblxyXG5cdGZ1bmN0aW9uIFNwZWN0cnVtICggZW50cnksIHNuYXAsIHNpbmdsZVN0ZXAgKSB7XHJcblxyXG5cdFx0dGhpcy54UGN0ID0gW107XHJcblx0XHR0aGlzLnhWYWwgPSBbXTtcclxuXHRcdHRoaXMueFN0ZXBzID0gWyBzaW5nbGVTdGVwIHx8IGZhbHNlIF07XHJcblx0XHR0aGlzLnhOdW1TdGVwcyA9IFsgZmFsc2UgXTtcclxuXHRcdHRoaXMueEhpZ2hlc3RDb21wbGV0ZVN0ZXAgPSBbXTtcclxuXHJcblx0XHR0aGlzLnNuYXAgPSBzbmFwO1xyXG5cclxuXHRcdHZhciBpbmRleDtcclxuXHRcdHZhciBvcmRlcmVkID0gW107IC8vIFswLCAnbWluJ10sIFsxLCAnNTAlJ10sIFsyLCAnbWF4J11cclxuXHJcblx0XHQvLyBNYXAgdGhlIG9iamVjdCBrZXlzIHRvIGFuIGFycmF5LlxyXG5cdFx0Zm9yICggaW5kZXggaW4gZW50cnkgKSB7XHJcblx0XHRcdGlmICggZW50cnkuaGFzT3duUHJvcGVydHkoaW5kZXgpICkge1xyXG5cdFx0XHRcdG9yZGVyZWQucHVzaChbZW50cnlbaW5kZXhdLCBpbmRleF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU29ydCBhbGwgZW50cmllcyBieSB2YWx1ZSAobnVtZXJpYyBzb3J0KS5cclxuXHRcdGlmICggb3JkZXJlZC5sZW5ndGggJiYgdHlwZW9mIG9yZGVyZWRbMF1bMF0gPT09IFwib2JqZWN0XCIgKSB7XHJcblx0XHRcdG9yZGVyZWQuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhWzBdWzBdIC0gYlswXVswXTsgfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvcmRlcmVkLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH0pO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBDb252ZXJ0IGFsbCBlbnRyaWVzIHRvIHN1YnJhbmdlcy5cclxuXHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBvcmRlcmVkLmxlbmd0aDsgaW5kZXgrKyApIHtcclxuXHRcdFx0aGFuZGxlRW50cnlQb2ludChvcmRlcmVkW2luZGV4XVsxXSwgb3JkZXJlZFtpbmRleF1bMF0sIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0b3JlIHRoZSBhY3R1YWwgc3RlcCB2YWx1ZXMuXHJcblx0XHQvLyB4U3RlcHMgaXMgc29ydGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIHhQY3QgYW5kIHhWYWwuXHJcblx0XHR0aGlzLnhOdW1TdGVwcyA9IHRoaXMueFN0ZXBzLnNsaWNlKDApO1xyXG5cclxuXHRcdC8vIENvbnZlcnQgYWxsIG51bWVyaWMgc3RlcHMgdG8gdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIHN1YnJhbmdlIHRoZXkgcmVwcmVzZW50LlxyXG5cdFx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IHRoaXMueE51bVN0ZXBzLmxlbmd0aDsgaW5kZXgrKyApIHtcclxuXHRcdFx0aGFuZGxlU3RlcFBvaW50KGluZGV4LCB0aGlzLnhOdW1TdGVwc1tpbmRleF0sIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0U3BlY3RydW0ucHJvdG90eXBlLmdldE1hcmdpbiA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XHJcblxyXG5cdFx0dmFyIHN0ZXAgPSB0aGlzLnhOdW1TdGVwc1swXTtcclxuXHJcblx0XHRpZiAoIHN0ZXAgJiYgKCh2YWx1ZSAvIHN0ZXApICUgMSkgIT09IDAgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2xpbWl0JywgJ21hcmdpbicgYW5kICdwYWRkaW5nJyBtdXN0IGJlIGRpdmlzaWJsZSBieSBzdGVwLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy54UGN0Lmxlbmd0aCA9PT0gMiA/IGZyb21QZXJjZW50YWdlKHRoaXMueFZhbCwgdmFsdWUpIDogZmFsc2U7XHJcblx0fTtcclxuXHJcblx0U3BlY3RydW0ucHJvdG90eXBlLnRvU3RlcHBpbmcgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdHZhbHVlID0gdG9TdGVwcGluZyggdGhpcy54VmFsLCB0aGlzLnhQY3QsIHZhbHVlICk7XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH07XHJcblxyXG5cdFNwZWN0cnVtLnByb3RvdHlwZS5mcm9tU3RlcHBpbmcgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdHJldHVybiBmcm9tU3RlcHBpbmcoIHRoaXMueFZhbCwgdGhpcy54UGN0LCB2YWx1ZSApO1xyXG5cdH07XHJcblxyXG5cdFNwZWN0cnVtLnByb3RvdHlwZS5nZXRTdGVwID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcclxuXHJcblx0XHR2YWx1ZSA9IGdldFN0ZXAodGhpcy54UGN0LCB0aGlzLnhTdGVwcywgdGhpcy5zbmFwLCB2YWx1ZSApO1xyXG5cclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9O1xyXG5cclxuXHRTcGVjdHJ1bS5wcm90b3R5cGUuZ2V0TmVhcmJ5U3RlcHMgPSBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdHZhciBqID0gZ2V0Sih2YWx1ZSwgdGhpcy54UGN0KTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGVwQmVmb3JlOiB7IHN0YXJ0VmFsdWU6IHRoaXMueFZhbFtqLTJdLCBzdGVwOiB0aGlzLnhOdW1TdGVwc1tqLTJdLCBoaWdoZXN0U3RlcDogdGhpcy54SGlnaGVzdENvbXBsZXRlU3RlcFtqLTJdIH0sXHJcblx0XHRcdHRoaXNTdGVwOiB7IHN0YXJ0VmFsdWU6IHRoaXMueFZhbFtqLTFdLCBzdGVwOiB0aGlzLnhOdW1TdGVwc1tqLTFdLCBoaWdoZXN0U3RlcDogdGhpcy54SGlnaGVzdENvbXBsZXRlU3RlcFtqLTFdIH0sXHJcblx0XHRcdHN0ZXBBZnRlcjogeyBzdGFydFZhbHVlOiB0aGlzLnhWYWxbai0wXSwgc3RlcDogdGhpcy54TnVtU3RlcHNbai0wXSwgaGlnaGVzdFN0ZXA6IHRoaXMueEhpZ2hlc3RDb21wbGV0ZVN0ZXBbai0wXSB9XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdFNwZWN0cnVtLnByb3RvdHlwZS5jb3VudFN0ZXBEZWNpbWFscyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzdGVwRGVjaW1hbHMgPSB0aGlzLnhOdW1TdGVwcy5tYXAoY291bnREZWNpbWFscyk7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgc3RlcERlY2ltYWxzKTtcclxuXHR9O1xyXG5cclxuXHQvLyBPdXRzaWRlIHRlc3RpbmdcclxuXHRTcGVjdHJ1bS5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRTdGVwKHRoaXMudG9TdGVwcGluZyh2YWx1ZSkpO1xyXG5cdH07XHJcblxyXG4vKlx0RXZlcnkgaW5wdXQgb3B0aW9uIGlzIHRlc3RlZCBhbmQgcGFyc2VkLiBUaGlzJ2xsIHByZXZlbnRcclxuXHRlbmRsZXNzIHZhbGlkYXRpb24gaW4gaW50ZXJuYWwgbWV0aG9kcy4gVGhlc2UgdGVzdHMgYXJlXHJcblx0c3RydWN0dXJlZCB3aXRoIGFuIGl0ZW0gZm9yIGV2ZXJ5IG9wdGlvbiBhdmFpbGFibGUuIEFuXHJcblx0b3B0aW9uIGNhbiBiZSBtYXJrZWQgYXMgcmVxdWlyZWQgYnkgc2V0dGluZyB0aGUgJ3InIGZsYWcuXHJcblx0VGhlIHRlc3RpbmcgZnVuY3Rpb24gaXMgcHJvdmlkZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6XHJcblx0XHQtIFRoZSBwcm92aWRlZCB2YWx1ZSBmb3IgdGhlIG9wdGlvbjtcclxuXHRcdC0gQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgb2JqZWN0O1xyXG5cdFx0LSBUaGUgbmFtZSBmb3IgdGhlIG9wdGlvbjtcclxuXHJcblx0VGhlIHRlc3RpbmcgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB3aGVuIGFuIGVycm9yIGlzIGRldGVjdGVkLFxyXG5cdG9yIHRydWUgd2hlbiBldmVyeXRoaW5nIGlzIE9LLiBJdCBjYW4gYWxzbyBtb2RpZnkgdGhlIG9wdGlvblxyXG5cdG9iamVjdCwgdG8gbWFrZSBzdXJlIGFsbCB2YWx1ZXMgY2FuIGJlIGNvcnJlY3RseSBsb29wZWQgZWxzZXdoZXJlLiAqL1xyXG5cclxuXHR2YXIgZGVmYXVsdEZvcm1hdHRlciA9IHsgJ3RvJzogZnVuY3Rpb24oIHZhbHVlICl7XHJcblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZS50b0ZpeGVkKDIpO1xyXG5cdH0sICdmcm9tJzogTnVtYmVyIH07XHJcblxyXG5cdGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0ICggZW50cnkgKSB7XHJcblxyXG5cdFx0Ly8gQW55IG9iamVjdCB3aXRoIGEgdG8gYW5kIGZyb20gbWV0aG9kIGlzIHN1cHBvcnRlZC5cclxuXHRcdGlmICggaXNWYWxpZEZvcm1hdHRlcihlbnRyeSkgKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2Zvcm1hdCcgcmVxdWlyZXMgJ3RvJyBhbmQgJ2Zyb20nIG1ldGhvZHMuXCIpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdGVzdFN0ZXAgKCBwYXJzZWQsIGVudHJ5ICkge1xyXG5cclxuXHRcdGlmICggIWlzTnVtZXJpYyggZW50cnkgKSApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnc3RlcCcgaXMgbm90IG51bWVyaWMuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBzdGVwIG9wdGlvbiBjYW4gc3RpbGwgYmUgdXNlZCB0byBzZXQgc3RlcHBpbmdcclxuXHRcdC8vIGZvciBsaW5lYXIgc2xpZGVycy4gT3ZlcndyaXR0ZW4gaWYgc2V0IGluICdyYW5nZScuXHJcblx0XHRwYXJzZWQuc2luZ2xlU3RlcCA9IGVudHJ5O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdGVzdFJhbmdlICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHQvLyBGaWx0ZXIgaW5jb3JyZWN0IGlucHV0LlxyXG5cdFx0aWYgKCB0eXBlb2YgZW50cnkgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoZW50cnkpICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdyYW5nZScgaXMgbm90IGFuIG9iamVjdC5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2F0Y2ggbWlzc2luZyBzdGFydCBvciBlbmQuXHJcblx0XHRpZiAoIGVudHJ5Lm1pbiA9PT0gdW5kZWZpbmVkIHx8IGVudHJ5Lm1heCA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6IE1pc3NpbmcgJ21pbicgb3IgJ21heCcgaW4gJ3JhbmdlJy5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2F0Y2ggZXF1YWwgc3RhcnQgb3IgZW5kLlxyXG5cdFx0aWYgKCBlbnRyeS5taW4gPT09IGVudHJ5Lm1heCApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAncmFuZ2UnICdtaW4nIGFuZCAnbWF4JyBjYW5ub3QgYmUgZXF1YWwuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcnNlZC5zcGVjdHJ1bSA9IG5ldyBTcGVjdHJ1bShlbnRyeSwgcGFyc2VkLnNuYXAsIHBhcnNlZC5zaW5nbGVTdGVwKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRlc3RTdGFydCAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblxyXG5cdFx0ZW50cnkgPSBhc0FycmF5KGVudHJ5KTtcclxuXHJcblx0XHQvLyBWYWxpZGF0ZSBpbnB1dC4gVmFsdWVzIGFyZW4ndCB0ZXN0ZWQsIGFzIHRoZSBwdWJsaWMgLnZhbCBtZXRob2RcclxuXHRcdC8vIHdpbGwgYWx3YXlzIHByb3ZpZGUgYSB2YWxpZCBsb2NhdGlvbi5cclxuXHRcdGlmICggIUFycmF5LmlzQXJyYXkoIGVudHJ5ICkgfHwgIWVudHJ5Lmxlbmd0aCApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnc3RhcnQnIG9wdGlvbiBpcyBpbmNvcnJlY3QuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0b3JlIHRoZSBudW1iZXIgb2YgaGFuZGxlcy5cclxuXHRcdHBhcnNlZC5oYW5kbGVzID0gZW50cnkubGVuZ3RoO1xyXG5cclxuXHRcdC8vIFdoZW4gdGhlIHNsaWRlciBpcyBpbml0aWFsaXplZCwgdGhlIC52YWwgbWV0aG9kIHdpbGxcclxuXHRcdC8vIGJlIGNhbGxlZCB3aXRoIHRoZSBzdGFydCBvcHRpb25zLlxyXG5cdFx0cGFyc2VkLnN0YXJ0ID0gZW50cnk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0U25hcCAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblxyXG5cdFx0Ly8gRW5mb3JjZSAxMDAlIHN0ZXBwaW5nIHdpdGhpbiBzdWJyYW5nZXMuXHJcblx0XHRwYXJzZWQuc25hcCA9IGVudHJ5O1xyXG5cclxuXHRcdGlmICggdHlwZW9mIGVudHJ5ICE9PSAnYm9vbGVhbicgKXtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnc25hcCcgb3B0aW9uIG11c3QgYmUgYSBib29sZWFuLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRlc3RBbmltYXRlICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHQvLyBFbmZvcmNlIDEwMCUgc3RlcHBpbmcgd2l0aGluIHN1YnJhbmdlcy5cclxuXHRcdHBhcnNlZC5hbmltYXRlID0gZW50cnk7XHJcblxyXG5cdFx0aWYgKCB0eXBlb2YgZW50cnkgIT09ICdib29sZWFuJyApe1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdhbmltYXRlJyBvcHRpb24gbXVzdCBiZSBhIGJvb2xlYW4uXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdGVzdEFuaW1hdGlvbkR1cmF0aW9uICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHRwYXJzZWQuYW5pbWF0aW9uRHVyYXRpb24gPSBlbnRyeTtcclxuXHJcblx0XHRpZiAoIHR5cGVvZiBlbnRyeSAhPT0gJ251bWJlcicgKXtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnYW5pbWF0aW9uRHVyYXRpb24nIG9wdGlvbiBtdXN0IGJlIGEgbnVtYmVyLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRlc3RDb25uZWN0ICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHR2YXIgY29ubmVjdCA9IFtmYWxzZV07XHJcblx0XHR2YXIgaTtcclxuXHJcblx0XHQvLyBNYXAgbGVnYWN5IG9wdGlvbnNcclxuXHRcdGlmICggZW50cnkgPT09ICdsb3dlcicgKSB7XHJcblx0XHRcdGVudHJ5ID0gW3RydWUsIGZhbHNlXTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIGlmICggZW50cnkgPT09ICd1cHBlcicgKSB7XHJcblx0XHRcdGVudHJ5ID0gW2ZhbHNlLCB0cnVlXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBIYW5kbGUgYm9vbGVhbiBvcHRpb25zXHJcblx0XHRpZiAoIGVudHJ5ID09PSB0cnVlIHx8IGVudHJ5ID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdGZvciAoIGkgPSAxOyBpIDwgcGFyc2VkLmhhbmRsZXM7IGkrKyApIHtcclxuXHRcdFx0XHRjb25uZWN0LnB1c2goZW50cnkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25uZWN0LnB1c2goZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlamVjdCBpbnZhbGlkIGlucHV0XHJcblx0XHRlbHNlIGlmICggIUFycmF5LmlzQXJyYXkoIGVudHJ5ICkgfHwgIWVudHJ5Lmxlbmd0aCB8fCBlbnRyeS5sZW5ndGggIT09IHBhcnNlZC5oYW5kbGVzICsgMSApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnY29ubmVjdCcgb3B0aW9uIGRvZXNuJ3QgbWF0Y2ggaGFuZGxlIGNvdW50LlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29ubmVjdCA9IGVudHJ5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcnNlZC5jb25uZWN0ID0gY29ubmVjdDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRlc3RPcmllbnRhdGlvbiAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblxyXG5cdFx0Ly8gU2V0IG9yaWVudGF0aW9uIHRvIGFuIGEgbnVtZXJpY2FsIHZhbHVlIGZvciBlYXN5XHJcblx0XHQvLyBhcnJheSBzZWxlY3Rpb24uXHJcblx0XHRzd2l0Y2ggKCBlbnRyeSApe1xyXG5cdFx0XHRjYXNlICdob3Jpem9udGFsJzpcclxuXHRcdFx0XHRwYXJzZWQub3J0ID0gMDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndmVydGljYWwnOlxyXG5cdFx0XHRcdHBhcnNlZC5vcnQgPSAxO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ29yaWVudGF0aW9uJyBvcHRpb24gaXMgaW52YWxpZC5cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0TWFyZ2luICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHRpZiAoICFpc051bWVyaWMoZW50cnkpICl7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ21hcmdpbicgb3B0aW9uIG11c3QgYmUgbnVtZXJpYy5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSXNzdWUgIzU4MlxyXG5cdFx0aWYgKCBlbnRyeSA9PT0gMCApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcnNlZC5tYXJnaW4gPSBwYXJzZWQuc3BlY3RydW0uZ2V0TWFyZ2luKGVudHJ5KTtcclxuXHJcblx0XHRpZiAoICFwYXJzZWQubWFyZ2luICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdtYXJnaW4nIG9wdGlvbiBpcyBvbmx5IHN1cHBvcnRlZCBvbiBsaW5lYXIgc2xpZGVycy5cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0TGltaXQgKCBwYXJzZWQsIGVudHJ5ICkge1xyXG5cclxuXHRcdGlmICggIWlzTnVtZXJpYyhlbnRyeSkgKXtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnbGltaXQnIG9wdGlvbiBtdXN0IGJlIG51bWVyaWMuXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcnNlZC5saW1pdCA9IHBhcnNlZC5zcGVjdHJ1bS5nZXRNYXJnaW4oZW50cnkpO1xyXG5cclxuXHRcdGlmICggIXBhcnNlZC5saW1pdCB8fCBwYXJzZWQuaGFuZGxlcyA8IDIgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2xpbWl0JyBvcHRpb24gaXMgb25seSBzdXBwb3J0ZWQgb24gbGluZWFyIHNsaWRlcnMgd2l0aCAyIG9yIG1vcmUgaGFuZGxlcy5cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0UGFkZGluZyAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblxyXG5cdFx0aWYgKCAhaXNOdW1lcmljKGVudHJ5KSAmJiAhQXJyYXkuaXNBcnJheShlbnRyeSkgKXtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAncGFkZGluZycgb3B0aW9uIG11c3QgYmUgbnVtZXJpYyBvciBhcnJheSBvZiBleGFjdGx5IDIgbnVtYmVycy5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBBcnJheS5pc0FycmF5KGVudHJ5KSAmJiAhKGVudHJ5Lmxlbmd0aCA9PT0gMiB8fCBpc051bWVyaWMoZW50cnlbMF0pIHx8IGlzTnVtZXJpYyhlbnRyeVsxXSkpICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdwYWRkaW5nJyBvcHRpb24gbXVzdCBiZSBudW1lcmljIG9yIGFycmF5IG9mIGV4YWN0bHkgMiBudW1iZXJzLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIGVudHJ5ID09PSAwICkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCAhQXJyYXkuaXNBcnJheShlbnRyeSkgKSB7XHJcblx0XHRcdGVudHJ5ID0gW2VudHJ5LCBlbnRyeV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gJ2dldE1hcmdpbicgcmV0dXJucyBmYWxzZSBmb3IgaW52YWxpZCB2YWx1ZXMuXHJcblx0XHRwYXJzZWQucGFkZGluZyA9IFtwYXJzZWQuc3BlY3RydW0uZ2V0TWFyZ2luKGVudHJ5WzBdKSwgcGFyc2VkLnNwZWN0cnVtLmdldE1hcmdpbihlbnRyeVsxXSldO1xyXG5cclxuXHRcdGlmICggcGFyc2VkLnBhZGRpbmdbMF0gPT09IGZhbHNlIHx8IHBhcnNlZC5wYWRkaW5nWzFdID09PSBmYWxzZSApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAncGFkZGluZycgb3B0aW9uIGlzIG9ubHkgc3VwcG9ydGVkIG9uIGxpbmVhciBzbGlkZXJzLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHBhcnNlZC5wYWRkaW5nWzBdIDwgMCB8fCBwYXJzZWQucGFkZGluZ1sxXSA8IDAgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ3BhZGRpbmcnIG9wdGlvbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyKHMpLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHBhcnNlZC5wYWRkaW5nWzBdID49IDUwIHx8IHBhcnNlZC5wYWRkaW5nWzFdID49IDUwICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdwYWRkaW5nJyBvcHRpb24gbXVzdCBiZSBsZXNzIHRoYW4gaGFsZiB0aGUgcmFuZ2UuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdGVzdERpcmVjdGlvbiAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblxyXG5cdFx0Ly8gU2V0IGRpcmVjdGlvbiBhcyBhIG51bWVyaWNhbCB2YWx1ZSBmb3IgZWFzeSBwYXJzaW5nLlxyXG5cdFx0Ly8gSW52ZXJ0IGNvbm5lY3Rpb24gZm9yIFJUTCBzbGlkZXJzLCBzbyB0aGF0IHRoZSBwcm9wZXJcclxuXHRcdC8vIGhhbmRsZXMgZ2V0IHRoZSBjb25uZWN0L2JhY2tncm91bmQgY2xhc3Nlcy5cclxuXHRcdHN3aXRjaCAoIGVudHJ5ICkge1xyXG5cdFx0XHRjYXNlICdsdHInOlxyXG5cdFx0XHRcdHBhcnNlZC5kaXIgPSAwO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdydGwnOlxyXG5cdFx0XHRcdHBhcnNlZC5kaXIgPSAxO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2RpcmVjdGlvbicgb3B0aW9uIHdhcyBub3QgcmVjb2duaXplZC5cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0QmVoYXZpb3VyICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIGlucHV0IGlzIGEgc3RyaW5nLlxyXG5cdFx0aWYgKCB0eXBlb2YgZW50cnkgIT09ICdzdHJpbmcnICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdiZWhhdmlvdXInIG11c3QgYmUgYSBzdHJpbmcgY29udGFpbmluZyBvcHRpb25zLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgc3RyaW5nIGNvbnRhaW5zIGFueSBrZXl3b3Jkcy5cclxuXHRcdC8vIE5vbmUgYXJlIHJlcXVpcmVkLlxyXG5cdFx0dmFyIHRhcCA9IGVudHJ5LmluZGV4T2YoJ3RhcCcpID49IDA7XHJcblx0XHR2YXIgZHJhZyA9IGVudHJ5LmluZGV4T2YoJ2RyYWcnKSA+PSAwO1xyXG5cdFx0dmFyIGZpeGVkID0gZW50cnkuaW5kZXhPZignZml4ZWQnKSA+PSAwO1xyXG5cdFx0dmFyIHNuYXAgPSBlbnRyeS5pbmRleE9mKCdzbmFwJykgPj0gMDtcclxuXHRcdHZhciBob3ZlciA9IGVudHJ5LmluZGV4T2YoJ2hvdmVyJykgPj0gMDtcclxuXHJcblx0XHRpZiAoIGZpeGVkICkge1xyXG5cclxuXHRcdFx0aWYgKCBwYXJzZWQuaGFuZGxlcyAhPT0gMiApIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6ICdmaXhlZCcgYmVoYXZpb3VyIG11c3QgYmUgdXNlZCB3aXRoIDIgaGFuZGxlc1wiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVXNlIG1hcmdpbiB0byBlbmZvcmNlIGZpeGVkIHN0YXRlXHJcblx0XHRcdHRlc3RNYXJnaW4ocGFyc2VkLCBwYXJzZWQuc3RhcnRbMV0gLSBwYXJzZWQuc3RhcnRbMF0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcnNlZC5ldmVudHMgPSB7XHJcblx0XHRcdHRhcDogdGFwIHx8IHNuYXAsXHJcblx0XHRcdGRyYWc6IGRyYWcsXHJcblx0XHRcdGZpeGVkOiBmaXhlZCxcclxuXHRcdFx0c25hcDogc25hcCxcclxuXHRcdFx0aG92ZXI6IGhvdmVyXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdGVzdFRvb2x0aXBzICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHRpZiAoIGVudHJ5ID09PSBmYWxzZSApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2UgaWYgKCBlbnRyeSA9PT0gdHJ1ZSApIHtcclxuXHJcblx0XHRcdHBhcnNlZC50b29sdGlwcyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgcGFyc2VkLmhhbmRsZXM7IGkrKyApIHtcclxuXHRcdFx0XHRwYXJzZWQudG9vbHRpcHMucHVzaCh0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0cGFyc2VkLnRvb2x0aXBzID0gYXNBcnJheShlbnRyeSk7XHJcblxyXG5cdFx0XHRpZiAoIHBhcnNlZC50b29sdGlwcy5sZW5ndGggIT09IHBhcnNlZC5oYW5kbGVzICkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogbXVzdCBwYXNzIGEgZm9ybWF0dGVyIGZvciBhbGwgaGFuZGxlcy5cIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBhcnNlZC50b29sdGlwcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcm1hdHRlcil7XHJcblx0XHRcdFx0aWYgKCB0eXBlb2YgZm9ybWF0dGVyICE9PSAnYm9vbGVhbicgJiYgKHR5cGVvZiBmb3JtYXR0ZXIgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBmb3JtYXR0ZXIudG8gIT09ICdmdW5jdGlvbicpICkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAndG9vbHRpcHMnIG11c3QgYmUgcGFzc2VkIGEgZm9ybWF0dGVyIG9yICdmYWxzZScuXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0QXJpYUZvcm1hdCAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblx0XHRwYXJzZWQuYXJpYUZvcm1hdCA9IGVudHJ5O1xyXG5cdFx0dmFsaWRhdGVGb3JtYXQoZW50cnkpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdGVzdEZvcm1hdCAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblx0XHRwYXJzZWQuZm9ybWF0ID0gZW50cnk7XHJcblx0XHR2YWxpZGF0ZUZvcm1hdChlbnRyeSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0Q3NzUHJlZml4ICggcGFyc2VkLCBlbnRyeSApIHtcclxuXHJcblx0XHRpZiAoIGVudHJ5ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVudHJ5ICE9PSAnc3RyaW5nJyAmJiBlbnRyeSAhPT0gZmFsc2UgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2Nzc1ByZWZpeCcgbXVzdCBiZSBhIHN0cmluZyBvciBgZmFsc2VgLlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRwYXJzZWQuY3NzUHJlZml4ID0gZW50cnk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0ZXN0Q3NzQ2xhc3NlcyAoIHBhcnNlZCwgZW50cnkgKSB7XHJcblxyXG5cdFx0aWYgKCBlbnRyeSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbnRyeSAhPT0gJ29iamVjdCcgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ2Nzc0NsYXNzZXMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHR5cGVvZiBwYXJzZWQuY3NzUHJlZml4ID09PSAnc3RyaW5nJyApIHtcclxuXHRcdFx0cGFyc2VkLmNzc0NsYXNzZXMgPSB7fTtcclxuXHJcblx0XHRcdGZvciAoIHZhciBrZXkgaW4gZW50cnkgKSB7XHJcblx0XHRcdFx0aWYgKCAhZW50cnkuaGFzT3duUHJvcGVydHkoa2V5KSApIHsgY29udGludWU7IH1cclxuXHJcblx0XHRcdFx0cGFyc2VkLmNzc0NsYXNzZXNba2V5XSA9IHBhcnNlZC5jc3NQcmVmaXggKyBlbnRyeVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXJzZWQuY3NzQ2xhc3NlcyA9IGVudHJ5O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gVGVzdCBhbGwgZGV2ZWxvcGVyIHNldHRpbmdzIGFuZCBwYXJzZSB0byBhc3N1bXB0aW9uLXNhZmUgdmFsdWVzLlxyXG5cdGZ1bmN0aW9uIHRlc3RPcHRpb25zICggb3B0aW9ucyApIHtcclxuXHJcblx0XHQvLyBUbyBwcm92ZSBhIGZpeCBmb3IgIzUzNywgZnJlZXplIG9wdGlvbnMgaGVyZS5cclxuXHRcdC8vIElmIHRoZSBvYmplY3QgaXMgbW9kaWZpZWQsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxyXG5cdFx0Ly8gT2JqZWN0LmZyZWV6ZShvcHRpb25zKTtcclxuXHJcblx0XHR2YXIgcGFyc2VkID0ge1xyXG5cdFx0XHRtYXJnaW46IDAsXHJcblx0XHRcdGxpbWl0OiAwLFxyXG5cdFx0XHRwYWRkaW5nOiAwLFxyXG5cdFx0XHRhbmltYXRlOiB0cnVlLFxyXG5cdFx0XHRhbmltYXRpb25EdXJhdGlvbjogMzAwLFxyXG5cdFx0XHRhcmlhRm9ybWF0OiBkZWZhdWx0Rm9ybWF0dGVyLFxyXG5cdFx0XHRmb3JtYXQ6IGRlZmF1bHRGb3JtYXR0ZXJcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gVGVzdHMgYXJlIGV4ZWN1dGVkIGluIHRoZSBvcmRlciB0aGV5IGFyZSBwcmVzZW50ZWQgaGVyZS5cclxuXHRcdHZhciB0ZXN0cyA9IHtcclxuXHRcdFx0J3N0ZXAnOiB7IHI6IGZhbHNlLCB0OiB0ZXN0U3RlcCB9LFxyXG5cdFx0XHQnc3RhcnQnOiB7IHI6IHRydWUsIHQ6IHRlc3RTdGFydCB9LFxyXG5cdFx0XHQnY29ubmVjdCc6IHsgcjogdHJ1ZSwgdDogdGVzdENvbm5lY3QgfSxcclxuXHRcdFx0J2RpcmVjdGlvbic6IHsgcjogdHJ1ZSwgdDogdGVzdERpcmVjdGlvbiB9LFxyXG5cdFx0XHQnc25hcCc6IHsgcjogZmFsc2UsIHQ6IHRlc3RTbmFwIH0sXHJcblx0XHRcdCdhbmltYXRlJzogeyByOiBmYWxzZSwgdDogdGVzdEFuaW1hdGUgfSxcclxuXHRcdFx0J2FuaW1hdGlvbkR1cmF0aW9uJzogeyByOiBmYWxzZSwgdDogdGVzdEFuaW1hdGlvbkR1cmF0aW9uIH0sXHJcblx0XHRcdCdyYW5nZSc6IHsgcjogdHJ1ZSwgdDogdGVzdFJhbmdlIH0sXHJcblx0XHRcdCdvcmllbnRhdGlvbic6IHsgcjogZmFsc2UsIHQ6IHRlc3RPcmllbnRhdGlvbiB9LFxyXG5cdFx0XHQnbWFyZ2luJzogeyByOiBmYWxzZSwgdDogdGVzdE1hcmdpbiB9LFxyXG5cdFx0XHQnbGltaXQnOiB7IHI6IGZhbHNlLCB0OiB0ZXN0TGltaXQgfSxcclxuXHRcdFx0J3BhZGRpbmcnOiB7IHI6IGZhbHNlLCB0OiB0ZXN0UGFkZGluZyB9LFxyXG5cdFx0XHQnYmVoYXZpb3VyJzogeyByOiB0cnVlLCB0OiB0ZXN0QmVoYXZpb3VyIH0sXHJcblx0XHRcdCdhcmlhRm9ybWF0JzogeyByOiBmYWxzZSwgdDogdGVzdEFyaWFGb3JtYXQgfSxcclxuXHRcdFx0J2Zvcm1hdCc6IHsgcjogZmFsc2UsIHQ6IHRlc3RGb3JtYXQgfSxcclxuXHRcdFx0J3Rvb2x0aXBzJzogeyByOiBmYWxzZSwgdDogdGVzdFRvb2x0aXBzIH0sXHJcblx0XHRcdCdjc3NQcmVmaXgnOiB7IHI6IGZhbHNlLCB0OiB0ZXN0Q3NzUHJlZml4IH0sXHJcblx0XHRcdCdjc3NDbGFzc2VzJzogeyByOiBmYWxzZSwgdDogdGVzdENzc0NsYXNzZXMgfVxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgZGVmYXVsdHMgPSB7XHJcblx0XHRcdCdjb25uZWN0JzogZmFsc2UsXHJcblx0XHRcdCdkaXJlY3Rpb24nOiAnbHRyJyxcclxuXHRcdFx0J2JlaGF2aW91cic6ICd0YXAnLFxyXG5cdFx0XHQnb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXHJcblx0XHRcdCdjc3NQcmVmaXgnIDogJ25vVWktJyxcclxuXHRcdFx0J2Nzc0NsYXNzZXMnOiB7XHJcblx0XHRcdFx0dGFyZ2V0OiAndGFyZ2V0JyxcclxuXHRcdFx0XHRiYXNlOiAnYmFzZScsXHJcblx0XHRcdFx0b3JpZ2luOiAnb3JpZ2luJyxcclxuXHRcdFx0XHRoYW5kbGU6ICdoYW5kbGUnLFxyXG5cdFx0XHRcdGhhbmRsZUxvd2VyOiAnaGFuZGxlLWxvd2VyJyxcclxuXHRcdFx0XHRoYW5kbGVVcHBlcjogJ2hhbmRsZS11cHBlcicsXHJcblx0XHRcdFx0aG9yaXpvbnRhbDogJ2hvcml6b250YWwnLFxyXG5cdFx0XHRcdHZlcnRpY2FsOiAndmVydGljYWwnLFxyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICdiYWNrZ3JvdW5kJyxcclxuXHRcdFx0XHRjb25uZWN0OiAnY29ubmVjdCcsXHJcblx0XHRcdFx0Y29ubmVjdHM6ICdjb25uZWN0cycsXHJcblx0XHRcdFx0bHRyOiAnbHRyJyxcclxuXHRcdFx0XHRydGw6ICdydGwnLFxyXG5cdFx0XHRcdGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXHJcblx0XHRcdFx0ZHJhZzogJ3N0YXRlLWRyYWcnLFxyXG5cdFx0XHRcdHRhcDogJ3N0YXRlLXRhcCcsXHJcblx0XHRcdFx0YWN0aXZlOiAnYWN0aXZlJyxcclxuXHRcdFx0XHR0b29sdGlwOiAndG9vbHRpcCcsXHJcblx0XHRcdFx0cGlwczogJ3BpcHMnLFxyXG5cdFx0XHRcdHBpcHNIb3Jpem9udGFsOiAncGlwcy1ob3Jpem9udGFsJyxcclxuXHRcdFx0XHRwaXBzVmVydGljYWw6ICdwaXBzLXZlcnRpY2FsJyxcclxuXHRcdFx0XHRtYXJrZXI6ICdtYXJrZXInLFxyXG5cdFx0XHRcdG1hcmtlckhvcml6b250YWw6ICdtYXJrZXItaG9yaXpvbnRhbCcsXHJcblx0XHRcdFx0bWFya2VyVmVydGljYWw6ICdtYXJrZXItdmVydGljYWwnLFxyXG5cdFx0XHRcdG1hcmtlck5vcm1hbDogJ21hcmtlci1ub3JtYWwnLFxyXG5cdFx0XHRcdG1hcmtlckxhcmdlOiAnbWFya2VyLWxhcmdlJyxcclxuXHRcdFx0XHRtYXJrZXJTdWI6ICdtYXJrZXItc3ViJyxcclxuXHRcdFx0XHR2YWx1ZTogJ3ZhbHVlJyxcclxuXHRcdFx0XHR2YWx1ZUhvcml6b250YWw6ICd2YWx1ZS1ob3Jpem9udGFsJyxcclxuXHRcdFx0XHR2YWx1ZVZlcnRpY2FsOiAndmFsdWUtdmVydGljYWwnLFxyXG5cdFx0XHRcdHZhbHVlTm9ybWFsOiAndmFsdWUtbm9ybWFsJyxcclxuXHRcdFx0XHR2YWx1ZUxhcmdlOiAndmFsdWUtbGFyZ2UnLFxyXG5cdFx0XHRcdHZhbHVlU3ViOiAndmFsdWUtc3ViJ1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEFyaWFGb3JtYXQgZGVmYXVsdHMgdG8gcmVndWxhciBmb3JtYXQsIGlmIGFueS5cclxuXHRcdGlmICggb3B0aW9ucy5mb3JtYXQgJiYgIW9wdGlvbnMuYXJpYUZvcm1hdCApIHtcclxuXHRcdFx0b3B0aW9ucy5hcmlhRm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUnVuIGFsbCBvcHRpb25zIHRocm91Z2ggYSB0ZXN0aW5nIG1lY2hhbmlzbSB0byBlbnN1cmUgY29ycmVjdFxyXG5cdFx0Ly8gaW5wdXQuIEl0IHNob3VsZCBiZSBub3RlZCB0aGF0IG9wdGlvbnMgbWlnaHQgZ2V0IG1vZGlmaWVkIHRvXHJcblx0XHQvLyBiZSBoYW5kbGVkIHByb3Blcmx5LiBFLmcuIHdyYXBwaW5nIGludGVnZXJzIGluIGFycmF5cy5cclxuXHRcdE9iamVjdC5rZXlzKHRlc3RzKS5mb3JFYWNoKGZ1bmN0aW9uKCBuYW1lICl7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGUgb3B0aW9uIGlzbid0IHNldCwgYnV0IGl0IGlzIHJlcXVpcmVkLCB0aHJvdyBhbiBlcnJvci5cclxuXHRcdFx0aWYgKCBvcHRpb25zW25hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdHNbbmFtZV0gPT09IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHRcdFx0aWYgKCB0ZXN0c1tuYW1lXS5yICkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlciAoXCIgKyBWRVJTSU9OICsgXCIpOiAnXCIgKyBuYW1lICsgXCInIGlzIHJlcXVpcmVkLlwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0ZXN0c1tuYW1lXS50KCBwYXJzZWQsIG9wdGlvbnNbbmFtZV0gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRzW25hbWVdIDogb3B0aW9uc1tuYW1lXSApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gRm9yd2FyZCBwaXBzIG9wdGlvbnNcclxuXHRcdHBhcnNlZC5waXBzID0gb3B0aW9ucy5waXBzO1xyXG5cclxuXHRcdC8vIEFsbCByZWNlbnQgYnJvd3NlcnMgYWNjZXB0IHVucHJlZml4ZWQgdHJhbnNmb3JtLlxyXG5cdFx0Ly8gV2UgbmVlZCAtbXMtIGZvciBJRTkgYW5kIC13ZWJraXQtIGZvciBvbGRlciBBbmRyb2lkO1xyXG5cdFx0Ly8gQXNzdW1lIHVzZSBvZiAtd2Via2l0LSBpZiB1bnByZWZpeGVkIGFuZCAtbXMtIGFyZSBub3Qgc3VwcG9ydGVkLlxyXG5cdFx0Ly8gaHR0cHM6Ly9jYW5pdXNlLmNvbS8jZmVhdD10cmFuc2Zvcm1zMmRcclxuXHRcdHZhciBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdHZhciBtc1ByZWZpeCA9IGQuc3R5bGUubXNUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZDtcclxuXHRcdHZhciBub1ByZWZpeCA9IGQuc3R5bGUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0cGFyc2VkLnRyYW5zZm9ybVJ1bGUgPSBub1ByZWZpeCA/ICd0cmFuc2Zvcm0nIDogKG1zUHJlZml4ID8gJ21zVHJhbnNmb3JtJyA6ICd3ZWJraXRUcmFuc2Zvcm0nKTtcclxuXHJcblx0XHQvLyBQaXBzIGRvbid0IG1vdmUsIHNvIHdlIGNhbiBwbGFjZSB0aGVtIHVzaW5nIGxlZnQvdG9wLlxyXG5cdFx0dmFyIHN0eWxlcyA9IFtbJ2xlZnQnLCAndG9wJ10sIFsncmlnaHQnLCAnYm90dG9tJ11dO1xyXG5cclxuXHRcdHBhcnNlZC5zdHlsZSA9IHN0eWxlc1twYXJzZWQuZGlyXVtwYXJzZWQub3J0XTtcclxuXHJcblx0XHRyZXR1cm4gcGFyc2VkO1xyXG5cdH1cclxuXHJcblxyXG5mdW5jdGlvbiBzY29wZSAoIHRhcmdldCwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zICl7XHJcblxyXG5cdHZhciBhY3Rpb25zID0gZ2V0QWN0aW9ucygpO1xyXG5cdHZhciBzdXBwb3J0c1RvdWNoQWN0aW9uTm9uZSA9IGdldFN1cHBvcnRzVG91Y2hBY3Rpb25Ob25lKCk7XHJcblx0dmFyIHN1cHBvcnRzUGFzc2l2ZSA9IHN1cHBvcnRzVG91Y2hBY3Rpb25Ob25lICYmIGdldFN1cHBvcnRzUGFzc2l2ZSgpO1xyXG5cclxuXHQvLyBBbGwgdmFyaWFibGVzIGxvY2FsIHRvICdzY29wZScgYXJlIHByZWZpeGVkIHdpdGggJ3Njb3BlXydcclxuXHR2YXIgc2NvcGVfVGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdHZhciBzY29wZV9Mb2NhdGlvbnMgPSBbXTtcclxuXHR2YXIgc2NvcGVfQmFzZTtcclxuXHR2YXIgc2NvcGVfSGFuZGxlcztcclxuXHR2YXIgc2NvcGVfSGFuZGxlTnVtYmVycyA9IFtdO1xyXG5cdHZhciBzY29wZV9BY3RpdmVIYW5kbGVzQ291bnQgPSAwO1xyXG5cdHZhciBzY29wZV9Db25uZWN0cztcclxuXHR2YXIgc2NvcGVfU3BlY3RydW0gPSBvcHRpb25zLnNwZWN0cnVtO1xyXG5cdHZhciBzY29wZV9WYWx1ZXMgPSBbXTtcclxuXHR2YXIgc2NvcGVfRXZlbnRzID0ge307XHJcblx0dmFyIHNjb3BlX1NlbGY7XHJcblx0dmFyIHNjb3BlX1BpcHM7XHJcblx0dmFyIHNjb3BlX0RvY3VtZW50ID0gdGFyZ2V0Lm93bmVyRG9jdW1lbnQ7XHJcblx0dmFyIHNjb3BlX0RvY3VtZW50RWxlbWVudCA9IHNjb3BlX0RvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHR2YXIgc2NvcGVfQm9keSA9IHNjb3BlX0RvY3VtZW50LmJvZHk7XHJcblxyXG5cclxuXHQvLyBGb3IgaG9yaXpvbnRhbCBzbGlkZXJzIGluIHN0YW5kYXJkIGx0ciBkb2N1bWVudHMsXHJcblx0Ly8gbWFrZSAubm9VaS1vcmlnaW4gb3ZlcmZsb3cgdG8gdGhlIGxlZnQgc28gdGhlIGRvY3VtZW50IGRvZXNuJ3Qgc2Nyb2xsLlxyXG5cdHZhciBzY29wZV9EaXJPZmZzZXQgPSAoc2NvcGVfRG9jdW1lbnQuZGlyID09PSAncnRsJykgfHwgKG9wdGlvbnMub3J0ID09PSAxKSA/IDAgOiAxMDA7XHJcblxyXG4vKiEgSW4gdGhpcyBmaWxlOiBDb25zdHJ1Y3Rpb24gb2YgRE9NIGVsZW1lbnRzOyAqL1xyXG5cclxuXHQvLyBDcmVhdGVzIGEgbm9kZSwgYWRkcyBpdCB0byB0YXJnZXQsIHJldHVybnMgdGhlIG5ldyBub2RlLlxyXG5cdGZ1bmN0aW9uIGFkZE5vZGVUbyAoIGFkZFRhcmdldCwgY2xhc3NOYW1lICkge1xyXG5cclxuXHRcdHZhciBkaXYgPSBzY29wZV9Eb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRpZiAoIGNsYXNzTmFtZSApIHtcclxuXHRcdFx0YWRkQ2xhc3MoZGl2LCBjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFkZFRhcmdldC5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuXHRcdHJldHVybiBkaXY7XHJcblx0fVxyXG5cclxuXHQvLyBBcHBlbmQgYSBvcmlnaW4gdG8gdGhlIGJhc2VcclxuXHRmdW5jdGlvbiBhZGRPcmlnaW4gKCBiYXNlLCBoYW5kbGVOdW1iZXIgKSB7XHJcblxyXG5cdFx0dmFyIG9yaWdpbiA9IGFkZE5vZGVUbyhiYXNlLCBvcHRpb25zLmNzc0NsYXNzZXMub3JpZ2luKTtcclxuXHRcdHZhciBoYW5kbGUgPSBhZGROb2RlVG8ob3JpZ2luLCBvcHRpb25zLmNzc0NsYXNzZXMuaGFuZGxlKTtcclxuXHJcblx0XHRoYW5kbGUuc2V0QXR0cmlidXRlKCdkYXRhLWhhbmRsZScsIGhhbmRsZU51bWJlcik7XHJcblxyXG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9HbG9iYWxfYXR0cmlidXRlcy90YWJpbmRleFxyXG5cdFx0Ly8gMCA9IGZvY3VzYWJsZSBhbmQgcmVhY2hhYmxlXHJcblx0XHRoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XHJcblx0XHRoYW5kbGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3NsaWRlcicpO1xyXG5cdFx0aGFuZGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1vcmllbnRhdGlvbicsIG9wdGlvbnMub3J0ID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyk7XHJcblxyXG5cdFx0aWYgKCBoYW5kbGVOdW1iZXIgPT09IDAgKSB7XHJcblx0XHRcdGFkZENsYXNzKGhhbmRsZSwgb3B0aW9ucy5jc3NDbGFzc2VzLmhhbmRsZUxvd2VyKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIGlmICggaGFuZGxlTnVtYmVyID09PSBvcHRpb25zLmhhbmRsZXMgLSAxICkge1xyXG5cdFx0XHRhZGRDbGFzcyhoYW5kbGUsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5oYW5kbGVVcHBlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9yaWdpbjtcclxuXHR9XHJcblxyXG5cdC8vIEluc2VydCBub2RlcyBmb3IgY29ubmVjdCBlbGVtZW50c1xyXG5cdGZ1bmN0aW9uIGFkZENvbm5lY3QgKCBiYXNlLCBhZGQgKSB7XHJcblxyXG5cdFx0aWYgKCAhYWRkICkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFkZE5vZGVUbyhiYXNlLCBvcHRpb25zLmNzc0NsYXNzZXMuY29ubmVjdCk7XHJcblx0fVxyXG5cclxuXHQvLyBBZGQgaGFuZGxlcyB0byB0aGUgc2xpZGVyIGJhc2UuXHJcblx0ZnVuY3Rpb24gYWRkRWxlbWVudHMgKCBjb25uZWN0T3B0aW9ucywgYmFzZSApIHtcclxuXHJcblx0XHR2YXIgY29ubmVjdEJhc2UgPSBhZGROb2RlVG8oYmFzZSwgb3B0aW9ucy5jc3NDbGFzc2VzLmNvbm5lY3RzKTtcclxuXHJcblx0XHRzY29wZV9IYW5kbGVzID0gW107XHJcblx0XHRzY29wZV9Db25uZWN0cyA9IFtdO1xyXG5cclxuXHRcdHNjb3BlX0Nvbm5lY3RzLnB1c2goYWRkQ29ubmVjdChjb25uZWN0QmFzZSwgY29ubmVjdE9wdGlvbnNbMF0pKTtcclxuXHJcblx0XHQvLyBbOjo6Ok89PT09Tz09PT1PPT09PV1cclxuXHRcdC8vIGNvbm5lY3RPcHRpb25zID0gWzAsIDEsIDEsIDFdXHJcblxyXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5oYW5kbGVzOyBpKysgKSB7XHJcblx0XHRcdC8vIEtlZXAgYSBsaXN0IG9mIGFsbCBhZGRlZCBoYW5kbGVzLlxyXG5cdFx0XHRzY29wZV9IYW5kbGVzLnB1c2goYWRkT3JpZ2luKGJhc2UsIGkpKTtcclxuXHRcdFx0c2NvcGVfSGFuZGxlTnVtYmVyc1tpXSA9IGk7XHJcblx0XHRcdHNjb3BlX0Nvbm5lY3RzLnB1c2goYWRkQ29ubmVjdChjb25uZWN0QmFzZSwgY29ubmVjdE9wdGlvbnNbaSArIDFdKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBJbml0aWFsaXplIGEgc2luZ2xlIHNsaWRlci5cclxuXHRmdW5jdGlvbiBhZGRTbGlkZXIgKCBhZGRUYXJnZXQgKSB7XHJcblxyXG5cdFx0Ly8gQXBwbHkgY2xhc3NlcyBhbmQgZGF0YSB0byB0aGUgdGFyZ2V0LlxyXG5cdFx0YWRkQ2xhc3MoYWRkVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMudGFyZ2V0KTtcclxuXHJcblx0XHRpZiAoIG9wdGlvbnMuZGlyID09PSAwICkge1xyXG5cdFx0XHRhZGRDbGFzcyhhZGRUYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5sdHIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YWRkQ2xhc3MoYWRkVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMucnRsKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIG9wdGlvbnMub3J0ID09PSAwICkge1xyXG5cdFx0XHRhZGRDbGFzcyhhZGRUYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5ob3Jpem9udGFsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFkZENsYXNzKGFkZFRhcmdldCwgb3B0aW9ucy5jc3NDbGFzc2VzLnZlcnRpY2FsKTtcclxuXHRcdH1cclxuXHJcblx0XHRzY29wZV9CYXNlID0gYWRkTm9kZVRvKGFkZFRhcmdldCwgb3B0aW9ucy5jc3NDbGFzc2VzLmJhc2UpO1xyXG5cdH1cclxuXHJcblxyXG5cdGZ1bmN0aW9uIGFkZFRvb2x0aXAgKCBoYW5kbGUsIGhhbmRsZU51bWJlciApIHtcclxuXHJcblx0XHRpZiAoICFvcHRpb25zLnRvb2x0aXBzW2hhbmRsZU51bWJlcl0gKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYWRkTm9kZVRvKGhhbmRsZS5maXJzdENoaWxkLCBvcHRpb25zLmNzc0NsYXNzZXMudG9vbHRpcCk7XHJcblx0fVxyXG5cclxuXHQvLyBUaGUgdG9vbHRpcHMgb3B0aW9uIGlzIGEgc2hvcnRoYW5kIGZvciB1c2luZyB0aGUgJ3VwZGF0ZScgZXZlbnQuXHJcblx0ZnVuY3Rpb24gdG9vbHRpcHMgKCApIHtcclxuXHJcblx0XHQvLyBUb29sdGlwcyBhcmUgYWRkZWQgd2l0aCBvcHRpb25zLnRvb2x0aXBzIGluIG9yaWdpbmFsIG9yZGVyLlxyXG5cdFx0dmFyIHRpcHMgPSBzY29wZV9IYW5kbGVzLm1hcChhZGRUb29sdGlwKTtcclxuXHJcblx0XHRiaW5kRXZlbnQoJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlTnVtYmVyLCB1bmVuY29kZWQpIHtcclxuXHJcblx0XHRcdGlmICggIXRpcHNbaGFuZGxlTnVtYmVyXSApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBmb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlc1toYW5kbGVOdW1iZXJdO1xyXG5cclxuXHRcdFx0aWYgKCBvcHRpb25zLnRvb2x0aXBzW2hhbmRsZU51bWJlcl0gIT09IHRydWUgKSB7XHJcblx0XHRcdFx0Zm9ybWF0dGVkVmFsdWUgPSBvcHRpb25zLnRvb2x0aXBzW2hhbmRsZU51bWJlcl0udG8odW5lbmNvZGVkW2hhbmRsZU51bWJlcl0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aXBzW2hhbmRsZU51bWJlcl0uaW5uZXJIVE1MID0gZm9ybWF0dGVkVmFsdWU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cclxuXHRmdW5jdGlvbiBhcmlhICggKSB7XHJcblxyXG5cdFx0YmluZEV2ZW50KCd1cGRhdGUnLCBmdW5jdGlvbiAoIHZhbHVlcywgaGFuZGxlTnVtYmVyLCB1bmVuY29kZWQsIHRhcCwgcG9zaXRpb25zICkge1xyXG5cclxuXHRcdFx0Ly8gVXBkYXRlIEFyaWEgVmFsdWVzIGZvciBhbGwgaGFuZGxlcywgYXMgYSBjaGFuZ2UgaW4gb25lIGNoYW5nZXMgbWluIGFuZCBtYXggdmFsdWVzIGZvciB0aGUgbmV4dC5cclxuXHRcdFx0c2NvcGVfSGFuZGxlTnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKCBpbmRleCApe1xyXG5cclxuXHRcdFx0XHR2YXIgaGFuZGxlID0gc2NvcGVfSGFuZGxlc1tpbmRleF07XHJcblxyXG5cdFx0XHRcdHZhciBtaW4gPSBjaGVja0hhbmRsZVBvc2l0aW9uKHNjb3BlX0xvY2F0aW9ucywgaW5kZXgsIDAsIHRydWUsIHRydWUsIHRydWUpO1xyXG5cdFx0XHRcdHZhciBtYXggPSBjaGVja0hhbmRsZVBvc2l0aW9uKHNjb3BlX0xvY2F0aW9ucywgaW5kZXgsIDEwMCwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdHZhciBub3cgPSBwb3NpdGlvbnNbaW5kZXhdO1xyXG5cdFx0XHRcdHZhciB0ZXh0ID0gb3B0aW9ucy5hcmlhRm9ybWF0LnRvKHVuZW5jb2RlZFtpbmRleF0pO1xyXG5cclxuXHRcdFx0XHRoYW5kbGUuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbWluJywgbWluLnRvRml4ZWQoMSkpO1xyXG5cdFx0XHRcdGhhbmRsZS5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnLCBtYXgudG9GaXhlZCgxKSk7XHJcblx0XHRcdFx0aGFuZGxlLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIG5vdy50b0ZpeGVkKDEpKTtcclxuXHRcdFx0XHRoYW5kbGUuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsIHRleHQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblxyXG5cdGZ1bmN0aW9uIGdldEdyb3VwICggbW9kZSwgdmFsdWVzLCBzdGVwcGVkICkge1xyXG5cclxuXHRcdC8vIFVzZSB0aGUgcmFuZ2UuXHJcblx0XHRpZiAoIG1vZGUgPT09ICdyYW5nZScgfHwgbW9kZSA9PT0gJ3N0ZXBzJyApIHtcclxuXHRcdFx0cmV0dXJuIHNjb3BlX1NwZWN0cnVtLnhWYWw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBtb2RlID09PSAnY291bnQnICkge1xyXG5cclxuXHRcdFx0aWYgKCB2YWx1ZXMgPCAyICkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogJ3ZhbHVlcycgKD49IDIpIHJlcXVpcmVkIGZvciBtb2RlICdjb3VudCcuXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEaXZpZGUgMCAtIDEwMCBpbiAnY291bnQnIHBhcnRzLlxyXG5cdFx0XHR2YXIgaW50ZXJ2YWwgPSB2YWx1ZXMgLSAxO1xyXG5cdFx0XHR2YXIgc3ByZWFkID0gKCAxMDAgLyBpbnRlcnZhbCApO1xyXG5cclxuXHRcdFx0dmFsdWVzID0gW107XHJcblxyXG5cdFx0XHQvLyBMaXN0IHRoZXNlIHBhcnRzIGFuZCBoYXZlIHRoZW0gaGFuZGxlZCBhcyAncG9zaXRpb25zJy5cclxuXHRcdFx0d2hpbGUgKCBpbnRlcnZhbC0tICkge1xyXG5cdFx0XHRcdHZhbHVlc1sgaW50ZXJ2YWwgXSA9ICggaW50ZXJ2YWwgKiBzcHJlYWQgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFsdWVzLnB1c2goMTAwKTtcclxuXHJcblx0XHRcdG1vZGUgPSAncG9zaXRpb25zJztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIG1vZGUgPT09ICdwb3NpdGlvbnMnICkge1xyXG5cclxuXHRcdFx0Ly8gTWFwIGFsbCBwZXJjZW50YWdlcyB0byBvbi1yYW5nZSB2YWx1ZXMuXHJcblx0XHRcdHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKCB2YWx1ZSApe1xyXG5cdFx0XHRcdHJldHVybiBzY29wZV9TcGVjdHJ1bS5mcm9tU3RlcHBpbmcoIHN0ZXBwZWQgPyBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKCB2YWx1ZSApIDogdmFsdWUgKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBtb2RlID09PSAndmFsdWVzJyApIHtcclxuXHJcblx0XHRcdC8vIElmIHRoZSB2YWx1ZSBtdXN0IGJlIHN0ZXBwZWQsIGl0IG5lZWRzIHRvIGJlIGNvbnZlcnRlZCB0byBhIHBlcmNlbnRhZ2UgZmlyc3QuXHJcblx0XHRcdGlmICggc3RlcHBlZCApIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24oIHZhbHVlICl7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ29udmVydCB0byBwZXJjZW50YWdlLCBhcHBseSBzdGVwLCByZXR1cm4gdG8gdmFsdWUuXHJcblx0XHRcdFx0XHRyZXR1cm4gc2NvcGVfU3BlY3RydW0uZnJvbVN0ZXBwaW5nKCBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKCBzY29wZV9TcGVjdHJ1bS50b1N0ZXBwaW5nKCB2YWx1ZSApICkgKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE90aGVyd2lzZSwgd2UgY2FuIHNpbXBseSB1c2UgdGhlIHZhbHVlcy5cclxuXHRcdFx0cmV0dXJuIHZhbHVlcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdlbmVyYXRlU3ByZWFkICggZGVuc2l0eSwgbW9kZSwgZ3JvdXAgKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2FmZUluY3JlbWVudCh2YWx1ZSwgaW5jcmVtZW50KSB7XHJcblx0XHRcdC8vIEF2b2lkIGZsb2F0aW5nIHBvaW50IHZhcmlhbmNlIGJ5IGRyb3BwaW5nIHRoZSBzbWFsbGVzdCBkZWNpbWFsIHBsYWNlcy5cclxuXHRcdFx0cmV0dXJuICh2YWx1ZSArIGluY3JlbWVudCkudG9GaXhlZCg3KSAvIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGluZGV4ZXMgPSB7fTtcclxuXHRcdHZhciBmaXJzdEluUmFuZ2UgPSBzY29wZV9TcGVjdHJ1bS54VmFsWzBdO1xyXG5cdFx0dmFyIGxhc3RJblJhbmdlID0gc2NvcGVfU3BlY3RydW0ueFZhbFtzY29wZV9TcGVjdHJ1bS54VmFsLmxlbmd0aC0xXTtcclxuXHRcdHZhciBpZ25vcmVGaXJzdCA9IGZhbHNlO1xyXG5cdFx0dmFyIGlnbm9yZUxhc3QgPSBmYWxzZTtcclxuXHRcdHZhciBwcmV2UGN0ID0gMDtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIHRoZSBncm91cCwgc29ydCBpdCBhbmQgZmlsdGVyIGF3YXkgYWxsIGR1cGxpY2F0ZXMuXHJcblx0XHRncm91cCA9IHVuaXF1ZShncm91cC5zbGljZSgpLnNvcnQoZnVuY3Rpb24oYSwgYil7IHJldHVybiBhIC0gYjsgfSkpO1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgcmFuZ2Ugc3RhcnRzIHdpdGggdGhlIGZpcnN0IGVsZW1lbnQuXHJcblx0XHRpZiAoIGdyb3VwWzBdICE9PSBmaXJzdEluUmFuZ2UgKSB7XHJcblx0XHRcdGdyb3VwLnVuc2hpZnQoZmlyc3RJblJhbmdlKTtcclxuXHRcdFx0aWdub3JlRmlyc3QgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIExpa2V3aXNlIGZvciB0aGUgbGFzdCBvbmUuXHJcblx0XHRpZiAoIGdyb3VwW2dyb3VwLmxlbmd0aCAtIDFdICE9PSBsYXN0SW5SYW5nZSApIHtcclxuXHRcdFx0Z3JvdXAucHVzaChsYXN0SW5SYW5nZSk7XHJcblx0XHRcdGlnbm9yZUxhc3QgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdyb3VwLmZvckVhY2goZnVuY3Rpb24gKCBjdXJyZW50LCBpbmRleCApIHtcclxuXHJcblx0XHRcdC8vIEdldCB0aGUgY3VycmVudCBzdGVwIGFuZCB0aGUgbG93ZXIgKyB1cHBlciBwb3NpdGlvbnMuXHJcblx0XHRcdHZhciBzdGVwO1xyXG5cdFx0XHR2YXIgaTtcclxuXHRcdFx0dmFyIHE7XHJcblx0XHRcdHZhciBsb3cgPSBjdXJyZW50O1xyXG5cdFx0XHR2YXIgaGlnaCA9IGdyb3VwW2luZGV4KzFdO1xyXG5cdFx0XHR2YXIgbmV3UGN0O1xyXG5cdFx0XHR2YXIgcGN0RGlmZmVyZW5jZTtcclxuXHRcdFx0dmFyIHBjdFBvcztcclxuXHRcdFx0dmFyIHR5cGU7XHJcblx0XHRcdHZhciBzdGVwcztcclxuXHRcdFx0dmFyIHJlYWxTdGVwcztcclxuXHRcdFx0dmFyIHN0ZXBzaXplO1xyXG5cclxuXHRcdFx0Ly8gV2hlbiB1c2luZyAnc3RlcHMnIG1vZGUsIHVzZSB0aGUgcHJvdmlkZWQgc3RlcHMuXHJcblx0XHRcdC8vIE90aGVyd2lzZSwgd2UnbGwgc3RlcCBvbiB0byB0aGUgbmV4dCBzdWJyYW5nZS5cclxuXHRcdFx0aWYgKCBtb2RlID09PSAnc3RlcHMnICkge1xyXG5cdFx0XHRcdHN0ZXAgPSBzY29wZV9TcGVjdHJ1bS54TnVtU3RlcHNbIGluZGV4IF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERlZmF1bHQgdG8gYSAnZnVsbCcgc3RlcC5cclxuXHRcdFx0aWYgKCAhc3RlcCApIHtcclxuXHRcdFx0XHRzdGVwID0gaGlnaC1sb3c7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvdyBjYW4gYmUgMCwgc28gdGVzdCBmb3IgZmFsc2UuIElmIGhpZ2ggaXMgdW5kZWZpbmVkLFxyXG5cdFx0XHQvLyB3ZSBhcmUgYXQgdGhlIGxhc3Qgc3VicmFuZ2UuIEluZGV4IDAgaXMgYWxyZWFkeSBoYW5kbGVkLlxyXG5cdFx0XHRpZiAoIGxvdyA9PT0gZmFsc2UgfHwgaGlnaCA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTWFrZSBzdXJlIHN0ZXAgaXNuJ3QgMCwgd2hpY2ggd291bGQgY2F1c2UgYW4gaW5maW5pdGUgbG9vcCAoIzY1NClcclxuXHRcdFx0c3RlcCA9IE1hdGgubWF4KHN0ZXAsIDAuMDAwMDAwMSk7XHJcblxyXG5cdFx0XHQvLyBGaW5kIGFsbCBzdGVwcyBpbiB0aGUgc3VicmFuZ2UuXHJcblx0XHRcdGZvciAoIGkgPSBsb3c7IGkgPD0gaGlnaDsgaSA9IHNhZmVJbmNyZW1lbnQoaSwgc3RlcCkgKSB7XHJcblxyXG5cdFx0XHRcdC8vIEdldCB0aGUgcGVyY2VudGFnZSB2YWx1ZSBmb3IgdGhlIGN1cnJlbnQgc3RlcCxcclxuXHRcdFx0XHQvLyBjYWxjdWxhdGUgdGhlIHNpemUgZm9yIHRoZSBzdWJyYW5nZS5cclxuXHRcdFx0XHRuZXdQY3QgPSBzY29wZV9TcGVjdHJ1bS50b1N0ZXBwaW5nKCBpICk7XHJcblx0XHRcdFx0cGN0RGlmZmVyZW5jZSA9IG5ld1BjdCAtIHByZXZQY3Q7XHJcblxyXG5cdFx0XHRcdHN0ZXBzID0gcGN0RGlmZmVyZW5jZSAvIGRlbnNpdHk7XHJcblx0XHRcdFx0cmVhbFN0ZXBzID0gTWF0aC5yb3VuZChzdGVwcyk7XHJcblxyXG5cdFx0XHRcdC8vIFRoaXMgcmF0aW8gcmVwcmVzZW50cyB0aGUgYW1vdW50IG9mIHBlcmNlbnRhZ2Utc3BhY2UgYSBwb2ludCBpbmRpY2F0ZXMuXHJcblx0XHRcdFx0Ly8gRm9yIGEgZGVuc2l0eSAxIHRoZSBwb2ludHMvcGVyY2VudGFnZSA9IDEuIEZvciBkZW5zaXR5IDIsIHRoYXQgcGVyY2VudGFnZSBuZWVkcyB0byBiZSByZS1kZXZpZGVkLlxyXG5cdFx0XHRcdC8vIFJvdW5kIHRoZSBwZXJjZW50YWdlIG9mZnNldCB0byBhbiBldmVuIG51bWJlciwgdGhlbiBkaXZpZGUgYnkgdHdvXHJcblx0XHRcdFx0Ly8gdG8gc3ByZWFkIHRoZSBvZmZzZXQgb24gYm90aCBzaWRlcyBvZiB0aGUgcmFuZ2UuXHJcblx0XHRcdFx0c3RlcHNpemUgPSBwY3REaWZmZXJlbmNlL3JlYWxTdGVwcztcclxuXHJcblx0XHRcdFx0Ly8gRGl2aWRlIGFsbCBwb2ludHMgZXZlbmx5LCBhZGRpbmcgdGhlIGNvcnJlY3QgbnVtYmVyIHRvIHRoaXMgc3VicmFuZ2UuXHJcblx0XHRcdFx0Ly8gUnVuIHVwIHRvIDw9IHNvIHRoYXQgMTAwJSBnZXRzIGEgcG9pbnQsIGV2ZW50IGlmIGlnbm9yZUxhc3QgaXMgc2V0LlxyXG5cdFx0XHRcdGZvciAoIHEgPSAxOyBxIDw9IHJlYWxTdGVwczsgcSArPSAxICkge1xyXG5cclxuXHRcdFx0XHRcdC8vIFRoZSByYXRpbyBiZXR3ZWVuIHRoZSByb3VuZGVkIHZhbHVlIGFuZCB0aGUgYWN0dWFsIHNpemUgbWlnaHQgYmUgfjElIG9mZi5cclxuXHRcdFx0XHRcdC8vIENvcnJlY3QgdGhlIHBlcmNlbnRhZ2Ugb2Zmc2V0IGJ5IHRoZSBudW1iZXIgb2YgcG9pbnRzXHJcblx0XHRcdFx0XHQvLyBwZXIgc3VicmFuZ2UuIGRlbnNpdHkgPSAxIHdpbGwgcmVzdWx0IGluIDEwMCBwb2ludHMgb24gdGhlXHJcblx0XHRcdFx0XHQvLyBmdWxsIHJhbmdlLCAyIGZvciA1MCwgNCBmb3IgMjUsIGV0Yy5cclxuXHRcdFx0XHRcdHBjdFBvcyA9IHByZXZQY3QgKyAoIHEgKiBzdGVwc2l6ZSApO1xyXG5cdFx0XHRcdFx0aW5kZXhlc1twY3RQb3MudG9GaXhlZCg1KV0gPSBbJ3gnLCAwXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIERldGVybWluZSB0aGUgcG9pbnQgdHlwZS5cclxuXHRcdFx0XHR0eXBlID0gKGdyb3VwLmluZGV4T2YoaSkgPiAtMSkgPyAxIDogKCBtb2RlID09PSAnc3RlcHMnID8gMiA6IDAgKTtcclxuXHJcblx0XHRcdFx0Ly8gRW5mb3JjZSB0aGUgJ2lnbm9yZUZpcnN0JyBvcHRpb24gYnkgb3ZlcndyaXRpbmcgdGhlIHR5cGUgZm9yIDAuXHJcblx0XHRcdFx0aWYgKCAhaW5kZXggJiYgaWdub3JlRmlyc3QgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICggIShpID09PSBoaWdoICYmIGlnbm9yZUxhc3QpKSB7XHJcblx0XHRcdFx0XHQvLyBNYXJrIHRoZSAndHlwZScgb2YgdGhpcyBwb2ludC4gMCA9IHBsYWluLCAxID0gcmVhbCB2YWx1ZSwgMiA9IHN0ZXAgdmFsdWUuXHJcblx0XHRcdFx0XHRpbmRleGVzW25ld1BjdC50b0ZpeGVkKDUpXSA9IFtpLCB0eXBlXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFVwZGF0ZSB0aGUgcGVyY2VudGFnZSBjb3VudC5cclxuXHRcdFx0XHRwcmV2UGN0ID0gbmV3UGN0O1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gaW5kZXhlcztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFkZE1hcmtpbmcgKCBzcHJlYWQsIGZpbHRlckZ1bmMsIGZvcm1hdHRlciApIHtcclxuXHJcblx0XHR2YXIgZWxlbWVudCA9IHNjb3BlX0RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdHZhciB2YWx1ZVNpemVDbGFzc2VzID0gW1xyXG5cdFx0XHRvcHRpb25zLmNzc0NsYXNzZXMudmFsdWVOb3JtYWwsXHJcblx0XHRcdG9wdGlvbnMuY3NzQ2xhc3Nlcy52YWx1ZUxhcmdlLFxyXG5cdFx0XHRvcHRpb25zLmNzc0NsYXNzZXMudmFsdWVTdWJcclxuXHRcdF07XHJcblx0XHR2YXIgbWFya2VyU2l6ZUNsYXNzZXMgPSBbXHJcblx0XHRcdG9wdGlvbnMuY3NzQ2xhc3Nlcy5tYXJrZXJOb3JtYWwsXHJcblx0XHRcdG9wdGlvbnMuY3NzQ2xhc3Nlcy5tYXJrZXJMYXJnZSxcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLm1hcmtlclN1YlxyXG5cdFx0XTtcclxuXHRcdHZhciB2YWx1ZU9yaWVudGF0aW9uQ2xhc3NlcyA9IFtcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLnZhbHVlSG9yaXpvbnRhbCxcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLnZhbHVlVmVydGljYWxcclxuXHRcdF07XHJcblx0XHR2YXIgbWFya2VyT3JpZW50YXRpb25DbGFzc2VzID0gW1xyXG5cdFx0XHRvcHRpb25zLmNzc0NsYXNzZXMubWFya2VySG9yaXpvbnRhbCxcclxuXHRcdFx0b3B0aW9ucy5jc3NDbGFzc2VzLm1hcmtlclZlcnRpY2FsXHJcblx0XHRdO1xyXG5cclxuXHRcdGFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5waXBzKTtcclxuXHRcdGFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbnMub3J0ID09PSAwID8gb3B0aW9ucy5jc3NDbGFzc2VzLnBpcHNIb3Jpem9udGFsIDogb3B0aW9ucy5jc3NDbGFzc2VzLnBpcHNWZXJ0aWNhbCk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0Q2xhc3NlcyggdHlwZSwgc291cmNlICl7XHJcblx0XHRcdHZhciBhID0gc291cmNlID09PSBvcHRpb25zLmNzc0NsYXNzZXMudmFsdWU7XHJcblx0XHRcdHZhciBvcmllbnRhdGlvbkNsYXNzZXMgPSBhID8gdmFsdWVPcmllbnRhdGlvbkNsYXNzZXMgOiBtYXJrZXJPcmllbnRhdGlvbkNsYXNzZXM7XHJcblx0XHRcdHZhciBzaXplQ2xhc3NlcyA9IGEgPyB2YWx1ZVNpemVDbGFzc2VzIDogbWFya2VyU2l6ZUNsYXNzZXM7XHJcblxyXG5cdFx0XHRyZXR1cm4gc291cmNlICsgJyAnICsgb3JpZW50YXRpb25DbGFzc2VzW29wdGlvbnMub3J0XSArICcgJyArIHNpemVDbGFzc2VzW3R5cGVdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGFkZFNwcmVhZCAoIG9mZnNldCwgdmFsdWVzICl7XHJcblxyXG5cdFx0XHQvLyBBcHBseSB0aGUgZmlsdGVyIGZ1bmN0aW9uLCBpZiBpdCBpcyBzZXQuXHJcblx0XHRcdHZhbHVlc1sxXSA9ICh2YWx1ZXNbMV0gJiYgZmlsdGVyRnVuYykgPyBmaWx0ZXJGdW5jKHZhbHVlc1swXSwgdmFsdWVzWzFdKSA6IHZhbHVlc1sxXTtcclxuXHJcblx0XHRcdC8vIEFkZCBhIG1hcmtlciBmb3IgZXZlcnkgcG9pbnRcclxuXHRcdFx0dmFyIG5vZGUgPSBhZGROb2RlVG8oZWxlbWVudCwgZmFsc2UpO1xyXG5cdFx0XHRcdG5vZGUuY2xhc3NOYW1lID0gZ2V0Q2xhc3Nlcyh2YWx1ZXNbMV0sIG9wdGlvbnMuY3NzQ2xhc3Nlcy5tYXJrZXIpO1xyXG5cdFx0XHRcdG5vZGUuc3R5bGVbb3B0aW9ucy5zdHlsZV0gPSBvZmZzZXQgKyAnJSc7XHJcblxyXG5cdFx0XHQvLyBWYWx1ZXMgYXJlIG9ubHkgYXBwZW5kZWQgZm9yIHBvaW50cyBtYXJrZWQgJzEnIG9yICcyJy5cclxuXHRcdFx0aWYgKCB2YWx1ZXNbMV0gKSB7XHJcblx0XHRcdFx0bm9kZSA9IGFkZE5vZGVUbyhlbGVtZW50LCBmYWxzZSk7XHJcblx0XHRcdFx0bm9kZS5jbGFzc05hbWUgPSBnZXRDbGFzc2VzKHZhbHVlc1sxXSwgb3B0aW9ucy5jc3NDbGFzc2VzLnZhbHVlKTtcclxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScsIHZhbHVlc1swXSk7XHJcblx0XHRcdFx0bm9kZS5zdHlsZVtvcHRpb25zLnN0eWxlXSA9IG9mZnNldCArICclJztcclxuXHRcdFx0XHRub2RlLmlubmVyVGV4dCA9IGZvcm1hdHRlci50byh2YWx1ZXNbMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXBwZW5kIGFsbCBwb2ludHMuXHJcblx0XHRPYmplY3Qua2V5cyhzcHJlYWQpLmZvckVhY2goZnVuY3Rpb24oYSl7XHJcblx0XHRcdGFkZFNwcmVhZChhLCBzcHJlYWRbYV0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZW1vdmVQaXBzICggKSB7XHJcblx0XHRpZiAoIHNjb3BlX1BpcHMgKSB7XHJcblx0XHRcdHJlbW92ZUVsZW1lbnQoc2NvcGVfUGlwcyk7XHJcblx0XHRcdHNjb3BlX1BpcHMgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGlwcyAoIGdyaWQgKSB7XHJcblxyXG5cdFx0Ly8gRml4ICM2NjlcclxuXHRcdHJlbW92ZVBpcHMoKTtcclxuXHJcblx0XHR2YXIgbW9kZSA9IGdyaWQubW9kZTtcclxuXHRcdHZhciBkZW5zaXR5ID0gZ3JpZC5kZW5zaXR5IHx8IDE7XHJcblx0XHR2YXIgZmlsdGVyID0gZ3JpZC5maWx0ZXIgfHwgZmFsc2U7XHJcblx0XHR2YXIgdmFsdWVzID0gZ3JpZC52YWx1ZXMgfHwgZmFsc2U7XHJcblx0XHR2YXIgc3RlcHBlZCA9IGdyaWQuc3RlcHBlZCB8fCBmYWxzZTtcclxuXHRcdHZhciBncm91cCA9IGdldEdyb3VwKCBtb2RlLCB2YWx1ZXMsIHN0ZXBwZWQgKTtcclxuXHRcdHZhciBzcHJlYWQgPSBnZW5lcmF0ZVNwcmVhZCggZGVuc2l0eSwgbW9kZSwgZ3JvdXAgKTtcclxuXHRcdHZhciBmb3JtYXQgPSBncmlkLmZvcm1hdCB8fCB7XHJcblx0XHRcdHRvOiBNYXRoLnJvdW5kXHJcblx0XHR9O1xyXG5cclxuXHRcdHNjb3BlX1BpcHMgPSBzY29wZV9UYXJnZXQuYXBwZW5kQ2hpbGQoYWRkTWFya2luZyhcclxuXHRcdFx0c3ByZWFkLFxyXG5cdFx0XHRmaWx0ZXIsXHJcblx0XHRcdGZvcm1hdFxyXG5cdFx0KSk7XHJcblxyXG5cdFx0cmV0dXJuIHNjb3BlX1BpcHM7XHJcblx0fVxyXG5cclxuLyohIEluIHRoaXMgZmlsZTogQnJvd3NlciBldmVudHMgKG5vdCBzbGlkZXIgZXZlbnRzIGxpa2Ugc2xpZGUsIGNoYW5nZSk7ICovXHJcblxyXG5cdC8vIFNob3J0aGFuZCBmb3IgYmFzZSBkaW1lbnNpb25zLlxyXG5cdGZ1bmN0aW9uIGJhc2VTaXplICggKSB7XHJcblx0XHR2YXIgcmVjdCA9IHNjb3BlX0Jhc2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR2YXIgYWx0ID0gJ29mZnNldCcgKyBbJ1dpZHRoJywgJ0hlaWdodCddW29wdGlvbnMub3J0XTtcclxuXHRcdHJldHVybiBvcHRpb25zLm9ydCA9PT0gMCA/IChyZWN0LndpZHRofHxzY29wZV9CYXNlW2FsdF0pIDogKHJlY3QuaGVpZ2h0fHxzY29wZV9CYXNlW2FsdF0pO1xyXG5cdH1cclxuXHJcblx0Ly8gSGFuZGxlciBmb3IgYXR0YWNoaW5nIGV2ZW50cyB0cm91Z2ggYSBwcm94eS5cclxuXHRmdW5jdGlvbiBhdHRhY2hFdmVudCAoIGV2ZW50cywgZWxlbWVudCwgY2FsbGJhY2ssIGRhdGEgKSB7XHJcblxyXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byAnZmlsdGVyJyBldmVudHMgdG8gdGhlIHNsaWRlci5cclxuXHRcdC8vIGVsZW1lbnQgaXMgYSBub2RlLCBub3QgYSBub2RlTGlzdFxyXG5cclxuXHRcdHZhciBtZXRob2QgPSBmdW5jdGlvbiAoIGUgKXtcclxuXHJcblx0XHRcdGUgPSBmaXhFdmVudChlLCBkYXRhLnBhZ2VPZmZzZXQsIGRhdGEudGFyZ2V0IHx8IGVsZW1lbnQpO1xyXG5cclxuXHRcdFx0Ly8gZml4RXZlbnQgcmV0dXJucyBmYWxzZSBpZiB0aGlzIGV2ZW50IGhhcyBhIGRpZmZlcmVudCB0YXJnZXRcclxuXHRcdFx0Ly8gd2hlbiBoYW5kbGluZyAobXVsdGktKSB0b3VjaCBldmVudHM7XHJcblx0XHRcdGlmICggIWUgKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBkb05vdFJlamVjdCBpcyBwYXNzZWQgYnkgYWxsIGVuZCBldmVudHMgdG8gbWFrZSBzdXJlIHJlbGVhc2VkIHRvdWNoZXNcclxuXHRcdFx0Ly8gYXJlIG5vdCByZWplY3RlZCwgbGVhdmluZyB0aGUgc2xpZGVyIFwic3R1Y2tcIiB0byB0aGUgY3Vyc29yO1xyXG5cdFx0XHRpZiAoIHNjb3BlX1RhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgJiYgIWRhdGEuZG9Ob3RSZWplY3QgKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTdG9wIGlmIGFuIGFjdGl2ZSAndGFwJyB0cmFuc2l0aW9uIGlzIHRha2luZyBwbGFjZS5cclxuXHRcdFx0aWYgKCBoYXNDbGFzcyhzY29wZV9UYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy50YXApICYmICFkYXRhLmRvTm90UmVqZWN0ICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWdub3JlIHJpZ2h0IG9yIG1pZGRsZSBjbGlja3Mgb24gc3RhcnQgIzQ1NFxyXG5cdFx0XHRpZiAoIGV2ZW50cyA9PT0gYWN0aW9ucy5zdGFydCAmJiBlLmJ1dHRvbnMgIT09IHVuZGVmaW5lZCAmJiBlLmJ1dHRvbnMgPiAxICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWdub3JlIHJpZ2h0IG9yIG1pZGRsZSBjbGlja3Mgb24gc3RhcnQgIzQ1NFxyXG5cdFx0XHRpZiAoIGRhdGEuaG92ZXIgJiYgZS5idXR0b25zICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gJ3N1cHBvcnRzUGFzc2l2ZScgaXMgb25seSB0cnVlIGlmIGEgYnJvd3NlciBhbHNvIHN1cHBvcnRzIHRvdWNoLWFjdGlvbjogbm9uZSBpbiBDU1MuXHJcblx0XHRcdC8vIGlPUyBzYWZhcmkgZG9lcyBub3QsIHNvIGl0IGRvZXNuJ3QgZ2V0IHRvIGJlbmVmaXQgZnJvbSBwYXNzaXZlIHNjcm9sbGluZy4gaU9TIGRvZXMgc3VwcG9ydFxyXG5cdFx0XHQvLyB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbiwgYnV0IHRoYXQgYWxsb3dzIHBhbm5pbmcsIHdoaWNoIGJyZWFrc1xyXG5cdFx0XHQvLyBzbGlkZXJzIGFmdGVyIHpvb21pbmcvb24gbm9uLXJlc3BvbnNpdmUgcGFnZXMuXHJcblx0XHRcdC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzMzExMlxyXG5cdFx0XHRpZiAoICFzdXBwb3J0c1Bhc3NpdmUgKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlLmNhbGNQb2ludCA9IGUucG9pbnRzWyBvcHRpb25zLm9ydCBdO1xyXG5cclxuXHRcdFx0Ly8gQ2FsbCB0aGUgZXZlbnQgaGFuZGxlciB3aXRoIHRoZSBldmVudCBbIGFuZCBhZGRpdGlvbmFsIGRhdGEgXS5cclxuXHRcdFx0Y2FsbGJhY2sgKCBlLCBkYXRhICk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtZXRob2RzID0gW107XHJcblxyXG5cdFx0Ly8gQmluZCBhIGNsb3N1cmUgb24gdGhlIHRhcmdldCBmb3IgZXZlcnkgZXZlbnQgdHlwZS5cclxuXHRcdGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24oIGV2ZW50TmFtZSApe1xyXG5cdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBtZXRob2QsIHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2UpO1xyXG5cdFx0XHRtZXRob2RzLnB1c2goW2V2ZW50TmFtZSwgbWV0aG9kXSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gbWV0aG9kcztcclxuXHR9XHJcblxyXG5cdC8vIFByb3ZpZGUgYSBjbGVhbiBldmVudCB3aXRoIHN0YW5kYXJkaXplZCBvZmZzZXQgdmFsdWVzLlxyXG5cdGZ1bmN0aW9uIGZpeEV2ZW50ICggZSwgcGFnZU9mZnNldCwgZXZlbnRUYXJnZXQgKSB7XHJcblxyXG5cdFx0Ly8gRmlsdGVyIHRoZSBldmVudCB0byByZWdpc3RlciB0aGUgdHlwZSwgd2hpY2ggY2FuIGJlXHJcblx0XHQvLyB0b3VjaCwgbW91c2Ugb3IgcG9pbnRlci4gT2Zmc2V0IGNoYW5nZXMgbmVlZCB0byBiZVxyXG5cdFx0Ly8gbWFkZSBvbiBhbiBldmVudCBzcGVjaWZpYyBiYXNpcy5cclxuXHRcdHZhciB0b3VjaCA9IGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAwO1xyXG5cdFx0dmFyIG1vdXNlID0gZS50eXBlLmluZGV4T2YoJ21vdXNlJykgPT09IDA7XHJcblx0XHR2YXIgcG9pbnRlciA9IGUudHlwZS5pbmRleE9mKCdwb2ludGVyJykgPT09IDA7XHJcblxyXG5cdFx0dmFyIHg7XHJcblx0XHR2YXIgeTtcclxuXHJcblx0XHQvLyBJRTEwIGltcGxlbWVudGVkIHBvaW50ZXIgZXZlbnRzIHdpdGggYSBwcmVmaXg7XHJcblx0XHRpZiAoIGUudHlwZS5pbmRleE9mKCdNU1BvaW50ZXInKSA9PT0gMCApIHtcclxuXHRcdFx0cG9pbnRlciA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSW4gdGhlIGV2ZW50IHRoYXQgbXVsdGl0b3VjaCBpcyBhY3RpdmF0ZWQsIHRoZSBvbmx5IHRoaW5nIG9uZSBoYW5kbGUgc2hvdWxkIGJlIGNvbmNlcm5lZFxyXG5cdFx0Ly8gYWJvdXQgaXMgdGhlIHRvdWNoZXMgdGhhdCBvcmlnaW5hdGVkIG9uIHRvcCBvZiBpdC5cclxuXHRcdGlmICggdG91Y2ggKSB7XHJcblxyXG5cdFx0XHQvLyBSZXR1cm5zIHRydWUgaWYgYSB0b3VjaCBvcmlnaW5hdGVkIG9uIHRoZSB0YXJnZXQuXHJcblx0XHRcdHZhciBpc1RvdWNoT25UYXJnZXQgPSBmdW5jdGlvbiAoY2hlY2tUb3VjaCkge1xyXG5cdFx0XHRcdHJldHVybiBjaGVja1RvdWNoLnRhcmdldCA9PT0gZXZlbnRUYXJnZXQgfHwgZXZlbnRUYXJnZXQuY29udGFpbnMoY2hlY2tUb3VjaC50YXJnZXQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gSW4gdGhlIGNhc2Ugb2YgdG91Y2hzdGFydCBldmVudHMsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIHN0aWxsIG5vIG1vcmUgdGhhbiBvbmVcclxuXHRcdFx0Ly8gdG91Y2ggb24gdGhlIHRhcmdldCBzbyB3ZSBsb29rIGFtb25nc3QgYWxsIHRvdWNoZXMuXHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG5cclxuXHRcdFx0XHR2YXIgdGFyZ2V0VG91Y2hlcyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlLnRvdWNoZXMsIGlzVG91Y2hPblRhcmdldCk7XHJcblxyXG5cdFx0XHRcdC8vIERvIG5vdCBzdXBwb3J0IG1vcmUgdGhhbiBvbmUgdG91Y2ggcGVyIGhhbmRsZS5cclxuXHRcdFx0XHRpZiAoIHRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSApIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHggPSB0YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdHkgPSB0YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gSW4gdGhlIG90aGVyIGNhc2VzLCBmaW5kIG9uIGNoYW5nZWRUb3VjaGVzIGlzIGVub3VnaC5cclxuXHRcdFx0XHR2YXIgdGFyZ2V0VG91Y2ggPSBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKGUuY2hhbmdlZFRvdWNoZXMsIGlzVG91Y2hPblRhcmdldCk7XHJcblxyXG5cdFx0XHRcdC8vIENhbmNlbCBpZiB0aGUgdGFyZ2V0IHRvdWNoIGhhcyBub3QgbW92ZWQuXHJcblx0XHRcdFx0aWYgKCAhdGFyZ2V0VG91Y2ggKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR4ID0gdGFyZ2V0VG91Y2gucGFnZVg7XHJcblx0XHRcdFx0eSA9IHRhcmdldFRvdWNoLnBhZ2VZO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cGFnZU9mZnNldCA9IHBhZ2VPZmZzZXQgfHwgZ2V0UGFnZU9mZnNldChzY29wZV9Eb2N1bWVudCk7XHJcblxyXG5cdFx0aWYgKCBtb3VzZSB8fCBwb2ludGVyICkge1xyXG5cdFx0XHR4ID0gZS5jbGllbnRYICsgcGFnZU9mZnNldC54O1xyXG5cdFx0XHR5ID0gZS5jbGllbnRZICsgcGFnZU9mZnNldC55O1xyXG5cdFx0fVxyXG5cclxuXHRcdGUucGFnZU9mZnNldCA9IHBhZ2VPZmZzZXQ7XHJcblx0XHRlLnBvaW50cyA9IFt4LCB5XTtcclxuXHRcdGUuY3Vyc29yID0gbW91c2UgfHwgcG9pbnRlcjsgLy8gRml4ICM0MzVcclxuXHJcblx0XHRyZXR1cm4gZTtcclxuXHR9XHJcblxyXG5cdC8vIFRyYW5zbGF0ZSBhIGNvb3JkaW5hdGUgaW4gdGhlIGRvY3VtZW50IHRvIGEgcGVyY2VudGFnZSBvbiB0aGUgc2xpZGVyXHJcblx0ZnVuY3Rpb24gY2FsY1BvaW50VG9QZXJjZW50YWdlICggY2FsY1BvaW50ICkge1xyXG5cdFx0dmFyIGxvY2F0aW9uID0gY2FsY1BvaW50IC0gb2Zmc2V0KHNjb3BlX0Jhc2UsIG9wdGlvbnMub3J0KTtcclxuXHRcdHZhciBwcm9wb3NhbCA9ICggbG9jYXRpb24gKiAxMDAgKSAvIGJhc2VTaXplKCk7XHJcblxyXG5cdFx0Ly8gQ2xhbXAgcHJvcG9zYWwgYmV0d2VlbiAwJSBhbmQgMTAwJVxyXG5cdFx0Ly8gT3V0LW9mLWJvdW5kIGNvb3JkaW5hdGVzIG1heSBvY2N1ciB3aGVuIC5ub1VpLWJhc2UgcHNldWRvLWVsZW1lbnRzXHJcblx0XHQvLyBhcmUgdXNlZCAoZS5nLiBjb250YWluZWQgaGFuZGxlcyBmZWF0dXJlKVxyXG5cdFx0cHJvcG9zYWwgPSBsaW1pdChwcm9wb3NhbCk7XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbnMuZGlyID8gMTAwIC0gcHJvcG9zYWwgOiBwcm9wb3NhbDtcclxuXHR9XHJcblxyXG5cdC8vIEZpbmQgaGFuZGxlIGNsb3Nlc3QgdG8gYSBjZXJ0YWluIHBlcmNlbnRhZ2Ugb24gdGhlIHNsaWRlclxyXG5cdGZ1bmN0aW9uIGdldENsb3Nlc3RIYW5kbGUgKCBwcm9wb3NhbCApIHtcclxuXHJcblx0XHR2YXIgY2xvc2VzdCA9IDEwMDtcclxuXHRcdHZhciBoYW5kbGVOdW1iZXIgPSBmYWxzZTtcclxuXHJcblx0XHRzY29wZV9IYW5kbGVzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlLCBpbmRleCl7XHJcblxyXG5cdFx0XHQvLyBEaXNhYmxlZCBoYW5kbGVzIGFyZSBpZ25vcmVkXHJcblx0XHRcdGlmICggaGFuZGxlLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwb3MgPSBNYXRoLmFicyhzY29wZV9Mb2NhdGlvbnNbaW5kZXhdIC0gcHJvcG9zYWwpO1xyXG5cclxuXHRcdFx0aWYgKCBwb3MgPCBjbG9zZXN0IHx8IChwb3MgPT09IDEwMCAmJiBjbG9zZXN0ID09PSAxMDApICkge1xyXG5cdFx0XHRcdGhhbmRsZU51bWJlciA9IGluZGV4O1xyXG5cdFx0XHRcdGNsb3Nlc3QgPSBwb3M7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBoYW5kbGVOdW1iZXI7XHJcblx0fVxyXG5cclxuXHQvLyBGaXJlICdlbmQnIHdoZW4gYSBtb3VzZSBvciBwZW4gbGVhdmVzIHRoZSBkb2N1bWVudC5cclxuXHRmdW5jdGlvbiBkb2N1bWVudExlYXZlICggZXZlbnQsIGRhdGEgKSB7XHJcblx0XHRpZiAoIGV2ZW50LnR5cGUgPT09IFwibW91c2VvdXRcIiAmJiBldmVudC50YXJnZXQubm9kZU5hbWUgPT09IFwiSFRNTFwiICYmIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IG51bGwgKXtcclxuXHRcdFx0ZXZlbnRFbmQgKGV2ZW50LCBkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIEhhbmRsZSBtb3ZlbWVudCBvbiBkb2N1bWVudCBmb3IgaGFuZGxlIGFuZCByYW5nZSBkcmFnLlxyXG5cdGZ1bmN0aW9uIGV2ZW50TW92ZSAoIGV2ZW50LCBkYXRhICkge1xyXG5cclxuXHRcdC8vIEZpeCAjNDk4XHJcblx0XHQvLyBDaGVjayB2YWx1ZSBvZiAuYnV0dG9ucyBpbiAnc3RhcnQnIHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluIElFMTAgbW9iaWxlIChkYXRhLmJ1dHRvbnNQcm9wZXJ0eSkuXHJcblx0XHQvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzkyNzAwNS9tb2JpbGUtaWUxMC13aW5kb3dzLXBob25lLWJ1dHRvbnMtcHJvcGVydHktb2YtcG9pbnRlcm1vdmUtZXZlbnQtYWx3YXlzLXplcm9cclxuXHRcdC8vIElFOSBoYXMgLmJ1dHRvbnMgYW5kIC53aGljaCB6ZXJvIG9uIG1vdXNlbW92ZS5cclxuXHRcdC8vIEZpcmVmb3ggYnJlYWtzIHRoZSBzcGVjIE1ETiBkZWZpbmVzLlxyXG5cdFx0aWYgKCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTVNJRSA5XCIpID09PSAtMSAmJiBldmVudC5idXR0b25zID09PSAwICYmIGRhdGEuYnV0dG9uc1Byb3BlcnR5ICE9PSAwICkge1xyXG5cdFx0XHRyZXR1cm4gZXZlbnRFbmQoZXZlbnQsIGRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHdlIGFyZSBtb3ZpbmcgdXAgb3IgZG93blxyXG5cdFx0dmFyIG1vdmVtZW50ID0gKG9wdGlvbnMuZGlyID8gLTEgOiAxKSAqIChldmVudC5jYWxjUG9pbnQgLSBkYXRhLnN0YXJ0Q2FsY1BvaW50KTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IHRoZSBtb3ZlbWVudCBpbnRvIGEgcGVyY2VudGFnZSBvZiB0aGUgc2xpZGVyIHdpZHRoL2hlaWdodFxyXG5cdFx0dmFyIHByb3Bvc2FsID0gKG1vdmVtZW50ICogMTAwKSAvIGRhdGEuYmFzZVNpemU7XHJcblxyXG5cdFx0bW92ZUhhbmRsZXMobW92ZW1lbnQgPiAwLCBwcm9wb3NhbCwgZGF0YS5sb2NhdGlvbnMsIGRhdGEuaGFuZGxlTnVtYmVycyk7XHJcblx0fVxyXG5cclxuXHQvLyBVbmJpbmQgbW92ZSBldmVudHMgb24gZG9jdW1lbnQsIGNhbGwgY2FsbGJhY2tzLlxyXG5cdGZ1bmN0aW9uIGV2ZW50RW5kICggZXZlbnQsIGRhdGEgKSB7XHJcblxyXG5cdFx0Ly8gVGhlIGhhbmRsZSBpcyBubyBsb25nZXIgYWN0aXZlLCBzbyByZW1vdmUgdGhlIGNsYXNzLlxyXG5cdFx0aWYgKCBkYXRhLmhhbmRsZSApIHtcclxuXHRcdFx0cmVtb3ZlQ2xhc3MoZGF0YS5oYW5kbGUsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5hY3RpdmUpO1xyXG5cdFx0XHRzY29wZV9BY3RpdmVIYW5kbGVzQ291bnQgLT0gMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBVbmJpbmQgdGhlIG1vdmUgYW5kIGVuZCBldmVudHMsIHdoaWNoIGFyZSBhZGRlZCBvbiAnc3RhcnQnLlxyXG5cdFx0ZGF0YS5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiggYyApIHtcclxuXHRcdFx0c2NvcGVfRG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoY1swXSwgY1sxXSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIHNjb3BlX0FjdGl2ZUhhbmRsZXNDb3VudCA9PT0gMCApIHtcclxuXHRcdFx0Ly8gUmVtb3ZlIGRyYWdnaW5nIGNsYXNzLlxyXG5cdFx0XHRyZW1vdmVDbGFzcyhzY29wZV9UYXJnZXQsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5kcmFnKTtcclxuXHRcdFx0c2V0WmluZGV4KCk7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgY3Vyc29yIHN0eWxlcyBhbmQgdGV4dC1zZWxlY3Rpb24gZXZlbnRzIGJvdW5kIHRvIHRoZSBib2R5LlxyXG5cdFx0XHRpZiAoIGV2ZW50LmN1cnNvciApIHtcclxuXHRcdFx0XHRzY29wZV9Cb2R5LnN0eWxlLmN1cnNvciA9ICcnO1xyXG5cdFx0XHRcdHNjb3BlX0JvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLCBwcmV2ZW50RGVmYXVsdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkYXRhLmhhbmRsZU51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVOdW1iZXIpe1xyXG5cdFx0XHRmaXJlRXZlbnQoJ2NoYW5nZScsIGhhbmRsZU51bWJlcik7XHJcblx0XHRcdGZpcmVFdmVudCgnc2V0JywgaGFuZGxlTnVtYmVyKTtcclxuXHRcdFx0ZmlyZUV2ZW50KCdlbmQnLCBoYW5kbGVOdW1iZXIpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyBCaW5kIG1vdmUgZXZlbnRzIG9uIGRvY3VtZW50LlxyXG5cdGZ1bmN0aW9uIGV2ZW50U3RhcnQgKCBldmVudCwgZGF0YSApIHtcclxuXHJcblx0XHR2YXIgaGFuZGxlO1xyXG5cdFx0aWYgKCBkYXRhLmhhbmRsZU51bWJlcnMubGVuZ3RoID09PSAxICkge1xyXG5cclxuXHRcdFx0dmFyIGhhbmRsZU9yaWdpbiA9IHNjb3BlX0hhbmRsZXNbZGF0YS5oYW5kbGVOdW1iZXJzWzBdXTtcclxuXHJcblx0XHRcdC8vIElnbm9yZSAnZGlzYWJsZWQnIGhhbmRsZXNcclxuXHRcdFx0aWYgKCBoYW5kbGVPcmlnaW4uaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpICkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aGFuZGxlID0gaGFuZGxlT3JpZ2luLmNoaWxkcmVuWzBdO1xyXG5cdFx0XHRzY29wZV9BY3RpdmVIYW5kbGVzQ291bnQgKz0gMTtcclxuXHJcblx0XHRcdC8vIE1hcmsgdGhlIGhhbmRsZSBhcyAnYWN0aXZlJyBzbyBpdCBjYW4gYmUgc3R5bGVkLlxyXG5cdFx0XHRhZGRDbGFzcyhoYW5kbGUsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5hY3RpdmUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEEgZHJhZyBzaG91bGQgbmV2ZXIgcHJvcGFnYXRlIHVwIHRvIHRoZSAndGFwJyBldmVudC5cclxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdC8vIFJlY29yZCB0aGUgZXZlbnQgbGlzdGVuZXJzLlxyXG5cdFx0dmFyIGxpc3RlbmVycyA9IFtdO1xyXG5cclxuXHRcdC8vIEF0dGFjaCB0aGUgbW92ZSBhbmQgZW5kIGV2ZW50cy5cclxuXHRcdHZhciBtb3ZlRXZlbnQgPSBhdHRhY2hFdmVudChhY3Rpb25zLm1vdmUsIHNjb3BlX0RvY3VtZW50RWxlbWVudCwgZXZlbnRNb3ZlLCB7XHJcblx0XHRcdC8vIFRoZSBldmVudCB0YXJnZXQgaGFzIGNoYW5nZWQgc28gd2UgbmVlZCB0byBwcm9wYWdhdGUgdGhlIG9yaWdpbmFsIG9uZSBzbyB0aGF0IHdlIGtlZXBcclxuXHRcdFx0Ly8gcmVseWluZyBvbiBpdCB0byBleHRyYWN0IHRhcmdldCB0b3VjaGVzLlxyXG5cdFx0XHR0YXJnZXQ6IGV2ZW50LnRhcmdldCxcclxuXHRcdFx0aGFuZGxlOiBoYW5kbGUsXHJcblx0XHRcdGxpc3RlbmVyczogbGlzdGVuZXJzLFxyXG5cdFx0XHRzdGFydENhbGNQb2ludDogZXZlbnQuY2FsY1BvaW50LFxyXG5cdFx0XHRiYXNlU2l6ZTogYmFzZVNpemUoKSxcclxuXHRcdFx0cGFnZU9mZnNldDogZXZlbnQucGFnZU9mZnNldCxcclxuXHRcdFx0aGFuZGxlTnVtYmVyczogZGF0YS5oYW5kbGVOdW1iZXJzLFxyXG5cdFx0XHRidXR0b25zUHJvcGVydHk6IGV2ZW50LmJ1dHRvbnMsXHJcblx0XHRcdGxvY2F0aW9uczogc2NvcGVfTG9jYXRpb25zLnNsaWNlKClcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBlbmRFdmVudCA9IGF0dGFjaEV2ZW50KGFjdGlvbnMuZW5kLCBzY29wZV9Eb2N1bWVudEVsZW1lbnQsIGV2ZW50RW5kLCB7XHJcblx0XHRcdHRhcmdldDogZXZlbnQudGFyZ2V0LFxyXG5cdFx0XHRoYW5kbGU6IGhhbmRsZSxcclxuXHRcdFx0bGlzdGVuZXJzOiBsaXN0ZW5lcnMsXHJcblx0XHRcdGRvTm90UmVqZWN0OiB0cnVlLFxyXG5cdFx0XHRoYW5kbGVOdW1iZXJzOiBkYXRhLmhhbmRsZU51bWJlcnNcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBvdXRFdmVudCA9IGF0dGFjaEV2ZW50KFwibW91c2VvdXRcIiwgc2NvcGVfRG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudExlYXZlLCB7XHJcblx0XHRcdHRhcmdldDogZXZlbnQudGFyZ2V0LFxyXG5cdFx0XHRoYW5kbGU6IGhhbmRsZSxcclxuXHRcdFx0bGlzdGVuZXJzOiBsaXN0ZW5lcnMsXHJcblx0XHRcdGRvTm90UmVqZWN0OiB0cnVlLFxyXG5cdFx0XHRoYW5kbGVOdW1iZXJzOiBkYXRhLmhhbmRsZU51bWJlcnNcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFdlIHdhbnQgdG8gbWFrZSBzdXJlIHdlIHB1c2hlZCB0aGUgbGlzdGVuZXJzIGluIHRoZSBsaXN0ZW5lciBsaXN0IHJhdGhlciB0aGFuIGNyZWF0aW5nXHJcblx0XHQvLyBhIG5ldyBvbmUgYXMgaXQgaGFzIGFscmVhZHkgYmVlbiBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0bGlzdGVuZXJzLnB1c2guYXBwbHkobGlzdGVuZXJzLCBtb3ZlRXZlbnQuY29uY2F0KGVuZEV2ZW50LCBvdXRFdmVudCkpO1xyXG5cclxuXHRcdC8vIFRleHQgc2VsZWN0aW9uIGlzbid0IGFuIGlzc3VlIG9uIHRvdWNoIGRldmljZXMsXHJcblx0XHQvLyBzbyBhZGRpbmcgY3Vyc29yIHN0eWxlcyBjYW4gYmUgc2tpcHBlZC5cclxuXHRcdGlmICggZXZlbnQuY3Vyc29yICkge1xyXG5cclxuXHRcdFx0Ly8gUHJldmVudCB0aGUgJ0knIGN1cnNvciBhbmQgZXh0ZW5kIHRoZSByYW5nZS1kcmFnIGN1cnNvci5cclxuXHRcdFx0c2NvcGVfQm9keS5zdHlsZS5jdXJzb3IgPSBnZXRDb21wdXRlZFN0eWxlKGV2ZW50LnRhcmdldCkuY3Vyc29yO1xyXG5cclxuXHRcdFx0Ly8gTWFyayB0aGUgdGFyZ2V0IHdpdGggYSBkcmFnZ2luZyBzdGF0ZS5cclxuXHRcdFx0aWYgKCBzY29wZV9IYW5kbGVzLmxlbmd0aCA+IDEgKSB7XHJcblx0XHRcdFx0YWRkQ2xhc3Moc2NvcGVfVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMuZHJhZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFByZXZlbnQgdGV4dCBzZWxlY3Rpb24gd2hlbiBkcmFnZ2luZyB0aGUgaGFuZGxlcy5cclxuXHRcdFx0Ly8gSW4gbm9VaVNsaWRlciA8PSA5LjIuMCwgdGhpcyB3YXMgaGFuZGxlZCBieSBjYWxsaW5nIHByZXZlbnREZWZhdWx0IG9uIG1vdXNlL3RvdWNoIHN0YXJ0L21vdmUsXHJcblx0XHRcdC8vIHdoaWNoIGlzIHNjcm9sbCBibG9ja2luZy4gVGhlIHNlbGVjdHN0YXJ0IGV2ZW50IGlzIHN1cHBvcnRlZCBieSBGaXJlRm94IHN0YXJ0aW5nIGZyb20gdmVyc2lvbiA1MixcclxuXHRcdFx0Ly8gbWVhbmluZyB0aGUgb25seSBob2xkb3V0IGlzIGlPUyBTYWZhcmkuIFRoaXMgZG9lc24ndCBtYXR0ZXI6IHRleHQgc2VsZWN0aW9uIGlzbid0IHRyaWdnZXJlZCB0aGVyZS5cclxuXHRcdFx0Ly8gVGhlICdjdXJzb3InIGZsYWcgaXMgZmFsc2UuXHJcblx0XHRcdC8vIFNlZTogaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9c2VsZWN0c3RhcnRcclxuXHRcdFx0c2NvcGVfQm9keS5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3RzdGFydCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YS5oYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcclxuXHRcdFx0ZmlyZUV2ZW50KCdzdGFydCcsIGhhbmRsZU51bWJlcik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vIE1vdmUgY2xvc2VzdCBoYW5kbGUgdG8gdGFwcGVkIGxvY2F0aW9uLlxyXG5cdGZ1bmN0aW9uIGV2ZW50VGFwICggZXZlbnQgKSB7XHJcblxyXG5cdFx0Ly8gVGhlIHRhcCBldmVudCBzaG91bGRuJ3QgcHJvcGFnYXRlIHVwXHJcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHR2YXIgcHJvcG9zYWwgPSBjYWxjUG9pbnRUb1BlcmNlbnRhZ2UoZXZlbnQuY2FsY1BvaW50KTtcclxuXHRcdHZhciBoYW5kbGVOdW1iZXIgPSBnZXRDbG9zZXN0SGFuZGxlKHByb3Bvc2FsKTtcclxuXHJcblx0XHQvLyBUYWNrbGUgdGhlIGNhc2UgdGhhdCBhbGwgaGFuZGxlcyBhcmUgJ2Rpc2FibGVkJy5cclxuXHRcdGlmICggaGFuZGxlTnVtYmVyID09PSBmYWxzZSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEZsYWcgdGhlIHNsaWRlciBhcyBpdCBpcyBub3cgaW4gYSB0cmFuc2l0aW9uYWwgc3RhdGUuXHJcblx0XHQvLyBUcmFuc2l0aW9uIHRha2VzIGEgY29uZmlndXJhYmxlIGFtb3VudCBvZiBtcyAoZGVmYXVsdCAzMDApLiBSZS1lbmFibGUgdGhlIHNsaWRlciBhZnRlciB0aGF0LlxyXG5cdFx0aWYgKCAhb3B0aW9ucy5ldmVudHMuc25hcCApIHtcclxuXHRcdFx0YWRkQ2xhc3NGb3Ioc2NvcGVfVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXMudGFwLCBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRIYW5kbGUoaGFuZGxlTnVtYmVyLCBwcm9wb3NhbCwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0c2V0WmluZGV4KCk7XHJcblxyXG5cdFx0ZmlyZUV2ZW50KCdzbGlkZScsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRmaXJlRXZlbnQoJ3VwZGF0ZScsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRmaXJlRXZlbnQoJ2NoYW5nZScsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblx0XHRmaXJlRXZlbnQoJ3NldCcsIGhhbmRsZU51bWJlciwgdHJ1ZSk7XHJcblxyXG5cdFx0aWYgKCBvcHRpb25zLmV2ZW50cy5zbmFwICkge1xyXG5cdFx0XHRldmVudFN0YXJ0KGV2ZW50LCB7IGhhbmRsZU51bWJlcnM6IFtoYW5kbGVOdW1iZXJdIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gRmlyZXMgYSAnaG92ZXInIGV2ZW50IGZvciBhIGhvdmVyZWQgbW91c2UvcGVuIHBvc2l0aW9uLlxyXG5cdGZ1bmN0aW9uIGV2ZW50SG92ZXIgKCBldmVudCApIHtcclxuXHJcblx0XHR2YXIgcHJvcG9zYWwgPSBjYWxjUG9pbnRUb1BlcmNlbnRhZ2UoZXZlbnQuY2FsY1BvaW50KTtcclxuXHJcblx0XHR2YXIgdG8gPSBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKHByb3Bvc2FsKTtcclxuXHRcdHZhciB2YWx1ZSA9IHNjb3BlX1NwZWN0cnVtLmZyb21TdGVwcGluZyh0byk7XHJcblxyXG5cdFx0T2JqZWN0LmtleXMoc2NvcGVfRXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKCB0YXJnZXRFdmVudCApIHtcclxuXHRcdFx0aWYgKCAnaG92ZXInID09PSB0YXJnZXRFdmVudC5zcGxpdCgnLicpWzBdICkge1xyXG5cdFx0XHRcdHNjb3BlX0V2ZW50c1t0YXJnZXRFdmVudF0uZm9yRWFjaChmdW5jdGlvbiggY2FsbGJhY2sgKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKCBzY29wZV9TZWxmLCB2YWx1ZSApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vIEF0dGFjaCBldmVudHMgdG8gc2V2ZXJhbCBzbGlkZXIgcGFydHMuXHJcblx0ZnVuY3Rpb24gYmluZFNsaWRlckV2ZW50cyAoIGJlaGF2aW91ciApIHtcclxuXHJcblx0XHQvLyBBdHRhY2ggdGhlIHN0YW5kYXJkIGRyYWcgZXZlbnQgdG8gdGhlIGhhbmRsZXMuXHJcblx0XHRpZiAoICFiZWhhdmlvdXIuZml4ZWQgKSB7XHJcblxyXG5cdFx0XHRzY29wZV9IYW5kbGVzLmZvckVhY2goZnVuY3Rpb24oIGhhbmRsZSwgaW5kZXggKXtcclxuXHJcblx0XHRcdFx0Ly8gVGhlc2UgZXZlbnRzIGFyZSBvbmx5IGJvdW5kIHRvIHRoZSB2aXN1YWwgaGFuZGxlXHJcblx0XHRcdFx0Ly8gZWxlbWVudCwgbm90IHRoZSAncmVhbCcgb3JpZ2luIGVsZW1lbnQuXHJcblx0XHRcdFx0YXR0YWNoRXZlbnQgKCBhY3Rpb25zLnN0YXJ0LCBoYW5kbGUuY2hpbGRyZW5bMF0sIGV2ZW50U3RhcnQsIHtcclxuXHRcdFx0XHRcdGhhbmRsZU51bWJlcnM6IFtpbmRleF1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXR0YWNoIHRoZSB0YXAgZXZlbnQgdG8gdGhlIHNsaWRlciBiYXNlLlxyXG5cdFx0aWYgKCBiZWhhdmlvdXIudGFwICkge1xyXG5cdFx0XHRhdHRhY2hFdmVudCAoYWN0aW9ucy5zdGFydCwgc2NvcGVfQmFzZSwgZXZlbnRUYXAsIHt9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXJlIGhvdmVyIGV2ZW50c1xyXG5cdFx0aWYgKCBiZWhhdmlvdXIuaG92ZXIgKSB7XHJcblx0XHRcdGF0dGFjaEV2ZW50IChhY3Rpb25zLm1vdmUsIHNjb3BlX0Jhc2UsIGV2ZW50SG92ZXIsIHsgaG92ZXI6IHRydWUgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTWFrZSB0aGUgcmFuZ2UgZHJhZ2dhYmxlLlxyXG5cdFx0aWYgKCBiZWhhdmlvdXIuZHJhZyApe1xyXG5cclxuXHRcdFx0c2NvcGVfQ29ubmVjdHMuZm9yRWFjaChmdW5jdGlvbiggY29ubmVjdCwgaW5kZXggKXtcclxuXHJcblx0XHRcdFx0aWYgKCBjb25uZWN0ID09PSBmYWxzZSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gc2NvcGVfQ29ubmVjdHMubGVuZ3RoIC0gMSApIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBoYW5kbGVCZWZvcmUgPSBzY29wZV9IYW5kbGVzW2luZGV4IC0gMV07XHJcblx0XHRcdFx0dmFyIGhhbmRsZUFmdGVyID0gc2NvcGVfSGFuZGxlc1tpbmRleF07XHJcblx0XHRcdFx0dmFyIGV2ZW50SG9sZGVycyA9IFtjb25uZWN0XTtcclxuXHJcblx0XHRcdFx0YWRkQ2xhc3MoY29ubmVjdCwgb3B0aW9ucy5jc3NDbGFzc2VzLmRyYWdnYWJsZSk7XHJcblxyXG5cdFx0XHRcdC8vIFdoZW4gdGhlIHJhbmdlIGlzIGZpeGVkLCB0aGUgZW50aXJlIHJhbmdlIGNhblxyXG5cdFx0XHRcdC8vIGJlIGRyYWdnZWQgYnkgdGhlIGhhbmRsZXMuIFRoZSBoYW5kbGUgaW4gdGhlIGZpcnN0XHJcblx0XHRcdFx0Ly8gb3JpZ2luIHdpbGwgcHJvcGFnYXRlIHRoZSBzdGFydCBldmVudCB1cHdhcmQsXHJcblx0XHRcdFx0Ly8gYnV0IGl0IG5lZWRzIHRvIGJlIGJvdW5kIG1hbnVhbGx5IG9uIHRoZSBvdGhlci5cclxuXHRcdFx0XHRpZiAoIGJlaGF2aW91ci5maXhlZCApIHtcclxuXHRcdFx0XHRcdGV2ZW50SG9sZGVycy5wdXNoKGhhbmRsZUJlZm9yZS5jaGlsZHJlblswXSk7XHJcblx0XHRcdFx0XHRldmVudEhvbGRlcnMucHVzaChoYW5kbGVBZnRlci5jaGlsZHJlblswXSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRldmVudEhvbGRlcnMuZm9yRWFjaChmdW5jdGlvbiggZXZlbnRIb2xkZXIgKSB7XHJcblx0XHRcdFx0XHRhdHRhY2hFdmVudCAoIGFjdGlvbnMuc3RhcnQsIGV2ZW50SG9sZGVyLCBldmVudFN0YXJ0LCB7XHJcblx0XHRcdFx0XHRcdGhhbmRsZXM6IFtoYW5kbGVCZWZvcmUsIGhhbmRsZUFmdGVyXSxcclxuXHRcdFx0XHRcdFx0aGFuZGxlTnVtYmVyczogW2luZGV4IC0gMSwgaW5kZXhdXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuLyohIEluIHRoaXMgZmlsZTogU2xpZGVyIGV2ZW50cyAobm90IGJyb3dzZXIgZXZlbnRzKTsgKi9cblxuXHQvLyBBdHRhY2ggYW4gZXZlbnQgdG8gdGhpcyBzbGlkZXIsIHBvc3NpYmx5IGluY2x1ZGluZyBhIG5hbWVzcGFjZVxuXHRmdW5jdGlvbiBiaW5kRXZlbnQgKCBuYW1lc3BhY2VkRXZlbnQsIGNhbGxiYWNrICkge1xuXHRcdHNjb3BlX0V2ZW50c1tuYW1lc3BhY2VkRXZlbnRdID0gc2NvcGVfRXZlbnRzW25hbWVzcGFjZWRFdmVudF0gfHwgW107XG5cdFx0c2NvcGVfRXZlbnRzW25hbWVzcGFjZWRFdmVudF0ucHVzaChjYWxsYmFjayk7XG5cblx0XHQvLyBJZiB0aGUgZXZlbnQgYm91bmQgaXMgJ3VwZGF0ZSwnIGZpcmUgaXQgaW1tZWRpYXRlbHkgZm9yIGFsbCBoYW5kbGVzLlxuXHRcdGlmICggbmFtZXNwYWNlZEV2ZW50LnNwbGl0KCcuJylbMF0gPT09ICd1cGRhdGUnICkge1xuXHRcdFx0c2NvcGVfSGFuZGxlcy5mb3JFYWNoKGZ1bmN0aW9uKGEsIGluZGV4KXtcblx0XHRcdFx0ZmlyZUV2ZW50KCd1cGRhdGUnLCBpbmRleCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvLyBVbmRvIGF0dGFjaG1lbnQgb2YgZXZlbnRcblx0ZnVuY3Rpb24gcmVtb3ZlRXZlbnQgKCBuYW1lc3BhY2VkRXZlbnQgKSB7XG5cblx0XHR2YXIgZXZlbnQgPSBuYW1lc3BhY2VkRXZlbnQgJiYgbmFtZXNwYWNlZEV2ZW50LnNwbGl0KCcuJylbMF07XG5cdFx0dmFyIG5hbWVzcGFjZSA9IGV2ZW50ICYmIG5hbWVzcGFjZWRFdmVudC5zdWJzdHJpbmcoZXZlbnQubGVuZ3RoKTtcblxuXHRcdE9iamVjdC5rZXlzKHNjb3BlX0V2ZW50cykuZm9yRWFjaChmdW5jdGlvbiggYmluZCApe1xuXG5cdFx0XHR2YXIgdEV2ZW50ID0gYmluZC5zcGxpdCgnLicpWzBdO1xuXHRcdFx0dmFyIHROYW1lc3BhY2UgPSBiaW5kLnN1YnN0cmluZyh0RXZlbnQubGVuZ3RoKTtcblxuXHRcdFx0aWYgKCAoIWV2ZW50IHx8IGV2ZW50ID09PSB0RXZlbnQpICYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gdE5hbWVzcGFjZSkgKSB7XG5cdFx0XHRcdGRlbGV0ZSBzY29wZV9FdmVudHNbYmluZF07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBFeHRlcm5hbCBldmVudCBoYW5kbGluZ1xuXHRmdW5jdGlvbiBmaXJlRXZlbnQgKCBldmVudE5hbWUsIGhhbmRsZU51bWJlciwgdGFwICkge1xuXG5cdFx0T2JqZWN0LmtleXMoc2NvcGVfRXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKCB0YXJnZXRFdmVudCApIHtcblxuXHRcdFx0dmFyIGV2ZW50VHlwZSA9IHRhcmdldEV2ZW50LnNwbGl0KCcuJylbMF07XG5cblx0XHRcdGlmICggZXZlbnROYW1lID09PSBldmVudFR5cGUgKSB7XG5cdFx0XHRcdHNjb3BlX0V2ZW50c1t0YXJnZXRFdmVudF0uZm9yRWFjaChmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKFxuXHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzbGlkZXIgcHVibGljIEFQSSBhcyB0aGUgc2NvcGUgKCd0aGlzJylcblx0XHRcdFx0XHRcdHNjb3BlX1NlbGYsXG5cdFx0XHRcdFx0XHQvLyBSZXR1cm4gdmFsdWVzIGFzIGFycmF5LCBzbyBhcmdfMVthcmdfMl0gaXMgYWx3YXlzIHZhbGlkLlxuXHRcdFx0XHRcdFx0c2NvcGVfVmFsdWVzLm1hcChvcHRpb25zLmZvcm1hdC50byksXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgaW5kZXgsIDAgb3IgMVxuXHRcdFx0XHRcdFx0aGFuZGxlTnVtYmVyLFxuXHRcdFx0XHRcdFx0Ly8gVW5mb3JtYXR0ZWQgc2xpZGVyIHZhbHVlc1xuXHRcdFx0XHRcdFx0c2NvcGVfVmFsdWVzLnNsaWNlKCksXG5cdFx0XHRcdFx0XHQvLyBFdmVudCBpcyBmaXJlZCBieSB0YXAsIHRydWUgb3IgZmFsc2Vcblx0XHRcdFx0XHRcdHRhcCB8fCBmYWxzZSxcblx0XHRcdFx0XHRcdC8vIExlZnQgb2Zmc2V0IG9mIHRoZSBoYW5kbGUsIGluIHJlbGF0aW9uIHRvIHRoZSBzbGlkZXJcblx0XHRcdFx0XHRcdHNjb3BlX0xvY2F0aW9ucy5zbGljZSgpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxyXG4vKiEgSW4gdGhpcyBmaWxlOiBNZWNoYW5pY3MgZm9yIHNsaWRlciBvcGVyYXRpb24gKi9cclxuXHJcblx0ZnVuY3Rpb24gdG9QY3QgKCBwY3QgKSB7XHJcblx0XHRyZXR1cm4gcGN0ICsgJyUnO1xyXG5cdH1cclxuXHJcblx0Ly8gU3BsaXQgb3V0IHRoZSBoYW5kbGUgcG9zaXRpb25pbmcgbG9naWMgc28gdGhlIE1vdmUgZXZlbnQgY2FuIHVzZSBpdCwgdG9vXHJcblx0ZnVuY3Rpb24gY2hlY2tIYW5kbGVQb3NpdGlvbiAoIHJlZmVyZW5jZSwgaGFuZGxlTnVtYmVyLCB0bywgbG9va0JhY2t3YXJkLCBsb29rRm9yd2FyZCwgZ2V0VmFsdWUgKSB7XHJcblxyXG5cdFx0Ly8gRm9yIHNsaWRlcnMgd2l0aCBtdWx0aXBsZSBoYW5kbGVzLCBsaW1pdCBtb3ZlbWVudCB0byB0aGUgb3RoZXIgaGFuZGxlLlxyXG5cdFx0Ly8gQXBwbHkgdGhlIG1hcmdpbiBvcHRpb24gYnkgYWRkaW5nIGl0IHRvIHRoZSBoYW5kbGUgcG9zaXRpb25zLlxyXG5cdFx0aWYgKCBzY29wZV9IYW5kbGVzLmxlbmd0aCA+IDEgKSB7XHJcblxyXG5cdFx0XHRpZiAoIGxvb2tCYWNrd2FyZCAmJiBoYW5kbGVOdW1iZXIgPiAwICkge1xyXG5cdFx0XHRcdHRvID0gTWF0aC5tYXgodG8sIHJlZmVyZW5jZVtoYW5kbGVOdW1iZXIgLSAxXSArIG9wdGlvbnMubWFyZ2luKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBsb29rRm9yd2FyZCAmJiBoYW5kbGVOdW1iZXIgPCBzY29wZV9IYW5kbGVzLmxlbmd0aCAtIDEgKSB7XHJcblx0XHRcdFx0dG8gPSBNYXRoLm1pbih0bywgcmVmZXJlbmNlW2hhbmRsZU51bWJlciArIDFdIC0gb3B0aW9ucy5tYXJnaW4pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIGxpbWl0IG9wdGlvbiBoYXMgdGhlIG9wcG9zaXRlIGVmZmVjdCwgbGltaXRpbmcgaGFuZGxlcyB0byBhXHJcblx0XHQvLyBtYXhpbXVtIGRpc3RhbmNlIGZyb20gYW5vdGhlci4gTGltaXQgbXVzdCBiZSA+IDAsIGFzIG90aGVyd2lzZVxyXG5cdFx0Ly8gaGFuZGxlcyB3b3VsZCBiZSB1bm1vdmVhYmxlLlxyXG5cdFx0aWYgKCBzY29wZV9IYW5kbGVzLmxlbmd0aCA+IDEgJiYgb3B0aW9ucy5saW1pdCApIHtcclxuXHJcblx0XHRcdGlmICggbG9va0JhY2t3YXJkICYmIGhhbmRsZU51bWJlciA+IDAgKSB7XHJcblx0XHRcdFx0dG8gPSBNYXRoLm1pbih0bywgcmVmZXJlbmNlW2hhbmRsZU51bWJlciAtIDFdICsgb3B0aW9ucy5saW1pdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggbG9va0ZvcndhcmQgJiYgaGFuZGxlTnVtYmVyIDwgc2NvcGVfSGFuZGxlcy5sZW5ndGggLSAxICkge1xyXG5cdFx0XHRcdHRvID0gTWF0aC5tYXgodG8sIHJlZmVyZW5jZVtoYW5kbGVOdW1iZXIgKyAxXSAtIG9wdGlvbnMubGltaXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIHBhZGRpbmcgb3B0aW9uIGtlZXBzIHRoZSBoYW5kbGVzIGEgY2VydGFpbiBkaXN0YW5jZSBmcm9tIHRoZVxyXG5cdFx0Ly8gZWRnZXMgb2YgdGhlIHNsaWRlci4gUGFkZGluZyBtdXN0IGJlID4gMC5cclxuXHRcdGlmICggb3B0aW9ucy5wYWRkaW5nICkge1xyXG5cclxuXHRcdFx0aWYgKCBoYW5kbGVOdW1iZXIgPT09IDAgKSB7XHJcblx0XHRcdFx0dG8gPSBNYXRoLm1heCh0bywgb3B0aW9ucy5wYWRkaW5nWzBdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBoYW5kbGVOdW1iZXIgPT09IHNjb3BlX0hhbmRsZXMubGVuZ3RoIC0gMSApIHtcclxuXHRcdFx0XHR0byA9IE1hdGgubWluKHRvLCAxMDAgLSBvcHRpb25zLnBhZGRpbmdbMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dG8gPSBzY29wZV9TcGVjdHJ1bS5nZXRTdGVwKHRvKTtcclxuXHJcblx0XHQvLyBMaW1pdCBwZXJjZW50YWdlIHRvIHRoZSAwIC0gMTAwIHJhbmdlXHJcblx0XHR0byA9IGxpbWl0KHRvKTtcclxuXHJcblx0XHQvLyBSZXR1cm4gZmFsc2UgaWYgaGFuZGxlIGNhbid0IG1vdmVcclxuXHRcdGlmICggdG8gPT09IHJlZmVyZW5jZVtoYW5kbGVOdW1iZXJdICYmICFnZXRWYWx1ZSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0bztcclxuXHR9XHJcblxyXG5cdC8vIFVzZXMgc2xpZGVyIG9yaWVudGF0aW9uIHRvIGNyZWF0ZSBDU1MgcnVsZXMuIGEgPSBiYXNlIHZhbHVlO1xyXG5cdGZ1bmN0aW9uIGluUnVsZU9yZGVyICggdiwgYSApIHtcclxuXHRcdHZhciBvID0gb3B0aW9ucy5vcnQ7XHJcblx0XHRyZXR1cm4gKG8/YTp2KSArICcsICcgKyAobz92OmEpO1xyXG5cdH1cclxuXHJcblx0Ly8gTW92ZXMgaGFuZGxlKHMpIGJ5IGEgcGVyY2VudGFnZVxyXG5cdC8vIChib29sLCAlIHRvIG1vdmUsIFslIHdoZXJlIGhhbmRsZSBzdGFydGVkLCAuLi5dLCBbaW5kZXggaW4gc2NvcGVfSGFuZGxlcywgLi4uXSlcclxuXHRmdW5jdGlvbiBtb3ZlSGFuZGxlcyAoIHVwd2FyZCwgcHJvcG9zYWwsIGxvY2F0aW9ucywgaGFuZGxlTnVtYmVycyApIHtcclxuXHJcblx0XHR2YXIgcHJvcG9zYWxzID0gbG9jYXRpb25zLnNsaWNlKCk7XHJcblxyXG5cdFx0dmFyIGIgPSBbIXVwd2FyZCwgdXB3YXJkXTtcclxuXHRcdHZhciBmID0gW3Vwd2FyZCwgIXVwd2FyZF07XHJcblxyXG5cdFx0Ly8gQ29weSBoYW5kbGVOdW1iZXJzIHNvIHdlIGRvbid0IGNoYW5nZSB0aGUgZGF0YXNldFxyXG5cdFx0aGFuZGxlTnVtYmVycyA9IGhhbmRsZU51bWJlcnMuc2xpY2UoKTtcclxuXHJcblx0XHQvLyBDaGVjayB0byBzZWUgd2hpY2ggaGFuZGxlIGlzICdsZWFkaW5nJy5cclxuXHRcdC8vIElmIHRoYXQgb25lIGNhbid0IG1vdmUgdGhlIHNlY29uZCBjYW4ndCBlaXRoZXIuXHJcblx0XHRpZiAoIHVwd2FyZCApIHtcclxuXHRcdFx0aGFuZGxlTnVtYmVycy5yZXZlcnNlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3RlcCAxOiBnZXQgdGhlIG1heGltdW0gcGVyY2VudGFnZSB0aGF0IGFueSBvZiB0aGUgaGFuZGxlcyBjYW4gbW92ZVxyXG5cdFx0aWYgKCBoYW5kbGVOdW1iZXJzLmxlbmd0aCA+IDEgKSB7XHJcblxyXG5cdFx0XHRoYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyLCBvKSB7XHJcblxyXG5cdFx0XHRcdHZhciB0byA9IGNoZWNrSGFuZGxlUG9zaXRpb24ocHJvcG9zYWxzLCBoYW5kbGVOdW1iZXIsIHByb3Bvc2Fsc1toYW5kbGVOdW1iZXJdICsgcHJvcG9zYWwsIGJbb10sIGZbb10sIGZhbHNlKTtcclxuXHJcblx0XHRcdFx0Ly8gU3RvcCBpZiBvbmUgb2YgdGhlIGhhbmRsZXMgY2FuJ3QgbW92ZS5cclxuXHRcdFx0XHRpZiAoIHRvID09PSBmYWxzZSApIHtcclxuXHRcdFx0XHRcdHByb3Bvc2FsID0gMDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cHJvcG9zYWwgPSB0byAtIHByb3Bvc2Fsc1toYW5kbGVOdW1iZXJdO1xyXG5cdFx0XHRcdFx0cHJvcG9zYWxzW2hhbmRsZU51bWJlcl0gPSB0bztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHVzaW5nIG9uZSBoYW5kbGUsIGNoZWNrIGJhY2t3YXJkIEFORCBmb3J3YXJkXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0YiA9IGYgPSBbdHJ1ZV07XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0Ly8gU3RlcCAyOiBUcnkgdG8gc2V0IHRoZSBoYW5kbGVzIHdpdGggdGhlIGZvdW5kIHBlcmNlbnRhZ2VcclxuXHRcdGhhbmRsZU51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVOdW1iZXIsIG8pIHtcclxuXHRcdFx0c3RhdGUgPSBzZXRIYW5kbGUoaGFuZGxlTnVtYmVyLCBsb2NhdGlvbnNbaGFuZGxlTnVtYmVyXSArIHByb3Bvc2FsLCBiW29dLCBmW29dKSB8fCBzdGF0ZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFN0ZXAgMzogSWYgYSBoYW5kbGUgbW92ZWQsIGZpcmUgZXZlbnRzXHJcblx0XHRpZiAoIHN0YXRlICkge1xyXG5cdFx0XHRoYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcclxuXHRcdFx0XHRmaXJlRXZlbnQoJ3VwZGF0ZScsIGhhbmRsZU51bWJlcik7XHJcblx0XHRcdFx0ZmlyZUV2ZW50KCdzbGlkZScsIGhhbmRsZU51bWJlcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gVGFrZXMgYSBiYXNlIHZhbHVlIGFuZCBhbiBvZmZzZXQuIFRoaXMgb2Zmc2V0IGlzIHVzZWQgZm9yIHRoZSBjb25uZWN0IGJhciBzaXplLlxyXG5cdC8vIEluIHRoZSBpbml0aWFsIGRlc2lnbiBmb3IgdGhpcyBmZWF0dXJlLCB0aGUgb3JpZ2luIGVsZW1lbnQgd2FzIDElIHdpZGUuXHJcblx0Ly8gVW5mb3J0dW5hdGVseSwgYSByb3VuZGluZyBidWcgaW4gQ2hyb21lIG1ha2VzIGl0IGltcG9zc2libGUgdG8gaW1wbGVtZW50IHRoaXMgZmVhdHVyZVxyXG5cdC8vIGluIHRoaXMgbWFubmVyOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03OTgyMjNcclxuXHRmdW5jdGlvbiB0cmFuc2Zvcm1EaXJlY3Rpb24gKCBhLCBiICkge1xyXG5cdFx0cmV0dXJuIG9wdGlvbnMuZGlyID8gMTAwIC0gYSAtIGIgOiBhO1xyXG5cdH1cclxuXHJcblx0Ly8gVXBkYXRlcyBzY29wZV9Mb2NhdGlvbnMgYW5kIHNjb3BlX1ZhbHVlcywgdXBkYXRlcyB2aXN1YWwgc3RhdGVcclxuXHRmdW5jdGlvbiB1cGRhdGVIYW5kbGVQb3NpdGlvbiAoIGhhbmRsZU51bWJlciwgdG8gKSB7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIGxvY2F0aW9ucy5cclxuXHRcdHNjb3BlX0xvY2F0aW9uc1toYW5kbGVOdW1iZXJdID0gdG87XHJcblxyXG5cdFx0Ly8gQ29udmVydCB0aGUgdmFsdWUgdG8gdGhlIHNsaWRlciBzdGVwcGluZy9yYW5nZS5cclxuXHRcdHNjb3BlX1ZhbHVlc1toYW5kbGVOdW1iZXJdID0gc2NvcGVfU3BlY3RydW0uZnJvbVN0ZXBwaW5nKHRvKTtcclxuXHJcblx0XHR2YXIgcnVsZSA9ICd0cmFuc2xhdGUoJyArIGluUnVsZU9yZGVyKHRvUGN0KHRyYW5zZm9ybURpcmVjdGlvbih0bywgMCkgLSBzY29wZV9EaXJPZmZzZXQpLCAnMCcpICsgJyknO1xyXG5cdFx0c2NvcGVfSGFuZGxlc1toYW5kbGVOdW1iZXJdLnN0eWxlW29wdGlvbnMudHJhbnNmb3JtUnVsZV0gPSBydWxlO1xyXG5cclxuXHRcdHVwZGF0ZUNvbm5lY3QoaGFuZGxlTnVtYmVyKTtcclxuXHRcdHVwZGF0ZUNvbm5lY3QoaGFuZGxlTnVtYmVyICsgMSk7XHJcblx0fVxyXG5cclxuXHQvLyBIYW5kbGVzIGJlZm9yZSB0aGUgc2xpZGVyIG1pZGRsZSBhcmUgc3RhY2tlZCBsYXRlciA9IGhpZ2hlcixcclxuXHQvLyBIYW5kbGVzIGFmdGVyIHRoZSBtaWRkbGUgbGF0ZXIgaXMgbG93ZXJcclxuXHQvLyBbWzddIFs4XSAuLi4uLi4uLi4uIHwgLi4uLi4uLi4uLiBbNV0gWzRdXHJcblx0ZnVuY3Rpb24gc2V0WmluZGV4ICggKSB7XHJcblxyXG5cdFx0c2NvcGVfSGFuZGxlTnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZU51bWJlcil7XHJcblx0XHRcdHZhciBkaXIgPSAoc2NvcGVfTG9jYXRpb25zW2hhbmRsZU51bWJlcl0gPiA1MCA/IC0xIDogMSk7XHJcblx0XHRcdHZhciB6SW5kZXggPSAzICsgKHNjb3BlX0hhbmRsZXMubGVuZ3RoICsgKGRpciAqIGhhbmRsZU51bWJlcikpO1xyXG5cdFx0XHRzY29wZV9IYW5kbGVzW2hhbmRsZU51bWJlcl0uc3R5bGUuekluZGV4ID0gekluZGV4O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyBUZXN0IHN1Z2dlc3RlZCB2YWx1ZXMgYW5kIGFwcGx5IG1hcmdpbiwgc3RlcC5cclxuXHRmdW5jdGlvbiBzZXRIYW5kbGUgKCBoYW5kbGVOdW1iZXIsIHRvLCBsb29rQmFja3dhcmQsIGxvb2tGb3J3YXJkICkge1xyXG5cclxuXHRcdHRvID0gY2hlY2tIYW5kbGVQb3NpdGlvbihzY29wZV9Mb2NhdGlvbnMsIGhhbmRsZU51bWJlciwgdG8sIGxvb2tCYWNrd2FyZCwgbG9va0ZvcndhcmQsIGZhbHNlKTtcclxuXHJcblx0XHRpZiAoIHRvID09PSBmYWxzZSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZUhhbmRsZVBvc2l0aW9uKGhhbmRsZU51bWJlciwgdG8pO1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0Ly8gVXBkYXRlcyBzdHlsZSBhdHRyaWJ1dGUgZm9yIGNvbm5lY3Qgbm9kZXNcclxuXHRmdW5jdGlvbiB1cGRhdGVDb25uZWN0ICggaW5kZXggKSB7XHJcblxyXG5cdFx0Ly8gU2tpcCBjb25uZWN0cyBzZXQgdG8gZmFsc2VcclxuXHRcdGlmICggIXNjb3BlX0Nvbm5lY3RzW2luZGV4XSApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBsID0gMDtcclxuXHRcdHZhciBoID0gMTAwO1xyXG5cclxuXHRcdGlmICggaW5kZXggIT09IDAgKSB7XHJcblx0XHRcdGwgPSBzY29wZV9Mb2NhdGlvbnNbaW5kZXggLSAxXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIGluZGV4ICE9PSBzY29wZV9Db25uZWN0cy5sZW5ndGggLSAxICkge1xyXG5cdFx0XHRoID0gc2NvcGVfTG9jYXRpb25zW2luZGV4XTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBXZSB1c2UgdHdvIHJ1bGVzOlxyXG5cdFx0Ly8gJ3RyYW5zbGF0ZScgdG8gY2hhbmdlIHRoZSBsZWZ0L3RvcCBvZmZzZXQ7XHJcblx0XHQvLyAnc2NhbGUnIHRvIGNoYW5nZSB0aGUgd2lkdGggb2YgdGhlIGVsZW1lbnQ7XHJcblx0XHQvLyBBcyB0aGUgZWxlbWVudCBoYXMgYSB3aWR0aCBvZiAxMDAlLCBhIHRyYW5zbGF0aW9uIG9mIDEwMCUgaXMgZXF1YWwgdG8gMTAwJSBvZiB0aGUgcGFyZW50ICgubm9VaS1iYXNlKVxyXG5cdFx0dmFyIGNvbm5lY3RXaWR0aCA9IGggLSBsO1xyXG5cdFx0dmFyIHRyYW5zbGF0ZVJ1bGUgPSAndHJhbnNsYXRlKCcgKyBpblJ1bGVPcmRlcih0b1BjdCh0cmFuc2Zvcm1EaXJlY3Rpb24obCwgY29ubmVjdFdpZHRoKSksICcwJykgKyAnKSc7XHJcblx0XHR2YXIgc2NhbGVSdWxlID0gJ3NjYWxlKCcgKyBpblJ1bGVPcmRlcihjb25uZWN0V2lkdGggLyAxMDAsICcxJykgKyAnKSc7XHJcblxyXG5cdFx0c2NvcGVfQ29ubmVjdHNbaW5kZXhdLnN0eWxlW29wdGlvbnMudHJhbnNmb3JtUnVsZV0gPSB0cmFuc2xhdGVSdWxlICsgJyAnICsgc2NhbGVSdWxlO1xyXG5cdH1cclxuXHJcbi8qISBJbiB0aGlzIGZpbGU6IEFsbCBtZXRob2RzIGV2ZW50dWFsbHkgZXhwb3NlZCBpbiBzbGlkZXIubm9VaVNsaWRlci4uLiAqL1xuXG5cdC8vIFBhcnNlcyB2YWx1ZSBwYXNzZWQgdG8gLnNldCBtZXRob2QuIFJldHVybnMgY3VycmVudCB2YWx1ZSBpZiBub3QgcGFyc2UtYWJsZS5cblx0ZnVuY3Rpb24gcmVzb2x2ZVRvVmFsdWUgKCB0bywgaGFuZGxlTnVtYmVyICkge1xuXG5cdFx0Ly8gU2V0dGluZyB3aXRoIG51bGwgaW5kaWNhdGVzIGFuICdpZ25vcmUnLlxuXHRcdC8vIElucHV0dGluZyAnZmFsc2UnIGlzIGludmFsaWQuXG5cdFx0aWYgKCB0byA9PT0gbnVsbCB8fCB0byA9PT0gZmFsc2UgfHwgdG8gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybiBzY29wZV9Mb2NhdGlvbnNbaGFuZGxlTnVtYmVyXTtcblx0XHR9XG5cblx0XHQvLyBJZiBhIGZvcm1hdHRlZCBudW1iZXIgd2FzIHBhc3NlZCwgYXR0ZW1wdCB0byBkZWNvZGUgaXQuXG5cdFx0aWYgKCB0eXBlb2YgdG8gPT09ICdudW1iZXInICkge1xuXHRcdFx0dG8gPSBTdHJpbmcodG8pO1xuXHRcdH1cblxuXHRcdHRvID0gb3B0aW9ucy5mb3JtYXQuZnJvbSh0byk7XG5cdFx0dG8gPSBzY29wZV9TcGVjdHJ1bS50b1N0ZXBwaW5nKHRvKTtcblxuXHRcdC8vIElmIHBhcnNpbmcgdGhlIG51bWJlciBmYWlsZWQsIHVzZSB0aGUgY3VycmVudCB2YWx1ZS5cblx0XHRpZiAoIHRvID09PSBmYWxzZSB8fCBpc05hTih0bykgKSB7XG5cdFx0XHRyZXR1cm4gc2NvcGVfTG9jYXRpb25zW2hhbmRsZU51bWJlcl07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRvO1xuXHR9XG5cblx0Ly8gU2V0IHRoZSBzbGlkZXIgdmFsdWUuXG5cdGZ1bmN0aW9uIHZhbHVlU2V0ICggaW5wdXQsIGZpcmVTZXRFdmVudCApIHtcblxuXHRcdHZhciB2YWx1ZXMgPSBhc0FycmF5KGlucHV0KTtcblx0XHR2YXIgaXNJbml0ID0gc2NvcGVfTG9jYXRpb25zWzBdID09PSB1bmRlZmluZWQ7XG5cblx0XHQvLyBFdmVudCBmaXJlcyBieSBkZWZhdWx0XG5cdFx0ZmlyZVNldEV2ZW50ID0gKGZpcmVTZXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhZmlyZVNldEV2ZW50KTtcblxuXHRcdC8vIEFuaW1hdGlvbiBpcyBvcHRpb25hbC5cblx0XHQvLyBNYWtlIHN1cmUgdGhlIGluaXRpYWwgdmFsdWVzIHdlcmUgc2V0IGJlZm9yZSB1c2luZyBhbmltYXRlZCBwbGFjZW1lbnQuXG5cdFx0aWYgKCBvcHRpb25zLmFuaW1hdGUgJiYgIWlzSW5pdCApIHtcblx0XHRcdGFkZENsYXNzRm9yKHNjb3BlX1RhcmdldCwgb3B0aW9ucy5jc3NDbGFzc2VzLnRhcCwgb3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbik7XG5cdFx0fVxuXG5cdFx0Ly8gRmlyc3QgcGFzcywgd2l0aG91dCBsb29rQWhlYWQgYnV0IHdpdGggbG9va0JhY2t3YXJkLiBWYWx1ZXMgYXJlIHNldCBmcm9tIGxlZnQgdG8gcmlnaHQuXG5cdFx0c2NvcGVfSGFuZGxlTnVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZU51bWJlcil7XG5cdFx0XHRzZXRIYW5kbGUoaGFuZGxlTnVtYmVyLCByZXNvbHZlVG9WYWx1ZSh2YWx1ZXNbaGFuZGxlTnVtYmVyXSwgaGFuZGxlTnVtYmVyKSwgdHJ1ZSwgZmFsc2UpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2Vjb25kIHBhc3MuIE5vdyB0aGF0IGFsbCBiYXNlIHZhbHVlcyBhcmUgc2V0LCBhcHBseSBjb25zdHJhaW50c1xuXHRcdHNjb3BlX0hhbmRsZU51bWJlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVOdW1iZXIpe1xuXHRcdFx0c2V0SGFuZGxlKGhhbmRsZU51bWJlciwgc2NvcGVfTG9jYXRpb25zW2hhbmRsZU51bWJlcl0sIHRydWUsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0c2V0WmluZGV4KCk7XG5cblx0XHRzY29wZV9IYW5kbGVOdW1iZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlTnVtYmVyKXtcblxuXHRcdFx0ZmlyZUV2ZW50KCd1cGRhdGUnLCBoYW5kbGVOdW1iZXIpO1xuXG5cdFx0XHQvLyBGaXJlIHRoZSBldmVudCBvbmx5IGZvciBoYW5kbGVzIHRoYXQgcmVjZWl2ZWQgYSBuZXcgdmFsdWUsIGFzIHBlciAjNTc5XG5cdFx0XHRpZiAoIHZhbHVlc1toYW5kbGVOdW1iZXJdICE9PSBudWxsICYmIGZpcmVTZXRFdmVudCApIHtcblx0XHRcdFx0ZmlyZUV2ZW50KCdzZXQnLCBoYW5kbGVOdW1iZXIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly8gUmVzZXQgc2xpZGVyIHRvIGluaXRpYWwgdmFsdWVzXG5cdGZ1bmN0aW9uIHZhbHVlUmVzZXQgKCBmaXJlU2V0RXZlbnQgKSB7XG5cdFx0dmFsdWVTZXQob3B0aW9ucy5zdGFydCwgZmlyZVNldEV2ZW50KTtcblx0fVxuXG5cdC8vIEdldCB0aGUgc2xpZGVyIHZhbHVlLlxuXHRmdW5jdGlvbiB2YWx1ZUdldCAoICkge1xuXG5cdFx0dmFyIHZhbHVlcyA9IHNjb3BlX1ZhbHVlcy5tYXAob3B0aW9ucy5mb3JtYXQudG8pO1xuXG5cdFx0Ly8gSWYgb25seSBvbmUgaGFuZGxlIGlzIHVzZWQsIHJldHVybiBhIHNpbmdsZSB2YWx1ZS5cblx0XHRpZiAoIHZhbHVlcy5sZW5ndGggPT09IDEgKXtcblx0XHRcdHJldHVybiB2YWx1ZXNbMF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlcztcblx0fVxuXG5cdC8vIFJlbW92ZXMgY2xhc3NlcyBmcm9tIHRoZSByb290IGFuZCBlbXB0aWVzIGl0LlxuXHRmdW5jdGlvbiBkZXN0cm95ICggKSB7XG5cblx0XHRmb3IgKCB2YXIga2V5IGluIG9wdGlvbnMuY3NzQ2xhc3NlcyApIHtcblx0XHRcdGlmICggIW9wdGlvbnMuY3NzQ2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkgeyBjb250aW51ZTsgfVxuXHRcdFx0cmVtb3ZlQ2xhc3Moc2NvcGVfVGFyZ2V0LCBvcHRpb25zLmNzc0NsYXNzZXNba2V5XSk7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKHNjb3BlX1RhcmdldC5maXJzdENoaWxkKSB7XG5cdFx0XHRzY29wZV9UYXJnZXQucmVtb3ZlQ2hpbGQoc2NvcGVfVGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdGRlbGV0ZSBzY29wZV9UYXJnZXQubm9VaVNsaWRlcjtcblx0fVxuXG5cdC8vIEdldCB0aGUgY3VycmVudCBzdGVwIHNpemUgZm9yIHRoZSBzbGlkZXIuXG5cdGZ1bmN0aW9uIGdldEN1cnJlbnRTdGVwICggKSB7XG5cblx0XHQvLyBDaGVjayBhbGwgbG9jYXRpb25zLCBtYXAgdGhlbSB0byB0aGVpciBzdGVwcGluZyBwb2ludC5cblx0XHQvLyBHZXQgdGhlIHN0ZXAgcG9pbnQsIHRoZW4gZmluZCBpdCBpbiB0aGUgaW5wdXQgbGlzdC5cblx0XHRyZXR1cm4gc2NvcGVfTG9jYXRpb25zLm1hcChmdW5jdGlvbiggbG9jYXRpb24sIGluZGV4ICl7XG5cblx0XHRcdHZhciBuZWFyYnlTdGVwcyA9IHNjb3BlX1NwZWN0cnVtLmdldE5lYXJieVN0ZXBzKCBsb2NhdGlvbiApO1xuXHRcdFx0dmFyIHZhbHVlID0gc2NvcGVfVmFsdWVzW2luZGV4XTtcblx0XHRcdHZhciBpbmNyZW1lbnQgPSBuZWFyYnlTdGVwcy50aGlzU3RlcC5zdGVwO1xuXHRcdFx0dmFyIGRlY3JlbWVudCA9IG51bGw7XG5cblx0XHRcdC8vIElmIHRoZSBuZXh0IHZhbHVlIGluIHRoaXMgc3RlcCBtb3ZlcyBpbnRvIHRoZSBuZXh0IHN0ZXAsXG5cdFx0XHQvLyB0aGUgaW5jcmVtZW50IGlzIHRoZSBzdGFydCBvZiB0aGUgbmV4dCBzdGVwIC0gdGhlIGN1cnJlbnQgdmFsdWVcblx0XHRcdGlmICggaW5jcmVtZW50ICE9PSBmYWxzZSApIHtcblx0XHRcdFx0aWYgKCB2YWx1ZSArIGluY3JlbWVudCA+IG5lYXJieVN0ZXBzLnN0ZXBBZnRlci5zdGFydFZhbHVlICkge1xuXHRcdFx0XHRcdGluY3JlbWVudCA9IG5lYXJieVN0ZXBzLnN0ZXBBZnRlci5zdGFydFZhbHVlIC0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXG5cdFx0XHQvLyBJZiB0aGUgdmFsdWUgaXMgYmV5b25kIHRoZSBzdGFydGluZyBwb2ludFxuXHRcdFx0aWYgKCB2YWx1ZSA+IG5lYXJieVN0ZXBzLnRoaXNTdGVwLnN0YXJ0VmFsdWUgKSB7XG5cdFx0XHRcdGRlY3JlbWVudCA9IG5lYXJieVN0ZXBzLnRoaXNTdGVwLnN0ZXA7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKCBuZWFyYnlTdGVwcy5zdGVwQmVmb3JlLnN0ZXAgPT09IGZhbHNlICkge1xuXHRcdFx0XHRkZWNyZW1lbnQgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBoYW5kbGUgaXMgYXQgdGhlIHN0YXJ0IG9mIGEgc3RlcCwgaXQgYWx3YXlzIHN0ZXBzIGJhY2sgaW50byB0aGUgcHJldmlvdXMgc3RlcCBmaXJzdFxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGRlY3JlbWVudCA9IHZhbHVlIC0gbmVhcmJ5U3RlcHMuc3RlcEJlZm9yZS5oaWdoZXN0U3RlcDtcblx0XHRcdH1cblxuXG5cdFx0XHQvLyBOb3csIGlmIGF0IHRoZSBzbGlkZXIgZWRnZXMsIHRoZXJlIGlzIG5vdCBpbi9kZWNyZW1lbnRcblx0XHRcdGlmICggbG9jYXRpb24gPT09IDEwMCApIHtcblx0XHRcdFx0aW5jcmVtZW50ID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAoIGxvY2F0aW9uID09PSAwICkge1xuXHRcdFx0XHRkZWNyZW1lbnQgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcyBwZXIgIzM5MSwgdGhlIGNvbXBhcmlzb24gZm9yIHRoZSBkZWNyZW1lbnQgc3RlcCBjYW4gaGF2ZSBzb21lIHJvdW5kaW5nIGlzc3Vlcy5cblx0XHRcdHZhciBzdGVwRGVjaW1hbHMgPSBzY29wZV9TcGVjdHJ1bS5jb3VudFN0ZXBEZWNpbWFscygpO1xuXG5cdFx0XHQvLyBSb3VuZCBwZXIgIzM5MVxuXHRcdFx0aWYgKCBpbmNyZW1lbnQgIT09IG51bGwgJiYgaW5jcmVtZW50ICE9PSBmYWxzZSApIHtcblx0XHRcdFx0aW5jcmVtZW50ID0gTnVtYmVyKGluY3JlbWVudC50b0ZpeGVkKHN0ZXBEZWNpbWFscykpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGRlY3JlbWVudCAhPT0gbnVsbCAmJiBkZWNyZW1lbnQgIT09IGZhbHNlICkge1xuXHRcdFx0XHRkZWNyZW1lbnQgPSBOdW1iZXIoZGVjcmVtZW50LnRvRml4ZWQoc3RlcERlY2ltYWxzKSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBbZGVjcmVtZW50LCBpbmNyZW1lbnRdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gVXBkYXRlYWJsZTogbWFyZ2luLCBsaW1pdCwgcGFkZGluZywgc3RlcCwgcmFuZ2UsIGFuaW1hdGUsIHNuYXBcblx0ZnVuY3Rpb24gdXBkYXRlT3B0aW9ucyAoIG9wdGlvbnNUb1VwZGF0ZSwgZmlyZVNldEV2ZW50ICkge1xuXG5cdFx0Ly8gU3BlY3RydW0gaXMgY3JlYXRlZCB1c2luZyB0aGUgcmFuZ2UsIHNuYXAsIGRpcmVjdGlvbiBhbmQgc3RlcCBvcHRpb25zLlxuXHRcdC8vICdzbmFwJyBhbmQgJ3N0ZXAnIGNhbiBiZSB1cGRhdGVkLlxuXHRcdC8vIElmICdzbmFwJyBhbmQgJ3N0ZXAnIGFyZSBub3QgcGFzc2VkLCB0aGV5IHNob3VsZCByZW1haW4gdW5jaGFuZ2VkLlxuXHRcdHZhciB2ID0gdmFsdWVHZXQoKTtcblxuXHRcdHZhciB1cGRhdGVBYmxlID0gWydtYXJnaW4nLCAnbGltaXQnLCAncGFkZGluZycsICdyYW5nZScsICdhbmltYXRlJywgJ3NuYXAnLCAnc3RlcCcsICdmb3JtYXQnXTtcblxuXHRcdC8vIE9ubHkgY2hhbmdlIG9wdGlvbnMgdGhhdCB3ZSdyZSBhY3R1YWxseSBwYXNzZWQgdG8gdXBkYXRlLlxuXHRcdHVwZGF0ZUFibGUuZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcblx0XHRcdGlmICggb3B0aW9uc1RvVXBkYXRlW25hbWVdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdG9yaWdpbmFsT3B0aW9uc1tuYW1lXSA9IG9wdGlvbnNUb1VwZGF0ZVtuYW1lXTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHZhciBuZXdPcHRpb25zID0gdGVzdE9wdGlvbnMob3JpZ2luYWxPcHRpb25zKTtcblxuXHRcdC8vIExvYWQgbmV3IG9wdGlvbnMgaW50byB0aGUgc2xpZGVyIHN0YXRlXG5cdFx0dXBkYXRlQWJsZS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0aWYgKCBvcHRpb25zVG9VcGRhdGVbbmFtZV0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0b3B0aW9uc1tuYW1lXSA9IG5ld09wdGlvbnNbbmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRzY29wZV9TcGVjdHJ1bSA9IG5ld09wdGlvbnMuc3BlY3RydW07XG5cblx0XHQvLyBMaW1pdCwgbWFyZ2luIGFuZCBwYWRkaW5nIGRlcGVuZCBvbiB0aGUgc3BlY3RydW0gYnV0IGFyZSBzdG9yZWQgb3V0c2lkZSBvZiBpdC4gKCM2NzcpXG5cdFx0b3B0aW9ucy5tYXJnaW4gPSBuZXdPcHRpb25zLm1hcmdpbjtcblx0XHRvcHRpb25zLmxpbWl0ID0gbmV3T3B0aW9ucy5saW1pdDtcblx0XHRvcHRpb25zLnBhZGRpbmcgPSBuZXdPcHRpb25zLnBhZGRpbmc7XG5cblx0XHQvLyBVcGRhdGUgcGlwcywgcmVtb3ZlcyBleGlzdGluZy5cblx0XHRpZiAoIG9wdGlvbnMucGlwcyApIHtcblx0XHRcdHBpcHMob3B0aW9ucy5waXBzKTtcblx0XHR9XG5cblx0XHQvLyBJbnZhbGlkYXRlIHRoZSBjdXJyZW50IHBvc2l0aW9uaW5nIHNvIHZhbHVlU2V0IGZvcmNlcyBhbiB1cGRhdGUuXG5cdFx0c2NvcGVfTG9jYXRpb25zID0gW107XG5cdFx0dmFsdWVTZXQob3B0aW9uc1RvVXBkYXRlLnN0YXJ0IHx8IHYsIGZpcmVTZXRFdmVudCk7XG5cdH1cblxyXG4vKiEgSW4gdGhpcyBmaWxlOiBDYWxscyB0byBmdW5jdGlvbnMuIEFsbCBvdGhlciBzY29wZV8gZmlsZXMgZGVmaW5lIGZ1bmN0aW9ucyBvbmx5OyAqL1xuXG5cdC8vIENyZWF0ZSB0aGUgYmFzZSBlbGVtZW50LCBpbml0aWFsaXplIEhUTUwgYW5kIHNldCBjbGFzc2VzLlxuXHQvLyBBZGQgaGFuZGxlcyBhbmQgY29ubmVjdCBlbGVtZW50cy5cblx0YWRkU2xpZGVyKHNjb3BlX1RhcmdldCk7XG5cdGFkZEVsZW1lbnRzKG9wdGlvbnMuY29ubmVjdCwgc2NvcGVfQmFzZSk7XG5cblx0Ly8gQXR0YWNoIHVzZXIgZXZlbnRzLlxuXHRiaW5kU2xpZGVyRXZlbnRzKG9wdGlvbnMuZXZlbnRzKTtcblxuXHQvLyBVc2UgdGhlIHB1YmxpYyB2YWx1ZSBtZXRob2QgdG8gc2V0IHRoZSBzdGFydCB2YWx1ZXMuXG5cdHZhbHVlU2V0KG9wdGlvbnMuc3RhcnQpO1xuXG5cdHNjb3BlX1NlbGYgPSB7XG5cdFx0ZGVzdHJveTogZGVzdHJveSxcblx0XHRzdGVwczogZ2V0Q3VycmVudFN0ZXAsXG5cdFx0b246IGJpbmRFdmVudCxcblx0XHRvZmY6IHJlbW92ZUV2ZW50LFxuXHRcdGdldDogdmFsdWVHZXQsXG5cdFx0c2V0OiB2YWx1ZVNldCxcblx0XHRyZXNldDogdmFsdWVSZXNldCxcblx0XHQvLyBFeHBvc2VkIGZvciB1bml0IHRlc3RpbmcsIGRvbid0IHVzZSB0aGlzIGluIHlvdXIgYXBwbGljYXRpb24uXG5cdFx0X19tb3ZlSGFuZGxlczogZnVuY3Rpb24oYSwgYiwgYykgeyBtb3ZlSGFuZGxlcyhhLCBiLCBzY29wZV9Mb2NhdGlvbnMsIGMpOyB9LFxuXHRcdG9wdGlvbnM6IG9yaWdpbmFsT3B0aW9ucywgLy8gSXNzdWUgIzYwMCwgIzY3OFxuXHRcdHVwZGF0ZU9wdGlvbnM6IHVwZGF0ZU9wdGlvbnMsXG5cdFx0dGFyZ2V0OiBzY29wZV9UYXJnZXQsIC8vIElzc3VlICM1OTdcblx0XHRyZW1vdmVQaXBzOiByZW1vdmVQaXBzLFxuXHRcdHBpcHM6IHBpcHMgLy8gSXNzdWUgIzU5NFxuXHR9O1xuXG5cdGlmICggb3B0aW9ucy5waXBzICkge1xuXHRcdHBpcHMob3B0aW9ucy5waXBzKTtcblx0fVxuXG5cdGlmICggb3B0aW9ucy50b29sdGlwcyApIHtcblx0XHR0b29sdGlwcygpO1xuXHR9XG5cblx0YXJpYSgpO1xuXG5cdHJldHVybiBzY29wZV9TZWxmO1xuXHJcbn1cclxuXHJcblxyXG5cdC8vIFJ1biB0aGUgc3RhbmRhcmQgaW5pdGlhbGl6ZXJcclxuXHRmdW5jdGlvbiBpbml0aWFsaXplICggdGFyZ2V0LCBvcmlnaW5hbE9wdGlvbnMgKSB7XHJcblxyXG5cdFx0aWYgKCAhdGFyZ2V0IHx8ICF0YXJnZXQubm9kZU5hbWUgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXIgKFwiICsgVkVSU0lPTiArIFwiKTogY3JlYXRlIHJlcXVpcmVzIGEgc2luZ2xlIGVsZW1lbnQsIGdvdDogXCIgKyB0YXJnZXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBzbGlkZXIgd2FzIGFscmVhZHkgaW5pdGlhbGl6ZWQuXHJcblx0XHRpZiAoIHRhcmdldC5ub1VpU2xpZGVyICkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyIChcIiArIFZFUlNJT04gKyBcIik6IFNsaWRlciB3YXMgYWxyZWFkeSBpbml0aWFsaXplZC5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGVzdCB0aGUgb3B0aW9ucyBhbmQgY3JlYXRlIHRoZSBzbGlkZXIgZW52aXJvbm1lbnQ7XHJcblx0XHR2YXIgb3B0aW9ucyA9IHRlc3RPcHRpb25zKCBvcmlnaW5hbE9wdGlvbnMsIHRhcmdldCApO1xyXG5cdFx0dmFyIGFwaSA9IHNjb3BlKCB0YXJnZXQsIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucyApO1xyXG5cclxuXHRcdHRhcmdldC5ub1VpU2xpZGVyID0gYXBpO1xyXG5cclxuXHRcdHJldHVybiBhcGk7XHJcblx0fVxyXG5cclxuXHQvLyBVc2UgYW4gb2JqZWN0IGluc3RlYWQgb2YgYSBmdW5jdGlvbiBmb3IgZnV0dXJlIGV4cGFuZGFiaWxpdHk7XHJcblx0cmV0dXJuIHtcclxuXHRcdHZlcnNpb246IFZFUlNJT04sXHJcblx0XHRjcmVhdGU6IGluaXRpYWxpemVcclxuXHR9O1xyXG5cclxufSkpOyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=