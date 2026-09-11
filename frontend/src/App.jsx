import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./api/products";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setError("");
      setProducts(await getProducts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      const product = {
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };

      if (editingId) {
        await updateProduct(editingId, product);
      } else {
        await createProduct(product);
      }

      setForm({ name: "", price: "", quantity: "" });
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEditing(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  }

  async function handleDelete(id) {
    try {
      setError("");
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">Product Manager</h1>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
        <input
          className="input input-bordered"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          required
        />
        <input
          className="input input-bordered w-32"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          className="input input-bordered w-32"
          name="quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button className="btn btn-primary" type="submit">
          {editingId ? "Update" : "Add product"}
        </button>
        {editingId && (
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", price: "", quantity: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {error && <p className="text-error">{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td className="flex gap-2 items-center justify-center">
                    <button
                      className="btn btn-sm"
                      onClick={() => startEditing(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default App;
