import express, { Request, Response, Router } from "express";
import multer from "multer";
import { AssetManager } from "../../core/assets/assetManager";

export interface AssetRouterOptions {
  assetManager: AssetManager;
  getOwnerId?: (req: Request) => string | undefined;
}

export function createAssetRouter(options: AssetRouterOptions): Router {
  const router = express.Router();
  const upload = multer(); // memory storage; buffer passed to core

  const { assetManager, getOwnerId } = options;

  // Upload endpoint
  router.post(
    "/",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file" });

        const asset = await assetManager.upload({
          buffer: req.file.buffer,
          filename: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          ownerId: getOwnerId?.(req)
        });

        res.json(asset);
      } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    }
  );

  // Get asset metadata
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const asset = await assetManager.get(req.params.id);
      if (!asset) return res.status(404).json({ error: "Not found" });
      res.json(asset);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Delete asset
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      await assetManager.delete(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
