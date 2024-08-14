package abc.example.abcResturant.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@Document(collection = "admin")
public class Admin extends User {
    public Admin(String id, String username, String password, String fullName, String phoneNumber) {
        super(id, username, password, fullName, phoneNumber);
    }
}
