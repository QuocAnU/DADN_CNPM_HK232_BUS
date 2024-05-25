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