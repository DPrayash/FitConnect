package com.stackroute.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "PlanCollection")
public class Plan {

	@Id
	@Field("planId")
	private String planId;
	private String planName;
	private Double planPrice;
	private String planDuration;
	private List<String> planDescription;

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public Double getPlanPrice() {
		return planPrice;
	}

	public void setPlanPrice(Double planPrice) {
		this.planPrice = planPrice;
	}

	public String getPlanDuration() {
		return planDuration;
	}

	public void setPlanDuration(String planDuration) {
		this.planDuration = planDuration;
	}

	public Plan(String planId, String planName, Double planPrice, String planDuration, List<String> planDescription) {
		super();
		this.planId = planId;	
		this.planName = planName;
		this.planPrice = planPrice;
		this.planDuration = planDuration;
		this.planDescription = planDescription;
	}

	@Override
	public String toString() {
		return "Plan [planId=" + planId + ", planName=" + planName + ", planPrice=" + planPrice + ", planDuration="
				+ planDuration + ", planDescription=" + planDescription + "]";
	}

	public Plan() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<String> getPlanDescription() {
		return planDescription;
	}

	public void setPlanDescription(List<String> planDescription) {
		this.planDescription = planDescription;
	}

	public void update(Plan updatedPlan) {
		if (updatedPlan.getPlanName() != null) {
			this.setPlanName(updatedPlan.getPlanName());
		}
		if (updatedPlan.getPlanPrice() != null) {
			this.setPlanPrice(updatedPlan.getPlanPrice());
		}
		if (updatedPlan.getPlanDuration() != null) {
			this.setPlanDuration(updatedPlan.getPlanDuration());
		}
		if (updatedPlan.getPlanDescription() != null && !updatedPlan.getPlanDescription().isEmpty()) {
			this.setPlanDescription(updatedPlan.getPlanDescription());
		}
	}

}
