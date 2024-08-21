package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Reservation;
import abc.example.abcResturant.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    // Get all reservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Get a single reservation by ID
    public Optional<Reservation> getReservationById(String id) {
        return reservationRepository.findById(id);
    }

    // Create a new reservation
    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    // Update an existing reservation
    public Reservation updateReservation(String id, Reservation updatedReservation) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();
            existingReservation.setName(updatedReservation.getName());
            existingReservation.setContactNo(updatedReservation.getContactNo());
            existingReservation.setEmail(updatedReservation.getEmail());
            existingReservation.setDate(updatedReservation.getDate());
            existingReservation.setTime(updatedReservation.getTime());
            existingReservation.setGuests(updatedReservation.getGuests());
            existingReservation.setOutlet(updatedReservation.getOutlet());
            existingReservation.setSpecialNote(updatedReservation.getSpecialNote());
            existingReservation.setStatus(updatedReservation.getStatus());
            return reservationRepository.save(existingReservation);
        } else {
            return null; // Or throw an exception
        }
    }

    // Delete a reservation by ID
    public boolean deleteReservation(String id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
