const MOCK_CATEGORIES = [
  { id: 1, name: "Cпорт та активний відпочинок", iconName: "sport" },
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
    {
      id: 4,
      title: "Стріт-Арт Тур",
      eventDate: "2026-07-22T11:00:00.000Z",
      location: "Харків",
      imageUrl: "https://placehold.co/400x250/green/white?text=Art+Tour",
    },
    {
      id: 5,
      title: "Pitch Day",
      eventDate: "2026-08-12T14:00:00.000Z",
      location: "Київ",
      imageUrl: "https://placehold.co/400x250/red/white?text=Pitch+Day",
    },
  ],
  categories: MOCK_CATEGORIES,
  allEvents: [],
};

const API_BASE_URL = "http://localhost:8080/api";
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
    return data;
  } catch (error) {
    console.warn("Використовуються тестові дані.", error);
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
    return data.categories || data;
  } catch (error) {
    console.warn("Використовуються тестові дані.", error);

    return MOCK_CATEGORIES;
  }
}
