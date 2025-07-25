package com.dev.service;

import com.dev.model.Product;
import java.util.List;
import java.util.Map;

public interface ProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(int id);
    Product updateProduct(Product product);
    Product patchProduct(int id, Map<String, Object> updates);
    void deleteProduct(int id);
}