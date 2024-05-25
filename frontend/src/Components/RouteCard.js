import React, { useState } from "react";
import "./RouteCard.css";
import DetailCard from "./DetailCard";

export default function RouteCard(props) {
  const [showDetail, setShowDetail] = useState(false); // State to control DetailCard visibility

  // Function to handle click event of "Chi tiết" button
  const handleDetailClick = () => {
    setShowDetail(true);
  };

  // Function to close the DetailCard popup
  const handleClosePopup = () => {
    setShowDetail(false);
  };

  return (
    <div className="route-card">
      <div className="headCard">
        <h3 className="T">Tuyến xe số {props.route_no} </h3>
        <div className="buttons">
          <button className="details" onClick={handleDetailClick}>
            Chi tiết
          </button>
          <button className="delete">Xóa</button>
        </div>
      </div>
      <p className="t">
        {props.start_address}-{props.end_address}
      </p>
      <p className="t">{props.schedule}</p>

      {/* Conditionally render DetailCard as a popup */}
      {showDetail && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <DetailCard details={props} />
          </div>
        </div>
      )}
    </div>
  );
}
