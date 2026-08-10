import { Link, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-24 text-center">
      <span className="inline-block w-14 h-14 bg-crate text-white text-2xl flex items-center justify-center">✓</span>
      <h1 className="stencil text-4xl text-navy mt-6">Order Confirmed</h1>
      <p className="text-ink/70 mt-3">
        Your crate is being packed. Order reference below.
      </p>
      <div className="crate-card inline-block px-8 py-4 mt-6">
        <span className="font-mono text-lg text-navy">{orderId}</span>
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <Link to="/orders" className="stencil text-sm border border-navy text-navy px-6 py-3 hover:bg-navy hover:text-panel transition-colors">
          View Orders
        </Link>
        <Link to="/products" className="stencil text-sm bg-navy text-panel px-6 py-3 hover:bg-safety transition-colors">
          Keep Shopping
        </Link>
      </div>
    </div>
  );
}
