import { supabase } from "../lib/supabase.js";

const uploadImage = async (file, bucketName, directoryName, id) => {
  const fileExt = file.originalname.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${directoryName}/${id}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return {
    publicUrl: urlData.publicUrl,
    imagePath: data.path,
  };
};

export default uploadImage;
