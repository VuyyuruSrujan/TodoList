import { useState ,useEffect} from 'react';
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

  useEffect(()=>{
    var session = localStorage.getItem("authToken");
    if(session){
      navigate('/todo');
    }
  });

  function Register_user(){
    event.preventDefault();
    console.log("register name",name);
    console.log("mail",mail);
    console.log("password",password);
    console.log("confirm",confirm_pass);

    if(password == confirm_pass){
      if(password.length >=8){
        axios.post('http://localhost:5001/register',{name , mail , password})
        .then(answer =>{
          console.log("answer",answer);
          if(answer.status = 200){
            toast.success(answer.data);
            navigate('/login');
          }
        })
        .catch(error =>{
          console.log("error:",error);
          toast.warning(error);
        })
      }else{
        toast.warning("passowrd length must have 8 characters")
      }
    }else{
      toast.warning("password and confirm password must be same");
    }
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
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
}