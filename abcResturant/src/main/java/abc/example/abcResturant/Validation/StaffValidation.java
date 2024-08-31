package abc.example.abcResturant.Validation;
import abc.example.abcResturant.Model.Staff;

import java.util.regex.Pattern;

public class StaffValidation {

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]{3,20}$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile("^\\d{10}$");
    private static final Pattern DESIGNATION_PATTERN = Pattern.compile("^[a-zA-Z\\s]{2,50}$");
    private static final Pattern BRANCH_PATTERN = Pattern.compile("^[a-zA-Z\\s]{2,50}$");

    public static boolean isValidUsername(String username) {
        return username != null && USERNAME_PATTERN.matcher(username).matches();
    }

    public static boolean isValidPassword(String password) {
        return password != null && PASSWORD_PATTERN.matcher(password).matches();
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        return phoneNumber != null && PHONE_NUMBER_PATTERN.matcher(phoneNumber).matches();
    }

    public static boolean isValidDesignation(String designation) {
        return designation != null && DESIGNATION_PATTERN.matcher(designation).matches();
    }

    public static boolean isValidBranch(String branch) {
        return branch != null && BRANCH_PATTERN.matcher(branch).matches();
    }

    public static boolean isValidStaff(Staff staff) {
        return isValidUsername(staff.getUsername())
                && isValidPassword(staff.getPassword())
                && isValidPhoneNumber(staff.getPhoneNumber())
                && isValidDesignation(staff.getDesignation())
                && isValidBranch(staff.getBranch());
    }
}
