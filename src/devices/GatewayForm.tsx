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

interface FormInput {
    name: string;
    macAddress: string;
    ip: string;
    isGateway: boolean;
    cpID: number;
}

interface GatewayFormProps {
    loading: boolean;
    onCreateDevice: (name: string, macAddress: string, ip: string, isGateway: boolean, deviceType: string, cpID: number) => void;
}

export default function GatewayForm({ loading, onCreateDevice }: GatewayFormProps): JSX.Element {
    const { errors, control, handleSubmit } = useForm<FormInput>();
    var [state, setState] = React.useState(false);
    var [deviceType, setDeviceType] = React.useState('Select Device Type');

    const onSubmitGateway = (data: FormInput) => {
        window.location.reload()
        onCreateDevice(data.name, data.macAddress, data.ip, true, deviceType, 0);
    };

    const handleClick = (event: React.SetStateAction<boolean>) => {
        setState(event)
    }


    return <Card className="col-lg-6">
        <CardHeader>
            <h3 className="mb-0">GATEWAY ENROLLEMENT</h3>
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit(onSubmitGateway)}>
                
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
                        pattern = "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
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
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Device Type</strong> is required
                                </div>}
                </FormGroup>
                
                <Button
                    type="submit"
                    color="success"
                    disabled={loading}
                >
                    Add Gateway
                </Button>
            </Form>
        </CardBody>

       
    </Card>;
}
