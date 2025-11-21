(self["webpackChunkarches_slocal"] = self["webpackChunkarches_slocal"] || []).push([[40319],{

/***/ 40319:
/*!********************************************************************************************!*\
  !*** ../../opt/venv/lib/python3.13/site-packages/arches/app/media/js/bindings/sortable.js ***!
  \********************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// knockout-sortable 0.15.0 | (c) 2016 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
(function (factory) {
  if (true) {
    // AMD anonymous module
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! knockout */ 51786), __webpack_require__(/*! jquery */ 33270), __webpack_require__(/*! jquery-ui */ 76364)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{ var ko, jQuery; }
})(function (ko, $) {
  var ITEMKEY = "ko_sortItem",
    INDEXKEY = "ko_sourceIndex",
    LISTKEY = "ko_sortList",
    PARENTKEY = "ko_parentList",
    DRAGKEY = "ko_dragItem",
    unwrap = ko.utils.unwrapObservable,
    dataGet = ko.utils.domData.get,
    dataSet = ko.utils.domData.set,
    version = $.ui && $.ui.version,
    //1.8.24 included a fix for how events were triggered in nested sortables. indexOf checks will fail if version starts with that value (0 vs. -1)
    hasNestedSortableFix = version && version.indexOf("1.6.") && version.indexOf("1.7.") && (version.indexOf("1.8.") || version === "1.8.24");

  //internal afterRender that adds meta-data to children
  var addMetaDataAfterRender = function addMetaDataAfterRender(elements, data) {
    ko.utils.arrayForEach(elements, function (element) {
      if (element.nodeType === 1) {
        dataSet(element, ITEMKEY, data);
        dataSet(element, PARENTKEY, dataGet(element.parentNode, LISTKEY));
      }
    });
  };

  //prepare the proper options for the template binding
  var prepareTemplateOptions = function prepareTemplateOptions(valueAccessor, dataName) {
    var result = {},
      options = unwrap(valueAccessor()) || {},
      actualAfterRender;

    //build our options to pass to the template engine
    if (options.data) {
      result[dataName] = options.data;
      result.name = options.template;
    } else {
      result[dataName] = valueAccessor();
    }
    ko.utils.arrayForEach(["afterAdd", "afterRender", "as", "beforeRemove", "includeDestroyed", "templateEngine", "templateOptions", "nodes"], function (option) {
      if (Object.prototype.hasOwnProperty.call(options, option)) {
        result[option] = options[option];
      } else if (Object.prototype.hasOwnProperty.call(ko.bindingHandlers.sortable, option)) {
        result[option] = ko.bindingHandlers.sortable[option];
      }
    });

    //use an afterRender function to add meta-data
    if (dataName === "foreach") {
      if (result.afterRender) {
        //wrap the existing function, if it was passed
        actualAfterRender = result.afterRender;
        result.afterRender = function (element, data) {
          addMetaDataAfterRender.call(data, element, data);
          actualAfterRender.call(data, element, data);
        };
      } else {
        result.afterRender = addMetaDataAfterRender;
      }
    }

    //return options to pass to the template binding
    return result;
  };
  var updateIndexFromDestroyedItems = function updateIndexFromDestroyedItems(index, items) {
    var unwrapped = unwrap(items);
    if (unwrapped) {
      for (var i = 0; i < index; i++) {
        //add one for every destroyed item we find before the targetIndex in the target array
        if (unwrapped[i] && unwrap(unwrapped[i]._destroy)) {
          index++;
        }
      }
    }
    return index;
  };

  //remove problematic leading/trailing whitespace from templates
  var stripTemplateWhitespace = function stripTemplateWhitespace(element, name) {
    var templateSource, templateElement;

    //process named templates
    if (name) {
      templateElement = document.getElementById(name);
      if (templateElement) {
        templateSource = new ko.templateSources.domElement(templateElement);
        templateSource.text($.trim(templateSource.text()));
      }
    } else {
      //remove leading/trailing non-elements from anonymous templates
      $(element).contents().each(function () {
        if (this && this.nodeType !== 1) {
          element.removeChild(this);
        }
      });
    }
  };

  //connect items with observableArrays
  ko.bindingHandlers.sortable = {
    init: function init(element, valueAccessor, allBindingsAccessor, data, context) {
      var $element = $(element),
        value = unwrap(valueAccessor()) || {},
        templateOptions = prepareTemplateOptions(valueAccessor, "foreach"),
        sortable = {},
        startActual,
        updateActual;
      stripTemplateWhitespace(element, templateOptions.name);

      //build a new object that has the global options with overrides from the binding
      $.extend(true, sortable, ko.bindingHandlers.sortable);
      if (value.options && sortable.options) {
        ko.utils.extend(sortable.options, value.options);
        delete value.options;
      }
      ko.utils.extend(sortable, value);

      //if allowDrop is an observable or a function, then execute it in a computed observable
      if (sortable.connectClass && (ko.isObservable(sortable.allowDrop) || typeof sortable.allowDrop == "function")) {
        ko.computed({
          read: function read() {
            var value = unwrap(sortable.allowDrop),
              shouldAdd = typeof value == "function" ? value.call(this, templateOptions.foreach) : value;
            ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, shouldAdd);
          },
          disposeWhenNodeIsRemoved: element
        }, this);
      } else {
        ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, sortable.allowDrop);
      }

      //wrap the template binding
      ko.bindingHandlers.template.init(element, function () {
        return templateOptions;
      }, allBindingsAccessor, data, context);

      //keep a reference to start/update functions that might have been passed in
      startActual = sortable.options.start;
      updateActual = sortable.options.update;

      //ensure draggable table row cells maintain their width while dragging (unless a helper is provided)
      if (!sortable.options.helper) {
        sortable.options.helper = function (e, ui) {
          if (ui.is("tr")) {
            ui.children().each(function () {
              $(this).width($(this).width());
            });
          }
          return ui;
        };
      }

      //initialize sortable binding after template binding has rendered in update function
      var createTimeout = setTimeout(function () {
        var dragItem;
        var originalReceive = sortable.options.receive;
        $element.sortable(ko.utils.extend(sortable.options, {
          start: function start(event, ui) {
            //track original index
            var el = ui.item[0];
            dataSet(el, INDEXKEY, ko.utils.arrayIndexOf(ui.item.parent().children(), el));

            //make sure that fields have a chance to update model
            ui.item.find("input:focus").change();
            if (startActual) {
              startActual.apply(this, arguments);
            }
          },
          receive: function receive(event, ui) {
            //optionally apply an existing receive handler
            if (typeof originalReceive === "function") {
              originalReceive.call(this, event, ui);
            }
            dragItem = dataGet(ui.item[0], DRAGKEY);
            if (dragItem) {
              //copy the model item, if a clone option is provided
              if (dragItem.clone) {
                dragItem = dragItem.clone();
              }

              //configure a handler to potentially manipulate item before drop
              if (sortable.dragged) {
                dragItem = sortable.dragged.call(this, dragItem, event, ui) || dragItem;
              }
            }
          },
          update: function update(event, ui) {
            var sourceParent,
              targetParent,
              sourceIndex,
              targetIndex,
              arg,
              el = ui.item[0],
              parentEl = ui.item.parent()[0],
              item = dataGet(el, ITEMKEY) || dragItem;
            if (!item) {
              $(el).remove();
            }
            dragItem = null;

            //make sure that moves only run once, as update fires on multiple containers
            if (item && this === parentEl || !hasNestedSortableFix && $.contains(this, parentEl)) {
              //identify parents
              sourceParent = dataGet(el, PARENTKEY);
              sourceIndex = dataGet(el, INDEXKEY);
              targetParent = dataGet(el.parentNode, LISTKEY);
              targetIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), el);

              //take destroyed items into consideration
              if (!templateOptions.includeDestroyed) {
                sourceIndex = updateIndexFromDestroyedItems(sourceIndex, sourceParent);
                targetIndex = updateIndexFromDestroyedItems(targetIndex, targetParent);
              }

              //build up args for the callbacks
              if (sortable.beforeMove || sortable.afterMove) {
                arg = {
                  item: item,
                  sourceParent: sourceParent,
                  sourceParentNode: sourceParent && ui.sender || el.parentNode,
                  sourceIndex: sourceIndex,
                  targetParent: targetParent,
                  targetIndex: targetIndex,
                  cancelDrop: false
                };

                //execute the configured callback prior to actually moving items
                if (sortable.beforeMove) {
                  sortable.beforeMove.call(this, arg, event, ui);
                }
              }

              //call cancel on the correct list, so KO can take care of DOM manipulation
              if (sourceParent && !sortable.addToSelf) {
                $(sourceParent === targetParent ? this : ui.sender || this).sortable("cancel");
              }
              //for a draggable item just remove the element
              else {
                $(el).remove();
              }

              //if beforeMove told us to cancel, then we are done
              if (arg && arg.cancelDrop) {
                return;
              }

              //if the strategy option is unset or false, employ the order strategy involving removal and insertion of items
              if (!Object.prototype.hasOwnProperty.call(sortable, "strategyMove") || sortable.strategyMove === false) {
                //do the actual move
                if (targetIndex >= 0) {
                  if (sourceParent) {
                    sourceParent.splice(sourceIndex, 1);

                    //if using deferred updates plugin, force updates
                    if (ko.processAllDeferredBindingUpdates) {
                      ko.processAllDeferredBindingUpdates();
                    }

                    //if using deferred updates on knockout 3.4, force updates
                    if (ko.options && ko.options.deferUpdates) {
                      ko.tasks.runEarly();
                    }
                  }
                  targetParent.splice(targetIndex, 0, item);
                }

                //rendering is handled by manipulating the observableArray; ignore dropped element
                dataSet(el, ITEMKEY, null);
              } else {
                //employ the strategy of moving items
                if (targetIndex >= 0) {
                  if (sourceParent) {
                    if (sourceParent !== targetParent) {
                      // moving from one list to another

                      sourceParent.splice(sourceIndex, 1);
                      targetParent.splice(targetIndex, 0, item);

                      //rendering is handled by manipulating the observableArray; ignore dropped element
                      dataSet(el, ITEMKEY, null);
                      ui.item.remove();
                    } else {
                      // moving within same list
                      var underlyingList = unwrap(sourceParent);

                      // notify 'beforeChange' subscribers
                      if (sourceParent.valueWillMutate) {
                        sourceParent.valueWillMutate();
                      }

                      // move from source index ...
                      underlyingList.splice(sourceIndex, 1);
                      // ... to target index
                      underlyingList.splice(targetIndex, 0, item);

                      // notify subscribers
                      if (sourceParent.valueHasMutated) {
                        sourceParent.valueHasMutated();
                      }
                    }
                  } else {
                    // drop new element from outside
                    targetParent.splice(targetIndex, 0, item);

                    //rendering is handled by manipulating the observableArray; ignore dropped element
                    dataSet(el, ITEMKEY, null);
                    ui.item.remove();
                  }
                }
              }

              //if using deferred updates plugin, force updates
              if (ko.processAllDeferredBindingUpdates) {
                ko.processAllDeferredBindingUpdates();
              }

              //allow binding to accept a function to execute after moving the item
              if (sortable.afterMove) {
                sortable.afterMove.call(this, arg, event, ui);
              }
            }
            if (updateActual) {
              updateActual.apply(this, arguments);
            }
          },
          connectWith: sortable.connectClass ? "." + sortable.connectClass : false
        }));

        //handle enabling/disabling sorting
        if (sortable.isEnabled !== undefined) {
          ko.computed({
            read: function read() {
              $element.sortable(unwrap(sortable.isEnabled) ? "enable" : "disable");
            },
            disposeWhenNodeIsRemoved: element
          });
        }
      }, 0);

      //handle disposal
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        //only call destroy if sortable has been created
        if ($element.data("ui-sortable") || $element.data("sortable")) {
          $element.sortable("destroy");
        }
        ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, false);

        //do not create the sortable if the element has been removed from DOM
        clearTimeout(createTimeout);
      });
      return {
        'controlsDescendantBindings': true
      };
    },
    update: function update(element, valueAccessor, allBindingsAccessor, data, context) {
      var templateOptions = prepareTemplateOptions(valueAccessor, "foreach");

      //attach meta-data
      dataSet(element, LISTKEY, templateOptions.foreach);

      //call template binding's update with correct options
      ko.bindingHandlers.template.update(element, function () {
        return templateOptions;
      }, allBindingsAccessor, data, context);
    },
    connectClass: 'ko_container',
    allowDrop: true,
    afterMove: null,
    beforeMove: null,
    options: {}
  };

  //create a draggable that is appropriate for dropping into a sortable
  ko.bindingHandlers.draggable = {
    init: function init(element, valueAccessor, allBindingsAccessor, data, context) {
      var value = unwrap(valueAccessor()) || {},
        options = value.options || {},
        draggableOptions = ko.utils.extend({}, ko.bindingHandlers.draggable.options),
        templateOptions = prepareTemplateOptions(valueAccessor, "data"),
        connectClass = value.connectClass || ko.bindingHandlers.draggable.connectClass,
        isEnabled = value.isEnabled !== undefined ? value.isEnabled : ko.bindingHandlers.draggable.isEnabled;
      value = "data" in value ? value.data : value;

      //set meta-data
      dataSet(element, DRAGKEY, value);

      //override global options with override options passed in
      ko.utils.extend(draggableOptions, options);

      //setup connection to a sortable
      draggableOptions.connectToSortable = connectClass ? "." + connectClass : false;

      //initialize draggable
      $(element).draggable(draggableOptions);

      //handle enabling/disabling sorting
      if (isEnabled !== undefined) {
        ko.computed({
          read: function read() {
            $(element).draggable(unwrap(isEnabled) ? "enable" : "disable");
          },
          disposeWhenNodeIsRemoved: element
        });
      }

      //handle disposal
      ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        $(element).draggable("destroy");
      });
      return ko.bindingHandlers.template.init(element, function () {
        return templateOptions;
      }, allBindingsAccessor, data, context);
    },
    update: function update(element, valueAccessor, allBindingsAccessor, data, context) {
      var templateOptions = prepareTemplateOptions(valueAccessor, "data");
      return ko.bindingHandlers.template.update(element, function () {
        return templateOptions;
      }, allBindingsAccessor, data, context);
    },
    connectClass: ko.bindingHandlers.sortable.connectClass,
    options: {
      helper: "clone"
    }
  };
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2NvbW1vbnMuNjRiYjlkNWZhMDY2YjVhOTBkNDYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxDQUFDLFVBQVNBLE9BQU8sRUFBRTtFQUNmLElBQUksSUFBMEMsRUFBRTtJQUM1QztJQUNBQyxpQ0FBTyxDQUFDLDBDQUFVLEVBQUUsd0NBQVEsRUFBRSwyQ0FBVyxDQUFDLG9DQUFFRCxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0VBQ3hELENBQUMsTUFBTTtBQUFBLG1CQVVOO0FBQ0wsQ0FBQyxFQUFFLFVBQVNPLEVBQUUsRUFBRUcsQ0FBQyxFQUFFO0VBQ2YsSUFBSUMsT0FBTyxHQUFHLGFBQWE7SUFDdkJDLFFBQVEsR0FBRyxnQkFBZ0I7SUFDM0JDLE9BQU8sR0FBRyxhQUFhO0lBQ3ZCQyxTQUFTLEdBQUcsZUFBZTtJQUMzQkMsT0FBTyxHQUFHLGFBQWE7SUFDdkJDLE1BQU0sR0FBR1QsRUFBRSxDQUFDVSxLQUFLLENBQUNDLGdCQUFnQjtJQUNsQ0MsT0FBTyxHQUFHWixFQUFFLENBQUNVLEtBQUssQ0FBQ0csT0FBTyxDQUFDQyxHQUFHO0lBQzlCQyxPQUFPLEdBQUdmLEVBQUUsQ0FBQ1UsS0FBSyxDQUFDRyxPQUFPLENBQUNHLEdBQUc7SUFDOUJDLE9BQU8sR0FBR2QsQ0FBQyxDQUFDZSxFQUFFLElBQUlmLENBQUMsQ0FBQ2UsRUFBRSxDQUFDRCxPQUFPO0lBQzlCO0lBQ0FFLG9CQUFvQixHQUFHRixPQUFPLElBQUlBLE9BQU8sQ0FBQ0csT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJSCxPQUFPLENBQUNHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBS0gsT0FBTyxDQUFDRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUlILE9BQU8sS0FBSyxRQUFRLENBQUM7O0VBRTdJO0VBQ0EsSUFBSUksc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBWUMsUUFBUSxFQUFFQyxJQUFJLEVBQUU7SUFDbER2QixFQUFFLENBQUNVLEtBQUssQ0FBQ2MsWUFBWSxDQUFDRixRQUFRLEVBQUUsVUFBU0csT0FBTyxFQUFFO01BQzlDLElBQUlBLE9BQU8sQ0FBQ0MsUUFBUSxLQUFLLENBQUMsRUFBRTtRQUN4QlgsT0FBTyxDQUFDVSxPQUFPLEVBQUVyQixPQUFPLEVBQUVtQixJQUFJLENBQUM7UUFDL0JSLE9BQU8sQ0FBQ1UsT0FBTyxFQUFFbEIsU0FBUyxFQUFFSyxPQUFPLENBQUNhLE9BQU8sQ0FBQ0UsVUFBVSxFQUFFckIsT0FBTyxDQUFDLENBQUM7TUFDckU7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDOztFQUVEO0VBQ0EsSUFBSXNCLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQVlDLGFBQWEsRUFBRUMsUUFBUSxFQUFFO0lBQzNELElBQUlDLE1BQU0sR0FBRyxDQUFDLENBQUM7TUFDWEMsT0FBTyxHQUFHdkIsTUFBTSxDQUFDb0IsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUN2Q0ksaUJBQWlCOztJQUVyQjtJQUNBLElBQUlELE9BQU8sQ0FBQ1QsSUFBSSxFQUFFO01BQ2RRLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDLEdBQUdFLE9BQU8sQ0FBQ1QsSUFBSTtNQUMvQlEsTUFBTSxDQUFDRyxJQUFJLEdBQUdGLE9BQU8sQ0FBQ0csUUFBUTtJQUNsQyxDQUFDLE1BQU07TUFDSEosTUFBTSxDQUFDRCxRQUFRLENBQUMsR0FBR0QsYUFBYSxDQUFDLENBQUM7SUFDdEM7SUFFQTdCLEVBQUUsQ0FBQ1UsS0FBSyxDQUFDYyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEVBQUUsVUFBU1ksTUFBTSxFQUFFO01BQ3hKLElBQUlDLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxjQUFjLENBQUNDLElBQUksQ0FBQ1IsT0FBTyxFQUFFSSxNQUFNLENBQUMsRUFBRTtRQUN2REwsTUFBTSxDQUFDSyxNQUFNLENBQUMsR0FBR0osT0FBTyxDQUFDSSxNQUFNLENBQUM7TUFDcEMsQ0FBQyxNQUFNLElBQUlDLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxjQUFjLENBQUNDLElBQUksQ0FBQ3hDLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQ0MsUUFBUSxFQUFFTixNQUFNLENBQUMsRUFBRTtRQUNsRkwsTUFBTSxDQUFDSyxNQUFNLENBQUMsR0FBR3BDLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQ0MsUUFBUSxDQUFDTixNQUFNLENBQUM7TUFDeEQ7SUFDSixDQUFDLENBQUM7O0lBRUY7SUFDQSxJQUFJTixRQUFRLEtBQUssU0FBUyxFQUFFO01BQ3hCLElBQUlDLE1BQU0sQ0FBQ1ksV0FBVyxFQUFFO1FBQ3BCO1FBQ0FWLGlCQUFpQixHQUFHRixNQUFNLENBQUNZLFdBQVc7UUFDdENaLE1BQU0sQ0FBQ1ksV0FBVyxHQUFHLFVBQVNsQixPQUFPLEVBQUVGLElBQUksRUFBRTtVQUN6Q0Ysc0JBQXNCLENBQUNtQixJQUFJLENBQUNqQixJQUFJLEVBQUVFLE9BQU8sRUFBRUYsSUFBSSxDQUFDO1VBQ2hEVSxpQkFBaUIsQ0FBQ08sSUFBSSxDQUFDakIsSUFBSSxFQUFFRSxPQUFPLEVBQUVGLElBQUksQ0FBQztRQUMvQyxDQUFDO01BQ0wsQ0FBQyxNQUFNO1FBQ0hRLE1BQU0sQ0FBQ1ksV0FBVyxHQUFHdEIsc0JBQXNCO01BQy9DO0lBQ0o7O0lBRUE7SUFDQSxPQUFPVSxNQUFNO0VBQ2pCLENBQUM7RUFFRCxJQUFJYSw2QkFBNkIsR0FBRyxTQUFoQ0EsNkJBQTZCQSxDQUFZQyxLQUFLLEVBQUVDLEtBQUssRUFBRTtJQUN2RCxJQUFJQyxTQUFTLEdBQUd0QyxNQUFNLENBQUNxQyxLQUFLLENBQUM7SUFFN0IsSUFBSUMsU0FBUyxFQUFFO01BQ1gsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdILEtBQUssRUFBRUcsQ0FBQyxFQUFFLEVBQUU7UUFDNUI7UUFDQSxJQUFJRCxTQUFTLENBQUNDLENBQUMsQ0FBQyxJQUFJdkMsTUFBTSxDQUFDc0MsU0FBUyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLEVBQUU7VUFDL0NKLEtBQUssRUFBRTtRQUNYO01BQ0o7SUFDSjtJQUVBLE9BQU9BLEtBQUs7RUFDaEIsQ0FBQzs7RUFFRDtFQUNBLElBQUlLLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBdUJBLENBQVl6QixPQUFPLEVBQUVTLElBQUksRUFBRTtJQUNsRCxJQUFJaUIsY0FBYyxFQUNkQyxlQUFlOztJQUVuQjtJQUNBLElBQUlsQixJQUFJLEVBQUU7TUFDTmtCLGVBQWUsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUNwQixJQUFJLENBQUM7TUFDL0MsSUFBSWtCLGVBQWUsRUFBRTtRQUNqQkQsY0FBYyxHQUFHLElBQUluRCxFQUFFLENBQUN1RCxlQUFlLENBQUNDLFVBQVUsQ0FBQ0osZUFBZSxDQUFDO1FBQ25FRCxjQUFjLENBQUNNLElBQUksQ0FBQ3RELENBQUMsQ0FBQ3VELElBQUksQ0FBQ1AsY0FBYyxDQUFDTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdEQ7SUFDSixDQUFDLE1BQ0k7TUFDRDtNQUNBdEQsQ0FBQyxDQUFDc0IsT0FBTyxDQUFDLENBQUNrQyxRQUFRLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsWUFBVztRQUNsQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUNsQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1VBQzdCRCxPQUFPLENBQUNvQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQzdCO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFDSixDQUFDOztFQUVEO0VBQ0E3RCxFQUFFLENBQUN5QyxlQUFlLENBQUNDLFFBQVEsR0FBRztJQUMxQm9CLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFXckMsT0FBTyxFQUFFSSxhQUFhLEVBQUVrQyxtQkFBbUIsRUFBRXhDLElBQUksRUFBRXlDLE9BQU8sRUFBRTtNQUN2RSxJQUFJQyxRQUFRLEdBQUc5RCxDQUFDLENBQUNzQixPQUFPLENBQUM7UUFDckJ5QyxLQUFLLEdBQUd6RCxNQUFNLENBQUNvQixhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDc0MsZUFBZSxHQUFHdkMsc0JBQXNCLENBQUNDLGFBQWEsRUFBRSxTQUFTLENBQUM7UUFDbEVhLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYjBCLFdBQVc7UUFBRUMsWUFBWTtNQUU3Qm5CLHVCQUF1QixDQUFDekIsT0FBTyxFQUFFMEMsZUFBZSxDQUFDakMsSUFBSSxDQUFDOztNQUV0RDtNQUNBL0IsQ0FBQyxDQUFDbUUsTUFBTSxDQUFDLElBQUksRUFBRTVCLFFBQVEsRUFBRTFDLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQ0MsUUFBUSxDQUFDO01BQ3JELElBQUl3QixLQUFLLENBQUNsQyxPQUFPLElBQUlVLFFBQVEsQ0FBQ1YsT0FBTyxFQUFFO1FBQ25DaEMsRUFBRSxDQUFDVSxLQUFLLENBQUM0RCxNQUFNLENBQUM1QixRQUFRLENBQUNWLE9BQU8sRUFBRWtDLEtBQUssQ0FBQ2xDLE9BQU8sQ0FBQztRQUNoRCxPQUFPa0MsS0FBSyxDQUFDbEMsT0FBTztNQUN4QjtNQUNBaEMsRUFBRSxDQUFDVSxLQUFLLENBQUM0RCxNQUFNLENBQUM1QixRQUFRLEVBQUV3QixLQUFLLENBQUM7O01BRWhDO01BQ0EsSUFBSXhCLFFBQVEsQ0FBQzZCLFlBQVksS0FBS3ZFLEVBQUUsQ0FBQ3dFLFlBQVksQ0FBQzlCLFFBQVEsQ0FBQytCLFNBQVMsQ0FBQyxJQUFJLE9BQU8vQixRQUFRLENBQUMrQixTQUFTLElBQUksVUFBVSxDQUFDLEVBQUU7UUFDM0d6RSxFQUFFLENBQUMwRSxRQUFRLENBQUM7VUFDUkMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBYTtZQUNiLElBQUlULEtBQUssR0FBR3pELE1BQU0sQ0FBQ2lDLFFBQVEsQ0FBQytCLFNBQVMsQ0FBQztjQUNsQ0csU0FBUyxHQUFHLE9BQU9WLEtBQUssSUFBSSxVQUFVLEdBQUdBLEtBQUssQ0FBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUUyQixlQUFlLENBQUNVLE9BQU8sQ0FBQyxHQUFHWCxLQUFLO1lBQzlGbEUsRUFBRSxDQUFDVSxLQUFLLENBQUNvRSxxQkFBcUIsQ0FBQ3JELE9BQU8sRUFBRWlCLFFBQVEsQ0FBQzZCLFlBQVksRUFBRUssU0FBUyxDQUFDO1VBQzdFLENBQUM7VUFDREcsd0JBQXdCLEVBQUV0RDtRQUM5QixDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1osQ0FBQyxNQUFNO1FBQ0h6QixFQUFFLENBQUNVLEtBQUssQ0FBQ29FLHFCQUFxQixDQUFDckQsT0FBTyxFQUFFaUIsUUFBUSxDQUFDNkIsWUFBWSxFQUFFN0IsUUFBUSxDQUFDK0IsU0FBUyxDQUFDO01BQ3RGOztNQUVBO01BQ0F6RSxFQUFFLENBQUN5QyxlQUFlLENBQUNOLFFBQVEsQ0FBQzJCLElBQUksQ0FBQ3JDLE9BQU8sRUFBRSxZQUFXO1FBQUUsT0FBTzBDLGVBQWU7TUFBRSxDQUFDLEVBQUVKLG1CQUFtQixFQUFFeEMsSUFBSSxFQUFFeUMsT0FBTyxDQUFDOztNQUVySDtNQUNBSSxXQUFXLEdBQUcxQixRQUFRLENBQUNWLE9BQU8sQ0FBQ2dELEtBQUs7TUFDcENYLFlBQVksR0FBRzNCLFFBQVEsQ0FBQ1YsT0FBTyxDQUFDaUQsTUFBTTs7TUFFdEM7TUFDQSxJQUFLLENBQUN2QyxRQUFRLENBQUNWLE9BQU8sQ0FBQ2tELE1BQU0sRUFBRztRQUM1QnhDLFFBQVEsQ0FBQ1YsT0FBTyxDQUFDa0QsTUFBTSxHQUFHLFVBQVNDLENBQUMsRUFBRWpFLEVBQUUsRUFBRTtVQUN0QyxJQUFJQSxFQUFFLENBQUNrRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDYmxFLEVBQUUsQ0FBQ21FLFFBQVEsQ0FBQyxDQUFDLENBQUN6QixJQUFJLENBQUMsWUFBVztjQUMxQnpELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ21GLEtBQUssQ0FBQ25GLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ21GLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDO1VBQ047VUFDQSxPQUFPcEUsRUFBRTtRQUNiLENBQUM7TUFDTDs7TUFFQTtNQUNBLElBQUlxRSxhQUFhLEdBQUdDLFVBQVUsQ0FBQyxZQUFXO1FBQ3RDLElBQUlDLFFBQVE7UUFDWixJQUFJQyxlQUFlLEdBQUdoRCxRQUFRLENBQUNWLE9BQU8sQ0FBQzJELE9BQU87UUFFOUMxQixRQUFRLENBQUN2QixRQUFRLENBQUMxQyxFQUFFLENBQUNVLEtBQUssQ0FBQzRELE1BQU0sQ0FBQzVCLFFBQVEsQ0FBQ1YsT0FBTyxFQUFFO1VBQ2hEZ0QsS0FBSyxFQUFFLFNBQVBBLEtBQUtBLENBQVdZLEtBQUssRUFBRTFFLEVBQUUsRUFBRTtZQUN2QjtZQUNBLElBQUkyRSxFQUFFLEdBQUczRSxFQUFFLENBQUM0RSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CL0UsT0FBTyxDQUFDOEUsRUFBRSxFQUFFeEYsUUFBUSxFQUFFTCxFQUFFLENBQUNVLEtBQUssQ0FBQ3FGLFlBQVksQ0FBQzdFLEVBQUUsQ0FBQzRFLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQ1gsUUFBUSxDQUFDLENBQUMsRUFBRVEsRUFBRSxDQUFDLENBQUM7O1lBRTdFO1lBQ0EzRSxFQUFFLENBQUM0RSxJQUFJLENBQUNHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7WUFDcEMsSUFBSTlCLFdBQVcsRUFBRTtjQUNiQSxXQUFXLENBQUMrQixLQUFLLENBQUMsSUFBSSxFQUFFQyxTQUFTLENBQUM7WUFDdEM7VUFDSixDQUFDO1VBQ0RULE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFXQyxLQUFLLEVBQUUxRSxFQUFFLEVBQUU7WUFDekI7WUFDQSxJQUFJLE9BQU93RSxlQUFlLEtBQUssVUFBVSxFQUFFO2NBQ3ZDQSxlQUFlLENBQUNsRCxJQUFJLENBQUMsSUFBSSxFQUFFb0QsS0FBSyxFQUFFMUUsRUFBRSxDQUFDO1lBQ3pDO1lBRUF1RSxRQUFRLEdBQUc3RSxPQUFPLENBQUNNLEVBQUUsQ0FBQzRFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRXRGLE9BQU8sQ0FBQztZQUN2QyxJQUFJaUYsUUFBUSxFQUFFO2NBQ1Y7Y0FDQSxJQUFJQSxRQUFRLENBQUNZLEtBQUssRUFBRTtnQkFDaEJaLFFBQVEsR0FBR0EsUUFBUSxDQUFDWSxLQUFLLENBQUMsQ0FBQztjQUMvQjs7Y0FFQTtjQUNBLElBQUkzRCxRQUFRLENBQUM0RCxPQUFPLEVBQUU7Z0JBQ2xCYixRQUFRLEdBQUcvQyxRQUFRLENBQUM0RCxPQUFPLENBQUM5RCxJQUFJLENBQUMsSUFBSSxFQUFFaUQsUUFBUSxFQUFFRyxLQUFLLEVBQUUxRSxFQUFFLENBQUMsSUFBSXVFLFFBQVE7Y0FDM0U7WUFDSjtVQUNKLENBQUM7VUFDRFIsTUFBTSxFQUFFLFNBQVJBLE1BQU1BLENBQVdXLEtBQUssRUFBRTFFLEVBQUUsRUFBRTtZQUN4QixJQUFJcUYsWUFBWTtjQUFFQyxZQUFZO2NBQUVDLFdBQVc7Y0FBRUMsV0FBVztjQUFFQyxHQUFHO2NBQ3pEZCxFQUFFLEdBQUczRSxFQUFFLENBQUM0RSxJQUFJLENBQUMsQ0FBQyxDQUFDO2NBQ2ZjLFFBQVEsR0FBRzFGLEVBQUUsQ0FBQzRFLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDOUJGLElBQUksR0FBR2xGLE9BQU8sQ0FBQ2lGLEVBQUUsRUFBRXpGLE9BQU8sQ0FBQyxJQUFJcUYsUUFBUTtZQUUzQyxJQUFJLENBQUNLLElBQUksRUFBRTtjQUNQM0YsQ0FBQyxDQUFDMEYsRUFBRSxDQUFDLENBQUNnQixNQUFNLENBQUMsQ0FBQztZQUNsQjtZQUNBcEIsUUFBUSxHQUFHLElBQUk7O1lBRWY7WUFDQSxJQUFJSyxJQUFJLElBQUssSUFBSSxLQUFLYyxRQUFTLElBQUssQ0FBQ3pGLG9CQUFvQixJQUFJaEIsQ0FBQyxDQUFDMkcsUUFBUSxDQUFDLElBQUksRUFBRUYsUUFBUSxDQUFFLEVBQUU7Y0FDdEY7Y0FDQUwsWUFBWSxHQUFHM0YsT0FBTyxDQUFDaUYsRUFBRSxFQUFFdEYsU0FBUyxDQUFDO2NBQ3JDa0csV0FBVyxHQUFHN0YsT0FBTyxDQUFDaUYsRUFBRSxFQUFFeEYsUUFBUSxDQUFDO2NBQ25DbUcsWUFBWSxHQUFHNUYsT0FBTyxDQUFDaUYsRUFBRSxDQUFDbEUsVUFBVSxFQUFFckIsT0FBTyxDQUFDO2NBQzlDb0csV0FBVyxHQUFHMUcsRUFBRSxDQUFDVSxLQUFLLENBQUNxRixZQUFZLENBQUM3RSxFQUFFLENBQUM0RSxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUNYLFFBQVEsQ0FBQyxDQUFDLEVBQUVRLEVBQUUsQ0FBQzs7Y0FFcEU7Y0FDQSxJQUFJLENBQUMxQixlQUFlLENBQUM0QyxnQkFBZ0IsRUFBRTtnQkFDbkNOLFdBQVcsR0FBRzdELDZCQUE2QixDQUFDNkQsV0FBVyxFQUFFRixZQUFZLENBQUM7Z0JBQ3RFRyxXQUFXLEdBQUc5RCw2QkFBNkIsQ0FBQzhELFdBQVcsRUFBRUYsWUFBWSxDQUFDO2NBQzFFOztjQUVBO2NBQ0EsSUFBSTlELFFBQVEsQ0FBQ3NFLFVBQVUsSUFBSXRFLFFBQVEsQ0FBQ3VFLFNBQVMsRUFBRTtnQkFDM0NOLEdBQUcsR0FBRztrQkFDRmIsSUFBSSxFQUFFQSxJQUFJO2tCQUNWUyxZQUFZLEVBQUVBLFlBQVk7a0JBQzFCVyxnQkFBZ0IsRUFBRVgsWUFBWSxJQUFJckYsRUFBRSxDQUFDaUcsTUFBTSxJQUFJdEIsRUFBRSxDQUFDbEUsVUFBVTtrQkFDNUQ4RSxXQUFXLEVBQUVBLFdBQVc7a0JBQ3hCRCxZQUFZLEVBQUVBLFlBQVk7a0JBQzFCRSxXQUFXLEVBQUVBLFdBQVc7a0JBQ3hCVSxVQUFVLEVBQUU7Z0JBQ2hCLENBQUM7O2dCQUVEO2dCQUNBLElBQUkxRSxRQUFRLENBQUNzRSxVQUFVLEVBQUU7a0JBQ3JCdEUsUUFBUSxDQUFDc0UsVUFBVSxDQUFDeEUsSUFBSSxDQUFDLElBQUksRUFBRW1FLEdBQUcsRUFBRWYsS0FBSyxFQUFFMUUsRUFBRSxDQUFDO2dCQUNsRDtjQUNKOztjQUVBO2NBQ0EsSUFBSXFGLFlBQVksSUFBSSxDQUFDN0QsUUFBUSxDQUFDMkUsU0FBUyxFQUFFO2dCQUNyQ2xILENBQUMsQ0FBQ29HLFlBQVksS0FBS0MsWUFBWSxHQUFHLElBQUksR0FBR3RGLEVBQUUsQ0FBQ2lHLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQ3pFLFFBQVEsQ0FBQyxRQUFRLENBQUM7Y0FDbEY7Y0FDQTtjQUFBLEtBQ0s7Z0JBQ0R2QyxDQUFDLENBQUMwRixFQUFFLENBQUMsQ0FBQ2dCLE1BQU0sQ0FBQyxDQUFDO2NBQ2xCOztjQUVBO2NBQ0EsSUFBSUYsR0FBRyxJQUFJQSxHQUFHLENBQUNTLFVBQVUsRUFBRTtnQkFDdkI7Y0FDSjs7Y0FFQTtjQUNBLElBQUksQ0FBQy9FLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxjQUFjLENBQUNDLElBQUksQ0FBQ0UsUUFBUSxFQUFFLGNBQWMsQ0FBQyxJQUFJQSxRQUFRLENBQUM0RSxZQUFZLEtBQUssS0FBSyxFQUFFO2dCQUNwRztnQkFDQSxJQUFJWixXQUFXLElBQUksQ0FBQyxFQUFFO2tCQUNsQixJQUFJSCxZQUFZLEVBQUU7b0JBQ2RBLFlBQVksQ0FBQ2dCLE1BQU0sQ0FBQ2QsV0FBVyxFQUFFLENBQUMsQ0FBQzs7b0JBRW5DO29CQUNBLElBQUl6RyxFQUFFLENBQUN3SCxnQ0FBZ0MsRUFBRTtzQkFDckN4SCxFQUFFLENBQUN3SCxnQ0FBZ0MsQ0FBQyxDQUFDO29CQUN6Qzs7b0JBRUE7b0JBQ0EsSUFBSXhILEVBQUUsQ0FBQ2dDLE9BQU8sSUFBSWhDLEVBQUUsQ0FBQ2dDLE9BQU8sQ0FBQ3lGLFlBQVksRUFBRTtzQkFDdkN6SCxFQUFFLENBQUMwSCxLQUFLLENBQUNDLFFBQVEsQ0FBQyxDQUFDO29CQUN2QjtrQkFDSjtrQkFFQW5CLFlBQVksQ0FBQ2UsTUFBTSxDQUFDYixXQUFXLEVBQUUsQ0FBQyxFQUFFWixJQUFJLENBQUM7Z0JBQzdDOztnQkFFQTtnQkFDQS9FLE9BQU8sQ0FBQzhFLEVBQUUsRUFBRXpGLE9BQU8sRUFBRSxJQUFJLENBQUM7Y0FDOUIsQ0FBQyxNQUNJO2dCQUFFO2dCQUNILElBQUlzRyxXQUFXLElBQUksQ0FBQyxFQUFFO2tCQUNsQixJQUFJSCxZQUFZLEVBQUU7b0JBQ2QsSUFBSUEsWUFBWSxLQUFLQyxZQUFZLEVBQUU7c0JBQy9COztzQkFFQUQsWUFBWSxDQUFDZ0IsTUFBTSxDQUFDZCxXQUFXLEVBQUUsQ0FBQyxDQUFDO3NCQUNuQ0QsWUFBWSxDQUFDZSxNQUFNLENBQUNiLFdBQVcsRUFBRSxDQUFDLEVBQUVaLElBQUksQ0FBQzs7c0JBRXpDO3NCQUNBL0UsT0FBTyxDQUFDOEUsRUFBRSxFQUFFekYsT0FBTyxFQUFFLElBQUksQ0FBQztzQkFDMUJjLEVBQUUsQ0FBQzRFLElBQUksQ0FBQ2UsTUFBTSxDQUFDLENBQUM7b0JBQ3BCLENBQUMsTUFDSTtzQkFDRDtzQkFDQSxJQUFJZSxjQUFjLEdBQUduSCxNQUFNLENBQUM4RixZQUFZLENBQUM7O3NCQUV6QztzQkFDQSxJQUFJQSxZQUFZLENBQUNzQixlQUFlLEVBQUU7d0JBQzlCdEIsWUFBWSxDQUFDc0IsZUFBZSxDQUFDLENBQUM7c0JBQ2xDOztzQkFFQTtzQkFDQUQsY0FBYyxDQUFDTCxNQUFNLENBQUNkLFdBQVcsRUFBRSxDQUFDLENBQUM7c0JBQ3JDO3NCQUNBbUIsY0FBYyxDQUFDTCxNQUFNLENBQUNiLFdBQVcsRUFBRSxDQUFDLEVBQUVaLElBQUksQ0FBQzs7c0JBRTNDO3NCQUNBLElBQUlTLFlBQVksQ0FBQ3VCLGVBQWUsRUFBRTt3QkFDOUJ2QixZQUFZLENBQUN1QixlQUFlLENBQUMsQ0FBQztzQkFDbEM7b0JBQ0o7a0JBQ0osQ0FBQyxNQUNJO29CQUNEO29CQUNBdEIsWUFBWSxDQUFDZSxNQUFNLENBQUNiLFdBQVcsRUFBRSxDQUFDLEVBQUVaLElBQUksQ0FBQzs7b0JBRXpDO29CQUNBL0UsT0FBTyxDQUFDOEUsRUFBRSxFQUFFekYsT0FBTyxFQUFFLElBQUksQ0FBQztvQkFDMUJjLEVBQUUsQ0FBQzRFLElBQUksQ0FBQ2UsTUFBTSxDQUFDLENBQUM7a0JBQ3BCO2dCQUNKO2NBQ0o7O2NBRUE7Y0FDQSxJQUFJN0csRUFBRSxDQUFDd0gsZ0NBQWdDLEVBQUU7Z0JBQ3JDeEgsRUFBRSxDQUFDd0gsZ0NBQWdDLENBQUMsQ0FBQztjQUN6Qzs7Y0FFQTtjQUNBLElBQUk5RSxRQUFRLENBQUN1RSxTQUFTLEVBQUU7Z0JBQ3BCdkUsUUFBUSxDQUFDdUUsU0FBUyxDQUFDekUsSUFBSSxDQUFDLElBQUksRUFBRW1FLEdBQUcsRUFBRWYsS0FBSyxFQUFFMUUsRUFBRSxDQUFDO2NBQ2pEO1lBQ0o7WUFFQSxJQUFJbUQsWUFBWSxFQUFFO2NBQ2RBLFlBQVksQ0FBQzhCLEtBQUssQ0FBQyxJQUFJLEVBQUVDLFNBQVMsQ0FBQztZQUN2QztVQUNKLENBQUM7VUFDRDJCLFdBQVcsRUFBRXJGLFFBQVEsQ0FBQzZCLFlBQVksR0FBRyxHQUFHLEdBQUc3QixRQUFRLENBQUM2QixZQUFZLEdBQUc7UUFDdkUsQ0FBQyxDQUFDLENBQUM7O1FBRUg7UUFDQSxJQUFJN0IsUUFBUSxDQUFDc0YsU0FBUyxLQUFLQyxTQUFTLEVBQUU7VUFDbENqSSxFQUFFLENBQUMwRSxRQUFRLENBQUM7WUFDUkMsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUEsRUFBYTtjQUNiVixRQUFRLENBQUN2QixRQUFRLENBQUNqQyxNQUFNLENBQUNpQyxRQUFRLENBQUNzRixTQUFTLENBQUMsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQ3hFLENBQUM7WUFDRGpELHdCQUF3QixFQUFFdEQ7VUFDOUIsQ0FBQyxDQUFDO1FBQ047TUFDSixDQUFDLEVBQUUsQ0FBQyxDQUFDOztNQUVMO01BQ0F6QixFQUFFLENBQUNVLEtBQUssQ0FBQ3dILGVBQWUsQ0FBQ0Msa0JBQWtCLENBQUMxRyxPQUFPLEVBQUUsWUFBVztRQUM1RDtRQUNBLElBQUl3QyxRQUFRLENBQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUkwQyxRQUFRLENBQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7VUFDM0QwQyxRQUFRLENBQUN2QixRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ2hDO1FBRUExQyxFQUFFLENBQUNVLEtBQUssQ0FBQ29FLHFCQUFxQixDQUFDckQsT0FBTyxFQUFFaUIsUUFBUSxDQUFDNkIsWUFBWSxFQUFFLEtBQUssQ0FBQzs7UUFFckU7UUFDQTZELFlBQVksQ0FBQzdDLGFBQWEsQ0FBQztNQUMvQixDQUFDLENBQUM7TUFFRixPQUFPO1FBQUUsNEJBQTRCLEVBQUU7TUFBSyxDQUFDO0lBQ2pELENBQUM7SUFDRE4sTUFBTSxFQUFFLFNBQVJBLE1BQU1BLENBQVd4RCxPQUFPLEVBQUVJLGFBQWEsRUFBRWtDLG1CQUFtQixFQUFFeEMsSUFBSSxFQUFFeUMsT0FBTyxFQUFFO01BQ3pFLElBQUlHLGVBQWUsR0FBR3ZDLHNCQUFzQixDQUFDQyxhQUFhLEVBQUUsU0FBUyxDQUFDOztNQUV0RTtNQUNBZCxPQUFPLENBQUNVLE9BQU8sRUFBRW5CLE9BQU8sRUFBRTZELGVBQWUsQ0FBQ1UsT0FBTyxDQUFDOztNQUVsRDtNQUNBN0UsRUFBRSxDQUFDeUMsZUFBZSxDQUFDTixRQUFRLENBQUM4QyxNQUFNLENBQUN4RCxPQUFPLEVBQUUsWUFBVztRQUFFLE9BQU8wQyxlQUFlO01BQUUsQ0FBQyxFQUFFSixtQkFBbUIsRUFBRXhDLElBQUksRUFBRXlDLE9BQU8sQ0FBQztJQUMzSCxDQUFDO0lBQ0RPLFlBQVksRUFBRSxjQUFjO0lBQzVCRSxTQUFTLEVBQUUsSUFBSTtJQUNmd0MsU0FBUyxFQUFFLElBQUk7SUFDZkQsVUFBVSxFQUFFLElBQUk7SUFDaEJoRixPQUFPLEVBQUUsQ0FBQztFQUNkLENBQUM7O0VBRUQ7RUFDQWhDLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQzRGLFNBQVMsR0FBRztJQUMzQnZFLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFXckMsT0FBTyxFQUFFSSxhQUFhLEVBQUVrQyxtQkFBbUIsRUFBRXhDLElBQUksRUFBRXlDLE9BQU8sRUFBRTtNQUN2RSxJQUFJRSxLQUFLLEdBQUd6RCxNQUFNLENBQUNvQixhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDRyxPQUFPLEdBQUdrQyxLQUFLLENBQUNsQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQzdCc0csZ0JBQWdCLEdBQUd0SSxFQUFFLENBQUNVLEtBQUssQ0FBQzRELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRXRFLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQzRGLFNBQVMsQ0FBQ3JHLE9BQU8sQ0FBQztRQUM1RW1DLGVBQWUsR0FBR3ZDLHNCQUFzQixDQUFDQyxhQUFhLEVBQUUsTUFBTSxDQUFDO1FBQy9EMEMsWUFBWSxHQUFHTCxLQUFLLENBQUNLLFlBQVksSUFBSXZFLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQzRGLFNBQVMsQ0FBQzlELFlBQVk7UUFDOUV5RCxTQUFTLEdBQUc5RCxLQUFLLENBQUM4RCxTQUFTLEtBQUtDLFNBQVMsR0FBRy9ELEtBQUssQ0FBQzhELFNBQVMsR0FBR2hJLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQzRGLFNBQVMsQ0FBQ0wsU0FBUztNQUV4RzlELEtBQUssR0FBRyxNQUFNLElBQUlBLEtBQUssR0FBR0EsS0FBSyxDQUFDM0MsSUFBSSxHQUFHMkMsS0FBSzs7TUFFNUM7TUFDQW5ELE9BQU8sQ0FBQ1UsT0FBTyxFQUFFakIsT0FBTyxFQUFFMEQsS0FBSyxDQUFDOztNQUVoQztNQUNBbEUsRUFBRSxDQUFDVSxLQUFLLENBQUM0RCxNQUFNLENBQUNnRSxnQkFBZ0IsRUFBRXRHLE9BQU8sQ0FBQzs7TUFFMUM7TUFDQXNHLGdCQUFnQixDQUFDQyxpQkFBaUIsR0FBR2hFLFlBQVksR0FBRyxHQUFHLEdBQUdBLFlBQVksR0FBRyxLQUFLOztNQUU5RTtNQUNBcEUsQ0FBQyxDQUFDc0IsT0FBTyxDQUFDLENBQUM0RyxTQUFTLENBQUNDLGdCQUFnQixDQUFDOztNQUV0QztNQUNBLElBQUlOLFNBQVMsS0FBS0MsU0FBUyxFQUFFO1FBQ3pCakksRUFBRSxDQUFDMEUsUUFBUSxDQUFDO1VBQ1JDLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFBLEVBQWE7WUFDYnhFLENBQUMsQ0FBQ3NCLE9BQU8sQ0FBQyxDQUFDNEcsU0FBUyxDQUFDNUgsTUFBTSxDQUFDdUgsU0FBUyxDQUFDLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQztVQUNsRSxDQUFDO1VBQ0RqRCx3QkFBd0IsRUFBRXREO1FBQzlCLENBQUMsQ0FBQztNQUNOOztNQUVBO01BQ0F6QixFQUFFLENBQUNVLEtBQUssQ0FBQ3dILGVBQWUsQ0FBQ0Msa0JBQWtCLENBQUMxRyxPQUFPLEVBQUUsWUFBVztRQUM1RHRCLENBQUMsQ0FBQ3NCLE9BQU8sQ0FBQyxDQUFDNEcsU0FBUyxDQUFDLFNBQVMsQ0FBQztNQUNuQyxDQUFDLENBQUM7TUFFRixPQUFPckksRUFBRSxDQUFDeUMsZUFBZSxDQUFDTixRQUFRLENBQUMyQixJQUFJLENBQUNyQyxPQUFPLEVBQUUsWUFBVztRQUFFLE9BQU8wQyxlQUFlO01BQUUsQ0FBQyxFQUFFSixtQkFBbUIsRUFBRXhDLElBQUksRUFBRXlDLE9BQU8sQ0FBQztJQUNoSSxDQUFDO0lBQ0RpQixNQUFNLEVBQUUsU0FBUkEsTUFBTUEsQ0FBV3hELE9BQU8sRUFBRUksYUFBYSxFQUFFa0MsbUJBQW1CLEVBQUV4QyxJQUFJLEVBQUV5QyxPQUFPLEVBQUU7TUFDekUsSUFBSUcsZUFBZSxHQUFHdkMsc0JBQXNCLENBQUNDLGFBQWEsRUFBRSxNQUFNLENBQUM7TUFFbkUsT0FBTzdCLEVBQUUsQ0FBQ3lDLGVBQWUsQ0FBQ04sUUFBUSxDQUFDOEMsTUFBTSxDQUFDeEQsT0FBTyxFQUFFLFlBQVc7UUFBRSxPQUFPMEMsZUFBZTtNQUFFLENBQUMsRUFBRUosbUJBQW1CLEVBQUV4QyxJQUFJLEVBQUV5QyxPQUFPLENBQUM7SUFDbEksQ0FBQztJQUNETyxZQUFZLEVBQUV2RSxFQUFFLENBQUN5QyxlQUFlLENBQUNDLFFBQVEsQ0FBQzZCLFlBQVk7SUFDdER2QyxPQUFPLEVBQUU7TUFDTGtELE1BQU0sRUFBRTtJQUNaO0VBQ0osQ0FBQztBQUNMLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJjaGVzX3Nsb2NhbC8uLi8uLi9vcHQvdmVudi9saWIvcHl0aG9uMy4xMy9zaXRlLXBhY2thZ2VzL2FyY2hlcy9hcHAvbWVkaWEvanMvYmluZGluZ3Mvc29ydGFibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8ga25vY2tvdXQtc29ydGFibGUgMC4xNS4wIHwgKGMpIDIwMTYgUnlhbiBOaWVtZXllciB8ICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlXG4oZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQgYW5vbnltb3VzIG1vZHVsZVxuICAgICAgICBkZWZpbmUoW1wia25vY2tvdXRcIiwgXCJqcXVlcnlcIiwgXCJqcXVlcnktdWlcIl0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcXVpcmUgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIC8vIENvbW1vbkpTIG1vZHVsZVxuICAgICAgICB2YXIga28gPSByZXF1aXJlKFwia25vY2tvdXRcIiksXG4gICAgICAgICAgICBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuICAgICAgICByZXF1aXJlKFwianF1ZXJ5LXVpL3NvcnRhYmxlXCIpO1xuICAgICAgICByZXF1aXJlKFwianF1ZXJ5LXVpL2RyYWdnYWJsZVwiKTtcbiAgICAgICAgZmFjdG9yeShrbywgalF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBObyBtb2R1bGUgbG9hZGVyIChwbGFpbiA8c2NyaXB0PiB0YWcpIC0gcHV0IGRpcmVjdGx5IGluIGdsb2JhbCBuYW1lc3BhY2VcbiAgICAgICAgZmFjdG9yeSh3aW5kb3cua28sIHdpbmRvdy5qUXVlcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uKGtvLCAkKSB7XG4gICAgdmFyIElURU1LRVkgPSBcImtvX3NvcnRJdGVtXCIsXG4gICAgICAgIElOREVYS0VZID0gXCJrb19zb3VyY2VJbmRleFwiLFxuICAgICAgICBMSVNUS0VZID0gXCJrb19zb3J0TGlzdFwiLFxuICAgICAgICBQQVJFTlRLRVkgPSBcImtvX3BhcmVudExpc3RcIixcbiAgICAgICAgRFJBR0tFWSA9IFwia29fZHJhZ0l0ZW1cIixcbiAgICAgICAgdW53cmFwID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZSxcbiAgICAgICAgZGF0YUdldCA9IGtvLnV0aWxzLmRvbURhdGEuZ2V0LFxuICAgICAgICBkYXRhU2V0ID0ga28udXRpbHMuZG9tRGF0YS5zZXQsXG4gICAgICAgIHZlcnNpb24gPSAkLnVpICYmICQudWkudmVyc2lvbixcbiAgICAgICAgLy8xLjguMjQgaW5jbHVkZWQgYSBmaXggZm9yIGhvdyBldmVudHMgd2VyZSB0cmlnZ2VyZWQgaW4gbmVzdGVkIHNvcnRhYmxlcy4gaW5kZXhPZiBjaGVja3Mgd2lsbCBmYWlsIGlmIHZlcnNpb24gc3RhcnRzIHdpdGggdGhhdCB2YWx1ZSAoMCB2cy4gLTEpXG4gICAgICAgIGhhc05lc3RlZFNvcnRhYmxlRml4ID0gdmVyc2lvbiAmJiB2ZXJzaW9uLmluZGV4T2YoXCIxLjYuXCIpICYmIHZlcnNpb24uaW5kZXhPZihcIjEuNy5cIikgJiYgKHZlcnNpb24uaW5kZXhPZihcIjEuOC5cIikgfHwgdmVyc2lvbiA9PT0gXCIxLjguMjRcIik7XG5cbiAgICAvL2ludGVybmFsIGFmdGVyUmVuZGVyIHRoYXQgYWRkcyBtZXRhLWRhdGEgdG8gY2hpbGRyZW5cbiAgICB2YXIgYWRkTWV0YURhdGFBZnRlclJlbmRlciA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBkYXRhKSB7XG4gICAgICAgIGtvLnV0aWxzLmFycmF5Rm9yRWFjaChlbGVtZW50cywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkYXRhU2V0KGVsZW1lbnQsIElURU1LRVksIGRhdGEpO1xuICAgICAgICAgICAgICAgIGRhdGFTZXQoZWxlbWVudCwgUEFSRU5US0VZLCBkYXRhR2V0KGVsZW1lbnQucGFyZW50Tm9kZSwgTElTVEtFWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy9wcmVwYXJlIHRoZSBwcm9wZXIgb3B0aW9ucyBmb3IgdGhlIHRlbXBsYXRlIGJpbmRpbmdcbiAgICB2YXIgcHJlcGFyZVRlbXBsYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKHZhbHVlQWNjZXNzb3IsIGRhdGFOYW1lKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSB1bndyYXAodmFsdWVBY2Nlc3NvcigpKSB8fCB7fSxcbiAgICAgICAgICAgIGFjdHVhbEFmdGVyUmVuZGVyO1xuXG4gICAgICAgIC8vYnVpbGQgb3VyIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgdGVtcGxhdGUgZW5naW5lXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdFtkYXRhTmFtZV0gPSBvcHRpb25zLmRhdGE7XG4gICAgICAgICAgICByZXN1bHQubmFtZSA9IG9wdGlvbnMudGVtcGxhdGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRbZGF0YU5hbWVdID0gdmFsdWVBY2Nlc3NvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAga28udXRpbHMuYXJyYXlGb3JFYWNoKFtcImFmdGVyQWRkXCIsIFwiYWZ0ZXJSZW5kZXJcIiwgXCJhc1wiLCBcImJlZm9yZVJlbW92ZVwiLCBcImluY2x1ZGVEZXN0cm95ZWRcIiwgXCJ0ZW1wbGF0ZUVuZ2luZVwiLCBcInRlbXBsYXRlT3B0aW9uc1wiLCBcIm5vZGVzXCJdLCBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgb3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoa28uYmluZGluZ0hhbmRsZXJzLnNvcnRhYmxlLCBvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W29wdGlvbl0gPSBrby5iaW5kaW5nSGFuZGxlcnMuc29ydGFibGVbb3B0aW9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy91c2UgYW4gYWZ0ZXJSZW5kZXIgZnVuY3Rpb24gdG8gYWRkIG1ldGEtZGF0YVxuICAgICAgICBpZiAoZGF0YU5hbWUgPT09IFwiZm9yZWFjaFwiKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmFmdGVyUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgLy93cmFwIHRoZSBleGlzdGluZyBmdW5jdGlvbiwgaWYgaXQgd2FzIHBhc3NlZFxuICAgICAgICAgICAgICAgIGFjdHVhbEFmdGVyUmVuZGVyID0gcmVzdWx0LmFmdGVyUmVuZGVyO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZnRlclJlbmRlciA9IGZ1bmN0aW9uKGVsZW1lbnQsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkTWV0YURhdGFBZnRlclJlbmRlci5jYWxsKGRhdGEsIGVsZW1lbnQsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBhY3R1YWxBZnRlclJlbmRlci5jYWxsKGRhdGEsIGVsZW1lbnQsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZnRlclJlbmRlciA9IGFkZE1ldGFEYXRhQWZ0ZXJSZW5kZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3JldHVybiBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIHRlbXBsYXRlIGJpbmRpbmdcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgdmFyIHVwZGF0ZUluZGV4RnJvbURlc3Ryb3llZEl0ZW1zID0gZnVuY3Rpb24oaW5kZXgsIGl0ZW1zKSB7XG4gICAgICAgIHZhciB1bndyYXBwZWQgPSB1bndyYXAoaXRlbXMpO1xuXG4gICAgICAgIGlmICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vYWRkIG9uZSBmb3IgZXZlcnkgZGVzdHJveWVkIGl0ZW0gd2UgZmluZCBiZWZvcmUgdGhlIHRhcmdldEluZGV4IGluIHRoZSB0YXJnZXQgYXJyYXlcbiAgICAgICAgICAgICAgICBpZiAodW53cmFwcGVkW2ldICYmIHVud3JhcCh1bndyYXBwZWRbaV0uX2Rlc3Ryb3kpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH07XG5cbiAgICAvL3JlbW92ZSBwcm9ibGVtYXRpYyBsZWFkaW5nL3RyYWlsaW5nIHdoaXRlc3BhY2UgZnJvbSB0ZW1wbGF0ZXNcbiAgICB2YXIgc3RyaXBUZW1wbGF0ZVdoaXRlc3BhY2UgPSBmdW5jdGlvbihlbGVtZW50LCBuYW1lKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZVNvdXJjZSxcbiAgICAgICAgICAgIHRlbXBsYXRlRWxlbWVudDtcblxuICAgICAgICAvL3Byb2Nlc3MgbmFtZWQgdGVtcGxhdGVzXG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNvdXJjZSA9IG5ldyBrby50ZW1wbGF0ZVNvdXJjZXMuZG9tRWxlbWVudCh0ZW1wbGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlU291cmNlLnRleHQoJC50cmltKHRlbXBsYXRlU291cmNlLnRleHQoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9yZW1vdmUgbGVhZGluZy90cmFpbGluZyBub24tZWxlbWVudHMgZnJvbSBhbm9ueW1vdXMgdGVtcGxhdGVzXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmNvbnRlbnRzKCkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcyAmJiB0aGlzLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9jb25uZWN0IGl0ZW1zIHdpdGggb2JzZXJ2YWJsZUFycmF5c1xuICAgIGtvLmJpbmRpbmdIYW5kbGVycy5zb3J0YWJsZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3NvciwgZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpIHx8IHt9LFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlT3B0aW9ucyA9IHByZXBhcmVUZW1wbGF0ZU9wdGlvbnModmFsdWVBY2Nlc3NvciwgXCJmb3JlYWNoXCIpLFxuICAgICAgICAgICAgICAgIHNvcnRhYmxlID0ge30sXG4gICAgICAgICAgICAgICAgc3RhcnRBY3R1YWwsIHVwZGF0ZUFjdHVhbDtcblxuICAgICAgICAgICAgc3RyaXBUZW1wbGF0ZVdoaXRlc3BhY2UoZWxlbWVudCwgdGVtcGxhdGVPcHRpb25zLm5hbWUpO1xuXG4gICAgICAgICAgICAvL2J1aWxkIGEgbmV3IG9iamVjdCB0aGF0IGhhcyB0aGUgZ2xvYmFsIG9wdGlvbnMgd2l0aCBvdmVycmlkZXMgZnJvbSB0aGUgYmluZGluZ1xuICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgc29ydGFibGUsIGtvLmJpbmRpbmdIYW5kbGVycy5zb3J0YWJsZSk7XG4gICAgICAgICAgICBpZiAodmFsdWUub3B0aW9ucyAmJiBzb3J0YWJsZS5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAga28udXRpbHMuZXh0ZW5kKHNvcnRhYmxlLm9wdGlvbnMsIHZhbHVlLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZS5vcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga28udXRpbHMuZXh0ZW5kKHNvcnRhYmxlLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vaWYgYWxsb3dEcm9wIGlzIGFuIG9ic2VydmFibGUgb3IgYSBmdW5jdGlvbiwgdGhlbiBleGVjdXRlIGl0IGluIGEgY29tcHV0ZWQgb2JzZXJ2YWJsZVxuICAgICAgICAgICAgaWYgKHNvcnRhYmxlLmNvbm5lY3RDbGFzcyAmJiAoa28uaXNPYnNlcnZhYmxlKHNvcnRhYmxlLmFsbG93RHJvcCkgfHwgdHlwZW9mIHNvcnRhYmxlLmFsbG93RHJvcCA9PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAga28uY29tcHV0ZWQoe1xuICAgICAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHVud3JhcChzb3J0YWJsZS5hbGxvd0Ryb3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZEFkZCA9IHR5cGVvZiB2YWx1ZSA9PSBcImZ1bmN0aW9uXCIgPyB2YWx1ZS5jYWxsKHRoaXMsIHRlbXBsYXRlT3B0aW9ucy5mb3JlYWNoKSA6IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAga28udXRpbHMudG9nZ2xlRG9tTm9kZUNzc0NsYXNzKGVsZW1lbnQsIHNvcnRhYmxlLmNvbm5lY3RDbGFzcywgc2hvdWxkQWRkKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZVdoZW5Ob2RlSXNSZW1vdmVkOiBlbGVtZW50XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtvLnV0aWxzLnRvZ2dsZURvbU5vZGVDc3NDbGFzcyhlbGVtZW50LCBzb3J0YWJsZS5jb25uZWN0Q2xhc3MsIHNvcnRhYmxlLmFsbG93RHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vd3JhcCB0aGUgdGVtcGxhdGUgYmluZGluZ1xuICAgICAgICAgICAga28uYmluZGluZ0hhbmRsZXJzLnRlbXBsYXRlLmluaXQoZWxlbWVudCwgZnVuY3Rpb24oKSB7IHJldHVybiB0ZW1wbGF0ZU9wdGlvbnM7IH0sIGFsbEJpbmRpbmdzQWNjZXNzb3IsIGRhdGEsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAvL2tlZXAgYSByZWZlcmVuY2UgdG8gc3RhcnQvdXBkYXRlIGZ1bmN0aW9ucyB0aGF0IG1pZ2h0IGhhdmUgYmVlbiBwYXNzZWQgaW5cbiAgICAgICAgICAgIHN0YXJ0QWN0dWFsID0gc29ydGFibGUub3B0aW9ucy5zdGFydDtcbiAgICAgICAgICAgIHVwZGF0ZUFjdHVhbCA9IHNvcnRhYmxlLm9wdGlvbnMudXBkYXRlO1xuXG4gICAgICAgICAgICAvL2Vuc3VyZSBkcmFnZ2FibGUgdGFibGUgcm93IGNlbGxzIG1haW50YWluIHRoZWlyIHdpZHRoIHdoaWxlIGRyYWdnaW5nICh1bmxlc3MgYSBoZWxwZXIgaXMgcHJvdmlkZWQpXG4gICAgICAgICAgICBpZiAoICFzb3J0YWJsZS5vcHRpb25zLmhlbHBlciApIHtcbiAgICAgICAgICAgICAgICBzb3J0YWJsZS5vcHRpb25zLmhlbHBlciA9IGZ1bmN0aW9uKGUsIHVpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1aS5pcyhcInRyXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53aWR0aCgkKHRoaXMpLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vaW5pdGlhbGl6ZSBzb3J0YWJsZSBiaW5kaW5nIGFmdGVyIHRlbXBsYXRlIGJpbmRpbmcgaGFzIHJlbmRlcmVkIGluIHVwZGF0ZSBmdW5jdGlvblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkcmFnSXRlbTtcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxSZWNlaXZlID0gc29ydGFibGUub3B0aW9ucy5yZWNlaXZlO1xuXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuc29ydGFibGUoa28udXRpbHMuZXh0ZW5kKHNvcnRhYmxlLm9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90cmFjayBvcmlnaW5hbCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gdWkuaXRlbVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTZXQoZWwsIElOREVYS0VZLCBrby51dGlscy5hcnJheUluZGV4T2YodWkuaXRlbS5wYXJlbnQoKS5jaGlsZHJlbigpLCBlbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSB0aGF0IGZpZWxkcyBoYXZlIGEgY2hhbmNlIHRvIHVwZGF0ZSBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5maW5kKFwiaW5wdXQ6Zm9jdXNcIikuY2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRBY3R1YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEFjdHVhbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vb3B0aW9uYWxseSBhcHBseSBhbiBleGlzdGluZyByZWNlaXZlIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxSZWNlaXZlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJlY2VpdmUuY2FsbCh0aGlzLCBldmVudCwgdWkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnSXRlbSA9IGRhdGFHZXQodWkuaXRlbVswXSwgRFJBR0tFWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvcHkgdGhlIG1vZGVsIGl0ZW0sIGlmIGEgY2xvbmUgb3B0aW9uIGlzIHByb3ZpZGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdJdGVtLmNsb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdJdGVtID0gZHJhZ0l0ZW0uY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbmZpZ3VyZSBhIGhhbmRsZXIgdG8gcG90ZW50aWFsbHkgbWFuaXB1bGF0ZSBpdGVtIGJlZm9yZSBkcm9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlLmRyYWdnZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0l0ZW0gPSBzb3J0YWJsZS5kcmFnZ2VkLmNhbGwodGhpcywgZHJhZ0l0ZW0sIGV2ZW50LCB1aSkgfHwgZHJhZ0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZVBhcmVudCwgdGFyZ2V0UGFyZW50LCBzb3VyY2VJbmRleCwgdGFyZ2V0SW5kZXgsIGFyZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbCA9IHVpLml0ZW1bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RWwgPSB1aS5pdGVtLnBhcmVudCgpWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBkYXRhR2V0KGVsLCBJVEVNS0VZKSB8fCBkcmFnSXRlbTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnSXRlbSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIHRoYXQgbW92ZXMgb25seSBydW4gb25jZSwgYXMgdXBkYXRlIGZpcmVzIG9uIG11bHRpcGxlIGNvbnRhaW5lcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICYmICh0aGlzID09PSBwYXJlbnRFbCkgfHwgKCFoYXNOZXN0ZWRTb3J0YWJsZUZpeCAmJiAkLmNvbnRhaW5zKHRoaXMsIHBhcmVudEVsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lkZW50aWZ5IHBhcmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXJlbnQgPSBkYXRhR2V0KGVsLCBQQVJFTlRLRVkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gZGF0YUdldChlbCwgSU5ERVhLRVkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBhcmVudCA9IGRhdGFHZXQoZWwucGFyZW50Tm9kZSwgTElTVEtFWSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSBrby51dGlscy5hcnJheUluZGV4T2YodWkuaXRlbS5wYXJlbnQoKS5jaGlsZHJlbigpLCBlbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rha2UgZGVzdHJveWVkIGl0ZW1zIGludG8gY29uc2lkZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcGxhdGVPcHRpb25zLmluY2x1ZGVEZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSB1cGRhdGVJbmRleEZyb21EZXN0cm95ZWRJdGVtcyhzb3VyY2VJbmRleCwgc291cmNlUGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSB1cGRhdGVJbmRleEZyb21EZXN0cm95ZWRJdGVtcyh0YXJnZXRJbmRleCwgdGFyZ2V0UGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2J1aWxkIHVwIGFyZ3MgZm9yIHRoZSBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUuYmVmb3JlTW92ZSB8fCBzb3J0YWJsZS5hZnRlck1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVBhcmVudDogc291cmNlUGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGFyZW50Tm9kZTogc291cmNlUGFyZW50ICYmIHVpLnNlbmRlciB8fCBlbC5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSW5kZXg6IHNvdXJjZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFyZW50OiB0YXJnZXRQYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleDogdGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxEcm9wOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXhlY3V0ZSB0aGUgY29uZmlndXJlZCBjYWxsYmFjayBwcmlvciB0byBhY3R1YWxseSBtb3ZpbmcgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlLmJlZm9yZU1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlLmJlZm9yZU1vdmUuY2FsbCh0aGlzLCBhcmcsIGV2ZW50LCB1aSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NhbGwgY2FuY2VsIG9uIHRoZSBjb3JyZWN0IGxpc3QsIHNvIEtPIGNhbiB0YWtlIGNhcmUgb2YgRE9NIG1hbmlwdWxhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VQYXJlbnQgJiYgIXNvcnRhYmxlLmFkZFRvU2VsZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNvdXJjZVBhcmVudCA9PT0gdGFyZ2V0UGFyZW50ID8gdGhpcyA6IHVpLnNlbmRlciB8fCB0aGlzKS5zb3J0YWJsZShcImNhbmNlbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3IgYSBkcmFnZ2FibGUgaXRlbSBqdXN0IHJlbW92ZSB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGJlZm9yZU1vdmUgdG9sZCB1cyB0byBjYW5jZWwsIHRoZW4gd2UgYXJlIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJnICYmIGFyZy5jYW5jZWxEcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSBzdHJhdGVneSBvcHRpb24gaXMgdW5zZXQgb3IgZmFsc2UsIGVtcGxveSB0aGUgb3JkZXIgc3RyYXRlZ3kgaW52b2x2aW5nIHJlbW92YWwgYW5kIGluc2VydGlvbiBvZiBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvcnRhYmxlLCBcInN0cmF0ZWd5TW92ZVwiKSB8fCBzb3J0YWJsZS5zdHJhdGVneU1vdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZG8gdGhlIGFjdHVhbCBtb3ZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGFyZW50LnNwbGljZShzb3VyY2VJbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHVzaW5nIGRlZmVycmVkIHVwZGF0ZXMgcGx1Z2luLCBmb3JjZSB1cGRhdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtvLnByb2Nlc3NBbGxEZWZlcnJlZEJpbmRpbmdVcGRhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvLnByb2Nlc3NBbGxEZWZlcnJlZEJpbmRpbmdVcGRhdGVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB1c2luZyBkZWZlcnJlZCB1cGRhdGVzIG9uIGtub2Nrb3V0IDMuNCwgZm9yY2UgdXBkYXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrby5vcHRpb25zICYmIGtvLm9wdGlvbnMuZGVmZXJVcGRhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvLnRhc2tzLnJ1bkVhcmx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXJlbnQuc3BsaWNlKHRhcmdldEluZGV4LCAwLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVuZGVyaW5nIGlzIGhhbmRsZWQgYnkgbWFuaXB1bGF0aW5nIHRoZSBvYnNlcnZhYmxlQXJyYXk7IGlnbm9yZSBkcm9wcGVkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNldChlbCwgSVRFTUtFWSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvL2VtcGxveSB0aGUgc3RyYXRlZ3kgb2YgbW92aW5nIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhcmVudCAhPT0gdGFyZ2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmluZyBmcm9tIG9uZSBsaXN0IHRvIGFub3RoZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXJlbnQuc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFyZW50LnNwbGljZSh0YXJnZXRJbmRleCwgMCwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW5kZXJpbmcgaXMgaGFuZGxlZCBieSBtYW5pcHVsYXRpbmcgdGhlIG9ic2VydmFibGVBcnJheTsgaWdub3JlIGRyb3BwZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU2V0KGVsLCBJVEVNS0VZLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmluZyB3aXRoaW4gc2FtZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bmRlcmx5aW5nTGlzdCA9IHVud3JhcChzb3VyY2VQYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSAnYmVmb3JlQ2hhbmdlJyBzdWJzY3JpYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGFyZW50LnZhbHVlV2lsbE11dGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGFyZW50LnZhbHVlV2lsbE11dGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBmcm9tIHNvdXJjZSBpbmRleCAuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZXJseWluZ0xpc3Quc3BsaWNlKHNvdXJjZUluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLi4uIHRvIHRhcmdldCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlcmx5aW5nTGlzdC5zcGxpY2UodGFyZ2V0SW5kZXgsIDAsIGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBzdWJzY3JpYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGFyZW50LnZhbHVlSGFzTXV0YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGFyZW50LnZhbHVlSGFzTXV0YXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHJvcCBuZXcgZWxlbWVudCBmcm9tIG91dHNpZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXJlbnQuc3BsaWNlKHRhcmdldEluZGV4LCAwLCBpdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVuZGVyaW5nIGlzIGhhbmRsZWQgYnkgbWFuaXB1bGF0aW5nIHRoZSBvYnNlcnZhYmxlQXJyYXk7IGlnbm9yZSBkcm9wcGVkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU2V0KGVsLCBJVEVNS0VZLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB1c2luZyBkZWZlcnJlZCB1cGRhdGVzIHBsdWdpbiwgZm9yY2UgdXBkYXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrby5wcm9jZXNzQWxsRGVmZXJyZWRCaW5kaW5nVXBkYXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrby5wcm9jZXNzQWxsRGVmZXJyZWRCaW5kaW5nVXBkYXRlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxsb3cgYmluZGluZyB0byBhY2NlcHQgYSBmdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIG1vdmluZyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZS5hZnRlck1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGFibGUuYWZ0ZXJNb3ZlLmNhbGwodGhpcywgYXJnLCBldmVudCwgdWkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZUFjdHVhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUFjdHVhbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0V2l0aDogc29ydGFibGUuY29ubmVjdENsYXNzID8gXCIuXCIgKyBzb3J0YWJsZS5jb25uZWN0Q2xhc3MgOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgIC8vaGFuZGxlIGVuYWJsaW5nL2Rpc2FibGluZyBzb3J0aW5nXG4gICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlLmlzRW5hYmxlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGtvLmNvbXB1dGVkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnNvcnRhYmxlKHVud3JhcChzb3J0YWJsZS5pc0VuYWJsZWQpID8gXCJlbmFibGVcIiA6IFwiZGlzYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwb3NlV2hlbk5vZGVJc1JlbW92ZWQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgICAgIC8vaGFuZGxlIGRpc3Bvc2FsXG4gICAgICAgICAgICBrby51dGlscy5kb21Ob2RlRGlzcG9zYWwuYWRkRGlzcG9zZUNhbGxiYWNrKGVsZW1lbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vb25seSBjYWxsIGRlc3Ryb3kgaWYgc29ydGFibGUgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAgICAgICAgICAgIGlmICgkZWxlbWVudC5kYXRhKFwidWktc29ydGFibGVcIikgfHwgJGVsZW1lbnQuZGF0YShcInNvcnRhYmxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50LnNvcnRhYmxlKFwiZGVzdHJveVwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBrby51dGlscy50b2dnbGVEb21Ob2RlQ3NzQ2xhc3MoZWxlbWVudCwgc29ydGFibGUuY29ubmVjdENsYXNzLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAvL2RvIG5vdCBjcmVhdGUgdGhlIHNvcnRhYmxlIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSBET01cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoY3JlYXRlVGltZW91dCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgJ2NvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzJzogdHJ1ZSB9O1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIGRhdGEsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSBwcmVwYXJlVGVtcGxhdGVPcHRpb25zKHZhbHVlQWNjZXNzb3IsIFwiZm9yZWFjaFwiKTtcblxuICAgICAgICAgICAgLy9hdHRhY2ggbWV0YS1kYXRhXG4gICAgICAgICAgICBkYXRhU2V0KGVsZW1lbnQsIExJU1RLRVksIHRlbXBsYXRlT3B0aW9ucy5mb3JlYWNoKTtcblxuICAgICAgICAgICAgLy9jYWxsIHRlbXBsYXRlIGJpbmRpbmcncyB1cGRhdGUgd2l0aCBjb3JyZWN0IG9wdGlvbnNcbiAgICAgICAgICAgIGtvLmJpbmRpbmdIYW5kbGVycy50ZW1wbGF0ZS51cGRhdGUoZWxlbWVudCwgZnVuY3Rpb24oKSB7IHJldHVybiB0ZW1wbGF0ZU9wdGlvbnM7IH0sIGFsbEJpbmRpbmdzQWNjZXNzb3IsIGRhdGEsIGNvbnRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBjb25uZWN0Q2xhc3M6ICdrb19jb250YWluZXInLFxuICAgICAgICBhbGxvd0Ryb3A6IHRydWUsXG4gICAgICAgIGFmdGVyTW92ZTogbnVsbCxcbiAgICAgICAgYmVmb3JlTW92ZTogbnVsbCxcbiAgICAgICAgb3B0aW9uczoge31cbiAgICB9O1xuXG4gICAgLy9jcmVhdGUgYSBkcmFnZ2FibGUgdGhhdCBpcyBhcHByb3ByaWF0ZSBmb3IgZHJvcHBpbmcgaW50byBhIHNvcnRhYmxlXG4gICAga28uYmluZGluZ0hhbmRsZXJzLmRyYWdnYWJsZSA9IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3NvciwgZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdW53cmFwKHZhbHVlQWNjZXNzb3IoKSkgfHwge30sXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHZhbHVlLm9wdGlvbnMgfHwge30sXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlT3B0aW9ucyA9IGtvLnV0aWxzLmV4dGVuZCh7fSwga28uYmluZGluZ0hhbmRsZXJzLmRyYWdnYWJsZS5vcHRpb25zKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgPSBwcmVwYXJlVGVtcGxhdGVPcHRpb25zKHZhbHVlQWNjZXNzb3IsIFwiZGF0YVwiKSxcbiAgICAgICAgICAgICAgICBjb25uZWN0Q2xhc3MgPSB2YWx1ZS5jb25uZWN0Q2xhc3MgfHwga28uYmluZGluZ0hhbmRsZXJzLmRyYWdnYWJsZS5jb25uZWN0Q2xhc3MsXG4gICAgICAgICAgICAgICAgaXNFbmFibGVkID0gdmFsdWUuaXNFbmFibGVkICE9PSB1bmRlZmluZWQgPyB2YWx1ZS5pc0VuYWJsZWQgOiBrby5iaW5kaW5nSGFuZGxlcnMuZHJhZ2dhYmxlLmlzRW5hYmxlZDtcblxuICAgICAgICAgICAgdmFsdWUgPSBcImRhdGFcIiBpbiB2YWx1ZSA/IHZhbHVlLmRhdGEgOiB2YWx1ZTtcblxuICAgICAgICAgICAgLy9zZXQgbWV0YS1kYXRhXG4gICAgICAgICAgICBkYXRhU2V0KGVsZW1lbnQsIERSQUdLRVksIHZhbHVlKTtcblxuICAgICAgICAgICAgLy9vdmVycmlkZSBnbG9iYWwgb3B0aW9ucyB3aXRoIG92ZXJyaWRlIG9wdGlvbnMgcGFzc2VkIGluXG4gICAgICAgICAgICBrby51dGlscy5leHRlbmQoZHJhZ2dhYmxlT3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vc2V0dXAgY29ubmVjdGlvbiB0byBhIHNvcnRhYmxlXG4gICAgICAgICAgICBkcmFnZ2FibGVPcHRpb25zLmNvbm5lY3RUb1NvcnRhYmxlID0gY29ubmVjdENsYXNzID8gXCIuXCIgKyBjb25uZWN0Q2xhc3MgOiBmYWxzZTtcblxuICAgICAgICAgICAgLy9pbml0aWFsaXplIGRyYWdnYWJsZVxuICAgICAgICAgICAgJChlbGVtZW50KS5kcmFnZ2FibGUoZHJhZ2dhYmxlT3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vaGFuZGxlIGVuYWJsaW5nL2Rpc2FibGluZyBzb3J0aW5nXG4gICAgICAgICAgICBpZiAoaXNFbmFibGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBrby5jb21wdXRlZCh7XG4gICAgICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5kcmFnZ2FibGUodW53cmFwKGlzRW5hYmxlZCkgPyBcImVuYWJsZVwiIDogXCJkaXNhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlV2hlbk5vZGVJc1JlbW92ZWQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9oYW5kbGUgZGlzcG9zYWxcbiAgICAgICAgICAgIGtvLnV0aWxzLmRvbU5vZGVEaXNwb3NhbC5hZGREaXNwb3NlQ2FsbGJhY2soZWxlbWVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5kcmFnZ2FibGUoXCJkZXN0cm95XCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBrby5iaW5kaW5nSGFuZGxlcnMudGVtcGxhdGUuaW5pdChlbGVtZW50LCBmdW5jdGlvbigpIHsgcmV0dXJuIHRlbXBsYXRlT3B0aW9uczsgfSwgYWxsQmluZGluZ3NBY2Nlc3NvciwgZGF0YSwgY29udGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3NvciwgZGF0YSwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlT3B0aW9ucyA9IHByZXBhcmVUZW1wbGF0ZU9wdGlvbnModmFsdWVBY2Nlc3NvciwgXCJkYXRhXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4ga28uYmluZGluZ0hhbmRsZXJzLnRlbXBsYXRlLnVwZGF0ZShlbGVtZW50LCBmdW5jdGlvbigpIHsgcmV0dXJuIHRlbXBsYXRlT3B0aW9uczsgfSwgYWxsQmluZGluZ3NBY2Nlc3NvciwgZGF0YSwgY29udGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbm5lY3RDbGFzczoga28uYmluZGluZ0hhbmRsZXJzLnNvcnRhYmxlLmNvbm5lY3RDbGFzcyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgaGVscGVyOiBcImNsb25lXCJcbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJuYW1lcyI6WyJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwicmVxdWlyZSIsImV4cG9ydHMiLCJfdHlwZW9mIiwibW9kdWxlIiwia28iLCJqUXVlcnkiLCJ3aW5kb3ciLCIkIiwiSVRFTUtFWSIsIklOREVYS0VZIiwiTElTVEtFWSIsIlBBUkVOVEtFWSIsIkRSQUdLRVkiLCJ1bndyYXAiLCJ1dGlscyIsInVud3JhcE9ic2VydmFibGUiLCJkYXRhR2V0IiwiZG9tRGF0YSIsImdldCIsImRhdGFTZXQiLCJzZXQiLCJ2ZXJzaW9uIiwidWkiLCJoYXNOZXN0ZWRTb3J0YWJsZUZpeCIsImluZGV4T2YiLCJhZGRNZXRhRGF0YUFmdGVyUmVuZGVyIiwiZWxlbWVudHMiLCJkYXRhIiwiYXJyYXlGb3JFYWNoIiwiZWxlbWVudCIsIm5vZGVUeXBlIiwicGFyZW50Tm9kZSIsInByZXBhcmVUZW1wbGF0ZU9wdGlvbnMiLCJ2YWx1ZUFjY2Vzc29yIiwiZGF0YU5hbWUiLCJyZXN1bHQiLCJvcHRpb25zIiwiYWN0dWFsQWZ0ZXJSZW5kZXIiLCJuYW1lIiwidGVtcGxhdGUiLCJvcHRpb24iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJiaW5kaW5nSGFuZGxlcnMiLCJzb3J0YWJsZSIsImFmdGVyUmVuZGVyIiwidXBkYXRlSW5kZXhGcm9tRGVzdHJveWVkSXRlbXMiLCJpbmRleCIsIml0ZW1zIiwidW53cmFwcGVkIiwiaSIsIl9kZXN0cm95Iiwic3RyaXBUZW1wbGF0ZVdoaXRlc3BhY2UiLCJ0ZW1wbGF0ZVNvdXJjZSIsInRlbXBsYXRlRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZW1wbGF0ZVNvdXJjZXMiLCJkb21FbGVtZW50IiwidGV4dCIsInRyaW0iLCJjb250ZW50cyIsImVhY2giLCJyZW1vdmVDaGlsZCIsImluaXQiLCJhbGxCaW5kaW5nc0FjY2Vzc29yIiwiY29udGV4dCIsIiRlbGVtZW50IiwidmFsdWUiLCJ0ZW1wbGF0ZU9wdGlvbnMiLCJzdGFydEFjdHVhbCIsInVwZGF0ZUFjdHVhbCIsImV4dGVuZCIsImNvbm5lY3RDbGFzcyIsImlzT2JzZXJ2YWJsZSIsImFsbG93RHJvcCIsImNvbXB1dGVkIiwicmVhZCIsInNob3VsZEFkZCIsImZvcmVhY2giLCJ0b2dnbGVEb21Ob2RlQ3NzQ2xhc3MiLCJkaXNwb3NlV2hlbk5vZGVJc1JlbW92ZWQiLCJzdGFydCIsInVwZGF0ZSIsImhlbHBlciIsImUiLCJpcyIsImNoaWxkcmVuIiwid2lkdGgiLCJjcmVhdGVUaW1lb3V0Iiwic2V0VGltZW91dCIsImRyYWdJdGVtIiwib3JpZ2luYWxSZWNlaXZlIiwicmVjZWl2ZSIsImV2ZW50IiwiZWwiLCJpdGVtIiwiYXJyYXlJbmRleE9mIiwicGFyZW50IiwiZmluZCIsImNoYW5nZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiY2xvbmUiLCJkcmFnZ2VkIiwic291cmNlUGFyZW50IiwidGFyZ2V0UGFyZW50Iiwic291cmNlSW5kZXgiLCJ0YXJnZXRJbmRleCIsImFyZyIsInBhcmVudEVsIiwicmVtb3ZlIiwiY29udGFpbnMiLCJpbmNsdWRlRGVzdHJveWVkIiwiYmVmb3JlTW92ZSIsImFmdGVyTW92ZSIsInNvdXJjZVBhcmVudE5vZGUiLCJzZW5kZXIiLCJjYW5jZWxEcm9wIiwiYWRkVG9TZWxmIiwic3RyYXRlZ3lNb3ZlIiwic3BsaWNlIiwicHJvY2Vzc0FsbERlZmVycmVkQmluZGluZ1VwZGF0ZXMiLCJkZWZlclVwZGF0ZXMiLCJ0YXNrcyIsInJ1bkVhcmx5IiwidW5kZXJseWluZ0xpc3QiLCJ2YWx1ZVdpbGxNdXRhdGUiLCJ2YWx1ZUhhc011dGF0ZWQiLCJjb25uZWN0V2l0aCIsImlzRW5hYmxlZCIsInVuZGVmaW5lZCIsImRvbU5vZGVEaXNwb3NhbCIsImFkZERpc3Bvc2VDYWxsYmFjayIsImNsZWFyVGltZW91dCIsImRyYWdnYWJsZSIsImRyYWdnYWJsZU9wdGlvbnMiLCJjb25uZWN0VG9Tb3J0YWJsZSJdLCJzb3VyY2VSb290IjoiIn0=