package com.example.smartbilling.mapper;

import com.example.smartbilling.dto.UserCreateDto;
import com.example.smartbilling.dto.UserResponseDto;
import com.example.smartbilling.entity.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public User toEntity(UserCreateDto dto) {
        if (dto == null) return null;
        User entity = new User();
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword()); // encoding should be handled in service
        entity.setFullName(dto.getFullName());
        entity.setEmail(dto.getEmail());
        // roles mapping (String[] -> Role entities) should be handled in the service layer
        return entity;
    }

    public UserResponseDto toResponseDto(User entity) {
        if (entity == null) return null;
        UserResponseDto dto = new UserResponseDto();
        dto.setUsername(entity.getUsername());
        dto.setFullName(entity.getFullName());
        dto.setEmail(entity.getEmail());
        dto.setRoles(entity.getRoles().stream().map(r -> r.getName()).collect(Collectors.toSet()));
        return dto;
    }
}
