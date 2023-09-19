package com.stackroute.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="AdminTable")
public class Admin {
	
	@Id
    private String adminMail;
	private String adminName;
    private String adminPassword;
    private String adminMobile;
    private String adminProfilePic;

    public Admin() {
    }

    public Admin(String adminName, String adminPassword, String adminMail, String adminMobile, String adminProfilePic) {
        this.adminName = adminName;
        this.adminPassword = adminPassword;
        this.adminMail = adminMail;
        this.adminMobile = adminMobile;
        this.adminProfilePic = adminProfilePic;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public String getAdminMail() {
        return adminMail;
    }

    public void setAdminMail(String adminMail) {
        this.adminMail = adminMail;
    }

    public String getAdminMobile() {
        return adminMobile;
    }

    public void setAdminMobile(String adminMobile) {
        this.adminMobile = adminMobile;
    }

    public String getAdminProfilePic() {
        return adminProfilePic;
    }

    public void setAdminProfilePic(String adminProfilePic) {
        this.adminProfilePic = adminProfilePic;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminName='" + adminName + '\'' +
                ", adminPassword='" + adminPassword + '\'' +
                ", adminMail='" + adminMail + '\'' +
                ", adminMobile='" + adminMobile + '\'' +
                ", adminProfilePic='" + adminProfilePic + '\'' +
                '}';
    }
    
    public void updateAdmin(AdminDTO admin) {
    	if(admin.getAdminName() != null) {
    		setAdminName(admin.getAdminName());
    	}
    	if(admin.getAdminMobile() != null) {
    		setAdminMobile(admin.getAdminMobile());
    	}
    }
}

