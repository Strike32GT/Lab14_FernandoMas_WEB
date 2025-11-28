import axios from "axios";

const apiProductos = axios.create({
  baseURL: "https://blissful-hope-production.up.railway.app",
});


export const getProductos = () => apiProductos.get("/api/productos");
export const createProductos = (data) => apiProductos.post("/api/productos", data);
export const updateProductos = (id, data) =>
    apiProductos.put(`/api/productos/${id}`, data);
export const deleteProductos = (id) =>
    apiProductos.delete(`/api/productos/${id}`);