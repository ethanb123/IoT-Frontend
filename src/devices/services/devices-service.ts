import axios, { AxiosInstance } from "axios";
import { Device } from "devices/redux/devices-state";

class DevicesService {
    private http: AxiosInstance;
    constructor(baseUrl: string) {
        this.http = axios.create({
            baseURL: baseUrl,
        });
    }

    async create(name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: String): Promise<Device[]> {
        axios.post("http://localhost:3000/devices", {
            "name": name,
            "macAddress": macAddress,
            "ip": ip,
            "gateway": isGateway,
            "deviceType": deviceType
          });

        return await this.devices();
    }
    
    delete(id: any) {
        axios.delete("http://localhost:3000/devices/delete/"+id);
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
                deviceType: device.deviceType
            };
        });
    }
}

const devicesService = new DevicesService(
    "http://localhost:8080/devices"
);
export default devicesService;
