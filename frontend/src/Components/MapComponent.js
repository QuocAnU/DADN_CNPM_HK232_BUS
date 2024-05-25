// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
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
import MapWithDirections from "./Test"
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
const MapComponent = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [location, setLocation] = useState(null);
    const [addrSearching, setAddrSearching] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '1000px',
        latitude: 0,
        longitude: 0,
        zoom: 3
    });
    const [currentLocation, setCurrentLocation] = useState(null);

    const handleInputChange = async (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        if (inputValue) {
            setAddrSearching(true);
            try {
                const response = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&input=${inputValue}`);
                if (response.data.predictions) setSuggestions(response.data.predictions);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setAddrSearching(false);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                setViewport((prevState) => ({
                    ...prevState,
                    latitude,
                    longitude,
                    zoom: 14
                }));
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    const handleSuggestionClick = async (suggestion) => {
        setQuery(suggestion.description);
        const location = await getPlaceDetails(suggestion.place_id);
        if (location && currentLocation) {
            const routeCoords = await fetchDirections(
                { lat: currentLocation.latitude, lng: currentLocation.longitude },
                location
            );
            console.log("routeCoords: ", routeCoords);
            setRouteCoordinates(routeCoords);
        }
    };

    const getPlaceDetails = async (placeId) => {
        try {
            const response = await axios.get(`https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${placeId}`);
            const location = response.data.result.geometry.location;
            if (location) {
                setLocation({ lat: location.lat, lng: location.lng });
                setViewport((prevState) => ({
                    ...prevState,
                    latitude: location.lat,
                    longitude: location.lng,
                    zoom: 14
                }));
            }
            return location;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết địa điểm:', error);
            return null;
        }
    };

   

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
            <div className="search-address">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    type="text"
                    placeholder="Tìm địa chỉ ..."
                    className="address"
                    value={query}
                    onChange={handleInputChange}
                />
                <div>
                    {addrSearching && suggestions.map((suggestion) => (
                        <div key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.description}
                        </div>
                    ))}
                </div>
            </div>

            <ReactMapGL
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                goongApiAccessToken={GOONG_MAPTILES_KEY}
            >
                <div style={{ position: 'absolute', left: '21%', top: '5%' }}>
                    <NavigationControl />
                </div>
                {currentLocation && (
                    <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
                        <div style={{ background: 'red', borderRadius: '50%', width: '10px', height: '10px' }}></div>
                    </Marker>
                )}
                {location && (
                    <Marker latitude={location.lat} longitude={location.lng}>
                        <img src={locationImage} alt="location" style={{ height: '25px', width: '30px' }} />
                    </Marker>
                )}
                {routeCoordinates.length > 0 && (
                    <Source id="route" type="geojson" data={{
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: routeCoordinates
                        }
                    }}>
                        <Layer {...routeLayer} />
                    </Source>
                )}
            </ReactMapGL>
        </div>
    );
};

export default MapComponent;
export function Header() {
    return (
        <div className="header">
            <div className="left">
                <img src={logo} alt="logo" className='logo'/>
                <h1 id = "app-name">BUS LINKER</h1>
            </div>
            <button className="nav">
                
                <a href="#home">Đăng nhập</a>
                    
                
            </button>
            
        </div>
    );
}


export function List() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    useEffect(() => {
        // Gọi API để lấy dữ liệu từ backend
        axios.get('http://localhost:3001/bus-routes/all')
            .then(function (response) {
                // Cập nhật dữ liệu vào state
                setData(response.data);
                setResults(response.data); // Khởi tạo kết quả tìm kiếm với tất cả dữ liệu
                console.log("Data: ", response.data);
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        // Logic để tìm kiếm và cập nhật kết quả
        const filteredData = data.filter(item =>
            item.route_no.toString().includes(searchTerm)
        );
        setResults(filteredData);
        
    }, [searchTerm, data]); // searchTerm và data là phụ thuộc của useEffect
    const [start_address, setStartAddress] = useState('');
    const [end_address, setEndAddress] = useState(null);
    const [error, setError] = useState(null);
    
    async function getItemClicked(item){
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
                setEndAddress(location);
                console.log("location: ", location)
                setError(null);
            } else {
                setError('Geocoding failed: No results found');
                console.log(error);
                setEndAddress(null);
            }
    
            if (data1.results && data1.results.length > 0) {
                const location1 = data1.results[0].geometry.location;
                setStartAddress(location1);
                console.log("location1: ", location1);
                setError(null);
            } else {
                setError('Geocoding failed: No results found');
                console.log(error);
                setStartAddress(null);
            }
            
            console.log("start:", start_address, "end:",  end_address);
            if (start_address && end_address) {
                const routeCoords = await fetchDirections(
                    start_address, end_address
                );
                if (routeCoords) setRouteCoordinates(routeCoords);
            }
            
        } catch (error) {
            setError('Error: ' + error.message);
            console.log(error);
            setEndAddress(null);
        }
    
        
        // const handleSuggestionClick = async (suggestion) => {
        //     setQuery(suggestion.description);
        //     const location = await getPlaceDetails(suggestion.place_id);
        //     if (location && currentLocation) {
        //         const routeCoords = await fetchDirections(
        //             { lat: currentLocation.latitude, lng: currentLocation.longitude },
        //             location
        //         );
        //         console.log("routeCoords: ", routeCoords);
        //         setRouteCoordinates(routeCoords);
        //     }
        // };
    }
    useEffect(() => {
        console.log("start:", start_address, "end:",  end_address);
    }, [start_address, end_address]);
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
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
            </div>
            <div className="list-item">
                {
                    results.length ? results.map(item => {
                        return (
                            <div key={item.id}>
                                <div className="item" onClick={() => getItemClicked(item)}>
                                    <p>Tuyến xe buýt số {item.route_no || "NULL"}</p>
                                    <p>{item.schedule || "NULL"}</p>
                                    <p style={{ display: 'inline-block', width: 'fit-content', marginLeft: '5%' }}>{item.operation_time}</p>
                                    <p style={{ display: 'inline-block', width: 'fit-content', marginLeft: '20%' }}>{item.ticket}</p>
                                </div>
                            </div>
                        );
                    })
                        :
                        <p>Không tồn tại tuyến xe</p>
                }
            </div>
        </div>
    );
}