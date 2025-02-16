import React , { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { List } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
     window.removeEventListener("resize", handleResize);
  }},[]);

  return (
    <>
        <div style={{ backgroundColor: "#5BB4C5", marginLeft: "0", marginRight: "0", padding: "0.5vw"}}>
          {/* Sidebar Toggle Button */}
          <button
           className="btn text-white me-2"
            onClick={() => setShowSidebar(true)}
            style={{ 
              border: "none",
              marginRight: "0", 
              padding: "0", 
              marginLeft: isMobile ? "2vw" : "1vw" 
            }}>
            <List size={32} style={{ color: "blue" }}/>
          </button>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{fontSize: isMobile ? "4vw" : "2vw", fontWeight: "500", padding: "0",
            border: "none", textDecoration: "none", color: "black", marginBottom: "0", padding: "0", marginLeft: "2vw", borderStyle: "solid", marginTop: "3vw"
          }} >Property Management</a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{fontSize: isMobile ? "3vw" : "1.5vw", fontWeight: "400", padding: "0",
            border: "none", textDecoration: "none", color: "black", marginBottom: "0", padding: "0", marginLeft: "auto"
          }} >Sign Up</a>
          <Navbar/>
        </div>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas 
  show={showSidebar} 
  onHide={() => setShowSidebar(false)} 
  backdrop="static"
  style={{ backgroundColor: "#020120", color: "white" }} // White text color
>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title style={{ color: "white" }}>Real Estate Service</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
    <Nav className="flex-column">
      <Nav.Link 
        href="/home" 
        className="mb-2 text-light" // Bootstrap class for white text
        style={{ 
          paddingBottom: "10px", 
          borderBottom: "1px solid white", // Change border color to white
          color: "white"  // Ensure white text
        }}
      >
        🏠 Home
      </Nav.Link>
      <Nav.Link 
        href="/login" 
        className="mb-2 text-light"
        style={{ 
          paddingBottom: "10px", 
          borderBottom: "1px solid white",
          color: "white" 
        }}
      >
        🔑 Sign In
      </Nav.Link>
      <Nav.Link 
        href="#legal" 
        className="mb-2 text-light"
        style={{ 
          paddingBottom: "10px", 
          borderBottom: "1px solid white",
          color: "white" 
        }}
      >
        📜 Legal Consultancy
      </Nav.Link>
    </Nav>
  </Offcanvas.Body>
 </Offcanvas>
</>);
}

export default Header
