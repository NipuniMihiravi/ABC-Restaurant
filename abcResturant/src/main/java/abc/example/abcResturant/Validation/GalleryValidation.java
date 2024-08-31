package abc.example.abcResturant.Validation;

import abc.example.abcResturant.Model.Gallery;

public class GalleryValidation {

    // Validates that the gallery name is not null and has a reasonable length
    public static boolean isValidGalleryName(String name) {
        return name != null && !name.trim().isEmpty() && name.length() <= 100;
    }

    // Validates that the image data is not null and has a valid size
    public static boolean isValidImageData(String imageData) {
        return imageData != null && !imageData.trim().isEmpty();
    }

    // Validates the entire Item object
    public static boolean isValidItem(Gallery.Item item) {
        return item != null &&
                isValidImageData(item.getImageData());
    }

    // Validates the entire Gallery object
    public static boolean isValidGallery(Gallery gallery) {
        if (gallery == null || !isValidGalleryName(gallery.getName())) {
            return false;
        }
        if (gallery.getImages() != null) {
            for (Gallery.Item item : gallery.getImages()) {
                if (!isValidItem(item)) {
                    return false;
                }
            }
        }
        return true;
    }
}

