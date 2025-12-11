import React, { useState } from 'react';
import ProductForm from './ProductForm';
import { Product } from './types';

const initialProducts: Product[] = [];

// Simulação de autenticação de admin
const isAdmin = true; // Troque para false para simular usuário comum

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => (p.id === product.id ? product : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <h1 className="text-3xl font-bold mb-5 text-center">Painel de Administração de Produtos</h1>
      {isAdmin ? (
        <div>
          {editingProduct ? (
            <ProductForm
              initialProduct={editingProduct}
              onSubmit={handleEditProduct}
              onCancel={() => setEditingProduct(null)}
            />
          ) : (
            <ProductForm onSubmit={handleAddProduct} />
          )}
        </div>
      ) : (
        <p>Você não tem permissão para acessar esta área.</p>
      )}
    </div>
  );
};

export default AdminProductsPage;
