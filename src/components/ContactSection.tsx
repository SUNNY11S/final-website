import React from 'react';
import { Phone, MessageCircle, Facebook, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-22 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
            We Are Here To Help
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight text-balance">
            Get In Touch &amp; Order Directly
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Prefer ordering directly via phone call, WhatsApp, or Facebook Messenger? Reach our friendly team anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 1: Phone Hotline */}
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200/90 flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Phone Call Hotline</h3>
                <p className="text-xs text-stone-500 mt-1">Direct support &amp; order confirmation</p>
              </div>
              <p className="text-3xl font-black text-stone-950 tracking-tight tabular-nums">
                01914669550
              </p>
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>9:00 AM – 11:00 PM (Everyday)</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200">
              <a
                href="tel:01914669550"
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call 01914669550</span>
              </a>
            </div>
          </div>

          {/* 2: WhatsApp */}
          <div className="bg-emerald-50/80 p-8 rounded-3xl border border-emerald-300 flex flex-col justify-between hover:border-emerald-500 transition-all relative overflow-hidden shadow-sm">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-1 rounded-md">
                Fastest Response
              </span>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-950">WhatsApp Order</h3>
                <p className="text-xs text-emerald-800/80 mt-1">Instant photo sharing &amp; queries</p>
              </div>
              <p className="text-3xl font-black text-emerald-950 tracking-tight tabular-nums">
                01914669550
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Quick reply within 5 minutes</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-emerald-200">
              <a
                href="https://wa.me/8801914669550?text=Hello%20Green%20Page%20BD,%20I%20would%20like%20to%20order%20indoor%20plants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3: Facebook Page */}
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200/90 flex flex-col justify-between hover:border-blue-300 transition-all">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#1877F2] flex items-center justify-center">
                <Facebook className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">Facebook Page</h3>
                <p className="text-xs text-stone-500 mt-1">Follow updates, plant photos &amp; reviews</p>
              </div>
              <p className="text-lg font-bold text-stone-900">
                Green Page BD Official
              </p>
              <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200">
              <a
                href="https://www.facebook.com/share/1HvCMUe39B/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                <span>Visit Facebook Page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
