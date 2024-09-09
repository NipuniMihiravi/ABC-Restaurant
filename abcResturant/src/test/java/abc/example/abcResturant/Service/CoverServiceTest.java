package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Cover;
import abc.example.abcResturant.Repository.CoverRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CoverServiceTest {

    @Mock
    private CoverRepository coverRepository;

    @InjectMocks
    private CoverService coverService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateCover() {
        String id = "1";
        Cover existingCover = new Cover();
        existingCover.setId(id);
        existingCover.setHeading("Old Heading");
        existingCover.setDescription("Old Description");
        existingCover.setImage("Old Image");

        Cover updatedCoverDetails = new Cover();
        updatedCoverDetails.setHeading("New Heading");
        updatedCoverDetails.setDescription("New Description");
        updatedCoverDetails.setImage("New Image");

        Cover updatedCover = new Cover();
        updatedCover.setId(id);
        updatedCover.setHeading("New Heading");
        updatedCover.setDescription("New Description");
        updatedCover.setImage("New Image");

        when(coverRepository.findById(id)).thenReturn(Optional.of(existingCover));
        when(coverRepository.save(any(Cover.class))).thenReturn(updatedCover);

        Cover result = coverService.updateCover(id, updatedCoverDetails);

        assertNotNull(result);
        assertEquals("New Heading", result.getHeading());
        assertEquals("New Description", result.getDescription());
        assertEquals("New Image", result.getImage());
        verify(coverRepository, times(1)).save(existingCover);
    }
}
