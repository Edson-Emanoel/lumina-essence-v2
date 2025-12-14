import React, { useState, useEffect } from "react";
import { Product } from "./types";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setPrice(initialProduct.price.toString());
      setCategory(initialProduct.category);
      setDescription(initialProduct.description);
      setImage(initialProduct.image);
      setBenefits(initialProduct.benefits?.join(", ") || "");
    } else {
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage("");
      setBenefits("");
    }
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onSubmit({
      id: initialProduct?.id || Date.now().toString(),
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 max-w-xl mx-auto"
      >
        <button
          className="w-fit px-3 py-1.5 bg-stone-200 rounded-md"
          onClick={() => navigate("/admin/products")}
          type="button"
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

