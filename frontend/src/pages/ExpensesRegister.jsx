import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

function ExpensesRegister() {

  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    fetchExpenses()
  }, [])

  async function fetchExpenses() {

    try {

      const response = await api.get("/expenses")

      setExpenses(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="bg-white min-h-screen text-black p-8">

      <Link to="/expenses">
        <button className="mb-6 bg-blue-500 text-white px-5 py-2 rounded-xl">
          ← Back to Expenses
        </button>
      </Link>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Expenses Register
        </h1>

        <button
          onClick={() => window.print()}
          className="bg-green-500 text-white px-5 py-2 rounded-xl"
        >
          Print
        </button>

      </div>

      <table className="w-full border border-black">

        <thead>

          <tr>

            <th className="border border-black p-3">
              Title
            </th>

            <th className="border border-black p-3">
              Amount
            </th>

            <th className="border border-black p-3">
              Date
            </th>

            <th className="border border-black p-3">
              Note
            </th>

          </tr>

        </thead>

        <tbody>

          {[...expenses]
            .sort(
              (a, b) =>
                new Date(b.date) -
                new Date(a.date)
            )
            .map((expense) => (

              <tr key={expense._id}>

                <td className="border border-black p-3">
                  {expense.title}
                </td>

                <td className="border border-black p-3">
                  ₹{expense.amount}
                </td>

                <td className="border border-black p-3">
                  {expense.date}
                </td>

                <td className="border border-black p-3">
                  {expense.note}
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  )

}

export default ExpensesRegister