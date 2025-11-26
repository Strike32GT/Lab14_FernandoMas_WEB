export default function CategoryTable({ categories, onEdit, onDelete }) {
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
            <th className="px-4 py-2 text-right font-semibold text-slate-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center text-slate-500">
                No hay categorías registradas.
              </td>
            </tr>
          )}
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t border-slate-100">
              <td className="px-4 py-2">{cat.id}</td>
              <td className="px-4 py-2">{cat.nombre}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(cat.id)}
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