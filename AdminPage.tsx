
import React, { useEffect, useState } from "react";
import { Product } from "./types";
import { useNavigate, Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./productService";
import { toast } from "sonner";

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const isAdmin = true;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await deleteProduct(id);
      toast.success("Produto excluído com sucesso");
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Erro ao deletar produto");
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-stone-800">
            Produtos Cadastrados
          </h2>
          <button
            onClick={handleNavigate}
            className="bg-brand-600 text-white px-3 py-2.5 rounded-md font-medium shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Cadastrar Novo Produto
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 rounded-t-xl">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <span className="text-2xl">📷</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-brand-700 shadow-sm">
                  {product.category}
                </div>
              </div>

              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-stone-800 line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-sm font-bold text-brand-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-stone-500 text-xs mb-2 line-clamp-2 min-h-[2rem]">
                  {product.description}
                </p>

                {product.benefits && product.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.benefits.slice(0, 2).map((b, i) => (
                      <span 
                        key={i}
                        className="text-[9px] uppercase tracking-wider font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded"
                      >
                        {b}
                      </span>
                    ))}
                    {product.benefits.length > 2 && (
                      <span className="text-[9px] text-stone-400 py-0.5">+ {product.benefits.length - 2}</span>
                    )}
                  </div>
                )}

                {isAdmin && (
                  <div className="flex gap-2 mt-auto pt-2 border-t border-stone-100">
                    <button
                      onClick={() => navigate("/admin/new/product", { state: { product } })}
                      className="flex-1 px-2 py-1 bg-stone-50 text-stone-600 rounded text-xs font-medium hover:bg-brand-50 hover:text-brand-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id!)}
                      className="flex-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
            <p className="text-stone-400 text-lg mb-4">Nenhum produto cadastrado ainda.</p>
            <button
              onClick={handleNavigate}
              className="text-brand-600 font-medium hover:underline"
            >
              Cadastre o primeiro produto
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage;

