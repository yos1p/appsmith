"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AstValidator {
}
exports.default = AstValidator;
AstValidator.getScriptValidator = () => (0, express_validator_1.body)("script")
    .isString()
    .withMessage("Script is required and can only be a string");
AstValidator.getMultipleScriptValidator = () => (0, express_validator_1.body)("scripts")
    .isArray({
    min: 1,
})
    .withMessage("Multiple scripts are required");
AstValidator.getEntityRefactorValidator = () => [
    (0, express_validator_1.body)("script")
        .isString()
        .withMessage("Script is required and can only be a string"),
    (0, express_validator_1.body)("oldName")
        .isString()
        .withMessage("OldName is required and can only be a string"),
    (0, express_validator_1.body)("newName")
        .isString()
        .withMessage("NewName is required and can only be a string"),
    (0, express_validator_1.body)("isJSObject")
        .isBoolean()
        .withMessage("isJSObject is required and can only be a boolean"),
];
//# sourceMappingURL=ast.js.map