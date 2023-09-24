package com.stackroute.Feedbackservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.Feedbackservice.model.Feedback;
import com.stackroute.Feedbackservice.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;

	@PostMapping("/addFeedback")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
		ResponseEntity<?> entity = null;
		try {
			Feedback createdFeedback = feedbackService.createFeedback(feedback);
			if (createdFeedback != null) {
				entity = new ResponseEntity<Feedback>(createdFeedback, HttpStatus.CREATED);
			} else {
				entity = new ResponseEntity<String>("Error...Feedback not saved", HttpStatus.CONFLICT);
			}

		} catch (Exception e) {
			entity = new ResponseEntity<String>("Error..." + e.getMessage(), HttpStatus.CONFLICT);
		}

		return entity;
    }
	
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllFeedback() {
			ResponseEntity<?> entity = null;
			try {
				List<Feedback> feedbackList = feedbackService.getAllFeedback();
				entity = new ResponseEntity<List<Feedback>>(feedbackList, HttpStatus.OK);
			}
			catch(Exception e) {
				entity = new ResponseEntity<String>("Error..." +e.getMessage(), HttpStatus.CONFLICT);
			}
		
		return entity;
	}
	
	@GetMapping("/byId/{id}")
	public ResponseEntity<?> getFeedbackById(@PathVariable("id") String id) {
			ResponseEntity<?> entity = null;
			try {
				Feedback feedback = feedbackService.getFeedbackById(id);
				entity = new ResponseEntity<Feedback>(feedback, HttpStatus.OK);
			}
			catch(Exception e) {
				entity = new ResponseEntity<String>("Error..." +e.getMessage(), HttpStatus.CONFLICT);
			}
		
		return entity;
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteFeedback(@PathVariable("id") String id) {
		ResponseEntity<?> entity = null;
		try {
			boolean isDeleted = feedbackService.deleteFeedback(id) != null;
			if (isDeleted) {
				entity = new ResponseEntity<String>("Feedback with id :" + id + " is deleted successfully", HttpStatus.OK);
			} else {
				entity = new ResponseEntity<String>("Invalid Feedback Id :" + id, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			entity = new ResponseEntity<String>("Error..." + e.getMessage(), HttpStatus.CONFLICT);
		}
		return entity;
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateFeedback(@PathVariable("id") String id, @RequestBody Feedback updatedFeedback){
		Feedback updatedFeedbackResult = feedbackService.updateFeedback(id, updatedFeedback);
		if (updatedFeedbackResult != null) {
			return new ResponseEntity<Feedback>(updatedFeedbackResult, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("Updating Feedback failure...", HttpStatus.BAD_REQUEST);
		}
	}
}
