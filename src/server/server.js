import { createServer } from "miragejs"

export function makeServer() {
  return createServer({
    routes() {
      this.urlPrefix = "http://localhost:8080" 
      this.namespace = "api/v1"

this.get("/home", () => {
  return {
    trendingEvents: [
      { 
        id: 1, 
        title: "Code & Coffee", 
        eventDate: "2026-06-10T09:00:00.000Z", 
        location: "Львів",
        imageUrl: "https://placehold.co/400x250/orange/white?text=Code+Coffee"
      },
      { 
        id: 2, 
        title: "Вечір Настілок", 
        eventDate: "2026-06-15T18:30:00.000Z", 
        location: "Івано-Франківськ",
        imageUrl: "https://placehold.co/400x250/purple/white?text=Board+Games"
      },
      { 
        id: 3, 
        title: "Забіг", 
        eventDate: "2026-07-04T21:00:00.000Z", 
        location: "Дніпро",
        imageUrl: "https://placehold.co/400x250/blue/white?text=Night+Run"
      },
      { 
        id: 4, 
        title: "Стріт-Арт Тур", 
        eventDate: "2026-07-22T11:00:00.000Z", 
        location: "Харків",
        imageUrl: "https://placehold.co/400x250/green/white?text=Art+Tour"
      },
      { 
        id: 5, 
        title: "Pitch Day", 
        eventDate: "2026-08-12T14:00:00.000Z", 
        location: "Київ",
        imageUrl: "https://placehold.co/400x250/red/white?text=Pitch+Day"
      },
      { 
        id: 6, 
        title: "Йога в парку", 
        eventDate: "2026-09-01T08:00:00.000Z", 
        location: "Чернігів",
        imageUrl: "https://placehold.co/400x250/teal/white?text=Yoga"
      },
      { 
        id: 7, 
        title: "Кіно просто неба", 
        eventDate: "2026-09-15T20:00:00.000Z", 
        location: "Малин",
        imageUrl: "https://placehold.co/400x250/black/white?text=Open+Air+Cinema"
      },
      { 
        id: 8, 
        title: "Книжковий клуб", 
        eventDate: "2026-10-05T18:00:00.000Z", 
        location: "Донецьк",
        imageUrl: "https://placehold.co/400x250/brown/white?text=Book+Club"
      },
      { 
        id: 9, 
        title: "New Year Party", 
        eventDate: "2026-12-31T22:00:00.000Z", 
        location: "Чернівці",
        imageUrl: "https://placehold.co/400x250/gold/white?text=NY+Party"
      }
    ],
    categories: [
        {id : 1, name: "Cпорт та активний відпочинок", iconName:"sport"},
        {id : 2, name: "Ігри та хобі", iconName:"games"},
        {id : 3, name: "Соціальні та міські заходи", iconName:"social"},
        {id : 4, name: "Подорожі та поїздки", iconName:"travel"},
        {id : 5, name: "Волонтерство", iconName:"volunteering"},
        {id : 6, name: "Освіта та розвиток", iconName:"education"},
    ],
    
  }
});
this.get("/categories", ()=>{
  return {
    categories : [
      {id : 1, name: "Cпорт та активний відпочинок", iconName:"sport"},
        {id : 2, name: "Ігри та хобі", iconName:"games"},
        {id : 3, name: "Соціальні та міські заходи", iconName:"social"},
        {id : 4, name: "Подорожі та поїздки", iconName:"travel"},
        {id : 5, name: "Волонтерство", iconName:"volunteering"},
        {id : 6, name: "Освіта та розвиток", iconName:"education"},
    ]
  }
})
this.post("/profiles", (schema, request) => {
  let attrs;
  if (request.requestBody instanceof FormData) {
    return { status: 'success' };
  } else {
    attrs = JSON.parse(request.requestBody);
    return schema.profiles.create(attrs);
  }
});
this.get("/profiles/:id", (schema, request) => {
  const profileId = request.params.id; 

  console.log("Mirage отримав запит для профілю з ID:", profileId);

  return {
      id: profileId, 
      firstName: "Іван",
      lastName: "Іванов",
      email: "ivanivanov@gmail.com",
      bio: "Мандрівник, фотограф-аматор та поціновувач якісної кави.",
      location: "Київ",
      gender: "Чоловік",
      age: 18,
      social_media_links: [
        "https://instagram.com/apohorila", 
        "https://github.com/apohorila", 
        "https://t.me/apohorila", 
        "https://facebook.com/apohorila"
      ],
      interests_ids: [1, 3, 5]
  };
});
this.delete("/profiles/:id", (schema, request) => {
  const id = request.params.id;
  
  // Логування для тебе, щоб бачити, що запит дійшов
  console.log(`Mirage: Отримано запит на видалення профілю з ID: ${id}`);

  // Варіант А: Якщо ти використовуєш реальну базу Mirage (найкращий варіант)
  // let profile = schema.profiles.find(id);
  // if (profile) {
  //   profile.destroy();
  //   return new Response(204); // Успіх, контенту немає
  // }

  // Варіант Б: Просто повертаємо успіх (заглушка)
  return { status: "success", message: `Profile ${id} deleted` };
});
// mirage/server.js

this.put("/profiles/:id", (schema, request) => {
  const id = request.params.id;
  
  // Mirage отримує дані як рядок, тому розпаковуємо їх через JSON.parse
  const updatedData = JSON.parse(request.requestBody);

  console.log(`--- Mirage: Оновлення профілю ${id} ---`);
  console.log("Нові дані отримані з фронтенду:", updatedData);
  console.log("---------------------------------------");

  // Повертаємо оновлений об'єкт як успішну відповідь
  return {
    id,
    ...updatedData,
    status: "updated"
  };
});
this.get("/events", () => {
 
   const events =[
     {
      id: 1, organizer_id: 10, title: "Турнір з робототехніки", description: "Змагання саморобних роботів серед школярів.",
      status: "ACTIVE", event_date: "2026-05-10T10:00:00Z", max_participants: 20,
      category_id: 1, banner_photo_url: "https://picsum.photos/seed/robot/600/400",
      location: "Київ", min_age: 10, max_age: 15, required_gender: "ANY", chat_link: "https://t.me/robot_kids"
    },
    {
      id: 2, organizer_id: 11, title: "Малювання коміксів", description: "Майстер-клас з ілюстрації для підлітків.",
      status: "ACTIVE", event_date: "2026-05-12T15:00:00Z", max_participants: 12,
      category_id: 2, banner_photo_url: "https://picsum.photos/seed/comics/600/400",
      location: "Львів", min_age: 12, max_age: 17, required_gender: "ANY", chat_link: "https://t.me/art_teen"
    },
    {
      id: 3, organizer_id: 12, title: "Юнацька ліга футболу", description: "Відкрите тренування та відбір до команди.",
      status: "ACTIVE", event_date: "2026-05-14T09:00:00Z", max_participants: 30,
      category_id: 3, banner_photo_url: "https://picsum.photos/seed/football_jr/600/400",
      location: "Одеса", min_age: 10, max_age: 16, required_gender: "MALE", chat_link: "https://t.me/foot_jr"
    },

    // --- Категорія: range18_25 (18-25 років) ---
    {
      id: 4, organizer_id: 20, title: "Студентський Хакатон", description: "24 години кодингу та створення крутих проєктів.",
      status: "ACTIVE", event_date: "2026-05-20T10:00:00Z", max_participants: 50,
      category_id: 1, banner_photo_url: "https://picsum.photos/seed/hack/600/400",
      location: "Київ", min_age: 18, max_age: 24, required_gender: "ANY", chat_link: "https://t.me/hack_it"
    },
    {
      id: 5, organizer_id: 21, title: "Вечірка 'Першокурсник'", description: "Головна подія сезону для всіх студентів міста.",
      status: "ACTIVE", event_date: "2026-05-22T21:00:00Z", max_participants: 200,
      category_id: 5, banner_photo_url: "https://picsum.photos/seed/party/600/400",
      location: "Харків", min_age: 18, max_age: 22, required_gender: "ANY", chat_link: "https://t.me/uni_party"
    },
    {
      id: 6, organizer_id: 22, title: "Кіберспорт: Valorant Cup", description: "Локальний турнір 5x5. Збери свою команду.",
      status: "ACTIVE", event_date: "2026-05-25T14:00:00Z", max_participants: 40,
      category_id: 1, banner_photo_url: "https://picsum.photos/seed/game/600/400",
      location: "Дніпро", min_age: 18, max_age: 25, required_gender: "ANY", chat_link: "https://t.me/val_cup"
    },

    // --- Категорія: range26_30 (26-30 років) ---
    {
      id: 7, organizer_id: 30, title: "Networking для PM-ів", description: "Обмін досвідом та новими кейсами в IT управлінні.",
      status: "ACTIVE", event_date: "2026-06-01T19:00:00Z", max_participants: 15,
      category_id: 1, banner_photo_url: "https://picsum.photos/seed/it_meet/600/400",
      location: "Київ", min_age: 26, max_age: 30, required_gender: "ANY", chat_link: "https://t.me/pm_talks"
    },
    {
      id: 8, organizer_id: 31, title: "Винний вечір: Сомельє-клас", description: "Вчимося розрізняти нотки винограду професійно.",
      status: "ACTIVE", event_date: "2026-06-03T19:30:00Z", max_participants: 10,
      category_id: 4, banner_photo_url: "https://picsum.photos/seed/wine/600/400",
      location: "Одеса", min_age: 26, max_age: 30, required_gender: "ANY", chat_link: "https://t.me/wine_class"
    },
    {
      id: 9, organizer_id: 32, title: "Йога-ретріт 'Антистрес'", description: "Відпочинок від офісної роботи та медитації.",
      status: "ACTIVE", event_date: "2026-06-05T08:00:00Z", max_participants: 15,
      category_id: 6, banner_photo_url: "https://picsum.photos/seed/yoga/600/400",
      location: "Львів", min_age: 27, max_age: 30, required_gender: "ANY", chat_link: "https://t.me/yoga_rest"
    },

    // --- Категорія: plus30 (31-100 років) ---
    {
      id: 10, organizer_id: 40, title: "Майстер-клас з інвестицій", description: "Куди вкладати капітал у 2026 році.",
      status: "ACTIVE", event_date: "2026-06-10T11:00:00Z", max_participants: 25,
      category_id: 7, banner_photo_url: "https://picsum.photos/seed/invest/600/400",
      location: "Київ", min_age: 31, max_age: 55, required_gender: "ANY", chat_link: "https://t.me/invest_pro"
    },
    {
      id: 11, organizer_id: 41, title: "Джаз та Вечеря", description: "Спокійний вечір під живу музику у дворику.",
      status: "ACTIVE", event_date: "2026-06-12T20:00:00Z", max_participants: 30,
      category_id: 5, banner_photo_url: "https://picsum.photos/seed/jazz/600/400",
      location: "Львів", min_age: 35, max_age: 70, required_gender: "ANY", chat_link: "https://t.me/jazz_night"
    },
    {
      id: 12, organizer_id: 42, title: "Гольф для початківців", description: "Вступний урок на професійному полі.",
      status: "ACTIVE", event_date: "2026-06-15T10:00:00Z", max_participants: 8,
      category_id: 3, banner_photo_url: "https://picsum.photos/seed/golf/600/400",
      location: "Київ", min_age: 31, max_age: 100, required_gender: "ANY", chat_link: "https://t.me/golf_club"
    }
    ]
  return events;
});
this.get("/events/:id", (schema, request) => {
  const eventId = request.params.id; 

  console.log("Mirage отримав запит для профілю з ID:", profileId);

  return {
      id: eventId, organizer_id: 42, title: "Гольф для початківців", description: "Вступний урок на професійному полі.",
      status: "ACTIVE", event_date: "2026-06-15T10:00:00Z", max_participants: 8,
      category_id: 3, banner_photo_url: "https://picsum.photos/seed/golf/600/400",
      location: "Київ", min_age: 31, max_age: 100, required_gender: "ANY", chat_link: "https://t.me/golf_club"
    };
});
this.post("/events/:eventId/register", (schema, request) => {
  const { eventId } = request.params;
  console.log(`Mirage: Створення реєстрації на івент ${eventId}`);
  
  return {
    id: Math.floor(Math.random() * 1000),
    eventId: Number(eventId),
    userId: 1, // Імітуємо ID поточного юзера
    status: "PENDING"
  };
});
this.delete("/events/:eventId/register", (schema, request) => {
  const { eventId } = request.params;
  console.log(`Mirage: Видалення реєстрації для івенту ${eventId}`);
  
  return new Response(204); // Успішно видалено, без контенту
});
    },
  })
}