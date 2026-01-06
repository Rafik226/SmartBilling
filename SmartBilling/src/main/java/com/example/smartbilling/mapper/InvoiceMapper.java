package com.example.smartbilling.mapper;

import com.example.smartbilling.dto.InvoiceResponseDto;
import com.example.smartbilling.dto.LineItemResponseDto;
import com.example.smartbilling.entity.Invoice;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class InvoiceMapper {

    private final LineItemMapper lineItemMapper;
    private final PaymentMapper paymentMapper;

    public InvoiceMapper(LineItemMapper lineItemMapper, PaymentMapper paymentMapper) {
        this.lineItemMapper = lineItemMapper;
        this.paymentMapper = paymentMapper;
    }

    public InvoiceResponseDto toResponseDto(Invoice entity) {
        if (entity == null) return null;
        InvoiceResponseDto dto = new InvoiceResponseDto();
        dto.setId(entity.getId());
        dto.setReference(entity.getNumber());
        // map client minimally
        if (entity.getClient() != null) {
            var c = new com.example.smartbilling.dto.ClientResponseDto();
            c.setName(entity.getClient().getName());
            c.setEmail(entity.getClient().getEmail());
            c.setPhone(entity.getClient().getPhone());
            c.setCompany(entity.getClient().getAddress());
            dto.setClient(c);
        }
        dto.setInvoiceDate(entity.getIssueDate());

        List<LineItemResponseDto> items = entity.getLineItems().stream()
                .map(lineItemMapper::toResponseDto)
                .collect(Collectors.toList());
        dto.setItems(items);

        if (entity.getPayments() != null) {
            dto.setPayments(entity.getPayments().stream()
                    .map(paymentMapper::toResponseDto)
                    .collect(Collectors.toList()));
        }

        BigDecimal total = items.stream()
                .map(i -> i.getLineTotal() != null ? i.getLineTotal() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        dto.setTotal(total);

        return dto;
    }
}
