package com.example.smartbilling.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.example.smartbilling.dto.ClientResponseDto;
import com.example.smartbilling.dto.LineItemResponseDto;

/**
 * Représentation renvoyée d'une facture. N'expose pas des IDs sensibles d'entités internes autres que l'id de la facture si nécessaire.
 */
public class InvoiceResponseDto {
    private String reference;
    private ClientResponseDto client;
    private LocalDate invoiceDate;
    private List<LineItemResponseDto> items;
    private BigDecimal total;

    public InvoiceResponseDto() {
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public ClientResponseDto getClient() {
        return client;
    }

    public void setClient(ClientResponseDto client) {
        this.client = client;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public List<LineItemResponseDto> getItems() {
        return items;
    }

    public void setItems(List<LineItemResponseDto> items) {
        this.items = items;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
