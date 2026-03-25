'use client';

import React, { useState, useEffect, useRef } from 'react';

type MessageType = 'text' | 'website_card' | 'ad_card' | 'delivery_card' | 'crm_card';

interface Message {
  sender: 'bot' | 'user';
  type: MessageType;
  text: string;
}

export default function BizRocketPolishedDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      type: 'text',
      text: 'Namaste! Main aapka AI business manager hoon. Main aapke transactions aur footfall ko analyze karke aapki sales badhane mein madad karunga. 🚀',
    },
    {
      sender: 'bot',
      type: 'text',
      text: 'Aap aaj kis cheez pe focus karna chahenge?',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFlow, setActiveFlow] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleFlowTrigger = (flow: string, userText: string) => {
    setActiveFlow(flow);
    setMessages((prev) => [...prev, { sender: 'user', type: 'text', text: userText }]);
    setIsTyping(true);

    if (flow === 'website') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Maine check kiya ki aapka store offline acha chal raha hai, par online presence nahi hai. Main 2 minute me website bana raha hoon...' }]);
        setTimeout(() => showCard('website_card'), 1500);
      }, 1000);
    } else if (flow === 'ads') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Aapke area me dusre stores me 900 log aate hai, par aapke paas sirf 400. Main Meta/Google ads ka ek campaign setup kar raha hoon...' }]);
        setTimeout(() => showCard('ad_card'), 1500);
      }, 1000);
    } else if (flow === 'ordering') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Area me home delivery ki demand 5x badh gayi hai. Main Porter integration ke saath aapka QR ordering system setup kar raha hoon...' }]);
        setTimeout(() => showCard('delivery_card'), 1500);
      }, 1000);
    } else if (flow === 'crm') {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', type: 'text', text: 'Data shows 40% customers 15 din se wapas nahi aaye. Main unhe wapas bulane ke liye ek WhatsApp broadcast ready kar raha hoon...' }]);
        setTimeout(() => showCard('crm_card'), 1500);
      }, 1000);
    }
  };

  const showCard = (cardType: MessageType) => {
    setIsTyping(false);
    setMessages((prev) => [...prev, { sender: 'bot', type: cardType, text: '' }]);
  };

  const resetDemo = () => {
    setActiveFlow(null);
    setInputValue('');
    setMessages([
      { sender: 'bot', type: 'text', text: 'Namaste! Main aapka AI business manager hoon. Main aapke transactions aur footfall ko analyze karke aapki sales badhane mein madad karunga. 🚀' },
      { sender: 'bot', type: 'text', text: 'Aap aaj kis cheez pe focus karna chahenge?' }
    ]);
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen font-sans sm:p-4">
      {/* App Container */}
      <div className="w-full max-w-[400px] bg-[#f5f7fa] h-full sm:h-[850px] sm:rounded-[40px] flex flex-col relative shadow-2xl overflow-hidden border-4 border-gray-800">
        
        {/* Polished Native Header */}
        <header className="bg-[#002970] text-white pt-12 pb-4 px-5 flex flex-col z-10">
          <div className="flex items-center gap-3">
            <svg onClick={resetDemo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            
            {/* Styled Paytm Logo */}
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
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 no-scrollbar">
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

              {/* USE CASE 1: Website Card */}
              {msg.type === 'website_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#f0f9ff] p-3.5 border-b border-blue-50">
                    <p className="text-[#002970] text-[14px] font-bold flex items-center gap-2">🌐 Your Store is Ready!</p>
                  </div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-300 text-[13px] border border-dashed border-blue-200 font-medium">
                      [Auto-Generated Storefront]
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">Auto-populated 42 products from your payment history.</p>
                    <button className="w-full bg-[#002970] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">Go Live (₹10k/yr)</button>
                  </div>
                </div>
              )}

              {/* USE CASE 2: Ads Card */}
              {msg.type === 'ad_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fdf4ff] p-3.5 border-b border-purple-50">
                    <p className="text-purple-800 text-[14px] font-bold flex items-center gap-2">📢 Local Ad Campaign</p>
                  </div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-purple-50/50 rounded-xl flex items-center justify-center text-purple-300 text-[13px] border border-dashed border-purple-200 font-medium">
                      [Meta/Google Ad Preview]
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">Targeting 5,000 users within 2km radius of your store.</p>
                    <button className="w-full bg-purple-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-purple-800 transition-colors shadow-sm">Launch Ad (₹1500/day)</button>
                  </div>
                </div>
              )}

              {/* USE CASE 3: Ordering Card */}
              {msg.type === 'delivery_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#ecfdf5] p-3.5 border-b border-green-50">
                    <p className="text-green-800 text-[14px] font-bold flex items-center gap-2">🛵 Online Ordering</p>
                  </div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full h-28 bg-green-50/50 rounded-xl flex items-center justify-center text-green-300 text-[13px] border border-dashed border-green-200 font-medium">
                      [QR & Porter Map]
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">QR ordering system synced with Porter for 30-min delivery.</p>
                    <button className="w-full bg-green-700 text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors shadow-sm">Setup Delivery (₹3000)</button>
                  </div>
                </div>
              )}

              {/* USE CASE 4: CRM Card */}
              {msg.type === 'crm_card' && (
                <div className="max-w-[92%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-[#fffbeb] p-3.5 border-b border-yellow-50">
                    <p className="text-yellow-800 text-[14px] font-bold flex items-center gap-2">💬 WhatsApp CRM</p>
                  </div>
                  <div className="p-4 flex flex-col gap-3.5">
                    <div className="w-full bg-[#f8fafc] p-3 rounded-xl border-l-[4px] border-[#25D366]">
                      <p className="text-[13px] text-gray-700 font-medium leading-relaxed">"Hello! We missed you. Come back this week for 10% off! 🎁"</p>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-relaxed">Sending to 120 customers missing for 15+ days.</p>
                    <button className="w-full bg-[#25D366] text-white text-[14px] font-semibold py-3 rounded-xl hover:bg-green-500 transition-colors shadow-sm">Send Broadcast (₹300)</button>
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* Typing Indicator */}
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

        {/* Suggestion Chips 2x2 Grid */}
        {!activeFlow && !isTyping && (
          <div className="px-5 pb-2 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleFlowTrigger('website', 'Build Website 🌐')} className="bg-[#f0f9ff] border border-blue-200 text-[#002970] text-[13px] font-semibold py-3.5 px-2 rounded-2xl text-center shadow-sm hover:bg-blue-50 transition-colors">
                1. Build Website
              </button>
              <button onClick={() => handleFlowTrigger('ads', 'Run Local Ads 📢')} className="bg-[#fdf4ff] border border-purple-200 text-purple-800 text-[13px] font-semibold py-3.5 px-2 rounded-2xl text-center shadow-sm hover:bg-purple-50 transition-colors">
                2. Run Local Ads
              </button>
              <button onClick={() => handleFlowTrigger('ordering', 'Setup Delivery 🛵')} className="bg-[#ecfdf5] border border-green-200 text-green-800 text-[13px] font-semibold py-3.5 px-2 rounded-2xl text-center shadow-sm hover:bg-green-50 transition-colors">
                3. Setup Delivery
              </button>
              <button onClick={() => handleFlowTrigger('crm', 'WhatsApp CRM 💬')} className="bg-[#fffbeb] border border-yellow-200 text-yellow-800 text-[13px] font-semibold py-3.5 px-2 rounded-2xl text-center shadow-sm hover:bg-yellow-50 transition-colors">
                4. WhatsApp CRM
              </button>
            </div>
          </div>
        )}

        {/* Flushed Input Area */}
        <div className="bg-[#f5f7fa] p-4 pb-6 sm:pb-4 flex items-center gap-3">
          <div className="flex-1 relative">
            <input 
              disabled 
              type="text" 
              className="w-full bg-white border border-gray-200 text-[14.5px] rounded-full pl-5 pr-12 py-3.5 outline-none shadow-sm placeholder-gray-400 opacity-60 cursor-not-allowed" 
              placeholder="Type your message..." 
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#002970] w-9 h-9 rounded-full flex items-center justify-center opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}