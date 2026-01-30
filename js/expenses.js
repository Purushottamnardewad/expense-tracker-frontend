const renderExpenses = (expenses) => {
  const table = document.getElementById('expenseTable');
  table.innerHTML = '';

  expenses.forEach((exp) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${exp.category}</td>
      <td>${exp.amount}</td>
      <td>${exp.comment || ''}</td>
      <td>${new Date(exp.createdAt).toLocaleDateString()}</td>
      <td>
        <button onclick="deleteExpense('${exp._id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
};

const fetchExpenses = async () => {
  const res = await fetch(`${API_BASE_URL}/expenses`, {
    headers: getAuthHeaders(),
  });

  const expenses = await res.json();
  renderExpenses(expenses);
};

const addExpense = async (category, amount, comment) => {
  await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ category, amount, comment }),
  });

  fetchExpenses();
};

const deleteExpense = async (id) => {
  await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  fetchExpenses();
};