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

  // Fetch & store data
  // await si
  //   .cpu()
  //   .then((data) => (systemInformation.cpu = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.system())
  //   .then((data) => (systemInformation.system = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.mem())
  //   .then((data) => (systemInformation.mem = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.osInfo())
  //   .then((data) => (systemInformation.os = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.currentLoad())
  //   .then((data) => (systemInformation.currentLoad = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.processes())
  //   .then((data) => (systemInformation.processes = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.diskLayout())
  //   .then((data) => (systemInformation.diskLayout = data))
  //   .catch((error) => console.error(error))
  //   .then(() => si.networkInterfaces())
  //   .then((data) => (systemInformation.networkInterfaces = data))
  //   .catch((error) => console.error(error));

  // console.log(systemInformation);

  return systemInformation;
};

export default systest;
