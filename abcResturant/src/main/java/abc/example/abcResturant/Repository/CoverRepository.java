package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Cover;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CoverRepository extends MongoRepository<Cover, String> {
}
