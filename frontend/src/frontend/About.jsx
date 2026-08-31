import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaCode, FaGithub, FaServer, FaChartLine, FaRegClock, FaTimesCircle, FaCheckCircle, FaStripe, FaSlack, FaAws, FaPaypal, FaMailchimp, FaFigma, FaGoogle, FaDropbox } from 'react-icons/fa';
import aboutBg from '../assets/heroimageaboutus.jpg';
import whyBetterImg from '../assets/samantha-gades-fIHozNWfcvs-unsplash.jpg';
import journeyImg from '../assets/nick-night-52F2gX0COs4-unsplash.jpg';
import MarqueeSlider from '../components/layout/MarqueeSlider';
import visionImg from '../assets/campaign-creators-qCi_MzVODoU-unsplash.jpg';

function About() {
  return (
    <div className="min-h-screen text-white pb-32" style={{background: "transparent"}}>
      
      
      <section className="py-32 md:py-40 px-6 md:px-12 bg-cover bg-center bg-no-repeat text-white relative flex items-center" style={{ backgroundImage: `url(${aboutBg})`, minHeight: '80vh' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-left">
            <div className="flex justify-start mb-4">
            <div className="w-48 md:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d100a0] to-transparent shadow-[0_0_20px_rgba(209,0,160,1)] rounded-full"></div>
            </div>
            <h1 className="animate-fadeInUp text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent drop-shadow-sm pb-2 font-heading">
              Our Vision
            </h1>
            <p className="animate-fadeInUp text-xl md:text-2xl text-gray-300 mb-8 font-description" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Events bring people together. We built EventSphere to make planning easy, so you can stop worrying about management and focus on the <span className="text-magenta-accent font-bold">experience.</span>
            </p>
          </div>
          <div className="md:w-1/2 w-full animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.3)] border border-white/10 group">
              <img src={visionImg} alt="Team Collaborating" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6 md:px-12 relative z-20 border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent pb-2 font-heading">Why We Are Better</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            <div className="w-full lg:w-1/2 animate-fadeInUp">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.3)] border border-white/10 group h-full min-h-[500px]">
                <img src={whyBetterImg} alt="Event Vibe" className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0518] via-[#0f0518]/50 to-transparent opacity-80"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <div className="p-10 rounded-[2rem] border border-gray-800 bg-gray-900/50 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FaRegClock className="text-8xl text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-500 mb-6 flex items-center gap-3">
                  <FaTimesCircle className="text-red-500" /> The Old Way
                </h3>
                <ul className="space-y-6 text-gray-400">
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div><strong className="text-gray-300">Too Many Tools:</strong> Using many different apps for tickets, sharing, and chatting at the same time.</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div><strong className="text-gray-300">No Clear Data:</strong> Not knowing if people actually liked the event or participated in it.</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div><strong className="text-gray-300">Doing Everything by Hand:</strong> Sending hundreds of emails one by one and tracking guests in messy spreadsheets.</div>
                  </li>
                </ul>
              </div>

              <div className="p-10 rounded-[2rem] border border-magenta-accent/30 bg-[#1e0b36]/60 backdrop-blur-xl relative overflow-hidden group hover:border-magenta-accent transition-all duration-500 shadow-[0_0_30px_rgba(209,0,160,0.15)] hover:shadow-[0_0_50px_rgba(209,0,160,0.3)]">
                <div className="absolute top-0 -right-4 p-4 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                  <FaChartLine className="text-9xl text-magenta-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-magenta-accent" /> The EventSphere Way
                </h3>
                <ul className="space-y-6 text-gray-200">
                  <li className="flex items-start gap-4 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-magenta-accent mt-2 shadow-[0_0_10px_rgba(209,0,160,1)]"></div>
                    <div><strong className="text-white">Everything in One Place:</strong> Manage tickets, payments, and live updates easily from a single dashboard.</div>
                  </li>
                  <li className="flex items-start gap-4 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-magenta-accent mt-2 shadow-[0_0_10px_rgba(209,0,160,1)]"></div>
                    <div><strong className="text-white">Smart Insights:</strong> Simple charts and data that show you exactly what your guests need.</div>
                  </li>
                  <li className="flex items-start gap-4 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-magenta-accent mt-2 shadow-[0_0_10px_rgba(209,0,160,1)]"></div>
                    <div><strong className="text-white">Automatic Tasks:</strong> Set things up once and let the system handle the hard work automatically.</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6 md:px-12 relative z-20">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2 animate-fadeInUp">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(209,0,160,0.3)] border border-white/10 group h-full min-h-[500px]">
                <img src={journeyImg} alt="Our Journey" className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-[#0f0518]/30 to-transparent opacity-80"></div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="relative border-l-2 border-magenta-accent/30 pl-8">
                <div className="mb-12 relative">
                  <div className="absolute left-[-41px] w-6 h-6 rounded-full bg-deep-bg border-4 border-magenta-accent shadow-[0_0_15px_rgba(209,0,160,1)] z-10"></div>
                  <div className="inline-block px-4 py-1 mb-4 rounded-full bg-magenta-accent/10 border border-magenta-accent/30 text-magenta-accent text-sm font-bold tracking-widest uppercase">Phase 01</div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Setup</h3>
                  <p className="text-gray-400 font-description">We started by building a strong and fast system that can handle many users at once.</p>
                </div>

                <div className="mb-12 relative">
                  <div className="absolute left-[-41px] w-6 h-6 rounded-full bg-deep-bg border-4 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 transition-colors duration-500 hover:border-magenta-accent"></div>
                  <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/5 border border-white/20 text-white text-sm font-bold tracking-widest uppercase">Phase 02</div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Design</h3>
                  <p className="text-gray-400 font-description">We wanted the app to look amazing, so we designed a beautiful dark theme that is easy and fun to use.</p>
                </div>

                <div className="relative">
                  <div className="absolute left-[-41px] w-8 h-8 rounded-full bg-magenta-accent border-4 border-deep-bg shadow-[0_0_20px_rgba(209,0,160,1)] z-10 animate-pulse -ml-1"></div>
                  <div className="inline-block px-4 py-1 mb-4 rounded-full bg-magenta-accent border border-magenta-accent text-white shadow-[0_0_15px_rgba(209,0,160,0.5)] text-sm font-bold tracking-widest uppercase">We Are Here</div>
                  <h3 className="text-2xl font-bold text-magenta-accent mb-2">Going Live</h3>
                  <p className="text-gray-300 font-description">Making the website public and ensuring it works perfectly without crashing for all our users.</p>
                </div>
              </div>
            </div>
          </div>
      </section>

      
      <section className="py-24 px-6 md:px-12 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent pb-2 font-heading">Our Partners</h2>
            <p className="text-lg text-gray-400 mt-4 font-description">Trusted by leading organizations in the event management and hospitality industry</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 py-8">
            
            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#6366f1] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaStripe className="text-4xl md:text-6xl text-gray-400 group-hover:text-[#6366f1] transition-colors duration-300" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">Stripe</p>
              <p className="text-[11px] text-gray-500 text-center">Payment Partner</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#e51670] group-hover:shadow-[0_0_25px_rgba(229,22,112,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaSlack className="text-4xl md:text-5xl text-gray-400 group-hover:text-[#e51670] transition-colors duration-300 mb-1" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">Slack</p>
              <p className="text-[11px] text-gray-500 text-center">Communications</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#ff9900] group-hover:shadow-[0_0_25px_rgba(255,153,0,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaAws className="text-4xl md:text-6xl text-gray-400 group-hover:text-[#ff9900] transition-colors duration-300" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">AWS</p>
              <p className="text-[11px] text-gray-500 text-center">Cloud Infrastructure</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#0079c1] group-hover:shadow-[0_0_25px_rgba(0,121,193,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaPaypal className="text-4xl md:text-5xl text-gray-400 group-hover:text-[#0079c1] transition-colors duration-300 mb-1" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">PayPal</p>
              <p className="text-[11px] text-gray-500 text-center">Ticketing</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#ffe01b] group-hover:shadow-[0_0_25px_rgba(255,224,27,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaMailchimp className="text-4xl md:text-6xl text-gray-400 group-hover:text-[#ffe01b] transition-colors duration-300" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">Mailchimp</p>
              <p className="text-[11px] text-gray-500 text-center">Marketing Integration</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#f24e1e] group-hover:shadow-[0_0_25px_rgba(242,78,30,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaFigma className="text-4xl md:text-5xl text-gray-400 group-hover:text-[#f24e1e] transition-colors duration-300 mb-1" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">Figma</p>
              <p className="text-[11px] text-gray-500 text-center">Event Design</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#ea4335] group-hover:shadow-[0_0_25px_rgba(234,67,53,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaGoogle className="text-4xl md:text-5xl text-gray-400 group-hover:text-[#ea4335] transition-colors duration-300 mb-1" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">Google</p>
              <p className="text-[11px] text-gray-500 text-center">Calendar Sync</p>
            </div>

            <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:border-[#0061ff] group-hover:shadow-[0_0_25px_rgba(0,97,255,0.3)] transition-all duration-300 backdrop-blur-sm">
                <FaDropbox className="text-4xl md:text-5xl text-gray-400 group-hover:text-[#0061ff] transition-colors duration-300 mb-1" />
              </div>
              <p className="text-sm text-gray-300 mt-3 text-center font-bold">Dropbox</p>
              <p className="text-[11px] text-gray-500 text-center">Asset Management</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">Join our growing network of industry partners</p>
            <button className="mt-4 px-8 py-3 rounded-xl border-2 border-magenta-accent text-magenta-accent hover:bg-magenta-accent hover:text-white transition-all duration-300 shadow-purple-500/20 hover:shadow-purple-500/30 font-bold">
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      <MarqueeSlider words={["Innovation", "Vision", "Community", "Excellence"]} />

      <section className="py-24 px-6 md:px-12 relative z-20 border-t border-white/10 bg-gradient-to-b from-transparent to-[#1e0b36]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eac2ff] to-magenta-accent pb-2 font-heading">Built With Modern Tools</h2>
            <p className="text-lg text-gray-400 mt-4 font-description">Made using the best new technologies for a fast, smooth, and modern website.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            
            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#61DAFB] hover:shadow-[0_0_25px_rgba(97,218,251,0.3)] group cursor-default">
              <FaReact className="text-4xl text-gray-500 group-hover:text-[#61DAFB] transition-colors" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">React</span>
            </div>
            
            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#38B2AC] hover:shadow-[0_0_25px_rgba(56,178,172,0.3)] group cursor-default">
              <FaCode className="text-4xl text-gray-500 group-hover:text-[#38B2AC] transition-colors" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Tailwind CSS</span>
            </div>

            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#339933] hover:shadow-[0_0_25px_rgba(51,153,51,0.3)] group cursor-default">
              <FaNodeJs className="text-4xl text-gray-500 group-hover:text-[#339933] transition-colors" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Node.js</span>
            </div>

            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#47A248] hover:shadow-[0_0_25px_rgba(71,162,72,0.3)] group cursor-default">
              <FaDatabase className="text-4xl text-gray-500 group-hover:text-[#47A248] transition-colors" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">MongoDB</span>
            </div>

            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#ffffff] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] group cursor-default">
              <FaGithub className="text-4xl text-gray-500 group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Git</span>
            </div>
            
            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-magenta-accent hover:shadow-[0_0_25px_rgba(209,0,160,0.3)] group cursor-default">
              <FaServer className="text-4xl text-gray-500 group-hover:text-magenta-accent transition-colors" />
              <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Express</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
