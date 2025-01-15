import { getPresignedUrl } from "@apis/image.api";
import axios from "axios";

export const imageUpload = async (file: File) => {
  try {
    const presignedUrl = await getPresignedUrl({
      fileName: `${file.name}-${Date.now()}`,
      fileType: file.type,
    });
    await axios.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    });
    return presignedUrl.split("?")[0];
  } catch (error) {
    throw error;
  }
};

export const multipleImageUpload = async (files: File[]) => {
  try {
    const promises = files.map((file) => imageUpload(file));
    const response = await Promise.all(promises);
    return response;
  } catch (error) {
    throw error;
  }
};
