import React from "react";
import "./ButtonSM.css";
export default function ButtonSM(props) {
  return (
    <button className="btn-sm" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
