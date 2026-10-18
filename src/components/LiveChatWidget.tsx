import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, ShieldCheck, ArrowRight, User } from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: 'Welcome to Shilp BIM Solutions. I am your automated engineering assistant. How can we support your architectural, structural, or MEP BIM project today?',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    'What LOD do you recommend for pre-construction MEP?',
    'What is your standard turnaround for 20,000 m² floor plans?',
    'Can you work directly in our Autodesk Construction Cloud?',
    'How do I request a formal proposal?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputVal;
    if (!q.trim()) return;

    const userMsg = { sender: 'user' as const, text: q, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Automated smart assistant response based on AEC queries
    setTimeout(() => {
      let reply = 'Thank you for your question. For detailed project assessments, our Operations Leads (Aman Kumar for Architecture/Structure or Mithilesh Sharma for MEP) review all drawing sets. You can submit your requirements via our Proposal form below for a guaranteed response within 24 hours.';

      const lower = q.toLowerCase();
      if (lower.includes('lod') || lower.includes('level of development')) {
        reply = 'For pre-construction MEP coordination and clash resolution, we typically recommend LOD 350 to LOD 400. This models actual duct/pipe dimensions, insulation, hanger locations, and maintenance access clearance envelopes.';
      } else if (lower.includes('turnaround') || lower.includes('timeline') || lower.includes('time')) {
        reply = 'Standard turnaround for a typical 20,000 m² multi-story building is 7 to 10 working days for baseline LOD 300 models, followed by weekly sprint cycles for federated clash coordination.';
      } else if (lower.includes('acc') || lower.includes('cloud') || lower.includes('bim 360')) {
        reply = 'Yes! Our engineers connect directly into your Autodesk Construction Cloud (ACC) or BIM 360 hub as authorized project members, following your folder structure and permissions.';
      } else if (lower.includes('proposal') || lower.includes('quote') || lower.includes('cost')) {
        reply = 'To receive a tailored proposal with milestone billing, please use the "Discuss Your Project" form on this page or email us directly at info@shilpbimsolutions.com with your drawing links.';
      }

      setMessages(prev => [...prev, {
        sender: 'bot' as const,
        text: reply,
        time: 'Just now'
      }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#39A9FF] text-[#101419] font-bold shadow-2xl hover:bg-[#60b9ff] transition-all hover:scale-105 group border border-white/20"
          aria-label="Open BIM Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D9363E] animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold tracking-tight hidden sm:inline">
            BIM Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#181F27] border border-[#39A9FF]/40 rounded-2xl w-[92vw] sm:w-[380px] h-[500px] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
          {/* Top Bar */}
          <div className="p-4 bg-[#101419] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#39A9FF]/20 border border-[#39A9FF]/40 flex items-center justify-center text-[#39A9FF]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold font-display text-white flex items-center gap-1.5">
                  <span>Shilp Engineering Assistant</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Automated AEC Inquiry Support
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#39A9FF] text-[#101419] font-medium rounded-tr-none'
                      : 'bg-[#101419] text-slate-200 border border-slate-800 rounded-tl-none font-body'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                  {m.sender === 'bot' ? 'Assistant' : 'You'} · {m.time}
                </span>
              </div>
            ))}

            {/* Quick Suggestion Prompts */}
            {messages.length <= 2 && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 block">Suggested Inquiries:</span>
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(qp)}
                    className="w-full text-left p-2 rounded-lg bg-[#101419]/70 hover:bg-[#101419] border border-slate-800 text-[11px] text-[#39A9FF] hover:text-white transition-colors"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Disclaimer */}
          <div className="px-3 py-1 bg-[#101419] border-t border-slate-800 text-[9px] font-mono text-slate-400 text-center">
            * Automated assistant. For formal proposal submissions, use our project enquiry form.
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#101419] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about LOD, coordination, or pricing..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#181F27] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#39A9FF]"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#39A9FF] text-[#101419] hover:bg-[#60b9ff] transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
