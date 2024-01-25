import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function ListItem() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Nav className="ml-auto">
          <NavLink href="/graph">Bieu Do</NavLink>
          <NavLink href="/upload">Upload</NavLink>
        </Nav>
      </Navbar>
    </div>
  );
}
