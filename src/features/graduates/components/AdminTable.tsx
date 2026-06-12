"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Graduate } from "../types";

interface AdminTableProps { graduates: Graduate[]; onDelete: (id: string) => void; deleting: string | null; }

export default function AdminTable({ graduates, onDelete, deleting }: AdminTableProps) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase">
            <th className="pb-3 pr-4">Foto</th><th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Date</th><th className="pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {graduates.map((g) => (
              <motion.tr key={g.id} initial={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                <td className="py-3 pr-4"><img src={g.photo_url} alt={g.name} className="w-14 h-14 object-cover rounded-lg" /></td>
                <td className="py-3 pr-4 text-white font-medium">{g.name}</td>
                <td className="py-3 pr-4 text-gray-400 text-sm">{new Date(g.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                <td className="py-3">
                  {confirmId === g.id ? (
                    <div className="flex gap-2 items-center">
                      <button onClick={() => { onDelete(g.id); setConfirmId(null); }} disabled={deleting === g.id}
                        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors">{deleting === g.id ? "..." : "Confirm"}</button>
                      <button onClick={() => setConfirmId(null)} className="px-3 py-1.5 text-gray-400 text-sm hover:text-white transition-colors">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmId(g.id)} className="px-3 py-1.5 bg-red-600/20 text-red-400 text-sm rounded-lg hover:bg-red-600/30 transition-colors">Delete</button>
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {graduates.length === 0 && <p className="text-center text-gray-500 py-8">No graduates registered</p>}
    </div>
  );
}
