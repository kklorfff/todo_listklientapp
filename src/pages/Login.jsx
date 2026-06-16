import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginUser, registerUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => loginUser({ email, password })}>
        Login
      </button>

      <button onClick={() => registerUser({ email, password })}>
        Register
      </button>
    </div>
  );
}