package abc.example.abcResturant.Validation;

import abc.example.abcResturant.Model.Facility;

public class FacilityValidation {

    // Validates that the heading is not null and has a reasonable length
    public static boolean isValidHeading(String heading) {
        return heading != null && !heading.trim().isEmpty() && heading.length() <= 100;
    }

    // Validates that the description is not null and within a reasonable length
    public static boolean isValidDescription(String description) {
        return description != null && description.length() <= 500;
    }

    public static boolean isValidImage(String image) {
        return image != null && !image.trim().isEmpty();
    }

    // Validates the entire Facility object
    public static boolean isValidFacility(Facility facility) {
        return facility != null &&
                isValidHeading(facility.getHeading()) &&
                isValidDescription(facility.getDescription()) &&
                isValidImage(facility.getImage());
    }
}
