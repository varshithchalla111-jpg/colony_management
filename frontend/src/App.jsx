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

function Sidebar({ logout, closeMenu }) {

  const location = useLocation()

  function getButtonClass(path) {

    return location.pathname === path
      ? "w-full text-left p-3 rounded-xl bg-blue-500 transition"
      : "w-full text-left p-3 rounded-xl hover:bg-white/10 transition"

  }

  return (

    <div className="h-full bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Colony Admin
      </h1>

      <div className="space-y-3">

        <Link to="/" onClick={closeMenu}>
          <button className={getButtonClass("/")}>
            Dashboard
          </button>
        </Link>

        <Link to="/owners" onClick={closeMenu}>
          <button className={getButtonClass("/owners")}>
            Owners
          </button>
        </Link>

        <Link to="/payments" onClick={closeMenu}>
          <button className={getButtonClass("/payments")}>
            Payments
          </button>
        </Link>

        <Link to="/expenses" onClick={closeMenu}>
          <button className={getButtonClass("/expenses")}>
            Expenses
          </button>
        </Link>

        <Link to="/reports" onClick={closeMenu}>
          <button className={getButtonClass("/reports")}>
            Reports
          </button>
        </Link>

        <Link to="/meetings" onClick={closeMenu}>
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

  const [menuOpen, setMenuOpen] = useState(false)

  function logout() {

    localStorage.removeItem("loggedIn")

    setIsLoggedIn(false)

  }

  if (!isLoggedIn) {

    return <Login setIsLoggedIn={setIsLoggedIn} />

  }

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-slate-950 text-white">

        {/* MOBILE HEADER */}

        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">

          <h1 className="text-xl font-bold">
            Colony Admin
          </h1>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>

        </div>

        {/* MOBILE SIDEBAR */}

        {menuOpen && (

          <div className="fixed inset-0 z-50 flex">

            <div className="w-64">

              <Sidebar
                logout={logout}
                closeMenu={() => setMenuOpen(false)}
              />

            </div>

            <div
              className="flex-1 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />

          </div>

        )}

        <div className="flex">

          {/* DESKTOP SIDEBAR */}

          <div className="hidden md:block w-64 min-h-screen border-r border-white/10 bg-slate-900">

            <Sidebar logout={logout} />

          </div>

          {/* PAGE CONTENT */}

          <div className="flex-1 p-4 md:p-8 overflow-x-hidden">

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

      </div>

    </BrowserRouter>

  )

}

export default App