package com.example.smartbilling.service.impl;

import com.example.smartbilling.dto.PaymentRequestDto;
import com.example.smartbilling.dto.PaymentResponseDto;
import com.example.smartbilling.entity.Invoice;
import com.example.smartbilling.entity.Payment;
import com.example.smartbilling.mapper.PaymentMapper;
import com.example.smartbilling.repository.InvoiceRepository;
import com.example.smartbilling.repository.PaymentRepository;
import com.example.smartbilling.service.PaymentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;
    private final PaymentMapper paymentMapper;

    public PaymentServiceImpl(PaymentRepository paymentRepository, InvoiceRepository invoiceRepository, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentMapper = paymentMapper;
    }

    @Override
    public PaymentResponseDto create(Long invoiceId, PaymentRequestDto dto) {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceId));
        Payment p = paymentMapper.toEntity(dto);
        p.setInvoice(invoice);
        Payment saved = paymentRepository.save(p);
        return paymentMapper.toResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponseDto findById(Long id) {
        return paymentRepository.findById(id).map(paymentMapper::toResponseDto).orElseThrow(() -> new RuntimeException("Payment not found: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponseDto> findAllByInvoiceId(Long invoiceId) {
        return paymentRepository.findAll().stream()
                .filter(p -> p.getInvoice() != null && p.getInvoice().getId() != null && p.getInvoice().getId().equals(invoiceId))
                .map(paymentMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        if (!paymentRepository.existsById(id)) throw new RuntimeException("Payment not found: " + id);
        paymentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponseDto> findAll() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponseDto findByReference(String reference) {
        return paymentRepository.findByReference(reference).map(paymentMapper::toResponseDto).orElseThrow(() -> new RuntimeException("Payment not found: " + reference));
    }
}

