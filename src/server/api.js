const MOCK_CATEGORIES = [
  { id: 1, name: "Спорт та активний відпочинок", iconName: "sport" },
  { id: 2, name: "Ігри та хобі", iconName: "games" },
  { id: 3, name: "Соціальні та міські заходи", iconName: "social" },
  { id: 4, name: "Подорожі та поїздки", iconName: "travel" },
  { id: 5, name: "Волонтерство", iconName: "volunteering" },
  { id: 6, name: "Освіта та розвиток", iconName: "education" },
];

const MOCK_HOME_DATA = {
  trendingEvents: [
    {
      id: 1,
      title: "Code & Coffee",
      eventDate: "2026-06-10T09:00:00.000Z",
      location: "Львів",
      imageUrl: "https://placehold.co/400x250/orange/white?text=Code+Coffee",
    },
    {
      id: 2,
      title: "Вечір Настілок",
      eventDate: "2026-06-15T18:30:00.000Z",
      location: "Івано-Франківськ",
      imageUrl: "https://placehold.co/400x250/purple/white?text=Board+Games",
    },
    {
      id: 3,
      title: "Забіг",
      eventDate: "2026-07-04T21:00:00.000Z",
      location: "Дніпро",
      imageUrl: "https://placehold.co/400x250/blue/white?text=Night+Run",
    },
  ],
  categories: MOCK_CATEGORIES,
  allEvents: [],
};

const MOCK_EVENTS_DB = [
  {
    id: 1,
    title: "Вечір настілок: Dungeons & Dragons",
    description: "Запрошуємо на гру...",
    eventDate: "2026-05-04T18:00:00",
    location: "Київ",
    maxParticipants: 30,
    minAge: 18,
    requiredGender: "Всі",
    organizerId: 1,
    categoryId: 2,
  },
  {
    id: 2,
    title: "Ранкова Йога в парку",
    description: "Беріть килимки та гарний настрій!",
    eventDate: "2026-06-10T07:00:00",
    location: "Львів",
    maxParticipants: 15,
    minAge: 16,
    requiredGender: "Всі",
    bannerPhotoUrl: "https://placehold.co/600x400/orange/white?text=Yoga+Time",
    organizerId: 2,
    categoryId: 1,
  },
];

const MOCK_PROFILE = {
  id: 1,
  userId: 1,
  firstName: "Іван",
  lastName: "Іванов",
  email: "ivan@example.com",
  profileUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  gender: "MALE",
  age: 25,
  bio: "Люблю настільні ігри",
  location: "Київ",
};

const MOCK_PARTICIPANTS = [
  {
    userId: 101,
    name: "Олена Петрівна",
    // avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "PENDING",
  },
  {
    userId: 102,
    name: "Максим Коваленко",
    avatarUrl: null,
    status: "PENDING",
  },
  {
    userId: 103,
    name: "Анна Смик",
    // avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "WAITING",
  },
  {
    userId: 201,
    name: "Дмитро Бондаренко",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "APPROVED",
  },
  {
    userId: 202,
    name: "Вікторія",
    avatarUrl: null,
    status: "APPROVED",
  },
  {
    userId: 203,
    name: "Олексій",
    avatarUrl: "https://randomuser.me/api/portraits/men/85.jpg",
    status: "APPROVED",
  },
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_BASE_URL = `${API_URL}/api`;

function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
}

function getCategoryName(categoryId) {
  const category = MOCK_CATEGORIES.find((cat) => cat.id === categoryId);
  return category ? category.name : "Інше";
}

export async function getHomeData() {
  try {
    const response = await fetch(`${API_BASE_URL}/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    console.warn("getHomeData: Використовуються тестові дані.", error);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_HOME_DATA;
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();
    return toCamelCase(data.categories || data);
  } catch (error) {
    console.warn("getCategories: Використовуються тестові дані.", error);
    return MOCK_CATEGORIES;
  }
}

export async function getUserProfile(userId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) throw new Error("Failed to fetch profile");

    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    console.warn("getUserProfile: Використовуються тестові дані.", error);
    return { ...MOCK_PROFILE, userId };
  }
}

export async function getUserProfileSummary(userId, token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/profiles/${userId}/summary`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch profile summary");

    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    console.warn(
      "getUserProfileSummary: Використовуються тестові дані.",
      error,
    );
    return {
      name: "Іван Іванов",
      email: "ivanovivan",
      // avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    };
  }
}

export async function getEventById(eventId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/events/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.status === 403) throw new Error("ACCESS_DENIED");
    if (!response.ok) throw new Error("Failed to fetch event");

    const data = await response.json();
    const camelCaseData = toCamelCase(data);

    if (camelCaseData.category && typeof camelCaseData.category === "object") {
      camelCaseData.categoryId = camelCaseData.category.id;
      camelCaseData.categoryName = camelCaseData.category.name;
      camelCaseData.categoryIconName = camelCaseData.category.iconName;
    }

    return camelCaseData;
  } catch (error) {
    console.warn("MOCK MODE: Event data");

    const foundEvent = MOCK_EVENTS_DB.find((e) => e.id === Number(eventId));
    const mockData = foundEvent || MOCK_EVENTS_DB[0];

    return {
      ...mockData,
      id: Number(eventId),
      categoryName: getCategoryName(mockData.categoryId),
    };
  }
}

export async function getEventParticipants(eventId, token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/events/${eventId}/participants`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    if (response.status === 403) throw new Error("ACCESS_DENIED");
    if (!response.ok) throw new Error("Failed to fetch participants");

    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    console.warn("getEventParticipants: Використовуються тестові дані.", error);
    if (error.message === "ACCESS_DENIED") throw error;
    return MOCK_PARTICIPANTS;
  }
}

export async function changeParticipantStatus(eventId, userId, status, token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/events/${eventId}/participants/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status }),
      },
    );

    if (!response.ok) throw new Error("Failed to update status");
    return true;
  } catch (error) {
    console.error("changeParticipantStatus: Помилка.", error);
    console.warn("MOCK MODE: Status change simulated successfully");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  }
}
