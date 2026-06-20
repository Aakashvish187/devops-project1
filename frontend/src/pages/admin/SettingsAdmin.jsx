import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Save, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function SettingsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get('/settings').then(r=>{
      if (r.data?.settings) reset(r.data.settings);
      else if (r.data) reset(r.data);
    }).catch(e=>{
      toast.error('Failed to load settings');
    }).finally(()=>setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await api.put('/settings', data);
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse flex items-center justify-center h-64 text-white/50">Loading settings...</div>;

  return (
    <>
      <Helmet><title>Settings | LACSO HUB Admin</title></Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Site Settings</h1>
        <p className="text-white/50">Manage global website configuration</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General Info */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Settings size={20}/> General Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/50 text-sm mb-2">Site Name</label>
              <input {...register('site_name')} className="input-field" placeholder="LACSO HUB"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">Tagline</label>
              <input {...register('tagline')} className="input-field" placeholder="AI-Powered Digital Growth Ecosystem"/>
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/50 text-sm mb-2">Short Description / Footer Bio</label>
              <textarea {...register('description')} rows={3} className="input-field resize-none" placeholder="We architect intelligent websites..."/>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Contact Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/50 text-sm mb-2">Email Address</label>
              <input {...register('email')} type="email" className="input-field" placeholder="lacsohub@gmail.com"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">Phone Number</label>
              <input {...register('phone')} className="input-field" placeholder="+91 88663 71807"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">WhatsApp Number</label>
              <input {...register('whatsapp')} className="input-field" placeholder="+918866371807"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">Physical Address</label>
              <input {...register('address')} className="input-field" placeholder="Ahmedabad, Gujarat, India"/>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/50 text-sm mb-2">Instagram URL</label>
              <input {...register('socialLinks.instagram')} className="input-field" placeholder="https://instagram.com/lacsohub"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">Twitter / X URL</label>
              <input {...register('socialLinks.twitter')} className="input-field" placeholder="https://twitter.com/lacsohub"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">LinkedIn URL</label>
              <input {...register('socialLinks.linkedin')} className="input-field" placeholder="https://linkedin.com/company/lacsohub"/>
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-2">YouTube URL</label>
              <input {...register('socialLinks.youtube')} className="input-field" placeholder="https://youtube.com/@lacsohub"/>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Global SEO Meta</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-white/50 text-sm mb-2">Default Meta Title</label>
              <input {...register('metaTitle')} className="input-field" placeholder="LACSO HUB | AI-Powered Digital Agency"/>
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/50 text-sm mb-2">Default Meta Description</label>
              <textarea {...register('metaDescription')} rows={3} className="input-field resize-none"/>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 px-8">
            <Save size={18}/> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </>
  );
}
