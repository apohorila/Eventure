import { useState } from "react";
import axios from "axios";
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [emailError, setEmailError] = useState("");

  // --- ЛОГІКА ДЛЯ ТЕСТУВАННЯ (START) ---
  const setTestState = (state) => {
    setLoading(false);
    setResending(false);
    setEmailError("");

    switch (state) {
      case "FORM":
        setIsSent(false);
        break;
      case "SUCCESS":
        setIsSent(true);
        break;
      case "LOADING":
        setIsSent(false);
        setLoading(true);
        break;
      case "ERROR":
        setIsSent(false);
        setEmailError("Тестова помилка: Користувача не знайдено");
        break;
      default:
        break;
    }
  };

  const testButtons = (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        zIndex: 9999,
        background: "white",
        padding: 15,
        border: "2px solid #ed7c30",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          marginBottom: "4px",
          color: "#666",
          fontWeight: "bold",
        }}
      >
        Тест режим:
      </div>
      <button
        onClick={() => setTestState("FORM")}
        style={{ cursor: "pointer" }}
      >
        📝 Форма
      </button>
      <button
        onClick={() => setTestState("LOADING")}
        style={{ cursor: "pointer" }}
      >
        ⏳ Завантаження
      </button>
      <button
        onClick={() => setTestState("ERROR")}
        style={{ cursor: "pointer" }}
      >
        ❌ Помилка
      </button>
      <button
        onClick={() => setTestState("SUCCESS")}
        style={{ cursor: "pointer" }}
      >
        🎉 Успіх (Лист)
      </button>
    </div>
  );
  // --- ЛОГІКА ДЛЯ ТЕСТУВАННЯ (END) ---

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Неправильний формат електронної пошти");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError("Неправильний формат електронної пошти");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/password-reset/request", { email });
      setIsSent(true);
    } catch (error) {
      setEmailError("Користувача не знайдено або помилка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resending) return;

    setResending(true);
    try {
      await axios.post("/api/auth/password-reset/request", { email });
      alert(`Лист успішно відправлено повторно на ${email}`);
    } catch (error) {
      console.error(error);
      alert("Помилка при відправці. Спробуйте пізніше.");
    } finally {
      setResending(false);
    }
  };

  if (isSent) {
    return (
      <div className={styles.page}>
        {testButtons}
        <div className={styles.card}>
          <div className={styles.successContent}>
            <div className={styles.iconWrapper}>
              <img
                src="assets/icons/checked.png"
                alt="Checked"
                className={styles.icon}
              />
            </div>
            <h2 className={styles.title}>Лист надіслано</h2>
            <p className={styles.subtitle}>
              Перевірте вашу електронну пошту <br /> та перейдіть за посиланням,
              щоб продовжити
            </p>
            <div className={styles.divider} />
            <p className={styles.bottomText}>
              Не отримали лист? Перевірте спам або <br />{" "}
              <span
                className={styles.bottomAction}
                onClick={handleResend}
                style={{
                  opacity: resending ? 0.5 : 1,
                  cursor: resending ? "default" : "pointer",
                }}
              >
                {resending ? "надсилаємо..." : "надіслати ще раз"}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {testButtons}
      <div className={styles.card}>
        <h1 className={styles.title}>Відновлення пароля</h1>
        <p className={styles.subtitle}>
          Введіть email, і ми надішлемо <br />
          посилання для зміни пароля
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Електронна пошта
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onBlur={handleEmailBlur}
              placeholder="Email"
              required
              disabled={loading}
            />
          </label>
          {emailError && <p className={styles.error}>{emailError}</p>}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "Відправка..." : "Надіслати посилання"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
