import { useState, useCallback } from 'react'; // Import useCallback
import axios from 'axios';

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // By wrapping this in useCallback, we ensure the function reference
  // doesn't change on every render unless its own dependencies change.
  const uploadImage = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mern_blog_uploads'); 

    setUploading(true);
    try {
       const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dz0bxhks7/image/upload',
        formData
      );
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  }, []); // Empty dependency array means this function is created only once

  // The 'setImageUrl' function returned by useState is ALREADY stable by default.
  // We don't need to do anything to it.
  return { uploading, imageUrl, uploadImage, setImageUrl };
};