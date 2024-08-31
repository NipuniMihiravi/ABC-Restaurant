package abc.example.abcResturant.Validation;

import java.util.regex.Pattern;

public class CustomerValidation {

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]{3,20}$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile("^\\d{10}$");

    public static boolean isValidUsername(String username) {
        return username != null && USERNAME_PATTERN.matcher(username).matches();
    }

    public static boolean isValidPassword(String password) {
        return password != null && PASSWORD_PATTERN.matcher(password).matches();
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        return phoneNumber != null && PHONE_NUMBER_PATTERN.matcher(phoneNumber).matches();
    }

    public static boolean isValidCustomerRegistration(String username, String password, String phoneNumber) {
        return isValidUsername(username) && isValidPassword(password) && isValidPhoneNumber(phoneNumber);
    }
}
