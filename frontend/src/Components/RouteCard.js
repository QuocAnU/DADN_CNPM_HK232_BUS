import React, { useState } from "react";
import "./RouteCard.css";
import DetailCard from "./DetailCard";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function RouteCard(props) {
  const [showDetail, setShowDetail] = useState(false); // State to control DetailCard visibility
  const [showDelete, setShowDelete] = useState(false);

  // Function to handle click event of "Chi tiết" button
  const handleDetailClick = () => {
    setShowDetail(true);
  };

  const handleDeleteClick = () => {
    setShowDelete(true);
  };

  const handleConfirm = async () => {
    try {
      await api.delete(`/admin-bus-routes/${props.route_no}`);
      setShowDelete(false);
      // Update the parent component's state to remove the deleted route
      props.onDelete(props.route_no);
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  // Function to close the DetailCard popup
  const handleClosePopup = () => {
    setShowDetail(false);
    setShowDelete(false);
  };

  return (
    <div className="route-card">
      <div className="headCard">
        <h3 className="T">Tuyến xe số {props.route_no}</h3>
        <div className="buttons">
          <button className="details" onClick={handleDetailClick}>
            Chi tiết
          </button>
          <button className="delete" onClick={handleDeleteClick}>
            Xóa
          </button>
        </div>
      </div>
      <p className="t">
        {props.start_address}-{props.end_address}
      </p>
      <p className="t">{props.operation_time}</p>

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
      {showDelete && (
        <div className="delete-confirm-container">
          <p>Xóa tuyến xe {props.route_no}?</p>
          <div className="delete-confirm-buttons">
            <button className="cancel-button" onClick={handleClosePopup}>
              KHÔNG
            </button>
            <button className="confirm-button" onClick={handleConfirm}>
              ĐỒNG Ý
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
