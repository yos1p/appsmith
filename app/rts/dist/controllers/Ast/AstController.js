"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const BaseController_1 = __importDefault(require("../BaseController"));
const AstService_1 = __importDefault(require("../../services/AstService"));
class AstController extends BaseController_1.default {
    constructor() {
        super();
    }
    getIdentifierDataFromScript(req, res) {
        const _super = Object.create(null, {
            sendResponse: { get: () => super.sendResponse },
            sendError: { get: () => super.sendError },
            serverErrorMessaage: { get: () => super.serverErrorMessaage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // By default the application eval version is set to be 2
                const { script, evalVersion = 2 } = req.body;
                const data = yield AstService_1.default.extractIdentifierDataFromScript(script, evalVersion);
                return _super.sendResponse.call(this, res, data);
            }
            catch (err) {
                return _super.sendError.call(this, res, _super.serverErrorMessaage, [err.message], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getIdentifierDataFromMultipleScripts(req, res) {
        const _super = Object.create(null, {
            sendResponse: { get: () => super.sendResponse },
            sendError: { get: () => super.sendError },
            serverErrorMessaage: { get: () => super.serverErrorMessaage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // By default the application eval version is set to be 2
                const { scripts, evalVersion = 2 } = req.body;
                Promise.all(scripts.map((script) => __awaiter(this, void 0, void 0, function* () {
                    return yield AstService_1.default.extractIdentifierDataFromScript(script, evalVersion);
                }))).then((data) => {
                    return _super.sendResponse.call(this, res, data);
                });
            }
            catch (err) {
                return _super.sendError.call(this, res, _super.serverErrorMessaage, [err.message], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    entityRefactorController(req, res) {
        const _super = Object.create(null, {
            sendEntityResponse: { get: () => super.sendEntityResponse },
            sendError: { get: () => super.sendError },
            serverErrorMessaage: { get: () => super.serverErrorMessaage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // By default the application eval version is set to be 2
                const { script, oldName, newName, isJSObject, evalVersion = 2 } = req.body;
                const data = yield AstService_1.default.entityRefactor(script, oldName, newName, isJSObject, evalVersion);
                return _super.sendEntityResponse.call(this, res, data.body, data.isSuccess);
            }
            catch (err) {
                return _super.sendError.call(this, res, _super.serverErrorMessaage, [err.message], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.default = AstController;
//# sourceMappingURL=AstController.js.map