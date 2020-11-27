import React, { Component } from 'react';
import { Button,Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap';
import'./css/customernav.css';
class CustomeNavbar extends Component {
  render() {
    return (
         <Navbar className="ml-auto fixed-top nav-backg"  collapseOnSelect expand="lg">
  <Navbar.Brand className="logosafe" href="/">SaferDine</Navbar.Brand>
  {/* <Navbar.Brand href="/" className="mx-auto nav-cusine">SaferDine</Navbar.Brand> */}
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto nav-backg1">
      <Nav.Link className="nav-name" href="/">Category</Nav.Link>
      <Nav.Link className="nav-name" href="/scatlist">Menu</Nav.Link>
      {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    {/* <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav> */}
  </Navbar.Collapse>
</Navbar>
    );
  }
}

export default CustomeNavbar;
