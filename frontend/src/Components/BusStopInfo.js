import React, { Component } from 'react';
import './BusStopInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class BusStopInfo extends Component {
    render() {
        const { busStop, onClose, onRouteClick } = this.props;

       

        return (
            <div className="bus-stop-info">
                <header className="header_1">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
                    <h2 style={{ marginLeft: "10px" }}>{busStop.name}</h2>
                </header>
                <div className="">
                    <p>Tuyến xe đi qua: {busStop.route_no || "NULL"}</p>
                    <button onClick={() => onRouteClick(busStop)}>Hiển thị tuyến</button> {/* Ensure this button uses onRouteClick */}
                </div>
            </div>
        );
    }
}



class BusStopList extends Component {
    render() {
        const { busStops, onBusStopClick } = this.props;

        return (
            <div className="stop-list-overlay">
                <div className="stop-list">
                    <h3>Các trạm dừng:</h3>
                    <ul>
                        {busStops.length ? busStops.map(stop => (
                            <li key={stop.id}>
                                <span>{stop.name}</span>
                                <button 
                                    onClick={() => onBusStopClick(stop)}
                                    className="detail-button">
                                    Chi tiết
                                </button>
                            </li>
                        )) : <p>Không có trạm dừng nào</p>}
                    </ul>
                </div>
            </div>
        );
    }
}
function reverseStations(stations) {
    // Tách chuỗi đầu vào thành một mảng các ga
    let stationArray = stations.split('-');

    // Đảo ngược mảng các ga
    let reversedArray = stationArray.reverse();

    // Nối lại mảng đã đảo ngược thành chuỗi
    let reversedStations = reversedArray.join('-');

    return reversedStations;
}
class BusRouteInfo extends Component {
    render(){
        const { selectedRoute } = this.props;
        var schedule = reverseStations(selectedRoute.schedule);

        // console.log(selectedRoute);
        return (
            <div className='route-info'>
                <p>Chi tiết tuyến xe</p>
                <p>Tên tuyến xe: {selectedRoute.route_no}</p>
                <p>Tuyến đường: {selectedRoute.name}</p>
                <p>Thời gian hoạt động: {selectedRoute.operation_time}</p>
                <p>Lượt đi: {selectedRoute.schedule}</p>
                <p>Lượt về: {schedule}</p>
                <p>Loại tuyến: {selectedRoute.route_type}</p>
                <p>Đơn vị: {selectedRoute.organization}</p>
            </div>

        )
    }
}
export { BusRouteInfo }
export { BusStopList };
export default BusStopInfo;
