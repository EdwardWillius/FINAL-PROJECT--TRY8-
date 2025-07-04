import React from 'react';

const transactions = [
  {
    id: 4,
    user_id: 3,
    payment_method_id: 3,
    invoice_id: "INV/20241115/181005",
    status: "success",
    total_amount: 70000,
    proof_payment_url: "https://sport-reservation-api-bootcamp.do.dibimbing.id/uploads/images/1738090961-busbar-test3.PNG",
    order_date: "2024-11-15",
    expired_date: "2024-11-16",
    created_at: "2024-11-15T13:19:09.000000Z",
    updated_at: "2025-01-28T19:05:07.000000Z",
    transaction_items: {
      id: 4,
      transaction_id: 4,
      sport_activity_id: 2,
      title: "Sepak bola asik, join yuk",
      price: 70000,
      price_discount: null,
      created_at: "2024-11-15T13:19:09.000000Z",
      updated_at: "2024-11-15T13:19:09.000000Z",
      sport_activities: {
        id: 2,
        sport_category_id: 2,
        city_id: 3172,
        user_id: 56,
        title: "Sepak bola asik, join yuk",
        description: "*MF TANGSEL x MF DEPOK x MF BOGOR*",
        image_url: null,
        price: 70000,
        price_discount: null,
        slot: 2,
        address: "Lapangan Revo, Jakarta Timur",
        map_url: "https://maps.app.goo.gl/h1AV4bfB2cojJMxK7",
        activity_date: "2025-02-01",
        start_time: "06:00:00",
        end_time: "07:00:00",
        created_at: "2024-09-22T07:06:59.000000Z",
        updated_at: "2025-01-30T15:49:54.000000Z"
      }
    }
  },
  {
    id: 2,
    user_id: 3,
    payment_method_id: 1,
    invoice_id: "INV/20241115/787121",
    status: "success",
    total_amount: 60000,
    proof_payment_url: null,
    order_date: "2024-11-15",
    expired_date: "2024-11-16",
    created_at: "2024-11-15T00:23:27.000000Z",
    updated_at: "2024-11-18T14:53:53.000000Z",
    transaction_items: {
      id: 2,
      transaction_id: 2,
      sport_activity_id: 1,
      title: "Happytepokbulu! @vinduss",
      price: 60000,
      price_discount: 70000,
      created_at: "2024-11-15T00:23:27.000000Z",
      updated_at: "2024-11-15T00:23:27.000000Z",
      sport_activities: {
        id: 1,
        sport_category_id: 2,
        city_id: 3172,
        user_id: 56,
        title: "Sepak bola asik, join yuk",
        description: "*MF TANGSEL x MF DEPOK x MF BOGOR*",
        image_url: "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/badminton-tournament-flyer-design-template-ff5b113106d5d5d63e07279270623b70_screen.jpg",
        price: 70000,
        price_discount: null,
        slot: 2,
        address: "Lapangan Revo, Jakarta Timur",
        map_url: "https://maps.app.goo.gl/h1AV4bfB2cojJMxK7",
        activity_date: "2025-02-01",
        start_time: "06:00:00",
        end_time: "07:00:00",
        created_at: "2024-08-13T04:41:11.000000Z",
        updated_at: "2025-01-30T15:49:17.000000Z"
      }
    }
  },
  {
    id: 6,
    user_id: 3,
    payment_method_id: 1,
    invoice_id: "INV/20241117/217721",
    status: "success",
    total_amount: 60000,
    proof_payment_url: "http://localhost:4030/uploads/images/1738051952-Screenshot_(4).png",
    order_date: "2024-11-17",
    expired_date: "2024-11-18",
    created_at: "2024-11-17T16:21:32.000000Z",
    updated_at: "2025-01-28T08:23:57.000000Z",
    transaction_items: {
      id: 6,
      transaction_id: 6,
      sport_activity_id: 1,
      title: "Happytepokbulu! @vinduss",
      price: 60000,
      price_discount: 70000,
      created_at: "2024-11-17T16:21:32.000000Z",
      updated_at: "2024-11-17T16:21:32.000000Z",
      sport_activities: {
        id: 1,
        sport_category_id: 2,
        city_id: 3172,
        user_id: 56,
        title: "Sepak bola asik, join yuk",
        description: "*MF TANGSEL x MF DEPOK x MF BOGOR*",
        image_url: "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/badminton-tournament-flyer-design-template-ff5b113106d5d5d63e07279270623b70_screen.jpg",
        price: 70000,
        price_discount: null,
        slot: 2,
        address: "Lapangan Revo, Jakarta Timur",
        map_url: "https://maps.app.goo.gl/h1AV4bfB2cojJMxK7",
        activity_date: "2025-02-01",
        start_time: "06:00:00",
        end_time: "07:00:00",
        created_at: "2024-08-13T04:41:11.000000Z",
       // ... bagian transactions sebelumnya

        updated_at: "2025-01-30T15:49:17.000000Z"
      }
    }
  },
  {
    id: 1,
    user_id: 3,
    payment_method_id: 2,
    invoice_id: "INV/20240922/295246",
    status: "success",
    total_amount: 60000,
    proof_payment_url: "https://www.google.com/",
    order_date: "2024-09-22",
    expired_date: "2024-09-23",
    created_at: "2024-09-22T06:57:55.000000Z",
    updated_at: "2025-06-20T17:09:00.000000Z",
    transaction_items: {
      id: 1,
      transaction_id: 1,
      sport_activity_id: 1,
      title: "Happytepokbulu! @vinduss",
      price: 60000,
      price_discount: 70000,
      created_at: "2024-09-22T06:57:55.000000Z",
      updated_at: "2024-09-22T06:57:55.000000Z",
      sport_activities: {
        id: 1,
        sport_category_id: 2,
        city_id: 3172,
        user_id: 56,
        title: "Sepak bola asik, join yuk",
        description: "*MF TANGSEL x MF DEPOK x MF BOGOR*",
        image_url: "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/badminton-tournament-flyer-design-template-ff5b113106d5d5d63e07279270623b70_screen.jpg",
        price: 70000,
        price_discount: null,
        slot: 2,
        address: "Lapangan Revo, Jakarta Timur",
        map_url: "https://maps.app.goo.gl/h1AV4bfB2cojJMxK7",
        activity_date: "2025-02-01",
        start_time: "06:00:00",
        end_time: "07:00:00",
        created_at: "2024-08-13T04:41:11.000000Z",
        updated_at: "2025-01-30T15:49:17.000000Z"
      }
    }
  },

{
    id: 164,
    user_id: 3,
    payment_method_id: 2,
    invoice_id: "INV/20250424/770882",
    status: "success",
    total_amount: 70000,
    proof_payment_url: null,
    order_date: "2025-04-24",
    expired_date: "2025-04-25",
    created_at: "2025-04-24T08:13:20.000000Z",
    updated_at: "2025-04-26T18:29:50.000000Z",
    transaction_items: {
      id: 158,
      transaction_id: 164,
      sport_activity_id: 1,
      title: "Sepak bola asik, join yuk",
      price: 70000,
      price_discount: null,
      created_at: "2025-04-24T08:13:20.000000Z",
      updated_at: "2025-04-24T08:13:20.000000Z",
      sport_activities: {
        id: 1,
        sport_category_id: 2,
        city_id: 3172,
        user_id: 56,
        title: "Sepak bola asik, join yuk",
        description: "*MF TANGSEL x MF DEPOK x MF BOGOR*",
        image_url: "https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/badminton-tournament-flyer-design-template-ff5b113106d5d5d63e07279270623b70_screen.jpg",
        price: 70000,
        price_discount: null,
        slot: 2,
        address: "Lapangan Revo, Jakarta Timur",
        map_url: "https://maps.app.goo.gl/h1AV4bfB2cojJMxK7",
        activity_date: "2025-02-01",
        start_time: "06:00:00",
        end_time: "07:00:00",
        created_at: "2024-08-13T04:41:11.000000Z",
        updated_at: "2025-01-30T15:49:17.000000Z"
      }
    }
  }
];

// ...lanjutan komponen App

function App() {
  const styles = {
    main: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      color: '#5C6AC4'
    },
    section: {
      marginTop: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px'
    },
    image: {
      maxWidth: '300px',
      marginTop: '10px'
    },
    link: {
      color: '#5C6AC4',
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Transactions List</h1>
      {transactions.map(tx => {
        const { transaction_items } = tx;
        const { sport_activities } = transaction_items;
        return (
          <div key={tx.id} style={styles.section}>
            <h2>Transaction ID: {tx.id}</h2>
            <p><strong>Invoice ID:</strong> {tx.invoice_id}</p>
            <p><strong>Status:</strong> {tx.status}</p>
            <p><strong>User ID:</strong> {tx.user_id}</p>
            <p><strong>Payment Method ID:</strong> {tx.payment_method_id}</p>
            <p><strong>Total Amount:</strong> Rp {tx.total_amount.toLocaleString()}</p>
            <p><strong>Order Date:</strong> {tx.order_date}</p>
            <p><strong>Expired Date:</strong> {tx.expired_date}</p>
            <p><strong>Created At:</strong> {new Date(tx.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(tx.updated_at).toLocaleString()}</p>

            <p><strong>Proof of Payment:</strong></p>
            {tx.proof_payment_url ? (
              <img src={tx.proof_payment_url} alt="Proof of payment" style={styles.image} />
            ) : (
              <p><em>No proof of payment available</em></p>
            )}

            <div style={{marginTop: '20px'}}>
              <h3>Transaction Item</h3>
              <p><strong>Title:</strong> {transaction_items.title}</p>
              <p>
                <strong>Price:</strong> Rp {transaction_items.price.toLocaleString()} {' '}
                {transaction_items.price_discount && (
                  <span style={{textDecoration: 'line-through', color: 'red'}}>
                    Rp {transaction_items.price_discount.toLocaleString()}
                  </span>
                )}
              </p>
            </div>

            <div style={{marginTop: '20px'}}>
              <h3>Sport Activity Details</h3>
              <p><strong>Title:</strong> {sport_activities.title}</p>
              <p><strong>Description:</strong> {sport_activities.description}</p>
              {sport_activities.image_url && (
                <img src={sport_activities.image_url} alt={sport_activities.title} style={styles.image} />
              )}
              <p><strong>Address:</strong> {sport_activities.address}</p>
              <p><strong>Activity Date:</strong> {sport_activities.activity_date}</p>
              <p><strong>Time:</strong> {sport_activities.start_time} - {sport_activities.end_time}</p>
              <p>
                <a href={sport_activities.map_url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  View on Map
                </a>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default App;