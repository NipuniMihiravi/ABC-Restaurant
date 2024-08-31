package abc.example.abcResturant.Validation;

import abc.example.abcResturant.Model.Cart;
import java.util.List;

public class CartValidation {

    // Validate phone number (basic validation for non-null and proper length)
    public static boolean isValidPhoneNumber(String phoneNumber) {
        return phoneNumber != null && phoneNumber.matches("\\d{10}");
    }

    public static boolean isValidAddress(String address) {
        if (address == null || address.isEmpty()) return false;
        return address.length() >= 5 && address.length() <= 100;
    }

    // Validate cart item (non-null and proper fields)
    public static boolean isValidCartItem(Cart.CartItem item) {
        return item != null &&
                item.getName() != null && !item.getName().trim().isEmpty() &&
                item.getPrice() > 0 &&
                item.getQuantity() > 0;
    }

    public static boolean isValidOption(String option) {
        return option != null && (option.equals("delivery") || option.equals("pickup"));
    }

    // Validate status (must be "pending", "confirmed", or "delivered")
    public static boolean isValidStatus(String status) {
        return status != null && (status.equals("pending") || status.equals("confirmed") || status.equals("delivered"));
    }

    // Updated isValidCart method to include new validations
    public static boolean isValidCart(Cart cart) {
        if (cart == null || cart.getUserName() == null || cart.getUserName().trim().isEmpty()) {
            return false;
        }
        if (!isValidPhoneNumber(cart.getPhoneNumber()) || !isValidAddress(cart.getAddress())) {
            return false;
        }

        List<Cart.CartItem> items = cart.getItems();
        if (items == null || items.isEmpty()) {
            return false;
        }
        for (Cart.CartItem item : items) {
            if (!isValidCartItem(item)) {
                return false;
            }
        }
        return true;
    }


}
