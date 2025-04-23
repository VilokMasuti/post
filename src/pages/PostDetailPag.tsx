/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, Comment, Post } from "@/services/api";
import { Button } from "@/components/ui/button";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import { ArrowLeft } from "lucide-react";

export default function PostDetailPage() {
  const { id } = useParams();
  const [addedComments, setAddedComments] = useState<Comment[]>([]);

  // ⛑ Try to get post from API, then fallback to localStorage if failed
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) throw new Error("No post ID provided");

      try {
        const res = await api.getPostById(Number(id));
        if (res) return res;
      } catch (err) {
        console.warn("API fetch failed, falling back to localStorage...");
      }

      // 🔁 Check localStorage if API call fails
      const localPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
      const localPost = localPosts.find((p: Post) => String(p.id) === id);
      if (localPost) return localPost;

      throw new Error("Post not found.");
    },
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
    retry: false,
  });

  const {
    data: postComments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      if (!id) throw new Error("No post ID provided");
      return api.getCommentsByPostId(Number(id));
    },
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
  });

  const comments = [...addedComments, ...(postComments || [])];

  const handleAddComment = (comment: Comment) => {
    setAddedComments((prev) => [comment, ...prev]);
  };

  if (isPostLoading || isCommentsLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading post details...</p>
        </div>
      </div>
    );
  }

  if (isPostError || isCommentsError || !post) {
    return (
      <div className="page-container flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-muted-foreground mb-6">
            {postError?.message || commentsError?.message || "Failed to load post details. Please try again."}
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to Posts
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <p className="whitespace-pre-line">{post.body}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2>

            <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-medium mb-4">Add a Comment</h3>
              <CommentForm postId={post.id} onAddComment={handleAddComment} />
            </div>

            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentCard key={comment.id + "-" + comment.email} comment={comment} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
