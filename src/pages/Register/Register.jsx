import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    newsletter: false,
  });

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  //test function to simulate username uniqueness check
  const checkUsernameUnique = async (username) => {
    const takenUsernames = ["admin", "test", "user123"];
    await new Promise((res) => setTimeout(res, 600));
    return !takenUsernames.includes(username.toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }

    if (name === "email") {
      setEmailError("");
    }

    if (name === "username") {
      setUsernameError("");
    }

    setError("");
  };

  const validateEmail = () => {
    if (!form.email) {
      setEmailError("");
      return;
    }

    if (!isValidEmail(form.email)) {
      setEmailError("Неправильний формат електронної пошти");
    } else {
      setEmailError("");
    }
  };

  const validatePasswords = () => {
    if (!form.confirmPassword) {
      setPasswordError("");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setPasswordError("Паролі не співпадають");
    } else {
      setPasswordError("");
    }
  };
  const validateUsername = async () => {
    if (!form.username) {
      setUsernameError("");
      return;
    }

    setCheckingUsername(true);

    const isUnique = await checkUsernameUnique(form.username);

    if (!isUnique) {
      setUsernameError("Цей логін вже зайнятий");
    } else {
      setUsernameError("");
    }

    setCheckingUsername(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.lastName ||
      !form.firstName ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Заповніть усі обовʼязкові поля");
      return;
    }

    if (emailError || passwordError || usernameError) {
      setError("Виправте помилки у формі");
      return;
    }

    if (!form.agree) {
      setError("Потрібно дати згоду на обробку персональних даних");
      return;
    }

    // test register logic
    navigate("/profile");
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Реєстрація</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Прізвище*
            <input
              className={styles.input}
              name="lastName"
              placeholder="Ваше прізвище"
              value={form.lastName}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Імʼя*
            <input
              className={styles.input}
              name="firstName"
              placeholder="Ваше імʼя"
              value={form.firstName}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            Логін*
            <input
              className={styles.input}
              name="username"
              placeholder="Імʼя користувача"
              value={form.username}
              onChange={handleChange}
              onBlur={validateUsername}
            />
          </label>

          {checkingUsername && (
            <p className={styles.helper}>Перевірка логіну…</p>
          )}
          {usernameError && <p className={styles.error}>{usernameError}</p>}

          <label className={styles.label}>
            Електронна пошта*
            <input
              className={styles.input}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={validateEmail}
            />
          </label>

          {emailError && <p className={styles.error}>{emailError}</p>}

          <label className={styles.label}>
            Пароль*
            <input
              type="password"
              className={styles.input}
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <label className={styles.label}>
            <input
              type="password"
              className={styles.input}
              name="confirmPassword"
              placeholder="Повторіть пароль"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={validatePasswords}
            />
          </label>

          {passwordError && <p className={styles.error}>{passwordError}</p>}

          <div className={styles.checkboxes}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              Даю згоду на{" "}
              <Link to="/privacy-policy" className={styles.policyLink}>
                обробку персональних даних
              </Link>
              *
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="newsletter"
                checked={form.newsletter}
                onChange={handleChange}
              />
              Даю згоду на отримання поштової розсилки
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.primaryBtn}>
            Далі →
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
