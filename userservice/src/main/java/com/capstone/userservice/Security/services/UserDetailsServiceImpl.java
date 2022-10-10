package com.capstone.userservice.Security.services;

import com.capstone.userservice.Entity.User;

import com.capstone.userservice.Interface.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userInterface;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String Email) throws UsernameNotFoundException {
        User user = userInterface.findByEmail(Email);

        return UserDetailsImpl.build(user);
    }


}