'use client';

import React, { useState, useEffect, useRef } from 'react';

type MessageType = 'text' | 'website_card' | 'ad_card' | 'delivery_card' | 'crm_card';

interface Message {
  sender: 'bot' | 'user';
  type: MessageType;
  text: string;
}

export default function BizRocketScriptedDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'user', type: 'text', text: 'Mere business badhane me help karo Paytm' },
    { sender: 'bot', type: 'text', text: 'Theek hai main aapka order history dekh kar kuch acche ideas deta hu 🚀' }
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

  // --- STEP 1: Initial Pitch based on selected use case ---
  const handleInitialPrompt = async (flow: string, userText: string) => {
    setActiveFlow(flow);
    setFlowStep(1);
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userText }]);
    setIsTyping(true);
    await sleep(1500);
    setIsTyping(false);

    if (flow === 'website') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'You only accept offline orders but people are searching for businesses like you on Google. Ek website bana lijiye.' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Kya main aapka website bana du? Sirf 10000 lagega aapko per year.' }]);
    } 
    else if (flow === 'ads') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapke dukaan me usually 500 log roz aate hai. Aur is area me dusre dukaan me 900.' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapko geographical visit store ad run Karna chahiye. Kya main aapka ad chala du?' }]);
    } 
    else if (flow === 'ordering') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Kya aapko pata hai Aap Ke area me log Instamart aur zepto se roz 5 Guna zyada order Karte hai. Hum aapka online ordering aur delivery system bana sakte hai.' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Isse aapke roz Ke order double ho jaenge. Kya main setup kar du?' }]);
    } 
    else if (flow === 'crm') {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapke order ko analyse kar Ke samjh aata hai aapke customer Har 15 din me aapke dukaan aate hai. Kya main unko Har 10 din me aapke dukaan bulau?' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Isse aapka sales 2x ho sakta hai. Aaj ye 300 customer aa sakte hai aapke dukaan. Kya main inko WhatsApp msssge bhej du?' }]);
    }
  };

  // --- STEP 2: Execution & Cards ---
  const handleFlowStep = async (userReply: string) => {
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userReply }]);
    setIsTyping(true);
    await sleep(1500);
    setIsTyping(false);

    // WEBSITE FLOW EXECUTION
    if (activeFlow === 'website') {
      setFlowStep(2);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Ye raha aapka sample website.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'website_card', text: '' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Share url \n(Website made in background using Shopify)' }]);
    }

    // ADS FLOW EXECUTION
    else if (activeFlow === 'ads') {
      setFlowStep(2);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Humara suggestion hai 1500 rs roz Kharcha Kare aur aapke dukaan me 400 log extra aaenge.' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Ye raha aapka ad image. Approve Kar Diya to hum ad chala sakte hai.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'ad_card', text: '' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Payment kijiye aur aapka ad live kar dunga.' }]);
    }

    // ORDERING FLOW EXECUTION
    else if (activeFlow === 'ordering') {
      setFlowStep(2);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Ye raha aapka online order karne Ka QR code. Apne customer Ke Sath share Kare roz aur wo ghar se order kar sakte hai.' }]);
      setIsTyping(true);
      await sleep(1500);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Ab hum aapke dukaan ko porter se jodd Ka delivery karenge. Is service se Aap Har month 3 lac extra Kama sakte hai.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'delivery_card', text: '' }]);
      setIsTyping(true);
      await sleep(1000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'BAs 3000 rs Humein pay Kare. Aur Har delivery Ka 30 rs extra.' }]);
    }

    // CRM FLOW EXECUTION
    else if (activeFlow === 'crm') {
      setFlowStep(2);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: '300 rs Ka recharge Kariye.' }]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'crm_card', text: '' }]);
      setIsTyping(true);
      await sleep(2000);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Message sent ✅\n\nIsme se 30 log aapke shop aa kar aaj 18000 extra business aapko Diya hai.' }]);
    }
  };

  const resetDemo = () => {
    setActiveFlow(null);
    setFlowStep(0);
    setMessages([
      { sender: 'user', type: 'text', text: 'Mere business badhane me help karo Paytm' },
      { sender: 'bot', type: 'text', text: 'Theek hai main aapka order history dekh kar kuch acche ideas deta hu 🚀' }
    ]);
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen font-sans sm:p-4">
      <div className="w-full max-w-[400px] bg-[#f5f7fa] h-full sm:h-[850px] sm:rounded-[40px] flex flex-col relative shadow-2xl overflow-hidden border-4 border-gray-800">
        
        {/* Header */}
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

              {/* Execution Cards updated with exact copy */}
              {msg.type === 'website_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#f0f9ff] p-3.5 border-b border-blue-50"><p className="text-[#002970] text-[14px] font-bold flex items-center gap-2">🌐 Your Store is Ready!</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-300 text-[13px] border border-dashed border-blue-200 font-medium">[Sample Website Image]</div>
                    <button className="w-full bg-[#002970] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">Pay 10k and make it live</button>
                  </div>
                </div>
              )}
              {msg.type === 'ad_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fdf4ff] p-3.5 border-b border-purple-50"><p className="text-purple-800 text-[14px] font-bold flex items-center gap-2">📢 Local Ad Campaign</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-purple-50/50 rounded-xl flex items-center justify-center text-purple-300 text-[13px] border border-dashed border-purple-200 font-medium">[Ad Image]</div>
                  </div>
                </div>
              )}
              {msg.type === 'delivery_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#ecfdf5] p-3.5 border-b border-green-50"><p className="text-green-800 text-[14px] font-bold flex items-center gap-2">🛵 Online Ordering</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-green-50/50 rounded-xl flex items-center justify-center text-green-300 text-[13px] border border-dashed border-green-200 font-medium">[QR Code for Customers]</div>
                    <button className="w-full bg-green-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors shadow-sm">Pay now</button>
                    <p className="text-[12px] text-gray-500 text-center">Ab aapka store online order aur delivery Ke liye ready hai</p>
                  </div>
                </div>
              )}
              {msg.type === 'crm_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fffbeb] p-3.5 border-b border-yellow-50"><p className="text-yellow-800 text-[14px] font-bold flex items-center gap-2">💬 WhatsApp CRM</p></div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <button className="w-full bg-[#25D366] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-500 transition-colors shadow-sm">Pay. Now</button>
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
          
          {/* STATE 0: Initial Idea Selection */}
          {flowStep === 0 && !isTyping && (
            <div className="flex flex-col gap-2">
              <button onClick={() => handleInitialPrompt('website', '1. Create Website')} className="bg-white border border-blue-200 text-blue-700 text-[13px] font-semibold py-3 px-4 rounded-xl text-center shadow-sm hover:bg-blue-50">1. Website Banani Hai</button>
              <button onClick={() => handleInitialPrompt('ads', '2. Run Ads')} className="bg-white border border-purple-200 text-purple-700 text-[13px] font-semibold py-3 px-4 rounded-xl text-center shadow-sm hover:bg-purple-50">2. Ad Chalani Hai</button>
              <button onClick={() => handleInitialPrompt('ordering', '3. Delivery Setup')} className="bg-white border border-green-200 text-green-700 text-[13px] font-semibold py-3 px-4 rounded-xl text-center shadow-sm hover:bg-green-50">3. Delivery Setup Karna Hai</button>
              <button onClick={() => handleInitialPrompt('crm', '4. WhatsApp Message')} className="bg-white border border-yellow-400 text-yellow-700 text-[13px] font-semibold py-3 px-4 rounded-xl text-center shadow-sm hover:bg-yellow-50">4. WhatsApp Message Bhejna Hai</button>
            </div>
          )}

          {/* DYNAMIC APPROVAL BUTTONS (STEP 1 -> STEP 2) */}
          {!isTyping && activeFlow === 'website' && flowStep === 1 && (
            <div className="flex gap-2"><button onClick={() => handleFlowStep('Haan, bana do')} className="flex-1 bg-[#00baf2] text-white text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Haan, bana do</button></div>
          )}
          {!isTyping && activeFlow === 'ads' && flowStep === 1 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Haan, chala do')} className="flex-1 bg-[#00baf2] text-white text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Haan, chala do</button></div>
          )}
          {!isTyping && activeFlow === 'ordering' && flowStep === 1 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Setup kijiye')} className="flex-1 bg-[#00baf2] text-white text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Setup kijiye</button></div>
          )}
          {!isTyping && activeFlow === 'crm' && flowStep === 1 && (
             <div className="flex gap-2"><button onClick={() => handleFlowStep('Haan, bhej do')} className="flex-1 bg-[#00baf2] text-white text-[14px] font-bold py-3 px-2 rounded-xl text-center shadow-sm">Haan, bhej do</button></div>
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