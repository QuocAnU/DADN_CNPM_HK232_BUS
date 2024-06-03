import React, { Component } from 'react';
import './BusStopComponent.css';
import BusStopInfo, { BusStopList, BusRouteInfo } from './BusStopInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import fetchDirections, { getRouteDetails } from './utils';
import axios from 'axios';

class BusStopComponent extends Component {
    state = {
        activeTab: 'stops',
        selectedBusStop: null,
        busRoutes: [],
        page: 1,
        perPage: 10,
        busData: null,
    };
    fetchBusLocations = async () => {
        try {
            const response = await axios.get('http://localhost:3001/adafruit/feed');
            // console.log(response.data);
            this.setState({ busData: response.data });
        } catch (error) {
            console.error('Error fetching bus locations:', error);
        }
    };
    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    }

    handleBusStopClick = async (busStop) => {
        this.setState({ selectedBusStop: busStop, activeTab: 'busStop-info' });
        try {
            // console.log(busStop.name)
            const response_busRoutes = await axios.get(`http://localhost:3001/bus-stop/bus-route/${busStop.name}`);

            const busRoutes = response_busRoutes.data;
            // console.log("busRoutes: ", busRoutes.map(route => route.route_no));
            const busStopWithRoutes = { ...busStop, routes: busRoutes.map(route => route.route_no) };
            this.setState({ selectedBusStop: busStopWithRoutes });
            this.setState({ busRoutes: busRoutes });
        } catch (error) {
            console.error('Error fetching bus routes:', error);
        }
    }

    handleCloseBusStopInfo = () => {
        this.setState({ selectedBusStop: null, activeTab: 'stops' });
    }
    handleRouteClick = async (route) => {
        // Sử dụng lại hàm getItemClicked để lấy thông tin chi tiết tuyến
        // get bus stop by name
        const response_busStops = await axios.get(`http://localhost:3001/bus-stop/bus-route/${route.name}`);
        // get route by route_no
        const route_clicked = response_busStops.data.filter(route_cl => route_cl.route_no === route.route_no);
        const response_route = await axios.get(`http://localhost:3001/bus-routes/${route_clicked[0].route_no}`);
        await this.props.onRouteClick(response_route);
        this.handleCloseBusStopInfo();
    };
    // handleRouteClick = async (route) => {
    //     this.setState({ selectedBusStop: null, activeTab: 'stops', selectedRoute: route });
    //     try {
    //         console.log("route clicked", route.route_no);
    //         const response_busStops = await axios.get(`http://localhost:3001/bus-stop/bus-route/${route.name}`);

    //         const route_clicked = response_busStops.data.filter(route_cl => route_cl.route_no === route.route_no);
    //         console.log("response route: ", route_clicked[0].route_no);
    //         const response_route = await axios.get(`http://localhost:3001/bus-routes/${route_clicked[0].route_no}`);

    //         const routesDetails = await getRouteDetails(response_route.data);
    //         console.log("response route detail: ",response_route)
    //         const { startLocation, endLocation, busStops } = routesDetails;  // assuming all routes have same start/end locations and bus stops
    //         console.log(busStops);

    //         const routeCoordinates = await fetchDirections(startLocation, endLocation);
    //         this.setState({
    //             startLocation,
    //             endLocation,
    //             busStopsWithCoords: busStops.map((busStop) => ({
    //                 ...busStop,
    //                 location: { lat: busStop.latitude, lng: busStop.longitude }
    //             })),
    //             routeCoordinates,
    //             viewport: {
    //                 ...this.state.viewport,
    //                 latitude: startLocation.lat,
    //                 longitude: startLocation.lng,
    //                 zoom: 14
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error fetching route details:', error);
    //     }
    // };
    render() {
        const { activeTab, selectedBusStop, page, perPage } = this.state;
        const { busStops, selectedRoute, onClose, handleRouteSelect, fetchBusData, stopFetchBusLocations } = this.props;
        const indexOfLastBusStop = page * perPage;
        const indexOfFirstBusStop = indexOfLastBusStop - perPage;
        const currentBusStops = busStops.slice(indexOfFirstBusStop, indexOfLastBusStop);

        const totalPages = Math.ceil(busStops.length / perPage);

        return (
            <div className="bus-route-container">
                <header className="header_1">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={onClose} />
                    <h2 style={{ marginLeft: "10px" }}>Tuyến xe: {selectedRoute.route_no}</h2>
                </header>
                <div className="tabs">
                    <button className={activeTab === 'stops button-i' ? 'active button-i' : 'button-i'} onClick={() => this.handleTabClick('stops')}>Các trạm dừng</button>
                    <button className={activeTab === 'details button-i' ? 'active button-i' : 'button-i'} onClick={() => this.handleTabClick('details')}>Thông tin chi tiết</button>
                </div>
                {activeTab === 'stops' && (
                    <BusStopList
                        busStops={currentBusStops}
                        onBusStopClick={this.handleBusStopClick}
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={(newPage) => this.setState({ page: newPage })}
                    />
                )}
                {activeTab === 'details' && <BusRouteInfo selectedRoute={selectedRoute} />}
                {activeTab === 'busStop-info' && (selectedBusStop ? (
                    <BusStopInfo

                        busStop={selectedBusStop}
                        onClose={
                            () => {
                                this.handleCloseBusStopInfo()
                                this.setState({ busData: null })
                                stopFetchBusLocations();
                            }
                        }
                        onRouteClick={handleRouteSelect}
                        busRoutes={this.state.busRoutes}
                        fetchBusData={fetchBusData}

                    />
                ) : null)
                }
            </div>
        );
    }
}

export default BusStopComponent;
