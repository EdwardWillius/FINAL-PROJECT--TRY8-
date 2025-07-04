import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();

  const containerStyle = {
    maxWidth: 960,
    margin: '50px auto',
    padding: 32,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    boxShadow: '0 16px 40px rgba(92, 106, 196, 0.15)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.8rem',
    color: '#5C6AC4',
    marginBottom: 20,
    fontWeight: '800',
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: 40,
    fontWeight: '500',
  };

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    flex: '1 1 260px',
    maxWidth: 260,
    padding: '18px 0',
    backgroundColor: '#5C6AC4',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.2rem',
    borderRadius: 14,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(92, 106, 196, 0.4)',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#4757a9';
    e.currentTarget.style.boxShadow = '0 14px 28px rgba(71, 87, 169, 0.6)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#5C6AC4';
    e.currentTarget.style.boxShadow = '0 10px 20px rgba(92, 106, 196, 0.4)';
  };

  return (
    <main style={containerStyle} role="main" aria-label="Admin Panel">
      <h1 style={titleStyle}>Admin Panel</h1>
      <p style={subtitleStyle}>
        Selamat datang di panel admin. Di sini Anda dapat mengelola sistem dengan mudah dan efisien.
      </p>

      <section style={buttonContainer} aria-label="Admin Actions">
        <button
          type="button"
          style={buttonStyle}
          onClick={() => navigate('/admin/update-user/1')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Update User"
        >
          📝 Update User
        </button>

        <button
          type="button"
          style={buttonStyle}
          onClick={() => navigate('/admin/create-category')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Create Category"
        >
          ➕ Create Category
        </button>

        <button
          type="button"
          style={buttonStyle}
          onClick={() => navigate('/admin/create-activity')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Create Activity"
        >
          🏃‍♂️ Create Activity
        </button>
      </section>
    </main>
  );
}

export default AdminPanel;