package abc.example.abcResturant.ModelTest;

import abc.example.abcResturant.Validation.ReservationValidation;
import abc.example.abcResturant.Model.Reservation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReservationValidationTest {

    @Test
    public void testValidName() {
        assertTrue(ReservationValidation.isValidName("John Doe"));
        assertFalse(ReservationValidation.isValidName("John123")); // Invalid due to digits
        assertFalse(ReservationValidation.isValidName("John_Doe")); // Invalid due to underscore
        assertFalse(ReservationValidation.isValidName(null)); // Invalid due to null
    }

    @Test
    public void testValidContactNo() {
        assertTrue(ReservationValidation.isValidContactNo("1234567890")); // Valid 10-digit number
        assertFalse(ReservationValidation.isValidContactNo("12345")); // Invalid length
        assertFalse(ReservationValidation.isValidContactNo("12345678901")); // Invalid length
        assertFalse(ReservationValidation.isValidContactNo("abc1234567")); // Invalid due to non-digit characters
        assertFalse(ReservationValidation.isValidContactNo(null)); // Invalid due to null
    }

    @Test
    public void testValidEmail() {
        assertTrue(ReservationValidation.isValidUsername("valid@example.com")); // Valid email format
        assertFalse(ReservationValidation.isValidUsername("invalid-email.com")); // Invalid due to missing '@'
        assertFalse(ReservationValidation.isValidUsername("invalid@com")); // Invalid due to missing domain
        assertFalse(ReservationValidation.isValidUsername(null)); // Invalid due to null
    }

    @Test
    public void testValidDate() {
        assertTrue(ReservationValidation.isValidDate("2024-08-30")); // Valid date format
        assertFalse(ReservationValidation.isValidDate("30-08-2024")); // Invalid format
        assertFalse(ReservationValidation.isValidDate("2024/08/30")); // Invalid format
        assertFalse(ReservationValidation.isValidDate(null)); // Invalid due to null
    }

    @Test
    public void testValidTime() {
        assertTrue(ReservationValidation.isValidTime("14:30")); // Valid time format
        assertFalse(ReservationValidation.isValidTime("2:30")); // Invalid format
        assertFalse(ReservationValidation.isValidTime("14:300")); // Invalid format
        assertFalse(ReservationValidation.isValidTime(null)); // Invalid due to null
    }

    @Test
    public void testValidGuests() {
        assertTrue(ReservationValidation.isValidGuests(50)); // Valid number of guests
        assertFalse(ReservationValidation.isValidGuests(0)); // Invalid, less than minimum
        assertFalse(ReservationValidation.isValidGuests(101)); // Invalid, more than maximum
        assertFalse(ReservationValidation.isValidGuests(-5)); // Invalid, negative number
    }

    @Test
    public void testValidOutlet() {
        assertTrue(ReservationValidation.isValidOutlet("Downtown")); // Valid outlet name
        assertFalse(ReservationValidation.isValidOutlet("Downtown1")); // Invalid due to digit
        assertFalse(ReservationValidation.isValidOutlet("Downtown@")); // Invalid due to special character
        assertFalse(ReservationValidation.isValidOutlet(null)); // Invalid due to null
    }

    @Test
    public void testValidSpecialNote() {
        assertTrue(ReservationValidation.isValidSpecialNote(null)); // Valid as null is acceptable
        assertTrue(ReservationValidation.isValidSpecialNote("Allergy to nuts")); // Valid, within length limit
        assertFalse(ReservationValidation.isValidSpecialNote("A".repeat(256))); // Invalid, exceeds length limit
    }

    @Test
    public void testValidStatus() {
        assertTrue(ReservationValidation.isValidStatus("Pending")); // Valid status
        assertTrue(ReservationValidation.isValidStatus("Confirmed")); // Valid status
        assertTrue(ReservationValidation.isValidStatus("Reject")); // Valid status
        assertFalse(ReservationValidation.isValidStatus("Accepted")); // Invalid status
        assertFalse(ReservationValidation.isValidStatus(null)); // Invalid due to null
    }

    @Test
    public void testValidReservation() {
        Reservation validReservation = new Reservation("1", "John Doe", "1234567890", "valid@example.com", "2024-08-30", "14:30", 4, "Downtown", "No special requests", "Pending");
        assertTrue(ReservationValidation.isValidReservation(validReservation));

        Reservation invalidReservation = new Reservation("2", "Jane Doe", "12345", "invalid-email.com", "2024-08-30", "14:30", 101, "Downtown", "Too long special note " + "A".repeat(256), "Accepted");
        assertFalse(ReservationValidation.isValidReservation(invalidReservation));
    }
}
