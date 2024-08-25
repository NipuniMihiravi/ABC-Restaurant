package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Cart;
import abc.example.abcResturant.Service.CartService;
import abc.example.abcResturant.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.createCart(cart);

        // Build the email body with detailed cart information
        StringBuilder textBuilder = new StringBuilder();
        textBuilder.append(String.format("Thank you for your order with ABC Restaurant, %s.\n\n", cart.getUserName()));
        textBuilder.append("Your order is confirmed.\n\n");

        // Iterate over the items in the cart and append details
        for (Cart.CartItem item : createdCart.getItems()) {
            textBuilder.append(String.format("Item: %s\n", item.getName()));
            textBuilder.append(String.format("Quantity: %d\n", item.getQuantity()));
            textBuilder.append(String.format("Unit Price: Rs. %.2f\n", item.getPrice()));
            textBuilder.append(String.format("Total Price: Rs. %.2f\n\n", item.getTotal()));
        }

        // Add overall total price
        double total = createdCart.getItems().stream().mapToDouble(Cart.CartItem::getTotal).sum();
        textBuilder.append(String.format("Total Price: Rs. %.2f\n\n", total));

        // Add selected options
        textBuilder.append(String.format("Options:\n"));
        textBuilder.append(String.format("Outlet: %s\n", createdCart.getOutlet()));
        textBuilder.append(String.format("Delivery/Takeaway: %s\n", createdCart.getOption()));

        textBuilder.append("\nFor any clarification, please call the ABC Restaurant Front Desk.\n\n");
        textBuilder.append("ABC RESTAURANT \n");
        textBuilder.append("Telephone No: 0112744588");

        String emailBody = textBuilder.toString();

        // Send confirmation email
        String customerEmail = cart.getUserName(); // Ensure this is the correct email field
        String subject = "Order Confirmation";

        try {
            emailService.sendEmail(customerEmail, subject, emailBody);
        } catch (Exception e) {
            // Log the error and handle it appropriately
            return ResponseEntity.status(500).body(null); // Return an appropriate status if email sending fails
        }

        return ResponseEntity.ok(createdCart);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable String id) {
        Optional<Cart> cart = cartService.getCartById(id);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable String id, @RequestBody Cart updatedCart) {
        Cart cart = cartService.updateCart(id, updatedCart);
        if (cart != null) {
            // After successfully updating, check the status
            String status = cart.getStatus();
            if ("Ready".equalsIgnoreCase(status)) {
                // Construct the email body for confirmed status
                String emailBody = String.format(
                        "Thank you for your order with ABC Restaurant,\n\n" +
                                "Your order is ready at the outlet.\n\n" +
                                "Outlet: %s\n\n" +
                                "For any clarification, please call the ABC Restaurant Front Desk.\n\n" +
                                "ABC RESTAURANT \n" +
                                "Telephone No: 0112744588",
                        cart.getOutlet()
                );

                // Send the email for confirmed order
                emailService.sendEmail(
                        cart.getUserName(),
                        "Order is Ready",
                        emailBody
                );
            }

            return ResponseEntity.ok(cart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable String id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/total")
    public ResponseEntity<Double> getCartTotal(@PathVariable String id) {
        double total = cartService.calculateTotal(id);
        return ResponseEntity.ok(total);
    }

    @PutMapping("/{id}/total")
    public ResponseEntity<Cart> updateCartTotal(@PathVariable String id, @RequestBody Cart cart) {
        Optional<Cart> existingCart = cartService.getCartById(id);
        if (existingCart.isPresent()) {
            Cart updatedCart = existingCart.get();
            updatedCart.setTotal(cart.getTotal());
            return ResponseEntity.ok(cartService.updateCart(updatedCart));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/temp")
    public ResponseEntity<Cart> saveTempCart(@RequestBody Cart cart) {
        // Handle saving of temporary cart
        return ResponseEntity.ok(cartService.saveTempCart(cart));
    }

    // Endpoint to get temporary cart data by userName
    @GetMapping("/temp")
    public ResponseEntity<Cart> getTempCart(@RequestParam String userName) {
        // Handle retrieval of temporary cart
        return ResponseEntity.ok(cartService.getTempCart(userName));
    }
}
