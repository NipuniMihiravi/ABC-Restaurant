
import abc.example.abcResturant.Model.Gallery;
import abc.example.abcResturant.Validation.GalleryValidation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

public class GalleryValidationTest {

    @Test
    public void testValidGalleryName() {
        assertTrue(GalleryValidation.isValidGalleryName("Restaurant Interiors"));
        assertFalse(GalleryValidation.isValidGalleryName("")); // Invalid: empty string
        assertFalse(GalleryValidation.isValidGalleryName(null)); // Invalid: null
        assertFalse(GalleryValidation.isValidGalleryName("A".repeat(101))); // Invalid: length > 100
    }

    @Test
    public void testValidImageData() {
        assertTrue(GalleryValidation.isValidImageData("base64EncodedImageDataHere"));
        assertFalse(GalleryValidation.isValidImageData("")); // Invalid: empty string
        assertFalse(GalleryValidation.isValidImageData(null)); // Invalid: null
    }

    @Test
    public void testValidItem() {
        Gallery.Item validItem = new Gallery.Item("1", "base64EncodedImageDataHere");
        assertTrue(GalleryValidation.isValidItem(validItem));

        Gallery.Item invalidItem = new Gallery.Item("", ""); // Invalid: empty id and imageData
        assertFalse(GalleryValidation.isValidItem(invalidItem));
    }

    @Test
    public void testValidGallery() {
        List<Gallery.Item> images = new ArrayList<>();
        images.add(new Gallery.Item("1", "base64EncodedImageDataHere"));

        Gallery validGallery = new Gallery("1", "Restaurant Interiors", images);
        assertTrue(GalleryValidation.isValidGallery(validGallery));

        Gallery invalidGallery = new Gallery("", "", images); // Invalid: gallery id
        assertFalse(GalleryValidation.isValidGallery(invalidGallery));
    }
}
