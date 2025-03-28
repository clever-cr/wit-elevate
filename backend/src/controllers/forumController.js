import {ForumPost, ForumReply, ForumCategory }  from "../models/forum.js"




export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    

    const categoryExists = await ForumCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }


    const category = await ForumCategory.create({
      name,
      description,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to create category", 
      error: error.message 
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await ForumCategory.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to fetch categories", 
      error: error.message 
    });
  }
};


export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    

    const categoryExists = await ForumCategory.findOne({ name: category });
    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }


    const post = await ForumPost.create({
      title,
      content,
      category,
      createdBy: req.user._id,
    });


    const populatedPost = await ForumPost.findById(post._id).populate({
      path: 'createdBy',
      select: 'fullName email'
    });

    return res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to create post", 
      error: error.message 
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }
    
    const posts = await ForumPost.find(query)
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      })
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to fetch posts", 
      error: error.message 
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await ForumPost.findById(postId)
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      });
    
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    
    // Fetch replies for this post
    const replies = await ForumReply.find({ postId })
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      })
      .sort({ createdAt: 1 });
    
    return res.status(200).json({
      message: "Post fetched successfully",
      post,
      replies,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to fetch post", 
      error: error.message 
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    
    const post = await ForumPost.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    
    // Check if user is the creator of the post
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this post",
      });
    }
    
    // Update post
    post.title = title || post.title;
    post.content = content || post.content;
    post.updatedAt = Date.now();
    
    await post.save();
    
    const updatedPost = await ForumPost.findById(postId)
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      });
    
    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to update post", 
      error: error.message 
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await ForumPost.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    
    
    if (post.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: "Not authorized to delete this post",
      });
    }
   
    await ForumReply.deleteMany({ postId });
    
  
    await ForumPost.findByIdAndDelete(postId);
    
    return res.status(200).json({
      message: "Post and all replies deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to delete post", 
      error: error.message 
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await ForumPost.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    
    // Check if user already liked the post
    if (post.likes.includes(req.user._id)) {
      // Unlike the post
      post.likes = post.likes.filter(like => like.toString() !== req.user._id.toString());
    } else {
      // Like the post
      post.likes.push(req.user._id);
    }
    
    await post.save();
    
    const updatedPost = await ForumPost.findById(postId)
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      });
    
    return res.status(200).json({
      message: "Post like status updated",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to update like status", 
      error: error.message 
    });
  }
};


export const createReply = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    
  
    const postExists = await ForumPost.findById(postId);
    if (!postExists) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

  
    const reply = await ForumReply.create({
      postId,
      content,
      createdBy: req.user._id,
    });

    // Populate user info
    const populatedReply = await ForumReply.findById(reply._id).populate({
      path: 'createdBy',
      select: 'fullName email'
    });

    return res.status(201).json({
      message: "Reply created successfully",
      reply: populatedReply,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to create reply", 
      error: error.message 
    });
  }
};

export const updateReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { content } = req.body;
    
    const reply = await ForumReply.findById(replyId);
    
    if (!reply) {
      return res.status(404).json({
        message: "Reply not found",
      });
    }
    

    if (reply.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this reply",
      });
    }
    

    reply.content = content;
    reply.updatedAt = Date.now();
    
    await reply.save();
    
    const updatedReply = await ForumReply.findById(replyId)
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      });
    
    return res.status(200).json({
      message: "Reply updated successfully",
      reply: updatedReply,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to update reply", 
      error: error.message 
    });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    
    const reply = await ForumReply.findById(replyId);
    
    if (!reply) {
      return res.status(404).json({
        message: "Reply not found",
      });
    }
    

    if (reply.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: "Not authorized to delete this reply",
      });
    }
    

    await ForumReply.findByIdAndDelete(replyId);
    
    return res.status(200).json({
      message: "Reply deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to delete reply", 
      error: error.message 
    });
  }
};

export const likeReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    
    const reply = await ForumReply.findById(replyId);
    
    if (!reply) {
      return res.status(404).json({
        message: "Reply not found",
      });
    }
    

    if (reply.likes.includes(req.user._id)) {

      reply.likes = reply.likes.filter(like => like.toString() !== req.user._id.toString());
    } else {

      reply.likes.push(req.user._id);
    }
    
    await reply.save();
    
    const updatedReply = await ForumReply.findById(replyId)
      .populate({
        path: 'createdBy',
        select: 'fullName email'
      });
    
    return res.status(200).json({
      message: "Reply like status updated",
      reply: updatedReply,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to update like status", 
      error: error.message 
    });
  }
};


export const searchForum = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }
    
  
    const posts = await ForumPost.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    }).populate({
      path: 'createdBy',
      select: 'fullName email'
    }).sort({ createdAt: -1 });
    

    const replies = await ForumReply.find({
      content: { $regex: query, $options: 'i' }
    }).populate({
      path: 'createdBy',
      select: 'fullName email'
    }).populate('postId').sort({ createdAt: -1 });
    
    return res.status(200).json({
      message: "Search results fetched successfully",
      results: {
        posts,
        replies
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to search forum", 
      error: error.message 
    });
  }
};

