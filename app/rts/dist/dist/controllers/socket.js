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
exports.findPolicyEmails = exports.sendCurrentUsers = exports.onPageSocketConnected = exports.onAppSocketConnected = exports.subscribeToEditEvents = void 0;
const socket_auth_1 = require("../middlewares/socket-auth");
const socket_1 = require("../constants/socket");
const models_1 = require("../utils/models");
function subscribeToEditEvents(socket, appRoomPrefix) {
    socket.on(socket_1.START_EDIT_EVENT_NAME, (resourceId) => {
        if (socket.data.email) {
            // user is authenticated, join the room now
            joinEditRoom(socket, resourceId, appRoomPrefix);
        }
        else {
            // user not authenticated yet, save the resource id and room prefix to join later after auth
            socket.data.pendingRoomId = resourceId;
            socket.data.pendingRoomPrefix = appRoomPrefix;
        }
    });
    socket.on(socket_1.LEAVE_EDIT_EVENT_NAME, (resourceId) => {
        const roomName = appRoomPrefix + resourceId;
        socket.leave(roomName); // remove this socket from room
    });
}
exports.subscribeToEditEvents = subscribeToEditEvents;
function onAppSocketConnected(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAuthenticated = yield tryAuthAndJoinPendingRoom(socket);
        if (isAuthenticated) {
            socket.join("email:" + socket.data.email);
        }
    });
}
exports.onAppSocketConnected = onAppSocketConnected;
function onPageSocketConnected(socket, socketIo) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAuthenticated = yield tryAuthAndJoinPendingRoom(socket);
        if (isAuthenticated) {
            socket.on(socket_1.MOUSE_POINTER_EVENT_NAME, (event) => {
                event.user = new models_1.AppUser(socket.data.name, socket.data.email);
                event.socketId = socket.id;
                socketIo
                    .of(socket_1.PAGE_EDIT_NAMESPACE)
                    .to(socket_1.PAGE_ROOM_PREFIX + event.pageId)
                    .emit(socket_1.MOUSE_POINTER_EVENT_NAME, event);
            });
        }
    });
}
exports.onPageSocketConnected = onPageSocketConnected;
function tryAuthAndJoinPendingRoom(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAuthenticated = yield (0, socket_auth_1.tryAuth)(socket);
        if (socket.data.pendingRoomId) {
            // an appId or pageId is pending for this socket, join now
            joinEditRoom(socket, socket.data.pendingRoomId, socket.data.pendingRoomPrefix);
        }
        return isAuthenticated;
    });
}
function joinEditRoom(socket, roomId, roomPrefix) {
    // remove this socket from any other rooms with roomPrefix
    if (socket.rooms) {
        socket.rooms.forEach((roomName) => {
            if (roomName.startsWith(roomPrefix)) {
                socket.leave(roomName);
            }
        });
    }
    // add this socket to room with application id
    const roomName = roomPrefix + roomId;
    socket.join(roomName);
}
function findPolicyEmails(policies, permission) {
    const emails = [];
    for (const policy of policies) {
        if (policy.permission === permission) {
            for (const email of policy.users) {
                emails.push(email);
            }
            break;
        }
    }
    return emails;
}
exports.findPolicyEmails = findPolicyEmails;
function sendCurrentUsers(socketIo, roomName, roomPrefix) {
    if (roomName.startsWith(roomPrefix)) {
        socketIo
            .in(roomName)
            .fetchSockets()
            .then((sockets) => {
            const onlineUsernames = new Set();
            const onlineUsers = new Array();
            if (sockets) {
                sockets.forEach((s) => {
                    if (!onlineUsernames.has(s.data.email)) {
                        onlineUsers.push(new models_1.AppUser(s.data.name, s.data.email));
                    }
                    onlineUsernames.add(s.data.email);
                });
            }
            const resourceId = roomName.replace(roomPrefix, ""); // get resourceId from room name by removing the prefix
            const response = new models_1.CurrentEditorsEvent(resourceId, onlineUsers);
            socketIo.to(roomName).emit(socket_1.EDITORS_EVENT_NAME, response);
        });
    }
}
exports.sendCurrentUsers = sendCurrentUsers;
//# sourceMappingURL=socket.js.map