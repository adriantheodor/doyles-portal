import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminDashPage from './pages/AdminDashPage';
import CustomerDashPage from './pages/CustomerDashPage';
import RoleBasedRoute from './components/RoleBasedRoute';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    // Optionally redirect or update UI
  };
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
        <Route path="/admin-dashboard" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashPage /></RoleBasedRoute>}/>
        <Route path="/customer-dashboard" element={<RoleBasedRoute allowedRoles={['customer']}> <CustomerDashPage /> </RoleBasedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
