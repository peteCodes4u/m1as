import express from "express";
import path from "path";

import { AssetManager } from "../core/assets/assetManager.js";
import { DiskStorageAdapter } from "../storage/disk/diskStorageAdapter.js";
import { createAssetRouter } from "../adapters/express/assetsRouter.js";
import { InMemoryAssetRepo } from "./inMemoryAssetRepo.js";

const PORT = 3000;

// 1️⃣ Express app
const app = express();

// 2️⃣ Disk storage (uploads folder)
const uploadsDir = path.resolve(process.cwd(), "uploads");

const storage = new DiskStorageAdapter({
  rootDir: uploadsDir,
  publicBaseUrl: "/uploads"
});

// 3️⃣ Repository (swap with Mongo later)
const repository = new InMemoryAssetRepo();

// 4️⃣ Asset manager (core)
const assetManager = new AssetManager(storage, repository);

// 5️⃣ Serve uploaded files
app.use("/uploads", express.static(uploadsDir));

// 6️⃣ Asset API
app.use(
  "/assets",
  createAssetRouter({
    assetManager,
    getOwnerId: (req) =>
      req.headers["x-user-id"] as string | undefined
  })
);

// 7️⃣ Health check (useful for Render later)
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 8️⃣ Start server
app.listen(PORT, () => {
  console.log(`Asset server running on http://localhost:${PORT}`);
  console.log(`POST files to http://localhost:${PORT}/assets`);
});
