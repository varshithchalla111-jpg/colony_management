import { useEffect, useState } from "react"
import api from "../services/api"

function Dashboard() {

  const [stats, setStats] = useState({

    totalOwners: 0,
    membershipIncome: 0,
    subscriptionIncome: 0,
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0

  })

  const [unpaidOwners, setUnpaidOwners] = useState([])


  useEffect(() => {

    fetchStats()
    fetchUnpaidOwners()

  }, [])


  // FETCH STATS

  async function fetchStats() {

    try {

      const response = await api.get("/dashboard-stats")

      setStats(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  // FETCH UNPAID OWNERS

  async function fetchUnpaidOwners() {

    try {

      const currentYear = new Date().getFullYear()

      const response = await api.get(
        `/unpaid-owners/${currentYear}`
      )

      setUnpaidOwners(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  return (

    <div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Dashboard Overview
      </h1>


      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">


        {/* TOTAL OWNERS */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-300">
            Total Owners
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            {stats.totalOwners}
          </h2>

        </div>


        {/* TOTAL INCOME */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-300">
            Total Income
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-green-400">
            ₹ {Number(stats.totalIncome).toLocaleString("en-IN")}
          </h2>


          <p className="mt-4 text-slate-400">
            (Membership ₹{Number(stats.membershipIncome).toLocaleString("en-IN")})
          </p>

          <p className="text-slate-400">
            (Subscription ₹{Number(stats.subscriptionIncome).toLocaleString("en-IN")})
          </p>

        </div>


        {/* TOTAL EXPENSES */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-300">
            Total Expenses
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-red-400">
            ₹ {Number(stats.totalExpenses).toLocaleString("en-IN")}
          </h2>

        </div>


        {/* REMAINING BALANCE */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

          <p className="text-slate-300">
            Remaining Balance
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-yellow-400">
            ₹ {Number(stats.balance).toLocaleString("en-IN")}
          </h2>

        </div>


        {/* PENDING SUBSCRIPTIONS */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl md:col-span-2">

          <p className="text-slate-300">
            Pending Subscriptions
          </p>

          <h2 className="text-5xl font-bold mt-4 text-yellow-400">
            {unpaidOwners.length}
          </h2>

          <p className="mt-4 text-slate-400">
            Owners unpaid for current year
          </p>

        </div>

      </div>



      {/* UNPAID OWNERS */}

      <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
          Pending Yearly Subscription
        </h2>


        {unpaidOwners.length === 0 ? (

          <p className="text-green-400">
            All owners have paid 🎉
          </p>

        ) : (

          <div className="space-y-4">

            {unpaidOwners.map((owner) => (

              <div
                key={owner._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >

                <h3 className="text-xl font-bold">
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

    </div>

  )

}

export default Dashboard