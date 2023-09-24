package com.stackroute.Feedbackservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.Feedbackservice.model.Feedback;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback,  String> {
	
}
