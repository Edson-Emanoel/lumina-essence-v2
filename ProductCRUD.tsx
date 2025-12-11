import React, { useState } from 'react';
import ProductForm from './ProductForm';
import { Product } from './types';

const initialProducts: Product[] = [];

const ProductCRUD: React.FC = () => {
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
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Cadastro de Produtos</h2>
      {editingProduct ? (
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={handleEditProduct}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <ProductForm onSubmit={handleAddProduct} />
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: 16, border: '1px solid #ccc', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {product.image && (
                <img src={product.image} alt={product.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
              )}
              <div style={{ flex: 1 }}>
                <strong>{product.name}</strong> <br />
                <span>R$ {product.price.toFixed(2)}</span> <br />
                <span>Categoria: {product.category}</span> <br />
                <span>{product.description}</span> <br />
                {product.benefits && product.benefits.length > 0 && (
                  <ul style={{ margin: '4px 0', paddingLeft: 16 }}>
                    {product.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <button onClick={() => setEditingProduct(product)} style={{ marginRight: 8 }}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCRUD;
