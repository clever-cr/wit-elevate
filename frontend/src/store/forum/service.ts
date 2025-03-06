// const ForumService = {
//   // Categories
//   createCategory: async (name: string, description: string): Promise<Category> => {
//     try {
// const token=localStorage.getItem('token');
//       const response = await axios.post(
//         ${API_BASE_URL}/forum/categories, 
//         { name, description },
//         { headers: { Authorization: ${token} } }
//       );
//       return response.data.category;
//     } catch (error) {
//       console.error('Error creating category:', error);
//       throw error;
//     }
//   },

//   fetchCategories: async (): Promise<Category[]> => {
//     try {
//       const response = await axios.get(${API_BASE_URL}/forum/categories);
//       return response.data.categories;
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       return [];
//     }
//   },

//   // Posts
//   createPost: async (postData: {
//     title: string;
//     content: string;
//     category: string;
//   }): Promise<Post> => {
//     try {
//       const token=localStorage.getItem('token');
//       const response = await axios.post(
//         ${API_BASE_URL}/forum/posts, 
//         postData,
//         { headers: { Authorization: ${token} } }
//       );
//       return response.data.post;
//     } catch (error) {
//       console.error('Error creating post:', error);
//       throw error;
//     }
//   },

//   fetchPosts: async (category?: string): Promise<Post[]> => {
//     try {
//       const response = await axios.get(${API_BASE_URL}/forum/posts, {
//         params: category ? { category } : {}
//       });
//       return response.data.posts;
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       return [];
//     }
//   },

//   fetchPostDetails: async (postId: string): Promise<Post> => {
//     try {
//       const response = await axios.get(${API_BASE_URL}/forum/posts/${postId});
//       return response.data.post;
//     } catch (error) {
//       console.error('Error fetching post details:', error);
//       throw error;
//     }
//   },

//   updatePost: async (postId: string, updateData: {
//     title?: string;
//     content?: string;
//   }): Promise<Post> => {
//     try {
//       const token=localStorage.getItem('token');
//       const response = await axios.put(
//         ${API_BASE_URL}/forum/posts/${postId}, 
//         updateData,
//         { headers: { Authorization: ${token} } }
//       );
//       return response.data.post;
//     } catch (error) {
//       console.error('Error updating post:', error);
//       throw error;
//     }
//   },

//   deletePost: async (postId: string): Promise<void> => {
//     try {
//       const token=localStorage.getItem('token');
//       await axios.delete(
//         ${API_BASE_URL}/forum/posts/${postId},
//         { headers: { Authorization: ${token} } }
//       );
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       throw error;
//     }
//   }
// };
