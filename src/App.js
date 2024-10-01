import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [catFact, setCatFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_CAT_FACT_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchCatFact();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cat Fact</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && <p>{catFact}</p>}
        <button onClick={handleRefresh}>Get Another Fact</button>
      </header>
    </div>
  );
}

export default App;
