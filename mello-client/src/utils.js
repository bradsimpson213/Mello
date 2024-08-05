

export const buildBoardOrg = (board, cards, lists) => {

    const loadBoardOrg = {
      board: { 'id': board.id, 'boardName': board.board_name, 'boardImage': board.board_image },
      cards: cards,
      lists: lists,
      listOrder: board.list_order,
    };

    return loadBoardOrg;

};

// export const client = (endpoint, { body, ...customConfig } = {}) => {
//   const token = localStorage.getItem("COFFEEHUB_ACCESS_TOKEN");
//   const headers = { "Content-Type": "application/json" };
//   console.log(token);
//   console.log(`body`, body);
//   if (token) {
//     headers.Authorization = `${token}`;
//   }
//   const config = {
//     method: body ? "POST" : "GET",
//     ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     },
//   };
//   if (body) {
//     config.body = JSON.stringify(body);
//   }
//   console.log(config);
//   return fetch(
//     `${process.env.REACT_APP_BACKEND_URL}/api${endpoint}`,
//     config
//   ).then(async (res) => {
//     const data = await res.json();
//     if (res.ok) {
//       return data;
//     } else {
//       return Promise.reject(data);
//     }
//   });
// };

// client("/session/login", { body });