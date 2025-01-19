import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaKey } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    toast.success('OTP sent to your email!');
    setShowOTP(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    toast.success('Password reset successful!');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={showOTP ? handleVerifyOTP : handleSendOTP}>
        <h2>Forgot Password</h2>
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            value={email}
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
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Verify OTP</button>
          </>
        )}
        <div className="auth-links">
          <Link to="/">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;