"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/utils/redis.ts":
/*!****************************!*\
  !*** ./src/utils/redis.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectRedis: () => (/* binding */ connectRedis),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redis */ \"(middleware)/./node_modules/redis/dist/index.js\");\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_0__);\n\nconst redisClient = (0,redis__WEBPACK_IMPORTED_MODULE_0__.createClient)({\n    socket: {\n        host: process.env.REDIS_HOST || 'localhost',\n        port: parseInt(process.env.REDIS_PORT || '6379')\n    }\n});\nredisClient.on('error', (err)=>{\n    console.error('Redis error:', err);\n});\nredisClient.on('connect', ()=>{\n    console.log('Connected to Redis');\n});\nconst connectRedis = async ()=>{\n    if (!redisClient.isOpen) {\n        await redisClient.connect();\n    }\n    return redisClient;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (redisClient);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL3V0aWxzL3JlZGlzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBcUM7QUFFckMsTUFBTUMsY0FBY0QsbURBQVlBLENBQUM7SUFDaENFLFFBQVE7UUFDUEMsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxVQUFVLElBQUk7UUFDaENDLE1BQU1DLFNBQVNKLFFBQVFDLEdBQUcsQ0FBQ0ksVUFBVSxJQUFJO0lBQzFDO0FBQ0Q7QUFFQVIsWUFBWVMsRUFBRSxDQUFDLFNBQVMsQ0FBQ0M7SUFDeEJDLFFBQVFDLEtBQUssQ0FBQyxnQkFBZ0JGO0FBQy9CO0FBRUFWLFlBQVlTLEVBQUUsQ0FBQyxXQUFXO0lBQ3pCRSxRQUFRRSxHQUFHLENBQUM7QUFDYjtBQUVPLE1BQU1DLGVBQWU7SUFDM0IsSUFBSSxDQUFDZCxZQUFZZSxNQUFNLEVBQUU7UUFDeEIsTUFBTWYsWUFBWWdCLE9BQU87SUFDMUI7SUFDQSxPQUFPaEI7QUFDUixFQUFFO0FBRUYsaUVBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy8xNGdvL0RvY3VtZW50cy9HaXRIdWIvY2hlZGRhci9zcmMvdXRpbHMvcmVkaXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAncmVkaXMnO1xuXG5jb25zdCByZWRpc0NsaWVudCA9IGNyZWF0ZUNsaWVudCh7XG5cdHNvY2tldDoge1xuXHRcdGhvc3Q6IHByb2Nlc3MuZW52LlJFRElTX0hPU1QgfHwgJ2xvY2FsaG9zdCcsXG5cdFx0cG9ydDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuUkVESVNfUE9SVCB8fCAnNjM3OScpXG5cdH1cbn0pO1xuXG5yZWRpc0NsaWVudC5vbignZXJyb3InLCAoZXJyOiBFcnJvcikgPT4ge1xuXHRjb25zb2xlLmVycm9yKCdSZWRpcyBlcnJvcjonLCBlcnIpO1xufSk7XG5cbnJlZGlzQ2xpZW50Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnQ29ubmVjdGVkIHRvIFJlZGlzJyk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGNvbm5lY3RSZWRpcyA9IGFzeW5jICgpID0+IHtcblx0aWYgKCFyZWRpc0NsaWVudC5pc09wZW4pIHtcblx0XHRhd2FpdCByZWRpc0NsaWVudC5jb25uZWN0KCk7XG5cdH1cblx0cmV0dXJuIHJlZGlzQ2xpZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkaXNDbGllbnQ7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwicmVkaXNDbGllbnQiLCJzb2NrZXQiLCJob3N0IiwicHJvY2VzcyIsImVudiIsIlJFRElTX0hPU1QiLCJwb3J0IiwicGFyc2VJbnQiLCJSRURJU19QT1JUIiwib24iLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJsb2ciLCJjb25uZWN0UmVkaXMiLCJpc09wZW4iLCJjb25uZWN0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./src/utils/redis.ts\n");

/***/ })

});