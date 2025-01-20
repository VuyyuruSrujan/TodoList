import { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password , setpassword] = useState("");
    const [mail , setmail] = useState("");

    useEffect(() =>{
        var mail = localStorage.getItem("lmail");
        if(mail){
          setmail(mail);
          console.log("mail",mail);
        }else{
          navigate('/login');
        };
    })
    function handleSubmit(){
        event.preventDefault();
        if(mail){
            if(password.length >=8){
            console.log("lmail",mail);
            axios.post('http://localhost:5001/reset_register',{mail , password})
            .then(result =>{
                if(result.data.message){
                    toast.success("pasword reset successful");
                    localStorage.removeItem("lmail")
                    navigate('/login', {replace:true});
                }else{
                    toast.warning("user not found");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }else{
            toast.warning("password must be 8 letters")
        }
    }

    }
  return (
    <div>
      <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset your password here</h2>
        <div className="form-group">
          <label><FaUser /> Email</label>
          <input
            type="email"
            name="email"
            value={mail}
            required
            readOnly
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
        <button type="submit" className="btn">Reset</button>
      </form>
    </div>
    </div>
  )
}
