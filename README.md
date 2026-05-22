# Expense Tracker

A modern full stack MERN Expense Tracker application built using React.js, Node.js, Express.js, and MongoDB Atlas.

---

# Features

✅ Add Transactions  
✅ Edit Transactions  
✅ Delete Transactions  
✅ Income & Expense Tracking  
✅ Dashboard Analytics  
✅ Search Transactions  
✅ Filter Transactions  
✅ Form Validation  
✅ Responsive Modern UI  
✅ MongoDB Atlas Integration  
✅ REST API Architecture  

---

# Tech Stack

## Frontend
- React.js
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

---

# Project Structure

```txt
Expense_Tracker/

├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── screenshots/
├── README.md
└── .gitignore
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Nitin22122/Expense-Tracker.git
```

---

## 2. Frontend Setup

Open terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## 3. Backend Setup

Open another terminal:

```bash
cd server
npm install
```

Create `.env` file inside server folder:

```env
MONGO_URI=your_mongodb_connection_string
```

Run backend server:

```bash
node server.js
```

Backend runs on:

```txt
http://localhost:5000
```

---

# API Routes

## Get All Transactions

```http
GET /api/transactions
```

---

## Add Transaction

```http
POST /api/transactions
```

---

## Update Transaction

```http
PUT /api/transactions/:id
```

---

## Delete Transaction

```http
DELETE /api/transactions/:id
```

---

# Validation Features

The application prevents:
- Empty titles
- Missing dates
- Invalid amounts

This improves data accuracy and user experience.

---

# Dashboard Features

The dashboard calculates:
- Total Income
- Total Expense
- Remaining Balance

using dynamic React state and array methods.

---

# Screenshots

## Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Add Transaction Form

![Add Form](screenshots/add-form.png)

---

## Transactions List

![Transactions](screenshots/transactions.png)

---

# Future Improvements

- Dark Mode
- Authentication System
- Expense Categories
- Charts & Analytics
- Export Reports (PDF/CSV)
- Monthly Reports
- Toast Notifications

---

# Author

Nitin Ola

GitHub:
https://github.com/Nitin22122

---

# License

This project is for educational and internship purposes.