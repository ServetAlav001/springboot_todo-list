package com.servetalav.ToDolist.controller;

import com.servetalav.ToDolist.dto.auth.LoginRequestDTO;
import com.servetalav.ToDolist.dto.auth.LoginResponseDTO;
import com.servetalav.ToDolist.dto.auth.RegisterRequestDTO;
import com.servetalav.ToDolist.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequestDTO dto) {
        String mesaj = authService.register(dto);
        Map<String, String> response = new HashMap<>();
        response.put("mesaj", mesaj);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        LoginResponseDTO response = authService.login(dto);
        return ResponseEntity.ok(response);
    }
}