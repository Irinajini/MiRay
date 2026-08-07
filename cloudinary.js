import { CLOUDINARY_CONFIG } from '../appConfig.js';

export function validateImage(file) {
  if (!file) throw new Error('Aucun fichier sélectionné.');
  if (!CLOUDINARY_CONFIG.allowedMimeTypes.includes(file.type)) {
    throw new Error('Format non accepté. Utilisez JPG, PNG ou WEBP.');
  }
  const maxBytes = CLOUDINARY_CONFIG.maxFileSizeMb * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`Image trop lourde. Maximum ${CLOUDINARY_CONFIG.maxFileSizeMb} Mo.`);
  }
  return true;
}

export async function uploadImage(file) {
  validateImage(file);
  const { cloudName, uploadPreset } = CLOUDINARY_CONFIG;
  if (!cloudName || !uploadPreset) throw new Error('Configuration Cloudinary manquante.');

  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Échec de l'envoi vers Cloudinary.");

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    bytes: data.bytes,
    format: data.format,
  };
}
