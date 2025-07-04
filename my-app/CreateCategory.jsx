import React, { useState } from 'react';

function CreateCategory() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [createdCategory, setCreatedCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setCreatedCategory(null);

    if (!name.trim()) {
      setError('Nama kategori harus diisi');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Gagal membuat kategori');
      } else {
        setSuccessMessage(data.message || 'Kategori berhasil dibuat!');
        setCreatedCategory(data.result || null);
        setName('');
      }
    } catch {
      setError('Terjadi kesalahan jaringan saat membuat kategori');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 24, color: '#5C6AC4' }}>Create New Sport Category</h1>

      {error && (
        <p role="alert" style={{ color: 'red', fontWeight: '600', marginBottom: 16 }}>
          {error}
        </p>
      )}

      {successMessage && (
        <div
          role="alert"
          style={{
            color: 'green',
            fontWeight: '600',
            marginBottom: 16,
            border: '1px solid green',
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#e6ffe6',
          }}
        >
          <p>{successMessage}</p>
          {createdCategory && (
            <div style={{ marginTop: 8 }}>
              <strong>Created Category Details:</strong>
              <ul style={{ marginTop: 4, paddingLeft: 20 }}>
                <li>ID: {createdCategory.id}</li>
                <li>Name: {createdCategory.name}</li>
                <li>Created At: {new Date(createdCategory.created_at).toLocaleString()}</li>
                <li>Updated At: {new Date(createdCategory.updated_at).toLocaleString()}</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} aria-label="Create Sport Category Form">
        <label htmlFor="name" style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          disabled={loading}
          required
          style={{
            width: '100%',
            padding: '12px 14px',
            marginBottom: 32,
            borderRadius: 8,
            border: '1.5px solid #ccc',
            fontSize: 16,
            outline: 'none',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px 0',
            backgroundColor: '#5C6AC4',
            color: 'white',
            fontWeight: '700',
            fontSize: 18,
            borderRadius: 12,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 20px rgba(92, 106, 196, 0.7)',
            userSelect: 'none',
          }}
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </main>
  );
}

export default CreateCategory;