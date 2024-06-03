// MapComponent.js
import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css";
import ReactMapGL, { Marker, NavigationControl, Source, Layer } from '@goongmaps/goong-map-react';
import '@goongmaps/goong-js/dist/goong-js.css';
import axios from 'axios';
import locationImage from "../Image/location.png";
import bus from "../Image/image.png";
import AddressSearch from './AddressSearch';
import List from './List';
import BusStopInfo from './BusStopInfo';
import './BusStopInfo.css';
import fetchDirections, { getRouteDetails } from './utils';

const GOONG_MAPTILES_KEY = 'zmriqrF5QScgd1LQ4yIxJ4itVMjQBsqFMxpkSeVG';
const GOONG_API_KEY = 'IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';



class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            suggestions: [],
            location: null,
            addrSearching: false,
            routeCoordinates: [],
            viewport: {
                width: '100%',
                height: '643px',
                latitude: 0,
                longitude: 0,
                zoom: 3
            },
            currentLocation: null,
            busStopsWithCoords: [], // State to store bus stops with coordinates
            selectedBusStop: null,
            busRoutes: [],
            page: 1,
            perPage: 10,
            busData: null,
        };
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.setState({
                    currentLocation: { latitude, longitude },
                    viewport: {
                        ...this.state.viewport,
                        latitude,
                        longitude,
                        zoom: 14
                    }
                });
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
        this.fetchAllBusStops();
        this.busLocationInterval = setInterval(this.fetchBusLocations, 100000);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
        clearInterval(this.busLocationInterval);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.startLocation !== this.props.startLocation || prevProps.endLocation !== this.props.endLocation) {
            if (this.props.startLocation && this.props.endLocation) {
                this.updateRoute(this.props.startLocation, this.props.endLocation);
            }
        }

        if (prevState.busStopsWithCoords !== this.state.busStopsWithCoords) {
            // console.log('Bus stops updated:', this.state.busStopsWithCoords);
        }
    }

    handleZoomChanged = (mapProps, map) => {
        const zoomLevel = map.getZoom();
        this.setState({ zoomLevel });
    };

    getPlaceDetails = async (placeId) => {
        if (placeId) {
            const response = await axios.get(`https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${placeId}`);
            const location = response.data.result.geometry.location;
            if (location) {
                this.setState({
                    location: { lat: location.lat, lng: location.lng },
                    viewport: {
                        ...this.state.viewport,
                        latitude: location.lat,
                        longitude: location.lng,
                        zoom: 14
                    }
                });
            }
            return location;
        } else {
            // this.setState({
            //     location: null,
            // });
        }
    };

    handleSuggestionSelect = async (suggestion) => {
        if (suggestion) {
            const location = await this.getPlaceDetails(suggestion.place_id);
            if (location && this.state.currentLocation) {
                const routeCoords = await fetchDirections(
                    { lat: this.state.currentLocation.latitude, lng: this.state.currentLocation.longitude },
                    location
                );
                this.setState({ routeCoordinates: routeCoords });
            }
        }
        else {
            this.setState({
                location: null,
            });
            this.setState({ routeCoordinates: [] });
        }
    };

    fetchAllBusStops = async () => {
        try {
            const response = await axios.get('http://localhost:3001/bus-stop/all');
            const busStopsData = response.data;

            // Aggregate bus stops by their names
            const busStopsMap = busStopsData.reduce((map, busStop) => {
                if (!map[busStop.name]) {
                    map[busStop.name] = {
                        ...busStop,
                        routes: []
                    };
                }
                map[busStop.name].routes.push(busStop.route_no);
                return map;
            }, {});
            const busStopsWithCoords = Object.values(busStopsMap).map(busStop => ({
            ...busStop,
            location: { lat: busStop.latitude, lng: busStop.longitude }
        }));
            // console.log("busStopsWithCoords: ",busStopsWithCoords);
            this.setState({ busStopsWithCoords });
        } catch (error) {
            console.error('Error fetching bus stops:', error);
        }
    };

    updateBusStops = (busStops) => {
        // console.log("busStops: ", busStops);
        const busStopsWithCoords = busStops.map((busStop) => ({
            ...busStop,
            location: { lat: busStop.latitude, lng: busStop.longitude }
        }));
        // console.log("busStopsWithCoords: ", busStopsWithCoords)
        this.setState({ busStopsWithCoords });
    };

    updateRoute = async (startLocation, endLocation) => {
        const routeCoords = (startLocation && endLocation) ? await fetchDirections(startLocation, endLocation) : null;
        if (routeCoords) {
            this.setState({
                routeCoordinates: routeCoords,
                viewport: {
                    ...this.state.viewport,
                    latitude: startLocation.lat,
                    longitude: startLocation.lng,
                    zoom: 14
                }
            });
        }
    };
    renderRoute = async (route) => {
        try {
            route = await axios.get(`http://localhost:3001/bus-routes/${route}`)
            // console.log("Route.data: ", route.data);
            const { startLocation, endLocation, busStops } = await getRouteDetails(route.data);
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
    handleBusRouteClick = async (route) => {
        if (route) {
            const { startLocation, endLocation, busStops } = await getRouteDetails(route);
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
        } else {
            // console.error('Error handling bus route click:', error);
        }
    };
    // handleBusStopClick = async (busStop) => {
    //     this.setState({ selectedBusStop: busStop});
    //     try {
    //         const response_busRoutes = await axios.get(`http://localhost:3001/bus-stop/bus-route/${busStop.name}`);            
    //         this.setState({ busRoutes: response_busRoutes.data });
    //         console.log("busRoutes: ", response_busRoutes.data);
    //     } catch (error) {
    //         console.error('Error fetching bus routes:', error);
    //     }
    // }

    handleRouteClick = async (route) => {
        // console.log(route);
        const routeData = await axios.get(`http://localhost:3001/bus-routes/${route}`);
        // console.log(routeData);
        this.listRef.getItemClicked(routeData.data);
    };
    backToList = async () => {
        this.listRef.getItemClicked(null);
        this.setState({ routeCoordinates: [] });
        this.fetchAllBusStops();
    }
    // get bus location
    fetchBusLocations = async () => {
        try {
            const response = await axios.get('http://localhost:3001/adafruit/feed');
            // console.log(response.data);
            this.setState({ busData: response.data });
        } catch (error) {
            console.error('Error fetching bus locations:', error);
        }
    };
    stopFetchBusLocations = async () => {
        this.setState({ busData: null });
    }
    mapRef = React.createRef();
    render() {
         
        const { selectedBusStop , busStopsWithCoords, routeCoordinates, viewport, busData } = this.state;
        // console.log(busData)
        // if (selectedBusStop) {this.handleBusStopClick(selectedBusStop);}
        const routeLayer = {
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#000000',
                'line-width': 5
            }
        }; 
        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <AddressSearch onSuggestionSelect={this.handleSuggestionSelect} />
                <List 
                    items={busStopsWithCoords.map((busStop) => ({
                                    ...busStop,
                                    onClick: () => this.handleBusStopClick(busStop)
                                }))}
                    ref={(ref) => { this.listRef = ref; }} 
                    updateRoute={this.updateRoute} 
                    updateBusStops={this.updateBusStops} 
                    handleRouteSelect={this.handleRouteClick}
                    fetchBusData={this.fetchBusLocations}
                    stopFetchBusLocations = {this.stopFetchBusLocations}
                    backToList={this.backToList}
                    
                />
                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    onViewportChange={(nextViewport) => this.setState({ viewport: nextViewport })}
                    goongApiAccessToken={GOONG_MAPTILES_KEY}
                >
                    <div style={{ position: 'absolute', left: '21%', top: '7%' }}>
                        <NavigationControl />
                    </div>
                    {this.state.currentLocation && (
                        <Marker latitude={this.state.currentLocation.latitude} longitude={this.state.currentLocation.longitude}>
                            <div style={{ background: 'red', borderRadius: '50%', width: '10px', height: '10px' }}></div>
                        </Marker>
                    )}
                    {this.state.location ? (
                        <Marker latitude={this.state.location.lat} longitude={this.state.location.lng}>
                            <img src={locationImage} alt="location" style={{ height: '40px', width: '40px' }} />
                        </Marker>
                        
                    ) : null}
                    <Source id="route" type="geojson" data={{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: routeCoordinates,
                        }
                    }}>
                        <Layer {...routeLayer} />
                    </Source>
                    {   this.state.viewport.zoom > 12 && this.state.viewport.zoom < 17 && 
                    busStopsWithCoords.map(busStop => (
                        busStop.location && busStop.location.lat && busStop.location.lng && (
                            <Marker key={busStop._id} latitude={busStop.location.lat} longitude={busStop.location.lng}  onClick={() => this.handleBusStopClick(busStop)}>
                                <img src={bus} alt="bus stop" style={{ height: '20px', width: '20px' }} />
                            </Marker>
                        )
                    ))}
                    {selectedBusStop ? (
                        <BusStopInfo
                            busStop={selectedBusStop}
                            onClose={() => this.setState({ selectedBusStop: null, busData: null })}
                            onRouteClick={
                                this.handleRouteClick
                            } 
                            busData = {busData}
                            // handleTabClick={this.handleTabClick}
                            busRoutes={this.state.busRoutes}
                            fetchBusData={this.fetchBusLocations}
                            // Pass the function here
                        />
                    ) : null}
                    {busData && 
                        <Marker key={busData.latitude} latitude={busData.latitude} longitude={busData.longitude}>
                            <div style={{ background: 'blue', borderRadius: '50%', width: '10px', height: '10px' }}>
                                <span>{bus['people-num']}</span>
                            </div>
                        </Marker>
                    }
                </ReactMapGL>
            </div>
        );
    }
}

export default MapComponent;
