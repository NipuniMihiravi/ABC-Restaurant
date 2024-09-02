package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Query;
import abc.example.abcResturant.Model.Table;
import abc.example.abcResturant.Service.EmailService;
import abc.example.abcResturant.Service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/query")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @Autowired
    private EmailService emailService; // Inject the EmailService

    @GetMapping
    public List<Query> getAllQueries() {
        return queryService.getAllQueries();
    }

    @GetMapping("/{id}")
    public Query getQueryById(@PathVariable String id) {
        return queryService.getQueryById(id).orElseThrow(() -> new RuntimeException("Query not found"));
    }

    @PostMapping
    public Query addQuery(@RequestBody Query query) {
        return queryService.addQuery(query);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Query> updateQuery(@PathVariable String id, @RequestBody Query updatedQuery) {
        // Update the query in the database
        Query query = queryService.updateQuery(id, updatedQuery);

        if (query != null) {
            // Check the status of the updated query
            String status = query.getStatus();
            if ("done".equalsIgnoreCase(status)) {
                // Construct the email body for confirmed status
                String emailBody = String.format(
                        "Thank you for reaching out to ABC Restaurant, %s.\n\n" +
                                "This is regarding your query about: %s\n\n" +
                                "Response: %s\n\n" +
                                "If you have any further questions, please contact ABC Restaurant Front Desk.\n\n" +
                                "ABC RESTAURANT \n" +
                                "Telephone No: 0112744588",
                        query.getName(),
                        query.getSubject(),
                        query.getRespond()
                );

                // Send the email for confirmed status
                emailService.sendEmail(
                        query.getEmail(), // Assuming the email should be sent to the query's email
                        "Query Status Respond",
                        emailBody
                );
            }

            return ResponseEntity.ok(query);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public void deleteQuery(@PathVariable String id) {
        queryService.deleteQuery(id);
    }
}
