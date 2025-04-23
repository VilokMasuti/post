

import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { Post } from "@/services/api";
import { Button } from "@/components/ui/button";
import PostForm from "@/components/PostForm";
import { ArrowLeft } from "lucide-react";

interface EditPostPageProps {
  posts: Post[];
  onUpdatePost: (updatedPost: Post) => void;
}

export default function EditPostPage({ posts, onUpdatePost }: EditPostPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === parseInt(id as string));

  const handleSubmit = (data: { title: string; body: string; userId: number }) => {
    if (!post) {
      toast.error("Post not found");
      return;
    }

    // Update the post
    const updatedPost: Post = {
      ...post,
      title: data.title,
      body: data.body,
    };

    // Update in state
    onUpdatePost(updatedPost);

    // Show success message
    toast.success("Post updated successfully!");

    // Navigate back to home page
    navigate("/");
  };

  if (!post) {
    return (
      <div className="page-container flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">The post you're trying to edit doesn't exist.</p>
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
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Back to Posts
        </Link>

        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <PostForm
            onSubmit={handleSubmit}
            initialData={post}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
}
