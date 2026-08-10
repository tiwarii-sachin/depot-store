import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/mockProducts";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-line bg-panel">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-mono text-xs text-safetyDark tracking-widest">MANIFEST NO. 0421-A</span>
            <h1 className="stencil text-5xl md:text-6xl text-navy mt-4 leading-[1.05]">
              GOODS THAT<br />EARN THEIR<br />KEEP.
            </h1>
            <p className="text-ink/70 mt-5 max-w-md">
              Practical apparel, tools, and gear — packed, labeled, and shipped
              from the depot. No filler, no fuss.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/products"
                className="stencil text-sm bg-navy text-panel px-6 py-3 hover:bg-safety transition-colors"
              >
                Browse Catalog
              </Link>
              <Link
                to="/products"
                className="stencil text-sm border border-navy text-navy px-6 py-3 hover:bg-navy hover:text-panel transition-colors"
              >
                View Manifest
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="crate-card p-2">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80"
                alt="Field gear crate"
                className="w-full h-80 object-cover"
              />
            </div>
            <span className="absolute -bottom-4 -left-4 bg-safety text-white stencil text-xs px-3 py-2 rotate-[-3deg]">
              FRAGILE — THIS SIDE UP
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter((c) => c !== "All").map((cat) => (
            <Link
              key={cat}
              to="/products"
              className="stencil text-xs border border-line bg-panel px-4 py-2 hover:border-safety hover:text-safetyDark transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-end justify-between mb-6 tear-line pt-6">
          <h2 className="stencil text-2xl text-navy">Fresh in the Depot</h2>
          <Link to="/products" className="stencil text-xs text-safetyDark hover:underline">
            View all →
          </Link>
        </div>
        {loading ? (
          <p className="font-mono text-sm text-ink/50">Loading crates...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
