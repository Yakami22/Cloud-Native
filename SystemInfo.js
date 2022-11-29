"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const systeminformation_1 = __importDefault(require("systeminformation"));
const systest = async () => {
    const systemInformation = {
        cpu: undefined,
        system: undefined,
        mem: undefined,
        os: undefined,
        currentLoad: undefined,
        processes: undefined,
        diskLayout: [],
        networkInterfaces: [],
    };
    const [att_cpu, att_system, att_mem, att_os, att_currentLoad, att_processes, att_diskLayout, att_networkInterfaces,] = await Promise.all([
        systeminformation_1.default.cpu(),
        systeminformation_1.default.system(),
        systeminformation_1.default.mem(),
        systeminformation_1.default.osInfo(),
        systeminformation_1.default.currentLoad(),
        systeminformation_1.default.processes(),
        systeminformation_1.default.diskLayout(),
        systeminformation_1.default.networkInterfaces(),
    ]);
    systemInformation.cpu = att_cpu;
    systemInformation.system = att_system;
    systemInformation.mem = att_mem;
    systemInformation.os = att_os;
    systemInformation.currentLoad = att_currentLoad;
    systemInformation.processes = att_processes;
    systemInformation.diskLayout = att_diskLayout;
    systemInformation.networkInterfaces = att_networkInterfaces;
    return systemInformation;
};
exports.default = systest;
//# sourceMappingURL=SystemInfo.js.map