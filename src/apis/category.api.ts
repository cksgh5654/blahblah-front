import { baseInstance } from "./axios.config";

export const fetchCategories = async () => {
  try {
    const response = await baseInstance.get("/category/board");

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.categories;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
