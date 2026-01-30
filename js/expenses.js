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