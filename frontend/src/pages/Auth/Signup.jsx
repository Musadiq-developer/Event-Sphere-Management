import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/AuthForm.css';
import authBg from '../../assets/heroimage4.jpg';


const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Attendee'
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await signup(formData);
      if (result.success) {
        toast.success("Account Created! Moving to Login...", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => navigate('/login'), 2500);
      } else {
        toast.error(result.message || "Signup failed!");
      }
    } catch (err) {
      toast.error("Server Error. Please try later.");
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${authBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      
      <div className="glass-card auth-card page-transition">
        <div className="auth-header">
          <div className="auth-logo">
            <Sparkles className="logo-icon" size={32} />
            <span>EventSphere</span>
          </div>
          <h1 className="auth-title">Join Us</h1>
          <p className="auth-subtitle">Create your account to start managing events</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">I am an</label>
            <div className="input-wrapper">
              <Shield className="input-icon" size={20} />
              <select
                name="role"
                className="form-control custom-dropdown"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Attendee" className="dropdown-item">Attendee</option>
                <option value="Exhibitor" className="dropdown-item">Exhibitor</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;