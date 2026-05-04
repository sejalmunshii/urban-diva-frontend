import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineAppstore, AiOutlineLogout, AiOutlineTeam } from "react-icons/ai";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <AiOutlineDashboard /> },
    { path: "/admin/products", label: "Products", icon: <AiOutlineAppstore /> },
    { path: "/admin/orders", label: "Orders", icon: <AiOutlineShoppingCart /> },
     { path: "/admin/users",    label: "Users",      icon: <AiOutlineTeam /> },
  ];

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-logo">
           <em>Diva</em>
          <span>Admin</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          <AiOutlineLogout />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <h3>Welcome back, Admin! 👋</h3>
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <span>admin@urbandiva.com</span>
          </div>
        </div>
        <div className="admin-content">
          {children}
        </div>
      </div>

    </div>
  );
}

export default AdminLayout;