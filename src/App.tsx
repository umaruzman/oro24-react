import { Route, Routes } from "react-router";
import "./App.css";
import IsAuthorized from "./components/access/IsAuthorized";
import LoginPage from "./pages/LoginPage";
import UnitsPage from "./pages/UnitsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <IsAuthorized>
            <UnitsPage />
          </IsAuthorized>
        }
      />
    </Routes>
  );
}

export default App;
