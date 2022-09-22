package com.example.backend.component;

import com.example.backend.entity.Category;
import com.example.backend.entity.DiningTable;
import com.example.backend.entity.Menu;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.DiningTableRepository;
import com.example.backend.repository.MenuRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MenuAndDiningTableDataLoader implements CommandLineRunner {
    public final DiningTableRepository diningTableRepository;
    public final MenuRepository menuRepository;
    public final CategoryRepository categoryRepository;

    public MenuAndDiningTableDataLoader(DiningTableRepository diningTableRepository, MenuRepository menuRepository, CategoryRepository categoryRepository) {
        this.diningTableRepository = diningTableRepository;
        this.menuRepository = menuRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        loadDiningTableData();
        loadCategoryAndMenuData();
    }
    private void loadDiningTableData(){
        if(diningTableRepository.count() == 0){
            DiningTable diningTable1 = new DiningTable();
            diningTable1.setName("Takeout");
            diningTable1.setCapacity(1);
            diningTable1.setStatus("unavailable");
            diningTableRepository.save(diningTable1);

            DiningTable diningTable2 = new DiningTable();
            diningTable2.setName("Table 0");
            diningTable2.setCapacity(20);
            diningTable2.setStatus("unavailable");
            diningTableRepository.save(diningTable2);

            DiningTable diningTable3 = new DiningTable();
            diningTable3.setName("Table 1");
            diningTable3.setCapacity(4);
            diningTable3.setStatus("available");
            diningTableRepository.save(diningTable3);

            DiningTable diningTable4 = new DiningTable();
            diningTable4.setName("Table 2");
            diningTable4.setCapacity(6);
            diningTable4.setStatus("available");
            diningTableRepository.save(diningTable4);
        }
    }
    private void loadCategoryAndMenuData(){
        if(categoryRepository.count() == 0){
            Category category1 = Category.builder().name("Appetizer").build();
            Category category2 = Category.builder().name("Soup").build();
            Category category3 = Category.builder().name("Maki").build();
            Category category4 = Category.builder().name("Sashimi").build();
            Category category5 = Category.builder().name("Nigiri").build();
            categoryRepository.save(category1);
            categoryRepository.save(category2);
            categoryRepository.save(category3);
            categoryRepository.save(category4);
            categoryRepository.save(category5);

            if(menuRepository.count() == 0){
                Menu menu1 = Menu.builder().name("Miso Soup").description("Miso paste, water, tofu").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663725175/regp4sx3giejwvu7jtch.jpg").price(3.99).status("Available").category(category2).build();
                Menu menu2 = Menu.builder().name("Wakame Salad").description("Wakame").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444338/cweesdlultkey20vs17j.jpg").price(4.99).status("Available").category(category1).build();
                Menu menu3 = Menu.builder().name("Edamame").description("Edamame").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444390/yazjcguafstazuwewuyb.jpg").price(1.99).status("Available").category(category1).build();
                Menu menu4 = Menu.builder().name("Squid Ball").description("Squid, flour").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444465/cnx5ypyctwn4lgrxvlv3.jpg").price(4.99).status("Available").category(category1).build();
                Menu menu5 = Menu.builder().name("Salmon Maki'").description("Salmon, rice").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444522/iyxlgxdymxe3o9qcb0uz.jpg").price(8.99).status("Available").category(category3).build();
                Menu menu6 = Menu.builder().name("Salmon Nigiri").description("Salmon, rice").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444625/wd7vhxcvbgs6wicx7crm.jpg").price(7.99).status("SoldOut").category(category5).build();
                Menu menu7 = Menu.builder().name("Salmon Sashimi").description("Salmon").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444662/nqclnydht9tbohoifauz.webp").price(9.99).status("Available").category(category4).build();
                Menu menu8 = Menu.builder().name("Mixed Maki").description("Salmon, Tuna, Avocado, Rice").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444711/zsm1nf3vlmuv97mitj99.jpg").price(10.99).status("Available").category(category3).build();
                Menu menu9 = Menu.builder().name("Tuna Nigiri").description("Tuna, Rice").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444752/ffkcirk6rxpzinhdsr56.jpg").price(9.99).status("Available").category(category5).build();
                Menu menu10 = Menu.builder().name("Tuna Sashimi").description("Tuna").image("https://res.cloudinary.com/ddz01pm2r/image/upload/v1663444785/fzd9bz6dat0lcz7ba7xx.jpg").price(9.99).status("Available").category(category4).build();

                menuRepository.save(menu1);
                menuRepository.save(menu2);
                menuRepository.save(menu3);
                menuRepository.save(menu4);
                menuRepository.save(menu5);
                menuRepository.save(menu6);
                menuRepository.save(menu7);
                menuRepository.save(menu8);
                menuRepository.save(menu9);
                menuRepository.save(menu10);

            }
        }
    }
}
