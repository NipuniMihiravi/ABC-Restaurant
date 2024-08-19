package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Table;
import abc.example.abcResturant.Repository.TableRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<Table> getAllTables() {
        return tableRepository.findAll();
    }

    public Optional<Table> getTableById(ObjectId id) {
        return tableRepository.findById(id);
    }

    public Table createTable(Table table) {
        return tableRepository.save(table);
    }

    public Table updateTable(ObjectId id, Table table) {
        if (tableRepository.existsById(id)) {
            table.setId(id);
            return tableRepository.save(table);
        } else {
            throw new RuntimeException("Table not found");
        }
    }

    public void deleteTable(ObjectId id) {
        tableRepository.deleteById(id);
    }
}
