"use client";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; }
export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>}
      <input className={`w-full px-4 py-3 rounded-lg border bg-[#1e293b] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all ${error ? "border-red-500" : "border-gray-700"} ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
