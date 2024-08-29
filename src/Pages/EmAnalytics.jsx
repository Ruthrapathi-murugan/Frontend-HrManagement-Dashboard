import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(...registerables);

function EmAnalytics() {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Destroy old charts if they exist
    const destroyChart = (chart) => {
      if (chart && chart.destroy) {
        chart.destroy();
      }
    };

    // Destroy existing charts before creating new ones
    const barChart = barChartRef.current && Chart.getChart(barChartRef.current);
    const lineChart = lineChartRef.current && Chart.getChart(lineChartRef.current);
    
    destroyChart(barChart);
    destroyChart(lineChart);

    if (barChartRef.current && lineChartRef.current) {
      const barChartCtx = barChartRef.current.getContext('2d');
      new Chart(barChartCtx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: '# of Employees Joined',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const lineChartCtx = lineChartRef.current.getContext('2d');
      new Chart(lineChartCtx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Leave Requests',
            data: [10, 15, 8, 12],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Chart canvas elements not found');
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Analytics Dashboard</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h5 className="card-title">Total Employees</h5>
              <p className="card-text display-4">120</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-success">
            <div className="card-body text-center">
              <h5 className="card-title">Monthly Joiners</h5>
              <p className="card-text display-4">25</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card border-danger">
            <div className="card-body text-center">
              <h5 className="card-title">Leave Requests</h5>
              <p className="card-text display-4">15</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <canvas ref={barChartRef} id="barChart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <canvas ref={lineChartRef} id="lineChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmAnalytics;
