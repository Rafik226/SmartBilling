package com.example.smartbilling.service.impl;

import com.example.smartbilling.dto.InvoiceRequestDto;
import com.example.smartbilling.dto.InvoiceResponseDto;
import com.example.smartbilling.entity.Client;
import com.example.smartbilling.entity.Invoice;
import com.example.smartbilling.mapper.InvoiceMapper;
import com.example.smartbilling.repository.ClientRepository;
import com.example.smartbilling.repository.InvoiceRepository;
import com.example.smartbilling.service.InvoiceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;
    private final InvoiceMapper invoiceMapper;
    private final com.example.smartbilling.mapper.LineItemMapper lineItemMapper;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, ClientRepository clientRepository, InvoiceMapper invoiceMapper, com.example.smartbilling.mapper.LineItemMapper lineItemMapper) {
        this.invoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
        this.invoiceMapper = invoiceMapper;
        this.lineItemMapper = lineItemMapper;
    }

    private String generateReference() {
        // Simple generator: INV-YYYYMMDD-<sequence>
        String date = java.time.LocalDate.now().format(java.time.format.DateTimeFormatter.BASIC_ISO_DATE);
        long count = invoiceRepository.count() + 1;
        return String.format("INV-%s-%04d", date, count);
    }

    @Override
    public InvoiceResponseDto create(InvoiceRequestDto dto) {
        Invoice inv = new Invoice();
        // generate reference if absent
        if (dto.getReference() == null || dto.getReference().trim().isEmpty()) {
            String generated = generateReference();
            inv.setNumber(generated);
        } else {
            inv.setNumber(dto.getReference());
        }

        // set issue date to today if not provided
        if (dto.getInvoiceDate() == null) {
            inv.setIssueDate(java.time.LocalDate.now());
        } else {
            inv.setIssueDate(dto.getInvoiceDate());
        }
        // default due date = issueDate + 30 days when not provided via DTO
        if (dto.getInvoiceDate() == null) {
            inv.setDueDate(inv.getIssueDate().plusDays(30));
        }
        // attach client if provided by email
        if (dto.getClientEmail() != null) {
            Client c = clientRepository.findByEmail(dto.getClientEmail()).orElseThrow(() -> new RuntimeException("Client not found"));
            inv.setClient(c);
        }
        
        // Handle Line Items
        if (dto.getItems() != null) {
            for (var itemDto : dto.getItems()) {
                var item = lineItemMapper.toEntity(itemDto);
                if (item != null) {
                    item.recalcLineTotal(); // Ensure total is calculated
                    inv.addLineItem(item);
                }
            }
        }
        
        Invoice saved = invoiceRepository.save(inv);
        return invoiceMapper.toResponseDto(saved);
    }

    @Override
    public InvoiceResponseDto update(Long id, InvoiceRequestDto dto) {
        Invoice existing = invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Invoice not found: " + id));
        // do not overwrite number if not provided; keep existing otherwise
        if (dto.getReference() != null && !dto.getReference().trim().isEmpty()) {
            existing.setNumber(dto.getReference());
        }
        if (dto.getInvoiceDate() != null) {
            existing.setIssueDate(dto.getInvoiceDate());
        }
        if (dto.getClientEmail() != null) {
            Client c = clientRepository.findByEmail(dto.getClientEmail()).orElseThrow(() -> new RuntimeException("Client not found"));
            existing.setClient(c);
        }

        // Handle Line Items Update
        if (dto.getItems() != null) {
            existing.getLineItems().clear(); // Clear existing items
            for (var itemDto : dto.getItems()) {
                var item = lineItemMapper.toEntity(itemDto);
                if (item != null) {
                    item.recalcLineTotal();
                    existing.addLineItem(item);
                }
            }
        }

        Invoice saved = invoiceRepository.save(existing);
        return invoiceMapper.toResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceResponseDto findById(Long id) {
        return invoiceRepository.findById(id).map(invoiceMapper::toResponseDto).orElseThrow(() -> new RuntimeException("Invoice not found: " + id));
    }

    @Override
    public void delete(Long id) {
        if (!invoiceRepository.existsById(id)) throw new RuntimeException("Invoice not found: " + id);
        invoiceRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponseDto> findAll() {
        return invoiceRepository.findAll().stream().map(invoiceMapper::toResponseDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceResponseDto findByReference(String reference) {
        return invoiceRepository.findByNumber(reference).map(invoiceMapper::toResponseDto).orElseThrow(() -> new RuntimeException("Invoice not found: " + reference));
    }
}

