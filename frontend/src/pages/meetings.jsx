import { useEffect, useState } from "react"
import api from "../services/api"


function Meetings() {

  const [activeTab, setActiveTab] = useState("add")

  const [selectedType, setSelectedType] = useState(null)

  const [meetings, setMeetings] = useState([])

  const [formData, setFormData] = useState({
    meetingType: "General Body Meeting",
    date: "",
    time: "",
    meetingMinutes: ""
  })

  const [editingId, setEditingId] = useState(null)

  

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
        meetingType:
          meeting.meetingType || "General Body Meeting",
        date: meeting.date,
        time: meeting.time,
        meetingMinutes: meeting.meetingMinutes || ""
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
      meetingMinutes: meeting.meetingMinutes || ""
    })

  }


  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Meetings
      </h1>

      <div className="flex gap-4 mb-8">

        <button
          onClick={() => setActiveTab("add")}
          className={`px-6 py-3 rounded-xl ${
            activeTab === "add"
              ? "bg-blue-500"
              : "bg-white/10"
          }`}
        >
          Add Meeting
        </button>

        <button
          onClick={() => setActiveTab("view")}
          className={`px-6 py-3 rounded-xl ${
            activeTab === "view"
              ? "bg-blue-500"
              : "bg-white/10"
          }`}
        >
          View Meetings
        </button>

      </div>





      {activeTab === "add" && (
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-xl mb-8"
      >

        <div className="grid md:grid-cols-3 gap-4">

          <select
            value={formData.meetingType}
            onChange={(e) =>
              setFormData({
                ...formData,
                meetingType: e.target.value
              })
            }
            className="bg-slate-800 p-3 rounded"
          >

            <option>General Body Meeting</option>

            <option>Executive Body Meeting</option>

              <option>Other Meeting</option>

          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value
              })
            }
            max={new Date().toISOString().split("T")[0]}
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

    )}


    {activeTab === "view" && (

  <div className="space-y-6">

    <button
      onClick={() => setSelectedType("General Body Meeting")}
      className="block w-full text-left bg-white/10 p-4 rounded-xl font-bold"
    >
      General Body Meeting
    </button>

    <button
      onClick={() => setSelectedType("Executive Body Meeting")}
      className="block w-full text-left bg-white/10 p-4 rounded-xl font-bold"
    >
      Executive Body Meeting
    </button>

    <button
      onClick={() => setSelectedType("Other Meeting")}
      className="block w-full text-left bg-white/10 p-4 rounded-xl font-bold"
    >
      Other Meeting
    </button>

    {selectedType && (

  <div className="mt-6 space-y-4">

    <h2 className="text-2xl font-bold">
      {selectedType}
    </h2>

    {meetings
      .filter(
        (meeting) =>
          meeting.meetingType === selectedType
      )
      .sort(
        (a, b) =>
          new Date(`${b.date} ${b.time}`) -
          new Date(`${a.date} ${a.time}`)
      )
      
      .map((meeting) => (

        <div
          key={meeting._id}
          className="bg-white/10 p-5 rounded-xl"
        >

          <p className="font-semibold">
            {meeting.date} | {meeting.time}
          </p>

          <p className="mt-3 whitespace-pre-wrap">
            {meeting.meetingMinutes}
          </p>

          <div className="flex gap-3 mt-4">

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

)}

  </div>

)}  


    </div>

  )

}

export default Meetings