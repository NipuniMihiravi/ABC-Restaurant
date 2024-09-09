package abc.example.abcResturant.Controller;

import abc.example.abcResturant.Model.Cover;
import abc.example.abcResturant.Service.CoverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cover")
public class CoverController {
    @Autowired
    private CoverService coverService;

    @GetMapping
    public List<Cover> getAllCovers() {
        return coverService.getAllCovers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cover> getCoverById(@PathVariable String id) {
        return coverService.getCoverById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cover addCover(@RequestBody Cover cover) {
        return coverService.addCover(cover);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cover> updateCover(@PathVariable String id, @RequestBody Cover coverDetails) {
        try {
            return ResponseEntity.ok(coverService.updateCover(id, coverDetails));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Handle invalid ObjectId format
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCover(@PathVariable String id) {
        try {
            coverService.deleteCover(id);
            return ResponseEntity.ok().body("Cover deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid ObjectId format");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting cover: " + e.getMessage());
        }
    }
}