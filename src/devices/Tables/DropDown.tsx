import React from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import Axios from "axios";
import { Device } from "../redux/devices-state";
import devicesService from "devices/services/devices-service";

interface DevicesTableProps {
    devices?: Device[];
}

function countDevicesGateways ( devices: any ){
    let totalDevicesGateways = 0;
    {devices?.map((device: any) => {        
        return (
            <br key={device.id}>
                {totalDevicesGateways++}
            </br>
        )
    })}
    return totalDevicesGateways
}

function countDevices ( devices: any ){
    let totalDevices = 0;
    function isGateway(device: any) {
        if(!device.isGateway) {
            totalDevices++
        }
        return ""
    }
    {devices?.map((device: any) => {        
        return (
            <br key={device.id}>
                {isGateway(device)}
            </br>
        )
    })}
    return totalDevices
}

function countGateways ( devices: any ){
    let totalGateways = 0;
    function isGateway(device: any) {
        if(device.isGateway) {
            totalGateways++
        }
        return ""
    }
    {devices?.map((device: any) => {        
        return (
            <br key={device.id}>
                {isGateway(device)}
            </br>
        )
    })}
    return totalGateways
}

function countWiFi ( devices: any ){
    let totalWiFi = 0;
    function isWiFi(device: any) {
        if(device.deviceType === 'WiFi') {
            totalWiFi++
        }
        return ""
    }
    {devices?.map((device: any) => {        
        return (
            <br key={device.id}>
                {isWiFi(device)}
            </br>
        )
    })}
    return totalWiFi
}

function countZigbee ( devices: any ){
    let totalZigbee = 0;
    function isZigbee(device: any) {
        if(device.deviceType === 'Zigbee') {
            totalZigbee++
        }
        return ""
    }
    {devices?.map((device: any) => {        
        return (
            <br key={device.id}>
                {isZigbee(device)}
            </br>
        )
    })}
    return totalZigbee
}

function countZWave ( devices: any ){
    let totalZWave = 0;
    function isZWave(device: any) {
        if(device.deviceType === 'Z-Wave') {
            totalZWave++
        }
        return ""
    }
    {devices?.map((device: any) => {        
        return (
            <br key={device.id}>
                {isZWave(device)}
            </br>
        )
    })}
    return totalZWave
}

export default function DropDown({ devices }: DevicesTableProps): JSX.Element {
    
    var [state, setState] = React.useState(false);
    var [deviceType, setDeviceType] = React.useState('Test Drop Down');

    function CreateDropDownItem (gatewayName: string) {
        return (
            <DropdownItem onClick={() =>  setDeviceType(gatewayName) } dropDownValue="Prod A">
                {gatewayName}
            </DropdownItem>
        )
    }

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }

    async function getDevices(){
        //let test: any = []
        //const res = await Axios.get('http://localhost:8080/devices')
        const data = await Axios.get('http://localhost:8080/devices').then(res => res.data);
        //test = res.data
        return data
    }

    
    
    return (
    <div>
        
        <Dropdown isOpen={state} toggle={() => handleClick(!state)}>
            <DropdownToggle caret>{deviceType}</DropdownToggle>
            <DropdownMenu>
            {devices?.map((device: any) => {        
                return <DropdownItem onClick={() =>  setDeviceType("test1") }>
                        {device.name}
                    </DropdownItem>
               
            })}
            <DropdownItem onClick={() =>  setDeviceType("test1") } dropDownValue="Prod A">
                test1
            </DropdownItem>
            <DropdownItem onClick={() => setDeviceType("test2")} dropDownValue="Prod B">
                test2
            </DropdownItem>
            <DropdownItem onClick={() => setDeviceType("test3")} dropDownValue="Prod C">
                test3
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>)
    

    
}
