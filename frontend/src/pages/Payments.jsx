import { useEffect, useState } from "react"
import api from "../services/api"

function Payments() {

  const [owners, setOwners] = useState([])

  const [payments, setPayments] = useState([])

  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    ownerName: "",
    paymentType: "Membership",
    year: new Date().getFullYear(),
    status: "Paid"
  })


  useEffect(() => {

    fetchOwners()
    fetchPayments()

  }, [])


  async function fetchOwners() {

    try {

      const response = await api.get("/owners")

      setOwners(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  async function fetchPayments() {

    try {

      const response = await api.get("/payments")

      setPayments(response.data)

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


  // AUTO AMOUNT

  function getAmount(type) {

    if (type === "Membership") {
      return 1000
    }

    if (type === "Yearly Subscription") {
      return 1200
    }

    return 0

  }


  // ADD OR UPDATE PAYMENT

  async function savePayment() {

    if (formData.ownerName === "") {

      alert("Please select owner")

      return

    }

    try {

      const paymentData = {
        ...formData,
        amount: getAmount(formData.paymentType)
      }


      // UPDATE

      if (editingId) {

        await api.put(`/payments/${editingId}`, paymentData)

        setEditingId(null)

      }

      // ADD

      else {

        await api.post("/payments", paymentData)

      }


      fetchPayments()

      setFormData({
        ownerName: "",
        paymentType: "Membership",
        year: new Date().getFullYear(),
        status: "Paid"
      })

    } catch (error) {

      console.log(error)

    }

  }


  // DELETE PAYMENT

  async function deletePayment(id) {

    try {

      await api.delete(`/payments/${id}`)

      fetchPayments()

    } catch (error) {

      console.log(error)

    }

  }


  // EDIT PAYMENT

  function editPayment(payment) {

    setEditingId(payment._id)

    setFormData({
      ownerName: payment.ownerName,
      paymentType: payment.paymentType,
      year: payment.year,
      status: payment.status
    })

  }


  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Payments Management
      </h1>


      {/* FORM */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

        <h2 className="text-2xl font-semibold mb-6">

          {editingId ? "Edit Payment" : "Add Payment"}

        </h2>


        <div className="grid grid-cols-2 gap-6">


          {/* OWNER */}

          <select
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          >

            <option value="">Select Owner</option>

            {owners.map((owner) => (

              <option
                key={owner._id}
                value={owner.name}
                className="text-black"
              >
                {owner.name}
              </option>

            ))}

          </select>


          {/* PAYMENT TYPE */}

          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          >

            <option className="text-black">
              Membership
            </option>

            <option className="text-black">
              Yearly Subscription
            </option>

          </select>


          {/* YEAR */}

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="bg-white/10 border border-white/10 rounded-xl p-4 outline-none text-white"
          />


          {/* AUTO AMOUNT */}

          <div className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-center text-xl font-bold">

            ₹ {getAmount(formData.paymentType)}

          </div>

        </div>


        <button
          onClick={savePayment}
          className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
        >

          {editingId ? "Update Payment" : "Add Payment"}

        </button>

      </div>



      {/* PAYMENTS LIST */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Payments History
        </h2>


        {payments.length === 0 ? (

          <p className="text-slate-300">
            No payments added yet
          </p>

        ) : (

          <div className="space-y-4">

            {payments.map((payment) => (

              <div
                key={payment._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {payment.ownerName}
                  </h3>

                  <p className="text-slate-300">
                    Type: {payment.paymentType}
                  </p>

                  <p className="text-slate-300">
                    Amount: ₹{payment.amount}
                  </p>

                  <p className="text-slate-300">
                    Year: {payment.year}
                  </p>

                </div>


                {/* ACTION BUTTONS */}

                <div className="flex gap-3">

                  <button
                    onClick={() => editPayment(payment)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => deletePayment(payment._id)}
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

export default Payments