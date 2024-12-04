// // BookingForm.js
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./Dashboard.css";

// const BookingForm = () => {
//   const { doctorId } = useParams(); // Get doctorId from the URL
//   const [doctorDetails, setDoctorDetails] = useState(null);
//   const [isNewPatient, setIsNewPatient] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch the doctor details when the component mounts
//   useEffect(() => {
//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8082/doctor/${doctorId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch doctor details');
//         }
//         const data = await response.json();
//         setDoctorDetails(data); // Set the doctor data
//         setLoading(false); // Stop loading
//       } catch (err) {
//         setError(err.message); // Handle error
//         setLoading(false);
//       }
//     };

//     fetchDoctorDetails();
//   }, [doctorId]); // The effect runs every time doctorId changes

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Booking confirmed!");
//   };

//   // Display loading or error messages if necessary
//   if (loading) return <div>Loading doctor details...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="booking-container">
//       <header>
//         <h1>Review and Book</h1>
//       </header>
//       <div className="doctor-card">
//         <img
//           src={doctorDetails?.photoUrl || "https://via.placeholder.com/150"} // Fallback to placeholder
//           alt={doctorDetails?.name || "Doctor"}
//           className="doctor-photo"
//         />
//         <div className="doctor-info">
//           <h2>{doctorDetails?.name}</h2>
//           <p>{doctorDetails?.specialty}</p>
//           <div className="rating">{"⭐".repeat(doctorDetails?.rating || 0)}</div>
//           <p>{doctorDetails?.description}</p>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} className="booking-form">
//         <div className="patient-info">
//           <h3>Patient Information: N. Vishnu Teja</h3>
//           <div className="new-patient">
//             <p>Are you a new patient?</p>
//             <label>
//               <input
//                 type="radio"
//                 name="new-patient"
//                 value="yes"
//                 onChange={() => setIsNewPatient(true)}
//               />
//               Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="new-patient"
//                 value="no"
//                 onChange={() => setIsNewPatient(false)}
//               />
//               No
//             </label>
//           </div>
//         </div>
//         <div className="contact-info">
//           <label>
//             Contact Information
//             <input
//               type="tel"
//               placeholder="Add phone number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//         <div className="insurance-info">
//           <h4>Insurance Information</h4>
//           <p>Blue Cross Blue Shield of Texas - Blue Edge PPO</p>
//           <button type="button">Edit</button>
//         </div>
//         <button type="submit" className="book-now-button">
//           Book Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./Dashboard.css"; // Add your CSS file for styling

// function BookingForm() {
//   const { doctorId } = useParams(); // Get doctorId from the URL
//   const [doctorDetails, setDoctorDetails] = useState(null);

//   // Simulate fetching doctor details
//   useEffect(() => {
//     // Replace this with your actual API call
//     fetch(`http://localhost:8082/doctor/doctorId/${doctorId}`)
//       .then((response) => response.json())
//       .then((data) => setDoctorDetails(data))
//       .catch((error) => console.error("Error fetching doctor details:", error));
//   }, [doctorId]);

//   if (!doctorDetails) {
//     return <p>Loading doctor details...</p>;
//   }

//   return (
//     <div className="booking-container">
//       <h1 className="booking-title">Review and Book</h1>

//       <div className="doctor-details">
//         <img
//           src={doctorDetails.photo || "default-doctor.jpg"}
//           alt={doctorDetails.name}
//           className="doctor-photo"
//         />
//         <div className="doctor-info">
//           <h2>Dr. {doctorDetails.firstName} {doctorDetails.lastName}</h2>
//           <p className="doctor-specialty">{doctorDetails.specialty}</p>
//           <p className="doctor-description">{doctorDetails.description}</p>
//         </div>
//       </div>

//       <div className="patient-info">
//         <h3>Patient Information: John Doe (Me)</h3>
//         <div className="new-patient">
//           <label>Are you a new patient?</label>
//           <input type="radio" name="newPatient" value="yes" /> Yes
//           <input type="radio" name="newPatient" value="no" /> No
//         </div>
//         <p className="booking-others">I am booking for someone else</p>
//       </div>

//       <div className="contact-info">
//         <h3>Contact Information</h3>
//         <label>Phone number where the practice can reach you</label>
//         <input type="text" placeholder="Add phone number" />
//       </div>

//       <div className="insurance-info">
//         <h3>Insurance Information</h3>
//         <label>Insurance</label>
//         <p>{doctorDetails.insurance || "Not specified"}</p>
//       </div>

//       <button className="book-now-button">Book Now</button>
//     </div>
//   );
// }

// export default BookingForm;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Add Calendar styles
import "./Dashboard.css"; // Add your existing styles

function BookingForm() {
  const { doctorId } = useParams(); // Get doctorId from the URL
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Selected date
  const [selectedTime, setSelectedTime] = useState(null); // Selected time
  const [availableHours, setAvailableHours] = useState([]); // Hours available for booking
  const [bookingMessage, setBookingMessage] = useState(""); // Booking confirmation message

  // Simulate fetching doctor details
  useEffect(() => {
    // Replace this with your actual API call
    fetch(`http://localhost:8082/doctor/doctorId/${doctorId}`)
      .then((response) => response.json())
      .then((data) => setDoctorDetails(data))
      .catch((error) => console.error("Error fetching doctor details:", error));
  }, [doctorId]);

  // Simulate fetching available hours (this should be dynamic based on the selected date and doctorId)
  const fetchAvailableHours = (date) => {
    // Simulated hours for demonstration purposes
    const hours = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
    ];
    setAvailableHours(hours);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableHours(date); // Fetch hours for the selected date
    setSelectedTime(null); // Reset selected time when date changes
    setBookingMessage(""); // Clear booking message
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingMessage(""); // Clear booking message
  };

  // Handle booking confirmation
  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    // Simulate booking confirmation
    setBookingMessage(
      `Appointment booked with Dr. ${doctorDetails.firstName} ${doctorDetails.lastName} on ${selectedDate.toDateString()} at ${selectedTime}.`
    );
  };

  if (!doctorDetails) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="booking-container">
      <h1 className="booking-title">Review and Book</h1>

      <div className="doctor-details">
        <img
          src={doctorDetails.photo || "default-doctor.jpg"}
          alt={doctorDetails.name}
          className="doctor-photo"
        />
        <div className="doctor-info">
          <h2>Dr. {doctorDetails.firstName} {doctorDetails.lastName}</h2>
          <p className="doctor-specialty">{doctorDetails.specialty}</p>
          <p className="doctor-description">{doctorDetails.description}</p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-container">
        <h3>Select a Date:</h3>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      {/* Time Slots Section */}
      {selectedDate && (
        <div className="time-slot-container">
          <h3>Select a Time Slot:</h3>
          <div className="time-slots">
            {availableHours.map((hour, index) => (
              <button
                key={index}
                className={`time-slot ${selectedTime === hour ? "selected" : ""}`}
                onClick={() => handleTimeSelect(hour)}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Booking Button */}
      {selectedDate && selectedTime && (
        <button className="book-now-button" onClick={handleBooking}>
          Confirm Appointment
        </button>
      )}

      {/* Booking Confirmation Message */}
      {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
    </div>
  );
}

export default BookingForm;
