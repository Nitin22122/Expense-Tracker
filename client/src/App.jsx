import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const API = "http://localhost:5000/api/transactions";

  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

const totalIncome = transactions
.filter((item) => item.type === "income")
.reduce((acc, item) => acc + Number(item.amount), 0);


const totalExpense = transactions
.filter((item) => item.type === "expense")
.reduce((acc, item) => acc + Number(item.amount), 0);


const balance = totalIncome - totalExpense;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "expense",
    date: ""
  });



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
      [e.target.name]: e.target.value
    });

  };

  //Delete Transaction
  const deleteTransaction = async (id) => {

  try {

    await axios.delete(`${API}/${id}`);

    fetchTransactions();

  } catch (error) {

    console.log(error);

  }

  };


  // ADD TRANSACTION
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(API, formData);

      fetchTransactions();

      setFormData({
        title: "",
        description: "",
        amount: "",
        type: "expense",
        date: ""
      });

    } catch (error) {

      console.log(error);

    }

  };




  return (

    <div className="container">

  <h1>Expense Tracker</h1>


  <div className="dashboard">

    <div className="card income">
      <h2>Income</h2>
      <h3>₹ {totalIncome}</h3>
    </div>


    <div className="card expense">
      <h2>Expense</h2>
      <h3>₹ {totalExpense}</h3>
    </div>


    <div className="card balance">
      <h2>Balance</h2>
      <h3>₹ {balance}</h3>
    </div>

  </div>



  <form onSubmit={handleSubmit}>

    <input
      type="text"
      name="title"
      placeholder="Title"
      value={formData.title}
      onChange={handleChange}
    />


    <input
      type="text"
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
    />


    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={formData.amount}
      onChange={handleChange}
    />


    <select
      name="type"
      value={formData.type}
      onChange={handleChange}
    >

      <option value="income">Income</option>

      <option value="expense">Expense</option>

    </select>


    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
    />


    <button type="submit">
      Add Transaction
    </button>

  </form>



  <div className="search-filter">

    <input
      type="text"
      placeholder="Search transactions"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />


    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >

      <option value="all">All</option>

      <option value="income">Income</option>

      <option value="expense">Expense</option>

    </select>

  </div>



  {
    transactions
      .filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      )

      .filter((item) => {

        if (filter === "all") return true;

        return item.type === filter;

      })

      .map((item) => (

        <div
          key={item._id}
          className="transaction-card"
        >

          <h3>{item.title}</h3>

          <p>{item.description}</p>

          <p><strong>Amount:</strong> ₹ {item.amount}</p>

          <p><strong>Type:</strong> {item.type}</p>

          <p><strong>Date:</strong>{" "}{new Date(item.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong>{" "}{new Date(item.createdAt).toLocaleTimeString()}</p>

          <button
            onClick={() => deleteTransaction(item._id)}
          >
            Delete
          </button>

        </div>

      ))
  }

</div>

  );

}

export default App;