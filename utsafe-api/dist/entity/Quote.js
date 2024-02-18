"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Quote = /** @class */ (function () {
    function Quote() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Quote.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.Length)(2, 100),
        __metadata("design:type", String)
    ], Quote.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(150),
        __metadata("design:type", Number)
    ], Quote.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.Length)(2, 100),
        __metadata("design:type", String)
    ], Quote.prototype, "carModel", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(100),
        __metadata("design:type", Number)
    ], Quote.prototype, "drivingExpYrs", void 0);
    __decorate([
        (0, typeorm_1.Column)("decimal", {
            nullable: true,
            precision: 5,
            scale: 2,
        }),
        __metadata("design:type", Number)
    ], Quote.prototype, "quoteRate", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'text',
            generatedType: 'STORED',
            asExpression: "trim(lower(name)) || '::' || age || '::' || trim(lower(\"carModel\")) || '::' || \"drivingExpYrs\"",
        }),
        __metadata("design:type", String)
    ], Quote.prototype, "inputKey", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
        __metadata("design:type", Date)
    ], Quote.prototype, "createdAt", void 0);
    Quote = __decorate([
        (0, typeorm_1.Entity)()
    ], Quote);
    return Quote;
}());
exports.Quote = Quote;
//# sourceMappingURL=Quote.js.map