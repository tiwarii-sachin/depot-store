export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-navy text-panel/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="stencil text-lg text-panel">DEPOT</div>
          <p className="text-xs mt-2 text-panel/50 font-mono">General Supply Co.<br />Est. practice project</p>
        </div>
        <div>
          <div className="stencil text-xs text-safety mb-3">Shop</div>
          <ul className="space-y-2 text-sm text-panel/70">
            <li>Apparel</li>
            <li>Electronics</li>
            <li>Home</li>
            <li>Field Gear</li>
          </ul>
        </div>
        <div>
          <div className="stencil text-xs text-safety mb-3">Info</div>
          <ul className="space-y-2 text-sm text-panel/70">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Support</li>
          </ul>
        </div>
        <div>
          <div className="stencil text-xs text-safety mb-3">Manifest</div>
          <p className="text-xs text-panel/50 font-mono leading-relaxed">
            Frontend-only build.<br />Connect a backend via<br />VITE_API_BASE_URL.
          </p>
        </div>
      </div>
      <div className="tear-line border-line/30 max-w-6xl mx-auto" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 text-[11px] font-mono text-panel/40">
        Built for practice — not a real store.
      </div>
    </footer>
  );
}
