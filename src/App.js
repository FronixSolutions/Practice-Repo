import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProfile from './DoctorSide/CreateProfile';
import BookingForm from './PatientSide/BookingDashboard';
import SignupPage from './DoctorSide/SignUp';
import LoginPage from './DoctorSide/Login';
import PatientDash from './PatientSide/Patient';
import DocHomepage from './DoctorSide/HomePage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<PatientDash />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/book/:doctorId" element={<BookingForm />} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/patientdash' element={<PatientDash/>} />
        <Route path='/docHomePage' element={<DocHomepage/>} />
      </Routes>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { UserProvider } from './UserContext'; // Context to manage user data

// import CreateProfile from './DoctorSide/CreateProfile';
// import BookingForm from './PatientSide/BookingDashboard';
// import SignupPage from './DoctorSide/SignUp';
// import ProtectedRoute from './ProtectedRoute'; // ProtectedRoute for role-based access
// import PatientDash from './PatientSide/Patient';
// import DocHomepage from './DoctorSide/HomePage';
// import LoginPage from './DoctorSide/Login';

// function App() {
//   return (
//     <UserProvider>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<LoginPage/>} />
//           <Route path="/signup" element={<SignupPage />} />

//           {/* Doctor Routes */}
//           <Route element={<ProtectedRoute role="ROLE_DOCTOR" />}>
//             <Route path="/docHomePage" element={<DocHomepage/>} />
//             <Route path="/create-profile" element={<CreateProfile />} />
//           </Route>

//           {/* Patient Routes */}
//           <Route element={<ProtectedRoute role="ROLE_PATIENT" />}>
//             <Route path="/PatientDash" element={<PatientDash/>} />
//             <Route path="/book/:doctorId" element={<BookingForm />} />
//           </Route>

//           {/* Default route (404 page) */}
//           <Route path="*" element={<div>404 - Page Not Found</div>} />
//           <Route path='/' element={<PatientDash/>}/>
//         </Routes>
//     </UserProvider>
//   );
// }

// export default App;
