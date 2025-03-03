import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/forum/Header';
// import Footer from '../components/Footer';
import PostItem from '../components/forum/PostItem';
import PostEditor from '../components/forum/PostEditor';
import { Thread, Post } from '../util/types';
import { ChevronLeft, Eye, MessageCircle, Bookmark, Share2, Lock } from 'lucide-react';

const ThreadDetailPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    // Simulated API Call
    setTimeout(() => {
      setThread({
        id: '102',
        title: 'React vs. Vue in 2025',
        createdAt: '2025-02-26T09:15:00Z',
        author: {
          id: 'user2',
          username: 'DevGuru',
          avatar: '',
          joinDate: '2024-02-20T00:00:00Z',
          postCount: 87,
          role: 'user'
        },
        postCount: 28,
        viewCount: 312,
        lastPost: {
          timestamp: '2025-02-27T10:45:00Z',
          author: {
            id: 'user5',
            username: 'FrontendDev',
            avatar: '',
            joinDate: '2024-05-18T00:00:00Z',
            postCount: 42,
            role: 'user'
          }
        },
        isPinned: false,
        isLocked: false,
        tags: ['react', 'vue', 'frontend']
      });

      setPosts([
        {
          id: 'post1',
          content: `React has Suspense and Server Components fully implemented now, while Vue has refined its Composition API. What are your experiences working with both frameworks?`,
          createdAt: '2025-02-26T09:15:00Z',
          updatedAt: null,
          author: {
            id: 'user2',
            username: 'DevGuru',
            avatar: '',
            joinDate: '2024-02-20T00:00:00Z',
            postCount: 87,
            role: 'user'
          },
          likes: 12,
          isLiked: false
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [threadId]);

  const handleReply = (postId: string) => {
    setReplyingTo(postId);
  };

  const handleSubmitReply = (content: string) => {
    const newPost: Post = {
      id: `post${posts.length + 1}`,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      author: {
        id: 'currentUser',
        username: 'CurrentUser',
        avatar: '',
        joinDate: '2024-08-10T00:00:00Z',
        postCount: 28,
        role: 'user'
      },
      likes: 0,
      isLiked: false
    };
    
    setPosts([...posts, newPost]);
    setReplyingTo(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!thread) {
    return <div>Thread Not Found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center text-blue-600 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Forums
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold">{thread.title}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-500 gap-y-2">
              <div className="flex items-center mr-4"><Eye className="h-4 w-4 mr-1" /> {thread.viewCount} views</div>
              <div className="flex items-center mr-4"><MessageCircle className="h-4 w-4 mr-1" /> {thread.postCount} replies</div>
              {thread.isLocked && <div className="flex items-center text-red-500"><Lock className="h-4 w-4 mr-1" /> Locked</div>}
            </div>
          </div>
          {posts.map((post, index) => (
            <PostItem key={post.id} post={post} isOriginalPost={index === 0} onReply={() => handleReply(post.id)} />
          ))}
        </div>

        {!thread.isLocked ? (
          replyingTo ? (
            <PostEditor placeholder="Write your reply..." buttonText="Post Reply" onSubmit={handleSubmitReply} />
          ) : (
            <PostEditor placeholder="Write your reply..." buttonText="Post Reply" onSubmit={handleSubmitReply} />
          )
        ) : (
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 text-center">
            <p className="text-yellow-700 font-medium">This thread is locked. Replies are no longer allowed.</p>
          </div>
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ThreadDetailPage;
