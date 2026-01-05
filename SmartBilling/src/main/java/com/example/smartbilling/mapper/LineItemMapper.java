package com.example.smartbilling.mapper;

import com.example.smartbilling.dto.LineItemRequestDto;
import com.example.smartbilling.dto.LineItemResponseDto;
import com.example.smartbilling.entity.LineItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class LineItemMapper {

    public LineItemResponseDto toResponseDto(LineItem entity) {
        if (entity == null) return null;
        LineItemResponseDto dto = new LineItemResponseDto();
        dto.setDescription(entity.getDescription());
        dto.setQuantity(entity.getQuantity());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setLineTotal(entity.getLineTotal() != null ? entity.getLineTotal() : BigDecimal.ZERO);
        return dto;
    }

    public LineItem toEntity(LineItemRequestDto dto) {
        if (dto == null) return null;
        LineItem entity = new LineItem();
        entity.setDescription(dto.getDescription());
        entity.setQuantity(dto.getQuantity());
        entity.setUnitPrice(dto.getUnitPrice());
        // recalc handled by entity setters
        return entity;
    }
}
