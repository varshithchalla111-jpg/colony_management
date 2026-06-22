import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

function UnpaidOwnersRegister() {

  const [owners, setOwners] = useState([])

  useEffect(() => {
    fetchUnpaidOwners()
  }, [])

  async function fetchUnpaidOwners() {

    try {

      const currentYear = new Date().getFullYear()

      const response = await api.get(
        `/unpaid-owners/${currentYear}`
      )

      setOwners(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="min-h-screen bg-white text-black p-8">

      <Link to="/payments">
        <button className="mb-6 bg-blue-500 text-white px-5 py-2 rounded-xl">
          ← Back to Payments
        </button>
      </Link>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Unpaid Owners Register
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

          <tr className="border-b border-black">

            <th className="p-3 border">
              Owner Name
            </th>

            <th className="p-3 border">
              Plot Number
            </th>

            <th className="p-3 border">
              Family Members
            </th>

          </tr>

        </thead>

        <tbody>

          {owners.map((owner) => (

            <tr key={owner._id}>

              <td className="p-3 border">
                {owner.name}
              </td>

              <td className="p-3 border">
                {owner.plot}
              </td>

              <td className="p-3 border">
                {owner.familyMembers}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default UnpaidOwnersRegister