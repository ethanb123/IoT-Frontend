import React, { useState } from "react";
import {
    Table, Button, FormGroup, Input, Label, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form,
} from "reactstrap";
import { Device } from "../redux/devices-state";
import devicesService from "devices/services/devices-service";
import { Controller, useForm } from "react-hook-form";

interface DevicesTableProps {
    devices?: Device[];
    onCreateDevice: (name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: string, cpID: number) => void;
    loading: boolean;
}

interface FormInput {
    name: string;
    macAddress: string;
    ip: string;
    isGateway: boolean;
    cpID: number;
}

function gatewayLabelGen (device: any) {
    console.log("isGateway: "+device.isGateway)
    if(device?.isGateway) {
        return "Gateway"
    }else{
        return "Device"
    }
}

export default function DevicesTable({ loading, devices, onCreateDevice }: DevicesTableProps): JSX.Element {
    const { errors, control, handleSubmit } = useForm<FormInput>();
    var [deviceType, setDeviceType] = React.useState('Select Device Type');
    var [state, setState] = React.useState(false);
    var [editRow, setEditRow] = useState(0);

    var [name, setName] = useState('');
    var [macAddress, setMacAddress] = useState('');
    var [ip, setIp] = useState('');
    var [deviceType, setDeviceType] = useState('');
    var [isGateway, setIsGateway] = useState('');
    var [cpID, setcpID] = useState('');

    function StartEdit(id: number) {
        setEditRow(id)
    }

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }

    function connectionType(device: any) {
        setDeviceType(device?.deviceType)
    }

    const onSubmitDevice = (data: FormInput) => {
        //window.location.reload()
        /*onCreateDevice(data.name, data.macAddress, data.ip, false, deviceType, data.cpID);*/
    };

    function saveEdit (device: any) {
        devicesService.edit(device.name, device?.macAddress, device.ip, device.isGateway, device.deviceType, device.cpID)
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
                
            </tr>
        </thead>
        <tbody>
            {devices?.map((device) => {
                
                if(editRow === device.id){
                    if(deviceType !== device.deviceType){
                        connectionType(device)
                    }
                    
                    return (
                        <tr key={device.id}>
                            {/*<Form onSubmit={handleSubmit(onSubmitDevice)}>*/}
                                <th scope="row">
                                    <FormGroup>
                                        <Controller
                                            as={Input}
                                            name="name"
                                            control={control}
                                            defaultValue={device.name}
                                            placeholder={device.name}
                                            id="device-name"
                                            rules={{ required: true }}
                                        />
                                        {errors.name &&
                                            <div className="alert alert-danger" role="alert">
                                                <strong>Device name</strong> is required
                                                    </div>}
                                    </FormGroup>
                                </th>
        
                                <th scope="row">
                                    <FormGroup>            
                                        <Controller
                                            as={Input}
                                            name="macAddress"
                                            control={control}
                                            defaultValue={device.macAddress}
                                            placeholder={device.macAddress}
                                            id="macAddress"
                                            rules={{ required: true }}
                                            pattern="^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$"
                                        />
                                        {errors.macAddress &&
                                            <div className="alert alert-danger" role="alert">
                                                <strong>Mac Address</strong> is required
                                                    </div>}
                                    </FormGroup>
                                </th>
        
                                <th scope="row">
                                    <FormGroup>            
                                        <Controller
                                            as={Input}
                                            name="ip"
                                            control={control}
                                            defaultValue={device.ip}
                                            placeholder={device.ip}
                                            id="ip"
                                            rules={{ required: true }}
                                            pattern = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                                        />
                                        {errors.ip &&
                                            <div className="alert alert-danger" role="alert">
                                                <strong>IP Address</strong> is required
                                                    </div>}
                                    </FormGroup>
                                </th>
            
                                <th scope="row">
                                
                                <Dropdown isOpen={state} toggle={() => handleClick(!state)}>
                                    
                                    <DropdownToggle caret>{deviceType}</DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem onClick={() =>  setDeviceType("WiFi") } dropDownValue="Prod A">
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
                                
                                <th scope="row">
                                <label>{ gatewayLabelGen(device.isGateway) }</label>
                                </th>
                                
                                <th scope="row">
                                <Button outline color="danger" onClick={ (e) => 
                                    saveEdit(device)
                                     }>Save</Button>
                                </th>
                                
                                <th scope="row">
                                
                                <Button outline color="danger" onClick={ (e) =>
                                    StartEdit( 0 )                               
                                    }>Edit</Button>
                                </th>
                            {/*</Form>*/}
                            
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
                            
                            <Button outline color="danger" type="submit" disabled={loading} onClick={ (e) =>
                                StartEdit( device.id! )
                                 }>Edit</Button>
                            </th>
                            
                        </tr>
                    );
                }
                 
            })}
            
        </tbody>
    </Table>;
}