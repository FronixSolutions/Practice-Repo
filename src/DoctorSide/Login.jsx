import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import "./Signup.css";

const LoginPage = () => {
    const [userData, setUserData] = useState({
        userName: '',
        password: '',
    });

    const [userRoleEntity, setUserRoleEntity] = useState({
        userName: '',
        role: '',
    });

    const [showRoleSelection, setShowRoleSelection] = useState(true); // Role selection visibility
    const [showLoginForm, setShowLoginForm] = useState(false); // Login form visibility

    const navigate = useNavigate(); // React Router navigation

    // Handle role selection
    const handleRoleChange = (selectedRole) => {
        setUserRoleEntity((prevState) => ({
            ...prevState,
            role: selectedRole,
        }));
        setShowLoginForm(true); // Show the login form
    };

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserRoleEntity((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Validate the user login role
            const validateResponse = await axios.post('http://localhost:6700/users/validate-login', userRoleEntity);

            if (validateResponse.data) {
                // Step 2: Authenticate the user
                const loginResponse = await axios.post('http://localhost:6700/users/login', userData);

                if (loginResponse.data) {
                    sessionStorage.setItem('access_token', loginResponse.data.access_token);
                    sessionStorage.setItem('refresh_token', loginResponse.data.refresh_token);
                    sessionStorage.setItem('user_info', JSON.stringify(loginResponse.data));

                    // Step 3: Get user ID by username
                    const userIdResponse = await axios.get(
                        `http://192.168.0.199:6700/users/getUserIdByName/${userData.userName}`
                    );

                    const userId = userIdResponse.data.userId;
                    const userName = userData.userName;

                    // Step 4: Redirect based on role
                    if (userRoleEntity.role === 'ROLE_DOCTOR') {
                        navigate('/docHomePage', { state: { userName, userId } });
                    } else if (userRoleEntity.role === 'ROLE_PATIENT') {
                        navigate('/PatientDash', { state: { userName, userId } });
                    }

                    alert('Login successful!');
                } else {
                    alert('Login failed: No token received.');
                }
            } else {
                alert(`You are not allowed to login as ${userRoleEntity.role}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login');
        }
    };

    return (
        <div className="login-page">
            {showRoleSelection && !showLoginForm ? (
                // Step 1: Show Role selection (Doctor or Patient)
                <div className="role-selection">
                    <button className="button1" onClick={() => handleRoleChange('ROLE_DOCTOR')}>Login as Doctor</button>
                    <button className="button1" onClick={() => handleRoleChange('ROLE_PATIENT')}>Login as Patient</button>
                </div>
            ) : (
                // Step 2: Show the Login form
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            value={userData.userName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <button className="button1" type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginPage;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./Signup.css";
// import { useUserContext } from '../UserContext';

// const LoginPage = () => {
//     const { login } = useUserContext(); // Access login function from context
//     const navigate = useNavigate(); 

//     const [userData, setUserData] = useState({
//         userName: '',
//         password: '',
//     });

//     const [userRoleEntity, setUserRoleEntity] = useState({
//         userName: '',
//         role: '',
//     });

//     const [showRoleSelection, setShowRoleSelection] = useState(true);
//     const [showLoginForm, setShowLoginForm] = useState(false);

//     // Handle role selection
//     const handleRoleChange = (selectedRole) => {
//         setUserRoleEntity((prevState) => ({
//             ...prevState,
//             role: selectedRole,
//         }));
//         setShowLoginForm(true); // Show login form
//     };

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setUserRoleEntity((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));

//         setUserData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Handle login form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // Validate user login role
//             const validateResponse = await axios.post('http://localhost:6700/users/validate-login', userRoleEntity);

//             if (validateResponse.data) {
//                 // Authenticate the user
//                 const loginResponse = await axios.post('http://localhost:6700/users/login', userData);

//                 if (loginResponse.data) {
//                     // Save user data in sessionStorage
//                     const userInfo = loginResponse.data;
//                     sessionStorage.setItem('access_token', userInfo.access_token);
//                     sessionStorage.setItem('refresh_token', userInfo.refresh_token);
//                     sessionStorage.setItem('user_info', JSON.stringify(userInfo));

//                     // Update context state
//                     login(userInfo);

//                     // Redirect based on role
//                     const userName = userData.userName;
//                     const userId = userInfo.userId;

//                     if (userRoleEntity.role === 'ROLE_DOCTOR') {
//                         navigate('/docHomePage', { state: { userName, userId } });
//                     } else if (userRoleEntity.role === 'ROLE_PATIENT') {
//                         navigate('/PatientDash', { state: { userName, userId } });
//                     }

//                     alert('Login successful!');
//                     navigate('/docHomePage')
//                 } else {
//                     alert('Login failed: No token received.');
//                 }
//             } else {
//                 alert(`You are not allowed to login as ${userRoleEntity.role}`);
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//             alert('Error during login');
//         }
//     };

//     return (
//         <div className="login-page">
//             {showRoleSelection && !showLoginForm ? (
//                 <div className="role-selection">
//                     <button className="button1" onClick={() => handleRoleChange('ROLE_DOCTOR')}>Login as Doctor</button>
//                     <button className="button1" onClick={() => handleRoleChange('ROLE_PATIENT')}>Login as Patient</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h2>Login</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="userName"
//                             placeholder="Username"
//                             value={userData.userName}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={userData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button className="button1" type="submit">Submit</button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LoginPage;
