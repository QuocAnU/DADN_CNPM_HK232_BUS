import React from "react";
import "./RouteCard.css";
export default function RouteCard(props) {
  return (
    <div className="route-card">
      <div className="headCard">
        <h3 className="T">Tuyến xe số {props.route_no} </h3>
        <div className="buttons">
          <button className="details">Chi tiết</button>
          <button className="delete"> Xóa</button>
        </div>
      </div>
      <p className="t">
        {props.start_address}-{props.end_address}
      </p>
      <p className="t">{props.schedule}</p>
    </div>
  );
}
