import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const lowStock = product.stock > 0 && product.stock <= 10;
  const outOfStock = product.stock === 0;

  return (
    <div className="crate-card group flex flex-col">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-line/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <span className="absolute top-3 left-3 bg-navy text-panel text-[10px] font-mono px-2 py-1">
          {product.category.toUpperCase()}
        </span>
        {lowStock && (
          <span className="absolute top-3 right-3 bg-safety text-white text-[10px] font-mono px-2 py-1">
            LOW STOCK
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="stencil text-sm text-navy leading-tight hover:text-safetyDark transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>
        <span className="font-mono text-[10px] text-ink/40 mt-1">{product.id}</span>

        <div className="mt-3 flex items-center justify-between tear-line pt-3">
          <span className="stencil text-lg text-navy">${product.price.toFixed(2)}</span>
          <span className="font-mono text-[11px] text-ink/50">★ {product.rating}</span>
        </div>

        <button
          onClick={() => addItem(product, 1)}
          disabled={outOfStock}
          className="mt-3 stencil text-xs py-2.5 bg-navy text-panel hover:bg-safety transition-colors disabled:bg-line disabled:text-ink/40 disabled:cursor-not-allowed"
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
