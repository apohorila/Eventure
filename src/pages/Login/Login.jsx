import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const [attempts, setAttempts] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Неправильний формат електронної пошти");
      return;
    }

    if (!password) {
      setError("Введіть пароль");
      return;
    }

    // test login logic
    const loginSuccess = false;

    if (!loginSuccess) {
      setAttempts((prev) => prev + 1);
      setError("Неправильна електронна пошта або пароль");
      return;
    }

    navigate("/profile");
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Вхід</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Електронна пошта
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onBlur={handleEmailBlur}
            />
          </label>

          {emailError && <p className={styles.error}>{emailError}</p>}

          <label className={styles.label}>
            Пароль
            <input
              type="password"
              placeholder="Ваш пароль"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          {attempts >= 3 && (
            <p className={styles.reset}>
              Забули пароль?{" "}
              <span onClick={() => navigate("/reset-password")}>
                Відновити доступ
              </span>
            </p>
          )}

          <div className={styles.actions}>
            <button type="submit" className={styles.primaryBtn}>
              Увійти
            </button>

            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => navigate("/reset-password")}
            >
              Забули пароль?
            </button>
          </div>
        </form>

        <div className={styles.divider} />

        <p className={styles.text}>
          Не маєте акаунту? Зареєструйтесь або увійдіть за допомогою Google
        </p>

        <div className={styles.secondary}>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/register")}
          >
            Зареєструватись
          </button>

          <button className={styles.googleBtn}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Увійти через Google
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
