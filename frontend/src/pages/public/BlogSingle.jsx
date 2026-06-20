import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowLeft, ArrowRight, Tag, Share2 } from 'lucide-react';
import api from '../../services/api';

export default function BlogSingle() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/blogs/${slug}`).then(r=>{
      const b = r.data?.blog || r.data;
      setBlog(b);
      if (b?.category) {
        api.get(`/blogs?category=${b.category}&limit=3&status=published`).then(r2=>{
          setRelated((r2.data?.blogs||r2.data||[]).filter(x=>x._id!==b._id).slice(0,2));
        }).catch(()=>{});
      }
    }).catch(()=>setBlog(null)).finally(()=>setLoading(false));
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center pt-32">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"/>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center pt-32">
      <h1 className="text-4xl font-black gradient-text mb-4">Post Not Found</h1>
      <Link to="/blog" className="btn-primary">Back to Blog</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle || blog.title} | LACSO HUB Blog</title>
        <meta name="description" content={blog.metaDesc || blog.excerpt}/>
      </Helmet>
      <div className="min-h-screen bg-dark">
        {/* Hero */}
        <div className="relative pt-40 pb-16 px-6 hero-grid overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10" style={{background:'radial-gradient(circle,#6366f1 0%,transparent 70%)',filter:'blur(80px)'}}/>
          <div className="max-w-4xl mx-auto relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16}/> Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">{blog.category}</span>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Calendar size={13}/> {new Date(blog.publishedAt||blog.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">{blog.title}</h1>
            {blog.excerpt&&<p className="text-xl text-white/60 leading-relaxed mb-6">{blog.excerpt}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {(blog.author||'A').charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{blog.author}</div>
                  <div className="text-white/40 text-xs">LACSO HUB</div>
                </div>
              </div>
              <div className="flex gap-3">
                <a href={`https://wa.me/?text=${encodeURIComponent(blog.title+' '+shareUrl)}`} target="_blank" rel="noreferrer"
                  className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"><Share2 size={16}/></a>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose-custom bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12"
            dangerouslySetInnerHTML={{__html: blog.content || '<p>Content coming soon.</p>'}}
            style={{color:'rgba(255,255,255,0.7)',lineHeight:1.8,fontSize:'1.05rem'}}
          />

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {blog.tags.map(t=>(
                <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
                  <Tag size={11}/>{t}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 glass-card border-indigo-500/30 text-center">
            <h3 className="text-2xl font-black mb-3">Ready to Implement This?</h3>
            <p className="text-white/60 mb-6">Let our team build and execute the strategy for your business.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">Start Your Project <ArrowRight size={16}/></Link>
              <a href="https://wa.me/918866371807" target="_blank" rel="noreferrer" className="btn-outline">Chat Now</a>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-black mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map(b=>(
                  <Link key={b._id} to={`/blog/${b.slug}`} className="glass-card group block">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs mb-3 inline-block">{b.category}</span>
                    <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">{b.title}</h4>
                    <p className="text-white/50 text-sm">{b.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
