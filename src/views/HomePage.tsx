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
import { DevicesForm } from "../devices/DevicesForm";
import GatewayForm from "../devices/GatewayForm";
import { DevicesTable } from "../devices/Tables/DevicesTable";
import HomePageTable from "../devices/Tables/HomePageTable";

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
    notify,
}: Props) {

    useEffect(() => {
        loadDevices();
    }, []);

    return (
        <>
            <Container className="mt--6 d-flex justify-content-center" >
                <Col >
                   

                    <Row className="mt-5 justify-content-md-center">
                        <HomePageTable devices={devices} />
                    </Row>
                </Col>

            </Container>
        </>
    );
}


export default connector(Devices);
