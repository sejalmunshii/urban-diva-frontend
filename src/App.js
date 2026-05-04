import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Collections from "./Pages/Collections";
import ProductDetails from "./Pages/ProductDetails";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import OrderHistory from "./Pages/OrderHistory";
import NotFound from "./Pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./Components/Preloader";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminLogin from "./Admin/AdminLogin";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AdminUsers from "./Admin/AdminUsers";

function App() {
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});

const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("user");
  setUser(null);
};
  const [adminToken, setAdminToken] = useState(
  localStorage.getItem("adminToken") || ""
);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");



  const [loading, setLoading] = useState(true);

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 3500); // 1.5 sec
}, []);
  const [orders, setOrders] = useState([]);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  const toggleWishlist = (item) => {
    const exist = wishlist.find((x) => x.id === item._id);

    if (exist) {
      // remove
      setWishlist(wishlist.filter((x) => x.id !== item._id));
    } else {
      // add
      setWishlist([...wishlist, item]);
    }
  };

  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item._id);

    if (exist) {
      const updated = cart.map((x) =>
        x.id === item.id
          ? { ...x, qty: x.qty + item.qty }
          : x
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...item, qty: item.qty }]);
    }
  };
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0); // qty 0 ho to remove
    setCart(updated);
  };
  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
  };
const clearCart = () => {
  setCart([]);
};

const addOrder = (order) => {
  setOrders([...orders, order]);
};
  if (loading) {
    return <Preloader />;
  }

  return (
    <>
     {!isAdmin && <Navbar cart={cart} wishlist={wishlist} user={user} logout={logout} />}
    
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} toggleWishlist={toggleWishlist}
          wishlist={wishlist} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} increaseQty={increaseQty}
          decreaseQty={decreaseQty} />} />
        <Route path="/collections" element={<Collections addToCart={addToCart} toggleWishlist={toggleWishlist}
          wishlist={wishlist} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />} />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} 
          />}
        />

       <Route path="/success/:orderId" element={<OrderSuccess clearCart={clearCart} />} />
<Route 
  path="/checkout" 
  element={
    <Checkout
      cart={cart} 
      addOrder={addOrder} 
    />
  } 
/>
<Route 
  path="/orders" 
  element={<OrderHistory orders={orders} />} 
/>
<Route path="*" element={<NotFound />} />
 <Route path="/admin" element={<AdminLogin setAdminToken={setAdminToken} />} />
<Route path="/admin/dashboard" element={
  adminToken ? <AdminLayout><AdminDashboard /></AdminLayout> : <Navigate to="/admin" />
} />
<Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
<Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
<Route path="/login" element={<Login setUser={setUser} />} />
<Route path="/signup" element={<Signup />} />
<Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      </Routes>

      {!isAdmin && <Footer />}
      <ToastContainer position="top-center" autoClose={2000} theme="light" />

    </>
  );
}

export default App;