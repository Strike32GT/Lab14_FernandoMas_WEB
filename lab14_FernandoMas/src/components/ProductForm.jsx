import { useEffect, useState } from "react";
import { getCategorias } from "../api/categorias";

export default function ProductForm({ onSubmit, editingProducto }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});

  // Cargar categorías para el select
  const loadCategorias = async () => {
    try {
      const { data } = await getCategorias();
      setCategorias(data);
    } catch (e) {
      console.error(e);
      alert("Error al cargar categorías para productos");
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  // Rellenar formulario cuando se edita
  useEffect(() => {
    if (editingProducto) {
      setNombre(editingProducto.nombre ?? "");
      setPrecio(editingProducto.precio ?? "");
      setCategoriaId(editingProducto.categoriaId ?? "");
      setErrors({});
    } else {
      setNombre("");
      setPrecio("");
      setCategoriaId("");
      setErrors({});
    }
  }, [editingProducto]);

  const validate = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!precio || Number(precio) <= 0)
      newErrors.precio = "El precio debe ser mayor que 0";
    if (!categoriaId) newErrors.categoriaId = "Seleccione una categoría";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      nombre: nombre.trim(),
      precio: Number(precio),
      categoriaId: Number(categoriaId),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {editingProducto ? "Editar Producto" : "Nuevo Producto"}
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
          placeholder="Ej: Laptop"
        />
        {errors.nombre && (
          <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Precio
        </label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Ej: 1500.00"
        />
        {errors.precio && (
          <p className="mt-1 text-xs text-red-600">{errors.precio}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Categoría
        </label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {errors.categoriaId && (
          <p className="mt-1 text-xs text-red-600">{errors.categoriaId}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        {editingProducto ? "Actualizar" : "Registrar"}
      </button>
    </form>
  );
}