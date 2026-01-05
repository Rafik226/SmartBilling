package com.example.smartbilling.mapper;

import com.example.smartbilling.dto.ClientRequestDto;
import com.example.smartbilling.dto.ClientResponseDto;
import com.example.smartbilling.entity.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public Client toEntity(ClientRequestDto dto) {
        if (dto == null) return null;
        Client entity = new Client();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAddress(dto.getAddress());
        // company is stored in address/company depending on entity design; here we set address
        return entity;
    }

    public ClientResponseDto toResponseDto(Client entity) {
        if (entity == null) return null;
        ClientResponseDto dto = new ClientResponseDto();
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setCompany(entity.getAddress());
        return dto;
    }
}
