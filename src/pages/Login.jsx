import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginUser, registerUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Login / Register</h2>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button
        onClick={() =>
          loginUser({
            username,
            password
          })
        }
      >
        Login
      </button>

      <button
        onClick={() =>
          registerUser({
            username,
            newPassword: password
          })
        }
        style={{ marginLeft: 10 }}
      >
        Register
      </button>
    </div>
  );
}