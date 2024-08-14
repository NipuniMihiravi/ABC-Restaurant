package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Admin;
import abc.example.abcResturant.Model.Customer;
import abc.example.abcResturant.Model.Staff;
import abc.example.abcResturant.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Admin endpoints
    @GetMapping("/admin")
    public ResponseEntity<?> getAllAdmins() {
        return ResponseEntity.ok(userService.getAllAdmins());
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable String id) {
        return userService.getAdminById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(userService.addAdmin(admin));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable String id, @RequestBody Admin admin) {
        try {
            return ResponseEntity.ok(userService.updateAdmin(id, admin));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable String id) {
        userService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    // Staff endpoints
    @GetMapping("/staff")
    public ResponseEntity<?> getAllStaff() {
        return ResponseEntity.ok(userService.getAllStaff());
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable String id) {
        return userService.getStaffById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/staff")
    public ResponseEntity<?> registerStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(userService.addStaff(staff));
    }

    @PutMapping("/staff/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable String id, @RequestBody Staff staff) {
        try {
            return ResponseEntity.ok(userService.updateStaff(id, staff));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/staff/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable String id) {
        userService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    // Customer endpoints
    @GetMapping("/customer")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(userService.getAllCustomers());
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable String id) {
        return userService.getCustomerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/customer")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(userService.addCustomer(customer));
    }

    @PutMapping("/customer/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable String id, @RequestBody Customer customer) {
        try {
            return ResponseEntity.ok(userService.updateCustomer(id, customer));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable String id) {
        userService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    // Authentication endpoints
    @PostMapping("/login/admin")
    public ResponseEntity<?> loginAdmin(@RequestParam String username, @RequestParam String password) {
        Optional<Admin> admin = userService.authenticateAdmin(username, password);
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/login/staff")
    public ResponseEntity<?> loginStaff(@RequestParam String username, @RequestParam String password) {
        Optional<Staff> staff = userService.authenticateStaff(username, password);
        if (staff.isPresent()) {
            return ResponseEntity.ok(staff.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/login/customer")
    public ResponseEntity<?> loginCustomer(@RequestParam String username, @RequestParam String password) {
        Optional<Customer> customer = userService.authenticateCustomer(username, password);
        if (customer.isPresent()) {
            return ResponseEntity.ok(customer.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}

