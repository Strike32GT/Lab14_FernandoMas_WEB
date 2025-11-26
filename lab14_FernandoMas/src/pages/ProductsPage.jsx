import { useEffect, useState } from "react";
import {
  getProductos,
  createProductos,
  updateProductos,
  deleteProductos,
} from "../api/productos";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const loadProductos = async () => {
    setLoading(true);
    try {
      const { data } = await getProductos();
      setProductos(data);
    } catch (e) {
      console.error(e);
      alert("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductos();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (editingProducto) {
        await updateProductos(editingProducto.id, values);
      } else {
        await createProductos(values);
      }
      setEditingProducto(null);
      await loadProductos();
    } catch (e) {
      console.error(e);
      alert("Error al guardar el producto");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await deleteProductos(id);
      await loadProductos();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">
        Gestión de Productos
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        <ProductForm
          onSubmit={handleSubmit}
          editingProducto={editingProducto}
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-900">Listado</h2>
            {loading && (
              <span className="text-xs text-slate-500">Cargando...</span>
            )}
          </div>
          <ProductTable
            productos={productos}
            onEdit={setEditingProducto}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}