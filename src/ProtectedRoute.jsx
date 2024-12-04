// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useUserContext } from './UserContext';

// const ProtectedRoute = ({ role }) => {
//   const { user } = useUserContext();

//   if (!user || user.role !== role) {
//     // If the user is not logged in or does not have the correct role, redirect to login
//     return <Navigate to="/login" />;
//   }

//   return <Outlet />; // Render the child routes if the user is authorized
// };

// export default ProtectedRoute;
