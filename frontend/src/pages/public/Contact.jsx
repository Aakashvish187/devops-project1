import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const Instagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Twitter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Youtube = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} };
const stagger = { visible:{transition:{staggerChildren:0.1}} };

const SERVICES = ['AI Website Development','AI Automation','SEO & Growth','Brand Identity & Design','App Development','Other'];
const BUDGETS = ['Under ₹15,000','₹15,000 – ₹30,000','₹30,000 – ₹60,000','₹60,000 – ₹1,20,000','₹1,20,000+','Custom/Enterprise'];

export default function Contact() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin:'-100px' });
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/contact', data);
      toast.success('Message sent! We\'ll be in touch within 24 hours. 🚀');
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send. Please try WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Contact Us — LACSO HUB</title><meta name="description" content="Get in touch with LACSO HUB. Start your AI-powered project today."/></Helmet>
      <div className="min-h-screen bg-dark">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-40 pb-20 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#6366f1 0%,transparent 70%)',filter:'blur(80px)'}}/>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView?'visible':'hidden'}>
              <motion.div variants={fadeUp}><span className="section-tag mb-6 inline-block">Get in Touch</span></motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">Let's Build Your<br/><span className="gradient-text">Digital Empire</span></motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-2xl mx-auto">Every transformation starts with a conversation. Tell us about your business and we'll tell you exactly how AI can unlock your next level of growth.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section ref={formRef} className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
            {/* Info Column */}
            <motion.div variants={stagger} initial="hidden" animate={formInView?'visible':'hidden'} className="lg:col-span-2 space-y-8">
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-black mb-6 text-white">Contact Details</h2>
                <div className="space-y-4">
                  {[
                    { icon:Mail, label:'Email', value:'lacsohub@gmail.com', href:'mailto:lacsohub@gmail.com' },
                    { icon:Phone, label:'Phone', value:'+91 88663 71807', href:'tel:+918866371807' },
                    { icon:MapPin, label:'Location', value:'Ahmedabad, Gujarat, India', href:null },
                  ].map(({ icon:Icon, label, value, href })=>(
                    <div key={label} className="flex items-start gap-4 p-4 glass-card hover:border-indigo-500/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-indigo-400"/>
                      </div>
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</div>
                        {href ? <a href={href} className="text-white hover:text-indigo-300 transition-colors font-medium">{value}</a>
                          : <span className="text-white font-medium">{value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div variants={fadeUp}>
                <a href="https://wa.me/918866371807?text=Hi%20LACSO%20HUB!%20I%20want%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/60 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <MessageCircle size={22} className="text-green-400"/>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">Quick Connect on WhatsApp</div>
                    <div className="text-green-400 text-sm">Typically replies in under 1 hour</div>
                  </div>
                  <ArrowRight size={16} className="text-green-400 group-hover:translate-x-1 transition-transform"/>
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeUp}>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-4">Follow Us</div>
                <div className="flex gap-3">
                  {[
                    { icon:Instagram, href:'https://instagram.com/lacsohub', label:'Instagram' },
                    { icon:Twitter, href:'https://twitter.com/lacsohub', label:'Twitter' },
                    { icon:Linkedin, href:'https://linkedin.com/company/lacsohub', label:'LinkedIn' },
                    { icon:Youtube, href:'https://youtube.com/@lacsohub', label:'YouTube' },
                  ].map(({ icon:Icon, href, label })=>(
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                      className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all">
                      <Icon size={16}/>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Form Column */}
            <motion.div variants={fadeUp} initial="hidden" animate={formInView?'visible':'hidden'} className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card border-white/10 space-y-5 p-8">
                <h2 className="text-2xl font-black text-white mb-2">Send a Message</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Name <span className="text-red-400">*</span></label>
                    <input {...register('name',{required:'Name is required'})} placeholder="Aakash Vishwakarma" className="input-field"/>
                    {errors.name&&<p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input {...register('email',{required:'Email is required',pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'Invalid email'}})} placeholder="aakash@company.com" className="input-field"/>
                    {errors.email&&<p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Phone</label>
                    <input {...register('phone')} placeholder="+91 98765 43210" className="input-field"/>
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Company</label>
                    <input {...register('company')} placeholder="Your Company" className="input-field"/>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Service Interested In</label>
                    <select {...register('serviceInterest')} className="input-field">
                      <option value="">Select a service</option>
                      {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Budget Range</label>
                    <select {...register('budget')} className="input-field">
                      <option value="">Select budget</option>
                      {BUDGETS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-sm mb-1.5">Message <span className="text-red-400">*</span></label>
                  <textarea {...register('message',{required:'Please describe your project'})} rows={5} placeholder="Tell us about your project, goals, timeline, and any specific requirements..." className="input-field resize-none"/>
                  {errors.message&&<p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60">
                  {submitting ? 'Sending...' : <><ArrowRight size={18}/> Send Message</>}
                </button>
                <p className="text-white/30 text-xs text-center">We respond within 24 hours. Your info is kept private.</p>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
