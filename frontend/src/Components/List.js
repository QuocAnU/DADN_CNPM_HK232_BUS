import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './MapComponent.css';

const GOONG_API_KEY = 'IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            results: [],
            data: [],
            startLocation: null,
            endLocation: null,
            error: null,
            showOverlay: false
        };
        this.getItemClicked = this.getItemClicked.bind(this);
        this.closeStopsList = this.closeStopsList.bind(this);
    }
    closeStopsList() {
        this.setState({ showOverlay: false });
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
        if (prevState.startLocation !== this.state.startLocation || prevState.endLocation !== this.state.endLocation) {
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
        if (this.state.startLocation && this.state.endLocation) {
            this.props.updateRoute(this.state.startLocation, this.state.endLocation);
        }
    };

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    getItemClicked = async (item) => {
        const url = `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(item.end_address)}&api_key=${GOONG_API_KEY}`;
        const url1 = `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(item.start_address)}&api_key=${GOONG_API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const response1 = await fetch(url1);
            const data1 = await response1.json();
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                this.setState({ endLocation: location });
            } else {
                this.setState({ error: 'Geocoding failed: No results found', endLocation: null });
            }

            if (data1.results && data1.results.length > 0) {
                const location1 = data1.results[0].geometry.location;
                this.setState({ startLocation: location1 });
            } else {
                this.setState({ error: 'Geocoding failed: No results found', startLocation: null });
            }
             // Fetch bus stops for the selected route

             const busStopsResponse = await axios.get(`http://localhost:3001/bus-stop/all`);
             var filteredBusStops; 
             console.log(item.route_no);
             if (item.route_no){
                 filteredBusStops = busStopsResponse.data.filter(item1 => item1.route_no === item.route_no);
            }
            else {
                filteredBusStops = busStopsResponse.data;
            }
            this.setState({ selectedRouteStops: filteredBusStops, showOverlay: true  });
            console.log("Filtered bus stops: ", filteredBusStops);
            // Thêm trường busStops vào state
            this.setState({ busStops: filteredBusStops }); // array of bus stops
            this.props.updateBusStops(filteredBusStops); // Pass bus stops to MapComponent
        } catch (error) {
            this.setState({ error: 'Error: ' + error.message, endLocation: null });
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
                {/* Hiển thị danh sách trạm dừng nếu có tuyến xe buýt được chọn */}
                {this.state.showOverlay && this.state.selectedRouteStops && (
                    <div className="stop-list-overlay">
                        <div className="stop-list">
                            <button className="close-button" onClick={this.closeStopsList}>Đóng</button>
                            <h3>Các trạm dừng:</h3>
                            <ul>
                                {this.state.selectedRouteStops.map(stop => (
                                    <li key={stop.id}>{stop.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default List;