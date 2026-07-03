// Run: node scripts/upload-to-cloudinary.mjs
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, existsSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Load .env.local
const envPath = path.join(root, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && v.length) process.env[k.trim()] = v.join("=").trim();
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FOLDER = "FID";

// Compress to webp ≤1600px before upload so we don't hit timeouts
async function compress(filePath) {
  const tmp = path.join(tmpdir(), `fid-${path.basename(filePath)}.webp`);
  await sharp(filePath)
    .resize(1600, 1200, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(tmp);
  return tmp;
}

const cl = (id) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/${FOLDER}/${id}`;

const uploads = [
  // Africa Urban Forum
  { file: "public/photos/projects/africa-urban-forum-2026/auf-01.jpg", id: "auf-01", label: "AUF — convening" },
  { file: "public/photos/projects/africa-urban-forum-2026/auf-02.jpg", id: "auf-02", label: "AUF — delegates" },
  { file: "public/photos/projects/africa-urban-forum-2026/auf-03.jpg", id: "auf-03", label: "AUF — dialogue" },
  { file: "public/photos/projects/africa-urban-forum-2026/auf-04.jpg", id: "auf-04", label: "AUF — atmosphere" },
  // Kansai Plascon
  { file: "public/photos/projects/kansai-plascon/kansai-01.jpg", id: "kansai-01", label: "Kansai — Gor Mahia" },
  { file: "public/photos/projects/kansai-plascon/kansai-02.jpg", id: "kansai-02", label: "Kansai — community" },
  { file: "public/photos/projects/kansai-plascon/kansai-03.jpg", id: "kansai-03", label: "Kansai — corporate" },
  { file: "public/photos/projects/kansai-plascon/kansai-04.jpg", id: "kansai-04", label: "Kansai — stakeholder" },
  { file: "public/photos/projects/kansai-plascon/kansai-05.jpg", id: "kansai-05", label: "Kansai — brand" },
  // Glam Hotel
  { file: "public/photos/projects/thrive-hospitality/glam-01.jpg", id: "glam-01", label: "Glam — property" },
  { file: "public/photos/projects/thrive-hospitality/glam-02.jpg", id: "glam-02", label: "Glam — atmosphere" },
  { file: "public/photos/projects/thrive-hospitality/glam-03.jpg", id: "glam-03", label: "Glam — experience" },
  { file: "public/photos/projects/thrive-hospitality/glam-04.jpg", id: "glam-04", label: "Glam — brand moment" },
  { file: "public/photos/projects/thrive-hospitality/glam-05.jpg", id: "glam-05", label: "Glam — lifestyle" },
  { file: "public/photos/projects/thrive-hospitality/glam-06.jpg", id: "glam-06", label: "Glam — identity" },
  { file: "public/photos/projects/thrive-hospitality/glam-07.jpg", id: "glam-07", label: "Glam — destination" },
  // Allso Beauty
  { file: "public/photos/projects/allso-beauty/allso-01.jpg", id: "allso-01", label: "Allso — launch" },
  { file: "public/photos/projects/allso-beauty/allso-02.jpg", id: "allso-02", label: "Allso — creators" },
  { file: "public/photos/projects/allso-beauty/allso-03.jpg", id: "allso-03", label: "Allso — influencer" },
  { file: "public/photos/projects/allso-beauty/allso-04.jpg", id: "allso-04", label: "Allso — brand" },
  { file: "public/photos/projects/allso-beauty/allso-05.jpg", id: "allso-05", label: "Allso — digital" },
  // Suhba Series
  { file: "public/photos/platforms/suhba-series/suhba-01.jpg", id: "suhba-01", label: "Suhba — 01" },
  { file: "public/photos/platforms/suhba-series/suhba-02.jpg", id: "suhba-02", label: "Suhba — 02" },
  { file: "public/photos/platforms/suhba-series/suhba-03.jpg", id: "suhba-03", label: "Suhba — 03" },
  // Abyan Salon (already compressed)
  { file: "public/photos/projects/abyan-salon/DSC08926.webp", id: "abyan-01", label: "Abyan — env" },
  { file: "public/photos/projects/abyan-salon/DSC08859.webp", id: "abyan-02", label: "Abyan — dest" },
  { file: "public/photos/projects/abyan-salon/DSC08858.webp", id: "abyan-03", label: "Abyan — spa" },
  { file: "public/photos/projects/abyan-salon/DSC08860.webp", id: "abyan-04", label: "Abyan — interior" },
  { file: "public/photos/projects/abyan-salon/DSC08838.webp", id: "abyan-05", label: "Abyan — treatment" },
  { file: "public/photos/projects/abyan-salon/DSC08846.webp", id: "abyan-06", label: "Abyan — atmosphere" },
  { file: "public/photos/projects/abyan-salon/DSC08835.webp", id: "abyan-07", label: "Abyan — editorial" },
  { file: "public/photos/projects/abyan-salon/DSC08810.webp", id: "abyan-08", label: "Abyan — identity" },
  { file: "public/photos/projects/abyan-salon/DSC08749.webp", id: "abyan-09", label: "Abyan — campaign" },
];

const results = {};
let ok = 0, skip = 0, fail = 0;

for (const { file, id, label } of uploads) {
  const fullPath = path.join(root, file);
  const publicId = `${FOLDER}/${id}`;

  if (!existsSync(fullPath)) {
    console.log(`SKIP (not downloaded): ${id}`);
    skip++;
    continue;
  }

  // Check if already on Cloudinary
  try {
    await cloudinary.api.resource(publicId);
    results[id] = cl(id);
    console.log(`EXISTS ${id} → ${results[id]}`);
    ok++;
    continue;
  } catch {}

  try {
    const isAlreadySmall = (await sharp(fullPath).metadata()).width <= 1600;
    const uploadPath = isAlreadySmall ? fullPath : await compress(fullPath);
    const sizeBefore = Math.round(existsSync(fullPath) ? readFileSync(fullPath).length / 1024 : 0);

    const res = await cloudinary.uploader.upload(uploadPath, {
      public_id: publicId,
      resource_type: "image",
      overwrite: false,
    });
    results[id] = cl(id);
    console.log(`OK   ${id} (${sizeBefore}KB → ${Math.round(res.bytes/1024)}KB) → ${results[id]}`);
    ok++;
  } catch (e) {
    console.error(`FAIL ${id}: ${e?.error?.message ?? e?.message ?? String(e).slice(0,80)}`);
    fail++;
  }
}

console.log(`\n✓ ${ok} ok  ${skip} skipped  ${fail} failed\n`);
console.log("=== RESULTS JSON ===");
console.log(JSON.stringify(results, null, 2));
