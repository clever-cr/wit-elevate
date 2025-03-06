import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Tags, ThumbsUp, Edit, Trash2 } from "lucide-react";

// Base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_URL_SERVER_URL || "http://localhost:3000/api";

// ========================
// Type Definitions
// ========================
interface Author {
  _id: string;
  fullName: string;
  email: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdBy: Author;
  createdAt: string;
  updatedAt: string | null;
  likes: string[];
  replies?: Post[];
}

// ========================
// API Service
// ========================
const ForumService = {
  // Categories
  createCategory: async (
    name: string,
    description: string
  ): Promise<Category> => {
    try {
      let token = localStorage.getItem("authToken") || "";
      token = token.replace(/"/g, "");
      const response = await axios.post(
        `${API_BASE_URL}/forum/categories`,
        { name, description },
        { headers: token ? { Authorization: ` ${token}` } : {} }
      );
      return response.data.category;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  fetchCategories: async (): Promise<Category[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forum/categories`);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Posts
  createPost: async (postData: {
    title: string;
    content: string;
    category: string;
  }): Promise<Post> => {
    try {
      let token = localStorage.getItem("authToken") || "";
      token = token.replace(/"/g, "");
      const response = await axios.post(
        `${API_BASE_URL}/forum/posts`,
        postData,
        { headers: token ? { Authorization: ` ${token}` } : {} }
      );
      return response.data.post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  fetchPosts: async (category?: string): Promise<Post[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forum/posts`, {
        params: category ? { category } : {},
      });
      return response.data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  },

  fetchPostDetails: async (postId: string): Promise<Post> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forum/posts/${postId}`);
      return response.data.post;
    } catch (error) {
      console.error("Error fetching post details:", error);
      throw error;
    }
  },

  updatePost: async (
    postId: string,
    updateData: { content?: string }
  ): Promise<Post> => {
    try {
      if (!updateData || Object.keys(updateData).length === 0) {
        throw new Error("Update data cannot be empty");
      }
      let token = localStorage.getItem("authToken") || "";
      token = token.replace(/"/g, "");
      const response = await axios.put(
        `${API_BASE_URL}/forum/posts/${postId}`,
        updateData,
        { headers: token ? { Authorization: ` ${token}` } : {} }
      );
      return response.data.post;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },

  deletePost: async (postId: string): Promise<void> => {
    try {
      let token = localStorage.getItem("authToken") || "";
      token = token.replace(/"/g, "");
     
      await axios.delete(`${API_BASE_URL}/forum/posts/${postId}`, {
        headers: token ? { Authorization: `${token}` } : {},
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },
};

// ========================
// Modal Components
// ========================
const CreateCategoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (name: string, description: string) => void;
}> = ({ isOpen, onClose, onCreateCategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name.trim() && description.trim()) {
      onCreateCategory(name.trim(), description.trim());
      setName("");
      setDescription("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Category</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter category name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
            placeholder="Describe the category"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={!name.trim() || !description.trim()}
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

const CreatePostModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onCreatePost: (postData: {
    title: string;
    content: string;
    category: string;
  }) => void;
}> = ({ isOpen, onClose, categories, onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (title.trim() && content.trim() && category) {
      onCreatePost({ title, content, category });
      setTitle("");
      setContent("");
      setCategory("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
            placeholder="Write your post content"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={!title.trim() || !content.trim() || !category}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

const ThreadDetailPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const loadedCategories = await ForumService.fetchCategories();
        setCategories(loadedCategories);

        const loadedPosts = await ForumService.fetchPosts(
          selectedCategory || undefined
        );
        setPosts(loadedPosts);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [selectedCategory]);

  // Create Category Handler
  const handleCreateCategory = async (name: string, description: string) => {
    try {
      const newCategory = await ForumService.createCategory(name, description);
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  // Create Post Handler
  const handleCreatePost = async (postData: {
    title: string;
    content: string;
    category: string;
  }) => {
    try {
      const newPost = await ForumService.createPost(postData);
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  // Edit Post Handler
  const handleEditPost = async (
    postId: string,
    updateData: {
      title?: string;
      content?: string;
    }
  ) => {
    try {
      const updatedPost = await ForumService.updatePost(postId, updateData);
      setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  // Delete Post Handler
  const handleDeletePost = async (postId: string) => {
    try {
      await ForumService.deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // Edit Modal Component
  const EditPostModal: React.FC = () => {
    const [title, setTitle] = useState(selectedPost?.title || "");
    const [content, setContent] = useState(selectedPost?.content || "");

    const handleSubmit = () => {
      if (
        selectedPost &&
        (title !== selectedPost.title || content !== selectedPost.content)
      ) {
        handleEditPost(selectedPost._id, { title, content });
      }
    };

    if (!isEditModalOpen || !selectedPost) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit Post</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter post title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              placeholder="Edit post content"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={!title.trim() || !content.trim()}
            >
              Update Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Forum Application
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <Plus className="mr-2" /> Create Category
            </button>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={categories.length === 0}
            >
              <Plus className="mr-2" /> Create Post
            </button>
          </div>
        </header>

        {/* Category Filter */}
        <div className="mb-6 flex items-center space-x-2">
          <Tags className="text-gray-500" />
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No posts found. Create a post!
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-600">
                      {post.title}
                    </h2>
                    <div className="text-sm text-gray-500 mt-1">
                      In category: {post.category}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex items-center text-gray-600 hover:text-blue-600"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="mr-1 h-4 w-4" />
                    </button>
                    <button
                      className="flex items-center text-red-600 hover:text-red-800"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div>
                    By {post.createdBy.fullName}
                    on {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {post.likes.length} Likes
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <CreateCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onCreateCategory={handleCreateCategory}
        />

        <CreatePostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          categories={categories}
          onCreatePost={handleCreatePost}
        />

        <EditPostModal />
      </div>
    </div>
  );
};

export default ThreadDetailPage;
