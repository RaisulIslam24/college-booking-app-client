import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust the path if needed

export default function Profile() {
  const { user } = useAuth(); // assumes context returns Firebase user
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });

  // Fetch user data from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          // If user doc doesn't exist, create one
          await setDoc(docRef, {
            name: user.displayName || "",
            email: user.email,
            university: "",
            address: "",
          });
          setFormData({
            name: user.displayName || "",
            email: user.email,
            university: "",
            address: "",
          });
        }
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, formData);
      alert("Profile updated");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (!user)
    return <p className="text-center">Please log in to see your profile.</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="border p-2 w-full"
            value={formData.email}
            disabled
          />
        </div>

        <div>
          <label className="block font-medium">University</label>
          <input
            type="text"
            name="university"
            className="border p-2 w-full"
            value={formData.university}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            className="border p-2 w-full"
            value={formData.address}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {!editMode ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
