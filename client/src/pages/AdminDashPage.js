import { useNavigate } from 'react-router-dom';



const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
  <div>
    <h1>Admin Dashboard</h1>
    <button onClick={handleLogout}>Log Out</button>
  </div>
  );
};
export default AdminDashboardPage;
