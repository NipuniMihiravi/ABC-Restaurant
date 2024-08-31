package abc.example.abcResturant.Validation;
import abc.example.abcResturant.Model.Table;


public class TableValidation {

    public static boolean isValidName(String name) {
        return name != null && name.matches("[A-Za-z\\s]+");
    }

    public static boolean isValidContactNo(String contactNo) {
        return contactNo != null && contactNo.matches("\\d{10}");
    }

    public static boolean isValidUsername(String username) {
        return username != null && username.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$");
    }

    public static boolean isValidDate(String date) {
        return date != null && date.matches("\\d{4}-\\d{2}-\\d{2}"); // Format: YYYY-MM-DD
    }

    public static boolean isValidTime(String time) {
        return time != null && time.matches("\\d{2}:\\d{2}"); // Format: HH:MM
    }

    public static boolean isValidGuests(Integer guests) {
        return guests != null && guests > 0 && guests <= 100;
    }

    public static boolean isValidOutlet(String outlet) {
        return outlet != null && outlet.matches("[A-Za-z\\s]+");
    }

    public static boolean isValidTableNo(Integer tableNo) {
        return tableNo != null && tableNo > 0; // Assuming table numbers start from 1
    }

    public static boolean isValidStatus(String status) {
        return status != null && (status.equalsIgnoreCase("Pending") ||
                status.equalsIgnoreCase("Confirmed") ||
                status.equalsIgnoreCase("Reject"));
    }

    // Method to validate the entire Table object
    public static boolean isValidTable(Table table) {
        return isValidName(table.getName()) &&
                isValidContactNo(table.getContactNo()) &&
                isValidUsername(table.getUsername()) &&
                isValidDate(table.getDate()) &&
                isValidTime(table.getTime()) &&
                isValidGuests(table.getGuests()) &&
                isValidOutlet(table.getOutlet()) &&
                isValidTableNo(table.getTableNo()) &&
                isValidStatus(table.getStatus());
    }
}
