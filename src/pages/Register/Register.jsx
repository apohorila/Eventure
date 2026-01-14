import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useRegistration } from "../../context/RegistrationContext";

const Register = () => {
  const navigate = useNavigate();
  const { setRegistrationData } = useRegistration();

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    newsletter: false,
  });

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  //test
  const checkEmailUnique = async (email) => {
    const takenEmails = ["test@example.com", "admin@example.com"];
    await new Promise((res) => setTimeout(res, 600));
    return !takenEmails.includes(email.toLowerCase());
  };

  const validateEmailUnique = async () => {
    if (!form.email || emailError || !isValidEmail(form.email)) return;

    setCheckingEmail(true);
    const isUnique = await checkEmailUnique(form.email);

    if (!isUnique) {
      setEmailError("Ця електронна пошта вже використовується");
    }
    setCheckingEmail(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.lastName ||
      !form.firstName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Заповніть усі обовʼязкові поля");
      return;
    }

    if (emailError || passwordError) {
      setError("Виправте помилки у формі");
      return;
    }

    if (!form.agree) {
      setError("Потрібно дати згоду на обробку персональних даних");
      return;
    }

    setRegistrationData({
      lastName: form.lastName,
      firstName: form.firstName,
      email: form.email,
      password: form.password,
      newsletter: form.newsletter,
    });

    navigate("/create-profile");

    // test

    console.log("збережено в контекст:", {
      lastName: form.lastName,
      firstName: form.firstName,
      email: form.email,
      password: form.password,
      newsletter: form.newsletter,
    });
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
            Електронна пошта*
            <input
              className={styles.input}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={() => {
                validateEmail();
                validateEmailUnique();
              }}
            />
          </label>
          {checkingEmail && <p className={styles.helper}>Перевірка email…</p>}
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
