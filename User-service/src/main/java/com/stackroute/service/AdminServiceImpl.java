package com.stackroute.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.stackroute.model.Admin;
import com.stackroute.model.AdminDTO;
import com.stackroute.model.UserService;
import com.stackroute.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private Cloudinary cloudinary;

	@Override
	public AdminDTO addAnAdmin(Admin admin) {
		AdminDTO existingAdmin = getAdmin();
		if (existingAdmin == null) {
			Admin addedAdmin = adminRepository.save(admin);
			AdminDTO addedAdminDTO = new AdminDTO();
			addedAdminDTO.addAdmin(addedAdmin);
			return addedAdminDTO;
		}
		return null;
	}

	@Override
	public AdminDTO getAdmin() {
		List<Admin> adminList = adminRepository.findAll();
		if (!adminList.isEmpty()) {
			AdminDTO existingAdmin = new AdminDTO();
			existingAdmin.addAdmin(adminList.get(0));
			return existingAdmin;
		}
		return null;
	}

	@Override
	public AdminDTO updateAdmin(AdminDTO admin) {
		AdminDTO existingAdminDTO = getAdmin();
		if (existingAdminDTO != null && existingAdminDTO.getAdminMail().equals(admin.getAdminMail())) {
			Admin existingAdmin = adminRepository.findById(existingAdminDTO.getAdminMail()).get();
			existingAdmin.updateAdmin(admin);
			AdminDTO updatedAdminDTO = new AdminDTO();
			updatedAdminDTO.addAdmin(adminRepository.save(existingAdmin));
			return updatedAdminDTO;
		}
		return null;
	}

	@Override
	public AdminDTO updateAdminProfilePic(String adminMail, MultipartFile file) {

		try {
			Map<String, String> uploadPic = cloudinary.uploader().upload(file.getBytes(), Map.of());

			String url = uploadPic.get("url");

			Admin uploadedImage = adminRepository.findById(adminMail).orElse(null);
			AdminDTO updatedAdmin = new AdminDTO();
			if (uploadedImage != null) {
				uploadedImage.setAdminProfilePic(url);
				adminRepository.save(uploadedImage);
				updatedAdmin.addAdmin(uploadedImage);
			} else {
				return null;
			}

			return updatedAdmin;
		} catch (IOException e) {
			throw new RuntimeException("Image updloading failed", e);

		}
	}

	@Override
	public boolean deleteAdmin(String adminMail) {
		AdminDTO existingAdmin = getAdmin();
		if (existingAdmin != null && existingAdmin.getAdminMail().equals(adminMail)) {
			adminRepository.deleteById(adminMail);
			return true;
		}
		return false;
	}

}
