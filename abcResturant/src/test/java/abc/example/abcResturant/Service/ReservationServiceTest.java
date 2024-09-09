package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Reservation;
import abc.example.abcResturant.Repository.ReservationRepository;
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

class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Reservation reservation1;
    private Reservation reservation2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        reservation1 = new Reservation("1", "John Doe", "1234567890", "john", "2024-09-01", "19:00", 4, "Outlet 1", "Special note", "Confirmed");
        reservation2 = new Reservation("2", "Jane Smith", "0987654321", "jane", "2024-09-02", "20:00", 2, "Outlet 2", "No special note", "Pending");
    }

    @Test
    void testGetAllReservations() {
        // Arrange
        when(reservationRepository.findAll()).thenReturn(Arrays.asList(reservation1, reservation2));

        // Act
        List<Reservation> reservations = reservationService.getAllReservations();

        // Assert
        assertEquals(2, reservations.size());
        verify(reservationRepository, times(1)).findAll();
    }

    @Test
    void testGetReservationById() {
        // Arrange
        String reservationId = "1";
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(reservation1));

        // Act
        Optional<Reservation> foundReservation = reservationService.getReservationById(reservationId);

        // Assert
        assertTrue(foundReservation.isPresent());
        assertEquals(reservation1.getName(), foundReservation.get().getName());
        verify(reservationRepository, times(1)).findById(reservationId);
    }

    @Test
    void testCreateReservation() {
        // Arrange
        when(reservationRepository.save(reservation1)).thenReturn(reservation1);

        // Act
        Reservation createdReservation = reservationService.createReservation(reservation1);

        // Assert
        assertNotNull(createdReservation);
        assertEquals("John Doe", createdReservation.getName());
        verify(reservationRepository, times(1)).save(reservation1);
    }

    @Test
    void testUpdateReservation() {
        // Arrange
        String reservationId = "1";
        Reservation updatedReservation = new Reservation("1", "Updated Name", "1111111111", "updatedUser", "2024-09-01", "19:30", 5, "Updated Outlet", "Updated note", "Cancelled");
        when(reservationRepository.findById(reservationId)).thenReturn(Optional.of(reservation1));
        when(reservationRepository.save(any(Reservation.class))).thenReturn(updatedReservation);

        // Act
        Reservation result = reservationService.updateReservation(reservationId, updatedReservation);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Name", result.getName());
        assertEquals("Cancelled", result.getStatus());
        verify(reservationRepository, times(1)).findById(reservationId);
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }

    @Test
    void testDeleteReservation() {
        // Arrange
        String reservationId = "1";
        when(reservationRepository.existsById(reservationId)).thenReturn(true);

        // Act
        boolean deleted = reservationService.deleteReservation(reservationId);

        // Assert
        assertTrue(deleted);
        verify(reservationRepository, times(1)).existsById(reservationId);
        verify(reservationRepository, times(1)).deleteById(reservationId);
    }

    @Test
    void testDeleteReservation_NotFound() {
        // Arrange
        String reservationId = "3";
        when(reservationRepository.existsById(reservationId)).thenReturn(false);

        // Act
        boolean deleted = reservationService.deleteReservation(reservationId);

        // Assert
        assertFalse(deleted);
        verify(reservationRepository, times(1)).existsById(reservationId);
        verify(reservationRepository, never()).deleteById(reservationId);
    }
}
