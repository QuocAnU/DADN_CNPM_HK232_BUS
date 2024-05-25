import React from 'react';
import MapComponent from './Components/MapComponent';
import List from './Components/List';
import Header from './Components/Header';

class HomePage extends React.Component {
    mapComponentRef = React.createRef();

    updateRoute = (startLocation, endLocation) => {
        if (this.mapComponentRef.current) {
            this.mapComponentRef.current.updateRoute(startLocation, endLocation);
        }
    };

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
                    
                    <MapComponent ref={this.mapComponentRef} />
                </div>
            </div>
        );
    }
}

export default HomePage;
