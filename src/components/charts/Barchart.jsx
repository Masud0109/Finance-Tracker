import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderRadius: 5, // Adds rounded corners to bars
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter', // Apply Inter font to legend
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          family: 'Inter', // Apply Inter font to title
          weight: '600',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Inter', // Apply Inter font to tooltip body
        },
        titleFont: {
          family: 'Inter', // Apply Inter font to tooltip title
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Inter', // Apply Inter font to x-axis ticks
          },
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Inter', // Apply Inter font to y-axis ticks
          },
          callback: function(value) {
            return '$' + value; // Format y-axis labels as currency
          }
        },
        grid: {
          color: '#e5e7eb', // Light grid lines for y-axis
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
