import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleGoogleClick = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsSubmitting(true);
      try {
        await googleLogin(tokenResponse.access_token);
        navigate("/");
      } catch (err) {
        console.error(err);
        setError("Не вдалося увійти через Google");
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: () => {
      setError("Помилка з'єднання з Google");
    },
  });

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
    setError("");
    setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError("Неправильний формат електронної пошти");
      return;
    }
    if (!password) {
      setError("Введіть пароль");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Неправильна електронна пошта або пароль");
      setAttempts((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
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
                setError("");
              }}
              onBlur={handleEmailBlur}
              disabled={isSubmitting}
            />
          </label>
          {emailError && <p className={styles.error}>{emailError}</p>}

          <label className={styles.label}>
            Пароль
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ваш пароль"
                className={styles.input}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
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
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Вхід..." : "Увійти"}
            </button>
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => navigate("/forgot-password")}
            >
              Забули пароль?
            </button>
          </div>
        </form>

        <div className={styles.divider} />

        <p className={styles.text}>
          Не маєте акаунту? Зареєструйтесь або увійдіть через Google
        </p>

        <div className={styles.secondary}>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/register")}
            disabled={isSubmitting}
          >
            Зареєструватись
          </button>

          <button
            className={styles.googleBtn}
            disabled={isSubmitting}
            onClick={() => handleGoogleClick()}
            type="button"
          >
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
