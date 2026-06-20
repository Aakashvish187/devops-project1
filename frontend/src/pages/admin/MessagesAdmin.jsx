import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Trash2, Mail, MessageCircle, CheckCircle, Clock, Archive } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} };

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchMessages = () => {
    setLoading(true);
    api.get('/contact').then(r=>{
      setMessages(r.data?.contacts||r.data||[]);
    }).catch(e=>{
      toast.error('Failed to load messages');
      console.error(e);
    }).finally(()=>setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      toast.success(`Message marked as ${status}`);
      setMessages(messages.map(m=>m._id===id ? { ...m, status } : m));
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      setMessages(messages.filter(m=>m._id!==id));
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(m=>{
    if (filter !== 'All' && m.status !== filter.toLowerCase()) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase()) && !m.company?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'read': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'replied': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'archived': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <>
      <Helmet><title>Messages | LACSO HUB Admin</title></Helmet>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Messages</h1>
          <p className="text-white/50">Manage contact inquiries and leads</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="glass-card mb-8 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {['All','New','Read','Replied','Archived'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter===f?'bg-indigo-500 text-white':'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <input type="text" placeholder="Search messages..." value={search} onChange={(e)=>setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50"/>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_,i)=><div key={i} className="glass-card animate-pulse h-32 bg-white/5"/>)
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12 glass-card border-dashed">
            <Mail size={48} className="mx-auto text-white/20 mb-4"/>
            <h3 className="text-lg font-bold text-white mb-2">No messages found</h3>
            <p className="text-white/50">No inquiries match your current filters.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredMessages.map(msg=>(
              <motion.div key={msg._id} variants={fadeUp} initial="hidden" animate="visible" exit={{opacity:0,y:-20}} layout
                className={`glass-card p-6 border-l-4 ${msg.status==='new'?'border-l-indigo-500':'border-l-transparent'}`}>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(msg.status)} uppercase font-bold tracking-wider`}>
                        {msg.status}
                      </span>
                      <span className="text-white/30 text-xs flex items-center gap-1">
                        <Clock size={12}/>
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <a href={`mailto:${msg.email}`} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"><Mail size={14}/> {msg.email}</a>
                      {msg.phone&&<span className="text-white/60 flex items-center gap-1.5"><MessageCircle size={14}/> {msg.phone}</span>}
                      {msg.company&&<span className="text-white/60 flex items-center gap-1.5"><Archive size={14}/> {msg.company}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-[200px] text-sm">
                    {msg.serviceInterest&&<div className="bg-white/5 px-3 py-1.5 rounded-md"><span className="text-white/40 text-xs block mb-0.5">Service</span><span className="text-white/80">{msg.serviceInterest}</span></div>}
                    {msg.budget&&<div className="bg-white/5 px-3 py-1.5 rounded-md"><span className="text-white/40 text-xs block mb-0.5">Budget</span><span className="text-white/80">{msg.budget}</span></div>}
                  </div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg text-white/70 text-sm whitespace-pre-wrap mb-4 border border-white/5">
                  {msg.message}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <select value={msg.status} onChange={(e)=>handleStatusChange(msg._id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50">
                      <option value="new">Mark as New</option>
                      <option value="read">Mark as Read</option>
                      <option value="replied">Mark as Replied</option>
                      <option value="archived">Archive</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    {msg.phone&&<a href={`https://wa.me/${msg.phone.replace(/\D/g,'')}?text=Hi%20${msg.name},%20we%20received%20your%20inquiry%20at%20LACSO%20HUB.`} target="_blank" rel="noreferrer" className="btn-outline px-3 py-1.5 text-sm bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"><MessageCircle size={14}/> WhatsApp</a>}
                    <a href={`mailto:${msg.email}?subject=Re: Inquiry at LACSO HUB`} className="btn-primary px-3 py-1.5 text-sm"><Mail size={14}/> Reply</a>
                    <button onClick={()=>handleDelete(msg._id)} className="btn-outline px-3 py-1.5 text-sm bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"><Trash2 size={14}/></button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
