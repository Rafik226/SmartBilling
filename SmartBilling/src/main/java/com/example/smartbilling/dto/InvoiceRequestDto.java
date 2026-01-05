package com.example.smartbilling.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

/**
 * Requête pour créer/mettre à jour une facture.
 * N'expose pas d'ID d'entité interne.
 */
public class InvoiceRequestDto {
    private String clientReference; // référence côté client (par exemple numéro client externe)

    private String reference; // numéro/référence de la facture (optionnel, généré côté backend si absent)

    @Email(message = "L'email du client n'est pas valide")
    private String clientEmail; // email du client pour rattachement

    @JsonAlias({"invoiceDate", "issueDate", "issue_date"})
    private LocalDate invoiceDate; // optionnel — sera positionnée côté backend si absente

    @Valid
    private List<LineItemRequestDto> items;

    public InvoiceRequestDto() {
    }

    public String getClientReference() {
        return clientReference;
    }

    public void setClientReference(String clientReference) {
        this.clientReference = clientReference;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public List<LineItemRequestDto> getItems() {
        return items;
    }

    public void setItems(List<LineItemRequestDto> items) {
        this.items = items;
    }
}
