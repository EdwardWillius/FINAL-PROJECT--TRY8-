import React, { useEffect, useState } from 'react';

function Location() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCities() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('You must login first to view locations.');

        const res = await fetch(
          'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/location/cities/11?is_paginate=false&per_page=5&page=2',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch cities data. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log('API response:', data);

        // Coba cek jika data.result ada dan tipe array
        if (Array.isArray(data.result) && data.result.length > 0) {
          setCities(data.result);
        } else if (Array.isArray(data.data) && data.data.length > 0) {
          // fallback jika API gunakan properti data
          setCities(data.data);
        } else {
          setError('No city data found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 40 }}>Loading cities...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>Error: {error}</p>;
  if (cities.length === 0) return <p style={{ textAlign: 'center', marginTop: 40 }}>No cities data available.</p>;

  return (
    <section style={styles.container}>
      <h3 style={styles.heading}>Cities in Province ID 11</h3>
      <ul>
        {cities.map((city) => (
          <li key={city.city_id || city.id || city._id}>
            <strong>{city.city_name_full || city.name || city.city_name || city.nama}</strong> (Type: {city.city_type || '-'})
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles = {
  container: {
    backgroundColor: '#eef2ff',
    padding: 20,
    borderRadius: 8,
    maxWidth: 600,
    margin: '20px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1e293b',
  },
  heading: {
    marginBottom: 16,
    color: '#4f46e5',
  },
};

export default Location;