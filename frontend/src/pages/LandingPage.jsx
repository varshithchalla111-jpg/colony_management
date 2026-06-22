import { Link } from "react-router-dom"

function LandingPage() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white px-6">

      <h1 className="text-5xl font-bold text-center mb-8">
  Velankani Nagar Welfare Association
</h1>

<div className="max-w-4xl text-center text-lg text-slate-300 space-y-5 mb-10">

  <p>
    Velankani Nagar is a vibrant residential community founded over
    27 years ago by Fr. Maramreddy Anthony Reddy, whose vision was
    to create a peaceful, united, and well-planned neighborhood
    for families.
  </p>

  <p>
    To further this vision and address the growing needs of the
    community, the Velankani Nagar Welfare Association was
    established in 2019. Since then, the Association has been
    dedicated to promoting the welfare and development of the
    colony by fostering unity among residents, improving civic
    amenities, addressing community concerns, and working closely
    with government authorities.
  </p>

  <p>
    Through this app, residents can stay updated with important
    announcements, participate in community initiatives, access
    colony records, track subscriptions, and contribute to the
    continued development of Velankani Nagar.
  </p>

  <p className="font-semibold text-white text-xl">
    “Together for a Better Velankani Nagar.”
  </p>

</div>

<Link to="/login">
  <button className="bg-blue-500 hover:bg-blue-600 px-10 py-4 rounded-xl text-xl font-semibold">
    Login
  </button>
</Link>

    
    </div>

  )

}

export default LandingPage