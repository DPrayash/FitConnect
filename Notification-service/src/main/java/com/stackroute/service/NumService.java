package com.stackroute.service;

import org.springframework.stereotype.Service;

import com.stackroute.model.EmailRequest;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class NumService {
	  private final String ACCOUNT_SID ="ACe6976e5525d583bade3fdd770d406719";
	  
	      private final String AUTH_TOKEN = "1c0f4be71191bc95c640e06012a36501";
	  
	      private final String FROM_NUMBER = "+12565883483";
	  
	      public void send(EmailRequest sms) {
	      	Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	  
	          Message message = Message.creator(new PhoneNumber(sms.getMobnum()), new PhoneNumber(FROM_NUMBER), sms.getMessage())
	                  .create();
	          System.out.println("here is my id:"+message.getSid());// Unique resource ID created to manage this transaction
	  
	      }
	  
}