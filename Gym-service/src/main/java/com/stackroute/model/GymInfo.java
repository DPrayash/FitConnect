package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
<<<<<<< HEAD
=======
//@AllArgsConstructor
//@NoArgsConstructor
>>>>>>> e9d87e3f3932e5891ee136b1aee0e98247663b4f
@Document(collection = "GymInfoCollection")
public class GymInfo {

	@Id
	private String gymName;
	private String gymAddress;
	private String mobile;

    public String getGymName() {
		return gymName;
	}


	public void setGymName(String gymName) {
		this.gymName = gymName;
	}


	public String getGymAddress() {
		return gymAddress;
	}


	public void setGymAddress(String gymAddress) {
		this.gymAddress = gymAddress;
	}


	public String getMobile() {
		return mobile;
	}


	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	public void update(GymInfo updatedGymInfo) {
        if (updatedGymInfo.getGymAddress() != null) {
            this.setGymAddress(updatedGymInfo.getGymAddress());
        }
        if (updatedGymInfo.getMobile() != null) {
            this.setMobile(updatedGymInfo.getMobile());
        }
    }


	public GymInfo() {
		super();
		// TODO Auto-generated constructor stub
	}


	public GymInfo(String gymName, String gymAddress, String mobile) {
		super();
		this.gymName = gymName;
		this.gymAddress = gymAddress;
		this.mobile = mobile;
	}


	@Override
	public String toString() {
		return "GymInfo [gymName=" + gymName + ", gymAddress=" + gymAddress + ", mobile=" + mobile + "]";
	}
    
}
