let expenseChart;

const renderExpenses = (expenses) => {
  const table = document.getElementById('expenseTable');
  
  if (!Array.isArray(expenses)) {
    console.error('Invalid expenses data:', expenses);
    table.innerHTML = '<tr><td colspan="5">Unable to load expenses</td></tr>';
    return;
  }

  if (expenses.length === 0) {
    table.innerHTML = '<tr><td colspan="5">No expenses yet</td></tr>';
    renderChart([]);
    return;
  }

  table.innerHTML = '';

  expenses.forEach((exp) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${exp.category}</td>
      <td>${exp.amount}</td>
      <td>${exp.comments || '-'}</td>
      <td>${new Date(exp.createdAt).toLocaleDateString()}</td>
      <td>
        <button onclick="deleteExpense('${exp._id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  renderChart(expenses);
};

const renderChart = (expenses) => {
  const ctx = document.getElementById('expenseChart');
  
  if (expenseChart) {
    expenseChart.destroy();
  }

  if (!expenses || expenses.length === 0) {
    return;
  }

  const totals = {};

  expenses.forEach((exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + Number(exp.amount);
  });

  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(totals),
      datasets: [
        {
          data: Object.values(totals),
          backgroundColor: [
            '#2563eb',
            '#16a34a',
            '#f97316',
            '#dc2626',
            '#7c3aed',
            '#0891b2',
            '#be185d',
          ],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
};

const fetchExpenses = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      headers: getAuthHeaders(),
    });

    // Handle 401 - redirect to login
    if (res.status === 401) {
      console.warn('Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      console.error('Failed to fetch expenses:', data.message);
      renderExpenses([]);
      return;
    }

    renderExpenses(data.expenses || []);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    renderExpenses([]);
  }
};

const addExpense = async (category, amount, comment) => {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        category: category.trim(),
        amount: Number(amount),
        comments: comment || '',
      }),
    });

    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || 'Failed to add expense');
      return;
    }

    fetchExpenses();
  } catch (error) {
    console.error('Error adding expense:', error);
    alert('Failed to add expense. Please try again.');
  }
};

const deleteExpense = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    fetchExpenses();
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};