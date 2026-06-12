export interface Graduate {
  id: string;
  name: string;
  photo_url: string;
  created_at: string;
  submitted_by?: string;
  note?: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  publicUrl: string;
  r2Key: string;
}
