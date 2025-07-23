import { useEffect, useState } from "react";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-xl p-6 border"
          >
            <h3 className="text-lg font-semibold mb-2">{review.collegeName}</h3>
            <p className="text-gray-700 italic mb-2">"{review.feedback}"</p>
            <p className="text-sm text-right text-gray-500">
              - {review.studentName}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
