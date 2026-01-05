package com.example.smartbilling.controller;

import com.example.smartbilling.dto.UserCreateDto;
import com.example.smartbilling.dto.UserResponseDto;
import com.example.smartbilling.entity.User;
import com.example.smartbilling.mapper.UserMapper;
import com.example.smartbilling.repository.RoleRepository;
import com.example.smartbilling.repository.UserRepository;
import com.example.smartbilling.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> create(@Valid @RequestBody UserCreateDto dto) {
        User u = userService.createUser(dto);
        return ResponseEntity.status(201).body(userMapper.toResponseDto(u));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponseDto>> list() {
        List<User> users = userRepository.findAll();
        List<UserResponseDto> dtos = users.stream().map(userMapper::toResponseDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> get(@PathVariable Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return ResponseEntity.ok(userMapper.toResponseDto(u));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> update(@PathVariable Long id, @RequestBody UserResponseDto dto) {
        User u = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (dto.getFullName() != null) u.setFullName(dto.getFullName());
        if (dto.getEmail() != null) u.setEmail(dto.getEmail());
        // replace roles if provided
        if (dto.getRoles() != null) {
            u.getRoles().clear();
            dto.getRoles().forEach(rn -> roleRepository.findByName(rn).ifPresent(u::addRole));
        }
        userRepository.save(u);
        return ResponseEntity.ok(userMapper.toResponseDto(u));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!userRepository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
