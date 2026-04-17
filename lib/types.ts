import { z } from "zod";
 
// Review schema
export const ReviewSchema = z.object({
  reviewer: z.string(),
  stars: z.number().min(1).max(5),
  review: z.string(),
  date: z.string(), // ISO date string
});
 
// Product schema
export const ProductSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  reviews: z.array(ReviewSchema),
});

export const ReviewInsightsSchema = z.object({
  pros: z.array(z.string()).describe("List of positive aspects mentioned in the reviews"),
  cons: z.array(z.string()).describe("List of negative aspects mentioned in the reviews"),
  themes: z.array(z.string()).describe("Common themes or topics mentioned in the reviews"),
});
 
// Infer TypeScript types from schemas
export type Review = z.infer<typeof ReviewSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ReviewInsights = z.infer<typeof ReviewInsightsSchema>;