import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} };
const stagger = { visible:{transition:{staggerChildren:0.12}} };

const roleColors = { founder:'from-indigo-500 to-purple-600', 'co-founder':'from-purple-500 to-pink-500', team:'from-blue-500 to-indigo-500' };
const roleBadge = { founder:'text-indigo-400 border-indigo-500/30 bg-indigo-500/10', 'co-founder':'text-purple-400 border-purple-500/30 bg-purple-500/10', team:'text-blue-400 border-blue-500/30 bg-blue-500/10' };

export default function Team() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin:'-100px' });
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/team').then(r=>setTeam(r.data?.team||r.data||[])).catch(() => setTeam([
        { _id: '1', name: 'Aakash Vishwakarma', image: '/images/founder.png', title: 'Founder', role: 'founder', bio: 'Highly skilled with deep knowledge in AI systems, automation, full-stack development, growth strategy, and digital architecture. Visionary leader driving LACSO HUB innovation.', education: 'Cloud Computing Student & Advanced Technical Expert', focus: 'AI Systems, Automation, Full-Stack Dev, Growth Strategy', linkedin: 'https://www.linkedin.com/in/aakash-vishwakarma-750b59334/', sortOrder: 1 },
        { _id: '2', name: 'Vidhan Rajvi', image: '/images/vidhan.png', title: 'Cloud Architect & DevOps Engineer', role: 'co-founder', bio: 'Cloud infrastructure maestro and DevOps architect. Vidhan designs highly available, secure, and infinitely scalable systems that power enterprise applications.', education: 'Systems Architecture & Cloud Engineering', focus: 'AWS, Docker, Kubernetes, Linux, CI/CD, Terraform, Cloud Infrastructure, DevOps Automation', linkedin: 'https://www.linkedin.com/in/vidhan-rajvi05/', sortOrder: 2 }
      ])).finally(()=>setLoading(false));
  }, []);

  const founders = team.filter(m=>m.role==='founder'||m.role==='co-founder');
  const members = team.filter(m=>m.role==='team');

  const Card = ({ member, large }) => (
    <div className={`glass-card text-center group ${member.role==='founder'?'border-indigo-500/40':''} ${large?'p-10':''}`}>
      {member.image ? (
        <img src={member.image} alt={member.name} className={`${large?'w-28 h-28':'w-20 h-20'} rounded-2xl object-cover mx-auto mb-5 group-hover:scale-105 transition-transform duration-300 border-2 border-indigo-500/30`} />
      ) : (
        <div className={`${large?'w-28 h-28 text-4xl':'w-20 h-20 text-2xl'} rounded-2xl bg-gradient-to-br ${roleColors[member.role]||'from-indigo-500 to-purple-600'} flex items-center justify-center text-white font-black mx-auto mb-5 group-hover:scale-105 transition-transform duration-300`}>
          {member.name.charAt(0)}
        </div>
      )}
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border mb-3 ${roleBadge[member.role]||roleBadge.team}`}>
        {member.role}
      </div>
      <h3 className={`font-black text-white mb-1 ${large?'text-2xl':'text-lg'}`}>{member.name}</h3>
      <div className="text-indigo-400 text-sm font-medium mb-4">{member.title}</div>
      <p className="text-white/50 text-sm leading-relaxed mb-3">{member.bio}</p>
      {member.education&&<p className="text-white/30 text-xs mb-2">🎓 {member.education}</p>}
      {member.focus&&<p className="text-white/30 text-xs mb-4">🎯 {member.focus}</p>}
      {member.linkedin&&(
        <a href={member.linkedin} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 text-indigo-400 text-sm hover:text-white transition-colors">
          <Linkedin size={14}/> LinkedIn
        </a>
      )}
    </div>
  );

  return (
    <>
      <Helmet><title>Team — The Minds Behind LACSO HUB</title></Helmet>
      <div className="min-h-screen bg-dark">
        <section ref={heroRef} className="relative pt-40 pb-20 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#a855f7 0%,transparent 70%)',filter:'blur(80px)'}}/>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView?'visible':'hidden'}>
              <motion.div variants={fadeUp}><span className="section-tag mb-6 inline-block">Our Team</span></motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">The Minds Behind <span className="gradient-text">LACSO HUB</span></motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-xl mx-auto">A tight-knit team of builders, strategists, and creators obsessed with your results.</motion.p>
            </motion.div>
          </div>
        </section>

        <section ref={teamRef} className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[...Array(3)].map((_,i)=><div key={i} className="glass-card animate-pulse h-80"/>)}</div>
            ) : (
              <>
                {/* Founders + Co-founders */}
                <motion.div variants={stagger} initial="hidden" animate={teamInView?'visible':'hidden'}>
                  <h2 className="text-2xl font-black text-center mb-8 text-white/80">Leadership</h2>
                  <motion.div variants={stagger} className={`grid gap-6 mb-16 ${founders.length===1?'max-w-md mx-auto':founders.length===2?'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto':'grid-cols-1 md:grid-cols-3'}`}>
                    {founders.map(m=>(
                      <motion.div key={m._id} variants={fadeUp}>
                        <Card member={m} large={m.role==='founder'}/>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Rest of team */}
                {members.length > 0 && (
                  <motion.div variants={stagger} initial="hidden" animate={teamInView?'visible':'hidden'}>
                    <h2 className="text-2xl font-black text-center mb-8 text-white/80">Team Members</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {members.map(m=>(
                        <motion.div key={m._id} variants={fadeUp}><Card member={m}/></motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center glass-card border-purple-500/30">
            <h2 className="text-3xl font-black mb-4">Want to <span className="gradient-text">Join the Team?</span></h2>
            <p className="text-white/60 mb-6">We're always looking for exceptional builders, designers, and strategists.</p>
            <a href="mailto:lacsohub@gmail.com?subject=Career Opportunity" className="btn-primary inline-flex">Send Us Your Profile →</a>
          </div>
        </section>
      </div>
    </>
  );
}
