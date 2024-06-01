// List.js
import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './MapComponent.css';
import BusStopComponent from './BusStopComponent';
import { getRouteDetails } from './utils'; // Import the common function

// const GOONG_API_KEY = 'IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';

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
            showOverlay: false,
            selectedRouteStops: null,
            selectedItem: null,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/bus-routes/all')
            .then((response) => {
                this.setState({
                    data: response.data,
                    results: response.data // Initialize search results with all data
                });
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

    getItemClicked = async (route) => {
        // Sử dụng lại logic từ hàm cũ
        if (route) {
            const { startLocation, endLocation, busStops } = await getRouteDetails(route);
            this.setState({
                startLocation,
                endLocation,
                selectedRouteStops: busStops,
                selectedItem: route,
                showOverlay: true
            });
            this.props.updateRoute(startLocation, endLocation);
            this.props.updateBusStops(busStops);
        } 
        else {
            this.setState({
                startLocation: null,
                endLocation: null,
                selectedRouteStops: null,
                selectedItem: null,
                showOverlay: false
            });
        }
    };

    render() {
        const { showOverlay, selectedRouteStops, selectedItem, results, searchTerm } = this.state;
        const {handleRouteSelect, fetchBusData, onClose, backToList} = this.props;
        
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
                        value={searchTerm}
                        onChange={this.handleSearchChange}
                    />
                </div>
                <div className="list-item">
                    {results.length ? results.map(item => (
                        <div key={item.id}>
                            <div className="item" onClick={() => this.getItemClicked(item)}>
                                <p>Tuyến xe buýt số {item.route_no || "NULL"}</p>
                                <p>{item.schedule || "NULL"}</p>
                                <p style={{ display: 'inline-block', width: 'fit-content', marginLeft: '5%' }}>{item.operation_time}</p>
                                <p style={{ display: 'inline-block', width: 'fit-content', marginLeft: '20%' }}>{item.ticket}</p>
                            </div>
                        </div>
                    )) : <p>Không tồn tại tuyến xe</p>}
                </div>
                {showOverlay && (
                    <BusStopComponent 
                        busStops={selectedRouteStops}
                        selectedRoute={selectedItem}
                        onClose={() => {
                        this.setState({ busData: null })
                        backToList();
                        handleRouteSelect(null)

                        }}
                        handleRouteSelect = {handleRouteSelect}
                        fetchBusData = {fetchBusData}
                        
                    />
                )}
            </div>
        );
    }
}

export default List;
