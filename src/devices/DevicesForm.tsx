import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Device } from "./redux/devices-state";
//import DropDown  from "./Tables/DropDown"
import DropDown from "./Tables/DropDown"
import devicesService from "devices/services/devices-service";
import Axios from "axios";


interface FormInput {
    name: string;
    macAddress: string;
    ip: string;
    isGateway: boolean;
    cpID: number;
}

interface DevicesFormProps {
    loading: boolean;
    onCreateDevice: (name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: string, cpID: number) => void;
    devices?: Device[];
}

function findGateways( devices: any ) {
    console.log(devices)
    let Gateways: any[] = [];
    function isGateway(device: any) {
        console.log('result of isGateway: '+device.isGateway)
        if(device.isGateway) {
            Gateways.push(device)
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
    return Gateways;
}

export function DevicesForm({ loading, onCreateDevice, devices }: DevicesFormProps): JSX.Element {
    
    const { register, errors, control, handleSubmit } = useForm<FormInput>();
    var [state, setState] = React.useState(false);
    var [deviceType, setDeviceType] = React.useState('Select Device Type');

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }

    const onSubmitDevice = (data: FormInput) => {
        window.location.reload()
        onCreateDevice(data.name, data.macAddress, data.ip, false, deviceType, data.cpID);
    };

    function deviceTypeError(){
        if(deviceType == "Select Device Type") {
            return <div className="alert alert-danger" role="alert">
                    <strong>Device Type</strong> is required
                </div>
        }
    }

    async function printOut(){
        (await data)?.map((device: any) => {
            console.log(device)
        })
    }
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => { setDropdownOpen(!dropdownOpen) }
    const [gateways, setGateways] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState(null);

   

    const handleGateway = (name: any) => {
        setSelectedGateway(name);
        setDropdownOpen(false);
    }

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
    
    return <Card className="col-lg-6">

        {/*DEVICE ENROLLMENT*/}
        <CardHeader>
            <h3 className="mb-0">DEVICE ENROLLEMENT</h3>
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit(onSubmitDevice)}>
                
                <FormGroup>
                    <Label for="device-name">Name</Label>
                    <Controller
                        as={Input}
                        name="name"
                        control={control}
                        defaultValue=""
                        placeholder="Name"
                        id="device-name"
                        rules={{ required: true }}
                    />
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Device name</strong> is required
                                </div>}
                </FormGroup>

                <FormGroup>            
                    <Controller
                        as={Input}
                        name="macAddress"
                        control={control}
                        defaultValue=""
                        placeholder="Mac Address"
                        id="macAddress"
                        rules={{ required: true }}
                        pattern="^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$"
                    />
                    {errors.macAddress &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Mac Address</strong> is required
                                </div>}
                </FormGroup>

                <FormGroup>            
                    <Controller
                        as={Input}
                        name="ip"
                        control={control}
                        defaultValue=""
                        placeholder="IP Address"
                        id="ip"
                        rules={{ required: true }}
                        pattern = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                    />
                    {errors.ip &&
                        <div className="alert alert-danger" role="alert">
                            <strong>IP Address</strong> is required
                                </div>}
                </FormGroup>

                <FormGroup>
                    <Controller
                        as={Input}
                        name="cpID"
                        control={control}
                        defaultValue=""
                        placeholder="Gateway ID"
                        id="cpID"
                        rules={{ required: true }}
                    />
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Gateway ID</strong> is required
                                   </div>}
                </FormGroup>


                <FormGroup>  
                    <Dropdown isOpen={state} toggle={() => handleClick(!state)}>
                        <DropdownToggle caret>{deviceType}</DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem onClick={() =>  setDeviceType("WiFi") } dropDownValue="Prod A">
                            WiFi
                        </DropdownItem>
                        <DropdownItem onClick={() => setDeviceType("Zigbee")} dropDownValue="Prod B">
                            Zigbee
                        </DropdownItem>
                        <DropdownItem onClick={() => setDeviceType("Z-Wave")} dropDownValue="Prod C">
                            Z-Wave
                        </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Device Type</strong> is required
                                </div>}
                </FormGroup>

                {/*<DropDown />*/}
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {selectedGateway?selectedGateway:"Selected Gateway"}
                </DropdownToggle>
                    <DropdownMenu>
                        {console.log('test')}
                        {console.log(devices)}
                        {devices?.map(device=> {
                            console.log(device.name)
                            if(device.isGateway){
                                return <DropdownItem onClick={()=>handleGateway(device.name)}> {device.name}
                                </DropdownItem>
                            }
                            
                        })}
                    </DropdownMenu>
                </Dropdown>

                <br />
    
                <Button
                    type="submit"
                    color="success"
                    disabled={loading}
                >
                    Add Device
                </Button>
            </Form>
        </CardBody>
        
    </Card>;
    
}
