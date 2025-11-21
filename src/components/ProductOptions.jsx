import React from "react";

export default function ProductOptions({ options, setOptions }){
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={options.addQR} onChange={e => setOptions(prev => ({...prev, addQR: e.target.checked}))} />
        <span>Add QR Code (+₹50)</span>
      </label>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={options.removeWatermark} onChange={e => setOptions(prev => ({...prev, removeWatermark: e.target.checked}))} />
        <span>Remove watermark (+₹100)</span>
      </label>

      <div>
        <label className="block font-medium">Format</label>
        <div className="mt-2 flex gap-3">
          <button onClick={() => setOptions(prev => ({...prev, format: 'image'}))} className={`px-3 py-1 rounded ${options.format==='image' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>Static Image</button>
          <button onClick={() => setOptions(prev => ({...prev, format: 'video'}))} className={`px-3 py-1 rounded ${options.format==='video' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>Video (+₹200)</button>
        </div>
      </div>
    </div>
  );
}
