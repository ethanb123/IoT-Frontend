import React from "react";

import {
    Table, Button,
} from "reactstrap";
import { Device } from "../redux/devices-state";
import devicesService from "devices/services/devices-service";
import Axios from "axios";

interface DevicesTableProps {
    devices?: Device[];
}

function gatewayLabelGen (isGateway?: boolean) {
    if(isGateway) {
        return "Gateway"
    }else{
        return "Device"
    }
}

export default function DevicesTable({ devices }: DevicesTableProps): JSX.Element {
    
    return <Table className="align-items-center" responsive hover striped>
        
        <thead className="thead-light">
            <tr>
                {["Name"].map((name) => (
                    <th scope="col">{name}</th>
                ))}

                {["Mac Address"].map((name) => (
                    <th scope="col">{name}</th>
                ))}

                {["IP Address"].map((name) => (
                    <th scope="col">{name}</th>
                ))}

                {["Connection Type"].map((name) => (
                    <th scope="col">{name}</th>
                ))}
                
                {["Device Type"].map((name) => (
                    <th scope="col">{name}</th>
                ))}

                {["Delete Device"].map((name) => (
                    <th scope="col">{name}</th>
                ))}

                {["Edit Device"].map((name) => (
                    <th scope="col">{name}</th>
                ))}
                
            </tr>
        </thead>
        <tbody>
            {devices?.map((device) => {
                
                return (
                    <tr key={device.id}>
                        <th scope="row">
                            {device.name}
                        </th>

                        <th scope="row">
                        <label>{device.macAddress}</label>
                        </th>

                        <th scope="row">
                        <label>{device.ip}</label>
                        </th>

                        <th scope="row">
                        <label>{device.deviceType}</label>
                        </th>
                        
                        <th scope="row">
                        <label>{ gatewayLabelGen(device.isGateway) }</label>
                        </th>
                        
                        <th scope="row">
                        <Button outline color="danger" onClick={ (e) => 
                            console.log( devicesService.delete(device.id), 
                            window.location.reload()
                            ) }>Delete</Button>
                        </th>
                        
                        <th scope="row">
                        
                        <Button outline color="danger" onClick={ (e) =>
                            console.log(devicesService.edit(device),
                            window.location.reload()
                            ) }>Edit</Button>
                        </th>
                        

                        
                    </tr>
                ); 
            })}
            
        </tbody>
    </Table>;
}