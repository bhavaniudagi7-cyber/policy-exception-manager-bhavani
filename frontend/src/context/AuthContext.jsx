import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const login = async (username, password) => {

    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const jwtToken = response.data.token;

    localStorage.setItem("token", jwtToken);

    setToken(jwtToken);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  return useContext(AuthContext);
};