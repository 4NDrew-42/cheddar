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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/User */ \"(rsc)/./src/models/User.ts\");\n/* harmony import */ var _lib_mongo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/mongo */ \"(rsc)/./src/lib/mongo.ts\");\n\n\n\n// Ensure NEXTAUTH_URL is properly set\nconst productionURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL;\nif (!productionURL) {\n    console.error('Please set NEXTAUTH_URL or VERCEL_URL environment variable');\n}\nconst authOptions = {\n    debug: \"development\" === 'development',\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: 'Credentials',\n            credentials: {\n                email: {\n                    label: 'Email',\n                    type: 'text',\n                    placeholder: 'your-email@example.com'\n                },\n                password: {\n                    label: 'Password',\n                    type: 'password'\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) {\n                        throw new Error('Email and password are required');\n                    }\n                    // Connect to the database\n                    await (0,_lib_mongo__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                    // Find the user by email\n                    const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        throw new Error('User not found');\n                    }\n                    // Compare the provided password using the schema method\n                    const isValid = await user.comparePassword(credentials.password);\n                    if (!isValid) {\n                        throw new Error('Invalid password');\n                    }\n                    // Return the user object with additional fields\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        role: user.role || 'user'\n                    };\n                } catch (error) {\n                    console.error('Authentication error:', error);\n                    return null;\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: 'jwt',\n        maxAge: 30 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    useSecureCookies: \"development\" === 'production',\n    cookies: {\n        sessionToken: {\n            name: `__Secure-next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: 'lax',\n                path: '/',\n                secure: \"development\" === 'production'\n            }\n        }\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n                token.name = user.name;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n                session.user.name = token.name;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: '/auth/signin',\n        error: '/auth/signin',\n        signOut: '/auth/signin'\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJO2dCQUM5QmlCLFFBQVFSLElBQUksQ0FBQ08sSUFBSSxHQUFHZ0IsTUFBTWhCLElBQUk7WUFDL0I7WUFDQSxPQUFPQztRQUNSO0lBQ0Q7SUFDQWdCLE9BQU87UUFDTkMsUUFBUTtRQUNSdEMsT0FBTztRQUNQdUMsU0FBUztJQUNWO0FBQ0QsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzLzE0Z28vRG9jdW1lbnRzL0dpdEh1Yi9jaGVkZGFyL3NyYy9saWIvYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XG5pbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyJztcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSAnLi4vbGliL21vbmdvJztcblxuLy8gRW5zdXJlIE5FWFRBVVRIX1VSTCBpcyBwcm9wZXJseSBzZXRcbmNvbnN0IHByb2R1Y3Rpb25VUkwgPSBwcm9jZXNzLmVudi5WRVJDRUxfVVJMID8gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5WRVJDRUxfVVJMfWAgOiBwcm9jZXNzLmVudi5ORVhUQVVUSF9VUkw7XG5cbmlmICghcHJvZHVjdGlvblVSTCkge1xuXHRjb25zb2xlLmVycm9yKCdQbGVhc2Ugc2V0IE5FWFRBVVRIX1VSTCBvciBWRVJDRUxfVVJMIGVudmlyb25tZW50IHZhcmlhYmxlJyk7XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuXHRkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcsXG5cdHByb3ZpZGVyczogW1xuXHRcdENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuXHRcdFx0bmFtZTogJ0NyZWRlbnRpYWxzJyxcblx0XHRcdGNyZWRlbnRpYWxzOiB7XG5cdFx0XHRcdGVtYWlsOiB7IGxhYmVsOiAnRW1haWwnLCB0eXBlOiAndGV4dCcsIHBsYWNlaG9sZGVyOiAneW91ci1lbWFpbEBleGFtcGxlLmNvbScgfSxcblx0XHRcdFx0cGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfSxcblx0XHRcdH0sXG5cdFx0XHRhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VtYWlsIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb25uZWN0IHRvIHRoZSBkYXRhYmFzZVxuXHRcdFx0XHRcdGF3YWl0IGRiQ29ubmVjdCgpO1xuXG5cdFx0XHRcdFx0Ly8gRmluZCB0aGUgdXNlciBieSBlbWFpbFxuXHRcdFx0XHRcdGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9KTtcblx0XHRcdFx0XHRpZiAoIXVzZXIpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignVXNlciBub3QgZm91bmQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDb21wYXJlIHRoZSBwcm92aWRlZCBwYXNzd29yZCB1c2luZyB0aGUgc2NoZW1hIG1ldGhvZFxuXHRcdFx0XHRcdGNvbnN0IGlzVmFsaWQgPSBhd2FpdCB1c2VyLmNvbXBhcmVQYXNzd29yZChjcmVkZW50aWFscy5wYXNzd29yZCk7XG5cdFx0XHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBSZXR1cm4gdGhlIHVzZXIgb2JqZWN0IHdpdGggYWRkaXRpb25hbCBmaWVsZHNcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0aWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0XHRlbWFpbDogdXNlci5lbWFpbCxcblx0XHRcdFx0XHRcdG5hbWU6IHVzZXIubmFtZSxcblx0XHRcdFx0XHRcdHJvbGU6IHVzZXIucm9sZSB8fCAndXNlcicsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdBdXRoZW50aWNhdGlvbiBlcnJvcjonLCBlcnJvcik7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG5cdHNlc3Npb246IHtcblx0XHRzdHJhdGVneTogJ2p3dCcgYXMgY29uc3QsXG5cdFx0bWF4QWdlOiAzMCAqIDYwLCAvLyAzMCBtaW51dGVzXG5cdH0sXG5cdHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxuXHR1c2VTZWN1cmVDb29raWVzOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxuXHRjb29raWVzOiB7XG5cdFx0c2Vzc2lvblRva2VuOiB7XG5cdFx0XHRuYW1lOiBgX19TZWN1cmUtbmV4dC1hdXRoLnNlc3Npb24tdG9rZW5gLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRodHRwT25seTogdHJ1ZSxcblx0XHRcdFx0c2FtZVNpdGU6ICdsYXgnLFxuXHRcdFx0XHRwYXRoOiAnLycsXG5cdFx0XHRcdHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcblx0Y2FsbGJhY2tzOiB7XG5cdFx0YXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuXHRcdFx0aWYgKHVzZXIpIHtcblx0XHRcdFx0dG9rZW4uaWQgPSB1c2VyLmlkO1xuXHRcdFx0XHR0b2tlbi5lbWFpbCA9IHVzZXIuZW1haWw7XG5cdFx0XHRcdHRva2VuLm5hbWUgPSB1c2VyLm5hbWU7XG5cdFx0XHRcdHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdG9rZW47XG5cdFx0fSxcblx0XHRhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuXHRcdFx0aWYgKHNlc3Npb24udXNlcikge1xuXHRcdFx0XHRzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcblx0XHRcdFx0c2Vzc2lvbi51c2VyLmVtYWlsID0gdG9rZW4uZW1haWw7XG5cdFx0XHRcdHNlc3Npb24udXNlci5uYW1lID0gdG9rZW4ubmFtZTtcblx0XHRcdFx0c2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlc3Npb247XG5cdFx0fSxcblx0fSxcblx0cGFnZXM6IHtcblx0XHRzaWduSW46ICcvYXV0aC9zaWduaW4nLFxuXHRcdGVycm9yOiAnL2F1dGgvc2lnbmluJyxcblx0XHRzaWduT3V0OiAnL2F1dGgvc2lnbmluJyxcblx0fSxcbn07Il0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJVc2VyTW9kZWwiLCJkYkNvbm5lY3QiLCJwcm9kdWN0aW9uVVJMIiwicHJvY2VzcyIsImVudiIsIlZFUkNFTF9VUkwiLCJORVhUQVVUSF9VUkwiLCJjb25zb2xlIiwiZXJyb3IiLCJhdXRoT3B0aW9ucyIsImRlYnVnIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZE9uZSIsImlzVmFsaWQiLCJjb21wYXJlUGFzc3dvcmQiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwicm9sZSIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCIsInVzZVNlY3VyZUNvb2tpZXMiLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwYWdlcyIsInNpZ25JbiIsInNpZ25PdXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongo.ts":
/*!**************************!*\
  !*** ./src/lib/mongo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// src/lib/mongo.ts\n\nlet MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI && \"development\" === 'test') {}\nif (!MONGODB_URI) {\n    throw new Error('Please define the MONGODB_URI environment variable inside .env');\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    // If we're already connected, return the Mongoose instance\n    if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection).readyState === 1) {\n        return (mongoose__WEBPACK_IMPORTED_MODULE_0___default());\n    }\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    cached.conn = await cached.promise;\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1CQUFtQjtBQUMyQjtBQVc5QyxJQUFJQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFekMsSUFBSSxDQUFDQSxlQUFlQyxrQkFBeUIsUUFBUSxFQUdwRDtBQUVELElBQUksQ0FBQ0QsYUFBYTtJQUNqQixNQUFNLElBQUlLLE1BQU07QUFDakI7QUFFQSxJQUFJQyxTQUFTQyxPQUFPUixRQUFRO0FBRTVCLElBQUksQ0FBQ08sUUFBUTtJQUNaQSxTQUFTQyxPQUFPUixRQUFRLEdBQUc7UUFBRVMsTUFBTTtRQUFNTCxTQUFTO0lBQUs7QUFDeEQ7QUFFQSxlQUFlTTtJQUNkLDJEQUEyRDtJQUMzRCxJQUFJViw0REFBbUIsQ0FBQ1ksVUFBVSxLQUFLLEdBQUc7UUFDekMsT0FBT1osaURBQVFBO0lBQ2hCO0lBRUEsSUFBSU8sT0FBT0UsSUFBSSxFQUFFO1FBQ2hCLE9BQU9GLE9BQU9FLElBQUk7SUFDbkI7SUFFQSxJQUFJLENBQUNGLE9BQU9ILE9BQU8sRUFBRTtRQUNwQixNQUFNUyxPQUFPO1lBQ1pDLGdCQUFnQjtRQUNqQjtRQUVBUCxPQUFPSCxPQUFPLEdBQUdKLHVEQUFnQixDQUFDQyxhQUFjWSxNQUFNRyxJQUFJLENBQUMsQ0FBQ2hCO1lBQzNELE9BQU9BO1FBQ1I7SUFDRDtJQUNBTyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0gsT0FBTztJQUNsQyxPQUFPRyxPQUFPRSxJQUFJO0FBQ25CO0FBRUEsaUVBQWVDLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy8xNGdvL0RvY3VtZW50cy9HaXRIdWIvY2hlZGRhci9zcmMvbGliL21vbmdvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9saWIvbW9uZ28udHNcbmltcG9ydCBtb25nb29zZSwgeyBNb25nb29zZSB9IGZyb20gJ21vbmdvb3NlJztcblxuaW50ZXJmYWNlIEdsb2JhbFdpdGhNb25nb29zZSB7XG5cdG1vbmdvb3NlOiB7XG5cdFx0Y29ubjogTW9uZ29vc2UgfCBudWxsO1xuXHRcdHByb21pc2U6IFByb21pc2U8TW9uZ29vc2U+IHwgbnVsbDtcblx0fTtcbn1cblxuZGVjbGFyZSBjb25zdCBnbG9iYWw6IEdsb2JhbFdpdGhNb25nb29zZTtcblxubGV0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XG5cbmlmICghTU9OR09EQl9VUkkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0Jykge1xuXHQvLyBJbiB0ZXN0IGVudmlyb25tZW50LCB1c2UgdGhlIG1lbW9yeSBzZXJ2ZXIgVVJJIGlmIGF2YWlsYWJsZVxuXHRNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVEVTVF9VUkk7XG59XG5cbmlmICghTU9OR09EQl9VUkkpIHtcblx0dGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZGVmaW5lIHRoZSBNT05HT0RCX1VSSSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpbnNpZGUgLmVudicpO1xufVxuXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xuXG5pZiAoIWNhY2hlZCkge1xuXHRjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2UgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGJDb25uZWN0KCk6IFByb21pc2U8TW9uZ29vc2U+IHtcblx0Ly8gSWYgd2UncmUgYWxyZWFkeSBjb25uZWN0ZWQsIHJldHVybiB0aGUgTW9uZ29vc2UgaW5zdGFuY2Vcblx0aWYgKG1vbmdvb3NlLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gMSkge1xuXHRcdHJldHVybiBtb25nb29zZTtcblx0fVxuXG5cdGlmIChjYWNoZWQuY29ubikge1xuXHRcdHJldHVybiBjYWNoZWQuY29ubjtcblx0fVxuXG5cdGlmICghY2FjaGVkLnByb21pc2UpIHtcblx0XHRjb25zdCBvcHRzID0ge1xuXHRcdFx0YnVmZmVyQ29tbWFuZHM6IGZhbHNlLFxuXHRcdH07XG5cblx0XHRjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkkhLCBvcHRzKS50aGVuKChtb25nb29zZSkgPT4ge1xuXHRcdFx0cmV0dXJuIG1vbmdvb3NlO1xuXHRcdH0pO1xuXHR9XG5cdGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG5cdHJldHVybiBjYWNoZWQuY29ubjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwicHJvbWlzZSIsIk1PTkdPREJfVEVTVF9VUkkiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJkYkNvbm5lY3QiLCJjb25uZWN0aW9uIiwicmVhZHlTdGF0ZSIsIm9wdHMiLCJidWZmZXJDb21tYW5kcyIsImNvbm5lY3QiLCJ0aGVuIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongo.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n// src/models/User.ts\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    email: {\n        type: String,\n        required: [\n            true,\n            'Email is required'\n        ],\n        unique: true,\n        lowercase: true,\n        trim: true,\n        match: [\n            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,\n            'Please enter a valid email address'\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            'Password is required'\n        ],\n        minlength: [\n            8,\n            'Password must be at least 8 characters long'\n        ]\n    },\n    name: {\n        type: String,\n        trim: true\n    },\n    role: {\n        type: String,\n        enum: [\n            'user',\n            'admin'\n        ],\n        default: 'user'\n    }\n}, {\n    timestamps: true\n});\n// Pre-save middleware to hash password\nUserSchema.pre('save', async function(next) {\n    if (!this.isModified('password')) {\n        return next();\n    }\n    try {\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().genSalt(10);\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, salt);\n        next();\n    } catch (error) {\n        next(error);\n    }\n});\n// Method to validate password\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidatePassword, this.password);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxxQkFBcUI7QUFDVztBQUNGO0FBVzlCLE1BQU1FLGFBQWEsSUFBSUYsd0RBQWUsQ0FDckM7SUFDQ0ksT0FBTztRQUNOQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0MsUUFBUTtRQUNSQyxXQUFXO1FBQ1hDLE1BQU07UUFDTkMsT0FBTztZQUFDO1lBQW9EO1NBQXFDO0lBQ2xHO0lBQ0FDLFVBQVU7UUFDVFAsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBdUI7UUFDeENNLFdBQVc7WUFBQztZQUFHO1NBQThDO0lBQzlEO0lBQ0FDLE1BQU07UUFDTFQsTUFBTUM7UUFDTkksTUFBTTtJQUNQO0lBQ0FLLE1BQU07UUFDTFYsTUFBTUM7UUFDTlUsTUFBTTtZQUFDO1lBQVE7U0FBUTtRQUN2QkMsU0FBUztJQUNWO0FBQ0QsR0FDQTtJQUNDQyxZQUFZO0FBQ2I7QUFHRCx1Q0FBdUM7QUFDdkNoQixXQUFXaUIsR0FBRyxDQUFDLFFBQVEsZUFBZ0JDLElBQUk7SUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsVUFBVSxDQUFDLGFBQWE7UUFDakMsT0FBT0Q7SUFDUjtJQUNBLElBQUk7UUFDSCxNQUFNRSxPQUFPLE1BQU1yQix1REFBYyxDQUFDO1FBQ2xDLElBQUksQ0FBQ1csUUFBUSxHQUFHLE1BQU1YLG9EQUFXLENBQUMsSUFBSSxDQUFDVyxRQUFRLEVBQUVVO1FBQ2pERjtJQUNELEVBQUUsT0FBT0ssT0FBTztRQUNmTCxLQUFLSztJQUNOO0FBQ0Q7QUFFQSw4QkFBOEI7QUFDOUJ2QixXQUFXd0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZ0JDLGlCQUF5QjtJQUM3RSxPQUFPM0IsdURBQWMsQ0FBQzJCLG1CQUFtQixJQUFJLENBQUNoQixRQUFRO0FBQ3ZEO0FBRUEsaUVBQWVaLHdEQUFlLENBQUMrQixJQUFJLElBQUkvQixxREFBYyxDQUFRLFFBQVFFLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy8xNGdvL0RvY3VtZW50cy9HaXRIdWIvY2hlZGRhci9zcmMvbW9kZWxzL1VzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL21vZGVscy9Vc2VyLnRzXG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBtb25nb29zZS5Eb2N1bWVudCB7XG5cdGVtYWlsOiBzdHJpbmc7XG5cdHBhc3N3b3JkOiBzdHJpbmc7XG5cdG5hbWU/OiBzdHJpbmc7XG5cdHJvbGU6ICd1c2VyJyB8ICdhZG1pbic7XG5cdGNyZWF0ZWRBdDogRGF0ZTtcblx0dXBkYXRlZEF0OiBEYXRlO1xufVxuXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcblx0e1xuXHRcdGVtYWlsOiB7XG5cdFx0XHR0eXBlOiBTdHJpbmcsXG5cdFx0XHRyZXF1aXJlZDogW3RydWUsICdFbWFpbCBpcyByZXF1aXJlZCddLFxuXHRcdFx0dW5pcXVlOiB0cnVlLFxuXHRcdFx0bG93ZXJjYXNlOiB0cnVlLFxuXHRcdFx0dHJpbTogdHJ1ZSxcblx0XHRcdG1hdGNoOiBbL15bYS16QS1aMC05Ll8lKy1dK0BbYS16QS1aMC05Li1dK1xcLlthLXpBLVpdezIsfSQvLCAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyddLFxuXHRcdH0sXG5cdFx0cGFzc3dvcmQ6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdHJlcXVpcmVkOiBbdHJ1ZSwgJ1Bhc3N3b3JkIGlzIHJlcXVpcmVkJ10sXG5cdFx0XHRtaW5sZW5ndGg6IFs4LCAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZyddLFxuXHRcdH0sXG5cdFx0bmFtZToge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0dHJpbTogdHJ1ZSxcblx0XHR9LFxuXHRcdHJvbGU6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGVudW06IFsndXNlcicsICdhZG1pbiddLFxuXHRcdFx0ZGVmYXVsdDogJ3VzZXInLFxuXHRcdH0sXG5cdH0sXG5cdHtcblx0XHR0aW1lc3RhbXBzOiB0cnVlLCAvLyBBZGRzIGNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0IGZpZWxkc1xuXHR9XG4pO1xuXG4vLyBQcmUtc2F2ZSBtaWRkbGV3YXJlIHRvIGhhc2ggcGFzc3dvcmRcblVzZXJTY2hlbWEucHJlKCdzYXZlJywgYXN5bmMgZnVuY3Rpb24gKG5leHQpIHtcblx0aWYgKCF0aGlzLmlzTW9kaWZpZWQoJ3Bhc3N3b3JkJykpIHtcblx0XHRyZXR1cm4gbmV4dCgpO1xuXHR9XG5cdHRyeSB7XG5cdFx0Y29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKTtcblx0XHR0aGlzLnBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2godGhpcy5wYXNzd29yZCwgc2FsdCk7XG5cdFx0bmV4dCgpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdG5leHQoZXJyb3IgYXMgRXJyb3IpO1xuXHR9XG59KTtcblxuLy8gTWV0aG9kIHRvIHZhbGlkYXRlIHBhc3N3b3JkXG5Vc2VyU2NoZW1hLm1ldGhvZHMuY29tcGFyZVBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKGNhbmRpZGF0ZVBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0cmV0dXJuIGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZVBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsPElVc2VyPignVXNlcicsIFVzZXJTY2hlbWEpO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiYmNyeXB0IiwiVXNlclNjaGVtYSIsIlNjaGVtYSIsImVtYWlsIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidW5pcXVlIiwibG93ZXJjYXNlIiwidHJpbSIsIm1hdGNoIiwicGFzc3dvcmQiLCJtaW5sZW5ndGgiLCJuYW1lIiwicm9sZSIsImVudW0iLCJkZWZhdWx0IiwidGltZXN0YW1wcyIsInByZSIsIm5leHQiLCJpc01vZGlmaWVkIiwic2FsdCIsImdlblNhbHQiLCJoYXNoIiwiZXJyb3IiLCJtZXRob2RzIiwiY29tcGFyZVBhc3N3b3JkIiwiY2FuZGlkYXRlUGFzc3dvcmQiLCJjb21wYXJlIiwibW9kZWxzIiwiVXNlciIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2F14go%2FDocuments%2FGitHub%2Fcheddar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();