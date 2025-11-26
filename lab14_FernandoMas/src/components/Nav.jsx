import { Link, useLocation } from "react-router-dom";


export default function Nav(){
    const { pathname } = useLocation();

    const linkClass = (path) => `px-4 py-2 rounded-md text-sm font-medium ${
        pathname === path
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-200"
    }`;

    
    return(
        <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">
                    Inventario-App
                </span>
                <div className="flex gap-2">
                    <Link to="/categorias" className={linkClass("/categorias")}>Categorias</Link>
                    <Link to="/productos" className={linkClass("/productos")}>Productos</Link>
                </div>
            </div>
        </nav>
    );
}