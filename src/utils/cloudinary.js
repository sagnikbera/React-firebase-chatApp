import imageCompression from 'browser-image-compression';

export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  try {
    /* compress */
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.5, // max 500KB
      maxWidthOrHeight: 800, // resize
      useWebWorker: true,
    });

    /*upload cloudinary */
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error?.message || 'Image upload failed');
    }

    const data = await res.json();
    return data.secure_url; // Save this to Firestore
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};
