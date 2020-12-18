import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function a11yPropsH(index: any) {
  return {
    id: `horizontal-tab-${index}`,
    'aria-controls': `horizontal-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 750,
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    width: 300,
    minWidth: 300
  },
  tabsHorizontal: {
    borderRight: `0px solid ${theme.palette.divider}`,
    width: 500,
    minWidth: 500
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [hValue, setHValue] = React.useState(0);

  const handleChangeHorizontal = (event: React.ChangeEvent<{}>, newValue: number) => {
    setHValue(newValue);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        
      >
        <Tab label="Device Help:" {...a11yProps(0)} />
        <Tab label="Gateway Help:" {...a11yProps(1)} />
        <Tab label="Locating Mac Address:" {...a11yProps(2)} />
        <Tab label="Locating IP Address:" {...a11yProps(3)} />
        <Tab label="Locating Device Type:" {...a11yProps(4)} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          <h3>Device Help:</h3>
        </div>

{/* */}
        <div>
            <Tabs
            orientation="horizontal"
            variant="standard"
            value={hValue}
            onChange={handleChangeHorizontal}
            aria-label="Vertical tabs example"
            className={classes.tabsHorizontal}
          >
            <Tab label="Device Enrollment" {...a11yPropsH(0)} />
            <Tab label="Device Edit" {...a11yPropsH(1)} />
            <Tab label="Device Delete" {...a11yPropsH(2)} />
            
          </Tabs>
          <TabPanel value={hValue} index={0}>
            <div>
            To add a device, you go to the "Devices" tab which will bring up the "Device Enrollment" stage. From here, you add a Name for the device. 
        You then add the Mac Address of the device, this will be found either on the physical device or within an app on the device (See user manual). 
        Next, you will add the IP Address of the device which will be found on the physical device. Finally, you will choose the "Gateway" that you are connecting it to. 
        You click the drop down menu and select the gateway for the device.
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={1}>
            <div>
            To edit a device you have inputed, navigate to the "Devices" tab. Find the name of the device you would like to edit, 
        and click the "EDIT" button found to the right of it. This will allow text to be changed so you can make adjustments as needed. 
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={2}>
            <div>
            To remove a device you have inputed, navigate to the "Devices" tab. Find the name of the device you would like to delete, 
        and click the "DELETE" button found to the right of it.
            </div>
          </TabPanel>
        </div>
{/* */}
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div>
      <h3>Gateway Help:</h3>
            <Tabs
            orientation="horizontal"
            variant="standard"
            value={hValue}
            onChange={handleChangeHorizontal}
            aria-label="Vertical tabs example"
            className={classes.tabsHorizontal}
          >
            <Tab label="Gateway Enrollment" {...a11yPropsH(0)} />
            <Tab label="Gateway Edit" {...a11yPropsH(1)} />
            <Tab label="Gateway Delete" {...a11yPropsH(2)} />
            
          </Tabs>
          <TabPanel value={hValue} index={0}>
            <div>
            To add a gateway, you go to the "Gateways" tab which will bring up the "Gateway Enrollment" stage. From here, you add a Name for the gateway. 
        You then add the Mac Address of the device, this will be found either on the physical device or within an app on the device (See user manual). 
        Next, you will add the IP Address of the device which will be found on the physical device. Finally, you will choose the "Device Type" that you are connecting it to. 
        You click the drop down menu and select one of the three device types for the gateway.
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={1}>
            <div>
            To edit a gateway you have inputed, navigate to the "Gateways" tab. Find the name of the gateway you would like to edit, 
        and click the "EDIT" button found to the right of it. This will allow text to be changed so you can make adjustments as needed. 
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={2}>
            <div>
            To remove a gateway you have inputed, navigate to the "Gateways" tab. Find the name of the gateway you would like to delete, 
        and click the "DELETE" button found to the right of it. 
            <br />
        (NOTE: ALL DEVICES CONNECTED TO THE GATEWAY WILL ALSO BE DELETED)
            </div>
          </TabPanel>
        </div>
  
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <h3>Finding the Mac Address:</h3>
          <div>
            <Tabs
            orientation="horizontal"
            variant="standard"
            value={hValue}
            onChange={handleChangeHorizontal}
            aria-label="Vertical tabs example"
            className={classes.tabsHorizontal}
          >
            <Tab label="General Locations" {...a11yPropsH(0)} />
            <Tab label="General Format" {...a11yPropsH(1)} />
            
          </Tabs>
          <TabPanel value={hValue} index={0}>
            <div>
            Some general locations to find the Mac Address would be on the physical device usually appearing on a sticker on the underside of the device.
            If there is no sticker then you will have to go into the device/gateways system and search for it manually. 
            This can be different from item to item but as a broad norm, it will be found in the network settings.
            If you are unable to locate it via these methods you should see the user manual of the product or look online.
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={1}>
            <div>
            The general format of the Mac Address is a 12 digit hexadecimal number where each pair of numbers are separated by colons or hyphens. 
            Two examples would be "24:4B:FE:B1:58:29" or "19-6B-RS-B9-G6-31".
            <br />
            (NOTE: THEY WILL NOT LOOK IDENTICAL TO THE EXAMPLES GIVEN) 
            </div>
          </TabPanel>
        </div>
        </div>
        
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>
          <h3>Finding an IP Address</h3>
          <div>
            <Tabs
            orientation="horizontal"
            variant="standard"
            value={hValue}
            onChange={handleChangeHorizontal}
            aria-label="Vertical tabs example"
            className={classes.tabsHorizontal}
          >
            <Tab label="General Locations" {...a11yPropsH(0)} />
            <Tab label="General Format" {...a11yPropsH(1)} />
            
          </Tabs>
          <TabPanel value={hValue} index={0}>
            <div>
            Some general locations to find the IP Address would be on the physical device usually appearing on a sticker on the underside of the device.
            If there is no sticker then you will have to go into the device/gateways system and search for it manually. 
            This can be different from item to item but as a broad norm, it will be found in the network settings.
            If you are unable to locate it via these methods you should see the user manual of the product or look online.
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={1}>
            <div>
            The general format of the IP Address is a 32-bit number that uniquely identifies a network interface on a machine. 
            It is typically formatted as four 8-bit fields separated by periods. 
            A few examples of what the IP Address can look like "127.0.0.1" or "192.0.0.7".
            <br />
            (NOTE: THEY WILL NOT LOOK IDENTICAL TO THE EXAMPLES GIVEN) 
            </div>
          </TabPanel>
        </div>
        </div>
      </TabPanel>


      <TabPanel value={value} index={4}>
        <div>
          <h3>Finding the System Type</h3>
          <div>
            <Tabs
            orientation="horizontal"
            variant="standard"
            value={hValue}
            onChange={handleChangeHorizontal}
            aria-label="Vertical tabs example"
            className={classes.tabsHorizontal}
          >
            <Tab label="Device Enrollment" {...a11yPropsH(0)} />
            <Tab label="Device Edit" {...a11yPropsH(1)} />
            <Tab label="Device Delete" {...a11yPropsH(2)} />
            
          </Tabs>
          <TabPanel value={hValue} index={0}>
            <div>
            To add a device, you go to the "Devices" tab which will bring up the "Device Enrollment" stage. From here, you add a Name for the device. 
        You then add the Mac Address of the device, this will be found either on the physical device or within an app on the device (See user manual). 
        Next, you will add the IP Address of the device which will be found on the physical device. Finally, you will choose the "Gateway" that you are connecting it to. 
        You click the drop down menu and select the gateway for the device.
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={1}>
            <div>
            To edit a device you have inputed, navigate to the "Devices" tab. Find the name of the device you would like to edit, 
        and click the "EDIT" button found to the right of it. This will allow text to be changed so you can make adjustments as needed. 
            </div>
          </TabPanel>
          <TabPanel value={hValue} index={2}>
            <div>
            To remove a device you have inputed, navigate to the "Devices" tab. Find the name of the device you would like to delete, 
        and click the "DELETE" button found to the right of it.
            </div>
          </TabPanel>
        </div>
        </div>
        To find the devices MAC Address you go to your device settings, go to network settings, and locate it there.
      </TabPanel>
      
    </div>
  );
}