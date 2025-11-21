import React from "react";

export default function WhatsAppButton({ phone, message }) {
  const encoded = encodeURIComponent(message);
  // phone should be full international without + sign, e.g. 919888777666
  const url = `https://wa.me/${phone}?text=${encoded}`;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="px-4 py-2 border rounded flex items-center gap-2">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M..."></path></svg>
      WhatsApp
    </a>
  );
}
