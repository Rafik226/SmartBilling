package com.example.smartbilling.service.impl;

import com.example.smartbilling.dto.ClientRequestDto;
import com.example.smartbilling.dto.ClientResponseDto;
import com.example.smartbilling.entity.Client;
import com.example.smartbilling.mapper.ClientMapper;
import com.example.smartbilling.repository.ClientRepository;
import com.example.smartbilling.service.ClientService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    private final ClientRepository repository;
    private final ClientMapper mapper;

    public ClientServiceImpl(ClientRepository repository, ClientMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public ClientResponseDto create(ClientRequestDto dto) {
        Client entity = mapper.toEntity(dto);
        Client saved = repository.save(entity);
        return mapper.toResponseDto(saved);
    }

    @Override
    public ClientResponseDto update(Long id, ClientRequestDto dto) {
        Client existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Client not found: " + id));
        existing.setName(dto.getName());
        existing.setEmail(dto.getEmail());
        existing.setPhone(dto.getPhone());
        existing.setAddress(dto.getAddress());
        Client saved = repository.save(existing);
        return mapper.toResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ClientResponseDto findById(Long id) {
        return repository.findById(id).map(mapper::toResponseDto).orElseThrow(() -> new RuntimeException("Client not found: " + id));
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("Client not found: " + id);
        repository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClientResponseDto> findAll() {
        return repository.findAll().stream().map(mapper::toResponseDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ClientResponseDto findByEmail(String email) {
        return repository.findByEmail(email).map(mapper::toResponseDto).orElseThrow(() -> new RuntimeException("Client not found by email: " + email));
    }

    @Override
    @Transactional(readOnly = true)
    public ClientResponseDto findByName(String name) {
        return repository.findByName(name).map(mapper::toResponseDto).orElseThrow(() -> new RuntimeException("Client not found by name: " + name));
    }
}
