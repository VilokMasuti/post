
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Comment } from "@/services/api";

interface CommentFormProps {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

export default function CommentForm({ postId, onAddComment }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create new comment
    const newComment: Comment = {
      id: Date.now(),
      postId,
      name,
      email,
      body,
    };

    // Add to state
    onAddComment(newComment);

    // Reset form
    setName("");
    setEmail("");
    setBody("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-2"
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Textarea
        placeholder="Write your comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        rows={4}
      />
      <Button type="submit" disabled={isSubmitting} className="gradient-bg">
        {isSubmitting ? "Submitting..." : "Add Comment"}
      </Button>
    </form>
  );
}
