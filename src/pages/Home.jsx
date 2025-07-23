import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  const galleryImages = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWWFJMpUzv_xPy_t5D4VqHT6878byW02iaUqer15QLssBHH7sjnUa4vI&s",
    },
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb24IiO5mvwytxKGLNOdNoJgeGXNI5jP_nR3tXRlaXQGvN9s8DXx-xL88&s",
    },
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2d6tD2RmlTKt2jA90rMtmVABCnmLy_wvsf41LB_T2sAXiEOL4oZPRYLI&s",
    },
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbw0NFpfAhCbcnbXZC9HRWBEeWEYGSt_FV-hwWz_DT59ezYHYJ_soWiss&s",
    },
  ];

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/colleges");
        const data = await res.json();
        setColleges(data);
        setFilteredColleges(data);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };
    fetchColleges();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg shadow"
        />
      </div>

      <h2 className="text-2xl font-bold mb-6">Top Colleges</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredColleges.slice(0, 3).map((college) => (
          <div
            key={college._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all"
          >
            <img
              src={college.image}
              alt={college.name}
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Admission Date: {college.admissionDates}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Events: {college.events?.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Research: {college.research?.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Sports: {college.sports?.join(", ")}
              </p>
              <Link
                to={`/colleges/${college._id}`}
                className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Graduates Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {galleryImages.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt="Graduate"
            className="rounded-lg shadow-md h-40 w-60"
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Recommended Research Papers</h2>
      <ul className="list-disc list-inside mb-12 text-blue-700">
        <li>
          <a href="#" className="hover:underline">
            Deep Learning in Agriculture - Oxford
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            AI for Disease Detection - Stanford
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Blockchain in Education - MIT
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-gray-50 p-4 rounded shadow">
            <h4 className="font-semibold text-lg">{review.collegeName}</h4>
            <p className="text-sm text-gray-700">{review.comment}</p>
            <p>- {review.reviewer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
