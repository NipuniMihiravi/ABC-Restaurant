package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Query;
import abc.example.abcResturant.Repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }

    public Optional<Query> getQueryById(String id) {
        return queryRepository.findById(id);
    }

    public Query addQuery(Query query) {
        return queryRepository.save(query);
    }

    public Query updateQuery(String id, Query updatedQuery) {
        if (queryRepository.existsById(id)) {
            updatedQuery.setId(id);
            return queryRepository.save(updatedQuery);
        } else {
            throw new RuntimeException("Query not found");
        }
    }

    public void deleteQuery(String id) {
        queryRepository.deleteById(id);
    }
}