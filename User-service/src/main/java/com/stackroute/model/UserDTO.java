package com.stackroute.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="UserServiceTable")
public class UserDTO {

	@Id
	private String userEmail;
	private String userName;
	private int userAge;
	private String userMobile;
	private String userProfilePicUrl;
	private Float height;
	private Float weight;
	private String planName;
	private double planPrice;
	private String planDuration;
	private Date expirationDate;
	
	
	
	
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}




	public UserDTO(String userEmail, String userName, int userAge, String userMobile, String userProfilePicUrl,
			Float height, Float weight, String planName, double planPrice, String planDuration, Date expirationDate) {
		super();
		this.userEmail = userEmail;
		this.userName = userName;
		this.userAge = userAge;
		this.userMobile = userMobile;
		this.userProfilePicUrl = userProfilePicUrl;
		this.height = height;
		this.weight = weight;
		this.planName = planName;
		this.planPrice = planPrice;
		this.planDuration = planDuration;
		this.expirationDate = expirationDate;
	}




	public void addUser(UserService userService) {
		this.userEmail = userService.getUserEmail();
		this.userName = userService.getUserName();
		this.userAge = userService.getUserAge();
		this.userMobile = userService.getUserMobile();
		this.userProfilePicUrl = userService.getUserProfilePicUrl();
		this.height = userService.getHeight();
		this.weight = userService.getWeight();
		this.planName = userService.getPlanName();
		this.planPrice = userService.getPlanPrice();
		this.planDuration = userService.getPlanDuration();
		this.expirationDate = userService.getExpirationDate();
	}




	public String getUserEmail() {
		return userEmail;
	}




	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}




	public String getUserName() {
		return userName;
	}




	public void setUserName(String userName) {
		this.userName = userName;
	}




	public int getUserAge() {
		return userAge;
	}




	public void setUserAge(int userAge) {
		this.userAge = userAge;
	}




	public String getUserMobile() {
		return userMobile;
	}




	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}




	public String getUserProfilePicUrl() {
		return userProfilePicUrl;
	}




	public void setUserProfilePicUrl(String userProfilePicUrl) {
		this.userProfilePicUrl = userProfilePicUrl;
	}




	public Float getHeight() {
		return height;
	}




	public void setHeight(Float height) {
		this.height = height;
	}




	public Float getWeight() {
		return weight;
	}




	public void setWeight(Float weight) {
		this.weight = weight;
	}




	public String getPlanName() {
		return planName;
	}




	public void setPlanName(String planName) {
		this.planName = planName;
	}




	public double getPlanPrice() {
		return planPrice;
	}




	public void setPlanPrice(double planPrice) {
		this.planPrice = planPrice;
	}




	public String getPlanDuration() {
		return planDuration;
	}




	public void setPlanDuration(String planDuration) {
		this.planDuration = planDuration;
	}




	public Date getExpirationDate() {
		return expirationDate;
	}




	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	
	

	
}
