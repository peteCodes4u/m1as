import { AssetId, AssetRecord } from "./types";

export interface AssetUploadInput {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  size: number;

  ownerId?: string;
  visibility?: "private" | "public";
}

export interface AssetStorageAdapter {
  save(input: {
    buffer: Buffer;
    filename: string;
    mimeType: string;
  }): Promise<{
    storagePath: string;
    publicUrl?: string;
  }>;

  delete(storagePath: string): Promise<void>;
}

export interface AssetRepository {
  create(asset: AssetRecord): Promise<AssetRecord>;
  findById(id: AssetId): Promise<AssetRecord | null>;
  deleteById(id: AssetId): Promise<void>;
}

export interface AssetCache {
  get(id: AssetId): Promise<AssetRecord | null>;
  set(asset: AssetRecord): Promise<void>;
  delete(id: AssetId): Promise<void>;
}
