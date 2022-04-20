"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const _1 = require(".");
function runInDevMode(distPath) {
    console.log('Dev mode');
    (0, fs_1.watch)(distPath).on('change', () => _1.io.emit('reloadPage'));
}
exports.default = runInDevMode;
