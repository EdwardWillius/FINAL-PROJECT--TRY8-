import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role user
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.message || 'Login gagal. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      const token = data.result?.token || null;

      if (token) {
        localStorage.setItem('token', token);
      } else {
        // Token fallback untuk testing (opsional)
        localStorage.setItem(
          'token',
          '1718|OFfZIGctEPqyU8AFVqWGmnPNuqssG9Ylk82MG6II5e0836e4'
        );
      }

      // Simpan role sesuai pilihan radio button
      localStorage.setItem('userRole', role);

      setLoading(false);

      if (onLogin) onLogin(); // beri tahu App sudah login

      // Hapus navigate('/home') agar App yang mengatur redirect
      // navigate('/home');
    } catch {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: 900,
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#333',
          }}
        >
          <h2
            style={{
              marginBottom: 32,
              fontWeight: '700',
              fontSize: 32,
              userSelect: 'none',
              color: '#4a4a4a',
            }}
          >
            Welcome Back
          </h2>

          <label htmlFor="email" style={{ fontWeight: '600', marginBottom: 8 }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your email"
            style={{
              padding: '14px 16px',
              marginBottom: 24,
              borderRadius: 10,
              border: '1.5px solid #ccc',
              fontSize: 16,
              outline: 'none',
            }}
          />

          <label htmlFor="password" style={{ fontWeight: '600', marginBottom: 8 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your password"
            style={{
              padding: '14px 16px',
              marginBottom: 16,
              borderRadius: 10,
              border: '1.5px solid #ccc',
              fontSize: 16,
              outline: 'none',
            }}
          />

          <fieldset style={{ marginBottom: 24, border: 'none', padding: 0 }}>
            <legend style={{ fontWeight: '600', marginBottom: 8 }}>Login as</legend>
            <label style={{ marginRight: 20, cursor: 'pointer' }}>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
                disabled={loading}
                style={{ marginRight: 6 }}
              />
              User
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                disabled={loading}
                style={{ marginRight: 6 }}
              />
              Admin
            </label>
          </fieldset>

          {error && (
            <p style={{ color: '#e53e3e', marginBottom: 24, fontWeight: '600' }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '16px 0',
              backgroundColor: '#764ba2',
              color: 'white',
              fontWeight: '700',
              fontSize: 18,
              borderRadius: 12,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 20px rgba(118, 75, 162, 0.7)',
              userSelect: 'none',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p
            style={{
              marginTop: 24,
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
            }}
          >
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#764ba2', fontWeight: '700', textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;