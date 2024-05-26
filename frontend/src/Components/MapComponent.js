// src/components/MapComponent.js
import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapComponent.css";
import logo from "../Image/logo.png";
import ReactMapGL, {
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "@goongmaps/goong-map-react";
import "@goongmaps/goong-js/dist/goong-js.css";
import axios from "axios";
import locationImage from "../Image/location.png";
import AddressSearch from "./AddressSearch";
// URL của endpoint geocode

const GOONG_MAPTILES_KEY = "zmriqrF5QScgd1LQ4yIxJ4itVMjQBsqFMxpkSeVG"; // Set your goong maptiles key here
const GOONG_API_KEY = "IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c";
// Fix default marker icon issue
// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
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

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
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
    console.error("No routes found");
    return [];
  }
};

const fetchDirections = async (startAddress, endAddress) => {
  const url = `https://rsapi.goong.io/Direction?origin=${startAddress.lat},${startAddress.lng}&destination=${endAddress.lat},${endAddress.lng}&vehicle=car&api_key=${GOONG_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      return processResponse(data);
    } else {
      console.error("No routes found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
    return [];
  }
};

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      suggestions: [],
      location: null,
      addrSearching: false,
      routeCoordinates: [],
      viewport: {
        width: "100%",
        height: "1000px",
        latitude: 0,
        longitude: 0,
        zoom: 3,
      },
      currentLocation: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
          currentLocation: { latitude, longitude },
          viewport: {
            ...this.state.viewport,
            latitude,
            longitude,
            zoom: 14,
          },
        });
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }

  handleSuggestionSelect = async (suggestion) => {
    const location = await this.getPlaceDetails(suggestion.place_id);
    if (location && this.state.currentLocation) {
      const routeCoords = await fetchDirections(
        {
          lat: this.state.currentLocation.latitude,
          lng: this.state.currentLocation.longitude,
        },
        location
      );
      this.setState({ routeCoordinates: routeCoords });
    }
  };

  getPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${placeId}`
      );
      const location = response.data.result.geometry.location;
      if (location) {
        this.setState({
          location: { lat: location.lat, lng: location.lng },
          viewport: {
            ...this.state.viewport,
            latitude: location.lat,
            longitude: location.lng,
            zoom: 14,
          },
        });
      }
      return location;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chi tiết địa điểm:", error);
      return null;
    }
  };

  updateRoute = async (startLocation, endLocation) => {
    const routeCoords = await fetchDirections(startLocation, endLocation);
    if (routeCoords) {
      this.setState({
        routeCoordinates: routeCoords,
        viewport: {
          ...this.state.viewport,
          latitude: startLocation.lat,
          longitude: startLocation.lng,
          zoom: 14,
        },
      });
    }
  };

  render() {
    const routeLayer = {
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#000000",
        "line-width": 5,
      },
    };

    return (
      <div style={{ position: "relative", width: "100%" }}>
        <AddressSearch onSuggestionSelect={this.handleSuggestionSelect} />
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(nextViewport) =>
            this.setState({ viewport: nextViewport })
          }
          goongApiAccessToken={GOONG_MAPTILES_KEY}
        >
          <div style={{ position: "absolute", left: "21%", top: "5%" }}>
            <NavigationControl />
          </div>
          {this.state.currentLocation && (
            <Marker
              latitude={this.state.currentLocation.latitude}
              longitude={this.state.currentLocation.longitude}
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
          {this.state.location && (
            <Marker
              latitude={this.state.location.lat}
              longitude={this.state.location.lng}
            >
              <img
                src={locationImage}
                alt="location"
                style={{ height: "25px", width: "30px" }}
              />
            </Marker>
          )}
          {this.state.routeCoordinates.length > 0 && (
            <Source
              id="route"
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: this.state.routeCoordinates,
                },
              }}
            >
              <Layer {...routeLayer} />
            </Source>
          )}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapComponent;
export class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <h1 id="app-name">BUS LINKER</h1>
        </div>
        <button className="nav">
          <a href="#home">Đăng nhập</a>
        </button>
      </div>
    );
  }
}
