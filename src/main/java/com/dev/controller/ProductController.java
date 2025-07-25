package com.dev.controller;

import com.dev.model.Product;
import com.dev.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ProductController {

    @Autowired
    private ProductService service;

    @PostMapping
    public Product create(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PutMapping
    public Product update(@RequestBody Product product) {
        return service.updateProduct(product);
    }

    @PatchMapping("/{id}")
    public Product patch(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        return service.patchProduct(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.deleteProduct(id);
    }
}
