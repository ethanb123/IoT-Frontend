import React from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import Axios from "axios";
import { Device } from "../redux/devices-state";
import devicesService from "devices/services/devices-service";

interface DevicesTableProps {
    devices?: Device[];
}

export default function DropDown({ devices }: DevicesTableProps): JSX.Element {
    
    async function getData(){
        let data: any[] = [];
        let arrayOfGateways: any[] = [];

        await Axios.get('http://localhost:8080/devices')
          .then(function (response) {
            data = response.data._embedded.devices
            data?.map((device) => {
                arrayOfGateways.push(device)
            })
            console.log()
          })
          
          .catch(function (error) {
            console.log(error);
          });

        //return arrayOfGateways
        return Promise.resolve(data)
    }
    
    //let data1: any[] = []
    let data = Promise.resolve(getData())
    
    async function printOut(){
        (await data)?.map((device: any) => {
            console.log(device)
        })
    }
    

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

    console.log(data)
    printOut()
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
