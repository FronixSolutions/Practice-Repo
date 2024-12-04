// // UserContext.js
// import React, { createContext, useContext, useState } from "react";

// // Create a context to manage user data
// const UserContext = createContext();

// // Create a custom hook to access the context
// export const useUserContext = () => useContext(UserContext);

// // UserContext provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Store logged-in user

//   // Set user (could be called after login/signup)
//   const login = (userData) => {
//     setUser(userData);
//   };

//   // Log out user
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
