
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showCreateButton?: boolean;
}

export default function EmptyState({
  title = "No posts found",
  description = "There are no posts matching your criteria.",
  showCreateButton = true
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center">
      <div className="bg-secondary/70 rounded-full p-4 sm:p-6 mb-3 sm:mb-4">
        <FileText size={32} className="text-primary opacity-70" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground text-center mb-4 sm:mb-6 max-w-md">{description}</p>

      {showCreateButton && (
        <Link to="/add-post">
          <Button className="gradient-bg text-sm sm:text-base">Create New Post</Button>
        </Link>
      )}
    </div>
  );
}
