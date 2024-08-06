package abc.example.abcResturant.Service;

import abc.example.abcResturant.Model.Item;
import abc.example.abcResturant.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(String id) {
        return itemRepository.findById(id);
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(String id, Item itemDetails) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setName(itemDetails.getName());
            item.setPrice(itemDetails.getPrice());
            item.setDescription(itemDetails.getDescription());
            item.setCategoryId(itemDetails.getCategoryId());
            return itemRepository.save(item);
        }
        return null;
    }

    public void deleteItem(String id) {
        itemRepository.deleteById(id);
    }
}
