package com.example.smartbilling.controller;

import com.example.smartbilling.dto.InvoiceRequestDto;
import com.example.smartbilling.dto.InvoiceResponseDto;
import com.example.smartbilling.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<InvoiceResponseDto> create(@jakarta.validation.Valid @RequestBody InvoiceRequestDto dto) {
        return ResponseEntity.status(201).body(invoiceService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<InvoiceResponseDto>> list() {
        return ResponseEntity.ok(invoiceService.findAll());
    }

    @GetMapping("/by-ref")
    public ResponseEntity<InvoiceResponseDto> byRef(@RequestParam String ref) {
        return ResponseEntity.ok(invoiceService.findByReference(ref));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponseDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InvoiceResponseDto> update(@PathVariable Long id, @jakarta.validation.Valid @RequestBody InvoiceRequestDto dto) {
        return ResponseEntity.ok(invoiceService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        invoiceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

