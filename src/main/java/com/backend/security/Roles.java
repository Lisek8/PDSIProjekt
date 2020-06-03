package com.backend.security;

public enum Roles {
    ADMIN("ADMIN"),
    STUDENT("STUDENT"),
    USER("USER"),
    LECTURER("LECTURER");

    private final String role;

    Roles(String role) {
        this.role=role;
    }
}
