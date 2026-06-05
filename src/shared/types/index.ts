export interface Graduate { id: string; name: string; photo_url: string; r2_key: string; created_at: string; }
export interface UploadUrlResponse { uploadUrl: string; publicUrl: string; r2Key: string; }
export interface ApiError { error: string; code?: string; }
