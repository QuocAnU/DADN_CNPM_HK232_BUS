import React from "react";
import "./TextField.css";
export default function TextField(props) {
  return (
    <div className="textField">
      <div className="titleS">{props.title}</div>
      <input type={props.type} className="input"></input>
    </div>
  );
}
