import React, { Component } from 'react';
import './BusStopInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


class BusStopInfo extends Component {
    state = {
        activeTab1: 'route',
        busData: null,
    };
    fetchBusData= async () => {
        try {
            const response = await axios.get('http://localhost:3001/adafruit/feed');
            // console.log("one more time")
            this.setState({busData: response.data});
        } catch (error) {
            console.error('Error fetching bus locations:', error);
            return null;
        }
    };
    handleTabClick = async (tab) => {
        this.setState({ activeTab1: tab });
        if (tab === 'bus') {
            this.props.fetchBusData();
            this.fetchBusData();
            // this function is call every 10 seconds
            this.busLocationInterval = setInterval(this.fetchBusData, 10000);
            // this.busLocationInterval = setInterval(this.fetchBusData, 1000);
        }
    };

    render() {
        const { busStop, onClose, onRouteClick} = this.props;
        const { busData } =this.state;
        // if (busData) console.log(busData, this.state.activeTab1);
        const { activeTab1 } = this.state;
        return (
            <div className="bus-stop-info">
                <header className="header_1">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
                    <h2 style={{ marginLeft: "10px" }}>{busStop.name}</h2>
                </header>
                <div className="tabs">
                    <button className={activeTab1 === 'route' ? 'active' : ''} onClick={() => this.handleTabClick('route')}>Tuyến đi qua</button>
                    <button className={activeTab1 === 'bus' ? 'active' : ''} onClick={() => this.handleTabClick('bus')}>Danh sách xe</button>
                </div>
                <div>
                    {this.state.activeTab1 === "route" ? <p>Routes: {busStop.routes ? busStop.routes.join(', ') : busStop.route_no}</p> : null}
                    {this.state.activeTab1 === "route" ? (busStop.routes && busStop.routes.map(route => (
                        <button key={route} onClick={() => {
                            onClose()
                            onRouteClick(route)}}>
                            Show Route {route}
                        </button>
                    ))) : null}
                    {this.state.activeTab1 === "bus" ? 
                     
                        busData &&
                    <div>
                        <p>Tuyến xe số: {busData.route_no}</p>
                        <p>Biển số: {busData.number_plate}</p>
                        <p>Tọa độ: {busData.latitude}, {busData.longitude}</p>
                        <p>Số người: {busData.people_num}</p>
                        <p>Nhiệt độ: {busData.temperature}</p>
                        <p>Độ ẩm: {busData.humidity}</p>
                    </div>
                    
                    : null
                    }
                </div>
            </div>
        );
    }
}

class BusStopList extends Component {
    render() {
        const { busStops, onBusStopClick, totalPages, currentPage, onPageChange } = this.props;
        // console.log("Function is passed: ",onBusStopClick)
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
                    {/* <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                                onClick={() => onPageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div> */}
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

        // console.log("selectedRoute: ",selectedRoute);
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

export { BusRouteInfo, BusStopList };
export default BusStopInfo;
