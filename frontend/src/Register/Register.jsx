import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from "axios";
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [name , setReg_nm] = useState("");
  const [mail , setmail] = useState("");
  const [password , setpassowrd] = useState("");
  const [confirm_pass , set_confirm_pass] = useState("");

  function Register_user(){
    event.preventDefault();
    console.log("register name",name);
    console.log("mail",mail);
    console.log("password",password);
    console.log("confirm",confirm_pass);

    axios.post('http://localhost:5001/register',{name , mail , password})
    .then(answer =>{
      console.log("answer",answer);
      if(answer.data = "Registered successfully"){
        toast.success(answer.data);
        navigate('/login');
      }
    })
    .catch(error =>{
      console.log("error:",error);
      toast.warning(error);
    })
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={Register_user}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label><FaUser /> Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(e)=>setReg_nm(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            name="email"
            onChange={(e)=>setmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Password</label>
          <input
            type="password"
            name="password"
            onChange={(e)=>setpassowrd(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><FaLock /> Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e)=>set_confirm_pass(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
        <div className="auth-links">
          <Link to="/">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}