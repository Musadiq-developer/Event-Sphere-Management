import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaBolt, FaQuoteLeft, FaCheckCircle, FaRocket, FaChartLine, FaClock, FaEnvelope, FaUserPlus, FaCalendarCheck, FaStar } from 'react-icons/fa';
import logo from '.././assets/logo.png';
import heroBg from '../assets/heroimage1.jpg';
import NewsletterSection from '../components/layout/NewsletterSection';
import MarqueeSlider from '../components/layout/MarqueeSlider';
import howItWorksImg from '../assets/heroimage5.jpg';
import techSummitImg from '../assets/techsummit.jpg';
import startupMeetupImg from '../assets/startupmeetup.jpg';
import productLaunchImg from '../assets/productlaucnhparty.jpg';

function Home() {
  const [eventsCount, setEventsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const eventsRef = useRef(null);
  const usersRef = useRef(null);
  const satisfactionRef = useRef(null);

  const animateCounter = (ref, setter, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(start));
      }
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target === eventsRef.current) {
              animateCounter(eventsRef, setEventsCount, 10000);
            }
            if (entry.target === usersRef.current) {
              animateCounter(usersRef, setUsersCount, 50000);
            }
            if (entry.target === satisfactionRef.current) {
              animateCounter(satisfactionRef, setSatisfactionCount, 99);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    if (eventsRef.current) observer.observe(eventsRef.current);
    if (usersRef.current) observer.observe(usersRef.current);
    if (satisfactionRef.current) observer.observe(satisfactionRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

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
    <div className="min-h-screen" style={{background: "transparent"}}>
      <header className="py-32 md:py-40 px-6 md:px-12 bg-cover bg-center bg-no-repeat text-white flex items-center justify-center" style={{ backgroundImage: `url(${heroBg})`, minHeight: '80vh' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
          <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
          </div>
          <h1 className="animate-fadeInUp text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent drop-shadow-sm pb-2 text-center font-heading">
            Manage Your Events With EventSphere
          </h1>
          <p className="animate-fadeInUp text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-description" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Your all-in-one platform for seamless event management. Automate ticket sales, marketing, and engagement tracking.
          </p>
          <div className="animate-fadeInUp flex flex-col sm:flex-row gap-5 justify-center" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Link to="/signup" className="bg-gradient-to-r from-magenta-accent to-[#7210a6] hover:from-[#7210a6] hover:to-magenta-accent hover:brightness-110 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-purple-900/20 transition-all duration-300 inline-block text-center hover:-translate-y-1">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      
      


      <section className="py-20 px-6 md:px-12 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div ref={eventsRef} className="scroll-animate p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer transition-all duration-300" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <FaCalendarCheck className="text-4xl text-magenta-accent mb-4 mx-auto transition-transform duration-300 hover:scale-110" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {eventsCount.toLocaleString()}+
              </div>
              <p className="text-gray-300 text-lg">Events Managed</p>
            </div>
            
            <div ref={usersRef} className="scroll-animate p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer transition-all duration-300" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <FaUsers className="text-4xl text-magenta-accent mb-4 mx-auto transition-transform duration-300 hover:scale-110" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {usersCount.toLocaleString()}+
              </div>
              <p className="text-gray-300 text-lg">Active Users</p>
            </div>
            
            <div ref={satisfactionRef} className="scroll-animate p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer transition-all duration-300" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <FaChartLine className="text-4xl text-magenta-accent mb-4 mx-auto transition-transform duration-300 hover:scale-110" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {satisfactionCount}%
              </div>
              <p className="text-gray-300 text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 relative z-20">
        <div className="flex justify-center mb-6">
          <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
        </div>
        <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold text-white mb-6 text-center transition-all duration-300 hover:text-white hover:scale-105 cursor-default drop-shadow-md font-heading">Why You Should Join The Event ?</h2>
        <p className="scroll-animate text-xl text-gray-300 mb-20 max-w-2xl mx-auto font-medium text-center transition-all duration-300 hover:text-gray-200 font-description">Powerful features designed to make event management effortless and enjoyable.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="scroll-animate p-10 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <FaCalendarAlt className="text-4xl text-magenta-accent mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-bold text-white mb-4">Easy Scheduling</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Drag & drop calendar</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Auto-reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Time zone support</span>
              </div>
            </div>
            <Link to="/features" className="text-magenta-accent hover:text-white font-medium transition-colors duration-300">Learn More →</Link>
          </div>

          <div className="scroll-animate p-10 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <FaUsers className="text-4xl text-magenta-accent mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-bold text-white mb-4">Invite Friends</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Bulk invitations</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">RSVP tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Guest management</span>
              </div>
            </div>
            <Link to="/features" className="text-magenta-accent hover:text-white font-medium transition-colors duration-300">Learn More →</Link>
          </div>

          <div className="scroll-animate p-10 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <FaBolt className="text-4xl text-magenta-accent mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-bold text-white mb-4">Simple & Fast</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Quick setup</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Instant updates</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Mobile optimized</span>
              </div>
            </div>
            <Link to="/features" className="text-magenta-accent hover:text-white font-medium transition-colors duration-300">Learn More →</Link>
          </div>

          <div className="scroll-animate p-10 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <FaRocket className="text-4xl text-magenta-accent mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Real-time insights</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Attendance tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Export reports</span>
              </div>
            </div>
            <Link to="/features" className="text-magenta-accent hover:text-white font-medium transition-colors duration-300">Learn More →</Link>
          </div>

          <div className="scroll-animate p-10 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <FaEnvelope className="text-4xl text-magenta-accent mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-bold text-white mb-4">Email Marketing</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Custom templates</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Automated campaigns</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Open tracking</span>
              </div>
            </div>
            <Link to="/features" className="text-magenta-accent hover:text-white font-medium transition-colors duration-300">Learn More →</Link>
          </div>

          <div className="scroll-animate p-10 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <FaUserPlus className="text-4xl text-magenta-accent mb-6 transition-transform duration-300 hover:scale-110" />
            <h3 className="text-2xl font-bold text-white mb-4">Team Collaboration</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Role-based access</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Shared calendars</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-magenta-accent text-sm" />
                <span className="text-gray-300">Task assignments</span>
              </div>
            </div>
            <Link to="/features" className="text-magenta-accent hover:text-white font-medium transition-colors duration-300">Learn More →</Link>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 relative z-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-animate text-center mb-20">
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default font-heading">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium transition-all duration-300 hover:text-gray-200 font-description">Get started with EventSphere in four simple steps</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="visible p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <div className="w-16 h-16 bg-magenta-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(209,0,160,0.5)]">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sign Up</h3>
                <p className="text-gray-300 text-sm">Create your free account in seconds and unlock powerful tools.</p>
              </div>

              <div className="visible p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <div className="w-16 h-16 bg-magenta-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(209,0,160,0.5)]">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Create Event</h3>
                <p className="text-gray-300 text-sm">Set up your event with our intuitive interface and options.</p>
              </div>

              <div className="visible p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <div className="w-16 h-16 bg-magenta-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(209,0,160,0.5)]">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Invite Guests</h3>
                <p className="text-gray-300 text-sm">Send invitations and track RSVPs with our smart system.</p>
              </div>

              <div className="visible p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center">
                <div className="w-16 h-16 bg-magenta-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(209,0,160,0.5)]">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Manage</h3>
                <p className="text-gray-300 text-sm">Monitor attendance, send updates, and analyze performance.</p>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full visible">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.2)] border border-white/10 group">
                <img src={howItWorksImg} alt="How EventSphere Works" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-[#1e0b36]/40 to-transparent opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12 relative z-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-animate text-center mb-20">
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default font-heading">Upcoming Events</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium transition-all duration-300 hover:text-gray-200 font-description">Discover amazing events happening near you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="scroll-animate group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 flex flex-col h-full" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="h-48 overflow-hidden mb-4 relative">
                <img src={techSummitImg} alt="Tech Summit 2024" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-magenta-accent transition-colors duration-300">Tech Summit 2024</h3>
                <p className="text-gray-300 mb-6 flex-grow">Annual technology conference featuring keynote speakers and workshops.</p>
                <div className="flex items-center justify-between text-sm mt-auto">
                  <span className="text-magenta-accent font-medium">250+ Attendees</span>
                  <span className="text-gray-400">Dec 15, 2024</span>
                </div>
              </div>
            </div>

            <div className="scroll-animate group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 flex flex-col h-full" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="h-48 overflow-hidden mb-4 relative">
                <img src={startupMeetupImg} alt="Startup Meetup" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-magenta-accent transition-colors duration-300">Startup Meetup</h3>
                <p className="text-gray-300 mb-6 flex-grow">Connect with entrepreneurs and investors in your area.</p>
                <div className="flex items-center justify-between text-sm mt-auto">
                  <span className="text-magenta-accent font-medium">100+ Attendees</span>
                  <span className="text-gray-400">Dec 18, 2024</span>
                </div>
              </div>
            </div>

            <div className="scroll-animate group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 flex flex-col h-full" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="h-48 overflow-hidden mb-4 relative">
                <img src={productLaunchImg} alt="Product Launch Party" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-magenta-accent transition-colors duration-300">Product Launch Party</h3>
                <p className="text-gray-300 mb-6 flex-grow">Celebrate the launch of our latest innovative product.</p>
                <div className="flex items-center justify-between text-sm mt-auto">
                  <span className="text-magenta-accent font-medium">500+ Attendees</span>
                  <span className="text-gray-400">Dec 20, 2024</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scroll-animate text-center mt-12">
            <Link to="/events" className="inline-block bg-gradient-to-r from-magenta-accent to-[#7210a6] hover:from-[#7210a6] hover:to-magenta-accent hover:brightness-110 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      <MarqueeSlider words={["Ticketing", "Analytics", "Networking", "Management"]} />

      <section className="py-28 px-6 md:px-12 relative z-20 border-t border-white/10">
        <div className="scroll-animate text-center mb-20">
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default font-heading">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium text-center transition-all duration-300 hover:text-gray-200 font-description">Real stories from real customers who love EventSphere</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <div className="scroll-animate p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer flex flex-col h-full" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <div className="flex items-start mb-4">
              <FaQuoteLeft className="text-3xl text-magenta-accent mb-4" />
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              EventSphere has completely transformed how we manage our tech conferences. The analytics and guest management features are incredible, saving us hours of work every event.
            </p>
            <div className="flex items-center mt-auto">
              <div className="w-12 h-12 bg-gradient-to-r from-magenta-accent to-[#7210a6] hover:from-[#7210a6] hover:to-magenta-accent hover:brightness-110 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">HK</span>
              </div>
              <h4 className="font-bold text-white">Hadi Khan</h4>
            </div>
          </div>
          
          <div className="scroll-animate p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer flex flex-col h-full" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <div className="flex items-start mb-4">
              <FaQuoteLeft className="text-3xl text-magenta-accent mb-4" />
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              The networking features are phenomenal. We've doubled our event attendance and the RSVP tracking system works flawlessly.
            </p>
            <div className="flex items-center mt-auto">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <h4 className="font-bold text-white">Sarah Richardson</h4>
            </div>
          </div>
          
          <div className="scroll-animate p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer flex flex-col h-full" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <div className="flex items-start mb-4">
              <FaQuoteLeft className="text-3xl text-magenta-accent mb-4" />
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              Best event Management platform we've ever used. The team collaboration tools and analytics have made our events more successful than ever.
            </p>
            <div className="flex items-center mt-auto">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">MJ</span>
              </div>
              <h4 className="font-bold text-white">Michael Johnson</h4>
            </div>
          </div>
        </div>
        
        <div className="scroll-animate text-center mt-12">
          <Link to="/reviews" className="inline-block bg-gradient-to-r from-magenta-accent to-[#7210a6] hover:from-[#7210a6] hover:to-magenta-accent hover:brightness-110 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
            Read More Reviews →
          </Link>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}

export default Home;
