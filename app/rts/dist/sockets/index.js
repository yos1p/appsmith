"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSockets = void 0;
const events_1 = require("./events");
// Initializing Multiple Sockets
function initializeSockets(io) {
    (0, events_1.watchEvents)(io);
}
exports.initializeSockets = initializeSockets;
//# sourceMappingURL=index.js.map