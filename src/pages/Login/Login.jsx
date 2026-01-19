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

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <input
              type="password"
              placeholder="Ваш пароль"
              className={styles.input}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              disabled={isSubmitting}
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Вхід..." : "Увійти"}
            </button>
            {/* Додаткові кнопки відновлення паролю тут */}
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
