"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const SystemInfo_1 = __importDefault(require("../SystemInfo"));
const Get = () => {
    const port = 5000;
    const server = (0, http_1.createServer)(async (request, response) => {
        if (request.url === '/api/v1/sysinfo') {
            const data = JSON.stringify(await (0, SystemInfo_1.default)(), null, 4);
            response.write(data);
        }
        else {
            response.statusCode = 404;
            response.statusMessage = 'Wrong url';
            response.write('No No No No');
        }
        response.end();
    });
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};
exports.default = Get;
//# sourceMappingURL=Get.js.map