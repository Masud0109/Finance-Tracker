import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data, title }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      // You can add border properties here for slices if needed
      // borderColor: '#ffffff',
      // borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    plugins: {
      legend: {
        position: 'right', // Positioning the legend to the right
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
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      },
    },
    // Adding hover effect for slices (optional)
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
