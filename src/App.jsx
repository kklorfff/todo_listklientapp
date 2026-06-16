import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <h1>TODO LIST (next step)</h1> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;