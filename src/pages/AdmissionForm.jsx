import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AdmissionForm = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: null,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => setCollege(data))
      .catch((err) => console.error("College fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    payload.append("college", JSON.stringify(college));

    try {
      const res = await fetch("http://localhost:5000/api/admissions", {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        alert("Admission submitted successfully!");
        setFormData({
          name: "",
          subject: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          image: null,
        });
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong!");
    }
  };

  if (!college)
    return <p className="text-center mt-10">Loading college data...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-xl font-bold mb-4">
        Admission Form for {college.name}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
        encType="multipart/form-data"
      >
        <input
          name="name"
          required
          placeholder="Candidate Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="subject"
          required
          placeholder="Subject"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="phone"
          required
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="address"
          required
          placeholder="Address"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="dob"
          required
          type="date"
          placeholder="Date of Birth"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="image"
          required
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
