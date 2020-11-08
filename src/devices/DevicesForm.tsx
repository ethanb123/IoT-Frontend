import React, { createRef } from "react";
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
import { Checkbox } from "@material-ui/core";
import { Device } from "./redux/devices-state";
import devicesService from "devices/services/devices-service";
//import { Checkbox } from "@material-ui/core";
//import { Device } from "./redux/devices-state";

interface DevicesTableProps {
    devices?: Device[];
}

interface FormInput {
    name: string;
    macAddress: string;
    ip: string;
    isGateway: boolean;
}

interface DevicesFormProps {
    loading: boolean;
    onCreateDevice: (name: string, macAddress: string, ip: string, isGateway: boolean) => void;
}





export default function DevicesForm({ loading, onCreateDevice }: DevicesFormProps, { devices }: DevicesTableProps): JSX.Element {
    var testBol = false;
    const { errors, control, handleSubmit } = useForm<FormInput>();
    var [state, setState] = React.useState(false);
    const onSubmitGateway = (data: FormInput) => {
        console.log("name: "+data.name+" Mac: "+data.macAddress);
        window.location.reload()
        
        onCreateDevice(data.name, data.macAddress, data.ip, true);
        
        console.log("is gateway: "+state);
    };

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }

    const onSubmitDevice = (data: FormInput) => {
        console.log("name: "+data.name+" Mac: "+data.macAddress);
        window.location.reload()
        
        onCreateDevice(data.name, data.macAddress, data.ip, false);
        
        console.log("is gateway: "+state);
    };
    
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
                    />
                    {errors.name &&
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
                    />
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>IP Address</strong> is required
                                </div>}
                </FormGroup>

                
                        
                    

                <Dropdown isOpen={state} toggle={() => handleClick(!state)}>
                    <DropdownToggle caret>Select Device Type</DropdownToggle>
                    <DropdownMenu>
                    

                    <DropdownItem onClick={() => console.log("dropdown A")} dropDownValue="Prod A">
                        Prod A
                    </DropdownItem>
                    <DropdownItem onClick={() => console.log("dropdown B")} dropDownValue="Prod B">
                        Prod B
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {devices?.map((device) => {
                return (
                    <tr key={device.id}>
                        <th scope="row">
                            {device.name}
                        </th>
                        </tr>
                );
                }
                )}

                <Button
                    type="submit"
                    color="success"
                    disabled={loading}
                >
                    Submit
                </Button>
            </Form>
        </CardBody>
        {/* */}
    </Card>;
}
