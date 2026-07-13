"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[58214],{

/***/ 401:
/*!******************************************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Scene/PointPrimitiveCollection.js + 2 modules ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Scene_PointPrimitiveCollection)
});

// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/BoundingSphere.js
var BoundingSphere = __webpack_require__(60662);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Color.js
var Color = __webpack_require__(41476);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/ComponentDatatype.js
var ComponentDatatype = __webpack_require__(71804);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Frozen.js
var Frozen = __webpack_require__(15325);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/defined.js
var defined = __webpack_require__(91446);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/destroyObject.js
var destroyObject = __webpack_require__(77354);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/DeveloperError.js
var DeveloperError = __webpack_require__(5971);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/EncodedCartesian3.js
var EncodedCartesian3 = __webpack_require__(16422);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Math.js
var Core_Math = __webpack_require__(67817);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Matrix4.js
var Matrix4 = __webpack_require__(84164);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/PrimitiveType.js
var PrimitiveType = __webpack_require__(2330);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/WebGLConstants.js
var WebGLConstants = __webpack_require__(52581);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/BufferUsage.js
var BufferUsage = __webpack_require__(42790);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/ContextLimits.js
var ContextLimits = __webpack_require__(30332);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/DrawCommand.js
var DrawCommand = __webpack_require__(77496);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/Pass.js
var Pass = __webpack_require__(60866);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/RenderState.js + 1 modules
var RenderState = __webpack_require__(10406);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/ShaderProgram.js + 2 modules
var ShaderProgram = __webpack_require__(7168);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/ShaderSource.js + 140 modules
var ShaderSource = __webpack_require__(25163);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/VertexArrayFacade.js
var VertexArrayFacade = __webpack_require__(93470);
;// ./node_modules/@cesium/engine/Source/Shaders/PointPrimitiveCollectionFS.js
//This file is automatically rebuilt by the Cesium build process.
/* harmony default export */ const PointPrimitiveCollectionFS = ("in vec4 v_color;\n\
in vec4 v_outlineColor;\n\
in float v_innerPercent;\n\
in float v_pixelDistance;\n\
in vec4 v_pickColor;\n\
in float v_splitDirection;\n\
\n\
void main()\n\
{\n\
    if (v_splitDirection < 0.0 && gl_FragCoord.x > czm_splitPosition) discard;\n\
    if (v_splitDirection > 0.0 && gl_FragCoord.x < czm_splitPosition) discard;\n\
\n\
    // The distance in UV space from this fragment to the center of the point, at most 0.5.\n\
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));\n\
    // The max distance stops one pixel shy of the edge to leave space for anti-aliasing.\n\
    float maxDistance = max(0.0, 0.5 - v_pixelDistance);\n\
    float wholeAlpha = 1.0 - smoothstep(maxDistance, 0.5, distanceToCenter);\n\
    float innerAlpha = 1.0 - smoothstep(maxDistance * v_innerPercent, 0.5 * v_innerPercent, distanceToCenter);\n\
\n\
    vec4 color = mix(v_outlineColor, v_color, innerAlpha);\n\
    color.a *= wholeAlpha;\n\
\n\
// Fully transparent parts of the billboard are not pickable.\n\
#if !defined(OPAQUE) && !defined(TRANSLUCENT)\n\
    if (color.a < 0.005)   // matches 0/255 and 1/255\n\
    {\n\
        discard;\n\
    }\n\
#else\n\
// The billboard is rendered twice. The opaque pass discards translucent fragments\n\
// and the translucent pass discards opaque fragments.\n\
#ifdef OPAQUE\n\
    if (color.a < 0.995)   // matches < 254/255\n\
    {\n\
        discard;\n\
    }\n\
#else\n\
    if (color.a >= 0.995)  // matches 254/255 and 255/255\n\
    {\n\
        discard;\n\
    }\n\
#endif\n\
#endif\n\
\n\
    out_FragColor = czm_gammaCorrect(color);\n\
    czm_writeLogDepth();\n\
}\n\
");

;// ./node_modules/@cesium/engine/Source/Shaders/PointPrimitiveCollectionVS.js
//This file is automatically rebuilt by the Cesium build process.
/* harmony default export */ const PointPrimitiveCollectionVS = ("uniform float u_maxTotalPointSize;\n\
\n\
in vec4 positionHighAndSize;\n\
in vec4 positionLowAndOutline;\n\
in vec4 compressedAttribute0;                                        // color, outlineColor, pick color\n\
in vec4 compressedAttribute1;                                        // show, translucency by distance, some free space\n\
in vec4 scaleByDistance;                                             // near, nearScale, far, farScale\n\
in vec4 distanceDisplayConditionAndDisableDepthAndSplitDirection;    // near, far, disableDepthTestDistance, splitDirection\n\
\n\
out vec4 v_color;\n\
out vec4 v_outlineColor;\n\
out float v_innerPercent;\n\
out float v_pixelDistance;\n\
out vec4 v_pickColor;\n\
out float v_splitDirection;\n\
\n\
const float SHIFT_LEFT8 = 256.0;\n\
const float SHIFT_RIGHT8 = 1.0 / 256.0;\n\
\n\
void main()\n\
{\n\
    // Modifying this shader may also require modifications to PointPrimitive._computeScreenSpacePosition\n\
\n\
    // unpack attributes\n\
    vec3 positionHigh = positionHighAndSize.xyz;\n\
    vec3 positionLow = positionLowAndOutline.xyz;\n\
    float outlineWidthBothSides = 2.0 * positionLowAndOutline.w;\n\
    float totalSize = positionHighAndSize.w + outlineWidthBothSides;\n\
    float outlinePercent = outlineWidthBothSides / totalSize;\n\
    // Scale in response to browser-zoom.\n\
    totalSize *= czm_pixelRatio;\n\
\n\
    float temp = compressedAttribute1.x * SHIFT_RIGHT8;\n\
    float show = floor(temp);\n\
\n\
#ifdef EYE_DISTANCE_TRANSLUCENCY\n\
    vec4 translucencyByDistance;\n\
    translucencyByDistance.x = compressedAttribute1.z;\n\
    translucencyByDistance.z = compressedAttribute1.w;\n\
\n\
    translucencyByDistance.y = ((temp - floor(temp)) * SHIFT_LEFT8) / 255.0;\n\
\n\
    temp = compressedAttribute1.y * SHIFT_RIGHT8;\n\
    translucencyByDistance.w = ((temp - floor(temp)) * SHIFT_LEFT8) / 255.0;\n\
#endif\n\
\n\
    ///////////////////////////////////////////////////////////////////////////\n\
\n\
    vec4 color;\n\
    vec4 outlineColor;\n\
    vec4 pickColor;\n\
\n\
    // compressedAttribute0.z => pickColor.rgb\n\
\n\
    temp = compressedAttribute0.z * SHIFT_RIGHT8;\n\
    pickColor.b = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    temp = floor(temp) * SHIFT_RIGHT8;\n\
    pickColor.g = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    pickColor.r = floor(temp);\n\
\n\
    // compressedAttribute0.x => color.rgb\n\
\n\
    temp = compressedAttribute0.x * SHIFT_RIGHT8;\n\
    color.b = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    temp = floor(temp) * SHIFT_RIGHT8;\n\
    color.g = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    color.r = floor(temp);\n\
\n\
    // compressedAttribute0.y => outlineColor.rgb\n\
\n\
    temp = compressedAttribute0.y * SHIFT_RIGHT8;\n\
    outlineColor.b = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    temp = floor(temp) * SHIFT_RIGHT8;\n\
    outlineColor.g = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    outlineColor.r = floor(temp);\n\
\n\
    // compressedAttribute0.w => color.a, outlineColor.a, pickColor.a\n\
\n\
    temp = compressedAttribute0.w * SHIFT_RIGHT8;\n\
    pickColor.a = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    pickColor = pickColor / 255.0;\n\
\n\
    temp = floor(temp) * SHIFT_RIGHT8;\n\
    outlineColor.a = (temp - floor(temp)) * SHIFT_LEFT8;\n\
    outlineColor /= 255.0;\n\
    color.a = floor(temp);\n\
    color /= 255.0;\n\
\n\
    ///////////////////////////////////////////////////////////////////////////\n\
\n\
    vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);\n\
    vec4 positionEC = czm_modelViewRelativeToEye * p;\n\
\n\
    ///////////////////////////////////////////////////////////////////////////\n\
\n\
#if defined(EYE_DISTANCE_SCALING) || defined(EYE_DISTANCE_TRANSLUCENCY) || defined(DISTANCE_DISPLAY_CONDITION) || defined(DISABLE_DEPTH_DISTANCE)\n\
    float lengthSq;\n\
    if (czm_sceneMode == czm_sceneMode2D)\n\
    {\n\
        // 2D camera distance is a special case\n\
        // treat all billboards as flattened to the z=0.0 plane\n\
        lengthSq = czm_eyeHeight2D.y;\n\
    }\n\
    else\n\
    {\n\
        lengthSq = dot(positionEC.xyz, positionEC.xyz);\n\
    }\n\
#endif\n\
\n\
#ifdef EYE_DISTANCE_SCALING\n\
    totalSize *= czm_nearFarScalar(scaleByDistance, lengthSq);\n\
#endif\n\
    if (totalSize > 0.0) {\n\
        // Add padding for anti-aliasing on both sides.\n\
        totalSize += 3.0;\n\
    }\n\
\n\
    // Clamp to max point size.\n\
    totalSize = min(totalSize, u_maxTotalPointSize);\n\
    // If size is too small, push vertex behind near plane for clipping.\n\
    // Note that context.minimumAliasedPointSize \"will be at most 1.0\".\n\
    if (totalSize < 1.0)\n\
    {\n\
        positionEC.xyz = vec3(0.0);\n\
        totalSize = 1.0;\n\
    }\n\
\n\
    float translucency = 1.0;\n\
#ifdef EYE_DISTANCE_TRANSLUCENCY\n\
    translucency = czm_nearFarScalar(translucencyByDistance, lengthSq);\n\
    // push vertex behind near plane for clipping\n\
    if (translucency < 0.004)\n\
    {\n\
        positionEC.xyz = vec3(0.0);\n\
    }\n\
#endif\n\
\n\
#ifdef DISTANCE_DISPLAY_CONDITION\n\
    float nearSq = distanceDisplayConditionAndDisableDepthAndSplitDirection.x;\n\
    float farSq = distanceDisplayConditionAndDisableDepthAndSplitDirection.y;\n\
    if (lengthSq < nearSq || lengthSq > farSq) {\n\
        // push vertex behind camera to force it to be clipped\n\
        positionEC.xyz = vec3(0.0, 0.0, 1.0);\n\
    }\n\
#endif\n\
\n\
    gl_Position = czm_projection * positionEC;\n\
    czm_vertexLogDepth();\n\
\n\
#ifdef DISABLE_DEPTH_DISTANCE\n\
    float disableDepthTestDistance = distanceDisplayConditionAndDisableDepthAndSplitDirection.z;\n\
    if (disableDepthTestDistance == 0.0 && czm_minimumDisableDepthTestDistance != 0.0)\n\
    {\n\
        disableDepthTestDistance = czm_minimumDisableDepthTestDistance;\n\
    }\n\
\n\
    if (disableDepthTestDistance != 0.0)\n\
    {\n\
        // Don't try to \"multiply both sides\" by w.  Greater/less-than comparisons won't work for negative values of w.\n\
        float zclip = gl_Position.z / gl_Position.w;\n\
        bool clipped = (zclip < -1.0 || zclip > 1.0);\n\
        if (!clipped && (disableDepthTestDistance < 0.0 || (lengthSq > 0.0 && lengthSq < disableDepthTestDistance)))\n\
        {\n\
            // Position z on the near plane.\n\
            gl_Position.z = -gl_Position.w;\n\
#ifdef LOG_DEPTH\n\
            czm_vertexLogDepth(vec4(czm_currentFrustum.x));\n\
#endif\n\
        }\n\
    }\n\
#endif\n\
\n\
    v_color = color;\n\
    v_color.a *= translucency * show;\n\
    v_outlineColor = outlineColor;\n\
    v_outlineColor.a *= translucency * show;\n\
\n\
    v_innerPercent = 1.0 - outlinePercent;\n\
    v_pixelDistance = 2.0 / totalSize;\n\
    gl_PointSize = totalSize * show;\n\
    gl_Position *= show;\n\
\n\
    v_pickColor = pickColor;\n\
    v_splitDirection = distanceDisplayConditionAndDisableDepthAndSplitDirection.w;\n\
}\n\
");

// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/BlendingState.js
var BlendingState = __webpack_require__(646);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/BlendOption.js
var BlendOption = __webpack_require__(16882);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/PointPrimitive.js
var PointPrimitive = __webpack_require__(20853);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/SceneMode.js
var SceneMode = __webpack_require__(62467);
;// ./node_modules/@cesium/engine/Source/Scene/PointPrimitiveCollection.js



























const SHOW_INDEX = PointPrimitive["default"].SHOW_INDEX;
const POSITION_INDEX = PointPrimitive["default"].POSITION_INDEX;
const COLOR_INDEX = PointPrimitive["default"].COLOR_INDEX;
const OUTLINE_COLOR_INDEX = PointPrimitive["default"].OUTLINE_COLOR_INDEX;
const OUTLINE_WIDTH_INDEX = PointPrimitive["default"].OUTLINE_WIDTH_INDEX;
const PIXEL_SIZE_INDEX = PointPrimitive["default"].PIXEL_SIZE_INDEX;
const SCALE_BY_DISTANCE_INDEX = PointPrimitive["default"].SCALE_BY_DISTANCE_INDEX;
const TRANSLUCENCY_BY_DISTANCE_INDEX =
  PointPrimitive["default"].TRANSLUCENCY_BY_DISTANCE_INDEX;
const DISTANCE_DISPLAY_CONDITION_INDEX =
  PointPrimitive["default"].DISTANCE_DISPLAY_CONDITION_INDEX;
const DISABLE_DEPTH_DISTANCE_INDEX =
  PointPrimitive["default"].DISABLE_DEPTH_DISTANCE_INDEX;
const SPLIT_DIRECTION_INDEX = PointPrimitive["default"].SPLIT_DIRECTION_INDEX;
const NUMBER_OF_PROPERTIES = PointPrimitive["default"].NUMBER_OF_PROPERTIES;

const attributeLocations = {
  positionHighAndSize: 0,
  positionLowAndOutline: 1,
  compressedAttribute0: 2, // color, outlineColor, pick color
  compressedAttribute1: 3, // show, translucency by distance, some free space
  scaleByDistance: 4,
  distanceDisplayConditionAndDisableDepthAndSplitDirection: 5,
};

/**
 * A renderable collection of points.
 * <br /><br />
 * Points are added and removed from the collection using {@link PointPrimitiveCollection#add}
 * and {@link PointPrimitiveCollection#remove}.
 *
 * @alias PointPrimitiveCollection
 * @constructor
 *
 * @param {object} [options] Object with the following properties:
 * @param {Matrix4} [options.modelMatrix=Matrix4.IDENTITY] The 4x4 transformation matrix that transforms each point from model to world coordinates.
 * @param {boolean} [options.debugShowBoundingVolume=false] For debugging only. Determines if this primitive's commands' bounding spheres are shown.
 * @param {BlendOption} [options.blendOption=BlendOption.OPAQUE_AND_TRANSLUCENT] The point blending option. The default
 * is used for rendering both opaque and translucent points. However, if either all of the points are completely opaque or all are completely translucent,
 * setting the technique to BlendOption.OPAQUE or BlendOption.TRANSLUCENT can improve performance by up to 2x.
 * @param {boolean} [options.show=true] Determines if the primitives in the collection will be shown.
 *
 * @performance For best performance, prefer a few collections, each with many points, to
 * many collections with only a few points each.  Organize collections so that points
 * with the same update frequency are in the same collection, i.e., points that do not
 * change should be in one collection; points that change every frame should be in another
 * collection; and so on.
 *
 *
 * @example
 * // Create a pointPrimitive collection with two points
 * const points = scene.primitives.add(new Cesium.PointPrimitiveCollection());
 * points.add({
 *   position : new Cesium.Cartesian3(1.0, 2.0, 3.0),
 *   color : Cesium.Color.YELLOW
 * });
 * points.add({
 *   position : new Cesium.Cartesian3(4.0, 5.0, 6.0),
 *   color : Cesium.Color.CYAN
 * });
 *
 * @see PointPrimitiveCollection#add
 * @see PointPrimitiveCollection#remove
 * @see PointPrimitive
 */
function PointPrimitiveCollection(options) {
  options = options ?? Frozen["default"].EMPTY_OBJECT;

  this._sp = undefined;
  this._spTranslucent = undefined;
  this._rsOpaque = undefined;
  this._rsTranslucent = undefined;
  this._vaf = undefined;

  this._pointPrimitives = [];
  this._pointPrimitivesToUpdate = [];
  this._pointPrimitivesToUpdateIndex = 0;
  this._pointPrimitivesRemoved = false;
  this._createVertexArray = false;

  this._shaderScaleByDistance = false;
  this._compiledShaderScaleByDistance = false;

  this._shaderTranslucencyByDistance = false;
  this._compiledShaderTranslucencyByDistance = false;

  this._shaderDistanceDisplayCondition = false;
  this._compiledShaderDistanceDisplayCondition = false;

  this._shaderDisableDepthDistance = false;
  this._compiledShaderDisableDepthDistance = false;

  this._propertiesChanged = new Uint32Array(NUMBER_OF_PROPERTIES);

  this._maxPixelSize = 1.0;

  this._baseVolume = new BoundingSphere["default"]();
  this._baseVolumeWC = new BoundingSphere["default"]();
  this._baseVolume2D = new BoundingSphere["default"]();
  this._boundingVolume = new BoundingSphere["default"]();
  this._boundingVolumeDirty = false;

  this._colorCommands = [];

  /**
   * Determines if primitives in this collection will be shown.
   *
   * @type {boolean}
   * @default true
   */
  this.show = options.show ?? true;

  /**
   * The 4x4 transformation matrix that transforms each point in this collection from model to world coordinates.
   * When this is the identity matrix, the pointPrimitives are drawn in world coordinates, i.e., Earth's WGS84 coordinates.
   * Local reference frames can be used by providing a different transformation matrix, like that returned
   * by {@link Transforms.eastNorthUpToFixedFrame}.
   *
   * @type {Matrix4}
   * @default {@link Matrix4.IDENTITY}
   *
   *
   * @example
   * const center = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
   * pointPrimitives.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
   * pointPrimitives.add({
   *   color : Cesium.Color.ORANGE,
   *   position : new Cesium.Cartesian3(0.0, 0.0, 0.0) // center
   * });
   * pointPrimitives.add({
   *   color : Cesium.Color.YELLOW,
   *   position : new Cesium.Cartesian3(1000000.0, 0.0, 0.0) // east
   * });
   * pointPrimitives.add({
   *   color : Cesium.Color.GREEN,
   *   position : new Cesium.Cartesian3(0.0, 1000000.0, 0.0) // north
   * });
   * pointPrimitives.add({
   *   color : Cesium.Color.CYAN,
   *   position : new Cesium.Cartesian3(0.0, 0.0, 1000000.0) // up
   * });
   *
   * @see Transforms.eastNorthUpToFixedFrame
   */
  this.modelMatrix = Matrix4["default"].clone(options.modelMatrix ?? Matrix4["default"].IDENTITY);
  this._modelMatrix = Matrix4["default"].clone(Matrix4["default"].IDENTITY);

  /**
   * This property is for debugging only; it is not for production use nor is it optimized.
   * <p>
   * Draws the bounding sphere for each draw command in the primitive.
   * </p>
   *
   * @type {boolean}
   *
   * @default false
   */
  this.debugShowBoundingVolume = options.debugShowBoundingVolume ?? false;

  /**
   * The point blending option. The default is used for rendering both opaque and translucent points.
   * However, if either all of the points are completely opaque or all are completely translucent,
   * setting the technique to BlendOption.OPAQUE or BlendOption.TRANSLUCENT can improve
   * performance by up to 2x.
   * @type {BlendOption}
   * @default BlendOption.OPAQUE_AND_TRANSLUCENT
   */
  this.blendOption = options.blendOption ?? BlendOption["default"].OPAQUE_AND_TRANSLUCENT;
  this._blendOption = undefined;

  this._mode = SceneMode["default"].SCENE3D;
  this._maxTotalPointSize = 1;

  // The buffer usage for each attribute is determined based on the usage of the attribute over time.
  this._buffersUsage = [
    BufferUsage["default"].STATIC_DRAW, // SHOW_INDEX
    BufferUsage["default"].STATIC_DRAW, // POSITION_INDEX
    BufferUsage["default"].STATIC_DRAW, // COLOR_INDEX
    BufferUsage["default"].STATIC_DRAW, // OUTLINE_COLOR_INDEX
    BufferUsage["default"].STATIC_DRAW, // OUTLINE_WIDTH_INDEX
    BufferUsage["default"].STATIC_DRAW, // PIXEL_SIZE_INDEX
    BufferUsage["default"].STATIC_DRAW, // SCALE_BY_DISTANCE_INDEX
    BufferUsage["default"].STATIC_DRAW, // TRANSLUCENCY_BY_DISTANCE_INDEX
    BufferUsage["default"].STATIC_DRAW, // DISTANCE_DISPLAY_CONDITION_INDEX
  ];

  const that = this;
  this._uniforms = {
    u_maxTotalPointSize: function () {
      return that._maxTotalPointSize;
    },
  };
}

Object.defineProperties(PointPrimitiveCollection.prototype, {
  /**
   * Returns the number of points in this collection.  This is commonly used with
   * {@link PointPrimitiveCollection#get} to iterate over all the points
   * in the collection.
   * @memberof PointPrimitiveCollection.prototype
   * @type {number}
   */
  length: {
    get: function () {
      removePointPrimitives(this);
      return this._pointPrimitives.length;
    },
  },
});

function destroyPointPrimitives(pointPrimitives) {
  const length = pointPrimitives.length;
  for (let i = 0; i < length; ++i) {
    if (pointPrimitives[i]) {
      pointPrimitives[i]._destroy();
    }
  }
}

/**
 * Creates and adds a point with the specified initial properties to the collection.
 * The added point is returned so it can be modified or removed from the collection later.
 *
 * @param {object}[options] A template describing the point's properties as shown in Example 1.
 * @returns {PointPrimitive} The point that was added to the collection.
 *
 * @performance Calling <code>add</code> is expected constant time.  However, the collection's vertex buffer
 * is rewritten - an <code>O(n)</code> operation that also incurs CPU to GPU overhead.  For
 * best performance, add as many pointPrimitives as possible before calling <code>update</code>.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * // Example 1:  Add a point, specifying all the default values.
 * const p = pointPrimitives.add({
 *   show : true,
 *   position : Cesium.Cartesian3.ZERO,
 *   pixelSize : 10.0,
 *   color : Cesium.Color.WHITE,
 *   outlineColor : Cesium.Color.TRANSPARENT,
 *   outlineWidth : 0.0,
 *   id : undefined
 * });
 *
 * @example
 * // Example 2:  Specify only the point's cartographic position.
 * const p = pointPrimitives.add({
 *   position : Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
 * });
 *
 * @see PointPrimitiveCollection#remove
 * @see PointPrimitiveCollection#removeAll
 */
PointPrimitiveCollection.prototype.add = function (options) {
  const p = new PointPrimitive["default"](options, this);
  p._index = this._pointPrimitives.length;

  this._pointPrimitives.push(p);
  this._createVertexArray = true;

  return p;
};

/**
 * Removes a point from the collection.
 *
 * @param {PointPrimitive} pointPrimitive The point to remove.
 * @returns {boolean} <code>true</code> if the point was removed; <code>false</code> if the point was not found in the collection.
 *
 * @performance Calling <code>remove</code> is expected constant time.  However, the collection's vertex buffer
 * is rewritten - an <code>O(n)</code> operation that also incurs CPU to GPU overhead.  For
 * best performance, remove as many points as possible before calling <code>update</code>.
 * If you intend to temporarily hide a point, it is usually more efficient to call
 * {@link PointPrimitive#show} instead of removing and re-adding the point.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * const p = pointPrimitives.add(...);
 * pointPrimitives.remove(p);  // Returns true
 *
 * @see PointPrimitiveCollection#add
 * @see PointPrimitiveCollection#removeAll
 * @see PointPrimitive#show
 */
PointPrimitiveCollection.prototype.remove = function (pointPrimitive) {
  if (this.contains(pointPrimitive)) {
    this._pointPrimitives[pointPrimitive._index] = null; // Removed later
    this._pointPrimitivesRemoved = true;
    this._createVertexArray = true;
    pointPrimitive._destroy();
    return true;
  }

  return false;
};

/**
 * Removes all points from the collection.
 *
 * @performance <code>O(n)</code>.  It is more efficient to remove all the points
 * from a collection and then add new ones than to create a new collection entirely.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * pointPrimitives.add(...);
 * pointPrimitives.add(...);
 * pointPrimitives.removeAll();
 *
 * @see PointPrimitiveCollection#add
 * @see PointPrimitiveCollection#remove
 */
PointPrimitiveCollection.prototype.removeAll = function () {
  destroyPointPrimitives(this._pointPrimitives);
  this._pointPrimitives = [];
  this._pointPrimitivesToUpdate = [];
  this._pointPrimitivesToUpdateIndex = 0;
  this._pointPrimitivesRemoved = false;

  this._createVertexArray = true;
};

function removePointPrimitives(pointPrimitiveCollection) {
  if (pointPrimitiveCollection._pointPrimitivesRemoved) {
    pointPrimitiveCollection._pointPrimitivesRemoved = false;

    const newPointPrimitives = [];
    const pointPrimitives = pointPrimitiveCollection._pointPrimitives;
    const length = pointPrimitives.length;
    for (let i = 0, j = 0; i < length; ++i) {
      const pointPrimitive = pointPrimitives[i];
      if (pointPrimitive) {
        pointPrimitive._index = j++;
        newPointPrimitives.push(pointPrimitive);
      }
    }

    pointPrimitiveCollection._pointPrimitives = newPointPrimitives;
  }
}

PointPrimitiveCollection.prototype._updatePointPrimitive = function (
  pointPrimitive,
  propertyChanged,
) {
  if (!pointPrimitive._dirty) {
    this._pointPrimitivesToUpdate[this._pointPrimitivesToUpdateIndex++] =
      pointPrimitive;
  }

  ++this._propertiesChanged[propertyChanged];
};

/**
 * Check whether this collection contains a given point.
 *
 * @param {PointPrimitive} [pointPrimitive] The point to check for.
 * @returns {boolean} true if this collection contains the point, false otherwise.
 *
 * @see PointPrimitiveCollection#get
 */
PointPrimitiveCollection.prototype.contains = function (pointPrimitive) {
  return (
    (0,defined["default"])(pointPrimitive) && pointPrimitive._pointPrimitiveCollection === this
  );
};

/**
 * Returns the point in the collection at the specified index.  Indices are zero-based
 * and increase as points are added.  Removing a point shifts all points after
 * it to the left, changing their indices.  This function is commonly used with
 * {@link PointPrimitiveCollection#length} to iterate over all the points
 * in the collection.
 *
 * @param {number} index The zero-based index of the point.
 * @returns {PointPrimitive} The point at the specified index.
 *
 * @performance Expected constant time.  If points were removed from the collection and
 * {@link PointPrimitiveCollection#update} was not called, an implicit <code>O(n)</code>
 * operation is performed.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * // Toggle the show property of every point in the collection
 * const len = pointPrimitives.length;
 * for (let i = 0; i < len; ++i) {
 *   const p = pointPrimitives.get(i);
 *   p.show = !p.show;
 * }
 *
 * @see PointPrimitiveCollection#length
 */
PointPrimitiveCollection.prototype.get = function (index) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,defined["default"])(index)) {
    throw new DeveloperError["default"]("index is required.");
  }
  //>>includeEnd('debug');

  removePointPrimitives(this);
  return this._pointPrimitives[index];
};

PointPrimitiveCollection.prototype.computeNewBuffersUsage = function () {
  const buffersUsage = this._buffersUsage;
  let usageChanged = false;

  const properties = this._propertiesChanged;
  for (let k = 0; k < NUMBER_OF_PROPERTIES; ++k) {
    const newUsage =
      properties[k] === 0 ? BufferUsage["default"].STATIC_DRAW : BufferUsage["default"].STREAM_DRAW;
    usageChanged = usageChanged || buffersUsage[k] !== newUsage;
    buffersUsage[k] = newUsage;
  }

  return usageChanged;
};

function createVAF(context, numberOfPointPrimitives, buffersUsage) {
  return new VertexArrayFacade["default"](
    context,
    [
      {
        index: attributeLocations.positionHighAndSize,
        componentsPerAttribute: 4,
        componentDatatype: ComponentDatatype["default"].FLOAT,
        usage: buffersUsage[POSITION_INDEX],
      },
      {
        index: attributeLocations.positionLowAndShow,
        componentsPerAttribute: 4,
        componentDatatype: ComponentDatatype["default"].FLOAT,
        usage: buffersUsage[POSITION_INDEX],
      },
      {
        index: attributeLocations.compressedAttribute0,
        componentsPerAttribute: 4,
        componentDatatype: ComponentDatatype["default"].FLOAT,
        usage: buffersUsage[COLOR_INDEX],
      },
      {
        index: attributeLocations.compressedAttribute1,
        componentsPerAttribute: 4,
        componentDatatype: ComponentDatatype["default"].FLOAT,
        usage: buffersUsage[TRANSLUCENCY_BY_DISTANCE_INDEX],
      },
      {
        index: attributeLocations.scaleByDistance,
        componentsPerAttribute: 4,
        componentDatatype: ComponentDatatype["default"].FLOAT,
        usage: buffersUsage[SCALE_BY_DISTANCE_INDEX],
      },
      {
        index:
          attributeLocations.distanceDisplayConditionAndDisableDepthAndSplitDirection,
        componentsPerAttribute: 4,
        componentDatatype: ComponentDatatype["default"].FLOAT,
        usage: buffersUsage[DISTANCE_DISPLAY_CONDITION_INDEX],
      },
    ],
    numberOfPointPrimitives,
  ); // 1 vertex per pointPrimitive
}

///////////////////////////////////////////////////////////////////////////

// PERFORMANCE_IDEA:  Save memory if a property is the same for all pointPrimitives, use a latched attribute state,
// instead of storing it in a vertex buffer.

const writePositionScratch = new EncodedCartesian3["default"]();

function writePositionSizeAndOutline(
  pointPrimitiveCollection,
  context,
  vafWriters,
  pointPrimitive,
) {
  const i = pointPrimitive._index;
  const position = pointPrimitive._getActualPosition();

  if (pointPrimitiveCollection._mode === SceneMode["default"].SCENE3D) {
    BoundingSphere["default"].expand(
      pointPrimitiveCollection._baseVolume,
      position,
      pointPrimitiveCollection._baseVolume,
    );
    pointPrimitiveCollection._boundingVolumeDirty = true;
  }

  EncodedCartesian3["default"].fromCartesian(position, writePositionScratch);
  const pixelSize = pointPrimitive.pixelSize;
  const outlineWidth = pointPrimitive.outlineWidth;

  pointPrimitiveCollection._maxPixelSize = Math.max(
    pointPrimitiveCollection._maxPixelSize,
    pixelSize + outlineWidth,
  );

  const positionHighWriter = vafWriters[attributeLocations.positionHighAndSize];
  const high = writePositionScratch.high;
  positionHighWriter(i, high.x, high.y, high.z, pixelSize);

  const positionLowWriter =
    vafWriters[attributeLocations.positionLowAndOutline];
  const low = writePositionScratch.low;
  positionLowWriter(i, low.x, low.y, low.z, outlineWidth);
}

const LEFT_SHIFT16 = 65536.0; // 2^16
const LEFT_SHIFT8 = 256.0; // 2^8

function writeCompressedAttrib0(
  pointPrimitiveCollection,
  context,
  vafWriters,
  pointPrimitive,
) {
  const i = pointPrimitive._index;

  const color = pointPrimitive.color;
  const pickColor = pointPrimitive.getPickId(context).color;
  const outlineColor = pointPrimitive.outlineColor;

  let red = Color["default"].floatToByte(color.red);
  let green = Color["default"].floatToByte(color.green);
  let blue = Color["default"].floatToByte(color.blue);
  const compressed0 = red * LEFT_SHIFT16 + green * LEFT_SHIFT8 + blue;

  red = Color["default"].floatToByte(outlineColor.red);
  green = Color["default"].floatToByte(outlineColor.green);
  blue = Color["default"].floatToByte(outlineColor.blue);
  const compressed1 = red * LEFT_SHIFT16 + green * LEFT_SHIFT8 + blue;

  red = Color["default"].floatToByte(pickColor.red);
  green = Color["default"].floatToByte(pickColor.green);
  blue = Color["default"].floatToByte(pickColor.blue);
  const compressed2 = red * LEFT_SHIFT16 + green * LEFT_SHIFT8 + blue;

  const compressed3 =
    Color["default"].floatToByte(color.alpha) * LEFT_SHIFT16 +
    Color["default"].floatToByte(outlineColor.alpha) * LEFT_SHIFT8 +
    Color["default"].floatToByte(pickColor.alpha);

  const writer = vafWriters[attributeLocations.compressedAttribute0];
  writer(i, compressed0, compressed1, compressed2, compressed3);
}

function writeCompressedAttrib1(
  pointPrimitiveCollection,
  context,
  vafWriters,
  pointPrimitive,
) {
  const i = pointPrimitive._index;

  let near = 0.0;
  let nearValue = 1.0;
  let far = 1.0;
  let farValue = 1.0;

  const translucency = pointPrimitive.translucencyByDistance;
  if ((0,defined["default"])(translucency)) {
    near = translucency.near;
    nearValue = translucency.nearValue;
    far = translucency.far;
    farValue = translucency.farValue;

    if (nearValue !== 1.0 || farValue !== 1.0) {
      // translucency by distance calculation in shader need not be enabled
      // until a pointPrimitive with near and far !== 1.0 is found
      pointPrimitiveCollection._shaderTranslucencyByDistance = true;
    }
  }

  let show = pointPrimitive.show && pointPrimitive.clusterShow;

  // If the color alphas are zero, do not show this pointPrimitive.  This lets us avoid providing
  // color during the pick pass and also eliminates a discard in the fragment shader.
  if (
    pointPrimitive.color.alpha === 0.0 &&
    pointPrimitive.outlineColor.alpha === 0.0
  ) {
    show = false;
  }

  nearValue = Core_Math["default"].clamp(nearValue, 0.0, 1.0);
  nearValue = nearValue === 1.0 ? 255.0 : (nearValue * 255.0) | 0;
  const compressed0 = (show ? 1.0 : 0.0) * LEFT_SHIFT8 + nearValue;

  farValue = Core_Math["default"].clamp(farValue, 0.0, 1.0);
  farValue = farValue === 1.0 ? 255.0 : (farValue * 255.0) | 0;
  const compressed1 = farValue;

  const writer = vafWriters[attributeLocations.compressedAttribute1];
  writer(i, compressed0, compressed1, near, far);
}

function writeScaleByDistance(
  pointPrimitiveCollection,
  context,
  vafWriters,
  pointPrimitive,
) {
  const i = pointPrimitive._index;
  const writer = vafWriters[attributeLocations.scaleByDistance];
  let near = 0.0;
  let nearValue = 1.0;
  let far = 1.0;
  let farValue = 1.0;

  const scale = pointPrimitive.scaleByDistance;
  if ((0,defined["default"])(scale)) {
    near = scale.near;
    nearValue = scale.nearValue;
    far = scale.far;
    farValue = scale.farValue;

    if (nearValue !== 1.0 || farValue !== 1.0) {
      // scale by distance calculation in shader need not be enabled
      // until a pointPrimitive with near and far !== 1.0 is found
      pointPrimitiveCollection._shaderScaleByDistance = true;
    }
  }

  writer(i, near, nearValue, far, farValue);
}

function writeDistanceDisplayConditionAndDepthDisableAndSplitDirection(
  pointPrimitiveCollection,
  context,
  vafWriters,
  pointPrimitive,
) {
  const i = pointPrimitive._index;
  const writer =
    vafWriters[
      attributeLocations
        .distanceDisplayConditionAndDisableDepthAndSplitDirection
    ];
  let near = 0.0;
  let far = Number.MAX_VALUE;

  const distanceDisplayCondition = pointPrimitive.distanceDisplayCondition;
  if ((0,defined["default"])(distanceDisplayCondition)) {
    near = distanceDisplayCondition.near;
    far = distanceDisplayCondition.far;

    near *= near;
    far *= far;

    pointPrimitiveCollection._shaderDistanceDisplayCondition = true;
  }

  let disableDepthTestDistance = pointPrimitive.disableDepthTestDistance;
  disableDepthTestDistance *= disableDepthTestDistance;
  if (disableDepthTestDistance > 0.0) {
    pointPrimitiveCollection._shaderDisableDepthDistance = true;
    if (disableDepthTestDistance === Number.POSITIVE_INFINITY) {
      disableDepthTestDistance = -1.0;
    }
  }

  let direction = 0.0;
  const split = pointPrimitive.splitDirection;
  if ((0,defined["default"])(split)) {
    direction = split;
  }
  writer(i, near, far, disableDepthTestDistance, direction);
}

function writePointPrimitive(
  pointPrimitiveCollection,
  context,
  vafWriters,
  pointPrimitive,
) {
  writePositionSizeAndOutline(
    pointPrimitiveCollection,
    context,
    vafWriters,
    pointPrimitive,
  );
  writeCompressedAttrib0(
    pointPrimitiveCollection,
    context,
    vafWriters,
    pointPrimitive,
  );
  writeCompressedAttrib1(
    pointPrimitiveCollection,
    context,
    vafWriters,
    pointPrimitive,
  );
  writeScaleByDistance(
    pointPrimitiveCollection,
    context,
    vafWriters,
    pointPrimitive,
  );
  writeDistanceDisplayConditionAndDepthDisableAndSplitDirection(
    pointPrimitiveCollection,
    context,
    vafWriters,
    pointPrimitive,
  );
}

function recomputeActualPositions(
  pointPrimitiveCollection,
  pointPrimitives,
  length,
  frameState,
  modelMatrix,
  recomputeBoundingVolume,
) {
  let boundingVolume;
  if (frameState.mode === SceneMode["default"].SCENE3D) {
    boundingVolume = pointPrimitiveCollection._baseVolume;
    pointPrimitiveCollection._boundingVolumeDirty = true;
  } else {
    boundingVolume = pointPrimitiveCollection._baseVolume2D;
  }

  const positions = [];
  for (let i = 0; i < length; ++i) {
    const pointPrimitive = pointPrimitives[i];
    const position = pointPrimitive.position;
    const actualPosition = PointPrimitive["default"]._computeActualPosition(
      position,
      frameState,
      modelMatrix,
    );
    if ((0,defined["default"])(actualPosition)) {
      pointPrimitive._setActualPosition(actualPosition);

      if (recomputeBoundingVolume) {
        positions.push(actualPosition);
      } else {
        BoundingSphere["default"].expand(boundingVolume, actualPosition, boundingVolume);
      }
    }
  }

  if (recomputeBoundingVolume) {
    BoundingSphere["default"].fromPoints(positions, boundingVolume);
  }
}

function updateMode(pointPrimitiveCollection, frameState) {
  const mode = frameState.mode;

  const pointPrimitives = pointPrimitiveCollection._pointPrimitives;
  const pointPrimitivesToUpdate =
    pointPrimitiveCollection._pointPrimitivesToUpdate;
  const modelMatrix = pointPrimitiveCollection._modelMatrix;

  if (
    pointPrimitiveCollection._createVertexArray ||
    pointPrimitiveCollection._mode !== mode ||
    (mode !== SceneMode["default"].SCENE3D &&
      !Matrix4["default"].equals(modelMatrix, pointPrimitiveCollection.modelMatrix))
  ) {
    pointPrimitiveCollection._mode = mode;
    Matrix4["default"].clone(pointPrimitiveCollection.modelMatrix, modelMatrix);
    pointPrimitiveCollection._createVertexArray = true;

    if (
      mode === SceneMode["default"].SCENE3D ||
      mode === SceneMode["default"].SCENE2D ||
      mode === SceneMode["default"].COLUMBUS_VIEW
    ) {
      recomputeActualPositions(
        pointPrimitiveCollection,
        pointPrimitives,
        pointPrimitives.length,
        frameState,
        modelMatrix,
        true,
      );
    }
  } else if (mode === SceneMode["default"].MORPHING) {
    recomputeActualPositions(
      pointPrimitiveCollection,
      pointPrimitives,
      pointPrimitives.length,
      frameState,
      modelMatrix,
      true,
    );
  } else if (mode === SceneMode["default"].SCENE2D || mode === SceneMode["default"].COLUMBUS_VIEW) {
    recomputeActualPositions(
      pointPrimitiveCollection,
      pointPrimitivesToUpdate,
      pointPrimitiveCollection._pointPrimitivesToUpdateIndex,
      frameState,
      modelMatrix,
      false,
    );
  }
}

function updateBoundingVolume(collection, frameState, boundingVolume) {
  const pixelSize = frameState.camera.getPixelSize(
    boundingVolume,
    frameState.context.drawingBufferWidth,
    frameState.context.drawingBufferHeight,
  );
  const size = pixelSize * collection._maxPixelSize;
  boundingVolume.radius += size;
}

const scratchWriterArray = [];

/**
 * @private
 */
PointPrimitiveCollection.prototype.update = function (frameState) {
  removePointPrimitives(this);

  if (!this.show) {
    return;
  }

  this._maxTotalPointSize = ContextLimits["default"].maximumAliasedPointSize;

  updateMode(this, frameState);

  const pointPrimitives = this._pointPrimitives;
  const pointPrimitivesLength = pointPrimitives.length;
  const pointPrimitivesToUpdate = this._pointPrimitivesToUpdate;
  const pointPrimitivesToUpdateLength = this._pointPrimitivesToUpdateIndex;

  const properties = this._propertiesChanged;

  const createVertexArray = this._createVertexArray;

  let vafWriters;
  const context = frameState.context;
  const pass = frameState.passes;
  const picking = pass.pick;

  // PERFORMANCE_IDEA: Round robin multiple buffers.
  if (createVertexArray || (!picking && this.computeNewBuffersUsage())) {
    this._createVertexArray = false;

    for (let k = 0; k < NUMBER_OF_PROPERTIES; ++k) {
      properties[k] = 0;
    }

    this._vaf = this._vaf && this._vaf.destroy();

    if (pointPrimitivesLength > 0) {
      // PERFORMANCE_IDEA:  Instead of creating a new one, resize like std::vector.
      this._vaf = createVAF(context, pointPrimitivesLength, this._buffersUsage);
      vafWriters = this._vaf.writers;

      // Rewrite entire buffer if pointPrimitives were added or removed.
      for (let i = 0; i < pointPrimitivesLength; ++i) {
        const pointPrimitive = this._pointPrimitives[i];
        pointPrimitive._dirty = false; // In case it needed an update.
        writePointPrimitive(this, context, vafWriters, pointPrimitive);
      }

      this._vaf.commit();
    }

    this._pointPrimitivesToUpdateIndex = 0;
  } else if (pointPrimitivesToUpdateLength > 0) {
    // PointPrimitives were modified, but none were added or removed.
    const writers = scratchWriterArray;
    writers.length = 0;

    if (
      properties[POSITION_INDEX] ||
      properties[OUTLINE_WIDTH_INDEX] ||
      properties[PIXEL_SIZE_INDEX]
    ) {
      writers.push(writePositionSizeAndOutline);
    }

    if (properties[COLOR_INDEX] || properties[OUTLINE_COLOR_INDEX]) {
      writers.push(writeCompressedAttrib0);
    }

    if (properties[SHOW_INDEX] || properties[TRANSLUCENCY_BY_DISTANCE_INDEX]) {
      writers.push(writeCompressedAttrib1);
    }

    if (properties[SCALE_BY_DISTANCE_INDEX]) {
      writers.push(writeScaleByDistance);
    }

    if (
      properties[DISTANCE_DISPLAY_CONDITION_INDEX] ||
      properties[DISABLE_DEPTH_DISTANCE_INDEX] ||
      properties[SPLIT_DIRECTION_INDEX]
    ) {
      writers.push(
        writeDistanceDisplayConditionAndDepthDisableAndSplitDirection,
      );
    }

    const numWriters = writers.length;

    vafWriters = this._vaf.writers;

    if (pointPrimitivesToUpdateLength / pointPrimitivesLength > 0.1) {
      // If more than 10% of pointPrimitive change, rewrite the entire buffer.

      // PERFORMANCE_IDEA:  I totally made up 10% :).

      for (let m = 0; m < pointPrimitivesToUpdateLength; ++m) {
        const b = pointPrimitivesToUpdate[m];
        b._dirty = false;

        for (let n = 0; n < numWriters; ++n) {
          writers[n](this, context, vafWriters, b);
        }
      }
      this._vaf.commit();
    } else {
      for (let h = 0; h < pointPrimitivesToUpdateLength; ++h) {
        const bb = pointPrimitivesToUpdate[h];
        bb._dirty = false;

        for (let o = 0; o < numWriters; ++o) {
          writers[o](this, context, vafWriters, bb);
        }
        this._vaf.subCommit(bb._index, 1);
      }
      this._vaf.endSubCommits();
    }

    this._pointPrimitivesToUpdateIndex = 0;
  }

  // If the number of total pointPrimitives ever shrinks considerably
  // Truncate pointPrimitivesToUpdate so that we free memory that we're
  // not going to be using.
  if (pointPrimitivesToUpdateLength > pointPrimitivesLength * 1.5) {
    pointPrimitivesToUpdate.length = pointPrimitivesLength;
  }

  if (!(0,defined["default"])(this._vaf) || !(0,defined["default"])(this._vaf.va)) {
    return;
  }

  if (this._boundingVolumeDirty) {
    this._boundingVolumeDirty = false;
    BoundingSphere["default"].transform(
      this._baseVolume,
      this.modelMatrix,
      this._baseVolumeWC,
    );
  }

  let boundingVolume;
  let modelMatrix = Matrix4["default"].IDENTITY;
  if (frameState.mode === SceneMode["default"].SCENE3D) {
    modelMatrix = this.modelMatrix;
    boundingVolume = BoundingSphere["default"].clone(
      this._baseVolumeWC,
      this._boundingVolume,
    );
  } else {
    boundingVolume = BoundingSphere["default"].clone(
      this._baseVolume2D,
      this._boundingVolume,
    );
  }
  updateBoundingVolume(this, frameState, boundingVolume);

  const blendOptionChanged = this._blendOption !== this.blendOption;
  this._blendOption = this.blendOption;

  if (blendOptionChanged) {
    if (
      this._blendOption === BlendOption["default"].OPAQUE ||
      this._blendOption === BlendOption["default"].OPAQUE_AND_TRANSLUCENT
    ) {
      this._rsOpaque = RenderState["default"].fromCache({
        depthTest: {
          enabled: true,
          func: WebGLConstants["default"].LEQUAL,
        },
        depthMask: true,
      });
    } else {
      this._rsOpaque = undefined;
    }

    if (
      this._blendOption === BlendOption["default"].TRANSLUCENT ||
      this._blendOption === BlendOption["default"].OPAQUE_AND_TRANSLUCENT
    ) {
      this._rsTranslucent = RenderState["default"].fromCache({
        depthTest: {
          enabled: true,
          func: WebGLConstants["default"].LEQUAL,
        },
        depthMask: false,
        blending: BlendingState["default"].ALPHA_BLEND,
      });
    } else {
      this._rsTranslucent = undefined;
    }
  }

  this._shaderDisableDepthDistance =
    this._shaderDisableDepthDistance ||
    frameState.minimumDisableDepthTestDistance !== 0.0;
  let vs;
  let fs;

  if (
    blendOptionChanged ||
    (this._shaderScaleByDistance && !this._compiledShaderScaleByDistance) ||
    (this._shaderTranslucencyByDistance &&
      !this._compiledShaderTranslucencyByDistance) ||
    (this._shaderDistanceDisplayCondition &&
      !this._compiledShaderDistanceDisplayCondition) ||
    this._shaderDisableDepthDistance !==
      this._compiledShaderDisableDepthDistance
  ) {
    vs = new ShaderSource["default"]({
      sources: [PointPrimitiveCollectionVS],
    });
    if (this._shaderScaleByDistance) {
      vs.defines.push("EYE_DISTANCE_SCALING");
    }
    if (this._shaderTranslucencyByDistance) {
      vs.defines.push("EYE_DISTANCE_TRANSLUCENCY");
    }
    if (this._shaderDistanceDisplayCondition) {
      vs.defines.push("DISTANCE_DISPLAY_CONDITION");
    }
    if (this._shaderDisableDepthDistance) {
      vs.defines.push("DISABLE_DEPTH_DISTANCE");
    }

    if (this._blendOption === BlendOption["default"].OPAQUE_AND_TRANSLUCENT) {
      fs = new ShaderSource["default"]({
        defines: ["OPAQUE"],
        sources: [PointPrimitiveCollectionFS],
      });
      this._sp = ShaderProgram["default"].replaceCache({
        context: context,
        shaderProgram: this._sp,
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
        attributeLocations: attributeLocations,
      });

      fs = new ShaderSource["default"]({
        defines: ["TRANSLUCENT"],
        sources: [PointPrimitiveCollectionFS],
      });
      this._spTranslucent = ShaderProgram["default"].replaceCache({
        context: context,
        shaderProgram: this._spTranslucent,
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
        attributeLocations: attributeLocations,
      });
    }

    if (this._blendOption === BlendOption["default"].OPAQUE) {
      fs = new ShaderSource["default"]({
        sources: [PointPrimitiveCollectionFS],
      });
      this._sp = ShaderProgram["default"].replaceCache({
        context: context,
        shaderProgram: this._sp,
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
        attributeLocations: attributeLocations,
      });
    }

    if (this._blendOption === BlendOption["default"].TRANSLUCENT) {
      fs = new ShaderSource["default"]({
        sources: [PointPrimitiveCollectionFS],
      });
      this._spTranslucent = ShaderProgram["default"].replaceCache({
        context: context,
        shaderProgram: this._spTranslucent,
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
        attributeLocations: attributeLocations,
      });
    }

    this._compiledShaderScaleByDistance = this._shaderScaleByDistance;
    this._compiledShaderTranslucencyByDistance =
      this._shaderTranslucencyByDistance;
    this._compiledShaderDistanceDisplayCondition =
      this._shaderDistanceDisplayCondition;
    this._compiledShaderDisableDepthDistance = this._shaderDisableDepthDistance;
  }

  let va;
  let vaLength;
  let command;
  let j;

  const commandList = frameState.commandList;

  if (pass.render || picking) {
    const colorList = this._colorCommands;

    const opaque = this._blendOption === BlendOption["default"].OPAQUE;
    const opaqueAndTranslucent =
      this._blendOption === BlendOption["default"].OPAQUE_AND_TRANSLUCENT;

    va = this._vaf.va;
    vaLength = va.length;

    colorList.length = vaLength;
    const totalLength = opaqueAndTranslucent ? vaLength * 2 : vaLength;
    for (j = 0; j < totalLength; ++j) {
      const opaqueCommand = opaque || (opaqueAndTranslucent && j % 2 === 0);

      command = colorList[j];
      if (!(0,defined["default"])(command)) {
        command = colorList[j] = new DrawCommand["default"]();
      }

      command.primitiveType = PrimitiveType["default"].POINTS;
      command.pass =
        opaqueCommand || !opaqueAndTranslucent ? Pass["default"].OPAQUE : Pass["default"].TRANSLUCENT;
      command.owner = this;

      const index = opaqueAndTranslucent ? Math.floor(j / 2.0) : j;
      command.boundingVolume = boundingVolume;
      command.modelMatrix = modelMatrix;
      command.shaderProgram = opaqueCommand ? this._sp : this._spTranslucent;
      command.uniformMap = this._uniforms;
      command.vertexArray = va[index].va;
      command.renderState = opaqueCommand
        ? this._rsOpaque
        : this._rsTranslucent;
      command.debugShowBoundingVolume = this.debugShowBoundingVolume;
      command.pickId = "v_pickColor";

      commandList.push(command);
    }
  }
};

/**
 * Returns true if this object was destroyed; otherwise, false.
 * <br /><br />
 * If this object was destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
 *
 * @returns {boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
 *
 * @see PointPrimitiveCollection#destroy
 */
PointPrimitiveCollection.prototype.isDestroyed = function () {
  return false;
};

/**
 * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
 * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
 * <br /><br />
 * Once an object is destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
 * assign the return value (<code>undefined</code>) to the object as done in the example.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * pointPrimitives = pointPrimitives && pointPrimitives.destroy();
 *
 * @see PointPrimitiveCollection#isDestroyed
 */
PointPrimitiveCollection.prototype.destroy = function () {
  this._sp = this._sp && this._sp.destroy();
  this._spTranslucent = this._spTranslucent && this._spTranslucent.destroy();
  this._spPick = this._spPick && this._spPick.destroy();
  this._vaf = this._vaf && this._vaf.destroy();
  destroyPointPrimitives(this._pointPrimitives);

  return (0,destroyObject["default"])(this);
};
/* harmony default export */ const Scene_PointPrimitiveCollection = (PointPrimitiveCollection);


/***/ }),

/***/ 793:
/*!******************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Core/CullingVolume.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cartesian3.js */ 67980);
/* harmony import */ var _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cartesian4.js */ 26809);
/* harmony import */ var _defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defined.js */ 91446);
/* harmony import */ var _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeveloperError.js */ 5971);
/* harmony import */ var _Intersect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Intersect.js */ 47326);
/* harmony import */ var _Plane_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Plane.js */ 57941);







/**
 * The culling volume defined by planes.
 *
 * @alias CullingVolume
 * @constructor
 *
 * @param {Cartesian4[]} [planes] An array of clipping planes.
 */
function CullingVolume(planes) {
  /**
   * Each plane is represented by a Cartesian4 object, where the x, y, and z components
   * define the unit vector normal to the plane, and the w component is the distance of the
   * plane from the origin.
   * @type {Cartesian4[]}
   * @default []
   */
  this.planes = planes ?? [];
}

const faces = [new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"](), new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"](), new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]()];
_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].clone(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_X, faces[0]);
_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].clone(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_Y, faces[1]);
_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].clone(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_Z, faces[2]);

const scratchPlaneCenter = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const scratchPlaneNormal = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const scratchPlane = new _Plane_js__WEBPACK_IMPORTED_MODULE_5__["default"](new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"](1.0, 0.0, 0.0), 0.0);

/**
 * Constructs a culling volume from a bounding sphere. Creates six planes that create a box containing the sphere.
 * The planes are aligned to the x, y, and z axes in world coordinates.
 *
 * @param {BoundingSphere} boundingSphere The bounding sphere used to create the culling volume.
 * @param {CullingVolume} [result] The object onto which to store the result.
 * @returns {CullingVolume} The culling volume created from the bounding sphere.
 */
CullingVolume.fromBoundingSphere = function (boundingSphere, result) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(boundingSphere)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("boundingSphere is required.");
  }
  //>>includeEnd('debug');

  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result)) {
    result = new CullingVolume();
  }

  const length = faces.length;
  const planes = result.planes;
  planes.length = 2 * length;

  const center = boundingSphere.center;
  const radius = boundingSphere.radius;

  let planeIndex = 0;

  for (let i = 0; i < length; ++i) {
    const faceNormal = faces[i];

    let plane0 = planes[planeIndex];
    let plane1 = planes[planeIndex + 1];

    if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(plane0)) {
      plane0 = planes[planeIndex] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(plane1)) {
      plane1 = planes[planeIndex + 1] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }

    _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(faceNormal, -radius, scratchPlaneCenter);
    _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(center, scratchPlaneCenter, scratchPlaneCenter);

    plane0.x = faceNormal.x;
    plane0.y = faceNormal.y;
    plane0.z = faceNormal.z;
    plane0.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(faceNormal, scratchPlaneCenter);

    _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(faceNormal, radius, scratchPlaneCenter);
    _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(center, scratchPlaneCenter, scratchPlaneCenter);

    plane1.x = -faceNormal.x;
    plane1.y = -faceNormal.y;
    plane1.z = -faceNormal.z;
    plane1.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(
      _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].negate(faceNormal, scratchPlaneNormal),
      scratchPlaneCenter,
    );

    planeIndex += 2;
  }

  return result;
};

/**
 * Determines whether a bounding volume intersects the culling volume.
 *
 * @param {object} boundingVolume The bounding volume whose intersection with the culling volume is to be tested.
 * @returns {Intersect}  Intersect.OUTSIDE, Intersect.INTERSECTING, or Intersect.INSIDE.
 */
CullingVolume.prototype.computeVisibility = function (boundingVolume) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(boundingVolume)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("boundingVolume is required.");
  }
  //>>includeEnd('debug');

  const planes = this.planes;
  let intersecting = false;
  for (let k = 0, len = planes.length; k < len; ++k) {
    const result = boundingVolume.intersectPlane(
      _Plane_js__WEBPACK_IMPORTED_MODULE_5__["default"].fromCartesian4(planes[k], scratchPlane),
    );
    if (result === _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].OUTSIDE) {
      return _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].OUTSIDE;
    } else if (result === _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].INTERSECTING) {
      intersecting = true;
    }
  }

  return intersecting ? _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].INTERSECTING : _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].INSIDE;
};

/**
 * Determines whether a bounding volume intersects the culling volume.
 *
 * @param {object} boundingVolume The bounding volume whose intersection with the culling volume is to be tested.
 * @param {number} parentPlaneMask A bit mask from the boundingVolume's parent's check against the same culling
 *                                 volume, such that if (planeMask & (1 << planeIndex) === 0), for k < 31, then
 *                                 the parent (and therefore this) volume is completely inside plane[planeIndex]
 *                                 and that plane check can be skipped.
 * @returns {number} A plane mask as described above (which can be applied to this boundingVolume's children).
 *
 * @private
 */
CullingVolume.prototype.computeVisibilityWithPlaneMask = function (
  boundingVolume,
  parentPlaneMask,
) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(boundingVolume)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("boundingVolume is required.");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(parentPlaneMask)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("parentPlaneMask is required.");
  }
  //>>includeEnd('debug');

  if (
    parentPlaneMask === CullingVolume.MASK_OUTSIDE ||
    parentPlaneMask === CullingVolume.MASK_INSIDE
  ) {
    // parent is completely outside or completely inside, so this child is as well.
    return parentPlaneMask;
  }

  // Start with MASK_INSIDE (all zeros) so that after the loop, the return value can be compared with MASK_INSIDE.
  // (Because if there are fewer than 31 planes, the upper bits wont be changed.)
  let mask = CullingVolume.MASK_INSIDE;

  const planes = this.planes;
  for (let k = 0, len = planes.length; k < len; ++k) {
    // For k greater than 31 (since 31 is the maximum number of INSIDE/INTERSECTING bits we can store), skip the optimization.
    const flag = k < 31 ? 1 << k : 0;
    if (k < 31 && (parentPlaneMask & flag) === 0) {
      // boundingVolume is known to be INSIDE this plane.
      continue;
    }

    const result = boundingVolume.intersectPlane(
      _Plane_js__WEBPACK_IMPORTED_MODULE_5__["default"].fromCartesian4(planes[k], scratchPlane),
    );
    if (result === _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].OUTSIDE) {
      return CullingVolume.MASK_OUTSIDE;
    } else if (result === _Intersect_js__WEBPACK_IMPORTED_MODULE_4__["default"].INTERSECTING) {
      mask |= flag;
    }
  }

  return mask;
};

/**
 * For plane masks (as used in {@link CullingVolume#computeVisibilityWithPlaneMask}), this special value
 * represents the case where the object bounding volume is entirely outside the culling volume.
 *
 * @type {number}
 * @private
 */
CullingVolume.MASK_OUTSIDE = 0xffffffff;

/**
 * For plane masks (as used in {@link CullingVolume.prototype.computeVisibilityWithPlaneMask}), this value
 * represents the case where the object bounding volume is entirely inside the culling volume.
 *
 * @type {number}
 * @private
 */
CullingVolume.MASK_INSIDE = 0x00000000;

/**
 * For plane masks (as used in {@link CullingVolume.prototype.computeVisibilityWithPlaneMask}), this value
 * represents the case where the object bounding volume (may) intersect all planes of the culling volume.
 *
 * @type {number}
 * @private
 */
CullingVolume.MASK_INDETERMINATE = 0x7fffffff;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CullingVolume);


/***/ }),

/***/ 11203:
/*!************************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Core/OrthographicFrustum.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Check.js */ 69031);
/* harmony import */ var _Frozen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Frozen.js */ 15325);
/* harmony import */ var _defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defined.js */ 91446);
/* harmony import */ var _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeveloperError.js */ 5971);
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Math.js */ 67817);
/* harmony import */ var _OrthographicOffCenterFrustum_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OrthographicOffCenterFrustum.js */ 65891);







/**
 * The viewing frustum is defined by 6 planes.
 * Each plane is represented by a {@link Cartesian4} object, where the x, y, and z components
 * define the unit vector normal to the plane, and the w component is the distance of the
 * plane from the origin/camera position.
 *
 * @alias OrthographicFrustum
 * @constructor
 *
 * @param {object} [options] An object with the following properties:
 * @param {number} [options.width] The width of the frustum in meters.
 * @param {number} [options.aspectRatio] The aspect ratio of the frustum's width to it's height.
 * @param {number} [options.near=1.0] The distance of the near plane.
 * @param {number} [options.far=500000000.0] The distance of the far plane.
 *
 * @example
 * const maxRadii = ellipsoid.maximumRadius;
 *
 * const frustum = new Cesium.OrthographicFrustum();
 * frustum.near = 0.01 * maxRadii;
 * frustum.far = 50.0 * maxRadii;
 */
function OrthographicFrustum(options) {
  options = options ?? _Frozen_js__WEBPACK_IMPORTED_MODULE_1__["default"].EMPTY_OBJECT;

  this._offCenterFrustum = new _OrthographicOffCenterFrustum_js__WEBPACK_IMPORTED_MODULE_5__["default"]();

  /**
   * The horizontal width of the frustum in meters.
   * @type {number|undefined}
   * @default undefined
   */
  this.width = options.width;
  this._width = undefined;

  /**
   * The aspect ratio of the frustum's width to it's height.
   * @type {number|undefined}
   * @default undefined
   */
  this.aspectRatio = options.aspectRatio;
  this._aspectRatio = undefined;

  /**
   * The distance of the near plane.
   * @type {number}
   * @default 1.0
   */
  this.near = options.near ?? 1.0;
  this._near = this.near;

  /**
   * The distance of the far plane.
   * @type {number}
   * @default 500000000.0;
   */
  this.far = options.far ?? 500000000.0;
  this._far = this.far;
}

/**
 * The number of elements used to pack the object into an array.
 * @type {number}
 */
OrthographicFrustum.packedLength = 4;

/**
 * Stores the provided instance into the provided array.
 *
 * @param {OrthographicFrustum} value The value to pack.
 * @param {number[]} array The array to pack into.
 * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
 *
 * @returns {number[]} The array that was packed into
 */
OrthographicFrustum.pack = function (value, array, startingIndex) {
  //>>includeStart('debug', pragmas.debug);
  _Check_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeOf.object("value", value);
  _Check_js__WEBPACK_IMPORTED_MODULE_0__["default"].defined("array", array);
  //>>includeEnd('debug');

  startingIndex = startingIndex ?? 0;

  array[startingIndex++] = value.width;
  array[startingIndex++] = value.aspectRatio;
  array[startingIndex++] = value.near;
  array[startingIndex] = value.far;

  return array;
};

/**
 * Retrieves an instance from a packed array.
 *
 * @param {number[]} array The packed array.
 * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
 * @param {OrthographicFrustum} [result] The object into which to store the result.
 * @returns {OrthographicFrustum} The modified result parameter or a new OrthographicFrustum instance if one was not provided.
 */
OrthographicFrustum.unpack = function (array, startingIndex, result) {
  //>>includeStart('debug', pragmas.debug);
  _Check_js__WEBPACK_IMPORTED_MODULE_0__["default"].defined("array", array);
  //>>includeEnd('debug');

  startingIndex = startingIndex ?? 0;

  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result)) {
    result = new OrthographicFrustum();
  }

  result.width = array[startingIndex++];
  result.aspectRatio = array[startingIndex++];
  result.near = array[startingIndex++];
  result.far = array[startingIndex];

  return result;
};

function update(frustum) {
  //>>includeStart('debug', pragmas.debug);
  if (
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(frustum.width) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(frustum.aspectRatio) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(frustum.near) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(frustum.far)
  ) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
      "width, aspectRatio, near, or far parameters are not set.",
    );
  }
  //>>includeEnd('debug');

  const f = frustum._offCenterFrustum;

  if (
    frustum.width !== frustum._width ||
    frustum.aspectRatio !== frustum._aspectRatio ||
    frustum.near !== frustum._near ||
    frustum.far !== frustum._far
  ) {
    //>>includeStart('debug', pragmas.debug);
    if (frustum.aspectRatio < 0) {
      throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("aspectRatio must be positive.");
    }
    if (frustum.near < 0 || frustum.near > frustum.far) {
      throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
        "near must be greater than zero and less than far.",
      );
    }
    //>>includeEnd('debug');

    frustum._aspectRatio = frustum.aspectRatio;
    frustum._width = frustum.width;
    frustum._near = frustum.near;
    frustum._far = frustum.far;

    const ratio = 1.0 / frustum.aspectRatio;
    f.right = frustum.width * 0.5;
    f.left = -f.right;
    f.top = ratio * f.right;
    f.bottom = -f.top;
    f.near = frustum.near;
    f.far = frustum.far;
  }
}

Object.defineProperties(OrthographicFrustum.prototype, {
  /**
   * Gets the orthographic projection matrix computed from the view frustum.
   * @memberof OrthographicFrustum.prototype
   * @type {Matrix4}
   * @readonly
   */
  projectionMatrix: {
    get: function () {
      update(this);
      return this._offCenterFrustum.projectionMatrix;
    },
  },
  /**
   * Gets the orthographic projection matrix computed from the view frustum.
   * @memberof OrthographicFrustum.prototype
   * @type {OrthographicOffCenterFrustum}
   * @readonly
   * @private
   */
  offCenterFrustum: {
    get: function () {
      update(this);
      return this._offCenterFrustum;
    },
  },
});

/**
 * Creates a culling volume for this frustum.
 *
 * @param {Cartesian3} position The eye position.
 * @param {Cartesian3} direction The view direction.
 * @param {Cartesian3} up The up direction.
 * @returns {CullingVolume} A culling volume at the given position and orientation.
 *
 * @example
 * // Check if a bounding volume intersects the frustum.
 * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
 * const intersect = cullingVolume.computeVisibility(boundingVolume);
 */
OrthographicFrustum.prototype.computeCullingVolume = function (
  position,
  direction,
  up,
) {
  update(this);
  return this._offCenterFrustum.computeCullingVolume(position, direction, up);
};

/**
 * Returns the pixel's width and height in meters.
 *
 * @param {number} drawingBufferWidth The width of the drawing buffer.
 * @param {number} drawingBufferHeight The height of the drawing buffer.
 * @param {number} distance The distance to the near plane in meters.
 * @param {number} pixelRatio The scaling factor from pixel space to coordinate space.
 * @param {Cartesian2} result The object onto which to store the result.
 * @returns {Cartesian2} The modified result parameter or a new instance of {@link Cartesian2} with the pixel's width and height in the x and y properties, respectively.
 *
 * @exception {DeveloperError} drawingBufferWidth must be greater than zero.
 * @exception {DeveloperError} drawingBufferHeight must be greater than zero.
 * @exception {DeveloperError} pixelRatio must be greater than zero.
 *
 * @example
 * // Example 1
 * // Get the width and height of a pixel.
 * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 0.0, scene.pixelRatio, new Cesium.Cartesian2());
 */
OrthographicFrustum.prototype.getPixelDimensions = function (
  drawingBufferWidth,
  drawingBufferHeight,
  distance,
  pixelRatio,
  result,
) {
  update(this);
  return this._offCenterFrustum.getPixelDimensions(
    drawingBufferWidth,
    drawingBufferHeight,
    distance,
    pixelRatio,
    result,
  );
};

/**
 * Returns a duplicate of a OrthographicFrustum instance.
 *
 * @param {OrthographicFrustum} [result] The object onto which to store the result.
 * @returns {OrthographicFrustum} The modified result parameter or a new OrthographicFrustum instance if one was not provided.
 */
OrthographicFrustum.prototype.clone = function (result) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(result)) {
    result = new OrthographicFrustum();
  }

  result.aspectRatio = this.aspectRatio;
  result.width = this.width;
  result.near = this.near;
  result.far = this.far;

  // force update of clone to compute matrices
  result._aspectRatio = undefined;
  result._width = undefined;
  result._near = undefined;
  result._far = undefined;

  this._offCenterFrustum.clone(result._offCenterFrustum);

  return result;
};

/**
 * Compares the provided OrthographicFrustum componentwise and returns
 * <code>true</code> if they are equal, <code>false</code> otherwise.
 *
 * @param {OrthographicFrustum} [other] The right hand side OrthographicFrustum.
 * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
 */
OrthographicFrustum.prototype.equals = function (other) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(other) || !(other instanceof OrthographicFrustum)) {
    return false;
  }

  update(this);
  update(other);

  return (
    this.width === other.width &&
    this.aspectRatio === other.aspectRatio &&
    this._offCenterFrustum.equals(other._offCenterFrustum)
  );
};

/**
 * Compares the provided OrthographicFrustum componentwise and returns
 * <code>true</code> if they pass an absolute or relative tolerance test,
 * <code>false</code> otherwise.
 *
 * @param {OrthographicFrustum} other The right hand side OrthographicFrustum.
 * @param {number} relativeEpsilon The relative epsilon tolerance to use for equality testing.
 * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
 * @returns {boolean} <code>true</code> if this and other are within the provided epsilon, <code>false</code> otherwise.
 */
OrthographicFrustum.prototype.equalsEpsilon = function (
  other,
  relativeEpsilon,
  absoluteEpsilon,
) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(other) || !(other instanceof OrthographicFrustum)) {
    return false;
  }

  update(this);
  update(other);

  return (
    _Math_js__WEBPACK_IMPORTED_MODULE_4__["default"].equalsEpsilon(
      this.width,
      other.width,
      relativeEpsilon,
      absoluteEpsilon,
    ) &&
    _Math_js__WEBPACK_IMPORTED_MODULE_4__["default"].equalsEpsilon(
      this.aspectRatio,
      other.aspectRatio,
      relativeEpsilon,
      absoluteEpsilon,
    ) &&
    this._offCenterFrustum.equalsEpsilon(
      other._offCenterFrustum,
      relativeEpsilon,
      absoluteEpsilon,
    )
  );
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrthographicFrustum);


/***/ }),

/***/ 13419:
/*!********************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Scene/SplitDirection.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The direction to display a primitive or ImageryLayer relative to the {@link Scene#splitPosition}.
 *
 * @enum {number}
 *
 * @see ImageryLayer#splitDirection
 * @see Cesium3DTileset#splitDirection
 */
const SplitDirection = {
  /**
   * Display the primitive or ImageryLayer to the left of the {@link Scene#splitPosition}.
   *
   * @type {number}
   * @constant
   */
  LEFT: -1.0,

  /**
   *  Always display the primitive or ImageryLayer.
   *
   * @type {number}
   * @constant
   */
  NONE: 0.0,

  /**
   * Display the primitive or ImageryLayer to the right of the {@link Scene#splitPosition}.
   *
   * @type {number}
   * @constant
   */
  RIGHT: 1.0,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.freeze(SplitDirection));


/***/ }),

/***/ 16882:
/*!*****************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Scene/BlendOption.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Determines how opaque and translucent parts of billboards, points, and labels are blended with the scene.
 *
 * @enum {number}
 */
const BlendOption = {
  /**
   * The billboards, points, or labels in the collection are completely opaque.
   * @type {number}
   * @constant
   */
  OPAQUE: 0,

  /**
   * The billboards, points, or labels in the collection are completely translucent.
   * @type {number}
   * @constant
   */
  TRANSLUCENT: 1,

  /**
   * The billboards, points, or labels in the collection are both opaque and translucent.
   * @type {number}
   * @constant
   */
  OPAQUE_AND_TRANSLUCENT: 2,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.freeze(BlendOption));


/***/ }),

/***/ 20853:
/*!********************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Scene/PointPrimitive.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Core_BoundingRectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/BoundingRectangle.js */ 47934);
/* harmony import */ var _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/Cartesian2.js */ 34067);
/* harmony import */ var _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Cartesian3.js */ 67980);
/* harmony import */ var _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/Cartesian4.js */ 26809);
/* harmony import */ var _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/Color.js */ 41476);
/* harmony import */ var _Core_Frozen_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Core/Frozen.js */ 15325);
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Core/defined.js */ 91446);
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Core/DeveloperError.js */ 5971);
/* harmony import */ var _Core_DistanceDisplayCondition_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Core/DistanceDisplayCondition.js */ 53331);
/* harmony import */ var _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Core/Matrix4.js */ 84164);
/* harmony import */ var _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Core/NearFarScalar.js */ 90176);
/* harmony import */ var _SceneMode_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SceneMode.js */ 62467);
/* harmony import */ var _SceneTransforms_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SceneTransforms.js */ 78173);
/* harmony import */ var _SplitDirection_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SplitDirection.js */ 13419);















/**
 * <div class="notice">
 * A point is created and its initial properties are set by calling {@link PointPrimitiveCollection#add}. Do not call the constructor directly.
 * </div>
 * A graphical point positioned in the 3D scene, that is created
 * and rendered using a {@link PointPrimitiveCollection}.
 *
 * @alias PointPrimitive
 *
 * @performance Reading a property, e.g., {@link PointPrimitive#show}, is constant time.
 * Assigning to a property is constant time but results in
 * CPU to GPU traffic when {@link PointPrimitiveCollection#update} is called.  The per-pointPrimitive traffic is
 * the same regardless of how many properties were updated.  If most pointPrimitives in a collection need to be
 * updated, it may be more efficient to clear the collection with {@link PointPrimitiveCollection#removeAll}
 * and add new pointPrimitives instead of modifying each one.
 *
 * @exception {DeveloperError} scaleByDistance.far must be greater than scaleByDistance.near
 * @exception {DeveloperError} translucencyByDistance.far must be greater than translucencyByDistance.near
 * @exception {DeveloperError} distanceDisplayCondition.far must be greater than distanceDisplayCondition.near
 *
 * @see PointPrimitiveCollection
 * @see PointPrimitiveCollection#add
 *
 * @internalConstructor
 * @class
 *
 * @demo {@link https://sandcastle.cesium.com/index.html?src=Points.html|Cesium Sandcastle Points Demo}
 */
function PointPrimitive(options, pointPrimitiveCollection) {
  options = options ?? _Core_Frozen_js__WEBPACK_IMPORTED_MODULE_5__["default"].EMPTY_OBJECT;

  //>>includeStart('debug', pragmas.debug);
  if (
    (0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(options.disableDepthTestDistance) &&
    options.disableDepthTestDistance < 0.0
  ) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
      "disableDepthTestDistance must be greater than or equal to 0.0.",
    );
  }
  //>>includeEnd('debug');

  let translucencyByDistance = options.translucencyByDistance;
  let scaleByDistance = options.scaleByDistance;
  let distanceDisplayCondition = options.distanceDisplayCondition;
  if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(translucencyByDistance)) {
    //>>includeStart('debug', pragmas.debug);
    if (translucencyByDistance.far <= translucencyByDistance.near) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
        "translucencyByDistance.far must be greater than translucencyByDistance.near.",
      );
    }
    //>>includeEnd('debug');
    translucencyByDistance = _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].clone(translucencyByDistance);
  }
  if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(scaleByDistance)) {
    //>>includeStart('debug', pragmas.debug);
    if (scaleByDistance.far <= scaleByDistance.near) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
        "scaleByDistance.far must be greater than scaleByDistance.near.",
      );
    }
    //>>includeEnd('debug');
    scaleByDistance = _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].clone(scaleByDistance);
  }
  if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(distanceDisplayCondition)) {
    //>>includeStart('debug', pragmas.debug);
    if (distanceDisplayCondition.far <= distanceDisplayCondition.near) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
        "distanceDisplayCondition.far must be greater than distanceDisplayCondition.near.",
      );
    }
    //>>includeEnd('debug');
    distanceDisplayCondition = _Core_DistanceDisplayCondition_js__WEBPACK_IMPORTED_MODULE_8__["default"].clone(
      distanceDisplayCondition,
    );
  }

  this._show = options.show ?? true;
  this._position = _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(options.position ?? _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].ZERO);
  this._actualPosition = _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(this._position); // For columbus view and 2D
  this._color = _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].clone(options.color ?? _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].WHITE);
  this._outlineColor = _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].clone(options.outlineColor ?? _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].TRANSPARENT);
  this._outlineWidth = options.outlineWidth ?? 0.0;
  this._pixelSize = options.pixelSize ?? 10.0;
  this._scaleByDistance = scaleByDistance;
  this._translucencyByDistance = translucencyByDistance;
  this._distanceDisplayCondition = distanceDisplayCondition;
  this._disableDepthTestDistance = options.disableDepthTestDistance ?? 0.0;
  this._id = options.id;
  this._collection = options.collection ?? pointPrimitiveCollection;

  this._clusterShow = true;

  this._pickId = undefined;
  this._pointPrimitiveCollection = pointPrimitiveCollection;
  this._dirty = false;
  this._index = -1; //Used only by PointPrimitiveCollection

  this._splitDirection = options.splitDirection ?? _SplitDirection_js__WEBPACK_IMPORTED_MODULE_13__["default"].NONE;
}

const SHOW_INDEX = (PointPrimitive.SHOW_INDEX = 0);
const POSITION_INDEX = (PointPrimitive.POSITION_INDEX = 1);
const COLOR_INDEX = (PointPrimitive.COLOR_INDEX = 2);
const OUTLINE_COLOR_INDEX = (PointPrimitive.OUTLINE_COLOR_INDEX = 3);
const OUTLINE_WIDTH_INDEX = (PointPrimitive.OUTLINE_WIDTH_INDEX = 4);
const PIXEL_SIZE_INDEX = (PointPrimitive.PIXEL_SIZE_INDEX = 5);
const SCALE_BY_DISTANCE_INDEX = (PointPrimitive.SCALE_BY_DISTANCE_INDEX = 6);
const TRANSLUCENCY_BY_DISTANCE_INDEX =
  (PointPrimitive.TRANSLUCENCY_BY_DISTANCE_INDEX = 7);
const DISTANCE_DISPLAY_CONDITION_INDEX =
  (PointPrimitive.DISTANCE_DISPLAY_CONDITION_INDEX = 8);
const DISABLE_DEPTH_DISTANCE_INDEX =
  (PointPrimitive.DISABLE_DEPTH_DISTANCE_INDEX = 9);
const SPLIT_DIRECTION_INDEX = (PointPrimitive.SPLIT_DIRECTION_INDEX = 10);
PointPrimitive.NUMBER_OF_PROPERTIES = 11;

function makeDirty(pointPrimitive, propertyChanged) {
  const pointPrimitiveCollection = pointPrimitive._pointPrimitiveCollection;
  if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(pointPrimitiveCollection)) {
    pointPrimitiveCollection._updatePointPrimitive(
      pointPrimitive,
      propertyChanged,
    );
    pointPrimitive._dirty = true;
  }
}

Object.defineProperties(PointPrimitive.prototype, {
  /**
   * Determines if this point will be shown.  Use this to hide or show a point, instead
   * of removing it and re-adding it to the collection.
   * @memberof PointPrimitive.prototype
   * @type {boolean}
   */
  show: {
    get: function () {
      return this._show;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("value is required.");
      }
      //>>includeEnd('debug');

      if (this._show !== value) {
        this._show = value;
        makeDirty(this, SHOW_INDEX);
      }
    },
  },

  /**
   * Gets or sets the Cartesian position of this point.
   * @memberof PointPrimitive.prototype
   * @type {Cartesian3}
   */
  position: {
    get: function () {
      return this._position;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug)
      if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("value is required.");
      }
      //>>includeEnd('debug');

      const position = this._position;
      if (!_Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].equals(position, value)) {
        _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(value, position);
        _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(value, this._actualPosition);

        makeDirty(this, POSITION_INDEX);
      }
    },
  },

  /**
   * Gets or sets near and far scaling properties of a point based on the point's distance from the camera.
   * A point's scale will interpolate between the {@link NearFarScalar#nearValue} and
   * {@link NearFarScalar#farValue} while the camera distance falls within the lower and upper bounds
   * of the specified {@link NearFarScalar#near} and {@link NearFarScalar#far}.
   * Outside of these ranges the point's scale remains clamped to the nearest bound.  This scale
   * multiplies the pixelSize and outlineWidth to affect the total size of the point.  If undefined,
   * scaleByDistance will be disabled.
   * @memberof PointPrimitive.prototype
   * @type {NearFarScalar}
   *
   * @example
   * // Example 1.
   * // Set a pointPrimitive's scaleByDistance to scale to 15 when the
   * // camera is 1500 meters from the pointPrimitive and disappear as
   * // the camera distance approaches 8.0e6 meters.
   * p.scaleByDistance = new Cesium.NearFarScalar(1.5e2, 15, 8.0e6, 0.0);
   *
   * @example
   * // Example 2.
   * // disable scaling by distance
   * p.scaleByDistance = undefined;
   */
  scaleByDistance: {
    get: function () {
      return this._scaleByDistance;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value) && value.far <= value.near) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
          "far distance must be greater than near distance.",
        );
      }
      //>>includeEnd('debug');

      const scaleByDistance = this._scaleByDistance;
      if (!_Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].equals(scaleByDistance, value)) {
        this._scaleByDistance = _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].clone(value, scaleByDistance);
        makeDirty(this, SCALE_BY_DISTANCE_INDEX);
      }
    },
  },

  /**
   * Gets or sets near and far translucency properties of a point based on the point's distance from the camera.
   * A point's translucency will interpolate between the {@link NearFarScalar#nearValue} and
   * {@link NearFarScalar#farValue} while the camera distance falls within the lower and upper bounds
   * of the specified {@link NearFarScalar#near} and {@link NearFarScalar#far}.
   * Outside of these ranges the point's translucency remains clamped to the nearest bound.  If undefined,
   * translucencyByDistance will be disabled.
   * @memberof PointPrimitive.prototype
   * @type {NearFarScalar}
   *
   * @example
   * // Example 1.
   * // Set a point's translucency to 1.0 when the
   * // camera is 1500 meters from the point and disappear as
   * // the camera distance approaches 8.0e6 meters.
   * p.translucencyByDistance = new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0);
   *
   * @example
   * // Example 2.
   * // disable translucency by distance
   * p.translucencyByDistance = undefined;
   */
  translucencyByDistance: {
    get: function () {
      return this._translucencyByDistance;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value) && value.far <= value.near) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
          "far distance must be greater than near distance.",
        );
      }
      //>>includeEnd('debug');

      const translucencyByDistance = this._translucencyByDistance;
      if (!_Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].equals(translucencyByDistance, value)) {
        this._translucencyByDistance = _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].clone(
          value,
          translucencyByDistance,
        );
        makeDirty(this, TRANSLUCENCY_BY_DISTANCE_INDEX);
      }
    },
  },

  /**
   * Gets or sets the inner size of the point in pixels.
   * @memberof PointPrimitive.prototype
   * @type {number}
   */
  pixelSize: {
    get: function () {
      return this._pixelSize;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("value is required.");
      }
      //>>includeEnd('debug');

      if (this._pixelSize !== value) {
        this._pixelSize = value;
        makeDirty(this, PIXEL_SIZE_INDEX);
      }
    },
  },

  /**
   * Gets or sets the inner color of the point.
   * The red, green, blue, and alpha values are indicated by <code>value</code>'s <code>red</code>, <code>green</code>,
   * <code>blue</code>, and <code>alpha</code> properties as shown in Example 1.  These components range from <code>0.0</code>
   * (no intensity) to <code>1.0</code> (full intensity).
   * @memberof PointPrimitive.prototype
   * @type {Color}
   *
   * @example
   * // Example 1. Assign yellow.
   * p.color = Cesium.Color.YELLOW;
   *
   * @example
   * // Example 2. Make a pointPrimitive 50% translucent.
   * p.color = new Cesium.Color(1.0, 1.0, 1.0, 0.5);
   */
  color: {
    get: function () {
      return this._color;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("value is required.");
      }
      //>>includeEnd('debug');

      const color = this._color;
      if (!_Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].equals(color, value)) {
        _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].clone(value, color);
        makeDirty(this, COLOR_INDEX);
      }
    },
  },

  /**
   * Gets or sets the outline color of the point.
   * @memberof PointPrimitive.prototype
   * @type {Color}
   */
  outlineColor: {
    get: function () {
      return this._outlineColor;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("value is required.");
      }
      //>>includeEnd('debug');

      const outlineColor = this._outlineColor;
      if (!_Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].equals(outlineColor, value)) {
        _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].clone(value, outlineColor);
        makeDirty(this, OUTLINE_COLOR_INDEX);
      }
    },
  },

  /**
   * Gets or sets the outline width in pixels.  This width adds to pixelSize,
   * increasing the total size of the point.
   * @memberof PointPrimitive.prototype
   * @type {number}
   */
  outlineWidth: {
    get: function () {
      return this._outlineWidth;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value)) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("value is required.");
      }
      //>>includeEnd('debug');

      if (this._outlineWidth !== value) {
        this._outlineWidth = value;
        makeDirty(this, OUTLINE_WIDTH_INDEX);
      }
    },
  },

  /**
   * Gets or sets the condition specifying at what distance from the camera that this point will be displayed.
   * @memberof PointPrimitive.prototype
   * @type {DistanceDisplayCondition}
   * @default undefined
   */
  distanceDisplayCondition: {
    get: function () {
      return this._distanceDisplayCondition;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value) && value.far <= value.near) {
        throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("far must be greater than near");
      }
      //>>includeEnd('debug');
      if (
        !_Core_DistanceDisplayCondition_js__WEBPACK_IMPORTED_MODULE_8__["default"].equals(this._distanceDisplayCondition, value)
      ) {
        this._distanceDisplayCondition = _Core_DistanceDisplayCondition_js__WEBPACK_IMPORTED_MODULE_8__["default"].clone(
          value,
          this._distanceDisplayCondition,
        );
        makeDirty(this, DISTANCE_DISPLAY_CONDITION_INDEX);
      }
    },
  },

  /**
   * Gets or sets the distance from the camera at which to disable the depth test to, for example, prevent clipping against terrain.
   * When set to zero, the depth test is always applied. When set to Number.POSITIVE_INFINITY, the depth test is never applied.
   * @memberof PointPrimitive.prototype
   * @type {number}
   * @default 0.0
   */
  disableDepthTestDistance: {
    get: function () {
      return this._disableDepthTestDistance;
    },
    set: function (value) {
      if (this._disableDepthTestDistance !== value) {
        //>>includeStart('debug', pragmas.debug);
        if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(value) || value < 0.0) {
          throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
            "disableDepthTestDistance must be greater than or equal to 0.0.",
          );
        }
        //>>includeEnd('debug');
        this._disableDepthTestDistance = value;
        makeDirty(this, DISABLE_DEPTH_DISTANCE_INDEX);
      }
    },
  },

  /**
   * Gets or sets the user-defined value returned when the point is picked.
   * @memberof PointPrimitive.prototype
   * @type {*}
   */
  id: {
    get: function () {
      return this._id;
    },
    set: function (value) {
      this._id = value;
      if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(this._pickId)) {
        this._pickId.object.id = value;
      }
    },
  },

  /**
   * @private
   */
  pickId: {
    get: function () {
      return this._pickId;
    },
  },

  /**
   * Determines whether or not this point will be shown or hidden because it was clustered.
   * @memberof PointPrimitive.prototype
   * @type {boolean}
   * @private
   */
  clusterShow: {
    get: function () {
      return this._clusterShow;
    },
    set: function (value) {
      if (this._clusterShow !== value) {
        this._clusterShow = value;
        makeDirty(this, SHOW_INDEX);
      }
    },
  },

  /**
   * The {@link SplitDirection} to apply to this point.
   * @memberof PointPrimitive.prototype
   * @type {SplitDirection}
   * @default {@link SplitDirection.NONE}
   */
  splitDirection: {
    get: function () {
      return this._splitDirection;
    },
    set: function (value) {
      if (this._splitDirection !== value) {
        this._splitDirection = value;
        makeDirty(this, SPLIT_DIRECTION_INDEX);
      }
    },
  },
});

PointPrimitive.prototype.getPickId = function (context) {
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(this._pickId)) {
    this._pickId = context.createPickId({
      primitive: this,
      collection: this._collection,
      id: this._id,
    });
  }

  return this._pickId;
};

PointPrimitive.prototype._getActualPosition = function () {
  return this._actualPosition;
};

PointPrimitive.prototype._setActualPosition = function (value) {
  _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(value, this._actualPosition);
  makeDirty(this, POSITION_INDEX);
};

const tempCartesian3 = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
PointPrimitive._computeActualPosition = function (
  position,
  frameState,
  modelMatrix,
) {
  if (frameState.mode === _SceneMode_js__WEBPACK_IMPORTED_MODULE_11__["default"].SCENE3D) {
    return position;
  }

  _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].multiplyByPoint(modelMatrix, position, tempCartesian3);
  return _SceneTransforms_js__WEBPACK_IMPORTED_MODULE_12__["default"].computeActualEllipsoidPosition(
    frameState,
    tempCartesian3,
  );
};

const scratchCartesian4 = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"]();

// This function is basically a stripped-down JavaScript version of PointPrimitiveCollectionVS.glsl
PointPrimitive._computeScreenSpacePosition = function (
  modelMatrix,
  position,
  scene,
  result,
) {
  // Model to world coordinates
  const positionWorld = _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].multiplyByVector(
    modelMatrix,
    _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromElements(
      position.x,
      position.y,
      position.z,
      1,
      scratchCartesian4,
    ),
    scratchCartesian4,
  );
  const positionWC = _SceneTransforms_js__WEBPACK_IMPORTED_MODULE_12__["default"].worldToWindowCoordinates(
    scene,
    positionWorld,
    result,
  );
  return positionWC;
};

/**
 * Computes the screen-space position of the point's origin.
 * The screen space origin is the top, left corner of the canvas; <code>x</code> increases from
 * left to right, and <code>y</code> increases from top to bottom.
 *
 * @param {Scene} scene The scene.
 * @param {Cartesian2} [result] The object onto which to store the result.
 * @returns {Cartesian2} The screen-space position of the point.
 *
 * @exception {DeveloperError} PointPrimitive must be in a collection.
 *
 * @example
 * console.log(p.computeScreenSpacePosition(scene).toString());
 */
PointPrimitive.prototype.computeScreenSpacePosition = function (scene, result) {
  const pointPrimitiveCollection = this._pointPrimitiveCollection;
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(result)) {
    result = new _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  //>>includeStart('debug', pragmas.debug);
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(pointPrimitiveCollection)) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("PointPrimitive must be in a collection.");
  }
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(scene)) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_7__["default"]("scene is required.");
  }
  //>>includeEnd('debug');

  const modelMatrix = pointPrimitiveCollection.modelMatrix;
  const windowCoordinates = PointPrimitive._computeScreenSpacePosition(
    modelMatrix,
    this._actualPosition,
    scene,
    result,
  );
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(windowCoordinates)) {
    return undefined;
  }

  windowCoordinates.y = scene.canvas.clientHeight - windowCoordinates.y;
  return windowCoordinates;
};

/**
 * Gets a point's screen space bounding box centered around screenSpacePosition.
 * @param {PointPrimitive} point The point to get the screen space bounding box for.
 * @param {Cartesian2} screenSpacePosition The screen space center of the label.
 * @param {BoundingRectangle} [result] The object onto which to store the result.
 * @returns {BoundingRectangle} The screen space bounding box.
 *
 * @private
 */
PointPrimitive.getScreenSpaceBoundingBox = function (
  point,
  screenSpacePosition,
  result,
) {
  const size = point.pixelSize;
  const halfSize = size * 0.5;

  const x = screenSpacePosition.x - halfSize;
  const y = screenSpacePosition.y - halfSize;
  const width = size;
  const height = size;

  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(result)) {
    result = new _Core_BoundingRectangle_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  result.x = x;
  result.y = y;
  result.width = width;
  result.height = height;

  return result;
};

/**
 * Determines if this point equals another point.  Points are equal if all their properties
 * are equal.  Points in different collections can be equal.
 *
 * @param {PointPrimitive} [other] The point to compare for equality.
 * @returns {boolean} <code>true</code> if the points are equal; otherwise, <code>false</code>.
 */
PointPrimitive.prototype.equals = function (other) {
  return (
    this === other ||
    ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_6__["default"])(other) &&
      this._id === other._id &&
      _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].equals(this._position, other._position) &&
      _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].equals(this._color, other._color) &&
      this._pixelSize === other._pixelSize &&
      this._outlineWidth === other._outlineWidth &&
      this._show === other._show &&
      _Core_Color_js__WEBPACK_IMPORTED_MODULE_4__["default"].equals(this._outlineColor, other._outlineColor) &&
      _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].equals(this._scaleByDistance, other._scaleByDistance) &&
      _Core_NearFarScalar_js__WEBPACK_IMPORTED_MODULE_10__["default"].equals(
        this._translucencyByDistance,
        other._translucencyByDistance,
      ) &&
      _Core_DistanceDisplayCondition_js__WEBPACK_IMPORTED_MODULE_8__["default"].equals(
        this._distanceDisplayCondition,
        other._distanceDisplayCondition,
      ) &&
      this._disableDepthTestDistance === other._disableDepthTestDistance &&
      this._splitDirection === other._splitDirection)
  );
};

PointPrimitive.prototype._destroy = function () {
  this._pickId = this._pickId && this._pickId.destroy();
  this._pointPrimitiveCollection = undefined;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PointPrimitive);


/***/ }),

/***/ 53331:
/*!*****************************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Core/DistanceDisplayCondition.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defined.js */ 91446);
/* harmony import */ var _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeveloperError.js */ 5971);



/**
 * Determines visibility based on the distance to the camera.
 *
 * @alias DistanceDisplayCondition
 * @constructor
 *
 * @param {number} [near=0.0] The smallest distance in the interval where the object is visible.
 * @param {number} [far=Number.MAX_VALUE] The largest distance in the interval where the object is visible.
 *
 * @example
 * // Make a billboard that is only visible when the distance to the camera is between 10 and 20 meters.
 * billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20.0);
 */
function DistanceDisplayCondition(near, far) {
  near = near ?? 0.0;
  this._near = near;

  far = far ?? Number.MAX_VALUE;
  this._far = far;
}

Object.defineProperties(DistanceDisplayCondition.prototype, {
  /**
   * The smallest distance in the interval where the object is visible.
   * @memberof DistanceDisplayCondition.prototype
   * @type {number}
   * @default 0.0
   */
  near: {
    get: function () {
      return this._near;
    },
    set: function (value) {
      this._near = value;
    },
  },
  /**
   * The largest distance in the interval where the object is visible.
   * @memberof DistanceDisplayCondition.prototype
   * @type {number}
   * @default Number.MAX_VALUE
   */
  far: {
    get: function () {
      return this._far;
    },
    set: function (value) {
      this._far = value;
    },
  },
});

/**
 * The number of elements used to pack the object into an array.
 * @type {number}
 */
DistanceDisplayCondition.packedLength = 2;

/**
 * Stores the provided instance into the provided array.
 *
 * @param {DistanceDisplayCondition} value The value to pack.
 * @param {number[]} array The array to pack into.
 * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
 *
 * @returns {number[]} The array that was packed into
 */
DistanceDisplayCondition.pack = function (value, array, startingIndex) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__["default"]("value is required");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(array)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__["default"]("array is required");
  }
  //>>includeEnd('debug');

  startingIndex = startingIndex ?? 0;

  array[startingIndex++] = value.near;
  array[startingIndex] = value.far;

  return array;
};

/**
 * Retrieves an instance from a packed array.
 *
 * @param {number[]} array The packed array.
 * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
 * @param {DistanceDisplayCondition} [result] The object into which to store the result.
 * @returns {DistanceDisplayCondition} The modified result parameter or a new DistanceDisplayCondition instance if one was not provided.
 */
DistanceDisplayCondition.unpack = function (array, startingIndex, result) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(array)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__["default"]("array is required");
  }
  //>>includeEnd('debug');

  startingIndex = startingIndex ?? 0;

  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result)) {
    result = new DistanceDisplayCondition();
  }
  result.near = array[startingIndex++];
  result.far = array[startingIndex];
  return result;
};

/**
 * Determines if two distance display conditions are equal.
 *
 * @param {DistanceDisplayCondition} [left] A distance display condition.
 * @param {DistanceDisplayCondition} [right] Another distance display condition.
 * @return {boolean} Whether the two distance display conditions are equal.
 */
DistanceDisplayCondition.equals = function (left, right) {
  return (
    left === right ||
    ((0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(left) &&
      (0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(right) &&
      left.near === right.near &&
      left.far === right.far)
  );
};

/**
 * Duplicates a distance display condition instance.
 *
 * @param {DistanceDisplayCondition} [value] The distance display condition to duplicate.
 * @param {DistanceDisplayCondition} [result] The result onto which to store the result.
 * @return {DistanceDisplayCondition} The duplicated instance.
 */
DistanceDisplayCondition.clone = function (value, result) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    return undefined;
  }

  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result)) {
    result = new DistanceDisplayCondition();
  }

  result.near = value.near;
  result.far = value.far;
  return result;
};

/**
 * Duplicates this instance.
 *
 * @param {DistanceDisplayCondition} [result] The result onto which to store the result.
 * @return {DistanceDisplayCondition} The duplicated instance.
 */
DistanceDisplayCondition.prototype.clone = function (result) {
  return DistanceDisplayCondition.clone(this, result);
};

/**
 * Determines if this distance display condition is equal to another.
 *
 * @param {DistanceDisplayCondition} [other] Another distance display condition.
 * @return {boolean} Whether this distance display condition is equal to the other.
 */
DistanceDisplayCondition.prototype.equals = function (other) {
  return DistanceDisplayCondition.equals(this, other);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DistanceDisplayCondition);


/***/ }),

/***/ 58646:
/*!************************************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Scene/PolylineCollection.js + 2 modules ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Scene_PolylineCollection)
});

// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/BoundingSphere.js
var BoundingSphere = __webpack_require__(60662);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Cartesian2.js
var Cartesian2 = __webpack_require__(34067);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Cartesian3.js
var Cartesian3 = __webpack_require__(67980);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Cartesian4.js
var Cartesian4 = __webpack_require__(26809);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Cartographic.js
var Cartographic = __webpack_require__(36946);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Color.js
var Color = __webpack_require__(41476);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/combine.js
var combine = __webpack_require__(30346);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/ComponentDatatype.js
var ComponentDatatype = __webpack_require__(71804);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Frozen.js
var Frozen = __webpack_require__(15325);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/defined.js
var defined = __webpack_require__(91446);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/destroyObject.js
var destroyObject = __webpack_require__(77354);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/DeveloperError.js
var DeveloperError = __webpack_require__(5971);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/EncodedCartesian3.js
var EncodedCartesian3 = __webpack_require__(16422);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/FeatureDetection.js + 1 modules
var FeatureDetection = __webpack_require__(50876);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/IndexDatatype.js
var IndexDatatype = __webpack_require__(74915);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Intersect.js
var Intersect = __webpack_require__(47326);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Math.js
var Core_Math = __webpack_require__(67817);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Matrix4.js
var Matrix4 = __webpack_require__(84164);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/Plane.js
var Plane = __webpack_require__(57941);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/RuntimeError.js
var RuntimeError = __webpack_require__(23245);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/Buffer.js
var Buffer = __webpack_require__(41613);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/BufferUsage.js
var BufferUsage = __webpack_require__(42790);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/ContextLimits.js
var ContextLimits = __webpack_require__(30332);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/DrawCommand.js
var DrawCommand = __webpack_require__(77496);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/Pass.js
var Pass = __webpack_require__(60866);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/RenderState.js + 1 modules
var RenderState = __webpack_require__(10406);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/ShaderProgram.js + 2 modules
var ShaderProgram = __webpack_require__(7168);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/ShaderSource.js + 140 modules
var ShaderSource = __webpack_require__(25163);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/Texture.js
var Texture = __webpack_require__(16000);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Renderer/VertexArray.js
var VertexArray = __webpack_require__(8380);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Shaders/PolylineCommon.js
var PolylineCommon = __webpack_require__(78149);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Shaders/PolylineFS.js
var PolylineFS = __webpack_require__(82091);
;// ./node_modules/@cesium/engine/Source/Shaders/PolylineVS.js
//This file is automatically rebuilt by the Cesium build process.
/* harmony default export */ const PolylineVS = ("in vec3 position3DHigh;\n\
in vec3 position3DLow;\n\
in vec3 position2DHigh;\n\
in vec3 position2DLow;\n\
in vec3 prevPosition3DHigh;\n\
in vec3 prevPosition3DLow;\n\
in vec3 prevPosition2DHigh;\n\
in vec3 prevPosition2DLow;\n\
in vec3 nextPosition3DHigh;\n\
in vec3 nextPosition3DLow;\n\
in vec3 nextPosition2DHigh;\n\
in vec3 nextPosition2DLow;\n\
in vec4 texCoordExpandAndBatchIndex;\n\
\n\
out vec2  v_st;\n\
out float v_width;\n\
out vec4 v_pickColor;\n\
out float v_polylineAngle;\n\
\n\
void main()\n\
{\n\
    float texCoord = texCoordExpandAndBatchIndex.x;\n\
    float expandDir = texCoordExpandAndBatchIndex.y;\n\
    bool usePrev = texCoordExpandAndBatchIndex.z < 0.0;\n\
    float batchTableIndex = texCoordExpandAndBatchIndex.w;\n\
\n\
    vec2 widthAndShow = batchTable_getWidthAndShow(batchTableIndex);\n\
    float width = widthAndShow.x + 0.5;\n\
    float show = widthAndShow.y;\n\
\n\
    if (width < 1.0)\n\
    {\n\
        show = 0.0;\n\
    }\n\
\n\
    vec4 pickColor = batchTable_getPickColor(batchTableIndex);\n\
\n\
    vec4 p, prev, next;\n\
    if (czm_morphTime == 1.0)\n\
    {\n\
        p = czm_translateRelativeToEye(position3DHigh.xyz, position3DLow.xyz);\n\
        prev = czm_translateRelativeToEye(prevPosition3DHigh.xyz, prevPosition3DLow.xyz);\n\
        next = czm_translateRelativeToEye(nextPosition3DHigh.xyz, nextPosition3DLow.xyz);\n\
    }\n\
    else if (czm_morphTime == 0.0)\n\
    {\n\
        p = czm_translateRelativeToEye(position2DHigh.zxy, position2DLow.zxy);\n\
        prev = czm_translateRelativeToEye(prevPosition2DHigh.zxy, prevPosition2DLow.zxy);\n\
        next = czm_translateRelativeToEye(nextPosition2DHigh.zxy, nextPosition2DLow.zxy);\n\
    }\n\
    else\n\
    {\n\
        p = czm_columbusViewMorph(\n\
                czm_translateRelativeToEye(position2DHigh.zxy, position2DLow.zxy),\n\
                czm_translateRelativeToEye(position3DHigh.xyz, position3DLow.xyz),\n\
                czm_morphTime);\n\
        prev = czm_columbusViewMorph(\n\
                czm_translateRelativeToEye(prevPosition2DHigh.zxy, prevPosition2DLow.zxy),\n\
                czm_translateRelativeToEye(prevPosition3DHigh.xyz, prevPosition3DLow.xyz),\n\
                czm_morphTime);\n\
        next = czm_columbusViewMorph(\n\
                czm_translateRelativeToEye(nextPosition2DHigh.zxy, nextPosition2DLow.zxy),\n\
                czm_translateRelativeToEye(nextPosition3DHigh.xyz, nextPosition3DLow.xyz),\n\
                czm_morphTime);\n\
    }\n\
\n\
    #ifdef DISTANCE_DISPLAY_CONDITION\n\
        vec3 centerHigh = batchTable_getCenterHigh(batchTableIndex);\n\
        vec4 centerLowAndRadius = batchTable_getCenterLowAndRadius(batchTableIndex);\n\
        vec3 centerLow = centerLowAndRadius.xyz;\n\
        float radius = centerLowAndRadius.w;\n\
        vec2 distanceDisplayCondition = batchTable_getDistanceDisplayCondition(batchTableIndex);\n\
\n\
        float lengthSq;\n\
        if (czm_sceneMode == czm_sceneMode2D)\n\
        {\n\
            lengthSq = czm_eyeHeight2D.y;\n\
        }\n\
        else\n\
        {\n\
            vec4 center = czm_translateRelativeToEye(centerHigh.xyz, centerLow.xyz);\n\
            lengthSq = max(0.0, dot(center.xyz, center.xyz) - radius * radius);\n\
        }\n\
\n\
        float nearSq = distanceDisplayCondition.x * distanceDisplayCondition.x;\n\
        float farSq = distanceDisplayCondition.y * distanceDisplayCondition.y;\n\
        if (lengthSq < nearSq || lengthSq > farSq)\n\
        {\n\
            show = 0.0;\n\
        }\n\
    #endif\n\
\n\
    float polylineAngle;\n\
    vec4 positionWC = getPolylineWindowCoordinates(p, prev, next, expandDir, width, usePrev, polylineAngle);\n\
    gl_Position = czm_viewportOrthographic * positionWC * show;\n\
\n\
    v_st.s = texCoord;\n\
    v_st.t = czm_writeNonPerspective(clamp(expandDir, 0.0, 1.0), gl_Position.w);\n\
\n\
    v_width = width;\n\
    v_pickColor = pickColor;\n\
    v_polylineAngle = polylineAngle;\n\
}\n\
");

// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/BatchTable.js
var BatchTable = __webpack_require__(25438);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/BlendingState.js
var BlendingState = __webpack_require__(646);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/Material.js + 19 modules
var Material = __webpack_require__(74815);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/arrayRemoveDuplicates.js
var arrayRemoveDuplicates = __webpack_require__(63604);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/DistanceDisplayCondition.js
var DistanceDisplayCondition = __webpack_require__(53331);
// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Core/PolylinePipeline.js
var PolylinePipeline = __webpack_require__(70349);
;// ./node_modules/@cesium/engine/Source/Scene/Polyline.js












/**
 * <div class="notice">
 * Create this by calling {@link PolylineCollection#add}. Do not call the constructor directly.
 * </div>
 *
 * A renderable polyline.
 *
 * @alias Polyline
 * @internalConstructor
 * @class
 *
 * @privateParam {object} options Object with the following properties:
 * @privateParam {boolean} [options.show=true] <code>true</code> if this polyline will be shown; otherwise, <code>false</code>.
 * @privateParam {number} [options.width=1.0] The width of the polyline in pixels.
 * @privateParam {boolean} [options.loop=false] Whether a line segment will be added between the last and first line positions to make this line a loop.
 * @privateParam {Material} [options.material=Material.ColorType] The material.
 * @privateParam {Cartesian3[]} [options.positions] The positions.
 * @privateParam {object} [options.id] The user-defined object to be returned when this polyline is picked.
 * @privateParam {DistanceDisplayCondition} [options.distanceDisplayCondition] The condition specifying at what distance from the camera that this polyline will be displayed.
 * @privateParam {PolylineCollection} polylineCollection The renderable polyline collection.
 *
 * @see PolylineCollection
 *
 */
function Polyline(options, polylineCollection) {
  options = options ?? Frozen["default"].EMPTY_OBJECT;

  this._show = options.show ?? true;
  this._width = options.width ?? 1.0;
  this._loop = options.loop ?? false;
  this._distanceDisplayCondition = options.distanceDisplayCondition;

  this._material = options.material;
  if (!(0,defined["default"])(this._material)) {
    this._material = Material["default"].fromType(Material["default"].ColorType, {
      color: new Color["default"](1.0, 1.0, 1.0, 1.0),
    });
  }

  let positions = options.positions;
  if (!(0,defined["default"])(positions)) {
    positions = [];
  }

  this._positions = positions;
  this._actualPositions = (0,arrayRemoveDuplicates["default"])(
    positions,
    Cartesian3["default"].equalsEpsilon,
  );

  if (this._loop && this._actualPositions.length > 2) {
    if (this._actualPositions === this._positions) {
      this._actualPositions = positions.slice();
    }
    this._actualPositions.push(Cartesian3["default"].clone(this._actualPositions[0]));
  }

  this._length = this._actualPositions.length;
  this._id = options.id;

  let modelMatrix;
  if ((0,defined["default"])(polylineCollection)) {
    modelMatrix = Matrix4["default"].clone(polylineCollection.modelMatrix);
  }

  this._modelMatrix = modelMatrix;
  this._segments = PolylinePipeline["default"].wrapLongitude(
    this._actualPositions,
    modelMatrix,
  );

  this._actualLength = undefined;

  // eslint-disable-next-line no-use-before-define
  this._propertiesChanged = new Uint32Array(NUMBER_OF_PROPERTIES);
  this._polylineCollection = polylineCollection;
  this._dirty = false;
  this._pickId = undefined;
  this._boundingVolume = BoundingSphere["default"].fromPoints(this._actualPositions);
  this._boundingVolumeWC = BoundingSphere["default"].transform(
    this._boundingVolume,
    this._modelMatrix,
  );
  this._boundingVolume2D = new BoundingSphere["default"](); // modified in PolylineCollection
}

const POSITION_INDEX = (Polyline.POSITION_INDEX = 0);
const SHOW_INDEX = (Polyline.SHOW_INDEX = 1);
const WIDTH_INDEX = (Polyline.WIDTH_INDEX = 2);
const MATERIAL_INDEX = (Polyline.MATERIAL_INDEX = 3);
const POSITION_SIZE_INDEX = (Polyline.POSITION_SIZE_INDEX = 4);
const DISTANCE_DISPLAY_CONDITION = (Polyline.DISTANCE_DISPLAY_CONDITION = 5);
const NUMBER_OF_PROPERTIES = (Polyline.NUMBER_OF_PROPERTIES = 6);

function makeDirty(polyline, propertyChanged) {
  ++polyline._propertiesChanged[propertyChanged];
  const polylineCollection = polyline._polylineCollection;
  if ((0,defined["default"])(polylineCollection)) {
    polylineCollection._updatePolyline(polyline, propertyChanged);
    polyline._dirty = true;
  }
}

Object.defineProperties(Polyline.prototype, {
  /**
   * Determines if this polyline will be shown.  Use this to hide or show a polyline, instead
   * of removing it and re-adding it to the collection.
   * @memberof Polyline.prototype
   * @type {boolean}
   */
  show: {
    get: function () {
      return this._show;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,defined["default"])(value)) {
        throw new DeveloperError["default"]("value is required.");
      }
      //>>includeEnd('debug');

      if (value !== this._show) {
        this._show = value;
        makeDirty(this, SHOW_INDEX);
      }
    },
  },

  /**
   * Gets or sets the positions of the polyline.
   * @memberof Polyline.prototype
   * @type {Cartesian3[]}
   * @example
   * polyline.positions = Cesium.Cartesian3.fromDegreesArray([
   *     0.0, 0.0,
   *     10.0, 0.0,
   *     0.0, 20.0
   * ]);
   */
  positions: {
    get: function () {
      return this._positions;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,defined["default"])(value)) {
        throw new DeveloperError["default"]("value is required.");
      }
      //>>includeEnd('debug');

      let positions = (0,arrayRemoveDuplicates["default"])(value, Cartesian3["default"].equalsEpsilon);

      if (this._loop && positions.length > 2) {
        if (positions === value) {
          positions = value.slice();
        }
        positions.push(Cartesian3["default"].clone(positions[0]));
      }

      if (
        this._actualPositions.length !== positions.length ||
        this._actualPositions.length !== this._length
      ) {
        makeDirty(this, POSITION_SIZE_INDEX);
      }

      this._positions = value;
      this._actualPositions = positions;
      this._length = positions.length;
      this._boundingVolume = BoundingSphere["default"].fromPoints(
        this._actualPositions,
        this._boundingVolume,
      );
      this._boundingVolumeWC = BoundingSphere["default"].transform(
        this._boundingVolume,
        this._modelMatrix,
        this._boundingVolumeWC,
      );
      makeDirty(this, POSITION_INDEX);

      this.update();
    },
  },

  /**
   * Gets or sets the surface appearance of the polyline.  This can be one of several built-in {@link Material} objects or a custom material, scripted with
   * {@link https://github.com/CesiumGS/cesium/wiki/Fabric|Fabric}.
   * @memberof Polyline.prototype
   * @type {Material}
   */
  material: {
    get: function () {
      return this._material;
    },
    set: function (material) {
      //>>includeStart('debug', pragmas.debug);
      if (!(0,defined["default"])(material)) {
        throw new DeveloperError["default"]("material is required.");
      }
      //>>includeEnd('debug');

      if (this._material !== material) {
        this._material = material;
        makeDirty(this, MATERIAL_INDEX);
      }
    },
  },

  /**
   * Gets or sets the width of the polyline.
   * @memberof Polyline.prototype
   * @type {number}
   */
  width: {
    get: function () {
      return this._width;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug)
      if (!(0,defined["default"])(value)) {
        throw new DeveloperError["default"]("value is required.");
      }
      //>>includeEnd('debug');

      const width = this._width;
      if (value !== width) {
        this._width = value;
        makeDirty(this, WIDTH_INDEX);
      }
    },
  },

  /**
   * Gets or sets whether a line segment will be added between the first and last polyline positions.
   * @memberof Polyline.prototype
   * @type {boolean}
   */
  loop: {
    get: function () {
      return this._loop;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug)
      if (!(0,defined["default"])(value)) {
        throw new DeveloperError["default"]("value is required.");
      }
      //>>includeEnd('debug');

      if (value !== this._loop) {
        let positions = this._actualPositions;
        if (value) {
          if (
            positions.length > 2 &&
            !Cartesian3["default"].equals(positions[0], positions[positions.length - 1])
          ) {
            if (positions.length === this._positions.length) {
              this._actualPositions = positions = this._positions.slice();
            }
            positions.push(Cartesian3["default"].clone(positions[0]));
          }
        } else if (
          positions.length > 2 &&
          Cartesian3["default"].equals(positions[0], positions[positions.length - 1])
        ) {
          if (positions.length - 1 === this._positions.length) {
            this._actualPositions = this._positions;
          } else {
            positions.pop();
          }
        }

        this._loop = value;
        makeDirty(this, POSITION_SIZE_INDEX);
      }
    },
  },

  /**
   * Gets or sets the user-defined value returned when the polyline is picked.
   * @memberof Polyline.prototype
   * @type {*}
   */
  id: {
    get: function () {
      return this._id;
    },
    set: function (value) {
      this._id = value;
      if ((0,defined["default"])(this._pickId)) {
        this._pickId.object.id = value;
      }
    },
  },

  /**
   * @private
   */
  pickId: {
    get: function () {
      return this._pickId;
    },
  },

  /**
   * Gets the destruction status of this polyline
   * @memberof Polyline.prototype
   * @type {boolean}
   * @default false
   * @private
   */
  isDestroyed: {
    get: function () {
      return !(0,defined["default"])(this._polylineCollection);
    },
  },

  /**
   * Gets or sets the condition specifying at what distance from the camera that this polyline will be displayed.
   * @memberof Polyline.prototype
   * @type {DistanceDisplayCondition}
   * @default undefined
   */
  distanceDisplayCondition: {
    get: function () {
      return this._distanceDisplayCondition;
    },
    set: function (value) {
      //>>includeStart('debug', pragmas.debug);
      if ((0,defined["default"])(value) && value.far <= value.near) {
        throw new DeveloperError["default"](
          "far distance must be greater than near distance.",
        );
      }
      //>>includeEnd('debug');
      if (
        !DistanceDisplayCondition["default"].equals(value, this._distanceDisplayCondition)
      ) {
        this._distanceDisplayCondition = DistanceDisplayCondition["default"].clone(
          value,
          this._distanceDisplayCondition,
        );
        makeDirty(this, DISTANCE_DISPLAY_CONDITION);
      }
    },
  },
});

/**
 * @private
 */
Polyline.prototype.update = function () {
  let modelMatrix = Matrix4["default"].IDENTITY;
  if ((0,defined["default"])(this._polylineCollection)) {
    modelMatrix = this._polylineCollection.modelMatrix;
  }

  const segmentPositionsLength = this._segments.positions.length;
  const segmentLengths = this._segments.lengths;

  const positionsChanged =
    this._propertiesChanged[POSITION_INDEX] > 0 ||
    this._propertiesChanged[POSITION_SIZE_INDEX] > 0;
  if (!Matrix4["default"].equals(modelMatrix, this._modelMatrix) || positionsChanged) {
    this._segments = PolylinePipeline["default"].wrapLongitude(
      this._actualPositions,
      modelMatrix,
    );
    this._boundingVolumeWC = BoundingSphere["default"].transform(
      this._boundingVolume,
      modelMatrix,
      this._boundingVolumeWC,
    );
  }

  this._modelMatrix = Matrix4["default"].clone(modelMatrix, this._modelMatrix);

  if (this._segments.positions.length !== segmentPositionsLength) {
    // number of positions changed
    makeDirty(this, POSITION_SIZE_INDEX);
  } else {
    const length = segmentLengths.length;
    for (let i = 0; i < length; ++i) {
      if (segmentLengths[i] !== this._segments.lengths[i]) {
        // indices changed
        makeDirty(this, POSITION_SIZE_INDEX);
        break;
      }
    }
  }
};

/**
 * @private
 */
Polyline.prototype.getPickId = function (context) {
  if (!(0,defined["default"])(this._pickId)) {
    this._pickId = context.createPickId({
      primitive: this,
      collection: this._polylineCollection,
      id: this._id,
    });
  }
  return this._pickId;
};

Polyline.prototype._clean = function () {
  this._dirty = false;
  const properties = this._propertiesChanged;
  for (let k = 0; k < NUMBER_OF_PROPERTIES - 1; ++k) {
    properties[k] = 0;
  }
};

Polyline.prototype._destroy = function () {
  this._pickId = this._pickId && this._pickId.destroy();
  this._material = this._material && this._material.destroy();
  this._polylineCollection = undefined;
};
/* harmony default export */ const Scene_Polyline = (Polyline);

// EXTERNAL MODULE: ./node_modules/@cesium/engine/Source/Scene/SceneMode.js
var SceneMode = __webpack_require__(62467);
;// ./node_modules/@cesium/engine/Source/Scene/PolylineCollection.js







































const PolylineCollection_SHOW_INDEX = Scene_Polyline.SHOW_INDEX;
const PolylineCollection_WIDTH_INDEX = Scene_Polyline.WIDTH_INDEX;
const PolylineCollection_POSITION_INDEX = Scene_Polyline.POSITION_INDEX;
const PolylineCollection_MATERIAL_INDEX = Scene_Polyline.MATERIAL_INDEX;
//POSITION_SIZE_INDEX is needed for when the polyline's position array changes size.
//When it does, we need to recreate the indicesBuffer.
const PolylineCollection_POSITION_SIZE_INDEX = Scene_Polyline.POSITION_SIZE_INDEX;
const PolylineCollection_DISTANCE_DISPLAY_CONDITION = Scene_Polyline.DISTANCE_DISPLAY_CONDITION;
const PolylineCollection_NUMBER_OF_PROPERTIES = Scene_Polyline.NUMBER_OF_PROPERTIES;

const attributeLocations = {
  texCoordExpandAndBatchIndex: 0,
  position3DHigh: 1,
  position3DLow: 2,
  position2DHigh: 3,
  position2DLow: 4,
  prevPosition3DHigh: 5,
  prevPosition3DLow: 6,
  prevPosition2DHigh: 7,
  prevPosition2DLow: 8,
  nextPosition3DHigh: 9,
  nextPosition3DLow: 10,
  nextPosition2DHigh: 11,
  nextPosition2DLow: 12,
};

/**
 * A renderable collection of polylines.
 * <br /><br />
 * <div align="center">
 * <img src="Images/Polyline.png" width="400" height="300" /><br />
 * Example polylines
 * </div>
 * <br /><br />
 * Polylines are added and removed from the collection using {@link PolylineCollection#add}
 * and {@link PolylineCollection#remove}.
 *
 * @alias PolylineCollection
 * @constructor
 *
 * @param {object} [options] Object with the following properties:
 * @param {Matrix4} [options.modelMatrix=Matrix4.IDENTITY] The 4x4 transformation matrix that transforms each polyline from model to world coordinates.
 * @param {boolean} [options.debugShowBoundingVolume=false] For debugging only. Determines if this primitive's commands' bounding spheres are shown.
 * @param {boolean} [options.show=true] Determines if the polylines in the collection will be shown.
 *
 * @performance For best performance, prefer a few collections, each with many polylines, to
 * many collections with only a few polylines each.  Organize collections so that polylines
 * with the same update frequency are in the same collection, i.e., polylines that do not
 * change should be in one collection; polylines that change every frame should be in another
 * collection; and so on.
 *
 * @see PolylineCollection#add
 * @see PolylineCollection#remove
 * @see Polyline
 * @see LabelCollection
 *
 * @example
 * // Create a polyline collection with two polylines
 * const polylines = new Cesium.PolylineCollection();
 * polylines.add({
 *   positions : Cesium.Cartesian3.fromDegreesArray([
 *     -75.10, 39.57,
 *     -77.02, 38.53,
 *     -80.50, 35.14,
 *     -80.12, 25.46]),
 *   width : 2
 * });
 *
 * polylines.add({
 *   positions : Cesium.Cartesian3.fromDegreesArray([
 *     -73.10, 37.57,
 *     -75.02, 36.53,
 *     -78.50, 33.14,
 *     -78.12, 23.46]),
 *   width : 4
 * });
 */
function PolylineCollection(options) {
  options = options ?? Frozen["default"].EMPTY_OBJECT;

  /**
   * Determines if polylines in this collection will be shown.
   *
   * @type {boolean}
   * @default true
   */
  this.show = options.show ?? true;

  /**
   * The 4x4 transformation matrix that transforms each polyline in this collection from model to world coordinates.
   * When this is the identity matrix, the polylines are drawn in world coordinates, i.e., Earth's WGS84 coordinates.
   * Local reference frames can be used by providing a different transformation matrix, like that returned
   * by {@link Transforms.eastNorthUpToFixedFrame}.
   *
   * @type {Matrix4}
   * @default {@link Matrix4.IDENTITY}
   */
  this.modelMatrix = Matrix4["default"].clone(options.modelMatrix ?? Matrix4["default"].IDENTITY);
  this._modelMatrix = Matrix4["default"].clone(Matrix4["default"].IDENTITY);

  /**
   * This property is for debugging only; it is not for production use nor is it optimized.
   * <p>
   * Draws the bounding sphere for each draw command in the primitive.
   * </p>
   *
   * @type {boolean}
   *
   * @default false
   */
  this.debugShowBoundingVolume = options.debugShowBoundingVolume ?? false;

  this._opaqueRS = undefined;
  this._translucentRS = undefined;

  this._colorCommands = [];

  this._polylinesUpdated = false;
  this._polylinesRemoved = false;
  this._createVertexArray = false;
  this._propertiesChanged = new Uint32Array(PolylineCollection_NUMBER_OF_PROPERTIES);
  this._polylines = [];
  this._polylineBuckets = {};

  // The buffer usage is determined based on the usage of the attribute over time.
  this._positionBufferUsage = {
    bufferUsage: BufferUsage["default"].STATIC_DRAW,
    frameCount: 0,
  };

  this._mode = undefined;

  this._polylinesToUpdate = [];
  this._vertexArrays = [];
  this._positionBuffer = undefined;
  this._texCoordExpandAndBatchIndexBuffer = undefined;

  this._batchTable = undefined;
  this._createBatchTable = false;

  // Only used by Vector3DTilePoints
  this._useHighlightColor = false;
  this._highlightColor = Color["default"].clone(Color["default"].WHITE);

  const that = this;
  this._uniformMap = {
    u_highlightColor: function () {
      return that._highlightColor;
    },
  };
}

Object.defineProperties(PolylineCollection.prototype, {
  /**
   * Returns the number of polylines in this collection.  This is commonly used with
   * {@link PolylineCollection#get} to iterate over all the polylines
   * in the collection.
   * @memberof PolylineCollection.prototype
   * @type {number}
   */
  length: {
    get: function () {
      removePolylines(this);
      return this._polylines.length;
    },
  },
});

/**
     * Creates and adds a polyline with the specified initial properties to the collection.
     * The added polyline is returned so it can be modified or removed from the collection later.
     *
     * @param {object}[options] A template describing the polyline's properties as shown in Example 1.
     * @returns {Polyline} The polyline that was added to the collection.
     *
     * @performance After calling <code>add</code>, {@link PolylineCollection#update} is called and
     * the collection's vertex buffer is rewritten - an <code>O(n)</code> operation that also incurs CPU to GPU overhead.
     * For best performance, add as many polylines as possible before calling <code>update</code>.
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     *
     * @example
     * // Example 1:  Add a polyline, specifying all the default values.
     * const p = polylines.add({
     *   show : true,
     *   positions : ellipsoid.cartographicArrayToCartesianArray([
           Cesium.Cartographic.fromDegrees(-75.10, 39.57),
           Cesium.Cartographic.fromDegrees(-77.02, 38.53)]),
     *   width : 1
     * });
     *
     * @see PolylineCollection#remove
     * @see PolylineCollection#removeAll
     * @see PolylineCollection#update
     */
PolylineCollection.prototype.add = function (options) {
  const p = new Scene_Polyline(options, this);
  p._index = this._polylines.length;
  this._polylines.push(p);
  this._createVertexArray = true;
  this._createBatchTable = true;
  return p;
};

/**
 * Removes a polyline from the collection.
 *
 * @param {Polyline} polyline The polyline to remove.
 * @returns {boolean} <code>true</code> if the polyline was removed; <code>false</code> if the polyline was not found in the collection.
 *
 * @performance After calling <code>remove</code>, {@link PolylineCollection#update} is called and
 * the collection's vertex buffer is rewritten - an <code>O(n)</code> operation that also incurs CPU to GPU overhead.
 * For best performance, remove as many polylines as possible before calling <code>update</code>.
 * If you intend to temporarily hide a polyline, it is usually more efficient to call
 * {@link Polyline#show} instead of removing and re-adding the polyline.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * const p = polylines.add(...);
 * polylines.remove(p);  // Returns true
 *
 * @see PolylineCollection#add
 * @see PolylineCollection#removeAll
 * @see PolylineCollection#update
 * @see Polyline#show
 */
PolylineCollection.prototype.remove = function (polyline) {
  if (this.contains(polyline)) {
    this._polylinesRemoved = true;
    this._createVertexArray = true;
    this._createBatchTable = true;
    if ((0,defined["default"])(polyline._bucket)) {
      const bucket = polyline._bucket;
      bucket.shaderProgram =
        bucket.shaderProgram && bucket.shaderProgram.destroy();
    }
    polyline._destroy();
    return true;
  }

  return false;
};

/**
 * Removes all polylines from the collection.
 *
 * @performance <code>O(n)</code>.  It is more efficient to remove all the polylines
 * from a collection and then add new ones than to create a new collection entirely.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * polylines.add(...);
 * polylines.add(...);
 * polylines.removeAll();
 *
 * @see PolylineCollection#add
 * @see PolylineCollection#remove
 * @see PolylineCollection#update
 */
PolylineCollection.prototype.removeAll = function () {
  releaseShaders(this);
  destroyPolylines(this);
  this._polylineBuckets = {};
  this._polylinesRemoved = false;
  this._polylines.length = 0;
  this._polylinesToUpdate.length = 0;
  this._createVertexArray = true;
};

/**
 * Determines if this collection contains the specified polyline.
 *
 * @param {Polyline} polyline The polyline to check for.
 * @returns {boolean} true if this collection contains the polyline, false otherwise.
 *
 * @see PolylineCollection#get
 */
PolylineCollection.prototype.contains = function (polyline) {
  return (0,defined["default"])(polyline) && polyline._polylineCollection === this;
};

/**
 * Returns the polyline in the collection at the specified index.  Indices are zero-based
 * and increase as polylines are added.  Removing a polyline shifts all polylines after
 * it to the left, changing their indices.  This function is commonly used with
 * {@link PolylineCollection#length} to iterate over all the polylines
 * in the collection.
 *
 * @param {number} index The zero-based index of the polyline.
 * @returns {Polyline} The polyline at the specified index.
 *
 * @performance If polylines were removed from the collection and
 * {@link PolylineCollection#update} was not called, an implicit <code>O(n)</code>
 * operation is performed.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 * @example
 * // Toggle the show property of every polyline in the collection
 * const len = polylines.length;
 * for (let i = 0; i < len; ++i) {
 *   const p = polylines.get(i);
 *   p.show = !p.show;
 * }
 *
 * @see PolylineCollection#length
 */
PolylineCollection.prototype.get = function (index) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,defined["default"])(index)) {
    throw new DeveloperError["default"]("index is required.");
  }
  //>>includeEnd('debug');

  removePolylines(this);
  return this._polylines[index];
};

function createBatchTable(collection, context) {
  if ((0,defined["default"])(collection._batchTable)) {
    collection._batchTable.destroy();
  }

  const attributes = [
    {
      functionName: "batchTable_getWidthAndShow",
      componentDatatype: ComponentDatatype["default"].UNSIGNED_BYTE,
      componentsPerAttribute: 2,
    },
    {
      functionName: "batchTable_getPickColor",
      componentDatatype: ComponentDatatype["default"].UNSIGNED_BYTE,
      componentsPerAttribute: 4,
      normalize: true,
    },
    {
      functionName: "batchTable_getCenterHigh",
      componentDatatype: ComponentDatatype["default"].FLOAT,
      componentsPerAttribute: 3,
    },
    {
      functionName: "batchTable_getCenterLowAndRadius",
      componentDatatype: ComponentDatatype["default"].FLOAT,
      componentsPerAttribute: 4,
    },
    {
      functionName: "batchTable_getDistanceDisplayCondition",
      componentDatatype: ComponentDatatype["default"].FLOAT,
      componentsPerAttribute: 2,
    },
  ];

  collection._batchTable = new BatchTable["default"](
    context,
    attributes,
    collection._polylines.length,
  );
}

const scratchUpdatePolylineEncodedCartesian = new EncodedCartesian3["default"]();
const scratchUpdatePolylineCartesian4 = new Cartesian4["default"]();
const scratchNearFarCartesian2 = new Cartesian2["default"]();

/**
 * Called when {@link Viewer} or {@link CesiumWidget} render the scene to
 * get the draw commands needed to render this primitive.
 * <p>
 * Do not call this function directly.  This is documented just to
 * list the exceptions that may be propagated when the scene is rendered:
 * </p>
 *
 * @exception {RuntimeError} Vertex texture fetch support is required to render primitives with per-instance attributes. The maximum number of vertex texture image units must be greater than zero.
 */
PolylineCollection.prototype.update = function (frameState) {
  removePolylines(this);

  if (this._polylines.length === 0 || !this.show) {
    return;
  }

  updateMode(this, frameState);

  const context = frameState.context;
  const projection = frameState.mapProjection;
  let polyline;
  let properties = this._propertiesChanged;

  if (this._createBatchTable) {
    if (ContextLimits["default"].maximumVertexTextureImageUnits === 0) {
      throw new RuntimeError["default"](
        "Vertex texture fetch support is required to render polylines. The maximum number of vertex texture image units must be greater than zero.",
      );
    }
    createBatchTable(this, context);
    this._createBatchTable = false;
  }

  if (this._createVertexArray || computeNewBuffersUsage(this)) {
    createVertexArrays(this, context, projection);
  } else if (this._polylinesUpdated) {
    // Polylines were modified, but no polylines were added or removed.
    const polylinesToUpdate = this._polylinesToUpdate;
    if (this._mode !== SceneMode["default"].SCENE3D) {
      const updateLength = polylinesToUpdate.length;
      for (let i = 0; i < updateLength; ++i) {
        polyline = polylinesToUpdate[i];
        polyline.update();
      }
    }

    // if a polyline's positions size changes, we need to recreate the vertex arrays and vertex buffers because the indices will be different.
    // if a polyline's material changes, we need to recreate the VAOs and VBOs because they will be batched differently.
    if (properties[PolylineCollection_POSITION_SIZE_INDEX] || properties[PolylineCollection_MATERIAL_INDEX]) {
      createVertexArrays(this, context, projection);
    } else {
      const length = polylinesToUpdate.length;
      const polylineBuckets = this._polylineBuckets;
      for (let ii = 0; ii < length; ++ii) {
        polyline = polylinesToUpdate[ii];
        properties = polyline._propertiesChanged;
        const bucket = polyline._bucket;
        let index = 0;
        for (const x in polylineBuckets) {
          if (polylineBuckets.hasOwnProperty(x)) {
            if (polylineBuckets[x] === bucket) {
              if (properties[PolylineCollection_POSITION_INDEX]) {
                bucket.writeUpdate(
                  index,
                  polyline,
                  this._positionBuffer,
                  projection,
                );
              }
              break;
            }
            index += polylineBuckets[x].lengthOfPositions;
          }
        }

        if (properties[PolylineCollection_SHOW_INDEX] || properties[PolylineCollection_WIDTH_INDEX]) {
          this._batchTable.setBatchedAttribute(
            polyline._index,
            0,
            new Cartesian2["default"](polyline._width, polyline._show),
          );
        }

        if (this._batchTable.attributes.length > 2) {
          if (properties[PolylineCollection_POSITION_INDEX] || properties[PolylineCollection_POSITION_SIZE_INDEX]) {
            const boundingSphere =
              frameState.mode === SceneMode["default"].SCENE2D
                ? polyline._boundingVolume2D
                : polyline._boundingVolumeWC;
            const encodedCenter = EncodedCartesian3["default"].fromCartesian(
              boundingSphere.center,
              scratchUpdatePolylineEncodedCartesian,
            );
            const low = Cartesian4["default"].fromElements(
              encodedCenter.low.x,
              encodedCenter.low.y,
              encodedCenter.low.z,
              boundingSphere.radius,
              scratchUpdatePolylineCartesian4,
            );
            this._batchTable.setBatchedAttribute(
              polyline._index,
              2,
              encodedCenter.high,
            );
            this._batchTable.setBatchedAttribute(polyline._index, 3, low);
          }

          if (properties[PolylineCollection_DISTANCE_DISPLAY_CONDITION]) {
            const nearFarCartesian = scratchNearFarCartesian2;
            nearFarCartesian.x = 0.0;
            nearFarCartesian.y = Number.MAX_VALUE;

            const distanceDisplayCondition = polyline.distanceDisplayCondition;
            if ((0,defined["default"])(distanceDisplayCondition)) {
              nearFarCartesian.x = distanceDisplayCondition.near;
              nearFarCartesian.y = distanceDisplayCondition.far;
            }

            this._batchTable.setBatchedAttribute(
              polyline._index,
              4,
              nearFarCartesian,
            );
          }
        }

        polyline._clean();
      }
    }
    polylinesToUpdate.length = 0;
    this._polylinesUpdated = false;
  }

  properties = this._propertiesChanged;
  for (let k = 0; k < PolylineCollection_NUMBER_OF_PROPERTIES; ++k) {
    properties[k] = 0;
  }

  let modelMatrix = Matrix4["default"].IDENTITY;
  if (frameState.mode === SceneMode["default"].SCENE3D) {
    modelMatrix = this.modelMatrix;
  }

  const pass = frameState.passes;
  const useDepthTest = frameState.morphTime !== 0.0;

  if (
    !(0,defined["default"])(this._opaqueRS) ||
    this._opaqueRS.depthTest.enabled !== useDepthTest
  ) {
    this._opaqueRS = RenderState["default"].fromCache({
      depthMask: useDepthTest,
      depthTest: {
        enabled: useDepthTest,
      },
    });
  }

  if (
    !(0,defined["default"])(this._translucentRS) ||
    this._translucentRS.depthTest.enabled !== useDepthTest
  ) {
    this._translucentRS = RenderState["default"].fromCache({
      blending: BlendingState["default"].ALPHA_BLEND,
      depthMask: !useDepthTest,
      depthTest: {
        enabled: useDepthTest,
      },
    });
  }

  this._batchTable.update(frameState);

  if (pass.render || pass.pick) {
    const colorList = this._colorCommands;
    createCommandLists(this, frameState, colorList, modelMatrix);
  }
};

const boundingSphereScratch = new BoundingSphere["default"]();
const boundingSphereScratch2 = new BoundingSphere["default"]();

function createCommandLists(
  polylineCollection,
  frameState,
  commands,
  modelMatrix,
) {
  const context = frameState.context;
  const commandList = frameState.commandList;

  const commandsLength = commands.length;
  let commandIndex = 0;
  let cloneBoundingSphere = true;

  const vertexArrays = polylineCollection._vertexArrays;
  const debugShowBoundingVolume = polylineCollection.debugShowBoundingVolume;

  const batchTable = polylineCollection._batchTable;
  const uniformCallback = batchTable.getUniformMapCallback();

  const length = vertexArrays.length;
  for (let m = 0; m < length; ++m) {
    const va = vertexArrays[m];
    const buckets = va.buckets;
    const bucketLength = buckets.length;

    for (let n = 0; n < bucketLength; ++n) {
      const bucketLocator = buckets[n];

      let offset = bucketLocator.offset;
      const sp = bucketLocator.bucket.shaderProgram;

      const polylines = bucketLocator.bucket.polylines;
      const polylineLength = polylines.length;
      let currentId;
      let currentMaterial;
      let count = 0;
      let command;
      let uniformMap;

      for (let s = 0; s < polylineLength; ++s) {
        const polyline = polylines[s];
        const mId = createMaterialId(polyline._material);
        if (mId !== currentId) {
          if ((0,defined["default"])(currentId) && count > 0) {
            const translucent = currentMaterial.isTranslucent();

            if (commandIndex >= commandsLength) {
              command = new DrawCommand["default"]({
                owner: polylineCollection,
              });
              commands.push(command);
            } else {
              command = commands[commandIndex];
            }

            ++commandIndex;

            uniformMap = (0,combine["default"])(
              uniformCallback(currentMaterial._uniforms),
              polylineCollection._uniformMap,
            );

            command.boundingVolume = BoundingSphere["default"].clone(
              boundingSphereScratch,
              command.boundingVolume,
            );
            command.modelMatrix = modelMatrix;
            command.shaderProgram = sp;
            command.vertexArray = va.va;
            command.renderState = translucent
              ? polylineCollection._translucentRS
              : polylineCollection._opaqueRS;
            command.pass = translucent ? Pass["default"].TRANSLUCENT : Pass["default"].OPAQUE;
            command.debugShowBoundingVolume = debugShowBoundingVolume;
            command.pickId = "v_pickColor";

            command.uniformMap = uniformMap;
            command.count = count;
            command.offset = offset;

            offset += count;
            count = 0;
            cloneBoundingSphere = true;

            commandList.push(command);
          }

          currentMaterial = polyline._material;
          currentMaterial.update(context);
          currentId = mId;
        }

        const locators = polyline._locatorBuckets;
        const locatorLength = locators.length;
        for (let t = 0; t < locatorLength; ++t) {
          const locator = locators[t];
          if (locator.locator === bucketLocator) {
            count += locator.count;
          }
        }

        let boundingVolume;
        if (frameState.mode === SceneMode["default"].SCENE3D) {
          boundingVolume = polyline._boundingVolumeWC;
        } else if (frameState.mode === SceneMode["default"].COLUMBUS_VIEW) {
          boundingVolume = polyline._boundingVolume2D;
        } else if (frameState.mode === SceneMode["default"].SCENE2D) {
          if ((0,defined["default"])(polyline._boundingVolume2D)) {
            boundingVolume = BoundingSphere["default"].clone(
              polyline._boundingVolume2D,
              boundingSphereScratch2,
            );
            boundingVolume.center.x = 0.0;
          }
        } else if (
          (0,defined["default"])(polyline._boundingVolumeWC) &&
          (0,defined["default"])(polyline._boundingVolume2D)
        ) {
          boundingVolume = BoundingSphere["default"].union(
            polyline._boundingVolumeWC,
            polyline._boundingVolume2D,
            boundingSphereScratch2,
          );
        }

        if (cloneBoundingSphere) {
          cloneBoundingSphere = false;
          BoundingSphere["default"].clone(boundingVolume, boundingSphereScratch);
        } else {
          BoundingSphere["default"].union(
            boundingVolume,
            boundingSphereScratch,
            boundingSphereScratch,
          );
        }
      }

      if ((0,defined["default"])(currentId) && count > 0) {
        if (commandIndex >= commandsLength) {
          command = new DrawCommand["default"]({
            owner: polylineCollection,
          });
          commands.push(command);
        } else {
          command = commands[commandIndex];
        }

        ++commandIndex;

        uniformMap = (0,combine["default"])(
          uniformCallback(currentMaterial._uniforms),
          polylineCollection._uniformMap,
        );

        command.boundingVolume = BoundingSphere["default"].clone(
          boundingSphereScratch,
          command.boundingVolume,
        );
        command.modelMatrix = modelMatrix;
        command.shaderProgram = sp;
        command.vertexArray = va.va;
        command.renderState = currentMaterial.isTranslucent()
          ? polylineCollection._translucentRS
          : polylineCollection._opaqueRS;
        command.pass = currentMaterial.isTranslucent()
          ? Pass["default"].TRANSLUCENT
          : Pass["default"].OPAQUE;
        command.debugShowBoundingVolume = debugShowBoundingVolume;
        command.pickId = "v_pickColor";

        command.uniformMap = uniformMap;
        command.count = count;
        command.offset = offset;

        cloneBoundingSphere = true;

        commandList.push(command);
      }

      currentId = undefined;
    }
  }

  commands.length = commandIndex;
}

/**
 * Returns true if this object was destroyed; otherwise, false.
 * <br /><br />
 * If this object was destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
 *
 * @returns {boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
 *
 * @see PolylineCollection#destroy
 */
PolylineCollection.prototype.isDestroyed = function () {
  return false;
};

/**
 * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
 * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
 * <br /><br />
 * Once an object is destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
 * assign the return value (<code>undefined</code>) to the object as done in the example.
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 *
 * @example
 * polylines = polylines && polylines.destroy();
 *
 * @see PolylineCollection#isDestroyed
 */
PolylineCollection.prototype.destroy = function () {
  destroyVertexArrays(this);
  releaseShaders(this);
  destroyPolylines(this);
  this._batchTable = this._batchTable && this._batchTable.destroy();
  return (0,destroyObject["default"])(this);
};

function computeNewBuffersUsage(collection) {
  let usageChanged = false;
  const properties = collection._propertiesChanged;
  const bufferUsage = collection._positionBufferUsage;
  if (properties[PolylineCollection_POSITION_INDEX]) {
    if (bufferUsage.bufferUsage !== BufferUsage["default"].STREAM_DRAW) {
      usageChanged = true;
      bufferUsage.bufferUsage = BufferUsage["default"].STREAM_DRAW;
      bufferUsage.frameCount = 100;
    } else {
      bufferUsage.frameCount = 100;
    }
  } else if (bufferUsage.bufferUsage !== BufferUsage["default"].STATIC_DRAW) {
    if (bufferUsage.frameCount === 0) {
      usageChanged = true;
      bufferUsage.bufferUsage = BufferUsage["default"].STATIC_DRAW;
    } else {
      bufferUsage.frameCount--;
    }
  }

  return usageChanged;
}

const emptyVertexBuffer = [0.0, 0.0, 0.0];

function createVertexArrays(collection, context, projection) {
  collection._createVertexArray = false;
  releaseShaders(collection);
  destroyVertexArrays(collection);
  sortPolylinesIntoBuckets(collection);

  //stores all of the individual indices arrays.
  const totalIndices = [[]];
  let indices = totalIndices[0];

  const batchTable = collection._batchTable;
  const useHighlightColor = collection._useHighlightColor;

  //used to determine the vertexBuffer offset if the indicesArray goes over 64k.
  //if it's the same polyline while it goes over 64k, the offset needs to backtrack componentsPerAttribute * componentDatatype bytes
  //so that the polyline looks contiguous.
  //if the polyline ends at the 64k mark, then the offset is just 64k * componentsPerAttribute * componentDatatype
  const vertexBufferOffset = [0];
  let offset = 0;
  const vertexArrayBuckets = [[]];
  let totalLength = 0;
  const polylineBuckets = collection._polylineBuckets;
  let x;
  let bucket;
  for (x in polylineBuckets) {
    if (polylineBuckets.hasOwnProperty(x)) {
      bucket = polylineBuckets[x];
      bucket.updateShader(context, batchTable, useHighlightColor);
      totalLength += bucket.lengthOfPositions;
    }
  }

  if (totalLength > 0) {
    const mode = collection._mode;

    const positionArray = new Float32Array(6 * totalLength * 3);
    const texCoordExpandAndBatchIndexArray = new Float32Array(totalLength * 4);
    let position3DArray;

    let positionIndex = 0;
    let colorIndex = 0;
    let texCoordExpandAndBatchIndexIndex = 0;
    for (x in polylineBuckets) {
      if (polylineBuckets.hasOwnProperty(x)) {
        bucket = polylineBuckets[x];
        bucket.write(
          positionArray,
          texCoordExpandAndBatchIndexArray,
          positionIndex,
          colorIndex,
          texCoordExpandAndBatchIndexIndex,
          batchTable,
          context,
          projection,
        );

        if (mode === SceneMode["default"].MORPHING) {
          if (!(0,defined["default"])(position3DArray)) {
            position3DArray = new Float32Array(6 * totalLength * 3);
          }
          bucket.writeForMorph(position3DArray, positionIndex);
        }

        const bucketLength = bucket.lengthOfPositions;
        positionIndex += 6 * bucketLength * 3;
        colorIndex += bucketLength * 4;
        texCoordExpandAndBatchIndexIndex += bucketLength * 4;
        offset = bucket.updateIndices(
          totalIndices,
          vertexBufferOffset,
          vertexArrayBuckets,
          offset,
        );
      }
    }

    const positionBufferUsage = collection._positionBufferUsage.bufferUsage;
    const texCoordExpandAndBatchIndexBufferUsage = BufferUsage["default"].STATIC_DRAW;

    collection._positionBuffer = Buffer["default"].createVertexBuffer({
      context: context,
      typedArray: positionArray,
      usage: positionBufferUsage,
    });
    let position3DBuffer;
    if ((0,defined["default"])(position3DArray)) {
      position3DBuffer = Buffer["default"].createVertexBuffer({
        context: context,
        typedArray: position3DArray,
        usage: positionBufferUsage,
      });
    }
    collection._texCoordExpandAndBatchIndexBuffer = Buffer["default"].createVertexBuffer({
      context: context,
      typedArray: texCoordExpandAndBatchIndexArray,
      usage: texCoordExpandAndBatchIndexBufferUsage,
    });

    const positionSizeInBytes = 3 * Float32Array.BYTES_PER_ELEMENT;
    const texCoordExpandAndBatchIndexSizeInBytes =
      4 * Float32Array.BYTES_PER_ELEMENT;

    let vbo = 0;
    const numberOfIndicesArrays = totalIndices.length;
    for (let k = 0; k < numberOfIndicesArrays; ++k) {
      indices = totalIndices[k];

      if (indices.length > 0) {
        const indicesArray = new Uint16Array(indices);
        const indexBuffer = Buffer["default"].createIndexBuffer({
          context: context,
          typedArray: indicesArray,
          usage: BufferUsage["default"].STATIC_DRAW,
          indexDatatype: IndexDatatype["default"].UNSIGNED_SHORT,
        });

        vbo += vertexBufferOffset[k];

        const positionHighOffset =
          6 *
          (k * (positionSizeInBytes * Core_Math["default"].SIXTY_FOUR_KILOBYTES) -
            vbo * positionSizeInBytes); //componentsPerAttribute(3) * componentDatatype(4)
        const positionLowOffset = positionSizeInBytes + positionHighOffset;
        const prevPositionHighOffset = positionSizeInBytes + positionLowOffset;
        const prevPositionLowOffset =
          positionSizeInBytes + prevPositionHighOffset;
        const nextPositionHighOffset =
          positionSizeInBytes + prevPositionLowOffset;
        const nextPositionLowOffset =
          positionSizeInBytes + nextPositionHighOffset;
        const vertexTexCoordExpandAndBatchIndexBufferOffset =
          k *
            (texCoordExpandAndBatchIndexSizeInBytes *
              Core_Math["default"].SIXTY_FOUR_KILOBYTES) -
          vbo * texCoordExpandAndBatchIndexSizeInBytes;

        const attributes = [
          {
            index: attributeLocations.position3DHigh,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: positionHighOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.position3DLow,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: positionLowOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.position2DHigh,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: positionHighOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.position2DLow,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: positionLowOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.prevPosition3DHigh,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: prevPositionHighOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.prevPosition3DLow,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: prevPositionLowOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.prevPosition2DHigh,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: prevPositionHighOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.prevPosition2DLow,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: prevPositionLowOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.nextPosition3DHigh,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: nextPositionHighOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.nextPosition3DLow,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: nextPositionLowOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.nextPosition2DHigh,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: nextPositionHighOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.nextPosition2DLow,
            componentsPerAttribute: 3,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            offsetInBytes: nextPositionLowOffset,
            strideInBytes: 6 * positionSizeInBytes,
          },
          {
            index: attributeLocations.texCoordExpandAndBatchIndex,
            componentsPerAttribute: 4,
            componentDatatype: ComponentDatatype["default"].FLOAT,
            vertexBuffer: collection._texCoordExpandAndBatchIndexBuffer,
            offsetInBytes: vertexTexCoordExpandAndBatchIndexBufferOffset,
          },
        ];

        let bufferProperty3D;
        let buffer3D;
        let buffer2D;
        let bufferProperty2D;

        if (mode === SceneMode["default"].SCENE3D) {
          buffer3D = collection._positionBuffer;
          bufferProperty3D = "vertexBuffer";
          buffer2D = emptyVertexBuffer;
          bufferProperty2D = "value";
        } else if (
          mode === SceneMode["default"].SCENE2D ||
          mode === SceneMode["default"].COLUMBUS_VIEW
        ) {
          buffer3D = emptyVertexBuffer;
          bufferProperty3D = "value";
          buffer2D = collection._positionBuffer;
          bufferProperty2D = "vertexBuffer";
        } else {
          buffer3D = position3DBuffer;
          bufferProperty3D = "vertexBuffer";
          buffer2D = collection._positionBuffer;
          bufferProperty2D = "vertexBuffer";
        }

        attributes[0][bufferProperty3D] = buffer3D;
        attributes[1][bufferProperty3D] = buffer3D;
        attributes[2][bufferProperty2D] = buffer2D;
        attributes[3][bufferProperty2D] = buffer2D;
        attributes[4][bufferProperty3D] = buffer3D;
        attributes[5][bufferProperty3D] = buffer3D;
        attributes[6][bufferProperty2D] = buffer2D;
        attributes[7][bufferProperty2D] = buffer2D;
        attributes[8][bufferProperty3D] = buffer3D;
        attributes[9][bufferProperty3D] = buffer3D;
        attributes[10][bufferProperty2D] = buffer2D;
        attributes[11][bufferProperty2D] = buffer2D;

        const va = new VertexArray["default"]({
          context: context,
          attributes: attributes,
          indexBuffer: indexBuffer,
        });
        collection._vertexArrays.push({
          va: va,
          buckets: vertexArrayBuckets[k],
        });
      }
    }
  }
}

function replacer(key, value) {
  if (value instanceof Texture["default"]) {
    return value.id;
  }

  return value;
}

const scratchUniformArray = [];
function createMaterialId(material) {
  const uniforms = Material["default"]._uniformList[material.type];
  const length = uniforms.length;
  scratchUniformArray.length = 2.0 * length;

  let index = 0;
  for (let i = 0; i < length; ++i) {
    const uniform = uniforms[i];
    scratchUniformArray[index] = uniform;
    scratchUniformArray[index + 1] = material._uniforms[uniform]();
    index += 2;
  }

  return `${material.type}:${JSON.stringify(scratchUniformArray, replacer)}`;
}

function sortPolylinesIntoBuckets(collection) {
  const mode = collection._mode;
  const modelMatrix = collection._modelMatrix;

  const polylineBuckets = (collection._polylineBuckets = {});
  const polylines = collection._polylines;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    const p = polylines[i];
    if (p._actualPositions.length > 1) {
      p.update();
      const material = p.material;
      let value = polylineBuckets[material.type];
      if (!(0,defined["default"])(value)) {
        value = polylineBuckets[material.type] = new PolylineBucket(
          material,
          mode,
          modelMatrix,
        );
      }
      value.addPolyline(p);
    }
  }
}

function updateMode(collection, frameState) {
  const mode = frameState.mode;

  if (
    collection._mode !== mode ||
    !Matrix4["default"].equals(collection._modelMatrix, collection.modelMatrix)
  ) {
    collection._mode = mode;
    collection._modelMatrix = Matrix4["default"].clone(collection.modelMatrix);
    collection._createVertexArray = true;
  }
}

function removePolylines(collection) {
  if (collection._polylinesRemoved) {
    collection._polylinesRemoved = false;
    const definedPolylines = [];
    const definedPolylinesToUpdate = [];
    let polyIndex = 0;
    let polyline;

    const length = collection._polylines.length;
    for (let i = 0; i < length; ++i) {
      polyline = collection._polylines[i];
      if (!polyline.isDestroyed) {
        polyline._index = polyIndex++;
        definedPolylinesToUpdate.push(polyline);
        definedPolylines.push(polyline);
      }
    }

    collection._polylines = definedPolylines;
    collection._polylinesToUpdate = definedPolylinesToUpdate;
  }
}

function releaseShaders(collection) {
  const polylines = collection._polylines;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    if (!polylines[i].isDestroyed) {
      const bucket = polylines[i]._bucket;
      if ((0,defined["default"])(bucket)) {
        bucket.shaderProgram =
          bucket.shaderProgram && bucket.shaderProgram.destroy();
      }
    }
  }
}

function destroyVertexArrays(collection) {
  const length = collection._vertexArrays.length;
  for (let t = 0; t < length; ++t) {
    collection._vertexArrays[t].va.destroy();
  }
  collection._vertexArrays.length = 0;
}

PolylineCollection.prototype._updatePolyline = function (
  polyline,
  propertyChanged,
) {
  this._polylinesUpdated = true;
  if (!polyline._dirty) {
    this._polylinesToUpdate.push(polyline);
  }
  ++this._propertiesChanged[propertyChanged];
};

function destroyPolylines(collection) {
  const polylines = collection._polylines;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    if (!polylines[i].isDestroyed) {
      polylines[i]._destroy();
    }
  }
}

function VertexArrayBucketLocator(count, offset, bucket) {
  this.count = count;
  this.offset = offset;
  this.bucket = bucket;
}

function PolylineBucket(material, mode, modelMatrix) {
  this.polylines = [];
  this.lengthOfPositions = 0;
  this.material = material;
  this.shaderProgram = undefined;
  this.mode = mode;
  this.modelMatrix = modelMatrix;
}

PolylineBucket.prototype.addPolyline = function (p) {
  const polylines = this.polylines;
  polylines.push(p);
  p._actualLength = this.getPolylinePositionsLength(p);
  this.lengthOfPositions += p._actualLength;
  p._bucket = this;
};

PolylineBucket.prototype.updateShader = function (
  context,
  batchTable,
  useHighlightColor,
) {
  if ((0,defined["default"])(this.shaderProgram)) {
    return;
  }

  const defines = ["DISTANCE_DISPLAY_CONDITION"];
  if (useHighlightColor) {
    defines.push("VECTOR_TILE");
  }

  // Check for use of v_polylineAngle in material shader
  if (
    this.material.shaderSource.search(/in\s+float\s+v_polylineAngle;/g) !== -1
  ) {
    defines.push("POLYLINE_DASH");
  }

  if (!FeatureDetection["default"].isInternetExplorer()) {
    defines.push("CLIP_POLYLINE");
  }

  const fs = new ShaderSource["default"]({
    defines: defines,
    sources: ["in vec4 v_pickColor;\n", this.material.shaderSource, PolylineFS["default"]],
  });

  const vsSource = batchTable.getVertexShaderCallback()(PolylineVS);
  const vs = new ShaderSource["default"]({
    defines: defines,
    sources: [PolylineCommon["default"], vsSource],
  });

  this.shaderProgram = ShaderProgram["default"].fromCache({
    context: context,
    vertexShaderSource: vs,
    fragmentShaderSource: fs,
    attributeLocations: attributeLocations,
  });
};

function intersectsIDL(polyline) {
  return (
    Cartesian3["default"].dot(Cartesian3["default"].UNIT_X, polyline._boundingVolume.center) < 0 ||
    polyline._boundingVolume.intersectPlane(Plane["default"].ORIGIN_ZX_PLANE) ===
      Intersect["default"].INTERSECTING
  );
}

PolylineBucket.prototype.getPolylinePositionsLength = function (polyline) {
  let length;
  if (this.mode === SceneMode["default"].SCENE3D || !intersectsIDL(polyline)) {
    length = polyline._actualPositions.length;
    return length * 4.0 - 4.0;
  }

  let count = 0;
  const segmentLengths = polyline._segments.lengths;
  length = segmentLengths.length;
  for (let i = 0; i < length; ++i) {
    count += segmentLengths[i] * 4.0 - 4.0;
  }

  return count;
};

const scratchWritePosition = new Cartesian3["default"]();
const scratchWritePrevPosition = new Cartesian3["default"]();
const scratchWriteNextPosition = new Cartesian3["default"]();
const scratchWriteVector = new Cartesian3["default"]();
const scratchPickColorCartesian = new Cartesian4["default"]();
const scratchWidthShowCartesian = new Cartesian2["default"]();

PolylineBucket.prototype.write = function (
  positionArray,
  texCoordExpandAndBatchIndexArray,
  positionIndex,
  colorIndex,
  texCoordExpandAndBatchIndexIndex,
  batchTable,
  context,
  projection,
) {
  const mode = this.mode;
  const maxLon = projection.ellipsoid.maximumRadius * Core_Math["default"].PI;

  const polylines = this.polylines;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    const polyline = polylines[i];
    const width = polyline.width;
    const show = polyline.show && width > 0.0;
    const polylineBatchIndex = polyline._index;
    const segments = this.getSegments(polyline, projection);
    const positions = segments.positions;
    const lengths = segments.lengths;
    const positionsLength = positions.length;

    const pickColor = polyline.getPickId(context).color;

    let segmentIndex = 0;
    let count = 0;
    let position;

    for (let j = 0; j < positionsLength; ++j) {
      if (j === 0) {
        if (polyline._loop) {
          position = positions[positionsLength - 2];
        } else {
          position = scratchWriteVector;
          Cartesian3["default"].subtract(positions[0], positions[1], position);
          Cartesian3["default"].add(positions[0], position, position);
        }
      } else {
        position = positions[j - 1];
      }

      Cartesian3["default"].clone(position, scratchWritePrevPosition);
      Cartesian3["default"].clone(positions[j], scratchWritePosition);

      if (j === positionsLength - 1) {
        if (polyline._loop) {
          position = positions[1];
        } else {
          position = scratchWriteVector;
          Cartesian3["default"].subtract(
            positions[positionsLength - 1],
            positions[positionsLength - 2],
            position,
          );
          Cartesian3["default"].add(positions[positionsLength - 1], position, position);
        }
      } else {
        position = positions[j + 1];
      }

      Cartesian3["default"].clone(position, scratchWriteNextPosition);

      const segmentLength = lengths[segmentIndex];
      if (j === count + segmentLength) {
        count += segmentLength;
        ++segmentIndex;
      }

      const segmentStart = j - count === 0;
      const segmentEnd = j === count + lengths[segmentIndex] - 1;

      if (mode === SceneMode["default"].SCENE2D) {
        scratchWritePrevPosition.z = 0.0;
        scratchWritePosition.z = 0.0;
        scratchWriteNextPosition.z = 0.0;
      }

      if (mode === SceneMode["default"].SCENE2D || mode === SceneMode["default"].MORPHING) {
        if (
          (segmentStart || segmentEnd) &&
          maxLon - Math.abs(scratchWritePosition.x) < 1.0
        ) {
          if (
            (scratchWritePosition.x < 0.0 &&
              scratchWritePrevPosition.x > 0.0) ||
            (scratchWritePosition.x > 0.0 && scratchWritePrevPosition.x < 0.0)
          ) {
            Cartesian3["default"].clone(scratchWritePosition, scratchWritePrevPosition);
          }

          if (
            (scratchWritePosition.x < 0.0 &&
              scratchWriteNextPosition.x > 0.0) ||
            (scratchWritePosition.x > 0.0 && scratchWriteNextPosition.x < 0.0)
          ) {
            Cartesian3["default"].clone(scratchWritePosition, scratchWriteNextPosition);
          }
        }
      }

      const startK = segmentStart ? 2 : 0;
      const endK = segmentEnd ? 2 : 4;

      for (let k = startK; k < endK; ++k) {
        EncodedCartesian3["default"].writeElements(
          scratchWritePosition,
          positionArray,
          positionIndex,
        );
        EncodedCartesian3["default"].writeElements(
          scratchWritePrevPosition,
          positionArray,
          positionIndex + 6,
        );
        EncodedCartesian3["default"].writeElements(
          scratchWriteNextPosition,
          positionArray,
          positionIndex + 12,
        );

        const direction = k - 2 < 0 ? -1.0 : 1.0;
        texCoordExpandAndBatchIndexArray[texCoordExpandAndBatchIndexIndex] =
          j / (positionsLength - 1); // s tex coord
        texCoordExpandAndBatchIndexArray[texCoordExpandAndBatchIndexIndex + 1] =
          2 * (k % 2) - 1; // expand direction
        texCoordExpandAndBatchIndexArray[texCoordExpandAndBatchIndexIndex + 2] =
          direction;
        texCoordExpandAndBatchIndexArray[texCoordExpandAndBatchIndexIndex + 3] =
          polylineBatchIndex;

        positionIndex += 6 * 3;
        texCoordExpandAndBatchIndexIndex += 4;
      }
    }

    const colorCartesian = scratchPickColorCartesian;
    colorCartesian.x = Color["default"].floatToByte(pickColor.red);
    colorCartesian.y = Color["default"].floatToByte(pickColor.green);
    colorCartesian.z = Color["default"].floatToByte(pickColor.blue);
    colorCartesian.w = Color["default"].floatToByte(pickColor.alpha);

    const widthShowCartesian = scratchWidthShowCartesian;
    widthShowCartesian.x = width;
    widthShowCartesian.y = show ? 1.0 : 0.0;

    const boundingSphere =
      mode === SceneMode["default"].SCENE2D
        ? polyline._boundingVolume2D
        : polyline._boundingVolumeWC;
    const encodedCenter = EncodedCartesian3["default"].fromCartesian(
      boundingSphere.center,
      scratchUpdatePolylineEncodedCartesian,
    );
    const high = encodedCenter.high;
    const low = Cartesian4["default"].fromElements(
      encodedCenter.low.x,
      encodedCenter.low.y,
      encodedCenter.low.z,
      boundingSphere.radius,
      scratchUpdatePolylineCartesian4,
    );

    const nearFarCartesian = scratchNearFarCartesian2;
    nearFarCartesian.x = 0.0;
    nearFarCartesian.y = Number.MAX_VALUE;

    const distanceDisplayCondition = polyline.distanceDisplayCondition;
    if ((0,defined["default"])(distanceDisplayCondition)) {
      nearFarCartesian.x = distanceDisplayCondition.near;
      nearFarCartesian.y = distanceDisplayCondition.far;
    }

    batchTable.setBatchedAttribute(polylineBatchIndex, 0, widthShowCartesian);
    batchTable.setBatchedAttribute(polylineBatchIndex, 1, colorCartesian);

    if (batchTable.attributes.length > 2) {
      batchTable.setBatchedAttribute(polylineBatchIndex, 2, high);
      batchTable.setBatchedAttribute(polylineBatchIndex, 3, low);
      batchTable.setBatchedAttribute(polylineBatchIndex, 4, nearFarCartesian);
    }
  }
};

const morphPositionScratch = new Cartesian3["default"]();
const morphPrevPositionScratch = new Cartesian3["default"]();
const morphNextPositionScratch = new Cartesian3["default"]();
const morphVectorScratch = new Cartesian3["default"]();

PolylineBucket.prototype.writeForMorph = function (
  positionArray,
  positionIndex,
) {
  const modelMatrix = this.modelMatrix;
  const polylines = this.polylines;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    const polyline = polylines[i];
    const positions = polyline._segments.positions;
    const lengths = polyline._segments.lengths;
    const positionsLength = positions.length;

    let segmentIndex = 0;
    let count = 0;

    for (let j = 0; j < positionsLength; ++j) {
      let prevPosition;
      if (j === 0) {
        if (polyline._loop) {
          prevPosition = positions[positionsLength - 2];
        } else {
          prevPosition = morphVectorScratch;
          Cartesian3["default"].subtract(positions[0], positions[1], prevPosition);
          Cartesian3["default"].add(positions[0], prevPosition, prevPosition);
        }
      } else {
        prevPosition = positions[j - 1];
      }

      prevPosition = Matrix4["default"].multiplyByPoint(
        modelMatrix,
        prevPosition,
        morphPrevPositionScratch,
      );

      const position = Matrix4["default"].multiplyByPoint(
        modelMatrix,
        positions[j],
        morphPositionScratch,
      );

      let nextPosition;
      if (j === positionsLength - 1) {
        if (polyline._loop) {
          nextPosition = positions[1];
        } else {
          nextPosition = morphVectorScratch;
          Cartesian3["default"].subtract(
            positions[positionsLength - 1],
            positions[positionsLength - 2],
            nextPosition,
          );
          Cartesian3["default"].add(
            positions[positionsLength - 1],
            nextPosition,
            nextPosition,
          );
        }
      } else {
        nextPosition = positions[j + 1];
      }

      nextPosition = Matrix4["default"].multiplyByPoint(
        modelMatrix,
        nextPosition,
        morphNextPositionScratch,
      );

      const segmentLength = lengths[segmentIndex];
      if (j === count + segmentLength) {
        count += segmentLength;
        ++segmentIndex;
      }

      const segmentStart = j - count === 0;
      const segmentEnd = j === count + lengths[segmentIndex] - 1;

      const startK = segmentStart ? 2 : 0;
      const endK = segmentEnd ? 2 : 4;

      for (let k = startK; k < endK; ++k) {
        EncodedCartesian3["default"].writeElements(position, positionArray, positionIndex);
        EncodedCartesian3["default"].writeElements(
          prevPosition,
          positionArray,
          positionIndex + 6,
        );
        EncodedCartesian3["default"].writeElements(
          nextPosition,
          positionArray,
          positionIndex + 12,
        );

        positionIndex += 6 * 3;
      }
    }
  }
};

const scratchSegmentLengths = new Array(1);

PolylineBucket.prototype.updateIndices = function (
  totalIndices,
  vertexBufferOffset,
  vertexArrayBuckets,
  offset,
) {
  let vaCount = vertexArrayBuckets.length - 1;
  let bucketLocator = new VertexArrayBucketLocator(0, offset, this);
  vertexArrayBuckets[vaCount].push(bucketLocator);
  let count = 0;
  let indices = totalIndices[totalIndices.length - 1];
  let indicesCount = 0;
  if (indices.length > 0) {
    indicesCount = indices[indices.length - 1] + 1;
  }
  const polylines = this.polylines;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    const polyline = polylines[i];
    polyline._locatorBuckets = [];

    let segments;
    if (this.mode === SceneMode["default"].SCENE3D) {
      segments = scratchSegmentLengths;
      const positionsLength = polyline._actualPositions.length;
      if (positionsLength > 0) {
        segments[0] = positionsLength;
      } else {
        continue;
      }
    } else {
      segments = polyline._segments.lengths;
    }

    const numberOfSegments = segments.length;
    if (numberOfSegments > 0) {
      let segmentIndexCount = 0;
      for (let j = 0; j < numberOfSegments; ++j) {
        const segmentLength = segments[j] - 1.0;
        for (let k = 0; k < segmentLength; ++k) {
          if (indicesCount + 4 > Core_Math["default"].SIXTY_FOUR_KILOBYTES) {
            polyline._locatorBuckets.push({
              locator: bucketLocator,
              count: segmentIndexCount,
            });
            segmentIndexCount = 0;
            vertexBufferOffset.push(4);
            indices = [];
            totalIndices.push(indices);
            indicesCount = 0;
            bucketLocator.count = count;
            count = 0;
            offset = 0;
            bucketLocator = new VertexArrayBucketLocator(0, 0, this);
            vertexArrayBuckets[++vaCount] = [bucketLocator];
          }

          indices.push(indicesCount, indicesCount + 2, indicesCount + 1);
          indices.push(indicesCount + 1, indicesCount + 2, indicesCount + 3);

          segmentIndexCount += 6;
          count += 6;
          offset += 6;
          indicesCount += 4;
        }
      }

      polyline._locatorBuckets.push({
        locator: bucketLocator,
        count: segmentIndexCount,
      });

      if (indicesCount + 4 > Core_Math["default"].SIXTY_FOUR_KILOBYTES) {
        vertexBufferOffset.push(0);
        indices = [];
        totalIndices.push(indices);
        indicesCount = 0;
        bucketLocator.count = count;
        offset = 0;
        count = 0;
        bucketLocator = new VertexArrayBucketLocator(0, 0, this);
        vertexArrayBuckets[++vaCount] = [bucketLocator];
      }
    }
    polyline._clean();
  }
  bucketLocator.count = count;
  return offset;
};

PolylineBucket.prototype.getPolylineStartIndex = function (polyline) {
  const polylines = this.polylines;
  let positionIndex = 0;
  const length = polylines.length;
  for (let i = 0; i < length; ++i) {
    const p = polylines[i];
    if (p === polyline) {
      break;
    }
    positionIndex += p._actualLength;
  }
  return positionIndex;
};

const scratchSegments = {
  positions: undefined,
  lengths: undefined,
};
const scratchLengths = new Array(1);
const pscratch = new Cartesian3["default"]();
const scratchCartographic = new Cartographic["default"]();

PolylineBucket.prototype.getSegments = function (polyline, projection) {
  let positions = polyline._actualPositions;

  if (this.mode === SceneMode["default"].SCENE3D) {
    scratchLengths[0] = positions.length;
    scratchSegments.positions = positions;
    scratchSegments.lengths = scratchLengths;
    return scratchSegments;
  }

  if (intersectsIDL(polyline)) {
    positions = polyline._segments.positions;
  }

  const ellipsoid = projection.ellipsoid;
  const newPositions = [];
  const modelMatrix = this.modelMatrix;
  const length = positions.length;
  let position;
  let p = pscratch;

  for (let n = 0; n < length; ++n) {
    position = positions[n];
    p = Matrix4["default"].multiplyByPoint(modelMatrix, position, p);
    newPositions.push(
      projection.project(
        ellipsoid.cartesianToCartographic(p, scratchCartographic),
      ),
    );
  }

  if (newPositions.length > 0) {
    polyline._boundingVolume2D = BoundingSphere["default"].fromPoints(
      newPositions,
      polyline._boundingVolume2D,
    );
    const center2D = polyline._boundingVolume2D.center;
    polyline._boundingVolume2D.center = new Cartesian3["default"](
      center2D.z,
      center2D.x,
      center2D.y,
    );
  }

  scratchSegments.positions = newPositions;
  scratchSegments.lengths = polyline._segments.lengths;
  return scratchSegments;
};

let scratchPositionsArray;

PolylineBucket.prototype.writeUpdate = function (
  index,
  polyline,
  positionBuffer,
  projection,
) {
  const mode = this.mode;
  const maxLon = projection.ellipsoid.maximumRadius * Core_Math["default"].PI;

  let positionsLength = polyline._actualLength;
  if (positionsLength) {
    index += this.getPolylineStartIndex(polyline);

    let positionArray = scratchPositionsArray;
    const positionsArrayLength = 6 * positionsLength * 3;

    if (
      !(0,defined["default"])(positionArray) ||
      positionArray.length < positionsArrayLength
    ) {
      positionArray = scratchPositionsArray = new Float32Array(
        positionsArrayLength,
      );
    } else if (positionArray.length > positionsArrayLength) {
      positionArray = new Float32Array(
        positionArray.buffer,
        0,
        positionsArrayLength,
      );
    }

    const segments = this.getSegments(polyline, projection);
    const positions = segments.positions;
    const lengths = segments.lengths;

    let positionIndex = 0;
    let segmentIndex = 0;
    let count = 0;
    let position;

    positionsLength = positions.length;
    for (let i = 0; i < positionsLength; ++i) {
      if (i === 0) {
        if (polyline._loop) {
          position = positions[positionsLength - 2];
        } else {
          position = scratchWriteVector;
          Cartesian3["default"].subtract(positions[0], positions[1], position);
          Cartesian3["default"].add(positions[0], position, position);
        }
      } else {
        position = positions[i - 1];
      }

      Cartesian3["default"].clone(position, scratchWritePrevPosition);
      Cartesian3["default"].clone(positions[i], scratchWritePosition);

      if (i === positionsLength - 1) {
        if (polyline._loop) {
          position = positions[1];
        } else {
          position = scratchWriteVector;
          Cartesian3["default"].subtract(
            positions[positionsLength - 1],
            positions[positionsLength - 2],
            position,
          );
          Cartesian3["default"].add(positions[positionsLength - 1], position, position);
        }
      } else {
        position = positions[i + 1];
      }

      Cartesian3["default"].clone(position, scratchWriteNextPosition);

      const segmentLength = lengths[segmentIndex];
      if (i === count + segmentLength) {
        count += segmentLength;
        ++segmentIndex;
      }

      const segmentStart = i - count === 0;
      const segmentEnd = i === count + lengths[segmentIndex] - 1;

      if (mode === SceneMode["default"].SCENE2D) {
        scratchWritePrevPosition.z = 0.0;
        scratchWritePosition.z = 0.0;
        scratchWriteNextPosition.z = 0.0;
      }

      if (mode === SceneMode["default"].SCENE2D || mode === SceneMode["default"].MORPHING) {
        if (
          (segmentStart || segmentEnd) &&
          maxLon - Math.abs(scratchWritePosition.x) < 1.0
        ) {
          if (
            (scratchWritePosition.x < 0.0 &&
              scratchWritePrevPosition.x > 0.0) ||
            (scratchWritePosition.x > 0.0 && scratchWritePrevPosition.x < 0.0)
          ) {
            Cartesian3["default"].clone(scratchWritePosition, scratchWritePrevPosition);
          }

          if (
            (scratchWritePosition.x < 0.0 &&
              scratchWriteNextPosition.x > 0.0) ||
            (scratchWritePosition.x > 0.0 && scratchWriteNextPosition.x < 0.0)
          ) {
            Cartesian3["default"].clone(scratchWritePosition, scratchWriteNextPosition);
          }
        }
      }

      const startJ = segmentStart ? 2 : 0;
      const endJ = segmentEnd ? 2 : 4;

      for (let j = startJ; j < endJ; ++j) {
        EncodedCartesian3["default"].writeElements(
          scratchWritePosition,
          positionArray,
          positionIndex,
        );
        EncodedCartesian3["default"].writeElements(
          scratchWritePrevPosition,
          positionArray,
          positionIndex + 6,
        );
        EncodedCartesian3["default"].writeElements(
          scratchWriteNextPosition,
          positionArray,
          positionIndex + 12,
        );
        positionIndex += 6 * 3;
      }
    }

    positionBuffer.copyFromArrayView(
      positionArray,
      6 * 3 * Float32Array.BYTES_PER_ELEMENT * index,
    );
  }
};
/* harmony default export */ const Scene_PolylineCollection = (PolylineCollection);


/***/ }),

/***/ 65891:
/*!*********************************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Core/OrthographicOffCenterFrustum.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cartesian3.js */ 67980);
/* harmony import */ var _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cartesian4.js */ 26809);
/* harmony import */ var _CullingVolume_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CullingVolume.js */ 793);
/* harmony import */ var _Frozen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frozen.js */ 15325);
/* harmony import */ var _defined_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defined.js */ 91446);
/* harmony import */ var _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DeveloperError.js */ 5971);
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Math.js */ 67817);
/* harmony import */ var _Matrix4_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Matrix4.js */ 84164);









/**
 * The viewing frustum is defined by 6 planes.
 * Each plane is represented by a {@link Cartesian4} object, where the x, y, and z components
 * define the unit vector normal to the plane, and the w component is the distance of the
 * plane from the origin/camera position.
 *
 * @alias OrthographicOffCenterFrustum
 * @constructor
 *
 * @param {object} [options] An object with the following properties:
 * @param {number} [options.left] The left clipping plane distance.
 * @param {number} [options.right] The right clipping plane distance.
 * @param {number} [options.top] The top clipping plane distance.
 * @param {number} [options.bottom] The bottom clipping plane distance.
 * @param {number} [options.near=1.0] The near clipping plane distance.
 * @param {number} [options.far=500000000.0] The far clipping plane distance.
 *
 * @example
 * const maxRadii = ellipsoid.maximumRadius;
 *
 * const frustum = new Cesium.OrthographicOffCenterFrustum();
 * frustum.right = maxRadii * Cesium.Math.PI;
 * frustum.left = -c.frustum.right;
 * frustum.top = c.frustum.right * (canvas.clientHeight / canvas.clientWidth);
 * frustum.bottom = -c.frustum.top;
 * frustum.near = 0.01 * maxRadii;
 * frustum.far = 50.0 * maxRadii;
 */
function OrthographicOffCenterFrustum(options) {
  options = options ?? _Frozen_js__WEBPACK_IMPORTED_MODULE_3__["default"].EMPTY_OBJECT;

  /**
   * The left clipping plane.
   * @type {number|undefined}
   * @default undefined
   */
  this.left = options.left;
  this._left = undefined;

  /**
   * The right clipping plane.
   * @type {number|undefined}
   * @default undefined
   */
  this.right = options.right;
  this._right = undefined;

  /**
   * The top clipping plane.
   * @type {number|undefined}
   * @default undefined
   */
  this.top = options.top;
  this._top = undefined;

  /**
   * The bottom clipping plane.
   * @type {number|undefined}
   * @default undefined
   */
  this.bottom = options.bottom;
  this._bottom = undefined;

  /**
   * The distance of the near plane.
   * @type {number}
   * @default 1.0
   */
  this.near = options.near ?? 1.0;
  this._near = this.near;

  /**
   * The distance of the far plane.
   * @type {number}
   * @default 500000000.0;
   */
  this.far = options.far ?? 500000000.0;
  this._far = this.far;

  this._cullingVolume = new _CullingVolume_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  this._orthographicMatrix = new _Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
}

function update(frustum) {
  //>>includeStart('debug', pragmas.debug);
  if (
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(frustum.right) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(frustum.left) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(frustum.top) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(frustum.bottom) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(frustum.near) ||
    !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(frustum.far)
  ) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"](
      "right, left, top, bottom, near, or far parameters are not set.",
    );
  }
  //>>includeEnd('debug');

  if (
    frustum.top !== frustum._top ||
    frustum.bottom !== frustum._bottom ||
    frustum.left !== frustum._left ||
    frustum.right !== frustum._right ||
    frustum.near !== frustum._near ||
    frustum.far !== frustum._far
  ) {
    //>>includeStart('debug', pragmas.debug);
    if (frustum.left > frustum.right) {
      throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("right must be greater than left.");
    }
    if (frustum.bottom > frustum.top) {
      throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("top must be greater than bottom.");
    }
    if (frustum.near <= 0 || frustum.near > frustum.far) {
      throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"](
        "near must be greater than zero and less than far.",
      );
    }
    //>>includeEnd('debug');

    frustum._left = frustum.left;
    frustum._right = frustum.right;
    frustum._top = frustum.top;
    frustum._bottom = frustum.bottom;
    frustum._near = frustum.near;
    frustum._far = frustum.far;
    frustum._orthographicMatrix = _Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["default"].computeOrthographicOffCenter(
      frustum.left,
      frustum.right,
      frustum.bottom,
      frustum.top,
      frustum.near,
      frustum.far,
      frustum._orthographicMatrix,
    );
  }
}

Object.defineProperties(OrthographicOffCenterFrustum.prototype, {
  /**
   * Gets the orthographic projection matrix computed from the view frustum.
   * @memberof OrthographicOffCenterFrustum.prototype
   * @type {Matrix4}
   * @readonly
   */
  projectionMatrix: {
    get: function () {
      update(this);
      return this._orthographicMatrix;
    },
  },
});

const getPlanesRight = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const getPlanesNearCenter = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const getPlanesPoint = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const negateScratch = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

/**
 * Creates a culling volume for this frustum.
 *
 * @param {Cartesian3} position The eye position.
 * @param {Cartesian3} direction The view direction.
 * @param {Cartesian3} up The up direction.
 * @returns {CullingVolume} A culling volume at the given position and orientation.
 *
 * @example
 * // Check if a bounding volume intersects the frustum.
 * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
 * const intersect = cullingVolume.computeVisibility(boundingVolume);
 */
OrthographicOffCenterFrustum.prototype.computeCullingVolume = function (
  position,
  direction,
  up,
) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(position)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("position is required.");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(direction)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("direction is required.");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(up)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("up is required.");
  }
  //>>includeEnd('debug');

  const planes = this._cullingVolume.planes;
  const t = this.top;
  const b = this.bottom;
  const r = this.right;
  const l = this.left;
  const n = this.near;
  const f = this.far;

  const right = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].cross(direction, up, getPlanesRight);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(right, right);
  const nearCenter = getPlanesNearCenter;
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(direction, n, nearCenter);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(position, nearCenter, nearCenter);

  const point = getPlanesPoint;

  // Left plane
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(right, l, point);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(nearCenter, point, point);

  let plane = planes[0];
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(plane)) {
    plane = planes[0] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  plane.x = right.x;
  plane.y = right.y;
  plane.z = right.z;
  plane.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(right, point);

  // Right plane
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(right, r, point);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(nearCenter, point, point);

  plane = planes[1];
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(plane)) {
    plane = planes[1] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  plane.x = -right.x;
  plane.y = -right.y;
  plane.z = -right.z;
  plane.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].negate(right, negateScratch), point);

  // Bottom plane
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(up, b, point);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(nearCenter, point, point);

  plane = planes[2];
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(plane)) {
    plane = planes[2] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  plane.x = up.x;
  plane.y = up.y;
  plane.z = up.z;
  plane.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(up, point);

  // Top plane
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(up, t, point);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(nearCenter, point, point);

  plane = planes[3];
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(plane)) {
    plane = planes[3] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  plane.x = -up.x;
  plane.y = -up.y;
  plane.z = -up.z;
  plane.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].negate(up, negateScratch), point);

  // Near plane
  plane = planes[4];
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(plane)) {
    plane = planes[4] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  plane.x = direction.x;
  plane.y = direction.y;
  plane.z = direction.z;
  plane.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(direction, nearCenter);

  // Far plane
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(direction, f, point);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(position, point, point);

  plane = planes[5];
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(plane)) {
    plane = planes[5] = new _Cartesian4_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  plane.x = -direction.x;
  plane.y = -direction.y;
  plane.z = -direction.z;
  plane.w = -_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].dot(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].negate(direction, negateScratch), point);

  return this._cullingVolume;
};

/**
 * Returns the pixel's width and height in meters.
 *
 * @param {number} drawingBufferWidth The width of the drawing buffer.
 * @param {number} drawingBufferHeight The height of the drawing buffer.
 * @param {number} distance The distance to the near plane in meters.
 * @param {number} pixelRatio The scaling factor from pixel space to coordinate space.
 * @param {Cartesian2} result The object onto which to store the result.
 * @returns {Cartesian2} The modified result parameter or a new instance of {@link Cartesian2} with the pixel's width and height in the x and y properties, respectively.
 *
 * @exception {DeveloperError} drawingBufferWidth must be greater than zero.
 * @exception {DeveloperError} drawingBufferHeight must be greater than zero.
 * @exception {DeveloperError} pixelRatio must be greater than zero.
 *
 * @example
 * // Example 1
 * // Get the width and height of a pixel.
 * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 0.0, scene.pixelRatio, new Cesium.Cartesian2());
 */
OrthographicOffCenterFrustum.prototype.getPixelDimensions = function (
  drawingBufferWidth,
  drawingBufferHeight,
  distance,
  pixelRatio,
  result,
) {
  update(this);

  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(drawingBufferWidth) || !(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(drawingBufferHeight)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"](
      "Both drawingBufferWidth and drawingBufferHeight are required.",
    );
  }
  if (drawingBufferWidth <= 0) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("drawingBufferWidth must be greater than zero.");
  }
  if (drawingBufferHeight <= 0) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("drawingBufferHeight must be greater than zero.");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(distance)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("distance is required.");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(pixelRatio)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("pixelRatio is required.");
  }
  if (pixelRatio <= 0) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("pixelRatio must be greater than zero.");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(result)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_5__["default"]("A result object is required.");
  }
  //>>includeEnd('debug');

  const frustumWidth = this.right - this.left;
  const frustumHeight = this.top - this.bottom;
  const pixelWidth = (pixelRatio * frustumWidth) / drawingBufferWidth;
  const pixelHeight = (pixelRatio * frustumHeight) / drawingBufferHeight;

  result.x = pixelWidth;
  result.y = pixelHeight;
  return result;
};

/**
 * Returns a duplicate of a OrthographicOffCenterFrustum instance.
 *
 * @param {OrthographicOffCenterFrustum} [result] The object onto which to store the result.
 * @returns {OrthographicOffCenterFrustum} The modified result parameter or a new OrthographicOffCenterFrustum instance if one was not provided.
 */
OrthographicOffCenterFrustum.prototype.clone = function (result) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(result)) {
    result = new OrthographicOffCenterFrustum();
  }

  result.left = this.left;
  result.right = this.right;
  result.top = this.top;
  result.bottom = this.bottom;
  result.near = this.near;
  result.far = this.far;

  // force update of clone to compute matrices
  result._left = undefined;
  result._right = undefined;
  result._top = undefined;
  result._bottom = undefined;
  result._near = undefined;
  result._far = undefined;

  return result;
};

/**
 * Compares the provided OrthographicOffCenterFrustum componentwise and returns
 * <code>true</code> if they are equal, <code>false</code> otherwise.
 *
 * @param {OrthographicOffCenterFrustum} [other] The right hand side OrthographicOffCenterFrustum.
 * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
 */
OrthographicOffCenterFrustum.prototype.equals = function (other) {
  return (
    (0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(other) &&
    other instanceof OrthographicOffCenterFrustum &&
    this.right === other.right &&
    this.left === other.left &&
    this.top === other.top &&
    this.bottom === other.bottom &&
    this.near === other.near &&
    this.far === other.far
  );
};

/**
 * Compares the provided OrthographicOffCenterFrustum componentwise and returns
 * <code>true</code> if they pass an absolute or relative tolerance test,
 * <code>false</code> otherwise.
 *
 * @param {OrthographicOffCenterFrustum} other The right hand side OrthographicOffCenterFrustum.
 * @param {number} relativeEpsilon The relative epsilon tolerance to use for equality testing.
 * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
 * @returns {boolean} <code>true</code> if this and other are within the provided epsilon, <code>false</code> otherwise.
 */
OrthographicOffCenterFrustum.prototype.equalsEpsilon = function (
  other,
  relativeEpsilon,
  absoluteEpsilon,
) {
  return (
    other === this ||
    ((0,_defined_js__WEBPACK_IMPORTED_MODULE_4__["default"])(other) &&
      other instanceof OrthographicOffCenterFrustum &&
      _Math_js__WEBPACK_IMPORTED_MODULE_6__["default"].equalsEpsilon(
        this.right,
        other.right,
        relativeEpsilon,
        absoluteEpsilon,
      ) &&
      _Math_js__WEBPACK_IMPORTED_MODULE_6__["default"].equalsEpsilon(
        this.left,
        other.left,
        relativeEpsilon,
        absoluteEpsilon,
      ) &&
      _Math_js__WEBPACK_IMPORTED_MODULE_6__["default"].equalsEpsilon(
        this.top,
        other.top,
        relativeEpsilon,
        absoluteEpsilon,
      ) &&
      _Math_js__WEBPACK_IMPORTED_MODULE_6__["default"].equalsEpsilon(
        this.bottom,
        other.bottom,
        relativeEpsilon,
        absoluteEpsilon,
      ) &&
      _Math_js__WEBPACK_IMPORTED_MODULE_6__["default"].equalsEpsilon(
        this.near,
        other.near,
        relativeEpsilon,
        absoluteEpsilon,
      ) &&
      _Math_js__WEBPACK_IMPORTED_MODULE_6__["default"].equalsEpsilon(
        this.far,
        other.far,
        relativeEpsilon,
        absoluteEpsilon,
      ))
  );
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrthographicOffCenterFrustum);


/***/ }),

/***/ 70349:
/*!*********************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Core/PolylinePipeline.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cartesian3.js */ 67980);
/* harmony import */ var _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cartographic.js */ 36946);
/* harmony import */ var _defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defined.js */ 91446);
/* harmony import */ var _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeveloperError.js */ 5971);
/* harmony import */ var _Ellipsoid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Ellipsoid.js */ 10750);
/* harmony import */ var _EllipsoidGeodesic_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EllipsoidGeodesic.js */ 2289);
/* harmony import */ var _EllipsoidRhumbLine_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EllipsoidRhumbLine.js */ 51824);
/* harmony import */ var _IntersectionTests_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IntersectionTests.js */ 90);
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Math.js */ 67817);
/* harmony import */ var _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Matrix4.js */ 84164);
/* harmony import */ var _Plane_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Plane.js */ 57941);












/**
 * @private
 */
const PolylinePipeline = {};

PolylinePipeline.numberOfPoints = function (p0, p1, minDistance) {
  const distance = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].distance(p0, p1);
  return Math.ceil(distance / minDistance);
};

PolylinePipeline.numberOfPointsRhumbLine = function (p0, p1, granularity) {
  const radiansDistanceSquared =
    Math.pow(p0.longitude - p1.longitude, 2) +
    Math.pow(p0.latitude - p1.latitude, 2);

  return Math.max(
    1,
    Math.ceil(Math.sqrt(radiansDistanceSquared / (granularity * granularity))),
  );
};

const cartoScratch = new _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
PolylinePipeline.extractHeights = function (positions, ellipsoid) {
  const length = positions.length;
  const heights = new Array(length);
  for (let i = 0; i < length; i++) {
    const p = positions[i];
    heights[i] = ellipsoid.cartesianToCartographic(p, cartoScratch).height;
  }
  return heights;
};

const wrapLongitudeInversMatrix = new _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"]();
const wrapLongitudeOrigin = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const wrapLongitudeXZNormal = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const wrapLongitudeXZPlane = new _Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"](_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_X, 0.0);
const wrapLongitudeYZNormal = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const wrapLongitudeYZPlane = new _Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"](_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_X, 0.0);
const wrapLongitudeIntersection = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const wrapLongitudeOffset = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

const subdivideHeightsScratchArray = [];

function subdivideHeights(numPoints, h0, h1) {
  const heights = subdivideHeightsScratchArray;
  heights.length = numPoints;

  let i;
  if (h0 === h1) {
    for (i = 0; i < numPoints; i++) {
      heights[i] = h0;
    }
    return heights;
  }

  const dHeight = h1 - h0;
  const heightPerVertex = dHeight / numPoints;

  for (i = 0; i < numPoints; i++) {
    const h = h0 + i * heightPerVertex;
    heights[i] = h;
  }

  return heights;
}

const carto1 = new _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const carto2 = new _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const cartesian = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const scaleFirst = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const scaleLast = new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const ellipsoidGeodesic = new _EllipsoidGeodesic_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
let ellipsoidRhumb = new _EllipsoidRhumbLine_js__WEBPACK_IMPORTED_MODULE_6__["default"]();

//Returns subdivided line scaled to ellipsoid surface starting at p1 and ending at p2.
//Result includes p1, but not include p2.  This function is called for a sequence of line segments,
//and this prevents duplication of end point.
function generateCartesianArc(
  p0,
  p1,
  minDistance,
  ellipsoid,
  h0,
  h1,
  array,
  offset,
) {
  const first = ellipsoid.scaleToGeodeticSurface(p0, scaleFirst);
  const last = ellipsoid.scaleToGeodeticSurface(p1, scaleLast);
  const numPoints = PolylinePipeline.numberOfPoints(p0, p1, minDistance);
  const start = ellipsoid.cartesianToCartographic(first, carto1);
  const end = ellipsoid.cartesianToCartographic(last, carto2);
  const heights = subdivideHeights(numPoints, h0, h1);

  ellipsoidGeodesic.setEndPoints(start, end);
  const surfaceDistanceBetweenPoints =
    ellipsoidGeodesic.surfaceDistance / numPoints;

  let index = offset;
  start.height = h0;
  let cart = ellipsoid.cartographicToCartesian(start, cartesian);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].pack(cart, array, index);
  index += 3;

  for (let i = 1; i < numPoints; i++) {
    const carto = ellipsoidGeodesic.interpolateUsingSurfaceDistance(
      i * surfaceDistanceBetweenPoints,
      carto2,
    );
    carto.height = heights[i];
    cart = ellipsoid.cartographicToCartesian(carto, cartesian);
    _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].pack(cart, array, index);
    index += 3;
  }

  return index;
}

//Returns subdivided line scaled to ellipsoid surface starting at p1 and ending at p2.
//Result includes p1, but not include p2.  This function is called for a sequence of line segments,
//and this prevents duplication of end point.
function generateCartesianRhumbArc(
  p0,
  p1,
  granularity,
  ellipsoid,
  h0,
  h1,
  array,
  offset,
) {
  const start = ellipsoid.cartesianToCartographic(p0, carto1);
  const end = ellipsoid.cartesianToCartographic(p1, carto2);
  const numPoints = PolylinePipeline.numberOfPointsRhumbLine(
    start,
    end,
    granularity,
  );
  start.height = 0.0;
  end.height = 0.0;
  const heights = subdivideHeights(numPoints, h0, h1);

  if (!ellipsoidRhumb.ellipsoid.equals(ellipsoid)) {
    ellipsoidRhumb = new _EllipsoidRhumbLine_js__WEBPACK_IMPORTED_MODULE_6__["default"](undefined, undefined, ellipsoid);
  }
  ellipsoidRhumb.setEndPoints(start, end);
  const surfaceDistanceBetweenPoints =
    ellipsoidRhumb.surfaceDistance / numPoints;

  let index = offset;
  start.height = h0;
  let cart = ellipsoid.cartographicToCartesian(start, cartesian);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].pack(cart, array, index);
  index += 3;

  for (let i = 1; i < numPoints; i++) {
    const carto = ellipsoidRhumb.interpolateUsingSurfaceDistance(
      i * surfaceDistanceBetweenPoints,
      carto2,
    );
    carto.height = heights[i];
    cart = ellipsoid.cartographicToCartesian(carto, cartesian);
    _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].pack(cart, array, index);
    index += 3;
  }

  return index;
}

/**
 * Breaks a {@link Polyline} into segments such that it does not cross the &plusmn;180 degree meridian of an ellipsoid.
 *
 * @param {Cartesian3[]} positions The polyline's Cartesian positions.
 * @param {Matrix4} [modelMatrix=Matrix4.IDENTITY] The polyline's model matrix. Assumed to be an affine
 * transformation matrix, where the upper left 3x3 elements are a rotation matrix, and
 * the upper three elements in the fourth column are the translation.  The bottom row is assumed to be [0, 0, 0, 1].
 * The matrix is not verified to be in the proper form.
 * @returns {object} An object with a <code>positions</code> property that is an array of positions and a
 * <code>segments</code> property.
 *
 *
 * @example
 * const polylines = new Cesium.PolylineCollection();
 * const polyline = polylines.add(...);
 * const positions = polyline.positions;
 * const modelMatrix = polylines.modelMatrix;
 * const segments = Cesium.PolylinePipeline.wrapLongitude(positions, modelMatrix);
 *
 * @see PolygonPipeline.wrapLongitude
 * @see Polyline
 * @see PolylineCollection
 */
PolylinePipeline.wrapLongitude = function (positions, modelMatrix) {
  const cartesians = [];
  const segments = [];

  if ((0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(positions) && positions.length > 0) {
    modelMatrix = modelMatrix ?? _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].IDENTITY;
    const inverseModelMatrix = _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].inverseTransformation(
      modelMatrix,
      wrapLongitudeInversMatrix,
    );

    const origin = _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].multiplyByPoint(
      inverseModelMatrix,
      _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].ZERO,
      wrapLongitudeOrigin,
    );
    const xzNormal = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(
      _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].multiplyByPointAsVector(
        inverseModelMatrix,
        _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_Y,
        wrapLongitudeXZNormal,
      ),
      wrapLongitudeXZNormal,
    );
    const xzPlane = _Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"].fromPointNormal(
      origin,
      xzNormal,
      wrapLongitudeXZPlane,
    );
    const yzNormal = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(
      _Matrix4_js__WEBPACK_IMPORTED_MODULE_9__["default"].multiplyByPointAsVector(
        inverseModelMatrix,
        _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].UNIT_X,
        wrapLongitudeYZNormal,
      ),
      wrapLongitudeYZNormal,
    );
    const yzPlane = _Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"].fromPointNormal(
      origin,
      yzNormal,
      wrapLongitudeYZPlane,
    );

    let count = 1;
    cartesians.push(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].clone(positions[0]));
    let prev = cartesians[0];

    const length = positions.length;
    for (let i = 1; i < length; ++i) {
      const cur = positions[i];

      // intersects the IDL if either endpoint is on the negative side of the yz-plane
      if (
        _Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"].getPointDistance(yzPlane, prev) < 0.0 ||
        _Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"].getPointDistance(yzPlane, cur) < 0.0
      ) {
        // and intersects the xz-plane
        const intersection = _IntersectionTests_js__WEBPACK_IMPORTED_MODULE_7__["default"].lineSegmentPlane(
          prev,
          cur,
          xzPlane,
          wrapLongitudeIntersection,
        );
        if ((0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(intersection)) {
          // move point on the xz-plane slightly away from the plane
          const offset = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(
            xzNormal,
            5.0e-9,
            wrapLongitudeOffset,
          );
          if (_Plane_js__WEBPACK_IMPORTED_MODULE_10__["default"].getPointDistance(xzPlane, prev) < 0.0) {
            _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].negate(offset, offset);
          }

          cartesians.push(
            _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(intersection, offset, new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]()),
          );
          segments.push(count + 1);

          _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].negate(offset, offset);
          cartesians.push(
            _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(intersection, offset, new _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"]()),
          );
          count = 1;
        }
      }

      cartesians.push(_Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].clone(positions[i]));
      count++;

      prev = cur;
    }

    segments.push(count);
  }

  return {
    positions: cartesians,
    lengths: segments,
  };
};

/**
 * Subdivides polyline and raises all points to the specified height.  Returns an array of numbers to represent the positions.
 * @param {object} options Object with the following properties:
 * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
 * @param {number|number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
 * @param {number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.default] The ellipsoid on which the positions lie.
 * @returns {number[]} A new array of positions of type {number} that have been subdivided and raised to the surface of the ellipsoid.
 *
 * @example
 * const positions = Cesium.Cartesian3.fromDegreesArray([
 *   -105.0, 40.0,
 *   -100.0, 38.0,
 *   -105.0, 35.0,
 *   -100.0, 32.0
 * ]);
 * const surfacePositions = Cesium.PolylinePipeline.generateArc({
 *   positons: positions
 * });
 */
PolylinePipeline.generateArc = function (options) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(options)) {
    options = {};
  }
  const positions = options.positions;
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(positions)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("options.positions is required.");
  }
  //>>includeEnd('debug');

  const length = positions.length;
  const ellipsoid = options.ellipsoid ?? _Ellipsoid_js__WEBPACK_IMPORTED_MODULE_4__["default"]["default"];
  let height = options.height ?? 0;
  const hasHeightArray = Array.isArray(height);

  if (length < 1) {
    return [];
  } else if (length === 1) {
    const p = ellipsoid.scaleToGeodeticSurface(positions[0], scaleFirst);
    height = hasHeightArray ? height[0] : height;
    if (height !== 0) {
      const n = ellipsoid.geodeticSurfaceNormal(p, cartesian);
      _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(n, height, n);
      _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(p, n, p);
    }

    return [p.x, p.y, p.z];
  }

  let minDistance = options.minDistance;
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(minDistance)) {
    const granularity = options.granularity ?? _Math_js__WEBPACK_IMPORTED_MODULE_8__["default"].RADIANS_PER_DEGREE;
    minDistance = _Math_js__WEBPACK_IMPORTED_MODULE_8__["default"].chordLength(granularity, ellipsoid.maximumRadius);
  }

  let numPoints = 0;
  let i;

  for (i = 0; i < length - 1; i++) {
    numPoints += PolylinePipeline.numberOfPoints(
      positions[i],
      positions[i + 1],
      minDistance,
    );
  }

  const arrayLength = (numPoints + 1) * 3;
  const newPositions = new Array(arrayLength);
  let offset = 0;

  for (i = 0; i < length - 1; i++) {
    const p0 = positions[i];
    const p1 = positions[i + 1];

    const h0 = hasHeightArray ? height[i] : height;
    const h1 = hasHeightArray ? height[i + 1] : height;

    offset = generateCartesianArc(
      p0,
      p1,
      minDistance,
      ellipsoid,
      h0,
      h1,
      newPositions,
      offset,
    );
  }

  subdivideHeightsScratchArray.length = 0;

  const lastPoint = positions[length - 1];
  const carto = ellipsoid.cartesianToCartographic(lastPoint, carto1);
  carto.height = hasHeightArray ? height[length - 1] : height;
  const cart = ellipsoid.cartographicToCartesian(carto, cartesian);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].pack(cart, newPositions, arrayLength - 3);

  return newPositions;
};

const scratchCartographic0 = new _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const scratchCartographic1 = new _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

/**
 * Subdivides polyline and raises all points to the specified height using Rhumb lines.  Returns an array of numbers to represent the positions.
 * @param {object} options Object with the following properties:
 * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
 * @param {number|number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
 * @param {number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.default] The ellipsoid on which the positions lie.
 * @returns {number[]} A new array of positions of type {number} that have been subdivided and raised to the surface of the ellipsoid.
 *
 * @example
 * const positions = Cesium.Cartesian3.fromDegreesArray([
 *   -105.0, 40.0,
 *   -100.0, 38.0,
 *   -105.0, 35.0,
 *   -100.0, 32.0
 * ]);
 * const surfacePositions = Cesium.PolylinePipeline.generateRhumbArc({
 *   positons: positions
 * });
 */
PolylinePipeline.generateRhumbArc = function (options) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(options)) {
    options = {};
  }
  const positions = options.positions;
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(positions)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_3__["default"]("options.positions is required.");
  }
  //>>includeEnd('debug');

  const length = positions.length;
  const ellipsoid = options.ellipsoid ?? _Ellipsoid_js__WEBPACK_IMPORTED_MODULE_4__["default"]["default"];
  let height = options.height ?? 0;
  const hasHeightArray = Array.isArray(height);

  if (length < 1) {
    return [];
  } else if (length === 1) {
    const p = ellipsoid.scaleToGeodeticSurface(positions[0], scaleFirst);
    height = hasHeightArray ? height[0] : height;
    if (height !== 0) {
      const n = ellipsoid.geodeticSurfaceNormal(p, cartesian);
      _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].multiplyByScalar(n, height, n);
      _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(p, n, p);
    }

    return [p.x, p.y, p.z];
  }

  const granularity = options.granularity ?? _Math_js__WEBPACK_IMPORTED_MODULE_8__["default"].RADIANS_PER_DEGREE;

  let numPoints = 0;
  let i;

  let c0 = ellipsoid.cartesianToCartographic(
    positions[0],
    scratchCartographic0,
  );
  let c1;
  for (i = 0; i < length - 1; i++) {
    c1 = ellipsoid.cartesianToCartographic(
      positions[i + 1],
      scratchCartographic1,
    );
    numPoints += PolylinePipeline.numberOfPointsRhumbLine(c0, c1, granularity);
    c0 = _Cartographic_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(c1, scratchCartographic0);
  }

  const arrayLength = (numPoints + 1) * 3;
  const newPositions = new Array(arrayLength);
  let offset = 0;

  for (i = 0; i < length - 1; i++) {
    const p0 = positions[i];
    const p1 = positions[i + 1];

    const h0 = hasHeightArray ? height[i] : height;
    const h1 = hasHeightArray ? height[i + 1] : height;

    offset = generateCartesianRhumbArc(
      p0,
      p1,
      granularity,
      ellipsoid,
      h0,
      h1,
      newPositions,
      offset,
    );
  }

  subdivideHeightsScratchArray.length = 0;

  const lastPoint = positions[length - 1];
  const carto = ellipsoid.cartesianToCartographic(lastPoint, carto1);
  carto.height = hasHeightArray ? height[length - 1] : height;
  const cart = ellipsoid.cartographicToCartesian(carto, cartesian);
  _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].pack(cart, newPositions, arrayLength - 3);

  return newPositions;
};

/**
 * Subdivides polyline and raises all points to the specified height. Returns an array of new {Cartesian3} positions.
 * @param {object} options Object with the following properties:
 * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
 * @param {number|number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
 * @param {number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.default] The ellipsoid on which the positions lie.
 * @returns {Cartesian3[]} A new array of cartesian3 positions that have been subdivided and raised to the surface of the ellipsoid.
 *
 * @example
 * const positions = Cesium.Cartesian3.fromDegreesArray([
 *   -105.0, 40.0,
 *   -100.0, 38.0,
 *   -105.0, 35.0,
 *   -100.0, 32.0
 * ]);
 * const surfacePositions = Cesium.PolylinePipeline.generateCartesianArc({
 *   positons: positions
 * });
 */
PolylinePipeline.generateCartesianArc = function (options) {
  const numberArray = PolylinePipeline.generateArc(options);
  const size = numberArray.length / 3;
  const newPositions = new Array(size);
  for (let i = 0; i < size; i++) {
    newPositions[i] = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].unpack(numberArray, i * 3);
  }
  return newPositions;
};

/**
 * Subdivides polyline and raises all points to the specified height using Rhumb Lines. Returns an array of new {Cartesian3} positions.
 * @param {object} options Object with the following properties:
 * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
 * @param {number|number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
 * @param {number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.default] The ellipsoid on which the positions lie.
 * @returns {Cartesian3[]} A new array of cartesian3 positions that have been subdivided and raised to the surface of the ellipsoid.
 *
 * @example
 * const positions = Cesium.Cartesian3.fromDegreesArray([
 *   -105.0, 40.0,
 *   -100.0, 38.0,
 *   -105.0, 35.0,
 *   -100.0, 32.0
 * ]);
 * const surfacePositions = Cesium.PolylinePipeline.generateCartesianRhumbArc({
 *   positons: positions
 * });
 */
PolylinePipeline.generateCartesianRhumbArc = function (options) {
  const numberArray = PolylinePipeline.generateRhumbArc(options);
  const size = numberArray.length / 3;
  const newPositions = new Array(size);
  for (let i = 0; i < size; i++) {
    newPositions[i] = _Cartesian3_js__WEBPACK_IMPORTED_MODULE_0__["default"].unpack(numberArray, i * 3);
  }
  return newPositions;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PolylinePipeline);


/***/ }),

/***/ 78173:
/*!*********************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Scene/SceneTransforms.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Core_BoundingRectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/BoundingRectangle.js */ 47934);
/* harmony import */ var _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/Cartesian2.js */ 34067);
/* harmony import */ var _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Cartesian3.js */ 67980);
/* harmony import */ var _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/Cartesian4.js */ 26809);
/* harmony import */ var _Core_Cartographic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/Cartographic.js */ 36946);
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Core/defined.js */ 91446);
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Core/DeveloperError.js */ 5971);
/* harmony import */ var _Core_Math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Core/Math.js */ 67817);
/* harmony import */ var _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Core/Matrix4.js */ 84164);
/* harmony import */ var _Core_OrthographicFrustum_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Core/OrthographicFrustum.js */ 11203);
/* harmony import */ var _Core_OrthographicOffCenterFrustum_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Core/OrthographicOffCenterFrustum.js */ 65891);
/* harmony import */ var _Core_Transforms_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Core/Transforms.js */ 47722);
/* harmony import */ var _SceneMode_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SceneMode.js */ 62467);














/**
 * Functions that do scene-dependent transforms between rendering-related coordinate systems.
 *
 * @namespace SceneTransforms
 */
const SceneTransforms = {};

const actualPositionScratch = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"](0, 0, 0, 1);
let positionCC = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const scratchViewport = new _Core_BoundingRectangle_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

const scratchWindowCoord0 = new _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const scratchWindowCoord1 = new _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

/**
 * Transforms a position in world (WGS84 or alternative ellipsoid) coordinates to window coordinates.  This is commonly used to place an
 * HTML element at the same screen position as an object in the scene.
 *
 * @param {Scene} scene The scene.
 * @param {Cartesian3} position The position in world (WGS84 or alternative ellipsoid) coordinates.
 * @param {Cartesian2} [result] An optional object to return the input position transformed to window coordinates.
 * @returns {Cartesian2|undefined} The modified result parameter or a new Cartesian2 instance if one was not provided.  This may be <code>undefined</code> if the input position is near the center of the ellipsoid.
 *
 * @example
 * // Output the window position of longitude/latitude (0, 0) every time the mouse moves.
 * const position = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
 * const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
 * handler.setInputAction(function(movement) {
 *     console.log(Cesium.SceneTransforms.worldToWindowCoordinates(scene, position));
 * }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
 */
SceneTransforms.worldToWindowCoordinates = function (scene, position, result) {
  return SceneTransforms.worldWithEyeOffsetToWindowCoordinates(
    scene,
    position,
    _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].ZERO,
    result,
  );
};

const scratchCartesian4 = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const scratchEyeOffset = new _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

function worldToClip(position, eyeOffset, camera, result) {
  const viewMatrix = camera.viewMatrix;

  const positionEC = _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].multiplyByVector(
    viewMatrix,
    _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromElements(
      position.x,
      position.y,
      position.z,
      1,
      scratchCartesian4,
    ),
    scratchCartesian4,
  );

  const zEyeOffset = _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].multiplyComponents(
    eyeOffset,
    _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].normalize(positionEC, scratchEyeOffset),
    scratchEyeOffset,
  );
  positionEC.x += eyeOffset.x + zEyeOffset.x;
  positionEC.y += eyeOffset.y + zEyeOffset.y;
  positionEC.z += zEyeOffset.z;

  return _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].multiplyByVector(
    camera.frustum.projectionMatrix,
    positionEC,
    result,
  );
}

const scratchMaxCartographic = new _Core_Cartographic_js__WEBPACK_IMPORTED_MODULE_4__["default"](
  Math.PI,
  _Core_Math_js__WEBPACK_IMPORTED_MODULE_7__["default"].PI_OVER_TWO,
);
const scratchProjectedCartesian = new _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const scratchCameraPosition = new _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

/**
 * @private
 */
SceneTransforms.worldWithEyeOffsetToWindowCoordinates = function (
  scene,
  position,
  eyeOffset,
  result,
) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(scene)) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_6__["default"]("scene is required.");
  }
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(position)) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_6__["default"]("position is required.");
  }
  //>>includeEnd('debug');

  // Transform for 3D, 2D, or Columbus view
  const frameState = scene.frameState;
  const actualPosition = SceneTransforms.computeActualEllipsoidPosition(
    frameState,
    position,
    actualPositionScratch,
  );

  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(actualPosition)) {
    return undefined;
  }

  // Assuming viewport takes up the entire canvas...
  const canvas = scene.canvas;
  const viewport = scratchViewport;
  viewport.x = 0;
  viewport.y = 0;
  viewport.width = canvas.clientWidth;
  viewport.height = canvas.clientHeight;

  const camera = scene.camera;
  let cameraCentered = false;

  if (frameState.mode === _SceneMode_js__WEBPACK_IMPORTED_MODULE_12__["default"].SCENE2D) {
    const projection = scene.mapProjection;
    const maxCartographic = scratchMaxCartographic;
    const maxCoord = projection.project(
      maxCartographic,
      scratchProjectedCartesian,
    );

    const cameraPosition = _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(
      camera.position,
      scratchCameraPosition,
    );
    const frustum = camera.frustum.clone();

    const viewportTransformation = _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].computeViewportTransformation(
      viewport,
      0.0,
      1.0,
      new _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"](),
    );
    const projectionMatrix = camera.frustum.projectionMatrix;

    const x = camera.positionWC.y;
    const eyePoint = _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromElements(
      _Core_Math_js__WEBPACK_IMPORTED_MODULE_7__["default"].sign(x) * maxCoord.x - x,
      0.0,
      -camera.positionWC.x,
    );
    const windowCoordinates = _Core_Transforms_js__WEBPACK_IMPORTED_MODULE_11__["default"].pointToGLWindowCoordinates(
      projectionMatrix,
      viewportTransformation,
      eyePoint,
    );

    if (
      x === 0.0 ||
      windowCoordinates.x <= 0.0 ||
      windowCoordinates.x >= canvas.clientWidth
    ) {
      cameraCentered = true;
    } else {
      if (windowCoordinates.x > canvas.clientWidth * 0.5) {
        viewport.width = windowCoordinates.x;

        camera.frustum.right = maxCoord.x - x;

        positionCC = worldToClip(actualPosition, eyeOffset, camera, positionCC);
        SceneTransforms.clipToGLWindowCoordinates(
          viewport,
          positionCC,
          scratchWindowCoord0,
        );

        viewport.x += windowCoordinates.x;

        camera.position.x = -camera.position.x;

        const right = camera.frustum.right;
        camera.frustum.right = -camera.frustum.left;
        camera.frustum.left = -right;

        positionCC = worldToClip(actualPosition, eyeOffset, camera, positionCC);
        SceneTransforms.clipToGLWindowCoordinates(
          viewport,
          positionCC,
          scratchWindowCoord1,
        );
      } else {
        viewport.x += windowCoordinates.x;
        viewport.width -= windowCoordinates.x;

        camera.frustum.left = -maxCoord.x - x;

        positionCC = worldToClip(actualPosition, eyeOffset, camera, positionCC);
        SceneTransforms.clipToGLWindowCoordinates(
          viewport,
          positionCC,
          scratchWindowCoord0,
        );

        viewport.x = viewport.x - viewport.width;

        camera.position.x = -camera.position.x;

        const left = camera.frustum.left;
        camera.frustum.left = -camera.frustum.right;
        camera.frustum.right = -left;

        positionCC = worldToClip(actualPosition, eyeOffset, camera, positionCC);
        SceneTransforms.clipToGLWindowCoordinates(
          viewport,
          positionCC,
          scratchWindowCoord1,
        );
      }

      _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(cameraPosition, camera.position);
      camera.frustum = frustum.clone();

      result = _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__["default"].clone(scratchWindowCoord0, result);
      if (result.x < 0.0 || result.x > canvas.clientWidth) {
        result.x = scratchWindowCoord1.x;
      }
    }
  }

  if (frameState.mode !== _SceneMode_js__WEBPACK_IMPORTED_MODULE_12__["default"].SCENE2D || cameraCentered) {
    // View-projection matrix to transform from world coordinates to clip coordinates
    positionCC = worldToClip(actualPosition, eyeOffset, camera, positionCC);
    if (
      positionCC.z < 0 &&
      !(camera.frustum instanceof _Core_OrthographicFrustum_js__WEBPACK_IMPORTED_MODULE_9__["default"]) &&
      !(camera.frustum instanceof _Core_OrthographicOffCenterFrustum_js__WEBPACK_IMPORTED_MODULE_10__["default"])
    ) {
      return undefined;
    }

    result = SceneTransforms.clipToGLWindowCoordinates(
      viewport,
      positionCC,
      result,
    );
  }

  result.y = canvas.clientHeight - result.y;
  return result;
};

/**
 * Transforms a position in world coordinates to drawing buffer coordinates.  This may produce different
 * results from SceneTransforms.worldToWindowCoordinates when the browser zoom is not 100%, or on high-DPI displays.
 *
 * @param {Scene} scene The scene.
 * @param {Cartesian3} position The position in world (WGS84 or alternative ellipsoid) coordinates.
 * @param {Cartesian2} [result] An optional object to return the input position transformed to window coordinates.
 * @returns {Cartesian2|undefined} The modified result parameter or a new Cartesian2 instance if one was not provided.  This may be <code>undefined</code> if the input position is near the center of the ellipsoid.
 *
 * @example
 * // Output the window position of longitude/latitude (0, 0) every time the mouse moves.
 * const position = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
 * const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
 * handler.setInputAction(function(movement) {
 *     console.log(Cesium.SceneTransforms.worldToDrawingBufferCoordinates(scene, position));
 * }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
 */
SceneTransforms.worldToDrawingBufferCoordinates = function (
  scene,
  position,
  result,
) {
  result = SceneTransforms.worldToWindowCoordinates(scene, position, result);
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(result)) {
    return undefined;
  }

  return SceneTransforms.transformWindowToDrawingBuffer(scene, result, result);
};

const projectedPosition = new _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const positionInCartographic = new _Core_Cartographic_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

/**
 * @private
 */
SceneTransforms.computeActualEllipsoidPosition = function (
  frameState,
  position,
  result,
) {
  const mode = frameState.mode;

  if (mode === _SceneMode_js__WEBPACK_IMPORTED_MODULE_12__["default"].SCENE3D) {
    return _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].clone(position, result);
  }

  const projection = frameState.mapProjection;
  const cartographic = projection.ellipsoid.cartesianToCartographic(
    position,
    positionInCartographic,
  );
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(cartographic)) {
    return undefined;
  }

  projection.project(cartographic, projectedPosition);

  if (mode === _SceneMode_js__WEBPACK_IMPORTED_MODULE_12__["default"].COLUMBUS_VIEW) {
    return _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromElements(
      projectedPosition.z,
      projectedPosition.x,
      projectedPosition.y,
      result,
    );
  }

  if (mode === _SceneMode_js__WEBPACK_IMPORTED_MODULE_12__["default"].SCENE2D) {
    return _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromElements(
      0.0,
      projectedPosition.x,
      projectedPosition.y,
      result,
    );
  }

  // mode === SceneMode.MORPHING
  const morphTime = frameState.morphTime;
  return _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromElements(
    _Core_Math_js__WEBPACK_IMPORTED_MODULE_7__["default"].lerp(projectedPosition.z, position.x, morphTime),
    _Core_Math_js__WEBPACK_IMPORTED_MODULE_7__["default"].lerp(projectedPosition.x, position.y, morphTime),
    _Core_Math_js__WEBPACK_IMPORTED_MODULE_7__["default"].lerp(projectedPosition.y, position.z, morphTime),
    result,
  );
};

const positionNDC = new _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const positionWC = new _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
const viewportTransform = new _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"]();

/**
 * @private
 */
SceneTransforms.clipToGLWindowCoordinates = function (
  viewport,
  position,
  result,
) {
  // Perspective divide to transform from clip coordinates to normalized device coordinates
  _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].divideByScalar(position, position.w, positionNDC);

  // Viewport transform to transform from clip coordinates to window coordinates
  _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].computeViewportTransformation(viewport, 0.0, 1.0, viewportTransform);
  _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].multiplyByPoint(viewportTransform, positionNDC, positionWC);

  return _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromCartesian3(positionWC, result);
};

/**
 * @private
 */
SceneTransforms.transformWindowToDrawingBuffer = function (
  scene,
  windowPosition,
  result,
) {
  const canvas = scene.canvas;
  const xScale = scene.drawingBufferWidth / canvas.clientWidth;
  const yScale = scene.drawingBufferHeight / canvas.clientHeight;
  return _Core_Cartesian2_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromElements(
    windowPosition.x * xScale,
    windowPosition.y * yScale,
    result,
  );
};

const scratchNDC = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const scratchWorldCoords = new _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"]();

/**
 * @private
 */
SceneTransforms.drawingBufferToWorldCoordinates = function (
  scene,
  drawingBufferPosition,
  depth,
  result,
) {
  const context = scene.context;
  const uniformState = context.uniformState;

  const currentFrustum = uniformState.currentFrustum;
  const near = currentFrustum.x;
  const far = currentFrustum.y;

  if (scene.frameState.useLogDepth) {
    // transforming logarithmic depth of form
    // log2(z + 1) / log2( far + 1);
    // to perspective form
    // (far - far * near / z) / (far - near)
    const log2Depth = depth * uniformState.log2FarDepthFromNearPlusOne;
    const depthFromNear = Math.pow(2.0, log2Depth) - 1.0;
    depth = (far * (1.0 - near / (depthFromNear + near))) / (far - near);
  }

  const viewport = scene.view.passState.viewport;
  const ndc = _Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"].clone(_Core_Cartesian4_js__WEBPACK_IMPORTED_MODULE_3__["default"].UNIT_W, scratchNDC);
  ndc.x = ((drawingBufferPosition.x - viewport.x) / viewport.width) * 2.0 - 1.0;
  ndc.y =
    ((drawingBufferPosition.y - viewport.y) / viewport.height) * 2.0 - 1.0;
  ndc.z = depth * 2.0 - 1.0;
  ndc.w = 1.0;

  let worldCoords;
  let frustum = scene.camera.frustum;
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(frustum.fovy)) {
    const offCenterFrustum = frustum.offCenterFrustum;
    if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offCenterFrustum)) {
      frustum = offCenterFrustum;
    }
    worldCoords = scratchWorldCoords;
    worldCoords.x =
      (ndc.x * (frustum.right - frustum.left) + frustum.left + frustum.right) *
      0.5;
    worldCoords.y =
      (ndc.y * (frustum.top - frustum.bottom) + frustum.bottom + frustum.top) *
      0.5;
    worldCoords.z = (ndc.z * (near - far) - near - far) * 0.5;
    worldCoords.w = 1.0;

    worldCoords = _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].multiplyByVector(
      uniformState.inverseView,
      worldCoords,
      worldCoords,
    );
  } else {
    worldCoords = _Core_Matrix4_js__WEBPACK_IMPORTED_MODULE_8__["default"].multiplyByVector(
      uniformState.inverseViewProjection,
      ndc,
      scratchWorldCoords,
    );

    // Reverse perspective divide
    const w = 1.0 / worldCoords.w;
    _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].multiplyByScalar(worldCoords, w, worldCoords);
  }
  return _Core_Cartesian3_js__WEBPACK_IMPORTED_MODULE_2__["default"].fromCartesian4(worldCoords, result);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SceneTransforms);


/***/ }),

/***/ 90176:
/*!******************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Core/NearFarScalar.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defined.js */ 91446);
/* harmony import */ var _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeveloperError.js */ 5971);



/**
 * Represents a scalar value's lower and upper bound at a near distance and far distance in eye space.
 * @alias NearFarScalar
 * @constructor
 *
 * @param {number} [near=0.0] The lower bound of the camera range.
 * @param {number} [nearValue=0.0] The value at the lower bound of the camera range.
 * @param {number} [far=1.0] The upper bound of the camera range.
 * @param {number} [farValue=0.0] The value at the upper bound of the camera range.
 *
 * @see Packable
 */
function NearFarScalar(near, nearValue, far, farValue) {
  /**
   * The lower bound of the camera range.
   * @type {number}
   * @default 0.0
   */
  this.near = near ?? 0.0;
  /**
   * The value at the lower bound of the camera range.
   * @type {number}
   * @default 0.0
   */
  this.nearValue = nearValue ?? 0.0;
  /**
   * The upper bound of the camera range.
   * @type {number}
   * @default 1.0
   */
  this.far = far ?? 1.0;
  /**
   * The value at the upper bound of the camera range.
   * @type {number}
   * @default 0.0
   */
  this.farValue = farValue ?? 0.0;
}

/**
 * Duplicates a NearFarScalar instance.
 *
 * @param {NearFarScalar} nearFarScalar The NearFarScalar to duplicate.
 * @param {NearFarScalar} [result] The object onto which to store the result.
 * @returns {NearFarScalar} The modified result parameter or a new NearFarScalar instance if one was not provided. (Returns undefined if nearFarScalar is undefined)
 */
NearFarScalar.clone = function (nearFarScalar, result) {
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(nearFarScalar)) {
    return undefined;
  }

  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result)) {
    return new NearFarScalar(
      nearFarScalar.near,
      nearFarScalar.nearValue,
      nearFarScalar.far,
      nearFarScalar.farValue,
    );
  }

  result.near = nearFarScalar.near;
  result.nearValue = nearFarScalar.nearValue;
  result.far = nearFarScalar.far;
  result.farValue = nearFarScalar.farValue;
  return result;
};

/**
 * The number of elements used to pack the object into an array.
 * @type {number}
 */
NearFarScalar.packedLength = 4;

/**
 * Stores the provided instance into the provided array.
 *
 * @param {NearFarScalar} value The value to pack.
 * @param {number[]} array The array to pack into.
 * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
 *
 * @returns {number[]} The array that was packed into
 */
NearFarScalar.pack = function (value, array, startingIndex) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__["default"]("value is required");
  }
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(array)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__["default"]("array is required");
  }
  //>>includeEnd('debug');

  startingIndex = startingIndex ?? 0;

  array[startingIndex++] = value.near;
  array[startingIndex++] = value.nearValue;
  array[startingIndex++] = value.far;
  array[startingIndex] = value.farValue;

  return array;
};

/**
 * Retrieves an instance from a packed array.
 *
 * @param {number[]} array The packed array.
 * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
 * @param {NearFarScalar} [result] The object into which to store the result.
 * @returns {NearFarScalar} The modified result parameter or a new NearFarScalar instance if one was not provided.
 */
NearFarScalar.unpack = function (array, startingIndex, result) {
  //>>includeStart('debug', pragmas.debug);
  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(array)) {
    throw new _DeveloperError_js__WEBPACK_IMPORTED_MODULE_1__["default"]("array is required");
  }
  //>>includeEnd('debug');

  startingIndex = startingIndex ?? 0;

  if (!(0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result)) {
    result = new NearFarScalar();
  }
  result.near = array[startingIndex++];
  result.nearValue = array[startingIndex++];
  result.far = array[startingIndex++];
  result.farValue = array[startingIndex];
  return result;
};

/**
 * Compares the provided NearFarScalar and returns <code>true</code> if they are equal,
 * <code>false</code> otherwise.
 *
 * @param {NearFarScalar} [left] The first NearFarScalar.
 * @param {NearFarScalar} [right] The second NearFarScalar.
 * @returns {boolean} <code>true</code> if left and right are equal; otherwise <code>false</code>.
 */
NearFarScalar.equals = function (left, right) {
  return (
    left === right ||
    ((0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(left) &&
      (0,_defined_js__WEBPACK_IMPORTED_MODULE_0__["default"])(right) &&
      left.near === right.near &&
      left.nearValue === right.nearValue &&
      left.far === right.far &&
      left.farValue === right.farValue)
  );
};

/**
 * Duplicates this instance.
 *
 * @param {NearFarScalar} [result] The object onto which to store the result.
 * @returns {NearFarScalar} The modified result parameter or a new NearFarScalar instance if one was not provided.
 */
NearFarScalar.prototype.clone = function (result) {
  return NearFarScalar.clone(this, result);
};

/**
 * Compares this instance to the provided NearFarScalar and returns <code>true</code> if they are equal,
 * <code>false</code> otherwise.
 *
 * @param {NearFarScalar} [right] The right hand side NearFarScalar.
 * @returns {boolean} <code>true</code> if left and right are equal; otherwise <code>false</code>.
 */
NearFarScalar.prototype.equals = function (right) {
  return NearFarScalar.equals(this, right);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NearFarScalar);


/***/ }),

/***/ 93470:
/*!**************************************************************************!*\
  !*** ./node_modules/@cesium/engine/Source/Renderer/VertexArrayFacade.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Core_Check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/Check.js */ 69031);
/* harmony import */ var _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/ComponentDatatype.js */ 71804);
/* harmony import */ var _Core_defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/defined.js */ 91446);
/* harmony import */ var _Core_destroyObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/destroyObject.js */ 77354);
/* harmony import */ var _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/DeveloperError.js */ 5971);
/* harmony import */ var _Core_Math_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Core/Math.js */ 67817);
/* harmony import */ var _Buffer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Buffer.js */ 41613);
/* harmony import */ var _BufferUsage_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BufferUsage.js */ 42790);
/* harmony import */ var _VertexArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VertexArray.js */ 8380);










/**
 * @private
 */
function VertexArrayFacade(context, attributes, sizeInVertices, instanced) {
  //>>includeStart('debug', pragmas.debug);
  _Core_Check_js__WEBPACK_IMPORTED_MODULE_0__["default"].defined("context", context);
  if (!attributes || attributes.length === 0) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"]("At least one attribute is required.");
  }
  //>>includeEnd('debug');

  const attrs = VertexArrayFacade._verifyAttributes(attributes);
  sizeInVertices = sizeInVertices ?? 0;
  const precreatedAttributes = [];
  const attributesByUsage = {};
  let attributesForUsage;
  let usage;

  // Bucket the attributes by usage.
  const length = attrs.length;
  for (let i = 0; i < length; ++i) {
    const attribute = attrs[i];

    // If the attribute already has a vertex buffer, we do not need
    // to manage a vertex buffer or typed array for it.
    if (attribute.vertexBuffer) {
      precreatedAttributes.push(attribute);
      continue;
    }

    usage = attribute.usage;
    attributesForUsage = attributesByUsage[usage];
    if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(attributesForUsage)) {
      attributesForUsage = attributesByUsage[usage] = [];
    }

    attributesForUsage.push(attribute);
  }

  // A function to sort attributes by the size of their components.  From left to right, a vertex
  // stores floats, shorts, and then bytes.
  function compare(left, right) {
    return (
      _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeInBytes(right.componentDatatype) -
      _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeInBytes(left.componentDatatype)
    );
  }

  this._allBuffers = [];

  for (usage in attributesByUsage) {
    if (attributesByUsage.hasOwnProperty(usage)) {
      attributesForUsage = attributesByUsage[usage];

      attributesForUsage.sort(compare);
      const vertexSizeInBytes =
        VertexArrayFacade._vertexSizeInBytes(attributesForUsage);

      const bufferUsage = attributesForUsage[0].usage;

      const buffer = {
        vertexSizeInBytes: vertexSizeInBytes,
        vertexBuffer: undefined,
        usage: bufferUsage,
        needsCommit: false,
        arrayBuffer: undefined,
        arrayViews: VertexArrayFacade._createArrayViews(
          attributesForUsage,
          vertexSizeInBytes,
        ),
      };

      this._allBuffers.push(buffer);
    }
  }

  this._size = 0;
  this._instanced = instanced ?? false;

  this._precreated = precreatedAttributes;
  this._context = context;

  this.writers = undefined;
  this.va = undefined;

  this.resize(sizeInVertices);
}
VertexArrayFacade._verifyAttributes = function (attributes) {
  const attrs = [];

  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];

    const attr = {
      index: attribute.index ?? i,
      enabled: attribute.enabled ?? true,
      componentsPerAttribute: attribute.componentsPerAttribute,
      componentDatatype: attribute.componentDatatype ?? _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].FLOAT,
      normalize: attribute.normalize ?? false,

      // There will be either a vertexBuffer or an [optional] usage.
      vertexBuffer: attribute.vertexBuffer,
      usage: attribute.usage ?? _BufferUsage_js__WEBPACK_IMPORTED_MODULE_7__["default"].STATIC_DRAW,
    };
    attrs.push(attr);

    //>>includeStart('debug', pragmas.debug);
    if (
      attr.componentsPerAttribute !== 1 &&
      attr.componentsPerAttribute !== 2 &&
      attr.componentsPerAttribute !== 3 &&
      attr.componentsPerAttribute !== 4
    ) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
        "attribute.componentsPerAttribute must be in the range [1, 4].",
      );
    }

    const datatype = attr.componentDatatype;
    if (!_Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].validate(datatype)) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
        "Attribute must have a valid componentDatatype or not specify it.",
      );
    }

    if (!_BufferUsage_js__WEBPACK_IMPORTED_MODULE_7__["default"].validate(attr.usage)) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
        "Attribute must have a valid usage or not specify it.",
      );
    }
    //>>includeEnd('debug');
  }

  // Verify all attribute names are unique.
  const uniqueIndices = new Array(attrs.length);
  for (let j = 0; j < attrs.length; ++j) {
    const currentAttr = attrs[j];
    const index = currentAttr.index;
    //>>includeStart('debug', pragmas.debug);
    if (uniqueIndices[index]) {
      throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
        `Index ${index} is used by more than one attribute.`,
      );
    }
    //>>includeEnd('debug');
    uniqueIndices[index] = true;
  }

  return attrs;
};

VertexArrayFacade._vertexSizeInBytes = function (attributes) {
  let sizeInBytes = 0;

  const length = attributes.length;
  for (let i = 0; i < length; ++i) {
    const attribute = attributes[i];
    sizeInBytes +=
      attribute.componentsPerAttribute *
      _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeInBytes(attribute.componentDatatype);
  }

  const maxComponentSizeInBytes =
    length > 0
      ? _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeInBytes(attributes[0].componentDatatype)
      : 0; // Sorted by size
  const remainder =
    maxComponentSizeInBytes > 0 ? sizeInBytes % maxComponentSizeInBytes : 0;
  const padding = remainder === 0 ? 0 : maxComponentSizeInBytes - remainder;
  sizeInBytes += padding;

  return sizeInBytes;
};

VertexArrayFacade._createArrayViews = function (attributes, vertexSizeInBytes) {
  const views = [];
  let offsetInBytes = 0;

  const length = attributes.length;
  for (let i = 0; i < length; ++i) {
    const attribute = attributes[i];
    const componentDatatype = attribute.componentDatatype;

    views.push({
      index: attribute.index,
      enabled: attribute.enabled,
      componentsPerAttribute: attribute.componentsPerAttribute,
      componentDatatype: componentDatatype,
      normalize: attribute.normalize,

      offsetInBytes: offsetInBytes,
      vertexSizeInComponentType:
        vertexSizeInBytes / _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeInBytes(componentDatatype),

      view: undefined,
    });

    offsetInBytes +=
      attribute.componentsPerAttribute *
      _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSizeInBytes(componentDatatype);
  }

  return views;
};

/**
 * Invalidates writers.  Can't render again until commit is called.
 */
VertexArrayFacade.prototype.resize = function (sizeInVertices) {
  this._size = sizeInVertices;

  const allBuffers = this._allBuffers;
  this.writers = [];

  for (let i = 0, len = allBuffers.length; i < len; ++i) {
    const buffer = allBuffers[i];

    VertexArrayFacade._resize(buffer, this._size);

    // Reserving invalidates the writers, so if client's cache them, they need to invalidate their cache.
    VertexArrayFacade._appendWriters(this.writers, buffer);
  }

  // VAs are recreated next time commit is called.
  destroyVA(this);
};

VertexArrayFacade._resize = function (buffer, size) {
  if (buffer.vertexSizeInBytes > 0) {
    // Create larger array buffer
    const arrayBuffer = new ArrayBuffer(size * buffer.vertexSizeInBytes);

    // Copy contents from previous array buffer
    if ((0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(buffer.arrayBuffer)) {
      const destView = new Uint8Array(arrayBuffer);
      const sourceView = new Uint8Array(buffer.arrayBuffer);
      const sourceLength = sourceView.length;
      for (let j = 0; j < sourceLength; ++j) {
        destView[j] = sourceView[j];
      }
    }

    // Create typed views into the new array buffer
    const views = buffer.arrayViews;
    const length = views.length;
    for (let i = 0; i < length; ++i) {
      const view = views[i];
      view.view = _Core_ComponentDatatype_js__WEBPACK_IMPORTED_MODULE_1__["default"].createArrayBufferView(
        view.componentDatatype,
        arrayBuffer,
        view.offsetInBytes,
      );
    }

    buffer.arrayBuffer = arrayBuffer;
  }
};

const createWriters = [
  // 1 component per attribute
  function (buffer, view, vertexSizeInComponentType) {
    return function (index, attribute) {
      view[index * vertexSizeInComponentType] = attribute;
      buffer.needsCommit = true;
    };
  },

  // 2 component per attribute
  function (buffer, view, vertexSizeInComponentType) {
    return function (index, component0, component1) {
      const i = index * vertexSizeInComponentType;
      view[i] = component0;
      view[i + 1] = component1;
      buffer.needsCommit = true;
    };
  },

  // 3 component per attribute
  function (buffer, view, vertexSizeInComponentType) {
    return function (index, component0, component1, component2) {
      const i = index * vertexSizeInComponentType;
      view[i] = component0;
      view[i + 1] = component1;
      view[i + 2] = component2;
      buffer.needsCommit = true;
    };
  },

  // 4 component per attribute
  function (buffer, view, vertexSizeInComponentType) {
    return function (index, component0, component1, component2, component3) {
      const i = index * vertexSizeInComponentType;
      view[i] = component0;
      view[i + 1] = component1;
      view[i + 2] = component2;
      view[i + 3] = component3;
      buffer.needsCommit = true;
    };
  },
];

VertexArrayFacade._appendWriters = function (writers, buffer) {
  const arrayViews = buffer.arrayViews;
  const length = arrayViews.length;
  for (let i = 0; i < length; ++i) {
    const arrayView = arrayViews[i];
    writers[arrayView.index] = createWriters[
      arrayView.componentsPerAttribute - 1
    ](buffer, arrayView.view, arrayView.vertexSizeInComponentType);
  }
};

VertexArrayFacade.prototype.commit = function (indexBuffer) {
  let recreateVA = false;

  const allBuffers = this._allBuffers;
  let buffer;
  let i;
  let length;

  for (i = 0, length = allBuffers.length; i < length; ++i) {
    buffer = allBuffers[i];
    recreateVA = commit(this, buffer) || recreateVA;
  }

  ///////////////////////////////////////////////////////////////////////

  if (recreateVA || !(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.va)) {
    destroyVA(this);
    const va = (this.va = []);

    const chunkSize = _Core_Math_js__WEBPACK_IMPORTED_MODULE_5__["default"].SIXTY_FOUR_KILOBYTES - 4; // The 65535 index is reserved for primitive restart. Reserve the last 4 indices so that billboard quads are not broken up.
    const numberOfVertexArrays =
      (0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(indexBuffer) && !this._instanced
        ? Math.ceil(this._size / chunkSize)
        : 1;
    for (let k = 0; k < numberOfVertexArrays; ++k) {
      let attributes = [];
      for (i = 0, length = allBuffers.length; i < length; ++i) {
        buffer = allBuffers[i];
        const offset = k * (buffer.vertexSizeInBytes * chunkSize);
        VertexArrayFacade._appendAttributes(
          attributes,
          buffer,
          offset,
          this._instanced,
        );
      }

      attributes = attributes.concat(this._precreated);

      va.push({
        va: new _VertexArray_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
          context: this._context,
          attributes: attributes,
          indexBuffer: indexBuffer,
        }),
        indicesCount:
          1.5 *
          (k !== numberOfVertexArrays - 1 ? chunkSize : this._size % chunkSize),
        // TODO: not hardcode 1.5, this assumes 6 indices per 4 vertices (as for Billboard quads).
      });
    }
  }
};

function commit(vertexArrayFacade, buffer) {
  if (buffer.needsCommit && buffer.vertexSizeInBytes > 0) {
    buffer.needsCommit = false;

    const vertexBuffer = buffer.vertexBuffer;
    const vertexBufferSizeInBytes =
      vertexArrayFacade._size * buffer.vertexSizeInBytes;
    const vertexBufferDefined = (0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(vertexBuffer);
    if (
      !vertexBufferDefined ||
      vertexBuffer.sizeInBytes < vertexBufferSizeInBytes
    ) {
      if (vertexBufferDefined) {
        vertexBuffer.destroy();
      }
      buffer.vertexBuffer = _Buffer_js__WEBPACK_IMPORTED_MODULE_6__["default"].createVertexBuffer({
        context: vertexArrayFacade._context,
        typedArray: buffer.arrayBuffer,
        usage: buffer.usage,
      });
      buffer.vertexBuffer.vertexArrayDestroyable = false;

      return true; // Created new vertex buffer
    }

    buffer.vertexBuffer.copyFromArrayView(buffer.arrayBuffer);
  }

  return false; // Did not create new vertex buffer
}

VertexArrayFacade._appendAttributes = function (
  attributes,
  buffer,
  vertexBufferOffset,
  instanced,
) {
  const arrayViews = buffer.arrayViews;
  const length = arrayViews.length;
  for (let i = 0; i < length; ++i) {
    const view = arrayViews[i];

    attributes.push({
      index: view.index,
      enabled: view.enabled,
      componentsPerAttribute: view.componentsPerAttribute,
      componentDatatype: view.componentDatatype,
      normalize: view.normalize,
      vertexBuffer: buffer.vertexBuffer,
      offsetInBytes: vertexBufferOffset + view.offsetInBytes,
      strideInBytes: buffer.vertexSizeInBytes,
      instanceDivisor: instanced ? 1 : 0,
    });
  }
};

VertexArrayFacade.prototype.subCommit = function (
  offsetInVertices,
  lengthInVertices,
) {
  //>>includeStart('debug', pragmas.debug);
  if (offsetInVertices < 0 || offsetInVertices >= this._size) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      "offsetInVertices must be greater than or equal to zero and less than the vertex array size.",
    );
  }
  if (offsetInVertices + lengthInVertices > this._size) {
    throw new _Core_DeveloperError_js__WEBPACK_IMPORTED_MODULE_4__["default"](
      "offsetInVertices + lengthInVertices cannot exceed the vertex array size.",
    );
  }
  //>>includeEnd('debug');

  const allBuffers = this._allBuffers;
  for (let i = 0, len = allBuffers.length; i < len; ++i) {
    subCommit(allBuffers[i], offsetInVertices, lengthInVertices);
  }
};

function subCommit(buffer, offsetInVertices, lengthInVertices) {
  if (buffer.needsCommit && buffer.vertexSizeInBytes > 0) {
    const byteOffset = buffer.vertexSizeInBytes * offsetInVertices;
    const byteLength = buffer.vertexSizeInBytes * lengthInVertices;

    // PERFORMANCE_IDEA: If we want to get really crazy, we could consider updating
    // individual attributes instead of the entire (sub-)vertex.
    //
    // PERFORMANCE_IDEA: Does creating the typed view add too much GC overhead?
    buffer.vertexBuffer.copyFromArrayView(
      new Uint8Array(buffer.arrayBuffer, byteOffset, byteLength),
      byteOffset,
    );
  }
}

VertexArrayFacade.prototype.endSubCommits = function () {
  const allBuffers = this._allBuffers;

  for (let i = 0, len = allBuffers.length; i < len; ++i) {
    allBuffers[i].needsCommit = false;
  }
};

function destroyVA(vertexArrayFacade) {
  const va = vertexArrayFacade.va;
  if (!(0,_Core_defined_js__WEBPACK_IMPORTED_MODULE_2__["default"])(va)) {
    return;
  }

  const length = va.length;
  for (let i = 0; i < length; ++i) {
    va[i].va.destroy();
  }

  vertexArrayFacade.va = undefined;
}

VertexArrayFacade.prototype.isDestroyed = function () {
  return false;
};

VertexArrayFacade.prototype.destroy = function () {
  const allBuffers = this._allBuffers;
  for (let i = 0, len = allBuffers.length; i < len; ++i) {
    const buffer = allBuffers[i];
    buffer.vertexBuffer = buffer.vertexBuffer && buffer.vertexBuffer.destroy();
  }

  destroyVA(this);

  return (0,_Core_destroyObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VertexArrayFacade);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL3ZlbmRvcnMuNGZjYjUwNzk5ODY2MTFjNDcxNzcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsaUVBQWUsaUJBQWlCO0FBQ2hDLHVCQUF1QjtBQUN2Qix3QkFBd0I7QUFDeEIseUJBQXlCO0FBQ3pCLG9CQUFvQjtBQUNwQiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLENBQUM7QUFDRCw4RUFBOEU7QUFDOUUsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSx3REFBd0Q7QUFDeEQsNEVBQTRFO0FBQzVFLDhHQUE4RztBQUM5RztBQUNBLDBEQUEwRDtBQUMxRCwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1Qyx3QkFBd0I7QUFDeEIsQ0FBQztBQUNELENBQUMsRUFBQzs7O0FDaERGO0FBQ0EsaUVBQWUsbUNBQW1DO0FBQ2xEO0FBQ0EsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUM5QixxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLHFFQUFxRTtBQUNyRSxxRUFBcUU7QUFDckU7QUFDQSxpQkFBaUI7QUFDakIsd0JBQXdCO0FBQ3hCLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIscUJBQXFCO0FBQ3JCLDJCQUEyQjtBQUMzQjtBQUNBLGdDQUFnQztBQUNoQyx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQsaURBQWlEO0FBQ2pELGdFQUFnRTtBQUNoRSxvRUFBb0U7QUFDcEUsNkRBQTZEO0FBQzdEO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsdURBQXVEO0FBQ3ZELDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFDdEQ7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQSxpREFBaUQ7QUFDakQsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCxzQ0FBc0M7QUFDdEMscURBQXFEO0FBQ3JELDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsaURBQWlEO0FBQ2pELHNDQUFzQztBQUN0QyxpREFBaUQ7QUFDakQsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCx3REFBd0Q7QUFDeEQsc0NBQXNDO0FBQ3RDLHdEQUF3RDtBQUN4RCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCxrQ0FBa0M7QUFDbEM7QUFDQSxzQ0FBc0M7QUFDdEMsd0RBQXdEO0FBQ3hELDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsdURBQXVEO0FBQ3ZELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSx5QkFBeUI7QUFDekIsS0FBSztBQUNMO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG1DQUFtQztBQUNuQyx3QkFBd0I7QUFDeEIsS0FBSztBQUNMO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsdUVBQXVFO0FBQ3ZFO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsbUNBQW1DO0FBQ25DLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUUsNkVBQTZFO0FBQzdFLGdEQUFnRDtBQUNoRDtBQUNBLDZDQUE2QztBQUM3QyxLQUFLO0FBQ0w7QUFDQTtBQUNBLDhDQUE4QztBQUM5Qyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGdHQUFnRztBQUNoRztBQUNBLEtBQUs7QUFDTCx1RUFBdUU7QUFDdkUsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxvREFBb0Q7QUFDcEQscURBQXFEO0FBQ3JEO0FBQ0EsU0FBUztBQUNUO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEMsNENBQTRDO0FBQzVDO0FBQ0EsMENBQTBDO0FBQzFDLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMsd0JBQXdCO0FBQ3hCO0FBQ0EsNEJBQTRCO0FBQzVCLGtGQUFrRjtBQUNsRixDQUFDO0FBQ0QsQ0FBQyxFQUFDOzs7Ozs7Ozs7OztBQzFMcUQ7QUFDbEI7QUFDd0I7QUFDdEI7QUFDRTtBQUNZO0FBQ0U7QUFDTTtBQUNwQjtBQUNBO0FBQ1k7QUFDRTtBQUNGO0FBQ0k7QUFDSjtBQUNkO0FBQ2M7QUFDSTtBQUNGO0FBQ1U7QUFDaUI7QUFDQTtBQUNuQztBQUNKO0FBQ007QUFDVjs7QUFFdkMsbUJBQW1CLHlCQUFjO0FBQ2pDLHVCQUF1Qix5QkFBYztBQUNyQyxvQkFBb0IseUJBQWM7QUFDbEMsNEJBQTRCLHlCQUFjO0FBQzFDLDRCQUE0Qix5QkFBYztBQUMxQyx5QkFBeUIseUJBQWM7QUFDdkMsZ0NBQWdDLHlCQUFjO0FBQzlDO0FBQ0EsRUFBRSx5QkFBYztBQUNoQjtBQUNBLEVBQUUseUJBQWM7QUFDaEI7QUFDQSxFQUFFLHlCQUFjO0FBQ2hCLDhCQUE4Qix5QkFBYztBQUM1Qyw2QkFBNkIseUJBQWM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNELFFBQVEsc0NBQXNDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBTTs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCLHlCQUFjO0FBQ3ZDLDJCQUEyQix5QkFBYztBQUN6QywyQkFBMkIseUJBQWM7QUFDekMsNkJBQTZCLHlCQUFjO0FBQzNDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHlDQUF5QztBQUNsRDtBQUNBLFlBQVk7QUFDWixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0JBQU8sOEJBQThCLGtCQUFPO0FBQ2pFLHNCQUFzQixrQkFBTyxPQUFPLGtCQUFPOztBQUUzQztBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSw0Q0FBNEMsc0JBQVc7QUFDdkQ7O0FBRUEsZUFBZSxvQkFBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxzQkFBVztBQUNmLElBQUksc0JBQVc7QUFDZixJQUFJLHNCQUFXO0FBQ2YsSUFBSSxzQkFBVztBQUNmLElBQUksc0JBQVc7QUFDZixJQUFJLHNCQUFXO0FBQ2YsSUFBSSxzQkFBVztBQUNmLElBQUksc0JBQVc7QUFDZixJQUFJLHNCQUFXO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG9DQUFvQztBQUMxQztBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUJBQWM7QUFDOUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsU0FBUyw0Q0FBNEM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksMkJBQTJCO0FBQy9CO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixZQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzQkFBTztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVDQUF1QztBQUMzQztBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQSxJQUFJLHVDQUF1QztBQUMzQztBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHNCQUFPO0FBQ2QsY0FBYyx5QkFBYztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0EsNEJBQTRCLHNCQUFXLGVBQWUsc0JBQVc7QUFDakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLDRCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDRCQUFpQjtBQUM1QztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNEJBQWlCO0FBQzVDO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw0QkFBaUI7QUFDNUM7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDRCQUFpQjtBQUM1QztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNEJBQWlCO0FBQzVDO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDRCQUFpQjtBQUM1QztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUNBQWlDLDRCQUFpQjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUMsb0JBQVM7QUFDbEQsSUFBSSx5QkFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSw0QkFBaUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUIsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxnQkFBSztBQUNqQixjQUFjLGdCQUFLO0FBQ25CLGFBQWEsZ0JBQUs7QUFDbEI7O0FBRUEsUUFBUSxnQkFBSztBQUNiLFVBQVUsZ0JBQUs7QUFDZixTQUFTLGdCQUFLO0FBQ2Q7O0FBRUEsUUFBUSxnQkFBSztBQUNiLFVBQVUsZ0JBQUs7QUFDZixTQUFTLGdCQUFLO0FBQ2Q7O0FBRUE7QUFDQSxJQUFJLGdCQUFLO0FBQ1QsSUFBSSxnQkFBSztBQUNULElBQUksZ0JBQUs7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxzQkFBTztBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsb0JBQVU7QUFDeEI7QUFDQTs7QUFFQSxhQUFhLG9CQUFVO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sc0JBQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxzQkFBTztBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sc0JBQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsb0JBQVM7QUFDbkM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBLDJCQUEyQix5QkFBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0JBQU87QUFDZjs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLFFBQVEseUJBQWM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSx5QkFBYztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxvQkFBUztBQUN2QixPQUFPLGtCQUFPO0FBQ2Q7QUFDQTtBQUNBLElBQUksa0JBQU87QUFDWDs7QUFFQTtBQUNBLGVBQWUsb0JBQVM7QUFDeEIsZUFBZSxvQkFBUztBQUN4QixlQUFlLG9CQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrQkFBa0Isb0JBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCLG9CQUFTLHFCQUFxQixvQkFBUztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHdCQUFhOztBQUV6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLDJCQUEyQjtBQUNqRDtBQUNBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQTs7QUFFQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQTs7QUFFQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLHNCQUFPLGdCQUFnQixzQkFBTztBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHlCQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isa0JBQU87QUFDM0IsMEJBQTBCLG9CQUFTO0FBQ25DO0FBQ0EscUJBQXFCLHlCQUFjO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixxQkFBcUIseUJBQWM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQVc7QUFDdkMsNEJBQTRCLHNCQUFXO0FBQ3ZDO0FBQ0EsdUJBQXVCLHNCQUFXO0FBQ2xDO0FBQ0E7QUFDQSxnQkFBZ0IseUJBQWM7QUFDOUIsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLHNCQUFXO0FBQ3ZDLDRCQUE0QixzQkFBVztBQUN2QztBQUNBLDRCQUE0QixzQkFBVztBQUN2QztBQUNBO0FBQ0EsZ0JBQWdCLHlCQUFjO0FBQzlCLFNBQVM7QUFDVDtBQUNBLGtCQUFrQix3QkFBYTtBQUMvQixPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx1QkFBWTtBQUN6QixnQkFBZ0IsMEJBQTBCO0FBQzFDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLHNCQUFXO0FBQ3pDLGVBQWUsdUJBQVk7QUFDM0I7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDLE9BQU87QUFDUCxpQkFBaUIsd0JBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVAsZUFBZSx1QkFBWTtBQUMzQjtBQUNBLGtCQUFrQiwwQkFBMEI7QUFDNUMsT0FBTztBQUNQLDRCQUE0Qix3QkFBYTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLDhCQUE4QixzQkFBVztBQUN6QyxlQUFlLHVCQUFZO0FBQzNCLGtCQUFrQiwwQkFBMEI7QUFDNUMsT0FBTztBQUNQLGlCQUFpQix3QkFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLDhCQUE4QixzQkFBVztBQUN6QyxlQUFlLHVCQUFZO0FBQzNCLGtCQUFrQiwwQkFBMEI7QUFDNUMsT0FBTztBQUNQLDRCQUE0Qix3QkFBYTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEseUNBQXlDLHNCQUFXO0FBQ3BEO0FBQ0EsNEJBQTRCLHNCQUFXOztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDOztBQUVBO0FBQ0EsV0FBVyxzQkFBTztBQUNsQixxQ0FBcUMsc0JBQVc7QUFDaEQ7O0FBRUEsOEJBQThCLHdCQUFhO0FBQzNDO0FBQ0EsaURBQWlELGVBQUksVUFBVSxlQUFJO0FBQ25FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQSx3REFBd0Q7QUFDeEQsOENBQThDLHNCQUFzQjtBQUNwRTtBQUNBLGFBQWEsU0FBUyxnREFBZ0Q7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZELDhDQUE4QyxzQkFBc0I7QUFDcEU7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsNEJBQWE7QUFDdEI7QUFDQSxxRUFBZSx3QkFBd0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdHNDQztBQUNBO0FBQ047QUFDYztBQUNWO0FBQ1I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLHNEQUFVLFFBQVEsc0RBQVUsUUFBUSxzREFBVTtBQUNqRSxzREFBVSxPQUFPLHNEQUFVO0FBQzNCLHNEQUFVLE9BQU8sc0RBQVU7QUFDM0Isc0RBQVUsT0FBTyxzREFBVTs7QUFFM0IsK0JBQStCLHNEQUFVO0FBQ3pDLCtCQUErQixzREFBVTtBQUN6Qyx5QkFBeUIsaURBQUssS0FBSyxzREFBVTs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7O0FBRUEsT0FBTyx1REFBTztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLFlBQVk7QUFDOUI7O0FBRUE7QUFDQTs7QUFFQSxTQUFTLHVEQUFPO0FBQ2hCLHdDQUF3QyxzREFBVTtBQUNsRDtBQUNBLFNBQVMsdURBQU87QUFDaEIsNENBQTRDLHNEQUFVO0FBQ3REOztBQUVBLElBQUksc0RBQVU7QUFDZCxJQUFJLHNEQUFVOztBQUVkO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzREFBVTs7QUFFMUIsSUFBSSxzREFBVTtBQUNkLElBQUksc0RBQVU7O0FBRWQ7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFVO0FBQzFCLE1BQU0sc0RBQVU7QUFDaEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsY0FBYywwREFBYztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBLE1BQU0saURBQUs7QUFDWDtBQUNBLG1CQUFtQixxREFBUztBQUM1QixhQUFhLHFEQUFTO0FBQ3RCLE1BQU0sb0JBQW9CLHFEQUFTO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IscURBQVMsZ0JBQWdCLHFEQUFTO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsY0FBYywwREFBYztBQUM1QjtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxpREFBSztBQUNYO0FBQ0EsbUJBQW1CLHFEQUFTO0FBQzVCO0FBQ0EsTUFBTSxvQkFBb0IscURBQVM7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsbURBQW1EO0FBQ25GO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLDZEQUE2RDtBQUM3RjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyw2REFBNkQ7QUFDN0Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZORTtBQUNFO0FBQ0U7QUFDYztBQUNkO0FBQzBDOztBQUU3RTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrREFBTTs7QUFFN0IsK0JBQStCLHdFQUE0Qjs7QUFFM0Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLEVBQUUsaURBQUs7QUFDUCxFQUFFLGlEQUFLO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLEVBQUUsaURBQUs7QUFDUDs7QUFFQTs7QUFFQSxPQUFPLHVEQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUssdURBQU87QUFDWixLQUFLLHVEQUFPO0FBQ1osS0FBSyx1REFBTztBQUNaLEtBQUssdURBQU87QUFDWjtBQUNBLGNBQWMsMERBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwREFBYztBQUM5QjtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsWUFBWTtBQUN2QixhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxZQUFZO0FBQ3ZCLGFBQWEsWUFBWSxvREFBb0Qsa0JBQWtCO0FBQy9GO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0IsZUFBZSxnQkFBZ0I7QUFDL0IsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGdEQUFVO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0RBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOVZuQztBQUNBLHlFQUF5RSwwQkFBMEI7QUFDbkc7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELDBCQUEwQjtBQUN6RjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdFQUFnRSwwQkFBMEI7QUFDMUY7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSw2QkFBNkIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDakM3QztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSwwQkFBMEIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQm1CO0FBQ2Q7QUFDQTtBQUNBO0FBQ1Y7QUFDRTtBQUNFO0FBQ2M7QUFDb0I7QUFDbEM7QUFDWTtBQUNkO0FBQ1k7QUFDRjs7QUFFakQ7QUFDQTtBQUNBLHFFQUFxRSxtQ0FBbUM7QUFDeEc7QUFDQTtBQUNBLHlCQUF5QiwrQkFBK0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDBCQUEwQjtBQUNyRTtBQUNBLDRCQUE0Qix1Q0FBdUM7QUFDbkU7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CLGVBQWUsZ0JBQWdCO0FBQy9CLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSx1QkFBdUIsdURBQU07O0FBRTdCO0FBQ0E7QUFDQSxJQUFJLDREQUFPO0FBQ1g7QUFDQTtBQUNBLGNBQWMsK0RBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSw0REFBTztBQUNiO0FBQ0E7QUFDQSxnQkFBZ0IsK0RBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsK0RBQWE7QUFDMUM7QUFDQSxNQUFNLDREQUFPO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQiwrREFBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwrREFBYTtBQUNuQztBQUNBLE1BQU0sNERBQU87QUFDYjtBQUNBO0FBQ0EsZ0JBQWdCLCtEQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHlFQUF3QjtBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkRBQVUsMkJBQTJCLDJEQUFVO0FBQ2xFLHlCQUF5QiwyREFBVSx3QkFBd0I7QUFDM0QsZ0JBQWdCLHNEQUFLLHdCQUF3QixzREFBSztBQUNsRCx1QkFBdUIsc0RBQUssK0JBQStCLHNEQUFLO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQixtREFBbUQsMkRBQWM7QUFDakU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLDREQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyw0REFBTztBQUNsQixrQkFBa0IsK0RBQWM7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyw0REFBTztBQUNsQixrQkFBa0IsK0RBQWM7QUFDaEM7QUFDQTs7QUFFQTtBQUNBLFdBQVcsMkRBQVU7QUFDckIsUUFBUSwyREFBVTtBQUNsQixRQUFRLDJEQUFVOztBQUVsQjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLG1EQUFtRCwrQkFBK0I7QUFDbEYsTUFBTSw4QkFBOEI7QUFDcEMsdUJBQXVCLDBCQUEwQixLQUFLLHdCQUF3QjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsVUFBVSw0REFBTztBQUNqQixrQkFBa0IsK0RBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLCtEQUFhO0FBQ3hCLGdDQUFnQywrREFBYTtBQUM3QztBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLDBEQUEwRCwrQkFBK0I7QUFDekYsTUFBTSw4QkFBOEI7QUFDcEMsdUJBQXVCLDBCQUEwQixLQUFLLHdCQUF3QjtBQUM5RTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVUsNERBQU87QUFDakIsa0JBQWtCLCtEQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVywrREFBYTtBQUN4Qix1Q0FBdUMsK0RBQWE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyw0REFBTztBQUNsQixrQkFBa0IsK0RBQWM7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsNERBQU87QUFDbEIsa0JBQWtCLCtEQUFjO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHNEQUFLO0FBQ2hCLFFBQVEsc0RBQUs7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXLDREQUFPO0FBQ2xCLGtCQUFrQiwrREFBYztBQUNoQztBQUNBOztBQUVBO0FBQ0EsV0FBVyxzREFBSztBQUNoQixRQUFRLHNEQUFLO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXLDREQUFPO0FBQ2xCLGtCQUFrQiwrREFBYztBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVUsNERBQU87QUFDakIsa0JBQWtCLCtEQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLFNBQVMseUVBQXdCO0FBQ2pDO0FBQ0EseUNBQXlDLHlFQUF3QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFhLDREQUFPO0FBQ3BCLG9CQUFvQiwrREFBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsVUFBVSw0REFBTztBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0EsVUFBVSxzQkFBc0I7QUFDaEM7QUFDQSxZQUFZO0FBQ1osZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQSxPQUFPLDREQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDJEQUFVO0FBQ1o7QUFDQTs7QUFFQSwyQkFBMkIsMkRBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzREFBUztBQUNuQztBQUNBOztBQUVBLEVBQUUsd0RBQU87QUFDVCxTQUFTLDREQUFlO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4QiwyREFBVTs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix3REFBTztBQUMvQjtBQUNBLElBQUksMkRBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDREQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxZQUFZO0FBQ3ZCLGFBQWEsWUFBWTtBQUN6QjtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNERBQU87QUFDZCxpQkFBaUIsMkRBQVU7QUFDM0I7O0FBRUE7QUFDQSxPQUFPLDREQUFPO0FBQ2QsY0FBYywrREFBYztBQUM1QjtBQUNBLE9BQU8sNERBQU87QUFDZCxjQUFjLCtEQUFjO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLDREQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsWUFBWTtBQUN2QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLDREQUFPO0FBQ2QsaUJBQWlCLGtFQUFpQjtBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0IsYUFBYSxTQUFTLDJDQUEyQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssNERBQU87QUFDWjtBQUNBLE1BQU0sMkRBQVU7QUFDaEIsTUFBTSxzREFBSztBQUNYO0FBQ0E7QUFDQTtBQUNBLE1BQU0sc0RBQUs7QUFDWCxNQUFNLCtEQUFhO0FBQ25CLE1BQU0sK0RBQWE7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsTUFBTSx5RUFBd0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDanJCSztBQUNjOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVywwQkFBMEI7QUFDckMsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsY0FBYywwREFBYztBQUM1QjtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsV0FBVywwQkFBMEI7QUFDckMsYUFBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkLGNBQWMsMERBQWM7QUFDNUI7QUFDQTs7QUFFQTs7QUFFQSxPQUFPLHVEQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMEJBQTBCO0FBQ3JDLFdBQVcsMEJBQTBCO0FBQ3JDLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssdURBQU87QUFDWixNQUFNLHVEQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVywwQkFBMEI7QUFDckMsV0FBVywwQkFBMEI7QUFDckMsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZDtBQUNBOztBQUVBLE9BQU8sdURBQU87QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMEJBQTBCO0FBQ3JDLFlBQVksMEJBQTBCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMEJBQTBCO0FBQ3JDLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLHdCQUF3QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxS3hDO0FBQ0EsaURBQWUsd0JBQXdCO0FBQ3ZDLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsc0JBQXNCO0FBQ3RCLDJCQUEyQjtBQUMzQiwwQkFBMEI7QUFDMUIsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQiwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUMzQiwwQkFBMEI7QUFDMUIsb0NBQW9DO0FBQ3BDO0FBQ0EsZUFBZTtBQUNmLGtCQUFrQjtBQUNsQixxQkFBcUI7QUFDckIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsbURBQW1EO0FBQ25ELG9EQUFvRDtBQUNwRCx1REFBdUQ7QUFDdkQsMERBQTBEO0FBQzFEO0FBQ0Esb0VBQW9FO0FBQ3BFLHVDQUF1QztBQUN2QyxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLEtBQUs7QUFDTCxtQkFBbUI7QUFDbkIsS0FBSztBQUNMO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsS0FBSztBQUNMLDhFQUE4RTtBQUM5RSx5RkFBeUY7QUFDekYseUZBQXlGO0FBQ3pGLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCw4RUFBOEU7QUFDOUUseUZBQXlGO0FBQ3pGLHlGQUF5RjtBQUN6RixLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsb0ZBQW9GO0FBQ3BGLGdEQUFnRDtBQUNoRCw0Q0FBNEM7QUFDNUMsZ0dBQWdHO0FBQ2hHO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsU0FBUztBQUNULHlDQUF5QztBQUN6QyxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Qsb0ZBQW9GO0FBQ3BGLCtFQUErRTtBQUMvRSxTQUFTO0FBQ1Q7QUFDQSwrRUFBK0U7QUFDL0UsOEVBQThFO0FBQzlFO0FBQ0EsU0FBUztBQUNULHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLHdCQUF3QjtBQUN4Qiw0R0FBNEc7QUFDNUcsK0RBQStEO0FBQy9EO0FBQ0Esc0JBQXNCO0FBQ3RCLGdGQUFnRjtBQUNoRjtBQUNBLG9CQUFvQjtBQUNwQiw0QkFBNEI7QUFDNUIsb0NBQW9DO0FBQ3BDLENBQUM7QUFDRCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3hHbUU7QUFDZDtBQUNSO0FBQ1Y7QUFDRTtBQUNFO0FBQ2M7QUFDb0I7QUFDbEM7QUFDa0I7QUFDdEI7O0FBRXJDO0FBQ0E7QUFDQSwyQkFBMkIsNkJBQTZCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQixrQkFBa0IsU0FBUyxzRUFBc0U7QUFDakcsa0JBQWtCLFFBQVE7QUFDMUIsa0JBQWtCLFNBQVM7QUFDM0Isa0JBQWtCLFVBQVU7QUFDNUIsa0JBQWtCLGNBQWM7QUFDaEMsa0JBQWtCLFFBQVE7QUFDMUIsa0JBQWtCLDBCQUEwQjtBQUM1QyxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQU07O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTyxzQkFBTztBQUNkLHFCQUFxQixtQkFBUSxVQUFVLG1CQUFRO0FBQy9DLGlCQUFpQixnQkFBSztBQUN0QixLQUFLO0FBQ0w7O0FBRUE7QUFDQSxPQUFPLHNCQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixvQ0FBcUI7QUFDL0M7QUFDQSxJQUFJLHFCQUFVO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IscUJBQVU7QUFDekM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU0sc0JBQU87QUFDYixrQkFBa0Isa0JBQU87QUFDekI7O0FBRUE7QUFDQSxtQkFBbUIsMkJBQWdCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHlCQUFjO0FBQ3ZDLDJCQUEyQix5QkFBYztBQUN6QztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IseUJBQWMsSUFBSTtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHNCQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyxzQkFBTztBQUNsQixrQkFBa0IseUJBQWM7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyxzQkFBTztBQUNsQixrQkFBa0IseUJBQWM7QUFDaEM7QUFDQTs7QUFFQSxzQkFBc0Isb0NBQXFCLFFBQVEscUJBQVU7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFVO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIseUJBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHlCQUFjO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBLGdHQUFnRyxnQkFBZ0I7QUFDaEgsTUFBTSw0REFBNEQ7QUFDbEU7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsc0JBQU87QUFDbEIsa0JBQWtCLHlCQUFjO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsc0JBQU87QUFDbEIsa0JBQWtCLHlCQUFjO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyxzQkFBTztBQUNsQixrQkFBa0IseUJBQWM7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxxQkFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxQkFBVTtBQUNyQztBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVUscUJBQVU7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVUsc0JBQU87QUFDakI7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxzQkFBTztBQUNyQixLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsVUFBVSxzQkFBTztBQUNqQixrQkFBa0IseUJBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsbUNBQXdCO0FBQ2pDO0FBQ0EseUNBQXlDLG1DQUF3QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFPO0FBQzNCLE1BQU0sc0JBQU87QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxrQkFBTztBQUNkLHFCQUFxQiwyQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHlCQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLGtCQUFPOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxzQkFBTztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQWUsUUFBUSxFQUFDOzs7OztBQzlhK0I7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNkO0FBQ0k7QUFDb0I7QUFDdEI7QUFDRTtBQUNZO0FBQ0U7QUFDTTtBQUNGO0FBQ047QUFDUjtBQUNKO0FBQ0E7QUFDSjtBQUNjO0FBQ1I7QUFDVTtBQUNJO0FBQ0o7QUFDZDtBQUNjO0FBQ0k7QUFDRjtBQUNWO0FBQ1E7QUFDSztBQUNSO0FBQ0E7QUFDVDtBQUNNO0FBQ1Y7QUFDQTtBQUNFOztBQUV2QyxNQUFNLDZCQUFVLEdBQUcsY0FBUTtBQUMzQixNQUFNLDhCQUFXLEdBQUcsY0FBUTtBQUM1QixNQUFNLGlDQUFjLEdBQUcsY0FBUTtBQUMvQixNQUFNLGlDQUFjLEdBQUcsY0FBUTtBQUMvQjtBQUNBO0FBQ0EsTUFBTSxzQ0FBbUIsR0FBRyxjQUFRO0FBQ3BDLE1BQU0sNkNBQTBCLEdBQUcsY0FBUTtBQUMzQyxNQUFNLHVDQUFvQixHQUFHLGNBQVE7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlELFFBQVEsZ0NBQWdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQU07O0FBRTdCO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHlDQUF5QztBQUNsRDtBQUNBLFlBQVk7QUFDWixlQUFlO0FBQ2Y7QUFDQSxxQkFBcUIsa0JBQU8sOEJBQThCLGtCQUFPO0FBQ2pFLHNCQUFzQixrQkFBTyxPQUFPLGtCQUFPOztBQUUzQztBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1Q0FBb0I7QUFDaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFXO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFLLE9BQU8sZ0JBQUs7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSw4QkFBOEI7QUFDcEM7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0EscURBQXFELGlDQUFpQztBQUN0RjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixjQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxTQUFTLCtDQUErQztBQUNyRTtBQUNBLG9EQUFvRCxpQ0FBaUM7QUFDckY7QUFDQTtBQUNBO0FBQ0EsSUFBSSxxQkFBcUI7QUFDekI7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzQkFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxzQkFBTztBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaUNBQWlDO0FBQ3JDO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJLGlDQUFpQztBQUNyQztBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxzQkFBTztBQUNkLGNBQWMseUJBQWM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLHNCQUFPO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsNEJBQWlCO0FBQzFDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx5QkFBeUIsNEJBQWlCO0FBQzFDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHlCQUF5Qiw0QkFBaUI7QUFDMUM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHlCQUF5Qiw0QkFBaUI7QUFDMUM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHlCQUF5Qiw0QkFBaUI7QUFDMUM7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsK0JBQStCLHFCQUFVO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELDRCQUFpQjtBQUNuRSw0Q0FBNEMscUJBQVU7QUFDdEQscUNBQXFDLHFCQUFVOztBQUUvQztBQUNBLGdCQUFnQixjQUFjLElBQUksb0JBQW9CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx3QkFBYTtBQUNyQixnQkFBZ0IsdUJBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLHVCQUF1QixvQkFBUztBQUNoQztBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixzQ0FBbUIsZ0JBQWdCLGlDQUFjO0FBQ3BFO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpQ0FBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDZCQUFVLGdCQUFnQiw4QkFBVztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IscUJBQVU7QUFDMUI7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixpQ0FBYyxnQkFBZ0Isc0NBQW1CO0FBQzFFO0FBQ0Esa0NBQWtDLG9CQUFTO0FBQzNDO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQWlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsNkNBQTBCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixzQkFBTztBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLElBQUksdUNBQW9CLEVBQUU7QUFDNUM7QUFDQTs7QUFFQSxvQkFBb0Isa0JBQU87QUFDM0IsMEJBQTBCLG9CQUFTO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUssc0JBQU87QUFDWjtBQUNBO0FBQ0EscUJBQXFCLHNCQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxLQUFLLHNCQUFPO0FBQ1o7QUFDQTtBQUNBLDBCQUEwQixzQkFBVztBQUNyQyxnQkFBZ0Isd0JBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQyx5QkFBYztBQUNoRCxtQ0FBbUMseUJBQWM7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isa0JBQWtCO0FBQ3RDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLG9CQUFvQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxjQUFjLHNCQUFPO0FBQ3JCOztBQUVBO0FBQ0EsNEJBQTRCLHNCQUFXO0FBQ3ZDO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7O0FBRUEseUJBQXlCLHNCQUFPO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMseUJBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGVBQUksZUFBZSxlQUFJO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0Msb0JBQVM7QUFDekM7QUFDQSxVQUFVLDZCQUE2QixvQkFBUztBQUNoRDtBQUNBLFVBQVUsNkJBQTZCLG9CQUFTO0FBQ2hELGNBQWMsc0JBQU87QUFDckIsNkJBQTZCLHlCQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsVUFBVSxzQkFBTztBQUNqQixVQUFVLHNCQUFPO0FBQ2pCO0FBQ0EsMkJBQTJCLHlCQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUseUJBQWM7QUFDeEIsVUFBVTtBQUNWLFVBQVUseUJBQWM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVUsc0JBQU87QUFDakI7QUFDQSx3QkFBd0Isc0JBQVc7QUFDbkM7QUFDQSxXQUFXO0FBQ1g7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsc0JBQU87QUFDNUI7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyx5QkFBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZUFBSTtBQUNoQixZQUFZLGVBQUk7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBLHdEQUF3RDtBQUN4RCw4Q0FBOEMsc0JBQXNCO0FBQ3BFO0FBQ0EsYUFBYSxTQUFTLGdEQUFnRDtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQsOENBQThDLHNCQUFzQjtBQUNwRTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw0QkFBYTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQ0FBYztBQUMvQixvQ0FBb0Msc0JBQVc7QUFDL0M7QUFDQSxnQ0FBZ0Msc0JBQVc7QUFDM0M7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUkscUNBQXFDLHNCQUFXO0FBQ3BEO0FBQ0E7QUFDQSxnQ0FBZ0Msc0JBQVc7QUFDM0MsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixvQkFBUztBQUM5QixlQUFlLHNCQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxzQkFBVzs7QUFFOUQsaUNBQWlDLGlCQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFFBQVEsc0JBQU87QUFDZix5QkFBeUIsaUJBQU07QUFDL0I7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0Esb0RBQW9ELGlCQUFNO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQU07QUFDbEM7QUFDQTtBQUNBLGlCQUFpQixzQkFBVztBQUM1Qix5QkFBeUIsd0JBQWE7QUFDdEMsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLG9CQUFVO0FBQ2hELHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxvQkFBVTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0QkFBaUI7QUFDaEQ7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNEJBQWlCO0FBQ2hEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUFpQjtBQUNoRDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0QkFBaUI7QUFDaEQ7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNEJBQWlCO0FBQ2hEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUFpQjtBQUNoRDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0QkFBaUI7QUFDaEQ7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNEJBQWlCO0FBQ2hEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUFpQjtBQUNoRDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0QkFBaUI7QUFDaEQ7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNEJBQWlCO0FBQ2hEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUFpQjtBQUNoRDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw0QkFBaUI7QUFDaEQ7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0JBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsbUJBQW1CLG9CQUFTO0FBQzVCLG1CQUFtQixvQkFBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixzQkFBVztBQUNsQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGtCQUFPO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFRO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVksY0FBYyxHQUFHLDhDQUE4QztBQUMzRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzQkFBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLGtCQUFPO0FBQ1o7QUFDQTtBQUNBLDhCQUE4QixrQkFBTztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0EsVUFBVSxzQkFBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHNCQUFPO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLDJCQUFnQjtBQUN2QjtBQUNBOztBQUVBLGlCQUFpQix1QkFBWTtBQUM3QjtBQUNBLG1DQUFtQyxpQ0FBaUMscUJBQVU7QUFDOUUsR0FBRzs7QUFFSCx3REFBd0QsVUFBVTtBQUNsRSxpQkFBaUIsdUJBQVk7QUFDN0I7QUFDQSxjQUFjLHlCQUFjO0FBQzVCLEdBQUc7O0FBRUgsdUJBQXVCLHdCQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHFCQUFVLEtBQUsscUJBQVU7QUFDN0IsNENBQTRDLGdCQUFLO0FBQ2pELE1BQU0sb0JBQVM7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0Isb0JBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQ0FBaUMscUJBQVU7QUFDM0MscUNBQXFDLHFCQUFVO0FBQy9DLHFDQUFxQyxxQkFBVTtBQUMvQywrQkFBK0IscUJBQVU7QUFDekMsc0NBQXNDLHFCQUFVO0FBQ2hELHNDQUFzQyxxQkFBVTs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxvQkFBVTs7QUFFaEU7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVSxxQkFBVTtBQUNwQixVQUFVLHFCQUFVO0FBQ3BCO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUEsTUFBTSxxQkFBVTtBQUNoQixNQUFNLHFCQUFVOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVLHFCQUFVO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxQkFBVTtBQUNwQjtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLE1BQU0scUJBQVU7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFTLHFCQUFxQixvQkFBUztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFCQUFVO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFCQUFVO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixVQUFVO0FBQ3JDLFFBQVEsNEJBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0QkFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRCQUFpQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGdCQUFLO0FBQzVCLHVCQUF1QixnQkFBSztBQUM1Qix1QkFBdUIsZ0JBQUs7QUFDNUIsdUJBQXVCLGdCQUFLOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG9CQUFTO0FBQ3hCO0FBQ0E7QUFDQSwwQkFBMEIsNEJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFCQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHNCQUFPO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHFCQUFVO0FBQzNDLHFDQUFxQyxxQkFBVTtBQUMvQyxxQ0FBcUMscUJBQVU7QUFDL0MsK0JBQStCLHFCQUFVOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVUscUJBQVU7QUFDcEIsVUFBVSxxQkFBVTtBQUNwQjtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLHFCQUFxQixrQkFBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsa0JBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVLHFCQUFVO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxQkFBVTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUEscUJBQXFCLGtCQUFPO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixVQUFVO0FBQ3JDLFFBQVEsNEJBQWlCO0FBQ3pCLFFBQVEsNEJBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0QkFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixvQkFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0MsaUNBQWlDLG9CQUFVO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVAsNkJBQTZCLG9CQUFVO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFVO0FBQy9CLGdDQUFnQyx1QkFBWTs7QUFFNUM7QUFDQTs7QUFFQSxvQkFBb0Isb0JBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0EsUUFBUSxrQkFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyx5QkFBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxxQkFBVTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELG9CQUFVOztBQUVoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE9BQU8sc0JBQU87QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVUscUJBQVU7QUFDcEIsVUFBVSxxQkFBVTtBQUNwQjtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLE1BQU0scUJBQVU7QUFDaEIsTUFBTSxxQkFBVTs7QUFFaEI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVSxxQkFBVTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUscUJBQVU7QUFDcEI7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQSxNQUFNLHFCQUFVOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBUyxxQkFBcUIsb0JBQVM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxQkFBVTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxQkFBVTtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsVUFBVTtBQUNyQyxRQUFRLDRCQUFpQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNEJBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0QkFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQWUsa0JBQWtCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNzVETztBQUNBO0FBQ007QUFDZDtBQUNFO0FBQ2M7QUFDZDtBQUNBOztBQUVuQztBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0RBQU07O0FBRTdCO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qix5REFBYTtBQUN6QyxpQ0FBaUMsbURBQU87QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSyx1REFBTztBQUNaLEtBQUssdURBQU87QUFDWixLQUFLLHVEQUFPO0FBQ1osS0FBSyx1REFBTztBQUNaLEtBQUssdURBQU87QUFDWixLQUFLLHVEQUFPO0FBQ1o7QUFDQSxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFjO0FBQzlCO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQWM7QUFDOUI7QUFDQTtBQUNBLGdCQUFnQiwwREFBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsbURBQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVELDJCQUEyQixzREFBVTtBQUNyQyxnQ0FBZ0Msc0RBQVU7QUFDMUMsMkJBQTJCLHNEQUFVO0FBQ3JDLDBCQUEwQixzREFBVTs7QUFFcEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsWUFBWTtBQUN2QixXQUFXLFlBQVk7QUFDdkIsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0EsT0FBTyx1REFBTztBQUNkLGNBQWMsMERBQWM7QUFDNUI7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsY0FBYywwREFBYztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixzREFBVTtBQUMxQixFQUFFLHNEQUFVO0FBQ1o7QUFDQSxFQUFFLHNEQUFVO0FBQ1osRUFBRSxzREFBVTs7QUFFWjs7QUFFQTtBQUNBLEVBQUUsc0RBQVU7QUFDWixFQUFFLHNEQUFVOztBQUVaO0FBQ0EsT0FBTyx1REFBTztBQUNkLDRCQUE0QixzREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0RBQVU7O0FBRXZCO0FBQ0EsRUFBRSxzREFBVTtBQUNaLEVBQUUsc0RBQVU7O0FBRVo7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsNEJBQTRCLHNEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzREFBVSxLQUFLLHNEQUFVOztBQUV0QztBQUNBLEVBQUUsc0RBQVU7QUFDWixFQUFFLHNEQUFVOztBQUVaO0FBQ0EsT0FBTyx1REFBTztBQUNkLDRCQUE0QixzREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0RBQVU7O0FBRXZCO0FBQ0EsRUFBRSxzREFBVTtBQUNaLEVBQUUsc0RBQVU7O0FBRVo7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsNEJBQTRCLHNEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzREFBVSxLQUFLLHNEQUFVOztBQUV0QztBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkLDRCQUE0QixzREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0RBQVU7O0FBRXZCO0FBQ0EsRUFBRSxzREFBVTtBQUNaLEVBQUUsc0RBQVU7O0FBRVo7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsNEJBQTRCLHNEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzREFBVSxLQUFLLHNEQUFVOztBQUV0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFlBQVk7QUFDdkIsYUFBYSxZQUFZLG9EQUFvRCxrQkFBa0I7QUFDL0Y7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQixlQUFlLGdCQUFnQjtBQUMvQixlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTyx1REFBTyx5QkFBeUIsdURBQU87QUFDOUMsY0FBYywwREFBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsMERBQWM7QUFDNUI7QUFDQTtBQUNBLGNBQWMsMERBQWM7QUFDNUI7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsY0FBYywwREFBYztBQUM1QjtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7QUFDQSxjQUFjLDBEQUFjO0FBQzVCO0FBQ0EsT0FBTyx1REFBTztBQUNkLGNBQWMsMERBQWM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhCQUE4QjtBQUN6QyxhQUFhLDhCQUE4QjtBQUMzQztBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhCQUE4QjtBQUN6QyxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw4QkFBOEI7QUFDekMsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssdURBQU87QUFDWjtBQUNBLE1BQU0sZ0RBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZ0RBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZ0RBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZ0RBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZ0RBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZ0RBQVU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSw0QkFBNEIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Y0g7QUFDSTtBQUNWO0FBQ2M7QUFDVjtBQUNnQjtBQUNFO0FBQ0Y7QUFDcEI7QUFDQTtBQUNKOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixzREFBVTtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLHdEQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDLG1EQUFPO0FBQzdDLGdDQUFnQyxzREFBVTtBQUMxQyxrQ0FBa0Msc0RBQVU7QUFDNUMsaUNBQWlDLGtEQUFLLENBQUMsc0RBQVU7QUFDakQsa0NBQWtDLHNEQUFVO0FBQzVDLGlDQUFpQyxrREFBSyxDQUFDLHNEQUFVO0FBQ2pELHNDQUFzQyxzREFBVTtBQUNoRCxnQ0FBZ0Msc0RBQVU7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLGVBQWU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLGVBQWU7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLHdEQUFZO0FBQy9CLG1CQUFtQix3REFBWTtBQUMvQixzQkFBc0Isc0RBQVU7QUFDaEMsdUJBQXVCLHNEQUFVO0FBQ2pDLHNCQUFzQixzREFBVTtBQUNoQyw4QkFBOEIsNkRBQWlCO0FBQy9DLHlCQUF5Qiw4REFBa0I7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHNEQUFVO0FBQ1o7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBVTtBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLDhEQUFrQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHNEQUFVO0FBQ1o7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBVTtBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWEsZ0JBQWdCLHNEQUFzRDtBQUNuRjtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSx1REFBTztBQUNiLGlDQUFpQyxtREFBTztBQUN4QywrQkFBK0IsbURBQU87QUFDdEM7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixtREFBTztBQUMxQjtBQUNBLE1BQU0sc0RBQVU7QUFDaEI7QUFDQTtBQUNBLHFCQUFxQixzREFBVTtBQUMvQixNQUFNLG1EQUFPO0FBQ2I7QUFDQSxRQUFRLHNEQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtEQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNEQUFVO0FBQy9CLE1BQU0sbURBQU87QUFDYjtBQUNBLFFBQVEsc0RBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0RBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isc0RBQVU7QUFDOUI7O0FBRUE7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQzs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxrREFBSztBQUNiLFFBQVEsa0RBQUs7QUFDYjtBQUNBO0FBQ0EsNkJBQTZCLDZEQUFpQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1REFBTztBQUNuQjtBQUNBLHlCQUF5QixzREFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsa0RBQUs7QUFDbkIsWUFBWSxzREFBVTtBQUN0Qjs7QUFFQTtBQUNBLFlBQVksc0RBQVUsK0JBQStCLHNEQUFVO0FBQy9EO0FBQ0E7O0FBRUEsVUFBVSxzREFBVTtBQUNwQjtBQUNBLFlBQVksc0RBQVUsK0JBQStCLHNEQUFVO0FBQy9EO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixzREFBVTtBQUNoQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsY0FBYyxxQ0FBcUMsWUFBWTtBQUMxRSxXQUFXLGlCQUFpQjtBQUM1QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxXQUFXO0FBQ3RCLGFBQWEsVUFBVSxrQ0FBa0MsUUFBUTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkLGNBQWMsMERBQWM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QyxnRUFBaUI7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxzREFBVTtBQUNoQixNQUFNLHNEQUFVO0FBQ2hCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsK0NBQStDLGdEQUFVO0FBQ3pELGtCQUFrQixnREFBVTtBQUM1Qjs7QUFFQTtBQUNBOztBQUVBLGNBQWMsZ0JBQWdCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHNEQUFVOztBQUVaO0FBQ0E7O0FBRUEsaUNBQWlDLHdEQUFZO0FBQzdDLGlDQUFpQyx3REFBWTs7QUFFN0M7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLGNBQWMscUNBQXFDLFlBQVk7QUFDMUUsV0FBVyxpQkFBaUI7QUFDNUIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsV0FBVztBQUN0QixhQUFhLFVBQVUsa0NBQWtDLFFBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsZ0VBQWlCO0FBQzFEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sc0RBQVU7QUFDaEIsTUFBTSxzREFBVTtBQUNoQjs7QUFFQTtBQUNBOztBQUVBLDZDQUE2QyxnREFBVTs7QUFFdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0RBQVk7QUFDckI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGNBQWMsZ0JBQWdCO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxzREFBVTs7QUFFWjtBQUNBOztBQUVBO0FBQ0EsK0ZBQStGLFlBQVk7QUFDM0csV0FBVyxRQUFRO0FBQ25CLFdBQVcsY0FBYyxxQ0FBcUMsWUFBWTtBQUMxRSxXQUFXLGlCQUFpQjtBQUM1QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxXQUFXO0FBQ3RCLGFBQWEsY0FBYztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUIsc0JBQXNCLHNEQUFVO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlIQUFpSCxZQUFZO0FBQzdILFdBQVcsUUFBUTtBQUNuQixXQUFXLGNBQWMscUNBQXFDLFlBQVk7QUFDMUUsV0FBVyxpQkFBaUI7QUFDNUIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsV0FBVztBQUN0QixhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCLHNCQUFzQixzREFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxpRUFBZSxnQkFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVqQjZCO0FBQ2Q7QUFDQTtBQUNBO0FBQ0k7QUFDVjtBQUNjO0FBQ2Q7QUFDQTtBQUN3QjtBQUNrQjtBQUNwQztBQUNSOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLDJEQUFVO0FBQzVDLHFCQUFxQiwyREFBVTtBQUMvQiw0QkFBNEIsa0VBQWlCOztBQUU3QyxnQ0FBZ0MsMkRBQVU7QUFDMUMsZ0NBQWdDLDJEQUFVOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFlBQVk7QUFDdkIsV0FBVyxZQUFZO0FBQ3ZCLGFBQWEsc0JBQXNCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJEQUFVO0FBQ2Q7QUFDQTtBQUNBOztBQUVBLDhCQUE4QiwyREFBVTtBQUN4Qyw2QkFBNkIsMkRBQVU7O0FBRXZDO0FBQ0E7O0FBRUEscUJBQXFCLHdEQUFPO0FBQzVCO0FBQ0EsSUFBSSwyREFBVTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLDJEQUFVO0FBQy9CO0FBQ0EsSUFBSSwyREFBVTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyx3REFBTztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQyw2REFBWTtBQUMvQztBQUNBLEVBQUUscURBQVU7QUFDWjtBQUNBLHNDQUFzQywyREFBVTtBQUNoRCxrQ0FBa0MsMkRBQVU7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0REFBTztBQUNkLGNBQWMsK0RBQWM7QUFDNUI7QUFDQSxPQUFPLDREQUFPO0FBQ2QsY0FBYywrREFBYztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sNERBQU87QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEJBQTBCLHNEQUFTO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsMkRBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLHdEQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLFVBQVUsd0RBQU87QUFDakI7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQiwyREFBVTtBQUMvQixNQUFNLHFEQUFVO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw0REFBVTtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSwyREFBVTtBQUNoQjs7QUFFQSxlQUFlLDJEQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLHNEQUFTO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9FQUFtQjtBQUNyRCxrQ0FBa0MsOEVBQTRCO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsWUFBWTtBQUN2QixXQUFXLFlBQVk7QUFDdkIsYUFBYSxzQkFBc0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLDREQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhCQUE4QiwyREFBVTtBQUN4QyxtQ0FBbUMsNkRBQVk7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLHNEQUFTO0FBQ3hCLFdBQVcsMkRBQVU7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNERBQU87QUFDZDtBQUNBOztBQUVBOztBQUVBLGVBQWUsc0RBQVM7QUFDeEIsV0FBVywyREFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxzREFBUztBQUN4QixXQUFXLDJEQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUywyREFBVTtBQUNuQixJQUFJLHFEQUFVO0FBQ2QsSUFBSSxxREFBVTtBQUNkLElBQUkscURBQVU7QUFDZDtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLDJEQUFVO0FBQ2xDLHVCQUF1QiwyREFBVTtBQUNqQyw4QkFBOEIsd0RBQU87O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkRBQVU7O0FBRVo7QUFDQSxFQUFFLHdEQUFPO0FBQ1QsRUFBRSx3REFBTzs7QUFFVCxTQUFTLDJEQUFVO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDJEQUFVO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJEQUFVO0FBQ2pDLCtCQUErQiwyREFBVTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYywyREFBVSxPQUFPLDJEQUFVO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU8sNERBQU87QUFDZDtBQUNBLFFBQVEsNERBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQix3REFBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixrQkFBa0Isd0RBQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksMkRBQVU7QUFDZDtBQUNBLFNBQVMsMkRBQVU7QUFDbkI7QUFDQSxpRUFBZSxlQUFlLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOWNJO0FBQ2M7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQSxPQUFPLHVEQUFPO0FBQ2Q7QUFDQTs7QUFFQSxPQUFPLHVEQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxPQUFPLHVEQUFPO0FBQ2QsY0FBYywwREFBYztBQUM1QjtBQUNBLE9BQU8sdURBQU87QUFDZCxjQUFjLDBEQUFjO0FBQzVCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsZUFBZTtBQUMxQixhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1REFBTztBQUNkLGNBQWMsMERBQWM7QUFDNUI7QUFDQTs7QUFFQTs7QUFFQSxPQUFPLHVEQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxTQUFTLCtDQUErQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssdURBQU87QUFDWixNQUFNLHVEQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsYUFBYSxTQUFTLCtDQUErQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGFBQWEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUtRO0FBQ3dCO0FBQ3BCO0FBQ1k7QUFDRTtBQUNkO0FBQ1I7QUFDVTtBQUNBOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxzREFBSztBQUNQO0FBQ0EsY0FBYywrREFBYztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTLDREQUFPO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sa0VBQWlCO0FBQ3ZCLE1BQU0sa0VBQWlCO0FBQ3ZCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsdUJBQXVCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGtFQUFpQjtBQUN6RTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHVEQUFXO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0RBQWM7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxrRUFBaUI7QUFDMUIsZ0JBQWdCLCtEQUFjO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLHVEQUFXO0FBQ3BCLGdCQUFnQiwrREFBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtEQUFjO0FBQzlCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsTUFBTSxrRUFBaUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBLFFBQVEsa0VBQWlCO0FBQ3pCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsa0VBQWlCOztBQUU3QztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLE1BQU0sa0VBQWlCO0FBQ3ZCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJDQUEyQyxTQUFTO0FBQ3BEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLDREQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtCQUFrQjtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQSxrQkFBa0Isa0VBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUEwQyxZQUFZO0FBQ3REO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNERBQU87QUFDNUI7QUFDQTs7QUFFQSxzQkFBc0IscURBQVUsMkJBQTJCO0FBQzNEO0FBQ0EsTUFBTSw0REFBTztBQUNiO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0EsOENBQThDLFlBQVk7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCLHVEQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw0REFBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrREFBTTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsK0RBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLCtEQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPLDREQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTLGtFQUFhO0FBQ3RCO0FBQ0EsaUVBQWUsaUJBQWlCLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL0BjZXNpdW0vZW5naW5lL1NvdXJjZS9TaGFkZXJzL1BvaW50UHJpbWl0aXZlQ29sbGVjdGlvbkZTLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvQGNlc2l1bS9lbmdpbmUvU291cmNlL1NoYWRlcnMvUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uVlMuanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvU2NlbmUvUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvQGNlc2l1bS9lbmdpbmUvU291cmNlL0NvcmUvQ3VsbGluZ1ZvbHVtZS5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL0BjZXNpdW0vZW5naW5lL1NvdXJjZS9Db3JlL09ydGhvZ3JhcGhpY0ZydXN0dW0uanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvU2NlbmUvU3BsaXREaXJlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvU2NlbmUvQmxlbmRPcHRpb24uanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvU2NlbmUvUG9pbnRQcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvQ29yZS9EaXN0YW5jZURpc3BsYXlDb25kaXRpb24uanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvU2hhZGVycy9Qb2x5bGluZVZTLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvQGNlc2l1bS9lbmdpbmUvU291cmNlL1NjZW5lL1BvbHlsaW5lLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvQGNlc2l1bS9lbmdpbmUvU291cmNlL1NjZW5lL1BvbHlsaW5lQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL0BjZXNpdW0vZW5naW5lL1NvdXJjZS9Db3JlL09ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0uanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvQ29yZS9Qb2x5bGluZVBpcGVsaW5lLmpzIiwid2VicGFjazovL2FyY2hlc19zbG9jYWwvLi9ub2RlX21vZHVsZXMvQGNlc2l1bS9lbmdpbmUvU291cmNlL1NjZW5lL1NjZW5lVHJhbnNmb3Jtcy5qcyIsIndlYnBhY2s6Ly9hcmNoZXNfc2xvY2FsLy4vbm9kZV9tb2R1bGVzL0BjZXNpdW0vZW5naW5lL1NvdXJjZS9Db3JlL05lYXJGYXJTY2FsYXIuanMiLCJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uL25vZGVfbW9kdWxlcy9AY2VzaXVtL2VuZ2luZS9Tb3VyY2UvUmVuZGVyZXIvVmVydGV4QXJyYXlGYWNhZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9UaGlzIGZpbGUgaXMgYXV0b21hdGljYWxseSByZWJ1aWx0IGJ5IHRoZSBDZXNpdW0gYnVpbGQgcHJvY2Vzcy5cbmV4cG9ydCBkZWZhdWx0IFwiaW4gdmVjNCB2X2NvbG9yO1xcblxcXG5pbiB2ZWM0IHZfb3V0bGluZUNvbG9yO1xcblxcXG5pbiBmbG9hdCB2X2lubmVyUGVyY2VudDtcXG5cXFxuaW4gZmxvYXQgdl9waXhlbERpc3RhbmNlO1xcblxcXG5pbiB2ZWM0IHZfcGlja0NvbG9yO1xcblxcXG5pbiBmbG9hdCB2X3NwbGl0RGlyZWN0aW9uO1xcblxcXG5cXG5cXFxudm9pZCBtYWluKClcXG5cXFxue1xcblxcXG4gICAgaWYgKHZfc3BsaXREaXJlY3Rpb24gPCAwLjAgJiYgZ2xfRnJhZ0Nvb3JkLnggPiBjem1fc3BsaXRQb3NpdGlvbikgZGlzY2FyZDtcXG5cXFxuICAgIGlmICh2X3NwbGl0RGlyZWN0aW9uID4gMC4wICYmIGdsX0ZyYWdDb29yZC54IDwgY3ptX3NwbGl0UG9zaXRpb24pIGRpc2NhcmQ7XFxuXFxcblxcblxcXG4gICAgLy8gVGhlIGRpc3RhbmNlIGluIFVWIHNwYWNlIGZyb20gdGhpcyBmcmFnbWVudCB0byB0aGUgY2VudGVyIG9mIHRoZSBwb2ludCwgYXQgbW9zdCAwLjUuXFxuXFxcbiAgICBmbG9hdCBkaXN0YW5jZVRvQ2VudGVyID0gbGVuZ3RoKGdsX1BvaW50Q29vcmQgLSB2ZWMyKDAuNSkpO1xcblxcXG4gICAgLy8gVGhlIG1heCBkaXN0YW5jZSBzdG9wcyBvbmUgcGl4ZWwgc2h5IG9mIHRoZSBlZGdlIHRvIGxlYXZlIHNwYWNlIGZvciBhbnRpLWFsaWFzaW5nLlxcblxcXG4gICAgZmxvYXQgbWF4RGlzdGFuY2UgPSBtYXgoMC4wLCAwLjUgLSB2X3BpeGVsRGlzdGFuY2UpO1xcblxcXG4gICAgZmxvYXQgd2hvbGVBbHBoYSA9IDEuMCAtIHNtb290aHN0ZXAobWF4RGlzdGFuY2UsIDAuNSwgZGlzdGFuY2VUb0NlbnRlcik7XFxuXFxcbiAgICBmbG9hdCBpbm5lckFscGhhID0gMS4wIC0gc21vb3Roc3RlcChtYXhEaXN0YW5jZSAqIHZfaW5uZXJQZXJjZW50LCAwLjUgKiB2X2lubmVyUGVyY2VudCwgZGlzdGFuY2VUb0NlbnRlcik7XFxuXFxcblxcblxcXG4gICAgdmVjNCBjb2xvciA9IG1peCh2X291dGxpbmVDb2xvciwgdl9jb2xvciwgaW5uZXJBbHBoYSk7XFxuXFxcbiAgICBjb2xvci5hICo9IHdob2xlQWxwaGE7XFxuXFxcblxcblxcXG4vLyBGdWxseSB0cmFuc3BhcmVudCBwYXJ0cyBvZiB0aGUgYmlsbGJvYXJkIGFyZSBub3QgcGlja2FibGUuXFxuXFxcbiNpZiAhZGVmaW5lZChPUEFRVUUpICYmICFkZWZpbmVkKFRSQU5TTFVDRU5UKVxcblxcXG4gICAgaWYgKGNvbG9yLmEgPCAwLjAwNSkgICAvLyBtYXRjaGVzIDAvMjU1IGFuZCAxLzI1NVxcblxcXG4gICAge1xcblxcXG4gICAgICAgIGRpc2NhcmQ7XFxuXFxcbiAgICB9XFxuXFxcbiNlbHNlXFxuXFxcbi8vIFRoZSBiaWxsYm9hcmQgaXMgcmVuZGVyZWQgdHdpY2UuIFRoZSBvcGFxdWUgcGFzcyBkaXNjYXJkcyB0cmFuc2x1Y2VudCBmcmFnbWVudHNcXG5cXFxuLy8gYW5kIHRoZSB0cmFuc2x1Y2VudCBwYXNzIGRpc2NhcmRzIG9wYXF1ZSBmcmFnbWVudHMuXFxuXFxcbiNpZmRlZiBPUEFRVUVcXG5cXFxuICAgIGlmIChjb2xvci5hIDwgMC45OTUpICAgLy8gbWF0Y2hlcyA8IDI1NC8yNTVcXG5cXFxuICAgIHtcXG5cXFxuICAgICAgICBkaXNjYXJkO1xcblxcXG4gICAgfVxcblxcXG4jZWxzZVxcblxcXG4gICAgaWYgKGNvbG9yLmEgPj0gMC45OTUpICAvLyBtYXRjaGVzIDI1NC8yNTUgYW5kIDI1NS8yNTVcXG5cXFxuICAgIHtcXG5cXFxuICAgICAgICBkaXNjYXJkO1xcblxcXG4gICAgfVxcblxcXG4jZW5kaWZcXG5cXFxuI2VuZGlmXFxuXFxcblxcblxcXG4gICAgb3V0X0ZyYWdDb2xvciA9IGN6bV9nYW1tYUNvcnJlY3QoY29sb3IpO1xcblxcXG4gICAgY3ptX3dyaXRlTG9nRGVwdGgoKTtcXG5cXFxufVxcblxcXG5cIjtcbiIsIi8vVGhpcyBmaWxlIGlzIGF1dG9tYXRpY2FsbHkgcmVidWlsdCBieSB0aGUgQ2VzaXVtIGJ1aWxkIHByb2Nlc3MuXG5leHBvcnQgZGVmYXVsdCBcInVuaWZvcm0gZmxvYXQgdV9tYXhUb3RhbFBvaW50U2l6ZTtcXG5cXFxuXFxuXFxcbmluIHZlYzQgcG9zaXRpb25IaWdoQW5kU2l6ZTtcXG5cXFxuaW4gdmVjNCBwb3NpdGlvbkxvd0FuZE91dGxpbmU7XFxuXFxcbmluIHZlYzQgY29tcHJlc3NlZEF0dHJpYnV0ZTA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yLCBvdXRsaW5lQ29sb3IsIHBpY2sgY29sb3JcXG5cXFxuaW4gdmVjNCBjb21wcmVzc2VkQXR0cmlidXRlMTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdywgdHJhbnNsdWNlbmN5IGJ5IGRpc3RhbmNlLCBzb21lIGZyZWUgc3BhY2VcXG5cXFxuaW4gdmVjNCBzY2FsZUJ5RGlzdGFuY2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVhciwgbmVhclNjYWxlLCBmYXIsIGZhclNjYWxlXFxuXFxcbmluIHZlYzQgZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGlzYWJsZURlcHRoQW5kU3BsaXREaXJlY3Rpb247ICAgIC8vIG5lYXIsIGZhciwgZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlLCBzcGxpdERpcmVjdGlvblxcblxcXG5cXG5cXFxub3V0IHZlYzQgdl9jb2xvcjtcXG5cXFxub3V0IHZlYzQgdl9vdXRsaW5lQ29sb3I7XFxuXFxcbm91dCBmbG9hdCB2X2lubmVyUGVyY2VudDtcXG5cXFxub3V0IGZsb2F0IHZfcGl4ZWxEaXN0YW5jZTtcXG5cXFxub3V0IHZlYzQgdl9waWNrQ29sb3I7XFxuXFxcbm91dCBmbG9hdCB2X3NwbGl0RGlyZWN0aW9uO1xcblxcXG5cXG5cXFxuY29uc3QgZmxvYXQgU0hJRlRfTEVGVDggPSAyNTYuMDtcXG5cXFxuY29uc3QgZmxvYXQgU0hJRlRfUklHSFQ4ID0gMS4wIC8gMjU2LjA7XFxuXFxcblxcblxcXG52b2lkIG1haW4oKVxcblxcXG57XFxuXFxcbiAgICAvLyBNb2RpZnlpbmcgdGhpcyBzaGFkZXIgbWF5IGFsc28gcmVxdWlyZSBtb2RpZmljYXRpb25zIHRvIFBvaW50UHJpbWl0aXZlLl9jb21wdXRlU2NyZWVuU3BhY2VQb3NpdGlvblxcblxcXG5cXG5cXFxuICAgIC8vIHVucGFjayBhdHRyaWJ1dGVzXFxuXFxcbiAgICB2ZWMzIHBvc2l0aW9uSGlnaCA9IHBvc2l0aW9uSGlnaEFuZFNpemUueHl6O1xcblxcXG4gICAgdmVjMyBwb3NpdGlvbkxvdyA9IHBvc2l0aW9uTG93QW5kT3V0bGluZS54eXo7XFxuXFxcbiAgICBmbG9hdCBvdXRsaW5lV2lkdGhCb3RoU2lkZXMgPSAyLjAgKiBwb3NpdGlvbkxvd0FuZE91dGxpbmUudztcXG5cXFxuICAgIGZsb2F0IHRvdGFsU2l6ZSA9IHBvc2l0aW9uSGlnaEFuZFNpemUudyArIG91dGxpbmVXaWR0aEJvdGhTaWRlcztcXG5cXFxuICAgIGZsb2F0IG91dGxpbmVQZXJjZW50ID0gb3V0bGluZVdpZHRoQm90aFNpZGVzIC8gdG90YWxTaXplO1xcblxcXG4gICAgLy8gU2NhbGUgaW4gcmVzcG9uc2UgdG8gYnJvd3Nlci16b29tLlxcblxcXG4gICAgdG90YWxTaXplICo9IGN6bV9waXhlbFJhdGlvO1xcblxcXG5cXG5cXFxuICAgIGZsb2F0IHRlbXAgPSBjb21wcmVzc2VkQXR0cmlidXRlMS54ICogU0hJRlRfUklHSFQ4O1xcblxcXG4gICAgZmxvYXQgc2hvdyA9IGZsb29yKHRlbXApO1xcblxcXG5cXG5cXFxuI2lmZGVmIEVZRV9ESVNUQU5DRV9UUkFOU0xVQ0VOQ1lcXG5cXFxuICAgIHZlYzQgdHJhbnNsdWNlbmN5QnlEaXN0YW5jZTtcXG5cXFxuICAgIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UueCA9IGNvbXByZXNzZWRBdHRyaWJ1dGUxLno7XFxuXFxcbiAgICB0cmFuc2x1Y2VuY3lCeURpc3RhbmNlLnogPSBjb21wcmVzc2VkQXR0cmlidXRlMS53O1xcblxcXG5cXG5cXFxuICAgIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UueSA9ICgodGVtcCAtIGZsb29yKHRlbXApKSAqIFNISUZUX0xFRlQ4KSAvIDI1NS4wO1xcblxcXG5cXG5cXFxuICAgIHRlbXAgPSBjb21wcmVzc2VkQXR0cmlidXRlMS55ICogU0hJRlRfUklHSFQ4O1xcblxcXG4gICAgdHJhbnNsdWNlbmN5QnlEaXN0YW5jZS53ID0gKCh0ZW1wIC0gZmxvb3IodGVtcCkpICogU0hJRlRfTEVGVDgpIC8gMjU1LjA7XFxuXFxcbiNlbmRpZlxcblxcXG5cXG5cXFxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xcblxcXG5cXG5cXFxuICAgIHZlYzQgY29sb3I7XFxuXFxcbiAgICB2ZWM0IG91dGxpbmVDb2xvcjtcXG5cXFxuICAgIHZlYzQgcGlja0NvbG9yO1xcblxcXG5cXG5cXFxuICAgIC8vIGNvbXByZXNzZWRBdHRyaWJ1dGUwLnogPT4gcGlja0NvbG9yLnJnYlxcblxcXG5cXG5cXFxuICAgIHRlbXAgPSBjb21wcmVzc2VkQXR0cmlidXRlMC56ICogU0hJRlRfUklHSFQ4O1xcblxcXG4gICAgcGlja0NvbG9yLmIgPSAodGVtcCAtIGZsb29yKHRlbXApKSAqIFNISUZUX0xFRlQ4O1xcblxcXG4gICAgdGVtcCA9IGZsb29yKHRlbXApICogU0hJRlRfUklHSFQ4O1xcblxcXG4gICAgcGlja0NvbG9yLmcgPSAodGVtcCAtIGZsb29yKHRlbXApKSAqIFNISUZUX0xFRlQ4O1xcblxcXG4gICAgcGlja0NvbG9yLnIgPSBmbG9vcih0ZW1wKTtcXG5cXFxuXFxuXFxcbiAgICAvLyBjb21wcmVzc2VkQXR0cmlidXRlMC54ID0+IGNvbG9yLnJnYlxcblxcXG5cXG5cXFxuICAgIHRlbXAgPSBjb21wcmVzc2VkQXR0cmlidXRlMC54ICogU0hJRlRfUklHSFQ4O1xcblxcXG4gICAgY29sb3IuYiA9ICh0ZW1wIC0gZmxvb3IodGVtcCkpICogU0hJRlRfTEVGVDg7XFxuXFxcbiAgICB0ZW1wID0gZmxvb3IodGVtcCkgKiBTSElGVF9SSUdIVDg7XFxuXFxcbiAgICBjb2xvci5nID0gKHRlbXAgLSBmbG9vcih0ZW1wKSkgKiBTSElGVF9MRUZUODtcXG5cXFxuICAgIGNvbG9yLnIgPSBmbG9vcih0ZW1wKTtcXG5cXFxuXFxuXFxcbiAgICAvLyBjb21wcmVzc2VkQXR0cmlidXRlMC55ID0+IG91dGxpbmVDb2xvci5yZ2JcXG5cXFxuXFxuXFxcbiAgICB0ZW1wID0gY29tcHJlc3NlZEF0dHJpYnV0ZTAueSAqIFNISUZUX1JJR0hUODtcXG5cXFxuICAgIG91dGxpbmVDb2xvci5iID0gKHRlbXAgLSBmbG9vcih0ZW1wKSkgKiBTSElGVF9MRUZUODtcXG5cXFxuICAgIHRlbXAgPSBmbG9vcih0ZW1wKSAqIFNISUZUX1JJR0hUODtcXG5cXFxuICAgIG91dGxpbmVDb2xvci5nID0gKHRlbXAgLSBmbG9vcih0ZW1wKSkgKiBTSElGVF9MRUZUODtcXG5cXFxuICAgIG91dGxpbmVDb2xvci5yID0gZmxvb3IodGVtcCk7XFxuXFxcblxcblxcXG4gICAgLy8gY29tcHJlc3NlZEF0dHJpYnV0ZTAudyA9PiBjb2xvci5hLCBvdXRsaW5lQ29sb3IuYSwgcGlja0NvbG9yLmFcXG5cXFxuXFxuXFxcbiAgICB0ZW1wID0gY29tcHJlc3NlZEF0dHJpYnV0ZTAudyAqIFNISUZUX1JJR0hUODtcXG5cXFxuICAgIHBpY2tDb2xvci5hID0gKHRlbXAgLSBmbG9vcih0ZW1wKSkgKiBTSElGVF9MRUZUODtcXG5cXFxuICAgIHBpY2tDb2xvciA9IHBpY2tDb2xvciAvIDI1NS4wO1xcblxcXG5cXG5cXFxuICAgIHRlbXAgPSBmbG9vcih0ZW1wKSAqIFNISUZUX1JJR0hUODtcXG5cXFxuICAgIG91dGxpbmVDb2xvci5hID0gKHRlbXAgLSBmbG9vcih0ZW1wKSkgKiBTSElGVF9MRUZUODtcXG5cXFxuICAgIG91dGxpbmVDb2xvciAvPSAyNTUuMDtcXG5cXFxuICAgIGNvbG9yLmEgPSBmbG9vcih0ZW1wKTtcXG5cXFxuICAgIGNvbG9yIC89IDI1NS4wO1xcblxcXG5cXG5cXFxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xcblxcXG5cXG5cXFxuICAgIHZlYzQgcCA9IGN6bV90cmFuc2xhdGVSZWxhdGl2ZVRvRXllKHBvc2l0aW9uSGlnaCwgcG9zaXRpb25Mb3cpO1xcblxcXG4gICAgdmVjNCBwb3NpdGlvbkVDID0gY3ptX21vZGVsVmlld1JlbGF0aXZlVG9FeWUgKiBwO1xcblxcXG5cXG5cXFxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xcblxcXG5cXG5cXFxuI2lmIGRlZmluZWQoRVlFX0RJU1RBTkNFX1NDQUxJTkcpIHx8IGRlZmluZWQoRVlFX0RJU1RBTkNFX1RSQU5TTFVDRU5DWSkgfHwgZGVmaW5lZChESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTikgfHwgZGVmaW5lZChESVNBQkxFX0RFUFRIX0RJU1RBTkNFKVxcblxcXG4gICAgZmxvYXQgbGVuZ3RoU3E7XFxuXFxcbiAgICBpZiAoY3ptX3NjZW5lTW9kZSA9PSBjem1fc2NlbmVNb2RlMkQpXFxuXFxcbiAgICB7XFxuXFxcbiAgICAgICAgLy8gMkQgY2FtZXJhIGRpc3RhbmNlIGlzIGEgc3BlY2lhbCBjYXNlXFxuXFxcbiAgICAgICAgLy8gdHJlYXQgYWxsIGJpbGxib2FyZHMgYXMgZmxhdHRlbmVkIHRvIHRoZSB6PTAuMCBwbGFuZVxcblxcXG4gICAgICAgIGxlbmd0aFNxID0gY3ptX2V5ZUhlaWdodDJELnk7XFxuXFxcbiAgICB9XFxuXFxcbiAgICBlbHNlXFxuXFxcbiAgICB7XFxuXFxcbiAgICAgICAgbGVuZ3RoU3EgPSBkb3QocG9zaXRpb25FQy54eXosIHBvc2l0aW9uRUMueHl6KTtcXG5cXFxuICAgIH1cXG5cXFxuI2VuZGlmXFxuXFxcblxcblxcXG4jaWZkZWYgRVlFX0RJU1RBTkNFX1NDQUxJTkdcXG5cXFxuICAgIHRvdGFsU2l6ZSAqPSBjem1fbmVhckZhclNjYWxhcihzY2FsZUJ5RGlzdGFuY2UsIGxlbmd0aFNxKTtcXG5cXFxuI2VuZGlmXFxuXFxcbiAgICBpZiAodG90YWxTaXplID4gMC4wKSB7XFxuXFxcbiAgICAgICAgLy8gQWRkIHBhZGRpbmcgZm9yIGFudGktYWxpYXNpbmcgb24gYm90aCBzaWRlcy5cXG5cXFxuICAgICAgICB0b3RhbFNpemUgKz0gMy4wO1xcblxcXG4gICAgfVxcblxcXG5cXG5cXFxuICAgIC8vIENsYW1wIHRvIG1heCBwb2ludCBzaXplLlxcblxcXG4gICAgdG90YWxTaXplID0gbWluKHRvdGFsU2l6ZSwgdV9tYXhUb3RhbFBvaW50U2l6ZSk7XFxuXFxcbiAgICAvLyBJZiBzaXplIGlzIHRvbyBzbWFsbCwgcHVzaCB2ZXJ0ZXggYmVoaW5kIG5lYXIgcGxhbmUgZm9yIGNsaXBwaW5nLlxcblxcXG4gICAgLy8gTm90ZSB0aGF0IGNvbnRleHQubWluaW11bUFsaWFzZWRQb2ludFNpemUgXFxcIndpbGwgYmUgYXQgbW9zdCAxLjBcXFwiLlxcblxcXG4gICAgaWYgKHRvdGFsU2l6ZSA8IDEuMClcXG5cXFxuICAgIHtcXG5cXFxuICAgICAgICBwb3NpdGlvbkVDLnh5eiA9IHZlYzMoMC4wKTtcXG5cXFxuICAgICAgICB0b3RhbFNpemUgPSAxLjA7XFxuXFxcbiAgICB9XFxuXFxcblxcblxcXG4gICAgZmxvYXQgdHJhbnNsdWNlbmN5ID0gMS4wO1xcblxcXG4jaWZkZWYgRVlFX0RJU1RBTkNFX1RSQU5TTFVDRU5DWVxcblxcXG4gICAgdHJhbnNsdWNlbmN5ID0gY3ptX25lYXJGYXJTY2FsYXIodHJhbnNsdWNlbmN5QnlEaXN0YW5jZSwgbGVuZ3RoU3EpO1xcblxcXG4gICAgLy8gcHVzaCB2ZXJ0ZXggYmVoaW5kIG5lYXIgcGxhbmUgZm9yIGNsaXBwaW5nXFxuXFxcbiAgICBpZiAodHJhbnNsdWNlbmN5IDwgMC4wMDQpXFxuXFxcbiAgICB7XFxuXFxcbiAgICAgICAgcG9zaXRpb25FQy54eXogPSB2ZWMzKDAuMCk7XFxuXFxcbiAgICB9XFxuXFxcbiNlbmRpZlxcblxcXG5cXG5cXFxuI2lmZGVmIERJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OXFxuXFxcbiAgICBmbG9hdCBuZWFyU3EgPSBkaXN0YW5jZURpc3BsYXlDb25kaXRpb25BbmREaXNhYmxlRGVwdGhBbmRTcGxpdERpcmVjdGlvbi54O1xcblxcXG4gICAgZmxvYXQgZmFyU3EgPSBkaXN0YW5jZURpc3BsYXlDb25kaXRpb25BbmREaXNhYmxlRGVwdGhBbmRTcGxpdERpcmVjdGlvbi55O1xcblxcXG4gICAgaWYgKGxlbmd0aFNxIDwgbmVhclNxIHx8IGxlbmd0aFNxID4gZmFyU3EpIHtcXG5cXFxuICAgICAgICAvLyBwdXNoIHZlcnRleCBiZWhpbmQgY2FtZXJhIHRvIGZvcmNlIGl0IHRvIGJlIGNsaXBwZWRcXG5cXFxuICAgICAgICBwb3NpdGlvbkVDLnh5eiA9IHZlYzMoMC4wLCAwLjAsIDEuMCk7XFxuXFxcbiAgICB9XFxuXFxcbiNlbmRpZlxcblxcXG5cXG5cXFxuICAgIGdsX1Bvc2l0aW9uID0gY3ptX3Byb2plY3Rpb24gKiBwb3NpdGlvbkVDO1xcblxcXG4gICAgY3ptX3ZlcnRleExvZ0RlcHRoKCk7XFxuXFxcblxcblxcXG4jaWZkZWYgRElTQUJMRV9ERVBUSF9ESVNUQU5DRVxcblxcXG4gICAgZmxvYXQgZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGlzYWJsZURlcHRoQW5kU3BsaXREaXJlY3Rpb24uejtcXG5cXFxuICAgIGlmIChkaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgPT0gMC4wICYmIGN6bV9taW5pbXVtRGlzYWJsZURlcHRoVGVzdERpc3RhbmNlICE9IDAuMClcXG5cXFxuICAgIHtcXG5cXFxuICAgICAgICBkaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgPSBjem1fbWluaW11bURpc2FibGVEZXB0aFRlc3REaXN0YW5jZTtcXG5cXFxuICAgIH1cXG5cXFxuXFxuXFxcbiAgICBpZiAoZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlICE9IDAuMClcXG5cXFxuICAgIHtcXG5cXFxuICAgICAgICAvLyBEb24ndCB0cnkgdG8gXFxcIm11bHRpcGx5IGJvdGggc2lkZXNcXFwiIGJ5IHcuICBHcmVhdGVyL2xlc3MtdGhhbiBjb21wYXJpc29ucyB3b24ndCB3b3JrIGZvciBuZWdhdGl2ZSB2YWx1ZXMgb2Ygdy5cXG5cXFxuICAgICAgICBmbG9hdCB6Y2xpcCA9IGdsX1Bvc2l0aW9uLnogLyBnbF9Qb3NpdGlvbi53O1xcblxcXG4gICAgICAgIGJvb2wgY2xpcHBlZCA9ICh6Y2xpcCA8IC0xLjAgfHwgemNsaXAgPiAxLjApO1xcblxcXG4gICAgICAgIGlmICghY2xpcHBlZCAmJiAoZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlIDwgMC4wIHx8IChsZW5ndGhTcSA+IDAuMCAmJiBsZW5ndGhTcSA8IGRpc2FibGVEZXB0aFRlc3REaXN0YW5jZSkpKVxcblxcXG4gICAgICAgIHtcXG5cXFxuICAgICAgICAgICAgLy8gUG9zaXRpb24geiBvbiB0aGUgbmVhciBwbGFuZS5cXG5cXFxuICAgICAgICAgICAgZ2xfUG9zaXRpb24ueiA9IC1nbF9Qb3NpdGlvbi53O1xcblxcXG4jaWZkZWYgTE9HX0RFUFRIXFxuXFxcbiAgICAgICAgICAgIGN6bV92ZXJ0ZXhMb2dEZXB0aCh2ZWM0KGN6bV9jdXJyZW50RnJ1c3R1bS54KSk7XFxuXFxcbiNlbmRpZlxcblxcXG4gICAgICAgIH1cXG5cXFxuICAgIH1cXG5cXFxuI2VuZGlmXFxuXFxcblxcblxcXG4gICAgdl9jb2xvciA9IGNvbG9yO1xcblxcXG4gICAgdl9jb2xvci5hICo9IHRyYW5zbHVjZW5jeSAqIHNob3c7XFxuXFxcbiAgICB2X291dGxpbmVDb2xvciA9IG91dGxpbmVDb2xvcjtcXG5cXFxuICAgIHZfb3V0bGluZUNvbG9yLmEgKj0gdHJhbnNsdWNlbmN5ICogc2hvdztcXG5cXFxuXFxuXFxcbiAgICB2X2lubmVyUGVyY2VudCA9IDEuMCAtIG91dGxpbmVQZXJjZW50O1xcblxcXG4gICAgdl9waXhlbERpc3RhbmNlID0gMi4wIC8gdG90YWxTaXplO1xcblxcXG4gICAgZ2xfUG9pbnRTaXplID0gdG90YWxTaXplICogc2hvdztcXG5cXFxuICAgIGdsX1Bvc2l0aW9uICo9IHNob3c7XFxuXFxcblxcblxcXG4gICAgdl9waWNrQ29sb3IgPSBwaWNrQ29sb3I7XFxuXFxcbiAgICB2X3NwbGl0RGlyZWN0aW9uID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGlzYWJsZURlcHRoQW5kU3BsaXREaXJlY3Rpb24udztcXG5cXFxufVxcblxcXG5cIjtcbiIsImltcG9ydCBCb3VuZGluZ1NwaGVyZSBmcm9tIFwiLi4vQ29yZS9Cb3VuZGluZ1NwaGVyZS5qc1wiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi9Db3JlL0NvbG9yLmpzXCI7XG5pbXBvcnQgQ29tcG9uZW50RGF0YXR5cGUgZnJvbSBcIi4uL0NvcmUvQ29tcG9uZW50RGF0YXR5cGUuanNcIjtcbmltcG9ydCBGcm96ZW4gZnJvbSBcIi4uL0NvcmUvRnJvemVuLmpzXCI7XG5pbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi4vQ29yZS9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgZGVzdHJveU9iamVjdCBmcm9tIFwiLi4vQ29yZS9kZXN0cm95T2JqZWN0LmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4uL0NvcmUvRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBFbmNvZGVkQ2FydGVzaWFuMyBmcm9tIFwiLi4vQ29yZS9FbmNvZGVkQ2FydGVzaWFuMy5qc1wiO1xuaW1wb3J0IENlc2l1bU1hdGggZnJvbSBcIi4uL0NvcmUvTWF0aC5qc1wiO1xuaW1wb3J0IE1hdHJpeDQgZnJvbSBcIi4uL0NvcmUvTWF0cml4NC5qc1wiO1xuaW1wb3J0IFByaW1pdGl2ZVR5cGUgZnJvbSBcIi4uL0NvcmUvUHJpbWl0aXZlVHlwZS5qc1wiO1xuaW1wb3J0IFdlYkdMQ29uc3RhbnRzIGZyb20gXCIuLi9Db3JlL1dlYkdMQ29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgQnVmZmVyVXNhZ2UgZnJvbSBcIi4uL1JlbmRlcmVyL0J1ZmZlclVzYWdlLmpzXCI7XG5pbXBvcnQgQ29udGV4dExpbWl0cyBmcm9tIFwiLi4vUmVuZGVyZXIvQ29udGV4dExpbWl0cy5qc1wiO1xuaW1wb3J0IERyYXdDb21tYW5kIGZyb20gXCIuLi9SZW5kZXJlci9EcmF3Q29tbWFuZC5qc1wiO1xuaW1wb3J0IFBhc3MgZnJvbSBcIi4uL1JlbmRlcmVyL1Bhc3MuanNcIjtcbmltcG9ydCBSZW5kZXJTdGF0ZSBmcm9tIFwiLi4vUmVuZGVyZXIvUmVuZGVyU3RhdGUuanNcIjtcbmltcG9ydCBTaGFkZXJQcm9ncmFtIGZyb20gXCIuLi9SZW5kZXJlci9TaGFkZXJQcm9ncmFtLmpzXCI7XG5pbXBvcnQgU2hhZGVyU291cmNlIGZyb20gXCIuLi9SZW5kZXJlci9TaGFkZXJTb3VyY2UuanNcIjtcbmltcG9ydCBWZXJ0ZXhBcnJheUZhY2FkZSBmcm9tIFwiLi4vUmVuZGVyZXIvVmVydGV4QXJyYXlGYWNhZGUuanNcIjtcbmltcG9ydCBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb25GUyBmcm9tIFwiLi4vU2hhZGVycy9Qb2ludFByaW1pdGl2ZUNvbGxlY3Rpb25GUy5qc1wiO1xuaW1wb3J0IFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvblZTIGZyb20gXCIuLi9TaGFkZXJzL1BvaW50UHJpbWl0aXZlQ29sbGVjdGlvblZTLmpzXCI7XG5pbXBvcnQgQmxlbmRpbmdTdGF0ZSBmcm9tIFwiLi9CbGVuZGluZ1N0YXRlLmpzXCI7XG5pbXBvcnQgQmxlbmRPcHRpb24gZnJvbSBcIi4vQmxlbmRPcHRpb24uanNcIjtcbmltcG9ydCBQb2ludFByaW1pdGl2ZSBmcm9tIFwiLi9Qb2ludFByaW1pdGl2ZS5qc1wiO1xuaW1wb3J0IFNjZW5lTW9kZSBmcm9tIFwiLi9TY2VuZU1vZGUuanNcIjtcblxuY29uc3QgU0hPV19JTkRFWCA9IFBvaW50UHJpbWl0aXZlLlNIT1dfSU5ERVg7XG5jb25zdCBQT1NJVElPTl9JTkRFWCA9IFBvaW50UHJpbWl0aXZlLlBPU0lUSU9OX0lOREVYO1xuY29uc3QgQ09MT1JfSU5ERVggPSBQb2ludFByaW1pdGl2ZS5DT0xPUl9JTkRFWDtcbmNvbnN0IE9VVExJTkVfQ09MT1JfSU5ERVggPSBQb2ludFByaW1pdGl2ZS5PVVRMSU5FX0NPTE9SX0lOREVYO1xuY29uc3QgT1VUTElORV9XSURUSF9JTkRFWCA9IFBvaW50UHJpbWl0aXZlLk9VVExJTkVfV0lEVEhfSU5ERVg7XG5jb25zdCBQSVhFTF9TSVpFX0lOREVYID0gUG9pbnRQcmltaXRpdmUuUElYRUxfU0laRV9JTkRFWDtcbmNvbnN0IFNDQUxFX0JZX0RJU1RBTkNFX0lOREVYID0gUG9pbnRQcmltaXRpdmUuU0NBTEVfQllfRElTVEFOQ0VfSU5ERVg7XG5jb25zdCBUUkFOU0xVQ0VOQ1lfQllfRElTVEFOQ0VfSU5ERVggPVxuICBQb2ludFByaW1pdGl2ZS5UUkFOU0xVQ0VOQ1lfQllfRElTVEFOQ0VfSU5ERVg7XG5jb25zdCBESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTl9JTkRFWCA9XG4gIFBvaW50UHJpbWl0aXZlLkRJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OX0lOREVYO1xuY29uc3QgRElTQUJMRV9ERVBUSF9ESVNUQU5DRV9JTkRFWCA9XG4gIFBvaW50UHJpbWl0aXZlLkRJU0FCTEVfREVQVEhfRElTVEFOQ0VfSU5ERVg7XG5jb25zdCBTUExJVF9ESVJFQ1RJT05fSU5ERVggPSBQb2ludFByaW1pdGl2ZS5TUExJVF9ESVJFQ1RJT05fSU5ERVg7XG5jb25zdCBOVU1CRVJfT0ZfUFJPUEVSVElFUyA9IFBvaW50UHJpbWl0aXZlLk5VTUJFUl9PRl9QUk9QRVJUSUVTO1xuXG5jb25zdCBhdHRyaWJ1dGVMb2NhdGlvbnMgPSB7XG4gIHBvc2l0aW9uSGlnaEFuZFNpemU6IDAsXG4gIHBvc2l0aW9uTG93QW5kT3V0bGluZTogMSxcbiAgY29tcHJlc3NlZEF0dHJpYnV0ZTA6IDIsIC8vIGNvbG9yLCBvdXRsaW5lQ29sb3IsIHBpY2sgY29sb3JcbiAgY29tcHJlc3NlZEF0dHJpYnV0ZTE6IDMsIC8vIHNob3csIHRyYW5zbHVjZW5jeSBieSBkaXN0YW5jZSwgc29tZSBmcmVlIHNwYWNlXG4gIHNjYWxlQnlEaXN0YW5jZTogNCxcbiAgZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGlzYWJsZURlcHRoQW5kU3BsaXREaXJlY3Rpb246IDUsXG59O1xuXG4vKipcbiAqIEEgcmVuZGVyYWJsZSBjb2xsZWN0aW9uIG9mIHBvaW50cy5cbiAqIDxiciAvPjxiciAvPlxuICogUG9pbnRzIGFyZSBhZGRlZCBhbmQgcmVtb3ZlZCBmcm9tIHRoZSBjb2xsZWN0aW9uIHVzaW5nIHtAbGluayBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jYWRkfVxuICogYW5kIHtAbGluayBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jcmVtb3ZlfS5cbiAqXG4gKiBAYWxpYXMgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIE9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIEBwYXJhbSB7TWF0cml4NH0gW29wdGlvbnMubW9kZWxNYXRyaXg9TWF0cml4NC5JREVOVElUWV0gVGhlIDR4NCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggdGhhdCB0cmFuc2Zvcm1zIGVhY2ggcG9pbnQgZnJvbSBtb2RlbCB0byB3b3JsZCBjb29yZGluYXRlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuZGVidWdTaG93Qm91bmRpbmdWb2x1bWU9ZmFsc2VdIEZvciBkZWJ1Z2dpbmcgb25seS4gRGV0ZXJtaW5lcyBpZiB0aGlzIHByaW1pdGl2ZSdzIGNvbW1hbmRzJyBib3VuZGluZyBzcGhlcmVzIGFyZSBzaG93bi5cbiAqIEBwYXJhbSB7QmxlbmRPcHRpb259IFtvcHRpb25zLmJsZW5kT3B0aW9uPUJsZW5kT3B0aW9uLk9QQVFVRV9BTkRfVFJBTlNMVUNFTlRdIFRoZSBwb2ludCBibGVuZGluZyBvcHRpb24uIFRoZSBkZWZhdWx0XG4gKiBpcyB1c2VkIGZvciByZW5kZXJpbmcgYm90aCBvcGFxdWUgYW5kIHRyYW5zbHVjZW50IHBvaW50cy4gSG93ZXZlciwgaWYgZWl0aGVyIGFsbCBvZiB0aGUgcG9pbnRzIGFyZSBjb21wbGV0ZWx5IG9wYXF1ZSBvciBhbGwgYXJlIGNvbXBsZXRlbHkgdHJhbnNsdWNlbnQsXG4gKiBzZXR0aW5nIHRoZSB0ZWNobmlxdWUgdG8gQmxlbmRPcHRpb24uT1BBUVVFIG9yIEJsZW5kT3B0aW9uLlRSQU5TTFVDRU5UIGNhbiBpbXByb3ZlIHBlcmZvcm1hbmNlIGJ5IHVwIHRvIDJ4LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zaG93PXRydWVdIERldGVybWluZXMgaWYgdGhlIHByaW1pdGl2ZXMgaW4gdGhlIGNvbGxlY3Rpb24gd2lsbCBiZSBzaG93bi5cbiAqXG4gKiBAcGVyZm9ybWFuY2UgRm9yIGJlc3QgcGVyZm9ybWFuY2UsIHByZWZlciBhIGZldyBjb2xsZWN0aW9ucywgZWFjaCB3aXRoIG1hbnkgcG9pbnRzLCB0b1xuICogbWFueSBjb2xsZWN0aW9ucyB3aXRoIG9ubHkgYSBmZXcgcG9pbnRzIGVhY2guICBPcmdhbml6ZSBjb2xsZWN0aW9ucyBzbyB0aGF0IHBvaW50c1xuICogd2l0aCB0aGUgc2FtZSB1cGRhdGUgZnJlcXVlbmN5IGFyZSBpbiB0aGUgc2FtZSBjb2xsZWN0aW9uLCBpLmUuLCBwb2ludHMgdGhhdCBkbyBub3RcbiAqIGNoYW5nZSBzaG91bGQgYmUgaW4gb25lIGNvbGxlY3Rpb247IHBvaW50cyB0aGF0IGNoYW5nZSBldmVyeSBmcmFtZSBzaG91bGQgYmUgaW4gYW5vdGhlclxuICogY29sbGVjdGlvbjsgYW5kIHNvIG9uLlxuICpcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ3JlYXRlIGEgcG9pbnRQcmltaXRpdmUgY29sbGVjdGlvbiB3aXRoIHR3byBwb2ludHNcbiAqIGNvbnN0IHBvaW50cyA9IHNjZW5lLnByaW1pdGl2ZXMuYWRkKG5ldyBDZXNpdW0uUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uKCkpO1xuICogcG9pbnRzLmFkZCh7XG4gKiAgIHBvc2l0aW9uIDogbmV3IENlc2l1bS5DYXJ0ZXNpYW4zKDEuMCwgMi4wLCAzLjApLFxuICogICBjb2xvciA6IENlc2l1bS5Db2xvci5ZRUxMT1dcbiAqIH0pO1xuICogcG9pbnRzLmFkZCh7XG4gKiAgIHBvc2l0aW9uIDogbmV3IENlc2l1bS5DYXJ0ZXNpYW4zKDQuMCwgNS4wLCA2LjApLFxuICogICBjb2xvciA6IENlc2l1bS5Db2xvci5DWUFOXG4gKiB9KTtcbiAqXG4gKiBAc2VlIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiNhZGRcbiAqIEBzZWUgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI3JlbW92ZVxuICogQHNlZSBQb2ludFByaW1pdGl2ZVxuICovXG5mdW5jdGlvbiBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyA/PyBGcm96ZW4uRU1QVFlfT0JKRUNUO1xuXG4gIHRoaXMuX3NwID0gdW5kZWZpbmVkO1xuICB0aGlzLl9zcFRyYW5zbHVjZW50ID0gdW5kZWZpbmVkO1xuICB0aGlzLl9yc09wYXF1ZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fcnNUcmFuc2x1Y2VudCA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fdmFmID0gdW5kZWZpbmVkO1xuXG4gIHRoaXMuX3BvaW50UHJpbWl0aXZlcyA9IFtdO1xuICB0aGlzLl9wb2ludFByaW1pdGl2ZXNUb1VwZGF0ZSA9IFtdO1xuICB0aGlzLl9wb2ludFByaW1pdGl2ZXNUb1VwZGF0ZUluZGV4ID0gMDtcbiAgdGhpcy5fcG9pbnRQcmltaXRpdmVzUmVtb3ZlZCA9IGZhbHNlO1xuICB0aGlzLl9jcmVhdGVWZXJ0ZXhBcnJheSA9IGZhbHNlO1xuXG4gIHRoaXMuX3NoYWRlclNjYWxlQnlEaXN0YW5jZSA9IGZhbHNlO1xuICB0aGlzLl9jb21waWxlZFNoYWRlclNjYWxlQnlEaXN0YW5jZSA9IGZhbHNlO1xuXG4gIHRoaXMuX3NoYWRlclRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UgPSBmYWxzZTtcbiAgdGhpcy5fY29tcGlsZWRTaGFkZXJUcmFuc2x1Y2VuY3lCeURpc3RhbmNlID0gZmFsc2U7XG5cbiAgdGhpcy5fc2hhZGVyRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uID0gZmFsc2U7XG4gIHRoaXMuX2NvbXBpbGVkU2hhZGVyRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uID0gZmFsc2U7XG5cbiAgdGhpcy5fc2hhZGVyRGlzYWJsZURlcHRoRGlzdGFuY2UgPSBmYWxzZTtcbiAgdGhpcy5fY29tcGlsZWRTaGFkZXJEaXNhYmxlRGVwdGhEaXN0YW5jZSA9IGZhbHNlO1xuXG4gIHRoaXMuX3Byb3BlcnRpZXNDaGFuZ2VkID0gbmV3IFVpbnQzMkFycmF5KE5VTUJFUl9PRl9QUk9QRVJUSUVTKTtcblxuICB0aGlzLl9tYXhQaXhlbFNpemUgPSAxLjA7XG5cbiAgdGhpcy5fYmFzZVZvbHVtZSA9IG5ldyBCb3VuZGluZ1NwaGVyZSgpO1xuICB0aGlzLl9iYXNlVm9sdW1lV0MgPSBuZXcgQm91bmRpbmdTcGhlcmUoKTtcbiAgdGhpcy5fYmFzZVZvbHVtZTJEID0gbmV3IEJvdW5kaW5nU3BoZXJlKCk7XG4gIHRoaXMuX2JvdW5kaW5nVm9sdW1lID0gbmV3IEJvdW5kaW5nU3BoZXJlKCk7XG4gIHRoaXMuX2JvdW5kaW5nVm9sdW1lRGlydHkgPSBmYWxzZTtcblxuICB0aGlzLl9jb2xvckNvbW1hbmRzID0gW107XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgcHJpbWl0aXZlcyBpbiB0aGlzIGNvbGxlY3Rpb24gd2lsbCBiZSBzaG93bi5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHRoaXMuc2hvdyA9IG9wdGlvbnMuc2hvdyA/PyB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgNHg0IHRyYW5zZm9ybWF0aW9uIG1hdHJpeCB0aGF0IHRyYW5zZm9ybXMgZWFjaCBwb2ludCBpbiB0aGlzIGNvbGxlY3Rpb24gZnJvbSBtb2RlbCB0byB3b3JsZCBjb29yZGluYXRlcy5cbiAgICogV2hlbiB0aGlzIGlzIHRoZSBpZGVudGl0eSBtYXRyaXgsIHRoZSBwb2ludFByaW1pdGl2ZXMgYXJlIGRyYXduIGluIHdvcmxkIGNvb3JkaW5hdGVzLCBpLmUuLCBFYXJ0aCdzIFdHUzg0IGNvb3JkaW5hdGVzLlxuICAgKiBMb2NhbCByZWZlcmVuY2UgZnJhbWVzIGNhbiBiZSB1c2VkIGJ5IHByb3ZpZGluZyBhIGRpZmZlcmVudCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXgsIGxpa2UgdGhhdCByZXR1cm5lZFxuICAgKiBieSB7QGxpbmsgVHJhbnNmb3Jtcy5lYXN0Tm9ydGhVcFRvRml4ZWRGcmFtZX0uXG4gICAqXG4gICAqIEB0eXBlIHtNYXRyaXg0fVxuICAgKiBAZGVmYXVsdCB7QGxpbmsgTWF0cml4NC5JREVOVElUWX1cbiAgICpcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgY2VudGVyID0gQ2VzaXVtLkNhcnRlc2lhbjMuZnJvbURlZ3JlZXMoLTc1LjU5Nzc3LCA0MC4wMzg4Myk7XG4gICAqIHBvaW50UHJpbWl0aXZlcy5tb2RlbE1hdHJpeCA9IENlc2l1bS5UcmFuc2Zvcm1zLmVhc3ROb3J0aFVwVG9GaXhlZEZyYW1lKGNlbnRlcik7XG4gICAqIHBvaW50UHJpbWl0aXZlcy5hZGQoe1xuICAgKiAgIGNvbG9yIDogQ2VzaXVtLkNvbG9yLk9SQU5HRSxcbiAgICogICBwb3NpdGlvbiA6IG5ldyBDZXNpdW0uQ2FydGVzaWFuMygwLjAsIDAuMCwgMC4wKSAvLyBjZW50ZXJcbiAgICogfSk7XG4gICAqIHBvaW50UHJpbWl0aXZlcy5hZGQoe1xuICAgKiAgIGNvbG9yIDogQ2VzaXVtLkNvbG9yLllFTExPVyxcbiAgICogICBwb3NpdGlvbiA6IG5ldyBDZXNpdW0uQ2FydGVzaWFuMygxMDAwMDAwLjAsIDAuMCwgMC4wKSAvLyBlYXN0XG4gICAqIH0pO1xuICAgKiBwb2ludFByaW1pdGl2ZXMuYWRkKHtcbiAgICogICBjb2xvciA6IENlc2l1bS5Db2xvci5HUkVFTixcbiAgICogICBwb3NpdGlvbiA6IG5ldyBDZXNpdW0uQ2FydGVzaWFuMygwLjAsIDEwMDAwMDAuMCwgMC4wKSAvLyBub3J0aFxuICAgKiB9KTtcbiAgICogcG9pbnRQcmltaXRpdmVzLmFkZCh7XG4gICAqICAgY29sb3IgOiBDZXNpdW0uQ29sb3IuQ1lBTixcbiAgICogICBwb3NpdGlvbiA6IG5ldyBDZXNpdW0uQ2FydGVzaWFuMygwLjAsIDAuMCwgMTAwMDAwMC4wKSAvLyB1cFxuICAgKiB9KTtcbiAgICpcbiAgICogQHNlZSBUcmFuc2Zvcm1zLmVhc3ROb3J0aFVwVG9GaXhlZEZyYW1lXG4gICAqL1xuICB0aGlzLm1vZGVsTWF0cml4ID0gTWF0cml4NC5jbG9uZShvcHRpb25zLm1vZGVsTWF0cml4ID8/IE1hdHJpeDQuSURFTlRJVFkpO1xuICB0aGlzLl9tb2RlbE1hdHJpeCA9IE1hdHJpeDQuY2xvbmUoTWF0cml4NC5JREVOVElUWSk7XG5cbiAgLyoqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgZm9yIGRlYnVnZ2luZyBvbmx5OyBpdCBpcyBub3QgZm9yIHByb2R1Y3Rpb24gdXNlIG5vciBpcyBpdCBvcHRpbWl6ZWQuXG4gICAqIDxwPlxuICAgKiBEcmF3cyB0aGUgYm91bmRpbmcgc3BoZXJlIGZvciBlYWNoIGRyYXcgY29tbWFuZCBpbiB0aGUgcHJpbWl0aXZlLlxuICAgKiA8L3A+XG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdGhpcy5kZWJ1Z1Nob3dCb3VuZGluZ1ZvbHVtZSA9IG9wdGlvbnMuZGVidWdTaG93Qm91bmRpbmdWb2x1bWUgPz8gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBwb2ludCBibGVuZGluZyBvcHRpb24uIFRoZSBkZWZhdWx0IGlzIHVzZWQgZm9yIHJlbmRlcmluZyBib3RoIG9wYXF1ZSBhbmQgdHJhbnNsdWNlbnQgcG9pbnRzLlxuICAgKiBIb3dldmVyLCBpZiBlaXRoZXIgYWxsIG9mIHRoZSBwb2ludHMgYXJlIGNvbXBsZXRlbHkgb3BhcXVlIG9yIGFsbCBhcmUgY29tcGxldGVseSB0cmFuc2x1Y2VudCxcbiAgICogc2V0dGluZyB0aGUgdGVjaG5pcXVlIHRvIEJsZW5kT3B0aW9uLk9QQVFVRSBvciBCbGVuZE9wdGlvbi5UUkFOU0xVQ0VOVCBjYW4gaW1wcm92ZVxuICAgKiBwZXJmb3JtYW5jZSBieSB1cCB0byAyeC5cbiAgICogQHR5cGUge0JsZW5kT3B0aW9ufVxuICAgKiBAZGVmYXVsdCBCbGVuZE9wdGlvbi5PUEFRVUVfQU5EX1RSQU5TTFVDRU5UXG4gICAqL1xuICB0aGlzLmJsZW5kT3B0aW9uID0gb3B0aW9ucy5ibGVuZE9wdGlvbiA/PyBCbGVuZE9wdGlvbi5PUEFRVUVfQU5EX1RSQU5TTFVDRU5UO1xuICB0aGlzLl9ibGVuZE9wdGlvbiA9IHVuZGVmaW5lZDtcblxuICB0aGlzLl9tb2RlID0gU2NlbmVNb2RlLlNDRU5FM0Q7XG4gIHRoaXMuX21heFRvdGFsUG9pbnRTaXplID0gMTtcblxuICAvLyBUaGUgYnVmZmVyIHVzYWdlIGZvciBlYWNoIGF0dHJpYnV0ZSBpcyBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSB1c2FnZSBvZiB0aGUgYXR0cmlidXRlIG92ZXIgdGltZS5cbiAgdGhpcy5fYnVmZmVyc1VzYWdlID0gW1xuICAgIEJ1ZmZlclVzYWdlLlNUQVRJQ19EUkFXLCAvLyBTSE9XX0lOREVYXG4gICAgQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVcsIC8vIFBPU0lUSU9OX0lOREVYXG4gICAgQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVcsIC8vIENPTE9SX0lOREVYXG4gICAgQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVcsIC8vIE9VVExJTkVfQ09MT1JfSU5ERVhcbiAgICBCdWZmZXJVc2FnZS5TVEFUSUNfRFJBVywgLy8gT1VUTElORV9XSURUSF9JTkRFWFxuICAgIEJ1ZmZlclVzYWdlLlNUQVRJQ19EUkFXLCAvLyBQSVhFTF9TSVpFX0lOREVYXG4gICAgQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVcsIC8vIFNDQUxFX0JZX0RJU1RBTkNFX0lOREVYXG4gICAgQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVcsIC8vIFRSQU5TTFVDRU5DWV9CWV9ESVNUQU5DRV9JTkRFWFxuICAgIEJ1ZmZlclVzYWdlLlNUQVRJQ19EUkFXLCAvLyBESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTl9JTkRFWFxuICBdO1xuXG4gIGNvbnN0IHRoYXQgPSB0aGlzO1xuICB0aGlzLl91bmlmb3JtcyA9IHtcbiAgICB1X21heFRvdGFsUG9pbnRTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhhdC5fbWF4VG90YWxQb2ludFNpemU7XG4gICAgfSxcbiAgfTtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLnByb3RvdHlwZSwge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHBvaW50cyBpbiB0aGlzIGNvbGxlY3Rpb24uICBUaGlzIGlzIGNvbW1vbmx5IHVzZWQgd2l0aFxuICAgKiB7QGxpbmsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI2dldH0gdG8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgcG9pbnRzXG4gICAqIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgKiBAbWVtYmVyb2YgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgbGVuZ3RoOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZW1vdmVQb2ludFByaW1pdGl2ZXModGhpcyk7XG4gICAgICByZXR1cm4gdGhpcy5fcG9pbnRQcmltaXRpdmVzLmxlbmd0aDtcbiAgICB9LFxuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lQb2ludFByaW1pdGl2ZXMocG9pbnRQcmltaXRpdmVzKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHBvaW50UHJpbWl0aXZlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAocG9pbnRQcmltaXRpdmVzW2ldKSB7XG4gICAgICBwb2ludFByaW1pdGl2ZXNbaV0uX2Rlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBhZGRzIGEgcG9pbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGluaXRpYWwgcHJvcGVydGllcyB0byB0aGUgY29sbGVjdGlvbi5cbiAqIFRoZSBhZGRlZCBwb2ludCBpcyByZXR1cm5lZCBzbyBpdCBjYW4gYmUgbW9kaWZpZWQgb3IgcmVtb3ZlZCBmcm9tIHRoZSBjb2xsZWN0aW9uIGxhdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fVtvcHRpb25zXSBBIHRlbXBsYXRlIGRlc2NyaWJpbmcgdGhlIHBvaW50J3MgcHJvcGVydGllcyBhcyBzaG93biBpbiBFeGFtcGxlIDEuXG4gKiBAcmV0dXJucyB7UG9pbnRQcmltaXRpdmV9IFRoZSBwb2ludCB0aGF0IHdhcyBhZGRlZCB0byB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBAcGVyZm9ybWFuY2UgQ2FsbGluZyA8Y29kZT5hZGQ8L2NvZGU+IGlzIGV4cGVjdGVkIGNvbnN0YW50IHRpbWUuICBIb3dldmVyLCB0aGUgY29sbGVjdGlvbidzIHZlcnRleCBidWZmZXJcbiAqIGlzIHJld3JpdHRlbiAtIGFuIDxjb2RlPk8obik8L2NvZGU+IG9wZXJhdGlvbiB0aGF0IGFsc28gaW5jdXJzIENQVSB0byBHUFUgb3ZlcmhlYWQuICBGb3JcbiAqIGJlc3QgcGVyZm9ybWFuY2UsIGFkZCBhcyBtYW55IHBvaW50UHJpbWl0aXZlcyBhcyBwb3NzaWJsZSBiZWZvcmUgY2FsbGluZyA8Y29kZT51cGRhdGU8L2NvZGU+LlxuICpcbiAqIEBleGNlcHRpb24ge0RldmVsb3BlckVycm9yfSBUaGlzIG9iamVjdCB3YXMgZGVzdHJveWVkLCBpLmUuLCBkZXN0cm95KCkgd2FzIGNhbGxlZC5cbiAqXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEV4YW1wbGUgMTogIEFkZCBhIHBvaW50LCBzcGVjaWZ5aW5nIGFsbCB0aGUgZGVmYXVsdCB2YWx1ZXMuXG4gKiBjb25zdCBwID0gcG9pbnRQcmltaXRpdmVzLmFkZCh7XG4gKiAgIHNob3cgOiB0cnVlLFxuICogICBwb3NpdGlvbiA6IENlc2l1bS5DYXJ0ZXNpYW4zLlpFUk8sXG4gKiAgIHBpeGVsU2l6ZSA6IDEwLjAsXG4gKiAgIGNvbG9yIDogQ2VzaXVtLkNvbG9yLldISVRFLFxuICogICBvdXRsaW5lQ29sb3IgOiBDZXNpdW0uQ29sb3IuVFJBTlNQQVJFTlQsXG4gKiAgIG91dGxpbmVXaWR0aCA6IDAuMCxcbiAqICAgaWQgOiB1bmRlZmluZWRcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFeGFtcGxlIDI6ICBTcGVjaWZ5IG9ubHkgdGhlIHBvaW50J3MgY2FydG9ncmFwaGljIHBvc2l0aW9uLlxuICogY29uc3QgcCA9IHBvaW50UHJpbWl0aXZlcy5hZGQoe1xuICogICBwb3NpdGlvbiA6IENlc2l1bS5DYXJ0ZXNpYW4zLmZyb21EZWdyZWVzKGxvbmdpdHVkZSwgbGF0aXR1ZGUsIGhlaWdodClcbiAqIH0pO1xuICpcbiAqIEBzZWUgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI3JlbW92ZVxuICogQHNlZSBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jcmVtb3ZlQWxsXG4gKi9cblBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgY29uc3QgcCA9IG5ldyBQb2ludFByaW1pdGl2ZShvcHRpb25zLCB0aGlzKTtcbiAgcC5faW5kZXggPSB0aGlzLl9wb2ludFByaW1pdGl2ZXMubGVuZ3RoO1xuXG4gIHRoaXMuX3BvaW50UHJpbWl0aXZlcy5wdXNoKHApO1xuICB0aGlzLl9jcmVhdGVWZXJ0ZXhBcnJheSA9IHRydWU7XG5cbiAgcmV0dXJuIHA7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBwb2ludCBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7UG9pbnRQcmltaXRpdmV9IHBvaW50UHJpbWl0aXZlIFRoZSBwb2ludCB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIHBvaW50IHdhcyByZW1vdmVkOyA8Y29kZT5mYWxzZTwvY29kZT4gaWYgdGhlIHBvaW50IHdhcyBub3QgZm91bmQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQHBlcmZvcm1hbmNlIENhbGxpbmcgPGNvZGU+cmVtb3ZlPC9jb2RlPiBpcyBleHBlY3RlZCBjb25zdGFudCB0aW1lLiAgSG93ZXZlciwgdGhlIGNvbGxlY3Rpb24ncyB2ZXJ0ZXggYnVmZmVyXG4gKiBpcyByZXdyaXR0ZW4gLSBhbiA8Y29kZT5PKG4pPC9jb2RlPiBvcGVyYXRpb24gdGhhdCBhbHNvIGluY3VycyBDUFUgdG8gR1BVIG92ZXJoZWFkLiAgRm9yXG4gKiBiZXN0IHBlcmZvcm1hbmNlLCByZW1vdmUgYXMgbWFueSBwb2ludHMgYXMgcG9zc2libGUgYmVmb3JlIGNhbGxpbmcgPGNvZGU+dXBkYXRlPC9jb2RlPi5cbiAqIElmIHlvdSBpbnRlbmQgdG8gdGVtcG9yYXJpbHkgaGlkZSBhIHBvaW50LCBpdCBpcyB1c3VhbGx5IG1vcmUgZWZmaWNpZW50IHRvIGNhbGxcbiAqIHtAbGluayBQb2ludFByaW1pdGl2ZSNzaG93fSBpbnN0ZWFkIG9mIHJlbW92aW5nIGFuZCByZS1hZGRpbmcgdGhlIHBvaW50LlxuICpcbiAqIEBleGNlcHRpb24ge0RldmVsb3BlckVycm9yfSBUaGlzIG9iamVjdCB3YXMgZGVzdHJveWVkLCBpLmUuLCBkZXN0cm95KCkgd2FzIGNhbGxlZC5cbiAqXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHAgPSBwb2ludFByaW1pdGl2ZXMuYWRkKC4uLik7XG4gKiBwb2ludFByaW1pdGl2ZXMucmVtb3ZlKHApOyAgLy8gUmV0dXJucyB0cnVlXG4gKlxuICogQHNlZSBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jYWRkXG4gKiBAc2VlIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiNyZW1vdmVBbGxcbiAqIEBzZWUgUG9pbnRQcmltaXRpdmUjc2hvd1xuICovXG5Qb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChwb2ludFByaW1pdGl2ZSkge1xuICBpZiAodGhpcy5jb250YWlucyhwb2ludFByaW1pdGl2ZSkpIHtcbiAgICB0aGlzLl9wb2ludFByaW1pdGl2ZXNbcG9pbnRQcmltaXRpdmUuX2luZGV4XSA9IG51bGw7IC8vIFJlbW92ZWQgbGF0ZXJcbiAgICB0aGlzLl9wb2ludFByaW1pdGl2ZXNSZW1vdmVkID0gdHJ1ZTtcbiAgICB0aGlzLl9jcmVhdGVWZXJ0ZXhBcnJheSA9IHRydWU7XG4gICAgcG9pbnRQcmltaXRpdmUuX2Rlc3Ryb3koKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgcG9pbnRzIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQHBlcmZvcm1hbmNlIDxjb2RlPk8obik8L2NvZGU+LiAgSXQgaXMgbW9yZSBlZmZpY2llbnQgdG8gcmVtb3ZlIGFsbCB0aGUgcG9pbnRzXG4gKiBmcm9tIGEgY29sbGVjdGlvbiBhbmQgdGhlbiBhZGQgbmV3IG9uZXMgdGhhbiB0byBjcmVhdGUgYSBuZXcgY29sbGVjdGlvbiBlbnRpcmVseS5cbiAqXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gVGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZCwgaS5lLiwgZGVzdHJveSgpIHdhcyBjYWxsZWQuXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb2ludFByaW1pdGl2ZXMuYWRkKC4uLik7XG4gKiBwb2ludFByaW1pdGl2ZXMuYWRkKC4uLik7XG4gKiBwb2ludFByaW1pdGl2ZXMucmVtb3ZlQWxsKCk7XG4gKlxuICogQHNlZSBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jYWRkXG4gKiBAc2VlIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiNyZW1vdmVcbiAqL1xuUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGRlc3Ryb3lQb2ludFByaW1pdGl2ZXModGhpcy5fcG9pbnRQcmltaXRpdmVzKTtcbiAgdGhpcy5fcG9pbnRQcmltaXRpdmVzID0gW107XG4gIHRoaXMuX3BvaW50UHJpbWl0aXZlc1RvVXBkYXRlID0gW107XG4gIHRoaXMuX3BvaW50UHJpbWl0aXZlc1RvVXBkYXRlSW5kZXggPSAwO1xuICB0aGlzLl9wb2ludFByaW1pdGl2ZXNSZW1vdmVkID0gZmFsc2U7XG5cbiAgdGhpcy5fY3JlYXRlVmVydGV4QXJyYXkgPSB0cnVlO1xufTtcblxuZnVuY3Rpb24gcmVtb3ZlUG9pbnRQcmltaXRpdmVzKHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbikge1xuICBpZiAocG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9wb2ludFByaW1pdGl2ZXNSZW1vdmVkKSB7XG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9wb2ludFByaW1pdGl2ZXNSZW1vdmVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBuZXdQb2ludFByaW1pdGl2ZXMgPSBbXTtcbiAgICBjb25zdCBwb2ludFByaW1pdGl2ZXMgPSBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX3BvaW50UHJpbWl0aXZlcztcbiAgICBjb25zdCBsZW5ndGggPSBwb2ludFByaW1pdGl2ZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwLCBqID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBwb2ludFByaW1pdGl2ZSA9IHBvaW50UHJpbWl0aXZlc1tpXTtcbiAgICAgIGlmIChwb2ludFByaW1pdGl2ZSkge1xuICAgICAgICBwb2ludFByaW1pdGl2ZS5faW5kZXggPSBqKys7XG4gICAgICAgIG5ld1BvaW50UHJpbWl0aXZlcy5wdXNoKHBvaW50UHJpbWl0aXZlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX3BvaW50UHJpbWl0aXZlcyA9IG5ld1BvaW50UHJpbWl0aXZlcztcbiAgfVxufVxuXG5Qb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ucHJvdG90eXBlLl91cGRhdGVQb2ludFByaW1pdGl2ZSA9IGZ1bmN0aW9uIChcbiAgcG9pbnRQcmltaXRpdmUsXG4gIHByb3BlcnR5Q2hhbmdlZCxcbikge1xuICBpZiAoIXBvaW50UHJpbWl0aXZlLl9kaXJ0eSkge1xuICAgIHRoaXMuX3BvaW50UHJpbWl0aXZlc1RvVXBkYXRlW3RoaXMuX3BvaW50UHJpbWl0aXZlc1RvVXBkYXRlSW5kZXgrK10gPVxuICAgICAgcG9pbnRQcmltaXRpdmU7XG4gIH1cblxuICArK3RoaXMuX3Byb3BlcnRpZXNDaGFuZ2VkW3Byb3BlcnR5Q2hhbmdlZF07XG59O1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhpcyBjb2xsZWN0aW9uIGNvbnRhaW5zIGEgZ2l2ZW4gcG9pbnQuXG4gKlxuICogQHBhcmFtIHtQb2ludFByaW1pdGl2ZX0gW3BvaW50UHJpbWl0aXZlXSBUaGUgcG9pbnQgdG8gY2hlY2sgZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBjb2xsZWN0aW9uIGNvbnRhaW5zIHRoZSBwb2ludCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBzZWUgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI2dldFxuICovXG5Qb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKHBvaW50UHJpbWl0aXZlKSB7XG4gIHJldHVybiAoXG4gICAgZGVmaW5lZChwb2ludFByaW1pdGl2ZSkgJiYgcG9pbnRQcmltaXRpdmUuX3BvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiA9PT0gdGhpc1xuICApO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb2ludCBpbiB0aGUgY29sbGVjdGlvbiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiAgSW5kaWNlcyBhcmUgemVyby1iYXNlZFxuICogYW5kIGluY3JlYXNlIGFzIHBvaW50cyBhcmUgYWRkZWQuICBSZW1vdmluZyBhIHBvaW50IHNoaWZ0cyBhbGwgcG9pbnRzIGFmdGVyXG4gKiBpdCB0byB0aGUgbGVmdCwgY2hhbmdpbmcgdGhlaXIgaW5kaWNlcy4gIFRoaXMgZnVuY3Rpb24gaXMgY29tbW9ubHkgdXNlZCB3aXRoXG4gKiB7QGxpbmsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI2xlbmd0aH0gdG8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgcG9pbnRzXG4gKiBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIHBvaW50LlxuICogQHJldHVybnMge1BvaW50UHJpbWl0aXZlfSBUaGUgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAqXG4gKiBAcGVyZm9ybWFuY2UgRXhwZWN0ZWQgY29uc3RhbnQgdGltZS4gIElmIHBvaW50cyB3ZXJlIHJlbW92ZWQgZnJvbSB0aGUgY29sbGVjdGlvbiBhbmRcbiAqIHtAbGluayBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jdXBkYXRlfSB3YXMgbm90IGNhbGxlZCwgYW4gaW1wbGljaXQgPGNvZGU+TyhuKTwvY29kZT5cbiAqIG9wZXJhdGlvbiBpcyBwZXJmb3JtZWQuXG4gKlxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IFRoaXMgb2JqZWN0IHdhcyBkZXN0cm95ZWQsIGkuZS4sIGRlc3Ryb3koKSB3YXMgY2FsbGVkLlxuICpcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVG9nZ2xlIHRoZSBzaG93IHByb3BlcnR5IG9mIGV2ZXJ5IHBvaW50IGluIHRoZSBjb2xsZWN0aW9uXG4gKiBjb25zdCBsZW4gPSBwb2ludFByaW1pdGl2ZXMubGVuZ3RoO1xuICogZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICogICBjb25zdCBwID0gcG9pbnRQcmltaXRpdmVzLmdldChpKTtcbiAqICAgcC5zaG93ID0gIXAuc2hvdztcbiAqIH1cbiAqXG4gKiBAc2VlIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiNsZW5ndGhcbiAqL1xuUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgaWYgKCFkZWZpbmVkKGluZGV4KSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcImluZGV4IGlzIHJlcXVpcmVkLlwiKTtcbiAgfVxuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICByZW1vdmVQb2ludFByaW1pdGl2ZXModGhpcyk7XG4gIHJldHVybiB0aGlzLl9wb2ludFByaW1pdGl2ZXNbaW5kZXhdO1xufTtcblxuUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLnByb3RvdHlwZS5jb21wdXRlTmV3QnVmZmVyc1VzYWdlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWZmZXJzVXNhZ2UgPSB0aGlzLl9idWZmZXJzVXNhZ2U7XG4gIGxldCB1c2FnZUNoYW5nZWQgPSBmYWxzZTtcblxuICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fcHJvcGVydGllc0NoYW5nZWQ7XG4gIGZvciAobGV0IGsgPSAwOyBrIDwgTlVNQkVSX09GX1BST1BFUlRJRVM7ICsraykge1xuICAgIGNvbnN0IG5ld1VzYWdlID1cbiAgICAgIHByb3BlcnRpZXNba10gPT09IDAgPyBCdWZmZXJVc2FnZS5TVEFUSUNfRFJBVyA6IEJ1ZmZlclVzYWdlLlNUUkVBTV9EUkFXO1xuICAgIHVzYWdlQ2hhbmdlZCA9IHVzYWdlQ2hhbmdlZCB8fCBidWZmZXJzVXNhZ2Vba10gIT09IG5ld1VzYWdlO1xuICAgIGJ1ZmZlcnNVc2FnZVtrXSA9IG5ld1VzYWdlO1xuICB9XG5cbiAgcmV0dXJuIHVzYWdlQ2hhbmdlZDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZBRihjb250ZXh0LCBudW1iZXJPZlBvaW50UHJpbWl0aXZlcywgYnVmZmVyc1VzYWdlKSB7XG4gIHJldHVybiBuZXcgVmVydGV4QXJyYXlGYWNhZGUoXG4gICAgY29udGV4dCxcbiAgICBbXG4gICAgICB7XG4gICAgICAgIGluZGV4OiBhdHRyaWJ1dGVMb2NhdGlvbnMucG9zaXRpb25IaWdoQW5kU2l6ZSxcbiAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogNCxcbiAgICAgICAgY29tcG9uZW50RGF0YXR5cGU6IENvbXBvbmVudERhdGF0eXBlLkZMT0FULFxuICAgICAgICB1c2FnZTogYnVmZmVyc1VzYWdlW1BPU0lUSU9OX0lOREVYXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGluZGV4OiBhdHRyaWJ1dGVMb2NhdGlvbnMucG9zaXRpb25Mb3dBbmRTaG93LFxuICAgICAgICBjb21wb25lbnRzUGVyQXR0cmlidXRlOiA0LFxuICAgICAgICBjb21wb25lbnREYXRhdHlwZTogQ29tcG9uZW50RGF0YXR5cGUuRkxPQVQsXG4gICAgICAgIHVzYWdlOiBidWZmZXJzVXNhZ2VbUE9TSVRJT05fSU5ERVhdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy5jb21wcmVzc2VkQXR0cmlidXRlMCxcbiAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogNCxcbiAgICAgICAgY29tcG9uZW50RGF0YXR5cGU6IENvbXBvbmVudERhdGF0eXBlLkZMT0FULFxuICAgICAgICB1c2FnZTogYnVmZmVyc1VzYWdlW0NPTE9SX0lOREVYXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGluZGV4OiBhdHRyaWJ1dGVMb2NhdGlvbnMuY29tcHJlc3NlZEF0dHJpYnV0ZTEsXG4gICAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDQsXG4gICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgdXNhZ2U6IGJ1ZmZlcnNVc2FnZVtUUkFOU0xVQ0VOQ1lfQllfRElTVEFOQ0VfSU5ERVhdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy5zY2FsZUJ5RGlzdGFuY2UsXG4gICAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDQsXG4gICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgdXNhZ2U6IGJ1ZmZlcnNVc2FnZVtTQ0FMRV9CWV9ESVNUQU5DRV9JTkRFWF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpbmRleDpcbiAgICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMuZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGlzYWJsZURlcHRoQW5kU3BsaXREaXJlY3Rpb24sXG4gICAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDQsXG4gICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgdXNhZ2U6IGJ1ZmZlcnNVc2FnZVtESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTl9JTkRFWF0sXG4gICAgICB9LFxuICAgIF0sXG4gICAgbnVtYmVyT2ZQb2ludFByaW1pdGl2ZXMsXG4gICk7IC8vIDEgdmVydGV4IHBlciBwb2ludFByaW1pdGl2ZVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gUEVSRk9STUFOQ0VfSURFQTogIFNhdmUgbWVtb3J5IGlmIGEgcHJvcGVydHkgaXMgdGhlIHNhbWUgZm9yIGFsbCBwb2ludFByaW1pdGl2ZXMsIHVzZSBhIGxhdGNoZWQgYXR0cmlidXRlIHN0YXRlLFxuLy8gaW5zdGVhZCBvZiBzdG9yaW5nIGl0IGluIGEgdmVydGV4IGJ1ZmZlci5cblxuY29uc3Qgd3JpdGVQb3NpdGlvblNjcmF0Y2ggPSBuZXcgRW5jb2RlZENhcnRlc2lhbjMoKTtcblxuZnVuY3Rpb24gd3JpdGVQb3NpdGlvblNpemVBbmRPdXRsaW5lKFxuICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24sXG4gIGNvbnRleHQsXG4gIHZhZldyaXRlcnMsXG4gIHBvaW50UHJpbWl0aXZlLFxuKSB7XG4gIGNvbnN0IGkgPSBwb2ludFByaW1pdGl2ZS5faW5kZXg7XG4gIGNvbnN0IHBvc2l0aW9uID0gcG9pbnRQcmltaXRpdmUuX2dldEFjdHVhbFBvc2l0aW9uKCk7XG5cbiAgaWYgKHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fbW9kZSA9PT0gU2NlbmVNb2RlLlNDRU5FM0QpIHtcbiAgICBCb3VuZGluZ1NwaGVyZS5leHBhbmQoXG4gICAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX2Jhc2VWb2x1bWUsXG4gICAgICBwb3NpdGlvbixcbiAgICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fYmFzZVZvbHVtZSxcbiAgICApO1xuICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fYm91bmRpbmdWb2x1bWVEaXJ0eSA9IHRydWU7XG4gIH1cblxuICBFbmNvZGVkQ2FydGVzaWFuMy5mcm9tQ2FydGVzaWFuKHBvc2l0aW9uLCB3cml0ZVBvc2l0aW9uU2NyYXRjaCk7XG4gIGNvbnN0IHBpeGVsU2l6ZSA9IHBvaW50UHJpbWl0aXZlLnBpeGVsU2l6ZTtcbiAgY29uc3Qgb3V0bGluZVdpZHRoID0gcG9pbnRQcmltaXRpdmUub3V0bGluZVdpZHRoO1xuXG4gIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fbWF4UGl4ZWxTaXplID0gTWF0aC5tYXgoXG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9tYXhQaXhlbFNpemUsXG4gICAgcGl4ZWxTaXplICsgb3V0bGluZVdpZHRoLFxuICApO1xuXG4gIGNvbnN0IHBvc2l0aW9uSGlnaFdyaXRlciA9IHZhZldyaXRlcnNbYXR0cmlidXRlTG9jYXRpb25zLnBvc2l0aW9uSGlnaEFuZFNpemVdO1xuICBjb25zdCBoaWdoID0gd3JpdGVQb3NpdGlvblNjcmF0Y2guaGlnaDtcbiAgcG9zaXRpb25IaWdoV3JpdGVyKGksIGhpZ2gueCwgaGlnaC55LCBoaWdoLnosIHBpeGVsU2l6ZSk7XG5cbiAgY29uc3QgcG9zaXRpb25Mb3dXcml0ZXIgPVxuICAgIHZhZldyaXRlcnNbYXR0cmlidXRlTG9jYXRpb25zLnBvc2l0aW9uTG93QW5kT3V0bGluZV07XG4gIGNvbnN0IGxvdyA9IHdyaXRlUG9zaXRpb25TY3JhdGNoLmxvdztcbiAgcG9zaXRpb25Mb3dXcml0ZXIoaSwgbG93LngsIGxvdy55LCBsb3cueiwgb3V0bGluZVdpZHRoKTtcbn1cblxuY29uc3QgTEVGVF9TSElGVDE2ID0gNjU1MzYuMDsgLy8gMl4xNlxuY29uc3QgTEVGVF9TSElGVDggPSAyNTYuMDsgLy8gMl44XG5cbmZ1bmN0aW9uIHdyaXRlQ29tcHJlc3NlZEF0dHJpYjAoXG4gIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbixcbiAgY29udGV4dCxcbiAgdmFmV3JpdGVycyxcbiAgcG9pbnRQcmltaXRpdmUsXG4pIHtcbiAgY29uc3QgaSA9IHBvaW50UHJpbWl0aXZlLl9pbmRleDtcblxuICBjb25zdCBjb2xvciA9IHBvaW50UHJpbWl0aXZlLmNvbG9yO1xuICBjb25zdCBwaWNrQ29sb3IgPSBwb2ludFByaW1pdGl2ZS5nZXRQaWNrSWQoY29udGV4dCkuY29sb3I7XG4gIGNvbnN0IG91dGxpbmVDb2xvciA9IHBvaW50UHJpbWl0aXZlLm91dGxpbmVDb2xvcjtcblxuICBsZXQgcmVkID0gQ29sb3IuZmxvYXRUb0J5dGUoY29sb3IucmVkKTtcbiAgbGV0IGdyZWVuID0gQ29sb3IuZmxvYXRUb0J5dGUoY29sb3IuZ3JlZW4pO1xuICBsZXQgYmx1ZSA9IENvbG9yLmZsb2F0VG9CeXRlKGNvbG9yLmJsdWUpO1xuICBjb25zdCBjb21wcmVzc2VkMCA9IHJlZCAqIExFRlRfU0hJRlQxNiArIGdyZWVuICogTEVGVF9TSElGVDggKyBibHVlO1xuXG4gIHJlZCA9IENvbG9yLmZsb2F0VG9CeXRlKG91dGxpbmVDb2xvci5yZWQpO1xuICBncmVlbiA9IENvbG9yLmZsb2F0VG9CeXRlKG91dGxpbmVDb2xvci5ncmVlbik7XG4gIGJsdWUgPSBDb2xvci5mbG9hdFRvQnl0ZShvdXRsaW5lQ29sb3IuYmx1ZSk7XG4gIGNvbnN0IGNvbXByZXNzZWQxID0gcmVkICogTEVGVF9TSElGVDE2ICsgZ3JlZW4gKiBMRUZUX1NISUZUOCArIGJsdWU7XG5cbiAgcmVkID0gQ29sb3IuZmxvYXRUb0J5dGUocGlja0NvbG9yLnJlZCk7XG4gIGdyZWVuID0gQ29sb3IuZmxvYXRUb0J5dGUocGlja0NvbG9yLmdyZWVuKTtcbiAgYmx1ZSA9IENvbG9yLmZsb2F0VG9CeXRlKHBpY2tDb2xvci5ibHVlKTtcbiAgY29uc3QgY29tcHJlc3NlZDIgPSByZWQgKiBMRUZUX1NISUZUMTYgKyBncmVlbiAqIExFRlRfU0hJRlQ4ICsgYmx1ZTtcblxuICBjb25zdCBjb21wcmVzc2VkMyA9XG4gICAgQ29sb3IuZmxvYXRUb0J5dGUoY29sb3IuYWxwaGEpICogTEVGVF9TSElGVDE2ICtcbiAgICBDb2xvci5mbG9hdFRvQnl0ZShvdXRsaW5lQ29sb3IuYWxwaGEpICogTEVGVF9TSElGVDggK1xuICAgIENvbG9yLmZsb2F0VG9CeXRlKHBpY2tDb2xvci5hbHBoYSk7XG5cbiAgY29uc3Qgd3JpdGVyID0gdmFmV3JpdGVyc1thdHRyaWJ1dGVMb2NhdGlvbnMuY29tcHJlc3NlZEF0dHJpYnV0ZTBdO1xuICB3cml0ZXIoaSwgY29tcHJlc3NlZDAsIGNvbXByZXNzZWQxLCBjb21wcmVzc2VkMiwgY29tcHJlc3NlZDMpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUNvbXByZXNzZWRBdHRyaWIxKFxuICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24sXG4gIGNvbnRleHQsXG4gIHZhZldyaXRlcnMsXG4gIHBvaW50UHJpbWl0aXZlLFxuKSB7XG4gIGNvbnN0IGkgPSBwb2ludFByaW1pdGl2ZS5faW5kZXg7XG5cbiAgbGV0IG5lYXIgPSAwLjA7XG4gIGxldCBuZWFyVmFsdWUgPSAxLjA7XG4gIGxldCBmYXIgPSAxLjA7XG4gIGxldCBmYXJWYWx1ZSA9IDEuMDtcblxuICBjb25zdCB0cmFuc2x1Y2VuY3kgPSBwb2ludFByaW1pdGl2ZS50cmFuc2x1Y2VuY3lCeURpc3RhbmNlO1xuICBpZiAoZGVmaW5lZCh0cmFuc2x1Y2VuY3kpKSB7XG4gICAgbmVhciA9IHRyYW5zbHVjZW5jeS5uZWFyO1xuICAgIG5lYXJWYWx1ZSA9IHRyYW5zbHVjZW5jeS5uZWFyVmFsdWU7XG4gICAgZmFyID0gdHJhbnNsdWNlbmN5LmZhcjtcbiAgICBmYXJWYWx1ZSA9IHRyYW5zbHVjZW5jeS5mYXJWYWx1ZTtcblxuICAgIGlmIChuZWFyVmFsdWUgIT09IDEuMCB8fCBmYXJWYWx1ZSAhPT0gMS4wKSB7XG4gICAgICAvLyB0cmFuc2x1Y2VuY3kgYnkgZGlzdGFuY2UgY2FsY3VsYXRpb24gaW4gc2hhZGVyIG5lZWQgbm90IGJlIGVuYWJsZWRcbiAgICAgIC8vIHVudGlsIGEgcG9pbnRQcmltaXRpdmUgd2l0aCBuZWFyIGFuZCBmYXIgIT09IDEuMCBpcyBmb3VuZFxuICAgICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9zaGFkZXJUcmFuc2x1Y2VuY3lCeURpc3RhbmNlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBsZXQgc2hvdyA9IHBvaW50UHJpbWl0aXZlLnNob3cgJiYgcG9pbnRQcmltaXRpdmUuY2x1c3RlclNob3c7XG5cbiAgLy8gSWYgdGhlIGNvbG9yIGFscGhhcyBhcmUgemVybywgZG8gbm90IHNob3cgdGhpcyBwb2ludFByaW1pdGl2ZS4gIFRoaXMgbGV0cyB1cyBhdm9pZCBwcm92aWRpbmdcbiAgLy8gY29sb3IgZHVyaW5nIHRoZSBwaWNrIHBhc3MgYW5kIGFsc28gZWxpbWluYXRlcyBhIGRpc2NhcmQgaW4gdGhlIGZyYWdtZW50IHNoYWRlci5cbiAgaWYgKFxuICAgIHBvaW50UHJpbWl0aXZlLmNvbG9yLmFscGhhID09PSAwLjAgJiZcbiAgICBwb2ludFByaW1pdGl2ZS5vdXRsaW5lQ29sb3IuYWxwaGEgPT09IDAuMFxuICApIHtcbiAgICBzaG93ID0gZmFsc2U7XG4gIH1cblxuICBuZWFyVmFsdWUgPSBDZXNpdW1NYXRoLmNsYW1wKG5lYXJWYWx1ZSwgMC4wLCAxLjApO1xuICBuZWFyVmFsdWUgPSBuZWFyVmFsdWUgPT09IDEuMCA/IDI1NS4wIDogKG5lYXJWYWx1ZSAqIDI1NS4wKSB8IDA7XG4gIGNvbnN0IGNvbXByZXNzZWQwID0gKHNob3cgPyAxLjAgOiAwLjApICogTEVGVF9TSElGVDggKyBuZWFyVmFsdWU7XG5cbiAgZmFyVmFsdWUgPSBDZXNpdW1NYXRoLmNsYW1wKGZhclZhbHVlLCAwLjAsIDEuMCk7XG4gIGZhclZhbHVlID0gZmFyVmFsdWUgPT09IDEuMCA/IDI1NS4wIDogKGZhclZhbHVlICogMjU1LjApIHwgMDtcbiAgY29uc3QgY29tcHJlc3NlZDEgPSBmYXJWYWx1ZTtcblxuICBjb25zdCB3cml0ZXIgPSB2YWZXcml0ZXJzW2F0dHJpYnV0ZUxvY2F0aW9ucy5jb21wcmVzc2VkQXR0cmlidXRlMV07XG4gIHdyaXRlcihpLCBjb21wcmVzc2VkMCwgY29tcHJlc3NlZDEsIG5lYXIsIGZhcik7XG59XG5cbmZ1bmN0aW9uIHdyaXRlU2NhbGVCeURpc3RhbmNlKFxuICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24sXG4gIGNvbnRleHQsXG4gIHZhZldyaXRlcnMsXG4gIHBvaW50UHJpbWl0aXZlLFxuKSB7XG4gIGNvbnN0IGkgPSBwb2ludFByaW1pdGl2ZS5faW5kZXg7XG4gIGNvbnN0IHdyaXRlciA9IHZhZldyaXRlcnNbYXR0cmlidXRlTG9jYXRpb25zLnNjYWxlQnlEaXN0YW5jZV07XG4gIGxldCBuZWFyID0gMC4wO1xuICBsZXQgbmVhclZhbHVlID0gMS4wO1xuICBsZXQgZmFyID0gMS4wO1xuICBsZXQgZmFyVmFsdWUgPSAxLjA7XG5cbiAgY29uc3Qgc2NhbGUgPSBwb2ludFByaW1pdGl2ZS5zY2FsZUJ5RGlzdGFuY2U7XG4gIGlmIChkZWZpbmVkKHNjYWxlKSkge1xuICAgIG5lYXIgPSBzY2FsZS5uZWFyO1xuICAgIG5lYXJWYWx1ZSA9IHNjYWxlLm5lYXJWYWx1ZTtcbiAgICBmYXIgPSBzY2FsZS5mYXI7XG4gICAgZmFyVmFsdWUgPSBzY2FsZS5mYXJWYWx1ZTtcblxuICAgIGlmIChuZWFyVmFsdWUgIT09IDEuMCB8fCBmYXJWYWx1ZSAhPT0gMS4wKSB7XG4gICAgICAvLyBzY2FsZSBieSBkaXN0YW5jZSBjYWxjdWxhdGlvbiBpbiBzaGFkZXIgbmVlZCBub3QgYmUgZW5hYmxlZFxuICAgICAgLy8gdW50aWwgYSBwb2ludFByaW1pdGl2ZSB3aXRoIG5lYXIgYW5kIGZhciAhPT0gMS4wIGlzIGZvdW5kXG4gICAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX3NoYWRlclNjYWxlQnlEaXN0YW5jZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVyKGksIG5lYXIsIG5lYXJWYWx1ZSwgZmFyLCBmYXJWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGVwdGhEaXNhYmxlQW5kU3BsaXREaXJlY3Rpb24oXG4gIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbixcbiAgY29udGV4dCxcbiAgdmFmV3JpdGVycyxcbiAgcG9pbnRQcmltaXRpdmUsXG4pIHtcbiAgY29uc3QgaSA9IHBvaW50UHJpbWl0aXZlLl9pbmRleDtcbiAgY29uc3Qgd3JpdGVyID1cbiAgICB2YWZXcml0ZXJzW1xuICAgICAgYXR0cmlidXRlTG9jYXRpb25zXG4gICAgICAgIC5kaXN0YW5jZURpc3BsYXlDb25kaXRpb25BbmREaXNhYmxlRGVwdGhBbmRTcGxpdERpcmVjdGlvblxuICAgIF07XG4gIGxldCBuZWFyID0gMC4wO1xuICBsZXQgZmFyID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICBjb25zdCBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSBwb2ludFByaW1pdGl2ZS5kaXN0YW5jZURpc3BsYXlDb25kaXRpb247XG4gIGlmIChkZWZpbmVkKGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbikpIHtcbiAgICBuZWFyID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLm5lYXI7XG4gICAgZmFyID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLmZhcjtcblxuICAgIG5lYXIgKj0gbmVhcjtcbiAgICBmYXIgKj0gZmFyO1xuXG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9zaGFkZXJEaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSB0cnVlO1xuICB9XG5cbiAgbGV0IGRpc2FibGVEZXB0aFRlc3REaXN0YW5jZSA9IHBvaW50UHJpbWl0aXZlLmRpc2FibGVEZXB0aFRlc3REaXN0YW5jZTtcbiAgZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlICo9IGRpc2FibGVEZXB0aFRlc3REaXN0YW5jZTtcbiAgaWYgKGRpc2FibGVEZXB0aFRlc3REaXN0YW5jZSA+IDAuMCkge1xuICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fc2hhZGVyRGlzYWJsZURlcHRoRGlzdGFuY2UgPSB0cnVlO1xuICAgIGlmIChkaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlID0gLTEuMDtcbiAgICB9XG4gIH1cblxuICBsZXQgZGlyZWN0aW9uID0gMC4wO1xuICBjb25zdCBzcGxpdCA9IHBvaW50UHJpbWl0aXZlLnNwbGl0RGlyZWN0aW9uO1xuICBpZiAoZGVmaW5lZChzcGxpdCkpIHtcbiAgICBkaXJlY3Rpb24gPSBzcGxpdDtcbiAgfVxuICB3cml0ZXIoaSwgbmVhciwgZmFyLCBkaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UsIGRpcmVjdGlvbik7XG59XG5cbmZ1bmN0aW9uIHdyaXRlUG9pbnRQcmltaXRpdmUoXG4gIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbixcbiAgY29udGV4dCxcbiAgdmFmV3JpdGVycyxcbiAgcG9pbnRQcmltaXRpdmUsXG4pIHtcbiAgd3JpdGVQb3NpdGlvblNpemVBbmRPdXRsaW5lKFxuICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbixcbiAgICBjb250ZXh0LFxuICAgIHZhZldyaXRlcnMsXG4gICAgcG9pbnRQcmltaXRpdmUsXG4gICk7XG4gIHdyaXRlQ29tcHJlc3NlZEF0dHJpYjAoXG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLFxuICAgIGNvbnRleHQsXG4gICAgdmFmV3JpdGVycyxcbiAgICBwb2ludFByaW1pdGl2ZSxcbiAgKTtcbiAgd3JpdGVDb21wcmVzc2VkQXR0cmliMShcbiAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24sXG4gICAgY29udGV4dCxcbiAgICB2YWZXcml0ZXJzLFxuICAgIHBvaW50UHJpbWl0aXZlLFxuICApO1xuICB3cml0ZVNjYWxlQnlEaXN0YW5jZShcbiAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24sXG4gICAgY29udGV4dCxcbiAgICB2YWZXcml0ZXJzLFxuICAgIHBvaW50UHJpbWl0aXZlLFxuICApO1xuICB3cml0ZURpc3RhbmNlRGlzcGxheUNvbmRpdGlvbkFuZERlcHRoRGlzYWJsZUFuZFNwbGl0RGlyZWN0aW9uKFxuICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbixcbiAgICBjb250ZXh0LFxuICAgIHZhZldyaXRlcnMsXG4gICAgcG9pbnRQcmltaXRpdmUsXG4gICk7XG59XG5cbmZ1bmN0aW9uIHJlY29tcHV0ZUFjdHVhbFBvc2l0aW9ucyhcbiAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLFxuICBwb2ludFByaW1pdGl2ZXMsXG4gIGxlbmd0aCxcbiAgZnJhbWVTdGF0ZSxcbiAgbW9kZWxNYXRyaXgsXG4gIHJlY29tcHV0ZUJvdW5kaW5nVm9sdW1lLFxuKSB7XG4gIGxldCBib3VuZGluZ1ZvbHVtZTtcbiAgaWYgKGZyYW1lU3RhdGUubW9kZSA9PT0gU2NlbmVNb2RlLlNDRU5FM0QpIHtcbiAgICBib3VuZGluZ1ZvbHVtZSA9IHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fYmFzZVZvbHVtZTtcbiAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX2JvdW5kaW5nVm9sdW1lRGlydHkgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGJvdW5kaW5nVm9sdW1lID0gcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9iYXNlVm9sdW1lMkQ7XG4gIH1cblxuICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBvaW50UHJpbWl0aXZlID0gcG9pbnRQcmltaXRpdmVzW2ldO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gcG9pbnRQcmltaXRpdmUucG9zaXRpb247XG4gICAgY29uc3QgYWN0dWFsUG9zaXRpb24gPSBQb2ludFByaW1pdGl2ZS5fY29tcHV0ZUFjdHVhbFBvc2l0aW9uKFxuICAgICAgcG9zaXRpb24sXG4gICAgICBmcmFtZVN0YXRlLFxuICAgICAgbW9kZWxNYXRyaXgsXG4gICAgKTtcbiAgICBpZiAoZGVmaW5lZChhY3R1YWxQb3NpdGlvbikpIHtcbiAgICAgIHBvaW50UHJpbWl0aXZlLl9zZXRBY3R1YWxQb3NpdGlvbihhY3R1YWxQb3NpdGlvbik7XG5cbiAgICAgIGlmIChyZWNvbXB1dGVCb3VuZGluZ1ZvbHVtZSkge1xuICAgICAgICBwb3NpdGlvbnMucHVzaChhY3R1YWxQb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBCb3VuZGluZ1NwaGVyZS5leHBhbmQoYm91bmRpbmdWb2x1bWUsIGFjdHVhbFBvc2l0aW9uLCBib3VuZGluZ1ZvbHVtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlY29tcHV0ZUJvdW5kaW5nVm9sdW1lKSB7XG4gICAgQm91bmRpbmdTcGhlcmUuZnJvbVBvaW50cyhwb3NpdGlvbnMsIGJvdW5kaW5nVm9sdW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVNb2RlKHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiwgZnJhbWVTdGF0ZSkge1xuICBjb25zdCBtb2RlID0gZnJhbWVTdGF0ZS5tb2RlO1xuXG4gIGNvbnN0IHBvaW50UHJpbWl0aXZlcyA9IHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fcG9pbnRQcmltaXRpdmVzO1xuICBjb25zdCBwb2ludFByaW1pdGl2ZXNUb1VwZGF0ZSA9XG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9wb2ludFByaW1pdGl2ZXNUb1VwZGF0ZTtcbiAgY29uc3QgbW9kZWxNYXRyaXggPSBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX21vZGVsTWF0cml4O1xuXG4gIGlmIChcbiAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX2NyZWF0ZVZlcnRleEFycmF5IHx8XG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9tb2RlICE9PSBtb2RlIHx8XG4gICAgKG1vZGUgIT09IFNjZW5lTW9kZS5TQ0VORTNEICYmXG4gICAgICAhTWF0cml4NC5lcXVhbHMobW9kZWxNYXRyaXgsIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5tb2RlbE1hdHJpeCkpXG4gICkge1xuICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5fbW9kZSA9IG1vZGU7XG4gICAgTWF0cml4NC5jbG9uZShwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ubW9kZWxNYXRyaXgsIG1vZGVsTWF0cml4KTtcbiAgICBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24uX2NyZWF0ZVZlcnRleEFycmF5ID0gdHJ1ZTtcblxuICAgIGlmIChcbiAgICAgIG1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTNEIHx8XG4gICAgICBtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUyRCB8fFxuICAgICAgbW9kZSA9PT0gU2NlbmVNb2RlLkNPTFVNQlVTX1ZJRVdcbiAgICApIHtcbiAgICAgIHJlY29tcHV0ZUFjdHVhbFBvc2l0aW9ucyhcbiAgICAgICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLFxuICAgICAgICBwb2ludFByaW1pdGl2ZXMsXG4gICAgICAgIHBvaW50UHJpbWl0aXZlcy5sZW5ndGgsXG4gICAgICAgIGZyYW1lU3RhdGUsXG4gICAgICAgIG1vZGVsTWF0cml4LFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobW9kZSA9PT0gU2NlbmVNb2RlLk1PUlBISU5HKSB7XG4gICAgcmVjb21wdXRlQWN0dWFsUG9zaXRpb25zKFxuICAgICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLFxuICAgICAgcG9pbnRQcmltaXRpdmVzLFxuICAgICAgcG9pbnRQcmltaXRpdmVzLmxlbmd0aCxcbiAgICAgIGZyYW1lU3RhdGUsXG4gICAgICBtb2RlbE1hdHJpeCxcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfSBlbHNlIGlmIChtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUyRCB8fCBtb2RlID09PSBTY2VuZU1vZGUuQ09MVU1CVVNfVklFVykge1xuICAgIHJlY29tcHV0ZUFjdHVhbFBvc2l0aW9ucyhcbiAgICAgIHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbixcbiAgICAgIHBvaW50UHJpbWl0aXZlc1RvVXBkYXRlLFxuICAgICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl9wb2ludFByaW1pdGl2ZXNUb1VwZGF0ZUluZGV4LFxuICAgICAgZnJhbWVTdGF0ZSxcbiAgICAgIG1vZGVsTWF0cml4LFxuICAgICAgZmFsc2UsXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVCb3VuZGluZ1ZvbHVtZShjb2xsZWN0aW9uLCBmcmFtZVN0YXRlLCBib3VuZGluZ1ZvbHVtZSkge1xuICBjb25zdCBwaXhlbFNpemUgPSBmcmFtZVN0YXRlLmNhbWVyYS5nZXRQaXhlbFNpemUoXG4gICAgYm91bmRpbmdWb2x1bWUsXG4gICAgZnJhbWVTdGF0ZS5jb250ZXh0LmRyYXdpbmdCdWZmZXJXaWR0aCxcbiAgICBmcmFtZVN0YXRlLmNvbnRleHQuZHJhd2luZ0J1ZmZlckhlaWdodCxcbiAgKTtcbiAgY29uc3Qgc2l6ZSA9IHBpeGVsU2l6ZSAqIGNvbGxlY3Rpb24uX21heFBpeGVsU2l6ZTtcbiAgYm91bmRpbmdWb2x1bWUucmFkaXVzICs9IHNpemU7XG59XG5cbmNvbnN0IHNjcmF0Y2hXcml0ZXJBcnJheSA9IFtdO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGZyYW1lU3RhdGUpIHtcbiAgcmVtb3ZlUG9pbnRQcmltaXRpdmVzKHRoaXMpO1xuXG4gIGlmICghdGhpcy5zaG93KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fbWF4VG90YWxQb2ludFNpemUgPSBDb250ZXh0TGltaXRzLm1heGltdW1BbGlhc2VkUG9pbnRTaXplO1xuXG4gIHVwZGF0ZU1vZGUodGhpcywgZnJhbWVTdGF0ZSk7XG5cbiAgY29uc3QgcG9pbnRQcmltaXRpdmVzID0gdGhpcy5fcG9pbnRQcmltaXRpdmVzO1xuICBjb25zdCBwb2ludFByaW1pdGl2ZXNMZW5ndGggPSBwb2ludFByaW1pdGl2ZXMubGVuZ3RoO1xuICBjb25zdCBwb2ludFByaW1pdGl2ZXNUb1VwZGF0ZSA9IHRoaXMuX3BvaW50UHJpbWl0aXZlc1RvVXBkYXRlO1xuICBjb25zdCBwb2ludFByaW1pdGl2ZXNUb1VwZGF0ZUxlbmd0aCA9IHRoaXMuX3BvaW50UHJpbWl0aXZlc1RvVXBkYXRlSW5kZXg7XG5cbiAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuX3Byb3BlcnRpZXNDaGFuZ2VkO1xuXG4gIGNvbnN0IGNyZWF0ZVZlcnRleEFycmF5ID0gdGhpcy5fY3JlYXRlVmVydGV4QXJyYXk7XG5cbiAgbGV0IHZhZldyaXRlcnM7XG4gIGNvbnN0IGNvbnRleHQgPSBmcmFtZVN0YXRlLmNvbnRleHQ7XG4gIGNvbnN0IHBhc3MgPSBmcmFtZVN0YXRlLnBhc3NlcztcbiAgY29uc3QgcGlja2luZyA9IHBhc3MucGljaztcblxuICAvLyBQRVJGT1JNQU5DRV9JREVBOiBSb3VuZCByb2JpbiBtdWx0aXBsZSBidWZmZXJzLlxuICBpZiAoY3JlYXRlVmVydGV4QXJyYXkgfHwgKCFwaWNraW5nICYmIHRoaXMuY29tcHV0ZU5ld0J1ZmZlcnNVc2FnZSgpKSkge1xuICAgIHRoaXMuX2NyZWF0ZVZlcnRleEFycmF5ID0gZmFsc2U7XG5cbiAgICBmb3IgKGxldCBrID0gMDsgayA8IE5VTUJFUl9PRl9QUk9QRVJUSUVTOyArK2spIHtcbiAgICAgIHByb3BlcnRpZXNba10gPSAwO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhZiA9IHRoaXMuX3ZhZiAmJiB0aGlzLl92YWYuZGVzdHJveSgpO1xuXG4gICAgaWYgKHBvaW50UHJpbWl0aXZlc0xlbmd0aCA+IDApIHtcbiAgICAgIC8vIFBFUkZPUk1BTkNFX0lERUE6ICBJbnN0ZWFkIG9mIGNyZWF0aW5nIGEgbmV3IG9uZSwgcmVzaXplIGxpa2Ugc3RkOjp2ZWN0b3IuXG4gICAgICB0aGlzLl92YWYgPSBjcmVhdGVWQUYoY29udGV4dCwgcG9pbnRQcmltaXRpdmVzTGVuZ3RoLCB0aGlzLl9idWZmZXJzVXNhZ2UpO1xuICAgICAgdmFmV3JpdGVycyA9IHRoaXMuX3ZhZi53cml0ZXJzO1xuXG4gICAgICAvLyBSZXdyaXRlIGVudGlyZSBidWZmZXIgaWYgcG9pbnRQcmltaXRpdmVzIHdlcmUgYWRkZWQgb3IgcmVtb3ZlZC5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRQcmltaXRpdmVzTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgcG9pbnRQcmltaXRpdmUgPSB0aGlzLl9wb2ludFByaW1pdGl2ZXNbaV07XG4gICAgICAgIHBvaW50UHJpbWl0aXZlLl9kaXJ0eSA9IGZhbHNlOyAvLyBJbiBjYXNlIGl0IG5lZWRlZCBhbiB1cGRhdGUuXG4gICAgICAgIHdyaXRlUG9pbnRQcmltaXRpdmUodGhpcywgY29udGV4dCwgdmFmV3JpdGVycywgcG9pbnRQcmltaXRpdmUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl92YWYuY29tbWl0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcG9pbnRQcmltaXRpdmVzVG9VcGRhdGVJbmRleCA9IDA7XG4gIH0gZWxzZSBpZiAocG9pbnRQcmltaXRpdmVzVG9VcGRhdGVMZW5ndGggPiAwKSB7XG4gICAgLy8gUG9pbnRQcmltaXRpdmVzIHdlcmUgbW9kaWZpZWQsIGJ1dCBub25lIHdlcmUgYWRkZWQgb3IgcmVtb3ZlZC5cbiAgICBjb25zdCB3cml0ZXJzID0gc2NyYXRjaFdyaXRlckFycmF5O1xuICAgIHdyaXRlcnMubGVuZ3RoID0gMDtcblxuICAgIGlmIChcbiAgICAgIHByb3BlcnRpZXNbUE9TSVRJT05fSU5ERVhdIHx8XG4gICAgICBwcm9wZXJ0aWVzW09VVExJTkVfV0lEVEhfSU5ERVhdIHx8XG4gICAgICBwcm9wZXJ0aWVzW1BJWEVMX1NJWkVfSU5ERVhdXG4gICAgKSB7XG4gICAgICB3cml0ZXJzLnB1c2god3JpdGVQb3NpdGlvblNpemVBbmRPdXRsaW5lKTtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllc1tDT0xPUl9JTkRFWF0gfHwgcHJvcGVydGllc1tPVVRMSU5FX0NPTE9SX0lOREVYXSkge1xuICAgICAgd3JpdGVycy5wdXNoKHdyaXRlQ29tcHJlc3NlZEF0dHJpYjApO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzW1NIT1dfSU5ERVhdIHx8IHByb3BlcnRpZXNbVFJBTlNMVUNFTkNZX0JZX0RJU1RBTkNFX0lOREVYXSkge1xuICAgICAgd3JpdGVycy5wdXNoKHdyaXRlQ29tcHJlc3NlZEF0dHJpYjEpO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzW1NDQUxFX0JZX0RJU1RBTkNFX0lOREVYXSkge1xuICAgICAgd3JpdGVycy5wdXNoKHdyaXRlU2NhbGVCeURpc3RhbmNlKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBwcm9wZXJ0aWVzW0RJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OX0lOREVYXSB8fFxuICAgICAgcHJvcGVydGllc1tESVNBQkxFX0RFUFRIX0RJU1RBTkNFX0lOREVYXSB8fFxuICAgICAgcHJvcGVydGllc1tTUExJVF9ESVJFQ1RJT05fSU5ERVhdXG4gICAgKSB7XG4gICAgICB3cml0ZXJzLnB1c2goXG4gICAgICAgIHdyaXRlRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uQW5kRGVwdGhEaXNhYmxlQW5kU3BsaXREaXJlY3Rpb24sXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG51bVdyaXRlcnMgPSB3cml0ZXJzLmxlbmd0aDtcblxuICAgIHZhZldyaXRlcnMgPSB0aGlzLl92YWYud3JpdGVycztcblxuICAgIGlmIChwb2ludFByaW1pdGl2ZXNUb1VwZGF0ZUxlbmd0aCAvIHBvaW50UHJpbWl0aXZlc0xlbmd0aCA+IDAuMSkge1xuICAgICAgLy8gSWYgbW9yZSB0aGFuIDEwJSBvZiBwb2ludFByaW1pdGl2ZSBjaGFuZ2UsIHJld3JpdGUgdGhlIGVudGlyZSBidWZmZXIuXG5cbiAgICAgIC8vIFBFUkZPUk1BTkNFX0lERUE6ICBJIHRvdGFsbHkgbWFkZSB1cCAxMCUgOikuXG5cbiAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgcG9pbnRQcmltaXRpdmVzVG9VcGRhdGVMZW5ndGg7ICsrbSkge1xuICAgICAgICBjb25zdCBiID0gcG9pbnRQcmltaXRpdmVzVG9VcGRhdGVbbV07XG4gICAgICAgIGIuX2RpcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBudW1Xcml0ZXJzOyArK24pIHtcbiAgICAgICAgICB3cml0ZXJzW25dKHRoaXMsIGNvbnRleHQsIHZhZldyaXRlcnMsIGIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl92YWYuY29tbWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgcG9pbnRQcmltaXRpdmVzVG9VcGRhdGVMZW5ndGg7ICsraCkge1xuICAgICAgICBjb25zdCBiYiA9IHBvaW50UHJpbWl0aXZlc1RvVXBkYXRlW2hdO1xuICAgICAgICBiYi5fZGlydHkgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IG51bVdyaXRlcnM7ICsrbykge1xuICAgICAgICAgIHdyaXRlcnNbb10odGhpcywgY29udGV4dCwgdmFmV3JpdGVycywgYmIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhZi5zdWJDb21taXQoYmIuX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3ZhZi5lbmRTdWJDb21taXRzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcG9pbnRQcmltaXRpdmVzVG9VcGRhdGVJbmRleCA9IDA7XG4gIH1cblxuICAvLyBJZiB0aGUgbnVtYmVyIG9mIHRvdGFsIHBvaW50UHJpbWl0aXZlcyBldmVyIHNocmlua3MgY29uc2lkZXJhYmx5XG4gIC8vIFRydW5jYXRlIHBvaW50UHJpbWl0aXZlc1RvVXBkYXRlIHNvIHRoYXQgd2UgZnJlZSBtZW1vcnkgdGhhdCB3ZSdyZVxuICAvLyBub3QgZ29pbmcgdG8gYmUgdXNpbmcuXG4gIGlmIChwb2ludFByaW1pdGl2ZXNUb1VwZGF0ZUxlbmd0aCA+IHBvaW50UHJpbWl0aXZlc0xlbmd0aCAqIDEuNSkge1xuICAgIHBvaW50UHJpbWl0aXZlc1RvVXBkYXRlLmxlbmd0aCA9IHBvaW50UHJpbWl0aXZlc0xlbmd0aDtcbiAgfVxuXG4gIGlmICghZGVmaW5lZCh0aGlzLl92YWYpIHx8ICFkZWZpbmVkKHRoaXMuX3ZhZi52YSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5fYm91bmRpbmdWb2x1bWVEaXJ0eSkge1xuICAgIHRoaXMuX2JvdW5kaW5nVm9sdW1lRGlydHkgPSBmYWxzZTtcbiAgICBCb3VuZGluZ1NwaGVyZS50cmFuc2Zvcm0oXG4gICAgICB0aGlzLl9iYXNlVm9sdW1lLFxuICAgICAgdGhpcy5tb2RlbE1hdHJpeCxcbiAgICAgIHRoaXMuX2Jhc2VWb2x1bWVXQyxcbiAgICApO1xuICB9XG5cbiAgbGV0IGJvdW5kaW5nVm9sdW1lO1xuICBsZXQgbW9kZWxNYXRyaXggPSBNYXRyaXg0LklERU5USVRZO1xuICBpZiAoZnJhbWVTdGF0ZS5tb2RlID09PSBTY2VuZU1vZGUuU0NFTkUzRCkge1xuICAgIG1vZGVsTWF0cml4ID0gdGhpcy5tb2RlbE1hdHJpeDtcbiAgICBib3VuZGluZ1ZvbHVtZSA9IEJvdW5kaW5nU3BoZXJlLmNsb25lKFxuICAgICAgdGhpcy5fYmFzZVZvbHVtZVdDLFxuICAgICAgdGhpcy5fYm91bmRpbmdWb2x1bWUsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBib3VuZGluZ1ZvbHVtZSA9IEJvdW5kaW5nU3BoZXJlLmNsb25lKFxuICAgICAgdGhpcy5fYmFzZVZvbHVtZTJELFxuICAgICAgdGhpcy5fYm91bmRpbmdWb2x1bWUsXG4gICAgKTtcbiAgfVxuICB1cGRhdGVCb3VuZGluZ1ZvbHVtZSh0aGlzLCBmcmFtZVN0YXRlLCBib3VuZGluZ1ZvbHVtZSk7XG5cbiAgY29uc3QgYmxlbmRPcHRpb25DaGFuZ2VkID0gdGhpcy5fYmxlbmRPcHRpb24gIT09IHRoaXMuYmxlbmRPcHRpb247XG4gIHRoaXMuX2JsZW5kT3B0aW9uID0gdGhpcy5ibGVuZE9wdGlvbjtcblxuICBpZiAoYmxlbmRPcHRpb25DaGFuZ2VkKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5fYmxlbmRPcHRpb24gPT09IEJsZW5kT3B0aW9uLk9QQVFVRSB8fFxuICAgICAgdGhpcy5fYmxlbmRPcHRpb24gPT09IEJsZW5kT3B0aW9uLk9QQVFVRV9BTkRfVFJBTlNMVUNFTlRcbiAgICApIHtcbiAgICAgIHRoaXMuX3JzT3BhcXVlID0gUmVuZGVyU3RhdGUuZnJvbUNhY2hlKHtcbiAgICAgICAgZGVwdGhUZXN0OiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBmdW5jOiBXZWJHTENvbnN0YW50cy5MRVFVQUwsXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoTWFzazogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yc09wYXF1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLl9ibGVuZE9wdGlvbiA9PT0gQmxlbmRPcHRpb24uVFJBTlNMVUNFTlQgfHxcbiAgICAgIHRoaXMuX2JsZW5kT3B0aW9uID09PSBCbGVuZE9wdGlvbi5PUEFRVUVfQU5EX1RSQU5TTFVDRU5UXG4gICAgKSB7XG4gICAgICB0aGlzLl9yc1RyYW5zbHVjZW50ID0gUmVuZGVyU3RhdGUuZnJvbUNhY2hlKHtcbiAgICAgICAgZGVwdGhUZXN0OiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBmdW5jOiBXZWJHTENvbnN0YW50cy5MRVFVQUwsXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoTWFzazogZmFsc2UsXG4gICAgICAgIGJsZW5kaW5nOiBCbGVuZGluZ1N0YXRlLkFMUEhBX0JMRU5ELFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JzVHJhbnNsdWNlbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fc2hhZGVyRGlzYWJsZURlcHRoRGlzdGFuY2UgPVxuICAgIHRoaXMuX3NoYWRlckRpc2FibGVEZXB0aERpc3RhbmNlIHx8XG4gICAgZnJhbWVTdGF0ZS5taW5pbXVtRGlzYWJsZURlcHRoVGVzdERpc3RhbmNlICE9PSAwLjA7XG4gIGxldCB2cztcbiAgbGV0IGZzO1xuXG4gIGlmIChcbiAgICBibGVuZE9wdGlvbkNoYW5nZWQgfHxcbiAgICAodGhpcy5fc2hhZGVyU2NhbGVCeURpc3RhbmNlICYmICF0aGlzLl9jb21waWxlZFNoYWRlclNjYWxlQnlEaXN0YW5jZSkgfHxcbiAgICAodGhpcy5fc2hhZGVyVHJhbnNsdWNlbmN5QnlEaXN0YW5jZSAmJlxuICAgICAgIXRoaXMuX2NvbXBpbGVkU2hhZGVyVHJhbnNsdWNlbmN5QnlEaXN0YW5jZSkgfHxcbiAgICAodGhpcy5fc2hhZGVyRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uICYmXG4gICAgICAhdGhpcy5fY29tcGlsZWRTaGFkZXJEaXN0YW5jZURpc3BsYXlDb25kaXRpb24pIHx8XG4gICAgdGhpcy5fc2hhZGVyRGlzYWJsZURlcHRoRGlzdGFuY2UgIT09XG4gICAgICB0aGlzLl9jb21waWxlZFNoYWRlckRpc2FibGVEZXB0aERpc3RhbmNlXG4gICkge1xuICAgIHZzID0gbmV3IFNoYWRlclNvdXJjZSh7XG4gICAgICBzb3VyY2VzOiBbUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uVlNdLFxuICAgIH0pO1xuICAgIGlmICh0aGlzLl9zaGFkZXJTY2FsZUJ5RGlzdGFuY2UpIHtcbiAgICAgIHZzLmRlZmluZXMucHVzaChcIkVZRV9ESVNUQU5DRV9TQ0FMSU5HXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hhZGVyVHJhbnNsdWNlbmN5QnlEaXN0YW5jZSkge1xuICAgICAgdnMuZGVmaW5lcy5wdXNoKFwiRVlFX0RJU1RBTkNFX1RSQU5TTFVDRU5DWVwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NoYWRlckRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbikge1xuICAgICAgdnMuZGVmaW5lcy5wdXNoKFwiRElTVEFOQ0VfRElTUExBWV9DT05ESVRJT05cIik7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zaGFkZXJEaXNhYmxlRGVwdGhEaXN0YW5jZSkge1xuICAgICAgdnMuZGVmaW5lcy5wdXNoKFwiRElTQUJMRV9ERVBUSF9ESVNUQU5DRVwiKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYmxlbmRPcHRpb24gPT09IEJsZW5kT3B0aW9uLk9QQVFVRV9BTkRfVFJBTlNMVUNFTlQpIHtcbiAgICAgIGZzID0gbmV3IFNoYWRlclNvdXJjZSh7XG4gICAgICAgIGRlZmluZXM6IFtcIk9QQVFVRVwiXSxcbiAgICAgICAgc291cmNlczogW1BvaW50UHJpbWl0aXZlQ29sbGVjdGlvbkZTXSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc3AgPSBTaGFkZXJQcm9ncmFtLnJlcGxhY2VDYWNoZSh7XG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIHNoYWRlclByb2dyYW06IHRoaXMuX3NwLFxuICAgICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2U6IHZzLFxuICAgICAgICBmcmFnbWVudFNoYWRlclNvdXJjZTogZnMsXG4gICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9uczogYXR0cmlidXRlTG9jYXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIGZzID0gbmV3IFNoYWRlclNvdXJjZSh7XG4gICAgICAgIGRlZmluZXM6IFtcIlRSQU5TTFVDRU5UXCJdLFxuICAgICAgICBzb3VyY2VzOiBbUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uRlNdLFxuICAgICAgfSk7XG4gICAgICB0aGlzLl9zcFRyYW5zbHVjZW50ID0gU2hhZGVyUHJvZ3JhbS5yZXBsYWNlQ2FjaGUoe1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICBzaGFkZXJQcm9ncmFtOiB0aGlzLl9zcFRyYW5zbHVjZW50LFxuICAgICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2U6IHZzLFxuICAgICAgICBmcmFnbWVudFNoYWRlclNvdXJjZTogZnMsXG4gICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9uczogYXR0cmlidXRlTG9jYXRpb25zLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2JsZW5kT3B0aW9uID09PSBCbGVuZE9wdGlvbi5PUEFRVUUpIHtcbiAgICAgIGZzID0gbmV3IFNoYWRlclNvdXJjZSh7XG4gICAgICAgIHNvdXJjZXM6IFtQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb25GU10sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3NwID0gU2hhZGVyUHJvZ3JhbS5yZXBsYWNlQ2FjaGUoe1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICBzaGFkZXJQcm9ncmFtOiB0aGlzLl9zcCxcbiAgICAgICAgdmVydGV4U2hhZGVyU291cmNlOiB2cyxcbiAgICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2U6IGZzLFxuICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnM6IGF0dHJpYnV0ZUxvY2F0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ibGVuZE9wdGlvbiA9PT0gQmxlbmRPcHRpb24uVFJBTlNMVUNFTlQpIHtcbiAgICAgIGZzID0gbmV3IFNoYWRlclNvdXJjZSh7XG4gICAgICAgIHNvdXJjZXM6IFtQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb25GU10sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3NwVHJhbnNsdWNlbnQgPSBTaGFkZXJQcm9ncmFtLnJlcGxhY2VDYWNoZSh7XG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIHNoYWRlclByb2dyYW06IHRoaXMuX3NwVHJhbnNsdWNlbnQsXG4gICAgICAgIHZlcnRleFNoYWRlclNvdXJjZTogdnMsXG4gICAgICAgIGZyYWdtZW50U2hhZGVyU291cmNlOiBmcyxcbiAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zOiBhdHRyaWJ1dGVMb2NhdGlvbnMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb21waWxlZFNoYWRlclNjYWxlQnlEaXN0YW5jZSA9IHRoaXMuX3NoYWRlclNjYWxlQnlEaXN0YW5jZTtcbiAgICB0aGlzLl9jb21waWxlZFNoYWRlclRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UgPVxuICAgICAgdGhpcy5fc2hhZGVyVHJhbnNsdWNlbmN5QnlEaXN0YW5jZTtcbiAgICB0aGlzLl9jb21waWxlZFNoYWRlckRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiA9XG4gICAgICB0aGlzLl9zaGFkZXJEaXN0YW5jZURpc3BsYXlDb25kaXRpb247XG4gICAgdGhpcy5fY29tcGlsZWRTaGFkZXJEaXNhYmxlRGVwdGhEaXN0YW5jZSA9IHRoaXMuX3NoYWRlckRpc2FibGVEZXB0aERpc3RhbmNlO1xuICB9XG5cbiAgbGV0IHZhO1xuICBsZXQgdmFMZW5ndGg7XG4gIGxldCBjb21tYW5kO1xuICBsZXQgajtcblxuICBjb25zdCBjb21tYW5kTGlzdCA9IGZyYW1lU3RhdGUuY29tbWFuZExpc3Q7XG5cbiAgaWYgKHBhc3MucmVuZGVyIHx8IHBpY2tpbmcpIHtcbiAgICBjb25zdCBjb2xvckxpc3QgPSB0aGlzLl9jb2xvckNvbW1hbmRzO1xuXG4gICAgY29uc3Qgb3BhcXVlID0gdGhpcy5fYmxlbmRPcHRpb24gPT09IEJsZW5kT3B0aW9uLk9QQVFVRTtcbiAgICBjb25zdCBvcGFxdWVBbmRUcmFuc2x1Y2VudCA9XG4gICAgICB0aGlzLl9ibGVuZE9wdGlvbiA9PT0gQmxlbmRPcHRpb24uT1BBUVVFX0FORF9UUkFOU0xVQ0VOVDtcblxuICAgIHZhID0gdGhpcy5fdmFmLnZhO1xuICAgIHZhTGVuZ3RoID0gdmEubGVuZ3RoO1xuXG4gICAgY29sb3JMaXN0Lmxlbmd0aCA9IHZhTGVuZ3RoO1xuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gb3BhcXVlQW5kVHJhbnNsdWNlbnQgPyB2YUxlbmd0aCAqIDIgOiB2YUxlbmd0aDtcbiAgICBmb3IgKGogPSAwOyBqIDwgdG90YWxMZW5ndGg7ICsraikge1xuICAgICAgY29uc3Qgb3BhcXVlQ29tbWFuZCA9IG9wYXF1ZSB8fCAob3BhcXVlQW5kVHJhbnNsdWNlbnQgJiYgaiAlIDIgPT09IDApO1xuXG4gICAgICBjb21tYW5kID0gY29sb3JMaXN0W2pdO1xuICAgICAgaWYgKCFkZWZpbmVkKGNvbW1hbmQpKSB7XG4gICAgICAgIGNvbW1hbmQgPSBjb2xvckxpc3Rbal0gPSBuZXcgRHJhd0NvbW1hbmQoKTtcbiAgICAgIH1cblxuICAgICAgY29tbWFuZC5wcmltaXRpdmVUeXBlID0gUHJpbWl0aXZlVHlwZS5QT0lOVFM7XG4gICAgICBjb21tYW5kLnBhc3MgPVxuICAgICAgICBvcGFxdWVDb21tYW5kIHx8ICFvcGFxdWVBbmRUcmFuc2x1Y2VudCA/IFBhc3MuT1BBUVVFIDogUGFzcy5UUkFOU0xVQ0VOVDtcbiAgICAgIGNvbW1hbmQub3duZXIgPSB0aGlzO1xuXG4gICAgICBjb25zdCBpbmRleCA9IG9wYXF1ZUFuZFRyYW5zbHVjZW50ID8gTWF0aC5mbG9vcihqIC8gMi4wKSA6IGo7XG4gICAgICBjb21tYW5kLmJvdW5kaW5nVm9sdW1lID0gYm91bmRpbmdWb2x1bWU7XG4gICAgICBjb21tYW5kLm1vZGVsTWF0cml4ID0gbW9kZWxNYXRyaXg7XG4gICAgICBjb21tYW5kLnNoYWRlclByb2dyYW0gPSBvcGFxdWVDb21tYW5kID8gdGhpcy5fc3AgOiB0aGlzLl9zcFRyYW5zbHVjZW50O1xuICAgICAgY29tbWFuZC51bmlmb3JtTWFwID0gdGhpcy5fdW5pZm9ybXM7XG4gICAgICBjb21tYW5kLnZlcnRleEFycmF5ID0gdmFbaW5kZXhdLnZhO1xuICAgICAgY29tbWFuZC5yZW5kZXJTdGF0ZSA9IG9wYXF1ZUNvbW1hbmRcbiAgICAgICAgPyB0aGlzLl9yc09wYXF1ZVxuICAgICAgICA6IHRoaXMuX3JzVHJhbnNsdWNlbnQ7XG4gICAgICBjb21tYW5kLmRlYnVnU2hvd0JvdW5kaW5nVm9sdW1lID0gdGhpcy5kZWJ1Z1Nob3dCb3VuZGluZ1ZvbHVtZTtcbiAgICAgIGNvbW1hbmQucGlja0lkID0gXCJ2X3BpY2tDb2xvclwiO1xuXG4gICAgICBjb21tYW5kTGlzdC5wdXNoKGNvbW1hbmQpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZDsgb3RoZXJ3aXNlLCBmYWxzZS5cbiAqIDxiciAvPjxiciAvPlxuICogSWYgdGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZCwgaXQgc2hvdWxkIG5vdCBiZSB1c2VkOyBjYWxsaW5nIGFueSBmdW5jdGlvbiBvdGhlciB0aGFuXG4gKiA8Y29kZT5pc0Rlc3Ryb3llZDwvY29kZT4gd2lsbCByZXN1bHQgaW4gYSB7QGxpbmsgRGV2ZWxvcGVyRXJyb3J9IGV4Y2VwdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZDsgb3RoZXJ3aXNlLCA8Y29kZT5mYWxzZTwvY29kZT4uXG4gKlxuICogQHNlZSBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jZGVzdHJveVxuICovXG5Qb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmlzRGVzdHJveWVkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIERlc3Ryb3lzIHRoZSBXZWJHTCByZXNvdXJjZXMgaGVsZCBieSB0aGlzIG9iamVjdC4gIERlc3Ryb3lpbmcgYW4gb2JqZWN0IGFsbG93cyBmb3IgZGV0ZXJtaW5pc3RpY1xuICogcmVsZWFzZSBvZiBXZWJHTCByZXNvdXJjZXMsIGluc3RlYWQgb2YgcmVseWluZyBvbiB0aGUgZ2FyYmFnZSBjb2xsZWN0b3IgdG8gZGVzdHJveSB0aGlzIG9iamVjdC5cbiAqIDxiciAvPjxiciAvPlxuICogT25jZSBhbiBvYmplY3QgaXMgZGVzdHJveWVkLCBpdCBzaG91bGQgbm90IGJlIHVzZWQ7IGNhbGxpbmcgYW55IGZ1bmN0aW9uIG90aGVyIHRoYW5cbiAqIDxjb2RlPmlzRGVzdHJveWVkPC9jb2RlPiB3aWxsIHJlc3VsdCBpbiBhIHtAbGluayBEZXZlbG9wZXJFcnJvcn0gZXhjZXB0aW9uLiAgVGhlcmVmb3JlLFxuICogYXNzaWduIHRoZSByZXR1cm4gdmFsdWUgKDxjb2RlPnVuZGVmaW5lZDwvY29kZT4pIHRvIHRoZSBvYmplY3QgYXMgZG9uZSBpbiB0aGUgZXhhbXBsZS5cbiAqXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gVGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZCwgaS5lLiwgZGVzdHJveSgpIHdhcyBjYWxsZWQuXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb2ludFByaW1pdGl2ZXMgPSBwb2ludFByaW1pdGl2ZXMgJiYgcG9pbnRQcmltaXRpdmVzLmRlc3Ryb3koKTtcbiAqXG4gKiBAc2VlIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiNpc0Rlc3Ryb3llZFxuICovXG5Qb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3NwID0gdGhpcy5fc3AgJiYgdGhpcy5fc3AuZGVzdHJveSgpO1xuICB0aGlzLl9zcFRyYW5zbHVjZW50ID0gdGhpcy5fc3BUcmFuc2x1Y2VudCAmJiB0aGlzLl9zcFRyYW5zbHVjZW50LmRlc3Ryb3koKTtcbiAgdGhpcy5fc3BQaWNrID0gdGhpcy5fc3BQaWNrICYmIHRoaXMuX3NwUGljay5kZXN0cm95KCk7XG4gIHRoaXMuX3ZhZiA9IHRoaXMuX3ZhZiAmJiB0aGlzLl92YWYuZGVzdHJveSgpO1xuICBkZXN0cm95UG9pbnRQcmltaXRpdmVzKHRoaXMuX3BvaW50UHJpbWl0aXZlcyk7XG5cbiAgcmV0dXJuIGRlc3Ryb3lPYmplY3QodGhpcyk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uO1xuIiwiaW1wb3J0IENhcnRlc2lhbjMgZnJvbSBcIi4vQ2FydGVzaWFuMy5qc1wiO1xuaW1wb3J0IENhcnRlc2lhbjQgZnJvbSBcIi4vQ2FydGVzaWFuNC5qc1wiO1xuaW1wb3J0IGRlZmluZWQgZnJvbSBcIi4vZGVmaW5lZC5qc1wiO1xuaW1wb3J0IERldmVsb3BlckVycm9yIGZyb20gXCIuL0RldmVsb3BlckVycm9yLmpzXCI7XG5pbXBvcnQgSW50ZXJzZWN0IGZyb20gXCIuL0ludGVyc2VjdC5qc1wiO1xuaW1wb3J0IFBsYW5lIGZyb20gXCIuL1BsYW5lLmpzXCI7XG5cbi8qKlxuICogVGhlIGN1bGxpbmcgdm9sdW1lIGRlZmluZWQgYnkgcGxhbmVzLlxuICpcbiAqIEBhbGlhcyBDdWxsaW5nVm9sdW1lXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge0NhcnRlc2lhbjRbXX0gW3BsYW5lc10gQW4gYXJyYXkgb2YgY2xpcHBpbmcgcGxhbmVzLlxuICovXG5mdW5jdGlvbiBDdWxsaW5nVm9sdW1lKHBsYW5lcykge1xuICAvKipcbiAgICogRWFjaCBwbGFuZSBpcyByZXByZXNlbnRlZCBieSBhIENhcnRlc2lhbjQgb2JqZWN0LCB3aGVyZSB0aGUgeCwgeSwgYW5kIHogY29tcG9uZW50c1xuICAgKiBkZWZpbmUgdGhlIHVuaXQgdmVjdG9yIG5vcm1hbCB0byB0aGUgcGxhbmUsIGFuZCB0aGUgdyBjb21wb25lbnQgaXMgdGhlIGRpc3RhbmNlIG9mIHRoZVxuICAgKiBwbGFuZSBmcm9tIHRoZSBvcmlnaW4uXG4gICAqIEB0eXBlIHtDYXJ0ZXNpYW40W119XG4gICAqIEBkZWZhdWx0IFtdXG4gICAqL1xuICB0aGlzLnBsYW5lcyA9IHBsYW5lcyA/PyBbXTtcbn1cblxuY29uc3QgZmFjZXMgPSBbbmV3IENhcnRlc2lhbjMoKSwgbmV3IENhcnRlc2lhbjMoKSwgbmV3IENhcnRlc2lhbjMoKV07XG5DYXJ0ZXNpYW4zLmNsb25lKENhcnRlc2lhbjMuVU5JVF9YLCBmYWNlc1swXSk7XG5DYXJ0ZXNpYW4zLmNsb25lKENhcnRlc2lhbjMuVU5JVF9ZLCBmYWNlc1sxXSk7XG5DYXJ0ZXNpYW4zLmNsb25lKENhcnRlc2lhbjMuVU5JVF9aLCBmYWNlc1syXSk7XG5cbmNvbnN0IHNjcmF0Y2hQbGFuZUNlbnRlciA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBzY3JhdGNoUGxhbmVOb3JtYWwgPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3Qgc2NyYXRjaFBsYW5lID0gbmV3IFBsYW5lKG5ldyBDYXJ0ZXNpYW4zKDEuMCwgMC4wLCAwLjApLCAwLjApO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBjdWxsaW5nIHZvbHVtZSBmcm9tIGEgYm91bmRpbmcgc3BoZXJlLiBDcmVhdGVzIHNpeCBwbGFuZXMgdGhhdCBjcmVhdGUgYSBib3ggY29udGFpbmluZyB0aGUgc3BoZXJlLlxuICogVGhlIHBsYW5lcyBhcmUgYWxpZ25lZCB0byB0aGUgeCwgeSwgYW5kIHogYXhlcyBpbiB3b3JsZCBjb29yZGluYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0JvdW5kaW5nU3BoZXJlfSBib3VuZGluZ1NwaGVyZSBUaGUgYm91bmRpbmcgc3BoZXJlIHVzZWQgdG8gY3JlYXRlIHRoZSBjdWxsaW5nIHZvbHVtZS5cbiAqIEBwYXJhbSB7Q3VsbGluZ1ZvbHVtZX0gW3Jlc3VsdF0gVGhlIG9iamVjdCBvbnRvIHdoaWNoIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gKiBAcmV0dXJucyB7Q3VsbGluZ1ZvbHVtZX0gVGhlIGN1bGxpbmcgdm9sdW1lIGNyZWF0ZWQgZnJvbSB0aGUgYm91bmRpbmcgc3BoZXJlLlxuICovXG5DdWxsaW5nVm9sdW1lLmZyb21Cb3VuZGluZ1NwaGVyZSA9IGZ1bmN0aW9uIChib3VuZGluZ1NwaGVyZSwgcmVzdWx0KSB7XG4gIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gIGlmICghZGVmaW5lZChib3VuZGluZ1NwaGVyZSkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJib3VuZGluZ1NwaGVyZSBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgaWYgKCFkZWZpbmVkKHJlc3VsdCkpIHtcbiAgICByZXN1bHQgPSBuZXcgQ3VsbGluZ1ZvbHVtZSgpO1xuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gZmFjZXMubGVuZ3RoO1xuICBjb25zdCBwbGFuZXMgPSByZXN1bHQucGxhbmVzO1xuICBwbGFuZXMubGVuZ3RoID0gMiAqIGxlbmd0aDtcblxuICBjb25zdCBjZW50ZXIgPSBib3VuZGluZ1NwaGVyZS5jZW50ZXI7XG4gIGNvbnN0IHJhZGl1cyA9IGJvdW5kaW5nU3BoZXJlLnJhZGl1cztcblxuICBsZXQgcGxhbmVJbmRleCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGZhY2VOb3JtYWwgPSBmYWNlc1tpXTtcblxuICAgIGxldCBwbGFuZTAgPSBwbGFuZXNbcGxhbmVJbmRleF07XG4gICAgbGV0IHBsYW5lMSA9IHBsYW5lc1twbGFuZUluZGV4ICsgMV07XG5cbiAgICBpZiAoIWRlZmluZWQocGxhbmUwKSkge1xuICAgICAgcGxhbmUwID0gcGxhbmVzW3BsYW5lSW5kZXhdID0gbmV3IENhcnRlc2lhbjQoKTtcbiAgICB9XG4gICAgaWYgKCFkZWZpbmVkKHBsYW5lMSkpIHtcbiAgICAgIHBsYW5lMSA9IHBsYW5lc1twbGFuZUluZGV4ICsgMV0gPSBuZXcgQ2FydGVzaWFuNCgpO1xuICAgIH1cblxuICAgIENhcnRlc2lhbjMubXVsdGlwbHlCeVNjYWxhcihmYWNlTm9ybWFsLCAtcmFkaXVzLCBzY3JhdGNoUGxhbmVDZW50ZXIpO1xuICAgIENhcnRlc2lhbjMuYWRkKGNlbnRlciwgc2NyYXRjaFBsYW5lQ2VudGVyLCBzY3JhdGNoUGxhbmVDZW50ZXIpO1xuXG4gICAgcGxhbmUwLnggPSBmYWNlTm9ybWFsLng7XG4gICAgcGxhbmUwLnkgPSBmYWNlTm9ybWFsLnk7XG4gICAgcGxhbmUwLnogPSBmYWNlTm9ybWFsLno7XG4gICAgcGxhbmUwLncgPSAtQ2FydGVzaWFuMy5kb3QoZmFjZU5vcm1hbCwgc2NyYXRjaFBsYW5lQ2VudGVyKTtcblxuICAgIENhcnRlc2lhbjMubXVsdGlwbHlCeVNjYWxhcihmYWNlTm9ybWFsLCByYWRpdXMsIHNjcmF0Y2hQbGFuZUNlbnRlcik7XG4gICAgQ2FydGVzaWFuMy5hZGQoY2VudGVyLCBzY3JhdGNoUGxhbmVDZW50ZXIsIHNjcmF0Y2hQbGFuZUNlbnRlcik7XG5cbiAgICBwbGFuZTEueCA9IC1mYWNlTm9ybWFsLng7XG4gICAgcGxhbmUxLnkgPSAtZmFjZU5vcm1hbC55O1xuICAgIHBsYW5lMS56ID0gLWZhY2VOb3JtYWwuejtcbiAgICBwbGFuZTEudyA9IC1DYXJ0ZXNpYW4zLmRvdChcbiAgICAgIENhcnRlc2lhbjMubmVnYXRlKGZhY2VOb3JtYWwsIHNjcmF0Y2hQbGFuZU5vcm1hbCksXG4gICAgICBzY3JhdGNoUGxhbmVDZW50ZXIsXG4gICAgKTtcblxuICAgIHBsYW5lSW5kZXggKz0gMjtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIGJvdW5kaW5nIHZvbHVtZSBpbnRlcnNlY3RzIHRoZSBjdWxsaW5nIHZvbHVtZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYm91bmRpbmdWb2x1bWUgVGhlIGJvdW5kaW5nIHZvbHVtZSB3aG9zZSBpbnRlcnNlY3Rpb24gd2l0aCB0aGUgY3VsbGluZyB2b2x1bWUgaXMgdG8gYmUgdGVzdGVkLlxuICogQHJldHVybnMge0ludGVyc2VjdH0gIEludGVyc2VjdC5PVVRTSURFLCBJbnRlcnNlY3QuSU5URVJTRUNUSU5HLCBvciBJbnRlcnNlY3QuSU5TSURFLlxuICovXG5DdWxsaW5nVm9sdW1lLnByb3RvdHlwZS5jb21wdXRlVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChib3VuZGluZ1ZvbHVtZSkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQoYm91bmRpbmdWb2x1bWUpKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiYm91bmRpbmdWb2x1bWUgaXMgcmVxdWlyZWQuXCIpO1xuICB9XG4gIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gIGNvbnN0IHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuICBsZXQgaW50ZXJzZWN0aW5nID0gZmFsc2U7XG4gIGZvciAobGV0IGsgPSAwLCBsZW4gPSBwbGFuZXMubGVuZ3RoOyBrIDwgbGVuOyArK2spIHtcbiAgICBjb25zdCByZXN1bHQgPSBib3VuZGluZ1ZvbHVtZS5pbnRlcnNlY3RQbGFuZShcbiAgICAgIFBsYW5lLmZyb21DYXJ0ZXNpYW40KHBsYW5lc1trXSwgc2NyYXRjaFBsYW5lKSxcbiAgICApO1xuICAgIGlmIChyZXN1bHQgPT09IEludGVyc2VjdC5PVVRTSURFKSB7XG4gICAgICByZXR1cm4gSW50ZXJzZWN0Lk9VVFNJREU7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IEludGVyc2VjdC5JTlRFUlNFQ1RJTkcpIHtcbiAgICAgIGludGVyc2VjdGluZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGludGVyc2VjdGluZyA/IEludGVyc2VjdC5JTlRFUlNFQ1RJTkcgOiBJbnRlcnNlY3QuSU5TSURFO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBib3VuZGluZyB2b2x1bWUgaW50ZXJzZWN0cyB0aGUgY3VsbGluZyB2b2x1bWUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGJvdW5kaW5nVm9sdW1lIFRoZSBib3VuZGluZyB2b2x1bWUgd2hvc2UgaW50ZXJzZWN0aW9uIHdpdGggdGhlIGN1bGxpbmcgdm9sdW1lIGlzIHRvIGJlIHRlc3RlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBwYXJlbnRQbGFuZU1hc2sgQSBiaXQgbWFzayBmcm9tIHRoZSBib3VuZGluZ1ZvbHVtZSdzIHBhcmVudCdzIGNoZWNrIGFnYWluc3QgdGhlIHNhbWUgY3VsbGluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWUsIHN1Y2ggdGhhdCBpZiAocGxhbmVNYXNrICYgKDEgPDwgcGxhbmVJbmRleCkgPT09IDApLCBmb3IgayA8IDMxLCB0aGVuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBwYXJlbnQgKGFuZCB0aGVyZWZvcmUgdGhpcykgdm9sdW1lIGlzIGNvbXBsZXRlbHkgaW5zaWRlIHBsYW5lW3BsYW5lSW5kZXhdXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGF0IHBsYW5lIGNoZWNrIGNhbiBiZSBza2lwcGVkLlxuICogQHJldHVybnMge251bWJlcn0gQSBwbGFuZSBtYXNrIGFzIGRlc2NyaWJlZCBhYm92ZSAod2hpY2ggY2FuIGJlIGFwcGxpZWQgdG8gdGhpcyBib3VuZGluZ1ZvbHVtZSdzIGNoaWxkcmVuKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DdWxsaW5nVm9sdW1lLnByb3RvdHlwZS5jb21wdXRlVmlzaWJpbGl0eVdpdGhQbGFuZU1hc2sgPSBmdW5jdGlvbiAoXG4gIGJvdW5kaW5nVm9sdW1lLFxuICBwYXJlbnRQbGFuZU1hc2ssXG4pIHtcbiAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgaWYgKCFkZWZpbmVkKGJvdW5kaW5nVm9sdW1lKSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcImJvdW5kaW5nVm9sdW1lIGlzIHJlcXVpcmVkLlwiKTtcbiAgfVxuICBpZiAoIWRlZmluZWQocGFyZW50UGxhbmVNYXNrKSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInBhcmVudFBsYW5lTWFzayBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgaWYgKFxuICAgIHBhcmVudFBsYW5lTWFzayA9PT0gQ3VsbGluZ1ZvbHVtZS5NQVNLX09VVFNJREUgfHxcbiAgICBwYXJlbnRQbGFuZU1hc2sgPT09IEN1bGxpbmdWb2x1bWUuTUFTS19JTlNJREVcbiAgKSB7XG4gICAgLy8gcGFyZW50IGlzIGNvbXBsZXRlbHkgb3V0c2lkZSBvciBjb21wbGV0ZWx5IGluc2lkZSwgc28gdGhpcyBjaGlsZCBpcyBhcyB3ZWxsLlxuICAgIHJldHVybiBwYXJlbnRQbGFuZU1hc2s7XG4gIH1cblxuICAvLyBTdGFydCB3aXRoIE1BU0tfSU5TSURFIChhbGwgemVyb3MpIHNvIHRoYXQgYWZ0ZXIgdGhlIGxvb3AsIHRoZSByZXR1cm4gdmFsdWUgY2FuIGJlIGNvbXBhcmVkIHdpdGggTUFTS19JTlNJREUuXG4gIC8vIChCZWNhdXNlIGlmIHRoZXJlIGFyZSBmZXdlciB0aGFuIDMxIHBsYW5lcywgdGhlIHVwcGVyIGJpdHMgd29udCBiZSBjaGFuZ2VkLilcbiAgbGV0IG1hc2sgPSBDdWxsaW5nVm9sdW1lLk1BU0tfSU5TSURFO1xuXG4gIGNvbnN0IHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuICBmb3IgKGxldCBrID0gMCwgbGVuID0gcGxhbmVzLmxlbmd0aDsgayA8IGxlbjsgKytrKSB7XG4gICAgLy8gRm9yIGsgZ3JlYXRlciB0aGFuIDMxIChzaW5jZSAzMSBpcyB0aGUgbWF4aW11bSBudW1iZXIgb2YgSU5TSURFL0lOVEVSU0VDVElORyBiaXRzIHdlIGNhbiBzdG9yZSksIHNraXAgdGhlIG9wdGltaXphdGlvbi5cbiAgICBjb25zdCBmbGFnID0gayA8IDMxID8gMSA8PCBrIDogMDtcbiAgICBpZiAoayA8IDMxICYmIChwYXJlbnRQbGFuZU1hc2sgJiBmbGFnKSA9PT0gMCkge1xuICAgICAgLy8gYm91bmRpbmdWb2x1bWUgaXMga25vd24gdG8gYmUgSU5TSURFIHRoaXMgcGxhbmUuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBib3VuZGluZ1ZvbHVtZS5pbnRlcnNlY3RQbGFuZShcbiAgICAgIFBsYW5lLmZyb21DYXJ0ZXNpYW40KHBsYW5lc1trXSwgc2NyYXRjaFBsYW5lKSxcbiAgICApO1xuICAgIGlmIChyZXN1bHQgPT09IEludGVyc2VjdC5PVVRTSURFKSB7XG4gICAgICByZXR1cm4gQ3VsbGluZ1ZvbHVtZS5NQVNLX09VVFNJREU7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IEludGVyc2VjdC5JTlRFUlNFQ1RJTkcpIHtcbiAgICAgIG1hc2sgfD0gZmxhZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFzaztcbn07XG5cbi8qKlxuICogRm9yIHBsYW5lIG1hc2tzIChhcyB1c2VkIGluIHtAbGluayBDdWxsaW5nVm9sdW1lI2NvbXB1dGVWaXNpYmlsaXR5V2l0aFBsYW5lTWFza30pLCB0aGlzIHNwZWNpYWwgdmFsdWVcbiAqIHJlcHJlc2VudHMgdGhlIGNhc2Ugd2hlcmUgdGhlIG9iamVjdCBib3VuZGluZyB2b2x1bWUgaXMgZW50aXJlbHkgb3V0c2lkZSB0aGUgY3VsbGluZyB2b2x1bWUuXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkN1bGxpbmdWb2x1bWUuTUFTS19PVVRTSURFID0gMHhmZmZmZmZmZjtcblxuLyoqXG4gKiBGb3IgcGxhbmUgbWFza3MgKGFzIHVzZWQgaW4ge0BsaW5rIEN1bGxpbmdWb2x1bWUucHJvdG90eXBlLmNvbXB1dGVWaXNpYmlsaXR5V2l0aFBsYW5lTWFza30pLCB0aGlzIHZhbHVlXG4gKiByZXByZXNlbnRzIHRoZSBjYXNlIHdoZXJlIHRoZSBvYmplY3QgYm91bmRpbmcgdm9sdW1lIGlzIGVudGlyZWx5IGluc2lkZSB0aGUgY3VsbGluZyB2b2x1bWUuXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkN1bGxpbmdWb2x1bWUuTUFTS19JTlNJREUgPSAweDAwMDAwMDAwO1xuXG4vKipcbiAqIEZvciBwbGFuZSBtYXNrcyAoYXMgdXNlZCBpbiB7QGxpbmsgQ3VsbGluZ1ZvbHVtZS5wcm90b3R5cGUuY29tcHV0ZVZpc2liaWxpdHlXaXRoUGxhbmVNYXNrfSksIHRoaXMgdmFsdWVcbiAqIHJlcHJlc2VudHMgdGhlIGNhc2Ugd2hlcmUgdGhlIG9iamVjdCBib3VuZGluZyB2b2x1bWUgKG1heSkgaW50ZXJzZWN0IGFsbCBwbGFuZXMgb2YgdGhlIGN1bGxpbmcgdm9sdW1lLlxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5DdWxsaW5nVm9sdW1lLk1BU0tfSU5ERVRFUk1JTkFURSA9IDB4N2ZmZmZmZmY7XG5leHBvcnQgZGVmYXVsdCBDdWxsaW5nVm9sdW1lO1xuIiwiaW1wb3J0IENoZWNrIGZyb20gXCIuL0NoZWNrLmpzXCI7XG5pbXBvcnQgRnJvemVuIGZyb20gXCIuL0Zyb3plbi5qc1wiO1xuaW1wb3J0IGRlZmluZWQgZnJvbSBcIi4vZGVmaW5lZC5qc1wiO1xuaW1wb3J0IERldmVsb3BlckVycm9yIGZyb20gXCIuL0RldmVsb3BlckVycm9yLmpzXCI7XG5pbXBvcnQgQ2VzaXVtTWF0aCBmcm9tIFwiLi9NYXRoLmpzXCI7XG5pbXBvcnQgT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bSBmcm9tIFwiLi9PcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtLmpzXCI7XG5cbi8qKlxuICogVGhlIHZpZXdpbmcgZnJ1c3R1bSBpcyBkZWZpbmVkIGJ5IDYgcGxhbmVzLlxuICogRWFjaCBwbGFuZSBpcyByZXByZXNlbnRlZCBieSBhIHtAbGluayBDYXJ0ZXNpYW40fSBvYmplY3QsIHdoZXJlIHRoZSB4LCB5LCBhbmQgeiBjb21wb25lbnRzXG4gKiBkZWZpbmUgdGhlIHVuaXQgdmVjdG9yIG5vcm1hbCB0byB0aGUgcGxhbmUsIGFuZCB0aGUgdyBjb21wb25lbnQgaXMgdGhlIGRpc3RhbmNlIG9mIHRoZVxuICogcGxhbmUgZnJvbSB0aGUgb3JpZ2luL2NhbWVyYSBwb3NpdGlvbi5cbiAqXG4gKiBAYWxpYXMgT3J0aG9ncmFwaGljRnJ1c3R1bVxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBBbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMud2lkdGhdIFRoZSB3aWR0aCBvZiB0aGUgZnJ1c3R1bSBpbiBtZXRlcnMuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuYXNwZWN0UmF0aW9dIFRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGZydXN0dW0ncyB3aWR0aCB0byBpdCdzIGhlaWdodC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5uZWFyPTEuMF0gVGhlIGRpc3RhbmNlIG9mIHRoZSBuZWFyIHBsYW5lLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmZhcj01MDAwMDAwMDAuMF0gVGhlIGRpc3RhbmNlIG9mIHRoZSBmYXIgcGxhbmUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG1heFJhZGlpID0gZWxsaXBzb2lkLm1heGltdW1SYWRpdXM7XG4gKlxuICogY29uc3QgZnJ1c3R1bSA9IG5ldyBDZXNpdW0uT3J0aG9ncmFwaGljRnJ1c3R1bSgpO1xuICogZnJ1c3R1bS5uZWFyID0gMC4wMSAqIG1heFJhZGlpO1xuICogZnJ1c3R1bS5mYXIgPSA1MC4wICogbWF4UmFkaWk7XG4gKi9cbmZ1bmN0aW9uIE9ydGhvZ3JhcGhpY0ZydXN0dW0ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyA/PyBGcm96ZW4uRU1QVFlfT0JKRUNUO1xuXG4gIHRoaXMuX29mZkNlbnRlckZydXN0dW0gPSBuZXcgT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bSgpO1xuXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCB3aWR0aCBvZiB0aGUgZnJ1c3R1bSBpbiBtZXRlcnMuXG4gICAqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfVxuICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICovXG4gIHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICB0aGlzLl93aWR0aCA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIGFzcGVjdCByYXRpbyBvZiB0aGUgZnJ1c3R1bSdzIHdpZHRoIHRvIGl0J3MgaGVpZ2h0LlxuICAgKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH1cbiAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAqL1xuICB0aGlzLmFzcGVjdFJhdGlvID0gb3B0aW9ucy5hc3BlY3RSYXRpbztcbiAgdGhpcy5fYXNwZWN0UmF0aW8gPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXN0YW5jZSBvZiB0aGUgbmVhciBwbGFuZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMS4wXG4gICAqL1xuICB0aGlzLm5lYXIgPSBvcHRpb25zLm5lYXIgPz8gMS4wO1xuICB0aGlzLl9uZWFyID0gdGhpcy5uZWFyO1xuXG4gIC8qKlxuICAgKiBUaGUgZGlzdGFuY2Ugb2YgdGhlIGZhciBwbGFuZS5cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTAwMDAwMDAwLjA7XG4gICAqL1xuICB0aGlzLmZhciA9IG9wdGlvbnMuZmFyID8/IDUwMDAwMDAwMC4wO1xuICB0aGlzLl9mYXIgPSB0aGlzLmZhcjtcbn1cblxuLyoqXG4gKiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHVzZWQgdG8gcGFjayB0aGUgb2JqZWN0IGludG8gYW4gYXJyYXkuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5PcnRob2dyYXBoaWNGcnVzdHVtLnBhY2tlZExlbmd0aCA9IDQ7XG5cbi8qKlxuICogU3RvcmVzIHRoZSBwcm92aWRlZCBpbnN0YW5jZSBpbnRvIHRoZSBwcm92aWRlZCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge09ydGhvZ3JhcGhpY0ZydXN0dW19IHZhbHVlIFRoZSB2YWx1ZSB0byBwYWNrLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkgVGhlIGFycmF5IHRvIHBhY2sgaW50by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRpbmdJbmRleD0wXSBUaGUgaW5kZXggaW50byB0aGUgYXJyYXkgYXQgd2hpY2ggdG8gc3RhcnQgcGFja2luZyB0aGUgZWxlbWVudHMuXG4gKlxuICogQHJldHVybnMge251bWJlcltdfSBUaGUgYXJyYXkgdGhhdCB3YXMgcGFja2VkIGludG9cbiAqL1xuT3J0aG9ncmFwaGljRnJ1c3R1bS5wYWNrID0gZnVuY3Rpb24gKHZhbHVlLCBhcnJheSwgc3RhcnRpbmdJbmRleCkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBDaGVjay50eXBlT2Yub2JqZWN0KFwidmFsdWVcIiwgdmFsdWUpO1xuICBDaGVjay5kZWZpbmVkKFwiYXJyYXlcIiwgYXJyYXkpO1xuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICBzdGFydGluZ0luZGV4ID0gc3RhcnRpbmdJbmRleCA/PyAwO1xuXG4gIGFycmF5W3N0YXJ0aW5nSW5kZXgrK10gPSB2YWx1ZS53aWR0aDtcbiAgYXJyYXlbc3RhcnRpbmdJbmRleCsrXSA9IHZhbHVlLmFzcGVjdFJhdGlvO1xuICBhcnJheVtzdGFydGluZ0luZGV4KytdID0gdmFsdWUubmVhcjtcbiAgYXJyYXlbc3RhcnRpbmdJbmRleF0gPSB2YWx1ZS5mYXI7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYW4gaW5zdGFuY2UgZnJvbSBhIHBhY2tlZCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcltdfSBhcnJheSBUaGUgcGFja2VkIGFycmF5LlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydGluZ0luZGV4PTBdIFRoZSBzdGFydGluZyBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBiZSB1bnBhY2tlZC5cbiAqIEBwYXJhbSB7T3J0aG9ncmFwaGljRnJ1c3R1bX0gW3Jlc3VsdF0gVGhlIG9iamVjdCBpbnRvIHdoaWNoIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gKiBAcmV0dXJucyB7T3J0aG9ncmFwaGljRnJ1c3R1bX0gVGhlIG1vZGlmaWVkIHJlc3VsdCBwYXJhbWV0ZXIgb3IgYSBuZXcgT3J0aG9ncmFwaGljRnJ1c3R1bSBpbnN0YW5jZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZC5cbiAqL1xuT3J0aG9ncmFwaGljRnJ1c3R1bS51bnBhY2sgPSBmdW5jdGlvbiAoYXJyYXksIHN0YXJ0aW5nSW5kZXgsIHJlc3VsdCkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBDaGVjay5kZWZpbmVkKFwiYXJyYXlcIiwgYXJyYXkpO1xuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICBzdGFydGluZ0luZGV4ID0gc3RhcnRpbmdJbmRleCA/PyAwO1xuXG4gIGlmICghZGVmaW5lZChyZXN1bHQpKSB7XG4gICAgcmVzdWx0ID0gbmV3IE9ydGhvZ3JhcGhpY0ZydXN0dW0oKTtcbiAgfVxuXG4gIHJlc3VsdC53aWR0aCA9IGFycmF5W3N0YXJ0aW5nSW5kZXgrK107XG4gIHJlc3VsdC5hc3BlY3RSYXRpbyA9IGFycmF5W3N0YXJ0aW5nSW5kZXgrK107XG4gIHJlc3VsdC5uZWFyID0gYXJyYXlbc3RhcnRpbmdJbmRleCsrXTtcbiAgcmVzdWx0LmZhciA9IGFycmF5W3N0YXJ0aW5nSW5kZXhdO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGUoZnJ1c3R1bSkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoXG4gICAgIWRlZmluZWQoZnJ1c3R1bS53aWR0aCkgfHxcbiAgICAhZGVmaW5lZChmcnVzdHVtLmFzcGVjdFJhdGlvKSB8fFxuICAgICFkZWZpbmVkKGZydXN0dW0ubmVhcikgfHxcbiAgICAhZGVmaW5lZChmcnVzdHVtLmZhcilcbiAgKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgXCJ3aWR0aCwgYXNwZWN0UmF0aW8sIG5lYXIsIG9yIGZhciBwYXJhbWV0ZXJzIGFyZSBub3Qgc2V0LlwiLFxuICAgICk7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgY29uc3QgZiA9IGZydXN0dW0uX29mZkNlbnRlckZydXN0dW07XG5cbiAgaWYgKFxuICAgIGZydXN0dW0ud2lkdGggIT09IGZydXN0dW0uX3dpZHRoIHx8XG4gICAgZnJ1c3R1bS5hc3BlY3RSYXRpbyAhPT0gZnJ1c3R1bS5fYXNwZWN0UmF0aW8gfHxcbiAgICBmcnVzdHVtLm5lYXIgIT09IGZydXN0dW0uX25lYXIgfHxcbiAgICBmcnVzdHVtLmZhciAhPT0gZnJ1c3R1bS5fZmFyXG4gICkge1xuICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgaWYgKGZydXN0dW0uYXNwZWN0UmF0aW8gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJhc3BlY3RSYXRpbyBtdXN0IGJlIHBvc2l0aXZlLlwiKTtcbiAgICB9XG4gICAgaWYgKGZydXN0dW0ubmVhciA8IDAgfHwgZnJ1c3R1bS5uZWFyID4gZnJ1c3R1bS5mYXIpIHtcbiAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcbiAgICAgICAgXCJuZWFyIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8gYW5kIGxlc3MgdGhhbiBmYXIuXCIsXG4gICAgICApO1xuICAgIH1cbiAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICAgIGZydXN0dW0uX2FzcGVjdFJhdGlvID0gZnJ1c3R1bS5hc3BlY3RSYXRpbztcbiAgICBmcnVzdHVtLl93aWR0aCA9IGZydXN0dW0ud2lkdGg7XG4gICAgZnJ1c3R1bS5fbmVhciA9IGZydXN0dW0ubmVhcjtcbiAgICBmcnVzdHVtLl9mYXIgPSBmcnVzdHVtLmZhcjtcblxuICAgIGNvbnN0IHJhdGlvID0gMS4wIC8gZnJ1c3R1bS5hc3BlY3RSYXRpbztcbiAgICBmLnJpZ2h0ID0gZnJ1c3R1bS53aWR0aCAqIDAuNTtcbiAgICBmLmxlZnQgPSAtZi5yaWdodDtcbiAgICBmLnRvcCA9IHJhdGlvICogZi5yaWdodDtcbiAgICBmLmJvdHRvbSA9IC1mLnRvcDtcbiAgICBmLm5lYXIgPSBmcnVzdHVtLm5lYXI7XG4gICAgZi5mYXIgPSBmcnVzdHVtLmZhcjtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhPcnRob2dyYXBoaWNGcnVzdHVtLnByb3RvdHlwZSwge1xuICAvKipcbiAgICogR2V0cyB0aGUgb3J0aG9ncmFwaGljIHByb2plY3Rpb24gbWF0cml4IGNvbXB1dGVkIGZyb20gdGhlIHZpZXcgZnJ1c3R1bS5cbiAgICogQG1lbWJlcm9mIE9ydGhvZ3JhcGhpY0ZydXN0dW0ucHJvdG90eXBlXG4gICAqIEB0eXBlIHtNYXRyaXg0fVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIHByb2plY3Rpb25NYXRyaXg6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHVwZGF0ZSh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLl9vZmZDZW50ZXJGcnVzdHVtLnByb2plY3Rpb25NYXRyaXg7XG4gICAgfSxcbiAgfSxcbiAgLyoqXG4gICAqIEdldHMgdGhlIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uIG1hdHJpeCBjb21wdXRlZCBmcm9tIHRoZSB2aWV3IGZydXN0dW0uXG4gICAqIEBtZW1iZXJvZiBPcnRob2dyYXBoaWNGcnVzdHVtLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7T3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bX1cbiAgICogQHJlYWRvbmx5XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvZmZDZW50ZXJGcnVzdHVtOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB1cGRhdGUodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcy5fb2ZmQ2VudGVyRnJ1c3R1bTtcbiAgICB9LFxuICB9LFxufSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGN1bGxpbmcgdm9sdW1lIGZvciB0aGlzIGZydXN0dW0uXG4gKlxuICogQHBhcmFtIHtDYXJ0ZXNpYW4zfSBwb3NpdGlvbiBUaGUgZXllIHBvc2l0aW9uLlxuICogQHBhcmFtIHtDYXJ0ZXNpYW4zfSBkaXJlY3Rpb24gVGhlIHZpZXcgZGlyZWN0aW9uLlxuICogQHBhcmFtIHtDYXJ0ZXNpYW4zfSB1cCBUaGUgdXAgZGlyZWN0aW9uLlxuICogQHJldHVybnMge0N1bGxpbmdWb2x1bWV9IEEgY3VsbGluZyB2b2x1bWUgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIGFuZCBvcmllbnRhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2hlY2sgaWYgYSBib3VuZGluZyB2b2x1bWUgaW50ZXJzZWN0cyB0aGUgZnJ1c3R1bS5cbiAqIGNvbnN0IGN1bGxpbmdWb2x1bWUgPSBmcnVzdHVtLmNvbXB1dGVDdWxsaW5nVm9sdW1lKGNhbWVyYVBvc2l0aW9uLCBjYW1lcmFEaXJlY3Rpb24sIGNhbWVyYVVwKTtcbiAqIGNvbnN0IGludGVyc2VjdCA9IGN1bGxpbmdWb2x1bWUuY29tcHV0ZVZpc2liaWxpdHkoYm91bmRpbmdWb2x1bWUpO1xuICovXG5PcnRob2dyYXBoaWNGcnVzdHVtLnByb3RvdHlwZS5jb21wdXRlQ3VsbGluZ1ZvbHVtZSA9IGZ1bmN0aW9uIChcbiAgcG9zaXRpb24sXG4gIGRpcmVjdGlvbixcbiAgdXAsXG4pIHtcbiAgdXBkYXRlKHRoaXMpO1xuICByZXR1cm4gdGhpcy5fb2ZmQ2VudGVyRnJ1c3R1bS5jb21wdXRlQ3VsbGluZ1ZvbHVtZShwb3NpdGlvbiwgZGlyZWN0aW9uLCB1cCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHBpeGVsJ3Mgd2lkdGggYW5kIGhlaWdodCBpbiBtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRyYXdpbmdCdWZmZXJXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGRyYXdpbmcgYnVmZmVyLlxuICogQHBhcmFtIHtudW1iZXJ9IGRyYXdpbmdCdWZmZXJIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgZHJhd2luZyBidWZmZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gZGlzdGFuY2UgVGhlIGRpc3RhbmNlIHRvIHRoZSBuZWFyIHBsYW5lIGluIG1ldGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbFJhdGlvIFRoZSBzY2FsaW5nIGZhY3RvciBmcm9tIHBpeGVsIHNwYWNlIHRvIGNvb3JkaW5hdGUgc3BhY2UuXG4gKiBAcGFyYW0ge0NhcnRlc2lhbjJ9IHJlc3VsdCBUaGUgb2JqZWN0IG9udG8gd2hpY2ggdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtDYXJ0ZXNpYW4yfSBUaGUgbW9kaWZpZWQgcmVzdWx0IHBhcmFtZXRlciBvciBhIG5ldyBpbnN0YW5jZSBvZiB7QGxpbmsgQ2FydGVzaWFuMn0gd2l0aCB0aGUgcGl4ZWwncyB3aWR0aCBhbmQgaGVpZ2h0IGluIHRoZSB4IGFuZCB5IHByb3BlcnRpZXMsIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gZHJhd2luZ0J1ZmZlcldpZHRoIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gZHJhd2luZ0J1ZmZlckhlaWdodCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLlxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IHBpeGVsUmF0aW8gbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRXhhbXBsZSAxXG4gKiAvLyBHZXQgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgYSBwaXhlbC5cbiAqIGNvbnN0IHBpeGVsU2l6ZSA9IGNhbWVyYS5mcnVzdHVtLmdldFBpeGVsRGltZW5zaW9ucyhzY2VuZS5kcmF3aW5nQnVmZmVyV2lkdGgsIHNjZW5lLmRyYXdpbmdCdWZmZXJIZWlnaHQsIDAuMCwgc2NlbmUucGl4ZWxSYXRpbywgbmV3IENlc2l1bS5DYXJ0ZXNpYW4yKCkpO1xuICovXG5PcnRob2dyYXBoaWNGcnVzdHVtLnByb3RvdHlwZS5nZXRQaXhlbERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoXG4gIGRyYXdpbmdCdWZmZXJXaWR0aCxcbiAgZHJhd2luZ0J1ZmZlckhlaWdodCxcbiAgZGlzdGFuY2UsXG4gIHBpeGVsUmF0aW8sXG4gIHJlc3VsdCxcbikge1xuICB1cGRhdGUodGhpcyk7XG4gIHJldHVybiB0aGlzLl9vZmZDZW50ZXJGcnVzdHVtLmdldFBpeGVsRGltZW5zaW9ucyhcbiAgICBkcmF3aW5nQnVmZmVyV2lkdGgsXG4gICAgZHJhd2luZ0J1ZmZlckhlaWdodCxcbiAgICBkaXN0YW5jZSxcbiAgICBwaXhlbFJhdGlvLFxuICAgIHJlc3VsdCxcbiAgKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGR1cGxpY2F0ZSBvZiBhIE9ydGhvZ3JhcGhpY0ZydXN0dW0gaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPcnRob2dyYXBoaWNGcnVzdHVtfSBbcmVzdWx0XSBUaGUgb2JqZWN0IG9udG8gd2hpY2ggdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtPcnRob2dyYXBoaWNGcnVzdHVtfSBUaGUgbW9kaWZpZWQgcmVzdWx0IHBhcmFtZXRlciBvciBhIG5ldyBPcnRob2dyYXBoaWNGcnVzdHVtIGluc3RhbmNlIGlmIG9uZSB3YXMgbm90IHByb3ZpZGVkLlxuICovXG5PcnRob2dyYXBoaWNGcnVzdHVtLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgaWYgKCFkZWZpbmVkKHJlc3VsdCkpIHtcbiAgICByZXN1bHQgPSBuZXcgT3J0aG9ncmFwaGljRnJ1c3R1bSgpO1xuICB9XG5cbiAgcmVzdWx0LmFzcGVjdFJhdGlvID0gdGhpcy5hc3BlY3RSYXRpbztcbiAgcmVzdWx0LndpZHRoID0gdGhpcy53aWR0aDtcbiAgcmVzdWx0Lm5lYXIgPSB0aGlzLm5lYXI7XG4gIHJlc3VsdC5mYXIgPSB0aGlzLmZhcjtcblxuICAvLyBmb3JjZSB1cGRhdGUgb2YgY2xvbmUgdG8gY29tcHV0ZSBtYXRyaWNlc1xuICByZXN1bHQuX2FzcGVjdFJhdGlvID0gdW5kZWZpbmVkO1xuICByZXN1bHQuX3dpZHRoID0gdW5kZWZpbmVkO1xuICByZXN1bHQuX25lYXIgPSB1bmRlZmluZWQ7XG4gIHJlc3VsdC5fZmFyID0gdW5kZWZpbmVkO1xuXG4gIHRoaXMuX29mZkNlbnRlckZydXN0dW0uY2xvbmUocmVzdWx0Ll9vZmZDZW50ZXJGcnVzdHVtKTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgcHJvdmlkZWQgT3J0aG9ncmFwaGljRnJ1c3R1bSBjb21wb25lbnR3aXNlIGFuZCByZXR1cm5zXG4gKiA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGV5IGFyZSBlcXVhbCwgPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge09ydGhvZ3JhcGhpY0ZydXN0dW19IFtvdGhlcl0gVGhlIHJpZ2h0IGhhbmQgc2lkZSBPcnRob2dyYXBoaWNGcnVzdHVtLlxuICogQHJldHVybnMge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZXkgYXJlIGVxdWFsLCA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICovXG5PcnRob2dyYXBoaWNGcnVzdHVtLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCFkZWZpbmVkKG90aGVyKSB8fCAhKG90aGVyIGluc3RhbmNlb2YgT3J0aG9ncmFwaGljRnJ1c3R1bSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB1cGRhdGUodGhpcyk7XG4gIHVwZGF0ZShvdGhlcik7XG5cbiAgcmV0dXJuIChcbiAgICB0aGlzLndpZHRoID09PSBvdGhlci53aWR0aCAmJlxuICAgIHRoaXMuYXNwZWN0UmF0aW8gPT09IG90aGVyLmFzcGVjdFJhdGlvICYmXG4gICAgdGhpcy5fb2ZmQ2VudGVyRnJ1c3R1bS5lcXVhbHMob3RoZXIuX29mZkNlbnRlckZydXN0dW0pXG4gICk7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBwcm92aWRlZCBPcnRob2dyYXBoaWNGcnVzdHVtIGNvbXBvbmVudHdpc2UgYW5kIHJldHVybnNcbiAqIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZXkgcGFzcyBhbiBhYnNvbHV0ZSBvciByZWxhdGl2ZSB0b2xlcmFuY2UgdGVzdCxcbiAqIDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtPcnRob2dyYXBoaWNGcnVzdHVtfSBvdGhlciBUaGUgcmlnaHQgaGFuZCBzaWRlIE9ydGhvZ3JhcGhpY0ZydXN0dW0uXG4gKiBAcGFyYW0ge251bWJlcn0gcmVsYXRpdmVFcHNpbG9uIFRoZSByZWxhdGl2ZSBlcHNpbG9uIHRvbGVyYW5jZSB0byB1c2UgZm9yIGVxdWFsaXR5IHRlc3RpbmcuXG4gKiBAcGFyYW0ge251bWJlcn0gW2Fic29sdXRlRXBzaWxvbj1yZWxhdGl2ZUVwc2lsb25dIFRoZSBhYnNvbHV0ZSBlcHNpbG9uIHRvbGVyYW5jZSB0byB1c2UgZm9yIGVxdWFsaXR5IHRlc3RpbmcuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhpcyBhbmQgb3RoZXIgYXJlIHdpdGhpbiB0aGUgcHJvdmlkZWQgZXBzaWxvbiwgPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cbiAqL1xuT3J0aG9ncmFwaGljRnJ1c3R1bS5wcm90b3R5cGUuZXF1YWxzRXBzaWxvbiA9IGZ1bmN0aW9uIChcbiAgb3RoZXIsXG4gIHJlbGF0aXZlRXBzaWxvbixcbiAgYWJzb2x1dGVFcHNpbG9uLFxuKSB7XG4gIGlmICghZGVmaW5lZChvdGhlcikgfHwgIShvdGhlciBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0ZydXN0dW0pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdXBkYXRlKHRoaXMpO1xuICB1cGRhdGUob3RoZXIpO1xuXG4gIHJldHVybiAoXG4gICAgQ2VzaXVtTWF0aC5lcXVhbHNFcHNpbG9uKFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIG90aGVyLndpZHRoLFxuICAgICAgcmVsYXRpdmVFcHNpbG9uLFxuICAgICAgYWJzb2x1dGVFcHNpbG9uLFxuICAgICkgJiZcbiAgICBDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oXG4gICAgICB0aGlzLmFzcGVjdFJhdGlvLFxuICAgICAgb3RoZXIuYXNwZWN0UmF0aW8sXG4gICAgICByZWxhdGl2ZUVwc2lsb24sXG4gICAgICBhYnNvbHV0ZUVwc2lsb24sXG4gICAgKSAmJlxuICAgIHRoaXMuX29mZkNlbnRlckZydXN0dW0uZXF1YWxzRXBzaWxvbihcbiAgICAgIG90aGVyLl9vZmZDZW50ZXJGcnVzdHVtLFxuICAgICAgcmVsYXRpdmVFcHNpbG9uLFxuICAgICAgYWJzb2x1dGVFcHNpbG9uLFxuICAgIClcbiAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBPcnRob2dyYXBoaWNGcnVzdHVtO1xuIiwiLyoqXG4gKiBUaGUgZGlyZWN0aW9uIHRvIGRpc3BsYXkgYSBwcmltaXRpdmUgb3IgSW1hZ2VyeUxheWVyIHJlbGF0aXZlIHRvIHRoZSB7QGxpbmsgU2NlbmUjc3BsaXRQb3NpdGlvbn0uXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqXG4gKiBAc2VlIEltYWdlcnlMYXllciNzcGxpdERpcmVjdGlvblxuICogQHNlZSBDZXNpdW0zRFRpbGVzZXQjc3BsaXREaXJlY3Rpb25cbiAqL1xuY29uc3QgU3BsaXREaXJlY3Rpb24gPSB7XG4gIC8qKlxuICAgKiBEaXNwbGF5IHRoZSBwcmltaXRpdmUgb3IgSW1hZ2VyeUxheWVyIHRvIHRoZSBsZWZ0IG9mIHRoZSB7QGxpbmsgU2NlbmUjc3BsaXRQb3NpdGlvbn0uXG4gICAqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBjb25zdGFudFxuICAgKi9cbiAgTEVGVDogLTEuMCxcblxuICAvKipcbiAgICogIEFsd2F5cyBkaXNwbGF5IHRoZSBwcmltaXRpdmUgb3IgSW1hZ2VyeUxheWVyLlxuICAgKlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAY29uc3RhbnRcbiAgICovXG4gIE5PTkU6IDAuMCxcblxuICAvKipcbiAgICogRGlzcGxheSB0aGUgcHJpbWl0aXZlIG9yIEltYWdlcnlMYXllciB0byB0aGUgcmlnaHQgb2YgdGhlIHtAbGluayBTY2VuZSNzcGxpdFBvc2l0aW9ufS5cbiAgICpcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGNvbnN0YW50XG4gICAqL1xuICBSSUdIVDogMS4wLFxufTtcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoU3BsaXREaXJlY3Rpb24pO1xuIiwiLyoqXG4gKiBEZXRlcm1pbmVzIGhvdyBvcGFxdWUgYW5kIHRyYW5zbHVjZW50IHBhcnRzIG9mIGJpbGxib2FyZHMsIHBvaW50cywgYW5kIGxhYmVscyBhcmUgYmxlbmRlZCB3aXRoIHRoZSBzY2VuZS5cbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBCbGVuZE9wdGlvbiA9IHtcbiAgLyoqXG4gICAqIFRoZSBiaWxsYm9hcmRzLCBwb2ludHMsIG9yIGxhYmVscyBpbiB0aGUgY29sbGVjdGlvbiBhcmUgY29tcGxldGVseSBvcGFxdWUuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBjb25zdGFudFxuICAgKi9cbiAgT1BBUVVFOiAwLFxuXG4gIC8qKlxuICAgKiBUaGUgYmlsbGJvYXJkcywgcG9pbnRzLCBvciBsYWJlbHMgaW4gdGhlIGNvbGxlY3Rpb24gYXJlIGNvbXBsZXRlbHkgdHJhbnNsdWNlbnQuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBjb25zdGFudFxuICAgKi9cbiAgVFJBTlNMVUNFTlQ6IDEsXG5cbiAgLyoqXG4gICAqIFRoZSBiaWxsYm9hcmRzLCBwb2ludHMsIG9yIGxhYmVscyBpbiB0aGUgY29sbGVjdGlvbiBhcmUgYm90aCBvcGFxdWUgYW5kIHRyYW5zbHVjZW50LlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAY29uc3RhbnRcbiAgICovXG4gIE9QQVFVRV9BTkRfVFJBTlNMVUNFTlQ6IDIsXG59O1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZShCbGVuZE9wdGlvbik7XG4iLCJpbXBvcnQgQm91bmRpbmdSZWN0YW5nbGUgZnJvbSBcIi4uL0NvcmUvQm91bmRpbmdSZWN0YW5nbGUuanNcIjtcbmltcG9ydCBDYXJ0ZXNpYW4yIGZyb20gXCIuLi9Db3JlL0NhcnRlc2lhbjIuanNcIjtcbmltcG9ydCBDYXJ0ZXNpYW4zIGZyb20gXCIuLi9Db3JlL0NhcnRlc2lhbjMuanNcIjtcbmltcG9ydCBDYXJ0ZXNpYW40IGZyb20gXCIuLi9Db3JlL0NhcnRlc2lhbjQuanNcIjtcbmltcG9ydCBDb2xvciBmcm9tIFwiLi4vQ29yZS9Db2xvci5qc1wiO1xuaW1wb3J0IEZyb3plbiBmcm9tIFwiLi4vQ29yZS9Gcm96ZW4uanNcIjtcbmltcG9ydCBkZWZpbmVkIGZyb20gXCIuLi9Db3JlL2RlZmluZWQuanNcIjtcbmltcG9ydCBEZXZlbG9wZXJFcnJvciBmcm9tIFwiLi4vQ29yZS9EZXZlbG9wZXJFcnJvci5qc1wiO1xuaW1wb3J0IERpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiBmcm9tIFwiLi4vQ29yZS9EaXN0YW5jZURpc3BsYXlDb25kaXRpb24uanNcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuLi9Db3JlL01hdHJpeDQuanNcIjtcbmltcG9ydCBOZWFyRmFyU2NhbGFyIGZyb20gXCIuLi9Db3JlL05lYXJGYXJTY2FsYXIuanNcIjtcbmltcG9ydCBTY2VuZU1vZGUgZnJvbSBcIi4vU2NlbmVNb2RlLmpzXCI7XG5pbXBvcnQgU2NlbmVUcmFuc2Zvcm1zIGZyb20gXCIuL1NjZW5lVHJhbnNmb3Jtcy5qc1wiO1xuaW1wb3J0IFNwbGl0RGlyZWN0aW9uIGZyb20gXCIuL1NwbGl0RGlyZWN0aW9uLmpzXCI7XG5cbi8qKlxuICogPGRpdiBjbGFzcz1cIm5vdGljZVwiPlxuICogQSBwb2ludCBpcyBjcmVhdGVkIGFuZCBpdHMgaW5pdGlhbCBwcm9wZXJ0aWVzIGFyZSBzZXQgYnkgY2FsbGluZyB7QGxpbmsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI2FkZH0uIERvIG5vdCBjYWxsIHRoZSBjb25zdHJ1Y3RvciBkaXJlY3RseS5cbiAqIDwvZGl2PlxuICogQSBncmFwaGljYWwgcG9pbnQgcG9zaXRpb25lZCBpbiB0aGUgM0Qgc2NlbmUsIHRoYXQgaXMgY3JlYXRlZFxuICogYW5kIHJlbmRlcmVkIHVzaW5nIGEge0BsaW5rIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbn0uXG4gKlxuICogQGFsaWFzIFBvaW50UHJpbWl0aXZlXG4gKlxuICogQHBlcmZvcm1hbmNlIFJlYWRpbmcgYSBwcm9wZXJ0eSwgZS5nLiwge0BsaW5rIFBvaW50UHJpbWl0aXZlI3Nob3d9LCBpcyBjb25zdGFudCB0aW1lLlxuICogQXNzaWduaW5nIHRvIGEgcHJvcGVydHkgaXMgY29uc3RhbnQgdGltZSBidXQgcmVzdWx0cyBpblxuICogQ1BVIHRvIEdQVSB0cmFmZmljIHdoZW4ge0BsaW5rIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbiN1cGRhdGV9IGlzIGNhbGxlZC4gIFRoZSBwZXItcG9pbnRQcmltaXRpdmUgdHJhZmZpYyBpc1xuICogdGhlIHNhbWUgcmVnYXJkbGVzcyBvZiBob3cgbWFueSBwcm9wZXJ0aWVzIHdlcmUgdXBkYXRlZC4gIElmIG1vc3QgcG9pbnRQcmltaXRpdmVzIGluIGEgY29sbGVjdGlvbiBuZWVkIHRvIGJlXG4gKiB1cGRhdGVkLCBpdCBtYXkgYmUgbW9yZSBlZmZpY2llbnQgdG8gY2xlYXIgdGhlIGNvbGxlY3Rpb24gd2l0aCB7QGxpbmsgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uI3JlbW92ZUFsbH1cbiAqIGFuZCBhZGQgbmV3IHBvaW50UHJpbWl0aXZlcyBpbnN0ZWFkIG9mIG1vZGlmeWluZyBlYWNoIG9uZS5cbiAqXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gc2NhbGVCeURpc3RhbmNlLmZhciBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBzY2FsZUJ5RGlzdGFuY2UubmVhclxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UuZmFyIG11c3QgYmUgZ3JlYXRlciB0aGFuIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UubmVhclxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5mYXIgbXVzdCBiZSBncmVhdGVyIHRoYW4gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLm5lYXJcbiAqXG4gKiBAc2VlIFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvblxuICogQHNlZSBQb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24jYWRkXG4gKlxuICogQGludGVybmFsQ29uc3RydWN0b3JcbiAqIEBjbGFzc1xuICpcbiAqIEBkZW1vIHtAbGluayBodHRwczovL3NhbmRjYXN0bGUuY2VzaXVtLmNvbS9pbmRleC5odG1sP3NyYz1Qb2ludHMuaHRtbHxDZXNpdW0gU2FuZGNhc3RsZSBQb2ludHMgRGVtb31cbiAqL1xuZnVuY3Rpb24gUG9pbnRQcmltaXRpdmUob3B0aW9ucywgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zID8/IEZyb3plbi5FTVBUWV9PQkpFQ1Q7XG5cbiAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgaWYgKFxuICAgIGRlZmluZWQob3B0aW9ucy5kaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UpICYmXG4gICAgb3B0aW9ucy5kaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgPCAwLjBcbiAgKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgXCJkaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC4wLlwiLFxuICAgICk7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgbGV0IHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UgPSBvcHRpb25zLnRyYW5zbHVjZW5jeUJ5RGlzdGFuY2U7XG4gIGxldCBzY2FsZUJ5RGlzdGFuY2UgPSBvcHRpb25zLnNjYWxlQnlEaXN0YW5jZTtcbiAgbGV0IGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiA9IG9wdGlvbnMuZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uO1xuICBpZiAoZGVmaW5lZCh0cmFuc2x1Y2VuY3lCeURpc3RhbmNlKSkge1xuICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgaWYgKHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UuZmFyIDw9IHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UubmVhcikge1xuICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgICBcInRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UuZmFyIG11c3QgYmUgZ3JlYXRlciB0aGFuIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UubmVhci5cIixcbiAgICAgICk7XG4gICAgfVxuICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuICAgIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UgPSBOZWFyRmFyU2NhbGFyLmNsb25lKHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UpO1xuICB9XG4gIGlmIChkZWZpbmVkKHNjYWxlQnlEaXN0YW5jZSkpIHtcbiAgICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICAgIGlmIChzY2FsZUJ5RGlzdGFuY2UuZmFyIDw9IHNjYWxlQnlEaXN0YW5jZS5uZWFyKSB7XG4gICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICAgIFwic2NhbGVCeURpc3RhbmNlLmZhciBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBzY2FsZUJ5RGlzdGFuY2UubmVhci5cIixcbiAgICAgICk7XG4gICAgfVxuICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuICAgIHNjYWxlQnlEaXN0YW5jZSA9IE5lYXJGYXJTY2FsYXIuY2xvbmUoc2NhbGVCeURpc3RhbmNlKTtcbiAgfVxuICBpZiAoZGVmaW5lZChkaXN0YW5jZURpc3BsYXlDb25kaXRpb24pKSB7XG4gICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgICBpZiAoZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLmZhciA8PSBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24ubmVhcikge1xuICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgICBcImRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5mYXIgbXVzdCBiZSBncmVhdGVyIHRoYW4gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLm5lYXIuXCIsXG4gICAgICApO1xuICAgIH1cbiAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcbiAgICBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24uY2xvbmUoXG4gICAgICBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24sXG4gICAgKTtcbiAgfVxuXG4gIHRoaXMuX3Nob3cgPSBvcHRpb25zLnNob3cgPz8gdHJ1ZTtcbiAgdGhpcy5fcG9zaXRpb24gPSBDYXJ0ZXNpYW4zLmNsb25lKG9wdGlvbnMucG9zaXRpb24gPz8gQ2FydGVzaWFuMy5aRVJPKTtcbiAgdGhpcy5fYWN0dWFsUG9zaXRpb24gPSBDYXJ0ZXNpYW4zLmNsb25lKHRoaXMuX3Bvc2l0aW9uKTsgLy8gRm9yIGNvbHVtYnVzIHZpZXcgYW5kIDJEXG4gIHRoaXMuX2NvbG9yID0gQ29sb3IuY2xvbmUob3B0aW9ucy5jb2xvciA/PyBDb2xvci5XSElURSk7XG4gIHRoaXMuX291dGxpbmVDb2xvciA9IENvbG9yLmNsb25lKG9wdGlvbnMub3V0bGluZUNvbG9yID8/IENvbG9yLlRSQU5TUEFSRU5UKTtcbiAgdGhpcy5fb3V0bGluZVdpZHRoID0gb3B0aW9ucy5vdXRsaW5lV2lkdGggPz8gMC4wO1xuICB0aGlzLl9waXhlbFNpemUgPSBvcHRpb25zLnBpeGVsU2l6ZSA/PyAxMC4wO1xuICB0aGlzLl9zY2FsZUJ5RGlzdGFuY2UgPSBzY2FsZUJ5RGlzdGFuY2U7XG4gIHRoaXMuX3RyYW5zbHVjZW5jeUJ5RGlzdGFuY2UgPSB0cmFuc2x1Y2VuY3lCeURpc3RhbmNlO1xuICB0aGlzLl9kaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSBkaXN0YW5jZURpc3BsYXlDb25kaXRpb247XG4gIHRoaXMuX2Rpc2FibGVEZXB0aFRlc3REaXN0YW5jZSA9IG9wdGlvbnMuZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlID8/IDAuMDtcbiAgdGhpcy5faWQgPSBvcHRpb25zLmlkO1xuICB0aGlzLl9jb2xsZWN0aW9uID0gb3B0aW9ucy5jb2xsZWN0aW9uID8/IHBvaW50UHJpbWl0aXZlQ29sbGVjdGlvbjtcblxuICB0aGlzLl9jbHVzdGVyU2hvdyA9IHRydWU7XG5cbiAgdGhpcy5fcGlja0lkID0gdW5kZWZpbmVkO1xuICB0aGlzLl9wb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24gPSBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb247XG4gIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gIHRoaXMuX2luZGV4ID0gLTE7IC8vVXNlZCBvbmx5IGJ5IFBvaW50UHJpbWl0aXZlQ29sbGVjdGlvblxuXG4gIHRoaXMuX3NwbGl0RGlyZWN0aW9uID0gb3B0aW9ucy5zcGxpdERpcmVjdGlvbiA/PyBTcGxpdERpcmVjdGlvbi5OT05FO1xufVxuXG5jb25zdCBTSE9XX0lOREVYID0gKFBvaW50UHJpbWl0aXZlLlNIT1dfSU5ERVggPSAwKTtcbmNvbnN0IFBPU0lUSU9OX0lOREVYID0gKFBvaW50UHJpbWl0aXZlLlBPU0lUSU9OX0lOREVYID0gMSk7XG5jb25zdCBDT0xPUl9JTkRFWCA9IChQb2ludFByaW1pdGl2ZS5DT0xPUl9JTkRFWCA9IDIpO1xuY29uc3QgT1VUTElORV9DT0xPUl9JTkRFWCA9IChQb2ludFByaW1pdGl2ZS5PVVRMSU5FX0NPTE9SX0lOREVYID0gMyk7XG5jb25zdCBPVVRMSU5FX1dJRFRIX0lOREVYID0gKFBvaW50UHJpbWl0aXZlLk9VVExJTkVfV0lEVEhfSU5ERVggPSA0KTtcbmNvbnN0IFBJWEVMX1NJWkVfSU5ERVggPSAoUG9pbnRQcmltaXRpdmUuUElYRUxfU0laRV9JTkRFWCA9IDUpO1xuY29uc3QgU0NBTEVfQllfRElTVEFOQ0VfSU5ERVggPSAoUG9pbnRQcmltaXRpdmUuU0NBTEVfQllfRElTVEFOQ0VfSU5ERVggPSA2KTtcbmNvbnN0IFRSQU5TTFVDRU5DWV9CWV9ESVNUQU5DRV9JTkRFWCA9XG4gIChQb2ludFByaW1pdGl2ZS5UUkFOU0xVQ0VOQ1lfQllfRElTVEFOQ0VfSU5ERVggPSA3KTtcbmNvbnN0IERJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OX0lOREVYID1cbiAgKFBvaW50UHJpbWl0aXZlLkRJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OX0lOREVYID0gOCk7XG5jb25zdCBESVNBQkxFX0RFUFRIX0RJU1RBTkNFX0lOREVYID1cbiAgKFBvaW50UHJpbWl0aXZlLkRJU0FCTEVfREVQVEhfRElTVEFOQ0VfSU5ERVggPSA5KTtcbmNvbnN0IFNQTElUX0RJUkVDVElPTl9JTkRFWCA9IChQb2ludFByaW1pdGl2ZS5TUExJVF9ESVJFQ1RJT05fSU5ERVggPSAxMCk7XG5Qb2ludFByaW1pdGl2ZS5OVU1CRVJfT0ZfUFJPUEVSVElFUyA9IDExO1xuXG5mdW5jdGlvbiBtYWtlRGlydHkocG9pbnRQcmltaXRpdmUsIHByb3BlcnR5Q2hhbmdlZCkge1xuICBjb25zdCBwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24gPSBwb2ludFByaW1pdGl2ZS5fcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uO1xuICBpZiAoZGVmaW5lZChwb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24pKSB7XG4gICAgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLl91cGRhdGVQb2ludFByaW1pdGl2ZShcbiAgICAgIHBvaW50UHJpbWl0aXZlLFxuICAgICAgcHJvcGVydHlDaGFuZ2VkLFxuICAgICk7XG4gICAgcG9pbnRQcmltaXRpdmUuX2RpcnR5ID0gdHJ1ZTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhQb2ludFByaW1pdGl2ZS5wcm90b3R5cGUsIHtcbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhpcyBwb2ludCB3aWxsIGJlIHNob3duLiAgVXNlIHRoaXMgdG8gaGlkZSBvciBzaG93IGEgcG9pbnQsIGluc3RlYWRcbiAgICogb2YgcmVtb3ZpbmcgaXQgYW5kIHJlLWFkZGluZyBpdCB0byB0aGUgY29sbGVjdGlvbi5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHNob3c6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaG93O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBpZiAodGhpcy5fc2hvdyAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2hvdyA9IHZhbHVlO1xuICAgICAgICBtYWtlRGlydHkodGhpcywgU0hPV19JTkRFWCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSBDYXJ0ZXNpYW4gcG9zaXRpb24gb2YgdGhpcyBwb2ludC5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7Q2FydGVzaWFuM31cbiAgICovXG4gIHBvc2l0aW9uOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKVxuICAgICAgaWYgKCFkZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJ2YWx1ZSBpcyByZXF1aXJlZC5cIik7XG4gICAgICB9XG4gICAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICAgIGlmICghQ2FydGVzaWFuMy5lcXVhbHMocG9zaXRpb24sIHZhbHVlKSkge1xuICAgICAgICBDYXJ0ZXNpYW4zLmNsb25lKHZhbHVlLCBwb3NpdGlvbik7XG4gICAgICAgIENhcnRlc2lhbjMuY2xvbmUodmFsdWUsIHRoaXMuX2FjdHVhbFBvc2l0aW9uKTtcblxuICAgICAgICBtYWtlRGlydHkodGhpcywgUE9TSVRJT05fSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyBuZWFyIGFuZCBmYXIgc2NhbGluZyBwcm9wZXJ0aWVzIG9mIGEgcG9pbnQgYmFzZWQgb24gdGhlIHBvaW50J3MgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhLlxuICAgKiBBIHBvaW50J3Mgc2NhbGUgd2lsbCBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHRoZSB7QGxpbmsgTmVhckZhclNjYWxhciNuZWFyVmFsdWV9IGFuZFxuICAgKiB7QGxpbmsgTmVhckZhclNjYWxhciNmYXJWYWx1ZX0gd2hpbGUgdGhlIGNhbWVyYSBkaXN0YW5jZSBmYWxscyB3aXRoaW4gdGhlIGxvd2VyIGFuZCB1cHBlciBib3VuZHNcbiAgICogb2YgdGhlIHNwZWNpZmllZCB7QGxpbmsgTmVhckZhclNjYWxhciNuZWFyfSBhbmQge0BsaW5rIE5lYXJGYXJTY2FsYXIjZmFyfS5cbiAgICogT3V0c2lkZSBvZiB0aGVzZSByYW5nZXMgdGhlIHBvaW50J3Mgc2NhbGUgcmVtYWlucyBjbGFtcGVkIHRvIHRoZSBuZWFyZXN0IGJvdW5kLiAgVGhpcyBzY2FsZVxuICAgKiBtdWx0aXBsaWVzIHRoZSBwaXhlbFNpemUgYW5kIG91dGxpbmVXaWR0aCB0byBhZmZlY3QgdGhlIHRvdGFsIHNpemUgb2YgdGhlIHBvaW50LiAgSWYgdW5kZWZpbmVkLFxuICAgKiBzY2FsZUJ5RGlzdGFuY2Ugd2lsbCBiZSBkaXNhYmxlZC5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7TmVhckZhclNjYWxhcn1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gRXhhbXBsZSAxLlxuICAgKiAvLyBTZXQgYSBwb2ludFByaW1pdGl2ZSdzIHNjYWxlQnlEaXN0YW5jZSB0byBzY2FsZSB0byAxNSB3aGVuIHRoZVxuICAgKiAvLyBjYW1lcmEgaXMgMTUwMCBtZXRlcnMgZnJvbSB0aGUgcG9pbnRQcmltaXRpdmUgYW5kIGRpc2FwcGVhciBhc1xuICAgKiAvLyB0aGUgY2FtZXJhIGRpc3RhbmNlIGFwcHJvYWNoZXMgOC4wZTYgbWV0ZXJzLlxuICAgKiBwLnNjYWxlQnlEaXN0YW5jZSA9IG5ldyBDZXNpdW0uTmVhckZhclNjYWxhcigxLjVlMiwgMTUsIDguMGU2LCAwLjApO1xuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBFeGFtcGxlIDIuXG4gICAqIC8vIGRpc2FibGUgc2NhbGluZyBieSBkaXN0YW5jZVxuICAgKiBwLnNjYWxlQnlEaXN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICovXG4gIHNjYWxlQnlEaXN0YW5jZToge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlQnlEaXN0YW5jZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICAgICAgaWYgKGRlZmluZWQodmFsdWUpICYmIHZhbHVlLmZhciA8PSB2YWx1ZS5uZWFyKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcbiAgICAgICAgICBcImZhciBkaXN0YW5jZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBuZWFyIGRpc3RhbmNlLlwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgICAgIGNvbnN0IHNjYWxlQnlEaXN0YW5jZSA9IHRoaXMuX3NjYWxlQnlEaXN0YW5jZTtcbiAgICAgIGlmICghTmVhckZhclNjYWxhci5lcXVhbHMoc2NhbGVCeURpc3RhbmNlLCB2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5fc2NhbGVCeURpc3RhbmNlID0gTmVhckZhclNjYWxhci5jbG9uZSh2YWx1ZSwgc2NhbGVCeURpc3RhbmNlKTtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIFNDQUxFX0JZX0RJU1RBTkNFX0lOREVYKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgbmVhciBhbmQgZmFyIHRyYW5zbHVjZW5jeSBwcm9wZXJ0aWVzIG9mIGEgcG9pbnQgYmFzZWQgb24gdGhlIHBvaW50J3MgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhLlxuICAgKiBBIHBvaW50J3MgdHJhbnNsdWNlbmN5IHdpbGwgaW50ZXJwb2xhdGUgYmV0d2VlbiB0aGUge0BsaW5rIE5lYXJGYXJTY2FsYXIjbmVhclZhbHVlfSBhbmRcbiAgICoge0BsaW5rIE5lYXJGYXJTY2FsYXIjZmFyVmFsdWV9IHdoaWxlIHRoZSBjYW1lcmEgZGlzdGFuY2UgZmFsbHMgd2l0aGluIHRoZSBsb3dlciBhbmQgdXBwZXIgYm91bmRzXG4gICAqIG9mIHRoZSBzcGVjaWZpZWQge0BsaW5rIE5lYXJGYXJTY2FsYXIjbmVhcn0gYW5kIHtAbGluayBOZWFyRmFyU2NhbGFyI2Zhcn0uXG4gICAqIE91dHNpZGUgb2YgdGhlc2UgcmFuZ2VzIHRoZSBwb2ludCdzIHRyYW5zbHVjZW5jeSByZW1haW5zIGNsYW1wZWQgdG8gdGhlIG5lYXJlc3QgYm91bmQuICBJZiB1bmRlZmluZWQsXG4gICAqIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2Ugd2lsbCBiZSBkaXNhYmxlZC5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7TmVhckZhclNjYWxhcn1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gRXhhbXBsZSAxLlxuICAgKiAvLyBTZXQgYSBwb2ludCdzIHRyYW5zbHVjZW5jeSB0byAxLjAgd2hlbiB0aGVcbiAgICogLy8gY2FtZXJhIGlzIDE1MDAgbWV0ZXJzIGZyb20gdGhlIHBvaW50IGFuZCBkaXNhcHBlYXIgYXNcbiAgICogLy8gdGhlIGNhbWVyYSBkaXN0YW5jZSBhcHByb2FjaGVzIDguMGU2IG1ldGVycy5cbiAgICogcC50cmFuc2x1Y2VuY3lCeURpc3RhbmNlID0gbmV3IENlc2l1bS5OZWFyRmFyU2NhbGFyKDEuNWUyLCAxLjAsIDguMGU2LCAwLjApO1xuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBFeGFtcGxlIDIuXG4gICAqIC8vIGRpc2FibGUgdHJhbnNsdWNlbmN5IGJ5IGRpc3RhbmNlXG4gICAqIHAudHJhbnNsdWNlbmN5QnlEaXN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICovXG4gIHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2U6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90cmFuc2x1Y2VuY3lCeURpc3RhbmNlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoZGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUuZmFyIDw9IHZhbHVlLm5lYXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgICAgIFwiZmFyIGRpc3RhbmNlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG5lYXIgZGlzdGFuY2UuXCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICAgICAgY29uc3QgdHJhbnNsdWNlbmN5QnlEaXN0YW5jZSA9IHRoaXMuX3RyYW5zbHVjZW5jeUJ5RGlzdGFuY2U7XG4gICAgICBpZiAoIU5lYXJGYXJTY2FsYXIuZXF1YWxzKHRyYW5zbHVjZW5jeUJ5RGlzdGFuY2UsIHZhbHVlKSkge1xuICAgICAgICB0aGlzLl90cmFuc2x1Y2VuY3lCeURpc3RhbmNlID0gTmVhckZhclNjYWxhci5jbG9uZShcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICB0cmFuc2x1Y2VuY3lCeURpc3RhbmNlLFxuICAgICAgICApO1xuICAgICAgICBtYWtlRGlydHkodGhpcywgVFJBTlNMVUNFTkNZX0JZX0RJU1RBTkNFX0lOREVYKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIGlubmVyIHNpemUgb2YgdGhlIHBvaW50IGluIHBpeGVscy5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgcGl4ZWxTaXplOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGl4ZWxTaXplO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBpZiAodGhpcy5fcGl4ZWxTaXplICE9PSB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9waXhlbFNpemUgPSB2YWx1ZTtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIFBJWEVMX1NJWkVfSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgaW5uZXIgY29sb3Igb2YgdGhlIHBvaW50LlxuICAgKiBUaGUgcmVkLCBncmVlbiwgYmx1ZSwgYW5kIGFscGhhIHZhbHVlcyBhcmUgaW5kaWNhdGVkIGJ5IDxjb2RlPnZhbHVlPC9jb2RlPidzIDxjb2RlPnJlZDwvY29kZT4sIDxjb2RlPmdyZWVuPC9jb2RlPixcbiAgICogPGNvZGU+Ymx1ZTwvY29kZT4sIGFuZCA8Y29kZT5hbHBoYTwvY29kZT4gcHJvcGVydGllcyBhcyBzaG93biBpbiBFeGFtcGxlIDEuICBUaGVzZSBjb21wb25lbnRzIHJhbmdlIGZyb20gPGNvZGU+MC4wPC9jb2RlPlxuICAgKiAobm8gaW50ZW5zaXR5KSB0byA8Y29kZT4xLjA8L2NvZGU+IChmdWxsIGludGVuc2l0eSkuXG4gICAqIEBtZW1iZXJvZiBQb2ludFByaW1pdGl2ZS5wcm90b3R5cGVcbiAgICogQHR5cGUge0NvbG9yfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBFeGFtcGxlIDEuIEFzc2lnbiB5ZWxsb3cuXG4gICAqIHAuY29sb3IgPSBDZXNpdW0uQ29sb3IuWUVMTE9XO1xuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBFeGFtcGxlIDIuIE1ha2UgYSBwb2ludFByaW1pdGl2ZSA1MCUgdHJhbnNsdWNlbnQuXG4gICAqIHAuY29sb3IgPSBuZXcgQ2VzaXVtLkNvbG9yKDEuMCwgMS4wLCAxLjAsIDAuNSk7XG4gICAqL1xuICBjb2xvcjoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuX2NvbG9yO1xuICAgICAgaWYgKCFDb2xvci5lcXVhbHMoY29sb3IsIHZhbHVlKSkge1xuICAgICAgICBDb2xvci5jbG9uZSh2YWx1ZSwgY29sb3IpO1xuICAgICAgICBtYWtlRGlydHkodGhpcywgQ09MT1JfSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgb3V0bGluZSBjb2xvciBvZiB0aGUgcG9pbnQuXG4gICAqIEBtZW1iZXJvZiBQb2ludFByaW1pdGl2ZS5wcm90b3R5cGVcbiAgICogQHR5cGUge0NvbG9yfVxuICAgKi9cbiAgb3V0bGluZUNvbG9yOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3V0bGluZUNvbG9yO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBjb25zdCBvdXRsaW5lQ29sb3IgPSB0aGlzLl9vdXRsaW5lQ29sb3I7XG4gICAgICBpZiAoIUNvbG9yLmVxdWFscyhvdXRsaW5lQ29sb3IsIHZhbHVlKSkge1xuICAgICAgICBDb2xvci5jbG9uZSh2YWx1ZSwgb3V0bGluZUNvbG9yKTtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIE9VVExJTkVfQ09MT1JfSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgb3V0bGluZSB3aWR0aCBpbiBwaXhlbHMuICBUaGlzIHdpZHRoIGFkZHMgdG8gcGl4ZWxTaXplLFxuICAgKiBpbmNyZWFzaW5nIHRoZSB0b3RhbCBzaXplIG9mIHRoZSBwb2ludC5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgb3V0bGluZVdpZHRoOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBpZiAodGhpcy5fb3V0bGluZVdpZHRoICE9PSB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vdXRsaW5lV2lkdGggPSB2YWx1ZTtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIE9VVExJTkVfV0lEVEhfSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgY29uZGl0aW9uIHNwZWNpZnlpbmcgYXQgd2hhdCBkaXN0YW5jZSBmcm9tIHRoZSBjYW1lcmEgdGhhdCB0aGlzIHBvaW50IHdpbGwgYmUgZGlzcGxheWVkLlxuICAgKiBAbWVtYmVyb2YgUG9pbnRQcmltaXRpdmUucHJvdG90eXBlXG4gICAqIEB0eXBlIHtEaXN0YW5jZURpc3BsYXlDb25kaXRpb259XG4gICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgKi9cbiAgZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoZGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUuZmFyIDw9IHZhbHVlLm5lYXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiZmFyIG11c3QgYmUgZ3JlYXRlciB0aGFuIG5lYXJcIik7XG4gICAgICB9XG4gICAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcbiAgICAgIGlmIChcbiAgICAgICAgIURpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5lcXVhbHModGhpcy5fZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLCB2YWx1ZSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9kaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24uY2xvbmUoXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgdGhpcy5fZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLFxuICAgICAgICApO1xuICAgICAgICBtYWtlRGlydHkodGhpcywgRElTVEFOQ0VfRElTUExBWV9DT05ESVRJT05fSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhIGF0IHdoaWNoIHRvIGRpc2FibGUgdGhlIGRlcHRoIHRlc3QgdG8sIGZvciBleGFtcGxlLCBwcmV2ZW50IGNsaXBwaW5nIGFnYWluc3QgdGVycmFpbi5cbiAgICogV2hlbiBzZXQgdG8gemVybywgdGhlIGRlcHRoIHRlc3QgaXMgYWx3YXlzIGFwcGxpZWQuIFdoZW4gc2V0IHRvIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSwgdGhlIGRlcHRoIHRlc3QgaXMgbmV2ZXIgYXBwbGllZC5cbiAgICogQG1lbWJlcm9mIFBvaW50UHJpbWl0aXZlLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwLjBcbiAgICovXG4gIGRpc2FibGVEZXB0aFRlc3REaXN0YW5jZToge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVEZXB0aFRlc3REaXN0YW5jZTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZURlcHRoVGVzdERpc3RhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICAgICAgICBpZiAoIWRlZmluZWQodmFsdWUpIHx8IHZhbHVlIDwgMC4wKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgICAgICAgXCJkaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC4wLlwiLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVEZXB0aFRlc3REaXN0YW5jZSA9IHZhbHVlO1xuICAgICAgICBtYWtlRGlydHkodGhpcywgRElTQUJMRV9ERVBUSF9ESVNUQU5DRV9JTkRFWCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSB1c2VyLWRlZmluZWQgdmFsdWUgcmV0dXJuZWQgd2hlbiB0aGUgcG9pbnQgaXMgcGlja2VkLlxuICAgKiBAbWVtYmVyb2YgUG9pbnRQcmltaXRpdmUucHJvdG90eXBlXG4gICAqIEB0eXBlIHsqfVxuICAgKi9cbiAgaWQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0aGlzLl9pZCA9IHZhbHVlO1xuICAgICAgaWYgKGRlZmluZWQodGhpcy5fcGlja0lkKSkge1xuICAgICAgICB0aGlzLl9waWNrSWQub2JqZWN0LmlkID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHBpY2tJZDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3BpY2tJZDtcbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoaXMgcG9pbnQgd2lsbCBiZSBzaG93biBvciBoaWRkZW4gYmVjYXVzZSBpdCB3YXMgY2x1c3RlcmVkLlxuICAgKiBAbWVtYmVyb2YgUG9pbnRQcmltaXRpdmUucHJvdG90eXBlXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2x1c3RlclNob3c6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jbHVzdGVyU2hvdztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5fY2x1c3RlclNob3cgIT09IHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2NsdXN0ZXJTaG93ID0gdmFsdWU7XG4gICAgICAgIG1ha2VEaXJ0eSh0aGlzLCBTSE9XX0lOREVYKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFNwbGl0RGlyZWN0aW9ufSB0byBhcHBseSB0byB0aGlzIHBvaW50LlxuICAgKiBAbWVtYmVyb2YgUG9pbnRQcmltaXRpdmUucHJvdG90eXBlXG4gICAqIEB0eXBlIHtTcGxpdERpcmVjdGlvbn1cbiAgICogQGRlZmF1bHQge0BsaW5rIFNwbGl0RGlyZWN0aW9uLk5PTkV9XG4gICAqL1xuICBzcGxpdERpcmVjdGlvbjoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NwbGl0RGlyZWN0aW9uO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLl9zcGxpdERpcmVjdGlvbiAhPT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc3BsaXREaXJlY3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIFNQTElUX0RJUkVDVElPTl9JTkRFWCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5Qb2ludFByaW1pdGl2ZS5wcm90b3R5cGUuZ2V0UGlja0lkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgaWYgKCFkZWZpbmVkKHRoaXMuX3BpY2tJZCkpIHtcbiAgICB0aGlzLl9waWNrSWQgPSBjb250ZXh0LmNyZWF0ZVBpY2tJZCh7XG4gICAgICBwcmltaXRpdmU6IHRoaXMsXG4gICAgICBjb2xsZWN0aW9uOiB0aGlzLl9jb2xsZWN0aW9uLFxuICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX3BpY2tJZDtcbn07XG5cblBvaW50UHJpbWl0aXZlLnByb3RvdHlwZS5fZ2V0QWN0dWFsUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9hY3R1YWxQb3NpdGlvbjtcbn07XG5cblBvaW50UHJpbWl0aXZlLnByb3RvdHlwZS5fc2V0QWN0dWFsUG9zaXRpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgQ2FydGVzaWFuMy5jbG9uZSh2YWx1ZSwgdGhpcy5fYWN0dWFsUG9zaXRpb24pO1xuICBtYWtlRGlydHkodGhpcywgUE9TSVRJT05fSU5ERVgpO1xufTtcblxuY29uc3QgdGVtcENhcnRlc2lhbjMgPSBuZXcgQ2FydGVzaWFuNCgpO1xuUG9pbnRQcmltaXRpdmUuX2NvbXB1dGVBY3R1YWxQb3NpdGlvbiA9IGZ1bmN0aW9uIChcbiAgcG9zaXRpb24sXG4gIGZyYW1lU3RhdGUsXG4gIG1vZGVsTWF0cml4LFxuKSB7XG4gIGlmIChmcmFtZVN0YXRlLm1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTNEKSB7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgTWF0cml4NC5tdWx0aXBseUJ5UG9pbnQobW9kZWxNYXRyaXgsIHBvc2l0aW9uLCB0ZW1wQ2FydGVzaWFuMyk7XG4gIHJldHVybiBTY2VuZVRyYW5zZm9ybXMuY29tcHV0ZUFjdHVhbEVsbGlwc29pZFBvc2l0aW9uKFxuICAgIGZyYW1lU3RhdGUsXG4gICAgdGVtcENhcnRlc2lhbjMsXG4gICk7XG59O1xuXG5jb25zdCBzY3JhdGNoQ2FydGVzaWFuNCA9IG5ldyBDYXJ0ZXNpYW40KCk7XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgYmFzaWNhbGx5IGEgc3RyaXBwZWQtZG93biBKYXZhU2NyaXB0IHZlcnNpb24gb2YgUG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uVlMuZ2xzbFxuUG9pbnRQcmltaXRpdmUuX2NvbXB1dGVTY3JlZW5TcGFjZVBvc2l0aW9uID0gZnVuY3Rpb24gKFxuICBtb2RlbE1hdHJpeCxcbiAgcG9zaXRpb24sXG4gIHNjZW5lLFxuICByZXN1bHQsXG4pIHtcbiAgLy8gTW9kZWwgdG8gd29ybGQgY29vcmRpbmF0ZXNcbiAgY29uc3QgcG9zaXRpb25Xb3JsZCA9IE1hdHJpeDQubXVsdGlwbHlCeVZlY3RvcihcbiAgICBtb2RlbE1hdHJpeCxcbiAgICBDYXJ0ZXNpYW40LmZyb21FbGVtZW50cyhcbiAgICAgIHBvc2l0aW9uLngsXG4gICAgICBwb3NpdGlvbi55LFxuICAgICAgcG9zaXRpb24ueixcbiAgICAgIDEsXG4gICAgICBzY3JhdGNoQ2FydGVzaWFuNCxcbiAgICApLFxuICAgIHNjcmF0Y2hDYXJ0ZXNpYW40LFxuICApO1xuICBjb25zdCBwb3NpdGlvbldDID0gU2NlbmVUcmFuc2Zvcm1zLndvcmxkVG9XaW5kb3dDb29yZGluYXRlcyhcbiAgICBzY2VuZSxcbiAgICBwb3NpdGlvbldvcmxkLFxuICAgIHJlc3VsdCxcbiAgKTtcbiAgcmV0dXJuIHBvc2l0aW9uV0M7XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBzY3JlZW4tc3BhY2UgcG9zaXRpb24gb2YgdGhlIHBvaW50J3Mgb3JpZ2luLlxuICogVGhlIHNjcmVlbiBzcGFjZSBvcmlnaW4gaXMgdGhlIHRvcCwgbGVmdCBjb3JuZXIgb2YgdGhlIGNhbnZhczsgPGNvZGU+eDwvY29kZT4gaW5jcmVhc2VzIGZyb21cbiAqIGxlZnQgdG8gcmlnaHQsIGFuZCA8Y29kZT55PC9jb2RlPiBpbmNyZWFzZXMgZnJvbSB0b3AgdG8gYm90dG9tLlxuICpcbiAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lIFRoZSBzY2VuZS5cbiAqIEBwYXJhbSB7Q2FydGVzaWFuMn0gW3Jlc3VsdF0gVGhlIG9iamVjdCBvbnRvIHdoaWNoIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gKiBAcmV0dXJucyB7Q2FydGVzaWFuMn0gVGhlIHNjcmVlbi1zcGFjZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQuXG4gKlxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IFBvaW50UHJpbWl0aXZlIG11c3QgYmUgaW4gYSBjb2xsZWN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zb2xlLmxvZyhwLmNvbXB1dGVTY3JlZW5TcGFjZVBvc2l0aW9uKHNjZW5lKS50b1N0cmluZygpKTtcbiAqL1xuUG9pbnRQcmltaXRpdmUucHJvdG90eXBlLmNvbXB1dGVTY3JlZW5TcGFjZVBvc2l0aW9uID0gZnVuY3Rpb24gKHNjZW5lLCByZXN1bHQpIHtcbiAgY29uc3QgcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uID0gdGhpcy5fcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uO1xuICBpZiAoIWRlZmluZWQocmVzdWx0KSkge1xuICAgIHJlc3VsdCA9IG5ldyBDYXJ0ZXNpYW4yKCk7XG4gIH1cblxuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQocG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcIlBvaW50UHJpbWl0aXZlIG11c3QgYmUgaW4gYSBjb2xsZWN0aW9uLlwiKTtcbiAgfVxuICBpZiAoIWRlZmluZWQoc2NlbmUpKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwic2NlbmUgaXMgcmVxdWlyZWQuXCIpO1xuICB9XG4gIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gIGNvbnN0IG1vZGVsTWF0cml4ID0gcG9pbnRQcmltaXRpdmVDb2xsZWN0aW9uLm1vZGVsTWF0cml4O1xuICBjb25zdCB3aW5kb3dDb29yZGluYXRlcyA9IFBvaW50UHJpbWl0aXZlLl9jb21wdXRlU2NyZWVuU3BhY2VQb3NpdGlvbihcbiAgICBtb2RlbE1hdHJpeCxcbiAgICB0aGlzLl9hY3R1YWxQb3NpdGlvbixcbiAgICBzY2VuZSxcbiAgICByZXN1bHQsXG4gICk7XG4gIGlmICghZGVmaW5lZCh3aW5kb3dDb29yZGluYXRlcykpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgd2luZG93Q29vcmRpbmF0ZXMueSA9IHNjZW5lLmNhbnZhcy5jbGllbnRIZWlnaHQgLSB3aW5kb3dDb29yZGluYXRlcy55O1xuICByZXR1cm4gd2luZG93Q29vcmRpbmF0ZXM7XG59O1xuXG4vKipcbiAqIEdldHMgYSBwb2ludCdzIHNjcmVlbiBzcGFjZSBib3VuZGluZyBib3ggY2VudGVyZWQgYXJvdW5kIHNjcmVlblNwYWNlUG9zaXRpb24uXG4gKiBAcGFyYW0ge1BvaW50UHJpbWl0aXZlfSBwb2ludCBUaGUgcG9pbnQgdG8gZ2V0IHRoZSBzY3JlZW4gc3BhY2UgYm91bmRpbmcgYm94IGZvci5cbiAqIEBwYXJhbSB7Q2FydGVzaWFuMn0gc2NyZWVuU3BhY2VQb3NpdGlvbiBUaGUgc2NyZWVuIHNwYWNlIGNlbnRlciBvZiB0aGUgbGFiZWwuXG4gKiBAcGFyYW0ge0JvdW5kaW5nUmVjdGFuZ2xlfSBbcmVzdWx0XSBUaGUgb2JqZWN0IG9udG8gd2hpY2ggdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtCb3VuZGluZ1JlY3RhbmdsZX0gVGhlIHNjcmVlbiBzcGFjZSBib3VuZGluZyBib3guXG4gKlxuICogQHByaXZhdGVcbiAqL1xuUG9pbnRQcmltaXRpdmUuZ2V0U2NyZWVuU3BhY2VCb3VuZGluZ0JveCA9IGZ1bmN0aW9uIChcbiAgcG9pbnQsXG4gIHNjcmVlblNwYWNlUG9zaXRpb24sXG4gIHJlc3VsdCxcbikge1xuICBjb25zdCBzaXplID0gcG9pbnQucGl4ZWxTaXplO1xuICBjb25zdCBoYWxmU2l6ZSA9IHNpemUgKiAwLjU7XG5cbiAgY29uc3QgeCA9IHNjcmVlblNwYWNlUG9zaXRpb24ueCAtIGhhbGZTaXplO1xuICBjb25zdCB5ID0gc2NyZWVuU3BhY2VQb3NpdGlvbi55IC0gaGFsZlNpemU7XG4gIGNvbnN0IHdpZHRoID0gc2l6ZTtcbiAgY29uc3QgaGVpZ2h0ID0gc2l6ZTtcblxuICBpZiAoIWRlZmluZWQocmVzdWx0KSkge1xuICAgIHJlc3VsdCA9IG5ldyBCb3VuZGluZ1JlY3RhbmdsZSgpO1xuICB9XG5cbiAgcmVzdWx0LnggPSB4O1xuICByZXN1bHQueSA9IHk7XG4gIHJlc3VsdC53aWR0aCA9IHdpZHRoO1xuICByZXN1bHQuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhpcyBwb2ludCBlcXVhbHMgYW5vdGhlciBwb2ludC4gIFBvaW50cyBhcmUgZXF1YWwgaWYgYWxsIHRoZWlyIHByb3BlcnRpZXNcbiAqIGFyZSBlcXVhbC4gIFBvaW50cyBpbiBkaWZmZXJlbnQgY29sbGVjdGlvbnMgY2FuIGJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7UG9pbnRQcmltaXRpdmV9IFtvdGhlcl0gVGhlIHBvaW50IHRvIGNvbXBhcmUgZm9yIGVxdWFsaXR5LlxuICogQHJldHVybnMge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZSBwb2ludHMgYXJlIGVxdWFsOyBvdGhlcndpc2UsIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAqL1xuUG9pbnRQcmltaXRpdmUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICByZXR1cm4gKFxuICAgIHRoaXMgPT09IG90aGVyIHx8XG4gICAgKGRlZmluZWQob3RoZXIpICYmXG4gICAgICB0aGlzLl9pZCA9PT0gb3RoZXIuX2lkICYmXG4gICAgICBDYXJ0ZXNpYW4zLmVxdWFscyh0aGlzLl9wb3NpdGlvbiwgb3RoZXIuX3Bvc2l0aW9uKSAmJlxuICAgICAgQ29sb3IuZXF1YWxzKHRoaXMuX2NvbG9yLCBvdGhlci5fY29sb3IpICYmXG4gICAgICB0aGlzLl9waXhlbFNpemUgPT09IG90aGVyLl9waXhlbFNpemUgJiZcbiAgICAgIHRoaXMuX291dGxpbmVXaWR0aCA9PT0gb3RoZXIuX291dGxpbmVXaWR0aCAmJlxuICAgICAgdGhpcy5fc2hvdyA9PT0gb3RoZXIuX3Nob3cgJiZcbiAgICAgIENvbG9yLmVxdWFscyh0aGlzLl9vdXRsaW5lQ29sb3IsIG90aGVyLl9vdXRsaW5lQ29sb3IpICYmXG4gICAgICBOZWFyRmFyU2NhbGFyLmVxdWFscyh0aGlzLl9zY2FsZUJ5RGlzdGFuY2UsIG90aGVyLl9zY2FsZUJ5RGlzdGFuY2UpICYmXG4gICAgICBOZWFyRmFyU2NhbGFyLmVxdWFscyhcbiAgICAgICAgdGhpcy5fdHJhbnNsdWNlbmN5QnlEaXN0YW5jZSxcbiAgICAgICAgb3RoZXIuX3RyYW5zbHVjZW5jeUJ5RGlzdGFuY2UsXG4gICAgICApICYmXG4gICAgICBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24uZXF1YWxzKFxuICAgICAgICB0aGlzLl9kaXN0YW5jZURpc3BsYXlDb25kaXRpb24sXG4gICAgICAgIG90aGVyLl9kaXN0YW5jZURpc3BsYXlDb25kaXRpb24sXG4gICAgICApICYmXG4gICAgICB0aGlzLl9kaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgPT09IG90aGVyLl9kaXNhYmxlRGVwdGhUZXN0RGlzdGFuY2UgJiZcbiAgICAgIHRoaXMuX3NwbGl0RGlyZWN0aW9uID09PSBvdGhlci5fc3BsaXREaXJlY3Rpb24pXG4gICk7XG59O1xuXG5Qb2ludFByaW1pdGl2ZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3BpY2tJZCA9IHRoaXMuX3BpY2tJZCAmJiB0aGlzLl9waWNrSWQuZGVzdHJveSgpO1xuICB0aGlzLl9wb2ludFByaW1pdGl2ZUNvbGxlY3Rpb24gPSB1bmRlZmluZWQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgUG9pbnRQcmltaXRpdmU7XG4iLCJpbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4vRGV2ZWxvcGVyRXJyb3IuanNcIjtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHZpc2liaWxpdHkgYmFzZWQgb24gdGhlIGRpc3RhbmNlIHRvIHRoZSBjYW1lcmEuXG4gKlxuICogQGFsaWFzIERpc3RhbmNlRGlzcGxheUNvbmRpdGlvblxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtuZWFyPTAuMF0gVGhlIHNtYWxsZXN0IGRpc3RhbmNlIGluIHRoZSBpbnRlcnZhbCB3aGVyZSB0aGUgb2JqZWN0IGlzIHZpc2libGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zhcj1OdW1iZXIuTUFYX1ZBTFVFXSBUaGUgbGFyZ2VzdCBkaXN0YW5jZSBpbiB0aGUgaW50ZXJ2YWwgd2hlcmUgdGhlIG9iamVjdCBpcyB2aXNpYmxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBNYWtlIGEgYmlsbGJvYXJkIHRoYXQgaXMgb25seSB2aXNpYmxlIHdoZW4gdGhlIGRpc3RhbmNlIHRvIHRoZSBjYW1lcmEgaXMgYmV0d2VlbiAxMCBhbmQgMjAgbWV0ZXJzLlxuICogYmlsbGJvYXJkLmRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiA9IG5ldyBDZXNpdW0uRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uKDEwLjAsIDIwLjApO1xuICovXG5mdW5jdGlvbiBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24obmVhciwgZmFyKSB7XG4gIG5lYXIgPSBuZWFyID8/IDAuMDtcbiAgdGhpcy5fbmVhciA9IG5lYXI7XG5cbiAgZmFyID0gZmFyID8/IE51bWJlci5NQVhfVkFMVUU7XG4gIHRoaXMuX2ZhciA9IGZhcjtcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLnByb3RvdHlwZSwge1xuICAvKipcbiAgICogVGhlIHNtYWxsZXN0IGRpc3RhbmNlIGluIHRoZSBpbnRlcnZhbCB3aGVyZSB0aGUgb2JqZWN0IGlzIHZpc2libGUuXG4gICAqIEBtZW1iZXJvZiBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24ucHJvdG90eXBlXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDAuMFxuICAgKi9cbiAgbmVhcjoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX25lYXI7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5fbmVhciA9IHZhbHVlO1xuICAgIH0sXG4gIH0sXG4gIC8qKlxuICAgKiBUaGUgbGFyZ2VzdCBkaXN0YW5jZSBpbiB0aGUgaW50ZXJ2YWwgd2hlcmUgdGhlIG9iamVjdCBpcyB2aXNpYmxlLlxuICAgKiBAbWVtYmVyb2YgRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCBOdW1iZXIuTUFYX1ZBTFVFXG4gICAqL1xuICBmYXI6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mYXI7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZmFyID0gdmFsdWU7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4vKipcbiAqIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdXNlZCB0byBwYWNrIHRoZSBvYmplY3QgaW50byBhbiBhcnJheS5cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbkRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5wYWNrZWRMZW5ndGggPSAyO1xuXG4vKipcbiAqIFN0b3JlcyB0aGUgcHJvdmlkZWQgaW5zdGFuY2UgaW50byB0aGUgcHJvdmlkZWQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtEaXN0YW5jZURpc3BsYXlDb25kaXRpb259IHZhbHVlIFRoZSB2YWx1ZSB0byBwYWNrLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkgVGhlIGFycmF5IHRvIHBhY2sgaW50by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRpbmdJbmRleD0wXSBUaGUgaW5kZXggaW50byB0aGUgYXJyYXkgYXQgd2hpY2ggdG8gc3RhcnQgcGFja2luZyB0aGUgZWxlbWVudHMuXG4gKlxuICogQHJldHVybnMge251bWJlcltdfSBUaGUgYXJyYXkgdGhhdCB3YXMgcGFja2VkIGludG9cbiAqL1xuRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLnBhY2sgPSBmdW5jdGlvbiAodmFsdWUsIGFycmF5LCBzdGFydGluZ0luZGV4KSB7XG4gIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gIGlmICghZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJ2YWx1ZSBpcyByZXF1aXJlZFwiKTtcbiAgfVxuICBpZiAoIWRlZmluZWQoYXJyYXkpKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiYXJyYXkgaXMgcmVxdWlyZWRcIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgc3RhcnRpbmdJbmRleCA9IHN0YXJ0aW5nSW5kZXggPz8gMDtcblxuICBhcnJheVtzdGFydGluZ0luZGV4KytdID0gdmFsdWUubmVhcjtcbiAgYXJyYXlbc3RhcnRpbmdJbmRleF0gPSB2YWx1ZS5mYXI7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYW4gaW5zdGFuY2UgZnJvbSBhIHBhY2tlZCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcltdfSBhcnJheSBUaGUgcGFja2VkIGFycmF5LlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydGluZ0luZGV4PTBdIFRoZSBzdGFydGluZyBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBiZSB1bnBhY2tlZC5cbiAqIEBwYXJhbSB7RGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9ufSBbcmVzdWx0XSBUaGUgb2JqZWN0IGludG8gd2hpY2ggdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtEaXN0YW5jZURpc3BsYXlDb25kaXRpb259IFRoZSBtb2RpZmllZCByZXN1bHQgcGFyYW1ldGVyIG9yIGEgbmV3IERpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiBpbnN0YW5jZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZC5cbiAqL1xuRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLnVucGFjayA9IGZ1bmN0aW9uIChhcnJheSwgc3RhcnRpbmdJbmRleCwgcmVzdWx0KSB7XG4gIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gIGlmICghZGVmaW5lZChhcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJhcnJheSBpcyByZXF1aXJlZFwiKTtcbiAgfVxuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICBzdGFydGluZ0luZGV4ID0gc3RhcnRpbmdJbmRleCA/PyAwO1xuXG4gIGlmICghZGVmaW5lZChyZXN1bHQpKSB7XG4gICAgcmVzdWx0ID0gbmV3IERpc3RhbmNlRGlzcGxheUNvbmRpdGlvbigpO1xuICB9XG4gIHJlc3VsdC5uZWFyID0gYXJyYXlbc3RhcnRpbmdJbmRleCsrXTtcbiAgcmVzdWx0LmZhciA9IGFycmF5W3N0YXJ0aW5nSW5kZXhdO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHR3byBkaXN0YW5jZSBkaXNwbGF5IGNvbmRpdGlvbnMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7RGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9ufSBbbGVmdF0gQSBkaXN0YW5jZSBkaXNwbGF5IGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7RGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9ufSBbcmlnaHRdIEFub3RoZXIgZGlzdGFuY2UgZGlzcGxheSBjb25kaXRpb24uXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSB0d28gZGlzdGFuY2UgZGlzcGxheSBjb25kaXRpb25zIGFyZSBlcXVhbC5cbiAqL1xuRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLmVxdWFscyA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuICByZXR1cm4gKFxuICAgIGxlZnQgPT09IHJpZ2h0IHx8XG4gICAgKGRlZmluZWQobGVmdCkgJiZcbiAgICAgIGRlZmluZWQocmlnaHQpICYmXG4gICAgICBsZWZ0Lm5lYXIgPT09IHJpZ2h0Lm5lYXIgJiZcbiAgICAgIGxlZnQuZmFyID09PSByaWdodC5mYXIpXG4gICk7XG59O1xuXG4vKipcbiAqIER1cGxpY2F0ZXMgYSBkaXN0YW5jZSBkaXNwbGF5IGNvbmRpdGlvbiBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge0Rpc3RhbmNlRGlzcGxheUNvbmRpdGlvbn0gW3ZhbHVlXSBUaGUgZGlzdGFuY2UgZGlzcGxheSBjb25kaXRpb24gdG8gZHVwbGljYXRlLlxuICogQHBhcmFtIHtEaXN0YW5jZURpc3BsYXlDb25kaXRpb259IFtyZXN1bHRdIFRoZSByZXN1bHQgb250byB3aGljaCB0byBzdG9yZSB0aGUgcmVzdWx0LlxuICogQHJldHVybiB7RGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9ufSBUaGUgZHVwbGljYXRlZCBpbnN0YW5jZS5cbiAqL1xuRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLmNsb25lID0gZnVuY3Rpb24gKHZhbHVlLCByZXN1bHQpIHtcbiAgaWYgKCFkZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIWRlZmluZWQocmVzdWx0KSkge1xuICAgIHJlc3VsdCA9IG5ldyBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24oKTtcbiAgfVxuXG4gIHJlc3VsdC5uZWFyID0gdmFsdWUubmVhcjtcbiAgcmVzdWx0LmZhciA9IHZhbHVlLmZhcjtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogRHVwbGljYXRlcyB0aGlzIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7RGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9ufSBbcmVzdWx0XSBUaGUgcmVzdWx0IG9udG8gd2hpY2ggdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAqIEByZXR1cm4ge0Rpc3RhbmNlRGlzcGxheUNvbmRpdGlvbn0gVGhlIGR1cGxpY2F0ZWQgaW5zdGFuY2UuXG4gKi9cbkRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gIHJldHVybiBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24uY2xvbmUodGhpcywgcmVzdWx0KTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGlzIGRpc3RhbmNlIGRpc3BsYXkgY29uZGl0aW9uIGlzIGVxdWFsIHRvIGFub3RoZXIuXG4gKlxuICogQHBhcmFtIHtEaXN0YW5jZURpc3BsYXlDb25kaXRpb259IFtvdGhlcl0gQW5vdGhlciBkaXN0YW5jZSBkaXNwbGF5IGNvbmRpdGlvbi5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhpcyBkaXN0YW5jZSBkaXNwbGF5IGNvbmRpdGlvbiBpcyBlcXVhbCB0byB0aGUgb3RoZXIuXG4gKi9cbkRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIHJldHVybiBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24uZXF1YWxzKHRoaXMsIG90aGVyKTtcbn07XG5leHBvcnQgZGVmYXVsdCBEaXN0YW5jZURpc3BsYXlDb25kaXRpb247XG4iLCIvL1RoaXMgZmlsZSBpcyBhdXRvbWF0aWNhbGx5IHJlYnVpbHQgYnkgdGhlIENlc2l1bSBidWlsZCBwcm9jZXNzLlxuZXhwb3J0IGRlZmF1bHQgXCJpbiB2ZWMzIHBvc2l0aW9uM0RIaWdoO1xcblxcXG5pbiB2ZWMzIHBvc2l0aW9uM0RMb3c7XFxuXFxcbmluIHZlYzMgcG9zaXRpb24yREhpZ2g7XFxuXFxcbmluIHZlYzMgcG9zaXRpb24yRExvdztcXG5cXFxuaW4gdmVjMyBwcmV2UG9zaXRpb24zREhpZ2g7XFxuXFxcbmluIHZlYzMgcHJldlBvc2l0aW9uM0RMb3c7XFxuXFxcbmluIHZlYzMgcHJldlBvc2l0aW9uMkRIaWdoO1xcblxcXG5pbiB2ZWMzIHByZXZQb3NpdGlvbjJETG93O1xcblxcXG5pbiB2ZWMzIG5leHRQb3NpdGlvbjNESGlnaDtcXG5cXFxuaW4gdmVjMyBuZXh0UG9zaXRpb24zRExvdztcXG5cXFxuaW4gdmVjMyBuZXh0UG9zaXRpb24yREhpZ2g7XFxuXFxcbmluIHZlYzMgbmV4dFBvc2l0aW9uMkRMb3c7XFxuXFxcbmluIHZlYzQgdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4O1xcblxcXG5cXG5cXFxub3V0IHZlYzIgIHZfc3Q7XFxuXFxcbm91dCBmbG9hdCB2X3dpZHRoO1xcblxcXG5vdXQgdmVjNCB2X3BpY2tDb2xvcjtcXG5cXFxub3V0IGZsb2F0IHZfcG9seWxpbmVBbmdsZTtcXG5cXFxuXFxuXFxcbnZvaWQgbWFpbigpXFxuXFxcbntcXG5cXFxuICAgIGZsb2F0IHRleENvb3JkID0gdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4Lng7XFxuXFxcbiAgICBmbG9hdCBleHBhbmREaXIgPSB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXgueTtcXG5cXFxuICAgIGJvb2wgdXNlUHJldiA9IHRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleC56IDwgMC4wO1xcblxcXG4gICAgZmxvYXQgYmF0Y2hUYWJsZUluZGV4ID0gdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4Lnc7XFxuXFxcblxcblxcXG4gICAgdmVjMiB3aWR0aEFuZFNob3cgPSBiYXRjaFRhYmxlX2dldFdpZHRoQW5kU2hvdyhiYXRjaFRhYmxlSW5kZXgpO1xcblxcXG4gICAgZmxvYXQgd2lkdGggPSB3aWR0aEFuZFNob3cueCArIDAuNTtcXG5cXFxuICAgIGZsb2F0IHNob3cgPSB3aWR0aEFuZFNob3cueTtcXG5cXFxuXFxuXFxcbiAgICBpZiAod2lkdGggPCAxLjApXFxuXFxcbiAgICB7XFxuXFxcbiAgICAgICAgc2hvdyA9IDAuMDtcXG5cXFxuICAgIH1cXG5cXFxuXFxuXFxcbiAgICB2ZWM0IHBpY2tDb2xvciA9IGJhdGNoVGFibGVfZ2V0UGlja0NvbG9yKGJhdGNoVGFibGVJbmRleCk7XFxuXFxcblxcblxcXG4gICAgdmVjNCBwLCBwcmV2LCBuZXh0O1xcblxcXG4gICAgaWYgKGN6bV9tb3JwaFRpbWUgPT0gMS4wKVxcblxcXG4gICAge1xcblxcXG4gICAgICAgIHAgPSBjem1fdHJhbnNsYXRlUmVsYXRpdmVUb0V5ZShwb3NpdGlvbjNESGlnaC54eXosIHBvc2l0aW9uM0RMb3cueHl6KTtcXG5cXFxuICAgICAgICBwcmV2ID0gY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUocHJldlBvc2l0aW9uM0RIaWdoLnh5eiwgcHJldlBvc2l0aW9uM0RMb3cueHl6KTtcXG5cXFxuICAgICAgICBuZXh0ID0gY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUobmV4dFBvc2l0aW9uM0RIaWdoLnh5eiwgbmV4dFBvc2l0aW9uM0RMb3cueHl6KTtcXG5cXFxuICAgIH1cXG5cXFxuICAgIGVsc2UgaWYgKGN6bV9tb3JwaFRpbWUgPT0gMC4wKVxcblxcXG4gICAge1xcblxcXG4gICAgICAgIHAgPSBjem1fdHJhbnNsYXRlUmVsYXRpdmVUb0V5ZShwb3NpdGlvbjJESGlnaC56eHksIHBvc2l0aW9uMkRMb3cuenh5KTtcXG5cXFxuICAgICAgICBwcmV2ID0gY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUocHJldlBvc2l0aW9uMkRIaWdoLnp4eSwgcHJldlBvc2l0aW9uMkRMb3cuenh5KTtcXG5cXFxuICAgICAgICBuZXh0ID0gY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUobmV4dFBvc2l0aW9uMkRIaWdoLnp4eSwgbmV4dFBvc2l0aW9uMkRMb3cuenh5KTtcXG5cXFxuICAgIH1cXG5cXFxuICAgIGVsc2VcXG5cXFxuICAgIHtcXG5cXFxuICAgICAgICBwID0gY3ptX2NvbHVtYnVzVmlld01vcnBoKFxcblxcXG4gICAgICAgICAgICAgICAgY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUocG9zaXRpb24yREhpZ2guenh5LCBwb3NpdGlvbjJETG93Lnp4eSksXFxuXFxcbiAgICAgICAgICAgICAgICBjem1fdHJhbnNsYXRlUmVsYXRpdmVUb0V5ZShwb3NpdGlvbjNESGlnaC54eXosIHBvc2l0aW9uM0RMb3cueHl6KSxcXG5cXFxuICAgICAgICAgICAgICAgIGN6bV9tb3JwaFRpbWUpO1xcblxcXG4gICAgICAgIHByZXYgPSBjem1fY29sdW1idXNWaWV3TW9ycGgoXFxuXFxcbiAgICAgICAgICAgICAgICBjem1fdHJhbnNsYXRlUmVsYXRpdmVUb0V5ZShwcmV2UG9zaXRpb24yREhpZ2guenh5LCBwcmV2UG9zaXRpb24yRExvdy56eHkpLFxcblxcXG4gICAgICAgICAgICAgICAgY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUocHJldlBvc2l0aW9uM0RIaWdoLnh5eiwgcHJldlBvc2l0aW9uM0RMb3cueHl6KSxcXG5cXFxuICAgICAgICAgICAgICAgIGN6bV9tb3JwaFRpbWUpO1xcblxcXG4gICAgICAgIG5leHQgPSBjem1fY29sdW1idXNWaWV3TW9ycGgoXFxuXFxcbiAgICAgICAgICAgICAgICBjem1fdHJhbnNsYXRlUmVsYXRpdmVUb0V5ZShuZXh0UG9zaXRpb24yREhpZ2guenh5LCBuZXh0UG9zaXRpb24yRExvdy56eHkpLFxcblxcXG4gICAgICAgICAgICAgICAgY3ptX3RyYW5zbGF0ZVJlbGF0aXZlVG9FeWUobmV4dFBvc2l0aW9uM0RIaWdoLnh5eiwgbmV4dFBvc2l0aW9uM0RMb3cueHl6KSxcXG5cXFxuICAgICAgICAgICAgICAgIGN6bV9tb3JwaFRpbWUpO1xcblxcXG4gICAgfVxcblxcXG5cXG5cXFxuICAgICNpZmRlZiBESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTlxcblxcXG4gICAgICAgIHZlYzMgY2VudGVySGlnaCA9IGJhdGNoVGFibGVfZ2V0Q2VudGVySGlnaChiYXRjaFRhYmxlSW5kZXgpO1xcblxcXG4gICAgICAgIHZlYzQgY2VudGVyTG93QW5kUmFkaXVzID0gYmF0Y2hUYWJsZV9nZXRDZW50ZXJMb3dBbmRSYWRpdXMoYmF0Y2hUYWJsZUluZGV4KTtcXG5cXFxuICAgICAgICB2ZWMzIGNlbnRlckxvdyA9IGNlbnRlckxvd0FuZFJhZGl1cy54eXo7XFxuXFxcbiAgICAgICAgZmxvYXQgcmFkaXVzID0gY2VudGVyTG93QW5kUmFkaXVzLnc7XFxuXFxcbiAgICAgICAgdmVjMiBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSBiYXRjaFRhYmxlX2dldERpc3RhbmNlRGlzcGxheUNvbmRpdGlvbihiYXRjaFRhYmxlSW5kZXgpO1xcblxcXG5cXG5cXFxuICAgICAgICBmbG9hdCBsZW5ndGhTcTtcXG5cXFxuICAgICAgICBpZiAoY3ptX3NjZW5lTW9kZSA9PSBjem1fc2NlbmVNb2RlMkQpXFxuXFxcbiAgICAgICAge1xcblxcXG4gICAgICAgICAgICBsZW5ndGhTcSA9IGN6bV9leWVIZWlnaHQyRC55O1xcblxcXG4gICAgICAgIH1cXG5cXFxuICAgICAgICBlbHNlXFxuXFxcbiAgICAgICAge1xcblxcXG4gICAgICAgICAgICB2ZWM0IGNlbnRlciA9IGN6bV90cmFuc2xhdGVSZWxhdGl2ZVRvRXllKGNlbnRlckhpZ2gueHl6LCBjZW50ZXJMb3cueHl6KTtcXG5cXFxuICAgICAgICAgICAgbGVuZ3RoU3EgPSBtYXgoMC4wLCBkb3QoY2VudGVyLnh5eiwgY2VudGVyLnh5eikgLSByYWRpdXMgKiByYWRpdXMpO1xcblxcXG4gICAgICAgIH1cXG5cXFxuXFxuXFxcbiAgICAgICAgZmxvYXQgbmVhclNxID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLnggKiBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24ueDtcXG5cXFxuICAgICAgICBmbG9hdCBmYXJTcSA9IGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi55ICogZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLnk7XFxuXFxcbiAgICAgICAgaWYgKGxlbmd0aFNxIDwgbmVhclNxIHx8IGxlbmd0aFNxID4gZmFyU3EpXFxuXFxcbiAgICAgICAge1xcblxcXG4gICAgICAgICAgICBzaG93ID0gMC4wO1xcblxcXG4gICAgICAgIH1cXG5cXFxuICAgICNlbmRpZlxcblxcXG5cXG5cXFxuICAgIGZsb2F0IHBvbHlsaW5lQW5nbGU7XFxuXFxcbiAgICB2ZWM0IHBvc2l0aW9uV0MgPSBnZXRQb2x5bGluZVdpbmRvd0Nvb3JkaW5hdGVzKHAsIHByZXYsIG5leHQsIGV4cGFuZERpciwgd2lkdGgsIHVzZVByZXYsIHBvbHlsaW5lQW5nbGUpO1xcblxcXG4gICAgZ2xfUG9zaXRpb24gPSBjem1fdmlld3BvcnRPcnRob2dyYXBoaWMgKiBwb3NpdGlvbldDICogc2hvdztcXG5cXFxuXFxuXFxcbiAgICB2X3N0LnMgPSB0ZXhDb29yZDtcXG5cXFxuICAgIHZfc3QudCA9IGN6bV93cml0ZU5vblBlcnNwZWN0aXZlKGNsYW1wKGV4cGFuZERpciwgMC4wLCAxLjApLCBnbF9Qb3NpdGlvbi53KTtcXG5cXFxuXFxuXFxcbiAgICB2X3dpZHRoID0gd2lkdGg7XFxuXFxcbiAgICB2X3BpY2tDb2xvciA9IHBpY2tDb2xvcjtcXG5cXFxuICAgIHZfcG9seWxpbmVBbmdsZSA9IHBvbHlsaW5lQW5nbGU7XFxuXFxcbn1cXG5cXFxuXCI7XG4iLCJpbXBvcnQgYXJyYXlSZW1vdmVEdXBsaWNhdGVzIGZyb20gXCIuLi9Db3JlL2FycmF5UmVtb3ZlRHVwbGljYXRlcy5qc1wiO1xuaW1wb3J0IEJvdW5kaW5nU3BoZXJlIGZyb20gXCIuLi9Db3JlL0JvdW5kaW5nU3BoZXJlLmpzXCI7XG5pbXBvcnQgQ2FydGVzaWFuMyBmcm9tIFwiLi4vQ29yZS9DYXJ0ZXNpYW4zLmpzXCI7XG5pbXBvcnQgQ29sb3IgZnJvbSBcIi4uL0NvcmUvQ29sb3IuanNcIjtcbmltcG9ydCBGcm96ZW4gZnJvbSBcIi4uL0NvcmUvRnJvemVuLmpzXCI7XG5pbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi4vQ29yZS9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4uL0NvcmUvRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBEaXN0YW5jZURpc3BsYXlDb25kaXRpb24gZnJvbSBcIi4uL0NvcmUvRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLmpzXCI7XG5pbXBvcnQgTWF0cml4NCBmcm9tIFwiLi4vQ29yZS9NYXRyaXg0LmpzXCI7XG5pbXBvcnQgUG9seWxpbmVQaXBlbGluZSBmcm9tIFwiLi4vQ29yZS9Qb2x5bGluZVBpcGVsaW5lLmpzXCI7XG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSBcIi4vTWF0ZXJpYWwuanNcIjtcblxuLyoqXG4gKiA8ZGl2IGNsYXNzPVwibm90aWNlXCI+XG4gKiBDcmVhdGUgdGhpcyBieSBjYWxsaW5nIHtAbGluayBQb2x5bGluZUNvbGxlY3Rpb24jYWRkfS4gRG8gbm90IGNhbGwgdGhlIGNvbnN0cnVjdG9yIGRpcmVjdGx5LlxuICogPC9kaXY+XG4gKlxuICogQSByZW5kZXJhYmxlIHBvbHlsaW5lLlxuICpcbiAqIEBhbGlhcyBQb2x5bGluZVxuICogQGludGVybmFsQ29uc3RydWN0b3JcbiAqIEBjbGFzc1xuICpcbiAqIEBwcml2YXRlUGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiBAcHJpdmF0ZVBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zaG93PXRydWVdIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgcG9seWxpbmUgd2lsbCBiZSBzaG93bjsgb3RoZXJ3aXNlLCA8Y29kZT5mYWxzZTwvY29kZT4uXG4gKiBAcHJpdmF0ZVBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLndpZHRoPTEuMF0gVGhlIHdpZHRoIG9mIHRoZSBwb2x5bGluZSBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sb29wPWZhbHNlXSBXaGV0aGVyIGEgbGluZSBzZWdtZW50IHdpbGwgYmUgYWRkZWQgYmV0d2VlbiB0aGUgbGFzdCBhbmQgZmlyc3QgbGluZSBwb3NpdGlvbnMgdG8gbWFrZSB0aGlzIGxpbmUgYSBsb29wLlxuICogQHByaXZhdGVQYXJhbSB7TWF0ZXJpYWx9IFtvcHRpb25zLm1hdGVyaWFsPU1hdGVyaWFsLkNvbG9yVHlwZV0gVGhlIG1hdGVyaWFsLlxuICogQHByaXZhdGVQYXJhbSB7Q2FydGVzaWFuM1tdfSBbb3B0aW9ucy5wb3NpdGlvbnNdIFRoZSBwb3NpdGlvbnMuXG4gKiBAcHJpdmF0ZVBhcmFtIHtvYmplY3R9IFtvcHRpb25zLmlkXSBUaGUgdXNlci1kZWZpbmVkIG9iamVjdCB0byBiZSByZXR1cm5lZCB3aGVuIHRoaXMgcG9seWxpbmUgaXMgcGlja2VkLlxuICogQHByaXZhdGVQYXJhbSB7RGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9ufSBbb3B0aW9ucy5kaXN0YW5jZURpc3BsYXlDb25kaXRpb25dIFRoZSBjb25kaXRpb24gc3BlY2lmeWluZyBhdCB3aGF0IGRpc3RhbmNlIGZyb20gdGhlIGNhbWVyYSB0aGF0IHRoaXMgcG9seWxpbmUgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKiBAcHJpdmF0ZVBhcmFtIHtQb2x5bGluZUNvbGxlY3Rpb259IHBvbHlsaW5lQ29sbGVjdGlvbiBUaGUgcmVuZGVyYWJsZSBwb2x5bGluZSBjb2xsZWN0aW9uLlxuICpcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uXG4gKlxuICovXG5mdW5jdGlvbiBQb2x5bGluZShvcHRpb25zLCBwb2x5bGluZUNvbGxlY3Rpb24pIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgPz8gRnJvemVuLkVNUFRZX09CSkVDVDtcblxuICB0aGlzLl9zaG93ID0gb3B0aW9ucy5zaG93ID8/IHRydWU7XG4gIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aCA/PyAxLjA7XG4gIHRoaXMuX2xvb3AgPSBvcHRpb25zLmxvb3AgPz8gZmFsc2U7XG4gIHRoaXMuX2Rpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiA9IG9wdGlvbnMuZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uO1xuXG4gIHRoaXMuX21hdGVyaWFsID0gb3B0aW9ucy5tYXRlcmlhbDtcbiAgaWYgKCFkZWZpbmVkKHRoaXMuX21hdGVyaWFsKSkge1xuICAgIHRoaXMuX21hdGVyaWFsID0gTWF0ZXJpYWwuZnJvbVR5cGUoTWF0ZXJpYWwuQ29sb3JUeXBlLCB7XG4gICAgICBjb2xvcjogbmV3IENvbG9yKDEuMCwgMS4wLCAxLjAsIDEuMCksXG4gICAgfSk7XG4gIH1cblxuICBsZXQgcG9zaXRpb25zID0gb3B0aW9ucy5wb3NpdGlvbnM7XG4gIGlmICghZGVmaW5lZChwb3NpdGlvbnMpKSB7XG4gICAgcG9zaXRpb25zID0gW107XG4gIH1cblxuICB0aGlzLl9wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gIHRoaXMuX2FjdHVhbFBvc2l0aW9ucyA9IGFycmF5UmVtb3ZlRHVwbGljYXRlcyhcbiAgICBwb3NpdGlvbnMsXG4gICAgQ2FydGVzaWFuMy5lcXVhbHNFcHNpbG9uLFxuICApO1xuXG4gIGlmICh0aGlzLl9sb29wICYmIHRoaXMuX2FjdHVhbFBvc2l0aW9ucy5sZW5ndGggPiAyKSB7XG4gICAgaWYgKHRoaXMuX2FjdHVhbFBvc2l0aW9ucyA9PT0gdGhpcy5fcG9zaXRpb25zKSB7XG4gICAgICB0aGlzLl9hY3R1YWxQb3NpdGlvbnMgPSBwb3NpdGlvbnMuc2xpY2UoKTtcbiAgICB9XG4gICAgdGhpcy5fYWN0dWFsUG9zaXRpb25zLnB1c2goQ2FydGVzaWFuMy5jbG9uZSh0aGlzLl9hY3R1YWxQb3NpdGlvbnNbMF0pKTtcbiAgfVxuXG4gIHRoaXMuX2xlbmd0aCA9IHRoaXMuX2FjdHVhbFBvc2l0aW9ucy5sZW5ndGg7XG4gIHRoaXMuX2lkID0gb3B0aW9ucy5pZDtcblxuICBsZXQgbW9kZWxNYXRyaXg7XG4gIGlmIChkZWZpbmVkKHBvbHlsaW5lQ29sbGVjdGlvbikpIHtcbiAgICBtb2RlbE1hdHJpeCA9IE1hdHJpeDQuY2xvbmUocG9seWxpbmVDb2xsZWN0aW9uLm1vZGVsTWF0cml4KTtcbiAgfVxuXG4gIHRoaXMuX21vZGVsTWF0cml4ID0gbW9kZWxNYXRyaXg7XG4gIHRoaXMuX3NlZ21lbnRzID0gUG9seWxpbmVQaXBlbGluZS53cmFwTG9uZ2l0dWRlKFxuICAgIHRoaXMuX2FjdHVhbFBvc2l0aW9ucyxcbiAgICBtb2RlbE1hdHJpeCxcbiAgKTtcblxuICB0aGlzLl9hY3R1YWxMZW5ndGggPSB1bmRlZmluZWQ7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIHRoaXMuX3Byb3BlcnRpZXNDaGFuZ2VkID0gbmV3IFVpbnQzMkFycmF5KE5VTUJFUl9PRl9QUk9QRVJUSUVTKTtcbiAgdGhpcy5fcG9seWxpbmVDb2xsZWN0aW9uID0gcG9seWxpbmVDb2xsZWN0aW9uO1xuICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICB0aGlzLl9waWNrSWQgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX2JvdW5kaW5nVm9sdW1lID0gQm91bmRpbmdTcGhlcmUuZnJvbVBvaW50cyh0aGlzLl9hY3R1YWxQb3NpdGlvbnMpO1xuICB0aGlzLl9ib3VuZGluZ1ZvbHVtZVdDID0gQm91bmRpbmdTcGhlcmUudHJhbnNmb3JtKFxuICAgIHRoaXMuX2JvdW5kaW5nVm9sdW1lLFxuICAgIHRoaXMuX21vZGVsTWF0cml4LFxuICApO1xuICB0aGlzLl9ib3VuZGluZ1ZvbHVtZTJEID0gbmV3IEJvdW5kaW5nU3BoZXJlKCk7IC8vIG1vZGlmaWVkIGluIFBvbHlsaW5lQ29sbGVjdGlvblxufVxuXG5jb25zdCBQT1NJVElPTl9JTkRFWCA9IChQb2x5bGluZS5QT1NJVElPTl9JTkRFWCA9IDApO1xuY29uc3QgU0hPV19JTkRFWCA9IChQb2x5bGluZS5TSE9XX0lOREVYID0gMSk7XG5jb25zdCBXSURUSF9JTkRFWCA9IChQb2x5bGluZS5XSURUSF9JTkRFWCA9IDIpO1xuY29uc3QgTUFURVJJQUxfSU5ERVggPSAoUG9seWxpbmUuTUFURVJJQUxfSU5ERVggPSAzKTtcbmNvbnN0IFBPU0lUSU9OX1NJWkVfSU5ERVggPSAoUG9seWxpbmUuUE9TSVRJT05fU0laRV9JTkRFWCA9IDQpO1xuY29uc3QgRElTVEFOQ0VfRElTUExBWV9DT05ESVRJT04gPSAoUG9seWxpbmUuRElTVEFOQ0VfRElTUExBWV9DT05ESVRJT04gPSA1KTtcbmNvbnN0IE5VTUJFUl9PRl9QUk9QRVJUSUVTID0gKFBvbHlsaW5lLk5VTUJFUl9PRl9QUk9QRVJUSUVTID0gNik7XG5cbmZ1bmN0aW9uIG1ha2VEaXJ0eShwb2x5bGluZSwgcHJvcGVydHlDaGFuZ2VkKSB7XG4gICsrcG9seWxpbmUuX3Byb3BlcnRpZXNDaGFuZ2VkW3Byb3BlcnR5Q2hhbmdlZF07XG4gIGNvbnN0IHBvbHlsaW5lQ29sbGVjdGlvbiA9IHBvbHlsaW5lLl9wb2x5bGluZUNvbGxlY3Rpb247XG4gIGlmIChkZWZpbmVkKHBvbHlsaW5lQ29sbGVjdGlvbikpIHtcbiAgICBwb2x5bGluZUNvbGxlY3Rpb24uX3VwZGF0ZVBvbHlsaW5lKHBvbHlsaW5lLCBwcm9wZXJ0eUNoYW5nZWQpO1xuICAgIHBvbHlsaW5lLl9kaXJ0eSA9IHRydWU7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUG9seWxpbmUucHJvdG90eXBlLCB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoaXMgcG9seWxpbmUgd2lsbCBiZSBzaG93bi4gIFVzZSB0aGlzIHRvIGhpZGUgb3Igc2hvdyBhIHBvbHlsaW5lLCBpbnN0ZWFkXG4gICAqIG9mIHJlbW92aW5nIGl0IGFuZCByZS1hZGRpbmcgaXQgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZS5wcm90b3R5cGVcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBzaG93OiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2hvdztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICAgICAgaWYgKCFkZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJ2YWx1ZSBpcyByZXF1aXJlZC5cIik7XG4gICAgICB9XG4gICAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9zaG93KSB7XG4gICAgICAgIHRoaXMuX3Nob3cgPSB2YWx1ZTtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIFNIT1dfSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgcG9zaXRpb25zIG9mIHRoZSBwb2x5bGluZS5cbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7Q2FydGVzaWFuM1tdfVxuICAgKiBAZXhhbXBsZVxuICAgKiBwb2x5bGluZS5wb3NpdGlvbnMgPSBDZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlc0FycmF5KFtcbiAgICogICAgIDAuMCwgMC4wLFxuICAgKiAgICAgMTAuMCwgMC4wLFxuICAgKiAgICAgMC4wLCAyMC4wXG4gICAqIF0pO1xuICAgKi9cbiAgcG9zaXRpb25zOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25zO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBsZXQgcG9zaXRpb25zID0gYXJyYXlSZW1vdmVEdXBsaWNhdGVzKHZhbHVlLCBDYXJ0ZXNpYW4zLmVxdWFsc0Vwc2lsb24pO1xuXG4gICAgICBpZiAodGhpcy5fbG9vcCAmJiBwb3NpdGlvbnMubGVuZ3RoID4gMikge1xuICAgICAgICBpZiAocG9zaXRpb25zID09PSB2YWx1ZSkge1xuICAgICAgICAgIHBvc2l0aW9ucyA9IHZhbHVlLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zaXRpb25zLnB1c2goQ2FydGVzaWFuMy5jbG9uZShwb3NpdGlvbnNbMF0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9hY3R1YWxQb3NpdGlvbnMubGVuZ3RoICE9PSBwb3NpdGlvbnMubGVuZ3RoIHx8XG4gICAgICAgIHRoaXMuX2FjdHVhbFBvc2l0aW9ucy5sZW5ndGggIT09IHRoaXMuX2xlbmd0aFxuICAgICAgKSB7XG4gICAgICAgIG1ha2VEaXJ0eSh0aGlzLCBQT1NJVElPTl9TSVpFX0lOREVYKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcG9zaXRpb25zID0gdmFsdWU7XG4gICAgICB0aGlzLl9hY3R1YWxQb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgICB0aGlzLl9sZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgICAgdGhpcy5fYm91bmRpbmdWb2x1bWUgPSBCb3VuZGluZ1NwaGVyZS5mcm9tUG9pbnRzKFxuICAgICAgICB0aGlzLl9hY3R1YWxQb3NpdGlvbnMsXG4gICAgICAgIHRoaXMuX2JvdW5kaW5nVm9sdW1lLFxuICAgICAgKTtcbiAgICAgIHRoaXMuX2JvdW5kaW5nVm9sdW1lV0MgPSBCb3VuZGluZ1NwaGVyZS50cmFuc2Zvcm0oXG4gICAgICAgIHRoaXMuX2JvdW5kaW5nVm9sdW1lLFxuICAgICAgICB0aGlzLl9tb2RlbE1hdHJpeCxcbiAgICAgICAgdGhpcy5fYm91bmRpbmdWb2x1bWVXQyxcbiAgICAgICk7XG4gICAgICBtYWtlRGlydHkodGhpcywgUE9TSVRJT05fSU5ERVgpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgc3VyZmFjZSBhcHBlYXJhbmNlIG9mIHRoZSBwb2x5bGluZS4gIFRoaXMgY2FuIGJlIG9uZSBvZiBzZXZlcmFsIGJ1aWx0LWluIHtAbGluayBNYXRlcmlhbH0gb2JqZWN0cyBvciBhIGN1c3RvbSBtYXRlcmlhbCwgc2NyaXB0ZWQgd2l0aFxuICAgKiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0Nlc2l1bUdTL2Nlc2l1bS93aWtpL0ZhYnJpY3xGYWJyaWN9LlxuICAgKiBAbWVtYmVyb2YgUG9seWxpbmUucHJvdG90eXBlXG4gICAqIEB0eXBlIHtNYXRlcmlhbH1cbiAgICovXG4gIG1hdGVyaWFsOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChtYXRlcmlhbCkge1xuICAgICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgICAgIGlmICghZGVmaW5lZChtYXRlcmlhbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwibWF0ZXJpYWwgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgfVxuICAgICAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgICAgIGlmICh0aGlzLl9tYXRlcmlhbCAhPT0gbWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICAgICAgbWFrZURpcnR5KHRoaXMsIE1BVEVSSUFMX0lOREVYKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIHdpZHRoIG9mIHRoZSBwb2x5bGluZS5cbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lLnByb3RvdHlwZVxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgd2lkdGg6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpXG4gICAgICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInZhbHVlIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgaWYgKHZhbHVlICE9PSB3aWR0aCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgICAgICBtYWtlRGlydHkodGhpcywgV0lEVEhfSU5ERVgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIGEgbGluZSBzZWdtZW50IHdpbGwgYmUgYWRkZWQgYmV0d2VlbiB0aGUgZmlyc3QgYW5kIGxhc3QgcG9seWxpbmUgcG9zaXRpb25zLlxuICAgKiBAbWVtYmVyb2YgUG9seWxpbmUucHJvdG90eXBlXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgbG9vcDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xvb3A7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKVxuICAgICAgaWYgKCFkZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJ2YWx1ZSBpcyByZXF1aXJlZC5cIik7XG4gICAgICB9XG4gICAgICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9sb29wKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSB0aGlzLl9hY3R1YWxQb3NpdGlvbnM7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9ucy5sZW5ndGggPiAyICYmXG4gICAgICAgICAgICAhQ2FydGVzaWFuMy5lcXVhbHMocG9zaXRpb25zWzBdLCBwb3NpdGlvbnNbcG9zaXRpb25zLmxlbmd0aCAtIDFdKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5fYWN0dWFsUG9zaXRpb25zID0gcG9zaXRpb25zID0gdGhpcy5fcG9zaXRpb25zLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaChDYXJ0ZXNpYW4zLmNsb25lKHBvc2l0aW9uc1swXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBwb3NpdGlvbnMubGVuZ3RoID4gMiAmJlxuICAgICAgICAgIENhcnRlc2lhbjMuZXF1YWxzKHBvc2l0aW9uc1swXSwgcG9zaXRpb25zW3Bvc2l0aW9ucy5sZW5ndGggLSAxXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggLSAxID09PSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3R1YWxQb3NpdGlvbnMgPSB0aGlzLl9wb3NpdGlvbnM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb29wID0gdmFsdWU7XG4gICAgICAgIG1ha2VEaXJ0eSh0aGlzLCBQT1NJVElPTl9TSVpFX0lOREVYKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIHVzZXItZGVmaW5lZCB2YWx1ZSByZXR1cm5lZCB3aGVuIHRoZSBwb2x5bGluZSBpcyBwaWNrZWQuXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZS5wcm90b3R5cGVcbiAgICogQHR5cGUgeyp9XG4gICAqL1xuICBpZDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2lkID0gdmFsdWU7XG4gICAgICBpZiAoZGVmaW5lZCh0aGlzLl9waWNrSWQpKSB7XG4gICAgICAgIHRoaXMuX3BpY2tJZC5vYmplY3QuaWQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcGlja0lkOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGlja0lkO1xuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRlc3RydWN0aW9uIHN0YXR1cyBvZiB0aGlzIHBvbHlsaW5lXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZS5wcm90b3R5cGVcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Rlc3Ryb3llZDoge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFkZWZpbmVkKHRoaXMuX3BvbHlsaW5lQ29sbGVjdGlvbik7XG4gICAgfSxcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyBvciBzZXRzIHRoZSBjb25kaXRpb24gc3BlY2lmeWluZyBhdCB3aGF0IGRpc3RhbmNlIGZyb20gdGhlIGNhbWVyYSB0aGF0IHRoaXMgcG9seWxpbmUgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZS5wcm90b3R5cGVcbiAgICogQHR5cGUge0Rpc3RhbmNlRGlzcGxheUNvbmRpdGlvbn1cbiAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAqL1xuICBkaXN0YW5jZURpc3BsYXlDb25kaXRpb246IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kaXN0YW5jZURpc3BsYXlDb25kaXRpb247XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgICAgIGlmIChkZWZpbmVkKHZhbHVlKSAmJiB2YWx1ZS5mYXIgPD0gdmFsdWUubmVhcikge1xuICAgICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICAgICAgXCJmYXIgZGlzdGFuY2UgbXVzdCBiZSBncmVhdGVyIHRoYW4gbmVhciBkaXN0YW5jZS5cIixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuICAgICAgaWYgKFxuICAgICAgICAhRGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLmVxdWFscyh2YWx1ZSwgdGhpcy5fZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2Rpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiA9IERpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5jbG9uZShcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICB0aGlzLl9kaXN0YW5jZURpc3BsYXlDb25kaXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIG1ha2VEaXJ0eSh0aGlzLCBESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTik7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblBvbHlsaW5lLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBtb2RlbE1hdHJpeCA9IE1hdHJpeDQuSURFTlRJVFk7XG4gIGlmIChkZWZpbmVkKHRoaXMuX3BvbHlsaW5lQ29sbGVjdGlvbikpIHtcbiAgICBtb2RlbE1hdHJpeCA9IHRoaXMuX3BvbHlsaW5lQ29sbGVjdGlvbi5tb2RlbE1hdHJpeDtcbiAgfVxuXG4gIGNvbnN0IHNlZ21lbnRQb3NpdGlvbnNMZW5ndGggPSB0aGlzLl9zZWdtZW50cy5wb3NpdGlvbnMubGVuZ3RoO1xuICBjb25zdCBzZWdtZW50TGVuZ3RocyA9IHRoaXMuX3NlZ21lbnRzLmxlbmd0aHM7XG5cbiAgY29uc3QgcG9zaXRpb25zQ2hhbmdlZCA9XG4gICAgdGhpcy5fcHJvcGVydGllc0NoYW5nZWRbUE9TSVRJT05fSU5ERVhdID4gMCB8fFxuICAgIHRoaXMuX3Byb3BlcnRpZXNDaGFuZ2VkW1BPU0lUSU9OX1NJWkVfSU5ERVhdID4gMDtcbiAgaWYgKCFNYXRyaXg0LmVxdWFscyhtb2RlbE1hdHJpeCwgdGhpcy5fbW9kZWxNYXRyaXgpIHx8IHBvc2l0aW9uc0NoYW5nZWQpIHtcbiAgICB0aGlzLl9zZWdtZW50cyA9IFBvbHlsaW5lUGlwZWxpbmUud3JhcExvbmdpdHVkZShcbiAgICAgIHRoaXMuX2FjdHVhbFBvc2l0aW9ucyxcbiAgICAgIG1vZGVsTWF0cml4LFxuICAgICk7XG4gICAgdGhpcy5fYm91bmRpbmdWb2x1bWVXQyA9IEJvdW5kaW5nU3BoZXJlLnRyYW5zZm9ybShcbiAgICAgIHRoaXMuX2JvdW5kaW5nVm9sdW1lLFxuICAgICAgbW9kZWxNYXRyaXgsXG4gICAgICB0aGlzLl9ib3VuZGluZ1ZvbHVtZVdDLFxuICAgICk7XG4gIH1cblxuICB0aGlzLl9tb2RlbE1hdHJpeCA9IE1hdHJpeDQuY2xvbmUobW9kZWxNYXRyaXgsIHRoaXMuX21vZGVsTWF0cml4KTtcblxuICBpZiAodGhpcy5fc2VnbWVudHMucG9zaXRpb25zLmxlbmd0aCAhPT0gc2VnbWVudFBvc2l0aW9uc0xlbmd0aCkge1xuICAgIC8vIG51bWJlciBvZiBwb3NpdGlvbnMgY2hhbmdlZFxuICAgIG1ha2VEaXJ0eSh0aGlzLCBQT1NJVElPTl9TSVpFX0lOREVYKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsZW5ndGggPSBzZWdtZW50TGVuZ3Rocy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHNlZ21lbnRMZW5ndGhzW2ldICE9PSB0aGlzLl9zZWdtZW50cy5sZW5ndGhzW2ldKSB7XG4gICAgICAgIC8vIGluZGljZXMgY2hhbmdlZFxuICAgICAgICBtYWtlRGlydHkodGhpcywgUE9TSVRJT05fU0laRV9JTkRFWCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5Qb2x5bGluZS5wcm90b3R5cGUuZ2V0UGlja0lkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgaWYgKCFkZWZpbmVkKHRoaXMuX3BpY2tJZCkpIHtcbiAgICB0aGlzLl9waWNrSWQgPSBjb250ZXh0LmNyZWF0ZVBpY2tJZCh7XG4gICAgICBwcmltaXRpdmU6IHRoaXMsXG4gICAgICBjb2xsZWN0aW9uOiB0aGlzLl9wb2x5bGluZUNvbGxlY3Rpb24sXG4gICAgICBpZDogdGhpcy5faWQsXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX3BpY2tJZDtcbn07XG5cblBvbHlsaW5lLnByb3RvdHlwZS5fY2xlYW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9wcm9wZXJ0aWVzQ2hhbmdlZDtcbiAgZm9yIChsZXQgayA9IDA7IGsgPCBOVU1CRVJfT0ZfUFJPUEVSVElFUyAtIDE7ICsraykge1xuICAgIHByb3BlcnRpZXNba10gPSAwO1xuICB9XG59O1xuXG5Qb2x5bGluZS5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3BpY2tJZCA9IHRoaXMuX3BpY2tJZCAmJiB0aGlzLl9waWNrSWQuZGVzdHJveSgpO1xuICB0aGlzLl9tYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsICYmIHRoaXMuX21hdGVyaWFsLmRlc3Ryb3koKTtcbiAgdGhpcy5fcG9seWxpbmVDb2xsZWN0aW9uID0gdW5kZWZpbmVkO1xufTtcbmV4cG9ydCBkZWZhdWx0IFBvbHlsaW5lO1xuIiwiaW1wb3J0IEJvdW5kaW5nU3BoZXJlIGZyb20gXCIuLi9Db3JlL0JvdW5kaW5nU3BoZXJlLmpzXCI7XG5pbXBvcnQgQ2FydGVzaWFuMiBmcm9tIFwiLi4vQ29yZS9DYXJ0ZXNpYW4yLmpzXCI7XG5pbXBvcnQgQ2FydGVzaWFuMyBmcm9tIFwiLi4vQ29yZS9DYXJ0ZXNpYW4zLmpzXCI7XG5pbXBvcnQgQ2FydGVzaWFuNCBmcm9tIFwiLi4vQ29yZS9DYXJ0ZXNpYW40LmpzXCI7XG5pbXBvcnQgQ2FydG9ncmFwaGljIGZyb20gXCIuLi9Db3JlL0NhcnRvZ3JhcGhpYy5qc1wiO1xuaW1wb3J0IENvbG9yIGZyb20gXCIuLi9Db3JlL0NvbG9yLmpzXCI7XG5pbXBvcnQgY29tYmluZSBmcm9tIFwiLi4vQ29yZS9jb21iaW5lLmpzXCI7XG5pbXBvcnQgQ29tcG9uZW50RGF0YXR5cGUgZnJvbSBcIi4uL0NvcmUvQ29tcG9uZW50RGF0YXR5cGUuanNcIjtcbmltcG9ydCBGcm96ZW4gZnJvbSBcIi4uL0NvcmUvRnJvemVuLmpzXCI7XG5pbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi4vQ29yZS9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgZGVzdHJveU9iamVjdCBmcm9tIFwiLi4vQ29yZS9kZXN0cm95T2JqZWN0LmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4uL0NvcmUvRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBFbmNvZGVkQ2FydGVzaWFuMyBmcm9tIFwiLi4vQ29yZS9FbmNvZGVkQ2FydGVzaWFuMy5qc1wiO1xuaW1wb3J0IEZlYXR1cmVEZXRlY3Rpb24gZnJvbSBcIi4uL0NvcmUvRmVhdHVyZURldGVjdGlvbi5qc1wiO1xuaW1wb3J0IEluZGV4RGF0YXR5cGUgZnJvbSBcIi4uL0NvcmUvSW5kZXhEYXRhdHlwZS5qc1wiO1xuaW1wb3J0IEludGVyc2VjdCBmcm9tIFwiLi4vQ29yZS9JbnRlcnNlY3QuanNcIjtcbmltcG9ydCBDZXNpdW1NYXRoIGZyb20gXCIuLi9Db3JlL01hdGguanNcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuLi9Db3JlL01hdHJpeDQuanNcIjtcbmltcG9ydCBQbGFuZSBmcm9tIFwiLi4vQ29yZS9QbGFuZS5qc1wiO1xuaW1wb3J0IFJ1bnRpbWVFcnJvciBmcm9tIFwiLi4vQ29yZS9SdW50aW1lRXJyb3IuanNcIjtcbmltcG9ydCBCdWZmZXIgZnJvbSBcIi4uL1JlbmRlcmVyL0J1ZmZlci5qc1wiO1xuaW1wb3J0IEJ1ZmZlclVzYWdlIGZyb20gXCIuLi9SZW5kZXJlci9CdWZmZXJVc2FnZS5qc1wiO1xuaW1wb3J0IENvbnRleHRMaW1pdHMgZnJvbSBcIi4uL1JlbmRlcmVyL0NvbnRleHRMaW1pdHMuanNcIjtcbmltcG9ydCBEcmF3Q29tbWFuZCBmcm9tIFwiLi4vUmVuZGVyZXIvRHJhd0NvbW1hbmQuanNcIjtcbmltcG9ydCBQYXNzIGZyb20gXCIuLi9SZW5kZXJlci9QYXNzLmpzXCI7XG5pbXBvcnQgUmVuZGVyU3RhdGUgZnJvbSBcIi4uL1JlbmRlcmVyL1JlbmRlclN0YXRlLmpzXCI7XG5pbXBvcnQgU2hhZGVyUHJvZ3JhbSBmcm9tIFwiLi4vUmVuZGVyZXIvU2hhZGVyUHJvZ3JhbS5qc1wiO1xuaW1wb3J0IFNoYWRlclNvdXJjZSBmcm9tIFwiLi4vUmVuZGVyZXIvU2hhZGVyU291cmNlLmpzXCI7XG5pbXBvcnQgVGV4dHVyZSBmcm9tIFwiLi4vUmVuZGVyZXIvVGV4dHVyZS5qc1wiO1xuaW1wb3J0IFZlcnRleEFycmF5IGZyb20gXCIuLi9SZW5kZXJlci9WZXJ0ZXhBcnJheS5qc1wiO1xuaW1wb3J0IFBvbHlsaW5lQ29tbW9uIGZyb20gXCIuLi9TaGFkZXJzL1BvbHlsaW5lQ29tbW9uLmpzXCI7XG5pbXBvcnQgUG9seWxpbmVGUyBmcm9tIFwiLi4vU2hhZGVycy9Qb2x5bGluZUZTLmpzXCI7XG5pbXBvcnQgUG9seWxpbmVWUyBmcm9tIFwiLi4vU2hhZGVycy9Qb2x5bGluZVZTLmpzXCI7XG5pbXBvcnQgQmF0Y2hUYWJsZSBmcm9tIFwiLi9CYXRjaFRhYmxlLmpzXCI7XG5pbXBvcnQgQmxlbmRpbmdTdGF0ZSBmcm9tIFwiLi9CbGVuZGluZ1N0YXRlLmpzXCI7XG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSBcIi4vTWF0ZXJpYWwuanNcIjtcbmltcG9ydCBQb2x5bGluZSBmcm9tIFwiLi9Qb2x5bGluZS5qc1wiO1xuaW1wb3J0IFNjZW5lTW9kZSBmcm9tIFwiLi9TY2VuZU1vZGUuanNcIjtcblxuY29uc3QgU0hPV19JTkRFWCA9IFBvbHlsaW5lLlNIT1dfSU5ERVg7XG5jb25zdCBXSURUSF9JTkRFWCA9IFBvbHlsaW5lLldJRFRIX0lOREVYO1xuY29uc3QgUE9TSVRJT05fSU5ERVggPSBQb2x5bGluZS5QT1NJVElPTl9JTkRFWDtcbmNvbnN0IE1BVEVSSUFMX0lOREVYID0gUG9seWxpbmUuTUFURVJJQUxfSU5ERVg7XG4vL1BPU0lUSU9OX1NJWkVfSU5ERVggaXMgbmVlZGVkIGZvciB3aGVuIHRoZSBwb2x5bGluZSdzIHBvc2l0aW9uIGFycmF5IGNoYW5nZXMgc2l6ZS5cbi8vV2hlbiBpdCBkb2VzLCB3ZSBuZWVkIHRvIHJlY3JlYXRlIHRoZSBpbmRpY2VzQnVmZmVyLlxuY29uc3QgUE9TSVRJT05fU0laRV9JTkRFWCA9IFBvbHlsaW5lLlBPU0lUSU9OX1NJWkVfSU5ERVg7XG5jb25zdCBESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTiA9IFBvbHlsaW5lLkRJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OO1xuY29uc3QgTlVNQkVSX09GX1BST1BFUlRJRVMgPSBQb2x5bGluZS5OVU1CRVJfT0ZfUFJPUEVSVElFUztcblxuY29uc3QgYXR0cmlidXRlTG9jYXRpb25zID0ge1xuICB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXg6IDAsXG4gIHBvc2l0aW9uM0RIaWdoOiAxLFxuICBwb3NpdGlvbjNETG93OiAyLFxuICBwb3NpdGlvbjJESGlnaDogMyxcbiAgcG9zaXRpb24yRExvdzogNCxcbiAgcHJldlBvc2l0aW9uM0RIaWdoOiA1LFxuICBwcmV2UG9zaXRpb24zRExvdzogNixcbiAgcHJldlBvc2l0aW9uMkRIaWdoOiA3LFxuICBwcmV2UG9zaXRpb24yRExvdzogOCxcbiAgbmV4dFBvc2l0aW9uM0RIaWdoOiA5LFxuICBuZXh0UG9zaXRpb24zRExvdzogMTAsXG4gIG5leHRQb3NpdGlvbjJESGlnaDogMTEsXG4gIG5leHRQb3NpdGlvbjJETG93OiAxMixcbn07XG5cbi8qKlxuICogQSByZW5kZXJhYmxlIGNvbGxlY3Rpb24gb2YgcG9seWxpbmVzLlxuICogPGJyIC8+PGJyIC8+XG4gKiA8ZGl2IGFsaWduPVwiY2VudGVyXCI+XG4gKiA8aW1nIHNyYz1cIkltYWdlcy9Qb2x5bGluZS5wbmdcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjMwMFwiIC8+PGJyIC8+XG4gKiBFeGFtcGxlIHBvbHlsaW5lc1xuICogPC9kaXY+XG4gKiA8YnIgLz48YnIgLz5cbiAqIFBvbHlsaW5lcyBhcmUgYWRkZWQgYW5kIHJlbW92ZWQgZnJvbSB0aGUgY29sbGVjdGlvbiB1c2luZyB7QGxpbmsgUG9seWxpbmVDb2xsZWN0aW9uI2FkZH1cbiAqIGFuZCB7QGxpbmsgUG9seWxpbmVDb2xsZWN0aW9uI3JlbW92ZX0uXG4gKlxuICogQGFsaWFzIFBvbHlsaW5lQ29sbGVjdGlvblxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBPYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiBAcGFyYW0ge01hdHJpeDR9IFtvcHRpb25zLm1vZGVsTWF0cml4PU1hdHJpeDQuSURFTlRJVFldIFRoZSA0eDQgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRoYXQgdHJhbnNmb3JtcyBlYWNoIHBvbHlsaW5lIGZyb20gbW9kZWwgdG8gd29ybGQgY29vcmRpbmF0ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlYnVnU2hvd0JvdW5kaW5nVm9sdW1lPWZhbHNlXSBGb3IgZGVidWdnaW5nIG9ubHkuIERldGVybWluZXMgaWYgdGhpcyBwcmltaXRpdmUncyBjb21tYW5kcycgYm91bmRpbmcgc3BoZXJlcyBhcmUgc2hvd24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnNob3c9dHJ1ZV0gRGV0ZXJtaW5lcyBpZiB0aGUgcG9seWxpbmVzIGluIHRoZSBjb2xsZWN0aW9uIHdpbGwgYmUgc2hvd24uXG4gKlxuICogQHBlcmZvcm1hbmNlIEZvciBiZXN0IHBlcmZvcm1hbmNlLCBwcmVmZXIgYSBmZXcgY29sbGVjdGlvbnMsIGVhY2ggd2l0aCBtYW55IHBvbHlsaW5lcywgdG9cbiAqIG1hbnkgY29sbGVjdGlvbnMgd2l0aCBvbmx5IGEgZmV3IHBvbHlsaW5lcyBlYWNoLiAgT3JnYW5pemUgY29sbGVjdGlvbnMgc28gdGhhdCBwb2x5bGluZXNcbiAqIHdpdGggdGhlIHNhbWUgdXBkYXRlIGZyZXF1ZW5jeSBhcmUgaW4gdGhlIHNhbWUgY29sbGVjdGlvbiwgaS5lLiwgcG9seWxpbmVzIHRoYXQgZG8gbm90XG4gKiBjaGFuZ2Ugc2hvdWxkIGJlIGluIG9uZSBjb2xsZWN0aW9uOyBwb2x5bGluZXMgdGhhdCBjaGFuZ2UgZXZlcnkgZnJhbWUgc2hvdWxkIGJlIGluIGFub3RoZXJcbiAqIGNvbGxlY3Rpb247IGFuZCBzbyBvbi5cbiAqXG4gKiBAc2VlIFBvbHlsaW5lQ29sbGVjdGlvbiNhZGRcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI3JlbW92ZVxuICogQHNlZSBQb2x5bGluZVxuICogQHNlZSBMYWJlbENvbGxlY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ3JlYXRlIGEgcG9seWxpbmUgY29sbGVjdGlvbiB3aXRoIHR3byBwb2x5bGluZXNcbiAqIGNvbnN0IHBvbHlsaW5lcyA9IG5ldyBDZXNpdW0uUG9seWxpbmVDb2xsZWN0aW9uKCk7XG4gKiBwb2x5bGluZXMuYWRkKHtcbiAqICAgcG9zaXRpb25zIDogQ2VzaXVtLkNhcnRlc2lhbjMuZnJvbURlZ3JlZXNBcnJheShbXG4gKiAgICAgLTc1LjEwLCAzOS41NyxcbiAqICAgICAtNzcuMDIsIDM4LjUzLFxuICogICAgIC04MC41MCwgMzUuMTQsXG4gKiAgICAgLTgwLjEyLCAyNS40Nl0pLFxuICogICB3aWR0aCA6IDJcbiAqIH0pO1xuICpcbiAqIHBvbHlsaW5lcy5hZGQoe1xuICogICBwb3NpdGlvbnMgOiBDZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlc0FycmF5KFtcbiAqICAgICAtNzMuMTAsIDM3LjU3LFxuICogICAgIC03NS4wMiwgMzYuNTMsXG4gKiAgICAgLTc4LjUwLCAzMy4xNCxcbiAqICAgICAtNzguMTIsIDIzLjQ2XSksXG4gKiAgIHdpZHRoIDogNFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIFBvbHlsaW5lQ29sbGVjdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zID8/IEZyb3plbi5FTVBUWV9PQkpFQ1Q7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgcG9seWxpbmVzIGluIHRoaXMgY29sbGVjdGlvbiB3aWxsIGJlIHNob3duLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgdGhpcy5zaG93ID0gb3B0aW9ucy5zaG93ID8/IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSA0eDQgdHJhbnNmb3JtYXRpb24gbWF0cml4IHRoYXQgdHJhbnNmb3JtcyBlYWNoIHBvbHlsaW5lIGluIHRoaXMgY29sbGVjdGlvbiBmcm9tIG1vZGVsIHRvIHdvcmxkIGNvb3JkaW5hdGVzLlxuICAgKiBXaGVuIHRoaXMgaXMgdGhlIGlkZW50aXR5IG1hdHJpeCwgdGhlIHBvbHlsaW5lcyBhcmUgZHJhd24gaW4gd29ybGQgY29vcmRpbmF0ZXMsIGkuZS4sIEVhcnRoJ3MgV0dTODQgY29vcmRpbmF0ZXMuXG4gICAqIExvY2FsIHJlZmVyZW5jZSBmcmFtZXMgY2FuIGJlIHVzZWQgYnkgcHJvdmlkaW5nIGEgZGlmZmVyZW50IHRyYW5zZm9ybWF0aW9uIG1hdHJpeCwgbGlrZSB0aGF0IHJldHVybmVkXG4gICAqIGJ5IHtAbGluayBUcmFuc2Zvcm1zLmVhc3ROb3J0aFVwVG9GaXhlZEZyYW1lfS5cbiAgICpcbiAgICogQHR5cGUge01hdHJpeDR9XG4gICAqIEBkZWZhdWx0IHtAbGluayBNYXRyaXg0LklERU5USVRZfVxuICAgKi9cbiAgdGhpcy5tb2RlbE1hdHJpeCA9IE1hdHJpeDQuY2xvbmUob3B0aW9ucy5tb2RlbE1hdHJpeCA/PyBNYXRyaXg0LklERU5USVRZKTtcbiAgdGhpcy5fbW9kZWxNYXRyaXggPSBNYXRyaXg0LmNsb25lKE1hdHJpeDQuSURFTlRJVFkpO1xuXG4gIC8qKlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGZvciBkZWJ1Z2dpbmcgb25seTsgaXQgaXMgbm90IGZvciBwcm9kdWN0aW9uIHVzZSBub3IgaXMgaXQgb3B0aW1pemVkLlxuICAgKiA8cD5cbiAgICogRHJhd3MgdGhlIGJvdW5kaW5nIHNwaGVyZSBmb3IgZWFjaCBkcmF3IGNvbW1hbmQgaW4gdGhlIHByaW1pdGl2ZS5cbiAgICogPC9wPlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHRoaXMuZGVidWdTaG93Qm91bmRpbmdWb2x1bWUgPSBvcHRpb25zLmRlYnVnU2hvd0JvdW5kaW5nVm9sdW1lID8/IGZhbHNlO1xuXG4gIHRoaXMuX29wYXF1ZVJTID0gdW5kZWZpbmVkO1xuICB0aGlzLl90cmFuc2x1Y2VudFJTID0gdW5kZWZpbmVkO1xuXG4gIHRoaXMuX2NvbG9yQ29tbWFuZHMgPSBbXTtcblxuICB0aGlzLl9wb2x5bGluZXNVcGRhdGVkID0gZmFsc2U7XG4gIHRoaXMuX3BvbHlsaW5lc1JlbW92ZWQgPSBmYWxzZTtcbiAgdGhpcy5fY3JlYXRlVmVydGV4QXJyYXkgPSBmYWxzZTtcbiAgdGhpcy5fcHJvcGVydGllc0NoYW5nZWQgPSBuZXcgVWludDMyQXJyYXkoTlVNQkVSX09GX1BST1BFUlRJRVMpO1xuICB0aGlzLl9wb2x5bGluZXMgPSBbXTtcbiAgdGhpcy5fcG9seWxpbmVCdWNrZXRzID0ge307XG5cbiAgLy8gVGhlIGJ1ZmZlciB1c2FnZSBpcyBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSB1c2FnZSBvZiB0aGUgYXR0cmlidXRlIG92ZXIgdGltZS5cbiAgdGhpcy5fcG9zaXRpb25CdWZmZXJVc2FnZSA9IHtcbiAgICBidWZmZXJVc2FnZTogQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVcsXG4gICAgZnJhbWVDb3VudDogMCxcbiAgfTtcblxuICB0aGlzLl9tb2RlID0gdW5kZWZpbmVkO1xuXG4gIHRoaXMuX3BvbHlsaW5lc1RvVXBkYXRlID0gW107XG4gIHRoaXMuX3ZlcnRleEFycmF5cyA9IFtdO1xuICB0aGlzLl9wb3NpdGlvbkJ1ZmZlciA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4QnVmZmVyID0gdW5kZWZpbmVkO1xuXG4gIHRoaXMuX2JhdGNoVGFibGUgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX2NyZWF0ZUJhdGNoVGFibGUgPSBmYWxzZTtcblxuICAvLyBPbmx5IHVzZWQgYnkgVmVjdG9yM0RUaWxlUG9pbnRzXG4gIHRoaXMuX3VzZUhpZ2hsaWdodENvbG9yID0gZmFsc2U7XG4gIHRoaXMuX2hpZ2hsaWdodENvbG9yID0gQ29sb3IuY2xvbmUoQ29sb3IuV0hJVEUpO1xuXG4gIGNvbnN0IHRoYXQgPSB0aGlzO1xuICB0aGlzLl91bmlmb3JtTWFwID0ge1xuICAgIHVfaGlnaGxpZ2h0Q29sb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGF0Ll9oaWdobGlnaHRDb2xvcjtcbiAgICB9LFxuICB9O1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhQb2x5bGluZUNvbGxlY3Rpb24ucHJvdG90eXBlLCB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgcG9seWxpbmVzIGluIHRoaXMgY29sbGVjdGlvbi4gIFRoaXMgaXMgY29tbW9ubHkgdXNlZCB3aXRoXG4gICAqIHtAbGluayBQb2x5bGluZUNvbGxlY3Rpb24jZ2V0fSB0byBpdGVyYXRlIG92ZXIgYWxsIHRoZSBwb2x5bGluZXNcbiAgICogaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZUNvbGxlY3Rpb24ucHJvdG90eXBlXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICBsZW5ndGg6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlbW92ZVBvbHlsaW5lcyh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMubGVuZ3RoO1xuICAgIH0sXG4gIH0sXG59KTtcblxuLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgYWRkcyBhIHBvbHlsaW5lIHdpdGggdGhlIHNwZWNpZmllZCBpbml0aWFsIHByb3BlcnRpZXMgdG8gdGhlIGNvbGxlY3Rpb24uXG4gICAgICogVGhlIGFkZGVkIHBvbHlsaW5lIGlzIHJldHVybmVkIHNvIGl0IGNhbiBiZSBtb2RpZmllZCBvciByZW1vdmVkIGZyb20gdGhlIGNvbGxlY3Rpb24gbGF0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH1bb3B0aW9uc10gQSB0ZW1wbGF0ZSBkZXNjcmliaW5nIHRoZSBwb2x5bGluZSdzIHByb3BlcnRpZXMgYXMgc2hvd24gaW4gRXhhbXBsZSAxLlxuICAgICAqIEByZXR1cm5zIHtQb2x5bGluZX0gVGhlIHBvbHlsaW5lIHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBlcmZvcm1hbmNlIEFmdGVyIGNhbGxpbmcgPGNvZGU+YWRkPC9jb2RlPiwge0BsaW5rIFBvbHlsaW5lQ29sbGVjdGlvbiN1cGRhdGV9IGlzIGNhbGxlZCBhbmRcbiAgICAgKiB0aGUgY29sbGVjdGlvbidzIHZlcnRleCBidWZmZXIgaXMgcmV3cml0dGVuIC0gYW4gPGNvZGU+TyhuKTwvY29kZT4gb3BlcmF0aW9uIHRoYXQgYWxzbyBpbmN1cnMgQ1BVIHRvIEdQVSBvdmVyaGVhZC5cbiAgICAgKiBGb3IgYmVzdCBwZXJmb3JtYW5jZSwgYWRkIGFzIG1hbnkgcG9seWxpbmVzIGFzIHBvc3NpYmxlIGJlZm9yZSBjYWxsaW5nIDxjb2RlPnVwZGF0ZTwvY29kZT4uXG4gICAgICpcbiAgICAgKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gVGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZCwgaS5lLiwgZGVzdHJveSgpIHdhcyBjYWxsZWQuXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gRXhhbXBsZSAxOiAgQWRkIGEgcG9seWxpbmUsIHNwZWNpZnlpbmcgYWxsIHRoZSBkZWZhdWx0IHZhbHVlcy5cbiAgICAgKiBjb25zdCBwID0gcG9seWxpbmVzLmFkZCh7XG4gICAgICogICBzaG93IDogdHJ1ZSxcbiAgICAgKiAgIHBvc2l0aW9ucyA6IGVsbGlwc29pZC5jYXJ0b2dyYXBoaWNBcnJheVRvQ2FydGVzaWFuQXJyYXkoW1xuICAgICAgICAgICBDZXNpdW0uQ2FydG9ncmFwaGljLmZyb21EZWdyZWVzKC03NS4xMCwgMzkuNTcpLFxuICAgICAgICAgICBDZXNpdW0uQ2FydG9ncmFwaGljLmZyb21EZWdyZWVzKC03Ny4wMiwgMzguNTMpXSksXG4gICAgICogICB3aWR0aCA6IDFcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI3JlbW92ZVxuICAgICAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI3JlbW92ZUFsbFxuICAgICAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI3VwZGF0ZVxuICAgICAqL1xuUG9seWxpbmVDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBjb25zdCBwID0gbmV3IFBvbHlsaW5lKG9wdGlvbnMsIHRoaXMpO1xuICBwLl9pbmRleCA9IHRoaXMuX3BvbHlsaW5lcy5sZW5ndGg7XG4gIHRoaXMuX3BvbHlsaW5lcy5wdXNoKHApO1xuICB0aGlzLl9jcmVhdGVWZXJ0ZXhBcnJheSA9IHRydWU7XG4gIHRoaXMuX2NyZWF0ZUJhdGNoVGFibGUgPSB0cnVlO1xuICByZXR1cm4gcDtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIHBvbHlsaW5lIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQHBhcmFtIHtQb2x5bGluZX0gcG9seWxpbmUgVGhlIHBvbHlsaW5lIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGUgcG9seWxpbmUgd2FzIHJlbW92ZWQ7IDxjb2RlPmZhbHNlPC9jb2RlPiBpZiB0aGUgcG9seWxpbmUgd2FzIG5vdCBmb3VuZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBAcGVyZm9ybWFuY2UgQWZ0ZXIgY2FsbGluZyA8Y29kZT5yZW1vdmU8L2NvZGU+LCB7QGxpbmsgUG9seWxpbmVDb2xsZWN0aW9uI3VwZGF0ZX0gaXMgY2FsbGVkIGFuZFxuICogdGhlIGNvbGxlY3Rpb24ncyB2ZXJ0ZXggYnVmZmVyIGlzIHJld3JpdHRlbiAtIGFuIDxjb2RlPk8obik8L2NvZGU+IG9wZXJhdGlvbiB0aGF0IGFsc28gaW5jdXJzIENQVSB0byBHUFUgb3ZlcmhlYWQuXG4gKiBGb3IgYmVzdCBwZXJmb3JtYW5jZSwgcmVtb3ZlIGFzIG1hbnkgcG9seWxpbmVzIGFzIHBvc3NpYmxlIGJlZm9yZSBjYWxsaW5nIDxjb2RlPnVwZGF0ZTwvY29kZT4uXG4gKiBJZiB5b3UgaW50ZW5kIHRvIHRlbXBvcmFyaWx5IGhpZGUgYSBwb2x5bGluZSwgaXQgaXMgdXN1YWxseSBtb3JlIGVmZmljaWVudCB0byBjYWxsXG4gKiB7QGxpbmsgUG9seWxpbmUjc2hvd30gaW5zdGVhZCBvZiByZW1vdmluZyBhbmQgcmUtYWRkaW5nIHRoZSBwb2x5bGluZS5cbiAqXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gVGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZCwgaS5lLiwgZGVzdHJveSgpIHdhcyBjYWxsZWQuXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBwID0gcG9seWxpbmVzLmFkZCguLi4pO1xuICogcG9seWxpbmVzLnJlbW92ZShwKTsgIC8vIFJldHVybnMgdHJ1ZVxuICpcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI2FkZFxuICogQHNlZSBQb2x5bGluZUNvbGxlY3Rpb24jcmVtb3ZlQWxsXG4gKiBAc2VlIFBvbHlsaW5lQ29sbGVjdGlvbiN1cGRhdGVcbiAqIEBzZWUgUG9seWxpbmUjc2hvd1xuICovXG5Qb2x5bGluZUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChwb2x5bGluZSkge1xuICBpZiAodGhpcy5jb250YWlucyhwb2x5bGluZSkpIHtcbiAgICB0aGlzLl9wb2x5bGluZXNSZW1vdmVkID0gdHJ1ZTtcbiAgICB0aGlzLl9jcmVhdGVWZXJ0ZXhBcnJheSA9IHRydWU7XG4gICAgdGhpcy5fY3JlYXRlQmF0Y2hUYWJsZSA9IHRydWU7XG4gICAgaWYgKGRlZmluZWQocG9seWxpbmUuX2J1Y2tldCkpIHtcbiAgICAgIGNvbnN0IGJ1Y2tldCA9IHBvbHlsaW5lLl9idWNrZXQ7XG4gICAgICBidWNrZXQuc2hhZGVyUHJvZ3JhbSA9XG4gICAgICAgIGJ1Y2tldC5zaGFkZXJQcm9ncmFtICYmIGJ1Y2tldC5zaGFkZXJQcm9ncmFtLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgcG9seWxpbmUuX2Rlc3Ryb3koKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgcG9seWxpbmVzIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQHBlcmZvcm1hbmNlIDxjb2RlPk8obik8L2NvZGU+LiAgSXQgaXMgbW9yZSBlZmZpY2llbnQgdG8gcmVtb3ZlIGFsbCB0aGUgcG9seWxpbmVzXG4gKiBmcm9tIGEgY29sbGVjdGlvbiBhbmQgdGhlbiBhZGQgbmV3IG9uZXMgdGhhbiB0byBjcmVhdGUgYSBuZXcgY29sbGVjdGlvbiBlbnRpcmVseS5cbiAqXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gVGhpcyBvYmplY3Qgd2FzIGRlc3Ryb3llZCwgaS5lLiwgZGVzdHJveSgpIHdhcyBjYWxsZWQuXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb2x5bGluZXMuYWRkKC4uLik7XG4gKiBwb2x5bGluZXMuYWRkKC4uLik7XG4gKiBwb2x5bGluZXMucmVtb3ZlQWxsKCk7XG4gKlxuICogQHNlZSBQb2x5bGluZUNvbGxlY3Rpb24jYWRkXG4gKiBAc2VlIFBvbHlsaW5lQ29sbGVjdGlvbiNyZW1vdmVcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI3VwZGF0ZVxuICovXG5Qb2x5bGluZUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmVsZWFzZVNoYWRlcnModGhpcyk7XG4gIGRlc3Ryb3lQb2x5bGluZXModGhpcyk7XG4gIHRoaXMuX3BvbHlsaW5lQnVja2V0cyA9IHt9O1xuICB0aGlzLl9wb2x5bGluZXNSZW1vdmVkID0gZmFsc2U7XG4gIHRoaXMuX3BvbHlsaW5lcy5sZW5ndGggPSAwO1xuICB0aGlzLl9wb2x5bGluZXNUb1VwZGF0ZS5sZW5ndGggPSAwO1xuICB0aGlzLl9jcmVhdGVWZXJ0ZXhBcnJheSA9IHRydWU7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhpcyBjb2xsZWN0aW9uIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgcG9seWxpbmUuXG4gKlxuICogQHBhcmFtIHtQb2x5bGluZX0gcG9seWxpbmUgVGhlIHBvbHlsaW5lIHRvIGNoZWNrIGZvci5cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoaXMgY29sbGVjdGlvbiBjb250YWlucyB0aGUgcG9seWxpbmUsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAc2VlIFBvbHlsaW5lQ29sbGVjdGlvbiNnZXRcbiAqL1xuUG9seWxpbmVDb2xsZWN0aW9uLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChwb2x5bGluZSkge1xuICByZXR1cm4gZGVmaW5lZChwb2x5bGluZSkgJiYgcG9seWxpbmUuX3BvbHlsaW5lQ29sbGVjdGlvbiA9PT0gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9seWxpbmUgaW4gdGhlIGNvbGxlY3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gIEluZGljZXMgYXJlIHplcm8tYmFzZWRcbiAqIGFuZCBpbmNyZWFzZSBhcyBwb2x5bGluZXMgYXJlIGFkZGVkLiAgUmVtb3ZpbmcgYSBwb2x5bGluZSBzaGlmdHMgYWxsIHBvbHlsaW5lcyBhZnRlclxuICogaXQgdG8gdGhlIGxlZnQsIGNoYW5naW5nIHRoZWlyIGluZGljZXMuICBUaGlzIGZ1bmN0aW9uIGlzIGNvbW1vbmx5IHVzZWQgd2l0aFxuICoge0BsaW5rIFBvbHlsaW5lQ29sbGVjdGlvbiNsZW5ndGh9IHRvIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIHBvbHlsaW5lc1xuICogaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBwb2x5bGluZS5cbiAqIEByZXR1cm5zIHtQb2x5bGluZX0gVGhlIHBvbHlsaW5lIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gKlxuICogQHBlcmZvcm1hbmNlIElmIHBvbHlsaW5lcyB3ZXJlIHJlbW92ZWQgZnJvbSB0aGUgY29sbGVjdGlvbiBhbmRcbiAqIHtAbGluayBQb2x5bGluZUNvbGxlY3Rpb24jdXBkYXRlfSB3YXMgbm90IGNhbGxlZCwgYW4gaW1wbGljaXQgPGNvZGU+TyhuKTwvY29kZT5cbiAqIG9wZXJhdGlvbiBpcyBwZXJmb3JtZWQuXG4gKlxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IFRoaXMgb2JqZWN0IHdhcyBkZXN0cm95ZWQsIGkuZS4sIGRlc3Ryb3koKSB3YXMgY2FsbGVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUb2dnbGUgdGhlIHNob3cgcHJvcGVydHkgb2YgZXZlcnkgcG9seWxpbmUgaW4gdGhlIGNvbGxlY3Rpb25cbiAqIGNvbnN0IGxlbiA9IHBvbHlsaW5lcy5sZW5ndGg7XG4gKiBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gKiAgIGNvbnN0IHAgPSBwb2x5bGluZXMuZ2V0KGkpO1xuICogICBwLnNob3cgPSAhcC5zaG93O1xuICogfVxuICpcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI2xlbmd0aFxuICovXG5Qb2x5bGluZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQoaW5kZXgpKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiaW5kZXggaXMgcmVxdWlyZWQuXCIpO1xuICB9XG4gIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gIHJlbW92ZVBvbHlsaW5lcyh0aGlzKTtcbiAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lc1tpbmRleF07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCYXRjaFRhYmxlKGNvbGxlY3Rpb24sIGNvbnRleHQpIHtcbiAgaWYgKGRlZmluZWQoY29sbGVjdGlvbi5fYmF0Y2hUYWJsZSkpIHtcbiAgICBjb2xsZWN0aW9uLl9iYXRjaFRhYmxlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBbXG4gICAge1xuICAgICAgZnVuY3Rpb25OYW1lOiBcImJhdGNoVGFibGVfZ2V0V2lkdGhBbmRTaG93XCIsXG4gICAgICBjb21wb25lbnREYXRhdHlwZTogQ29tcG9uZW50RGF0YXR5cGUuVU5TSUdORURfQllURSxcbiAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDIsXG4gICAgfSxcbiAgICB7XG4gICAgICBmdW5jdGlvbk5hbWU6IFwiYmF0Y2hUYWJsZV9nZXRQaWNrQ29sb3JcIixcbiAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5VTlNJR05FRF9CWVRFLFxuICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogNCxcbiAgICAgIG5vcm1hbGl6ZTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogXCJiYXRjaFRhYmxlX2dldENlbnRlckhpZ2hcIixcbiAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICBmdW5jdGlvbk5hbWU6IFwiYmF0Y2hUYWJsZV9nZXRDZW50ZXJMb3dBbmRSYWRpdXNcIixcbiAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDQsXG4gICAgfSxcbiAgICB7XG4gICAgICBmdW5jdGlvbk5hbWU6IFwiYmF0Y2hUYWJsZV9nZXREaXN0YW5jZURpc3BsYXlDb25kaXRpb25cIixcbiAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDIsXG4gICAgfSxcbiAgXTtcblxuICBjb2xsZWN0aW9uLl9iYXRjaFRhYmxlID0gbmV3IEJhdGNoVGFibGUoXG4gICAgY29udGV4dCxcbiAgICBhdHRyaWJ1dGVzLFxuICAgIGNvbGxlY3Rpb24uX3BvbHlsaW5lcy5sZW5ndGgsXG4gICk7XG59XG5cbmNvbnN0IHNjcmF0Y2hVcGRhdGVQb2x5bGluZUVuY29kZWRDYXJ0ZXNpYW4gPSBuZXcgRW5jb2RlZENhcnRlc2lhbjMoKTtcbmNvbnN0IHNjcmF0Y2hVcGRhdGVQb2x5bGluZUNhcnRlc2lhbjQgPSBuZXcgQ2FydGVzaWFuNCgpO1xuY29uc3Qgc2NyYXRjaE5lYXJGYXJDYXJ0ZXNpYW4yID0gbmV3IENhcnRlc2lhbjIoKTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiB7QGxpbmsgVmlld2VyfSBvciB7QGxpbmsgQ2VzaXVtV2lkZ2V0fSByZW5kZXIgdGhlIHNjZW5lIHRvXG4gKiBnZXQgdGhlIGRyYXcgY29tbWFuZHMgbmVlZGVkIHRvIHJlbmRlciB0aGlzIHByaW1pdGl2ZS5cbiAqIDxwPlxuICogRG8gbm90IGNhbGwgdGhpcyBmdW5jdGlvbiBkaXJlY3RseS4gIFRoaXMgaXMgZG9jdW1lbnRlZCBqdXN0IHRvXG4gKiBsaXN0IHRoZSBleGNlcHRpb25zIHRoYXQgbWF5IGJlIHByb3BhZ2F0ZWQgd2hlbiB0aGUgc2NlbmUgaXMgcmVuZGVyZWQ6XG4gKiA8L3A+XG4gKlxuICogQGV4Y2VwdGlvbiB7UnVudGltZUVycm9yfSBWZXJ0ZXggdGV4dHVyZSBmZXRjaCBzdXBwb3J0IGlzIHJlcXVpcmVkIHRvIHJlbmRlciBwcmltaXRpdmVzIHdpdGggcGVyLWluc3RhbmNlIGF0dHJpYnV0ZXMuIFRoZSBtYXhpbXVtIG51bWJlciBvZiB2ZXJ0ZXggdGV4dHVyZSBpbWFnZSB1bml0cyBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLlxuICovXG5Qb2x5bGluZUNvbGxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChmcmFtZVN0YXRlKSB7XG4gIHJlbW92ZVBvbHlsaW5lcyh0aGlzKTtcblxuICBpZiAodGhpcy5fcG9seWxpbmVzLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5zaG93KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdXBkYXRlTW9kZSh0aGlzLCBmcmFtZVN0YXRlKTtcblxuICBjb25zdCBjb250ZXh0ID0gZnJhbWVTdGF0ZS5jb250ZXh0O1xuICBjb25zdCBwcm9qZWN0aW9uID0gZnJhbWVTdGF0ZS5tYXBQcm9qZWN0aW9uO1xuICBsZXQgcG9seWxpbmU7XG4gIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5fcHJvcGVydGllc0NoYW5nZWQ7XG5cbiAgaWYgKHRoaXMuX2NyZWF0ZUJhdGNoVGFibGUpIHtcbiAgICBpZiAoQ29udGV4dExpbWl0cy5tYXhpbXVtVmVydGV4VGV4dHVyZUltYWdlVW5pdHMgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgIFwiVmVydGV4IHRleHR1cmUgZmV0Y2ggc3VwcG9ydCBpcyByZXF1aXJlZCB0byByZW5kZXIgcG9seWxpbmVzLiBUaGUgbWF4aW11bSBudW1iZXIgb2YgdmVydGV4IHRleHR1cmUgaW1hZ2UgdW5pdHMgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cIixcbiAgICAgICk7XG4gICAgfVxuICAgIGNyZWF0ZUJhdGNoVGFibGUodGhpcywgY29udGV4dCk7XG4gICAgdGhpcy5fY3JlYXRlQmF0Y2hUYWJsZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX2NyZWF0ZVZlcnRleEFycmF5IHx8IGNvbXB1dGVOZXdCdWZmZXJzVXNhZ2UodGhpcykpIHtcbiAgICBjcmVhdGVWZXJ0ZXhBcnJheXModGhpcywgY29udGV4dCwgcHJvamVjdGlvbik7XG4gIH0gZWxzZSBpZiAodGhpcy5fcG9seWxpbmVzVXBkYXRlZCkge1xuICAgIC8vIFBvbHlsaW5lcyB3ZXJlIG1vZGlmaWVkLCBidXQgbm8gcG9seWxpbmVzIHdlcmUgYWRkZWQgb3IgcmVtb3ZlZC5cbiAgICBjb25zdCBwb2x5bGluZXNUb1VwZGF0ZSA9IHRoaXMuX3BvbHlsaW5lc1RvVXBkYXRlO1xuICAgIGlmICh0aGlzLl9tb2RlICE9PSBTY2VuZU1vZGUuU0NFTkUzRCkge1xuICAgICAgY29uc3QgdXBkYXRlTGVuZ3RoID0gcG9seWxpbmVzVG9VcGRhdGUubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVMZW5ndGg7ICsraSkge1xuICAgICAgICBwb2x5bGluZSA9IHBvbHlsaW5lc1RvVXBkYXRlW2ldO1xuICAgICAgICBwb2x5bGluZS51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBhIHBvbHlsaW5lJ3MgcG9zaXRpb25zIHNpemUgY2hhbmdlcywgd2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgdmVydGV4IGFycmF5cyBhbmQgdmVydGV4IGJ1ZmZlcnMgYmVjYXVzZSB0aGUgaW5kaWNlcyB3aWxsIGJlIGRpZmZlcmVudC5cbiAgICAvLyBpZiBhIHBvbHlsaW5lJ3MgbWF0ZXJpYWwgY2hhbmdlcywgd2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgVkFPcyBhbmQgVkJPcyBiZWNhdXNlIHRoZXkgd2lsbCBiZSBiYXRjaGVkIGRpZmZlcmVudGx5LlxuICAgIGlmIChwcm9wZXJ0aWVzW1BPU0lUSU9OX1NJWkVfSU5ERVhdIHx8IHByb3BlcnRpZXNbTUFURVJJQUxfSU5ERVhdKSB7XG4gICAgICBjcmVhdGVWZXJ0ZXhBcnJheXModGhpcywgY29udGV4dCwgcHJvamVjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHBvbHlsaW5lc1RvVXBkYXRlLmxlbmd0aDtcbiAgICAgIGNvbnN0IHBvbHlsaW5lQnVja2V0cyA9IHRoaXMuX3BvbHlsaW5lQnVja2V0cztcbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBsZW5ndGg7ICsraWkpIHtcbiAgICAgICAgcG9seWxpbmUgPSBwb2x5bGluZXNUb1VwZGF0ZVtpaV07XG4gICAgICAgIHByb3BlcnRpZXMgPSBwb2x5bGluZS5fcHJvcGVydGllc0NoYW5nZWQ7XG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IHBvbHlsaW5lLl9idWNrZXQ7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgeCBpbiBwb2x5bGluZUJ1Y2tldHMpIHtcbiAgICAgICAgICBpZiAocG9seWxpbmVCdWNrZXRzLmhhc093blByb3BlcnR5KHgpKSB7XG4gICAgICAgICAgICBpZiAocG9seWxpbmVCdWNrZXRzW3hdID09PSBidWNrZXQpIHtcbiAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNbUE9TSVRJT05fSU5ERVhdKSB7XG4gICAgICAgICAgICAgICAgYnVja2V0LndyaXRlVXBkYXRlKFxuICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICBwb2x5bGluZSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uQnVmZmVyLFxuICAgICAgICAgICAgICAgICAgcHJvamVjdGlvbixcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXggKz0gcG9seWxpbmVCdWNrZXRzW3hdLmxlbmd0aE9mUG9zaXRpb25zO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzW1NIT1dfSU5ERVhdIHx8IHByb3BlcnRpZXNbV0lEVEhfSU5ERVhdKSB7XG4gICAgICAgICAgdGhpcy5fYmF0Y2hUYWJsZS5zZXRCYXRjaGVkQXR0cmlidXRlKFxuICAgICAgICAgICAgcG9seWxpbmUuX2luZGV4LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIG5ldyBDYXJ0ZXNpYW4yKHBvbHlsaW5lLl93aWR0aCwgcG9seWxpbmUuX3Nob3cpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYmF0Y2hUYWJsZS5hdHRyaWJ1dGVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICBpZiAocHJvcGVydGllc1tQT1NJVElPTl9JTkRFWF0gfHwgcHJvcGVydGllc1tQT1NJVElPTl9TSVpFX0lOREVYXSkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRpbmdTcGhlcmUgPVxuICAgICAgICAgICAgICBmcmFtZVN0YXRlLm1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTJEXG4gICAgICAgICAgICAgICAgPyBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWUyRFxuICAgICAgICAgICAgICAgIDogcG9seWxpbmUuX2JvdW5kaW5nVm9sdW1lV0M7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkQ2VudGVyID0gRW5jb2RlZENhcnRlc2lhbjMuZnJvbUNhcnRlc2lhbihcbiAgICAgICAgICAgICAgYm91bmRpbmdTcGhlcmUuY2VudGVyLFxuICAgICAgICAgICAgICBzY3JhdGNoVXBkYXRlUG9seWxpbmVFbmNvZGVkQ2FydGVzaWFuLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGxvdyA9IENhcnRlc2lhbjQuZnJvbUVsZW1lbnRzKFxuICAgICAgICAgICAgICBlbmNvZGVkQ2VudGVyLmxvdy54LFxuICAgICAgICAgICAgICBlbmNvZGVkQ2VudGVyLmxvdy55LFxuICAgICAgICAgICAgICBlbmNvZGVkQ2VudGVyLmxvdy56LFxuICAgICAgICAgICAgICBib3VuZGluZ1NwaGVyZS5yYWRpdXMsXG4gICAgICAgICAgICAgIHNjcmF0Y2hVcGRhdGVQb2x5bGluZUNhcnRlc2lhbjQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fYmF0Y2hUYWJsZS5zZXRCYXRjaGVkQXR0cmlidXRlKFxuICAgICAgICAgICAgICBwb2x5bGluZS5faW5kZXgsXG4gICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgIGVuY29kZWRDZW50ZXIuaGlnaCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9iYXRjaFRhYmxlLnNldEJhdGNoZWRBdHRyaWJ1dGUocG9seWxpbmUuX2luZGV4LCAzLCBsb3cpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW0RJU1RBTkNFX0RJU1BMQVlfQ09ORElUSU9OXSkge1xuICAgICAgICAgICAgY29uc3QgbmVhckZhckNhcnRlc2lhbiA9IHNjcmF0Y2hOZWFyRmFyQ2FydGVzaWFuMjtcbiAgICAgICAgICAgIG5lYXJGYXJDYXJ0ZXNpYW4ueCA9IDAuMDtcbiAgICAgICAgICAgIG5lYXJGYXJDYXJ0ZXNpYW4ueSA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbiA9IHBvbHlsaW5lLmRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbjtcbiAgICAgICAgICAgIGlmIChkZWZpbmVkKGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbikpIHtcbiAgICAgICAgICAgICAgbmVhckZhckNhcnRlc2lhbi54ID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLm5lYXI7XG4gICAgICAgICAgICAgIG5lYXJGYXJDYXJ0ZXNpYW4ueSA9IGRpc3RhbmNlRGlzcGxheUNvbmRpdGlvbi5mYXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2JhdGNoVGFibGUuc2V0QmF0Y2hlZEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgcG9seWxpbmUuX2luZGV4LFxuICAgICAgICAgICAgICA0LFxuICAgICAgICAgICAgICBuZWFyRmFyQ2FydGVzaWFuLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwb2x5bGluZS5fY2xlYW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcG9seWxpbmVzVG9VcGRhdGUubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9wb2x5bGluZXNVcGRhdGVkID0gZmFsc2U7XG4gIH1cblxuICBwcm9wZXJ0aWVzID0gdGhpcy5fcHJvcGVydGllc0NoYW5nZWQ7XG4gIGZvciAobGV0IGsgPSAwOyBrIDwgTlVNQkVSX09GX1BST1BFUlRJRVM7ICsraykge1xuICAgIHByb3BlcnRpZXNba10gPSAwO1xuICB9XG5cbiAgbGV0IG1vZGVsTWF0cml4ID0gTWF0cml4NC5JREVOVElUWTtcbiAgaWYgKGZyYW1lU3RhdGUubW9kZSA9PT0gU2NlbmVNb2RlLlNDRU5FM0QpIHtcbiAgICBtb2RlbE1hdHJpeCA9IHRoaXMubW9kZWxNYXRyaXg7XG4gIH1cblxuICBjb25zdCBwYXNzID0gZnJhbWVTdGF0ZS5wYXNzZXM7XG4gIGNvbnN0IHVzZURlcHRoVGVzdCA9IGZyYW1lU3RhdGUubW9ycGhUaW1lICE9PSAwLjA7XG5cbiAgaWYgKFxuICAgICFkZWZpbmVkKHRoaXMuX29wYXF1ZVJTKSB8fFxuICAgIHRoaXMuX29wYXF1ZVJTLmRlcHRoVGVzdC5lbmFibGVkICE9PSB1c2VEZXB0aFRlc3RcbiAgKSB7XG4gICAgdGhpcy5fb3BhcXVlUlMgPSBSZW5kZXJTdGF0ZS5mcm9tQ2FjaGUoe1xuICAgICAgZGVwdGhNYXNrOiB1c2VEZXB0aFRlc3QsXG4gICAgICBkZXB0aFRlc3Q6IHtcbiAgICAgICAgZW5hYmxlZDogdXNlRGVwdGhUZXN0LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChcbiAgICAhZGVmaW5lZCh0aGlzLl90cmFuc2x1Y2VudFJTKSB8fFxuICAgIHRoaXMuX3RyYW5zbHVjZW50UlMuZGVwdGhUZXN0LmVuYWJsZWQgIT09IHVzZURlcHRoVGVzdFxuICApIHtcbiAgICB0aGlzLl90cmFuc2x1Y2VudFJTID0gUmVuZGVyU3RhdGUuZnJvbUNhY2hlKHtcbiAgICAgIGJsZW5kaW5nOiBCbGVuZGluZ1N0YXRlLkFMUEhBX0JMRU5ELFxuICAgICAgZGVwdGhNYXNrOiAhdXNlRGVwdGhUZXN0LFxuICAgICAgZGVwdGhUZXN0OiB7XG4gICAgICAgIGVuYWJsZWQ6IHVzZURlcHRoVGVzdCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICB0aGlzLl9iYXRjaFRhYmxlLnVwZGF0ZShmcmFtZVN0YXRlKTtcblxuICBpZiAocGFzcy5yZW5kZXIgfHwgcGFzcy5waWNrKSB7XG4gICAgY29uc3QgY29sb3JMaXN0ID0gdGhpcy5fY29sb3JDb21tYW5kcztcbiAgICBjcmVhdGVDb21tYW5kTGlzdHModGhpcywgZnJhbWVTdGF0ZSwgY29sb3JMaXN0LCBtb2RlbE1hdHJpeCk7XG4gIH1cbn07XG5cbmNvbnN0IGJvdW5kaW5nU3BoZXJlU2NyYXRjaCA9IG5ldyBCb3VuZGluZ1NwaGVyZSgpO1xuY29uc3QgYm91bmRpbmdTcGhlcmVTY3JhdGNoMiA9IG5ldyBCb3VuZGluZ1NwaGVyZSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVDb21tYW5kTGlzdHMoXG4gIHBvbHlsaW5lQ29sbGVjdGlvbixcbiAgZnJhbWVTdGF0ZSxcbiAgY29tbWFuZHMsXG4gIG1vZGVsTWF0cml4LFxuKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBmcmFtZVN0YXRlLmNvbnRleHQ7XG4gIGNvbnN0IGNvbW1hbmRMaXN0ID0gZnJhbWVTdGF0ZS5jb21tYW5kTGlzdDtcblxuICBjb25zdCBjb21tYW5kc0xlbmd0aCA9IGNvbW1hbmRzLmxlbmd0aDtcbiAgbGV0IGNvbW1hbmRJbmRleCA9IDA7XG4gIGxldCBjbG9uZUJvdW5kaW5nU3BoZXJlID0gdHJ1ZTtcblxuICBjb25zdCB2ZXJ0ZXhBcnJheXMgPSBwb2x5bGluZUNvbGxlY3Rpb24uX3ZlcnRleEFycmF5cztcbiAgY29uc3QgZGVidWdTaG93Qm91bmRpbmdWb2x1bWUgPSBwb2x5bGluZUNvbGxlY3Rpb24uZGVidWdTaG93Qm91bmRpbmdWb2x1bWU7XG5cbiAgY29uc3QgYmF0Y2hUYWJsZSA9IHBvbHlsaW5lQ29sbGVjdGlvbi5fYmF0Y2hUYWJsZTtcbiAgY29uc3QgdW5pZm9ybUNhbGxiYWNrID0gYmF0Y2hUYWJsZS5nZXRVbmlmb3JtTWFwQ2FsbGJhY2soKTtcblxuICBjb25zdCBsZW5ndGggPSB2ZXJ0ZXhBcnJheXMubGVuZ3RoO1xuICBmb3IgKGxldCBtID0gMDsgbSA8IGxlbmd0aDsgKyttKSB7XG4gICAgY29uc3QgdmEgPSB2ZXJ0ZXhBcnJheXNbbV07XG4gICAgY29uc3QgYnVja2V0cyA9IHZhLmJ1Y2tldHM7XG4gICAgY29uc3QgYnVja2V0TGVuZ3RoID0gYnVja2V0cy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IGJ1Y2tldExlbmd0aDsgKytuKSB7XG4gICAgICBjb25zdCBidWNrZXRMb2NhdG9yID0gYnVja2V0c1tuXTtcblxuICAgICAgbGV0IG9mZnNldCA9IGJ1Y2tldExvY2F0b3Iub2Zmc2V0O1xuICAgICAgY29uc3Qgc3AgPSBidWNrZXRMb2NhdG9yLmJ1Y2tldC5zaGFkZXJQcm9ncmFtO1xuXG4gICAgICBjb25zdCBwb2x5bGluZXMgPSBidWNrZXRMb2NhdG9yLmJ1Y2tldC5wb2x5bGluZXM7XG4gICAgICBjb25zdCBwb2x5bGluZUxlbmd0aCA9IHBvbHlsaW5lcy5sZW5ndGg7XG4gICAgICBsZXQgY3VycmVudElkO1xuICAgICAgbGV0IGN1cnJlbnRNYXRlcmlhbDtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBsZXQgY29tbWFuZDtcbiAgICAgIGxldCB1bmlmb3JtTWFwO1xuXG4gICAgICBmb3IgKGxldCBzID0gMDsgcyA8IHBvbHlsaW5lTGVuZ3RoOyArK3MpIHtcbiAgICAgICAgY29uc3QgcG9seWxpbmUgPSBwb2x5bGluZXNbc107XG4gICAgICAgIGNvbnN0IG1JZCA9IGNyZWF0ZU1hdGVyaWFsSWQocG9seWxpbmUuX21hdGVyaWFsKTtcbiAgICAgICAgaWYgKG1JZCAhPT0gY3VycmVudElkKSB7XG4gICAgICAgICAgaWYgKGRlZmluZWQoY3VycmVudElkKSAmJiBjb3VudCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbHVjZW50ID0gY3VycmVudE1hdGVyaWFsLmlzVHJhbnNsdWNlbnQoKTtcblxuICAgICAgICAgICAgaWYgKGNvbW1hbmRJbmRleCA+PSBjb21tYW5kc0xlbmd0aCkge1xuICAgICAgICAgICAgICBjb21tYW5kID0gbmV3IERyYXdDb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvd25lcjogcG9seWxpbmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29tbWFuZHMucHVzaChjb21tYW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kSW5kZXhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICArK2NvbW1hbmRJbmRleDtcblxuICAgICAgICAgICAgdW5pZm9ybU1hcCA9IGNvbWJpbmUoXG4gICAgICAgICAgICAgIHVuaWZvcm1DYWxsYmFjayhjdXJyZW50TWF0ZXJpYWwuX3VuaWZvcm1zKSxcbiAgICAgICAgICAgICAgcG9seWxpbmVDb2xsZWN0aW9uLl91bmlmb3JtTWFwLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29tbWFuZC5ib3VuZGluZ1ZvbHVtZSA9IEJvdW5kaW5nU3BoZXJlLmNsb25lKFxuICAgICAgICAgICAgICBib3VuZGluZ1NwaGVyZVNjcmF0Y2gsXG4gICAgICAgICAgICAgIGNvbW1hbmQuYm91bmRpbmdWb2x1bWUsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29tbWFuZC5tb2RlbE1hdHJpeCA9IG1vZGVsTWF0cml4O1xuICAgICAgICAgICAgY29tbWFuZC5zaGFkZXJQcm9ncmFtID0gc3A7XG4gICAgICAgICAgICBjb21tYW5kLnZlcnRleEFycmF5ID0gdmEudmE7XG4gICAgICAgICAgICBjb21tYW5kLnJlbmRlclN0YXRlID0gdHJhbnNsdWNlbnRcbiAgICAgICAgICAgICAgPyBwb2x5bGluZUNvbGxlY3Rpb24uX3RyYW5zbHVjZW50UlNcbiAgICAgICAgICAgICAgOiBwb2x5bGluZUNvbGxlY3Rpb24uX29wYXF1ZVJTO1xuICAgICAgICAgICAgY29tbWFuZC5wYXNzID0gdHJhbnNsdWNlbnQgPyBQYXNzLlRSQU5TTFVDRU5UIDogUGFzcy5PUEFRVUU7XG4gICAgICAgICAgICBjb21tYW5kLmRlYnVnU2hvd0JvdW5kaW5nVm9sdW1lID0gZGVidWdTaG93Qm91bmRpbmdWb2x1bWU7XG4gICAgICAgICAgICBjb21tYW5kLnBpY2tJZCA9IFwidl9waWNrQ29sb3JcIjtcblxuICAgICAgICAgICAgY29tbWFuZC51bmlmb3JtTWFwID0gdW5pZm9ybU1hcDtcbiAgICAgICAgICAgIGNvbW1hbmQuY291bnQgPSBjb3VudDtcbiAgICAgICAgICAgIGNvbW1hbmQub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgICAgICAgICBvZmZzZXQgKz0gY291bnQ7XG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICBjbG9uZUJvdW5kaW5nU3BoZXJlID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29tbWFuZExpc3QucHVzaChjb21tYW5kKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50TWF0ZXJpYWwgPSBwb2x5bGluZS5fbWF0ZXJpYWw7XG4gICAgICAgICAgY3VycmVudE1hdGVyaWFsLnVwZGF0ZShjb250ZXh0KTtcbiAgICAgICAgICBjdXJyZW50SWQgPSBtSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2NhdG9ycyA9IHBvbHlsaW5lLl9sb2NhdG9yQnVja2V0cztcbiAgICAgICAgY29uc3QgbG9jYXRvckxlbmd0aCA9IGxvY2F0b3JzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBsb2NhdG9yTGVuZ3RoOyArK3QpIHtcbiAgICAgICAgICBjb25zdCBsb2NhdG9yID0gbG9jYXRvcnNbdF07XG4gICAgICAgICAgaWYgKGxvY2F0b3IubG9jYXRvciA9PT0gYnVja2V0TG9jYXRvcikge1xuICAgICAgICAgICAgY291bnQgKz0gbG9jYXRvci5jb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm91bmRpbmdWb2x1bWU7XG4gICAgICAgIGlmIChmcmFtZVN0YXRlLm1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTNEKSB7XG4gICAgICAgICAgYm91bmRpbmdWb2x1bWUgPSBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWVXQztcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZVN0YXRlLm1vZGUgPT09IFNjZW5lTW9kZS5DT0xVTUJVU19WSUVXKSB7XG4gICAgICAgICAgYm91bmRpbmdWb2x1bWUgPSBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWUyRDtcbiAgICAgICAgfSBlbHNlIGlmIChmcmFtZVN0YXRlLm1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTJEKSB7XG4gICAgICAgICAgaWYgKGRlZmluZWQocG9seWxpbmUuX2JvdW5kaW5nVm9sdW1lMkQpKSB7XG4gICAgICAgICAgICBib3VuZGluZ1ZvbHVtZSA9IEJvdW5kaW5nU3BoZXJlLmNsb25lKFxuICAgICAgICAgICAgICBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWUyRCxcbiAgICAgICAgICAgICAgYm91bmRpbmdTcGhlcmVTY3JhdGNoMixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBib3VuZGluZ1ZvbHVtZS5jZW50ZXIueCA9IDAuMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgZGVmaW5lZChwb2x5bGluZS5fYm91bmRpbmdWb2x1bWVXQykgJiZcbiAgICAgICAgICBkZWZpbmVkKHBvbHlsaW5lLl9ib3VuZGluZ1ZvbHVtZTJEKVxuICAgICAgICApIHtcbiAgICAgICAgICBib3VuZGluZ1ZvbHVtZSA9IEJvdW5kaW5nU3BoZXJlLnVuaW9uKFxuICAgICAgICAgICAgcG9seWxpbmUuX2JvdW5kaW5nVm9sdW1lV0MsXG4gICAgICAgICAgICBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWUyRCxcbiAgICAgICAgICAgIGJvdW5kaW5nU3BoZXJlU2NyYXRjaDIsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbG9uZUJvdW5kaW5nU3BoZXJlKSB7XG4gICAgICAgICAgY2xvbmVCb3VuZGluZ1NwaGVyZSA9IGZhbHNlO1xuICAgICAgICAgIEJvdW5kaW5nU3BoZXJlLmNsb25lKGJvdW5kaW5nVm9sdW1lLCBib3VuZGluZ1NwaGVyZVNjcmF0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEJvdW5kaW5nU3BoZXJlLnVuaW9uKFxuICAgICAgICAgICAgYm91bmRpbmdWb2x1bWUsXG4gICAgICAgICAgICBib3VuZGluZ1NwaGVyZVNjcmF0Y2gsXG4gICAgICAgICAgICBib3VuZGluZ1NwaGVyZVNjcmF0Y2gsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGVmaW5lZChjdXJyZW50SWQpICYmIGNvdW50ID4gMCkge1xuICAgICAgICBpZiAoY29tbWFuZEluZGV4ID49IGNvbW1hbmRzTGVuZ3RoKSB7XG4gICAgICAgICAgY29tbWFuZCA9IG5ldyBEcmF3Q29tbWFuZCh7XG4gICAgICAgICAgICBvd25lcjogcG9seWxpbmVDb2xsZWN0aW9uLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbW1hbmRzLnB1c2goY29tbWFuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbWFuZCA9IGNvbW1hbmRzW2NvbW1hbmRJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICArK2NvbW1hbmRJbmRleDtcblxuICAgICAgICB1bmlmb3JtTWFwID0gY29tYmluZShcbiAgICAgICAgICB1bmlmb3JtQ2FsbGJhY2soY3VycmVudE1hdGVyaWFsLl91bmlmb3JtcyksXG4gICAgICAgICAgcG9seWxpbmVDb2xsZWN0aW9uLl91bmlmb3JtTWFwLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbW1hbmQuYm91bmRpbmdWb2x1bWUgPSBCb3VuZGluZ1NwaGVyZS5jbG9uZShcbiAgICAgICAgICBib3VuZGluZ1NwaGVyZVNjcmF0Y2gsXG4gICAgICAgICAgY29tbWFuZC5ib3VuZGluZ1ZvbHVtZSxcbiAgICAgICAgKTtcbiAgICAgICAgY29tbWFuZC5tb2RlbE1hdHJpeCA9IG1vZGVsTWF0cml4O1xuICAgICAgICBjb21tYW5kLnNoYWRlclByb2dyYW0gPSBzcDtcbiAgICAgICAgY29tbWFuZC52ZXJ0ZXhBcnJheSA9IHZhLnZhO1xuICAgICAgICBjb21tYW5kLnJlbmRlclN0YXRlID0gY3VycmVudE1hdGVyaWFsLmlzVHJhbnNsdWNlbnQoKVxuICAgICAgICAgID8gcG9seWxpbmVDb2xsZWN0aW9uLl90cmFuc2x1Y2VudFJTXG4gICAgICAgICAgOiBwb2x5bGluZUNvbGxlY3Rpb24uX29wYXF1ZVJTO1xuICAgICAgICBjb21tYW5kLnBhc3MgPSBjdXJyZW50TWF0ZXJpYWwuaXNUcmFuc2x1Y2VudCgpXG4gICAgICAgICAgPyBQYXNzLlRSQU5TTFVDRU5UXG4gICAgICAgICAgOiBQYXNzLk9QQVFVRTtcbiAgICAgICAgY29tbWFuZC5kZWJ1Z1Nob3dCb3VuZGluZ1ZvbHVtZSA9IGRlYnVnU2hvd0JvdW5kaW5nVm9sdW1lO1xuICAgICAgICBjb21tYW5kLnBpY2tJZCA9IFwidl9waWNrQ29sb3JcIjtcblxuICAgICAgICBjb21tYW5kLnVuaWZvcm1NYXAgPSB1bmlmb3JtTWFwO1xuICAgICAgICBjb21tYW5kLmNvdW50ID0gY291bnQ7XG4gICAgICAgIGNvbW1hbmQub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgICAgIGNsb25lQm91bmRpbmdTcGhlcmUgPSB0cnVlO1xuXG4gICAgICAgIGNvbW1hbmRMaXN0LnB1c2goY29tbWFuZCk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRJZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBjb21tYW5kcy5sZW5ndGggPSBjb21tYW5kSW5kZXg7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoaXMgb2JqZWN0IHdhcyBkZXN0cm95ZWQ7IG90aGVyd2lzZSwgZmFsc2UuXG4gKiA8YnIgLz48YnIgLz5cbiAqIElmIHRoaXMgb2JqZWN0IHdhcyBkZXN0cm95ZWQsIGl0IHNob3VsZCBub3QgYmUgdXNlZDsgY2FsbGluZyBhbnkgZnVuY3Rpb24gb3RoZXIgdGhhblxuICogPGNvZGU+aXNEZXN0cm95ZWQ8L2NvZGU+IHdpbGwgcmVzdWx0IGluIGEge0BsaW5rIERldmVsb3BlckVycm9yfSBleGNlcHRpb24uXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoaXMgb2JqZWN0IHdhcyBkZXN0cm95ZWQ7IG90aGVyd2lzZSwgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICpcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uI2Rlc3Ryb3lcbiAqL1xuUG9seWxpbmVDb2xsZWN0aW9uLnByb3RvdHlwZS5pc0Rlc3Ryb3llZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBEZXN0cm95cyB0aGUgV2ViR0wgcmVzb3VyY2VzIGhlbGQgYnkgdGhpcyBvYmplY3QuICBEZXN0cm95aW5nIGFuIG9iamVjdCBhbGxvd3MgZm9yIGRldGVybWluaXN0aWNcbiAqIHJlbGVhc2Ugb2YgV2ViR0wgcmVzb3VyY2VzLCBpbnN0ZWFkIG9mIHJlbHlpbmcgb24gdGhlIGdhcmJhZ2UgY29sbGVjdG9yIHRvIGRlc3Ryb3kgdGhpcyBvYmplY3QuXG4gKiA8YnIgLz48YnIgLz5cbiAqIE9uY2UgYW4gb2JqZWN0IGlzIGRlc3Ryb3llZCwgaXQgc2hvdWxkIG5vdCBiZSB1c2VkOyBjYWxsaW5nIGFueSBmdW5jdGlvbiBvdGhlciB0aGFuXG4gKiA8Y29kZT5pc0Rlc3Ryb3llZDwvY29kZT4gd2lsbCByZXN1bHQgaW4gYSB7QGxpbmsgRGV2ZWxvcGVyRXJyb3J9IGV4Y2VwdGlvbi4gIFRoZXJlZm9yZSxcbiAqIGFzc2lnbiB0aGUgcmV0dXJuIHZhbHVlICg8Y29kZT51bmRlZmluZWQ8L2NvZGU+KSB0byB0aGUgb2JqZWN0IGFzIGRvbmUgaW4gdGhlIGV4YW1wbGUuXG4gKlxuICogQGV4Y2VwdGlvbiB7RGV2ZWxvcGVyRXJyb3J9IFRoaXMgb2JqZWN0IHdhcyBkZXN0cm95ZWQsIGkuZS4sIGRlc3Ryb3koKSB3YXMgY2FsbGVkLlxuICpcbiAqXG4gKiBAZXhhbXBsZVxuICogcG9seWxpbmVzID0gcG9seWxpbmVzICYmIHBvbHlsaW5lcy5kZXN0cm95KCk7XG4gKlxuICogQHNlZSBQb2x5bGluZUNvbGxlY3Rpb24jaXNEZXN0cm95ZWRcbiAqL1xuUG9seWxpbmVDb2xsZWN0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBkZXN0cm95VmVydGV4QXJyYXlzKHRoaXMpO1xuICByZWxlYXNlU2hhZGVycyh0aGlzKTtcbiAgZGVzdHJveVBvbHlsaW5lcyh0aGlzKTtcbiAgdGhpcy5fYmF0Y2hUYWJsZSA9IHRoaXMuX2JhdGNoVGFibGUgJiYgdGhpcy5fYmF0Y2hUYWJsZS5kZXN0cm95KCk7XG4gIHJldHVybiBkZXN0cm95T2JqZWN0KHRoaXMpO1xufTtcblxuZnVuY3Rpb24gY29tcHV0ZU5ld0J1ZmZlcnNVc2FnZShjb2xsZWN0aW9uKSB7XG4gIGxldCB1c2FnZUNoYW5nZWQgPSBmYWxzZTtcbiAgY29uc3QgcHJvcGVydGllcyA9IGNvbGxlY3Rpb24uX3Byb3BlcnRpZXNDaGFuZ2VkO1xuICBjb25zdCBidWZmZXJVc2FnZSA9IGNvbGxlY3Rpb24uX3Bvc2l0aW9uQnVmZmVyVXNhZ2U7XG4gIGlmIChwcm9wZXJ0aWVzW1BPU0lUSU9OX0lOREVYXSkge1xuICAgIGlmIChidWZmZXJVc2FnZS5idWZmZXJVc2FnZSAhPT0gQnVmZmVyVXNhZ2UuU1RSRUFNX0RSQVcpIHtcbiAgICAgIHVzYWdlQ2hhbmdlZCA9IHRydWU7XG4gICAgICBidWZmZXJVc2FnZS5idWZmZXJVc2FnZSA9IEJ1ZmZlclVzYWdlLlNUUkVBTV9EUkFXO1xuICAgICAgYnVmZmVyVXNhZ2UuZnJhbWVDb3VudCA9IDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyVXNhZ2UuZnJhbWVDb3VudCA9IDEwMDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYnVmZmVyVXNhZ2UuYnVmZmVyVXNhZ2UgIT09IEJ1ZmZlclVzYWdlLlNUQVRJQ19EUkFXKSB7XG4gICAgaWYgKGJ1ZmZlclVzYWdlLmZyYW1lQ291bnQgPT09IDApIHtcbiAgICAgIHVzYWdlQ2hhbmdlZCA9IHRydWU7XG4gICAgICBidWZmZXJVc2FnZS5idWZmZXJVc2FnZSA9IEJ1ZmZlclVzYWdlLlNUQVRJQ19EUkFXO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXJVc2FnZS5mcmFtZUNvdW50LS07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVzYWdlQ2hhbmdlZDtcbn1cblxuY29uc3QgZW1wdHlWZXJ0ZXhCdWZmZXIgPSBbMC4wLCAwLjAsIDAuMF07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZlcnRleEFycmF5cyhjb2xsZWN0aW9uLCBjb250ZXh0LCBwcm9qZWN0aW9uKSB7XG4gIGNvbGxlY3Rpb24uX2NyZWF0ZVZlcnRleEFycmF5ID0gZmFsc2U7XG4gIHJlbGVhc2VTaGFkZXJzKGNvbGxlY3Rpb24pO1xuICBkZXN0cm95VmVydGV4QXJyYXlzKGNvbGxlY3Rpb24pO1xuICBzb3J0UG9seWxpbmVzSW50b0J1Y2tldHMoY29sbGVjdGlvbik7XG5cbiAgLy9zdG9yZXMgYWxsIG9mIHRoZSBpbmRpdmlkdWFsIGluZGljZXMgYXJyYXlzLlxuICBjb25zdCB0b3RhbEluZGljZXMgPSBbW11dO1xuICBsZXQgaW5kaWNlcyA9IHRvdGFsSW5kaWNlc1swXTtcblxuICBjb25zdCBiYXRjaFRhYmxlID0gY29sbGVjdGlvbi5fYmF0Y2hUYWJsZTtcbiAgY29uc3QgdXNlSGlnaGxpZ2h0Q29sb3IgPSBjb2xsZWN0aW9uLl91c2VIaWdobGlnaHRDb2xvcjtcblxuICAvL3VzZWQgdG8gZGV0ZXJtaW5lIHRoZSB2ZXJ0ZXhCdWZmZXIgb2Zmc2V0IGlmIHRoZSBpbmRpY2VzQXJyYXkgZ29lcyBvdmVyIDY0ay5cbiAgLy9pZiBpdCdzIHRoZSBzYW1lIHBvbHlsaW5lIHdoaWxlIGl0IGdvZXMgb3ZlciA2NGssIHRoZSBvZmZzZXQgbmVlZHMgdG8gYmFja3RyYWNrIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGUgKiBjb21wb25lbnREYXRhdHlwZSBieXRlc1xuICAvL3NvIHRoYXQgdGhlIHBvbHlsaW5lIGxvb2tzIGNvbnRpZ3VvdXMuXG4gIC8vaWYgdGhlIHBvbHlsaW5lIGVuZHMgYXQgdGhlIDY0ayBtYXJrLCB0aGVuIHRoZSBvZmZzZXQgaXMganVzdCA2NGsgKiBjb21wb25lbnRzUGVyQXR0cmlidXRlICogY29tcG9uZW50RGF0YXR5cGVcbiAgY29uc3QgdmVydGV4QnVmZmVyT2Zmc2V0ID0gWzBdO1xuICBsZXQgb2Zmc2V0ID0gMDtcbiAgY29uc3QgdmVydGV4QXJyYXlCdWNrZXRzID0gW1tdXTtcbiAgbGV0IHRvdGFsTGVuZ3RoID0gMDtcbiAgY29uc3QgcG9seWxpbmVCdWNrZXRzID0gY29sbGVjdGlvbi5fcG9seWxpbmVCdWNrZXRzO1xuICBsZXQgeDtcbiAgbGV0IGJ1Y2tldDtcbiAgZm9yICh4IGluIHBvbHlsaW5lQnVja2V0cykge1xuICAgIGlmIChwb2x5bGluZUJ1Y2tldHMuaGFzT3duUHJvcGVydHkoeCkpIHtcbiAgICAgIGJ1Y2tldCA9IHBvbHlsaW5lQnVja2V0c1t4XTtcbiAgICAgIGJ1Y2tldC51cGRhdGVTaGFkZXIoY29udGV4dCwgYmF0Y2hUYWJsZSwgdXNlSGlnaGxpZ2h0Q29sb3IpO1xuICAgICAgdG90YWxMZW5ndGggKz0gYnVja2V0Lmxlbmd0aE9mUG9zaXRpb25zO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0b3RhbExlbmd0aCA+IDApIHtcbiAgICBjb25zdCBtb2RlID0gY29sbGVjdGlvbi5fbW9kZTtcblxuICAgIGNvbnN0IHBvc2l0aW9uQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KDYgKiB0b3RhbExlbmd0aCAqIDMpO1xuICAgIGNvbnN0IHRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSh0b3RhbExlbmd0aCAqIDQpO1xuICAgIGxldCBwb3NpdGlvbjNEQXJyYXk7XG5cbiAgICBsZXQgcG9zaXRpb25JbmRleCA9IDA7XG4gICAgbGV0IGNvbG9ySW5kZXggPSAwO1xuICAgIGxldCB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhJbmRleCA9IDA7XG4gICAgZm9yICh4IGluIHBvbHlsaW5lQnVja2V0cykge1xuICAgICAgaWYgKHBvbHlsaW5lQnVja2V0cy5oYXNPd25Qcm9wZXJ0eSh4KSkge1xuICAgICAgICBidWNrZXQgPSBwb2x5bGluZUJ1Y2tldHNbeF07XG4gICAgICAgIGJ1Y2tldC53cml0ZShcbiAgICAgICAgICBwb3NpdGlvbkFycmF5LFxuICAgICAgICAgIHRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEFycmF5LFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXgsXG4gICAgICAgICAgY29sb3JJbmRleCxcbiAgICAgICAgICB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhJbmRleCxcbiAgICAgICAgICBiYXRjaFRhYmxlLFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgcHJvamVjdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAobW9kZSA9PT0gU2NlbmVNb2RlLk1PUlBISU5HKSB7XG4gICAgICAgICAgaWYgKCFkZWZpbmVkKHBvc2l0aW9uM0RBcnJheSkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uM0RBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoNiAqIHRvdGFsTGVuZ3RoICogMyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ1Y2tldC53cml0ZUZvck1vcnBoKHBvc2l0aW9uM0RBcnJheSwgcG9zaXRpb25JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidWNrZXRMZW5ndGggPSBidWNrZXQubGVuZ3RoT2ZQb3NpdGlvbnM7XG4gICAgICAgIHBvc2l0aW9uSW5kZXggKz0gNiAqIGJ1Y2tldExlbmd0aCAqIDM7XG4gICAgICAgIGNvbG9ySW5kZXggKz0gYnVja2V0TGVuZ3RoICogNDtcbiAgICAgICAgdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4SW5kZXggKz0gYnVja2V0TGVuZ3RoICogNDtcbiAgICAgICAgb2Zmc2V0ID0gYnVja2V0LnVwZGF0ZUluZGljZXMoXG4gICAgICAgICAgdG90YWxJbmRpY2VzLFxuICAgICAgICAgIHZlcnRleEJ1ZmZlck9mZnNldCxcbiAgICAgICAgICB2ZXJ0ZXhBcnJheUJ1Y2tldHMsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvc2l0aW9uQnVmZmVyVXNhZ2UgPSBjb2xsZWN0aW9uLl9wb3NpdGlvbkJ1ZmZlclVzYWdlLmJ1ZmZlclVzYWdlO1xuICAgIGNvbnN0IHRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEJ1ZmZlclVzYWdlID0gQnVmZmVyVXNhZ2UuU1RBVElDX0RSQVc7XG5cbiAgICBjb2xsZWN0aW9uLl9wb3NpdGlvbkJ1ZmZlciA9IEJ1ZmZlci5jcmVhdGVWZXJ0ZXhCdWZmZXIoe1xuICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgIHR5cGVkQXJyYXk6IHBvc2l0aW9uQXJyYXksXG4gICAgICB1c2FnZTogcG9zaXRpb25CdWZmZXJVc2FnZSxcbiAgICB9KTtcbiAgICBsZXQgcG9zaXRpb24zREJ1ZmZlcjtcbiAgICBpZiAoZGVmaW5lZChwb3NpdGlvbjNEQXJyYXkpKSB7XG4gICAgICBwb3NpdGlvbjNEQnVmZmVyID0gQnVmZmVyLmNyZWF0ZVZlcnRleEJ1ZmZlcih7XG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIHR5cGVkQXJyYXk6IHBvc2l0aW9uM0RBcnJheSxcbiAgICAgICAgdXNhZ2U6IHBvc2l0aW9uQnVmZmVyVXNhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29sbGVjdGlvbi5fdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4QnVmZmVyID0gQnVmZmVyLmNyZWF0ZVZlcnRleEJ1ZmZlcih7XG4gICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgdHlwZWRBcnJheTogdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4QXJyYXksXG4gICAgICB1c2FnZTogdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4QnVmZmVyVXNhZ2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwb3NpdGlvblNpemVJbkJ5dGVzID0gMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVDtcbiAgICBjb25zdCB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhTaXplSW5CeXRlcyA9XG4gICAgICA0ICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UO1xuXG4gICAgbGV0IHZibyA9IDA7XG4gICAgY29uc3QgbnVtYmVyT2ZJbmRpY2VzQXJyYXlzID0gdG90YWxJbmRpY2VzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IG51bWJlck9mSW5kaWNlc0FycmF5czsgKytrKSB7XG4gICAgICBpbmRpY2VzID0gdG90YWxJbmRpY2VzW2tdO1xuXG4gICAgICBpZiAoaW5kaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGluZGljZXNBcnJheSA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcbiAgICAgICAgY29uc3QgaW5kZXhCdWZmZXIgPSBCdWZmZXIuY3JlYXRlSW5kZXhCdWZmZXIoe1xuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgdHlwZWRBcnJheTogaW5kaWNlc0FycmF5LFxuICAgICAgICAgIHVzYWdlOiBCdWZmZXJVc2FnZS5TVEFUSUNfRFJBVyxcbiAgICAgICAgICBpbmRleERhdGF0eXBlOiBJbmRleERhdGF0eXBlLlVOU0lHTkVEX1NIT1JULFxuICAgICAgICB9KTtcblxuICAgICAgICB2Ym8gKz0gdmVydGV4QnVmZmVyT2Zmc2V0W2tdO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uSGlnaE9mZnNldCA9XG4gICAgICAgICAgNiAqXG4gICAgICAgICAgKGsgKiAocG9zaXRpb25TaXplSW5CeXRlcyAqIENlc2l1bU1hdGguU0lYVFlfRk9VUl9LSUxPQllURVMpIC1cbiAgICAgICAgICAgIHZibyAqIHBvc2l0aW9uU2l6ZUluQnl0ZXMpOyAvL2NvbXBvbmVudHNQZXJBdHRyaWJ1dGUoMykgKiBjb21wb25lbnREYXRhdHlwZSg0KVxuICAgICAgICBjb25zdCBwb3NpdGlvbkxvd09mZnNldCA9IHBvc2l0aW9uU2l6ZUluQnl0ZXMgKyBwb3NpdGlvbkhpZ2hPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHByZXZQb3NpdGlvbkhpZ2hPZmZzZXQgPSBwb3NpdGlvblNpemVJbkJ5dGVzICsgcG9zaXRpb25Mb3dPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHByZXZQb3NpdGlvbkxvd09mZnNldCA9XG4gICAgICAgICAgcG9zaXRpb25TaXplSW5CeXRlcyArIHByZXZQb3NpdGlvbkhpZ2hPZmZzZXQ7XG4gICAgICAgIGNvbnN0IG5leHRQb3NpdGlvbkhpZ2hPZmZzZXQgPVxuICAgICAgICAgIHBvc2l0aW9uU2l6ZUluQnl0ZXMgKyBwcmV2UG9zaXRpb25Mb3dPZmZzZXQ7XG4gICAgICAgIGNvbnN0IG5leHRQb3NpdGlvbkxvd09mZnNldCA9XG4gICAgICAgICAgcG9zaXRpb25TaXplSW5CeXRlcyArIG5leHRQb3NpdGlvbkhpZ2hPZmZzZXQ7XG4gICAgICAgIGNvbnN0IHZlcnRleFRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEJ1ZmZlck9mZnNldCA9XG4gICAgICAgICAgayAqXG4gICAgICAgICAgICAodGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4U2l6ZUluQnl0ZXMgKlxuICAgICAgICAgICAgICBDZXNpdW1NYXRoLlNJWFRZX0ZPVVJfS0lMT0JZVEVTKSAtXG4gICAgICAgICAgdmJvICogdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4U2l6ZUluQnl0ZXM7XG5cbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogYXR0cmlidXRlTG9jYXRpb25zLnBvc2l0aW9uM0RIaWdoLFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IHBvc2l0aW9uSGlnaE9mZnNldCxcbiAgICAgICAgICAgIHN0cmlkZUluQnl0ZXM6IDYgKiBwb3NpdGlvblNpemVJbkJ5dGVzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy5wb3NpdGlvbjNETG93LFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IHBvc2l0aW9uTG93T2Zmc2V0LFxuICAgICAgICAgICAgc3RyaWRlSW5CeXRlczogNiAqIHBvc2l0aW9uU2l6ZUluQnl0ZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogYXR0cmlidXRlTG9jYXRpb25zLnBvc2l0aW9uMkRIaWdoLFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IHBvc2l0aW9uSGlnaE9mZnNldCxcbiAgICAgICAgICAgIHN0cmlkZUluQnl0ZXM6IDYgKiBwb3NpdGlvblNpemVJbkJ5dGVzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy5wb3NpdGlvbjJETG93LFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IHBvc2l0aW9uTG93T2Zmc2V0LFxuICAgICAgICAgICAgc3RyaWRlSW5CeXRlczogNiAqIHBvc2l0aW9uU2l6ZUluQnl0ZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogYXR0cmlidXRlTG9jYXRpb25zLnByZXZQb3NpdGlvbjNESGlnaCxcbiAgICAgICAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDMsXG4gICAgICAgICAgICBjb21wb25lbnREYXRhdHlwZTogQ29tcG9uZW50RGF0YXR5cGUuRkxPQVQsXG4gICAgICAgICAgICBvZmZzZXRJbkJ5dGVzOiBwcmV2UG9zaXRpb25IaWdoT2Zmc2V0LFxuICAgICAgICAgICAgc3RyaWRlSW5CeXRlczogNiAqIHBvc2l0aW9uU2l6ZUluQnl0ZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogYXR0cmlidXRlTG9jYXRpb25zLnByZXZQb3NpdGlvbjNETG93LFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IHByZXZQb3NpdGlvbkxvd09mZnNldCxcbiAgICAgICAgICAgIHN0cmlkZUluQnl0ZXM6IDYgKiBwb3NpdGlvblNpemVJbkJ5dGVzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy5wcmV2UG9zaXRpb24yREhpZ2gsXG4gICAgICAgICAgICBjb21wb25lbnRzUGVyQXR0cmlidXRlOiAzLFxuICAgICAgICAgICAgY29tcG9uZW50RGF0YXR5cGU6IENvbXBvbmVudERhdGF0eXBlLkZMT0FULFxuICAgICAgICAgICAgb2Zmc2V0SW5CeXRlczogcHJldlBvc2l0aW9uSGlnaE9mZnNldCxcbiAgICAgICAgICAgIHN0cmlkZUluQnl0ZXM6IDYgKiBwb3NpdGlvblNpemVJbkJ5dGVzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy5wcmV2UG9zaXRpb24yRExvdyxcbiAgICAgICAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDMsXG4gICAgICAgICAgICBjb21wb25lbnREYXRhdHlwZTogQ29tcG9uZW50RGF0YXR5cGUuRkxPQVQsXG4gICAgICAgICAgICBvZmZzZXRJbkJ5dGVzOiBwcmV2UG9zaXRpb25Mb3dPZmZzZXQsXG4gICAgICAgICAgICBzdHJpZGVJbkJ5dGVzOiA2ICogcG9zaXRpb25TaXplSW5CeXRlcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiBhdHRyaWJ1dGVMb2NhdGlvbnMubmV4dFBvc2l0aW9uM0RIaWdoLFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IG5leHRQb3NpdGlvbkhpZ2hPZmZzZXQsXG4gICAgICAgICAgICBzdHJpZGVJbkJ5dGVzOiA2ICogcG9zaXRpb25TaXplSW5CeXRlcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluZGV4OiBhdHRyaWJ1dGVMb2NhdGlvbnMubmV4dFBvc2l0aW9uM0RMb3csXG4gICAgICAgICAgICBjb21wb25lbnRzUGVyQXR0cmlidXRlOiAzLFxuICAgICAgICAgICAgY29tcG9uZW50RGF0YXR5cGU6IENvbXBvbmVudERhdGF0eXBlLkZMT0FULFxuICAgICAgICAgICAgb2Zmc2V0SW5CeXRlczogbmV4dFBvc2l0aW9uTG93T2Zmc2V0LFxuICAgICAgICAgICAgc3RyaWRlSW5CeXRlczogNiAqIHBvc2l0aW9uU2l6ZUluQnl0ZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogYXR0cmlidXRlTG9jYXRpb25zLm5leHRQb3NpdGlvbjJESGlnaCxcbiAgICAgICAgICAgIGNvbXBvbmVudHNQZXJBdHRyaWJ1dGU6IDMsXG4gICAgICAgICAgICBjb21wb25lbnREYXRhdHlwZTogQ29tcG9uZW50RGF0YXR5cGUuRkxPQVQsXG4gICAgICAgICAgICBvZmZzZXRJbkJ5dGVzOiBuZXh0UG9zaXRpb25IaWdoT2Zmc2V0LFxuICAgICAgICAgICAgc3RyaWRlSW5CeXRlczogNiAqIHBvc2l0aW9uU2l6ZUluQnl0ZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogYXR0cmlidXRlTG9jYXRpb25zLm5leHRQb3NpdGlvbjJETG93LFxuICAgICAgICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogMyxcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBDb21wb25lbnREYXRhdHlwZS5GTE9BVCxcbiAgICAgICAgICAgIG9mZnNldEluQnl0ZXM6IG5leHRQb3NpdGlvbkxvd09mZnNldCxcbiAgICAgICAgICAgIHN0cmlkZUluQnl0ZXM6IDYgKiBwb3NpdGlvblNpemVJbkJ5dGVzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IGF0dHJpYnV0ZUxvY2F0aW9ucy50ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXgsXG4gICAgICAgICAgICBjb21wb25lbnRzUGVyQXR0cmlidXRlOiA0LFxuICAgICAgICAgICAgY29tcG9uZW50RGF0YXR5cGU6IENvbXBvbmVudERhdGF0eXBlLkZMT0FULFxuICAgICAgICAgICAgdmVydGV4QnVmZmVyOiBjb2xsZWN0aW9uLl90ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhCdWZmZXIsXG4gICAgICAgICAgICBvZmZzZXRJbkJ5dGVzOiB2ZXJ0ZXhUZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhCdWZmZXJPZmZzZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgYnVmZmVyUHJvcGVydHkzRDtcbiAgICAgICAgbGV0IGJ1ZmZlcjNEO1xuICAgICAgICBsZXQgYnVmZmVyMkQ7XG4gICAgICAgIGxldCBidWZmZXJQcm9wZXJ0eTJEO1xuXG4gICAgICAgIGlmIChtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUzRCkge1xuICAgICAgICAgIGJ1ZmZlcjNEID0gY29sbGVjdGlvbi5fcG9zaXRpb25CdWZmZXI7XG4gICAgICAgICAgYnVmZmVyUHJvcGVydHkzRCA9IFwidmVydGV4QnVmZmVyXCI7XG4gICAgICAgICAgYnVmZmVyMkQgPSBlbXB0eVZlcnRleEJ1ZmZlcjtcbiAgICAgICAgICBidWZmZXJQcm9wZXJ0eTJEID0gXCJ2YWx1ZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIG1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTJEIHx8XG4gICAgICAgICAgbW9kZSA9PT0gU2NlbmVNb2RlLkNPTFVNQlVTX1ZJRVdcbiAgICAgICAgKSB7XG4gICAgICAgICAgYnVmZmVyM0QgPSBlbXB0eVZlcnRleEJ1ZmZlcjtcbiAgICAgICAgICBidWZmZXJQcm9wZXJ0eTNEID0gXCJ2YWx1ZVwiO1xuICAgICAgICAgIGJ1ZmZlcjJEID0gY29sbGVjdGlvbi5fcG9zaXRpb25CdWZmZXI7XG4gICAgICAgICAgYnVmZmVyUHJvcGVydHkyRCA9IFwidmVydGV4QnVmZmVyXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyM0QgPSBwb3NpdGlvbjNEQnVmZmVyO1xuICAgICAgICAgIGJ1ZmZlclByb3BlcnR5M0QgPSBcInZlcnRleEJ1ZmZlclwiO1xuICAgICAgICAgIGJ1ZmZlcjJEID0gY29sbGVjdGlvbi5fcG9zaXRpb25CdWZmZXI7XG4gICAgICAgICAgYnVmZmVyUHJvcGVydHkyRCA9IFwidmVydGV4QnVmZmVyXCI7XG4gICAgICAgIH1cblxuICAgICAgICBhdHRyaWJ1dGVzWzBdW2J1ZmZlclByb3BlcnR5M0RdID0gYnVmZmVyM0Q7XG4gICAgICAgIGF0dHJpYnV0ZXNbMV1bYnVmZmVyUHJvcGVydHkzRF0gPSBidWZmZXIzRDtcbiAgICAgICAgYXR0cmlidXRlc1syXVtidWZmZXJQcm9wZXJ0eTJEXSA9IGJ1ZmZlcjJEO1xuICAgICAgICBhdHRyaWJ1dGVzWzNdW2J1ZmZlclByb3BlcnR5MkRdID0gYnVmZmVyMkQ7XG4gICAgICAgIGF0dHJpYnV0ZXNbNF1bYnVmZmVyUHJvcGVydHkzRF0gPSBidWZmZXIzRDtcbiAgICAgICAgYXR0cmlidXRlc1s1XVtidWZmZXJQcm9wZXJ0eTNEXSA9IGJ1ZmZlcjNEO1xuICAgICAgICBhdHRyaWJ1dGVzWzZdW2J1ZmZlclByb3BlcnR5MkRdID0gYnVmZmVyMkQ7XG4gICAgICAgIGF0dHJpYnV0ZXNbN11bYnVmZmVyUHJvcGVydHkyRF0gPSBidWZmZXIyRDtcbiAgICAgICAgYXR0cmlidXRlc1s4XVtidWZmZXJQcm9wZXJ0eTNEXSA9IGJ1ZmZlcjNEO1xuICAgICAgICBhdHRyaWJ1dGVzWzldW2J1ZmZlclByb3BlcnR5M0RdID0gYnVmZmVyM0Q7XG4gICAgICAgIGF0dHJpYnV0ZXNbMTBdW2J1ZmZlclByb3BlcnR5MkRdID0gYnVmZmVyMkQ7XG4gICAgICAgIGF0dHJpYnV0ZXNbMTFdW2J1ZmZlclByb3BlcnR5MkRdID0gYnVmZmVyMkQ7XG5cbiAgICAgICAgY29uc3QgdmEgPSBuZXcgVmVydGV4QXJyYXkoe1xuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyxcbiAgICAgICAgICBpbmRleEJ1ZmZlcjogaW5kZXhCdWZmZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb2xsZWN0aW9uLl92ZXJ0ZXhBcnJheXMucHVzaCh7XG4gICAgICAgICAgdmE6IHZhLFxuICAgICAgICAgIGJ1Y2tldHM6IHZlcnRleEFycmF5QnVja2V0c1trXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGV4dHVyZSkge1xuICAgIHJldHVybiB2YWx1ZS5pZDtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuY29uc3Qgc2NyYXRjaFVuaWZvcm1BcnJheSA9IFtdO1xuZnVuY3Rpb24gY3JlYXRlTWF0ZXJpYWxJZChtYXRlcmlhbCkge1xuICBjb25zdCB1bmlmb3JtcyA9IE1hdGVyaWFsLl91bmlmb3JtTGlzdFttYXRlcmlhbC50eXBlXTtcbiAgY29uc3QgbGVuZ3RoID0gdW5pZm9ybXMubGVuZ3RoO1xuICBzY3JhdGNoVW5pZm9ybUFycmF5Lmxlbmd0aCA9IDIuMCAqIGxlbmd0aDtcblxuICBsZXQgaW5kZXggPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgdW5pZm9ybSA9IHVuaWZvcm1zW2ldO1xuICAgIHNjcmF0Y2hVbmlmb3JtQXJyYXlbaW5kZXhdID0gdW5pZm9ybTtcbiAgICBzY3JhdGNoVW5pZm9ybUFycmF5W2luZGV4ICsgMV0gPSBtYXRlcmlhbC5fdW5pZm9ybXNbdW5pZm9ybV0oKTtcbiAgICBpbmRleCArPSAyO1xuICB9XG5cbiAgcmV0dXJuIGAke21hdGVyaWFsLnR5cGV9OiR7SlNPTi5zdHJpbmdpZnkoc2NyYXRjaFVuaWZvcm1BcnJheSwgcmVwbGFjZXIpfWA7XG59XG5cbmZ1bmN0aW9uIHNvcnRQb2x5bGluZXNJbnRvQnVja2V0cyhjb2xsZWN0aW9uKSB7XG4gIGNvbnN0IG1vZGUgPSBjb2xsZWN0aW9uLl9tb2RlO1xuICBjb25zdCBtb2RlbE1hdHJpeCA9IGNvbGxlY3Rpb24uX21vZGVsTWF0cml4O1xuXG4gIGNvbnN0IHBvbHlsaW5lQnVja2V0cyA9IChjb2xsZWN0aW9uLl9wb2x5bGluZUJ1Y2tldHMgPSB7fSk7XG4gIGNvbnN0IHBvbHlsaW5lcyA9IGNvbGxlY3Rpb24uX3BvbHlsaW5lcztcbiAgY29uc3QgbGVuZ3RoID0gcG9seWxpbmVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHAgPSBwb2x5bGluZXNbaV07XG4gICAgaWYgKHAuX2FjdHVhbFBvc2l0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICBwLnVwZGF0ZSgpO1xuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBwLm1hdGVyaWFsO1xuICAgICAgbGV0IHZhbHVlID0gcG9seWxpbmVCdWNrZXRzW21hdGVyaWFsLnR5cGVdO1xuICAgICAgaWYgKCFkZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHBvbHlsaW5lQnVja2V0c1ttYXRlcmlhbC50eXBlXSA9IG5ldyBQb2x5bGluZUJ1Y2tldChcbiAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICAgIG1vZGVsTWF0cml4LFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdmFsdWUuYWRkUG9seWxpbmUocCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1vZGUoY29sbGVjdGlvbiwgZnJhbWVTdGF0ZSkge1xuICBjb25zdCBtb2RlID0gZnJhbWVTdGF0ZS5tb2RlO1xuXG4gIGlmIChcbiAgICBjb2xsZWN0aW9uLl9tb2RlICE9PSBtb2RlIHx8XG4gICAgIU1hdHJpeDQuZXF1YWxzKGNvbGxlY3Rpb24uX21vZGVsTWF0cml4LCBjb2xsZWN0aW9uLm1vZGVsTWF0cml4KVxuICApIHtcbiAgICBjb2xsZWN0aW9uLl9tb2RlID0gbW9kZTtcbiAgICBjb2xsZWN0aW9uLl9tb2RlbE1hdHJpeCA9IE1hdHJpeDQuY2xvbmUoY29sbGVjdGlvbi5tb2RlbE1hdHJpeCk7XG4gICAgY29sbGVjdGlvbi5fY3JlYXRlVmVydGV4QXJyYXkgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVBvbHlsaW5lcyhjb2xsZWN0aW9uKSB7XG4gIGlmIChjb2xsZWN0aW9uLl9wb2x5bGluZXNSZW1vdmVkKSB7XG4gICAgY29sbGVjdGlvbi5fcG9seWxpbmVzUmVtb3ZlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGRlZmluZWRQb2x5bGluZXMgPSBbXTtcbiAgICBjb25zdCBkZWZpbmVkUG9seWxpbmVzVG9VcGRhdGUgPSBbXTtcbiAgICBsZXQgcG9seUluZGV4ID0gMDtcbiAgICBsZXQgcG9seWxpbmU7XG5cbiAgICBjb25zdCBsZW5ndGggPSBjb2xsZWN0aW9uLl9wb2x5bGluZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgIHBvbHlsaW5lID0gY29sbGVjdGlvbi5fcG9seWxpbmVzW2ldO1xuICAgICAgaWYgKCFwb2x5bGluZS5pc0Rlc3Ryb3llZCkge1xuICAgICAgICBwb2x5bGluZS5faW5kZXggPSBwb2x5SW5kZXgrKztcbiAgICAgICAgZGVmaW5lZFBvbHlsaW5lc1RvVXBkYXRlLnB1c2gocG9seWxpbmUpO1xuICAgICAgICBkZWZpbmVkUG9seWxpbmVzLnB1c2gocG9seWxpbmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxlY3Rpb24uX3BvbHlsaW5lcyA9IGRlZmluZWRQb2x5bGluZXM7XG4gICAgY29sbGVjdGlvbi5fcG9seWxpbmVzVG9VcGRhdGUgPSBkZWZpbmVkUG9seWxpbmVzVG9VcGRhdGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVsZWFzZVNoYWRlcnMoY29sbGVjdGlvbikge1xuICBjb25zdCBwb2x5bGluZXMgPSBjb2xsZWN0aW9uLl9wb2x5bGluZXM7XG4gIGNvbnN0IGxlbmd0aCA9IHBvbHlsaW5lcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoIXBvbHlsaW5lc1tpXS5pc0Rlc3Ryb3llZCkge1xuICAgICAgY29uc3QgYnVja2V0ID0gcG9seWxpbmVzW2ldLl9idWNrZXQ7XG4gICAgICBpZiAoZGVmaW5lZChidWNrZXQpKSB7XG4gICAgICAgIGJ1Y2tldC5zaGFkZXJQcm9ncmFtID1cbiAgICAgICAgICBidWNrZXQuc2hhZGVyUHJvZ3JhbSAmJiBidWNrZXQuc2hhZGVyUHJvZ3JhbS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lWZXJ0ZXhBcnJheXMoY29sbGVjdGlvbikge1xuICBjb25zdCBsZW5ndGggPSBjb2xsZWN0aW9uLl92ZXJ0ZXhBcnJheXMubGVuZ3RoO1xuICBmb3IgKGxldCB0ID0gMDsgdCA8IGxlbmd0aDsgKyt0KSB7XG4gICAgY29sbGVjdGlvbi5fdmVydGV4QXJyYXlzW3RdLnZhLmRlc3Ryb3koKTtcbiAgfVxuICBjb2xsZWN0aW9uLl92ZXJ0ZXhBcnJheXMubGVuZ3RoID0gMDtcbn1cblxuUG9seWxpbmVDb2xsZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlUG9seWxpbmUgPSBmdW5jdGlvbiAoXG4gIHBvbHlsaW5lLFxuICBwcm9wZXJ0eUNoYW5nZWQsXG4pIHtcbiAgdGhpcy5fcG9seWxpbmVzVXBkYXRlZCA9IHRydWU7XG4gIGlmICghcG9seWxpbmUuX2RpcnR5KSB7XG4gICAgdGhpcy5fcG9seWxpbmVzVG9VcGRhdGUucHVzaChwb2x5bGluZSk7XG4gIH1cbiAgKyt0aGlzLl9wcm9wZXJ0aWVzQ2hhbmdlZFtwcm9wZXJ0eUNoYW5nZWRdO1xufTtcblxuZnVuY3Rpb24gZGVzdHJveVBvbHlsaW5lcyhjb2xsZWN0aW9uKSB7XG4gIGNvbnN0IHBvbHlsaW5lcyA9IGNvbGxlY3Rpb24uX3BvbHlsaW5lcztcbiAgY29uc3QgbGVuZ3RoID0gcG9seWxpbmVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICghcG9seWxpbmVzW2ldLmlzRGVzdHJveWVkKSB7XG4gICAgICBwb2x5bGluZXNbaV0uX2Rlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gVmVydGV4QXJyYXlCdWNrZXRMb2NhdG9yKGNvdW50LCBvZmZzZXQsIGJ1Y2tldCkge1xuICB0aGlzLmNvdW50ID0gY291bnQ7XG4gIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICB0aGlzLmJ1Y2tldCA9IGJ1Y2tldDtcbn1cblxuZnVuY3Rpb24gUG9seWxpbmVCdWNrZXQobWF0ZXJpYWwsIG1vZGUsIG1vZGVsTWF0cml4KSB7XG4gIHRoaXMucG9seWxpbmVzID0gW107XG4gIHRoaXMubGVuZ3RoT2ZQb3NpdGlvbnMgPSAwO1xuICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5tb2RlID0gbW9kZTtcbiAgdGhpcy5tb2RlbE1hdHJpeCA9IG1vZGVsTWF0cml4O1xufVxuXG5Qb2x5bGluZUJ1Y2tldC5wcm90b3R5cGUuYWRkUG9seWxpbmUgPSBmdW5jdGlvbiAocCkge1xuICBjb25zdCBwb2x5bGluZXMgPSB0aGlzLnBvbHlsaW5lcztcbiAgcG9seWxpbmVzLnB1c2gocCk7XG4gIHAuX2FjdHVhbExlbmd0aCA9IHRoaXMuZ2V0UG9seWxpbmVQb3NpdGlvbnNMZW5ndGgocCk7XG4gIHRoaXMubGVuZ3RoT2ZQb3NpdGlvbnMgKz0gcC5fYWN0dWFsTGVuZ3RoO1xuICBwLl9idWNrZXQgPSB0aGlzO1xufTtcblxuUG9seWxpbmVCdWNrZXQucHJvdG90eXBlLnVwZGF0ZVNoYWRlciA9IGZ1bmN0aW9uIChcbiAgY29udGV4dCxcbiAgYmF0Y2hUYWJsZSxcbiAgdXNlSGlnaGxpZ2h0Q29sb3IsXG4pIHtcbiAgaWYgKGRlZmluZWQodGhpcy5zaGFkZXJQcm9ncmFtKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGRlZmluZXMgPSBbXCJESVNUQU5DRV9ESVNQTEFZX0NPTkRJVElPTlwiXTtcbiAgaWYgKHVzZUhpZ2hsaWdodENvbG9yKSB7XG4gICAgZGVmaW5lcy5wdXNoKFwiVkVDVE9SX1RJTEVcIik7XG4gIH1cblxuICAvLyBDaGVjayBmb3IgdXNlIG9mIHZfcG9seWxpbmVBbmdsZSBpbiBtYXRlcmlhbCBzaGFkZXJcbiAgaWYgKFxuICAgIHRoaXMubWF0ZXJpYWwuc2hhZGVyU291cmNlLnNlYXJjaCgvaW5cXHMrZmxvYXRcXHMrdl9wb2x5bGluZUFuZ2xlOy9nKSAhPT0gLTFcbiAgKSB7XG4gICAgZGVmaW5lcy5wdXNoKFwiUE9MWUxJTkVfREFTSFwiKTtcbiAgfVxuXG4gIGlmICghRmVhdHVyZURldGVjdGlvbi5pc0ludGVybmV0RXhwbG9yZXIoKSkge1xuICAgIGRlZmluZXMucHVzaChcIkNMSVBfUE9MWUxJTkVcIik7XG4gIH1cblxuICBjb25zdCBmcyA9IG5ldyBTaGFkZXJTb3VyY2Uoe1xuICAgIGRlZmluZXM6IGRlZmluZXMsXG4gICAgc291cmNlczogW1wiaW4gdmVjNCB2X3BpY2tDb2xvcjtcXG5cIiwgdGhpcy5tYXRlcmlhbC5zaGFkZXJTb3VyY2UsIFBvbHlsaW5lRlNdLFxuICB9KTtcblxuICBjb25zdCB2c1NvdXJjZSA9IGJhdGNoVGFibGUuZ2V0VmVydGV4U2hhZGVyQ2FsbGJhY2soKShQb2x5bGluZVZTKTtcbiAgY29uc3QgdnMgPSBuZXcgU2hhZGVyU291cmNlKHtcbiAgICBkZWZpbmVzOiBkZWZpbmVzLFxuICAgIHNvdXJjZXM6IFtQb2x5bGluZUNvbW1vbiwgdnNTb3VyY2VdLFxuICB9KTtcblxuICB0aGlzLnNoYWRlclByb2dyYW0gPSBTaGFkZXJQcm9ncmFtLmZyb21DYWNoZSh7XG4gICAgY29udGV4dDogY29udGV4dCxcbiAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2U6IHZzLFxuICAgIGZyYWdtZW50U2hhZGVyU291cmNlOiBmcyxcbiAgICBhdHRyaWJ1dGVMb2NhdGlvbnM6IGF0dHJpYnV0ZUxvY2F0aW9ucyxcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RzSURMKHBvbHlsaW5lKSB7XG4gIHJldHVybiAoXG4gICAgQ2FydGVzaWFuMy5kb3QoQ2FydGVzaWFuMy5VTklUX1gsIHBvbHlsaW5lLl9ib3VuZGluZ1ZvbHVtZS5jZW50ZXIpIDwgMCB8fFxuICAgIHBvbHlsaW5lLl9ib3VuZGluZ1ZvbHVtZS5pbnRlcnNlY3RQbGFuZShQbGFuZS5PUklHSU5fWlhfUExBTkUpID09PVxuICAgICAgSW50ZXJzZWN0LklOVEVSU0VDVElOR1xuICApO1xufVxuXG5Qb2x5bGluZUJ1Y2tldC5wcm90b3R5cGUuZ2V0UG9seWxpbmVQb3NpdGlvbnNMZW5ndGggPSBmdW5jdGlvbiAocG9seWxpbmUpIHtcbiAgbGV0IGxlbmd0aDtcbiAgaWYgKHRoaXMubW9kZSA9PT0gU2NlbmVNb2RlLlNDRU5FM0QgfHwgIWludGVyc2VjdHNJREwocG9seWxpbmUpKSB7XG4gICAgbGVuZ3RoID0gcG9seWxpbmUuX2FjdHVhbFBvc2l0aW9ucy5sZW5ndGg7XG4gICAgcmV0dXJuIGxlbmd0aCAqIDQuMCAtIDQuMDtcbiAgfVxuXG4gIGxldCBjb3VudCA9IDA7XG4gIGNvbnN0IHNlZ21lbnRMZW5ndGhzID0gcG9seWxpbmUuX3NlZ21lbnRzLmxlbmd0aHM7XG4gIGxlbmd0aCA9IHNlZ21lbnRMZW5ndGhzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvdW50ICs9IHNlZ21lbnRMZW5ndGhzW2ldICogNC4wIC0gNC4wO1xuICB9XG5cbiAgcmV0dXJuIGNvdW50O1xufTtcblxuY29uc3Qgc2NyYXRjaFdyaXRlUG9zaXRpb24gPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3Qgc2NyYXRjaFdyaXRlUHJldlBvc2l0aW9uID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IHNjcmF0Y2hXcml0ZU5leHRQb3NpdGlvbiA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBzY3JhdGNoV3JpdGVWZWN0b3IgPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3Qgc2NyYXRjaFBpY2tDb2xvckNhcnRlc2lhbiA9IG5ldyBDYXJ0ZXNpYW40KCk7XG5jb25zdCBzY3JhdGNoV2lkdGhTaG93Q2FydGVzaWFuID0gbmV3IENhcnRlc2lhbjIoKTtcblxuUG9seWxpbmVCdWNrZXQucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKFxuICBwb3NpdGlvbkFycmF5LFxuICB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhBcnJheSxcbiAgcG9zaXRpb25JbmRleCxcbiAgY29sb3JJbmRleCxcbiAgdGV4Q29vcmRFeHBhbmRBbmRCYXRjaEluZGV4SW5kZXgsXG4gIGJhdGNoVGFibGUsXG4gIGNvbnRleHQsXG4gIHByb2plY3Rpb24sXG4pIHtcbiAgY29uc3QgbW9kZSA9IHRoaXMubW9kZTtcbiAgY29uc3QgbWF4TG9uID0gcHJvamVjdGlvbi5lbGxpcHNvaWQubWF4aW11bVJhZGl1cyAqIENlc2l1bU1hdGguUEk7XG5cbiAgY29uc3QgcG9seWxpbmVzID0gdGhpcy5wb2x5bGluZXM7XG4gIGNvbnN0IGxlbmd0aCA9IHBvbHlsaW5lcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBwb2x5bGluZSA9IHBvbHlsaW5lc1tpXTtcbiAgICBjb25zdCB3aWR0aCA9IHBvbHlsaW5lLndpZHRoO1xuICAgIGNvbnN0IHNob3cgPSBwb2x5bGluZS5zaG93ICYmIHdpZHRoID4gMC4wO1xuICAgIGNvbnN0IHBvbHlsaW5lQmF0Y2hJbmRleCA9IHBvbHlsaW5lLl9pbmRleDtcbiAgICBjb25zdCBzZWdtZW50cyA9IHRoaXMuZ2V0U2VnbWVudHMocG9seWxpbmUsIHByb2plY3Rpb24pO1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IHNlZ21lbnRzLnBvc2l0aW9ucztcbiAgICBjb25zdCBsZW5ndGhzID0gc2VnbWVudHMubGVuZ3RocztcbiAgICBjb25zdCBwb3NpdGlvbnNMZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuXG4gICAgY29uc3QgcGlja0NvbG9yID0gcG9seWxpbmUuZ2V0UGlja0lkKGNvbnRleHQpLmNvbG9yO1xuXG4gICAgbGV0IHNlZ21lbnRJbmRleCA9IDA7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgcG9zaXRpb247XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvc2l0aW9uc0xlbmd0aDsgKytqKSB7XG4gICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICBpZiAocG9seWxpbmUuX2xvb3ApIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uc1twb3NpdGlvbnNMZW5ndGggLSAyXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNjcmF0Y2hXcml0ZVZlY3RvcjtcbiAgICAgICAgICBDYXJ0ZXNpYW4zLnN1YnRyYWN0KHBvc2l0aW9uc1swXSwgcG9zaXRpb25zWzFdLCBwb3NpdGlvbik7XG4gICAgICAgICAgQ2FydGVzaWFuMy5hZGQocG9zaXRpb25zWzBdLCBwb3NpdGlvbiwgcG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uc1tqIC0gMV07XG4gICAgICB9XG5cbiAgICAgIENhcnRlc2lhbjMuY2xvbmUocG9zaXRpb24sIHNjcmF0Y2hXcml0ZVByZXZQb3NpdGlvbik7XG4gICAgICBDYXJ0ZXNpYW4zLmNsb25lKHBvc2l0aW9uc1tqXSwgc2NyYXRjaFdyaXRlUG9zaXRpb24pO1xuXG4gICAgICBpZiAoaiA9PT0gcG9zaXRpb25zTGVuZ3RoIC0gMSkge1xuICAgICAgICBpZiAocG9seWxpbmUuX2xvb3ApIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uc1sxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNjcmF0Y2hXcml0ZVZlY3RvcjtcbiAgICAgICAgICBDYXJ0ZXNpYW4zLnN1YnRyYWN0KFxuICAgICAgICAgICAgcG9zaXRpb25zW3Bvc2l0aW9uc0xlbmd0aCAtIDFdLFxuICAgICAgICAgICAgcG9zaXRpb25zW3Bvc2l0aW9uc0xlbmd0aCAtIDJdLFxuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBDYXJ0ZXNpYW4zLmFkZChwb3NpdGlvbnNbcG9zaXRpb25zTGVuZ3RoIC0gMV0sIHBvc2l0aW9uLCBwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25zW2ogKyAxXTtcbiAgICAgIH1cblxuICAgICAgQ2FydGVzaWFuMy5jbG9uZShwb3NpdGlvbiwgc2NyYXRjaFdyaXRlTmV4dFBvc2l0aW9uKTtcblxuICAgICAgY29uc3Qgc2VnbWVudExlbmd0aCA9IGxlbmd0aHNbc2VnbWVudEluZGV4XTtcbiAgICAgIGlmIChqID09PSBjb3VudCArIHNlZ21lbnRMZW5ndGgpIHtcbiAgICAgICAgY291bnQgKz0gc2VnbWVudExlbmd0aDtcbiAgICAgICAgKytzZWdtZW50SW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlZ21lbnRTdGFydCA9IGogLSBjb3VudCA9PT0gMDtcbiAgICAgIGNvbnN0IHNlZ21lbnRFbmQgPSBqID09PSBjb3VudCArIGxlbmd0aHNbc2VnbWVudEluZGV4XSAtIDE7XG5cbiAgICAgIGlmIChtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUyRCkge1xuICAgICAgICBzY3JhdGNoV3JpdGVQcmV2UG9zaXRpb24ueiA9IDAuMDtcbiAgICAgICAgc2NyYXRjaFdyaXRlUG9zaXRpb24ueiA9IDAuMDtcbiAgICAgICAgc2NyYXRjaFdyaXRlTmV4dFBvc2l0aW9uLnogPSAwLjA7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUyRCB8fCBtb2RlID09PSBTY2VuZU1vZGUuTU9SUEhJTkcpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzZWdtZW50U3RhcnQgfHwgc2VnbWVudEVuZCkgJiZcbiAgICAgICAgICBtYXhMb24gLSBNYXRoLmFicyhzY3JhdGNoV3JpdGVQb3NpdGlvbi54KSA8IDEuMFxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoc2NyYXRjaFdyaXRlUG9zaXRpb24ueCA8IDAuMCAmJlxuICAgICAgICAgICAgICBzY3JhdGNoV3JpdGVQcmV2UG9zaXRpb24ueCA+IDAuMCkgfHxcbiAgICAgICAgICAgIChzY3JhdGNoV3JpdGVQb3NpdGlvbi54ID4gMC4wICYmIHNjcmF0Y2hXcml0ZVByZXZQb3NpdGlvbi54IDwgMC4wKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgQ2FydGVzaWFuMy5jbG9uZShzY3JhdGNoV3JpdGVQb3NpdGlvbiwgc2NyYXRjaFdyaXRlUHJldlBvc2l0aW9uKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoc2NyYXRjaFdyaXRlUG9zaXRpb24ueCA8IDAuMCAmJlxuICAgICAgICAgICAgICBzY3JhdGNoV3JpdGVOZXh0UG9zaXRpb24ueCA+IDAuMCkgfHxcbiAgICAgICAgICAgIChzY3JhdGNoV3JpdGVQb3NpdGlvbi54ID4gMC4wICYmIHNjcmF0Y2hXcml0ZU5leHRQb3NpdGlvbi54IDwgMC4wKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgQ2FydGVzaWFuMy5jbG9uZShzY3JhdGNoV3JpdGVQb3NpdGlvbiwgc2NyYXRjaFdyaXRlTmV4dFBvc2l0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhcnRLID0gc2VnbWVudFN0YXJ0ID8gMiA6IDA7XG4gICAgICBjb25zdCBlbmRLID0gc2VnbWVudEVuZCA/IDIgOiA0O1xuXG4gICAgICBmb3IgKGxldCBrID0gc3RhcnRLOyBrIDwgZW5kSzsgKytrKSB7XG4gICAgICAgIEVuY29kZWRDYXJ0ZXNpYW4zLndyaXRlRWxlbWVudHMoXG4gICAgICAgICAgc2NyYXRjaFdyaXRlUG9zaXRpb24sXG4gICAgICAgICAgcG9zaXRpb25BcnJheSxcbiAgICAgICAgICBwb3NpdGlvbkluZGV4LFxuICAgICAgICApO1xuICAgICAgICBFbmNvZGVkQ2FydGVzaWFuMy53cml0ZUVsZW1lbnRzKFxuICAgICAgICAgIHNjcmF0Y2hXcml0ZVByZXZQb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbkFycmF5LFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXggKyA2LFxuICAgICAgICApO1xuICAgICAgICBFbmNvZGVkQ2FydGVzaWFuMy53cml0ZUVsZW1lbnRzKFxuICAgICAgICAgIHNjcmF0Y2hXcml0ZU5leHRQb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbkFycmF5LFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXggKyAxMixcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBrIC0gMiA8IDAgPyAtMS4wIDogMS4wO1xuICAgICAgICB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhBcnJheVt0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhJbmRleF0gPVxuICAgICAgICAgIGogLyAocG9zaXRpb25zTGVuZ3RoIC0gMSk7IC8vIHMgdGV4IGNvb3JkXG4gICAgICAgIHRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEFycmF5W3RleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEluZGV4ICsgMV0gPVxuICAgICAgICAgIDIgKiAoayAlIDIpIC0gMTsgLy8gZXhwYW5kIGRpcmVjdGlvblxuICAgICAgICB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhBcnJheVt0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhJbmRleCArIDJdID1cbiAgICAgICAgICBkaXJlY3Rpb247XG4gICAgICAgIHRleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEFycmF5W3RleENvb3JkRXhwYW5kQW5kQmF0Y2hJbmRleEluZGV4ICsgM10gPVxuICAgICAgICAgIHBvbHlsaW5lQmF0Y2hJbmRleDtcblxuICAgICAgICBwb3NpdGlvbkluZGV4ICs9IDYgKiAzO1xuICAgICAgICB0ZXhDb29yZEV4cGFuZEFuZEJhdGNoSW5kZXhJbmRleCArPSA0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbG9yQ2FydGVzaWFuID0gc2NyYXRjaFBpY2tDb2xvckNhcnRlc2lhbjtcbiAgICBjb2xvckNhcnRlc2lhbi54ID0gQ29sb3IuZmxvYXRUb0J5dGUocGlja0NvbG9yLnJlZCk7XG4gICAgY29sb3JDYXJ0ZXNpYW4ueSA9IENvbG9yLmZsb2F0VG9CeXRlKHBpY2tDb2xvci5ncmVlbik7XG4gICAgY29sb3JDYXJ0ZXNpYW4ueiA9IENvbG9yLmZsb2F0VG9CeXRlKHBpY2tDb2xvci5ibHVlKTtcbiAgICBjb2xvckNhcnRlc2lhbi53ID0gQ29sb3IuZmxvYXRUb0J5dGUocGlja0NvbG9yLmFscGhhKTtcblxuICAgIGNvbnN0IHdpZHRoU2hvd0NhcnRlc2lhbiA9IHNjcmF0Y2hXaWR0aFNob3dDYXJ0ZXNpYW47XG4gICAgd2lkdGhTaG93Q2FydGVzaWFuLnggPSB3aWR0aDtcbiAgICB3aWR0aFNob3dDYXJ0ZXNpYW4ueSA9IHNob3cgPyAxLjAgOiAwLjA7XG5cbiAgICBjb25zdCBib3VuZGluZ1NwaGVyZSA9XG4gICAgICBtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUyRFxuICAgICAgICA/IHBvbHlsaW5lLl9ib3VuZGluZ1ZvbHVtZTJEXG4gICAgICAgIDogcG9seWxpbmUuX2JvdW5kaW5nVm9sdW1lV0M7XG4gICAgY29uc3QgZW5jb2RlZENlbnRlciA9IEVuY29kZWRDYXJ0ZXNpYW4zLmZyb21DYXJ0ZXNpYW4oXG4gICAgICBib3VuZGluZ1NwaGVyZS5jZW50ZXIsXG4gICAgICBzY3JhdGNoVXBkYXRlUG9seWxpbmVFbmNvZGVkQ2FydGVzaWFuLFxuICAgICk7XG4gICAgY29uc3QgaGlnaCA9IGVuY29kZWRDZW50ZXIuaGlnaDtcbiAgICBjb25zdCBsb3cgPSBDYXJ0ZXNpYW40LmZyb21FbGVtZW50cyhcbiAgICAgIGVuY29kZWRDZW50ZXIubG93LngsXG4gICAgICBlbmNvZGVkQ2VudGVyLmxvdy55LFxuICAgICAgZW5jb2RlZENlbnRlci5sb3cueixcbiAgICAgIGJvdW5kaW5nU3BoZXJlLnJhZGl1cyxcbiAgICAgIHNjcmF0Y2hVcGRhdGVQb2x5bGluZUNhcnRlc2lhbjQsXG4gICAgKTtcblxuICAgIGNvbnN0IG5lYXJGYXJDYXJ0ZXNpYW4gPSBzY3JhdGNoTmVhckZhckNhcnRlc2lhbjI7XG4gICAgbmVhckZhckNhcnRlc2lhbi54ID0gMC4wO1xuICAgIG5lYXJGYXJDYXJ0ZXNpYW4ueSA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICBjb25zdCBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24gPSBwb2x5bGluZS5kaXN0YW5jZURpc3BsYXlDb25kaXRpb247XG4gICAgaWYgKGRlZmluZWQoZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uKSkge1xuICAgICAgbmVhckZhckNhcnRlc2lhbi54ID0gZGlzdGFuY2VEaXNwbGF5Q29uZGl0aW9uLm5lYXI7XG4gICAgICBuZWFyRmFyQ2FydGVzaWFuLnkgPSBkaXN0YW5jZURpc3BsYXlDb25kaXRpb24uZmFyO1xuICAgIH1cblxuICAgIGJhdGNoVGFibGUuc2V0QmF0Y2hlZEF0dHJpYnV0ZShwb2x5bGluZUJhdGNoSW5kZXgsIDAsIHdpZHRoU2hvd0NhcnRlc2lhbik7XG4gICAgYmF0Y2hUYWJsZS5zZXRCYXRjaGVkQXR0cmlidXRlKHBvbHlsaW5lQmF0Y2hJbmRleCwgMSwgY29sb3JDYXJ0ZXNpYW4pO1xuXG4gICAgaWYgKGJhdGNoVGFibGUuYXR0cmlidXRlcy5sZW5ndGggPiAyKSB7XG4gICAgICBiYXRjaFRhYmxlLnNldEJhdGNoZWRBdHRyaWJ1dGUocG9seWxpbmVCYXRjaEluZGV4LCAyLCBoaWdoKTtcbiAgICAgIGJhdGNoVGFibGUuc2V0QmF0Y2hlZEF0dHJpYnV0ZShwb2x5bGluZUJhdGNoSW5kZXgsIDMsIGxvdyk7XG4gICAgICBiYXRjaFRhYmxlLnNldEJhdGNoZWRBdHRyaWJ1dGUocG9seWxpbmVCYXRjaEluZGV4LCA0LCBuZWFyRmFyQ2FydGVzaWFuKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IG1vcnBoUG9zaXRpb25TY3JhdGNoID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IG1vcnBoUHJldlBvc2l0aW9uU2NyYXRjaCA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBtb3JwaE5leHRQb3NpdGlvblNjcmF0Y2ggPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3QgbW9ycGhWZWN0b3JTY3JhdGNoID0gbmV3IENhcnRlc2lhbjMoKTtcblxuUG9seWxpbmVCdWNrZXQucHJvdG90eXBlLndyaXRlRm9yTW9ycGggPSBmdW5jdGlvbiAoXG4gIHBvc2l0aW9uQXJyYXksXG4gIHBvc2l0aW9uSW5kZXgsXG4pIHtcbiAgY29uc3QgbW9kZWxNYXRyaXggPSB0aGlzLm1vZGVsTWF0cml4O1xuICBjb25zdCBwb2x5bGluZXMgPSB0aGlzLnBvbHlsaW5lcztcbiAgY29uc3QgbGVuZ3RoID0gcG9seWxpbmVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBvbHlsaW5lID0gcG9seWxpbmVzW2ldO1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IHBvbHlsaW5lLl9zZWdtZW50cy5wb3NpdGlvbnM7XG4gICAgY29uc3QgbGVuZ3RocyA9IHBvbHlsaW5lLl9zZWdtZW50cy5sZW5ndGhzO1xuICAgIGNvbnN0IHBvc2l0aW9uc0xlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGg7XG5cbiAgICBsZXQgc2VnbWVudEluZGV4ID0gMDtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwb3NpdGlvbnNMZW5ndGg7ICsraikge1xuICAgICAgbGV0IHByZXZQb3NpdGlvbjtcbiAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgIGlmIChwb2x5bGluZS5fbG9vcCkge1xuICAgICAgICAgIHByZXZQb3NpdGlvbiA9IHBvc2l0aW9uc1twb3NpdGlvbnNMZW5ndGggLSAyXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmV2UG9zaXRpb24gPSBtb3JwaFZlY3RvclNjcmF0Y2g7XG4gICAgICAgICAgQ2FydGVzaWFuMy5zdWJ0cmFjdChwb3NpdGlvbnNbMF0sIHBvc2l0aW9uc1sxXSwgcHJldlBvc2l0aW9uKTtcbiAgICAgICAgICBDYXJ0ZXNpYW4zLmFkZChwb3NpdGlvbnNbMF0sIHByZXZQb3NpdGlvbiwgcHJldlBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJldlBvc2l0aW9uID0gcG9zaXRpb25zW2ogLSAxXTtcbiAgICAgIH1cblxuICAgICAgcHJldlBvc2l0aW9uID0gTWF0cml4NC5tdWx0aXBseUJ5UG9pbnQoXG4gICAgICAgIG1vZGVsTWF0cml4LFxuICAgICAgICBwcmV2UG9zaXRpb24sXG4gICAgICAgIG1vcnBoUHJldlBvc2l0aW9uU2NyYXRjaCxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gTWF0cml4NC5tdWx0aXBseUJ5UG9pbnQoXG4gICAgICAgIG1vZGVsTWF0cml4LFxuICAgICAgICBwb3NpdGlvbnNbal0sXG4gICAgICAgIG1vcnBoUG9zaXRpb25TY3JhdGNoLFxuICAgICAgKTtcblxuICAgICAgbGV0IG5leHRQb3NpdGlvbjtcbiAgICAgIGlmIChqID09PSBwb3NpdGlvbnNMZW5ndGggLSAxKSB7XG4gICAgICAgIGlmIChwb2x5bGluZS5fbG9vcCkge1xuICAgICAgICAgIG5leHRQb3NpdGlvbiA9IHBvc2l0aW9uc1sxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0UG9zaXRpb24gPSBtb3JwaFZlY3RvclNjcmF0Y2g7XG4gICAgICAgICAgQ2FydGVzaWFuMy5zdWJ0cmFjdChcbiAgICAgICAgICAgIHBvc2l0aW9uc1twb3NpdGlvbnNMZW5ndGggLSAxXSxcbiAgICAgICAgICAgIHBvc2l0aW9uc1twb3NpdGlvbnNMZW5ndGggLSAyXSxcbiAgICAgICAgICAgIG5leHRQb3NpdGlvbixcbiAgICAgICAgICApO1xuICAgICAgICAgIENhcnRlc2lhbjMuYWRkKFxuICAgICAgICAgICAgcG9zaXRpb25zW3Bvc2l0aW9uc0xlbmd0aCAtIDFdLFxuICAgICAgICAgICAgbmV4dFBvc2l0aW9uLFxuICAgICAgICAgICAgbmV4dFBvc2l0aW9uLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHRQb3NpdGlvbiA9IHBvc2l0aW9uc1tqICsgMV07XG4gICAgICB9XG5cbiAgICAgIG5leHRQb3NpdGlvbiA9IE1hdHJpeDQubXVsdGlwbHlCeVBvaW50KFxuICAgICAgICBtb2RlbE1hdHJpeCxcbiAgICAgICAgbmV4dFBvc2l0aW9uLFxuICAgICAgICBtb3JwaE5leHRQb3NpdGlvblNjcmF0Y2gsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzZWdtZW50TGVuZ3RoID0gbGVuZ3Roc1tzZWdtZW50SW5kZXhdO1xuICAgICAgaWYgKGogPT09IGNvdW50ICsgc2VnbWVudExlbmd0aCkge1xuICAgICAgICBjb3VudCArPSBzZWdtZW50TGVuZ3RoO1xuICAgICAgICArK3NlZ21lbnRJbmRleDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VnbWVudFN0YXJ0ID0gaiAtIGNvdW50ID09PSAwO1xuICAgICAgY29uc3Qgc2VnbWVudEVuZCA9IGogPT09IGNvdW50ICsgbGVuZ3Roc1tzZWdtZW50SW5kZXhdIC0gMTtcblxuICAgICAgY29uc3Qgc3RhcnRLID0gc2VnbWVudFN0YXJ0ID8gMiA6IDA7XG4gICAgICBjb25zdCBlbmRLID0gc2VnbWVudEVuZCA/IDIgOiA0O1xuXG4gICAgICBmb3IgKGxldCBrID0gc3RhcnRLOyBrIDwgZW5kSzsgKytrKSB7XG4gICAgICAgIEVuY29kZWRDYXJ0ZXNpYW4zLndyaXRlRWxlbWVudHMocG9zaXRpb24sIHBvc2l0aW9uQXJyYXksIHBvc2l0aW9uSW5kZXgpO1xuICAgICAgICBFbmNvZGVkQ2FydGVzaWFuMy53cml0ZUVsZW1lbnRzKFxuICAgICAgICAgIHByZXZQb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbkFycmF5LFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXggKyA2LFxuICAgICAgICApO1xuICAgICAgICBFbmNvZGVkQ2FydGVzaWFuMy53cml0ZUVsZW1lbnRzKFxuICAgICAgICAgIG5leHRQb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbkFycmF5LFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXggKyAxMixcbiAgICAgICAgKTtcblxuICAgICAgICBwb3NpdGlvbkluZGV4ICs9IDYgKiAzO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgc2NyYXRjaFNlZ21lbnRMZW5ndGhzID0gbmV3IEFycmF5KDEpO1xuXG5Qb2x5bGluZUJ1Y2tldC5wcm90b3R5cGUudXBkYXRlSW5kaWNlcyA9IGZ1bmN0aW9uIChcbiAgdG90YWxJbmRpY2VzLFxuICB2ZXJ0ZXhCdWZmZXJPZmZzZXQsXG4gIHZlcnRleEFycmF5QnVja2V0cyxcbiAgb2Zmc2V0LFxuKSB7XG4gIGxldCB2YUNvdW50ID0gdmVydGV4QXJyYXlCdWNrZXRzLmxlbmd0aCAtIDE7XG4gIGxldCBidWNrZXRMb2NhdG9yID0gbmV3IFZlcnRleEFycmF5QnVja2V0TG9jYXRvcigwLCBvZmZzZXQsIHRoaXMpO1xuICB2ZXJ0ZXhBcnJheUJ1Y2tldHNbdmFDb3VudF0ucHVzaChidWNrZXRMb2NhdG9yKTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgbGV0IGluZGljZXMgPSB0b3RhbEluZGljZXNbdG90YWxJbmRpY2VzLmxlbmd0aCAtIDFdO1xuICBsZXQgaW5kaWNlc0NvdW50ID0gMDtcbiAgaWYgKGluZGljZXMubGVuZ3RoID4gMCkge1xuICAgIGluZGljZXNDb3VudCA9IGluZGljZXNbaW5kaWNlcy5sZW5ndGggLSAxXSArIDE7XG4gIH1cbiAgY29uc3QgcG9seWxpbmVzID0gdGhpcy5wb2x5bGluZXM7XG4gIGNvbnN0IGxlbmd0aCA9IHBvbHlsaW5lcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBwb2x5bGluZSA9IHBvbHlsaW5lc1tpXTtcbiAgICBwb2x5bGluZS5fbG9jYXRvckJ1Y2tldHMgPSBbXTtcblxuICAgIGxldCBzZWdtZW50cztcbiAgICBpZiAodGhpcy5tb2RlID09PSBTY2VuZU1vZGUuU0NFTkUzRCkge1xuICAgICAgc2VnbWVudHMgPSBzY3JhdGNoU2VnbWVudExlbmd0aHM7XG4gICAgICBjb25zdCBwb3NpdGlvbnNMZW5ndGggPSBwb2x5bGluZS5fYWN0dWFsUG9zaXRpb25zLmxlbmd0aDtcbiAgICAgIGlmIChwb3NpdGlvbnNMZW5ndGggPiAwKSB7XG4gICAgICAgIHNlZ21lbnRzWzBdID0gcG9zaXRpb25zTGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlZ21lbnRzID0gcG9seWxpbmUuX3NlZ21lbnRzLmxlbmd0aHM7XG4gICAgfVxuXG4gICAgY29uc3QgbnVtYmVyT2ZTZWdtZW50cyA9IHNlZ21lbnRzLmxlbmd0aDtcbiAgICBpZiAobnVtYmVyT2ZTZWdtZW50cyA+IDApIHtcbiAgICAgIGxldCBzZWdtZW50SW5kZXhDb3VudCA9IDA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bWJlck9mU2VnbWVudHM7ICsraikge1xuICAgICAgICBjb25zdCBzZWdtZW50TGVuZ3RoID0gc2VnbWVudHNbal0gLSAxLjA7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2VnbWVudExlbmd0aDsgKytrKSB7XG4gICAgICAgICAgaWYgKGluZGljZXNDb3VudCArIDQgPiBDZXNpdW1NYXRoLlNJWFRZX0ZPVVJfS0lMT0JZVEVTKSB7XG4gICAgICAgICAgICBwb2x5bGluZS5fbG9jYXRvckJ1Y2tldHMucHVzaCh7XG4gICAgICAgICAgICAgIGxvY2F0b3I6IGJ1Y2tldExvY2F0b3IsXG4gICAgICAgICAgICAgIGNvdW50OiBzZWdtZW50SW5kZXhDb3VudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VnbWVudEluZGV4Q291bnQgPSAwO1xuICAgICAgICAgICAgdmVydGV4QnVmZmVyT2Zmc2V0LnB1c2goNCk7XG4gICAgICAgICAgICBpbmRpY2VzID0gW107XG4gICAgICAgICAgICB0b3RhbEluZGljZXMucHVzaChpbmRpY2VzKTtcbiAgICAgICAgICAgIGluZGljZXNDb3VudCA9IDA7XG4gICAgICAgICAgICBidWNrZXRMb2NhdG9yLmNvdW50ID0gY291bnQ7XG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgYnVja2V0TG9jYXRvciA9IG5ldyBWZXJ0ZXhBcnJheUJ1Y2tldExvY2F0b3IoMCwgMCwgdGhpcyk7XG4gICAgICAgICAgICB2ZXJ0ZXhBcnJheUJ1Y2tldHNbKyt2YUNvdW50XSA9IFtidWNrZXRMb2NhdG9yXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpbmRpY2VzLnB1c2goaW5kaWNlc0NvdW50LCBpbmRpY2VzQ291bnQgKyAyLCBpbmRpY2VzQ291bnQgKyAxKTtcbiAgICAgICAgICBpbmRpY2VzLnB1c2goaW5kaWNlc0NvdW50ICsgMSwgaW5kaWNlc0NvdW50ICsgMiwgaW5kaWNlc0NvdW50ICsgMyk7XG5cbiAgICAgICAgICBzZWdtZW50SW5kZXhDb3VudCArPSA2O1xuICAgICAgICAgIGNvdW50ICs9IDY7XG4gICAgICAgICAgb2Zmc2V0ICs9IDY7XG4gICAgICAgICAgaW5kaWNlc0NvdW50ICs9IDQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcG9seWxpbmUuX2xvY2F0b3JCdWNrZXRzLnB1c2goe1xuICAgICAgICBsb2NhdG9yOiBidWNrZXRMb2NhdG9yLFxuICAgICAgICBjb3VudDogc2VnbWVudEluZGV4Q291bnQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGluZGljZXNDb3VudCArIDQgPiBDZXNpdW1NYXRoLlNJWFRZX0ZPVVJfS0lMT0JZVEVTKSB7XG4gICAgICAgIHZlcnRleEJ1ZmZlck9mZnNldC5wdXNoKDApO1xuICAgICAgICBpbmRpY2VzID0gW107XG4gICAgICAgIHRvdGFsSW5kaWNlcy5wdXNoKGluZGljZXMpO1xuICAgICAgICBpbmRpY2VzQ291bnQgPSAwO1xuICAgICAgICBidWNrZXRMb2NhdG9yLmNvdW50ID0gY291bnQ7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgYnVja2V0TG9jYXRvciA9IG5ldyBWZXJ0ZXhBcnJheUJ1Y2tldExvY2F0b3IoMCwgMCwgdGhpcyk7XG4gICAgICAgIHZlcnRleEFycmF5QnVja2V0c1srK3ZhQ291bnRdID0gW2J1Y2tldExvY2F0b3JdO1xuICAgICAgfVxuICAgIH1cbiAgICBwb2x5bGluZS5fY2xlYW4oKTtcbiAgfVxuICBidWNrZXRMb2NhdG9yLmNvdW50ID0gY291bnQ7XG4gIHJldHVybiBvZmZzZXQ7XG59O1xuXG5Qb2x5bGluZUJ1Y2tldC5wcm90b3R5cGUuZ2V0UG9seWxpbmVTdGFydEluZGV4ID0gZnVuY3Rpb24gKHBvbHlsaW5lKSB7XG4gIGNvbnN0IHBvbHlsaW5lcyA9IHRoaXMucG9seWxpbmVzO1xuICBsZXQgcG9zaXRpb25JbmRleCA9IDA7XG4gIGNvbnN0IGxlbmd0aCA9IHBvbHlsaW5lcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBwID0gcG9seWxpbmVzW2ldO1xuICAgIGlmIChwID09PSBwb2x5bGluZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHBvc2l0aW9uSW5kZXggKz0gcC5fYWN0dWFsTGVuZ3RoO1xuICB9XG4gIHJldHVybiBwb3NpdGlvbkluZGV4O1xufTtcblxuY29uc3Qgc2NyYXRjaFNlZ21lbnRzID0ge1xuICBwb3NpdGlvbnM6IHVuZGVmaW5lZCxcbiAgbGVuZ3RoczogdW5kZWZpbmVkLFxufTtcbmNvbnN0IHNjcmF0Y2hMZW5ndGhzID0gbmV3IEFycmF5KDEpO1xuY29uc3QgcHNjcmF0Y2ggPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3Qgc2NyYXRjaENhcnRvZ3JhcGhpYyA9IG5ldyBDYXJ0b2dyYXBoaWMoKTtcblxuUG9seWxpbmVCdWNrZXQucHJvdG90eXBlLmdldFNlZ21lbnRzID0gZnVuY3Rpb24gKHBvbHlsaW5lLCBwcm9qZWN0aW9uKSB7XG4gIGxldCBwb3NpdGlvbnMgPSBwb2x5bGluZS5fYWN0dWFsUG9zaXRpb25zO1xuXG4gIGlmICh0aGlzLm1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTNEKSB7XG4gICAgc2NyYXRjaExlbmd0aHNbMF0gPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgIHNjcmF0Y2hTZWdtZW50cy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgc2NyYXRjaFNlZ21lbnRzLmxlbmd0aHMgPSBzY3JhdGNoTGVuZ3RocztcbiAgICByZXR1cm4gc2NyYXRjaFNlZ21lbnRzO1xuICB9XG5cbiAgaWYgKGludGVyc2VjdHNJREwocG9seWxpbmUpKSB7XG4gICAgcG9zaXRpb25zID0gcG9seWxpbmUuX3NlZ21lbnRzLnBvc2l0aW9ucztcbiAgfVxuXG4gIGNvbnN0IGVsbGlwc29pZCA9IHByb2plY3Rpb24uZWxsaXBzb2lkO1xuICBjb25zdCBuZXdQb3NpdGlvbnMgPSBbXTtcbiAgY29uc3QgbW9kZWxNYXRyaXggPSB0aGlzLm1vZGVsTWF0cml4O1xuICBjb25zdCBsZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICBsZXQgcG9zaXRpb247XG4gIGxldCBwID0gcHNjcmF0Y2g7XG5cbiAgZm9yIChsZXQgbiA9IDA7IG4gPCBsZW5ndGg7ICsrbikge1xuICAgIHBvc2l0aW9uID0gcG9zaXRpb25zW25dO1xuICAgIHAgPSBNYXRyaXg0Lm11bHRpcGx5QnlQb2ludChtb2RlbE1hdHJpeCwgcG9zaXRpb24sIHApO1xuICAgIG5ld1Bvc2l0aW9ucy5wdXNoKFxuICAgICAgcHJvamVjdGlvbi5wcm9qZWN0KFxuICAgICAgICBlbGxpcHNvaWQuY2FydGVzaWFuVG9DYXJ0b2dyYXBoaWMocCwgc2NyYXRjaENhcnRvZ3JhcGhpYyksXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBpZiAobmV3UG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWUyRCA9IEJvdW5kaW5nU3BoZXJlLmZyb21Qb2ludHMoXG4gICAgICBuZXdQb3NpdGlvbnMsXG4gICAgICBwb2x5bGluZS5fYm91bmRpbmdWb2x1bWUyRCxcbiAgICApO1xuICAgIGNvbnN0IGNlbnRlcjJEID0gcG9seWxpbmUuX2JvdW5kaW5nVm9sdW1lMkQuY2VudGVyO1xuICAgIHBvbHlsaW5lLl9ib3VuZGluZ1ZvbHVtZTJELmNlbnRlciA9IG5ldyBDYXJ0ZXNpYW4zKFxuICAgICAgY2VudGVyMkQueixcbiAgICAgIGNlbnRlcjJELngsXG4gICAgICBjZW50ZXIyRC55LFxuICAgICk7XG4gIH1cblxuICBzY3JhdGNoU2VnbWVudHMucG9zaXRpb25zID0gbmV3UG9zaXRpb25zO1xuICBzY3JhdGNoU2VnbWVudHMubGVuZ3RocyA9IHBvbHlsaW5lLl9zZWdtZW50cy5sZW5ndGhzO1xuICByZXR1cm4gc2NyYXRjaFNlZ21lbnRzO1xufTtcblxubGV0IHNjcmF0Y2hQb3NpdGlvbnNBcnJheTtcblxuUG9seWxpbmVCdWNrZXQucHJvdG90eXBlLndyaXRlVXBkYXRlID0gZnVuY3Rpb24gKFxuICBpbmRleCxcbiAgcG9seWxpbmUsXG4gIHBvc2l0aW9uQnVmZmVyLFxuICBwcm9qZWN0aW9uLFxuKSB7XG4gIGNvbnN0IG1vZGUgPSB0aGlzLm1vZGU7XG4gIGNvbnN0IG1heExvbiA9IHByb2plY3Rpb24uZWxsaXBzb2lkLm1heGltdW1SYWRpdXMgKiBDZXNpdW1NYXRoLlBJO1xuXG4gIGxldCBwb3NpdGlvbnNMZW5ndGggPSBwb2x5bGluZS5fYWN0dWFsTGVuZ3RoO1xuICBpZiAocG9zaXRpb25zTGVuZ3RoKSB7XG4gICAgaW5kZXggKz0gdGhpcy5nZXRQb2x5bGluZVN0YXJ0SW5kZXgocG9seWxpbmUpO1xuXG4gICAgbGV0IHBvc2l0aW9uQXJyYXkgPSBzY3JhdGNoUG9zaXRpb25zQXJyYXk7XG4gICAgY29uc3QgcG9zaXRpb25zQXJyYXlMZW5ndGggPSA2ICogcG9zaXRpb25zTGVuZ3RoICogMztcblxuICAgIGlmIChcbiAgICAgICFkZWZpbmVkKHBvc2l0aW9uQXJyYXkpIHx8XG4gICAgICBwb3NpdGlvbkFycmF5Lmxlbmd0aCA8IHBvc2l0aW9uc0FycmF5TGVuZ3RoXG4gICAgKSB7XG4gICAgICBwb3NpdGlvbkFycmF5ID0gc2NyYXRjaFBvc2l0aW9uc0FycmF5ID0gbmV3IEZsb2F0MzJBcnJheShcbiAgICAgICAgcG9zaXRpb25zQXJyYXlMZW5ndGgsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb25BcnJheS5sZW5ndGggPiBwb3NpdGlvbnNBcnJheUxlbmd0aCkge1xuICAgICAgcG9zaXRpb25BcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoXG4gICAgICAgIHBvc2l0aW9uQXJyYXkuYnVmZmVyLFxuICAgICAgICAwLFxuICAgICAgICBwb3NpdGlvbnNBcnJheUxlbmd0aCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VnbWVudHMgPSB0aGlzLmdldFNlZ21lbnRzKHBvbHlsaW5lLCBwcm9qZWN0aW9uKTtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBzZWdtZW50cy5wb3NpdGlvbnM7XG4gICAgY29uc3QgbGVuZ3RocyA9IHNlZ21lbnRzLmxlbmd0aHM7XG5cbiAgICBsZXQgcG9zaXRpb25JbmRleCA9IDA7XG4gICAgbGV0IHNlZ21lbnRJbmRleCA9IDA7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgcG9zaXRpb247XG5cbiAgICBwb3NpdGlvbnNMZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zTGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIGlmIChwb2x5bGluZS5fbG9vcCkge1xuICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25zW3Bvc2l0aW9uc0xlbmd0aCAtIDJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvc2l0aW9uID0gc2NyYXRjaFdyaXRlVmVjdG9yO1xuICAgICAgICAgIENhcnRlc2lhbjMuc3VidHJhY3QocG9zaXRpb25zWzBdLCBwb3NpdGlvbnNbMV0sIHBvc2l0aW9uKTtcbiAgICAgICAgICBDYXJ0ZXNpYW4zLmFkZChwb3NpdGlvbnNbMF0sIHBvc2l0aW9uLCBwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25zW2kgLSAxXTtcbiAgICAgIH1cblxuICAgICAgQ2FydGVzaWFuMy5jbG9uZShwb3NpdGlvbiwgc2NyYXRjaFdyaXRlUHJldlBvc2l0aW9uKTtcbiAgICAgIENhcnRlc2lhbjMuY2xvbmUocG9zaXRpb25zW2ldLCBzY3JhdGNoV3JpdGVQb3NpdGlvbik7XG5cbiAgICAgIGlmIChpID09PSBwb3NpdGlvbnNMZW5ndGggLSAxKSB7XG4gICAgICAgIGlmIChwb2x5bGluZS5fbG9vcCkge1xuICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25zWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvc2l0aW9uID0gc2NyYXRjaFdyaXRlVmVjdG9yO1xuICAgICAgICAgIENhcnRlc2lhbjMuc3VidHJhY3QoXG4gICAgICAgICAgICBwb3NpdGlvbnNbcG9zaXRpb25zTGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICBwb3NpdGlvbnNbcG9zaXRpb25zTGVuZ3RoIC0gMl0sXG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICApO1xuICAgICAgICAgIENhcnRlc2lhbjMuYWRkKHBvc2l0aW9uc1twb3NpdGlvbnNMZW5ndGggLSAxXSwgcG9zaXRpb24sIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbnNbaSArIDFdO1xuICAgICAgfVxuXG4gICAgICBDYXJ0ZXNpYW4zLmNsb25lKHBvc2l0aW9uLCBzY3JhdGNoV3JpdGVOZXh0UG9zaXRpb24pO1xuXG4gICAgICBjb25zdCBzZWdtZW50TGVuZ3RoID0gbGVuZ3Roc1tzZWdtZW50SW5kZXhdO1xuICAgICAgaWYgKGkgPT09IGNvdW50ICsgc2VnbWVudExlbmd0aCkge1xuICAgICAgICBjb3VudCArPSBzZWdtZW50TGVuZ3RoO1xuICAgICAgICArK3NlZ21lbnRJbmRleDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2VnbWVudFN0YXJ0ID0gaSAtIGNvdW50ID09PSAwO1xuICAgICAgY29uc3Qgc2VnbWVudEVuZCA9IGkgPT09IGNvdW50ICsgbGVuZ3Roc1tzZWdtZW50SW5kZXhdIC0gMTtcblxuICAgICAgaWYgKG1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTJEKSB7XG4gICAgICAgIHNjcmF0Y2hXcml0ZVByZXZQb3NpdGlvbi56ID0gMC4wO1xuICAgICAgICBzY3JhdGNoV3JpdGVQb3NpdGlvbi56ID0gMC4wO1xuICAgICAgICBzY3JhdGNoV3JpdGVOZXh0UG9zaXRpb24ueiA9IDAuMDtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTJEIHx8IG1vZGUgPT09IFNjZW5lTW9kZS5NT1JQSElORykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNlZ21lbnRTdGFydCB8fCBzZWdtZW50RW5kKSAmJlxuICAgICAgICAgIG1heExvbiAtIE1hdGguYWJzKHNjcmF0Y2hXcml0ZVBvc2l0aW9uLngpIDwgMS4wXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChzY3JhdGNoV3JpdGVQb3NpdGlvbi54IDwgMC4wICYmXG4gICAgICAgICAgICAgIHNjcmF0Y2hXcml0ZVByZXZQb3NpdGlvbi54ID4gMC4wKSB8fFxuICAgICAgICAgICAgKHNjcmF0Y2hXcml0ZVBvc2l0aW9uLnggPiAwLjAgJiYgc2NyYXRjaFdyaXRlUHJldlBvc2l0aW9uLnggPCAwLjApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBDYXJ0ZXNpYW4zLmNsb25lKHNjcmF0Y2hXcml0ZVBvc2l0aW9uLCBzY3JhdGNoV3JpdGVQcmV2UG9zaXRpb24pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChzY3JhdGNoV3JpdGVQb3NpdGlvbi54IDwgMC4wICYmXG4gICAgICAgICAgICAgIHNjcmF0Y2hXcml0ZU5leHRQb3NpdGlvbi54ID4gMC4wKSB8fFxuICAgICAgICAgICAgKHNjcmF0Y2hXcml0ZVBvc2l0aW9uLnggPiAwLjAgJiYgc2NyYXRjaFdyaXRlTmV4dFBvc2l0aW9uLnggPCAwLjApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBDYXJ0ZXNpYW4zLmNsb25lKHNjcmF0Y2hXcml0ZVBvc2l0aW9uLCBzY3JhdGNoV3JpdGVOZXh0UG9zaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGFydEogPSBzZWdtZW50U3RhcnQgPyAyIDogMDtcbiAgICAgIGNvbnN0IGVuZEogPSBzZWdtZW50RW5kID8gMiA6IDQ7XG5cbiAgICAgIGZvciAobGV0IGogPSBzdGFydEo7IGogPCBlbmRKOyArK2opIHtcbiAgICAgICAgRW5jb2RlZENhcnRlc2lhbjMud3JpdGVFbGVtZW50cyhcbiAgICAgICAgICBzY3JhdGNoV3JpdGVQb3NpdGlvbixcbiAgICAgICAgICBwb3NpdGlvbkFycmF5LFxuICAgICAgICAgIHBvc2l0aW9uSW5kZXgsXG4gICAgICAgICk7XG4gICAgICAgIEVuY29kZWRDYXJ0ZXNpYW4zLndyaXRlRWxlbWVudHMoXG4gICAgICAgICAgc2NyYXRjaFdyaXRlUHJldlBvc2l0aW9uLFxuICAgICAgICAgIHBvc2l0aW9uQXJyYXksXG4gICAgICAgICAgcG9zaXRpb25JbmRleCArIDYsXG4gICAgICAgICk7XG4gICAgICAgIEVuY29kZWRDYXJ0ZXNpYW4zLndyaXRlRWxlbWVudHMoXG4gICAgICAgICAgc2NyYXRjaFdyaXRlTmV4dFBvc2l0aW9uLFxuICAgICAgICAgIHBvc2l0aW9uQXJyYXksXG4gICAgICAgICAgcG9zaXRpb25JbmRleCArIDEyLFxuICAgICAgICApO1xuICAgICAgICBwb3NpdGlvbkluZGV4ICs9IDYgKiAzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBvc2l0aW9uQnVmZmVyLmNvcHlGcm9tQXJyYXlWaWV3KFxuICAgICAgcG9zaXRpb25BcnJheSxcbiAgICAgIDYgKiAzICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogaW5kZXgsXG4gICAgKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFBvbHlsaW5lQ29sbGVjdGlvbjtcbiIsImltcG9ydCBDYXJ0ZXNpYW4zIGZyb20gXCIuL0NhcnRlc2lhbjMuanNcIjtcbmltcG9ydCBDYXJ0ZXNpYW40IGZyb20gXCIuL0NhcnRlc2lhbjQuanNcIjtcbmltcG9ydCBDdWxsaW5nVm9sdW1lIGZyb20gXCIuL0N1bGxpbmdWb2x1bWUuanNcIjtcbmltcG9ydCBGcm96ZW4gZnJvbSBcIi4vRnJvemVuLmpzXCI7XG5pbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4vRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBDZXNpdW1NYXRoIGZyb20gXCIuL01hdGguanNcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuL01hdHJpeDQuanNcIjtcblxuLyoqXG4gKiBUaGUgdmlld2luZyBmcnVzdHVtIGlzIGRlZmluZWQgYnkgNiBwbGFuZXMuXG4gKiBFYWNoIHBsYW5lIGlzIHJlcHJlc2VudGVkIGJ5IGEge0BsaW5rIENhcnRlc2lhbjR9IG9iamVjdCwgd2hlcmUgdGhlIHgsIHksIGFuZCB6IGNvbXBvbmVudHNcbiAqIGRlZmluZSB0aGUgdW5pdCB2ZWN0b3Igbm9ybWFsIHRvIHRoZSBwbGFuZSwgYW5kIHRoZSB3IGNvbXBvbmVudCBpcyB0aGUgZGlzdGFuY2Ugb2YgdGhlXG4gKiBwbGFuZSBmcm9tIHRoZSBvcmlnaW4vY2FtZXJhIHBvc2l0aW9uLlxuICpcbiAqIEBhbGlhcyBPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIEFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5sZWZ0XSBUaGUgbGVmdCBjbGlwcGluZyBwbGFuZSBkaXN0YW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5yaWdodF0gVGhlIHJpZ2h0IGNsaXBwaW5nIHBsYW5lIGRpc3RhbmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRvcF0gVGhlIHRvcCBjbGlwcGluZyBwbGFuZSBkaXN0YW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ib3R0b21dIFRoZSBib3R0b20gY2xpcHBpbmcgcGxhbmUgZGlzdGFuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubmVhcj0xLjBdIFRoZSBuZWFyIGNsaXBwaW5nIHBsYW5lIGRpc3RhbmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmZhcj01MDAwMDAwMDAuMF0gVGhlIGZhciBjbGlwcGluZyBwbGFuZSBkaXN0YW5jZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbWF4UmFkaWkgPSBlbGxpcHNvaWQubWF4aW11bVJhZGl1cztcbiAqXG4gKiBjb25zdCBmcnVzdHVtID0gbmV3IENlc2l1bS5PcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtKCk7XG4gKiBmcnVzdHVtLnJpZ2h0ID0gbWF4UmFkaWkgKiBDZXNpdW0uTWF0aC5QSTtcbiAqIGZydXN0dW0ubGVmdCA9IC1jLmZydXN0dW0ucmlnaHQ7XG4gKiBmcnVzdHVtLnRvcCA9IGMuZnJ1c3R1bS5yaWdodCAqIChjYW52YXMuY2xpZW50SGVpZ2h0IC8gY2FudmFzLmNsaWVudFdpZHRoKTtcbiAqIGZydXN0dW0uYm90dG9tID0gLWMuZnJ1c3R1bS50b3A7XG4gKiBmcnVzdHVtLm5lYXIgPSAwLjAxICogbWF4UmFkaWk7XG4gKiBmcnVzdHVtLmZhciA9IDUwLjAgKiBtYXhSYWRpaTtcbiAqL1xuZnVuY3Rpb24gT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bShvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zID8/IEZyb3plbi5FTVBUWV9PQkpFQ1Q7XG5cbiAgLyoqXG4gICAqIFRoZSBsZWZ0IGNsaXBwaW5nIHBsYW5lLlxuICAgKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH1cbiAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAqL1xuICB0aGlzLmxlZnQgPSBvcHRpb25zLmxlZnQ7XG4gIHRoaXMuX2xlZnQgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSByaWdodCBjbGlwcGluZyBwbGFuZS5cbiAgICogQHR5cGUge251bWJlcnx1bmRlZmluZWR9XG4gICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgKi9cbiAgdGhpcy5yaWdodCA9IG9wdGlvbnMucmlnaHQ7XG4gIHRoaXMuX3JpZ2h0ID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgdG9wIGNsaXBwaW5nIHBsYW5lLlxuICAgKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH1cbiAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAqL1xuICB0aGlzLnRvcCA9IG9wdGlvbnMudG9wO1xuICB0aGlzLl90b3AgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBib3R0b20gY2xpcHBpbmcgcGxhbmUuXG4gICAqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfVxuICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcbiAgICovXG4gIHRoaXMuYm90dG9tID0gb3B0aW9ucy5ib3R0b207XG4gIHRoaXMuX2JvdHRvbSA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIGRpc3RhbmNlIG9mIHRoZSBuZWFyIHBsYW5lLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxLjBcbiAgICovXG4gIHRoaXMubmVhciA9IG9wdGlvbnMubmVhciA/PyAxLjA7XG4gIHRoaXMuX25lYXIgPSB0aGlzLm5lYXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXN0YW5jZSBvZiB0aGUgZmFyIHBsYW5lLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDAwMDAwMDAuMDtcbiAgICovXG4gIHRoaXMuZmFyID0gb3B0aW9ucy5mYXIgPz8gNTAwMDAwMDAwLjA7XG4gIHRoaXMuX2ZhciA9IHRoaXMuZmFyO1xuXG4gIHRoaXMuX2N1bGxpbmdWb2x1bWUgPSBuZXcgQ3VsbGluZ1ZvbHVtZSgpO1xuICB0aGlzLl9vcnRob2dyYXBoaWNNYXRyaXggPSBuZXcgTWF0cml4NCgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoZnJ1c3R1bSkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoXG4gICAgIWRlZmluZWQoZnJ1c3R1bS5yaWdodCkgfHxcbiAgICAhZGVmaW5lZChmcnVzdHVtLmxlZnQpIHx8XG4gICAgIWRlZmluZWQoZnJ1c3R1bS50b3ApIHx8XG4gICAgIWRlZmluZWQoZnJ1c3R1bS5ib3R0b20pIHx8XG4gICAgIWRlZmluZWQoZnJ1c3R1bS5uZWFyKSB8fFxuICAgICFkZWZpbmVkKGZydXN0dW0uZmFyKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICBcInJpZ2h0LCBsZWZ0LCB0b3AsIGJvdHRvbSwgbmVhciwgb3IgZmFyIHBhcmFtZXRlcnMgYXJlIG5vdCBzZXQuXCIsXG4gICAgKTtcbiAgfVxuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICBpZiAoXG4gICAgZnJ1c3R1bS50b3AgIT09IGZydXN0dW0uX3RvcCB8fFxuICAgIGZydXN0dW0uYm90dG9tICE9PSBmcnVzdHVtLl9ib3R0b20gfHxcbiAgICBmcnVzdHVtLmxlZnQgIT09IGZydXN0dW0uX2xlZnQgfHxcbiAgICBmcnVzdHVtLnJpZ2h0ICE9PSBmcnVzdHVtLl9yaWdodCB8fFxuICAgIGZydXN0dW0ubmVhciAhPT0gZnJ1c3R1bS5fbmVhciB8fFxuICAgIGZydXN0dW0uZmFyICE9PSBmcnVzdHVtLl9mYXJcbiAgKSB7XG4gICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgICBpZiAoZnJ1c3R1bS5sZWZ0ID4gZnJ1c3R1bS5yaWdodCkge1xuICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwicmlnaHQgbXVzdCBiZSBncmVhdGVyIHRoYW4gbGVmdC5cIik7XG4gICAgfVxuICAgIGlmIChmcnVzdHVtLmJvdHRvbSA+IGZydXN0dW0udG9wKSB7XG4gICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJ0b3AgbXVzdCBiZSBncmVhdGVyIHRoYW4gYm90dG9tLlwiKTtcbiAgICB9XG4gICAgaWYgKGZydXN0dW0ubmVhciA8PSAwIHx8IGZydXN0dW0ubmVhciA+IGZydXN0dW0uZmFyKSB7XG4gICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICAgIFwibmVhciBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvIGFuZCBsZXNzIHRoYW4gZmFyLlwiLFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgICBmcnVzdHVtLl9sZWZ0ID0gZnJ1c3R1bS5sZWZ0O1xuICAgIGZydXN0dW0uX3JpZ2h0ID0gZnJ1c3R1bS5yaWdodDtcbiAgICBmcnVzdHVtLl90b3AgPSBmcnVzdHVtLnRvcDtcbiAgICBmcnVzdHVtLl9ib3R0b20gPSBmcnVzdHVtLmJvdHRvbTtcbiAgICBmcnVzdHVtLl9uZWFyID0gZnJ1c3R1bS5uZWFyO1xuICAgIGZydXN0dW0uX2ZhciA9IGZydXN0dW0uZmFyO1xuICAgIGZydXN0dW0uX29ydGhvZ3JhcGhpY01hdHJpeCA9IE1hdHJpeDQuY29tcHV0ZU9ydGhvZ3JhcGhpY09mZkNlbnRlcihcbiAgICAgIGZydXN0dW0ubGVmdCxcbiAgICAgIGZydXN0dW0ucmlnaHQsXG4gICAgICBmcnVzdHVtLmJvdHRvbSxcbiAgICAgIGZydXN0dW0udG9wLFxuICAgICAgZnJ1c3R1bS5uZWFyLFxuICAgICAgZnJ1c3R1bS5mYXIsXG4gICAgICBmcnVzdHVtLl9vcnRob2dyYXBoaWNNYXRyaXgsXG4gICAgKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtLnByb3RvdHlwZSwge1xuICAvKipcbiAgICogR2V0cyB0aGUgb3J0aG9ncmFwaGljIHByb2plY3Rpb24gbWF0cml4IGNvbXB1dGVkIGZyb20gdGhlIHZpZXcgZnJ1c3R1bS5cbiAgICogQG1lbWJlcm9mIE9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0ucHJvdG90eXBlXG4gICAqIEB0eXBlIHtNYXRyaXg0fVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIHByb2plY3Rpb25NYXRyaXg6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHVwZGF0ZSh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLl9vcnRob2dyYXBoaWNNYXRyaXg7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRQbGFuZXNSaWdodCA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBnZXRQbGFuZXNOZWFyQ2VudGVyID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IGdldFBsYW5lc1BvaW50ID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IG5lZ2F0ZVNjcmF0Y2ggPSBuZXcgQ2FydGVzaWFuMygpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjdWxsaW5nIHZvbHVtZSBmb3IgdGhpcyBmcnVzdHVtLlxuICpcbiAqIEBwYXJhbSB7Q2FydGVzaWFuM30gcG9zaXRpb24gVGhlIGV5ZSBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7Q2FydGVzaWFuM30gZGlyZWN0aW9uIFRoZSB2aWV3IGRpcmVjdGlvbi5cbiAqIEBwYXJhbSB7Q2FydGVzaWFuM30gdXAgVGhlIHVwIGRpcmVjdGlvbi5cbiAqIEByZXR1cm5zIHtDdWxsaW5nVm9sdW1lfSBBIGN1bGxpbmcgdm9sdW1lIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENoZWNrIGlmIGEgYm91bmRpbmcgdm9sdW1lIGludGVyc2VjdHMgdGhlIGZydXN0dW0uXG4gKiBjb25zdCBjdWxsaW5nVm9sdW1lID0gZnJ1c3R1bS5jb21wdXRlQ3VsbGluZ1ZvbHVtZShjYW1lcmFQb3NpdGlvbiwgY2FtZXJhRGlyZWN0aW9uLCBjYW1lcmFVcCk7XG4gKiBjb25zdCBpbnRlcnNlY3QgPSBjdWxsaW5nVm9sdW1lLmNvbXB1dGVWaXNpYmlsaXR5KGJvdW5kaW5nVm9sdW1lKTtcbiAqL1xuT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bS5wcm90b3R5cGUuY29tcHV0ZUN1bGxpbmdWb2x1bWUgPSBmdW5jdGlvbiAoXG4gIHBvc2l0aW9uLFxuICBkaXJlY3Rpb24sXG4gIHVwLFxuKSB7XG4gIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gIGlmICghZGVmaW5lZChwb3NpdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJwb3NpdGlvbiBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgaWYgKCFkZWZpbmVkKGRpcmVjdGlvbikpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJkaXJlY3Rpb24gaXMgcmVxdWlyZWQuXCIpO1xuICB9XG4gIGlmICghZGVmaW5lZCh1cCkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJ1cCBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgY29uc3QgcGxhbmVzID0gdGhpcy5fY3VsbGluZ1ZvbHVtZS5wbGFuZXM7XG4gIGNvbnN0IHQgPSB0aGlzLnRvcDtcbiAgY29uc3QgYiA9IHRoaXMuYm90dG9tO1xuICBjb25zdCByID0gdGhpcy5yaWdodDtcbiAgY29uc3QgbCA9IHRoaXMubGVmdDtcbiAgY29uc3QgbiA9IHRoaXMubmVhcjtcbiAgY29uc3QgZiA9IHRoaXMuZmFyO1xuXG4gIGNvbnN0IHJpZ2h0ID0gQ2FydGVzaWFuMy5jcm9zcyhkaXJlY3Rpb24sIHVwLCBnZXRQbGFuZXNSaWdodCk7XG4gIENhcnRlc2lhbjMubm9ybWFsaXplKHJpZ2h0LCByaWdodCk7XG4gIGNvbnN0IG5lYXJDZW50ZXIgPSBnZXRQbGFuZXNOZWFyQ2VudGVyO1xuICBDYXJ0ZXNpYW4zLm11bHRpcGx5QnlTY2FsYXIoZGlyZWN0aW9uLCBuLCBuZWFyQ2VudGVyKTtcbiAgQ2FydGVzaWFuMy5hZGQocG9zaXRpb24sIG5lYXJDZW50ZXIsIG5lYXJDZW50ZXIpO1xuXG4gIGNvbnN0IHBvaW50ID0gZ2V0UGxhbmVzUG9pbnQ7XG5cbiAgLy8gTGVmdCBwbGFuZVxuICBDYXJ0ZXNpYW4zLm11bHRpcGx5QnlTY2FsYXIocmlnaHQsIGwsIHBvaW50KTtcbiAgQ2FydGVzaWFuMy5hZGQobmVhckNlbnRlciwgcG9pbnQsIHBvaW50KTtcblxuICBsZXQgcGxhbmUgPSBwbGFuZXNbMF07XG4gIGlmICghZGVmaW5lZChwbGFuZSkpIHtcbiAgICBwbGFuZSA9IHBsYW5lc1swXSA9IG5ldyBDYXJ0ZXNpYW40KCk7XG4gIH1cbiAgcGxhbmUueCA9IHJpZ2h0Lng7XG4gIHBsYW5lLnkgPSByaWdodC55O1xuICBwbGFuZS56ID0gcmlnaHQuejtcbiAgcGxhbmUudyA9IC1DYXJ0ZXNpYW4zLmRvdChyaWdodCwgcG9pbnQpO1xuXG4gIC8vIFJpZ2h0IHBsYW5lXG4gIENhcnRlc2lhbjMubXVsdGlwbHlCeVNjYWxhcihyaWdodCwgciwgcG9pbnQpO1xuICBDYXJ0ZXNpYW4zLmFkZChuZWFyQ2VudGVyLCBwb2ludCwgcG9pbnQpO1xuXG4gIHBsYW5lID0gcGxhbmVzWzFdO1xuICBpZiAoIWRlZmluZWQocGxhbmUpKSB7XG4gICAgcGxhbmUgPSBwbGFuZXNbMV0gPSBuZXcgQ2FydGVzaWFuNCgpO1xuICB9XG4gIHBsYW5lLnggPSAtcmlnaHQueDtcbiAgcGxhbmUueSA9IC1yaWdodC55O1xuICBwbGFuZS56ID0gLXJpZ2h0Lno7XG4gIHBsYW5lLncgPSAtQ2FydGVzaWFuMy5kb3QoQ2FydGVzaWFuMy5uZWdhdGUocmlnaHQsIG5lZ2F0ZVNjcmF0Y2gpLCBwb2ludCk7XG5cbiAgLy8gQm90dG9tIHBsYW5lXG4gIENhcnRlc2lhbjMubXVsdGlwbHlCeVNjYWxhcih1cCwgYiwgcG9pbnQpO1xuICBDYXJ0ZXNpYW4zLmFkZChuZWFyQ2VudGVyLCBwb2ludCwgcG9pbnQpO1xuXG4gIHBsYW5lID0gcGxhbmVzWzJdO1xuICBpZiAoIWRlZmluZWQocGxhbmUpKSB7XG4gICAgcGxhbmUgPSBwbGFuZXNbMl0gPSBuZXcgQ2FydGVzaWFuNCgpO1xuICB9XG4gIHBsYW5lLnggPSB1cC54O1xuICBwbGFuZS55ID0gdXAueTtcbiAgcGxhbmUueiA9IHVwLno7XG4gIHBsYW5lLncgPSAtQ2FydGVzaWFuMy5kb3QodXAsIHBvaW50KTtcblxuICAvLyBUb3AgcGxhbmVcbiAgQ2FydGVzaWFuMy5tdWx0aXBseUJ5U2NhbGFyKHVwLCB0LCBwb2ludCk7XG4gIENhcnRlc2lhbjMuYWRkKG5lYXJDZW50ZXIsIHBvaW50LCBwb2ludCk7XG5cbiAgcGxhbmUgPSBwbGFuZXNbM107XG4gIGlmICghZGVmaW5lZChwbGFuZSkpIHtcbiAgICBwbGFuZSA9IHBsYW5lc1szXSA9IG5ldyBDYXJ0ZXNpYW40KCk7XG4gIH1cbiAgcGxhbmUueCA9IC11cC54O1xuICBwbGFuZS55ID0gLXVwLnk7XG4gIHBsYW5lLnogPSAtdXAuejtcbiAgcGxhbmUudyA9IC1DYXJ0ZXNpYW4zLmRvdChDYXJ0ZXNpYW4zLm5lZ2F0ZSh1cCwgbmVnYXRlU2NyYXRjaCksIHBvaW50KTtcblxuICAvLyBOZWFyIHBsYW5lXG4gIHBsYW5lID0gcGxhbmVzWzRdO1xuICBpZiAoIWRlZmluZWQocGxhbmUpKSB7XG4gICAgcGxhbmUgPSBwbGFuZXNbNF0gPSBuZXcgQ2FydGVzaWFuNCgpO1xuICB9XG4gIHBsYW5lLnggPSBkaXJlY3Rpb24ueDtcbiAgcGxhbmUueSA9IGRpcmVjdGlvbi55O1xuICBwbGFuZS56ID0gZGlyZWN0aW9uLno7XG4gIHBsYW5lLncgPSAtQ2FydGVzaWFuMy5kb3QoZGlyZWN0aW9uLCBuZWFyQ2VudGVyKTtcblxuICAvLyBGYXIgcGxhbmVcbiAgQ2FydGVzaWFuMy5tdWx0aXBseUJ5U2NhbGFyKGRpcmVjdGlvbiwgZiwgcG9pbnQpO1xuICBDYXJ0ZXNpYW4zLmFkZChwb3NpdGlvbiwgcG9pbnQsIHBvaW50KTtcblxuICBwbGFuZSA9IHBsYW5lc1s1XTtcbiAgaWYgKCFkZWZpbmVkKHBsYW5lKSkge1xuICAgIHBsYW5lID0gcGxhbmVzWzVdID0gbmV3IENhcnRlc2lhbjQoKTtcbiAgfVxuICBwbGFuZS54ID0gLWRpcmVjdGlvbi54O1xuICBwbGFuZS55ID0gLWRpcmVjdGlvbi55O1xuICBwbGFuZS56ID0gLWRpcmVjdGlvbi56O1xuICBwbGFuZS53ID0gLUNhcnRlc2lhbjMuZG90KENhcnRlc2lhbjMubmVnYXRlKGRpcmVjdGlvbiwgbmVnYXRlU2NyYXRjaCksIHBvaW50KTtcblxuICByZXR1cm4gdGhpcy5fY3VsbGluZ1ZvbHVtZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcGl4ZWwncyB3aWR0aCBhbmQgaGVpZ2h0IGluIG1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZHJhd2luZ0J1ZmZlcldpZHRoIFRoZSB3aWR0aCBvZiB0aGUgZHJhd2luZyBidWZmZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gZHJhd2luZ0J1ZmZlckhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBkcmF3aW5nIGJ1ZmZlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZSBUaGUgZGlzdGFuY2UgdG8gdGhlIG5lYXIgcGxhbmUgaW4gbWV0ZXJzLlxuICogQHBhcmFtIHtudW1iZXJ9IHBpeGVsUmF0aW8gVGhlIHNjYWxpbmcgZmFjdG9yIGZyb20gcGl4ZWwgc3BhY2UgdG8gY29vcmRpbmF0ZSBzcGFjZS5cbiAqIEBwYXJhbSB7Q2FydGVzaWFuMn0gcmVzdWx0IFRoZSBvYmplY3Qgb250byB3aGljaCB0byBzdG9yZSB0aGUgcmVzdWx0LlxuICogQHJldHVybnMge0NhcnRlc2lhbjJ9IFRoZSBtb2RpZmllZCByZXN1bHQgcGFyYW1ldGVyIG9yIGEgbmV3IGluc3RhbmNlIG9mIHtAbGluayBDYXJ0ZXNpYW4yfSB3aXRoIHRoZSBwaXhlbCdzIHdpZHRoIGFuZCBoZWlnaHQgaW4gdGhlIHggYW5kIHkgcHJvcGVydGllcywgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEBleGNlcHRpb24ge0RldmVsb3BlckVycm9yfSBkcmF3aW5nQnVmZmVyV2lkdGggbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cbiAqIEBleGNlcHRpb24ge0RldmVsb3BlckVycm9yfSBkcmF3aW5nQnVmZmVySGVpZ2h0IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXG4gKiBAZXhjZXB0aW9uIHtEZXZlbG9wZXJFcnJvcn0gcGl4ZWxSYXRpbyBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFeGFtcGxlIDFcbiAqIC8vIEdldCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiBhIHBpeGVsLlxuICogY29uc3QgcGl4ZWxTaXplID0gY2FtZXJhLmZydXN0dW0uZ2V0UGl4ZWxEaW1lbnNpb25zKHNjZW5lLmRyYXdpbmdCdWZmZXJXaWR0aCwgc2NlbmUuZHJhd2luZ0J1ZmZlckhlaWdodCwgMC4wLCBzY2VuZS5waXhlbFJhdGlvLCBuZXcgQ2VzaXVtLkNhcnRlc2lhbjIoKSk7XG4gKi9cbk9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0ucHJvdG90eXBlLmdldFBpeGVsRGltZW5zaW9ucyA9IGZ1bmN0aW9uIChcbiAgZHJhd2luZ0J1ZmZlcldpZHRoLFxuICBkcmF3aW5nQnVmZmVySGVpZ2h0LFxuICBkaXN0YW5jZSxcbiAgcGl4ZWxSYXRpbyxcbiAgcmVzdWx0LFxuKSB7XG4gIHVwZGF0ZSh0aGlzKTtcblxuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQoZHJhd2luZ0J1ZmZlcldpZHRoKSB8fCAhZGVmaW5lZChkcmF3aW5nQnVmZmVySGVpZ2h0KSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcbiAgICAgIFwiQm90aCBkcmF3aW5nQnVmZmVyV2lkdGggYW5kIGRyYXdpbmdCdWZmZXJIZWlnaHQgYXJlIHJlcXVpcmVkLlwiLFxuICAgICk7XG4gIH1cbiAgaWYgKGRyYXdpbmdCdWZmZXJXaWR0aCA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiZHJhd2luZ0J1ZmZlcldpZHRoIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXCIpO1xuICB9XG4gIGlmIChkcmF3aW5nQnVmZmVySGVpZ2h0IDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJkcmF3aW5nQnVmZmVySGVpZ2h0IG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8uXCIpO1xuICB9XG4gIGlmICghZGVmaW5lZChkaXN0YW5jZSkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJkaXN0YW5jZSBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgaWYgKCFkZWZpbmVkKHBpeGVsUmF0aW8pKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwicGl4ZWxSYXRpbyBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgaWYgKHBpeGVsUmF0aW8gPD0gMCkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInBpeGVsUmF0aW8gbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby5cIik7XG4gIH1cbiAgaWYgKCFkZWZpbmVkKHJlc3VsdCkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJBIHJlc3VsdCBvYmplY3QgaXMgcmVxdWlyZWQuXCIpO1xuICB9XG4gIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gIGNvbnN0IGZydXN0dW1XaWR0aCA9IHRoaXMucmlnaHQgLSB0aGlzLmxlZnQ7XG4gIGNvbnN0IGZydXN0dW1IZWlnaHQgPSB0aGlzLnRvcCAtIHRoaXMuYm90dG9tO1xuICBjb25zdCBwaXhlbFdpZHRoID0gKHBpeGVsUmF0aW8gKiBmcnVzdHVtV2lkdGgpIC8gZHJhd2luZ0J1ZmZlcldpZHRoO1xuICBjb25zdCBwaXhlbEhlaWdodCA9IChwaXhlbFJhdGlvICogZnJ1c3R1bUhlaWdodCkgLyBkcmF3aW5nQnVmZmVySGVpZ2h0O1xuXG4gIHJlc3VsdC54ID0gcGl4ZWxXaWR0aDtcbiAgcmVzdWx0LnkgPSBwaXhlbEhlaWdodDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIGR1cGxpY2F0ZSBvZiBhIE9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0gaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtfSBbcmVzdWx0XSBUaGUgb2JqZWN0IG9udG8gd2hpY2ggdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtfSBUaGUgbW9kaWZpZWQgcmVzdWx0IHBhcmFtZXRlciBvciBhIG5ldyBPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtIGluc3RhbmNlIGlmIG9uZSB3YXMgbm90IHByb3ZpZGVkLlxuICovXG5PcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgaWYgKCFkZWZpbmVkKHJlc3VsdCkpIHtcbiAgICByZXN1bHQgPSBuZXcgT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bSgpO1xuICB9XG5cbiAgcmVzdWx0LmxlZnQgPSB0aGlzLmxlZnQ7XG4gIHJlc3VsdC5yaWdodCA9IHRoaXMucmlnaHQ7XG4gIHJlc3VsdC50b3AgPSB0aGlzLnRvcDtcbiAgcmVzdWx0LmJvdHRvbSA9IHRoaXMuYm90dG9tO1xuICByZXN1bHQubmVhciA9IHRoaXMubmVhcjtcbiAgcmVzdWx0LmZhciA9IHRoaXMuZmFyO1xuXG4gIC8vIGZvcmNlIHVwZGF0ZSBvZiBjbG9uZSB0byBjb21wdXRlIG1hdHJpY2VzXG4gIHJlc3VsdC5fbGVmdCA9IHVuZGVmaW5lZDtcbiAgcmVzdWx0Ll9yaWdodCA9IHVuZGVmaW5lZDtcbiAgcmVzdWx0Ll90b3AgPSB1bmRlZmluZWQ7XG4gIHJlc3VsdC5fYm90dG9tID0gdW5kZWZpbmVkO1xuICByZXN1bHQuX25lYXIgPSB1bmRlZmluZWQ7XG4gIHJlc3VsdC5fZmFyID0gdW5kZWZpbmVkO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBwcm92aWRlZCBPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtIGNvbXBvbmVudHdpc2UgYW5kIHJldHVybnNcbiAqIDxjb2RlPnRydWU8L2NvZGU+IGlmIHRoZXkgYXJlIGVxdWFsLCA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7T3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bX0gW290aGVyXSBUaGUgcmlnaHQgaGFuZCBzaWRlIE9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhleSBhcmUgZXF1YWwsIDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG4gKi9cbk9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0ucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICByZXR1cm4gKFxuICAgIGRlZmluZWQob3RoZXIpICYmXG4gICAgb3RoZXIgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtICYmXG4gICAgdGhpcy5yaWdodCA9PT0gb3RoZXIucmlnaHQgJiZcbiAgICB0aGlzLmxlZnQgPT09IG90aGVyLmxlZnQgJiZcbiAgICB0aGlzLnRvcCA9PT0gb3RoZXIudG9wICYmXG4gICAgdGhpcy5ib3R0b20gPT09IG90aGVyLmJvdHRvbSAmJlxuICAgIHRoaXMubmVhciA9PT0gb3RoZXIubmVhciAmJlxuICAgIHRoaXMuZmFyID09PSBvdGhlci5mYXJcbiAgKTtcbn07XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIHByb3ZpZGVkIE9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0gY29tcG9uZW50d2lzZSBhbmQgcmV0dXJuc1xuICogPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhleSBwYXNzIGFuIGFic29sdXRlIG9yIHJlbGF0aXZlIHRvbGVyYW5jZSB0ZXN0LFxuICogPGNvZGU+ZmFsc2U8L2NvZGU+IG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge09ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW19IG90aGVyIFRoZSByaWdodCBoYW5kIHNpZGUgT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bS5cbiAqIEBwYXJhbSB7bnVtYmVyfSByZWxhdGl2ZUVwc2lsb24gVGhlIHJlbGF0aXZlIGVwc2lsb24gdG9sZXJhbmNlIHRvIHVzZSBmb3IgZXF1YWxpdHkgdGVzdGluZy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYWJzb2x1dGVFcHNpbG9uPXJlbGF0aXZlRXBzaWxvbl0gVGhlIGFic29sdXRlIGVwc2lsb24gdG9sZXJhbmNlIHRvIHVzZSBmb3IgZXF1YWxpdHkgdGVzdGluZy5cbiAqIEByZXR1cm5zIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGFuZCBvdGhlciBhcmUgd2l0aGluIHRoZSBwcm92aWRlZCBlcHNpbG9uLCA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICovXG5PcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtLnByb3RvdHlwZS5lcXVhbHNFcHNpbG9uID0gZnVuY3Rpb24gKFxuICBvdGhlcixcbiAgcmVsYXRpdmVFcHNpbG9uLFxuICBhYnNvbHV0ZUVwc2lsb24sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBvdGhlciA9PT0gdGhpcyB8fFxuICAgIChkZWZpbmVkKG90aGVyKSAmJlxuICAgICAgb3RoZXIgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNPZmZDZW50ZXJGcnVzdHVtICYmXG4gICAgICBDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oXG4gICAgICAgIHRoaXMucmlnaHQsXG4gICAgICAgIG90aGVyLnJpZ2h0LFxuICAgICAgICByZWxhdGl2ZUVwc2lsb24sXG4gICAgICAgIGFic29sdXRlRXBzaWxvbixcbiAgICAgICkgJiZcbiAgICAgIENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihcbiAgICAgICAgdGhpcy5sZWZ0LFxuICAgICAgICBvdGhlci5sZWZ0LFxuICAgICAgICByZWxhdGl2ZUVwc2lsb24sXG4gICAgICAgIGFic29sdXRlRXBzaWxvbixcbiAgICAgICkgJiZcbiAgICAgIENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihcbiAgICAgICAgdGhpcy50b3AsXG4gICAgICAgIG90aGVyLnRvcCxcbiAgICAgICAgcmVsYXRpdmVFcHNpbG9uLFxuICAgICAgICBhYnNvbHV0ZUVwc2lsb24sXG4gICAgICApICYmXG4gICAgICBDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oXG4gICAgICAgIHRoaXMuYm90dG9tLFxuICAgICAgICBvdGhlci5ib3R0b20sXG4gICAgICAgIHJlbGF0aXZlRXBzaWxvbixcbiAgICAgICAgYWJzb2x1dGVFcHNpbG9uLFxuICAgICAgKSAmJlxuICAgICAgQ2VzaXVtTWF0aC5lcXVhbHNFcHNpbG9uKFxuICAgICAgICB0aGlzLm5lYXIsXG4gICAgICAgIG90aGVyLm5lYXIsXG4gICAgICAgIHJlbGF0aXZlRXBzaWxvbixcbiAgICAgICAgYWJzb2x1dGVFcHNpbG9uLFxuICAgICAgKSAmJlxuICAgICAgQ2VzaXVtTWF0aC5lcXVhbHNFcHNpbG9uKFxuICAgICAgICB0aGlzLmZhcixcbiAgICAgICAgb3RoZXIuZmFyLFxuICAgICAgICByZWxhdGl2ZUVwc2lsb24sXG4gICAgICAgIGFic29sdXRlRXBzaWxvbixcbiAgICAgICkpXG4gICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bTtcbiIsImltcG9ydCBDYXJ0ZXNpYW4zIGZyb20gXCIuL0NhcnRlc2lhbjMuanNcIjtcbmltcG9ydCBDYXJ0b2dyYXBoaWMgZnJvbSBcIi4vQ2FydG9ncmFwaGljLmpzXCI7XG5pbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4vRGV2ZWxvcGVyRXJyb3IuanNcIjtcbmltcG9ydCBFbGxpcHNvaWQgZnJvbSBcIi4vRWxsaXBzb2lkLmpzXCI7XG5pbXBvcnQgRWxsaXBzb2lkR2VvZGVzaWMgZnJvbSBcIi4vRWxsaXBzb2lkR2VvZGVzaWMuanNcIjtcbmltcG9ydCBFbGxpcHNvaWRSaHVtYkxpbmUgZnJvbSBcIi4vRWxsaXBzb2lkUmh1bWJMaW5lLmpzXCI7XG5pbXBvcnQgSW50ZXJzZWN0aW9uVGVzdHMgZnJvbSBcIi4vSW50ZXJzZWN0aW9uVGVzdHMuanNcIjtcbmltcG9ydCBDZXNpdW1NYXRoIGZyb20gXCIuL01hdGguanNcIjtcbmltcG9ydCBNYXRyaXg0IGZyb20gXCIuL01hdHJpeDQuanNcIjtcbmltcG9ydCBQbGFuZSBmcm9tIFwiLi9QbGFuZS5qc1wiO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IFBvbHlsaW5lUGlwZWxpbmUgPSB7fTtcblxuUG9seWxpbmVQaXBlbGluZS5udW1iZXJPZlBvaW50cyA9IGZ1bmN0aW9uIChwMCwgcDEsIG1pbkRpc3RhbmNlKSB7XG4gIGNvbnN0IGRpc3RhbmNlID0gQ2FydGVzaWFuMy5kaXN0YW5jZShwMCwgcDEpO1xuICByZXR1cm4gTWF0aC5jZWlsKGRpc3RhbmNlIC8gbWluRGlzdGFuY2UpO1xufTtcblxuUG9seWxpbmVQaXBlbGluZS5udW1iZXJPZlBvaW50c1JodW1iTGluZSA9IGZ1bmN0aW9uIChwMCwgcDEsIGdyYW51bGFyaXR5KSB7XG4gIGNvbnN0IHJhZGlhbnNEaXN0YW5jZVNxdWFyZWQgPVxuICAgIE1hdGgucG93KHAwLmxvbmdpdHVkZSAtIHAxLmxvbmdpdHVkZSwgMikgK1xuICAgIE1hdGgucG93KHAwLmxhdGl0dWRlIC0gcDEubGF0aXR1ZGUsIDIpO1xuXG4gIHJldHVybiBNYXRoLm1heChcbiAgICAxLFxuICAgIE1hdGguY2VpbChNYXRoLnNxcnQocmFkaWFuc0Rpc3RhbmNlU3F1YXJlZCAvIChncmFudWxhcml0eSAqIGdyYW51bGFyaXR5KSkpLFxuICApO1xufTtcblxuY29uc3QgY2FydG9TY3JhdGNoID0gbmV3IENhcnRvZ3JhcGhpYygpO1xuUG9seWxpbmVQaXBlbGluZS5leHRyYWN0SGVpZ2h0cyA9IGZ1bmN0aW9uIChwb3NpdGlvbnMsIGVsbGlwc29pZCkge1xuICBjb25zdCBsZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICBjb25zdCBoZWlnaHRzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwID0gcG9zaXRpb25zW2ldO1xuICAgIGhlaWdodHNbaV0gPSBlbGxpcHNvaWQuY2FydGVzaWFuVG9DYXJ0b2dyYXBoaWMocCwgY2FydG9TY3JhdGNoKS5oZWlnaHQ7XG4gIH1cbiAgcmV0dXJuIGhlaWdodHM7XG59O1xuXG5jb25zdCB3cmFwTG9uZ2l0dWRlSW52ZXJzTWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcbmNvbnN0IHdyYXBMb25naXR1ZGVPcmlnaW4gPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3Qgd3JhcExvbmdpdHVkZVhaTm9ybWFsID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IHdyYXBMb25naXR1ZGVYWlBsYW5lID0gbmV3IFBsYW5lKENhcnRlc2lhbjMuVU5JVF9YLCAwLjApO1xuY29uc3Qgd3JhcExvbmdpdHVkZVlaTm9ybWFsID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IHdyYXBMb25naXR1ZGVZWlBsYW5lID0gbmV3IFBsYW5lKENhcnRlc2lhbjMuVU5JVF9YLCAwLjApO1xuY29uc3Qgd3JhcExvbmdpdHVkZUludGVyc2VjdGlvbiA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCB3cmFwTG9uZ2l0dWRlT2Zmc2V0ID0gbmV3IENhcnRlc2lhbjMoKTtcblxuY29uc3Qgc3ViZGl2aWRlSGVpZ2h0c1NjcmF0Y2hBcnJheSA9IFtdO1xuXG5mdW5jdGlvbiBzdWJkaXZpZGVIZWlnaHRzKG51bVBvaW50cywgaDAsIGgxKSB7XG4gIGNvbnN0IGhlaWdodHMgPSBzdWJkaXZpZGVIZWlnaHRzU2NyYXRjaEFycmF5O1xuICBoZWlnaHRzLmxlbmd0aCA9IG51bVBvaW50cztcblxuICBsZXQgaTtcbiAgaWYgKGgwID09PSBoMSkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBudW1Qb2ludHM7IGkrKykge1xuICAgICAgaGVpZ2h0c1tpXSA9IGgwO1xuICAgIH1cbiAgICByZXR1cm4gaGVpZ2h0cztcbiAgfVxuXG4gIGNvbnN0IGRIZWlnaHQgPSBoMSAtIGgwO1xuICBjb25zdCBoZWlnaHRQZXJWZXJ0ZXggPSBkSGVpZ2h0IC8gbnVtUG9pbnRzO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBudW1Qb2ludHM7IGkrKykge1xuICAgIGNvbnN0IGggPSBoMCArIGkgKiBoZWlnaHRQZXJWZXJ0ZXg7XG4gICAgaGVpZ2h0c1tpXSA9IGg7XG4gIH1cblxuICByZXR1cm4gaGVpZ2h0cztcbn1cblxuY29uc3QgY2FydG8xID0gbmV3IENhcnRvZ3JhcGhpYygpO1xuY29uc3QgY2FydG8yID0gbmV3IENhcnRvZ3JhcGhpYygpO1xuY29uc3QgY2FydGVzaWFuID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IHNjYWxlRmlyc3QgPSBuZXcgQ2FydGVzaWFuMygpO1xuY29uc3Qgc2NhbGVMYXN0ID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IGVsbGlwc29pZEdlb2Rlc2ljID0gbmV3IEVsbGlwc29pZEdlb2Rlc2ljKCk7XG5sZXQgZWxsaXBzb2lkUmh1bWIgPSBuZXcgRWxsaXBzb2lkUmh1bWJMaW5lKCk7XG5cbi8vUmV0dXJucyBzdWJkaXZpZGVkIGxpbmUgc2NhbGVkIHRvIGVsbGlwc29pZCBzdXJmYWNlIHN0YXJ0aW5nIGF0IHAxIGFuZCBlbmRpbmcgYXQgcDIuXG4vL1Jlc3VsdCBpbmNsdWRlcyBwMSwgYnV0IG5vdCBpbmNsdWRlIHAyLiAgVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgZm9yIGEgc2VxdWVuY2Ugb2YgbGluZSBzZWdtZW50cyxcbi8vYW5kIHRoaXMgcHJldmVudHMgZHVwbGljYXRpb24gb2YgZW5kIHBvaW50LlxuZnVuY3Rpb24gZ2VuZXJhdGVDYXJ0ZXNpYW5BcmMoXG4gIHAwLFxuICBwMSxcbiAgbWluRGlzdGFuY2UsXG4gIGVsbGlwc29pZCxcbiAgaDAsXG4gIGgxLFxuICBhcnJheSxcbiAgb2Zmc2V0LFxuKSB7XG4gIGNvbnN0IGZpcnN0ID0gZWxsaXBzb2lkLnNjYWxlVG9HZW9kZXRpY1N1cmZhY2UocDAsIHNjYWxlRmlyc3QpO1xuICBjb25zdCBsYXN0ID0gZWxsaXBzb2lkLnNjYWxlVG9HZW9kZXRpY1N1cmZhY2UocDEsIHNjYWxlTGFzdCk7XG4gIGNvbnN0IG51bVBvaW50cyA9IFBvbHlsaW5lUGlwZWxpbmUubnVtYmVyT2ZQb2ludHMocDAsIHAxLCBtaW5EaXN0YW5jZSk7XG4gIGNvbnN0IHN0YXJ0ID0gZWxsaXBzb2lkLmNhcnRlc2lhblRvQ2FydG9ncmFwaGljKGZpcnN0LCBjYXJ0bzEpO1xuICBjb25zdCBlbmQgPSBlbGxpcHNvaWQuY2FydGVzaWFuVG9DYXJ0b2dyYXBoaWMobGFzdCwgY2FydG8yKTtcbiAgY29uc3QgaGVpZ2h0cyA9IHN1YmRpdmlkZUhlaWdodHMobnVtUG9pbnRzLCBoMCwgaDEpO1xuXG4gIGVsbGlwc29pZEdlb2Rlc2ljLnNldEVuZFBvaW50cyhzdGFydCwgZW5kKTtcbiAgY29uc3Qgc3VyZmFjZURpc3RhbmNlQmV0d2VlblBvaW50cyA9XG4gICAgZWxsaXBzb2lkR2VvZGVzaWMuc3VyZmFjZURpc3RhbmNlIC8gbnVtUG9pbnRzO1xuXG4gIGxldCBpbmRleCA9IG9mZnNldDtcbiAgc3RhcnQuaGVpZ2h0ID0gaDA7XG4gIGxldCBjYXJ0ID0gZWxsaXBzb2lkLmNhcnRvZ3JhcGhpY1RvQ2FydGVzaWFuKHN0YXJ0LCBjYXJ0ZXNpYW4pO1xuICBDYXJ0ZXNpYW4zLnBhY2soY2FydCwgYXJyYXksIGluZGV4KTtcbiAgaW5kZXggKz0gMztcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IG51bVBvaW50czsgaSsrKSB7XG4gICAgY29uc3QgY2FydG8gPSBlbGxpcHNvaWRHZW9kZXNpYy5pbnRlcnBvbGF0ZVVzaW5nU3VyZmFjZURpc3RhbmNlKFxuICAgICAgaSAqIHN1cmZhY2VEaXN0YW5jZUJldHdlZW5Qb2ludHMsXG4gICAgICBjYXJ0bzIsXG4gICAgKTtcbiAgICBjYXJ0by5oZWlnaHQgPSBoZWlnaHRzW2ldO1xuICAgIGNhcnQgPSBlbGxpcHNvaWQuY2FydG9ncmFwaGljVG9DYXJ0ZXNpYW4oY2FydG8sIGNhcnRlc2lhbik7XG4gICAgQ2FydGVzaWFuMy5wYWNrKGNhcnQsIGFycmF5LCBpbmRleCk7XG4gICAgaW5kZXggKz0gMztcbiAgfVxuXG4gIHJldHVybiBpbmRleDtcbn1cblxuLy9SZXR1cm5zIHN1YmRpdmlkZWQgbGluZSBzY2FsZWQgdG8gZWxsaXBzb2lkIHN1cmZhY2Ugc3RhcnRpbmcgYXQgcDEgYW5kIGVuZGluZyBhdCBwMi5cbi8vUmVzdWx0IGluY2x1ZGVzIHAxLCBidXQgbm90IGluY2x1ZGUgcDIuICBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBmb3IgYSBzZXF1ZW5jZSBvZiBsaW5lIHNlZ21lbnRzLFxuLy9hbmQgdGhpcyBwcmV2ZW50cyBkdXBsaWNhdGlvbiBvZiBlbmQgcG9pbnQuXG5mdW5jdGlvbiBnZW5lcmF0ZUNhcnRlc2lhblJodW1iQXJjKFxuICBwMCxcbiAgcDEsXG4gIGdyYW51bGFyaXR5LFxuICBlbGxpcHNvaWQsXG4gIGgwLFxuICBoMSxcbiAgYXJyYXksXG4gIG9mZnNldCxcbikge1xuICBjb25zdCBzdGFydCA9IGVsbGlwc29pZC5jYXJ0ZXNpYW5Ub0NhcnRvZ3JhcGhpYyhwMCwgY2FydG8xKTtcbiAgY29uc3QgZW5kID0gZWxsaXBzb2lkLmNhcnRlc2lhblRvQ2FydG9ncmFwaGljKHAxLCBjYXJ0bzIpO1xuICBjb25zdCBudW1Qb2ludHMgPSBQb2x5bGluZVBpcGVsaW5lLm51bWJlck9mUG9pbnRzUmh1bWJMaW5lKFxuICAgIHN0YXJ0LFxuICAgIGVuZCxcbiAgICBncmFudWxhcml0eSxcbiAgKTtcbiAgc3RhcnQuaGVpZ2h0ID0gMC4wO1xuICBlbmQuaGVpZ2h0ID0gMC4wO1xuICBjb25zdCBoZWlnaHRzID0gc3ViZGl2aWRlSGVpZ2h0cyhudW1Qb2ludHMsIGgwLCBoMSk7XG5cbiAgaWYgKCFlbGxpcHNvaWRSaHVtYi5lbGxpcHNvaWQuZXF1YWxzKGVsbGlwc29pZCkpIHtcbiAgICBlbGxpcHNvaWRSaHVtYiA9IG5ldyBFbGxpcHNvaWRSaHVtYkxpbmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIGVsbGlwc29pZCk7XG4gIH1cbiAgZWxsaXBzb2lkUmh1bWIuc2V0RW5kUG9pbnRzKHN0YXJ0LCBlbmQpO1xuICBjb25zdCBzdXJmYWNlRGlzdGFuY2VCZXR3ZWVuUG9pbnRzID1cbiAgICBlbGxpcHNvaWRSaHVtYi5zdXJmYWNlRGlzdGFuY2UgLyBudW1Qb2ludHM7XG5cbiAgbGV0IGluZGV4ID0gb2Zmc2V0O1xuICBzdGFydC5oZWlnaHQgPSBoMDtcbiAgbGV0IGNhcnQgPSBlbGxpcHNvaWQuY2FydG9ncmFwaGljVG9DYXJ0ZXNpYW4oc3RhcnQsIGNhcnRlc2lhbik7XG4gIENhcnRlc2lhbjMucGFjayhjYXJ0LCBhcnJheSwgaW5kZXgpO1xuICBpbmRleCArPSAzO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbnVtUG9pbnRzOyBpKyspIHtcbiAgICBjb25zdCBjYXJ0byA9IGVsbGlwc29pZFJodW1iLmludGVycG9sYXRlVXNpbmdTdXJmYWNlRGlzdGFuY2UoXG4gICAgICBpICogc3VyZmFjZURpc3RhbmNlQmV0d2VlblBvaW50cyxcbiAgICAgIGNhcnRvMixcbiAgICApO1xuICAgIGNhcnRvLmhlaWdodCA9IGhlaWdodHNbaV07XG4gICAgY2FydCA9IGVsbGlwc29pZC5jYXJ0b2dyYXBoaWNUb0NhcnRlc2lhbihjYXJ0bywgY2FydGVzaWFuKTtcbiAgICBDYXJ0ZXNpYW4zLnBhY2soY2FydCwgYXJyYXksIGluZGV4KTtcbiAgICBpbmRleCArPSAzO1xuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKipcbiAqIEJyZWFrcyBhIHtAbGluayBQb2x5bGluZX0gaW50byBzZWdtZW50cyBzdWNoIHRoYXQgaXQgZG9lcyBub3QgY3Jvc3MgdGhlICZwbHVzbW47MTgwIGRlZ3JlZSBtZXJpZGlhbiBvZiBhbiBlbGxpcHNvaWQuXG4gKlxuICogQHBhcmFtIHtDYXJ0ZXNpYW4zW119IHBvc2l0aW9ucyBUaGUgcG9seWxpbmUncyBDYXJ0ZXNpYW4gcG9zaXRpb25zLlxuICogQHBhcmFtIHtNYXRyaXg0fSBbbW9kZWxNYXRyaXg9TWF0cml4NC5JREVOVElUWV0gVGhlIHBvbHlsaW5lJ3MgbW9kZWwgbWF0cml4LiBBc3N1bWVkIHRvIGJlIGFuIGFmZmluZVxuICogdHJhbnNmb3JtYXRpb24gbWF0cml4LCB3aGVyZSB0aGUgdXBwZXIgbGVmdCAzeDMgZWxlbWVudHMgYXJlIGEgcm90YXRpb24gbWF0cml4LCBhbmRcbiAqIHRoZSB1cHBlciB0aHJlZSBlbGVtZW50cyBpbiB0aGUgZm91cnRoIGNvbHVtbiBhcmUgdGhlIHRyYW5zbGF0aW9uLiAgVGhlIGJvdHRvbSByb3cgaXMgYXNzdW1lZCB0byBiZSBbMCwgMCwgMCwgMV0uXG4gKiBUaGUgbWF0cml4IGlzIG5vdCB2ZXJpZmllZCB0byBiZSBpbiB0aGUgcHJvcGVyIGZvcm0uXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBhIDxjb2RlPnBvc2l0aW9uczwvY29kZT4gcHJvcGVydHkgdGhhdCBpcyBhbiBhcnJheSBvZiBwb3NpdGlvbnMgYW5kIGFcbiAqIDxjb2RlPnNlZ21lbnRzPC9jb2RlPiBwcm9wZXJ0eS5cbiAqXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHBvbHlsaW5lcyA9IG5ldyBDZXNpdW0uUG9seWxpbmVDb2xsZWN0aW9uKCk7XG4gKiBjb25zdCBwb2x5bGluZSA9IHBvbHlsaW5lcy5hZGQoLi4uKTtcbiAqIGNvbnN0IHBvc2l0aW9ucyA9IHBvbHlsaW5lLnBvc2l0aW9ucztcbiAqIGNvbnN0IG1vZGVsTWF0cml4ID0gcG9seWxpbmVzLm1vZGVsTWF0cml4O1xuICogY29uc3Qgc2VnbWVudHMgPSBDZXNpdW0uUG9seWxpbmVQaXBlbGluZS53cmFwTG9uZ2l0dWRlKHBvc2l0aW9ucywgbW9kZWxNYXRyaXgpO1xuICpcbiAqIEBzZWUgUG9seWdvblBpcGVsaW5lLndyYXBMb25naXR1ZGVcbiAqIEBzZWUgUG9seWxpbmVcbiAqIEBzZWUgUG9seWxpbmVDb2xsZWN0aW9uXG4gKi9cblBvbHlsaW5lUGlwZWxpbmUud3JhcExvbmdpdHVkZSA9IGZ1bmN0aW9uIChwb3NpdGlvbnMsIG1vZGVsTWF0cml4KSB7XG4gIGNvbnN0IGNhcnRlc2lhbnMgPSBbXTtcbiAgY29uc3Qgc2VnbWVudHMgPSBbXTtcblxuICBpZiAoZGVmaW5lZChwb3NpdGlvbnMpICYmIHBvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgbW9kZWxNYXRyaXggPSBtb2RlbE1hdHJpeCA/PyBNYXRyaXg0LklERU5USVRZO1xuICAgIGNvbnN0IGludmVyc2VNb2RlbE1hdHJpeCA9IE1hdHJpeDQuaW52ZXJzZVRyYW5zZm9ybWF0aW9uKFxuICAgICAgbW9kZWxNYXRyaXgsXG4gICAgICB3cmFwTG9uZ2l0dWRlSW52ZXJzTWF0cml4LFxuICAgICk7XG5cbiAgICBjb25zdCBvcmlnaW4gPSBNYXRyaXg0Lm11bHRpcGx5QnlQb2ludChcbiAgICAgIGludmVyc2VNb2RlbE1hdHJpeCxcbiAgICAgIENhcnRlc2lhbjMuWkVSTyxcbiAgICAgIHdyYXBMb25naXR1ZGVPcmlnaW4sXG4gICAgKTtcbiAgICBjb25zdCB4ek5vcm1hbCA9IENhcnRlc2lhbjMubm9ybWFsaXplKFxuICAgICAgTWF0cml4NC5tdWx0aXBseUJ5UG9pbnRBc1ZlY3RvcihcbiAgICAgICAgaW52ZXJzZU1vZGVsTWF0cml4LFxuICAgICAgICBDYXJ0ZXNpYW4zLlVOSVRfWSxcbiAgICAgICAgd3JhcExvbmdpdHVkZVhaTm9ybWFsLFxuICAgICAgKSxcbiAgICAgIHdyYXBMb25naXR1ZGVYWk5vcm1hbCxcbiAgICApO1xuICAgIGNvbnN0IHh6UGxhbmUgPSBQbGFuZS5mcm9tUG9pbnROb3JtYWwoXG4gICAgICBvcmlnaW4sXG4gICAgICB4ek5vcm1hbCxcbiAgICAgIHdyYXBMb25naXR1ZGVYWlBsYW5lLFxuICAgICk7XG4gICAgY29uc3QgeXpOb3JtYWwgPSBDYXJ0ZXNpYW4zLm5vcm1hbGl6ZShcbiAgICAgIE1hdHJpeDQubXVsdGlwbHlCeVBvaW50QXNWZWN0b3IoXG4gICAgICAgIGludmVyc2VNb2RlbE1hdHJpeCxcbiAgICAgICAgQ2FydGVzaWFuMy5VTklUX1gsXG4gICAgICAgIHdyYXBMb25naXR1ZGVZWk5vcm1hbCxcbiAgICAgICksXG4gICAgICB3cmFwTG9uZ2l0dWRlWVpOb3JtYWwsXG4gICAgKTtcbiAgICBjb25zdCB5elBsYW5lID0gUGxhbmUuZnJvbVBvaW50Tm9ybWFsKFxuICAgICAgb3JpZ2luLFxuICAgICAgeXpOb3JtYWwsXG4gICAgICB3cmFwTG9uZ2l0dWRlWVpQbGFuZSxcbiAgICApO1xuXG4gICAgbGV0IGNvdW50ID0gMTtcbiAgICBjYXJ0ZXNpYW5zLnB1c2goQ2FydGVzaWFuMy5jbG9uZShwb3NpdGlvbnNbMF0pKTtcbiAgICBsZXQgcHJldiA9IGNhcnRlc2lhbnNbMF07XG5cbiAgICBjb25zdCBsZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IGN1ciA9IHBvc2l0aW9uc1tpXTtcblxuICAgICAgLy8gaW50ZXJzZWN0cyB0aGUgSURMIGlmIGVpdGhlciBlbmRwb2ludCBpcyBvbiB0aGUgbmVnYXRpdmUgc2lkZSBvZiB0aGUgeXotcGxhbmVcbiAgICAgIGlmIChcbiAgICAgICAgUGxhbmUuZ2V0UG9pbnREaXN0YW5jZSh5elBsYW5lLCBwcmV2KSA8IDAuMCB8fFxuICAgICAgICBQbGFuZS5nZXRQb2ludERpc3RhbmNlKHl6UGxhbmUsIGN1cikgPCAwLjBcbiAgICAgICkge1xuICAgICAgICAvLyBhbmQgaW50ZXJzZWN0cyB0aGUgeHotcGxhbmVcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gSW50ZXJzZWN0aW9uVGVzdHMubGluZVNlZ21lbnRQbGFuZShcbiAgICAgICAgICBwcmV2LFxuICAgICAgICAgIGN1cixcbiAgICAgICAgICB4elBsYW5lLFxuICAgICAgICAgIHdyYXBMb25naXR1ZGVJbnRlcnNlY3Rpb24sXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkZWZpbmVkKGludGVyc2VjdGlvbikpIHtcbiAgICAgICAgICAvLyBtb3ZlIHBvaW50IG9uIHRoZSB4ei1wbGFuZSBzbGlnaHRseSBhd2F5IGZyb20gdGhlIHBsYW5lXG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gQ2FydGVzaWFuMy5tdWx0aXBseUJ5U2NhbGFyKFxuICAgICAgICAgICAgeHpOb3JtYWwsXG4gICAgICAgICAgICA1LjBlLTksXG4gICAgICAgICAgICB3cmFwTG9uZ2l0dWRlT2Zmc2V0LFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKFBsYW5lLmdldFBvaW50RGlzdGFuY2UoeHpQbGFuZSwgcHJldikgPCAwLjApIHtcbiAgICAgICAgICAgIENhcnRlc2lhbjMubmVnYXRlKG9mZnNldCwgb2Zmc2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXJ0ZXNpYW5zLnB1c2goXG4gICAgICAgICAgICBDYXJ0ZXNpYW4zLmFkZChpbnRlcnNlY3Rpb24sIG9mZnNldCwgbmV3IENhcnRlc2lhbjMoKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZWdtZW50cy5wdXNoKGNvdW50ICsgMSk7XG5cbiAgICAgICAgICBDYXJ0ZXNpYW4zLm5lZ2F0ZShvZmZzZXQsIG9mZnNldCk7XG4gICAgICAgICAgY2FydGVzaWFucy5wdXNoKFxuICAgICAgICAgICAgQ2FydGVzaWFuMy5hZGQoaW50ZXJzZWN0aW9uLCBvZmZzZXQsIG5ldyBDYXJ0ZXNpYW4zKCkpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY291bnQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNhcnRlc2lhbnMucHVzaChDYXJ0ZXNpYW4zLmNsb25lKHBvc2l0aW9uc1tpXSkpO1xuICAgICAgY291bnQrKztcblxuICAgICAgcHJldiA9IGN1cjtcbiAgICB9XG5cbiAgICBzZWdtZW50cy5wdXNoKGNvdW50KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcG9zaXRpb25zOiBjYXJ0ZXNpYW5zLFxuICAgIGxlbmd0aHM6IHNlZ21lbnRzLFxuICB9O1xufTtcblxuLyoqXG4gKiBTdWJkaXZpZGVzIHBvbHlsaW5lIGFuZCByYWlzZXMgYWxsIHBvaW50cyB0byB0aGUgc3BlY2lmaWVkIGhlaWdodC4gIFJldHVybnMgYW4gYXJyYXkgb2YgbnVtYmVycyB0byByZXByZXNlbnQgdGhlIHBvc2l0aW9ucy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIEBwYXJhbSB7Q2FydGVzaWFuM1tdfSBvcHRpb25zLnBvc2l0aW9ucyBUaGUgYXJyYXkgb2YgdHlwZSB7Q2FydGVzaWFuM30gcmVwcmVzZW50aW5nIHBvc2l0aW9ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBbb3B0aW9ucy5oZWlnaHQ9MC4wXSBBIG51bWJlciBvciBhcnJheSBvZiBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgaGVpZ2h0cyBvZiBlYWNoIHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdyYW51bGFyaXR5ID0gQ2VzaXVtTWF0aC5SQURJQU5TX1BFUl9ERUdSRUVdIFRoZSBkaXN0YW5jZSwgaW4gcmFkaWFucywgYmV0d2VlbiBlYWNoIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUuIERldGVybWluZXMgdGhlIG51bWJlciBvZiBwb3NpdGlvbnMgaW4gdGhlIGJ1ZmZlci5cbiAqIEBwYXJhbSB7RWxsaXBzb2lkfSBbb3B0aW9ucy5lbGxpcHNvaWQ9RWxsaXBzb2lkLmRlZmF1bHRdIFRoZSBlbGxpcHNvaWQgb24gd2hpY2ggdGhlIHBvc2l0aW9ucyBsaWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyW119IEEgbmV3IGFycmF5IG9mIHBvc2l0aW9ucyBvZiB0eXBlIHtudW1iZXJ9IHRoYXQgaGF2ZSBiZWVuIHN1YmRpdmlkZWQgYW5kIHJhaXNlZCB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWxsaXBzb2lkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBwb3NpdGlvbnMgPSBDZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlc0FycmF5KFtcbiAqICAgLTEwNS4wLCA0MC4wLFxuICogICAtMTAwLjAsIDM4LjAsXG4gKiAgIC0xMDUuMCwgMzUuMCxcbiAqICAgLTEwMC4wLCAzMi4wXG4gKiBdKTtcbiAqIGNvbnN0IHN1cmZhY2VQb3NpdGlvbnMgPSBDZXNpdW0uUG9seWxpbmVQaXBlbGluZS5nZW5lcmF0ZUFyYyh7XG4gKiAgIHBvc2l0b25zOiBwb3NpdGlvbnNcbiAqIH0pO1xuICovXG5Qb2x5bGluZVBpcGVsaW5lLmdlbmVyYXRlQXJjID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKCFkZWZpbmVkKG9wdGlvbnMpKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGNvbnN0IHBvc2l0aW9ucyA9IG9wdGlvbnMucG9zaXRpb25zO1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQocG9zaXRpb25zKSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcIm9wdGlvbnMucG9zaXRpb25zIGlzIHJlcXVpcmVkLlwiKTtcbiAgfVxuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICBjb25zdCBsZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICBjb25zdCBlbGxpcHNvaWQgPSBvcHRpb25zLmVsbGlwc29pZCA/PyBFbGxpcHNvaWQuZGVmYXVsdDtcbiAgbGV0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0ID8/IDA7XG4gIGNvbnN0IGhhc0hlaWdodEFycmF5ID0gQXJyYXkuaXNBcnJheShoZWlnaHQpO1xuXG4gIGlmIChsZW5ndGggPCAxKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IHAgPSBlbGxpcHNvaWQuc2NhbGVUb0dlb2RldGljU3VyZmFjZShwb3NpdGlvbnNbMF0sIHNjYWxlRmlyc3QpO1xuICAgIGhlaWdodCA9IGhhc0hlaWdodEFycmF5ID8gaGVpZ2h0WzBdIDogaGVpZ2h0O1xuICAgIGlmIChoZWlnaHQgIT09IDApIHtcbiAgICAgIGNvbnN0IG4gPSBlbGxpcHNvaWQuZ2VvZGV0aWNTdXJmYWNlTm9ybWFsKHAsIGNhcnRlc2lhbik7XG4gICAgICBDYXJ0ZXNpYW4zLm11bHRpcGx5QnlTY2FsYXIobiwgaGVpZ2h0LCBuKTtcbiAgICAgIENhcnRlc2lhbjMuYWRkKHAsIG4sIHApO1xuICAgIH1cblxuICAgIHJldHVybiBbcC54LCBwLnksIHAuel07XG4gIH1cblxuICBsZXQgbWluRGlzdGFuY2UgPSBvcHRpb25zLm1pbkRpc3RhbmNlO1xuICBpZiAoIWRlZmluZWQobWluRGlzdGFuY2UpKSB7XG4gICAgY29uc3QgZ3JhbnVsYXJpdHkgPSBvcHRpb25zLmdyYW51bGFyaXR5ID8/IENlc2l1bU1hdGguUkFESUFOU19QRVJfREVHUkVFO1xuICAgIG1pbkRpc3RhbmNlID0gQ2VzaXVtTWF0aC5jaG9yZExlbmd0aChncmFudWxhcml0eSwgZWxsaXBzb2lkLm1heGltdW1SYWRpdXMpO1xuICB9XG5cbiAgbGV0IG51bVBvaW50cyA9IDA7XG4gIGxldCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICBudW1Qb2ludHMgKz0gUG9seWxpbmVQaXBlbGluZS5udW1iZXJPZlBvaW50cyhcbiAgICAgIHBvc2l0aW9uc1tpXSxcbiAgICAgIHBvc2l0aW9uc1tpICsgMV0sXG4gICAgICBtaW5EaXN0YW5jZSxcbiAgICApO1xuICB9XG5cbiAgY29uc3QgYXJyYXlMZW5ndGggPSAobnVtUG9pbnRzICsgMSkgKiAzO1xuICBjb25zdCBuZXdQb3NpdGlvbnMgPSBuZXcgQXJyYXkoYXJyYXlMZW5ndGgpO1xuICBsZXQgb2Zmc2V0ID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgY29uc3QgcDAgPSBwb3NpdGlvbnNbaV07XG4gICAgY29uc3QgcDEgPSBwb3NpdGlvbnNbaSArIDFdO1xuXG4gICAgY29uc3QgaDAgPSBoYXNIZWlnaHRBcnJheSA/IGhlaWdodFtpXSA6IGhlaWdodDtcbiAgICBjb25zdCBoMSA9IGhhc0hlaWdodEFycmF5ID8gaGVpZ2h0W2kgKyAxXSA6IGhlaWdodDtcblxuICAgIG9mZnNldCA9IGdlbmVyYXRlQ2FydGVzaWFuQXJjKFxuICAgICAgcDAsXG4gICAgICBwMSxcbiAgICAgIG1pbkRpc3RhbmNlLFxuICAgICAgZWxsaXBzb2lkLFxuICAgICAgaDAsXG4gICAgICBoMSxcbiAgICAgIG5ld1Bvc2l0aW9ucyxcbiAgICAgIG9mZnNldCxcbiAgICApO1xuICB9XG5cbiAgc3ViZGl2aWRlSGVpZ2h0c1NjcmF0Y2hBcnJheS5sZW5ndGggPSAwO1xuXG4gIGNvbnN0IGxhc3RQb2ludCA9IHBvc2l0aW9uc1tsZW5ndGggLSAxXTtcbiAgY29uc3QgY2FydG8gPSBlbGxpcHNvaWQuY2FydGVzaWFuVG9DYXJ0b2dyYXBoaWMobGFzdFBvaW50LCBjYXJ0bzEpO1xuICBjYXJ0by5oZWlnaHQgPSBoYXNIZWlnaHRBcnJheSA/IGhlaWdodFtsZW5ndGggLSAxXSA6IGhlaWdodDtcbiAgY29uc3QgY2FydCA9IGVsbGlwc29pZC5jYXJ0b2dyYXBoaWNUb0NhcnRlc2lhbihjYXJ0bywgY2FydGVzaWFuKTtcbiAgQ2FydGVzaWFuMy5wYWNrKGNhcnQsIG5ld1Bvc2l0aW9ucywgYXJyYXlMZW5ndGggLSAzKTtcblxuICByZXR1cm4gbmV3UG9zaXRpb25zO1xufTtcblxuY29uc3Qgc2NyYXRjaENhcnRvZ3JhcGhpYzAgPSBuZXcgQ2FydG9ncmFwaGljKCk7XG5jb25zdCBzY3JhdGNoQ2FydG9ncmFwaGljMSA9IG5ldyBDYXJ0b2dyYXBoaWMoKTtcblxuLyoqXG4gKiBTdWJkaXZpZGVzIHBvbHlsaW5lIGFuZCByYWlzZXMgYWxsIHBvaW50cyB0byB0aGUgc3BlY2lmaWVkIGhlaWdodCB1c2luZyBSaHVtYiBsaW5lcy4gIFJldHVybnMgYW4gYXJyYXkgb2YgbnVtYmVycyB0byByZXByZXNlbnQgdGhlIHBvc2l0aW9ucy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIEBwYXJhbSB7Q2FydGVzaWFuM1tdfSBvcHRpb25zLnBvc2l0aW9ucyBUaGUgYXJyYXkgb2YgdHlwZSB7Q2FydGVzaWFuM30gcmVwcmVzZW50aW5nIHBvc2l0aW9ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBbb3B0aW9ucy5oZWlnaHQ9MC4wXSBBIG51bWJlciBvciBhcnJheSBvZiBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgaGVpZ2h0cyBvZiBlYWNoIHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdyYW51bGFyaXR5ID0gQ2VzaXVtTWF0aC5SQURJQU5TX1BFUl9ERUdSRUVdIFRoZSBkaXN0YW5jZSwgaW4gcmFkaWFucywgYmV0d2VlbiBlYWNoIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUuIERldGVybWluZXMgdGhlIG51bWJlciBvZiBwb3NpdGlvbnMgaW4gdGhlIGJ1ZmZlci5cbiAqIEBwYXJhbSB7RWxsaXBzb2lkfSBbb3B0aW9ucy5lbGxpcHNvaWQ9RWxsaXBzb2lkLmRlZmF1bHRdIFRoZSBlbGxpcHNvaWQgb24gd2hpY2ggdGhlIHBvc2l0aW9ucyBsaWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyW119IEEgbmV3IGFycmF5IG9mIHBvc2l0aW9ucyBvZiB0eXBlIHtudW1iZXJ9IHRoYXQgaGF2ZSBiZWVuIHN1YmRpdmlkZWQgYW5kIHJhaXNlZCB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWxsaXBzb2lkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBwb3NpdGlvbnMgPSBDZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlc0FycmF5KFtcbiAqICAgLTEwNS4wLCA0MC4wLFxuICogICAtMTAwLjAsIDM4LjAsXG4gKiAgIC0xMDUuMCwgMzUuMCxcbiAqICAgLTEwMC4wLCAzMi4wXG4gKiBdKTtcbiAqIGNvbnN0IHN1cmZhY2VQb3NpdGlvbnMgPSBDZXNpdW0uUG9seWxpbmVQaXBlbGluZS5nZW5lcmF0ZVJodW1iQXJjKHtcbiAqICAgcG9zaXRvbnM6IHBvc2l0aW9uc1xuICogfSk7XG4gKi9cblBvbHlsaW5lUGlwZWxpbmUuZ2VuZXJhdGVSaHVtYkFyYyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGlmICghZGVmaW5lZChvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBjb25zdCBwb3NpdGlvbnMgPSBvcHRpb25zLnBvc2l0aW9ucztcbiAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgaWYgKCFkZWZpbmVkKHBvc2l0aW9ucykpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJvcHRpb25zLnBvc2l0aW9ucyBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgY29uc3QgbGVuZ3RoID0gcG9zaXRpb25zLmxlbmd0aDtcbiAgY29uc3QgZWxsaXBzb2lkID0gb3B0aW9ucy5lbGxpcHNvaWQgPz8gRWxsaXBzb2lkLmRlZmF1bHQ7XG4gIGxldCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCA/PyAwO1xuICBjb25zdCBoYXNIZWlnaHRBcnJheSA9IEFycmF5LmlzQXJyYXkoaGVpZ2h0KTtcblxuICBpZiAobGVuZ3RoIDwgMSkge1xuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBwID0gZWxsaXBzb2lkLnNjYWxlVG9HZW9kZXRpY1N1cmZhY2UocG9zaXRpb25zWzBdLCBzY2FsZUZpcnN0KTtcbiAgICBoZWlnaHQgPSBoYXNIZWlnaHRBcnJheSA/IGhlaWdodFswXSA6IGhlaWdodDtcbiAgICBpZiAoaGVpZ2h0ICE9PSAwKSB7XG4gICAgICBjb25zdCBuID0gZWxsaXBzb2lkLmdlb2RldGljU3VyZmFjZU5vcm1hbChwLCBjYXJ0ZXNpYW4pO1xuICAgICAgQ2FydGVzaWFuMy5tdWx0aXBseUJ5U2NhbGFyKG4sIGhlaWdodCwgbik7XG4gICAgICBDYXJ0ZXNpYW4zLmFkZChwLCBuLCBwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3AueCwgcC55LCBwLnpdO1xuICB9XG5cbiAgY29uc3QgZ3JhbnVsYXJpdHkgPSBvcHRpb25zLmdyYW51bGFyaXR5ID8/IENlc2l1bU1hdGguUkFESUFOU19QRVJfREVHUkVFO1xuXG4gIGxldCBudW1Qb2ludHMgPSAwO1xuICBsZXQgaTtcblxuICBsZXQgYzAgPSBlbGxpcHNvaWQuY2FydGVzaWFuVG9DYXJ0b2dyYXBoaWMoXG4gICAgcG9zaXRpb25zWzBdLFxuICAgIHNjcmF0Y2hDYXJ0b2dyYXBoaWMwLFxuICApO1xuICBsZXQgYzE7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICBjMSA9IGVsbGlwc29pZC5jYXJ0ZXNpYW5Ub0NhcnRvZ3JhcGhpYyhcbiAgICAgIHBvc2l0aW9uc1tpICsgMV0sXG4gICAgICBzY3JhdGNoQ2FydG9ncmFwaGljMSxcbiAgICApO1xuICAgIG51bVBvaW50cyArPSBQb2x5bGluZVBpcGVsaW5lLm51bWJlck9mUG9pbnRzUmh1bWJMaW5lKGMwLCBjMSwgZ3JhbnVsYXJpdHkpO1xuICAgIGMwID0gQ2FydG9ncmFwaGljLmNsb25lKGMxLCBzY3JhdGNoQ2FydG9ncmFwaGljMCk7XG4gIH1cblxuICBjb25zdCBhcnJheUxlbmd0aCA9IChudW1Qb2ludHMgKyAxKSAqIDM7XG4gIGNvbnN0IG5ld1Bvc2l0aW9ucyA9IG5ldyBBcnJheShhcnJheUxlbmd0aCk7XG4gIGxldCBvZmZzZXQgPSAwO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICBjb25zdCBwMCA9IHBvc2l0aW9uc1tpXTtcbiAgICBjb25zdCBwMSA9IHBvc2l0aW9uc1tpICsgMV07XG5cbiAgICBjb25zdCBoMCA9IGhhc0hlaWdodEFycmF5ID8gaGVpZ2h0W2ldIDogaGVpZ2h0O1xuICAgIGNvbnN0IGgxID0gaGFzSGVpZ2h0QXJyYXkgPyBoZWlnaHRbaSArIDFdIDogaGVpZ2h0O1xuXG4gICAgb2Zmc2V0ID0gZ2VuZXJhdGVDYXJ0ZXNpYW5SaHVtYkFyYyhcbiAgICAgIHAwLFxuICAgICAgcDEsXG4gICAgICBncmFudWxhcml0eSxcbiAgICAgIGVsbGlwc29pZCxcbiAgICAgIGgwLFxuICAgICAgaDEsXG4gICAgICBuZXdQb3NpdGlvbnMsXG4gICAgICBvZmZzZXQsXG4gICAgKTtcbiAgfVxuXG4gIHN1YmRpdmlkZUhlaWdodHNTY3JhdGNoQXJyYXkubGVuZ3RoID0gMDtcblxuICBjb25zdCBsYXN0UG9pbnQgPSBwb3NpdGlvbnNbbGVuZ3RoIC0gMV07XG4gIGNvbnN0IGNhcnRvID0gZWxsaXBzb2lkLmNhcnRlc2lhblRvQ2FydG9ncmFwaGljKGxhc3RQb2ludCwgY2FydG8xKTtcbiAgY2FydG8uaGVpZ2h0ID0gaGFzSGVpZ2h0QXJyYXkgPyBoZWlnaHRbbGVuZ3RoIC0gMV0gOiBoZWlnaHQ7XG4gIGNvbnN0IGNhcnQgPSBlbGxpcHNvaWQuY2FydG9ncmFwaGljVG9DYXJ0ZXNpYW4oY2FydG8sIGNhcnRlc2lhbik7XG4gIENhcnRlc2lhbjMucGFjayhjYXJ0LCBuZXdQb3NpdGlvbnMsIGFycmF5TGVuZ3RoIC0gMyk7XG5cbiAgcmV0dXJuIG5ld1Bvc2l0aW9ucztcbn07XG5cbi8qKlxuICogU3ViZGl2aWRlcyBwb2x5bGluZSBhbmQgcmFpc2VzIGFsbCBwb2ludHMgdG8gdGhlIHNwZWNpZmllZCBoZWlnaHQuIFJldHVybnMgYW4gYXJyYXkgb2YgbmV3IHtDYXJ0ZXNpYW4zfSBwb3NpdGlvbnMuXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiBAcGFyYW0ge0NhcnRlc2lhbjNbXX0gb3B0aW9ucy5wb3NpdGlvbnMgVGhlIGFycmF5IG9mIHR5cGUge0NhcnRlc2lhbjN9IHJlcHJlc2VudGluZyBwb3NpdGlvbnMuXG4gKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gW29wdGlvbnMuaGVpZ2h0PTAuMF0gQSBudW1iZXIgb3IgYXJyYXkgb2YgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIGhlaWdodHMgb2YgZWFjaCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5ncmFudWxhcml0eSA9IENlc2l1bU1hdGguUkFESUFOU19QRVJfREVHUkVFXSBUaGUgZGlzdGFuY2UsIGluIHJhZGlhbnMsIGJldHdlZW4gZWFjaCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlLiBEZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgcG9zaXRpb25zIGluIHRoZSBidWZmZXIuXG4gKiBAcGFyYW0ge0VsbGlwc29pZH0gW29wdGlvbnMuZWxsaXBzb2lkPUVsbGlwc29pZC5kZWZhdWx0XSBUaGUgZWxsaXBzb2lkIG9uIHdoaWNoIHRoZSBwb3NpdGlvbnMgbGllLlxuICogQHJldHVybnMge0NhcnRlc2lhbjNbXX0gQSBuZXcgYXJyYXkgb2YgY2FydGVzaWFuMyBwb3NpdGlvbnMgdGhhdCBoYXZlIGJlZW4gc3ViZGl2aWRlZCBhbmQgcmFpc2VkIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSBlbGxpcHNvaWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHBvc2l0aW9ucyA9IENlc2l1bS5DYXJ0ZXNpYW4zLmZyb21EZWdyZWVzQXJyYXkoW1xuICogICAtMTA1LjAsIDQwLjAsXG4gKiAgIC0xMDAuMCwgMzguMCxcbiAqICAgLTEwNS4wLCAzNS4wLFxuICogICAtMTAwLjAsIDMyLjBcbiAqIF0pO1xuICogY29uc3Qgc3VyZmFjZVBvc2l0aW9ucyA9IENlc2l1bS5Qb2x5bGluZVBpcGVsaW5lLmdlbmVyYXRlQ2FydGVzaWFuQXJjKHtcbiAqICAgcG9zaXRvbnM6IHBvc2l0aW9uc1xuICogfSk7XG4gKi9cblBvbHlsaW5lUGlwZWxpbmUuZ2VuZXJhdGVDYXJ0ZXNpYW5BcmMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBjb25zdCBudW1iZXJBcnJheSA9IFBvbHlsaW5lUGlwZWxpbmUuZ2VuZXJhdGVBcmMob3B0aW9ucyk7XG4gIGNvbnN0IHNpemUgPSBudW1iZXJBcnJheS5sZW5ndGggLyAzO1xuICBjb25zdCBuZXdQb3NpdGlvbnMgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgbmV3UG9zaXRpb25zW2ldID0gQ2FydGVzaWFuMy51bnBhY2sobnVtYmVyQXJyYXksIGkgKiAzKTtcbiAgfVxuICByZXR1cm4gbmV3UG9zaXRpb25zO1xufTtcblxuLyoqXG4gKiBTdWJkaXZpZGVzIHBvbHlsaW5lIGFuZCByYWlzZXMgYWxsIHBvaW50cyB0byB0aGUgc3BlY2lmaWVkIGhlaWdodCB1c2luZyBSaHVtYiBMaW5lcy4gUmV0dXJucyBhbiBhcnJheSBvZiBuZXcge0NhcnRlc2lhbjN9IHBvc2l0aW9ucy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIEBwYXJhbSB7Q2FydGVzaWFuM1tdfSBvcHRpb25zLnBvc2l0aW9ucyBUaGUgYXJyYXkgb2YgdHlwZSB7Q2FydGVzaWFuM30gcmVwcmVzZW50aW5nIHBvc2l0aW9ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBbb3B0aW9ucy5oZWlnaHQ9MC4wXSBBIG51bWJlciBvciBhcnJheSBvZiBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgaGVpZ2h0cyBvZiBlYWNoIHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmdyYW51bGFyaXR5ID0gQ2VzaXVtTWF0aC5SQURJQU5TX1BFUl9ERUdSRUVdIFRoZSBkaXN0YW5jZSwgaW4gcmFkaWFucywgYmV0d2VlbiBlYWNoIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUuIERldGVybWluZXMgdGhlIG51bWJlciBvZiBwb3NpdGlvbnMgaW4gdGhlIGJ1ZmZlci5cbiAqIEBwYXJhbSB7RWxsaXBzb2lkfSBbb3B0aW9ucy5lbGxpcHNvaWQ9RWxsaXBzb2lkLmRlZmF1bHRdIFRoZSBlbGxpcHNvaWQgb24gd2hpY2ggdGhlIHBvc2l0aW9ucyBsaWUuXG4gKiBAcmV0dXJucyB7Q2FydGVzaWFuM1tdfSBBIG5ldyBhcnJheSBvZiBjYXJ0ZXNpYW4zIHBvc2l0aW9ucyB0aGF0IGhhdmUgYmVlbiBzdWJkaXZpZGVkIGFuZCByYWlzZWQgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVsbGlwc29pZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcG9zaXRpb25zID0gQ2VzaXVtLkNhcnRlc2lhbjMuZnJvbURlZ3JlZXNBcnJheShbXG4gKiAgIC0xMDUuMCwgNDAuMCxcbiAqICAgLTEwMC4wLCAzOC4wLFxuICogICAtMTA1LjAsIDM1LjAsXG4gKiAgIC0xMDAuMCwgMzIuMFxuICogXSk7XG4gKiBjb25zdCBzdXJmYWNlUG9zaXRpb25zID0gQ2VzaXVtLlBvbHlsaW5lUGlwZWxpbmUuZ2VuZXJhdGVDYXJ0ZXNpYW5SaHVtYkFyYyh7XG4gKiAgIHBvc2l0b25zOiBwb3NpdGlvbnNcbiAqIH0pO1xuICovXG5Qb2x5bGluZVBpcGVsaW5lLmdlbmVyYXRlQ2FydGVzaWFuUmh1bWJBcmMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBjb25zdCBudW1iZXJBcnJheSA9IFBvbHlsaW5lUGlwZWxpbmUuZ2VuZXJhdGVSaHVtYkFyYyhvcHRpb25zKTtcbiAgY29uc3Qgc2l6ZSA9IG51bWJlckFycmF5Lmxlbmd0aCAvIDM7XG4gIGNvbnN0IG5ld1Bvc2l0aW9ucyA9IG5ldyBBcnJheShzaXplKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBuZXdQb3NpdGlvbnNbaV0gPSBDYXJ0ZXNpYW4zLnVucGFjayhudW1iZXJBcnJheSwgaSAqIDMpO1xuICB9XG4gIHJldHVybiBuZXdQb3NpdGlvbnM7XG59O1xuZXhwb3J0IGRlZmF1bHQgUG9seWxpbmVQaXBlbGluZTtcbiIsImltcG9ydCBCb3VuZGluZ1JlY3RhbmdsZSBmcm9tIFwiLi4vQ29yZS9Cb3VuZGluZ1JlY3RhbmdsZS5qc1wiO1xuaW1wb3J0IENhcnRlc2lhbjIgZnJvbSBcIi4uL0NvcmUvQ2FydGVzaWFuMi5qc1wiO1xuaW1wb3J0IENhcnRlc2lhbjMgZnJvbSBcIi4uL0NvcmUvQ2FydGVzaWFuMy5qc1wiO1xuaW1wb3J0IENhcnRlc2lhbjQgZnJvbSBcIi4uL0NvcmUvQ2FydGVzaWFuNC5qc1wiO1xuaW1wb3J0IENhcnRvZ3JhcGhpYyBmcm9tIFwiLi4vQ29yZS9DYXJ0b2dyYXBoaWMuanNcIjtcbmltcG9ydCBkZWZpbmVkIGZyb20gXCIuLi9Db3JlL2RlZmluZWQuanNcIjtcbmltcG9ydCBEZXZlbG9wZXJFcnJvciBmcm9tIFwiLi4vQ29yZS9EZXZlbG9wZXJFcnJvci5qc1wiO1xuaW1wb3J0IENlc2l1bU1hdGggZnJvbSBcIi4uL0NvcmUvTWF0aC5qc1wiO1xuaW1wb3J0IE1hdHJpeDQgZnJvbSBcIi4uL0NvcmUvTWF0cml4NC5qc1wiO1xuaW1wb3J0IE9ydGhvZ3JhcGhpY0ZydXN0dW0gZnJvbSBcIi4uL0NvcmUvT3J0aG9ncmFwaGljRnJ1c3R1bS5qc1wiO1xuaW1wb3J0IE9ydGhvZ3JhcGhpY09mZkNlbnRlckZydXN0dW0gZnJvbSBcIi4uL0NvcmUvT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bS5qc1wiO1xuaW1wb3J0IFRyYW5zZm9ybXMgZnJvbSBcIi4uL0NvcmUvVHJhbnNmb3Jtcy5qc1wiO1xuaW1wb3J0IFNjZW5lTW9kZSBmcm9tIFwiLi9TY2VuZU1vZGUuanNcIjtcblxuLyoqXG4gKiBGdW5jdGlvbnMgdGhhdCBkbyBzY2VuZS1kZXBlbmRlbnQgdHJhbnNmb3JtcyBiZXR3ZWVuIHJlbmRlcmluZy1yZWxhdGVkIGNvb3JkaW5hdGUgc3lzdGVtcy5cbiAqXG4gKiBAbmFtZXNwYWNlIFNjZW5lVHJhbnNmb3Jtc1xuICovXG5jb25zdCBTY2VuZVRyYW5zZm9ybXMgPSB7fTtcblxuY29uc3QgYWN0dWFsUG9zaXRpb25TY3JhdGNoID0gbmV3IENhcnRlc2lhbjQoMCwgMCwgMCwgMSk7XG5sZXQgcG9zaXRpb25DQyA9IG5ldyBDYXJ0ZXNpYW40KCk7XG5jb25zdCBzY3JhdGNoVmlld3BvcnQgPSBuZXcgQm91bmRpbmdSZWN0YW5nbGUoKTtcblxuY29uc3Qgc2NyYXRjaFdpbmRvd0Nvb3JkMCA9IG5ldyBDYXJ0ZXNpYW4yKCk7XG5jb25zdCBzY3JhdGNoV2luZG93Q29vcmQxID0gbmV3IENhcnRlc2lhbjIoKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgcG9zaXRpb24gaW4gd29ybGQgKFdHUzg0IG9yIGFsdGVybmF0aXZlIGVsbGlwc29pZCkgY29vcmRpbmF0ZXMgdG8gd2luZG93IGNvb3JkaW5hdGVzLiAgVGhpcyBpcyBjb21tb25seSB1c2VkIHRvIHBsYWNlIGFuXG4gKiBIVE1MIGVsZW1lbnQgYXQgdGhlIHNhbWUgc2NyZWVuIHBvc2l0aW9uIGFzIGFuIG9iamVjdCBpbiB0aGUgc2NlbmUuXG4gKlxuICogQHBhcmFtIHtTY2VuZX0gc2NlbmUgVGhlIHNjZW5lLlxuICogQHBhcmFtIHtDYXJ0ZXNpYW4zfSBwb3NpdGlvbiBUaGUgcG9zaXRpb24gaW4gd29ybGQgKFdHUzg0IG9yIGFsdGVybmF0aXZlIGVsbGlwc29pZCkgY29vcmRpbmF0ZXMuXG4gKiBAcGFyYW0ge0NhcnRlc2lhbjJ9IFtyZXN1bHRdIEFuIG9wdGlvbmFsIG9iamVjdCB0byByZXR1cm4gdGhlIGlucHV0IHBvc2l0aW9uIHRyYW5zZm9ybWVkIHRvIHdpbmRvdyBjb29yZGluYXRlcy5cbiAqIEByZXR1cm5zIHtDYXJ0ZXNpYW4yfHVuZGVmaW5lZH0gVGhlIG1vZGlmaWVkIHJlc3VsdCBwYXJhbWV0ZXIgb3IgYSBuZXcgQ2FydGVzaWFuMiBpbnN0YW5jZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZC4gIFRoaXMgbWF5IGJlIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gaWYgdGhlIGlucHV0IHBvc2l0aW9uIGlzIG5lYXIgdGhlIGNlbnRlciBvZiB0aGUgZWxsaXBzb2lkLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBPdXRwdXQgdGhlIHdpbmRvdyBwb3NpdGlvbiBvZiBsb25naXR1ZGUvbGF0aXR1ZGUgKDAsIDApIGV2ZXJ5IHRpbWUgdGhlIG1vdXNlIG1vdmVzLlxuICogY29uc3QgcG9zaXRpb24gPSBDZXNpdW0uQ2FydGVzaWFuMy5mcm9tRGVncmVlcygwLjAsIDAuMCk7XG4gKiBjb25zdCBoYW5kbGVyID0gbmV3IENlc2l1bS5TY3JlZW5TcGFjZUV2ZW50SGFuZGxlcihzY2VuZS5jYW52YXMpO1xuICogaGFuZGxlci5zZXRJbnB1dEFjdGlvbihmdW5jdGlvbihtb3ZlbWVudCkge1xuICogICAgIGNvbnNvbGUubG9nKENlc2l1bS5TY2VuZVRyYW5zZm9ybXMud29ybGRUb1dpbmRvd0Nvb3JkaW5hdGVzKHNjZW5lLCBwb3NpdGlvbikpO1xuICogfSwgQ2VzaXVtLlNjcmVlblNwYWNlRXZlbnRUeXBlLk1PVVNFX01PVkUpO1xuICovXG5TY2VuZVRyYW5zZm9ybXMud29ybGRUb1dpbmRvd0Nvb3JkaW5hdGVzID0gZnVuY3Rpb24gKHNjZW5lLCBwb3NpdGlvbiwgcmVzdWx0KSB7XG4gIHJldHVybiBTY2VuZVRyYW5zZm9ybXMud29ybGRXaXRoRXllT2Zmc2V0VG9XaW5kb3dDb29yZGluYXRlcyhcbiAgICBzY2VuZSxcbiAgICBwb3NpdGlvbixcbiAgICBDYXJ0ZXNpYW4zLlpFUk8sXG4gICAgcmVzdWx0LFxuICApO1xufTtcblxuY29uc3Qgc2NyYXRjaENhcnRlc2lhbjQgPSBuZXcgQ2FydGVzaWFuNCgpO1xuY29uc3Qgc2NyYXRjaEV5ZU9mZnNldCA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5cbmZ1bmN0aW9uIHdvcmxkVG9DbGlwKHBvc2l0aW9uLCBleWVPZmZzZXQsIGNhbWVyYSwgcmVzdWx0KSB7XG4gIGNvbnN0IHZpZXdNYXRyaXggPSBjYW1lcmEudmlld01hdHJpeDtcblxuICBjb25zdCBwb3NpdGlvbkVDID0gTWF0cml4NC5tdWx0aXBseUJ5VmVjdG9yKFxuICAgIHZpZXdNYXRyaXgsXG4gICAgQ2FydGVzaWFuNC5mcm9tRWxlbWVudHMoXG4gICAgICBwb3NpdGlvbi54LFxuICAgICAgcG9zaXRpb24ueSxcbiAgICAgIHBvc2l0aW9uLnosXG4gICAgICAxLFxuICAgICAgc2NyYXRjaENhcnRlc2lhbjQsXG4gICAgKSxcbiAgICBzY3JhdGNoQ2FydGVzaWFuNCxcbiAgKTtcblxuICBjb25zdCB6RXllT2Zmc2V0ID0gQ2FydGVzaWFuMy5tdWx0aXBseUNvbXBvbmVudHMoXG4gICAgZXllT2Zmc2V0LFxuICAgIENhcnRlc2lhbjMubm9ybWFsaXplKHBvc2l0aW9uRUMsIHNjcmF0Y2hFeWVPZmZzZXQpLFxuICAgIHNjcmF0Y2hFeWVPZmZzZXQsXG4gICk7XG4gIHBvc2l0aW9uRUMueCArPSBleWVPZmZzZXQueCArIHpFeWVPZmZzZXQueDtcbiAgcG9zaXRpb25FQy55ICs9IGV5ZU9mZnNldC55ICsgekV5ZU9mZnNldC55O1xuICBwb3NpdGlvbkVDLnogKz0gekV5ZU9mZnNldC56O1xuXG4gIHJldHVybiBNYXRyaXg0Lm11bHRpcGx5QnlWZWN0b3IoXG4gICAgY2FtZXJhLmZydXN0dW0ucHJvamVjdGlvbk1hdHJpeCxcbiAgICBwb3NpdGlvbkVDLFxuICAgIHJlc3VsdCxcbiAgKTtcbn1cblxuY29uc3Qgc2NyYXRjaE1heENhcnRvZ3JhcGhpYyA9IG5ldyBDYXJ0b2dyYXBoaWMoXG4gIE1hdGguUEksXG4gIENlc2l1bU1hdGguUElfT1ZFUl9UV08sXG4pO1xuY29uc3Qgc2NyYXRjaFByb2plY3RlZENhcnRlc2lhbiA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBzY3JhdGNoQ2FtZXJhUG9zaXRpb24gPSBuZXcgQ2FydGVzaWFuMygpO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblNjZW5lVHJhbnNmb3Jtcy53b3JsZFdpdGhFeWVPZmZzZXRUb1dpbmRvd0Nvb3JkaW5hdGVzID0gZnVuY3Rpb24gKFxuICBzY2VuZSxcbiAgcG9zaXRpb24sXG4gIGV5ZU9mZnNldCxcbiAgcmVzdWx0LFxuKSB7XG4gIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gIGlmICghZGVmaW5lZChzY2VuZSkpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXCJzY2VuZSBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgaWYgKCFkZWZpbmVkKHBvc2l0aW9uKSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcInBvc2l0aW9uIGlzIHJlcXVpcmVkLlwiKTtcbiAgfVxuICAvLz4+aW5jbHVkZUVuZCgnZGVidWcnKTtcblxuICAvLyBUcmFuc2Zvcm0gZm9yIDNELCAyRCwgb3IgQ29sdW1idXMgdmlld1xuICBjb25zdCBmcmFtZVN0YXRlID0gc2NlbmUuZnJhbWVTdGF0ZTtcbiAgY29uc3QgYWN0dWFsUG9zaXRpb24gPSBTY2VuZVRyYW5zZm9ybXMuY29tcHV0ZUFjdHVhbEVsbGlwc29pZFBvc2l0aW9uKFxuICAgIGZyYW1lU3RhdGUsXG4gICAgcG9zaXRpb24sXG4gICAgYWN0dWFsUG9zaXRpb25TY3JhdGNoLFxuICApO1xuXG4gIGlmICghZGVmaW5lZChhY3R1YWxQb3NpdGlvbikpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gQXNzdW1pbmcgdmlld3BvcnQgdGFrZXMgdXAgdGhlIGVudGlyZSBjYW52YXMuLi5cbiAgY29uc3QgY2FudmFzID0gc2NlbmUuY2FudmFzO1xuICBjb25zdCB2aWV3cG9ydCA9IHNjcmF0Y2hWaWV3cG9ydDtcbiAgdmlld3BvcnQueCA9IDA7XG4gIHZpZXdwb3J0LnkgPSAwO1xuICB2aWV3cG9ydC53aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgdmlld3BvcnQuaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcblxuICBjb25zdCBjYW1lcmEgPSBzY2VuZS5jYW1lcmE7XG4gIGxldCBjYW1lcmFDZW50ZXJlZCA9IGZhbHNlO1xuXG4gIGlmIChmcmFtZVN0YXRlLm1vZGUgPT09IFNjZW5lTW9kZS5TQ0VORTJEKSB7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHNjZW5lLm1hcFByb2plY3Rpb247XG4gICAgY29uc3QgbWF4Q2FydG9ncmFwaGljID0gc2NyYXRjaE1heENhcnRvZ3JhcGhpYztcbiAgICBjb25zdCBtYXhDb29yZCA9IHByb2plY3Rpb24ucHJvamVjdChcbiAgICAgIG1heENhcnRvZ3JhcGhpYyxcbiAgICAgIHNjcmF0Y2hQcm9qZWN0ZWRDYXJ0ZXNpYW4sXG4gICAgKTtcblxuICAgIGNvbnN0IGNhbWVyYVBvc2l0aW9uID0gQ2FydGVzaWFuMy5jbG9uZShcbiAgICAgIGNhbWVyYS5wb3NpdGlvbixcbiAgICAgIHNjcmF0Y2hDYW1lcmFQb3NpdGlvbixcbiAgICApO1xuICAgIGNvbnN0IGZydXN0dW0gPSBjYW1lcmEuZnJ1c3R1bS5jbG9uZSgpO1xuXG4gICAgY29uc3Qgdmlld3BvcnRUcmFuc2Zvcm1hdGlvbiA9IE1hdHJpeDQuY29tcHV0ZVZpZXdwb3J0VHJhbnNmb3JtYXRpb24oXG4gICAgICB2aWV3cG9ydCxcbiAgICAgIDAuMCxcbiAgICAgIDEuMCxcbiAgICAgIG5ldyBNYXRyaXg0KCksXG4gICAgKTtcbiAgICBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gY2FtZXJhLmZydXN0dW0ucHJvamVjdGlvbk1hdHJpeDtcblxuICAgIGNvbnN0IHggPSBjYW1lcmEucG9zaXRpb25XQy55O1xuICAgIGNvbnN0IGV5ZVBvaW50ID0gQ2FydGVzaWFuMy5mcm9tRWxlbWVudHMoXG4gICAgICBDZXNpdW1NYXRoLnNpZ24oeCkgKiBtYXhDb29yZC54IC0geCxcbiAgICAgIDAuMCxcbiAgICAgIC1jYW1lcmEucG9zaXRpb25XQy54LFxuICAgICk7XG4gICAgY29uc3Qgd2luZG93Q29vcmRpbmF0ZXMgPSBUcmFuc2Zvcm1zLnBvaW50VG9HTFdpbmRvd0Nvb3JkaW5hdGVzKFxuICAgICAgcHJvamVjdGlvbk1hdHJpeCxcbiAgICAgIHZpZXdwb3J0VHJhbnNmb3JtYXRpb24sXG4gICAgICBleWVQb2ludCxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgeCA9PT0gMC4wIHx8XG4gICAgICB3aW5kb3dDb29yZGluYXRlcy54IDw9IDAuMCB8fFxuICAgICAgd2luZG93Q29vcmRpbmF0ZXMueCA+PSBjYW52YXMuY2xpZW50V2lkdGhcbiAgICApIHtcbiAgICAgIGNhbWVyYUNlbnRlcmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHdpbmRvd0Nvb3JkaW5hdGVzLnggPiBjYW52YXMuY2xpZW50V2lkdGggKiAwLjUpIHtcbiAgICAgICAgdmlld3BvcnQud2lkdGggPSB3aW5kb3dDb29yZGluYXRlcy54O1xuXG4gICAgICAgIGNhbWVyYS5mcnVzdHVtLnJpZ2h0ID0gbWF4Q29vcmQueCAtIHg7XG5cbiAgICAgICAgcG9zaXRpb25DQyA9IHdvcmxkVG9DbGlwKGFjdHVhbFBvc2l0aW9uLCBleWVPZmZzZXQsIGNhbWVyYSwgcG9zaXRpb25DQyk7XG4gICAgICAgIFNjZW5lVHJhbnNmb3Jtcy5jbGlwVG9HTFdpbmRvd0Nvb3JkaW5hdGVzKFxuICAgICAgICAgIHZpZXdwb3J0LFxuICAgICAgICAgIHBvc2l0aW9uQ0MsXG4gICAgICAgICAgc2NyYXRjaFdpbmRvd0Nvb3JkMCxcbiAgICAgICAgKTtcblxuICAgICAgICB2aWV3cG9ydC54ICs9IHdpbmRvd0Nvb3JkaW5hdGVzLng7XG5cbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtY2FtZXJhLnBvc2l0aW9uLng7XG5cbiAgICAgICAgY29uc3QgcmlnaHQgPSBjYW1lcmEuZnJ1c3R1bS5yaWdodDtcbiAgICAgICAgY2FtZXJhLmZydXN0dW0ucmlnaHQgPSAtY2FtZXJhLmZydXN0dW0ubGVmdDtcbiAgICAgICAgY2FtZXJhLmZydXN0dW0ubGVmdCA9IC1yaWdodDtcblxuICAgICAgICBwb3NpdGlvbkNDID0gd29ybGRUb0NsaXAoYWN0dWFsUG9zaXRpb24sIGV5ZU9mZnNldCwgY2FtZXJhLCBwb3NpdGlvbkNDKTtcbiAgICAgICAgU2NlbmVUcmFuc2Zvcm1zLmNsaXBUb0dMV2luZG93Q29vcmRpbmF0ZXMoXG4gICAgICAgICAgdmlld3BvcnQsXG4gICAgICAgICAgcG9zaXRpb25DQyxcbiAgICAgICAgICBzY3JhdGNoV2luZG93Q29vcmQxLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlld3BvcnQueCArPSB3aW5kb3dDb29yZGluYXRlcy54O1xuICAgICAgICB2aWV3cG9ydC53aWR0aCAtPSB3aW5kb3dDb29yZGluYXRlcy54O1xuXG4gICAgICAgIGNhbWVyYS5mcnVzdHVtLmxlZnQgPSAtbWF4Q29vcmQueCAtIHg7XG5cbiAgICAgICAgcG9zaXRpb25DQyA9IHdvcmxkVG9DbGlwKGFjdHVhbFBvc2l0aW9uLCBleWVPZmZzZXQsIGNhbWVyYSwgcG9zaXRpb25DQyk7XG4gICAgICAgIFNjZW5lVHJhbnNmb3Jtcy5jbGlwVG9HTFdpbmRvd0Nvb3JkaW5hdGVzKFxuICAgICAgICAgIHZpZXdwb3J0LFxuICAgICAgICAgIHBvc2l0aW9uQ0MsXG4gICAgICAgICAgc2NyYXRjaFdpbmRvd0Nvb3JkMCxcbiAgICAgICAgKTtcblxuICAgICAgICB2aWV3cG9ydC54ID0gdmlld3BvcnQueCAtIHZpZXdwb3J0LndpZHRoO1xuXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLWNhbWVyYS5wb3NpdGlvbi54O1xuXG4gICAgICAgIGNvbnN0IGxlZnQgPSBjYW1lcmEuZnJ1c3R1bS5sZWZ0O1xuICAgICAgICBjYW1lcmEuZnJ1c3R1bS5sZWZ0ID0gLWNhbWVyYS5mcnVzdHVtLnJpZ2h0O1xuICAgICAgICBjYW1lcmEuZnJ1c3R1bS5yaWdodCA9IC1sZWZ0O1xuXG4gICAgICAgIHBvc2l0aW9uQ0MgPSB3b3JsZFRvQ2xpcChhY3R1YWxQb3NpdGlvbiwgZXllT2Zmc2V0LCBjYW1lcmEsIHBvc2l0aW9uQ0MpO1xuICAgICAgICBTY2VuZVRyYW5zZm9ybXMuY2xpcFRvR0xXaW5kb3dDb29yZGluYXRlcyhcbiAgICAgICAgICB2aWV3cG9ydCxcbiAgICAgICAgICBwb3NpdGlvbkNDLFxuICAgICAgICAgIHNjcmF0Y2hXaW5kb3dDb29yZDEsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIENhcnRlc2lhbjMuY2xvbmUoY2FtZXJhUG9zaXRpb24sIGNhbWVyYS5wb3NpdGlvbik7XG4gICAgICBjYW1lcmEuZnJ1c3R1bSA9IGZydXN0dW0uY2xvbmUoKTtcblxuICAgICAgcmVzdWx0ID0gQ2FydGVzaWFuMi5jbG9uZShzY3JhdGNoV2luZG93Q29vcmQwLCByZXN1bHQpO1xuICAgICAgaWYgKHJlc3VsdC54IDwgMC4wIHx8IHJlc3VsdC54ID4gY2FudmFzLmNsaWVudFdpZHRoKSB7XG4gICAgICAgIHJlc3VsdC54ID0gc2NyYXRjaFdpbmRvd0Nvb3JkMS54O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChmcmFtZVN0YXRlLm1vZGUgIT09IFNjZW5lTW9kZS5TQ0VORTJEIHx8IGNhbWVyYUNlbnRlcmVkKSB7XG4gICAgLy8gVmlldy1wcm9qZWN0aW9uIG1hdHJpeCB0byB0cmFuc2Zvcm0gZnJvbSB3b3JsZCBjb29yZGluYXRlcyB0byBjbGlwIGNvb3JkaW5hdGVzXG4gICAgcG9zaXRpb25DQyA9IHdvcmxkVG9DbGlwKGFjdHVhbFBvc2l0aW9uLCBleWVPZmZzZXQsIGNhbWVyYSwgcG9zaXRpb25DQyk7XG4gICAgaWYgKFxuICAgICAgcG9zaXRpb25DQy56IDwgMCAmJlxuICAgICAgIShjYW1lcmEuZnJ1c3R1bSBpbnN0YW5jZW9mIE9ydGhvZ3JhcGhpY0ZydXN0dW0pICYmXG4gICAgICAhKGNhbWVyYS5mcnVzdHVtIGluc3RhbmNlb2YgT3J0aG9ncmFwaGljT2ZmQ2VudGVyRnJ1c3R1bSlcbiAgICApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gU2NlbmVUcmFuc2Zvcm1zLmNsaXBUb0dMV2luZG93Q29vcmRpbmF0ZXMoXG4gICAgICB2aWV3cG9ydCxcbiAgICAgIHBvc2l0aW9uQ0MsXG4gICAgICByZXN1bHQsXG4gICAgKTtcbiAgfVxuXG4gIHJlc3VsdC55ID0gY2FudmFzLmNsaWVudEhlaWdodCAtIHJlc3VsdC55O1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgcG9zaXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZXMgdG8gZHJhd2luZyBidWZmZXIgY29vcmRpbmF0ZXMuICBUaGlzIG1heSBwcm9kdWNlIGRpZmZlcmVudFxuICogcmVzdWx0cyBmcm9tIFNjZW5lVHJhbnNmb3Jtcy53b3JsZFRvV2luZG93Q29vcmRpbmF0ZXMgd2hlbiB0aGUgYnJvd3NlciB6b29tIGlzIG5vdCAxMDAlLCBvciBvbiBoaWdoLURQSSBkaXNwbGF5cy5cbiAqXG4gKiBAcGFyYW0ge1NjZW5lfSBzY2VuZSBUaGUgc2NlbmUuXG4gKiBAcGFyYW0ge0NhcnRlc2lhbjN9IHBvc2l0aW9uIFRoZSBwb3NpdGlvbiBpbiB3b3JsZCAoV0dTODQgb3IgYWx0ZXJuYXRpdmUgZWxsaXBzb2lkKSBjb29yZGluYXRlcy5cbiAqIEBwYXJhbSB7Q2FydGVzaWFuMn0gW3Jlc3VsdF0gQW4gb3B0aW9uYWwgb2JqZWN0IHRvIHJldHVybiB0aGUgaW5wdXQgcG9zaXRpb24gdHJhbnNmb3JtZWQgdG8gd2luZG93IGNvb3JkaW5hdGVzLlxuICogQHJldHVybnMge0NhcnRlc2lhbjJ8dW5kZWZpbmVkfSBUaGUgbW9kaWZpZWQgcmVzdWx0IHBhcmFtZXRlciBvciBhIG5ldyBDYXJ0ZXNpYW4yIGluc3RhbmNlIGlmIG9uZSB3YXMgbm90IHByb3ZpZGVkLiAgVGhpcyBtYXkgYmUgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiB0aGUgaW5wdXQgcG9zaXRpb24gaXMgbmVhciB0aGUgY2VudGVyIG9mIHRoZSBlbGxpcHNvaWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIE91dHB1dCB0aGUgd2luZG93IHBvc2l0aW9uIG9mIGxvbmdpdHVkZS9sYXRpdHVkZSAoMCwgMCkgZXZlcnkgdGltZSB0aGUgbW91c2UgbW92ZXMuXG4gKiBjb25zdCBwb3NpdGlvbiA9IENlc2l1bS5DYXJ0ZXNpYW4zLmZyb21EZWdyZWVzKDAuMCwgMC4wKTtcbiAqIGNvbnN0IGhhbmRsZXIgPSBuZXcgQ2VzaXVtLlNjcmVlblNwYWNlRXZlbnRIYW5kbGVyKHNjZW5lLmNhbnZhcyk7XG4gKiBoYW5kbGVyLnNldElucHV0QWN0aW9uKGZ1bmN0aW9uKG1vdmVtZW50KSB7XG4gKiAgICAgY29uc29sZS5sb2coQ2VzaXVtLlNjZW5lVHJhbnNmb3Jtcy53b3JsZFRvRHJhd2luZ0J1ZmZlckNvb3JkaW5hdGVzKHNjZW5lLCBwb3NpdGlvbikpO1xuICogfSwgQ2VzaXVtLlNjcmVlblNwYWNlRXZlbnRUeXBlLk1PVVNFX01PVkUpO1xuICovXG5TY2VuZVRyYW5zZm9ybXMud29ybGRUb0RyYXdpbmdCdWZmZXJDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChcbiAgc2NlbmUsXG4gIHBvc2l0aW9uLFxuICByZXN1bHQsXG4pIHtcbiAgcmVzdWx0ID0gU2NlbmVUcmFuc2Zvcm1zLndvcmxkVG9XaW5kb3dDb29yZGluYXRlcyhzY2VuZSwgcG9zaXRpb24sIHJlc3VsdCk7XG4gIGlmICghZGVmaW5lZChyZXN1bHQpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBTY2VuZVRyYW5zZm9ybXMudHJhbnNmb3JtV2luZG93VG9EcmF3aW5nQnVmZmVyKHNjZW5lLCByZXN1bHQsIHJlc3VsdCk7XG59O1xuXG5jb25zdCBwcm9qZWN0ZWRQb3NpdGlvbiA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBwb3NpdGlvbkluQ2FydG9ncmFwaGljID0gbmV3IENhcnRvZ3JhcGhpYygpO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblNjZW5lVHJhbnNmb3Jtcy5jb21wdXRlQWN0dWFsRWxsaXBzb2lkUG9zaXRpb24gPSBmdW5jdGlvbiAoXG4gIGZyYW1lU3RhdGUsXG4gIHBvc2l0aW9uLFxuICByZXN1bHQsXG4pIHtcbiAgY29uc3QgbW9kZSA9IGZyYW1lU3RhdGUubW9kZTtcblxuICBpZiAobW9kZSA9PT0gU2NlbmVNb2RlLlNDRU5FM0QpIHtcbiAgICByZXR1cm4gQ2FydGVzaWFuMy5jbG9uZShwb3NpdGlvbiwgcmVzdWx0KTtcbiAgfVxuXG4gIGNvbnN0IHByb2plY3Rpb24gPSBmcmFtZVN0YXRlLm1hcFByb2plY3Rpb247XG4gIGNvbnN0IGNhcnRvZ3JhcGhpYyA9IHByb2plY3Rpb24uZWxsaXBzb2lkLmNhcnRlc2lhblRvQ2FydG9ncmFwaGljKFxuICAgIHBvc2l0aW9uLFxuICAgIHBvc2l0aW9uSW5DYXJ0b2dyYXBoaWMsXG4gICk7XG4gIGlmICghZGVmaW5lZChjYXJ0b2dyYXBoaWMpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByb2plY3Rpb24ucHJvamVjdChjYXJ0b2dyYXBoaWMsIHByb2plY3RlZFBvc2l0aW9uKTtcblxuICBpZiAobW9kZSA9PT0gU2NlbmVNb2RlLkNPTFVNQlVTX1ZJRVcpIHtcbiAgICByZXR1cm4gQ2FydGVzaWFuMy5mcm9tRWxlbWVudHMoXG4gICAgICBwcm9qZWN0ZWRQb3NpdGlvbi56LFxuICAgICAgcHJvamVjdGVkUG9zaXRpb24ueCxcbiAgICAgIHByb2plY3RlZFBvc2l0aW9uLnksXG4gICAgICByZXN1bHQsXG4gICAgKTtcbiAgfVxuXG4gIGlmIChtb2RlID09PSBTY2VuZU1vZGUuU0NFTkUyRCkge1xuICAgIHJldHVybiBDYXJ0ZXNpYW4zLmZyb21FbGVtZW50cyhcbiAgICAgIDAuMCxcbiAgICAgIHByb2plY3RlZFBvc2l0aW9uLngsXG4gICAgICBwcm9qZWN0ZWRQb3NpdGlvbi55LFxuICAgICAgcmVzdWx0LFxuICAgICk7XG4gIH1cblxuICAvLyBtb2RlID09PSBTY2VuZU1vZGUuTU9SUEhJTkdcbiAgY29uc3QgbW9ycGhUaW1lID0gZnJhbWVTdGF0ZS5tb3JwaFRpbWU7XG4gIHJldHVybiBDYXJ0ZXNpYW4zLmZyb21FbGVtZW50cyhcbiAgICBDZXNpdW1NYXRoLmxlcnAocHJvamVjdGVkUG9zaXRpb24ueiwgcG9zaXRpb24ueCwgbW9ycGhUaW1lKSxcbiAgICBDZXNpdW1NYXRoLmxlcnAocHJvamVjdGVkUG9zaXRpb24ueCwgcG9zaXRpb24ueSwgbW9ycGhUaW1lKSxcbiAgICBDZXNpdW1NYXRoLmxlcnAocHJvamVjdGVkUG9zaXRpb24ueSwgcG9zaXRpb24ueiwgbW9ycGhUaW1lKSxcbiAgICByZXN1bHQsXG4gICk7XG59O1xuXG5jb25zdCBwb3NpdGlvbk5EQyA9IG5ldyBDYXJ0ZXNpYW4zKCk7XG5jb25zdCBwb3NpdGlvbldDID0gbmV3IENhcnRlc2lhbjMoKTtcbmNvbnN0IHZpZXdwb3J0VHJhbnNmb3JtID0gbmV3IE1hdHJpeDQoKTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5TY2VuZVRyYW5zZm9ybXMuY2xpcFRvR0xXaW5kb3dDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChcbiAgdmlld3BvcnQsXG4gIHBvc2l0aW9uLFxuICByZXN1bHQsXG4pIHtcbiAgLy8gUGVyc3BlY3RpdmUgZGl2aWRlIHRvIHRyYW5zZm9ybSBmcm9tIGNsaXAgY29vcmRpbmF0ZXMgdG8gbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZXNcbiAgQ2FydGVzaWFuMy5kaXZpZGVCeVNjYWxhcihwb3NpdGlvbiwgcG9zaXRpb24udywgcG9zaXRpb25OREMpO1xuXG4gIC8vIFZpZXdwb3J0IHRyYW5zZm9ybSB0byB0cmFuc2Zvcm0gZnJvbSBjbGlwIGNvb3JkaW5hdGVzIHRvIHdpbmRvdyBjb29yZGluYXRlc1xuICBNYXRyaXg0LmNvbXB1dGVWaWV3cG9ydFRyYW5zZm9ybWF0aW9uKHZpZXdwb3J0LCAwLjAsIDEuMCwgdmlld3BvcnRUcmFuc2Zvcm0pO1xuICBNYXRyaXg0Lm11bHRpcGx5QnlQb2ludCh2aWV3cG9ydFRyYW5zZm9ybSwgcG9zaXRpb25OREMsIHBvc2l0aW9uV0MpO1xuXG4gIHJldHVybiBDYXJ0ZXNpYW4yLmZyb21DYXJ0ZXNpYW4zKHBvc2l0aW9uV0MsIHJlc3VsdCk7XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblNjZW5lVHJhbnNmb3Jtcy50cmFuc2Zvcm1XaW5kb3dUb0RyYXdpbmdCdWZmZXIgPSBmdW5jdGlvbiAoXG4gIHNjZW5lLFxuICB3aW5kb3dQb3NpdGlvbixcbiAgcmVzdWx0LFxuKSB7XG4gIGNvbnN0IGNhbnZhcyA9IHNjZW5lLmNhbnZhcztcbiAgY29uc3QgeFNjYWxlID0gc2NlbmUuZHJhd2luZ0J1ZmZlcldpZHRoIC8gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjb25zdCB5U2NhbGUgPSBzY2VuZS5kcmF3aW5nQnVmZmVySGVpZ2h0IC8gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgcmV0dXJuIENhcnRlc2lhbjIuZnJvbUVsZW1lbnRzKFxuICAgIHdpbmRvd1Bvc2l0aW9uLnggKiB4U2NhbGUsXG4gICAgd2luZG93UG9zaXRpb24ueSAqIHlTY2FsZSxcbiAgICByZXN1bHQsXG4gICk7XG59O1xuXG5jb25zdCBzY3JhdGNoTkRDID0gbmV3IENhcnRlc2lhbjQoKTtcbmNvbnN0IHNjcmF0Y2hXb3JsZENvb3JkcyA9IG5ldyBDYXJ0ZXNpYW40KCk7XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuU2NlbmVUcmFuc2Zvcm1zLmRyYXdpbmdCdWZmZXJUb1dvcmxkQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoXG4gIHNjZW5lLFxuICBkcmF3aW5nQnVmZmVyUG9zaXRpb24sXG4gIGRlcHRoLFxuICByZXN1bHQsXG4pIHtcbiAgY29uc3QgY29udGV4dCA9IHNjZW5lLmNvbnRleHQ7XG4gIGNvbnN0IHVuaWZvcm1TdGF0ZSA9IGNvbnRleHQudW5pZm9ybVN0YXRlO1xuXG4gIGNvbnN0IGN1cnJlbnRGcnVzdHVtID0gdW5pZm9ybVN0YXRlLmN1cnJlbnRGcnVzdHVtO1xuICBjb25zdCBuZWFyID0gY3VycmVudEZydXN0dW0ueDtcbiAgY29uc3QgZmFyID0gY3VycmVudEZydXN0dW0ueTtcblxuICBpZiAoc2NlbmUuZnJhbWVTdGF0ZS51c2VMb2dEZXB0aCkge1xuICAgIC8vIHRyYW5zZm9ybWluZyBsb2dhcml0aG1pYyBkZXB0aCBvZiBmb3JtXG4gICAgLy8gbG9nMih6ICsgMSkgLyBsb2cyKCBmYXIgKyAxKTtcbiAgICAvLyB0byBwZXJzcGVjdGl2ZSBmb3JtXG4gICAgLy8gKGZhciAtIGZhciAqIG5lYXIgLyB6KSAvIChmYXIgLSBuZWFyKVxuICAgIGNvbnN0IGxvZzJEZXB0aCA9IGRlcHRoICogdW5pZm9ybVN0YXRlLmxvZzJGYXJEZXB0aEZyb21OZWFyUGx1c09uZTtcbiAgICBjb25zdCBkZXB0aEZyb21OZWFyID0gTWF0aC5wb3coMi4wLCBsb2cyRGVwdGgpIC0gMS4wO1xuICAgIGRlcHRoID0gKGZhciAqICgxLjAgLSBuZWFyIC8gKGRlcHRoRnJvbU5lYXIgKyBuZWFyKSkpIC8gKGZhciAtIG5lYXIpO1xuICB9XG5cbiAgY29uc3Qgdmlld3BvcnQgPSBzY2VuZS52aWV3LnBhc3NTdGF0ZS52aWV3cG9ydDtcbiAgY29uc3QgbmRjID0gQ2FydGVzaWFuNC5jbG9uZShDYXJ0ZXNpYW40LlVOSVRfVywgc2NyYXRjaE5EQyk7XG4gIG5kYy54ID0gKChkcmF3aW5nQnVmZmVyUG9zaXRpb24ueCAtIHZpZXdwb3J0LngpIC8gdmlld3BvcnQud2lkdGgpICogMi4wIC0gMS4wO1xuICBuZGMueSA9XG4gICAgKChkcmF3aW5nQnVmZmVyUG9zaXRpb24ueSAtIHZpZXdwb3J0LnkpIC8gdmlld3BvcnQuaGVpZ2h0KSAqIDIuMCAtIDEuMDtcbiAgbmRjLnogPSBkZXB0aCAqIDIuMCAtIDEuMDtcbiAgbmRjLncgPSAxLjA7XG5cbiAgbGV0IHdvcmxkQ29vcmRzO1xuICBsZXQgZnJ1c3R1bSA9IHNjZW5lLmNhbWVyYS5mcnVzdHVtO1xuICBpZiAoIWRlZmluZWQoZnJ1c3R1bS5mb3Z5KSkge1xuICAgIGNvbnN0IG9mZkNlbnRlckZydXN0dW0gPSBmcnVzdHVtLm9mZkNlbnRlckZydXN0dW07XG4gICAgaWYgKGRlZmluZWQob2ZmQ2VudGVyRnJ1c3R1bSkpIHtcbiAgICAgIGZydXN0dW0gPSBvZmZDZW50ZXJGcnVzdHVtO1xuICAgIH1cbiAgICB3b3JsZENvb3JkcyA9IHNjcmF0Y2hXb3JsZENvb3JkcztcbiAgICB3b3JsZENvb3Jkcy54ID1cbiAgICAgIChuZGMueCAqIChmcnVzdHVtLnJpZ2h0IC0gZnJ1c3R1bS5sZWZ0KSArIGZydXN0dW0ubGVmdCArIGZydXN0dW0ucmlnaHQpICpcbiAgICAgIDAuNTtcbiAgICB3b3JsZENvb3Jkcy55ID1cbiAgICAgIChuZGMueSAqIChmcnVzdHVtLnRvcCAtIGZydXN0dW0uYm90dG9tKSArIGZydXN0dW0uYm90dG9tICsgZnJ1c3R1bS50b3ApICpcbiAgICAgIDAuNTtcbiAgICB3b3JsZENvb3Jkcy56ID0gKG5kYy56ICogKG5lYXIgLSBmYXIpIC0gbmVhciAtIGZhcikgKiAwLjU7XG4gICAgd29ybGRDb29yZHMudyA9IDEuMDtcblxuICAgIHdvcmxkQ29vcmRzID0gTWF0cml4NC5tdWx0aXBseUJ5VmVjdG9yKFxuICAgICAgdW5pZm9ybVN0YXRlLmludmVyc2VWaWV3LFxuICAgICAgd29ybGRDb29yZHMsXG4gICAgICB3b3JsZENvb3JkcyxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHdvcmxkQ29vcmRzID0gTWF0cml4NC5tdWx0aXBseUJ5VmVjdG9yKFxuICAgICAgdW5pZm9ybVN0YXRlLmludmVyc2VWaWV3UHJvamVjdGlvbixcbiAgICAgIG5kYyxcbiAgICAgIHNjcmF0Y2hXb3JsZENvb3JkcyxcbiAgICApO1xuXG4gICAgLy8gUmV2ZXJzZSBwZXJzcGVjdGl2ZSBkaXZpZGVcbiAgICBjb25zdCB3ID0gMS4wIC8gd29ybGRDb29yZHMudztcbiAgICBDYXJ0ZXNpYW4zLm11bHRpcGx5QnlTY2FsYXIod29ybGRDb29yZHMsIHcsIHdvcmxkQ29vcmRzKTtcbiAgfVxuICByZXR1cm4gQ2FydGVzaWFuMy5mcm9tQ2FydGVzaWFuNCh3b3JsZENvb3JkcywgcmVzdWx0KTtcbn07XG5leHBvcnQgZGVmYXVsdCBTY2VuZVRyYW5zZm9ybXM7XG4iLCJpbXBvcnQgZGVmaW5lZCBmcm9tIFwiLi9kZWZpbmVkLmpzXCI7XG5pbXBvcnQgRGV2ZWxvcGVyRXJyb3IgZnJvbSBcIi4vRGV2ZWxvcGVyRXJyb3IuanNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2NhbGFyIHZhbHVlJ3MgbG93ZXIgYW5kIHVwcGVyIGJvdW5kIGF0IGEgbmVhciBkaXN0YW5jZSBhbmQgZmFyIGRpc3RhbmNlIGluIGV5ZSBzcGFjZS5cbiAqIEBhbGlhcyBOZWFyRmFyU2NhbGFyXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW25lYXI9MC4wXSBUaGUgbG93ZXIgYm91bmQgb2YgdGhlIGNhbWVyYSByYW5nZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbmVhclZhbHVlPTAuMF0gVGhlIHZhbHVlIGF0IHRoZSBsb3dlciBib3VuZCBvZiB0aGUgY2FtZXJhIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtmYXI9MS4wXSBUaGUgdXBwZXIgYm91bmQgb2YgdGhlIGNhbWVyYSByYW5nZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZmFyVmFsdWU9MC4wXSBUaGUgdmFsdWUgYXQgdGhlIHVwcGVyIGJvdW5kIG9mIHRoZSBjYW1lcmEgcmFuZ2UuXG4gKlxuICogQHNlZSBQYWNrYWJsZVxuICovXG5mdW5jdGlvbiBOZWFyRmFyU2NhbGFyKG5lYXIsIG5lYXJWYWx1ZSwgZmFyLCBmYXJWYWx1ZSkge1xuICAvKipcbiAgICogVGhlIGxvd2VyIGJvdW5kIG9mIHRoZSBjYW1lcmEgcmFuZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDAuMFxuICAgKi9cbiAgdGhpcy5uZWFyID0gbmVhciA/PyAwLjA7XG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgYXQgdGhlIGxvd2VyIGJvdW5kIG9mIHRoZSBjYW1lcmEgcmFuZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDAuMFxuICAgKi9cbiAgdGhpcy5uZWFyVmFsdWUgPSBuZWFyVmFsdWUgPz8gMC4wO1xuICAvKipcbiAgICogVGhlIHVwcGVyIGJvdW5kIG9mIHRoZSBjYW1lcmEgcmFuZ2UuXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDEuMFxuICAgKi9cbiAgdGhpcy5mYXIgPSBmYXIgPz8gMS4wO1xuICAvKipcbiAgICogVGhlIHZhbHVlIGF0IHRoZSB1cHBlciBib3VuZCBvZiB0aGUgY2FtZXJhIHJhbmdlLlxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwLjBcbiAgICovXG4gIHRoaXMuZmFyVmFsdWUgPSBmYXJWYWx1ZSA/PyAwLjA7XG59XG5cbi8qKlxuICogRHVwbGljYXRlcyBhIE5lYXJGYXJTY2FsYXIgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtOZWFyRmFyU2NhbGFyfSBuZWFyRmFyU2NhbGFyIFRoZSBOZWFyRmFyU2NhbGFyIHRvIGR1cGxpY2F0ZS5cbiAqIEBwYXJhbSB7TmVhckZhclNjYWxhcn0gW3Jlc3VsdF0gVGhlIG9iamVjdCBvbnRvIHdoaWNoIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gKiBAcmV0dXJucyB7TmVhckZhclNjYWxhcn0gVGhlIG1vZGlmaWVkIHJlc3VsdCBwYXJhbWV0ZXIgb3IgYSBuZXcgTmVhckZhclNjYWxhciBpbnN0YW5jZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZC4gKFJldHVybnMgdW5kZWZpbmVkIGlmIG5lYXJGYXJTY2FsYXIgaXMgdW5kZWZpbmVkKVxuICovXG5OZWFyRmFyU2NhbGFyLmNsb25lID0gZnVuY3Rpb24gKG5lYXJGYXJTY2FsYXIsIHJlc3VsdCkge1xuICBpZiAoIWRlZmluZWQobmVhckZhclNjYWxhcikpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFkZWZpbmVkKHJlc3VsdCkpIHtcbiAgICByZXR1cm4gbmV3IE5lYXJGYXJTY2FsYXIoXG4gICAgICBuZWFyRmFyU2NhbGFyLm5lYXIsXG4gICAgICBuZWFyRmFyU2NhbGFyLm5lYXJWYWx1ZSxcbiAgICAgIG5lYXJGYXJTY2FsYXIuZmFyLFxuICAgICAgbmVhckZhclNjYWxhci5mYXJWYWx1ZSxcbiAgICApO1xuICB9XG5cbiAgcmVzdWx0Lm5lYXIgPSBuZWFyRmFyU2NhbGFyLm5lYXI7XG4gIHJlc3VsdC5uZWFyVmFsdWUgPSBuZWFyRmFyU2NhbGFyLm5lYXJWYWx1ZTtcbiAgcmVzdWx0LmZhciA9IG5lYXJGYXJTY2FsYXIuZmFyO1xuICByZXN1bHQuZmFyVmFsdWUgPSBuZWFyRmFyU2NhbGFyLmZhclZhbHVlO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHVzZWQgdG8gcGFjayB0aGUgb2JqZWN0IGludG8gYW4gYXJyYXkuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5OZWFyRmFyU2NhbGFyLnBhY2tlZExlbmd0aCA9IDQ7XG5cbi8qKlxuICogU3RvcmVzIHRoZSBwcm92aWRlZCBpbnN0YW5jZSBpbnRvIHRoZSBwcm92aWRlZCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge05lYXJGYXJTY2FsYXJ9IHZhbHVlIFRoZSB2YWx1ZSB0byBwYWNrLlxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXkgVGhlIGFycmF5IHRvIHBhY2sgaW50by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRpbmdJbmRleD0wXSBUaGUgaW5kZXggaW50byB0aGUgYXJyYXkgYXQgd2hpY2ggdG8gc3RhcnQgcGFja2luZyB0aGUgZWxlbWVudHMuXG4gKlxuICogQHJldHVybnMge251bWJlcltdfSBUaGUgYXJyYXkgdGhhdCB3YXMgcGFja2VkIGludG9cbiAqL1xuTmVhckZhclNjYWxhci5wYWNrID0gZnVuY3Rpb24gKHZhbHVlLCBhcnJheSwgc3RhcnRpbmdJbmRleCkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwidmFsdWUgaXMgcmVxdWlyZWRcIik7XG4gIH1cbiAgaWYgKCFkZWZpbmVkKGFycmF5KSkge1xuICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcImFycmF5IGlzIHJlcXVpcmVkXCIpO1xuICB9XG4gIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuXG4gIHN0YXJ0aW5nSW5kZXggPSBzdGFydGluZ0luZGV4ID8/IDA7XG5cbiAgYXJyYXlbc3RhcnRpbmdJbmRleCsrXSA9IHZhbHVlLm5lYXI7XG4gIGFycmF5W3N0YXJ0aW5nSW5kZXgrK10gPSB2YWx1ZS5uZWFyVmFsdWU7XG4gIGFycmF5W3N0YXJ0aW5nSW5kZXgrK10gPSB2YWx1ZS5mYXI7XG4gIGFycmF5W3N0YXJ0aW5nSW5kZXhdID0gdmFsdWUuZmFyVmFsdWU7XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYW4gaW5zdGFuY2UgZnJvbSBhIHBhY2tlZCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcltdfSBhcnJheSBUaGUgcGFja2VkIGFycmF5LlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydGluZ0luZGV4PTBdIFRoZSBzdGFydGluZyBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBiZSB1bnBhY2tlZC5cbiAqIEBwYXJhbSB7TmVhckZhclNjYWxhcn0gW3Jlc3VsdF0gVGhlIG9iamVjdCBpbnRvIHdoaWNoIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gKiBAcmV0dXJucyB7TmVhckZhclNjYWxhcn0gVGhlIG1vZGlmaWVkIHJlc3VsdCBwYXJhbWV0ZXIgb3IgYSBuZXcgTmVhckZhclNjYWxhciBpbnN0YW5jZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZC5cbiAqL1xuTmVhckZhclNjYWxhci51bnBhY2sgPSBmdW5jdGlvbiAoYXJyYXksIHN0YXJ0aW5nSW5kZXgsIHJlc3VsdCkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBpZiAoIWRlZmluZWQoYXJyYXkpKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiYXJyYXkgaXMgcmVxdWlyZWRcIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgc3RhcnRpbmdJbmRleCA9IHN0YXJ0aW5nSW5kZXggPz8gMDtcblxuICBpZiAoIWRlZmluZWQocmVzdWx0KSkge1xuICAgIHJlc3VsdCA9IG5ldyBOZWFyRmFyU2NhbGFyKCk7XG4gIH1cbiAgcmVzdWx0Lm5lYXIgPSBhcnJheVtzdGFydGluZ0luZGV4KytdO1xuICByZXN1bHQubmVhclZhbHVlID0gYXJyYXlbc3RhcnRpbmdJbmRleCsrXTtcbiAgcmVzdWx0LmZhciA9IGFycmF5W3N0YXJ0aW5nSW5kZXgrK107XG4gIHJlc3VsdC5mYXJWYWx1ZSA9IGFycmF5W3N0YXJ0aW5nSW5kZXhdO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgcHJvdmlkZWQgTmVhckZhclNjYWxhciBhbmQgcmV0dXJucyA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGV5IGFyZSBlcXVhbCxcbiAqIDxjb2RlPmZhbHNlPC9jb2RlPiBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtOZWFyRmFyU2NhbGFyfSBbbGVmdF0gVGhlIGZpcnN0IE5lYXJGYXJTY2FsYXIuXG4gKiBAcGFyYW0ge05lYXJGYXJTY2FsYXJ9IFtyaWdodF0gVGhlIHNlY29uZCBOZWFyRmFyU2NhbGFyLlxuICogQHJldHVybnMge2Jvb2xlYW59IDxjb2RlPnRydWU8L2NvZGU+IGlmIGxlZnQgYW5kIHJpZ2h0IGFyZSBlcXVhbDsgb3RoZXJ3aXNlIDxjb2RlPmZhbHNlPC9jb2RlPi5cbiAqL1xuTmVhckZhclNjYWxhci5lcXVhbHMgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIChcbiAgICBsZWZ0ID09PSByaWdodCB8fFxuICAgIChkZWZpbmVkKGxlZnQpICYmXG4gICAgICBkZWZpbmVkKHJpZ2h0KSAmJlxuICAgICAgbGVmdC5uZWFyID09PSByaWdodC5uZWFyICYmXG4gICAgICBsZWZ0Lm5lYXJWYWx1ZSA9PT0gcmlnaHQubmVhclZhbHVlICYmXG4gICAgICBsZWZ0LmZhciA9PT0gcmlnaHQuZmFyICYmXG4gICAgICBsZWZ0LmZhclZhbHVlID09PSByaWdodC5mYXJWYWx1ZSlcbiAgKTtcbn07XG5cbi8qKlxuICogRHVwbGljYXRlcyB0aGlzIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7TmVhckZhclNjYWxhcn0gW3Jlc3VsdF0gVGhlIG9iamVjdCBvbnRvIHdoaWNoIHRvIHN0b3JlIHRoZSByZXN1bHQuXG4gKiBAcmV0dXJucyB7TmVhckZhclNjYWxhcn0gVGhlIG1vZGlmaWVkIHJlc3VsdCBwYXJhbWV0ZXIgb3IgYSBuZXcgTmVhckZhclNjYWxhciBpbnN0YW5jZSBpZiBvbmUgd2FzIG5vdCBwcm92aWRlZC5cbiAqL1xuTmVhckZhclNjYWxhci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gIHJldHVybiBOZWFyRmFyU2NhbGFyLmNsb25lKHRoaXMsIHJlc3VsdCk7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoaXMgaW5zdGFuY2UgdG8gdGhlIHByb3ZpZGVkIE5lYXJGYXJTY2FsYXIgYW5kIHJldHVybnMgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhleSBhcmUgZXF1YWwsXG4gKiA8Y29kZT5mYWxzZTwvY29kZT4gb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7TmVhckZhclNjYWxhcn0gW3JpZ2h0XSBUaGUgcmlnaHQgaGFuZCBzaWRlIE5lYXJGYXJTY2FsYXIuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gPGNvZGU+dHJ1ZTwvY29kZT4gaWYgbGVmdCBhbmQgcmlnaHQgYXJlIGVxdWFsOyBvdGhlcndpc2UgPGNvZGU+ZmFsc2U8L2NvZGU+LlxuICovXG5OZWFyRmFyU2NhbGFyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAocmlnaHQpIHtcbiAgcmV0dXJuIE5lYXJGYXJTY2FsYXIuZXF1YWxzKHRoaXMsIHJpZ2h0KTtcbn07XG5leHBvcnQgZGVmYXVsdCBOZWFyRmFyU2NhbGFyO1xuIiwiaW1wb3J0IENoZWNrIGZyb20gXCIuLi9Db3JlL0NoZWNrLmpzXCI7XG5pbXBvcnQgQ29tcG9uZW50RGF0YXR5cGUgZnJvbSBcIi4uL0NvcmUvQ29tcG9uZW50RGF0YXR5cGUuanNcIjtcbmltcG9ydCBkZWZpbmVkIGZyb20gXCIuLi9Db3JlL2RlZmluZWQuanNcIjtcbmltcG9ydCBkZXN0cm95T2JqZWN0IGZyb20gXCIuLi9Db3JlL2Rlc3Ryb3lPYmplY3QuanNcIjtcbmltcG9ydCBEZXZlbG9wZXJFcnJvciBmcm9tIFwiLi4vQ29yZS9EZXZlbG9wZXJFcnJvci5qc1wiO1xuaW1wb3J0IENlc2l1bU1hdGggZnJvbSBcIi4uL0NvcmUvTWF0aC5qc1wiO1xuaW1wb3J0IEJ1ZmZlciBmcm9tIFwiLi9CdWZmZXIuanNcIjtcbmltcG9ydCBCdWZmZXJVc2FnZSBmcm9tIFwiLi9CdWZmZXJVc2FnZS5qc1wiO1xuaW1wb3J0IFZlcnRleEFycmF5IGZyb20gXCIuL1ZlcnRleEFycmF5LmpzXCI7XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gVmVydGV4QXJyYXlGYWNhZGUoY29udGV4dCwgYXR0cmlidXRlcywgc2l6ZUluVmVydGljZXMsIGluc3RhbmNlZCkge1xuICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICBDaGVjay5kZWZpbmVkKFwiY29udGV4dFwiLCBjb250ZXh0KTtcbiAgaWYgKCFhdHRyaWJ1dGVzIHx8IGF0dHJpYnV0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFwiQXQgbGVhc3Qgb25lIGF0dHJpYnV0ZSBpcyByZXF1aXJlZC5cIik7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgY29uc3QgYXR0cnMgPSBWZXJ0ZXhBcnJheUZhY2FkZS5fdmVyaWZ5QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcbiAgc2l6ZUluVmVydGljZXMgPSBzaXplSW5WZXJ0aWNlcyA/PyAwO1xuICBjb25zdCBwcmVjcmVhdGVkQXR0cmlidXRlcyA9IFtdO1xuICBjb25zdCBhdHRyaWJ1dGVzQnlVc2FnZSA9IHt9O1xuICBsZXQgYXR0cmlidXRlc0ZvclVzYWdlO1xuICBsZXQgdXNhZ2U7XG5cbiAgLy8gQnVja2V0IHRoZSBhdHRyaWJ1dGVzIGJ5IHVzYWdlLlxuICBjb25zdCBsZW5ndGggPSBhdHRycy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyc1tpXTtcblxuICAgIC8vIElmIHRoZSBhdHRyaWJ1dGUgYWxyZWFkeSBoYXMgYSB2ZXJ0ZXggYnVmZmVyLCB3ZSBkbyBub3QgbmVlZFxuICAgIC8vIHRvIG1hbmFnZSBhIHZlcnRleCBidWZmZXIgb3IgdHlwZWQgYXJyYXkgZm9yIGl0LlxuICAgIGlmIChhdHRyaWJ1dGUudmVydGV4QnVmZmVyKSB7XG4gICAgICBwcmVjcmVhdGVkQXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB1c2FnZSA9IGF0dHJpYnV0ZS51c2FnZTtcbiAgICBhdHRyaWJ1dGVzRm9yVXNhZ2UgPSBhdHRyaWJ1dGVzQnlVc2FnZVt1c2FnZV07XG4gICAgaWYgKCFkZWZpbmVkKGF0dHJpYnV0ZXNGb3JVc2FnZSkpIHtcbiAgICAgIGF0dHJpYnV0ZXNGb3JVc2FnZSA9IGF0dHJpYnV0ZXNCeVVzYWdlW3VzYWdlXSA9IFtdO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZXNGb3JVc2FnZS5wdXNoKGF0dHJpYnV0ZSk7XG4gIH1cblxuICAvLyBBIGZ1bmN0aW9uIHRvIHNvcnQgYXR0cmlidXRlcyBieSB0aGUgc2l6ZSBvZiB0aGVpciBjb21wb25lbnRzLiAgRnJvbSBsZWZ0IHRvIHJpZ2h0LCBhIHZlcnRleFxuICAvLyBzdG9yZXMgZmxvYXRzLCBzaG9ydHMsIGFuZCB0aGVuIGJ5dGVzLlxuICBmdW5jdGlvbiBjb21wYXJlKGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIENvbXBvbmVudERhdGF0eXBlLmdldFNpemVJbkJ5dGVzKHJpZ2h0LmNvbXBvbmVudERhdGF0eXBlKSAtXG4gICAgICBDb21wb25lbnREYXRhdHlwZS5nZXRTaXplSW5CeXRlcyhsZWZ0LmNvbXBvbmVudERhdGF0eXBlKVxuICAgICk7XG4gIH1cblxuICB0aGlzLl9hbGxCdWZmZXJzID0gW107XG5cbiAgZm9yICh1c2FnZSBpbiBhdHRyaWJ1dGVzQnlVc2FnZSkge1xuICAgIGlmIChhdHRyaWJ1dGVzQnlVc2FnZS5oYXNPd25Qcm9wZXJ0eSh1c2FnZSkpIHtcbiAgICAgIGF0dHJpYnV0ZXNGb3JVc2FnZSA9IGF0dHJpYnV0ZXNCeVVzYWdlW3VzYWdlXTtcblxuICAgICAgYXR0cmlidXRlc0ZvclVzYWdlLnNvcnQoY29tcGFyZSk7XG4gICAgICBjb25zdCB2ZXJ0ZXhTaXplSW5CeXRlcyA9XG4gICAgICAgIFZlcnRleEFycmF5RmFjYWRlLl92ZXJ0ZXhTaXplSW5CeXRlcyhhdHRyaWJ1dGVzRm9yVXNhZ2UpO1xuXG4gICAgICBjb25zdCBidWZmZXJVc2FnZSA9IGF0dHJpYnV0ZXNGb3JVc2FnZVswXS51c2FnZTtcblxuICAgICAgY29uc3QgYnVmZmVyID0ge1xuICAgICAgICB2ZXJ0ZXhTaXplSW5CeXRlczogdmVydGV4U2l6ZUluQnl0ZXMsXG4gICAgICAgIHZlcnRleEJ1ZmZlcjogdW5kZWZpbmVkLFxuICAgICAgICB1c2FnZTogYnVmZmVyVXNhZ2UsXG4gICAgICAgIG5lZWRzQ29tbWl0OiBmYWxzZSxcbiAgICAgICAgYXJyYXlCdWZmZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgYXJyYXlWaWV3czogVmVydGV4QXJyYXlGYWNhZGUuX2NyZWF0ZUFycmF5Vmlld3MoXG4gICAgICAgICAgYXR0cmlidXRlc0ZvclVzYWdlLFxuICAgICAgICAgIHZlcnRleFNpemVJbkJ5dGVzLFxuICAgICAgICApLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fYWxsQnVmZmVycy5wdXNoKGJ1ZmZlcik7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fc2l6ZSA9IDA7XG4gIHRoaXMuX2luc3RhbmNlZCA9IGluc3RhbmNlZCA/PyBmYWxzZTtcblxuICB0aGlzLl9wcmVjcmVhdGVkID0gcHJlY3JlYXRlZEF0dHJpYnV0ZXM7XG4gIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXG4gIHRoaXMud3JpdGVycyA9IHVuZGVmaW5lZDtcbiAgdGhpcy52YSA9IHVuZGVmaW5lZDtcblxuICB0aGlzLnJlc2l6ZShzaXplSW5WZXJ0aWNlcyk7XG59XG5WZXJ0ZXhBcnJheUZhY2FkZS5fdmVyaWZ5QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XG4gIGNvbnN0IGF0dHJzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcblxuICAgIGNvbnN0IGF0dHIgPSB7XG4gICAgICBpbmRleDogYXR0cmlidXRlLmluZGV4ID8/IGksXG4gICAgICBlbmFibGVkOiBhdHRyaWJ1dGUuZW5hYmxlZCA/PyB0cnVlLFxuICAgICAgY29tcG9uZW50c1BlckF0dHJpYnV0ZTogYXR0cmlidXRlLmNvbXBvbmVudHNQZXJBdHRyaWJ1dGUsXG4gICAgICBjb21wb25lbnREYXRhdHlwZTogYXR0cmlidXRlLmNvbXBvbmVudERhdGF0eXBlID8/IENvbXBvbmVudERhdGF0eXBlLkZMT0FULFxuICAgICAgbm9ybWFsaXplOiBhdHRyaWJ1dGUubm9ybWFsaXplID8/IGZhbHNlLFxuXG4gICAgICAvLyBUaGVyZSB3aWxsIGJlIGVpdGhlciBhIHZlcnRleEJ1ZmZlciBvciBhbiBbb3B0aW9uYWxdIHVzYWdlLlxuICAgICAgdmVydGV4QnVmZmVyOiBhdHRyaWJ1dGUudmVydGV4QnVmZmVyLFxuICAgICAgdXNhZ2U6IGF0dHJpYnV0ZS51c2FnZSA/PyBCdWZmZXJVc2FnZS5TVEFUSUNfRFJBVyxcbiAgICB9O1xuICAgIGF0dHJzLnB1c2goYXR0cik7XG5cbiAgICAvLz4+aW5jbHVkZVN0YXJ0KCdkZWJ1ZycsIHByYWdtYXMuZGVidWcpO1xuICAgIGlmIChcbiAgICAgIGF0dHIuY29tcG9uZW50c1BlckF0dHJpYnV0ZSAhPT0gMSAmJlxuICAgICAgYXR0ci5jb21wb25lbnRzUGVyQXR0cmlidXRlICE9PSAyICYmXG4gICAgICBhdHRyLmNvbXBvbmVudHNQZXJBdHRyaWJ1dGUgIT09IDMgJiZcbiAgICAgIGF0dHIuY29tcG9uZW50c1BlckF0dHJpYnV0ZSAhPT0gNFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IERldmVsb3BlckVycm9yKFxuICAgICAgICBcImF0dHJpYnV0ZS5jb21wb25lbnRzUGVyQXR0cmlidXRlIG11c3QgYmUgaW4gdGhlIHJhbmdlIFsxLCA0XS5cIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YXR5cGUgPSBhdHRyLmNvbXBvbmVudERhdGF0eXBlO1xuICAgIGlmICghQ29tcG9uZW50RGF0YXR5cGUudmFsaWRhdGUoZGF0YXR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICAgIFwiQXR0cmlidXRlIG11c3QgaGF2ZSBhIHZhbGlkIGNvbXBvbmVudERhdGF0eXBlIG9yIG5vdCBzcGVjaWZ5IGl0LlwiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIUJ1ZmZlclVzYWdlLnZhbGlkYXRlKGF0dHIudXNhZ2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICAgIFwiQXR0cmlidXRlIG11c3QgaGF2ZSBhIHZhbGlkIHVzYWdlIG9yIG5vdCBzcGVjaWZ5IGl0LlwiLFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG4gIH1cblxuICAvLyBWZXJpZnkgYWxsIGF0dHJpYnV0ZSBuYW1lcyBhcmUgdW5pcXVlLlxuICBjb25zdCB1bmlxdWVJbmRpY2VzID0gbmV3IEFycmF5KGF0dHJzLmxlbmd0aCk7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgYXR0cnMubGVuZ3RoOyArK2opIHtcbiAgICBjb25zdCBjdXJyZW50QXR0ciA9IGF0dHJzW2pdO1xuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudEF0dHIuaW5kZXg7XG4gICAgLy8+PmluY2x1ZGVTdGFydCgnZGVidWcnLCBwcmFnbWFzLmRlYnVnKTtcbiAgICBpZiAodW5pcXVlSW5kaWNlc1tpbmRleF0pIHtcbiAgICAgIHRocm93IG5ldyBEZXZlbG9wZXJFcnJvcihcbiAgICAgICAgYEluZGV4ICR7aW5kZXh9IGlzIHVzZWQgYnkgbW9yZSB0aGFuIG9uZSBhdHRyaWJ1dGUuYCxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vPj5pbmNsdWRlRW5kKCdkZWJ1ZycpO1xuICAgIHVuaXF1ZUluZGljZXNbaW5kZXhdID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cblZlcnRleEFycmF5RmFjYWRlLl92ZXJ0ZXhTaXplSW5CeXRlcyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XG4gIGxldCBzaXplSW5CeXRlcyA9IDA7XG5cbiAgY29uc3QgbGVuZ3RoID0gYXR0cmlidXRlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgIHNpemVJbkJ5dGVzICs9XG4gICAgICBhdHRyaWJ1dGUuY29tcG9uZW50c1BlckF0dHJpYnV0ZSAqXG4gICAgICBDb21wb25lbnREYXRhdHlwZS5nZXRTaXplSW5CeXRlcyhhdHRyaWJ1dGUuY29tcG9uZW50RGF0YXR5cGUpO1xuICB9XG5cbiAgY29uc3QgbWF4Q29tcG9uZW50U2l6ZUluQnl0ZXMgPVxuICAgIGxlbmd0aCA+IDBcbiAgICAgID8gQ29tcG9uZW50RGF0YXR5cGUuZ2V0U2l6ZUluQnl0ZXMoYXR0cmlidXRlc1swXS5jb21wb25lbnREYXRhdHlwZSlcbiAgICAgIDogMDsgLy8gU29ydGVkIGJ5IHNpemVcbiAgY29uc3QgcmVtYWluZGVyID1cbiAgICBtYXhDb21wb25lbnRTaXplSW5CeXRlcyA+IDAgPyBzaXplSW5CeXRlcyAlIG1heENvbXBvbmVudFNpemVJbkJ5dGVzIDogMDtcbiAgY29uc3QgcGFkZGluZyA9IHJlbWFpbmRlciA9PT0gMCA/IDAgOiBtYXhDb21wb25lbnRTaXplSW5CeXRlcyAtIHJlbWFpbmRlcjtcbiAgc2l6ZUluQnl0ZXMgKz0gcGFkZGluZztcblxuICByZXR1cm4gc2l6ZUluQnl0ZXM7XG59O1xuXG5WZXJ0ZXhBcnJheUZhY2FkZS5fY3JlYXRlQXJyYXlWaWV3cyA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzLCB2ZXJ0ZXhTaXplSW5CeXRlcykge1xuICBjb25zdCB2aWV3cyA9IFtdO1xuICBsZXQgb2Zmc2V0SW5CeXRlcyA9IDA7XG5cbiAgY29uc3QgbGVuZ3RoID0gYXR0cmlidXRlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgIGNvbnN0IGNvbXBvbmVudERhdGF0eXBlID0gYXR0cmlidXRlLmNvbXBvbmVudERhdGF0eXBlO1xuXG4gICAgdmlld3MucHVzaCh7XG4gICAgICBpbmRleDogYXR0cmlidXRlLmluZGV4LFxuICAgICAgZW5hYmxlZDogYXR0cmlidXRlLmVuYWJsZWQsXG4gICAgICBjb21wb25lbnRzUGVyQXR0cmlidXRlOiBhdHRyaWJ1dGUuY29tcG9uZW50c1BlckF0dHJpYnV0ZSxcbiAgICAgIGNvbXBvbmVudERhdGF0eXBlOiBjb21wb25lbnREYXRhdHlwZSxcbiAgICAgIG5vcm1hbGl6ZTogYXR0cmlidXRlLm5vcm1hbGl6ZSxcblxuICAgICAgb2Zmc2V0SW5CeXRlczogb2Zmc2V0SW5CeXRlcyxcbiAgICAgIHZlcnRleFNpemVJbkNvbXBvbmVudFR5cGU6XG4gICAgICAgIHZlcnRleFNpemVJbkJ5dGVzIC8gQ29tcG9uZW50RGF0YXR5cGUuZ2V0U2l6ZUluQnl0ZXMoY29tcG9uZW50RGF0YXR5cGUpLFxuXG4gICAgICB2aWV3OiB1bmRlZmluZWQsXG4gICAgfSk7XG5cbiAgICBvZmZzZXRJbkJ5dGVzICs9XG4gICAgICBhdHRyaWJ1dGUuY29tcG9uZW50c1BlckF0dHJpYnV0ZSAqXG4gICAgICBDb21wb25lbnREYXRhdHlwZS5nZXRTaXplSW5CeXRlcyhjb21wb25lbnREYXRhdHlwZSk7XG4gIH1cblxuICByZXR1cm4gdmlld3M7XG59O1xuXG4vKipcbiAqIEludmFsaWRhdGVzIHdyaXRlcnMuICBDYW4ndCByZW5kZXIgYWdhaW4gdW50aWwgY29tbWl0IGlzIGNhbGxlZC5cbiAqL1xuVmVydGV4QXJyYXlGYWNhZGUucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uIChzaXplSW5WZXJ0aWNlcykge1xuICB0aGlzLl9zaXplID0gc2l6ZUluVmVydGljZXM7XG5cbiAgY29uc3QgYWxsQnVmZmVycyA9IHRoaXMuX2FsbEJ1ZmZlcnM7XG4gIHRoaXMud3JpdGVycyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhbGxCdWZmZXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgY29uc3QgYnVmZmVyID0gYWxsQnVmZmVyc1tpXTtcblxuICAgIFZlcnRleEFycmF5RmFjYWRlLl9yZXNpemUoYnVmZmVyLCB0aGlzLl9zaXplKTtcblxuICAgIC8vIFJlc2VydmluZyBpbnZhbGlkYXRlcyB0aGUgd3JpdGVycywgc28gaWYgY2xpZW50J3MgY2FjaGUgdGhlbSwgdGhleSBuZWVkIHRvIGludmFsaWRhdGUgdGhlaXIgY2FjaGUuXG4gICAgVmVydGV4QXJyYXlGYWNhZGUuX2FwcGVuZFdyaXRlcnModGhpcy53cml0ZXJzLCBidWZmZXIpO1xuICB9XG5cbiAgLy8gVkFzIGFyZSByZWNyZWF0ZWQgbmV4dCB0aW1lIGNvbW1pdCBpcyBjYWxsZWQuXG4gIGRlc3Ryb3lWQSh0aGlzKTtcbn07XG5cblZlcnRleEFycmF5RmFjYWRlLl9yZXNpemUgPSBmdW5jdGlvbiAoYnVmZmVyLCBzaXplKSB7XG4gIGlmIChidWZmZXIudmVydGV4U2l6ZUluQnl0ZXMgPiAwKSB7XG4gICAgLy8gQ3JlYXRlIGxhcmdlciBhcnJheSBidWZmZXJcbiAgICBjb25zdCBhcnJheUJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihzaXplICogYnVmZmVyLnZlcnRleFNpemVJbkJ5dGVzKTtcblxuICAgIC8vIENvcHkgY29udGVudHMgZnJvbSBwcmV2aW91cyBhcnJheSBidWZmZXJcbiAgICBpZiAoZGVmaW5lZChidWZmZXIuYXJyYXlCdWZmZXIpKSB7XG4gICAgICBjb25zdCBkZXN0VmlldyA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcbiAgICAgIGNvbnN0IHNvdXJjZVZpZXcgPSBuZXcgVWludDhBcnJheShidWZmZXIuYXJyYXlCdWZmZXIpO1xuICAgICAgY29uc3Qgc291cmNlTGVuZ3RoID0gc291cmNlVmlldy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNvdXJjZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGRlc3RWaWV3W2pdID0gc291cmNlVmlld1tqXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdHlwZWQgdmlld3MgaW50byB0aGUgbmV3IGFycmF5IGJ1ZmZlclxuICAgIGNvbnN0IHZpZXdzID0gYnVmZmVyLmFycmF5Vmlld3M7XG4gICAgY29uc3QgbGVuZ3RoID0gdmlld3MubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHZpZXcgPSB2aWV3c1tpXTtcbiAgICAgIHZpZXcudmlldyA9IENvbXBvbmVudERhdGF0eXBlLmNyZWF0ZUFycmF5QnVmZmVyVmlldyhcbiAgICAgICAgdmlldy5jb21wb25lbnREYXRhdHlwZSxcbiAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgIHZpZXcub2Zmc2V0SW5CeXRlcyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYnVmZmVyLmFycmF5QnVmZmVyID0gYXJyYXlCdWZmZXI7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZVdyaXRlcnMgPSBbXG4gIC8vIDEgY29tcG9uZW50IHBlciBhdHRyaWJ1dGVcbiAgZnVuY3Rpb24gKGJ1ZmZlciwgdmlldywgdmVydGV4U2l6ZUluQ29tcG9uZW50VHlwZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIGF0dHJpYnV0ZSkge1xuICAgICAgdmlld1tpbmRleCAqIHZlcnRleFNpemVJbkNvbXBvbmVudFR5cGVdID0gYXR0cmlidXRlO1xuICAgICAgYnVmZmVyLm5lZWRzQ29tbWl0ID0gdHJ1ZTtcbiAgICB9O1xuICB9LFxuXG4gIC8vIDIgY29tcG9uZW50IHBlciBhdHRyaWJ1dGVcbiAgZnVuY3Rpb24gKGJ1ZmZlciwgdmlldywgdmVydGV4U2l6ZUluQ29tcG9uZW50VHlwZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIGNvbXBvbmVudDAsIGNvbXBvbmVudDEpIHtcbiAgICAgIGNvbnN0IGkgPSBpbmRleCAqIHZlcnRleFNpemVJbkNvbXBvbmVudFR5cGU7XG4gICAgICB2aWV3W2ldID0gY29tcG9uZW50MDtcbiAgICAgIHZpZXdbaSArIDFdID0gY29tcG9uZW50MTtcbiAgICAgIGJ1ZmZlci5uZWVkc0NvbW1pdCA9IHRydWU7XG4gICAgfTtcbiAgfSxcblxuICAvLyAzIGNvbXBvbmVudCBwZXIgYXR0cmlidXRlXG4gIGZ1bmN0aW9uIChidWZmZXIsIHZpZXcsIHZlcnRleFNpemVJbkNvbXBvbmVudFR5cGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCBjb21wb25lbnQwLCBjb21wb25lbnQxLCBjb21wb25lbnQyKSB7XG4gICAgICBjb25zdCBpID0gaW5kZXggKiB2ZXJ0ZXhTaXplSW5Db21wb25lbnRUeXBlO1xuICAgICAgdmlld1tpXSA9IGNvbXBvbmVudDA7XG4gICAgICB2aWV3W2kgKyAxXSA9IGNvbXBvbmVudDE7XG4gICAgICB2aWV3W2kgKyAyXSA9IGNvbXBvbmVudDI7XG4gICAgICBidWZmZXIubmVlZHNDb21taXQgPSB0cnVlO1xuICAgIH07XG4gIH0sXG5cbiAgLy8gNCBjb21wb25lbnQgcGVyIGF0dHJpYnV0ZVxuICBmdW5jdGlvbiAoYnVmZmVyLCB2aWV3LCB2ZXJ0ZXhTaXplSW5Db21wb25lbnRUeXBlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgY29tcG9uZW50MCwgY29tcG9uZW50MSwgY29tcG9uZW50MiwgY29tcG9uZW50Mykge1xuICAgICAgY29uc3QgaSA9IGluZGV4ICogdmVydGV4U2l6ZUluQ29tcG9uZW50VHlwZTtcbiAgICAgIHZpZXdbaV0gPSBjb21wb25lbnQwO1xuICAgICAgdmlld1tpICsgMV0gPSBjb21wb25lbnQxO1xuICAgICAgdmlld1tpICsgMl0gPSBjb21wb25lbnQyO1xuICAgICAgdmlld1tpICsgM10gPSBjb21wb25lbnQzO1xuICAgICAgYnVmZmVyLm5lZWRzQ29tbWl0ID0gdHJ1ZTtcbiAgICB9O1xuICB9LFxuXTtcblxuVmVydGV4QXJyYXlGYWNhZGUuX2FwcGVuZFdyaXRlcnMgPSBmdW5jdGlvbiAod3JpdGVycywgYnVmZmVyKSB7XG4gIGNvbnN0IGFycmF5Vmlld3MgPSBidWZmZXIuYXJyYXlWaWV3cztcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXlWaWV3cy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBhcnJheVZpZXcgPSBhcnJheVZpZXdzW2ldO1xuICAgIHdyaXRlcnNbYXJyYXlWaWV3LmluZGV4XSA9IGNyZWF0ZVdyaXRlcnNbXG4gICAgICBhcnJheVZpZXcuY29tcG9uZW50c1BlckF0dHJpYnV0ZSAtIDFcbiAgICBdKGJ1ZmZlciwgYXJyYXlWaWV3LnZpZXcsIGFycmF5Vmlldy52ZXJ0ZXhTaXplSW5Db21wb25lbnRUeXBlKTtcbiAgfVxufTtcblxuVmVydGV4QXJyYXlGYWNhZGUucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIChpbmRleEJ1ZmZlcikge1xuICBsZXQgcmVjcmVhdGVWQSA9IGZhbHNlO1xuXG4gIGNvbnN0IGFsbEJ1ZmZlcnMgPSB0aGlzLl9hbGxCdWZmZXJzO1xuICBsZXQgYnVmZmVyO1xuICBsZXQgaTtcbiAgbGV0IGxlbmd0aDtcblxuICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhbGxCdWZmZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgYnVmZmVyID0gYWxsQnVmZmVyc1tpXTtcbiAgICByZWNyZWF0ZVZBID0gY29tbWl0KHRoaXMsIGJ1ZmZlcikgfHwgcmVjcmVhdGVWQTtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgaWYgKHJlY3JlYXRlVkEgfHwgIWRlZmluZWQodGhpcy52YSkpIHtcbiAgICBkZXN0cm95VkEodGhpcyk7XG4gICAgY29uc3QgdmEgPSAodGhpcy52YSA9IFtdKTtcblxuICAgIGNvbnN0IGNodW5rU2l6ZSA9IENlc2l1bU1hdGguU0lYVFlfRk9VUl9LSUxPQllURVMgLSA0OyAvLyBUaGUgNjU1MzUgaW5kZXggaXMgcmVzZXJ2ZWQgZm9yIHByaW1pdGl2ZSByZXN0YXJ0LiBSZXNlcnZlIHRoZSBsYXN0IDQgaW5kaWNlcyBzbyB0aGF0IGJpbGxib2FyZCBxdWFkcyBhcmUgbm90IGJyb2tlbiB1cC5cbiAgICBjb25zdCBudW1iZXJPZlZlcnRleEFycmF5cyA9XG4gICAgICBkZWZpbmVkKGluZGV4QnVmZmVyKSAmJiAhdGhpcy5faW5zdGFuY2VkXG4gICAgICAgID8gTWF0aC5jZWlsKHRoaXMuX3NpemUgLyBjaHVua1NpemUpXG4gICAgICAgIDogMTtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IG51bWJlck9mVmVydGV4QXJyYXlzOyArK2spIHtcbiAgICAgIGxldCBhdHRyaWJ1dGVzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhbGxCdWZmZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgIGJ1ZmZlciA9IGFsbEJ1ZmZlcnNbaV07XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IGsgKiAoYnVmZmVyLnZlcnRleFNpemVJbkJ5dGVzICogY2h1bmtTaXplKTtcbiAgICAgICAgVmVydGV4QXJyYXlGYWNhZGUuX2FwcGVuZEF0dHJpYnV0ZXMoXG4gICAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgIHRoaXMuX2luc3RhbmNlZCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuY29uY2F0KHRoaXMuX3ByZWNyZWF0ZWQpO1xuXG4gICAgICB2YS5wdXNoKHtcbiAgICAgICAgdmE6IG5ldyBWZXJ0ZXhBcnJheSh7XG4gICAgICAgICAgY29udGV4dDogdGhpcy5fY29udGV4dCxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgICAgIGluZGV4QnVmZmVyOiBpbmRleEJ1ZmZlcixcbiAgICAgICAgfSksXG4gICAgICAgIGluZGljZXNDb3VudDpcbiAgICAgICAgICAxLjUgKlxuICAgICAgICAgIChrICE9PSBudW1iZXJPZlZlcnRleEFycmF5cyAtIDEgPyBjaHVua1NpemUgOiB0aGlzLl9zaXplICUgY2h1bmtTaXplKSxcbiAgICAgICAgLy8gVE9ETzogbm90IGhhcmRjb2RlIDEuNSwgdGhpcyBhc3N1bWVzIDYgaW5kaWNlcyBwZXIgNCB2ZXJ0aWNlcyAoYXMgZm9yIEJpbGxib2FyZCBxdWFkcykuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNvbW1pdCh2ZXJ0ZXhBcnJheUZhY2FkZSwgYnVmZmVyKSB7XG4gIGlmIChidWZmZXIubmVlZHNDb21taXQgJiYgYnVmZmVyLnZlcnRleFNpemVJbkJ5dGVzID4gMCkge1xuICAgIGJ1ZmZlci5uZWVkc0NvbW1pdCA9IGZhbHNlO1xuXG4gICAgY29uc3QgdmVydGV4QnVmZmVyID0gYnVmZmVyLnZlcnRleEJ1ZmZlcjtcbiAgICBjb25zdCB2ZXJ0ZXhCdWZmZXJTaXplSW5CeXRlcyA9XG4gICAgICB2ZXJ0ZXhBcnJheUZhY2FkZS5fc2l6ZSAqIGJ1ZmZlci52ZXJ0ZXhTaXplSW5CeXRlcztcbiAgICBjb25zdCB2ZXJ0ZXhCdWZmZXJEZWZpbmVkID0gZGVmaW5lZCh2ZXJ0ZXhCdWZmZXIpO1xuICAgIGlmIChcbiAgICAgICF2ZXJ0ZXhCdWZmZXJEZWZpbmVkIHx8XG4gICAgICB2ZXJ0ZXhCdWZmZXIuc2l6ZUluQnl0ZXMgPCB2ZXJ0ZXhCdWZmZXJTaXplSW5CeXRlc1xuICAgICkge1xuICAgICAgaWYgKHZlcnRleEJ1ZmZlckRlZmluZWQpIHtcbiAgICAgICAgdmVydGV4QnVmZmVyLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci52ZXJ0ZXhCdWZmZXIgPSBCdWZmZXIuY3JlYXRlVmVydGV4QnVmZmVyKHtcbiAgICAgICAgY29udGV4dDogdmVydGV4QXJyYXlGYWNhZGUuX2NvbnRleHQsXG4gICAgICAgIHR5cGVkQXJyYXk6IGJ1ZmZlci5hcnJheUJ1ZmZlcixcbiAgICAgICAgdXNhZ2U6IGJ1ZmZlci51c2FnZSxcbiAgICAgIH0pO1xuICAgICAgYnVmZmVyLnZlcnRleEJ1ZmZlci52ZXJ0ZXhBcnJheURlc3Ryb3lhYmxlID0gZmFsc2U7XG5cbiAgICAgIHJldHVybiB0cnVlOyAvLyBDcmVhdGVkIG5ldyB2ZXJ0ZXggYnVmZmVyXG4gICAgfVxuXG4gICAgYnVmZmVyLnZlcnRleEJ1ZmZlci5jb3B5RnJvbUFycmF5VmlldyhidWZmZXIuYXJyYXlCdWZmZXIpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlOyAvLyBEaWQgbm90IGNyZWF0ZSBuZXcgdmVydGV4IGJ1ZmZlclxufVxuXG5WZXJ0ZXhBcnJheUZhY2FkZS5fYXBwZW5kQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChcbiAgYXR0cmlidXRlcyxcbiAgYnVmZmVyLFxuICB2ZXJ0ZXhCdWZmZXJPZmZzZXQsXG4gIGluc3RhbmNlZCxcbikge1xuICBjb25zdCBhcnJheVZpZXdzID0gYnVmZmVyLmFycmF5Vmlld3M7XG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Vmlld3MubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgdmlldyA9IGFycmF5Vmlld3NbaV07XG5cbiAgICBhdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgaW5kZXg6IHZpZXcuaW5kZXgsXG4gICAgICBlbmFibGVkOiB2aWV3LmVuYWJsZWQsXG4gICAgICBjb21wb25lbnRzUGVyQXR0cmlidXRlOiB2aWV3LmNvbXBvbmVudHNQZXJBdHRyaWJ1dGUsXG4gICAgICBjb21wb25lbnREYXRhdHlwZTogdmlldy5jb21wb25lbnREYXRhdHlwZSxcbiAgICAgIG5vcm1hbGl6ZTogdmlldy5ub3JtYWxpemUsXG4gICAgICB2ZXJ0ZXhCdWZmZXI6IGJ1ZmZlci52ZXJ0ZXhCdWZmZXIsXG4gICAgICBvZmZzZXRJbkJ5dGVzOiB2ZXJ0ZXhCdWZmZXJPZmZzZXQgKyB2aWV3Lm9mZnNldEluQnl0ZXMsXG4gICAgICBzdHJpZGVJbkJ5dGVzOiBidWZmZXIudmVydGV4U2l6ZUluQnl0ZXMsXG4gICAgICBpbnN0YW5jZURpdmlzb3I6IGluc3RhbmNlZCA/IDEgOiAwLFxuICAgIH0pO1xuICB9XG59O1xuXG5WZXJ0ZXhBcnJheUZhY2FkZS5wcm90b3R5cGUuc3ViQ29tbWl0ID0gZnVuY3Rpb24gKFxuICBvZmZzZXRJblZlcnRpY2VzLFxuICBsZW5ndGhJblZlcnRpY2VzLFxuKSB7XG4gIC8vPj5pbmNsdWRlU3RhcnQoJ2RlYnVnJywgcHJhZ21hcy5kZWJ1Zyk7XG4gIGlmIChvZmZzZXRJblZlcnRpY2VzIDwgMCB8fCBvZmZzZXRJblZlcnRpY2VzID49IHRoaXMuX3NpemUpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICBcIm9mZnNldEluVmVydGljZXMgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gemVybyBhbmQgbGVzcyB0aGFuIHRoZSB2ZXJ0ZXggYXJyYXkgc2l6ZS5cIixcbiAgICApO1xuICB9XG4gIGlmIChvZmZzZXRJblZlcnRpY2VzICsgbGVuZ3RoSW5WZXJ0aWNlcyA+IHRoaXMuX3NpemUpIHtcbiAgICB0aHJvdyBuZXcgRGV2ZWxvcGVyRXJyb3IoXG4gICAgICBcIm9mZnNldEluVmVydGljZXMgKyBsZW5ndGhJblZlcnRpY2VzIGNhbm5vdCBleGNlZWQgdGhlIHZlcnRleCBhcnJheSBzaXplLlwiLFxuICAgICk7XG4gIH1cbiAgLy8+PmluY2x1ZGVFbmQoJ2RlYnVnJyk7XG5cbiAgY29uc3QgYWxsQnVmZmVycyA9IHRoaXMuX2FsbEJ1ZmZlcnM7XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhbGxCdWZmZXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgc3ViQ29tbWl0KGFsbEJ1ZmZlcnNbaV0sIG9mZnNldEluVmVydGljZXMsIGxlbmd0aEluVmVydGljZXMpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzdWJDb21taXQoYnVmZmVyLCBvZmZzZXRJblZlcnRpY2VzLCBsZW5ndGhJblZlcnRpY2VzKSB7XG4gIGlmIChidWZmZXIubmVlZHNDb21taXQgJiYgYnVmZmVyLnZlcnRleFNpemVJbkJ5dGVzID4gMCkge1xuICAgIGNvbnN0IGJ5dGVPZmZzZXQgPSBidWZmZXIudmVydGV4U2l6ZUluQnl0ZXMgKiBvZmZzZXRJblZlcnRpY2VzO1xuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBidWZmZXIudmVydGV4U2l6ZUluQnl0ZXMgKiBsZW5ndGhJblZlcnRpY2VzO1xuXG4gICAgLy8gUEVSRk9STUFOQ0VfSURFQTogSWYgd2Ugd2FudCB0byBnZXQgcmVhbGx5IGNyYXp5LCB3ZSBjb3VsZCBjb25zaWRlciB1cGRhdGluZ1xuICAgIC8vIGluZGl2aWR1YWwgYXR0cmlidXRlcyBpbnN0ZWFkIG9mIHRoZSBlbnRpcmUgKHN1Yi0pdmVydGV4LlxuICAgIC8vXG4gICAgLy8gUEVSRk9STUFOQ0VfSURFQTogRG9lcyBjcmVhdGluZyB0aGUgdHlwZWQgdmlldyBhZGQgdG9vIG11Y2ggR0Mgb3ZlcmhlYWQ/XG4gICAgYnVmZmVyLnZlcnRleEJ1ZmZlci5jb3B5RnJvbUFycmF5VmlldyhcbiAgICAgIG5ldyBVaW50OEFycmF5KGJ1ZmZlci5hcnJheUJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCksXG4gICAgICBieXRlT2Zmc2V0LFxuICAgICk7XG4gIH1cbn1cblxuVmVydGV4QXJyYXlGYWNhZGUucHJvdG90eXBlLmVuZFN1YkNvbW1pdHMgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFsbEJ1ZmZlcnMgPSB0aGlzLl9hbGxCdWZmZXJzO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhbGxCdWZmZXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgYWxsQnVmZmVyc1tpXS5uZWVkc0NvbW1pdCA9IGZhbHNlO1xuICB9XG59O1xuXG5mdW5jdGlvbiBkZXN0cm95VkEodmVydGV4QXJyYXlGYWNhZGUpIHtcbiAgY29uc3QgdmEgPSB2ZXJ0ZXhBcnJheUZhY2FkZS52YTtcbiAgaWYgKCFkZWZpbmVkKHZhKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aCA9IHZhLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhW2ldLnZhLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHZlcnRleEFycmF5RmFjYWRlLnZhID0gdW5kZWZpbmVkO1xufVxuXG5WZXJ0ZXhBcnJheUZhY2FkZS5wcm90b3R5cGUuaXNEZXN0cm95ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblZlcnRleEFycmF5RmFjYWRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBhbGxCdWZmZXJzID0gdGhpcy5fYWxsQnVmZmVycztcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFsbEJ1ZmZlcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBjb25zdCBidWZmZXIgPSBhbGxCdWZmZXJzW2ldO1xuICAgIGJ1ZmZlci52ZXJ0ZXhCdWZmZXIgPSBidWZmZXIudmVydGV4QnVmZmVyICYmIGJ1ZmZlci52ZXJ0ZXhCdWZmZXIuZGVzdHJveSgpO1xuICB9XG5cbiAgZGVzdHJveVZBKHRoaXMpO1xuXG4gIHJldHVybiBkZXN0cm95T2JqZWN0KHRoaXMpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFZlcnRleEFycmF5RmFjYWRlO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==