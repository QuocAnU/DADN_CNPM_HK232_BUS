import logo from "../Image/logo.png";
import search from "../Image/search.png";
import "./HeaderAd.css";
export default function HeaderAd(props) {
  return (
    <div className="header">
      <div className="left">
        <img src={logo} alt="logo" className="logoH" />
        <h1 id="app-name">BUS LINKER</h1>
      </div>
      <div className="right">
        {props.name}
        <a href="/login">
          <img src={search} alt="search" className="searchH" />
        </a>
      </div>
    </div>
  );
}
