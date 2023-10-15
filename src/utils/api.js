// utils/api.js
export const fetchPosts = async (query) => {
  try {
    const response = await fetch("/api/posts/all?" + query); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
};
