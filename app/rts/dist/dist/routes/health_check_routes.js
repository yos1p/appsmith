"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HealthCheckController_1 = __importDefault(require("../controllers/healthCheck/HealthCheckController"));
const Validator_1 = require("../middlewares/Validator");
const router = express_1.default.Router();
const healthCheckController = new HealthCheckController_1.default();
const validator = new Validator_1.Validator();
router.get("/health-check", validator.validateRequest, healthCheckController.performHealthCheck);
exports.default = router;
//# sourceMappingURL=health_check_routes.js.map