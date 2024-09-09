package abc.example.abcResturant.ModelTest;

import abc.example.abcResturant.Model.Cover;
import abc.example.abcResturant.Validation.CoverValidation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CoverValidationTest {

    @Test
    public void testValidHeading() {
        assertTrue(CoverValidation.isValidHeading("Summer Collection"));
        assertFalse(CoverValidation.isValidHeading("")); // Invalid: empty string
        assertFalse(CoverValidation.isValidHeading(null)); // Invalid: null
        assertFalse(CoverValidation.isValidHeading("A".repeat(101))); // Invalid: length > 100
    }

    @Test
    public void testValidDescription() {
        assertTrue(CoverValidation.isValidDescription("A beautiful cover for our new summer collection."));
        assertTrue(CoverValidation.isValidDescription("")); // Valid: empty description
        assertFalse(CoverValidation.isValidDescription(null)); // Invalid: null
        assertFalse(CoverValidation.isValidDescription("A".repeat(501))); // Invalid: length > 500
    }

    @Test
    public void testValidImage() {
        assertTrue(CoverValidation.isValidImage("iVBORw0KGgoAAAANSUhEUgAAA...")); // Valid base64 string
        assertFalse(CoverValidation.isValidImage("")); // Invalid: not a base64 string
        assertFalse(CoverValidation.isValidImage(null)); // Invalid: null
    }

    @Test
    public void testValidCover() {
        Cover validCover = new Cover();
        validCover.setHeading("Summer Collection");
        validCover.setDescription("A beautiful cover for our new summer collection.");
        validCover.setImage("iVBORw0KGgoAAAANSUhEUgAAA..."); // Valid base64 image string

        assertTrue(CoverValidation.isValidCover(validCover));

        Cover invalidCover = new Cover();
        invalidCover.setHeading(""); // Invalid heading
        invalidCover.setDescription("");
        invalidCover.setImage("invalid-image-string"); // Invalid image

        assertFalse(CoverValidation.isValidCover(invalidCover));
    }
}
