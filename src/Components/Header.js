import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useLocation, useNavigate } from 'react-router';





const Header = () => {

  const navigate = useNavigate(); // ✅ Hook inside component
  const location = useLocation(); // ✅ Get current location

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location } }); // Store current location
  };


  return (
    <Navbar expand="lg" style = {{backgroundColor : "#5BB4C5"}}>
      <Container style = {{backgroundColor : "#5BB4C5"}}>
        <Navbar.Brand href="/home" style = {{fontSize: "1.5vw", fontWeight: "bold"}}>Property management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" style = {{fontSize: "1.5vw", fontWeight: "400"}}>Home</Nav.Link>
            <Nav.Link href="#link" style = {{fontSize: "1.5vw", fontWeight: "400"}}>Legal consultancy </Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown" style = {{fontSize: "1.5vw", fontWeight: "400"}}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="ms-auto">
        <Nav.Link onClick={handleLoginClick} style = {{fontSize: "1.5vw", fontWeight: "400"}}>
          Sign Up
        </Nav.Link>
      </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
