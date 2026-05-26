import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
 ResponsiveContainer,
} from "recharts";

function App() {
  const API = "http://localhost:5000/api/transactions";

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: "",
  });

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  const data = [
    {
      name: "Income",
      value: totalIncome,
    },
    {
      name: "Expense",
      value: totalExpense,
    },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API);
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchTransactions();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // DELETE TRANSACTION
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TRANSACTION
  const editTransaction = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      amount: item.amount,
      type: item.type,
      category: item.category,
      date: item.date.split("T")[0],
    });

    setEditId(item._id);
    setShowModal(true);
  };

  // ADD / UPDATE TRANSACTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        setEditId(null);
        setShowModal(false);
      } else {
        await axios.post(API, formData);
      }

      fetchTransactions();

      setFormData({
        title: "",
        description: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">
          Expense Tracker
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-green-400/20">
            <h2 className="text-2xl font-semibold mb-2">
              Total Income
            </h2>

            <p className="text-3xl font-bold text-green-400">
              ₹ {totalIncome}
            </p>
          </div>

          <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-red-400/20">
            <h2 className="text-2xl font-semibold mb-2">
              Total Expense
            </h2>

            <p className="text-3xl font-bold text-red-400">
              ₹ {totalExpense}
            </p>
          </div>

          <div className="bg-purple-500/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-purple-400/20">
            <h2 className="text-2xl font-semibold mb-2">
              Balance
            </h2>

            <p className="text-3xl font-bold text-purple-300">
              ₹ {balance}
            </p>
          </div>
        </div>

        {/* Add Transaction Form */}
        {!showModal && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl mb-10 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-800 border border-white/20"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-800 border border-white/20"
              >
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white/10 border border-white/20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-3 rounded-xl font-semibold"
            >
              Add Transaction
            </button>
          </form>
        )}

        {/* Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-slate-900 p-8 rounded-2xl w-[90%] md:w-[500px] shadow-2xl border border-white/10">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Edit Transaction
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none"
                />

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-white/20"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-white/20"
                >
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                </select>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20"
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditId(null);

                      setFormData({
                        title: "",
                        description: "",
                        amount: "",
                        type: "expense",
                        category: "Food",
                        date: "",
                      });
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none mb-8"
        />

        {/* Analytics */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Expense Analytics
          </h2>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transactions
            .filter((item) =>
              item.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((item) => (
              <div
                key={item._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {item.title}
                </h2>

                <p className="mb-2 text-gray-300">
                  {item.description}
                </p>

                <p>
                  <strong>Amount:</strong> ₹ {item.amount}
                </p>

                <p>
                  <strong>Type:</strong> {item.type}
                </p>

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => editTransaction(item)}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTransaction(item._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;