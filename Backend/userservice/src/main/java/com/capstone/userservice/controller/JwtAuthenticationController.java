package com.capstone.userservice.controller;


import com.capstone.userservice.config.JwtTokenUtil;
import com.capstone.userservice.model.JwtRequest;
import com.capstone.userservice.model.JwtResponse;
import com.capstone.userservice.model.UserDao;
import com.capstone.userservice.repository.UserRepository;
import com.capstone.userservice.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

@RestController
@CrossOrigin
public class JwtAuthenticationController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserRepository ui;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));

    }

    /*
    *     @DeleteMapping("/delete/{email}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteUser(@PathVariable(value = "email") String email){
        User user = ui.findByEmail(email);
        System.out.println(user);
        this.ui.delete(user);
        System.out.println("User Deleted");
    }

    * */

    @PostMapping(value = "/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public HttpStatus createUser(@RequestBody UserDao user){
        if(ui.findUserDaoByEmail(user.getEmail()) == null){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        this.ui.save(user);
            System.out.println("User Created");
            return HttpStatus.ACCEPTED;
        }else{
            System.out.println("A user with that email already exists");
            return HttpStatus.CONFLICT;
        }
    }

    @GetMapping(value = "/{email}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public UserDao getUserByEmail(@PathVariable(value="email") String Email){
        return ui.findUserDaoByEmail(Email);
    }

    
    private void authenticate(String username, String password) throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
