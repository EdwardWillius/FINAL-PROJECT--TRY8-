import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AdminUpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'user',
    phone_number: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validasi sederhana
    if (!user.name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!validateEmail(user.email)) {
      setError('Invalid email address.');
      return;
    }
    if (!['user', 'admin'].includes(user.role)) {
      setError('Invalid role selected.');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      console.log('Sending update:', user);

      const res = await fetch(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/update-user/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('API error response:', errorData);
        throw new Error(errorData.message || `Failed to update user: ${res.status}`);
      }

      alert('User updated successfully');
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 24, color: '#5C6AC4' }}>Update User #{userId}</h2>
      <p style={{ marginBottom: 24, color: '#666' }}>
        API tidak menyediakan data user, silakan isi data secara manual.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name" style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={user.name}
          onChange={handleChange}
          required
          placeholder="Enter user name"
          disabled={saving}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: '1.5px solid #ccc',
            fontSize: 16,
          }}
          aria-invalid={error && error.toLowerCase().includes('name') ? 'true' : 'false'}
        />

        <label htmlFor="email" style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
          placeholder="Enter user email"
          disabled={saving}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: '1.5px solid #ccc',
            fontSize: 16,
          }}
          aria-invalid={error && error.toLowerCase().includes('email') ? 'true' : 'false'}
        />

        <label htmlFor="phone_number" style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>
          Phone Number
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          value={user.phone_number}
          onChange={handleChange}
          placeholder="Optional"
          disabled={saving}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 16,
            borderRadius: 6,
            border: '1.5px solid #ccc',
            fontSize: 16,
          }}
        />

        <label htmlFor="role" style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>
          Role
        </label>
        <select
          id="role"
          name="role"
          value={user.role}
          onChange={handleChange}
          disabled={saving}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 24,
            borderRadius: 6,
            border: '1.5px solid #ccc',
            fontSize: 16,
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {error && (
          <p style={{ color: 'red', marginBottom: 16, fontWeight: '600' }} role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '14px 0',
            backgroundColor: '#5C6AC4',
            color: 'white',
            fontWeight: '700',
            fontSize: 18,
            borderRadius: 10,
            border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            width: '100%',
            boxShadow: '0 6px 20px rgba(92, 106, 196, 0.7)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!saving) e.currentTarget.style.backgroundColor = '#4757a9';
          }}
          onMouseLeave={(e) => {
            if (!saving) e.currentTarget.style.backgroundColor = '#5C6AC4';
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

export default AdminUpdateUser;