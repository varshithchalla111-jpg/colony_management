import { useEffect, useState } from "react"
import api from "../services/api"

function Owners() {

  const [owners, setOwners] = useState([])

  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    familyMembers: "",
    plot: ""
  })


  useEffect(() => {
    fetchOwners()
  }, [])


  async function fetchOwners() {

    try {

      const response = await api.get("/owners")

      setOwners(response.data)

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


  // ADD OR UPDATE OWNER

  async function saveOwner() {

    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.plot === ""
    ) {
      alert("Please fill required fields")
      return
    }

    try {

      // UPDATE

      if (editingId) {

        await api.put(`/owners/${editingId}`, formData)

        setEditingId(null)

      }

      // ADD

      else {

        await api.post("/owners", formData)

      }

      fetchOwners()

      setFormData({
        name: "",
        phone: "",
        familyMembers: "",
        plot: ""
      })

    } catch (error) {

      console.log(error)

    }

  }


  // DELETE OWNER

  async function deleteOwner(id) {

    try {

      await api.delete(`/owners/${id}`)

      fetchOwners()

    } catch (error) {

      console.log(error)

    }

  }


  // EDIT OWNER

  function editOwner(owner) {

    setEditingId(owner._id)

    setFormData({
      name: owner.name,
      phone: owner.phone,
      familyMembers: owner.familyMembers,
      plot: owner.plot
    })

  }


  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Owners Management
      </h1>


      {/* FORM */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-6">

          {editingId ? "Edit Owner" : "Add New Owner"}

        </h2>


        <div className="grid grid-cols-2 gap-6">

          <input
            type="text"
            name="name"
            placeholder="Owner Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="number"
            name="familyMembers"
            placeholder="Family Members"
            value={formData.familyMembers}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          <input
            type="text"
            name="plot"
            placeholder="Plot Number"
            value={formData.plot}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />

        </div>


        <button
          onClick={saveOwner}
          className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold transition"
        >

          {editingId ? "Update Owner" : "Add Owner"}

        </button>

      </div>



      {/* OWNERS LIST */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Owners List
        </h2>


        {owners.length === 0 ? (

          <p className="text-slate-300">
            No owners added yet
          </p>

        ) : (

          <div className="space-y-4">

            {owners.map((owner) => (

              <div
                key={owner._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {owner.name}
                  </h3>

                  <p className="text-slate-300">
                    Phone: {owner.phone}
                  </p>

                  <p className="text-slate-300">
                    Family Members: {owner.familyMembers}
                  </p>

                  <p className="text-slate-300">
                    Plot: {owner.plot}
                  </p>

                </div>


                {/* ACTION BUTTONS */}

                <div className="flex gap-3">

                  <button
                    onClick={() => editOwner(owner)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => deleteOwner(owner._id)}
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

export default Owners