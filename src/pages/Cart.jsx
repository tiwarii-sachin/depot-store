import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-24 text-center">
        <p className="stencil text-2xl text-navy">Your cart is empty.</p>
        <p className="font-mono text-sm text-ink/50 mt-2">Nothing in the crate yet.</p>
        <Link
          to="/products"
          className="inline-block mt-6 stencil text-sm bg-navy text-panel px-6 py-3 hover:bg-safety transition-colors"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  const shipping = subtotal > 75 ? 0 : 7.5;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="stencil text-4xl text-navy mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="crate-card flex gap-4 p-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="stencil text-sm text-navy">{item.name}</h3>
                    <span className="font-mono text-[10px] text-ink/40">{item.id}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-mono text-xs text-safetyDark hover:underline h-fit"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 stencil text-navy hover:bg-concrete"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 stencil text-navy hover:bg-concrete"
                    >
                      +
                    </button>
                  </div>
                  <span className="stencil text-lg text-navy">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="crate-card p-6 h-fit">
          <h2 className="stencil text-lg text-navy mb-4">Order Summary</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-ink/60">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="tear-line mt-3 pt-3 flex justify-between stencil text-lg text-navy">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block text-center mt-5 stencil text-sm bg-navy text-panel py-3 hover:bg-safety transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
