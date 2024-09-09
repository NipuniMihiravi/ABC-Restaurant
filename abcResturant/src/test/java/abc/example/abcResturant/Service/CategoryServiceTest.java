package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Category;
import abc.example.abcResturant.Repository.CategoryRepository;
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

public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCategories() {
        Category category1 = new Category("1", "Category 1", Arrays.asList());
        Category category2 = new Category("2", "Category 2", Arrays.asList());

        when(categoryRepository.findAll()).thenReturn(Arrays.asList(category1, category2));

        List<Category> categories = categoryService.getAllCategories();
        assertEquals(2, categories.size());
    }

    @Test
    void testGetCategoryById() {
        Category category = new Category("1", "Category 1", Arrays.asList());

        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        Optional<Category> result = categoryService.getCategoryById("1");
        assertTrue(result.isPresent());
        assertEquals("Category 1", result.get().getName());
    }

    @Test
    void testAddCategory() {
        Category category = new Category("1", "Category 1", Arrays.asList());

        when(categoryRepository.save(category)).thenReturn(category);

        Category result = categoryService.addCategory(category);
        assertEquals("Category 1", result.getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testUpdateCategory() {
        Category existingCategory = new Category("1", "Category 1", Arrays.asList());
        Category updatedCategory = new Category("1", "Updated Category", Arrays.asList());

        when(categoryRepository.existsById("1")).thenReturn(true);
        when(categoryRepository.save(updatedCategory)).thenReturn(updatedCategory);

        Category result = categoryService.updateCategory("1", updatedCategory);
        assertEquals("Updated Category", result.getName());
        verify(categoryRepository, times(1)).save(updatedCategory);
    }

    @Test
    void testDeleteCategory() {
        doNothing().when(categoryRepository).deleteById("1");

        categoryService.deleteCategory("1");
        verify(categoryRepository, times(1)).deleteById("1");
    }

    @Test
    void testAddItemToCategory() {
        Category category = new Category("1", "Category 1", Arrays.asList());
        Category.Item item = new Category.Item("1", "Item 1", "001", 10.0, "Description", "Image");

        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);

        Category result = categoryService.addItemToCategory("1", item);
        assertEquals(1, result.getItems().size());
        assertEquals("Item 1", result.getItems().get(0).getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testUpdateItemInCategory() {
        Category category = new Category("1", "Category 1", Arrays.asList());
        Category.Item existingItem = new Category.Item("1", "Item 1", "001", 10.0, "Description", "Image");
        Category.Item updatedItem = new Category.Item("1", "Updated Item", "001", 12.0, "Updated Description", "Updated Image");

        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);

        Category result = categoryService.updateItemInCategory("1", "1", updatedItem);
        assertEquals(1, result.getItems().size());
        assertEquals("Updated Item", result.getItems().get(0).getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testDeleteItemFromCategory() {
        Category category = new Category("1", "Category 1", Arrays.asList(
                new Category.Item("1", "Item 1", "001", 10.0, "Description", "Image")
        ));

        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);

        categoryService.deleteItemFromCategory("1", "1");
        assertTrue(category.getItems().isEmpty());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void testSearchItemsByName() {
        Category category = new Category("1", "Category 1", Arrays.asList(
                new Category.Item("1", "Item 1", "001", 10.0, "Description", "Image"),
                new Category.Item("2", "Item 2", "002", 20.0, "Description", "Image")
        ));

        when(categoryRepository.findById("1")).thenReturn(Optional.of(category));

        List<Category.Item> results = categoryService.searchItemsByName("1", "Item 1");
        assertEquals(1, results.size());
        assertEquals("Item 1", results.get(0).getName());
    }
}
