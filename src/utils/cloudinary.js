export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || 'Image upload failed');
    }

    const data = await res.json();
    return data.secure_url; // This is the URL you will save to Firestore
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};