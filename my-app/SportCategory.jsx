import React, { useEffect, useState } from 'react';

// Deskripsi kategori olahraga
const categoryDescriptions = {
  'Mini Soccer': 'Miniature soccer game with smaller fields and fewer players.',
  Badminton: 'A racket sport played by two or four players on a small court.',
  Baseball: 'A bat-and-ball sport involving hitting a pitched ball and running bases.',
  Squash: 'An indoor racket sport played by hitting a ball against walls.',
  Hockey: 'A team sport played with sticks and a puck or ball on ice or field.',
  Running: 'Physical activity of running for fitness or competition.',
  Padel: 'A racket sport similar to tennis but played on a smaller court enclosed by walls.',
  'Tenis Meja': 'Table tennis played on a table with lightweight paddles and a small ball.',
  Fitnes: 'Physical exercises and activities to improve health and fitness.',
  Elektronik: 'Competitive electronic sports using video games as a medium.',
  Billiard: 'Cue sport played on a table with balls and a cue stick.',
  'Bulu Tangkis': 'Another term for badminton, a racket sport played indoors or outdoors.',
  Futsal: 'Indoor soccer played with fewer players on a smaller field.',
  Basketball: 'A team sport where players aim to score by shooting a ball through a hoop.',
  'Lari Sendiri': 'Individual running activity for fitness or competitive racing.',
  'Sepak Bola': 'Popular team sport played worldwide involving a ball and goals.',
  Golf: 'Sport where players hit balls into holes on a course with as few strokes as possible.',
};

function SportCategoriesList({ cartItems, setCartItems }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Gambar kategori
  const categoryImages = {
    'Mini Soccer': 'https://www.pijarnews.com/wp-content/uploads/2023/06/IMG-20230621-WA0114.jpg',
    Badminton: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKTFxkxuM9tesiyCUhgqtuM7XcW5jaM12cQ&s',
    Baseball: 'https://img.okezone.com/content/2022/09/20/43/2671641/ini-alasan-mengapa-baseball-sangat-populer-di-jepang-xeaNP24MqX.jpg',
    Squash: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Semifinal_Squash_SM_2021.jpg/960px-Semifinal_Squash_SM_2021.jpg',
    Hockey: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_md/f_auto/primary/b2unl1gppjiic0fld0em',
    Running: 'https://www.visitmelbourne.com/-/media/atdw/melbourne/whats-on/sports/running/5168d409d36ba069038da8c7ff91920a_1600x1200.jpeg?ts=20250128340214',
    Padel: 'https://media.istockphoto.com/id/500947607/photo/men-playing-paddle-tennis.jpg?s=1024x1024&w=is&k=20&c=QNnAVb6I4-H8KU9dDkG2rfFdrwvk8Mtwps2QTway9bI=',
    'Tenis Meja': 'https://malangpost.id/wp-content/uploads/2021/07/tenis-meja.jpg',
    Fitnes: 'https://1upnutrition.com/cdn/shop/articles/Healthy_Habits_For_Life_9_Tips_For_Better_Fitness_600x400_crop_center.progressive.jpg?v=1633117323',
    Elektronik: 'https://wahananews.co/photo/berita/dir122021/jadi-kejuaraan-olahraga-elektronik-terbesar-di-indonesia-grand-final-piala-presiden-esports-2021-dimulai-hari-ini_KUI89mE356.jpg',
    Billiard: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-3KK32PPNIwjjsFcsLV1ZqgV1IaIxNLqR5fDrqvP1KPQY2djzVo3mVEvWDa4PMQYLH9r2LqDzRkBnsvtslXHA6ekCpE6KyAzaSeSR5NZsv-Ik_GLQjFTAQjsmb28MlHjyOGW9QNa5GzceTxPF5eCwqHt2QjMTi4KCkrfMJ5AMYL64jI49sOlbPUP_gQ/s3376/billiard%201.jpg',
    'Bulu Tangkis': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAoO3E1j4zLYgBWHGgllgA56GVE_S_2iKUg&s',
    Futsal: 'https://superlive.id/storage/articles/999c4eff-e84c-422d-9b95-a9efa6373791.jpg',
    Basketball: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SIhIwS6OVHrGIRa_G_G_kMIg3xktu0I4WQ&s',
    'Lari Sendiri': 'https://awsimages.detik.net.id/community/media/visual/2021/07/31/sprinter-lalu-muhammad-zohri-2.jpeg?w=1200',
    'Sepak Bola': 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/222/2024/09/27/11-2732952936.jpg',
    Golf: 'https://www.stratton.com/-/media/stratton/images/summer/2400x1350/activities/golf/summer/golfstratton.jpg?rev=67c9480b47f24a5d847bc6454ec6e466?h=1350&w=2400&hash=60B91CBE6C70F9C7A8C060E2F0500EB1',
  };

  // Harga khusus kategori
  const customPrices = {
    Hockey: 150000,
    'Tenis Meja': 120000,
    Fitnes: 130000,
    Billiard: 110000,
    'Bulu Tangkis': 125000,
    Futsal: 200000,
    Basketball: 180000,
    'Sepak Bola': 220000,
    Golf: 250000,
  };

  // Mapping kategori ke categoryId cart
  const getCategoryIdForCart = (categoryName) => {
    const lower = categoryName.toLowerCase();
    if (lower.includes('lapangan')) return 2;
    if (lower.includes('perlengkapan') || lower.includes('karcis')) return 3;
    return 1;
  };

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const res = await fetch(
          'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories?is_paginate=true&per_page=10&page=1',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setCategories(data.result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Tambahkan deskripsi ke kategori
  const categoriesWithDesc = categories.map((cat) => ({
    ...cat,
    description: categoryDescriptions[cat.name] || 'Deskripsi tidak tersedia.',
  }));

  const toggleCategoryInCart = (category) => {
    const exists = cartItems.find((item) => item.id === category.id);
    if (exists) {
      setCartItems(cartItems.filter((item) => item.id !== category.id));
    } else {
      // Gunakan harga khusus jika ada, atau harga dari API minimal 100000
     const price =
        customPrices[category.name] ?? (category.price >= 100000 ? category.price : 100000);
      setCartItems([
        ...cartItems,
        {
          id: category.id,
          name: category.name,
          price,
          qty: 1,
          categoryId: getCategoryIdForCart(category.name),
        },
      ]);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading sport categories...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  if (categories.length === 0) return <p style={{ textAlign: 'center' }}>No sport categories found.</p>;

  return (
    <div style={{ maxWidth: 960, margin: '20px auto', padding: 20 }}>
      <h3>Sport Categories</h3>
      <div style={{ display: 'flex', gap: 20 }}>
        {/* List kategori */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            width: '40%',
            maxHeight: '70vh',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: 8,
          }}
        >
          {categoriesWithDesc.map((category) => {
            const imageUrl = categoryImages[category.name] || 'https://via.placeholder.com/80?text=No+Image';
            const checked = cartItems.some((item) => item.id === category.id);
            const isSelected = selectedCategory?.id === category.id;

            return (
              <li
                key={category.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 12,
                  padding: 10,
                  gap: 12,
                  borderRadius: 8,
                  backgroundColor: checked ? '#e0e7ff' : isSelected ? '#d0dbff' : 'transparent',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => setSelectedCategory(category)}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleCategoryInCart(category);
                  }}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                  aria-label={`Select category ${category.name}`}
                />
                <img
                  src={imageUrl}
                  alt={category.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, userSelect: 'none' }}
                  draggable={false}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: '600' }}>{category.name}</p>
                  <p style={{ margin: 0, fontSize: 14, color: '#555' }}>
                    Harga: Rp {(customPrices[category.name] ?? category.price ?? 100000).toLocaleString('id-ID')}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Detail kategori terpilih */}
        {selectedCategory && (
          <div
            style={{
              flex: 1,
              padding: 16,
              border: '1px solid #5C6AC4',
              borderRadius: 8,
              backgroundColor: '#f0f4ff',
              maxHeight: '70vh',
              overflowY: 'auto',
              userSelect: 'text',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>{selectedCategory.name}</h3>
            <img
              src={categoryImages[selectedCategory.name] || 'https://via.placeholder.com/320x180?text=No+Image'}
              alt={selectedCategory.name}
              style={{ width: '100%', height: 'auto', borderRadius: 8, marginBottom: 16 }}
              draggable={false}
            />
            <p>
              <strong>Harga:</strong> Rp {(customPrices[selectedCategory.name] ?? selectedCategory.price ?? 100000).toLocaleString('id-ID')}
            </p>
            <p>
              <strong>Deskripsi:</strong>
            </p>
            <p>{selectedCategory.description || 'Tidak ada deskripsi tersedia.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SportCategoriesList;