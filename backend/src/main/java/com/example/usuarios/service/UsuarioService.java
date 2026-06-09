package com.example.usuarios.service;

import com.example.usuarios.model.UserProfileDTO;
import com.example.usuarios.model.Usuario;
import com.example.usuarios.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class UsuarioService implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> findAll(){ return usuarioRepository.findAll(); }


    public Usuario findByUsername(String username){
        return usuarioRepository.findByUsername(username).
                orElseThrow(() -> new NoSuchElementException("Usuario no encontrado con usuario: " + username));
    }
    public Usuario save(Usuario usuario){
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public void deleteByUsername(String user){usuarioRepository.deleteByUsername(user);}

    @Transactional
    public UserProfileDTO updateProfile(String username, UserProfileDTO updateDto) throws Exception {
        Usuario usuario = findByUsername(username);

        if (updateDto.getName() != null && !updateDto.getName().trim().isEmpty()){
            usuario.setName(updateDto.getName());
        }


        usuarioRepository.save(usuario);
        UserProfileDTO dto = new UserProfileDTO();
        dto.setName(usuario.getName());
        return dto;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("Usuario no encontrado");
                });
        return new User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("user")));
    }

}
