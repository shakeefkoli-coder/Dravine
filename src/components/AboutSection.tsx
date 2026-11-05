import React from 'react';
import { ShieldCheck, Sparkles, Hammer, MapPin, Award, CheckCircle } from 'lucide-react';
import { CRAFT_WORKSHOP_IMG, BRAND_CONTACT } from '../data/products';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-black relative border-t border-zinc-900">
      
      {/* Glow highlight */}
      <div 
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Kicker */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
            The Dravine Atelier · Heritage & Innovation
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Born in Dehiwala. <br />
            Crafted for the World Stage.
          </h2>
          <p className="text-base text-zinc-300 mt-4 leading-relaxed font-light">
            Dravine was established with a singular obsession: to construct footwear that harmonizes traditional artisanal shoemaking with cutting-edge athletic engineering. From our workshop on Galle Road in Dehiwala, every pair represents hundreds of hours of precision design, foot biomechanics testing, and uncompromising leather selection.
          </p>
        </div>

        {/* Master Craftsmanship Visual & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Craft Workshop Image */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
              <img
                src={CRAFT_WORKSHOP_IMG}
                alt="Master shoemaker at work in Dravine Dehiwala workshop"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white font-display">The Dehiwala Atelier Bench</div>
                  <div className="text-zinc-400 font-mono text-[11px]">Hand-welted and inspected in Western Province, Sri Lanka</div>
                </div>
                <div className="text-orange-400 font-mono font-bold text-xs">
                  Est. Dehiwala
                </div>
              </div>
            </div>

            {/* Ambient orange glow below image */}
            <div 
              className="absolute -bottom-6 -left-6 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" 
              aria-hidden="true" 
            />
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Hammer className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Handcrafted Precision</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We reject mass-produced plastic shortcuts. Our formal dress oxfords, brogues, and boots utilize Goodyear welting, hand-burnished crust calfskins, and natural cork beds that mold naturally to your feet over time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Carbon & High-Rebound Foam</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our athletic runners and street sneakers combine 3K curved carbon composite shanks with nitrogen-infused PEBA cushioning—yielding extraordinary energy return with every step you take.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Crafted for Sri Lanka's Climate</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Breathable monofilament meshes, genuine moisture-absorbing leather linings, and tropical slip-resistant compounds ensure comfort in Colombo humidity and monsoon downpours alike.
              </p>
            </div>

          </div>

        </div>

        {/* Studio Location & Visit Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
              Visit The Flagship Store
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              Experience the Craft in Person in Dehiwala
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              Drop by our boutique on Galle Road for custom fitting sessions, bespoke leather consultations, or to test our high-performance running silhouettes on our private indoor track.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold rounded-xl uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/20"
            >
              Get Studio Directions
            </button>
            <a
              href={`tel:${BRAND_CONTACT.phone}`}
              className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl uppercase tracking-wider border border-zinc-700 transition-colors"
            >
              Call {BRAND_CONTACT.phoneFormatted}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
