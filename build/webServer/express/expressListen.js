"use strict";
exports.__esModule = true;
exports.expressListen = void 0;
function expressListen(app, sheme, fqdn, port) {
    var listenCallback = function () { return function () { return console.log("\u26A1\uFE0F[server]: Server is running at ".concat(sheme, "://").concat(fqdn).concat(port ? ":".concat(port) : '')); }; };
    app.listen(port, listenCallback());
}
exports.expressListen = expressListen;
