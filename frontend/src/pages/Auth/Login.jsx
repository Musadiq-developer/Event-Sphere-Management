import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/AuthForm.css';
import authBg from '../../assets/heroimage4.jpg';


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login specific validations
  const validateForm = () => {
    const { email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }

    if (password.length < 1) {
      toast.error("Password is required!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await login(formData.email, formData.password);

      if (result.success && result.user) {
        toast.success(`Welcome back, ${result.user.name || 'User'}!`, {
          position: "top-right",
          autoClose: 2000,
        });

        const role = result.user.role;
        
        // Redirect based on role after a small delay for toast to be seen
        setTimeout(() => {
          if (role === 'Admin') {
            navigate('/admin/dashboard');
          } else if (role === 'Exhibitor') {
            navigate('/exhibitor/dashboard');
          } else {
            navigate('/attendee/dashboard');
          }
        }, 1500);

      } else {
        toast.error(result.message || "Invalid Credentials");
      }
    } catch (err) {
      toast.error("Login failed. Check your connection.");
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${authBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Toast settings consistent with Signup */}
      
      
      <div className="glass-card auth-card page-transition">
        <div className="auth-header">
          <div className="auth-logo">
            <Sparkles className="logo-icon" size={32} />
            <span>EventSphere</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
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
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;