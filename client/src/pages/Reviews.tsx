import { useReviews } from "@/hooks/use-reviews";
import { ReviewCard } from "@/components/ReviewCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";

export default function Reviews() {
  const { data: reviews, isLoading } = useReviews();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialSearch = searchParams.get("search") || "";
  
  const [search, setSearch] = useState(initialSearch);
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredReviews = useMemo(() => {
    if (!reviews) return [];
    return reviews.filter(review => {
      const matchesSearch = review.institutionName.toLowerCase().includes(search.toLowerCase()) || 
                           review.courseName.toLowerCase().includes(search.toLowerCase());
      const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
      return matchesSearch && matchesRating;
    });
  }, [reviews, search, ratingFilter]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Student Reviews</h1>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          Browse authentic feedback from students across various institutions. Use the filters below to find exactly what you're looking for.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search institutions or courses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars Only</SelectItem>
              <SelectItem value="4">4 Stars & Up</SelectItem>
              <SelectItem value="3">3 Stars & Up</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-secondary/50 animate-pulse" />
          ))}
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-secondary/20 rounded-2xl border border-dashed">
          <p className="text-muted-foreground text-lg">No reviews found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
