"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class BaseController {
    constructor() {
        this.serverErrorMessaage = "Something went wrong";
    }
    sendResponse(response, result, message, code = http_status_codes_1.StatusCodes.OK) {
        return response.status(code).json({
            success: true,
            message,
            data: result,
        });
    }
    sendEntityResponse(response, result, success, code = http_status_codes_1.StatusCodes.OK) {
        return response.status(code).json({
            success,
            data: result,
        });
    }
    sendError(response, error, errorMessage, code = http_status_codes_1.StatusCodes.BAD_REQUEST) {
        const errorBag = { success: false, message: error };
        if (errorMessage.constructor.name === "Result") {
            const validationError = errorMessage.array();
            errorBag.data = {
                error: [validationError[0].msg],
                validationErrors: validationError,
            };
            //   errorBag.message = validationError[0].msg;
        }
        else {
            if (errorMessage.length > 1) {
                errorBag.data = { error: errorMessage };
            }
            else {
                errorBag.data = { error };
            }
        }
        return response.status(code).json(errorBag);
    }
}
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map