export async function getHomeData() {
  const res = await fetch("http://localhost:8082/api/v1/home");
  if (!res.ok) {
    throw {
      message: "Failed to fetch popular events",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data;
}

// export const getHomeData = async (userId = null) => {
//   const url = userId
//     ? `${BASE_URL}/api/home/${userId}`
//     : `${BASE_URL}/api/home`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Помилка при завантаженні даних:", error);
//     throw error;
//   }
// };
