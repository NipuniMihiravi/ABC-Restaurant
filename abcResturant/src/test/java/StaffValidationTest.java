import abc.example.abcResturant.Model.Staff;
import org.junit.jupiter.api.Test;
import abc.example.abcResturant.Validation.StaffValidation;

import static org.junit.jupiter.api.Assertions.*;

public class StaffValidationTest {

    @Test
    public void testValidUsername() {
        assertTrue(StaffValidation.isValidUsername("validUser123"));
        assertFalse(StaffValidation.isValidUsername("us")); // Invalid: too short
        assertFalse(StaffValidation.isValidUsername("thisIsAVeryLongUsername123")); // Invalid: too long
        assertFalse(StaffValidation.isValidUsername("invalid user")); // Invalid: contains spaces
        assertFalse(StaffValidation.isValidUsername(null)); // Invalid: null
    }

    @Test
    public void testValidPassword() {
        assertTrue(StaffValidation.isValidPassword("Valid1234")); // Valid: meets all criteria
        assertFalse(StaffValidation.isValidPassword("short")); // Invalid: too short
        assertFalse(StaffValidation.isValidPassword("alllowercase123")); // Invalid: no uppercase letter
        assertFalse(StaffValidation.isValidPassword("ALLUPPERCASE123")); // Invalid: no lowercase letter
        assertFalse(StaffValidation.isValidPassword(null)); // Invalid: null
    }

    @Test
    public void testValidPhoneNumber() {
        assertTrue(StaffValidation.isValidPhoneNumber("0123456789")); // Valid: 10 digits
        assertFalse(StaffValidation.isValidPhoneNumber("12345")); // Invalid: too short
        assertFalse(StaffValidation.isValidPhoneNumber("01234567890")); // Invalid: too long
        assertFalse(StaffValidation.isValidPhoneNumber("abc1234567")); // Invalid: contains letters
        assertFalse(StaffValidation.isValidPhoneNumber(null)); // Invalid: null
    }

    @Test
    public void testValidDesignation() {
        assertTrue(StaffValidation.isValidDesignation("Manager")); // Valid designation
        assertFalse(StaffValidation.isValidDesignation("")); // Invalid: empty string
        assertFalse(StaffValidation.isValidDesignation("A".repeat(51))); // Invalid: too long
        assertFalse(StaffValidation.isValidDesignation(null)); // Invalid: null
    }

    @Test
    public void testValidBranch() {
        assertTrue(StaffValidation.isValidBranch("Main Branch")); // Valid branch
        assertFalse(StaffValidation.isValidBranch("")); // Invalid: empty string
        assertFalse(StaffValidation.isValidBranch("A".repeat(51))); // Invalid: too long
        assertFalse(StaffValidation.isValidBranch(null)); // Invalid: null
    }

    @Test
    public void testValidStaff() {
        Staff validStaff = new Staff("1", "validUser123", "Valid1234", "John Doe", "0123456789", "Manager", "Main Branch");
        assertTrue(StaffValidation.isValidStaff(validStaff));

        Staff invalidStaff = new Staff("2", "", "short", "John Doe", "12345", "", ""); // Invalid: username, password, phone number, designation, branch
        assertFalse(StaffValidation.isValidStaff(invalidStaff));
    }
}
