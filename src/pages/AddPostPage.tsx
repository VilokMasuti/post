/* eslint-disable @typescript-eslint/no-unused-vars */

import PostForm from '@/components/PostForm';
import { Post } from '@/services/api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ArrowLeft } from 'lucide-react';

interface AddPostPageProps {
  onAddPost: (post: Post) => void;
}

export default function AddPostPage({ onAddPost }: AddPostPageProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (data: {
    title: string;
    body: string;
    userId: number;
  }) => {
    setSubmitting(true);

    // Create a new post object with an ID
    const newPost: Post = {
      id: Date.now(), // Generate a unique ID based on timestamp
      title: data.title,
      body: data.body,
      userId: data.userId,
      content: '',
    };

    // Add the post to state (simulating API addition)
    onAddPost(newPost);

    // Show success message
    toast.success('Post created successfully!');

    // Navigate back to home page
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Posts
        </Link>

        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <PostForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
