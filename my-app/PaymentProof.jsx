import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentProof({ selectedMethodId, cartItems }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);
  const navigate = useNavigate();

  
  const paymentMethodsData = [
    {
      id: 1,
      name: 'BCA',
      virtual_account_number: '1234-5678-0001234567',
      virtual_account_name: 'dibimbing',
      image_url: 'https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/bca-logo.svg',
    },
    {
      id: 2,
      name: 'Bank BRI',
      virtual_account_number: '9101-1121-0023456789',
      virtual_account_name: 'dibimbing',
      image_url: 'https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/bri-logo.svg',
    },
    {
      id: 3,
      name: 'Bank Mandiri',
      virtual_account_number: '2718-1223-0045678901',
      virtual_account_name: 'dibimbing',
      image_url: 'https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/mandiri-logo.svg',
    },
    {
      id: 4,
      name: 'Bank BNI',
      virtual_account_number: '5678-1234-0012345678',
      virtual_account_name: 'dibimbing',
      image_url: 'https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/bni-logo.svg',
    },
  ];

  useEffect(() => {
    const method = paymentMethodsData.find((m) => m.id === selectedMethodId);
    setSelectedMethod(method || null);
  }, [selectedMethodId]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu.');
      return;
    }

    
    alert('Transaksi berhasil dikirim!\nTerima kasih telah melakukan pembayaran.');
    navigate('/transaction');
  };

  if (!selectedMethodId)
    return (
      <p style={{ textAlign: 'center', marginTop: 40, fontSize: 18 }}>
        Silakan pilih metode pembayaran terlebih dahulu.
      </p>
    );
  if (!selectedMethod)
    return (
      <p style={{ textAlign: 'center', marginTop: 40, fontSize: 18 }}>
        Metode pembayaran tidak ditemukan.
      </p>
    );

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '40px auto',
        padding: 24,
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#5C6AC4' }}>
        Upload Bukti Pembayaran (Opsional)
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <div
          style={{
            flex: '1 1 250px',
            maxWidth: 250,
            borderRadius: 12,
            border: '1px solid #ddd',
            padding: 16,
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            boxShadow: 'inset 0 0 6px rgba(92, 106, 196, 0.1)',
          }}
        >
          <img
            src={selectedMethod.image_url}
            alt={selectedMethod.name}
            style={{ maxWidth: '100%', height: 'auto', marginBottom: 16 }}
          />
          <h3 style={{ margin: '0 0 8px', color: '#333' }}>{selectedMethod.name}</h3>
          <p style={{ margin: '4px 0', fontWeight: '600', color: '#555' }}>
            Virtual Account:
          </p>
          <p
            style={{
              marginTop: 0,
              marginBottom: 8,
              fontWeight: '700',
              fontSize: 16,
              color: '#111',
              wordBreak: 'break-word',
            }}
          >
            {selectedMethod.virtual_account_number}
          </p>
          <p style={{ margin: '4px 0', fontWeight: '600', color: '#555' }}>
            Atas Nama:
          </p>
          <p style={{ marginTop: 0, color: '#666' }}>{selectedMethod.virtual_account_name}</p>
          <p
            style={{
              fontStyle: 'italic',
              fontSize: 13,
              color: '#777',
              marginTop: 12,
              lineHeight: 1.3,
            }}
          >
            Silakan transfer sesuai nominal di bawah, lalu upload bukti pembayaran.
          </p>
        </div>

        <div
          style={{
            flex: '2 1 380px',
            backgroundColor: '#f0f4ff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 12px rgba(92, 106, 196, 0.2)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="payment-proof-upload"
              style={{
                display: 'block',
                padding: '14px 20px',
                backgroundColor: '#5C6AC4',
                color: 'white',
                borderRadius: 8,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
                cursor: 'pointer',
                userSelect: 'none',
                marginBottom: 16,
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4757a9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5C6AC4')}
            >
              {paymentProof ? 'Ganti File Bukti Pembayaran' : 'Pilih File Bukti Pembayaran (Opsional)'}
            </label>
            <input
              id="payment-proof-upload"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {paymentProof && (
              <div
                style={{
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                {paymentProof.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(paymentProof)}
                    alt="Preview Bukti Pembayaran"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 250,
                      borderRadius: 10,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  />
                ) : (
                  <p
                    style={{
                      fontStyle: 'italic',
                      color: '#555',
                      fontWeight: '600',
                      userSelect: 'text',
                    }}
                  >
                    File terpilih: {paymentProof.name}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 0',
                backgroundColor: '#5C6AC4',
                color: 'white',
                borderRadius: 10,
                border: 'none',
                fontWeight: '700',
                fontSize: 18,
                cursor: 'pointer',
                userSelect: 'none',
                boxShadow: '0 6px 20px rgba(92, 106, 196, 0.7)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4757a9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5C6AC4')}
            >
              Kirim Bukti Pembayaran
            </button>
          </form>
        </div>
      </div>

     
      <section style={{ marginTop: 40 }}>
        <h3
          style={{
            borderBottom: '2px solid #5C6AC4',
            paddingBottom: 8,
            marginBottom: 16,
            color: '#333',
          }}
        >
          Ringkasan Transaksi
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', backgroundColor: '#f7f9ff' }}>
              <th style={{ textAlign: 'left', padding: 12 }}>Item</th>
              <th style={{ textAlign: 'right', padding: 12 }}>Quantity</th>
              <th style={{ textAlign: 'right', padding: 12 }}>Price</th>
              <th style={{ textAlign: 'right', padding: 12 }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{item.name}</td>
                <td style={{ padding: 12, textAlign: 'right' }}>{item.qty}</td>
                <td style={{ padding: 12, textAlign: 'right' }}>
                  Rp {item.price.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: 12, textAlign: 'right', fontWeight: '600' }}>
                  Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #5C6AC4', backgroundColor: '#eef2ff' }}>
              <td colSpan={3} style={{ padding: 12, fontWeight: '700', textAlign: 'right' }}>
                Total
              </td>
              <td style={{ padding: 12, fontWeight: '700', textAlign: 'right' }}>
                Rp {totalPrice.toLocaleString('id-ID')}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default PaymentProof;