import { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight, Tag, ArrowLeft, Share2 } from 'lucide-react';
import api from '../../services/api';

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.6}} };
const stagger = { visible:{transition:{staggerChildren:0.1}} };

export default function Blog() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const limit = 9;
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true });

  const categories = ['All','AI Strategy','Automation','SEO','Branding','Web Design'];

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit, status:'published' });
    if (activeCategory !== 'All') params.set('category', activeCategory);
    api.get(`/blogs?${params}`).then(r=>{
      const data = r.data;
      setBlogs(data.blogs || data.data || []);
      setTotal(data.total || 0);
    }).catch(()=>setBlogs([
      { _id:'1',slug:'ai-first-website-2025',title:'Why Every Business Needs an AI-First Website in 2025',excerpt:'The difference between businesses that thrive and those that fade is their ability to leverage AI.',category:'AI Strategy',author:'Aakash Vishwakarma',createdAt:'2025-12-15' },
      { _id:'2',slug:'ai-automation-case-study',title:'How AI Automation Saved Our Client 180 Hours Per Month',excerpt:'A real estate company was drowning in manual follow-ups. We deployed an AI automation stack that changed everything.',category:'Automation',author:'Aakash Vishwakarma',createdAt:'2026-01-10' },
      { _id:'3',slug:'seo-playbook-2025',title:'The 2025 SEO Playbook: How AI is Rewriting the Rules',excerpt:'Google\'s AI revolution has changed SEO forever. Here is the complete playbook for dominating search in 2025.',category:'SEO',author:'Aakash Vishwakarma',createdAt:'2026-02-01' },
    ])).finally(()=>setLoading(false));
  }, [page, activeCategory]);

  return (
    <>
      <Helmet><title>Blog — Insights & Intelligence | LACSO HUB</title></Helmet>
      <div className="min-h-screen bg-dark">
        <section ref={heroRef} className="relative pt-40 pb-20 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#6366f1 0%,transparent 70%)',filter:'blur(80px)'}}/>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate={heroInView?'visible':'hidden'}>
              <motion.div variants={fadeUp}><span className="section-tag mb-6 inline-block">Blog</span></motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-6">Insights & <span className="gradient-text">Intelligence</span></motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-xl mx-auto">Ideas, strategies, and deep-dives into AI, growth, and digital transformation.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <div className="px-6 pb-4">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
            {categories.map(cat=>(
              <button key={cat} onClick={()=>{setActiveCategory(cat);setPage(1);}}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${activeCategory===cat?'bg-indigo-500 border-indigo-500 text-white':'border-white/10 text-white/50 hover:border-indigo-500/50 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <section ref={gridRef} className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_,i)=><div key={i} className="glass-card animate-pulse h-64"/>)}
              </div>
            ) : (
              <motion.div variants={stagger} initial="hidden" animate={gridInView?'visible':'hidden'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog=>(
                  <motion.div key={blog._id} variants={fadeUp}>
                    <Link to={`/blog/${blog.slug}`} className="glass-card flex flex-col h-full group block">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">{blog.category}</span>
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <Calendar size={11}/>
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ''}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-indigo-300 transition-colors flex-1">{blog.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                        <span className="text-white/30 text-xs">{blog.author}</span>
                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                          Read More <ArrowRight size={13}/>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {total > limit && (
              <div className="flex justify-center gap-3 mt-12">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                  className="btn-outline px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"><ArrowLeft size={16}/></button>
                <span className="px-4 py-2 text-white/50">Page {page} of {Math.ceil(total/limit)}</span>
                <button onClick={()=>setPage(p=>p+1)} disabled={page>=Math.ceil(total/limit)}
                  className="btn-outline px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"><ArrowRight size={16}/></button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
