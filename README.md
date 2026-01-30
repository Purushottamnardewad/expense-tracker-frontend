# Expense Tracker – Frontend

This is the frontend part of the Expense Tracker application.  
It is built using plain HTML, CSS, and JavaScript and communicates with a Node.js backend using REST APIs.

The frontend allows users to log in, add expenses, view them in a table, and see a pie chart showing category-wise spending.

---

## Features

- Login and Signup using JWT authentication
- Add expenses with category, amount, and comments
- View all expenses in a table
- Delete expenses
- Pie chart to visualize expenses by category
- Clean and simple UI

---

## Tech Used

- HTML
- CSS
- Vanilla JavaScript
- Chart.js

---

---

## How to Run the Frontend

### Prerequisites
- Backend server should be running
- Python installed (for local server)

### Steps

From the frontend directory, run:
```bash 
python3 -m http.server 3000
```
Then open in browser:
http://localhost:3000

How Authentication Works
1. User logs in or signs up
2. JWT token is stored in localStorage
3. Token is sent with every protected API request
4. If token is missing or invalid, user is redirected to login

# Note: 
If something breaks during testing, clearing browser storage usually helps:
```bash
localStorage.clear()
```

Output: 
<img width="1440" height="811" alt="Screenshot 2026-01-30 at 17 31 11" src="https://github.com/user-attachments/assets/4a485732-3852-4bc5-9522-6831aaba9f28" />
<img width="1440" height="809" alt="Screenshot 2026-01-30 at 17 30 46" src="https://github.com/user-attachments/assets/6340a828-19be-4e76-bfb4-7ebc57015642" />
<img width="1440" height="798" alt="Screenshot 2026-01-30 at 17 30 54" src="https://github.com/user-attachments/assets/7551a649-2db0-4914-a847-298ec945e655" />


