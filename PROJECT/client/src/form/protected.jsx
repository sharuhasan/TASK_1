"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Protectedrouter = function (_a) {
    var component = _a.component, some = __rest(_a, ["component"]);
    var Rendercomponent = component;
    var hastoken = localStorage.getItem("auth-token");
    return (<react_router_dom_1.Route {...some} render={function (props) {
        return hastoken ? <Rendercomponent {...props}/> : <react_router_dom_1.Redirect to={{ pathname: '/login' }}/>;
    }}/>);
};
exports.default = Protectedrouter;
