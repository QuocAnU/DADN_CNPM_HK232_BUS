import "./HomePage.css";
import React from "react";
import MapComponent, { Header, List } from "../Components/MapComponent";

export default function HomePage() {
  return (
    <div className="homepage">
      <Header></Header>
      <List></List>
      <MapComponent />
    </div>
  );
}
