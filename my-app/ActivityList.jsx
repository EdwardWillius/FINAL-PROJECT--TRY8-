import React, { useEffect, useState } from 'react';

function ActivityList() {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const res = await fetch(
          'https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/1',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`);

        const data = await res.json();

        if (data.error) throw new Error(data.message || 'Failed to fetch activity');

        setActivity(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading activity...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  if (!activity) return <p style={{ textAlign: 'center' }}>No activity found.</p>;

  return (
    <section
      style={{
        maxWidth: 720,
        margin: '40px auto',
        padding: 20,
        backgroundColor: '#eef2ff',
        borderRadius: 8,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#1e293b',
      }}
    >
      <h2 style={{ marginBottom: 12, color: '#4f46e5' }}>{activity.title}</h2>

      {/* Placeholder image */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy1XlpNyLwgfKf2xaZwwcNrVX_uLLmKCN0lQ&s"
        alt={activity.title}
        style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 20 }}
      />

      <p style={{ marginBottom: 20, fontSize: 16, lineHeight: 1.5 }}>
        {activity.description || 'No description available.'}
      </p>

      <div style={{ fontSize: 15, lineHeight: 1.4, color: '#334155' }}>
        <p>
          <strong>Price:</strong> {activity.price ? `Rp${activity.price.toLocaleString()}` : 'Free'}
        </p>
        <p>
          <strong>Slot:</strong> {activity.slot || '-'}
        </p>
        <p>
          <strong>Address:</strong> {activity.address || '-'}
        </p>
        <p>
          <strong>Date:</strong> {activity.activity_date || '-'}
        </p>
        <p>
          <strong>Time:</strong> {activity.start_time} - {activity.end_time}
        </p>
        <p>
          <strong>Organizer:</strong> {activity.organizer?.name || '-'}
        </p>
        <p>
          <a href={activity.map_url} target="_blank" rel="noopener noreferrer">
            View Map
          </a>
        </p>
      </div>
    </section>
  );
}

export default ActivityList;