const fs = require('fs/promises');
const path = require('path');
const multer = require('multer');

const tempDir = path.join(__dirname, '..', 'temp');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, tempDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

function fileFilter(_req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new Error('Invalid file type'));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

async function movePhotoFromTemp(tempFilename) {
  const photosDir = path.join(__dirname, '..', 'public', 'photos');
  await fs.mkdir(photosDir, { recursive: true });

  const extension = path.extname(tempFilename).toLowerCase() || '.jpg';
  const permanentName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
  const fromPath = path.join(tempDir, tempFilename);
  const toPath = path.join(photosDir, permanentName);

  await fs.rename(fromPath, toPath);

  return `/public/photos/${permanentName}`;
}

async function removeTempFile(tempFilename) {
  if (!tempFilename) return;
  try {
    await fs.unlink(path.join(tempDir, tempFilename));
  } catch (_error) {
    // Ignore missing temp files.
  }
}

module.exports = { upload, movePhotoFromTemp, removeTempFile };
