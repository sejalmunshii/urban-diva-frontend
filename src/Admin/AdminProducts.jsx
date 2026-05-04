import { useEffect, useState } from "react";
import API from "../api";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    title: "", desc: "", price: "", category: "", badge: "", stock: "", img: ""
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Handle form change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Open Add form
  const openAdd = () => {
    setEditProduct(null);
    setForm({ title: "", desc: "", price: "", category: "", badge: "", stock: "", img: "" });
    setShowForm(true);
  };

  // Open Edit form
  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      title: product.title,
      desc: product.desc,
      price: product.price,
      category: product.category,
      badge: product.badge || "",
      stock: product.stock,
      img: product.img,
    });
    setShowForm(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, form);
      } else {
        await API.post("/products", form);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="ap-wrapper">

      {/* Header */}
      <div className="ap-header">
        <div>
          <h2>Products</h2>
          <p>{products.length} total products</p>
        </div>
        <button className="ap-add-btn" onClick={openAdd}>+ Add Product</button>
      </div>

      {/* Products Table */}
      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Badge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td><img src={p.img} alt={p.title} className="ap-img" /></td>
                <td className="ap-title">{p.title}</td>
                <td><span className="ap-category">{p.category}</span></td>
                <td>₹ {p.price?.toLocaleString()}</td>
                <td>
                  <span className={`stock-pill ${p.stock < 5 ? "low" : ""}`}>
                    {p.stock}
                  </span>
                </td>
                <td>{p.badge ? <span className="ap-badge">{p.badge}</span> : "—"}</td>
                <td>
                  <div className="ap-actions">
                    <button className="ap-edit-btn" onClick={() => openEdit(p)}>Edit</button>
                    <button className="ap-delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="ap-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="ap-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ap-modal-header">
              <h3>{editProduct ? "Edit Product" : "Add Product"}</h3>
              <button className="ap-close" onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="ap-form">
              <div className="ap-form-row">
                <div className="ap-input-group">
                  <label>Title</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Product title" required />
                </div>
                <div className="ap-input-group">
                  <label>Price (₹)</label>
                  <input name="price" value={form.price} onChange={handleChange} placeholder="e.g. 1299" type="number" required />
                </div>
              </div>

              <div className="ap-input-group">
                <label>Description</label>
                <input name="desc" value={form.desc} onChange={handleChange} placeholder="Short description" />
              </div>

              <div className="ap-form-row">
                <div className="ap-input-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="dress">Dress</option>
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="coords">Co-ords</option>
                    <option value="ethnic">Ethnic</option>
                  </select>
                </div>
                <div className="ap-input-group">
                  <label>Badge</label>
                  <select name="badge" value={form.badge} onChange={handleChange}>
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Sale">Sale</option>
                    <option value="Hot">Hot</option>
                  </select>
                </div>
              </div>

              <div className="ap-form-row">
                <div className="ap-input-group">
                  <label>Stock</label>
                  <input name="stock" value={form.stock} onChange={handleChange} placeholder="e.g. 10" type="number" />
                </div>
                <div className="ap-input-group">
                  <label>Image URL</label>
                  <input name="img" value={form.img} onChange={handleChange} placeholder="https://..." />
                </div>
              </div>

              {form.img && (
                <div className="ap-img-preview">
                  <img src={form.img} alt="preview" />
                </div>
              )}

              <div className="ap-form-btns">
                <button type="button" className="ap-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="ap-submit-btn">
                  {editProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminProducts;