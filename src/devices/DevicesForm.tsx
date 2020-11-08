import React from "react";
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
    onCreateDevice: (name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: string) => void;
}

export default function DevicesForm({ loading, onCreateDevice }: DevicesFormProps, { devices }: DevicesTableProps): JSX.Element {
    const { errors, control, handleSubmit } = useForm<FormInput>();
    var [state, setState] = React.useState(false);
    var [deviceType, setDeviceType] = React.useState('Select Device Type');

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }

    const onSubmitDevice = (data: FormInput) => {
        window.location.reload()
        onCreateDevice(data.name, data.macAddress, data.ip, false, deviceType);
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
                        <DropdownItem onClick={() => setDeviceType("Z-Wave")} dropDownValue="Prod B">
                            Z-Wave
                        </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>
    
                <Button
                    type="submit"
                    color="success"
                    disabled={loading}
                >
                    Submit
                </Button>
            </Form>
        </CardBody>

    </Card>;
}
