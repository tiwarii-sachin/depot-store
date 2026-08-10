import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="stencil text-4xl text-navy mb-8">Order History</h1>

      {loading ? (
        <p className="font-mono text-sm text-ink/50">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="stencil text-lg text-navy">No orders yet.</p>
          <Link to="/products" className="inline-block mt-6 stencil text-sm bg-navy text-panel px-6 py-3 hover:bg-safety transition-colors">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="crate-card p-5">
              <div className="flex justify-between items-start tear-line pb-3">
                <div>
                  <span className="font-mono text-sm text-navy">{order.id}</span>
                  <p className="font-mono text-[11px] text-ink/40 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="stencil text-[10px] bg-crate text-white px-2 py-1">{order.status.toUpperCase()}</span>
              </div>
              <div className="mt-3 space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between font-mono text-xs text-ink/70">
                    <span>{item.name} × {item.qty}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="tear-line mt-3 pt-3 flex justify-between stencil text-navy">
                <span className="text-sm">Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
