import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const API_URL = "http://localhost:8080/api/auth";
const USE_MOCK = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (authResponse) => {
    sessionStorage.setItem("access_token", authResponse.accessToken);
    sessionStorage.setItem("refresh_token", authResponse.refreshToken);

    let userData = {};

    try {
      const decoded = authResponse.accessToken.startsWith("mock")
        ? {}
        : jwtDecode(authResponse.accessToken);

      userData = {
        id: authResponse.userId || decoded.sub || decoded.id,
        email: authResponse.email || decoded.email || decoded.username,
        role: authResponse.role || decoded.roles || decoded.role || "USER",
      };
    } catch (e) {
      userData = {
        id: authResponse.userId,
        email: authResponse.email,
        role: authResponse.role,
      };
    }

    sessionStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
  };

  const clearSession = useCallback(() => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_data");
    setUser(null);
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_data");
    const storedToken = sessionStorage.getItem("access_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const refreshTokens = useCallback(async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken || refreshToken.startsWith("mock_")) return;

    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: { Authorization: refreshToken },
      });

      if (response.ok) {
        const data = await response.json();
        saveSession(data);
      } else {
        clearSession();
      }
    } catch (error) {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    if (!user) return;
    const intervalId = setInterval(refreshTokens, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [user, refreshTokens]);

  const login = async (email, password) => {
    //test
    if (USE_MOCK && email === "test@test.com" && password === "1234") {
      saveSession({
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
        userId: 101,
        email: "test@test.com",
        role: "USER",
      });
      return true;
    }

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Помилка входу");
    const data = await response.json();
    saveSession(data);
    return true;
  };

  const googleLogin = async (googleToken) => {
    //для тестування
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      const mockGoogleUser = {
        accessToken: "mock_google_access_" + Date.now(),
        refreshToken: "mock_google_refresh_" + Date.now(),
        userId: 888,
        email: "google_user@gmail.com",
        role: "USER",
      };
      saveSession(mockGoogleUser);
      return true;
    }

    try {
      const response = await fetch(`${API_URL}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!response.ok) throw new Error("Google auth failed");

      const data = await response.json();
      saveSession(data);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!USE_MOCK && refreshToken && !refreshToken.startsWith("mock_")) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (e) {}
    }
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, googleLogin, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
