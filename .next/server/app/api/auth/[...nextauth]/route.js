/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_14go_Documents_GitHub_cheddar_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/14go/Documents/GitHub/cheddar/src/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_14go_Documents_GitHub_cheddar_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRjE0Z28lMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZjaGVkZGFyJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRjE0Z28lMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZjaGVkZGFyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzLzE0Z28vRG9jdW1lbnRzL0dpdEh1Yi9jaGVkZGFyL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvMTRnby9Eb2N1bWVudHMvR2l0SHViL2NoZWRkYXIvc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\nconst GET = handler;\nconst POST = handler;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDa0I7QUFFbkQsTUFBTUUsVUFBVUYsZ0RBQVFBLENBQUNDLGtEQUFXQTtBQUM3QixNQUFNRSxNQUFNRCxRQUFRO0FBQ3BCLE1BQU1FLE9BQU9GLFFBQVEiLCJzb3VyY2VzIjpbIi9Vc2Vycy8xNGdvL0RvY3VtZW50cy9HaXRIdWIvY2hlZGRhci9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9hdXRoJztcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcbmV4cG9ydCBjb25zdCBHRVQgPSBoYW5kbGVyO1xuZXhwb3J0IGNvbnN0IFBPU1QgPSBoYW5kbGVyOyJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/User */ \"(rsc)/./src/models/User.ts\");\n/* harmony import */ var _lib_mongo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/mongo */ \"(rsc)/./src/lib/mongo.ts\");\n\n\n\n// Ensure NEXTAUTH_URL is properly set\nconst productionURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL;\nif (!productionURL) {\n    console.error('Please set NEXTAUTH_URL or VERCEL_URL environment variable');\n}\nconst authOptions = {\n    debug: true,\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: 'Email',\n                    type: 'text',\n                    placeholder: 'your-email@example.com'\n                },\n                password: {\n                    label: 'Password',\n                    type: 'password'\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) {\n                        throw new Error('Email and password are required');\n                    }\n                    // Connect to the database\n                    await (0,_lib_mongo__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                    // Find the user by email\n                    const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        throw new Error('User not found');\n                    }\n                    // Compare the provided password using the schema method\n                    const isValid = await user.comparePassword(credentials.password);\n                    if (!isValid) {\n                        throw new Error('Invalid password');\n                    }\n                    // Return the user object with additional fields\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        role: user.role || 'user'\n                    };\n                } catch (error) {\n                    console.error('Authentication error:', error);\n                    return null;\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: 'jwt',\n        maxAge: 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    useSecureCookies: \"development\" === 'production',\n    cookies: {\n        sessionToken: {\n            name:  false ? 0 : 'next-auth.session-token',\n            options: {\n                httpOnly: true,\n                sameSite: 'lax',\n                path: '/',\n                secure: \"development\" === 'production'\n            }\n        }\n    },\n    callbacks: {\n        async signIn ({ user, account, profile, email, credentials }) {\n            console.log('SignIn callback:', {\n                user,\n                account,\n                profile,\n                email,\n                credentials\n            });\n            return true;\n        },\n        async jwt ({ token, user, account, profile }) {\n            if (user) {\n                console.log('JWT callback - user found:', user);\n                token.id = user.id;\n                token.email = user.email;\n                token.name = user.name;\n                token.role = user.role;\n            }\n            console.log('JWT callback - final token:', token);\n            return token;\n        },\n        async session ({ session, token, user }) {\n            console.log('Session callback - input:', {\n                session,\n                token,\n                user\n            });\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n                session.user.name = token.name;\n                session.user.role = token.role;\n            }\n            console.log('Session callback - final session:', session);\n            return session;\n        },\n        async redirect ({ url, baseUrl }) {\n            console.log('Redirect callback:', {\n                url,\n                baseUrl\n            });\n            // Allows relative URLs\n            if (url.startsWith(\"/\")) return `${baseUrl}${url}`;\n            else if (new URL(url).origin === baseUrl) return url;\n            return baseUrl;\n        }\n    },\n    pages: {\n        signIn: '/auth/signin',\n        error: '/auth/signin',\n        signOut: '/auth/signin'\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFDQXJCLFFBQVF1QyxHQUFHLENBQUMsK0JBQStCRTtZQUMzQyxPQUFPQTtRQUNSO1FBQ0EsTUFBTW5CLFNBQVEsRUFBRUEsT0FBTyxFQUFFbUIsS0FBSyxFQUFFM0IsSUFBSSxFQUFFO1lBQ3JDZCxRQUFRdUMsR0FBRyxDQUFDLDZCQUE2QjtnQkFBRWpCO2dCQUFTbUI7Z0JBQU8zQjtZQUFLO1lBQ2hFLElBQUlRLFFBQVFSLElBQUksRUFBRTtnQkFDakJRLFFBQVFSLElBQUksQ0FBQ0ksRUFBRSxHQUFHdUIsTUFBTXZCLEVBQUU7Z0JBQzFCSSxRQUFRUixJQUFJLENBQUNQLEtBQUssR0FBR2tDLE1BQU1sQyxLQUFLO2dCQUNoQ2UsUUFBUVIsSUFBSSxDQUFDVCxJQUFJLEdBQUdvQyxNQUFNcEMsSUFBSTtnQkFDOUJpQixRQUFRUixJQUFJLENBQUNPLElBQUksR0FBR29CLE1BQU1wQixJQUFJO1lBQy9CO1lBQ0FyQixRQUFRdUMsR0FBRyxDQUFDLHFDQUFxQ2pCO1lBQ2pELE9BQU9BO1FBQ1I7UUFDQSxNQUFNb0IsVUFBUyxFQUFFQyxHQUFHLEVBQUVDLE9BQU8sRUFBRTtZQUM5QjVDLFFBQVF1QyxHQUFHLENBQUMsc0JBQXNCO2dCQUFFSTtnQkFBS0M7WUFBUTtZQUNqRCx1QkFBdUI7WUFDdkIsSUFBSUQsSUFBSUUsVUFBVSxDQUFDLE1BQU0sT0FBTyxHQUFHRCxVQUFVRCxLQUFLO2lCQUU3QyxJQUFJLElBQUlHLElBQUlILEtBQUtJLE1BQU0sS0FBS0gsU0FBUyxPQUFPRDtZQUNqRCxPQUFPQztRQUNSO0lBQ0Q7SUFDQUksT0FBTztRQUNOWixRQUFRO1FBQ1JuQyxPQUFPO1FBQ1BnRCxTQUFTO0lBQ1Y7QUFDRCxFQUFFIiwic291cmNlcyI6WyIvVXNlcnMvMTRnby9Eb2N1bWVudHMvR2l0SHViL2NoZWRkYXIvc3JjL2xpYi9hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXInO1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICcuLi9saWIvbW9uZ28nO1xuXG4vLyBFbnN1cmUgTkVYVEFVVEhfVVJMIGlzIHByb3Blcmx5IHNldFxuY29uc3QgcHJvZHVjdGlvblVSTCA9IHByb2Nlc3MuZW52LlZFUkNFTF9VUkwgPyBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlZFUkNFTF9VUkx9YCA6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1VSTDtcblxuaWYgKCFwcm9kdWN0aW9uVVJMKSB7XG5cdGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBzZXQgTkVYVEFVVEhfVVJMIG9yIFZFUkNFTF9VUkwgZW52aXJvbm1lbnQgdmFyaWFibGUnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG5cdGRlYnVnOiB0cnVlLCAvLyBGb3JjZSBkZWJ1ZyBtb2RlIHRvIHNlZSB3aGF0J3MgaGFwcGVuaW5nXG5cdHByb3ZpZGVyczogW1xuXHRcdENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuXHRcdFx0bmFtZTogJ0NyZWRlbnRpYWxzJyxcblx0XHRcdGNyZWRlbnRpYWxzOiB7XG5cdFx0XHRcdGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAneW91ci1lbWFpbEBleGFtcGxlLmNvbScgfSxcblx0XHRcdFx0cGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfSxcblx0XHRcdH0sXG5cdFx0XHRhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VtYWlsIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBkYXRhYmFzZVxuXHRcdFx0XHRcdGF3YWl0IGRiQ29ubmVjdCgpO1xuXG5cdFx0XHRcdFx0Ly8gRmluZCB0aGUgdXNlciBieSBlbWFpbFxuXHRcdFx0XHRcdGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9KTtcblx0XHRcdFx0XHRpZiAoIXVzZXIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignVXNlciBub3QgZm91bmQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb21wYXJlIHRoZSBwcm92aWRlZCBwYXNzd29yZCB1c2luZyB0aGUgc2NoZW1hIG1ldGhvZFxuXHRcdFx0XHRcdGNvbnN0IGlzVmFsaWQgPSBhd2FpdCB1c2VyLmNvbXBhcmVQYXNzd29yZChjcmVkZW50aWFscy5wYXNzd29yZCk7XG5cdFx0XHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBSZXR1cm4gdGhlIHVzZXIgb2JqZWN0IHdpdGggYWRkaXRpb25hbCBmaWVsZHNcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0aWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0XHRlbWFpbDogdXNlci5lbWFpbCxcblx0XHRcdFx0XHRcdG5hbWU6IHVzZXIubmFtZSxcblx0XHRcdFx0XHRcdHJvbGU6IHVzZXIucm9sZSB8fCAndXNlcicsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdBdXRoZW50aWNhdGlvbiBlcnJvcjonLCBlcnJvcik7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG5cdHNlc3Npb246IHtcblx0XHRzdHJhdGVneTogJ2p3dCcgYXMgY29uc3QsXG5cdFx0bWF4QWdlOiAyNCAqIDYwICogNjAsIC8vIDI0IGhvdXJzXG5cdH0sXG5cdHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxuXHR1c2VTZWN1cmVDb29raWVzOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuXHRjb29raWVzOiB7XG5cdFx0c2Vzc2lvblRva2VuOiB7XG5cdFx0XHRuYW1lOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gJ19fU2VjdXJlLW5leHQtYXV0aC5zZXNzaW9uLXRva2VuJyA6ICduZXh0LWF1dGguc2Vzc2lvbi10b2tlbicsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGh0dHBPbmx5OiB0cnVlLFxuXHRcdFx0XHRzYW1lU2l0ZTogJ2xheCcsXG5cdFx0XHRcdHBhdGg6ICcvJyxcblx0XHRcdFx0c2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9LFxuXHRjYWxsYmFja3M6IHtcblx0XHRhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlLCBlbWFpbCwgY3JlZGVudGlhbHMgfSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ1NpZ25JbiBjYWxsYmFjazonLCB7IHVzZXIsIGFjY291bnQsIHByb2ZpbGUsIGVtYWlsLCBjcmVkZW50aWFscyB9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0YXN5bmMgand0KHsgdG9rZW4sIHVzZXIsIGFjY291bnQsIHByb2ZpbGUgfSkge1xuXHRcdFx0aWYgKHVzZXIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ0pXVCBjYWxsYmFjayAtIHVzZXIgZm91bmQ6JywgdXNlcik7XG5cdFx0XHRcdHRva2VuLmlkID0gdXNlci5pZDtcblx0XHRcdFx0dG9rZW4uZW1haWwgPSB1c2VyLmVtYWlsO1xuXHRcdFx0XHR0b2tlbi5uYW1lID0gdXNlci5uYW1lO1xuXHRcdFx0XHR0b2tlbi5yb2xlID0gdXNlci5yb2xlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc29sZS5sb2coJ0pXVCBjYWxsYmFjayAtIGZpbmFsIHRva2VuOicsIHRva2VuKTtcblx0XHRcdHJldHVybiB0b2tlbjtcblx0XHR9LFxuXHRcdGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiwgdXNlciB9KSB7XG5cdFx0XHRjb25zb2xlLmxvZygnU2Vzc2lvbiBjYWxsYmFjayAtIGlucHV0OicsIHsgc2Vzc2lvbiwgdG9rZW4sIHVzZXIgfSk7XG5cdFx0XHRpZiAoc2Vzc2lvbi51c2VyKSB7XG5cdFx0XHRcdHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xuXHRcdFx0XHRzZXNzaW9uLnVzZXIuZW1haWwgPSB0b2tlbi5lbWFpbDtcblx0XHRcdFx0c2Vzc2lvbi51c2VyLm5hbWUgPSB0b2tlbi5uYW1lO1xuXHRcdFx0XHRzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGU7XG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZygnU2Vzc2lvbiBjYWxsYmFjayAtIGZpbmFsIHNlc3Npb246Jywgc2Vzc2lvbik7XG5cdFx0XHRyZXR1cm4gc2Vzc2lvbjtcblx0XHR9LFxuXHRcdGFzeW5jIHJlZGlyZWN0KHsgdXJsLCBiYXNlVXJsIH0pIHtcblx0XHRcdGNvbnNvbGUubG9nKCdSZWRpcmVjdCBjYWxsYmFjazonLCB7IHVybCwgYmFzZVVybCB9KTtcblx0XHRcdC8vIEFsbG93cyByZWxhdGl2ZSBVUkxzXG5cdFx0XHRpZiAodXJsLnN0YXJ0c1dpdGgoXCIvXCIpKSByZXR1cm4gYCR7YmFzZVVybH0ke3VybH1gO1xuXHRcdFx0Ly8gQWxsb3dzIGNhbGxiYWNrIFVSTHMgb24gdGhlIHNhbWUgb3JpZ2luXG5cdFx0XHRlbHNlIGlmIChuZXcgVVJMKHVybCkub3JpZ2luID09PSBiYXNlVXJsKSByZXR1cm4gdXJsO1xuXHRcdFx0cmV0dXJuIGJhc2VVcmw7XG5cdFx0fSxcblx0fSxcblx0cGFnZXM6IHtcblx0XHRzaWduSW46ICcvYXV0aC9zaWduaW4nLFxuXHRcdGVycm9yOiAnL2F1dGgvc2lnbmluJyxcblx0XHRzaWduT3V0OiAnL2F1dGgvc2lnbmluJyxcblx0fSxcbn07Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJVc2VyTW9kZWwiLCJkYkNvbm5lY3QiLCJwcm9kdWN0aW9uVVJMIiwicHJvY2VzcyIsImVudiIsIlZFUkNFTF9VUkwiLCJORVhUQVVUSF9VUkwiLCJjb25zb2xlIiwiZXJyb3IiLCJhdXRoT3B0aW9ucyIsImRlYnVnIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZE9uZSIsImlzVmFsaWQiLCJjb21wYXJlUGFzc3dvcmQiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwicm9sZSIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCIsInVzZVNlY3VyZUNvb2tpZXMiLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwiY2FsbGJhY2tzIiwic2lnbkluIiwiYWNjb3VudCIsInByb2ZpbGUiLCJsb2ciLCJqd3QiLCJ0b2tlbiIsInJlZGlyZWN0IiwidXJsIiwiYmFzZVVybCIsInN0YXJ0c1dpdGgiLCJVUkwiLCJvcmlnaW4iLCJwYWdlcyIsInNpZ25PdXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongo.ts":
/*!**************************!*\
  !*** ./src/lib/mongo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase),\n/* harmony export */   disconnectFromDatabase: () => (/* binding */ disconnectFromDatabase)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function connectToDatabase() {\n    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cheddar';\n    try {\n        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(mongoUri);\n        console.log('Connected to MongoDB');\n    } catch (error) {\n        console.error('MongoDB connection error:', error);\n        process.exit(1);\n    }\n}\nasync function disconnectFromDatabase() {\n    await mongoose__WEBPACK_IMPORTED_MODULE_0___default().disconnect();\n    console.log('Disconnected from MongoDB');\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBZ0M7QUFFekIsZUFBZUM7SUFDckIsTUFBTUMsV0FBV0MsUUFBUUMsR0FBRyxDQUFDQyxTQUFTLElBQUk7SUFFMUMsSUFBSTtRQUNILE1BQU1MLHVEQUFnQixDQUFDRTtRQUN2QkssUUFBUUMsR0FBRyxDQUFDO0lBQ2IsRUFBRSxPQUFPQyxPQUFPO1FBQ2ZGLFFBQVFFLEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDTixRQUFRTyxJQUFJLENBQUM7SUFDZDtBQUNEO0FBRU8sZUFBZUM7SUFDckIsTUFBTVgsMERBQW1CO0lBQ3pCTyxRQUFRQyxHQUFHLENBQUM7QUFDYiIsInNvdXJjZXMiOlsiL1VzZXJzLzE0Z28vRG9jdW1lbnRzL0dpdEh1Yi9jaGVkZGFyL3NyYy9saWIvbW9uZ28udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0RhdGFiYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCBtb25nb1VyaSA9IHByb2Nlc3MuZW52Lk1PTkdPX1VSSSB8fCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9jaGVkZGFyJztcblxuXHR0cnkge1xuXHRcdGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QobW9uZ29VcmkpO1xuXHRcdGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gTW9uZ29EQicpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ01vbmdvREIgY29ubmVjdGlvbiBlcnJvcjonLCBlcnJvcik7XG5cdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHR9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNjb25uZWN0RnJvbURhdGFiYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRhd2FpdCBtb25nb29zZS5kaXNjb25uZWN0KCk7XG5cdGNvbnNvbGUubG9nKCdEaXNjb25uZWN0ZWQgZnJvbSBNb25nb0RCJyk7XG59XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjb25uZWN0VG9EYXRhYmFzZSIsIm1vbmdvVXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPX1VSSSIsImNvbm5lY3QiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJleGl0IiwiZGlzY29ubmVjdEZyb21EYXRhYmFzZSIsImRpc2Nvbm5lY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongo.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n// src/models/User.ts\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    email: {\n        type: String,\n        required: [\n            true,\n            'Email is required'\n        ],\n        unique: true,\n        lowercase: true,\n        trim: true,\n        match: [\n            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,\n            'Please enter a valid email address'\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            'Password is required'\n        ],\n        minlength: [\n            8,\n            'Password must be at least 8 characters long'\n        ]\n    },\n    name: {\n        type: String,\n        trim: true\n    },\n    role: {\n        type: String,\n        enum: [\n            'user',\n            'admin'\n        ],\n        default: 'user'\n    },\n    settings: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.Mixed,\n        default: {}\n    }\n}, {\n    timestamps: true\n});\n// Pre-save middleware to hash password\nUserSchema.pre('save', async function(next) {\n    if (!this.isModified('password')) {\n        return next();\n    }\n    try {\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().genSalt(10);\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, salt);\n        next();\n    } catch (error) {\n        next(error);\n    }\n});\n// Method to validate password\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidatePassword, this.password);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxxQkFBcUI7QUFDVztBQUNGO0FBYzlCLE1BQU1FLGFBQWEsSUFBSUYsd0RBQWUsQ0FDckM7SUFDQ0ksT0FBTztRQUNOQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0MsUUFBUTtRQUNSQyxXQUFXO1FBQ1hDLE1BQU07UUFDTkMsT0FBTztZQUFDO1lBQW9EO1NBQXFDO0lBQ2xHO0lBQ0FDLFVBQVU7UUFDVFAsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBdUI7UUFDeENNLFdBQVc7WUFBQztZQUFHO1NBQThDO0lBQzlEO0lBQ0FDLE1BQU07UUFDTFQsTUFBTUM7UUFDTkksTUFBTTtJQUNQO0lBQ0FLLE1BQU07UUFDTFYsTUFBTUM7UUFDTlUsTUFBTTtZQUFDO1lBQVE7U0FBUTtRQUN2QkMsU0FBUztJQUNWO0lBQ0FDLFVBQVU7UUFDVGIsTUFBTUwsd0RBQWUsQ0FBQ21CLEtBQUssQ0FBQ0MsS0FBSztRQUNqQ0gsU0FBUyxDQUFDO0lBQ1g7QUFDRCxHQUNBO0lBQ0NJLFlBQVk7QUFDYjtBQUdELHVDQUF1QztBQUN2Q25CLFdBQVdvQixHQUFHLENBQUMsUUFBUSxlQUFnQkMsSUFBSTtJQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDQyxVQUFVLENBQUMsYUFBYTtRQUNqQyxPQUFPRDtJQUNSO0lBQ0EsSUFBSTtRQUNILE1BQU1FLE9BQU8sTUFBTXhCLHVEQUFjLENBQUM7UUFDbEMsSUFBSSxDQUFDVyxRQUFRLEdBQUcsTUFBTVgsb0RBQVcsQ0FBQyxJQUFJLENBQUNXLFFBQVEsRUFBRWE7UUFDakRGO0lBQ0QsRUFBRSxPQUFPSyxPQUFPO1FBQ2ZMLEtBQUtLO0lBQ047QUFDRDtBQUVBLDhCQUE4QjtBQUM5QjFCLFdBQVcyQixPQUFPLENBQUNDLGVBQWUsR0FBRyxlQUFnQkMsaUJBQXlCO0lBQzdFLE9BQU85Qix1REFBYyxDQUFDOEIsbUJBQW1CLElBQUksQ0FBQ25CLFFBQVE7QUFDdkQ7QUFFQSxpRUFBZVosd0RBQWUsQ0FBQ2tDLElBQUksSUFBSWxDLHFEQUFjLENBQVEsUUFBUUUsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsiL1VzZXJzLzE0Z28vRG9jdW1lbnRzL0dpdEh1Yi9jaGVkZGFyL3NyYy9tb2RlbHMvVXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvbW9kZWxzL1VzZXIudHNcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcblxuaW1wb3J0IHsgVXNlclNldHRpbmdzIH0gZnJvbSAnQC90eXBlcy9zZXR0aW5ncyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBtb25nb29zZS5Eb2N1bWVudCB7XG5cdGVtYWlsOiBzdHJpbmc7XG5cdHBhc3N3b3JkOiBzdHJpbmc7XG5cdG5hbWU/OiBzdHJpbmc7XG5cdHJvbGU6ICd1c2VyJyB8ICdhZG1pbic7XG5cdHNldHRpbmdzPzogUGFydGlhbDxVc2VyU2V0dGluZ3M+O1xuXHRjcmVhdGVkQXQ6IERhdGU7XG5cdHVwZGF0ZWRBdDogRGF0ZTtcbn1cblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXG5cdHtcblx0XHRlbWFpbDoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0cmVxdWlyZWQ6IFt0cnVlLCAnRW1haWwgaXMgcmVxdWlyZWQnXSxcblx0XHRcdHVuaXF1ZTogdHJ1ZSxcblx0XHRcdGxvd2VyY2FzZTogdHJ1ZSxcblx0XHRcdHRyaW06IHRydWUsXG5cdFx0XHRtYXRjaDogWy9eW2EtekEtWjAtOS5fJSstXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aXXsyLH0kLywgJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnXSxcblx0XHR9LFxuXHRcdHBhc3N3b3JkOiB7XG5cdFx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0XHRyZXF1aXJlZDogW3RydWUsICdQYXNzd29yZCBpcyByZXF1aXJlZCddLFxuXHRcdFx0bWlubGVuZ3RoOiBbOCwgJ1Bhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcnXSxcblx0XHR9LFxuXHRcdG5hbWU6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdHRyaW06IHRydWUsXG5cdFx0fSxcblx0XHRyb2xlOiB7XG5cdFx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0XHRlbnVtOiBbJ3VzZXInLCAnYWRtaW4nXSxcblx0XHRcdGRlZmF1bHQ6ICd1c2VyJyxcblx0XHR9LFxuXHRcdHNldHRpbmdzOiB7XG5cdFx0XHR0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuTWl4ZWQsXG5cdFx0XHRkZWZhdWx0OiB7fSxcblx0XHR9LFxuXHR9LFxuXHR7XG5cdFx0dGltZXN0YW1wczogdHJ1ZSwgLy8gQWRkcyBjcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdCBmaWVsZHNcblx0fVxuKTtcblxuLy8gUHJlLXNhdmUgbWlkZGxld2FyZSB0byBoYXNoIHBhc3N3b3JkXG5Vc2VyU2NoZW1hLnByZSgnc2F2ZScsIGFzeW5jIGZ1bmN0aW9uIChuZXh0KSB7XG5cdGlmICghdGhpcy5pc01vZGlmaWVkKCdwYXNzd29yZCcpKSB7XG5cdFx0cmV0dXJuIG5leHQoKTtcblx0fVxuXHR0cnkge1xuXHRcdGNvbnN0IHNhbHQgPSBhd2FpdCBiY3J5cHQuZ2VuU2FsdCgxMCk7XG5cdFx0dGhpcy5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHRoaXMucGFzc3dvcmQsIHNhbHQpO1xuXHRcdG5leHQoKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRuZXh0KGVycm9yIGFzIEVycm9yKTtcblx0fVxufSk7XG5cbi8vIE1ldGhvZCB0byB2YWxpZGF0ZSBwYXNzd29yZFxuVXNlclNjaGVtYS5tZXRob2RzLmNvbXBhcmVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbDxJVXNlcj4oJ1VzZXInLCBVc2VyU2NoZW1hKTtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImJjcnlwdCIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJlbWFpbCIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInVuaXF1ZSIsImxvd2VyY2FzZSIsInRyaW0iLCJtYXRjaCIsInBhc3N3b3JkIiwibWlubGVuZ3RoIiwibmFtZSIsInJvbGUiLCJlbnVtIiwiZGVmYXVsdCIsInNldHRpbmdzIiwiVHlwZXMiLCJNaXhlZCIsInRpbWVzdGFtcHMiLCJwcmUiLCJuZXh0IiwiaXNNb2RpZmllZCIsInNhbHQiLCJnZW5TYWx0IiwiaGFzaCIsImVycm9yIiwibWV0aG9kcyIsImNvbXBhcmVQYXNzd29yZCIsImNhbmRpZGF0ZVBhc3N3b3JkIiwiY29tcGFyZSIsIm1vZGVscyIsIlVzZXIiLCJtb2RlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();