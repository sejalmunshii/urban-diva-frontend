import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import API from "../api";

function Navbar({ cart, wishlist, user, logout }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Products load nahi hue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") { setResults([]); return; }
    setResults(products.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const handleSelect = (title) => {
    setSearch(title);
    setResults([]);
  };

  return (
    <>
      <div className="announce-bar">
        ✨ Free Shipping on orders above ₹999 &nbsp;|&nbsp; New Collection is Live!
      </div>

      <nav className="navbar-ud">
        <Link to="/" className="nav-logo">
          URBAN <em>Diva</em>
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#new-arrivals">New Arrival</a></li>
          <li><Link to="/collections">Collections</Link></li>
          <li><Link to="/orders">My Orders 🌸</Link></li>
        </ul>

        <div className="nav-icons">

          {/* Search */}
          <div className="nav-search">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search styles..."
              value={search}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setResults([]), 150)}
            />
            {results.length > 0 && (
              <div className="search-dropdown">
                {results.map((item) => (
                  <Link
                    to={`/product/${item._id}`}
                    key={item._id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/collections?search=${item.title}`); // 🔥 yaha
                      setSearch("");
                      setResults([]);
                    }}
                  >
                    <AiOutlineSearch className="search-item-icon" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="cart-wrap">
            <AiOutlineHeart className="icon" />
            {wishlist?.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="cart-wrap">
            <AiOutlineShoppingCart className="icon" />
            {cart?.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </Link>

          {user ? (
    <div className="user-menu">
      <span className="user-name">Hi, {user.name.split(" ")[0]}!</span>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  ) : (
    <Link to="/login">
      <AiOutlineUser className="icon" />
    </Link>
  )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;