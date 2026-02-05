import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      event: Model,
      profile: Model,
    },

    seeds(server) {
      server.db.loadData({
        events: [
          {
            id: 1,
            organizer_id: 1,
            title: "Турнір з робототехніки",
            description: "Змагання саморобних роботів серед школярів.",
            status: "ACTIVE",
            event_date: "2026-05-10T10:00:00Z",
            max_participants: 20,
            category_id: 1,
            banner_photo_url: "https://picsum.photos/seed/robot/600/400",
            location: "Київ",
            min_age: 10,
            max_age: 15,
            required_gender: "ANY",
            chat_link: "https://t.me/robot_kids",
          },
          {
            id: 2,
            organizer_id: 1,
            title: "Малювання коміксів",
            description: "Майстер-клас з ілюстрації для підлітків.",
            status: "ACTIVE",
            event_date: "2026-05-12T15:00:00Z",
            max_participants: 12,
            category_id: 2,
            banner_photo_url: "https://picsum.photos/seed/comics/600/400",
            location: "Львів",
            min_age: 12,
            max_age: 17,
            required_gender: "ANY",
            chat_link: "https://t.me/art_teen",
          },
          {
            id: 3,
            organizer_id: 11,
            title: "Юнацька ліга футболу",
            description: "Відкрите тренування та відбір до команди.",
            status: "ACTIVE",
            event_date: "2026-05-14T09:00:00Z",
            max_participants: 30,
            category_id: 3,
            banner_photo_url: "https://picsum.photos/seed/football_jr/600/400",
            location: "Одеса",
            min_age: 17,
            max_age: 20,
            required_gender: "MALE",
            chat_link: "https://t.me/foot_jr",
          },
          {
            id: 4,
            organizer_id: 1,
            title: "Студентський Хакатон",
            description: "24 години кодингу та створення крутих проєктів.",
            status: "ACTIVE",
            event_date: "2026-01-20T10:00:00Z",
            max_participants: 50,
            category_id: 1,
            banner_photo_url: "https://picsum.photos/seed/hack/600/400",
            location: "Київ",
            min_age: 18,
            max_age: 24,
            required_gender: "ANY",
            chat_link: "https://t.me/hack_it",
          },
          {
            id: 5,
            organizer_id: 21,
            title: "Вечірка 'Першокурсник'",
            description: "Головна подія сезону для всіх студентів міста.",
            status: "ACTIVE",
            event_date: "2026-01-22T21:00:00Z",
            max_participants: 200,
            category_id: 5,
            banner_photo_url: "https://picsum.photos/seed/party/600/400",
            location: "Харків",
            min_age: 18,
            max_age: 22,
            required_gender: "ANY",
            chat_link: "https://t.me/uni_party",
          },
          {
            id: 6,
            organizer_id: 22,
            title: "Кіберспорт: Valorant Cup",
            description: "Локальний турнір 5x5. Збери свою команду.",
            status: "ACTIVE",
            event_date: "2026-01-25T14:00:00Z",
            max_participants: 40,
            category_id: 1,
            banner_photo_url: "https://picsum.photos/seed/game/600/400",
            location: "Дніпро",
            min_age: 18,
            max_age: 25,
            required_gender: "ANY",
            chat_link: "https://t.me/val_cup",
          },
          {
            id: 7,
            organizer_id: 30,
            title: "Networking для PM-ів",
            description: "Обмін досвідом та новими кейсами в IT управлінні.",
            status: "ACTIVE",
            event_date: "2026-06-01T19:00:00Z",
            max_participants: 15,
            category_id: 1,
            banner_photo_url: "https://picsum.photos/seed/it_meet/600/400",
            location: "Київ",
            min_age: 18,
            max_age: 30,
            required_gender: "ANY",
            chat_link: "https://t.me/pm_talks",
          },
          {
            id: 8,
            organizer_id: 1,
            title: "Винний вечір: Сомельє-клас",
            description: "Вчимося розрізняти нотки винограду професійно.",
            status: "ACTIVE",
            event_date: "2026-01-03T19:30:00Z",
            max_participants: 10,
            category_id: 4,
            banner_photo_url: "https://picsum.photos/seed/wine/600/400",
            location: "Одеса",
            min_age: 26,
            max_age: 30,
            required_gender: "ANY",
            chat_link: "https://t.me/wine_class",
          },
          {
            id: 9,
            organizer_id: 32,
            title: "Йога-ретріт 'Антистрес'",
            description: "Відпочинок від офісної роботи та медитації.",
            status: "ACTIVE",
            event_date: "2026-06-05T08:00:00Z",
            max_participants: 15,
            category_id: 6,
            banner_photo_url: "https://picsum.photos/seed/yoga/600/400",
            location: "Львів",
            min_age: 27,
            max_age: 30,
            required_gender: "ANY",
            chat_link: "https://t.me/yoga_rest",
          },
          {
            id: 10,
            organizer_id: 40,
            title: "Майстер-клас з інвестицій",
            description: "Куди вкладати капітал у 2026 році.",
            status: "ACTIVE",
            event_date: "2026-06-10T11:00:00Z",
            max_participants: 25,
            category_id: 7,
            banner_photo_url: "https://picsum.photos/seed/invest/600/400",
            location: "Київ",
            min_age: 31,
            max_age: 55,
            required_gender: "ANY",
            chat_link: "https://t.me/invest_pro",
          },
          {
            id: 11,
            organizer_id: 41,
            title: "Джаз та Вечеря",
            description: "Спокійний вечір під живу музику у дворику.",
            status: "ACTIVE",
            event_date: "2026-06-12T20:00:00Z",
            max_participants: 30,
            category_id: 5,
            banner_photo_url: "https://picsum.photos/seed/jazz/600/400",
            location: "Львів",
            min_age: 18,
            max_age: 70,
            required_gender: "ANY",
            chat_link: "https://t.me/jazz_night",
          },
          {
            id: 12,
            organizer_id: 42,
            title: "Гольф для початківців",
            description: "Вступний урок на професійному полі.",
            status: "ACTIVE",
            event_date: "2026-06-15T10:00:00Z",
            max_participants: 8,
            category_id: 3,
            banner_photo_url: "https://picsum.photos/seed/golf/600/400",
            location: "Київ",
            min_age: 18,
            max_age: 100,
            required_gender: "ANY",
            chat_link: "https://t.me/golf_club",
          },
        ],
        eventParticipants: [
          { userId: 1, eventId: 5, registrationStatus: "CONFIRMED" }, // Юзер 1 ходив на івент 2
          { userId: 1, eventId: 6, registrationStatus: "CONFIRMED" },
          { userId: 1, eventId: 3, registrationStatus: "APPROVED" },
          { userId: 1, eventId: 12, registrationStatus: "APPROVED" },
        ],
        profiles: [
          {
            id: 1,
            firstName: "Іван",
            lastName: "Іванов",
            email: "ivanivanov@gmail.com",
            bio: "Мандрівник та поціновувач кави.",
            location: "Київ",
            gender: "Чоловік",
            age: 18,
            social_media_links: [
              "https://instagram.com/test",
              "https://t.me/test",
            ],
            interests_ids: [1, 2, 3],
            rating: 5,
          },
        ], // Можна додати тестовий профіль сюди
      });
    },

    routes() {
      this.urlPrefix = "http://localhost:8080";
      this.namespace = "api/v1";

      this.get("/home", (schema) => {
        // Повертаємо перші 9 івентів як trending
        return {
          trendingEvents: schema.db.events.slice(0, 9),
          categories: [
            { id: 1, name: "Cпорт та активний відпочинок", iconName: "sport" },
            { id: 2, name: "Ігри та хобі", iconName: "games" },
            { id: 3, name: "Соціальні та міські заходи", iconName: "social" },
            { id: 4, name: "Подорожі та поїздки", iconName: "travel" },
            { id: 5, name: "Волонтерство", iconName: "volunteering" },
            { id: 6, name: "Освіта та розвиток", iconName: "education" },
          ],
        };
      });

      this.get("/categories", () => {
        return {
          categories: [
            { id: 1, name: "Cпорт та активний відпочинок", iconName: "sport" },
            { id: 2, name: "Ігри та хобі", iconName: "games" },
            { id: 3, name: "Соціальні та міські заходи", iconName: "social" },
            { id: 4, name: "Подорожі та поїздки", iconName: "travel" },
            { id: 5, name: "Волонтерство", iconName: "volunteering" },
            { id: 6, name: "Освіта та розвиток", iconName: "education" },
          ],
        };
      });

      // EVENTS - Універсальний ендпоїнт (всі або за організатором)
      this.get("/events", (schema, request) => {
        const organizerId = request.queryParams.organizerId;
        if (organizerId) {
          // Шукаємо в базі за ключем organizer_id, приводячи до числа
          return schema.db.events.where({ organizer_id: Number(organizerId) });
        }
        return schema.db.events;
      });

      this.get("/events/:id", (schema, request) => {
        const eventId = request.params.id;
        return (
          schema.db.events.find(eventId) || {
            id: eventId,
            organizer_id: 42,
            title: "Гольф для початківців",
            description: "Вступний урок на професійному полі.",
            status: "ACTIVE",
            event_date: "2026-06-15T10:00:00Z",
            max_participants: 8,
            category_id: 3,
            banner_photo_url: "https://picsum.photos/seed/golf/600/400",
            location: "Київ",
            min_age: 31,
            max_age: 100,
            required_gender: "ANY",
            chat_link: "https://t.me/golf_club",
          }
        );
      });
      this.get("/events/archive", (schema, request) => {
        const userId = Number(request.queryParams.userId);
        const type = request.queryParams.type; // Отримуємо 'created' або 'attended'

        if (!userId) {
          return new Response(400, {}, { error: "userId is required" });
        }

        // 1. Отримуємо всі івенти, де юзер — організатор
        const organizedEvents = schema.db.events.filter(
          (e) => e.organizer_id === userId,
        );

        // 2. Отримуємо івенти, де юзер — учасник
        const participationIds = schema.db.eventParticipants
          .where({ userId: userId })
          .map((p) => p.eventId);
        const attendedEvents = schema.db.events.filter((e) =>
          participationIds.includes(Number(e.id)),
        );

        // ЛОГІКА ФІЛЬТРАЦІЇ ЗА ПАРАМЕТРОМ TYPE
        let finalResults = [];

        if (type === "created") {
          finalResults = organizedEvents;
        } else if (type === "attended") {
          finalResults = attendedEvents;
        } else {
          // Якщо type не вказано (Усі), об'єднуємо обидва списки без дублікатів
          finalResults = [...organizedEvents, ...attendedEvents].filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
          );
        }

        // Повертаємо результат (можна додати сортування від нових до старих)
        const now = new Date();
        return finalResults
          .filter((e) => new Date(e.event_date) < now)
          .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
      });

      // PROFILES
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
            "https://facebook.com/apohorila",
          ],
          interests_ids: [1, 3, 5],
          rating: 5,
        };
      });

      this.post("/profiles", (schema, request) => {
        if (request.requestBody instanceof FormData)
          return { status: "success" };
        const attrs = JSON.parse(request.requestBody);
        return schema.db.profiles.insert(attrs);
      });

      this.put("/profiles/:id", (schema, request) => {
        const id = request.params.id;
        const updatedData = JSON.parse(request.requestBody);
        return { id, ...updatedData, status: "updated" };
      });

      this.delete("/profiles/:id", (schema, request) => {
        return {
          status: "success",
          message: `Profile ${request.params.id} deleted`,
        };
      });

      // REGISTRATION
      this.post("/events/:eventId/register", (schema, request) => {
        const { eventId } = request.params;
        return {
          id: Math.floor(Math.random() * 1000),
          eventId: Number(eventId),
          userId: 1,
          status: "PENDING",
        };
      });
      // В межах функції routes() твого Mirage сервера

      this.post("/events/:id/rate", (schema, request) => {
        try {
          const eventId = request.params.id;
          const attrs = JSON.parse(request.requestBody);

          // 1. Шукаємо івент через .db, щоб уникнути помилок ORM
          const event = schema.db.events.find(eventId);

          if (!event) {
            console.error(`Mirage: Івент з ID ${eventId} не знайдено в БД`);
            return new Response(404, {}, { error: "Івент не знайдено" });
          }

          // 2. Перевіряємо, чи існує таблиця feedbacks (ініціалізуємо її, якщо порожня)
          if (!schema.db.feedbacks) {
            schema.db.createCollection("feedbacks");
          }

          // 3. Зберігаємо відгук
          const newFeedback = schema.db.feedbacks.insert({
            eventId: eventId,
            userId: attrs.userId,
            score: attrs.rating,
            comment: attrs.comment,
            date: new Date().toISOString(),
          });

          console.log("Mirage: Успішно збережено відгук:", newFeedback);

          return new Response(
            201,
            {},
            {
              message: "Оцінка збережена",
              feedback: newFeedback,
            },
          );
        } catch (error) {
          console.error("Mirage Error (500):", error);
          return new Response(500, {}, { error: error.message });
        }
      });

      this.delete("/events/:eventId/register", (schema, request) => {
        return new Response(204);
      });

      this.get("/events/my", (schema, request) => {
        const currentUserId = 1;

        const organizedEvents = schema.db.events.where({
          organizer_id: currentUserId,
        });

        const participationRecords = schema.db.eventParticipants.where({
          userId: currentUserId,
        });

        const participantEventIds = participationRecords.map((p) =>
          Number(p.eventId),
        );
        const attendedEvents = schema.db.events.filter((event) =>
          participantEventIds.includes(Number(event.id)),
        );

        const allMyEvents = [...organizedEvents, ...attendedEvents];

        const uniqueEvents = allMyEvents.filter(
          (event, index, self) =>
            index === self.findIndex((t) => t.id === event.id),
        );

        const now = new Date();
        return uniqueEvents.filter((e) => new Date(e.event_date) > now);
      });
      this.get("/events/user/:userId", (schema, request) => {
        const userId = request.params.userId;
        const events = schema.db.events.where({ organizer_id: Number(userId) });

        const now = new Date();
        return events.filter((e) => new Date(e.event_date) > now);
      });
      this.get("/events/registrations", (schema, request) => {
        const currentUserId = 1;
        const status = request.queryParams.status; // "APPROVED"

        let participationRecords = schema.db.eventParticipants.where({
          userId: currentUserId,
        });

        if (status) {
          participationRecords = participationRecords.filter(
            (p) => p.registrationStatus === status,
          );
        }

        const eventIds = participationRecords.map((p) => Number(p.eventId));
        let events = schema.db.events.find(eventIds);
        const now = new Date();
        events = events.filter((e) => new Date(e.event_date) > now);

        return events;
      });
    },
  });
}
