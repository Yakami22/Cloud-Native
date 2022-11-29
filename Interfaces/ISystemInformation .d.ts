import si from 'systeminformation';
export default interface ISystemInformation {
    cpu: si.Systeminformation.CpuData;
    system: si.Systeminformation.SystemData;
    mem: si.Systeminformation.MemData;
    os: si.Systeminformation.OsData;
    currentLoad: si.Systeminformation.CurrentLoadData;
    processes: si.Systeminformation.ProcessesData;
    diskLayout: si.Systeminformation.DiskLayoutData[];
    networkInterfaces: si.Systeminformation.NetworkInterfacesData[];
}
