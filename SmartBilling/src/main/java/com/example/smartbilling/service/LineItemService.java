package com.example.smartbilling.service;

import com.example.smartbilling.dto.LineItemRequestDto;
import com.example.smartbilling.dto.LineItemResponseDto;

import java.util.List;

public interface LineItemService {
    LineItemResponseDto create(Long invoiceId, LineItemRequestDto dto);

    LineItemResponseDto update(Long id, LineItemRequestDto dto);

    LineItemResponseDto findById(Long id);

    void delete(Long id);

    List<LineItemResponseDto> findAllByInvoiceId(Long invoiceId);
}

