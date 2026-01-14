import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.reviews.list.path, async (req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  app.post(api.reviews.create.path, async (req, res) => {
    try {
      const input = api.reviews.create.input.parse(req.body);
      const review = await storage.createReview(input);
      res.status(201).json(review);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.reviews.getAnalytics.path, async (req, res) => {
    // Mock analytics for the UI-only requirement
    const mockAnalytics = {
      totalReviews: 1250,
      averageRating: 4.2,
      ratingDistribution: [
        { rating: 5, count: 600 },
        { rating: 4, count: 400 },
        { rating: 3, count: 150 },
        { rating: 2, count: 70 },
        { rating: 1, count: 30 },
      ]
    };
    res.json(mockAnalytics);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

// Seed function
async function seedDatabase() {
  const existingReviews = await storage.getReviews();
  if (existingReviews.length === 0) {
    await storage.createReview({
      institutionName: "Tech University",
      courseName: "Computer Science 101",
      rating: 5,
      comment: "Excellent course structure and professors!",
      reviewerType: "student"
    });
    await storage.createReview({
      institutionName: "City College",
      courseName: "Introduction to Business",
      rating: 4,
      comment: "Good content but assignments are heavy.",
      reviewerType: "anonymous"
    });
    await storage.createReview({
      institutionName: "Design Academy",
      courseName: "UI/UX Fundamentals",
      rating: 5,
      comment: "Changed my career path completely. Highly recommend.",
      reviewerType: "student"
    });
  }
}

// Run seed
seedDatabase().catch(console.error);
