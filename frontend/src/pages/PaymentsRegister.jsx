import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

function PaymentsRegister() {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetchPayments()
  }, [])

  async function fetchPayments() {

    try {

      const response = await api.get("/payments")

      setPayments(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="bg-white text-black min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">

        <Link to="/payments">
          <button className="mb-6 bg-blue-500 px-5 py-2 rounded-xl">
            ← Back to Payments
          </button>
        </Link>

        <h1 className="text-3xl font-bold">
          Payment Register
        </h1>

        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Print Register
        </button>

      </div>

      <table className="w-full border border-black">

        <thead>

          <tr className="border-b border-black">

            <th className="border border-black p-3">
              Owner
            </th>

            <th className="border border-black p-3">
              Type
            </th>

            <th className="border border-black p-3">
              Amount
            </th>

            <th className="border border-black p-3">
              Year
            </th>

            <th className="border border-black p-3">
              Method
            </th>

            <th className="border border-black p-3">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment) => (

            <tr key={payment._id}>

              <td className="border border-black p-3">
                {payment.ownerName}
              </td>

              <td className="border border-black p-3">
                {payment.paymentType}
              </td>

              <td className="border border-black p-3">
                ₹ {payment.amount}
              </td>

              <td className="border border-black p-3">
                {payment.year}
              </td>

              <td className="border border-black p-3">
                {payment.paymentMethod}
              </td>

              <td className="border border-black p-3">
                {payment.paymentDate}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default PaymentsRegister