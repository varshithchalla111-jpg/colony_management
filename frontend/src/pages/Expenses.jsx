import { useEffect, useState } from "react"
import api from "../services/api"

function Expenses() {

  const [expenses, setExpenses] = useState([])

  const [editingId, setEditingId] = useState(null)

  const [currentBalance, setCurrentBalance] = useState(0)

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "",
    date: new Date().toISOString().split("T")[0]
  })


  useEffect(() => {

    fetchExpenses()
    fetchSettings()

  }, [])


  // FETCH SETTINGS

  async function fetchSettings() {

    try {

      const response = await api.get("/settings")

      setCurrentBalance(response.data.currentBalance)

    } catch (error) {

      console.log(error)

    }

  }


  // UPDATE BALANCE

  async function updateBalance() {

    try {

      await api.put("/settings", {
        currentBalance: Number(currentBalance)
      })

      alert("Balance updated")

    } catch (error) {

      console.log(error)

    }

  }


  // FETCH EXPENSES

  async function fetchExpenses() {

    try {

      const response = await api.get("/expenses")

      setExpenses(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  function handleChange(event) {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })

  }


  // SAVE EXPENSE

  async function saveExpense() {

    if (
      formData.title === "" ||
      formData.amount === ""
    ) {

      alert("Please fill required fields")

      return

    }

    try {

      if (editingId) {

        await api.put(`/expenses/${editingId}`, {
          ...formData,
          amount: Number(formData.amount)
        })

        setEditingId(null)

      }

      else {

        await api.post("/expenses", {
          ...formData,
          amount: Number(formData.amount)
        })

      }

      fetchExpenses()

      setFormData({
        title: "",
        amount: "",
        note: "",
        date: new Date().toISOString().split("T")[0]
      })

    } catch (error) {

      console.log(error)

    }

  }


  // DELETE EXPENSE

  async function deleteExpense(id) {

    try {

      await api.delete(`/expenses/${id}`)

      fetchExpenses()

    } catch (error) {

      console.log(error)

    }

  }


  // EDIT EXPENSE

  function editExpense(expense) {

    setEditingId(expense._id)

    setFormData({
      title: expense.title,
      amount: expense.amount,
      note: expense.note,
      date: expense.date
    })

  }


  return (

    <div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Expenses Management
      </h1>


      {/* BALANCE SECTION */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-6">
          Current Remaining Balance
        </h2>


      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1">

          <input
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />

          <p className="text-slate-400 text-sm mt-2">
            ₹ {Number(currentBalance || 0).toLocaleString("en-IN")}
          </p>

        </div>

        <button
          onClick={updateBalance}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-4 rounded-xl"
        >
          Update Balance
        </button>

      </div>

      </div>


      {/* FORM */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-6">

          {editingId ? "Edit Expense" : "Add Expense"}

        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="text"
            name="note"
            placeholder="Optional Note"
            value={formData.note}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />

        </div>


        <button
          onClick={saveExpense}
          className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition"
        >

          {editingId ? "Update Expense" : "Add Expense"}

        </button>

      </div>



      {/* EXPENSES LIST */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Expenses History
        </h2>


        {expenses.length === 0 ? (

          <p className="text-slate-300">
            No expenses added yet
          </p>

        ) : (

          <div className="space-y-4">

            {expenses.map((expense) => (

              <div
                key={expense._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {expense.title}
                  </h3>

                  <p className="text-slate-300">
                    Amount: ₹{expense.amount}
                  </p>

                  <p className="text-slate-300">
                    Date: {expense.date}
                  </p>

                  <p className="text-slate-300">
                    Note: {expense.note}
                  </p>

                </div>


                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={() => editExpense(expense)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => deleteExpense(expense._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )

}

export default Expenses