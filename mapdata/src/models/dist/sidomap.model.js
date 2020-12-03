"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Sidomap = void 0;
var repository_1 = require("@loopback/repository");
var Sidomap = /** @class */ (function (_super) {
    __extends(Sidomap, _super);
    function Sidomap(data) {
        return _super.call(this, data) || this;
    }
    __decorate([
        repository_1.property({
            type: 'number',
            id: true,
            generated: true
        })
    ], Sidomap.prototype, "id");
    __decorate([
        repository_1.property({
            type: 'string',
            required: true
        })
    ], Sidomap.prototype, "sidoname");
    __decorate([
        repository_1.property({
            type: 'number',
            required: true
        })
    ], Sidomap.prototype, "zoomlevel");
    __decorate([
        repository_1.property({
            type: 'array',
            itemType: 'object',
            required: true
        })
    ], Sidomap.prototype, "cameralist");
    Sidomap = __decorate([
        repository_1.model()
    ], Sidomap);
    return Sidomap;
}(repository_1.Entity));
exports.Sidomap = Sidomap;
