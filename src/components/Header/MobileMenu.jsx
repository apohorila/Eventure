import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profile}>
          <img src="" alt="avatar" className={styles.avatar} />
          <div>
            <div className={styles.name}>Імʼя</div>
            <div className={styles.nick}>@name</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <Link to="/my-events" className={styles.navItem} onClick={onClose}>
            Мої івенти
          </Link>
          <Link to="/registered" className={styles.navItem} onClick={onClose}>
            Зареєстровані івенти
          </Link>
          <Link to="/archived" className={styles.navItem} onClick={onClose}>
            Архівовані івенти
          </Link>

          <Link to="/create" className={styles.createBtn} onClick={onClose}>
            Створити івент
          </Link>

          <Link to="/edit-profile" className={styles.editBtn} onClick={onClose}>
            Редагувати профіль
          </Link>

          <Link to="/" className={styles.logoutBtn} onClick={onClose}>
            Вийти
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
