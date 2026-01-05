package com.example.smartbilling.dto;

import java.util.Set;

/**
 * DTO de réponse pour User exposant uniquement les informations non sensibles (pas d'ID).
 */
public class UserResponseDto {
    private String username;
    private String fullName;
    private String email;
    private Set<String> roles;

    public UserResponseDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
