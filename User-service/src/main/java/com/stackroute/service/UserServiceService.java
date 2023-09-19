package com.stackroute.service;

import java.util.List;


import org.springframework.web.multipart.MultipartFile;

import com.stackroute.model.UserDTO;
import com.stackroute.model.UserService;

public interface UserServiceService {

	UserDTO registerUser(UserService user);
	List<UserDTO> getAllUsers();
	UserDTO getUserByEmail(String email);
	UserDTO updateUser(UserService user, String userEmail);
	UserDTO uploadProfilepic(String userEmail, MultipartFile file);
	UserDTO updatePlan(UserService user, String userEmail);
	
	
}
