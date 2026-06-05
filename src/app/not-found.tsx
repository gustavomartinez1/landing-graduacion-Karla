import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-serif text-[#d4af37] mb-4">404</h1>
        <h2 className="text-2xl text-white font-serif mb-6">Pagina no encontrada</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">La pagina que buscas no existe o ha sido movida.</p>
        <Link href="/" className="inline-block px-8 py-3 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0d060] transition-colors">Volver a la galeria</Link>
      </div>
    </div>
  );
}
