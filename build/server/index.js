"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const compression_1 = __importDefault(require("compression"));
const http_1 = require("http");
const path_1 = require("path");
const runInDevMode_1 = __importDefault(require("./runInDevMode"));
const port = 25623;
const distPath = (0, path_1.resolve)(process.cwd(), 'build/dist');
exports.app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(exports.app);
exports.io = new socket_io_1.Server(httpServer, {});
if (process.env.__DEV__)
    (0, runInDevMode_1.default)(distPath);
exports.app.use((0, compression_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.sendFile(`${distPath}/index.html`);
});
exports.app.use(express_1.default.static(distPath));
httpServer.listen(port, () => {
    console.log(`Online on port ${port} !`);
});
