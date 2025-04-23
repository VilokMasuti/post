import { useState } from 'react';
import { Post } from './services/api';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import NotFound from './pages/NotFound';
import HomePage from './pages';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPag';
import AddPostPage from './pages/AddPostPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const [newPosts, setNewPosts] = useState<Post[]>([]);

  const handleAddPost = (post: Post) => {
    setNewPosts([post, ...newPosts]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setNewPosts(newPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  return (
    <QueryClientProvider client={queryClient}>

        <Toaster />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <HomePage
                newPosts={newPosts}
                onAddPost={handleAddPost}
                onUpdatePost={handleUpdatePost}
              />
            } />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/add-post" element={<AddPostPage onAddPost={handleAddPost} />} />
            <Route path="/edit-post/:id" element={
              <EditPostPage posts={newPosts} onUpdatePost={handleUpdatePost} />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

    </QueryClientProvider>
  );
};

export default App;
