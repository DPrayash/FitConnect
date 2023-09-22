package com.stackroute.service;

import org.springframework.web.multipart.MultipartFile;

import com.stackroute.model.Admin;
import com.stackroute.model.AdminDTO;

public interface AdminService {

	public AdminDTO addAnAdmin(Admin admin);
	
	public AdminDTO getAdmin();
	
	public AdminDTO updateAdmin(AdminDTO admin);
	
	public AdminDTO updateAdminProfilePic(String adminMail, MultipartFile file);
	
	public boolean deleteAdmin(String adminMail);
	
	
}
