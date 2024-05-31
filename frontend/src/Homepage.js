import React from 'react';
import MapComponent from './Components/MapComponent';
import Header from './Components/Header';
import List from './Components/List';
import "./Components/MapComponent.css";
class HomePage extends React.Component {
    mapComponentRef = React.createRef();
    // update route
    updateRoute = (startLocation, endLocation) => {
        if (this.mapComponentRef.current) {
            this.mapComponentRef.current.updateRoute(startLocation, endLocation);
        }
    };
    // update busStops
    updateBusStops = (busStops) => {
        if (this.mapComponentRef.current) {
            // console.log(busStops);
            this.mapComponentRef.current.setState({ busStops });
        }
    };
    render() {
        return (
            <div className="HomePage">
                <Header />
                <div className="main-content">
                    <List updateRoute={this.updateRoute} />
                    <MapComponent ref={this.mapComponentRef} />
                </div>
            </div>
        );
    }
}

export default HomePage;
