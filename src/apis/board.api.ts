import { baseInstance } from "./axios.config";

export const fetchBoardInCategories = async (name: string) => {
  try {
    const response = await baseInstance.get(`/board/category/${name}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
