package org.example.santhit.security;

import lombok.RequiredArgsConstructor;
import org.example.santhit.product.dao.CustomerDao;
import org.example.santhit.product.dao.RoleDao;
import org.example.santhit.product.dao.SiteAdminDao;
import org.example.santhit.product.entity.Customer;
import org.example.santhit.product.entity.Role;
import org.example.santhit.product.entity.SiteAdmin;
import org.example.santhit.jwt.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final CustomerDao customerDao;
    private final SiteAdminDao siteAdminDao;
    private final AuthenticationManager authenticationManager;
    private final RoleDao roleDao;
    private final UserDetailsService customUserDetailsService;
    private final TokenService tokenService;

    public Map<String, String> login(String username, String password) {
        var auth = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(auth);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = tokenService.generateAccessToken(authentication);
        String refreshToken = tokenService.generateRefreshToken(authentication);
        return Map.of("accessToken", accessToken,
                "refreshToken", refreshToken);
    }

    public Map<String, String> refreshToken(String refreshToken) {
        Jwt jwt = tokenService.decodeToken(refreshToken);
        String type = jwt.getClaimAsString("type");
        if (!"REFRESH".equals(type)) {
            throw new IllegalArgumentException("Invalid token type");
        }
        String username = jwt.getSubject();
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );
        String newAccessToken = tokenService.generateAccessToken(auth);
        return Map.of("accessToken", newAccessToken,
                "refreshToken", refreshToken);
    }
    @Transactional
    public void createInt() {
        Role customerRole = new Role();
        customerRole.setRoleName("ROLE_CUSTOMER");
        Role siteAdminRole = new Role();
        siteAdminRole.setRoleName("ROLE_ADMIN");
        Customer customer = new Customer(
                "khin",
                passwordEncoder.encode("12345"),
                "khin@mail.com",
                "09123456789",
                "SinKyut"
        );
        customer.addRole(roleDao.save(customerRole));
        customerDao.save(customer);
        SiteAdmin admin = new SiteAdmin(
                "win",
                passwordEncoder.encode("12345"),
                "win@mail.com"
        );
        admin.addRole(roleDao.save(siteAdminRole));
        siteAdminDao.save(admin);
    }
    @Transactional
    public Map<String, String> register(AuthController.RegisterDto registerDto) {
        if (customerDao.findByUsername(registerDto.username()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        Customer customer = new Customer(
                registerDto.username(),
                passwordEncoder.encode(registerDto.password()),
                registerDto.email(),
                registerDto.password(),
                registerDto.address()
        );
        Role customerRole = roleDao.findByRoleName("ROLE_CUSTOMER")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setRoleName("ROLE_CUSTOMER");
                    return roleDao.save(role);
                });
        customer.addRole(customerRole);
        customerDao.save(customer);
        return Map.of(
                "message", "Register successfully"
        );
    }
}
