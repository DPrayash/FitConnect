package com.stackroute.model;

public class AdminDTO {
    private String adminName;
    private String adminMail;
    private String adminMobile;
    private String adminProfilePic;

    public AdminDTO() {
    }

    public AdminDTO(String adminName, String adminMail, String adminMobile, String adminProfilePic) {
        this.adminName = adminName;
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
        return "AdminDTO{" +
                "adminName='" + adminName + '\'' +
                ", adminMail='" + adminMail + '\'' +
                ", adminMobile='" + adminMobile + '\'' +
                ", adminProfilePic='" + adminProfilePic + '\'' +
                '}';
    }
    
    public void addAdmin(Admin admin) {
    	setAdminMail(admin.getAdminMail());
    	setAdminMobile(admin.getAdminMobile());
    	setAdminName(admin.getAdminName());
    	setAdminProfilePic(admin.getAdminProfilePic());
    }
}

