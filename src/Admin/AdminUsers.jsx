import { useEffect, useState } from "react";
import API from "../api";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="au-wrapper">

      {/* Header */}
      <div className="au-header">
        <div>
          <h2>Users</h2>
          <p>{users.length} registered users</p>
        </div>
        <div className="au-search">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="au-stats">
        <div className="au-stat">
          <h4>{users.length}</h4>
          <p>Total Users</p>
        </div>
        <div className="au-stat">
          <h4>{users.filter((u) => u.isVerified).length}</h4>
          <p>Verified</p>
        </div>
        <div className="au-stat">
          <h4>{users.filter((u) => !u.isVerified).length}</h4>
          <p>Unverified</p>
        </div>
        <div className="au-stat">
          <h4>{users.filter((u) => {
            const date = new Date(u.createdAt);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          }).length}</h4>
          <p>This Month</p>
        </div>
      </div>

      {/* Table */}
      <div className="au-table-wrap">
        <table className="au-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="au-no-data">No users found!</td>
              </tr>
            ) : (
              filtered.map((user, i) => (
                <tr key={user._id}>
                  <td className="au-index">{i + 1}</td>
                  <td>
                    <div className="au-user-info">
                      <div className="au-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="au-email">{user.email}</td>
                  <td>
                    <span className={`au-status ${user.isVerified ? "verified" : "unverified"}`}>
                      {user.isVerified ? "✓ Verified" : "✗ Unverified"}
                    </span>
                  </td>
                  <td className="au-date">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminUsers;