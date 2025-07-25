package com.dev.service;

import com.dev.model.Product;
import com.dev.dao.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repo;

    @Override
    public Product saveProduct(Product product) {
        product.setCreatedTimestamp(LocalDateTime.now());
        product.setUpdatedTimestamp(LocalDateTime.now());
        return repo.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    @Override
    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Product updateProduct(Product product) {
        product.setUpdatedTimestamp(LocalDateTime.now());
        return repo.save(product);
    }

    @Override
    public Product patchProduct(int id, Map<String, Object> updates) {
        Product product = repo.findById(id).orElse(null);
        if (product != null) {
            updates.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Product.class, key);
                if (field != null) {
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, product, value);
                }
            });
            product.setUpdatedTimestamp(LocalDateTime.now());
            return repo.save(product);
        }
        return null;
    }

    @Override
    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
}