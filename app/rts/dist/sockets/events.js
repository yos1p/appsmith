"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchEvents = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
const socket_1 = require("../constants/socket");
const version_1 = require("../version");
const socket_2 = require("../controllers/socket");
function watchEvents(io) {
    io.on("connection", (socket) => {
        socket.emit(socket_1.RELEASE_VERSION_EVENT_NAME, version_1.VERSION);
        (0, socket_2.subscribeToEditEvents)(socket, socket_1.APP_ROOM_PREFIX);
        (0, socket_2.onAppSocketConnected)(socket).catch(error => loglevel_1.default.error("Error in socket connected handler", error));
    });
    /** When we get the page visibility event, it means the page/tab
     * is visible on the client after navigating away from it.
     * We will respond back with the current version to
     * so that the client can confirm if they are
     * on the latest version of the client
     */
    io.on(socket_1.PAGE_VISIBILITY_EVENT_NAME, (socket) => {
        socket.emit(socket_1.RELEASE_VERSION_EVENT_NAME, version_1.VERSION);
    });
    io.of(socket_1.PAGE_EDIT_NAMESPACE).on("connection", (socket) => {
        (0, socket_2.subscribeToEditEvents)(socket, socket_1.PAGE_ROOM_PREFIX);
        (0, socket_2.onPageSocketConnected)(socket, io).catch(error => loglevel_1.default.error("Error in socket connected handler", error));
    });
    io.of(socket_1.ROOT_NAMESPACE).adapter.on("leave-room", (room, id) => {
        if (room.startsWith(socket_1.APP_ROOM_PREFIX)) {
            loglevel_1.default.debug(`ns:${socket_1.ROOT_NAMESPACE}# socket ${id} left the room ${room}`);
        }
        (0, socket_2.sendCurrentUsers)(io, room, socket_1.APP_ROOM_PREFIX);
    });
    io.of(socket_1.ROOT_NAMESPACE).adapter.on("join-room", (room, id) => {
        if (room.startsWith(socket_1.APP_ROOM_PREFIX)) {
            loglevel_1.default.debug(`ns:${socket_1.ROOT_NAMESPACE}# socket ${id} joined the room ${room}`);
        }
        (0, socket_2.sendCurrentUsers)(io, room, socket_1.APP_ROOM_PREFIX);
    });
    io.of(socket_1.PAGE_EDIT_NAMESPACE).adapter.on("leave-room", (room, id) => {
        if (room.startsWith(socket_1.PAGE_ROOM_PREFIX)) {
            // someone left the page edit, notify others
            loglevel_1.default.debug(`ns:${socket_1.PAGE_EDIT_NAMESPACE} # socket ${id} left the room ${room}`);
            io.of(socket_1.PAGE_EDIT_NAMESPACE)
                .to(room)
                .emit(socket_1.LEAVE_EDIT_EVENT_NAME, id);
        }
        (0, socket_2.sendCurrentUsers)(io.of(socket_1.PAGE_EDIT_NAMESPACE), room, socket_1.PAGE_ROOM_PREFIX);
    });
    io.of(socket_1.PAGE_EDIT_NAMESPACE).adapter.on("join-room", (room, id) => {
        if (room.startsWith(socket_1.PAGE_ROOM_PREFIX)) {
            loglevel_1.default.debug(`ns:${socket_1.PAGE_EDIT_NAMESPACE}# socket ${id} joined the room ${room}`);
        }
        (0, socket_2.sendCurrentUsers)(io.of(socket_1.PAGE_EDIT_NAMESPACE), room, socket_1.PAGE_ROOM_PREFIX);
    });
}
exports.watchEvents = watchEvents;
//# sourceMappingURL=events.js.map