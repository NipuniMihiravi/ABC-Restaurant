package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends MongoRepository<Query, String> {
}