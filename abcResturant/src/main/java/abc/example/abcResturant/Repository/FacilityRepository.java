package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Facility;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FacilityRepository extends MongoRepository<Facility, String> {
}