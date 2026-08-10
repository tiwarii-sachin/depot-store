import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `stencil text-sm tracking-wide px-1 pb-1 border-b-2 transition-colors ${
      isActive ? "border-safety text-navy" : "border-transparent text-navy/70 hover:text-navy"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-panel border-b border-line">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-7 h-7 bg-navy flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-safety" />
            </span>
            <span className="stencil text-xl font-semibold text-navy">DEPOT</span>
            <span className="hidden sm:inline text-[10px] font-mono text-navy/50 tracking-widest">NO. 04</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Catalog</NavLink>
            <NavLink to="/orders" className={linkClass}>Orders</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="font-mono text-xs text-navy/70">{user.name}</span>
                <button onClick={logout} className="stencil text-xs text-safetyDark hover:underline">
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block stencil text-xs text-navy/70 hover:text-navy">
                Log in
              </Link>
            )}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-navy text-panel px-3 py-2 stencil text-xs hover:bg-navy2 transition-colors"
            >
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-safety text-white text-[10px] font-mono w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
