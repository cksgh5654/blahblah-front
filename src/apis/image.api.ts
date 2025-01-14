import { baseInstance } from "./axios.config";

export const getPresignedUrl = async ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  try {
    const response = await baseInstance.get(
      `/image/presigned-url?fileName=${fileName}&fileType=${fileType}`
    );
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.presignedUrl;
  } catch (error) {
    throw error;
  }
};
