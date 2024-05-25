import React from "react";
import "./DetailCard.css";
const DetailCard = ({ details }) => {
  return (
    <div className="detail-container">
      <div className="detail-header">Chi tiết</div>
      <div className="detail-content">
        <div className="detail-item">
          <strong>Tuyến số:</strong> {details.route_no}
        </div>
        <div className="detail-item">
          <strong>Tên tuyến:</strong> {details.name}
        </div>
        <div className="detail-item">
          <strong>Thời gian hoạt động:</strong> {details.schedule}
        </div>
        <div className="detail-item">
          <strong>Giá vé:</strong> {details.ticket}
        </div>
        <div className="detail-item">
          <strong>Giá vé (Học sinh/sinh viên):</strong> {details.ticket_student}
        </div>
        <div className="detail-item">
          <strong>Lượt đi:</strong> {details.start_address}
        </div>
        <div className="detail-item">
          <strong>Lượt về:</strong> {details.end_address}
        </div>
        <div className="detail-item">
          <strong>Loại tuyến:</strong> {details.route_type}
        </div>
        <div className="detail-item">
          <strong>Đơn vị:</strong> {details.organization}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
