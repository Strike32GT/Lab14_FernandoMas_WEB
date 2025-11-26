import axios from "axios";

const apiProductos = axios.create({
  baseURL: "http://localhost:8082",
});


export const getProductos = () => apiProductos.get("/api/productos");
export const createProductos = (data) => apiProductos.post("/api/productos", data);
export const updateProductos = (id, data) =>
    apiProductos.put(`/api/productos/${id}`, data);
export const deleteProductos = (id) =>
    apiProductos.delete(`/api/productos/${id}`);