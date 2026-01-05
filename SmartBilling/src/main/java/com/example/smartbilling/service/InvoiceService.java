package com.example.smartbilling.service;

import com.example.smartbilling.dto.InvoiceRequestDto;
import com.example.smartbilling.dto.InvoiceResponseDto;

import java.util.List;

public interface InvoiceService {
    InvoiceResponseDto create(InvoiceRequestDto dto);

    InvoiceResponseDto update(Long id, InvoiceRequestDto dto);

    InvoiceResponseDto findById(Long id);

    void delete(Long id);

    List<InvoiceResponseDto> findAll();

    InvoiceResponseDto findByReference(String reference);
}

