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
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      {/* Logo Area */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
          <img src="https://i.ibb.co/TMB5Fqq6/pz75w9.jpg" alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-yellow-500 tracking-widest uppercase text-xs">Emmanuel Ifenna</span>
          <span className="text-white/70 italic text-[10px]">Naval Azure</span>
        </div>
      </div>

      <div className="max-w-4xl w-full bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10 mt-12 sm:mt-8">
        
        {/* Header Section */}
        <div className="px-6 py-10 text-center sm:px-12 border-b border-white/5">
          <h2 className="text-[10px] font-bold tracking-widest uppercase mb-4 text-yellow-500">Attention Nigerian Affiliate Marketers</h2>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-[1.1] sm:leading-[0.9]">
            How Affiliate Marketers Can Convert Leads Into Buyers <br className="hidden sm:block" /> <span className="text-yellow-500">Completely On Autopilot...</span>
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
                 <p className="text-base text-white/90 mb-4 leading-relaxed">
                   I'm putting together 90+ done-for-you bridge pages that will help Nigerian affiliate marketers convert leads into buyers on complete autopilot. Before I release it — I want to make sure it solves your exact problem. Answer one quick question below and get free early access.
                 </p>
                 <p className="text-base text-white/80 font-medium mb-6 leading-relaxed bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                   I want to make sure I don't leave anything out, so will you let me know: <strong className="text-yellow-500">What is the ONE thing stopping you from making consistent sales with your affiliate links right now?</strong>
                 </p>
                 
                 <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                   <h3 className="font-bold text-white mb-4">In exchange for your feedback, you'll get:</h3>
                   <ul className="space-y-3 text-base text-white/80">
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span><strong className="text-white">FREE Early Access</strong> to The Silent Salesman Pages (Value ₦5,000)</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>The Perfect Lead Magnet by Dan Henry</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>10 Proven Sales Copy Templates</span>
                     </li>
                     <li className="flex items-start">
                       <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                       <span>Done-For-You Website Design</span>
                     </li>
                   </ul>
                 </div>
               </div>

               {/* Right Column: Form */}
               <div className="flex flex-col justify-center relative">
                 <div className="absolute top-[-24px] right-[-24px] p-4 hidden md:block">
                   <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 uppercase rounded-sm z-10 relative">Free Access</span>
                 </div>

                 <div className="text-center mb-8">
                   <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4 border border-white/10">
                     <HelpCircle className="w-8 h-8 text-yellow-500" />
                   </div>
                   <h3 className="text-2xl font-bold text-white tracking-tight">What's your #1 affiliate challenge?</h3>
                   <p className="text-base text-white/50 mt-2">Tell us below to claim your free access.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                   {error && (
                     <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                       {error}
                     </div>
                   )}
                   <div>
                     <textarea
                       id="challenge"
                       name="challenge"
                       rows={4}
                       required
                       value={challenge}
                       onChange={(e) => setChallenge(e.target.value)}
                       className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-yellow-500 transition-colors resize-none text-white placeholder-white/30"
                       placeholder="Be honest. Type your answer here..."
                     />
                   </div>

                   <div>
                     <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">
                       Your email address
                     </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-yellow-500 transition-colors text-white placeholder-white/30"
                       placeholder="Enter your best email address"
                     />
                   </div>

                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-lg transition-all flex justify-center items-center group disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? 'SUBMITTING...' : 'Send My Answer & Get Free Access →'}
                   </button>
                   <p className="text-[10px] text-center text-white/40 uppercase tracking-tighter mt-4 leading-relaxed max-w-xs mx-auto font-medium">
                     100% secure. We will email your free access shortly.
                   </p>
                 </form>
               </div>
             </div>
          ) : (
             <div className="text-center py-16 px-6">
                <div className="inline-flex items-center justify-center p-5 bg-white/5 rounded-full mb-6 border border-white/10">
                  <CheckCircle2 className="w-16 h-16 text-yellow-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Redirecting to WhatsApp...</h2>
                <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                  We are opening WhatsApp so you can send us your challenge and claim your bonuses.
                </p>
                <a
                  href={`https://wa.me/2347033570538?text=${encodeURIComponent(`Hi, my greatest struggle is ${challenge}\n\nMy email address is: ${email}`)}`}
                  className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg transition-all"
                >
                  Click Here if not redirected
                </a>
             </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 z-10 w-full max-w-4xl px-6 py-6 border-t border-white/5 flex flex-col justify-center items-center text-[10px] text-white/40 uppercase tracking-widest bg-slate-800/40 rounded-xl backdrop-blur-md">
        <div className="flex flex-wrap justify-center mb-2">
          <span>&copy; {new Date().getFullYear()} The Silent Salesman</span>
        </div>
        <div className="text-yellow-500/70 font-bold mt-2">
          Free access available for a limited time only
        </div>
      </div>
    </div>
  );
}
