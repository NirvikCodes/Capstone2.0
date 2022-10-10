package com.capstone.userservice.Controller;

import com.capstone.userservice.Entity.User;
import com.capstone.userservice.Interface.RoleRepository;
import com.capstone.userservice.Interface.UserRepository;
import com.capstone.userservice.Security.jwt.JwtUtils;
import com.capstone.userservice.Security.services.UserDetailsImpl;
import com.capstone.userservice.payload.request.LoginRequest;
import com.capstone.userservice.payload.response.UserInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository ri;

    @Autowired
    private UserRepository ui;

    @Autowired
    JwtUtils jwtUtils;



    @PostMapping("/create")
    @ResponseStatus(code = HttpStatus.CREATED)
    public HttpStatus createUser(@RequestBody User user){
        if (ui.findByEmail(user.getEmail())==null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            this.ui.save(user);
            System.out.println("User Created");
            return HttpStatus.ACCEPTED;
        }else{
            System.out.println("A user with that email already exists");
           return HttpStatus.CONFLICT;
        }

        }

        //make sure that only this certain user can delete
    @DeleteMapping("/delete/{email}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteUser(@PathVariable(value = "email") String email){
        User user = ui.findByEmail(email);
        System.out.println(user);
        this.ui.delete(user);
        System.out.println("User Deleted");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getEmail(),
                        roles));
    }


    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been signed out!");
    }
    }

