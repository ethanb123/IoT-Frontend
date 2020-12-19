import React, { useState } from "react";
import {
    Table, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from "reactstrap";
import { Device } from "devices/redux/devices-state";
import devicesService from "devices/services/devices-service";
import { useHistory } from "react-router-dom";

interface DevicesTableProps {
    devices?: Device[];
    loading: boolean;
}

function gatewayLabelGen (device: any) {
    if(device?.isGateway) {
        return "Gateway"
    }else{
        return "Device"
    }
}

export default function DevicesTable({ loading, devices }: DevicesTableProps): JSX.Element {
    var [state, setState] = React.useState(false);
    var [editRow, setEditRow] = useState(0);
    var [name, setName] = useState('');
    var [macAddress, setMacAddress] = useState('');
    var [ip, setIp] = useState('');
    var [deviceType, setDeviceType] = useState('');
    var [isGateway, setIsGateway] = useState(false);
    var [cpID, setcpID] = useState(0);

    let history = useHistory()

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }

    function saveEdit (id: number) {
        //console.log('id '+id+" name: "+name+" macAddress: "+macAddress+" ip: "+ip+" isGateway: "+isGateway.toString()+" deviceType: "+deviceType+" cpID "+cpID)
        devicesService.edit(id, name, macAddress, ip, isGateway, deviceType, cpID)
        window.location.reload()
    }

    function nameSet(nameInput: string){
        if (name !== nameInput) {
            setName(nameInput)
        }
        return name
    }

    function macAddressSet(macInput: string){       
        if (macAddress !== macInput) {
            setMacAddress(macInput)
        }
        console.log(macAddress)
        return macAddress
    }

    function ipSet(ipInput: string){
        if (ip !== ipInput) {
            setIp(ipInput)
        }
        return ip
    }
    
    function checkIfGateway(device: any) {
        console.log('test')
        if(device.isGateway === true) {
            return (
                <Button outline color="danger" onClick={ (e) =>
                    history.push("/gatewayview/"+device.id)                         
                }>Devices</Button>
            );
        }else{
            return (
                ""
            );
        }

    }
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

                {["Connected Devices"].map((name) => (
                    <th scope="col">{name}</th>
                ))}
                
            </tr>
        </thead>
        <tbody>
            {devices?.map((device) => {
                if(editRow === device.id){
                    return (
                        <tr key={device.id}>
                            
                            {/* Name Edit Field */}
                            <th scope="row">
                                <input defaultValue={device.name} onChange={event => nameSet(event.target.value)} />
                            </th>
    
                            {/* Mac Address Edit Field */}
                            <th scope="row">
                                <input defaultValue={device.macAddress} onChange={event => macAddressSet(event.target.value)} />
                            </th>
                            
                            {/* Ip Address Edit Field */}
                            <th scope="row">
                                <input defaultValue={device.ip} onChange={event => ipSet(event.target.value)} />
                            </th>
        
                            {/* Connection Type Edit Field */}
                            <th scope="row">
                                <Dropdown isOpen={state} toggle={() => handleClick(!state)}>
                                    <DropdownToggle caret>{deviceType}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setDeviceType("WiFi") } dropDownValue="Prod A">
                                            WiFi
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setDeviceType("Zigbee")} dropDownValue="Prod B">
                                            Zigbee
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setDeviceType("Z-Wave")} dropDownValue="Prod B">
                                            Z-Wave
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </th>
                            
                            {/* Gateway Label */}
                            <th scope="row">
                                <label>{ gatewayLabelGen(device) }</label>
                            </th>
                            
                            {/* Save Button */}
                            <th scope="row">
                                <Button outline color="danger" type="submit" disabled={loading}
                                    onClick={ async (e) =>  
                                        saveEdit(device.id!)
                                    }
                                >Save</Button>
                            </th>
                            
                            {/* Edit Button */}
                            <th scope="row">
                                <Button outline color="danger" onClick={ (e) =>
                                    setEditRow(0)                          
                                }>Edit</Button>
                            </th>

                            <th scope="row">
                                {checkIfGateway(device)}
                            </th>
                            
                        </tr>
                    );
                }else{
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
                            <label>{ gatewayLabelGen(device) }</label>
                            </th>
                            
                            <th scope="row">
                            <Button outline color="danger" onClick={ (e) => 
                                console.log( devicesService.delete(device.id), 
                                window.location.reload()
                                ) }>Delete</Button>
                            </th>
                            
                            <th scope="row">
                            
                            <Button outline color="danger" onClick={ (e) => {
                                nameSet(device.name!)
                                ipSet(device.ip!)
                                macAddressSet(device.macAddress!)
                                setIsGateway(device.isGateway!)
                                setcpID(device.cpID!)
                                setDeviceType(device.deviceType!)

                                setEditRow(device.id!)
                                }}>Edit</Button>
                            </th>

                            <th scope="row">
                                {checkIfGateway(device)}
                            </th>
                            
                        </tr>
                    );
                }
                 
            })}
            
        </tbody>
        
    </Table>;
}