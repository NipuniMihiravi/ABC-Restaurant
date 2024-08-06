package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}
