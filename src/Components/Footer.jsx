import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { FaPinterestP, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">URBAN <em>Diva</em></div>
          <p>Curated fashion for the modern woman. Elegant, bold, and effortlessly stylish — because you deserve to feel beautiful every day.</p>
          <div className="payment-icons">
            <span className="pay-badge visa">VISA</span>
            <span className="pay-badge mc">MC</span>
            <span className="pay-badge gpay">GPay</span>
            <span className="pay-badge upi">UPI</span>
            <span className="pay-badge">COD</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Contact</Link></li>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Size Guide</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div className="footer-col">
          <h5>Account</h5>
          <ul>
            <ul>
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h5>Newsletter</h5>
          <p className="newsletter-desc">Subscribe for exclusive deals, new arrivals & style tips.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a className="social-btn" href="#"><AiFillFacebook /></a>
            <a className="social-btn" href="#"><FaXTwitter /></a>
            <a className="social-btn" href="#"><AiFillYoutube /></a>
            <a className="social-btn" href="#"><AiFillInstagram /></a>
            <a className="social-btn" href="#"><FaPinterestP /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2025 <span>Urban Diva</span>. All rights reserved.</p>
        <p>Made with <span>♥</span> for fashion lovers</p>
      </div>
    </footer>
  );
}

export default Footer;