import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/colleges/${id}`).then((res) => {
      setCollege(res.data);
    });
  }, [id]);

  if (!college) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <img
        src={college.image}
        alt={college.name}
        className="w-full rounded-xl mb-6"
      />
      <h2 className="text-3xl font-bold mb-4">{college.name}</h2>
      <p className="mb-2 text-xl font-semibold">Admission Process:</p>
      <ul className="list-disc list-inside text-gray-700">
        {college.admissionProcess}
      </ul>
      <div className="my-4">
        <h3 className="text-xl font-semibold">Events:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {college.events?.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Research Works:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {college.research?.map((paper, i) => (
            <li key={i}>{paper}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Sports:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {college.sports?.map((sport, i) => (
            <li key={i}>{sport}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeDetails;
