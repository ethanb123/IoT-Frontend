import axios, { AxiosInstance } from "axios";
import { Device } from "devices/redux/devices-state";

class DevicesService {
    private http: AxiosInstance;
    constructor(baseUrl: string) {
        this.http = axios.create({
            baseURL: baseUrl,
        });
    }

    async create(name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: String, cpID: number): Promise<Device[]> {
        axios.post("http://localhost:3000/devices", {
            "name": name,
            "macAddress": macAddress,
            "ip": ip,
            "gateway": isGateway,
            "deviceType": deviceType,
            "cpID": cpID
          });

        return await this.devices();
    }

    edit(id: number, name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: String, cpID: number) {
        axios.put("http://localhost:3000/devices/"+id, {
            "name": name,
            "macAddress": macAddress,
            "ip": ip,
            "gateway": isGateway,
            "deviceType": deviceType,
            "cpID": cpID
          });
        return name;
    }
    
    delete(id: any) {
        axios.delete("http://localhost:3000/devices/delete/"+id);
        return id;
    }

    deleteGateway(id: any) {
        axios.delete("http://localhost:3000/devices/deleteGateway/"+id);
        return id;
    }

    async devices(): Promise<Device[]> {
      
        const result = axios.get("http://localhost:3000/devices/test");
        const data = (await result).data;

        if (data === undefined) {
            return Promise.resolve([]);
        }

        return data.map((device: any) => {
            return {
                id: device.id,
                name: device.name,
                macAddress: device.macAddress,
                ip: device.ip,
                isGateway: device.gateway,
                deviceType: device.deviceType,
                cpID: device.cpID
            };
        });
    }
}

const devicesService = new DevicesService(
    "http://localhost:8080/devices"
);
export default devicesService;
