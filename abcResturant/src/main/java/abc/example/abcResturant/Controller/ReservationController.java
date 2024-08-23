package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Reservation;
import abc.example.abcResturant.Service.EmailService;
import abc.example.abcResturant.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private EmailService emailService; // Properly inject the EmailService

    // Get all reservations
    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    // Get a reservation by ID
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        if (reservation.isPresent()) {
            return ResponseEntity.ok(reservation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new reservation
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    // Update a reservation
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @RequestBody Reservation updatedReservation) {
        // First, update the reservation in the database
        Reservation reservation = reservationService.updateReservation(id, updatedReservation);
        if (reservation != null) {
            // After successfully updating, check the status
            String status = reservation.getStatus();
            if ("Confirmed".equalsIgnoreCase(status)) {
                // Construct the email body for confirmed status
                String emailBody = String.format(
                        "Thank you for making a reservation with ABC Restaurant, %s.\n\n" +
                                "Your reservation is confirmed.\n\n" +
                                "Reservation Date: %s\n\n" +
                                "Time: %s\n\n" +
                                "Table Number: %s.\n\n" +
                                "Any clarification please call ABC Restaurant Front Desk.\n\n" +
                                "ABC RESTAURANT - %s\n" +
                                "Telephone No: 0112744588",
                        reservation.getName(),    // Retrieves the name of the person
                        reservation.getDate(),    // Retrieves the reservation date
                        reservation.getTime(),    // Retrieves the reservation tim
                        reservation.getOutlet()   // Retrieves the outlet
                );

                // Send the email for confirmed reservation
                emailService.sendEmail(
                        reservation.getUsername(),
                        "Table Reservation Confirmed",
                        emailBody
                );

            } else if ("Rejected".equalsIgnoreCase(status)) {
                // Construct the email body for rejected status
                String emailBody = String.format(
                        "Dear %s,\n\n" +
                                "We regret to inform you that your reservation at ABC Restaurant on %s " +
                                "has been rejected as we are fully booked for that day.\n\n" +
                                "We apologize for the inconvenience and hope to serve you on another occasion.\n\n" +
                                "ABC RESTAURANT - %s\n" +
                                "Telephone No: 0112744588",
                        reservation.getName(),    // Retrieves the name of the person
                        reservation.getDate(),    // Retrieves the reservation date
                        reservation.getOutlet()   // Retrieves the outlet
                );

                // Send the email for rejected reservation
                emailService.sendEmail(
                        reservation.getUsername(),
                        "Table Reservation Rejected",
                        emailBody
                );
            }

            return ResponseEntity.ok(reservation); // Return the updated reservation
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a reservation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
        boolean isDeleted = reservationService.deleteReservation(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
