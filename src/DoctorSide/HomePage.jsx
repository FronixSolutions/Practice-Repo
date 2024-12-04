import React from 'react';
import './Homepage.css';
import logo from '../Assets/Group 4.png'
import { NavLink } from 'react-router-dom';

const  DocHomepage = ()=> {
  
  return (
    <div className="container">
      <header className="header">
         <img src={logo} alt='logoimage'/>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/calendar">Calendar</a>
          <a href="/inbox">Inbox</a>
          <a href="/performance">Performance</a>
          <a href="/providers">Providers</a>
        </nav>
        <div className="icons">
          <span className="notification-icon">🔔</span>
          <span className="user-icon">👤</span>
        </div>
      </header>

      <main className="main-content">
        <section className="setup-checklist">
          <h2>Your setup check-list</h2>

          <div className="checklist-item">
            <h3>Create Your Profile</h3>
            <div className="sub-item">
              <p>Add Your Providers</p>
              <p>Create profiles for the providers at your practice</p>
             <NavLink to="/create-profile"><button className="get-started">Get Started</button></NavLink> 
            </div>
            <div className="sub-item">
              <p>Verify Your Identity</p>
              <p>You will need to verify your identity to get full use of your account</p>
              <button className="get-started disabled" disabled>Get Started</button>
            </div>
          </div>

          <div className="accordion">
            <div className="accordion-item">
              <h3>⚙️ Customize Your Settings</h3>
            </div>
            <div className="accordion-item">
              <h3>📋 Set Your Patient Intake Experience</h3>
            </div>
          </div>
        </section>

        <section className="performance">
          <h2>Your Performance</h2>
          <div className="performance-info">
            <h1>0</h1>
            <p>You have no bookings yet</p>
            <p className="performance-link">Explore your performance dashboard</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DocHomepage;



// import React, { useState, useEffect } from 'react';

// const StatesIssuers = () => {
//   const [issuerNames, setIssuerNames] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Array of all 50 US state abbreviations
//   const states = [
//     'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
//     'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
//   ];

//   // Function to fetch data for a single state with pagination
//   const fetchIssuersForState = async (state) => {
//     const apiKey = 'kgJnUQyTNL6oiGan4XIUpoONx3LIe1HR';  // Your API key
//     const year = 2024;
//     const limit = 25;
//     let offset = 0;
//     let allNames = [];

//     try {
//       let hasMoreData = true;

//       while (hasMoreData) {
//         const url = `https://marketplace.api.healthcare.gov/api/v1/issuers?apikey=${apiKey}&year=${year}&state=${state}&limit=${limit}&offset=${offset}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch data for ${state}`);
//         }

//         const data = await response.json();
//         const names = data.issuers.map(issuer => issuer.name);  // Extract only the "name"
//         allNames = [...allNames, ...names];

//         // Check if there are more pages to fetch
//         hasMoreData = data.issuers.length === limit;
//         offset += limit;
//       }

//       return allNames;
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       // Prevent multiple requests from triggering re-renders
//       let allIssuerNames = [];

//       try {
//         // Create an array of promises for each state's API call
//         const promises = states.map((state) => fetchIssuersForState(state));

//         // Wait for all promises to resolve concurrently
//         const results = await Promise.all(promises);

//         // Flatten the results into a single array
//         allIssuerNames = results.flat();
//         setIssuerNames(allIssuerNames);
//       } catch (err) {
//         setError(err.message);
//       }

//       setLoading(false);
//     };

//     if (issuerNames.length === 0) { // Prevent triggering if already loaded
//       fetchData();
//     }
//   }, [issuerNames.length]); // Dependency array ensures `fetchData` runs only when issuerNames is empty.

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Health Insurance Issuers in the US</h1>
//       <ul>
//         {issuerNames.length > 0 ? (
//           issuerNames.map((name, index) => (
//             <li key={index}>{name}</li>
//           ))
//         ) : (
//           <li>No issuers found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default StatesIssuers;
