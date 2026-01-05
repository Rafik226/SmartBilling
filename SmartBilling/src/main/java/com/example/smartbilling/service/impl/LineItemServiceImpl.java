package com.example.smartbilling.service.impl;

import com.example.smartbilling.dto.LineItemRequestDto;
import com.example.smartbilling.dto.LineItemResponseDto;
import com.example.smartbilling.entity.Invoice;
import com.example.smartbilling.entity.LineItem;
import com.example.smartbilling.mapper.LineItemMapper;
import com.example.smartbilling.repository.InvoiceRepository;
import com.example.smartbilling.repository.LineItemRepository;
import com.example.smartbilling.service.LineItemService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LineItemServiceImpl implements LineItemService {

    private final LineItemRepository repository;
    private final InvoiceRepository invoiceRepository;
    private final LineItemMapper mapper;

    public LineItemServiceImpl(LineItemRepository repository, InvoiceRepository invoiceRepository, LineItemMapper mapper) {
        this.repository = repository;
        this.invoiceRepository = invoiceRepository;
        this.mapper = mapper;
    }

    @Override
    public LineItemResponseDto create(Long invoiceId, LineItemRequestDto dto) {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceId));
        LineItem entity = mapper.toEntity(dto);
        entity.setInvoice(invoice);
        LineItem saved = repository.save(entity);
        return mapper.toResponseDto(saved);
    }

    @Override
    public LineItemResponseDto update(Long id, LineItemRequestDto dto) {
        LineItem existing = repository.findById(id).orElseThrow(() -> new RuntimeException("LineItem not found: " + id));
        existing.setDescription(dto.getDescription());
        existing.setQuantity(dto.getQuantity());
        existing.setUnitPrice(dto.getUnitPrice());
        LineItem saved = repository.save(existing);
        return mapper.toResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public LineItemResponseDto findById(Long id) {
        return repository.findById(id).map(mapper::toResponseDto).orElseThrow(() -> new RuntimeException("LineItem not found: " + id));
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("LineItem not found: " + id);
        repository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LineItemResponseDto> findAllByInvoiceId(Long invoiceId) {
        return repository.findAll().stream()
                .filter(li -> li.getInvoice() != null && li.getInvoice().getId() != null && li.getInvoice().getId().equals(invoiceId))
                .map(mapper::toResponseDto)
                .collect(Collectors.toList());
    }
}

