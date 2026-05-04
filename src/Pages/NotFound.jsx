import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-wrapper">
      <div className="blob1" />
      <div className="blob2" />

      <div className="notfound-card">

        {/* 404 */}
        <div className="four-wrap">
          <div className="four-text">404</div>
        </div>

        <span className="nf-tag">Page Not Found</span>
        <h2 className="nf-title">
          Oops! You've Wandered<br />Off the <em>Runway</em>
        </h2>
        <p className="nf-sub">
          The page you're looking for seems to have gone out of style.<br />
          Let's get you back to something fabulous.
        </p>

        {/* Quick Links */}
        <div className="suggestions">
          <Link className="suggest-chip" to="/">Home</Link>
          <Link className="suggest-chip" to="/new-arrivals">New Arrivals</Link>
          <Link className="suggest-chip" to="/collections">Collections</Link>
          <Link className="suggest-chip" to="/sale">Sale</Link>
        </div>

        {/* Buttons */}
        <div className="btn-group">
          <Link to="/"><button className="btn-primary-ud">Go Back Home</button></Link>
          <Link to="/collections"><button className="btn-outline-ud">View Collections</button></Link>
        </div>

      </div>
    </div>
  );
}

export default NotFound;