package com.example.smartbilling.controller;

import com.example.smartbilling.dto.LineItemRequestDto;
import com.example.smartbilling.dto.LineItemResponseDto;
import com.example.smartbilling.service.LineItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/invoices/{invoiceId}/items")
public class LineItemController {

    private final LineItemService lineItemService;

    public LineItemController(LineItemService lineItemService) {
        this.lineItemService = lineItemService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<LineItemResponseDto> create(@PathVariable Long invoiceId, @jakarta.validation.Valid @RequestBody LineItemRequestDto dto) {
        return ResponseEntity.status(201).body(lineItemService.create(invoiceId, dto));
    }

    @GetMapping
    public ResponseEntity<List<LineItemResponseDto>> list(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(lineItemService.findAllByInvoiceId(invoiceId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LineItemResponseDto> get(@PathVariable Long invoiceId, @PathVariable Long id) {
        return ResponseEntity.ok(lineItemService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<LineItemResponseDto> update(@PathVariable Long invoiceId, @PathVariable Long id, @jakarta.validation.Valid @RequestBody LineItemRequestDto dto) {
        return ResponseEntity.ok(lineItemService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long invoiceId, @PathVariable Long id) {
        lineItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

