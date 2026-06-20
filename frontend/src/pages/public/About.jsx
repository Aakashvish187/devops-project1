import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Brain, Target, Handshake, Eye } from 'lucide-react';
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };
const stagger = { visible:{transition:{staggerChildren:0.12}} };

const values = [
  { icon: Brain, title: 'Intelligence-First', desc: 'Every solution we build leverages AI to deliver results that were previously impossible.' },
  { icon: Target, title: 'Results-Obsessed', desc: 'We measure everything. If it does not move the needle, we do not do it.' },
  { icon: Eye, title: 'Radical Transparency', desc: 'You will always know exactly what we are doing and why. No black boxes.' },
  { icon: Handshake, title: 'Long-term Partnership', desc: 'We think in decades, not projects. Your growth is our growth.' },
];

export default function About() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api.get('/team').then(r => setTeam(r.data?.team || r.data || [])).catch(() => setTeam([
      { _id: '1', name: 'Aakash Vishwakarma', image: '/images/founder.png', title: 'Founder', role: 'founder', bio: 'Highly skilled with deep knowledge in AI systems, automation, full-stack development, growth strategy, and digital architecture. Visionary leader driving LACSO HUB innovation.', focus: 'AI Systems, Automation, Full-Stack Dev, Growth Strategy', sortOrder: 1 },
      { _id: '2', name: 'Vidhan Rajvi', image: '/images/vidhan.png', title: 'Cloud Architect & DevOps Engineer', role: 'co-founder', bio: 'Cloud infrastructure maestro and DevOps architect designing highly available and infinitely scalable systems.', focus: 'AWS, Kubernetes, Docker, DevOps, CI/CD', sortOrder: 2 },
    ]));
  }, []);

  return (
    <>
      <Helmet><title>About LACSO HUB — AI-Powered Digital Agency</title></Helmet>
      <div className="min-h-screen bg-dark">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-40 pb-28 px-6 overflow-hidden hero-grid">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10" style={{background:'radial-gradient(circle, #6366f1 0%, transparent 70%)',filter:'blur(80px)'}} />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView?'visible':'hidden'}>
              <motion.div variants={fadeUp} className="flex justify-center mb-6">
                <span className="section-tag">Our Story</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">
                Intelligence-First.<br/><span className="gradient-text">Results-Obsessed.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                We are not a traditional digital agency. We are an AI-first digital growth ecosystem built for businesses that want to dominate — not just participate.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
              <motion.span variants={fadeUp} className="section-tag mb-4 inline-block">Our Mission</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6">Built to Make <span className="gradient-text">AI Accessible</span></motion.h2>
              
              <motion.div variants={fadeUp} className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/10 to-transparent p-8 md:p-10 overflow-hidden group hover:border-indigo-500/40 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors duration-500 pointer-events-none" />
                
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500" />
                  Our Origins
                </h3>
                
                <div className="space-y-5 relative z-10">
                  <p className="text-gray-300 leading-relaxed">
                    Founded by Aakash Vishwakarma, LACSO HUB was built on a simple premise: enterprise-grade digital infrastructure should be accessible to ambitious businesses of all sizes. What started as an AI-focused development firm rapidly evolved into a full-spectrum digital engineering agency.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    With Co-Founder Vidhan Rajvi driving our robust cloud architecture and DevOps operations, we don't just build websites; we architect highly available, scalable, and secure digital ecosystems. From deep React engineering and Kubernetes clusters to full AI-automation pipelines, we are the invisible engine behind our clients' unprecedented growth.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger} className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                ['50+', 'Projects Delivered', 'from-indigo-500/20 to-transparent', 'text-indigo-400'],
                ['340%', 'Avg Revenue Growth', 'from-purple-500/20 to-transparent', 'text-purple-400'],
                ['Dec 2025', 'Founded', 'from-pink-500/20 to-transparent', 'text-pink-400'],
                ['4.9★', 'Client Rating', 'from-emerald-500/20 to-transparent', 'text-emerald-400']
              ].map(([n, l, bg, textColor]) => (
                <motion.div key={l} variants={fadeUp} whileHover={{ y: -5 }} className="relative group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden p-6 md:p-8 text-center transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`text-4xl md:text-5xl font-black mb-3 ${textColor}`}>{n}</div>
                    <div className="text-gray-400 text-sm md:text-base font-medium">{l}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="py-24 px-6 bg-gradient-to-b from-transparent via-[#0d1224] to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate={valuesInView?'visible':'hidden'} className="text-center mb-16">
              <motion.div variants={fadeUp}><span className="section-tag mb-4 inline-block">Our Values</span></motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">How We <span className="gradient-text">Operate</span></motion.h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" animate={valuesInView?'visible':'hidden'} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({icon:Icon,title,desc})=>(
                <motion.div key={title} variants={fadeUp} className="glass-card text-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={20} className="text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section ref={teamRef} className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate={teamInView?'visible':'hidden'} className="text-center mb-16">
              <motion.div variants={fadeUp}><span className="section-tag mb-4 inline-block">The Team</span></motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">The Minds <span className="gradient-text">Behind the Magic</span></motion.h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" animate={teamInView?'visible':'hidden'} className="grid md:grid-cols-3 gap-6">
              {team.map(m=>(
                <motion.div key={m._id} variants={fadeUp} className={`glass-card text-center ${m.role==='founder'?'border-indigo-500/40':''}`}>
                  {m.role==='founder'&&<div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Founder</div>}
                  {m.role==='co-founder'&&<div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Co-Founder</div>}
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 border-2 border-indigo-500/30" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black mx-auto mb-4">
                      {m.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-bold text-white text-lg mb-1">{m.name}</h3>
                  <div className="text-indigo-400 text-sm mb-3">{m.title}</div>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">{m.bio}</p>
                  {m.focus&&<p className="text-white/30 text-xs">{m.focus}</p>}
                  {m.linkedin&&<a href={m.linkedin} target="_blank" rel="noreferrer" className="inline-block mt-3 text-indigo-400 text-xs hover:text-indigo-300">LinkedIn →</a>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center glass-card border-indigo-500/30">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to <span className="gradient-text">Transform</span> Your Business?</h2>
            <p className="text-white/60 mb-8">Join the businesses already growing with LACSO HUB's AI-powered ecosystem.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">Start Your Project <ArrowRight size={16}/></Link>
              <a href="https://wa.me/918866371807" target="_blank" rel="noreferrer" className="btn-outline">Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
