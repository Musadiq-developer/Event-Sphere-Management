import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaRocket, FaQuestionCircle, FaArrowRight, FaCheck, FaShieldAlt, FaPlug } from 'react-icons/fa';
import contactBg from '../assets/contactus.jpg';
import MarqueeSlider from '../components/layout/MarqueeSlider';
import faqImg from '../assets/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg';
import formImg from '../assets/rachel-coyne-U7HLzMO4SIY-unsplash (1).jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setSuccess('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{background: "transparent"}}>
      <section className="py-32 md:py-40 px-6 md:px-12 bg-cover bg-center bg-no-repeat text-white flex items-center justify-center" style={{ backgroundImage: `url(${contactBg})`, minHeight: '80vh' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
          <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
          </div>
          <h1 className="animate-fadeInUp text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent drop-shadow-sm pb-2 text-center font-heading">Contact Us</h1>
          <p className="animate-fadeInUp text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-description" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Have questions about EventSphere? Our highly responsive support team is on standby to help you host an unforgettable experience.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Email Card */}
            <div className="scroll-animate rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative" style={{background: 'rgba(30, 41, 59, 0.7)'}}>
              <div className="absolute -left-6 top-6 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 z-10" style={{background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)"}}>
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-white mb-3">Email</h3>
                <p className="text-gray-300 text-sm mb-1">hadiabeer786@gmail.com</p>
                <p className="text-gray-300 text-sm">hadirayan11@gmail.com</p>
              </div>
            </div>
            
            {/* Phone Card */}
            <div className="scroll-animate rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative" style={{background: 'rgba(30, 41, 59, 0.7)'}}>
              <div className="absolute -left-6 top-6 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 z-10" style={{background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)"}}>
                <FaPhone className="text-white text-xl" />
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-white mb-3">Phone</h3>
                <p className="text-gray-300 text-sm mb-1">+92 335 5256660</p>
                <p className="text-gray-300 text-sm">+92 335 5256660</p>
              </div>
            </div>
            
            {/* Office Card */}
            <div className="scroll-animate rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative" style={{background: 'rgba(30, 41, 59, 0.7)'}}>
              <div className="absolute -left-6 top-6 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 z-10" style={{background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)"}}>
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-white mb-3">Office</h3>
                <p className="text-gray-300 text-sm mb-1">Aptech Learning</p>
                <p className="text-gray-300 text-sm">Shahrah e Faisal Center</p>
              </div>
            </div>
            
            {/* Business Hours Card */}
            <div className="scroll-animate rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative" style={{background: 'rgba(30, 41, 59, 0.7)'}}>
              <div className="absolute -left-6 top-6 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 z-10" style={{background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)"}}>
                <FaClock className="text-white text-xl" />
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold text-white mb-3">Business Hours</h3>
                <p className="text-gray-300 text-sm mb-1">Mon-Fri: 9AM - 6PM</p>
                <p className="text-gray-300 text-sm">Sat-Sun: 10AM - 4PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeSlider words={["Support", "Connect", "Help", "Reach Out"]} />

      <section className="py-20 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-animate text-center mb-16">
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 font-description">Some Common Questions</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            <div className="w-full lg:w-1/2 animate-fadeInUp hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.3)] border border-white/10 group h-full min-h-[500px]">
                <img src={faqImg} alt="FAQ Support" className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0518] via-[#0f0518]/30 to-transparent opacity-80"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
            <div className="scroll-animate group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30 hover:border-magenta-accent cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-magenta-accent/10 to-transparent rounded-full -mr-10 -mt-10 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-magenta-accent to-[#7210a6] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FaQuestionCircle className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-magenta-accent">How do I get started with EventSphere?</h3>
                    <p className="text-gray-300 leading-relaxed">Simply sign up for a free account, complete your organizer profile, and you can publish your first event in under two minutes!</p>
                  </div>
                </div>
                <Link to="/features" className="flex items-center text-magenta-accent font-medium group-hover:text-white transition-colors duration-300">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
            
            <div className="scroll-animate group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30 hover:border-magenta-accent cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-magenta-accent/10 to-transparent rounded-full -mr-10 -mt-10 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-magenta-accent to-[#7210a6] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-magenta-accent">What types of events can I manage?</h3>
                    <p className="text-gray-300 leading-relaxed">You can manage literally any kind of event-from intimate 10-person online workshops to massive 5,000+ attendee regional conferences.</p>
                  </div>
                </div>
                <Link to="/features" className="flex items-center text-magenta-accent font-medium group-hover:text-white transition-colors duration-300">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
            
            <div className="scroll-animate group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30 hover:border-magenta-accent cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-magenta-accent/10 to-transparent rounded-full -mr-10 -mt-10 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-magenta-accent to-[#7210a6] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-magenta-accent">Is my data secure?</h3>
                    <p className="text-gray-300 leading-relaxed">Absolutely. We encrypt all user data and payment information using the highest industry standards to guarantee your attendees' safety.</p>
                  </div>
                </div>
                <Link to="/features" className="flex items-center text-magenta-accent font-medium group-hover:text-white transition-colors duration-300">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
            
            <div className="scroll-animate group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30 hover:border-magenta-accent cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-magenta-accent/10 to-transparent rounded-full -mr-10 -mt-10 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-magenta-accent to-[#7210a6] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FaPlug className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-magenta-accent">Can I integrate with other tools?</h3>
                    <p className="text-gray-300 leading-relaxed">Yes! EventSphere seamlessly integrates with your favorite tools like Zoom, Calendly, and Zapier to supercharge your workflow.</p>
                  </div>
                </div>
                <Link to="/features" className="flex items-center text-magenta-accent font-medium group-hover:text-white transition-colors duration-300">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-animate rounded-3xl overflow-hidden flex flex-col lg:flex-row" style={{background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 25%, #DC2626 75%, #EA580C 100%)"}}>
            
            <div className="w-full lg:w-5/12 relative hidden lg:block">
              <img src={formImg} alt="Contact Support Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0518]/60 to-[#ea580c]/40 mix-blend-multiply"></div>
            </div>

            <div className="w-full lg:w-7/12 flex flex-col justify-center bg-[#1e0b36]/40 backdrop-blur-sm">
              <div className="text-center mb-8 p-6 md:p-8 pb-0">
                <div className="flex justify-center mb-4">
                <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.5)] rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">Send Us a Message</h2>
                <p className="text-xl text-white/90 font-description">We'd love to hear from you</p>
              </div>
              
              <div className="px-8 md:px-12 pb-6 md:pb-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-white font-medium mb-2 group-hover:text-magenta-accent transition-colors duration-300">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-magenta-accent focus:bg-white/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-white font-medium mb-2 group-hover:text-magenta-accent transition-colors duration-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-magenta-accent focus:bg-white/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-white font-medium mb-2 group-hover:text-magenta-accent transition-colors duration-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-magenta-accent focus:bg-white/20 transition-all duration-300"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="group">
                <label className="block text-white font-medium mb-2 group-hover:text-magenta-accent transition-colors duration-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-magenta-accent focus:bg-white/20 transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              {error && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300">
                  {success}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-4 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-magenta-accent to-[#7210a6] hover:from-[#7210a6] hover:to-magenta-accent hover:brightness-110 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Send Message
              </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
