import React from "react";
import MapComponent from "../Components/MapComponent";
import List from "../Components/List";
import Header from "../Components/Header";

class HomePage extends React.Component {
  mapComponentRef = React.createRef();

  updateRoute = (startLocation, endLocation) => {
    if (this.mapComponentRef.current) {
      this.mapComponentRef.current.updateRoute(startLocation, endLocation);
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: '#f5f5f5', width: '100%', maxHeight: '100vh', overflow: 'hidden' }}>
        <Header />
        <div style={{ marginTop: '20px', display: 'flex', height: '100vh', maxHeight: '100vw', width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ flex: '0 0 25%' }}>
            <List updateRoute={this.updateRoute} />
          </div>
          <div style={{ flex: 1, overflowY: 'hidden', marginLeft: '10px', border: '1px solid white', borderRadius: '20px' }}>
            <MapComponent ref={this.mapComponentRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
