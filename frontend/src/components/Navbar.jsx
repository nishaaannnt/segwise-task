import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    setIsAuthenticated(!!auth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');

  return (
    <nav className="flex border bg-slate-100 items-center justify-between p-4 text-black">
      <h1 className="text-xl font-bold">App Name</h1>
      <div className="space-x-4 text-white">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-800 rounded hover:bg-red-600">
            Logout
          </button>
        ) : (
          <>
            <button onClick={goToLogin} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
              Login
            </button>
            <button onClick={goToRegister} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
