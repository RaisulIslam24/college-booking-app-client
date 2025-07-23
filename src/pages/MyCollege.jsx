import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCollege = () => {
  const [admission, setAdmission] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [success, setSuccess] = useState(false);

  const userEmail = "raisulislam.cse3.bu@gmail.com";

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admissions/${userEmail}`
        );
        setAdmission(res.data[0]);
      } catch (err) {
        console.error("Error fetching admission data:", err);
      }
    };

    fetchAdmission();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews", {
        collegeName: admission?.college?.name,
        reviewer: admission?.name,
        rating,
        comment: review,
      });
      setSuccess(true);
      setReview("");
      setRating(5);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (!admission) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My College Details</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <img
          src={admission?.college?.image}
          alt={admission?.college?.name}
          className="w-full h-64 object-cover rounded"
        />
        <h3 className="text-xl font-semibold mt-4">
          {admission?.college?.name}
        </h3>
        <p className="text-gray-700 mt-2">
          <strong>Admission Date:</strong> {admission?.college?.admissionDates}
        </p>
        <p className="mt-2">
          <strong>Candidate Name:</strong> {admission?.name}
        </p>
        <p>
          <strong>Subject:</strong> {admission?.subject}
        </p>
        <p>
          <strong>Email:</strong> {admission?.email}
        </p>
        <p>
          <strong>Phone:</strong> {admission?.phone}
        </p>
        <p>
          <strong>Address:</strong> {admission?.address}
        </p>
        <p>
          <strong>Date of Birth:</strong> {admission?.dob}
        </p>
      </div>

      <form
        onSubmit={handleReviewSubmit}
        className="mt-8 bg-gray-100 p-6 rounded shadow"
      >
        <h4 className="text-2xl font-semibold mb-4">Leave a Review</h4>
        {success && (
          <p className="text-green-600 mb-2">
            ✅ Review submitted successfully!
          </p>
        )}
        <textarea
          className="w-full p-3 rounded border border-gray-300"
          rows="4"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        ></textarea>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="p-2 border rounded w-24"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default MyCollege;
