"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTS_BASE_API_PATH = void 0;
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const loglevel_1 = __importDefault(require("loglevel"));
const version_1 = require("./version"); // release version of the api
const sockets_1 = require("./sockets");
// routes
const ast_routes_1 = __importDefault(require("./routes/ast_routes"));
const health_check_routes_1 = __importDefault(require("./routes/health_check_routes"));
const RTS_BASE_PATH = "/rts";
exports.RTS_BASE_API_PATH = "/rts-api/v1";
// Setting the logLevel for all log messages
const logLevel = (process.env.APPSMITH_LOG_LEVEL ||
    "debug");
loglevel_1.default.setLevel(logLevel);
const API_BASE_URL = process.env.APPSMITH_API_BASE_URL;
if (API_BASE_URL == null || API_BASE_URL === "") {
    loglevel_1.default.error("Please provide a valid value for `APPSMITH_API_BASE_URL`.");
    process.exit(1);
}
const APPSMITH_RTS_PORT = process.env.APPSMITH_RTS_PORT || 8091;
//Disable x-powered-by header to prevent information disclosure
const app = (0, express_1.default)();
app.disable("x-powered-by");
const server = new http_1.default.Server(app);
const io = new socket_io_1.Server(server, {
    path: RTS_BASE_PATH,
});
// Initializing Sockets
(0, sockets_1.initializeSockets)(io);
// parse incoming json requests
app.use(express_1.default.json({ limit: "5mb" }));
// Initializing Routes
app.use(express_1.default.static(path_1.default.join(__dirname, "static")));
app.get("/", (_, res) => {
    res.redirect("/index.html");
});
app.use(`${exports.RTS_BASE_API_PATH}/ast`, ast_routes_1.default);
app.use(`${exports.RTS_BASE_API_PATH}`, health_check_routes_1.default);
server.headersTimeout = 61000;
server.keepAliveTimeout = 60000;
// Run the server
server.listen(APPSMITH_RTS_PORT, () => {
    loglevel_1.default.info(`RTS version ${version_1.VERSION} running at http://localhost:${APPSMITH_RTS_PORT}`);
});
exports.default = server;
//# sourceMappingURL=server.js.map