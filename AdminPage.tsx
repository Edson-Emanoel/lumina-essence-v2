import React, { useEffect, useState } from "react";
import { Product } from "./types";
import { useNavigate, Link } from "react-router-dom";
import { getProducts } from "./productService";

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const isAdmin = true;

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword] = useState("123456789");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleNavigate = () => {
    navigate("/admin/new/product");
  };

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

      <div className="flex flex-col items-center px-24 py-8">
        <h2 className="text-xl font-semibold mt-4 text-center">
          Produtos cadastrados
        </h2>

        <button
          onClick={handleNavigate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 mb-4 self-end"
        >
          Cadastrar Novo Produto
        </button>

        <ul className="list-none p-0 w-full max-w-4xl mx-auto">
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                marginBottom: 16,
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <strong>{product.name}</strong> <br />
                  <span>R$ {product.price.toFixed(2)}</span> <br />
                  <span>Categoria: {product.category}</span> <br />
                  <span>{product.description}</span> <br />
                  {product.benefits && product.benefits.length > 0 && (
                    <ul style={{ margin: "4px 0", paddingLeft: 16 }}>
                      {product.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {isAdmin && (
                  <div>
                    <button
                      onClick={() => setEditingProduct(product)}
                      style={{ marginRight: 8 }}
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id!)}>
                      Deletar
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminPage;
