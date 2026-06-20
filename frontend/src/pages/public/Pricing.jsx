import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, X, ArrowRight, ChevronDown } from 'lucide-react';
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} };
const stagger = { visible:{transition:{staggerChildren:0.12}} };

const DEFAULT_PLANS = [
  { _id:'1',title:'Starter Website',price:'₹6,999',priceNote:'One-time',description:'Best for small businesses starting their digital presence.',features:[{text:'AI optimized website',included:true},{text:'Up to 5 pages',included:true},{text:'Mobile responsive design',included:true},{text:'Basic SEO setup',included:true},{text:'Contact form integration',included:true},{text:'1 month support',included:true},{text:'Custom AI-powered CMS',included:false},{text:'WhatsApp chatbot',included:false}],ctaText:'Start Project',ctaUrl:'/contact?plan=starter',badge:'',isHighlight:false },
  { _id:'2',title:'Growth Website',price:'₹16,999',priceNote:'One-time',description:'Best for growing businesses needing automation and SEO growth.',features:[{text:'Everything in Starter',included:true},{text:'AI powered CMS',included:true},{text:'WhatsApp chatbot',included:true},{text:'Blog system',included:true},{text:'SEO architecture setup',included:true},{text:'Lead capture system',included:true},{text:'3 months support',included:true},{text:'Custom AI training',included:false}],ctaText:'Launch Growth Plan',ctaUrl:'/contact?plan=growth',badge:'Most Popular',isHighlight:true },
  { _id:'3',title:'AI Business Platform',price:'₹50,000+',priceNote:'Custom Quote',description:'Full AI digital infrastructure for serious businesses.',features:[{text:'Custom AI website system',included:true},{text:'Automation workflows',included:true},{text:'CRM integration',included:true},{text:'AI chatbot training',included:true},{text:'Advanced analytics',included:true},{text:'Custom backend CMS',included:true},{text:'API integrations',included:true},{text:'Priority support',included:true}],ctaText:'Book Strategy Call',ctaUrl:'/contact?plan=platform',badge:'Enterprise',isHighlight:false },
];

const faqs = [
  { q:'How long does a website project take?', a:'Starter websites: 5-7 days. Growth websites: 10-14 days. AI Business Platforms: 4-8 weeks depending on complexity.' },
  { q:'Do you offer EMI or payment plans?', a:'Yes! We offer flexible payment plans for Growth and Platform tiers. 50% upfront, 50% on delivery — or custom arrangements for larger projects.' },
  { q:'What happens after delivery?', a:'Every plan includes support. Starter gets 1 month, Growth gets 3 months, Platform gets priority ongoing support. We also offer annual maintenance packages.' },
  { q:'Can I upgrade my plan later?', a:'Absolutely. Many clients start with Starter and upgrade as they grow. We credit your previous investment towards the upgrade.' },
  { q:'Do you work with international clients?', a:'Yes! We work with clients across India, UAE, UK, USA, Canada, and Australia. We accept international payments.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden">
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors">
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={18} className={`text-indigo-400 flex-shrink-0 transition-transform duration-200 ${open?'rotate-180':''}`}/>
      </button>
      {open&&<div className="px-5 pb-5 text-white/60 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function Pricing() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const plansRef = useRef(null);
  const plansInView = useInView(plansRef, { once: true, margin:'-100px' });
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pricing').then(r=>setPlans(r.data?.plans||r.data||[])).catch(()=>setPlans(DEFAULT_PLANS)).finally(()=>setLoading(false));
  }, []);

  const displayPlans = plans.length > 0 ? plans : DEFAULT_PLANS;

  return (
    <>
      <Helmet><title>Pricing — Transparent Plans | LACSO HUB</title></Helmet>
      <div className="min-h-screen bg-dark">
        <section ref={heroRef} className="relative pt-40 pb-20 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#6366f1 0%,transparent 70%)',filter:'blur(80px)'}}/>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView?'visible':'hidden'}>
              <motion.div variants={fadeUp}><span className="section-tag mb-6 inline-block">Pricing</span></motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">Transparent Pricing,<br/><span className="gradient-text">Extraordinary Value</span></motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-xl mx-auto">No hidden fees. No surprises. Just exceptional work at honest prices.</motion.p>
            </motion.div>
          </div>
        </section>

        <section ref={plansRef} className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">{[...Array(3)].map((_,i)=><div key={i} className="glass-card animate-pulse h-96"/>)}</div>
            ) : (
              <motion.div variants={stagger} initial="hidden" animate={plansInView?'visible':'hidden'} className="grid md:grid-cols-3 gap-6 items-start">
                {displayPlans.map((plan,i)=>(
                  <motion.div key={plan._id||i} variants={fadeUp}
                    className={`relative rounded-2xl p-8 flex flex-col border transition-all duration-300 ${plan.isHighlight?'border-indigo-500 bg-indigo-500/5 shadow-2xl shadow-indigo-500/20 scale-105':'border-white/[0.08] bg-white/[0.03]'}`}>
                    {plan.badge&&(
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${plan.isHighlight?'bg-gradient-to-r from-indigo-500 to-purple-500 text-white':'bg-white/10 text-white/60'}`}>{plan.badge}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-black text-white mb-2">{plan.title}</h3>
                    <p className="text-white/50 text-sm mb-6">{plan.description}</p>
                    <div className="mb-8">
                      <div className="text-4xl font-black text-white">{plan.price}</div>
                      <div className="text-white/40 text-sm">{plan.priceNote}</div>
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                      {(plan.features||[]).map((f,j)=>(
                        <div key={j} className="flex items-center gap-3">
                          {f.included ? <Check size={15} className="text-green-400 flex-shrink-0"/> : <X size={15} className="text-white/20 flex-shrink-0"/>}
                          <span className={`text-sm ${f.included?'text-white/80':'text-white/30'}`}>{f.text}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={plan.ctaUrl||'/contact'} className={plan.isHighlight?'btn-primary justify-center':'btn-outline justify-center'}>
                      {plan.ctaText||'Get Started'} <ArrowRight size={16}/>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Custom CTA */}
            <div className="mt-12 text-center glass-card border-purple-500/30">
              <h3 className="text-2xl font-black mb-3">Need a <span className="gradient-text">Custom Solution?</span></h3>
              <p className="text-white/60 mb-6">Enterprise clients with unique requirements — let's build something tailor-made.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="btn-primary">Book Strategy Call <ArrowRight size={16}/></Link>
                <a href="https://wa.me/918866371807" target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-10">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <div className="space-y-3">
              {faqs.map(f=><FAQItem key={f.q} {...f}/>)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
