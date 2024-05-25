import React, {  Component  } from 'react';
import 'leaflet/dist/leaflet.css';
import "./MapComponent.css";
import logo from "../Image/logo.png"

import '@goongmaps/goong-js/dist/goong-js.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="left">
                    <img src={logo} alt="logo" className='logo'/>
                    <h1 id="app-name">BUS LINKER</h1>
                </div>
                <button className="nav">
                    <a href="#home">Đăng nhập</a>
                </button>
            </div>
        );
    }
}