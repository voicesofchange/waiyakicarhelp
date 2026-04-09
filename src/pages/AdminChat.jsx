import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Send, Loader2, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MessageBubble from "@/components/MessageBubble";

export default function AdminChat() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const conv = await base44.agents.createConversation({
        agent_name: "admin_assistant",
        metadata: { name: "Admin Session" },
      });
      setConversation(conv);
      setMessages(conv.messages || []);
    };
    init();
  }, []);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return unsub;
  }, [conversation?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || !conversation || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setSending(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <Link to="/admin" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-black" />
        </div>
        <div>
          <p className="text-white font-black text-base">Admin Assistant</p>
          <p className="text-gray-400 text-xs">Ask me anything about your business</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-t-3xl px-4 pt-5 pb-4 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="font-semibold text-gray-500">Ask me anything!</p>
            <div className="mt-4 space-y-2 text-sm text-left max-w-xs mx-auto">
              {["How much revenue this month?", "Show all unpaid jobs", "Which service is most popular?"].map(q => (
                <button key={q} onClick={() => setInput(q)}
                  className="w-full text-left bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-amber-800 hover:bg-amber-100 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-4">
          {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white px-4 pb-8 pt-3 flex gap-2 border-t border-gray-100">
        <textarea
          className="flex-1 border-2 border-gray-100 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-amber-400 max-h-24"
          rows={1}
          placeholder="Ask about jobs, revenue, payments…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <Button onClick={send} disabled={sending || !input.trim()} className="h-10 w-10 p-0 bg-amber-500 hover:bg-amber-400 rounded-xl shrink-0">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}