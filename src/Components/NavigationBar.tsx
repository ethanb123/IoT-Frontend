import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default function NavigationBar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Network Topology</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            
            
            <NavItem>
              <NavLink href="/gatewaypage/">
                Gateways
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/devicepage/">
                Devices
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink href="/data/">
                Data
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/helppage/">
                Help
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
