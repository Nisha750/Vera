import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 800);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-2">Client Concierge</p>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-3">
            HAVE A QUESTION?
          </h1>
          <p className="text-sm text-neutral-400 font-light">
            Our atelier concierge team and founder are here to assist with sizing consultations, custom inquiries, and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Brand Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-950 border border-white/10 p-8 space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-mega-wide text-neutral-400 mb-1">Founder / Creator</p>
                <h3 className="text-2xl font-serif text-white">Nisha H</h3>
                <p className="text-xs text-neutral-400 mt-1">Creative Director & Platform Founder</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Direct Inquiry</span>
                    <a href="mailto:nisha240106@gmail.com" className="text-white hover:underline">
                      nisha240106@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Client Phone Line</span>
                    <a href="tel:7019875647" className="text-white hover:underline">
                      +91 7019875647
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Design Studio</span>
                    <span>Indiranagar Atelier, Bengaluru, India</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-400">
                <span className="text-white font-medium block mb-0.5">Concierge Hours</span>
                Monday – Saturday: 10:00 AM – 7:00 PM IST
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-neutral-950 border border-white/10 p-8 shadow-2xl space-y-6">
              <h2 className="text-2xl font-serif text-white">SEND A MESSAGE</h2>

              {isSubmitted && (
                <div className="p-4 bg-white/10 border border-emerald-400/40 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Your message has been dispatched to Nisha H. We typically respond within 12 hours.</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                    placeholder="name@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white"
                    placeholder="Styling advice, bespoke order, or general question"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white resize-none"
                    placeholder="How may we assist you?"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-vera w-full py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
