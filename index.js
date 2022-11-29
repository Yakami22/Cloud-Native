"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const Get_1 = __importDefault(require("./routes/Get"));
const helloWorld = () => {
    return 'Hello world!';
};
exports.helloWorld = helloWorld;
(0, Get_1.default)();
//# sourceMappingURL=index.js.map