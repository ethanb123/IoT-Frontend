import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "redux/root-reducer";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import { actions as devicesActions } from "../devices/redux/devices-actions";
import { actions as systemActions } from "../redux/system-actions";
import GatewayForm from "../devices/GatewayForm";
import GatewayTable from "../devices/Tables/GatewayTable";

const mapState = (state: RootState) => ({
    loading: state.devices.loading,
    devices: state.devices.devices,
});

const mapDispatch = {
    loadDevices: devicesActions.loadDevices,
    createDevice: devicesActions.createDevice,
    notify: systemActions.notify
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function Devices({
    loading,
    devices,
    createDevice,
    loadDevices,
}: Props) {

    useEffect(() => {
        loadDevices();
    }, []);

    return (
        <>
            <Container className="mt--6 d-flex justify-content-center" >
                <Col >

                    <Row className="justify-content-md-center">
                        <GatewayForm onCreateDevice={createDevice} loading={loading} />
                    </Row>

                    <Row className="mt-5 justify-content-md-center">
                        <GatewayTable devices={devices} />
                    </Row>

                </Col>

            </Container>
        </>
    );
}

export default connector(Devices);