import { useState } from 'react';
import axios from 'axios';

/**
 * A custom hook to manage the logic of uploading an image to Cloudinary.
 * It encapsulates the API call, loading state, and the resulting image URL.
 */
export const useCloudinaryUpload = () => { // <--- MAKE SURE 'export const' IS HERE
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    // IMPORTANT: Replace with your actual Cloudinary preset
    formData.append('upload_preset', 'your_cloudinary_upload_preset');

    setUploading(true);
    try {
      // IMPORTANT: Replace with your actual cloud name
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        formData
      );
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, imageUrl, uploadImage };
};