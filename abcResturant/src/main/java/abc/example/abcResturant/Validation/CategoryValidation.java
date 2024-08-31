package abc.example.abcResturant.Validation;

import abc.example.abcResturant.Model.Category;

public class CategoryValidation {

    // Validates that the category name is not null and has a reasonable length
    public static boolean isValidCategoryName(String name) {
        return name != null && !name.trim().isEmpty() && name.length() <= 100;
    }

    // Validates that the item name is not null and has a reasonable length
    public static boolean isValidItemName(String name) {
        return name != null && !name.trim().isEmpty() && name.length() <= 100;
    }

    // Validates that the item number is not null and is numeric
    public static boolean isValidItemNumber(String number) {
        return number != null && number.matches("\\d+");
    }

    // Validates that the item price is non-negative
    public static boolean isValidItemPrice(double price) {
        return price >= 0;
    }

    // Validates that the item description is within a reasonable length
    public static boolean isValidItemDescription(String description) {
        return description != null && description.length() <= 500;
    }

    // Validates that the item image is not null and has a valid size
    public static boolean isValidItemImage(byte[] image) {
        return image != null && image.length > 0;
    }

    // Validates the entire Item object
    public static boolean isValidItem(Category.Item item) {
        return item != null &&
                isValidItemName(item.getName()) &&
                isValidItemNumber(item.getNumber()) &&
                isValidItemPrice(item.getPrice()) &&
                isValidItemDescription(item.getDescription()) &&
                isValidItemImage(item.getImage());
    }

    // Validates the entire Category object
    public static boolean isValidCategory(Category category) {
        if (category == null || !isValidCategoryName(category.getName())) {
            return false;
        }
        if (category.getItems() != null) {
            for (Category.Item item : category.getItems()) {
                if (!isValidItem(item)) {
                    return false;
                }
            }
        }
        return true;
    }
}
