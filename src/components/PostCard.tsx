import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/services/api';
import { motion } from 'framer-motion';

import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface PostCardProps {
  post: Post;
  isNew?: boolean;
  onEdit?: () => void;
}

const PostCard = ({ post, isNew = false, onEdit }: PostCardProps) => {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`w-full h-full flex-col hover:duration-1000 ${
          isNew ? 'border-primary/30' : ' '
        }`}
      >
        <CardHeader className="relative p-4 sm:p-6">
          {isNew && (
            <Badge
              variant="default"
              className="absolute top-2 right-2 gradient-bg"
            >
              New-Post
            </Badge>
          )}
        </CardHeader>
        <CardTitle className="text-lg text-center sm:text-xl font-bold font-heading text-balance line-clamp-2">
          {post.title}
        </CardTitle>
        <CardContent className="flex-grow p-4 sm:p-6 pt-0">
          <p className="text-muted-foreground text-sm sm:text-base">
            {post.body}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 sm:p-6 pt-2">
          <Link to={`/posts/${post.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full text-primary hover:bg-primary hover:text-white transition-colors text-sm"
            >
              Read More
            </Button>
          </Link>
          {isNew && onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              className="ml-2"
            >
              <Edit size={18} />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export default PostCard;
