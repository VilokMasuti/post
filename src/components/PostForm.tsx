import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

// 🧱 Extra form UI helpers from your UI library
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
//  This defines the shape and rules for the form — like required fields
const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  body: z.string().min(10, 'Body must be at least 10 characters.'),
});

//  This creates a type (like a form blueprint) from the schema above
type FormData = z.infer<typeof formSchema>;

//  These are the props (inputs) our PostForm component can receive

interface PostFormProps {
  onSubmit: (data: { title: string; body: string; userId: number }) => void; // What to do when form is submitted
  initialData?: Post; // Optional: If editing an existing post, this gives us the old data
  isEditing?: boolean; // Just to change the button text (Update/Create)
}

const PostForm = ({
  onSubmit,
  initialData,
  isEditing = false,
}: PostFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema), // Use Zod to validate the form
    defaultValues: {
      title: initialData?.title ?? '', // If editing, fill in old title, else empty
      body: initialData?.body ?? '', // Same for body
    },
  });

  // 🔁 If the initial data changes (like switching posts), update the form values
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        body: initialData.body,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: FormData) => {
    onSubmit({
      ...values,
      userId: initialData?.userId ?? 1,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 👇 This wraps the form with all the magic from useForm */}
      <Form {...form}>
        {/* 👇 When the user submits the form, handleSubmit runs */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* 🏷️ Title input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormMessage /> {/* 🔔 Shows error if title is invalid */}
              </FormItem>
            )}
          />

          {/* ✍️ Body (post content) input */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your post content here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/*  Shows error if body is too short */}
              </FormItem>
            )}
          />

          {/*  Submit button - text changes based on isEditing */}
          <Button type="submit" className="w-full gradient-bg">
            {isEditing ? 'Update Post' : 'Create Post'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default PostForm;
