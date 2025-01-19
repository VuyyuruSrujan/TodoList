import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
  const [mail, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
//   const [otp, setOTP] = useState('');

  function handleSendOTP(){
    event.preventDefault();
    axios.post('http://localhost:5001/check_mail',{mail})
    .then(result =>{
        console.log("result",result);
        if(result.data.message){
            axios.post('http://localhost:5001/sendOTP',{mail})
            .then(result =>{
                if(result.status == 200){
                    console.log("sent succesfully",result.data.otp);
                    localStorage.setItem("local_otp",result.data.otp);
                    localStorage.setItem("lmail",mail);
                    toast.success('OTP sent to your email!');
                    setShowOTP(true);
                }else{
                    console.log(result.data.message);
                }
            })
            .catch(error=>{
                console.log(error);
            })
            
        }else{
            toast.warning("you are not registered");
        }
    })
  };

  function handleVerifyOTP(){
    event.preventDefault();
    var verifyotp = document.getElementById('verifyotp').value;
    var local_otp = localStorage.getItem("local_otp");
    if(verifyotp){
        if(verifyotp == local_otp){
            localStorage.removeItem("local_otp");
            toast.success("successfuly verified");
            navigate('/ResetPassword',{replace:true})
        }
    }else{
        toast.warning("enter otp")
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={showOTP ? handleVerifyOTP : handleSendOTP}>
        <h2>Forgot Password</h2>
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!showOTP ? (
          <button type="submit" className="btn">Send OTP</button>
        ) : (
          <>
            <div className="form-group">
              <label><FaKey /> Enter OTP</label>
              <input
              id='verifyotp'
                type="text"
                required
              />
            </div>
            <button type="submit" className="btn">Verify OTP</button>
          </>
        )}
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;