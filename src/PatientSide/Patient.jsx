// // App.jsx
// import React from 'react';
// import "./Dashboard.css";
// const PatientDashboard = () => {
//   return (
//     <div className="App">
//       <header className="header">
//         <div className="logo">Health Portal</div>
//         <nav className="nav">
//           <a href="#">Find Doctors</a>
//           <a href="#">Video Consult</a>
//           <a href="#">Surgeries</a>
//         </nav>
//         <div className="user-actions">
//           <a href="#">Browse</a>
//           <a href="#">Help</a>
//           <a href="#">Contact</a>
//           <span className="bell-icon">🔔</span>
//           <span className="user-icon">👤</span>
//         </div>
//       </header>

//       <div className="hero">
//         <h1>Book local doctor who take your insurance</h1>
//         <div className="search-bar">
//           <input type="text" placeholder="Search doctors, Hospitals etc." />
//           <input type="text" placeholder="Select your location" />
//           <input type="text" placeholder="Select your insurance" />
//           <button className="search-button">🔍</button>
//         </div>
//         <div className="hero-image">
//           <img src="doctor_image_placeholder.png" alt="Doctor" />
//         </div>
//       </div>

//       <section className="specialties">
//         <h2>Top-searched specialties</h2>
//         <div className="specialties-grid">
//           <div className="specialty-card">
//             <div className="icon">❤️</div>
//             <p>Primary Care</p>
//           </div>
//           <div className="specialty-card">
//             <div className="icon">🦷</div>
//             <p>Dentist</p>
//           </div>
//           <div className="specialty-card">
//             <div className="icon">👁️</div>
//             <p>Eye Doctor</p>
//           </div>
//           <div className="specialty-card">
//             <div className="icon">🧠</div>
//             <p>Psychiatrist</p>
//           </div>
//         </div>
//         <button className="view-more">View more</button>
//       </section>
//     </div>
//   );
// }

// export default PatientDashboard;



// import React, { useState, useEffect } from 'react';
// import "./Dashboard.css";
// import PlaceComponent from '../PlacesAutoComplete';

// function DoctorListPage() {
//   // State to store the search criteria
//   const [specialty, setSpecialty] = useState('');
//   const [location, setLocation] = useState('');
//   const [insurance, setInsurance] = useState(''); // Insurance state
//   const [doctors, setDoctors] = useState([]);

//   // State for loading and error handling
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Function to handle the search
//   const handleSearch = async () => {
//     if (!specialty || !location) {
//       alert('Please provide both specialty and location');
//       return;
//     }
//     setLoading(true);
//     setError(null); // Reset error state before fetching data

//     // Encode the specialty and location parameters
//     const encodedSpecialty = encodeURIComponent(specialty);
//     const encodedLocation = encodeURIComponent(location);

//     try {
//       const response = await fetch(
//         `http://localhost:8082/doctor/bySpecialtyAndAddress?specialty=${encodedSpecialty}&address=${encodedLocation}`
//       );

//       if (!response.ok) {
//         // Log detailed error message
//         const errorText = await response.text();
//         console.error('API Error:', errorText);
//         throw new Error('Failed to fetch doctors');
//       }

//       const data = await response.json();
//       setDoctors(data); // Set the doctor data
//     } catch (err) {
//       console.error('Error:', err.message); // Log the error to the console
//       setError(err.message); // Set the error state if the fetch fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="doctor-list-page">
//       <header className="header">
//         <div className="logo">Health Portal</div>
//         <nav className="nav">
//           <a href="#">Find Doctors</a>
//           <a href="#">Video Consult</a>
//           <a href="#">Surgeries</a>
//         </nav>
//         <div className="user-actions">
//           <a href="#">Browse</a>
//           <a href="#">Help</a>
//           <a href="#">Contact</a>
//           <span className="bell-icon">🔔</span>
//           <span className="user-icon">👤</span>
//         </div>
//       </header>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Enter specialty"
//           value={specialty}
//           onChange={(e) => setSpecialty(e.target.value)}
//         />

//         {/* Use PlaceComponent for location search */}
//         <PlaceComponent setAddress={setLocation} />

//         <input
//           type="text"
//           placeholder="Enter insurance (optional)"
//           value={insurance}
//           onChange={(e) => setInsurance(e.target.value)} // Handle insurance input
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {loading && <p>Loading doctors...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {doctors.length > 0 && (
//         <div className="doctor-cards">
//           {doctors.map((doctor) => (
//             <div key={doctor.doctorId} className="doctor-card">
//               <img
//                 src="doctor_image_placeholder.png" // Placeholder image (could be dynamic if image URL is in the data)
//                 alt={`${doctor.firstName} ${doctor.lastName}`}
//                 className="doctor-image"
//               />
//               <div className="doctor-info">
//                 <h2>{`${doctor.firstName} ${doctor.lastName}`}</h2>
//                 <p className="specialty">{doctor.specialty}</p>
//                 <p className="address">{doctor.address}</p>
//                 <p className="gender">{doctor.gender}</p>
//                 <p className="patient-type">{doctor.patientType}</p>
//                 <div className="rating">
//                   {'⭐'.repeat(5)} {/* Static stars, but can be dynamic if the rating is in the payload */}
//                 </div>
//               </div>
//               <button className="appointment-button">
//                 <span>📅</span> Book Appointment
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DoctorListPage;



// import React, { useState, useEffect } from 'react';
// import "./Dashboard.css";
// import PlaceComponent from '../PlacesAutoComplete';

// function DoctorListPage() {
//   // State to store the search criteria
//   const [specialty, setSpecialty] = useState('');
//   const [location, setLocation] = useState('');
//   const [insurance, setInsurance] = useState(''); // Insurance state
//   const [insuranceProviders, setInsuranceProviders] = useState([]); // Insurance providers list
//   const [insuranceLoading, setInsuranceLoading] = useState(false); // Loading state for insurance providers
//   const [insuranceError, setInsuranceError] = useState(null); // Error state for insurance fetching
//   const [doctors, setDoctors] = useState([]); // State to store doctors list
//   const [loading, setLoading] = useState(false); // Loading state for doctors
//   const [error, setError] = useState(null); // Error state for doctors

//   // Predefined list of state abbreviations (already given)
//   const states = [
//     'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
//     'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
//   ];

//   // Function to fetch insurance providers based on state
//   const fetchInsuranceProviders = async () => {
//     const state = states[Math.floor(Math.random() * states.length)]; // Randomly select a state for demonstration

//     setInsuranceLoading(true);
//     setInsuranceError(null);

//     const apiKey = 'kgJnUQyTNL6oiGan4XIUpoONx3LIe1HR';  // Your API key
//     const year = 2024;
//     const limit = 25;
//     let offset = 0;
//     let allInsuranceProviders = [];

//     try {
//       let hasMoreData = true;

//       while (hasMoreData) {
//         const url = `https://marketplace.api.healthcare.gov/api/v1/issuers?apikey=${apiKey}&year=${year}&state=${state}&limit=${limit}&offset=${offset}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch insurance providers for state ${state}`);
//         }

//         const data = await response.json();
//         const providers = data.issuers.map((issuer) => issuer.name);
//         allInsuranceProviders = [...allInsuranceProviders, ...providers];

//         // Check if there are more pages to fetch
//         hasMoreData = data.issuers.length === limit;
//         offset += limit;
//       }

//       setInsuranceProviders(allInsuranceProviders);
//     } catch (error) {
//       setInsuranceError(error.message);
//     } finally {
//       setInsuranceLoading(false);
//     }
//   };

//   // Handle insurance input focus (trigger fetch)
//   const handleInsuranceInputFocus = () => {
//     if (!insuranceProviders.length) { // Only fetch if no providers are already fetched
//       fetchInsuranceProviders();
//     }
//   };

//   // Handle insurance input change
//   const handleInsuranceInputChange = (e) => {
//     setInsurance(e.target.value);
//   };

//   // Function to handle the search for doctors
//   const handleSearch = async () => {
//     if (!specialty || !location) {
//       alert('Please provide both specialty and location');
//       return;
//     }

//     setLoading(true);
//     setError(null); // Reset error state before fetching data

//     const encodedSpecialty = encodeURIComponent(specialty);
//     const encodedLocation = encodeURIComponent(location);

//     try {
//       const response = await fetch(
//         `http://localhost:8082/doctor/bySpecialtyAndAddress?specialty=${encodedSpecialty}&address=${encodedLocation}`
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('API Error:', errorText);
//         throw new Error('Failed to fetch doctors');
//       }

//       const data = await response.json();
//       setDoctors(data); // Set the doctor data
//     } catch (err) {
//       console.error('Error:', err.message); // Log the error to the console
//       setError(err.message); // Set the error state if the fetch fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="doctor-list-page">
//       <header className="header">
//         <div className="logo">Health Portal</div>
//         <nav className="nav">
//           <a href="#">Find Doctors</a>
//           <a href="#">Video Consult</a>
//           <a href="#">Surgeries</a>
//         </nav>
//         <div className="user-actions">
//           <a href="#">Browse</a>
//           <a href="#">Help</a>
//           <a href="#">Contact</a>
//           <span className="bell-icon">🔔</span>
//           <span className="user-icon">👤</span>
//         </div>
//       </header>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Enter specialty"
//           value={specialty}
//           onChange={(e) => setSpecialty(e.target.value)}
//         />

//         {/* Use PlaceComponent for location search */}
//         <PlaceComponent setAddress={setLocation} />

//         {/* Insurance Input and Dropdown */}
//         <div className="insurance-container">
//           <input
//             type="text"
//             placeholder="Enter insurance (optional)"
//             value={insurance}
//             onChange={handleInsuranceInputChange} // Handle insurance input
//             onFocus={handleInsuranceInputFocus} // Trigger fetch when input is focused
//           />

//           {insuranceLoading && <div className="loading">Loading insurance providers...</div>}

//           {insuranceProviders.length > 0 && !insuranceLoading && (
//             <div className="insurance-dropdown">
//               {insuranceProviders.map((provider, index) => (
//                 <div
//                   key={index}
//                   className="insurance-option"
//                   onClick={() => setInsurance(provider)}
//                 >
//                   {provider}
//                 </div>
//               ))}
//             </div>
//           )}

//           {insuranceError && <div className="error-message">{insuranceError}</div>}
//         </div>

//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {loading && <p>Loading doctors...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {doctors.length > 0 && (
//         <div className="doctor-cards">
//           {doctors.map((doctor) => (
//             <div key={doctor.doctorId} className="doctor-card">
//               <img
//                 src="doctor_image_placeholder.png" // Placeholder image (could be dynamic if image URL is in the data)
//                 alt={`${doctor.firstName} ${doctor.lastName}`}
//                 className="doctor-image"
//               />
//               <div className="doctor-info">
//                 <h2>{`${doctor.firstName} ${doctor.lastName}`}</h2>
//                 <p className="specialty">{doctor.specialty}</p>
//                 <p className="address">{doctor.address}</p>
//                 <p className="gender">{doctor.gender}</p>
//                 <p className="patient-type">{doctor.patientType}</p>
//                 <div className="rating">
//                   {'⭐'.repeat(5)} {/* Static stars, but can be dynamic if the rating is in the payload */}
//                 </div>
//               </div>
//               <button className="appointment-button">
//                 <span>📅</span> Book Appointment
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DoctorListPage;



// import React, { useState, useEffect } from 'react';
// import "./Dashboard.css";
// import PlaceComponent from '../PlacesAutoComplete';
// import { NavLink } from 'react-router-dom';

// function DoctorListPage() {
//   // State to store the search criteria
//   const [specialty, setSpecialty] = useState('');
//   const [location, setLocation] = useState('');
//   const [insurance, setInsurance] = useState(''); // Insurance state
//   const [insuranceProviders, setInsuranceProviders] = useState([]); // Insurance providers list
//   const [filteredInsuranceProviders, setFilteredInsuranceProviders] = useState([]); // Filtered list for insurance search
//   const [insuranceLoading, setInsuranceLoading] = useState(false); // Loading state for insurance providers
//   const [insuranceError, setInsuranceError] = useState(null); // Error state for insurance fetching
//   const [doctors, setDoctors] = useState([]); // State to store doctors list
//   const [loading, setLoading] = useState(false); // Loading state for doctors
//   const [error, setError] = useState(null); // Error state for doctors

//   // Predefined list of state abbreviations (already given)
//   const states = [
//     'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
//     'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
//   ];

//   // Function to fetch insurance providers based on state
//   const fetchInsuranceProviders = async () => {
//     const state = states[Math.floor(Math.random() * states.length)]; // Randomly select a state for demonstration

//     setInsuranceLoading(true);
//     setInsuranceError(null);

//     const apiKey = 'kgJnUQyTNL6oiGan4XIUpoONx3LIe1HR';  // Your API key
//     const year = 2024;
//     const limit = 25;
//     let offset = 0;
//     let allInsuranceProviders = [];

//     try {
//       let hasMoreData = true;

//       while (hasMoreData) {
//         const url = `https://marketplace.api.healthcare.gov/api/v1/issuers?apikey=${apiKey}&year=${year}&state=${state}&limit=${limit}&offset=${offset}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch insurance providers for state ${state}`);
//         }

//         const data = await response.json();
//         const providers = data.issuers.map((issuer) => issuer.name);
//         allInsuranceProviders = [...allInsuranceProviders, ...providers];

//         // Check if there are more pages to fetch
//         hasMoreData = data.issuers.length === limit;
//         offset += limit;
//       }

//       setInsuranceProviders(allInsuranceProviders); // Save the data to state
//       setFilteredInsuranceProviders(allInsuranceProviders); // Set the initial list to the filtered list
//     } catch (error) {
//       setInsuranceError(error.message); // Handle error if the fetch fails
//     } finally {
//       setInsuranceLoading(false); // Stop loading state
//     }
//   };

//   // Handle insurance input focus (fetch insurance providers only when focused)
//   const handleInsuranceInputFocus = () => {
//     if (insuranceProviders.length === 0 && !insuranceLoading) {
//       fetchInsuranceProviders(); // Fetch only if data is not already available and not currently loading
//     }
//   };

//   // Handle insurance input change
//   const handleInsuranceInputChange = (e) => {
//     const searchTerm = e.target.value;
//     setInsurance(searchTerm);
//     // Filter the insurance providers as user types
//     const filtered = insuranceProviders.filter(provider =>
//       provider.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredInsuranceProviders(filtered);
//   };

//   // Function to handle the search for doctors
//   const handleSearch = async () => {
//     if (!specialty || !location) {
//       alert('Please provide both specialty and location');
//       return;
//     }

//     setLoading(true);
//     setError(null); // Reset error state before fetching data

//     const encodedSpecialty = encodeURIComponent(specialty);
//     const encodedLocation = encodeURIComponent(location);

//     try {
//       const response = await fetch(
//         `http://localhost:8082/doctor/bySpecialtyAndAddress?specialty=${encodedSpecialty}&address=${encodedLocation}`
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('API Error:', errorText);
//         throw new Error('Failed to fetch doctors');
//       }

//       const data = await response.json();
//       setDoctors(data); // Set the doctor data
//     } catch (err) {
//       console.error('Error:', err.message); // Log the error to the console
//       setError(err.message); // Set the error state if the fetch fails
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selection of insurance provider
//   const handleInsuranceSelect = (provider) => {
//     setInsurance(provider);
//     setFilteredInsuranceProviders([]); // Clear the dropdown after selection
//   };

//   return (
//     <div className="doctor-list-page">
//       <header className="header">
//         <div className="logo">Health Portal</div>
//         <nav className="nav">
//           <a href="#">Find Doctors</a>
//           <a href="#">Video Consult</a>
//           <a href="#">Surgeries</a>
//         </nav>
//         <div className="user-actions">
//           <a href="#">Browse</a>
//           <a href="#">Help</a>
//           <a href="#">Contact</a>
//           <span className="bell-icon">🔔</span>
//           <span className="user-icon">👤</span>
//         </div>
//       </header>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Enter specialty"
//           value={specialty}
//           onChange={(e) => setSpecialty(e.target.value)}
//         />

//         {/* Use PlaceComponent for location search */}
//         <PlaceComponent setAddress={setLocation} />

//         {/* Insurance Input and Dropdown */}
//         <div className="insurance-container">
//           <input
//             type="text"
//             placeholder="Enter insurance (optional)"
//             value={insurance}
//             onChange={handleInsuranceInputChange} // Handle insurance input
//             onFocus={handleInsuranceInputFocus} // Trigger fetch when input is focused
//           />

//           {insuranceLoading && <div className="loading">Loading insurance providers...</div>}

//           {filteredInsuranceProviders.length > 0 && !insuranceLoading && (
//             <div className="insurance-dropdown">
//               {filteredInsuranceProviders.map((provider, index) => (
//                 <div
//                   key={index}
//                   className="insurance-option"
//                   onClick={() => handleInsuranceSelect(provider)} // Handle insurance option select
//                 >
//                   {provider}
//                 </div>
//               ))}
//             </div>
//           )}

//           {insuranceError && <div className="error-message">{insuranceError}</div>}
//         </div>

//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {loading && <p>Loading doctors...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {doctors.length > 0 && (
//         <div className="doctor-cards">
//           {doctors.map((doctor) => (
//             <div key={doctor.doctorId} className="doctor-card">
//               <img
//                 src="doctor_image_placeholder.png" // Placeholder image (could be dynamic if image URL is in the data)
//                 alt={`${doctor.firstName} ${doctor.lastName}`}
//                 className="doctor-image"
//               />
//               <div className="doctor-info">
//                 <h2>{`${doctor.firstName} ${doctor.lastName}`}</h2>
//                 <p className="specialty">{doctor.specialty}</p>
//                 <p className="address">{doctor.address}</p>
//                 <p className="gender">{doctor.gender}</p>
//                 <p className="patient-type">{doctor.patientType}</p>
//                 <div className="rating">
//                   {'⭐'.repeat(5)} {/* Static stars, but can be dynamic if the rating is in the payload */}
//                 </div>
//               </div>
//               <NavLink to={`/book/${doctor.doctorId}`}>
//                 <button className="appointment-button">
//                   <span>📅</span> Book Appointment
//                 </button>
//               </NavLink>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DoctorListPage;




import React, { useState, useEffect } from 'react';
import { useUserContext } from "../UserContext";

import "./Dashboard.css";
import PlaceComponent from '../PlacesAutoComplete';
import { NavLink, useLocation } from 'react-router-dom';

const PatientDash = () => {
  // State for search criteria
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [insurance, setInsurance] = useState('');
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const [filteredInsuranceProviders, setFilteredInsuranceProviders] = useState([]);
  const [insuranceLoading, setInsuranceLoading] = useState(false);
  const [insuranceError, setInsuranceError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retrieve user information from the location state
  const locationState = useLocation();

  // Function to fetch insurance providers
  const fetchInsuranceProviders = async () => {
    setInsuranceLoading(true);
    setInsuranceError(null);

    try {
      const response = await fetch(
        `https://marketplace.api.healthcare.gov/api/v1/issuers?apikey=kgJnUQyTNL6oiGan4XIUpoONx3LIe1HR&year=2024&state=CA&limit=25`
      );

      if (!response.ok) throw new Error('Failed to fetch insurance providers');

      const data = await response.json();
      const providers = data.issuers.map((issuer) => issuer.name);
      setInsuranceProviders(providers);
      setFilteredInsuranceProviders(providers);
    } catch (error) {
      setInsuranceError(error.message);
    } finally {
      setInsuranceLoading(false);
    }
  };

  // Handle insurance input focus
  const handleInsuranceInputFocus = () => {
    if (insuranceProviders.length === 0 && !insuranceLoading) {
      fetchInsuranceProviders();
    }
  };

  // Handle insurance input change
  const handleInsuranceInputChange = (e) => {
    const searchTerm = e.target.value;
    setInsurance(searchTerm);
    const filtered = insuranceProviders.filter((provider) =>
      provider.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInsuranceProviders(filtered);
  };

  // Search for doctors
  const handleSearch = async () => {
    if (!specialty || !location) {
      alert('Please provide both specialty and location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8082/doctor/bySpecialtyAndAddress?specialty=${encodeURIComponent(
          specialty
        )}&address=${encodeURIComponent(location)}`
      );

      if (!response.ok) throw new Error('Failed to fetch doctors');

      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Select an insurance provider from the dropdown
  const handleInsuranceSelect = (provider) => {
    setInsurance(provider);
    setFilteredInsuranceProviders([]);
  };

  return (
    <div className="doctor-list-page">
      <header className="header">
        <div className="logo">Health Portal</div>
        <nav className="nav">
          <a href="#">Find Doctors</a>
          <a href="#">Video Consult</a>
          <a href="#">Surgeries</a>
        </nav>
        <div className="user-actions">
          ? (
            <>
            </>
          ) : (
            <>
              <NavLink to="/signup"><button>SignUp</button></NavLink>
              <NavLink to="/login"><button>Login</button></NavLink>
              <button>Contact</button>
            </>
          )
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />

        <PlaceComponent setAddress={setLocation} />

        <div className="insurance-container">
          <input
            type="text"
            placeholder="Enter insurance (optional)"
            value={insurance}
            onChange={handleInsuranceInputChange}
            onFocus={handleInsuranceInputFocus}
          />
          {insuranceLoading && <div className="loading">Loading insurance providers...</div>}
          {filteredInsuranceProviders.length > 0 && !insuranceLoading && (
            <div className="insurance-dropdown">
              {filteredInsuranceProviders.map((provider, index) => (
                <div
                  key={index}
                  className="insurance-option"
                  onClick={() => handleInsuranceSelect(provider)}
                >
                  {provider}
                </div>
              ))}
            </div>
          )}
          {insuranceError && <div className="error-message">{insuranceError}</div>}
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading doctors...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {doctors.length > 0 && (
        <div className="doctor-cards">
          {doctors.map((doctor) => (
            <div key={doctor.doctorId} className="doctor-card">
              <img
                src="doctor_image_placeholder.png"
                alt={`${doctor.firstName} ${doctor.lastName}`}
                className="doctor-image"
              />
              <div className="doctor-info">
                <h2>{`${doctor.firstName} ${doctor.lastName}`}</h2>
                <p className="specialty">{doctor.specialty}</p>
                <p className="address">{doctor.address}</p>
                <p className="gender">{doctor.gender}</p>
                <p className="patient-type">{doctor.patientType}</p>
                <div className="rating">{'⭐'.repeat(5)}</div>
              </div>
              <NavLink to={`/book/${doctor.doctorId}`}>
                <button className="appointment-button">
                  <span>📅</span> Book Appointment
                </button>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDash;
