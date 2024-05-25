import HeaderAd from "../Components/HeaderAd";
import "./QuanLyTT.css";
import RouteCard from "../Components/RouteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
export default function QuanLyTT(props) {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin-bus-routes/all"
        );
        setRoutes(response.data); // Assuming the response data is an array of routes
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);
  return (
    <div className="QuanLyTT">
      <HeaderAd name="Admin" />
      <div className="bodyQLTT">
        <div className="T1">Quản lý tuyến xe</div>
        <div className="mid">
          <button className="btnTTX"> Thêm tuyến xe</button>
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              className="search"
              type="text"
              placeholder="Nhập tuyến xe cần tìm..."
            />
          </div>
        </div>
        <div className="cards">
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              route_no={route.route_no}
              start_address={route.start_address}
              end_address={route.end_address}
              schedule={route.schedule}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
