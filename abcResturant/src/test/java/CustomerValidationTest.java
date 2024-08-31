import abc.example.abcResturant.Validation.CustomerValidation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CustomerValidationTest {

    @Test
    public void testValidUsername() {
        assertTrue(CustomerValidation.isValidUsername("validUser123"));
        assertFalse(CustomerValidation.isValidUsername("us")); // Invalid: too short
        assertFalse(CustomerValidation.isValidUsername("thisIsAVeryLongUsername123")); // Invalid: too long
        assertFalse(CustomerValidation.isValidUsername("invalid user")); // Invalid: contains spaces
        assertFalse(CustomerValidation.isValidUsername(null)); // Invalid: null
    }

    @Test
    public void testValidPassword() {
        assertTrue(CustomerValidation.isValidPassword("Valid1234")); // Valid: meets all criteria
        assertFalse(CustomerValidation.isValidPassword("short")); // Invalid: too short
        assertFalse(CustomerValidation.isValidPassword("alllowercase123")); // Invalid: no uppercase letter
        assertFalse(CustomerValidation.isValidPassword("ALLUPPERCASE123")); // Invalid: no lowercase letter
        assertFalse(CustomerValidation.isValidPassword(null)); // Invalid: null
    }

    @Test
    public void testValidPhoneNumber() {
        assertTrue(CustomerValidation.isValidPhoneNumber("0123456789")); // Valid: 10 digits
        assertFalse(CustomerValidation.isValidPhoneNumber("12345")); // Invalid: too short
        assertFalse(CustomerValidation.isValidPhoneNumber("01234567890")); // Invalid: too long
        assertFalse(CustomerValidation.isValidPhoneNumber("abc1234567")); // Invalid: contains letters
        assertFalse(CustomerValidation.isValidPhoneNumber(null)); // Invalid: null
    }

    @Test
    public void testValidCustomerRegistration() {
        assertTrue(CustomerValidation.isValidCustomerRegistration("validUser123", "Valid1234", "0123456789"));
        assertFalse(CustomerValidation.isValidCustomerRegistration("", "Valid1234", "0123456789")); // Invalid: username
        assertFalse(CustomerValidation.isValidCustomerRegistration("validUser123", "short", "0123456789")); // Invalid: password
        assertFalse(CustomerValidation.isValidCustomerRegistration("validUser123", "Valid1234", "12345")); // Invalid: phone number
    }
}
