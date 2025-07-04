import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://nandbox.com/wp-content/uploads/2023/12/sportbg-.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 20px',
      }}
    >
      <header style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            textShadow: '3px 3px 8px rgba(0,0,0,0.7)',
            marginBottom: 16,
          }}
        >
          Welcome to Sport Reservation
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.5,
            textShadow: '1px 1px 6px rgba(0,0,0,0.6)',
          }}
        >
          Easily book your favorite sport facilities and manage payments all in one place.
        </p>
      </header>

      <main
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 30,
        }}
      >
        {[
          {
            title: 'Wide Sport Categories',
            description: 'Explore various sports like Futsal, Basket, and Equipment Rentals.',
            icon: '⚽️',
          },
          {
            title: 'Easy Booking',
            description: 'Add your favorite activities to the cart and book instantly.',
            icon: '🛒',
          },
          {
            title: 'Multiple Payment Methods',
            description: 'Choose from various payment options and upload proof easily.',
            icon: '💳',
          },
          {
            title: 'Track Transactions',
            description: 'Review your payment history and transaction details anytime.',
            icon: '📄',
          },
        ].map(({ title, description, icon }) => (
          <div
            key={title}
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 20,
              borderRadius: 12,
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              textAlign: 'center',
              color: '#fff',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 48,
                backgroundColor: '#5C6AC4',
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 0 10px #5C6AC4',
              }}
              aria-label={title + ' icon'}
            >
              {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700' }}>{title}</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.4 }}>{description}</p>
          </div>
        ))}
      </main>

      <footer style={{ textAlign: 'center', marginTop: 40 }}>
        <button
          onClick={() => navigate('/categories')}
          style={{
            backgroundColor: '#5C6AC4',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '16px 40px',
            fontSize: '1.3rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 6px 15px rgba(92, 106, 196, 0.7)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4757a9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5C6AC4')}
          aria-label="Start booking now"
        >
          Start Booking
        </button>
      </footer>
    </div>
  );
}

export default Home;