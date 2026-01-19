import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useAuth } from "../../context/AuthContext";

const EMAIL_MAX_LENGTH = 255;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateEmailFormat = () => {
    if (!form.email) {
      setEmailError("");
      return;
    }
    if (form.email.length > EMAIL_MAX_LENGTH) {
      setEmailError("Електронна пошта не може перевищувати 255 символів");
      return;
    }
    if (!isValidEmail(form.email)) {
      setEmailError("Неправильний формат електронної пошти");
    } else setEmailError("");
  };

  const validateName = (label, value) => {
    if (!value) return "";
    if (value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH) {
      return `${label} має містити від 2 до 50 символів`;
    }
    return "";
  };

  const validatePasswords = () => {
    if (!form.password || !form.confirmPassword) {
      setPasswordError("");
      return;
    }
    if (
      form.password.length < PASSWORD_MIN_LENGTH ||
      form.password.length > PASSWORD_MAX_LENGTH
    ) {
      setPasswordError("Invalid length");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
    if (!passwordRegex.test(form.password)) {
      setPasswordError("Пароль повинен містити великі та малі літери і цифру");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setPasswordError("Паролі не співпадають");
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email") setEmailError("");
    if (name === "firstName") setFirstNameError("");
    if (name === "lastName") setLastNameError("");
    if (name === "password" || name === "confirmPassword") setPasswordError("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (
      !form.lastName ||
      !form.firstName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Заповніть всі обовʼязкові поля");
      return;
    }
    if (!isValidEmail(form.email)) {
      setEmailError("Неправильний формат електронної пошти");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setPasswordError("Паролі не співпадають");
      return;
    }
    if (!form.agree) {
      setError("Потрібно погодитись на обробку персональних даних");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        isSubscribed: form.newsletter,
      });

      navigate("/create-profile");
    } catch (err) {
      console.error(err);
      const message = (err.message || "").toLowerCase();

      if (message.includes("email") && message.includes("exists")) {
        setEmailError("Email вже використовується");
      } else {
        setError(err.message || "Error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Реєстрація</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Прізвище*
            <input
              className={`${styles.input} ${
                lastNameError ? styles.inputError : ""
              }`}
              name="lastName"
              placeholder="Ваше прізвище"
              value={form.lastName}
              onChange={handleChange}
              onBlur={() =>
                setLastNameError(validateName("Прізвище", form.lastName))
              }
              disabled={isSubmitting}
            />
          </label>
          {lastNameError && <p className={styles.error}>{lastNameError}</p>}

          <label className={styles.label}>
            Імʼя*
            <input
              className={`${styles.input} ${
                firstNameError ? styles.inputError : ""
              }`}
              name="firstName"
              placeholder="Ваше імʼя"
              value={form.firstName}
              onChange={handleChange}
              onBlur={() =>
                setFirstNameError(validateName("Імʼя", form.firstName))
              }
              disabled={isSubmitting}
            />
          </label>
          {firstNameError && <p className={styles.error}>{firstNameError}</p>}

          <label className={styles.label}>
            Електронна пошта*
            <input
              className={`${styles.input} ${
                emailError ? styles.inputError : ""
              }`}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={validateEmailFormat}
              disabled={isSubmitting}
            />
          </label>
          {emailError && <p className={styles.error}>{emailError}</p>}

          <label className={styles.label}>
            Пароль*
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={`${styles.input} ${
                  passwordError ? styles.inputError : ""
                }`}
                name="password"
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange}
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

          <label className={styles.label}>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`${styles.input} ${
                  passwordError ? styles.inputError : ""
                }`}
                name="confirmPassword"
                placeholder="Повторіть пароль"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={validatePasswords}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
          {passwordError && <p className={styles.error}>{passwordError}</p>}

          <div className={styles.checkboxes}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              Даю згоду на отримання поштової розсилки
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : "Далі →"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
