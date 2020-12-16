import React from "react";
import { Device } from "../redux/devices-state";
import { PieChart } from 'react-minimal-pie-chart';
import { Col, Card, CardTitle, CardText } from "reactstrap";

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

function pieWiFi(devices: any){
    let value = countWiFi(devices)
    if(value === 0){
        return 1
    }else{
        return value
    }
}

function pieZigbee(devices: any){
    let value = countZigbee(devices)
    if(value === 0){
        return 1
    }else{
        return value
    }
}

function pieZWave(devices: any){
    let value = countZWave(devices)
    if(value === 0){
        return 1
    }else{
        return value
    }
}    

export default function HomePageTable({ devices }: DevicesTableProps): JSX.Element {
    
    return <h5>
        
        <div style={{display: "flex", flexDirection: "row", flexFlow: "row wrap", margin: "6", width: "80%", marginLeft: '10%', marginRight: '10%' }}>
        {console.log(devices)}
            <Col sm="20" style={{width: '33%', minWidth: 270, padding: 5} }>
                <Card body>
                    <CardTitle style={{fontSize: '20px'}} > Total Devices/Gateways </CardTitle>
                    {<CardText> {countDevicesGateways( devices )} </CardText>}
                </Card>
            </Col>   

            <Col sm="20" style={{width: '33%', minWidth: 200, padding: 5} }>
                <Card body>
                    <CardTitle style={{fontSize: '20px'}} > Total Devices </CardTitle>
                    {<CardText> {countDevices( devices )} </CardText>}
                </Card>
            </Col>   

            <Col sm="20" style={{width: '33%', minWidth: 200, padding: 5} }>
                <Card body>
                    <CardTitle style={{fontSize: '20px'}} > Total Gateways </CardTitle>
                    {<CardText> {countGateways( devices )} </CardText>}
                </Card>
            </Col> 

            <Col sm="20" style={{width: '33%', minWidth: 200, padding: 5} }>
                <Card body>
                    <CardTitle style={{fontSize: '20px'}} > WiFi Devices </CardTitle>
                    {<CardText> {countWiFi( devices )} </CardText>}
                </Card>
            </Col> 

            <Col sm="20" style={{width: '33%', minWidth: 200, padding: 5} }>
                <Card body>
                    <CardTitle style={{fontSize: '20px'}} > Zigbee Devices </CardTitle>
                    {<CardText> {countZigbee( devices )} </CardText>}
                </Card>
            </Col> 

            <Col sm="20" style={{width: '33%', minWidth: 200, padding: 5} }>
                <Card body>
                    <CardTitle style={{fontSize: '20px'}} > Z-Wave Devices </CardTitle>
                    {<CardText> {countZWave( devices )} </CardText>}
                </Card>
            </Col> 
        </div>
       
        <div style={{marginLeft: '30%', marginRight: '30%'}}>
            <br />
            <PieChart  style={{}}
                label={(data) => data.dataEntry.title}
                animate={true}
                labelStyle={{
                    fontSize: "8px",
                }}
                data={[
                    { title: 'WiFi', value: pieWiFi( devices ), color: '#aee6e6' },
                    { title: 'Zigbee', value: pieZigbee( devices ), color: '#fbf6f0' },
                    { title: 'Z-Wave', value: pieZWave( devices ), color: '#f3eac2' },
                ]}
            />
        </div>

    </h5>;

    
}
