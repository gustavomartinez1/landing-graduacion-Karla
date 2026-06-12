"use client";
import { useState } from "react";
import { Graduate } from "../types";

interface UploadState { step: "idle" | "uploading" | "success" | "error"; progress: number; error?: string; }

export function useUpload() {
  const [state, setState] = useState<UploadState>({ step: "idle", progress: 0 });

  const upload = async (file: File, name: string, submittedBy?: string, note?: string): Promise<Graduate | null> => {
    try {
      setState({ step: "uploading", progress: 30 });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      if (submittedBy) formData.append("submitted_by", submittedBy);
      if (note) formData.append("note", note);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Error al subir"); }
      const graduate = await res.json();
      setState({ step: "success", progress: 100 });
      return graduate;
    } catch (err: any) {
      setState({ step: "error", progress: 0, error: err.message || "Error" });
      return null;
    }
  };

  const reset = () => setState({ step: "idle", progress: 0 });
  return { state, upload, reset };
}
