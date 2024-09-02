package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Category;
import org.eclipse.angus.mail.imap.protocol.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepository extends MongoRepository<Category, String> {

}
