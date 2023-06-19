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
exports.tryAuth = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = process.env.APPSMITH_API_BASE_URL;
function tryAuth(socket) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        /* ********************************************************* */
        // TODO: This change is not being used at the moment. Instead of using the environment variable API_BASE_URL
        // we should be able to derive the API_BASE_URL from the host header. This will make configuration simpler
        // for the user. The problem with this implementation is that Axios doesn't work for https endpoints currently.
        // This needs to be debugged.
        /* ********************************************************* */
        // const host = socket.handshake.headers.host;
        const connectionCookie = (_b = (_a = socket === null || socket === void 0 ? void 0 : socket.handshake) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.cookie;
        if (connectionCookie === undefined ||
            connectionCookie === null ||
            connectionCookie === "") {
            return false;
        }
        const matchedCookie = connectionCookie.match(/\bSESSION=\S+/);
        if (!matchedCookie) {
            return false;
        }
        const sessionCookie = matchedCookie[0];
        let response;
        try {
            response = yield axios_1.default.request({
                method: "GET",
                url: API_BASE_URL + "/users/me",
                headers: {
                    Cookie: sessionCookie,
                },
            });
        }
        catch (error) {
            if (((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) === 401) {
                // eslint-disable-next-line no-console
                console.info("401 received when authenticating user with cookie: " + sessionCookie);
            }
            else if (error.response) {
                loglevel_1.default.error("Error response received while authentication: ", error.response);
            }
            else {
                loglevel_1.default.error("Error authenticating", error);
            }
            return false;
        }
        const email = (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.email;
        const name = (_h = (_g = (_f = response === null || response === void 0 ? void 0 : response.data) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : email;
        // If the session check API succeeds & the email/name is anonymousUser, then the user is not authenticated
        // and we should not allow them to join any rooms
        if (email == null || email === "anonymousUser" || name === "anonymousUser") {
            return false;
        }
        socket.data.email = email;
        socket.data.name = name;
        return true;
    });
}
exports.tryAuth = tryAuth;
//# sourceMappingURL=socket-auth.js.map