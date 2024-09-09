package abc.example.abcResturant.ModelTest;

import abc.example.abcResturant.Model.Table;
import abc.example.abcResturant.Validation.TableValidation;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TableValidationTest {

    @Test
    public void testValidName() {
        assertTrue(TableValidation.isValidName("John Doe"));
        assertFalse(TableValidation.isValidName("John123")); // Invalid due to digits
        assertFalse(TableValidation.isValidName("John_Doe")); // Invalid due to underscore
        assertFalse(TableValidation.isValidName(null)); // Invalid due to null
    }

    @Test
    public void testValidContactNo() {
        assertTrue(TableValidation.isValidContactNo("1234567890")); // Valid 10-digit number
        assertFalse(TableValidation.isValidContactNo("12345")); // Invalid length
        assertFalse(TableValidation.isValidContactNo("12345678901")); // Invalid length
        assertFalse(TableValidation.isValidContactNo("abc1234567")); // Invalid due to non-digit characters
        assertFalse(TableValidation.isValidContactNo(null)); // Invalid due to null
    }

    @Test
    public void testValidUsername() {
        assertTrue(TableValidation.isValidUsername("valid@example.com")); // Valid email format
        assertFalse(TableValidation.isValidUsername("invalid-email.com")); // Invalid due to missing '@'
        assertFalse(TableValidation.isValidUsername("invalid@com")); // Invalid due to missing domain
        assertFalse(TableValidation.isValidUsername(null)); // Invalid due to null
    }

    @Test
    public void testValidDate() {
        assertTrue(TableValidation.isValidDate("2024-08-30")); // Valid date format
        assertFalse(TableValidation.isValidDate("30-08-2024")); // Invalid format
        assertFalse(TableValidation.isValidDate("2024/08/30")); // Invalid format
        assertFalse(TableValidation.isValidDate(null)); // Invalid due to null
    }

    @Test
    public void testValidTime() {
        assertTrue(TableValidation.isValidTime("14:30")); // Valid time format
        assertFalse(TableValidation.isValidTime("2:30")); // Invalid format
        assertFalse(TableValidation.isValidTime("14:300")); // Invalid format
        assertFalse(TableValidation.isValidTime(null)); // Invalid due to null
    }

    @Test
    public void testValidGuests() {
        assertTrue(TableValidation.isValidGuests(50)); // Valid number of guests
        assertFalse(TableValidation.isValidGuests(0)); // Invalid, less than minimum
        assertFalse(TableValidation.isValidGuests(101)); // Invalid, more than maximum
        assertFalse(TableValidation.isValidGuests(null)); // Invalid due to null
    }

    @Test
    public void testValidOutlet() {
        assertTrue(TableValidation.isValidOutlet("Downtown")); // Valid outlet name
        assertFalse(TableValidation.isValidOutlet("Downtown1")); // Invalid due to digit
        assertFalse(TableValidation.isValidOutlet("Downtown@")); // Invalid due to special character
        assertFalse(TableValidation.isValidOutlet(null)); // Invalid due to null
    }

    @Test
    public void testValidTableNo() {
        assertTrue(TableValidation.isValidTableNo(5)); // Valid table number
        assertFalse(TableValidation.isValidTableNo(0)); // Invalid, less than 1
        assertFalse(TableValidation.isValidTableNo(null)); // Invalid due to null
    }

    @Test
    public void testValidStatus() {
        assertTrue(TableValidation.isValidStatus("Pending")); // Valid status
        assertTrue(TableValidation.isValidStatus("Confirmed")); // Valid status
        assertTrue(TableValidation.isValidStatus("Reject")); // Valid status
        assertFalse(TableValidation.isValidStatus("Accepted")); // Invalid status
        assertFalse(TableValidation.isValidStatus(null)); // Invalid due to null
    }

    @Test
    public void testValidTable() {
        Table validTable = new Table("1", "John Doe", "1234567890", "valid@example.com", "2024-08-30", "14:30", 4, "Downtown", 5, "Pending");
        assertTrue(TableValidation.isValidTable(validTable));

        Table invalidTable = new Table("2", "Jane Doe", "12345", "invalid-email.com", "2024-08-30", "14:30", 101, "Downtown", 0, "Accepted");
        assertFalse(TableValidation.isValidTable(invalidTable));
    }
}
