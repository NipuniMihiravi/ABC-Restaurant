package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Cart;
import abc.example.abcResturant.Model.Cart.CartItem;
import abc.example.abcResturant.Repository.CartRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @InjectMocks
    private CartService cartService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateCart() {
        // Arrange
        Cart cart = new Cart();
        cart.setId("1");
        cart.setUserName("John Doe");
        cart.setPhoneNumber("123456789");
        cart.setAddress("123 Main St");
        cart.setOption("Option 1");
        cart.setOutlet("Outlet 1");
        cart.setStatus("New");

        when(cartRepository.save(cart)).thenReturn(cart);

        // Act
        Cart result = cartService.createCart(cart);

        // Assert
        assertNotNull(result);
        assertEquals("John Doe", result.getUserName());
        assertEquals("123 Main St", result.getAddress());
    }

    @Test
    public void testGetCartById() {
        // Arrange
        String cartId = "1";
        Cart cart = new Cart();
        cart.setId(cartId);
        cart.setUserName("John Doe");

        when(cartRepository.findById(cartId)).thenReturn(Optional.of(cart));

        // Act
        Optional<Cart> result = cartService.getCartById(cartId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getUserName());
    }

    @Test
    public void testGetAllCarts() {
        // Arrange
        Cart cart1 = new Cart();
        cart1.setId("1");
        Cart cart2 = new Cart();
        cart2.setId("2");
        List<Cart> carts = Arrays.asList(cart1, cart2);

        when(cartRepository.findAll()).thenReturn(carts);

        // Act
        List<Cart> result = cartService.getAllCarts();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    public void testUpdateCart() {
        // Arrange
        String cartId = "1";
        Cart existingCart = new Cart();
        existingCart.setId(cartId);
        existingCart.setStatus("Old Status");

        Cart updatedCart = new Cart();
        updatedCart.setStatus("New Status");

        when(cartRepository.findById(cartId)).thenReturn(Optional.of(existingCart));
        when(cartRepository.save(existingCart)).thenReturn(existingCart);

        // Act
        Cart result = cartService.updateCart(cartId, updatedCart);

        // Assert
        assertNotNull(result);
        assertEquals("New Status", result.getStatus());
    }

    @Test
    public void testUpdateCartNotFound() {
        // Arrange
        String cartId = "1";
        Cart updatedCart = new Cart();
        updatedCart.setStatus("New Status");

        when(cartRepository.findById(cartId)).thenReturn(Optional.empty());

        // Act
        Cart result = cartService.updateCart(cartId, updatedCart);

        // Assert
        assertNull(result);
    }

    @Test
    public void testDeleteCart() {
        // Arrange
        String cartId = "1";
        doNothing().when(cartRepository).deleteById(cartId);

        // Act
        cartService.deleteCart(cartId);

        // Assert
        verify(cartRepository, times(1)).deleteById(cartId);
    }

    @Test
    public void testCalculateTotal() {
        // Arrange
        String cartId = "1";
        CartItem item1 = new CartItem("item1", "Item 1", 10.0, 2);
        CartItem item2 = new CartItem("item2", "Item 2", 20.0, 1);

        Cart cart = new Cart();
        cart.setId(cartId);
        cart.setItems(Arrays.asList(item1, item2));

        when(cartRepository.findById(cartId)).thenReturn(Optional.of(cart));

        // Act
        double result = cartService.calculateTotal(cartId);

        // Assert
        assertEquals(40.0, result, 0.01);
    }

    @Test
    public void testUpdateCartItemQuantity() {
        // Arrange
        String cartId = "1";
        String itemId = "item1";
        CartItem item = new CartItem(itemId, "Item 1", 10.0, 2);

        Cart cart = new Cart();
        cart.setId(cartId);
        cart.setItems(Arrays.asList(item));

        when(cartRepository.findById(cartId)).thenReturn(Optional.of(cart));
        when(cartRepository.save(cart)).thenReturn(cart);

        // Act
        Cart result = cartService.updateCartItemQuantity(cartId, itemId, 3);

        // Assert
        assertNotNull(result);
        CartItem updatedItem = result.getItems().stream()
                .filter(i -> i.getItemId().equals(itemId))
                .findFirst()
                .orElse(null);
        assertNotNull(updatedItem);
        assertEquals(3, updatedItem.getQuantity());
        assertEquals(30.0, updatedItem.getTotal(), 0.01); // 10.0 * 3
    }

    @Test
    public void testSaveTempCart() {
        // Arrange
        Cart cart = new Cart();
        cart.setId("temp1");

        when(cartRepository.save(cart)).thenReturn(cart);

        // Act
        Cart result = cartService.saveTempCart(cart);

        // Assert
        assertNotNull(result);
        assertEquals("temp1", result.getId());
    }

    @Test
    public void testGetTempCart() {
        // Arrange
        String userName = "John Doe";
        Cart cart = new Cart();
        cart.setUserName(userName);

        when(cartRepository.findByUserName(userName)).thenReturn(cart);

        // Act
        Cart result = cartService.getTempCart(userName);

        // Assert
        assertNotNull(result);
        assertEquals(userName, result.getUserName());
    }
}
