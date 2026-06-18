import { useEffect, useState } from "react"
import api from "../services/api"

function Reports() {

  const [stats, setStats] = useState({})
  const [payments, setPayments] = useState([])
  const [expenses, setExpenses] = useState([])
  const [unpaidOwners, setUnpaidOwners] = useState([])

  useEffect(() => {

    fetchData()

  }, [])


  async function fetchData() {

    try {

      const currentYear = new Date().getFullYear()

      const statsRes = await api.get("/dashboard-stats")
      const paymentsRes = await api.get("/payments")
      const expensesRes = await api.get("/expenses")
      const unpaidRes = await api.get(`/unpaid-owners/${currentYear}`)

      setStats(statsRes.data)
      setPayments(paymentsRes.data)
      setExpenses(expensesRes.data)
      setUnpaidOwners(unpaidRes.data)

    } catch (error) {

      console.log(error)

    }

  }


  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>


      {/* TOP STATS */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-300">
            Total Owners
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {stats.totalOwners || 0}
          </h2>

        </div>


        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-300">
            Total Income
          </p>

          <h2 className="text-4xl font-bold mt-4 text-green-400">
            ₹ {Number(stats.totalIncome || 0).toLocaleString("en-IN")}
          </h2>

        </div>


        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-300">
            Total Expenses
          </p>

          <h2 className="text-4xl font-bold mt-4 text-red-400">
            ₹ {Number(stats.totalExpenses || 0).toLocaleString("en-IN")}
          </h2>

        </div>


        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <p className="text-slate-300">
            Remaining Balance
          </p>

          <h2 className="text-2xl md:text-4xl font-bold mt-4 text-blue-400 break-words">
            ₹ {Number(stats.balance || 0).toLocaleString("en-IN")}
          </h2>

        </div>

      </div>


      {/* UNPAID OWNERS */}

      <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          Unpaid Owners
        </h2>

        {unpaidOwners.length === 0 ? (

          <p className="text-green-400">
            All owners have paid 🎉
          </p>

        ) : (

          <div className="space-y-3">

            {unpaidOwners.map((owner) => (

              <div
                key={owner._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >

                <h3 className="font-bold text-lg">
                  {owner.name}
                </h3>

                <p className="text-slate-300">
                  Plot: {owner.plot}
                </p>

                <p className="text-slate-300">
                  Phone: {owner.phone}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* PAYMENT REPORT */}

      <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-green-400 mb-6">
          Payment Report
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left py-3">
                  Owner
                </th>

                <th className="text-left py-3">
                  Type
                </th>

                <th className="text-left py-3">
                  Amount
                </th>

                <th className="text-left py-3">
                  Year
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment._id}
                  className="border-b border-white/5"
                >

                  <td className="py-3">
                    {payment.ownerName}
                  </td>

                  <td className="py-3">
                    {payment.paymentType}
                  </td>

                  <td className="py-3 text-green-400">
                    ₹ {payment.amount}
                  </td>

                  <td className="py-3">
                    {payment.year}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* EXPENSE REPORT */}

      <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-red-400 mb-6">
          Expense Report
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left py-3">
                  Expense
                </th>

                <th className="text-left py-3">
                  Amount
                </th>

                <th className="text-left py-3">
                  Note
                </th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (

                <tr
                  key={expense._id}
                  className="border-b border-white/5"
                >

                  <td className="py-3">
                    {expense.title}
                  </td>

                  <td className="py-3 text-red-400">
                    ₹ {expense.amount}
                  </td>

                  <td className="py-3">
                    {expense.note}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Reports