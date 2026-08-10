import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-32 text-center">
      <span className="font-mono text-6xl text-line">404</span>
      <h1 className="stencil text-3xl text-navy mt-4">Crate Not Found</h1>
      <p className="text-ink/60 mt-2">This page isn't on the manifest.</p>
      <Link to="/" className="inline-block mt-6 stencil text-sm bg-navy text-panel px-6 py-3 hover:bg-safety transition-colors">
        Back to Depot
      </Link>
    </div>
  );
}
