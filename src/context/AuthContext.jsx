import { createContext, useContext, useState } from "react";
import { getStoredUser, loginUser, logoutUser, registerUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [error, setError] = useState(null);

  async function login(credentials) {
    setError(null);
    try {
      const { user } = await loginUser(credentials);
      setUser(user);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  async function register(details) {
    setError(null);
    try {
      const { user } = await registerUser(details);
      setUser(user);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
