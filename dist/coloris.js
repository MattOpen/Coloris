

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 * Mostly rewritten by MattOpen Feb. 2024
 * https://github.com/MattOpen/ColorisOpen
 */

(function (window, document, Math, undefined) {
  var ctx = document.createElement('canvas').getContext('2d');
  var currentColor = {
    r: 0,
    g: 0,
    b: 0,
    h: 0,
    s: 0,
    v: 0,
    a: 1
  };
  var container,
    picker,
    colorArea,
    colorMarker,
    colorPreview,
    colorValue,
    clearButton,
    closeButton,
    hueSlider,
    hueMarker,
    alphaSlider,
    alphaMarker,
    currentEl,
    currentFormat,
    oldColor,
    keyboardNav,
    colorAreaDims = {};

  // Default settings
  var settings = _defineProperty({
    el: '[data-coloris]',
    parent: 'body',
    theme: 'default',
    themeMode: 'light',
    rtl: false,
    wrap: false,
    showButtonThumb: true,
    margin: 2,
    format: 'auto',
    formatToggle: false,
    swatches: [],
    swatchesOnly: false,
    alpha: true,
    forceAlpha: false,
    focusInput: true,
    selectInput: false,
    inline: false,
    defaultColor: '#000000',
    clearButton: false,
    clearLabel: 'Clear',
    closeButton: false,
    closeLabel: 'Close',
    onChange: function onChange() {
      return undefined;
    },
    a11y: {
      open: 'Open color picker',
      close: 'Close color picker',
      clear: 'Clear the selected color',
      marker: 'Saturation: {s}. Brightness: {v}.',
      hueSlider: 'Hue slider',
      alphaSlider: 'Opacity slider',
      input: 'Color value field',
      format: 'Color format',
      swatch: 'Color swatch',
      instruction: 'Saturation and brightness selector. Use up, down, left and right arrow keys to select.'
    },
    buttonStyle: 'default'
  }, "swatches", ['#264653'
  // '#2a9d8f',
  // '#e9c46a',
  // '#f4a261',
  // '#e76f51',
  // '#d62828',
  // '#023e8a',
  // '#0077b6',
  // '#0096c7',
  // '#00b4d8',
  // '#48cae4'
  ]);

  /**
   * Configure the color picker.
   * @param {object} options Configuration options.
   */
  function configure(options) {
    if (_typeof(options) !== 'object') {
      return;
    }
    var defaultSetting = Object.assign({}, settings);
    Object.keys(options).forEach(function (item) {
      defaultSetting[item] = options[item];
    });
    //const unsupportedOptions = ['wrap', 'rtl', 'inline', 'defaultColor', 'a11y'];
    // Delete unsupported options
    //unsupportedOptions.forEach(option => delete defaultSetting[option]);
    var _loop = function _loop() {
      switch (key) {
        // case 'el':
        //   if (defaultSetting.wrap !== false) {
        //     wrapFields(defaultSetting);
        //   }
        //   if (defaultSetting.showButtonThumb !== false) {
        //     addButtonThumb(defaultSetting);
        //   }
        //   break;
        case 'parent':
          container = document.querySelector(options.parent);
          if (container) {
            container.appendChild(picker);

            // document.body is special
            if (container === document.body) {
              container = undefined;
            }
          }
          break;
        case 'themeMode':
          if (defaultSetting.themeMode === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            defaultSetting.themeMode = 'dark';
          }
        // The lack of a break statement is intentional
        case 'theme':
          // Set the theme and color scheme
          picker.className = "clr-picker clr-".concat(defaultSetting.theme, " clr-").concat(defaultSetting.themeMode);

          // Update the color picker's position if inline mode is in use
          if (defaultSetting.inline) {
            updatePickerPosition();
          }
          break;
        case 'rtl':
          if (defaultSetting.rtl) {
            document.querySelectorAll('.clr-field').forEach(function (field) {
              return field.classList.add('clr-rtl');
            });
          }
          ;
          break;
        // case 'margin':
        //   options.margin *= 1;
        //   defaultSetting.margin = !isNaN(options.margin) ? options.margin : defaultSetting.margin;
        //   break;
        case 'wrap':
          if (defaultSetting.el && defaultSetting.wrap) {
            wrapField(defaultSetting);
          }
          break;
        case 'showButtonThumb':
          if (defaultSetting.showButtonThumb) {
            addButtonThumbOne(defaultSetting);
          } else {
            removeButton(defaultSetting.domObj);
          }
        case 'formatToggle':
          //defaultSetting.formatToggle = !!options.formatToggle;
          getEl('clr-format').style.display = defaultSetting.formatToggle ? 'block' : 'none';
          if (defaultSetting.formatToggle) {
            defaultSetting.format = 'auto';
          }
          break;
        case 'swatches':
          if (Array.isArray(defaultSetting.swatches)) {
            var swatches = [];
            defaultSetting.swatches.forEach(function (swatch, i) {
              swatches.push("<button type=\"button\" id=\"clr-swatch-".concat(i, "\" aria-labelledby=\"clr-swatch-label clr-swatch-").concat(i, "\" style=\"color: ").concat(swatch, ";\">").concat(swatch, "</button>"));
            });
            getEl('clr-swatches').innerHTML = swatches.length ? "<div>".concat(swatches.join(''), "</div>") : '';
            //defaultSetting.swatches = options.swatches.slice();
          }
          break;
        case 'swatchesOnly':
          //defaultSetting.swatchesOnly = !!options.swatchesOnly;
          picker.setAttribute('data-minimal', defaultSetting.swatchesOnly);
          break;
        case 'alpha':
          //defaultSetting.alpha = !!options.alpha;
          picker.setAttribute('data-alpha', defaultSetting.alpha);
          break;
        case 'inline':
          //defaultSetting.inline = !!options.inline;
          picker.setAttribute('data-inline', defaultSetting.inline);
          if (defaultSetting.inline) {
            //const defaultColor = options.defaultColor || defaultSetting.defaultColor;

            currentFormat = getColorFormatFromStr(defaultSetting.defaultColor);
            updatePickerPosition();
            setColorFromStr(defaultSetting.defaultColor);
          }
          break;
        case 'clearButton':
          // Backward compatibility
          if (_typeof(defaultSetting.clearButton) === 'object') {
            if (defaultSetting.clearButton.label) {
              defaultSetting.clearLabel = defaultSetting.clearButton.label;
              clearButton.innerHTML = defaultSetting.clearLabel;
            }
            defaultSetting.clearButton = defaultSetting.clearButton.show;
          }

          //settings.clearButton = !!options.clearButton;
          clearButton.style.display = defaultSetting.clearButton ? 'block' : 'none';
          break;
        case 'clearLabel':
          //settings.clearLabel = options.clearLabel;
          clearButton.innerHTML = defaultSetting.clearLabel;
          break;
        case 'closeButton':
          //defaultSetting.closeButton = !!options.closeButton;

          if (defaultSetting.closeButton) {
            picker.insertBefore(closeButton, colorPreview);
          } else {
            colorPreview.appendChild(closeButton);
          }
          break;
        case 'closeLabel':
          //defaultSetting.closeLabel = options.closeLabel;
          closeButton.innerHTML = defaultSetting.closeLabel;
          break;
        case 'a11y':
          var labels = defaultSetting.a11y;
          var update = false;
          if (_typeof(labels) === 'object') {
            for (var label in labels) {
              if (labels[label] && defaultSetting.a11y[label]) {
                defaultSetting.a11y[label] = labels[label];
                update = true;
              }
            }
          }
          if (update) {
            var openLabel = getEl('clr-open-label');
            var swatchLabel = getEl('clr-swatch-label');
            openLabel.innerHTML = defaultSetting.a11y.open;
            swatchLabel.innerHTML = defaultSetting.a11y.swatch;
            closeButton.setAttribute('aria-label', defaultSetting.a11y.close);
            clearButton.setAttribute('aria-label', defaultSetting.a11y.clear);
            hueSlider.setAttribute('aria-label', defaultSetting.a11y.hueSlider);
            alphaSlider.setAttribute('aria-label', defaultSetting.a11y.alphaSlider);
            colorValue.setAttribute('aria-label', defaultSetting.a11y.input);
            colorArea.setAttribute('aria-label', defaultSetting.a11y.instruction);
          }
          break;
        default:
          defaultSetting[key] = options[key];
      }
    };
    for (var key in defaultSetting) {
      _loop();
    }
  }

  /**
  * Add id to every input and create an instance with reference id
  * @param {String} selector The CSS selector of the elements to which the instance is attached.
  * @param {Object} options Per-instance options to apply.
  */
  function initInstances(selector, options) {
    if (Coloris && !Coloris['instances']) {
      Coloris['instances'] = {};
    }
    if (options && options.el) {
      selector = options.el;
    }

    //  update settings with options initially
    Object.keys(options).forEach(function (item) {
      settings[item] = options[item];
    });
    var randOptions = Object.assign({}, options);
    // const unsupportedOptions = ['wrap', 'rtl', 'inline', 'defaultColor', 'a11y'];
    // // Delete unsupported options
    // unsupportedOptions.forEach(option => delete randOptions[option]);

    if (selector.charAt(0) === '#') {
      var el = document.getElementById("selector");
      el.dataset.coloris = selector;
      randOptions['domObj'] = el;
      randOptions['colorisId'] = selector;
      getDataConfig(el, randOptions);
      Coloris['instances'][selector] = Object.assign({}, randOptions);
      wrapField(randOptions);
      addButtonThumbOne(randOptions);
    } else {
      document.querySelectorAll(selector).forEach(function (el) {
        randOptions['domObj'] = el;
        var newId = el.id.length > 0 ? el.id : Math.random().toString(36).substring(2, 9);
        el.id = newId;
        randOptions['colorisId'] = '#' + newId;
        getDataConfig(el, randOptions);
        Coloris['instances']['#' + newId] = Object.assign({}, randOptions);
        el.dataset.coloris = '#' + newId;
        wrapField(randOptions);
        addButtonThumbOne(randOptions);
      });
    }
    bindFields(randOptions.el);
  }

  /**
   * if data-config attribute is defined, parse
   * @param {Object} element Target element input
   * @param {Object} instance settings json
   */
  function getDataConfig(element, instance) {
    if (element.dataset.config) {
      var config = element.dataset.config;
      try {
        config = JSON.parse(decodeURIComponent(config));
      } catch (_unused) {
        config = element.dataset.config;
      }
      if (_typeof(config) == 'object') {
        Object.keys(config).forEach(function (item) {
          instance[item] = config[item];
        });
      }
    }
  }

  /**
   * redrawColoris element if it matches a selector.
   * @param {Object} element Target element that will receive a virtual instance if applicable.
   */
  function redrawColoris(element) {
    var instance = Coloris.instances[element.dataset.coloris];
    configure(instance);
  }

  /**
   * Bind the color picker to input fields that match the selector.
   * @param {string} selector One or more selectors pointing to input fields.
   */
  function bindFields(selector) {
    // Show the color picker on click on the input fields that match the selector
    addListener(document, 'click', selector, function (event) {
      // Skip if inline mode is in use
      if (settings.inline) {
        return;
      }

      // Apply any per-instance options first
      redrawColoris(event.target);
      currentEl = event.target;
      oldColor = currentEl.value;
      currentFormat = getColorFormatFromStr(oldColor);
      picker.classList.add('clr-open');
      updatePickerPosition();
      setColorFromStr(oldColor);
      if (settings.focusInput || settings.selectInput) {
        colorValue.focus({
          preventScroll: true
        });
        colorValue.setSelectionRange(currentEl.selectionStart, currentEl.selectionEnd);
      }
      if (settings.selectInput) {
        colorValue.select();
      }

      // Always focus the first element when using keyboard navigation
      if (keyboardNav || settings.swatchesOnly) {
        getFocusableElements().shift().focus();
      }

      // Trigger an "open" event
      currentEl.dispatchEvent(new Event('open', {
        bubbles: true
      }));
    });

    // Update the color preview of the input fields that match the selector
    addListener(document, 'input', selector, function (event) {
      var parent = event.target.parentNode;
      var input = event.target;

      //  update button background color
      input.nextSibling ? input.nextSibling.style.backgroundColor = event.target.value : '';
      //  update attribute value from input
      input.setAttribute('value', event.target.value);

      // Only update the preview if the field has been previously wrapped
      if (parent.classList.contains('clr-field')) {
        parent.style.color = event.target.value;
      }
    });
  }

  /**
   * Update the color picker's position and the color gradient's offset
   */
  function updatePickerPosition() {
    var parent = container;
    var scrollY = window.scrollY;
    var pickerWidth = picker.offsetWidth;
    var pickerHeight = picker.offsetHeight;
    var reposition = {
      left: false,
      top: false
    };
    var parentStyle, parentMarginTop, parentBorderTop;
    var offset = {
      x: 0,
      y: 0
    };
    if (parent) {
      parentStyle = window.getComputedStyle(parent);
      parentMarginTop = parseFloat(parentStyle.marginTop);
      parentBorderTop = parseFloat(parentStyle.borderTopWidth);
      offset = parent.getBoundingClientRect();
      offset.y += parentBorderTop + scrollY;
    }
    if (!settings.inline) {
      var coords = currentEl.getBoundingClientRect();
      var left = coords.x;
      var top = scrollY + coords.y + coords.height + settings.margin;

      // If the color picker is inside a custom container
      // set the position relative to it
      if (parent) {
        left -= offset.x;
        top -= offset.y;
        if (left + pickerWidth > parent.clientWidth) {
          left += coords.width - pickerWidth;
          reposition.left = true;
        }
        if (top + pickerHeight > parent.clientHeight - parentMarginTop) {
          if (pickerHeight + settings.margin <= coords.top - (offset.y - scrollY)) {
            top -= coords.height + pickerHeight + settings.margin * 2;
            reposition.top = true;
          }
        }
        top += parent.scrollTop;

        // Otherwise set the position relative to the whole document
      } else {
        if (left + pickerWidth > document.documentElement.clientWidth) {
          left += coords.width - pickerWidth;
          reposition.left = true;
        }
        if (top + pickerHeight - scrollY > document.documentElement.clientHeight) {
          if (pickerHeight + settings.margin <= coords.top) {
            top = scrollY + coords.y - pickerHeight - settings.margin;
            reposition.top = true;
          }
        }
      }
      picker.classList.toggle('clr-left', reposition.left);
      picker.classList.toggle('clr-top', reposition.top);
      picker.style.left = "".concat(left, "px");
      picker.style.top = "".concat(top, "px");
      offset.x += picker.offsetLeft;
      offset.y += picker.offsetTop;
    }
    colorAreaDims = {
      width: colorArea.offsetWidth,
      height: colorArea.offsetHeight,
      x: colorArea.offsetLeft + offset.x,
      y: colorArea.offsetTop + offset.y
    };
  }
  function getRelatedInstances(element) {
    var instancesObjArr = {};
    instancesObjArr = Object.fromEntries(Object.entries(Coloris.instances).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return element.el == '[data-coloris]' ? value.domObj.hasAttribute(element.el.slice(1, 13)) && value.el == '[data-coloris]' : value.domObj.classList.contains(element.el.charAt(0) ? element.el.substring(1) : element.el);
    }));
    if (Object.keys(instancesObjArr).length == 0) {
      instancesObjArr = Object.fromEntries(Object.entries(Coloris.instances).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        return _typeof(element) == 'object' ? value.domObj.classList.contains(element.el) : false;
      }));
    }
    return instancesObjArr;
  }

  /**
   * Wrap multiple linked input fields in a div that adds a color preview.
   * @param {string} selector One or more selectors pointing to input fields.
   */
  function wrapFields(element) {
    var instancesObjArr = getRelatedInstances(element);
    for (var key in instancesObjArr) {
      if (instancesObjArr.hasOwnProperty(key)) {
        var instance = instancesObjArr[key];
        //  add local settinigs
        if (_typeof(element) == 'object') {
          Object.keys(element).forEach(function (item) {
            instance[item] = element[item];
          });
        }
        wrapField(instance);
      }
    }
    addButtonThumb(element);
  }

  /**
  * Wrap the linked input fields in a div that adds a color preview.
  * @param {string} selector One or more selectors pointing to input fields.
  */
  function wrapField(element) {
    var instance = element,
      field = instance.domObj,
      parentNode = field.parentNode;
    if (!parentNode.classList.contains('clr-wrapper') && instance.wrap) {
      var wrapper = document.createElement('div');
      var classes = 'clr-field clr-wrapper';
      if (field.rtl || field.classList.contains('clr-rtl')) {
        classes += ' clr-rtl';
      }
      removeButton(field);
      wrapper.setAttribute('class', classes);
      wrapper.appendChild(field);
      parentNode.appendChild(wrapper);
    } else if (parentNode.classList.contains('clr-wrapper') && !instance.wrap) {
      //  remove wrapper div if any
      parentNode.after(field);
      parentNode.remove();
    }
  }

  /**
  * Remove single button from input field.
  * @param {object} field dom object from input
  */
  function removeButton(field) {
    if (field.previousElementSibling && field.previousElementSibling.classList.contains('clr-button')) {
      field.previousElementSibling.remove();
    }
    if (field.nextElementSibling && field.nextElementSibling.classList.contains('clr-button')) {
      field.nextElementSibling.remove();
    }
  }

  /**
  * Bind button to multiple input fields, will show a color preview.
  * @param {object} element settings array
  */
  function addButtonThumb(element) {
    var instancesObjArr = getRelatedInstances(element);
    var _loop2 = function _loop2() {
        if (instancesObjArr.hasOwnProperty(key)) {
          var instance = instancesObjArr[key];
          if (!instance.showButtonThumb) return {
            v: void 0
          };

          //  add local settinigs
          if (_typeof(element) == 'object') {
            Object.keys(element).forEach(function (item) {
              instance[item] = element[item];
            });
          }
          addButtonThumbOne(instance);
        }
      },
      _ret;
    for (var key in instancesObjArr) {
      _ret = _loop2();
      if (_ret) return _ret.v;
    }
  }

  /**
  * Bind a single button to the input field, will show the a color preview.
  * @param {object} element settings array
  */
  function addButtonThumbOne(element) {
    var instance = element;
    if (!instance.showButtonThumb) return;

    //  remove previous created button if any
    removeButton(instance.domObj);
    var buttonstyle = 'clr-' + instance.buttonStyle,
      button = "<button type=\"button\" class=\"clr-button ".concat(buttonstyle, "\" aria-labelledby=\"clr-open-label\"></button>");
    var classes = 'clr-field';
    if (instance.domObj.rtl || instance.domObj.classList.contains('clr-rtl')) {
      classes + ' clr-rtl', _readOnlyError("classes");
    }
    var parentNode = instance.domObj.parentNode;
    instance.domObj.insertAdjacentHTML('afterend', button);
    parentNode.classList.add(classes);
    instance.domObj.nextSibling.style.backgroundColor = instance.domObj.value;
  }

  /**
   * Close the color picker.
   * @param {boolean} [revert] If true, revert the color to the original value.
   */
  function closePicker(revert) {
    if (currentEl && !settings.inline) {
      var prevEl = currentEl;

      // Revert the color to the original value if needed
      if (revert) {
        // This will prevent the "change" event on the colorValue input to execute its handler
        currentEl = undefined;
        if (oldColor !== prevEl.value) {
          prevEl.value = oldColor;

          // Trigger an "input" event to force update the thumbnail next to the input field
          prevEl.dispatchEvent(new Event('input', {
            bubbles: true
          }));
        }
      }

      // Trigger a "change" event if needed
      setTimeout(function () {
        // Add this to the end of the event loop
        if (oldColor !== prevEl.value) {
          prevEl.dispatchEvent(new Event('change', {
            bubbles: true
          }));
        }
      });

      // Hide the picker dialog
      picker.classList.remove('clr-open');

      // Trigger a "close" event
      prevEl.dispatchEvent(new Event('close', {
        bubbles: true
      }));
      if (settings.focusInput) {
        prevEl.focus({
          preventScroll: true
        });
      }

      // This essentially marks the picker as closed
      currentEl = undefined;
    }
  }

  /**
   * Set the active color from a string.
   * @param {string} str String representing a color.
   */
  function setColorFromStr(str) {
    var rgba = strToRGBA(str);
    var hsva = RGBAtoHSVA(rgba);
    updateMarkerA11yLabel(hsva.s, hsva.v);
    updateColor(rgba, hsva);

    // Update the UI
    hueSlider.value = hsva.h;
    picker.style.color = "hsl(".concat(hsva.h, ", 100%, 50%)");
    hueMarker.style.left = "".concat(hsva.h / 360 * 100, "%");
    colorMarker.style.left = "".concat(colorAreaDims.width * hsva.s / 100, "px");
    colorMarker.style.top = "".concat(colorAreaDims.height - colorAreaDims.height * hsva.v / 100, "px");
    alphaSlider.value = hsva.a * 100;
    alphaMarker.style.left = "".concat(hsva.a * 100, "%");
  }

  /**
   * Guess the color format from a string.
   * @param {string} str String representing a color.
   * @return {string} The color format.
   */
  function getColorFormatFromStr(str) {
    var retval = "hex";
    var format = "";
    if (str) {
      format = str.substring(0, 3).toLowerCase();
      if (format === 'rgb' || format === 'hsl') {
        retval = format;
      }
    }
    return retval;
  }

  /**
   * Copy the active color to the linked input field.
   * @param {number} [color] Color value to override the active color.
   */
  function pickColor(color) {
    color = color !== undefined ? color : colorValue.value;
    if (currentEl) {
      currentEl.value = color;
      currentEl.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
    if (settings.onChange) {
      settings.onChange.call(window, color, currentEl);
    }
    document.dispatchEvent(new CustomEvent('coloris:pick', {
      detail: {
        color: color,
        currentEl: currentEl
      }
    }));
  }

  /**
   * Set the active color based on a specific point in the color gradient.
   * @param {number} x Left position.
   * @param {number} y Top position.
   */
  function setColorAtPosition(x, y) {
    var hsva = {
      h: hueSlider.value * 1,
      s: x / colorAreaDims.width * 100,
      v: 100 - y / colorAreaDims.height * 100,
      a: alphaSlider.value / 100
    };
    var rgba = HSVAtoRGBA(hsva);
    updateMarkerA11yLabel(hsva.s, hsva.v);
    updateColor(rgba, hsva);
    pickColor();
  }

  /**
   * Update the color marker's accessibility label.
   * @param {number} saturation
   * @param {number} value
   */
  function updateMarkerA11yLabel(saturation, value) {
    var label = settings.a11y.marker;
    saturation = saturation.toFixed(1) * 1;
    value = value.toFixed(1) * 1;
    label = label.replace('{s}', saturation);
    label = label.replace('{v}', value);
    colorMarker.setAttribute('aria-label', label);
  }

  //
  /**
   * Get the pageX and pageY positions of the pointer.
   * @param {object} event The MouseEvent or TouchEvent object.
   * @return {object} The pageX and pageY positions.
   */
  function getPointerPosition(event) {
    return {
      pageX: event.changedTouches ? event.changedTouches[0].pageX : event.pageX,
      pageY: event.changedTouches ? event.changedTouches[0].pageY : event.pageY
    };
  }

  /**
   * Move the color marker when dragged.
   * @param {object} event The MouseEvent object.
   */
  function moveMarker(event) {
    var pointer = getPointerPosition(event);
    var x = pointer.pageX - colorAreaDims.x;
    var y = pointer.pageY - colorAreaDims.y;
    if (container) {
      y += container.scrollTop;
    }
    setMarkerPosition(x, y);

    // Prevent scrolling while dragging the marker
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Move the color marker when the arrow keys are pressed.
   * @param {number} offsetX The horizontal amount to move.
   * @param {number} offsetY The vertical amount to move.
   */
  function moveMarkerOnKeydown(offsetX, offsetY) {
    var x = colorMarker.style.left.replace('px', '') * 1 + offsetX;
    var y = colorMarker.style.top.replace('px', '') * 1 + offsetY;
    setMarkerPosition(x, y);
  }

  /**
   * Set the color marker's position.
   * @param {number} x Left position.
   * @param {number} y Top position.
   */
  function setMarkerPosition(x, y) {
    // Make sure the marker doesn't go out of bounds
    x = x < 0 ? 0 : x > colorAreaDims.width ? colorAreaDims.width : x;
    y = y < 0 ? 0 : y > colorAreaDims.height ? colorAreaDims.height : y;

    // Set the position
    colorMarker.style.left = "".concat(x, "px");
    colorMarker.style.top = "".concat(y, "px");

    // Update the color
    setColorAtPosition(x, y);

    // Make sure the marker is focused
    colorMarker.focus();
  }

  /**
   * Update the color picker's input field and preview thumb.
   * @param {Object} rgba Red, green, blue and alpha values.
   * @param {Object} [hsva] Hue, saturation, value and alpha values.
   */
  function updateColor() {
    var rgba = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var hsva = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var format = settings.format;
    for (var key in rgba) {
      currentColor[key] = rgba[key];
    }
    for (var _key in hsva) {
      currentColor[_key] = hsva[_key];
    }
    var hex = RGBAToHex(currentColor);
    var opaqueHex = hex.substring(0, 7);
    colorMarker.style.color = opaqueHex;
    alphaMarker.parentNode.style.color = opaqueHex;
    alphaMarker.style.color = hex;
    colorPreview.style.color = hex;

    // Force repaint the color and alpha gradients as a workaround for a Google Chrome bug
    colorArea.style.display = 'none';
    colorArea.offsetHeight;
    colorArea.style.display = '';
    alphaMarker.nextElementSibling.style.display = 'none';
    alphaMarker.nextElementSibling.offsetHeight;
    alphaMarker.nextElementSibling.style.display = '';
    if (format === 'mixed') {
      format = currentColor.a === 1 ? 'hex' : 'rgb';
    } else if (format === 'auto') {
      format = currentFormat;
    }
    switch (format) {
      case 'hex':
        colorValue.value = hex;
        break;
      case 'rgb':
        colorValue.value = RGBAToStr(currentColor);
        break;
      case 'hsl':
        colorValue.value = HSLAToStr(HSVAtoHSLA(currentColor));
        break;
    }

    // Select the current format in the format switcher
    document.querySelector(".clr-format [value=\"".concat(format, "\"]")).checked = true;
  }

  /**
   * Set the hue when its slider is moved.
   */
  function setHue() {
    var hue = hueSlider.value * 1;
    var x = colorMarker.style.left.replace('px', '') * 1;
    var y = colorMarker.style.top.replace('px', '') * 1;
    picker.style.color = "hsl(".concat(hue, ", 100%, 50%)");
    hueMarker.style.left = "".concat(hue / 360 * 100, "%");
    setColorAtPosition(x, y);
  }

  /**
   * Set the alpha when its slider is moved.
   */
  function setAlpha() {
    var alpha = alphaSlider.value / 100;
    alphaMarker.style.left = "".concat(alpha * 100, "%");
    updateColor({
      a: alpha
    });
    pickColor();
  }

  /**
   * Convert HSVA to RGBA.
   * @param {object} hsva Hue, saturation, value and alpha values.
   * @return {object} Red, green, blue and alpha values.
   */
  function HSVAtoRGBA(hsva) {
    var saturation = hsva.s / 100;
    var value = hsva.v / 100;
    var chroma = saturation * value;
    var hueBy60 = hsva.h / 60;
    var x = chroma * (1 - Math.abs(hueBy60 % 2 - 1));
    var m = value - chroma;
    chroma = chroma + m;
    x = x + m;
    var index = Math.floor(hueBy60) % 6;
    var red = [chroma, x, m, m, x, chroma][index];
    var green = [x, chroma, chroma, x, m, m][index];
    var blue = [m, m, x, chroma, chroma, x][index];
    return {
      r: Math.round(red * 255),
      g: Math.round(green * 255),
      b: Math.round(blue * 255),
      a: hsva.a
    };
  }

  /**
   * Convert HSVA to HSLA.
   * @param {object} hsva Hue, saturation, value and alpha values.
   * @return {object} Hue, saturation, lightness and alpha values.
   */
  function HSVAtoHSLA(hsva) {
    var value = hsva.v / 100;
    var lightness = value * (1 - hsva.s / 100 / 2);
    var saturation;
    if (lightness > 0 && lightness < 1) {
      saturation = Math.round((value - lightness) / Math.min(lightness, 1 - lightness) * 100);
    }
    return {
      h: hsva.h,
      s: saturation || 0,
      l: Math.round(lightness * 100),
      a: hsva.a
    };
  }

  /**
   * Convert RGBA to HSVA.
   * @param {object} rgba Red, green, blue and alpha values.
   * @return {object} Hue, saturation, value and alpha values.
   */
  function RGBAtoHSVA(rgba) {
    var red = rgba.r / 255;
    var green = rgba.g / 255;
    var blue = rgba.b / 255;
    var xmax = Math.max(red, green, blue);
    var xmin = Math.min(red, green, blue);
    var chroma = xmax - xmin;
    var value = xmax;
    var hue = 0;
    var saturation = 0;
    if (chroma) {
      if (xmax === red) {
        hue = (green - blue) / chroma;
      }
      if (xmax === green) {
        hue = 2 + (blue - red) / chroma;
      }
      if (xmax === blue) {
        hue = 4 + (red - green) / chroma;
      }
      if (xmax) {
        saturation = chroma / xmax;
      }
    }
    hue = Math.floor(hue * 60);
    return {
      h: hue < 0 ? hue + 360 : hue,
      s: Math.round(saturation * 100),
      v: Math.round(value * 100),
      a: rgba.a
    };
  }

  /**
   * Parse a string to RGBA.
   * @param {string} str String representing a color.
   * @return {object} Red, green, blue and alpha values.
   */
  function strToRGBA(str) {
    var regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;
    var match, rgba;

    // Default to black for invalid color strings
    ctx.fillStyle = '#000';

    // Use canvas to convert the string to a valid color string
    ctx.fillStyle = str;
    match = regex.exec(ctx.fillStyle);
    if (match) {
      rgba = {
        r: match[3] * 1,
        g: match[4] * 1,
        b: match[5] * 1,
        a: match[6] * 1
      };

      // Workaround to mitigate a Chromium bug where the alpha value is rounded incorrectly
      rgba.a = +rgba.a.toFixed(2);
    } else {
      match = ctx.fillStyle.replace('#', '').match(/.{2}/g).map(function (h) {
        return parseInt(h, 16);
      });
      rgba = {
        r: match[0],
        g: match[1],
        b: match[2],
        a: 1
      };
    }
    return rgba;
  }

  /**
   * Convert RGBA to Hex.
   * @param {object} rgba Red, green, blue and alpha values.
   * @return {string} Hex color string.
   */
  function RGBAToHex(rgba) {
    var R = rgba.r.toString(16);
    var G = rgba.g.toString(16);
    var B = rgba.b.toString(16);
    var A = '';
    if (rgba.r < 16) {
      R = '0' + R;
    }
    if (rgba.g < 16) {
      G = '0' + G;
    }
    if (rgba.b < 16) {
      B = '0' + B;
    }
    if (settings.alpha && (rgba.a < 1 || settings.forceAlpha)) {
      var alpha = rgba.a * 255 | 0;
      A = alpha.toString(16);
      if (alpha < 16) {
        A = '0' + A;
      }
    }
    return '#' + R + G + B + A;
  }

  /**
   * Convert RGBA values to a CSS rgb/rgba string.
   * @param {object} rgba Red, green, blue and alpha values.
   * @return {string} CSS color string.
   */
  function RGBAToStr(rgba) {
    if (!settings.alpha || rgba.a === 1 && !settings.forceAlpha) {
      return "rgb(".concat(rgba.r, ", ").concat(rgba.g, ", ").concat(rgba.b, ")");
    } else {
      return "rgba(".concat(rgba.r, ", ").concat(rgba.g, ", ").concat(rgba.b, ", ").concat(rgba.a, ")");
    }
  }

  /**
   * Convert HSLA values to a CSS hsl/hsla string.
   * @param {object} hsla Hue, saturation, lightness and alpha values.
   * @return {string} CSS color string.
   */
  function HSLAToStr(hsla) {
    if (!settings.alpha || hsla.a === 1 && !settings.forceAlpha) {
      return "hsl(".concat(hsla.h, ", ").concat(hsla.s, "%, ").concat(hsla.l, "%)");
    } else {
      return "hsla(".concat(hsla.h, ", ").concat(hsla.s, "%, ").concat(hsla.l, "%, ").concat(hsla.a, ")");
    }
  }

  /**
   * Init the color picker.
   */
  function init() {
    // Render the UI
    container = undefined;
    picker = document.createElement('div');
    picker.setAttribute('id', 'clr-picker');
    picker.className = 'clr-picker';
    picker.innerHTML = "<input id=\"clr-color-value\" name=\"clr-color-value\" class=\"clr-color\" type=\"text\" value=\"\" spellcheck=\"false\" aria-label=\"".concat(settings.a11y.input, "\">") + "<div id=\"clr-color-area\" class=\"clr-gradient\" role=\"application\" aria-label=\"".concat(settings.a11y.instruction, "\">") + '<div id="clr-color-marker" class="clr-marker" tabindex="0"></div>' + '</div>' + '<div class="clr-hue">' + "<input id=\"clr-hue-slider\" name=\"clr-hue-slider\" type=\"range\" min=\"0\" max=\"360\" step=\"1\" aria-label=\"".concat(settings.a11y.hueSlider, "\">") + '<div id="clr-hue-marker"></div>' + '</div>' + '<div class="clr-alpha">' + "<input id=\"clr-alpha-slider\" name=\"clr-alpha-slider\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" aria-label=\"".concat(settings.a11y.alphaSlider, "\">") + '<div id="clr-alpha-marker"></div>' + '<span></span>' + '</div>' + '<div id="clr-format" class="clr-format">' + '<fieldset class="clr-segmented">' + "<legend>".concat(settings.a11y.format, "</legend>") + '<input id="clr-f1" type="radio" name="clr-format" value="hex">' + '<label for="clr-f1">Hex</label>' + '<input id="clr-f2" type="radio" name="clr-format" value="rgb">' + '<label for="clr-f2">RGB</label>' + '<input id="clr-f3" type="radio" name="clr-format" value="hsl">' + '<label for="clr-f3">HSL</label>' + '<span></span>' + '</fieldset>' + '</div>' + '<div id="clr-swatches" class="clr-swatches"></div>' + "<button type=\"button\" id=\"clr-clear\" class=\"clr-clear\" aria-label=\"".concat(settings.a11y.clear, "\">").concat(settings.clearLabel, "</button>") + '<div id="clr-color-preview" class="clr-preview">' + "<button type=\"button\" id=\"clr-close\" class=\"clr-close\" aria-label=\"".concat(settings.a11y.close, "\">").concat(settings.closeLabel, "</button>") + '</div>' + "<span id=\"clr-open-label\" hidden>".concat(settings.a11y.open, "</span>") + "<span id=\"clr-swatch-label\" hidden>".concat(settings.a11y.swatch, "</span>");

    // Append the color picker to the DOM
    document.body.appendChild(picker);

    // Reference the UI elements
    colorArea = getEl('clr-color-area');
    colorMarker = getEl('clr-color-marker');
    clearButton = getEl('clr-clear');
    closeButton = getEl('clr-close');
    colorPreview = getEl('clr-color-preview');
    colorValue = getEl('clr-color-value');
    hueSlider = getEl('clr-hue-slider');
    hueMarker = getEl('clr-hue-marker');
    alphaSlider = getEl('clr-alpha-slider');
    alphaMarker = getEl('clr-alpha-marker');

    // Bind the picker to the default selector
    initInstances(settings.el, settings);
    //bindFields(settings.el);
    //wrapFields(settings);
    //addButtonThumb(settings);

    addListener(picker, 'mousedown', function (event) {
      picker.classList.remove('clr-keyboard-nav');
      event.stopPropagation();
    });
    addListener(colorArea, 'mousedown', function (event) {
      addListener(document, 'mousemove', moveMarker);
    });
    addListener(colorArea, 'touchstart', function (event) {
      document.addEventListener('touchmove', moveMarker, {
        passive: false
      });
    });
    addListener(colorMarker, 'mousedown', function (event) {
      addListener(document, 'mousemove', moveMarker);
    });
    addListener(colorMarker, 'touchstart', function (event) {
      document.addEventListener('touchmove', moveMarker, {
        passive: false
      });
    });
    addListener(colorValue, 'change', function (event) {
      var value = colorValue.value;
      if (currentEl || settings.inline) {
        var color = value === '' ? value : setColorFromStr(value);
        pickColor(color);
      }
    });
    addListener(clearButton, 'click', function (event) {
      pickColor('');
      closePicker();
    });
    addListener(closeButton, 'click', function (event) {
      pickColor();
      closePicker();
    });
    addListener(getEl('clr-format'), 'click', '.clr-format input', function (event) {
      currentFormat = event.target.value;
      updateColor();
      pickColor();
    });
    addListener(picker, 'click', '.clr-swatches button', function (event) {
      setColorFromStr(event.target.textContent);
      pickColor();
      if (settings.swatchesOnly) {
        closePicker();
      }
    });
    addListener(document, 'mouseup', function (event) {
      document.removeEventListener('mousemove', moveMarker);
    });
    addListener(document, 'touchend', function (event) {
      document.removeEventListener('touchmove', moveMarker);
    });
    addListener(document, 'mousedown', function (event) {
      keyboardNav = false;
      picker.classList.remove('clr-keyboard-nav');
      closePicker();
    });
    addListener(document, 'keydown', function (event) {
      var key = event.key;
      var target = event.target;
      var shiftKey = event.shiftKey;
      var navKeys = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (key === 'Escape') {
        closePicker(true);

        // Display focus rings when using the keyboard
      } else if (navKeys.includes(key)) {
        keyboardNav = true;
        picker.classList.add('clr-keyboard-nav');
      }

      // Trap the focus within the color picker while it's open
      if (key === 'Tab' && target.matches('.clr-picker *')) {
        var focusables = getFocusableElements();
        var firstFocusable = focusables.shift();
        var lastFocusable = focusables.pop();
        if (shiftKey && target === firstFocusable) {
          lastFocusable.focus();
          event.preventDefault();
        } else if (!shiftKey && target === lastFocusable) {
          firstFocusable.focus();
          event.preventDefault();
        }
      }
    });
    addListener(document, 'click', '.clr-field button', function (event) {
      // Open the color picker
      if (event.target.classList.contains('clr-button')) {
        //event.target.dispatchEvent(new Event('click', { bubbles: true }));  
        if (event.target.previousElementSibling && (event.target.previousElementSibling.classList.contains('clr-button') || event.target.previousElementSibling.hasAttribute("data-coloris"))) {
          event.target.previousElementSibling.dispatchEvent(new Event('click', {
            bubbles: true
          }));
        } else if (event.target.nextElementSibling && (event.target.nextElementSibling.classList.contains('clr-button') || event.target.nextElementSibling.hasAttribute("data-coloris"))) {
          event.target.nextElementSibling.dispatchEvent(new Event('click', {
            bubbles: true
          }));
        }
      }
    });
    addListener(colorMarker, 'keydown', function (event) {
      var movements = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0]
      };
      if (Object.keys(movements).includes(event.key)) {
        moveMarkerOnKeydown.apply(void 0, _toConsumableArray(movements[event.key]));
        event.preventDefault();
      }
    });
    addListener(colorArea, 'click', moveMarker);
    addListener(hueSlider, 'input', setHue);
    addListener(alphaSlider, 'input', setAlpha);
  }

  /**
   * Return a list of focusable elements within the color picker.
   * @return {array} The list of focusable DOM elemnts.
   */
  function getFocusableElements() {
    var controls = Array.from(picker.querySelectorAll('input, button'));
    var focusables = controls.filter(function (node) {
      return !!node.offsetWidth;
    });
    return focusables;
  }

  /**
   * Shortcut for getElementById to optimize the minified JS.
   * @param {string} id The element id.
   * @return {object} The DOM element with the provided id.
   */
  function getEl(id) {
    return document.getElementById(id);
  }

  /**
   * Shortcut for addEventListener to optimize the minified JS.
   * @param {object} context The context to which the listener is attached.
   * @param {string} type Event type.
   * @param {(string|function)} selector Event target if delegation is used, event handler if not.
   * @param {function} [fn] Event handler if delegation is used.
   */
  function addListener(context, type, selector, fn) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;

    // Delegate event to the target of the selector
    if (typeof selector === 'string') {
      context.addEventListener(type, function (event) {
        if (matches.call(event.target, selector)) {
          fn.call(event.target, event);
        }
      });

      // If the selector is not a string then it's a function
      // in which case we need a regular event listener
    } else {
      fn = selector;
      context.addEventListener(type, fn);
    }
  }

  /**
   * Call a function only when the DOM is ready.
   * @param {function} fn The function to call.
   * @param {array} [args] Arguments to pass to the function.
   */
  function DOMReady(fn, args) {
    args = args !== undefined ? args : [];
    if (document.readyState !== 'loading') {
      //fn(...args);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        fn.apply(void 0, _toConsumableArray(args));
      });
    }
  }

  // Polyfill for Nodelist.forEach
  if (NodeList !== undefined && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Expose the color picker to the global scope
  window.Coloris = function () {
    var methods = {
      set: configure,
      wrap: wrapFields,
      close: closePicker,
      updatePosition: updatePickerPosition,
      ready: DOMReady,
      redrawColoris: redrawColoris
    };
    function Coloris(options) {
      DOMReady(function () {
        if (options) {
          wrapFields(options);
          //addButtonThumb(options);
        }
      });
      if (options && Coloris.instances) {
        wrapFields(options);
        //addButtonThumb(options);
      }
    }
    var _loop3 = function _loop3(key) {
      Coloris[key] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
          args[_key2] = arguments[_key2];
        }
        DOMReady(methods[key], args);
      };
    };
    for (var key in methods) {
      _loop3(key);
    }
    return Coloris;
  }();

  // Init the color picker when the DOM is ready
  DOMReady(init);
})(window, document, Math);