// src/components/MapComponent.js
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapComponent.css";
import logo from "../Image/logo.png";
import ReactMapGL, {
  Marker,
  NavigationControl,
} from "@goongmaps/goong-map-react";
import "@goongmaps/goong-js/dist/goong-js.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const GOONG_MAPTILES_KEY = "QB69WqoIOZFElo7pcWsK69O2cFrbhbu9NQCBL7MP"; // Set your goong maptiles key here

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "1000px",
    latitude: 0,
    longitude: 0,
    zoom: 15,
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
        }));
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      >
        <div style={{ position: "absolute", left: "21%", top: 10 }}>
          <NavigationControl />
        </div>
        {currentLocation && (
          <Marker
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          >
            <div
              style={{
                background: "red",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
              }}
            ></div>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
}
export function Header() {
  return (
    <div className="header">
      <div className="left">
        <img src={logo} alt="logo" className="logo" />
        <h1 id="app-name">BUS LINKER</h1>
      </div>

      <button className="nav">
        <a href="/login">Đăng nhập</a>
      </button>
    </div>
  );
}
export function List() {
  return (
    <div className="list">
      <h3 className="title">Tra cứu</h3>
      <hr />
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input className="search" type="text" placeholder="Search..." />
      </div>
    </div>
  );
}
export default MapComponent;
