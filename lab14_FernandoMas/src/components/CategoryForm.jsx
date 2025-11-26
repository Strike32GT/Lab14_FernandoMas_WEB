import { useState, useEffect } from "react";

export default function CategoryForm({ onSubmit, editingCategoria }) {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingCategoria) {
      setNombre(editingCategoria.nombre || "");
      setError("");
    } else {
      setNombre("");
      setError("");
    }
  }, [editingCategoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    onSubmit({ nombre: nombre.trim() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {editingCategoria ? "Editar Categoría" : "Nueva Categoría"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Ej: Electrónicos"
        />
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        {editingCategoria ? "Actualizar" : "Registrar"}
      </button>
    </form>
  );
}