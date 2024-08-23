package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Table;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TableRepository extends MongoRepository<Table, String> {

}




