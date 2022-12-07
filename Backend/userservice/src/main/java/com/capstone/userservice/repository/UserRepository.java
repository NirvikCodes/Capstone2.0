package com.capstone.userservice.repository;

import com.capstone.userservice.model.UserDao;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDao,Integer> {

    UserDao findUserDaoByEmail(String Email);

    UserDao findUserDaoByUserid(int Userid);
}
