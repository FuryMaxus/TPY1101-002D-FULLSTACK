package com.example.usuarios.controller;

import com.example.usuarios.model.UserProfileDTO;
import com.example.usuarios.model.Usuario;
import com.example.usuarios.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Usuario> obtenerPorUsername(@PathVariable String username) {
        try {
            Usuario usuario = usuarioService.findByUsername(username);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<UserProfileDTO> actualizarPerfil(@PathVariable String username, @RequestBody UserProfileDTO updateProfileDto){
        try {
            UserProfileDTO updateDto = usuarioService.updateProfile(username, updateProfileDto);
            return ResponseEntity.ok(updateDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{user}")
    public ResponseEntity<?> eliminar(@PathVariable("user") String user){
        try{
            usuarioService.deleteByUsername(user);
            return ResponseEntity.noContent().build();
        }catch( Exception e ) {
            return ResponseEntity.notFound().build();
        }
    }
}
