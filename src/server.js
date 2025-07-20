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
const sequilize_1 = __importDefault(require("./database/config/sequilize")); // Make sure your sequelize instance is configured correctly
const app_1 = __importDefault(require("./app")); // Import the express app
const http_1 = __importDefault(require("http")); // HTTP server
const winstonLogger_1 = __importDefault(require("./utils/winstonLogger"));
const moment_timezone_1 = __importDefault(require("moment-timezone")); // Moment for timezone
const NAMESPACE = '[SERVER CONNECTION]:';
const PORT = 3000;
const server = http_1.default.createServer(app_1.default); // Creating an HTTP server using the express app
moment_timezone_1.default.tz.setDefault('Asia/Calcutta'); // Set the default timezone
if (require.main === module) {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Authenticate with the database before starting the server
            yield sequilize_1.default.authenticate(); // Make sure sequelize is properly set up in ./database/config/sequelize.ts
            winstonLogger_1.default.info(`${NAMESPACE} Database connected successfully`);
            // Start the server after the database authentication
            server.listen(PORT, () => {
                winstonLogger_1.default.info(`${NAMESPACE} Server started on port ${PORT}`);
            });
        }
        catch (error) {
            winstonLogger_1.default.error(`${NAMESPACE} Unable to start the server: ${error instanceof Error ? error.message : error}`);
        }
    }))();
}
exports.default = server;
