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
Object.defineProperty(exports, "__esModule", { value: true });
const ast_1 = require("@shared/ast");
class AstService {
    static extractIdentifierDataFromScript(script, evalVersion, invalidIdentifiers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const identifierInfo = (0, ast_1.extractIdentifierInfoFromCode)(script, evalVersion, invalidIdentifiers);
                    resolve(identifierInfo);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    static entityRefactor(script, oldName, newName, isJSObject, evalVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const refactoredCode = (0, ast_1.entityRefactorFromCode)(script, oldName, newName, isJSObject, evalVersion);
                    resolve(refactoredCode);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
exports.default = AstService;
//# sourceMappingURL=AstService.js.map