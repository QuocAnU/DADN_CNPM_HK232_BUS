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
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxHeight: '100vh', overflow: 'hidden' }}>
        <Header />

        <MapComponent ref={this.mapComponentRef} />
      </div>
    );
  }
}

export default HomePage;
