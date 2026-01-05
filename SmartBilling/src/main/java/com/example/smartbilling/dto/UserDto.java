package com.example.smartbilling.dto;

import java.util.HashSet;
import java.util.Set;

public class UserDto {
    private String username;
    private Set<String> roles = new HashSet<>();

    public UserDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
