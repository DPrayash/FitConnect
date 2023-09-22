package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.sql.Time;
import java.util.List;

//import lombok.AllArgsConstructor;
import lombok.Data;
//import lombok.NoArgsConstructor;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Document(collection = "SlotCollection")
public class Slot {

    @Id
    @Field("slotId")
    private String slotId;
    private Time startTime;
    private Time endTime;
    private Integer maximumLimit;
    private String slotDate; // yyyy-MM-dd
    private List<String> trainerList;
    

    @Override
	public String toString() {
		return "Slot [slotId=" + slotId + ", startTime=" + startTime + ", endTime=" + endTime + ", maximumLimit="
				+ maximumLimit + ", slotDate=" + slotDate + ", trainerList=" + trainerList + "]";
	}


	public Slot(String slotId, Time startTime, Time endTime, Integer maximumLimit, String slotDate,
			List<String> trainerList) {
		super();
		this.slotId = slotId;
		this.startTime = startTime;
		this.endTime = endTime;
		this.maximumLimit = maximumLimit;
		this.slotDate = slotDate;
		this.trainerList = trainerList;
	}


	public Slot() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getSlotId() {
		return slotId;
	}


	public void setSlotId(String slotId) {
		this.slotId = slotId;
	}


	public Time getStartTime() {
		return startTime;
	}


	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}


	public Time getEndTime() {
		return endTime;
	}


	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}


	public Integer getMaximumLimit() {
		return maximumLimit;
	}


	public void setMaximumLimit(Integer maximumLimit) {
		this.maximumLimit = maximumLimit;
	}


	public String getSlotDate() {
		return slotDate;
	}


	public void setSlotDate(String slotDate) {
		this.slotDate = slotDate;
	}


	public List<String> getTrainerList() {
		return trainerList;
	}


	public void setTrainerList(List<String> trainerList) {
		this.trainerList = trainerList;
	}


	public void update(Slot updatedSlot) {
        if (updatedSlot.getStartTime() != null) {
            this.setStartTime(updatedSlot.getStartTime());
        }
        if (updatedSlot.getEndTime() != null) {
            this.setEndTime(updatedSlot.getEndTime());
        }
        if (updatedSlot.getMaximumLimit() != null) {
            this.setMaximumLimit(updatedSlot.getMaximumLimit());
        }
        if( updatedSlot.getSlotDate() != null) {
        	this.setSlotDate(updatedSlot.getSlotDate());
        }
        if (updatedSlot.getTrainerList() != null) {
            this.setTrainerList(updatedSlot.getTrainerList());
        }
    }
}
