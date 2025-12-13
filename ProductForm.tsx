import React, { useState } from "react";
import { Product } from "./types";
import { useNavigate, Link } from "react-router-dom";

interface ProductFormProps {
  editingProduct: "Editar Produto" | "Cadastrar Produto" | null;
  onSubmit: (product: Product) => void;
  initialProduct?: Product;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  editingProduct,
  onSubmit,
  initialProduct,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState(initialProduct?.name || "");
  const [price, setPrice] = useState(initialProduct?.price || "");
  const [category, setCategory] = useState(initialProduct?.category || "");
  const [description, setDescription] = useState(
    initialProduct?.description || ""
  );
  const [image, setImage] = useState(initialProduct?.image || "");
  const [benefits, setBenefits] = useState(
    initialProduct?.benefits?.join(", ") || ""
  );
  // States do App.tsx para navegação/admin/modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [adminPassword] = useState("123456789"); // senha fixa
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onSubmit({
      id: initialProduct?.id || Date.now(),
      name,
      price: Number(price),
      category,
      description,
      image,
      benefits: benefits
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
    });
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage("");
    setBenefits("");
  };

  const handleNavigateBack = () => {
    navigate(-1);
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

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 max-w-xl mx-auto"
      >
        <button
          className="w-fit px-3 py-1.5 bg-stone-200 rounded-md"
          onClick={handleNavigateBack}
        >
          Voltar
        </button>
        <h2 className="text-xl font-semibold text-center">
          {editingProduct ? "Editar Produto" : "Cadastrar Produto"}
        </h2>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-stone-700">Nome do produto</label>
          <input
            type="text"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-stone-700">Preço</label>
          <input
            type="number"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
            step={0.01}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-stone-700">Categoria</label>
          <input
            type="text"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-stone-700">Descrição</label>
          <textarea
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-stone-700">URL da imagem</label>
          <input
            type="text"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-stone-700">
            Benefícios (separados por vírgula)
          </label>
          <input
            type="text"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Benefícios (separados por vírgula)"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-brand-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-brand-700 transition"
          >
            {initialProduct ? "Salvar" : "Cadastrar"}
          </button>
          {onCancel && (
            <button
              type="button"
              className="bg-stone-200 text-stone-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-stone-300 transition"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProductForm;
