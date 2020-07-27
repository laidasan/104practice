// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"source/carousel/carousel-item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var carouselItem = {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  template: "\n    <div class=\"carousel__item\"  :style=\"getSrc\">\n        <div class=\"carousel__item__bk\" :style=\"getSrc\"></div>\n        <div class=\"carousel__item__content\"></div>\n    </div>\n    ",
  computed: {
    getSrc: function getSrc() {
      return "background-image: url('".concat(this.src, "')");
    }
  }
};
var _default = carouselItem;
exports.default = _default;
},{}],"source/carousel/carousel-control-points.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var carouselControlPoints = {
  props: {
    total: {
      type: Number,
      default: 0
    },
    active: {
      type: Number
    }
  },
  template: "\n    <ul class=\"carousel__control__points\">\n        <li \n        v-for=\"num in total\" \n        :key=\"num + 'a'\" \n        @click=\"$emit('click',num - 1)\" \n        :class=\"{active: num - 1 === active}\"\n        @mouseenter=\"$emit('mouseenter')\"\n        @mouseleave=\"$emit('mouseleave')\"\n        ></li>\n    </ul>"
};
var _default = carouselControlPoints;
exports.default = _default;
},{}],"source/carousel/carousel-control-arrow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var carouselControlArrow = {
  props: {
    direct: {
      type: String,
      required: true
    }
  },
  template: "\n    <div class=\"carousel__control__arrow\" \n    @click=\"$emit(getDirect)\"\n    @mouseenter=\"$emit('mouseenter')\"\n    @mouseleave=\"$emit('mouseleave')\"\n    ></div>\n    ",
  computed: {
    getDirect: function getDirect() {
      return this.direct;
    }
  }
};
var _default = carouselControlArrow;
exports.default = _default;
},{}],"source/carousel/carousel-control.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _carouselControlPoints = _interopRequireDefault(require("./carousel-control-points"));

var _carouselControlArrow = _interopRequireDefault(require("./carousel-control-arrow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carouselControl = {
  props: {
    total: {
      type: Number,
      default: 0
    },
    active: {
      type: Number
    }
  },
  components: {
    carouselControlPoints: _carouselControlPoints.default,
    carouselControlArrow: _carouselControlArrow.default
  },
  template: "\n    <div class=\"carousel__control\">\n        <carousel-control-points \n        :total=\"total\" \n        :active=\"active\" \n        @click=\"click\" \n        @mouseenter=\"$emit('mouseHover')\" \n        @mouseleave=\"$emit('mouseLeave')\"\n        ></carousel-control-points>\n    \n        <carousel-control-arrow class=\"next\" \n        direct=\"next\" \n        @next=\"$emit('next')\" @mouseenter=\"$emit('mouseHover')\" @mouseleave=\"$emit('mouseLeave')\"\n        ></carousel-control-arrow>\n        <carousel-control-arrow class=\"prev\" \n        direct=\"prev\" \n        @prev=\"$emit('prev')\" @mouseenter=\"$emit('mouseHover')\" @mouseleave=\"$emit('mouseLeave')\"\n        ></carousel-control-arrow>\n    </div>\n    ",
  methods: {
    click: function click(val) {
      this.$emit('click', val);
    }
  }
};
var _default = carouselControl;
exports.default = _default;
},{"./carousel-control-points":"source/carousel/carousel-control-points.js","./carousel-control-arrow":"source/carousel/carousel-control-arrow.js"}],"source/carousel/carousel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _carouselItem = _interopRequireDefault(require("./carousel-item"));

var _carouselControl = _interopRequireDefault(require("./carousel-control"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `
// <carousel-control
//             :total="total"
//             :active="active"
//             @click="changeContent"
//             @mouseenter="mouseHover"
//             @mouseleave="mouseLeave"
//             @next="nextHandler"
//             @prev="prevHandler"
//             ></carousel-control>
//             `
var carousel = {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data: function data() {
    return {
      active: 0,
      total: this.list.length,
      direct: 0,
      isHover: false
    };
  },
  components: {
    carouselItem: _carouselItem.default,
    carouselControl: _carouselControl.default
  },
  template: "\n    <div class=\"carousel\">\n        <div class=\"carousel-container\">\n            <transition :name=\"trans\">\n                <carousel-item :src=\"list[active].src\" :key=\"list[active].id\"></carousel-item>\n            </transition>  \n            <carousel-control\n            :total=\"total\"\n            :active=\"active\"\n            @click=\"changeItem\"\n            @next=\"nextHandler\"\n            @prev=\"prevHandler\"\n            ></carousel-control>\n        </div>\n    </div>\n    ",
  computed: {
    trans: function trans() {
      return this.direct ? 'move-left' : 'move-right';
    }
  },
  methods: {
    mouseHover: function mouseHover() {
      this.isHover = true;
    },
    mouseLeave: function mouseLeave() {
      this.isHover = false;
    },
    changeItem: function changeItem(val) {
      this.active = Math.abs(val) % this.total;
    },
    nextHandler: function nextHandler() {
      this.direct = 1;
      this.changeItem(this.active + 1);
    },
    prevHandler: function prevHandler() {
      this.direct = 0;
      this.changeItem(this.active - 1);
    },
    go: function go() {
      this.isHover ? '' : this.nextHandler();
    }
  }
};
var _default = carousel;
exports.default = _default;
},{"./carousel-item":"source/carousel/carousel-item.js","./carousel-control":"source/carousel/carousel-control.js"}],"source/app.js":[function(require,module,exports) {
"use strict";

var _carousel = _interopRequireDefault(require("./carousel/carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeout = null;
var intervalTime = 3000;
var data = {
  activeMenu: false,
  nowPath: 0,
  menuList: [{
    id: 0,
    text: 'Home'
  }, {
    id: 1,
    text: 'About'
  }, {
    id: 2,
    text: 'Concat'
  }],
  bannerList: [{
    id: 0,
    src: 'https://picsum.photos/id/100/1440/505'
  }, {
    id: 1,
    src: 'https://picsum.photos/id/1000/1440/505'
  }, {
    id: 2,
    src: 'https://picsum.photos/id/1001/1440/505'
  }]
};
new Vue({
  el: '#app',
  data: data,
  mounted: function mounted() {// timeout = setInterval(() => {
    //     this.carouselGo()
    // },intervalTime)
  },
  beforeDestory: function beforeDestory() {// clearInterval(timeout)
  },
  components: {
    carousel: _carousel.default
  },
  methods: {
    toggleMenu: function toggleMenu() {
      this.activeMenu = !this.activeMenu;
    },
    goPage: function goPage(index) {
      this.nowPath = index;
    },
    carouselGo: function carouselGo() {
      this.$children.forEach(function (com) {
        return com.go();
      });
    }
  }
});
},{"./carousel/carousel":"source/carousel/carousel.js"}],"../../../../.nvm/versions/node/v12.18.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54283" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v12.18.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","source/app.js"], null)
//# sourceMappingURL=/app.4d8479e0.js.map