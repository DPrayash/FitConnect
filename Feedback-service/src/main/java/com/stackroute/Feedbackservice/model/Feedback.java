package com.stackroute.Feedbackservice.model;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;


@Data
@Document(collection = "Feedbacks")
public class Feedback {
	@Id
    private String id;
	
    private String customerName;
    private String customerMembershipPlan;
    private String feedbackTitle;
    private String feedbackDescription;
    private String feedbackRemarks;
    private int ratings;
    
	public Feedback() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Feedback(String id, String customerName, String customerMembershipPlan, String feedbackTitle,
			String feedbackDescription, String feedbackRemarks, int ratings) {
		super();
		this.id = id;
		this.customerName = customerName;
		this.customerMembershipPlan = customerMembershipPlan;
		this.feedbackTitle = feedbackTitle;
		this.feedbackDescription = feedbackDescription;
		this.feedbackRemarks = feedbackRemarks;
		this.ratings = ratings;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerMembershipPlan() {
		return customerMembershipPlan;
	}

	public void setCustomerMembershipPlan(String customerMembershipPlan) {
		this.customerMembershipPlan = customerMembershipPlan;
	}

	public String getFeedbackTitle() {
		return feedbackTitle;
	}

	public void setFeedbackTitle(String feedbackTitle) {
		this.feedbackTitle = feedbackTitle;
	}

	public String getFeedbackDescription() {
		return feedbackDescription;
	}

	public void setFeedbackDescription(String feedbackDescription) {
		this.feedbackDescription = feedbackDescription;
	}

	public String getFeedbackRemarks() {
		return feedbackRemarks;
	}

	public void setFeedbackRemarks(String feedbackRemarks) {
		this.feedbackRemarks = feedbackRemarks;
	}

	public int getRatings() {
		return ratings;
	}

	public void setRatings(int ratings) {
		this.ratings = ratings;
	}

	@Override
	public String toString() {
		return "Feedback [id=" + id + ", customerName=" + customerName + ", customerMembershipPlan="
				+ customerMembershipPlan + ", feedbackTitle=" + feedbackTitle + ", feedbackDescription="
				+ feedbackDescription + ", feedbackRemarks=" + feedbackRemarks + ", ratings=" + ratings + "]";
	}
	
	
		
}
