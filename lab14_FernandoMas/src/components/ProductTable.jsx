export default function ProductTable({ productos, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              ID
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Nombre
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Precio
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Categoría ID
            </th>
            <th className="px-4 py-2 text-right font-semibold text-slate-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-4 text-center text-slate-500"
              >
                No hay productos registrados.
              </td>
            </tr>
          )}
          {productos.map((p) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">{p.nombre}</td>
              <td className="px-4 py-2">{p.precio}</td>
              <td className="px-4 py-2">{p.categoriaId}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}