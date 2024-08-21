package abc.example.abcResturant.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "reservation")
public class Reservation {
    @Id
    private String id;
    private String name;
    private String contactNo;
    private String username;
    private String date;
    private String time;
    private int guests;
    private String outlet;
    private String specialNote;
    private String status;

    public Reservation(String id, String name, String contactNo, String username, String date, String time, int guests, String outlet, String specialNote, String status) {
        this.id = id;
        this.name = name;
        this.contactNo = contactNo;
        this.username = username;
        this.date = date;
        this.time = time;
        this.guests = guests;
        this.outlet = outlet;
        this.specialNote = specialNote;
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

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public String getSpecialNote() {
        return specialNote;
    }

    public void setSpecialNote(String specialNote) {
        this.specialNote = specialNote;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}


