import { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          {!searchOpen && (
            <button
              className={styles.burgerMobile}
              onClick={() => setMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          <svg
            className={styles.locationIcon}
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="12"
              cy="9"
              r="2.5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <span className={styles.city}>Київ</span>
        </div>

        {searchOpen ? (
          <div className={styles.centerExpanded}>
            <div className={styles.searchBarContainer}>
              <button
                className={styles.backBtn}
                onClick={() => setSearchOpen(false)}
              >
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
              </button>

              <input
                type="text"
                placeholder="Пошук..."
                className={styles.searchInputExpanded}
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />

              <div className={styles.searchIconInside}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12.5 12.5L17 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.center}>
            <Link to="/" className={styles.logo}>
              Eventure
            </Link>
          </div>
        )}

        <div className={styles.right}>
          {!searchOpen && (
            <button
              className={styles.searchIconTrigger}
              onClick={() => setSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12.5 12.5L17 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          <button
            className={styles.burgerDesktop}
            onClick={() => setMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
