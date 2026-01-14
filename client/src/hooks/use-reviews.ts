import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Review, type InsertReview, type Message, type InsertMessage } from "@shared/routes";

// ============================================
// Reviews Hooks
// ============================================

export function useReviews() {
  return useQuery({
    queryKey: [api.reviews.list.path],
    queryFn: async () => {
      const res = await fetch(api.reviews.list.path);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return api.reviews.list.responses[200].parse(await res.json());
    },
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: [api.reviews.getAnalytics.path],
    queryFn: async () => {
      const res = await fetch(api.reviews.getAnalytics.path);
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return api.reviews.getAnalytics.responses[200].parse(await res.json());
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertReview) => {
      const validated = api.reviews.create.input.parse(data);
      const res = await fetch(api.reviews.create.path, {
        method: api.reviews.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create review");
      }
      
      return api.reviews.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.reviews.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.reviews.getAnalytics.path] });
    },
  });
}

// ============================================
// Messages Hooks
// ============================================

export function useCreateMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }

      return api.messages.create.responses[201].parse(await res.json());
    },
  });
}
