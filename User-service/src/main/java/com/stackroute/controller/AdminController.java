package com.stackroute.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stackroute.model.Admin;
import com.stackroute.model.AdminDTO;
import com.stackroute.service.AdminService;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/v1/user-service/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/home")
	public String home() {
		return "Welcome to the Admin home";
	}
	
	@PostMapping()
	public ResponseEntity<?> addAnAdmin(@RequestBody Admin admin) {
		ResponseEntity<?> entity = null;
		try {
			AdminDTO addedAdmin = adminService.addAnAdmin(admin);
			if(addedAdmin != null) {
				entity = new ResponseEntity<>(addedAdmin, HttpStatus.CREATED);
			} else {
				entity = new ResponseEntity<>("Error: Admin exists", HttpStatus.CONFLICT);
			}
		} catch (Exception e) {
			entity = new ResponseEntity<>("Error: " + e.toString(), HttpStatus.NOT_FOUND);
		}
		
		return entity;
	}
	
	@GetMapping() 
	public ResponseEntity<?> getAdmin() {
		ResponseEntity<?> entity = null;
		try {
			AdminDTO admin = adminService.getAdmin();
			if(admin != null) {
				entity = new ResponseEntity<>(admin, HttpStatus.OK);
			} else {
				entity = new ResponseEntity<>("Error: Admin doesn't exist", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			entity = new ResponseEntity<>("Error: " + e.toString(), HttpStatus.NOT_FOUND);
		}
		
		return entity;
	}
	
	@PutMapping()
	public ResponseEntity<?> updateAdmin(@RequestBody AdminDTO admin) {
		ResponseEntity<?> entity = null;
		try {
			AdminDTO updatedAdmin = adminService.updateAdmin(admin);
			if(updatedAdmin != null) {
				entity = new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
			} else {
				entity = new ResponseEntity<>("Error: Admin doesn't exist", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			entity = new ResponseEntity<>("Error: " + e.toString(), HttpStatus.NOT_FOUND);
		}
		
		return entity;
	}
	
	@PutMapping("/{adminMail}")
	public ResponseEntity<?> updateProfilePic(@PathVariable("adminMail") String adminMail, @RequestParam("file") MultipartFile file) {
		ResponseEntity<?> entity = null;
		try {
			AdminDTO updatedAdmin = adminService.updateAdminProfilePic(adminMail, file);
			if(updatedAdmin != null) {
				entity = new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
			} else {
				entity = new ResponseEntity<>("Error: Admin doesn't exist", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			entity = new ResponseEntity<>("Error: " + e.toString(), HttpStatus.NOT_FOUND);
		}
		
		return entity;
	}
	
	@DeleteMapping("/{adminMail}")
	public ResponseEntity<?> deleteAdmin(@PathVariable("adminMail") String adminMail) {
		ResponseEntity<?> entity = null;
		try {
			boolean isDeleted = adminService.deleteAdmin(adminMail);
			if(isDeleted) {
				entity = new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				entity = new ResponseEntity<>("Error: Admin doesn't exist", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			entity = new ResponseEntity<>("Error: " + e.toString(), HttpStatus.NOT_FOUND);
		}
		
		return entity;
	}

}
