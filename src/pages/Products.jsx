import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/mockProducts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, search, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <span className="font-mono text-xs text-safetyDark tracking-widest">FULL MANIFEST</span>
        <h1 className="stencil text-4xl text-navy mt-2">Catalog</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6 tear-line pt-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`stencil text-xs px-3 py-2 border transition-colors ${
                category === cat
                  ? "bg-navy text-panel border-navy"
                  : "border-line text-navy/70 hover:border-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search SKU or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-mono text-sm bg-panel border border-line px-3 py-2 focus:border-safety outline-none w-48"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="font-mono text-sm bg-panel border border-line px-3 py-2 focus:border-safety outline-none"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="font-mono text-sm text-ink/50">Loading crates...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="stencil text-lg text-navy">No matches on the manifest.</p>
          <p className="font-mono text-sm text-ink/50 mt-2">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
