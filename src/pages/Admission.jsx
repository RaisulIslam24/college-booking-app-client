// src/pages/Admission.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admission = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.error("Error fetching colleges:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Choose a College for Admission
      </h1>
      <ul className="grid gap-4">
        {colleges.map((college) => (
          <li key={college._id}>
            <Link
              to={`/admission/${college._id}`}
              className="block p-4 bg-white shadow hover:bg-blue-50 rounded text-blue-700 font-medium"
            >
              {college.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admission;
