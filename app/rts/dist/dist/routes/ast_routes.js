"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AstController_1 = __importDefault(require("../controllers/Ast/AstController"));
const Validator_1 = require("../middlewares/Validator");
const ast_1 = __importDefault(require("../middlewares/rules/ast"));
const router = express_1.default.Router();
const astController = new AstController_1.default();
const validator = new Validator_1.Validator();
router.post("/single-script-data", ast_1.default.getScriptValidator(), validator.validateRequest, astController.getIdentifierDataFromScript);
router.post("/multiple-script-data", ast_1.default.getMultipleScriptValidator(), validator.validateRequest, astController.getIdentifierDataFromMultipleScripts);
router.post("/entity-refactor", ast_1.default.getEntityRefactorValidator(), validator.validateRequest, astController.entityRefactorController);
exports.default = router;
//# sourceMappingURL=ast_routes.js.map