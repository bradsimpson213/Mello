import React, { useState, useEffect } from "react";
import App from "./App.js"
import AppContext from "./Context";
import { baseUrl } from "./config";

const AppWithContext = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [boardOrg, setBoardOrg] = useState({
    board: { "boardName": "Loading...", "board_image": "url"},
    // cards: {
    //   "card-1": { id: "card-1", title: "Loading..." },
    //   // "card-2": { id: "card-2", title: "Loading..." },
    //   // "card-3": { id: "card-3", title: "Document project in readme file" },
    //   // "card-4": { id: "card-4", title: "Code.  Like a whole lot." },
    //   // "card-5": { id: "card-5", title: "Code some more." },
    // },
    lists: {
      "list-1": {
        id: "list-1",
        title: "Loading...",
        cardIds: [],
      },
      // "list-2": {
      //   id: "list-2",
      //   title: "In progress",
      //   cardIds: ["card-5"],
      // },
      // "list-3": {
      //   id: "list-3",
      //   title: "Completed",
      //   cardIds: [],
      // },
    },
    listOrder: ["list-1"],
  });

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("id"));
    id = JSON.parse(id);
    let isToken = true;
    try {
      isToken = !!JSON.parse(token);
    } catch (err) {};

    if (id && isToken) {
      (async () => {
        const res = await fetch(
          `${baseUrl}/users/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              Authorization: token,
            },
          }
        );
        const { user } = await res.json();
        setUser(user);
        setId(user.id);
        localStorage.setItem("user", JSON.stringify(user));
      })();
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", user.id);
    localStorage.setItem("user", user);
    setToken(token);
    setUser(user);
    setId(user.id);
  };
  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("id", null);
    localStorage.setItem("user", null);
    setToken(null);
    setUser(null);
    setId(null);
  };

  // const boardOrg = {
  //   cards: {
  //     "card-1": { id: "card-1", content: "Create new project" },
  //     "card-2": { id: "card-2", content: "Plan database structure" },
  //     "card-3": { id: "card-3", content: "Document project in readme file" },
  //     "card-4": { id: "card-4", content: "Code.  Like a whole lot." },
  //   },
  //   lists: {
  //     'list-1': {
  //       id: 'list-1', 
  //       title: "Project start to do items",
  //       cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
  //     },
  //   },
  //   listOrder:['list-1'],
  // };

  const context = { login, logout, user, id, boardOrg, setBoardOrg, token };
  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
};

export default AppWithContext;
