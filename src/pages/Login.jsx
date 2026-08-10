import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(form);
    setSubmitting(false);
    if (ok) navigate("/");
  }

  return (
    <div className="max-w-md mx-auto px-4 md:px-6 py-20">
      <div className="crate-card p-8">
        <span className="font-mono text-xs text-safetyDark tracking-widest">ACCESS MANIFEST</span>
        <h1 className="stencil text-3xl text-navy mt-2 mb-6">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="font-mono text-sm bg-white border border-line px-3 py-2.5 focus:border-safety outline-none w-full" />
          <input required type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="font-mono text-sm bg-white border border-line px-3 py-2.5 focus:border-safety outline-none w-full" />
          {error && <p className="font-mono text-xs text-safetyDark">{error}</p>}
          <button type="submit" disabled={submitting}
            className="stencil text-sm bg-navy text-panel py-3 w-full hover:bg-safety transition-colors disabled:opacity-50">
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="font-mono text-xs text-ink/50 mt-5 text-center">
          No account? <Link to="/signup" className="text-safetyDark hover:underline">Sign up</Link>
        </p>
        <p className="font-mono text-[11px] text-ink/40 mt-3 text-center">
          Mock auth — any email/password works until a backend is connected.
        </p>
      </div>
    </div>
  );
}
