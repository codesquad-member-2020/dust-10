/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/forecast/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./css/style.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\nvar exported = content.locals ? content.locals : {};\n\n\n\nmodule.exports = exported;\n\n//# sourceURL=webpack:///./css/style.css?");

/***/ }),

/***/ "./js/forecast/fetchData.js":
/*!**********************************!*\
  !*** ./js/forecast/fetchData.js ***!
  \**********************************/
/*! exports provided: imageArea, fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"imageArea\", function() { return imageArea; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchData\", function() { return fetchData; });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./js/forecast/util.js\");\n\r\n\r\nconst imageArea = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".forecast__map\");\r\nconst contentArea = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".forecast__content\");\r\nconst gradeArea = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".forecast__grade\");\r\nconst imageMapKey = \"imageUrl\";\r\nconst imageClassName = \"map__img\";\r\nconst imageMapAlt = \"미세먼지 예보 이미지\";\r\n\r\nconst maxImageLength = 3;\r\nconst finished = {};\r\n\r\nfunction fetchData(url, func) {\r\n  finished.func = func;\r\n  fetch(url)\r\n    .then(res => res.json())\r\n    .then(data => handleData(data));\r\n}\r\n\r\nfunction handleData(data) {\r\n  const forecastData = data.forecast;\r\n  const forecastContent = forecastData.informOverall;\r\n  const forecastGrade = forecastData.informGrade;\r\n  const forecastMaps = [];\r\n\r\n  for (const key in forecastData) {\r\n    if (key.startsWith(imageMapKey)) {\r\n      forecastMaps.push(forecastData[key]);\r\n    }\r\n  }\r\n\r\n  appendData(forecastContent, contentArea);\r\n  appendData(forecastGrade, gradeArea);\r\n  appendImage(forecastMaps);\r\n}\r\n\r\nfunction appendImage(imageUrl) {\r\n  const firstImage = 0;\r\n\r\n  for (let i = 0; i < maxImageLength; i++) {\r\n    const image = new Image();\r\n    image.src = imageUrl[i];\r\n    image.alt = imageMapAlt;\r\n    if (i === firstImage) Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_c\"])(image).add(\"on-block\");\r\n    Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_c\"])(image).add(imageClassName);\r\n    imageArea.appendChild(image);\r\n  }\r\n\r\n  finished.func();\r\n}\r\n\r\nfunction appendData(data, area) {\r\n  return (area.innerHTML = data);\r\n}\r\n\n\n//# sourceURL=webpack:///./js/forecast/fetchData.js?");

/***/ }),

/***/ "./js/forecast/forecast.js":
/*!*********************************!*\
  !*** ./js/forecast/forecast.js ***!
  \*********************************/
/*! exports provided: onEvent, initImageBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"onEvent\", function() { return onEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initImageBox\", function() { return initImageBox; });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./js/forecast/util.js\");\n/* harmony import */ var _fetchData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchData.js */ \"./js/forecast/fetchData.js\");\n\r\n\r\nconst pauseBtn = \"controls__pause\";\r\nconst playControls = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".play-box__controls\");\r\nconst scrubberBtn = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".progress-bar__scrubber-btn\");\r\nconst progressBar = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".play-box__progress-bar\");\r\nconst progress = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".progress-bar__progress\");\r\n\r\nconst movingSpeed = 2;\r\n\r\nconst playBox = {\r\n  playPosition: 0,\r\n  distanceList: [],\r\n  position: null,\r\n  progressBarWidth: progressBar.offsetWidth\r\n};\r\n\r\nconst imageBox = {\r\n  imageList: [],\r\n  index: 0,\r\n  length: null\r\n};\r\n\r\nfunction onToggleToBtn() {\r\n  return [...playControls.children].forEach(btn =>\r\n    btn.classList.toggle(\"on-none\")\r\n  );\r\n}\r\n\r\nfunction onEvent() {\r\n  Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"__$\"])(playControls).on(\"touchend\", ({ target }) => handleControls(target));\r\n  Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"__$\"])(scrubberBtn).on(\"touchstart\", event => handleScrubberBtn(event));\r\n  Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"__$\"])(progressBar).on(\"touchstart\", event => handleProgressBar(event));\r\n}\r\n\r\nfunction handleProgressBar(event) {\r\n  const moveOffsetX = getPosition(event);\r\n\r\n  playBox.position = moveOffsetX;\r\n  moveScrubberBtn(moveOffsetX);\r\n  changeImage();\r\n}\r\n\r\nfunction handleScrubberBtn(event) {\r\n  const moveOffsetX = getPosition(event);\r\n\r\n  Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"__$\"])(scrubberBtn).on(\"touchmove\", event =>\r\n    handleTouchMove(event, moveOffsetX)\r\n  );\r\n}\r\n\r\nfunction getPosition(event) {\r\n  const clientX = event.touches[0].clientX;\r\n  const startX = event.target.offsetLeft;\r\n  return clientX - startX;\r\n}\r\n\r\nfunction handleTouchMove(event, moveOffsetX) {\r\n  const clientMoveX = event.touches[0].clientX;\r\n  playBox.position = clientMoveX - moveOffsetX;\r\n\r\n  const outOfRange =\r\n    playBox.position < 0 || playBox.position > playBox.progressBarWidth;\r\n  if (outOfRange) return;\r\n\r\n  moveScrubberBtn();\r\n  changeImage();\r\n}\r\n\r\nfunction handleControls(target) {\r\n  onToggleToBtn();\r\n\r\n  const classList = target.classList;\r\n  if ([...classList].includes(pauseBtn)) return pauseImageBox();\r\n  return playImageBox();\r\n}\r\n\r\nfunction initImageBox() {\r\n  imageBox.imageList = [..._fetchData_js__WEBPACK_IMPORTED_MODULE_1__[\"imageArea\"].children];\r\n  imageBox.length = imageBox.imageList.length;\r\n\r\n  return getMovingDistance();\r\n}\r\n\r\nfunction getMovingDistance() {\r\n  playBox.progressBarWidth = progressBar.offsetWidth;\r\n\r\n  const movingDistance = playBox.progressBarWidth / imageBox.length;\r\n  return getMovingDistanceList(movingDistance);\r\n}\r\n\r\nfunction getMovingDistanceList(movingDistance) {\r\n  let distance = null;\r\n  playBox.distanceList = [];\r\n\r\n  return imageBox.imageList.forEach(_ => {\r\n    distance += movingDistance;\r\n    playBox.distanceList.push(distance);\r\n  });\r\n}\r\n\r\nfunction playImageBox() {\r\n  getMovingDistance(); //progressBar width변경 없는지 다시한번 확인\r\n  playBox.position += movingSpeed;\r\n\r\n  const outOfRange = playBox.position >= playBox.progressBarWidth;\r\n  if (outOfRange) playBox.position = 0;\r\n\r\n  moveScrubberBtn();\r\n  changeImage();\r\n  playBox.play = requestAnimationFrame(playImageBox);\r\n}\r\n\r\nfunction moveScrubberBtn(distance = playBox.position) {\r\n  scrubberBtn.style.left = `${distance}px`;\r\n  return (progress.style.width = `${distance}px`);\r\n}\r\n\r\nfunction changeImage() {\r\n  const currentImageIndex = findImageIndex(playBox.position);\r\n  if (imageBox.index === currentImageIndex) return;\r\n\r\n  imageBox.index = currentImageIndex;\r\n\r\n  const previousImage = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"_$\"])(\".on-block\");\r\n  if (previousImage) Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"__$\"])(previousImage).hide();\r\n\r\n  Object(_util_js__WEBPACK_IMPORTED_MODULE_0__[\"__$\"])(imageBox.imageList[imageBox.index]).show();\r\n}\r\n\r\nfunction findImageIndex(position) {\r\n  return playBox.distanceList.findIndex(distance => position <= distance);\r\n}\r\n\r\nfunction pauseImageBox() {\r\n  return cancelAnimationFrame(playBox.play);\r\n}\r\n\n\n//# sourceURL=webpack:///./js/forecast/forecast.js?");

/***/ }),

/***/ "./js/forecast/main.js":
/*!*****************************!*\
  !*** ./js/forecast/main.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fetchData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchData.js */ \"./js/forecast/fetchData.js\");\n/* harmony import */ var _forecast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forecast.js */ \"./js/forecast/forecast.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css/style.css */ \"./css/style.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_style_css__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nconst forecastApi = `http://13.125.3.28:8080/api/forecast`;\r\n\r\nfunction init() {\r\n  return Object(_fetchData_js__WEBPACK_IMPORTED_MODULE_0__[\"fetchData\"])(forecastApi, startForecast);\r\n}\r\n\r\nfunction startForecast() {\r\n  Object(_forecast_js__WEBPACK_IMPORTED_MODULE_1__[\"onEvent\"])();\r\n  Object(_forecast_js__WEBPACK_IMPORTED_MODULE_1__[\"initImageBox\"])();\r\n}\r\nwindow.addEventListener(\"DOMContentLoaded\", init);\r\n\n\n//# sourceURL=webpack:///./js/forecast/main.js?");

/***/ }),

/***/ "./js/forecast/util.js":
/*!*****************************!*\
  !*** ./js/forecast/util.js ***!
  \*****************************/
/*! exports provided: _$, _c, __, __$ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_$\", function() { return _$; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"_c\", function() { return _c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__\", function() { return __; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__$\", function() { return __$; });\nfunction _$(selector, all, target = document) {\r\n  return all\r\n    ? target.querySelectorAll(selector)\r\n    : target.querySelector(selector);\r\n}\r\n\r\nfunction _c(target) {\r\n  return {\r\n    add(className) {\r\n      target.classList.add(className);\r\n    },\r\n    remove(className) {\r\n      target.classList.remove(className);\r\n    }\r\n  };\r\n}\r\n\r\nfunction __(element) {\r\n  const target = _$(element);\r\n  return {\r\n    on(event, func) {\r\n      target.addEventListener(event, func);\r\n    },\r\n    show(className = \"on-block\") {\r\n      target.classList.add(className);\r\n    },\r\n    hide(className = \"on-block\") {\r\n      target.classList.remove(className);\r\n    },\r\n    transition(target, property) {\r\n      target.style.transition = property;\r\n    }\r\n  };\r\n}\r\n\r\nfunction __$(target) {\r\n  return {\r\n    on(event, func) {\r\n      target.addEventListener(event, func);\r\n    },\r\n    show(className = \"on-block\") {\r\n      target.classList.add(className);\r\n    },\r\n    hide(className = \"on-block\") {\r\n      target.classList.remove(className);\r\n    },\r\n    transition(property) {\r\n      target.style.transition = property;\r\n    }\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack:///./js/forecast/util.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/forecast.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/forecast.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".dust__title {\\r\\n  padding: 3%;\\r\\n  font-size: 35px;\\r\\n  font-weight: bold;\\r\\n}\\r\\n\\r\\n#dust__forecast,\\r\\n.grade {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n#dust__forecast .map__img {\\r\\n  display: none;\\r\\n  width: 100%;\\r\\n}\\r\\n\\r\\n#dust__forecast .forecast__container {\\r\\n  max-width: 730px;\\r\\n}\\r\\n\\r\\n#dust__forecast .forecast__content,\\r\\n#dust__forecast .forecast__grade {\\r\\n  margin: 15px;\\r\\n  font-family: AppleSDGothicNeo, Noto Sans KR, sans-serif;\\r\\n}\\r\\n\\r\\n#dust__forecast .forecast__content {\\r\\n  font-size: 17px;\\r\\n  line-height: 18px;\\r\\n}\\r\\n\\r\\n#dust__forecast .forecast__grade {\\r\\n  font-size: 15px;\\r\\n  line-height: 16px;\\r\\n  color: #777;\\r\\n}\\r\\n\\r\\n#dust__forecast .forecast__play-box {\\r\\n  display: flex;\\r\\n}\\r\\n\\r\\n#forecast__play-box {\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n  margin: 4% 0%;\\r\\n  width: 100%;\\r\\n}\\r\\n\\r\\n#forecast__play-box .play-box__progress-bar {\\r\\n  position: relative;\\r\\n  margin-left: 20px;\\r\\n  height: 3px;\\r\\n  width: 60%;\\r\\n  background: rgb(226, 229, 232);\\r\\n}\\r\\n\\r\\n#forecast__play-box .progress-bar__progress {\\r\\n  width: 0;\\r\\n  height: 3px;\\r\\n  background-color: #12cad6;\\r\\n}\\r\\n\\r\\n#forecast__play-box .progress-bar__scrubber-btn {\\r\\n  position: absolute;\\r\\n  top: -7px;\\r\\n  left: 0;\\r\\n  width: 19px;\\r\\n  height: 19px;\\r\\n  border-radius: 50%;\\r\\n  background-color: #fff;\\r\\n  box-shadow: -2px -2px 10px silver;\\r\\n}\\r\\n\\r\\n#dust__forecast .on-block {\\r\\n  display: block;\\r\\n}\\r\\n\\r\\n#dust__forecast .on-none {\\r\\n  display: none;\\r\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./css/forecast.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/reset.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/reset.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* http://meyerweb.com/eric/tools/css/reset/ \\r\\n   v2.0 | 20110126\\r\\n   License: none (public domain)\\r\\n*/\\r\\n\\r\\nhtml,\\r\\nbody,\\r\\ndiv,\\r\\nspan,\\r\\napplet,\\r\\nobject,\\r\\niframe,\\r\\nh1,\\r\\nh2,\\r\\nh3,\\r\\nh4,\\r\\nh5,\\r\\nh6,\\r\\np,\\r\\nblockquote,\\r\\npre,\\r\\na,\\r\\nabbr,\\r\\nacronym,\\r\\naddress,\\r\\nbig,\\r\\ncite,\\r\\ncode,\\r\\ndel,\\r\\ndfn,\\r\\nem,\\r\\nimg,\\r\\nins,\\r\\nkbd,\\r\\nq,\\r\\ns,\\r\\nsamp,\\r\\nsmall,\\r\\nstrike,\\r\\nstrong,\\r\\nsub,\\r\\nsup,\\r\\ntt,\\r\\nvar,\\r\\nb,\\r\\nu,\\r\\ni,\\r\\ncenter,\\r\\ndl,\\r\\ndt,\\r\\ndd,\\r\\nol,\\r\\nul,\\r\\nli,\\r\\nfieldset,\\r\\nform,\\r\\nlabel,\\r\\nlegend,\\r\\ntable,\\r\\ncaption,\\r\\ntbody,\\r\\ntfoot,\\r\\nthead,\\r\\ntr,\\r\\nth,\\r\\ntd,\\r\\narticle,\\r\\naside,\\r\\ncanvas,\\r\\ndetails,\\r\\nembed,\\r\\nfigure,\\r\\nfigcaption,\\r\\nfooter,\\r\\nheader,\\r\\nhgroup,\\r\\nmenu,\\r\\nnav,\\r\\noutput,\\r\\nruby,\\r\\nsection,\\r\\nsummary,\\r\\ntime,\\r\\nmark,\\r\\naudio,\\r\\nvideo {\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  border: 0;\\r\\n  font-size: 100%;\\r\\n  font: inherit;\\r\\n  vertical-align: baseline;\\r\\n  box-sizing: border-box;\\r\\n  font-family: \\\"Poor Story\\\", cursive;\\r\\n}\\r\\n/* HTML5 display-role reset for older browsers */\\r\\narticle,\\r\\naside,\\r\\ndetails,\\r\\nfigcaption,\\r\\nfigure,\\r\\nfooter,\\r\\nheader,\\r\\nhgroup,\\r\\nmenu,\\r\\nnav,\\r\\nsection {\\r\\n  display: block;\\r\\n}\\r\\nbody {\\r\\n  line-height: 1;\\r\\n}\\r\\nol,\\r\\nul {\\r\\n  list-style: none;\\r\\n}\\r\\nblockquote,\\r\\nq {\\r\\n  quotes: none;\\r\\n}\\r\\nblockquote:before,\\r\\nblockquote:after,\\r\\nq:before,\\r\\nq:after {\\r\\n  content: \\\"\\\";\\r\\n  content: none;\\r\\n}\\r\\ntable {\\r\\n  border-collapse: collapse;\\r\\n  border-spacing: 0;\\r\\n}\\r\\nimg {\\r\\n  vertical-align: top;\\r\\n}\\r\\nbutton {\\r\\n  border: none;\\r\\n  outline: 0;\\r\\n  margin: 0;\\r\\n  padding: 0;\\r\\n  width: auto;\\r\\n  overflow: visible;\\r\\n  background: transparent;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./css/reset.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/style.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./forecast.css */ \"./node_modules/css-loader/dist/cjs.js!./css/forecast.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./reset.css */ \"./node_modules/css-loader/dist/cjs.js!./css/reset.css\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_1___);\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css2?family=Poor+Story&display=swap);\"]);\n// Module\nexports.push([module.i, \".nav {\\r\\n  display: flex;\\r\\n}\\r\\n.nav a {\\r\\n  font-weight: bold;\\r\\n  font-size: 25px;\\r\\n  text-decoration: none;\\r\\n  color: black;\\r\\n}\\r\\n.nav_button {\\r\\n  border: none;\\r\\n  width: 50%;\\r\\n  height: 70px;\\r\\n  background-color: #f8fafb;\\r\\n}\\r\\n.grade {\\r\\n  padding: 10px;\\r\\n  background: linear-gradient(to bottom, #32f1ff, white);\\r\\n}\\r\\n.grade_emoji {\\r\\n  margin-top: 15px;\\r\\n  font-size: 150px;\\r\\n}\\r\\n.grade_condition {\\r\\n  margin-top: 30px;\\r\\n  font-size: 30px;\\r\\n  font-weight: bold;\\r\\n}\\r\\n.grade_unit {\\r\\n  margin-top: 20px;\\r\\n  font-weight: bold;\\r\\n}\\r\\n.measuring_station {\\r\\n  margin-top: 2%;\\r\\n  font-weight: bold;\\r\\n}\\r\\n.station_list {\\r\\n  margin-top: 20px;\\r\\n  max-height: 408px;\\r\\n  min-height: 200px;\\r\\n  overflow-y: scroll;\\r\\n}\\r\\n\\r\\n.line {\\r\\n  border-bottom: 1px solid #ccc;\\r\\n  height: 18px;\\r\\n}\\r\\n\\r\\n.line_text {\\r\\n  animation: stack 2s 1;\\r\\n  text-align: right;\\r\\n  font-size: 15px;\\r\\n  font-weight: bold;\\r\\n  display: block;\\r\\n  border-radius: 10px;\\r\\n}\\r\\n\\r\\n@keyframes stack {\\r\\n  0% {\\r\\n    width: 0;\\r\\n    color: rgba(255, 255, 255, 0);\\r\\n  }\\r\\n  40% {\\r\\n    color: rgba(255, 255, 255, 0);\\r\\n  }\\r\\n  100% {\\r\\n    width: 100%;\\r\\n    color: rgba(255, 255, 255, 0);\\r\\n  }\\r\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./css/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ });