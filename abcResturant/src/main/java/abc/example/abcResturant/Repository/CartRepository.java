package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUserName(String userName);
    // You can add custom query methods here if needed
}