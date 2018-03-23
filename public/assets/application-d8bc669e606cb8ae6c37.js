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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************************************!*\
  !*** ./app/javascript/packs/application.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: /vagrant/mytodo/.babelrc: Error while parsing JSON - Bad identifier as unquoted key at line 1 column 3 of the JSON5 data. Still to read: \"{\\n  \\\"presets\\\": [\\n   \"\n    at error (/vagrant/mytodo/node_modules/json5/lib/json5.js:56:25)\n    at identifier (/vagrant/mytodo/node_modules/json5/lib/json5.js:112:17)\n    at object (/vagrant/mytodo/node_modules/json5/lib/json5.js:454:31)\n    at value (/vagrant/mytodo/node_modules/json5/lib/json5.js:482:20)\n    at Object.parse (/vagrant/mytodo/node_modules/json5/lib/json5.js:508:18)\n    at ConfigChainBuilder.addConfig (/vagrant/mytodo/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:150:65)\n    at ConfigChainBuilder.findConfigs (/vagrant/mytodo/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:96:16)\n    at buildConfigChain (/vagrant/mytodo/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:61:13)\n    at OptionManager.init (/vagrant/mytodo/node_modules/babel-core/lib/transformation/file/options/option-manager.js:354:58)\n    at File.initOptions (/vagrant/mytodo/node_modules/babel-core/lib/transformation/file/index.js:212:65)\n    at new File (/vagrant/mytodo/node_modules/babel-core/lib/transformation/file/index.js:135:24)\n    at Pipeline.transform (/vagrant/mytodo/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\n    at transpile (/vagrant/mytodo/node_modules/babel-loader/lib/index.js:50:20)\n    at /vagrant/mytodo/node_modules/babel-loader/lib/fs-cache.js:118:18\n    at ReadFileContext.callback (/vagrant/mytodo/node_modules/babel-loader/lib/fs-cache.js:31:21)\n    at FSReqWrap.readFileAfterOpen [as oncomplete] (fs.js:441:13)");

/***/ })
/******/ ]);
//# sourceMappingURL=application-d8bc669e606cb8ae6c37.js.map