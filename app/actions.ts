"use server";

import { revalidateTag } from "next/cache";

export async function invalidateProductCache(productSlug: string) {
    revalidateTag(`product-summary-${productSlug}`, {});
    revalidateTag(`product-insights-${productSlug}`, {});
}