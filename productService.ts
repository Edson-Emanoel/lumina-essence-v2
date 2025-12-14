export interface ProductPayload {
  name: string;
  price: number;
  category: string;
  description?: string;
  image: string;
  benefitId?: string;
  benefits?: string[];
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

/** Delete a product */
export async function deleteProduct(id: string) {
  const response = await fetch(`http://localhost:4000/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to delete product: ${response.status} ${err}`);
  }
  return true;
}

/** Update a product */
export async function updateProduct(id: string, data: ProductPayload) {
  const response = await fetch(`http://localhost:4000/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to update product: ${response.status} ${err}`);
  }
  return await response.json();
}
