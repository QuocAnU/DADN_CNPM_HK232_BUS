import React, { Component } from 'react';
import './BusStopComponent.css';
import './BusStopInfo.css';
import BusStopInfo, { BusStopList, BusRouteInfo } from './BusStopInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import fetchDirections, { getRouteDetails } from './utils';
import axios from 'axios';
class BusStopComponent extends Component {
    state = {
        activeTab: 'stops',
        selectedBusStop: null,
    };

    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    }

    handleBusStopClick = (busStop) => {
        this.setState({ selectedBusStop: busStop, activeTab: 'busStop-info' });
    }

    handleCloseBusStopInfo = () => {
        this.setState({ selectedBusStop: null, activeTab: 'stops' });
    }
    handleRouteClick = async (route) => {
        this.setState({ selectedBusStop: null, activeTab: 'stops', selectedRoute: route});
        try {
            const response_route = await axios.get(`http://localhost:3001/bus-routes/${route.route_no}`);
            
            const { startLocation, endLocation, busStops } = await getRouteDetails(response_route.data);
            const routeCoordinates = await fetchDirections(startLocation, endLocation);
            this.setState({
                startLocation,
                endLocation,
                busStopsWithCoords: busStops.map((busStop) => ({
                    ...busStop,
                    location: { lat: busStop.latitude, lng: busStop.longitude }
                })),
                routeCoordinates,
                viewport: {
                    ...this.state.viewport,
                    latitude: startLocation.lat,
                    longitude: startLocation.lng,
                    zoom: 14
                }
            });
        } catch (error) {
            console.error('Error fetching route details:', error);
        }
    };
    render() {
        
        const { activeTab, selectedBusStop } = this.state;
        const { busStops, selectedRoute, onClose } = this.props;
        console.log("Tab clicked: ",activeTab, selectedRoute)
        return (
            <div className="bus-route-container">
                <header className="header_1">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
                    <h2 style={{ marginLeft: "10px" }}>Tuyến xe: {selectedRoute.route_no}</h2>
                </header>
                <div className="tabs">
                    <button className={activeTab === 'stops' ? 'active' : ''} onClick={() => this.handleTabClick('stops')}>Các trạm dừng</button>
                    <button className={activeTab === 'details' ? 'active' : ''} onClick={() => this.handleTabClick('details')}>Thông tin chi tiết</button>
                </div>
                {activeTab === 'stops' && (
                    <BusStopList 
                        busStops={busStops} 
                        onBusStopClick={this.handleBusStopClick} 
                    />
                )}
                {activeTab === 'details' && <BusRouteInfo selectedRoute={selectedRoute} />}
                {activeTab === 'busStop-info' && selectedBusStop && (
                    <BusStopInfo 
                        busStop={selectedBusStop} 
                        onClose={this.handleCloseBusStopInfo} 
                        onRouteClick={
                                this.handleRouteClick
                            
                            } 
                    />
                )}
            </div>
        );
    }
}

export default BusStopComponent;
