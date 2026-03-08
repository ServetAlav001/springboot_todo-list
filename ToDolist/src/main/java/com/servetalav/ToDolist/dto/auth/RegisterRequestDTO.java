package com.servetalav.ToDolist.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDTO {

    @NotBlank(message = "Kullanıcı adı boş olamaz!")
    private String username;

    @NotBlank(message = "Şifre boş olamaz!")
    private String password;

    @NotBlank(message = "Email boş olamaz!")
    @Email(message = "Geçerli bir email giriniz!")
    private String email;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}