package com.stackroute.dao;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
}
