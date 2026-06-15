import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom"

import { useState } from "react"

import Dashboard from "./pages/Dashboard"
import Owners from "./pages/Owners"
import Payments from "./pages/Payments"
import Expenses from "./pages/Expenses"
import Reports from "./pages/Reports"
import Meetings from "./pages/Meetings"
import Login from "./pages/Login"


function Sidebar({ logout }) {

  const location = useLocation()


  function getButtonClass(path) {

    return location.pathname === path
      ? "w-full text-left p-3 rounded-xl bg-blue-500 transition"
      : "w-full text-left p-3 rounded-xl hover:bg-white/10 transition"

  }


  return (

    <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10 p-6">

      <h1 className="text-2xl font-bold mb-10">
        Colony Admin
      </h1>


      <div className="space-y-4">


        <Link to="/">
          <button className={getButtonClass("/")}>
            Dashboard
          </button>
        </Link>



        <Link to="/owners">
          <button className={getButtonClass("/owners")}>
            Owners
          </button>
        </Link>


        <Link to="/payments">
          <button className={getButtonClass("/payments")}>
            Payments
          </button>
        </Link>


        <Link to="/expenses">
          <button className={getButtonClass("/expenses")}>
            Expenses
          </button>
        </Link>


        <Link to="/reports">
          <button className={getButtonClass("/reports")}>
            Reports
          </button>
        </Link>

        <Link to="/meetings">
          <button className={getButtonClass("/meetings")}>
            Meetings
          </button>
        </Link>


        <button
          onClick={logout}
          className="w-full text-left p-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>

  )

}


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  )


  function logout() {

    localStorage.removeItem("loggedIn")

    setIsLoggedIn(false)

  }


  if (!isLoggedIn) {

    return <Login setIsLoggedIn={setIsLoggedIn} />

  }


  return (

    <BrowserRouter>

      <div className="min-h-screen bg-slate-950 text-white flex">


        {/* SIDEBAR */}

        <Sidebar logout={logout} />


        {/* PAGE CONTENT */}

        <div className="flex-1 p-8">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/owners" element={<Owners />} />

            <Route path="/payments" element={<Payments />} />

            <Route path="/expenses" element={<Expenses />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/meetings" element={<Meetings />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  )

}

export default App