package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
    
}
