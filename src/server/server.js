import { createServer } from "miragejs"

export function makeServer() {
  return createServer({
    routes() {
      this.urlPrefix = "http://localhost:8082" 
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
    },
  })
}