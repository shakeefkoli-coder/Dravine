import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';
import { useStore } from '../context/StoreContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Order & Sizing Assistance');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitted(true);
    showToast('Your inquiry has been sent to our Dehiwala studio!');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section className="py-16 sm:py-24 bg-black relative border-t border-zinc-900" id="contact">
      
      {/* Background glow */}
      <div 
        className="absolute top-1/2 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
            Connect With Dravine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight">
            Contact Our Dehiwala Studio
          </h2>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Have questions about custom sizing, store visits, wholesale, or our island-wide Sri Lanka delivery? Our concierge team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card with Clickable Tel Link */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Direct Hotline</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">Telephone Inquiry</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Call our studio directly for instant sizing advice and stock checks:
                  </p>
                  <a
                    href={`tel:${BRAND_CONTACT.phone}`}
                    className="inline-flex items-center gap-2 mt-2 text-base font-bold text-orange-400 hover:text-orange-300 font-mono tracking-wide underline decoration-orange-500/50"
                  >
                    <span>{BRAND_CONTACT.phoneFormatted}</span>
                    <span className="text-xs font-normal text-zinc-400">(Click to Call)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-emerald-500/50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Instant Chat</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">WhatsApp Concierge</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Fast responses for size confirmations and dispatch tracking:
                  </p>
                  <a
                    href={BRAND_CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Chat on WhatsApp (+94 71 895 7517)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Address */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Studio & Boutique</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">Dehiwala, Sri Lanka</h3>
                  <p className="text-xs text-zinc-300 mt-1 font-mono">
                    {BRAND_CONTACT.address}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>Mon - Sat: {BRAND_CONTACT.hours.weekdays} | Sun: {BRAND_CONTACT.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Social Channels</div>
                <div className="text-sm font-bold text-white mt-0.5">Follow @dravinefootwear</div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND_CONTACT.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-orange-400 hover:border-orange-500 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={BRAND_CONTACT.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-orange-400 hover:border-orange-500 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={BRAND_CONTACT.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-orange-400 hover:border-orange-500 transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Google Maps & Inquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Google Maps Location for Dehiwala, Sri Lanka */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold">Dravine Boutique Location</span>
                  <span className="text-zinc-500">· Dehiwala, Western Province, Sri Lanka</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Dehiwala,Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Map Iframe for Dehiwala, Sri Lanka */}
              <div className="w-full h-64 sm:h-72 relative bg-zinc-900">
                <iframe
                  title="Dravine Footwear Dehiwala Sri Lanka Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.757805128791!2d79.8631168481488!3d6.840251703664797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a4789d20c5d%3A0xb0080fb87b7a4c7f!2sDehiwala-Mount%20Lavinia%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Customer Inquiry Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-display">
                  Send Customer Inquiry
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We reply within 1-2 hours during studio business hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-zinc-900 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                    Thank you for reaching out to Dravine. Our customer team in Dehiwala will contact you via phone or WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kasun Fernando"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="071 895 7517"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kasun@example.com"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Inquiry Topic</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="Order & Sizing Assistance">Order & Sizing Assistance</option>
                        <option value="Store Visit & Appointment">Dehiwala Studio Visit</option>
                        <option value="Island-Wide Delivery Status">Delivery & Tracking</option>
                        <option value="Bespoke Cordwainery">Bespoke Handcrafted Orders</option>
                        <option value="Wholesale & Corporate">Corporate / Wholesale</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe the footwear models you are interested in, sizing requirements, or your delivery address..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-black text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Dehiwala Studio</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
