package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Admin;
import abc.example.abcResturant.Model.Customer;
import abc.example.abcResturant.Model.Staff;
import abc.example.abcResturant.Repository.AdminRepository;
import abc.example.abcResturant.Repository.CustomerRepository;
import abc.example.abcResturant.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // Admin methods
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(String id, Admin admin) {
        return adminRepository.findById(id)
                .map(existingAdmin -> {
                    existingAdmin.setEmail(admin.getEmail());
                    existingAdmin.setPassword(admin.getPassword());
                    existingAdmin.setFullName(admin.getFullName());
                    existingAdmin.setPhoneNumber(admin.getPhoneNumber());
                    existingAdmin.setRole(admin.getRole());
                    return adminRepository.save(existingAdmin);
                })
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }

    // Staff methods
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(String id) {
        return staffRepository.findById(id);
    }

    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Staff updateStaff(String id, Staff staff) {
        return staffRepository.findById(id)
                .map(existingStaff -> {
                    existingStaff.setEmail(staff.getEmail());
                    existingStaff.setPassword(staff.getPassword());
                    existingStaff.setFullName(staff.getFullName());
                    existingStaff.setPhoneNumber(staff.getPhoneNumber());
                    existingStaff.setRole(staff.getRole());
                    existingStaff.setDesignation(staff.getDesignation());
                    existingStaff.setBranch(staff.getBranch());
                    return staffRepository.save(existingStaff);
                })
                .orElseThrow(() -> new RuntimeException("Staff not found"));
    }

    public void deleteStaff(String id) {
        staffRepository.deleteById(id);
    }

    // Customer methods
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(String id, Customer customer) {
        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    existingCustomer.setEmail(customer.getEmail());
                    existingCustomer.setPassword(customer.getPassword());
                    existingCustomer.setFullName(customer.getFullName());
                    existingCustomer.setPhoneNumber(customer.getPhoneNumber());
                    existingCustomer.setRole(customer.getRole());
                    return customerRepository.save(existingCustomer);
                })
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    // Authentication
    public Optional<Admin> authenticateAdmin(String email, String password) {
        return adminRepository.findByEmail(email).filter(admin -> admin.getPassword().equals(password));
    }

    public Optional<Staff> authenticateStaff(String email, String password) {
        return staffRepository.findByEmail(email).filter(staff -> staff.getPassword().equals(password));
    }

    public Optional<Customer> authenticateCustomer(String email, String password) {
        return customerRepository.findByEmail(email).filter(customer -> customer.getPassword().equals(password));
    }
}
