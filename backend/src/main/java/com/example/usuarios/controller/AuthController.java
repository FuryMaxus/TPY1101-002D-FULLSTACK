package com.example.usuarios.controller;

import com.example.usuarios.model.AuthRequestDTO;
import com.example.usuarios.model.AuthResponseDTO;
import com.example.usuarios.model.RegistroDTO;
import com.example.usuarios.model.Usuario;
import com.example.usuarios.security.JwtUtil;
import com.example.usuarios.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody RegistroDTO registro){
        Usuario usuario = new Usuario();
        usuario.setUsername(registro.getUsername());
        usuario.setPassword(registro.getPassword());
        usuario.setEmail(registro.getEmail());
        usuario.setName(registro.getName());
        Usuario user = usuarioService.save(usuario);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/ingreso")
    public ResponseEntity<?> ingresar(@RequestBody AuthRequestDTO request){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

        final UserDetails userDetails = usuarioService.loadUserByUsername(request.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponseDTO(jwt));
    }
}

