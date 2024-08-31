package abc.example.abcResturant.Validation;
import abc.example.abcResturant.Model.Cover;

import java.util.Base64;

public class CoverValidation {

    public static boolean isValidHeading(String heading) {
        return heading != null && heading.length() > 0 && heading.length() <= 100;
    }

    public static boolean isValidDescription(String description) {
        return description != null && description.length() <= 500;
    }

    public static boolean isValidImage(String image) {
        return image != null && !image.trim().isEmpty();
    }

    public static boolean isValidCover(Cover cover) {
        return cover != null &&
                isValidHeading(cover.getHeading()) &&
                isValidDescription(cover.getDescription()) &&
                isValidImage(cover.getImage());
    }
}
