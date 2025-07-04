import React, { useState } from 'react';

function CancelTransaction() {
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCancel = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!transactionId.trim()) {
      setError('ID transaksi harus diisi');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/cancel/${transactionId.trim()}`, {
        method: 'POST', // sesuai dokumentasi API
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Gagal membatalkan transaksi');
      } else {
        setSuccessMessage(data.message || 'Transaksi berhasil dibatalkan!');
        setTransactionId('');
      }
    } catch {
      setError('Terjadi kesalahan jaringan saat membatalkan transaksi');
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
      <h1 style={{ marginBottom: 24, color: '#5C6AC4' }}>Cancel Transaction</h1>

      {error && (
        <p role="alert" style={{ color: 'red', fontWeight: '600', marginBottom: 16 }}>
          {error}
        </p>
      )}

      {successMessage && (
        <p role="alert" style={{ color: 'green', fontWeight: '600', marginBottom: 16 }}>
          {successMessage}
        </p>
      )}

      <form onSubmit={handleCancel} aria-label="Cancel Transaction Form">
        <label htmlFor="transactionId" style={{ display: 'block', fontWeight: '600', marginBottom: 8 }}>
          Transaction ID
        </label>
        <input
          type="text"
          id="transactionId"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter transaction ID"
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
          {loading ? 'Cancelling...' : 'Cancel Transaction'}
        </button>
      </form>
    </main>
  );
}

export default CancelTransaction;