import React from 'react'
import "./RegisterForm.css";

function RegisterForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form is handled.')
    }
  return (
    <form onSubmit={handleSubmit} className='form'>
      <div>  
        <label htmlFor="name">Username : </label>
        <input type="text" name="name" placeholder="Full Name" required/>
      </div>
      <div>
      <label htmlFor="email">Email : </label>
      <input type="email" name="email" placeholder="example@example.com" required/>
      </div>
      <input type='submit' placeholder='Register'/>
    </form>
  );
}

export default RegisterForm