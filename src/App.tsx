/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export default function App() {
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const WHATSAPP_NUMBER = "2347033570538"; 
    const message = `Hi, my greatest struggle is ${challenge}\n\nMy email address is: ${email}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab immediately to bypass popup blockers (must be synchronous with click)
    const newWindow = window.open(whatsappUrl, '_blank');

    try {
      await addDoc(collection(db, 'leads'), {
        email,
        challenge,
        createdAt: serverTimestamp()
      });
      
      setSubmitted(true);
      // In case popup blocker blocked the above, they will see the manual redirect button
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10">
        
        {/* Header Section */}
        <div className="px-6 py-10 text-center sm:px-12 border-b border-white/5">
          <h2 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-orange-500">Attention Nigerian Affiliate Marketers</h2>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-[1.1] sm:leading-[0.9]">
            How Affiliate Marketers Can Convert Leads Into Buyers <br className="hidden sm:block" /> <span className="text-orange-500">Completely On Autopilot...</span>
          </h1>
          <p className="text-xl font-medium text-white/70 italic max-w-2xl mx-auto leading-relaxed">
            Without posting every day, explaining your product over and over, or chasing the same people repeatedly!
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-10">
          {!submitted ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               
               {/* Left Column: Letter / Context */}
               <div className="md:border-r md:border-white/10 md:pr-10">
                 <p className="text-lg mb-4 text-white leading-relaxed font-bold">
                   Dear friend, I know your time is valuable, so I'll get right to the point.
                 </p>
                 <p className="text-white/70 mb-4 leading-relaxed">
                   I need your feedback. I'm putting the finishing touches on a massive new resource called <strong className="text-white font-semibold">The Silent Salesman Pages</strong>. It contains 90+ done-for-you Elementor bridge pages that are already written, designed, and set up to help you automatically presell your affiliate offers.
                 </p>
                 <p className="text-white/70 mb-6 leading-relaxed bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                   I want to make sure I don't leave anything out, so will you let me know: <strong className="text-orange-400">what is your #1 biggest challenge in Affiliate Marketing?</strong>
                 </p>
                 
                 <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                   <h3 className="font-bold text-white mb-4">In exchange for your feedback, you'll get:</h3>
                   <ul className="space-y-3 text-sm text-white/80">
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span><strong className="text-white">FREE Early Access</strong> to The Silent Salesman Pages (Value ₦5,000)</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>The Perfect Lead Magnet by Dan Henry</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>10 Proven Sales Copy Templates</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>Done-For-You Website Design</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>A Guide on How to Build a Bridge Page You Can Use to Get Customers to Give You Money 💰 Using AI</span>
                     </li>
                   </ul>
                 </div>
               </div>

               {/* Right Column: Form */}
               <div className="flex flex-col justify-center relative">
                 <div className="absolute top-[-24px] right-[-24px] p-4 hidden md:block">
                   <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-1 uppercase rounded-sm">Free Access</span>
                 </div>

                 <div className="text-center mb-8">
                   <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4 border border-white/10">
                     <HelpCircle className="w-8 h-8 text-orange-500" />
                   </div>
                   <h3 className="text-2xl font-bold text-white tracking-tight">What's your #1 affiliate challenge?</h3>
                   <p className="text-sm text-white/50 mt-2">Tell us below to claim your free access.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                   {error && (
                     <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                       {error}
                     </div>
                   )}
                   <div>
                     <label htmlFor="challenge" className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">
                       Your #1 Biggest Challenge in Affiliate Marketing:
                     </label>
                     <textarea
                       id="challenge"
                       name="challenge"
                       rows={4}
                       required
                       value={challenge}
                       onChange={(e) => setChallenge(e.target.value)}
                       className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none text-white placeholder-white/30"
                       placeholder="I struggle with..."
                     />
                   </div>

                   <div>
                     <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">
                       Where should we send your free access?
                     </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-white/30"
                       placeholder="Enter your best email address"
                     />
                   </div>

                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-6 rounded-lg transition-all flex justify-center items-center group disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? 'SUBMITTING...' : 'GET INSTANT ACCESS'}
                     {!isSubmitting && <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                   </button>
                   <p className="text-[10px] text-center text-white/30 uppercase tracking-tighter mt-4 leading-relaxed max-w-xs mx-auto">
                     Your information is 100% secure. We will email you your access link shortly.
                   </p>
                 </form>
               </div>
             </div>
          ) : (
             <div className="text-center py-16 px-6">
                <div className="inline-flex items-center justify-center p-5 bg-white/5 rounded-full mb-6 border border-white/10">
                  <CheckCircle2 className="w-16 h-16 text-orange-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Redirecting to WhatsApp...</h2>
                <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                  We are opening WhatsApp so you can send us your challenge and claim your bonuses.
                </p>
                <a
                  href={`https://wa.me/2347033570538?text=${encodeURIComponent(`Hi, my greatest struggle is ${challenge}\n\nMy email address is: ${email}`)}`}
                  className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-lg transition-all"
                >
                  Click Here if not redirected
                </a>
             </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 z-10 w-full max-w-4xl px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-widest bg-black/40 rounded-xl backdrop-blur-md">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 mb-4 sm:mb-0">
          <span>&copy; {new Date().getFullYear()} The Silent Salesman</span>
          <span>Elementor Ready</span>
          <span>Copywriting Included</span>
        </div>
        <div className="font-mono text-white/20">
          // ID: SSP-PREVIEW-2024
        </div>
      </div>
    </div>
  );
}
