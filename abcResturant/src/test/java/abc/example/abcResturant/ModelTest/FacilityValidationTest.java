package abc.example.abcResturant.ModelTest;

import abc.example.abcResturant.Model.Facility;
import abc.example.abcResturant.Validation.CoverValidation;
import abc.example.abcResturant.Validation.FacilityValidation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class FacilityValidationTest {

    @Test
    public void testValidHeading() {
        assertTrue(FacilityValidation.isValidHeading("Conference Room"));
        assertFalse(FacilityValidation.isValidHeading("")); // Invalid: empty string
        assertFalse(FacilityValidation.isValidHeading(null)); // Invalid: null
        assertFalse(FacilityValidation.isValidHeading("A".repeat(101))); // Invalid: length > 100
    }

    @Test
    public void testValidDescription() {
        assertTrue(FacilityValidation.isValidDescription("A spacious room equipped with modern amenities."));
        assertTrue(FacilityValidation.isValidDescription("")); // Valid: empty description
        assertFalse(FacilityValidation.isValidDescription(null)); // Invalid: null
        assertFalse(FacilityValidation.isValidDescription("A".repeat(501))); // Invalid: length > 500
    }

    @Test
    public void testValidImage() {
        assertTrue(CoverValidation.isValidImage("iVBORw0KGgoAAAANSUhEUgAAA...")); // Valid base64 string
        assertFalse(CoverValidation.isValidImage("")); // Invalid: not a base64 string
        assertFalse(CoverValidation.isValidImage(null)); // Invalid: null
    }

    @Test
    public void testValidFacility() {
        Facility validFacility = new Facility("1", "Pool Area", "Outdoor pool with seating.", "iVBORw0KGgoAAAANSUhEUgAAA...");
        assertTrue(FacilityValidation.isValidFacility(validFacility));

        Facility invalidFacility = new Facility("2", "", "B", "invalid-image-string");
        assertFalse(FacilityValidation.isValidFacility(invalidFacility));
    }
}
