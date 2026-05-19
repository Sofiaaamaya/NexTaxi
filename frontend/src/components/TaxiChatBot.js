'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Poppins from '@/components/ui/Poppins';
import Icon from '@/components/icons/Icon';

async function askGroq(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.reply;
}

export default function TaxiChatbot() {
  const t = useTranslations('taxiChat');

  const [open, setOpen] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [messages, setMessages] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => setBubbleVisible(true), 2500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (open && messages === null) {
      setMessages([{ role: 'assistant', content: t('greeting') }]);
    }
  }, [open, messages, t]);

  useEffect(() => {
    if (open) setBubbleVisible(false);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320);
  }, [open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const updated = [...(messages ?? []), { role: 'user', content: text }];
    setMessages(updated);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);

    try {
      const reply = await askGroq(updated);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('error') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
  };

  return (
    <>
      <div
        className={clsx(
          'fixed bottom-[104px] right-6 z-50 transition-all duration-300',
          bubbleVisible && !open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <div
          className="flex items-center gap-2 bg-white border border-[rgb(var(--color-border))] rounded-2xl rounded-br-sm px-4 py-2.5 shadow-lg cursor-pointer max-w-[220px]"
          onClick={() => setOpen(true)}
        >
          <Poppins
            text={t('bubble')}
            size="13"
            color="textPrimary"
            className="leading-snug flex-1"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setBubbleVisible(false);
            }}
            className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text-primary))] transition-colors shrink-0"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'fixed bottom-24 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl',
          'border border-[rgb(var(--color-border))] flex flex-col overflow-hidden',
          'transition-all duration-300 origin-bottom-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        )}
        style={{ height: 500 }}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 bg-[rgb(var(--color-primary))] shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Icon name="Car" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <Poppins text={t('title')} size="15" weight="semibold" color="white" />
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <Poppins text={t('online')} size="12" color="white" className="opacity-80" />
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white shrink-0"
          >
            <Icon name="ChevronDown" size={18} />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[rgb(var(--color-background))]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(var(--color-border)) transparent' }}
        >
          {(messages ?? []).map((msg, i) => (
            <div
              key={i}
              className={clsx(
                'flex items-end gap-2',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[rgb(var(--color-primary))] flex items-center justify-center text-white shrink-0">
                  <Icon name="Car" size={14} />
                </div>
              )}
              <div
                className={clsx(
                  'max-w-[75%] px-3.5 py-2.5 text-[13.5px] leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[rgb(var(--color-primary))] text-white rounded-2xl rounded-br-sm'
                    : 'bg-white text-[rgb(var(--color-text-primary))] rounded-2xl rounded-bl-sm border border-[rgb(var(--color-border))]'
                )}
                style={{ fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-lg bg-[rgb(var(--color-primary))] flex items-center justify-center text-white shrink-0">
                <Icon name="Car" size={14} />
              </div>
              <div className="bg-white border border-[rgb(var(--color-border))] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-primary))] animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="px-3 py-3 border-t border-[rgb(var(--color-border))] bg-white flex items-end gap-2 shrink-0">
          <textarea
            ref={(el) => {
              inputRef.current = el;
              textareaRef.current = el;
            }}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onInput={handleTextareaInput}
            placeholder={t('placeholder')}
            className={clsx(
              'flex-1 resize-none bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))]',
              'rounded-xl px-3.5 py-2.5 text-[13.5px] text-[rgb(var(--color-text-primary))]',
              'placeholder:text-[rgb(var(--color-text-secondary))] outline-none',
              'focus:border-[rgb(var(--color-primary))] focus:ring-2 focus:ring-[rgb(var(--color-primary))]/10',
              'transition-colors leading-relaxed'
            )}
            style={{
              minHeight: 42,
              maxHeight: 96,
              fontFamily: 'var(--font-poppins, Poppins, sans-serif)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
              input.trim() && !loading
                ? 'bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-dark))] active:scale-95'
                : 'bg-[rgb(var(--color-background))] text-[rgb(var(--color-text-secondary))] cursor-not-allowed'
            )}
          >
            <Icon name="Send" size={17} />
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-xl',
          'bg-[rgb(var(--color-primary))] text-white',
          'hover:bg-[rgb(var(--color-primary-dark))] hover:scale-105 active:scale-95',
          'flex items-center justify-center transition-all duration-200'
        )}
      >
        <Icon name={open ? 'X' : 'MessageCircle'} size={24} />
      </button>
    </>
  );
}
