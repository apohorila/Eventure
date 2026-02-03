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
      bannerPhotoUrl:
        "https://placehold.co/400x250/orange/white?text=Code+Coffee",
    },
    {
      id: 2,
      title: "Вечір Настілок",
      eventDate: "2026-06-15T18:30:00.000Z",
      location: "Івано-Франківськ",
      bannerPhotoUrl:
        "https://placehold.co/400x250/purple/white?text=Board+Games",
    },
    {
      id: 3,
      title: "Забіг",
      eventDate: "2026-07-04T21:00:00.000Z",
      location: "Дніпро",
      bannerPhotoUrl: "https://placehold.co/400x250/blue/white?text=Night+Run",
    },
    {
      id: 4,
      title: "Стріт-Арт Тур",
      eventDate: "2026-07-22T11:00:00.000Z",
      location: "Харків",
      bannerPhotoUrl: "https://placehold.co/400x250/green/white?text=Art+Tour",
    },
    {
      id: 5,
      title: "Pitch Day",
      eventDate: "2026-08-12T14:00:00.000Z",
      location: "Київ",
      bannerPhotoUrl: "https://placehold.co/400x250/red/white?text=Pitch+Day",
    },
    {
      id: 6,
      title: "Йога в парку",
      eventDate: "2026-09-01T08:00:00.000Z",
      location: "Чернігів",
      bannerPhotoUrl: "https://placehold.co/400x250/teal/white?text=Yoga",
    },
    {
      id: 7,
      title: "Кіно просто неба",
      eventDate: "2026-09-15T20:00:00.000Z",
      location: "Малин",
      bannerPhotoUrl:
        "https://placehold.co/400x250/black/white?text=Open+Air+Cinema",
    },
    {
      id: 8,
      title: "Книжковий клуб",
      eventDate: "2026-10-05T18:00:00.000Z",
      location: "Донецьк",
      bannerPhotoUrl: "https://placehold.co/400x250/brown/white?text=Book+Club",
    },
    {
      id: 9,
      title: "New Year Party",
      eventDate: "2026-12-31T22:00:00.000Z",
      location: "Чернівці",
      bannerPhotoUrl: "https://placehold.co/400x250/gold/white?text=NY+Party",
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
    bannerPhotoUrl: "https://placehold.co/600x400/purple/white?text=D&D", // Додав imageUrl для картки
    organizerId: 1,
    categoryId: 2,
  },
  {
    id: 2,
    title: "Ранкова Йога в парку",
    description: "Беріть килимки...",
    eventDate: "2026-06-10T07:00:00",
    location: "Львів",
    bannerPhotoUrl: "https://placehold.co/600x400/orange/white?text=Yoga",
    organizerId: 2,
    categoryId: 1,
  },

  {
    id: 3,
    title: "Майстер-клас з кераміки",
    eventDate: "2026-07-15T14:00:00",
    location: "Київ",
    bannerPhotoUrl: "https://placehold.co/600x400/brown/white?text=Ceramics",
    organizerId: 1,
    categoryId: 2,
  },
  {
    id: 4,
    title: "IT Conference 2026 Code & Coffee",
    eventDate: "2026-08-20T10:00:00",
    location: "Київ, Online",
    bannerPhotoUrl: "https://placehold.co/600x400/blue/white?text=IT+Conf",
    organizerId: 1,
    categoryId: 6,
  },
  {
    id: 5,
    title: "Благодійний забіг",
    eventDate: "2026-09-01T09:00:00",
    location: "Одеса",
    bannerPhotoUrl: "https://placehold.co/600x400/green/white?text=Run",
    organizerId: 1,
    categoryId: 1,
  },

  {
    id: 6,
    title: "Code & Coffee",
    eventDate: "2026-06-10T09:00:00.000Z",
    location: "Львів",
    bannerPhotoUrl:
      "https://placehold.co/400x250/orange/white?text=Code+Coffee",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 7,
    title: "Вечір Настілок",
    eventDate: "2026-06-15T18:30:00.000Z",
    location: "Івано-Франківськ",
    bannerPhotoUrl:
      "https://placehold.co/400x250/purple/white?text=Board+Games",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 8,
    title: "Забіг",
    eventDate: "2026-07-04T21:00:00.000Z",
    location: "Дніпро",
    bannerPhotoUrl: "https://placehold.co/400x250/blue/white?text=Night+Run",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 9,
    title: "Стріт-Арт Тур",
    eventDate: "2026-07-22T11:00:00.000Z",
    location: "Харків",
    bannerPhotoUrl: "https://placehold.co/400x250/green/white?text=Art+Tour",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 10,
    title: "Pitch Day",
    eventDate: "2026-08-12T14:00:00.000Z",
    location: "Київ",
    bannerPhotoUrl: "https://placehold.co/400x250/red/white?text=Pitch+Day",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 11,
    title: "Йога в парку",
    eventDate: "2026-09-01T08:00:00.000Z",
    location: "Чернігів",
    bannerPhotoUrl: "https://placehold.co/400x250/teal/white?text=Yoga",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 12,
    title: "Кіно просто неба",
    eventDate: "2026-09-15T20:00:00.000Z",
    location: "Малин",
    bannerPhotoUrl:
      "https://placehold.co/400x250/black/white?text=Open+Air+Cinema",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 13,
    title: "Книжковий клуб",
    eventDate: "2026-10-05T18:00:00.000Z",
    location: "Донецьк",
    bannerPhotoUrl: "https://placehold.co/400x250/brown/white?text=Book+Club",
    organizerId: 1,
    categoryId: 1,
  },
  {
    id: 14,
    title: "New Year Party",
    eventDate: "2026-12-31T22:00:00.000Z",
    location: "Чернівці",
    bannerPhotoUrl: "https://placehold.co/400x250/gold/white?text=NY+Party",
    organizerId: 1,
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
    id: 101,
    userId: 1,
    name: "Іван Іванов",
    status: "APPROVED",
  },
  {
    id: 101,
    name: "Олена Петрівна",
    picture: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "PENDING",
  },
  {
    id: 102,
    name: "Максим Коваленко",
    picture: null,
    status: "PENDING",
  },
  {
    id: 201,
    name: "Дмитро Бондаренко",
    picture: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "PENDING",
  },
  {
    id: 202,
    name: "Вікторія",
    picture: null,
    status: "APPROVED",
  },
  {
    id: 203,
    name: "Олексій",
    picture: "https://randomuser.me/api/portraits/men/85.jpg",
    status: "APPROVED",
  },
  {
    id: 105,
    name: "Сергій",
    picture: null,
    status: "DENIED", // додав для тестування відхилених
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
    // const processedData = toCamelCase(data);
    // console.log("Дані з Mirage:", data);
    // console.log("Дані після CamelCase:", processedData);
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
export async function getEventsByOrganizer(organizerId, token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/events?organizerId=${organizerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch organizer events");

    const data = await response.json();
    console.log(data);
    return toCamelCase(data);
  } catch (error) {
    console.error("Помилка при отриманні івентів організатора:", error);
    return [];
  }
}
export const registerForEvent = async (eventId, token) => {
  const response = await fetch(
    `${API_BASE_URL}/v1/events/${eventId}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }
  return await response.json();
};
export const unregisterFromEvent = async (eventId, token) => {
  const response = await fetch(
    `${API_BASE_URL}/v1/events/${eventId}/register`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) throw new Error("Не вдалося скасувати реєстрацію");
  return true;
};

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

export async function getEventsArchive(userId, token, type) {
  try {
    let url = `${API_BASE_URL}/v1/events/archive?userId=${userId}`;
    if (type) {
      url += `&type=${type}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { AUthorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      throw "Couldn't fetch data";
    }
    const data = await response.json();
    return toCamelCase(data);
  } catch (err) {
    console.error("Couldn't fetch", err);
    return [];
  }
}
export async function getAllEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/events`, {
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
    console.warn(
      "getAllEvents: Використовуються тестові дані (MOCK_EVENTS_DB).",
      error,
    );

    await new Promise((resolve) => setTimeout(resolve, 300));

    return toCamelCase(MOCK_EVENTS_DB);
  }
}

export async function getCreatedEvents(userId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/events/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) throw new Error("Failed to fetch created events");
    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    const created = MOCK_EVENTS_DB.filter(
      (e) => e.organizerId === Number(userId),
    );
    const result =
      created.length > 0
        ? created
        : MOCK_EVENTS_DB.filter((e) => e.organizerId === 1);
    return toCamelCase(result);
  }
}

export async function getRegisteredEvents(status = "APPROVED", token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/events/registrations?status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw new Error("Failed to fetch registrations");
    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    const registered = MOCK_EVENTS_DB.filter((e) => e.organizerId !== 1);
    return toCamelCase(registered);
  }
}

export async function getMyTotalEvents(token, status = "APPROVED") {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/events/my?status=${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw new Error("Failed to fetch my total events");
    const data = await response.json();
    return toCamelCase(data);
  } catch (error) {
    return toCamelCase(MOCK_EVENTS_DB);
  }
}
