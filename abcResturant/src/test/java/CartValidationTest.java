import abc.example.abcResturant.Model.Cart;
import abc.example.abcResturant.Validation.CartValidation;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class CartValidationTest {

    @Test
    public void testValidPhoneNumber() {
        assertTrue(CartValidation.isValidPhoneNumber("0123456789"));
        assertFalse(CartValidation.isValidPhoneNumber("12345")); // Invalid: too short
        assertFalse(CartValidation.isValidPhoneNumber(null)); // Invalid: null
        assertFalse(CartValidation.isValidPhoneNumber("01234567890")); // Invalid: too long
    }

    @Test
    public void testValidAddress() {

        assertTrue(CartValidation.isValidAddress("123 Main Street")); // Valid address
        assertFalse(CartValidation.isValidAddress("")); // Invalid: empty string
        assertFalse(CartValidation.isValidAddress(null)); // Invalid: null
        assertFalse(CartValidation.isValidAddress("123")); // Invalid: too short
        assertTrue(CartValidation.isValidAddress("123 Main Street, Apt 4B, Springfield, IL 62701")); // Valid: longer address
        assertFalse(CartValidation.isValidAddress("A".repeat(101))); // Invalid: too long (assuming max length is 100)
    }

    @Test
    public void testValidCartItem() {
        Cart.CartItem validItem = new Cart.CartItem("1", "Sushi", 9.99, 2);
        assertTrue(CartValidation.isValidCartItem(validItem));

        Cart.CartItem invalidItem = new Cart.CartItem("2", "", 0, 0); // Invalid: empty name, price <= 0, quantity <= 0
        assertFalse(CartValidation.isValidCartItem(invalidItem));
    }



    @Test
    public void testValidOption() {
        assertTrue(CartValidation.isValidOption("delivery"));
        assertTrue(CartValidation.isValidOption("pickup"));
        assertFalse(CartValidation.isValidOption(null)); // Invalid: null
        assertFalse(CartValidation.isValidOption("express")); // Invalid: not "delivery" or "pickup"
    }

    @Test
    public void testValidStatus() {
        assertTrue(CartValidation.isValidStatus("pending"));
        assertTrue(CartValidation.isValidStatus("confirmed"));
        assertTrue(CartValidation.isValidStatus("delivered"));
        assertFalse(CartValidation.isValidStatus(null)); // Invalid: null
        assertFalse(CartValidation.isValidStatus("canceled")); // Invalid: not "pending", "confirmed", or "delivered"
    }

    @Test
    public void testValidCart() {
        List<Cart.CartItem> items = new ArrayList<>();
        items.add(new Cart.CartItem("1", "Sushi", 9.99, 2));
        Cart validCart = new Cart("1", "order1", "John Doe", items, "0123456789", "123 Main Street", "delivery", "outlet1", "pending");
        assertTrue(CartValidation.isValidCart(validCart));

        Cart invalidCart = new Cart("2", "order2", "", items, "12345", "", "pickup", "", "null"); // Invalid: empty username, invalid phone, empty address, invalid outlet
        assertFalse(CartValidation.isValidCart(invalidCart));
    }
}
