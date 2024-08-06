package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Category;
import abc.example.abcResturant.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(String id, Category category) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        category.setId(id);
        return categoryRepository.save(category);
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    public Category addItemToCategory(String id, Category.Item item) {
        Category category = getCategoryById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.getItems().add(item);
        return categoryRepository.save(category);
    }

    public Category updateItemInCategory(String id, String itemId, Category.Item updatedItem) {
        Category category = getCategoryById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        for (Category.Item item : category.getItems()) {
            if (item.getId().equals(itemId)) {
                item.setName(updatedItem.getName());
                item.setNumber(updatedItem.getNumber());
                item.setPrice(updatedItem.getPrice());
                item.setDescription(updatedItem.getDescription());
                item.setImage(updatedItem.getImage());
                return categoryRepository.save(category);
            }
        }
        throw new RuntimeException("Item not found");
    }

    public void deleteItemFromCategory(String id, String itemId) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.setItems(category.getItems().stream()
                .filter(item -> !item.getId().equals(itemId))
                .collect(Collectors.toList()));

        categoryRepository.save(category);
    }
}

