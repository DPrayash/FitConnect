package com.stackroute.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stackroute.exception.AlreadyBookedSlotException;
import com.stackroute.exception.SlotNotFoundException;
import com.stackroute.exception.UserNotSubscribed;
import com.stackroute.model.UserActivity;
import com.stackroute.model.UserActivity.SlotStatus;
import com.stackroute.model.UserService;
import com.stackroute.repository.UserActivityRepository;
import com.stackroute.repository.UserServiceRepository;

@Service
public class UserActivityServiceImpl implements UserActivityService {

	@Autowired
	private UserActivityRepository activityRepository;

	@Autowired
	private UserServiceRepository userRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public UserActivity bookSlot(UserActivity userActivity) {
		// TODO Auto-generated method stub
		Optional<UserService> subscribedUserOp = userRepository.findById(userActivity.getUserEmail());
		if (subscribedUserOp.isPresent()) {
			if (subscribedUserOp.get().getPlanName() == null || subscribedUserOp.get().getPlanName() == "") {
				throw new UserNotSubscribed("Please become a member to access this facility");
			}
			UserActivity exsisting = activityRepository.findBySlotNumberAndUserEmail(userActivity.getSlotNumber(),
					userActivity.getUserEmail());
			if (exsisting != null) {
				throw new AlreadyBookedSlotException("The slot is already booked.");
			} else {
				return activityRepository.save(userActivity);
			}
		} else {
			return null;
		}

	}

	@Override
	public UserActivity cancelSlot(int activityId) {
		// TODO Auto-generated method stub
		UserActivity userActivity = activityRepository.findById(activityId)
				.orElseThrow(() -> new SlotNotFoundException("Activity with ID " + activityId + " not found"));
		if (userActivity.getSlotStatus() == SlotStatus.CANCELLED) {
			throw new SlotNotFoundException("The Activity is already cancelled");
		}
		userActivity.setSlotStatus(SlotStatus.CANCELLED);
		activityRepository.save(userActivity);
		return userActivity;

	}

	@Override
	public UserActivity rescheduleSlot(int activityId, UserActivity userActivity) {
		// TODO Auto-generated method stub
		UserActivity reschedule = activityRepository.findById(activityId)
				.orElseThrow(() -> new SlotNotFoundException("Activity with ID " + activityId + " not found"));

		if (reschedule.getSlotStatus() == SlotStatus.BOOKED) {

			String newSlotCheckUrl = "http://localhost:8008/api/v1/gym-service/slots/available/"
					+ userActivity.getSlotNumber();

			int availableSlots = restTemplate.getForObject(newSlotCheckUrl, Integer.class);

			if (availableSlots > 0) {
				String oldSlotCancelUrl = "http://localhost:8008/api/v1/gym-service/slots/cancel/"
						+ reschedule.getSlotNumber();

				restTemplate.put(oldSlotCancelUrl, null);

				String newSlotBookUrl = "http://localhost:8008/api/v1/gym-service/slots/booked/"
						+ userActivity.getSlotNumber();

				restTemplate.put(newSlotBookUrl, userActivity);

				reschedule.setSlotNumber(userActivity.getSlotNumber());
				reschedule.setTrainerName(userActivity.getTrainerName());
				reschedule.setBookingDate(userActivity.getBookingDate());

				return activityRepository.save(reschedule);
			} else {
				throw new IllegalArgumentException("New slot is occupied. Slot cannot be rescheduled.");
			}
		} else {
			throw new IllegalArgumentException("Slot cannot be rescheduled");
		}

	}

	@Override
	public List<UserActivity> findBySlotNumber(String slotNumber) {
		// TODO Auto-generated method stub
		List<UserActivity> slot = activityRepository.findBySlotNumber(slotNumber);

		if (slot != null) {
			return slot;
		} else {
			throw new SlotNotFoundException("Slot with slot number not found");
		}

	}

	@Override
	public List<UserActivity> getUserActivityBySlotStatus(List<UserActivity.SlotStatus> slotStatusList) {
		return activityRepository.findBySlotStatusIn(slotStatusList);

	}

	@Override
	public List<UserActivity> getUserActivityListByUserEmail(String userEmail) {
		return activityRepository.findByUserEmail(userEmail);
	}

}
