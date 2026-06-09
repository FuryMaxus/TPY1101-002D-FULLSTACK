package com.example.usuarios.model;

import lombok.Data;

@Data
public class AuthRequestDTO {
    private String username;
    private String password;
}