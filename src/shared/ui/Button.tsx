"use client";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "ghost"; fullWidth?: boolean; loading?: boolean;
}
export default function Button({ children, variant = "primary", fullWidth, loading, disabled, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = { primary: "bg-[#d4af37] text-[#0f172a] hover:bg-[#f0d060] active:scale-[0.98]", danger: "bg-red-600 text-white hover:bg-red-700", ghost: "bg-transparent text-[#d4af37] hover:bg-[#d4af37]/10" };
  return (
    <button className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Procesando...</span> : children}
    </button>
  );
}
