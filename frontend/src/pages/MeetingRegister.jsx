import { useEffect, useState } from "react"
import api from "../services/api"

function MeetingRegister() {

  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    fetchMeetings()
  }, [])

  async function fetchMeetings() {

    try {

      const response = await api.get("/meetings")

      setMeetings(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  function printPage() {

    window.print()

  }

  return (

    <div className="min-h-screen bg-white text-black p-8">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Velankani Nagar Welfare Association
        </h1>

        <button
          onClick={printPage}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Print
        </button>

      </div>

      <h2 className="text-2xl font-semibold mb-6">
        Meeting Register
      </h2>

      <table className="w-full border border-black">

        <thead>

          <tr>

            <th className="border border-black p-3">
              Date
            </th>

            <th className="border border-black p-3">
              Time
            </th>

            <th className="border border-black p-3">
              Title
            </th>

            <th className="border border-black p-3">
              Meeting Minutes
            </th>

          </tr>

        </thead>

        <tbody>

          {meetings.map((meeting) => (

            <tr key={meeting._id}>

              <td className="border border-black p-3">
                {meeting.date}
              </td>

              <td className="border border-black p-3">
                {meeting.time}
              </td>

              <td className="border border-black p-3">
                {meeting.title}
              </td>

              <td className="border border-black p-3">
                {meeting.meetingMinutes}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default MeetingRegister