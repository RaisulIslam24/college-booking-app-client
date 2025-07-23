import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import Admission from "./pages/Admission";
import MyCollege from "./pages/MyCollege";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdmissionForm from "./pages/AdmissionForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 mb-16">
        {" "}
        {/* This allows space for footer and full height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route
            path="/colleges/:id"
            element={
              <ProtectedRoute>
                <CollegeDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/admission" element={<Admission />} />
          <Route
            path="/admission/:id"
            element={
              <ProtectedRoute>
                <AdmissionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-college"
            element={
              <ProtectedRoute>
                <MyCollege />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
