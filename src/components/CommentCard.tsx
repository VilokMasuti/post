
import { Comment } from "@/services/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  // Extract initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="mb-3 sm:mb-4 bg-secondary/50">
      <CardHeader className="py-2 px-3 sm:py-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarFallback className="bg-primary/20 text-primary text-xs sm:text-sm">
              {getInitials(comment.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-xs sm:text-sm">{comment.name}</p>
            <p className="text-xs text-muted-foreground">{comment.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-3 sm:py-2 sm:px-4">
        <p className="text-xs sm:text-sm">{comment.body}</p>
      </CardContent>
    </Card>
  );
}
