import React, { useState, useEffect } from 'react';

function CreateActivity() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Ambil kategori dari API saat komponen mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCategories(data.result || []);
        } else {
          setError(data.message || 'Gagal mengambil kategori');
        }
      } catch {
        setError('Terjadi kesalahan jaringan saat mengambil kategori');
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim() || !categoryId || !activityDate) {
      setError('Nama, kategori, dan tanggal aktivitas harus diisi');
      return;
    }

    // Pastikan tanggal aktivitas setelah hari ini
    const today = new Date();
    const selectedDate = new Date(activityDate);
    // Set waktu ke 00:00:00 untuk perbandingan hanya tanggal
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setError('Tanggal aktivitas harus setelah hari ini');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          sport_category_id: categoryId,
          activity_date: activityDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Gagal membuat aktivitas');
      } else {
        setSuccess(true);
        setName('');
        setCategoryId('');
        setActivityDate('');
      }
    } catch {
      setError('Terjadi kesalahan jaringan saat membuat aktivitas');
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
      <h1 style={{ marginBottom: 24, color: '#5C6AC4' }}>Create New Sport Activity</h1>

      {error && (
        <p role="alert" style={{ color: 'red', fontWeight: '600', marginBottom: 16 }}>
          {error}
        </p>
      )}

      {success && (
        <p role="alert" style={{ color: 'green', fontWeight: '600', marginBottom: 16 }}>
          Aktivitas berhasil dibuat!
        </p>
      )}

      <form onSubmit={handleSubmit} aria-label="Create Sport Activity Form">
        <label htmlFor="name" style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
          Activity Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter activity name"
          disabled={loading}
          required
          style={{
            width: '100%',
            padding: '12px 14px',
            marginBottom: 24,
            borderRadius: 8,
            border: '1.5px solid #ccc',
            fontSize: 16,
            outline: 'none',
          }}
        />

        <label htmlFor="category" style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
          Category
        </label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={loading}
          required
          style={{
            width: '100%',
            padding: '12px 14px',
            marginBottom: 24,
            borderRadius: 8,
            border: '1.5px solid #ccc',
            fontSize: 16,
            outline: 'none',
          }}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="activityDate" style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
          Activity Date
        </label>
        <input
          type="date"
          id="activityDate"
          value={activityDate}
          onChange={(e) => setActivityDate(e.target.value)}
          disabled={loading}
          required
          min={new Date().toISOString().split('T')[0]} // minimal hari ini
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
          {loading ? 'Creating...' : 'Create Activity'}
        </button>
      </form>
    </main>
  );
}

export default CreateActivity;