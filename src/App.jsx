import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}