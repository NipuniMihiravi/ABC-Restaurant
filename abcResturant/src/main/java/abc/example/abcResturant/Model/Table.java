package abc.example.abcResturant.Model;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "table")

public class Table {
    @Id
    private ObjectId id;
    private String name;
    private String contactNo;
    private String email;
    private String date;
    private String time;
    private Integer guests;
    private String outlet;
    private String status;

    public Table(ObjectId id, String name, String contactNo, String email, String date, String time, Integer guests, String outlet, String status) {
        this.id = id;
        this.name = name;
        this.contactNo = contactNo;
        this.email = email;
        this.date = date;
        this.time = time;
        this.guests = guests;
        this.outlet = outlet;
        this.status = status;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getGuests() {
        return guests;
    }

    public void setGuests(Integer guests) {
        this.guests = guests;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}



