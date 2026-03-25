'use client';

import React, { useState, useEffect, useRef } from 'react';

type MessageType = 'text' | 'website_card' | 'ad_card' | 'delivery_card' | 'crm_card';

interface Message {
  sender: 'bot' | 'user';
  type: MessageType;
  text: string;
}

export default function BizRocketHybridDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', type: 'text', text: 'Namaste! Main aapka AI business manager hoon. Main aapke transactions aur footfall ko analyze karke aapki sales badhane mein madad karunga. 🚀' },
    { sender: 'bot', type: 'text', text: 'Bataiye, aaj main aapke dhandhe ke liye kya kar sakta hoon?' }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [activeFlow, setActiveFlow] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, flowStep]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- STEP 1: The Hook & The Choice ---
  const handleInitialPrompt = async (flow: string, userText: string) => {
    setActiveFlow(flow);
    setFlowStep(1);
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userText }]);
    
    setIsTyping(true);
    await sleep(1500);
    setIsTyping(false);

    if (flow === 'website') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapka order history dekh ke lag raha hai offline sales badhiya hai, par aajkal log Google pe search karke aate hain. Ek website zaroori hai.' }]);
      setIsTyping(true);
      await sleep(1200);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Main aapke Paytm catalog se 2 minute me store bana dunga. Website ka naam .com rakhna hai ya .in?' }]);
    } 
    else if (flow === 'ads') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapke dukaan me usually 500 log roz aate hain, par is area me baaki dukaano me 900. Aapko geographical ad chalana chahiye.' }]);
      setIsTyping(true);
      await sleep(1200);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Kya budget theek rahega? ₹500/day ya ₹1500/day?' }]);
    } 
    else if (flow === 'ordering') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Sahi pakda. Aapke area me log Instamart/Zepto se roz 5 guna zyada order karte hain. Hum aapka khud ka 30-min delivery system bana sakte hain isse beat karne ke liye.' }]);
      setIsTyping(true);
      await sleep(1200);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapke orders deliver karne ke liye main Porter integrate karun ya Dunzo?' }]);
    } 
    else if (flow === 'crm') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Data analyse karke samajh aata hai ki aapke customers har 15 din me aapke dukaan aate hain. Inko har 10 din me bulana chahiye.' }]);
      setIsTyping(true);
      await sleep(1200);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aaj aise 300 customers hain jo aa sakte hain. Main unhe WhatsApp message bhej raha hoon. Unhe 10% discount dena hai ya Flat ₹50 off?' }]);
    }
  };

  // --- STEP 2: The ROI & The Close ---
  const handleFlowStep = async (userReply: string) => {
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userReply }]);
    setFlowStep(2); // Hide buttons
    setIsTyping(true);
    await sleep(1500);
    setIsTyping(false);

    if (activeFlow === 'website') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Perfect! Ye raha aapka sample website. Isse aapke online orders aana shuru ho jayenge. Bas ₹10,000/year pay karein aur site live karein.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'website_card', text: '' }]);
    }
    else if (activeFlow === 'ads') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Sahi decision. Daily kharcha karne par aapke dukaan me extra 400 log aayenge. Ye raha aapka ad image. Approve aur pay kijiye, main ad live kar dunga.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'ad_card', text: '' }]);
    }
    else if (activeFlow === 'ordering') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Setup done! Is service se aap har month ₹3 Lakh extra kama sakte hain. Ye raha order karne ka QR code. Bas ₹3000 setup fee pay karein, aur aapka store delivery ke liye ready hai.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'delivery_card', text: '' }]);
    }
    else if (activeFlow === 'crm') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Great. Isse aapka sales 2x ho sakta hai. Bas ₹300 ka recharge kariye aur main broadcast bhej dunga.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'crm_card', text: '' }]);
      
      // Post-payment simulation for CRM
      setIsTyping(true);
      await sleep(2500);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Message sent ✅\n\nIsme se 30 log aapke shop aakar aaj ₹18,000 extra business de chuke hain.' }]);
    }
  };

  const resetDemo = () => {
    setActiveFlow(null);
    setFlowStep(0);
    setMessages([
      { sender: 'bot', type: 'text', text: 'Namaste! Main aapka AI business manager hoon. Main aapke transactions aur footfall ko analyze karke aapki sales badhane mein madad karunga. 🚀' },
      { sender: 'bot', type: 'text', text: 'Bataiye, aaj main aapke dhandhe ke liye kya kar sakta hoon?' }
    ]);
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen font-sans sm:p-4">
      <div className="w-full max-w-[400px] bg-[#f5f7fa] h-full sm:h-[850px] sm:rounded-[40px] flex flex-col relative shadow-2xl overflow-hidden border-4 border-gray-800">
        
        {/* Native Header */}
        <header className="bg-[#002970] text-white pt-12 pb-4 px-5 flex flex-col z-10">
          <div className="flex items-center gap-3">
            <svg onClick={resetDemo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-[#002970] font-black text-[11px] tracking-tight ml-0.5">Pay</span>
              <span className="text-[#00baf2] font-black text-[11px] tracking-tight">tm</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] font-bold leading-tight tracking-wide">Biz Rocket</h1>
                <span className="bg-[#00baf2] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-wider uppercase">Beta</span>
              </div>
              <p className="text-[9px] text-blue-200 mt-0.5 font-semibold tracking-widest uppercase opacity-90">Powered by Cheerio AI</p>
            </div>
            <svg onClick={resetDemo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity">
               <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 no-scrollbar pb-32">
          <div className="text-center text-[12px] text-gray-400 font-medium mb-1">Today</div>
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.type === 'text' && (
                <div className={`max-w-[85%] px-4 py-3 text-[14.5px] shadow-sm leading-relaxed tracking-wide whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-[#00baf2] text-white rounded-[22px] rounded-tr-[4px]'
                    : 'bg-white text-gray-800 rounded-[22px] rounded-tl-[4px] border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              )}

              {/* Execution Cards */}
              {msg.type === 'website_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#f0f9ff] p-3.5 border-b border-blue-50"><p className="text-[#002970] text-[14px] font-bold flex items-center gap-2">🌐 Your Store is Ready!</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-300 text-[13px] border border-dashed border-blue-200 font-medium">[Sample Website Image]</div>
                    <button className="w-full bg-[#002970] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">Pay ₹10k & Make Live</button>
                  </div>
                </div>
              )}
              {msg.type === 'ad_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fdf4ff] p-3.5 border-b border-purple-50"><p className="text-purple-800 text-[14px] font-bold flex items-center gap-2">📢 Local Ad Campaign</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-purple-50/50 rounded-xl flex items-center justify-center text-purple-300 text-[13px] border border-dashed border-purple-200 font-medium">[Ad Image / Creative]</div>
                    <button className="w-full bg-purple-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-purple-800 transition-colors shadow-sm">Pay & Run Ad</button>
                  </div>
                </div>
              )}
              {msg.type === 'delivery_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#ecfdf5] p-3.5 border-b border-green-50"><p className="text-green-800 text-[14px] font-bold flex items-center gap-2">🛵 Online Ordering</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-green-50/50 rounded-xl flex items-center justify-center text-green-300 text-[13px] border border-dashed border-green-200 font-medium">[QR Code for Customers]</div>
                    <p className="text-[12px] text-gray-500 text-center font-medium">Ab aapka store online order aur delivery ke liye ready hai.</p>
                    <button className="w-full bg-green-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors shadow-sm">Pay ₹3000 (Setup)</button>
                  </div>
                </div>
              )}
              {msg.type === 'crm_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fffbeb] p-3.5 border-b border-yellow-50"><p className="text-yellow-800 text-[14px] font-bold flex items-center gap-2">💬 WhatsApp CRM</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <button className="w-full bg-[#25D366] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-500 transition-colors shadow-sm">Pay ₹300 (Recharge)</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white px-5 py-4 rounded-[22px] rounded-tl-[4px] shadow-sm border border-gray-100 flex gap-1.5 items-center">
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* DYNAMIC BOTTOM INTERFACE */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#f5f7fa] border-t border-gray-200 px-4 pt-3 pb-6 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
          
          {/* STATE 0: Initial Prompts */}
          {flowStep === 0 && !isTyping && (
            <div className="flex flex-col gap-2">
              <button onClick={() => handleInitialPrompt('website', 'Mere business badhane me help karo Paytm')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-blue-300">Mere business badhane me help karo Paytm</button>
              <button onClick={() => handleInitialPrompt('ads', 'Roz store me customers kaise badhau?')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-purple-300">Roz store me customers kaise badhau?</button>
              <button onClick={() => handleInitialPrompt('ordering', 'Instamart aur Blinkit mere customers le jaa rahe hain, kya karu?')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-green-300">Instamart aur Blinkit mere customers le jaa rahe hain, kya karu?</button>
              <button onClick={() => handleInitialPrompt('crm', 'Customer ka repeat kaise badhau?')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-yellow-400">Customer ka repeat kaise badhau?</button>
            </div>
          )}

          {/* STATE 1: Dynamic Micro-Commitment Choices */}
          {!isTyping && activeFlow === 'website' && flowStep === 1 && (
            <div className="flex gap-2">
              <button onClick={() => handleFlowStep('.com rakh lo')} className="flex-1 bg-white border border-blue-400 text-blue-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">.com rakh lo</button>
              <button onClick={() => handleFlowStep('.in theek hai')} className="flex-1 bg-white border border-blue-400 text-blue-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">.in theek hai</button>
            </div>
          )}
          {!isTyping && activeFlow === 'ads' && flowStep === 1 && (
             <div className="flex gap-2">
               <button onClick={() => handleFlowStep('₹500/day')} className="flex-1 bg-white border border-purple-400 text-purple-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">₹500/day</button>
               <button onClick={() => handleFlowStep('1500 wala try karte hain')} className="flex-1 bg-white border border-purple-400 text-purple-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">1500 wala try karte hain</button>
             </div>
          )}
          {!isTyping && activeFlow === 'ordering' && flowStep === 1 && (
             <div className="flex gap-2">
               <button onClick={() => handleFlowStep('Porter theek hai')} className="flex-1 bg-white border border-green-400 text-green-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Porter theek hai</button>
               <button onClick={() => handleFlowStep('Dunzo kardo')} className="flex-1 bg-white border border-green-400 text-green-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Dunzo kardo</button>
             </div>
          )}
          {!isTyping && activeFlow === 'crm' && flowStep === 1 && (
             <div className="flex gap-2">
               <button onClick={() => handleFlowStep('10% discount')} className="flex-1 bg-white border border-yellow-400 text-yellow-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">10% discount</button>
               <button onClick={() => handleFlowStep('Flat ₹50 off')} className="flex-1 bg-white border border-yellow-400 text-yellow-700 text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Flat ₹50 off</button>
             </div>
          )}
          
          {/* Static Input Field when options are active */}
          {(flowStep > 0 || isTyping) && (
            <div className="mt-2 w-full relative">
               <input disabled type="text" className="w-full bg-white border border-gray-200 text-[14.5px] rounded-full pl-5 pr-12 py-3 outline-none shadow-sm placeholder-gray-400 opacity-60 cursor-not-allowed" placeholder={isTyping ? "Typing..." : "Awaiting approval..."} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}