import ForumPost from '../models/forum.js';
import Response from '../utils/Response.js';
import status from 'http-status';

// Get all threads (posts without parentId)
export const getThreads = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = { parentId: null };
    if (category) query.category = category;

    const threads = await ForumPost.find(query)
      .populate('author', 'name avatar')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ForumPost.countDocuments(query);

    return Response.succesMessage(
      res,
      "Threads retrieved successfully",
      {
        threads,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      },
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to fetch threads",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Get single thread with its replies
export const getThread = async (req, res) => {
  try {
    const thread = await ForumPost.findById(req.params.id)
      .populate('author', 'name avatar');

    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    // Increment view count
    thread.views += 1;
    await thread.save();

    // Get replies
    const replies = await ForumPost.find({ parentId: req.params.id })
      .populate('author', 'name avatar')
      .sort('createdAt');

    res.json({ thread, replies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new thread
export const createThread = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const thread = new ForumPost({
      title,
      content,
      category,
      author: req.user._id
    });

    await thread.save();
    
    const populatedThread = await ForumPost.findById(thread._id)
      .populate('author', 'name avatar');

    return Response.succesMessage(
      res,
      "Thread created successfully",
      populatedThread,
      status.CREATED
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to create thread",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Create reply
export const createReply = async (req, res) => {
  try {
    const { content } = req.body;
    const parentId = req.params.threadId;

    // Verify parent thread exists
    const parentThread = await ForumPost.findById(parentId);
    if (!parentThread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    const reply = new ForumPost({
      title: `Re: ${parentThread.title}`,
      content,
      category: parentThread.category,
      author: req.user._id,
      parentId
    });

    await reply.save();

    const populatedReply = await ForumPost.findById(reply._id)
      .populate('author', 'name avatar');

    res.status(201).json(populatedReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle like on post
export const toggleLike = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark thread as resolved
export const toggleResolved = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Only thread author can mark as resolved
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.isResolved = !post.isResolved;
    await post.save();

    res.json({ isResolved: post.isResolved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 