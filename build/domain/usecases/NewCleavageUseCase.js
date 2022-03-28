"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.NewCleavageUseCase = void 0;
var InterfaceView_1 = require("../entities/InterfaceView");
var UseCase_1 = require("./UseCase");
var NavigateEvent_1 = require("../events/navigateEvent/NavigateEvent");
var DrawCleavageEvent_1 = require("../events/drawCleavage/DrawCleavageEvent");
var ChangeGamePhaseEvent_1 = require("../events/changeGamePhase/ChangeGamePhaseEvent");
var GamePhase_1 = require("../entities/GamePhase");
var NewCleavageUseCase = /** @class */ (function (_super) {
    __extends(NewCleavageUseCase, _super);
    function NewCleavageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    NewCleavageUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.chat.isConnected()
            .then(function (isConnected) { return isConnected
            ? _this.onConnected()
            : _this.applicationServices.event.sentEvent(new NavigateEvent_1.NavigateEvent(InterfaceView_1.InterfaceView.CONNECT_CHAT)); })["catch"](function (error) { return Promise.reject(error); });
    };
    NewCleavageUseCase.prototype.onConnected = function () {
        var _this = this;
        return this.applicationServices.interface.newCleavage()
            .then(function () { return Promise.all([
            _this.applicationServices.autoplay.hasAutoplay(),
            _this.applicationServices.interface.retrieveCurrentView()
        ]); })
            .then(function (_a) {
            var _b = __read(_a, 2), hasAutoplay = _b[0], currentView = _b[1];
            return _this.applicationServices.event.sentEvents(__spreadArray(__spreadArray([
                new ChangeGamePhaseEvent_1.ChangeGamePhaseEvent(GamePhase_1.GamePhase.NEW_CLEAVAGE)
            ], __read((currentView !== InterfaceView_1.InterfaceView.GAME ? [new NavigateEvent_1.NavigateEvent(InterfaceView_1.InterfaceView.GAME)] : [])), false), __read((hasAutoplay ? [new DrawCleavageEvent_1.DrawCleavageEvent()] : [])), false));
        })["catch"](function (error) { return Promise.reject(error); });
    };
    return NewCleavageUseCase;
}(UseCase_1.UseCase));
exports.NewCleavageUseCase = NewCleavageUseCase;
