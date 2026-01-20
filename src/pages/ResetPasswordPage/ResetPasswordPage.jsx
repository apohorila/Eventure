import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("VALIDATING");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get("token");

  // ТЕСТОВІ КНОПКИ
  const testButtons = (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        background: "white",
        padding: 15,
        border: "2px solid #ed7c30",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ fontSize: "12px", marginBottom: "8px", color: "#666" }}>
        Стан: <strong>{status}</strong>
      </div>
      <button
        onClick={() => setStatus("VALIDATING")}
        style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}
      >
        🔄 VALIDATING
      </button>
      <button
        onClick={() => setStatus("WELCOME")}
        style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}
      >
        👋 WELCOME
      </button>
      <button
        onClick={() => setStatus("FORM")}
        style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}
      >
        📝 FORM
      </button>
      <button
        onClick={() => setStatus("SUCCESS")}
        style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}
      >
        🎉 SUCCESS
      </button>
      <button
        onClick={() => setStatus("INVALID")}
        style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}
      >
        ❌ INVALID
      </button>
    </div>
  );

  useEffect(() => {
    if (!token) {
      setStatus("INVALID");
      return;
    }

    const validateToken = async () => {
      try {
        await axios.post("/api/auth/password-reset/validate", { token });
        setStatus("WELCOME");
      } catch (error) {
        console.error("Token validation failed:", error);
        setStatus("INVALID");
      }
    };

    validateToken();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Мінімум 8 символів";
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Потрібна велика літера";
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Потрібна мала літера";
    } else if (!/\d/.test(formData.newPassword)) {
      newErrors.newPassword = "Потрібна цифра";
    }

    if (
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("/api/auth/password-reset/confirm", {
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      setStatus("SUCCESS");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Помилка зміни пароля. Можливо, посилання застаріло.");
      setStatus("INVALID");
    }
  };

  let content;

  if (status === "VALIDATING") {
    content = <div className={styles.loading}>Перевірка посилання...</div>;
  } else if (status === "INVALID") {
    content = (
      <>
        <h1 className={styles.title}>Посилання недійсне</h1>
        <p className={styles.subtitle}>
          Це посилання застаріло або було використане.
        </p>
        <button
          className={styles.primaryBtn}
          onClick={() => navigate("/forgot-password")}
        >
          Спробувати ще раз
        </button>
      </>
    );
  } else if (status === "WELCOME") {
    content = (
      <>
        <h1 className={styles.title}>Привіт!</h1>
        <p className={styles.subtitle} style={{ maxWidth: "500px" }}>
          Ми отримали запит на відновлення пароля. Якщо це ви, натисніть кнопку
          нижче, щоб продовжити
        </p>
        <button className={styles.primary} onClick={() => setStatus("FORM")}>
          Змінити пароль
        </button>
      </>
    );
  } else if (status === "FORM") {
    content = (
      <>
        <h1 className={styles.title}>Новий пароль</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Новий пароль
            <div className={styles.passwordWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Введіть новий пароль"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                    <path d="M3 15l2.5 -3.8" />
                    <path d="M21 14.976l-2.492 -3.776" />
                    <path d="M9 17l.5 -4" />
                    <path d="M15 17l-.5 -4" />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className={styles.error}>{errors.newPassword}</p>
            )}
          </label>

          <label className={styles.label}>
            Повторити пароль
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Повторіть пароль"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                    <path d="M3 15l2.5 -3.8" />
                    <path d="M21 14.976l-2.492 -3.776" />
                    <path d="M9 17l.5 -4" />
                    <path d="M15 17l-.5 -4" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </label>

          <button type="submit" className={styles.primaryBtn}>
            Зберегти зміни
          </button>
        </form>
      </>
    );
  } else if (status === "SUCCESS") {
    content = (
      <div className={styles.successContent}>
        <img
          src="assets/icons/checked.png"
          alt="Success"
          className={styles.icon}
        />

        <h2 className={styles.successTitle}>
          Пароль <br />
          успішно змінено
        </h2>
        <button
          className={styles.primaryBtn}
          onClick={() => navigate("/login")}
        >
          Увійти в акаунт
        </button>
      </div>
    );
  }

  return (
    <div>
      {testButtons}

      <div className={styles.page}>
        <div className={styles.card}>{content}</div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
