package com.example.smartbilling.config;

import com.example.smartbilling.dto.UserCreateDto;
import com.example.smartbilling.entity.Role;
import com.example.smartbilling.repository.RoleRepository;
import com.example.smartbilling.repository.UserRepository;
import com.example.smartbilling.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, UserService userService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        // create roles if absent
        roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));
        roleRepository.findByName("ROLE_USER").orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));

        // create admin user if absent
        if (userRepository.findByUsername("admin").isEmpty()) {
            UserCreateDto dto = new UserCreateDto();
            dto.setUsername("admin");
            dto.setPassword("admin");
            dto.setFullName("Administrator");
            dto.setEmail("admin@example.com");
            dto.setRoles(new String[]{"ROLE_ADMIN"});
            userService.createUser(dto);
        } else {
            // Ensure admin has ROLE_ADMIN
            userRepository.findByUsername("admin").ifPresent(u -> {
                boolean hasAdmin = u.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_ADMIN"));
                if (!hasAdmin) {
                    roleRepository.findByName("ROLE_ADMIN").ifPresent(u::addRole);
                    userRepository.save(u);
                }
            });
        }
    }
}
