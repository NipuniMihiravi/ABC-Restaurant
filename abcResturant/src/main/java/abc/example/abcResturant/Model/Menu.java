package abc.example.abcResturant.Model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Menu {

    @Id
    private String id;
    private String name;
    private List<Category.Item> items;

    public Menu(String id, String name, List<Category.Item> items) {
        this.id = id;
        this.name = name;
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Category.Item> getItems() {
        return items;
    }

    public void setItems(List<Category.Item> items) {
        this.items = items;
    }


    public static class Item {
        private String id;
        private String name;
        private String number;
        private double price;
        private String description;
        private  String image;

        public Item(String id, String name, String number, double price, String description, String image) {
            this.id = id;
            this.name = name;
            this.number = number;
            this.price = price;
            this.description = description;
            this.image = image;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getNumber() {
            return number;
        }

        public void setNumber(String number) {
            this.number = number;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }
}
