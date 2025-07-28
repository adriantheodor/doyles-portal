import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <img src={logo} alt="Doyle's Logo" style={{ height: "40px", marginRight: "1rem" }} />
        {!user && (
          <>
            <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
            <Link to="/about" style={{ marginRight: "1rem" }}>About</Link>
            <Link to="/contact" style={{ marginRight: "1rem" }}>Contact</Link>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
          </>
        )}

        {user && user.role === 'admin' && (
          <>
            <Link to="/admin-dashboard" style={{ marginRight: "1rem" }}>Admin Home</Link>
            <Link to="/inventory" style={{ marginRight: "1rem" }}>Inventory</Link>
            <Link to="/orders" style={{ marginRight: "1rem" }}>Orders</Link>
            <Link to="/maintenance" style={{ marginRight: "1rem" }}>Maintenance</Link>
            <Link to="/invoices" style={{ marginRight: "1rem" }}>Invoices</Link>
            <Link to="/qr-generator" style={{ marginRight: "1rem" }}>QR Codes</Link>
            <Link to="/partners" style={{ marginRight: "1rem" }}>Partners</Link>
          </>
        )}

        {user && user.role === 'customer' && (
          <>
            <Link to="/customer-dashboard" style={{ marginRight: "1rem" }}>Customer Home</Link>
            {/* Add customer links here as needed */}
          </>
        )}
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: "1rem" }}>Welcome, {user.name}</span>
          <button onClick={handleChangePassword} style={{ marginRight: "0.5rem" }}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;