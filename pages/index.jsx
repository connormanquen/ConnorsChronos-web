import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const res = await axios.get("/api/reddit");
      setListings(res.data);
    };
    fetchListings();
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h1>Connors Chronos LLC</h1>
      {listings.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <h2>{post.title}</h2>
          <img src={post.image} style={{ maxWidth: '100%' }} />
          <p>{post.description}</p>
          <p>Status: {post.flair}</p>
          <a href={post.url} target="_blank" rel="noreferrer">View on Reddit</a>
        </div>
      ))}
    </div>
  );
}
