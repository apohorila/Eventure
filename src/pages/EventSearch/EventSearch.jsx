import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { format, parseISO } from "date-fns";
import styles from "./EventSearch.module.css";
import { useCategories } from "../../context/CategoryContext";
import EventCard from "../../components/EventCard/EventCard";

const CustomDateInput = React.forwardRef(
  ({ value, onClick, placeholder }, ref) => (
    <div className={styles.customDateWrapper} onClick={onClick} ref={ref}>
      <span className={styles.dateText}>{value ? value : placeholder}</span>
      <img
        src="/assets/icons/down-arrow.png"
        alt="arrow"
        className={styles.arrowIcon}
      />
    </div>
  ),
);

const customArrow = (props) => {
  return (
    <div {...props.innerProps} style={{ cursor: "pointer", display: "flex" }}>
      <img
        src="/assets/icons/down-arrow.png"
        alt="down arrow"
        style={{ width: "15px", height: "15px", marginLeft: "5px" }}
      />
    </div>
  );
};

const unstyledStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    background: "transparent",
    minHeight: "auto",
    maxWidth: "400px",
    cursor: "pointer",
    fontSize: "20px",
    "@media only screen and (min-width: 480px)": {
      ...base["@media only screen and (min-width: 480px)"],
      fontSize: "16px",
      minHeight: "40px",
      maxWidth: "240px",
    },
    "@media only screen and (min-width: 768px)": {
      ...base["@media only screen and (min-width: 768px)"],
      fontSize: "18px",
      minHeight: "45px",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#000",
    margin: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: "#000",
    margin: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "16px",
    borderRadius: "8px",
  }),
};

export default function EventSearch() {
  const { categories } = useCategories();
  const categoriesOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [tempSearch, setTempSearch] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:8080/api/v1/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
          console.log(data);
        }
      } catch (err) {
        setError("Ой! Не вдалося завантажити івенти, спробуйте пізніше.");
      }
    }
    fetchEvents();
  }, []);

  const AGE_OPTIONS = {
    under18: { label: "до 18", minAge: 10, maxAge: 17 },
    range18_25: { label: "18–25", minAge: 18, maxAge: 25 },
    range26_30: { label: "26–30", minAge: 26, maxAge: 30 },
    plus30: { label: "30+", minAge: 31, maxAge: 100 },
  };

  const PARTICIPANTS = {
    under5: { label: "1-5", maxParticipants: 5 },
    range5_10: { label: "5-10", maxParticipants: 10 },
    range10_20: { label: "10-20", maxParticipants: 20 },
    range20_50: { label: "20-50", maxParticipants: 50 },
    range50_100: { label: "50-100", maxParticipants: 100 },
    above100: { label: "100+", maxParticipants: 10000 },
  };

  const ageSelectOptions = Object.entries(AGE_OPTIONS).map(([key, info]) => ({
    value: info.maxAge,
    label: info.label,
  }));

  const uniqueLocations = [...new Set(events.map((event) => event.location))];
  const locationOptions = uniqueLocations.map((location) => ({
    value: location,
    label: location,
  }));

  const partcipantsOptions = Object.entries(PARTICIPANTS).map(
    ([key, info]) => ({
      value: info.maxParticipants,
      label: info.label,
    }),
  );

  const dateFromUrl = searchParams.get("date");
  const selectedDate = dateFromUrl ? parseISO(dateFromUrl) : null;
  const handleDateChange = (date) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    handleFilterChange("date", formattedDate);
  };

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);
      if (
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        nextParams.delete(key);
      } else if (Array.isArray(value)) {
        nextParams.delete(key);
        value.forEach((v) => nextParams.append(key, v));
      } else {
        nextParams.set(key, value);
      }
      return nextParams;
    });
  }

  const displayedEvents = events.filter((event) => {
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const categoryParams = searchParams.getAll("category");
    const maxAgeFilter = searchParams.get("max_age");
    const maxParticipantsFilter = searchParams.get("max_participants");
    const locationFilter = searchParams.get("location");
    const dateFilter = searchParams.get("date");

    const matchesSearch = event.title.toLowerCase().includes(searchQuery);

    const matchesCategory =
      categoryParams.length === 0 ||
      categoryParams.includes(event.category_id.toString());

    const matchesAge = !maxAgeFilter || event.max_age == Number(maxAgeFilter);

    const matchesParticipants =
      !maxParticipantsFilter ||
      event.max_participants <= Number(maxParticipantsFilter);

    const matchesLocation =
      !locationFilter ||
      event.location.toLowerCase() === locationFilter.toLowerCase();

    const matchesDate = !dateFilter || event.event_date.startsWith(dateFilter);

    return (
      matchesCategory &&
      matchesAge &&
      matchesParticipants &&
      matchesLocation &&
      matchesDate &&
      matchesSearch
    );
  });

  if (!events) return <div>Вантажимо івенти</div>;

  return (
    <main>
      <section className={styles.searchFilter}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Ваш запит..."
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter"}
          />
          <button
            className={styles.searchButton}
            onClick={() => {
              handleFilterChange("search", tempSearch);
            }}
          >
            <img src="/assets/icons/search.png" />
          </button>
        </div>
        <div className={styles.filters}>
          <Select
            isMulti
            name="categories"
            options={categoriesOptions}
            className="basic-multi-select"
            styles={unstyledStyles}
            classNamePrefix="multi-select"
            placeholder="Категорія"
            components={{ DropdownIndicator: customArrow }}
            onChange={(selected) => {
              const values = selected ? selected.map((opt) => opt.value) : [];
              handleFilterChange("category", values);
            }}
          />
          <Select
            isMulti
            name="locations"
            options={locationOptions}
            className="basic-multi-select"
            styles={unstyledStyles}
            classNamePrefix="select"
            placeholder="Локація"
            components={{ DropdownIndicator: customArrow }}
            onChange={(selected) => {
              const values = selected ? selected.map((opt) => opt.value) : [];
              handleFilterChange("location", values);
            }}
          />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd.MM.yyyy"
            placeholderText="Дата"
            className={styles.datePickerContainer}
            customInput={<CustomDateInput />}
            isClearable
          />
          <Select
            name="age"
            options={ageSelectOptions}
            className="basic-multi-select"
            styles={unstyledStyles}
            classNamePrefix="select"
            placeholder="Вік"
            isClearable
            components={{ DropdownIndicator: customArrow }}
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : null;
              handleFilterChange("max_age", value);
            }}
          />
          <Select
            name="age"
            options={partcipantsOptions}
            className="basic-multi-select"
            styles={unstyledStyles}
            classNamePrefix="select"
            placeholder="Кількість учасників"
            isClearable
            components={{ DropdownIndicator: customArrow }}
            onChange={(selectedOption) => {
              const value = selectedOption ? selectedOption.value : null;
              handleFilterChange("max_participants", value);
            }}
          />
        </div>
        {searchParams.toString().length > 0 ? (
          <p
            className={styles.clearAll}
            onClick={() => {
              setSearchParams({});
              if (setTempSearch) {
                setTempSearch("");
              }
            }}
          >
            Очистити всі фільтри
          </p>
        ) : (
          ""
        )}
      </section>
      <section className={styles.eventsSection}>
        <div className={styles.eventsContainer}></div>
      </section>
      <section>
        {displayedEvents.length > 0 ? (
          <div className={styles.eventsDisplay}>
            {displayedEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                bannerPhotoUrl={event.banner_photo_url}
                location={event.location}
                date={event.event_date}
              />
            ))}
          </div>
        ) : (
          <div className={styles.notFound}>
            <img src="/assets/icons/eyes.png" />
            <h1>Отакої!</h1>
            <p>
              На жаль за вашим запитом не знайдено івентів.Спробуйте застосувати
              інші фільтри або очистити пошук.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
