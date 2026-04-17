import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/sample-data";
import { Reviews } from "@/components/reviews";
import { AIReviewSummary } from "@/components/ai-review-summary";
import { StreamingSummary } from "@/components/streaming-summary";
import Link from "next/dist/client/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  
  let product;
  try {
    product = getProduct(productId);
  } catch (error) {
    notFound();
  }

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Product Header */}
                <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="text-lg text-muted-foreground mt-2">
                        {product.description}
                    </p>
                    <div className="mt-8" />                    

                    {/* Reviews */}
                    <StreamingSummary product={product} />
                    <div className="mt-8" />                    
                    <Reviews product={product} />
                </div>
            </div>
            <Link
                href="/"
                className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                Back to Products List
            </Link>
        </main>
    );
}

export function generateStaticParams() {
    const products = getProducts();

    return products.map((product) => ({
        productId: product.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ productId: string }>;
}): Promise<Metadata> {
    const { productId } = await params;

    let product;
    try {
        product = getProduct(productId);
    } catch (error) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: `${product.name} - Customer Reviews`,
        description: product.description,
    };
}
