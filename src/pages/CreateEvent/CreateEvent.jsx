import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateEvent.module.css";
import InterestCheckbox from "../../components/InterestCheckbox/InterestCheckbox";
import { useCategories } from "../../context/CategoryContext";

const AGE_OPTIONS = {
  under18: { label: "до 18", minAge: 10, maxAge: 17 },
  range18_25: { label: "18–25", minAge: 18, maxAge: 25 },
  range26_30: { label: "26–30", minAge: 26, maxAge: 30 },
  plus30: { label: "30+", minAge: 31, maxAge: 100 },
};

const GENDER_OPTIONS = {
  FEMALE: { label: "Жіноча" },
  MALE: { label: "Чоловіча" },
};

export default function CreateEvent() {
  const navigate = useNavigate();
  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formError, setFormError] = useState("");
  const [chatLinkError, setChatLinkError] = useState("");

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    city: "",
    date: "",
    chatLink: "",
    ageKey: "",
    genderKey: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));

    if (formError) setFormError("");
    if (name === "chatLink" && chatLinkError) setChatLinkError("");
  };

  const handleChatLinkBlur = () => {
    if (eventData.chatLink && !isValidUrl(eventData.chatLink)) {
      setChatLinkError("Посилання має починатися з http:// або https://");
    }
  };

  const toggleCategory = (id) => {
    setSelectedCategory((prev) => (prev === id ? null : id));
    if (formError) setFormError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setImageFile(null);
    setPreviewImage(null);

    const fileInput = document.getElementById("event-photo");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, city, date, chatLink, ageKey, genderKey } =
      eventData;

    if (chatLink && !isValidUrl(chatLink)) {
      setChatLinkError("Некоректне посилання (потрібно http:// або https://)");
      return;
    }

    if (
      !title.trim() ||
      !description.trim() ||
      !city.trim() ||
      !date ||
      !chatLink.trim() ||
      !selectedCategory
    ) {
      setFormError(
        "Будь ласка, заповніть всі обов'язкові поля та оберіть категорію",
      );
      return;
    }

    let minAge = null;
    let maxAge = null;
    if (ageKey && AGE_OPTIONS[ageKey]) {
      minAge = AGE_OPTIONS[ageKey].minAge;
      maxAge = AGE_OPTIONS[ageKey].maxAge;
    }

    const requiredGender = genderKey ? genderKey : null;
    const formattedDate = `${date}T00:00:00`;

    const eventDto = {
      title: title,
      description: description,
      categoryId: selectedCategory,
      location: city.trim(),
      eventDate: formattedDate,
      minAge: minAge,
      maxAge: maxAge,
      requiredGender: requiredGender,
      chatLink: chatLink,
    };

    const formData = new FormData();
    formData.append(
      "event",
      new Blob([JSON.stringify(eventDto)], { type: "application/json" }),
    );

    if (imageFile) {
      formData.append("photo", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8082/api/v1/events", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Івент створено:", result);
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        setFormError(errorData.message || "Помилка при створенні івенту.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setFormError("Не вдалося з'єднатися з сервером.");
    }
  };

  return (
    <section>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>
          Додай інформацію <br /> про івент
        </h2>

        <fieldset className={`${styles.photoSelectors} ${styles.fieldset}`}>
          <div className={styles.photoSelectorsContainer}>
            <label htmlFor="event-photo">
              <div className={styles.photoPlaceholder}>
                {previewImage ? (
                  <div className={styles.previewContainer}>
                    <img
                      src={previewImage}
                      alt="event"
                      className={styles.eventImage}
                    />
                    <div
                      className={styles.deleteBtn}
                      onClick={handleRemoveImage}
                      title="Видалити фото"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`icon icon-tabler icons-tabler-outline icon-tabler-trash ${styles.deleteIcon}`}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <span className={styles.photoPlaceholderSpan}>
                    Додати <br /> фото
                  </span>
                )}
              </div>
              <input
                type="file"
                id="event-photo"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>

            <div className={styles.selectorsContainer}>
              <div className={styles.citySelector}>
                <label className={styles.labelText}>Локація*</label>
                <input
                  type="text"
                  name="city"
                  value={eventData.city}
                  onChange={handleChange}
                  className={styles.textInput}
                  placeholder="Введіть місто"
                />
              </div>

              <div className={styles.dateSelector}>
                <label className={styles.labelText}>Дата*</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label className={styles.labelText}>Назва*</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className={styles.textInput}
            placeholder="Назва івенту"
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label className={styles.labelText}>Про івент*</label>
          <textarea
            name="description"
            maxLength={200}
            value={eventData.description}
            onChange={(e) => {
              handleChange(e);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className={styles.textarea}
            placeholder="Про івент"
          />
          <span className={styles.helper}>
            {eventData.description.length}/200
          </span>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label className={styles.labelText}>Посилання на чат*</label>
          <input
            type="url"
            name="chatLink"
            value={eventData.chatLink}
            onChange={handleChange}
            onBlur={handleChatLinkBlur}
            className={`${styles.textInput} ${
              chatLinkError ? styles.inputError : ""
            }`}
            placeholder="https://"
          />
          {chatLinkError && (
            <span className={styles.fieldError}>{chatLinkError}</span>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label className={styles.labelText}>
            Обмеження щодо відвідувачів
          </label>
          <div className={styles.limitsRow}>
            <select
              name="ageKey"
              value={eventData.ageKey}
              onChange={handleChange}
              className={styles.selectField}
            >
              <option value="">Вік</option>
              {Object.entries(AGE_OPTIONS).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              name="genderKey"
              value={eventData.genderKey}
              onChange={handleChange}
              className={styles.selectField}
            >
              <option value="">Стать</option>
              {Object.entries(GENDER_OPTIONS).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className={`${styles.selectCategories} ${styles.fieldset}`}>
          <h2 className={styles.labelText}>Обери категорію*</h2>
          <div className={styles.interestsContainer}>
            {categories.map((category) => (
              <InterestCheckbox
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onToggle={toggleCategory}
              />
            ))}
          </div>
        </fieldset>

        {formError && <div className={styles.error}>{formError}</div>}

        <button type="submit" className={styles.buttonLink}>
          Створити івент
        </button>
      </form>
    </section>
  );
}
