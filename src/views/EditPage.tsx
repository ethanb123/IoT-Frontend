import React, { useEffect } from "react";
import { Device } from "../devices/redux/devices-state";

interface DevicesTableProps {
    devices?: Device[];
}



function EditPage({ devices }: DevicesTableProps) {
    
    let path = window.location.pathname;
    let pathNumber = path.substring(10)
    console.log(pathNumber)


    //let newDevice = devices?.filter(device => device.id === 4) 

    console.log(devices)

    return (
        
        <h1>test</h1>
    )
    

}

export default (EditPage);
