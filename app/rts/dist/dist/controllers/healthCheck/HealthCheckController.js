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
class HealthCheckController extends BaseController_1.default {
    constructor() {
        super();
    }
    performHealthCheck(req, res) {
        const _super = Object.create(null, {
            sendResponse: { get: () => super.sendResponse },
            sendError: { get: () => super.sendError },
            serverErrorMessaage: { get: () => super.serverErrorMessaage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return _super.sendResponse.call(this, res);
            }
            catch (err) {
                return _super.sendError.call(this, res, _super.serverErrorMessaage, [err.message], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.default = HealthCheckController;
//# sourceMappingURL=HealthCheckController.js.map