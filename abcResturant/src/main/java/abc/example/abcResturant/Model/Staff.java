package abc.example.abcResturant.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "staff")
public class Staff extends User {

    private String designation;
    private String branch;

    public Staff(String id, String email, String password, String fullName, String phoneNumber, String role, String designation, String branch) {
        super(id, email, password, fullName, phoneNumber, role);
        this.designation = designation;
        this.branch = branch;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}
