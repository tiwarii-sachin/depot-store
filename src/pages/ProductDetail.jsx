import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 font-mono text-sm text-ink/50">Loading...</div>;
  if (error || !product)
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 text-center">
        <p className="stencil text-lg text-navy">Crate not found.</p>
        <Link to="/products" className="stencil text-xs text-safetyDark hover:underline mt-3 inline-block">
          ← Back to catalog
        </Link>
      </div>
    );

  const outOfStock = product.stock === 0;

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem(product, qty);
    navigate("/checkout");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <Link to="/products" className="font-mono text-xs text-ink/50 hover:text-safetyDark">
        ← Back to catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="crate-card p-2">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
        </div>

        <div>
          <span className="bg-navy text-panel text-[10px] font-mono px-2 py-1">{product.category.toUpperCase()}</span>
          <h1 className="stencil text-4xl text-navy mt-4">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-mono text-xs text-ink/40">{product.id}</span>
            <span className="font-mono text-xs text-ink/50">★ {product.rating}</span>
          </div>

          <p className="text-ink/70 mt-5 leading-relaxed">{product.description}</p>

          <div className="tear-line mt-6 pt-6">
            <div className="flex items-baseline justify-between">
              <span className="stencil text-3xl text-navy">${product.price.toFixed(2)}</span>
              <span className={`font-mono text-xs ${outOfStock ? "text-safetyDark" : "text-crate"}`}>
                {outOfStock ? "OUT OF STOCK" : `${product.stock} in stock`}
              </span>
            </div>

            {!outOfStock && (
              <div className="flex items-center gap-3 mt-5">
                <div className="flex items-center border border-line">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 stencil text-navy hover:bg-concrete"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-mono text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="w-9 h-9 stencil text-navy hover:bg-concrete"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleAdd}
                disabled={outOfStock}
                className="flex-1 stencil text-sm py-3 bg-navy text-panel hover:bg-safety transition-colors disabled:bg-line disabled:text-ink/40"
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={outOfStock}
                className="flex-1 stencil text-sm py-3 border border-navy text-navy hover:bg-navy hover:text-panel transition-colors disabled:border-line disabled:text-ink/40"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
