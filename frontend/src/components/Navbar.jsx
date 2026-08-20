import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaTasks, FaSignOutAlt } from 'react-icons/fa';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaTasks style={{ marginRight: '8px' }} />
        Task Dashboard
      </div>
      {user && (
        <div className="nav-user">
          <span>Welcome, {user.name}</span>
          <button className="btn-logout" onClick={logout}>
            <FaSignOutAlt style={{ marginRight: '4px' }} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};