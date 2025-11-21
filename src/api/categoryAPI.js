import apiClient from "./apiClient";

// Get all categories (public)
export const getAllCategories = async () => {
  const res = await apiClient.get("/categories");
  return res.data;
};
