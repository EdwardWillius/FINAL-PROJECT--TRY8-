import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Email tidak valid');
      return;
    }
    if (!name.trim()) {
      setError('Nama wajib diisi');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    if (password !== cPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          password,
          c_password: cPassword,
          role: 'user',
          phone_number: phoneNumber.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.message || 'Registrasi gagal');
        setLoading(false);
        return;
      }

      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
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
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '40px 36px',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: 420,
          color: '#333',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          userSelect: 'none',
        }}
        noValidate
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#764ba2', fontWeight: '700', fontSize: 28 }}>
          Register Account
        </h2>

        <label htmlFor="email" style={{ fontWeight: '600' }}>
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
          style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ccc', fontSize: 16, outline: 'none' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#764ba2')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
        />

        <label htmlFor="name" style={{ fontWeight: '600' }}>
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          placeholder="Enter your full name"
          style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ccc', fontSize: 16, outline: 'none' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#764ba2')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
        />

        <label htmlFor="phoneNumber" style={{ fontWeight: '600' }}>
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={loading}
          placeholder="Enter your phone number (optional)"
          style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ccc', fontSize: 16, outline: 'none' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#764ba2')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
        />

        <label htmlFor="password" style={{ fontWeight: '600' }}>
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
          style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ccc', fontSize: 16, outline: 'none' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#764ba2')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
        />

        <label htmlFor="cPassword" style={{ fontWeight: '600' }}>
          Confirm Password
        </label>
        <input
          id="cPassword"
          type="password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          required
          disabled={loading}
          placeholder="Confirm your password"
          style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ccc', fontSize: 16, outline: 'none' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#764ba2')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
        />

        {error && (
          <p style={{ color: '#e53e3e', fontWeight: '600', marginTop: -8, marginBottom: 12, textAlign: 'center' }} role="alert">
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
            transition: 'background-color 0.3s ease',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#5a357e';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#764ba2';
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p style={{ marginTop: 24, fontSize: 14, color: '#666', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#764ba2', fontWeight: '700', textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;