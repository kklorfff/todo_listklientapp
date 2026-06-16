import { createContext, useState } from "react";
import { login, register, setToken } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [token, setTokenState] = useState(
    localStorage.getItem("token")
  );

  // LOGIN
  async function loginUser(data) {
    const res = await login(data);

    setToken(res.access_token);
    setTokenState(res.access_token);

    localStorage.setItem("token", res.access_token);

    setUser(data.email);
    localStorage.setItem("user", JSON.stringify(data.email));
  }

  // REGISTER
  async function registerUser(data) {
    await register(data);
    return loginUser(data);
  }

  // LOGOUT
  function logout() {
    setUser(null);
    setTokenState(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        registerUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;