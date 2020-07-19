import React, { useState, useEffect } from "react";
import App from "./App.js"
import AppContext from "./Context";
import { baseUrl } from "./config";

const AppWithContext = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

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
//   const logout = () => {
//     localStorage.setItem("token", null);
//     localStorage.setItem("id", null);
//     localStorage.setItem("user", null);
//     setToken(null);
//     setUser(null);
//     setId(null);
//   };

  const context = { login, user, id };
  return (
    <AppContext.Provider value={context}>
      <App />
    </AppContext.Provider>
  );
};

export default AppWithContext;
