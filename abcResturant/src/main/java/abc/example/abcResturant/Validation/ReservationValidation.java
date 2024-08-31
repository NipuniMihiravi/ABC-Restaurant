package abc.example.abcResturant.Validation;

import abc.example.abcResturant.Model.Reservation;

public class ReservationValidation {

    public static boolean isValidName(String name) {
        return name != null && name.matches("[A-Za-z\\s]+");
    }

    public static boolean isValidContactNo(String contactNo) {
        return contactNo != null && contactNo.matches("\\d{10}");
    }

    public static boolean isValidUsername(String username) {
        // Simple regex for email validation. Adjust as needed.
        return username != null && username.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$");
    }

    public static boolean isValidDate(String date) {
        return date != null && date.matches("\\d{4}-\\d{2}-\\d{2}"); // Format: YYYY-MM-DD
    }

    public static boolean isValidTime(String time) {
        return time != null && time.matches("\\d{2}:\\d{2}"); // Format: HH:MM
    }

    public static boolean isValidGuests(int guests) {
        return guests > 0 && guests <= 100; // Assuming a max of 100 guests for the reservation
    }

    public static boolean isValidOutlet(String outlet) {
        return outlet != null && outlet.matches("[A-Za-z\\s]+");
    }

    public static boolean isValidSpecialNote(String specialNote) {
        return specialNote == null || specialNote.length() <= 255; // Optional, max 255 characters
    }

    public static boolean isValidStatus(String status) {
        return status != null && (status.equalsIgnoreCase("Pending") ||
                status.equalsIgnoreCase("Confirmed") ||
                status.equalsIgnoreCase("Reject"));
    }

    // Method to validate the entire Reservation object
    public static boolean isValidReservation(Reservation reservation) {
        return isValidName(reservation.getName()) &&
                isValidContactNo(reservation.getContactNo()) &&
                isValidUsername(reservation.getUsername()) && // Updated to use isValidEmail
                isValidDate(reservation.getDate()) &&
                isValidTime(reservation.getTime()) &&
                isValidGuests(reservation.getGuests()) &&
                isValidOutlet(reservation.getOutlet()) &&
                isValidSpecialNote(reservation.getSpecialNote()) &&
                isValidStatus(reservation.getStatus()); // Ensures status is not null and valid
    }
}

