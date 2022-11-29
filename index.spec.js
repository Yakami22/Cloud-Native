"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SystemInfo_1 = __importDefault(require("./SystemInfo"));
const index_1 = require("./index");
const node_fetch_1 = __importDefault(require("node-fetch"));
describe('typeScript test suite', () => {
    it('should return "Hello world!"', () => {
        expect.assertions(1);
        expect((0, index_1.helloWorld)()).toBe('Hello world!');
    });
});
describe('get Method test', () => {
    it('should contain CPU attribute', async () => {
        expect.assertions(5);
        const data = await (0, SystemInfo_1.default)();
        expect(data).toHaveProperty('cpu');
        expect(data).toHaveProperty('system');
        expect(data).toHaveProperty('mem');
        expect(data).toHaveProperty('os');
        expect(data).toHaveProperty('currentLoad');
    });
});
describe('server test', () => {
    it('should return 200 status with right url', async () => {
        expect.assertions(1);
        const response = await (0, node_fetch_1.default)('http://localhost:5000/api/v1/sysinfo', {
            method: 'GET',
        });
        expect(response.status).toBe(200);
    });
});
describe('server test wrong url', () => {
    it('should return 404 status with right url', async () => {
        expect.assertions(1);
        const response = await (0, node_fetch_1.default)('http://localhost:5000/', {
            method: 'GET',
        });
        expect(response.status).toBe(404);
    });
});
//# sourceMappingURL=index.spec.js.map