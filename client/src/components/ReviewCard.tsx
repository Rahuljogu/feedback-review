import { Review } from "@shared/schema";
import { Star, User, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground line-clamp-1">
              {review.institutionName}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{review.courseName}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-accent-foreground font-bold">
            <span className="text-sm">{review.rating}.0</span>
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          </div>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4 transition-all",
                i < review.rating
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
          "{review.comment}"
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
              <User className="h-3 w-3" />
            </div>
            <span className="capitalize">{review.reviewerType}</span>
          </div>
          {review.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
