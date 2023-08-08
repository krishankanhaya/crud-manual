import React, { useState } from 'react'
import axios from 'axios'
import "./RegisterForm.css";

function RegisterForm() {
    // initializing state with empty object that contain name and email field
    const [registrationData, setRegistrationData] = useState({
      // registrationData -> object that store data, setRegistrationData -> method that is used to update data
      name: "",
      email: "",
    });
    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log('form is handled.', registrationData)
        const res = await axios
          .post("http://localhost:5000/api/register", {
            name: registrationData.name,
            email: registrationData.email,
          })
          .catch((error) => {
            console.log(error);
          });
          console.log(res);
    }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRegistrationData((prevPerson) => ({
        ...prevPerson,
        [name]: value,
      }));
    };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="name">Username : </label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={handleInputChange}
          required
        />
      </div>
      <input type="submit" placeholder="Register" />
    </form>
  );
}

export default RegisterForm