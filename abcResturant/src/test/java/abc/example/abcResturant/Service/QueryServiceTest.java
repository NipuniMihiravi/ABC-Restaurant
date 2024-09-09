package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Query;
import abc.example.abcResturant.Repository.QueryRepository;
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

public class QueryServiceTest {

    @Mock
    private QueryRepository queryRepository;

    @InjectMocks
    private QueryService queryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllQueries() {
        // Arrange
        Query query1 = new Query("1", "John Doe", "john@example.com", "Subject 1", "Message 1", "Response 1", "Pending");
        Query query2 = new Query("2", "Jane Doe", "jane@example.com", "Subject 2", "Message 2", "Response 2", "Resolved");
        List<Query> queries = Arrays.asList(query1, query2);

        when(queryRepository.findAll()).thenReturn(queries);

        // Act
        List<Query> result = queryService.getAllQueries();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("John Doe", result.get(0).getName());
        assertEquals("Jane Doe", result.get(1).getName());
    }

    @Test
    public void testGetQueryById() {
        // Arrange
        String queryId = "1";
        Query query = new Query(queryId, "John Doe", "john@example.com", "Subject 1", "Message 1", "Response 1", "Pending");
        when(queryRepository.findById(queryId)).thenReturn(Optional.of(query));

        // Act
        Optional<Query> result = queryService.getQueryById(queryId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
    }

    @Test
    public void testAddQuery() {
        // Arrange
        Query query = new Query("1", "John Doe", "john@example.com", "Subject 1", "Message 1", "Response 1", "Pending");
        when(queryRepository.save(query)).thenReturn(query);

        // Act
        Query result = queryService.addQuery(query);

        // Assert
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("john@example.com", result.getEmail());
        assertEquals("Subject 1", result.getSubject());
        assertEquals("Message 1", result.getMessage());
        assertEquals("Response 1", result.getRespond());
        assertEquals("Pending", result.getStatus());
    }

    @Test
    public void testUpdateQuery() {
        // Arrange
        String queryId = "1";
        Query existingQuery = new Query(queryId, "Old Name", "old@example.com", "Old Subject", "Old Message", "Old Response", "Old Status");
        Query updatedQuery = new Query(queryId, "New Name", "new@example.com", "New Subject", "New Message", "New Response", "New Status");
        when(queryRepository.existsById(queryId)).thenReturn(true);
        when(queryRepository.save(updatedQuery)).thenReturn(updatedQuery);

        // Act
        Query result = queryService.updateQuery(queryId, updatedQuery);

        // Assert
        assertNotNull(result);
        assertEquals("New Name", result.getName());
        assertEquals("new@example.com", result.getEmail());
        assertEquals("New Subject", result.getSubject());
        assertEquals("New Message", result.getMessage());
        assertEquals("New Response", result.getRespond());
        assertEquals("New Status", result.getStatus());
    }

    @Test
    public void testUpdateQueryNotFound() {
        // Arrange
        String queryId = "1";
        Query updatedQuery = new Query(queryId, "Updated Name", "updated@example.com", "Updated Subject", "Updated Message", "Updated Response", "Updated Status");
        when(queryRepository.existsById(queryId)).thenReturn(false);

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            queryService.updateQuery(queryId, updatedQuery);
        });
        assertEquals("Query not found", thrown.getMessage());
    }

    @Test
    public void testDeleteQuery() {
        // Arrange
        String queryId = "1";
        doNothing().when(queryRepository).deleteById(queryId);

        // Act
        queryService.deleteQuery(queryId);

        // Assert
        verify(queryRepository, times(1)).deleteById(queryId);
    }
}
