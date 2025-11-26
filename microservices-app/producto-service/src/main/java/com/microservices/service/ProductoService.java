package com.microservices.service;

import com.microservices.model.Producto;
import com.microservices.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public List<Producto> listar() {
        return repository.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id){
        return repository.findById(id);
    }

    public Producto crear(Producto producto){
        return  repository.save(producto);
    }

    public Optional<Producto> actualizar(Long id, Producto datos){

        return repository.findById(id)
                .map(productoExistente ->{

                    productoExistente.setNombre(datos.getNombre());
                    productoExistente.setPrecio(datos.getPrecio());
                    productoExistente.setCategoriaId(datos.getCategoriaId());

                    return repository.save(productoExistente);
                });
    }

    public boolean eliminar(Long id){
        if (!repository.existsById(id)){
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
