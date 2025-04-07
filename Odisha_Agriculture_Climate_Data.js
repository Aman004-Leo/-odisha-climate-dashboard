import React, { useState } from 'react';
import { LineChart, BarChart, PieChart } from 'react-chartjs-2';
import './Dashboard.css';

function Dashboard() {
  const [temperature, setTemperature] = useState(25);
  const [rainfall, setRainfall] = useState(20);

  const handleTemperatureChange = (e) => setTemperature(e.target.value);
  const handleRainfallChange = (e) => setRainfall(e.target.value);

  const predictYield = () => {
    // Call backend API to predict yield
    fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature, rainfall }),
    })
      .then((response) => response.json())
      .then((data) => alert(`Predicted Yield: ${data.predicted_yield} Kg/ha`));
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header>
        <h1>Odisha Climate & Crop Yield Dashboard</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Trends</li>
            <li>Simulations</li>
            <li>District Analysis</li>
            <li>Crop Analysis</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>

      {/* Sidebar */}
      <aside>
        <h2>Filters</h2>
        <label>
          Temperature (°C):
          <input type="number" value={temperature} onChange={handleTemperatureChange} />
        </label>
        <label>
          Rainfall (mm):
          <input type="number" value={rainfall} onChange={handleRainfallChange} />
        </label>
        <button onClick={predictYield}>Predict Yield</button>
      </aside>

      {/* Main Content */}
      <main>
        <section>
          <h2>Key Metrics</h2>
          <div className="metrics">
            <div>Average Temperature: 26.8°C</div>
            <div>Average Rainfall: 20.5 mm</div>
            <div>Average Yield: 2,500 kg/ha</div>
          </div>
        </section>

        <section>
          <h2>Historical Trends</h2>
          <LineChart data={historicalTrendsData} />
        </section>

        <section>
          <h2>Simulation Results</h2>
          <BarChart data={simulationResultsData} />
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>Contact Us | FAQs | Version 1.0</p>
      </footer>
    </div>
  );
}

export default Dashboard;