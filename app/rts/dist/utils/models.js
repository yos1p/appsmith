"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MousePointerEvent = exports.CurrentEditorsEvent = exports.AppUser = void 0;
class AppUser {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}
exports.AppUser = AppUser;
class CurrentEditorsEvent {
    constructor(resourceId, users) {
        this.resourceId = resourceId;
        this.users = users;
    }
}
exports.CurrentEditorsEvent = CurrentEditorsEvent;
class MousePointerEvent {
}
exports.MousePointerEvent = MousePointerEvent;
//# sourceMappingURL=models.js.map