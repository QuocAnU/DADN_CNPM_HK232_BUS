import HeaderAd from "../Components/HeaderAd";
import "./QuanLyTT.css";
import RouteCard from "../Components/RouteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddRouteCard from "../Components/AddRouteCard";
import React, { useState, useEffect } from "react";

export default function QuanLyTT(props) {
  const [routes, setRoutes] = useState([]);
  const [addRoute, setAddRoute] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin-bus-routes/all"
        );
        setRoutes(response.data); // Assuming the response data is an array of routes
        console.log("Data: ", response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);
  const handleAddRouteSuccess = () => {
    setAddRoute(false);
  };
  const handleAdd = () => {
    setAddRoute(true);
  };

  const handleClosePopup = () => {
    setAddRoute(false);
  };
  const handleDeleteRoute = (routeNo) => {
    setRoutes(routes.filter((route) => route.route_no !== routeNo));
  };

  return (
    <div className="QuanLyTT">
      <HeaderAd name="Admin" />
      <div className="bodyQLTT">
        <div className="T1">Quản lý tuyến xe</div>
        <div className="mid">
          <button className="btnTTX" onClick={handleAdd}>
            Thêm tuyến xe
          </button>
          <div className="search-containerTT">
            <FontAwesomeIcon icon={faSearch} className="search-iconTT" />
            <input
              className="searchTT"
              type="text"
              placeholder="Nhập tuyến xe cần tìm..."
            />
          </div>
        </div>
        <div className="cards">
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              _id={route._id}
              route_no={route.route_no}
              start_address={route.start_address}
              end_address={route.end_address}
              schedule={route.schedule}
              ticket={route.ticket}
              ticket_student={route.ticket_student}
              route_type={route.route_type}
              organization={route.organization}
              name={route.name}
              operation_time={route.operation_time}
              onDelete={handleDeleteRoute}
            />
          ))}
        </div>
      </div>
      {addRoute && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <AddRouteCard onSuccess={handleAddRouteSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}
