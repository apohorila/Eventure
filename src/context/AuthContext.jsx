import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState({ name: "Tester" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("site_token");
    if (token) {
      setUser({ name: "User", token: token });
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("site_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("site_token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
