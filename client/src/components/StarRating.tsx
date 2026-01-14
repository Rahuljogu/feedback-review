import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  disabled?: boolean;
}

export function StarRating({ rating, setRating, disabled }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className={cn(
            "rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/20",
            disabled && "cursor-not-allowed opacity-50 hover:scale-100"
          )}
        >
          <Star
            className={cn(
              "h-8 w-8 transition-colors",
              (hoverRating || rating) >= star
                ? "fill-accent text-accent"
                : "fill-transparent text-muted-foreground/30"
            )}
          />
        </button>
      ))}
    </div>
  );
}
