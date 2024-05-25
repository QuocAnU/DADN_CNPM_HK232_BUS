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
const GOONG_MAPTILES_KEY = 'zmriqrF5QScgd1LQ4yIxJ4itVMjQBsqFMxpkSeVG';
const GOONG_API_KEY ='IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';

const decodePolyline = (encoded) => {
    let index = 0;
    const len = encoded.length;
    const polyline = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
        let b;
        let shift = 0;
        let result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        const latlng = [lng / 1e5, lat / 1e5];
        polyline.push(latlng);
    }

    return polyline;
};

const processResponse = (data) => {
    if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const legs = route.legs;
        const routeCoordinates = [];

        legs.forEach((leg) => {
            
            const steps = leg.steps;
            steps.forEach((step) => {
                // console.log(step);
                const polyline = step.polyline;
                const decodedPolyline = decodePolyline(polyline.points);
                routeCoordinates.push(...decodedPolyline);
            });
        });
        return routeCoordinates;
    } else {
        console.error('No routes found');
        return [];
    }
};

const fetchDirections = async (startAddress, endAddress) => {
    const url = `https://rsapi.goong.io/Direction?origin=${startAddress.lat},${startAddress.lng}&destination=${endAddress.lat},${endAddress.lng}&vehicle=car&api_key=${GOONG_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Các tọa độ giữa đầu cuối tuyến xe", data);
        
        if (data.routes && data.routes.length > 0) {
            return processResponse(data);
        } else {
            console.error('No routes found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching directions:', error);
        return [];
    }
};

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
                height: '1000px',
                latitude: 0,
                longitude: 0,
                zoom: 3
            },
            currentLocation: null,
            busStopsWithCoords: [] // State to store bus stops with coordinates
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

        // Log to verify busStopsWithCoords changes
        if (prevState.busStopsWithCoords !== this.state.busStopsWithCoords) {
            console.log('Bus stops updated:', this.state.busStopsWithCoords);
        }
    }

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

    mapRef = React.createRef();

    render() {
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
                    {...this.state.viewport}
                    onViewportChange={(nextViewport) => this.setState({ viewport: nextViewport })}
                    goongApiAccessToken={GOONG_MAPTILES_KEY}
                >
                    <div style={{ position: 'absolute', left: '21%', top: '5%' }}>
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
                            coordinates: this.state.routeCoordinates,
                        }
                    }}>
                        <Layer {...routeLayer} />
                    </Source>
                    {
                        this.state.busStopsWithCoords.map(busStop => (
                            busStop.location && busStop.location.lat && busStop.location.lng && (
                                <Marker key={busStop._id} latitude={busStop.location.lat} longitude={busStop.location.lng}>
                                    <img src={bus} alt="bus stop" style={{ height: '20px', width: '20px' }} />
                                </Marker>
                            )
                        ))
                    }
                </ReactMapGL>
            </div>
        );
    }
}

export default MapComponent;