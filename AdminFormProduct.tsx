// g:/DESK-EDSON/dev/lumina-essence-v2/AdminFormProduct.tsx
import React, { useState } from "react";
import { createProduct } from "./productService";   // ← novo import
import ProductForm from "./ProductForm";
import { Product } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialProducts: Product[] = [];

// Simulação de autenticação de admin
const isAdmin = true; // Troque para false para simular usuário comum

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword] = useState("123456789"); // senha fixa
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ---------- CREATE ----------
  const handleAddProduct = async (product: Product) => {
    const navigate = useNavigate();

    try {
      const newProduct = await createProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        benefitId: undefined, // opcional – service cria padrão se necessário
      });
      setProducts(prev => [...prev, newProduct]);
      toast.success("Produto cadastrado com sucesso!");
      setTimeout(() => navigate("/admin/products"), 1000);
      
    } catch (err) {
      toast.error("Falha ao cadastrar produto:", err);
      console.error("❌ Falha ao cadastrar produto:", err);
    }
  };

  // ---------- EDIT ----------
  const handleEditProduct = (product: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? product : p))
    );
    setEditingProduct(null);
  };

  // ---------- DELETE ----------
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ---------- RENDER ----------
  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* "TITULO" */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
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
                className={`text-sm font-medium text-stone-600 hover:text-brand-600 transition ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setShowPasswordModal(true)}
                disabled={isButtonDisabled}
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

              <button
                className="relative p-2 hover:bg-stone-50 rounded-full transition"
                onClick={() => setIsCartOpen(true)}
              >
                <svg
                  className="w-6 h-6 text-stone-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: 32 }}>
        <h1 className="text-3xl font-bold mb-5 text-center">
          Painel de Administração de Produtos
        </h1>
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
    </>
  );
};

export default AdminProductsPage;