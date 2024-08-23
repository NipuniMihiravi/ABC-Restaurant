package abc.example.abcResturant.Model;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "table")

public class Table {
    @Id
    private String id;
    private String name;
    private String contactNo;
    private String username;
    private String date;
    private String time;
    private Integer guests;
    private String outlet;
    private Integer tableNo;
    private String status;

    public Table(String id, String name, String contactNo, String username, String date, String time, Integer guests, String outlet, Integer tableNo, String status) {
        this.id = id;
        this.name = name;
        this.contactNo = contactNo;
        this.username = username;
        this.date = date;
        this.time = time;
        this.guests = guests;
        this.outlet = outlet;
        this.tableNo = tableNo;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public Integer getTableNo() {
        return tableNo;
    }

    public void setTableNo(Integer tableNo) {
        this.tableNo = tableNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}



