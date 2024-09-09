package abc.example.abcResturant.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

@Document(collection = "cart")
public class Cart {
    @Id
    private String id; // ObjectId for MongoDB
    private String orderId; // auto-generated
    private String userName;
    private List<CartItem> items;
    private String phoneNumber;
    private String address;
    private String option;
    private String outlet;
    private String status;



    public Cart(String id, String orderId, String userName, List<CartItem> items, String phoneNumber, String address, String option, String outlet, String status) {
        this.id = id;
        this.orderId = orderId;
        this.userName = userName;
        this.items = items;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.option = option;
        this.outlet = outlet;
        this.status = status;
    }

    public Cart() {
        this.orderId = UUID.randomUUID().toString();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public String getOutlet() {
        return outlet;
    }

    public void setOutlet(String outlet) {
        this.outlet = outlet;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Method to calculate the total cost of all items in the cart
    public double getTotal() {
        return 0;
    }

    public void setTotal(double total) {
    }


    // Inner class for CartItem
    public static class CartItem {
        private String itemId; // MongoDB ObjectId
        private String name;
        private double price;
        private int quantity;
        private double total;

        public CartItem(String itemId, String name, double price, int quantity) {
            this.itemId = itemId;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.total = price * quantity; // Calculate total for the item
        }

        public String getItemId() {
            return itemId;
        }

        public void setItemId(String itemId) {
            this.itemId = itemId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getTotal() {
            return total;
        }

        public void setTotal(double total) {
            this.total = total;
        }
    }
}