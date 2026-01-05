package com.example.smartbilling.mapper;

import com.example.smartbilling.dto.PaymentRequestDto;
import com.example.smartbilling.dto.PaymentResponseDto;
import com.example.smartbilling.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentResponseDto toResponseDto(Payment entity) {
        if (entity == null) return null;
        PaymentResponseDto dto = new PaymentResponseDto();
        dto.setAmount(entity.getAmount());
        dto.setDate(entity.getPaymentDate());
        dto.setMethod(entity.getMethod() != null ? entity.getMethod().name() : null);
        dto.setReference(entity.getReference());
        if (entity.getInvoice() != null) dto.setInvoiceReference(entity.getInvoice().getNumber());
        return dto;
    }

    public Payment toEntity(PaymentRequestDto dto) {
        if (dto == null) return null;
        Payment entity = new Payment();
        entity.setAmount(dto.getAmount());
        entity.setPaymentDate(dto.getDate());
        // parse method from string if provided
        try {
            if (dto.getMethod() != null)
                entity.setMethod(com.example.smartbilling.entity.PaymentMethod.valueOf(dto.getMethod()));
        } catch (IllegalArgumentException ex) {
            // ignore invalid method - service should validate
        }
        entity.setReference(dto.getReference());
        return entity;
    }
}
