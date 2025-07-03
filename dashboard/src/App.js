import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://65.2.5.108:4000/cubejs-api/v1/load", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer secret"
      },
      body: JSON.stringify({
        query: {
          measures: ["Orders.totalAmount"],
          timeDimensions: [
            {
              dimension: "Orders.createdAt",  // ✅ fixed lowercase 'c'
              dateRange: "Last 7 days",
              granularity: "day"
            }
          ],
          order: {
            "Orders.createdAt": "asc"
          }
        }
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log("🚨 FINAL RESULT:", JSON.stringify(result, null, 2));

      const rawData = result.data;

      if (!Array.isArray(rawData)) {
        console.error("❌ Invalid API response", result);
        return;
      }

      const chartData = rawData.map(row => ({
        x: row["Orders.createdAt"],
        y: row["Orders.totalAmount"]
      }));

      setData(chartData);
    });
  }, []);

  return (
    <div className="App" style={{ padding: "40px" }}>
      <h2>Total Revenue (Last 7 Days)</h2>
      <Chart
        type="area"
        height={350}
        series={[{ name: "Revenue", data }]}
        options={{
          xaxis: { type: "datetime" },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth" },
          title: { text: "Daily Revenue", align: "left" }
        }}
      />
    </div>
  );
}

export default App;

