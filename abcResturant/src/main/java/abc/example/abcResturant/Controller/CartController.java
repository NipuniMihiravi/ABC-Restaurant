package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Cart;
import abc.example.abcResturant.Service.CartService;
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

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.createCart(cart));
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

    @PutMapping
    public ResponseEntity<Cart> updateCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.updateCart(cart));
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
