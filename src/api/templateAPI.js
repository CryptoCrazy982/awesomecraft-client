import apiClient from "./apiClient";

// Fetch all templates
export const fetchTemplates = async ({ categorySlug } = {}) => {
  try {
    const url = categorySlug
      ? `/public/templates?categorySlug=${encodeURIComponent(categorySlug)}`
      : "/public/templates";

    const res = await apiClient.get(url);
    return res.data.templates || [];
  } catch (err) {
    console.error("❌ Error fetching templates:", err);
    return [];
  }
};

// ✅ Fetch single template by ID
export const fetchTemplateById = async (id) => {
  try {
    const res = await apiClient.get(`/public/templates/${id}`);
    return res.data.template || null;
  } catch (err) {
    console.error("❌ Error fetching template by ID:", err);
    return null;
  }
};
