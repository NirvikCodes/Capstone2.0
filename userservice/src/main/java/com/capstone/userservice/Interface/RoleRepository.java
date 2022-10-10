package com.capstone.userservice.Interface;
import java.util.Optional;

import com.capstone.userservice.Entity.ERole;
import com.capstone.userservice.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}