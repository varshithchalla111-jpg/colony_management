import { useState } from "react"
import api from "../services/api"

function Login({ setIsLoggedIn }) {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })


  function handleChange(event) {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })

  }


  async function login() {

  try {

    const response = await api.post("/login", formData)

    if (response.data.success) {

      localStorage.setItem("loggedIn", "true")

      setIsLoggedIn(true)

    } else {

      alert(response.data.message)

    }

  } catch (error) {

    console.log(error)

  }

}

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          COLONY ADMIN LOGIN1
        </h1>


        <div className="space-y-6">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <button
            onClick={login}
            className="w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>

  )

}

export default Login