// BusStopInfo.js
import React from 'react';
import './BusStopInfo.css';
class BusStopInfo extends React.Component {
    render() {
        const { busStop, onClose } = this.props;
        return (
            <div className="bus-stop-info">
                <h2>{busStop.name}</h2>
                <p>Địa chỉ: {busStop.address}</p>
                <button onClick={onClose}>Đóng</button>
                {/* Thêm nút chuyển trang nếu cần */}
                <button onClick={() => window.location.href = `/bus-stop/${busStop.id}`}>Chi tiết</button>
            </div>
        );
    }
}

export default BusStopInfo;