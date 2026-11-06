"use client";

import React, { useState, useEffect } from "react";
import { X, Key, ShieldCheck, Check, Sparkles, AlertCircle } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export default function ApiKeyModal({ isOpen, onClose, onKeySaved }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oryzo_openai_api_key");
      if (saved) {
        setApiKey(saved);
      }
    } catch {}
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (trimmed) {
      localStorage.setItem("oryzo_openai_api_key", trimmed);
      setIsSaved(true);
      onKeySaved(trimmed);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1000);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("oryzo_openai_api_key");
    setApiKey("");
    onKeySaved("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all">
      <div 
        className="relative w-full max-w-lg bg-[var(--surface-card)] border border-[var(--border-main)] rounded-[12px] p-6 shadow-2xl text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-[var(--accent-ember)]" />
            <span className="text-[12px] font-medium tracking-wider uppercase font-mono text-[var(--text-primary)]">
              CẤU HÌNH OPENAI API KEY (BYOK)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[var(--border-main)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            Nhập <strong>OpenAI API Key</strong> của bạn để kích hoạt hệ thống tự động: mỗi ngày AI sẽ tự động phân tích hàng trăm GitHub repos hot nhất, đúc kết bản tin và sinh bài tập thực tế.
          </p>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] flex justify-between">
              <span>OpenAI API Key (sk-...)</span>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-[var(--accent-ember)] hover:underline lowercase"
              >
                {showKey ? "ẩn" : "hiện"}
              </button>
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full h-[42px] px-3.5 bg-[var(--bg-canvas)] border border-[var(--border-main)] rounded-[8px] text-[13px] font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-ember)] transition-colors"
              />
            </div>
          </div>

          <div className="p-3 rounded-[8px] bg-[var(--bg-canvas)]/60 border border-[var(--border-main)] flex items-start space-x-2.5 text-[11px] text-[var(--text-secondary)] leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Bảo mật 100%:</strong> API Key chỉ được lưu trữ cục bộ trong trình duyệt của bạn (localStorage) và chỉ gửi trực tiếp khi bạn bấm yêu cầu đồng bộ. Bạn có thể xóa bất cứ lúc nào.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-main)]">
          {apiKey ? (
            <button
              onClick={handleClear}
              className="text-[11px] font-mono uppercase tracking-wider text-red-400 hover:underline"
            >
              Xóa Key
            </button>
          ) : <div />}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="h-[36px] px-4 rounded-[22.5px] border border-[var(--border-main)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-[11px] font-medium tracking-wider uppercase transition-colors"
            >
              HỦY
            </button>
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="h-[36px] px-5 rounded-[36px] bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1.5 disabled:opacity-50"
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                  <span>ĐÃ LƯU!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-ember)] mr-1" />
                  <span>LƯU & KÍCH HOẠT</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
