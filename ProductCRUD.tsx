// // g:/DESK-EDSON/dev/lumina-essence-v2/ProductCRUD.tsx
// import React, { useState } from 'react';
// import ProductForm from './ProductForm';
// import { Product } from './types';
// import { createProduct } from './productService';

// // Lista inicial vazia – em produção você poderia buscar os produtos do DB aqui.
// const initialProducts: Product[] = [];

// const ProductCRUD: React.FC = () => {
//   // ---------- STATES ----------
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   // ---------- CREATE ----------
//   const handleAddProduct = async (product: Product) => {
//     try {
//       const newProduct = await createProduct({
//         name: product.name,
//         price: product.price,
//         category: product.category,
//         description: product.description,
//         image: product.image,
//         // benefitId is optional – service cria um padrão se não houver.
//         benefitId: undefined,
//       });
//       setProducts(prev => [...prev, newProduct]);
//     } catch (err) {
//       console.error('❌ Falha ao cadastrar produto:', err);
//     }
//   };

//   // ---------- EDIT ----------
//   const handleEditProduct = (product: Product) => {
//     setProducts(prev =>
//       prev.map(p => (p.id === product.id ? product : p))
//     );
//     setEditingProduct(null);
//   };

//   // ---------- DELETE ----------
//   const handleDeleteProduct = (id: string) => {
//     setProducts(prev => prev.filter(p => p.id !== id));
//   };

//   // ---------- RENDER ----------
//   return (
//     <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
//       <h2>Cadastro de Produtos</h2>

//       {editingProduct ? (
//         <ProductForm
//           editingProduct="Editar Produto"
//           initialProduct={editingProduct}
//           onSubmit={handleEditProduct}
//           onCancel={() => setEditingProduct(null)}
//         />
//       ) : (
//         <ProductForm
//           editingProduct="Cadastrar Produto"
//           onSubmit={handleAddProduct}
//         />
//       )}

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {products.map(product => (
//           <li
//             key={product.id}
//             style={{
//               marginBottom: 16,
//               border: '1px solid #ccc',
//               borderRadius: 8,
//               padding: 12,
//             }}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//               {product.image && (
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   style={{
//                     width: 64,
//                     height: 64,
//                     objectFit: 'cover',
//                     borderRadius: 8,
//                   }}
//                 />
//               )}
//               <div style={{ flex: 1 }}>
//                 <strong>{product.name}</strong> <br />
//                 <span>R$ {product.price.toFixed(2)}</span> <br />
//                 <span>Categoria: {product.category}</span> <br />
//                 <span>{product.description}</span> <br />
//                 {product.benefits && product.benefits.length > 0 && (
//                   <ul style={{ margin: '4px 0', paddingLeft: 16 }}>
//                     {product.benefits.map((b, i) => (
//                       <li key={i}>{b}</li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               <div>
//                 <button
//                   onClick={() => setEditingProduct(product)}
//                   style={{ marginRight: 8 }}
//                 >
//                   Editar
//                 </button>
//                 <button onClick={() => handleDeleteProduct(product.id!)}>
//                   Deletar
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductCRUD;