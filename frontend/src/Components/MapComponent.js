// src/components/MapComponent.js
import React, {  Component  } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./MapComponent.css";
import logo from "../Image/logo.png"
import ReactMapGL, { Marker, NavigationControl, Source, Layer } from '@goongmaps/goong-map-react';
import '@goongmaps/goong-js/dist/goong-js.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import locationImage from "../Image/location.png";
import bus from "../Image/image.png";
import AddressSearch from './AddressSearch';
// URL của endpoint geocode

const GOONG_MAPTILES_KEY = 'zmriqrF5QScgd1LQ4yIxJ4itVMjQBsqFMxpkSeVG'; // Set your goong maptiles key here
const GOONG_API_KEY ='IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';
// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

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
        if (data.routes && data.routes.length > 0) {
            console.log(data.routes);
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
            currentLocation: null
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
    }

    handleSuggestionSelect = async (suggestion) => {
        const location = await this.getPlaceDetails(suggestion.place_id);
        if (location && this.state.currentLocation) {
            const routeCoords = await fetchDirections(
                { lat: this.state.currentLocation.latitude, lng: this.state.currentLocation.longitude },
                location
            );
            console.log("routeCoords: ", routeCoords);
            this.setState({ routeCoordinates: routeCoords });
        }
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
                            <img src={locationImage} alt="location" style={{ height: '25px', width: '30px' }} />
                        </Marker>
                    )}
                    {this.state.routeCoordinates.length > 0 && (
                        <Source id="route" type="geojson" data={{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: this.state.routeCoordinates
                            }
                        }}>
                            <Layer {...routeLayer} />
                        </Source>
                    )}
                </ReactMapGL>
            </div>
        );
    }
}

export default MapComponent;

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="left">
                    <img src={logo} alt="logo" className='logo'/>
                    <h1 id="app-name">BUS LINKER</h1>
                </div>
                <button className="nav">
                    <a href="#home">Đăng nhập</a>
                </button>
            </div>
        );
    }
}

export class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            results: [],
            data: [],
            routeCoordinates: [],
            start_address: '',
            end_address: null,
            error: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/bus-routes/all')
            .then((response) => {
                this.setState({
                    data: response.data,
                    results: response.data // Khởi tạo kết quả tìm kiếm với tất cả dữ liệu
                });
                console.log("Data: ", response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.updateResults();
        }
        if (prevState.start_address !== this.state.start_address || prevState.end_address !== this.state.end_address) {
            this.updateRoute();
        }
    }

    updateResults = () => {
        const filteredData = this.state.data.filter(item =>
            item.route_no.toString().includes(this.state.searchTerm)
        );
        this.setState({ results: filteredData });
    };

    updateRoute = async () => {
        if (this.state.start_address && this.state.end_address) {
            const routeCoords = await fetchDirections(
                this.state.start_address, this.state.end_address
            );
            if (routeCoords) this.setState({ routeCoordinates: routeCoords });
        }
    };

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    getItemClicked = async (item) => {
        console.log("item: ", item.end_address, item.start_address);
        const url = `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(item.end_address)}&api_key=${GOONG_API_KEY}`;
        const url1 = `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(item.start_address)}&api_key=${GOONG_API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const response1 = await fetch(url1);
            const data1 = await response1.json();
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                this.setState({ end_address: location });
                console.log("location: ", location)
            } else {
                this.setState({ error: 'Geocoding failed: No results found', end_address: null });
                console.log(this.state.error);
            }

            if (data1.results && data1.results.length > 0) {
                const location1 = data1.results[0].geometry.location;
                this.setState({ start_address: location1 });
                console.log("location1: ", location1);
            } else {
                this.setState({ error: 'Geocoding failed: No results found', start_address: null });
                console.log(this.state.error);
            }
        } catch (error) {
            this.setState({ error: 'Error: ' + error.message, end_address: null });
            console.log(error);
        }
    };

    render() {
        return (
            <div className="list">
                <h3 className="title">Tra cứu</h3>
                <hr />
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        className="search"
                        type="number"
                        placeholder="Nhập số xe cần tìm"
                        onChange={this.handleSearchChange}
                    />
                </div>
                <div className="list-item">
                    {
                        this.state.results.length ? this.state.results.map(item => (
                            <div key={item.id}>
                                <div className="item" onClick={() => this.getItemClicked(item)}>
                                    <p>Tuyến xe buýt số {item.route_no || "NULL"}</p>
                                    <p>{item.schedule || "NULL"}</p>
                                    <p style={{ display: 'inline-block', width: 'fit-content', marginLeft: '5%' }}>{item.operation_time}</p>
                                    <p style={{ display: 'inline-block', width: 'fit-content', marginLeft: '20%' }}>{item.ticket}</p>
                                </div>
                            </div>
                        ))
                            :
                            <p>Không tồn tại tuyến xe</p>
                    }
                </div>
            </div>
        );
    }
}