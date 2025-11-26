import { useEffect, useState } from "react";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../api/categorias"

import CategoriaForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";


export default function CategoriesPage() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingCategoria, setEditingCategoria] = useState(null);

    const loadCategorias = async () => {
        setLoading(true);
        try {
            const { data } = await getCategorias();
            setCategorias(data);
        } catch (e) {
            console.error(e);
            alert("error al cargar categorias");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategorias();
    }, []);

    const handleSubmit = async (values) => {
        try {
            if (editingCategoria) {
                await updateCategoria(editingCategoria.id, values);
            } else {
                await createCategoria(values);
            }
            setEditingCategoria(null);
            await loadCategorias();
        } catch (e) {
            console.error(e);
            alert("error al guardar categoria");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Eliminar esta categoria?")) return;
        try {
            await deleteCategoria(id);
            await loadCategorias();
        } catch (e) {
            console.error(e);
            alert("error al eliminar categoria");
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">Gestion de Categorias</h1>
            <div className="grid md:grid-cols-2 gap-4">
                <CategoriaForm onSubmit={handleSubmit} editingCategoria={editingCategoria} />
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-slate-900">Listado</h2>
                        {loading && (
                            <span className="text-xs text-slate-500">
                                Cargando ...
                            </span>
                        )}
                    </div>
                    <CategoryTable
                        categories={categorias}
                        onEdit={setEditingCategoria}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}