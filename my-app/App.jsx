import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import SportCategoriesList from './SportCategory.jsx';
import ActivityList from './ActivityList.jsx';
import Location from './Location.jsx';
import Cart from './Cart.jsx';
import PaymentMethod from './PaymentMethod.jsx';
import PaymentProof from './PaymentProof.jsx';
import Transaction from './Transaction.jsx';
import TransactionHistory from './TransactionHistory.jsx';
import Navbar from './Navbar.jsx';
import AdminUpdateUser from './AdminUpdateUser.jsx';
import AdminPanel from './AdminPanel.jsx';

function App() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Protect route for authenticated users
  const RequireAuth = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  // Protect route for admin only
  const RequireAdmin = ({ children }) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') return <Navigate to="/home" replace />;
    return children;
  };

  // Called after successful login
 const handleLogin = () => {
  setIsAuthenticated(true);
  const userRole = localStorage.getItem('userRole');

  if (userRole === 'admin') {
    // Redirect admin ke Admin Panel
    navigate('/admin');
  } else {
    // Redirect user biasa ke Home
    navigate('/home');
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      {/* Show Navbar except on login and register */}
      {window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
        <Navbar onLogout={handleLogout} />
      )}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/categories" element={<RequireAuth><SportCategoriesList cartItems={cartItems} setCartItems={setCartItems} /></RequireAuth>} />
        <Route path="/activities" element={<RequireAuth><ActivityList /></RequireAuth>} />
        <Route path="/location" element={<RequireAuth><Location /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><Cart cartItems={cartItems} setCartItems={setCartItems} /></RequireAuth>} />
        <Route path="/methods" element={<RequireAuth><PaymentMethod selectedMethodId={selectedMethodId} setSelectedMethodId={setSelectedMethodId} /></RequireAuth>} />
        <Route path="/proof" element={<RequireAuth><PaymentProof selectedMethodId={selectedMethodId} cartItems={cartItems} /></RequireAuth>} />
        <Route path="/transaction" element={<RequireAuth><Transaction selectedMethodId={selectedMethodId} cartItems={cartItems} /></RequireAuth>} />
        <Route path="/transactionhistory" element={<RequireAuth><TransactionHistory /></RequireAuth>} />

   
        {/* Admin only routes */}
<Route path="/admin" element={<RequireAuth><RequireAdmin><AdminPanel /></RequireAdmin></RequireAuth>} />
<Route path="/admin/update-user/:userId" element={<RequireAuth><RequireAdmin><AdminUpdateUser /></RequireAdmin></RequireAuth>} />


        {/* Default fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
      </Routes>
    </>
  );
}

export default App;