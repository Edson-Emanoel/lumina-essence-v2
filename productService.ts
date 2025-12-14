// g:/DESK-EDSON/dev/lumina-essence-v2/productService.ts
// Service layer that communicates with the backend Express server (server.ts).
// The backend runs Prisma; the frontend only uses fetch.

export interface ProductPayload {
  name: string;
  price: number;
  category: string;
  description?: string;
  image: string;
  benefitId?: string;
}

/** Create a new product */
export async function createProduct(data: ProductPayload) {
  const response = await fetch('http://localhost:4000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create product: ${response.status} ${err}`);
  }
  return await response.json();
}

/** Retrieve all products */
export async function getProducts() {
  const response = await fetch('http://localhost:4000/api/products');
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to fetch products: ${response.status} ${err}`);
  }
  return await response.json();
}
