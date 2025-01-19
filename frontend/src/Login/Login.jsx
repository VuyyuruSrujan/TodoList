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
    console.log("result:",result);
    if(result.data.message){
    toast.success(result.data.message);
    // navigate('/todos')
    }else{
        toast.warning(result.data);
    }
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
          <Link to="/forgot-password">Forgot Password?</Link><br /><br />
          <Link to="/">Don't have account ? Register</Link>
        </div>
      </form>
    </div>
  );
}