// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import 'react-calendar/dist/Calendar.css';
// import 'react-time-picker/dist/TimePicker.css';
// import logo from '../Assets/Group 4.png';
// import Leftimg from '../Assets/Leftimg.png';
// import rightimg from '../Assets/Rightimg.png';
// import PlaceComponent from '../PlacesAutoComplete';
// import "./Homepage.css";

// const DoctorDash = () => {
//   // State for each form field
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('');
//   const [patientType, setPatientType] = useState('');  // Set to string
//   const [specialty, setSpecialty] = useState('');
//   const [specialtyUnavailable, setSpecialtyUnavailable] = useState(false);
//   const [suffix, setSuffix] = useState('');
//   const [npi, setNpi] = useState('');
//   const [noNpi, setNoNpi] = useState(false);
//   const [contactFirstName, setContactFirstName] = useState('');
//   const [contactLastName, setContactLastName] = useState('');
//   const [phoneNo, setPhoneNo] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');

//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Construct the data object
//     const formData = {
//       firstName,
//       lastName,
//       gender,
//       patientType,  // patientType is now a string
//       specialty,
//       specialtyUnavailable,
//       suffix,
//       npi: noNpi ? null : npi,
//       contactFirstName,
//       contactLastName,
//       phoneNo,
//       email,
//       address,
//     };

//     // Log the form data to the console to view its structure
//     console.log('Form Data:', JSON.stringify(formData, null, 2));

//     try {
//       // Send a POST request to the backend API
//       const response = await fetch('http://localhost:8082/doctor/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log('Data saved successfully');
//         navigate("/docHomePage")
//         // Reset form if needed
//       } else {
//         console.error('Failed to save data');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // Update patient type (checkbox handling)
//   const handlePatientTypeChange = (e) => {
//     const { value, checked } = e.target;
//     setPatientType((prev) => {
//       // If checked, append to the string (with a comma separator)
//       if (checked) {
//         return prev ? `${prev},${value}` : value;
//       } else {
//         // If unchecked, remove the value
//         return prev
//           .split(',')
//           .filter((item) => item !== value)
//           .join(',');
//       }
//     });
//   };

//   return (
//     <div className="form-page-container">
//       <header className="header">
//         <img src={logo} alt="logoimage" />
//       </header>

//       <div className="content">
//         <aside className="image-section">
//           <NavLink to="/docHomePage" className="back-link">&larr; Back to Providers</NavLink>
//           <img src={Leftimg} alt="Illustration" className="left-image" />
//         </aside>
//         <section className="form-section">
//           <h2>Basic Information</h2>

//           <form className="basic-info-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Gender</label>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="male"
//                     checked={gender === 'male'}
//                     onChange={(e) => setGender(e.target.value)}
//                   /> Male
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="female"
//                     checked={gender === 'female'}
//                     onChange={(e) => setGender(e.target.value)}
//                   /> Female
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="non-binary"
//                     checked={gender === 'non-binary'}
//                     onChange={(e) => setGender(e.target.value)}
//                   /> Non-binary
//                 </label>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>What patients do you accept?</label>
//               <div className="checkbox-group">
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="adult"
//                     checked={patientType.includes('adult')}
//                     onChange={handlePatientTypeChange}
//                   /> Adult
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value="pediatric"
//                     checked={patientType.includes('pediatric')}
//                     onChange={handlePatientTypeChange}
//                   /> Pediatric
//                 </label>
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="specialty">Specialty</label>
//               <input
//                 type="text"
//                 id="specialty"
//                 value={specialty}
//                 onChange={(e) => setSpecialty(e.target.value)}
//               />
//               <label className="specialty-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={specialtyUnavailable}
//                   onChange={(e) => setSpecialtyUnavailable(e.target.checked)}
//                 /> I can't find my specialty
//               </label>
//             </div>

//             <div className="form-group">
//               <label htmlFor="suffix">Professional Suffix</label>
//               <select
//                 id="suffix"
//                 value={suffix}
//                 onChange={(e) => setSuffix(e.target.value)}
//               >
//                 <option value="md">MD</option>
//                 <option value="do">DO</option>
//                 <option value="np">NP</option>
//                 <option value="pa">PA</option>
//               </select>
//               <p className="suffix-info">Select all that apply</p>
//             </div>

//             <div className="form-group">
//               <label htmlFor="npi">NPI Number</label>
//               <input
//                 type="text"
//                 id="npi"
//                 value={npi}
//                 onChange={(e) => setNpi(e.target.value)}
//                 disabled={noNpi}
//               />
//               <label className="npi-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={noNpi}
//                   onChange={(e) => setNoNpi(e.target.checked)}
//                 /> I don’t have an NPI
//               </label>
//             </div>

//             <h3>Administrative Contact</h3>
//             <p className="admin-contact-info">
//               If needed, we’ll reach out to this person to verify your information.
//             </p>

//             <div className="form-group">
//               <label htmlFor="contactFirstName">Contact First Name</label>
//               <input
//                 type="text"
//                 id="contactFirstName"
//                 value={contactFirstName}
//                 onChange={(e) => setContactFirstName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="contactLastName">Contact Last Name</label>
//               <input
//                 type="text"
//                 id="contactLastName"
//                 value={contactLastName}
//                 onChange={(e) => setContactLastName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="phoneNo">Phone No</label>
//               <input
//                 type="text"
//                 id="phoneNo"
//                 value={phoneNo}
//                 onChange={(e) => setPhoneNo(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="address">Address</label>
//               <PlaceComponent setAddress={setAddress} />
//             </div>

//             <button type="submit" className="submit-button">Continue</button>
//           </form>
//         </section>

//         <aside className="image-section">
//           <img src={rightimg} alt="Illustration" className="right-image" />
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default DoctorDash;


import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import logo from '../Assets/Group 4.png';
import Leftimg from '../Assets/Leftimg.png';
import rightimg from '../Assets/Rightimg.png';
import PlaceComponent from '../PlacesAutoComplete';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import './Homepage.css';

const DoctorDash = () => {
  // State for each form field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [patientType, setPatientType] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialtyUnavailable, setSpecialtyUnavailable] = useState(false);
  const [suffix, setSuffix] = useState('');
  const [npi, setNpi] = useState('');
  const [noNpi, setNoNpi] = useState(false);
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const formData = {
      firstName,
      lastName,
      gender,
      patientType,
      specialty,
      specialtyUnavailable,
      suffix,
      npi: noNpi ? null : npi,
      contactFirstName,
      contactLastName,
      phoneNo,
      email,
      address,
      profilePic,
    };

    console.log('Form Data:', JSON.stringify(formData, null, 2));

    try {
      const response = await fetch('http://localhost:8082/doctor/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        navigate("/docHomePage");
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create FormData to send image to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'user-profile-pic');  // Use your Upload Preset name here
  
      // Cloudinary URL to upload image
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dpdqgx6mm/image/upload';
  
      // Upload image to Cloudinary
      fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Set the profile picture URL in the state (make sure it's just the URL, not the base path again)
          setProfilePic(data.secure_url);  // Cloudinary provides a secure URL (already full URL)
        })
        .catch((err) => {
          console.error('Error uploading image:', err);
        });
    }
  };
  

  // Update patient type (checkbox handling)
  const handlePatientTypeChange = (e) => {
    const { value, checked } = e.target;
    setPatientType((prev) => {
      if (checked) {
        return prev ? `${prev},${value}` : value;
      } else {
        return prev.split(',').filter((item) => item !== value).join(',');
      }
    });
  };

  return (
    <div className="form-page-container">
      <header className="header">
        <img src={logo} alt="logoimage" />
      </header>

      <div className="content">
        <aside className="image-section">
          <NavLink to="/docHomePage" className="back-link">&larr; Back to Providers</NavLink>
          <img src={Leftimg} alt="Illustration" className="left-image" />
        </aside>

        <section className="form-section">
          <h2>Basic Information</h2>

          <form className="basic-info-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="profilePic">Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                onChange={handleImageUpload}
                accept="image/*"
              />
           {profilePic && (
  <div className="profile-pic-preview">
    <h4>Profile Picture Preview:</h4>
    <AdvancedImage cldImg={new Cloudinary({ cloud: { cloudName: 'dpdqgx6mm' } }).image(profilePic)} />
  </div>
)}

            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  /> Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  /> Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="non-binary"
                    checked={gender === 'non-binary'}
                    onChange={(e) => setGender(e.target.value)}
                  /> Non-binary
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>What patients do you accept?</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    value="adult"
                    checked={patientType.includes('adult')}
                    onChange={handlePatientTypeChange}
                  /> Adult
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="pediatric"
                    checked={patientType.includes('pediatric')}
                    onChange={handlePatientTypeChange}
                  /> Pediatric
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialty">Specialty</label>
              <input
                type="text"
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
              <label className="specialty-checkbox">
                <input
                  type="checkbox"
                  checked={specialtyUnavailable}
                  onChange={(e) => setSpecialtyUnavailable(e.target.checked)}
                /> I can't find my specialty
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="suffix">Professional Suffix</label>
              <select
                id="suffix"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              >
                <option value="md">MD</option>
                <option value="do">DO</option>
                <option value="np">NP</option>
                <option value="pa">PA</option>
              </select>
              <p className="suffix-info">Select all that apply</p>
            </div>

            <div className="form-group">
              <label htmlFor="npi">NPI Number</label>
              <input
                type="text"
                id="npi"
                value={npi}
                onChange={(e) => setNpi(e.target.value)}
              />
              <label className="npi-checkbox">
                <input
                  type="checkbox"
                  checked={noNpi}
                  onChange={(e) => setNoNpi(e.target.checked)}
                /> I don’t have an NPI
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="contactFirstName">Contact First Name</label>
              <input
                type="text"
                id="contactFirstName"
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactLastName">Contact Last Name</label>
              <input
                type="text"
                id="contactLastName"
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                type="text"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Practice Location</label>
              <PlaceComponent
                value={address}
                onChange={(newAddress) => setAddress(newAddress)}  // Fix address
              />
            </div>

            <button type="submit" className="submit-button">Continue</button>
          </form>
        </section>

        <aside className="image-section">
          <img src={rightimg} alt="Illustration" className="right-image" />
        </aside>
      </div>
    </div>
  );
};

export default DoctorDash;
