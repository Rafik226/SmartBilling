package com.example.smartbilling.service;

import com.example.smartbilling.dto.ClientRequestDto;
import com.example.smartbilling.dto.ClientResponseDto;

import java.util.List;

public interface ClientService {
    ClientResponseDto create(ClientRequestDto dto);

    ClientResponseDto update(Long id, ClientRequestDto dto);

    ClientResponseDto findById(Long id);

    void delete(Long id);

    List<ClientResponseDto> findAll();

    ClientResponseDto findByEmail(String email);

    ClientResponseDto findByName(String name);
}
