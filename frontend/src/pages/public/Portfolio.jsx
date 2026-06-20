import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight, Filter } from 'lucide-react';
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:[0.22,1,0.36,1]}} };
const stagger = { visible:{transition:{staggerChildren:0.1}} };

const CATS = ['All','AI Website + Automation','SEO & Growth','AI Automation','Branding'];

export default function Portfolio() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true });

  useEffect(() => {
    api.get('/portfolio').then(r=>setItems(r.data?.portfolio||r.data||[])).catch(()=>setItems([
      { _id:'1',title:'E-Commerce AI Transformation',clientName:'RetailX India',industry:'E-Commerce',category:'AI Website + Automation',challenge:'Slow site with 2% conversion rate and no automation.',results:['340% increase in revenue in 90 days','Conversion rate jumped from 2% to 7.8%','Cart abandonment reduced by 62%'],beforeMetric:'₹2L/month',afterMetric:'₹8.8L/month',isFeatured:true },
      { _id:'2',title:'Local Business SEO Domination',clientName:'GreenLeaf Dental',industry:'Healthcare',category:'SEO & Growth',challenge:'Zero online presence. Getting 3-4 leads per month.',results:['#1 on Google for 47 keywords','Organic leads: 4 → 89/month','ROI: 18x in 6 months'],beforeMetric:'4 leads/month',afterMetric:'89 leads/month',isFeatured:false },
      { _id:'3',title:'AI Automation for Real Estate',clientName:'PropVista Realty',industry:'Real Estate',category:'AI Automation',challenge:'Sales team spending 6 hours/day on manual follow-ups.',results:['Response time: 4 hours → 8 seconds','Lead conversion up 290%','Saved 180 man-hours/month'],beforeMetric:'4hr response',afterMetric:'8 sec response',isFeatured:false },
    ])).finally(()=>setLoading(false));
  }, []);

  const filtered = activeFilter==='All' ? items : items.filter(i=>i.category===activeFilter);

  return (
    <>
      <Helmet><title>Portfolio — LACSO HUB Case Studies</title></Helmet>
      <div className="min-h-screen bg-dark">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-40 pb-20 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#a855f7 0%,transparent 70%)',filter:'blur(80px)'}}/>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView?'visible':'hidden'}>
              <motion.div variants={fadeUp}><span className="section-tag mb-6 inline-block">Case Studies</span></motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">
                Our Work <span className="gradient-text">Speaks</span><br/>for Itself
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-2xl mx-auto">
                Real clients. Real numbers. Real transformation. Here's what happens when AI meets ambition.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <div className="px-6 pb-4">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
            {CATS.map(cat=>(
              <button key={cat} onClick={()=>setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${activeFilter===cat?'bg-indigo-500 border-indigo-500 text-white':'border-white/10 text-white/50 hover:border-indigo-500/50 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <section ref={gridRef} className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_,i)=><div key={i} className="glass-card animate-pulse h-80"/>)}
              </div>
            ) : (
              <motion.div variants={stagger} initial="hidden" animate={gridInView?'visible':'hidden'} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filtered.map(item=>(
                    <motion.div key={item._id} variants={fadeUp} layout
                      className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${item.isFeatured?'border-purple-500/50 bg-purple-500/5 hover:shadow-purple-500/20':'border-white/[0.08] bg-white/[0.03] hover:border-indigo-500/30'}`}>
                      {item.isFeatured&&<div className="absolute -top-3 left-6"><span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold uppercase tracking-wider">Featured</span></div>}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">{item.category}</span>
                        <span className="text-white/30 text-xs">{item.industry}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-indigo-400 text-sm mb-3">{item.clientName}</p>
                      <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
                        <span className="block text-white/25 text-xs uppercase tracking-wider mb-1">Challenge</span>
                        {item.challenge}
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {(item.results||[]).slice(0,3).map((r,i)=>(
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5"/>
                            <span className="text-white/70">{r}</span>
                          </div>
                        ))}
                      </div>
                      {item.beforeMetric&&item.afterMetric&&(
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
                          <div className="text-center bg-red-500/5 border border-red-500/10 rounded-xl p-2">
                            <div className="text-xs text-white/30 mb-1">Before</div>
                            <div className="font-bold text-red-400 text-sm">{item.beforeMetric}</div>
                          </div>
                          <div className="text-center bg-green-500/5 border border-green-500/10 rounded-xl p-2">
                            <div className="text-xs text-white/30 mb-1">After</div>
                            <div className="font-bold text-green-400 text-sm">{item.afterMetric}</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center glass-card border-indigo-500/30">
            <h2 className="text-3xl font-black mb-4">Ready to Be Our <span className="gradient-text">Next Case Study?</span></h2>
            <p className="text-white/60 mb-6">Let's build something that changes the trajectory of your business.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary">Start Your Project <ArrowRight size={16}/></a>
              <a href="https://wa.me/918866371807" target="_blank" rel="noreferrer" className="btn-outline">Chat on WhatsApp</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
