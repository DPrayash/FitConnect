package com.stackroute.Feedbackservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.Feedbackservice.model.Feedback;
import com.stackroute.Feedbackservice.repository.FeedbackRepository;

@Service
public class FeedbackService {
	@Autowired
	private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return (List<Feedback>) feedbackRepository.findAll();
    }

    public Feedback getFeedbackById(String id) {
        return feedbackRepository.findById(id).orElse(null);
    }
    
    public Feedback deleteFeedback(String id) {
      Feedback feedback = feedbackRepository.findById(id).orElse(null);
      if (feedback != null) {
          feedbackRepository.delete(feedback);
      }
      return feedback;
  }

    public Feedback updateFeedback(String id, Feedback newFeedbackData) {
        Feedback existingFeedback = feedbackRepository.findById(id).orElse(null);
        if (existingFeedback != null) {
            existingFeedback.setFeedbackTitle(newFeedbackData.getFeedbackTitle());
            existingFeedback.setFeedbackDescription(newFeedbackData.getFeedbackDescription());
            existingFeedback.setFeedbackRemarks(newFeedbackData.getFeedbackRemarks());
            existingFeedback.setRatings(newFeedbackData.getRatings());
            return feedbackRepository.save(existingFeedback);
        }
        return null;
    }

}