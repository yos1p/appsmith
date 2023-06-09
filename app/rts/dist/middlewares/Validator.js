"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const BaseController_1 = __importDefault(require("../controllers/BaseController"));
const express_validator_1 = require("express-validator");
class Validator extends BaseController_1.default {
    validateRequest(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return super.sendError(res, "Validation error", errors);
        next();
    }
}
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map