import React, { useState } from "react";
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

export function DevicesForm({ loading, onCreateDevice, devices }: DevicesFormProps): JSX.Element {
    
    const { errors, control, handleSubmit } = useForm<FormInput>();
    var [deviceType, setDeviceType] = React.useState('Select Device Type');
    var [gatewayName, setGatewayName] = useState(null);
    var [gatewayID, setGatewayID] = useState(0);
    var [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => { setDropdownOpen(!dropdownOpen) }

    const onSubmitDevice = (data: FormInput) => {
        window.location.reload()
        onCreateDevice(data.name, data.macAddress, data.ip, false, deviceType, gatewayID);
    };

    const handleGateway = (device: any) => {
        setGatewayName(device.name);
        setGatewayID(device.id);
        setDeviceType(device.deviceType)
        setDropdownOpen(false);
    }
    
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

                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {gatewayName?gatewayName:"Selected Gateway"}
                </DropdownToggle>
                    <DropdownMenu>
                        {devices?.map(device=> {
                            if(device.isGateway){
                                return <DropdownItem onClick={()=>handleGateway(device)}> {device.name}
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
