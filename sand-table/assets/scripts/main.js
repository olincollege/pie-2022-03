/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/main.js":
/*!************************************!*\
  !*** ./src/assets/scripts/main.js ***!
  \************************************/
/***/ (function() {

eval("$(document).ready(function () {\n  setTimeout(function () {\n    $('body').css('opacity', 1);\n  }, 1000);\n\n  function unveilImages() {\n    $('.lazy').unveil(1000, function () {\n      $(this).on('load', function () {\n        this.style.opacity = 1;\n      });\n    });\n  }\n\n  $('#showreel').hover(function (e) {\n    e.preventDefault();\n  });\n  $('#hero-cta-button').click(function () {\n    $('.collapse').collapse();\n  });\n  $('.collapse-container').hover(function () {\n    console.log('collapse container hovered');\n    console.log($(this).attr('data-primary-color'));\n    $('html, body').css('background-color', $(this).attr('data-primary-color'));\n  });\n  unveilImages();\n});\n\n//# sourceURL=webpack://eleventastic/./src/assets/scripts/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/scripts/main.js"]();
/******/ 	
/******/ })()
;