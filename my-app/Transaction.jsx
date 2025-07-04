import React, { useEffect, useState } from 'react';

function Transaction({ selectedMethodId, cartItems }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedMethodId) {
      setLoading(false);
      return;
    }

    const fetchMethod = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const res = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/payment-methods', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data.error) throw new Error(data.message || 'Failed to fetch payment methods');

        const method = data.result.find(m => m.id === selectedMethodId);
        setSelectedMethod(method || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMethod();
  }, [selectedMethodId]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading transaction details...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  if (!selectedMethodId) return <p style={{ textAlign: 'center' }}>Silakan pilih metode pembayaran terlebih dahulu.</p>;
  if (!selectedMethod) return <p style={{ textAlign: 'center' }}>Metode pembayaran tidak ditemukan.</p>;

  // Contoh data tambahan (bisa diganti dengan data real dari API jika ada)
  const exampleTransactionDetails = {
    invoice_id: 'INV/20241115/181005',
    status: 'success',
    user_id: 3,
    payment_method_id: selectedMethodId,
    total_amount: totalPrice,
    order_date: '2024-11-15',
    expired_date: '2024-11-16',
    created_at: '2024-11-15T13:19:09.000000Z',
    updated_at: '2025-01-28T19:05:07.000000Z',
    proof_payment_url: 'https://sport-reservation-api-bootcamp.do.dibimbing.id/uploads/images/1738090961-busbar-test3.PNG',
  };

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Transaction Summary</h2>

      <section style={{ marginBottom: 20 }}>
        <h3>Transaction Details</h3>
        <p><strong>Invoice ID:</strong> {exampleTransactionDetails.invoice_id}</p>
        <p><strong>Status:</strong> {exampleTransactionDetails.status}</p>
        <p><strong>User ID:</strong> {exampleTransactionDetails.user_id}</p>
        <p><strong>Payment Method ID:</strong> {exampleTransactionDetails.payment_method_id}</p>
        <p><strong>Total Amount:</strong> Rp {exampleTransactionDetails.total_amount.toLocaleString('id-ID')}</p>
        <p><strong>Order Date:</strong> {exampleTransactionDetails.order_date}</p>
        <p><strong>Expired Date:</strong> {exampleTransactionDetails.expired_date}</p>
        <p><strong>Created At:</strong> {new Date(exampleTransactionDetails.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(exampleTransactionDetails.updated_at).toLocaleString()}</p>

        <p><strong>Proof of Payment:</strong></p>
        {exampleTransactionDetails.proof_payment_url ? (
          <img
            src={exampleTransactionDetails.proof_payment_url}
            alt="Proof of Payment"
            style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }}
          />
        ) : (
          <p><em>No proof of payment uploaded</em></p>
        )}
      </section>

      <section style={{ marginBottom: 30 }}>
        <h3>Payment Method</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 10,
            border: '1px solid #5C6AC4',
            borderRadius: 8,
            backgroundColor: '#e0e7ff',
          }}
        >
          <img
            src={selectedMethod.image_url}
            alt={selectedMethod.name}
            style={{ width: 80, height: 40, objectFit: 'contain' }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: '600' }}>{selectedMethod.name}</p>
            <p style={{ margin: 0, fontSize: 14, color: '#555' }}>
              VA: {selectedMethod.virtual_account_number}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3>Items</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Quantity</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
              <th style={{ textAlign: 'right', padding: '8px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{item.name}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{item.qty}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  Rp {item.price.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: '600' }}>
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #5C6AC4' }}>
              <td colSpan={3} style={{ padding: '8px', fontWeight: '700', textAlign: 'right' }}>
                Total
              </td>
              <td style={{ padding: '8px', fontWeight: '700', textAlign: 'right' }}>
                Rp {totalPrice.toLocaleString('id-ID')}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default Transaction;