import React from 'react'
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Container, Image } from "react-bootstrap";

const Propertydetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const rentOrSell = queryParams.get("rentOrSell");
  const propertyLocation = queryParams.get("location");
  const imagesParam = queryParams.get("images");
  const images = imagesParam ? imagesParam.split(",") : [];
  const size = queryParams.get("size");
  const price = queryParams.get("price");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
   useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <div style = {{backgroundColor: "#F1F2F2", minHeight: "100vh", paddingTop: isMobile? "3vw": "2vw"}}>
      <div style = {{fontSize: isMobile? "5vw": "3vw", fontWeight: "600", padding: "0", textDecoration: "underline", marginBottom: "0", marginLeft: "4.5vw"}}>
        {type} For {rentOrSell} In {propertyLocation}
      </div>
      <div style={{ width: "90%", height: isMobile? "40%": "20%", margin: "auto", marginTop: isMobile? "4vw": "2vw"}}>
        <Image style={{ width: "100%"}} src={`http://localhost:8080/${images[0]}`} alt="Property"/>
      </div>
      <Container style={{ width: isMobile ? "90%" : "50%", marginTop: isMobile? "5vw": "2vw", paddingTop: "1vw", 
        marginBottom: isMobile? "2vw": "0",  borderStyle: "hidden", borderRadius: "20px", height: "auto",
        backgroundColor: "#FAFEFF", position: "relative"}}>
       <div style={{ display: "flex", marginBottom: "0"}}>
        <div style={{ width: "50%", display: "flex", display: "block", marginLeft: isMobile? "3vw": "1vw"}}>
         <div style={{ fontStyle: "italic", fontWeight: "200" , fontSize: isMobile? "6vw": "3vw", width: "100%", marginBottom: "0"}}>
          BuiltUp Area
         </div>
         <div style={{fontWeight: "200" , fontSize: isMobile? "4vw": "2vw", width: "100%", fontWeight: "bold", marginTop: "0.1vw"}}>
          {size>=43560? `${(size/43560).toFixed(0)} Acre`: size>=12000? `${(size/12000).toFixed(0)} Bigha`: `${(size)} SqFt.`}
         </div>
        </div>
        <div style={{ width: "50%", display: "flex", display: "block", marginLeft: "auto"}}>
         <div style={{ fontStyle: "italic", fontWeight: "200" , fontSize: isMobile? "6vw": "3vw", width: "100%", marginLeft: "4vw", marginBottom: "0"}}>
          Price Breakup
         </div>
         <div style={{fontSize: isMobile? "4vw": "2vw", width: "100%", fontWeight: "bold", marginLeft: "4vw", marginTop: "0.1vw"}}>
          Rs. {price>=10000000? `${(price/10000000).toFixed(1)} Cr`: price>=100000? `${(price/100000).toFixed(1)} Lac`: `${(price/1000).toFixed(1)} Th`}
         </div>
         <div style={{fontSize: isMobile? "3vw": "1.5vw", width: "100%", marginLeft: "4vw", marginTop: "0"}}>
         {size>=43560? `${(price/size).toFixed(0)} per Acre`: size>=12000? `${(price/size).toFixed(0)} per Bigha`: `${(price/size).toFixed(0)} per SqFt.`}
         </div>
        </div>
       </div>
       <div style={{ width: "80%", display: "flex", display: "block", marginLeft: isMobile? "3vw": "1vw", marginTop: isMobile? "5vw": "2vw"}}>
         <div style={{ fontStyle: "italic", fontWeight: "200" , fontSize: isMobile? "6vw": "3vw", width: "100%", marginBottom: "0"}}>
          Location
         </div>
         <div style={{fontWeight: "200" , fontSize: isMobile? "4vw": "2vw", width: "100%", fontWeight: "bold", marginTop: "0.1vw"}}>
          {propertyLocation}
         </div>
       </div>
       <div style = {{ display: "flex", maxWidth: "100%", marginTop: isMobile? "5vw": "3vw", width: "75%", margin:"auto", justifyContent: "space-between"}}>
         <a style = {{padding: "1vw 4vw", backgroundColor: "red", color: "#fff", textDecoration: "none",
          fontFamily: "sans-serif", fontSize: isMobile? "4vw": "1.5vw", marginRight: "0vw", borderRadius: "1vw"}} href="tel:9981069233">Contact</a>
         <a style = {{padding: "1vw 4vw", backgroundColor: "#25D366", color: "#fff", textDecoration: "none", 
          fontFamily: "sans-serif", fontSize: isMobile? "4vw": "1.5vw", float: "right", marginLeft: "0", borderRadius: '1vw'}} href="https://api.whatsapp.com/send?phone=9981069233">
          WhatsApp
         </a>
       </div> 
      </Container>
    </div>
  )
}

export default Propertydetails
