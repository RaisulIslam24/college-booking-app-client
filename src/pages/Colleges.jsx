import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/colleges");
        const data = await res.json();
        setColleges(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  if (loading)
    return <div className="text-center py-10 text-xl">Loading colleges...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Colleges</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-md transition-all"
          >
            <img
              src={college.image}
              alt={college.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{college.name}</h2>
              <p className="text-gray-600 mb-1">
                Admission Date: {college.admissionDates}
              </p>
              <p className="text-gray-600 mb-1">Rating: ⭐ {college.rating}</p>
              <p className="text-gray-600 mb-1">
                Number of Research: {college.research.length}
              </p>
              <Link
                to={`/colleges/${college._id}`}
                className="mt-3 inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colleges;
