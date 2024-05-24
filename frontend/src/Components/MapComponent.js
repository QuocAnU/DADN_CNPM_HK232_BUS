// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./MapComponent.css";
import logo from "../Image/logo.png"
import ReactMapGL, { Marker, NavigationControl } from '@goongmaps/goong-map-react';
import '@goongmaps/goong-js/dist/goong-js.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import locationImage from "../Image/location.png";

// URL của endpoint geocode

const GOONG_MAPTILES_KEY = 'QB69WqoIOZFElo7pcWsK69O2cFrbhbu9NQCBL7MP'; // Set your goong maptiles key here

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default function MapComponent() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [location, setLocation] = useState(null);
    const [addrSearching, setAddrSearching] = useState(false);
    const handleInputChange = async (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        if (inputValue !== null && inputValue !== ''){
            setAddrSearching(true);
            try {
                const response = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?api_key=4oSbzgI2vfvsM6SzLTjj8EFaKN7jObzMsCuGwDjh&input=${inputValue}`)
                
                // Cập nhật kết quả tìm kiếm vào state
                if (response.data.predictions) setSuggestions(response.data.predictions);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
        else {
            setAddrSearching(false);
        }
        
    };
    
    useEffect(() => {
        console.log("addrSearching has changed:", addrSearching);
    }, [addrSearching]);
    // Gọi hàm displayMap khi nhận được tọa độ địa lý từ API
    
    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.description);
        console.log(suggestion.place_id);
        // Perform additional actions, such as fetching place details
        
        
    };
    const getPlaceDetails = async (placeId) => {
        try {
            const response = await axios.get(`https://rsapi.goong.io/Place/Detail?api_key=4oSbzgI2vfvsM6SzLTjj8EFaKN7jObzMsCuGwDjh&place_id=${placeId}`);
            // Xử lý phản hồi từ API
            const location = response.data.result.geometry.location;
            // console.log('Tọa độ địa lý:', location);
                if (location) {
                    // Hiển thị bản đồ và đánh dấu điểm
                    setLocation({ lat: location.lat, lng: location.lng });
                        setViewport((prevState) => ({
                            ...prevState,
                            latitude: location.lat,
                            longitude: location.lng,
                            zoom: 14, // You can adjust the zoom level as needed
                            
                        }));
                    console.log('Tọa độ địa lý:', location.lat, location.lng);
                }
            return location;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết địa điểm:', error);
            return null;
        }
    };
    
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '1000px',
        latitude: 0,
        longitude: 0,
        zoom: 3
    });
    

    const [currentLocation, setCurrentLocation] = useState(null);

  // Lấy vị trí hiện tại của người dùng
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                
                setViewport((prevState) => ({
                ...prevState,
                latitude,
                longitude,
                zoom: 14, // You can adjust the zoom level as needed
                }));
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
            );
        }, []);
    return (
   
            <div style={{ position: 'relative', width: '100%' }} >
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

                        {/* Hiển thị kết quả tìm kiếm */}
                        {
                            
                            addrSearching && suggestions.map((suggestion) => (
                            <div key={suggestion.place_id} onClick={ async () => {
                                handleSuggestionClick(suggestion)
                                getPlaceDetails(suggestion.place_id);
                                
                                
                                
                            }}>
                                {
                                    suggestion.description 
                                }
                            </div>
                            
                        ))}
                    </div>
                </div>
    
                <ReactMapGL
                    {...viewport}
                    
                    onViewportChange={nextViewport => setViewport(nextViewport) }
                    goongApiAccessToken={GOONG_MAPTILES_KEY}
                    >
                    <div style={{ position: 'absolute', left: '21%', top: "5%"}}>
                        <NavigationControl />
                    </div>
                    { currentLocation && (
                        <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude}>
                            <div style={{ background: 'red', borderRadius: '50%', width: '10px', height: '10px' }}></div>
                        </Marker>
                        
                    )
                    }
                    {
                        location && (
                        <Marker latitude={location.lat} longitude={location.lng}>
                            <img src={locationImage} alt="location" style = {{height: "25px", width: "30px"}} />
                        </Marker>
                    )
                    }
                    
                </ReactMapGL>
            </div>
       
    );
};
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
                                <div className="item">
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


