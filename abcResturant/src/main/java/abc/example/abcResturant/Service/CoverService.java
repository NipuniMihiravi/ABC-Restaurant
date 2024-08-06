package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Cover;
import abc.example.abcResturant.Repository.CoverRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoverService {
    @Autowired
    private CoverRepository coverRepository;

    public List<Cover> getAllCovers() {
        return coverRepository.findAll();
    }

    public Optional<Cover> getCoverById(String id) {
        return coverRepository.findById(id);
    }

    public Cover addCover(Cover cover) {
        return coverRepository.save(cover);
    }

    public Cover updateCover(String id, Cover coverDetails) {
        Cover cover = coverRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid cover Id: " + id));
        cover.setHeading(coverDetails.getHeading());
        cover.setDescription(coverDetails.getDescription());
        cover.setImage(coverDetails.getImage());
        return coverRepository.save(cover);
    }

    public void deleteCover(String id) {
        coverRepository.deleteById(id);
    }
}





