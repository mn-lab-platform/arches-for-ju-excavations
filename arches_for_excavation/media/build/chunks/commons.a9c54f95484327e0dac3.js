"use strict";
(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[79364],{

/***/ 79364:
/*!*******************************************************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/views/components/cards/select-related-feature-layers.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(source, sourceLayer, selectedResourceIds, visible, color, nodeids, filteredNodeids, hoverId, selectedLayerConfig) {
  var layerConfig = selectedLayerConfig;
  color = color || layerConfig.defaultcolor;
  var selectionColor = layerConfig.selectioncolor;
  var hoverColor = layerConfig.hovercolor;
  var colorPalette = layerConfig.colorpalette;
  var createColorExpressions = function createColorExpressions(defaultColor, colorPalette) {
    if (nodeids) {
      var colorExpressions = ['case'];
      nodeids.forEach(function (nodeid, i) {
        colorExpressions.push(['==', ['get', 'nodeid'], nodeid]);
        if (i <= colorPalette.length) {
          colorExpressions.push(colorPalette[i]);
        } else {
          colorExpressions.push(colorPalette[Math.floor(Math.random() * Math.floor(colorPalette.length))]);
        }
      });
      colorExpressions.push(color);
      return colorExpressions;
    } else {
      return defaultColor;
    }
  };
  color = createColorExpressions(color, colorPalette);
  var nodeFilter = ["!=", "resourceinstanceid", "x"]; // just a placeholder if there are no filterNodeids
  if (filteredNodeids && nodeids.length > 0) {
    nodeFilter = filteredNodeids.map(function (id) {
      return ["==", "nodeid", id];
    });
    nodeFilter.splice(0, 0, 'any');
  }
  if (selectedResourceIds && selectedResourceIds.length > 0) {
    color = ['match', ['get', 'resourceinstanceid'], selectedResourceIds, selectionColor, color];
  }
  if (hoverId) {
    color = ['match', ['get', 'resourceinstanceid'], hoverId, hoverColor, color];
  }
  if (!source) return [];
  var layers = [{
    "id": "select-feature-polygon-fill",
    "type": "fill",
    "minzoom": layerConfig.minzoom,
    "filter": ['all', ["==", "$type", "Polygon"], nodeFilter],
    "paint": {
      "fill-color": color,
      "fill-outline-color": color,
      "fill-opacity": layerConfig.fillopacity
    },
    "layout": {
      "visibility": visible ? "visible" : "none"
    }
  }, {
    "id": "select-feature-polygon-under-stroke",
    "type": "line",
    "minzoom": layerConfig.minzoom,
    "filter": ['all', ["==", "$type", "Polygon"], nodeFilter],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": visible ? "visible" : "none"
    },
    "paint": {
      "line-color": layerConfig.strokecolor,
      "line-width": layerConfig.strokelinewidth
    }
  }, {
    "id": "select-feature-polygon-stroke",
    "type": "line",
    "minzoom": layerConfig.minzoom,
    "filter": ['all', ["==", "$type", "Polygon"], nodeFilter],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": visible ? "visible" : "none"
    },
    "paint": {
      "line-color": color,
      "line-width": layerConfig.linewidth
    }
  }, {
    "id": "select-feature-line",
    "type": "line",
    "minzoom": layerConfig.minzoom,
    "filter": ['all', ["==", "$type", "LineString"], nodeFilter],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": visible ? "visible" : "none"
    },
    "paint": {
      "line-color": color,
      "line-width": layerConfig.linewidth
    }
  }, {
    "id": "select-feature-point-point-stroke",
    "type": "circle",
    "minzoom": layerConfig.minzoom,
    "filter": ['all', ["==", "$type", "Point"]],
    "paint": {
      "circle-radius": layerConfig.strokepointradius,
      "circle-opacity": layerConfig.strokepointopacity,
      "circle-color": layerConfig.strokecolor
    },
    "layout": {
      "visibility": visible ? "visible" : "none"
    }
  }, {
    "id": "select-feature-point",
    "type": "circle",
    "minzoom": layerConfig.minzoom,
    "filter": ['all', ["==", "$type", "Point"], nodeFilter],
    "paint": {
      "circle-radius": layerConfig.pointradius,
      "circle-color": color
    },
    "layout": {
      "visibility": visible ? "visible" : "none"
    }
  }];
  layers.forEach(function (layer) {
    layer["source"] = source;
    if (sourceLayer) layer["source-layer"] = sourceLayer;
  });
  return layers;
}
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuYTljNTRmOTU0ODQzMjdlMGRhYzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUFlLG9DQUFTQSxNQUFNLEVBQUVDLFdBQVcsRUFBRUMsbUJBQW1CLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUVDLGVBQWUsRUFBRUMsT0FBTyxFQUFFQyxtQkFBbUIsRUFBRTtFQUV0SSxJQUFJQyxXQUFXLEdBQUdELG1CQUFtQjtFQUNyQ0osS0FBSyxHQUFHQSxLQUFLLElBQUlLLFdBQVcsQ0FBQ0MsWUFBWTtFQUN6QyxJQUFJQyxjQUFjLEdBQUdGLFdBQVcsQ0FBQ0csY0FBYztFQUMvQyxJQUFJQyxVQUFVLEdBQUdKLFdBQVcsQ0FBQ0ssVUFBVTtFQUN2QyxJQUFJQyxZQUFZLEdBQUdOLFdBQVcsQ0FBQ08sWUFBWTtFQUUzQyxJQUFJQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCQSxDQUFZQyxZQUFZLEVBQUVILFlBQVksRUFBQztJQUM3RCxJQUFJVixPQUFPLEVBQUU7TUFDVCxJQUFJYyxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMvQmQsT0FBTyxDQUFDZSxPQUFPLENBQUMsVUFBU0MsTUFBTSxFQUFFQyxDQUFDLEVBQUU7UUFDaENILGdCQUFnQixDQUFDSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUVGLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELElBQUlDLENBQUMsSUFBSVAsWUFBWSxDQUFDUyxNQUFNLEVBQUU7VUFDMUJMLGdCQUFnQixDQUFDSSxJQUFJLENBQUNSLFlBQVksQ0FBQ08sQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxNQUFNO1VBQ0hILGdCQUFnQixDQUFDSSxJQUFJLENBQUNSLFlBQVksQ0FBQ1UsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBR0YsSUFBSSxDQUFDQyxLQUFLLENBQUNYLFlBQVksQ0FBQ1MsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BHO01BQ0osQ0FBQyxDQUFDO01BQ0ZMLGdCQUFnQixDQUFDSSxJQUFJLENBQUNuQixLQUFLLENBQUM7TUFDNUIsT0FBT2UsZ0JBQWdCO0lBQzNCLENBQUMsTUFBTTtNQUNILE9BQU9ELFlBQVk7SUFDdkI7RUFDSixDQUFDO0VBQ0RkLEtBQUssR0FBR2Esc0JBQXNCLENBQUNiLEtBQUssRUFBRVcsWUFBWSxDQUFDO0VBQ25ELElBQUlhLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELElBQUl0QixlQUFlLElBQUlELE9BQU8sQ0FBQ21CLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDdkNJLFVBQVUsR0FBR3RCLGVBQWUsQ0FBQ3VCLEdBQUcsQ0FBQyxVQUFBQyxFQUFFO01BQUEsT0FBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUVBLEVBQUUsQ0FBQztJQUFBLEVBQUM7SUFDNURGLFVBQVUsQ0FBQ0csTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO0VBQ2xDO0VBQ0EsSUFBSTdCLG1CQUFtQixJQUFJQSxtQkFBbUIsQ0FBQ3NCLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDdkRwQixLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsRUFBRUYsbUJBQW1CLEVBQUVTLGNBQWMsRUFBRVAsS0FBSyxDQUMxRjtFQUNMO0VBQ0EsSUFBSUcsT0FBTyxFQUFFO0lBQ1RILEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxFQUFFRyxPQUFPLEVBQUVNLFVBQVUsRUFBRVQsS0FBSyxDQUMxRTtFQUNMO0VBQ0EsSUFBSSxDQUFDSixNQUFNLEVBQUUsT0FBTyxFQUFFO0VBQ3RCLElBQUlnQyxNQUFNLEdBQUcsQ0FBQztJQUNWLElBQUksRUFBRSw2QkFBNkI7SUFDbkMsTUFBTSxFQUFFLE1BQU07SUFDZCxTQUFTLEVBQUV2QixXQUFXLENBQUN3QixPQUFPO0lBQzlCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBQyxDQUNiLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUMzQixFQUFFTCxVQUFVLENBQ1o7SUFDRCxPQUFPLEVBQUU7TUFDTCxZQUFZLEVBQUV4QixLQUFLO01BQ25CLG9CQUFvQixFQUFFQSxLQUFLO01BQzNCLGNBQWMsRUFBRUssV0FBVyxDQUFDeUI7SUFDaEMsQ0FBQztJQUNELFFBQVEsRUFBRTtNQUNOLFlBQVksRUFBRS9CLE9BQU8sR0FBRyxTQUFTLEdBQUU7SUFDdkM7RUFDSixDQUFDLEVBQUc7SUFDQSxJQUFJLEVBQUUscUNBQXFDO0lBQzNDLE1BQU0sRUFBRSxNQUFNO0lBQ2QsU0FBUyxFQUFFTSxXQUFXLENBQUN3QixPQUFPO0lBQzlCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBQyxDQUNiLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUMzQixFQUFFTCxVQUFVLENBQUM7SUFDZCxRQUFRLEVBQUU7TUFDTixVQUFVLEVBQUUsT0FBTztNQUNuQixXQUFXLEVBQUUsT0FBTztNQUNwQixZQUFZLEVBQUV6QixPQUFPLEdBQUcsU0FBUyxHQUFFO0lBQ3ZDLENBQUM7SUFDRCxPQUFPLEVBQUU7TUFDTCxZQUFZLEVBQUVNLFdBQVcsQ0FBQzBCLFdBQVc7TUFDckMsWUFBWSxFQUFFMUIsV0FBVyxDQUFDMkI7SUFDOUI7RUFDSixDQUFDLEVBQUU7SUFDQyxJQUFJLEVBQUUsK0JBQStCO0lBQ3JDLE1BQU0sRUFBRSxNQUFNO0lBQ2QsU0FBUyxFQUFFM0IsV0FBVyxDQUFDd0IsT0FBTztJQUM5QixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUMsQ0FDYixJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FDM0IsRUFBRUwsVUFBVSxDQUFDO0lBQ2QsUUFBUSxFQUFFO01BQ04sVUFBVSxFQUFFLE9BQU87TUFDbkIsV0FBVyxFQUFFLE9BQU87TUFDcEIsWUFBWSxFQUFFekIsT0FBTyxHQUFHLFNBQVMsR0FBRTtJQUN2QyxDQUFDO0lBQ0QsT0FBTyxFQUFFO01BQ0wsWUFBWSxFQUFFQyxLQUFLO01BQ25CLFlBQVksRUFBRUssV0FBVyxDQUFDNEI7SUFDOUI7RUFDSixDQUFDLEVBQUU7SUFDQyxJQUFJLEVBQUUscUJBQXFCO0lBQzNCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsU0FBUyxFQUFFNUIsV0FBVyxDQUFDd0IsT0FBTztJQUM5QixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUMsQ0FDYixJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FDOUIsRUFBRUwsVUFBVSxDQUFDO0lBQ2QsUUFBUSxFQUFFO01BQ04sVUFBVSxFQUFFLE9BQU87TUFDbkIsV0FBVyxFQUFFLE9BQU87TUFDcEIsWUFBWSxFQUFFekIsT0FBTyxHQUFHLFNBQVMsR0FBRTtJQUN2QyxDQUFDO0lBQ0QsT0FBTyxFQUFFO01BQ0wsWUFBWSxFQUFFQyxLQUFLO01BQ25CLFlBQVksRUFBRUssV0FBVyxDQUFDNEI7SUFDOUI7RUFDSixDQUFDLEVBQUU7SUFDQyxJQUFJLEVBQUUsbUNBQW1DO0lBQ3pDLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFNBQVMsRUFBRTVCLFdBQVcsQ0FBQ3dCLE9BQU87SUFDOUIsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUNaLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FDM0I7SUFDRCxPQUFPLEVBQUU7TUFDTCxlQUFlLEVBQUV4QixXQUFXLENBQUM2QixpQkFBaUI7TUFDOUMsZ0JBQWdCLEVBQUU3QixXQUFXLENBQUM4QixrQkFBa0I7TUFDaEQsY0FBYyxFQUFFOUIsV0FBVyxDQUFDMEI7SUFDaEMsQ0FBQztJQUNELFFBQVEsRUFBRTtNQUNOLFlBQVksRUFBRWhDLE9BQU8sR0FBRyxTQUFTLEdBQUU7SUFDdkM7RUFDSixDQUFDLEVBQUU7SUFDQyxJQUFJLEVBQUUsc0JBQXNCO0lBQzVCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFNBQVMsRUFBRU0sV0FBVyxDQUFDd0IsT0FBTztJQUM5QixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUMsQ0FDYixJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FDekIsRUFBRUwsVUFBVSxDQUFDO0lBQ2QsT0FBTyxFQUFFO01BQ0wsZUFBZSxFQUFFbkIsV0FBVyxDQUFDK0IsV0FBVztNQUN4QyxjQUFjLEVBQUVwQztJQUNwQixDQUFDO0lBQ0QsUUFBUSxFQUFFO01BQ04sWUFBWSxFQUFFRCxPQUFPLEdBQUcsU0FBUyxHQUFFO0lBQ3ZDO0VBQ0osQ0FBQyxDQUFDO0VBQ0Y2QixNQUFNLENBQUNaLE9BQU8sQ0FBQyxVQUFTcUIsS0FBSyxFQUFFO0lBQzNCQSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUd6QyxNQUFNO0lBQ3hCLElBQUlDLFdBQVcsRUFBRXdDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBR3hDLFdBQVc7RUFDeEQsQ0FBQyxDQUFDO0VBQ0YsT0FBTytCLE1BQU07QUFDakI7QUFBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvdmlld3MvY29tcG9uZW50cy9jYXJkcy9zZWxlY3QtcmVsYXRlZC1mZWF0dXJlLWxheWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNvdXJjZSwgc291cmNlTGF5ZXIsIHNlbGVjdGVkUmVzb3VyY2VJZHMsIHZpc2libGUsIGNvbG9yLCBub2RlaWRzLCBmaWx0ZXJlZE5vZGVpZHMsIGhvdmVySWQsIHNlbGVjdGVkTGF5ZXJDb25maWcpIHtcblxuICAgIHZhciBsYXllckNvbmZpZyA9IHNlbGVjdGVkTGF5ZXJDb25maWc7XG4gICAgY29sb3IgPSBjb2xvciB8fCBsYXllckNvbmZpZy5kZWZhdWx0Y29sb3I7XG4gICAgdmFyIHNlbGVjdGlvbkNvbG9yID0gbGF5ZXJDb25maWcuc2VsZWN0aW9uY29sb3I7XG4gICAgdmFyIGhvdmVyQ29sb3IgPSBsYXllckNvbmZpZy5ob3ZlcmNvbG9yO1xuICAgIHZhciBjb2xvclBhbGV0dGUgPSBsYXllckNvbmZpZy5jb2xvcnBhbGV0dGU7XG5cbiAgICB2YXIgY3JlYXRlQ29sb3JFeHByZXNzaW9ucyA9IGZ1bmN0aW9uKGRlZmF1bHRDb2xvciwgY29sb3JQYWxldHRlKXtcbiAgICAgICAgaWYgKG5vZGVpZHMpIHtcbiAgICAgICAgICAgIHZhciBjb2xvckV4cHJlc3Npb25zID0gWydjYXNlJ107XG4gICAgICAgICAgICBub2RlaWRzLmZvckVhY2goZnVuY3Rpb24obm9kZWlkLCBpKSB7XG4gICAgICAgICAgICAgICAgY29sb3JFeHByZXNzaW9ucy5wdXNoKFsnPT0nLCBbJ2dldCcsICdub2RlaWQnXSwgbm9kZWlkXSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPD0gY29sb3JQYWxldHRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb2xvckV4cHJlc3Npb25zLnB1c2goY29sb3JQYWxldHRlW2ldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2xvckV4cHJlc3Npb25zLnB1c2goY29sb3JQYWxldHRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoY29sb3JQYWxldHRlLmxlbmd0aCkpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb2xvckV4cHJlc3Npb25zLnB1c2goY29sb3IpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yRXhwcmVzc2lvbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfTsgXG4gICAgY29sb3IgPSBjcmVhdGVDb2xvckV4cHJlc3Npb25zKGNvbG9yLCBjb2xvclBhbGV0dGUpO1xuICAgIHZhciBub2RlRmlsdGVyID0gW1wiIT1cIiwgXCJyZXNvdXJjZWluc3RhbmNlaWRcIiwgXCJ4XCJdOyAvLyBqdXN0IGEgcGxhY2Vob2xkZXIgaWYgdGhlcmUgYXJlIG5vIGZpbHRlck5vZGVpZHNcbiAgICBpZiAoZmlsdGVyZWROb2RlaWRzICYmIG5vZGVpZHMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlRmlsdGVyID0gZmlsdGVyZWROb2RlaWRzLm1hcChpZCA9PiBbXCI9PVwiLCBcIm5vZGVpZFwiLCBpZF0pO1xuICAgICAgICBub2RlRmlsdGVyLnNwbGljZSgwLCAwLCAnYW55Jyk7XG4gICAgfVxuICAgIGlmIChzZWxlY3RlZFJlc291cmNlSWRzICYmIHNlbGVjdGVkUmVzb3VyY2VJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb2xvciA9IFsnbWF0Y2gnLCBbJ2dldCcsICdyZXNvdXJjZWluc3RhbmNlaWQnXSwgc2VsZWN0ZWRSZXNvdXJjZUlkcywgc2VsZWN0aW9uQ29sb3IsIGNvbG9yXG4gICAgICAgIF07XG4gICAgfVxuICAgIGlmIChob3ZlcklkKSB7XG4gICAgICAgIGNvbG9yID0gWydtYXRjaCcsIFsnZ2V0JywgJ3Jlc291cmNlaW5zdGFuY2VpZCddLCBob3ZlcklkLCBob3ZlckNvbG9yLCBjb2xvclxuICAgICAgICBdO1xuICAgIH1cbiAgICBpZiAoIXNvdXJjZSkgcmV0dXJuIFtdO1xuICAgIHZhciBsYXllcnMgPSBbe1xuICAgICAgICBcImlkXCI6IFwic2VsZWN0LWZlYXR1cmUtcG9seWdvbi1maWxsXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImZpbGxcIixcbiAgICAgICAgXCJtaW56b29tXCI6IGxheWVyQ29uZmlnLm1pbnpvb20sXG4gICAgICAgIFwiZmlsdGVyXCI6IFsnYWxsJyxbXG4gICAgICAgICAgICBcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2x5Z29uXCJcbiAgICAgICAgXSwgbm9kZUZpbHRlclxuICAgICAgICBdLFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwiZmlsbC1jb2xvclwiOiBjb2xvcixcbiAgICAgICAgICAgIFwiZmlsbC1vdXRsaW5lLWNvbG9yXCI6IGNvbG9yLFxuICAgICAgICAgICAgXCJmaWxsLW9wYWNpdHlcIjogbGF5ZXJDb25maWcuZmlsbG9wYWNpdHlcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IHZpc2libGUgPyBcInZpc2libGVcIjogXCJub25lXCJcbiAgICAgICAgfVxuICAgIH0sICB7XG4gICAgICAgIFwiaWRcIjogXCJzZWxlY3QtZmVhdHVyZS1wb2x5Z29uLXVuZGVyLXN0cm9rZVwiLFxuICAgICAgICBcInR5cGVcIjogXCJsaW5lXCIsXG4gICAgICAgIFwibWluem9vbVwiOiBsYXllckNvbmZpZy5taW56b29tLFxuICAgICAgICBcImZpbHRlclwiOiBbJ2FsbCcsW1xuICAgICAgICAgICAgXCI9PVwiLCBcIiR0eXBlXCIsIFwiUG9seWdvblwiXG4gICAgICAgIF0sIG5vZGVGaWx0ZXJdLFxuICAgICAgICBcImxheW91dFwiOiB7XG4gICAgICAgICAgICBcImxpbmUtY2FwXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgIFwibGluZS1qb2luXCI6IFwicm91bmRcIixcbiAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiB2aXNpYmxlID8gXCJ2aXNpYmxlXCI6IFwibm9uZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicGFpbnRcIjoge1xuICAgICAgICAgICAgXCJsaW5lLWNvbG9yXCI6IGxheWVyQ29uZmlnLnN0cm9rZWNvbG9yLFxuICAgICAgICAgICAgXCJsaW5lLXdpZHRoXCI6IGxheWVyQ29uZmlnLnN0cm9rZWxpbmV3aWR0aFxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBcImlkXCI6IFwic2VsZWN0LWZlYXR1cmUtcG9seWdvbi1zdHJva2VcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibGluZVwiLFxuICAgICAgICBcIm1pbnpvb21cIjogbGF5ZXJDb25maWcubWluem9vbSxcbiAgICAgICAgXCJmaWx0ZXJcIjogWydhbGwnLFtcbiAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIlBvbHlnb25cIlxuICAgICAgICBdLCBub2RlRmlsdGVyXSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJsaW5lLWNhcFwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICBcImxpbmUtam9pblwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICBcInZpc2liaWxpdHlcIjogdmlzaWJsZSA/IFwidmlzaWJsZVwiOiBcIm5vbmVcIlxuICAgICAgICB9LFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwibGluZS1jb2xvclwiOiBjb2xvcixcbiAgICAgICAgICAgIFwibGluZS13aWR0aFwiOiBsYXllckNvbmZpZy5saW5ld2lkdGhcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLWxpbmVcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwibGluZVwiLFxuICAgICAgICBcIm1pbnpvb21cIjogbGF5ZXJDb25maWcubWluem9vbSxcbiAgICAgICAgXCJmaWx0ZXJcIjogWydhbGwnLFtcbiAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIkxpbmVTdHJpbmdcIlxuICAgICAgICBdLCBub2RlRmlsdGVyXSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJsaW5lLWNhcFwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICBcImxpbmUtam9pblwiOiBcInJvdW5kXCIsXG4gICAgICAgICAgICBcInZpc2liaWxpdHlcIjogdmlzaWJsZSA/IFwidmlzaWJsZVwiOiBcIm5vbmVcIlxuICAgICAgICB9LFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwibGluZS1jb2xvclwiOiBjb2xvcixcbiAgICAgICAgICAgIFwibGluZS13aWR0aFwiOiBsYXllckNvbmZpZy5saW5ld2lkdGhcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLXBvaW50LXBvaW50LXN0cm9rZVwiLFxuICAgICAgICBcInR5cGVcIjogXCJjaXJjbGVcIixcbiAgICAgICAgXCJtaW56b29tXCI6IGxheWVyQ29uZmlnLm1pbnpvb20sXG4gICAgICAgIFwiZmlsdGVyXCI6IFsnYWxsJyxcbiAgICAgICAgICAgIFtcIj09XCIsIFwiJHR5cGVcIiwgXCJQb2ludFwiXVxuICAgICAgICBdLFxuICAgICAgICBcInBhaW50XCI6IHtcbiAgICAgICAgICAgIFwiY2lyY2xlLXJhZGl1c1wiOiBsYXllckNvbmZpZy5zdHJva2Vwb2ludHJhZGl1cyxcbiAgICAgICAgICAgIFwiY2lyY2xlLW9wYWNpdHlcIjogbGF5ZXJDb25maWcuc3Ryb2tlcG9pbnRvcGFjaXR5LFxuICAgICAgICAgICAgXCJjaXJjbGUtY29sb3JcIjogbGF5ZXJDb25maWcuc3Ryb2tlY29sb3JcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IHZpc2libGUgPyBcInZpc2libGVcIjogXCJub25lXCJcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgXCJpZFwiOiBcInNlbGVjdC1mZWF0dXJlLXBvaW50XCIsXG4gICAgICAgIFwidHlwZVwiOiBcImNpcmNsZVwiLFxuICAgICAgICBcIm1pbnpvb21cIjogbGF5ZXJDb25maWcubWluem9vbSxcbiAgICAgICAgXCJmaWx0ZXJcIjogWydhbGwnLFtcbiAgICAgICAgICAgIFwiPT1cIiwgXCIkdHlwZVwiLCBcIlBvaW50XCJcbiAgICAgICAgXSwgbm9kZUZpbHRlcl0sXG4gICAgICAgIFwicGFpbnRcIjoge1xuICAgICAgICAgICAgXCJjaXJjbGUtcmFkaXVzXCI6IGxheWVyQ29uZmlnLnBvaW50cmFkaXVzLFxuICAgICAgICAgICAgXCJjaXJjbGUtY29sb3JcIjogY29sb3JcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXlvdXRcIjoge1xuICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IHZpc2libGUgPyBcInZpc2libGVcIjogXCJub25lXCJcbiAgICAgICAgfVxuICAgIH1dO1xuICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgIGxheWVyW1wic291cmNlXCJdID0gc291cmNlO1xuICAgICAgICBpZiAoc291cmNlTGF5ZXIpIGxheWVyW1wic291cmNlLWxheWVyXCJdID0gc291cmNlTGF5ZXI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGxheWVycztcbn07XG4iXSwibmFtZXMiOlsic291cmNlIiwic291cmNlTGF5ZXIiLCJzZWxlY3RlZFJlc291cmNlSWRzIiwidmlzaWJsZSIsImNvbG9yIiwibm9kZWlkcyIsImZpbHRlcmVkTm9kZWlkcyIsImhvdmVySWQiLCJzZWxlY3RlZExheWVyQ29uZmlnIiwibGF5ZXJDb25maWciLCJkZWZhdWx0Y29sb3IiLCJzZWxlY3Rpb25Db2xvciIsInNlbGVjdGlvbmNvbG9yIiwiaG92ZXJDb2xvciIsImhvdmVyY29sb3IiLCJjb2xvclBhbGV0dGUiLCJjb2xvcnBhbGV0dGUiLCJjcmVhdGVDb2xvckV4cHJlc3Npb25zIiwiZGVmYXVsdENvbG9yIiwiY29sb3JFeHByZXNzaW9ucyIsImZvckVhY2giLCJub2RlaWQiLCJpIiwicHVzaCIsImxlbmd0aCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm5vZGVGaWx0ZXIiLCJtYXAiLCJpZCIsInNwbGljZSIsImxheWVycyIsIm1pbnpvb20iLCJmaWxsb3BhY2l0eSIsInN0cm9rZWNvbG9yIiwic3Ryb2tlbGluZXdpZHRoIiwibGluZXdpZHRoIiwic3Ryb2tlcG9pbnRyYWRpdXMiLCJzdHJva2Vwb2ludG9wYWNpdHkiLCJwb2ludHJhZGl1cyIsImxheWVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=