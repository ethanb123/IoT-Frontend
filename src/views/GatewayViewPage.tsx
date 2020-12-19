import React from "react";
import { Device } from "devices/redux/devices-state";
import devicesService from "devices/services/devices-service";
import { Table, Button } from "reactstrap";

interface DevicesTableProps {
    devices?: Device[];
}

export default function Edit({ devices }: DevicesTableProps): JSX.Element {

    let path = window.location.pathname;
    let pathNumber = path.substring(13)
    let idNumber: number = +pathNumber
    console.log(pathNumber)

    return (
        <div>
            {console.log(devices)}
            <h1>Gateway</h1>

            <Table className="align-items-center" responsive hover striped>
        
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

                        {["Delete Device"].map((name) => (
                            <th scope="col">{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {devices?.map((device) => {
                        if(device?.id === idNumber){
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
                                        <Button outline color="danger" onClick={ (e) => 
                                            console.log( devicesService.delete(device.id), 
                                            window.location.reload()
                                        ) }>Delete</Button>
                                    </th>
                                    
                                </tr>
                            ) 
                        }
                    })}
                </tbody>
            </Table>

            <h1>Devices</h1>

            <Table className="align-items-center" responsive hover striped>
                    
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

                        {["Delete Device"].map((name) => (
                            <th scope="col">{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {devices?.map((device) => {
                        if(device?.cpID === idNumber){
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
                                        <Button outline color="danger" onClick={ (e) => 
                                            console.log( devicesService.delete(device.id), 
                                            window.location.reload()
                                        ) }>Delete</Button>
                                    </th>
                                    
                                </tr>
                            ) 
                        }
                    })}
                </tbody>
            </Table>

        </div>
    )
}