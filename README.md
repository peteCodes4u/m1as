m1as is a MERN first asset service

mern-asset-service/
├─ core/
│  ├─ assetManager.ts        ← storage + validation
│  ├─ assetRepository.ts     ← MongoDB logic
│  ├─ storage/
│  │  ├─ disk.ts
│  │  ├─ memory.ts
│  │  └─ s3.ts
│  └─ types.ts
│
├─ express/
│  ├─ createAssetRouter.ts   ← m1as 1 (a)
│  └─ middleware.ts
│
├─ server/
│  └─ createServer.ts        ← m1as 2 (b)
│
├─ client/
│  └─ uploadAsset.ts
│
├─ react/
│  └─ useAssetUpload.ts
│
└─ index.ts

