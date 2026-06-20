import { useEffect, useState } from "react"
import api from "../services/api"

function Meetings() {

  const [meetings, setMeetings] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    meetingMinutes: ""
  })

  const [editingId, setEditingId] = useState(null)

  const [showHistory, setShowHistory] = useState(false)

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

  async function handleSubmit(e) {

    e.preventDefault()

    const meetingData = {
      ...formData
    }

    try {

      if (editingId) {

        await api.put(
          `/meetings/${editingId}`,
          meetingData
        )

        setEditingId(null)

      } else {

        await api.post(
          "/meetings",
          meetingData
        )

      }

      setFormData({
        title: "",
        date: "",
        time: "",
        hours: "",
        minutes: ""
      })

      fetchMeetings()

    } catch (error) {

      console.log(error)

    }

  }

  async function deleteMeeting(id) {

    if (!window.confirm("Delete meeting?")) {
      return
    }

    try {

      await api.delete(`/meetings/${id}`)

      fetchMeetings()

    } catch (error) {

      console.log(error)

    }

  }

  function editMeeting(meeting) {

    setEditingId(meeting._id)

    setFormData({
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      hours: meeting.hours,
      minutes: meeting.minutes
    })

  }

  const totalMinutes = meetings.reduce(
    (sum, meeting) => sum + Number(meeting.totalMinutes || 0),
    0
  )

  const totalHours = Math.floor(totalMinutes / 60)

  const remainingMinutes = totalMinutes % 60

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Meetings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-xl mb-8"
      >

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Meeting Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
            }
            className="bg-slate-800 p-3 rounded"
            required
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value
              })
            }
            className="bg-slate-800 p-3 rounded"
            required
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({
                ...formData,
                time: e.target.value
              })
            }
            className="bg-slate-800 p-3 rounded"
            required
          />

          <textarea
            placeholder="Meeting Minutes"
            value={formData.meetingMinutes}
            onChange={(e) =>
              setFormData({
                ...formData,
                meetingMinutes: e.target.value
              })
            }
            className="bg-slate-800 p-3 rounded md:col-span-3 min-h-[150px]"
            required
          />

        </div>

        <button
          className="mt-4 bg-blue-500 px-6 py-3 rounded"
        >
          {editingId ? "Update Meeting" : "Add Meeting"}
        </button>

      </form>

      <div className="bg-white/10 p-6 rounded-xl mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Meeting Statistics
        </h2>

        <p>
          Total Meetings: {meetings.length}
        </p>

        <p className="mt-2">
          Total Meeting Time:
          {" "}
          {totalHours} Hours
          {" "}
          {remainingMinutes} Minutes
        </p>

      </div>

      <div className="space-y-4">

        {meetings.map((meeting) => (

          <div
            key={meeting._id}
            className="bg-white/10 p-5 rounded-xl flex justify-between items-center"
          >

            <div>

              <h3 className="text-xl font-bold">
                {meeting.title}
              </h3>

              <p>
                {meeting.date} | {meeting.time}
              </p>

              <p>
                {meeting.hours}h {meeting.minutes}m
              </p>

            </div>

            <div className="space-x-2">

              <button
                onClick={() => editMeeting(meeting)}
                className="bg-yellow-500 px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteMeeting(meeting._id)
                }
                className="bg-red-500 px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Meetings