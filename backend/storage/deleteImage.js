import { supabase } from "../lib/supabase.js";

const deleteImage = async (imagePath, bucketName) => {
  if (!imagePath) {
    throw new Error("Image path is required");
  }

  const { error } = await supabase.storage.from(bucketName).remove([imagePath]);

  if (error) {
    throw error;
  }
};
