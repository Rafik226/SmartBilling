package com.example.smartbilling.service;

import com.example.smartbilling.dto.PaymentRequestDto;
import com.example.smartbilling.dto.PaymentResponseDto;

import java.util.List;

public interface PaymentService {
    PaymentResponseDto create(Long invoiceId, PaymentRequestDto dto);

    PaymentResponseDto findById(Long id);

    List<PaymentResponseDto> findAllByInvoiceId(Long invoiceId);

    void delete(Long id);

    PaymentResponseDto findByReference(String reference);
}

