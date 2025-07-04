import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentMethod({ selectedMethodId, setSelectedMethodId }) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const response = await fetch('https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/payment-methods', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.message || 'Failed to fetch payment methods');
        }

        setPaymentMethods(data.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSelect = (id) => {
    setSelectedMethodId(id);
    navigate('/proof'); 
  };

  const selectedMethod = paymentMethods.find((m) => m.id === selectedMethodId);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading payment methods...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  if (paymentMethods.length === 0) return <p style={{ textAlign: 'center' }}>No payment methods available.</p>;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '30px auto',
        padding: 20,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
        borderRadius: 10,
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Select Payment Method</h1>

      <section style={{ marginBottom: 30 }}>
        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          
          <div style={{ flex: '1 1 200px', minWidth: 200 }}>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handleSelect(method.id)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  border:
                    selectedMethodId === method.id ? '2px solid #5C6AC4' : '1px solid #ccc',
                  padding: '10px 15px',
                  backgroundColor: selectedMethodId === method.id ? '#e0e7ff' : '#fafafa',
                  width: '100%',
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.3s ease',
                }}
              >
                <img
                  src={method.image_url}
                  alt={method.name}
                  style={{ width: 50, height: 30, objectFit: 'contain' }}
                />
                <span style={{ fontWeight: '600', fontSize: 16 }}>{method.name}</span>
              </button>
            ))}
          </div>

         
          <div
            style={{
              flex: '1 1 300px',
              minWidth: 300,
              padding: 20,
              border: '1px solid #5C6AC4',
              borderRadius: 8,
              backgroundColor: '#f0f4ff',
              display: selectedMethod ? 'block' : 'none',
            }}
          >
            {selectedMethod && (
              <>
                <img
                  src={selectedMethod.image_url}
                  alt={selectedMethod.name}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', marginBottom: 20 }}
                />
                <h3 style={{ marginBottom: 10 }}>{selectedMethod.name}</h3>
                <p>
                  <strong>Virtual Account Number:</strong> {selectedMethod.virtual_account_number}
                </p>
                <p>
                  <strong>Account Name:</strong> {selectedMethod.virtual_account_name}
                </p>
                <p style={{ fontStyle: 'italic', color: '#555', marginTop: 10 }}>
                  Please transfer the payment to the above virtual account number.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentMethod;