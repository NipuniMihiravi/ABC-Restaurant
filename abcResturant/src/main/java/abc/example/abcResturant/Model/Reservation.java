package abc.example.abcResturant.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reservations")
public class Reservation {
    @Id
    private String id;
    private String reservationType; // "partyRoom" or "table"
    private String name;
    private String contactNumber;
    private String email;
    private int numberOfGuests;
    private String partyDate;
    private String reservationDate;

    public Reservation(String id, String reservationType, String name, String contactNumber, String email, int numberOfGuests, String partyDate, String reservationDate) {
        this.id = id;
        this.reservationType = reservationType;
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.numberOfGuests = numberOfGuests;
        this.partyDate = partyDate;
        this.reservationDate = reservationDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReservationType() {
        return reservationType;
    }

    public void setReservationType(String reservationType) {
        this.reservationType = reservationType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public String getPartyDate() {
        return partyDate;
    }

    public void setPartyDate(String partyDate) {
        this.partyDate = partyDate;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }
}

