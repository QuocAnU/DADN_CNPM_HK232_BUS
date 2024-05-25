import React, { useState } from "react";
import "./AddRouteCard.css";

const AddRouteCard = () => {
  const [routeDetails, setRouteDetails] = useState({
    routeNumber: "",
    routeName: "",
    operatingTime: "",
    ticketPrice: "",
    discountedTicketPrice: "",
    passingStations: "",
    routeType: "",
    organization: "",
    startPosition: "",
    endPosition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Route Details:", routeDetails);
  };

  const handleReset = () => {
    setRouteDetails({
      routeNumber: "",
      routeName: "",
      operatingTime: "",
      ticketPrice: "",
      discountedTicketPrice: "",
      passingStations: "",
      routeType: "",
      organization: "",
      startPosition: "",
      endPosition: "",
    });
  };

  return (
    <div className="add-route-container">
      <h2>Thêm tuyến xe</h2>
      <form onSubmit={handleSubmit} className="add-route-form">
        <div className="form-group">
          <label>Tuyến xe:</label>
          <input
            type="text"
            name="routeNumber"
            value={routeDetails.routeNumber}
            onChange={handleChange}
          />
          <label>Giá vé (ưu đãi):</label>
          <input
            type="text"
            name="discountedTicketPrice"
            value={routeDetails.discountedTicketPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tên tuyến:</label>
          <input
            type="text"
            name="routeName"
            value={routeDetails.routeName}
            onChange={handleChange}
          />
          <label>Trạm đi qua:</label>
          <input
            type="text"
            name="passingStations"
            value={routeDetails.passingStations}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Thời gian hoạt động:</label>
          <input
            type="text"
            name="operatingTime"
            value={routeDetails.operatingTime}
            onChange={handleChange}
          />
          <label>Loại tuyến:</label>
          <input
            type="text"
            name="routeType"
            value={routeDetails.routeType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Giá vé:</label>
          <input
            type="text"
            name="ticketPrice"
            value={routeDetails.ticketPrice}
            onChange={handleChange}
          />
          <label>Đơn vị:</label>
          <input
            type="text"
            name="organization"
            value={routeDetails.organization}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Vị trí đầu:</label>
          <input
            type="text"
            name="startPosition"
            value={routeDetails.startPosition}
            onChange={handleChange}
          />
          <label>Vị trí cuối:</label>
          <input
            type="text"
            name="endPosition"
            value={routeDetails.endPosition}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="button" className="reset-button" onClick={handleReset}>
            Đặt lại
          </button>
          <button type="submit" className="submit-button">
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRouteCard;
