import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProducts } from "@/lib/sample-data";
 
export default function Home() {
  const products = getProducts();
 
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Product Reviews</h1>
 
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.slug}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-sm mt-2">
                  {product.reviews.length} reviews
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}