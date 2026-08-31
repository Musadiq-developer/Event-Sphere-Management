import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);
  // AuthContext.js ke andar
const signup = async (formData) => {
  try {
    const res = await axios.post("http://localhost:5000/auth/signup", formData);
    return { success: true, message: res.data.message };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Signup failed!" 
    };
  }
};

// Provider value mein signup ko pass karna na bhulain

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      console.log("====",res)
      const { token, user: userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      // FIX: userId ko alag se save karna zaroori hai comparison ke liye
      localStorage.setItem('userId', userData._id || userData.id);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return { success: true, user: userData }; 
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Invalid credentials!" };
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user,signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);