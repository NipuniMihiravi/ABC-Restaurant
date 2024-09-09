package abc.example.abcResturant.Repository;

import abc.example.abcResturant.Model.Admin;
import abc.example.abcResturant.Model.Customer;
import abc.example.abcResturant.Model.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends MongoRepository<Staff, String> {
    Optional<Staff> findByUsername(String username);
}