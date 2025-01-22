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
  const [loading, setLoading] = useState(false);

  function handleSendOTP(event) {
    event.preventDefault();
    setLoading(true); // Set loading to true
    axios
      .post('http://localhost:5001/check_mail', { mail })
      .then((result) => {
        if (result.status === 200) {
          axios
            .post('http://localhost:5001/sendOTP', { mail })
            .then((result) => {
              if (result.status === 200) {
                console.log('sent successfully', result.data.otp);
                localStorage.setItem('local_otp', result.data.otp);
                localStorage.setItem('lmail', mail);
                toast.success('OTP sent to your email!');
                setShowOTP(true);
              }
            })
            .catch((error) => {
              console.error(error);
              toast.warning(error.response?.data || 'An error occurred');
            })
            .finally(() => setLoading(false)); // Set loading to false
        }
      })
      .catch((error) => {
        console.error(error);
        toast.warning(error.response?.data || 'An error occurred');
        setLoading(false); // Set loading to false
      });
  }

  function handleVerifyOTP(event) {
    event.preventDefault();
    var verifyotp = document.getElementById('verifyotp').value;
    var local_otp = localStorage.getItem('local_otp');
    if (verifyotp) {
      if (verifyotp === local_otp) {
        localStorage.removeItem('local_otp');
        toast.success('Successfully verified');
        navigate('/ResetPassword', { replace: true });
      } else {
        toast.warning('Enter correct OTP');
      }
    } else {
      toast.warning('Enter OTP');
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={showOTP ? handleVerifyOTP : handleSendOTP}>
        <h2>Forgot Password</h2>
        <div className="form-group">
          <label>
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!showOTP ? (
          <>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            {loading && <p className="loading-text">Sending OTP, please wait...</p>}
          </>
        ) : (
          <>
            <div className="form-group">
              <label>
                <FaKey /> Enter OTP
              </label>
              <input id="verifyotp" type="text" required />
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
