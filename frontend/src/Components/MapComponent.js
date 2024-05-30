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
                height: '680px',
                latitude: 0,
                longitude: 0,
                zoom: 3
            },
            currentLocation: null,
            busStopsWithCoords: [], // State to store bus stops with coordinates
            selectedBusStop: null
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
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
        try {
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
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết địa điểm:', error);
            return null;
        }
    };

    handleSuggestionSelect = async (suggestion) => {
        const location = await this.getPlaceDetails(suggestion.place_id);
        if (location && this.state.currentLocation) {
            const routeCoords = await fetchDirections(
                { lat: this.state.currentLocation.latitude, lng: this.state.currentLocation.longitude },
                location
            );
            this.setState({ routeCoordinates: routeCoords });
        }
    };

    fetchAllBusStops = async () => {
        try {
            const response = await axios.get('http://localhost:3001/bus-stop/all');
            const busStopsWithCoords = response.data.map((busStop) => ({
                ...busStop,
                location: { lat: busStop.latitude, lng: busStop.longitude }
            }));
            this.setState({ busStopsWithCoords });
        } catch (error) {
            console.error('Error fetching bus stops:', error);
        }
    };

    updateBusStops = (busStops) => {
        const busStopsWithCoords = busStops.map((busStop) => ({
            ...busStop,
            location: { lat: busStop.latitude, lng: busStop.longitude }
        }));
        this.setState({ busStopsWithCoords });
    };

    updateRoute = async (startLocation, endLocation) => {
        const routeCoords = await fetchDirections(startLocation, endLocation);
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
    

    handleRouteClick = async (route) => {
        try {
            const { startLocation, endLocation, busStops } = await getRouteDetails(route);
            console.log(startLocation);
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

    mapRef = React.createRef();

    render() {
        const { selectedBusStop , busStopsWithCoords, routeCoordinates, viewport } = this.state;
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
                <List updateRoute={this.updateRoute} updateBusStops={this.updateBusStops} />
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
                    {this.state.location && (
                        <Marker latitude={this.state.location.lat} longitude={this.state.location.lng}>
                            <img src={locationImage} alt="location" style={{ height: '40px', width: '40px' }} />
                        </Marker>
                    )}
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
                    { this.state.viewport.zoom > 12  && this.state.viewport.zoom < 16 &&  busStopsWithCoords.map(busStop => (
                        busStop.location && busStop.location.lat && busStop.location.lng && (
                            <Marker key={busStop._id} latitude={busStop.location.lat} longitude={busStop.location.lng} onClick={() => {
                                this.setState({ selectedBusStop: busStop });
                            }}>
                                <img src={bus} alt="bus stop" style={{ height: '20px', width: '20px' }} />
                            </Marker>
                        )
                    ))}
                    {selectedBusStop && (
                        <BusStopInfo
                            busStop={selectedBusStop}
                            onClose={() => this.setState({ selectedBusStop: null })}
                            onRouteClick={
                                this.handleRouteClick
                            } 
                            // Pass the function here
                        />
                    )}
                </ReactMapGL>
            </div>
        );
    }
}

export default MapComponent;
