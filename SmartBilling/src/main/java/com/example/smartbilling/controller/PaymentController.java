package com.example.smartbilling.controller;

import com.example.smartbilling.dto.PaymentRequestDto;
import com.example.smartbilling.dto.PaymentResponseDto;
import com.example.smartbilling.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/invoices/{invoiceId}/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<PaymentResponseDto> create(@PathVariable Long invoiceId, @jakarta.validation.Valid @RequestBody PaymentRequestDto dto) {
        return ResponseEntity.status(201).body(paymentService.create(invoiceId, dto));
    }

    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> list(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(paymentService.findAllByInvoiceId(invoiceId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponseDto> get(@PathVariable Long invoiceId, @PathVariable Long id) {
        return ResponseEntity.ok(paymentService.findById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long invoiceId, @PathVariable Long id) {
        paymentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

