import React from "react";
import "./TextField.css";

export default function TextField({ title, type, value, onChange }) {
  return (
    <div className="textField">
      <div className="titleS">{title}</div>
      <input type={type} className="input" value={value} onChange={onChange} />
    </div>
  );
}
