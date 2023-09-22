package com.stackroute.model;

public class AuthDTO {

    private String emailId;
    private String userPassword;
	public AuthDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AuthDTO(String emailId, String userPassword) {
		super();
		this.emailId = emailId;
		this.userPassword = userPassword;
	}
	
	@Override
	public String toString() {
		return "AuthDTO [emailId=" + emailId + ", userPassword=" + userPassword + "]";
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
    
	
    
}
