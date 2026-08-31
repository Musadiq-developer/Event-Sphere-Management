import React, { useEffect, useState, useRef } from 'react';
import { FaCalendarAlt, FaUsers, FaChartLine, FaTicketAlt, FaShieldAlt, FaHeadset, FaDatabase, FaClock, FaCheckCircle, FaArrowRight, FaStar, FaRocket, FaLock, FaCreditCard, FaGraduationCap, FaCloud, FaTachometerAlt, FaUserCheck, FaDollarSign, FaPercentage } from 'react-icons/fa';
import featuresBg from '../assets/heroimage6.jpg';
import NewsletterSection from '../components/layout/NewsletterSection';
import MarqueeSlider from '../components/layout/MarqueeSlider';

import analyticsImg from '../assets/kate-trysh-ZUWls_bDgAk-unsplash.jpg';
import ticketsImg from '../assets/alexandre-pellaes-6vAjp0pscX0-unsplash.jpg';
import securityImg from '../assets/product-school-nOvIa_x_tfo-unsplash.jpg';



function Features() {
  const [visibleSections, setVisibleSections] = useState(new Set(['hero']));

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleSections(new Set(['hero', 'analytics', 'ticketing', 'security', 'metrics']));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{background: "transparent"}}>
      
      <section className="py-32 md:py-40 px-6 md:px-12 bg-cover bg-center bg-no-repeat text-white flex items-center justify-center" style={{ backgroundImage: `url(${featuresBg})`, minHeight: '80vh' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
          <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
          </div>
          <h1 className="animate-fadeInUp text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent drop-shadow-sm pb-2">
            Transform Your Events with EventSphere
          </h1>
          <p className="animate-fadeInUp text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            EventSphere empowers organizers with powerful tools to create, manage, and analyze events of any size.
          </p>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <FaTachometerAlt className="scroll-animate text-6xl text-magenta-accent mb-6 mx-auto transition-transform duration-300 hover:scale-110" />
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Real-Time Analytics</h2>
            <p className="scroll-animate text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-200">Make data-driven decisions with live insights into your event performance</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaChartLine className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">Attendance Insights</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Live check-in</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Peak analysis</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Demographics</li>
                </ul>
              </div>

              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaDollarSign className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">Revenue Tracking</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Sales monitoring</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Forecasting</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Profit margins</li>
                </ul>
              </div>

              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer sm:col-span-2" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaUserCheck className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">Engagement Metrics</h3>
                <ul className="space-y-2 text-gray-300 text-sm grid grid-cols-2">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Session rates</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Networking</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Feedback analysis</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-magenta-accent" /> Social engagement</li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 w-full scroll-animate">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.2)] border border-white/10 group">
                <img src={analyticsImg} alt="Analytics Dashboard" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <FaTicketAlt className="scroll-animate text-6xl text-magenta-accent mb-6 mx-auto transition-transform duration-300 hover:scale-110" />
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Advanced Ticketing & Pricing</h2>
            <p className="scroll-animate text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-200">Flexible pricing strategies to maximize attendance and revenue</p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full scroll-animate">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.2)] border border-white/10 group">
                <img src={ticketsImg} alt="Ticketing" className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-1 gap-6">
              <div className="scroll-animate p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaClock className="text-4xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-bold text-white mb-4">Early Bird Pricing</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-magenta-accent mt-1" /> <div><strong className="text-white">Tiered Structure:</strong> Auto-updating prices.</div></li>
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-magenta-accent mt-1" /> <div><strong className="text-white">Limited Quantity:</strong> Create urgency with slots.</div></li>
                </ul>
              </div>

              <div className="scroll-animate p-8 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaPercentage className="text-4xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-bold text-white mb-4">Discount Codes</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-magenta-accent mt-1" /> <div><strong className="text-white">Custom Generation:</strong> Create unlimited codes.</div></li>
                  <li className="flex items-start gap-3"><FaCheckCircle className="text-magenta-accent mt-1" /> <div><strong className="text-white">Advanced Targeting:</strong> Specific customer segments.</div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <FaShieldAlt className="scroll-animate text-6xl text-magenta-accent mb-6 mx-auto transition-transform duration-300 hover:scale-110" />
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Security & Support</h2>
            <p className="scroll-animate text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-200">Your data and events are protected with industry-leading security measures</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaLock className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">Data Protection</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• GDPR compliant</li>
                  <li>• E2E encryption</li>
                </ul>
              </div>

              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaCreditCard className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">Payment Security</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• PCI DSS certified</li>
                  <li>• Fraud detection</li>
                </ul>
              </div>

              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaHeadset className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">24/7 Support</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Live chat support</li>
                  <li>• Dedicated managers</li>
                </ul>
              </div>

              <div className="scroll-animate p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
                <FaGraduationCap className="text-3xl text-magenta-accent mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-bold text-white mb-3">Resources</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Video tutorials</li>
                  <li>• Weekly webinars</li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 w-full scroll-animate">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.2)] border border-white/10 group">
                <img src={securityImg} alt="Security and Support" className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>

          <div className="scroll-animate mt-12 p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
            <div className="flex items-center gap-4 mb-6">
              <FaCloud className="text-4xl text-magenta-accent transition-transform duration-300 hover:scale-110" />
              <h3 className="text-2xl font-bold text-white">Backup & Disaster Recovery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
              <div>
                <strong className="text-white">Automated Backups</strong>
                <p className="text-sm mt-2">Hourly backups with 30-day retention</p>
              </div>
              <div>
                <strong className="text-white">99.9% Uptime SLA</strong>
                <p className="text-sm mt-2">Guaranteed availability with compensation</p>
              </div>
              <div>
                <strong className="text-white">Instant Recovery</strong>
                <p className="text-sm mt-2">Quick rollback and data restoration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeSlider words={["Automation", "Insights", "Security", "Scalability"]} />

      <section className="py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <FaStar className="scroll-animate text-6xl text-magenta-accent mb-6 mx-auto transition-transform duration-300 hover:scale-110" />
            <div className="flex justify-center mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-300 hover:text-white hover:scale-105 cursor-default">Proven Success Metrics</h2>
            <p className="scroll-animate text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-200">See how EventSphere delivers real results for event organizers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="scroll-animate text-center p-8 rounded-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="text-4xl md:text-5xl font-bold text-magenta-accent mb-4">85%</div>
              <p className="text-white font-bold mb-2">Increase in Attendance</p>
              <p className="text-gray-300 text-sm">Average growth seen by our customers</p>
            </div>

            <div className="scroll-animate text-center p-8 rounded-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="text-4xl md:text-5xl font-bold text-magenta-accent mb-4">92%</div>
              <p className="text-white font-bold mb-2">Customer Satisfaction</p>
              <p className="text-gray-300 text-sm">Based on 10,000+ customer reviews</p>
            </div>

            <div className="scroll-animate text-center p-8 rounded-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="text-4xl md:text-5xl font-bold text-magenta-accent mb-4">60%</div>
              <p className="text-white font-bold mb-2">Time Saved</p>
              <p className="text-gray-300 text-sm">On average per event management</p>
            </div>

            <div className="scroll-animate text-center p-8 rounded-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500" style={{background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(12px)'}}>
              <div className="text-4xl md:text-5xl font-bold text-magenta-accent mb-4">3.5x</div>
              <p className="text-white font-bold mb-2">ROI Average</p>
              <p className="text-gray-300 text-sm">Return on investment for customers</p>
            </div>
          </div>

          <div className="scroll-animate text-center mt-16">
            <button className="bg-gradient-to-r from-magenta-accent to-[#7210a6] hover:from-[#7210a6] hover:to-magenta-accent hover:brightness-110 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-purple-500/20 transition-all duration-300 inline-flex items-center gap-3 hover:-translate-y-1">
              Start Your Success Story
              <FaArrowRight className="transition-transform duration-300 hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
