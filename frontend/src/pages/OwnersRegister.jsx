import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"


function OwnersRegister() {

  const [owners, setOwners] = useState([])

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

  return (

    <div className="bg-white min-h-screen text-black p-8">

      <Link to="/owners">
        <button className="mb-6 bg-blue-500 text-white px-5 py-2 rounded-xl">
          ← Back to Owners
        </button>
      </Link>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Owners Register
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

          <tr className="border border-black">

            <th className="border border-black p-3">
              Owner Name
            </th>

            <th className="border border-black p-3">
              Plot Number
            </th>

            <th className="border border-black p-3">
              Family Members
            </th>

          </tr>

        </thead>

        <tbody>

          {owners.map((owner) => (

            <tr
              key={owner._id}
              className="border border-black"
            >

              <td className="border border-black p-3">
                {owner.name}
              </td>

              <td className="border border-black p-3">
                {owner.plot}
              </td>

              <td className="border border-black p-3">
                {owner.familyMembers}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default OwnersRegister