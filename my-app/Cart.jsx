import React, { useState } from 'react';

const sportCategories = [
  { id: 1, name: 'Sport' },
  { id: 2, name: 'Lapangan' },
  { id: 3, name: 'Sewa Perlengkapan dan Karcis' },
];

function Cart({ cartItems, setCartItems }) {
  // State untuk identitas user
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  // Ubah quantity item di cart
  const handleQtyChange = (itemId, qty) => {
    let quantity = Number(qty);
    if (isNaN(quantity) || quantity < 0) quantity = 0;

    if (quantity === 0) {
      // Hapus item jika qty 0
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === itemId ? { ...item, qty: quantity } : item
        )
      );
    }
  };

  // Ubah harga item di cart, minimal 100.000, kelipatan 100.000
  const handlePriceChange = (itemId, price) => {
    let inputPrice = Number(price);
    if (isNaN(inputPrice) || inputPrice < 100000) inputPrice = 100000;

    // Bulatkan ke kelipatan 100.000 terdekat
    const roundedPrice = Math.round(inputPrice / 100000) * 100000;

    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, price: roundedPrice } : item
      )
    );
  };

  // Validasi data user sederhana
  const validateUserData = () => {
    const errs = {};
    if (!userData.name.trim()) errs.name = 'Nama wajib diisi.';
    if (
      !userData.email.trim() ||
      !/^\S+@\S+\.\S+$/.test(userData.email.trim())
    )
      errs.email = 'Email tidak valid.';
    if (
      !userData.phone.trim() ||
      !/^\+?[\d\s\-]{6,15}$/.test(userData.phone.trim())
    )
      errs.phone = 'Nomor telepon tidak valid.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUserData()) return;

    // Contoh proses order (bisa lanjut ke pembayaran atau API)
    alert(`Terima kasih, ${userData.name}! Pesanan Anda dengan total Rp ${totalPrice.toLocaleString('id-ID')} telah diproses.`);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: '20px auto', padding: 20, textAlign: 'center' }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // Kelompokkan item berdasarkan kategori
  const groupedItems = sportCategories
    .map(category => ({
      ...category,
      items: cartItems.filter(item => item.categoryId === category.id),
    }))
    .filter(group => group.items.length > 0);

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ marginBottom: 20, color: '#5C6AC4' }}>Your Cart</h2>

      {/* Form identitas user */}
      <form onSubmit={handleSubmit} noValidate style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 16, color: '#333' }}>Identitas Pemesan</h3>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name" style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleUserDataChange}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 6,
              border: errors.name ? '2px solid #e53e3e' : '1.5px solid #ccc',
              fontSize: 16,
              outline: 'none',
            }}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" style={{ color: '#e53e3e', marginTop: 4, fontSize: 14 }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleUserDataChange}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 6,
              border: errors.email ? '2px solid #e53e3e' : '1.5px solid #ccc',
              fontSize: 16,
              outline: 'none',
            }}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" style={{ color: '#e53e3e', marginTop: 4, fontSize: 14 }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <label htmlFor="phone" style={{ display: 'block', fontWeight: '600', marginBottom: 4 }}>
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleUserDataChange}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 6,
              border: errors.phone ? '2px solid #e53e3e' : '1.5px solid #ccc',
              fontSize: 16,
              outline: 'none',
            }}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <p id="phone-error" style={{ color: '#e53e3e', marginTop: 4, fontSize: 14 }}>
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#5C6AC4',
            color: 'white',
            fontWeight: '700',
            fontSize: 18,
            padding: '12px 20px',
            borderRadius: 10,
            border: 'none',
            cursor: 'pointer',
            userSelect: 'none',
            width: '100%',
            marginBottom: 30,
            boxShadow: '0 6px 20px rgba(92, 106, 196, 0.7)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4757a9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5C6AC4')}
        >
          Submit Order
        </button>
      </form>

      {/* Daftar item keranjang */}
      {groupedItems.map(group => (
        <div key={group.id} style={{ marginBottom: 30 }}>
          <h3 style={{ borderBottom: '2px solid #5C6AC4', paddingBottom: 8 }}>{group.name}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #5C6AC4' }}>
                <th style={{ textAlign: 'left', padding: 8 }}>Activity</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Price (Rp)</th>
                <th style={{ textAlign: 'center', padding: 8 }}>Quantity</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Subtotal (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {group.items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: 8 }}>{item.name}</td>
                  <td style={{ padding: 8, textAlign: 'right' }}>
                    <input
                      type="number"
                      min="100000"
                      step="100000"
                      value={item.price}
                      onChange={(e) => handlePriceChange(item.id, e.target.value)}
                      style={{ width: 100, textAlign: 'right', padding: 4, fontSize: 14 }}
                      aria-label={`Price for ${item.name}`}
                    />
                  </td>
                  <td style={{ padding: 8, textAlign: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item.id, e.target.value)}
                      style={{ width: 60, textAlign: 'center', padding: 4 }}
                      aria-label={`Quantity for ${item.name}`}
                    />
                  </td>
                  <td style={{ padding: 8, textAlign: 'right', fontWeight: '600' }}>
                    { (item.price * item.qty).toLocaleString('id-ID') }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div style={{ textAlign: 'right', fontWeight: '700', fontSize: 18 }}>
        Total: Rp {totalPrice.toLocaleString('id-ID')}
      </div>
    </div>
  );
}

export default Cart;