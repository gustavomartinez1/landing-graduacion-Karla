"use client";
import { useEffect, useState } from "react";
import AdminTable from "@/features/graduates/components/AdminTable";
import Button from "@/shared/ui/Button";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [graduates, setGraduates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("adminPassword");
    if (stored) { setPassword(stored); setIsLoggedIn(true); }
    else { setLoading(false); }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/graduates").then((r) => r.json()).then(setGraduates).catch(() => setError("Error loading data")).finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (!password.trim()) return;
    sessionStorage.setItem("adminPassword", password);
    setIsLoggedIn(true);
    setLoading(true);
  };

  const handleDelete = async (id: string) => {
    const pw = sessionStorage.getItem("adminPassword");
    setDeleting(id);
    try {
      const res = await fetch("/api/graduates/" + id, { method: "DELETE", headers: { "x-admin-password": pw || "" } });
      if (res.status === 401) {
        sessionStorage.removeItem("adminPassword"); setIsLoggedIn(false); setPassword("");
        setError("Session expired. Enter the password again."); return;
      }
      if (!res.ok) throw new Error("Error al eliminar");
      setGraduates((prev) => prev.filter((g) => g.id !== id));
    } catch { setError("Error al eliminar la photo"); }
    finally { setDeleting(null); }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="bg-[#1e293b] p-8 rounded-2xl w-full max-w-md border border-gray-800">
          <h1 className="text-2xl font-serif text-[#d4af37] mb-6 text-center">Admin Panel</h1>
          <div className="space-y-4">
            <input type="password" placeholder="Admin password" value={password}
              onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button fullWidth onClick={handleLogin}>Sign In</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#d4af37]">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">{graduates.length} photo{graduates.length !== 1 ? "s" : ""} in the gallery</p>
          </div>
          <a href="/" className="text-[#d4af37] hover:text-[#f0d060] transition-colors underline underline-offset-4">View public site →</a>
        </div>
        {error && <div className="bg-red-600/20 text-red-400 px-4 py-3 rounded-lg mb-6">{error}<button onClick={() => setError("")} className="ml-2 underline">Close</button></div>}
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <div className="bg-[#1e293b] rounded-2xl p-6 border border-gray-800">
            <AdminTable graduates={graduates} onDelete={handleDelete} deleting={deleting} />
          </div>
        )}
      </div>
    </div>
  );
}
