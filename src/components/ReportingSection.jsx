import React, { useMemo } from 'react';
import BarChart from './charts/BarChart.jsx';
import PieChart from './charts/PieChart.jsx';

const ReportingSection = ({ transactions }) => {

  // Helper function to aggregate data for charts
  const { monthlyData, categoryData } = useMemo(() => {
    const monthlyIncome = {};
    const monthlyExpenses = {};
    const spendingByCategory = {};

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('en-US', { month: 'short', year: 'numeric' });

      if (transaction.type === 'income') {
        monthlyIncome[month] = (monthlyIncome[month] || 0) + transaction.amount;
      } else if (transaction.type === 'expense') {
        monthlyExpenses[month] = (monthlyExpenses[month] || 0) + transaction.amount;
        const category = transaction.category || 'Uncategorized';
        spendingByCategory[category] = (spendingByCategory[category] || 0) + transaction.amount;
      }
    });

    const allMonths = Array.from(new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpenses)]));
    allMonths.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Sort months chronologically

    // Prepare data for Bar Chart (Income vs Expense)
    const barChartLabels = allMonths;
    const barChartDatasets = [
      {
        label: 'Income',
        data: allMonths.map(month => monthlyIncome[month] || 0),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // Green
      },
      {
        label: 'Expenses',
        data: allMonths.map(month => monthlyExpenses[month] || 0),
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red
      },
    ];

    // Prepare data for Pie Chart (Spending by Category)
    const pieChartLabels = Object.keys(spendingByCategory);
    const pieChartData = Object.values(spendingByCategory);
    const backgroundColors = [
      '#60A5FA', '#FBBF24', '#EF4444', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6', '#D946EF', '#F59E0B', '#0EA5E9',
      '#A855F7', '#F43F5E', '#22C55E', '#A78BFA', '#FDBA74', '#94A3B8', '#BEF264', '#C084FC', '#FDA4AF', '#34D399'
    ]; // A diverse set of colors

    const pieChartDatasets = [
      {
        data: pieChartData,
        backgroundColor: pieChartLabels.map((_, i) => backgroundColors[i % backgroundColors.length]),
        hoverOffset: 4,
      },
    ];

    return {
      monthlyData: { labels: barChartLabels, datasets: barChartDatasets },
      categoryData: { labels: pieChartLabels, datasets: pieChartDatasets },
    };
  }, [transactions]); // Recalculate only when transactions change

  return (
    <div className="reporting-section-content">
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Income vs. Expenses</h3>
          {/* Added a div with a defined height for the chart to render within */}
          <div style={{ position: 'relative', height: '250px', width: '100%' }}>
            {transactions.length > 0 ? (
              <BarChart data={monthlyData} title="Monthly Overview" />
            ) : (
              <p className="text-center text-gray-500">No transactions to display in charts yet.</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Spending by Category</h3>
          {/* Added a div with a defined height for the chart to render within */}
          <div style={{ position: 'relative', height: '250px', width: '100%' }}>
            {transactions.filter(t => t.type === 'expense').length > 0 ? (
              <PieChart data={categoryData} title="Category Breakdown" />
            ) : (
              <p className="text-center text-gray-500">No expenses to categorize yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingSection;
