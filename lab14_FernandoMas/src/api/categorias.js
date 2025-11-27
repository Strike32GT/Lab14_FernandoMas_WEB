import axios from "axios";

const apiCategorias = axios.create({
  baseURL: "https://lab14fernandomasweb-production-52da.up.railway.app",
});


export const getCategorias = () => apiCategorias.get("/api/categorias");
export const createCategoria = (data) => apiCategorias.post("/api/categorias", data);
export const updateCategoria = (id, data) =>
    apiCategorias.put(`/api/categorias/${id}`, data);
export const deleteCategoria = (id) =>
    apiCategorias.delete(`/api/categorias/${id}`);