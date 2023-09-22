package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

//import lombok.AllArgsConstructor;
import lombok.Data;
//import lombok.NoArgsConstructor;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Document(collection = "EquipmentCollection")
public class Equipment {
	
	@Override
	public String toString() {
		return "Equipment [equipmentId=" + equipmentId + ", equipmentName=" + equipmentName + ", equipmentImage="
				+ equipmentImage + ", equipmentDescription=" + equipmentDescription + ", quantity=" + quantity + "]";
	}

	@Id
	@Field("equipmentId") 
    private String equipmentId;
    private String equipmentName;
    private String equipmentImage;
    private String equipmentDescription;
    private Integer quantity;
    
    public String getEquipmentId() {
		return equipmentId;
	}

	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public String getEquipmentImage() {
		return equipmentImage;
	}

	public void setEquipmentImage(String equipmentImage) {
		this.equipmentImage = equipmentImage;
	}

	public String getEquipmentDescription() {
		return equipmentDescription;
	}

	public void setEquipmentDescription(String equipmentDescription) {
		this.equipmentDescription = equipmentDescription;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void update(Equipment updatedEquipment) {
        if (updatedEquipment.getEquipmentName() != null) {
            this.setEquipmentName(updatedEquipment.getEquipmentName());
        }
        if (updatedEquipment.getEquipmentImage() != null) {
            this.setEquipmentImage(updatedEquipment.getEquipmentImage());
        }
        if (updatedEquipment.getEquipmentDescription() != null) {
            this.setEquipmentDescription(updatedEquipment.getEquipmentDescription());
        }
        if (updatedEquipment.getQuantity() != null) {
            this.setQuantity(updatedEquipment.getQuantity());
        }
    }

	public Equipment(String equipmentId, String equipmentName, String equipmentImage, String equipmentDescription,
			Integer quantity) {
		super();
		this.equipmentId = equipmentId;
		this.equipmentName = equipmentName;
		this.equipmentImage = equipmentImage;
		this.equipmentDescription = equipmentDescription;
		this.quantity = quantity;
	}

	public Equipment() {
		// TODO Auto-generated constructor stub
	}
	
	
}
