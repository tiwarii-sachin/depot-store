import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

const empty = { name: "", email: "", address: "", city: "", zip: "", card: "" };

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (items.length === 0 && !submitting) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-24 text-center">
        <p className="stencil text-2xl text-navy">Nothing to check out.</p>
        <Link to="/products" className="inline-block mt-6 stencil text-sm bg-navy text-panel px-6 py-3 hover:bg-safety transition-colors">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const shipping = subtotal > 75 ? 0 : 7.5;
  const total = subtotal + shipping;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const order = await placeOrder({
        items,
        shipping: { name: form.name, email: form.email, address: form.address, city: form.city, zip: form.zip },
        total,
      });
      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="stencil text-4xl text-navy mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
          <div>
            <h2 className="stencil text-sm text-navy mb-3">Shipping Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required name="name" value={form.name} onChange={handleChange} placeholder="Full name"
                className="font-mono text-sm bg-panel border border-line px-3 py-2.5 focus:border-safety outline-none sm:col-span-2" />
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email"
                className="font-mono text-sm bg-panel border border-line px-3 py-2.5 focus:border-safety outline-none sm:col-span-2" />
              <input required name="address" value={form.address} onChange={handleChange} placeholder="Street address"
                className="font-mono text-sm bg-panel border border-line px-3 py-2.5 focus:border-safety outline-none sm:col-span-2" />
              <input required name="city" value={form.city} onChange={handleChange} placeholder="City"
                className="font-mono text-sm bg-panel border border-line px-3 py-2.5 focus:border-safety outline-none" />
              <input required name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP code"
                className="font-mono text-sm bg-panel border border-line px-3 py-2.5 focus:border-safety outline-none" />
            </div>
          </div>

          <div>
            <h2 className="stencil text-sm text-navy mb-3">Payment</h2>
            <input required name="card" value={form.card} onChange={handleChange} placeholder="Card number (any digits — this is a practice project)"
              className="font-mono text-sm bg-panel border border-line px-3 py-2.5 focus:border-safety outline-none w-full" />
            <p className="font-mono text-[11px] text-ink/40 mt-2">No real payment is processed. Wire this up to Stripe/etc. on your backend.</p>
          </div>

          {error && <p className="font-mono text-sm text-safetyDark">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="stencil text-sm bg-navy text-panel px-8 py-3.5 hover:bg-safety transition-colors disabled:opacity-50"
          >
            {submitting ? "Placing order..." : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="crate-card p-6 h-fit">
          <h2 className="stencil text-lg text-navy mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between font-mono text-xs">
                <span className="text-ink/70">{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="tear-line mt-4 pt-3 space-y-2 font-mono text-sm">
            <div className="flex justify-between"><span className="text-ink/60">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-ink/60">Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
          </div>
          <div className="tear-line mt-3 pt-3 flex justify-between stencil text-lg text-navy">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
