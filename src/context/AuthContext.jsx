import { createContext, useState, useEffect } from "react";
import { login, register, setToken } from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [tokenState, setTokenState] = useState(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (tokenState) {
      setToken(tokenState);
    }
  }, [tokenState]);

  async function loginUser(data) {
    const res = await login(data);

    setToken(res.access_token);
    setTokenState(res.access_token);

    localStorage.setItem("token", res.access_token);
    localStorage.setItem("user", data.username);

    setUser(data.username);

    navigate("/todo");
  }

  async function registerUser(data) {
    const res = await register(data);

    if (res.access_token) {
      setToken(res.access_token);
      setTokenState(res.access_token);

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", data.username);

      setUser(data.username);

      navigate("/todo");
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    setTokenState(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token: tokenState,
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