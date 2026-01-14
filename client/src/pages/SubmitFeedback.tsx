import { useCreateReview } from "@/hooks/use-reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReviewSchema, type InsertReview } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { StarRating } from "@/components/StarRating";
import { Checkbox } from "@/components/ui/checkbox";

export default function SubmitFeedback() {
  const { toast } = useToast();
  const mutation = useCreateReview();
  const [, setLocation] = useLocation();

  const form = useForm<InsertReview>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: {
      institutionName: "",
      courseName: "",
      rating: 0,
      comment: "",
      reviewerType: "student"
    }
  });

  const onSubmit = (data: InsertReview) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Review Submitted!",
          description: "Thank you for contributing to the community.",
        });
        setLocation("/reviews");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary">Share Your Experience</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your feedback helps thousands of students make informed decisions. Be honest, be constructive.
        </p>
      </div>

      <Card className="shadow-xl border-t-4 border-t-primary">
        <CardContent className="pt-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="institutionName" className="text-base">Institution Name</Label>
                <Input 
                  id="institutionName" 
                  {...form.register("institutionName")} 
                  placeholder="e.g. University of Science" 
                  className="h-11"
                />
                {form.formState.errors.institutionName && (
                  <p className="text-sm text-destructive">{form.formState.errors.institutionName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseName" className="text-base">Course / Program</Label>
                <Input 
                  id="courseName" 
                  {...form.register("courseName")} 
                  placeholder="e.g. Computer Science BSc" 
                  className="h-11"
                />
                {form.formState.errors.courseName && (
                  <p className="text-sm text-destructive">{form.formState.errors.courseName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Overall Rating</Label>
              <Controller
                name="rating"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <StarRating rating={field.value} setRating={field.onChange} />
                    {form.formState.errors.rating && (
                      <p className="text-sm text-destructive">{form.formState.errors.rating.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-base">Your Review</Label>
              <Textarea 
                id="comment" 
                {...form.register("comment")} 
                placeholder="What did you like? What could be improved?" 
                className="min-h-[200px] resize-none p-4 text-base"
              />
              {form.formState.errors.comment && (
                <p className="text-sm text-destructive">{form.formState.errors.comment.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="reviewerType"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={field.value === 'anonymous'}
                      onCheckedChange={(checked) => field.onChange(checked ? 'anonymous' : 'student')}
                    />
                    <Label 
                      htmlFor="anonymous" 
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Post as Anonymous Reviewer
                    </Label>
                  </div>
                )}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full text-lg" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
