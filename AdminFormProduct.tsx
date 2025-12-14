
import React, { useState, useEffect } from "react";
import { createProduct, updateProduct } from "./productService";
import ProductForm from "./ProductForm";
import { Product } from "./types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const initialProducts: Product[] = [];
const isAdmin = true;

const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // If we navigated here with a product to edit, use it
  const productToEdit = location.state?.product as Product | undefined;

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(productToEdit || null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      setEditingProduct(location.state.product);
    } else {
      setEditingProduct(null);
    }
  }, [location.state]);

  // ---------- CREATE ----------
  const handleAddProduct = async (product: Product) => {
    try {
      const newProduct = await createProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        benefits: product.benefits, // Send benefits array
      });
      setProducts(prev => [...prev, newProduct]);
      toast.success("Produto cadastrado com sucesso!");
      setTimeout(() => navigate("/admin/products"), 1000);
    } catch (err) {
      toast.error("Falha ao cadastrar produto");
      console.error("❌ Falha ao cadastrar produto:", err);
    }
  };

  // ---------- EDIT ----------
  const handleEditProduct = async (product: Product) => {
    if (!product.id) return;
    try {
      const updated = await updateProduct(product.id.toString(), {
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        benefits: product.benefits, // Send benefits array
      });
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? updated : p))
      );
      setEditingProduct(null);
      toast.success("Produto atualizado com sucesso!");
      setTimeout(() => navigate("/admin/products"), 1000);
    } catch (err) {
      console.error("❌ Falha ao atualizar produto:", err);
      toast.error("Falha ao atualizar produto");
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <h1 className=" text-2xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                Lumina Essence
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-sm font-medium text-stone-600 hover:text-brand-600 transition"
              >
                <span>Home</span>
              </Link>
              <button
                className={`text-sm font-medium text-stone-600 hover:text-brand-600 transition`}
                onClick={() => navigate("/admin/products")}
              >
                Administração de Produtos
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-brand-600 transition"
              >
                <span>Assistente Virtual</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
        {isAdmin ? (
          <div>
            {editingProduct ? (
              <ProductForm
                initialProduct={editingProduct}
                editingProduct="Editar Produto"
                onSubmit={handleEditProduct}
                onCancel={() => {
                  setEditingProduct(null);
                  navigate("/admin/products");
                }}
              />
            ) : (
              <ProductForm onSubmit={handleAddProduct} editingProduct="Cadastrar Produto" />
            )}
          </div>
        ) : (
          <p>Você não tem permissão para acessar esta área.</p>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
