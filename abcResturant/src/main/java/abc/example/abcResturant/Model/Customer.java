package abc.example.abcResturant.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "customer")
public class Customer extends User {
    public Customer(String id, String email, String password, String fullName, String phoneNumber, String role) {
        super(id, email, password, fullName, phoneNumber, role);
    }
}
