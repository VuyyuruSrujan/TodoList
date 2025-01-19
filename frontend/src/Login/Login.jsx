import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [mail , setmail] = useState("");
 const [password , setpassword] = useState("");

 function handleSubmit(){
  event.preventDefault();
  console.log("mail",mail);
  console.log("password",password);
  axios.post("http://localhost:5001/login" , {mail , password})
  .then(result =>{
    console.log("logged in",result);
   toast.success(result.data);
   navigate('/todos');
  })
  .catch(error =>{
    console.log("error",error);
  })
 }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="form-group">
          <label><FaUser /> Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>setmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Password</label>
          <input
            type="password"
            name="password"
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}