"use client";
import { useState, useRef } from "react";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useUpload } from "../hooks/useUpload";
import { motion } from "framer-motion";

interface UploadModalProps { isOpen: boolean; onClose: () => void; onSuccess: () => void; }

export default function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ file?: string; name?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, upload, reset } = useUpload();
  const isProcessing = state.step !== "idle" && state.step !== "error";

  const resetForm = () => { setFile(null); setPreview(null); setName(""); setSubmittedBy(""); setNote(""); setErrors({}); reset(); };
  const handleClose = () => { if (!isProcessing) { resetForm(); onClose(); } };

  const validate = (): boolean => {
    const errs: { file?: string; name?: string } = {};
    if (!file) errs.file = "Selecciona una foto";
    else if (file.size > 5 * 1024 * 1024) errs.file = "La foto debe ser menor a 5MB";
    else if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) errs.file = "Solo se aceptan JPG, PNG o WebP";
    const trimmed = name.trim();
    if (!trimmed) errs.name = "Ingresa el nombre del graduado";
    else if (trimmed.length < 2) errs.name = "Debe tener al menos 2 caracteres";
    else if (trimmed.length > 100) errs.name = "El nombre es muy largo";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFile = (f: File) => {
    setFile(f); setErrors(p => ({ ...p, file: undefined }));
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) handleFile(f); };

  const handleSubmit = async () => {
    if (!validate() || !file) return;
    const result = await upload(file, name.trim(), submittedBy.trim(), note.trim());
    if (result) {
      setTimeout(() => { resetForm(); onSuccess(); onClose(); window.dispatchEvent(new CustomEvent("upload-success")); }, 1500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-2xl font-serif text-[#d4af37] mb-6 text-center">
          {state.step === "success" ? "Gracias! 🎉" : "Subir mi foto"}
        </h2>

        {state.step === "success" ? (
          <motion.div className="text-center py-8" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <p className="text-4xl mb-4">🎓</p>
            <p className="text-white text-lg">Tu foto ya esta en la galeria!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Dropzone */}
            <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className={"border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all " + (preview ? "border-[#d4af37] bg-[#d4af37]/5" : "border-gray-700 hover:border-[#d4af37] hover:bg-[#d4af37]/5")}>
              {preview ? <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-contain" />
              : <div className="text-gray-400"><p className="text-3xl mb-2">📸</p><p>Arrastra tu foto aqui o haz clic para seleccionar</p><p className="text-sm mt-1">JPG, PNG o WebP — Max 5MB</p></div>}
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleSelect} />
            </div>
            {errors.file && <p className="text-red-400 text-sm">{errors.file}</p>}

            {/* Nombre del graduado */}
            <Input label="Nombre del graduado *" placeholder="Ej: Maria Gonzalez Lopez"
              value={name} onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
              error={errors.name} disabled={isProcessing} />

            {/* Subido por */}
            <Input label="Subido por" placeholder="Tu nombre (opcional)"
              value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} disabled={isProcessing} />

            {/* Nota */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Nota para el graduado</label>
              <textarea placeholder="Ej: Felicidades, lo lograste! Te queremos mucho 🎉"
                value={note} onChange={(e) => setNote(e.target.value)}
                disabled={isProcessing} rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#1e293b] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all resize-none" />
            </div>

            {/* Progress */}
            {state.step !== "idle" && state.step !== "error" && (
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div className="h-full bg-[#d4af37] rounded-full" initial={{ width: 0 }} animate={{ width: state.progress + "%" }} transition={{ duration: 0.5 }} />
              </div>
            )}

            {state.error && <p className="text-red-400 text-sm text-center">{state.error}</p>}

            <Button fullWidth onClick={handleSubmit} disabled={isProcessing} loading={isProcessing}>
              {isProcessing ? "Publicando..." : "Publicar mi foto 🎓"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
