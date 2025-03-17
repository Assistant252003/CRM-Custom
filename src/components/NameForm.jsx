import React, { useState } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

const NameForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trim values to prevent unwanted spaces
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      alert("Please enter both first and last name.");
      return;
    }

    setLoading(true);
    try {
      const dbRef = ref(database, "users/" + Date.now());

      await set(dbRef, {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      });

      alert("Data submitted successfully!");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("Failed to submit data. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default NameForm;
