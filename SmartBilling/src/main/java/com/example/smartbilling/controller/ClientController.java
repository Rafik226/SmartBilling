package com.example.smartbilling.controller;

import com.example.smartbilling.dto.ClientRequestDto;
import com.example.smartbilling.dto.ClientResponseDto;
import com.example.smartbilling.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClientResponseDto> create(@jakarta.validation.Valid @RequestBody ClientRequestDto dto) {
        return ResponseEntity.status(201).body(clientService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ClientResponseDto>> list() {
        return ResponseEntity.ok(clientService.findAll());
    }

    @GetMapping("/by-email")
    public ResponseEntity<ClientResponseDto> byEmail(@RequestParam String email) {
        return ResponseEntity.ok(clientService.findByEmail(email));
    }

    @GetMapping("/by-name")
    public ResponseEntity<ClientResponseDto> byName(@RequestParam String name) {
        return ResponseEntity.ok(clientService.findByName(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClientResponseDto> update(@PathVariable Long id, @jakarta.validation.Valid @RequestBody ClientRequestDto dto) {
        return ResponseEntity.ok(clientService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
