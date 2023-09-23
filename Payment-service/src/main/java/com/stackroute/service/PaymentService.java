package com.stackroute.service;

import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.stackroute.model.PaymentModel;
import com.stackroute.repository.PaymentRepository;

@Service
public class PaymentService {
	
	private static final String KEY = "rzp_test_zeASdQN0Rx4urz";
	private static final String KEY_SECRET = "Z6SfxA5pYOxYs4uFDT6pjXmo";
	private static final String CURRENCY = "INR";
	

	@Autowired
	private PaymentRepository paymentRepository;
	
	public PaymentModel createTransaction(Double amount, String name, String userId) {
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("amount", (amount*100));
		jsonObject.put("currency", CURRENCY);
		
		try {
			RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
			
			Order order = razorpayClient.orders.create(jsonObject);
			
			PaymentModel payment = prepareTransactionDetails(order, name, userId);
			System.out.println("PAYMENT is " + payment);
			return payment;
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	
	
	
	private PaymentModel prepareTransactionDetails(Order order, String name, String UserId) {
		
			String paymentId = order.get("id");
			String currency = order.get("currency");
			Integer amount = order.get("amount");
			String userEmail = UserId;
			String paymentStatus = order.get("status");
			String paymentTitle = name;
			String paymentMode = "UPI";
			Date Timestamp = order.get("created_at");
			
			PaymentModel payment = new PaymentModel(paymentId, userEmail, paymentTitle, amount, paymentStatus, paymentMode, Timestamp, currency, KEY);
			return paymentRepository.save(payment);

	}


	public List<PaymentModel> allTransactionDetails() {
		return paymentRepository.findAll();
	}


	public List<PaymentModel> findTransaction(String userEmail) {
		List<PaymentModel> optional = paymentRepository.findByUserEmail(userEmail);
		return optional;
	}
}
