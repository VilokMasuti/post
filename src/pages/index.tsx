/* eslint-disable @typescript-eslint/no-unused-vars */
import EmptyState from '@/components/EmptyState';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import PostSkeleton from '@/components/PostSkeleton';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { api, Post } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface HomePageProps {
  newPosts: Post[];
  onAddPost: (post: Post) => void;
  onUpdatePost: (updatedPost: Post) => void;
}

const POSTS_PER_PAGE = 10;

const HomePage = ({ newPosts,  }: HomePageProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<{
    posts: Post[];
    total: number;
  }>({
    queryKey: ['posts', currentPage],
    queryFn: (): Promise<{ posts: Post[]; total: number }> =>
      api.getPosts(currentPage, POSTS_PER_PAGE),
  });

  const handleEditPost = (postId: number) => {
    navigate(`/edit-post/${postId}`);
  };

  const posts = data?.posts || [];
  const totalPages = data ? Math.ceil(data.total / POSTS_PER_PAGE) : 0;

  // Filter posts based on search query
  const filteredPosts = [...newPosts, ...posts].filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Posts</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          Explore interesting posts from the community
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-destructive mb-4">
              Failed to load posts. Please try again.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {searchQuery && (
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {filteredPosts.length === 0
                    ? 'No posts matching your search'
                    : `Found ${filteredPosts.length} posts matching "${searchQuery}"`}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isNew={newPosts.some((p) => p.id === post.id)}
                  onEdit={
                    newPosts.some((p) => p.id === post.id)
                      ? () => handleEditPost(post.id)
                      : undefined
                  }
                />
              ))}
            </div>
            {!searchQuery && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            {filteredPosts.length === 0 && !isLoading && (
              <div className="col-span-full">
                <EmptyState
                  title={searchQuery ? 'No matching posts' : 'No posts found'}
                  description={
                    searchQuery
                      ? `No posts matching "${searchQuery}". Try a different search term or create a new post.`
                      : 'There are no posts yet. Be the first to create one!'
                  }
                />
              </div>
            )}
          </>
        )}
      </motion.main>
    </div>
  );
};

export default HomePage;
