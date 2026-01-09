import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({ open, onClose }) => {
  if (!open) return null;

  const ArrowSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBurger} onClick={onClose}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link to="/profile" className={styles.profileCard} onClick={onClose}>
          <div className={styles.profileAvatarPlaceholder} />
          <div className={styles.profileInfo}>
            <div className={styles.name}>Імʼя</div>
            <div className={styles.nick}>@name</div>
          </div>
          <span className={styles.arrow}>{ArrowSvg}</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/my-events" className={styles.navCard} onClick={onClose}>
            <span>Мої івенти</span>
            <span className={styles.arrow}>{ArrowSvg}</span>
          </Link>

          <Link to="/registered" className={styles.navCard} onClick={onClose}>
            <span>Реєстрації</span>
            <span className={styles.arrow}>{ArrowSvg}</span>
          </Link>

          <Link to="/archived" className={styles.navCard} onClick={onClose}>
            <span>Архівовані івенти</span>
            <span className={styles.arrow}>{ArrowSvg}</span>
          </Link>
        </nav>

        <Link to="/create" className={styles.primaryBtn} onClick={onClose}>
          Створити івент
        </Link>

        <Link
          to="/edit-profile"
          className={styles.secondaryBtn}
          onClick={onClose}
        >
          Редагувати профіль
        </Link>

        <button type="button" className={styles.logoutBtn} onClick={onClose}>
          <span className={styles.logoutIcon}>
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
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
          </span>
          <span>Вийти</span>
        </button>
      </aside>
    </div>
  );
};

export default MobileMenu;
