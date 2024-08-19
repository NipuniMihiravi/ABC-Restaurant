package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.ReservationDate;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservationDateRepository extends MongoRepository<ReservationDate, ObjectId> {
    ReservationDate findByDate(String date);
}