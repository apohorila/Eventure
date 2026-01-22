import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getUserProfileSummary } from "../server/api";

const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${API_BASE_URL}/api/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (authResponse, profileData = {}) => {
    sessionStorage.setItem("access_token", authResponse.accessToken);
    sessionStorage.setItem("refresh_token", authResponse.refreshToken);

    let userData = {};

    // --- MOCK START: Обробка тестового токена (щоб jwtDecode не ламався) ---
    if (authResponse.accessToken === "mock_access_token") {
      userData = {
        id: 999,
        email: "test@test.com",
        role: "USER",
        name: "Test",
        // avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      };
    } else {
      //   // --- MOCK END ---

      const userData = {
        id: authResponse.userId,
        email: authResponse.email,
        role: authResponse.role,
        name: profileData?.name || authResponse.fullName || "Користувач",
        avatarUrl: profileData?.avatarUrl || null,
      };

      // --- MOCK START: закриття дужки else ---
    }
    // --- MOCK END ---

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
    if (!refreshToken) return;

    // --- MOCK START: Якщо це тестовий токен, нічого не робимо або імітуємо успіх ---
    if (refreshToken === "mock_refresh_token") return;
    // --- MOCK END ---

    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
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
    const intervalId = setInterval(refreshTokens, 14 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [user, refreshTokens]);

  const register = async (registrationData) => {
    // --- MOCK START: Заглушка для реєстрації ---
    // Можна розкоментувати, якщо треба тестити реєстрацію без беку

    console.log("Mock Register:", registrationData);
    saveSession({
      accessToken: "mock_access_token",
      refreshToken: "mock_refresh_token",
    });
    return true;

    // --- MOCK END ---

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      let errorMessage = "Error";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    saveSession(data);
    return true;
  };

  const login = async (email, password) => {
    // --- MOCK START: Заглушка для входу ---
    if (email === "test@test.com" && password === "1234") {
      console.log("Виконується тестовий вхід...");
      // Імітуємо затримку як у реального сервера
      await new Promise((resolve) => setTimeout(resolve, 500));

      saveSession({
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
      });
      return true;
    }
    // --- MOCK END ---

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Error");

    const authData = await response.json();

    let profileData = {};
    try {
      profileData = await getUserProfileSummary(
        authData.userId,
        authData.accessToken,
      );
    } catch (err) {
      console.warn("Не вдалося завантажити профіль", err);
    }
    saveSession(authData, profileData);
    return true;
  };

  const googleLogin = async (googleToken) => {
    const response = await fetch(`${API_URL}/google/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleToken }),
    });

    if (!response.ok) throw new Error("Error");

    const data = await response.json();
    saveSession(data);
    return true;
  };

  const logout = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");

    // --- MOCK START: Якщо це мок, просто чистимо сесію без запиту на сервер ---
    if (refreshToken === "mock_refresh_token") {
      clearSession();
      return;
    }
    // --- MOCK END ---

    if (refreshToken) {
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
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
