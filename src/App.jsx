import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/:cafeSlug" element={<MenuPage />} />

        <Route
          path="/admin/:cafeSlug"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/owner/:cafeSlug"
          element={
            <DashboardLayout>
              <OwnerDashboard />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
