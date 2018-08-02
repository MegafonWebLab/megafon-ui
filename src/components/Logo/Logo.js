"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
exports.__esModule = true;
var react_1 = require("react");
require("./Logo.less");
var cn_1 = require("utils/cn");
var green_horizontal_svg_1 = require("./i/green-horizontal.svg");
var green_vertical_svg_1 = require("./i/green-vertical.svg");
var Link_1 = require("../Link/Link");
var cn = cn_1.cnCreate('logo');
var Logo = /** @class */function (_super) {
    __extends(Logo, _super);
    function Logo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Logo.prototype.render = function () {
        var _a = this.props,
            color = _a.color,
            view = _a.view,
            props = __rest(_a, ["color", "view"]);
        var images = {
            'green-horizontal': green_horizontal_svg_1["default"],
            'green-vertical': green_vertical_svg_1["default"]
        };
        var backgroundImage = "url(" + images[color + "-" + view] + ")";
        return React.createElement(
            Link_1.default,
            _extends({}, props, { className: cn({ view: view }) }),
            React.createElement("div", { className: cn('img'), style: { backgroundImage: backgroundImage } })
        );
    };
    Logo.defaultProps = {
        color: 'green',
        view: 'horizontal',
        target: '_blank',
        href: '/'
    };
    return Logo;
}(react_1.Component);
exports["default"] = Logo;