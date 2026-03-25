'use client';

import React, { useState, useEffect, useRef } from 'react';

type MessageType = 'text' | 'website_card' | 'ad_card' | 'delivery_card' | 'crm_card';

interface Message {
  sender: 'bot' | 'user';
  type: MessageType;
  text: string;
}

export default function BizRocketMultiStepDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      type: 'text',
      text: 'Namaste! Main aapka AI business manager hoon. Main aapke transactions aur footfall ko analyze karke aapki sales badhane mein madad karunga. 🚀',
    },
    {
      sender: 'bot',
      type: 'text',
      text: 'Bataiye, aaj main aapke dhandhe ke liye kya kar sakta hoon?',
    }
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

  // --- STEP 1: Initial Prompt Selection ---
  const handleInitialPrompt = async (flow: string, userText: string) => {
    setActiveFlow(flow);
    setFlowStep(1);
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userText }]);
    setIsTyping(true);
    await sleep(1500);
    setIsTyping(false);

    if (flow === 'website') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Zaroor, main aapki website bana deta hoon. Par pehle ye bataiye, products kaise add karein?' }]);
    } else if (flow === 'crm') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapki order history dekh ke lag raha hai aapke customers har 15 days me aapke paas wapas aate hai. Kya isko 10 days target karna hai?' }]);
    } else if (flow === 'ordering') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Sahi baat hai. Hum aapka khud ka 30-min delivery system bana sakte hain. Delivery partner kaunsa chahiye?' }]);
    } else if (flow === 'ads') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Pichle hafte aas-paas ke area me footfall zyada tha par aapke store pe kam. Ads ke liye daily budget kitna rakhna hai?' }]);
    }
  };

  // --- STEP 2 & 3: Handling the middle conversations ---
  const handleFlowStep = async (userReply: string) => {
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userReply }]);
    setIsTyping(true);
    await sleep(1200);
    setIsTyping(false);

    // WEBSITE FLOW LOGIC
    if (activeFlow === 'website') {
      if (flowStep === 1) {
        setFlowStep(2);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Perfect. Aur domain name kaisa chahiye aapko?' }]);
      } else if (flowStep === 2) {
        setFlowStep(3); // Trigger Card
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Done. Main details fetch karke store live kar raha hoon. 1 minute rukiye...' }]);
        setIsTyping(true);
        await sleep(2000);
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'website_card', text: '' }]);
      }
    }

    // CRM FLOW LOGIC
    else if (activeFlow === 'crm') {
      if (flowStep === 1) {
        setFlowStep(2);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Great. 10 din me wapas bulane ke liye unhe ek chhota offer dete hain. Kya discount dena theek rahega?' }]);
      } else if (flowStep === 2) {
        setFlowStep(3); // Trigger Card
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Sahi hai. Main ek WhatsApp broadcast campaign ready kar raha hoon...' }]);
        setIsTyping(true);
        await sleep(2000);
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'crm_card', text: '' }]);
      }
    }

    // ORDERING FLOW LOGIC
    else if (activeFlow === 'ordering') {
      if (flowStep === 1) {
        setFlowStep(2);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Partner set ho gaya. Ab delivery charge kisko dena hai?' }]);
      } else if (flowStep === 2) {
        setFlowStep(3); // Trigger Card
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Setup start ho gaya hai. QR code aur integration link generate ho raha hai...' }]);
        setIsTyping(true);
        await sleep(2000);
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'delivery_card', text: '' }]);
      }
    }

    // ADS FLOW LOGIC
    else if (activeFlow === 'ads') {
      if (flowStep === 1) {
        setFlowStep(2);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Budget set. Kin logo ko target karna hai ads me?' }]);
      } else if (flowStep === 2) {
        setFlowStep(3); // Trigger Card
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Creative generate ho raha hai aur campaign draft ho raha hai. Rukiye...' }]);
        setIsTyping(true);
        await sleep(2000);
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: 'bot', type: 'ad_card', text: '' }]);
      }
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
        
        {/* Header (Same as before) */}
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
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 no-scrollbar pb-32">
          <div className="text-center text-[12px] text-gray-400 font-medium mb-2">Today</div>
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.type === 'text' && (
                <div className={`max-w-[85%] px-4 py-3 text-[14.5px] shadow-sm leading-relaxed tracking-wide ${
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
                    <div className="w-full h-28 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-300 text-[13px] border border-dashed border-blue-200 font-medium">[Auto-Generated Storefront]</div>
                    <button className="w-full bg-[#002970] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">Go Live (₹10k/yr)</button>
                  </div>
                </div>
              )}
              {msg.type === 'ad_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fdf4ff] p-3.5 border-b border-purple-50"><p className="text-purple-800 text-[14px] font-bold flex items-center gap-2">📢 Local Ad Campaign</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-purple-50/50 rounded-xl flex items-center justify-center text-purple-300 text-[13px] border border-dashed border-purple-200 font-medium">[Meta/Google Ad Preview]</div>
                    <button className="w-full bg-purple-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-purple-800 transition-colors shadow-sm">Launch Ad (₹1500/day)</button>
                  </div>
                </div>
              )}
              {msg.type === 'delivery_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#ecfdf5] p-3.5 border-b border-green-50"><p className="text-green-800 text-[14px] font-bold flex items-center gap-2">🛵 Online Ordering</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-green-50/50 rounded-xl flex items-center justify-center text-green-300 text-[13px] border border-dashed border-green-200 font-medium">[QR & Porter Map]</div>
                    <button className="w-full bg-green-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors shadow-sm">Setup Delivery (₹3000)</button>
                  </div>
                </div>
              )}
              {msg.type === 'crm_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fffbeb] p-3.5 border-b border-yellow-50"><p className="text-yellow-800 text-[14px] font-bold flex items-center gap-2">💬 WhatsApp CRM</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full bg-[#f8fafc] p-3 rounded-xl border-l-[4px] border-[#25D366]"><p className="text-[13px] text-gray-700 font-medium leading-relaxed">"Hello! We missed you. Come back this week for 10% off! 🎁"</p></div>
                    <button className="w-full bg-[#25D366] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-500 transition-colors shadow-sm">Send Broadcast (₹300)</button>
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
              <button onClick={() => handleInitialPrompt('website', 'Dhandha online kaise karu?')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-blue-300">Dhandha online kaise karu?</button>
              <button onClick={() => handleInitialPrompt('ads', 'Roz store me customers kaise badhau?')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-purple-300">Roz store me customers kaise badhau?</button>
              <button onClick={() => handleInitialPrompt('ordering', 'Instamart/Blinkit customers le jaa rahe hain')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-green-300">Instamart/Blinkit customers le jaa rahe hain</button>
              <button onClick={() => handleInitialPrompt('crm', 'Customer ka repeat kaise badhau?')} className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium py-3 px-4 rounded-xl text-left shadow-sm hover:border-yellow-400">Customer ka repeat kaise badhau?</button>
            </div>
          )}

          {/* DYNAMIC MULTI-STEP CHOICES */}
          {!isTyping && activeFlow === 'website' && flowStep === 1 && (
            <div className="flex gap-2"><button onClick={() => handleFlowStep('Price list / Catalog upload karein')} className="flex-1 bg-white border border-blue-200 text-blue-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Upload Catalog</button><button onClick={() => handleFlowStep('Product images click karke dalta hu')} className="flex-1 bg-white border border-blue-200 text-blue-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Click Photos</button></div>
          )}
          {!isTyping && activeFlow === 'website' && flowStep === 2 && (
            <div className="flex gap-2"><button onClick={() => handleFlowStep('ApnaStore.in')} className="flex-1 bg-white border border-blue-200 text-blue-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">.in (₹499)</button><button onClick={() => handleFlowStep('ApnaStore.com')} className="flex-1 bg-white border border-blue-200 text-blue-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">.com (₹899)</button></div>
          )}

          {!isTyping && activeFlow === 'crm' && flowStep === 1 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Haan, 10 days target karte hain')} className="flex-1 bg-white border border-yellow-400 text-yellow-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Haan, 10 Days Target</button><button onClick={() => handleFlowStep('Nahi, 12 days theek hai')} className="flex-1 bg-white border border-yellow-400 text-yellow-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">12 Days is fine</button></div>
          )}
          {!isTyping && activeFlow === 'crm' && flowStep === 2 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Flat ₹50 Off')} className="flex-1 bg-white border border-yellow-400 text-yellow-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Flat ₹50 Off</button><button onClick={() => handleFlowStep('10% Discount')} className="flex-1 bg-white border border-yellow-400 text-yellow-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">10% Discount</button></div>
          )}

          {!isTyping && activeFlow === 'ordering' && flowStep === 1 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Porter theek rahega')} className="flex-1 bg-white border border-green-300 text-green-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Porter</button><button onClick={() => handleFlowStep('Dunzo try karte hain')} className="flex-1 bg-white border border-green-300 text-green-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Dunzo</button></div>
          )}
          {!isTyping && activeFlow === 'ordering' && flowStep === 2 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Customer pay karega')} className="flex-1 bg-white border border-green-300 text-green-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Customer Pays</button><button onClick={() => handleFlowStep('Main absorb kar lunga')} className="flex-1 bg-white border border-green-300 text-green-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">I'll Absorb Cost</button></div>
          )}

          {!isTyping && activeFlow === 'ads' && flowStep === 1 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('₹500/day se start karte hain')} className="flex-1 bg-white border border-purple-300 text-purple-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">₹500/day</button><button onClick={() => handleFlowStep('₹1500/day thik hai')} className="flex-1 bg-white border border-purple-300 text-purple-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">₹1500/day</button></div>
          )}
          {!isTyping && activeFlow === 'ads' && flowStep === 2 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('2km me sabko dikhao')} className="flex-1 bg-white border border-purple-300 text-purple-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">2km Radius (All)</button><button onClick={() => handleFlowStep('Sirf naye logo ko dikhao')} className="flex-1 bg-white border border-purple-300 text-purple-700 text-[13px] font-medium py-3 px-2 rounded-xl text-center shadow-sm">Only New Users</button></div>
          )}
          
          {/* Static Input Field when options are active */}
          {(flowStep > 0 || isTyping) && (
            <div className="mt-2 w-full relative">
               <input disabled type="text" className="w-full bg-white border border-gray-200 text-[14.5px] rounded-full pl-5 pr-12 py-3 outline-none shadow-sm placeholder-gray-400 opacity-60 cursor-not-allowed" placeholder={isTyping ? "AI is thinking..." : "Select an option above..."} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}