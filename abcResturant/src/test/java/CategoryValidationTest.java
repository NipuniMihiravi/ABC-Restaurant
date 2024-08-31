
import abc.example.abcResturant.Model.Category;
import abc.example.abcResturant.Validation.CategoryValidation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

public class CategoryValidationTest {

    @Test
    public void testValidCategoryName() {
        assertTrue(CategoryValidation.isValidCategoryName("Appetizers"));
        assertFalse(CategoryValidation.isValidCategoryName("")); // Invalid: empty string
        assertFalse(CategoryValidation.isValidCategoryName(null)); // Invalid: null
        assertFalse(CategoryValidation.isValidCategoryName("A".repeat(101))); // Invalid: length > 100
    }

    @Test
    public void testValidItemName() {
        assertTrue(CategoryValidation.isValidItemName("Chicken Wings"));
        assertFalse(CategoryValidation.isValidItemName("")); // Invalid: empty string
        assertFalse(CategoryValidation.isValidItemName(null)); // Invalid: null
        assertFalse(CategoryValidation.isValidItemName("A".repeat(101))); // Invalid: length > 100
    }

    @Test
    public void testValidItemNumber() {
        assertTrue(CategoryValidation.isValidItemNumber("001"));
        assertFalse(CategoryValidation.isValidItemNumber("A001")); // Invalid: non-numeric
        assertFalse(CategoryValidation.isValidItemNumber(null)); // Invalid: null
    }

    @Test
    public void testValidItemPrice() {
        assertTrue(CategoryValidation.isValidItemPrice(10.50));
        assertTrue(CategoryValidation.isValidItemPrice(0)); // Valid: zero price
        assertFalse(CategoryValidation.isValidItemPrice(-1)); // Invalid: negative price
    }

    @Test
    public void testValidItemDescription() {
        assertTrue(CategoryValidation.isValidItemDescription("Crispy chicken wings with a side of ranch."));
        assertFalse(CategoryValidation.isValidItemDescription(null)); // Invalid: null
        assertFalse(CategoryValidation.isValidItemDescription("A".repeat(501))); // Invalid: length > 500
    }

    @Test
    public void testValidItemImage() {
        byte[] validImage = new byte[]{1, 2, 3, 4};
        byte[] invalidImage = new byte[0];
        assertTrue(CategoryValidation.isValidItemImage(validImage));
        assertFalse(CategoryValidation.isValidItemImage(invalidImage)); // Invalid: empty image
        assertFalse(CategoryValidation.isValidItemImage(null)); // Invalid: null
    }

    @Test
    public void testValidItem() {
        Category.Item validItem = new Category.Item("1", "Chicken Wings", "001", 10.50, "Crispy chicken wings.", new byte[]{1, 2, 3, 4});
        assertTrue(CategoryValidation.isValidItem(validItem));

        Category.Item invalidItem = new Category.Item("", "Chicken Wings", "A001", 0, "", new byte[0]);
        assertFalse(CategoryValidation.isValidItem(invalidItem)); // Invalid: name, number, and image
    }

    @Test
    public void testValidCategory() {
        List<Category.Item> items = new ArrayList<>();
        items.add(new Category.Item("1", "Chicken Wings", "001", 10.50, "Crispy chicken wings.", new byte[]{1, 2, 3, 4}));

        Category validCategory = new Category("1", "Appetizers", items);
        assertTrue(CategoryValidation.isValidCategory(validCategory));

        Category invalidCategory = new Category("", "", items);
        assertFalse(CategoryValidation.isValidCategory(invalidCategory)); // Invalid: category id
    }
}
