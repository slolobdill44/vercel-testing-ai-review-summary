import { generateText } from "ai";
import { Product } from "./types";

export async function summarizeReviews(product: Product): Promise<string> {
    const prompt = `Summarize the reviews for the ${product.name} product:
    
    ${product.reviews.map((review) => review.review).join("\n\n")}
    
    Provide a concise summary of the main themes and sentiments in 2-3 sentences.`;

    try {
        const { text } = await generateText({
            model: "anthropic/claude-sonnet-4.5",
            prompt
        });

        return text;
    } catch (error) {
        console.error("Error summarizing reviews:", error);
        throw new Error("Failed to summarize reviews. Please try again.");
    }
}