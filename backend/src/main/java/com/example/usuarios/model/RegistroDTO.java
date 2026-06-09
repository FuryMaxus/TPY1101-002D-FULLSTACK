package com.example.usuarios.model;

import lombok.Data;

@Data
public class RegistroDTO {
    private String username;
    private String name;
    private String password;
    private String email;

}