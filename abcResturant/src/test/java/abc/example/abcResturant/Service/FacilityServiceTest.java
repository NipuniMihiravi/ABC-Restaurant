package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Facility;
import abc.example.abcResturant.Repository.FacilityRepository;
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

class FacilityServiceTest {

    @Mock
    private FacilityRepository facilityRepository;

    @InjectMocks
    private FacilityService facilityService;

    private Facility facility1;
    private Facility facility2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        facility1 = new Facility("1", "Facility 1", "Description 1", "Image 1");
        facility2 = new Facility("2", "Facility 2", "Description 2", "Image 2");
    }

    @Test
    void testGetAllFacilities() {
        // Arrange
        when(facilityRepository.findAll()).thenReturn(Arrays.asList(facility1, facility2));

        // Act
        List<Facility> facilities = facilityService.getAllFacilities();

        // Assert
        assertEquals(2, facilities.size());
        verify(facilityRepository, times(1)).findAll();
    }

    @Test
    void testGetFacilityById() {
        // Arrange
        String facilityId = "1";
        when(facilityRepository.findById(facilityId)).thenReturn(Optional.of(facility1));

        // Act
        Optional<Facility> facility = facilityService.getFacilityById(facilityId);

        // Assert
        assertTrue(facility.isPresent());
        assertEquals(facility1.getHeading(), facility.get().getHeading());
        verify(facilityRepository, times(1)).findById(facilityId);
    }

    @Test
    void testAddFacility() {
        // Arrange
        when(facilityRepository.save(facility1)).thenReturn(facility1);

        // Act
        Facility createdFacility = facilityService.addFacility(facility1);

        // Assert
        assertNotNull(createdFacility);
        assertEquals("Facility 1", createdFacility.getHeading());
        verify(facilityRepository, times(1)).save(facility1);
    }

    @Test
    void testUpdateFacility() {
        // Arrange
        String facilityId = "1";
        Facility updatedFacilityDetails = new Facility("1", "Updated Facility", "Updated Description", "Updated Image");
        when(facilityRepository.findById(facilityId)).thenReturn(Optional.of(facility1));
        when(facilityRepository.save(any(Facility.class))).thenReturn(updatedFacilityDetails);

        // Act
        Facility updatedFacility = facilityService.updateFacility(facilityId, updatedFacilityDetails);

        // Assert
        assertEquals("Updated Facility", updatedFacility.getHeading());
        assertEquals("Updated Description", updatedFacility.getDescription());
        verify(facilityRepository, times(1)).findById(facilityId);
        verify(facilityRepository, times(1)).save(any(Facility.class));
    }

    @Test
    void testDeleteFacility() {
        // Arrange
        String facilityId = "1";

        // Act
        facilityService.deleteFacility(facilityId);

        // Assert
        verify(facilityRepository, times(1)).deleteById(facilityId);
    }
}
