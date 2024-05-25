import React from "react";
import "./LogoT.css";
import logo1 from "../Image/logo1.png";
export default function LogoT(props) {
  return (
    <div className="parent">
      <img src={logo1} alt="logo1" className="logo"></img>
      <div className="text1">{props.name}</div>
    </div>
  );
}
