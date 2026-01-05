package com.example.smartbilling.service;

import com.example.smartbilling.dto.UserCreateDto;
import com.example.smartbilling.entity.Role;
import com.example.smartbilling.repository.RoleRepository;
import com.example.smartbilling.entity.User;
import com.example.smartbilling.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(UserCreateDto dto) {
        User u = new User();
        u.setUsername(dto.getUsername());
        // ensure fullName/email are present to avoid NOT NULL DB violations
        if (dto.getFullName() == null || dto.getFullName().isBlank()) {
            u.setFullName(dto.getUsername());
        } else {
            u.setFullName(dto.getFullName());
        }
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            u.setEmail(dto.getUsername() + "@example.com");
        } else {
            u.setEmail(dto.getEmail());
        }
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setEnabled(true);
        Set<Role> roles = new HashSet<>();
        if (dto.getRoles() != null) {
            Arrays.stream(dto.getRoles()).forEach(r -> {
                roleRepository.findByName(r).ifPresent(roles::add);
            });
        }
        if (roles.isEmpty()) {
            Role defaultRole = roleRepository.findByName("ROLE_USER").orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));
            roles.add(defaultRole);
        }
        u.setRoles(roles);
        return userRepository.save(u);
    }
}

