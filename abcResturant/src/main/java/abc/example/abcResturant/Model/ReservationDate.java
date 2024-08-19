package abc.example.abcResturant.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

@Document(collection = "reservationDate")
public class ReservationDate {
    @Id
    private ObjectId id;
    private String date;
    private int reservedTables; // Number of tables already reserved for this date
    private boolean isFrozen; // Indicates if the date is frozen

    public ReservationDate() {
    }

    public ReservationDate(ObjectId id, String date, int reservedTables, boolean isFrozen) {
        this.id = id;
        this.date = date;
        this.reservedTables = reservedTables;
        this.isFrozen = isFrozen;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getReservedTables() {
        return reservedTables;
    }

    public void setReservedTables(int reservedTables) {
        this.reservedTables = reservedTables;
    }

    public boolean isFrozen() {
        return isFrozen;
    }

    public void setFrozen(boolean frozen) {
        isFrozen = frozen;
    }
}

