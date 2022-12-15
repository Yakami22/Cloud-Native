import ISystemInformation from './Interfaces/ISystemInformation ';

import si from 'systeminformation';

const systest = async () => {
  const systemInformation: ISystemInformation = {
    cpu: undefined,
    system: undefined,
    mem: undefined,
    os: undefined,
    currentLoad: undefined,
    processes: undefined,
    diskLayout: [],
    networkInterfaces: [],
  };

  const [
    att_cpu,
    att_system,
    att_mem,
    att_os,
    att_currentLoad,
    att_processes,
    att_diskLayout,
    att_networkInterfaces,
  ] = await Promise.all([
    si.cpu(),
    si.system(),
    si.mem(),
    si.osInfo(),
    si.currentLoad(),
    si.processes(),
    si.diskLayout(),
    si.networkInterfaces(),
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

export default systest;
