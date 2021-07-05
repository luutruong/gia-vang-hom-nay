"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const index_1 = __importDefault(require("./lib/routes/index"));
const app = express();
const PORT = process.env.PORT || 8080;
app.use('/', index_1.default);
app.listen(PORT, () => {
    console.log(`> App started at: http://localhost:${PORT}`);
});
