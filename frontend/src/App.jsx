import Register from './Register/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login/Login';
import ForgotPassword from './ForgotPassword/ForgotPassword';


function App() {

  return (
    <>
      <Router>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
