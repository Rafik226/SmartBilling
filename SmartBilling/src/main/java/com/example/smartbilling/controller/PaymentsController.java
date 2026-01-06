package com.example.smartbilling.controller;

import com.example.smartbilling.dto.PaymentResponseDto;
import com.example.smartbilling.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/payments")
public class PaymentsController {

    private final PaymentService paymentService;

    public PaymentsController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> list() {
        return ResponseEntity.ok(paymentService.findAll());
    }

    @GetMapping("/by-ref")
    public ResponseEntity<PaymentResponseDto> byRef(@RequestParam String ref) {
        return ResponseEntity.ok(paymentService.findByReference(ref));
    }
}
