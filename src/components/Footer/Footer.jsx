import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Підтримка</h3>
          <ul className={styles.links}>
            <li>
              <Link to="/community-rules">Правила спільноти</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/privacy">Політика конфіденційності</Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Навігація</h3>
          <ul className={styles.links}>
            <li>
              <Link to="/profile">Мій профіль</Link>
            </li>
            <li>
              <Link to="/my-events">Мої івенти</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        © 2026 Eventure. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
