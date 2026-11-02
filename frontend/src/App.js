import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Form State (Without description/category)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  // 1. Fetch all products
  const fetchProducts = () => {
    setLoading(true);
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.product_list) {
          setProducts(data.product_list);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: parseFloat(price) || 0,
      quantity: parseInt(stock, 10) || 0,
    };

    if (editingId) {
      // UPDATE Product
      fetch(`/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })
        .then((res) => {
          if (res.ok) {
            resetForm();
            fetchProducts();
          }
        })
        .catch((err) => console.error('Update error:', err));
    } else {
      // ADD Product
      fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      })
        .then((res) => {
          if (res.ok) {
            resetForm();
            fetchProducts();
          }
        })
        .catch((err) => console.error('Add error:', err));
    }
  };

  // 3. Delete Product
  const handleDelete = (id) => {
    if (window.confirm('Do you want to delete this product?')) {
      fetch(`/products/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            fetchProducts();
          }
        })
        .catch((err) => console.error('Delete error:', err));
    }
  };

  // 4. Start Editing Product
  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.product_name || item.name || '');
    setPrice(item.price || '');
    setStock(item.stock_quantity || item.quantity || '');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setStock('');
  };

  // Filter Products based on Search Term
  const filteredProducts = products.filter((item) => {
    const prodName = item.product_name || item.name || '';
    return prodName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="brand">
          <span className="logo-icon">⚡</span>
          <h2>Market Manager</h2>
        </div>
        <div className="nav-actions">
          <button className="sync-btn" onClick={fetchProducts}>
            ↻ Sync Data
          </button>
        </div>
      </header>

      {/* Main Grid Section */}
      <main className="main-grid">
        {/* Left Side: Form Card */}
        <section className="card form-card">
          <div className="card-header">
            <h3>{editingId ? 'Edit Product' : 'Add New Item'}</h3>
            <p>{editingId ? 'Update existing product details' : 'Update inventory records in real-time'}</p>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="e.g. Wireless Mouse"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>In Stock</label>
              <input
                type="number"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="primary-btn">
                {editingId ? '✓ Update Product' : '+ Save Product'}
              </button>
              {editingId && (
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Right Side: Inventory Overview Card */}
        <section className="card stats-card">
          <div className="card-header">
            <h3>Inventory Overview</h3>
            <p>Quick metrics from store database</p>
          </div>

          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-label">Total Items</span>
              <span className="metric-value">{products.length}</span>
            </div>
            <div className="metric-box">
              <span className="metric-label">System Status</span>
              <span className="status-tag active">Backend Online</span>
            </div>
          </div>

          <div className="hero-banner">
            <h4>Smart Search & Management</h4>
            <p>Filter products instantly, edit details or remove items directly from inventory cards.</p>
          </div>
        </section>
      </main>

      {/* Bottom Section: Search & Product List Cards */}
      <section className="card list-card">
        <div className="card-header list-header">
          <h3>Stock Inventory</h3>
          <div className="header-right-tools">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="count-badge">{filteredProducts.length} Items</span>
          </div>
        </div>

        {loading ? (
          <div className="state-message">Fetching store inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="state-message">
            {searchTerm ? 'No products match your search.' : 'No items in inventory yet.'}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((item, index) => {
              const itemId = item.id;
              const prodName = item.product_name || item.name || 'Unnamed';
              const prodStock = item.stock_quantity !== undefined ? item.stock_quantity : item.quantity;

              return (
                <div key={itemId || index} className="product-card">
                  <div className="prod-top">
                    <span className="prod-price">${item.price}</span>
                  </div>
                  <h4 className="prod-name">{prodName}</h4>
                  <div className="prod-meta">
                    <span>Stock: <strong>{prodStock}</strong></span>
                    <div className="card-actions">
                      <button className="action-btn edit" title="Edit Product" onClick={() => handleEdit(item)}>
                        ✏️
                      </button>
                      <button className="action-btn delete" title="Delete Product" onClick={() => handleDelete(itemId)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;