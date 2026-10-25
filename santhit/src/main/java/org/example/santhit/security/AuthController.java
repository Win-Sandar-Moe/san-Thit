package org.example.santhit.security;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public record RegisterDto(
            @NotBlank(message = "Username is required")
            @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
            String username,
            @NotBlank(message = "Email is required")
            @Email(message = "Email format is invalid")
            String email,
            @NotBlank(message = "Password is required")
            @Size(min = 5, message = "Password must be at least 5 characters")
            String password,
            @NotBlank(message = "Phone number is required")
            @Pattern(regexp = "^[0-9]{9,12}$", message = "Phone number must be between 9 and 12 digits")
            String phoneNumber,
            @NotBlank(message = "Address is required")
            String address
    ) {}
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid RegisterDto registerDto) {
        Map<String, String> response = authService.register(registerDto);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody @Valid LoginRequest loginRequest) {
        return authService.login(loginRequest.username, loginRequest.password);
    }
    @PostMapping("/refresh")
    public Map<String, String> refreshToken(@RequestBody @Valid RefreshRequest refreshRequest) {
        return authService.refreshToken(refreshRequest.refreshToken);
    }
    public record LoginRequest(
            @NotEmpty(message = "Username or email is required")
            @NotBlank(message = "Username or email cannot be blank")
            String username,
            @NotEmpty(message = "Password is required")
            @NotBlank(message = "Password cannot be blank")
            String password) { }
    public record RefreshRequest(
            @NotEmpty(message = "Refresh token is required")
            @NotBlank(message = "Refresh token cannot be blank")
            String refreshToken) {}
}

