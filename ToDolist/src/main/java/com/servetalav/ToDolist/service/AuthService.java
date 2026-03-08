package com.servetalav.ToDolist.service;

import com.servetalav.ToDolist.dto.auth.LoginRequestDTO;
import com.servetalav.ToDolist.dto.auth.LoginResponseDTO;
import com.servetalav.ToDolist.dto.auth.RegisterRequestDTO;
import com.servetalav.ToDolist.model.User;
import com.servetalav.ToDolist.repository.UserRepository;
import com.servetalav.ToDolist.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String register(RegisterRequestDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Bu kullanıcı adı zaten kullanılıyor!");
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Bu email zaten kullanılıyor!");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        userRepository.save(user);

        return "Kayıt başarılı!";
    }

    public LoginResponseDTO login(LoginRequestDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );
        String token = jwtUtil.generateToken(dto.getUsername());
        return new LoginResponseDTO(token);
    }
}